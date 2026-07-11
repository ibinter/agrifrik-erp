"use client";

import { useState } from "react";
import Topbar from "../../components/Topbar";

// ─── Types ───────────────────────────────────────────────────────────────────
type Tab = "overview" | "departements" | "alertes" | "revisions";
type Dept = "Production" | "Logistique" | "Commerce" | "Finance" | "RH" | "IA/Tech" | "Administration";

// ─── Données budget général ───────────────────────────────────────────────────
const produits = [
  { rubrique: "Ventes cacao", budgetAnnuel: 196_000_000, budgetS1: 98_000_000, realisS1: 101_200_000, ecartS1: 3_200_000, ecartSign: 1, taux: 103, previsionS2: 102_000_000, totalPrevu: 203_200_000 },
  { rubrique: "Ventes anacarde", budgetAnnuel: 32_000_000, budgetS1: 32_000_000, realisS1: 31_400_000, ecartS1: -600_000, ecartSign: -1, taux: 98, previsionS2: 0, totalPrevu: 31_400_000 },
  { rubrique: "Ventes vivrières", budgetAnnuel: 8_000_000, budgetS1: 4_000_000, realisS1: 3_800_000, ecartS1: -200_000, ecartSign: -1, taux: 95, previsionS2: 4_200_000, totalPrevu: 8_000_000 },
  { rubrique: "Subventions bailleurs", budgetAnnuel: 44_000_000, budgetS1: 22_000_000, realisS1: 24_200_000, ecartS1: 2_200_000, ecartSign: 1, taux: 110, previsionS2: 22_000_000, totalPrevu: 46_200_000 },
];

const charges = [
  { rubrique: "Intrants & engrais (charges variables)", budgetAnnuel: 52_000_000, budgetS1: 28_000_000, realisS1: 29_400_000, ecartS1: -1_400_000, ecartSign: -1, taux: 105, previsionS2: 24_000_000, totalPrevu: 53_400_000 },
  { rubrique: "Main d'œuvre récolte", budgetAnnuel: 18_000_000, budgetS1: 10_000_000, realisS1: 10_800_000, ecartS1: -800_000, ecartSign: -1, taux: 108, previsionS2: 8_200_000, totalPrevu: 19_000_000 },
  { rubrique: "Transport & logistique", budgetAnnuel: 14_000_000, budgetS1: 7_000_000, realisS1: 6_400_000, ecartS1: 600_000, ecartSign: 1, taux: 91, previsionS2: 7_600_000, totalPrevu: 14_000_000 },
  { rubrique: "Personnel permanent", budgetAnnuel: 44_000_000, budgetS1: 22_000_000, realisS1: 21_200_000, ecartS1: 800_000, ecartSign: 1, taux: 96, previsionS2: 22_400_000, totalPrevu: 43_600_000 },
  { rubrique: "Maintenance matériels", budgetAnnuel: 6_000_000, budgetS1: 3_000_000, realisS1: 3_200_000, ecartS1: -200_000, ecartSign: -1, taux: 107, previsionS2: 2_800_000, totalPrevu: 6_000_000 },
  { rubrique: "Assurances", budgetAnnuel: 4_200_000, budgetS1: 2_100_000, realisS1: 2_100_000, ecartS1: 0, ecartSign: 0, taux: 100, previsionS2: 2_100_000, totalPrevu: 4_200_000 },
  { rubrique: "Amortissements", budgetAnnuel: 18_400_000, budgetS1: 9_200_000, realisS1: 9_200_000, ecartS1: 0, ecartSign: 0, taux: 100, previsionS2: 9_200_000, totalPrevu: 18_400_000 },
  { rubrique: "Frais généraux", budgetAnnuel: 12_000_000, budgetS1: 6_000_000, realisS1: 5_600_000, ecartS1: 400_000, ecartSign: 1, taux: 93, previsionS2: 6_000_000, totalPrevu: 11_600_000 },
  { rubrique: "Charges financières", budgetAnnuel: 4_500_000, budgetS1: 2_250_000, realisS1: 2_100_000, ecartS1: 150_000, ecartSign: 1, taux: 93, previsionS2: 2_100_000, totalPrevu: 4_200_000 },
];

// ─── Données départements ─────────────────────────────────────────────────────
const deptData: Record<Dept, { ligne: string; budget: number; realise: number; ecart: number; note?: string }[]> = {
  Production: [
    { ligne: "Intrants & engrais", budget: 36_000_000, realise: 28_400_000, ecart: 7_600_000, note: "pic récolte à venir" },
    { ligne: "Main d'œuvre terrain", budget: 12_000_000, realise: 8_600_000, ecart: 3_400_000, note: "saisonnier" },
    { ligne: "Traitements phytos", budget: 6_000_000, realise: 4_800_000, ecart: 1_200_000 },
    { ligne: "Certifications (RA, GG)", budget: 4_000_000, realise: 3_600_000, ecart: 400_000 },
    { ligne: "Petit matériel", budget: 2_000_000, realise: 1_800_000, ecart: 200_000 },
  ],
  Logistique: [
    { ligne: "Transport camion", budget: 8_000_000, realise: 5_800_000, ecart: 2_200_000 },
    { ligne: "Carburant flotte", budget: 3_200_000, realise: 2_900_000, ecart: 300_000 },
    { ligne: "Entrepôt Soubré", budget: 2_400_000, realise: 2_100_000, ecart: 300_000 },
    { ligne: "Emballages export", budget: 1_800_000, realise: 1_400_000, ecart: 400_000 },
  ],
  Commerce: [
    { ligne: "Prospection marchés", budget: 4_000_000, realise: 2_800_000, ecart: 1_200_000 },
    { ligne: "Certifications qualité", budget: 2_400_000, realise: 2_200_000, ecart: 200_000 },
    { ligne: "Frais courtage", budget: 1_200_000, realise: 980_000, ecart: 220_000 },
  ],
  Finance: [
    { ligne: "Charges financières", budget: 4_500_000, realise: 2_100_000, ecart: 2_400_000 },
    { ligne: "Frais bancaires", budget: 600_000, realise: 480_000, ecart: 120_000 },
    { ligne: "Assurances", budget: 4_200_000, realise: 2_100_000, ecart: 2_100_000 },
  ],
  RH: [
    { ligne: "Salaires permanents", budget: 32_000_000, realise: 15_800_000, ecart: 16_200_000 },
    { ligne: "Charges sociales CNPS", budget: 6_400_000, realise: 3_160_000, ecart: 3_240_000 },
    { ligne: "Formations", budget: 1_200_000, realise: 840_000, ecart: 360_000 },
    { ligne: "Recrutement saisonniers", budget: 4_400_000, realise: 2_200_000, ecart: 2_200_000 },
  ],
  "IA/Tech": [
    { ligne: "Abonnements SaaS", budget: 1_800_000, realise: 1_200_000, ecart: 600_000 },
    { ligne: "Maintenance système", budget: 600_000, realise: 420_000, ecart: 180_000 },
    { ligne: "Drones & capteurs", budget: 1_200_000, realise: 986_000, ecart: 214_000 },
  ],
  Administration: [
    { ligne: "Frais généraux bureau", budget: 4_000_000, realise: 2_800_000, ecart: 1_200_000 },
    { ligne: "Fournitures", budget: 800_000, realise: 560_000, ecart: 240_000 },
    { ligne: "Télécoms", budget: 1_200_000, realise: 840_000, ecart: 360_000 },
  ],
};

// ─── Révisions ────────────────────────────────────────────────────────────────
const revisions = [
  { date: "15/03/2025", rubrique: "Certification RA", initial: "3,5 M", revision: "4,0 M (+500k)", motif: "Audit supplémentaire", validePar: "Jean-Baptiste K." },
  { date: "01/05/2025", rubrique: "Drone DJI (maintenance)", initial: "0", revision: "186 000 (+186k)", motif: "Assurance drone imprévue", validePar: "Admin" },
  { date: "01/06/2025", rubrique: "KCl fertilisant", initial: "8,4 M", revision: "9,4 M (+1 M)", motif: "Hausse prix mondial", validePar: "Jean-Baptiste K." },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────
function fmtXOF(n: number) {
  if (n === 0) return "0";
  if (Math.abs(n) >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(".", ",") + " M";
  return n.toLocaleString("fr-FR") + " XOF";
}

function ecartBadge(v: number, sign: number) {
  if (sign === 0) return <span className="text-gray-500">0 ✅</span>;
  if (sign > 0) return <span className="text-emerald-600 font-semibold">+{fmtXOF(v)} ✅</span>;
  return <span className="text-orange-600 font-semibold">{fmtXOF(v)} ⚠️</span>;
}

function tauxColor(t: number) {
  if (t <= 105) return "#2E7D32";
  if (t <= 115) return "#E65100";
  return "#C62828";
}

// ─── Composant principal ─────────────────────────────────────────────────────
export default function BudgetPage() {
  const [tab, setTab] = useState<Tab>("overview");
  const [dept, setDept] = useState<Dept>("Production");

  const tabs: { id: Tab; label: string }[] = [
    { id: "overview", label: "Vue d'ensemble" },
    { id: "departements", label: "Par département" },
    { id: "alertes", label: "Alertes" },
    { id: "revisions", label: "Révisions" },
  ];

  const depts: Dept[] = ["Production", "Logistique", "Commerce", "Finance", "RH", "IA/Tech", "Administration"];

  const kpis = [
    { label: "Budget total 2025", val: "280 M XOF", sub: "", color: "text-[#1B5E20]" },
    { label: "Réalisé YTD", val: "145,2 M XOF", sub: "51,9%", pct: 51.9, color: "text-[#2E7D32]" },
    { label: "Écart global", val: "+17,6 M XOF", sub: "Favorable", color: "text-emerald-600" },
    { label: "Lignes en dépassement", val: "2", sub: "sur 13 lignes", color: "text-orange-600" },
    { label: "Taux exécution", val: "51,9%", sub: "S1 terminé", pct: 51.9, color: "text-blue-600" },
  ];

  // SVG barres horizontales taux d'exécution
  const allRows = [
    ...produits.map((r) => ({ label: r.rubrique.length > 28 ? r.rubrique.slice(0, 28) + "…" : r.rubrique, taux: r.taux })),
    ...charges.map((r) => ({ label: r.rubrique.length > 28 ? r.rubrique.slice(0, 28) + "…" : r.rubrique, taux: r.taux })),
  ];

  const svgH = 30 * allRows.length + 20;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950">
      <Topbar title="Budget & Contrôle Budgétaire" breadcrumb={["Finance", "Budget"]} />

      <main className="flex-1 p-6 space-y-6">
        {/* KPIs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-4">
          {kpis.map((k) => (
            <div key={k.label} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5 shadow-sm">
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">{k.label}</p>
              <p className={`mt-1 text-xl font-bold ${k.color}`}>{k.val}</p>
              {k.sub && <p className="text-xs text-gray-400 mt-0.5">{k.sub}</p>}
              {k.pct !== undefined && (
                <div className="mt-2 bg-gray-100 dark:bg-gray-700 rounded-full h-1.5">
                  <div className="h-1.5 rounded-full bg-[#2E7D32]" style={{ width: `${Math.min(k.pct, 100)}%` }} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Onglets */}
        <div className="flex gap-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-1 w-fit">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                tab === t.id
                  ? "bg-[#2E7D32] text-white shadow-sm"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* ── VUE D'ENSEMBLE ── */}
        {tab === "overview" && (
          <div className="space-y-6">
            {/* Tableau général */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800">
                <h2 className="text-base font-semibold text-gray-900 dark:text-white">Budget général 2025 — PRODUITS</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs min-w-[900px]">
                  <thead>
                    <tr className="bg-[#F8FBF8] dark:bg-gray-800 text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-wide">
                      {["Rubrique", "Budget annuel", "Budget S1", "Réalisé S1", "Écart S1", "Taux", "Prévision S2", "Total prévu"].map((h) => (
                        <th key={h} className={`px-4 py-3 ${h === "Rubrique" ? "text-left" : "text-right"}`}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                    {produits.map((r) => (
                      <tr key={r.rubrique} className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                        <td className="px-4 py-2.5 text-gray-800 dark:text-gray-200 font-medium">{r.rubrique}</td>
                        <td className="px-4 py-2.5 text-right text-gray-700 dark:text-gray-300">{fmtXOF(r.budgetAnnuel)}</td>
                        <td className="px-4 py-2.5 text-right text-gray-700 dark:text-gray-300">{fmtXOF(r.budgetS1)}</td>
                        <td className="px-4 py-2.5 text-right text-gray-700 dark:text-gray-300">{fmtXOF(r.realisS1)}</td>
                        <td className="px-4 py-2.5 text-right">{ecartBadge(Math.abs(r.ecartS1), r.ecartSign)}</td>
                        <td className="px-4 py-2.5 text-right">
                          <span className={`font-semibold ${r.taux >= 100 ? "text-emerald-600" : "text-orange-600"}`}>{r.taux}%</span>
                        </td>
                        <td className="px-4 py-2.5 text-right text-gray-700 dark:text-gray-300">{r.previsionS2 ? fmtXOF(r.previsionS2) : "—"}</td>
                        <td className="px-4 py-2.5 text-right text-gray-700 dark:text-gray-300">{fmtXOF(r.totalPrevu)}</td>
                      </tr>
                    ))}
                    <tr className="bg-emerald-50 dark:bg-emerald-950/30 font-bold text-xs border-t-2 border-emerald-200 dark:border-emerald-800">
                      <td className="px-4 py-3 text-emerald-800 dark:text-emerald-200">Total produits</td>
                      <td className="px-4 py-3 text-right text-emerald-800 dark:text-emerald-200">280,0 M</td>
                      <td className="px-4 py-3 text-right text-emerald-800 dark:text-emerald-200">156,0 M</td>
                      <td className="px-4 py-3 text-right text-emerald-800 dark:text-emerald-200">160,6 M</td>
                      <td className="px-4 py-3 text-right text-emerald-600">+4,6 M ✅</td>
                      <td className="px-4 py-3 text-right text-emerald-600">103%</td>
                      <td className="px-4 py-3 text-right text-emerald-800 dark:text-emerald-200">128,2 M</td>
                      <td className="px-4 py-3 text-right text-emerald-800 dark:text-emerald-200">288,8 M</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800">
                <h2 className="text-base font-semibold text-gray-900 dark:text-white">Budget général 2025 — CHARGES</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs min-w-[900px]">
                  <thead>
                    <tr className="bg-[#F8FBF8] dark:bg-gray-800 text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-wide">
                      {["Rubrique", "Budget annuel", "Budget S1", "Réalisé S1", "Écart S1", "Taux", "Prévision S2", "Total prévu"].map((h) => (
                        <th key={h} className={`px-4 py-3 ${h === "Rubrique" ? "text-left" : "text-right"}`}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                    {charges.map((r) => (
                      <tr key={r.rubrique} className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                        <td className="px-4 py-2.5 text-gray-800 dark:text-gray-200 font-medium">{r.rubrique}</td>
                        <td className="px-4 py-2.5 text-right text-gray-700 dark:text-gray-300">{fmtXOF(r.budgetAnnuel)}</td>
                        <td className="px-4 py-2.5 text-right text-gray-700 dark:text-gray-300">{fmtXOF(r.budgetS1)}</td>
                        <td className="px-4 py-2.5 text-right text-gray-700 dark:text-gray-300">{fmtXOF(r.realisS1)}</td>
                        <td className="px-4 py-2.5 text-right">{ecartBadge(Math.abs(r.ecartS1), r.ecartSign)}</td>
                        <td className="px-4 py-2.5 text-right">
                          <span className={`font-semibold ${r.taux > 100 ? "text-orange-600" : "text-emerald-600"}`}>{r.taux}%</span>
                        </td>
                        <td className="px-4 py-2.5 text-right text-gray-700 dark:text-gray-300">{fmtXOF(r.previsionS2)}</td>
                        <td className="px-4 py-2.5 text-right text-gray-700 dark:text-gray-300">{fmtXOF(r.totalPrevu)}</td>
                      </tr>
                    ))}
                    <tr className="bg-orange-50 dark:bg-orange-950/30 font-bold text-xs border-t-2 border-orange-200 dark:border-orange-800">
                      <td className="px-4 py-3 text-orange-800 dark:text-orange-200">Total charges</td>
                      <td className="px-4 py-3 text-right text-orange-800 dark:text-orange-200">173,1 M</td>
                      <td className="px-4 py-3 text-right text-orange-800 dark:text-orange-200">89,6 M</td>
                      <td className="px-4 py-3 text-right text-orange-800 dark:text-orange-200">90,0 M</td>
                      <td className="px-4 py-3 text-right text-orange-600">-0,5 M ⚠️</td>
                      <td className="px-4 py-3 text-right text-orange-600">101%</td>
                      <td className="px-4 py-3 text-right text-orange-800 dark:text-orange-200">84,4 M</td>
                      <td className="px-4 py-3 text-right text-orange-800 dark:text-orange-200">174,4 M</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Résultat prévisionnel */}
            <div className="bg-[#1B5E20] text-white rounded-2xl p-5 shadow">
              <div className="grid grid-cols-4 gap-4 text-sm">
                <div><p className="text-green-200 text-xs">Résultat budgété annuel</p><p className="font-bold text-lg mt-0.5">106,9 M XOF</p></div>
                <div><p className="text-green-200 text-xs">Résultat budgété S1</p><p className="font-bold text-lg mt-0.5">66,45 M XOF</p></div>
                <div><p className="text-green-200 text-xs">Résultat réalisé S1</p><p className="font-bold text-lg mt-0.5">70,6 M XOF</p></div>
                <div><p className="text-green-200 text-xs">Écart S1</p><p className="font-bold text-lg mt-0.5 text-green-300">+4,15 M ✅ (106%)</p></div>
              </div>
              <p className="text-green-200 text-xs mt-3">Résultat total prévu fin 2025 : <span className="font-bold text-white">114,4 M XOF</span></p>
            </div>

            {/* SVG Taux d'exécution */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6">
              <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-1">Taux d'exécution par rubrique (S1)</h2>
              <p className="text-xs text-gray-400 mb-4">Vert ≤ 105% · Orange 105-115% · Rouge &gt; 115%</p>
              <svg viewBox={`0 0 700 ${svgH}`} className="w-full" aria-label="Taux d'exécution par rubrique">
                {allRows.map((row, i) => {
                  const barW = Math.min((row.taux / 130) * 380, 380);
                  const color = tauxColor(row.taux);
                  return (
                    <g key={row.label} transform={`translate(0, ${i * 30})`}>
                      <text x={250} y={20} textAnchor="end" fontSize={10} fill="#6B7280" className="font-medium">{row.label}</text>
                      <rect x={260} y={8} width={380} height={16} rx={4} fill="#F3F4F6" />
                      <rect x={260} y={8} width={barW} height={16} rx={4} fill={color} fillOpacity={0.85} />
                      <text x={260 + barW + 6} y={20} fontSize={10} fill={color} fontWeight={700}>{row.taux}%</text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>
        )}

        {/* ── PAR DÉPARTEMENT ── */}
        {tab === "departements" && (
          <div className="space-y-6">
            {/* Chips département */}
            <div className="flex flex-wrap gap-2">
              {depts.map((d) => (
                <button
                  key={d}
                  onClick={() => setDept(d)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    dept === d
                      ? "bg-[#2E7D32] text-white"
                      : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-[#2E7D32] hover:text-[#2E7D32]"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>

            {/* Tableau département */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800">
                <h2 className="text-base font-semibold text-gray-900 dark:text-white">Budget {dept} — S1 2025</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm min-w-[700px]">
                  <thead>
                    <tr className="bg-[#F8FBF8] dark:bg-gray-800 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                      <th className="px-4 py-3 text-left">Ligne budgétaire</th>
                      <th className="px-4 py-3 text-right">Budget</th>
                      <th className="px-4 py-3 text-right">Réalisé</th>
                      <th className="px-4 py-3 text-right">Écart</th>
                      <th className="px-4 py-3 text-left w-48">Progression</th>
                      <th className="px-4 py-3 text-right">%</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                    {deptData[dept].map((r) => {
                      const pct = Math.round((r.realise / r.budget) * 100);
                      const over = pct > 100;
                      return (
                        <tr key={r.ligne} className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                          <td className="px-4 py-3">
                            <p className="font-medium text-gray-800 dark:text-gray-200 text-sm">{r.ligne}</p>
                            {r.note && <p className="text-xs text-gray-400 italic">{r.note}</p>}
                          </td>
                          <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300 text-sm">{fmtXOF(r.budget)}</td>
                          <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300 text-sm">{fmtXOF(r.realise)}</td>
                          <td className="px-4 py-3 text-right">
                            <span className="font-semibold text-emerald-600 text-sm">+{fmtXOF(r.ecart)} ✅</span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="bg-gray-100 dark:bg-gray-700 rounded-full h-2.5 w-36">
                              <div
                                className={`h-2.5 rounded-full ${over ? "bg-orange-500" : "bg-[#4CAF50]"}`}
                                style={{ width: `${Math.min(pct, 100)}%` }}
                              />
                            </div>
                          </td>
                          <td className={`px-4 py-3 text-right text-sm font-semibold ${over ? "text-orange-600" : "text-[#2E7D32]"}`}>{pct}%</td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot>
                    <tr className="bg-gray-50 dark:bg-gray-800 font-bold text-sm border-t-2 border-gray-200 dark:border-gray-700">
                      <td className="px-4 py-3 text-gray-700 dark:text-gray-200">Total {dept}</td>
                      <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-200">
                        {fmtXOF(deptData[dept].reduce((a, r) => a + r.budget, 0))}
                      </td>
                      <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-200">
                        {fmtXOF(deptData[dept].reduce((a, r) => a + r.realise, 0))}
                      </td>
                      <td className="px-4 py-3 text-right text-emerald-600">
                        +{fmtXOF(deptData[dept].reduce((a, r) => a + r.ecart, 0))} ✅
                      </td>
                      <td className="px-4 py-3" />
                      <td className="px-4 py-3 text-right text-[#2E7D32]">
                        {Math.round((deptData[dept].reduce((a, r) => a + r.realise, 0) / deptData[dept].reduce((a, r) => a + r.budget, 0)) * 100)}%
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ── ALERTES ── */}
        {tab === "alertes" && (
          <div className="space-y-6">
            {/* Dépassements */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6">
              <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-4">Lignes budgétaires en dépassement</h2>
              <div className="space-y-4">
                <div className="border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/30 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <span className="text-xl mt-0.5">🔴</span>
                    <div className="flex-1">
                      <p className="font-semibold text-red-800 dark:text-red-300 text-sm">Intrants & engrais (Charges variables)</p>
                      <p className="text-xs text-red-700 dark:text-red-400 mt-0.5">Réalisé : 29,4 M XOF vs Budget : 28 M XOF — <span className="font-bold">Dépassement +5%</span></p>
                      <p className="text-xs text-red-600 dark:text-red-400 mt-1 italic">Cause : Hausse prix KCl +12% sur le marché mondial</p>
                    </div>
                    <span className="bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-400 text-xs font-bold px-2.5 py-1 rounded-full whitespace-nowrap">+5%</span>
                  </div>
                </div>
                <div className="border border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-950/30 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <span className="text-xl mt-0.5">🟡</span>
                    <div className="flex-1">
                      <p className="font-semibold text-orange-800 dark:text-orange-300 text-sm">Main d'œuvre récolte</p>
                      <p className="text-xs text-orange-700 dark:text-orange-400 mt-0.5">Réalisé : 10,8 M XOF vs Budget : 10 M XOF — <span className="font-bold">Dépassement +8%</span></p>
                      <p className="text-xs text-orange-600 dark:text-orange-400 mt-1 italic">Cause : Pénurie saisonniers zone, négociation tarif +12%</p>
                    </div>
                    <span className="bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-400 text-xs font-bold px-2.5 py-1 rounded-full whitespace-nowrap">+8%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Sous-utilisations */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6">
              <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-4">Lignes sous-utilisées — Opportunités de réallocation</h2>
              <div className="space-y-4">
                <div className="border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <span className="text-xl mt-0.5">🟢</span>
                    <div className="flex-1">
                      <p className="font-semibold text-emerald-800 dark:text-emerald-300 text-sm">Transport & logistique</p>
                      <p className="text-xs text-emerald-700 dark:text-emerald-400 mt-0.5">Budget : 14 M XOF · Réalisé : 6,4 M XOF</p>
                      <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1 italic">Disponible : <span className="font-bold">7,6 M XOF</span> — Surcapacité flotte propre</p>
                    </div>
                    <span className="bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-400 text-xs font-bold px-2.5 py-1 rounded-full whitespace-nowrap">7,6 M dispo</span>
                  </div>
                </div>
                <div className="border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <span className="text-xl mt-0.5">🟢</span>
                    <div className="flex-1">
                      <p className="font-semibold text-emerald-800 dark:text-emerald-300 text-sm">Frais généraux</p>
                      <p className="text-xs text-emerald-700 dark:text-emerald-400 mt-0.5">Budget : 12 M XOF · Réalisé : 5,6 M XOF</p>
                      <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1 italic">Disponible : <span className="font-bold">6,4 M XOF</span></p>
                    </div>
                    <span className="bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-400 text-xs font-bold px-2.5 py-1 rounded-full whitespace-nowrap">6,4 M dispo</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recommandation */}
            <div className="bg-[#1B5E20] text-white rounded-2xl p-5 shadow">
              <p className="text-sm font-semibold text-green-200 mb-1">Recommandation de réallocation</p>
              <p className="text-base font-bold">2 M XOF de Transport → Intrants</p>
              <p className="text-xs text-green-300 mt-1">Pour sécuriser le stock de KCl avant la récolte et absorber la hausse de prix mondiale</p>
            </div>
          </div>
        )}

        {/* ── RÉVISIONS ── */}
        {tab === "revisions" && (
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800">
              <h2 className="text-base font-semibold text-gray-900 dark:text-white">Révisions budgétaires 2025</h2>
              <p className="text-xs text-gray-400 mt-0.5">Historique des ajustements validés</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[700px]">
                <thead>
                  <tr className="bg-[#F8FBF8] dark:bg-gray-800 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                    <th className="px-4 py-3 text-left">Date</th>
                    <th className="px-4 py-3 text-left">Rubrique</th>
                    <th className="px-4 py-3 text-right">Budget initial</th>
                    <th className="px-4 py-3 text-right">Après révision</th>
                    <th className="px-4 py-3 text-left">Motif</th>
                    <th className="px-4 py-3 text-left">Validé par</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {revisions.map((r) => (
                    <tr key={r.date + r.rubrique} className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                      <td className="px-4 py-3 text-gray-500 dark:text-gray-400 text-xs whitespace-nowrap">{r.date}</td>
                      <td className="px-4 py-3 font-medium text-gray-800 dark:text-gray-200">{r.rubrique}</td>
                      <td className="px-4 py-3 text-right text-gray-600 dark:text-gray-400">{r.initial}</td>
                      <td className="px-4 py-3 text-right font-semibold text-blue-600 dark:text-blue-400">{r.revision}</td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-400 text-xs">{r.motif}</td>
                      <td className="px-4 py-3 text-xs text-gray-500 dark:text-gray-400">{r.validePar}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
