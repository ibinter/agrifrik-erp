"use client";

import Topbar from "../../../components/Topbar";
import { Printer, Download, Mail, Building2, User } from "lucide-react";

const cumuls = [
  { mois: "Jan", brut: "521K", net: "449K" },
  { mois: "Fév", brut: "521K", net: "449K" },
  { mois: "Mar", brut: "548K", net: "472K" },
  { mois: "Avr", brut: "521K", net: "449K" },
  { mois: "Mai", brut: "586K", net: "504K" },
  { mois: "Juin", brut: "521K", net: "449K" },
  { mois: "Juil", brut: "586K", net: "504K" },
];

export default function BulletinPage({ params }: { params: { employeId: string } }) {
  return (
    <div>
      <Topbar title="Bulletin de Paie" breadcrumb={["RH & Paie", "Paie", "Bulletin"]} />

      <div className="p-6 space-y-6 max-w-4xl mx-auto">

        {/* Actions */}
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 bg-gray-700 hover:bg-gray-800 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
          >
            <Printer className="w-4 h-4" /> Imprimer
          </button>
          <button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
            <Download className="w-4 h-4" /> Télécharger PDF
          </button>
          <button className="inline-flex items-center gap-2 border border-gray-300 dark:border-white/20 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/10 text-sm font-medium px-4 py-2 rounded-lg transition-colors">
            <Mail className="w-4 h-4" /> Envoyer par email
          </button>
        </div>

        {/* Document bulletin */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-white/10 shadow-md overflow-hidden print:shadow-none print:border-none">

          {/* En-tête */}
          <div className="p-6 border-b-2 border-green-700">
            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 mb-1">
                  <Building2 className="w-5 h-5 text-green-700" />
                  <span className="text-lg font-bold text-gray-900 dark:text-white">AGROTEK CI</span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Abidjan, Côte d&apos;Ivoire</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">RCCM : CI-ABJ-2018-B-12345</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">N° employeur CNPS : 100-12345-6</p>
              </div>
              <div className="text-right">
                <h2 className="text-xl font-bold text-green-700 uppercase tracking-wide">Bulletin de Paie</h2>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Mois de : <strong>Juillet 2025</strong></p>
              </div>
            </div>
          </div>

          {/* Informations employé */}
          <div className="p-6 bg-gray-50 dark:bg-white/5 border-b border-gray-200 dark:border-white/10">
            <div className="flex items-start gap-2 mb-3">
              <User className="w-4 h-4 text-gray-500 mt-0.5" />
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Informations employé</span>
            </div>
            <div className="grid grid-cols-2 gap-x-8 gap-y-1.5 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Nom</span>
                <span className="font-semibold text-gray-800 dark:text-white">Ibrahim Sawadogo</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Matricule</span>
                <span className="font-semibold text-gray-800 dark:text-white">EMP-023</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Poste</span>
                <span className="font-semibold text-gray-800 dark:text-white">Technicien agricole</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Date embauche</span>
                <span className="font-semibold text-gray-800 dark:text-white">15/03/2020</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Affectation</span>
                <span className="font-semibold text-gray-800 dark:text-white">Zone A — Soubré</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Catégorie</span>
                <span className="font-semibold text-gray-800 dark:text-white">C2</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Type contrat</span>
                <span className="font-semibold text-gray-800 dark:text-white">CDI</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Ancienneté</span>
                <span className="font-semibold text-gray-800 dark:text-white">5 ans 4 mois</span>
              </div>
            </div>
          </div>

          {/* Tableau éléments de salaire */}
          <div className="p-6">
            <table className="w-full text-sm border border-gray-200 dark:border-white/10 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-gray-100 dark:bg-white/10 text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  <th className="px-4 py-2.5 text-left">Libellé</th>
                  <th className="px-4 py-2.5 text-center">Base</th>
                  <th className="px-4 py-2.5 text-center">Taux / Montant</th>
                  <th className="px-4 py-2.5 text-right text-green-700">Gains (XOF)</th>
                  <th className="px-4 py-2.5 text-right text-red-600">Retenues (XOF)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                {/* Sous-section GAINS */}
                <tr className="bg-green-50 dark:bg-green-900/10">
                  <td colSpan={5} className="px-4 py-1.5 text-xs font-bold text-green-700 dark:text-green-400 uppercase tracking-wider">Gains</td>
                </tr>
                {[
                  { lib: "Salaire de base", base: "176 h", taux: "2 386 XOF/h", gain: "420 000", ret: "" },
                  { lib: "Sursalaire", base: "", taux: "", gain: "30 000", ret: "" },
                  { lib: "Prime de rendement", base: "", taux: "", gain: "15 000", ret: "" },
                  { lib: "Heures supplémentaires (48 h)", base: "48 h", taux: "150%", gain: "96 000", ret: "" },
                  { lib: "Indemnité de déplacement", base: "", taux: "", gain: "25 000", ret: "" },
                ].map((r) => (
                  <tr key={r.lib} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                    <td className="px-4 py-2 text-gray-700 dark:text-gray-200">{r.lib}</td>
                    <td className="px-4 py-2 text-center text-gray-500 dark:text-gray-400">{r.base}</td>
                    <td className="px-4 py-2 text-center text-gray-500 dark:text-gray-400">{r.taux}</td>
                    <td className="px-4 py-2 text-right text-gray-800 dark:text-white">{r.gain}</td>
                    <td className="px-4 py-2 text-right text-gray-400">—</td>
                  </tr>
                ))}
                <tr className="bg-green-100 dark:bg-green-900/20 font-bold">
                  <td colSpan={3} className="px-4 py-2.5 text-green-800 dark:text-green-300 uppercase text-xs">Total brut</td>
                  <td className="px-4 py-2.5 text-right text-green-800 dark:text-green-300">586 000</td>
                  <td className="px-4 py-2.5"></td>
                </tr>

                {/* Sous-section RETENUES */}
                <tr className="bg-red-50 dark:bg-red-900/10">
                  <td colSpan={5} className="px-4 py-1.5 text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-wider">Retenues</td>
                </tr>
                {[
                  { lib: "CNPS salarié (vieillesse)", base: "586 000", taux: "3,2%", gain: "", ret: "18 752" },
                  { lib: "Impôt sur Salaires (ITS)", base: "543 248", taux: "1,5%", gain: "", ret: "8 149" },
                  { lib: "IRPP (tranches progressives)", base: "", taux: "", gain: "", ret: "54 999" },
                ].map((r) => (
                  <tr key={r.lib} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                    <td className="px-4 py-2 text-gray-700 dark:text-gray-200">{r.lib}</td>
                    <td className="px-4 py-2 text-center text-gray-500 dark:text-gray-400">{r.base}</td>
                    <td className="px-4 py-2 text-center text-gray-500 dark:text-gray-400">{r.taux}</td>
                    <td className="px-4 py-2 text-right text-gray-400">—</td>
                    <td className="px-4 py-2 text-right text-red-600 dark:text-red-400">{r.ret}</td>
                  </tr>
                ))}
                <tr className="bg-red-100 dark:bg-red-900/20 font-bold">
                  <td colSpan={3} className="px-4 py-2.5 text-red-700 dark:text-red-300 uppercase text-xs">Total retenues</td>
                  <td className="px-4 py-2.5"></td>
                  <td className="px-4 py-2.5 text-right text-red-700 dark:text-red-300">81 900</td>
                </tr>
              </tbody>
            </table>

            {/* Net à payer */}
            <div className="mt-4 flex justify-end">
              <div className="bg-green-700 text-white rounded-xl px-8 py-4 text-center shadow-lg">
                <p className="text-sm opacity-80 font-medium">NET À PAYER</p>
                <p className="text-3xl font-bold tracking-tight mt-0.5">504 100 XOF</p>
              </div>
            </div>

            {/* Bas de bulletin */}
            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-white/10 space-y-1">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Mode de paiement : <strong className="text-gray-700 dark:text-gray-200">Virement bancaire</strong> — BICICI Abidjan — Compte N° 012345678
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 italic">
                Document à conserver sans limitation de durée.
              </p>
            </div>
          </div>
        </div>

        {/* Cumuls annuels */}
        <div className="bg-white dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 dark:border-white/10">
            <h3 className="font-semibold text-gray-800 dark:text-white">Cumuls annuels 2025</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-center">
              <thead>
                <tr className="text-xs font-semibold text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-white/10">
                  <th className="px-4 py-3 text-left"></th>
                  {cumuls.map((c) => (
                    <th key={c.mois} className="px-4 py-3">{c.mois}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-50 dark:border-white/5">
                  <td className="px-4 py-3 text-left font-medium text-gray-600 dark:text-gray-300">Brut</td>
                  {cumuls.map((c) => (
                    <td key={c.mois} className={`px-4 py-3 font-medium ${c.mois === "Juil" ? "text-green-700 dark:text-green-400 font-bold" : "text-gray-700 dark:text-gray-200"}`}>
                      {c.brut}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="px-4 py-3 text-left font-medium text-gray-600 dark:text-gray-300">Net</td>
                  {cumuls.map((c) => (
                    <td key={c.mois} className={`px-4 py-3 font-medium ${c.mois === "Juil" ? "text-green-700 dark:text-green-400 font-bold" : "text-gray-700 dark:text-gray-200"}`}>
                      {c.net}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
