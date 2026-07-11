"use client";

import { useState } from "react";
import {
  FileText, Clock, TrendingUp, BarChart2,
  Search, Filter, Eye, FileDown, RefreshCw,
  Plus, Trash2,
} from "lucide-react";
import Topbar from "../../components/Topbar";

/* ─── KPIs ─────────────────────────────────────────────── */
const kpis = [
  { label: "Devis actifs", value: "8", unit: "", sub: "En cours", icon: FileText, iconColor: "#6A1B9A", iconBg: "#F3E5F5" },
  { label: "En attente réponse", value: "3", unit: "", sub: "Réponse attendue", icon: Clock, iconColor: "#E65100", iconBg: "#FFF3E0" },
  { label: "Montant total devis", value: "48,4 M", unit: "XOF", sub: "Portefeuille actif", icon: BarChart2, iconColor: "#1565C0", iconBg: "#E3F2FD" },
  { label: "Taux de conversion", value: "72", unit: "%", sub: "Devis acceptés / répondus", icon: TrendingUp, iconColor: "#2E7D32", iconBg: "#E8F5E9" },
];

/* ─── DONNÉES DEVIS ─────────────────────────────────────── */
type StatutDevis = "En attente" | "Accepté" | "Refusé";

interface Devis {
  numero: string;
  date: string;
  client: string;
  produit: string;
  qte: string;
  montant: number;
  validite: string;
  statut: StatutDevis;
  facture?: string;
  refusRaison?: string;
  actions: string[];
}

const devisList: Devis[] = [
  { numero: "DEV-2025-012", date: "08/07/2025", client: "Barry Callebaut CI", produit: "Cacao Grade AA", qte: "30 t", montant: 32850000, validite: "31/07/2025", statut: "En attente", actions: ["Voir","PDF","Relancer"] },
  { numero: "DEV-2025-011", date: "05/07/2025", client: "Olam International", produit: "Anacarde WW240", qte: "8 t", montant: 5440000, validite: "25/07/2025", statut: "En attente", actions: ["Voir","PDF","Relancer"] },
  { numero: "DEV-2025-010", date: "01/07/2025", client: "Nestlé CI", produit: "Cacao Grade AA", qte: "20 t", montant: 22000000, validite: "20/07/2025", statut: "En attente", actions: ["Voir","PDF"] },
  { numero: "DEV-2025-009", date: "28/06/2025", client: "Cargill Rotterdam", produit: "Cacao Grade AA", qte: "25 t", montant: 27500000, validite: "28/07/2025", statut: "Accepté", facture: "FAC-048", actions: ["Voir"] },
  { numero: "DEV-2025-008", date: "20/06/2025", client: "Touton SA", produit: "Cacao Grade A", qte: "15 t", montant: 15600000, validite: "20/07/2025", statut: "Accepté", facture: "FAC-047", actions: ["Voir"] },
  { numero: "DEV-2025-007", date: "15/06/2025", client: "Maison JACQ-VABRE", produit: "Cacao AA premium", qte: "10 t", montant: 12400000, validite: "15/07/2025", statut: "Accepté", facture: "FAC-046", actions: ["Voir"] },
  { numero: "DEV-2025-006", date: "10/06/2025", client: "SIPEF Trading", produit: "Anacarde RW180", qte: "5 t", montant: 3750000, validite: "10/07/2025", statut: "Refusé", refusRaison: "prix", actions: ["Voir"] },
  { numero: "DEV-2025-005", date: "01/06/2025", client: "Barry Callebaut CI", produit: "Cacao Grade A", qte: "20 t", montant: 20800000, validite: "01/07/2025", statut: "Accepté", facture: "FAC-044", actions: ["Voir"] },
  { numero: "DEV-2025-004", date: "15/05/2025", client: "Olam CI", produit: "Cacao Grade AA", qte: "30 t", montant: 33000000, validite: "15/06/2025", statut: "Accepté", facture: "FAC-041", actions: ["Voir"] },
  { numero: "DEV-2025-003", date: "01/05/2025", client: "Cargill", produit: "Anacarde WW240", qte: "12 t", montant: 8160000, validite: "01/06/2025", statut: "Accepté", actions: ["Voir"] },
  { numero: "DEV-2025-002", date: "15/04/2025", client: "Nestlé", produit: "Cacao AA", qte: "25 t", montant: 27500000, validite: "15/05/2025", statut: "Accepté", actions: ["Voir"] },
  { numero: "DEV-2025-001", date: "01/03/2025", client: "Grand chocolatier Lyon", produit: "Cacao bio AA", qte: "5 t", montant: 7250000, validite: "01/04/2025", statut: "Refusé", refusRaison: "délai", actions: ["Voir"] },
];

const statutConfig: Record<StatutDevis, { bg: string; text: string; dot: string }> = {
  "En attente": { bg: "#FFF3E0", text: "#E65100", dot: "#E65100" },
  "Accepté":    { bg: "#E8F5E9", text: "#2E7D32", dot: "#2E7D32" },
  "Refusé":     { bg: "#FFEBEE", text: "#C62828", dot: "#C62828" },
};

function StatutBadge({ d }: { d: Devis }) {
  const cfg = statutConfig[d.statut];
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium" style={{ background: cfg.bg, color: cfg.text }}>
      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: cfg.dot }} />
      {d.statut === "Accepté" && d.facture ? `Accepté → ${d.facture}` : d.statut === "Refusé" && d.refusRaison ? `Refusé — ${d.refusRaison}` : d.statut}
    </span>
  );
}

/* ─── ONGLET STATISTIQUES : donut SVG ──────────────────── */
function DonutChart() {
  const data = [
    { label: "Prix trop élevé", pct: 60, color: "#C62828" },
    { label: "Délai trop long", pct: 30, color: "#E65100" },
    { label: "Autre", pct: 10, color: "#9E9E9E" },
  ];
  const r = 60, cx = 80, cy = 80, stroke = 24;
  const circ = 2 * Math.PI * r;
  let offset = 0;
  const slices = data.map((d) => {
    const dash = (d.pct / 100) * circ;
    const s = { dash, offset };
    offset += dash;
    return s;
  });
  return (
    <div className="flex flex-col sm:flex-row items-center gap-6">
      <svg width={160} height={160} viewBox="0 0 160 160">
        {data.map((d, i) => (
          <circle
            key={d.label}
            cx={cx} cy={cy} r={r}
            fill="none"
            stroke={d.color}
            strokeWidth={stroke}
            strokeDasharray={`${slices[i].dash} ${circ - slices[i].dash}`}
            strokeDashoffset={-slices[i].offset + circ / 4}
            style={{ transition: "stroke-dashoffset 0.3s" }}
          />
        ))}
        <text x={cx} y={cy - 6} textAnchor="middle" fontSize={18} fontWeight={700} fill="#212121">2</text>
        <text x={cx} y={cy + 10} textAnchor="middle" fontSize={10} fill="#757575">refus</text>
      </svg>
      <div className="flex flex-col gap-2">
        {data.map((d) => (
          <div key={d.label} className="flex items-center gap-2 text-sm">
            <span className="w-3 h-3 rounded-sm flex-shrink-0" style={{ background: d.color }} />
            <span className="text-gray-700">{d.label}</span>
            <span className="ml-auto font-semibold text-gray-900 tabular-nums">{d.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── PAGE ──────────────────────────────────────────────── */
const TABS = ["Devis", "Créer un devis", "Statistiques"];

export default function DevisPage() {
  const [activeTab, setActiveTab] = useState("Devis");

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Topbar title="Devis & Offres commerciales" breadcrumb={["Commerce", "Devis"]} />

      <main className="flex-1 p-6 space-y-6">

        {/* KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {kpis.map((k) => {
            const Icon = k.icon;
            return (
              <div key={k.label} className="rounded-2xl border border-gray-100 bg-white p-5 flex flex-col gap-3 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-500">{k.label}</span>
                  <span className="rounded-xl p-2 flex items-center justify-center" style={{ background: k.iconBg, color: k.iconColor }}>
                    <Icon size={18} />
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

        {/* Tabs */}
        <div className="flex gap-1.5 flex-wrap">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="px-4 py-1.5 rounded-full text-xs font-medium transition-colors"
              style={activeTab === tab ? { background: "#2E7D32", color: "#fff" } : { background: "#F5F5F5", color: "#757575" }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ═══ ONGLET : DEVIS ═══ */}
        {activeTab === "Devis" && (
          <div className="rounded-2xl border border-gray-100 bg-white shadow-sm">
            {/* Filtres */}
            <div className="flex flex-col sm:flex-row gap-2 px-5 py-4 border-b border-gray-100">
              <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-1.5 bg-gray-50 flex-1">
                <Search size={13} className="text-gray-400" />
                <input type="text" placeholder="Rechercher un devis…" className="text-xs bg-transparent outline-none text-gray-600 flex-1 placeholder-gray-400" />
              </div>
              {["Statut", "Client", "Produit", "Période"].map((f) => (
                <button key={f} className="flex items-center gap-1 border border-gray-200 rounded-lg text-xs text-gray-600 px-3 py-1.5 hover:bg-gray-50">
                  <Filter size={12} /> {f}
                </button>
              ))}
              <button className="flex items-center gap-1.5 text-white rounded-xl text-xs font-medium px-4 py-1.5 ml-auto" style={{ background: "#2E7D32" }}>
                <Plus size={13} /> Nouveau devis
              </button>
            </div>

            {/* Tableau */}
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr style={{ background: "#F8FBF8" }}>
                    {["N° Devis","Date","Client","Produits","Quantité","Montant (XOF)","Validité","Statut","Actions"].map((c) => (
                      <th key={c} className="text-left text-gray-500 font-semibold px-4 py-3 whitespace-nowrap">{c}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {devisList.map((d) => (
                    <tr key={d.numero} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 font-mono font-semibold whitespace-nowrap" style={{ color: "#6A1B9A" }}>{d.numero}</td>
                      <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{d.date}</td>
                      <td className="px-4 py-3 font-medium text-gray-800 whitespace-nowrap">{d.client}</td>
                      <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{d.produit}</td>
                      <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{d.qte}</td>
                      <td className="px-4 py-3 font-semibold text-gray-900 whitespace-nowrap tabular-nums text-right">{d.montant.toLocaleString("fr-FR")}</td>
                      <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{d.validite}</td>
                      <td className="px-4 py-3 whitespace-nowrap"><StatutBadge d={d} /></td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center gap-1">
                          {d.actions.includes("Voir") && (
                            <button className="border border-gray-200 text-gray-600 rounded-lg text-xs px-2 py-1 hover:bg-gray-50 flex items-center gap-1">
                              <Eye size={11} /> Voir
                            </button>
                          )}
                          {d.actions.includes("PDF") && (
                            <button className="border border-gray-200 text-gray-600 rounded-lg text-xs px-2 py-1 hover:bg-gray-50 flex items-center gap-1">
                              <FileDown size={11} /> PDF
                            </button>
                          )}
                          {d.actions.includes("Relancer") && (
                            <button className="border border-orange-200 text-orange-600 rounded-lg text-xs px-2 py-1 hover:bg-orange-50 flex items-center gap-1">
                              <RefreshCw size={11} /> Relancer
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ═══ ONGLET : CRÉER UN DEVIS ═══ */}
        {activeTab === "Créer un devis" && (
          <div className="space-y-5">

            {/* Informations client */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Informations client</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-medium text-gray-500">Client *</label>
                  <select className="border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-700 bg-white outline-none focus:border-green-400">
                    <option value="">— Sélectionner un client —</option>
                    <option>Barry Callebaut CI</option>
                    <option>Cargill Rotterdam</option>
                    <option>Olam International</option>
                    <option>Nestlé CI</option>
                    <option>Touton SA</option>
                    <option>SIPEF Trading</option>
                    <option>Maison JACQ-VABRE</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-medium text-gray-500">Contact client</label>
                  <input type="text" placeholder="Nom du contact" className="border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-700 outline-none focus:border-green-400" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-medium text-gray-500">Email</label>
                  <input type="email" placeholder="contact@client.com" className="border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-700 outline-none focus:border-green-400" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-medium text-gray-500">Référence client (optionnel)</label>
                  <input type="text" placeholder="REF-CLIENT-XXX" className="border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-700 outline-none focus:border-green-400" />
                </div>
              </div>
            </div>

            {/* Produits */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Produits</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr style={{ background: "#F8FBF8" }}>
                      {["#","Produit","Grade","Quantité (kg)","Prix unit. (XOF/kg)","Montant",""].map((c) => (
                        <th key={c} className="text-left text-gray-500 font-semibold px-4 py-2.5 whitespace-nowrap">{c}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    <tr>
                      <td className="px-4 py-3 text-gray-400">1</td>
                      <td className="px-4 py-3 text-gray-700">Cacao naturel fermenté séché</td>
                      <td className="px-4 py-3"><span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700">Grade AA</span></td>
                      <td className="px-4 py-3 tabular-nums text-gray-900 font-medium">20 000</td>
                      <td className="px-4 py-3 tabular-nums text-gray-900">1 100</td>
                      <td className="px-4 py-3 tabular-nums font-semibold text-gray-900">22 000 000 XOF</td>
                      <td className="px-4 py-3"><button className="text-red-400 hover:text-red-600"><Trash2 size={14} /></button></td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-gray-400">2</td>
                      <td className="px-4 py-3 text-gray-700">Cacao naturel fermenté séché</td>
                      <td className="px-4 py-3"><span className="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">Grade A</span></td>
                      <td className="px-4 py-3 tabular-nums text-gray-900 font-medium">10 000</td>
                      <td className="px-4 py-3 tabular-nums text-gray-900">1 040</td>
                      <td className="px-4 py-3 tabular-nums font-semibold text-gray-900">10 400 000 XOF</td>
                      <td className="px-4 py-3"><button className="text-red-400 hover:text-red-600"><Trash2 size={14} /></button></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <button className="mt-3 flex items-center gap-1.5 text-xs font-medium text-green-700 border border-dashed border-green-300 rounded-lg px-3 py-2 hover:bg-green-50 transition-colors">
                <Plus size={13} /> Ajouter une ligne
              </button>
            </div>

            {/* Conditions commerciales */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Conditions commerciales</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-medium text-gray-500">Incoterm</label>
                  <select className="border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-700 bg-white outline-none focus:border-green-400">
                    <option>FOB San-Pédro</option>
                    <option>EXW Soubré</option>
                    <option>CFR Rotterdam</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-medium text-gray-500">Devise</label>
                  <select className="border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-700 bg-white outline-none focus:border-green-400">
                    <option>XOF</option>
                    <option>USD</option>
                    <option>EUR</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-medium text-gray-500">Délai de livraison</label>
                  <input type="text" defaultValue="30 jours après confirmation" className="border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-700 outline-none focus:border-green-400" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-medium text-gray-500">Validité du devis</label>
                  <input type="date" defaultValue="2025-07-29" className="border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-700 outline-none focus:border-green-400" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-medium text-gray-500">Conditions de paiement</label>
                  <select className="border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-700 bg-white outline-none focus:border-green-400">
                    <option>30% à la commande — 70% à la livraison</option>
                    <option>100% à la livraison</option>
                    <option>30 jours net</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1 sm:col-span-2 xl:col-span-1">
                  <label className="text-xs font-medium text-gray-500">Notes / Commentaires</label>
                  <textarea rows={2} placeholder="Informations complémentaires…" className="border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-700 outline-none focus:border-green-400 resize-none" />
                </div>
              </div>
            </div>

            {/* Récapitulatif */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Récapitulatif</h3>
              <div className="flex flex-col items-end gap-2 text-sm">
                <div className="flex justify-between w-full max-w-xs text-gray-600">
                  <span>Sous-total</span>
                  <span className="tabular-nums font-medium text-gray-800">32 400 000 XOF</span>
                </div>
                <div className="flex justify-between w-full max-w-xs text-gray-400 text-xs">
                  <span>TVA (0% — export hors TVA)</span>
                  <span className="tabular-nums">0 XOF</span>
                </div>
                <div className="flex justify-between w-full max-w-xs border-t border-gray-100 pt-2 font-bold text-base text-gray-900">
                  <span>Total HT</span>
                  <span className="tabular-nums" style={{ color: "#2E7D32" }}>32 400 000 XOF</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-5 justify-end">
                <button className="border border-gray-200 text-gray-600 rounded-xl text-xs font-medium px-4 py-2 hover:bg-gray-50">
                  Enregistrer brouillon
                </button>
                <button className="border border-gray-200 text-gray-600 rounded-xl text-xs font-medium px-4 py-2 hover:bg-gray-50 flex items-center gap-1.5">
                  <FileDown size={13} /> Générer PDF
                </button>
                <button className="text-white rounded-xl text-xs font-medium px-4 py-2 flex items-center gap-1.5" style={{ background: "#2E7D32" }}>
                  Envoyer par email
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ═══ ONGLET : STATISTIQUES ═══ */}
        {activeTab === "Statistiques" && (
          <div className="space-y-5">

            {/* KPI perf */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: "Taux de conversion", value: "72%", sub: "9/12 devis répondus acceptés" },
                { label: "Délai moyen réponse client", value: "8,4 j", sub: "Tous clients confondus" },
                { label: "Montant moyen devis accepté", value: "21,8 M XOF", sub: "Période 2025" },
              ].map((s) => (
                <div key={s.label} className="rounded-2xl border border-gray-100 bg-white p-5 flex flex-col gap-2 shadow-sm">
                  <span className="text-xs text-gray-500 font-medium">{s.label}</span>
                  <span className="text-2xl font-bold text-gray-900">{s.value}</span>
                  <span className="text-xs text-gray-400">{s.sub}</span>
                </div>
              ))}
            </div>

            {/* Donut */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Raisons de refus</h3>
              <DonutChart />
            </div>

            {/* Top clients */}
            <div className="rounded-2xl border border-gray-100 bg-white shadow-sm">
              <div className="px-5 py-4 border-b border-gray-100">
                <h3 className="text-sm font-semibold text-gray-900">Top clients par montant devis accepté</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr style={{ background: "#F8FBF8" }}>
                      {["Client","Nb devis acceptés","Montant total","Taux acceptation"].map((c) => (
                        <th key={c} className="text-left text-gray-500 font-semibold px-4 py-3 whitespace-nowrap">{c}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {[
                      { client: "Barry Callebaut", nb: 3, montant: "75,8 M XOF", taux: "100%" },
                      { client: "Cargill", nb: 2, montant: "47,5 M XOF", taux: "100%" },
                      { client: "Nestlé CI", nb: 2, montant: "49,5 M XOF", taux: "100%" },
                      { client: "Olam", nb: 1, montant: "33 M XOF", taux: "50% (1 en attente)" },
                    ].map((r) => (
                      <tr key={r.client} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 font-medium text-gray-800">{r.client}</td>
                        <td className="px-4 py-3 text-center text-gray-700 font-semibold">{r.nb}</td>
                        <td className="px-4 py-3 tabular-nums font-semibold text-gray-900">{r.montant}</td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-0.5 rounded-full text-xs font-medium" style={{ background: r.taux.startsWith("100") ? "#E8F5E9" : "#FFF3E0", color: r.taux.startsWith("100") ? "#2E7D32" : "#E65100" }}>
                            {r.taux}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
