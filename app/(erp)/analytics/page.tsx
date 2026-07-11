"use client";

import { useState } from "react";
import Topbar from "../../components/Topbar";

const TABS = ["Revenus", "Production", "Qualité", "RSE & Impact"];
const PERIODS = ["Mois", "Trimestre", "Année"];

// ─── KPI Card ────────────────────────────────────────────────────────────────
function KpiCard({
  label,
  value,
  trend,
  sub,
}: {
  label: string;
  value: string;
  trend?: string;
  sub?: string;
}) {
  const up = trend?.startsWith("+");
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 flex flex-col gap-1">
      <span className="text-xs text-gray-500 font-medium">{label}</span>
      <span className="text-2xl font-bold text-gray-900">{value}</span>
      {sub && <span className="text-xs text-gray-400">{sub}</span>}
      {trend && (
        <span className={`text-xs font-semibold ${up ? "text-green-600" : "text-red-500"}`}>
          {trend} vs N-1
        </span>
      )}
    </div>
  );
}

// ─── SVG Grouped Bar : Revenus mensuels 2024 vs 2025 ─────────────────────────
function GroupedBarRevenus() {
  const months = ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun", "Jul*"];
  const data2024 = [3.8, 3.9, 3.9, 4.0, 3.8, 3.9, 4.0];
  const data2025 = [4.4, 4.4, 4.5, 4.4, 4.5, 8.9, 3.7];
  const W = 640, H = 260, PL = 50, PR = 20, PT = 36, PB = 44;
  const xW = W - PL - PR, yH = H - PT - PB;
  const maxV = 10;
  const groupW = xW / months.length;
  const bW = groupW * 0.36;
  const toY = (v: number) => PT + yH - (v / maxV) * yH;
  const gridLines = [0, 2, 4, 6, 8, 10];

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5">
      <h3 className="text-sm font-semibold text-gray-700 mb-1">Revenus mensuels 2024 vs 2025 (M XOF)</h3>
      <p className="text-xs text-gray-400 mb-3">* Juillet 2025 partiel</p>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ maxHeight: 260 }}>
        {/* grid */}
        {gridLines.map((v) => {
          const y = toY(v);
          return (
            <g key={v}>
              <line x1={PL} y1={y} x2={W - PR} y2={y} stroke="#e5e7eb" strokeWidth={1} />
              <text x={PL - 5} y={y + 4} textAnchor="end" fontSize={9} fill="#9ca3af">{v}M</text>
            </g>
          );
        })}
        {/* bars */}
        {months.map((m, i) => {
          const cx = PL + i * groupW + groupW / 2;
          const y24 = toY(data2024[i]);
          const y25 = toY(data2025[i]);
          const h24 = (data2024[i] / maxV) * yH;
          const h25 = (data2025[i] / maxV) * yH;
          return (
            <g key={m}>
              <rect x={cx - bW - 2} y={y24} width={bW} height={h24} rx={3} fill="#d1d5db" />
              <rect x={cx + 2} y={y25} width={bW} height={h25} rx={3} fill="#2E7D32" opacity={0.85} />
              <text x={cx} y={H - 10} textAnchor="middle" fontSize={9} fill="#6b7280">{m}</text>
            </g>
          );
        })}
        {/* legend */}
        <rect x={PL} y={10} width={12} height={10} rx={2} fill="#d1d5db" />
        <text x={PL + 16} y={19} fontSize={10} fill="#6b7280">2024</text>
        <rect x={PL + 60} y={10} width={12} height={10} rx={2} fill="#2E7D32" />
        <text x={PL + 76} y={19} fontSize={10} fill="#2E7D32">2025</text>
        {/* total annotation */}
        <text x={W - PR - 2} y={18} textAnchor="end" fontSize={9} fill="#9ca3af">Total 2025 YTD : 34,8M XOF</text>
      </svg>
    </div>
  );
}

// ─── SVG Donut : Répartition CA par acheteur ─────────────────────────────────
function DonutAcheteur() {
  const slices = [
    { label: "Barry Callebaut CI", pct: 89.2, color: "#1B5E20" },
    { label: "Cargill CI (anacarde)", pct: 8.4, color: "#E65100" },
    { label: "Marché local (maraîchage)", pct: 2.4, color: "#1565C0" },
  ];
  const cx = 120, cy = 120, R = 90, r = 50;
  let angle = -90;
  const paths = slices.map((s) => {
    const sweep = (s.pct / 100) * 360;
    const start = angle;
    const end = start + sweep;
    angle = end;
    const rad = (d: number) => (d * Math.PI) / 180;
    const large = sweep > 180 ? 1 : 0;
    const x1 = cx + R * Math.cos(rad(start)), y1 = cy + R * Math.sin(rad(start));
    const x2 = cx + R * Math.cos(rad(end)), y2 = cy + R * Math.sin(rad(end));
    const ix1 = cx + r * Math.cos(rad(start)), iy1 = cy + r * Math.sin(rad(start));
    const ix2 = cx + r * Math.cos(rad(end)), iy2 = cy + r * Math.sin(rad(end));
    return { ...s, d: `M${x1},${y1} A${R},${R} 0 ${large},1 ${x2},${y2} L${ix2},${iy2} A${r},${r} 0 ${large},0 ${ix1},${iy1} Z` };
  });

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">Répartition CA par acheteur 2025</h3>
      <svg viewBox="0 0 380 260" className="w-full" style={{ maxHeight: 260 }}>
        {paths.map((s) => <path key={s.label} d={s.d} fill={s.color} />)}
        <text x={cx} y={cx - 8} textAnchor="middle" fontSize={12} fontWeight="bold" fill="#1B5E20">CA</text>
        <text x={cx} y={cx + 8} textAnchor="middle" fontSize={10} fill="#4b5563">2025</text>
        {slices.map((s, i) => (
          <g key={s.label} transform={`translate(250, ${20 + i * 70})`}>
            <rect width={12} height={12} rx={3} fill={s.color} />
            <text x={17} y={11} fontSize={10} fill="#374151">{s.label}</text>
            <text x={17} y={26} fontSize={13} fontWeight="700" fill={s.color}>{s.pct}%</text>
          </g>
        ))}
      </svg>
    </div>
  );
}

// ─── Table Top 5 lots par valeur 2025 ────────────────────────────────────────
function TableTop5Lots() {
  const rows = [
    { lot: "LOT-2025-032", volume: "2,4t", prix: "1 090", valeur: "2,62M", grade: "AA", date: "12/03/2025" },
    { lot: "LOT-2025-038", volume: "2,2t", prix: "1 087", valeur: "2,39M", grade: "AA", date: "08/05/2025" },
    { lot: "LOT-2025-041", volume: "2,0t", prix: "1 090", valeur: "2,18M", grade: "AA+", date: "02/06/2025" },
    { lot: "LOT-2025-029", volume: "1,8t", prix: "1 080", valeur: "1,94M", grade: "AA", date: "18/02/2025" },
    { lot: "LOT-2025-044", volume: "1,6t", prix: "1 087", valeur: "1,74M", grade: "A", date: "14/06/2025" },
  ];
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">Top 5 lots par valeur 2025</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-[#F8FBF8]">
              {["Lot", "Volume", "Prix/kg (XOF)", "Valeur", "Grade", "Date"].map((h) => (
                <th key={h} className="px-3 py-2 text-left font-semibold text-gray-600">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-t border-gray-50 hover:bg-gray-50">
                <td className="px-3 py-2 font-mono font-medium text-gray-800">{r.lot}</td>
                <td className="px-3 py-2 text-gray-700">{r.volume}</td>
                <td className="px-3 py-2 text-gray-700">{r.prix}</td>
                <td className="px-3 py-2 font-semibold text-green-700">{r.valeur} XOF</td>
                <td className="px-3 py-2">
                  <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-700">{r.grade}</span>
                </td>
                <td className="px-3 py-2 text-gray-500">{r.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── SVG Horizontal Bar : Production par parcelle vs objectif ─────────────────
function BarProductionParcelle() {
  const data = [
    { label: "PAR-A1", real: 0.96, obj: 0.90, ok: true },
    { label: "PAR-A2", real: 0.94, obj: 0.90, ok: true },
    { label: "PAR-B1", real: 0.52, obj: 0.50, ok: true },
    { label: "PAR-B2", real: 0.20, obj: 0.18, ok: true },
    { label: "PAR-C1", real: 0.62, obj: 0.65, ok: false },
  ];
  const W = 640, PL = 72, PR = 120, PT = 24, PB = 20;
  const barH = 28, gap = 12;
  const totalH = data.length * (barH + gap) + PT + PB;
  const xW = W - PL - PR;
  const maxVal = 1.1;

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">Production par parcelle (t/ha) — Réalisé vs Objectif</h3>
      <svg viewBox={`0 0 ${W} ${totalH}`} className="w-full" style={{ maxHeight: 260 }}>
        {/* legend */}
        <rect x={PL} y={8} width={12} height={10} rx={2} fill="#2E7D32" />
        <text x={PL + 16} y={17} fontSize={9} fill="#2E7D32">Réalisé</text>
        <rect x={PL + 70} y={8} width={12} height={10} rx={2} fill="#d1d5db" />
        <text x={PL + 86} y={17} fontSize={9} fill="#6b7280">Objectif</text>
        {data.map((d, i) => {
          const y = PT + i * (barH + gap);
          const wReal = (d.real / maxVal) * xW;
          const wObj = (d.obj / maxVal) * xW;
          return (
            <g key={d.label}>
              <text x={PL - 6} y={y + barH / 2 + 4} textAnchor="end" fontSize={10} fill="#374151">{d.label}</text>
              {/* objectif (gris derrière) */}
              <rect x={PL} y={y + 4} width={wObj} height={barH - 8} rx={3} fill="#e5e7eb" />
              {/* réalisé (vert) */}
              <rect x={PL} y={y} width={wReal} height={barH} rx={4} fill={d.ok ? "#2E7D32" : "#F57C00"} opacity={0.85} />
              <text x={PL + wReal + 6} y={y + barH / 2 + 4} fontSize={10} fontWeight="600" fill={d.ok ? "#1B5E20" : "#E65100"}>
                {d.real.toFixed(2)} {d.ok ? "✅" : "🟡"}
              </text>
              <text x={PL + wObj + 6} y={y + barH / 2 + 15} fontSize={8} fill="#9ca3af">
                obj: {d.obj.toFixed(2)}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// ─── SVG Scatter : Rendement vs intrants ─────────────────────────────────────
function ScatterRendementIntrants() {
  const W = 640, H = 240, PL = 55, PR = 20, PT = 20, PB = 44;
  const points = [
    { label: "PAR-A1", intrant: 185, rdt: 0.96 },
    { label: "PAR-A2", intrant: 175, rdt: 0.94 },
    { label: "PAR-B1", intrant: 90, rdt: 0.52 },
    { label: "PAR-B2", intrant: 40, rdt: 0.20 },
    { label: "PAR-C1", intrant: 110, rdt: 0.62 },
    { label: "PAR-C2", intrant: 155, rdt: 0.88 },
  ];
  const xMin = 20, xMax = 210, yMin = 0.10, yMax = 1.10;
  const xW = W - PL - PR, yH = H - PT - PB;
  const toX = (v: number) => PL + ((v - xMin) / (xMax - xMin)) * xW;
  const toY = (v: number) => PT + yH - ((v - yMin) / (yMax - yMin)) * yH;
  // linear regression
  const n = points.length;
  const sx = points.reduce((a, p) => a + p.intrant, 0);
  const sy = points.reduce((a, p) => a + p.rdt, 0);
  const sxy = points.reduce((a, p) => a + p.intrant * p.rdt, 0);
  const sx2 = points.reduce((a, p) => a + p.intrant * p.intrant, 0);
  const slope = (n * sxy - sx * sy) / (n * sx2 - sx * sx);
  const intercept = (sy - slope * sx) / n;

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">Rendement vs Coût intrants/ha (XOF k) — corrélation par parcelle</h3>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ maxHeight: 240 }}>
        {[0.2, 0.4, 0.6, 0.8, 1.0].map((v) => {
          const y = toY(v);
          return (
            <g key={v}>
              <line x1={PL} y1={y} x2={W - PR} y2={y} stroke="#e5e7eb" strokeWidth={1} />
              <text x={PL - 4} y={y + 4} textAnchor="end" fontSize={9} fill="#9ca3af">{v.toFixed(1)}</text>
            </g>
          );
        })}
        {[40, 80, 120, 160, 200].map((v) => {
          const x = toX(v);
          return (
            <g key={v}>
              <line x1={x} y1={PT} x2={x} y2={PT + yH} stroke="#e5e7eb" strokeWidth={1} />
              <text x={x} y={PT + yH + 14} textAnchor="middle" fontSize={9} fill="#9ca3af">{v}k</text>
            </g>
          );
        })}
        {/* trend line */}
        <line
          x1={toX(xMin)} y1={toY(slope * xMin + intercept)}
          x2={toX(xMax)} y2={toY(slope * xMax + intercept)}
          stroke="#E65100" strokeWidth={1.5} strokeDasharray="5,3"
        />
        {points.map((p) => (
          <g key={p.label}>
            <circle cx={toX(p.intrant)} cy={toY(p.rdt)} r={6} fill="#2E7D32" opacity={0.75} />
            <text x={toX(p.intrant) + 9} y={toY(p.rdt) + 4} fontSize={9} fill="#374151">{p.label}</text>
          </g>
        ))}
        <text x={PL + xW / 2} y={H - 4} textAnchor="middle" fontSize={9} fill="#6b7280">Coût intrants/ha (XOF k)</text>
        <text x={14} y={PT + yH / 2} textAnchor="middle" fontSize={9} fill="#6b7280"
          transform={`rotate(-90, 14, ${PT + yH / 2})`}>Rendement (t/ha)</text>
      </svg>
    </div>
  );
}

// ─── Table Indices santé cultures ────────────────────────────────────────────
function TableSanteCultures() {
  const rows = [
    { parcelle: "PAR-A1", foliaire: "92%", cabosses: "38", mirides: "0,4%", sante: "95", badge: "bg-green-100 text-green-700" },
    { parcelle: "PAR-A2", foliaire: "88%", cabosses: "35", mirides: "0,6%", sante: "91", badge: "bg-green-100 text-green-700" },
    { parcelle: "PAR-B1", foliaire: "74%", cabosses: "22", mirides: "1,8%", sante: "72", badge: "bg-orange-100 text-orange-700" },
    { parcelle: "PAR-C1", foliaire: "80%", cabosses: "28", mirides: "1,1%", sante: "81", badge: "bg-green-100 text-green-700" },
  ];
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">Indices de santé des cultures — Cacao</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-[#F8FBF8]">
              {["Parcelle", "Couverture foliaire", "Nb cabosses/arbre", "Taux mirides", "Indice santé /100"].map((h) => (
                <th key={h} className="px-3 py-2 text-left font-semibold text-gray-600">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-t border-gray-50 hover:bg-gray-50">
                <td className="px-3 py-2 font-medium text-gray-800">{r.parcelle}</td>
                <td className="px-3 py-2 text-gray-700">{r.foliaire}</td>
                <td className="px-3 py-2 text-gray-700">{r.cabosses}</td>
                <td className="px-3 py-2 text-gray-700">{r.mirides}</td>
                <td className="px-3 py-2">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${r.badge}`}>{r.sante}/100</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── SVG Area Chart : Grade AA% évolution 12 mois ────────────────────────────
function AreaGradeAA() {
  const months = ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun", "Jul", "Aoû", "Sep", "Oct", "Nov", "Déc"];
  const values = [92, 91, 93, 94, 93, 95, 97, null, null, null, null, null];
  const seuil = 95;
  const W = 640, H = 200, PL = 48, PR = 20, PT = 20, PB = 36;
  const xW = W - PL - PR, yH = H - PT - PB;
  const minV = 88, maxV = 100;
  const xs = months.map((_, i) => PL + (i / (months.length - 1)) * xW);
  const toY = (v: number) => PT + yH - ((v - minV) / (maxV - minV)) * yH;
  const validPoints = values.map((v, i) => v !== null ? { x: xs[i], y: toY(v!) } : null).filter(Boolean) as { x: number; y: number }[];
  const linePath = validPoints.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");
  const areaPath = linePath + ` L${validPoints[validPoints.length - 1].x},${PT + yH} L${validPoints[0].x},${PT + yH} Z`;
  const seuilY = toY(seuil);

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">Évolution Grade AA% — 12 mois (Cible RA : 95%)</h3>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ maxHeight: 200 }}>
        <defs>
          <linearGradient id="aaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4CAF50" stopOpacity={0.3} />
            <stop offset="100%" stopColor="#4CAF50" stopOpacity={0.03} />
          </linearGradient>
        </defs>
        {[88, 91, 94, 97, 100].map((v) => {
          const y = toY(v);
          return (
            <g key={v}>
              <line x1={PL} y1={y} x2={W - PR} y2={y} stroke="#e5e7eb" strokeWidth={1} />
              <text x={PL - 4} y={y + 4} textAnchor="end" fontSize={9} fill="#9ca3af">{v}%</text>
            </g>
          );
        })}
        {months.map((m, i) => (
          <text key={m} x={xs[i]} y={H - 6} textAnchor="middle" fontSize={8} fill="#9ca3af">{m}</text>
        ))}
        {/* seuil RA */}
        <line x1={PL} y1={seuilY} x2={W - PR} y2={seuilY} stroke="#ef4444" strokeWidth={1.5} strokeDasharray="6,3" />
        <text x={W - PR + 2} y={seuilY + 4} fontSize={9} fill="#ef4444">95%</text>
        <path d={areaPath} fill="url(#aaGrad)" />
        <path d={linePath} fill="none" stroke="#2E7D32" strokeWidth={2.5} />
        {validPoints.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={4} fill="#2E7D32" />
        ))}
        {validPoints.map((p, i) => (
          <text key={`v${i}`} x={p.x} y={p.y - 8} textAnchor="middle" fontSize={9} fontWeight="600" fill="#1B5E20">
            {values[i]}%
          </text>
        ))}
      </svg>
    </div>
  );
}

// ─── SVG Heatmap : Paramètres qualité par lot ────────────────────────────────
function HeatmapQualite() {
  const lots = ["LOT-2025-038", "LOT-2025-039", "LOT-2025-040", "LOT-2025-041", "LOT-2025-042", "LOT-2025-043", "LOT-2025-044", "LOT-2025-045"];
  const params = ["Humidité", "Cut test", "pH", "Moisissure", "Ferment."];
  // values: [humidité%, cut test grade AA%, pH, moisissure%, fermentation%]
  const data = [
    [7.2, 94, 5.4, 0.0, 76],
    [7.4, 92, 5.3, 0.0, 74],
    [7.1, 96, 5.5, 0.0, 78],
    [7.8, 97, 5.6, 0.2, 80],
    [7.0, 95, 5.4, 0.0, 77],
    [8.0, 93, 5.3, 0.5, 75],
    [6.9, 91, 5.2, 0.0, 73],
    [7.3, 98, 5.5, 0.0, 82],
  ];
  // conformity: humidité <=8 ✅, cut test >=95 ✅/orange, pH 5.2-5.8 ✅, moisissure <=0.3 ✅/orange, fermentation >=70 ✅
  const isOk = (param: number, val: number) => {
    if (param === 0) return val <= 8 ? (val <= 7.5 ? "green" : "orange") : "red";
    if (param === 1) return val >= 95 ? "green" : val >= 90 ? "orange" : "red";
    if (param === 2) return val >= 5.2 && val <= 5.8 ? "green" : "orange";
    if (param === 3) return val <= 0.0 ? "green" : val <= 0.5 ? "orange" : "red";
    if (param === 4) return val >= 75 ? "green" : val >= 70 ? "orange" : "red";
    return "green";
  };
  const colors: Record<string, string> = { green: "#4CAF50", orange: "#FF9800", red: "#ef4444" };
  const cellW = 80, cellH = 30, PL = 100, PT = 24;
  const W = PL + params.length * cellW + 10;
  const H = PT + lots.length * cellH + 20;

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 overflow-x-auto">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">Paramètres qualité par lot 2025 (heatmap conformité)</h3>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ minWidth: 520, maxHeight: 280 }}>
        {params.map((p, pi) => (
          <text key={p} x={PL + pi * cellW + cellW / 2} y={PT - 6} textAnchor="middle" fontSize={9} fill="#6b7280" fontWeight="600">{p}</text>
        ))}
        {lots.map((lot, li) => {
          const y = PT + li * cellH;
          return (
            <g key={lot}>
              <text x={PL - 6} y={y + cellH / 2 + 4} textAnchor="end" fontSize={8.5} fill="#374151">{lot}</text>
              {params.map((_, pi) => {
                const val = data[li][pi];
                const status = isOk(pi, val);
                const x = PL + pi * cellW;
                const label = pi === 0 ? `${val}%` : pi === 1 ? `${val}%` : pi === 2 ? `${val}` : pi === 3 ? `${val}%` : `${val}%`;
                return (
                  <g key={pi}>
                    <rect x={x + 1} y={y + 1} width={cellW - 2} height={cellH - 2} rx={3} fill={colors[status]} opacity={0.7} />
                    <text x={x + cellW / 2} y={y + cellH / 2 + 4} textAnchor="middle" fontSize={9} fontWeight="600" fill="white">{label}</text>
                  </g>
                );
              })}
            </g>
          );
        })}
        {[["Conforme", "#4CAF50"], ["Limite", "#FF9800"], ["Hors norme", "#ef4444"]].map(([lbl, c], i) => (
          <g key={lbl} transform={`translate(${PL + i * 110}, ${H - 8})`}>
            <rect width={10} height={10} rx={2} fill={c} />
            <text x={14} y={9} fontSize={9} fill="#6b7280">{lbl}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}

// ─── Conformité globale ───────────────────────────────────────────────────────
function ConformiteGlobale() {
  const stats = [
    { label: "Cut test Grade AA", value: "94,2%", detail: "des lots en 2025", ok: true },
    { label: "Humidité conforme (≤8%)", value: "100%", detail: "des lots", ok: true },
    { label: "Lots rejetés 2025", value: "0", detail: "zéro rejet", ok: true },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {stats.map((s) => (
        <div key={s.label} className={`rounded-2xl border p-5 flex flex-col gap-1 ${s.ok ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}`}>
          <span className="text-xs font-medium text-gray-600">{s.label}</span>
          <span className={`text-3xl font-bold ${s.ok ? "text-green-700" : "text-red-600"}`}>{s.value}</span>
          <span className="text-xs text-gray-500 flex items-center gap-1">
            <span>{s.ok ? "✅" : "❌"}</span> {s.detail}
          </span>
        </div>
      ))}
    </div>
  );
}

// ─── ODD Cards ───────────────────────────────────────────────────────────────
function OddCards() {
  const odds = [
    { num: "ODD 1", label: "Pas de pauvreté", score: 78, value: "Salaire médian 142k XOF/mois (+7,6%)", color: "#E65100" },
    { num: "ODD 2", label: "Faim zéro", score: 85, value: "Autoproduction maraîchage 400 kg/an", color: "#4CAF50" },
    { num: "ODD 8", label: "Travail décent", score: 80, value: "5 emplois permanents & saisonniers", color: "#1565C0" },
    { num: "ODD 12", label: "Consommation responsable", score: 72, value: "0 produit liste rouge RA utilisé", color: "#6A1B9A" },
    { num: "ODD 13", label: "Action climatique", score: 96, value: "Bilan carbone -638 tCO₂e (négatif)", color: "#00695C" },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {odds.map((o) => (
        <div key={o.num} className="rounded-2xl border border-gray-100 bg-white p-5 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-2 py-1 rounded-lg text-white" style={{ backgroundColor: o.color }}>{o.num}</span>
            <span className="text-xs font-semibold text-gray-700">{o.label}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold" style={{ color: o.color }}>{o.score}</span>
            <span className="text-xs text-gray-400">/100</span>
          </div>
          <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
            <div className="h-full rounded-full" style={{ width: `${o.score}%`, backgroundColor: o.color }} />
          </div>
          <p className="text-xs text-gray-500 leading-relaxed">{o.value}</p>
        </div>
      ))}
    </div>
  );
}

// ─── SVG Empreinte carbone ────────────────────────────────────────────────────
function BarCarbone() {
  const emissions = [
    { label: "Carburant tracteur", val: 18, type: "em" },
    { label: "Phytosanitaires", val: 2, type: "em" },
    { label: "Transport", val: 8, type: "em" },
  ];
  const absorptions = [
    { label: "Ombragiers (180 arbres)", val: 180, type: "abs" },
    { label: "Cacao plants", val: 486, type: "abs" },
  ];
  const W = 640, PL = 200, PR = 80, PT = 24, barH = 28, gap = 8;
  const totalRows = emissions.length + absorptions.length + 3;
  const H = totalRows * (barH + gap) + PT + 20;
  const maxVal = 500;
  const xW = W - PL - PR;
  const toW = (v: number) => (v / maxVal) * xW;

  let y = PT;
  const rows: { label: string; val: number; type: string; y: number; isTitle?: boolean }[] = [];

  rows.push({ label: "ÉMISSIONS", val: 0, type: "title", y, isTitle: true });
  y += barH + gap;
  for (const e of emissions) { rows.push({ ...e, y }); y += barH + gap; }
  rows.push({ label: "TOTAL émissions : 28 tCO₂e", val: 28, type: "total_em", y });
  y += barH + gap + 8;
  rows.push({ label: "ABSORPTIONS", val: 0, type: "title", y, isTitle: true });
  y += barH + gap;
  for (const a of absorptions) { rows.push({ ...a, y }); y += barH + gap; }
  rows.push({ label: "TOTAL absorptions : -666 tCO₂e", val: 666, type: "total_abs", y });
  y += barH + gap + 8;

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-700">Empreinte carbone 2025 (tCO₂e)</h3>
        <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">Bilan net : -638 tCO₂e — Carbone-négative ✅</span>
      </div>
      <svg viewBox={`0 0 ${W} ${y + 20}`} className="w-full" style={{ maxHeight: 340 }}>
        {rows.map((r) => {
          if (r.isTitle) {
            return <text key={r.label} x={PL - 6} y={r.y + barH / 2 + 4} textAnchor="end" fontSize={10} fontWeight="700" fill="#374151">{r.label}</text>;
          }
          const fill = r.type === "em" || r.type === "total_em" ? "#ef4444" : "#2E7D32";
          const opacity = r.type.startsWith("total") ? 1 : 0.75;
          return (
            <g key={r.label}>
              <text x={PL - 6} y={r.y + barH / 2 + 4} textAnchor="end" fontSize={9} fill="#6b7280">{r.label}</text>
              <rect x={PL} y={r.y} width={toW(r.val)} height={barH} rx={4} fill={fill} opacity={opacity} />
              <text x={PL + toW(r.val) + 6} y={r.y + barH / 2 + 4} fontSize={9} fontWeight="600" fill={fill}>
                {r.type === "abs" || r.type === "total_abs" ? "-" : ""}{r.val} t
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// ─── Table indicateurs sociaux ────────────────────────────────────────────────
function TableSocial() {
  const rows = [
    { ind: "Salaire médian ouvrier (XOF/mois)", v23: "118 000", v24: "132 000", v25: "142 000", trend: "+7,6%" },
    { ind: "Nb ouvriers formés BPA", v23: "3", v24: "4", v25: "5", trend: "+25%" },
    { ind: "% femmes dans l'équipe", v23: "20%", v24: "20%", v25: "20%", trend: "stable" },
    { ind: "Score bien-être (enquête ANADER /5)", v23: "3,2/5", v24: "3,6/5", v25: "3,8/5", trend: "+5,6%" },
  ];
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">Indicateurs sociaux</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-[#F8FBF8]">
              {["Indicateur", "2023", "2024", "2025 YTD", "Tendance"].map((h) => (
                <th key={h} className="px-3 py-2 text-left font-semibold text-gray-600">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-t border-gray-50 hover:bg-gray-50">
                <td className="px-3 py-2 font-medium text-gray-800">{r.ind}</td>
                <td className="px-3 py-2 text-gray-500">{r.v23}</td>
                <td className="px-3 py-2 text-gray-600">{r.v24}</td>
                <td className="px-3 py-2 font-semibold text-green-700">{r.v25}</td>
                <td className="px-3 py-2">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${r.trend === "stable" ? "bg-blue-50 text-blue-700" : "bg-green-100 text-green-700"}`}>
                    {r.trend === "stable" ? "→ Stable" : `↑ ${r.trend}`}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Page principale ──────────────────────────────────────────────────────────
export default function AnalyticsPage() {
  const [tab, setTab] = useState(0);
  const [period, setPeriod] = useState("Année");

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-gray-50">
      <Topbar breadcrumb={["Rapports", "Analytics"]} />

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* En-tête */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Analytics Avancés</h1>
            <p className="text-sm text-gray-500 mt-0.5">Analyse de performance multi-dimensionnelle — EXP-001 2025</p>
          </div>
          <div className="flex items-center gap-1 bg-white border border-gray-100 rounded-xl p-1 self-start">
            {PERIODS.map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${period === p ? "bg-[#2E7D32] text-white shadow-sm" : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"}`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* KPIs rapides */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <KpiCard label="CA YTD" value="26,7M XOF" trend="+8,2%" />
          <KpiCard label="Production" value="11,2t" trend="+10,9%" />
          <KpiCard label="Rendement" value="0,90t/ha" trend="+4,7%" />
          <KpiCard label="Marge nette" value="34,2%" sub="sur CA YTD" />
        </div>

        {/* Onglets */}
        <div className="flex gap-1 bg-white border border-gray-100 rounded-xl p-1 w-fit">
          {TABS.map((t, i) => (
            <button
              key={t}
              onClick={() => setTab(i)}
              className={`px-4 py-2 rounded-lg text-xs font-medium transition-colors ${tab === i ? "bg-[#2E7D32] text-white shadow-sm" : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"}`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Onglet Revenus */}
        {tab === 0 && (
          <div className="space-y-6">
            <GroupedBarRevenus />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              <DonutAcheteur />
              <TableTop5Lots />
            </div>
          </div>
        )}

        {/* Onglet Production */}
        {tab === 1 && (
          <div className="space-y-6">
            <BarProductionParcelle />
            <ScatterRendementIntrants />
            <TableSanteCultures />
          </div>
        )}

        {/* Onglet Qualité */}
        {tab === 2 && (
          <div className="space-y-6">
            <AreaGradeAA />
            <HeatmapQualite />
            <ConformiteGlobale />
          </div>
        )}

        {/* Onglet RSE & Impact */}
        {tab === 3 && (
          <div className="space-y-6">
            <OddCards />
            <BarCarbone />
            <TableSocial />
          </div>
        )}
      </div>
    </div>
  );
}
