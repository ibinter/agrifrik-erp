"use client";

import { useState } from "react";
import Topbar from "../../components/Topbar";
import { TrendingUp, TrendingDown, Minus, Bell, AlertCircle } from "lucide-react";

// ─── Données ─────────────────────────────────────────────────────────────────

const tickerItems = [
  { label: "Cacao BCC", price: "1 087 XOF/kg", dir: "up", change: "+3,2%", abs: "+34 XOF" },
  { label: "Cacao London ICE", price: "£2 842/t", dir: "up", change: "+1,8%", abs: "" },
  { label: "Cacao NY NYMEX", price: "$3 124/t", dir: "up", change: "+2,1%", abs: "" },
  { label: "Anacarde INC", price: "680 XOF/kg", dir: "flat", change: "0%", abs: "" },
  { label: "Maïs SAFEX", price: "220 XOF/kg", dir: "down", change: "-1,4%", abs: "" },
];

type Produit = {
  nom: string;
  grade: string;
  prixBCC: number;
  prixBCCLabel: string;
  prixIntl: string;
  coutProd: number;
  marge: number;
  margePct: number;
  variation: number;
  variationLabel: string;
  dir: "up" | "down" | "flat";
  min52: number;
  max52: number;
  sparkline: number[];
  prixContractuel: number;
};

const produits: Produit[] = [
  {
    nom: "Cacao",
    grade: "Grade AA",
    prixBCC: 1100,
    prixBCCLabel: "1 100 XOF/kg",
    prixIntl: "£2 842/t",
    coutProd: 842,
    marge: 258,
    margePct: 30.7,
    variation: 3.8,
    variationLabel: "+3,8%",
    dir: "up",
    min52: 890,
    max52: 1180,
    sparkline: [820, 850, 870, 890, 940, 980, 1020, 1050, 1068, 1100],
    prixContractuel: 1080,
  },
  {
    nom: "Cacao",
    grade: "Grade A",
    prixBCC: 1085,
    prixBCCLabel: "1 085 XOF/kg",
    prixIntl: "£2 810/t",
    coutProd: 842,
    marge: 243,
    margePct: 28.8,
    variation: 3.2,
    variationLabel: "+3,2%",
    dir: "up",
    min52: 880,
    max52: 1160,
    sparkline: [810, 840, 855, 875, 920, 965, 1005, 1038, 1055, 1085],
    prixContractuel: 1060,
  },
  {
    nom: "Anacarde",
    grade: "WW240",
    prixBCC: 680,
    prixBCCLabel: "680 XOF/kg",
    prixIntl: "$1 850/t",
    coutProd: 420,
    marge: 260,
    margePct: 61.9,
    variation: 0,
    variationLabel: "0%",
    dir: "flat",
    min52: 620,
    max52: 720,
    sparkline: [640, 650, 655, 660, 665, 670, 675, 678, 680, 680],
    prixContractuel: 670,
  },
  {
    nom: "Maïs",
    grade: "Standard",
    prixBCC: 220,
    prixBCCLabel: "220 XOF/kg",
    prixIntl: "$280/t",
    coutProd: 175,
    marge: 45,
    margePct: 25.7,
    variation: -1.4,
    variationLabel: "-1,4%",
    dir: "down",
    min52: 185,
    max52: 245,
    sparkline: [240, 238, 235, 232, 230, 228, 226, 224, 222, 220],
    prixContractuel: 225,
  },
  {
    nom: "Riz blanchi",
    grade: "Standard",
    prixBCC: 385,
    prixBCCLabel: "385 XOF/kg",
    prixIntl: "$420/t",
    coutProd: 280,
    marge: 105,
    margePct: 37.5,
    variation: 0,
    variationLabel: "0%",
    dir: "flat",
    min52: 360,
    max52: 410,
    sparkline: [375, 378, 380, 382, 383, 384, 385, 385, 385, 385],
    prixContractuel: 380,
  },
  {
    nom: "Banane plantain",
    grade: "—",
    prixBCC: 200,
    prixBCCLabel: "200 XOF/kg",
    prixIntl: "—",
    coutProd: 140,
    marge: 60,
    margePct: 42.9,
    variation: 5.3,
    variationLabel: "+5,3%",
    dir: "up",
    min52: 160,
    max52: 215,
    sparkline: [160, 165, 170, 172, 175, 178, 182, 188, 195, 200],
    prixContractuel: 190,
  },
];

const historiqueData = [
  { mois: "Juil 2024", bcc: 820, london: 810 },
  { mois: "Août 2024", bcc: 835, london: 825 },
  { mois: "Sep 2024",  bcc: 852, london: 842 },
  { mois: "Oct 2024",  bcc: 910, london: 900 },
  { mois: "Nov 2024",  bcc: 985, london: 975 },
  { mois: "Déc 2024",  bcc: 1020, london: 1008 },
  { mois: "Jan 2025",  bcc: 1045, london: 1030 },
  { mois: "Fév 2025",  bcc: 1062, london: 1048 },
  { mois: "Mar 2025",  bcc: 1070, london: 1055 },
  { mois: "Avr 2025",  bcc: 1055, london: 1040 },
  { mois: "Mai 2025",  bcc: 1068, london: 1052 },
  { mois: "Jun 2025",  bcc: 1080, london: 1065 },
  { mois: "Jul 2025",  bcc: 1087, london: 1072 },
];

const historiqueTable = [
  { mois: "Juil 2024", cacaoAA: 820, cacaoA: 805, anacarde: 640, mais: 240, tendance: "stable" },
  { mois: "Août 2024", cacaoAA: 835, cacaoA: 820, anacarde: 645, mais: 238, tendance: "↗ hausse" },
  { mois: "Sep 2024",  cacaoAA: 852, cacaoA: 838, anacarde: 652, mais: 236, tendance: "↗ hausse" },
  { mois: "Oct 2024",  cacaoAA: 910, cacaoA: 895, anacarde: 658, mais: 234, tendance: "↑ forte" },
  { mois: "Nov 2024",  cacaoAA: 985, cacaoA: 968, anacarde: 662, mais: 232, tendance: "↑ forte" },
  { mois: "Déc 2024",  cacaoAA: 1020, cacaoA: 1002, anacarde: 665, mais: 230, tendance: "↑ forte" },
  { mois: "Jan 2025",  cacaoAA: 1045, cacaoA: 1028, anacarde: 668, mais: 228, tendance: "↗ hausse" },
  { mois: "Fév 2025",  cacaoAA: 1062, cacaoA: 1045, anacarde: 672, mais: 226, tendance: "↗ hausse" },
  { mois: "Mar 2025",  cacaoAA: 1070, cacaoA: 1052, anacarde: 675, mais: 224, tendance: "stable" },
  { mois: "Avr 2025",  cacaoAA: 1055, cacaoA: 1038, anacarde: 678, mais: 223, tendance: "↘ baisse" },
  { mois: "Mai 2025",  cacaoAA: 1068, cacaoA: 1050, anacarde: 679, mais: 222, tendance: "↗ hausse" },
  { mois: "Jun 2025",  cacaoAA: 1080, cacaoA: 1063, anacarde: 680, mais: 221, tendance: "↗ hausse" },
];

const previsions = [
  { mois: "Juil 2025", min: 1090, max: 1110, conf: 82, facteurs: "Cours londonien +1,8%" },
  { mois: "Aoû 2025",  min: 1080, max: 1120, conf: 74, facteurs: "Début intermédiaire CI/Ghana" },
  { mois: "Sep 2025",  min: 1100, max: 1150, conf: 68, facteurs: "Pré-récolte principale" },
  { mois: "Oct 2025",  min: 1150, max: 1200, conf: 65, facteurs: "Récolte principale — demande forte" },
  { mois: "Nov 2025",  min: 1180, max: 1250, conf: 58, facteurs: "Pic saisonnier (Noël)" },
  { mois: "Déc 2025",  min: 1150, max: 1220, conf: 52, facteurs: "Stocks constitués" },
];

const alertesPrix = [
  { type: "success", icon: "📈", text: "Cacao Grade AA en hausse (+3,8%) — Bon moment pour négocier contrats à terme" },
  { type: "danger",  icon: "📉", text: "Maïs en baisse (-1,4%) — Attendre avant de vendre les stocks" },
  { type: "warning", icon: "ℹ️",  text: "Anacarde stable — Marché en consolidation avant saison principale" },
  { type: "info",    icon: "🌿", text: "Banane plantain +5,3% — Demande urbaine forte, accélérer les livraisons" },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function DirIcon({ dir }: { dir: "up" | "down" | "flat" }) {
  if (dir === "up")   return <TrendingUp size={14} style={{ color: "#2E7D32" }} />;
  if (dir === "down") return <TrendingDown size={14} style={{ color: "#C62828" }} />;
  return <Minus size={14} style={{ color: "#757575" }} />;
}

function DirBadge({ dir, label }: { dir: "up" | "down" | "flat"; label: string }) {
  const s =
    dir === "up"   ? { bg: "#E8F5E9", color: "#1B5E20" } :
    dir === "down" ? { bg: "#FFEBEE", color: "#B71C1C" } :
                     { bg: "#F5F5F5", color: "#616161" };
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold" style={s}>
      <DirIcon dir={dir} />
      {label}
    </span>
  );
}

function Sparkline({ data, dir }: { data: number[]; dir: "up" | "down" | "flat" }) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const W = 80; const H = 28; const pad = 2;
  const pts = data.map((v, i) => {
    const x = pad + (i / (data.length - 1)) * (W - pad * 2);
    const y = H - pad - ((v - min) / range) * (H - pad * 2);
    return `${x},${y}`;
  }).join(" ");
  const color = dir === "up" ? "#2E7D32" : dir === "down" ? "#C62828" : "#9E9E9E";
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth={1.5} strokeLinejoin="round" />
    </svg>
  );
}

function ProduitCard({ p }: { p: Produit }) {
  const rangeTotal = p.max52 - p.min52;
  const pos = rangeTotal > 0 ? ((p.prixBCC - p.min52) / rangeTotal) * 100 : 50;
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 flex flex-col gap-3 hover:shadow-sm transition-shadow">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-xs text-gray-500">{p.nom}</p>
          <p className="font-semibold text-gray-900 text-sm">{p.grade}</p>
        </div>
        <DirBadge dir={p.dir} label={p.variationLabel} />
      </div>

      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-2xl font-bold text-gray-900">{p.prixBCCLabel}</p>
          {p.prixIntl !== "—" && <p className="text-xs text-gray-400 mt-0.5">{p.prixIntl}</p>}
        </div>
        <Sparkline data={p.sparkline} dir={p.dir} />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-xl bg-gray-50 px-3 py-2">
          <p className="text-[10px] text-gray-400 uppercase tracking-wide">Coût prod.</p>
          <p className="text-sm font-semibold text-gray-700">~{p.coutProd} XOF/kg</p>
        </div>
        <div className="rounded-xl px-3 py-2" style={{ backgroundColor: "#E8F5E9" }}>
          <p className="text-[10px] uppercase tracking-wide" style={{ color: "#558B2F" }}>Marge</p>
          <p className="text-sm font-semibold" style={{ color: "#1B5E20" }}>
            {p.marge} XOF ({p.margePct}%)
          </p>
        </div>
      </div>

      {/* 52-week range */}
      <div>
        <div className="flex justify-between text-[10px] text-gray-400 mb-1">
          <span>Min 52s : {p.min52}</span>
          <span>Max 52s : {p.max52}</span>
        </div>
        <div className="relative h-1.5 rounded-full bg-gray-100">
          <div
            className="absolute top-0 left-0 h-1.5 rounded-full"
            style={{ width: `${pos}%`, backgroundColor: "#4CAF50" }}
          />
          <div
            className="absolute -top-0.5 w-2.5 h-2.5 rounded-full bg-[#2E7D32] border-2 border-white shadow"
            style={{ left: `calc(${pos}% - 5px)` }}
          />
        </div>
      </div>
    </div>
  );
}

function LineChart() {
  const W = 700; const H = 250;
  const padL = 52; const padR = 16; const padT = 20; const padB = 44;
  const chartW = W - padL - padR;
  const chartH = H - padT - padB;
  const allVals = historiqueData.flatMap((d) => [d.bcc, d.london]);
  const minV = Math.min(...allVals) - 30;
  const maxV = Math.max(...allVals) + 30;
  const xScale = (i: number) => padL + (i / (historiqueData.length - 1)) * chartW;
  const yScale = (v: number) => padT + chartH - ((v - minV) / (maxV - minV)) * chartH;

  const bccPts  = historiqueData.map((d, i) => `${xScale(i)},${yScale(d.bcc)}`).join(" ");
  const lonPts  = historiqueData.map((d, i) => `${xScale(i)},${yScale(d.london)}`).join(" ");
  const gridLines = [800, 900, 1000, 1100].filter((v) => v >= minV && v <= maxV);

  return (
    <div className="overflow-x-auto">
      <svg viewBox={`0 0 ${W} ${H}`} style={{ minWidth: 500, width: "100%" }}>
        {/* grid */}
        {gridLines.map((v) => (
          <g key={v}>
            <line x1={padL} y1={yScale(v)} x2={W - padR} y2={yScale(v)} stroke="#F0F0F0" strokeWidth={1} />
            <text x={padL - 6} y={yScale(v) + 4} fontSize={10} textAnchor="end" fill="#9E9E9E">{v}</text>
          </g>
        ))}
        {/* curves */}
        <polyline points={bccPts}  fill="none" stroke="#2E7D32" strokeWidth={2} strokeLinejoin="round" />
        <polyline points={lonPts}  fill="none" stroke="#1565C0" strokeWidth={2} strokeLinejoin="round" strokeDasharray="5,3" />
        {/* dots */}
        {historiqueData.map((d, i) => (
          <g key={i}>
            <circle cx={xScale(i)} cy={yScale(d.bcc)}    r={3} fill="#2E7D32" />
            <circle cx={xScale(i)} cy={yScale(d.london)} r={3} fill="#1565C0" />
          </g>
        ))}
        {/* x labels */}
        {historiqueData.map((d, i) => (
          <text
            key={i}
            x={xScale(i)}
            y={H - padB + 16}
            fontSize={9}
            textAnchor="middle"
            fill="#9E9E9E"
          >
            {d.mois.slice(0, 7)}
          </text>
        ))}
        {/* last value label */}
        <text x={xScale(historiqueData.length - 1) + 6} y={yScale(historiqueData[historiqueData.length - 1].bcc) - 6} fontSize={10} fill="#2E7D32" fontWeight="600">
          {historiqueData[historiqueData.length - 1].bcc}
        </text>
        {/* legend */}
        <rect x={padL} y={H - 14} width={10} height={3} rx={1} fill="#2E7D32" />
        <text x={padL + 14} y={H - 10} fontSize={10} fill="#555">Cours BCC (XOF/kg)</text>
        <rect x={padL + 140} y={H - 14} width={10} height={3} rx={1} fill="#1565C0" />
        <text x={padL + 154} y={H - 10} fontSize={10} fill="#555">London ICE converti XOF</text>
      </svg>
    </div>
  );
}

function PrevisionChart() {
  const W = 700; const H = 200;
  const padL = 52; const padR = 16; const padT = 20; const padB = 44;
  const chartW = W - padL - padR;
  const chartH = H - padT - padB;
  const minV = 1000; const maxV = 1300;
  const n = previsions.length;
  const xScale = (i: number) => padL + (i / (n - 1)) * chartW;
  const yScale = (v: number) => padT + chartH - ((v - minV) / (maxV - minV)) * chartH;

  const midPts = previsions.map((p, i) => `${xScale(i)},${yScale((p.min + p.max) / 2)}`).join(" ");
  const areaTop = previsions.map((p, i) => `${xScale(i)},${yScale(p.max)}`).join(" ");
  const areaBot = [...previsions].reverse().map((p, i) => `${xScale(n - 1 - i)},${yScale(p.min)}`).join(" ");

  return (
    <div className="overflow-x-auto">
      <svg viewBox={`0 0 ${W} ${H}`} style={{ minWidth: 400, width: "100%" }}>
        {[1050, 1100, 1150, 1200, 1250].map((v) => (
          <g key={v}>
            <line x1={padL} y1={yScale(v)} x2={W - padR} y2={yScale(v)} stroke="#F0F0F0" strokeWidth={1} />
            <text x={padL - 6} y={yScale(v) + 4} fontSize={10} textAnchor="end" fill="#9E9E9E">{v}</text>
          </g>
        ))}
        {/* confidence band */}
        <polygon
          points={`${areaTop} ${areaBot}`}
          fill="#4CAF50"
          fillOpacity={0.12}
        />
        {/* mid line */}
        <polyline points={midPts} fill="none" stroke="#2E7D32" strokeWidth={2} strokeLinejoin="round" strokeDasharray="6,3" />
        {previsions.map((p, i) => (
          <g key={i}>
            <circle cx={xScale(i)} cy={yScale((p.min + p.max) / 2)} r={3} fill="#2E7D32" />
            <text x={xScale(i)} y={H - padB + 16} fontSize={9} textAnchor="middle" fill="#9E9E9E">
              {p.mois.slice(0, 8)}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const TABS = ["Cours actuels", "Historique", "Prévisions", "Alertes prix"] as const;
type Tab = typeof TABS[number];

export default function PrixMarchePage() {
  const [tab, setTab] = useState<Tab>("Cours actuels");

  return (
    <div className="min-h-screen bg-gray-50">
      <Topbar title="Cours & Prix du Marché" breadcrumb={["Commerce", "Prix du Marché"]} />

      <div className="p-6 space-y-6">

        {/* ── Bandeau cours en direct ── */}
        <div className="rounded-2xl px-5 py-4" style={{ background: "linear-gradient(135deg, #1B5E20 0%, #2E7D32 100%)" }}>
          <div className="flex flex-wrap items-center justify-between gap-y-3 gap-x-6">
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {tickerItems.map((t, i) => (
                <div key={i} className="flex items-center gap-2 text-white">
                  <span className="text-green-200 text-xs font-medium">{t.label}</span>
                  <span className="font-bold text-sm">{t.price}</span>
                  <span
                    className="text-xs font-semibold px-1.5 py-0.5 rounded"
                    style={{
                      background: t.dir === "up" ? "#81C784" : t.dir === "down" ? "#EF9A9A" : "#9E9E9E",
                      color: t.dir === "up" ? "#1B5E20" : t.dir === "down" ? "#B71C1C" : "#fff",
                    }}
                  >
                    {t.dir === "up" ? "▲" : t.dir === "down" ? "▼" : "—"} {t.change}
                    {t.abs ? ` (${t.abs})` : ""}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-green-300 text-xs whitespace-nowrap">
              Mis à jour : 09h47 · Source : BCC Abidjan + Reuters
            </p>
          </div>
        </div>

        {/* ── Onglets ── */}
        <div className="flex gap-1 border-b border-gray-200">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px"
              style={
                tab === t
                  ? { borderColor: "#2E7D32", color: "#2E7D32" }
                  : { borderColor: "transparent", color: "#6B7280" }
              }
            >
              {t}
            </button>
          ))}
        </div>

        {/* ── Cours actuels ── */}
        {tab === "Cours actuels" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {produits.map((p, i) => <ProduitCard key={i} p={p} />)}
            </div>

            {/* Comparaison prix marché vs contractuel */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5">
              <h3 className="text-sm font-semibold text-gray-800 mb-4">
                Comparaison Prix Marché vs Votre Prix Contractuel
              </h3>
              <div className="space-y-3">
                {produits.map((p, i) => {
                  const maxBar = Math.max(p.prixBCC, p.prixContractuel) * 1.1;
                  const mktPct = (p.prixBCC / maxBar) * 100;
                  const ctrPct = (p.prixContractuel / maxBar) * 100;
                  const above = p.prixContractuel >= p.prixBCC;
                  return (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-32 shrink-0">
                        <p className="text-xs font-medium text-gray-700 truncate">{p.nom} {p.grade}</p>
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-4 rounded-full" style={{ width: `${mktPct}%`, background: "#4CAF50" }} />
                          </div>
                          <span className="text-xs text-gray-600 w-20 shrink-0">{p.prixBCCLabel} Mkt</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-4 rounded-full" style={{ width: `${ctrPct}%`, background: "#1565C0" }} />
                          </div>
                          <span className="text-xs text-gray-600 w-20 shrink-0">{p.prixContractuel} XOF Ctr</span>
                        </div>
                      </div>
                      <span
                        className="text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0"
                        style={above
                          ? { background: "#E8F5E9", color: "#1B5E20" }
                          : { background: "#FFEBEE", color: "#B71C1C" }}
                      >
                        {above ? "▲ Au-dessus" : "▼ En-dessous"}
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="flex gap-4 mt-4 text-xs text-gray-500">
                <span className="flex items-center gap-1.5"><span className="w-3 h-2 rounded bg-[#4CAF50] inline-block" /> Prix marché</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-2 rounded bg-[#1565C0] inline-block" /> Prix contractuel</span>
              </div>
            </div>
          </div>
        )}

        {/* ── Historique ── */}
        {tab === "Historique" && (
          <div className="space-y-6">
            <div className="rounded-2xl border border-gray-100 bg-white p-5">
              <h3 className="text-sm font-semibold text-gray-800 mb-4">
                Évolution cours cacao 12 mois (XOF/kg)
              </h3>
              <LineChart />
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100">
                <h3 className="text-sm font-semibold text-gray-800">Historique mensuel</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ backgroundColor: "#F8FBF8" }}>
                      {["Mois", "Cacao AA", "Cacao A", "Anacarde", "Maïs", "Tendance"].map((h) => (
                        <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {historiqueTable.map((row, i) => (
                      <tr key={i} className={`border-t border-gray-50 hover:bg-gray-50 ${i % 2 === 0 ? "" : "bg-gray-50/40"}`}>
                        <td className="px-4 py-3 font-medium text-gray-700 whitespace-nowrap">{row.mois}</td>
                        <td className="px-4 py-3 text-gray-700">{row.cacaoAA.toLocaleString("fr-FR")}</td>
                        <td className="px-4 py-3 text-gray-700">{row.cacaoA.toLocaleString("fr-FR")}</td>
                        <td className="px-4 py-3 text-gray-700">{row.anacarde}</td>
                        <td className="px-4 py-3 text-gray-700">{row.mais}</td>
                        <td className="px-4 py-3 text-xs font-medium" style={{ color: row.tendance.includes("hausse") || row.tendance.includes("forte") ? "#2E7D32" : row.tendance.includes("baisse") ? "#C62828" : "#616161" }}>
                          {row.tendance}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ── Prévisions ── */}
        {tab === "Prévisions" && (
          <div className="space-y-6">
            <div className="rounded-2xl border border-gray-100 bg-white p-5">
              <h3 className="text-sm font-semibold text-gray-800 mb-4">Prévision cours cacao — 6 mois</h3>
              <PrevisionChart />
              <p className="text-xs text-gray-400 mt-2">Zone ombrée = intervalle de confiance (min–max prévu)</p>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100">
                <h3 className="text-sm font-semibold text-gray-800">Prévisions à 6 mois — Cacao Grade AA</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ backgroundColor: "#F8FBF8" }}>
                      {["Mois", "Cacao AA prévu", "Confiance", "Facteurs"].map((h) => (
                        <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {previsions.map((row, i) => {
                      const confColor = row.conf >= 75 ? "#1B5E20" : row.conf >= 60 ? "#E65100" : "#B71C1C";
                      const confBg   = row.conf >= 75 ? "#E8F5E9" : row.conf >= 60 ? "#FFF3E0" : "#FFEBEE";
                      return (
                        <tr key={i} className={`border-t border-gray-50 hover:bg-gray-50 ${i % 2 === 0 ? "" : "bg-gray-50/40"}`}>
                          <td className="px-4 py-3 font-medium text-gray-700 whitespace-nowrap">{row.mois}</td>
                          <td className="px-4 py-3 font-semibold text-gray-800 whitespace-nowrap">
                            {row.min.toLocaleString("fr-FR")} – {row.max.toLocaleString("fr-FR")} XOF/kg
                          </td>
                          <td className="px-4 py-3">
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold"
                              style={{ background: confBg, color: confColor }}>
                              {row.conf}%
                            </span>
                          </td>
                          <td className="px-4 py-3 text-gray-600 text-xs">{row.facteurs}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ── Alertes prix ── */}
        {tab === "Alertes prix" && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <Bell size={16} style={{ color: "#2E7D32" }} />
              <h3 className="text-sm font-semibold text-gray-800">Alertes prix actives</h3>
            </div>
            {alertesPrix.map((a, i) => {
              const styles = {
                success: { bg: "#E8F5E9", border: "#A5D6A7", color: "#1B5E20" },
                danger:  { bg: "#FFEBEE", border: "#EF9A9A", color: "#B71C1C" },
                warning: { bg: "#FFF8E1", border: "#FFE082", color: "#E65100" },
                info:    { bg: "#E3F2FD", border: "#90CAF9", color: "#1565C0" },
              }[a.type] ?? { bg: "#F5F5F5", border: "#E0E0E0", color: "#616161" };
              return (
                <div key={i} className="rounded-2xl border p-4 flex items-start gap-3"
                  style={{ background: styles.bg, borderColor: styles.border }}>
                  <span className="text-xl shrink-0">{a.icon}</span>
                  <p className="text-sm leading-relaxed" style={{ color: styles.color }}>{a.text}</p>
                  <AlertCircle size={16} className="shrink-0 mt-0.5" style={{ color: styles.color }} />
                </div>
              );
            })}

            <div className="rounded-2xl border border-gray-100 bg-white p-5 mt-4">
              <h4 className="text-sm font-semibold text-gray-800 mb-3">Calendrier saisonnier des prix</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ backgroundColor: "#F8FBF8" }}>
                      {["Culture", "Haute saison", "Basse saison", "Conseil"].map((h) => (
                        <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { culture: "Cacao", haute: "Oct–Fév", basse: "Juin–Sep", conseil: "Stocker si possible en basse saison" },
                      { culture: "Anacarde", haute: "Mar–Mai", basse: "Oct–Jan", conseil: "Vendre en mars-avril" },
                      { culture: "Maïs", haute: "Nov–Jan", basse: "Mai–Jul", conseil: "Stocker après récolte" },
                    ].map((row, i) => (
                      <tr key={i} className={`border-t border-gray-50 hover:bg-gray-50 ${i % 2 === 0 ? "" : "bg-gray-50/40"}`}>
                        <td className="px-4 py-3 font-medium text-gray-800">{row.culture}</td>
                        <td className="px-4 py-3">
                          <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-800">{row.haute}</span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-800">{row.basse}</span>
                        </td>
                        <td className="px-4 py-3 text-gray-600 text-xs">{row.conseil}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
