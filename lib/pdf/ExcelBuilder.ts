import * as XLSX from 'xlsx';
import { FontManager } from './FontManager';
import { COLUMN_TYPE_RULES } from './constants';
import type { DocumentDefinition } from './types';

export class ExcelBuilder {

  static generate(definition: DocumentDefinition, rows: Record<string, unknown>[]): Buffer {
    const workbook = XLSX.utils.book_new();
    const lang = definition.language ?? 'fr';

    // Préparer les données
    const headers = definition.columns.map(c => c.abbreviation ?? c.label);
    const dataRows = rows.map(row =>
      definition.columns.map(col => {
        const val = row[col.key];
        if (col.type === 'boolean') return FontManager.formatBoolean(val);
        if (col.type === 'status') return FontManager.formatStatus(val, lang);
        if (col.type === 'amount') {
          return typeof val === 'number' ? val : parseFloat(String(val ?? 0)) || 0;
        }
        if (col.type === 'date' || col.type === 'datetime') {
          if (val instanceof Date) return val;
          const d = new Date(String(val ?? ''));
          return isNaN(d.getTime()) ? FontManager.sanitize(val) : d;
        }
        return FontManager.sanitize(val);
      })
    );

    // Créer la feuille
    const wsData: unknown[][] = [headers, ...dataRows];
    const ws = XLSX.utils.aoa_to_sheet(wsData);

    // Largeurs de colonnes (en caractères)
    const colWidths = definition.columns.map(col => {
      const rules = COLUMN_TYPE_RULES[col.type] ?? COLUMN_TYPE_RULES['short-text'];
      // Convertir points PDF en caractères Excel (approximation : 1 char Excel ≈ 7pt)
      const minChars = Math.ceil(rules.min / 7);
      const maxChars = Math.ceil(rules.max / 7);
      // Mesurer les données réelles
      const maxDataLen = rows.reduce((m, row) => {
        const v = FontManager.sanitize(row[col.key]);
        return Math.max(m, v.length);
      }, col.label.length);
      return { wch: Math.min(maxChars, Math.max(minChars, maxDataLen + 2)) };
    });
    ws['!cols'] = colWidths;

    // Freeze la ligne d'en-tête
    ws['!freeze'] = { xSplit: 0, ySplit: 1, topLeftCell: 'A2', activePane: 'bottomLeft' };

    // Filtres automatiques
    const lastCol = XLSX.utils.encode_col(definition.columns.length - 1);
    ws['!autofilter'] = { ref: `A1:${lastCol}1` };

    // Options d'impression
    ws['!pageSetup'] = {
      orientation: definition.columns.length > 6 ? 'landscape' : 'portrait',
      fitToPage: true,
      fitToWidth: 1,
      fitToHeight: 0,
      scale: 100,
    };
    ws['!margins'] = {
      left: 0.5, right: 0.5, top: 0.75, bottom: 0.75, header: 0.3, footer: 0.3,
    };
    ws['!printTitles'] = { rows: '$1:$1' }; // Répéter la ligne de titre à l'impression

    // Nom de feuille limité à 31 caractères (limite Excel)
    const sheetName = definition.title.slice(0, 31);
    XLSX.utils.book_append_sheet(workbook, ws, sheetName);

    // Écrire en buffer
    const buf = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx', compression: true }) as Buffer;
    return Buffer.from(buf);
  }
}
