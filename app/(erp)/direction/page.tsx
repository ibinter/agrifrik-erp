"use client";

import { useState } from "react";
import Topbar from "../../components/Topbar";

const TABS = ["Synthèse", "Financier", "Opérationnel"];

// ─── KPI Card direction ───────────────────────────────────────────────────────
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
      <span className="text-xl font-bold text-gray-900">{value}</span>
      {sub && <span className="text-xs text-gray-400">{sub}</span>}
      {trend && (
        <span className={`text-xs font-semibold ${up ? "text-green-600" : down ? "text-red-500" : "text-gray-500"}`}>
          {trend}
        </span>
      )}
    </div>
  );
}

// ─── Alertes direction ────────────────────────────────────────────────────────
function AlertesDirection() {
  const alertes = [
    {
      num: 1,
      text: "PAR-B1 : risque mildiou — traitement planifié 11/07",
      detail: "Impact potentiel -1,5 M XOF si non traité",
      level: "warn",
    },
    {
      num: 2,
      text: "Loyer PAR-B1+B2 dû le 14/07 : 1 980 000 XOF",
      detail: "Trésorerie OK",
      level: "ok",
    },
    {
      num: 3,
      text: "Contrat KCl SCPA en attente signature : 7,2 M XOF",
      detail: "URGENT",
      level: "urgent",
    },
  ];
  const colors: Record<string, string> = {
    warn: "bg-yellow-50 border-yellow-200 text-yellow-800",
    ok: "bg-green-50 border-green-200 text-green-800",
    urgent: "bg-red-50 border-red-200 text-red-800",
  };
  const badge: Record<string, string> = {
    warn: "bg-yellow-100 text-yellow-700",
    ok: "bg-green-100 text-green-700",
    urgent: "bg-red-100 text-red-700",
  };
  return (
    <div className="rounded-2xl border border-orange-200 bg-orange-50 p-5">
      <h3 className="text-sm font-bold text-orange-800 mb-3">
        Alertes Direction — {alertes.length} points d'attention
      </h3>
      <div className="space-y-3">
        {alertes.map((a) => (
          <div key={a.num} className={`rounded-xl border px-4 py-3 flex items-start gap-3 ${colors[a.level]}`}>
            <span className="font-bold text-sm mt-0.5">{a.num}.</span>
            <div className="flex-1">
              <p className="text-sm font-medium">{a.text}</p>
              <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-semibold ${badge[a.level]}`}>
                {a.detail}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── SVG Radar : 4 axes stratégiques ─────────────────────────────────────────
function RadarChart() {
  const axes = [
    { label: "Éco.", v2024: 74, v2025: 82 },
    { label: "Durabilité", v2024: 70, v2025: 78 },
    { label: "Qualité", v2024: 88, v2025: 96 },
    { label: "RH", v2024: 68, v2025: 74 },
    { label: "Innovation", v2024: 60, v2025: 68 },
  ];
  const cx = 150, cy = 150, maxR = 110, n = axes.length;
  const rad = (i: number) => (i / n) * 2 * Math.PI - Math.PI / 2;
  const toXY = (r: number, i: number) => [cx + r * Math.cos(rad(i)), cy + r * Math.sin(rad(i))];

  const polygon = (vals: number[], max = 100) =>
    axes
      .map((a, i) => toXY((vals[i] / max) * maxR, i))
      .map(([x, y]) => `${x},${y}`)
      .join(" ");

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">
        Tableau de bord stratégique — 5 axes
      </h3>
      <svg viewBox="0 0 300 300" className="w-full" style={{ maxHeight: 300 }}>
        {/* Grid rings */}
        {[25, 50, 75, 100].map((pct) => (
          <polygon
            key={pct}
            points={polygon(axes.map(() => pct))}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth={1}
          />
        ))}
        {/* Axis lines */}
        {axes.map((_, i) => {
          const [x, y] = toXY(maxR, i);
          return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="#e5e7eb" strokeWidth={1} />;
        })}
        {/* 2024 polygon */}
        <polygon
          points={polygon(axes.map((a) => a.v2024))}
          fill="#9ca3af"
          fillOpacity={0.15}
          stroke="#9ca3af"
          strokeWidth={1.5}
        />
        {/* 2025 polygon */}
        <polygon
          points={polygon(axes.map((a) => a.v2025))}
          fill="#2E7D32"
          fillOpacity={0.2}
          stroke="#2E7D32"
          strokeWidth={2}
        />
        {/* Axis labels */}
        {axes.map((a, i) => {
          const [x, y] = toXY(maxR + 18, i);
          return (
            <text key={i} x={x} y={y} textAnchor="middle" dominantBaseline="middle" fontSize={11} fill="#374151">
              {a.label}
            </text>
          );
        })}
        {/* Scores 2025 */}
        {axes.map((a, i) => {
          const [x, y] = toXY((a.v2025 / 100) * maxR, i);
          return <circle key={i} cx={x} cy={y} r={3.5} fill="#2E7D32" />;
        })}
        {/* Legend */}
        <rect x={10} y={270} width={12} height={8} fill="#9ca3af" fillOpacity={0.5} />
        <text x={26} y={278} fontSize={10} fill="#6b7280">2024</text>
        <rect x={70} y={270} width={12} height={8} fill="#2E7D32" fillOpacity={0.5} />
        <text x={86} y={278} fontSize={10} fill="#2E7D32">2025</text>
      </svg>
    </div>
  );
}

// ─── Table objectifs 2025 ─────────────────────────────────────────────────────
function TableObjectifs() {
  const rows = [
    { obj: "CA total", cible: "110 M XOF", realise: "95,8 M (87%)", statut: "yellow" },
    { obj: "Surface certifiée RA", cible: "35 ha", realise: "28,8 ha (82%)", statut: "yellow" },
    { obj: "Rendement moyen", cible: "1,20 t/ha", realise: "1,14 t/ha (95%)", statut: "yellow" },
    { obj: "Zéro déforestation", cible: "100%", realise: "100% ✅", statut: "green" },
    { obj: "Score qualité", cible: "≥95/100", realise: "96,2/100 ✅", statut: "green" },
    { obj: "Recrutement", cible: "+3 postes", realise: "2/3 (67%)", statut: "yellow" },
  ];
  const badgeMap: Record<string, string> = {
    green: "bg-green-100 text-green-700",
    yellow: "bg-yellow-100 text-yellow-700",
  };
  const iconMap: Record<string, string> = { green: "🟢", yellow: "🟡" };
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">Objectifs 2025 vs Réalisé</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-[#F8FBF8]">
              {["Objectif", "Cible", "Réalisé YTD", "Statut"].map((h) => (
                <th key={h} className="px-3 py-2 text-left font-semibold text-gray-600">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-t border-gray-50 hover:bg-gray-50">
                <td className="px-3 py-2 font-medium text-gray-800">{r.obj}</td>
                <td className="px-3 py-2 text-gray-600">{r.cible}</td>
                <td className="px-3 py-2 text-gray-700">{r.realise}</td>
                <td className="px-3 py-2">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${badgeMap[r.statut]}`}>
                    {iconMap[r.statut]} {r.statut === "green" ? "Atteint" : "En cours"}
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

// ─── SVG Waterfall P&L ───────────────────────────────────────────────────────
function WaterfallPL() {
  const items = [
    { label: "CA", val: 95.8, type: "pos" },
    { label: "Intrants", val: -22.4, type: "neg" },
    { label: "MO", val: -18.2, type: "neg" },
    { label: "Frais gén.", val: -9.8, type: "neg" },
    { label: "Amortiss.", val: -6.2, type: "neg" },
    { label: "EBITDA", val: 39.2, type: "subtotal" },
    { label: "Intérêts", val: -4.8, type: "neg" },
    { label: "Impôts", val: -3.2, type: "neg" },
    { label: "Résultat net", val: 31.2, type: "total" },
  ];
  const W = 680, H = 280, PL = 45, PR = 20, PT = 20, PB = 50;
  const xW = W - PL - PR, yH = H - PT - PB;
  const bW = xW / items.length - 6;
  const maxVal = 100;
  const colors: Record<string, string> = {
    pos: "#4CAF50", neg: "#ef4444", subtotal: "#2196F3", total: "#1B5E20",
  };

  // Running totals for waterfall positioning
  let running = 0;
  const bars = items.map((item) => {
    const abs = Math.abs(item.val);
    let base: number;
    if (item.type === "pos") { base = running; running += item.val; }
    else if (item.type === "neg") { base = running + item.val; running += item.val; }
    else { base = 0; } // subtotal and total reset
    if (item.type === "subtotal") running = item.val;
    if (item.type === "total") running = item.val;
    return { ...item, abs, base };
  });

  const toY = (v: number) => PT + yH - (v / maxVal) * yH;

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">P&L YTD Synthétique (M XOF)</h3>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ maxHeight: 280 }}>
        {[0, 25, 50, 75, 100].map((v) => {
          const y = toY(v);
          return (
            <g key={v}>
              <line x1={PL} y1={y} x2={W - PR} y2={y} stroke="#e5e7eb" strokeWidth={1} />
              <text x={PL - 4} y={y + 4} textAnchor="end" fontSize={9} fill="#9ca3af">{v}</text>
            </g>
          );
        })}
        {bars.map((b, i) => {
          const x = PL + i * (bW + 6);
          const barH = (b.abs / maxVal) * yH;
          const y = b.type === "neg" ? toY(b.base + b.abs) : toY(b.base + b.abs);
          const rectY = b.type === "neg"
            ? toY(b.base)
            : (b.type === "subtotal" || b.type === "total" || b.type === "pos")
              ? toY(b.base + b.abs)
              : toY(b.base);
          return (
            <g key={b.label}>
              <rect
                x={x}
                y={b.type === "neg" ? toY(b.base) : toY(b.base + b.abs)}
                width={bW}
                height={barH}
                rx={3}
                fill={colors[b.type]}
                opacity={0.88}
              />
              <text
                x={x + bW / 2}
                y={(b.type === "neg" ? toY(b.base) : toY(b.base + b.abs)) - 4}
                textAnchor="middle"
                fontSize={8.5}
                fontWeight="600"
                fill="#374151"
              >
                {b.val > 0 ? "+" : ""}{b.val}
              </text>
              <text x={x + bW / 2} y={H - 8} textAnchor="middle" fontSize={8} fill="#6b7280">
                {b.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// ─── 4 ratios financiers ──────────────────────────────────────────────────────
function RatiosFinanciers() {
  const ratios = [
    { label: "ROE", value: "18,4%", sub: "Retour sur fonds propres" },
    { label: "ROI Actifs agri.", value: "22,1%", sub: "Retour sur actifs agricoles" },
    { label: "Ratio d'endettement", value: "0,34", sub: "Levier financier" },
    { label: "DSO", value: "18,4 j", sub: "Délai moyen encaissement" },
  ];
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {ratios.map((r) => (
        <div key={r.label} className="rounded-2xl border border-gray-100 bg-white p-5 text-center">
          <p className="text-xs text-gray-500 mb-1">{r.label}</p>
          <p className="text-2xl font-bold text-[#2E7D32]">{r.value}</p>
          <p className="text-xs text-gray-400 mt-1">{r.sub}</p>
        </div>
      ))}
    </div>
  );
}

// ─── Table Budget vs Réalisé H1 ───────────────────────────────────────────────
function TableBudget() {
  const rows = [
    { poste: "Achats intrants", budget: "24 M", realise: "22,4 M", ecart: "-1,6 M", alerte: "ok", alert_text: "Sous budget" },
    { poste: "Main d'oeuvre", budget: "19 M", realise: "18,2 M", ecart: "-0,8 M", alerte: "ok", alert_text: "Sous budget" },
    { poste: "Frais généraux", budget: "11 M", realise: "9,8 M", ecart: "-1,2 M", alerte: "ok", alert_text: "Sous budget" },
    { poste: "Investissements", budget: "8 M", realise: "4,2 M", ecart: "-3,8 M", alerte: "warn", alert_text: "Retard" },
  ];
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">Budget vs Réalisé H1 2025</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-[#F8FBF8]">
              {["Poste", "Budget H1", "Réalisé", "Écart", "Alerte"].map((h) => (
                <th key={h} className="px-3 py-2 text-left font-semibold text-gray-600">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-t border-gray-50 hover:bg-gray-50">
                <td className="px-3 py-2 font-medium text-gray-800">{r.poste}</td>
                <td className="px-3 py-2 text-gray-600">{r.budget} XOF</td>
                <td className="px-3 py-2 text-gray-700">{r.realise} XOF</td>
                <td className="px-3 py-2 text-green-600 font-semibold">{r.ecart} XOF</td>
                <td className="px-3 py-2">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${r.alerte === "ok" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"}`}>
                    {r.alerte === "ok" ? "✅" : "⚠️"} {r.alert_text}
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

// ─── SVG Heatmap opérationnelle ───────────────────────────────────────────────
function HeatmapOp() {
  const months = ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun", "Jul", "Aoû", "Sep", "Oct", "Nov", "Déc"];
  const criteres = ["Rendement", "Qualité", "Sécurité", "Maintenance", "Logistique", "RH"];
  // Scores 0–100 : valeurs réalistes
  const scores = [
    [82, 88, 90, 87, 85, 91, 93, 92, 88, 86, 84, 89],
    [90, 92, 95, 94, 96, 97, 96, 95, 94, 93, 92, 95],
    [100, 100, 98, 100, 100, 98, 100, 100, 100, 98, 100, 100],
    [75, 78, 80, 76, 82, 85, 84, 80, 78, 76, 79, 81],
    [80, 82, 85, 83, 86, 88, 87, 85, 84, 82, 83, 86],
    [70, 72, 74, 73, 75, 78, 80, 79, 76, 74, 73, 75],
  ];
  const cellW = 42, cellH = 32, PL = 90, PT = 24;
  const W = PL + months.length * cellW + 10;
  const H = PT + criteres.length * cellH + 20;

  const color = (v: number) => {
    if (v >= 90) return "#4CAF50";
    if (v >= 80) return "#8BC34A";
    if (v >= 70) return "#FFC107";
    return "#FF7043";
  };

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 overflow-x-auto">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">
        Carte de chaleur opérationnelle (12 mois × 6 critères)
      </h3>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ minWidth: 580, maxHeight: 260 }}>
        {months.map((m, mi) => (
          <text key={m} x={PL + mi * cellW + cellW / 2} y={PT - 6} textAnchor="middle" fontSize={9} fill="#9ca3af">
            {m}
          </text>
        ))}
        {criteres.map((c, ci) => {
          const y = PT + ci * cellH;
          return (
            <g key={c}>
              <text x={PL - 6} y={y + cellH / 2 + 4} textAnchor="end" fontSize={10} fill="#374151">{c}</text>
              {months.map((_, mi) => {
                const v = scores[ci][mi];
                const x = PL + mi * cellW;
                return (
                  <g key={mi}>
                    <rect x={x + 1} y={y + 1} width={cellW - 2} height={cellH - 2} rx={3} fill={color(v)} opacity={0.75} />
                    <text x={x + cellW / 2} y={y + cellH / 2 + 4} textAnchor="middle" fontSize={9} fontWeight="600" fill="white">
                      {v}
                    </text>
                  </g>
                );
              })}
            </g>
          );
        })}
        {/* Legend */}
        {[["≥90", "#4CAF50"], ["≥80", "#8BC34A"], ["≥70", "#FFC107"], ["<70", "#FF7043"]].map(([label, c], i) => (
          <g key={label} transform={`translate(${PL + i * 70}, ${H - 8})`}>
            <rect width={10} height={10} rx={2} fill={c} />
            <text x={14} y={9} fontSize={9} fill="#6b7280">{label}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}

// ─── Top/Flop parcelles ───────────────────────────────────────────────────────
function TopFlopParcelles() {
  const tops = [
    { label: "PAR-A1", score: 94 },
    { label: "PAR-C1", score: 91 },
    { label: "PAR-A2", score: 89 },
  ];
  const flops = [
    { label: "PAR-B1", score: 71, warn: true },
    { label: "PAR-D1", score: 76 },
    { label: "PAR-D2", score: 78 },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="rounded-2xl border border-gray-100 bg-white p-5">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Top 3 parcelles</h3>
        <div className="space-y-2">
          {tops.map((p, i) => (
            <div key={p.label} className="flex items-center gap-3">
              <span className="text-lg font-bold text-green-600">{i + 1}</span>
              <div className="flex-1">
                <div className="flex justify-between mb-0.5">
                  <span className="text-xs font-medium text-gray-700">{p.label}</span>
                  <span className="text-xs font-bold text-green-600">{p.score}/100</span>
                </div>
                <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[#2E7D32]"
                    style={{ width: `${p.score}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-2xl border border-gray-100 bg-white p-5">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Flop 3 parcelles</h3>
        <div className="space-y-2">
          {flops.map((p) => (
            <div key={p.label} className="flex items-center gap-3">
              <span className="text-lg font-bold text-red-400">{p.warn ? "⚠️" : "▼"}</span>
              <div className="flex-1">
                <div className="flex justify-between mb-0.5">
                  <span className="text-xs font-medium text-gray-700">{p.label}</span>
                  <span className="text-xs font-bold text-orange-600">{p.score}/100</span>
                </div>
                <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-orange-400"
                    style={{ width: `${p.score}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Dashboard RH simplifié ───────────────────────────────────────────────────
function DashboardRH() {
  const stats = [
    { label: "Permanents", value: "15" },
    { label: "Saisonniers actifs", value: "8" },
    { label: "Postes ouverts", value: "2" },
    { label: "Absentéisme H1", value: "2,1%", ok: true, seuil: "seuil 5%" },
    { label: "Formations H1", value: "8 sessions" },
    { label: "Heures formation", value: "62 h" },
  ];
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">Tableau de bord RH</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <p className="text-2xl font-bold text-[#2E7D32]">{s.value}</p>
            <p className="text-xs text-gray-500 mt-1">{s.label}</p>
            {s.ok && (
              <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-xs bg-green-100 text-green-700 font-medium">
                ✅ {s.seuil}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Page principale ──────────────────────────────────────────────────────────
export default function DirectionPage() {
  const [tab, setTab] = useState(0);

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-gray-50">
      <Topbar breadcrumb={["Rapports", "Tableau de bord Direction"]} />

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

        {/* Synthèse */}
        {tab === 0 && (
          <div className="space-y-6">
            <AlertesDirection />
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <KpiCard label="CA YTD" value="95,8 M XOF" trend="+12% vs N-1" />
              <KpiCard label="EBITDA" value="31,2 M XOF" sub="32,6% de marge" />
              <KpiCard label="Trésorerie nette" value="18,4 M XOF" />
              <KpiCard label="Effectif" value="15 permanents" />
              <KpiCard label="Surface certifiée RA" value="28,8 ha" sub="68% de la surface" />
              <KpiCard label="Score ESG" value="78/100" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              <RadarChart />
              <TableObjectifs />
            </div>
          </div>
        )}

        {/* Financier */}
        {tab === 1 && (
          <div className="space-y-6">
            <WaterfallPL />
            <RatiosFinanciers />
            <TableBudget />
          </div>
        )}

        {/* Opérationnel */}
        {tab === 2 && (
          <div className="space-y-6">
            <HeatmapOp />
            <TopFlopParcelles />
            <DashboardRH />
          </div>
        )}
      </div>
    </div>
  );
}
