import { VALIDATION, FONT_SIZE } from './constants';
import { ColumnAnalyzer } from './ColumnAnalyzer';
import type { LayoutCandidate, ColumnMetrics } from './types';

export interface PageData {
  pageNumber: number;
  isFirstPage: boolean;
  rows: Record<string, unknown>[];
  headerHeight: number;  // hauteur du header sur cette page
}

export interface PaginationResult {
  pages: PageData[];
  totalPages: number;
  totalRows: number;
  avgRowsPerPage: number;
  wasBalanced: boolean;
}

export class PaginationEngine {

  /**
   * Découpe les données en pages avec respect des contraintes de hauteur.
   * Ajuste dynamiquement le nombre de lignes selon la hauteur réelle de chaque ligne.
   */
  static paginate(
    rows: Record<string, unknown>[],
    candidate: LayoutCandidate,
    columns: ColumnMetrics[]
  ): PaginationResult {
    if (rows.length === 0) {
      return {
        pages: [{ pageNumber: 1, isFirstPage: true, rows: [], headerHeight: VALIDATION.mainHeaderHeight }],
        totalPages: 1,
        totalRows: 0,
        avgRowsPerPage: 0,
        wasBalanced: false,
      };
    }

    const { usableHeight } = candidate;

    // Hauteur disponible pour les données sur chaque type de page
    const firstPageDataH = usableHeight
      - VALIDATION.mainHeaderHeight
      - VALIDATION.headerRowHeight
      - VALIDATION.footerHeight;

    const otherPageDataH = usableHeight
      - VALIDATION.continuationHeaderHeight
      - VALIDATION.headerRowHeight
      - VALIDATION.footerHeight;

    // Découpage en pages avec hauteurs réelles
    const pages: PageData[] = [];
    let remaining = [...rows];
    let pageNum = 1;

    while (remaining.length > 0) {
      const isFirst = pageNum === 1;
      const availableH = isFirst ? firstPageDataH : otherPageDataH;
      const headerH = isFirst ? VALIDATION.mainHeaderHeight : VALIDATION.continuationHeaderHeight;

      const { pageRows, rest } = PaginationEngine.fitRowsInHeight(
        remaining, columns, candidate.fontSize, availableH
      );

      pages.push({
        pageNumber: pageNum,
        isFirstPage: isFirst,
        rows: pageRows,
        headerHeight: headerH,
      });

      remaining = rest;
      pageNum++;

      // Sécurité anti-boucle infinie
      if (pageNum > 500) break;
    }

    // Équilibrer les dernières pages si la dernière est trop vide
    const balanced = PaginationEngine.balanceLastPages(pages, otherPageDataH, candidate.fontSize, columns);
    const wasBalanced =
      balanced.length !== pages.length ||
      (balanced.length > 0 &&
        pages.length > 0 &&
        balanced[balanced.length - 1].rows.length !== pages[pages.length - 1].rows.length);

    const totalRows = rows.length;
    const avgRowsPerPage = balanced.reduce((s, p) => s + p.rows.length, 0) / Math.max(1, balanced.length);

    return {
      pages: balanced,
      totalPages: balanced.length,
      totalRows,
      avgRowsPerPage,
      wasBalanced,
    };
  }

  /**
   * Remplit une page avec autant de lignes que possible dans la hauteur disponible.
   */
  static fitRowsInHeight(
    rows: Record<string, unknown>[],
    columns: ColumnMetrics[],
    fontSize: number,
    availableHeight: number
  ): { pageRows: Record<string, unknown>[]; rest: Record<string, unknown>[] } {
    const pageRows: Record<string, unknown>[] = [];
    let usedHeight = 0;

    for (const row of rows) {
      const rowH = ColumnAnalyzer.estimateRowHeight(row, columns, fontSize);
      if (usedHeight + rowH > availableHeight && pageRows.length > 0) {
        // Cette ligne ne rentre plus — arrêter ici
        break;
      }
      pageRows.push(row);
      usedHeight += rowH;
    }

    return { pageRows, rest: rows.slice(pageRows.length) };
  }

  /**
   * Équilibre les deux dernières pages si la dernière est trop peu remplie.
   * Tente de fusionner ou de rééquilibrer.
   */
  static balanceLastPages(
    pages: PageData[],
    otherPageDataH: number,
    fontSize: number,
    columns: ColumnMetrics[]
  ): PageData[] {
    if (pages.length < 2) return pages;

    const result = [...pages];
    const lastIdx = result.length - 1;
    const lastPage = result[lastIdx];
    const prevPage = result[lastIdx - 1];

    // Calculer la hauteur utilisée par la dernière page
    const lastPageUsedH = lastPage.rows.reduce(
      (s, row) => s + ColumnAnalyzer.estimateRowHeight(row, columns, fontSize),
      0
    );
    const lastPageFill = lastPageUsedH / Math.max(1, otherPageDataH);

    if (lastPageFill >= VALIDATION.nearlyEmptyLastPageThreshold) return result; // OK

    // Cas 1 : la dernière page est vide — la supprimer
    if (lastPage.rows.length === 0) {
      result.splice(lastIdx, 1);
      return result;
    }

    // Cas 2 : tenter de tout faire tenir sur l'avant-dernière page
    const combined = [...prevPage.rows, ...lastPage.rows];
    let fitH = 0;
    let canFitAll = true;
    for (const row of combined) {
      fitH += ColumnAnalyzer.estimateRowHeight(row, columns, fontSize);
      if (fitH > otherPageDataH) { canFitAll = false; break; }
    }

    if (canFitAll) {
      // Fusionner les deux pages
      result[lastIdx - 1] = { ...prevPage, rows: combined };
      result.splice(lastIdx, 1);
      return result;
    }

    // Cas 3 : rééquilibrer — diviser à la moitié
    const halfH = otherPageDataH / 2;
    const firstHalf: Record<string, unknown>[] = [];
    const secondHalf: Record<string, unknown>[] = [];
    let accH = 0;

    for (const row of combined) {
      const rowH = ColumnAnalyzer.estimateRowHeight(row, columns, fontSize);
      if (accH < halfH || firstHalf.length === 0) {
        firstHalf.push(row);
        accH += rowH;
      } else {
        secondHalf.push(row);
      }
    }

    if (secondHalf.length > 0) {
      result[lastIdx - 1] = { ...prevPage, rows: firstHalf };
      result[lastIdx] = { ...lastPage, rows: secondHalf };
    }

    return result;
  }

  /**
   * Calcule la hauteur totale d'un ensemble de lignes.
   */
  static totalRowsHeight(
    rows: Record<string, unknown>[],
    columns: ColumnMetrics[],
    fontSize: number
  ): number {
    return rows.reduce((s, row) => s + ColumnAnalyzer.estimateRowHeight(row, columns, fontSize), 0);
  }

  /**
   * Vérifie si une tentative de compression permettrait d'éviter une page supplémentaire.
   * Essaie de réduire légèrement la police (jusqu'à minBodyFontSize) pour faire tenir les lignes.
   */
  static tryCompressToOnePage(
    rows: Record<string, unknown>[],
    columns: ColumnMetrics[],
    candidate: LayoutCandidate
  ): { possible: boolean; fontSize: number } {
    const { usableHeight } = candidate;
    const availableH =
      usableHeight
      - VALIDATION.mainHeaderHeight
      - VALIDATION.headerRowHeight
      - VALIDATION.footerHeight;

    for (let fs = candidate.fontSize; fs >= FONT_SIZE.body.min; fs -= 0.5) {
      const totalH = PaginationEngine.totalRowsHeight(rows, columns, fs);
      if (totalH <= availableH) {
        return { possible: true, fontSize: fs };
      }
    }
    return { possible: false, fontSize: candidate.fontSize };
  }

  /**
   * Génère un résumé de pagination pour les logs/debug.
   */
  static summarize(result: PaginationResult): string {
    const lines = result.pages
      .map(p => `  Page ${p.pageNumber}: ${p.rows.length} lignes (header: ${p.headerHeight}pt)`)
      .join('\n');
    return (
      `Pagination: ${result.totalPages} page(s), ${result.totalRows} lignes total\n` +
      lines +
      (result.wasBalanced ? '\n  [Équilibrage appliqué]' : '')
    );
  }
}
