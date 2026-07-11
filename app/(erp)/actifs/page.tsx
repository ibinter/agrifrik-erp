"use client";

import { useState } from "react";
import Topbar from "../../components/Topbar";
import { AlertTriangle } from "lucide-react";

const materiels = [
  { id: "ACT-001", nom: "Tracteur John Deere 6120M", date: "15/03/2021", brute: 48000000, duree: "10 ans", taux: "10%", cumul: 19200000, vnc: 28800000, statut: "Actif" },
  { id: "ACT-002", nom: "Moissonneuse-batteuse SATAKE", date: "20/06/2020", brute: 32000000, duree: "10 ans", taux: "10%", cumul: 16000000, vnc: 16000000, statut: "Actif" },
  { id: "ACT-003", nom: "Drone DJI Agras T40", date: "10/01/2024", brute: 8500000, duree: "5 ans", taux: "20%", cumul: 1700000, vnc: 6800000, statut: "Actif" },
  { id: "ACT-004", nom: "Séchoir solaire A", date: "01/01/2019", brute: 15000000, duree: "15 ans", taux: "6,7%", cumul: 6000000, vnc: 9000000, statut: "Actif" },
  { id: "ACT-005", nom: "Tracteur Massey Ferguson 290", date: "10/02/2018", brute: 22000000, duree: "10 ans", taux: "10%", cumul: 22000000, vnc: 0, statut: "Totalement amorti" },
  { id: "ACT-006", nom: "Système d'irrigation goutte-à-goutte", date: "15/06/2022", brute: 18000000, duree: "10 ans", taux: "10%", cumul: 5400000, vnc: 12600000, statut: "Actif" },
  { id: "ACT-007", nom: "Générateur électrique 45 KVA", date: "01/09/2021", brute: 6500000, duree: "8 ans", taux: "12,5%", cumul: 2437500, vnc: 4062500, statut: "Actif" },
  { id: "ACT-008", nom: "Balance electronique 5t", date: "15/04/2023", brute: 1200000, duree: "5 ans", taux: "20%", cumul: 360000, vnc: 840000, statut: "Actif" },
];

const mois = ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sep", "Oct", "Nov", "Déc"];
const dotationMensuelle = 1183333;
const dotations = mois.map((m, i) => ({
  mois: m,
  dotation: dotationMensuelle,
  cumul: dotationMensuelle * (i + 1),
}));

function fmt(n: number) {
  return n.toLocaleString("fr-FR") + " XOF";
}

const tabs = ["Matériels", "Bâtiments & Terrains", "Équipements", "Véhicules"];

export default function ActifsPage() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950">
      <Topbar title="Actifs & Amortissements" breadcrumb={["Finance", "Actifs"]} />

      <main className="flex-1 p-6 space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5 shadow-sm">
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Actifs immobilisés</p>
            <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">18</p>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Biens enregistrés</p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5 shadow-sm">
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Valeur brute totale</p>
            <p className="mt-2 text-2xl font-bold text-blue-600 dark:text-blue-400">285 M XOF</p>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Coût d&apos;acquisition</p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5 shadow-sm">
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Amortissements cumulés</p>
            <p className="mt-2 text-2xl font-bold text-orange-600 dark:text-orange-400">136,5 M XOF</p>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Depuis mise en service</p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5 shadow-sm">
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Valeur nette comptable</p>
            <p className="mt-2 text-2xl font-bold text-emerald-600 dark:text-emerald-400">148,5 M XOF</p>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">VNC au 31/07/2025</p>
          </div>
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

          {activeTab === 0 && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    {["N° Actif", "Désignation", "Date acquisition", "Valeur brute", "Durée vie", "Taux amort.", "Amort. cumulé", "VNC", "Statut"].map((h) => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {materiels.map((a) => (
                    <tr key={a.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                      <td className="px-4 py-3 font-mono text-xs text-gray-600 dark:text-gray-400 whitespace-nowrap">{a.id}</td>
                      <td className="px-4 py-3 text-gray-900 dark:text-white">{a.nom}</td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-400 whitespace-nowrap">{a.date}</td>
                      <td className="px-4 py-3 text-right font-medium text-gray-900 dark:text-white whitespace-nowrap">{fmt(a.brute)}</td>
                      <td className="px-4 py-3 text-center text-gray-600 dark:text-gray-400 whitespace-nowrap">{a.duree}</td>
                      <td className="px-4 py-3 text-center text-gray-600 dark:text-gray-400">{a.taux}</td>
                      <td className="px-4 py-3 text-right text-orange-600 dark:text-orange-400 whitespace-nowrap">{fmt(a.cumul)}</td>
                      <td className="px-4 py-3 text-right font-semibold whitespace-nowrap">
                        <span className={a.vnc === 0 ? "text-gray-400 dark:text-gray-600" : "text-emerald-600 dark:text-emerald-400"}>
                          {fmt(a.vnc)}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        {a.statut === "Actif" ? (
                          <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400">
                            Actif
                          </span>
                        ) : (
                          <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                            Totalement amorti
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab !== 0 && (
            <div className="flex flex-col items-center justify-center py-16 gap-2 text-gray-400 dark:text-gray-600">
              <p className="text-sm">Aucun actif enregistré dans cette catégorie.</p>
            </div>
          )}
        </div>

        {/* Dotation aux amortissements 2025 */}
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800">
            <h2 className="text-base font-semibold text-gray-900 dark:text-white">Dotation aux amortissements — Exercice 2025</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Total dotation 2025 : <span className="font-semibold text-orange-600 dark:text-orange-400">14 200 000 XOF</span></p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Mois</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Dotation mensuelle</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Cumul</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide w-48">Progression</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {dotations.map((d) => {
                  const pct = Math.round((d.cumul / 14200000) * 100);
                  return (
                    <tr key={d.mois} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                      <td className="px-4 py-2.5 font-medium text-gray-900 dark:text-white">{d.mois}</td>
                      <td className="px-4 py-2.5 text-right text-gray-700 dark:text-gray-300">{fmt(d.dotation)}</td>
                      <td className="px-4 py-2.5 text-right font-medium text-orange-600 dark:text-orange-400">{fmt(d.cumul)}</td>
                      <td className="px-4 py-2.5">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-orange-400 rounded-full"
                              style={{ width: `${Math.min(pct, 100)}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-400 w-8 text-right">{pct}%</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Plan de renouvellement */}
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800">
            <h2 className="text-base font-semibold text-gray-900 dark:text-white">Plan de renouvellement</h2>
          </div>
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            <div className="px-6 py-4 flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                <AlertTriangle className="text-red-500" size={18} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-1.5 py-0.5 rounded">ACT-005</span>
                  <span className="font-semibold text-gray-900 dark:text-white">Tracteur Massey Ferguson 290</span>
                  <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400">Totalement amorti</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Remplacement recommandé — Budget prévisionnel 2026 :{" "}
                  <span className="font-semibold text-gray-900 dark:text-white">28 000 000 XOF</span>
                </p>
              </div>
            </div>
            <div className="px-6 py-4 flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <AlertTriangle className="text-blue-500" size={18} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-1.5 py-0.5 rounded">ACT-003</span>
                  <span className="font-semibold text-gray-900 dark:text-white">Drone DJI Agras T40</span>
                  <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400">Actif</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Fin d&apos;amortissement prévue en 2029 — Prochaine révision majeure :{" "}
                  <span className="font-semibold text-gray-900 dark:text-white">2026</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
