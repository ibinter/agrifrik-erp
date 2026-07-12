import Topbar from "../../../components/Topbar";

export default async function LogistiqueFichePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-gray-50">
      <Topbar breadcrumb={["Logistique", "Logistique", `Transport ${id}`]} />

      <div className="p-6 space-y-6">

        {/* En-tête bandeau vert */}
        <div className="rounded-2xl bg-[#1B5E20] text-white p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-3 flex-1">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-xl font-bold">Fiche Transport — LOG-2025-007</h1>
                <span className="text-sm bg-green-400/20 border border-green-400/30 rounded-full px-3 py-1 font-medium">
                  ✅ Livraison effectuée le 11/07/2025 à 11h42
                </span>
              </div>
              <p className="text-white/80 text-sm">Livraison 3 400 kg cacao Grade AA — Barry Callebaut CI</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-1.5 text-sm text-white/90 mt-1">
                <div><span className="text-white/55">Chauffeur :</span> Koné Seydou (Transporteur Nawa-Express)</div>
                <div><span className="text-white/55">Véhicule :</span> Toyota HiLux CI-2021-NW-0847 + remorque FR-AB-8812</div>
                <div><span className="text-white/55">Départ :</span> ENT-001 EXP-001 Soubré</div>
                <div><span className="text-white/55">Arrivée :</span> BC Entrepôt San-Pédro</div>
                <div><span className="text-white/55">Distance :</span> 115 km</div>
                <div><span className="text-white/55">Durée estimée :</span> 2h15 — <span className="text-green-300">Durée réelle : 2h08</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 KPI */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Cargaison", value: "3 400 kg", sub: "52 sacs × 65 kg" },
            { label: "Valeur transportée", value: "3 695 800 XOF", sub: "Cacao Grade AA" },
            { label: "Coût transport", value: "204 000 XOF", sub: "0,060 XOF/kg/km" },
            { label: "Documents", value: "BL-008 + FAC-2025-009", sub: "Fiche de pesée ✅" },
          ].map((kpi) => (
            <div key={kpi.label} className="rounded-2xl border border-gray-100 bg-white p-5">
              <p className="text-xs text-gray-500 mb-1">{kpi.label}</p>
              <p className="text-base font-bold text-[#1B5E20]">{kpi.value}</p>
              <p className="text-xs text-gray-400 mt-1">{kpi.sub}</p>
            </div>
          ))}
        </div>

        {/* Détail de la cargaison */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6">
          <h2 className="text-base font-semibold text-gray-800 mb-4">Détail de la cargaison</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[700px]">
              <thead>
                <tr className="bg-[#F8FBF8]">
                  <th className="text-left px-4 py-3 text-gray-600 font-medium rounded-tl-xl">#</th>
                  <th className="text-left px-4 py-3 text-gray-600 font-medium">Lot</th>
                  <th className="text-left px-4 py-3 text-gray-600 font-medium">Produit</th>
                  <th className="text-right px-4 py-3 text-gray-600 font-medium">Nb sacs</th>
                  <th className="text-right px-4 py-3 text-gray-600 font-medium">Poids brut</th>
                  <th className="text-right px-4 py-3 text-gray-600 font-medium">Poids net</th>
                  <th className="text-center px-4 py-3 text-gray-600 font-medium">Grade</th>
                  <th className="text-right px-4 py-3 text-gray-600 font-medium rounded-tr-xl">Valeur</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  ["1", "LOT-2025-044", "Cacao sec Grade AA", "14 sacs", "910 kg", "896 kg", "AA", "973 312 XOF"],
                  ["2", "LOT-2025-045", "Cacao sec Grade AA", "18 sacs", "1 170 kg", "1 152 kg", "AA", "1 252 224 XOF"],
                  ["3", "LOT-2025-046", "Cacao sec Grade AA", "20 sacs", "1 300 kg", "1 280 kg", "AA", "1 391 360 XOF"],
                ].map((row) => (
                  <tr key={row[1]} className="hover:bg-gray-50/60">
                    {row.map((cell, i) => (
                      <td
                        key={i}
                        className={`px-4 py-3 text-gray-700 ${i === 6 ? "text-center" : i >= 3 ? "text-right" : ""} ${i === 1 ? "font-mono text-xs font-semibold" : ""}`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr className="bg-[#F8FBF8] font-bold">
                  <td className="px-4 py-3 text-gray-800 rounded-bl-xl" colSpan={3}>TOTAL</td>
                  <td className="px-4 py-3 text-gray-800 text-right">52 sacs</td>
                  <td className="px-4 py-3 text-gray-800 text-right">3 380 kg brut</td>
                  <td className="px-4 py-3 text-gray-800 text-right">3 328 kg net</td>
                  <td className="px-4 py-3 text-gray-800 text-center">AA</td>
                  <td className="px-4 py-3 text-[#1B5E20] text-right rounded-br-xl">≈ 3 695 800 XOF</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 mt-3">
            Note : Poids contractuel facturé sur pesée BC à réception (fiche de pesée SGID-BC-2025-0847 confirmée)
          </p>
        </div>

        {/* Traçabilité du trajet */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6">
          <h2 className="text-base font-semibold text-gray-800 mb-4">Traçabilité du trajet — LOG-2025-007</h2>

          {/* Carte SVG */}
          <div className="overflow-x-auto mb-6">
            <svg
              viewBox="0 0 700 280"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full max-w-3xl mx-auto rounded-xl"
            >
              {/* Fond clair */}
              <rect width="700" height="280" fill="#F1F8E9" rx="12" />

              {/* Côte atlantique (bas) */}
              <rect x="0" y="248" width="700" height="32" fill="#BBDEFB" rx="0" />
              <text x="350" y="268" textAnchor="middle" fill="#1565C0" fontSize="10" fontStyle="italic">Côte Atlantique</text>

              {/* Fond terrain intérieur */}
              <rect x="0" y="0" width="700" height="248" fill="#F9FBE7" rx="12" />

              {/* Route N1 — trait gris */}
              <polyline
                points="80,80 280,140 440,200 620,220"
                fill="none"
                stroke="#9E9E9E"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Flèche sur la route */}
              <polygon points="612,215 626,220 612,225" fill="#9E9E9E" />
              <text x="350" y="128" textAnchor="middle" fill="#757575" fontSize="9" fontWeight="500">Route N1</text>

              {/* Tracé trajet — trait vert */}
              <polyline
                points="80,80 280,140 440,200 620,220"
                fill="none"
                stroke="#2E7D32"
                strokeWidth="2.5"
                strokeDasharray="10,5"
                strokeLinecap="round"
              />

              {/* Point départ — EXP-001 Soubré */}
              <circle cx="80" cy="80" r="12" fill="#2E7D32" stroke="white" strokeWidth="2.5" />
              <text x="80" y="84" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">DEP</text>
              <text x="80" y="60" textAnchor="middle" fill="#1B5E20" fontSize="10" fontWeight="bold">EXP-001 Soubré</text>
              <text x="80" y="73" textAnchor="middle" fill="#4CAF50" fontSize="8">ENT-001</text>

              {/* Méagui */}
              <circle cx="280" cy="140" r="8" fill="#78909C" stroke="white" strokeWidth="2" />
              <text x="280" y="125" textAnchor="middle" fill="#455A64" fontSize="9" fontWeight="600">Méagui</text>
              <text x="280" y="115" textAnchor="middle" fill="#78909C" fontSize="8">10h22 ✅</text>

              {/* Tabou carrefour */}
              <circle cx="440" cy="200" r="8" fill="#78909C" stroke="white" strokeWidth="2" />
              <text x="440" y="185" textAnchor="middle" fill="#455A64" fontSize="9" fontWeight="600">Tabou carrefour</text>

              {/* Annotation distance */}
              <rect x="240" y="155" width="140" height="28" rx="6" fill="white" opacity="0.9" stroke="#E0E0E0" />
              <text x="310" y="167" textAnchor="middle" fill="#1B5E20" fontSize="9" fontWeight="bold">115 km</text>
              <text x="310" y="179" textAnchor="middle" fill="#555" fontSize="8">Durée réelle : 2h08</text>

              {/* Point arrivée — BC San-Pédro */}
              <rect x="600" y="205" width="24" height="24" rx="4" fill="#1565C0" stroke="white" strokeWidth="2.5" />
              <text x="612" y="221" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">BC</text>
              <text x="635" y="200" textAnchor="start" fill="#0D47A1" fontSize="10" fontWeight="bold">BC Entrepôt</text>
              <text x="635" y="212" textAnchor="start" fill="#0D47A1" fontSize="9">San-Pédro</text>
              <text x="635" y="224" textAnchor="start" fill="#4CAF50" fontSize="8">11h42 ✅</text>

              {/* Légende */}
              <rect x="10" y="10" width="200" height="56" rx="8" fill="white" opacity="0.92" stroke="#E0E0E0" />
              <circle cx="26" cy="26" r="6" fill="#2E7D32" />
              <text x="38" y="30" fill="#333" fontSize="9">Point de départ (EXP-001)</text>
              <circle cx="26" cy="42" r="6" fill="#78909C" />
              <text x="38" y="46" fill="#333" fontSize="9">Étape intermédiaire</text>
              <rect x="20" y="53" width="12" height="12" rx="2" fill="#1565C0" />
              <text x="38" y="62" fill="#333" fontSize="9">Point d&apos;arrivée (BC)</text>
            </svg>
          </div>

          {/* Horodatage */}
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Horodatage</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#F8FBF8]">
                  <th className="text-left px-4 py-3 text-gray-600 font-medium rounded-tl-xl">Point</th>
                  <th className="text-left px-4 py-3 text-gray-600 font-medium">Heure</th>
                  <th className="text-left px-4 py-3 text-gray-600 font-medium rounded-tr-xl">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  ["Chargement ENT-001", "08h45", "✅ 52 sacs vérifiés, scellés"],
                  ["Départ EXP-001", "09h34", "✅ BL-008 tamponné, signé"],
                  ["Passage Méagui", "10h22", "✅ GPS track"],
                  ["Arrivée BC San-Pédro", "11h42", "✅ Pesée + déchargement"],
                  ["Réception BC signée", "12h15", "✅ SGID-BC-2025-0847"],
                ].map((row) => (
                  <tr key={row[0]} className="hover:bg-gray-50/60">
                    <td className="px-4 py-3 text-gray-800 font-medium">{row[0]}</td>
                    <td className="px-4 py-3 text-gray-700 font-mono text-sm">{row[1]}</td>
                    <td className="px-4 py-3 text-gray-700">{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Documents de transport */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6">
          <h2 className="text-base font-semibold text-gray-800 mb-4">Documents de transport</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#F8FBF8]">
                  <th className="text-left px-4 py-3 text-gray-600 font-medium rounded-tl-xl">Document</th>
                  <th className="text-left px-4 py-3 text-gray-600 font-medium">Référence</th>
                  <th className="text-left px-4 py-3 text-gray-600 font-medium rounded-tr-xl">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  ["Bon de livraison BL-008", "BL-EXP001-2025-008", "✅ Signé BC le 11/07 12:15"],
                  ["Facture commerciale", "FAC-2025-009", "✅ Émise + remise banque"],
                  ["Fiche de pesée BC", "SGID-BC-2025-0847", "✅ Poids net : 3 400 kg confirmé"],
                  ["Fiche traçabilité lots", "FT-2025-044/045/046", "✅ EUDR conforme"],
                  ["Certificat d'origine CI", "CO-MINAGRI-2025-0847", "✅ Valide"],
                ].map((row) => (
                  <tr key={row[1]} className="hover:bg-gray-50/60">
                    <td className="px-4 py-3 text-gray-800 font-medium">{row[0]}</td>
                    <td className="px-4 py-3 text-gray-700 font-mono text-xs">{row[1]}</td>
                    <td className="px-4 py-3 text-gray-700">{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Coût de transport */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6">
          <h2 className="text-base font-semibold text-gray-800 mb-4">Coût de transport</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#F8FBF8]">
                  <th className="text-left px-4 py-3 text-gray-600 font-medium rounded-tl-xl">Poste</th>
                  <th className="text-left px-4 py-3 text-gray-600 font-medium">Détail</th>
                  <th className="text-right px-4 py-3 text-gray-600 font-medium rounded-tr-xl">Montant</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  ["Carburant (115 km × 2 × 0,6 L/km = 138 L × 735 XOF/L)", "Gasoil EXP-001", "101 430 XOF"],
                  ["Conducteur (forfait livraison Nawa-Express)", "Koné Seydou", "75 000 XOF"],
                  ["Péages et divers", "N1 Méagui–San-Pédro", "27 570 XOF"],
                ].map((row) => (
                  <tr key={row[0]} className="hover:bg-gray-50/60">
                    <td className="px-4 py-3 text-gray-700">{row[0]}</td>
                    <td className="px-4 py-3 text-gray-500 text-xs">{row[1]}</td>
                    <td className="px-4 py-3 text-gray-700 text-right font-medium">{row[2]}</td>
                  </tr>
                ))}
                <tr className="bg-[#F8FBF8] font-bold">
                  <td className="px-4 py-3 text-gray-800 rounded-bl-xl" colSpan={2}>TOTAL</td>
                  <td className="px-4 py-3 text-[#1B5E20] text-right rounded-br-xl">204 000 XOF</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-3 flex flex-wrap gap-4 text-sm">
            <span className="text-gray-600">
              Coût logistique/kg : <span className="font-semibold text-gray-800">60 XOF/kg</span>
            </span>
            <span className="text-gray-400">|</span>
            <span className="text-gray-600">
              Budget planifié : <span className="font-semibold text-gray-800">65 XOF/kg</span>
            </span>
            <span className="text-green-700 font-semibold">→ Économie −5 XOF/kg ✅</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3 pb-4">
          <a
            href="/logistique"
            className="bg-gray-100 text-gray-700 rounded-xl text-xs font-medium px-4 py-2.5 hover:bg-gray-200 transition-colors"
          >
            ← Retour à la logistique
          </a>
          <button className="bg-[#2E7D32] text-white rounded-xl text-xs font-medium px-4 py-2.5 hover:bg-[#1B5E20] transition-colors">
            Nouveau transport
          </button>
          <button className="border border-[#2E7D32] text-[#2E7D32] rounded-xl text-xs font-medium px-4 py-2.5 hover:bg-[#F8FBF8] transition-colors">
            Voir la facture
          </button>
        </div>

      </div>
    </div>
  );
}
