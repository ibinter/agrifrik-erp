"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  X,
  LayoutDashboard,
  Leaf,
  Beef,
  Fish,
  Warehouse,
  ShoppingCart,
  BarChart3,
  Ship,
  FileText,
  BookOpen,
  Banknote,
  PieChart,
  Users,
  Calendar,
  Brain,
  BarChart2,
  CloudRain,
  AlertTriangle,
  Settings,
  User,
  Plus,
  LogOut,
  MessageSquare,
  CheckSquare,
  FolderOpen,
  PackageOpen,
  TrendingUp,
  Building2,
  LayoutTemplate,
  CalendarClock,
  Map,
  ScanLine,
  Factory,
  Shield,
  Landmark,
  UserCheck,
  HelpCircle,
  Plug,
  Lock,
  SlidersHorizontal,
  CalendarDays,
  Wheat,
  ClipboardCheck,
  LineChart,
  FolderKanban,
  MapPin,
  FileSignature,
  Gauge,
  BadgeCheck,
  Wallet,
  GraduationCap,
  Network,
  ClipboardList,
  Receipt,
  Store,
  Truck,
  FlaskConical,
  Boxes,
  Award,
  Wrench,
} from "lucide-react";

const ICON_MAP: Record<string, React.ReactNode> = {
  LayoutDashboard: <LayoutDashboard size={16} />,
  Leaf: <Leaf size={16} />,
  Beef: <Beef size={16} />,
  Fish: <Fish size={16} />,
  Warehouse: <Warehouse size={16} />,
  ShoppingCart: <ShoppingCart size={16} />,
  BarChart3: <BarChart3 size={16} />,
  Ship: <Ship size={16} />,
  FileText: <FileText size={16} />,
  BookOpen: <BookOpen size={16} />,
  Banknote: <Banknote size={16} />,
  PieChart: <PieChart size={16} />,
  Users: <Users size={16} />,
  Calendar: <Calendar size={16} />,
  Brain: <Brain size={16} />,
  BarChart2: <BarChart2 size={16} />,
  CloudRain: <CloudRain size={16} />,
  AlertTriangle: <AlertTriangle size={16} />,
  Settings: <Settings size={16} />,
  User: <User size={16} />,
  Plus: <Plus size={16} />,
  LogOut: <LogOut size={16} />,
  MessageSquare: <MessageSquare size={16} />,
  CheckSquare: <CheckSquare size={16} />,
  FolderOpen: <FolderOpen size={16} />,
  PackageOpen: <PackageOpen size={16} />,
  TrendingUp: <TrendingUp size={16} />,
  Building2: <Building2 size={16} />,
  LayoutTemplate: <LayoutTemplate size={16} />,
  CalendarClock: <CalendarClock size={16} />,
  Map: <Map size={16} />,
  ScanLine: <ScanLine size={16} />,
  Factory: <Factory size={16} />,
  Shield: <Shield size={16} />,
  Landmark: <Landmark size={16} />,
  UserCheck: <UserCheck size={16} />,
  HelpCircle: <HelpCircle size={16} />,
  Plug: <Plug size={16} />,
  Lock: <Lock size={16} />,
  SlidersHorizontal: <SlidersHorizontal size={16} />,
  CalendarDays: <CalendarDays size={16} />,
  Wheat: <Wheat size={16} />,
  ClipboardCheck: <ClipboardCheck size={16} />,
  LineChart: <LineChart size={16} />,
  FolderKanban: <FolderKanban size={16} />,
  MapPin: <MapPin size={16} />,
  FileSignature: <FileSignature size={16} />,
  Gauge: <Gauge size={16} />,
  BadgeCheck: <BadgeCheck size={16} />,
  Wallet: <Wallet size={16} />,
  GraduationCap: <GraduationCap size={16} />,
  Network: <Network size={16} />,
  ClipboardList: <ClipboardList size={16} />,
  Receipt: <Receipt size={16} />,
  Store: <Store size={16} />,
  Truck: <Truck size={16} />,
  FlaskConical: <FlaskConical size={16} />,
  Boxes: <Boxes size={16} />,
  Award: <Award size={16} />,
  Wrench: <Wrench size={16} />,
};

type SearchItem = {
  type: "page" | "action";
  title: string;
  href: string;
  icon: string;
  desc: string;
};

const searchData: SearchItem[] = [
  { type: "page", title: "Tableau de bord", href: "/dashboard", icon: "LayoutDashboard", desc: "Vue d'ensemble" },
  { type: "page", title: "Cultures & Campagnes", href: "/cultures", icon: "Leaf", desc: "Production" },
  { type: "page", title: "Élevage", href: "/elevage", icon: "Beef", desc: "Production" },
  { type: "page", title: "Pisciculture", href: "/pisciculture", icon: "Fish", desc: "Production" },
  { type: "page", title: "Stocks & Entrepôts", href: "/stocks", icon: "Warehouse", desc: "Logistique" },
  { type: "page", title: "Achats & Fournisseurs", href: "/achats", icon: "ShoppingCart", desc: "Logistique" },
  { type: "page", title: "Ventes & Clients", href: "/ventes", icon: "BarChart3", desc: "Commerce" },
  { type: "page", title: "Exportation", href: "/exportation", icon: "Ship", desc: "Commerce" },
  { type: "page", title: "Factures & Devis", href: "/factures", icon: "FileText", desc: "Commerce" },
  { type: "page", title: "Comptabilité SYSCOHADA", href: "/comptabilite", icon: "BookOpen", desc: "Finance" },
  { type: "page", title: "Trésorerie", href: "/tresorerie", icon: "Banknote", desc: "Finance" },
  { type: "page", title: "Budget & Prévisions", href: "/budget", icon: "PieChart", desc: "Finance" },
  { type: "page", title: "RH & Paie", href: "/rh", icon: "Users", desc: "Ressources Humaines" },
  { type: "page", title: "Planning RH", href: "/planning-rh", icon: "Calendar", desc: "Ressources Humaines" },
  { type: "page", title: "Intelligence Artificielle", href: "/ia", icon: "Brain", desc: "IA" },
  { type: "page", title: "Rapports & BI", href: "/rapports", icon: "BarChart2", desc: "Analyse" },
  { type: "page", title: "Météo Agricole", href: "/meteo", icon: "CloudRain", desc: "Météo" },
  { type: "page", title: "Calendrier Agricole", href: "/calendrier", icon: "Calendar", desc: "Planning" },
  { type: "page", title: "Alertes", href: "/alertes", icon: "AlertTriangle", desc: "Monitoring" },
  { type: "page", title: "Administration", href: "/administration", icon: "Settings", desc: "Système" },
  { type: "page", title: "Mon profil", href: "/parametres/profil", icon: "User", desc: "Paramètres" },
  { type: "page", title: "Messagerie", href: "/messagerie", icon: "MessageSquare", desc: "Collaboration" },
  { type: "page", title: "Tâches & Suivi", href: "/taches", icon: "CheckSquare", desc: "Collaboration" },
  { type: "page", title: "Documents", href: "/documents", icon: "FolderOpen", desc: "Collaboration" },
  { type: "page", title: "Importation", href: "/importation", icon: "PackageOpen", desc: "Commerce" },
  { type: "page", title: "Prix du Marché", href: "/prix-marche", icon: "TrendingUp", desc: "Commerce" },
  { type: "page", title: "Espace Bailleur", href: "/bailleur", icon: "Building2", desc: "Reporting" },
  { type: "page", title: "RSE & Durabilité", href: "/rse", icon: "Leaf", desc: "Reporting" },
  { type: "page", title: "Rapport Annuel", href: "/rapport-annuel", icon: "FileText", desc: "Reporting" },
  { type: "page", title: "Constructeur Rapports", href: "/rapport-builder", icon: "LayoutTemplate", desc: "Reporting" },
  { type: "page", title: "Rapports Planifiés", href: "/rapports-planifies", icon: "CalendarClock", desc: "Reporting" },
  { type: "page", title: "Cartographie", href: "/cartographie", icon: "Map", desc: "Production" },
  { type: "page", title: "Traçabilité", href: "/tracabilite", icon: "ScanLine", desc: "Qualité" },
  { type: "page", title: "Transformation", href: "/transformation", icon: "Factory", desc: "Commerce" },
  { type: "page", title: "Assurances", href: "/assurances", icon: "Shield", desc: "Finance" },
  { type: "page", title: "Actifs & Amortissements", href: "/actifs", icon: "Landmark", desc: "Finance" },
  { type: "page", title: "Portail Producteur", href: "/portail-producteur", icon: "UserCheck", desc: "Portail" },
  { type: "page", title: "Centre d'Aide", href: "/aide", icon: "HelpCircle", desc: "Support" },
  { type: "page", title: "Intégrations", href: "/parametres/integrations", icon: "Plug", desc: "Paramètres" },
  { type: "page", title: "Sécurité", href: "/parametres/securite", icon: "Lock", desc: "Paramètres" },
  { type: "page", title: "Préférences", href: "/parametres/preferences", icon: "SlidersHorizontal", desc: "Paramètres" },
  // Production
  { type: "page", title: "Planning Cultural", href: "/planning-cultural", icon: "CalendarDays", desc: "Production" },
  { type: "page", title: "Semences", href: "/semences", icon: "Wheat", desc: "Production" },
  // Logistique
  { type: "page", title: "Entrepôts", href: "/entrepots", icon: "Store", desc: "Logistique" },
  { type: "page", title: "Fournisseurs", href: "/fournisseurs", icon: "Truck", desc: "Logistique" },
  { type: "page", title: "Intrants", href: "/intrants", icon: "FlaskConical", desc: "Logistique" },
  { type: "page", title: "Logistique", href: "/logistique", icon: "PackageOpen", desc: "Logistique" },
  // Commerce
  { type: "page", title: "Devis", href: "/devis", icon: "FileText", desc: "Commerce" },
  { type: "page", title: "Factures", href: "/factures", icon: "Receipt", desc: "Commerce" },
  { type: "page", title: "Suivi Qualité", href: "/suivi-qualite", icon: "BadgeCheck", desc: "Commerce" },
  { type: "page", title: "Audit", href: "/audit", icon: "ClipboardCheck", desc: "Commerce" },
  // Finance
  { type: "page", title: "Prévisions", href: "/previsions", icon: "LineChart", desc: "Finance" },
  { type: "page", title: "Inventaire", href: "/inventaire", icon: "Boxes", desc: "Finance" },
  // RH
  { type: "page", title: "Paie", href: "/paie", icon: "Wallet", desc: "Ressources Humaines" },
  { type: "page", title: "Formations", href: "/formations", icon: "GraduationCap", desc: "Ressources Humaines" },
  { type: "page", title: "Coopérative", href: "/cooperative", icon: "Network", desc: "Ressources Humaines" },
  { type: "page", title: "Projets", href: "/projets", icon: "FolderKanban", desc: "Ressources Humaines" },
  { type: "page", title: "Gestion des Terres", href: "/gestion-terres", icon: "MapPin", desc: "Ressources Humaines" },
  { type: "page", title: "Contrats", href: "/contrats", icon: "FileSignature", desc: "Ressources Humaines" },
  // Rapports & BI
  { type: "page", title: "Analytics", href: "/analytics", icon: "LineChart", desc: "Analyse" },
  { type: "page", title: "Direction", href: "/direction", icon: "Gauge", desc: "Analyse" },
  { type: "page", title: "Rapports Terrain", href: "/rapports-terrain", icon: "ClipboardList", desc: "Reporting" },
  // Detail pages (vagues 19-22)
  { type: "page", title: "Fiche détail exploitation", href: "/exploitations/[id]", icon: "Building2", desc: "Production" },
  { type: "page", title: "Fiche détail matériel/équipement", href: "/materiels/[id]", icon: "Wrench", desc: "Logistique" },
  { type: "page", title: "Fiche détail fournisseur", href: "/fournisseurs/[id]", icon: "Truck", desc: "Logistique" },
  { type: "page", title: "Bulletin de paie individuel", href: "/paie/[id]", icon: "Wallet", desc: "Ressources Humaines" },
  { type: "page", title: "Traçabilité complète d'un lot", href: "/tracabilite/[id]", icon: "ScanLine", desc: "Qualité" },
  { type: "page", title: "Fiche article stock", href: "/stocks/[id]", icon: "Warehouse", desc: "Logistique" },
  { type: "page", title: "Certifications & Conformité", href: "/certifications", icon: "Award", desc: "Commerce" },
  { type: "page", title: "Configuration initiale", href: "/onboarding", icon: "Settings", desc: "Administration" },
  { type: "action", title: "Enregistrer une récolte", href: "/cultures", icon: "Plus", desc: "Action rapide" },
  { type: "action", title: "Nouvelle commande", href: "/ventes", icon: "Plus", desc: "Action rapide" },
  { type: "action", title: "Nouveau bon de commande", href: "/achats", icon: "Plus", desc: "Action rapide" },
  { type: "action", title: "Nouvelle tâche", href: "/taches", icon: "CheckSquare", desc: "Action rapide" },
  { type: "action", title: "Envoyer un message", href: "/messagerie", icon: "MessageSquare", desc: "Action rapide" },
  { type: "action", title: "Voir le rapport annuel", href: "/rapport-annuel", icon: "FileText", desc: "Action rapide" },
  { type: "action", title: "Scanner un lot", href: "/tracabilite", icon: "ScanLine", desc: "Action rapide" },
  { type: "action", title: "Nouveau rapport terrain", href: "/rapports-terrain", icon: "ClipboardList", desc: "Action rapide" },
  { type: "action", title: "Nouveau projet", href: "/projets", icon: "FolderKanban", desc: "Action rapide" },
  { type: "action", title: "Nouvelle assurance", href: "/assurances", icon: "Shield", desc: "Action rapide" },
  { type: "action", title: "Nouveau lot de fermentation", href: "/transformation", icon: "Factory", desc: "Action rapide" },
  { type: "action", title: "Créer un membre coopérative", href: "/cooperative", icon: "Network", desc: "Action rapide" },
  { type: "action", title: "Voir les alertes critiques", href: "/notifications", icon: "AlertTriangle", desc: "Action rapide" },
  { type: "action", title: "Déconnexion", href: "/login", icon: "LogOut", desc: "Action rapide" },
];

const QUICK_ACCESS_HREFS = [
  "/dashboard",
  "/cultures",
  "/stocks",
  "/ventes",
  "/comptabilite",
  "/rh",
];

interface GlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GlobalSearch({ isOpen, onClose }: GlobalSearchProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Global Ctrl+K shortcut
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // parent controls open state via button, but shortcut also triggers
          // We dispatch a custom event that Topbar listens to, OR we rely on
          // the parent's own useEffect. Since onClose is passed, we can't open here.
          // The Topbar sets searchOpen via its own Ctrl+K handler.
        }
      }
      if (!isOpen) return;
      if (e.key === "Escape") {
        onClose();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setActiveIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Compute results
  const results: SearchItem[] = query.trim()
    ? searchData.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const quickAccess = searchData.filter((item) =>
    QUICK_ACCESS_HREFS.includes(item.href)
  );
  const quickActions = searchData.filter((item) => item.type === "action");

  // Flat navigable list
  const navigableItems: SearchItem[] = query.trim()
    ? results
    : [...quickAccess, ...quickActions];

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  // Keyboard navigation inside modal
  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, navigableItems.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const item = navigableItems[activeIndex];
      if (item) {
        router.push(item.href);
        onClose();
      }
    }
  }

  function handleSelect(href: string) {
    router.push(href);
    onClose();
  }

  if (!isOpen) return null;

  const pageResults = results.filter((r) => r.type === "page");
  const actionResults = results.filter((r) => r.type === "action");

  // Compute global index offset for coloring
  function getGlobalIndex(item: SearchItem): number {
    return navigableItems.indexOf(item);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4"
      style={{ backgroundColor: "rgba(0,0,0,0.45)" }}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden"
        onKeyDown={handleKeyDown}
      >
        {/* Search input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100">
          <Search size={20} className="text-gray-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher dans AGRIFRIK..."
            className="flex-1 text-base outline-none text-gray-800 placeholder-gray-400 bg-transparent"
          />
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-400 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Results */}
        <div ref={listRef} className="max-h-96 overflow-y-auto">
          {!query.trim() ? (
            <>
              <Section label="Accès rapide">
                {quickAccess.map((item) => (
                  <ResultRow
                    key={item.href}
                    item={item}
                    active={getGlobalIndex(item) === activeIndex}
                    onSelect={handleSelect}
                    onHover={() => setActiveIndex(getGlobalIndex(item))}
                  />
                ))}
              </Section>
              <Section label="Actions rapides">
                {quickActions.map((item, i) => (
                  <ResultRow
                    key={item.title + i}
                    item={item}
                    active={getGlobalIndex(item) === activeIndex}
                    onSelect={handleSelect}
                    onHover={() => setActiveIndex(getGlobalIndex(item))}
                  />
                ))}
              </Section>
            </>
          ) : results.length === 0 ? (
            <div className="px-4 py-10 text-center text-sm text-gray-400">
              Aucun résultat pour &ldquo;{query}&rdquo;
            </div>
          ) : (
            <>
              {pageResults.length > 0 && (
                <Section label="Pages">
                  {pageResults.map((item) => (
                    <ResultRow
                      key={item.href}
                      item={item}
                      active={getGlobalIndex(item) === activeIndex}
                      onSelect={handleSelect}
                      onHover={() => setActiveIndex(getGlobalIndex(item))}
                    />
                  ))}
                </Section>
              )}
              {actionResults.length > 0 && (
                <Section label="Actions rapides">
                  {actionResults.map((item, i) => (
                    <ResultRow
                      key={item.title + i}
                      item={item}
                      active={getGlobalIndex(item) === activeIndex}
                      onSelect={handleSelect}
                      onHover={() => setActiveIndex(getGlobalIndex(item))}
                    />
                  ))}
                </Section>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 border-t border-gray-100 flex items-center gap-4 text-[11px] text-gray-400">
          <span>↑↓ Naviguer</span>
          <span>·</span>
          <span>Enter Ouvrir</span>
          <span>·</span>
          <span>Esc Fermer</span>
          <span>·</span>
          <span>Ctrl+K Basculer</span>
        </div>
      </div>
    </div>
  );
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide px-4 pt-3 pb-1">
        {label}
      </p>
      {children}
    </div>
  );
}

function ResultRow({
  item,
  active,
  onSelect,
  onHover,
}: {
  item: SearchItem;
  active: boolean;
  onSelect: (href: string) => void;
  onHover: () => void;
}) {
  return (
    <button
      onMouseEnter={onHover}
      onClick={() => onSelect(item.href)}
      className="w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors"
      style={{ backgroundColor: active ? "#E8F5E9" : "transparent" }}
    >
      <span className="text-gray-500 shrink-0">{ICON_MAP[item.icon] ?? <Search size={16} />}</span>
      <span className="flex-1 text-sm text-gray-800 font-medium truncate">{item.title}</span>
      <span className="text-[11px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full shrink-0">
        {item.desc}
      </span>
    </button>
  );
}
