"use client";

import { useState } from "react";
import Topbar from "../../components/Topbar";
import { Thermometer, Droplets, Package, ArrowUpRight, ArrowDownRight } from "lucide-react";

/* ─── SVG Occupation barres horizontales ─── */
function SvgOccupation() {
  const W = 640;
  const H = 160;
  const padL = 160;
  const padR = 80;
  const barH = 28;
  const gap = 40;
  const maxW = W - padL - padR;

  const bars = [
    { label: "ENT-001 Principal", pct: 39.4, value: "23,6t / 60t", color: "#2E7D32" },
    { label: "ENT-002 Matériels", pct: 68.0, value: "68% (estimation)", color: "#E65100" },
  ];

  return (
    <div className="rounded-2xl border border-gray-100 bg-white dark:bg-gray-900 dark:border-gray-800 p-5">
      <h3 className="mb-4 text-sm font-semibold text-gray-700 dark:text-gray-200">Occupation des entrepôts</h3>
      <div className="overflow-x-auto">
        <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} xmlns="http://www.w3.org/2000/svg">
          {bars.map((bar, i) => {
            const y = 30 + i * (barH + gap);
            const bw = (bar.pct / 100) * maxW;
            return (
              <g key={bar.label}>
                <text x={padL - 12} y={y + barH / 2 + 4} fontSize="12" textAnchor="end" fill="#6B7280">{bar.label}</text>
                {/* Track */}
                <rect x={padL} y={y} width={maxW} height={barH} rx="6" fill="#F3F4F6" />
                {/* Fill */}
                <rect x={padL} y={y} width={bw} height={barH} rx="6" fill={bar.color} opacity="0.85" />
                {/* % label */}
                <text x={padL + bw + 10} y={y + barH / 2 + 4} fontSize="12" fill={bar.color} fontWeight="bold">{bar.pct}%</text>
                <text x={padL + bw + 52} y={y + barH / 2 + 4} fontSize="10" fill="#9CA3AF">{bar.value}</text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}

/* ─── SVG T° et HR dual-line ─── */
function SvgConditionsStockage() {
  const W = 640;
  const H = 160;
  const padL = 44;
  const padR = 20;
  const padT = 16;
  const padB = 32;
  const chartW = W - padL - padR;
  const chartH = H - padT - padB;

  const jours = ["J-6", "J-5", "J-4", "J-3", "J-2", "J-1", "Auj."];
  const temp = [27.4, 28.0, 27.8, 28.5, 28.2, 27.9, 28.2];
  const hr = [66, 68, 67, 70, 69, 67, 68];

  const tempMin = 24, tempMax = 32;
  const hrMin = 55, hrMax = 80;

  const scaleX = (i: number) => padL + (i / (jours.length - 1)) * chartW;
  const scaleTemp = (v: number) => padT + chartH - ((v - tempMin) / (tempMax - tempMin)) * chartH;
  const scaleHR = (v: number) => padT + chartH - ((v - hrMin) / (hrMax - hrMin)) * chartH;

  const tempPts = temp.map((v, i) => `${scaleX(i)},${scaleTemp(v)}`).join(" ");
  const hrPts = hr.map((v, i) => `${scaleX(i)},${scaleHR(v)}`).join(" ");

  // Zone optimale T° (26–30°C)
  const yOptTempTop = scaleTemp(30);
  const yOptTempBot = scaleTemp(26);
  // Zone optimale HR (60–75%)
  const yOptHRTop = scaleHR(75);
  const yOptHRBot = scaleHR(60);

  return (
    <div className="rounded-2xl border border-gray-100 bg-white dark:bg-gray-900 dark:border-gray-800 p-5">
      <h3 className="mb-1 text-sm font-semibold text-gray-700 dark:text-gray-200">Conditions de stockage ENT-001 — T° et HR (7 derniers jours)</h3>
      <p className="mb-4 text-xs text-gray-400">Zones optimales en vert</p>
      <div className="overflow-x-auto">
        <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} xmlns="http://www.w3.org/2000/svg">
          {/* Zone optimale T° */}
          <rect x={padL} y={yOptTempTop} width={chartW} height={yOptTempBot - yOptTempTop} fill="#4CAF50" opacity="0.08" />
          {/* Zone optimale HR */}
          <rect x={padL} y={yOptHRTop} width={chartW} height={yOptHRBot - yOptHRTop} fill="#2196F3" opacity="0.08" />

          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((f) => (
            <line key={f} x1={padL} y1={padT + chartH * (1 - f)} x2={W - padR} y2={padT + chartH * (1 - f)} stroke="#F3F4F6" strokeWidth="1" />
          ))}

          {/* T° line */}
          <polyline points={tempPts} fill="none" stroke="#E65100" strokeWidth="2" strokeLinejoin="round" />
          {temp.map((v, i) => (
            <circle key={i} cx={scaleX(i)} cy={scaleTemp(v)} r="3.5" fill="#E65100" stroke="white" strokeWidth="1.5" />
          ))}

          {/* HR line */}
          <polyline points={hrPts} fill="none" stroke="#1565C0" strokeWidth="2" strokeLinejoin="round" strokeDasharray="5 3" />
          {hr.map((v, i) => (
            <circle key={i} cx={scaleX(i)} cy={scaleHR(v)} r="3.5" fill="#1565C0" stroke="white" strokeWidth="1.5" />
          ))}

          {/* X labels */}
          {jours.map((j, i) => (
            <text key={j} x={scaleX(i)} y={H - 8} fontSize="9.5" textAnchor="middle" fill="#9CA3AF">{j}</text>
          ))}

          {/* T° values (top label on last point) */}
          <text x={scaleX(6) + 6} y={scaleTemp(temp[6]) - 5} fontSize="9.5" fill="#E65100" fontWeight="bold">{temp[6]}°C</text>
          <text x={scaleX(6) + 6} y={scaleHR(hr[6]) - 5} fontSize="9.5" fill="#1565C0" fontWeight="bold">{hr[6]}%</text>

          {/* Légende */}
          <line x1={padL + 10} y1={H - 18} x2={padL + 26} y2={H - 18} stroke="#E65100" strokeWidth="2" />
          <text x={padL + 30} y={H - 14} fontSize="9" fill="#6B7280">Température (°C)</text>
          <line x1={padL + 130} y1={H - 18} x2={padL + 146} y2={H - 18} stroke="#1565C0" strokeWidth="2" strokeDasharray="5 3" />
          <text x={padL + 150} y={H - 14} fontSize="9" fill="#6B7280">Hygrométrie (%)</text>
        </svg>
      </div>
    </div>
  );
}

/* ─── PAGE ─── */
export default function EntrepotsPage() {
  const [_tab, _setTab] = useState(0);

  const mouvements = [
    { date: "11/07", entrepot: "ENT-001", type: "Entrée séchage", produit: "LOT-047 cacao", qte: "+964 kg", ref: "LOT-2025-047", entree: true },
    { date: "11/07", entrepot: "ENT-001", type: "Sortie export", produit: "Cacao AA BL-008", qte: "−3 400 kg", ref: "LOG-2025-007", entree: false },
    { date: "28/06", entrepot: "ENT-001", type: "Entrée intrants", produit: "KCl 60% (6 sacs)", qte: "+300 kg", ref: "ACH-2025-020", entree: true },
    { date: "02/07", entrepot: "ENT-002", type: "Entrée carburant", produit: "Gasoil 200L fût", qte: "+200 L", ref: "ACH-2025-021", entree: true },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950">
      <Topbar title="Entrepôts" breadcrumb={["Logistique", "Entrepôts"]} />

      <main className="flex-1 p-6 space-y-6">
        {/* En-tête */}
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Entrepôts</h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Espaces de stockage — EXP-001 — Soubré, Région Nawa
            </p>
          </div>
          <button className="bg-[#2E7D32] text-white rounded-xl text-xs font-medium px-4 py-2.5 hover:bg-[#1B5E20] transition-colors">
            + Nouvel entrepôt
          </button>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          {[
            { label: "Entrepôts", value: "2", sub: "ENT-001 + ENT-002", color: "text-gray-900 dark:text-white" },
            { label: "Superficie totale", value: "600 m²", sub: "480 m² + 120 m²", color: "text-[#2E7D32]" },
            { label: "Taux occupation global", value: "39,4%", sub: "ENT-001 cacao sec", color: "text-blue-600 dark:text-blue-400" },
            { label: "Stock total", value: "28,7M XOF", sub: "valeur marchandises", color: "text-orange-600 dark:text-orange-400" },
          ].map((kpi) => (
            <div key={kpi.label} className="rounded-2xl border border-gray-100 bg-white dark:bg-gray-900 dark:border-gray-800 p-5">
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">{kpi.label}</p>
              <p className={`mt-2 text-xl font-bold ${kpi.color}`}>{kpi.value}</p>
              <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">{kpi.sub}</p>
            </div>
          ))}
        </div>

        {/* Section entrepôts actifs */}
        <div>
          <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-4">Entrepôts actifs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* ENT-001 */}
            <div className="rounded-2xl border border-gray-100 bg-white dark:bg-gray-900 dark:border-gray-800 p-5 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#2E7D32] bg-[#E8F5E9] dark:bg-[#1B5E20]/30 px-2 py-0.5 rounded">ENT-001</span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs font-medium">
                      ✅ Opérationnel
                    </span>
                  </div>
                  <h3 className="mt-2 text-base font-bold text-gray-900 dark:text-white">Entrepôt principal cacao</h3>
                </div>
                <Package size={20} className="text-[#2E7D32] mt-1" />
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="rounded-xl bg-gray-50 dark:bg-gray-800 p-3">
                  <p className="text-gray-400 dark:text-gray-500">Superficie</p>
                  <p className="mt-1 font-semibold text-gray-800 dark:text-gray-100">480 m² (24m × 20m)</p>
                </div>
                <div className="rounded-xl bg-gray-50 dark:bg-gray-800 p-3">
                  <p className="text-gray-400 dark:text-gray-500">Capacité nominale</p>
                  <p className="mt-1 font-semibold text-gray-800 dark:text-gray-100">60 tonnes cacao</p>
                </div>
              </div>

              {/* Occupation */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs text-gray-500 dark:text-gray-400">Stock actuel : <span className="font-semibold text-gray-700 dark:text-gray-200">23,6t</span></span>
                  <span className="text-sm font-bold text-[#2E7D32]">39,4%</span>
                </div>
                <div className="h-2.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-[#2E7D32] rounded-full" style={{ width: "39.4%" }} />
                </div>
              </div>

              {/* Conditions */}
              <div className="flex gap-3">
                <div className="flex items-center gap-1.5 rounded-lg bg-green-50 dark:bg-green-900/20 px-3 py-2">
                  <Thermometer size={13} className="text-green-700 dark:text-green-400" />
                  <span className="text-xs font-medium text-green-700 dark:text-green-400">28,2°C ✅</span>
                </div>
                <div className="flex items-center gap-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/20 px-3 py-2">
                  <Droplets size={13} className="text-blue-700 dark:text-blue-400" />
                  <span className="text-xs font-medium text-blue-700 dark:text-blue-400">HR 68% ✅</span>
                </div>
              </div>

              <a
                href="/entrepots/ENT-001"
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#2E7D32] hover:underline"
              >
                Voir détail <ArrowUpRight size={13} />
              </a>
            </div>

            {/* ENT-002 */}
            <div className="rounded-2xl border border-gray-100 bg-white dark:bg-gray-900 dark:border-gray-800 p-5 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-orange-700 bg-orange-50 dark:bg-orange-900/30 dark:text-orange-400 px-2 py-0.5 rounded">ENT-002</span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs font-medium">
                      ✅ Opérationnel
                    </span>
                  </div>
                  <h3 className="mt-2 text-base font-bold text-gray-900 dark:text-white">Hangar matériels & consommables</h3>
                </div>
                <Package size={20} className="text-orange-500 mt-1" />
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="rounded-xl bg-gray-50 dark:bg-gray-800 p-3">
                  <p className="text-gray-400 dark:text-gray-500">Superficie</p>
                  <p className="mt-1 font-semibold text-gray-800 dark:text-gray-100">120 m² (12m × 10m)</p>
                </div>
                <div className="rounded-xl bg-gray-50 dark:bg-gray-800 p-3">
                  <p className="text-gray-400 dark:text-gray-500">Capacité</p>
                  <p className="mt-1 font-semibold text-gray-800 dark:text-gray-100">Matériels + gasoil + consommables</p>
                </div>
              </div>

              {/* Occupation */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs text-gray-500 dark:text-gray-400">Tracteur · HiLux · Remorque · Fûts gasoil</span>
                  <span className="text-sm font-bold text-orange-600">68%</span>
                </div>
                <div className="h-2.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-500 rounded-full" style={{ width: "68%" }} />
                </div>
              </div>

              {/* Conditions */}
              <div className="flex gap-3">
                <div className="flex items-center gap-1.5 rounded-lg bg-amber-50 dark:bg-amber-900/20 px-3 py-2">
                  <Thermometer size={13} className="text-amber-700 dark:text-amber-400" />
                  <span className="text-xs font-medium text-amber-700 dark:text-amber-400">31,5°C (hangar ouvert)</span>
                </div>
                <div className="flex items-center gap-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 px-3 py-2">
                  <Droplets size={13} className="text-gray-500 dark:text-gray-400" />
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-400">HR 72% (normal)</span>
                </div>
              </div>

              <a
                href="/entrepots/ENT-002"
                className="inline-flex items-center gap-1 text-xs font-semibold text-orange-600 hover:underline"
              >
                Voir détail <ArrowUpRight size={13} />
              </a>
            </div>
          </div>
        </div>

        {/* SVG Occupation */}
        <SvgOccupation />

        {/* SVG Conditions stockage */}
        <SvgConditionsStockage />

        {/* Mouvements récents */}
        <div className="rounded-2xl border border-gray-100 bg-white dark:bg-gray-900 dark:border-gray-800 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-800">
            <h2 className="text-sm font-semibold text-gray-800 dark:text-white">Mouvements récents (tous entrepôts)</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#F8FBF8] dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
                  {["Date", "Entrepôt", "Type", "Produit", "Qté", "Référence"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                {mouvements.map((m, i) => (
                  <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="px-4 py-3 text-gray-500 dark:text-gray-400 whitespace-nowrap text-xs">{m.date}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`font-mono text-xs font-semibold px-2 py-0.5 rounded ${
                        m.entrepot === "ENT-001"
                          ? "bg-[#E8F5E9] dark:bg-[#1B5E20]/30 text-[#2E7D32] dark:text-green-400"
                          : "bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400"
                      }`}>{m.entrepot}</span>
                    </td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400 text-xs whitespace-nowrap">{m.type}</td>
                    <td className="px-4 py-3 text-gray-900 dark:text-white font-medium">{m.produit}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        {m.entree
                          ? <ArrowDownRight size={13} className="text-[#2E7D32]" />
                          : <ArrowUpRight size={13} className="text-red-500" />}
                        <span className={`text-xs font-semibold ${m.entree ? "text-[#2E7D32]" : "text-red-500"}`}>{m.qte}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">{m.ref}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
