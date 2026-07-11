-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table: parcelles
CREATE TABLE parcelles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code VARCHAR(20) UNIQUE NOT NULL,
  localite VARCHAR(100) NOT NULL,
  culture VARCHAR(50) NOT NULL,
  surface DECIMAL(8,2) NOT NULL,
  sol VARCHAR(50),
  propriete VARCHAR(20) DEFAULT 'Propriété',
  gps_lat DECIMAL(10,7),
  gps_lng DECIMAL(10,7),
  statut VARCHAR(20) DEFAULT 'Active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table: cultures (campagnes agricoles)
CREATE TABLE cultures (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nom VARCHAR(100) NOT NULL,
  parcelle VARCHAR(20) REFERENCES parcelles(code),
  surface DECIMAL(8,2) NOT NULL,
  stade VARCHAR(30) DEFAULT 'Semis',
  date_debut DATE NOT NULL,
  date_fin DATE,
  progress INTEGER DEFAULT 0,
  rendement_prevu DECIMAL(8,2),
  statut VARCHAR(20) DEFAULT 'Active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table: employes
CREATE TABLE employes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nom VARCHAR(50) NOT NULL,
  prenom VARCHAR(50) NOT NULL,
  poste VARCHAR(100) NOT NULL,
  type_contrat VARCHAR(20) NOT NULL,
  salaire_base DECIMAL(12,2) NOT NULL,
  date_embauche DATE NOT NULL,
  zone VARCHAR(50),
  telephone VARCHAR(20),
  email VARCHAR(100),
  actif BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table: stocks
CREATE TABLE stocks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  produit VARCHAR(100) NOT NULL,
  categorie VARCHAR(50) NOT NULL,
  quantite DECIMAL(10,2) DEFAULT 0,
  unite VARCHAR(20) NOT NULL,
  seuil_critique DECIMAL(10,2) DEFAULT 0,
  entrepot VARCHAR(50),
  valeur DECIMAL(14,2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table: commandes
CREATE TABLE commandes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client VARCHAR(100) NOT NULL,
  produit VARCHAR(100) NOT NULL,
  quantite DECIMAL(10,2) NOT NULL,
  prix_unitaire DECIMAL(12,2) NOT NULL,
  total DECIMAL(14,2) NOT NULL,
  statut VARCHAR(30) DEFAULT 'En attente',
  date_commande DATE DEFAULT CURRENT_DATE,
  date_livraison DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table: mouvements_stock
CREATE TABLE mouvements_stock (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  stock_id UUID REFERENCES stocks(id),
  type VARCHAR(20) NOT NULL, -- 'Entrée', 'Sortie', 'Transfert'
  quantite DECIMAL(10,2) NOT NULL,
  entrepot_source VARCHAR(50),
  entrepot_destination VARCHAR(50),
  reference_bl VARCHAR(50),
  date_mouvement DATE DEFAULT CURRENT_DATE,
  operateur VARCHAR(100),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS (Row Level Security)
ALTER TABLE parcelles ENABLE ROW LEVEL SECURITY;
ALTER TABLE cultures ENABLE ROW LEVEL SECURITY;
ALTER TABLE employes ENABLE ROW LEVEL SECURITY;
ALTER TABLE stocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE commandes ENABLE ROW LEVEL SECURITY;
ALTER TABLE mouvements_stock ENABLE ROW LEVEL SECURITY;

-- Policies (allow all for service role)
CREATE POLICY "Allow service role" ON parcelles FOR ALL USING (true);
CREATE POLICY "Allow service role" ON cultures FOR ALL USING (true);
CREATE POLICY "Allow service role" ON employes FOR ALL USING (true);
CREATE POLICY "Allow service role" ON stocks FOR ALL USING (true);
CREATE POLICY "Allow service role" ON commandes FOR ALL USING (true);
CREATE POLICY "Allow service role" ON mouvements_stock FOR ALL USING (true);

-- Triggers: updated_at automatique
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_parcelles_updated_at BEFORE UPDATE ON parcelles FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_cultures_updated_at BEFORE UPDATE ON cultures FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_stocks_updated_at BEFORE UPDATE ON stocks FOR EACH ROW EXECUTE FUNCTION update_updated_at();
