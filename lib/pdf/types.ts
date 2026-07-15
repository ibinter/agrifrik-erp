// Types de données pour les colonnes
export type ColumnType =
  | 'id' | 'reference' | 'name' | 'firstname' | 'email' | 'phone'
  | 'date' | 'datetime' | 'amount' | 'percentage' | 'status'
  | 'code' | 'short-text' | 'long-text' | 'boolean' | 'list' | 'free-text';

export type ColumnPriority = 'essential' | 'important' | 'secondary' | 'optional';

export type PageFormat = 'A4' | 'A3' | 'Letter' | 'Legal';
export type PageOrientation = 'portrait' | 'landscape';

export interface ColumnDefinition {
  key: string;
  label: string;
  type: ColumnType;
  priority: ColumnPriority;
  nowrap?: boolean;           // doit rester sur une seule ligne
  abbreviation?: string;     // libellé court pour l'en-tête si nécessaire
  maxChars?: number;         // longueur max avant ellipsis
  flexWeight?: number;       // poids pour redistribution de l'espace (défaut 1)
  align?: 'left' | 'center' | 'right';
}

export interface DocumentDefinition {
  title: string;
  subtitle?: string;
  documentType: 'data-list' | 'data-list-detailed' | 'analytical-report' | 'register'
    | 'invoice' | 'receipt' | 'individual-card' | 'financial-statement'
    | 'contract' | 'medical' | 'project';
  preferredFormat?: PageFormat | 'auto';
  preferredOrientation?: PageOrientation | 'auto';
  columns: ColumnDefinition[];
  filters?: Record<string, string>;   // filtres actifs à afficher
  company?: CompanyInfo;
  period?: string;
  reference?: string;
  showQR?: boolean;
  language?: 'fr' | 'en';
}

export interface CompanyInfo {
  name: string;
  logo?: Buffer;  // image du logo
  address?: string;
  phone?: string;
  email?: string;
}

export interface ColumnMetrics {
  key: string;
  label: string;
  type: ColumnType;
  priority: ColumnPriority;
  nowrap: boolean;
  naturalWidth: number;       // largeur en points PDF sans contrainte
  minWidth: number;           // largeur minimale acceptable
  maxWidth: number;           // largeur maximale utile
  flexWeight: number;         // poids redistribution
  align: 'left' | 'center' | 'right';
  estimatedAvgChars: number;  // longueur moyenne des valeurs
  estimatedMaxChars: number;  // longueur maximale des valeurs
  canWrap: boolean;           // peut faire un retour à la ligne
  abbreviation?: string;
  finalWidth: number;         // largeur finale assignée par le moteur
}

export interface LayoutCandidate {
  format: PageFormat;
  orientation: PageOrientation;
  margins: PageMargins;
  usableWidth: number;
  usableHeight: number;
  fontSize: number;
  headerFontSize: number;
  rowHeight: number;
  rowsPerPage: number;
  columnWidths: number[];
  totalTableWidth: number;
  estimatedPages: number;
  score: number;
  widthUtilization: number;
  issues: string[];
}

export interface PageMargins {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

export interface DocumentLayoutAnalysis {
  rowCount: number;
  columnCount: number;
  columns: ColumnMetrics[];
  estimatedNaturalWidth: number;
  estimatedCompactWidth: number;
  estimatedRowHeight: number;
  recommendedCandidate: LayoutCandidate;
  allCandidates: LayoutCandidate[];
}

export interface PdfGenerationOptions {
  rows: Record<string, unknown>[];
  definition: DocumentDefinition;
  layout: DocumentLayoutAnalysis;
  candidate: LayoutCandidate;
}

export interface GeneratedDocument {
  buffer: Buffer;
  pageCount: number;
  format: PageFormat;
  orientation: PageOrientation;
  warnings: string[];
}
