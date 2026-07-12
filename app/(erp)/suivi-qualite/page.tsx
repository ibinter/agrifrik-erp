"use client";

import Topbar from "../../components/Topbar";
import { useState } from "react";
import { CheckCircle, Clock, AlertTriangle, Award, Droplets, Thermometer, ShieldCheck } from "lucide-react";

// ── Data ──────────────────────────────────────────────────────────────────────

const lots = [
  { cq: "CQ-2025-038", date: "12/01", lot: "LOT-038", cutTest: 92, humidite: 7.6, score: 91, auditeur: "Interne" },
  { cq: "CQ-2025-039", date: "10/02", lot: "LOT-039", cutTest: 91, humidite: 7.8, score: 90, auditeur: "Interne" },
  { cq: "CQ-2025-040", date: "14/03", lot: "LOT-040", cutTest: 93, humidite: 7.4, score: 93, auditeur: "Interne" },
  { cq: "CQ-2025-041", date: "16/04", lot: "LOT-041", cutTest: 95, humidite: 7.2, score: 95, auditeur: "BV Soubré" },
  { cq: "CQ-2025-042", date: "13/05", lot: "LOT-042", cutTest: 94, humidite: 7.5, score: 94, auditeur: "Interne" },
  { cq: "CQ-2025-043", date: "02/06", lot: "LOT-043", cutTest: 96, humidite: 7.1, score: 96, auditeur: "BV Soubré" },
  { cq: "CQ-2025-044", date: "22/06", lot: "LOT-044", cutTest: 95, humidite: 7.4, score: 95, auditeur: "Interne" },
  { cq: "CQ-2025-045", date: "22/06", lot: "LOT-045", cutTest: 94, humidite: 7.3, score: 94, auditeur: "Interne" },
  { cq: "CQ-2025-046", date: "01/07", lot: "LOT-046", cutTest: 97, humidite: 7.2, score: 96, auditeur: "BV Soubré" },
];

// ── SVG Line Chart ─────────────────────────────────────────────────────────────

const gradeValues = [92, 91, 93, 95, 94, 96, 95, 94, 97];
const lotLabels = ["LOT-038", "039", "040", "041", "042", "043", "044", "045", "046"];

const CW = 640, CH = 200, PL = 44, PR = 20, PT = 22, PB = 38;
const plotW = CW - PL - PR;
const plotH = CH - PT - PB;
const minV = 88, maxV = 100;

function xOf(i: number) { return PL + (i / (gradeValues.length - 1)) * plotW; }
function yOf(v: number) { return PT + plotH - ((v - minV) / (maxV - minV)) * plotH; }

const polyline = gradeValues.map((v, i) => `${xOf(i)},${yOf(v)}`).join(" ");
const areaPath =
  `M ${xOf(0)},${yOf(gradeValues[0])} ` +
  gradeValues.map((v, i) => `L ${xOf(i)},${yOf(v)}`).join(" ") +
  ` L ${xOf(gradeValues.length - 1)},${PT + plotH} L ${xOf(0)},${PT + plotH} Z`;

// ── Heatmap ────────────────────────────────────────────────────────────────────

type CellQ = "excellent" | "ok";
// columns: Cut test AA% | Humidité | Moisissures | Fermentation | Score global
const heatmapData: CellQ[][] = [
  ["ok",        "ok", "excellent", "ok", "ok"],
  ["ok",        "ok", "excellent", "ok", "ok"],
  ["ok",        "ok", "excellent", "ok", "ok"],
  ["excellent", "ok", "excellent", "ok", "excellent"],
  ["ok",        "ok", "excellent", "ok", "ok"],
  ["excellent", "ok", "excellent", "ok", "excellent"],
  ["excellent", "ok", "excellent", "ok", "excellent"],
  ["ok",        "ok", "excellent", "ok", "ok"],
  ["excellent", "ok", "excellent", "ok", "excellent"],
];
const heatmapCols = ["Cut test AA%", "Humidité", "Moisissures", "Fermentation", "Score global"];
const heatmapValues: (string | number)[][] = [
  [92, "7,6%", "0%", "50,2°C", "91/100"],
  [91, "7,8%", "0%", "50,6°C", "90/100"],
  [93, "7,4%", "0%", "50,8°C", "93/100"],
  [95, "7,2%", "0%", "51,0°C", "95/100"],
  [94, "7,5%", "0%", "50,9°C", "94/100"],
  [96, "7,1%", "0%", "51,2°C", "96/100"],
  [95, "7,4%", "0%", "51,0°C", "95/100"],
  [94, "7,3%", "0%", "50,8°C", "94/100"],
  [97, "7,2%", "0%", "51,4°C", "96/100"],
];
const heatmapRows = ["LOT-038", "LOT-039", "LOT-040", "LOT-041", "LOT-042", "LOT-043", "LOT-044", "LOT-045", "LOT-046"];

// ── Component ──────────────────────────────────────────────────────────────────

export default function SuiviQualitePage() {
  const [tab, setTab] = useState<"liste" | "heatmap">("liste");
  const threshY = yOf(95);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Topbar />

      <div className="flex-1 p-6 space-y-6 max-w-7xl mx-auto w-full">

        {/* ── En-tête ── */}
        <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Suivi Qualité</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              Contrôles qualité des lots cacao — Exploitation EXP-001
            </p>
          </div>
          <button className="mt-2 sm:mt-0 self-start bg-[#2E7D32] text-white rounded-xl text-xs font-medium px-4 py-2 hover:bg-[#1B5E20] transition-colors">
            + Nouveau contrôle qualité
          </button>
        </div>

        {/* ── KPIs ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: <ShieldCheck size={18} className="text-[#2E7D32]" />, bg: "bg-green-50", label: "Contrôles 2025", value: "9", sub: "lots contrôlés" },
            { icon: <CheckCircle size={18} className="text-[#2E7D32]" />, bg: "bg-green-50", label: "Conformité", value: "100%", sub: "tous lots conformes" },
            { icon: <Award size={18} className="text-amber-600" />, bg: "bg-amber-50", label: "Grade AA", value: "94,4%", sub: "cut test moyen" },
            { icon: <CheckCircle size={18} className="text-blue-600" />, bg: "bg-blue-50", label: "Lots rejetés", value: "0", sub: "aucun rejet 2025" },
          ].map((k, i) => (
            <div key={i} className="rounded-2xl border border-gray-100 bg-white p-5 flex items-start gap-3">
              <div className={`${k.bg} rounded-xl p-2 shrink-0`}>{k.icon}</div>
              <div>
                <div className="text-xs text-gray-500">{k.label}</div>
                <div className="text-xl font-bold text-gray-900">{k.value}</div>
                <div className="text-xs text-gray-400">{k.sub}</div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Tableau de bord qualité ── */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-semibold text-gray-800 mb-1">Tableau de bord qualité</h2>
          <p className="text-xs text-gray-400 mb-4">Évolution Grade AA% — Lot par lot 2025 · Points verts foncés = au-dessus du seuil RA 95%</p>

          {/* Line chart SVG */}
          <div className="overflow-x-auto">
            <svg width={CW} height={CH} viewBox={`0 0 ${CW} ${CH}`} className="max-w-full">
              {/* Grid */}
              {[90, 92, 94, 96, 98, 100].map((v) => (
                <g key={v}>
                  <line x1={PL} y1={yOf(v)} x2={PL + plotW} y2={yOf(v)} stroke="#f0f0f0" strokeWidth={1} />
                  <text x={PL - 5} y={yOf(v) + 4} textAnchor="end" fontSize={10} fill="#9ca3af">{v}</text>
                </g>
              ))}
              {/* Area */}
              <path d={areaPath} fill="#4CAF50" fillOpacity={0.08} />
              {/* Threshold RA 95% */}
              <line x1={PL} y1={threshY} x2={PL + plotW} y2={threshY} stroke="#ef4444" strokeWidth={1.5} strokeDasharray="6,4" />
              <text x={PL + plotW - 2} y={threshY - 5} textAnchor="end" fontSize={9} fill="#ef4444" fontWeight="600">Seuil RA 95%</text>
              {/* Line */}
              <polyline points={polyline} fill="none" stroke="#2E7D32" strokeWidth={2} strokeLinejoin="round" />
              {/* Points */}
              {gradeValues.map((v, i) => {
                const cx = xOf(i), cy = yOf(v), above = v >= 95;
                return (
                  <g key={i}>
                    <circle cx={cx} cy={cy} r={5} fill={above ? "#1B5E20" : "#4CAF50"} stroke="white" strokeWidth={1.5} />
                    <text x={cx} y={cy - 9} textAnchor="middle" fontSize={9} fill={above ? "#1B5E20" : "#6b7280"} fontWeight={above ? "700" : "400"}>{v}%</text>
                  </g>
                );
              })}
              {/* X axis labels */}
              {lotLabels.map((l, i) => (
                <text key={i} x={xOf(i)} y={CH - 6} textAnchor="middle" fontSize={9} fill="#6b7280">{l}</text>
              ))}
            </svg>
          </div>

          {/* Mini stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5">
            {[
              { icon: <Droplets size={14} className="text-blue-500" />, label: "Humidité moyenne", value: "7,3%", note: "tous lots ≤ 8% ✅" },
              { icon: <Thermometer size={14} className="text-orange-500" />, label: "Fermentation moy. (T° pic)", value: "50,8°C", note: "dans la norme ✅" },
              { icon: <ShieldCheck size={14} className="text-green-600" />, label: "Moisissures", value: "0%", note: "aucun lot rejeté ✅" },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-3 rounded-xl bg-gray-50 px-4 py-3">
                <div className="bg-white rounded-lg p-1.5 shadow-sm shrink-0">{s.icon}</div>
                <div>
                  <div className="text-[11px] text-gray-500">{s.label}</div>
                  <div className="text-sm font-bold text-gray-800">{s.value}</div>
                  <div className="text-[10px] text-gray-400">{s.note}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Tabs : Liste / Heatmap ── */}
        <div className="rounded-2xl border border-gray-100 bg-white">
          <div className="flex border-b border-gray-100">
            {(["liste", "heatmap"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-5 py-3 text-xs font-medium transition-colors ${tab === t ? "border-b-2 border-[#2E7D32] text-[#2E7D32]" : "text-gray-500 hover:text-gray-700"}`}
              >
                {t === "liste" ? "Liste des contrôles 2025" : "Comparatif performances qualité"}
              </button>
            ))}
          </div>

          {/* ── Liste des contrôles ── */}
          {tab === "liste" && (
            <div className="p-5">
              {/* Alerte LOT-047 */}
              <div className="mb-4 flex items-start gap-3 rounded-xl bg-red-50 border border-red-200 px-4 py-3">
                <AlertTriangle size={16} className="text-red-500 mt-0.5 shrink-0" />
                <p className="text-xs text-red-700">
                  <span className="font-semibold">⚠️ Le cut test de LOT-2025-047 est dû aujourd&apos;hui.</span>{" "}
                  Ibrahim Sawadogo doit effectuer ce contrôle avant 12h00.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-[#F8FBF8]">
                      {["N° CQ", "Date", "Lot", "Grade", "Cut test", "Humidité", "Score", "Auditeur", "Statut"].map((h) => (
                        <th key={h} className="px-3 py-2.5 text-left font-semibold text-gray-600 whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {lots.map((row, i) => (
                      <tr key={i} className={`border-t border-gray-50 ${row.cq === "CQ-2025-046" ? "bg-green-50/40 font-medium" : "hover:bg-gray-50"}`}>
                        <td className="px-3 py-2.5 font-mono text-gray-700">{row.cq}</td>
                        <td className="px-3 py-2.5 text-gray-600">{row.date}</td>
                        <td className="px-3 py-2.5 font-medium text-gray-800">{row.lot}</td>
                        <td className="px-3 py-2.5">
                          <span className="inline-flex items-center gap-1 bg-green-100 text-green-800 rounded-full px-2 py-0.5 text-[10px] font-semibold">AA ✅</span>
                        </td>
                        <td className="px-3 py-2.5">
                          <span className={`font-semibold ${row.cutTest >= 95 ? "text-[#2E7D32]" : "text-gray-700"}`}>{row.cutTest}%</span>
                        </td>
                        <td className="px-3 py-2.5 text-gray-700">{row.humidite.toFixed(1)}%</td>
                        <td className="px-3 py-2.5">
                          <span className={`font-semibold ${row.score >= 95 ? "text-[#2E7D32]" : "text-gray-700"}`}>{row.score}/100</span>
                        </td>
                        <td className="px-3 py-2.5 text-gray-600">{row.auditeur}</td>
                        <td className="px-3 py-2.5">
                          <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 rounded-full px-2 py-0.5 text-[10px] font-medium">
                            <CheckCircle size={10} /> Approuvé
                          </span>
                        </td>
                      </tr>
                    ))}
                    {/* LOT-047 en attente */}
                    <tr className="border-t-2 border-red-200 bg-red-50/40">
                      <td className="px-3 py-2.5 text-gray-400 italic text-[11px]">—</td>
                      <td className="px-3 py-2.5">
                        <span className="inline-flex items-center gap-1 bg-red-100 text-red-700 rounded-full px-2 py-0.5 text-[10px] font-bold">🔴 AUJOURD&apos;HUI</span>
                      </td>
                      <td className="px-3 py-2.5 font-semibold text-gray-800">LOT-047</td>
                      <td className="px-3 py-2.5 text-gray-400 text-[11px] italic">En attente</td>
                      <td className="px-3 py-2.5 text-gray-400">—</td>
                      <td className="px-3 py-2.5 text-gray-400">—</td>
                      <td className="px-3 py-2.5 text-gray-400">—</td>
                      <td className="px-3 py-2.5 text-gray-600">Interne</td>
                      <td className="px-3 py-2.5">
                        <span className="inline-flex items-center gap-1 bg-yellow-100 text-yellow-700 rounded-full px-2 py-0.5 text-[10px] font-medium">
                          <Clock size={10} /> À effectuer
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── Heatmap ── */}
          {tab === "heatmap" && (
            <div className="p-5">
              <h3 className="text-xs font-semibold text-gray-700 mb-4">Heatmap paramètres qualité — 9 lots 2025</h3>
              <div className="overflow-x-auto">
                <svg width={680} height={268} viewBox="0 0 680 268" className="max-w-full">
                  {/* Column headers */}
                  {heatmapCols.map((col, ci) => (
                    <text key={ci} x={148 + ci * 106 + 53} y={16} textAnchor="middle" fontSize={10} fontWeight="600" fill="#374151">{col}</text>
                  ))}
                  {heatmapData.map((row, ri) => (
                    <g key={ri}>
                      {/* Row label */}
                      <text x={138} y={30 + ri * 24 + 13} textAnchor="end" fontSize={10} fill="#374151" fontWeight="500">{heatmapRows[ri]}</text>
                      {row.map((quality, ci) => {
                        const x = 148 + ci * 106;
                        const y = 22 + ri * 24;
                        const fill = quality === "excellent" ? "#dcfce7" : "#fef9c3";
                        const color = quality === "excellent" ? "#166534" : "#92400e";
                        return (
                          <g key={ci}>
                            <rect x={x + 2} y={y} width={102} height={22} rx={4} fill={fill} />
                            <text x={x + 53} y={y + 14} textAnchor="middle" fontSize={10} fill={color} fontWeight="600">
                              {String(heatmapValues[ri][ci])}
                            </text>
                          </g>
                        );
                      })}
                    </g>
                  ))}
                  {/* Legend */}
                  <rect x={148} y={250} width={12} height={10} rx={2} fill="#dcfce7" />
                  <text x={164} y={259} fontSize={9} fill="#374151">Excellent (≥ seuil RA)</text>
                  <rect x={290} y={250} width={12} height={10} rx={2} fill="#fef9c3" />
                  <text x={306} y={259} fontSize={9} fill="#374151">Dans la norme</text>
                  <rect x={410} y={250} width={12} height={10} rx={2} fill="#fee2e2" />
                  <text x={426} y={259} fontSize={9} fill="#374151">Hors norme — 0 lot cette année</text>
                </svg>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
