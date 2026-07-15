import type PDFDocument from 'pdfkit';

// Remplacements de caractères non supportés par les polices PDF standard
const CHAR_REPLACEMENTS: Record<string, string> = {
  // Emojis communs dans les ERP → texte lisible
  '✓': 'Oui',
  '✗': 'Non',
  '✘': 'Non',
  '⚠': '!',
  '⚠️': '!',
  '🔔': '[!]',
  '📊': '',
  '🌿': '',
  '🌾': '',
  '💰': '',
  '👥': '',
  '📋': '',
  '🔧': '',
  // Caractères Windows/Mac courants mal encodés
  'Œ': 'OE',   // Œ
  'œ': 'oe',   // œ
  '‘': "'",    // guillemet courbe gauche
  '’': "'",    // guillemet courbe droit
  '“': '"',
  '”': '"',
  '–': '-',    // tiret demi-cadratin
  '—': '-',    // tiret cadratin
  '·': '.',    // point médian
  '•': '-',    // puce
  ' ': ' ',    // espace insécable
};

export class FontManager {
  static sanitize(text: unknown): string {
    if (text === null || text === undefined) return '';
    const str = String(text);
    // Remplacer les caractères problématiques
    let result = str;
    for (const [char, replacement] of Object.entries(CHAR_REPLACEMENTS)) {
      result = result.split(char).join(replacement);
    }
    // Supprimer les caractères Unicode > U+00FF non supportés par Helvetica
    // (garder les caractères latins étendus qui sont OK)
    result = result.replace(/[^\x00-\xFFÀ-ɏ]/g, (c) => {
      const code = c.charCodeAt(0);
      // Garder les caractères latins étendus courants
      if (code >= 0x00C0 && code <= 0x024F) return c;
      return '';
    });
    // Supprimer emojis et symboles hors BMP
    result = result.replace(/[\uD800-\uDFFF]/g, '');
    return result.trim();
  }

  static formatBoolean(value: unknown, trueLabel = 'Oui', falseLabel = 'Non'): string {
    if (value === true || value === 1 || value === 'true' || value === 'oui' || value === 'yes') return trueLabel;
    if (value === false || value === 0 || value === 'false' || value === 'non' || value === 'no') return falseLabel;
    return String(value ?? '');
  }

  static formatStatus(value: unknown, lang: 'fr' | 'en' = 'fr'): string {
    const statusMap: Record<string, Record<string, string>> = {
      fr: { actif: 'Actif', inactif: 'Inactif', pending: 'En attente', done: 'Terminé', cancelled: 'Annulé', urgent: 'Urgent', normal: 'Normal' },
      en: { actif: 'Active', inactif: 'Inactive', pending: 'Pending', done: 'Done', cancelled: 'Cancelled', urgent: 'Urgent', normal: 'Normal' },
    };
    const key = String(value ?? '').toLowerCase();
    return statusMap[lang][key] ?? FontManager.sanitize(value);
  }

  // Mesure la largeur d'un texte avec pdfkit à une taille donnée
  static measureText(doc: InstanceType<typeof PDFDocument>, text: string, fontSize: number): number {
    doc.fontSize(fontSize);
    return doc.widthOfString(FontManager.sanitize(text));
  }

  // Mesure le texte le plus large dans un tableau de valeurs
  static measureMaxWidth(doc: InstanceType<typeof PDFDocument>, values: string[], fontSize: number): number {
    if (values.length === 0) return 0;
    doc.fontSize(fontSize);
    return Math.max(...values.map(v => doc.widthOfString(FontManager.sanitize(v))));
  }

  // Percentile P90 des largeurs
  static measureP90Width(doc: InstanceType<typeof PDFDocument>, values: string[], fontSize: number): number {
    if (values.length === 0) return 0;
    doc.fontSize(fontSize);
    const widths = values.map(v => doc.widthOfString(FontManager.sanitize(v))).sort((a, b) => a - b);
    const idx = Math.floor(widths.length * 0.90);
    return widths[Math.min(idx, widths.length - 1)];
  }
}
