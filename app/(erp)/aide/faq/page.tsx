"use client";

import { useState, useMemo } from "react";
import Topbar from "../../../components/Topbar";
import { Search, ChevronDown, HelpCircle } from "lucide-react";

const FAQ_DATA = [
  // DÉMARRAGE (10)
  { cat: "Démarrage", q: "Comment créer mon compte AGRIFRIK ?", r: "Rendez-vous sur agrifrik.ibigsoft.com et cliquez sur 'Essai gratuit 14 jours'. Renseignez le nom de votre organisation, votre email professionnel et un mot de passe sécurisé. Un email de confirmation vous sera envoyé pour activer votre compte." },
  { cat: "Démarrage", q: "Quelle est la durée de l'essai gratuit ?", r: "L'essai gratuit dure 14 jours avec accès complet au plan Starter. Aucune carte bancaire n'est requise pour démarrer. À la fin de la période, vous pouvez choisir de passer à un plan payant ou votre compte passe en lecture seule." },
  { cat: "Démarrage", q: "Combien d'utilisateurs puis-je inviter pendant l'essai ?", r: "Pendant l'essai, vous pouvez inviter jusqu'à 3 utilisateurs. Pour plus d'utilisateurs, choisissez le plan Pro (15 max) ou Business/Enterprise (illimité)." },
  { cat: "Démarrage", q: "Comment importer mes données existantes ?", r: "AGRIFRIK supporte l'import de données via des fichiers Excel (.xlsx) et CSV. Accédez à Paramètres > Import de données. Des modèles téléchargeables sont disponibles pour chaque module (cultures, clients, produits, etc.)." },
  { cat: "Démarrage", q: "Est-ce qu'AGRIFRIK fonctionne sans connexion internet ?", r: "Oui, l'application mobile AGRIFRIK (disponible sur Android et iOS) supporte le mode hors-ligne. Les données saisies sont synchronisées automatiquement dès que la connexion est rétablie." },
  { cat: "Démarrage", q: "Dans quels pays AGRIFRIK est-il disponible ?", r: "AGRIFRIK est disponible dans toute l'Afrique subsaharienne. La facturation est disponible en XOF (FCFA), GHS, NGN, KES, ZAR et EUR. Les prix s'affichent dans la devise de votre pays." },
  { cat: "Démarrage", q: "Comment changer la langue de l'interface ?", r: "Allez dans Paramètres > Préférences > Langue. AGRIFRIK est disponible en français, anglais et portugais. D'autres langues africaines sont en cours d'intégration." },
  { cat: "Démarrage", q: "Puis-je utiliser AGRIFRIK sur mon smartphone ?", r: "Oui. AGRIFRIK est une Progressive Web App (PWA) — vous pouvez l'ajouter à l'écran d'accueil de votre téléphone depuis votre navigateur. Une application native Android est aussi disponible sur le Play Store." },
  { cat: "Démarrage", q: "Comment contacter le support AGRIFRIK ?", r: "Support disponible via : messagerie intégrée (bouton '?' en bas à droite), email support@agrifrik.com, WhatsApp Business au +225 07 XX XX XX XX. Temps de réponse : moins de 4h en jours ouvrés." },
  { cat: "Démarrage", q: "Comment transférer mon compte à un autre gestionnaire ?", r: "Allez dans Paramètres > Organisation > Changer le propriétaire. Saisissez l'email du nouveau propriétaire (qui doit déjà être membre de l'organisation). La confirmation se fait par email des deux parties." },

  // CULTURES (10)
  { cat: "Cultures", q: "Comment créer une nouvelle parcelle ?", r: "Accédez à Cultures > Parcelles > '+ Nouvelle parcelle'. Renseignez le nom, la superficie, le type de sol et la localisation GPS. Vous pouvez dessiner la parcelle directement sur la carte intégrée ou importer un fichier KML/GeoJSON." },
  { cat: "Cultures", q: "Comment planifier une campagne agricole ?", r: "Dans le module Planning Cultural, cliquez sur '+ Nouvelle campagne'. Définissez la culture, les parcelles concernées, les dates de semis et de récolte prévues. SARA vous suggérera automatiquement les étapes et intrants nécessaires." },
  { cat: "Cultures", q: "Comment enregistrer une récolte ?", r: "Dans la fiche parcelle, cliquez sur 'Enregistrer une récolte'. Saisissez la date, la quantité récoltée (en kg, tonnes ou sacs), la qualité et l'opérateur. Le système calcule automatiquement le rendement à l'hectare." },
  { cat: "Cultures", q: "SARA peut-elle me recommander les meilleures cultures pour ma zone ?", r: "Oui. Dans le module IA/SARA, entrez votre localisation, le type de sol et la période souhaitée. SARA analyse les données climatiques et agronomiques pour vous recommander les cultures les plus adaptées avec les rendements attendus." },
  { cat: "Cultures", q: "Comment suivre l'application des traitements phytosanitaires ?", r: "Dans la fiche parcelle, section 'Traitements', cliquez '+ Traitement'. Sélectionnez le produit (lié à votre stock d'intrants), la dose, la date et l'applicateur. Le système calcule automatiquement les délais avant récolte (DAR)." },
  { cat: "Cultures", q: "Peut-on gérer plusieurs variétés d'une même culture sur une parcelle ?", r: "Oui. Lors de la création d'une campagne, vous pouvez subdiviser une parcelle et attribuer une variété différente à chaque sous-zone. Le suivi des rendements est distinct pour chaque variété." },
  { cat: "Cultures", q: "Comment imprimer le calendrier cultural ?", r: "Dans Planning Cultural, cliquez sur l'icône d'impression en haut à droite. Choisissez le format (PDF A4 ou A3, portrait ou paysage) et la période. Le calendrier inclut toutes les tâches planifiées avec les responsables." },
  { cat: "Cultures", q: "Comment gérer les semences : achat, stock, utilisation ?", r: "Le module Semences (Production > Semences) gère le stock de semences de manière séparée des autres intrants. Enregistrez les achats, les lots certifiés, les dates de péremption et les quantités utilisées par parcelle." },
  { cat: "Cultures", q: "Peut-on suivre la rotation des cultures sur plusieurs années ?", r: "Oui. Dans l'historique de chaque parcelle, consultez l'onglet 'Rotations'. AGRIFRIK conserve l'historique sur 10 ans et SARA peut analyser l'impact des rotations sur la santé des sols et les rendements." },
  { cat: "Cultures", q: "Comment exporter les données de production en Excel ?", r: "Dans Cultures > Rapports, sélectionnez la période et les parcelles. Cliquez 'Exporter' et choisissez le format (.xlsx, .csv ou .pdf). Toutes les données de production, traitements et rendements sont inclus." },

  // STOCKS & LOGISTIQUE (10)
  { cat: "Stocks", q: "Comment créer un produit dans le stock ?", r: "Accédez à Stocks > Produits > '+ Nouveau produit'. Renseignez le nom, la catégorie (intrant, produit fini, semence), l'unité de mesure et le seuil d'alerte. Vous pouvez aussi scanner un code-barres si disponible." },
  { cat: "Stocks", q: "Comment gérer plusieurs entrepôts ?", r: "Le module Entrepôts permet de créer autant d'entrepôts que nécessaire. Chaque mouvement de stock est associé à un entrepôt. Les transferts entre entrepôts sont tracés avec une double écriture automatique." },
  { cat: "Stocks", q: "Comment configurer une alerte de stock bas ?", r: "Dans la fiche produit, définissez le 'Seuil minimal'. Une alerte apparaît automatiquement dans le tableau de bord et un email est envoyé aux personnes désignées dans Paramètres > Alertes > Stock." },
  { cat: "Stocks", q: "Peut-on faire un inventaire annuel dans AGRIFRIK ?", r: "Oui. Dans Stocks > Inventaire, lancez un inventaire physique. Le système affiche le stock théorique ; saisissez le stock réel. Les écarts sont calculés automatiquement et un rapport d'inventaire est généré en PDF." },
  { cat: "Stocks", q: "Comment enregistrer un achat d'intrants ?", r: "Dans Achats > '+ Nouvelle commande', sélectionnez le fournisseur et ajoutez les produits commandés. À la réception, validez la livraison et les quantités reçues. Le stock est mis à jour et une écriture comptable est créée si la comptabilité est activée." },
  { cat: "Stocks", q: "Comment gérer la traçabilité des lots ?", r: "Chaque entrée en stock peut être associée à un numéro de lot. Ce lot est suivi tout au long de la chaîne : stockage, transformation, vente, exportation. Le module Traçabilité permet de retrouver l'historique complet d'un lot en quelques secondes." },
  { cat: "Stocks", q: "Peut-on gérer les péremptions des intrants ?", r: "Oui. Renseignez la date d'expiration lors de l'entrée en stock. AGRIFRIK alerte automatiquement 30 jours avant la péremption. Les produits expirés sont signalés en rouge dans l'inventaire." },
  { cat: "Stocks", q: "Comment planifier les livraisons ?", r: "Dans le module Logistique, créez un bon de livraison depuis une commande validée. Assignez un chauffeur, un véhicule et une date de livraison. Le client reçoit une notification email/SMS avec le suivi." },
  { cat: "Stocks", q: "Comment gérer le parc de matériel agricole ?", r: "Le module Matériels permet d'enregistrer chaque équipement (tracteur, pulvérisateur, etc.) avec ses caractéristiques, la date d'achat, la valeur et le planning d'entretien préventif. Les pannes et réparations sont aussi tracées." },
  { cat: "Stocks", q: "Peut-on valoriser le stock en coût moyen pondéré ?", r: "Oui. Accédez à Stocks > Paramètres > Méthode de valorisation. Vous pouvez choisir entre CMUP (coût moyen unitaire pondéré), FIFO ou LIFO. La méthode choisie est appliquée à toutes les sorties de stock." },

  // VENTES & COMMERCE (10)
  { cat: "Commerce", q: "Comment créer une facture de vente ?", r: "Dans Ventes > Factures > '+ Nouvelle facture'. Sélectionnez le client, ajoutez les produits avec quantités et prix. Choisissez les conditions de paiement (immédiat, 30j, 60j). La facture est générée en PDF avec votre logo." },
  { cat: "Commerce", q: "AGRIFRIK génère-t-il des factures conformes aux normes africaines ?", r: "Oui. Les factures AGRIFRIK sont conformes aux normes SYSCOHADA révisé. Elles incluent le NIU/NIF de l'entreprise, la TVA applicable, et respectent les formats exigés par les administrations fiscales de plus de 15 pays africains." },
  { cat: "Commerce", q: "Comment suivre les paiements clients ?", r: "Dans Ventes > Règlements, enregistrez chaque paiement reçu (espèces, mobile money, virement). Le système calcule automatiquement les soldes restants et envoie des relances automatiques aux clients en retard." },
  { cat: "Commerce", q: "Comment créer un devis et le convertir en commande ?", r: "Dans Ventes > Devis > '+ Nouveau devis'. Renseignez le client et les articles. Une fois le devis accepté, cliquez 'Convertir en commande' — toutes les informations sont transférées sans ressaisie." },
  { cat: "Commerce", q: "Comment gérer les prix du marché en temps réel ?", r: "Le module Prix du marché affiche les cours actualisés pour les principales denrées agricoles africaines (cacao, café, anacarde, coton, etc.) depuis les principales bourses et marchés régionaux. Les données sont actualisées chaque jour ouvré." },
  { cat: "Commerce", q: "Comment monter un dossier d'exportation ?", r: "Dans Exportation > '+ Nouveau dossier', renseignez le pays de destination, l'acheteur, les produits et les certifications requises. AGRIFRIK vous guide étape par étape dans la constitution des documents (phytosanitaire, certificat d'origine, etc.)." },
  { cat: "Commerce", q: "Peut-on gérer la transformation de produits agricoles ?", r: "Oui. Le module Transformation permet de créer des recettes de transformation (ex: noix de cajou brutes → noix décortiquées). Le système calcule les coûts, les rendements de transformation et les quantités produites." },
  { cat: "Commerce", q: "Comment envoyer une facture par email directement depuis AGRIFRIK ?", r: "Dans la fiche facture, cliquez sur 'Envoyer par email'. L'email est pré-rempli avec les coordonnées du client, la facture en PDF en pièce jointe. Vous pouvez personnaliser le message avant envoi." },
  { cat: "Commerce", q: "Comment gérer les retours clients ?", r: "Dans Ventes > Avoirs, créez un avoir client lié à la facture concernée. Renseignez les articles retournés et le motif. L'avoir peut être utilisé en déduction d'une prochaine facture ou remboursé directement." },
  { cat: "Commerce", q: "Comment suivre la qualité des produits vendus ?", r: "Le module Suivi Qualité permet d'enregistrer les paramètres qualité à chaque étape : récolte, stockage, transformation, livraison. Les fiches de contrôle qualité sont attachées à chaque lot et exportables pour vos acheteurs." },

  // FINANCE (10)
  { cat: "Finance", q: "AGRIFRIK gère-t-il la comptabilité complète ?", r: "Oui. Le module Comptabilité couvre le plan comptable SYSCOHADA révisé : journal des opérations, grand livre, balance des comptes, bilan et compte de résultat. Les écritures sont générées automatiquement depuis les ventes, achats et paie." },
  { cat: "Finance", q: "Comment enregistrer une dépense ou une recette non commerciale ?", r: "Dans Trésorerie > '+ Nouvelle opération'. Choisissez le type (recette ou dépense), le compte bancaire/caisse, la catégorie et le montant. Joignez le justificatif en photo. L'écriture comptable est créée automatiquement." },
  { cat: "Finance", q: "Comment créer et suivre un budget prévisionnel ?", r: "Dans Budget > '+ Nouveau budget', définissez les prévisions par catégorie (charges, produits) sur 12 mois. Le tableau de bord budget compare en temps réel les réalisations vs les prévisions avec des indicateurs visuels." },
  { cat: "Finance", q: "Comment gérer plusieurs comptes bancaires ?", r: "Dans Trésorerie > Comptes > '+ Nouveau compte'. Ajoutez chaque compte bancaire avec le nom de la banque, le numéro de compte et le solde initial. Les rapprochements bancaires sont disponibles dans Trésorerie > Rapprochement." },
  { cat: "Finance", q: "Comment générer les états financiers de fin d'année ?", r: "Dans Comptabilité > États financiers. Choisissez la période et générez le bilan, le compte de résultat et le tableau de flux de trésorerie en PDF, format SYSCOHADA ou IFRS simplifié. Ces états sont directement utilisables pour votre commissaire aux comptes." },
  { cat: "Finance", q: "AGRIFRIK peut-il calculer la TVA à déclarer ?", r: "Oui. Le module Comptabilité calcule automatiquement la TVA collectée et la TVA déductible par période. Un rapport de déclaration de TVA est généré au format requis par les administrations fiscales (DGI CI, DGI BF, etc.)." },
  { cat: "Finance", q: "Comment gérer un crédit ou un prêt agricole ?", r: "Dans Finance > Crédits > '+ Nouveau crédit'. Renseignez le prêteur, le montant, le taux et le tableau d'amortissement. Les échéances s'affichent dans le calendrier et les remboursements sont tracés automatiquement." },
  { cat: "Finance", q: "Comment gérer les assurances agricoles ?", r: "Le module Assurances permet de recenser toutes vos polices d'assurance (récolte, bétail, matériel, responsabilité civile). Les dates de renouvellement sont alertées 60 jours à l'avance. Les sinistres et indemnisations sont tracés." },
  { cat: "Finance", q: "Comment faire des prévisions financières sur 3 ans ?", r: "Dans Finance > Prévisions, entrez vos hypothèses de croissance, de charges et de prix de vente. AGRIFRIK génère les projections financières sur 1 à 5 ans avec les indicateurs clés : ROI, point mort, capacité d'autofinancement." },
  { cat: "Finance", q: "Peut-on connecter AGRIFRIK à mon logiciel comptable actuel ?", r: "AGRIFRIK exporte les écritures comptables au format FEC (Fichier des Écritures Comptables) compatible avec la plupart des logiciels comptables africains. Une API REST est disponible pour les intégrations personnalisées (plan Business et Enterprise)." },

  // RH & PAIE (10)
  { cat: "RH", q: "Comment ajouter un employé dans AGRIFRIK ?", r: "Dans RH > Employés > '+ Nouvel employé'. Renseignez l'identité, le poste, le type de contrat (CDI, CDD, saisonnier), la date d'embauche et le salaire de base. L'employé reçoit une invitation email pour créer son compte utilisateur." },
  { cat: "RH", q: "Comment calculer la paie mensuelle ?", r: "Dans Paie > '+ Nouveau bulletin'. Choisissez le mois et les employés concernés. AGRIFRIK calcule automatiquement le salaire brut, les cotisations sociales (CNPS, CNSS selon le pays), les retenues et le net à payer." },
  { cat: "RH", q: "AGRIFRIK gère-t-il les congés et absences ?", r: "Oui. Dans RH > Congés, les employés soumettent leurs demandes en ligne. Les managers approuvent ou refusent. Le solde de congés est mis à jour automatiquement. Les absences injustifiées sont déduites du salaire." },
  { cat: "RH", q: "Comment gérer les travailleurs saisonniers ?", r: "Créez un employé avec le type de contrat 'Saisonnier'. Définissez la durée du contrat et la rémunération (journalière, hebdomadaire ou au rendement). Les coûts salariaux sont automatiquement affectés aux campagnes concernées." },
  { cat: "RH", q: "Comment gérer le planning du personnel ?", r: "Dans RH > Planning, créez les plannings hebdomadaires ou mensuels. Assignez les employés aux tâches et aux parcelles. En cas de conflit (congé, absence), une alerte s'affiche automatiquement." },
  { cat: "RH", q: "Comment gérer une coopérative et ses membres ?", r: "Le module Coopérative (RH > Coopérative) gère les membres, les cotisations, les parts sociales et les dividendes. Un portail dédié permet aux membres de consulter leur compte et leurs apports." },
  { cat: "RH", q: "Peut-on suivre les formations du personnel ?", r: "Oui. Dans RH > Formations, planifiez les sessions de formation, inscrivez les participants et enregistrez les résultats. Les certifications obtenues sont attachées au dossier de chaque employé." },
  { cat: "RH", q: "Comment gérer les frais de mission et déplacements ?", r: "Dans RH > Notes de frais, les employés soumettent leurs justificatifs en photo. Les managers valident et les remboursements sont intégrés dans la prochaine paie ou traités séparément." },
  { cat: "RH", q: "AGRIFRIK calcule-t-il les droits à la retraite ?", r: "Le module Paie calcule les cotisations retraite conformément aux lois sociales de chaque pays (CNPS Côte d'Ivoire, CNSS Sénégal, CNAS Cameroun, etc.). Un état récapitulatif annuel des cotisations est disponible pour les déclarations sociales." },
  { cat: "RH", q: "Comment gérer les contrats et documents RH ?", r: "Dans la fiche employé, l'onglet 'Documents' permet d'uploader les contrats signés, CNI, diplômes et tout autre document. Les signatures électroniques sont disponibles sur les plans Business et Enterprise." },

  // ABONNEMENT & PAIEMENT (10)
  { cat: "Abonnement", q: "Quels sont les modes de paiement acceptés ?", r: "AGRIFRIK accepte : Mobile Money (Orange Money, MTN MoMo, Wave, Moov Money, Airtel Money, M-Pesa), cartes bancaires via Stripe, virements bancaires SEPA et Afrique, CinetPay, Stripe, et codes voucher." },
  { cat: "Abonnement", q: "Comment passer d'un plan à un autre ?", r: "Dans Paramètres > Abonnement > 'Changer de plan'. Sélectionnez le nouveau plan. En cas de mise à niveau (upgrade), le prorata est calculé automatiquement. En cas de déclassement (downgrade), le changement prend effet à la prochaine date de renouvellement." },
  { cat: "Abonnement", q: "Que se passe-t-il si je ne renouvelle pas mon abonnement à temps ?", r: "Votre compte passe en période de grâce de 7 jours : accès limité à la consultation. Après 7 jours sans renouvellement, l'accès est suspendu mais vos données sont conservées pendant 30 jours. Aucune donnée n'est supprimée automatiquement." },
  { cat: "Abonnement", q: "Comment utiliser un code voucher ?", r: "Dans Paramètres > Abonnement > 'Activer un voucher', saisissez votre code unique. Le voucher active ou prolonge automatiquement votre licence selon le plan correspondant. Les vouchers sont disponibles via nos partenaires institutionnels (FIDA, BAD, etc.)." },
  { cat: "Abonnement", q: "Y a-t-il une remise pour un paiement annuel ?", r: "Oui, le paiement annuel offre 2 mois gratuits (remise ~17%) par rapport au paiement mensuel. Par exemple, le plan Pro à 24 900 XOF/mois revient à 251 880 XOF/an au lieu de 298 800 XOF." },
  { cat: "Abonnement", q: "Puis-je obtenir une facture pour mon abonnement ?", r: "Oui. Dans Paramètres > Abonnement > Historique des paiements, chaque paiement dispose d'une facture téléchargeable en PDF avec TVA applicable selon votre pays." },
  { cat: "Abonnement", q: "AGRIFRIK propose-t-il des tarifs ONG/institution ?", r: "Oui. Des tarifs préférentiels sont disponibles pour les ONG, coopératives et organisations partenaires (FIDA, FAO, BAD, MINAGRI). Contactez commercial@agrifrik.com pour un devis personnalisé." },
  { cat: "Abonnement", q: "Comment annuler mon abonnement ?", r: "Dans Paramètres > Abonnement > 'Annuler l'abonnement'. L'annulation prend effet à la fin de la période payée. Vos données restent accessibles jusqu'à la fin de la période et peuvent être exportées intégralement." },
  { cat: "Abonnement", q: "Mes données sont-elles supprimées si j'annule ?", r: "Non. Après annulation, vos données sont conservées en archive pendant 90 jours. Durant cette période, vous pouvez exporter l'intégralité de vos données (cultures, finances, contacts) au format Excel/CSV/PDF. Passé ce délai, les données sont supprimées définitivement." },
  { cat: "Abonnement", q: "Qu'inclut le plan Gratuit ?", r: "Le plan Gratuit (limité dans le temps à 14 jours d'essai) inclut : 1 exploitation, jusqu'à 3 utilisateurs, les modules de base (cultures, stocks, ventes simples). Il ne comprend pas la comptabilité avancée, les rapports personnalisés ni le support prioritaire." },

  // SÉCURITÉ & TECHNIQUE (10)
  { cat: "Sécurité", q: "Comment AGRIFRIK protège-t-il mes données ?", r: "Vos données sont chiffrées en transit (TLS 1.3) et au repos (AES-256). Les serveurs sont hébergés en Europe (conforme RGPD) avec sauvegarde quotidienne automatique conservée 90 jours. AGRIFRIK ne revend jamais vos données." },
  { cat: "Sécurité", q: "Comment gérer les droits d'accès des utilisateurs ?", r: "Dans Paramètres > Utilisateurs, assignez à chaque membre un rôle parmi 12 rôles prédéfinis (admin, comptable, gérant, saisonnier, etc.). Chaque rôle a des permissions précises sur les modules. Des rôles personnalisés sont disponibles sur le plan Enterprise." },
  { cat: "Sécurité", q: "Que faire si je perds mon mot de passe ?", r: "Sur la page de connexion, cliquez 'Mot de passe oublié'. Saisissez votre email et vous recevrez un lien de réinitialisation valable 1 heure. Si vous n'avez plus accès à votre email, contactez le support avec une pièce d'identité." },
  { cat: "Sécurité", q: "Comment activer la double authentification (2FA) ?", r: "Dans Paramètres > Sécurité > 'Authentification à deux facteurs'. Scannez le QR code avec une application comme Google Authenticator ou Authy. À chaque connexion, un code à 6 chiffres vous sera demandé en plus de votre mot de passe." },
  { cat: "Sécurité", q: "Comment exporter toutes mes données AGRIFRIK ?", r: "Dans Paramètres > Données > 'Exporter mes données'. Choisissez les modules à exporter et le format (Excel, CSV, PDF). L'export complet est généré en quelques minutes et envoyé par email avec un lien de téléchargement sécurisé valable 48h." },
  { cat: "Sécurité", q: "AGRIFRIK est-il conforme au RGPD ?", r: "Oui. AGRIFRIK est conforme au RGPD (Règlement Général sur la Protection des Données). Vous êtes propriétaire de vos données. Un DPA (Data Processing Agreement) est disponible sur demande pour les organisations qui en ont besoin." },
  { cat: "Sécurité", q: "Que se passe-t-il en cas de panne du serveur ?", r: "AGRIFRIK garantit une disponibilité (SLA) de 99,5% par an. En cas d'incident, une page de statut est disponible sur status.agrifrik.com. L'application mobile en mode hors-ligne continue de fonctionner pendant les pannes." },
  { cat: "Sécurité", q: "Peut-on connecter AGRIFRIK à d'autres logiciels via API ?", r: "Oui. Une API REST documentée est disponible sur les plans Business et Enterprise. Elle permet d'intégrer AGRIFRIK avec vos autres outils (ERP externe, BI, applications mobiles, etc.). La documentation est disponible sur docs.agrifrik.com." },
  { cat: "Sécurité", q: "Comment signaler un problème de sécurité ?", r: "Si vous découvrez une faille de sécurité, contactez immédiatement security@agrifrik.com. AGRIFRIK dispose d'un programme de divulgation responsable. Ne publiez pas la faille publiquement avant que nous ayons eu l'occasion de la corriger." },
  { cat: "Sécurité", q: "Les données sont-elles sauvegardées automatiquement ?", r: "Oui. Les données sont sauvegardées automatiquement toutes les 24 heures avec rétention de 90 jours. En cas de suppression accidentelle de données, contactez le support dans les 24h pour une restauration. Des sauvegardes manuelles sont aussi possibles depuis Paramètres > Données." },
];

const CATS = ["Toutes", ...Array.from(new Set(FAQ_DATA.map(f => f.cat)))];

export default function FAQPage() {
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("Toutes");
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const filtered = useMemo(() => {
    return FAQ_DATA.filter(f => {
      const matchCat = cat === "Toutes" || f.cat === cat;
      const matchSearch = !search.trim() || f.q.toLowerCase().includes(search.toLowerCase()) || f.r.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [search, cat]);

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FBF8]">
      <Topbar />
      <div className="flex-1 p-5 max-w-5xl mx-auto w-full space-y-6">

        {/* Hero */}
        <div className="rounded-2xl p-6 text-white" style={{ background: "linear-gradient(135deg, #E65100 0%, #F57C00 100%)" }}>
          <div className="flex items-center gap-3 mb-2">
            <HelpCircle size={22} />
            <h1 className="text-xl font-bold">Foire aux questions — 100 réponses</h1>
          </div>
          <p className="text-sm opacity-80 mb-4">Les réponses aux questions les plus fréquentes sur AGRIFRIK.</p>
          <div className="relative max-w-lg">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white opacity-60" />
            <input value={search} onChange={e => { setSearch(e.target.value); setOpenIdx(null); }}
              placeholder="Rechercher une question…"
              className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm outline-none"
              style={{ backgroundColor: "rgba(255,255,255,0.15)", color: "white", border: "1px solid rgba(255,255,255,0.2)" }} />
          </div>
          <p className="text-xs opacity-60 mt-2">{filtered.length} question{filtered.length > 1 ? "s" : ""} trouvée{filtered.length > 1 ? "s" : ""}</p>
        </div>

        {/* Filtres catégories */}
        <div className="flex gap-2 flex-wrap">
          {CATS.map(c => (
            <button key={c} onClick={() => { setCat(c); setOpenIdx(null); }}
              className="px-3 py-1.5 rounded-xl text-xs font-medium transition-all"
              style={{
                backgroundColor: cat === c ? "#E65100" : "white",
                color: cat === c ? "white" : "#6B7280",
                border: "1px solid",
                borderColor: cat === c ? "#E65100" : "#E5E7EB",
              }}>
              {c}
            </button>
          ))}
        </div>

        {/* Questions */}
        <div className="space-y-2">
          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center">
              <p className="text-sm text-gray-400">Aucune question ne correspond à votre recherche.</p>
              <button onClick={() => { setSearch(""); setCat("Toutes"); }} className="mt-3 text-xs text-[#E65100] underline">Réinitialiser</button>
            </div>
          ) : filtered.map((f, i) => {
            const isOpen = openIdx === i;
            return (
              <div key={i} className="rounded-2xl border border-gray-100 bg-white overflow-hidden">
                <button onClick={() => setOpenIdx(isOpen ? null : i)}
                  className="flex items-start justify-between w-full px-5 py-4 text-left hover:bg-gray-50 transition-colors gap-3">
                  <div className="flex items-start gap-3 min-w-0">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 mt-0.5"
                      style={{ backgroundColor: "#FFF3E0", color: "#E65100" }}>{f.cat}</span>
                    <span className="text-sm font-semibold text-gray-800 leading-snug">{f.q}</span>
                  </div>
                  <ChevronDown size={15} className={`text-gray-400 flex-shrink-0 transition-transform mt-0.5 ${isOpen ? "rotate-180" : ""}`} />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5">
                    <p className="text-sm text-gray-600 leading-relaxed border-t border-gray-50 pt-3">{f.r}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* CTA support */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-gray-800">Vous n&apos;avez pas trouvé votre réponse ?</p>
            <p className="text-xs text-gray-500 mt-0.5">Notre équipe répond en moins de 4h en jours ouvrés.</p>
          </div>
          <a href="/messagerie" className="px-4 py-2 rounded-xl text-xs font-semibold text-white" style={{ backgroundColor: "#E65100" }}>
            Contacter le support
          </a>
        </div>

      </div>
    </div>
  );
}
