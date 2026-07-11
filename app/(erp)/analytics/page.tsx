"use client";

import { useState } from "react";
import Topbar from "../../components/Topbar";

const TABS = ["Vue d'ensemble", "Performance", "Marchés", "Prédictions"];

// ─── KPI Card ────────────────────────────────────────────────────────────────
function KpiCard({
  label,
  value,
  sub,
  trend,
}: {
  label: string;
  value: string;
  sub?: string;
  trend?: string;
}) {
  const up = trend && trend.startsWith("+");
  const down = trend && trend.startsWith("-");
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 flex flex-col gap-1">
      <span className="text-xs text-gray-500 font-medium">{label}</span>
      <span className="text-2xl font-bold text-gray-900">{value}</span>
      {sub && <span className="text-xs text-gray-400">{sub}</span>}
      {trend && (
        <span
          className={`text-xs font-semibold ${up ? "text-green-600" : down ? "text-red-500" : "text-gray-500"}`}
        >
          {trend} vs N-1
        </span>
      )}
    </div>
  );
}

// ─── SVG Line Chart : CA mensuel ─────────────────────────────────────────────
function LineChartCA() {
  const W = 700, H = 220, PL = 50, PR = 20, PT = 28, PB = 40;
  const months = ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun", "Jul*"];
  const data2024 = [5.4, 6.2, 7.1, 8.0, 9.5, 10.1, null as number | null];
  const data2025 = [6.2, 7.1, 8.4, 9.2, 10.8, 11.4, 12.1];
  const minV = 5, maxV = 13;
  const xW = W - PL - PR, yH = H - PT - PB;
  const xs = months.map((_, i) => PL + (i / (months.length - 1)) * xW);
  const toY = (v: number) => PT + yH - ((v - minV) / (maxV - minV)) * yH;

  const linePath = (arr: (number | null)[]) => {
    let d = "";
    arr.forEach((v, i) => {
      if (v == null) return;
      d += (d === "" ? "M" : "L") + ` ${xs[i]},${toY(v)}`;
    });
    return d;
  };

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">Évolution CA mensuel 2025 (M XOF)</h3>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ maxHeight: 220 }}>
        {[5, 7, 9, 11, 13].map((v) => {
          const y = toY(v);
          return (
            <g key={v}>
              <line x1={PL} y1={y} x2={W - PR} y2={y} stroke="#e5e7eb" strokeWidth={1} />
              <text x={PL - 5} y={y + 4} textAnchor="end" fontSize={10} fill="#9ca3af">{v}</text>
            </g>
          );
        })}
        {months.map((m, i) => (
          <text key={m} x={xs[i]} y={H - 8} textAnchor="middle" fontSize={10} fill="#9ca3af">{m}</text>
        ))}
        <path d={linePath(data2024)} fill="none" stroke="#d1d5db" strokeWidth={2} strokeDasharray="5,3" />
        <path d={linePath(data2025)} fill="none" stroke="#2E7D32" strokeWidth={2.5} />
        {data2025.map((v, i) => (
          <circle key={i} cx={xs[i]} cy={toY(v)} r={4} fill="#2E7D32" />
        ))}
        <circle cx={xs[6]} cy={toY(12.1)} r={5} fill="none" stroke="#2E7D32" strokeWidth={2} strokeDasharray="3,2" />
        {/* Legend */}
        <rect x={PL + 10} y={8} width={14} height={3} fill="#d1d5db" />
        <text x={PL + 28} y={13} fontSize={10} fill="#9ca3af">2024</text>
        <rect x={PL + 72} y={8} width={14} height={3} fill="#2E7D32" />
        <text x={PL + 90} y={13} fontSize={10} fill="#2E7D32">2025</text>
        <text x={PL + 140} y={13} fontSize={9} fill="#9ca3af">(* prévision)</text>
      </svg>
    </div>
  );
}

// ─── SVG Donut : Répartition CA ──────────────────────────────────────────────
function DonutCA() {
  const slices = [
    { label: "Cacao", pct: 68, color: "#1B5E20" },
    { label: "Anacarde", pct: 22, color: "#4CAF50" },
    { label: "Élevage", pct: 6, color: "#81C784" },
    { label: "Pisciculture", pct: 4, color: "#C8E6C9" },
  ];
  const cx = 130, cy = 130, R = 100, r = 56;
  let angle = -90;
  const paths = slices.map((s) => {
    const start = angle;
    const sweep = (s.pct / 100) * 360;
    const end = start + sweep;
    angle = end;
    const rad = (d: number) => (d * Math.PI) / 180;
    const large = sweep > 180 ? 1 : 0;
    const x1 = cx + R * Math.cos(rad(start)), y1 = cy + R * Math.sin(rad(start));
    const x2 = cx + R * Math.cos(rad(end)), y2 = cy + R * Math.sin(rad(end));
    const ix1 = cx + r * Math.cos(rad(start)), iy1 = cy + r * Math.sin(rad(start));
    const ix2 = cx + r * Math.cos(rad(end)), iy2 = cy + r * Math.sin(rad(end));
    return {
      ...s,
      d: `M${x1},${y1} A${R},${R} 0 ${large},1 ${x2},${y2} L${ix2},${iy2} A${r},${r} 0 ${large},0 ${ix1},${iy1} Z`,
    };
  });

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">Répartition CA par filière</h3>
      <svg viewBox="0 0 340 270" className="w-full" style={{ maxHeight: 270 }}>
        {paths.map((s) => <path key={s.label} d={s.d} fill={s.color} />)}
        <text x={cx} y={cx - 8} textAnchor="middle" fontSize={13} fontWeight="bold" fill="#1B5E20">CA</text>
        <text x={cx} y={cx + 10} textAnchor="middle" fontSize={11} fill="#4b5563">2025</text>
        {slices.map((s, i) => (
          <g key={s.label} transform={`translate(275,${20 + i * 56})`}>
            <rect width={12} height={12} rx={3} fill={s.color} />
            <text x={17} y={10} fontSize={11} fill="#374151">{s.label}</text>
            <text x={17} y={25} fontSize={11} fontWeight="600" fill="#1B5E20">{s.pct}%</text>
          </g>
        ))}
      </svg>
    </div>
  );
}

// ─── Table Top 5 clients ─────────────────────────────────────────────────────
function TableClients() {
  const rows = [
    { client: "Barry Callebaut", ca: "32,4 M", pct: "33,8%", variation: "+18%", dir: "up", pays: "Suisse" },
    { client: "Cargill CI", ca: "27,8 M", pct: "29,0%", variation: "+8%", dir: "up", pays: "USA" },
    { client: "Olam CI", ca: "18,6 M", pct: "19,4%", variation: "+5%", dir: "up", pays: "Singapour" },
    { client: "JDE Peet's", ca: "9,2 M", pct: "9,6%", variation: "-3%", dir: "down", pays: "Pays-Bas" },
    { client: "Exportateur CI", ca: "7,8 M", pct: "8,1%", variation: "+22%", dir: "up", pays: "Côte d'Ivoire" },
  ];
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">Top 5 clients par CA</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-[#F8FBF8]">
              {["Client", "CA YTD", "% Total", "Variation", "Pays"].map((h) => (
                <th key={h} className="px-3 py-2 text-left font-semibold text-gray-600">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-t border-gray-50 hover:bg-gray-50">
                <td className="px-3 py-2 font-medium text-gray-800">{r.client}</td>
                <td className="px-3 py-2 text-gray-700">{r.ca} XOF</td>
                <td className="px-3 py-2 text-gray-500">{r.pct}</td>
                <td className={`px-3 py-2 font-semibold ${r.dir === "up" ? "text-green-600" : "text-red-500"}`}>
                  {r.variation} {r.dir === "up" ? "↑" : "↓"}
                </td>
                <td className="px-3 py-2 text-gray-500">{r.pays}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── SVG Bar horizontal : Rendement parcelles ─────────────────────────────────
function BarRendement() {
  const data = [
    { label: "PAR-A1", val: 1.28 },
    { label: "PAR-A2", val: 1.24 },
    { label: "PAR-A3", val: 1.22 },
    { label: "PAR-B1", val: 1.15 },
    { label: "PAR-B2", val: 1.18 },
    { label: "PAR-C1", val: 1.28 },
    { label: "PAR-C2", val: 1.26 },
  ];
  const W = 600, PL = 72, PR = 80, PT = 24, PB = 20;
  const barH = 28, gap = 10;
  const totalH = data.length * (barH + gap) + PT + PB;
  const xW = W - PL - PR;
  const maxVal = 1.4;
  const threshold = 1.1;
  const thX = PL + (threshold / maxVal) * xW;

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">Rendement par parcelle (t/ha)</h3>
      <svg viewBox={`0 0 ${W} ${totalH}`} className="w-full" style={{ maxHeight: 320 }}>
        <line x1={thX} y1={PT - 12} x2={thX} y2={totalH - PB} stroke="#ef4444" strokeWidth={1.5} strokeDasharray="5,3" />
        <text x={thX + 4} y={PT - 2} fontSize={9} fill="#ef4444">Seuil RA min 1,1 t/ha</text>
        {data.map((d, i) => {
          const y = PT + i * (barH + gap);
          const bw = (d.val / maxVal) * xW;
          return (
            <g key={d.label}>
              <text x={PL - 6} y={y + barH / 2 + 4} textAnchor="end" fontSize={11} fill="#374151">{d.label}</text>
              <rect x={PL} y={y} width={bw} height={barH} rx={4} fill="#2E7D32" opacity={0.85} />
              <text x={PL + bw + 6} y={y + barH / 2 + 4} fontSize={11} fontWeight="600" fill="#1B5E20">
                {d.val.toFixed(2)}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// ─── SVG Waterfall : Coût vs Prix marché ─────────────────────────────────────
function WaterfallCout() {
  const items = [
    { label: "Intrants", val: 18200, type: "cost" },
    { label: "Main d'oeuvre", val: 14800, type: "cost" },
    { label: "Amortissements", val: 4200, type: "cost" },
    { label: "Frais généraux", val: 3800, type: "cost" },
    { label: "TOTAL coûts", val: 41000, type: "total" },
    { label: "Prix marché", val: 100000, type: "price" },
    { label: "Marge", val: 59000, type: "margin" },
  ];
  const W = 640, H = 260, PL = 50, PR = 20, PT = 20, PB = 50;
  const xW = W - PL - PR, yH = H - PT - PB;
  const maxVal = 110000;
  const bW = xW / items.length - 8;
  const colors: Record<string, string> = {
    cost: "#4CAF50", total: "#1B5E20", price: "#2196F3", margin: "#E65100",
  };

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">
        Coût de production vs Prix marché (XOF/t)
      </h3>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ maxHeight: 260 }}>
        {[0, 0.25, 0.5, 0.75, 1].map((t) => {
          const y = PT + t * yH;
          return (
            <g key={t}>
              <line x1={PL} y1={y} x2={W - PR} y2={y} stroke="#e5e7eb" strokeWidth={1} />
              <text x={PL - 4} y={y + 4} textAnchor="end" fontSize={9} fill="#9ca3af">
                {Math.round(maxVal * (1 - t) / 1000)}k
              </text>
            </g>
          );
        })}
        {items.map((item, i) => {
          const x = PL + i * (bW + 8);
          const bh = (item.val / maxVal) * yH;
          const y = PT + yH - bh;
          return (
            <g key={item.label}>
              <rect x={x} y={y} width={bW} height={bh} rx={3} fill={colors[item.type]} opacity={0.9} />
              <text x={x + bW / 2} y={y - 4} textAnchor="middle" fontSize={9} fontWeight="600" fill="#374151">
                {item.val >= 1000 ? `${(item.val / 1000).toFixed(0)}k` : item.val}
              </text>
              <text x={x + bW / 2} y={H - 8} textAnchor="middle" fontSize={8} fill="#6b7280"
                style={{ fontSize: "8px" }}>
                {item.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// ─── Table performance mensuelle ─────────────────────────────────────────────
function TablePerf() {
  const rows = [
    { mois: "Janvier", prod: "12,4", ca: "6,2", couts: "4,4", marge: "29,0%", incidents: 0 },
    { mois: "Février", prod: "13,8", ca: "7,1", couts: "5,0", marge: "29,6%", incidents: 1 },
    { mois: "Mars", prod: "16,2", ca: "8,4", couts: "5,9", marge: "29,8%", incidents: 0 },
    { mois: "Avril", prod: "17,6", ca: "9,2", couts: "6,5", marge: "29,3%", incidents: 1 },
    { mois: "Mai", prod: "20,4", ca: "10,8", couts: "7,6", marge: "29,6%", incidents: 0 },
    { mois: "Juin", prod: "21,8", ca: "11,4", couts: "8,0", marge: "29,8%", incidents: 0 },
  ];
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">Performance mensuelle 2025</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-[#F8FBF8]">
              {["Mois", "Prod. (t)", "CA (M XOF)", "Coûts (M XOF)", "Marge", "Incidents"].map((h) => (
                <th key={h} className="px-3 py-2 text-left font-semibold text-gray-600">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-t border-gray-50 hover:bg-gray-50">
                <td className="px-3 py-2 font-medium text-gray-800">{r.mois}</td>
                <td className="px-3 py-2 text-gray-700">{r.prod}</td>
                <td className="px-3 py-2 text-gray-700">{r.ca}</td>
                <td className="px-3 py-2 text-gray-700">{r.couts}</td>
                <td className="px-3 py-2 text-green-700 font-semibold">{r.marge}</td>
                <td className="px-3 py-2">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${r.incidents === 0 ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"}`}>
                    {r.incidents === 0 ? "Aucun" : r.incidents}
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

// ─── SVG Area Chart : Cours cacao BCC ────────────────────────────────────────
function AreaCours() {
  const W = 700, H = 220, PL = 55, PR = 20, PT = 20, PB = 40;
  const points = [
    { label: "Jul 24", v: 980 }, { label: "Sep 24", v: 1020 }, { label: "Nov 24", v: 1050 },
    { label: "Jan 25", v: 1072 }, { label: "Mar 25", v: 1080 }, { label: "Mai 25", v: 1090 },
    { label: "Jul 25", v: 1087 },
  ];
  const xW = W - PL - PR, yH = H - PT - PB;
  const minV = 950, maxV = 1110;
  const xs = points.map((_, i) => PL + (i / (points.length - 1)) * xW);
  const toY = (v: number) => PT + yH - ((v - minV) / (maxV - minV)) * yH;
  const areaPath =
    `M${xs[0]},${toY(points[0].v)} ` +
    points.slice(1).map((p, i) => `L${xs[i + 1]},${toY(p.v)}`).join(" ") +
    ` L${xs[xs.length - 1]},${PT + yH} L${xs[0]},${PT + yH} Z`;
  const linePath =
    `M${xs[0]},${toY(points[0].v)} ` +
    points.slice(1).map((p, i) => `L${xs[i + 1]},${toY(p.v)}`).join(" ");

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">
        Cours cacao BCC Abidjan — 12 mois (XOF/kg)
      </h3>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ maxHeight: 220 }}>
        <defs>
          <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4CAF50" stopOpacity={0.22} />
            <stop offset="100%" stopColor="#4CAF50" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        {[950, 1000, 1050, 1100].map((v) => {
          const y = toY(v);
          return (
            <g key={v}>
              <line x1={PL} y1={y} x2={W - PR} y2={y} stroke="#e5e7eb" strokeWidth={1} />
              <text x={PL - 4} y={y + 4} textAnchor="end" fontSize={10} fill="#9ca3af">{v}</text>
            </g>
          );
        })}
        {points.map((p, i) => (
          <text key={i} x={xs[i]} y={H - 8} textAnchor="middle" fontSize={9} fill="#9ca3af">{p.label}</text>
        ))}
        <path d={areaPath} fill="url(#areaGrad)" />
        <path d={linePath} fill="none" stroke="#2E7D32" strokeWidth={2.5} />
        {points.map((p, i) => (
          <circle key={i} cx={xs[i]} cy={toY(p.v)} r={3.5} fill="#2E7D32" />
        ))}
      </svg>
    </div>
  );
}

// ─── SVG Scatter : Corrélation cours ─────────────────────────────────────────
function ScatterCorrelation() {
  const W = 420, H = 280, PL = 55, PR = 20, PT = 20, PB = 45;
  const data: [number, number][] = [
    [2800, 980], [2900, 1005], [3000, 1012], [3050, 1020], [2950, 1015],
    [3100, 1030], [3200, 1045], [3150, 1042], [3300, 1055], [3250, 1050],
    [3400, 1065], [3350, 1060], [3500, 1072], [3450, 1068], [3600, 1075],
    [3550, 1070], [3700, 1080], [3650, 1078], [3800, 1085], [3750, 1082],
    [3900, 1088], [3850, 1086], [4000, 1090], [3950, 1087],
  ];
  const xMin = 2700, xMax = 4100, yMin = 960, yMax = 1110;
  const xW = W - PL - PR, yH = H - PT - PB;
  const toX = (v: number) => PL + ((v - xMin) / (xMax - xMin)) * xW;
  const toY = (v: number) => PT + yH - ((v - yMin) / (yMax - yMin)) * yH;
  const n = data.length;
  const sx = data.reduce((a, b) => a + b[0], 0);
  const sy = data.reduce((a, b) => a + b[1], 0);
  const sxy = data.reduce((a, b) => a + b[0] * b[1], 0);
  const sx2 = data.reduce((a, b) => a + b[0] * b[0], 0);
  const slope = (n * sxy - sx * sy) / (n * sx2 - sx * sx);
  const intercept = (sy - slope * sx) / n;

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">
        Corrélation cours mondial / BCC (R²=0,94)
      </h3>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ maxHeight: 280 }}>
        {[960, 1000, 1040, 1080].map((v) => {
          const y = toY(v);
          return (
            <g key={v}>
              <line x1={PL} y1={y} x2={W - PR} y2={y} stroke="#e5e7eb" strokeWidth={1} />
              <text x={PL - 4} y={y + 4} textAnchor="end" fontSize={9} fill="#9ca3af">{v}</text>
            </g>
          );
        })}
        {[2800, 3200, 3600, 4000].map((v) => {
          const x = toX(v);
          return (
            <g key={v}>
              <line x1={x} y1={PT} x2={x} y2={PT + yH} stroke="#e5e7eb" strokeWidth={1} />
              <text x={x} y={PT + yH + 14} textAnchor="middle" fontSize={9} fill="#9ca3af">{v}</text>
            </g>
          );
        })}
        <line
          x1={toX(xMin)} y1={toY(slope * xMin + intercept)}
          x2={toX(xMax)} y2={toY(slope * xMax + intercept)}
          stroke="#E65100" strokeWidth={1.5} strokeDasharray="4,3"
        />
        {data.map((p, i) => (
          <circle key={i} cx={toX(p[0])} cy={toY(p[1])} r={3.5} fill="#2E7D32" opacity={0.7} />
        ))}
        <text x={PL + xW / 2} y={H - 4} textAnchor="middle" fontSize={9} fill="#6b7280">London ICE ($/t)</text>
        <text x={12} y={PT + yH / 2} textAnchor="middle" fontSize={9} fill="#6b7280"
          transform={`rotate(-90, 12, ${PT + yH / 2})`}>BCC Abidjan (XOF/kg)</text>
      </svg>
    </div>
  );
}

// ─── Table Benchmarks ────────────────────────────────────────────────────────
function TableBenchmarks() {
  const rows = [
    { metric: "Rendement moyen", agri: "1,14 t/ha", moy: "0,92 t/ha", norme: "≥1,0", ecart: "+24% ✅" },
    { metric: "Taux Grade AA", agri: "62%", moy: "38%", norme: "≥40%", ecart: "+24pp ✅" },
    { metric: "Humidité finale", agri: "7,2%", moy: "8,1%", norme: "≤8%", ecart: "✅" },
    { metric: "Certification RA", agri: "5/8 parcelles", moy: "1/3 typique", norme: "—", ecart: "✅" },
  ];
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">Benchmarks concurrents</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-[#F8FBF8]">
              {["Métrique", "AGRIFRIK", "Moy. Coopératives CI", "Norme RA", "Écart"].map((h) => (
                <th key={h} className="px-3 py-2 text-left font-semibold text-gray-600">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-t border-gray-50 hover:bg-gray-50">
                <td className="px-3 py-2 font-medium text-gray-800">{r.metric}</td>
                <td className="px-3 py-2 text-green-700 font-semibold">{r.agri}</td>
                <td className="px-3 py-2 text-gray-500">{r.moy}</td>
                <td className="px-3 py-2 text-gray-500">{r.norme}</td>
                <td className="px-3 py-2 text-green-600 font-semibold">{r.ecart}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── SVG Grouped Bar : Prévision récolte ─────────────────────────────────────
function GroupedBarRecolte() {
  const cultures = [
    { label: "Cacao", prev: 94, ia: 97 },
    { label: "Anacarde", prev: 26, ia: 27 },
    { label: "Maïs", prev: 4, ia: 4.2 },
  ];
  const W = 640, H = 240, PL = 60, PR = 30, PT = 36, PB = 50;
  const xW = W - PL - PR, yH = H - PT - PB;
  const maxV = 110;
  const groupW = xW / cultures.length;
  const bW = 36;
  const toY = (v: number) => PT + yH - (v / maxV) * yH;

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">
        Prévision de récolte 2025 par culture (t)
      </h3>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ maxHeight: 240 }}>
        {[0, 25, 50, 75, 100].map((v) => {
          const y = toY(v);
          return (
            <g key={v}>
              <line x1={PL} y1={y} x2={W - PR} y2={y} stroke="#e5e7eb" strokeWidth={1} />
              <text x={PL - 4} y={y + 4} textAnchor="end" fontSize={10} fill="#9ca3af">{v}</text>
            </g>
          );
        })}
        {cultures.map((c, i) => {
          const cx = PL + i * groupW + groupW / 2;
          return (
            <g key={c.label}>
              <rect x={cx - bW - 3} y={toY(c.prev)} width={bW} height={(c.prev / maxV) * yH} rx={3} fill="#d1d5db" />
              <text x={cx - bW / 2 - 3} y={toY(c.prev) - 4} textAnchor="middle" fontSize={10} fill="#6b7280">
                {c.prev}t
              </text>
              <rect x={cx + 3} y={toY(c.ia)} width={bW} height={(c.ia / maxV) * yH} rx={3} fill="#2E7D32" opacity={0.85} />
              <text x={cx + bW / 2 + 3} y={toY(c.ia) - 4} textAnchor="middle" fontSize={10} fontWeight="600" fill="#1B5E20">
                {c.ia}t
              </text>
              <text x={cx} y={H - 12} textAnchor="middle" fontSize={11} fill="#374151">{c.label}</text>
            </g>
          );
        })}
        {/* Legend */}
        <rect x={PL + 20} y={8} width={12} height={10} rx={2} fill="#d1d5db" />
        <text x={PL + 36} y={18} fontSize={10} fill="#6b7280">Prévision initiale</text>
        <rect x={PL + 160} y={8} width={12} height={10} rx={2} fill="#2E7D32" />
        <text x={PL + 176} y={18} fontSize={10} fill="#2E7D32">Révision IA</text>
      </svg>
    </div>
  );
}

// ─── Table Scénarios ──────────────────────────────────────────────────────────
function TableScenarios() {
  const rows = [
    { sc: "Pessimiste", ca: "88,4 M XOF", marge: "21,8 M XOF", hyp: "El Niño avéré, mildiou PAR-B", badge: "bg-red-50 text-red-700" },
    { sc: "Base", ca: "102,0 M XOF", marge: "28,4 M XOF", hyp: "Conditions normales", badge: "bg-blue-50 text-blue-700" },
    { sc: "Optimiste", ca: "118,6 M XOF", marge: "38,2 M XOF", hyp: "Prix cacao +10%, pluviométrie optimale", badge: "bg-green-50 text-green-700" },
  ];
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">Scénarios 2025</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-[#F8FBF8]">
              {["Scénario", "CA total", "Marge", "Hypothèse"].map((h) => (
                <th key={h} className="px-3 py-2 text-left font-semibold text-gray-600">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-t border-gray-50">
                <td className="px-3 py-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${r.badge}`}>{r.sc}</span>
                </td>
                <td className="px-3 py-2 font-semibold text-gray-800">{r.ca}</td>
                <td className="px-3 py-2 text-gray-700">{r.marge}</td>
                <td className="px-3 py-2 text-gray-500 italic">{r.hyp}</td>
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

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-gray-50">
      <Topbar breadcrumb={["Rapports", "Analytics"]} />

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Onglets */}
        <div className="flex gap-1 bg-white border border-gray-100 rounded-xl p-1 w-fit">
          {TABS.map((t, i) => (
            <button
              key={t}
              onClick={() => setTab(i)}
              className={`px-4 py-2 rounded-lg text-xs font-medium transition-colors ${
                tab === i
                  ? "bg-[#2E7D32] text-white shadow-sm"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Vue d'ensemble */}
        {tab === 0 && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <KpiCard label="CA YTD" value="95,8 M XOF" trend="+12%" />
              <KpiCard label="Volume Cacao" value="86,2 t" sub="+ 24,8 t anacarde" />
              <KpiCard label="Rendement moyen" value="1,14 t/ha" />
              <KpiCard label="Coûts totaux" value="68,4 M XOF" />
              <KpiCard label="Marge nette" value="27,4 M XOF" sub="28,6%" trend="+12%" />
            </div>
            <LineChartCA />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              <DonutCA />
              <TableClients />
            </div>
          </div>
        )}

        {/* Performance */}
        {tab === 1 && (
          <div className="space-y-6">
            <BarRendement />
            <WaterfallCout />
            <TablePerf />
          </div>
        )}

        {/* Marchés */}
        {tab === 2 && (
          <div className="space-y-6">
            <AreaCours />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              <ScatterCorrelation />
              <TableBenchmarks />
            </div>
          </div>
        )}

        {/* Prédictions */}
        {tab === 3 && (
          <div className="space-y-6">
            <GroupedBarRecolte />
            <TableScenarios />
          </div>
        )}
      </div>
    </div>
  );
}
