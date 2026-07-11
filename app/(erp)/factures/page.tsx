"use client";

import { useState } from "react";
import {
  FileText, CheckCircle, Clock, AlertTriangle, TrendingUp,
  Search, Filter, Eye, Mail, RefreshCw,
} from "lucide-react";
import Topbar from "../../components/Topbar";

/* ─── KPIs ─────────────────────────────────────────────── */
const kpis = [
  { label: "Factures 2025", value: "48", unit: "", sub: "Depuis janvier 2025", icon: FileText, iconColor: "#6A1B9A", iconBg: "#F3E5F5" },
  { label: "CA facturé", value: "145,2 M", unit: "XOF", sub: "Exercice 2025", icon: TrendingUp, iconColor: "#2E7D32", iconBg: "#E8F5E9" },
  { label: "Encaissé", value: "118,6 M", unit: "XOF", sub: "81,7% du CA", icon: CheckCircle, iconColor: "#1565C0", iconBg: "#E3F2FD" },
  { label: "En attente", value: "26,6 M", unit: "XOF", sub: "18,3% du CA", icon: Clock, iconColor: "#E65100", iconBg: "#FFF3E0" },
  { label: "Retard > 30j", value: "2", unit: "factures", sub: "Action requise", icon: AlertTriangle, iconColor: "#C62828", iconBg: "#FFEBEE" },
];

/* ─── DONNÉES FACTURES ──────────────────────────────────── */
type StatutFac = "Émise" | "À relancer" | "Partiel" | "Payé";

interface Facture {
  numero: string;
  date: string;
  client: string;
  produit: string;
  montantHT: number;
  echeance: string;
  encaisse: number;
  reste: number;
  statut: StatutFac;
}

const factures: Facture[] = [
  { numero: "FAC-2025-048", date: "10/07/2025", client: "Barry Callebaut", produit: "Cacao AA 25t", montantHT: 27390000, echeance: "10/08/2025", encaisse: 0, reste: 27390000, statut: "Émise" },
  { numero: "FAC-2025-047", date: "30/06/2025", client: "Nestlé CI", produit: "Cacao AA 20t+A15t", montantHT: 54320000, echeance: "30/07/2025", encaisse: 0, reste: 54320000, statut: "Émise" },
  { numero: "FAC-2025-046", date: "20/06/2025", client: "Jacobs Douwe Eg.", produit: "Cacao AA 10t", montantHT: 11200000, echeance: "20/07/2025", encaisse: 0, reste: 11200000, statut: "Émise" },
  { numero: "FAC-2025-045", date: "15/06/2025", client: "Touton SA", produit: "Cacao A 15t", montantHT: 15600000, echeance: "15/07/2025", encaisse: 0, reste: 15600000, statut: "À relancer" },
  { numero: "FAC-2025-044", date: "01/06/2025", client: "Olam CI", produit: "Cacao AA 30t", montantHT: 33000000, echeance: "01/07/2025", encaisse: 18240000, reste: 14760000, statut: "Partiel" },
  { numero: "FAC-2025-043", date: "15/05/2025", client: "Barry Callebaut", produit: "Cacao A 18t", montantHT: 18720000, echeance: "15/06/2025", encaisse: 18720000, reste: 0, statut: "Payé" },
  { numero: "FAC-2025-042", date: "01/05/2025", client: "Cargill", produit: "Anacarde 12t", montantHT: 8160000, echeance: "01/06/2025", encaisse: 8160000, reste: 0, statut: "Payé" },
  { numero: "FAC-2025-041", date: "15/04/2025", client: "Olam International", produit: "Cacao AA 30t", montantHT: 33000000, echeance: "15/05/2025", encaisse: 33000000, reste: 0, statut: "Payé" },
  { numero: "FAC-2025-040", date: "01/04/2025", client: "Nestlé CI", produit: "Anacarde 8t", montantHT: 5440000, echeance: "01/05/2025", encaisse: 5440000, reste: 0, statut: "Payé" },
  { numero: "FAC-2025-039", date: "15/03/2025", client: "Cargill", produit: "Cacao AA 22t", montantHT: 24200000, echeance: "15/04/2025", encaisse: 24200000, reste: 0, statut: "Payé" },
  { numero: "FAC-2025-038", date: "01/03/2025", client: "Barry Callebaut", produit: "Cacao AA 20t", montantHT: 21600000, echeance: "01/04/2025", encaisse: 21600000, reste: 0, statut: "Payé" },
  { numero: "FAC-2025-037", date: "15/02/2025", client: "Touton SA", produit: "Cacao A 10t", montantHT: 10400000, echeance: "15/03/2025", encaisse: 10400000, reste: 0, statut: "Payé" },
  { numero: "FAC-2025-036", date: "01/02/2025", client: "Olam CI", produit: "Anacarde WW240 15t", montantHT: 10200000, echeance: "01/03/2025", encaisse: 10200000, reste: 0, statut: "Payé" },
  { numero: "FAC-2025-035", date: "15/01/2025", client: "Nestlé CI", produit: "Cacao AA 18t", montantHT: 19800000, echeance: "15/02/2025", encaisse: 19800000, reste: 0, statut: "Payé" },
  { numero: "FAC-2025-034", date: "01/01/2025", client: "Cargill Rotterdam", produit: "Cacao Grade AA 20t", montantHT: 22000000, echeance: "01/02/2025", encaisse: 22000000, reste: 0, statut: "Payé" },
];

const statutFacConfig: Record<StatutFac, { bg: string; text: string }> = {
  "Émise":      { bg: "#E3F2FD", text: "#1565C0" },
  "À relancer": { bg: "#FFF3E0", text: "#E65100" },
  "Partiel":    { bg: "#F3E5F5", text: "#6A1B9A" },
  "Payé":       { bg: "#E8F5E9", text: "#2E7D32" },
};

function fmt(n: number) {
  return n === 0 ? "—" : n.toLocaleString("fr-FR");
}

/* ─── SVG BAR CHART ─────────────────────────────────────── */
function BarChart() {
  const data = [
    { month: "Jan", val: 42.4 },
    { month: "Fév", val: 18.2 },
    { month: "Mar", val: 28.6 },
    { month: "Avr", val: 28.8 },
    { month: "Mai", val: 31.6 },
    { month: "Jun", val: 38.6 },
  ];
  const max = 50;
  const W = 480, H = 160, pad = 40, barW = 48, gap = (W - pad * 2 - barW * data.length) / (data.length - 1);

  return (
    <svg viewBox={`0 0 ${W} ${H + 30}`} className="w-full" style={{ maxHeight: 220 }}>
      {data.map((d, i) => {
        const x = pad + i * (barW + gap);
        const barH = (d.val / max) * H;
        const y = H - barH;
        return (
          <g key={d.month}>
            <rect x={x} y={y} width={barW} height={barH} rx={6} fill="#2E7D32" opacity={0.85} />
            <text x={x + barW / 2} y={y - 4} textAnchor="middle" fontSize={10} fill="#2E7D32" fontWeight={600}>
              {d.val}M
            </text>
            <text x={x + barW / 2} y={H + 18} textAnchor="middle" fontSize={11} fill="#9E9E9E">
              {d.month}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/* ─── TABS ──────────────────────────────────────────────── */
const TABS = ["Factures", "Encaissements", "Relances", "Statistiques"];

export default function FacturesPage() {
  const [activeTab, setActiveTab] = useState("Factures");

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Topbar title="Factures & Encaissements" breadcrumb={["Commerce", "Factures"]} />

      <main className="flex-1 p-6 space-y-6">

        {/* KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
          {kpis.map((k) => {
            const Icon = k.icon;
            return (
              <div key={k.label} className="rounded-2xl border border-gray-100 bg-white p-5 flex flex-col gap-3 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-500">{k.label}</span>
                  <span className="rounded-xl p-2 flex items-center justify-center" style={{ background: k.iconBg, color: k.iconColor }}>
                    <Icon size={16} />
                  </span>
                </div>
                <div className="flex items-end gap-1">
                  <span className="text-xl font-bold text-gray-900">{k.value}</span>
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

        {/* ═══ ONGLET : FACTURES ═══ */}
        {activeTab === "Factures" && (
          <div className="space-y-5">
            <div className="rounded-2xl border border-gray-100 bg-white shadow-sm">
              {/* Filtres */}
              <div className="flex flex-col sm:flex-row gap-2 px-5 py-4 border-b border-gray-100">
                <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-1.5 bg-gray-50 flex-1">
                  <Search size={13} className="text-gray-400" />
                  <input type="text" placeholder="Rechercher une facture…" className="text-xs bg-transparent outline-none text-gray-600 flex-1 placeholder-gray-400" />
                </div>
                {["Statut", "Client", "Mois", "Montant min"].map((f) => (
                  <button key={f} className="flex items-center gap-1 border border-gray-200 rounded-lg text-xs text-gray-600 px-3 py-1.5 hover:bg-gray-50">
                    <Filter size={12} /> {f}
                  </button>
                ))}
              </div>

              {/* Tableau */}
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr style={{ background: "#F8FBF8" }}>
                      {["N° Facture","Date","Client","Produit","Montant HT","Échéance","Encaissé","Reste","Statut","Actions"].map((c) => (
                        <th key={c} className="text-left text-gray-500 font-semibold px-4 py-3 whitespace-nowrap">{c}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {factures.map((f) => {
                      const s = statutFacConfig[f.statut];
                      return (
                        <tr key={f.numero} className="hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-3 font-mono font-semibold whitespace-nowrap" style={{ color: "#2E7D32" }}>{f.numero}</td>
                          <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{f.date}</td>
                          <td className="px-4 py-3 font-medium text-gray-800 whitespace-nowrap">{f.client}</td>
                          <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{f.produit}</td>
                          <td className="px-4 py-3 tabular-nums font-semibold text-gray-900 whitespace-nowrap text-right">{f.montantHT.toLocaleString("fr-FR")}</td>
                          <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{f.echeance}</td>
                          <td className="px-4 py-3 tabular-nums text-gray-700 whitespace-nowrap text-right">{fmt(f.encaisse)}</td>
                          <td className="px-4 py-3 tabular-nums text-gray-900 whitespace-nowrap text-right font-medium">{fmt(f.reste)}</td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium" style={{ background: s.bg, color: s.text }}>
                              {f.statut}
                            </span>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="flex items-center gap-1">
                              <button className="border border-gray-200 text-gray-600 rounded-lg text-xs px-2 py-1 hover:bg-gray-50 flex items-center gap-1">
                                <Eye size={11} /> Voir
                              </button>
                              {(f.statut === "À relancer" || f.statut === "Partiel") && (
                                <button className="border border-orange-200 text-orange-600 rounded-lg text-xs px-2 py-1 hover:bg-orange-50 flex items-center gap-1">
                                  <Mail size={11} /> Rappel
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

            {/* Détail FAC-2025-048 */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <span className="font-mono font-bold text-sm" style={{ color: "#2E7D32" }}>FAC-2025-048</span>
                <span className="text-gray-400 text-xs">— Détail facture (dépliable)</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 text-xs text-gray-600">
                <div>
                  <p className="font-semibold text-gray-800">Barry Callebaut CI</p>
                  <p>BP 1234, Abidjan</p>
                  <p>RCCM : 2018-B-14872</p>
                </div>
                <div>
                  <p><span className="text-gray-400">Lot :</span> LOT-2025-045</p>
                  <p><span className="text-gray-400">Origine :</span> PAR-A1 (Soubré Nord)</p>
                  <p><span className="text-gray-400">Certif. RA :</span> n° C-CI-2025-1847</p>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr style={{ background: "#F8FBF8" }}>
                      {["Description","Qté","PU (XOF)","Montant (XOF)"].map((c) => (
                        <th key={c} className="text-left text-gray-500 font-semibold px-4 py-2.5">{c}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    <tr>
                      <td className="px-4 py-3 text-gray-700">Cacao naturel fermenté séché Grade AA — Récolte CI 2025</td>
                      <td className="px-4 py-3 tabular-nums text-gray-800">24 900 kg</td>
                      <td className="px-4 py-3 tabular-nums text-gray-800">1 100</td>
                      <td className="px-4 py-3 tabular-nums font-semibold text-gray-900">27 390 000</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-gray-500">Frais d'inspection phytosanitaire MINADER</td>
                      <td className="px-4 py-3 text-gray-400">forfait</td>
                      <td className="px-4 py-3 text-gray-400">—</td>
                      <td className="px-4 py-3 text-gray-400">0</td>
                    </tr>
                    <tr style={{ background: "#F8FBF8" }}>
                      <td className="px-4 py-2.5 font-semibold text-gray-700" colSpan={3}>Total HT</td>
                      <td className="px-4 py-2.5 font-bold text-gray-900 tabular-nums">27 390 000 XOF</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-gray-400" colSpan={3}>TVA 0% (export)</td>
                      <td className="px-4 py-2 text-gray-400 tabular-nums">0 XOF</td>
                    </tr>
                    <tr style={{ background: "#E8F5E9" }}>
                      <td className="px-4 py-2.5 font-bold text-gray-900" colSpan={3}>NET À PAYER</td>
                      <td className="px-4 py-2.5 font-bold tabular-nums" style={{ color: "#2E7D32" }}>27 390 000 XOF</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-gray-400 mt-3">Conditions : FOB San-Pédro | 30 jours net | Virement BICICI CI 0012 01847 00204847421 01</p>
            </div>
          </div>
        )}

        {/* ═══ ONGLET : ENCAISSEMENTS ═══ */}
        {activeTab === "Encaissements" && (
          <div className="space-y-5">

            {/* À venir */}
            <div className="rounded-2xl border border-gray-100 bg-white shadow-sm">
              <div className="px-5 py-4 border-b border-gray-100">
                <h3 className="text-sm font-semibold text-gray-900">Encaissements à venir</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr style={{ background: "#F8FBF8" }}>
                      {["Facture","Client","Montant attendu (XOF)","Échéance","Jours restants","Probabilité"].map((c) => (
                        <th key={c} className="text-left text-gray-500 font-semibold px-4 py-3 whitespace-nowrap">{c}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {[
                      { fac: "FAC-2025-047", client: "Nestlé CI", montant: "54 320 000", ech: "30/07/2025", jours: "19 j", prob: "Haute", probColor: "#2E7D32", probBg: "#E8F5E9" },
                      { fac: "FAC-2025-048", client: "Barry Callebaut", montant: "27 390 000", ech: "10/08/2025", jours: "30 j", prob: "Haute", probColor: "#2E7D32", probBg: "#E8F5E9" },
                      { fac: "FAC-2025-046", client: "Jacobs D.E.", montant: "11 200 000", ech: "20/07/2025", jours: "9 j", prob: "Moyen (premier client)", probColor: "#E65100", probBg: "#FFF3E0" },
                      { fac: "FAC-2025-045", client: "Touton SA", montant: "15 600 000", ech: "15/07/2025", jours: "4 j", prob: "Relancer", probColor: "#E65100", probBg: "#FFF3E0" },
                      { fac: "FAC-2025-044 (solde)", client: "Olam CI", montant: "14 760 000", ech: "01/07/2025", jours: "⚠ -10 j EN RETARD", prob: "EN RETARD", probColor: "#C62828", probBg: "#FFEBEE" },
                    ].map((r) => (
                      <tr key={r.fac} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 font-mono font-semibold" style={{ color: "#2E7D32" }}>{r.fac}</td>
                        <td className="px-4 py-3 font-medium text-gray-800 whitespace-nowrap">{r.client}</td>
                        <td className="px-4 py-3 tabular-nums font-semibold text-gray-900">{r.montant}</td>
                        <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{r.ech}</td>
                        <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{r.jours}</td>
                        <td className="px-4 py-3">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium" style={{ background: r.probBg, color: r.probColor }}>
                            {r.prob}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Reçus ce mois */}
            <div className="rounded-2xl border border-gray-100 bg-white shadow-sm">
              <div className="px-5 py-4 border-b border-gray-100">
                <h3 className="text-sm font-semibold text-gray-900">Encaissements reçus ce mois (juillet 2025)</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr style={{ background: "#F8FBF8" }}>
                      {["Date","Client","Facture","Montant (XOF)","Banque"].map((c) => (
                        <th key={c} className="text-left text-gray-500 font-semibold px-4 py-3 whitespace-nowrap">{c}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    <tr className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-gray-500">07/07/2025</td>
                      <td className="px-4 py-3 font-medium text-gray-800">Olam CI</td>
                      <td className="px-4 py-3 font-mono text-green-700">FAC-044 partiel</td>
                      <td className="px-4 py-3 tabular-nums font-semibold text-gray-900">18 240 000</td>
                      <td className="px-4 py-3 text-gray-500">BICICI CI</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-gray-500">05/07/2025</td>
                      <td className="px-4 py-3 font-medium text-gray-800">Nestlé CI</td>
                      <td className="px-4 py-3 font-mono text-green-700">FAC-040</td>
                      <td className="px-4 py-3 tabular-nums font-semibold text-gray-900">5 440 000</td>
                      <td className="px-4 py-3 text-gray-500">BICICI CI</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ═══ ONGLET : RELANCES ═══ */}
        {activeTab === "Relances" && (
          <div className="space-y-5">

            {/* Factures à relancer */}
            <div className="space-y-3">
              <div className="rounded-2xl border border-red-100 bg-red-50 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <AlertTriangle size={18} className="text-red-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-red-800">FAC-2025-044 — Olam CI</p>
                    <p className="text-xs text-red-600 mt-0.5">14 760 000 XOF — Retard 10 jours — 2ème relance à envoyer</p>
                  </div>
                </div>
                <button className="flex items-center gap-1.5 text-white rounded-xl text-xs font-medium px-4 py-2 flex-shrink-0" style={{ background: "#C62828" }}>
                  <Mail size={13} /> Envoyer relance
                </button>
              </div>
              <div className="rounded-2xl border border-orange-100 bg-orange-50 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <Clock size={18} className="text-orange-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-orange-800">FAC-2025-045 — Touton SA</p>
                    <p className="text-xs text-orange-600 mt-0.5">15 600 000 XOF — Échéance dans 4 jours — Relance préventive</p>
                  </div>
                </div>
                <button className="flex items-center gap-1.5 text-white rounded-xl text-xs font-medium px-4 py-2 flex-shrink-0" style={{ background: "#E65100" }}>
                  <Mail size={13} /> Relance préventive
                </button>
              </div>
            </div>

            {/* Journal */}
            <div className="rounded-2xl border border-gray-100 bg-white shadow-sm">
              <div className="px-5 py-4 border-b border-gray-100">
                <h3 className="text-sm font-semibold text-gray-900">Journal des relances</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr style={{ background: "#F8FBF8" }}>
                      {["Facture","Client","Type relance","Envoyée le","Voie","Suite"].map((c) => (
                        <th key={c} className="text-left text-gray-500 font-semibold px-4 py-3 whitespace-nowrap">{c}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {[
                      { fac: "FAC-044", client: "Olam CI", type: "1ère relance", date: "03/07/2025", voie: "Email", suite: "En attente réponse" },
                      { fac: "FAC-044", client: "Olam CI", type: "Rappel", date: "08/07/2025", voie: "Tel", suite: "Paiement annoncé 15/07" },
                      { fac: "FAC-045", client: "Touton SA", type: "Relance préventive", date: "09/07/2025", voie: "Email", suite: "— (envoyée auto)" },
                    ].map((r, idx) => (
                      <tr key={idx} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 font-mono font-semibold text-green-700">{r.fac}</td>
                        <td className="px-4 py-3 font-medium text-gray-800">{r.client}</td>
                        <td className="px-4 py-3 text-gray-700">{r.type}</td>
                        <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{r.date}</td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">{r.voie}</span>
                        </td>
                        <td className="px-4 py-3 text-gray-600">{r.suite}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ═══ ONGLET : STATISTIQUES ═══ */}
        {activeTab === "Statistiques" && (
          <div className="space-y-5">

            {/* DSO */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <h3 className="text-sm font-semibold text-gray-900 mb-2">DSO (Days Sales Outstanding)</h3>
              <div className="flex items-center gap-3 mt-3">
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-gray-900">18,4 <span className="text-base font-medium text-gray-400">jours</span></span>
                  <span className="text-xs text-gray-400 mt-1">DSO moyen 2025</span>
                </div>
                <span className="ml-4 px-3 py-1.5 rounded-full text-xs font-medium" style={{ background: "#E8F5E9", color: "#2E7D32" }}>
                  Objectif &lt; 21 jours ✓
                </span>
              </div>
            </div>

            {/* Bar chart */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">CA encaissé par mois — 2025 (M XOF)</h3>
              <BarChart />
            </div>

            {/* Top clients */}
            <div className="rounded-2xl border border-gray-100 bg-white shadow-sm">
              <div className="px-5 py-4 border-b border-gray-100">
                <h3 className="text-sm font-semibold text-gray-900">Top 5 clients par CA facturé 2025</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr style={{ background: "#F8FBF8" }}>
                      {["Client","CA facturé","Encaissé","Restant","DSO moyen"].map((c) => (
                        <th key={c} className="text-left text-gray-500 font-semibold px-4 py-3 whitespace-nowrap">{c}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {[
                      { client: "Barry Callebaut", ca: "46,1 M", enc: "18,7 M", rest: "27,4 M", dso: "14 j" },
                      { client: "Cargill", ca: "35,2 M", enc: "35,2 M", rest: "0", dso: "12 j" },
                      { client: "Olam", ca: "65,4 M", enc: "50,6 M", rest: "14,8 M", dso: "22 j" },
                      { client: "Nestlé", ca: "38,6 M", enc: "27,4 M", rest: "11,2 M", dso: "18 j" },
                      { client: "Touton", ca: "18,2 M", enc: "2,6 M", rest: "15,6 M", dso: "28 j" },
                    ].map((r) => (
                      <tr key={r.client} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 font-medium text-gray-800">{r.client}</td>
                        <td className="px-4 py-3 tabular-nums font-semibold text-gray-900">{r.ca}</td>
                        <td className="px-4 py-3 tabular-nums text-green-700 font-medium">{r.enc}</td>
                        <td className="px-4 py-3 tabular-nums text-gray-600">{r.rest === "0" ? "—" : r.rest}</td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-0.5 rounded-full text-xs font-medium"
                            style={{ background: parseInt(r.dso) > 21 ? "#FFEBEE" : "#E8F5E9", color: parseInt(r.dso) > 21 ? "#C62828" : "#2E7D32" }}>
                            {r.dso}
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
