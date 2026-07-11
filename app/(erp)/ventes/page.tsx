"use client";

import { useState } from "react";
import Topbar from "../../components/Topbar";
import ModalCommande from "../../components/modals/ModalCommande";
import ExportButton from "../../components/ui/ExportButton";
import {
  ShoppingCart,
  FileText,
  TrendingUp,
  Plus,
  Filter,
  Search,
  Eye,
  CheckCircle,
  Clock,
  XCircle,
  Truck,
  Star,
  AlertCircle,
} from "lucide-react";

// ─── KPIs ──────────────────────────────────────────────────────────────────────
const kpis = [
  {
    label: "CA YTD 2025",
    value: "145,2 M",
    unit: "XOF",
    trend: "↑ +18,4% vs 2024",
    trendUp: true,
    sub: "Volume : 94,2 t",
    icon: TrendingUp,
    iconColor: "#2E7D32",
    iconBg: "#E8F5E9",
  },
  {
    label: "Commandes en cours",
    value: "8",
    unit: "",
    trend: "Valeur : 42,8 M XOF",
    trendUp: true,
    sub: "+2 cette semaine",
    icon: ShoppingCart,
    iconColor: "#1565C0",
    iconBg: "#E3F2FD",
  },
  {
    label: "Taux de paiement",
    value: "96,8%",
    unit: "",
    trend: "Impayés : 1,6 M XOF",
    trendUp: false,
    sub: "3 factures en attente",
    icon: FileText,
    iconColor: "#6A1B9A",
    iconBg: "#F3E5F5",
  },
  {
    label: "Client principal",
    value: "29,2%",
    unit: "du CA",
    trend: "Barry Callebaut France",
    trendUp: true,
    sub: "Contrat renouvelé 2025",
    icon: Star,
    iconColor: "#E65100",
    iconBg: "#FFF3E0",
  },
];

// ─── Top clients ───────────────────────────────────────────────────────────────
const topClients = [
  {
    rang: 1,
    client: "Barry Callebaut France",
    pays: "🇫🇷",
    commandes: 4,
    volume: "42,4 t",
    ca: 42.4,
    caLabel: "42,4 M",
    pct: 29.2,
    delai: "18 jours",
  },
  {
    rang: 2,
    client: "Marché local (grossistes CI)",
    pays: "🇨🇮",
    commandes: 12,
    volume: "28,2 t",
    ca: 32.4,
    caLabel: "32,4 M",
    pct: 22.3,
    delai: "7 jours",
  },
  {
    rang: 3,
    client: "Olam International",
    pays: "🇸🇬",
    commandes: 3,
    volume: "14,1 t",
    ca: 28.8,
    caLabel: "28,8 M",
    pct: 19.8,
    delai: "30 jours",
  },
  {
    rang: 4,
    client: "Cemoi Chocolatier",
    pays: "🇫🇷",
    commandes: 2,
    volume: "8,4 t",
    ca: 18.2,
    caLabel: "18,2 M",
    pct: 12.5,
    delai: "21 jours",
  },
  {
    rang: 5,
    client: "Ritter Sport",
    pays: "🇩🇪",
    commandes: 1,
    volume: "9,4 t",
    ca: 12.8,
    caLabel: "12,8 M",
    pct: 8.8,
    delai: "45 jours",
  },
  {
    rang: 6,
    client: "Autres (3 clients)",
    pays: "🌍",
    commandes: 2,
    volume: "—",
    ca: 10.6,
    caLabel: "10,6 M",
    pct: 7.3,
    delai: "—",
  },
];

// ─── Saisonnalité 12 mois ──────────────────────────────────────────────────────
const saisonnalite = [
  { mois: "Jan", valeur: 8.2 },
  { mois: "Fév", valeur: 7.4 },
  { mois: "Mar", valeur: 9.1 },
  { mois: "Avr", valeur: 10.5 },
  { mois: "Mai", valeur: 11.2 },
  { mois: "Juin", valeur: 9.8 },
  { mois: "Juil", valeur: 11.4 },
  { mois: "Août", valeur: 12.1 },
  { mois: "Sep", valeur: 14.3 },
  { mois: "Oct", valeur: 18.7 },
  { mois: "Nov", valeur: 22.4 },
  { mois: "Déc", valeur: 20.1 },
];

// ─── Commandes ─────────────────────────────────────────────────────────────────
const commandes = [
  {
    numero: "CMD-2025-0341",
    client: "Barry Callebaut France",
    date: "09/07/2025",
    produit: "Cacao brut grade 1",
    quantite: "12 400 kg",
    prixUnitaire: "1 200 XOF/kg",
    total: "14 880 000",
    statut: "En cours",
  },
  {
    numero: "CMD-2025-0340",
    client: "Olam International",
    date: "08/07/2025",
    produit: "Cacao brut grade 1",
    quantite: "8 500 kg",
    prixUnitaire: "1 200 XOF/kg",
    total: "10 200 000",
    statut: "Livrée",
  },
  {
    numero: "CMD-2025-0339",
    client: "Cemoi Chocolatier",
    date: "07/07/2025",
    produit: "Cacao fermenté séché",
    quantite: "6 200 kg",
    prixUnitaire: "1 350 XOF/kg",
    total: "8 370 000",
    statut: "Confirmée",
  },
  {
    numero: "CMD-2025-0338",
    client: "Marché local (grossistes CI)",
    date: "06/07/2025",
    produit: "Anacarde brut",
    quantite: "5 200 kg",
    prixUnitaire: "900 XOF/kg",
    total: "4 680 000",
    statut: "Livrée",
  },
  {
    numero: "CMD-2025-0337",
    client: "Ritter Sport",
    date: "05/07/2025",
    produit: "Cacao brut grade 1",
    quantite: "9 400 kg",
    prixUnitaire: "1 185 XOF/kg",
    total: "11 139 000",
    statut: "En cours",
  },
  {
    numero: "CMD-2025-0336",
    client: "Barry Callebaut France",
    date: "04/07/2025",
    produit: "Cacao brut grade 2",
    quantite: "7 800 kg",
    prixUnitaire: "1 050 XOF/kg",
    total: "8 190 000",
    statut: "Livrée",
  },
  {
    numero: "CMD-2025-0335",
    client: "Marché local (grossistes CI)",
    date: "03/07/2025",
    produit: "Maïs grain sec",
    quantite: "20 000 kg",
    prixUnitaire: "185 XOF/kg",
    total: "3 700 000",
    statut: "Livrée",
  },
  {
    numero: "CMD-2025-0334",
    client: "Olam International",
    date: "02/07/2025",
    produit: "Cacao brut grade 1",
    quantite: "5 700 kg",
    prixUnitaire: "1 200 XOF/kg",
    total: "6 840 000",
    statut: "Confirmée",
  },
  {
    numero: "CMD-2025-0333",
    client: "Marché local (grossistes CI)",
    date: "01/07/2025",
    produit: "Riz paddy",
    quantite: "3 000 kg",
    prixUnitaire: "320 XOF/kg",
    total: "960 000",
    statut: "Annulée",
  },
  {
    numero: "CMD-2025-0332",
    client: "Cemoi Chocolatier",
    date: "30/06/2025",
    produit: "Cacao brut grade 1",
    quantite: "4 600 kg",
    prixUnitaire: "1 200 XOF/kg",
    total: "5 520 000",
    statut: "Livrée",
  },
];

type Statut = "Livrée" | "En cours" | "Confirmée" | "Annulée";

function statutStyle(statut: string): { bg: string; text: string; icon: React.ReactNode } {
  switch (statut) {
    case "Livrée":
      return { bg: "#E8F5E9", text: "#2E7D32", icon: <Truck size={12} /> };
    case "En cours":
      return { bg: "#E3F2FD", text: "#1565C0", icon: <Clock size={12} /> };
    case "Confirmée":
      return { bg: "#FFF3E0", text: "#E65100", icon: <CheckCircle size={12} /> };
    case "Annulée":
      return { bg: "#F5F5F5", text: "#757575", icon: <XCircle size={12} /> };
    default:
      return { bg: "#F5F5F5", text: "#757575", icon: null };
  }
}

const maxCA = Math.max(...saisonnalite.map((s) => s.valeur));

export default function VentesPage() {
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("Commandes");
  const [statutFilter, setStatutFilter] = useState("Tous");

  const statutOptions = ["Tous", "Livrée", "En cours", "Confirmée", "Annulée"];

  const filteredCommandes = commandes.filter((c) => {
    const matchSearch =
      search === "" ||
      c.numero.toLowerCase().includes(search.toLowerCase()) ||
      c.client.toLowerCase().includes(search.toLowerCase()) ||
      c.produit.toLowerCase().includes(search.toLowerCase());
    const matchStatut = statutFilter === "Tous" || c.statut === statutFilter;
    return matchSearch && matchStatut;
  });

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Topbar
        title="Ventes & Commercialisation"
        breadcrumb={["Commerce", "Ventes"]}
      />

      <main className="flex-1 p-6 space-y-6">

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {kpis.map((kpi) => {
            const Icon = kpi.icon;
            return (
              <div
                key={kpi.label}
                className="rounded-2xl border border-gray-100 bg-white p-5 flex flex-col gap-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-500">{kpi.label}</span>
                  <span
                    style={{ background: kpi.iconBg, color: kpi.iconColor }}
                    className="rounded-xl p-2 flex items-center justify-center"
                  >
                    <Icon size={18} />
                  </span>
                </div>
                <div className="flex items-end gap-1">
                  <span className="text-2xl font-bold text-gray-900">{kpi.value}</span>
                  {kpi.unit && (
                    <span className="text-xs text-gray-400 mb-1 ml-1">{kpi.unit}</span>
                  )}
                </div>
                <span
                  className="text-xs font-medium"
                  style={{ color: kpi.trendUp ? "#2E7D32" : "#E65100" }}
                >
                  {kpi.trend}
                </span>
                <span className="text-xs text-gray-400">{kpi.sub}</span>
              </div>
            );
          })}
        </div>

        {/* Top clients + Saisonnalité */}
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">

          {/* Top clients — tableau */}
          <div className="xl:col-span-3 rounded-2xl border border-gray-100 bg-white p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-gray-900">Top clients 2025</h2>
              <span className="text-xs text-gray-400">Par CA annuel</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr style={{ background: "#F8FBF8" }}>
                    {["#", "Client", "Cmd", "Volume", "CA (M XOF)", "% CA", "Délai pmt"].map((col) => (
                      <th
                        key={col}
                        className="text-left text-gray-500 font-semibold px-3 py-2.5 whitespace-nowrap first:rounded-l-xl last:rounded-r-xl"
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {topClients.map((c) => (
                    <tr key={c.rang} className="hover:bg-gray-50 transition-colors">
                      <td className="px-3 py-3 font-bold text-gray-400">{c.rang}</td>
                      <td className="px-3 py-3 font-medium text-gray-800 whitespace-nowrap">
                        <span className="mr-1">{c.pays}</span>
                        {c.client}
                      </td>
                      <td className="px-3 py-3 text-gray-600 text-center">{c.commandes}</td>
                      <td className="px-3 py-3 text-gray-600 whitespace-nowrap">{c.volume}</td>
                      <td className="px-3 py-3 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-gray-900">{c.caLabel}</span>
                          <div className="flex-1 h-1.5 rounded-full bg-gray-100 min-w-[40px] max-w-[60px]">
                            <div
                              className="h-1.5 rounded-full"
                              style={{ width: `${(c.ca / 42.4) * 100}%`, background: "#2E7D32" }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-3 text-gray-600 whitespace-nowrap">{c.pct}%</td>
                      <td className="px-3 py-3 text-gray-500 whitespace-nowrap">{c.delai}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Saisonnalité — bar chart SVG */}
          <div className="xl:col-span-2 rounded-2xl border border-gray-100 bg-white p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-semibold text-gray-900">Saisonnalité des ventes</h2>
              <span className="text-xs text-gray-400">M XOF / mois</span>
            </div>
            <p className="text-xs text-gray-400 mb-4">Pic Oct–Déc (récolte principale cacao)</p>
            <svg viewBox="0 0 280 140" className="w-full" aria-label="Saisonnalité ventes 2025">
              {saisonnalite.map((s, i) => {
                const barH = (s.valeur / maxCA) * 110;
                const x = i * 23 + 2;
                const isPeak = s.valeur >= 18;
                return (
                  <g key={s.mois}>
                    <rect
                      x={x}
                      y={120 - barH}
                      width={18}
                      height={barH}
                      rx={3}
                      fill={isPeak ? "#2E7D32" : "#A5D6A7"}
                    />
                    <text
                      x={x + 9}
                      y={136}
                      textAnchor="middle"
                      fontSize="7"
                      fill="#9E9E9E"
                    >
                      {s.mois}
                    </text>
                    {isPeak && (
                      <text
                        x={x + 9}
                        y={120 - barH - 3}
                        textAnchor="middle"
                        fontSize="7"
                        fill="#2E7D32"
                        fontWeight="600"
                      >
                        {s.valeur}
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Tableau commandes */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <h2 className="text-base font-semibold text-gray-900">Commandes</h2>
              <p className="text-xs text-gray-400 mt-0.5">
                {filteredCommandes.length} commande{filteredCommandes.length > 1 ? "s" : ""} affichée{filteredCommandes.length > 1 ? "s" : ""}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <ExportButton
                data={commandes.map((c) => ({
                  Numero: c.numero,
                  Client: c.client,
                  Date: c.date,
                  Produit: c.produit,
                  Quantite: c.quantite,
                  PrixUnitaire: c.prixUnitaire,
                  Total_XOF: c.total,
                  Statut: c.statut,
                }))}
                filename="ventes-commandes"
                label="Exporter CSV"
              />
              {/* Search */}
              <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-1.5 bg-gray-50">
                <Search size={13} className="text-gray-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Rechercher..."
                  className="text-xs bg-transparent outline-none text-gray-600 w-32 placeholder-gray-400"
                />
              </div>
              {/* Statut filter */}
              <div className="flex items-center gap-1 bg-gray-50 border border-gray-200 rounded-lg p-1">
                {statutOptions.map((s) => (
                  <button
                    key={s}
                    onClick={() => setStatutFilter(s)}
                    className="px-2.5 py-1 rounded text-xs font-medium transition-colors"
                    style={
                      statutFilter === s
                        ? { background: "#2E7D32", color: "#fff" }
                        : { color: "#9E9E9E" }
                    }
                  >
                    {s}
                  </button>
                ))}
              </div>
              {/* New order */}
              <button
                onClick={() => setShowModal(true)}
                className="text-white rounded-xl text-xs font-medium px-3 py-1.5 flex items-center gap-1.5"
                style={{ background: "#2E7D32" }}
              >
                <Plus size={13} />
                Nouvelle commande
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mb-4 border-b border-gray-100">
            {["Commandes", "Devis", "Livraisons", "Retours"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="px-4 py-2 text-xs font-medium rounded-t-lg transition-colors"
                style={
                  activeTab === tab
                    ? { color: "#2E7D32", borderBottom: "2px solid #2E7D32", marginBottom: "-1px" }
                    : { color: "#9E9E9E" }
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
                  {["N° Commande", "Client", "Date", "Produit", "Quantité", "Prix unitaire", "Total (XOF)", "Statut", "Actions"].map(
                    (col) => (
                      <th
                        key={col}
                        className="text-left text-gray-500 font-semibold px-4 py-3 whitespace-nowrap first:rounded-l-xl last:rounded-r-xl"
                      >
                        {col}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredCommandes.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="text-center py-8 text-gray-400 text-xs">
                      Aucune commande ne correspond aux filtres.
                    </td>
                  </tr>
                ) : (
                  filteredCommandes.map((cmd) => {
                    const style = statutStyle(cmd.statut);
                    return (
                      <tr key={cmd.numero} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 font-mono font-semibold text-[#2E7D32] whitespace-nowrap">
                          {cmd.numero}
                        </td>
                        <td className="px-4 py-3 font-medium text-gray-800 whitespace-nowrap">
                          {cmd.client}
                        </td>
                        <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{cmd.date}</td>
                        <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{cmd.produit}</td>
                        <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{cmd.quantite}</td>
                        <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{cmd.prixUnitaire}</td>
                        <td className="px-4 py-3 font-semibold text-gray-900 whitespace-nowrap">
                          {parseInt(cmd.total).toLocaleString("fr-FR")}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-medium text-xs"
                            style={{ background: style.bg, color: style.text }}
                          >
                            {style.icon}
                            {cmd.statut}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <button className="border border-gray-200 text-gray-600 rounded-lg text-xs px-3 py-1.5 hover:bg-gray-50 flex items-center gap-1">
                            <Eye size={11} />
                            Voir
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Prévisions S2 2025 */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle size={16} className="text-[#2E7D32]" />
            <h2 className="text-base font-semibold text-gray-900">Prévisions de ventes — S2 2025</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="rounded-xl bg-green-50 border border-green-100 p-4">
              <p className="text-xs font-semibold text-green-700 uppercase tracking-wide mb-1">Scénario attendu</p>
              <p className="text-2xl font-bold text-gray-900">82 – 95 M</p>
              <p className="text-xs text-gray-500 mt-1">XOF | Juillet – Décembre 2025</p>
            </div>
            <div className="sm:col-span-2 space-y-3">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Facteurs favorables</p>
              {[
                "Prix cacao international favorable (+8% vs S2 2024)",
                "Récolte principale Oct–Déc : volume estimé 45–52 t",
                "Contrat Barry Callebaut renouvelé — volume garanti 40 t S2",
              ].map((f, i) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle size={14} className="text-[#2E7D32] mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-700">{f}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </main>

      <ModalCommande isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}
