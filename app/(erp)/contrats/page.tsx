"use client";

import Topbar from "../../components/Topbar";

const contrats = [
  {
    num: "CTR-2025-001",
    partie: "Barry Callebaut CI",
    type: "Vente cadre",
    produit: "Cacao Grade AA",
    volume: "48t/an",
    duree: "Jan-Déc 2025",
    valeur: "52,2M XOF",
    statut: "Actif",
    detail: "7/12 livraisons",
  },
  {
    num: "CTR-2025-002",
    partie: "Cargill CI",
    type: "Vente cadre",
    produit: "Anacarde WW240",
    volume: "2t/an",
    duree: "Mar-Nov 2025",
    valeur: "3,05M XOF",
    statut: "Actif",
    detail: "",
  },
  {
    num: "CTR-2025-003",
    partie: "SCPA Afrique",
    type: "Approvisionnement",
    produit: "Intrants phyto",
    volume: "80 kg/an",
    duree: "Jan-Déc 2025",
    valeur: "672 000 XOF",
    statut: "Actif",
    detail: "",
  },
  {
    num: "CTR-2025-004",
    partie: "KCl Distribution",
    type: "Approvisionnement",
    produit: "KCl 60%",
    volume: "60 sacs/an",
    duree: "Jan-Déc 2025",
    valeur: "4,8M XOF",
    statut: "Actif",
    detail: "",
  },
  {
    num: "CTR-2024-001",
    partie: "Barry Callebaut CI",
    type: "Vente cadre",
    produit: "Cacao Grade AA",
    volume: "44t",
    duree: "Jan-Déc 2024",
    valeur: "47,8M XOF",
    statut: "Expiré",
    detail: "renouvelé",
  },
];

const barData = [
  { label: "CTR-2025-001 BC", pct: 66.7, realise: "32t/48t", color: "#2E7D32" },
  { label: "CTR-2025-002 Cargill", pct: 100, realise: "2t/2t", color: "#1B5E20" },
  { label: "CTR-2025-003 SCPA", pct: 75, realise: "60kg/80kg", color: "#4CAF50" },
  { label: "CTR-2025-004 KCl", pct: 42, realise: "25 sacs/60", color: "#E65100" },
];

const alertes = [
  {
    icon: "⏳",
    alerte: "Renouvellement CTR-2025-001 (BC)",
    contrat: "Barry Callebaut",
    echeance: "31/12/2025",
    action: "Négocier avant octobre",
  },
  {
    icon: "⏳",
    alerte: "Livraison 8/12 CTR-2025-001",
    contrat: "Barry Callebaut",
    echeance: "15/08/2025",
    action: "Préparer lot août",
  },
  {
    icon: "🔔",
    alerte: "Devis OLAM expire",
    contrat: "OLAM Cocoa CI",
    echeance: "09/08/2025",
    action: "Relancer d'ici le 22/07",
  },
];

export default function ContratsPage() {
  return (
    <div className="flex-1 flex flex-col min-h-screen bg-[#F8FBF8]">
      <Topbar breadcrumb={["Commerce", "Contrats"]} />

      <main className="flex-1 p-6 space-y-6">
        {/* En-tête */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Contrats Commerciaux</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              Contrats cadre, accords de vente et engagements pluriannuels
            </p>
          </div>
          <button className="inline-flex items-center gap-2 bg-[#2E7D32] text-white rounded-xl text-xs font-medium px-4 py-2 hover:bg-[#1B5E20] transition-colors self-start md:self-auto">
            + Nouveau contrat
          </button>
        </div>

        {/* 4 KPI */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="rounded-2xl border border-gray-100 bg-white p-5">
            <p className="text-xs text-gray-500 mb-1">Contrats actifs</p>
            <p className="text-3xl font-bold text-[#2E7D32]">4</p>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-white p-5">
            <p className="text-xs text-gray-500 mb-1">Volume contractualisé</p>
            <p className="text-3xl font-bold text-gray-900">58t</p>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-white p-5">
            <p className="text-xs text-gray-500 mb-1">CA garanti</p>
            <p className="text-3xl font-bold text-gray-900">63,2M</p>
            <p className="text-xs text-gray-400">XOF</p>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-white p-5">
            <p className="text-xs text-gray-500 mb-1">Litiges</p>
            <p className="text-3xl font-bold text-[#2E7D32]">0</p>
          </div>
        </div>

        {/* Tableau contrats actifs */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-base font-semibold text-gray-900 mb-4">Contrats actifs</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[800px]">
              <thead>
                <tr className="bg-[#F8FBF8] text-xs text-gray-500 uppercase">
                  <th className="text-left py-2 px-3">N°</th>
                  <th className="text-left py-2 px-3">Client / Fournisseur</th>
                  <th className="text-left py-2 px-3">Type</th>
                  <th className="text-left py-2 px-3">Produit</th>
                  <th className="text-left py-2 px-3">Volume</th>
                  <th className="text-left py-2 px-3">Durée</th>
                  <th className="text-right py-2 px-3">Valeur</th>
                  <th className="text-center py-2 px-3">Statut</th>
                </tr>
              </thead>
              <tbody>
                {contrats.map((c) => (
                  <tr key={c.num} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-2.5 px-3 font-medium text-[#2E7D32] text-xs">{c.num}</td>
                    <td className="py-2.5 px-3 text-gray-900 font-medium">{c.partie}</td>
                    <td className="py-2.5 px-3 text-gray-500 text-xs">{c.type}</td>
                    <td className="py-2.5 px-3 text-gray-700">{c.produit}</td>
                    <td className="py-2.5 px-3 text-gray-700">{c.volume}</td>
                    <td className="py-2.5 px-3 text-gray-500 text-xs">{c.duree}</td>
                    <td className="py-2.5 px-3 text-right font-semibold text-gray-900">{c.valeur}</td>
                    <td className="py-2.5 px-3 text-center">
                      {c.statut === "Actif" ? (
                        <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 border border-green-200 text-xs px-2 py-0.5 rounded-full font-medium">
                          ✅ Actif{c.detail ? ` (${c.detail})` : ""}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-500 border border-gray-200 text-xs px-2 py-0.5 rounded-full font-medium">
                          ✅ Expiré — {c.detail}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* SVG taux d'exécution */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-base font-semibold text-gray-900 mb-4">Taux d&apos;exécution des contrats 2025</h2>
          <svg
            viewBox="0 0 640 200"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full max-w-2xl"
            aria-label="Taux d'exécution des contrats 2025"
          >
            {/* Grid verticals */}
            {[0, 25, 50, 75, 100].map((pct) => {
              const x = 180 + (pct / 100) * 400;
              return (
                <g key={pct}>
                  <line x1={x} y1={10} x2={x} y2={175} stroke="#E5E7EB" strokeWidth="1" />
                  <text x={x} y={190} textAnchor="middle" fontSize="9" fill="#9CA3AF">
                    {pct}%
                  </text>
                </g>
              );
            })}

            {barData.map((b, i) => {
              const barY = 20 + i * 40;
              const barW = (b.pct / 100) * 400;
              return (
                <g key={b.label}>
                  {/* Label */}
                  <text x="175" y={barY + 13} textAnchor="end" fontSize="10" fill="#374151">
                    {b.label}
                  </text>
                  {/* Background bar */}
                  <rect x={180} y={barY} width={400} height={22} rx={4} fill="#F3F4F6" />
                  {/* Filled bar */}
                  <rect x={180} y={barY} width={barW} height={22} rx={4} fill={b.color} />
                  {/* Pct text */}
                  <text x={180 + barW + 6} y={barY + 14} fontSize="10" fill={b.color} fontWeight="600">
                    {b.pct}% ({b.realise})
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Contrats en négociation */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-base font-semibold text-gray-900 mb-4">Contrats en négociation</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[700px]">
              <thead>
                <tr className="bg-[#F8FBF8] text-xs text-gray-500 uppercase">
                  <th className="text-left py-2 px-3">N°</th>
                  <th className="text-left py-2 px-3">Partie</th>
                  <th className="text-left py-2 px-3">Objet</th>
                  <th className="text-left py-2 px-3">Volume visé</th>
                  <th className="text-right py-2 px-3">Valeur est.</th>
                  <th className="text-center py-2 px-3">Stade</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-gray-100">
                  <td className="py-2.5 px-3 text-xs text-blue-600 font-medium">
                    DEV-2025-003 → CTR-2025-005
                  </td>
                  <td className="py-2.5 px-3 font-medium text-gray-900">OLAM Cocoa CI</td>
                  <td className="py-2.5 px-3 text-gray-700">Cacao Grade AA</td>
                  <td className="py-2.5 px-3 text-gray-700">8t</td>
                  <td className="py-2.5 px-3 text-right font-semibold text-gray-900">8,76M XOF</td>
                  <td className="py-2.5 px-3 text-center">
                    <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 border border-blue-200 text-xs px-2 py-0.5 rounded-full font-medium">
                      🔵 Devis envoyé — en attente
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Alertes contrats */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-base font-semibold text-gray-900 mb-4">Alertes contrats</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[600px]">
              <thead>
                <tr className="bg-[#F8FBF8] text-xs text-gray-500 uppercase">
                  <th className="text-left py-2 px-3">Alerte</th>
                  <th className="text-left py-2 px-3">Contrat</th>
                  <th className="text-left py-2 px-3">Échéance</th>
                  <th className="text-left py-2 px-3">Action recommandée</th>
                </tr>
              </thead>
              <tbody>
                {alertes.map((a) => (
                  <tr key={a.alerte} className="border-t border-gray-100">
                    <td className="py-2.5 px-3 text-gray-800">
                      {a.icon} {a.alerte}
                    </td>
                    <td className="py-2.5 px-3 text-gray-600">{a.contrat}</td>
                    <td className="py-2.5 px-3 text-gray-700 font-medium">{a.echeance}</td>
                    <td className="py-2.5 px-3 text-gray-600 text-xs">{a.action}</td>
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
