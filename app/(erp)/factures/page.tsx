"use client";

import { useState } from "react";
import { FileText, CheckCircle, Clock, TrendingUp, Plus, Eye, Search } from "lucide-react";
import Topbar from "../../components/Topbar";

/* ─── KPIs ─────────────────────────────────────────────── */
const kpis = [
  { label: "Factures 2025", value: "9", unit: "", sub: "Depuis janvier 2025", icon: FileText, iconColor: "#6A1B9A", iconBg: "#F3E5F5" },
  { label: "CA facturé", value: "30,1 M", unit: "XOF", sub: "Exercice 2025", icon: TrendingUp, iconColor: "#2E7D32", iconBg: "#E8F5E9" },
  { label: "Taux encaissement", value: "100", unit: "%", sub: "8/9 réglées ✓", icon: CheckCircle, iconColor: "#1565C0", iconBg: "#E3F2FD" },
  { label: "Délai moyen règlement", value: "13", unit: "j", sub: "Conforme J+15 contractuel", icon: Clock, iconColor: "#E65100", iconBg: "#FFF3E0" },
];

/* ─── DONNÉES FACTURES ──────────────────────────────────── */
type Filtre = "Toutes" | "En attente" | "Réglées" | "En retard";

interface Facture {
  numero: string;
  date: string;
  client: string;
  description: string;
  montantTTC: number;
  echeance: string;
  paiement: string | null;
  statut: "Réglée" | "En attente LC" | "Réglée (retard)";
  retard?: string;
}

const factures: Facture[] = [
  { numero: "FAC-2025-001", date: "12/01", client: "Barry Callebaut CI", description: "Cacao AA LOT-038", montantTTC: 3478400, echeance: "27/01", paiement: "27/01/2025", statut: "Réglée" },
  { numero: "FAC-2025-002", date: "10/02", client: "Barry Callebaut CI", description: "Cacao AA LOT-039", montantTTC: 3695800, echeance: "25/02", paiement: "25/02/2025", statut: "Réglée" },
  { numero: "FAC-2025-003", date: "12/03", client: "Barry Callebaut CI", description: "Cacao AA LOT-040", montantTTC: 3478400, echeance: "27/03", paiement: "26/03/2025", statut: "Réglée" },
  { numero: "FAC-2025-004", date: "15/04", client: "Barry Callebaut CI", description: "Cacao AA LOT-041", montantTTC: 3913200, echeance: "30/04", paiement: "29/04/2025", statut: "Réglée" },
  { numero: "FAC-2025-005", date: "13/05", client: "Barry Callebaut CI", description: "Cacao AA LOT-042", montantTTC: 3695800, echeance: "28/05", paiement: "28/05/2025", statut: "Réglée" },
  { numero: "FAC-2025-006", date: "02/06", client: "Cargill CI", description: "Anacarde WW240", montantTTC: 2440000, echeance: "02/07", paiement: "01/07/2025", statut: "Réglée" },
  { numero: "FAC-2025-007", date: "22/06", client: "Barry Callebaut CI", description: "Cacao AA LOT-043/044", montantTTC: 1047768, echeance: "07/07", paiement: "08/07/2025", statut: "Réglée (retard)", retard: "J+1" },
  { numero: "FAC-2025-008", date: "22/06", client: "Barry Callebaut CI", description: "Cacao AA LOT-041-046", montantTTC: 3695800, echeance: "07/07", paiement: "08/07/2025", statut: "Réglée (retard)", retard: "J+1" },
  { numero: "FAC-2025-009", date: "11/07", client: "Barry Callebaut CI", description: "Cacao AA LOT-047", montantTTC: 3695800, echeance: "26/07", paiement: null, statut: "En attente LC" },
];

const FILTRES: Filtre[] = ["Toutes", "En attente", "Réglées", "En retard"];

const TOTAL = factures.reduce((s, f) => s + f.montantTTC, 0);

function statutBadge(f: Facture) {
  if (f.statut === "Réglée")
    return { bg: "#E8F5E9", color: "#2E7D32", label: "Réglée" };
  if (f.statut === "Réglée (retard)")
    return { bg: "#FFF3E0", color: "#E65100", label: `Réglée (${f.retard} retard)` };
  return { bg: "#E3F2FD", color: "#1565C0", label: "En attente LC" };
}

/* ─── SVG BAR CHART CA MENSUEL ──────────────────────────── */
function BarChartCA() {
  // Jan-Jul 2025 en milliers XOF
  const data = [
    { month: "Jan", val: 3478400, en_cours: false },
    { month: "Fév", val: 3695800, en_cours: false },
    { month: "Mar", val: 3478400, en_cours: false },
    { month: "Avr", val: 3913200, en_cours: false },
    { month: "Mai", val: 3695800, en_cours: false },
    { month: "Jun", val: 3487768, en_cours: false },   // FAC-006 + FAC-007 + FAC-008
    { month: "Jul", val: 3695800, en_cours: true },
  ];
  const max = 5000000;
  const W = 580, H = 160, padL = 50, padR = 20, barW = 54;
  const totalW = W - padL - padR;
  const gap = (totalW - barW * data.length) / (data.length - 1);
  const objectif = 4000000;
  const objY = H - (objectif / max) * H;

  return (
    <svg viewBox={`0 0 ${W} ${H + 40}`} className="w-full" style={{ maxHeight: 230 }}>
      {/* Grille */}
      {[0, 25, 50, 75, 100].map((pct) => {
        const y = H - (pct / 100) * H;
        return (
          <g key={pct}>
            <line x1={padL} y1={y} x2={W - padR} y2={y} stroke="#F0F0F0" strokeWidth={1} />
            <text x={padL - 4} y={y + 4} textAnchor="end" fontSize={9} fill="#BDBDBD">
              {((pct / 100) * max / 1000000).toFixed(1)}M
            </text>
          </g>
        );
      })}

      {/* Ligne objectif */}
      <line x1={padL} y1={objY} x2={W - padR} y2={objY} stroke="#E65100" strokeWidth={1.5} strokeDasharray="5 3" />
      <text x={W - padR + 2} y={objY + 4} fontSize={9} fill="#E65100">4M</text>

      {/* Barres */}
      {data.map((d, i) => {
        const x = padL + i * (barW + gap);
        const barH = (d.val / max) * H;
        const y = H - barH;
        return (
          <g key={d.month}>
            <rect
              x={x} y={y} width={barW} height={barH} rx={5}
              fill={d.en_cours ? "none" : "#2E7D32"}
              stroke={d.en_cours ? "#2E7D32" : "none"}
              strokeWidth={d.en_cours ? 2 : 0}
              opacity={d.en_cours ? 1 : 0.85}
            />
            {d.en_cours && (
              <rect x={x} y={y} width={barW} height={barH} rx={5} fill="#2E7D32" opacity={0.3} />
            )}
            <text x={x + barW / 2} y={y - 4} textAnchor="middle" fontSize={9} fill={d.en_cours ? "#E65100" : "#2E7D32"} fontWeight={600}>
              {(d.val / 1000000).toFixed(1)}M
            </text>
            <text x={x + barW / 2} y={H + 16} textAnchor="middle" fontSize={10} fill="#9E9E9E">
              {d.month}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/* ─── SVG DSO LINE CHART ────────────────────────────────── */
function DSOChart() {
  // Jan Fév Mar Avr Mai Jun Jul (2 valeurs Jul pour FAC-007 et FAC-008)
  const dsoData = [15, 15, 15, 15, 15, 29, 16];
  const months = ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun", "Jul"];
  const W = 380, H = 100, padL = 36, padR = 20, padT = 16;
  const pts = dsoData.map((v, i) => ({
    x: padL + (i / (dsoData.length - 1)) * (W - padL - padR),
    y: padT + H - (v / 35) * H,
    v,
  }));
  const seuil = padT + H - (30 / 35) * H;
  const poly = pts.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <svg viewBox={`0 0 ${W} ${H + padT + 28}`} className="w-full" style={{ maxHeight: 160 }}>
      {/* Grille */}
      {[0, 10, 20, 30].map((v) => {
        const y = padT + H - (v / 35) * H;
        return (
          <g key={v}>
            <line x1={padL} y1={y} x2={W - padR} y2={y} stroke="#F0F0F0" strokeWidth={1} />
            <text x={padL - 4} y={y + 4} textAnchor="end" fontSize={9} fill="#BDBDBD">{v}j</text>
          </g>
        );
      })}
      {/* Seuil 30j */}
      <line x1={padL} y1={seuil} x2={W - padR} y2={seuil} stroke="#C62828" strokeWidth={1.5} strokeDasharray="4 3" />
      <text x={W - padR + 2} y={seuil + 4} fontSize={9} fill="#C62828">30j</text>

      {/* Ligne DSO */}
      <polyline points={poly} fill="none" stroke="#2E7D32" strokeWidth={2} />
      {pts.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r={4} fill={p.v >= 30 ? "#C62828" : "#2E7D32"} />
          <text x={p.x} y={p.y - 6} textAnchor="middle" fontSize={9} fill={p.v >= 30 ? "#C62828" : "#2E7D32"} fontWeight={600}>
            {p.v}j
          </text>
          <text x={p.x} y={padT + H + 16} textAnchor="middle" fontSize={9} fill="#9E9E9E">
            {months[i]}
          </text>
        </g>
      ))}
    </svg>
  );
}

/* ─── PAGE ──────────────────────────────────────────────── */
export default function FacturesPage() {
  const [filtre, setFiltre] = useState<Filtre>("Toutes");
  const [search, setSearch] = useState("");

  const filtered = factures.filter((f) => {
    if (search && !f.client.toLowerCase().includes(search.toLowerCase()) && !f.numero.toLowerCase().includes(search.toLowerCase())) return false;
    if (filtre === "En attente") return f.statut === "En attente LC";
    if (filtre === "Réglées") return f.statut === "Réglée" || f.statut === "Réglée (retard)";
    if (filtre === "En retard") return f.statut === "Réglée (retard)";
    return true;
  });

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Topbar title="Factures" breadcrumb={["Commerce", "Factures"]} />

      <main className="flex-1 p-6 space-y-6">

        {/* En-tête */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Factures</h1>
            <p className="text-xs text-gray-500 mt-0.5">Facturation clients et suivi des paiements — SYSCOHADA</p>
          </div>
          <button
            className="flex items-center gap-1.5 text-white rounded-xl text-xs font-medium px-4 py-2"
            style={{ background: "#2E7D32" }}
          >
            <Plus size={14} /> Nouvelle facture
          </button>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {kpis.map((k) => {
            const Icon = k.icon;
            return (
              <div key={k.label} className="rounded-2xl border border-gray-100 bg-white p-5 flex flex-col gap-3 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-500">{k.label}</span>
                  <span className="rounded-xl p-2" style={{ background: k.iconBg, color: k.iconColor }}>
                    <Icon size={16} />
                  </span>
                </div>
                <div className="flex items-end gap-1">
                  <span className="text-2xl font-bold text-gray-900">{k.value}</span>
                  {k.unit && <span className="text-xs text-gray-400 mb-1">{k.unit}</span>}
                </div>
                <span className="text-xs text-gray-400">{k.sub}</span>
              </div>
            );
          })}
        </div>

        {/* Tableau */}
        <div className="rounded-2xl border border-gray-100 bg-white shadow-sm">
          {/* Filtres + recherche */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 px-5 py-4 border-b border-gray-100">
            <div className="flex gap-1.5 flex-wrap">
              {FILTRES.map((f) => (
                <button
                  key={f}
                  onClick={() => setFiltre(f)}
                  className="px-3 py-1 rounded-full text-xs font-medium transition-colors"
                  style={filtre === f
                    ? { background: "#2E7D32", color: "#fff" }
                    : { background: "#F5F5F5", color: "#757575" }}
                >
                  {f}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-1.5 bg-gray-50 sm:ml-auto w-full sm:w-48">
              <Search size={12} className="text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher client…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="text-xs bg-transparent outline-none text-gray-600 flex-1 placeholder-gray-400"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr style={{ background: "#F8FBF8" }}>
                  {["N°", "Date", "Client", "Description", "Montant TTC (XOF)", "Échéance", "Paiement", "Statut", ""].map((c) => (
                    <th key={c} className="text-left text-gray-500 font-semibold px-4 py-3 whitespace-nowrap">{c}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((f) => {
                  const s = statutBadge(f);
                  const isAttente = f.statut === "En attente LC";
                  return (
                    <tr
                      key={f.numero}
                      className="hover:bg-gray-50 transition-colors"
                      style={isAttente ? { background: "#F0F7FF" } : undefined}
                    >
                      <td className="px-4 py-3 font-mono font-semibold whitespace-nowrap" style={{ color: "#2E7D32" }}>
                        {f.numero}
                      </td>
                      <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{f.date}</td>
                      <td className="px-4 py-3 font-medium text-gray-800 whitespace-nowrap">{f.client}</td>
                      <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{f.description}</td>
                      <td className="px-4 py-3 font-semibold text-gray-900 tabular-nums whitespace-nowrap text-right">
                        {f.montantTTC.toLocaleString("fr-FR")}
                      </td>
                      <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{f.echeance}</td>
                      <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                        {f.paiement ?? <span className="text-blue-600 font-medium">—</span>}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium"
                          style={{ background: s.bg, color: s.color }}
                        >
                          {s.label}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <button className="border border-gray-200 text-gray-600 rounded-lg text-xs px-2 py-1 hover:bg-gray-50 flex items-center gap-1">
                          <Eye size={11} /> Voir
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Totaux */}
          <div className="px-5 py-3 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center gap-2 text-xs text-gray-500">
            <span>
              Total cumulé :{" "}
              <strong className="text-gray-900">{TOTAL.toLocaleString("fr-FR")} XOF</strong>
            </span>
            <span className="sm:ml-auto">
              8/9 réglées{" "}
              <span className="text-green-700 font-semibold">✅</span>
            </span>
          </div>
        </div>

        {/* Analyse financière */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">

          {/* Bar chart CA */}
          <div className="lg:col-span-3 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-900 mb-1">CA mensuel facturé 2025</h3>
            <p className="text-xs text-gray-400 mb-4">
              Barres vertes = réglé — Barre hachurée = en cours — Ligne orange : objectif 4,0 M XOF/mois
            </p>
            <BarChartCA />
          </div>

          {/* DSO */}
          <div className="lg:col-span-2 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-900 mb-1">DSO — Délai moyen de règlement</h3>
            <p className="text-xs text-gray-400 mb-3">Ligne rouge : seuil alerte 30 jours</p>
            <DSOChart />
            <div className="mt-3 rounded-xl bg-green-50 border border-green-100 px-3 py-2 text-xs text-green-800">
              Délai moyen : <strong>13 jours</strong>. Conforme aux conditions contractuelles (J+15).
            </div>
          </div>
        </div>

        {/* Facture en attente */}
        <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5 shadow-sm">
          <div className="flex items-start gap-3">
            <span className="text-xl mt-0.5 flex-shrink-0">🔵</span>
            <div className="flex-1">
              <p className="text-sm font-bold text-blue-900">
                FAC-2025-009 — Barry Callebaut CI — 3 695 800 XOF — Échéance 26/07/2025
              </p>
              <div className="mt-2 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-blue-700">
                <div className="rounded-lg bg-white/60 px-3 py-2 border border-blue-100">
                  <span className="font-semibold text-blue-900 block mb-0.5">Lettre de crédit</span>
                  LC irrévocable SGBCI — LC-SGBCI-2025-BC-009
                </div>
                <div className="rounded-lg bg-white/60 px-3 py-2 border border-blue-100">
                  <span className="font-semibold text-blue-900 block mb-0.5">Documents remis</span>
                  Remis à la banque le 11/07/2025
                </div>
                <div className="rounded-lg bg-white/60 px-3 py-2 border border-blue-100">
                  <span className="font-semibold text-blue-900 block mb-0.5">Règlement attendu</span>
                  26/07/2025 (J+15 contractuel)
                </div>
              </div>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
