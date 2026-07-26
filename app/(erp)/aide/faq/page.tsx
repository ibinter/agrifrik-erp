"use client";

import { useState, useMemo } from "react";
import Topbar from "../../../components/Topbar";
import { Search, ChevronDown, Globe, HelpCircle } from "lucide-react";

type Lang = "fr" | "en";

interface FaqItem {
  fr: { q: string; r: string };
  en: { q: string; r: string };
}

interface FaqCategory {
  id: string;
  fr: string;
  en: string;
  items: FaqItem[];
}

const FAQ_CATEGORIES: FaqCategory[] = [
  {
    id: "demarrage",
    fr: "Démarrage et compte",
    en: "Getting started & account",
    items: [
      {
        fr: { q: "Comment créer mon compte AGRIFRIK ?", r: "Rendez-vous sur agrifrik.ibigsoft.com et cliquez sur « Essai gratuit 14 jours ». Saisissez le nom de votre organisation, votre email professionnel et un mot de passe sécurisé. Un email de confirmation vous sera envoyé pour activer votre compte immédiatement." },
        en: { q: "How do I create my AGRIFRIK account?", r: "Go to agrifrik.ibigsoft.com and click \"Free 14-day trial\". Enter your organization name, professional email, and a secure password. A confirmation email will be sent to activate your account immediately." },
      },
      {
        fr: { q: "Quelle est la durée de l'essai gratuit ?", r: "L'essai gratuit dure 14 jours avec accès complet au plan Starter. Aucune carte bancaire n'est requise pour démarrer. À la fin de la période, vous pouvez choisir un plan payant ou votre compte passe en lecture seule." },
        en: { q: "How long is the free trial?", r: "The free trial lasts 14 days with full access to the Starter plan. No credit card is required to get started. At the end of the period, you can choose a paid plan or your account switches to read-only mode." },
      },
      {
        fr: { q: "Comment activer mon essai gratuit ?", r: "Après l'inscription, cliquez sur le lien de confirmation reçu par email. Votre essai démarre automatiquement. Si vous n'avez pas reçu l'email dans 5 minutes, vérifiez vos spams ou contactez support@agrifrik.com." },
        en: { q: "How do I activate my free trial?", r: "After registration, click the confirmation link sent to your email. Your trial starts automatically. If you haven't received the email within 5 minutes, check your spam folder or contact support@agrifrik.com." },
      },
      {
        fr: { q: "Quels modules sont inclus dans l'essai ?", r: "L'essai inclut l'accès complet à tous les modules : cultures, élevage, pisciculture, stocks, ventes, comptabilité, RH, IA/SARA et rapports. Aucune fonctionnalité n'est masquée — vous testez la version complète du plan Starter." },
        en: { q: "Which modules are included in the trial?", r: "The trial includes full access to all modules: crops, livestock, fish farming, stock, sales, accounting, HR, AI/SARA, and reports. No feature is hidden — you test the complete Starter plan version." },
      },
      {
        fr: { q: "Comment inviter des collaborateurs ?", r: "Dans Paramètres > Utilisateurs > « + Inviter un utilisateur », saisissez l'email du collaborateur et choisissez son rôle (admin, gestionnaire, opérateur, etc.). Il recevra un email d'invitation avec un lien d'activation valable 48 heures." },
        en: { q: "How do I invite team members?", r: "Go to Settings > Users > \"+ Invite a user\", enter the team member's email and choose their role (admin, manager, operator, etc.). They will receive an invitation email with an activation link valid for 48 hours." },
      },
      {
        fr: { q: "Comment configurer mon profil ?", r: "Cliquez sur votre avatar en haut à droite > « Mon profil ». Vous pouvez modifier votre nom, photo de profil, numéro de téléphone, langue préférée et notifications. Les informations sont enregistrées immédiatement." },
        en: { q: "How do I set up my profile?", r: "Click your avatar at the top right > \"My profile\". You can update your name, profile photo, phone number, preferred language, and notifications. Changes are saved immediately." },
      },
      {
        fr: { q: "Comment ajouter mon logo d'entreprise ?", r: "Dans Paramètres > Organisation > « Logo & Branding », téléchargez votre logo (PNG ou SVG, fond transparent recommandé, min 200×200 px). Le logo apparaîtra sur vos factures, devis, rapports et dans la barre de navigation." },
        en: { q: "How do I add my company logo?", r: "Go to Settings > Organization > \"Logo & Branding\", upload your logo (PNG or SVG, transparent background recommended, min 200×200 px). The logo will appear on your invoices, quotes, reports, and in the navigation bar." },
      },
      {
        fr: { q: "Peut-on avoir plusieurs exploitations ?", r: "Oui. Le plan Pro permet jusqu'à 5 exploitations, le plan Business jusqu'à 20, et le plan Enterprise offre un nombre illimité. Chaque exploitation a ses propres données, utilisateurs et paramètres, mais peut être gérée depuis un tableau de bord centralisé." },
        en: { q: "Can I manage multiple farms?", r: "Yes. The Pro plan allows up to 5 farms, Business up to 20, and Enterprise offers unlimited farms. Each farm has its own data, users, and settings, but can be managed from a centralized dashboard." },
      },
      {
        fr: { q: "Comment changer la langue de l'interface ?", r: "Allez dans Paramètres > Préférences > Langue. AGRIFRIK est disponible en français, anglais et portugais. Le changement est immédiat et s'applique à toute l'interface. D'autres langues africaines (wolof, haoussa, swahili) sont en cours d'intégration." },
        en: { q: "How do I change the interface language?", r: "Go to Settings > Preferences > Language. AGRIFRIK is available in French, English, and Portuguese. The change is immediate and applies to the entire interface. Other African languages (Wolof, Hausa, Swahili) are being integrated." },
      },
      {
        fr: { q: "Comment récupérer mon mot de passe oublié ?", r: "Sur la page de connexion, cliquez « Mot de passe oublié ». Saisissez votre email et vous recevrez un lien de réinitialisation valable 1 heure. Si vous n'avez plus accès à votre email, contactez le support avec une pièce d'identité." },
        en: { q: "How do I recover a forgotten password?", r: "On the login page, click \"Forgot password\". Enter your email and you'll receive a reset link valid for 1 hour. If you no longer have access to your email, contact support with a valid ID." },
      },
    ],
  },
  {
    id: "abonnement",
    fr: "Abonnement et paiement",
    en: "Subscription & payment",
    items: [
      {
        fr: { q: "Quels sont les plans disponibles ?", r: "AGRIFRIK propose 4 plans : Starter (gratuit 14 j puis 9 900 XOF/mois), Pro (24 900 XOF/mois), Business (59 900 XOF/mois) et Enterprise (sur devis). Chaque plan inclut un nombre croissant d'utilisateurs, d'exploitations et de fonctionnalités." },
        en: { q: "What plans are available?", r: "AGRIFRIK offers 4 plans: Starter (free 14 days then 9,900 XOF/month), Pro (24,900 XOF/month), Business (59,900 XOF/month), and Enterprise (custom quote). Each plan includes a growing number of users, farms, and features." },
      },
      {
        fr: { q: "Comment passer à un plan supérieur ?", r: "Dans Paramètres > Abonnement > « Changer de plan », sélectionnez le plan souhaité. En cas de mise à niveau, le prorata est calculé automatiquement et déduit de votre prochain paiement. L'accès aux nouvelles fonctionnalités est immédiat." },
        en: { q: "How do I upgrade my plan?", r: "Go to Settings > Subscription > \"Change plan\", select the desired plan. When upgrading, the prorated amount is calculated automatically and deducted from your next payment. Access to new features is immediate." },
      },
      {
        fr: { q: "Puis-je payer par Orange Money ?", r: "Oui, Orange Money est accepté dans tous les pays où AGRIFRIK est disponible (Côte d'Ivoire, Sénégal, Burkina Faso, Mali, Cameroun, etc.). Le paiement se fait directement depuis l'interface AGRIFRIK ou par transfert manuel vers notre numéro dédié." },
        en: { q: "Can I pay with Orange Money?", r: "Yes, Orange Money is accepted in all countries where AGRIFRIK is available (Côte d'Ivoire, Senegal, Burkina Faso, Mali, Cameroon, etc.). Payment is made directly from the AGRIFRIK interface or by manual transfer to our dedicated number." },
      },
      {
        fr: { q: "Quel est le numéro Orange Money d'AGRIFRIK ?", r: "Le numéro Orange Money d'AGRIFRIK est le +225 07 XX XX XX XX (Côte d'Ivoire). Pour les autres pays, consultez la page Tarifs ou contactez support@agrifrik.com. Indiquez toujours votre email de compte dans le libellé du paiement." },
        en: { q: "What is AGRIFRIK's Orange Money number?", r: "AGRIFRIK's Orange Money number is +225 07 XX XX XX XX (Côte d'Ivoire). For other countries, check the Pricing page or contact support@agrifrik.com. Always include your account email in the payment reference." },
      },
      {
        fr: { q: "Comment fonctionne le paiement par MTN MoMo ?", r: "Dans Paramètres > Abonnement > Payer, sélectionnez « MTN Mobile Money ». Entrez votre numéro MTN et validez. Vous recevrez une demande de confirmation sur votre téléphone. Saisissez votre code PIN MoMo pour finaliser. La licence est activée dans les 2 minutes." },
        en: { q: "How does MTN MoMo payment work?", r: "Go to Settings > Subscription > Pay, select \"MTN Mobile Money\". Enter your MTN number and confirm. You'll receive a confirmation request on your phone. Enter your MoMo PIN to complete. Your license is activated within 2 minutes." },
      },
      {
        fr: { q: "Qu'est-ce qu'une clé d'activation ?", r: "Une clé d'activation (ou voucher) est un code alphanumérique unique qui correspond à un plan et une durée prédéfinis. Les clés sont distribuées par AGRIFRIK via ses partenaires institutionnels (FIDA, BAD, ONG, revendeurs agréés) pour faciliter l'accès sans carte bancaire." },
        en: { q: "What is an activation key?", r: "An activation key (or voucher) is a unique alphanumeric code that corresponds to a predefined plan and duration. Keys are distributed by AGRIFRIK through its institutional partners (IFAD, ADB, NGOs, authorized resellers) to facilitate access without a bank card." },
      },
      {
        fr: { q: "Comment activer ma clé d'activation ?", r: "Dans Paramètres > Abonnement > « Activer une clé », saisissez votre code unique (ex : AGRI-XXXX-XXXX-XXXX) et cliquez « Valider ». Le plan correspondant est activé immédiatement. Les clés sont à usage unique et non remboursables." },
        en: { q: "How do I activate my key?", r: "Go to Settings > Subscription > \"Activate a key\", enter your unique code (e.g., AGRI-XXXX-XXXX-XXXX) and click \"Validate\". The corresponding plan is activated immediately. Keys are single-use and non-refundable." },
      },
      {
        fr: { q: "Puis-je obtenir une facture de mon abonnement ?", r: "Oui. Dans Paramètres > Abonnement > Historique des paiements, chaque paiement dispose d'une facture téléchargeable en PDF avec la TVA applicable selon votre pays. Les factures sont également envoyées par email automatiquement après chaque paiement." },
        en: { q: "Can I get an invoice for my subscription?", r: "Yes. Go to Settings > Subscription > Payment history — each payment has a downloadable PDF invoice including applicable VAT for your country. Invoices are also sent automatically by email after each payment." },
      },
      {
        fr: { q: "Que se passe-t-il si mon abonnement expire ?", r: "Votre compte entre dans une période de grâce de 7 jours avec accès en lecture seule. Après 7 jours sans renouvellement, l'accès est suspendu mais vos données sont conservées 30 jours. Aucune donnée n'est supprimée automatiquement durant cette période." },
        en: { q: "What happens when my subscription expires?", r: "Your account enters a 7-day grace period with read-only access. After 7 days without renewal, access is suspended but your data is kept for 30 days. No data is automatically deleted during this period." },
      },
      {
        fr: { q: "Y a-t-il des remises pour les coopératives ?", r: "Oui. Des tarifs préférentiels sont disponibles pour les coopératives, ONG et organisations partenaires (FIDA, FAO, BAD, MINAGRI). La remise peut aller jusqu'à 40% selon la taille de la structure. Contactez commercial@agrifrik.com pour un devis personnalisé." },
        en: { q: "Are there discounts for cooperatives?", r: "Yes. Preferential rates are available for cooperatives, NGOs, and partner organizations (IFAD, FAO, ADB, MINAGRI). The discount can reach up to 40% depending on the size of the organization. Contact commercial@agrifrik.com for a custom quote." },
      },
    ],
  },
  {
    id: "cultures",
    fr: "Cultures et productions végétales",
    en: "Crops & plant production",
    items: [
      {
        fr: { q: "Comment créer une fiche culture ?", r: "Dans le module Cultures > « + Nouvelle culture », renseignez le nom de la culture, la variété, le type (annuelle/pérenne), les besoins en eau, la durée du cycle et les parcelles concernées. La fiche est liée automatiquement au planning cultural et aux stocks d'intrants." },
        en: { q: "How do I create a crop record?", r: "In the Crops module > \"+ New crop\", enter the crop name, variety, type (annual/perennial), water requirements, cycle duration, and related plots. The record is automatically linked to the crop planning and input stocks." },
      },
      {
        fr: { q: "Comment suivre les stades phénologiques ?", r: "Dans la fiche culture, l'onglet « Stades phénologiques » permet de définir et suivre chaque stade (germination, levée, floraison, fructification, maturité, récolte). SARA peut vous alerter automatiquement selon les degrés-jours accumulés ou la date calendaire." },
        en: { q: "How do I track phenological stages?", r: "In the crop record, the \"Phenological stages\" tab lets you define and track each stage (germination, emergence, flowering, fruiting, maturity, harvest). SARA can automatically alert you based on accumulated degree-days or calendar dates." },
      },
      {
        fr: { q: "Comment enregistrer une récolte ?", r: "Dans la fiche parcelle, cliquez « Enregistrer une récolte ». Saisissez la date, la quantité récoltée (kg, tonnes ou sacs), la qualité (grade A/B/C) et l'opérateur. Le système calcule automatiquement le rendement à l'hectare et met à jour les stocks produits finis." },
        en: { q: "How do I record a harvest?", r: "In the plot record, click \"Record a harvest\". Enter the date, quantity harvested (kg, tonnes, or bags), quality grade (A/B/C), and operator. The system automatically calculates yield per hectare and updates finished goods stock." },
      },
      {
        fr: { q: "Comment gérer les parcelles cartographiées ?", r: "Dans Cartographie, vous pouvez dessiner vos parcelles directement sur la carte satellite, importer des fichiers KML/GeoJSON/Shapefile, ou saisir les coordonnées GPS. Chaque parcelle affiche sa superficie calculée, son type de sol et son historique de cultures." },
        en: { q: "How do I manage mapped plots?", r: "In Cartography, you can draw your plots directly on the satellite map, import KML/GeoJSON/Shapefile files, or enter GPS coordinates. Each plot displays its calculated area, soil type, and crop history." },
      },
      {
        fr: { q: "Comment planifier les activités culturales ?", r: "Dans Planning Cultural > « + Nouvelle activité », choisissez le type (labour, semis, traitement, récolte), la parcelle, la date, le responsable et les ressources nécessaires. Le planning s'affiche en vue calendrier, Gantt ou liste selon votre préférence." },
        en: { q: "How do I plan crop activities?", r: "In Crop Planning > \"+ New activity\", choose the type (plowing, sowing, treatment, harvest), the plot, date, responsible person, and required resources. The schedule displays in calendar, Gantt, or list view depending on your preference." },
      },
      {
        fr: { q: "Comment gérer les semences ?", r: "Le module Semences (Production > Semences) gère le stock séparément des autres intrants. Enregistrez les achats, les lots certifiés, les dates de péremption, le taux de germination et les quantités utilisées par parcelle. Les alertes de stock bas sont automatiques." },
        en: { q: "How do I manage seeds?", r: "The Seeds module (Production > Seeds) manages stock separately from other inputs. Record purchases, certified lots, expiry dates, germination rates, and quantities used per plot. Low stock alerts are automatic." },
      },
      {
        fr: { q: "Comment enregistrer les intrants utilisés ?", r: "Dans la fiche parcelle > onglet « Intrants », cliquez « + Appliquer un intrant ». Sélectionnez le produit (lié à votre stock), la dose appliquée, la date et l'applicateur. Le stock est mis à jour automatiquement et le délai avant récolte (DAR) est calculé." },
        en: { q: "How do I record inputs used?", r: "In the plot record > \"Inputs\" tab, click \"+ Apply an input\". Select the product (linked to your stock), the applied dose, date, and applicator. Stock is automatically updated and the pre-harvest interval (PHI) is calculated." },
      },
      {
        fr: { q: "Comment générer un rapport de production ?", r: "Dans Rapports > Rapport de production, sélectionnez la période, les cultures et les parcelles. Le rapport inclut les superficies cultivées, les rendements, les intrants consommés et les coûts de production. Exportez en PDF, Excel ou partagez via un lien sécurisé." },
        en: { q: "How do I generate a production report?", r: "In Reports > Production report, select the period, crops, and plots. The report includes cultivated areas, yields, consumed inputs, and production costs. Export as PDF, Excel, or share via a secure link." },
      },
      {
        fr: { q: "Comment exporter mes données de cultures ?", r: "Dans Cultures > Rapports > « Exporter les données », sélectionnez la période, les parcelles et les données à inclure (campagnes, récoltes, traitements, rendements). Choisissez le format : Excel (.xlsx), CSV ou PDF. Le fichier est téléchargeable immédiatement." },
        en: { q: "How do I export my crop data?", r: "In Crops > Reports > \"Export data\", select the period, plots, and data to include (campaigns, harvests, treatments, yields). Choose the format: Excel (.xlsx), CSV, or PDF. The file is immediately downloadable." },
      },
      {
        fr: { q: "AGRIFRIK gère-t-il la traçabilité EUDR ?", r: "Oui. Le module Traçabilité est conforme aux exigences du Règlement européen sur la déforestation (EUDR). Il génère les déclarations de diligence raisonnée avec les coordonnées GPS des parcelles, la chaîne de traçabilité et les preuves de conformité exportables pour vos acheteurs européens." },
        en: { q: "Does AGRIFRIK handle EUDR traceability?", r: "Yes. The Traceability module complies with EU Deforestation Regulation (EUDR) requirements. It generates due diligence statements with plot GPS coordinates, traceability chain, and exportable compliance evidence for your European buyers." },
      },
    ],
  },
  {
    id: "elevage",
    fr: "Élevage et pisciculture",
    en: "Livestock & fish farming",
    items: [
      {
        fr: { q: "Comment créer un troupeau ?", r: "Dans Élevage > « + Nouveau troupeau », renseignez l'espèce, la race, l'effectif initial, le site d'élevage et la date de création. Vous pouvez ensuite ajouter les animaux individuellement (avec numéros d'identification) ou en lot pour les grands troupeaux." },
        en: { q: "How do I create a herd?", r: "In Livestock > \"+ New herd\", enter the species, breed, initial headcount, farm site, and creation date. You can then add animals individually (with identification numbers) or in batches for large herds." },
      },
      {
        fr: { q: "Comment suivre les naissances ?", r: "Dans la fiche troupeau > « + Enregistrer une naissance », saisissez la date, le nombre de naissances, les mères concernées et le sexe des nouveau-nés. L'effectif du troupeau se met à jour automatiquement. Les alertes de suivi néonatal peuvent être configurées." },
        en: { q: "How do I track births?", r: "In the herd record > \"+ Record a birth\", enter the date, number of births, mothers involved, and sex of newborns. The herd count updates automatically. Neonatal monitoring alerts can be configured." },
      },
      {
        fr: { q: "Comment gérer les soins vétérinaires ?", r: "Dans Élevage > Soins vétérinaires > « + Nouveau soin », enregistrez le type d'acte (vaccination, traitement, vermifugation), les animaux concernés, le produit utilisé (lié aux stocks), la dose et le vétérinaire. Les rappels de vaccinations récurrentes sont automatiques." },
        en: { q: "How do I manage veterinary care?", r: "In Livestock > Veterinary care > \"+ New care\", record the type of act (vaccination, treatment, deworming), animals concerned, product used (linked to stocks), dose, and veterinarian. Reminders for recurring vaccinations are automatic." },
      },
      {
        fr: { q: "Comment créer un bassin de pisciculture ?", r: "Dans Pisciculture > « + Nouveau bassin », renseignez le type (étang en terre, cage flottante, bassin béton), la superficie ou le volume, la source d'eau et l'espèce élevée. Vous pouvez gérer plusieurs bassins avec des niveaux d'ensemencement différents." },
        en: { q: "How do I create a fish pond?", r: "In Fish Farming > \"+ New pond\", enter the type (earthen pond, floating cage, concrete tank), area or volume, water source, and species raised. You can manage multiple ponds with different stocking densities." },
      },
      {
        fr: { q: "Comment suivre la croissance des poissons ?", r: "Dans la fiche bassin > onglet « Croissance », enregistrez des mesures périodiques (poids moyen, longueur) sur des échantillons. Le système trace la courbe de croissance, calcule le taux de croissance spécifique (TCS) et prédit la date de récolte optimale." },
        en: { q: "How do I track fish growth?", r: "In the pond record > \"Growth\" tab, record periodic measurements (average weight, length) on samples. The system plots the growth curve, calculates the specific growth rate (SGR), and predicts the optimal harvest date." },
      },
      {
        fr: { q: "Comment enregistrer les ventes d'animaux ?", r: "Dans Élevage > Ventes > « + Nouvelle vente d'animaux », sélectionnez le troupeau, les animaux vendus (ou le poids pour les volailles), l'acheteur, le prix unitaire et la date. L'effectif du troupeau se met à jour et une facture est générée automatiquement." },
        en: { q: "How do I record animal sales?", r: "In Livestock > Sales > \"+ New animal sale\", select the herd, animals sold (or weight for poultry), buyer, unit price, and date. The herd count updates and an invoice is automatically generated." },
      },
      {
        fr: { q: "Comment gérer l'alimentation du bétail ?", r: "Dans Élevage > Alimentation, créez des rations alimentaires par espèce et stade physiologique. Enregistrez les distributions journalières liées à vos stocks de fourrages et aliments concentrés. Le coût alimentaire par animal est calculé automatiquement." },
        en: { q: "How do I manage livestock feed?", r: "In Livestock > Feed, create feed rations by species and physiological stage. Record daily distributions linked to your forage and concentrate stocks. Feed cost per animal is calculated automatically." },
      },
      {
        fr: { q: "Comment générer un rapport d'élevage ?", r: "Dans Rapports > Rapport d'élevage, choisissez l'espèce, le troupeau et la période. Le rapport inclut les effectifs, les naissances/mortalités, les soins apportés, les performances zootechniques et les coûts de production. Exportable en PDF et Excel." },
        en: { q: "How do I generate a livestock report?", r: "In Reports > Livestock report, choose the species, herd, and period. The report includes headcount, births/deaths, care given, zootechnical performance, and production costs. Exportable as PDF and Excel." },
      },
      {
        fr: { q: "Puis-je gérer plusieurs espèces ?", r: "Oui, AGRIFRIK gère toutes les espèces : bovins, ovins, caprins, porcins, volailles (poulets, dindes, pintades, canards), lapins, et aquaculture (tilapia, silure, carpe, crevettes, etc.). Chaque espèce a ses propres paramètres zootechniques configurés." },
        en: { q: "Can I manage multiple species?", r: "Yes, AGRIFRIK manages all species: cattle, sheep, goats, pigs, poultry (chickens, turkeys, guinea fowl, ducks), rabbits, and aquaculture (tilapia, catfish, carp, shrimp, etc.). Each species has its own configured zootechnical parameters." },
      },
      {
        fr: { q: "Comment configurer les alertes sanitaires ?", r: "Dans Paramètres > Alertes > Santé animale, configurez les rappels de vaccination, les seuils de mortalité anormaux et les alertes épidémiques. Vous pouvez recevoir ces alertes par email, SMS ou notification push sur l'application mobile." },
        en: { q: "How do I set up health alerts?", r: "In Settings > Alerts > Animal health, configure vaccination reminders, abnormal mortality thresholds, and epidemic alerts. You can receive these alerts by email, SMS, or push notification on the mobile app." },
      },
    ],
  },
  {
    id: "stocks",
    fr: "Stocks et logistique",
    en: "Stock & logistics",
    items: [
      {
        fr: { q: "Comment créer un article en stock ?", r: "Dans Stocks > Produits > « + Nouveau produit », renseignez le nom, la catégorie (intrant, produit fini, matière première, emballage), l'unité de mesure, le prix unitaire et le seuil d'alerte minimum. Vous pouvez aussi scanner un code-barres si disponible." },
        en: { q: "How do I create a stock item?", r: "In Stock > Products > \"+ New product\", enter the name, category (input, finished good, raw material, packaging), unit of measure, unit price, and minimum alert threshold. You can also scan a barcode if available." },
      },
      {
        fr: { q: "Comment enregistrer une entrée de stock ?", r: "Dans Stocks > Mouvements > « + Entrée de stock », sélectionnez le produit, l'entrepôt de destination, la quantité, le numéro de lot, la date de péremption et le fournisseur. Le stock est mis à jour immédiatement et une écriture comptable est créée si la comptabilité est activée." },
        en: { q: "How do I record a stock entry?", r: "In Stock > Movements > \"+ Stock entry\", select the product, destination warehouse, quantity, lot number, expiry date, and supplier. Stock is immediately updated and an accounting entry is created if accounting is enabled." },
      },
      {
        fr: { q: "Comment faire un inventaire ?", r: "Dans Stocks > Inventaire > « Lancer un inventaire », le système affiche le stock théorique par produit. Saisissez les quantités physiquement comptées. Les écarts sont calculés automatiquement, et un procès-verbal d'inventaire est généré en PDF avec les régularisations comptables." },
        en: { q: "How do I conduct an inventory?", r: "In Stock > Inventory > \"Launch an inventory\", the system displays the theoretical stock by product. Enter the physically counted quantities. Discrepancies are automatically calculated, and an inventory report is generated as PDF with accounting adjustments." },
      },
      {
        fr: { q: "Comment gérer les entrepôts ?", r: "Dans Stocks > Entrepôts > « + Nouvel entrepôt », définissez le nom, l'emplacement géographique, le responsable et les types de produits autorisés. Chaque mouvement de stock est rattaché à un entrepôt. Les transferts inter-entrepôts sont tracés avec une double écriture." },
        en: { q: "How do I manage warehouses?", r: "In Stock > Warehouses > \"+ New warehouse\", define the name, geographic location, manager, and authorized product types. Each stock movement is linked to a warehouse. Inter-warehouse transfers are tracked with double entry." },
      },
      {
        fr: { q: "Comment créer un bon de commande ?", r: "Dans Achats > « + Nouvelle commande », sélectionnez le fournisseur et ajoutez les produits avec les quantités et prix négociés. Envoyez le bon de commande au fournisseur par email directement depuis AGRIFRIK. À la réception, validez les quantités livrées pour mettre à jour le stock." },
        en: { q: "How do I create a purchase order?", r: "In Purchases > \"+ New order\", select the supplier and add products with quantities and negotiated prices. Send the purchase order to the supplier by email directly from AGRIFRIK. Upon receipt, validate delivered quantities to update stock." },
      },
      {
        fr: { q: "Comment gérer les fournisseurs ?", r: "Dans Fournisseurs > « + Nouveau fournisseur », renseignez le nom, les coordonnées, les produits fournis, les conditions de paiement (délai, remise) et les documents de certification. L'historique des commandes et les performances (délai, qualité) sont consultables à tout moment." },
        en: { q: "How do I manage suppliers?", r: "In Suppliers > \"+ New supplier\", enter the name, contact details, products supplied, payment terms (delay, discount), and certification documents. Order history and performance metrics (timeliness, quality) are viewable at any time." },
      },
      {
        fr: { q: "Comment suivre les livraisons ?", r: "Dans Logistique > Livraisons, chaque bon de livraison est associé à une commande, un chauffeur, un véhicule et une date prévue. Le client reçoit une notification avec un numéro de suivi. Le statut évolue : En préparation > Expédié > Livré > Confirmé." },
        en: { q: "How do I track deliveries?", r: "In Logistics > Deliveries, each delivery note is linked to an order, driver, vehicle, and expected date. The customer receives a notification with a tracking number. Status evolves: In preparation > Shipped > Delivered > Confirmed." },
      },
      {
        fr: { q: "Comment configurer les alertes de seuil minimum ?", r: "Dans la fiche produit > champ « Seuil d'alerte », définissez la quantité minimum. Lorsque le stock atteint ce seuil, une alerte apparaît sur le tableau de bord et un email est envoyé aux responsables désignés dans Paramètres > Alertes > Stock." },
        en: { q: "How do I set up minimum threshold alerts?", r: "In the product record > \"Alert threshold\" field, define the minimum quantity. When stock reaches this threshold, an alert appears on the dashboard and an email is sent to designated managers in Settings > Alerts > Stock." },
      },
      {
        fr: { q: "Comment exporter l'état des stocks ?", r: "Dans Stocks > Rapports > « État des stocks », sélectionnez l'entrepôt, la catégorie de produits et la date. Exportez en Excel (.xlsx) ou PDF. Le rapport inclut les quantités, valeurs CMUP/FIFO, mouvements de la période et alertes actives." },
        en: { q: "How do I export stock status?", r: "In Stock > Reports > \"Stock status\", select the warehouse, product category, and date. Export as Excel (.xlsx) or PDF. The report includes quantities, WAC/FIFO values, period movements, and active alerts." },
      },
      {
        fr: { q: "Comment gérer les lots et dates d'expiration ?", r: "Chaque entrée en stock peut être associée à un numéro de lot et une date de péremption. AGRIFRIK affiche une alerte 30 jours avant expiration. La méthode de sortie FEFO (First Expired, First Out) peut être activée pour garantir l'écoulement des produits les plus proches de leur date limite." },
        en: { q: "How do I manage lots and expiration dates?", r: "Each stock entry can be linked to a lot number and expiry date. AGRIFRIK displays an alert 30 days before expiry. The FEFO (First Expired, First Out) withdrawal method can be enabled to ensure products closest to expiry are used first." },
      },
    ],
  },
  {
    id: "ventes",
    fr: "Ventes et facturation",
    en: "Sales & invoicing",
    items: [
      {
        fr: { q: "Comment créer une facture ?", r: "Dans Ventes > Factures > « + Nouvelle facture », sélectionnez le client, ajoutez les produits avec quantités et prix, choisissez les conditions de paiement (immédiat, 30j, 60j) et la devise. La facture PDF numérotée est générée instantanément avec votre logo et les mentions légales." },
        en: { q: "How do I create an invoice?", r: "In Sales > Invoices > \"+ New invoice\", select the customer, add products with quantities and prices, choose payment terms (immediate, 30d, 60d), and currency. The numbered PDF invoice is instantly generated with your logo and legal notices." },
      },
      {
        fr: { q: "Comment créer un devis ?", r: "Dans Ventes > Devis > « + Nouveau devis », renseignez le prospect ou client, les articles, les prix et la date de validité (défaut : 30 jours). Envoyez le devis par email depuis AGRIFRIK. Le client peut accepter en ligne, déclenchant une notification immédiate." },
        en: { q: "How do I create a quote?", r: "In Sales > Quotes > \"+ New quote\", enter the prospect or customer, items, prices, and validity date (default: 30 days). Send the quote by email from AGRIFRIK. The customer can accept online, triggering an immediate notification." },
      },
      {
        fr: { q: "Comment transformer un devis en facture ?", r: "Dans la fiche devis accepté, cliquez « Convertir en facture ». Toutes les informations (client, produits, prix, conditions) sont transférées sans ressaisie. La facture est numérotée automatiquement dans votre séquence et le devis est archivé." },
        en: { q: "How do I convert a quote to an invoice?", r: "In the accepted quote record, click \"Convert to invoice\". All information (customer, products, prices, terms) is transferred without re-entry. The invoice is automatically numbered in your sequence and the quote is archived." },
      },
      {
        fr: { q: "Comment enregistrer un paiement client ?", r: "Dans la fiche facture, cliquez « + Enregistrer un paiement ». Choisissez le mode (espèces, mobile money, virement, chèque), le montant et la date. Les paiements partiels sont gérés avec suivi du solde restant. Une relance automatique est envoyée pour les factures en retard." },
        en: { q: "How do I record a customer payment?", r: "In the invoice record, click \"+ Record a payment\". Choose the method (cash, mobile money, wire transfer, check), amount, and date. Partial payments are managed with tracking of the remaining balance. An automatic reminder is sent for overdue invoices." },
      },
      {
        fr: { q: "Comment gérer les exportations ?", r: "Dans Exportation > « + Nouveau dossier d'exportation », renseignez le pays de destination, l'acheteur, les produits, les volumes et les certifications requises. AGRIFRIK vous guide pour constituer tous les documents : phytosanitaire, certificat d'origine, bill of lading, LC, EUDR." },
        en: { q: "How do I manage exports?", r: "In Export > \"+ New export file\", enter the destination country, buyer, products, volumes, and required certifications. AGRIFRIK guides you through all documents: phytosanitary certificate, certificate of origin, bill of lading, LC, EUDR." },
      },
      {
        fr: { q: "Comment suivre les prix du marché ?", r: "Dans Prix du marché, consultez les cours actualisés pour les principales denrées agricoles africaines (cacao, café, anacarde, coton, caoutchouc, etc.) depuis les bourses et marchés régionaux. Créez des alertes de prix et comparez vos prix de vente aux cours du marché." },
        en: { q: "How do I track market prices?", r: "In Market prices, view updated prices for major African agricultural commodities (cocoa, coffee, cashew, cotton, rubber, etc.) from stock exchanges and regional markets. Create price alerts and compare your selling prices to market rates." },
      },
      {
        fr: { q: "Comment générer un rapport de ventes ?", r: "Dans Rapports > Rapport de ventes, sélectionnez la période, les clients, les produits et le type d'analyse (par client, produit, région, vendeur). Visualisez les graphiques de performance et exportez le rapport en PDF ou Excel pour vos réunions de direction." },
        en: { q: "How do I generate a sales report?", r: "In Reports > Sales report, select the period, customers, products, and analysis type (by customer, product, region, salesperson). View performance charts and export the report as PDF or Excel for your management meetings." },
      },
      {
        fr: { q: "Comment gérer la traçabilité des produits ?", r: "Dans Traçabilité, scannez ou saisissez le numéro de lot d'un produit pour obtenir son historique complet : parcelle d'origine, date de récolte, traitements reçus, entrepôts traversés, dates de transformation et clients livrés. Conforme aux exigences EUDR, GlobalGAP et Rainforest Alliance." },
        en: { q: "How do I manage product traceability?", r: "In Traceability, scan or enter a product lot number to get its complete history: origin plot, harvest date, treatments received, warehouses crossed, processing dates, and customers delivered. Compliant with EUDR, GlobalGAP, and Rainforest Alliance requirements." },
      },
      {
        fr: { q: "Comment configurer les taxes ?", r: "Dans Paramètres > Fiscalité, configurez les taux de TVA applicables (taux standard, taux réduit, exonération) selon votre pays et vos produits. Les taxes sont appliquées automatiquement sur les factures. Des règles spécifiques par client ou catégorie de produit peuvent être définies." },
        en: { q: "How do I configure taxes?", r: "In Settings > Taxation, configure applicable VAT rates (standard rate, reduced rate, exemption) according to your country and products. Taxes are automatically applied on invoices. Specific rules by customer or product category can be defined." },
      },
      {
        fr: { q: "Comment exporter mes factures en PDF ?", r: "Dans Ventes > Factures, sélectionnez une ou plusieurs factures (case à cocher), puis cliquez « Exporter en PDF ». Vous pouvez exporter une facture individuelle depuis sa fiche en cliquant l'icône de téléchargement. Les factures sont générées avec votre logo et respectent les normes SYSCOHADA." },
        en: { q: "How do I export invoices to PDF?", r: "In Sales > Invoices, select one or more invoices (checkbox), then click \"Export to PDF\". You can export an individual invoice from its record by clicking the download icon. Invoices are generated with your logo and comply with SYSCOHADA standards." },
      },
    ],
  },
  {
    id: "finance",
    fr: "Comptabilité et finance",
    en: "Accounting & finance",
    items: [
      {
        fr: { q: "Comment fonctionne la comptabilité SYSCOHADA ?", r: "AGRIFRIK intègre le plan comptable SYSCOHADA révisé (en vigueur depuis 2018). Les écritures sont générées automatiquement depuis les ventes, achats et paie. Les journaux (achats, ventes, trésorerie, OD) sont préremplis et la balance des comptes se met à jour en temps réel." },
        en: { q: "How does SYSCOHADA accounting work?", r: "AGRIFRIK integrates the revised SYSCOHADA chart of accounts (in force since 2018). Journal entries are automatically generated from sales, purchases, and payroll. Journals (purchases, sales, cash, miscellaneous) are pre-filled and the account balance updates in real time." },
      },
      {
        fr: { q: "Comment enregistrer une écriture comptable ?", r: "Dans Comptabilité > Journal > « + Nouvelle écriture », choisissez le journal, la date, le libellé et les lignes de compte (débit/crédit). L'équilibre débit/crédit est vérifié avant validation. Des modèles d'écritures récurrentes peuvent être enregistrés pour les opérations habituelles." },
        en: { q: "How do I record an accounting entry?", r: "In Accounting > Journal > \"+ New entry\", choose the journal, date, description, and account lines (debit/credit). Debit/credit balance is verified before validation. Recurring entry templates can be saved for routine operations." },
      },
      {
        fr: { q: "Comment gérer la trésorerie ?", r: "Dans Trésorerie, tous les comptes bancaires et caisses sont affichés avec leur solde en temps réel. Enregistrez les encaissements et décaissements, effectuez des rapprochements bancaires et consultez le prévisionnel de trésorerie sur les 3 prochains mois." },
        en: { q: "How do I manage cash flow?", r: "In Cash Flow, all bank accounts and cash registers are displayed with their real-time balance. Record receipts and payments, perform bank reconciliations, and view the 3-month cash flow forecast." },
      },
      {
        fr: { q: "Comment créer un budget prévisionnel ?", r: "Dans Budget > « + Nouveau budget », nommez le budget, choisissez l'exercice et entrez les prévisions par compte ou catégorie sur 12 mois. Le tableau de bord compare en temps réel les réalisations vs prévisions avec des indicateurs visuels (vert/orange/rouge)." },
        en: { q: "How do I create a budget?", r: "In Budget > \"+ New budget\", name the budget, choose the fiscal year, and enter forecasts by account or category over 12 months. The dashboard compares actual vs. forecast in real time with visual indicators (green/orange/red)." },
      },
      {
        fr: { q: "Comment générer un bilan comptable ?", r: "Dans Comptabilité > États financiers > Bilan, sélectionnez la date de clôture. Le bilan est généré au format SYSCOHADA avec actif (immobilisations, stocks, créances, trésorerie) et passif (capitaux propres, dettes). Exportable en PDF pour votre commissaire aux comptes." },
        en: { q: "How do I generate a balance sheet?", r: "In Accounting > Financial statements > Balance sheet, select the closing date. The balance sheet is generated in SYSCOHADA format with assets (fixed assets, stock, receivables, cash) and liabilities (equity, debts). Exportable as PDF for your auditor." },
      },
      {
        fr: { q: "Comment gérer les actifs immobilisés ?", r: "Dans Finance > Actifs, enregistrez chaque immobilisation (terrain, bâtiment, machine, véhicule) avec son coût, sa date d'acquisition, sa durée d'amortissement et son mode (linéaire ou dégressif). Les dotations aux amortissements sont calculées et comptabilisées automatiquement chaque mois." },
        en: { q: "How do I manage fixed assets?", r: "In Finance > Assets, record each fixed asset (land, building, machine, vehicle) with its cost, acquisition date, depreciation period, and method (straight-line or declining). Depreciation charges are calculated and automatically recorded each month." },
      },
      {
        fr: { q: "Comment enregistrer une assurance ?", r: "Dans Finance > Assurances > « + Nouvelle assurance », renseignez la compagnie, le type de police (récolte, bétail, matériel, RC), la prime annuelle, les dates de couverture et les biens assurés. Les alertes de renouvellement sont envoyées 60 jours à l'avance." },
        en: { q: "How do I record insurance?", r: "In Finance > Insurance > \"+ New insurance\", enter the company, policy type (crop, livestock, equipment, liability), annual premium, coverage dates, and insured assets. Renewal alerts are sent 60 days in advance." },
      },
      {
        fr: { q: "Comment faire les prévisions financières ?", r: "Dans Finance > Prévisions, entrez vos hypothèses de volumes de production, prix de vente, charges variables et charges fixes. AGRIFRIK génère les projections financières sur 1 à 5 ans : compte de résultat prévisionnel, flux de trésorerie, point mort et rentabilité." },
        en: { q: "How do I make financial forecasts?", r: "In Finance > Forecasts, enter your assumptions on production volumes, selling prices, variable costs, and fixed costs. AGRIFRIK generates 1 to 5-year financial projections: forecast income statement, cash flows, break-even point, and profitability." },
      },
      {
        fr: { q: "Comment réconcilier les comptes ?", r: "Dans Trésorerie > Rapprochement bancaire, importez votre relevé bancaire (CSV/OFX) ou saisissez les opérations manuellement. AGRIFRIK suggère automatiquement les correspondances entre les écritures AGRIFRIK et les opérations bancaires. Les écarts non résolus sont signalés pour investigation." },
        en: { q: "How do I reconcile accounts?", r: "In Cash Flow > Bank reconciliation, import your bank statement (CSV/OFX) or enter operations manually. AGRIFRIK automatically suggests matches between AGRIFRIK entries and bank transactions. Unresolved discrepancies are flagged for investigation." },
      },
      {
        fr: { q: "Comment exporter la comptabilité ?", r: "Dans Comptabilité > Export > FEC, exportez le Fichier des Écritures Comptables au format standard. Vous pouvez aussi exporter le grand livre, la balance et tous les journaux en Excel. Une API REST est disponible pour les intégrations avec d'autres logiciels comptables (plans Business/Enterprise)." },
        en: { q: "How do I export accounting data?", r: "In Accounting > Export > FEC, export the Accounting Entries File in standard format. You can also export the general ledger, trial balance, and all journals in Excel. A REST API is available for integrations with other accounting software (Business/Enterprise plans)." },
      },
    ],
  },
  {
    id: "rh",
    fr: "RH et paie",
    en: "HR & payroll",
    items: [
      {
        fr: { q: "Comment créer une fiche employé ?", r: "Dans RH > Employés > « + Nouvel employé », renseignez l'identité, le poste, le type de contrat (CDI, CDD, saisonnier, journalier), la date d'embauche, le salaire de base et les avantages. L'employé reçoit une invitation email pour créer son compte utilisateur si nécessaire." },
        en: { q: "How do I create an employee record?", r: "In HR > Employees > \"+ New employee\", enter their identity, position, contract type (permanent, fixed-term, seasonal, daily), hire date, base salary, and benefits. The employee receives an email invitation to create their user account if needed." },
      },
      {
        fr: { q: "Comment calculer les salaires ?", r: "Dans Paie > « + Nouveau bulletin de paie », sélectionnez le mois et les employés. AGRIFRIK calcule automatiquement le salaire brut, les heures supplémentaires, les primes, les cotisations sociales (CNPS, CNSS selon le pays), la retenue à la source et le net à payer." },
        en: { q: "How do I calculate salaries?", r: "In Payroll > \"+ New payslip\", select the month and employees. AGRIFRIK automatically calculates gross salary, overtime, bonuses, social contributions (CNPS, CNSS depending on country), withholding tax, and net pay." },
      },
      {
        fr: { q: "Comment gérer les congés ?", r: "Dans RH > Congés, les employés soumettent leurs demandes en ligne avec les dates et le motif. Les managers reçoivent une notification et approuvent ou refusent. Le solde de congés est mis à jour automatiquement. Les absences non justifiées sont déduites du salaire du mois." },
        en: { q: "How do I manage leave?", r: "In HR > Leave, employees submit requests online with dates and reason. Managers receive a notification and approve or deny. Leave balance is automatically updated. Unjustified absences are deducted from the monthly salary." },
      },
      {
        fr: { q: "Comment planifier les activités RH ?", r: "Dans RH > Planning, créez les plannings hebdomadaires et mensuels par équipe, tâche ou parcelle. Assignez les employés disponibles en tenant compte des congés et absences. Le planning est consultable par les employés depuis leur espace ou l'application mobile." },
        en: { q: "How do I plan HR activities?", r: "In HR > Planning, create weekly and monthly schedules by team, task, or plot. Assign available employees taking into account leave and absences. The schedule is viewable by employees from their workspace or the mobile app." },
      },
      {
        fr: { q: "Comment gérer les formations ?", r: "Dans RH > Formations > « + Nouvelle formation », définissez le titre, le formateur, les dates, le lieu et les participants. Les résultats et certifications sont enregistrés dans le dossier de chaque employé. Un plan de formation annuel peut être établi et son budget suivi." },
        en: { q: "How do I manage training?", r: "In HR > Training > \"+ New training\", define the title, trainer, dates, location, and participants. Results and certifications are recorded in each employee's file. An annual training plan can be established and its budget tracked." },
      },
      {
        fr: { q: "Comment gérer une coopérative ?", r: "Le module Coopérative (RH > Coopérative) gère les membres, les parts sociales, les cotisations, les apports agricoles et les dividendes. Un portail dédié permet aux membres de consulter leur compte, leurs apports et leurs droits. Les assemblées générales et votes sont organisables depuis la plateforme." },
        en: { q: "How do I manage a cooperative?", r: "The Cooperative module (HR > Cooperative) manages members, shares, contributions, agricultural inputs, and dividends. A dedicated portal lets members view their account, contributions, and rights. General assemblies and votes can be organized from the platform." },
      },
      {
        fr: { q: "Comment créer un bulletin de paie ?", r: "Dans Paie > Bulletins, cliquez « Générer les bulletins » pour le mois sélectionné. AGRIFRIK produit un bulletin PDF pour chaque employé selon le droit du travail local. Les bulletins peuvent être envoyés par email aux employés ou mis à disposition dans leur espace personnel." },
        en: { q: "How do I create a payslip?", r: "In Payroll > Payslips, click \"Generate payslips\" for the selected month. AGRIFRIK produces a PDF payslip for each employee according to local labor law. Payslips can be sent by email to employees or made available in their personal space." },
      },
      {
        fr: { q: "Comment gérer les contrats de travail ?", r: "Dans la fiche employé > onglet « Contrats », uploadez le contrat signé en PDF ou créez-le depuis un modèle AGRIFRIK. Définissez la durée, le salaire, la période d'essai et les clauses spéciales. Les signatures électroniques sont disponibles sur les plans Business et Enterprise." },
        en: { q: "How do I manage employment contracts?", r: "In the employee record > \"Contracts\" tab, upload the signed contract as PDF or create it from an AGRIFRIK template. Define the duration, salary, trial period, and special clauses. Electronic signatures are available on Business and Enterprise plans." },
      },
      {
        fr: { q: "Comment suivre les évaluations de performance ?", r: "Dans RH > Évaluations, planifiez les entretiens annuels et semestriels. Utilisez les grilles d'évaluation prédéfinies ou personnalisées. Les résultats sont enregistrés et liés aux décisions d'augmentation, de promotion ou de formation. Un historique des évaluations est conservé." },
        en: { q: "How do I track performance reviews?", r: "In HR > Reviews, schedule annual and semi-annual appraisals. Use predefined or customized evaluation grids. Results are recorded and linked to salary increase, promotion, or training decisions. A review history is maintained." },
      },
      {
        fr: { q: "Comment gérer les projets agricoles ?", r: "Dans RH > Projets, créez des projets avec des objectifs, un budget, une équipe et un calendrier. Décomposez chaque projet en tâches assignées à des employés avec des délais. L'avancement est suivi en temps réel sur un tableau de bord Kanban ou Gantt." },
        en: { q: "How do I manage agricultural projects?", r: "In HR > Projects, create projects with objectives, budget, team, and timeline. Break each project into tasks assigned to employees with deadlines. Progress is tracked in real time on a Kanban or Gantt dashboard." },
      },
    ],
  },
  {
    id: "sara",
    fr: "SARA et IA",
    en: "SARA & AI",
    items: [
      {
        fr: { q: "Qu'est-ce que SARA ?", r: "SARA (Système d'Assistance et de Recommandations Agricoles) est l'assistante IA intégrée d'AGRIFRIK. Elle comprend le contexte de votre exploitation, analyse vos données en temps réel et vous fournit des conseils personnalisés en agronomie, gestion et finance agricoles, disponibles 24h/24 et 7j/7." },
        en: { q: "What is SARA?", r: "SARA (Agricultural Assistance and Recommendations System) is AGRIFRIK's integrated AI assistant. She understands your farm's context, analyzes your data in real time, and provides personalized advice on agronomy, farm management, and agricultural finance, available 24/7." },
      },
      {
        fr: { q: "Comment parler à SARA ?", r: "Cliquez sur le bouton SARA (icône bleue en bas à droite de l'écran) ou accédez au module IA depuis le menu latéral. Posez vos questions en français ou en anglais, par texte ou par commande vocale (sur mobile). SARA répond en quelques secondes avec des réponses contextualisées." },
        en: { q: "How do I talk to SARA?", r: "Click the SARA button (blue icon at the bottom right of the screen) or access the AI module from the sidebar. Ask questions in French or English, by text or voice command (on mobile). SARA responds in seconds with contextual answers." },
      },
      {
        fr: { q: "SARA peut-elle me donner des conseils agricoles ?", r: "Oui, c'est sa spécialité. SARA peut vous conseiller sur : le choix des cultures selon votre sol et le climat, les doses d'engrais et pesticides, les calendriers de semis optimaux, la gestion des maladies et ravageurs, les meilleures pratiques d'élevage et de pisciculture." },
        en: { q: "Can SARA give me agricultural advice?", r: "Yes, that's her specialty. SARA can advise you on: crop selection based on your soil and climate, fertilizer and pesticide doses, optimal sowing calendars, disease and pest management, and best livestock and fish farming practices." },
      },
      {
        fr: { q: "SARA est-elle disponible 24h/24 ?", r: "Oui, SARA est disponible 24h/24, 7j/7, y compris les jours fériés. Contrairement au support humain, SARA répond instantanément à tout moment. Pour les questions complexes nécessitant une intervention humaine, elle transfère automatiquement au support en heures ouvrées." },
        en: { q: "Is SARA available 24/7?", r: "Yes, SARA is available 24/7, including public holidays. Unlike human support, SARA responds instantly at any time. For complex questions requiring human intervention, she automatically transfers to support during business hours." },
      },
      {
        fr: { q: "SARA peut-elle analyser mes données ?", r: "Oui. Demandez à SARA : « Quel est mon rendement moyen sur les 3 dernières campagnes ? » ou « Quels sont mes 5 clients les plus rentables ? ». Elle accède à vos données en temps réel, effectue les calculs et vous présente les résultats avec des graphiques et des recommandations." },
        en: { q: "Can SARA analyze my data?", r: "Yes. Ask SARA: \"What is my average yield over the last 3 campaigns?\" or \"Who are my 5 most profitable customers?\". She accesses your real-time data, performs calculations, and presents results with charts and recommendations." },
      },
      {
        fr: { q: "SARA invente-t-elle des informations ?", r: "SARA est conçue pour être précise et honnête. Elle distingue les informations issues de vos données AGRIFRIK (fiables) des connaissances générales (à vérifier). Lorsqu'elle n'est pas certaine d'une réponse, elle le signale explicitement et vous oriente vers des sources fiables." },
        en: { q: "Does SARA invent information?", r: "SARA is designed to be accurate and honest. She distinguishes information from your AGRIFRIK data (reliable) from general knowledge (to be verified). When she is not certain of an answer, she explicitly signals it and directs you to reliable sources." },
      },
      {
        fr: { q: "Comment accéder aux recommandations IA ?", r: "Dans le module IA > Recommandations, SARA génère chaque semaine des recommandations personnalisées basées sur vos données : alertes de traitements à effectuer, opportunités commerciales, optimisations financières, risques climatiques. Vous pouvez filtrer par module ou par urgence." },
        en: { q: "How do I access AI recommendations?", r: "In the AI module > Recommendations, SARA generates weekly personalized recommendations based on your data: treatment alerts, commercial opportunities, financial optimizations, climate risks. You can filter by module or urgency." },
      },
      {
        fr: { q: "Comment consulter la météo agricole ?", r: "Dans IA > Météo agricole, consultez les prévisions à 7 jours pour votre zone géographique, avec des indicateurs spécifiques à l'agriculture : pluviométrie, températures min/max, risques de gel, humidité, vitesse du vent et indice ETP (évapotranspiration potentielle)." },
        en: { q: "How do I check agricultural weather?", r: "In AI > Agricultural weather, view 7-day forecasts for your geographic area, with agriculture-specific indicators: rainfall, min/max temperatures, frost risk, humidity, wind speed, and PET index (potential evapotranspiration)." },
      },
      {
        fr: { q: "SARA mémorise-t-elle mes conversations ?", r: "Oui, SARA conserve le contexte des conversations de la session en cours et un historique de vos 30 dernières conversations. Elle peut ainsi faire référence à des échanges précédents. L'historique complet est consultable dans IA > Historique des conversations." },
        en: { q: "Does SARA remember my conversations?", r: "Yes, SARA retains the context of the current session's conversations and a history of your last 30 conversations. She can thus reference previous exchanges. The full history is viewable in AI > Conversation history." },
      },
      {
        fr: { q: "Comment configurer l'IA pour mon exploitation ?", r: "Dans IA > Paramètres, renseignez vos informations d'exploitation : localisation, types de sols, cultures principales, effectifs de bétail, objectifs de production. Plus SARA connaît votre contexte, plus ses conseils sont pertinents et personnalisés." },
        en: { q: "How do I configure AI for my farm?", r: "In AI > Settings, enter your farm information: location, soil types, main crops, livestock numbers, production objectives. The more SARA knows your context, the more relevant and personalized her advice becomes." },
      },
    ],
  },
  {
    id: "support",
    fr: "Support et technique",
    en: "Support & technical",
    items: [
      {
        fr: { q: "Comment contacter le support ?", r: "Le support AGRIFRIK est accessible via : messagerie intégrée (bouton « ? » en bas à droite), email support@agrifrik.com, WhatsApp Business au +225 07 XX XX XX XX. Le temps de réponse est inférieur à 4h en jours ouvrés pour les plans payants, et inférieur à 2h pour le plan Enterprise." },
        en: { q: "How do I contact support?", r: "AGRIFRIK support is accessible via: integrated messaging (\"?\" button at the bottom right), email support@agrifrik.com, WhatsApp Business at +225 07 XX XX XX XX. Response time is under 4 hours on business days for paid plans, and under 2 hours for the Enterprise plan." },
      },
      {
        fr: { q: "AGRIFRIK fonctionne-t-il hors connexion ?", r: "Oui, l'application mobile AGRIFRIK (PWA et application Android) supporte le mode hors-ligne. Vous pouvez saisir des données (récoltes, mouvements de stock, soins vétérinaires) sans connexion. Elles sont synchronisées automatiquement dès que la connexion internet est rétablie." },
        en: { q: "Does AGRIFRIK work offline?", r: "Yes, the AGRIFRIK mobile app (PWA and Android app) supports offline mode. You can enter data (harvests, stock movements, veterinary care) without connection. It synchronizes automatically once internet connection is restored." },
      },
      {
        fr: { q: "Comment installer AGRIFRIK sur mon téléphone ?", r: "AGRIFRIK est une PWA (Progressive Web App). Sur Android/iOS, ouvrez agrifrik.ibigsoft.com dans Chrome ou Safari, puis sélectionnez « Ajouter à l'écran d'accueil » dans le menu du navigateur. Pour Android, une application native est également disponible sur le Google Play Store." },
        en: { q: "How do I install AGRIFRIK on my phone?", r: "AGRIFRIK is a PWA (Progressive Web App). On Android/iOS, open agrifrik.ibigsoft.com in Chrome or Safari, then select \"Add to home screen\" from the browser menu. For Android, a native app is also available on the Google Play Store." },
      },
      {
        fr: { q: "Mes données sont-elles sécurisées ?", r: "Vos données sont chiffrées en transit (TLS 1.3) et au repos (AES-256). Les serveurs sont hébergés en Europe (conforme RGPD) avec sauvegarde quotidienne automatique conservée 90 jours. AGRIFRIK ne revend jamais vos données à des tiers. Un DPA est disponible sur demande." },
        en: { q: "Is my data secure?", r: "Your data is encrypted in transit (TLS 1.3) and at rest (AES-256). Servers are hosted in Europe (GDPR compliant) with automatic daily backups retained for 90 days. AGRIFRIK never sells your data to third parties. A DPA is available on request." },
      },
      {
        fr: { q: "Comment exporter toutes mes données ?", r: "Dans Paramètres > Données > « Exporter mes données », choisissez les modules à exporter et le format (Excel, CSV, PDF). L'export complet inclut cultures, stocks, ventes, comptabilité, RH et tous les historiques. Le fichier est disponible par lien sécurisé envoyé par email (valable 48h)." },
        en: { q: "How do I export all my data?", r: "In Settings > Data > \"Export my data\", choose the modules to export and the format (Excel, CSV, PDF). The complete export includes crops, stock, sales, accounting, HR, and all history. The file is available via a secure link sent by email (valid for 48h)." },
      },
      {
        fr: { q: "AGRIFRIK est-il conforme Rainforest Alliance ?", r: "Oui. AGRIFRIK supporte les exigences de certification Rainforest Alliance 2020 : traçabilité des lots, registres de pratiques agricoles durables, cartographie des exploitations, gestion des travailleurs et documentation de la chaîne d'approvisionnement. Les rapports d'audit sont exportables en un clic." },
        en: { q: "Is AGRIFRIK Rainforest Alliance compliant?", r: "Yes. AGRIFRIK supports Rainforest Alliance 2020 certification requirements: lot traceability, sustainable agricultural practice records, farm mapping, worker management, and supply chain documentation. Audit reports are exportable in one click." },
      },
      {
        fr: { q: "Comment signaler un bug ?", r: "Dans le menu Aide > « Signaler un problème », décrivez le bug, joignez une capture d'écran et indiquez les étapes pour le reproduire. Pour les bugs critiques, contactez directement support@agrifrik.com avec l'objet « [BUG CRITIQUE] ». Nous nous engageons à corriger les bugs bloquants sous 24h." },
        en: { q: "How do I report a bug?", r: "In the Help menu > \"Report an issue\", describe the bug, attach a screenshot, and specify the steps to reproduce it. For critical bugs, contact support@agrifrik.com directly with the subject \"[CRITICAL BUG]\". We commit to fixing blocking bugs within 24h." },
      },
      {
        fr: { q: "Quelle est la politique de confidentialité ?", r: "La politique de confidentialité d'AGRIFRIK est consultable sur agrifrik.ibigsoft.com/legal/confidentialite. En résumé : vous êtes propriétaire de vos données, nous ne les revendons jamais, elles sont hébergées en Europe et supprimées sur demande. AGRIFRIK est conforme au RGPD et aux lois africaines applicables." },
        en: { q: "What is the privacy policy?", r: "AGRIFRIK's privacy policy is viewable at agrifrik.ibigsoft.com/legal/privacy. In summary: you own your data, we never resell it, it is hosted in Europe and deleted on request. AGRIFRIK is compliant with GDPR and applicable African data protection laws." },
      },
      {
        fr: { q: "Comment supprimer mon compte ?", r: "Dans Paramètres > Mon compte > « Supprimer mon compte », confirmez la suppression par votre mot de passe. Avant la suppression définitive, vous êtes invité à exporter vos données. La suppression est irréversible et effective dans les 30 jours (conformité RGPD)." },
        en: { q: "How do I delete my account?", r: "In Settings > My account > \"Delete my account\", confirm deletion with your password. Before permanent deletion, you are prompted to export your data. Deletion is irreversible and effective within 30 days (GDPR compliance)." },
      },
      {
        fr: { q: "Comment accéder à l'Académie AGRIFRIK ?", r: "L'Académie AGRIFRIK est accessible depuis le menu Aide > Académie ou sur academy.agrifrik.com. Elle propose des tutoriels vidéo, des guides pas à pas, des webinaires mensuels et des certifications AGRIFRIK. L'accès à l'Académie est inclus dans tous les plans payants." },
        en: { q: "How do I access the AGRIFRIK Academy?", r: "The AGRIFRIK Academy is accessible from the Help menu > Academy or at academy.agrifrik.com. It offers video tutorials, step-by-step guides, monthly webinars, and AGRIFRIK certifications. Academy access is included in all paid plans." },
      },
    ],
  },
];

const TOTAL = FAQ_CATEGORIES.reduce((acc, c) => acc + c.items.length, 0);

export default function FAQPage() {
  const [lang, setLang] = useState<Lang>("fr");
  const [search, setSearch] = useState("");
  const [openCat, setOpenCat] = useState<string | null>(null);
  const [openItem, setOpenItem] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return FAQ_CATEGORIES;
    return FAQ_CATEGORIES.map(cat => ({
      ...cat,
      items: cat.items.filter(item =>
        item[lang].q.toLowerCase().includes(q) ||
        item[lang].r.toLowerCase().includes(q)
      ),
    })).filter(cat => cat.items.length > 0);
  }, [search, lang]);

  const totalFiltered = filtered.reduce((acc, c) => acc + c.items.length, 0);

  const toggleCat = (id: string) => {
    setOpenCat(prev => prev === id ? null : id);
    setOpenItem(null);
  };

  const toggleItem = (key: string) => {
    setOpenItem(prev => prev === key ? null : key);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FBF8]">
      <Topbar />
      <div className="flex-1 p-5 max-w-5xl mx-auto w-full space-y-5">

        {/* Hero */}
        <div className="rounded-2xl p-6 text-white" style={{ background: "linear-gradient(135deg, #1B5E20 0%, #2E7D32 60%, #388E3C 100%)" }}>
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2.5 mb-1.5">
                <HelpCircle size={20} />
                <h1 className="text-lg font-bold">
                  {lang === "fr" ? "Foire aux questions" : "Frequently Asked Questions"}
                </h1>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.2)" }}>
                  {TOTAL} {lang === "fr" ? "questions" : "questions"}
                </span>
              </div>
              <p className="text-sm opacity-75 mb-4">
                {lang === "fr"
                  ? "Retrouvez les réponses aux questions les plus fréquentes sur AGRIFRIK."
                  : "Find answers to the most frequently asked questions about AGRIFRIK."}
              </p>
              <div className="relative max-w-lg">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 opacity-60" />
                <input
                  value={search}
                  onChange={e => { setSearch(e.target.value); setOpenCat(null); setOpenItem(null); }}
                  placeholder={lang === "fr" ? "Rechercher une question…" : "Search a question…"}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm outline-none"
                  style={{ backgroundColor: "rgba(255,255,255,0.15)", color: "white", border: "1px solid rgba(255,255,255,0.25)" }}
                />
              </div>
              {search && (
                <p className="text-xs opacity-60 mt-1.5">
                  {totalFiltered} {lang === "fr" ? `résultat${totalFiltered > 1 ? "s" : ""}` : `result${totalFiltered !== 1 ? "s" : ""}`}
                </p>
              )}
            </div>

            {/* Lang toggle */}
            <button
              onClick={() => { setLang(l => l === "fr" ? "en" : "fr"); setOpenItem(null); }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold flex-shrink-0 transition-all"
              style={{ backgroundColor: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)" }}
            >
              <Globe size={14} />
              {lang === "fr" ? "EN" : "FR"}
            </button>
          </div>
        </div>

        {/* Categories */}
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center">
            <p className="text-sm text-gray-400">
              {lang === "fr" ? "Aucune question ne correspond à votre recherche." : "No question matches your search."}
            </p>
            <button
              onClick={() => setSearch("")}
              className="mt-3 text-xs underline"
              style={{ color: "#2E7D32" }}
            >
              {lang === "fr" ? "Réinitialiser" : "Reset"}
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((cat, ci) => {
              const catOpen = search ? true : openCat === cat.id;
              return (
                <div key={cat.id} className="rounded-2xl border border-gray-100 bg-white overflow-hidden">
                  {/* Category header */}
                  <button
                    onClick={() => !search && toggleCat(cat.id)}
                    className="flex items-center justify-between w-full px-5 py-4 text-left transition-colors hover:bg-[#F8FBF8]"
                    style={{ cursor: search ? "default" : "pointer" }}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span
                        className="text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: "#E8F5E9", color: "#2E7D32" }}
                      >
                        {ci + 1}
                      </span>
                      <div className="min-w-0">
                        <span className="text-sm font-bold text-gray-800">
                          {lang === "fr" ? cat.fr : cat.en}
                        </span>
                        <span className="ml-2 text-xs text-gray-400">
                          {cat.items.length} {lang === "fr" ? "questions" : "questions"}
                        </span>
                      </div>
                    </div>
                    {!search && (
                      <ChevronDown
                        size={16}
                        className={`text-gray-400 flex-shrink-0 transition-transform duration-200 ${catOpen ? "rotate-180" : ""}`}
                      />
                    )}
                  </button>

                  {/* Items */}
                  {catOpen && (
                    <div className="border-t border-gray-50">
                      {cat.items.map((item, ii) => {
                        const key = `${cat.id}-${ii}`;
                        const isOpen = openItem === key;
                        return (
                          <div key={key} className="border-b border-gray-50 last:border-b-0">
                            <button
                              onClick={() => toggleItem(key)}
                              className="flex items-start justify-between w-full px-5 py-3.5 text-left hover:bg-[#F8FBF8] transition-colors gap-3"
                            >
                              <div className="flex items-start gap-2.5 min-w-0">
                                <span className="text-[10px] font-semibold text-gray-400 mt-0.5 flex-shrink-0 w-5 text-right">
                                  {ii + 1}.
                                </span>
                                <span className="text-sm font-medium text-gray-700 leading-snug">
                                  {item[lang].q}
                                </span>
                              </div>
                              <ChevronDown
                                size={14}
                                className={`text-gray-300 flex-shrink-0 transition-transform duration-150 mt-0.5 ${isOpen ? "rotate-180" : ""}`}
                              />
                            </button>
                            {isOpen && (
                              <div className="px-5 pb-4 ml-7">
                                <p className="text-sm text-gray-600 leading-relaxed border-l-2 pl-3" style={{ borderColor: "#4CAF50" }}>
                                  {item[lang].r}
                                </p>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* CTA support */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 flex items-center justify-between gap-4 flex-wrap">
          <div>
            <p className="text-sm font-semibold text-gray-800">
              {lang === "fr" ? "Vous n'avez pas trouvé votre réponse ?" : "Didn't find your answer?"}
            </p>
            <p className="text-xs text-gray-500 mt-0.5">
              {lang === "fr" ? "Notre équipe répond en moins de 4h en jours ouvrés." : "Our team responds in under 4 hours on business days."}
            </p>
          </div>
          <a
            href="/messagerie"
            className="px-4 py-2 rounded-xl text-xs font-semibold text-white flex-shrink-0"
            style={{ backgroundColor: "#2E7D32" }}
          >
            {lang === "fr" ? "Contacter le support" : "Contact support"}
          </a>
        </div>

      </div>
    </div>
  );
}
