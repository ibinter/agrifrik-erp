"use client";

import { useState } from "react";
import Topbar from "../../components/Topbar";
import { Leaf, Package, Calendar, AlertTriangle, CheckCircle, Clock } from "lucide-react";

type Tab = "catalogue" | "stocks" | "planification";

/* ─── Catalogue data ─────────────────────────────────────── */
const catalogueCacao = [
  { code: "SEM-CAC-01", variete: "Forastero hybride T-60/887", origine: "CNRA CI", type: "Greffé", germination: 94, conservation: "3 mois", pu: 18000 },
  { code: "SEM-CAC-02", variete: "Forastero hybride IMC-67", origine: "CNRA CI", type: "Greffé", germination: 92, conservation: "3 mois", pu: 18000 },
  { code: "SEM-CAC-04", variete: "Clone hybride Mercedes", origine: "CNRA CI", type: "Bouture", germination: 96, conservation: "6 sem.", pu: 22000 },
  { code: "SEM-CAC-05", variete: "Clone résistant SWOLLEN", origine: "CNRA CI", type: "Bouture", germination: 91, conservation: "6 sem.", pu: 26000 },
];

const catalogueAnacarde = [
  { code: "SEM-ANA-01", variete: "Anacardium blanc CI-61", origine: "CNRA CI", type: "Semence", germination: 95, conservation: "12 mois", pu: 4200 },
  { code: "SEM-ANA-03", variete: "Clone précoce CAJU-V1", origine: "CNRA CI", type: "Greffe", germination: 97, conservation: "3 mois", pu: 8400 },
  { code: "SEM-ANA-02", variete: "Cashew IAC-11", origine: "Importé", type: "Semence", germination: 91, conservation: "12 mois", pu: 6800 },
];

const catalogueVivrieres = [
  { code: "SEM-MAI-01", variete: "Maïs OBATANPA", origine: "IITA", type: "Semence", germination: 93, conservation: "18 mois", pu: 1800 },
  { code: "SEM-RIZ-01", variete: "Riz WITA-9 pluvial", origine: "ADRAO", type: "Semence", germination: 92, conservation: "24 mois", pu: 2400 },
  { code: "SEM-BAN-01", variete: "Bananier plantain PITA-3", origine: "IITA", type: "Vitro-plant", germination: 99, conservation: "4 sem.", pu: 1200 },
  { code: "SEM-MAN-01", variete: "Manioc TME-419", origine: "IITA", type: "Bouture", germination: 98, conservation: "3 sem.", pu: 800 },
  { code: "SEM-IGN-01", variete: "Igname Florido", origine: "CNRA CI", type: "Semenceaux", germination: 89, conservation: "3 mois", pu: 2200 },
  { code: "SEM-PAT-01", variete: "Patate douce Beauregard", origine: "CNRA CI", type: "Bouture", germination: 96, conservation: "4 sem.", pu: 600 },
];

const catalogueOmbrage = [
  { code: "SEM-OMB-01", variete: "Gliricidia sepium", origine: "CABI", type: "Semence", germination: 87, conservation: "24 mois", pu: 2400 },
  { code: "SEM-OMB-02", variete: "Leucaena leucocephala", origine: "CNRA CI", type: "Semence", germination: 92, conservation: "18 mois", pu: 1800 },
  { code: "SEM-OMB-03", variete: "Cedrela odorata", origine: "SODEFOR", type: "Semence", germination: 86, conservation: "12 mois", pu: 4800 },
  { code: "SEM-OMB-04", variete: "Pterocarpus erinaceus", origine: "CNRA CI", type: "Semence", germination: 82, conservation: "18 mois", pu: 5200 },
];

/* ─── Stocks data ────────────────────────────────────────── */
const stocks = [
  { code: "SEM-CAC-04", designation: "Clone Mercedes", qte: "18 kg", seuil: "10 kg", statut: "ok", expiration: "Sep 2025", localisation: "Lab. germination" },
  { code: "SEM-CAC-05", designation: "Clone SWOLLEN", qte: "8 kg", seuil: "10 kg", statut: "alerte", expiration: "Sep 2025", localisation: "Lab. germination" },
  { code: "SEM-ANA-01", designation: "Anacardium CI-61", qte: "82 kg", seuil: "20 kg", statut: "ok", expiration: "Jun 2026", localisation: "Entrepôt B" },
  { code: "SEM-MAI-01", designation: "Maïs OBATANPA", qte: "124 kg", seuil: "50 kg", statut: "ok", expiration: "Déc 2026", localisation: "Entrepôt B" },
  { code: "SEM-RIZ-01", designation: "Riz WITA-9", qte: "42 kg", seuil: "30 kg", statut: "limite", expiration: "Déc 2026", localisation: "Entrepôt B" },
  { code: "SEM-BAN-01", designation: "Bananier PITA-3", qte: "240 vitro-plants", seuil: "50", statut: "ok", expiration: "Sep 2025", localisation: "Nurserie A1" },
  { code: "SEM-MAN-01", designation: "Manioc TME-419", qte: "1 200 boutures", seuil: "200", statut: "ok", expiration: "Août 2025", localisation: "Nurserie A2" },
  { code: "SEM-OMB-01", designation: "Gliricidia", qte: "4,8 kg", seuil: "5 kg", statut: "alerte", expiration: "Mar 2026", localisation: "Entrepôt B" },
];

/* ─── Planification data ─────────────────────────────────── */
const planification = [
  { culture: "Maïs intercalaire", variete: "OBATANPA", periode: "Avr-Mai", surface: "5,6 ha", semences: "84 kg", statut: "realise" },
  { culture: "Riz pluvial PAR-D1", variete: "WITA-9", periode: "Mai-Jun", surface: "2,4 ha", semences: "48 kg", statut: "realise" },
  { culture: "Replantation cacao", variete: "Clone Mercedes", periode: "Sep-Oct", surface: "2,2 ha", semences: "66 boutures", statut: "planifie" },
  { culture: "Bananier", variete: "PITA-3", periode: "Sep", surface: "3,8 ha", semences: "380 vitro-plants", statut: "planifie" },
  { culture: "Arbres d'ombrage", variete: "Gliricidia", periode: "Sep", surface: "12 ha", semences: "8 kg", statut: "alerte" },
];

/* ─── SVG Gantt data ─────────────────────────────────────── */
const ganttData = [
  { label: "Maïs (OBATANPA)", color: "#F9A825", start: 3, end: 6 },
  { label: "Riz WITA-9", color: "#1565C0", start: 4, end: 7 },
  { label: "Manioc TME-419", color: "#6A1B9A", start: 5, end: 8 },
  { label: "Clone Mercedes", color: "#2E7D32", start: 8, end: 10 },
  { label: "Bananier PITA-3", color: "#E65100", start: 8, end: 9 },
  { label: "Gliricidia", color: "#37474F", start: 8, end: 9 },
];
const MONTHS = ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun", "Jul", "Aoû", "Sep", "Oct", "Nov", "Déc"];

/* ─── Sub-components ─────────────────────────────────────── */
function StatutStockBadge({ statut }: { statut: string }) {
  if (statut === "ok")
    return (
      <span className="inline-flex items-center gap-1 text-[10px] font-medium text-green-700 bg-green-50 rounded-full px-2 py-0.5">
        <CheckCircle size={10} /> OK
      </span>
    );
  if (statut === "alerte")
    return (
      <span className="inline-flex items-center gap-1 text-[10px] font-medium text-red-700 bg-red-50 rounded-full px-2 py-0.5">
        <AlertTriangle size={10} /> Alerte
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1 text-[10px] font-medium text-amber-700 bg-amber-50 rounded-full px-2 py-0.5">
      <Clock size={10} /> Limite
    </span>
  );
}

function StatutPlanBadge({ statut }: { statut: string }) {
  if (statut === "realise")
    return (
      <span className="inline-flex items-center gap-1 text-[10px] font-medium text-green-700 bg-green-50 rounded-full px-2 py-0.5">
        <CheckCircle size={10} /> Réalisé
      </span>
    );
  if (statut === "alerte")
    return (
      <span className="inline-flex items-center gap-1 text-[10px] font-medium text-red-700 bg-red-50 rounded-full px-2 py-0.5">
        <AlertTriangle size={10} /> Planifié — Stock insuffisant
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1 text-[10px] font-medium text-blue-700 bg-blue-50 rounded-full px-2 py-0.5">
      <Calendar size={10} /> Planifié
    </span>
  );
}

function CatalogueTable({ rows }: { rows: { code: string; variete: string; origine: string; type: string; germination: number; conservation: string; pu: number }[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs">
        <thead>
          <tr className="bg-[#F8FBF8] border-b border-gray-100">
            {["Code", "Variété", "Origine", "Type", "Taux germination", "Durée conserv.", "PU XOF/kg"].map((h) => (
              <th key={h} className="text-left text-[10px] font-semibold text-gray-500 uppercase tracking-wide px-3 py-2 whitespace-nowrap">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={r.code} className={`border-b border-gray-50 hover:bg-gray-50 transition-colors ${i % 2 !== 0 ? "bg-gray-50/30" : ""}`}>
              <td className="px-3 py-2 font-mono text-[11px] text-gray-500 whitespace-nowrap">{r.code}</td>
              <td className="px-3 py-2 font-medium text-gray-800 whitespace-nowrap">{r.variete}</td>
              <td className="px-3 py-2 text-gray-600 whitespace-nowrap">{r.origine}</td>
              <td className="px-3 py-2 whitespace-nowrap">
                <span className="bg-gray-100 text-gray-700 rounded px-1.5 py-0.5 text-[10px] font-medium">{r.type}</span>
              </td>
              <td className="px-3 py-2 whitespace-nowrap">
                <div className="flex items-center gap-1.5">
                  <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-[#2E7D32]" style={{ width: `${r.germination}%` }} />
                  </div>
                  <span className="font-semibold text-gray-700">{r.germination}%</span>
                </div>
              </td>
              <td className="px-3 py-2 text-gray-600 whitespace-nowrap">{r.conservation}</td>
              <td className="px-3 py-2 text-right font-semibold text-gray-800 whitespace-nowrap">{r.pu.toLocaleString("fr-FR")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function GanttNurserie() {
  const W = 720;
  const rowH = 32;
  const labelW = 160;
  const chartW = W - labelW - 8;
  const colW = chartW / 12;
  const headerH = 24;
  const H = ganttData.length * rowH + headerH + 4;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ fontFamily: "inherit" }}>
      {/* Month headers */}
      {MONTHS.map((m, i) => (
        <g key={m}>
          <rect x={labelW + i * colW} y={0} width={colW} height={headerH} fill={i % 2 === 0 ? "#F8FBF8" : "#F1F5F1"} />
          <text x={labelW + i * colW + colW / 2} y={15} textAnchor="middle" fontSize={9} fill="#666">{m}</text>
        </g>
      ))}
      {/* Rows */}
      {ganttData.map((row, ri) => {
        const y = headerH + ri * rowH;
        const barX = labelW + (row.start - 1) * colW;
        const barW = (row.end - row.start) * colW;
        return (
          <g key={row.label}>
            <rect x={0} y={y} width={W} height={rowH} fill={ri % 2 === 0 ? "#fff" : "#F8FBF8"} />
            <text x={6} y={y + rowH / 2 + 4} fontSize={10} fill="#333">{row.label}</text>
            <rect x={barX} y={y + 7} width={barW} height={rowH - 14} rx={3} fill={row.color} opacity={0.85} />
          </g>
        );
      })}
      {/* Today line — Jul = month 7 */}
      <line x1={labelW + 6 * colW} y1={0} x2={labelW + 6 * colW} y2={H} stroke="#E53935" strokeWidth={1.5} strokeDasharray="4,2" />
      <text x={labelW + 6 * colW + 2} y={H - 2} fontSize={8} fill="#E53935">Aujourd&apos;hui</text>
    </svg>
  );
}

/* ─── Page ───────────────────────────────────────────────── */
export default function SemencesPage() {
  const [tab, setTab] = useState<Tab>("catalogue");

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "catalogue", label: "Catalogue", icon: <Leaf size={13} /> },
    { id: "stocks", label: "Stocks", icon: <Package size={13} /> },
    { id: "planification", label: "Planification", icon: <Calendar size={13} /> },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Topbar title="Semences & Plants" breadcrumb={["Production", "Semences & Plants"]} />

      <div className="flex-1 p-6 space-y-5 max-w-screen-xl mx-auto w-full">

        {/* KPI — Catalogue */}
        {tab === "catalogue" && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { label: "Espèces gérées", value: "8", color: "#2E7D32" },
              { label: "Variétés référencées", value: "24", color: "#1565C0" },
              { label: "Taux germination moyen", value: "92,4 %", color: "#F9A825" },
              { label: "Stocks semences", value: "284 kg", color: "#6A1B9A" },
              { label: "Valeur stock", value: "2 840 000 XOF", color: "#E65100" },
            ].map((k) => (
              <div key={k.label} className="rounded-2xl border border-gray-100 bg-white p-5">
                <p className="text-[11px] text-gray-500 mb-1 leading-tight">{k.label}</p>
                <p className="text-xl font-bold" style={{ color: k.color }}>{k.value}</p>
              </div>
            ))}
          </div>
        )}

        {/* KPI — Stocks */}
        {tab === "stocks" && (
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Références en stock", value: "12", color: "#2E7D32" },
              { label: "En alerte seuil", value: "2", color: "#E53935" },
              { label: "Commandes en cours", value: "1", color: "#1565C0" },
            ].map((k) => (
              <div key={k.label} className="rounded-2xl border border-gray-100 bg-white p-5">
                <p className="text-[11px] text-gray-500 mb-1">{k.label}</p>
                <p className="text-2xl font-bold" style={{ color: k.color }}>{k.value}</p>
              </div>
            ))}
          </div>
        )}

        {/* Tab container */}
        <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden">
          {/* Tab bar */}
          <div className="flex border-b border-gray-100 px-4 pt-3 gap-1">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex items-center gap-1.5 text-xs font-medium px-4 py-2 rounded-t-lg border-b-2 transition-colors ${
                  tab === t.id
                    ? "border-[#2E7D32] text-[#2E7D32] bg-green-50"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                }`}
              >
                {t.icon} {t.label}
              </button>
            ))}
          </div>

          <div className="p-5">

            {/* ── CATALOGUE ── */}
            {tab === "catalogue" && (
              <div className="space-y-6">
                {[
                  { label: "Cacao", count: 6, rows: catalogueCacao, accent: "#4E342E" },
                  { label: "Anacarde", count: 3, rows: catalogueAnacarde, accent: "#E65100" },
                  { label: "Vivrières", count: 6, rows: catalogueVivrieres, accent: "#2E7D32" },
                  { label: "Arbres d'ombrage", count: 4, rows: catalogueOmbrage, accent: "#37474F" },
                ].map((g) => (
                  <div key={g.label}>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-1.5 h-4 rounded-full" style={{ backgroundColor: g.accent }} />
                      <h3 className="text-sm font-semibold text-gray-800">{g.label}</h3>
                      <span className="text-xs text-gray-400">({g.count} variétés)</span>
                    </div>
                    <div className="rounded-xl border border-gray-100 overflow-hidden">
                      <CatalogueTable rows={g.rows} />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ── STOCKS ── */}
            {tab === "stocks" && (
              <div className="space-y-4">
                <div className="rounded-xl border border-gray-100 overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="bg-[#F8FBF8] border-b border-gray-100">
                        {["Code", "Désignation", "Qté en stock", "Seuil alerte", "Statut", "Expiration", "Localisation"].map((h) => (
                          <th key={h} className="text-left text-[10px] font-semibold text-gray-500 uppercase tracking-wide px-3 py-2 whitespace-nowrap">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {stocks.map((r, i) => (
                        <tr key={r.code} className={`border-b border-gray-50 hover:bg-gray-50 transition-colors ${i % 2 !== 0 ? "bg-gray-50/30" : ""}`}>
                          <td className="px-3 py-2 font-mono text-[11px] text-gray-500 whitespace-nowrap">{r.code}</td>
                          <td className="px-3 py-2 font-medium text-gray-800 whitespace-nowrap">{r.designation}</td>
                          <td className="px-3 py-2 font-semibold text-gray-800 whitespace-nowrap">{r.qte}</td>
                          <td className="px-3 py-2 text-gray-500 whitespace-nowrap">{r.seuil}</td>
                          <td className="px-3 py-2 whitespace-nowrap"><StatutStockBadge statut={r.statut} /></td>
                          <td className="px-3 py-2 text-gray-600 whitespace-nowrap">{r.expiration}</td>
                          <td className="px-3 py-2 text-gray-600 whitespace-nowrap">{r.localisation}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="rounded-xl border border-blue-100 bg-blue-50 p-4 flex items-start gap-3">
                  <Clock size={15} className="text-blue-600 mt-0.5 shrink-0" />
                  <p className="text-xs text-blue-800">
                    <span className="font-semibold">Commande en cours — CNRA CI :</span>{" "}
                    20 kg Clone Mercedes + 15 kg Clone SWOLLEN — ETA 20/07/2025
                  </p>
                </div>
              </div>
            )}

            {/* ── PLANIFICATION ── */}
            {tab === "planification" && (
              <div className="space-y-6">
                <div className="rounded-xl border border-gray-100 overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="bg-[#F8FBF8] border-b border-gray-100">
                        {["Culture", "Variété", "Période", "Surface", "Semences", "Statut"].map((h) => (
                          <th key={h} className="text-left text-[10px] font-semibold text-gray-500 uppercase tracking-wide px-3 py-2 whitespace-nowrap">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {planification.map((r, i) => (
                        <tr key={i} className={`border-b border-gray-50 hover:bg-gray-50 transition-colors ${i % 2 !== 0 ? "bg-gray-50/30" : ""}`}>
                          <td className="px-3 py-2 font-medium text-gray-800 whitespace-nowrap">{r.culture}</td>
                          <td className="px-3 py-2 text-gray-700 whitespace-nowrap">{r.variete}</td>
                          <td className="px-3 py-2 text-gray-600 whitespace-nowrap">{r.periode}</td>
                          <td className="px-3 py-2 text-gray-600 whitespace-nowrap">{r.surface}</td>
                          <td className="px-3 py-2 font-semibold text-gray-800 whitespace-nowrap">{r.semences}</td>
                          <td className="px-3 py-2 whitespace-nowrap"><StatutPlanBadge statut={r.statut} /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-800 mb-3">Gantt Nurserie 2025</h3>
                  <div className="rounded-xl border border-gray-100 bg-white p-4 overflow-x-auto">
                    <GanttNurserie />
                    <div className="flex flex-wrap gap-4 mt-3 pt-3 border-t border-gray-100">
                      {ganttData.map((g) => (
                        <div key={g.label} className="flex items-center gap-1.5 text-xs text-gray-600">
                          <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: g.color }} />
                          {g.label}
                        </div>
                      ))}
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
