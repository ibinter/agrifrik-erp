"use client";

import { useState } from "react";
import { Eye, Mail, RefreshCw, FileText, CheckCircle, Clock, AlertTriangle, TrendingUp, Plus, Search, Filter } from "lucide-react";
import Topbar from "../../components/Topbar";

const kpis = [
  {
    label: "CA facturé (mois)",
    value: "148,5 M",
    unit: "XOF",
    sub: "Juillet 2025",
    icon: TrendingUp,
    iconColor: "#2E7D32",
    iconBg: "#E8F5E9",
  },
  {
    label: "Encaissé",
    value: "118,2 M",
    unit: "XOF",
    sub: "79,6% du CA",
    icon: CheckCircle,
    iconColor: "#1565C0",
    iconBg: "#E3F2FD",
  },
  {
    label: "En attente",
    value: "30,3 M",
    unit: "XOF",
    sub: "20,4% du CA",
    icon: Clock,
    iconColor: "#E65100",
    iconBg: "#FFF3E0",
  },
  {
    label: "Impayés > 30j",
    value: "4",
    unit: "factures",
    sub: "Action requise",
    icon: AlertTriangle,
    iconColor: "#C62828",
    iconBg: "#FFEBEE",
  },
];

const TABS = ["Toutes", "Factures", "Avoirs", "Devis", "Impayées"];

type Statut = "Payée" | "En attente" | "Partiel" | "En retard" | "Devis" | "Avoir";

const factures: {
  numero: string;
  client: string;
  date: string;
  echeance: string;
  montantHT: number;
  tva: string;
  totalTTC: number;
  statut: Statut;
  actions: string[];
}[] = [
  {
    numero: "FAC-2025-0341",
    client: "CACAO EXPORT SA",
    date: "09/07",
    echeance: "09/08",
    montantHT: 38983051,
    tva: "0%",
    totalTTC: 38983051,
    statut: "En attente",
    actions: ["Voir", "Rappel"],
  },
  {
    numero: "FAC-2025-0340",
    client: "CHOCOVOIRE CI",
    date: "08/07",
    echeance: "08/08",
    montantHT: 53250000,
    tva: "0%",
    totalTTC: 53250000,
    statut: "Payée",
    actions: ["Voir"],
  },
  {
    numero: "FAC-2025-0339",
    client: "OLAM CI",
    date: "07/07",
    echeance: "07/08",
    montantHT: 24575000,
    tva: "0%",
    totalTTC: 24575000,
    statut: "Partiel",
    actions: ["Voir", "Rappel"],
  },
  {
    numero: "FAC-2025-0338",
    client: "CHOCOVOIRE CI",
    date: "05/07",
    echeance: "05/08",
    montantHT: 4200000,
    tva: "0%",
    totalTTC: 4200000,
    statut: "Payée",
    actions: ["Voir"],
  },
  {
    numero: "DEV-2025-045",
    client: "SUCDEN France",
    date: "04/07",
    echeance: "04/08",
    montantHT: 36000000,
    tva: "0%",
    totalTTC: 36000000,
    statut: "Devis",
    actions: ["Convertir"],
  },
  {
    numero: "FAC-2025-0335",
    client: "BARRY CALLEBAUT",
    date: "01/07",
    echeance: "01/08",
    montantHT: 12400000,
    tva: "0%",
    totalTTC: 12400000,
    statut: "En retard",
    actions: ["Voir", "Rappel"],
  },
  {
    numero: "FAC-2025-0330",
    client: "AGRO TRADING CI",
    date: "25/06",
    echeance: "25/07",
    montantHT: 8750000,
    tva: "0%",
    totalTTC: 8750000,
    statut: "En retard",
    actions: ["Voir", "Rappel"],
  },
  {
    numero: "AV-2025-012",
    client: "CHOCOVOIRE CI",
    date: "20/06",
    echeance: "-",
    montantHT: -2100000,
    tva: "0%",
    totalTTC: -2100000,
    statut: "Avoir",
    actions: ["Voir"],
  },
];

const relances = [
  {
    numero: "FAC-2025-0335",
    client: "BARRY CALLEBAUT",
    montant: "12 400 000 XOF",
    retard: 9,
    derniere: "Aucune",
    prochaine: "Email immédiat",
  },
  {
    numero: "FAC-2025-0330",
    client: "AGRO TRADING CI",
    montant: "8 750 000 XOF",
    retard: 16,
    derniere: "02/07/2025",
    prochaine: "Email + Appel",
  },
  {
    numero: "FAC-2025-0321",
    client: "COOPEXPORT NORD",
    montant: "5 600 000 XOF",
    retard: 38,
    derniere: "05/06/2025",
    prochaine: "Mise en demeure",
  },
  {
    numero: "FAC-2025-0315",
    client: "AGRIBUILD CI",
    montant: "3 100 000 XOF",
    retard: 45,
    derniere: "01/06/2025",
    prochaine: "Contentieux",
  },
];

const statutConfig: Record<Statut, { bg: string; text: string; label: string }> = {
  Payée: { bg: "#E8F5E9", text: "#2E7D32", label: "Payée" },
  "En attente": { bg: "#E3F2FD", text: "#1565C0", label: "En attente" },
  Partiel: { bg: "#FFF3E0", text: "#E65100", label: "Partiel" },
  "En retard": { bg: "#FFEBEE", text: "#C62828", label: "En retard" },
  Devis: { bg: "#F3E5F5", text: "#6A1B9A", label: "Devis" },
  Avoir: { bg: "#F5F5F5", text: "#757575", label: "Avoir" },
};

function fmt(n: number) {
  return (n < 0 ? "-" : "") + Math.abs(n).toLocaleString("fr-FR");
}

const TAB_FILTER: Record<string, Statut[] | null> = {
  Toutes: null,
  Factures: ["En attente", "Payée", "Partiel", "En retard"],
  Avoirs: ["Avoir"],
  Devis: ["Devis"],
  Impayées: ["En attente", "En retard", "Partiel"],
};

export default function FacturesPage() {
  const [activeTab, setActiveTab] = useState("Toutes");
  const [sentRelances, setSentRelances] = useState<string[]>([]);

  const filter = TAB_FILTER[activeTab];
  const visible = filter ? factures.filter((f) => filter.includes(f.statut)) : factures;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Topbar title="Factures & Devis" breadcrumb={["Commerce", "Factures & Devis"]} />

      <main className="flex-1 p-6 space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {kpis.map((kpi) => {
            const Icon = kpi.icon;
            return (
              <div key={kpi.label} className="rounded-2xl border border-gray-100 bg-white p-5 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-500">{kpi.label}</span>
                  <span
                    className="rounded-xl p-2 flex items-center justify-center"
                    style={{ background: kpi.iconBg, color: kpi.iconColor }}
                  >
                    <Icon size={18} />
                  </span>
                </div>
                <div className="flex items-end gap-1">
                  <span className="text-2xl font-bold text-gray-900">{kpi.value}</span>
                  <span className="text-xs text-gray-400 mb-1">{kpi.unit}</span>
                </div>
                <span className="text-xs text-gray-400">{kpi.sub}</span>
              </div>
            );
          })}
        </div>

        {/* Tableau des factures */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
            <div>
              <h2 className="text-base font-semibold text-gray-900">Factures & Devis</h2>
              <p className="text-xs text-gray-400 mt-0.5">Juillet 2025 — {visible.length} document(s)</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-1.5 bg-gray-50">
                <Search size={13} className="text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className="text-xs bg-transparent outline-none text-gray-600 w-28 placeholder-gray-400"
                />
              </div>
              <button className="border border-gray-200 text-gray-600 rounded-lg text-xs px-3 py-1.5 hover:bg-gray-50 flex items-center gap-1.5">
                <Filter size={12} />
                Filtrer
              </button>
              <button
                className="text-white rounded-xl text-xs font-medium px-3 py-1.5 flex items-center gap-1.5"
                style={{ background: "#2E7D32" }}
              >
                <Plus size={13} />
                Nouvelle facture
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1.5 mb-5 flex-wrap">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="px-4 py-1.5 rounded-full text-xs font-medium transition-colors"
                style={
                  activeTab === tab
                    ? { background: "#2E7D32", color: "#fff" }
                    : { background: "#F5F5F5", color: "#757575" }
                }
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr style={{ background: "#F8FBF8" }}>
                  {["N°", "Client", "Date", "Échéance", "Montant HT", "TVA", "Total TTC", "Statut", "Actions"].map((col) => (
                    <th
                      key={col}
                      className="text-left text-gray-500 font-semibold px-4 py-3 whitespace-nowrap first:rounded-l-xl last:rounded-r-xl"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {visible.map((f) => {
                  const s = statutConfig[f.statut];
                  return (
                    <tr key={f.numero} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 font-mono font-semibold text-[#2E7D32] whitespace-nowrap">
                        <a href={`/factures/${f.numero}`} className="hover:underline">
                          {f.numero}
                        </a>
                      </td>
                      <td className="px-4 py-3 font-medium text-gray-800 whitespace-nowrap">{f.client}</td>
                      <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{f.date}</td>
                      <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{f.echeance}</td>
                      <td className="px-4 py-3 text-gray-700 whitespace-nowrap text-right tabular-nums">
                        {fmt(f.montantHT)}
                      </td>
                      <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{f.tva}</td>
                      <td className="px-4 py-3 font-semibold text-gray-900 whitespace-nowrap text-right tabular-nums">
                        {fmt(f.totalTTC)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span
                          className="inline-flex items-center px-2.5 py-1 rounded-full font-medium"
                          style={{ background: s.bg, color: s.text }}
                        >
                          {s.label}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          {f.actions.includes("Voir") && (
                            <a
                              href={`/factures/${f.numero}`}
                              className="border border-gray-200 text-gray-600 rounded-lg text-xs px-2.5 py-1 hover:bg-gray-50 flex items-center gap-1"
                            >
                              <Eye size={11} />
                              Voir
                            </a>
                          )}
                          {f.actions.includes("Rappel") && (
                            <button className="border border-orange-200 text-orange-600 rounded-lg text-xs px-2.5 py-1 hover:bg-orange-50 flex items-center gap-1">
                              <Mail size={11} />
                              Rappel
                            </button>
                          )}
                          {f.actions.includes("Convertir") && (
                            <button
                              className="text-white rounded-lg text-xs px-2.5 py-1 flex items-center gap-1"
                              style={{ background: "#6A1B9A" }}
                            >
                              <RefreshCw size={11} />
                              Convertir
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Relances automatiques */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <div className="flex items-center gap-3 mb-5">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: "#FFEBEE" }}
            >
              <AlertTriangle size={18} style={{ color: "#C62828" }} />
            </div>
            <div>
              <h2 className="text-base font-semibold text-gray-900">Relances automatiques</h2>
              <p className="text-xs text-gray-400 mt-0.5">Factures en retard de paiement</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr style={{ background: "#FFF8F8" }}>
                  {["N° Facture", "Client", "Montant", "Retard (jours)", "Dernière relance", "Prochaine action", ""].map((col) => (
                    <th
                      key={col}
                      className="text-left text-gray-500 font-semibold px-4 py-3 whitespace-nowrap first:rounded-l-xl last:rounded-r-xl"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {relances.map((r) => {
                  const sent = sentRelances.includes(r.numero);
                  return (
                    <tr key={r.numero} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 font-mono font-semibold text-[#C62828] whitespace-nowrap">
                        {r.numero}
                      </td>
                      <td className="px-4 py-3 font-medium text-gray-800 whitespace-nowrap">{r.client}</td>
                      <td className="px-4 py-3 font-semibold text-gray-900 whitespace-nowrap tabular-nums">{r.montant}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span
                          className="inline-flex items-center px-2.5 py-1 rounded-full font-bold"
                          style={{
                            background: r.retard > 30 ? "#FFEBEE" : "#FFF3E0",
                            color: r.retard > 30 ? "#C62828" : "#E65100",
                          }}
                        >
                          {r.retard}j
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{r.derniere}</td>
                      <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{r.prochaine}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <button
                          onClick={() => setSentRelances((prev) => [...prev, r.numero])}
                          disabled={sent}
                          className="flex items-center gap-1.5 rounded-lg text-xs px-3 py-1.5 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          style={sent ? { background: "#E8F5E9", color: "#2E7D32" } : { background: "#C62828", color: "#fff" }}
                        >
                          <Mail size={11} />
                          {sent ? "Envoyée ✓" : "Envoyer relance email"}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
