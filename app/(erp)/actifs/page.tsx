"use client";

import { useState } from "react";
import Topbar from "../../components/Topbar";

function fmt(n: number) {
  return n.toLocaleString("fr-FR") + " XOF";
}

const immobilisations = [
  {
    code: "IMM-2008-001",
    designation: "Terrain EXP-001 (18,3 ha)",
    compte: "2211",
    miseEnService: "Jan 2008",
    brute: 14640000,
    amortCumul: 0,
    vnc: 14640000,
    taux: "—",
    amortissable: false,
    categorie: "Terrains & constructions",
  },
  {
    code: "IMM-2021-012",
    designation: "Entrepôt ENT-001 480m²",
    compte: "2313",
    miseEnService: "Fév 2021",
    brute: 22400000,
    amortCumul: 3608890,
    vnc: 18791110,
    taux: "3,33%/30ans",
    amortissable: true,
    categorie: "Terrains & constructions",
  },
  {
    code: "IMM-2021-001",
    designation: "Tracteur JD5055E",
    compte: "2354",
    miseEnService: "Mar 2021",
    brute: 16800000,
    amortCumul: 5040000,
    vnc: 11760000,
    taux: "10%/10ans",
    amortissable: true,
    categorie: "Matériels",
  },
  {
    code: "IMM-2021-002",
    designation: "Toyota HiLux 2021",
    compte: "2354",
    miseEnService: "Jan 2021",
    brute: 6720000,
    amortCumul: 2352000,
    vnc: 4368000,
    taux: "20%/5ans",
    amortissable: true,
    categorie: "Véhicules",
  },
  {
    code: "IMM-2022-001",
    designation: "Bassin piscicole PSC-001",
    compte: "2315",
    miseEnService: "Sep 2022",
    brute: 4800000,
    amortCumul: 480000,
    vnc: 4320000,
    taux: "3,33%/30ans",
    amortissable: true,
    categorie: "Équipements",
  },
  {
    code: "IMM-2024-001",
    designation: "Séchoir solaire 60m²",
    compte: "2354",
    miseEnService: "Jun 2024",
    brute: 2600000,
    amortCumul: 173333,
    vnc: 2426667,
    taux: "10%/10ans",
    amortissable: true,
    categorie: "Équipements",
  },
];

const filtres = ["Tous", "Terrains & constructions", "Matériels", "Véhicules", "Équipements"];

const dotations = [
  { designation: "Entrepôt ENT-001", annuelle: 746667, ytd: 435556 },
  { designation: "Tracteur JD5055E", annuelle: 1680000, ytd: 980000 },
  { designation: "Toyota HiLux", annuelle: 1344000, ytd: 784000 },
  { designation: "Bassin PSC-001", annuelle: 160000, ytd: 93333 },
  { designation: "Séchoir solaire", annuelle: 260000, ytd: 151667 },
];

const totalBrut = 67960000;
const totalAmort = 11654223;
const totalVNC = 56305777;
const totalAnnuelle = 4190667;
const totalYTD = 2444556;

/* ─── DONUT SVG ─── */
function DonutActifs() {
  const cx = 140;
  const cy = 140;
  const r = 100;
  const inner = 58;

  const segments = [
    { label: "Terrain", value: 14640000, pct: 21.5, color: "#1B5E20" },
    { label: "Entrepôt ENT-001", value: 22400000, pct: 32.9, color: "#2E7D32" },
    { label: "Tracteur JD5055E", value: 16800000, pct: 24.7, color: "#E65100" },
    { label: "Toyota HiLux", value: 6720000, pct: 9.9, color: "#1565C0" },
    { label: "Bassin PSC-001", value: 4800000, pct: 7.1, color: "#757575" },
    { label: "Séchoir", value: 2600000, pct: 3.9, color: "#F9A825" },
  ];

  function polarToXY(cx: number, cy: number, r: number, angleDeg: number) {
    const rad = ((angleDeg - 90) * Math.PI) / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  }

  let startAngle = 0;
  const paths = segments.map((seg) => {
    const sweep = (seg.pct / 100) * 360;
    const endAngle = startAngle + sweep;
    const outerStart = polarToXY(cx, cy, r, startAngle);
    const outerEnd = polarToXY(cx, cy, r, endAngle);
    const innerStart = polarToXY(cx, cy, inner, startAngle);
    const innerEnd = polarToXY(cx, cy, inner, endAngle);
    const large = sweep > 180 ? 1 : 0;
    const d = `M ${outerStart.x} ${outerStart.y} A ${r} ${r} 0 ${large} 1 ${outerEnd.x} ${outerEnd.y} L ${innerEnd.x} ${innerEnd.y} A ${inner} ${inner} 0 ${large} 0 ${innerStart.x} ${innerStart.y} Z`;
    startAngle = endAngle;
    return { ...seg, d };
  });

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5">
      <h3 className="mb-4 text-sm font-semibold text-gray-700">Répartition de la valeur brute des actifs</h3>
      <div className="flex flex-wrap gap-6 items-center">
        <svg viewBox="0 0 280 280" width="280" height="280" xmlns="http://www.w3.org/2000/svg">
          {paths.map((p) => (
            <path key={p.label} d={p.d} fill={p.color} stroke="white" strokeWidth="2" />
          ))}
          <text x={cx} y={cy - 8} fontSize="13" textAnchor="middle" fill="#374151" fontWeight="bold">67,96M</text>
          <text x={cx} y={cy + 10} fontSize="10" textAnchor="middle" fill="#6B7280">Valeur brute</text>
        </svg>
        <div className="space-y-2">
          {segments.map((seg) => (
            <div key={seg.label} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm shrink-0" style={{ background: seg.color }} />
              <span className="text-xs text-gray-600">{seg.label}</span>
              <span className="text-xs font-semibold text-gray-800 ml-1">{seg.pct}%</span>
              <span className="text-xs text-gray-400">({(seg.value / 1000000).toFixed(1)}M)</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── AREA CHART SVG ─── */
function PlanAmortissement() {
  const W = 640;
  const H = 200;
  const padL = 60;
  const padR = 20;
  const padT = 20;
  const padB = 36;
  const years = Array.from({ length: 20 }, (_, i) => 2021 + i);
  const chartW = W - padL - padR;
  const chartH = H - padT - padB;

  // VNC terrain constant ~14,64M (non-amorti)
  // VNC amortissables: starts at ~53,32M and decays to ~17M by 2040
  const totalStart = 67960000;
  const terrainVNC = 14640000;
  const amortStart = totalStart - terrainVNC; // 53,32M

  function vncAmort(year: number) {
    const t = year - 2021;
    return Math.max(amortStart - t * (amortStart - 17000000) / 19, 0);
  }

  const maxVal = totalStart;
  const minVal = 0;
  const scaleY = (v: number) => padT + chartH - ((v - minVal) / (maxVal - minVal)) * chartH;
  const scaleX = (i: number) => padL + (i / (years.length - 1)) * chartW;

  // Total VNC points
  const totalPts = years.map((y, i) => ({
    x: scaleX(i),
    y: scaleY(terrainVNC + vncAmort(y)),
  }));
  // Terrain line (flat)
  const terrainPts = years.map((_, i) => ({ x: scaleX(i), y: scaleY(terrainVNC) }));

  const totalPolyline = totalPts.map((p) => `${p.x},${p.y}`).join(" ");
  const terrainPolyline = terrainPts.map((p) => `${p.x},${p.y}`).join(" ");

  // Area fills
  const areaAmort = `M ${totalPts[0].x} ${totalPts[0].y} ` +
    totalPts.slice(1).map((p) => `L ${p.x} ${p.y}`).join(" ") +
    ` L ${terrainPts[years.length - 1].x} ${terrainPts[years.length - 1].y} ` +
    terrainPts.slice(0, years.length).reverse().map((p) => `L ${p.x} ${p.y}`).join(" ") + " Z";

  const areaTerrain = `M ${terrainPts[0].x} ${terrainPts[0].y} ` +
    terrainPts.slice(1).map((p) => `L ${p.x} ${p.y}`).join(" ") +
    ` L ${scaleX(years.length - 1)} ${scaleY(0)} L ${padL} ${scaleY(0)} Z`;

  // Aujourd'hui 2025 = index 4
  const idx2025 = 4;
  const x2025 = scaleX(idx2025);
  const y2025 = scaleY(56305777);

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5">
      <h3 className="mb-4 text-sm font-semibold text-gray-700">Plan d&apos;amortissement global 2021–2040</h3>
      <div className="overflow-x-auto">
        <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} xmlns="http://www.w3.org/2000/svg">
          {/* Areas */}
          <path d={areaTerrain} fill="#1B5E20" opacity="0.18" />
          <path d={areaAmort} fill="#E65100" opacity="0.18" />

          {/* Lines */}
          <polyline points={terrainPolyline} fill="none" stroke="#1B5E20" strokeWidth="1.5" strokeDasharray="4 3" />
          <polyline points={totalPolyline} fill="none" stroke="#E65100" strokeWidth="2" />

          {/* Y axis labels */}
          {[0, 20000000, 40000000, 67960000].map((v) => (
            <g key={v}>
              <line x1={padL - 5} y1={scaleY(v)} x2={padL} y2={scaleY(v)} stroke="#D1D5DB" strokeWidth="1" />
              <text x={padL - 8} y={scaleY(v) + 4} fontSize="9" textAnchor="end" fill="#9CA3AF">
                {v === 0 ? "0" : v === 20000000 ? "20M" : v === 40000000 ? "40M" : "68M"}
              </text>
            </g>
          ))}

          {/* X axis */}
          <line x1={padL} y1={scaleY(0)} x2={W - padR} y2={scaleY(0)} stroke="#E5E7EB" strokeWidth="1" />
          {years.filter((_, i) => i % 3 === 0 || i === years.length - 1).map((y, _, arr) => {
            const i = years.indexOf(y);
            return (
              <text key={y} x={scaleX(i)} y={H - 8} fontSize="9" textAnchor="middle" fill="#9CA3AF">{y}</text>
            );
          })}

          {/* Marqueur 2025 */}
          <line x1={x2025} y1={padT} x2={x2025} y2={scaleY(0)} stroke="#374151" strokeWidth="1" strokeDasharray="3 2" />
          <circle cx={x2025} cy={y2025} r="5" fill="#E65100" stroke="white" strokeWidth="1.5" />
          <rect x={x2025 + 8} y={y2025 - 18} width={118} height={22} rx="4" fill="#374151" />
          <text x={x2025 + 13} y={y2025 - 4} fontSize="9.5" fill="white" fontWeight="bold">Aujourd&apos;hui 2025 : VNC 56,3M</text>

          {/* Légende */}
          <line x1={padL + 10} y1={H - 18} x2={padL + 26} y2={H - 18} stroke="#1B5E20" strokeWidth="1.5" strokeDasharray="4 3" />
          <text x={padL + 30} y={H - 14} fontSize="9" fill="#6B7280">Terrain (non amorti)</text>
          <line x1={padL + 130} y1={H - 18} x2={padL + 146} y2={H - 18} stroke="#E65100" strokeWidth="2" />
          <text x={padL + 150} y={H - 14} fontSize="9" fill="#6B7280">Actifs amortissables</text>
        </svg>
      </div>
    </div>
  );
}

/* ─── PAGE ─── */
export default function ActifsPage() {
  const [filtre, setFiltre] = useState("Tous");

  const lignes = filtre === "Tous"
    ? immobilisations
    : immobilisations.filter((i) => i.categorie === filtre);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950">
      <Topbar title="Actifs" breadcrumb={["Finance", "Actifs"]} />

      <main className="flex-1 p-6 space-y-6">
        {/* En-tête */}
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Actifs</h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Immobilisations et amortissements — Plan comptable SYSCOHADA — EXP-001
            </p>
          </div>
          <button className="bg-[#2E7D32] text-white rounded-xl text-xs font-medium px-4 py-2.5 hover:bg-[#1B5E20] transition-colors">
            + Nouvelle immobilisation
          </button>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          {[
            { label: "Immobilisations", value: "6", sub: "actifs enregistrés", color: "text-gray-900 dark:text-white" },
            { label: "Valeur brute", value: "68,0M XOF", sub: "coût d'acquisition total", color: "text-blue-600 dark:text-blue-400" },
            { label: "VNC totale", value: "56,3M XOF", sub: "valeur nette comptable", color: "text-[#2E7D32]" },
            { label: "Dotation 2025", value: "2,9M XOF", sub: "dotation annuelle exercice", color: "text-orange-600 dark:text-orange-400" },
          ].map((kpi) => (
            <div key={kpi.label} className="rounded-2xl border border-gray-100 bg-white dark:bg-gray-900 dark:border-gray-800 p-5">
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">{kpi.label}</p>
              <p className={`mt-2 text-xl font-bold ${kpi.color}`}>{kpi.value}</p>
              <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">{kpi.sub}</p>
            </div>
          ))}
        </div>

        {/* Filtres */}
        <div className="flex gap-2 flex-wrap">
          {filtres.map((f) => (
            <button
              key={f}
              onClick={() => setFiltre(f)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                filtre === f
                  ? "bg-[#2E7D32] text-white"
                  : "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-[#2E7D32] hover:text-[#2E7D32]"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Tableau des immobilisations */}
        <div className="rounded-2xl border border-gray-100 bg-white dark:bg-gray-900 dark:border-gray-800 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-800">
            <h2 className="text-sm font-semibold text-gray-800 dark:text-white">Tableau des immobilisations</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#F8FBF8] dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
                  {["Code", "Désignation", "Compte SYSCOHADA", "Mise en service", "Valeur brute", "Amort. cumulés", "VNC", "Taux"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                {lignes.map((imm) => (
                  <tr key={imm.code} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="px-4 py-3 font-mono text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">{imm.code}</td>
                    <td className="px-4 py-3 text-gray-900 dark:text-white font-medium max-w-[200px]">{imm.designation}</td>
                    <td className="px-4 py-3 text-center font-mono text-xs text-gray-600 dark:text-gray-400">{imm.compte}</td>
                    <td className="px-4 py-3 text-gray-500 dark:text-gray-400 whitespace-nowrap text-xs">{imm.miseEnService}</td>
                    <td className="px-4 py-3 text-right font-medium text-gray-900 dark:text-white whitespace-nowrap">{fmt(imm.brute)}</td>
                    <td className="px-4 py-3 text-right text-orange-600 dark:text-orange-400 whitespace-nowrap">
                      {imm.amortissable ? fmt(imm.amortCumul) : <span className="text-gray-400 text-xs">non amortissable</span>}
                    </td>
                    <td className="px-4 py-3 text-right font-semibold text-[#2E7D32] whitespace-nowrap">{fmt(imm.vnc)}</td>
                    <td className="px-4 py-3 text-center text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">{imm.taux}</td>
                  </tr>
                ))}
                {/* Total row */}
                <tr className="bg-[#F8FBF8] dark:bg-gray-800 font-semibold border-t-2 border-gray-200 dark:border-gray-700">
                  <td className="px-4 py-3 text-xs font-bold text-gray-700 dark:text-gray-300" colSpan={4}>TOTAL</td>
                  <td className="px-4 py-3 text-right text-gray-900 dark:text-white whitespace-nowrap">{fmt(totalBrut)}</td>
                  <td className="px-4 py-3 text-right text-orange-600 dark:text-orange-400 whitespace-nowrap">{fmt(totalAmort)}</td>
                  <td className="px-4 py-3 text-right text-[#2E7D32] whitespace-nowrap">{fmt(totalVNC)}</td>
                  <td />
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <DonutActifs />
          <PlanAmortissement />
        </div>

        {/* Dotations 2025 */}
        <div className="rounded-2xl border border-gray-100 bg-white dark:bg-gray-900 dark:border-gray-800 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-800 flex items-start justify-between">
            <div>
              <h2 className="text-sm font-semibold text-gray-800 dark:text-white">Dotations aux amortissements 2025</h2>
              <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                Compte SYSCOHADA débité : <span className="font-mono font-semibold text-gray-700 dark:text-gray-300">6813</span> — Dotations aux amortissements immobilisations corporelles
              </p>
            </div>
            <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400 text-xs font-semibold">
              YTD 7 mois
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#F8FBF8] dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
                  {["Immobilisation", "Dotation annuelle", "Dotation YTD (7 mois)"].map((h) => (
                    <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                {dotations.map((d) => (
                  <tr key={d.designation} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="px-5 py-3 text-gray-900 dark:text-white font-medium">{d.designation}</td>
                    <td className="px-5 py-3 text-right text-gray-700 dark:text-gray-300 whitespace-nowrap">{fmt(d.annuelle)}</td>
                    <td className="px-5 py-3 text-right text-orange-600 dark:text-orange-400 font-semibold whitespace-nowrap">{fmt(d.ytd)}</td>
                  </tr>
                ))}
                <tr className="bg-[#F8FBF8] dark:bg-gray-800 border-t-2 border-gray-200 dark:border-gray-700 font-bold">
                  <td className="px-5 py-3 text-gray-800 dark:text-white">TOTAL</td>
                  <td className="px-5 py-3 text-right text-gray-900 dark:text-white whitespace-nowrap">{fmt(totalAnnuelle)}</td>
                  <td className="px-5 py-3 text-right text-orange-600 dark:text-orange-400 whitespace-nowrap">{fmt(totalYTD)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
