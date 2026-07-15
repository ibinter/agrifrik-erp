import PDFDocument from 'pdfkit';
import { ColumnAnalyzer } from './ColumnAnalyzer';
import { PaginationEngine } from './PaginationEngine';
import { FontManager } from './FontManager';
import { PAGE_DIMENSIONS, VALIDATION, FONT_SIZE } from './constants';
import type { PdfGenerationOptions, GeneratedDocument, ColumnMetrics, DocumentDefinition } from './types';
import type { LayoutCandidate } from './types';

// Couleurs
const COLORS = {
  primary: '#1B5E20',
  primaryLight: '#E8F5E9',
  primaryMid: '#2E7D32',
  orange: '#E65100',
  textDark: '#111827',
  textMid: '#374151',
  textLight: '#6B7280',
  textMuted: '#9CA3AF',
  border: '#E5E7EB',
  zebraLight: '#F9FAFB',
  headerBg: '#F4F8F4',
};

export class PdfBuilder {

  static generate(options: PdfGenerationOptions): GeneratedDocument {
    const { rows, definition, layout, candidate } = options;
    const warnings: string[] = [...candidate.issues];
    const lang = definition.language ?? 'fr';

    // Dimensions de la page
    const dims = PAGE_DIMENSIONS[candidate.format];
    const pageW = candidate.orientation === 'landscape' ? dims.height : dims.width;
    const pageH = candidate.orientation === 'landscape' ? dims.width : dims.height;

    // Colonnes avec largeurs finales (redistribuées par ColumnAnalyzer)
    const columns = ColumnAnalyzer.distributeWidths(layout.columns, candidate.usableWidth);

    // Pagination
    const pagination = PaginationEngine.paginate(rows, candidate, columns);
    if (pagination.wasBalanced) {
      warnings.push('Pages rééquilibrées pour éviter une dernière page trop vide');
    }

    // Créer le document pdfkit
    const doc = new PDFDocument({
      size: [pageW, pageH],
      margins: candidate.margins,
      autoFirstPage: false,
      bufferPages: true,
      info: {
        Title: definition.title,
        Author: definition.company?.name ?? 'AGRIFRIK ERP',
        Creator: 'AGRIFRIK ERP — Moteur PDF v1.0',
        CreationDate: new Date(),
      },
    });

    const chunks: Buffer[] = [];
    doc.on('data', (chunk: Buffer) => chunks.push(chunk));

    // Génération des pages
    for (const page of pagination.pages) {
      doc.addPage({ size: [pageW, pageH], margins: candidate.margins });

      const { top } = candidate.margins;
      let y = top;

      // Header
      if (page.isFirstPage) {
        y = PdfBuilder.drawMainHeader(doc, definition, candidate, y, lang);
      } else {
        y = PdfBuilder.drawContinuationHeader(
          doc, definition, page.pageNumber, pagination.totalPages, candidate, y, lang
        );
      }

      // En-tête des colonnes
      y = PdfBuilder.drawColumnHeaders(doc, columns, candidate, y);

      // Lignes de données
      PdfBuilder.drawRows(doc, page.rows, columns, candidate, y);

      // Pied de page
      PdfBuilder.drawFooter(doc, definition, page.pageNumber, pagination.totalPages, candidate, lang);
    }

    // Finaliser
    doc.end();

    const buffer = Buffer.concat(chunks);
    return {
      buffer,
      pageCount: pagination.totalPages,
      format: candidate.format,
      orientation: candidate.orientation,
      warnings,
    };
  }

  // ─── Header principal (page 1) ───────────────────────────────

  static drawMainHeader(
    doc: InstanceType<typeof PDFDocument>,
    definition: DocumentDefinition,
    candidate: LayoutCandidate,
    startY: number,
    lang: 'fr' | 'en'
  ): number {
    const { left } = candidate.margins;
    const usableW = candidate.usableWidth;
    let y = startY;

    // Bande verte en haut
    doc.rect(left, y, usableW, 4).fill(COLORS.primary);
    y += 10;

    // Logo + titre entreprise
    const company = definition.company;
    let textStartX = left;

    if (company?.logo) {
      try {
        doc.image(company.logo, left, y, { width: 40, height: 40 });
        textStartX = left + 48;
      } catch {
        // Logo invalide — ignorer
      }
    }

    if (company?.name) {
      doc.font('Helvetica-Bold').fontSize(11).fillColor(COLORS.primary)
        .text(FontManager.sanitize(company.name), textStartX, y + 4, {
          width: usableW - (textStartX - left),
        });
      y += 16;
      if (company.address || company.phone) {
        const contactParts = [company.address, company.phone, company.email]
          .filter((v): v is string => Boolean(v))
          .map(FontManager.sanitize);
        doc.font('Helvetica').fontSize(8).fillColor(COLORS.textLight)
          .text(contactParts.join(' | '), textStartX, y, {
            width: usableW - (textStartX - left),
          });
        y += 12;
      }
    }

    y += 6;

    // Titre du document
    doc.font('Helvetica-Bold').fontSize(FONT_SIZE.title.default).fillColor(COLORS.primary)
      .text(FontManager.sanitize(definition.title), left, y, { width: usableW, lineGap: 2 });
    y += FONT_SIZE.title.default * 1.4 + 4;

    // Sous-titre
    if (definition.subtitle) {
      doc.font('Helvetica').fontSize(FONT_SIZE.subtitle.default).fillColor(COLORS.textMid)
        .text(FontManager.sanitize(definition.subtitle), left, y, { width: usableW });
      y += FONT_SIZE.subtitle.default * 1.4 + 2;
    }

    // Période / référence / filtres
    const meta: string[] = [];
    if (definition.period) {
      meta.push((lang === 'fr' ? 'Période : ' : 'Period: ') + definition.period);
    }
    if (definition.reference) {
      meta.push((lang === 'fr' ? 'Réf. : ' : 'Ref.: ') + definition.reference);
    }
    if (definition.filters) {
      Object.entries(definition.filters).forEach(([k, v]) => meta.push(`${k}: ${v}`));
    }
    if (meta.length > 0) {
      doc.font('Helvetica').fontSize(8).fillColor(COLORS.textLight)
        .text(meta.join('  ·  '), left, y, { width: usableW });
      y += 12;
    }

    // Date de génération
    const dateStr = new Date().toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US', {
      day: '2-digit', month: 'long', year: 'numeric',
    });
    doc.font('Helvetica').fontSize(7.5).fillColor(COLORS.textMuted)
      .text(
        `${lang === 'fr' ? 'Généré le' : 'Generated on'} ${dateStr}`,
        left, y,
        { width: usableW, align: 'right' }
      );
    y += 12;

    // Ligne séparatrice
    doc.moveTo(left, y).lineTo(left + usableW, y).lineWidth(0.5).strokeColor(COLORS.border).stroke();
    y += 8;

    return y;
  }

  // ─── Header de continuation ───────────────────────────────────

  static drawContinuationHeader(
    doc: InstanceType<typeof PDFDocument>,
    definition: DocumentDefinition,
    pageNum: number,
    totalPages: number,
    candidate: LayoutCandidate,
    startY: number,
    lang: 'fr' | 'en'
  ): number {
    const { left } = candidate.margins;
    const usableW = candidate.usableWidth;
    let y = startY;

    // Petite bande verte
    doc.rect(left, y, usableW, 2).fill(COLORS.primary);
    y += 6;

    // Titre compact + "Suite — Page X / Y"
    const suite = lang === 'fr' ? 'Suite' : 'Continued';
    doc.font('Helvetica-Bold').fontSize(9).fillColor(COLORS.primary)
      .text(FontManager.sanitize(definition.title), left, y, { continued: true });
    doc.font('Helvetica').fontSize(9).fillColor(COLORS.textLight)
      .text(`  —  ${suite}`, { continued: true });
    doc.font('Helvetica').fontSize(9).fillColor(COLORS.textMuted)
      .text(`  |  Page ${pageNum} / ${totalPages}`, { align: 'right' });
    y += 14;

    // Ligne séparatrice
    doc.moveTo(left, y).lineTo(left + usableW, y).lineWidth(0.3).strokeColor(COLORS.border).stroke();
    y += 6;

    return y;
  }

  // ─── En-tête des colonnes ─────────────────────────────────────

  static drawColumnHeaders(
    doc: InstanceType<typeof PDFDocument>,
    columns: ColumnMetrics[],
    candidate: LayoutCandidate,
    startY: number
  ): number {
    const { left } = candidate.margins;
    const rowH = VALIDATION.headerRowHeight;

    // Fond de l'en-tête
    const totalW = columns.reduce((s, c) => s + c.finalWidth, 0);
    doc.rect(left, startY, totalW, rowH).fill(COLORS.headerBg);

    // Texte des colonnes
    doc.font('Helvetica-Bold').fontSize(candidate.headerFontSize).fillColor(COLORS.textMid);

    let x = left;
    for (const col of columns) {
      const label = FontManager.sanitize(col.abbreviation ?? col.label);
      doc.text(label, x + 4, startY + (rowH - candidate.headerFontSize * 1.2) / 2, {
        width: col.finalWidth - 8,
        align: col.align === 'right' ? 'right' : col.align === 'center' ? 'center' : 'left',
        lineBreak: false,
        ellipsis: true,
      });
      // Séparateur vertical
      if (x > left) {
        doc.moveTo(x, startY).lineTo(x, startY + rowH).lineWidth(0.3).strokeColor(COLORS.border).stroke();
      }
      x += col.finalWidth;
    }

    // Bordure inférieure de l'en-tête
    doc.moveTo(left, startY + rowH).lineTo(left + totalW, startY + rowH)
      .lineWidth(0.8).strokeColor(COLORS.primaryMid).stroke();

    return startY + rowH;
  }

  // ─── Lignes de données ────────────────────────────────────────

  static drawRows(
    doc: InstanceType<typeof PDFDocument>,
    rows: Record<string, unknown>[],
    columns: ColumnMetrics[],
    candidate: LayoutCandidate,
    startY: number
  ): number {
    const { left } = candidate.margins;
    const totalW = columns.reduce((s, c) => s + c.finalWidth, 0);
    let y = startY;

    rows.forEach((row, rowIdx) => {
      const isZebra = rowIdx % 2 === 1;
      const rowH = ColumnAnalyzer.estimateRowHeight(row, columns, candidate.fontSize);

      // Fond de la ligne
      if (isZebra) {
        doc.rect(left, y, totalW, rowH).fill(COLORS.zebraLight);
      }

      // Contenu des cellules
      doc.font('Helvetica').fontSize(candidate.fontSize).fillColor(COLORS.textDark);

      let x = left;
      for (const col of columns) {
        const rawVal = row[col.key];
        let text: string;

        // Formatage selon le type
        if (col.type === 'boolean') {
          text = FontManager.formatBoolean(rawVal);
        } else if (col.type === 'status') {
          text = FontManager.formatStatus(rawVal, 'fr');
        } else {
          text = FontManager.sanitize(rawVal);
        }

        const cellPadX = 6;
        const cellPadY = 3;
        const textW = col.finalWidth - cellPadX * 2;

        if (col.canWrap && !col.nowrap) {
          doc.text(text, x + cellPadX, y + cellPadY, {
            width: textW,
            align: col.align,
            lineGap: 1,
          });
        } else {
          doc.text(text, x + cellPadX, y + cellPadY, {
            width: textW,
            align: col.align,
            lineBreak: false,
            ellipsis: true,
          });
        }

        x += col.finalWidth;
      }

      // Bordure inférieure de la ligne
      doc.moveTo(left, y + rowH).lineTo(left + totalW, y + rowH)
        .lineWidth(0.2).strokeColor(COLORS.border).stroke();

      y += rowH;
    });

    return y;
  }

  // ─── Pied de page ─────────────────────────────────────────────

  static drawFooter(
    doc: InstanceType<typeof PDFDocument>,
    definition: DocumentDefinition,
    pageNum: number,
    totalPages: number,
    candidate: LayoutCandidate,
    lang: 'fr' | 'en'
  ): void {
    const { left, bottom } = candidate.margins;
    const usableW = candidate.usableWidth;
    const dims = PAGE_DIMENSIONS[candidate.format];
    const pageH = candidate.orientation === 'landscape' ? dims.width : dims.height;
    const footerY = pageH - bottom - VALIDATION.footerHeight;

    // Ligne séparatrice du footer
    doc.moveTo(left, footerY).lineTo(left + usableW, footerY)
      .lineWidth(0.4).strokeColor(COLORS.border).stroke();

    const textY = footerY + 6;
    doc.font('Helvetica').fontSize(FONT_SIZE.footer.default).fillColor(COLORS.textMuted);

    // Gauche : logiciel + société
    const leftParts = [definition.company?.name, 'AGRIFRIK ERP']
      .filter((v): v is string => Boolean(v))
      .map(FontManager.sanitize);
    const leftText = leftParts.join(' | ');
    doc.text(leftText, left, textY, { width: usableW * 0.4, lineBreak: false });

    // Centre : confidentiel
    const confText = lang === 'fr' ? 'Document confidentiel' : 'Confidential document';
    doc.text(confText, left + usableW * 0.3, textY, {
      width: usableW * 0.4,
      align: 'center',
      lineBreak: false,
    });

    // Droite : page + date
    const dateStr = new Date().toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US', {
      day: '2-digit', month: '2-digit', year: 'numeric',
    });
    doc.text(`Page ${pageNum} / ${totalPages}  ·  ${dateStr}`, left + usableW * 0.6, textY, {
      width: usableW * 0.4,
      align: 'right',
      lineBreak: false,
    });
  }
}
