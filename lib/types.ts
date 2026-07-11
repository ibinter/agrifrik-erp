// ====== PRODUCTION ======

export interface Culture {
  id: string;
  nom: string;
  parcelle: string;
  surface: number;
  stade: "Semis" | "Germination" | "Croissance" | "Floraison" | "Maturation" | "Récolte" | "Post-récolte";
  dateDebut: string;
  dateFin?: string;
  progress: number;
  rendementPrevu: number;
  rendementReel?: number;
  statut: "Active" | "Terminée" | "En pause";
  operateur?: string;
}

export interface Parcelle {
  id: string;
  code: string;
  localite: string;
  culture: string;
  surface: number;
  sol: string;
  propriete: "Propriété" | "Fermage";
  gpsLat?: number;
  gpsLng?: number;
  statut: "Active" | "En repos" | "En récolte" | "Vide";
  certifiee: boolean;
}

// ====== STOCKS ======

export interface StockItem {
  id: string;
  produit: string;
  categorie: "Production" | "Intrants" | "Emballage" | "Équipement";
  quantite: number;
  unite: string;
  seuilCritique: number;
  entrepot: string;
  valeur: number;
  datePeremption?: string;
  fournisseur?: string;
}

export interface MouvementStock {
  id: string;
  stockId: string;
  type: "Entrée" | "Sortie" | "Transfert" | "Perte" | "Ajustement";
  quantite: number;
  entrepotSource?: string;
  entrepotDestination?: string;
  referenceBL?: string;
  dateMouvement: string;
  operateur: string;
  motif?: string;
}

// ====== COMMERCE ======

export interface Commande {
  id: string;
  type: "Vente" | "Achat";
  partenaire: string;
  produit: string;
  quantite: number;
  prixUnitaire: number;
  total: number;
  statut: "En attente" | "Confirmée" | "En cours" | "Livrée" | "Annulée" | "Litige";
  dateCommande: string;
  dateLivraison?: string;
  incoterm?: string;
  devise?: "XOF" | "EUR" | "USD";
}

export interface Facture {
  id: string;
  numero: string;
  client: string;
  montantHT: number;
  tva: number;
  montantTTC: number;
  statut: "Brouillon" | "Envoyée" | "Payée" | "En retard" | "Annulée";
  dateEmission: string;
  dateEcheance: string;
  datePaiement?: string;
  commandeId?: string;
}

export interface Exportation {
  id: string;
  numeroConteneur: string;
  client: string;
  pays: string;
  produits: { produit: string; quantite: number; lots: string[] }[];
  incoterm: string;
  portDepart: string;
  portArrivee: string;
  dateDepart?: string;
  dateArrivee?: string;
  statut: "Booking" | "Documents" | "Dédouanement" | "Chargement" | "En mer" | "Livré";
  valeurFOB: number;
}

export interface Fournisseur {
  id: string;
  nom: string;
  contact: string;
  telephone: string;
  email: string;
  adresse: string;
  categorie: string;
  statut: "Actif" | "Inactif";
}

// ====== RH ======

export interface Employe {
  id: string;
  nom: string;
  prenom: string;
  poste: string;
  typeContrat: "CDI" | "CDD" | "Saisonnier" | "Stage" | "Journalier";
  salaireBase: number;
  dateEmbauche: string;
  zone?: string;
  telephone?: string;
  email?: string;
  actif: boolean;
  formations?: string[];
}

export interface BulletinPaie {
  id: string;
  employeId: string;
  mois: number;
  annee: number;
  salaireBase: number;
  primes: number;
  heuresSupp: number;
  cotisationsEmploye: number;
  cotisationsEmployeur: number;
  netAPayer: number;
  dateGeneration: string;
  statut: "Brouillon" | "Validé" | "Payé";
}

// ====== FINANCE ======

export interface EcritureComptable {
  id: string;
  date: string;
  numeroJournal: string;
  libelle: string;
  compteDebit: string;
  compteCredit: string;
  montant: number;
  pieceJustificative?: string;
  exercice: string;
}

export interface Actif {
  id: string;
  code: string;
  designation: string;
  dateAcquisition: string;
  valeurBrute: number;
  dureeVie: number;
  tauxAmortissement: number;
  amortissementCumule: number;
  valeurNette: number;
  statut: "Actif" | "Totalement amorti" | "Cédé" | "En maintenance";
  categorie: "Matériel" | "Bâtiment" | "Véhicule" | "Équipement";
}

export interface Assurance {
  id: string;
  numeroPolice: string;
  assureur: string;
  type: string;
  objetAssure: string;
  valeurAssuree: number;
  primeAnnuelle: number;
  franchise: number;
  dateDebut: string;
  dateFin: string;
  statut: "Active" | "Expirée" | "Renouvellement" | "Résiliée";
}

// ====== QUALITÉ ======

export interface Lot {
  id: string;
  numero: string;
  produit: string;
  quantiteEntree: number;
  quantiteSortie?: number;
  parcelle: string;
  operateur: string;
  dateRecolte: string;
  dateFermentation?: string;
  dateSechage?: string;
  grade?: string;
  certificatQualite?: string;
  statut: "Récolte" | "Fermentation" | "Séchage" | "Contrôle" | "Stockage" | "Export" | "Vendu";
  destination?: string;
}

export interface NonConformite {
  id: string;
  date: string;
  description: string;
  criticite: "Critique" | "Majeure" | "Mineure";
  responsable: string;
  echeance: string;
  statut: "Ouverte" | "En traitement" | "Clôturée";
  actionCorrective?: string;
}

// ====== TYPES UTILITAIRES ======

export type StatutCommande = Commande["statut"];
export type TypeContrat = Employe["typeContrat"];
export type CategorieStock = StockItem["categorie"];

export interface User {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  role: "Directeur" | "Comptable" | "Technicien" | "RH" | "Qualité" | "Producteur" | "Stagiaire";
  actif: boolean;
  avatar?: string;
  derniereConnexion?: string;
}

export interface DashboardStats {
  chiffreAffaires: { value: number; change: number; unit: string };
  superficie: { value: number; change: number; unit: string };
  production: { value: number; change: number; unit: string };
  employes: { value: number; change: number; unit: string };
  stocks: { value: number; change: number; unit: string };
  commandes: { value: number; change: number; unit: string };
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  total: number;
  page: number;
  pageSize: number;
}
