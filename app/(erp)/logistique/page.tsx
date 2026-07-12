"use client";

import { useState } from "react";
import Topbar from "../../components/Topbar";
import { Truck, Package, TrendingDown, CheckCircle, Search, Plus } from "lucide-react";

/* ─── Types ─────────────────────────────────────────────────────────────────── */
type Filtre = "Tous" | "Entrées" | "Sorties" | "En cours";

/* ─── Données ───────────────────────────────────────────────────────────────── */
const transports = [
  { ref: "LOG-2025-001", date: "25/01", type: "Sortie export", origine: "EXP-001", dest: "BC San-Pédro", produit: "Cacao AA LOT-041", poids: "1 018 kg", cout: "68 000 XOF", statut: "Livré" },
  { ref: "LOG-2025-002", date: "12/02", type: "Sortie export", origine: "EXP-001", dest: "BC San-Pédro", produit: "Cacao AA LOT-042", poids: "971 kg", cout: "68 000 XOF", statut: "Livré" },
  { ref: "LOG-2025-003", date: "15/03", type: "Sortie export", origine: "EXP-001", dest: "BC San-Pédro", produit: "Cacao AA LOT-043", poids: "1 067 kg", cout: "68 000 XOF", statut: "Livré" },
  { ref: "LOG-2025-004", date: "05/04", type: "Entrée matériels", origine: "Netafim Abidjan", dest: "EXP-001", produit: "Matériels irrigation", poids: "280 kg", cout: "145 000 XOF", statut: "Reçu" },
  { ref: "LOG-2025-005", date: "18/04", type: "Sortie export", origine: "EXP-001", dest: "BC San-Pédro", produit: "Cacao AA LOT-044", poids: "896 kg", cout: "68 000 XOF", statut: "Livré" },
  { ref: "LOG-2025-006", date: "02/06", type: "Sortie export", origine: "EXP-001", dest: "Cargill Abidjan", produit: "Anacarde WW240", poids: "842 kg", cout: "165 000 XOF", statut: "Livré" },
  { ref: "LOG-2025-007", date: "11/07", type: "Sortie export", origine: "EXP-001", dest: "BC San-Pédro", produit: "Cacao AA 3 400 kg", poids: "3 400 kg", cout: "204 000 XOF", statut: "Livré" },
  { ref: "LOG-2025-008", date: "11/07", type: "Entrée consommables", origine: "KCl Distribution", dest: "EXP-001", produit: "KCl 60% 6 sacs", poids: "300 kg", cout: "18 000 XOF", statut: "Reçu" },
  { ref: "LOG-2025-009", date: "22/07", type: "Sortie (planifié)", origine: "EXP-001", dest: "BC San-Pédro", produit: "Cacao AA LOT-047", poids: "~964 kg", cout: "68 000 XOF", statut: "Planifié" },
];

function statutBadge(statut: string) {
  if (statut === "Livré" || statut === "Reçu")
    return <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700">✅ {statut}</span>;
  return <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700">🔵 {statut}</span>;
}

function typeBadge(type: string) {
  if (type.startsWith("Sortie"))
    return <span className="rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700">{type}</span>;
  if (type.startsWith("Entrée"))
    return <span className="rounded-full bg-orange-50 px-2 py-0.5 text-xs font-medium text-orange-700">{type}</span>;
  return <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">{type}</span>;
}

/* ─── SVG Grouped Bar Chart — Flux par mois ─────────────────────────────────── */
// Données : [mois, entrées kXOF, sorties kXOF]
const fluxMois = [
  { mois: "Jan", e: 0, s: 68 },
  { mois: "Fév", e: 0, s: 68 },
  { mois: "Mar", e: 0, s: 68 },
  { mois: "Avr", e: 145, s: 68 },
  { mois: "Mai", e: 0, s: 0 },
  { mois: "Jun", e: 18, s: 165 },
  { mois: "Jul", e: 18, s: 272 },
];

function SvgFluxMois() {
  const W = 640, H = 200, padL = 50, padB = 28, padT = 20, padR = 20;
  const chartW = W - padL - padR;
  const chartH = H - padB - padT;
  const maxVal = 280;
  const n = fluxMois.length;
  const groupW = chartW / n;
  const barW = Math.floor(groupW * 0.28);
  const gap = 4;

  const yLines = [0, 50, 100, 150, 200, 250];

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5">
      <h3 className="mb-1 text-sm font-semibold text-gray-700">Flux logistiques par mois 2025</h3>
      <p className="mb-4 text-xs text-gray-400">Entrées (bleu) vs Sorties (vert) — en k XOF</p>
      <div className="overflow-x-auto">
        <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} xmlns="http://www.w3.org/2000/svg">
          {/* Grille */}
          {yLines.map((v) => {
            const y = padT + chartH - (v / maxVal) * chartH;
            return (
              <g key={v}>
                <line x1={padL} y1={y} x2={W - padR} y2={y} stroke="#F0F0F0" strokeWidth="1" />
                <text x={padL - 6} y={y + 4} fontSize="9" fill="#999" textAnchor="end">{v}k</text>
              </g>
            );
          })}
          {/* Barres */}
          {fluxMois.map((d, i) => {
            const cx = padL + i * groupW + groupW / 2;
            const xE = cx - barW - gap / 2;
            const xS = cx + gap / 2;
            const hE = d.e > 0 ? (d.e / maxVal) * chartH : 0;
            const hS = d.s > 0 ? (d.s / maxVal) * chartH : 0;
            const yE = padT + chartH - hE;
            const yS = padT + chartH - hS;
            return (
              <g key={d.mois}>
                {d.e > 0 && (
                  <>
                    <rect x={xE} y={yE} width={barW} height={hE} fill="#1565C0" rx="3" opacity="0.85" />
                    <text x={xE + barW / 2} y={yE - 3} fontSize="8" fill="#1565C0" textAnchor="middle" fontWeight="bold">{d.e}k</text>
                  </>
                )}
                {d.s > 0 && (
                  <>
                    <rect x={xS} y={yS} width={barW} height={hS} fill="#2E7D32" rx="3" opacity="0.85" />
                    <text x={xS + barW / 2} y={yS - 3} fontSize="8" fill="#2E7D32" textAnchor="middle" fontWeight="bold">{d.s}k</text>
                  </>
                )}
                <text x={cx} y={H - 6} fontSize="9" fill="#666" textAnchor="middle">{d.mois}</text>
              </g>
            );
          })}
          {/* Axe X */}
          <line x1={padL} y1={padT + chartH} x2={W - padR} y2={padT + chartH} stroke="#DDD" strokeWidth="1" />
          {/* Légende */}
          <rect x={padL} y={padT - 14} width="10" height="10" fill="#1565C0" rx="2" opacity="0.85" />
          <text x={padL + 14} y={padT - 5} fontSize="9" fill="#555">Entrées</text>
          <rect x={padL + 70} y={padT - 14} width="10" height="10" fill="#2E7D32" rx="2" opacity="0.85" />
          <text x={padL + 84} y={padT - 5} fontSize="9" fill="#555">Sorties</text>
        </svg>
      </div>
    </div>
  );
}

/* ─── SVG Donut — Répartition des coûts ────────────────────────────────────── */
function SvgDonutCouts() {
  const cx = 130, cy = 130, r = 90, inner = 54;
  // Tranches : [valeur, couleur, label, pct, montant]
  const tranches = [
    { pct: 68.2, color: "#1B5E20", label: "Export BC cacao", montant: "544 000 XOF" },
    { pct: 20.7, color: "#2E7D32", label: "Export Cargill anacarde", montant: "165 000 XOF" },
    { pct: 9.1, color: "#E65100", label: "Réception matériels", montant: "145 000 XOF" },
    { pct: 2.0, color: "#9E9E9E", label: "Réceptions diverses", montant: "18 000 XOF" },
  ];

  // Calcul arcs
  let cumul = 0;
  const arcs = tranches.map((t) => {
    const start = cumul;
    cumul += t.pct;
    const startAngle = (start / 100) * 2 * Math.PI - Math.PI / 2;
    const endAngle = (cumul / 100) * 2 * Math.PI - Math.PI / 2;
    const x1 = cx + r * Math.cos(startAngle);
    const y1 = cy + r * Math.sin(startAngle);
    const x2 = cx + r * Math.cos(endAngle);
    const y2 = cy + r * Math.sin(endAngle);
    const xi1 = cx + inner * Math.cos(startAngle);
    const yi1 = cy + inner * Math.sin(startAngle);
    const xi2 = cx + inner * Math.cos(endAngle);
    const yi2 = cy + inner * Math.sin(endAngle);
    const large = t.pct > 50 ? 1 : 0;
    const d = `M ${xi1} ${yi1} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} L ${xi2} ${yi2} A ${inner} ${inner} 0 ${large} 0 ${xi1} ${yi1} Z`;
    return { ...t, d };
  });

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5">
      <h3 className="mb-4 text-sm font-semibold text-gray-700">Répartition des coûts logistiques</h3>
      <div className="flex flex-col sm:flex-row items-center gap-6">
        <svg viewBox="0 0 260 260" width="260" height="260" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
          {arcs.map((a, i) => (
            <path key={i} d={a.d} fill={a.color} />
          ))}
          <text x={cx} y={cy - 8} fontSize="13" fontWeight="bold" fill="#333" textAnchor="middle">872 000</text>
          <text x={cx} y={cy + 8} fontSize="10" fill="#888" textAnchor="middle">XOF total</text>
        </svg>
        <div className="space-y-2 text-xs">
          {tranches.map((t, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="mt-0.5 h-3 w-3 shrink-0 rounded-sm" style={{ background: t.color }} />
              <div>
                <p className="font-medium text-gray-700">{t.label}</p>
                <p className="text-gray-400">{t.pct}% — {t.montant}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Page ──────────────────────────────────────────────────────────────────── */
export default function LogistiquePage() {
  const [filtre, setFiltre] = useState<Filtre>("Tous");
  const [search, setSearch] = useState("");

  const filtres: Filtre[] = ["Tous", "Entrées", "Sorties", "En cours"];

  const filteredData = transports.filter((t) => {
    const matchSearch = search === "" || t.dest.toLowerCase().includes(search.toLowerCase()) || t.produit.toLowerCase().includes(search.toLowerCase());
    if (!matchSearch) return false;
    if (filtre === "Tous") return true;
    if (filtre === "Entrées") return t.type.startsWith("Entrée");
    if (filtre === "Sorties") return t.type.startsWith("Sortie");
    if (filtre === "En cours") return t.statut === "Planifié";
    return true;
  });

  const kpis = [
    { label: "Transports 2025", value: "9", icon: Truck, color: "#2E7D32" },
    { label: "Poids livré", value: "28 764 kg", icon: Package, color: "#1565C0" },
    { label: "Coût moyen", value: "204 000 XOF", icon: TrendingDown, color: "#E65100" },
    { label: "Livraisons conformes", value: "100%", icon: CheckCircle, color: "#4CAF50" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Topbar breadcrumb={["Logistique", "Transports"]} title="Logistique" />

      <div className="p-6 space-y-6">
        {/* En-tête */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-800">Logistique</h1>
            <p className="mt-0.5 text-sm text-gray-500">Transports et livraisons — EXP-001 — Campagne 2025</p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-xl bg-[#2E7D32] px-4 py-2 text-xs font-medium text-white hover:bg-[#1B5E20] transition-colors">
            <Plus size={14} />
            Nouveau transport
          </button>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {kpis.map((k) => (
            <div key={k.label} className="rounded-2xl border border-gray-100 bg-white p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-500">{k.label}</p>
                  <p className="mt-1 text-xl font-bold text-gray-800">{k.value}</p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: k.color + "18" }}>
                  <k.icon size={20} style={{ color: k.color }} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Filtres + Recherche */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-1 rounded-xl border border-gray-100 bg-white p-1">
            {filtres.map((f) => (
              <button
                key={f}
                onClick={() => setFiltre(f)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                  filtre === f ? "bg-[#2E7D32] text-white" : "text-gray-500 hover:text-gray-700"
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
              placeholder="Rechercher destination ou produit..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-64 rounded-xl border border-gray-200 bg-white py-2 pl-8 pr-3 text-xs text-gray-700 placeholder-gray-400 focus:border-[#2E7D32] focus:outline-none"
            />
          </div>
        </div>

        {/* Tableau des transports */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="mb-4 text-sm font-semibold text-gray-700">Tableau des transports 2025</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-xs">
              <thead>
                <tr className="bg-[#F8FBF8]">
                  {["N°", "Date", "Type", "Origine → Destination", "Produit", "Poids", "Coût", "Statut"].map((h) => (
                    <th key={h} className="whitespace-nowrap px-3 py-2 text-left text-xs font-semibold text-gray-600">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredData.map((t) => (
                  <tr key={t.ref} className="border-t border-gray-50 hover:bg-gray-50">
                    <td className="whitespace-nowrap px-3 py-2 font-mono text-xs font-medium text-gray-800">{t.ref}</td>
                    <td className="whitespace-nowrap px-3 py-2 text-gray-600">{t.date}</td>
                    <td className="whitespace-nowrap px-3 py-2">{typeBadge(t.type)}</td>
                    <td className="whitespace-nowrap px-3 py-2 text-gray-700">{t.origine} → {t.dest}</td>
                    <td className="whitespace-nowrap px-3 py-2 text-gray-700">{t.produit}</td>
                    <td className="whitespace-nowrap px-3 py-2 font-medium text-gray-800">{t.poids}</td>
                    <td className="whitespace-nowrap px-3 py-2 font-medium text-gray-800">{t.cout}</td>
                    <td className="whitespace-nowrap px-3 py-2">{statutBadge(t.statut)}</td>
                  </tr>
                ))}
                {filteredData.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-3 py-8 text-center text-xs text-gray-400">Aucun résultat</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Graphiques */}
        <div className="grid gap-6 lg:grid-cols-2">
          <SvgFluxMois />
          <SvgDonutCouts />
        </div>
      </div>
    </div>
  );
}
