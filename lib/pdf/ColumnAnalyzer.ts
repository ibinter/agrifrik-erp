import PDFDocument from 'pdfkit';
import { COLUMN_TYPE_RULES, VALIDATION, FONT_SIZE } from './constants';
import { FontManager } from './FontManager';
import type { ColumnDefinition, ColumnMetrics, DocumentDefinition, DocumentLayoutAnalysis } from './types';

export class ColumnAnalyzer {

  /**
   * Point d'entrée principal.
   * Crée un document pdfkit temporaire (non sauvegardé) uniquement pour mesurer les textes.
   */
  static async analyze(
    definition: DocumentDefinition,
    rows: Record<string, unknown>[]
  ): Promise<Omit<DocumentLayoutAnalysis, 'recommendedCandidate' | 'allCandidates'>> {
    // Doc temporaire pour mesures (jamais finalisé)
    const doc = new PDFDocument({ autoFirstPage: false });
    doc.font('Helvetica');

    const bodyFontSize = FONT_SIZE.body.default;
    const headerFontSize = FONT_SIZE.columnHeader.default;

    const columns: ColumnMetrics[] = definition.columns.map(colDef =>
      ColumnAnalyzer.analyzeColumn(doc, colDef, rows, bodyFontSize, headerFontSize)
    );

    // Fermer le doc temporaire sans le pipe (évite memory leak)
    doc.end();

    const estimatedNaturalWidth = columns.reduce((sum, c) => sum + c.naturalWidth, 0);
    const estimatedCompactWidth = columns.reduce((sum, c) => sum + c.minWidth, 0);
    const estimatedRowHeight = FONT_SIZE.body.default + VALIDATION.verticalPaddingPerRow;

    return {
      rowCount: rows.length,
      columnCount: columns.length,
      columns,
      estimatedNaturalWidth,
      estimatedCompactWidth,
      estimatedRowHeight,
    };
  }

  /**
   * Analyse une colonne individuelle.
   */
  static analyzeColumn(
    doc: InstanceType<typeof PDFDocument>,
    colDef: ColumnDefinition,
    rows: Record<string, unknown>[],
    bodyFontSize: number,
    headerFontSize: number
  ): ColumnMetrics {
    const rules = COLUMN_TYPE_RULES[colDef.type] ?? COLUMN_TYPE_RULES['short-text'];

    // Extraire les valeurs de cette colonne
    const rawValues = rows.map(r => FontManager.sanitize(r[colDef.key]));

    // Mesurer la largeur du titre (avec marge interne 8pt de chaque côté)
    const labelPadding = 16; // 8pt chaque côté
    const labelText = colDef.abbreviation ?? colDef.label;
    const labelWidth = FontManager.measureText(doc, labelText, headerFontSize) + labelPadding;

    // Mesurer les valeurs
    const avgLen = rawValues.length > 0
      ? rawValues.reduce((s, v) => s + v.length, 0) / rawValues.length
      : 10;
    const maxLen = rawValues.length > 0 ? Math.max(...rawValues.map(v => v.length)) : 10;

    // Largeur P90 des valeurs + padding
    const valuePadding = 12; // 6pt chaque côté
    const p90Width = FontManager.measureP90Width(doc, rawValues, bodyFontSize) + valuePadding;
    const maxWidth = FontManager.measureMaxWidth(doc, rawValues, bodyFontSize) + valuePadding;

    // Largeur naturelle = max(titre, P90 des valeurs), borné par max du type
    const naturalWidth = Math.min(
      Math.max(labelWidth, p90Width),
      rules.max
    );

    // Min = max(min du type, largeur titre abréviée)
    const minWidth = Math.max(rules.min, labelWidth);

    return {
      key: colDef.key,
      label: colDef.label,
      type: colDef.type,
      priority: colDef.priority,
      nowrap: colDef.nowrap ?? !rules.canWrap,
      naturalWidth,
      minWidth: Math.min(minWidth, naturalWidth),
      maxWidth: Math.min(maxWidth, rules.max),
      flexWeight: colDef.flexWeight ?? rules.flex,
      align: colDef.align ?? rules.align,
      estimatedAvgChars: Math.round(avgLen),
      estimatedMaxChars: Math.round(maxLen),
      canWrap: rules.canWrap && !colDef.nowrap,
      abbreviation: colDef.abbreviation,
      finalWidth: 0, // assigné par distributeWidths
    };
  }

  /**
   * Distribue l'espace disponible entre les colonnes.
   * Règles :
   * 1. Toutes les colonnes reçoivent d'abord leur largeur minimale
   * 2. L'espace restant est redistribué proportionnellement au flexWeight
   * 3. Aucune colonne ne dépasse sa maxWidth
   * 4. Les colonnes nowrap ont leur largeur garantie
   * Résultat : on obtient widthUtilization la plus proche de 0.92..1.00
   */
  static distributeWidths(columns: ColumnMetrics[], usableWidth: number): ColumnMetrics[] {
    const cols = columns.map(c => ({ ...c }));
    const totalMin = cols.reduce((s, c) => s + c.minWidth, 0);

    if (totalMin > usableWidth) {
      // Espace insuffisant même avec les minimums — compresser proportionnellement
      const ratio = usableWidth / totalMin;
      cols.forEach(c => { c.finalWidth = Math.floor(c.minWidth * ratio); });
      return cols;
    }

    // Première passe : toutes les colonnes à leur largeur naturelle, bornée par usableWidth totale
    const remaining = usableWidth - totalMin;
    const totalFlex = cols.reduce((s, c) => s + c.flexWeight, 0);

    cols.forEach(c => {
      const extra = totalFlex > 0 ? (remaining * c.flexWeight) / totalFlex : 0;
      c.finalWidth = Math.min(
        c.minWidth + extra,
        c.maxWidth
      );
    });

    // Recalculer : si des colonnes ont atteint leur max, redistribuer le reste
    const allocated = cols.reduce((s, c) => s + c.finalWidth, 0);
    const residual = usableWidth - allocated;

    if (residual > 2) {
      // Colonnes qui peuvent encore recevoir de l'espace (n'ont pas atteint max)
      const expandable = cols.filter(c => c.finalWidth < c.maxWidth);
      if (expandable.length > 0) {
        const expandFlex = expandable.reduce((s, c) => s + c.flexWeight, 0);
        expandable.forEach(c => {
          const bonus = (residual * c.flexWeight) / expandFlex;
          c.finalWidth = Math.min(c.finalWidth + bonus, c.maxWidth);
        });
      } else {
        // Tout le monde à max — stretch les colonnes flex libres uniformément
        const stretchable = cols.filter(c => c.canWrap);
        if (stretchable.length > 0) {
          const perCol = residual / stretchable.length;
          stretchable.forEach(c => { c.finalWidth += perCol; });
        }
      }
    }

    // Arrondir et s'assurer que la somme ne dépasse pas usableWidth
    let total = 0;
    cols.forEach(c => {
      c.finalWidth = Math.floor(c.finalWidth);
      total += c.finalWidth;
    });

    // Ajouter les points restants à la colonne la plus large
    const diff = Math.floor(usableWidth) - total;
    if (diff > 0 && cols.length > 0) {
      const widestIdx = cols.reduce((maxI, c, i, arr) => c.finalWidth > arr[maxI].finalWidth ? i : maxI, 0);
      cols[widestIdx].finalWidth += diff;
    }

    return cols;
  }

  /**
   * Estime le nombre de lignes d'une valeur dans une colonne donnée.
   */
  static estimateWrappedLines(text: string, columnWidth: number, fontSize: number, charWidth = 5.5): number {
    if (!text) return 1;
    const charsPerLine = Math.max(1, Math.floor(columnWidth / (fontSize * 0.55)));
    const words = text.split(/\s+/);
    let lines = 1;
    let lineLen = 0;
    for (const word of words) {
      if (lineLen + word.length + 1 > charsPerLine && lineLen > 0) {
        lines++;
        lineLen = word.length;
      } else {
        lineLen += word.length + 1;
      }
    }
    return lines;
  }

  /**
   * Calcule la hauteur d'une ligne en tenant compte du wrapping.
   */
  static estimateRowHeight(
    row: Record<string, unknown>,
    columns: ColumnMetrics[],
    fontSize: number
  ): number {
    const lineHeight = fontSize * 1.3;
    let maxLines = 1;
    for (const col of columns) {
      if (!col.canWrap) continue;
      const text = FontManager.sanitize(row[col.key]);
      const lines = ColumnAnalyzer.estimateWrappedLines(text, col.finalWidth, fontSize);
      if (lines > maxLines) maxLines = lines;
    }
    return lineHeight * maxLines + VALIDATION.verticalPaddingPerRow;
  }
}
