export { ColumnAnalyzer } from './ColumnAnalyzer';
export { LayoutSelector } from './LayoutSelector';
export { PaginationEngine } from './PaginationEngine';
export { PdfBuilder } from './PdfBuilder';
export { ExcelBuilder } from './ExcelBuilder';
export { FontManager } from './FontManager';
export * from './types';
export * from './constants';

// Fonction principale d'export PDF — façade simple pour les modules ERP
import { ColumnAnalyzer } from './ColumnAnalyzer';
import { LayoutSelector } from './LayoutSelector';
import { PdfBuilder } from './PdfBuilder';
import type { DocumentDefinition, GeneratedDocument } from './types';

export async function generatePdf(
  definition: DocumentDefinition,
  rows: Record<string, unknown>[]
): Promise<GeneratedDocument> {
  const partialLayout = await ColumnAnalyzer.analyze(definition, rows);
  const layout = LayoutSelector.select(partialLayout, rows.length);
  const candidate = layout.recommendedCandidate;
  return PdfBuilder.generate({ rows, definition, layout, candidate });
}

export async function generateExcel(
  definition: DocumentDefinition,
  rows: Record<string, unknown>[]
): Promise<Buffer> {
  const { ExcelBuilder } = await import('./ExcelBuilder');
  return ExcelBuilder.generate(definition, rows);
}
