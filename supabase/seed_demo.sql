-- ============================================================
-- SEED DÉMO — AGRIFRIK ERP
-- À exécuter dans Supabase SQL Editor APRÈS 002_schema_complet.sql
-- ============================================================

-- 1. Créer l'organisation démo
INSERT INTO organisations (id, nom, slug, secteur, pays, devise, langue, telephone, email, adresse,
  plan, licence_statut, max_utilisateurs, max_entites)
VALUES (
  'a1b2c3d4-0000-0000-0000-000000000001',
  'Exploitation KOFFI & Fils',
  'koffi-fils',
  'Agriculture',
  'Côte d''Ivoire',
  'XOF',
  'fr',
  '+225 07 08 09 10',
  'admin@agrifrik.com',
  'Abidjan, Côte d''Ivoire',
  'pro',
  'actif',
  15,
  3
) ON CONFLICT (id) DO NOTHING;

-- 2. Créer une licence pro pour l'organisation démo
INSERT INTO licences (organisation_id, statut, date_debut, date_fin, essai)
VALUES (
  'a1b2c3d4-0000-0000-0000-000000000001',
  'actif',
  NOW(),
  NOW() + INTERVAL '1 year',
  FALSE
) ON CONFLICT DO NOTHING;

-- NOTE : Le profil utilisateur sera créé automatiquement lors de la
-- première connexion via Supabase Auth (trigger handle_new_user ci-dessous).
-- L'utilisateur admin doit d'abord être créé via Authentication > Users dans le dashboard.

-- ============================================================
-- TRIGGER : créer automatiquement un profil à l'inscription
-- ============================================================

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profils (id, email, nom, prenom, role, organisation_id)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'nom', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'prenom', ''),
    COALESCE(NEW.raw_user_meta_data->>'role', 'operateur'),
    COALESCE(
      (NEW.raw_user_meta_data->>'organisation_id')::UUID,
      NULL
    )
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ============================================================
-- DONNÉES DÉMO — EXPLOITATIONS
-- ============================================================

INSERT INTO exploitations (id, organisation_id, nom, code, type, superficie, localisation, responsable, statut)
VALUES
  ('a1000000-0000-0000-0001-000000000001', 'a1b2c3d4-0000-0000-0000-000000000001', 'Ferme Principale Aboisso', 'EXP-001', 'Polyculture', 125.5, 'Aboisso, Côte d''Ivoire', 'Jean-Baptiste Koffi', 'Active'),
  ('a1000000-0000-0000-0001-000000000002', 'a1b2c3d4-0000-0000-0000-000000000001', 'Plantation Cacao Divo', 'EXP-002', 'Cacao', 85.0, 'Divo, Côte d''Ivoire', 'Marie Kouassi', 'Active'),
  ('a1000000-0000-0000-0001-000000000003', 'a1b2c3d4-0000-0000-0000-000000000001', 'Rizière San-Pédro', 'EXP-003', 'Riziculture', 42.0, 'San-Pédro, Côte d''Ivoire', 'Koné Ibrahim', 'Active')
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- DONNÉES DÉMO — CULTURES
-- ============================================================

INSERT INTO cultures (organisation_id, nom, variete, stade, date_debut, date_fin, surface, progress, rendement_prevu, statut, operateur)
VALUES
  ('a1b2c3d4-0000-0000-0000-000000000001', 'Maïs', 'SR52', 'Floraison', '2026-03-15', '2026-07-30', 45.0, 65, 5.5, 'Active', 'Koné Ibrahim'),
  ('a1b2c3d4-0000-0000-0000-000000000001', 'Cacao', 'Hybride F1', 'Maturation', '2025-10-01', '2026-09-30', 85.0, 80, 1.2, 'Active', 'Marie Kouassi'),
  ('a1b2c3d4-0000-0000-0000-000000000001', 'Riz', 'WITA 4', 'Tallage', '2026-05-01', '2026-09-15', 42.0, 30, 4.8, 'Active', 'Jean-Baptiste Koffi'),
  ('a1b2c3d4-0000-0000-0000-000000000001', 'Manioc', 'Yacé', 'Croissance', '2026-01-10', '2026-12-10', 20.0, 50, 18.0, 'Active', 'Koné Ibrahim')
ON CONFLICT DO NOTHING;

-- ============================================================
-- DONNÉES DÉMO — STOCKS
-- ============================================================

INSERT INTO categories_stock (id, organisation_id, nom, type) VALUES
  ('b0000001-0000-0000-0000-000000000001', 'a1b2c3d4-0000-0000-0000-000000000001', 'Produits agricoles', 'Produit agricole'),
  ('b0000001-0000-0000-0000-000000000002', 'a1b2c3d4-0000-0000-0000-000000000001', 'Intrants', 'Intrant'),
  ('b0000001-0000-0000-0000-000000000003', 'a1b2c3d4-0000-0000-0000-000000000001', 'Matériaux', 'Consommable')
ON CONFLICT (id) DO NOTHING;

INSERT INTO entrepots (id, organisation_id, nom, code, type, capacite, localisation, statut) VALUES
  ('d0000001-0000-0000-0000-000000000001', 'a1b2c3d4-0000-0000-0000-000000000001', 'Entrepôt Principal Aboisso', 'ENT-001', 'Grains', 500.0, 'Aboisso', 'Actif'),
  ('d0000001-0000-0000-0000-000000000002', 'a1b2c3d4-0000-0000-0000-000000000001', 'Hangar Cacao Divo', 'ENT-002', 'Cacao', 200.0, 'Divo', 'Actif')
ON CONFLICT (id) DO NOTHING;

INSERT INTO stocks (organisation_id, categorie_id, entrepot_id, code, nom, unite, quantite, quantite_min, prix_unitaire, statut) VALUES
  ('a1b2c3d4-0000-0000-0000-000000000001', 'b0000001-0000-0000-0000-000000000001', 'd0000001-0000-0000-0000-000000000001', 'STK-001', 'Maïs Séché', 'kg', 12500, 2000, 180, 'Normal'),
  ('a1b2c3d4-0000-0000-0000-000000000001', 'b0000001-0000-0000-0000-000000000001', 'd0000001-0000-0000-0000-000000000002', 'STK-002', 'Cacao Fermenté Séché', 'kg', 8200, 1000, 1450, 'Normal'),
  ('a1b2c3d4-0000-0000-0000-000000000001', 'b0000001-0000-0000-0000-000000000002', 'd0000001-0000-0000-0000-000000000001', 'STK-003', 'Engrais NPK', 'kg', 350, 500, 650, 'Bas'),
  ('a1b2c3d4-0000-0000-0000-000000000001', 'b0000001-0000-0000-0000-000000000002', 'd0000001-0000-0000-0000-000000000001', 'STK-004', 'Herbicide Kalach', 'L', 45, 100, 4200, 'Critique')
ON CONFLICT DO NOTHING;

-- ============================================================
-- DONNÉES DÉMO — CLIENTS & VENTES
-- ============================================================

INSERT INTO clients (organisation_id, nom, code, type, contact, telephone, email, pays, statut) VALUES
  ('a1b2c3d4-0000-0000-0000-000000000001', 'SIFCA Group', 'CLI-001', 'Exportateur', 'Direction Achats', '+225 27 21 25 00', 'achats@sifca.ci', 'Côte d''Ivoire', 'Actif'),
  ('a1b2c3d4-0000-0000-0000-000000000001', 'Cargill Côte d''Ivoire', 'CLI-002', 'Exportateur', 'Paul Mensah', '+225 27 20 30 40', 'p.mensah@cargill.com', 'Côte d''Ivoire', 'Actif'),
  ('a1b2c3d4-0000-0000-0000-000000000001', 'Marché Bouaké Central', 'CLI-003', 'Particulier', 'Amadou Traoré', '+225 05 06 07 08', '', 'Côte d''Ivoire', 'Actif')
ON CONFLICT DO NOTHING;

INSERT INTO fournisseurs (organisation_id, nom, code, categorie, contact, telephone, email, pays, statut, evaluation) VALUES
  ('a1b2c3d4-0000-0000-0000-000000000001', 'AgroServices CI', 'FRN-001', 'Intrants agricoles', 'Direction Ventes', '+225 27 22 11 00', 'ventes@agroservices.ci', 'Côte d''Ivoire', 'Actif', 4),
  ('a1b2c3d4-0000-0000-0000-000000000001', 'CFCI Matériels', 'FRN-002', 'Équipements agricoles', 'Koné Seydou', '+225 07 11 22 33', 'koné@cfci.ci', 'Côte d''Ivoire', 'Actif', 5)
ON CONFLICT DO NOTHING;

-- ============================================================
-- DONNÉES DÉMO — EMPLOYES
-- ============================================================

INSERT INTO employes (organisation_id, matricule, nom, prenom, email, telephone, poste, departement, type_contrat, salaire_base, date_embauche, actif) VALUES
  ('a1b2c3d4-0000-0000-0000-000000000001', 'EMP-001', 'Koffi', 'Jean-Baptiste', 'admin@agrifrik.com', '+225 07 08 09 10', 'Directeur Général', 'Direction', 'CDI', 850000, '2020-01-01', TRUE),
  ('a1b2c3d4-0000-0000-0000-000000000001', 'EMP-002', 'Kouassi', 'Marie', 'marie.kouassi@agrifrik.com', '+225 07 11 22 33', 'Responsable Production', 'Production', 'CDI', 450000, '2021-03-15', TRUE),
  ('a1b2c3d4-0000-0000-0000-000000000001', 'EMP-003', 'Koné', 'Ibrahim', 'ibrahim.kone@agrifrik.com', '+225 05 44 55 66', 'Chef de Culture', 'Production', 'CDI', 320000, '2022-06-01', TRUE),
  ('a1b2c3d4-0000-0000-0000-000000000001', 'EMP-004', 'Traoré', 'Fatoumata', 'f.traore@agrifrik.com', '+225 01 23 45 67', 'Comptable', 'Finance', 'CDI', 380000, '2021-09-01', TRUE)
ON CONFLICT DO NOTHING;

-- ============================================================
-- DONNÉES DÉMO — PRIX MARCHÉ
-- ============================================================

INSERT INTO prix_marche (organisation_id, produit, marche, prix, unite, devise, date_prix, source) VALUES
  ('a1b2c3d4-0000-0000-0000-000000000001', 'Cacao', 'Marché Abidjan', 1450, 'kg', 'XOF', CURRENT_DATE, 'ANADER'),
  ('a1b2c3d4-0000-0000-0000-000000000001', 'Maïs', 'Marché Bouaké', 180, 'kg', 'XOF', CURRENT_DATE, 'ANADER'),
  ('a1b2c3d4-0000-0000-0000-000000000001', 'Riz Local', 'Marché San-Pédro', 420, 'kg', 'XOF', CURRENT_DATE, 'ANADER'),
  ('a1b2c3d4-0000-0000-0000-000000000001', 'Manioc', 'Marché Yamoussoukro', 95, 'kg', 'XOF', CURRENT_DATE, 'ANADER'),
  ('a1b2c3d4-0000-0000-0000-000000000001', 'Cacao', 'Marché ICE London', 8250, 'kg', 'XOF', CURRENT_DATE, 'ICE Futures')
ON CONFLICT DO NOTHING;

-- ============================================================
-- DONNÉES DÉMO — BUDGET
-- ============================================================

INSERT INTO budgets (organisation_id, nom, exercice, categorie, montant_prevu, montant_realise, statut) VALUES
  ('a1b2c3d4-0000-0000-0000-000000000001', 'Achats Intrants 2026', 2026, 'Achats', 12500000, 7820000, 'Actif'),
  ('a1b2c3d4-0000-0000-0000-000000000001', 'Masse Salariale 2026', 2026, 'RH', 24000000, 12000000, 'Actif'),
  ('a1b2c3d4-0000-0000-0000-000000000001', 'Investissements 2026', 2026, 'Investissement', 8000000, 2500000, 'Actif'),
  ('a1b2c3d4-0000-0000-0000-000000000001', 'Fonctionnement 2026', 2026, 'Fonctionnement', 5000000, 2100000, 'Actif')
ON CONFLICT DO NOTHING;
