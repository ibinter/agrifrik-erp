import Topbar from "../../components/Topbar";

/* ─── données ─── */

const cultures = [
  {
    nom: "Cacao",
    surface: "85 ha",
    delta: "+17 ha",
    rendement: "1,4 t/ha",
    production: "119 t",
    prix: "1 350 XOF/kg",
    ca: 160.7,
  },
  {
    nom: "Anacarde",
    surface: "58 ha",
    delta: "+13 ha",
    rendement: "0,95 t/ha",
    production: "55,1 t",
    prix: "450 XOF/kg",
    ca: 24.8,
  },
  {
    nom: "Maïs",
    surface: "25 ha",
    delta: "+7 ha",
    rendement: "0,8 t/ha",
    production: "20 t",
    prix: "200 XOF/kg",
    ca: 4.0,
  },
  {
    nom: "Nouvelles cultures",
    surface: "15 ha",
    delta: "nouveau",
    rendement: "—",
    production: "—",
    prix: "—",
    ca: 18.0,
    estimate: true,
  },
];

const financement = [
  { label: "Fonds propres", montant: 28, color: "bg-emerald-500", pct: 29 },
  { label: "Prêt bancaire", montant: 42, color: "bg-indigo-500", pct: 44 },
  { label: "Subventions", montant: 15, color: "bg-amber-500", pct: 16 },
  { label: "Préfinancement acheteur", montant: 10, color: "bg-blue-400", pct: 11 },
];

const kpis = [
  { label: "CA projeté 2026", val: "312 M XOF", color: "text-indigo-600 dark:text-indigo-400", sub: "vs 245,8 M en 2025" },
  { label: "Croissance prévue", val: "+27%", color: "text-emerald-600 dark:text-emerald-400", sub: "vs exercice 2025" },
  { label: "Marge nette cible", val: "18%", color: "text-blue-600 dark:text-blue-400", sub: "vs 15,1% en 2025" },
  { label: "ROI investissements", val: "24%", color: "text-amber-600 dark:text-amber-400", sub: "Plan triennal 2026-2028" },
];

/* ─── composant ─── */

export default function PrevisionsPage() {
  const totalCA = cultures.reduce((s, c) => s + c.ca, 0);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950">
      <Topbar title="Prévisions" breadcrumb={["Finance", "Prévisions"]} />

      <main className="flex-1 p-6 space-y-6">
        {/* ── KPIs ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {kpis.map((k) => (
            <div
              key={k.label}
              className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5 shadow-sm"
            >
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                {k.label}
              </p>
              <p className={`mt-2 text-2xl font-bold ${k.color}`}>{k.val}</p>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{k.sub}</p>
            </div>
          ))}
        </div>

        {/* ── Prévisions de revenus 2026 ── */}
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-gray-900 dark:text-white">
                Prévisions de revenus 2026
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                Par culture — total projeté :{" "}
                <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                  {totalCA.toFixed(1)} M XOF
                </span>
              </p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[760px]">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800/50 text-xs font-semibold text-gray-600 dark:text-gray-300">
                  <th className="px-4 py-3 text-left">Culture</th>
                  <th className="px-4 py-3 text-right">Surface prévue</th>
                  <th className="px-4 py-3 text-right">Rendement cible</th>
                  <th className="px-4 py-3 text-right">Production prévue</th>
                  <th className="px-4 py-3 text-right">Prix cible</th>
                  <th className="px-4 py-3 text-right">CA prévu</th>
                  <th className="px-4 py-3 text-right">% total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {cultures.map((c) => (
                  <tr
                    key={c.nom}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"
                  >
                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{c.nom}</td>
                    <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">
                      {c.surface}{" "}
                      <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                        ({c.delta})
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">{c.rendement}</td>
                    <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">{c.production}</td>
                    <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">{c.prix}</td>
                    <td className="px-4 py-3 text-right font-semibold text-indigo-600 dark:text-indigo-400">
                      {c.ca.toFixed(1)} M XOF
                      {c.estimate && (
                        <span className="ml-1 text-[10px] text-gray-400 dark:text-gray-500 font-normal">
                          ~estimation
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <div className="w-16 bg-gray-100 dark:bg-gray-700 rounded-full h-1.5">
                          <div
                            className="h-1.5 rounded-full bg-indigo-500"
                            style={{ width: `${((c.ca / totalCA) * 100).toFixed(0)}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-600 dark:text-gray-400 w-8 text-right">
                          {((c.ca / totalCA) * 100).toFixed(0)}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-gray-50 dark:bg-gray-800/50 font-semibold text-gray-900 dark:text-white">
                  <td className="px-4 py-3" colSpan={5}>Total</td>
                  <td className="px-4 py-3 text-right text-indigo-600 dark:text-indigo-400">
                    {totalCA.toFixed(1)} M XOF
                  </td>
                  <td className="px-4 py-3 text-right text-gray-500 dark:text-gray-400">100%</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* ── Plan de financement + Seuil rentabilité ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Plan de financement */}
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
            <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-1">
              Plan de financement 2026
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-5">
              Besoins totaux : 95 M XOF (investissements + fonds de roulement)
            </p>

            <div className="space-y-3 mb-5">
              {financement.map((f) => (
                <div key={f.label}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-700 dark:text-gray-300">{f.label}</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{f.montant} M XOF</span>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-full h-2.5">
                    <div className={`h-2.5 rounded-full ${f.color}`} style={{ width: `${f.pct}%` }} />
                  </div>
                  <p className="text-xs text-gray-400 dark:text-gray-500 text-right mt-0.5">{f.pct}%</p>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-100 dark:border-gray-800 pt-4">
              <div className="flex items-center justify-between p-3 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-lg">
                <div>
                  <p className="text-xs text-emerald-700 dark:text-emerald-400 font-medium">
                    Ratio dette / capital (après financement)
                  </p>
                  <p className="text-xs text-emerald-600 dark:text-emerald-500 mt-0.5">
                    Seuil sain : &lt; 1,0
                  </p>
                </div>
                <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">0,45</p>
              </div>
            </div>
          </div>

          {/* Seuil de rentabilité */}
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
            <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-1">
              Seuil de rentabilité 2026
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-5">
              Point mort et marge de sécurité
            </p>

            <div className="grid grid-cols-2 gap-4 mb-5">
              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-xs text-gray-500 dark:text-gray-400">Charges fixes 2026</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white mt-0.5">85 M XOF</p>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-xs text-gray-500 dark:text-gray-400">Marge / coût variable</p>
                <p className="text-lg font-bold text-indigo-600 dark:text-indigo-400 mt-0.5">48%</p>
              </div>
              <div className="p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg">
                <p className="text-xs text-amber-700 dark:text-amber-400">Seuil de rentabilité</p>
                <p className="text-lg font-bold text-amber-700 dark:text-amber-400 mt-0.5">177 M XOF</p>
                <p className="text-xs text-amber-600 dark:text-amber-500 mt-0.5">Atteint ~avril 2026</p>
              </div>
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-lg">
                <p className="text-xs text-emerald-700 dark:text-emerald-400">Marge de sécurité</p>
                <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">+76%</p>
                <p className="text-xs text-emerald-600 dark:text-emerald-500 mt-0.5">au-delà du seuil</p>
              </div>
            </div>

            {/* graphique SVG point mort */}
            <svg viewBox="0 0 400 120" className="w-full" aria-label="Seuil de rentabilité">
              {/* axe */}
              <line x1="30" y1="95" x2="390" y2="95" stroke="currentColor" strokeWidth="1" className="text-gray-200 dark:text-gray-700" />
              <line x1="30" y1="10" x2="30" y2="95" stroke="currentColor" strokeWidth="1" className="text-gray-200 dark:text-gray-700" />

              {/* Charges fixes (ligne horizontale) */}
              <line x1="30" y1="50" x2="390" y2="50" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4,3" />
              <text x="32" y="46" fill="#f59e0b" fontSize="9">Charges fixes 85 M</text>

              {/* Droite CA */}
              <line x1="30" y1="95" x2="390" y2="12" stroke="#6366f1" strokeWidth="2" />
              <text x="330" y="18" fill="#6366f1" fontSize="9" fontWeight="600">CA 312 M</text>

              {/* Point mort */}
              <line x1="162" y1="10" x2="162" y2="95" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3,3" />
              <circle cx="162" cy="50" r="4" fill="#10b981" />
              <text x="165" y="45" fill="#10b981" fontSize="9" fontWeight="600">Point mort</text>
              <text x="165" y="55" fill="#10b981" fontSize="8">177 M XOF</text>

              {/* zone bénéfice */}
              <rect x="162" y="12" width="228" height="83" fill="#10b981" fillOpacity="0.06" />
              <text x="260" y="85" fill="#10b981" fontSize="9" textAnchor="middle">Zone bénéfice</text>

              {/* labels axes */}
              <text x="28" y="98" fill="currentColor" fontSize="8" textAnchor="end" className="fill-gray-400">0</text>
              <text x="390" y="98" fill="currentColor" fontSize="8" textAnchor="end" className="fill-gray-400">CA →</text>
            </svg>
          </div>
        </div>
      </main>
    </div>
  );
}
