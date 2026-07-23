"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Locale = "fr" | "en" | "pt";

const TRANSLATIONS: Record<Locale, Record<string, string>> = {
  fr: {
    // Navigation
    "nav.dashboard": "Tableau de bord",
    "nav.cultures": "Cultures",
    "nav.elevage": "Élevage",
    "nav.stocks": "Stocks",
    "nav.ventes": "Ventes",
    "nav.finance": "Finance",
    "nav.rh": "Ressources humaines",
    "nav.rapports": "Rapports",
    "nav.aide": "Aide",
    "nav.parametres": "Paramètres",
    // Commun
    "common.save": "Enregistrer",
    "common.cancel": "Annuler",
    "common.delete": "Supprimer",
    "common.edit": "Modifier",
    "common.add": "Ajouter",
    "common.search": "Rechercher",
    "common.loading": "Chargement…",
    "common.error": "Une erreur est survenue",
    "common.success": "Opération réussie",
    "common.confirm": "Confirmer",
    "common.close": "Fermer",
    "common.export": "Exporter",
    "common.import": "Importer",
    "common.print": "Imprimer",
    "common.status": "Statut",
    "common.date": "Date",
    "common.amount": "Montant",
    "common.name": "Nom",
    "common.actions": "Actions",
    "common.yes": "Oui",
    "common.no": "Non",
    "common.total": "Total",
    "common.filter": "Filtrer",
    "common.all": "Tous",
    "common.active": "Actif",
    "common.inactive": "Inactif",
    "common.new": "Nouveau",
    "common.back": "Retour",
    "common.next": "Suivant",
    "common.previous": "Précédent",
    "common.submit": "Soumettre",
    "common.required": "Champ requis",
    "common.optional": "Facultatif",
    "common.none": "Aucun",
    // Auth
    "auth.login": "Se connecter",
    "auth.logout": "Se déconnecter",
    "auth.email": "Email",
    "auth.password": "Mot de passe",
    "auth.forgot": "Mot de passe oublié ?",
    // Topbar
    "topbar.notifications": "Notifications",
    "topbar.profile": "Mon profil",
    "topbar.theme.dark": "Mode sombre",
    "topbar.theme.light": "Mode clair",
    // Dashboard
    "dashboard.title": "Tableau de bord",
    "dashboard.welcome": "Bienvenue",
    // Cultures
    "cultures.title": "Cultures & Campagnes",
    "cultures.new": "Nouvelle culture",
    "cultures.parcelle": "Parcelle",
    "cultures.superficie": "Superficie (ha)",
    "cultures.semis": "Date de semis",
    "cultures.recolte": "Date de récolte",
    "cultures.rendement": "Rendement (t/ha)",
    // Finance
    "finance.recette": "Recette",
    "finance.depense": "Dépense",
    "finance.solde": "Solde",
    "finance.budget": "Budget",
    // Abonnement
    "abonnement.plan": "Plan actuel",
    "abonnement.renouveler": "Renouveler",
    "abonnement.upgrader": "Passer à la version supérieure",
    "abonnement.expires": "Expire le",
  },
  en: {
    // Navigation
    "nav.dashboard": "Dashboard",
    "nav.cultures": "Crops",
    "nav.elevage": "Livestock",
    "nav.stocks": "Inventory",
    "nav.ventes": "Sales",
    "nav.finance": "Finance",
    "nav.rh": "Human Resources",
    "nav.rapports": "Reports",
    "nav.aide": "Help",
    "nav.parametres": "Settings",
    // Common
    "common.save": "Save",
    "common.cancel": "Cancel",
    "common.delete": "Delete",
    "common.edit": "Edit",
    "common.add": "Add",
    "common.search": "Search",
    "common.loading": "Loading…",
    "common.error": "An error occurred",
    "common.success": "Operation successful",
    "common.confirm": "Confirm",
    "common.close": "Close",
    "common.export": "Export",
    "common.import": "Import",
    "common.print": "Print",
    "common.status": "Status",
    "common.date": "Date",
    "common.amount": "Amount",
    "common.name": "Name",
    "common.actions": "Actions",
    "common.yes": "Yes",
    "common.no": "No",
    "common.total": "Total",
    "common.filter": "Filter",
    "common.all": "All",
    "common.active": "Active",
    "common.inactive": "Inactive",
    "common.new": "New",
    "common.back": "Back",
    "common.next": "Next",
    "common.previous": "Previous",
    "common.submit": "Submit",
    "common.required": "Required field",
    "common.optional": "Optional",
    "common.none": "None",
    // Auth
    "auth.login": "Sign in",
    "auth.logout": "Sign out",
    "auth.email": "Email",
    "auth.password": "Password",
    "auth.forgot": "Forgot password?",
    // Topbar
    "topbar.notifications": "Notifications",
    "topbar.profile": "My profile",
    "topbar.theme.dark": "Dark mode",
    "topbar.theme.light": "Light mode",
    // Dashboard
    "dashboard.title": "Dashboard",
    "dashboard.welcome": "Welcome",
    // Cultures
    "cultures.title": "Crops & Campaigns",
    "cultures.new": "New crop",
    "cultures.parcelle": "Plot",
    "cultures.superficie": "Area (ha)",
    "cultures.semis": "Sowing date",
    "cultures.recolte": "Harvest date",
    "cultures.rendement": "Yield (t/ha)",
    // Finance
    "finance.recette": "Revenue",
    "finance.depense": "Expense",
    "finance.solde": "Balance",
    "finance.budget": "Budget",
    // Abonnement
    "abonnement.plan": "Current plan",
    "abonnement.renouveler": "Renew",
    "abonnement.upgrader": "Upgrade plan",
    "abonnement.expires": "Expires on",
  },
  pt: {
    // Navigation
    "nav.dashboard": "Painel",
    "nav.cultures": "Culturas",
    "nav.elevage": "Pecuária",
    "nav.stocks": "Estoque",
    "nav.ventes": "Vendas",
    "nav.finance": "Finanças",
    "nav.rh": "Recursos Humanos",
    "nav.rapports": "Relatórios",
    "nav.aide": "Ajuda",
    "nav.parametres": "Configurações",
    // Common
    "common.save": "Guardar",
    "common.cancel": "Cancelar",
    "common.delete": "Eliminar",
    "common.edit": "Editar",
    "common.add": "Adicionar",
    "common.search": "Pesquisar",
    "common.loading": "Carregando…",
    "common.error": "Ocorreu um erro",
    "common.success": "Operação bem-sucedida",
    "common.confirm": "Confirmar",
    "common.close": "Fechar",
    "common.export": "Exportar",
    "common.import": "Importar",
    "common.print": "Imprimir",
    "common.status": "Estado",
    "common.date": "Data",
    "common.amount": "Valor",
    "common.name": "Nome",
    "common.actions": "Ações",
    "common.yes": "Sim",
    "common.no": "Não",
    "common.total": "Total",
    "common.filter": "Filtrar",
    "common.all": "Todos",
    "common.active": "Ativo",
    "common.inactive": "Inativo",
    "common.new": "Novo",
    "common.back": "Voltar",
    "common.next": "Próximo",
    "common.previous": "Anterior",
    "common.submit": "Enviar",
    "common.required": "Campo obrigatório",
    "common.optional": "Opcional",
    "common.none": "Nenhum",
    // Auth
    "auth.login": "Entrar",
    "auth.logout": "Sair",
    "auth.email": "E-mail",
    "auth.password": "Senha",
    "auth.forgot": "Esqueceu a senha?",
    // Topbar
    "topbar.notifications": "Notificações",
    "topbar.profile": "Meu perfil",
    "topbar.theme.dark": "Modo escuro",
    "topbar.theme.light": "Modo claro",
    // Dashboard
    "dashboard.title": "Painel",
    "dashboard.welcome": "Bem-vindo",
    // Cultures
    "cultures.title": "Culturas & Campanhas",
    "cultures.new": "Nova cultura",
    "cultures.parcelle": "Parcela",
    "cultures.superficie": "Área (ha)",
    "cultures.semis": "Data de semeadura",
    "cultures.recolte": "Data de colheita",
    "cultures.rendement": "Produtividade (t/ha)",
    // Finance
    "finance.recette": "Receita",
    "finance.depense": "Despesa",
    "finance.solde": "Saldo",
    "finance.budget": "Orçamento",
    // Abonnement
    "abonnement.plan": "Plano atual",
    "abonnement.renouveler": "Renovar",
    "abonnement.upgrader": "Fazer upgrade",
    "abonnement.expires": "Expira em",
  },
};

interface I18nContextType {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType>({
  locale: "fr",
  setLocale: () => {},
  t: (k) => k,
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("fr");

  useEffect(() => {
    const saved = localStorage.getItem("agrifrik_locale") as Locale | null;
    if (saved && ["fr", "en", "pt"].includes(saved)) setLocaleState(saved);
  }, []);

  function setLocale(l: Locale) {
    setLocaleState(l);
    localStorage.setItem("agrifrik_locale", l);
    // Update html lang attribute
    document.documentElement.lang = l;
  }

  function t(key: string): string {
    return TRANSLATIONS[locale][key] ?? TRANSLATIONS["fr"][key] ?? key;
  }

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}

export const LOCALE_LABELS: Record<Locale, { label: string; flag: string }> = {
  fr: { label: "Français", flag: "🇫🇷" },
  en: { label: "English", flag: "🇬🇧" },
  pt: { label: "Português", flag: "🇵🇹" },
};
