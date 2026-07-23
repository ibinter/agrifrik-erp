// Rôles disponibles dans AGRIFRIK ERP
export type Role =
  | "superadmin"  // IBIG Soft — accès total
  | "admin"       // Administrateur client — accès total dans son org
  | "directeur"   // Direction — quasi-tout sauf console système
  | "comptable"   // Finance uniquement
  | "rh"          // RH & Paie uniquement
  | "technicien"  // Production, stocks, intrants
  | "commercial"  // Commerce, ventes
  | "qualite"     // Qualité, traçabilité, audit
  | "auditeur"    // Lecture + audit
  | "producteur"  // Portail producteur restreint
  | "stagiaire"   // Lecture seule basique
  | "operateur";  // Opérationnel de base (rôle par défaut)

// Rôles qui ont accès total (sauf filtres org)
export const ADMIN_ROLES: Role[] = ["superadmin", "admin", "directeur"];

// Matrice d'accès : chemin ERP → rôles autorisés
// Une route non listée est accessible à tous les rôles authentifiés
const ACCESS_MATRIX: Record<string, Role[]> = {
  // Production
  "/cultures":          ["superadmin", "admin", "directeur", "technicien", "commercial", "auditeur", "stagiaire", "operateur"],
  "/elevage":           ["superadmin", "admin", "directeur", "technicien", "operateur"],
  "/pisciculture":      ["superadmin", "admin", "directeur", "technicien", "operateur"],
  "/exploitations":     ["superadmin", "admin", "directeur", "technicien", "commercial", "operateur"],
  "/cartographie":      ["superadmin", "admin", "directeur", "technicien", "operateur"],
  "/planning-cultural": ["superadmin", "admin", "directeur", "technicien", "operateur"],
  "/semences":          ["superadmin", "admin", "directeur", "technicien", "operateur"],
  "/transformation":    ["superadmin", "admin", "directeur", "technicien", "commercial", "operateur"],

  // Logistique
  "/stocks":     ["superadmin", "admin", "directeur", "technicien", "commercial", "operateur"],
  "/entrepots":  ["superadmin", "admin", "directeur", "technicien", "operateur"],
  "/achats":     ["superadmin", "admin", "directeur", "technicien", "commercial", "operateur"],
  "/fournisseurs":["superadmin", "admin", "directeur", "technicien", "commercial", "comptable", "operateur"],
  "/materiels":  ["superadmin", "admin", "directeur", "technicien", "operateur"],
  "/intrants":   ["superadmin", "admin", "directeur", "technicien", "operateur"],
  "/logistique": ["superadmin", "admin", "directeur", "technicien", "commercial", "operateur"],

  // Commerce
  "/ventes":        ["superadmin", "admin", "directeur", "commercial", "comptable"],
  "/exportation":   ["superadmin", "admin", "directeur", "commercial", "qualite"],
  "/importation":   ["superadmin", "admin", "directeur", "commercial"],
  "/prix-marche":   ["superadmin", "admin", "directeur", "commercial", "technicien"],
  "/devis":         ["superadmin", "admin", "directeur", "commercial"],
  "/factures":      ["superadmin", "admin", "directeur", "commercial", "comptable"],
  "/suivi-qualite": ["superadmin", "admin", "directeur", "qualite", "commercial"],
  "/tracabilite":   ["superadmin", "admin", "directeur", "qualite", "commercial", "auditeur"],
  "/audit":         ["superadmin", "admin", "directeur", "qualite", "auditeur"],
  "/certifications":["superadmin", "admin", "directeur", "qualite"],
  "/contrats":      ["superadmin", "admin", "directeur", "commercial", "rh"],

  // Finance — accès restreint
  "/comptabilite": ["superadmin", "admin", "directeur", "comptable"],
  "/tresorerie":   ["superadmin", "admin", "directeur", "comptable"],
  "/budget":       ["superadmin", "admin", "directeur", "comptable"],
  "/previsions":   ["superadmin", "admin", "directeur", "comptable"],
  "/inventaire":   ["superadmin", "admin", "directeur", "comptable", "technicien"],
  "/assurances":   ["superadmin", "admin", "directeur", "comptable"],
  "/actifs":       ["superadmin", "admin", "directeur", "comptable"],

  // RH — accès restreint
  "/rh":            ["superadmin", "admin", "directeur", "rh"],
  "/paie":          ["superadmin", "admin", "directeur", "rh"],
  "/planning-rh":   ["superadmin", "admin", "directeur", "rh"],
  "/formations":    ["superadmin", "admin", "directeur", "rh"],
  "/cooperative":   ["superadmin", "admin", "directeur", "rh", "technicien"],
  "/projets":       ["superadmin", "admin", "directeur", "rh", "technicien", "commercial"],
  "/gestion-terres":["superadmin", "admin", "directeur", "rh", "technicien"],

  // Rapports
  "/rapports":           ["superadmin", "admin", "directeur", "comptable", "auditeur"],
  "/analytics":          ["superadmin", "admin", "directeur", "comptable", "auditeur"],
  "/direction":          ["superadmin", "admin", "directeur"],
  "/rapport-annuel":     ["superadmin", "admin", "directeur", "comptable", "auditeur"],
  "/rapport-builder":    ["superadmin", "admin", "directeur"],
  "/rapports-planifies": ["superadmin", "admin", "directeur", "comptable"],
  "/rapports-terrain":   ["superadmin", "admin", "directeur", "technicien", "qualite"],
  "/bailleur":           ["superadmin", "admin", "directeur"],

  // Administration — réservée aux admins
  "/superadmin":        ["superadmin"],
  "/administration":    ["superadmin", "admin"],
  "/rse":               ["superadmin", "admin", "directeur"],
  "/portail-producteur":["superadmin", "admin", "directeur"],
  "/alertes":           ["superadmin", "admin", "directeur"],
  "/logs":              ["superadmin", "admin"],
  "/notifications":     ["superadmin", "admin", "directeur"],

  // Paramètres avancés — admin seulement
  "/parametres/integrations": ["superadmin", "admin"],
};

// Routes accessibles à TOUS les utilisateurs authentifiés (non listées → public ERP)
const OPEN_ERP_ROUTES = [
  "/dashboard",
  "/ia",
  "/meteo",
  "/calendrier",
  "/messagerie",
  "/taches",
  "/documents",
  "/aide",
  "/parametres/profil",
  "/parametres/securite",
  "/parametres/preferences",
];

export function canAccess(role: Role, pathname: string): boolean {
  // Superadmin et admin voient tout
  if (role === "superadmin" || role === "admin") return true;

  // Routes ouvertes à tous les utilisateurs authentifiés
  for (const open of OPEN_ERP_ROUTES) {
    if (pathname === open || pathname.startsWith(open + "/")) return true;
  }

  // Vérification matrice d'accès — chercher la règle la plus spécifique (préfixe le plus long)
  let matchedRoles: Role[] | null = null;
  let matchLen = 0;

  for (const [prefix, roles] of Object.entries(ACCESS_MATRIX)) {
    if ((pathname === prefix || pathname.startsWith(prefix + "/")) && prefix.length > matchLen) {
      matchedRoles = roles;
      matchLen = prefix.length;
    }
  }

  // Aucune règle trouvée → route autorisée à tous les rôles authentifiés (hors producteur/stagiaire)
  if (!matchedRoles) {
    return role !== "producteur";
  }

  return matchedRoles.includes(role);
}

// Sections de sidebar visibles par rôle
export function sidebarSectionsForRole(role: Role): string[] {
  if (role === "superadmin" || role === "admin" || role === "directeur") {
    return ["all"];
  }

  const visible: string[] = ["dashboard", "ia", "collaboration", "parametres"];

  if (["technicien", "operateur", "stagiaire"].includes(role)) {
    visible.push("production", "logistique");
  }
  if (["commercial"].includes(role)) {
    visible.push("production", "logistique", "commerce");
  }
  if (["comptable"].includes(role)) {
    visible.push("finance", "rapports");
  }
  if (["rh"].includes(role)) {
    visible.push("rh");
  }
  if (["qualite"].includes(role)) {
    visible.push("commerce", "production");
  }
  if (["auditeur"].includes(role)) {
    visible.push("rapports", "commerce");
  }
  if (["producteur"].includes(role)) {
    return ["dashboard", "portail", "parametres"];
  }

  return visible;
}
