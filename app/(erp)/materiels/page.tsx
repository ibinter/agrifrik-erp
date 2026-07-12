"use client";

import { useState } from "react";
import Topbar from "../../components/Topbar";

type Filtre = "Tous" | "Tracteurs" | "Véhicules" | "Équipements" | "Outils";
const FILTRES: Filtre[] = ["Tous", "Tracteurs", "Véhicules", "Équipements", "Outils"];

type Materiel = {
  code: string;
  designation: string;
  type: Filtre;
  marque: string;
  service: string;
  valeurNette: string;
  statut: "ok" | "maintenance";
  statutLabel: string;
};

const MATERIELS: Materiel[] = [
  { code: "MAT-2021-001", designation: "Toyota HiLux double cab", type: "Véhicules", marque: "Toyota HiLux 2021", service: "Jan 2021", valeurNette: "4 200 000 XOF", statut: "ok", statutLabel: "Opérationnel" },
  { code: "MAT-2021-004", designation: "Tracteur agricole", type: "Tracteurs", marque: "John Deere 5055E", service: "Mar 2021", valeurNette: "12 100 000 XOF", statut: "ok", statutLabel: "Opérationnel" },
  { code: "MAT-2022-002", designation: "Groupe électrogène", type: "Équipements", marque: "Honda 6,5 kVA", service: "Fév 2022", valeurNette: "420 000 XOF", statut: "ok", statutLabel: "Opérationnel" },
  { code: "MAT-2022-003", designation: "Pulvérisateur à dos", type: "Outils", marque: "Solo 425 16L", service: "Avr 2022", valeurNette: "45 000 XOF", statut: "ok", statutLabel: "Opérationnel" },
  { code: "MAT-2023-001", designation: "Pompe électrique PSC", type: "Équipements", marque: "Grundfos CM5-6", service: "Mar 2023", valeurNette: "285 000 XOF", statut: "ok", statutLabel: "Opérationnel" },
  { code: "MAT-2023-002", designation: "Remorque agricole", type: "Véhicules", marque: "Remorque 3t acier", service: "Jun 2023", valeurNette: "680 000 XOF", statut: "ok", statutLabel: "Opérationnel" },
  { code: "MAT-2024-001", designation: "Balance électronique", type: "Outils", marque: "Kern IFB 60K-3M", service: "Jan 2024", valeurNette: "185 000 XOF", statut: "ok", statutLabel: "Opérationnel" },
  { code: "MAT-2024-002", designation: "Séchoir solaire à claies", type: "Équipements", marque: "Claies 60m² CNRA", service: "Juin 2024", valeurNette: "650 000 XOF", statut: "maintenance", statutLabel: "Maintenance (toile à réparer)" },
];

const MAINTENANCE = [
  { materiel: "JD5055E", type: "Vidange 250h + filtre", date: "15/04/2025", cout: "142 000 XOF", prochain: "Avr 2026 (250h)" },
  { materiel: "Toyota HiLux", type: "Vidange + 4 pneus", date: "20/02/2025", cout: "215 000 XOF", prochain: "Fév 2026" },
  { materiel: "Pompe PSC", type: "Remplacement joint", date: "10/05/2025", cout: "28 000 XOF", prochain: "Mai 2026" },
  { materiel: "Claies séchage", type: "Réparation toile (en cours)", date: "11/07/2025", cout: "~35 000 XOF", prochain: "—" },
];

// Donut SVG helpers
const DONUT_DATA = [
  { label: "Tracteurs", valeur: "12,1M", pct: 65.0, color: "#1B5E20" },
  { label: "Véhicules", valeur: "4,88M", pct: 26.2, color: "#4CAF50" },
  { label: "Équipements", valeur: "1,36M", pct: 7.3, color: "#E65100" },
  { label: "Outils", valeur: "0,23M", pct: 1.5, color: "#9E9E9E" },
];

function describeArc(cx: number, cy: number, r: number, startAngle: number, endAngle: number) {
  const toRad = (deg: number) => (deg - 90) * (Math.PI / 180);
  const x1 = cx + r * Math.cos(toRad(startAngle));
  const y1 = cy + r * Math.sin(toRad(startAngle));
  const x2 = cx + r * Math.cos(toRad(endAngle));
  const y2 = cy + r * Math.sin(toRad(endAngle));
  const largeArc = endAngle - startAngle > 180 ? 1 : 0;
  return `M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}`;
}

function DonutChart() {
  let cumul = 0;
  const cx = 140, cy = 140, R = 100, r = 60;
  return (
    <svg viewBox="0 0 280 280" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[280px] mx-auto">
      {DONUT_DATA.map((seg) => {
        const start = cumul * 3.6;
        const end = (cumul + seg.pct) * 3.6;
        cumul += seg.pct;
        // Filled arc between outer R and inner r
        const toRad = (deg: number) => (deg - 90) * (Math.PI / 180);
        const x1 = cx + R * Math.cos(toRad(start));
        const y1 = cy + R * Math.sin(toRad(start));
        const x2 = cx + R * Math.cos(toRad(end));
        const y2 = cy + R * Math.sin(toRad(end));
        const ix1 = cx + r * Math.cos(toRad(end));
        const iy1 = cy + r * Math.sin(toRad(end));
        const ix2 = cx + r * Math.cos(toRad(start));
        const iy2 = cy + r * Math.sin(toRad(start));
        const large = end - start > 180 ? 1 : 0;
        const d = `M ${x1} ${y1} A ${R} ${R} 0 ${large} 1 ${x2} ${y2} L ${ix1} ${iy1} A ${r} ${r} 0 ${large} 0 ${ix2} ${iy2} Z`;
        return <path key={seg.label} d={d} fill={seg.color} stroke="white" strokeWidth="2" />;
      })}
      <text x={cx} y={cy - 10} textAnchor="middle" fill="#1B5E20" fontSize="13" fontWeight="bold">18,6M</text>
      <text x={cx} y={cy + 8} textAnchor="middle" fill="#666" fontSize="9">XOF valeur nette</text>
    </svg>
  );
}

export default function MaterielsPage() {
  const [filtre, setFiltre] = useState<Filtre>("Tous");
  const [recherche, setRecherche] = useState("");

  const filtered = MATERIELS.filter((m) => {
    const matchType = filtre === "Tous" || m.type === filtre;
    const q = recherche.toLowerCase();
    const matchQ = !q || m.code.toLowerCase().includes(q) || m.designation.toLowerCase().includes(q) || m.marque.toLowerCase().includes(q);
    return matchType && matchQ;
  });

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-gray-50">
      <Topbar breadcrumb={["Logistique", "Matériels"]} />

      <div className="p-6 space-y-6">

        {/* En-tête */}
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Matériels</h1>
            <p className="text-sm text-gray-500 mt-1">Parc machines, équipements et véhicules — EXP-001</p>
          </div>
          <div className="flex gap-3 flex-wrap">
            <button className="bg-[#2E7D32] text-white rounded-xl text-xs font-medium px-4 py-2.5 hover:bg-[#1B5E20] transition-colors">
              + Enregistrer un matériel
            </button>
            <button className="border border-gray-200 bg-white text-gray-700 rounded-xl text-xs font-medium px-4 py-2.5 hover:bg-gray-50 transition-colors">
              Export inventaire
            </button>
          </div>
        </div>

        {/* 4 KPI */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Matériels", value: "8", sub: "parc EXP-001", color: "#1B5E20" },
            { label: "Opérationnels", value: "7", sub: "en service actif", color: "#2E7D32" },
            { label: "En maintenance", value: "1", sub: "claies séchage", color: "#E65100" },
            { label: "Valeur nette", value: "18,6M XOF", sub: "comptable 2025", color: "#1B5E20" },
          ].map((kpi) => (
            <div key={kpi.label} className="rounded-2xl border border-gray-100 bg-white p-5">
              <p className="text-xs text-gray-500 mb-1">{kpi.label}</p>
              <p className="text-xl font-bold" style={{ color: kpi.color }}>{kpi.value}</p>
              <p className="text-xs text-gray-400 mt-1">{kpi.sub}</p>
            </div>
          ))}
        </div>

        {/* Filtres + recherche */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex gap-1 flex-wrap">
            {FILTRES.map((f) => (
              <button
                key={f}
                onClick={() => setFiltre(f)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                  filtre === f
                    ? "text-white border-transparent bg-[#2E7D32]"
                    : "border-gray-200 text-gray-600 bg-white hover:bg-gray-50"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <input
            type="text"
            placeholder="Rechercher…"
            value={recherche}
            onChange={(e) => setRecherche(e.target.value)}
            className="ml-auto border border-gray-200 rounded-xl text-xs px-3 py-2 bg-white outline-none focus:border-[#2E7D32] w-48"
          />
        </div>

        {/* Tableau des matériels */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[820px]">
              <thead>
                <tr className="bg-[#F8FBF8]">
                  {["Code", "Désignation", "Type", "Marque / Modèle", "Mise en service", "Valeur nette", "Statut"].map((h, i) => (
                    <th
                      key={h}
                      className={`text-left px-4 py-3 text-gray-600 font-medium text-xs uppercase tracking-wide ${i === 0 ? "rounded-tl-xl" : ""} ${i === 6 ? "rounded-tr-xl" : ""}`}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((m) => (
                  <tr key={m.code} className="hover:bg-gray-50/60 transition-colors">
                    <td className="px-4 py-3 font-mono text-xs font-semibold text-gray-700">{m.code}</td>
                    <td className="px-4 py-3 font-medium text-gray-800">{m.designation}</td>
                    <td className="px-4 py-3">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 font-medium">{m.type}</span>
                    </td>
                    <td className="px-4 py-3 text-gray-700 text-xs">{m.marque}</td>
                    <td className="px-4 py-3 text-gray-500 text-xs">{m.service}</td>
                    <td className="px-4 py-3 font-semibold text-[#1B5E20] text-sm">{m.valeurNette}</td>
                    <td className="px-4 py-3">
                      {m.statut === "ok" ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          ✅ {m.statutLabel}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-700">
                          🔧 {m.statutLabel}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-gray-400 text-sm">
                      Aucun matériel trouvé
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Donut + Maintenance */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Donut SVG */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 flex flex-col">
            <h2 className="text-base font-semibold text-gray-800 mb-4">Valeur nette comptable par type</h2>
            <div className="flex-1 flex items-center justify-center">
              <DonutChart />
            </div>
            <div className="mt-4 space-y-2">
              {DONUT_DATA.map((seg) => (
                <div key={seg.label} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: seg.color }} />
                    <span className="text-gray-700">{seg.label}</span>
                  </div>
                  <span className="font-semibold text-gray-800">{seg.valeur} XOF ({seg.pct}%)</span>
                </div>
              ))}
            </div>
          </div>

          {/* Maintenance 2025 YTD */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 lg:col-span-2">
            <h2 className="text-base font-semibold text-gray-800 mb-4">Maintenance 2025 YTD</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[540px]">
                <thead>
                  <tr className="bg-[#F8FBF8]">
                    <th className="text-left px-4 py-3 text-gray-600 font-medium rounded-tl-xl">Matériel</th>
                    <th className="text-left px-4 py-3 text-gray-600 font-medium">Type maintenance</th>
                    <th className="text-left px-4 py-3 text-gray-600 font-medium">Date</th>
                    <th className="text-right px-4 py-3 text-gray-600 font-medium">Coût</th>
                    <th className="text-left px-4 py-3 text-gray-600 font-medium rounded-tr-xl">Prochain entretien</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {MAINTENANCE.map((m) => (
                    <tr key={m.materiel + m.date} className="hover:bg-gray-50/60">
                      <td className="px-4 py-3 font-medium text-gray-800">{m.materiel}</td>
                      <td className="px-4 py-3 text-gray-700 text-xs">{m.type}</td>
                      <td className="px-4 py-3 text-gray-500 text-xs">{m.date}</td>
                      <td className="px-4 py-3 text-gray-700 text-right font-medium">{m.cout}</td>
                      <td className="px-4 py-3 text-gray-500 text-xs">{m.prochain}</td>
                    </tr>
                  ))}
                  <tr className="bg-[#F8FBF8] font-bold">
                    <td className="px-4 py-3 text-gray-800 rounded-bl-xl" colSpan={3}>TOTAL 2025</td>
                    <td className="px-4 py-3 text-[#1B5E20] text-right">420 000 XOF</td>
                    <td className="px-4 py-3 text-gray-500 text-xs font-normal rounded-br-xl">Budget annuel : 600 000 XOF</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                <span>Budget consommé</span>
                <span className="font-semibold text-[#2E7D32]">420 000 / 600 000 XOF — 70%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div className="h-2 rounded-full bg-[#2E7D32]" style={{ width: "70%" }} />
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
