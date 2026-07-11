import Topbar from "../../components/Topbar";
import { Shield, AlertTriangle, CheckCircle } from "lucide-react";

const polices = [
  {
    numero: "ASS-2025-001",
    assureur: "NSIA Assurances CI",
    type: "Récolte & Intempéries",
    objet: "Cultures cacao 68 ha",
    valeur: "85 000 000 XOF",
    prime: "2 125 000 XOF",
    franchise: "5%",
    validite: "01/01 → 31/12/2025",
    statut: "active",
  },
  {
    numero: "ASS-2025-002",
    assureur: "AXA Africa CI",
    type: "Incendie & Vandalisme",
    objet: "Entrepôts + équipements",
    valeur: "180 000 000 XOF",
    prime: "3 600 000 XOF",
    franchise: "10%",
    validite: "01/01 → 31/12/2025",
    statut: "active",
  },
  {
    numero: "ASS-2025-003",
    assureur: "NSIA Assurances CI",
    type: "Responsabilité civile",
    objet: "Exploitation agricole",
    valeur: "50 000 000 XOF",
    prime: "750 000 XOF",
    franchise: "0%",
    validite: "01/01 → 31/12/2025",
    statut: "active",
  },
  {
    numero: "ASS-2025-004",
    assureur: "SUNU Assurances",
    type: "Matériels agricoles",
    objet: "Tracteurs + récolteuses",
    valeur: "68 000 000 XOF",
    prime: "1 360 000 XOF",
    franchise: "15%",
    validite: "01/07/2024 → 30/06/2025",
    statut: "renouvellement",
  },
  {
    numero: "ASS-2025-005",
    assureur: "Allianz CI",
    type: "Transport & Expédition",
    objet: "Marchandises export",
    valeur: "30 000 000 XOF",
    prime: "450 000 XOF",
    franchise: "0%",
    validite: "Par voyage",
    statut: "active",
  },
  {
    numero: "ASS-2025-006",
    assureur: "NSIA Assurances CI",
    type: "Vie & Accident travail",
    objet: "Tous employés (245)",
    valeur: "245 000 000 XOF",
    prime: "980 000 XOF",
    franchise: "0%",
    validite: "01/01 → 31/12/2025",
    statut: "active",
  },
];

const couverture = [
  { zone: "PAR-A1", culture: "Cacao", couvert: true },
  { zone: "PAR-A2", culture: "Cacao", couvert: true },
  { zone: "PAR-A3", culture: "Cacao", couvert: true },
  { zone: "PAR-A4", culture: "Cacao", couvert: true },
  { zone: "PAR-A5", culture: "Cacao", couvert: true },
  { zone: "PAR-A6", culture: "Cacao", couvert: true },
  { zone: "PAR-A7", culture: "Cacao", couvert: true },
  { zone: "PAR-A8", culture: "Cacao", couvert: true },
  { zone: "PAR-B1", culture: "Anacarde", couvert: false },
  { zone: "PAR-B2", culture: "Anacarde", couvert: false },
  { zone: "PAR-B3", culture: "Anacarde", couvert: false },
];

export default function AssurancesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950">
      <Topbar title="Assurances" breadcrumb={["Finance", "Assurances"]} />

      <main className="flex-1 p-6 space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5 shadow-sm">
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Polices actives</p>
            <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">6</p>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Contrats en cours</p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5 shadow-sm">
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Prime annuelle totale</p>
            <p className="mt-2 text-2xl font-bold text-blue-600 dark:text-blue-400">8,4 M XOF</p>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Exercice 2025</p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5 shadow-sm">
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Valeur assurée</p>
            <p className="mt-2 text-2xl font-bold text-emerald-600 dark:text-emerald-400">420 M XOF</p>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Capital couvert total</p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5 shadow-sm">
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Sinistres 2025</p>
            <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">0</p>
            <p className="mt-1 text-sm text-emerald-500">Aucun sinistre déclaré</p>
          </div>
        </div>

        {/* Alerte renouvellement */}
        <div className="bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-800 rounded-xl p-4 flex items-start gap-3">
          <AlertTriangle className="text-orange-500 mt-0.5 shrink-0" size={20} />
          <div>
            <p className="font-semibold text-orange-700 dark:text-orange-400">
              Police ASS-2025-004 (Matériels agricoles) expire le 30/06/2025
            </p>
            <p className="text-sm text-orange-600 dark:text-orange-500 mt-0.5">
              Renouvellement en attente. Contacter SUNU Assurances.
            </p>
          </div>
        </div>

        {/* Tableau des polices */}
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800">
            <h2 className="text-base font-semibold text-gray-900 dark:text-white">Polices d&apos;assurance actives</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  {["N° Police", "Assureur", "Type", "Objet assuré", "Valeur assurée", "Prime/an", "Franchise", "Validité", "Statut"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {polices.map((p) => (
                  <tr key={p.numero} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="px-4 py-3 font-mono text-xs text-gray-600 dark:text-gray-400 whitespace-nowrap">{p.numero}</td>
                    <td className="px-4 py-3 text-gray-900 dark:text-white whitespace-nowrap">{p.assureur}</td>
                    <td className="px-4 py-3 text-gray-700 dark:text-gray-300 whitespace-nowrap">{p.type}</td>
                    <td className="px-4 py-3 text-gray-700 dark:text-gray-300 whitespace-nowrap">{p.objet}</td>
                    <td className="px-4 py-3 text-right font-medium text-gray-900 dark:text-white whitespace-nowrap">{p.valeur}</td>
                    <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300 whitespace-nowrap">{p.prime}</td>
                    <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300">{p.franchise}</td>
                    <td className="px-4 py-3 text-gray-700 dark:text-gray-300 whitespace-nowrap">{p.validite}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {p.statut === "active" ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400">
                          <CheckCircle size={11} /> Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400">
                          <AlertTriangle size={11} /> Renouvellement
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Historique sinistres */}
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800">
            <h2 className="text-base font-semibold text-gray-900 dark:text-white">Historique des sinistres</h2>
          </div>
          <div className="flex flex-col items-center justify-center py-14 gap-3">
            <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
              <Shield className="text-emerald-500" size={28} />
            </div>
            <p className="text-base font-semibold text-gray-700 dark:text-gray-300">Aucun sinistre déclaré pour l&apos;exercice 2025.</p>
            <p className="text-sm text-emerald-600 dark:text-emerald-400">Continuez ainsi !</p>
          </div>
        </div>

        {/* Couverture par zone */}
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800">
            <h2 className="text-base font-semibold text-gray-900 dark:text-white">Couverture par zone</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Zones couvertes vs non couvertes par les polices actives</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  {["Zone", "Culture", "Couverture", "Remarque"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {couverture.map((z) => (
                  <tr key={z.zone} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{z.zone}</td>
                    <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{z.culture}</td>
                    <td className="px-4 py-3">
                      {z.couvert ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400">
                          <CheckCircle size={11} /> Couvert
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400">
                          Non couvert
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                      {z.couvert
                        ? "Police ASS-2025-001 — Récolte & Intempéries"
                        : "Recommandation : souscrire une couverture récolte anacarde"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
