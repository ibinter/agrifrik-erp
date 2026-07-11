"use client";

import { useState } from "react";
import Topbar from "../../components/Topbar";
import {
  BarChart3,
  FileText,
  Download,
  Star,
  Clock,
  ChevronDown,
  ChevronUp,
  Search,
  RefreshCw,
  Send,
  Calendar,
  Leaf,
  Package,
  TrendingUp,
  Users,
  Globe,
  Bot,
  Layers,
  Eye,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Tab = "catalogue" | "recents" | "favoris" | "generer";

interface CatalogSection {
  icon: React.ReactNode;
  title: string;
  count: number;
  rapports: string[];
}

interface RecentItem {
  titre: string;
  date: string;
  par: string;
  duree: string;
  format: string;
  taille: string;
}

interface FavCard {
  titre: string;
  categorie: string;
  icon: React.ReactNode;
}

// ─── KPIs ─────────────────────────────────────────────────────────────────────

const KPIS = [
  { label: "Rapports disponibles", value: "42", icon: <FileText size={18} className="text-[#2E7D32]" /> },
  { label: "Générés ce mois", value: "18", icon: <BarChart3 size={18} className="text-blue-600" /> },
  { label: "Planifiés actifs", value: "12", icon: <Send size={18} className="text-orange-500" /> },
  { label: "Dernière génération", value: "il y a 2h", icon: <Clock size={18} className="text-gray-500" /> },
];

// ─── Catalogue ────────────────────────────────────────────────────────────────

const CATALOGUE: CatalogSection[] = [
  {
    icon: <BarChart3 size={16} className="text-green-700" />,
    title: "Production & Cultures",
    count: 8,
    rapports: [
      "Bilan de campagne cacao",
      "Suivi des parcelles",
      "État des cultures",
      "Historique récoltes",
      "Plan cultural Gantt",
      "Registre phytos",
      "Rapport pépinière",
      "Analyse rendements",
    ],
  },
  {
    icon: <Package size={16} className="text-blue-700" />,
    title: "Stocks & Logistique",
    count: 6,
    rapports: [
      "État des stocks consolidé",
      "Mouvements de stocks",
      "Valorisation CMUP",
      "Parc véhicules",
      "Planning transport",
      "Consommation carburant",
    ],
  },
  {
    icon: <TrendingUp size={16} className="text-orange-600" />,
    title: "Commerce & Export",
    count: 7,
    rapports: [
      "Bilan commercial mensuel",
      "Top clients CA",
      "Factures impayées",
      "Suivi conteneurs export",
      "Rapport qualité lots",
      "Traçabilité complète lot",
      "Devis→Facture entonnoir",
    ],
  },
  {
    icon: <BarChart3 size={16} className="text-yellow-600" />,
    title: "Finance",
    count: 8,
    rapports: [
      "Compte de résultat",
      "Bilan SYSCOHADA",
      "Balance générale",
      "Flux de trésorerie",
      "Suivi budgétaire",
      "Prévisions S2",
      "Rapport bailleurs",
      "Amortissements",
    ],
  },
  {
    icon: <Users size={16} className="text-blue-600" />,
    title: "RH & Social",
    count: 5,
    rapports: [
      "Masse salariale",
      "Effectifs & turnover",
      "Congés & absences",
      "Évaluations annuelles",
      "Rapport coopérative",
    ],
  },
  {
    icon: <Leaf size={16} className="text-green-600" />,
    title: "RSE & Conformité",
    count: 4,
    rapports: [
      "Score RSE",
      "Indicateurs ODD",
      "Rapport RA pré-audit",
      "Bilan carbone",
    ],
  },
  {
    icon: <Bot size={16} className="text-purple-600" />,
    title: "IA & Météo",
    count: 2,
    rapports: [
      "Recommandations IA du mois",
      "Prévisions météo saison des pluies",
    ],
  },
  {
    icon: <Layers size={16} className="text-gray-600" />,
    title: "Personnalisés",
    count: 2,
    rapports: [
      "Tableau de bord direction",
      "Rapport terrain hebdo",
    ],
  },
];

// ─── Récents ──────────────────────────────────────────────────────────────────

const RECENTS: RecentItem[] = [
  { titre: "Récap. production quotidien", date: "11/07 06:00", par: "Automatique", duree: "2s", format: "PDF", taille: "84 KB" },
  { titre: "Cours cacao matinal", date: "11/07 07:00", par: "Automatique", duree: "1s", format: "Email", taille: "—" },
  { titre: "Bilan trésorerie Juin 2025", date: "05/07 08:00", par: "Jean-Baptiste K.", duree: "8s", format: "PDF", taille: "420 KB" },
  { titre: "État stocks consolidé", date: "04/07 14:32", par: "Adjoua M.", duree: "5s", format: "Excel", taille: "182 KB" },
  { titre: "Rapport RA pré-audit S1", date: "03/07 10:15", par: "Ibrahim S.", duree: "12s", format: "PDF", taille: "1,2 MB" },
  { titre: "Compte de résultat S1 2025", date: "30/06 17:45", par: "Jean-Baptiste K.", duree: "15s", format: "PDF", taille: "680 KB" },
  { titre: "Masse salariale Juin", date: "30/06 08:00", par: "Automatique", duree: "4s", format: "PDF", taille: "320 KB" },
  { titre: "Top clients CA S1", date: "28/06 11:20", par: "Admin", duree: "6s", format: "PDF+Excel", taille: "240 KB" },
  { titre: "Mouvements stocks semaine 26", date: "27/06 18:00", par: "Automatique", duree: "3s", format: "PDF", taille: "180 KB" },
  { titre: "Rapport coopérative Mai", date: "25/06 09:00", par: "Mariam K.", duree: "10s", format: "PDF", taille: "560 KB" },
];

// ─── Favoris ─────────────────────────────────────────────────────────────────

const FAVORIS: FavCard[] = [
  { titre: "Compte de résultat", categorie: "Finance", icon: <BarChart3 size={22} className="text-yellow-600" /> },
  { titre: "Bilan commercial mensuel", categorie: "Commerce", icon: <TrendingUp size={22} className="text-orange-600" /> },
  { titre: "État des stocks consolidé", categorie: "Logistique", icon: <Package size={22} className="text-blue-600" /> },
  { titre: "Bilan de campagne cacao", categorie: "Production", icon: <Leaf size={22} className="text-green-600" /> },
  { titre: "Rapport RA pré-audit", categorie: "RSE", icon: <Globe size={22} className="text-teal-600" /> },
  { titre: "Flux de trésorerie", categorie: "Finance", icon: <BarChart3 size={22} className="text-purple-600" /> },
];

const ALL_RAPPORTS = [
  "Compte de résultat", "Bilan de campagne cacao", "État des stocks consolidé",
  "Bilan commercial mensuel", "Flux de trésorerie", "Masse salariale",
  "Rapport RA pré-audit", "Balance générale", "Top clients CA",
  "Suivi des parcelles", "Rapport coopérative", "Score RSE",
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function RapportsPage() {
  const [tab, setTab] = useState<Tab>("catalogue");
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    "Production & Cultures": true,
  });
  const [catSearch, setCatSearch] = useState("");
  const [selectedRapport, setSelectedRapport] = useState("Compte de résultat");
  const [periode, setPeriode] = useState("S1 2025");
  const [format, setFormat] = useState("PDF");
  const [perimetre, setPerimetre] = useState("Toutes exploitations");
  const [langue, setLangue] = useState("Français");

  function toggleSection(title: string) {
    setOpenSections((prev) => ({ ...prev, [title]: !prev[title] }));
  }

  const TABS: { key: Tab; label: string }[] = [
    { key: "catalogue", label: "Catalogue" },
    { key: "recents", label: "Récents" },
    { key: "favoris", label: "Favoris" },
    { key: "generer", label: "Générer" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Topbar title="Rapports & Business Intelligence" breadcrumb={["Rapports & BI", "Rapports"]} />

      <main className="p-4 sm:p-6 max-w-6xl mx-auto space-y-5 pb-14">

        {/* KPIs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {KPIS.map((k) => (
            <div key={k.label} className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">{k.label}</span>
                {k.icon}
              </div>
              <span className="text-xl font-bold text-gray-900">{k.value}</span>
            </div>
          ))}
        </div>

        {/* Onglets */}
        <div className="flex gap-1 bg-white border border-gray-100 rounded-2xl p-1 shadow-sm">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex-1 text-xs font-semibold py-2 px-2 rounded-xl transition-colors ${
                tab === t.key ? "bg-[#2E7D32] text-white" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* ── Catalogue ── */}
        {tab === "catalogue" && (
          <div className="space-y-3">
            {/* Recherche */}
            <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-2 shadow-sm">
              <Search size={14} className="text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un rapport..."
                value={catSearch}
                onChange={(e) => setCatSearch(e.target.value)}
                className="flex-1 text-sm bg-transparent outline-none placeholder-gray-400"
              />
            </div>

            {/* Sections accordéon */}
            {CATALOGUE.map((section) => {
              const isOpen = !!openSections[section.title];
              const filtered = catSearch
                ? section.rapports.filter((r) => r.toLowerCase().includes(catSearch.toLowerCase()))
                : section.rapports;
              if (catSearch && filtered.length === 0) return null;
              return (
                <div key={section.title} className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
                  <button
                    onClick={() => toggleSection(section.title)}
                    className="w-full flex items-center gap-3 px-5 py-3.5 hover:bg-gray-50 transition-colors text-left"
                  >
                    <div className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                      {section.icon}
                    </div>
                    <span className="flex-1 text-sm font-semibold text-gray-800">{section.title}</span>
                    <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{section.count} rapports</span>
                    {isOpen ? <ChevronUp size={15} className="text-gray-400" /> : <ChevronDown size={15} className="text-gray-400" />}
                  </button>

                  {(isOpen || catSearch) && filtered.length > 0 && (
                    <div className="border-t border-gray-50 px-5 py-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                      {filtered.map((r) => (
                        <div
                          key={r}
                          className="flex items-center justify-between gap-2 bg-gray-50 hover:bg-green-50 rounded-xl px-3 py-2 group cursor-pointer transition-colors"
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <FileText size={12} className="text-gray-400 shrink-0 group-hover:text-[#2E7D32]" />
                            <span className="text-xs text-gray-700 truncate group-hover:text-[#2E7D32]">{r}</span>
                          </div>
                          <button className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Eye size={13} className="text-[#2E7D32]" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* ── Récents ── */}
        {tab === "recents" && (
          <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
            <div className="px-5 py-3 border-b border-gray-50 bg-[#F8FBF8]">
              <p className="text-sm font-bold text-gray-700">10 derniers rapports générés</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[700px]">
                <thead>
                  <tr className="border-b border-gray-100">
                    {["Rapport", "Généré le", "Par", "Durée", "Format", "Taille", "Actions"].map((h) => (
                      <th key={h} className="text-left px-4 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {RECENTS.map((r, i) => (
                    <tr key={i} className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 font-medium text-gray-800 whitespace-nowrap">{r.titre}</td>
                      <td className="px-4 py-3 text-xs text-gray-500 whitespace-nowrap">
                        <span className="flex items-center gap-1">
                          <Calendar size={11} className="text-gray-400" />
                          {r.date}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-600 whitespace-nowrap">{r.par}</td>
                      <td className="px-4 py-3 text-xs text-gray-500 whitespace-nowrap">
                        <span className="flex items-center gap-1">
                          <Clock size={11} className="text-gray-400" />
                          {r.duree}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="text-xs font-mono bg-gray-100 text-gray-600 px-2 py-0.5 rounded">{r.format}</span>
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-500 whitespace-nowrap">{r.taille}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          {r.format !== "Email" && (
                            <>
                              <button className="text-[11px] font-semibold text-[#2E7D32] border border-[#2E7D32]/25 bg-green-50 hover:bg-green-100 px-2 py-1 rounded-lg transition-colors">
                                Voir
                              </button>
                              <button className="text-[11px] font-semibold text-gray-600 border border-gray-200 bg-gray-50 hover:bg-gray-100 px-2 py-1 rounded-lg transition-colors flex items-center gap-1">
                                <Download size={10} />
                                DL
                              </button>
                            </>
                          )}
                          {r.format === "Email" && (
                            <button className="text-[11px] font-semibold text-blue-600 border border-blue-200 bg-blue-50 hover:bg-blue-100 px-2 py-1 rounded-lg transition-colors">
                              Revoir
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── Favoris ── */}
        {tab === "favoris" && (
          <div className="space-y-4">
            <p className="text-sm text-gray-500">6 rapports épinglés</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {FAVORIS.map((fav) => (
                <div key={fav.titre} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-3">
                  <div className="flex items-start justify-between">
                    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center">{fav.icon}</div>
                    <Star size={15} className="text-yellow-400 fill-yellow-400 mt-0.5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-800">{fav.titre}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{fav.categorie}</p>
                  </div>
                  <div className="flex gap-2 mt-auto">
                    <button className="flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold bg-[#2E7D32] text-white py-1.5 rounded-xl hover:bg-[#1B5E20] transition-colors">
                      <RefreshCw size={11} />
                      Générer
                    </button>
                    <button className="flex items-center gap-1 text-xs font-semibold border border-gray-200 text-gray-600 px-3 py-1.5 rounded-xl hover:bg-gray-50 transition-colors">
                      <Download size={11} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Générer ── */}
        {tab === "generer" && (
          <div className="space-y-5">
            {/* Formulaire */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm space-y-4">
              <p className="text-sm font-bold text-gray-800">Génération rapide</p>

              {/* Rapport */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-600">Rapport</label>
                <div className="relative">
                  <select
                    value={selectedRapport}
                    onChange={(e) => setSelectedRapport(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-800 bg-white appearance-none pr-8 focus:outline-none focus:border-[#2E7D32]"
                  >
                    {ALL_RAPPORTS.map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Période */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-600">Période</label>
                  <div className="relative">
                    <select
                      value={periode}
                      onChange={(e) => setPeriode(e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-800 bg-white appearance-none pr-8 focus:outline-none focus:border-[#2E7D32]"
                    >
                      {["S1 2025", "S2 2025", "Mois", "Trimestre", "Personnalisée"].map((p) => (
                        <option key={p}>{p}</option>
                      ))}
                    </select>
                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-600">Du</label>
                  <input type="date" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-[#2E7D32]" defaultValue="2025-01-01" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-600">Au</label>
                  <input type="date" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-[#2E7D32]" defaultValue="2025-06-30" />
                </div>
              </div>

              {/* Format */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-600">Format</label>
                <div className="flex flex-wrap gap-3">
                  {["PDF", "Excel", "Word", "CSV"].map((f) => (
                    <label key={f} className="flex items-center gap-1.5 text-sm text-gray-700 cursor-pointer">
                      <input
                        type="radio"
                        name="format"
                        value={f}
                        checked={format === f}
                        onChange={() => setFormat(f)}
                        className="accent-[#2E7D32]"
                      />
                      {f}
                    </label>
                  ))}
                </div>
              </div>

              {/* Périmètre + Langue */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-600">Périmètre</label>
                  <div className="relative">
                    <select
                      value={perimetre}
                      onChange={(e) => setPerimetre(e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-800 bg-white appearance-none pr-8 focus:outline-none focus:border-[#2E7D32]"
                    >
                      {["Toutes exploitations", "Exploit. A", "Exploit. B", "Exploit. C"].map((p) => (
                        <option key={p}>{p}</option>
                      ))}
                    </select>
                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-600">Langue</label>
                  <div className="flex gap-4 pt-2">
                    {["Français", "Anglais"].map((l) => (
                      <label key={l} className="flex items-center gap-1.5 text-sm text-gray-700 cursor-pointer">
                        <input
                          type="radio"
                          name="langue"
                          value={l}
                          checked={langue === l}
                          onChange={() => setLangue(l)}
                          className="accent-[#2E7D32]"
                        />
                        {l}
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Boutons */}
              <div className="flex flex-wrap gap-2 pt-1">
                <button className="text-xs font-semibold border border-[#2E7D32] text-[#2E7D32] px-4 py-2 rounded-xl hover:bg-green-50 transition-colors flex items-center gap-1.5">
                  <Eye size={13} />
                  Prévisualiser
                </button>
                <button className="text-xs font-semibold bg-[#2E7D32] text-white px-4 py-2 rounded-xl hover:bg-[#1B5E20] transition-colors flex items-center gap-1.5">
                  <Download size={13} />
                  Générer &amp; Télécharger
                </button>
                <button className="text-xs font-semibold border border-gray-200 text-gray-600 px-4 py-2 rounded-xl hover:bg-gray-50 transition-colors flex items-center gap-1.5">
                  <Send size={13} />
                  Planifier l&apos;envoi
                </button>
              </div>
            </div>

            {/* Rapport en vedette */}
            <div className="rounded-2xl border border-[#2E7D32]/20 bg-green-50 p-5 shadow-sm">
              <div className="flex items-start gap-4">
                {/* Icône PDF */}
                <div className="w-14 h-16 rounded-xl bg-white border border-red-200 flex flex-col items-center justify-center gap-0.5 shadow-sm shrink-0">
                  <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                    <FileText size={16} className="text-red-600" />
                  </div>
                  <span className="text-[9px] font-bold text-red-500">PDF</span>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 flex-wrap">
                    <div>
                      <p className="text-xs font-bold text-[#1B5E20] uppercase tracking-wide">Rapport en vedette — S1 2025</p>
                      <p className="text-sm font-bold text-gray-900 mt-0.5">Compte de résultat consolidé</p>
                    </div>
                    <button className="text-xs font-semibold bg-[#2E7D32] text-white px-3 py-1.5 rounded-xl hover:bg-[#1B5E20] transition-colors flex items-center gap-1.5 shrink-0">
                      <Download size={12} />
                      Télécharger maintenant
                    </button>
                  </div>

                  {/* KPIs du rapport */}
                  <div className="flex flex-wrap gap-3 mt-3">
                    {[
                      { label: "CA", value: "156 M XOF" },
                      { label: "Résultat net", value: "22,8 M XOF" },
                      { label: "EBITDA", value: "38,6 M XOF" },
                    ].map((k) => (
                      <div key={k.label} className="bg-white rounded-xl px-3 py-2 border border-green-100">
                        <p className="text-[10px] text-gray-400 font-medium">{k.label}</p>
                        <p className="text-sm font-bold text-gray-900">{k.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
