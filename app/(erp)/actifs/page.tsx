"use client";

import { useState } from "react";
import Topbar from "../../components/Topbar";
import { AlertTriangle } from "lucide-react";

function fmt(n: number) {
  return n.toLocaleString("fr-FR") + " XOF";
}

const actifs = [
  { code: "IMM-001", designation: "Terrains — Zone A Soubré (42 ha)", categorie: "Terrain", dateAchat: "2008-2018", brute: 42000000, duree: "∞", amortAnnuel: 0, amortCumul: 0, vnc: 42000000, statut: "Actif" },
  { code: "IMM-002", designation: "Entrepôt A (500 m²)", categorie: "Bâtiment", dateAchat: "Jan 2015", brute: 12400000, duree: "20 ans", amortAnnuel: 620000, amortCumul: 6200000, vnc: 6200000, statut: "Actif" },
  { code: "IMM-003", designation: "Entrepôt B (300 m²)", categorie: "Bâtiment", dateAchat: "Mar 2018", brute: 7800000, duree: "20 ans", amortAnnuel: 390000, amortCumul: 2730000, vnc: 5070000, statut: "Actif" },
  { code: "IMM-004", designation: "Bureau Soubré (120 m²)", categorie: "Bâtiment", dateAchat: "Jun 2019", brute: 4200000, duree: "20 ans", amortAnnuel: 210000, amortCumul: 1260000, vnc: 2940000, statut: "Actif" },
  { code: "MAT-001", designation: "Tracteur JD 6120M", categorie: "Matériel", dateAchat: "Jan 2021", brute: 28400000, duree: "10 ans", amortAnnuel: 2840000, amortCumul: 11360000, vnc: 17040000, statut: "Maintenance" },
  { code: "MAT-003", designation: "Camion Renault T460", categorie: "Véhicule", dateAchat: "Mar 2022", brute: 42000000, duree: "5 ans", amortAnnuel: 8400000, amortCumul: 25200000, vnc: 16800000, statut: "Actif" },
  { code: "MAT-004", designation: "Camion Isuzu NQR", categorie: "Véhicule", dateAchat: "Jun 2020", brute: 18500000, duree: "5 ans", amortAnnuel: 3700000, amortCumul: 18500000, vnc: 0, statut: "Totalement amorti" },
  { code: "MAT-005", designation: "Pick-up Toyota Hilux", categorie: "Véhicule", dateAchat: "Sep 2021", brute: 14200000, duree: "5 ans", amortAnnuel: 2840000, amortCumul: 9940000, vnc: 4260000, statut: "Actif" },
  { code: "MAT-012", designation: "Drone DJI Agras T30", categorie: "Matériel", dateAchat: "Jan 2024", brute: 12400000, duree: "5 ans", amortAnnuel: 2480000, amortCumul: 2480000, vnc: 9920000, statut: "Actif" },
  { code: "MAT-015", designation: "Séchoir artificiel A", categorie: "Matériel", dateAchat: "Jun 2022", brute: 3800000, duree: "10 ans", amortAnnuel: 380000, amortCumul: 1140000, vnc: 2660000, statut: "Actif" },
  { code: "MAT-016", designation: "Séchoir artificiel B", categorie: "Matériel", dateAchat: "Jun 2022", brute: 3800000, duree: "10 ans", amortAnnuel: 380000, amortCumul: 1140000, vnc: 2660000, statut: "Actif" },
  { code: "PLN-001", designation: "Plantation cacao Zone A (36 ha)", categorie: "Plantation", dateAchat: "2008-2012", brute: 18000000, duree: "25 ans", amortAnnuel: 720000, amortCumul: 9360000, vnc: 8640000, statut: "Actif" },
  { code: "PLN-002", designation: "Plantation anacarde Zone A (14 ha)", categorie: "Plantation", dateAchat: "2015-2018", brute: 5600000, duree: "25 ans", amortAnnuel: 224000, amortCumul: 1120000, vnc: 4480000, statut: "Actif" },
  { code: "PLN-003", designation: "Plantation cacao Gagnoa (6 ha)", categorie: "Plantation", dateAchat: "2023", brute: 2400000, duree: "25 ans", amortAnnuel: 96000, amortCumul: 192000, vnc: 2208000, statut: "En croissance" },
  { code: "INF-001", designation: "Système ERP AGRIFRIK (licence)", categorie: "Informatique", dateAchat: "Jan 2024", brute: 1800000, duree: "3 ans", amortAnnuel: 600000, amortCumul: 600000, vnc: 1200000, statut: "Actif" },
  { code: "INF-002", designation: "Serveur NAS Synology", categorie: "Informatique", dateAchat: "Jan 2023", brute: 480000, duree: "3 ans", amortAnnuel: 160000, amortCumul: 320000, vnc: 160000, statut: "Actif" },
];

const categoriesFilter = ["Tous", "Terrains", "Bâtiments", "Matériels", "Véhicules", "Informatique", "Plantations"];

const catMap: Record<string, string> = {
  Terrains: "Terrain",
  Bâtiments: "Bâtiment",
  Matériels: "Matériel",
  Véhicules: "Véhicule",
  Informatique: "Informatique",
  Plantations: "Plantation",
};

const actifsPrincipaux = [
  { label: "Tracteur JD 6120M", mensuel: 236667 },
  { label: "Camion Renault T460", mensuel: 700000 },
  { label: "Camion Isuzu NQR", mensuel: 308333 },
  { label: "Drone DJI Agras T30", mensuel: 206667 },
  { label: "Plantation cacao Zone A", mensuel: 60000 },
  { label: "Entrepôt A", mensuel: 51667 },
  { label: "Entrepôt B", mensuel: 32500 },
  { label: "Système ERP AGRIFRIK", mensuel: 50000 },
];

const mois = ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sep", "Oct", "Nov", "Déc"];

const cessions = [
  { date: "15/06/2024", actif: "Honda CB125 (moto)", brute: 480000, vnc: 0, prix: 120000, plusValue: 120000, acquéreur: "Konan Y. (employé)" },
  { date: "01/03/2023", actif: "Pulvérisateur Jacto (HS)", brute: 180000, vnc: 0, prix: 0, plusValue: 0, acquéreur: "—" },
  { date: "15/01/2022", actif: "Véhicule Peugeot Partner", brute: 4200000, vnc: 840000, prix: 1400000, plusValue: 560000, acquéreur: "Garage Soubré" },
];

function StatutBadge({ statut }: { statut: string }) {
  if (statut === "Actif") return <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400">✅ Actif</span>;
  if (statut === "Maintenance") return <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400">⚠️ Maintenance</span>;
  if (statut === "Totalement amorti") return <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400">⚠️ Totalement amorti</span>;
  if (statut === "En croissance") return <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400">✅ En croissance</span>;
  return <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-500">{statut}</span>;
}

const tabs = ["Registre des actifs", "Amortissements", "Cessions", "Tableau de synthèse"];

export default function ActifsPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [filterCat, setFilterCat] = useState("Tous");

  const filteredActifs = filterCat === "Tous"
    ? actifs
    : actifs.filter((a) => a.categorie === catMap[filterCat]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950">
      <Topbar title="Actifs & Immobilisations" breadcrumb={["Finance", "Actifs"]} />

      <main className="flex-1 p-6 space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
          {[
            { label: "Actifs enregistrés", value: "42", sub: "biens immobilisés", color: "text-gray-900 dark:text-white" },
            { label: "Valeur brute totale", value: "186,2 M XOF", sub: "coût d'acquisition", color: "text-blue-600 dark:text-blue-400" },
            { label: "Amortissements cumulés", value: "28,4 M XOF", sub: "depuis mise en service", color: "text-orange-600 dark:text-orange-400" },
            { label: "Valeur nette comptable", value: "157,8 M XOF", sub: "VNC au 11/07/2025", color: "text-emerald-600 dark:text-emerald-400" },
            { label: "Dotation annuelle 2025", value: "18,4 M XOF", sub: "dotation exercice courant", color: "text-purple-600 dark:text-purple-400" },
          ].map((kpi) => (
            <div key={kpi.label} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5 shadow-sm">
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">{kpi.label}</p>
              <p className={`mt-2 text-xl font-bold ${kpi.color}`}>{kpi.value}</p>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{kpi.sub}</p>
            </div>
          ))}
        </div>

        {/* Onglets */}
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
          <div className="px-6 pt-4 border-b border-gray-200 dark:border-gray-800 flex gap-1 overflow-x-auto">
            {tabs.map((t, i) => (
              <button
                key={t}
                onClick={() => setActiveTab(i)}
                className={`px-4 py-2.5 text-sm font-medium whitespace-nowrap rounded-t-lg transition-colors border-b-2 -mb-px ${
                  activeTab === i
                    ? "border-emerald-500 text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20"
                    : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Onglet 1 : Registre */}
          {activeTab === 0 && (
            <div>
              {/* Alertes */}
              <div className="px-6 pt-4 space-y-2">
                <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-800 px-4 py-3">
                  <AlertTriangle size={16} className="text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" />
                  <p className="text-sm text-amber-800 dark:text-amber-300">
                    <span className="font-semibold">MAT-004 (Isuzu NQR)</span> — Totalement amorti, valeur nette 0 — Envisager réévaluation ou cession
                  </p>
                </div>
                <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-800 px-4 py-3">
                  <AlertTriangle size={16} className="text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" />
                  <p className="text-sm text-amber-800 dark:text-amber-300">
                    <span className="font-semibold">MAT-001 (JD 6120M)</span> — En maintenance — Vérifier incidence sur valeur comptable (sinistre non déclaré ?)
                  </p>
                </div>
              </div>

              {/* Filtres chips */}
              <div className="px-6 pt-4 pb-3 flex gap-2 flex-wrap">
                {categoriesFilter.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFilterCat(cat)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                      filterCat === cat
                        ? "bg-[#2E7D32] text-white"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#F8FBF8] dark:bg-gray-800 border-y border-gray-100 dark:border-gray-700">
                      {["Code", "Désignation", "Catégorie", "Date achat", "Valeur brute", "Durée vie", "Amort. annuel", "Amort. cumulé", "VNC", "Statut"].map((h) => (
                        <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide whitespace-nowrap">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                    {filteredActifs.map((a) => (
                      <tr key={a.code} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                        <td className="px-4 py-3 font-mono text-xs text-gray-600 dark:text-gray-400 whitespace-nowrap">{a.code}</td>
                        <td className="px-4 py-3 text-gray-900 dark:text-white max-w-[220px]">{a.designation}</td>
                        <td className="px-4 py-3 text-gray-600 dark:text-gray-400 whitespace-nowrap">{a.categorie}</td>
                        <td className="px-4 py-3 text-gray-600 dark:text-gray-400 whitespace-nowrap">{a.dateAchat}</td>
                        <td className="px-4 py-3 text-right font-medium text-gray-900 dark:text-white whitespace-nowrap">{fmt(a.brute)}</td>
                        <td className="px-4 py-3 text-center text-gray-600 dark:text-gray-400 whitespace-nowrap">{a.duree}</td>
                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300 whitespace-nowrap">{a.amortAnnuel === 0 ? "—" : fmt(a.amortAnnuel)}</td>
                        <td className="px-4 py-3 text-right text-orange-600 dark:text-orange-400 whitespace-nowrap">{a.amortCumul === 0 ? "—" : fmt(a.amortCumul)}</td>
                        <td className="px-4 py-3 text-right font-semibold whitespace-nowrap">
                          <span className={a.vnc === 0 ? "text-gray-400 dark:text-gray-600" : "text-emerald-600 dark:text-emerald-400"}>
                            {fmt(a.vnc)}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <StatutBadge statut={a.statut} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Onglet 2 : Amortissements */}
          {activeTab === 1 && (
            <div className="p-6 space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-gray-800 dark:text-white mb-1">Plan d&apos;amortissement 2025</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">Dotation mensuelle totale : <span className="font-semibold text-orange-600 dark:text-orange-400">1 533 333 XOF</span> — Dotation annuelle 2025 : <span className="font-semibold text-orange-600 dark:text-orange-400">18 400 000 XOF</span></p>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="bg-[#F8FBF8] dark:bg-gray-800 border-y border-gray-100 dark:border-gray-700">
                        <th className="px-3 py-2.5 text-left font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide whitespace-nowrap">Actif</th>
                        {mois.map((m) => (
                          <th key={m} className="px-2 py-2.5 text-right font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide whitespace-nowrap">{m}</th>
                        ))}
                        <th className="px-3 py-2.5 text-right font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide whitespace-nowrap">Total 2025</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                      {actifsPrincipaux.map((a) => (
                        <tr key={a.label} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                          <td className="px-3 py-2.5 text-gray-800 dark:text-gray-200 whitespace-nowrap font-medium">{a.label}</td>
                          {mois.map((m) => (
                            <td key={m} className="px-2 py-2.5 text-right text-gray-600 dark:text-gray-400 whitespace-nowrap">{a.mensuel.toLocaleString("fr-FR")}</td>
                          ))}
                          <td className="px-3 py-2.5 text-right font-semibold text-orange-600 dark:text-orange-400 whitespace-nowrap">{(a.mensuel * 12).toLocaleString("fr-FR")}</td>
                        </tr>
                      ))}
                      <tr className="bg-gray-50 dark:bg-gray-800 font-semibold">
                        <td className="px-3 py-2.5 text-gray-800 dark:text-white whitespace-nowrap">Total mensuel</td>
                        {mois.map((m) => (
                          <td key={m} className="px-2 py-2.5 text-right text-gray-700 dark:text-gray-300 whitespace-nowrap">1 533 333</td>
                        ))}
                        <td className="px-3 py-2.5 text-right text-orange-600 dark:text-orange-400 whitespace-nowrap">18 400 000</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-800 dark:text-white mb-3">Récapitulatif par méthode d&apos;amortissement</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-[#F8FBF8] dark:bg-gray-800 border-y border-gray-100 dark:border-gray-700">
                        {["Méthode", "Actifs", "Valeur brute", "Dotation 2025"].map((h) => (
                          <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide whitespace-nowrap">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                      <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                        <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">Linéaire</td>
                        <td className="px-4 py-3 text-gray-700 dark:text-gray-300">38 actifs</td>
                        <td className="px-4 py-3 text-gray-700 dark:text-gray-300">162 400 000 XOF</td>
                        <td className="px-4 py-3 font-semibold text-orange-600 dark:text-orange-400">18 400 000 XOF</td>
                      </tr>
                      <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                        <td className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">Dégressive (néant)</td>
                        <td className="px-4 py-3 text-gray-500 dark:text-gray-400">0</td>
                        <td className="px-4 py-3 text-gray-500 dark:text-gray-400">0 XOF</td>
                        <td className="px-4 py-3 text-gray-500 dark:text-gray-400">0 XOF</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Onglet 3 : Cessions */}
          {activeTab === 2 && (
            <div className="p-6">
              <h3 className="text-sm font-semibold text-gray-800 dark:text-white mb-4">Historique des cessions</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#F8FBF8] dark:bg-gray-800 border-y border-gray-100 dark:border-gray-700">
                      {["Date", "Actif cédé", "Valeur brute", "VNC à la cession", "Prix de cession", "Plus/moins value", "Acquéreur"].map((h) => (
                        <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                    {cessions.map((c) => (
                      <tr key={c.date + c.actif} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                        <td className="px-4 py-3 text-gray-600 dark:text-gray-400 whitespace-nowrap">{c.date}</td>
                        <td className="px-4 py-3 text-gray-900 dark:text-white">{c.actif}</td>
                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300 whitespace-nowrap">{fmt(c.brute)}</td>
                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300 whitespace-nowrap">{fmt(c.vnc)}</td>
                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300 whitespace-nowrap">{c.prix === 0 ? "—" : fmt(c.prix)}</td>
                        <td className="px-4 py-3 text-right font-semibold whitespace-nowrap">
                          {c.plusValue > 0 ? (
                            <span className="text-emerald-600 dark:text-emerald-400">+{fmt(c.plusValue)} ✅</span>
                          ) : (
                            <span className="text-gray-400">0 (rebut)</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-gray-700 dark:text-gray-300 whitespace-nowrap">{c.acquéreur}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Onglet 4 : Tableau de synthèse */}
          {activeTab === 3 && (
            <div className="p-6 space-y-6">
              <h3 className="text-sm font-semibold text-gray-800 dark:text-white">Synthèse par catégorie d&apos;actif</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#F8FBF8] dark:bg-gray-800 border-y border-gray-100 dark:border-gray-700">
                      {["Catégorie", "Nb actifs", "Valeur brute", "Amort. cumulé", "VNC", "% VNC / Brute"].map((h) => (
                        <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                    {[
                      { cat: "Terrains", nb: 1, brute: 42000000, cumul: 0, vnc: 42000000 },
                      { cat: "Bâtiments", nb: 3, brute: 24400000, cumul: 10190000, vnc: 14210000 },
                      { cat: "Matériels", nb: 5, brute: 66800000, cumul: 38520000, vnc: 35080000 },
                      { cat: "Véhicules", nb: 3, brute: 74700000, cumul: 53640000, vnc: 21060000 },
                      { cat: "Plantations", nb: 3, brute: 26000000, cumul: 10672000, vnc: 15328000 },
                      { cat: "Informatique", nb: 2, brute: 2280000, cumul: 920000, vnc: 1360000 },
                    ].map((row) => {
                      const pct = row.brute > 0 ? Math.round((row.vnc / row.brute) * 100) : 0;
                      return (
                        <tr key={row.cat} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                          <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{row.cat}</td>
                          <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{row.nb}</td>
                          <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300 whitespace-nowrap">{fmt(row.brute)}</td>
                          <td className="px-4 py-3 text-right text-orange-600 dark:text-orange-400 whitespace-nowrap">{row.cumul === 0 ? "—" : fmt(row.cumul)}</td>
                          <td className="px-4 py-3 text-right font-semibold text-emerald-600 dark:text-emerald-400 whitespace-nowrap">{fmt(row.vnc)}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <div className="flex-1 h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                                <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${pct}%` }} />
                              </div>
                              <span className="text-xs text-gray-500 w-8 text-right">{pct}%</span>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
