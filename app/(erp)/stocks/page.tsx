"use client";

import { useState } from "react";
import Topbar from "../../components/Topbar";
import {
  Plus,
  Package,
  AlertTriangle,
  BarChart2,
  RotateCcw,
  Search,
  Bell,
  ShoppingCart,
} from "lucide-react";

/* ─── KPIs ─────────────────────────────────────────────────────────────────── */
const kpis = [
  { label: "Valeur totale stock", value: "28,7 M XOF", sub: "valorisation FIFO", icon: Package, color: "#2E7D32", bg: "#E8F5E9" },
  { label: "Catégories", value: "4", sub: "agricole · intrants · matières · piscicole", icon: BarChart2, color: "#1565C0", bg: "#E3F2FD" },
  { label: "Alertes rupture", value: "2", sub: "action requise immédiate", icon: AlertTriangle, color: "#B71C1C", bg: "#FFEBEE" },
  { label: "Rotation stock", value: "4,2×/trim", sub: "vs 3,8× trim précédent", icon: RotateCcw, color: "#6A1B9A", bg: "#F3E5F5" },
];

/* ─── Inventaire ────────────────────────────────────────────────────────────── */
const agricoles = [
  { code: "STK-CAC-AA", produit: "Cacao sec Grade AA", localisation: "ENT-001 Zone A", qte: "23 634 kg", unite: "kg", valeur: "25 677 258 XOF", statut: "Normal" as const },
  { code: "STK-ANA-WW", produit: "Anacarde WW240", localisation: "ENT-001 Zone B", qte: "842 kg", unite: "kg", valeur: "1 284 050 XOF", statut: "Normal" as const },
  { code: "STK-POI-TIL", produit: "Tilapia (vivant)", localisation: "PSC-001 Bassin", qte: "1 240 kg", unite: "kg", valeur: "868 000 XOF", statut: "Normal" as const },
];

const intrants = [
  { code: "STK-INT-001", produit: "Super Cupravit OB 50 WP", localisation: "ENT-001 Zone C", qte: "3,2 kg", unite: "kg", valeur: "26 880 XOF", statut: "Bas" as const },
  { code: "STK-INT-002", produit: "Confidor 350 SC", localisation: "ENT-001 Zone C", qte: "2,8 L", unite: "L", valeur: "84 000 XOF", statut: "Normal" as const },
  { code: "STK-INT-003", produit: "Ridomil Gold 48 WP", localisation: "ENT-001 Zone C", qte: "0,8 kg", unite: "kg", valeur: "19 200 XOF", statut: "Normal" as const },
  { code: "STK-INT-004", produit: "KCl 60%", localisation: "ENT-001 Zone D", qte: "2 sacs", unite: "sacs", valeur: "160 000 XOF", statut: "Bas" as const },
];

const matieres = [
  { code: "STK-MAT-001", produit: "Sacs jute 65 kg", localisation: "ENT-001 Zone E", qte: "124 sacs", unite: "unités", valeur: "31 000 XOF", statut: "Normal" as const },
  { code: "STK-MAT-002", produit: "Gasoil (fûts 200L)", localisation: "Hangar matériels", qte: "3 fûts", unite: "fûts", valeur: "516 000 XOF", statut: "Normal" as const },
  { code: "STK-MAT-003", produit: "Huile moteur 15W40 (bidon 5L)", localisation: "Hangar matériels", qte: "6 bidons", unite: "bidons", valeur: "54 000 XOF", statut: "Normal" as const },
];

type Statut = "Normal" | "Bas";

function StatutBadge({ statut }: { statut: Statut }) {
  const cfg = statut === "Bas"
    ? { bg: "#FFEBEE", color: "#B71C1C", label: "🔴 Stock bas" }
    : { bg: "#E8F5E9", color: "#2E7D32", label: "✅ Normal" };
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold whitespace-nowrap"
      style={{ backgroundColor: cfg.bg, color: cfg.color }}>
      {cfg.label}
    </span>
  );
}

function InventaireTable({ titre, rows }: { titre: string; rows: typeof agricoles }) {
  return (
    <div className="mb-4">
      <div className="px-4 py-2 text-xs font-bold uppercase tracking-wide text-gray-500"
        style={{ backgroundColor: "#F0F7F0" }}>
        {titre}
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr style={{ backgroundColor: "#F8FBF8" }}>
            {["Code", "Produit", "Localisation", "Qté", "Unité", "Valeur", "Statut"].map(h => (
              <th key={h} className="text-left px-4 py-2.5 text-xs font-semibold text-gray-500 whitespace-nowrap">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {rows.map(r => (
            <tr key={r.code} className="hover:bg-gray-50 transition-colors">
              <td className="px-4 py-3 text-xs font-mono text-gray-400">{r.code}</td>
              <td className="px-4 py-3 text-xs font-medium text-gray-900 whitespace-nowrap">{r.produit}</td>
              <td className="px-4 py-3 text-xs text-gray-500 whitespace-nowrap">{r.localisation}</td>
              <td className="px-4 py-3 text-xs font-bold text-gray-900 whitespace-nowrap">{r.qte}</td>
              <td className="px-4 py-3 text-xs text-gray-500">{r.unite}</td>
              <td className="px-4 py-3 text-xs text-gray-700 whitespace-nowrap">{r.valeur}</td>
              <td className="px-4 py-3"><StatutBadge statut={r.statut} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ─── Mouvements ────────────────────────────────────────────────────────────── */
type MvtFilter = "Tous" | "Entrées" | "Sorties";

const mouvements = [
  { date: "11/07", type: "Sortie" as const, article: "Cacao Grade AA (BL-008)", qte: "-3 400 kg", valeur: "-3 695 800 XOF", motif: "Export BC", ref: "VNT-2025-009" },
  { date: "08/07", type: "Entrée" as const, article: "Cacao Grade AA (LOT-046)", qte: "+964 kg", valeur: "+884 952 XOF", motif: "Transformation", ref: "LOT-2025-046" },
  { date: "02/07", type: "Sortie" as const, article: "Super Cupravit", qte: "-1,8 kg", valeur: "-15 120 XOF", motif: "Traitement PAR-A1", ref: "PCT-2025-030" },
  { date: "01/07", type: "Sortie" as const, article: "Cacao Grade AA (BL-007)", qte: "-4 000 kg", valeur: "-4 348 000 XOF", motif: "Export BC", ref: "VNT-2025-007/008" },
  { date: "28/06", type: "Entrée" as const, article: "KCl 60% (ACH-2025-020)", qte: "+6 sacs", valeur: "+480 000 XOF", motif: "Achat", ref: "ACH-2025-020" },
  { date: "25/06", type: "Sortie" as const, article: "Gasoil (fût 200L)", qte: "-1 fût", valeur: "-172 000 XOF", motif: "Tracteur PAR-A3", ref: "CSO-2025-018" },
  { date: "22/06", type: "Entrée" as const, article: "Sacs jute 65 kg", qte: "+50 sacs", valeur: "+12 500 XOF", motif: "Achat emballages", ref: "ACH-2025-019" },
  { date: "20/06", type: "Sortie" as const, article: "Confidor 350 SC", qte: "-1,2 L", valeur: "-36 000 XOF", motif: "Traitement PAR-B2", ref: "PCT-2025-027" },
  { date: "18/06", type: "Entrée" as const, article: "Cacao sec Grade AA", qte: "+2 100 kg", valeur: "+2 278 500 XOF", motif: "Récolte séchée", ref: "LOT-2025-043" },
  { date: "15/06", type: "Entrée" as const, article: "Super Cupravit OB 50 WP", qte: "+4 kg", valeur: "+33 600 XOF", motif: "Achat SCPA", ref: "ACH-2025-022" },
  { date: "12/06", type: "Sortie" as const, article: "Ridomil Gold 48 WP", qte: "-1,2 kg", valeur: "-28 800 XOF", motif: "Traitement PAR-C1", ref: "PCT-2025-025" },
  { date: "10/06", type: "Sortie" as const, article: "KCl 60%", qte: "-8 sacs", valeur: "-640 000 XOF", motif: "Fertilisation PAR-B1", ref: "INT-2025-041" },
  { date: "07/06", type: "Entrée" as const, article: "Tilapia (vivant)", qte: "+440 kg", valeur: "+308 000 XOF", motif: "Récolte bassin PSC-001", ref: "PSC-2025-012" },
  { date: "04/06", type: "Sortie" as const, article: "Anacarde WW240", qte: "-500 kg", valeur: "-762 500 XOF", motif: "Export lot Korhogo", ref: "VNT-2025-006" },
  { date: "01/06", type: "Entrée" as const, article: "Cacao Grade AA", qte: "+1 534 kg", valeur: "+1 664 391 XOF", motif: "Transformation lot-039", ref: "LOT-2025-039" },
];

/* données grouped bar chart Entrées vs Sorties 30j */
const barData = [
  { semaine: "S1", entrees: 4126000, sorties: 3695800 },
  { semaine: "S2", entrees: 2841000, sorties: 0 },
  { semaine: "S3", entrees: 548000, sorties: 4286000 },
  { semaine: "S4", entrees: 1997991, sorties: 1466800 },
];
const maxBar = Math.max(...barData.flatMap(d => [d.entrees, d.sorties]));

function MvtBadge({ type }: { type: "Entrée" | "Sortie" }) {
  const cfg = type === "Entrée"
    ? { bg: "#E8F5E9", color: "#2E7D32", label: "↑ Entrée" }
    : { bg: "#FFEBEE", color: "#B71C1C", label: "↓ Sortie" };
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold whitespace-nowrap"
      style={{ backgroundColor: cfg.bg, color: cfg.color }}>
      {cfg.label}
    </span>
  );
}

/* ─── Valorisation ──────────────────────────────────────────────────────────── */
const donutData = [
  { label: "Cacao Grade AA", pct: 89.4, valeur: "25,7M", color: "#1B5E20" },
  { label: "Anacarde WW240", pct: 4.5, valeur: "1,28M", color: "#2E7D32" },
  { label: "Pisciculture", pct: 3.0, valeur: "0,87M", color: "#00897B" },
  { label: "Gasoil + matières", pct: 2.1, valeur: "0,60M", color: "#E65100" },
  { label: "Intrants", pct: 1.0, valeur: "0,29M", color: "#9E9E9E" },
];

function Donut() {
  const cx = 140, cy = 140, r = 90, ri = 52;
  let angle = -Math.PI / 2;
  const slices = donutData.map(d => {
    const a = (d.pct / 100) * 2 * Math.PI;
    const x1 = cx + r * Math.cos(angle), y1 = cy + r * Math.sin(angle);
    const x2 = cx + r * Math.cos(angle + a), y2 = cy + r * Math.sin(angle + a);
    const ix1 = cx + ri * Math.cos(angle), iy1 = cy + ri * Math.sin(angle);
    const ix2 = cx + ri * Math.cos(angle + a), iy2 = cy + ri * Math.sin(angle + a);
    const large = a > Math.PI ? 1 : 0;
    const path = `M${x1},${y1} A${r},${r},0,${large},1,${x2},${y2} L${ix2},${iy2} A${ri},${ri},0,${large},0,${ix1},${iy1} Z`;
    angle += a;
    return { ...d, path };
  });
  return (
    <svg viewBox="0 0 280 280" width={280} height={280} xmlns="http://www.w3.org/2000/svg">
      {slices.map((s, i) => (
        <path key={i} d={s.path} fill={s.color} />
      ))}
      <text x={cx} y={cy - 8} textAnchor="middle" fontSize="13" fill="#374151" fontWeight="600">28,7M</text>
      <text x={cx} y={cy + 10} textAnchor="middle" fontSize="10" fill="#6B7280">XOF total</text>
    </svg>
  );
}

const fifo = [
  { produit: "Cacao AA", qte: "23 634 kg", fifo: "21,3M XOF", marche: "25,7M XOF", plusvalue: "+4,4M XOF", ok: true },
  { produit: "Anacarde WW240", qte: "842 kg", fifo: "1,18M XOF", marche: "1,28M XOF", plusvalue: "+0,10M XOF", ok: true },
];

/* ─── Alertes ───────────────────────────────────────────────────────────────── */
const alertes = [
  {
    produit: "Super Cupravit OB 50 WP",
    stock: "3,2 kg",
    seuil: "5 kg",
    besoin: "4,5 kg (traitement 15/07)",
    deficit: "1,3 kg",
    fournisseur: "Commander SCPA",
  },
  {
    produit: "KCl 60%",
    stock: "2 sacs",
    seuil: "5 sacs",
    besoin: "10 sacs (fertilisation PAR-B1 18/07)",
    deficit: "8 sacs",
    fournisseur: "Commander KCl Distribution",
  },
];

const seuilsTable = [
  { article: "Cacao AA", alerte: "5 000 kg", autoCmd: "3 000 kg", minCmd: "10 000 kg" },
  { article: "Super Cupravit", alerte: "5 kg", autoCmd: "3 kg", minCmd: "8 kg" },
  { article: "KCl 60%", alerte: "5 sacs", autoCmd: "3 sacs", minCmd: "15 sacs" },
];

/* ─── Page ──────────────────────────────────────────────────────────────────── */
const TABS = ["Inventaire", "Mouvements", "Valorisation", "Alertes"] as const;
type Tab = typeof TABS[number];

export default function StocksPage() {
  const [activeTab, setActiveTab] = useState<Tab>("Inventaire");
  const [mvtFilter, setMvtFilter] = useState<MvtFilter>("Tous");
  const [search, setSearch] = useState("");

  const filteredMvts = mouvements.filter(m => {
    if (mvtFilter === "Entrées" && m.type !== "Entrée") return false;
    if (mvtFilter === "Sorties" && m.type !== "Sortie") return false;
    if (search && !m.article.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div>
      <Topbar title="Gestion des Stocks" breadcrumb={["Logistique", "Stocks"]} />

      <div className="p-6 space-y-6">
        {/* Header actions */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Gestion des Stocks</h1>
            <p className="text-sm text-gray-500 mt-0.5">Inventaire en temps réel — Cacao, Anacarde, Intrants, Matières</p>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-gray-200 text-xs font-medium text-gray-700 hover:bg-gray-50">
              <BarChart2 size={14} /> Valorisation
            </button>
            <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium text-white"
              style={{ backgroundColor: "#2E7D32" }}>
              <Plus size={14} /> Nouveau mouvement
            </button>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {kpis.map(k => {
            const Icon = k.icon;
            return (
              <div key={k.label} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
                  style={{ backgroundColor: k.bg }}>
                  <Icon size={18} color={k.color} strokeWidth={1.8} />
                </div>
                <div className="text-xl font-bold text-gray-900 leading-tight">{k.value}</div>
                <div className="text-xs font-medium text-gray-700 mt-0.5">{k.label}</div>
                <div className="text-xs text-gray-400">{k.sub}</div>
              </div>
            );
          })}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
          {/* Tab bar */}
          <div className="flex border-b border-gray-100 overflow-x-auto">
            {TABS.map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className="px-5 py-3.5 text-sm font-medium whitespace-nowrap transition-colors"
                style={activeTab === tab
                  ? { color: "#2E7D32", borderBottom: "2px solid #2E7D32" }
                  : { color: "#6B7280", borderBottom: "2px solid transparent" }}>
                {tab === "Alertes" ? (
                  <span className="flex items-center gap-1.5">
                    {tab}
                    <span className="w-4 h-4 rounded-full text-[10px] font-bold text-white flex items-center justify-center"
                      style={{ backgroundColor: "#B71C1C" }}>2</span>
                  </span>
                ) : tab}
              </button>
            ))}
          </div>

          {/* ── Inventaire ── */}
          {activeTab === "Inventaire" && (
            <div className="overflow-x-auto">
              <InventaireTable titre="Produits agricoles" rows={agricoles} />
              <InventaireTable titre="Intrants phytosanitaires" rows={intrants} />
              <InventaireTable titre="Consommables et matières" rows={matieres} />
              <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100"
                style={{ backgroundColor: "#F0F7F0" }}>
                <span className="text-sm font-bold text-gray-700">TOTAL STOCKS</span>
                <span className="text-base font-bold" style={{ color: "#1B5E20" }}>28 720 388 XOF</span>
              </div>
            </div>
          )}

          {/* ── Mouvements ── */}
          {activeTab === "Mouvements" && (
            <div className="p-5 space-y-5">
              {/* Filtres */}
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex rounded-xl border border-gray-200 overflow-hidden">
                  {(["Tous", "Entrées", "Sorties"] as MvtFilter[]).map(f => (
                    <button key={f} onClick={() => setMvtFilter(f)}
                      className="px-3 py-1.5 text-xs font-medium transition-colors"
                      style={mvtFilter === f
                        ? { backgroundColor: "#2E7D32", color: "#fff" }
                        : { backgroundColor: "#fff", color: "#6B7280" }}>
                      {f}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-1.5 bg-white">
                  <Search size={13} className="text-gray-400" />
                  <input
                    className="text-xs outline-none w-36 placeholder:text-gray-400"
                    placeholder="Rechercher un article…"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                  />
                </div>
              </div>

              {/* Grouped bar chart Entrées vs Sorties */}
              <div className="rounded-xl border border-gray-100 p-4 overflow-x-auto">
                <div className="text-xs font-semibold text-gray-700 mb-3">Entrées vs Sorties — 30 derniers jours (XOF)</div>
                <svg viewBox="0 0 640 200" width="100%" style={{ minWidth: 400 }} xmlns="http://www.w3.org/2000/svg">
                  {/* grille */}
                  {[0, 1, 2, 3, 4].map(i => {
                    const y = 20 + i * 36;
                    return <line key={i} x1="60" y1={y} x2="620" y2={y} stroke="#E5E7EB" strokeWidth="1" />;
                  })}
                  {/* barres */}
                  {barData.map((d, gi) => {
                    const groupW = 130, barW = 38, gap = 8;
                    const gx = 60 + gi * groupW + 20;
                    const he = (d.entrees / maxBar) * 144;
                    const hs = (d.sorties / maxBar) * 144;
                    return (
                      <g key={gi}>
                        {/* entrée */}
                        <rect x={gx} y={164 - he} width={barW} height={he} fill="#2E7D32" rx="3" />
                        {/* sortie */}
                        <rect x={gx + barW + gap} y={164 - hs} width={barW} height={hs} fill="#E65100" rx="3" />
                        {/* label semaine */}
                        <text x={gx + barW + gap / 2} y="180" textAnchor="middle" fontSize="10" fill="#6B7280">{d.semaine}</text>
                        {/* valeur entrée */}
                        {he > 10 && <text x={gx + barW / 2} y={158 - he} textAnchor="middle" fontSize="8" fill="#1B5E20">{(d.entrees / 1000000).toFixed(1)}M</text>}
                        {/* valeur sortie */}
                        {hs > 10 && <text x={gx + barW + gap + barW / 2} y={158 - hs} textAnchor="middle" fontSize="8" fill="#B71C1C">{(d.sorties / 1000000).toFixed(1)}M</text>}
                      </g>
                    );
                  })}
                  {/* légende */}
                  <rect x="440" y="8" width="10" height="10" fill="#2E7D32" rx="2" />
                  <text x="454" y="17" fontSize="9" fill="#374151">Entrées</text>
                  <rect x="500" y="8" width="10" height="10" fill="#E65100" rx="2" />
                  <text x="514" y="17" fontSize="9" fill="#374151">Sorties</text>
                </svg>
              </div>

              {/* Tableau mouvements */}
              <div className="overflow-x-auto rounded-xl border border-gray-100">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ backgroundColor: "#F8FBF8" }}>
                      {["Date", "Type", "Article", "Qté", "Valeur", "Motif", "Référence"].map(h => (
                        <th key={h} className="text-left px-4 py-2.5 text-xs font-semibold text-gray-500 whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {filteredMvts.map((m, i) => (
                      <tr key={i} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-2.5 text-xs font-mono text-gray-400 whitespace-nowrap">{m.date}</td>
                        <td className="px-4 py-2.5"><MvtBadge type={m.type} /></td>
                        <td className="px-4 py-2.5 text-xs font-medium text-gray-800 whitespace-nowrap">{m.article}</td>
                        <td className="px-4 py-2.5 text-xs font-bold whitespace-nowrap"
                          style={{ color: m.type === "Entrée" ? "#2E7D32" : "#B71C1C" }}>{m.qte}</td>
                        <td className="px-4 py-2.5 text-xs whitespace-nowrap"
                          style={{ color: m.type === "Entrée" ? "#2E7D32" : "#B71C1C" }}>{m.valeur}</td>
                        <td className="px-4 py-2.5 text-xs text-gray-600 whitespace-nowrap">{m.motif}</td>
                        <td className="px-4 py-2.5 text-xs font-mono text-gray-400 whitespace-nowrap">{m.ref}</td>
                      </tr>
                    ))}
                    {filteredMvts.length === 0 && (
                      <tr><td colSpan={7} className="px-4 py-8 text-center text-xs text-gray-400">Aucun mouvement trouvé</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── Valorisation ── */}
          {activeTab === "Valorisation" && (
            <div className="p-5 space-y-6">
              <div className="flex flex-col md:flex-row items-start gap-8">
                {/* Donut */}
                <div className="flex flex-col items-center gap-4">
                  <div className="text-xs font-semibold text-gray-700">Répartition de la valeur stock par catégorie</div>
                  <Donut />
                  <div className="space-y-1.5">
                    {donutData.map(d => (
                      <div key={d.label} className="flex items-center gap-2 text-xs text-gray-700">
                        <span className="w-3 h-3 rounded-sm shrink-0" style={{ backgroundColor: d.color }} />
                        <span className="font-medium">{d.label}</span>
                        <span className="text-gray-400 ml-auto pl-4">{d.pct}% · {d.valeur} XOF</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tableau FIFO */}
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold text-gray-700 mb-3">Valorisation FIFO vs cours marché</div>
                  <div className="overflow-x-auto rounded-xl border border-gray-100">
                    <table className="w-full text-sm">
                      <thead>
                        <tr style={{ backgroundColor: "#F8FBF8" }}>
                          {["Produit", "Qté", "Valeur FIFO", "Cours marché", "Plus-value latente"].map(h => (
                            <th key={h} className="text-left px-4 py-2.5 text-xs font-semibold text-gray-500 whitespace-nowrap">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {fifo.map(row => (
                          <tr key={row.produit} className="hover:bg-gray-50 transition-colors">
                            <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap text-xs">{row.produit}</td>
                            <td className="px-4 py-3 text-xs text-gray-600 whitespace-nowrap">{row.qte}</td>
                            <td className="px-4 py-3 text-xs font-medium text-gray-800 whitespace-nowrap">{row.fifo}</td>
                            <td className="px-4 py-3 text-xs font-medium whitespace-nowrap" style={{ color: "#1B5E20" }}>{row.marche}</td>
                            <td className="px-4 py-3">
                              <span className="text-xs font-bold" style={{ color: "#2E7D32" }}>{row.plusvalue} ✅</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-4 rounded-xl p-4 text-xs text-gray-500" style={{ backgroundColor: "#F8FBF8", border: "1px solid #E5E7EB" }}>
                    <strong className="text-gray-700">Méthode FIFO :</strong> Premier entré, premier sorti. La plus-value latente représente
                    la différence entre la valeur au cours du marché actuel et le coût d&apos;acquisition FIFO. Non réalisée tant que le stock n&apos;est pas vendu.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── Alertes ── */}
          {activeTab === "Alertes" && (
            <div className="p-5 space-y-6">
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                <Bell size={15} style={{ color: "#B71C1C" }} />
                2 alertes critiques — action requise
              </div>

              <div className="space-y-4">
                {alertes.map((a, i) => (
                  <div key={i} className="rounded-xl border p-4 space-y-3"
                    style={{ borderColor: "#FFCDD2", backgroundColor: "#FFEBEE" }}>
                    <div className="flex items-start justify-between gap-3 flex-wrap">
                      <div className="flex items-center gap-2">
                        <AlertTriangle size={16} color="#B71C1C" />
                        <span className="text-sm font-bold text-red-800">{a.produit}</span>
                      </div>
                      <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-white shrink-0"
                        style={{ backgroundColor: "#2E7D32" }}>
                        <ShoppingCart size={12} /> {a.fournisseur}
                      </button>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                      <div>
                        <div className="text-gray-500">Stock actuel</div>
                        <div className="font-bold text-red-700">{a.stock}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">Seuil alerte</div>
                        <div className="font-semibold text-gray-700">{a.seuil}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">Besoin imminent</div>
                        <div className="font-semibold text-gray-700">{a.besoin}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">Déficit</div>
                        <div className="font-bold text-red-700">{a.deficit}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Paramétrage seuils */}
              <div>
                <div className="text-xs font-semibold text-gray-700 mb-3">Paramétrage des seuils</div>
                <div className="overflow-x-auto rounded-xl border border-gray-100">
                  <table className="w-full text-sm">
                    <thead>
                      <tr style={{ backgroundColor: "#F8FBF8" }}>
                        {["Article", "Seuil alerte", "Seuil commande auto", "Qté min commande"].map(h => (
                          <th key={h} className="text-left px-4 py-2.5 text-xs font-semibold text-gray-500 whitespace-nowrap">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {seuilsTable.map(row => (
                        <tr key={row.article} className="hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-3 text-xs font-medium text-gray-900">{row.article}</td>
                          <td className="px-4 py-3 text-xs text-gray-700">{row.alerte}</td>
                          <td className="px-4 py-3 text-xs text-gray-700">{row.autoCmd}</td>
                          <td className="px-4 py-3 text-xs font-semibold" style={{ color: "#2E7D32" }}>{row.minCmd}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
