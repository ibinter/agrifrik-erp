"use client";

import { useState } from "react";
import Topbar from "../../components/Topbar";

/* ─── Data ─────────────────────────────────────────────── */

const stocksProduction = [
  { produit: "Cacao Grade A", entrepot: "Entrepôt A — Zone 2", qte: 12450, unite: "kg", cu: 1100, valeur: 13695000, pct: "5,8%", methode: "CMUP", maj: "09/07" },
  { produit: "Anacarde brut", entrepot: "Entrepôt A — Zone 3", qte: 8420, unite: "kg", cu: 380, valeur: 3199600, pct: "1,4%", methode: "CMUP", maj: "07/07" },
  { produit: "Cacao Grade B", entrepot: "Entrepôt B", qte: 4280, unite: "kg", cu: 950, valeur: 4066000, pct: "1,7%", methode: "CMUP", maj: "07/07" },
  { produit: "Riz blanchi (LOT-015)", entrepot: "Entrepôt B", qte: 1458, unite: "kg", cu: 220, valeur: 320760, pct: "0,1%", methode: "FIFO", maj: "04/07" },
  { produit: "Bananiers plantain", entrepot: "Entrepôt Frais", qte: 4520, unite: "kg", cu: 180, valeur: 813600, pct: "0,3%", methode: "FIFO", maj: "09/07" },
  { produit: "Anacarde décortiqué WW240", entrepot: "Entrepôt A — Zone 4", qte: 840, unite: "kg", cu: 680, valeur: 571200, pct: "0,2%", methode: "CMUP", maj: "06/07" },
];

const intrants = [
  { ref: "INT-001", designation: "NPK 20-10-10", categorie: "Engrais", entrepot: "Magasin Intrants", qte: 380, unite: "kg", valeur: 456000, seuil: "200 kg", statut: "Normal" },
  { ref: "INT-002", designation: "KCl (chlorure de potassium)", categorie: "Engrais", entrepot: "Magasin Intrants", qte: 45, unite: "kg", valeur: 81000, seuil: "100 kg", statut: "Critique" },
  { ref: "INT-003", designation: "Cypermethrine 10%", categorie: "Pesticide", entrepot: "Magasin Chimique", qte: 18, unite: "L", valeur: 90000, seuil: "20 L", statut: "Faible" },
  { ref: "INT-004", designation: "Furadan 5G", categorie: "Insecticide", entrepot: "Magasin Chimique", qte: 0, unite: "kg", valeur: 0, seuil: "50 kg", statut: "Rupture" },
  { ref: "INT-005", designation: "Semences maïs certifiées", categorie: "Semences", entrepot: "Chambre froide", qte: 120, unite: "kg", valeur: 360000, seuil: "50 kg", statut: "Normal" },
  { ref: "INT-006", designation: "Sacs PP 50 kg", categorie: "Emballages", entrepot: "Zone Emballage", qte: 2400, unite: "unité", valeur: 480000, seuil: "500 u", statut: "Normal" },
];

const immobilisations = [
  { num: "IMM-001", designation: "Tracteur JD 5075E", categorie: "Matériel agri.", dateAcq: "01/03/2021", valeurBrute: 28_500_000, tauxAmort: "20%", amortCumule: 8_550_000, vnc: 19_950_000, amortAnnuel: 5_700_000, compte: "244" },
  { num: "IMM-002", designation: "Décortiqueuse SATAKE R6", categorie: "Matériel indus.", dateAcq: "15/01/2023", valeurBrute: 18_200_000, tauxAmort: "10%", amortCumule: 1_820_000, vnc: 16_380_000, amortAnnuel: 1_820_000, compte: "243" },
  { num: "IMM-003", designation: "Drone DJI Agras T40", categorie: "Matériel divers", dateAcq: "05/06/2023", valeurBrute: 12_800_000, tauxAmort: "33%", amortCumule: 4_224_000, vnc: 8_576_000, amortAnnuel: 4_224_000, compte: "244" },
  { num: "IMM-004", designation: "Camion Mercedes Atego", categorie: "Matériel transp.", dateAcq: "10/09/2018", valeurBrute: 35_000_000, tauxAmort: "20%", amortCumule: 24_500_000, vnc: 10_500_000, amortAnnuel: 7_000_000, compte: "245" },
  { num: "IMM-005", designation: "Groupe électrogène Cummins", categorie: "Matériel élec.", dateAcq: "22/04/2020", valeurBrute: 22_500_000, tauxAmort: "10%", amortCumule: 4_500_000, vnc: 18_000_000, amortAnnuel: 2_250_000, compte: "244" },
  { num: "IMM-006", designation: "Terrain agricole Soubré", categorie: "Terrain", dateAcq: "01/01/2015", valeurBrute: 85_000_000, tauxAmort: "0%", amortCumule: 0, vnc: 85_000_000, amortAnnuel: 0, compte: "22" },
  { num: "IMM-007", designation: "Bâtiment entrepôt A", categorie: "Construction", dateAcq: "15/06/2017", valeurBrute: 65_000_000, tauxAmort: "5%", amortCumule: 19_500_000, vnc: 45_500_000, amortAnnuel: 3_250_000, compte: "23" },
  { num: "IMM-008", designation: "Logiciel AGRIFRIK ERP", categorie: "Immo. incorp.", dateAcq: "01/01/2023", valeurBrute: 8_400_000, tauxAmort: "33%", amortCumule: 2_772_000, vnc: 5_628_000, amortAnnuel: 2_772_000, compte: "21" },
];

const historique = [
  { date: "01/07/2025", type: "Inventaire partiel stocks", articles: 42, ecarts: "2 écarts (+0,4 t cacao détecté)", valeurEcarts: "+440 000 XOF", validePar: "Jean-Baptiste K." },
  { date: "01/04/2025", type: "Inventaire tournant", articles: 35, ecarts: "0 écart", valeurEcarts: "—", validePar: "Adjoua M." },
  { date: "01/01/2025", type: "Inventaire annuel complet", articles: 284, ecarts: "5 écarts (-1 drone pièces, +2 rouleaux irrigat.)", valeurEcarts: "-186 000 XOF", validePar: "Jean-Baptiste K." },
];

const kpis = [
  { label: "Valeur totale inventaire", value: "235,4 M XOF", sub: "Au 09/07/2025", color: "text-emerald-600 dark:text-emerald-400" },
  { label: "Articles référencés", value: "284", sub: "Tous types confondus", color: "text-indigo-600 dark:text-indigo-400" },
  { label: "Dernière valorisation", value: "09/07/2025", sub: "Mise à jour automatique", color: "text-blue-600 dark:text-blue-400" },
  { label: "Écarts détectés", value: "3", sub: "En attente de validation", color: "text-amber-600 dark:text-amber-400" },
];

const valorisation = [
  { poste: "Stocks produits agricoles", montant: "22,7 M XOF", pct: 9.6, color: "#10b981" },
  { poste: "Stocks intrants & emballages", montant: "8,4 M XOF", pct: 3.6, color: "#6366f1" },
  { poste: "Immobilisations nettes", montant: "148,5 M XOF", pct: 63.1, color: "#3b82f6" },
  { poste: "En-cours de transformation", montant: "56,2 M XOF", pct: 23.9, color: "#f59e0b" },
];

const TABS = ["Stocks Production", "Intrants", "Immobilisations", "Historique"] as const;
type Tab = (typeof TABS)[number];

function fmt(n: number) {
  return n.toLocaleString("fr-FR");
}

function StatutBadge({ statut }: { statut: string }) {
  const map: Record<string, string> = {
    Normal: "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400",
    Faible: "bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400",
    Critique: "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400",
    Rupture: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
  };
  return (
    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${map[statut] ?? map.Normal}`}>
      {statut}
    </span>
  );
}

/* ─── Page ─────────────────────────────────────────────── */

export default function InventairePage() {
  const [activeTab, setActiveTab] = useState<Tab>("Stocks Production");

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950">
      <Topbar title="Inventaire" breadcrumb={["Finance", "Inventaire"]} />

      <main className="flex-1 p-6 space-y-6">
        {/* KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {kpis.map((k) => (
            <div key={k.label} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5 shadow-sm">
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">{k.label}</p>
              <p className={`mt-2 text-2xl font-bold ${k.color}`}>{k.value}</p>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{k.sub}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
          {/* Tab bar */}
          <div className="flex overflow-x-auto border-b border-gray-200 dark:border-gray-700">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`shrink-0 px-5 py-3 text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? "border-b-2 border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* ── Stocks Production ── */}
          {activeTab === "Stocks Production" && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-800/50">
                    {["Produit", "Entrepôt", "Quantité", "Unité", "Coût unitaire", "Valeur totale", "% Portefeuille", "Méthode", "Dernière MAJ"].map((h) => (
                      <th key={h} className="px-3 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {stocksProduction.map((s) => (
                    <tr key={s.produit} className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                      <td className="px-3 py-3 font-medium text-gray-900 dark:text-white whitespace-nowrap">{s.produit}</td>
                      <td className="px-3 py-3 text-gray-600 dark:text-gray-400 whitespace-nowrap">{s.entrepot}</td>
                      <td className="px-3 py-3 text-right tabular-nums text-gray-800 dark:text-gray-200">{fmt(s.qte)}</td>
                      <td className="px-3 py-3 text-gray-500 dark:text-gray-400">{s.unite}</td>
                      <td className="px-3 py-3 text-right tabular-nums text-gray-700 dark:text-gray-300">{fmt(s.cu)}</td>
                      <td className="px-3 py-3 text-right tabular-nums font-semibold text-emerald-700 dark:text-emerald-400">{fmt(s.valeur)}</td>
                      <td className="px-3 py-3 text-center">
                        <span className="inline-block bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-xs font-medium rounded-full px-2 py-0.5">{s.pct}</span>
                      </td>
                      <td className="px-3 py-3 text-center">
                        <span className={`inline-block text-xs font-semibold rounded px-2 py-0.5 ${s.methode === "FIFO" ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300" : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"}`}>{s.methode}</span>
                      </td>
                      <td className="px-3 py-3 text-gray-500 dark:text-gray-400 whitespace-nowrap">{s.maj}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-gray-50 dark:bg-gray-800/50 border-t-2 border-gray-200 dark:border-gray-700">
                    <td colSpan={5} className="px-3 py-3 font-semibold text-gray-700 dark:text-gray-300">Total stocks production</td>
                    <td className="px-3 py-3 text-right font-bold text-emerald-700 dark:text-emerald-400 tabular-nums">
                      {fmt(stocksProduction.reduce((s, r) => s + r.valeur, 0))}
                    </td>
                    <td colSpan={3} />
                  </tr>
                </tfoot>
              </table>
            </div>
          )}

          {/* ── Intrants ── */}
          {activeTab === "Intrants" && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-800/50">
                    {["Réf.", "Désignation", "Catégorie", "Entrepôt", "Quantité", "Unité", "Valeur (XOF)", "Seuil alerte", "Statut"].map((h) => (
                      <th key={h} className="px-3 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {intrants.map((i) => (
                    <tr key={i.ref} className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                      <td className="px-3 py-3">
                        <span className="font-mono text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded px-2 py-0.5">{i.ref}</span>
                      </td>
                      <td className="px-3 py-3 font-medium text-gray-900 dark:text-white whitespace-nowrap">{i.designation}</td>
                      <td className="px-3 py-3 text-gray-600 dark:text-gray-400 whitespace-nowrap">{i.categorie}</td>
                      <td className="px-3 py-3 text-gray-600 dark:text-gray-400 whitespace-nowrap">{i.entrepot}</td>
                      <td className="px-3 py-3 text-right tabular-nums font-medium text-gray-800 dark:text-gray-200">{fmt(i.qte)}</td>
                      <td className="px-3 py-3 text-gray-500 dark:text-gray-400">{i.unite}</td>
                      <td className="px-3 py-3 text-right tabular-nums font-semibold text-emerald-700 dark:text-emerald-400">{fmt(i.valeur)}</td>
                      <td className="px-3 py-3 text-gray-500 dark:text-gray-400 whitespace-nowrap">{i.seuil}</td>
                      <td className="px-3 py-3"><StatutBadge statut={i.statut} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* ── Immobilisations ── */}
          {activeTab === "Immobilisations" && (
            <>
              <div className="px-6 py-3 bg-indigo-50 dark:bg-indigo-900/20 border-b border-indigo-100 dark:border-indigo-800 flex items-center gap-3">
                <span className="text-sm font-medium text-indigo-700 dark:text-indigo-300">Valeur nette comptable totale :</span>
                <span className="text-lg font-bold text-indigo-700 dark:text-indigo-300">148,5 M XOF</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-800/50">
                      {["N°", "Désignation", "Catégorie", "Date acq.", "Valeur brute (XOF)", "Taux", "Amort. cumulé (XOF)", "VNC (XOF)", "Amort. annuel (XOF)", "Cte"].map((h) => (
                        <th key={h} className="px-3 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                    {immobilisations.map((imm) => (
                      <tr key={imm.num} className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                        <td className="px-3 py-3">
                          <span className="font-mono text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded px-2 py-0.5">{imm.num}</span>
                        </td>
                        <td className="px-3 py-3 font-medium text-gray-900 dark:text-white whitespace-nowrap">{imm.designation}</td>
                        <td className="px-3 py-3 text-gray-600 dark:text-gray-400 whitespace-nowrap">{imm.categorie}</td>
                        <td className="px-3 py-3 text-gray-500 dark:text-gray-400 tabular-nums whitespace-nowrap">{imm.dateAcq}</td>
                        <td className="px-3 py-3 text-right tabular-nums text-gray-800 dark:text-gray-200">{fmt(imm.valeurBrute)}</td>
                        <td className="px-3 py-3 text-center">
                          <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${imm.tauxAmort === "0%" ? "bg-gray-100 dark:bg-gray-800 text-gray-500" : imm.tauxAmort === "33%" ? "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400" : "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"}`}>{imm.tauxAmort}</span>
                        </td>
                        <td className="px-3 py-3 text-right tabular-nums text-red-600 dark:text-red-400">{imm.amortCumule === 0 ? "—" : fmt(imm.amortCumule)}</td>
                        <td className="px-3 py-3 text-right tabular-nums font-semibold text-emerald-700 dark:text-emerald-400">{fmt(imm.vnc)}</td>
                        <td className="px-3 py-3 text-right tabular-nums text-gray-600 dark:text-gray-400">{imm.amortAnnuel === 0 ? "—" : fmt(imm.amortAnnuel)}</td>
                        <td className="px-3 py-3 text-center">
                          <span className="font-mono text-xs bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded px-2 py-0.5">{imm.compte}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="bg-gray-50 dark:bg-gray-800/50 border-t-2 border-gray-200 dark:border-gray-700">
                      <td colSpan={4} className="px-3 py-3 font-semibold text-gray-700 dark:text-gray-300">Total (extrait)</td>
                      <td className="px-3 py-3 text-right font-bold text-gray-900 dark:text-white tabular-nums">{fmt(immobilisations.reduce((s, r) => s + r.valeurBrute, 0))}</td>
                      <td />
                      <td className="px-3 py-3 text-right font-bold text-red-600 dark:text-red-400 tabular-nums">{fmt(immobilisations.reduce((s, r) => s + r.amortCumule, 0))}</td>
                      <td className="px-3 py-3 text-right font-bold text-emerald-700 dark:text-emerald-400 tabular-nums">{fmt(immobilisations.reduce((s, r) => s + r.vnc, 0))}</td>
                      <td className="px-3 py-3 text-right font-bold text-gray-600 dark:text-gray-400 tabular-nums">{fmt(immobilisations.reduce((s, r) => s + r.amortAnnuel, 0))}</td>
                      <td />
                    </tr>
                  </tfoot>
                </table>
              </div>
            </>
          )}

          {/* ── Historique ── */}
          {activeTab === "Historique" && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-800/50">
                    {["Date", "Type", "Articles comptés", "Écarts", "Valeur écarts", "Validé par"].map((h) => (
                      <th key={h} className="px-3 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {historique.map((h) => (
                    <tr key={h.date} className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                      <td className="px-3 py-3 tabular-nums text-gray-600 dark:text-gray-400 whitespace-nowrap">{h.date}</td>
                      <td className="px-3 py-3 font-medium text-gray-900 dark:text-white whitespace-nowrap">{h.type}</td>
                      <td className="px-3 py-3 text-center tabular-nums text-gray-800 dark:text-gray-200">{h.articles}</td>
                      <td className="px-3 py-3 text-gray-600 dark:text-gray-400">{h.ecarts}</td>
                      <td className={`px-3 py-3 tabular-nums font-semibold whitespace-nowrap ${h.valeurEcarts.startsWith("+") ? "text-emerald-600 dark:text-emerald-400" : h.valeurEcarts.startsWith("-") ? "text-red-600 dark:text-red-400" : "text-gray-500 dark:text-gray-400"}`}>{h.valeurEcarts}</td>
                      <td className="px-3 py-3 text-gray-700 dark:text-gray-300 whitespace-nowrap">{h.validePar}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Valorisation du portefeuille */}
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-6">
          <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-1">Valorisation du portefeuille</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-5">Répartition de la valeur globale au 09/07/2025</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
            {valorisation.map((v) => (
              <div key={v.poste} className="rounded-lg border border-gray-100 dark:border-gray-800 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-block w-3 h-3 rounded-full" style={{ backgroundColor: v.color }} />
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-400">{v.poste}</span>
                </div>
                <p className="text-xl font-bold text-gray-900 dark:text-white">{v.montant}</p>
                <div className="mt-2 h-1.5 w-full rounded-full bg-gray-100 dark:bg-gray-800">
                  <div className="h-1.5 rounded-full" style={{ width: `${v.pct}%`, backgroundColor: v.color }} />
                </div>
                <p className="mt-1 text-xs text-gray-400 dark:text-gray-500 text-right">{v.pct}%</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 items-center justify-between border-t border-gray-100 dark:border-gray-800 pt-4">
            <div className="text-xs text-gray-500 dark:text-gray-400">
              <span className="text-gray-400">Créances clients :</span>{" "}
              <span className="italic">— (cf. module Comptabilité)</span>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-0.5">Total général</p>
              <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">235,8 M XOF</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
