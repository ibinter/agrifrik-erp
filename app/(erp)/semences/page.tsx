"use client";

import { useState } from "react";
import { Package, Sprout, Droplets, CalendarDays } from "lucide-react";
import Topbar from "../../components/Topbar";

// ─── Types ────────────────────────────────────────────────────────────────────

type Onglet = "stock" | "varietes" | "pepiniere" | "historique";

// ─── Données stock ────────────────────────────────────────────────────────────

const STOCK = [
  {
    variete: "Cacao Amelonado T800",
    type: "Semence",
    origine: "CNRA Abidjan",
    stock: 48,
    unite: "kg",
    reception: "15/03/2025",
    dlc: "Mar 2026",
    germination: "96%",
    condition: "Frigo 15°C",
    statut: "optimal" as const,
  },
  {
    variete: "Cacao Hybride Mercedes",
    type: "Semence",
    origine: "CNRA",
    stock: 36,
    unite: "kg",
    reception: "15/03/2025",
    dlc: "Mar 2026",
    germination: "94%",
    condition: "Frigo 15°C",
    statut: "optimal" as const,
  },
  {
    variete: "Anacarde Jumbo 45",
    type: "Semence",
    origine: "FIRCA",
    stock: 62,
    unite: "kg",
    reception: "20/01/2025",
    dlc: "Jan 2026",
    germination: "92%",
    condition: "Sec 20°C",
    statut: "bon" as const,
  },
  {
    variete: "Maïs OSÉILLE CIV",
    type: "Semence",
    origine: "ANADER",
    stock: 84,
    unite: "kg",
    reception: "01/04/2025",
    dlc: "Avr 2026",
    germination: "98%",
    condition: "Sec 20°C",
    statut: "optimal" as const,
  },
  {
    variete: "Riz Bouaké 189",
    type: "Semence",
    origine: "CNRA",
    stock: 28,
    unite: "kg",
    reception: "01/04/2025",
    dlc: "Avr 2026",
    germination: "93%",
    condition: "Sec 20°C",
    statut: "bon" as const,
  },
  {
    variete: "Plantain CRBP 39 (rejets)",
    type: "Rejet",
    origine: "CNRA",
    stock: 12,
    unite: "unités",
    reception: "05/07/2025",
    dlc: "15/07 (planter)",
    germination: "—",
    condition: "Fraîcheur 48h",
    statut: "urgent" as const,
  },
  {
    variete: "Bananiers Cavendish (rejets)",
    type: "Rejet",
    origine: "Pépinière interne",
    stock: 8,
    unite: "unités",
    reception: "05/07/2025",
    dlc: "12/07 (planter)",
    germination: "—",
    condition: "Fraîcheur 24h",
    statut: "critique" as const,
  },
  {
    variete: "Soja variété IAR",
    type: "Semence",
    origine: "FIRCA",
    stock: 6,
    unite: "kg",
    reception: "01/05/2025",
    dlc: "Avr 2026",
    germination: "88%",
    condition: "Sec",
    statut: "faible" as const,
  },
];

const STATUT_STOCK = {
  optimal:  { label: "✅ Optimal",           cls: "bg-green-100 text-green-800" },
  bon:      { label: "✅ Bon",               cls: "bg-green-100 text-green-700" },
  urgent:   { label: "⚠️ Urgent",           cls: "bg-amber-100 text-amber-800" },
  critique: { label: "🔴 À planter today",  cls: "bg-red-100 text-red-800" },
  faible:   { label: "🟡 Stock faible",     cls: "bg-yellow-100 text-yellow-800" },
};

// ─── Données pépinière ────────────────────────────────────────────────────────

const PEPINIERE_LOTS = [
  {
    lot: "PEP-001",
    variete: "Cacao Amelonado T800",
    plants: 480,
    semis: "15/04/2025",
    stade: "Stade 2 feuilles vraies",
    repiquage: "15/09/2025",
    taux: "96% estimé",
    eau: 2.4,
  },
  {
    lot: "PEP-002",
    variete: "Cacao Hybride Mercedes",
    plants: 320,
    semis: "01/05/2025",
    stade: "Stade cotylédon",
    repiquage: "01/10/2025",
    taux: "94% estimé",
    eau: 1.8,
  },
  {
    lot: "PEP-003",
    variete: "Anacarde Jumbo 45",
    plants: 180,
    semis: "01/06/2025",
    stade: "Germination",
    repiquage: "01/11/2025",
    taux: "92% estimé",
    eau: 1.2,
  },
];

// ─── Données historique ───────────────────────────────────────────────────────

const HISTORIQUE = [
  {
    campagne: "Fév 2023",
    variete: "Cacao T800",
    surface: "2,4 ha",
    plants: "1 440 plants",
    taux: "94%",
    recolte: "Oct 2026",
    statut: "🌱 En croissance (3 ans)",
    statutCls: "bg-green-100 text-green-800",
  },
  {
    campagne: "Fév 2022",
    variete: "Cacao Mercedes",
    surface: "1,8 ha",
    plants: "1 080 plants",
    taux: "92%",
    recolte: "Oct 2025",
    statut: "🌳 Premières cabosses attendues",
    statutCls: "bg-teal-100 text-teal-800",
  },
  {
    campagne: "Jan 2021",
    variete: "Anacarde Jumbo 45",
    surface: "2,4 ha",
    plants: "720 plants",
    taux: "89%",
    recolte: "Avr 2024 ✅",
    statut: "🌾 Production en cours (PAR-D2)",
    statutCls: "bg-amber-100 text-amber-800",
  },
  {
    campagne: "Jan 2020",
    variete: "Cacao T800",
    surface: "3,2 ha",
    plants: "1 920 plants",
    taux: "96%",
    recolte: "Oct 2023 ✅",
    statut: "🌾 Pleine production (PAR-B1/B2)",
    statutCls: "bg-amber-100 text-amber-800",
  },
  {
    campagne: "Jan 2019",
    variete: "Cacao T800",
    surface: "6,2 ha",
    plants: "3 720 plants",
    taux: "97%",
    recolte: "Oct 2022 ✅",
    statut: "🌾 Pleine production (PAR-A1)",
    statutCls: "bg-amber-100 text-amber-800",
  },
];

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function SemencesPage() {
  const [onglet, setOnglet] = useState<Onglet>("stock");

  const totalIrrigation =
    PEPINIERE_LOTS.reduce((acc, l) => acc + l.eau * l.plants, 0);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Topbar
        title="Semences & Matériel Végétal"
        breadcrumb={["Production", "Semences"]}
      />

      <div className="flex-1 p-6 space-y-6">

        {/* ── KPIs ───────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: <Package size={20} className="text-green-700" />, label: "Stock total", value: "284 kg", sub: "toutes variétés", color: "bg-green-100" },
            { icon: <Sprout size={20} className="text-blue-700" />, label: "Variétés", value: "8", sub: "en stock actif", color: "bg-blue-100" },
            { icon: <Droplets size={20} className="text-teal-700" />, label: "Taux germination moyen", value: "94,2%", sub: "semences certifiées", color: "bg-teal-100" },
            { icon: <CalendarDays size={20} className="text-amber-700" />, label: "Prochaine plantation", value: "15/09/2025", sub: "Cacao T800 — PEP-001", color: "bg-amber-100" },
          ].map((kpi) => (
            <div key={kpi.label} className="bg-white rounded-2xl border border-gray-100 p-5 flex items-start gap-4 shadow-sm">
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${kpi.color}`}>
                {kpi.icon}
              </div>
              <div>
                <div className="text-xl font-bold text-gray-900 leading-tight">{kpi.value}</div>
                <div className="text-sm text-gray-500 mt-0.5">{kpi.label}</div>
                {kpi.sub && <div className="text-xs text-gray-400 mt-0.5">{kpi.sub}</div>}
              </div>
            </div>
          ))}
        </div>

        {/* ── Onglets ────────────────────────────────────────────────────── */}
        <div className="flex gap-1 bg-white border border-gray-200 rounded-xl p-1 w-fit">
          {(
            [
              { key: "stock", label: "Stock semences" },
              { key: "varietes", label: "Variétés" },
              { key: "pepiniere", label: "Pépinière" },
              { key: "historique", label: "Historique plantations" },
            ] as { key: Onglet; label: string }[]
          ).map((tab) => (
            <button
              key={tab.key}
              onClick={() => setOnglet(tab.key)}
              className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors ${
                onglet === tab.key
                  ? "bg-[#2E7D32] text-white"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── Onglet Stock semences ──────────────────────────────────────── */}
        {onglet === "stock" && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-gray-900">Stock semences & matériel végétal</h2>
                <p className="text-xs text-gray-400 mt-0.5">8 références — juillet 2025</p>
              </div>
              <span className="text-xs font-semibold text-[#2E7D32] bg-green-50 border border-green-200 px-3 py-1.5 rounded-xl">
                Total : 284 kg / unités
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[1000px]">
                <thead>
                  <tr className="bg-[#F8FBF8] border-b border-gray-100">
                    {["Variété", "Type", "Origine", "Stock", "Réception", "DLC", "Germination", "Condition", "Statut"].map((h) => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-600">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {STOCK.map((row) => {
                    const s = STATUT_STOCK[row.statut];
                    return (
                      <tr key={row.variete} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-4 py-3 font-medium text-gray-800">{row.variete}</td>
                        <td className="px-4 py-3">
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                            {row.type}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-500 text-xs">{row.origine}</td>
                        <td className="px-4 py-3 font-bold text-gray-800">
                          {row.stock} <span className="text-xs font-normal text-gray-400">{row.unite}</span>
                        </td>
                        <td className="px-4 py-3 text-xs text-gray-500">{row.reception}</td>
                        <td className="px-4 py-3 text-xs text-gray-600 font-medium">{row.dlc}</td>
                        <td className="px-4 py-3 text-xs font-semibold text-gray-700">{row.germination}</td>
                        <td className="px-4 py-3 text-xs text-gray-500">{row.condition}</td>
                        <td className="px-4 py-3">
                          <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${s.cls}`}>
                            {s.label}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── Onglet Variétés (placeholder) ─────────────────────────────── */}
        {onglet === "varietes" && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center text-gray-400 text-sm">
            Catalogue des variétés — à venir
          </div>
        )}

        {/* ── Onglet Pépinière ───────────────────────────────────────────── */}
        {onglet === "pepiniere" && (
          <div className="space-y-5">
            {/* Lots */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="font-semibold text-gray-900">Lots en pépinière</h2>
                <p className="text-xs text-gray-400 mt-0.5">3 lots actifs — {PEPINIERE_LOTS.reduce((a, l) => a + l.plants, 0).toLocaleString()} plants au total</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#F8FBF8] border-b border-gray-100">
                      {["Lot", "Variété", "Nb plants", "Date semis", "Stade", "Repiquage prévu", "Taux reprise"].map((h) => (
                        <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-600">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {PEPINIERE_LOTS.map((lot) => (
                      <tr key={lot.lot} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-4 py-3 font-bold text-[#2E7D32]">{lot.lot}</td>
                        <td className="px-4 py-3 font-medium text-gray-800">{lot.variete}</td>
                        <td className="px-4 py-3 font-bold text-gray-900">{lot.plants.toLocaleString()}</td>
                        <td className="px-4 py-3 text-xs text-gray-500">{lot.semis}</td>
                        <td className="px-4 py-3">
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-green-100 text-green-800">
                            {lot.stade}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-xs font-semibold text-gray-700">{lot.repiquage}</td>
                        <td className="px-4 py-3">
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-teal-100 text-teal-800">
                            {lot.taux}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Besoins en eau */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-center gap-2 mb-4">
                <Droplets size={18} className="text-blue-600" />
                <h2 className="font-semibold text-gray-900">Besoins en eau pépinière</h2>
              </div>
              <div className="space-y-3">
                {PEPINIERE_LOTS.map((lot) => {
                  const total = lot.eau * lot.plants;
                  return (
                    <div key={lot.lot} className="flex items-center justify-between p-3 rounded-xl bg-blue-50 border border-blue-100">
                      <div>
                        <div className="text-sm font-semibold text-gray-800">{lot.lot} — {lot.variete}</div>
                        <div className="text-xs text-gray-500 mt-0.5">
                          {lot.eau} L/plant/semaine × {lot.plants.toLocaleString()} plants
                        </div>
                      </div>
                      <div className="text-base font-bold text-blue-700">{total.toLocaleString()} L/sem</div>
                    </div>
                  );
                })}
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#2E7D32] text-white">
                  <div className="text-sm font-semibold">Total irrigation pépinière</div>
                  <div className="text-lg font-bold">{totalIrrigation.toLocaleString()} L/semaine</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Onglet Historique plantations ─────────────────────────────── */}
        {onglet === "historique" && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-900">Historique des plantations</h2>
              <p className="text-xs text-gray-400 mt-0.5">5 dernières campagnes</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#F8FBF8] border-b border-gray-100">
                    {["Campagne", "Variété", "Surface", "Plants", "Taux reprise", "1ère récolte prév.", "Statut"].map((h) => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-600">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {HISTORIQUE.map((row) => (
                    <tr key={row.campagne + row.variete} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-4 py-3 font-semibold text-gray-800">{row.campagne}</td>
                      <td className="px-4 py-3 text-gray-700">{row.variete}</td>
                      <td className="px-4 py-3 font-medium text-gray-800">{row.surface}</td>
                      <td className="px-4 py-3 text-gray-600">{row.plants}</td>
                      <td className="px-4 py-3">
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-green-100 text-green-800">
                          {row.taux}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-600">{row.recolte}</td>
                      <td className="px-4 py-3">
                        <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${row.statutCls}`}>
                          {row.statut}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
