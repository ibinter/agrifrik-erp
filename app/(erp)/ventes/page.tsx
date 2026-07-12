"use client";

import { useState } from "react";
import { TrendingUp, ShoppingBag, Package, Clock, Plus, Download, Search } from "lucide-react";
import Topbar from "../../components/Topbar";

/* ─── Types ─────────────────────────────────────────────────────────────────── */
type Filtre = "Toutes" | "En attente" | "Livrées" | "Réglées";

interface Vente {
  id: string;
  date: string;
  client: string;
  produit: string;
  volume: number;
  prixKg: number;
  montant: number;
  statut: "Réglée" | "BL émis" | "En attente";
}

/* ─── Données ─────────────────────────────────────────────────────────────── */
const VENTES: Vente[] = [
  { id: "VNT-2025-001", date: "12/01", client: "Barry Callebaut CI", produit: "Cacao Grade AA", volume: 3200, prixKg: 1087, montant: 3478400, statut: "Réglée" },
  { id: "VNT-2025-002", date: "10/02", client: "Barry Callebaut CI", produit: "Cacao Grade AA", volume: 3400, prixKg: 1087, montant: 3695800, statut: "Réglée" },
  { id: "VNT-2025-003", date: "12/03", client: "Barry Callebaut CI", produit: "Cacao Grade AA", volume: 3200, prixKg: 1087, montant: 3478400, statut: "Réglée" },
  { id: "VNT-2025-004", date: "15/04", client: "Barry Callebaut CI", produit: "Cacao Grade AA", volume: 3600, prixKg: 1087, montant: 3913200, statut: "Réglée" },
  { id: "VNT-2025-005", date: "13/05", client: "Barry Callebaut CI", produit: "Cacao Grade AA", volume: 3400, prixKg: 1087, montant: 3695800, statut: "Réglée" },
  { id: "VNT-2025-006", date: "02/06", client: "Cargill CI",          produit: "Anacarde WW240", volume: 1600, prixKg: 1525, montant: 2440000, statut: "Réglée" },
  { id: "VNT-2025-007", date: "22/06", client: "Barry Callebaut CI", produit: "Cacao Grade AA", volume: 964,  prixKg: 1087, montant: 1047768, statut: "Réglée" },
  { id: "VNT-2025-008", date: "22/06", client: "Barry Callebaut CI", produit: "Cacao Grade AA", volume: 3400, prixKg: 1087, montant: 3695800, statut: "Réglée" },
  { id: "VNT-2025-009", date: "11/07", client: "Barry Callebaut CI", produit: "Cacao Grade AA", volume: 3400, prixKg: 1087, montant: 3695800, statut: "BL émis" },
];

/* CA mensuel 2025 vs 2024 — groupé bar chart */
const CA_DATA = [
  { mois: "Jan", v2024: 3.2, v2025: 3.5 },
  { mois: "Fév", v2024: 3.4, v2025: 3.7 },
  { mois: "Mar", v2024: 3.1, v2025: 3.5 },
  { mois: "Avr", v2024: 3.5, v2025: 3.9 },
  { mois: "Mai", v2024: 3.3, v2025: 3.7 },
  { mois: "Jun", v2024: 3.0, v2025: 3.5 },
  { mois: "Jul", v2024: 3.2, v2025: 3.7 }, // partiel 2025
];

const MAX_CA = 5;

/* Donut data */
const DONUT_SEGMENTS = [
  { label: "BC cacao",         pct: 89.2, color: "#2E7D32" },
  { label: "Cargill anacarde", pct: 8.0,  color: "#E65100" },
  { label: "Autres",           pct: 2.8,  color: "#BDBDBD" },
];

/* ─── Helpers ─────────────────────────────────────────────────────────────── */
function formatXOF(n: number) {
  return n.toLocaleString("fr-FR") + " XOF";
}

function statutStyle(s: Vente["statut"]) {
  if (s === "Réglée")   return { bg: "#E8F5E9", color: "#2E7D32", label: "✅ Réglée" };
  if (s === "BL émis")  return { bg: "#E3F2FD", color: "#1565C0", label: "🔵 BL émis" };
  return                       { bg: "#FFF9C4", color: "#F57F17", label: "⏳ En attente" };
}

/* ─── Composant principal ─────────────────────────────────────────────────── */
export default function VentesPage() {
  const [filtre, setFiltre] = useState<Filtre>("Toutes");
  const [search, setSearch] = useState("");

  const filtrees = VENTES.filter((v) => {
    if (filtre === "En attente" && v.statut !== "En attente") return false;
    if (filtre === "Livrées"   && v.statut !== "BL émis")    return false;
    if (filtre === "Réglées"   && v.statut !== "Réglée")     return false;
    if (search && !v.client.toLowerCase().includes(search.toLowerCase()) &&
        !v.id.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const totalVolume  = VENTES.reduce((s, v) => s + v.volume, 0);
  const totalMontant = VENTES.reduce((s, v) => s + v.montant, 0);
  const reglees      = VENTES.filter((v) => v.statut === "Réglée").length;

  /* Donut SVG helper */
  function donutPath(segments: typeof DONUT_SEGMENTS) {
    const R = 90; const cx = 140; const cy = 140;
    let cumul = 0;
    return segments.map((seg) => {
      const startAngle = (cumul / 100) * 2 * Math.PI - Math.PI / 2;
      cumul += seg.pct;
      const endAngle = (cumul / 100) * 2 * Math.PI - Math.PI / 2;
      const x1 = cx + R * Math.cos(startAngle);
      const y1 = cy + R * Math.sin(startAngle);
      const x2 = cx + R * Math.cos(endAngle);
      const y2 = cy + R * Math.sin(endAngle);
      const large = seg.pct > 50 ? 1 : 0;
      const innerR = 52;
      const ix1 = cx + innerR * Math.cos(startAngle);
      const iy1 = cy + innerR * Math.sin(startAngle);
      const ix2 = cx + innerR * Math.cos(endAngle);
      const iy2 = cy + innerR * Math.sin(endAngle);
      return (
        <path
          key={seg.label}
          d={`M ${x1} ${y1} A ${R} ${R} 0 ${large} 1 ${x2} ${y2} L ${ix2} ${iy2} A ${innerR} ${innerR} 0 ${large} 0 ${ix1} ${iy1} Z`}
          fill={seg.color}
        />
      );
    });
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Topbar title="Ventes" breadcrumb={["Commerce", "Ventes"]} />

      <main className="flex-1 p-6 space-y-5 max-w-[1400px] mx-auto w-full">

        {/* ── En-tête ── */}
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <h1 className="text-xl font-bold text-gray-900">Ventes</h1>
          <button className="inline-flex items-center gap-2 bg-[#2E7D32] text-white rounded-xl text-xs font-medium px-4 py-2.5 hover:bg-[#1B5E20] transition-colors">
            <Plus size={14} />
            Nouvelle vente
          </button>
        </div>

        {/* ── KPIs ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { icon: TrendingUp,  label: "CA 2025 YTD",              value: "30,4 M XOF", sub: "9 ventes réalisées",      color: "#2E7D32", bg: "#E8F5E9" },
            { icon: ShoppingBag, label: "Nombre de ventes",          value: "9",          sub: "dont 8 réglées",          color: "#1565C0", bg: "#E3F2FD" },
            { icon: Package,     label: "Volume total",              value: "30,3 t",     sub: "Cacao AA + Anacarde",     color: "#E65100", bg: "#FFF3E0" },
            { icon: Clock,       label: "Délai moyen règlement",     value: "13 j",       sub: "vs 18j cible",            color: "#6A1B9A", bg: "#F3E5F5" },
          ].map(({ icon: Icon, label, value, sub, color, bg }) => (
            <div key={label} className="rounded-2xl border border-gray-100 bg-white p-5 flex items-start gap-3">
              <div className="rounded-xl p-2.5 shrink-0 mt-0.5" style={{ background: bg }}>
                <Icon size={18} style={{ color }} />
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-0.5">{label}</div>
                <div className="text-xl font-bold text-gray-900">{value}</div>
                <div className="text-xs text-gray-400 mt-0.5">{sub}</div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Filtres + recherche ── */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-xl p-1">
            {(["Toutes", "En attente", "Livrées", "Réglées"] as Filtre[]).map((f) => (
              <button
                key={f}
                onClick={() => setFiltre(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  filtre === f ? "bg-[#2E7D32] text-white" : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher client..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 pr-4 py-2 text-xs border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#2E7D32]/30 w-48"
            />
          </div>
        </div>

        {/* ── Tableau des ventes ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs min-w-[780px]">
              <thead>
                <tr className="bg-[#F8FBF8]">
                  {["N°", "Date", "Client", "Produit", "Volume (kg)", "Prix/kg", "Montant", "Statut"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left font-semibold text-gray-500 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtrees.map((v) => {
                  const st = statutStyle(v.statut);
                  const isHighlighted = v.id === "VNT-2025-008";
                  return (
                    <tr
                      key={v.id}
                      className={`hover:bg-gray-50 transition-colors ${isHighlighted ? "font-semibold" : ""}`}
                    >
                      <td className="px-4 py-3 font-mono text-gray-600 whitespace-nowrap">{v.id}</td>
                      <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{v.date}/2025</td>
                      <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">{v.client}</td>
                      <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{v.produit}</td>
                      <td className="px-4 py-3 text-gray-900 font-medium whitespace-nowrap">
                        {v.volume.toLocaleString("fr-FR")}
                      </td>
                      <td className="px-4 py-3 text-gray-700 whitespace-nowrap">
                        {v.prixKg.toLocaleString("fr-FR")} XOF
                      </td>
                      <td className="px-4 py-3 font-semibold text-[#2E7D32] whitespace-nowrap">
                        {formatXOF(v.montant)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span
                          className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold"
                          style={{ background: st.bg, color: st.color }}
                        >
                          {st.label}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              {/* Ligne total */}
              <tfoot>
                <tr className="bg-[#F8FBF8] font-bold text-gray-800 border-t-2 border-gray-200">
                  <td colSpan={4} className="px-4 py-3 text-right text-xs uppercase tracking-wide text-gray-500">Total</td>
                  <td className="px-4 py-3 text-gray-900 whitespace-nowrap">{totalVolume.toLocaleString("fr-FR")} kg</td>
                  <td className="px-4 py-3 text-gray-400">—</td>
                  <td className="px-4 py-3 text-[#2E7D32] whitespace-nowrap">{formatXOF(totalMontant)}</td>
                  <td className="px-4 py-3 text-xs text-gray-500 whitespace-nowrap">✅ {reglees}/{VENTES.length} réglées</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* ── Analyse des ventes ── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">

          {/* Bar chart CA mensuel — 3/5 */}
          <div className="lg:col-span-3 bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-gray-900">CA mensuel 2025 vs 2024</h2>
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <span className="flex items-center gap-1.5">
                  <span className="inline-block w-3 h-3 rounded-sm bg-gray-300" /> 2024
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="inline-block w-3 h-3 rounded-sm bg-[#4CAF50]" /> 2025
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="inline-block w-3 h-3 rounded-sm border border-dashed border-[#4CAF50]" /> 2025 partiel
                </span>
              </div>
            </div>
            <svg viewBox="0 0 640 220" className="w-full" aria-label="CA mensuel 2025 vs 2024">
              {/* Grille */}
              {[0, 1, 2, 3, 4, 5].map((v) => {
                const y = 185 - (v / MAX_CA) * 155;
                return (
                  <g key={v}>
                    <line x1={44} y1={y} x2={630} y2={y} stroke="#F0F0F0" strokeWidth={1} />
                    <text x={40} y={y + 4} textAnchor="end" fontSize={9} fill="#BDBDBD">{v}M</text>
                  </g>
                );
              })}
              {/* Barres */}
              {CA_DATA.map((d, i) => {
                const slotW = 76;
                const x0 = 48 + i * slotW;
                const bW = 26;
                const gap = 4;
                const h24 = (d.v2024 / MAX_CA) * 155;
                const h25 = (d.v2025 / MAX_CA) * 155;
                const isPartial = i === CA_DATA.length - 1;
                return (
                  <g key={d.mois}>
                    {/* 2024 */}
                    <rect x={x0} y={185 - h24} width={bW} height={h24} rx={3} fill="#D0D0D0" />
                    {/* 2025 */}
                    {isPartial ? (
                      <rect x={x0 + bW + gap} y={185 - h25} width={bW} height={h25} rx={3}
                        fill="none" stroke="#4CAF50" strokeWidth={1.5} strokeDasharray="4,3" />
                    ) : (
                      <rect x={x0 + bW + gap} y={185 - h25} width={bW} height={h25} rx={3} fill="#4CAF50" />
                    )}
                    {/* Label */}
                    <text x={x0 + bW + 1} y={200} textAnchor="middle" fontSize={9} fill="#9E9E9E">{d.mois}</text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Donut répartition — 2/5 */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h2 className="text-sm font-semibold text-gray-900 mb-4">Répartition par client et produit</h2>
            <div className="flex flex-col items-center gap-4">
              <svg viewBox="0 0 280 280" className="w-full max-w-[220px]" aria-label="Répartition ventes par client">
                {donutPath(DONUT_SEGMENTS)}
                {/* Centre */}
                <text x={140} y={134} textAnchor="middle" fontSize={13} fontWeight="700" fill="#212121">30,4 M</text>
                <text x={140} y={150} textAnchor="middle" fontSize={9} fill="#9E9E9E">XOF CA</text>
              </svg>
              {/* Légende */}
              <div className="w-full space-y-2">
                {DONUT_SEGMENTS.map((seg) => (
                  <div key={seg.label} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full shrink-0" style={{ background: seg.color }} />
                      <span className="text-gray-700">{seg.label}</span>
                    </div>
                    <span className="font-semibold text-gray-900">{seg.pct}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Actions bas de page ── */}
        <div className="flex items-center gap-3 justify-end pb-2">
          <button className="inline-flex items-center gap-2 border border-gray-200 bg-white text-gray-700 rounded-xl text-xs font-medium px-4 py-2.5 hover:bg-gray-50 transition-colors">
            Voir toutes les ventes
          </button>
          <button className="inline-flex items-center gap-2 border border-[#2E7D32] text-[#2E7D32] bg-white rounded-xl text-xs font-medium px-4 py-2.5 hover:bg-[#E8F5E9] transition-colors">
            <Download size={13} />
            Exporter Excel
          </button>
        </div>

      </main>
    </div>
  );
}
