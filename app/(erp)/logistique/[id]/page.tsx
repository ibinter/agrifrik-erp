import Topbar from "../../../components/Topbar";

export default async function LogistiqueFichePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-gray-50">
      <Topbar breadcrumb={["Logistique", "Logistique", `Expédition ${id}`]} />

      <div className="p-6 space-y-6">

        {/* En-tête bandeau vert */}
        <div className="rounded-2xl bg-[#1B5E20] text-white p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-xl font-bold">Fiche Expédition — LOG-2025-018</h1>
                <span className="text-sm bg-blue-500/30 border border-blue-400/40 rounded-full px-3 py-1 font-medium">
                  🔵 En transit maritime (J12/J22)
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-1 text-sm text-white/90 mt-2">
                <div><span className="text-white/60">Trajet :</span> Soubré Nord → Entrepôt San-Pédro → Port Abidjan → Rotterdam (NL)</div>
                <div><span className="text-white/60">Transporteur route :</span> SITARAIL CI (camion TIR — immat. CI-4821-KW)</div>
                <div><span className="text-white/60">Armateur :</span> Maersk Line</div>
                <div><span className="text-white/60">Navire :</span> MSC Abidjan | Voyage : V.25W-14</div>
              </div>
            </div>
          </div>
        </div>

        {/* 5 KPI */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            { label: "Volume", value: "1 conteneur 20' FCL", sub: "18 tonnes cacao Grade AA" },
            { label: "Valeur marchandise", value: "19 566 000 XOF", sub: "1 087 XOF/kg" },
            { label: "Fret maritime", value: "1 240 000 XOF", sub: "68,9 $/t" },
            { label: "ETA Rotterdam", value: "24/07/2025", sub: "Dans 13 jours" },
            { label: "Documents", value: "5/5 complets ✅", sub: "" },
          ].map((kpi) => (
            <div key={kpi.label} className="rounded-2xl border border-gray-100 bg-white p-5">
              <p className="text-xs text-gray-500 mb-1">{kpi.label}</p>
              <p className="text-base font-bold text-[#1B5E20]">{kpi.value}</p>
              {kpi.sub && <p className="text-xs text-gray-400 mt-1">{kpi.sub}</p>}
            </div>
          ))}
        </div>

        {/* Suivi du transport — Carte SVG */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6">
          <h2 className="text-base font-semibold text-gray-800 mb-4">Suivi du transport — Soubré → Rotterdam</h2>
          <div className="overflow-x-auto">
            <svg viewBox="0 0 700 320" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-3xl mx-auto rounded-xl">
              {/* Fond océan */}
              <rect width="700" height="320" fill="#E3F2FD" rx="12" />

              {/* Masse Afrique de l'Ouest stylisée */}
              <polygon points="30,80 200,60 230,120 210,200 180,280 80,300 40,260 20,180" fill="#C8E6C9" stroke="#A5D6A7" strokeWidth="1.5" />
              <text x="110" y="190" textAnchor="middle" fill="#2E7D32" fontSize="11" fontWeight="bold">Côte d&apos;Ivoire</text>

              {/* Péninsule ibérique / Europe stylisée */}
              <polygon points="430,20 560,20 600,60 590,130 540,160 490,150 450,100 420,60" fill="#E8EAF6" stroke="#C5CAE9" strokeWidth="1.5" />
              <text x="515" y="95" textAnchor="middle" fill="#5C6BC0" fontSize="10" fontWeight="bold">Europe</text>

              {/* Pays-Bas */}
              <ellipse cx="570" cy="48" rx="28" ry="16" fill="#D1C4E9" stroke="#9575CD" strokeWidth="1.5" />
              <text x="570" y="44" textAnchor="middle" fill="#4527A0" fontSize="9" fontWeight="bold">NL</text>
              <text x="570" y="56" textAnchor="middle" fill="#4527A0" fontSize="8">Rotterdam</text>

              {/* Méditerranée label */}
              <text x="390" y="165" textAnchor="middle" fill="#1565C0" fontSize="10" fontStyle="italic">Méditerranée</text>

              {/* Détroit de Gibraltar */}
              <text x="380" y="130" textAnchor="middle" fill="#0D47A1" fontSize="9">Détroit Gibraltar</text>

              {/* Golfe de Gascogne */}
              <text x="460" y="195" textAnchor="middle" fill="#1565C0" fontSize="9" fontStyle="italic">Golfe de Gascogne</text>

              {/* Points étapes */}
              {/* 1. Soubré Nord */}
              <circle cx="110" cy="155" r="8" fill="#2E7D32" stroke="white" strokeWidth="2" />
              <text x="110" y="151" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">1</text>
              <text x="110" y="175" textAnchor="middle" fill="#1B5E20" fontSize="9" fontWeight="bold">Soubré</text>
              <text x="110" y="186" textAnchor="middle" fill="#555" fontSize="8">25/06 ✅</text>

              {/* 2. San-Pédro */}
              <circle cx="145" cy="225" r="8" fill="#2E7D32" stroke="white" strokeWidth="2" />
              <text x="145" y="221" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">2</text>
              <text x="145" y="245" textAnchor="middle" fill="#1B5E20" fontSize="9" fontWeight="bold">San-Pédro</text>
              <text x="145" y="256" textAnchor="middle" fill="#555" fontSize="8">26/06 ✅</text>

              {/* 3. Port Abidjan */}
              <circle cx="185" cy="195" r="8" fill="#2E7D32" stroke="white" strokeWidth="2" />
              <text x="185" y="191" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">3</text>
              <text x="200" y="213" textAnchor="middle" fill="#1B5E20" fontSize="9" fontWeight="bold">Port Abidjan</text>
              <text x="200" y="224" textAnchor="middle" fill="#555" fontSize="8">29/06 ✅</text>

              {/* 4. Transit Méditerranée */}
              <circle cx="365" cy="155" r="8" fill="#1565C0" stroke="white" strokeWidth="2" />
              <text x="365" y="151" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">4</text>
              <text x="365" y="175" textAnchor="middle" fill="#1565C0" fontSize="9" fontWeight="bold">Méditerranée</text>
              <text x="365" y="186" textAnchor="middle" fill="#555" fontSize="8">En cours ✅</text>

              {/* Position actuelle — Golfe de Gascogne */}
              <circle cx="460" cy="210" r="9" fill="#E65100" stroke="white" strokeWidth="2" />
              <text x="460" y="206" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">★</text>
              <text x="480" y="228" textAnchor="middle" fill="#E65100" fontSize="9" fontWeight="bold">Position actuelle</text>
              <text x="480" y="239" textAnchor="middle" fill="#555" fontSize="8">11/07 🔵</text>

              {/* 5. Rotterdam */}
              <circle cx="570" cy="48" r="8" fill="#7B1FA2" stroke="white" strokeWidth="2" />
              <text x="570" y="44" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">5</text>
              <text x="610" y="75" textAnchor="middle" fill="#4527A0" fontSize="9" fontWeight="bold">Rotterdam</text>
              <text x="610" y="86" textAnchor="middle" fill="#555" fontSize="8">ETA 24/07 ⏳</text>

              {/* 6. Barry Callebaut */}
              <circle cx="600" cy="70" r="6" fill="#9C27B0" stroke="white" strokeWidth="2" />
              <text x="600" y="66" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold">6</text>
              <text x="650" y="100" textAnchor="middle" fill="#555" fontSize="8">Barry Callebaut</text>
              <text x="650" y="110" textAnchor="middle" fill="#555" fontSize="7">ETA 27/07 ⏳</text>

              {/* Ligne de trajet pointillée rouge */}
              <polyline
                points="110,155 145,225 185,195 365,155 460,210 570,48 600,70"
                fill="none"
                stroke="#E53935"
                strokeWidth="2"
                strokeDasharray="8,5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Légende */}
              <rect x="10" y="268" width="210" height="44" rx="8" fill="white" opacity="0.92" stroke="#ddd" />
              <circle cx="24" cy="280" r="5" fill="#2E7D32" />
              <text x="36" y="284" fill="#333" fontSize="9">Étape complétée</text>
              <circle cx="24" cy="295" r="5" fill="#E65100" />
              <text x="36" y="299" fill="#333" fontSize="9">Position actuelle</text>
              <circle cx="24" cy="310" r="5" fill="#7B1FA2" />
              <text x="36" y="314" fill="#333" fontSize="9">Destination</text>
              <line x1="115" y1="278" x2="140" y2="278" stroke="#E53935" strokeWidth="2" strokeDasharray="5,3" />
              <text x="148" y="281" fill="#333" fontSize="9">Trajet maritime</text>
            </svg>
          </div>

          {/* Timeline détaillée */}
          <h3 className="text-sm font-semibold text-gray-700 mt-6 mb-3">Timeline détaillée</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#F8FBF8]">
                  <th className="text-left px-4 py-3 text-gray-600 font-medium rounded-tl-xl">Étape</th>
                  <th className="text-left px-4 py-3 text-gray-600 font-medium">Date</th>
                  <th className="text-left px-4 py-3 text-gray-600 font-medium">Heure</th>
                  <th className="text-left px-4 py-3 text-gray-600 font-medium">Statut</th>
                  <th className="text-left px-4 py-3 text-gray-600 font-medium rounded-tr-xl">Preuve</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  ["Chargement ENT-001 (18 t)", "25/06/2025", "06h30", "✅ Fait", "BL interne"],
                  ["Départ camion TIR", "25/06/2025", "08h15", "✅ Fait", "Bordereau SITARAIL"],
                  ["Arrivée San-Pédro", "26/06/2025", "14h00", "✅ Fait", "Accusé réception"],
                  ["Inspection DGD CI", "27/06/2025", "09h00", "✅ Dédouané", "Connaissement CI"],
                  ["Chargement conteneur MAEU8441092", "28/06/2025", "15h00", "✅ Fait", "Packing list"],
                  ["Départ navire MSC Abidjan", "29/06/2025", "23h59", "✅ Fait", "BL maritime"],
                  ["Cap Vert (passage)", "04/07/2025", "—", "✅ Passé", "Tracking Maersk"],
                  ["Détroit de Gibraltar (passage)", "09/07/2025", "—", "✅ Passé", "Tracking Maersk"],
                  ["Position actuelle", "11/07/2025", "10h00", "🔵 Golfe de Gascogne", "GPS tracking"],
                  ["ETA Rotterdam", "24/07/2025", "08h00", "⏳ Estimé", "Maersk Alert"],
                ].map((row) => (
                  <tr key={row[0]} className="hover:bg-gray-50/60">
                    {row.map((cell, i) => (
                      <td key={i} className="px-4 py-3 text-gray-700">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Documents douaniers */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6">
          <h2 className="text-base font-semibold text-gray-800 mb-4">Documents douaniers</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#F8FBF8]">
                  <th className="text-left px-4 py-3 text-gray-600 font-medium rounded-tl-xl">Document</th>
                  <th className="text-left px-4 py-3 text-gray-600 font-medium">N°</th>
                  <th className="text-left px-4 py-3 text-gray-600 font-medium">Date</th>
                  <th className="text-left px-4 py-3 text-gray-600 font-medium">Émis par</th>
                  <th className="text-left px-4 py-3 text-gray-600 font-medium rounded-tr-xl">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  ["Connaissement maritime (BL)", "MAEU-2025-CI-04821", "28/06/2025", "Maersk CI", "✅ Original reçu"],
                  ["Certificat RA (copie)", "RA-CI-2025-00847", "01/03/2025", "Bureau Veritas", "✅ Annexé"],
                  ["Certificat phytosanitaire", "PHYTO-CI-2025-1847", "26/06/2025", "MINADER CI", "✅ Original"],
                  ["Certificat d'origine CEDEAO", "ORIG-CI-2025-2241", "26/06/2025", "Chambre Commerce", "✅ Original"],
                  ["Attestation fumigation", "FUM-SPN-2025-447", "27/06/2025", "Cotecna CI", "✅ Original"],
                  ["Déclaration export DGD CI", "DEX-2025-SP-18847", "27/06/2025", "DGD Côte d'Ivoire", "✅ Validée"],
                ].map((row) => (
                  <tr key={row[0]} className="hover:bg-gray-50/60">
                    {row.map((cell, i) => (
                      <td key={i} className="px-4 py-3 text-gray-700">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Données conteneur */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6">
          <h2 className="text-base font-semibold text-gray-800 mb-4">Données conteneur</h2>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-2 text-sm">
            {[
              ["N° conteneur", "MAEU 844 109-2 (ISO 6346)"],
              ["Type", "20' Standard Dry (5,9 m × 2,35 m × 2,39 m)"],
              ["Tare", "2 200 kg"],
              ["Charge utile", "18 000 kg"],
              ["Poids total", "20 200 kg ✅ (<24 000 kg max)"],
              ["Température à l'embarquement", "24°C / HR 65% (conforme cacao sec <7,5% humidité)"],
              ["Scellé douanier", "CI-DGD-2025-SP-84471 ✅"],
              ["IMO class", "Non dangereux (cacao = marchandise générale sèche)"],
            ].map(([dt, dd]) => (
              <div key={dt} className="flex gap-2">
                <dt className="w-52 flex-shrink-0 text-gray-500">{dt} :</dt>
                <dd className="text-gray-800 font-medium">{dd}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Finances transport */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6">
          <h2 className="text-base font-semibold text-gray-800 mb-4">Finances transport</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#F8FBF8]">
                  <th className="text-left px-4 py-3 text-gray-600 font-medium rounded-tl-xl">Poste</th>
                  <th className="text-right px-4 py-3 text-gray-600 font-medium rounded-tr-xl">Montant (XOF)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  ["Transport route Soubré → San-Pédro (SITARAIL)", "120 000"],
                  ["Manutention portuaire San-Pédro", "48 000"],
                  ["Fret maritime Abidjan → Rotterdam (Maersk 20')", "1 240 000"],
                  ["Assurance maritime (0,35% valeur)", "68 481"],
                  ["Frais DGD CI (droits export)", "92 000"],
                  ["Inspection phytosanitaire MINADER", "24 000"],
                  ["Cotecna inspection (fumigation)", "36 000"],
                ].map(([poste, montant]) => (
                  <tr key={poste} className="hover:bg-gray-50/60">
                    <td className="px-4 py-3 text-gray-700">{poste}</td>
                    <td className="px-4 py-3 text-gray-700 text-right">{montant}</td>
                  </tr>
                ))}
                <tr className="bg-[#F8FBF8] font-bold">
                  <td className="px-4 py-3 text-gray-800">Total coût transport</td>
                  <td className="px-4 py-3 text-[#1B5E20] text-right">1 628 481 XOF</td>
                </tr>
                <tr className="bg-green-50">
                  <td className="px-4 py-3 text-gray-700">Coût transport / kg</td>
                  <td className="px-4 py-3 text-[#2E7D32] text-right font-semibold">
                    90 XOF/kg <span className="text-xs font-normal text-gray-500">(budget : 95 XOF/kg → économie 5 XOF/kg)</span>
                  </td>
                </tr>
              </tbody>
            </table>
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
            Tracker sur Maersk
          </button>
          <button className="border border-[#2E7D32] text-[#2E7D32] rounded-xl text-xs font-medium px-4 py-2.5 hover:bg-[#F8FBF8] transition-colors">
            Télécharger les documents
          </button>
        </div>

      </div>
    </div>
  );
}
