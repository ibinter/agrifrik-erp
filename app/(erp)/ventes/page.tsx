"use client";

import { useState } from "react";
import Topbar from "../../components/Topbar";
import {
  TrendingUp,
  ShoppingCart,
  Users,
  Package,
  Target,
  CheckCircle,
  Clock,
  Truck,
  Star,
  ChevronRight,
  Send,
  MessageSquare,
} from "lucide-react";

// ─── KPIs ──────────────────────────────────────────────────────────────────────
const kpis = [
  {
    label: "CA 2025 YTD",
    value: "145,2 M",
    unit: "XOF",
    sub: "Objectif annuel : 280 M XOF",
    progress: 51.9,
    icon: TrendingUp,
    color: "#2E7D32",
    bg: "#E8F5E9",
  },
  {
    label: "Commandes en cours",
    value: "3",
    unit: "",
    sub: "Valeur : 114,7 M XOF",
    progress: null,
    icon: ShoppingCart,
    color: "#1565C0",
    bg: "#E3F2FD",
  },
  {
    label: "Nouveaux clients 2025",
    value: "2",
    unit: "",
    sub: "JDE + Maison Jacques-Vabre",
    progress: null,
    icon: Users,
    color: "#6A1B9A",
    bg: "#F3E5F5",
  },
  {
    label: "Marge brute moyenne",
    value: "56%",
    unit: "",
    sub: "Cible : 55%+ ✅",
    progress: null,
    icon: Target,
    color: "#E65100",
    bg: "#FFF3E0",
  },
];

// ─── Données CA mensuel ─────────────────────────────────────────────────────────
const caData = [
  { mois: "Jan", v2024: 38.4, v2025: 42.4 },
  { mois: "Fév", v2024: 16.2, v2025: 18.2 },
  { mois: "Mar", v2024: 22.8, v2025: 28.6 },
  { mois: "Avr", v2024: 26.4, v2025: 28.8 },
  { mois: "Mai", v2024: 24.2, v2025: 31.6 },
  { mois: "Jun", v2024: 34.8, v2025: 38.6 }, // dernier mois réalisé 2025
  { mois: "Jul", v2024: 28.4, v2025: null },
  { mois: "Aoû", v2024: 32.1, v2025: null },
  { mois: "Sep", v2024: 38.6, v2025: null },
  { mois: "Oct", v2024: 44.2, v2025: null },
  { mois: "Nov", v2024: 52.8, v2025: null },
  { mois: "Déc", v2024: 48.4, v2025: null },
];

// ─── Top clients S1 2025 ───────────────────────────────────────────────────────
const topClients = [
  { client: "Barry Callebaut", pays: "CH/CI", ca: "46,1 M", produits: "Cacao AA", pct: 31.7, trend: "↑ +8%", up: true },
  { client: "Cargill", pays: "NL", ca: "35,2 M", produits: "Cacao AA", pct: 24.2, trend: "→ stable", up: null },
  { client: "Olam International", pays: "SG", ca: "33,4 M", produits: "Cacao AA+A", pct: 23.0, trend: "↑ +12%", up: true },
  { client: "Nestlé CI", pays: "CI", ca: "18,6 M", produits: "Anacarde", pct: 12.8, trend: "↑ +5%", up: true },
  { client: "Touton SA", pays: "FR", ca: "11,9 M", produits: "Cacao A", pct: 8.2, trend: "↓ -3%", up: false },
];

// ─── Performance produits ──────────────────────────────────────────────────────
const produitsPerf = [
  { produit: "Cacao Grade AA", volume: "62,4 t", ca: "68,6 M", prix: "1 100 XOF/kg", marge: "61%" },
  { produit: "Cacao Grade A", volume: "28,6 t", ca: "29,7 M", prix: "1 040 XOF/kg", marge: "54%" },
  { produit: "Anacarde WW240", volume: "28,4 t", ca: "19,3 M", prix: "680 XOF/kg", marge: "48%" },
  { produit: "Anacarde RW180", volume: "12,8 t", ca: "7,6 M", prix: "594 XOF/kg", marge: "42%" },
  { produit: "Vivrières (maïs/riz)", volume: "—", ca: "3,8 M", prix: "Variable", marge: "35%" },
];

// ─── Opportunités pipeline ─────────────────────────────────────────────────────
const opportunites = [
  {
    id: "OPP-001",
    title: "Barry Callebaut — Contrat annuel 2025-2026",
    produit: "Cacao AA — 120 t",
    valeur: "132 M XOF",
    proba: 85,
    ponderee: "112,2 M",
    contact: "M. Laurent Petit (acheteur senior BC)",
    etape: "Envoi échantillons + visite site 25/07",
    stade: "Négociation",
  },
  {
    id: "OPP-002",
    title: "Jacobs Douwe Egberts (nouveau client)",
    produit: "Cacao AA premium — 20 t",
    valeur: "24 M XOF",
    proba: 60,
    ponderee: "14,4 M",
    contact: "Via Rainforest Alliance network",
    etape: "Validation qualité échantillon DEG-2025-048",
    stade: "Négociation",
  },
  {
    id: "OPP-003",
    title: "Ferrero Import",
    produit: "Cacao bio AA (conversion AB 2026) — 10 t",
    valeur: "18 M XOF",
    proba: 40,
    ponderee: "7,2 M",
    contact: "En attente certification AB Jan 2026",
    etape: "Attente certification AB",
    stade: "Négociation",
  },
];

// ─── Clients complets ──────────────────────────────────────────────────────────
const clients = [
  { client: "Barry Callebaut", pays: "Suisse/CI", categorie: "Chocolatier", depuis: "Jan 2020", ca2025: "46,1 M", ca2024: "42,6 M", evol: "↑ +8%", up: true, incoterm: "FOB San-Pédro", paiement: "30j net" },
  { client: "Cargill Int.", pays: "Pays-Bas", categorie: "Négociant", depuis: "Mar 2021", ca2025: "35,2 M", ca2024: "35,2 M", evol: "→ 0%", up: null, incoterm: "FOB", paiement: "30j net" },
  { client: "Olam International", pays: "Singapour", categorie: "Négociant", depuis: "Jun 2021", ca2025: "33,4 M", ca2024: "29,8 M", evol: "↑ +12%", up: true, incoterm: "EXW Soubré", paiement: "21j net" },
  { client: "Nestlé CI", pays: "Côte d'Ivoire", categorie: "Transformation", depuis: "Jan 2022", ca2025: "18,6 M", ca2024: "17,7 M", evol: "↑ +5%", up: true, incoterm: "EXW", paiement: "Comptant" },
  { client: "Touton SA", pays: "France", categorie: "Négoce", depuis: "Mar 2022", ca2025: "11,9 M", ca2024: "12,3 M", evol: "↓ -3%", up: false, incoterm: "FOB", paiement: "45j net" },
  { client: "Olam CI (local)", pays: "Côte d'Ivoire", categorie: "Transformation", depuis: "Jan 2023", ca2025: "8,2 M", ca2024: "4,8 M", evol: "↑ +71%", up: true, incoterm: "EXW", paiement: "Comptant" },
  { client: "SIPEF Trading", pays: "Belgique", categorie: "Export", depuis: "Avr 2023", ca2025: "5,4 M", ca2024: "3,2 M", evol: "↑ +69%", up: true, incoterm: "FOB", paiement: "30j" },
  { client: "JDE (Jacobs D.E.)", pays: "Pays-Bas", categorie: "Chocolatier", depuis: "Jan 2025", ca2025: "11,2 M", ca2024: "—", evol: "Nouveau", up: true, incoterm: "FOB", paiement: "30j" },
  { client: "Coop. Burkina", pays: "Burkina Faso", categorie: "Coopérative", depuis: "Jun 2024", ca2025: "2,4 M", ca2024: "0,8 M", evol: "↑", up: true, incoterm: "EXW", paiement: "Comptant" },
  { client: "Maison Jacques-Vabre", pays: "France", categorie: "Premium", depuis: "Mar 2025", ca2025: "12,4 M", ca2024: "—", evol: "Nouveau", up: true, incoterm: "CIF Marseille", paiement: "60j" },
  { client: "Ferrero", pays: "Italie", categorie: "Chocolatier", depuis: "Prospect 2026", ca2025: "—", ca2024: "—", evol: "Prospect", up: null, incoterm: "—", paiement: "—" },
  { client: "Grand Chocolatier Lyon", pays: "France", categorie: "Artisan", depuis: "Mai 2025", ca2025: "—", ca2024: "—", evol: "Prospect", up: null, incoterm: "—", paiement: "—" },
];

// ─── Commandes en cours ────────────────────────────────────────────────────────
const commandesEnCours = [
  { id: "CMD-2025-018", client: "Cargill Rotterdam", lot: "LOT-045", produit: "Cacao AA", qte: "24,9 t", valeur: "27,4 M", livraison: "05/08 ETA Rotterdam", statut: "En transit", color: "#1565C0", bg: "#E3F2FD" },
  { id: "CMD-2025-019", client: "Nestlé CI", lot: "LOT-046", produit: "Cacao AA 20t + A 15t", qte: "35 t", valeur: "54,3 M", livraison: "15/07 EXW Soubré", statut: "Conditionnement", color: "#E65100", bg: "#FFF3E0" },
  { id: "CMD-2025-020", client: "Barry Callebaut", lot: "LOT-048", produit: "Cacao AA 30t (partiel)", qte: "30 t", valeur: "33,0 M", livraison: "30/07 FOB San-Pédro", statut: "Fermentation", color: "#E65100", bg: "#FFF3E0" },
];

// ─── Historique commandes S1 2025 ─────────────────────────────────────────────
const historiqueCommandes = [
  { id: "CMD-2025-001", client: "Barry Callebaut", produit: "Cacao AA", qte: "18 t", valeur: "19,8 M", date: "10/01", statut: "Livré" },
  { id: "CMD-2025-002", client: "Cargill", produit: "Cacao AA", qte: "22 t", valeur: "24,2 M", date: "18/01", statut: "Livré" },
  { id: "CMD-2025-003", client: "Olam International", produit: "Cacao A", qte: "14 t", valeur: "14,6 M", date: "05/02", statut: "Livré" },
  { id: "CMD-2025-004", client: "Nestlé CI", produit: "Anacarde WW240", qte: "10 t", valeur: "6,8 M", date: "12/02", statut: "Livré" },
  { id: "CMD-2025-005", client: "JDE", produit: "Cacao AA", qte: "20 t", valeur: "22,0 M", date: "03/03", statut: "Livré" },
  { id: "CMD-2025-006", client: "Barry Callebaut", produit: "Cacao AA", qte: "25 t", valeur: "27,5 M", date: "15/03", statut: "Livré" },
  { id: "CMD-2025-007", client: "Touton SA", produit: "Cacao A", qte: "12 t", valeur: "12,5 M", date: "02/04", statut: "Livré" },
  { id: "CMD-2025-008", client: "Maison Jacques-Vabre", produit: "Cacao AA", qte: "8 t", valeur: "8,8 M", date: "18/04", statut: "Livré" },
  { id: "CMD-2025-009", client: "Olam International", produit: "Cacao AA", qte: "16 t", valeur: "17,6 M", date: "08/05", statut: "Livré" },
  { id: "CMD-2025-010", client: "SIPEF Trading", produit: "Cacao A", qte: "8 t", valeur: "8,3 M", date: "20/05", statut: "Livré" },
  { id: "CMD-2025-011", client: "Maison Jacques-Vabre", produit: "Cacao AA premium", qte: "10 t", valeur: "11,0 M", date: "10/06", statut: "Livré" },
  { id: "CMD-2025-012", client: "Cargill", produit: "Cacao AA", qte: "20 t", valeur: "22,0 M", date: "25/06", statut: "Livré" },
];

// ─── Produits catalogue ────────────────────────────────────────────────────────
const catalogue = [
  {
    nom: "Cacao Grade AA",
    badge: "Produit phare",
    badgeColor: "#2E7D32",
    badgeBg: "#E8F5E9",
    norme: "ICCO/BCC Grade AA",
    carac: ["Humidité ≤ 8%", "Cut test ≥ 95 brunes", "Grains/100g ≤ 100"],
    certs: ["RA ✅", "GlobalG.A.P. ✅", "AB (2026)"],
    prix: "1 100 XOF/kg",
    production: "62,4 t (YTD)",
    clients: "Barry Callebaut, Cargill, Olam, JDE, Jacobs-Vabre",
  },
  {
    nom: "Cacao Grade A",
    badge: "Standard",
    badgeColor: "#1565C0",
    badgeBg: "#E3F2FD",
    norme: "ICCO/BCC Grade A",
    carac: ["Humidité ≤ 8%", "Cut test ≥ 90 brunes"],
    certs: ["RA ✅", "GlobalG.A.P. ✅"],
    prix: "1 040 XOF/kg",
    production: "28,6 t (YTD)",
    clients: "Touton SA, Nestlé CI, SIPEF",
  },
  {
    nom: "Anacarde WW240",
    badge: "Export",
    badgeColor: "#E65100",
    badgeBg: "#FFF3E0",
    norme: "SOQC CI — WW240",
    carac: ["180 noix/livre", "Taux brisures ≤ 5%"],
    certs: ["SOQC CI ✅"],
    prix: "680 XOF/kg",
    production: "28,4 t (YTD)",
    clients: "Nestlé CI, Olam CI",
  },
  {
    nom: "Anacarde RW180",
    badge: "Premium",
    badgeColor: "#6A1B9A",
    badgeBg: "#F3E5F5",
    norme: "SOQC CI — RW180",
    carac: ["Plus gros calibre", "Taux brisures ≤ 3%"],
    certs: ["SOQC CI ✅"],
    prix: "594 XOF/kg",
    production: "12,8 t (YTD)",
    clients: "Coop. Burkina, local",
  },
  {
    nom: "Maïs grain sec",
    badge: "Local",
    badgeColor: "#795548",
    badgeBg: "#EFEBE9",
    norme: "Standard marché local",
    carac: ["Humidité ≤ 13%", "Sans moisissures"],
    certs: [],
    prix: "180 XOF/kg",
    production: "— (vivrier)",
    clients: "Marchés locaux CI",
  },
  {
    nom: "Riz paddy",
    badge: "Local",
    badgeColor: "#795548",
    badgeBg: "#EFEBE9",
    norme: "Standard marché local",
    carac: ["Humidité ≤ 14%"],
    certs: [],
    prix: "220 XOF/kg",
    production: "— (vivrier)",
    clients: "Marchés locaux CI",
  },
];

const TABS = ["Tableau de bord", "Pipeline", "Clients", "Commandes", "Produits"] as const;
type Tab = typeof TABS[number];

const maxCA = Math.max(...caData.map((d) => Math.max(d.v2024, d.v2025 ?? 0)));

export default function VentesPage() {
  const [tab, setTab] = useState<Tab>("Tableau de bord");

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Topbar title="Ventes & CRM" breadcrumb={["Commerce", "Ventes"]} />

      <main className="flex-1 p-4 md:p-6 space-y-6 max-w-[1400px] mx-auto w-full">

        {/* KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {kpis.map((kpi) => {
            const Icon = kpi.icon;
            return (
              <div key={kpi.label} className="rounded-2xl border border-gray-100 bg-white p-5 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-500">{kpi.label}</span>
                  <span className="rounded-xl p-2" style={{ background: kpi.bg }}>
                    <Icon size={18} style={{ color: kpi.color }} />
                  </span>
                </div>
                <div className="flex items-end gap-1">
                  <span className="text-2xl font-bold text-gray-900">{kpi.value}</span>
                  {kpi.unit && <span className="text-xs text-gray-400 mb-1 ml-1">{kpi.unit}</span>}
                </div>
                {kpi.progress !== null && (
                  <div>
                    <div className="flex justify-between text-xs text-gray-400 mb-1">
                      <span>Progression</span>
                      <span className="font-semibold" style={{ color: kpi.color }}>{kpi.progress}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-gray-100">
                      <div className="h-1.5 rounded-full" style={{ width: `${kpi.progress}%`, background: kpi.color }} />
                    </div>
                  </div>
                )}
                <span className="text-xs text-gray-400">{kpi.sub}</span>
              </div>
            );
          })}
        </div>

        {/* Onglets */}
        <div className="border-b border-gray-200 overflow-x-auto">
          <nav className="flex gap-0 whitespace-nowrap">
            {TABS.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-5 py-3 text-sm font-medium border-b-2 transition-colors ${
                  tab === t
                    ? "border-[#2E7D32] text-[#2E7D32]"
                    : "border-transparent text-gray-500 hover:text-gray-800"
                }`}
              >
                {t}
              </button>
            ))}
          </nav>
        </div>

        {/* ══════════ ONGLET TABLEAU DE BORD ══════════ */}
        {tab === "Tableau de bord" && (
          <div className="space-y-6">

            {/* Bar chart CA mensuel */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                <div>
                  <h2 className="text-base font-semibold text-gray-900">CA mensuel 2025 vs 2024</h2>
                  <p className="text-xs text-gray-400 mt-0.5">Juillet–Décembre 2025 : données 2024 seulement (prévision 2025 en pointillés)</p>
                </div>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1.5"><span className="inline-block w-3 h-3 rounded-sm bg-gray-300" /> 2024</span>
                  <span className="flex items-center gap-1.5"><span className="inline-block w-3 h-3 rounded-sm bg-[#4CAF50]" /> 2025 réalisé</span>
                  <span className="flex items-center gap-1.5"><span className="inline-block w-3 h-3 rounded-sm border border-dashed border-[#4CAF50]" /> 2025 prév.</span>
                </div>
              </div>
              <svg viewBox="0 0 700 180" className="w-full" aria-label="CA mensuel 2025 vs 2024">
                {/* grille */}
                {[0, 20, 40, 60].map((v) => {
                  const y = 155 - (v / 60) * 130;
                  return (
                    <g key={v}>
                      <line x1={40} y1={y} x2={695} y2={y} stroke="#F0F0F0" strokeWidth={1} />
                      <text x={36} y={y + 4} textAnchor="end" fontSize={9} fill="#BDBDBD">{v}M</text>
                    </g>
                  );
                })}
                {caData.map((d, i) => {
                  const slotW = 54;
                  const x0 = 42 + i * slotW;
                  const barW = 20;
                  const gap = 3;
                  const h24 = (d.v2024 / 60) * 130;
                  const h25 = d.v2025 ? (d.v2025 / 60) * 130 : 0;
                  const isProjected = d.v2025 === null;
                  const projH = isProjected ? (d.v2024 * 1.06 / 60) * 130 : 0;
                  return (
                    <g key={d.mois}>
                      {/* 2024 bar */}
                      <rect x={x0} y={155 - h24} width={barW} height={h24} rx={2} fill="#D0D0D0" />
                      {/* 2025 bar ou prévision en pointillés */}
                      {!isProjected && h25 > 0 && (
                        <rect x={x0 + barW + gap} y={155 - h25} width={barW} height={h25} rx={2} fill="#4CAF50" />
                      )}
                      {isProjected && (
                        <rect
                          x={x0 + barW + gap} y={155 - projH} width={barW} height={projH}
                          rx={2} fill="none" stroke="#4CAF50" strokeWidth={1.5} strokeDasharray="3,2"
                        />
                      )}
                      <text x={x0 + barW + 1.5} y={168} textAnchor="middle" fontSize={8} fill="#9E9E9E">{d.mois}</text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Top 5 clients S1 */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5">
              <h2 className="text-base font-semibold text-gray-900 mb-4">Top 5 clients S1 2025</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr style={{ background: "#F8FBF8" }}>
                      {["Client", "Pays", "CA S1 (XOF)", "Produits", "Part (%)", "Tendance"].map((h) => (
                        <th key={h} className="text-left text-gray-500 font-semibold px-4 py-2.5 whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {topClients.map((c) => (
                      <tr key={c.client} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 font-semibold text-gray-900 whitespace-nowrap">{c.client}</td>
                        <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{c.pays}</td>
                        <td className="px-4 py-3 font-semibold text-[#2E7D32] whitespace-nowrap">{c.ca} M</td>
                        <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{c.produits}</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-gray-800">{c.pct}%</span>
                            <div className="w-16 h-1.5 rounded-full bg-gray-100">
                              <div className="h-1.5 rounded-full bg-[#4CAF50]" style={{ width: `${c.pct / 35 * 100}%` }} />
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span
                            className="font-semibold text-xs"
                            style={{ color: c.up === true ? "#2E7D32" : c.up === false ? "#E53935" : "#757575" }}
                          >
                            {c.trend}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Performance par produit */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5">
              <h2 className="text-base font-semibold text-gray-900 mb-4">Performance par produit — S1 2025</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr style={{ background: "#F8FBF8" }}>
                      {["Produit", "Volume S1", "CA S1 (M XOF)", "Prix moyen", "Marge brute"].map((h) => (
                        <th key={h} className="text-left text-gray-500 font-semibold px-4 py-2.5 whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {produitsPerf.map((p) => (
                      <tr key={p.produit} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 font-semibold text-gray-900 whitespace-nowrap">{p.produit}</td>
                        <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{p.volume}</td>
                        <td className="px-4 py-3 font-semibold text-[#2E7D32] whitespace-nowrap">{p.ca}</td>
                        <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{p.prix}</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-1.5 rounded-full bg-gray-100">
                              <div className="h-1.5 rounded-full bg-[#4CAF50]" style={{ width: p.marge }} />
                            </div>
                            <span className="font-semibold text-gray-800">{p.marge}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ══════════ ONGLET PIPELINE ══════════ */}
        {tab === "Pipeline" && (
          <div className="space-y-6">

            {/* Funnel SVG */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5">
              <h2 className="text-base font-semibold text-gray-900 mb-5">Entonnoir de vente</h2>
              <div className="overflow-x-auto">
                <svg viewBox="0 0 600 120" className="w-full max-w-2xl mx-auto" aria-label="Entonnoir de vente">
                  {[
                    { label: "Qualification", count: 52, w: 600, x: 0 },
                    { label: "Devis envoyé", count: 12, w: 480, x: 60 },
                    { label: "Négociation", count: 4, w: 340, x: 130 },
                    { label: "Contrat signé", count: 3, w: 200, x: 200 },
                    { label: "Livraison", count: 1, w: 100, x: 250 },
                  ].map((s, i) => {
                    const h = 18;
                    const y = i * 22 + 4;
                    const opacity = 1 - i * 0.12;
                    return (
                      <g key={s.label}>
                        <rect x={s.x} y={y} width={s.w} height={h} rx={4} fill="#2E7D32" fillOpacity={opacity} />
                        <text x={s.x + 8} y={y + 12} fontSize={9} fill="white" fontWeight="600">{s.label}</text>
                        <text x={s.x + s.w - 6} y={y + 12} fontSize={10} fill="white" fontWeight="700" textAnchor="end">{s.count}</text>
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>

            {/* Opportunités en négociation */}
            <div className="space-y-4">
              <h2 className="text-base font-semibold text-gray-900">Opportunités en cours de négociation</h2>
              {opportunites.map((opp) => (
                <div key={opp.id} className="rounded-2xl border border-gray-100 bg-white p-5 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-xs font-mono text-gray-400">{opp.id}</span>
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700">{opp.stade}</span>
                      </div>
                      <p className="text-sm font-bold text-gray-900">{opp.title}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{opp.produit}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-lg font-bold text-gray-900">{opp.valeur}</p>
                      <p className="text-xs text-gray-500">Pondérée : <span className="font-semibold text-[#2E7D32]">{opp.ponderee} M</span></p>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs text-gray-400 mb-1">
                      <span>Probabilité</span>
                      <span className="font-semibold text-gray-700">{opp.proba}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-gray-100">
                      <div className="h-2 rounded-full" style={{ width: `${opp.proba}%`, background: opp.proba >= 80 ? "#2E7D32" : opp.proba >= 60 ? "#F9A825" : "#E65100" }} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="rounded-xl bg-gray-50 px-3 py-2">
                      <p className="text-gray-400 mb-0.5">Contact</p>
                      <p className="font-medium text-gray-700">{opp.contact}</p>
                    </div>
                    <div className="rounded-xl bg-green-50 px-3 py-2">
                      <p className="text-green-600 mb-0.5">Prochaine étape</p>
                      <p className="font-medium text-green-800 flex items-center gap-1"><ChevronRight size={12} />{opp.etape}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══════════ ONGLET CLIENTS ══════════ */}
        {tab === "Clients" && (
          <div className="rounded-2xl border border-gray-100 bg-white p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-gray-900">Carnet de clients — 12 actifs & prospects</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr style={{ background: "#F8FBF8" }}>
                    {["Client", "Pays", "Catégorie", "Depuis", "CA 2025", "CA 2024", "Évol.", "Incoterm", "Paiement"].map((h) => (
                      <th key={h} className="text-left text-gray-500 font-semibold px-3 py-2.5 whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {clients.map((c) => (
                    <tr key={c.client} className="hover:bg-gray-50 transition-colors">
                      <td className="px-3 py-2.5 font-semibold text-gray-900 whitespace-nowrap">{c.client}</td>
                      <td className="px-3 py-2.5 text-gray-500 whitespace-nowrap">{c.pays}</td>
                      <td className="px-3 py-2.5 whitespace-nowrap">
                        <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-700">{c.categorie}</span>
                      </td>
                      <td className="px-3 py-2.5 text-gray-500 whitespace-nowrap">{c.depuis}</td>
                      <td className="px-3 py-2.5 font-semibold text-[#2E7D32] whitespace-nowrap">{c.ca2025 !== "—" ? `${c.ca2025} M` : "—"}</td>
                      <td className="px-3 py-2.5 text-gray-500 whitespace-nowrap">{c.ca2024 !== "—" ? `${c.ca2024} M` : "—"}</td>
                      <td className="px-3 py-2.5 whitespace-nowrap">
                        <span
                          className="font-semibold"
                          style={{ color: c.up === true ? "#2E7D32" : c.up === false ? "#E53935" : "#9E9E9E" }}
                        >
                          {c.evol}
                        </span>
                      </td>
                      <td className="px-3 py-2.5 text-gray-600 whitespace-nowrap">{c.incoterm}</td>
                      <td className="px-3 py-2.5 text-gray-600 whitespace-nowrap">{c.paiement}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ══════════ ONGLET COMMANDES ══════════ */}
        {tab === "Commandes" && (
          <div className="space-y-6">

            {/* En cours */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5">
              <h2 className="text-base font-semibold text-gray-900 mb-4">Commandes en cours (3)</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr style={{ background: "#F8FBF8" }}>
                      {["Commande", "Client", "Lot", "Produit", "Qté", "Valeur", "Livraison prévue", "Statut"].map((h) => (
                        <th key={h} className="text-left text-gray-500 font-semibold px-4 py-2.5 whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {commandesEnCours.map((c) => (
                      <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 font-mono font-semibold text-[#2E7D32] whitespace-nowrap">{c.id}</td>
                        <td className="px-4 py-3 font-medium text-gray-800 whitespace-nowrap">{c.client}</td>
                        <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{c.lot}</td>
                        <td className="px-4 py-3 text-gray-700">{c.produit}</td>
                        <td className="px-4 py-3 font-semibold text-gray-900 whitespace-nowrap">{c.qte}</td>
                        <td className="px-4 py-3 font-semibold text-[#2E7D32] whitespace-nowrap">{c.valeur} M XOF</td>
                        <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{c.livraison}</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-medium text-xs" style={{ background: c.bg, color: c.color }}>
                            <Truck size={10} />
                            {c.statut}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Historique S1 */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5">
              <h2 className="text-base font-semibold text-gray-900 mb-4">Historique commandes livrées — S1 2025 (12 lignes)</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr style={{ background: "#F8FBF8" }}>
                      {["Commande", "Client", "Produit", "Qté", "Valeur", "Date livraison", "Statut"].map((h) => (
                        <th key={h} className="text-left text-gray-500 font-semibold px-4 py-2.5 whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {historiqueCommandes.map((c) => (
                      <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-2.5 font-mono font-semibold text-gray-600 whitespace-nowrap">{c.id}</td>
                        <td className="px-4 py-2.5 font-medium text-gray-800 whitespace-nowrap">{c.client}</td>
                        <td className="px-4 py-2.5 text-gray-600 whitespace-nowrap">{c.produit}</td>
                        <td className="px-4 py-2.5 text-gray-700 whitespace-nowrap">{c.qte}</td>
                        <td className="px-4 py-2.5 font-semibold text-[#2E7D32] whitespace-nowrap">{c.valeur} M XOF</td>
                        <td className="px-4 py-2.5 text-gray-500 whitespace-nowrap">{c.date}/2025</td>
                        <td className="px-4 py-2.5 whitespace-nowrap">
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#E8F5E9] text-[#2E7D32]">
                            <CheckCircle size={10} />
                            {c.statut}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ══════════ ONGLET PRODUITS ══════════ */}
        {tab === "Produits" && (
          <div className="space-y-4">
            <h2 className="text-base font-semibold text-gray-900">Catalogue produits AGRIFRIK</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {catalogue.map((p) => (
                <div key={p.nom} className="rounded-2xl border border-gray-100 bg-white p-5 flex flex-col gap-3">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-bold text-gray-900">{p.nom}</p>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap" style={{ background: p.badgeBg, color: p.badgeColor }}>
                      {p.badge}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400">Norme : {p.norme}</p>
                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Caractéristiques</p>
                    {p.carac.map((c) => (
                      <div key={c} className="flex items-center gap-1.5 text-xs text-gray-700">
                        <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: p.badgeColor }} />
                        {c}
                      </div>
                    ))}
                  </div>
                  {p.certs.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {p.certs.map((cert) => (
                        <span key={cert} className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-green-50 text-green-700">{cert}</span>
                      ))}
                    </div>
                  )}
                  <div className="border-t border-gray-50 pt-3 grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <p className="text-gray-400">Prix de référence</p>
                      <p className="font-bold text-gray-900">{p.prix}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Production YTD</p>
                      <p className="font-semibold text-[#2E7D32]">{p.production}</p>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 rounded-xl bg-gray-50 px-3 py-2">
                    <span className="font-semibold text-gray-600">Clients : </span>{p.clients}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
