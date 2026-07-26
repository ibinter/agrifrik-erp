"use client";

import { useState, useEffect, useRef } from "react";
import Topbar from "../../../components/Topbar";
import Link from "next/link";
import {
  Book,
  ChevronRight,
  Download,
  MessageCircle,
  HelpCircle,
  LayoutDashboard,
  Leaf,
  Beef,
  Warehouse,
  ShoppingCart,
  CreditCard,
  Users,
  Zap,
  Key,
  Settings,
  Wifi,
  UserCheck,
} from "lucide-react";

const SECTIONS = [
  {
    id: "premiers-pas",
    num: 1,
    titre: "Premiers pas",
    icon: UserCheck,
    contenu: [
      {
        h3: "Création de compte et inscription",
        texte: `Pour accéder à AGRIFRIK ERP, rendez-vous sur la page d'inscription disponible à l'adresse de votre espace ou via le lien fourni par votre administrateur. Renseignez votre nom complet, votre adresse email professionnelle et créez un mot de passe sécurisé d'au moins 8 caractères. Un email de confirmation vous est envoyé pour valider votre compte.

Si votre organisation est déjà inscrite sur AGRIFRIK, votre administrateur système peut vous créer un compte directement depuis le module RH. Vous recevrez alors une invitation par email avec un lien de première connexion valable 48 heures.

Pour les exploitations individuelles, une période d'essai gratuit de 14 jours est disponible sans carte bancaire. Durant cette période, toutes les fonctionnalités du plan Pro sont accessibles pour évaluer l'outil dans vos conditions réelles.`,
      },
      {
        h3: "Connexion et sécurité",
        texte: `Connectez-vous à votre espace AGRIFRIK avec vos identifiants (email + mot de passe). Les identifiants de démonstration sont admin@agrifrik.com / agrifrik2025 pour tester l'application. En production, changez immédiatement ces identifiants par défaut.

La session reste active pendant 8 heures par défaut. Si vous travaillez depuis un poste partagé, pensez à vous déconnecter après chaque session via le menu utilisateur en haut à droite. L'activation de l'authentification à deux facteurs (2FA) est fortement recommandée pour les comptes administrateurs.

En cas d'oubli de mot de passe, cliquez sur « Mot de passe oublié » sur la page de connexion. Un lien de réinitialisation est envoyé à votre email sous quelques minutes.`,
      },
      {
        h3: "Onboarding et configuration initiale",
        texte: `Au premier démarrage, un assistant d'onboarding vous guide en 5 étapes : saisie du nom et du pays de votre exploitation, choix de votre secteur principal (cultures, élevage, mixte), configuration de la devise et de la langue, ajout d'un premier employé ou collaborateur, et personnalisation de votre tableau de bord.

Ces informations sont modifiables à tout moment dans les Paramètres. L'onboarding prend en moyenne 10 à 15 minutes et permet à AGRIFRIK de pré-configurer les modules les plus pertinents pour votre type d'activité agricole.`,
      },
    ],
    conseil: "Gardez vos identifiants en lieu sûr. Ne partagez jamais votre mot de passe, même avec le support AGRIFRIK.",
  },
  {
    id: "tableau-de-bord",
    num: 2,
    titre: "Tableau de bord",
    icon: LayoutDashboard,
    contenu: [
      {
        h3: "Vue d'ensemble et navigation principale",
        texte: `Le tableau de bord est la première page que vous voyez après connexion. Il centralise en un coup d'œil l'état de votre exploitation : production en cours, alertes urgentes, solde de trésorerie, nombre d'employés actifs et activités récentes. La barre latérale gauche donne accès à tous les modules organisés par catégorie.

La navigation est pensée pour une utilisation sur tablette ou smartphone en conditions de terrain. Les icônes sont larges, les textes lisibles même sous un soleil intense. Le menu peut être réduit (mode compact) pour libérer de l'espace sur les petits écrans.`,
      },
      {
        h3: "Widgets et KPIs",
        texte: `Les cartes KPI affichent en temps réel : revenus du mois, dépenses, stock critique, parcelles actives et tâches en attente. Chaque carte est cliquable et redirige vers le module correspondant pour en savoir plus.

Les graphiques SVG natifs illustrent l'évolution de vos indicateurs sur 7, 30 ou 90 jours. Aucune connexion externe n'est requise pour afficher ces graphiques — ils fonctionnent même en mode hors-ligne avec les dernières données synchronisées.

Les alertes critiques (stock bas, tâche en retard, facture impayée) apparaissent en bandeau rouge en haut du tableau de bord. Cliquez sur une alerte pour accéder directement à l'élément concerné.`,
      },
      {
        h3: "Personnalisation de l'affichage",
        texte: `Chaque utilisateur peut personnaliser son tableau de bord en choisissant les widgets à afficher. Accédez aux paramètres du tableau de bord via l'icône en haut à droite. Les préférences sont sauvegardées localement et synchronisées avec votre compte.

Le mode sombre est disponible pour réduire la fatigue oculaire lors des sessions nocturnes, fréquentes lors des périodes de récolte. Activez-le depuis le menu utilisateur ou les Paramètres > Apparence.`,
      },
    ],
    conseil: "Épinglez les modules que vous utilisez le plus souvent en cliquant sur l'étoile dans la barre latérale pour un accès en un clic.",
  },
  {
    id: "cultures",
    num: 3,
    titre: "Cultures",
    icon: Leaf,
    contenu: [
      {
        h3: "Gestion des parcelles",
        texte: `Le module Cultures est le cœur d'AGRIFRIK pour les exploitants agricoles. Commencez par créer vos parcelles en renseignant leur nom, leur superficie en hectares, leur localisation (village, commune, coordonnées GPS) et leur type de sol. Chaque parcelle dispose d'une fiche détaillée consultable à tout moment.

La cartographie intégrée permet de visualiser vos parcelles sur une carte. Dessinez les contours manuellement sur la carte interactive ou importez un fichier de délimitation. Le système calcule automatiquement la superficie à partir du tracé.`,
      },
      {
        h3: "Suivi des cultures et semis",
        texte: `Pour chaque parcelle, enregistrez les cultures en cours : espèce, variété, date de semis, densité et intrants utilisés. SARA, l'assistant IA intégré, peut vous suggérer la densité optimale selon la culture, la saison et les conditions de votre zone géographique.

Le planning cultural visualise sur un calendrier toutes vos activités agricoles programmées : semis, traitements phytosanitaires, irrigations, récoltes. Partagez ce planning avec votre équipe pour coordonner le travail au quotidien.`,
      },
      {
        h3: "Enregistrement des récoltes et rendements",
        texte: `Après chaque récolte, enregistrez la quantité produite, la qualité et la destination (stockage, vente directe, transformation). AGRIFRIK calcule automatiquement le rendement à l'hectare et le compare avec vos campagnes précédentes et avec les moyennes nationales.

L'historique des campagnes vous permet d'analyser l'évolution de vos rendements sur plusieurs années et d'identifier les meilleures rotations culturales pour votre exploitation.`,
      },
    ],
    conseil: "Enregistrez chaque traitement phytosanitaire dès qu'il est réalisé. Cette traçabilité est indispensable pour la certification qualité et les audits.",
  },
  {
    id: "elevage-pisciculture",
    num: 4,
    titre: "Élevage & Pisciculture",
    icon: Beef,
    contenu: [
      {
        h3: "Suivi des troupeaux",
        texte: `Le module Élevage permet de gérer votre cheptel bovin, ovin, caprin, porcin ou avicole. Créez vos animaux avec leur espèce, race, sexe, date de naissance, poids initial et numéro d'identification. L'identification individuelle facilite le suivi sanitaire et la traçabilité.

Enregistrez les événements de vie de chaque animal : naissances, achats, ventes, transferts entre parcs, pesées périodiques et incidents sanitaires. Le tableau de bord élevage affiche les indicateurs clés : taux de mortalité, croissance moyenne, productivité.`,
      },
      {
        h3: "Santé animale et soins vétérinaires",
        texte: `Pour chaque animal ou lot, enregistrez les interventions vétérinaires : vaccinations, traitements, visites sanitaires et résultats d'analyses. Les rappels de vaccination sont générés automatiquement selon le calendrier sanitaire que vous configurez.

Les alertes de santé signalent les animaux dont les soins sont en retard ou qui présentent des signes de maladie enregistrés. Ces alertes apparaissent sur le tableau de bord principal.`,
      },
      {
        h3: "Gestion des bassins piscicoles",
        texte: `Le sous-module Pisciculture gère vos bassins aquacoles : type (étang, cage flottante, bassin béton), superficie, espèce élevée, densité d'empoissonnement et cycle en cours. Enregistrez les alevins à l'entrée, les paramètres d'eau (pH, température, oxygène) et les alimentations.

À chaque vidange ou récolte, enregistrez le poids total produit, le taux de survie et la qualité des poissons. AGRIFRIK calcule votre indice de conversion alimentaire et vous compare aux benchmarks de votre région.`,
      },
    ],
    conseil: "Photographiez les animaux malades et attachez les photos à la fiche de soins. Ces preuves sont précieuses en cas de litige avec un fournisseur de médicaments.",
  },
  {
    id: "stocks-logistique",
    num: 5,
    titre: "Stocks & Logistique",
    icon: Warehouse,
    contenu: [
      {
        h3: "Gestion des articles et entrepôts",
        texte: `Le module Stocks gère tous vos articles : intrants (semences, engrais, pesticides), matières premières, produits finis et matériels. Chaque article a une fiche avec unité de mesure, seuil d'alerte, prix d'achat moyen et localisation en entrepôt.

Créez vos entrepôts et points de stockage (magasin principal, hangar de stockage, chambre froide) pour savoir exactement où se trouve chaque article. Les mouvements inter-entrepôts sont tracés et visibles dans l'historique.`,
      },
      {
        h3: "Entrées, sorties et mouvements",
        texte: `Chaque mouvement de stock (entrée fournisseur, sortie production, retour, ajustement d'inventaire) est enregistré avec la date, la quantité, le responsable et la justification. Cette traçabilité complète permet des audits fiables et évite les pertes non expliquées.

Les alertes de stock bas se déclenchent automatiquement quand un article atteint son seuil minimum. Vous pouvez configurer l'envoi d'une notification email ou SMS aux responsables désignés.`,
      },
      {
        h3: "Bons de commande et réceptions",
        texte: `Créez des bons de commande fournisseurs directement depuis le module Achats. Lorsque la livraison arrive, enregistrez la réception en comparant les quantités commandées aux quantités reçues. Tout écart est signalé pour traitement.

La fonction de traçabilité par lot permet de suivre chaque lot de semences, engrais ou produit depuis l'achat jusqu'à l'utilisation sur parcelle, essentielle pour les certifications bio et les audits qualité.`,
      },
    ],
    conseil: "Réalisez un inventaire physique mensuel et réconciliez-le avec le stock théorique dans AGRIFRIK. Cela prend moins d'une heure et évite les mauvaises surprises.",
  },
  {
    id: "ventes-commerce",
    num: 6,
    titre: "Ventes & Commerce",
    icon: ShoppingCart,
    contenu: [
      {
        h3: "Commandes clients et facturation",
        texte: `Le module Ventes gère l'ensemble du cycle de vente : création de la commande client, génération du devis, émission de la facture et suivi du paiement. Les factures sont numérotées automatiquement selon la séquence que vous configurez.

Chaque facture peut être imprimée, téléchargée en PDF ou envoyée par email directement depuis l'interface. Un QR code d'authenticité est généré sur chaque document pour permettre aux clients de vérifier l'origine.`,
      },
      {
        h3: "Devis et conditions commerciales",
        texte: `Créez des devis professionnels en quelques clics. Sélectionnez le client, ajoutez les articles avec quantités et prix, appliquez les remises et conditions de paiement. Le devis est converti en commande puis en facture en un seul clic.

Configurez vos conditions générales de vente, vos mentions légales et votre RIB dans les Paramètres > Commerce pour qu'ils apparaissent automatiquement sur tous vos documents.`,
      },
      {
        h3: "Exportation et commerce international",
        texte: `Pour les exploitations qui exportent, le module Exportation gère les dossiers d'export : certificats phytosanitaires, certificats d'origine, connaissements et déclarations douanières. Suivez l'état de chaque dossier de l'ouverture jusqu'au paiement.

Le module Prix du marché affiche les cours des principales denrées agricoles (cacao, café, anacarde, maïs, riz, coton) pour vous aider à optimiser vos prix de vente et anticiper les tendances.`,
      },
    ],
    conseil: "Activez les relances automatiques pour les factures impayées : AGRIFRIK peut envoyer un rappel email J+7, J+15 et J+30 après la date d'échéance.",
  },
  {
    id: "comptabilite-finance",
    num: 7,
    titre: "Comptabilité & Finance",
    icon: CreditCard,
    contenu: [
      {
        h3: "Comptabilité SYSCOHADA",
        texte: `La comptabilité d'AGRIFRIK est conforme au référentiel SYSCOHADA révisé, en vigueur dans les États membres de l'OHADA. Le plan comptable est pré-configuré avec les comptes agricoles les plus courants. Vous pouvez ajouter des sous-comptes spécifiques à votre activité.

Chaque vente et chaque achat enregistrés dans les modules Commerce et Achats génèrent automatiquement les écritures comptables correspondantes. Vous pouvez également saisir des écritures manuelles (amortissements, régularisations, opérations diverses).`,
      },
      {
        h3: "Suivi de la trésorerie",
        texte: `Le module Trésorerie centralise tous vos flux financiers : encaissements clients, paiements fournisseurs, salaires, remboursements de crédits et dépenses diverses. Créez autant de caisses et comptes bancaires que nécessaire.

Le tableau de trésorerie prévisionnel compare vos encaissements et décaissements planifiés pour anticiper les tensions de liquidité. Vous pouvez ainsi demander un financement à temps auprès de votre institution financière partenaire.`,
      },
      {
        h3: "Budget prévisionnel par campagne",
        texte: `Élaborez votre budget prévisionnel campagne par campagne : estimez vos charges (intrants, main-d'œuvre, transport, amortissements) et vos produits (ventes prévisionnelles, subventions). AGRIFRIK compare en temps réel le réalisé au prévisionnel.

Les rapports financiers (compte de résultat, bilan, flux de trésorerie) sont générés en un clic et peuvent être exportés au format PDF pour votre banque ou vos bailleurs de fonds.`,
      },
    ],
    conseil: "Enregistrez chaque dépense le jour même, même les petits achats en espèces. Les écarts de caisse sont difficiles à retrouver a posteriori.",
  },
  {
    id: "ressources-humaines",
    num: 8,
    titre: "Ressources Humaines",
    icon: Users,
    contenu: [
      {
        h3: "Gestion des employés",
        texte: `Le module RH centralise les dossiers de tous vos employés permanents et saisonniers. Chaque fiche employé contient : identité complète, poste et département, date d'entrée, type de contrat, salaire de base, coordonnées bancaires et documents scannés (CNI, contrat, diplômes).

Le suivi des absences et congés permet de savoir en temps réel qui est présent sur l'exploitation. Configurez le nombre de jours de congé annuel selon votre convention collective ou votre politique interne.`,
      },
      {
        h3: "Calcul de la paie",
        texte: `Le module Paie calcule automatiquement les salaires mensuels en tenant compte du salaire de base, des heures supplémentaires, des primes, des absences et des retenues légales (CNSS, IRPP selon les barèmes de votre pays). Les bulletins de paie sont générés en PDF.

Pour les travailleurs saisonniers payés à la tâche ou à la journée, utilisez la saisie de temps de travail pour enregistrer les jours effectués et calculer la rémunération correspondante.`,
      },
      {
        h3: "Planning des équipes",
        texte: `Le planning RH permet d'affecter les employés aux différentes tâches agricoles selon les besoins de chaque parcelle et chaque période. Évitez les surcharges de travail et assurez-vous que chaque équipe dispose des ressources nécessaires.

Les formations internes et certifications sont également suivies dans le module Formations : historique des formations par employé, coûts de formation et attestations de participation.`,
      },
    ],
    conseil: "Scannez et archivez les contrats de travail dans AGRIFRIK dès leur signature. En cas de litige, vous disposerez immédiatement de la preuve contractuelle.",
  },
  {
    id: "sara-ia",
    num: 9,
    titre: "SARA & IA",
    icon: Zap,
    contenu: [
      {
        h3: "L'assistant SARA",
        texte: `SARA (Système d'Assistance Rurale Agricole) est l'intelligence artificielle intégrée à AGRIFRIK. Accessible depuis l'icône robot dans la barre latérale ou depuis n'importe quelle page via le widget flottant, SARA répond à vos questions en langage naturel.

Posez vos questions en français, en anglais ou en portugais : « Quelle est la dose d'urée recommandée pour le maïs sur sol latéritique ? », « Mes poissons meurent, que faire ? », « Montre-moi mes ventes du mois dernier ». SARA s'appuie sur les données de votre exploitation pour personnaliser ses réponses.`,
      },
      {
        h3: "Recommandations agronomiques",
        texte: `SARA analyse vos données de production (types de sols, cultures passées, rendements) pour formuler des recommandations agronomiques adaptées à votre contexte. Elle peut suggérer des rotations culturales, des doses de fertilisants ou des variétés mieux adaptées à votre zone.

Les recommandations sont générées par un modèle de langage de grande taille (Groq / Llama) connecté à une base de connaissances agronomiques africaine. Elles restent des suggestions : consultez toujours un agronome local pour les décisions importantes.`,
      },
      {
        h3: "Météo et alertes climatiques",
        texte: `Le module Météo affiche les prévisions à 7 jours pour votre zone géographique. Les alertes météo (pluies intenses, sécheresse, vents forts) sont transmises automatiquement sur votre tableau de bord et par notification.

Planifiez vos traitements phytosanitaires et vos irrigations en consultant les prévisions pour éviter les pertes liées aux pluies immédiates après épandage ou aux périodes de stress hydrique.`,
      },
    ],
    conseil: "SARA fonctionne mieux quand vos données sont à jour. Plus vous enregistrez d'informations sur vos parcelles et productions, plus ses recommandations sont précises.",
  },
  {
    id: "abonnement-paiement",
    num: 10,
    titre: "Abonnement & Paiement",
    icon: Key,
    contenu: [
      {
        h3: "Plans et tarifs AGRIFRIK",
        texte: `AGRIFRIK est disponible en trois plans : Starter (exploitations individuelles, modules de base), Pro (toutes fonctionnalités, jusqu'à 10 utilisateurs) et Enterprise (multisite, API, support dédié, nombre d'utilisateurs illimité). Consultez la page Abonnement pour les tarifs actuels en FCFA.

La période d'essai gratuit de 14 jours donne accès au plan Pro sans restriction et sans carte bancaire. À l'expiration, votre compte passe en mode lecture seule jusqu'à l'activation d'un abonnement.`,
      },
      {
        h3: "Paiement par Mobile Money",
        texte: `AGRIFRIK accepte les paiements par Mobile Money (Orange Money, MTN Mobile Money, Wave, Moov Money) et par carte bancaire (Visa, Mastercard). Pour les grandes exploitations, le virement bancaire est également disponible sur facture.

Les paiements Mobile Money sont traités en temps réel via des opérateurs agréés. Après paiement, votre abonnement est activé immédiatement et une facture est envoyée à votre adresse email. Conservez cette facture pour votre comptabilité.`,
      },
      {
        h3: "Clé d'activation et gestion de la licence",
        texte: `Si vous avez acheté une licence auprès d'un revendeur IBIG SOFT agréé, saisissez votre clé d'activation dans Paramètres > Abonnement > Activer une licence. La clé est vérifiée en ligne et votre plan est activé immédiatement.

En cas de problème d'activation, contactez le support à support@agrifrik.com ou via WhatsApp au +225 07 78 88 25 92. Le système intègre une protection anti-brute-force : après 5 tentatives échouées, un délai d'attente est imposé.`,
      },
    ],
    conseil: "Activez le renouvellement automatique de votre abonnement pour éviter toute interruption de service en pleine campagne agricole.",
  },
  {
    id: "parametres-securite",
    num: 11,
    titre: "Paramètres & Sécurité",
    icon: Settings,
    contenu: [
      {
        h3: "Profil et préférences",
        texte: `Accédez à vos paramètres personnels via le menu utilisateur en haut à droite ou via Paramètres dans la barre latérale. Vous pouvez y modifier votre nom, votre photo de profil, votre langue d'interface (français, anglais, portugais) et vos préférences de notification.

Les paramètres de l'organisation (nom de l'exploitation, logo, coordonnées, pays, devise) sont accessibles aux administrateurs dans Paramètres > Organisation. Ces informations apparaissent sur vos factures et rapports.`,
      },
      {
        h3: "Gestion des utilisateurs et rôles",
        texte: `Un administrateur peut créer des comptes pour tous les membres de l'équipe et leur attribuer des rôles précis : Administrateur (accès total), Manager (tous modules sauf admin), Comptable (finance uniquement), Opérateur (production uniquement) ou Lecteur (consultation sans modification).

Cette gestion fine des accès garantit que chaque utilisateur ne voit que les informations nécessaires à son travail, protégeant ainsi la confidentialité des données financières et RH.`,
      },
      {
        h3: "Authentification à deux facteurs (2FA)",
        texte: `L'activation du 2FA ajoute une couche de sécurité supplémentaire à votre compte. À chaque connexion, un code à usage unique vous est envoyé par SMS ou généré par une application d'authentification (Google Authenticator, Authy). Ce code est valable 30 secondes.

Le 2FA est fortement recommandé pour tous les comptes ayant accès aux données financières. En cas de perte d'accès à votre application 2FA, contactez immédiatement le support pour procéder à la réinitialisation sécurisée.`,
      },
    ],
    conseil: "Revoyez régulièrement la liste des utilisateurs actifs et désactivez immédiatement les comptes des employés qui ont quitté l'organisation.",
  },
  {
    id: "hors-ligne-pwa",
    num: 12,
    titre: "Mode hors-ligne & PWA",
    icon: Wifi,
    contenu: [
      {
        h3: "Installation de l'application PWA",
        texte: `AGRIFRIK est une Progressive Web App (PWA) : elle peut être installée directement sur votre smartphone ou tablette depuis le navigateur, sans passer par un app store. Sur Android, une bannière d'installation apparaît automatiquement. Sur iOS, utilisez le bouton « Partager » de Safari puis « Sur l'écran d'accueil ».

Une fois installée, l'application se lance comme une application native, en plein écran, sans la barre d'adresse du navigateur. Elle fonctionne même sans connexion internet pour les fonctionnalités essentielles.`,
      },
      {
        h3: "Fonctionnement en mode hors-ligne",
        texte: `Le mode hors-ligne d'AGRIFRIK permet de continuer à travailler sur le terrain sans connexion internet. Les données des modules Cultures, Stocks et Élevage sont mises en cache pour permettre la consultation et la saisie hors-ligne.

Les modifications effectuées hors-ligne sont stockées localement sur votre appareil. Dès que la connexion est rétablie, elles sont synchronisées automatiquement avec le serveur. Un indicateur en haut de l'écran signale le mode hors-ligne et l'état de la synchronisation.`,
      },
      {
        h3: "Synchronisation et gestion du cache",
        texte: `La synchronisation est automatique et silencieuse lorsque vous retrouvez une connexion. En cas de conflit (modification du même enregistrement sur deux appareils), AGRIFRIK affiche un avertissement et vous invite à choisir la version à conserver.

Pour forcer une mise à jour du cache (utile après une mise à jour de l'application), accédez à Paramètres > Application > Vider le cache. Vos données saisies hors-ligne sont préservées lors de cette opération.`,
      },
    ],
    conseil: "Synchronisez votre appareil avant de partir sur le terrain. Assurez-vous que les données les plus récentes sont bien chargées dans le cache avant de perdre la connexion.",
  },
];

export default function GuidePage() {
  const [active, setActive] = useState(SECTIONS[0].id);
  const [progress, setProgress] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = el;
      const pct = scrollHeight <= clientHeight ? 100 : Math.round((scrollTop / (scrollHeight - clientHeight)) * 100);
      setProgress(pct);
    };
    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setActive(id);
    const el = document.getElementById(`section-${id}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FBF8]">
      <Topbar />

      {/* Barre de progression lecture */}
      <div className="fixed top-0 left-0 right-0 h-1 z-50" style={{ backgroundColor: "#E8F5E9" }}>
        <div
          className="h-full transition-all duration-150"
          style={{ width: `${progress}%`, backgroundColor: "#2E7D32" }}
        />
      </div>

      <div className="flex-1 p-5 max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="rounded-2xl p-6 text-white mb-6" style={{ background: "linear-gradient(135deg, #1B5E20 0%, #2E7D32 60%, #388E3C 100%)" }}>
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Book size={22} />
                <h1 className="text-xl font-bold">Guide utilisateur complet</h1>
              </div>
              <p className="text-sm opacity-80 max-w-xl">
                Découvrez toutes les fonctionnalités d&apos;AGRIFRIK ERP, de la prise en main à l&apos;utilisation avancée. 12 sections, plus de 30 procédures détaillées.
              </p>
              <div className="flex items-center gap-4 mt-3 text-xs opacity-70">
                <span>12 sections</span>
                <span>•</span>
                <span>Mis à jour le 26 juillet 2026</span>
                <span>•</span>
                <span>Contexte agricole africain</span>
              </div>
            </div>
            <a
              href="/api/export/pdf?type=guide"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold flex-shrink-0 transition-opacity hover:opacity-90"
              style={{ backgroundColor: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.3)" }}
            >
              <Download size={15} />
              Télécharger PDF
            </a>
          </div>
        </div>

        <div className="flex gap-6 items-start">
          {/* Sommaire sticky */}
          <aside className="hidden lg:block w-64 flex-shrink-0 sticky top-6">
            <div className="rounded-2xl border border-gray-100 bg-white p-4">
              <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-3">Sommaire</p>
              <nav className="space-y-0.5">
                {SECTIONS.map(s => {
                  const Icon = s.icon;
                  const isActive = active === s.id;
                  return (
                    <button
                      key={s.id}
                      onClick={() => scrollTo(s.id)}
                      className="flex items-center gap-2.5 w-full px-3 py-2 rounded-xl text-left transition-all text-xs"
                      style={{
                        backgroundColor: isActive ? "#E8F5E9" : "transparent",
                        color: isActive ? "#2E7D32" : "#6B7280",
                        fontWeight: isActive ? 600 : 400,
                      }}
                    >
                      <span
                        className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0"
                        style={{ backgroundColor: isActive ? "#2E7D32" : "#F3F4F6", color: isActive ? "white" : "#9CA3AF" }}
                      >
                        {s.num}
                      </span>
                      <Icon size={12} className="flex-shrink-0" />
                      <span className="truncate">{s.titre}</span>
                      {isActive && <ChevronRight size={11} className="ml-auto flex-shrink-0" />}
                    </button>
                  );
                })}
              </nav>

              {/* Liens rapides */}
              <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-300 mb-2">Aide rapide</p>
                <Link href="/aide/faq" className="flex items-center gap-2 text-xs text-gray-500 hover:text-[#2E7D32] transition-colors">
                  <HelpCircle size={12} />
                  100 questions fréquentes
                </Link>
                <a
                  href="mailto:support@agrifrik.com"
                  className="flex items-center gap-2 text-xs text-gray-500 hover:text-[#2E7D32] transition-colors"
                >
                  <MessageCircle size={12} />
                  support@agrifrik.com
                </a>
                <a
                  href="https://wa.me/2250778882592"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs text-gray-500 hover:text-[#2E7D32] transition-colors"
                >
                  <MessageCircle size={12} />
                  WhatsApp support
                </a>
              </div>
            </div>
          </aside>

          {/* Contenu principal */}
          <div ref={contentRef} className="flex-1 space-y-8 min-w-0">
            {SECTIONS.map(s => {
              const Icon = s.icon;
              return (
                <section key={s.id} id={`section-${s.id}`} className="scroll-mt-6">
                  {/* Titre de section */}
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-9 h-9 rounded-2xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: "#E8F5E9" }}
                    >
                      <Icon size={17} style={{ color: "#2E7D32" }} />
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 font-medium">Section {s.num}</p>
                      <h2 className="text-base font-bold" style={{ color: "#1B5E20" }}>{s.titre}</h2>
                    </div>
                  </div>

                  {/* Sous-sections */}
                  <div className="space-y-4">
                    {s.contenu.map((bloc, i) => (
                      <div key={i} className="rounded-2xl border border-gray-100 bg-white p-5">
                        <h3 className="text-sm font-semibold text-gray-800 mb-3">{bloc.h3}</h3>
                        <div className="space-y-2">
                          {bloc.texte.split("\n\n").map((para, j) => (
                            <p key={j} className="text-xs text-gray-600 leading-relaxed">{para}</p>
                          ))}
                        </div>
                      </div>
                    ))}

                    {/* Conseil pratique */}
                    <div
                      className="rounded-2xl p-4 flex gap-3"
                      style={{ backgroundColor: "#FFF3E0", border: "1px solid #FFE0B2" }}
                    >
                      <div
                        className="w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ backgroundColor: "#E65100" }}
                      >
                        <HelpCircle size={13} color="white" />
                      </div>
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-wide mb-1" style={{ color: "#E65100" }}>
                          Conseil pratique
                        </p>
                        <p className="text-xs text-gray-700 leading-relaxed">{s.conseil}</p>
                      </div>
                    </div>
                  </div>
                </section>
              );
            })}

            {/* Footer du guide */}
            <div className="rounded-2xl border border-gray-100 bg-white p-6 text-center">
              <Book size={28} className="mx-auto mb-3" style={{ color: "#2E7D32" }} />
              <h3 className="font-bold text-gray-800 mb-1">Vous avez terminé le guide !</h3>
              <p className="text-xs text-gray-500 mb-4 max-w-sm mx-auto">
                Pour aller plus loin, consultez nos ressources complémentaires ou contactez notre équipe support.
              </p>
              <div className="flex items-center justify-center gap-3 flex-wrap">
                <Link
                  href="/aide/faq"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white"
                  style={{ backgroundColor: "#2E7D32" }}
                >
                  <HelpCircle size={13} />
                  Consulter la FAQ
                </Link>
                <Link
                  href="/aide/academie"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold"
                  style={{ backgroundColor: "#F3F4F6", color: "#374151" }}
                >
                  Académie AGRIFRIK
                </Link>
                <a
                  href="https://wa.me/2250778882592"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold"
                  style={{ backgroundColor: "#E8F5E9", color: "#2E7D32" }}
                >
                  <MessageCircle size={13} />
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
