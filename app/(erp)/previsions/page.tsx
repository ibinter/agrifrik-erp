"use client";

import { useState } from "react";
import Topbar from "../../components/Topbar";

/* ─── Types ─────────────────────────────────────────────────────────────────── */

type Tab = "annuel" | "tresorerie" | "scenarios" | "hypotheses";

/* ─── KPIs ───────────────────────────────────────────────────────────────────── */

const KPIS = [
  {
    label: "CA prévu 2025",
    val: "285 – 310 M XOF",
    color: "text-[#2E7D32]",
    sub: "Fourchette de prévision",
  },
  {
    label: "EBITDA prévu",
    val: "72 – 82 M XOF",
    color: "text-indigo-600",
    sub: "Marge EBITDA 24 – 27%",
  },
  {
    label: "Résultat prévu",
    val: "28 – 34 M XOF",
    color: "text-blue-600",
    sub: "Après impôt BIC 25%",
  },
  {
    label: "Fiabilité modèle",
    val: "87%",
    color: "text-amber-600",
    sub: "Basé sur 3 ans historique",
  },
];

/* ─── Compte de résultat prévisionnel ─────────────────────────────────────── */

interface CR {
  label: string;
  bold?: boolean;
  s1: string;
  s2: string;
  total: string;
  budget: string;
  ecart: string;
  ok?: boolean | null; // true=vert, false=rouge, null=neutre
}

const CR_ROWS: CR[] = [
  { label: "Chiffre d'affaires",     s1: "145,2 M", s2: "152,4 M", total: "297,6 M", budget: "280,0 M", ecart: "+17,6 M", ok: true },
  { label: "Charges variables",       s1: "(63,8 M)", s2: "(67,2 M)", total: "(131,0 M)", budget: "(126,0 M)", ecart: "-5,0 M",  ok: false },
  { label: "Marge brute",             bold: true, s1: "81,4 M", s2: "85,2 M", total: "166,6 M", budget: "154,0 M", ecart: "+12,6 M", ok: true },
  { label: "Charges personnel",       s1: "(21,2 M)", s2: "(22,4 M)", total: "(43,6 M)", budget: "(44,0 M)", ecart: "+0,4 M",  ok: true },
  { label: "Charges externes",        s1: "(12,4 M)", s2: "(11,8 M)", total: "(24,2 M)", budget: "(25,0 M)", ecart: "+0,8 M",  ok: true },
  { label: "Amortissements",          s1: "(9,2 M)", s2: "(9,2 M)", total: "(18,4 M)", budget: "(18,4 M)", ecart: "0",        ok: null },
  { label: "EBITDA",                  bold: true, s1: "38,6 M", s2: "41,8 M", total: "80,4 M", budget: "66,6 M", ecart: "+13,8 M", ok: true },
  { label: "Charges financières",     s1: "(2,1 M)", s2: "(2,1 M)", total: "(4,2 M)", budget: "(4,5 M)", ecart: "+0,3 M",  ok: true },
  { label: "Résultat avant impôt",    bold: true, s1: "22,8 M", s2: "24,4 M", total: "47,2 M", budget: "32,0 M", ecart: "+15,2 M", ok: true },
  { label: "Impôt BIC 25%",           s1: "(5,7 M)", s2: "(6,1 M)", total: "(11,8 M)", budget: "(8,0 M)", ecart: "—",       ok: null },
  { label: "Résultat net",            bold: true, s1: "17,1 M", s2: "18,3 M", total: "35,4 M", budget: "24,0 M", ecart: "+11,4 M", ok: true },
];

/* ─── SVG Bar chart CA mensuel S2 ────────────────────────────────────────── */

const S2_CA = [
  { mois: "Juil", val: 22.4 },
  { mois: "Aoû",  val: 18.2 },
  { mois: "Sep",  val: 24.6 },
  { mois: "Oct",  val: 38.4 },
  { mois: "Nov",  val: 32.8 },
  { mois: "Déc",  val: 16.0 },
];

const MAX_CA = 42;
const SVG_H  = 160;
const SVG_W  = 520;
const BAR_W  = 48;
const BAR_GAP = 32;
const CHART_H = 110;
const CHART_Y = 20;

function CaBarChart() {
  const total = S2_CA.length;
  const step  = (SVG_W - 60) / total;
  return (
    <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} className="w-full" aria-label="Évolution prévue CA mensuel S2 2025">
      {/* Grid lines */}
      {[0, 0.25, 0.5, 0.75, 1].map((t) => {
        const y = CHART_Y + CHART_H * (1 - t);
        return (
          <g key={t}>
            <line x1={40} y1={y} x2={SVG_W - 10} y2={y} stroke="#e5e7eb" strokeWidth="1" />
            <text x={36} y={y + 4} textAnchor="end" fontSize={9} fill="#9ca3af">
              {(MAX_CA * t).toFixed(0)} M
            </text>
          </g>
        );
      })}
      {/* Bars */}
      {S2_CA.map((d, i) => {
        const barH  = (d.val / MAX_CA) * CHART_H;
        const x     = 46 + i * step + (step - BAR_W) / 2;
        const y     = CHART_Y + CHART_H - barH;
        const confH = barH * 0.12;
        return (
          <g key={d.mois}>
            {/* Confidence shadow */}
            <rect x={x - 3} y={y - confH} width={BAR_W + 6} height={barH + confH} rx={3} fill="#93c5fd" fillOpacity={0.25} />
            {/* Bar */}
            <rect x={x} y={y} width={BAR_W} height={barH} rx={3} fill="#3b82f6" />
            {/* Value */}
            <text x={x + BAR_W / 2} y={y - 4} textAnchor="middle" fontSize={9} fill="#1d4ed8" fontWeight="600">
              {d.val} M
            </text>
            {/* Month label */}
            <text x={x + BAR_W / 2} y={CHART_Y + CHART_H + 14} textAnchor="middle" fontSize={10} fill="#6b7280">
              {d.mois}
            </text>
          </g>
        );
      })}
      {/* Axes */}
      <line x1={40} y1={CHART_Y} x2={40} y2={CHART_Y + CHART_H} stroke="#d1d5db" strokeWidth="1" />
      <line x1={40} y1={CHART_Y + CHART_H} x2={SVG_W - 10} y2={CHART_Y + CHART_H} stroke="#d1d5db" strokeWidth="1" />
    </svg>
  );
}

/* ─── Trésorerie ─────────────────────────────────────────────────────────── */

interface TresoRow {
  mois: string;
  enc: string;
  dec: string;
  flux: string;
  debut: string;
  fin: string;
  ok: boolean;
  note?: string;
}

const TRESO_ROWS: TresoRow[] = [
  { mois: "Juil 2025", enc: "22,4 M", dec: "18,2 M", flux: "+4,2 M",  debut: "34,2 M", fin: "38,4 M", ok: true },
  { mois: "Aoû 2025",  enc: "18,2 M", dec: "14,8 M", flux: "+3,4 M",  debut: "38,4 M", fin: "41,8 M", ok: true },
  { mois: "Sep 2025",  enc: "24,6 M", dec: "28,4 M", flux: "-3,8 M",  debut: "41,8 M", fin: "38,0 M", ok: false, note: "Achats récolte" },
  { mois: "Oct 2025",  enc: "38,4 M", dec: "22,4 M", flux: "+16,0 M", debut: "38,0 M", fin: "54,0 M", ok: true },
  { mois: "Nov 2025",  enc: "32,8 M", dec: "18,6 M", flux: "+14,2 M", debut: "54,0 M", fin: "68,2 M", ok: true },
  { mois: "Déc 2025",  enc: "16,0 M", dec: "24,8 M", flux: "-8,8 M",  debut: "68,2 M", fin: "59,4 M", ok: true, note: "Dividendes + impôt" },
];

const TRESO_VALS = [38.4, 41.8, 38.0, 54.0, 68.2, 59.4];

function TresoLineChart() {
  const minVal = 34;
  const maxVal = 72;
  const range  = maxVal - minVal;
  const w      = 500;
  const h      = 120;
  const padX   = 40;
  const padY   = 16;
  const plotW  = w - padX - 10;
  const plotH  = h - padY - 20;

  const pts = TRESO_VALS.map((v, i) => ({
    x: padX + (i / (TRESO_VALS.length - 1)) * plotW,
    y: padY + plotH - ((v - minVal) / range) * plotH,
  }));
  const path = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
  const areaPath = `${path} L${pts[pts.length - 1].x},${padY + plotH} L${pts[0].x},${padY + plotH} Z`;
  const labels   = ["Juil", "Aoû", "Sep", "Oct", "Nov", "Déc"];

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" aria-label="Évolution trésorerie S2 2025">
      {[0, 0.25, 0.5, 0.75, 1].map((t) => {
        const y = padY + plotH * (1 - t);
        const v = (minVal + range * t).toFixed(0);
        return (
          <g key={t}>
            <line x1={padX} y1={y} x2={w - 10} y2={y} stroke="#e5e7eb" strokeWidth="1" />
            <text x={padX - 4} y={y + 3} textAnchor="end" fontSize={9} fill="#9ca3af">{v} M</text>
          </g>
        );
      })}
      <path d={areaPath} fill="#22c55e" fillOpacity={0.08} />
      <path d={path} fill="none" stroke="#16a34a" strokeWidth={2} strokeLinejoin="round" />
      {pts.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r={4} fill={TRESO_VALS[i] < 40 ? "#f59e0b" : "#16a34a"} />
          <text x={p.x} y={p.y - 6} textAnchor="middle" fontSize={9} fill="#15803d" fontWeight="600">
            {TRESO_VALS[i]} M
          </text>
          <text x={p.x} y={padY + plotH + 14} textAnchor="middle" fontSize={10} fill="#6b7280">
            {labels[i]}
          </text>
        </g>
      ))}
      <line x1={padX} y1={padY} x2={padX} y2={padY + plotH} stroke="#d1d5db" strokeWidth="1" />
      <line x1={padX} y1={padY + plotH} x2={w - 10} y2={padY + plotH} stroke="#d1d5db" strokeWidth="1" />
    </svg>
  );
}

/* ─── Scénarios ────────────────────────────────────────────────────────────── */

interface Scenario {
  label: string;
  color: string;
  bg: string;
  pct: string;
  ca: number;
  prix: string;
  prod: string;
  ebitda: number;
  net: number;
}

const SCENARIOS: Scenario[] = [
  { label: "Pessimiste", color: "text-red-700",   bg: "bg-red-50",    pct: "15%", ca: 248, prix: "980 XOF/kg",   prod: "78 t",  ebitda: 52, net: 18 },
  { label: "Central",    color: "text-[#2E7D32]", bg: "bg-green-50",  pct: "65%", ca: 297, prix: "1 100 XOF/kg", prod: "94 t",  ebitda: 80, net: 35 },
  { label: "Optimiste",  color: "text-blue-700",  bg: "bg-blue-50",   pct: "20%", ca: 342, prix: "1 280 XOF/kg", prod: "112 t", ebitda: 98, net: 52 },
];

function ScenarioChart() {
  const maxCA = 360;
  const w     = 420;
  const h     = 140;
  const padX  = 40;
  const padY  = 16;
  const plotH = h - padY - 22;
  const groupW = (w - padX - 10) / SCENARIOS.length;
  const barW  = 28;
  const colors = { ca: ["#fca5a5", "#86efac", "#93c5fd"], net: ["#ef4444", "#16a34a", "#3b82f6"] };

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" aria-label="Comparaison scénarios">
      {[0, 0.25, 0.5, 0.75, 1].map((t) => {
        const y = padY + plotH * (1 - t);
        return (
          <g key={t}>
            <line x1={padX} y1={y} x2={w - 10} y2={y} stroke="#e5e7eb" strokeWidth="1" />
            <text x={padX - 4} y={y + 3} textAnchor="end" fontSize={8} fill="#9ca3af">{(maxCA * t).toFixed(0)} M</text>
          </g>
        );
      })}
      {SCENARIOS.map((s, i) => {
        const cx = padX + i * groupW + groupW / 2;
        const caH  = (s.ca / maxCA) * plotH;
        const netH = (s.net / maxCA) * plotH;
        return (
          <g key={s.label}>
            <rect x={cx - barW - 2} y={padY + plotH - caH}  width={barW} height={caH}  rx={3} fill={colors.ca[i]} />
            <rect x={cx + 2}        y={padY + plotH - netH} width={barW} height={netH} rx={3} fill={colors.net[i]} />
            <text x={cx} y={padY + plotH + 14} textAnchor="middle" fontSize={10} fill="#374151" fontWeight="600">{s.label}</text>
            <text x={cx - barW / 2 - 2} y={padY + plotH - caH - 3} textAnchor="middle" fontSize={8} fill="#6b7280">{s.ca} M</text>
            <text x={cx + barW / 2 + 2} y={padY + plotH - netH - 3} textAnchor="middle" fontSize={8} fill={colors.net[i]}>{s.net} M</text>
          </g>
        );
      })}
      <line x1={padX} y1={padY} x2={padX} y2={padY + plotH} stroke="#d1d5db" strokeWidth="1" />
      <line x1={padX} y1={padY + plotH} x2={w - 10} y2={padY + plotH} stroke="#d1d5db" strokeWidth="1" />
      {/* Legend */}
      <rect x={padX} y={h - 10} width={10} height={8} rx={2} fill="#86efac" />
      <text x={padX + 13} y={h - 3} fontSize={8} fill="#6b7280">CA (barres claires)</text>
      <rect x={padX + 110} y={h - 10} width={10} height={8} rx={2} fill="#16a34a" />
      <text x={padX + 123} y={h - 3} fontSize={8} fill="#6b7280">Résultat net</text>
    </svg>
  );
}

/* ─── Hypothèses ─────────────────────────────────────────────────────────── */

interface Hyp {
  variable: string;
  valeur: string;
  source: string;
  impact: string;
  sensibilite: string;
}

const HYPOTHESES: Hyp[] = [
  { variable: "Cours cacao AA",          valeur: "1 100 XOF/kg", source: "BCC Abidjan + Reuters",    impact: "Fort",   sensibilite: "±1% prix = ±2,1 M XOF CA" },
  { variable: "Volume production cacao", valeur: "94 t",          source: "Planning cultural + IA",   impact: "Fort",   sensibilite: "±1 t = ±1,1 M XOF" },
  { variable: "Cours anacarde WW240",    valeur: "680 XOF/kg",    source: "INC",                      impact: "Modéré", sensibilite: "±1% = ±0,3 M XOF" },
  { variable: "Taux croissance effectif",valeur: "+4,2%",          source: "RH — recrutements prévus", impact: "Faible", sensibilite: "±1 recrutement = ±150 000 XOF" },
  { variable: "Taux inflation CI",       valeur: "3,5%",           source: "BCEAO",                    impact: "Modéré", sensibilite: "Impact charges +1,4 M" },
  { variable: "Taux crédit BICICI",      valeur: "8,5%",           source: "BICICI",                   impact: "Faible", sensibilite: "±1% = ±420 000 XOF" },
];

const IMPACT_COLOR: Record<string, string> = {
  Fort:   "bg-red-100 text-red-700",
  Modéré: "bg-amber-100 text-amber-700",
  Faible: "bg-gray-100 text-gray-600",
};

/* ─── Composant principal ────────────────────────────────────────────────── */

export default function PrevisionsPage() {
  const [tab, setTab] = useState<Tab>("annuel");

  const TABS: { key: Tab; label: string }[] = [
    { key: "annuel",      label: "Prévisions annuelles" },
    { key: "tresorerie",  label: "Flux de trésorerie" },
    { key: "scenarios",   label: "Scénarios" },
    { key: "hypotheses",  label: "Hypothèses" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Topbar title="Prévisions & Projections" breadcrumb={["Finance", "Prévisions"]} />

      <main className="flex-1 p-6 space-y-6">
        {/* ── KPIs ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {KPIS.map((k) => (
            <div
              key={k.label}
              className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm"
            >
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{k.label}</p>
              <p className={`mt-2 text-xl font-bold ${k.color}`}>{k.val}</p>
              <p className="mt-1 text-xs text-gray-400">{k.sub}</p>
            </div>
          ))}
        </div>

        {/* ── Onglets ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {/* Tab bar */}
          <div className="flex border-b border-gray-100 overflow-x-auto">
            {TABS.map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`px-5 py-3 text-sm font-medium whitespace-nowrap transition-colors border-b-2 -mb-px ${
                  tab === t.key
                    ? "border-[#2E7D32] text-[#2E7D32]"
                    : "border-transparent text-gray-500 hover:text-gray-800"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* ── Prévisions annuelles ── */}
          {tab === "annuel" && (
            <div className="p-6 space-y-6">
              <div>
                <h2 className="text-base font-semibold text-gray-900 mb-1">
                  Résultats prévisionnels 2025
                </h2>
                <p className="text-xs text-gray-500 mb-4">
                  Compte de résultat prévisionnel consolidé — en millions XOF
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm min-w-[700px]">
                    <thead>
                      <tr className="bg-[#F8FBF8] text-xs font-semibold text-gray-600">
                        <th className="px-4 py-2.5 text-left">Libellé</th>
                        <th className="px-4 py-2.5 text-right">Réalisé S1</th>
                        <th className="px-4 py-2.5 text-right">Prévision S2</th>
                        <th className="px-4 py-2.5 text-right font-bold">Total 2025</th>
                        <th className="px-4 py-2.5 text-right">Budget 2025</th>
                        <th className="px-4 py-2.5 text-right">Écart</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {CR_ROWS.map((row) => (
                        <tr
                          key={row.label}
                          className={`hover:bg-gray-50 transition-colors ${row.bold ? "bg-[#F8FBF8]" : ""}`}
                        >
                          <td className={`px-4 py-2.5 ${row.bold ? "font-bold text-gray-900" : "text-gray-700"}`}>
                            {row.label}
                          </td>
                          <td className="px-4 py-2.5 text-right text-gray-600">{row.s1}</td>
                          <td className="px-4 py-2.5 text-right text-gray-600">{row.s2}</td>
                          <td className={`px-4 py-2.5 text-right ${row.bold ? "font-bold text-gray-900" : "text-gray-700"}`}>
                            {row.total}
                          </td>
                          <td className="px-4 py-2.5 text-right text-gray-500">{row.budget}</td>
                          <td className="px-4 py-2.5 text-right">
                            {row.ok === null ? (
                              <span className="text-gray-400">{row.ecart}</span>
                            ) : row.ok ? (
                              <span className="text-[#2E7D32] font-medium">{row.ecart} ✅</span>
                            ) : (
                              <span className="text-amber-600 font-medium">{row.ecart} ⚠️</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* SVG Bar chart */}
              <div>
                <h3 className="text-sm font-semibold text-gray-800 mb-1">
                  Évolution prévue CA mensuel — S2 2025
                </h3>
                <p className="text-xs text-gray-400 mb-3">
                  En millions XOF. Les barres claires indiquent l&apos;intervalle de confiance à ±12%. Pic Oct–Nov = récolte principale cacao.
                </p>
                <CaBarChart />
              </div>
            </div>
          )}

          {/* ── Flux de trésorerie ── */}
          {tab === "tresorerie" && (
            <div className="p-6 space-y-6">
              <div>
                <h2 className="text-base font-semibold text-gray-900 mb-1">
                  Prévision de trésorerie — S2 2025
                </h2>
                <p className="text-xs text-gray-500 mb-4">En millions XOF</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm min-w-[700px]">
                    <thead>
                      <tr className="bg-[#F8FBF8] text-xs font-semibold text-gray-600">
                        <th className="px-4 py-2.5 text-left">Mois</th>
                        <th className="px-4 py-2.5 text-right">Encaissements</th>
                        <th className="px-4 py-2.5 text-right">Décaissements</th>
                        <th className="px-4 py-2.5 text-right">Flux net</th>
                        <th className="px-4 py-2.5 text-right">Tréso début</th>
                        <th className="px-4 py-2.5 text-right font-bold">Tréso fin</th>
                        <th className="px-4 py-2.5 text-left">Note</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {TRESO_ROWS.map((r) => (
                        <tr key={r.mois} className="hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-2.5 font-medium text-gray-800">{r.mois}</td>
                          <td className="px-4 py-2.5 text-right text-[#2E7D32]">{r.enc}</td>
                          <td className="px-4 py-2.5 text-right text-gray-600">{r.dec}</td>
                          <td className={`px-4 py-2.5 text-right font-medium ${r.flux.startsWith("-") ? "text-amber-600" : "text-[#2E7D32]"}`}>
                            {r.flux}
                          </td>
                          <td className="px-4 py-2.5 text-right text-gray-500">{r.debut}</td>
                          <td className={`px-4 py-2.5 text-right font-bold ${r.ok ? "text-[#2E7D32]" : "text-amber-600"}`}>
                            {r.fin} {r.ok ? "✅" : "⚠️"}
                          </td>
                          <td className="px-4 py-2.5 text-xs text-gray-400">{r.note ?? "—"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Line chart */}
              <div>
                <h3 className="text-sm font-semibold text-gray-800 mb-1">
                  Évolution de la trésorerie S2 2025
                </h3>
                <p className="text-xs text-gray-400 mb-3">Solde de fin de mois en millions XOF</p>
                <TresoLineChart />
              </div>

              {/* Alerte */}
              <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl">
                <span className="text-lg mt-0.5">🟡</span>
                <div>
                  <p className="text-sm font-semibold text-amber-800">Alerte trésorerie — Septembre 2025</p>
                  <p className="text-xs text-amber-700 mt-0.5">
                    Flux négatif prévu (-3,8 M) lié aux achats pré-récolte (intrants, main d&apos;œuvre).
                    La trésorerie reste confortable (38 M XOF). Aucune action requise.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ── Scénarios ── */}
          {tab === "scenarios" && (
            <div className="p-6 space-y-6">
              <div>
                <h2 className="text-base font-semibold text-gray-900 mb-1">Analyse de scénarios 2025</h2>
                <p className="text-xs text-gray-500 mb-4">
                  Espérance mathématique : 0,15 × 248 + 0,65 × 297 + 0,20 × 342 ={" "}
                  <span className="font-bold text-[#2E7D32]">300,7 M XOF</span>
                </p>

                {/* Scénario cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  {SCENARIOS.map((s) => (
                    <div key={s.label} className={`rounded-xl border p-5 ${s.bg}`}>
                      <div className="flex items-center justify-between mb-3">
                        <h3 className={`text-sm font-bold ${s.color}`}>{s.label}</h3>
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full bg-white/70 ${s.color}`}>
                          P = {s.pct}
                        </span>
                      </div>
                      <div className="space-y-1.5 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">CA 2025</span>
                          <span className={`font-bold ${s.color}`}>{s.ca} M XOF</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Prix cacao</span>
                          <span className="text-gray-800 font-medium">{s.prix}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Production</span>
                          <span className="text-gray-800 font-medium">{s.prod}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">EBITDA</span>
                          <span className="text-gray-800 font-medium">{s.ebitda} M XOF</span>
                        </div>
                        <div className="flex justify-between border-t border-white/60 pt-1.5 mt-1.5">
                          <span className="text-gray-700 font-medium">Résultat net</span>
                          <span className={`font-bold ${s.color}`}>{s.net} M XOF</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tableau comparatif */}
                <div className="overflow-x-auto mb-6">
                  <table className="w-full text-sm min-w-[500px]">
                    <thead>
                      <tr className="bg-[#F8FBF8] text-xs font-semibold text-gray-600">
                        <th className="px-4 py-2.5 text-left">Indicateur</th>
                        <th className="px-4 py-2.5 text-right text-red-700">Pessimiste</th>
                        <th className="px-4 py-2.5 text-right text-[#2E7D32]">Central (base)</th>
                        <th className="px-4 py-2.5 text-right text-blue-700">Optimiste</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {[
                        ["CA 2025", "248 M XOF", "297 M XOF", "342 M XOF"],
                        ["Prix cacao", "980 XOF/kg", "1 100 XOF/kg", "1 280 XOF/kg"],
                        ["Production", "78 t", "94 t", "112 t"],
                        ["EBITDA", "52 M XOF", "80 M XOF", "98 M XOF"],
                        ["Résultat net", "18 M XOF", "35 M XOF", "52 M XOF"],
                        ["Probabilité", "15%", "65%", "20%"],
                      ].map(([ind, p, c, o]) => (
                        <tr key={ind} className="hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-2.5 text-gray-700">{ind}</td>
                          <td className="px-4 py-2.5 text-right text-red-700 font-medium">{p}</td>
                          <td className="px-4 py-2.5 text-right text-[#2E7D32] font-medium">{c}</td>
                          <td className="px-4 py-2.5 text-right text-blue-700 font-medium">{o}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Bar chart scénarios */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-800 mb-3">
                    Comparaison CA / Résultat net par scénario
                  </h3>
                  <ScenarioChart />
                </div>

                {/* Hypothèses scénarios */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="p-4 bg-red-50 border border-red-100 rounded-xl">
                    <h4 className="text-sm font-semibold text-red-800 mb-2">Hypothèses pessimistes</h4>
                    <ul className="text-xs text-red-700 space-y-1">
                      <li>• Cours cacao repli -12% (980 XOF/kg)</li>
                      <li>• Pluies déficitaires -25% sur zone production</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl">
                    <h4 className="text-sm font-semibold text-blue-800 mb-2">Hypothèses optimistes</h4>
                    <ul className="text-xs text-blue-700 space-y-1">
                      <li>• Cours cacao hausse +16% (1 280 XOF/kg)</li>
                      <li>• Nouvelles parcelles bio premium intégrées</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── Hypothèses ── */}
          {tab === "hypotheses" && (
            <div className="p-6">
              <h2 className="text-base font-semibold text-gray-900 mb-1">
                Hypothèses du modèle financier
              </h2>
              <p className="text-xs text-gray-500 mb-4">
                Variables macro et sectorielles retenues pour le modèle de prévision 2025
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm min-w-[700px]">
                  <thead>
                    <tr className="bg-[#F8FBF8] text-xs font-semibold text-gray-600">
                      <th className="px-4 py-2.5 text-left">Variable</th>
                      <th className="px-4 py-2.5 text-right">Valeur retenue</th>
                      <th className="px-4 py-2.5 text-left">Source</th>
                      <th className="px-4 py-2.5 text-center">Impact CA</th>
                      <th className="px-4 py-2.5 text-left">Sensibilité</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {HYPOTHESES.map((h) => (
                      <tr key={h.variable} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 font-medium text-gray-800">{h.variable}</td>
                        <td className="px-4 py-3 text-right font-semibold text-[#2E7D32]">{h.valeur}</td>
                        <td className="px-4 py-3 text-gray-500">{h.source}</td>
                        <td className="px-4 py-3 text-center">
                          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${IMPACT_COLOR[h.impact]}`}>
                            {h.impact}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-xs text-gray-500">{h.sensibilite}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
