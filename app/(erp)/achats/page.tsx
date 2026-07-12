"use client";

import { useState } from "react";
import Topbar from "../../components/Topbar";
import { Search, Plus, ShoppingCart, Package, CheckCircle2, Clock } from "lucide-react";

/* ─── DONNÉES ───────────────────────────────────────────────── */

const COMMANDES = [
  { num: "ACH-2025-001", date: "04/01", fournisseur: "KCl Distribution", produit: "KCl 60% 15 sacs",           montant: 720000,  livraison: "07/01", delai: "3j", statut: "Livrée" },
  { num: "ACH-2025-002", date: "15/01", fournisseur: "SCPA Afrique",     produit: "Super Cupravit 8 kg",        montant: 79296,   livraison: "19/01", delai: "4j", statut: "Livrée" },
  { num: "ACH-2025-003", date: "03/02", fournisseur: "Tractafric",       produit: "Filtre huile JD5055E ×3",   montant: 75000,   livraison: "05/02", delai: "2j", statut: "Livrée" },
  { num: "ACH-2025-004", date: "05/02", fournisseur: "SCPA Afrique",     produit: "Confidor 350 SC 4L",         montant: 141600,  livraison: "09/02", delai: "4j", statut: "Livrée" },
  { num: "ACH-2025-005", date: "20/03", fournisseur: "Petro Ivoire",     produit: "Gasoil 200L (1 fût)",       montant: 147000,  livraison: "21/03", delai: "1j", statut: "Livrée" },
  { num: "ACH-2025-006", date: "28/03", fournisseur: "SCPA Afrique",     produit: "Super Cupravit 8 kg",        montant: 79296,   livraison: "01/04", delai: "4j", statut: "Livrée" },
  { num: "ACH-2025-007", date: "10/04", fournisseur: "KCl Distribution", produit: "KCl 60% 10 sacs",           montant: 480000,  livraison: "13/04", delai: "3j", statut: "Livrée" },
  { num: "ACH-2025-008", date: "25/04", fournisseur: "Tractafric",       produit: "Huile moteur 15W40 ×6",     montant: 54000,   livraison: "27/04", delai: "2j", statut: "Livrée" },
  { num: "ACH-2025-017", date: "02/06", fournisseur: "SCPA Afrique",     produit: "Ridomil Gold 4 kg",          montant: 89208,   livraison: "05/06", delai: "3j", statut: "Livrée" },
  { num: "ACH-2025-020", date: "28/06", fournisseur: "KCl Distribution", produit: "KCl 60% 6 sacs",            montant: 288000,  livraison: "01/07", delai: "3j", statut: "Livrée" },
  { num: "ACH-2025-021", date: "01/07", fournisseur: "Petro Ivoire",     produit: "Gasoil 200L",               montant: 147000,  livraison: "02/07", delai: "1j", statut: "Livrée" },
  { num: "ACH-2025-022", date: "09/06", fournisseur: "SCPA Afrique",     produit: "Super Cupravit 4 kg",        montant: 39648,   livraison: "14/06", delai: "5j", statut: "Livrée" },
];

/* donut */
const DONUT_DATA = [
  { label: "KCl Distribution", pct: 51.5, montant: "1 488 000",  color: "#1B5E20" },
  { label: "SCPA Afrique CI",  pct: 29.5, montant: "349 752",    color: "#4CAF50" },
  { label: "Petro Ivoire",     pct: 12.4, montant: "294 000",    color: "#E65100" },
  { label: "Tractafric",       pct:  6.6, montant: "129 000",    color: "#9E9E9E" },
];

/* bar chart mensuel */
const BAR_DATA = [
  { mois: "Jan", val: 720000 },
  { mois: "Fév", val: 220896 },
  { mois: "Mar", val: 147000 },
  { mois: "Avr", val: 612504 },
  { mois: "Mai", val: 0 },
  { mois: "Jun", val: 417152 },
  { mois: "Jul", val: 147000 },
];

const FILTRES = ["Toutes", "En attente", "Livrées", "En cours"] as const;

/* ─── SVG DONUT ─────────────────────────────────────────────── */
function DonutChart() {
  const R = 90; const CX = 140; const CY = 140;
  let offset = -90;
  const arcs = DONUT_DATA.map((d) => {
    const deg = (d.pct / 100) * 360;
    const startRad = (offset * Math.PI) / 180;
    const endRad = ((offset + deg) * Math.PI) / 180;
    const x1 = CX + R * Math.cos(startRad);
    const y1 = CY + R * Math.sin(startRad);
    const x2 = CX + R * Math.cos(endRad);
    const y2 = CY + R * Math.sin(endRad);
    const large = deg > 180 ? 1 : 0;
    const path = `M${CX},${CY} L${x1},${y1} A${R},${R} 0 ${large},1 ${x2},${y2} Z`;
    offset += deg;
    return { ...d, path };
  });
  return (
    <svg width={280} height={280} viewBox="0 0 280 280" className="block">
      {arcs.map((a) => (
        <path key={a.label} d={a.path} fill={a.color} stroke="white" strokeWidth={2} />
      ))}
      <circle cx={CX} cy={CY} r={52} fill="white" />
      <text x={CX} y={CY - 6} textAnchor="middle" fontSize={11} fill="#374151" fontWeight="600">Total</text>
      <text x={CX} y={CY + 9} textAnchor="middle" fontSize={9} fill="#6B7280">1 182 000</text>
      <text x={CX} y={CY + 21} textAnchor="middle" fontSize={8} fill="#6B7280">XOF</text>
    </svg>
  );
}

/* ─── SVG BAR CHART ─────────────────────────────────────────── */
function BarChart() {
  const W = 640; const H = 160;
  const BAR_H = 100; const BAR_W = 50; const GAP = 38; const LEFT = 55;
  const MAX = 720000;
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} className="block">
      {[0, 0.25, 0.5, 0.75, 1].map((t) => {
        const y = 15 + (1 - t) * BAR_H;
        return (
          <g key={t}>
            <line x1={LEFT} y1={y} x2={W - 10} y2={y} stroke="#E5E7EB" strokeWidth={1} />
            <text x={LEFT - 4} y={y + 4} textAnchor="end" fontSize={8} fill="#9CA3AF">
              {t === 0 ? "0" : `${Math.round((t * MAX) / 1000)}k`}
            </text>
          </g>
        );
      })}
      {BAR_DATA.map((d, i) => {
        const bh = d.val === 0 ? 2 : (d.val / MAX) * BAR_H;
        const x = LEFT + 10 + i * (BAR_W + GAP);
        const y = 15 + BAR_H - bh;
        return (
          <g key={d.mois}>
            <rect x={x} y={y} width={BAR_W} height={bh} rx={4} fill={d.val > 0 ? "#2E7D32" : "#E5E7EB"} />
            {d.val > 0 && (
              <text x={x + BAR_W / 2} y={y - 3} textAnchor="middle" fontSize={7} fill="#1B5E20" fontWeight="600">
                {(d.val / 1000).toFixed(0)}k
              </text>
            )}
            <text x={x + BAR_W / 2} y={H - 4} textAnchor="middle" fontSize={9} fill="#6B7280">{d.mois}</text>
          </g>
        );
      })}
    </svg>
  );
}

/* ─── PAGE ───────────────────────────────────────────────────── */
export default function AchatsPage() {
  const [filtre, setFiltre] = useState<string>("Toutes");
  const [search, setSearch] = useState("");

  const lignes = COMMANDES.filter((c) => {
    const matchFiltre =
      filtre === "Toutes" ||
      (filtre === "Livrées" && c.statut === "Livrée") ||
      (filtre === "En attente" && c.statut === "En attente") ||
      (filtre === "En cours" && c.statut === "En cours");
    const matchSearch = search === "" || c.fournisseur.toLowerCase().includes(search.toLowerCase());
    return matchFiltre && matchSearch;
  });

  const total = COMMANDES.reduce((s, c) => s + c.montant, 0);

  return (
    <div className="min-h-screen bg-[#F4F6F4]">
      <Topbar breadcrumbs={["Logistique", "Achats"]} />

      <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">

        {/* ── EN-TÊTE ─────────────────────────────────────────── */}
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Achats</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              Bons de commande — Intrants, matériels, consommables — EXP-001
            </p>
          </div>
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#2E7D32] text-white text-xs font-medium hover:bg-[#1B5E20] transition-colors">
            <Plus size={14} /> Nouvelle commande
          </button>
        </div>

        {/* ── KPI ─────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Commandes 2025",   val: "12 commandes",                Icon: ShoppingCart },
            { label: "Montant total",     val: `${(total / 1000).toFixed(0)} k XOF`, Icon: Package },
            { label: "Livrées",           val: "12 livrées",                 Icon: CheckCircle2 },
            { label: "Délai moyen",       val: "4,2 jours",                  Icon: Clock },
          ].map((k) => (
            <div key={k.label} className="rounded-2xl border border-gray-100 bg-white p-4 flex items-center gap-3 shadow-sm">
              <k.Icon size={20} className="text-[#2E7D32] shrink-0" />
              <div>
                <p className="text-xs text-gray-500">{k.label}</p>
                <p className="text-base font-bold text-gray-900">{k.val}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── FILTRES + RECHERCHE ──────────────────────────────── */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex gap-1">
            {FILTRES.map((f) => (
              <button
                key={f}
                onClick={() => setFiltre(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  filtre === f
                    ? "bg-[#2E7D32] text-white"
                    : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="relative ml-auto">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Recherche fournisseur…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 pr-4 py-1.5 rounded-lg border border-gray-200 bg-white text-xs text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#2E7D32] w-52"
            />
          </div>
        </div>

        {/* ── TABLEAU COMMANDES ────────────────────────────────── */}
        <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#F8FBF8] text-left">
                  {["N°","Date","Fournisseur","Produit","Montant TTC","Livraison","Délai","Statut"].map((h) => (
                    <th key={h} className="px-3 py-2.5 text-xs text-gray-500 font-medium whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {lignes.map((c) => (
                  <tr key={c.num} className="hover:bg-gray-50">
                    <td className="px-3 py-2 font-mono text-xs text-[#2E7D32] font-medium whitespace-nowrap">{c.num}</td>
                    <td className="px-3 py-2 text-gray-600 whitespace-nowrap">{c.date}</td>
                    <td className="px-3 py-2 font-medium text-gray-900 whitespace-nowrap">{c.fournisseur}</td>
                    <td className="px-3 py-2 text-gray-700">{c.produit}</td>
                    <td className="px-3 py-2 font-medium text-gray-900 whitespace-nowrap">
                      {c.montant.toLocaleString("fr-FR")} XOF
                    </td>
                    <td className="px-3 py-2 text-gray-600 whitespace-nowrap">{c.livraison}</td>
                    <td className="px-3 py-2">
                      <span className="inline-flex items-center gap-1 text-xs rounded-full px-2 py-0.5 bg-green-50 text-green-700">
                        <CheckCircle2 size={11} /> {c.delai}
                      </span>
                    </td>
                    <td className="px-3 py-2">
                      <span className="inline-flex items-center gap-1 text-xs rounded-full px-2 py-0.5 bg-green-100 text-green-800 font-medium">
                        ✅ {c.statut}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {lignes.length === 0 && (
            <p className="py-8 text-center text-sm text-gray-400">Aucune commande trouvée.</p>
          )}
        </div>

        {/* ── GRAPHIQUES ──────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

          {/* Donut */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <h2 className="text-sm font-semibold text-gray-900 mb-3">Achats par fournisseur 2025</h2>
            <div className="flex justify-center">
              <DonutChart />
            </div>
            <div className="mt-3 space-y-1.5">
              {DONUT_DATA.map((d) => (
                <div key={d.label} className="flex items-center gap-2 text-xs">
                  <span className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ background: d.color }} />
                  <span className="text-gray-700 flex-1">{d.label}</span>
                  <span className="font-medium text-gray-900">{d.pct}%</span>
                  <span className="text-gray-500">{d.montant} XOF</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bar chart */}
          <div className="lg:col-span-2 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <h2 className="text-sm font-semibold text-gray-900 mb-4">Montant achats par mois 2025</h2>
            <div className="overflow-x-auto">
              <BarChart />
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
