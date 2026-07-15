import type { ColumnType, PageFormat, PageOrientation } from './types';

// Points PDF : 1pt = 1/72 pouce
// A4 = 595.28 x 841.89 pt
// A3 = 841.89 x 1190.55 pt

export const PAGE_DIMENSIONS: Record<PageFormat, { width: number; height: number }> = {
  A4: { width: 595.28, height: 841.89 },
  A3: { width: 841.89, height: 1190.55 },
  Letter: { width: 612, height: 792 },
  Legal: { width: 612, height: 1008 },
};

// Marges en points (1mm ≈ 2.835 pt)
export const MARGINS = {
  normal: { top: 45, bottom: 35, left: 45, right: 35 },       // ~16mm / 12mm
  compact: { top: 28, bottom: 22, left: 28, right: 22 },      // ~10mm / 8mm
  landscape: { top: 35, bottom: 25, left: 35, right: 25 },    // paysage normal
  landscapeCompact: { top: 22, bottom: 18, left: 22, right: 18 }, // paysage compact
};

// Tailles police en points (bornes strictes)
export const FONT_SIZE = {
  title: { min: 15, max: 22, default: 18 },
  subtitle: { min: 9, max: 12, default: 10 },
  columnHeader: { min: 7.5, max: 10, default: 8.5 },
  body: { min: 7.5, max: 10.5, default: 9 },
  footer: { min: 6.5, max: 8, default: 7 },
};

// Règles par type de colonne : min/max en points, flex pour redistribution
export const COLUMN_TYPE_RULES: Record<ColumnType, { min: number; max: number; flex: number; align: 'left' | 'center' | 'right'; canWrap: boolean }> = {
  id:           { min: 45, max: 80,  flex: 0.8, align: 'center', canWrap: false },
  reference:    { min: 70, max: 130, flex: 1.0, align: 'left',   canWrap: false },
  name:         { min: 70, max: 160, flex: 2.0, align: 'left',   canWrap: false },
  firstname:    { min: 60, max: 140, flex: 1.8, align: 'left',   canWrap: false },
  email:        { min: 110, max: 230, flex: 3.0, align: 'left',  canWrap: true  },
  phone:        { min: 75, max: 115, flex: 1.0, align: 'center', canWrap: false },
  date:         { min: 62, max: 85,  flex: 0.8, align: 'center', canWrap: false },
  datetime:     { min: 90, max: 130, flex: 1.0, align: 'center', canWrap: false },
  amount:       { min: 65, max: 120, flex: 1.0, align: 'right',  canWrap: false },
  percentage:   { min: 45, max: 70,  flex: 0.7, align: 'center', canWrap: false },
  status:       { min: 55, max: 100, flex: 1.0, align: 'center', canWrap: false },
  code:         { min: 45, max: 90,  flex: 0.8, align: 'center', canWrap: false },
  'short-text': { min: 60, max: 150, flex: 1.5, align: 'left',   canWrap: true  },
  'long-text':  { min: 140, max: 320, flex: 4.0, align: 'left',  canWrap: true  },
  boolean:      { min: 38, max: 60,  flex: 0.5, align: 'center', canWrap: false },
  list:         { min: 80, max: 180, flex: 2.0, align: 'left',   canWrap: true  },
  'free-text':  { min: 140, max: 340, flex: 5.0, align: 'left',  canWrap: true  },
};

// Scores pondérés pour l'algorithme de sélection du meilleur layout
export const LAYOUT_SCORE_WEIGHTS = {
  readability: 30,
  widthUtilization: 25,
  pageFillRatio: 20,
  excessiveWrapping: -15,
  nearlyEmptyLastPage: -20,
  clippedContent: -30,
  unreadableFont: -40,
  corruptedCharacters: -50,
};

// Seuils de validation
export const VALIDATION = {
  minWidthUtilization: 0.82,       // tableau doit couvrir ≥82% de la largeur
  maxWidthUtilization: 1.00,
  minPageFillRatio: 0.30,          // page ne doit pas être vide à >70%
  nearlyEmptyLastPageThreshold: 0.20,
  minBodyFontSize: 7.5,
  maxHeaderHeight: 0.25,           // header ne doit pas dépasser 25% de la hauteur
  minLinesLastPage: 3,
  verticalPaddingPerRow: 6,        // padding haut+bas d'une ligne (pt)
  headerRowHeight: 22,             // hauteur de l'en-tête de colonne
  continuationHeaderHeight: 30,    // height du mini-header sur pages suivantes
  mainHeaderHeight: 90,            // height du header complet (page 1)
  footerHeight: 25,
};

export const PREFERENCE_ORDER: Array<{ format: PageFormat; orientation: PageOrientation }> = [
  { format: 'A4', orientation: 'portrait' },
  { format: 'A4', orientation: 'landscape' },
  { format: 'A3', orientation: 'landscape' },
  { format: 'A3', orientation: 'portrait' },
];
