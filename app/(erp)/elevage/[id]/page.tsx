import Topbar from "../../../components/Topbar";

export default async function ElevageDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-gray-50">
      <Topbar breadcrumb={["Production", "Élevage", `Bâtiment ${id}`]} />

      <div className="flex-1 p-6 space-y-6">

        {/* EN-TÊTE */}
        <div className="rounded-2xl overflow-hidden" style={{ background: "#1B5E20" }}>
          <div className="p-6 text-white">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <h1 className="text-xl font-bold">ELV-001 — Élevage Poulets de Chair</h1>
                  <span className="inline-flex items-center gap-1 bg-green-400 text-green-900 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                    ✅ En production
                  </span>
                </div>
                <p className="text-green-200 text-sm">Bâtiment : Hangar B, Zone Soubré Nord</p>
                <div className="flex flex-wrap gap-4 text-sm text-green-100 mt-2">
                  <span>Superficie : 240 m²</span>
                  <span>|</span>
                  <span>Capacité : 1 200 poulets (densité 5/m²)</span>
                  <span>|</span>
                  <span>Responsable : Yao Gnalé (Technicien Élevage)</span>
                </div>
                <p className="text-green-200 text-sm mt-1">Lot actuel : <span className="font-semibold text-white">LOT-ELV-2025-03</span></p>
              </div>
            </div>
          </div>
        </div>

        {/* KPI */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="rounded-2xl border border-gray-100 bg-white p-5">
            <p className="text-xs text-gray-500 mb-1">Effectif actuel</p>
            <p className="text-2xl font-bold text-gray-900">1 156</p>
            <p className="text-xs text-gray-400 mt-1">J28 sur cycle 42j</p>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-white p-5">
            <p className="text-xs text-gray-500 mb-1">Mortalité cumulée</p>
            <p className="text-2xl font-bold text-gray-900">44</p>
            <p className="text-xs text-green-600 mt-1">3,67% — norme &lt;5% ✅</p>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-white p-5">
            <p className="text-xs text-gray-500 mb-1">GMQ moyen</p>
            <p className="text-2xl font-bold text-gray-900">54 g/j</p>
            <p className="text-xs text-orange-500 mt-1">⚠️ Objectif : 55 g/j</p>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-white p-5">
            <p className="text-xs text-gray-500 mb-1">Poids moy. J28</p>
            <p className="text-2xl font-bold text-gray-900">1 512 g</p>
            <p className="text-xs text-gray-400 mt-1">Objectif J42 : 2 300 g</p>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-white p-5">
            <p className="text-xs text-gray-500 mb-1">IC (Indice Conso.)</p>
            <p className="text-2xl font-bold text-gray-900">1,72</p>
            <p className="text-xs text-green-600 mt-1">kg aliment / kg poids ✅</p>
          </div>
        </div>

        {/* SUIVI DU LOT */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-base font-semibold text-gray-900 mb-4">Suivi du lot LOT-ELV-2025-03</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between border-b border-gray-50 py-1">
                <span className="text-gray-500">Sourcing poussinière</span>
                <span className="text-gray-800 font-medium">Coval CI (Abidjan) — Souche Ross 308</span>
              </div>
              <div className="flex justify-between border-b border-gray-50 py-1">
                <span className="text-gray-500">Date mise en place</span>
                <span className="text-gray-800 font-medium">13/06/2025 (J0)</span>
              </div>
              <div className="flex justify-between border-b border-gray-50 py-1">
                <span className="text-gray-500">Date abattage prévue</span>
                <span className="text-gray-800 font-medium">24/07/2025 (J42)</span>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between border-b border-gray-50 py-1">
                <span className="text-gray-500">Poids mis en place</span>
                <span className="text-gray-800 font-medium">42 g/poussin (1 200 poussins)</span>
              </div>
              <div className="flex justify-between border-b border-gray-50 py-1">
                <span className="text-gray-500">Aliment J0-J10</span>
                <span className="text-gray-800 font-medium">Démarrage</span>
              </div>
              <div className="flex justify-between border-b border-gray-50 py-1">
                <span className="text-gray-500">Aliment J11-J35</span>
                <span className="text-gray-800 font-medium">Croissance</span>
              </div>
              <div className="flex justify-between border-b border-gray-50 py-1">
                <span className="text-gray-500">Aliment J36-J42</span>
                <span className="text-gray-800 font-medium">Finition</span>
              </div>
            </div>
          </div>

          <h3 className="text-sm font-semibold text-gray-700 mb-3">Suivi hebdomadaire</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-[#F8FBF8]">
                  <th className="text-left py-2 px-3 font-semibold text-gray-600 rounded-l-lg">Semaine</th>
                  <th className="text-left py-2 px-3 font-semibold text-gray-600">Jour</th>
                  <th className="text-right py-2 px-3 font-semibold text-gray-600">Effectif</th>
                  <th className="text-right py-2 px-3 font-semibold text-gray-600">Mortalité sem.</th>
                  <th className="text-right py-2 px-3 font-semibold text-gray-600">Poids moy. (g)</th>
                  <th className="text-right py-2 px-3 font-semibold text-gray-600">Aliment (kg)</th>
                  <th className="text-right py-2 px-3 font-semibold text-gray-600">IC sem.</th>
                  <th className="text-right py-2 px-3 font-semibold text-gray-600 rounded-r-lg">T° hangar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  { sem: "S1", jour: "J0→J7", effectif: "1 200→1 185", mort: "15 (1,25%)", poids: "185 g (J7)", alim: "42 kg", ic: "1,35", temp: "32°C ✅" },
                  { sem: "S2", jour: "J7→J14", effectif: "1 185→1 172", mort: "13 (1,10%)", poids: "420 g (J14)", alim: "148 kg", ic: "1,52", temp: "29°C ✅" },
                  { sem: "S3", jour: "J14→J21", effectif: "1 172→1 161", mort: "11 (0,94%)", poids: "820 g (J21)", alim: "310 kg", ic: "1,65", temp: "27°C ✅" },
                  { sem: "S4 (partiel)", jour: "J21→J28", effectif: "1 161→1 156", mort: "5 (0,43%)", poids: "1 512 g (J28)", alim: "258 kg (partiel)", ic: "1,72", temp: "26°C ✅" },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="py-2 px-3 font-medium text-gray-800">{row.sem}</td>
                    <td className="py-2 px-3 text-gray-600">{row.jour}</td>
                    <td className="py-2 px-3 text-right text-gray-700">{row.effectif}</td>
                    <td className="py-2 px-3 text-right text-gray-700">{row.mort}</td>
                    <td className="py-2 px-3 text-right font-medium text-gray-800">{row.poids}</td>
                    <td className="py-2 px-3 text-right text-gray-700">{row.alim}</td>
                    <td className="py-2 px-3 text-right text-gray-700">{row.ic}</td>
                    <td className="py-2 px-3 text-right text-gray-700">{row.temp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* SVG Courbe de croissance */}
          <div className="mt-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Courbe de croissance poids J0→J42 vs objectif Ross 308</h3>
            <div className="overflow-x-auto">
              <svg viewBox="0 0 560 220" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[560px]">
                {/* Background */}
                <rect width="560" height="220" fill="#f9fafb" rx="8" />
                {/* Grid */}
                {[0, 500, 1000, 1500, 2000, 2500].map((v, i) => {
                  const y = 190 - (v / 2500) * 160;
                  return (
                    <g key={i}>
                      <line x1="50" y1={y} x2="540" y2={y} stroke="#e5e7eb" strokeWidth="1" />
                      <text x="44" y={y + 4} textAnchor="end" fontSize="9" fill="#9ca3af">{v}</text>
                    </g>
                  );
                })}
                {/* X axis labels */}
                {["J0", "J7", "J14", "J21", "J28", "J35", "J42"].map((label, i) => {
                  const x = 50 + (i / 6) * 490;
                  return (
                    <text key={i} x={x} y="208" textAnchor="middle" fontSize="9" fill="#6b7280">{label}</text>
                  );
                })}
                {/* Réel line (bleu) */}
                {(() => {
                  const pts = [
                    [0, 42], [1, 185], [2, 420], [3, 820], [4, 1512], [5, 1950], [6, 2280]
                  ];
                  const coords = pts.map(([i, v]) => `${50 + (i / 6) * 490},${190 - (v / 2500) * 160}`);
                  return (
                    <polyline points={coords.join(" ")} fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinejoin="round" />
                  );
                })()}
                {/* Objectif Ross 308 (vert pointillé) */}
                {(() => {
                  const pts = [
                    [0, 42], [1, 195], [2, 430], [3, 850], [4, 1540], [5, 1980], [6, 2300]
                  ];
                  const coords = pts.map(([i, v]) => `${50 + (i / 6) * 490},${190 - (v / 2500) * 160}`);
                  return (
                    <polyline points={coords.join(" ")} fill="none" stroke="#16a34a" strokeWidth="2" strokeDasharray="6,4" strokeLinejoin="round" />
                  );
                })()}
                {/* Dots réels */}
                {[[0, 42], [1, 185], [2, 420], [3, 820], [4, 1512]].map(([i, v]) => (
                  <circle key={i} cx={50 + (i / 6) * 490} cy={190 - (v / 2500) * 160} r="4" fill="#2563eb" />
                ))}
                {/* Projection dots */}
                {[[5, 1950], [6, 2280]].map(([i, v]) => (
                  <circle key={i} cx={50 + (i / 6) * 490} cy={190 - (v / 2500) * 160} r="4" fill="#2563eb" fillOpacity="0.4" stroke="#2563eb" strokeWidth="1.5" />
                ))}
                {/* Legend */}
                <line x1="60" y1="14" x2="80" y2="14" stroke="#2563eb" strokeWidth="2.5" />
                <circle cx="70" cy="14" r="3" fill="#2563eb" />
                <text x="85" y="18" fontSize="10" fill="#374151">Réel</text>
                <line x1="130" y1="14" x2="150" y2="14" stroke="#16a34a" strokeWidth="2" strokeDasharray="5,3" />
                <text x="155" y="18" fontSize="10" fill="#374151">Objectif Ross 308</text>
                {/* Y axis label */}
                <text x="10" y="110" fontSize="9" fill="#9ca3af" transform="rotate(-90,10,110)">Poids (g)</text>
              </svg>
            </div>
          </div>
        </div>

        {/* ALIMENTATION */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-base font-semibold text-gray-900 mb-4">Alimentation</h2>

          <h3 className="text-sm font-semibold text-gray-700 mb-3">Plan d&apos;alimentation Ross 308</h3>
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-[#F8FBF8]">
                  <th className="text-left py-2 px-3 font-semibold text-gray-600 rounded-l-lg">Phase</th>
                  <th className="text-left py-2 px-3 font-semibold text-gray-600">Période</th>
                  <th className="text-left py-2 px-3 font-semibold text-gray-600">Aliment</th>
                  <th className="text-right py-2 px-3 font-semibold text-gray-600">Protéines</th>
                  <th className="text-right py-2 px-3 font-semibold text-gray-600">Énergie</th>
                  <th className="text-right py-2 px-3 font-semibold text-gray-600 rounded-r-lg">Qté prévue</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  { phase: "Démarrage", periode: "J0-J10", aliment: "Poussin Start 500g", prot: "22%", energie: "3 000 kcal/kg", qty: "180 kg" },
                  { phase: "Croissance", periode: "J11-J35", aliment: "Poulet Croissance 500g", prot: "19%", energie: "3 100 kcal/kg", qty: "720 kg" },
                  { phase: "Finition", periode: "J36-J42", aliment: "Poulet Finition 500g", prot: "17%", energie: "3 200 kcal/kg", qty: "280 kg" },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="py-2 px-3 font-medium text-gray-800">{row.phase}</td>
                    <td className="py-2 px-3 text-gray-600">{row.periode}</td>
                    <td className="py-2 px-3 text-gray-700">{row.aliment}</td>
                    <td className="py-2 px-3 text-right text-gray-700">{row.prot}</td>
                    <td className="py-2 px-3 text-right text-gray-700">{row.energie}</td>
                    <td className="py-2 px-3 text-right text-gray-700">{row.qty}</td>
                  </tr>
                ))}
                <tr className="bg-green-50 font-semibold">
                  <td className="py-2 px-3 text-green-800">Total prévu</td>
                  <td className="py-2 px-3 text-green-700">42 jours</td>
                  <td className="py-2 px-3 text-green-700">—</td>
                  <td className="py-2 px-3 text-right text-green-700">—</td>
                  <td className="py-2 px-3 text-right text-green-700">—</td>
                  <td className="py-2 px-3 text-right text-green-800">1 180 kg</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-sm font-semibold text-gray-700 mb-3">Stock aliment disponible</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="rounded-xl border border-green-100 bg-green-50 p-4">
              <p className="text-xs text-green-700 font-medium">Poulet Croissance</p>
              <p className="text-xl font-bold text-green-800 mt-1">312 kg ✅</p>
              <p className="text-xs text-green-600 mt-1">Stock suffisant J28→J35</p>
            </div>
            <div className="rounded-xl border border-green-100 bg-green-50 p-4">
              <p className="text-xs text-green-700 font-medium">Poulet Finition</p>
              <p className="text-xl font-bold text-green-800 mt-1">280 kg ✅</p>
              <p className="text-xs text-green-600 mt-1">Précommandé — livraison J34</p>
            </div>
          </div>
        </div>

        {/* SANTÉ & BIOSÉCURITÉ */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-base font-semibold text-gray-900 mb-4">Santé &amp; Biosécurité</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-[#F8FBF8]">
                  <th className="text-left py-2 px-3 font-semibold text-gray-600 rounded-l-lg">Intervention</th>
                  <th className="text-left py-2 px-3 font-semibold text-gray-600">Produit</th>
                  <th className="text-left py-2 px-3 font-semibold text-gray-600">Voie</th>
                  <th className="text-center py-2 px-3 font-semibold text-gray-600">Jour</th>
                  <th className="text-center py-2 px-3 font-semibold text-gray-600">Date</th>
                  <th className="text-left py-2 px-3 font-semibold text-gray-600 rounded-r-lg">Réalisé par</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  { inter: "Vaccination Newcastle", produit: "Hitchner B1 (eau de boisson)", voie: "Eau", jour: "J3", date: "16/06", real: "Yao G. ✅" },
                  { inter: "Vaccination Gumboro", produit: "D78 (eau de boisson)", voie: "Eau", jour: "J7", date: "20/06", real: "Yao G. ✅" },
                  { inter: "Vaccination Newcastle 2", produit: "La Sota (eau de boisson)", voie: "Eau", jour: "J14", date: "27/06", real: "Yao G. ✅" },
                  { inter: "Vitaminose (prévention)", produit: "Vitaminol ADE", voie: "Eau", jour: "J0→J7", date: "Continu", real: "Yao G. ✅" },
                  { inter: "Vaccination Gumboro 2", produit: "228E (eau de boisson)", voie: "Eau", jour: "J21", date: "04/07", real: "Yao G. ✅" },
                  { inter: "Traitement anticoccidien", produit: "Amprolium 20%", voie: "Eau", jour: "Si nécessaire", date: "—", real: "Selon clinique" },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="py-2 px-3 font-medium text-gray-800">{row.inter}</td>
                    <td className="py-2 px-3 text-gray-600">{row.produit}</td>
                    <td className="py-2 px-3 text-gray-700">{row.voie}</td>
                    <td className="py-2 px-3 text-center text-gray-700">{row.jour}</td>
                    <td className="py-2 px-3 text-center text-gray-700">{row.date}</td>
                    <td className="py-2 px-3 text-gray-700">{row.real}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* HISTORIQUE DES LOTS */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-base font-semibold text-gray-900 mb-4">Historique des lots</h2>
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-[#F8FBF8]">
                  <th className="text-left py-2 px-3 font-semibold text-gray-600 rounded-l-lg">Lot</th>
                  <th className="text-right py-2 px-3 font-semibold text-gray-600">Effectif initial</th>
                  <th className="text-center py-2 px-3 font-semibold text-gray-600">Durée</th>
                  <th className="text-right py-2 px-3 font-semibold text-gray-600">Poids sortie</th>
                  <th className="text-right py-2 px-3 font-semibold text-gray-600">Mortalité</th>
                  <th className="text-right py-2 px-3 font-semibold text-gray-600">IC</th>
                  <th className="text-right py-2 px-3 font-semibold text-gray-600">CA (XOF)</th>
                  <th className="text-right py-2 px-3 font-semibold text-gray-600 rounded-r-lg">Marge</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  { lot: "LOT-ELV-2025-02", eff: "1 200", dur: "42j (terminé 01/06)", poids: "2 287 g/poulet", mort: "3,2%", ic: "1,69", ca: "2 489 000", marge: "28,4%" },
                  { lot: "LOT-ELV-2025-01", eff: "1 000", dur: "42j (terminé 19/04)", poids: "2 312 g/poulet", mort: "4,1%", ic: "1,73", ca: "2 127 000", marge: "25,8%" },
                  { lot: "LOT-ELV-2024-04", eff: "1 200", dur: "42j (terminé 07/03)", poids: "2 198 g/poulet", mort: "5,5%", ic: "1,81", ca: "2 240 000", marge: "22,1%" },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="py-2 px-3 font-medium text-gray-800">{row.lot}</td>
                    <td className="py-2 px-3 text-right text-gray-700">{row.eff}</td>
                    <td className="py-2 px-3 text-center text-gray-600">{row.dur}</td>
                    <td className="py-2 px-3 text-right text-gray-700">{row.poids}</td>
                    <td className="py-2 px-3 text-right text-gray-700">{row.mort}</td>
                    <td className="py-2 px-3 text-right text-gray-700">{row.ic}</td>
                    <td className="py-2 px-3 text-right text-gray-700">{row.ca}</td>
                    <td className="py-2 px-3 text-right text-green-700 font-medium">{row.marge}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Projection */}
          <div className="rounded-xl bg-green-50 border border-green-100 p-4">
            <h3 className="text-sm font-semibold text-green-800 mb-3">Projection lot actuel (LOT-ELV-2025-03)</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {[
                { label: "Poids abattage estimé J42", value: "2 280 g/poulet" },
                { label: "Effectif estimé abattage", value: "1 148 poulets" },
                { label: "Poids vif total estimé", value: "2 617 kg" },
                { label: "Prix de vente", value: "1 250 XOF/kg" },
              ].map((item, i) => (
                <div key={i}>
                  <p className="text-xs text-green-600">{item.label}</p>
                  <p className="text-sm font-semibold text-green-800 mt-0.5">{item.value}</p>
                </div>
              ))}
              <div>
                <p className="text-xs text-green-600">CA estimé</p>
                <p className="text-lg font-bold text-green-900 mt-0.5">3 271 250 XOF 🎉</p>
                <p className="text-xs text-green-600">Meilleur lot 2025</p>
              </div>
            </div>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex flex-wrap gap-3">
          <a
            href="/elevage"
            className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 rounded-xl text-xs font-medium px-4 py-2.5 hover:bg-gray-200 transition-colors"
          >
            ← Retour à l&apos;élevage
          </a>
          <button className="inline-flex items-center gap-2 bg-[#2E7D32] text-white rounded-xl text-xs font-medium px-4 py-2.5 hover:bg-[#1B5E20] transition-colors">
            Saisir mesure quotidienne
          </button>
          <button className="inline-flex items-center gap-2 bg-white border border-gray-200 text-gray-700 rounded-xl text-xs font-medium px-4 py-2.5 hover:bg-gray-50 transition-colors">
            Rapport vétérinaire
          </button>
        </div>

      </div>
    </div>
  );
}
