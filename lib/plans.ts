// Définitions des plans AGRIFRIK ERP
// Les prix viennent de la configuration (DB en prod, constantes en démo)

export type PlanCode = "essai" | "starter" | "pro" | "business" | "enterprise";
export type Periodicite = "mensuel" | "annuel";

export interface Plan {
  code: PlanCode;
  nom: string;
  prixMensuel: number;       // XOF
  prixAnnuel: number;        // XOF / mois si payé annuellement
  devise: string;
  maxUtilisateurs: number;   // 999 = illimité
  maxEntites: number;        // 999 = illimité
  stockageMo: number;
  support: string;
  badgeRecommande: boolean;
  essai: boolean;
  dureeEssaiJours: number;
  modulesInclus: string[];
  description: string;
}

export const PLANS: Plan[] = [
  {
    code: "essai",
    nom: "Essai Gratuit",
    prixMensuel: 0,
    prixAnnuel: 0,
    devise: "XOF",
    maxUtilisateurs: 3,
    maxEntites: 1,
    stockageMo: 512,
    support: "Email",
    badgeRecommande: false,
    essai: true,
    dureeEssaiJours: 14,
    modulesInclus: ["dashboard", "cultures", "stocks", "ventes", "rapports"],
    description: "Découvrez AGRIFRIK sans engagement",
  },
  {
    code: "starter",
    nom: "Starter",
    prixMensuel: 11900,
    prixAnnuel: 9900,
    devise: "XOF",
    maxUtilisateurs: 5,
    maxEntites: 1,
    stockageMo: 2048,
    support: "Email",
    badgeRecommande: false,
    essai: false,
    dureeEssaiJours: 0,
    modulesInclus: [
      "dashboard", "cultures", "elevage", "stocks", "achats", "ventes",
      "factures", "comptabilite", "rh", "rapports", "ia", "aide",
    ],
    description: "Idéal pour une exploitation individuelle",
  },
  {
    code: "pro",
    nom: "Pro",
    prixMensuel: 24900,
    prixAnnuel: 20900,
    devise: "XOF",
    maxUtilisateurs: 15,
    maxEntites: 3,
    stockageMo: 10240,
    support: "Email + Chat",
    badgeRecommande: true,
    essai: false,
    dureeEssaiJours: 0,
    modulesInclus: [
      "dashboard", "cultures", "elevage", "pisciculture", "exploitations",
      "cartographie", "planning-cultural", "semences", "transformation",
      "stocks", "entrepots", "achats", "fournisseurs", "materiels", "intrants", "logistique",
      "ventes", "exportation", "devis", "factures", "suivi-qualite", "tracabilite",
      "comptabilite", "tresorerie", "budget", "inventaire",
      "rh", "paie", "planning-rh", "formations", "cooperative",
      "rapports", "analytics", "rapport-annuel",
      "ia", "meteo", "calendrier",
      "messagerie", "taches", "documents",
      "administration", "alertes", "notifications", "aide",
    ],
    description: "Pour les exploitations en croissance",
  },
  {
    code: "business",
    nom: "Business",
    prixMensuel: 39900,
    prixAnnuel: 33200,
    devise: "XOF",
    maxUtilisateurs: 999,
    maxEntites: 10,
    stockageMo: 51200,
    support: "Email + Chat + Téléphone",
    badgeRecommande: false,
    essai: false,
    dureeEssaiJours: 0,
    modulesInclus: ["*"], // tous les modules
    description: "Pour les coopératives et PME agroalimentaires",
  },
  {
    code: "enterprise",
    nom: "Entreprise",
    prixMensuel: 99900,
    prixAnnuel: 83200,
    devise: "XOF",
    maxUtilisateurs: 999,
    maxEntites: 999,
    stockageMo: 204800,
    support: "Dédié 24h/24 + Formation",
    badgeRecommande: false,
    essai: false,
    dureeEssaiJours: 0,
    modulesInclus: ["*"],
    description: "Fonctionnalités sur mesure, accompagnement complet",
  },
];

export function getPlanByCode(code: PlanCode): Plan | undefined {
  return PLANS.find((p) => p.code === code);
}

export function formatPrix(montant: number, devise = "XOF"): string {
  if (montant === 0) return "Gratuit";
  return new Intl.NumberFormat("fr-FR").format(montant) + " " + devise;
}

export function prixPour(plan: Plan, periodicite: Periodicite): number {
  return periodicite === "annuel" ? plan.prixAnnuel * 12 : plan.prixMensuel;
}
