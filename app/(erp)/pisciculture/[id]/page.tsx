import Topbar from "../../../components/Topbar";

export default async function PiscicultureDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-gray-50">
      <Topbar breadcrumb={["Production", "Pisciculture", `Bassin ${id}`]} />

      <div className="flex-1 p-6 space-y-6">

        {/* EN-TÊTE */}
        <div className="rounded-2xl overflow-hidden" style={{ background: "#1B3A6B" }}>
          <div className="p-6 text-white">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <h1 className="text-xl font-bold">PSC-001 — Étang principal</h1>
                  <span className="inline-flex items-center gap-1 bg-blue-300 text-blue-900 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                    ✅ En production
                  </span>
                </div>
                <p className="text-blue-200 text-sm">Espèce : Tilapia du Nil (Oreochromis niloticus)</p>
                <div className="flex flex-wrap gap-4 text-sm text-blue-100 mt-2">
                  <span>Dimensions : 20m × 15m × 1,5m (450 m²)</span>
                  <span>|</span>
                  <span>Volume : 675 m³</span>
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-blue-100 mt-1">
                  <span>Responsable : Konan Assoua (Technicien pisciculture)</span>
                  <span>|</span>
                  <span>Ensemencement : 28/02/2025</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* KPI */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="rounded-2xl border border-gray-100 bg-white p-5">
            <p className="text-xs text-gray-500 mb-1">Effectif ensemencé</p>
            <p className="text-2xl font-bold text-gray-900">4 500</p>
            <p className="text-xs text-gray-400 mt-1">alevins — densité 10/m²</p>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-white p-5">
            <p className="text-xs text-gray-500 mb-1">Survie estimée (J132)</p>
            <p className="text-2xl font-bold text-gray-900">91%</p>
            <p className="text-xs text-blue-600 mt-1">→ 4 095 individus</p>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-white p-5">
            <p className="text-xs text-gray-500 mb-1">Poids moyen actuel</p>
            <p className="text-2xl font-bold text-gray-900">248 g</p>
            <p className="text-xs text-gray-400 mt-1">J132</p>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-white p-5">
            <p className="text-xs text-gray-500 mb-1">Biomasse totale estimée</p>
            <p className="text-2xl font-bold text-gray-900">1 015 kg</p>
            <p className="text-xs text-green-600 mt-1">✅ En bonne progression</p>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-white p-5">
            <p className="text-xs text-gray-500 mb-1">FCR (Indice Conso.)</p>
            <p className="text-2xl font-bold text-gray-900">1,8</p>
            <p className="text-xs text-green-600 mt-1">✅ Objectif &lt;2,0</p>
          </div>
        </div>

        {/* PARAMÈTRES EAU */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-base font-semibold text-gray-900 mb-4">Paramètres eau — Semaine J126→J132</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-[#F8FBF8]">
                  <th className="text-left py-2 px-3 font-semibold text-gray-600 rounded-l-lg">Date</th>
                  <th className="text-right py-2 px-3 font-semibold text-gray-600">T° eau</th>
                  <th className="text-right py-2 px-3 font-semibold text-gray-600">pH</th>
                  <th className="text-right py-2 px-3 font-semibold text-gray-600">O₂ dissous</th>
                  <th className="text-right py-2 px-3 font-semibold text-gray-600">Secchi</th>
                  <th className="text-right py-2 px-3 font-semibold text-gray-600">NH₄⁺</th>
                  <th className="text-left py-2 px-3 font-semibold text-gray-600 rounded-r-lg">Observation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  { date: "05/07", temp: "28,4°C", ph: "7,2", o2: "6,8 mg/L", secchi: "42 cm", nh4: "0,12 mg/L", obs: "Normal ✅", warn: false },
                  { date: "06/07", temp: "28,8°C", ph: "7,3", o2: "6,9 mg/L", secchi: "41 cm", nh4: "0,11 mg/L", obs: "Normal ✅", warn: false },
                  { date: "07/07", temp: "29,1°C", ph: "7,4", o2: "6,5 mg/L", secchi: "40 cm", nh4: "0,14 mg/L", obs: "Légère chaleur", warn: false },
                  { date: "08/07", temp: "29,5°C ⚠️", ph: "7,5", o2: "6,2 mg/L ⚠️", secchi: "38 cm", nh4: "0,16 mg/L", obs: "Aération renforcée", warn: true },
                  { date: "09/07", temp: "28,9°C", ph: "7,3", o2: "6,8 mg/L", secchi: "41 cm", nh4: "0,13 mg/L", obs: "Normal ✅", warn: false },
                  { date: "10/07", temp: "28,6°C", ph: "7,2", o2: "7,0 mg/L", secchi: "43 cm", nh4: "0,11 mg/L", obs: "Normal ✅", warn: false },
                  { date: "11/07", temp: "28,4°C", ph: "7,1", o2: "7,1 mg/L", secchi: "44 cm", nh4: "0,10 mg/L", obs: "Excellent ✅", warn: false },
                ].map((row, i) => (
                  <tr key={i} className={row.warn ? "bg-orange-50 hover:bg-orange-100" : "hover:bg-gray-50"}>
                    <td className="py-2 px-3 font-medium text-gray-800">{row.date}</td>
                    <td className={`py-2 px-3 text-right ${row.warn ? "text-orange-700 font-semibold" : "text-gray-700"}`}>{row.temp}</td>
                    <td className="py-2 px-3 text-right text-gray-700">{row.ph}</td>
                    <td className={`py-2 px-3 text-right ${row.warn ? "text-orange-700 font-semibold" : "text-gray-700"}`}>{row.o2}</td>
                    <td className="py-2 px-3 text-right text-gray-700">{row.secchi}</td>
                    <td className="py-2 px-3 text-right text-gray-700">{row.nh4}</td>
                    <td className="py-2 px-3 text-gray-600">{row.obs}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Normes */}
          <div className="mt-4 flex flex-wrap gap-3">
            {[
              "T° 26-30°C ✅",
              "pH 6,5-8,5 ✅",
              "O₂ >5 mg/L ✅",
              "NH₄⁺ <0,5 mg/L ✅",
            ].map((norm, i) => (
              <span key={i} className="inline-flex items-center bg-blue-50 text-blue-700 text-xs font-medium px-3 py-1 rounded-full border border-blue-100">
                {norm}
              </span>
            ))}
          </div>
        </div>

        {/* ALIMENTATION */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-base font-semibold text-gray-900 mb-1">Alimentation</h2>
          <p className="text-xs text-gray-500 mb-4">
            Aliment : Pellets flottants Tilapia 32% protéines (Coppens, 3mm) — 3 repas/jour (07h, 12h, 17h) — distribution manuelle
          </p>

          <h3 className="text-sm font-semibold text-gray-700 mb-3">Ration journalière et croissance J0→J132</h3>
          <div className="overflow-x-auto mb-4">
            <svg viewBox="0 0 560 220" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[560px]">
              <rect width="560" height="220" fill="#f0f9ff" rx="8" />

              {/* Left axis grid (poids) */}
              {[0, 50, 100, 150, 200, 250].map((v, i) => {
                const y = 185 - (v / 250) * 155;
                return (
                  <g key={i}>
                    <line x1="50" y1={y} x2="510" y2={y} stroke="#e0e7ef" strokeWidth="1" />
                    <text x="44" y={y + 4} textAnchor="end" fontSize="9" fill="#6b7280">{v}</text>
                  </g>
                );
              })}

              {/* Right axis labels (ration) */}
              {[0, 2, 4, 6, 8].map((v, i) => {
                const y = 185 - (v / 8) * 155;
                return (
                  <text key={i} x="518" y={y + 4} textAnchor="start" fontSize="9" fill="#d97706">{v}</text>
                );
              })}

              {/* X axis labels */}
              {["J0", "J30", "J60", "J90", "J120", "J132"].map((label, i) => {
                const x = 50 + (i / 5) * 460;
                return (
                  <text key={i} x={x} y="205" textAnchor="middle" fontSize="9" fill="#6b7280">{label}</text>
                );
              })}

              {/* Poids line (bleu) */}
              {(() => {
                const pts: [number, number][] = [[0, 2], [1, 18], [2, 62], [3, 142], [4, 224], [5, 248]];
                const coords = pts.map(([i, v]) => `${50 + (i / 5) * 460},${185 - (v / 250) * 155}`);
                return (
                  <polyline points={coords.join(" ")} fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinejoin="round" />
                );
              })()}

              {/* Ration line (orange pointillé) — mapped to right axis [0-8] */}
              {(() => {
                const pts: [number, number][] = [[0, 0.9], [1, 1.6], [2, 2.8], [3, 4.5], [4, 6.7], [5, 7.2]];
                const coords = pts.map(([i, v]) => `${50 + (i / 5) * 460},${185 - (v / 8) * 155}`);
                return (
                  <polyline points={coords.join(" ")} fill="none" stroke="#d97706" strokeWidth="2" strokeDasharray="6,4" strokeLinejoin="round" />
                );
              })()}

              {/* Dots poids */}
              {([[0, 2], [1, 18], [2, 62], [3, 142], [4, 224], [5, 248]] as [number, number][]).map(([i, v]) => (
                <circle key={i} cx={50 + (i / 5) * 460} cy={185 - (v / 250) * 155} r="4" fill="#2563eb" />
              ))}

              {/* Dots ration */}
              {([[0, 0.9], [1, 1.6], [2, 2.8], [3, 4.5], [4, 6.7], [5, 7.2]] as [number, number][]).map(([i, v]) => (
                <circle key={i} cx={50 + (i / 5) * 460} cy={185 - (v / 8) * 155} r="3.5" fill="#d97706" />
              ))}

              {/* Legend */}
              <line x1="60" y1="14" x2="80" y2="14" stroke="#2563eb" strokeWidth="2.5" />
              <circle cx="70" cy="14" r="3" fill="#2563eb" />
              <text x="85" y="18" fontSize="10" fill="#374151">Poids moyen (g)</text>
              <line x1="185" y1="14" x2="205" y2="14" stroke="#d97706" strokeWidth="2" strokeDasharray="5,3" />
              <circle cx="195" cy="14" r="3" fill="#d97706" />
              <text x="210" y="18" fontSize="10" fill="#374151">Ration/jour (kg/bassin)</text>

              {/* Y axis labels */}
              <text x="8" y="115" fontSize="9" fill="#2563eb" transform="rotate(-90,8,115)">Poids (g)</text>
              <text x="548" y="115" fontSize="9" fill="#d97706" transform="rotate(90,548,115)">Ration (kg)</text>
            </svg>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="rounded-xl bg-blue-50 border border-blue-100 p-4">
              <p className="text-xs text-blue-600">Consommation totale J0→J132</p>
              <p className="text-xl font-bold text-blue-800 mt-1">524 kg</p>
            </div>
            <div className="rounded-xl bg-blue-50 border border-blue-100 p-4">
              <p className="text-xs text-blue-600">Gain de poids total</p>
              <p className="text-xl font-bold text-blue-800 mt-1">291 kg</p>
            </div>
            <div className="rounded-xl bg-green-50 border border-green-100 p-4">
              <p className="text-xs text-green-600">FCR = 524 / 291</p>
              <p className="text-xl font-bold text-green-800 mt-1">1,80 ✅</p>
            </div>
          </div>
        </div>

        {/* HISTORIQUE DE PÊCHE ET CONTRÔLES */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-base font-semibold text-gray-900 mb-4">Contrôles de croissance (sondages 50 individus)</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-[#F8FBF8]">
                  <th className="text-left py-2 px-3 font-semibold text-gray-600 rounded-l-lg">Date</th>
                  <th className="text-right py-2 px-3 font-semibold text-gray-600">Effectif sondé</th>
                  <th className="text-right py-2 px-3 font-semibold text-gray-600">Poids moy.</th>
                  <th className="text-right py-2 px-3 font-semibold text-gray-600">Taille moy.</th>
                  <th className="text-right py-2 px-3 font-semibold text-gray-600">Condition (K)</th>
                  <th className="text-right py-2 px-3 font-semibold text-gray-600">O₂</th>
                  <th className="text-left py-2 px-3 font-semibold text-gray-600 rounded-r-lg">Décision</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  { date: "J30 (29/03)", eff: "50", poids: "18 g", taille: "8,2 cm", k: "1,34", o2: "7,2 mg/L", dec: "Croissance normale ✅" },
                  { date: "J60 (28/04)", eff: "50", poids: "62 g", taille: "14,1 cm", k: "1,41", o2: "7,0 mg/L", dec: "Croissance normale ✅" },
                  { date: "J90 (27/05)", eff: "50", poids: "142 g", taille: "20,3 cm", k: "1,69", o2: "6,8 mg/L", dec: "Bonne croissance ✅" },
                  { date: "J120 (26/06)", eff: "50", poids: "224 g", taille: "24,8 cm", k: "1,47", o2: "6,9 mg/L", dec: "Prêt pour récolte partielle?" },
                  { date: "J132 (08/07)", eff: "50", poids: "248 g", taille: "26,1 cm", k: "1,44", o2: "7,1 mg/L", dec: "Confirmation J150-J180 ✅" },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="py-2 px-3 font-medium text-gray-800">{row.date}</td>
                    <td className="py-2 px-3 text-right text-gray-700">{row.eff}</td>
                    <td className="py-2 px-3 text-right font-medium text-gray-800">{row.poids}</td>
                    <td className="py-2 px-3 text-right text-gray-700">{row.taille}</td>
                    <td className="py-2 px-3 text-right text-gray-700">{row.k}</td>
                    <td className="py-2 px-3 text-right text-gray-700">{row.o2}</td>
                    <td className="py-2 px-3 text-gray-600">{row.dec}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* PLAN DE RÉCOLTE */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-base font-semibold text-gray-900 mb-4">Plan de récolte</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
              <p className="text-xs font-semibold text-blue-700 mb-2">Récolte partielle — J150 (27/07/2025)</p>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-blue-600 text-xs">Quantité</span>
                  <span className="text-blue-800 font-medium text-xs">1 500 individus × 350 g estimés</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-600 text-xs">Prix</span>
                  <span className="text-blue-800 font-medium text-xs">1 250 XOF/kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-600 text-xs">Destination</span>
                  <span className="text-blue-800 font-medium text-xs">Marché de Soubré (vente directe)</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-blue-200">
                  <span className="text-blue-700 text-xs font-semibold">CA estimé</span>
                  <span className="text-blue-900 font-bold text-sm">656 250 XOF</span>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-indigo-100 bg-indigo-50 p-4">
              <p className="text-xs font-semibold text-indigo-700 mb-2">Récolte principale — J180 (26/08/2025)</p>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-indigo-600 text-xs">Quantité</span>
                  <span className="text-indigo-800 font-medium text-xs">2 600 individus × 480 g estimés</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-indigo-600 text-xs">Prix</span>
                  <span className="text-indigo-800 font-medium text-xs">1 200 XOF/kg (gros volumes)</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-indigo-200">
                  <span className="text-indigo-700 text-xs font-semibold">CA estimé</span>
                  <span className="text-indigo-900 font-bold text-sm">1 497 600 XOF</span>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-green-50 border border-green-100 p-4 mb-6">
            <div className="flex items-center justify-between">
              <span className="text-green-700 font-semibold text-sm">CA total prévu (J150 + J180)</span>
              <span className="text-green-900 font-bold text-xl">2 153 850 XOF</span>
            </div>
          </div>

          <h3 className="text-sm font-semibold text-gray-700 mb-3">Historique des cycles</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-[#F8FBF8]">
                  <th className="text-left py-2 px-3 font-semibold text-gray-600 rounded-l-lg">Cycle</th>
                  <th className="text-left py-2 px-3 font-semibold text-gray-600">Espèce</th>
                  <th className="text-center py-2 px-3 font-semibold text-gray-600">Ensemencement</th>
                  <th className="text-center py-2 px-3 font-semibold text-gray-600">Récolte</th>
                  <th className="text-right py-2 px-3 font-semibold text-gray-600">Production</th>
                  <th className="text-right py-2 px-3 font-semibold text-gray-600">CA</th>
                  <th className="text-right py-2 px-3 font-semibold text-gray-600 rounded-r-lg">FCR</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  { cycle: "PSC-2024-02", espece: "Tilapia niloticus", ens: "01/09/2024", recolte: "28/02/2025 (J180)", prod: "842 kg", ca: "1 052 500 XOF", fcr: "1,94" },
                  { cycle: "PSC-2024-01", espece: "Tilapia niloticus", ens: "01/03/2024", recolte: "27/08/2024 (J180)", prod: "784 kg", ca: "980 000 XOF", fcr: "2,08" },
                  { cycle: "PSC-2023-02", espece: "Tilapia niloticus", ens: "01/09/2023", recolte: "28/02/2024 (J180)", prod: "712 kg", ca: "890 000 XOF", fcr: "2,15" },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="py-2 px-3 font-medium text-gray-800">{row.cycle}</td>
                    <td className="py-2 px-3 text-gray-600">{row.espece}</td>
                    <td className="py-2 px-3 text-center text-gray-700">{row.ens}</td>
                    <td className="py-2 px-3 text-center text-gray-700">{row.recolte}</td>
                    <td className="py-2 px-3 text-right text-gray-700">{row.prod}</td>
                    <td className="py-2 px-3 text-right text-gray-700">{row.ca}</td>
                    <td className="py-2 px-3 text-right font-medium text-blue-700">{row.fcr}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-3 rounded-lg bg-green-50 border border-green-100 px-4 py-2 text-xs text-green-700">
            Tendance FCR : 2,15 → 2,08 → 1,94 → <strong>1,80</strong> ✅ Amélioration continue chaque cycle
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex flex-wrap gap-3">
          <a
            href="/pisciculture"
            className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 rounded-xl text-xs font-medium px-4 py-2.5 hover:bg-gray-200 transition-colors"
          >
            ← Retour à la pisciculture
          </a>
          <button className="inline-flex items-center gap-2 bg-[#1B3A6B] text-white rounded-xl text-xs font-medium px-4 py-2.5 hover:bg-[#152e56] transition-colors">
            Saisir mesure eau
          </button>
          <button className="inline-flex items-center gap-2 bg-white border border-gray-200 text-gray-700 rounded-xl text-xs font-medium px-4 py-2.5 hover:bg-gray-50 transition-colors">
            Rapport pisciculture
          </button>
        </div>

      </div>
    </div>
  );
}
