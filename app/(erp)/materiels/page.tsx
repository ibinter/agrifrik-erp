"use client";

import Topbar from "../../components/Topbar";
import {
  Wrench,
  Truck,
  Fuel,
  AlertTriangle,
  CheckCircle,
  Clock,
  Plus,
  Calendar,
  Zap,
  Settings,
} from "lucide-react";

const kpis = [
  {
    label: "Matériels actifs",
    value: "34",
    icon: Settings,
    color: "#2E7D32",
    bg: "#E8F5E9",
  },
  {
    label: "En maintenance",
    value: "3",
    icon: Wrench,
    color: "#E65100",
    bg: "#FFF3E0",
  },
  {
    label: "Coût maintenance YTD",
    value: "8,4 M XOF",
    icon: Zap,
    color: "#1B5E20",
    bg: "#E8F5E9",
  },
  {
    label: "Prochaine maintenance",
    value: "dans 3 jours",
    icon: Clock,
    color: "#E65100",
    bg: "#FFF3E0",
  },
];

const materiels = [
  {
    code: "MAT-001",
    designation: "Tracteur principal",
    type: "Tracteur",
    marque: "John Deere 5075E",
    annee: 2021,
    heures: "2 840 h",
    dernierEntretien: "15/06/2025",
    prochainEntretien: "15/09/2025",
    statut: "Opérationnel",
  },
  {
    code: "MAT-002",
    designation: "Tracteur secondaire",
    type: "Tracteur",
    marque: "Massey Ferguson 375",
    annee: 2019,
    heures: "4 120 h",
    dernierEntretien: "08/07/2025",
    prochainEntretien: "08/10/2025",
    statut: "Opérationnel",
  },
  {
    code: "MAT-003",
    designation: "Pulvérisateur automoteur",
    type: "Pulvérisateur",
    marque: "AGRIFAC Condor",
    annee: 2022,
    heures: "680 h",
    dernierEntretien: "01/07/2025",
    prochainEntretien: "01/08/2025",
    statut: "Opérationnel",
  },
  {
    code: "MAT-004",
    designation: "Camion benne",
    type: "Transport",
    marque: "Mercedes Atego 1218",
    annee: 2018,
    heures: "98 420 km",
    dernierEntretien: "20/06/2025",
    prochainEntretien: "12/07/2025",
    statut: "Maintenance préventive",
  },
  {
    code: "MAT-005",
    designation: "Groupe électrogène",
    type: "Énergie",
    marque: "Cummins 100 kVA",
    annee: 2020,
    heures: "3 200 h",
    dernierEntretien: "30/05/2025",
    prochainEntretien: "30/07/2025",
    statut: "Opérationnel",
  },
  {
    code: "MAT-006",
    designation: "Décortiqueuse riz",
    type: "Transformation",
    marque: "SATAKE R6",
    annee: 2023,
    heures: "420 h",
    dernierEntretien: "02/07/2025",
    prochainEntretien: "02/10/2025",
    statut: "Opérationnel",
  },
  {
    code: "MAT-007",
    designation: "Motopompe irrigation",
    type: "Pompage",
    marque: "Honda WB30",
    annee: 2022,
    heures: "1 850 h",
    dernierEntretien: "10/07/2025",
    prochainEntretien: "10/08/2025",
    statut: "En panne",
  },
];

function statutBadge(statut: string) {
  if (statut === "Opérationnel") {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
        <CheckCircle size={11} />
        {statut}
      </span>
    );
  }
  if (statut === "Maintenance préventive") {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-700">
        <Wrench size={11} />
        {statut}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">
      <AlertTriangle size={11} />
      {statut}
    </span>
  );
}

const ordresTravail = [
  {
    ref: "OT-2025-018",
    materiel: "MAT-004 Camion benne",
    description: "Vidange + filtres + contrôle freins",
    technicien: "Bamba O.",
    date: "Début : 12/07/2025",
    duree: "Durée estimée : 4h",
    statut: "En cours",
    statutColor: "bg-blue-100 text-blue-700",
    icon: Truck,
  },
  {
    ref: "OT-2025-019",
    materiel: "MAT-007 Motopompe",
    description: "Diagnostic panne — joint défectueux identifié",
    technicien: "Kouassi D.",
    date: "Début : 10/07/2025",
    duree: "Durée estimée : 8h",
    statut: "En attente pièces",
    statutColor: "bg-orange-100 text-orange-700",
    icon: AlertTriangle,
  },
  {
    ref: "OT-2025-020",
    materiel: "MAT-001 Tracteur",
    description: "Remplacement filtres air + graissage",
    technicien: null,
    date: "Planifié : 15/09/2025",
    duree: null,
    statut: "Planifié",
    statutColor: "bg-gray-100 text-gray-600",
    icon: Calendar,
  },
];

const carburants = [
  { label: "MAT-001 Tracteur JD", conso: 380, budget: 500, pct: 76 },
  { label: "MAT-002 Tracteur MF", conso: 290, budget: 400, pct: 72 },
  { label: "MAT-004 Camion", conso: 210, budget: 350, pct: 60 },
  { label: "MAT-005 Groupe élec.", conso: 420, budget: 600, pct: 70 },
];

export default function MaterielsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Topbar
        title="Matériels & Maintenance"
        breadcrumb={["Logistique", "Matériels & Maintenance"]}
      />

      <main className="p-6 space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {kpis.map((kpi) => {
            const Icon = kpi.icon;
            return (
              <div
                key={kpi.label}
                className="rounded-2xl border border-gray-100 bg-white p-5 flex items-center gap-4 shadow-sm"
              >
                <div
                  className="rounded-xl p-3 flex-shrink-0"
                  style={{ backgroundColor: kpi.bg }}
                >
                  <Icon size={22} style={{ color: kpi.color }} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 leading-tight">{kpi.label}</p>
                  <p className="text-xl font-bold text-gray-800 mt-0.5">{kpi.value}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tableau parc matériel */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-gray-800">Parc matériel</h2>
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white"
              style={{ backgroundColor: "#2E7D32" }}
            >
              <Plus size={15} />
              Ajouter matériel
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  {[
                    "Code",
                    "Désignation",
                    "Type",
                    "Marque / Modèle",
                    "Année",
                    "Heures moteur",
                    "Dernier entretien",
                    "Prochain entretien",
                    "Statut",
                  ].map((h) => (
                    <th
                      key={h}
                      className="text-left text-xs font-semibold text-gray-500 py-2 px-3 whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {materiels.map((m, i) => (
                  <tr
                    key={m.code}
                    className={`border-b border-gray-50 hover:bg-gray-50 transition-colors ${
                      i % 2 === 0 ? "" : "bg-gray-50/40"
                    }`}
                  >
                    <td className="py-3 px-3 font-mono text-xs text-gray-600 font-medium whitespace-nowrap">
                      {m.code}
                    </td>
                    <td className="py-3 px-3 font-medium text-gray-800 whitespace-nowrap">
                      {m.designation}
                    </td>
                    <td className="py-3 px-3 text-gray-600 whitespace-nowrap">{m.type}</td>
                    <td className="py-3 px-3 text-gray-700 whitespace-nowrap">{m.marque}</td>
                    <td className="py-3 px-3 text-gray-600">{m.annee}</td>
                    <td className="py-3 px-3 text-gray-600 whitespace-nowrap">{m.heures}</td>
                    <td className="py-3 px-3 text-gray-500 whitespace-nowrap">
                      {m.dernierEntretien}
                    </td>
                    <td className="py-3 px-3 text-gray-500 whitespace-nowrap">
                      {m.prochainEntretien}
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap">{statutBadge(m.statut)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Ordres de travail actifs */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-gray-800">Ordres de travail actifs</h2>
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white"
              style={{ backgroundColor: "#2E7D32" }}
            >
              <Plus size={15} />
              Nouvel OT
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {ordresTravail.map((ot) => {
              const Icon = ot.icon;
              return (
                <div
                  key={ot.ref}
                  className="rounded-xl border border-gray-100 bg-gray-50 p-4 flex flex-col gap-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div
                        className="rounded-lg p-2"
                        style={{ backgroundColor: "#E8F5E9" }}
                      >
                        <Icon size={16} style={{ color: "#2E7D32" }} />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-500">{ot.ref}</p>
                        <p className="text-sm font-bold text-gray-800">{ot.materiel}</p>
                      </div>
                    </div>
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${ot.statutColor}`}
                    >
                      {ot.statut}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{ot.description}</p>
                  <div className="space-y-1 text-xs text-gray-500">
                    {ot.technicien && (
                      <div className="flex items-center gap-1">
                        <Settings size={11} />
                        Technicien : {ot.technicien}
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <Calendar size={11} />
                      {ot.date}
                    </div>
                    {ot.duree && (
                      <div className="flex items-center gap-1">
                        <Clock size={11} />
                        {ot.duree}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Consommation carburant */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-5">
            <Fuel size={18} style={{ color: "#E65100" }} />
            <h2 className="text-base font-semibold text-gray-800">
              Consommation carburant ce mois
            </h2>
          </div>
          <div className="space-y-4">
            {carburants.map((c) => (
              <div key={c.label}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-700 font-medium">{c.label}</span>
                  <span className="text-xs text-gray-500">
                    {c.conso} L{" "}
                    <span className="text-gray-400">/ budget {c.budget} L</span>
                    <span className="ml-2 font-semibold text-gray-700">{c.pct}%</span>
                  </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2.5">
                  <div
                    className="h-2.5 rounded-full transition-all duration-500"
                    style={{
                      width: `${c.pct}%`,
                      backgroundColor: c.pct >= 80 ? "#E65100" : "#2E7D32",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Fuel size={15} style={{ color: "#E65100" }} />
              <span>Total consommé :</span>
              <span className="font-bold text-gray-800">1 300 L</span>
            </div>
            <div className="text-sm text-gray-600">
              Coût total :{" "}
              <span className="font-bold text-gray-800">1 105 000 XOF</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
