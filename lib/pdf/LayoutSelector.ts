import {
  PAGE_DIMENSIONS,
  MARGINS,
  FONT_SIZE,
  VALIDATION,
  LAYOUT_SCORE_WEIGHTS,
  PREFERENCE_ORDER,
} from './constants';
import type {
  ColumnMetrics,
  DocumentLayoutAnalysis,
  LayoutCandidate,
  PageFormat,
  PageOrientation,
  PageMargins,
} from './types';

// Re-export for consumers that import from this file
export type { LayoutCandidate };

export class LayoutSelector {
  /**
   * Sélectionne le meilleur layout en testant plusieurs candidats.
   * Prend en entrée l'analyse partielle (sans recommendedCandidate) et le nombre de lignes.
   * Retourne l'analyse complète avec candidat recommandé.
   */
  static select(
    partialAnalysis: Omit<DocumentLayoutAnalysis, 'recommendedCandidate' | 'allCandidates'>,
    rowCount: number
  ): DocumentLayoutAnalysis {
    const { columns, estimatedCompactWidth, estimatedRowHeight } = partialAnalysis;

    const candidates = LayoutSelector.buildCandidates(
      columns,
      rowCount,
      estimatedCompactWidth,
      estimatedRowHeight
    );

    const best = candidates.reduce(
      (a, b) => (b.score > a.score ? b : a),
      candidates[0]
    );

    return {
      ...partialAnalysis,
      recommendedCandidate: best,
      allCandidates: candidates.sort((a, b) => b.score - a.score),
    };
  }

  /**
   * Construit et évalue tous les candidats de layout.
   */
  static buildCandidates(
    columns: ColumnMetrics[],
    rowCount: number,
    estimatedCompactWidth: number,
    estimatedRowHeight: number
  ): LayoutCandidate[] {
    const candidates: LayoutCandidate[] = [];

    type MarginKey = keyof typeof MARGINS;

    const configs: Array<{
      format: PageFormat;
      orientation: PageOrientation;
      marginKey: MarginKey;
      fontSize: number;
    }> = [];

    for (const { format, orientation } of PREFERENCE_ORDER) {
      const isLandscape = orientation === 'landscape';
      configs.push(
        {
          format: format as PageFormat,
          orientation: orientation as PageOrientation,
          marginKey: isLandscape ? 'landscape' : 'normal',
          fontSize: FONT_SIZE.body.default,
        },
        {
          format: format as PageFormat,
          orientation: orientation as PageOrientation,
          marginKey: isLandscape ? 'landscapeCompact' : 'compact',
          fontSize: FONT_SIZE.body.default - 0.5,
        },
        {
          format: format as PageFormat,
          orientation: orientation as PageOrientation,
          marginKey: isLandscape ? 'landscapeCompact' : 'compact',
          fontSize: FONT_SIZE.body.default - 1.5,
        }
      );
    }

    for (const cfg of configs) {
      // Ne pas tester A3 si A4 fonctionne correctement
      if (
        cfg.format === 'A3' &&
        candidates.some((c) => c.score > 60 && c.format !== 'A3')
      ) {
        continue;
      }

      const candidate = LayoutSelector.evaluateCandidate(
        cfg.format,
        cfg.orientation,
        MARGINS[cfg.marginKey],
        cfg.fontSize,
        columns,
        rowCount
      );
      candidates.push(candidate);
    }

    return candidates;
  }

  /**
   * Évalue un seul candidat de layout.
   */
  static evaluateCandidate(
    format: PageFormat,
    orientation: PageOrientation,
    margins: PageMargins,
    fontSize: number,
    columns: ColumnMetrics[],
    rowCount: number
  ): LayoutCandidate {
    const dims = PAGE_DIMENSIONS[format];
    const pageW = orientation === 'landscape' ? dims.height : dims.width;
    const pageH = orientation === 'landscape' ? dims.width : dims.height;

    const usableWidth = pageW - margins.left - margins.right;
    const usableHeight = pageH - margins.top - margins.bottom;

    const issues: string[] = [];

    // Distribuer les largeurs de colonnes
    const distributedColumns = LayoutSelector.distributeColumnWidths(
      columns,
      usableWidth,
      fontSize
    );
    const columnWidths = distributedColumns.map((c) => c.finalWidth);
    const totalTableWidth = columnWidths.reduce((s, w) => s + w, 0);
    const widthUtilization = totalTableWidth / usableWidth;

    // Détecter les colonnes clippées
    const totalMinWidth = columns.reduce((s, c) => s + c.minWidth, 0);
    if (totalMinWidth > usableWidth) {
      issues.push(
        `Total min width (${Math.round(totalMinWidth)}) > usable (${Math.round(usableWidth)})`
      );
    }

    // Calculer la hauteur disponible pour les données
    const headerRowHeight = VALIDATION.headerRowHeight;
    const mainHeaderH = VALIDATION.mainHeaderHeight;
    const continuationHeaderH = VALIDATION.continuationHeaderHeight;
    const footerH = VALIDATION.footerHeight;

    const firstPageDataHeight =
      usableHeight - mainHeaderH - headerRowHeight - footerH;
    const otherPagesDataHeight =
      usableHeight - continuationHeaderH - headerRowHeight - footerH;

    // Hauteur de ligne dynamique (tenir compte du wrapping)
    const rowHeight = LayoutSelector.estimateRowHeight(
      fontSize,
      distributedColumns
    );

    // Lignes par page
    const rowsFirstPage = Math.max(
      1,
      Math.floor(firstPageDataHeight / rowHeight)
    );
    const rowsOtherPages = Math.max(
      1,
      Math.floor(otherPagesDataHeight / rowHeight)
    );

    // Nombre de pages estimé
    let estimatedPages = 1;
    let rowsPerPage = rowsFirstPage;
    if (rowCount > rowsFirstPage) {
      estimatedPages =
        1 + Math.ceil((rowCount - rowsFirstPage) / rowsOtherPages);
      rowsPerPage = Math.round((rowsFirstPage + rowsOtherPages) / 2);
    }

    // Remplissage de la dernière page
    const rowsOnLastPage =
      rowCount <= rowsFirstPage
        ? rowCount
        : ((rowCount - rowsFirstPage) % rowsOtherPages) || rowsOtherPages;
    const lastPageFillRatio =
      rowsOnLastPage /
      (estimatedPages === 1 ? rowsFirstPage : rowsOtherPages);

    if (
      lastPageFillRatio < VALIDATION.nearlyEmptyLastPageThreshold &&
      estimatedPages > 1
    ) {
      issues.push(
        `Dernière page presque vide (${Math.round(lastPageFillRatio * 100)}%)`
      );
    }

    // Vérification lisibilité
    if (fontSize < VALIDATION.minBodyFontSize) {
      issues.push(
        `Police trop petite (${fontSize}pt < ${VALIDATION.minBodyFontSize}pt min)`
      );
    }

    // Vérification espaces blancs
    if (
      widthUtilization < VALIDATION.minWidthUtilization &&
      issues.length === 0
    ) {
      issues.push(
        `Largeur sous-utilisée (${Math.round(widthUtilization * 100)}%)`
      );
    }

    // Calcul du score global
    const score = LayoutSelector.computeScore({
      widthUtilization,
      fontSize,
      estimatedPages,
      lastPageFillRatio,
      hasClipping: totalMinWidth > usableWidth,
      hasUnreadableFont: fontSize < VALIDATION.minBodyFontSize,
      excessiveWrapping:
        distributedColumns.filter((c) => c.canWrap).length >
        columns.length * 0.5,
    });

    return {
      format,
      orientation,
      margins,
      usableWidth,
      usableHeight,
      fontSize,
      headerFontSize: FONT_SIZE.columnHeader.default,
      rowHeight,
      rowsPerPage,
      columnWidths,
      totalTableWidth,
      estimatedPages,
      score,
      widthUtilization,
      issues,
    };
  }

  /**
   * Distribution simplifiée pour le scoring (sans pdfkit — utilise heuristiques).
   */
  private static distributeColumnWidths(
    columns: ColumnMetrics[],
    usableWidth: number,
    fontSize: number
  ): ColumnMetrics[] {
    const scale = fontSize / FONT_SIZE.body.default;
    const cols = columns.map((c) => ({
      ...c,
      minWidth: c.minWidth * scale,
      maxWidth: c.maxWidth * scale,
      naturalWidth: c.naturalWidth * scale,
    }));

    const totalMin = cols.reduce((s, c) => s + c.minWidth, 0);

    if (totalMin > usableWidth) {
      const ratio = usableWidth / totalMin;
      return cols.map((c) => ({ ...c, finalWidth: c.minWidth * ratio }));
    }

    const remaining = usableWidth - totalMin;
    const totalFlex = cols.reduce((s, c) => s + c.flexWeight, 0);

    const result = cols.map((c) => {
      const extra =
        totalFlex > 0 ? (remaining * c.flexWeight) / totalFlex : 0;
      return { ...c, finalWidth: Math.min(c.minWidth + extra, c.maxWidth) };
    });

    // Redistribuer le résidu aux colonnes wrappables
    const total = result.reduce((s, c) => s + c.finalWidth, 0);
    const residual = usableWidth - total;
    if (residual > 2) {
      const expandable = result.filter((c) => c.canWrap);
      if (expandable.length > 0) {
        const perCol = residual / expandable.length;
        expandable.forEach((c) => {
          c.finalWidth = Math.min(c.finalWidth + perCol, c.maxWidth);
        });
      }
    }

    return result;
  }

  /**
   * Estime la hauteur d'une ligne selon la police et le wrapping potentiel.
   */
  private static estimateRowHeight(
    fontSize: number,
    columns: ColumnMetrics[]
  ): number {
    const wrappableCols = columns.filter((c) => c.canWrap);
    const avgWrapping = wrappableCols.length > 0 ? 1.2 : 1.0;
    return fontSize * 1.3 * avgWrapping + VALIDATION.verticalPaddingPerRow;
  }

  /**
   * Calcule le score d'un candidat selon les poids définis.
   */
  static computeScore(params: {
    widthUtilization: number;
    fontSize: number;
    estimatedPages: number;
    lastPageFillRatio: number;
    hasClipping: boolean;
    hasUnreadableFont: boolean;
    excessiveWrapping: boolean;
  }): number {
    const {
      widthUtilization,
      fontSize,
      estimatedPages,
      lastPageFillRatio,
      hasClipping,
      hasUnreadableFont,
      excessiveWrapping,
    } = params;

    const readabilityScore = Math.min(
      1,
      (fontSize - VALIDATION.minBodyFontSize) /
        (FONT_SIZE.body.max - VALIDATION.minBodyFontSize)
    );

    const widthScore =
      widthUtilization < VALIDATION.minWidthUtilization
        ? widthUtilization / VALIDATION.minWidthUtilization
        : widthUtilization > 1.0
          ? Math.max(0, 1 - (widthUtilization - 1.0) * 10)
          : 1.0;

    const pageFillScore = Math.min(1, lastPageFillRatio / 0.4);

    const clippingPenalty = hasClipping ? 1 : 0;
    const unreadablePenalty = hasUnreadableFont ? 1 : 0;
    const wrappingPenalty = excessiveWrapping ? 1 : 0;
    const nearlyEmptyPenalty =
      lastPageFillRatio < VALIDATION.nearlyEmptyLastPageThreshold &&
      estimatedPages > 1
        ? 1
        : 0;

    return (
      LAYOUT_SCORE_WEIGHTS.readability * readabilityScore +
      LAYOUT_SCORE_WEIGHTS.widthUtilization * widthScore +
      LAYOUT_SCORE_WEIGHTS.pageFillRatio * pageFillScore +
      LAYOUT_SCORE_WEIGHTS.excessiveWrapping * wrappingPenalty +
      LAYOUT_SCORE_WEIGHTS.nearlyEmptyLastPage * nearlyEmptyPenalty +
      LAYOUT_SCORE_WEIGHTS.clippedContent * clippingPenalty +
      LAYOUT_SCORE_WEIGHTS.unreadableFont * unreadablePenalty
    );
  }

  /**
   * Rééquilibre les deux dernières pages si la dernière est trop vide.
   * Retourne le tableau de pages rééquilibré.
   */
  static balanceLastPages(
    pages: Array<Record<string, unknown>[]>,
    rowsOtherPages: number
  ): Array<Record<string, unknown>[]> {
    if (pages.length < 2) return pages;

    const lastIdx = pages.length - 1;
    const lastPage = pages[lastIdx];
    const prevPage = pages[lastIdx - 1];

    const lastFill = lastPage.length / rowsOtherPages;
    if (lastFill >= 0.25 || lastPage.length === 0) return pages;

    const combined = [...prevPage, ...lastPage];
    const halfLen = Math.ceil(combined.length / 2);

    const newPrev = combined.slice(0, halfLen);
    const newLast = combined.slice(halfLen);

    const result = [...pages];
    result[lastIdx - 1] = newPrev;
    result[lastIdx] = newLast;

    if (result[lastIdx].length === 0) {
      result.splice(lastIdx, 1);
    }

    return result;
  }
}
