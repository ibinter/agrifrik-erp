"use client";

import { useState } from "react";
import Topbar from "../../components/Topbar";
import {
  Download,
  Share2,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

/* ─────────────────── Types ─────────────────── */
type Period = "7j" | "30j" | "90j" | "6m" | "annee" | "custom";
type Tab = "overview" | "production" | "commerce" | "finance" | "rh";

/* ─────────────────── Helpers ─────────────────── */
function fmt(n: number) {
  return n.toLocaleString("fr-FR");
}

/* ─────────────────── Sparkline SVG inline ─────────────────── */
function Sparkline({
  points,
  color,
  width = 80,
  height = 28,
}: {
  points: number[];
  color: string;
  width?: number;
  height?: number;
}) {
  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;
  const step = width / (points.length - 1);
  const coords = points.map((v, i) => {
    const x = i * step;
    const y = height - ((v - min) / range) * (height - 4) - 2;
    return `${x},${y}`;
  });
  const polyline = coords.join(" ");
  const fill =
    coords.join(" ") +
    ` ${width},${height} 0,${height}`;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
      <defs>
        <linearGradient id={`sg-${color.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <polygon
        points={fill}
        fill={`url(#sg-${color.replace("#", "")})`}
      />
      <polyline
        points={polyline}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ─────────────────── Donut SVG ─────────────────── */
function Donut({
  data,
  size = 160,
}: {
  data: { label: string; value: number; color: string }[];
  size?: number;
}) {
  const total = data.reduce((s, d) => s + d.value, 0);
  const r = size / 2 - 12;
  const cx = size / 2;
  const cy = size / 2;
  let cumAngle = -90;

  const slices = data.map((d) => {
    const angle = (d.value / total) * 360;
    const startAngle = cumAngle;
    cumAngle += angle;
    const endAngle = cumAngle;
    const toRad = (a: number) => (a * Math.PI) / 180;
    const x1 = cx + r * Math.cos(toRad(startAngle));
    const y1 = cy + r * Math.sin(toRad(startAngle));
    const x2 = cx + r * Math.cos(toRad(endAngle));
    const y2 = cy + r * Math.sin(toRad(endAngle));
    const largeArc = angle > 180 ? 1 : 0;
    const path = `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`;
    return { ...d, path, angle };
  });

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {slices.map((s, i) => (
        <path key={i} d={s.path} fill={s.color} stroke="white" strokeWidth="2" />
      ))}
      <circle cx={cx} cy={cy} r={r * 0.55} fill="white" className="dark:fill-slate-800" />
    </svg>
  );
}

/* ─────────────────── Waterfall SVG ─────────────────── */
function WaterfallChart() {
  const steps = [
    { label: "CA", value: 145.2, type: "start", color: "#2E7D32" },
    { label: "Ch. variables", value: -48.3, type: "neg", color: "#EF4444" },
    { label: "Marge brute", value: 96.9, type: "subtotal", color: "#1565C0" },
    { label: "Ch. fixes", value: -22.1, type: "neg", color: "#EF4444" },
    { label: "EBITDA", value: 74.8, type: "subtotal", color: "#1565C0" },
    { label: "D&A", value: -8.4, type: "neg", color: "#EF4444" },
    { label: "Résultat", value: 66.4, type: "end", color: "#2E7D32" },
  ];

  const W = 620;
  const H = 200;
  const pad = { l: 48, r: 16, t: 16, b: 48 };
  const chartW = W - pad.l - pad.r;
  const chartH = H - pad.t - pad.b;
  const barW = chartW / steps.length - 10;
  const maxVal = 160;

  let running = 0;
  const bars = steps.map((s, i) => {
    const x = pad.l + i * (chartW / steps.length) + 4;
    let base: number;
    let barH: number;

    if (s.type === "start" || s.type === "end" || s.type === "subtotal") {
      base = 0;
      barH = (s.value / maxVal) * chartH;
    } else {
      base = running;
      barH = Math.abs(s.value / maxVal) * chartH;
    }

    const y =
      s.type === "neg"
        ? pad.t + chartH - ((running / maxVal) * chartH)
        : pad.t + chartH - ((base + (s.value > 0 ? s.value : 0)) / maxVal) * chartH;

    if (s.type !== "subtotal" && s.type !== "end") {
      running += s.value;
    }

    return { ...s, x, y, barH, base };
  });

  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H}`} className="overflow-visible">
      {/* grid lines */}
      {[0, 40, 80, 120, 160].map((v) => {
        const y = pad.t + chartH - (v / maxVal) * chartH;
        return (
          <g key={v}>
            <line x1={pad.l} y1={y} x2={W - pad.r} y2={y} stroke="#E2E8F0" strokeWidth="1" />
            <text x={pad.l - 4} y={y + 4} textAnchor="end" fontSize="9" fill="#94A3B8">{v}M</text>
          </g>
        );
      })}
      {bars.map((b, i) => (
        <g key={i}>
          <rect x={b.x} y={b.y} width={barW} height={Math.max(b.barH, 2)} fill={b.color} rx="3" opacity="0.85" />
          <text x={b.x + barW / 2} y={b.y - 4} textAnchor="middle" fontSize="9" fontWeight="600" fill={b.color}>
            {b.value > 0 ? "+" : ""}{b.value}M
          </text>
          <text x={b.x + barW / 2} y={H - 8} textAnchor="middle" fontSize="9" fill="#64748B">
            {b.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

/* ─────────────────── Area Chart SVG ─────────────────── */
function AreaChart({
  series,
  labels,
  height = 160,
}: {
  series: { name: string; color: string; values: number[] }[];
  labels: string[];
  height?: number;
}) {
  const W = 620;
  const H = height;
  const pad = { l: 40, r: 16, t: 16, b: 28 };
  const chartW = W - pad.l - pad.r;
  const chartH = H - pad.t - pad.b;
  const allVals = series.flatMap((s) => s.values);
  const maxVal = Math.max(...allVals) * 1.1;
  const step = chartW / (labels.length - 1);

  const toPath = (values: number[]) =>
    values
      .map((v, i) => {
        const x = pad.l + i * step;
        const y = pad.t + chartH - (v / maxVal) * chartH;
        return `${i === 0 ? "M" : "L"} ${x} ${y}`;
      })
      .join(" ");

  const toArea = (values: number[]) => {
    const line = toPath(values);
    const lastX = pad.l + (values.length - 1) * step;
    return `${line} L ${lastX} ${pad.t + chartH} L ${pad.l} ${pad.t + chartH} Z`;
  };

  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H}`}>
      <defs>
        {series.map((s) => (
          <linearGradient key={s.name} id={`area-${s.name}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={s.color} stopOpacity="0.3" />
            <stop offset="100%" stopColor={s.color} stopOpacity="0.02" />
          </linearGradient>
        ))}
      </defs>
      {[0, 0.25, 0.5, 0.75, 1].map((r) => {
        const y = pad.t + chartH * (1 - r);
        return (
          <line key={r} x1={pad.l} y1={y} x2={W - pad.r} y2={y} stroke="#E2E8F0" strokeWidth="1" />
        );
      })}
      {series.map((s) => (
        <g key={s.name}>
          <path d={toArea(s.values)} fill={`url(#area-${s.name})`} />
          <path d={toPath(s.values)} fill="none" stroke={s.color} strokeWidth="2" strokeLinejoin="round" />
        </g>
      ))}
      {labels.map((l, i) => (
        <text key={l} x={pad.l + i * step} y={H - 6} textAnchor="middle" fontSize="9" fill="#94A3B8">
          {l}
        </text>
      ))}
    </svg>
  );
}

/* ─────────────────── Bar Chart SVG (grouped) ─────────────────── */
function BarChartGrouped() {
  const months = ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun", "Jul", "Aoû", "Sep", "Oct", "Nov", "Déc"];
  const ca =    [8.2, 9.4, 11.2, 10.8, 12.1, 13.4, 14.2, 13.8, 12.9, 14.8, 15.2, 14.9];
  const ch =    [5.8, 6.2, 7.1,  6.9,  7.8,  8.4,  8.9,  8.7,  8.1,  9.2,  9.5,  9.1];
  const res =   [2.4, 3.2, 4.1,  3.9,  4.3,  5.0,  5.3,  5.1,  4.8,  5.6,  5.7,  5.8];

  const W = 700;
  const H = 280;
  const pad = { l: 48, r: 48, t: 24, b: 36 };
  const chartW = W - pad.l - pad.r;
  const chartH = H - pad.t - pad.b;
  const maxVal = 18;
  const groupW = chartW / months.length;
  const barW = groupW * 0.32;

  const yScale = (v: number) => pad.t + chartH - (v / maxVal) * chartH;

  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H}`}>
      {/* grid */}
      {[0, 5, 10, 15].map((v) => {
        const y = yScale(v);
        return (
          <g key={v}>
            <line x1={pad.l} y1={y} x2={W - pad.r} y2={y} stroke="#E2E8F0" strokeWidth="1" strokeDasharray="3,3" />
            <text x={pad.l - 4} y={y + 4} textAnchor="end" fontSize="9" fill="#94A3B8">{v}M</text>
          </g>
        );
      })}

      {months.map((m, i) => {
        const gx = pad.l + i * groupW + groupW / 2;
        const caH = (ca[i] / maxVal) * chartH;
        const chH = (ch[i] / maxVal) * chartH;

        return (
          <g key={m}>
            {/* CA bar */}
            <rect
              x={gx - barW - 1}
              y={pad.t + chartH - caH}
              width={barW}
              height={caH}
              fill="#2E7D32"
              rx="2"
              opacity="0.85"
            />
            {/* Charges bar */}
            <rect
              x={gx + 1}
              y={pad.t + chartH - chH}
              width={barW}
              height={chH}
              fill="#CBD5E1"
              rx="2"
            />
            {/* label */}
            <text x={gx} y={H - 8} textAnchor="middle" fontSize="8.5" fill="#94A3B8">{m}</text>
          </g>
        );
      })}

      {/* Résultat line */}
      <polyline
        points={res.map((v, i) => {
          const gx = pad.l + i * groupW + groupW / 2;
          return `${gx},${yScale(v)}`;
        }).join(" ")}
        fill="none"
        stroke="#F59E0B"
        strokeWidth="2.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {res.map((v, i) => {
        const gx = pad.l + i * groupW + groupW / 2;
        return (
          <circle key={i} cx={gx} cy={yScale(v)} r="3" fill="#F59E0B" stroke="white" strokeWidth="1.5" />
        );
      })}

      {/* Legend */}
      <rect x={pad.l} y={8} width={10} height={10} fill="#2E7D32" rx="2" />
      <text x={pad.l + 14} y={17} fontSize="9" fill="#64748B">CA</text>
      <rect x={pad.l + 50} y={8} width={10} height={10} fill="#CBD5E1" rx="2" />
      <text x={pad.l + 64} y={17} fontSize="9" fill="#64748B">Charges</text>
      <line x1={pad.l + 120} y1={13} x2={pad.l + 130} y2={13} stroke="#F59E0B" strokeWidth="2.5" />
      <circle cx={pad.l + 125} cy={13} r="3" fill="#F59E0B" />
      <text x={pad.l + 134} y={17} fontSize="9" fill="#64748B">Résultat</text>
    </svg>
  );
}

/* ─────────────────── Funnel SVG ─────────────────── */
function FunnelChart() {
  const steps = [
    { label: "Devis", value: 120, color: "#3B82F6" },
    { label: "Commandes", value: 84, color: "#8B5CF6" },
    { label: "Livraisons", value: 76, color: "#F59E0B" },
    { label: "Paiements", value: 71, color: "#10B981" },
  ];
  const maxW = 320;
  const H = 160;
  const barH = 28;
  const gap = (H - steps.length * barH) / (steps.length + 1);

  return (
    <svg width="100%" viewBox={`0 0 400 ${H}`}>
      {steps.map((s, i) => {
        const w = (s.value / steps[0].value) * maxW;
        const x = (maxW - w) / 2 + 20;
        const y = gap + i * (barH + gap);
        const pct = i === 0 ? 100 : Math.round((s.value / steps[0].value) * 100);
        return (
          <g key={s.label}>
            <rect x={x} y={y} width={w} height={barH} fill={s.color} rx="4" opacity="0.85" />
            <text x={x - 6} y={y + barH / 2 + 4} textAnchor="end" fontSize="10" fill="#64748B">{s.label}</text>
            <text x={x + w + 6} y={y + barH / 2 + 4} textAnchor="start" fontSize="10" fontWeight="600" fill={s.color}>
              {s.value} ({pct}%)
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/* ─────────────────── Effectif Line SVG ─────────────────── */
function EffectifLine() {
  const months = ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun", "Jul", "Aoû", "Sep", "Oct", "Nov", "Déc"];
  const permanents = [227, 227, 230, 232, 232, 235, 235, 237, 237, 240, 240, 242];
  const saisonniers = [18, 20, 42, 58, 65, 60, 45, 38, 55, 62, 40, 22];

  return (
    <AreaChart
      series={[
        { name: "permanents", color: "#2E7D32", values: permanents },
        { name: "saisonniers", color: "#F59E0B", values: saisonniers },
      ]}
      labels={months}
      height={180}
    />
  );
}

/* ─────────────────── Pyramide âges SVG ─────────────────── */
function AgePyramide() {
  const tranches = [
    { label: "60+", h: 8, f: 5 },
    { label: "50-59", h: 22, f: 18 },
    { label: "40-49", h: 38, f: 31 },
    { label: "30-39", h: 55, f: 48 },
    { label: "20-29", h: 62, f: 54 },
    { label: "<20", h: 12, f: 9 },
  ];
  const W = 360;
  const H = 200;
  const barH = 22;
  const maxVal = 70;
  const cx = W / 2;
  const pad = { t: 20, b: 20 };
  const chartH = H - pad.t - pad.b;
  const rowH = chartH / tranches.length;

  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H}`}>
      <text x={cx - 10} y={12} textAnchor="end" fontSize="9" fill="#3B82F6" fontWeight="600">Hommes</text>
      <text x={cx + 10} y={12} textAnchor="start" fontSize="9" fill="#F59E0B" fontWeight="600">Femmes</text>
      {tranches.map((t, i) => {
        const y = pad.t + i * rowH + (rowH - barH) / 2;
        const hw = (t.h / maxVal) * (cx - 40);
        const fw = (t.f / maxVal) * (cx - 40);
        return (
          <g key={t.label}>
            <rect x={cx - hw - 2} y={y} width={hw} height={barH} fill="#3B82F6" rx="3" opacity="0.8" />
            <rect x={cx + 2} y={y} width={fw} height={barH} fill="#F59E0B" rx="3" opacity="0.8" />
            <text x={cx} y={y + barH / 2 + 4} textAnchor="middle" fontSize="8" fill="#64748B">{t.label}</text>
            <text x={cx - hw - 6} y={y + barH / 2 + 4} textAnchor="end" fontSize="8" fill="#64748B">{t.h}</text>
            <text x={cx + fw + 6} y={y + barH / 2 + 4} textAnchor="start" fontSize="8" fill="#64748B">{t.f}</text>
          </g>
        );
      })}
    </svg>
  );
}

/* ─────────────────── Pyramide Employés SVG ─────────────────── */
function PyramideEmployes() {
  const niveaux = [
    { label: "Direction", n: 5, color: "#EF4444" },
    { label: "Cadres", n: 18, color: "#F59E0B" },
    { label: "Techniciens", n: 82, color: "#10B981" },
    { label: "Ouvriers", n: 122, color: "#22C55E" },
    { label: "Saisonniers", n: 60, color: "#94A3B8" },
  ];
  const W = 280;
  const H = 200;
  const maxN = 122;
  const maxW = W - 80;
  const barH = 26;
  const gap = (H - niveaux.length * barH) / (niveaux.length + 1);

  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H}`}>
      {niveaux.map((n, i) => {
        const w = (n.n / maxN) * maxW;
        const cx = W / 2;
        const x = cx - w / 2;
        const y = gap + i * (barH + gap);
        return (
          <g key={n.label}>
            <rect x={x} y={y} width={w} height={barH} fill={n.color} rx="4" opacity="0.85" />
            <text x={cx} y={y + barH / 2 + 4} textAnchor="middle" fontSize="9" fill="white" fontWeight="600">
              {n.label} ({n.n})
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/* ─────────────────── Card wrapper ─────────────────── */
function Card({ title, children, className = "" }: { title?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden ${className}`}>
      {title && (
        <div className="px-5 py-3 border-b border-slate-100 dark:border-slate-700">
          <h3 className="font-semibold text-slate-700 dark:text-slate-200 text-sm">{title}</h3>
        </div>
      )}
      <div className="p-5">{children}</div>
    </div>
  );
}

/* ─────────────────── KPI + sparkline ─────────────────── */
function KpiCard({
  label,
  value,
  delta,
  up,
  sparkPoints,
  sparkColor,
}: {
  label: string;
  value: string;
  delta: string;
  up: boolean;
  sparkPoints: number[];
  sparkColor: string;
}) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col gap-2">
      <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">{label}</span>
      <span className="text-xl font-bold text-slate-800 dark:text-slate-100 leading-tight">{value}</span>
      <div className="flex items-center justify-between">
        <span className={`text-xs font-semibold flex items-center gap-0.5 ${up ? "text-emerald-600 dark:text-emerald-400" : "text-red-500"}`}>
          {up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {delta}
        </span>
        <Sparkline points={sparkPoints} color={sparkColor} width={72} height={24} />
      </div>
    </div>
  );
}

/* ─────────────────── Table reusable ─────────────────── */
function DataTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: (string | React.ReactNode)[][];
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-slate-50 dark:bg-slate-900/50">
          <tr>
            {headers.map((h) => (
              <th key={h} className="px-4 py-2.5 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 whitespace-nowrap">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-t border-slate-50 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-3 text-slate-700 dark:text-slate-200">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   TAB: VUE D'ENSEMBLE
═══════════════════════════════════════════════════════ */
function TabOverview() {
  const donutData = [
    { label: "Cacao", value: 70, color: "#2E7D32" },
    { label: "Anacarde", value: 22, color: "#F59E0B" },
    { label: "Maïs/Riz", value: 5, color: "#3B82F6" },
    { label: "Autres", value: 3, color: "#9CA3AF" },
  ];

  const topClients = [
    { name: "Barry Callebaut France", ca: 42.4 },
    { name: "Marché local (grossistes)", ca: 32.4 },
    { name: "Olam International", ca: 28.8 },
    { name: "Cemoi Chocolatier", ca: 18.2 },
    { name: "Ritter Sport", ca: 12.8 },
  ];
  const maxClient = topClients[0].ca;

  const employeNiveaux = [
    { label: "Direction", n: 5, color: "#EF4444" },
    { label: "Cadres", n: 18, color: "#F59E0B" },
    { label: "Techniciens", n: 82, color: "#10B981" },
    { label: "Ouvriers", n: 122, color: "#22C55E" },
    { label: "Saisonniers", n: 60, color: "#94A3B8" },
  ];
  const maxEmp = 122;

  return (
    <div className="space-y-6">
      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          label="CA YTD"
          value="145,2 M XOF"
          delta="+18,4%"
          up={true}
          sparkPoints={[78, 85, 92, 98, 110, 120]}
          sparkColor="#2E7D32"
        />
        <KpiCard
          label="Production"
          value="87,4 t"
          delta="+12,1%"
          up={true}
          sparkPoints={[55, 60, 65, 70, 78, 87]}
          sparkColor="#3B82F6"
        />
        <KpiCard
          label="Marge brute"
          value="42,8%"
          delta="+2,1 pts"
          up={true}
          sparkPoints={[40, 41, 41, 42, 42, 43]}
          sparkColor="#8B5CF6"
        />
        <KpiCard
          label="Trésorerie"
          value="34,2 M XOF"
          delta="-12,3%"
          up={false}
          sparkPoints={[48, 44, 40, 37, 35, 34]}
          sparkColor="#EF4444"
        />
      </div>

      {/* Grand bar chart */}
      <Card title="CA vs Charges vs Résultat — 12 mois (M XOF)">
        <BarChartGrouped />
      </Card>

      {/* 3 graphiques côte à côte */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Donut */}
        <Card title="Répartition CA par culture">
          <div className="flex items-center gap-4">
            <Donut data={donutData} size={160} />
            <div className="flex flex-col gap-2">
              {donutData.map((d) => (
                <div key={d.label} className="flex items-center gap-2 text-xs">
                  <span className="w-3 h-3 rounded-full shrink-0" style={{ background: d.color }} />
                  <span className="text-slate-600 dark:text-slate-300">{d.label}</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-100 ml-auto">{d.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Bar horizontal clients */}
        <Card title="Top 5 clients (M XOF)">
          <div className="space-y-3">
            {topClients.map((c) => (
              <div key={c.name}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-600 dark:text-slate-300 truncate pr-2">{c.name}</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-100 shrink-0">{c.ca}M</span>
                </div>
                <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full transition-all"
                    style={{ width: `${(c.ca / maxClient) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Pyramide employés */}
        <Card title="Répartition employés">
          <PyramideEmployes />
          <div className="mt-3 flex flex-wrap gap-2">
            {employeNiveaux.map((n) => (
              <div key={n.label} className="flex items-center gap-1 text-xs">
                <span className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ background: n.color }} />
                <span className="text-slate-500 dark:text-slate-400">{n.label} <b className="text-slate-700 dark:text-slate-200">{n.n}</b></span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   TAB: PRODUCTION
═══════════════════════════════════════════════════════ */
function TabProduction() {
  const years = ["2020", "2021", "2022", "2023", "2024"];
  const cacao =    [62, 68, 74, 80, 87];
  const anacarde = [18, 21, 19, 23, 24];
  const mais =     [30, 28, 33, 31, 35];

  const parcelles = [
    { nom: "Bloc Nord A", culture: "Cacao", surface: "12 ha", rendement: "15,2 t/ha", score: 96 },
    { nom: "Bloc Est C", culture: "Cacao", surface: "9 ha", rendement: "14,8 t/ha", score: 93 },
    { nom: "Zone Anacarde 1", culture: "Anacarde", surface: "8 ha", rendement: "2,4 t/ha", score: 88 },
    { nom: "Bloc Sud B", culture: "Maïs", surface: "15 ha", rendement: "4,6 t/ha", score: 82 },
    { nom: "Bloc Ouest D", culture: "Cacao", surface: "11 ha", rendement: "13,9 t/ha", score: 78 },
  ];

  const clim = [
    { mois: "Jan", pluie: 28, rendIdx: 72 },
    { mois: "Fév", pluie: 32, rendIdx: 75 },
    { mois: "Mar", pluie: 88, rendIdx: 82 },
    { mois: "Avr", pluie: 142, rendIdx: 91 },
    { mois: "Mai", pluie: 168, rendIdx: 95 },
    { mois: "Jun", pluie: 122, rendIdx: 88 },
    { mois: "Jul", pluie: 64, rendIdx: 80 },
    { mois: "Aoû", pluie: 48, rendIdx: 76 },
    { mois: "Sep", pluie: 92, rendIdx: 85 },
    { mois: "Oct", pluie: 158, rendIdx: 93 },
    { mois: "Nov", pluie: 112, rendIdx: 89 },
    { mois: "Déc", pluie: 44, rendIdx: 74 },
  ];

  return (
    <div className="space-y-6">
      <Card title="Rendement par campagne — 5 ans (tonnes)">
        <AreaChart
          series={[
            { name: "Cacao", color: "#2E7D32", values: cacao },
            { name: "Anacarde", color: "#F59E0B", values: anacarde },
            { name: "Maïs", color: "#3B82F6", values: mais },
          ]}
          labels={years}
          height={200}
        />
        <div className="flex gap-4 mt-2">
          {[{ l: "Cacao", c: "#2E7D32" }, { l: "Anacarde", c: "#F59E0B" }, { l: "Maïs", c: "#3B82F6" }].map((s) => (
            <div key={s.l} className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
              <span className="w-3 h-0.5 rounded" style={{ background: s.c }} />
              {s.l}
            </div>
          ))}
        </div>
      </Card>

      <Card title="Top parcelles par rendement">
        <DataTable
          headers={["Parcelle", "Culture", "Surface", "Rendement", "Score"]}
          rows={parcelles.map((p) => [
            <span key="n" className="font-medium text-slate-800 dark:text-slate-100">{p.nom}</span>,
            p.culture,
            p.surface,
            <span key="r" className="font-mono font-semibold text-emerald-700 dark:text-emerald-400">{p.rendement}</span>,
            <div key="s" className="flex items-center gap-2">
              <div className="w-16 h-1.5 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${p.score}%` }} />
              </div>
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">{p.score}</span>
            </div>,
          ])}
        />
      </Card>

      <Card title="Analyse climatique vs rendement">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 dark:bg-slate-900/50">
              <tr>
                <th className="px-4 py-2.5 text-left text-xs font-semibold text-slate-500 dark:text-slate-400">Mois</th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold text-slate-500 dark:text-slate-400">Pluviométrie</th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold text-slate-500 dark:text-slate-400">Corrélation pluie/rendement</th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold text-slate-500 dark:text-slate-400">Indice rendement</th>
              </tr>
            </thead>
            <tbody>
              {clim.map((c, i) => (
                <tr key={i} className="border-t border-slate-50 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-700/30">
                  <td className="px-4 py-2.5 font-medium">{c.mois}</td>
                  <td className="px-4 py-2.5">
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 rounded-full bg-blue-100 dark:bg-blue-900/30 overflow-hidden">
                        <div className="h-full bg-blue-400 rounded-full" style={{ width: `${(c.pluie / 170) * 100}%` }} />
                      </div>
                      <span className="text-xs text-slate-500">{c.pluie} mm</span>
                    </div>
                  </td>
                  <td className="px-4 py-2.5">
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 rounded-full bg-emerald-100 dark:bg-emerald-900/30 overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${c.rendIdx}%` }} />
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-2.5 font-semibold text-emerald-700 dark:text-emerald-400">{c.rendIdx}/100</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   TAB: COMMERCE
═══════════════════════════════════════════════════════ */
function TabCommerce() {
  const months = ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun", "Jul", "Aoû", "Sep", "Oct", "Nov", "Déc"];
  const exportVentes = [8.2, 9.4, 11.2, 10.8, 12.1, 13.4, 14.2, 13.8, 12.9, 14.8, 15.2, 14.9];
  const localVentes =  [2.1, 2.3, 2.8,  2.5,  3.0,  3.2,  3.4,  3.1,  3.0,  3.5,  3.6,  3.4];

  const marches = [
    { pays: "France", part: 28, valeur: "40,7 M", tendance: "+12%", up: true },
    { pays: "Pays-Bas", part: 18, valeur: "26,1 M", tendance: "+8%", up: true },
    { pays: "Allemagne", part: 14, valeur: "20,3 M", tendance: "+5%", up: true },
    { pays: "Belgique", part: 10, valeur: "14,5 M", tendance: "+3%", up: true },
    { pays: "Singapour", part: 9, valeur: "13,1 M", tendance: "+18%", up: true },
    { pays: "Côte d'Ivoire (local)", part: 8, valeur: "11,6 M", tendance: "-2%", up: false },
    { pays: "USA", part: 7, valeur: "10,2 M", tendance: "+22%", up: true },
    { pays: "Autres", part: 6, valeur: "8,7 M", tendance: "+1%", up: true },
  ];

  return (
    <div className="space-y-6">
      <Card title="Évolution des ventes — 12 mois (M XOF)">
        <AreaChart
          series={[
            { name: "Export", color: "#2E7D32", values: exportVentes },
            { name: "Local", color: "#F59E0B", values: localVentes },
          ]}
          labels={months}
          height={200}
        />
        <div className="flex gap-4 mt-2">
          {[{ l: "Export", c: "#2E7D32" }, { l: "Local", c: "#F59E0B" }].map((s) => (
            <div key={s.l} className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
              <span className="w-3 h-0.5 rounded" style={{ background: s.c }} />
              {s.l}
            </div>
          ))}
        </div>
      </Card>

      <Card title="Analyse par marché">
        <DataTable
          headers={["Pays / Marché", "Part CA", "Valeur (XOF)", "Tendance"]}
          rows={marches.map((m) => [
            <span key="p" className="font-medium">{m.pays}</span>,
            <div key="s" className="flex items-center gap-2">
              <div className="w-20 h-1.5 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${(m.part / 28) * 100}%` }} />
              </div>
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">{m.part}%</span>
            </div>,
            <span key="v" className="font-mono">{m.valeur}</span>,
            <span key="t" className={`text-xs font-semibold flex items-center gap-0.5 ${m.up ? "text-emerald-600 dark:text-emerald-400" : "text-red-500"}`}>
              {m.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              {m.tendance}
            </span>,
          ])}
        />
      </Card>

      <Card title="Pipeline commercial">
        <FunnelChart />
        <div className="mt-3 grid grid-cols-4 gap-3">
          {[
            { label: "Devis envoyés", n: "120", color: "text-blue-600 dark:text-blue-400" },
            { label: "Commandes", n: "84", color: "text-violet-600 dark:text-violet-400" },
            { label: "Livraisons", n: "76", color: "text-amber-600 dark:text-amber-400" },
            { label: "Paiements", n: "71", color: "text-emerald-600 dark:text-emerald-400" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className={`text-xl font-bold ${s.color}`}>{s.n}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">{s.label}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   TAB: FINANCE
═══════════════════════════════════════════════════════ */
function TabFinance() {
  const ratios = [
    { categorie: "Liquidité", ratio: "Ratio courant", valeur: "2,34", ref: "> 1,5", status: "ok" },
    { categorie: "Liquidité", ratio: "Liquidité immédiate", valeur: "1,82", ref: "> 1,0", status: "ok" },
    { categorie: "Rentabilité", ratio: "ROA", valeur: "14,2%", ref: "> 10%", status: "ok" },
    { categorie: "Rentabilité", ratio: "ROE", valeur: "22,8%", ref: "> 15%", status: "ok" },
    { categorie: "Rentabilité", ratio: "Marge nette", valeur: "12,4%", ref: "> 8%", status: "ok" },
    { categorie: "Endettement", ratio: "Gearing", valeur: "0,42", ref: "< 1,0", status: "ok" },
    { categorie: "Endettement", ratio: "D/EBITDA", valeur: "1,8x", ref: "< 3x", status: "ok" },
    { categorie: "Rotation", ratio: "Rotation stocks (j)", valeur: "28 j", ref: "< 45 j", status: "ok" },
    { categorie: "Rotation", ratio: "DSO (j)", valeur: "42 j", ref: "< 60 j", status: "ok" },
  ];

  const trimestres = [
    { q: "Q1 N-1", ca: 28.4, ebitda: 11.2 },
    { q: "Q2 N-1", ca: 32.1, ebitda: 13.8 },
    { q: "Q3 N-1", ca: 35.8, ebitda: 15.1 },
    { q: "Q4 N-1", ca: 38.2, ebitda: 16.4 },
    { q: "Q1 N", ca: 32.8, ebitda: 13.8 },
    { q: "Q2 N", ca: 38.4, ebitda: 16.9 },
    { q: "Q3 N", ca: 39.2, ebitda: 17.4 },
    { q: "Q4 N", ca: 34.8, ebitda: 15.8 },
  ];

  return (
    <div className="space-y-6">
      <Card title="Waterfall — Formation du résultat (M XOF)">
        <WaterfallChart />
      </Card>

      <Card title="Ratios financiers clés">
        <DataTable
          headers={["Catégorie", "Ratio", "Valeur", "Référence", "Statut"]}
          rows={ratios.map((r) => [
            <span key="c" className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">{r.categorie}</span>,
            r.ratio,
            <span key="v" className="font-semibold font-mono text-slate-800 dark:text-slate-100">{r.valeur}</span>,
            <span key="ref" className="text-xs text-slate-500 dark:text-slate-400">{r.ref}</span>,
            <span key="s" className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 px-2 py-0.5 rounded-full">
              ✓ OK
            </span>,
          ])}
        />
      </Card>

      <Card title="Comparaison N / N-1 par trimestre">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 dark:bg-slate-900/50">
              <tr>
                <th className="px-4 py-2.5 text-left text-xs font-semibold text-slate-500 dark:text-slate-400">Trimestre</th>
                <th className="px-4 py-2.5 text-right text-xs font-semibold text-slate-500 dark:text-slate-400">CA (M XOF)</th>
                <th className="px-4 py-2.5 text-right text-xs font-semibold text-slate-500 dark:text-slate-400">EBITDA (M XOF)</th>
                <th className="px-4 py-2.5 text-right text-xs font-semibold text-slate-500 dark:text-slate-400">Marge EBITDA</th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold text-slate-500 dark:text-slate-400">Évolution</th>
              </tr>
            </thead>
            <tbody>
              {trimestres.map((t, i) => {
                const marge = ((t.ebitda / t.ca) * 100).toFixed(1);
                const isN = i >= 4;
                return (
                  <tr key={t.q} className={`border-t border-slate-50 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-700/30 ${isN ? "font-semibold" : ""}`}>
                    <td className="px-4 py-2.5">{t.q}</td>
                    <td className="px-4 py-2.5 text-right font-mono">{t.ca}</td>
                    <td className="px-4 py-2.5 text-right font-mono text-emerald-700 dark:text-emerald-400">{t.ebitda}</td>
                    <td className="px-4 py-2.5 text-right">{marge}%</td>
                    <td className="px-4 py-2.5">
                      {isN && (
                        <div className="w-24 h-1.5 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
                          <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${(t.ebitda / 18) * 100}%` }} />
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   TAB: RH
═══════════════════════════════════════════════════════ */
function TabRH() {
  const turnover = [
    { dept: "Production", effectif: 204, entrees: 18, sorties: 12, turnover: "5,9%", absenteisme: "3,2%", status: "ok" },
    { dept: "Technique", effectif: 82, entrees: 6, sorties: 4, turnover: "4,9%", absenteisme: "2,8%", status: "ok" },
    { dept: "Administration", effectif: 23, entrees: 2, sorties: 3, turnover: "13,0%", absenteisme: "4,1%", status: "warn" },
    { dept: "Commercial", effectif: 14, entrees: 3, sorties: 2, turnover: "14,3%", absenteisme: "2,5%", status: "warn" },
    { dept: "Direction", effectif: 5, entrees: 0, sorties: 0, turnover: "0,0%", absenteisme: "1,0%", status: "ok" },
  ];

  return (
    <div className="space-y-6">
      <Card title="Évolution effectif mensuel">
        <EffectifLine />
        <div className="flex gap-4 mt-2">
          {[{ l: "Permanents", c: "#2E7D32" }, { l: "Saisonniers", c: "#F59E0B" }].map((s) => (
            <div key={s.l} className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
              <span className="w-3 h-0.5 rounded" style={{ background: s.c }} />
              {s.l}
            </div>
          ))}
        </div>
      </Card>

      <Card title="Pyramide des âges">
        <AgePyramide />
      </Card>

      <Card title="Turnover & Absentéisme par département">
        <DataTable
          headers={["Département", "Effectif", "Entrées", "Sorties", "Turnover", "Absentéisme", "Statut"]}
          rows={turnover.map((t) => [
            <span key="d" className="font-medium">{t.dept}</span>,
            t.effectif,
            <span key="e" className="text-emerald-600 dark:text-emerald-400">+{t.entrees}</span>,
            <span key="s" className="text-red-500">-{t.sorties}</span>,
            <span key="tv" className={`font-semibold ${parseFloat(t.turnover) > 10 ? "text-amber-600 dark:text-amber-400" : "text-slate-700 dark:text-slate-200"}`}>{t.turnover}</span>,
            t.absenteisme,
            t.status === "ok"
              ? <span key="st" className="text-xs text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 px-2 py-0.5 rounded-full font-medium">✓ Normal</span>
              : <span key="st" className="text-xs text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 px-2 py-0.5 rounded-full font-medium">⚠ Surveiller</span>,
          ])}
        />
      </Card>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   PAGE PRINCIPALE
═══════════════════════════════════════════════════════ */
const PERIODS: { key: Period; label: string }[] = [
  { key: "7j", label: "7 jours" },
  { key: "30j", label: "30 jours" },
  { key: "90j", label: "90 jours" },
  { key: "6m", label: "6 mois" },
  { key: "annee", label: "Année" },
  { key: "custom", label: "Personnalisé" },
];

const TABS: { key: Tab; label: string }[] = [
  { key: "overview", label: "Vue d'ensemble" },
  { key: "production", label: "Production" },
  { key: "commerce", label: "Commerce" },
  { key: "finance", label: "Finance" },
  { key: "rh", label: "RH" },
];

export default function AnalyticsPage() {
  const [period, setPeriod] = useState<Period>("annee");
  const [tab, setTab] = useState<Tab>("overview");

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Topbar title="Analytics & BI" breadcrumb={["Rapports & BI", "Analytics"]} />

      <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-5">

        {/* Période + Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {PERIODS.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setPeriod(key)}
                className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-all border
                  ${period === key
                    ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                    : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-emerald-400"
                  }`}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-600 dark:text-slate-300 hover:border-emerald-400 transition-colors">
              <Download className="w-4 h-4" /> Exporter PDF
            </button>
            <button className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-600 dark:text-slate-300 hover:border-emerald-400 transition-colors">
              <Share2 className="w-4 h-4" /> Partager
            </button>
          </div>
        </div>

        {/* Onglets */}
        <div className="flex gap-1 border-b border-slate-200 dark:border-slate-700">
          {TABS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-all whitespace-nowrap -mb-px
                ${tab === key
                  ? "border-emerald-600 text-emerald-700 dark:text-emerald-400"
                  : "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Contenu onglet */}
        {tab === "overview" && <TabOverview />}
        {tab === "production" && <TabProduction />}
        {tab === "commerce" && <TabCommerce />}
        {tab === "finance" && <TabFinance />}
        {tab === "rh" && <TabRH />}

      </div>
    </div>
  );
}
