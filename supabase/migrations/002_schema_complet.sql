-- ============================================================
-- AGRIFRIK ERP — Schéma complet
-- Migration 002 — 12 juillet 2026
-- ============================================================

-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================
-- MULTI-TENANT : ORGANISATIONS
-- ============================================================

CREATE TABLE IF NOT EXISTS organisations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nom VARCHAR(255) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  logo_url TEXT,
  secteur VARCHAR(100) DEFAULT 'Agriculture',
  pays VARCHAR(100) DEFAULT 'Côte d''Ivoire',
  devise VARCHAR(10) DEFAULT 'XOF',
  langue VARCHAR(10) DEFAULT 'fr',
  telephone VARCHAR(50),
  email VARCHAR(255),
  adresse TEXT,
  site_web VARCHAR(255),
  -- Licence
  plan VARCHAR(50) DEFAULT 'essai', -- essai, starter, pro, enterprise
  licence_debut TIMESTAMPTZ DEFAULT NOW(),
  licence_fin TIMESTAMPTZ DEFAULT NOW() + INTERVAL '14 days',
  licence_statut VARCHAR(50) DEFAULT 'essai', -- essai, actif, expire, suspendu
  max_utilisateurs INT DEFAULT 3,
  max_entites INT DEFAULT 1,
  -- Méta
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- UTILISATEURS (étend auth.users de Supabase)
-- ============================================================

CREATE TABLE IF NOT EXISTS profils (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  organisation_id UUID REFERENCES organisations(id) ON DELETE CASCADE,
  nom VARCHAR(255),
  prenom VARCHAR(255),
  email VARCHAR(255),
  telephone VARCHAR(50),
  avatar_url TEXT,
  role VARCHAR(50) DEFAULT 'operateur',
  -- roles: superadmin, admin, gestionnaire, superviseur, operateur, lecteur, auditeur, commercial
  actif BOOLEAN DEFAULT TRUE,
  derniere_connexion TIMESTAMPTZ,
  preferences JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- PRODUCTION — EXPLOITATIONS
-- ============================================================

CREATE TABLE IF NOT EXISTS exploitations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organisation_id UUID NOT NULL REFERENCES organisations(id) ON DELETE CASCADE,
  nom VARCHAR(255) NOT NULL,
  code VARCHAR(50),
  type VARCHAR(100),
  superficie NUMERIC(10,2),
  localisation TEXT,
  latitude NUMERIC(10,7),
  longitude NUMERIC(10,7),
  responsable VARCHAR(255),
  statut VARCHAR(50) DEFAULT 'Active',
  date_creation DATE,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS parcelles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organisation_id UUID NOT NULL REFERENCES organisations(id) ON DELETE CASCADE,
  exploitation_id UUID REFERENCES exploitations(id),
  code VARCHAR(50) NOT NULL,
  nom VARCHAR(255),
  superficie NUMERIC(10,2),
  culture_principale VARCHAR(100),
  statut VARCHAR(50) DEFAULT 'Active',
  latitude NUMERIC(10,7),
  longitude NUMERIC(10,7),
  coordonnees JSONB, -- GeoJSON polygon
  sol VARCHAR(100),
  irrigation BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS cultures (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organisation_id UUID NOT NULL REFERENCES organisations(id) ON DELETE CASCADE,
  parcelle_id UUID REFERENCES parcelles(id),
  nom VARCHAR(255) NOT NULL,
  variete VARCHAR(255),
  stade VARCHAR(100),
  date_debut DATE,
  date_fin DATE,
  surface NUMERIC(10,2),
  progress INT DEFAULT 0,
  rendement_prevu NUMERIC(10,2),
  rendement_reel NUMERIC(10,2),
  statut VARCHAR(50) DEFAULT 'Active',
  operateur VARCHAR(255),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS semences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organisation_id UUID NOT NULL REFERENCES organisations(id) ON DELETE CASCADE,
  nom VARCHAR(255) NOT NULL,
  variete VARCHAR(255),
  categorie VARCHAR(100),
  fournisseur VARCHAR(255),
  quantite_stock NUMERIC(10,2),
  unite VARCHAR(50),
  taux_germination NUMERIC(5,2),
  date_reception DATE,
  date_expiration DATE,
  statut VARCHAR(50) DEFAULT 'Disponible',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- ELEVAGE & PISCICULTURE
-- ============================================================

CREATE TABLE IF NOT EXISTS elevages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organisation_id UUID NOT NULL REFERENCES organisations(id) ON DELETE CASCADE,
  exploitation_id UUID REFERENCES exploitations(id),
  nom VARCHAR(255) NOT NULL,
  type_animal VARCHAR(100),
  race VARCHAR(100),
  effectif INT DEFAULT 0,
  statut VARCHAR(50) DEFAULT 'Actif',
  responsable VARCHAR(255),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS piscicultures (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organisation_id UUID NOT NULL REFERENCES organisations(id) ON DELETE CASCADE,
  nom VARCHAR(255) NOT NULL,
  type_poisson VARCHAR(100),
  capacite INT,
  effectif_actuel INT DEFAULT 0,
  superficie_bassin NUMERIC(10,2),
  statut VARCHAR(50) DEFAULT 'Actif',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- LOGISTIQUE — STOCKS
-- ============================================================

CREATE TABLE IF NOT EXISTS categories_stock (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organisation_id UUID NOT NULL REFERENCES organisations(id) ON DELETE CASCADE,
  nom VARCHAR(255) NOT NULL,
  type VARCHAR(100), -- Produit agricole, Intrant, Consommable, Matériel
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS stocks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organisation_id UUID NOT NULL REFERENCES organisations(id) ON DELETE CASCADE,
  categorie_id UUID REFERENCES categories_stock(id),
  entrepot_id UUID, -- FK vers entrepots (défini après)
  code VARCHAR(100),
  nom VARCHAR(255) NOT NULL,
  description TEXT,
  unite VARCHAR(50),
  quantite NUMERIC(10,3) DEFAULT 0,
  quantite_min NUMERIC(10,3) DEFAULT 0,
  prix_unitaire NUMERIC(15,2) DEFAULT 0,
  valeur_totale NUMERIC(15,2) GENERATED ALWAYS AS (quantite * prix_unitaire) STORED,
  statut VARCHAR(50) DEFAULT 'Normal', -- Normal, Bas, Critique, Rupture
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS entrepots (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organisation_id UUID NOT NULL REFERENCES organisations(id) ON DELETE CASCADE,
  exploitation_id UUID REFERENCES exploitations(id),
  nom VARCHAR(255) NOT NULL,
  code VARCHAR(50),
  type VARCHAR(100),
  capacite NUMERIC(10,2),
  localisation TEXT,
  responsable VARCHAR(255),
  statut VARCHAR(50) DEFAULT 'Actif',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE stocks ADD CONSTRAINT fk_stocks_entrepot
  FOREIGN KEY (entrepot_id) REFERENCES entrepots(id) ON DELETE SET NULL;

CREATE TABLE IF NOT EXISTS mouvements_stock (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organisation_id UUID NOT NULL REFERENCES organisations(id) ON DELETE CASCADE,
  stock_id UUID NOT NULL REFERENCES stocks(id),
  type VARCHAR(50) NOT NULL, -- Entrée, Sortie, Transfert, Perte, Ajustement
  quantite NUMERIC(10,3) NOT NULL,
  quantite_avant NUMERIC(10,3),
  quantite_apres NUMERIC(10,3),
  entrepot_source_id UUID REFERENCES entrepots(id),
  entrepot_destination_id UUID REFERENCES entrepots(id),
  reference_bl VARCHAR(100),
  date_mouvement DATE DEFAULT CURRENT_DATE,
  operateur_id UUID REFERENCES profils(id),
  motif TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS intrants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organisation_id UUID NOT NULL REFERENCES organisations(id) ON DELETE CASCADE,
  nom VARCHAR(255) NOT NULL,
  type VARCHAR(100), -- Engrais, Pesticide, Herbicide, Fongicide, Semence
  fournisseur VARCHAR(255),
  quantite_stock NUMERIC(10,3) DEFAULT 0,
  unite VARCHAR(50),
  prix_unitaire NUMERIC(15,2),
  date_expiration DATE,
  statut VARCHAR(50) DEFAULT 'Disponible',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- FOURNISSEURS & ACHATS
-- ============================================================

CREATE TABLE IF NOT EXISTS fournisseurs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organisation_id UUID NOT NULL REFERENCES organisations(id) ON DELETE CASCADE,
  nom VARCHAR(255) NOT NULL,
  code VARCHAR(50),
  categorie VARCHAR(100),
  contact VARCHAR(255),
  telephone VARCHAR(50),
  email VARCHAR(255),
  adresse TEXT,
  pays VARCHAR(100),
  rib VARCHAR(255),
  statut VARCHAR(50) DEFAULT 'Actif',
  evaluation INT DEFAULT 0, -- 0-5
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS achats (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organisation_id UUID NOT NULL REFERENCES organisations(id) ON DELETE CASCADE,
  fournisseur_id UUID REFERENCES fournisseurs(id),
  reference VARCHAR(100),
  date_achat DATE DEFAULT CURRENT_DATE,
  date_livraison_prevue DATE,
  date_livraison_reelle DATE,
  montant_ht NUMERIC(15,2) DEFAULT 0,
  tva NUMERIC(5,2) DEFAULT 18,
  montant_ttc NUMERIC(15,2) DEFAULT 0,
  statut VARCHAR(50) DEFAULT 'En attente', -- En attente, Commandé, Reçu, Annulé
  notes TEXT,
  created_by UUID REFERENCES profils(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS materiels (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organisation_id UUID NOT NULL REFERENCES organisations(id) ON DELETE CASCADE,
  exploitation_id UUID REFERENCES exploitations(id),
  nom VARCHAR(255) NOT NULL,
  code VARCHAR(50),
  type VARCHAR(100),
  marque VARCHAR(100),
  modele VARCHAR(100),
  numero_serie VARCHAR(100),
  date_acquisition DATE,
  valeur_acquisition NUMERIC(15,2),
  statut VARCHAR(50) DEFAULT 'Opérationnel',
  prochaine_maintenance DATE,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- COMMERCE — VENTES & CLIENTS
-- ============================================================

CREATE TABLE IF NOT EXISTS clients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organisation_id UUID NOT NULL REFERENCES organisations(id) ON DELETE CASCADE,
  nom VARCHAR(255) NOT NULL,
  code VARCHAR(50),
  type VARCHAR(100), -- Particulier, Entreprise, Exportateur, Coopérative
  contact VARCHAR(255),
  telephone VARCHAR(50),
  email VARCHAR(255),
  adresse TEXT,
  pays VARCHAR(100) DEFAULT 'Côte d''Ivoire',
  statut VARCHAR(50) DEFAULT 'Actif',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS commandes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organisation_id UUID NOT NULL REFERENCES organisations(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL, -- Vente, Achat
  client_id UUID REFERENCES clients(id),
  fournisseur_id UUID REFERENCES fournisseurs(id),
  reference VARCHAR(100),
  produit VARCHAR(255),
  quantite NUMERIC(10,3),
  unite VARCHAR(50),
  prix_unitaire NUMERIC(15,2),
  total NUMERIC(15,2),
  devise VARCHAR(10) DEFAULT 'XOF',
  incoterm VARCHAR(50),
  statut VARCHAR(50) DEFAULT 'En attente',
  date_commande DATE DEFAULT CURRENT_DATE,
  date_livraison DATE,
  notes TEXT,
  created_by UUID REFERENCES profils(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS factures (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organisation_id UUID NOT NULL REFERENCES organisations(id) ON DELETE CASCADE,
  commande_id UUID REFERENCES commandes(id),
  client_id UUID REFERENCES clients(id),
  numero VARCHAR(100) UNIQUE NOT NULL,
  montant_ht NUMERIC(15,2) NOT NULL,
  tva NUMERIC(5,2) DEFAULT 18,
  montant_ttc NUMERIC(15,2) NOT NULL,
  statut VARCHAR(50) DEFAULT 'Brouillon',
  date_emission DATE DEFAULT CURRENT_DATE,
  date_echeance DATE,
  date_paiement DATE,
  notes TEXT,
  created_by UUID REFERENCES profils(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS devis (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organisation_id UUID NOT NULL REFERENCES organisations(id) ON DELETE CASCADE,
  client_id UUID REFERENCES clients(id),
  numero VARCHAR(100) UNIQUE NOT NULL,
  montant_ht NUMERIC(15,2) NOT NULL,
  tva NUMERIC(5,2) DEFAULT 18,
  montant_ttc NUMERIC(15,2) NOT NULL,
  statut VARCHAR(50) DEFAULT 'Brouillon',
  date_emission DATE DEFAULT CURRENT_DATE,
  date_validite DATE,
  notes TEXT,
  created_by UUID REFERENCES profils(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS contrats (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organisation_id UUID NOT NULL REFERENCES organisations(id) ON DELETE CASCADE,
  type VARCHAR(100), -- Commercial, RH, Fournisseur, Partenariat
  partenaire VARCHAR(255),
  client_id UUID REFERENCES clients(id),
  fournisseur_id UUID REFERENCES fournisseurs(id),
  reference VARCHAR(100),
  objet TEXT,
  montant NUMERIC(15,2),
  devise VARCHAR(10) DEFAULT 'XOF',
  date_debut DATE,
  date_fin DATE,
  statut VARCHAR(50) DEFAULT 'Actif',
  document_url TEXT,
  notes TEXT,
  created_by UUID REFERENCES profils(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- COMMERCE — EXPORTATION / IMPORTATION
-- ============================================================

CREATE TABLE IF NOT EXISTS exportations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organisation_id UUID NOT NULL REFERENCES organisations(id) ON DELETE CASCADE,
  reference VARCHAR(100),
  acheteur VARCHAR(255),
  pays_destination VARCHAR(100),
  produit VARCHAR(255),
  quantite NUMERIC(10,3),
  unite VARCHAR(50),
  prix_unitaire NUMERIC(15,2),
  valeur_totale NUMERIC(15,2),
  devise VARCHAR(10) DEFAULT 'USD',
  incoterm VARCHAR(50),
  certifications TEXT[],
  statut VARCHAR(50) DEFAULT 'En préparation',
  date_expedition DATE,
  date_livraison DATE,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS importations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organisation_id UUID NOT NULL REFERENCES organisations(id) ON DELETE CASCADE,
  reference VARCHAR(100),
  fournisseur_id UUID REFERENCES fournisseurs(id),
  pays_origine VARCHAR(100),
  produit VARCHAR(255),
  quantite NUMERIC(10,3),
  unite VARCHAR(50),
  valeur_totale NUMERIC(15,2),
  devise VARCHAR(10) DEFAULT 'EUR',
  statut VARCHAR(50) DEFAULT 'En commande',
  date_commande DATE,
  date_arrivee_prevue DATE,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- QUALITÉ & TRAÇABILITÉ
-- ============================================================

CREATE TABLE IF NOT EXISTS lots (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organisation_id UUID NOT NULL REFERENCES organisations(id) ON DELETE CASCADE,
  numero VARCHAR(100) NOT NULL,
  produit VARCHAR(255),
  culture_id UUID REFERENCES cultures(id),
  quantite NUMERIC(10,3),
  unite VARCHAR(50),
  date_recolte DATE,
  date_conditionnement DATE,
  grade VARCHAR(50),
  humidite NUMERIC(5,2),
  statut VARCHAR(50) DEFAULT 'En attente',
  certifications TEXT[],
  traçabilite_complete BOOLEAN DEFAULT FALSE,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS non_conformites (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organisation_id UUID NOT NULL REFERENCES organisations(id) ON DELETE CASCADE,
  lot_id UUID REFERENCES lots(id),
  type VARCHAR(100),
  description TEXT,
  severite VARCHAR(50) DEFAULT 'Mineure',
  statut VARCHAR(50) DEFAULT 'Ouverte',
  action_corrective TEXT,
  responsable_id UUID REFERENCES profils(id),
  date_detection DATE DEFAULT CURRENT_DATE,
  date_resolution DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS certifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organisation_id UUID NOT NULL REFERENCES organisations(id) ON DELETE CASCADE,
  exploitation_id UUID REFERENCES exploitations(id),
  nom VARCHAR(255) NOT NULL,
  organisme VARCHAR(255),
  numero_certificat VARCHAR(100),
  date_obtention DATE,
  date_expiration DATE,
  statut VARCHAR(50) DEFAULT 'Active',
  document_url TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS prix_marche (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organisation_id UUID NOT NULL REFERENCES organisations(id) ON DELETE CASCADE,
  produit VARCHAR(255) NOT NULL,
  marche VARCHAR(255),
  prix NUMERIC(15,2) NOT NULL,
  unite VARCHAR(50),
  devise VARCHAR(10) DEFAULT 'XOF',
  date_prix DATE DEFAULT CURRENT_DATE,
  source VARCHAR(255),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- FINANCE
-- ============================================================

CREATE TABLE IF NOT EXISTS ecritures_comptables (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organisation_id UUID NOT NULL REFERENCES organisations(id) ON DELETE CASCADE,
  journal VARCHAR(100) NOT NULL, -- Achats, Ventes, Banque, Caisse, OD
  date_ecriture DATE NOT NULL DEFAULT CURRENT_DATE,
  numero_piece VARCHAR(100),
  compte_debit VARCHAR(20) NOT NULL,
  compte_credit VARCHAR(20) NOT NULL,
  libelle TEXT NOT NULL,
  montant NUMERIC(15,2) NOT NULL,
  devise VARCHAR(10) DEFAULT 'XOF',
  exercice INT DEFAULT EXTRACT(YEAR FROM NOW()),
  valide BOOLEAN DEFAULT FALSE,
  created_by UUID REFERENCES profils(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS budgets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organisation_id UUID NOT NULL REFERENCES organisations(id) ON DELETE CASCADE,
  nom VARCHAR(255) NOT NULL,
  exercice INT NOT NULL,
  categorie VARCHAR(100),
  montant_prevu NUMERIC(15,2) DEFAULT 0,
  montant_realise NUMERIC(15,2) DEFAULT 0,
  devise VARCHAR(10) DEFAULT 'XOF',
  periode VARCHAR(50) DEFAULT 'Annuel',
  statut VARCHAR(50) DEFAULT 'Actif',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS tresorerie (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organisation_id UUID NOT NULL REFERENCES organisations(id) ON DELETE CASCADE,
  compte VARCHAR(255) NOT NULL,
  type_compte VARCHAR(50), -- Banque, Caisse, Mobile Money
  solde NUMERIC(15,2) DEFAULT 0,
  devise VARCHAR(10) DEFAULT 'XOF',
  banque VARCHAR(255),
  rib VARCHAR(100),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organisation_id UUID NOT NULL REFERENCES organisations(id) ON DELETE CASCADE,
  compte_id UUID REFERENCES tresorerie(id),
  type VARCHAR(50), -- Recette, Dépense, Virement
  libelle TEXT NOT NULL,
  montant NUMERIC(15,2) NOT NULL,
  devise VARCHAR(10) DEFAULT 'XOF',
  date_transaction DATE DEFAULT CURRENT_DATE,
  reference VARCHAR(100),
  statut VARCHAR(50) DEFAULT 'Confirmé',
  created_by UUID REFERENCES profils(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS actifs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organisation_id UUID NOT NULL REFERENCES organisations(id) ON DELETE CASCADE,
  exploitation_id UUID REFERENCES exploitations(id),
  nom VARCHAR(255) NOT NULL,
  code VARCHAR(50),
  categorie VARCHAR(100),
  valeur_acquisition NUMERIC(15,2),
  valeur_nette NUMERIC(15,2),
  taux_amortissement NUMERIC(5,2),
  date_acquisition DATE,
  duree_amortissement INT, -- en années
  statut VARCHAR(50) DEFAULT 'Actif',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS assurances (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organisation_id UUID NOT NULL REFERENCES organisations(id) ON DELETE CASCADE,
  assureur VARCHAR(255) NOT NULL,
  numero_police VARCHAR(100),
  type_assurance VARCHAR(100),
  objet_assure TEXT,
  valeur_assuree NUMERIC(15,2),
  prime_annuelle NUMERIC(15,2),
  franchise NUMERIC(15,2),
  date_debut DATE,
  date_fin DATE,
  statut VARCHAR(50) DEFAULT 'Active',
  document_url TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- RESSOURCES HUMAINES
-- ============================================================

CREATE TABLE IF NOT EXISTS employes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organisation_id UUID NOT NULL REFERENCES organisations(id) ON DELETE CASCADE,
  profil_id UUID REFERENCES profils(id),
  matricule VARCHAR(50),
  nom VARCHAR(255) NOT NULL,
  prenom VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  telephone VARCHAR(50),
  poste VARCHAR(255),
  departement VARCHAR(100),
  type_contrat VARCHAR(50), -- CDI, CDD, Saisonnier, Journalier, Stage
  salaire_base NUMERIC(15,2),
  date_embauche DATE,
  date_fin_contrat DATE,
  actif BOOLEAN DEFAULT TRUE,
  photo_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS bulletins_paie (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organisation_id UUID NOT NULL REFERENCES organisations(id) ON DELETE CASCADE,
  employe_id UUID NOT NULL REFERENCES employes(id),
  periode_mois INT NOT NULL, -- 1-12
  periode_annee INT NOT NULL,
  salaire_base NUMERIC(15,2),
  heures_supp NUMERIC(5,2) DEFAULT 0,
  primes NUMERIC(15,2) DEFAULT 0,
  retenues NUMERIC(15,2) DEFAULT 0,
  cnps NUMERIC(15,2) DEFAULT 0,
  irpp NUMERIC(15,2) DEFAULT 0,
  net_a_payer NUMERIC(15,2),
  statut VARCHAR(50) DEFAULT 'Brouillon',
  date_paiement DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS formations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organisation_id UUID NOT NULL REFERENCES organisations(id) ON DELETE CASCADE,
  titre VARCHAR(255) NOT NULL,
  type VARCHAR(100),
  formateur VARCHAR(255),
  date_debut DATE,
  date_fin DATE,
  lieu VARCHAR(255),
  cout NUMERIC(15,2),
  statut VARCHAR(50) DEFAULT 'Planifiée',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS projets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organisation_id UUID NOT NULL REFERENCES organisations(id) ON DELETE CASCADE,
  nom VARCHAR(255) NOT NULL,
  code VARCHAR(50),
  type VARCHAR(100),
  responsable_id UUID REFERENCES profils(id),
  budget NUMERIC(15,2),
  devise VARCHAR(10) DEFAULT 'XOF',
  date_debut DATE,
  date_fin DATE,
  avancement INT DEFAULT 0, -- 0-100%
  statut VARCHAR(50) DEFAULT 'En cours',
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS gestion_terres (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organisation_id UUID NOT NULL REFERENCES organisations(id) ON DELETE CASCADE,
  exploitation_id UUID REFERENCES exploitations(id),
  parcelle_id UUID REFERENCES parcelles(id),
  numero_titre VARCHAR(100),
  type_titre VARCHAR(100), -- Titre foncier, Bail, Permis d'exploiter
  proprietaire VARCHAR(255),
  superficie NUMERIC(10,2),
  date_debut DATE,
  date_fin DATE,
  loyer_annuel NUMERIC(15,2),
  statut VARCHAR(50) DEFAULT 'Actif',
  document_url TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS cooperative (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organisation_id UUID NOT NULL REFERENCES organisations(id) ON DELETE CASCADE,
  nom VARCHAR(255) NOT NULL,
  prenom VARCHAR(255),
  code_membre VARCHAR(50),
  telephone VARCHAR(50),
  superficie NUMERIC(10,2),
  localisation TEXT,
  cultures_principales TEXT[],
  statut VARCHAR(50) DEFAULT 'Actif',
  date_adhesion DATE,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- COLLABORATION
-- ============================================================

CREATE TABLE IF NOT EXISTS taches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organisation_id UUID NOT NULL REFERENCES organisations(id) ON DELETE CASCADE,
  titre VARCHAR(255) NOT NULL,
  description TEXT,
  assignee_id UUID REFERENCES profils(id),
  created_by UUID REFERENCES profils(id),
  priorite VARCHAR(50) DEFAULT 'Normale', -- Faible, Normale, Haute, Urgente
  statut VARCHAR(50) DEFAULT 'À faire', -- À faire, En cours, Terminée, Annulée
  date_echeance DATE,
  module_lie VARCHAR(100),
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organisation_id UUID NOT NULL REFERENCES organisations(id) ON DELETE CASCADE,
  nom VARCHAR(255) NOT NULL,
  type VARCHAR(100),
  categorie VARCHAR(100),
  taille INT,
  url TEXT NOT NULL,
  uploaded_by UUID REFERENCES profils(id),
  module_lie VARCHAR(100),
  ressource_id UUID,
  tags TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organisation_id UUID NOT NULL REFERENCES organisations(id) ON DELETE CASCADE,
  expediteur_id UUID NOT NULL REFERENCES profils(id),
  destinataire_id UUID REFERENCES profils(id),
  sujet VARCHAR(255),
  contenu TEXT NOT NULL,
  lu BOOLEAN DEFAULT FALSE,
  lu_a TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- NOTIFICATIONS & ALERTES
-- ============================================================

CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organisation_id UUID REFERENCES organisations(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profils(id),
  titre VARCHAR(255) NOT NULL,
  message TEXT,
  type VARCHAR(50) DEFAULT 'info', -- info, warning, success, error, urgent
  module VARCHAR(100),
  lien VARCHAR(255),
  lue BOOLEAN DEFAULT FALSE,
  lue_a TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS alertes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organisation_id UUID NOT NULL REFERENCES organisations(id) ON DELETE CASCADE,
  titre VARCHAR(255) NOT NULL,
  message TEXT,
  type VARCHAR(50) DEFAULT 'info',
  niveau VARCHAR(50) DEFAULT 'Normal', -- Normal, Attention, Critique
  module VARCHAR(100),
  resolved BOOLEAN DEFAULT FALSE,
  resolved_at TIMESTAMPTZ,
  resolved_by UUID REFERENCES profils(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- JOURNAL D'AUDIT
-- ============================================================

CREATE TABLE IF NOT EXISTS journal_audit (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organisation_id UUID REFERENCES organisations(id),
  user_id UUID REFERENCES profils(id),
  action VARCHAR(100) NOT NULL,
  module VARCHAR(100),
  ressource VARCHAR(100),
  ressource_id UUID,
  ancienne_valeur JSONB,
  nouvelle_valeur JSONB,
  ip_address INET,
  user_agent TEXT,
  resultat VARCHAR(50) DEFAULT 'Succès',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- LICENCES & PLANS SaaS
-- ============================================================

CREATE TABLE IF NOT EXISTS plans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nom VARCHAR(100) NOT NULL,
  code VARCHAR(50) UNIQUE NOT NULL,
  description TEXT,
  prix NUMERIC(15,2) NOT NULL,
  devise VARCHAR(10) DEFAULT 'XOF',
  periodicite VARCHAR(50) DEFAULT 'Mensuel',
  duree_jours INT DEFAULT 30,
  max_utilisateurs INT DEFAULT 5,
  max_entites INT DEFAULT 1,
  modules_inclus TEXT[],
  stockage_mo INT DEFAULT 1024,
  support VARCHAR(50) DEFAULT 'Email',
  badge_recommande BOOLEAN DEFAULT FALSE,
  actif BOOLEAN DEFAULT TRUE,
  ordre INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS licences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organisation_id UUID NOT NULL REFERENCES organisations(id) ON DELETE CASCADE,
  plan_id UUID REFERENCES plans(id),
  statut VARCHAR(50) DEFAULT 'essai', -- essai, actif, expire, suspendu, annule
  date_debut TIMESTAMPTZ DEFAULT NOW(),
  date_fin TIMESTAMPTZ DEFAULT NOW() + INTERVAL '14 days',
  date_renouvellement TIMESTAMPTZ,
  essai BOOLEAN DEFAULT TRUE,
  mode_lecture_seule BOOLEAN DEFAULT FALSE,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS paiements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organisation_id UUID NOT NULL REFERENCES organisations(id) ON DELETE CASCADE,
  licence_id UUID REFERENCES licences(id),
  reference_externe VARCHAR(255),
  fournisseur VARCHAR(100) DEFAULT 'Moneroo',
  montant NUMERIC(15,2) NOT NULL,
  devise VARCHAR(10) DEFAULT 'XOF',
  statut VARCHAR(50) DEFAULT 'En attente', -- En attente, Confirmé, Échoué, Remboursé
  methode VARCHAR(100), -- Mobile Money, Orange Money, MTN MoMo, Carte, Virement
  payload_webhook JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- EMAIL LOG
-- ============================================================

CREATE TABLE IF NOT EXISTS email_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organisation_id UUID REFERENCES organisations(id),
  user_id UUID REFERENCES profils(id),
  template VARCHAR(100) NOT NULL,
  destinataire VARCHAR(255) NOT NULL,
  sujet VARCHAR(500),
  statut VARCHAR(50) DEFAULT 'Envoyé',
  erreur TEXT,
  idempotency_key VARCHAR(255) UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- INDEX DE PERFORMANCE
-- ============================================================

CREATE INDEX IF NOT EXISTS idx_profils_org ON profils(organisation_id);
CREATE INDEX IF NOT EXISTS idx_cultures_org ON cultures(organisation_id);
CREATE INDEX IF NOT EXISTS idx_stocks_org ON stocks(organisation_id);
CREATE INDEX IF NOT EXISTS idx_commandes_org ON commandes(organisation_id);
CREATE INDEX IF NOT EXISTS idx_factures_org ON factures(organisation_id);
CREATE INDEX IF NOT EXISTS idx_employes_org ON employes(organisation_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id, lue);
CREATE INDEX IF NOT EXISTS idx_journal_audit_org ON journal_audit(organisation_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_mouvements_stock ON mouvements_stock(organisation_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_licences_org ON licences(organisation_id, statut);
CREATE INDEX IF NOT EXISTS idx_email_logs_idempotency ON email_logs(idempotency_key);

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================

-- Activer RLS sur toutes les tables
ALTER TABLE organisations ENABLE ROW LEVEL SECURITY;
ALTER TABLE profils ENABLE ROW LEVEL SECURITY;
ALTER TABLE exploitations ENABLE ROW LEVEL SECURITY;
ALTER TABLE parcelles ENABLE ROW LEVEL SECURITY;
ALTER TABLE cultures ENABLE ROW LEVEL SECURITY;
ALTER TABLE semences ENABLE ROW LEVEL SECURITY;
ALTER TABLE stocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE entrepots ENABLE ROW LEVEL SECURITY;
ALTER TABLE mouvements_stock ENABLE ROW LEVEL SECURITY;
ALTER TABLE intrants ENABLE ROW LEVEL SECURITY;
ALTER TABLE fournisseurs ENABLE ROW LEVEL SECURITY;
ALTER TABLE achats ENABLE ROW LEVEL SECURITY;
ALTER TABLE materiels ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE commandes ENABLE ROW LEVEL SECURITY;
ALTER TABLE factures ENABLE ROW LEVEL SECURITY;
ALTER TABLE devis ENABLE ROW LEVEL SECURITY;
ALTER TABLE contrats ENABLE ROW LEVEL SECURITY;
ALTER TABLE exportations ENABLE ROW LEVEL SECURITY;
ALTER TABLE importations ENABLE ROW LEVEL SECURITY;
ALTER TABLE lots ENABLE ROW LEVEL SECURITY;
ALTER TABLE non_conformites ENABLE ROW LEVEL SECURITY;
ALTER TABLE certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE prix_marche ENABLE ROW LEVEL SECURITY;
ALTER TABLE ecritures_comptables ENABLE ROW LEVEL SECURITY;
ALTER TABLE budgets ENABLE ROW LEVEL SECURITY;
ALTER TABLE tresorerie ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE actifs ENABLE ROW LEVEL SECURITY;
ALTER TABLE assurances ENABLE ROW LEVEL SECURITY;
ALTER TABLE employes ENABLE ROW LEVEL SECURITY;
ALTER TABLE bulletins_paie ENABLE ROW LEVEL SECURITY;
ALTER TABLE formations ENABLE ROW LEVEL SECURITY;
ALTER TABLE projets ENABLE ROW LEVEL SECURITY;
ALTER TABLE gestion_terres ENABLE ROW LEVEL SECURITY;
ALTER TABLE cooperative ENABLE ROW LEVEL SECURITY;
ALTER TABLE taches ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE alertes ENABLE ROW LEVEL SECURITY;
ALTER TABLE journal_audit ENABLE ROW LEVEL SECURITY;
ALTER TABLE licences ENABLE ROW LEVEL SECURITY;
ALTER TABLE paiements ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE elevages ENABLE ROW LEVEL SECURITY;
ALTER TABLE piscicultures ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories_stock ENABLE ROW LEVEL SECURITY;
ALTER TABLE bulletins_paie ENABLE ROW LEVEL SECURITY;

-- Fonction helper : récupérer l'organisation de l'utilisateur connecté
CREATE OR REPLACE FUNCTION get_user_org()
RETURNS UUID AS $$
  SELECT organisation_id FROM profils WHERE id = auth.uid()
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- Fonction helper : rôle de l'utilisateur connecté
CREATE OR REPLACE FUNCTION get_user_role()
RETURNS TEXT AS $$
  SELECT role FROM profils WHERE id = auth.uid()
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- Politique générique : accès uniquement à sa propre organisation
-- (appliquée à toutes les tables avec organisation_id)

DO $$
DECLARE
  t TEXT;
  tables TEXT[] := ARRAY[
    'exploitations','parcelles','cultures','semences','elevages','piscicultures',
    'stocks','entrepots','categories_stock','mouvements_stock','intrants',
    'fournisseurs','achats','materiels','clients','commandes','factures','devis',
    'contrats','exportations','importations','lots','non_conformites','certifications',
    'prix_marche','ecritures_comptables','budgets','tresorerie','transactions',
    'actifs','assurances','employes','bulletins_paie','formations','projets',
    'gestion_terres','cooperative','taches','documents','messages','alertes',
    'journal_audit','licences','paiements','email_logs'
  ];
BEGIN
  FOREACH t IN ARRAY tables LOOP
    EXECUTE format(
      'CREATE POLICY "%s_own_org" ON %s FOR ALL USING (organisation_id = get_user_org())',
      t, t
    );
  END LOOP;
END $$;

-- Profils : un utilisateur voit les profils de son organisation
CREATE POLICY "profils_own_org" ON profils
  FOR ALL USING (organisation_id = get_user_org() OR id = auth.uid());

-- Notifications : chaque utilisateur voit ses propres notifications
DROP POLICY IF EXISTS "notifications_own_org" ON notifications;
CREATE POLICY "notifications_own" ON notifications
  FOR ALL USING (user_id = auth.uid() OR organisation_id = get_user_org());

-- Organisations : un utilisateur peut voir sa propre organisation
CREATE POLICY "organisations_own" ON organisations
  FOR ALL USING (id = get_user_org());

-- Plans : visibles par tous les utilisateurs authentifiés
ALTER TABLE plans ENABLE ROW LEVEL SECURITY;
CREATE POLICY "plans_read_all" ON plans FOR SELECT USING (actif = TRUE);

-- ============================================================
-- DONNÉES INITIALES
-- ============================================================

-- Plans tarifaires AGRIFRIK
INSERT INTO plans (nom, code, prix, devise, periodicite, duree_jours, max_utilisateurs, max_entites, modules_inclus, stockage_mo, support, badge_recommande, actif, ordre)
VALUES
  ('Essai Gratuit', 'essai', 0, 'XOF', 'Essai', 14, 3, 1, ARRAY['cultures','stocks','ventes','rh'], 512, 'Email', FALSE, TRUE, 0),
  ('Starter', 'starter', 25000, 'XOF', 'Mensuel', 30, 5, 1, ARRAY['cultures','stocks','ventes','factures','rh','rapports'], 2048, 'Email', FALSE, TRUE, 1),
  ('Pro', 'pro', 75000, 'XOF', 'Mensuel', 30, 15, 3, ARRAY['cultures','stocks','ventes','factures','exportation','importation','rh','paie','comptabilite','budget','rapports','ia','meteo'], 10240, 'Email + WhatsApp', TRUE, TRUE, 2),
  ('Enterprise', 'enterprise', 150000, 'XOF', 'Mensuel', 30, 999, 999, ARRAY['all'], 51200, 'Dédié 24/7', FALSE, TRUE, 3)
ON CONFLICT (code) DO NOTHING;
