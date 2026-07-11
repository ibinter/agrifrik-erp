"use client";

import { useState } from "react";
import Topbar from "../../components/Topbar";
import { CheckCircle, AlertTriangle, XCircle, Clock } from "lucide-react";

type Tab = "catalogue" | "stocks" | "utilisations";

/* ─── Catalogue data ─────────────────────────────────────── */
const fertilisants = [
  { code: "INT-NPK-1", designation: "NPK 20-10-10", formule: "20-10-10", conditionnement: "Sac 50 kg", pu: "9 000 XOF/sac", ra: "ok", fournisseur: "SCPA CI" },
  { code: "INT-KCl", designation: "Chlorure de potassium", formule: "KCl 60%", conditionnement: "Sac 50 kg", pu: "10 750 XOF/sac", ra: "ok", fournisseur: "SCPA CI" },
  { code: "INT-URE", designation: "Urée 46% N", formule: "46-0-0", conditionnement: "Sac 50 kg", pu: "8 200 XOF/sac", ra: "restreint", fournisseur: "SCPA CI" },
  { code: "INT-COM", designation: "Compost certifié", formule: "organique", conditionnement: "Tonne", pu: "45 000 XOF/t", ra: "prefere", fournisseur: "Local" },
  { code: "INT-BIO", designation: "Fertilisant Nitrobacter", formule: "Organique", conditionnement: "Bidon 5 L", pu: "24 000 XOF", ra: "prefere", fournisseur: "Bayer CI" },
  { code: "INT-CAL", designation: "Chaux dolomitique", formule: "CaCO₃", conditionnement: "Sac 25 kg", pu: "3 200 XOF/sac", ra: "ok", fournisseur: "Carmeuse CI" },
];

const phytos = [
  { code: "INT-RID", designation: "Ridomil Gold 68 WG", matiere: "Métalaxyl-M+Mancozèbe", format: "1 kg", pu: "18 500", ra: "ok", dre: "14j" },
  { code: "INT-CON", designation: "Confidor 200 SL", matiere: "Imidaclopride", format: "1 L", pu: "28 000", ra: "restreint", dre: "21j" },
  { code: "INT-SUP", designation: "Super Cupravit", matiere: "Oxychlorure Cu", format: "1 kg", pu: "12 400", ra: "prefere", dre: "7j" },
  { code: "INT-CYP", designation: "Cyperméthrine 200 EC", matiere: "Cyperméthrine", format: "1 L", pu: "16 000", ra: "restreint", dre: "21j" },
  { code: "INT-DIM", designation: "Dimethoate 40 EC", matiere: "Diméthoate", format: "1 L", pu: "14 000", ra: "interdit", dre: "—" },
  { code: "INT-MAN", designation: "Mancozèbe 80 WP", matiere: "Mancozèbe", format: "1 kg", pu: "8 200", ra: "ok", dre: "10j" },
  { code: "INT-BAS", designation: "Beauveria bassiana", matiere: "Biologique", format: "1 L", pu: "32 000", ra: "prefere", dre: "0j" },
  { code: "INT-THI", designation: "Thiram 80 WP", matiere: "Thirame", format: "1 kg", pu: "9 800", ra: "ok", dre: "14j" },
];

const herbicides = [
  { code: "INT-GLY", designation: "Glyphosate 360 SL", formule: "Glyphosate", format: "5 L", pu: "12 500", ra: "restreint" },
  { code: "INT-MSM", designation: "MSMA 720 SL", formule: "MSMA", format: "1 L", pu: "8 800", ra: "restreint" },
  { code: "INT-PEN", designation: "Pendiméthaline 330 EC", formule: "Pendiméthaline", format: "1 L", pu: "9 200", ra: "ok" },
  { code: "INT-TER", designation: "Terbuthryne 500 SC", formule: "Terbuthryne", format: "1 L", pu: "7 600", ra: "ok" },
];

/* ─── Stocks data ────────────────────────────────────────── */
const stocksData = [
  { code: "INT-NPK-1", designation: "NPK 20-10-10", stock: "24 sacs (1 200 kg)", seuil: "10 sacs", valeur: "216 000", fournisseur: "SCPA CI", expiration: "Déc 2026", statut: "ok" },
  { code: "INT-KCl", designation: "Chlorure de potassium", stock: "4 sacs (240 kg)", seuil: "10 sacs", valeur: "43 000", fournisseur: "SCPA CI", expiration: "Déc 2026", statut: "alerte" },
  { code: "INT-URE", designation: "Urée 46% N", stock: "18 sacs (900 kg)", seuil: "8 sacs", valeur: "147 600", fournisseur: "SCPA CI", expiration: "Déc 2026", statut: "ok" },
  { code: "INT-COM", designation: "Compost certifié", stock: "12 t", seuil: "5 t", valeur: "540 000", fournisseur: "Local", expiration: "—", statut: "ok" },
  { code: "INT-BIO", designation: "Fertilisant Nitrobacter", stock: "8 bidons", seuil: "3 bidons", valeur: "192 000", fournisseur: "Bayer CI", expiration: "Mar 2026", statut: "ok" },
  { code: "INT-RID", designation: "Ridomil Gold 68 WG", stock: "14 kg", seuil: "5 kg", valeur: "259 000", fournisseur: "Bayer CI", expiration: "Sep 2026", statut: "ok" },
  { code: "INT-CON", designation: "Confidor 200 SL", stock: "6 L", seuil: "4 L", valeur: "168 000", fournisseur: "Bayer CI", expiration: "Jun 2026", statut: "ok" },
  { code: "INT-SUP", designation: "Super Cupravit", stock: "22 kg", seuil: "8 kg", valeur: "272 800", fournisseur: "SCPA CI", expiration: "Jan 2027", statut: "ok" },
  { code: "INT-BAS", designation: "Beauveria bassiana", stock: "4 L", seuil: "2 L", valeur: "128 000", fournisseur: "Bayer CI", expiration: "Aoû 2025", statut: "ok" },
  { code: "INT-MAN", designation: "Mancozèbe 80 WP", stock: "8 kg", seuil: "5 kg", valeur: "65 600", fournisseur: "SCPA CI", expiration: "Dec 2026", statut: "ok" },
  { code: "INT-DIM", designation: "Dimethoate 40 EC", stock: "0 L", seuil: "—", valeur: "0", fournisseur: "—", expiration: "—", statut: "conforme" },
  { code: "INT-GLY", designation: "Glyphosate 360 SL", stock: "12 L", seuil: "5 L", valeur: "150 000", fournisseur: "SCPA CI", expiration: "Jan 2027", statut: "ok" },
];

/* ─── Utilisations data ──────────────────────────────────── */
const utilisations = [
  { date: "11/07", intrant: "Ridomil Gold", parcelle: "PAR-B1", dose: "2,5 g/L × 120 L", operateur: "Ibrahim S.", cout: "48 000", epi: true, dre: "14j" },
  { date: "08/07", intrant: "NPK 20-10-10", parcelle: "PAR-A3", dose: "150 kg/ha × 4,8 ha", operateur: "Konan Y.", cout: "129 600", epi: true, dre: "0" },
  { date: "05/07", intrant: "Super Cupravit", parcelle: "PAR-A1 A2", dose: "4 g/L × 200 L", operateur: "Ibrahim S.", cout: "99 200", epi: true, dre: "7j" },
  { date: "01/07", intrant: "KCl 60%", parcelle: "PAR-A1", dose: "80 kg/ha × 6,2 ha", operateur: "Konan Y.", cout: "53 560", epi: true, dre: "0" },
  { date: "28/06", intrant: "Compost", parcelle: "PAR-D1 D2", dose: "5 t/ha × 5,6 ha", operateur: "Saisonniers", cout: "1 260 000", epi: false, dre: "0" },
];

/* ─── Bar chart horizontal YTD ───────────────────────────── */
const ytdData = [
  { label: "Fertilisants", value: 8.2, color: "#2E7D32" },
  { label: "Fongicides", value: 4.1, color: "#1565C0" },
  { label: "Herbicides", value: 1.2, color: "#F9A825" },
  { label: "Carburant", value: 0.9, color: "#E65100" },
  { label: "Consommables", value: 0.4, color: "#6A1B9A" },
];
const maxVal = 8.2;

function BarChartYTD() {
  const W = 540;
  const H = ytdData.length * 40 + 20;
  const labelW = 110;
  const barMaxW = W - labelW - 70;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ fontFamily: "inherit" }}>
      {ytdData.map((d, i) => {
        const y = 10 + i * 40;
        const bw = (d.value / maxVal) * barMaxW;
        return (
          <g key={d.label}>
            <text x={0} y={y + 16} fontSize={11} fill="#555">{d.label}</text>
            <rect x={labelW} y={y + 4} width={barMaxW} height={18} rx={3} fill="#F1F5F1" />
            <rect x={labelW} y={y + 4} width={bw} height={18} rx={3} fill={d.color} opacity={0.85} />
            <text x={labelW + bw + 6} y={y + 16} fontSize={10} fill="#333" fontWeight="600">{d.value} M</text>
          </g>
        );
      })}
    </svg>
  );
}

/* ─── Heatmap intrants par parcelle × mois ───────────────── */
const heatmapParcelles = ["PAR-A1", "PAR-A2", "PAR-A3", "PAR-B1", "PAR-B2", "PAR-C1", "PAR-D1", "PAR-E1"];
const heatmapMois = ["Fév", "Mar", "Avr", "Mai", "Jun", "Jul"];
// Coûts/ha fictifs normalisés 0-1
const heatmapValues = [
  [0.8, 0.4, 0.9, 0.6, 0.7, 0.95],
  [0.6, 0.3, 0.7, 0.5, 0.6, 0.8],
  [0.7, 0.5, 0.6, 0.8, 0.5, 0.9],
  [0.3, 0.2, 0.4, 0.3, 0.5, 0.7],
  [0.4, 0.3, 0.5, 0.4, 0.6, 0.65],
  [0.1, 0.0, 0.2, 0.1, 0.15, 0.2],
  [0.5, 0.8, 0.6, 0.7, 0.4, 0.3],
  [0.2, 0.1, 0.3, 0.2, 0.25, 0.15],
];

function HeatmapIntrants() {
  const cellW = 62;
  const cellH = 30;
  const labelW = 68;
  const headerH = 22;
  const W = labelW + heatmapMois.length * cellW + 4;
  const H = headerH + heatmapParcelles.length * cellH + 4;

  function greenAlpha(v: number) {
    // interpolate white (#fff) → #2E7D32
    const r = Math.round(255 + (46 - 255) * v);
    const g = Math.round(255 + (125 - 255) * v);
    const b = Math.round(255 + (50 - 255) * v);
    return `rgb(${r},${g},${b})`;
  }

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ fontFamily: "inherit" }}>
      {/* Month headers */}
      {heatmapMois.map((m, j) => (
        <text key={m} x={labelW + j * cellW + cellW / 2} y={14} textAnchor="middle" fontSize={10} fill="#666">{m}</text>
      ))}
      {/* Rows */}
      {heatmapParcelles.map((p, i) => (
        <g key={p}>
          <text x={0} y={headerH + i * cellH + cellH / 2 + 4} fontSize={10} fill="#444">{p}</text>
          {heatmapMois.map((_, j) => {
            const v = heatmapValues[i][j];
            return (
              <g key={j}>
                <rect
                  x={labelW + j * cellW + 2}
                  y={headerH + i * cellH + 2}
                  width={cellW - 4}
                  height={cellH - 4}
                  rx={4}
                  fill={greenAlpha(v)}
                />
                {v > 0 && (
                  <text
                    x={labelW + j * cellW + cellW / 2}
                    y={headerH + i * cellH + cellH / 2 + 4}
                    textAnchor="middle"
                    fontSize={9}
                    fill={v > 0.5 ? "#fff" : "#333"}
                  >
                    {Math.round(v * 100)}%
                  </text>
                )}
              </g>
            );
          })}
        </g>
      ))}
    </svg>
  );
}

/* ─── RA Badge ───────────────────────────────────────────── */
function RABadge({ ra }: { ra: string }) {
  if (ra === "prefere")
    return <span className="inline-flex items-center gap-0.5 text-[10px] font-medium text-green-700 bg-green-50 rounded-full px-1.5 py-0.5"><CheckCircle size={9} /> Préféré</span>;
  if (ra === "ok")
    return <span className="inline-flex items-center gap-0.5 text-[10px] font-medium text-green-700 bg-green-50 rounded-full px-1.5 py-0.5"><CheckCircle size={9} /> Autorisé</span>;
  if (ra === "restreint")
    return <span className="inline-flex items-center gap-0.5 text-[10px] font-medium text-amber-700 bg-amber-50 rounded-full px-1.5 py-0.5"><AlertTriangle size={9} /> Restreint</span>;
  if (ra === "interdit")
    return <span className="inline-flex items-center gap-0.5 text-[10px] font-medium text-red-700 bg-red-50 rounded-full px-1.5 py-0.5"><XCircle size={9} /> Interdit RA</span>;
  return null;
}

function StockStatutBadge({ statut }: { statut: string }) {
  if (statut === "conforme")
    return <span className="inline-flex items-center gap-0.5 text-[10px] font-medium text-gray-600 bg-gray-100 rounded-full px-1.5 py-0.5"><CheckCircle size={9} /> Conforme (0 stock)</span>;
  if (statut === "alerte")
    return <span className="inline-flex items-center gap-0.5 text-[10px] font-medium text-red-700 bg-red-50 rounded-full px-1.5 py-0.5"><AlertTriangle size={9} /> Stock bas</span>;
  return <span className="inline-flex items-center gap-0.5 text-[10px] font-medium text-green-700 bg-green-50 rounded-full px-1.5 py-0.5"><CheckCircle size={9} /> OK</span>;
}

/* ─── Page ───────────────────────────────────────────────── */
export default function IntrantsPage() {
  const [tab, setTab] = useState<Tab>("catalogue");

  const tabs: { id: Tab; label: string }[] = [
    { id: "catalogue", label: "Catalogue" },
    { id: "stocks", label: "Stocks" },
    { id: "utilisations", label: "Utilisations" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Topbar title="Intrants Agricoles" breadcrumb={["Logistique", "Intrants Agricoles"]} />

      <div className="flex-1 p-6 space-y-5 max-w-screen-xl mx-auto w-full">

        {/* KPI */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {[
            { label: "Références actives", value: "32", color: "#2E7D32" },
            { label: "Fournisseurs", value: "6", color: "#1565C0" },
            { label: "Intrants RA autorisés", value: "28 / 32", color: "#F9A825" },
            { label: "Budget intrants", value: "22,4 M XOF", color: "#6A1B9A" },
            { label: "Consommé YTD", value: "14,2 M (63 %)", color: "#E65100" },
          ].map((k) => (
            <div key={k.label} className="rounded-2xl border border-gray-100 bg-white p-5">
              <p className="text-[11px] text-gray-500 mb-1 leading-tight">{k.label}</p>
              <p className="text-xl font-bold" style={{ color: k.color }}>{k.value}</p>
            </div>
          ))}
        </div>

        {/* Tab container */}
        <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden">
          <div className="flex border-b border-gray-100 px-4 pt-3 gap-1">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`text-xs font-medium px-4 py-2 rounded-t-lg border-b-2 transition-colors ${
                  tab === t.id
                    ? "border-[#2E7D32] text-[#2E7D32] bg-green-50"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="p-5">

            {/* ── CATALOGUE ── */}
            {tab === "catalogue" && (
              <div className="space-y-6">

                {/* Fertilisants */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-1.5 h-4 rounded-full bg-[#2E7D32]" />
                    <h3 className="text-sm font-semibold text-gray-800">Fertilisants</h3>
                    <span className="text-xs text-gray-400">(8 réf.)</span>
                  </div>
                  <div className="rounded-xl border border-gray-100 overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="bg-[#F8FBF8] border-b border-gray-100">
                          {["Code", "Désignation", "Formule", "Conditionnement", "PU", "RA autorisé", "Fournisseur"].map((h) => (
                            <th key={h} className="text-left text-[10px] font-semibold text-gray-500 uppercase tracking-wide px-3 py-2 whitespace-nowrap">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {fertilisants.map((r, i) => (
                          <tr key={r.code} className={`border-b border-gray-50 hover:bg-gray-50 transition-colors ${i % 2 !== 0 ? "bg-gray-50/30" : ""}`}>
                            <td className="px-3 py-2 font-mono text-[11px] text-gray-500 whitespace-nowrap">{r.code}</td>
                            <td className="px-3 py-2 font-medium text-gray-800 whitespace-nowrap">{r.designation}</td>
                            <td className="px-3 py-2 text-gray-600 whitespace-nowrap">{r.formule}</td>
                            <td className="px-3 py-2 text-gray-600 whitespace-nowrap">{r.conditionnement}</td>
                            <td className="px-3 py-2 font-semibold text-gray-800 whitespace-nowrap">{r.pu}</td>
                            <td className="px-3 py-2 whitespace-nowrap"><RABadge ra={r.ra} /></td>
                            <td className="px-3 py-2 text-gray-600 whitespace-nowrap">{r.fournisseur}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Fongicides / Insecticides */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-1.5 h-4 rounded-full bg-[#1565C0]" />
                    <h3 className="text-sm font-semibold text-gray-800">Fongicides / Insecticides</h3>
                    <span className="text-xs text-gray-400">(8 réf.)</span>
                  </div>
                  <div className="rounded-xl border border-gray-100 overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="bg-[#F8FBF8] border-b border-gray-100">
                          {["Code", "Désignation", "Matière active", "Format", "PU XOF", "RA", "DRE"].map((h) => (
                            <th key={h} className="text-left text-[10px] font-semibold text-gray-500 uppercase tracking-wide px-3 py-2 whitespace-nowrap">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {phytos.map((r, i) => (
                          <tr key={r.code} className={`border-b border-gray-50 hover:bg-gray-50 transition-colors ${i % 2 !== 0 ? "bg-gray-50/30" : ""} ${r.ra === "interdit" ? "bg-red-50/40" : ""}`}>
                            <td className="px-3 py-2 font-mono text-[11px] text-gray-500 whitespace-nowrap">{r.code}</td>
                            <td className="px-3 py-2 font-medium text-gray-800 whitespace-nowrap">{r.designation}</td>
                            <td className="px-3 py-2 text-gray-600 whitespace-nowrap">{r.matiere}</td>
                            <td className="px-3 py-2 text-gray-600 whitespace-nowrap">{r.format}</td>
                            <td className="px-3 py-2 font-semibold text-gray-800 whitespace-nowrap">{r.pu}</td>
                            <td className="px-3 py-2 whitespace-nowrap"><RABadge ra={r.ra} /></td>
                            <td className="px-3 py-2 text-gray-600 whitespace-nowrap font-mono">{r.dre}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Herbicides */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-1.5 h-4 rounded-full bg-[#F9A825]" />
                    <h3 className="text-sm font-semibold text-gray-800">Herbicides</h3>
                    <span className="text-xs text-gray-400">(4 réf.)</span>
                  </div>
                  <div className="rounded-xl border border-gray-100 overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="bg-[#F8FBF8] border-b border-gray-100">
                          {["Code", "Désignation", "Formule", "Format", "PU XOF", "RA"].map((h) => (
                            <th key={h} className="text-left text-[10px] font-semibold text-gray-500 uppercase tracking-wide px-3 py-2 whitespace-nowrap">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {herbicides.map((r, i) => (
                          <tr key={r.code} className={`border-b border-gray-50 hover:bg-gray-50 transition-colors ${i % 2 !== 0 ? "bg-gray-50/30" : ""}`}>
                            <td className="px-3 py-2 font-mono text-[11px] text-gray-500 whitespace-nowrap">{r.code}</td>
                            <td className="px-3 py-2 font-medium text-gray-800 whitespace-nowrap">{r.designation}</td>
                            <td className="px-3 py-2 text-gray-600 whitespace-nowrap">{r.formule}</td>
                            <td className="px-3 py-2 text-gray-600 whitespace-nowrap">{r.format}</td>
                            <td className="px-3 py-2 font-semibold text-gray-800 whitespace-nowrap">{r.pu}</td>
                            <td className="px-3 py-2 whitespace-nowrap"><RABadge ra={r.ra} /></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* ── STOCKS ── */}
            {tab === "stocks" && (
              <div className="space-y-6">
                <div className="rounded-xl border border-gray-100 overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="bg-[#F8FBF8] border-b border-gray-100">
                        {["Code", "Désignation", "Stock actuel", "Seuil", "Valeur XOF", "Fournisseur", "Expiration", "Statut"].map((h) => (
                          <th key={h} className="text-left text-[10px] font-semibold text-gray-500 uppercase tracking-wide px-3 py-2 whitespace-nowrap">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {stocksData.map((r, i) => (
                        <tr key={r.code} className={`border-b border-gray-50 hover:bg-gray-50 transition-colors ${i % 2 !== 0 ? "bg-gray-50/30" : ""} ${r.statut === "alerte" ? "bg-red-50/30" : ""}`}>
                          <td className="px-3 py-2 font-mono text-[11px] text-gray-500 whitespace-nowrap">{r.code}</td>
                          <td className="px-3 py-2 font-medium text-gray-800 whitespace-nowrap">{r.designation}</td>
                          <td className="px-3 py-2 font-semibold text-gray-800 whitespace-nowrap">{r.stock}</td>
                          <td className="px-3 py-2 text-gray-500 whitespace-nowrap">{r.seuil}</td>
                          <td className="px-3 py-2 text-right font-semibold text-gray-700 whitespace-nowrap">{Number(r.valeur).toLocaleString("fr-FR")}</td>
                          <td className="px-3 py-2 text-gray-600 whitespace-nowrap">{r.fournisseur}</td>
                          <td className="px-3 py-2 text-gray-600 whitespace-nowrap">{r.expiration}</td>
                          <td className="px-3 py-2 whitespace-nowrap"><StockStatutBadge statut={r.statut} /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-800 mb-3">Consommation intrants YTD par catégorie</h3>
                  <div className="rounded-xl border border-gray-100 bg-white p-4">
                    <BarChartYTD />
                    <p className="text-[10px] text-gray-400 mt-2 text-right">Millions XOF — Total : 14,8 M XOF</p>
                  </div>
                </div>
              </div>
            )}

            {/* ── UTILISATIONS ── */}
            {tab === "utilisations" && (
              <div className="space-y-6">
                <div className="rounded-xl border border-gray-100 overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="bg-[#F8FBF8] border-b border-gray-100">
                        {["Date", "Intrant", "Parcelle", "Dose appliquée", "Opérateur", "Coût XOF", "EPI", "DRE"].map((h) => (
                          <th key={h} className="text-left text-[10px] font-semibold text-gray-500 uppercase tracking-wide px-3 py-2 whitespace-nowrap">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {utilisations.map((r, i) => (
                        <tr key={i} className={`border-b border-gray-50 hover:bg-gray-50 transition-colors ${i % 2 !== 0 ? "bg-gray-50/30" : ""}`}>
                          <td className="px-3 py-2 font-mono text-[11px] text-gray-600 whitespace-nowrap">{r.date}</td>
                          <td className="px-3 py-2 font-medium text-gray-800 whitespace-nowrap">{r.intrant}</td>
                          <td className="px-3 py-2 text-gray-600 whitespace-nowrap">{r.parcelle}</td>
                          <td className="px-3 py-2 text-gray-600 whitespace-nowrap">{r.dose}</td>
                          <td className="px-3 py-2 text-gray-700 whitespace-nowrap">{r.operateur}</td>
                          <td className="px-3 py-2 text-right font-semibold text-gray-800 whitespace-nowrap">{Number(r.cout).toLocaleString("fr-FR")}</td>
                          <td className="px-3 py-2 whitespace-nowrap">
                            {r.epi
                              ? <span className="inline-flex items-center gap-0.5 text-[10px] text-green-700"><CheckCircle size={10} /> OK</span>
                              : <span className="text-[10px] text-gray-400">—</span>
                            }
                          </td>
                          <td className="px-3 py-2 font-mono text-[11px] text-gray-600 whitespace-nowrap">{r.dre === "0" ? "0j" : r.dre}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="rounded-xl border border-amber-100 bg-amber-50 p-4 flex items-start gap-3">
                  <AlertTriangle size={15} className="text-amber-600 mt-0.5 shrink-0" />
                  <p className="text-xs text-amber-800">
                    <span className="font-semibold">Registre conforme MINADER/DPV et Rainforest Alliance SAS 2020 §5.2.</span>{" "}
                    Archivage 5 ans.
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-800 mb-3">Heatmap Intrants par parcelle × mois (coût/ha relatif)</h3>
                  <div className="rounded-xl border border-gray-100 bg-white p-4 overflow-x-auto">
                    <HeatmapIntrants />
                    <div className="flex items-center gap-3 mt-3 pt-3 border-t border-gray-100">
                      <div className="flex items-center gap-1.5">
                        <div className="w-12 h-3 rounded" style={{ background: "linear-gradient(to right, #fff, #2E7D32)" }} />
                        <span className="text-[10px] text-gray-500">Faible → Élevé (coût/ha)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
