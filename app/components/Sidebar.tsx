"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Sprout,
  Building2,
  Leaf,
  Beef,
  Fish,
  Map,
  Package,
  Warehouse,
  ShoppingCart,
  Wrench,
  TrendingUp,
  BarChart3,
  Ship,
  Factory,
  DollarSign,
  BookOpen,
  Banknote,
  Users,
  BarChart2,
  Brain,
  Settings,
  LogOut,
  ChevronDown,
  Menu,
  X,
  PanelLeftClose,
  PanelLeftOpen,
  AlertTriangle,
  ClipboardList,
  Bell,
  HelpCircle,
  PackageOpen,
  FileText,
  LayoutTemplate,
  CalendarClock,
  MessageSquare,
  CheckSquare,
  FolderOpen,
  Plug,
  UserCheck,
  CalendarDays,
  Wheat,
  Truck,
  Store,
  FlaskConical,
  Receipt,
  ClipboardCheck,
  ScanLine,
  Shield,
  PieChart,
  LineChart,
  Boxes,
  Landmark,
  Wallet,
  Calendar,
  GraduationCap,
  Network,
  FolderKanban,
  MapPin,
  FileSignature,
  Gauge,
  CloudRain,
  Lock,
  SlidersHorizontal,
  User,
  BadgeCheck,
  Award,
} from "lucide-react";

type NavChild = {
  label: string;
  href: string;
  icon: React.ElementType;
};

type NavSection = {
  label: string;
  icon: React.ElementType;
  href?: string;
  children?: NavChild[];
};

const navSections: NavSection[] = [
  {
    label: "Tableau de bord",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Production",
    icon: Sprout,
    children: [
      { label: "Exploitations & Coopératives", href: "/exploitations", icon: Building2 },
      { label: "Cultures & Campagnes", href: "/cultures", icon: Leaf },
      { label: "Élevage", href: "/elevage", icon: Beef },
      { label: "Pisciculture", href: "/pisciculture", icon: Fish },
      { label: "Cartographie GPS", href: "/cartographie", icon: Map },
      { label: "Planning Cultural", href: "/planning-cultural", icon: CalendarDays },
      { label: "Semences", href: "/semences", icon: Wheat },
      { label: "Transformation", href: "/transformation", icon: Factory },
    ],
  },
  {
    label: "Logistique",
    icon: Package,
    children: [
      { label: "Stocks", href: "/stocks", icon: Warehouse },
      { label: "Entrepôts", href: "/entrepots", icon: Store },
      { label: "Achats", href: "/achats", icon: ShoppingCart },
      { label: "Fournisseurs", href: "/fournisseurs", icon: Truck },
      { label: "Matériels & Maintenance", href: "/materiels", icon: Wrench },
      { label: "Intrants", href: "/intrants", icon: FlaskConical },
      { label: "Logistique", href: "/logistique", icon: Package },
    ],
  },
  {
    label: "Commerce",
    icon: TrendingUp,
    children: [
      { label: "Ventes & Clients", href: "/ventes", icon: BarChart3 },
      { label: "Exportation", href: "/exportation", icon: Ship },
      { label: "Importation", href: "/importation", icon: PackageOpen },
      { label: "Transformation", href: "/transformation", icon: Factory },
      { label: "Prix du Marché", href: "/prix-marche", icon: TrendingUp },
      { label: "Devis", href: "/devis", icon: FileText },
      { label: "Factures", href: "/factures", icon: Receipt },
      { label: "Suivi Qualité", href: "/suivi-qualite", icon: BadgeCheck },
      { label: "Traçabilité", href: "/tracabilite", icon: ScanLine },
      { label: "Audit", href: "/audit", icon: ClipboardCheck },
      { label: "Certifications", href: "/certifications", icon: Award },
      { label: "Contrats", href: "/contrats", icon: FileSignature },
    ],
  },
  {
    label: "Finance",
    icon: DollarSign,
    children: [
      { label: "Comptabilité SYSCOHADA", href: "/comptabilite", icon: BookOpen },
      { label: "Trésorerie", href: "/tresorerie", icon: Banknote },
      { label: "Budget", href: "/budget", icon: PieChart },
      { label: "Prévisions", href: "/previsions", icon: LineChart },
      { label: "Inventaire", href: "/inventaire", icon: Boxes },
      { label: "Assurances", href: "/assurances", icon: Shield },
      { label: "Actifs & Amortissements", href: "/actifs", icon: Landmark },
    ],
  },
  {
    label: "RH & Paie",
    icon: Users,
    children: [
      { label: "Ressources Humaines", href: "/rh", icon: Users },
      { label: "Paie", href: "/paie", icon: Wallet },
      { label: "Planning RH", href: "/planning-rh", icon: Calendar },
      { label: "Formations", href: "/formations", icon: GraduationCap },
      { label: "Coopérative", href: "/cooperative", icon: Network },
      { label: "Projets", href: "/projets", icon: FolderKanban },
      { label: "Gestion des Terres", href: "/gestion-terres", icon: MapPin },
      { label: "Contrats", href: "/contrats", icon: FileSignature },
    ],
  },
  {
    label: "Rapports & BI",
    icon: BarChart2,
    children: [
      { label: "Rapports", href: "/rapports", icon: BarChart2 },
      { label: "Analytics", href: "/analytics", icon: LineChart },
      { label: "Direction", href: "/direction", icon: Gauge },
      { label: "Rapport Annuel", href: "/rapport-annuel", icon: FileText },
      { label: "Constructeur Rapports", href: "/rapport-builder", icon: LayoutTemplate },
      { label: "Rapports Planifiés", href: "/rapports-planifies", icon: CalendarClock },
      { label: "Rapports Terrain", href: "/rapports-terrain", icon: ClipboardList },
      { label: "Espace Bailleur", href: "/bailleur", icon: Building2 },
    ],
  },
  {
    label: "IA & Données",
    icon: Brain,
    children: [
      { label: "Intelligence Artificielle", href: "/ia", icon: Brain },
      { label: "Météo Agricole", href: "/meteo", icon: CloudRain },
      { label: "Calendrier Agricole", href: "/calendrier", icon: Calendar },
    ],
  },
  {
    label: "Collaboration",
    icon: MessageSquare,
    children: [
      { label: "Messagerie", href: "/messagerie", icon: MessageSquare },
      { label: "Tâches", href: "/taches", icon: CheckSquare },
      { label: "Documents", href: "/documents", icon: FolderOpen },
    ],
  },
  {
    label: "Administration",
    icon: Settings,
    children: [
      { label: "Administration", href: "/administration", icon: Settings },
      { label: "RSE & Durabilité", href: "/rse", icon: Leaf },
      { label: "Portail Producteur", href: "/portail-producteur", icon: UserCheck },
      { label: "Alertes", href: "/alertes", icon: AlertTriangle },
      { label: "Journal d'activité", href: "/logs", icon: ClipboardList },
      { label: "Notifications", href: "/notifications", icon: Bell },
      { label: "Centre d'aide", href: "/aide", icon: HelpCircle },
    ],
  },
  {
    label: "Paramètres",
    icon: SlidersHorizontal,
    children: [
      { label: "Mon Profil", href: "/parametres/profil", icon: User },
      { label: "Sécurité", href: "/parametres/securite", icon: Lock },
      { label: "Préférences", href: "/parametres/preferences", icon: SlidersHorizontal },
      { label: "Intégrations", href: "/parametres/integrations", icon: Plug },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  // Determine which sections should be initially expanded
  const getInitialExpanded = () => {
    const expanded: string[] = [];
    for (const section of navSections) {
      if (section.children) {
        const hasActive = section.children.some((c) => pathname.startsWith(c.href));
        if (hasActive) expanded.push(section.label);
      }
    }
    return expanded;
  };

  const [expanded, setExpanded] = useState<string[]>(getInitialExpanded);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleSection = (label: string) => {
    setExpanded((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );
  };

  const SidebarContent = ({ mobile = false }: { mobile?: boolean }) => (
    <div
      className="flex flex-col h-full overflow-hidden"
      style={{ backgroundColor: "#1A2E1A", width: mobile ? 240 : isCollapsed ? 64 : 240, transition: "width 0.2s ease" }}
    >
      {/* Header: Logo + Toggle */}
      <div
        className="flex items-center border-b flex-shrink-0"
        style={{
          borderColor: "rgba(255,255,255,0.08)",
          padding: isCollapsed && !mobile ? "12px 0" : "12px 16px",
          justifyContent: isCollapsed && !mobile ? "center" : "space-between",
          minHeight: 56,
        }}
      >
        <div className="flex items-center gap-2 overflow-hidden">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: "#2E7D32" }}
          >
            <Leaf size={16} color="white" strokeWidth={2.5} />
          </div>
          {(!isCollapsed || mobile) && (
            <span className="font-bold text-sm whitespace-nowrap" style={{ color: "#A5D6A7" }}>
              AGRIFRIK
            </span>
          )}
        </div>
        {!mobile && (
          <button
            onClick={() => setIsCollapsed((v) => !v)}
            className="flex-shrink-0 rounded-md p-1 hover:bg-white/10 transition-colors"
            style={{ color: "#9E9E9E" }}
            title={isCollapsed ? "Déployer" : "Réduire"}
          >
            {isCollapsed ? <PanelLeftOpen size={16} /> : <PanelLeftClose size={16} />}
          </button>
        )}
        {mobile && (
          <button
            onClick={() => setMobileOpen(false)}
            className="flex-shrink-0 rounded-md p-1 hover:bg-white/10 transition-colors"
            style={{ color: "#9E9E9E" }}
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-2 px-2 space-y-0.5">
        {navSections.map((section) => {
          const Icon = section.icon;

          // Simple link (no children)
          if (!section.children) {
            const isActive = pathname === section.href;
            return (
              <Link
                key={section.href}
                href={section.href!}
                onClick={() => mobile && setMobileOpen(false)}
                title={isCollapsed && !mobile ? section.label : undefined}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors"
                style={{
                  backgroundColor: isActive ? "#2E7D32" : "transparent",
                  color: isActive ? "white" : "#D1D5DB",
                  justifyContent: isCollapsed && !mobile ? "center" : undefined,
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLElement).style.backgroundColor = "#243824";
                    (e.currentTarget as HTMLElement).style.color = "white";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                    (e.currentTarget as HTMLElement).style.color = "#D1D5DB";
                  }
                }}
              >
                <Icon size={16} strokeWidth={1.8} className="flex-shrink-0" />
                {(!isCollapsed || mobile) && <span className="truncate">{section.label}</span>}
              </Link>
            );
          }

          // Section with children
          const isOpen = expanded.includes(section.label);
          const hasActive = section.children.some((c) => pathname.startsWith(c.href));

          return (
            <div key={section.label}>
              <button
                onClick={() => {
                  if (isCollapsed && !mobile) {
                    setIsCollapsed(false);
                    if (!isOpen) toggleSection(section.label);
                  } else {
                    toggleSection(section.label);
                  }
                }}
                title={isCollapsed && !mobile ? section.label : undefined}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors"
                style={{
                  backgroundColor: "transparent",
                  color: hasActive ? "#A5D6A7" : "#D1D5DB",
                  justifyContent: isCollapsed && !mobile ? "center" : undefined,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = "#243824";
                  (e.currentTarget as HTMLElement).style.color = "white";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                  (e.currentTarget as HTMLElement).style.color = hasActive ? "#A5D6A7" : "#D1D5DB";
                }}
              >
                <Icon size={16} strokeWidth={1.8} className="flex-shrink-0" />
                {(!isCollapsed || mobile) && (
                  <>
                    <span className="flex-1 text-left truncate">{section.label}</span>
                    <ChevronDown
                      size={14}
                      className="flex-shrink-0 transition-transform duration-200"
                      style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                    />
                  </>
                )}
              </button>

              {(!isCollapsed || mobile) && isOpen && (
                <div className="ml-5 mt-0.5 space-y-0.5 border-l" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
                  {section.children.map((child) => {
                    const ChildIcon = child.icon;
                    const isChildActive = pathname === child.href || pathname.startsWith(child.href + "/");
                    return (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => mobile && setMobileOpen(false)}
                        className="flex items-center gap-2 pl-3 pr-2 py-1.5 rounded-lg text-xs transition-colors ml-1"
                        style={{
                          backgroundColor: isChildActive ? "#2E7D32" : "transparent",
                          color: isChildActive ? "white" : "#9CA3AF",
                        }}
                        onMouseEnter={(e) => {
                          if (!isChildActive) {
                            (e.currentTarget as HTMLElement).style.backgroundColor = "#243824";
                            (e.currentTarget as HTMLElement).style.color = "white";
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!isChildActive) {
                            (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                            (e.currentTarget as HTMLElement).style.color = "#9CA3AF";
                          }
                        }}
                      >
                        <ChildIcon size={13} strokeWidth={1.8} className="flex-shrink-0" />
                        <span className="truncate">{child.label}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="flex-shrink-0 border-t p-2" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
        <button
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors"
          style={{
            color: "#9CA3AF",
            justifyContent: isCollapsed && !mobile ? "center" : undefined,
          }}
          title={isCollapsed && !mobile ? "Déconnexion" : undefined}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(239,68,68,0.15)";
            (e.currentTarget as HTMLElement).style.color = "#FCA5A5";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
            (e.currentTarget as HTMLElement).style.color = "#9CA3AF";
          }}
        >
          <LogOut size={16} strokeWidth={1.8} className="flex-shrink-0" />
          {(!isCollapsed || mobile) && <span>Déconnexion</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className="hidden lg:flex flex-col flex-shrink-0 h-screen sticky top-0 overflow-hidden"
        style={{ width: isCollapsed ? 64 : 240, transition: "width 0.2s ease" }}
      >
        <SidebarContent />
      </aside>

      {/* Mobile toggle button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-40 w-9 h-9 rounded-lg flex items-center justify-center shadow-lg"
        style={{ backgroundColor: "#2E7D32" }}
      >
        <Menu size={18} color="white" />
      </button>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="h-full flex-shrink-0" style={{ width: 240 }}>
            <SidebarContent mobile />
          </div>
          <div
            className="flex-1 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
        </div>
      )}
    </>
  );
}
