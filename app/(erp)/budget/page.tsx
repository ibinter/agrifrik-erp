"use client";

import { useState } from "react";
import Topbar from "../../components/Topbar";

/* ─── données ─── */

const mensuelData = [
  { mois: "Jan", budgetP: 18.0, realisP: 18.2, budgetC: 14.2, realisC: 13.8 },
  { mois: "Fév", budgetP: 22.0, realisP: 22.4, budgetC: 15.8, realisC: 16.2 },
  { mois: "Mar", budgetP: 28.0, realisP: 26.4, budgetC: 18.5, realisC: 17.9 },
  { mois: "Avr", budgetP: 35.0, realisP: 32.8, budgetC: 21.2, realisC: 20.4 },
  { mois: "Mai", budgetP: 42.0, realisP: 41.8, budgetC: 24.8, realisC: 24.2 },
  { mois: "Jun", budgetP: 38.0, realisP: 43.8, budgetC: 22.4, realisC: 23.2 },
  { mois: "Jul", budgetP: 42.0, realisP: null, budgetC: 25.0, realisC: null },
  { mois: "Aoû", budgetP: 38.0, realisP: null, budgetC: 22.0, realisC: null },
  { mois: "Sep", budgetP: 32.0, realisP: null, budgetC: 19.5, realisC: null },
  { mois: "Oct", budgetP: 28.0, realisP: null, budgetC: 17.2, realisC: null },
  { mois: "Nov", budgetP: 22.0, realisP: null, budgetC: 14.8, realisC: null },
  { mois: "Déc", budgetP: 18.0, realisP: null, budgetC: 12.4, realisC: null },
];

const investissements = [
  { label: "Nouveau tracteur JD", budget: 45, engage: 45, realise: 0, source: "Banque SGBCI", statut: "attente-financement" },
  { label: "Extension entrepôt", budget: 12, engage: 12, realise: 4.2, source: "Fonds propres", statut: "en-cours" },
  { label: "Système irrigation", budget: 8, engage: 0, realise: 0, source: "Subvention FAO", statut: "attente-subvention" },
  { label: "Certification GlobalG.A.P", budget: 2.4, engage: 2.4, realise: 2.4, source: "Fonds propres", statut: "realise" },
  { label: "Formation RH", budget: 1.2, engage: 1.2, realise: 1.2, source: "Fonds propres", statut: "realise" },
];

const scenarios = [
  {
    id: "pessimiste",
    label: "Pessimiste",
    hypothese: "Prix cacao -15%, rendement -10%, charges stables",
    ca: 184.2,
    resultat: 18.4,
    prob: 20,
    bg: "bg-red-50 dark:bg-red-950/30",
    border: "border-red-200 dark:border-red-800",
    badge: "bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-400",
  },
  {
    id: "base",
    label: "Base (actuel)",
    hypothese: "Hypothèses 2025 maintenues, récolte normale",
    ca: 245.8,
    resultat: 37.2,
    prob: 60,
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    border: "border-emerald-200 dark:border-emerald-800",
    badge: "bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-400",
  },
  {
    id: "optimiste",
    label: "Optimiste",
    hypothese: "Prix cacao +10%, certification 80% surface, nouveau marché UK",
    ca: 292.4,
    resultat: 58.6,
    prob: 20,
    bg: "bg-blue-50 dark:bg-blue-950/30",
    border: "border-blue-200 dark:border-blue-800",
    badge: "bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-400",
  },
];

/* espérance pondérée */
const esperance =
  scenarios.reduce((acc, s) => acc + s.ca * (s.prob / 100), 0).toFixed(1);

/* ─── helpers ─── */
function fmt(v: number | null) {
  if (v === null) return "—";
  return v.toFixed(1);
}

function ecartProduits(row: typeof mensuelData[0]) {
  if (row.realisP === null) return null;
  return +(row.realisP - row.budgetP).toFixed(1);
}

function resultatRow(row: typeof mensuelData[0]) {
  if (row.realisP === null || row.realisC === null) return null;
  return +(row.realisP - row.realisC).toFixed(1);
}

function statutInvest(s: string) {
  const map: Record<string, { label: string; cls: string }> = {
    "attente-financement": { label: "Attente financement", cls: "bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400" },
    "en-cours": { label: "En cours", cls: "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400" },
    "attente-subvention": { label: "Attente subvention", cls: "bg-yellow-50 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400" },
    "realise": { label: "Réalisé ✅", cls: "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400" },
  };
  return map[s] ?? { label: s, cls: "" };
}

/* ─── composant ─── */
type Tab = "synthese" | "produits" | "charges" | "investissements" | "scenarios";

export default function BudgetPage() {
  const [tab, setTab] = useState<Tab>("synthese");
  const [exercice, setExercice] = useState("2025");

  const tabs: { id: Tab; label: string }[] = [
    { id: "synthese", label: "Synthèse" },
    { id: "produits", label: "Produits" },
    { id: "charges", label: "Charges" },
    { id: "investissements", label: "Investissements" },
    { id: "scenarios", label: "Scénarios" },
  ];

  const kpis = [
    { label: "Budget total 2025", val: "380 M XOF", sub: "Réalisé YTD : 245,8 M XOF", pct: 65, color: "text-indigo-600 dark:text-indigo-400" },
    { label: "Budget produits", val: "280 M XOF", sub: "Réalisé : 185,4 M XOF", pct: 66, color: "text-emerald-600 dark:text-emerald-400" },
    { label: "Budget charges", val: "220 M XOF", sub: "Réalisé : 148,2 M XOF", pct: 67, color: "text-orange-600 dark:text-orange-400" },
    { label: "Résultat budgété", val: "60 M XOF", sub: "Résultat réalisé : 37,2 M XOF", pct: 62, color: "text-blue-600 dark:text-blue-400" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950">
      <Topbar title="Budget" breadcrumb={["Finance", "Budget"]} />

      <main className="flex-1 p-6 space-y-6">
        {/* ── Sélecteur période + onglets ── */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Exercice */}
          <div className="flex items-center gap-2">
            {["2025", "2024"].map((y) => (
              <button
                key={y}
                onClick={() => setExercice(y)}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  exercice === y
                    ? "bg-indigo-600 text-white"
                    : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                }`}
              >
                {y}
              </button>
            ))}
            <button className="px-4 py-1.5 rounded-lg text-sm font-medium bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-dashed border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              + Nouvel exercice
            </button>
          </div>

          {/* Onglets */}
          <div className="flex gap-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-1">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                  tab === t.id
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* ══ SYNTHÈSE ══ */}
        {tab === "synthese" && (
          <div className="space-y-6">
            {/* KPIs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
              {kpis.map((k) => (
                <div key={k.label} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5 shadow-sm">
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">{k.label}</p>
                  <p className={`mt-2 text-2xl font-bold ${k.color}`}>{k.val}</p>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{k.sub}</p>
                  <div className="mt-3 flex items-center gap-2">
                    <div className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-full h-1.5">
                      <div className="h-1.5 rounded-full bg-indigo-500" style={{ width: `${k.pct}%` }} />
                    </div>
                    <span className="text-xs font-semibold text-gray-600 dark:text-gray-300">{k.pct}%</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Tableau mensuel */}
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800">
                <h2 className="text-base font-semibold text-gray-900 dark:text-white">Budget vs Réalisé par mois</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm min-w-[720px]">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-800/50 text-xs font-semibold text-gray-600 dark:text-gray-300">
                      <th className="px-4 py-3 text-left">Mois</th>
                      <th className="px-4 py-3 text-right">Bdg Produits</th>
                      <th className="px-4 py-3 text-right">Réal. Produits</th>
                      <th className="px-4 py-3 text-right">Écart</th>
                      <th className="px-4 py-3 text-right">Bdg Charges</th>
                      <th className="px-4 py-3 text-right">Réal. Charges</th>
                      <th className="px-4 py-3 text-right">Résultat</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                    {mensuelData.map((row) => {
                      const ecart = ecartProduits(row);
                      const res = resultatRow(row);
                      const isRealise = row.realisP !== null;
                      return (
                        <tr
                          key={row.mois}
                          className={`transition-colors ${isRealise ? "hover:bg-gray-50 dark:hover:bg-gray-800/30" : "opacity-60"}`}
                        >
                          <td className="px-4 py-2.5 font-medium text-gray-900 dark:text-white">{row.mois}</td>
                          <td className="px-4 py-2.5 text-right text-gray-700 dark:text-gray-300">{fmt(row.budgetP)}</td>
                          <td className="px-4 py-2.5 text-right text-gray-700 dark:text-gray-300">{fmt(row.realisP)}</td>
                          <td className={`px-4 py-2.5 text-right font-semibold ${
                            ecart === null ? "text-gray-400 dark:text-gray-600" :
                            ecart >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-red-500 dark:text-red-400"
                          }`}>
                            {ecart === null ? "—" : (ecart >= 0 ? "+" : "") + ecart.toFixed(1)}
                          </td>
                          <td className="px-4 py-2.5 text-right text-gray-700 dark:text-gray-300">{fmt(row.budgetC)}</td>
                          <td className="px-4 py-2.5 text-right text-gray-700 dark:text-gray-300">{fmt(row.realisC)}</td>
                          <td className={`px-4 py-2.5 text-right font-semibold ${
                            res === null ? "text-gray-400 dark:text-gray-600" :
                            res >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-red-500 dark:text-red-400"
                          }`}>
                            {res === null ? "—" : "+" + res.toFixed(1)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ══ PRODUITS ══ */}
        {tab === "produits" && (
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
            <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-4">Budget Produits 2025</h2>
            <div className="space-y-4">
              {[
                { cat: "Cacao", budget: 180, realise: 124, pct: 69 },
                { cat: "Anacarde", budget: 65, realise: 41, pct: 63 },
                { cat: "Maïs & céréales", budget: 18, realise: 12, pct: 67 },
                { cat: "Autres cultures", budget: 12, realise: 7.2, pct: 60 },
                { cat: "Subventions & aides", budget: 5, realise: 1.2, pct: 24 },
              ].map((r) => (
                <div key={r.cat}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-gray-800 dark:text-gray-200">{r.cat}</span>
                    <span className="text-gray-500 dark:text-gray-400">{r.realise} M / {r.budget} M XOF</span>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-full h-3 relative">
                    <div className="h-3 rounded-full bg-emerald-500" style={{ width: `${r.pct}%` }} />
                    <span className="absolute right-2 top-0 text-[10px] font-bold text-white leading-3">{r.pct}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══ CHARGES ══ */}
        {tab === "charges" && (
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
            <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-4">Budget Charges 2025</h2>
            <div className="space-y-4">
              {[
                { cat: "Main d'œuvre & RH", budget: 72, realise: 51.2, pct: 71 },
                { cat: "Intrants agricoles", budget: 48, realise: 30.6, pct: 64 },
                { cat: "Logistique & transport", budget: 32, realise: 21.8, pct: 68 },
                { cat: "Matériels & maintenance", budget: 28, realise: 16.4, pct: 59 },
                { cat: "Frais généraux", budget: 22, realise: 14.8, pct: 67 },
                { cat: "Amortissements", budget: 18, realise: 13.4, pct: 74 },
              ].map((r) => {
                const over = r.pct > 80;
                return (
                  <div key={r.cat}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-gray-800 dark:text-gray-200">{r.cat}</span>
                      <span className={`${over ? "text-orange-600 dark:text-orange-400 font-semibold" : "text-gray-500 dark:text-gray-400"}`}>
                        {r.realise} M / {r.budget} M XOF
                      </span>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-full h-3 relative">
                      <div className={`h-3 rounded-full ${over ? "bg-orange-500" : "bg-indigo-500"}`} style={{ width: `${r.pct}%` }} />
                      <span className="absolute right-2 top-0 text-[10px] font-bold text-white leading-3">{r.pct}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ══ INVESTISSEMENTS ══ */}
        {tab === "investissements" && (
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <h2 className="text-base font-semibold text-gray-900 dark:text-white">Investissements budgétés 2025</h2>
              <span className="text-sm text-gray-500 dark:text-gray-400">Total : 68,6 M XOF</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[820px]">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-800/50 text-xs font-semibold text-gray-600 dark:text-gray-300">
                    <th className="px-4 py-3 text-left">Désignation</th>
                    <th className="px-4 py-3 text-right">Budget</th>
                    <th className="px-4 py-3 text-right">Engagé</th>
                    <th className="px-4 py-3 text-right">Réalisé</th>
                    <th className="px-4 py-3 text-right">Reste</th>
                    <th className="px-4 py-3 text-left">Source financement</th>
                    <th className="px-4 py-3 text-center">Statut</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {investissements.map((inv) => {
                    const reste = +(inv.budget - inv.realise).toFixed(1);
                    const st = statutInvest(inv.statut);
                    return (
                      <tr key={inv.label} className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                        <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{inv.label}</td>
                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">{inv.budget} M</td>
                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">{inv.engage} M</td>
                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">{inv.realise} M</td>
                        <td className={`px-4 py-3 text-right font-semibold ${reste > 0 ? "text-orange-600 dark:text-orange-400" : "text-emerald-600 dark:text-emerald-400"}`}>
                          {reste} M
                        </td>
                        <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{inv.source}</td>
                        <td className="px-4 py-3 text-center">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${st.cls}`}>
                            {st.label}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ══ SCÉNARIOS ══ */}
        {tab === "scenarios" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {scenarios.map((sc) => (
                <div key={sc.id} className={`rounded-xl border p-5 ${sc.bg} ${sc.border}`}>
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-gray-900 dark:text-white text-base">{sc.label}</h3>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${sc.badge}`}>
                      {sc.prob}%
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">{sc.hypothese}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">CA prévu</span>
                      <span className="text-sm font-bold text-gray-900 dark:text-white">{sc.ca} M XOF</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Résultat</span>
                      <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{sc.resultat} M XOF</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Marge</span>
                      <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                        {((sc.resultat / sc.ca) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Graphique espérance */}
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
              <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1">Espérance mathématique</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">Pondération par probabilité des 3 scénarios</p>

              <svg viewBox="0 0 600 160" className="w-full" aria-label="Graphique espérance">
                {/* axe */}
                <line x1="40" y1="130" x2="580" y2="130" stroke="currentColor" strokeWidth="1" className="text-gray-300 dark:text-gray-700" />

                {/* plages CA */}
                {(() => {
                  const min = 150;
                  const max = 330;
                  const range = max - min;
                  const toX = (v: number) => 40 + ((v - min) / range) * 540;

                  const bars = [
                    { label: "Pessimiste", val: 184.2, color: "#ef4444", labelColor: "#ef4444", y: 40 },
                    { label: "Base", val: 245.8, color: "#10b981", labelColor: "#10b981", y: 75 },
                    { label: "Optimiste", val: 292.4, color: "#3b82f6", labelColor: "#3b82f6", y: 110 },
                  ];

                  return (
                    <>
                      {bars.map((b) => (
                        <g key={b.label}>
                          <rect x={40} y={b.y - 10} width={toX(b.val) - 40} height={20} fill={b.color} fillOpacity={0.2} rx={4} />
                          <rect x={40} y={b.y - 10} width={toX(b.val) - 40} height={20} fill={b.color} fillOpacity={0} rx={4} stroke={b.color} strokeWidth={1} />
                          <rect x={toX(b.val) - 4} y={b.y - 10} width={8} height={20} fill={b.color} rx={2} />
                          <text x={toX(b.val) + 8} y={b.y + 5} fill={b.color} fontSize={11} fontWeight="600">
                            {b.val} M
                          </text>
                          <text x={34} y={b.y + 5} fill="currentColor" fontSize={10} textAnchor="end" className="fill-gray-500 dark:fill-gray-400">
                            {b.label}
                          </text>
                        </g>
                      ))}

                      {/* Espérance */}
                      <line
                        x1={toX(parseFloat(esperance))}
                        y1={20}
                        x2={toX(parseFloat(esperance))}
                        y2={130}
                        stroke="#6366f1"
                        strokeWidth={2}
                        strokeDasharray="4,3"
                      />
                      <text x={toX(parseFloat(esperance))} y={14} fill="#6366f1" fontSize={11} fontWeight="700" textAnchor="middle">
                        Espérance : {esperance} M XOF
                      </text>
                    </>
                  );
                })()}
              </svg>

              <div className="mt-4 p-4 bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 rounded-lg">
                <p className="text-sm font-semibold text-indigo-700 dark:text-indigo-300">
                  CA attendu (pondéré) : {esperance} M XOF
                </p>
                <p className="text-xs text-indigo-600 dark:text-indigo-400 mt-0.5">
                  = 184,2 × 20% + 245,8 × 60% + 292,4 × 20%
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
