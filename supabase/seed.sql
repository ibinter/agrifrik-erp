-- Parcelles
INSERT INTO parcelles (code, localite, culture, surface, sol, gps_lat, gps_lng) VALUES
('PAR-A1', 'Soubré, Zone A', 'Cacao', 6.2, 'Argilo-limoneux', 5.7821, -6.6012),
('PAR-A2', 'Soubré, Zone A', 'Cacao', 5.8, 'Argilo-limoneux', 5.7834, -6.6025),
('PAR-C1', 'Korhogo, Zone C', 'Anacarde', 5.2, 'Sableux', 9.4584, -5.6331),
('PAR-D2', 'Bouaké, Zone D', 'Maïs', 6.0, 'Limoneux', 7.6901, -5.0338);

-- Stocks initiaux
INSERT INTO stocks (produit, categorie, quantite, unite, seuil_critique, entrepot, valeur) VALUES
('Cacao Grade A', 'Production', 145.0, 'tonnes', 20.0, 'Entrepôt A — Soubré', 174000000),
('Anacarde brut', 'Production', 42.0, 'tonnes', 10.0, 'Entrepôt A — Soubré', 17640000),
('NPK 20-10-10', 'Intrants', 380.0, 'kg', 100.0, 'Entrepôt A — Soubré', 323000);
