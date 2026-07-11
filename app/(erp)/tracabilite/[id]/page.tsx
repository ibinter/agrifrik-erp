import Topbar from "../../../components/Topbar";

export default async function TracabiliteDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const breadcrumb = ["Commerce", "Traçabilité", `Lot ${id}`];

  const documents = [
    {
      nom: "Rapport qualité CQ-LOT-045",
      type: "Contrôle qualité",
      date: "30/06",
      emetteur: "Adjoua M.",
      validite: "—",
      statut: "✅ Validé",
    },
    {
      nom: "Certificat RA LOT-045",
      type: "Certification",
      date: "01/07",
      emetteur: "AGRIFRIK",
      validite: "28/02/2026",
      statut: "✅ Validé",
    },
    {
      nom: "Certificat phytosanitaire",
      type: "MINADER CI",
      date: "07/07",
      emetteur: "DPV Abidjan",
      validite: "30 jours",
      statut: "✅ Validé",
    },
    {
      nom: "Bill of Lading MSC",
      type: "Transport maritime",
      date: "10/07",
      emetteur: "MSC Lines",
      validite: "—",
      statut: "✅ Émis",
    },
    {
      nom: "Déclaration Aval Export (DAE)",
      type: "Douanes CI",
      date: "08/07",
      emetteur: "DGD Abidjan",
      validite: "—",
      statut: "✅ Validé",
    },
    {
      nom: "Packing List",
      type: "Commercial",
      date: "01/07",
      emetteur: "AGRIFRIK",
      validite: "—",
      statut: "✅ Signé",
    },
  ];

  const steps = [
    {
      num: "①",
      titre: "PARCELLE D'ORIGINE",
      statut: "done",
      date: "18/06/2025",
      details: [
        "Parcelle PAR-A1 | Coord. : 5°47'12\"N 6°36'24\"W",
        "Producteur : Ibrahim Sawadogo (COOP-0042) | RA certifié ✅",
        "Variété : Forastero hybride | Âge : 17 ans",
        "Dernier traitement : Ridomil Gold 24/06 (DRE 14j — libre à J+14)",
      ],
    },
    {
      num: "②",
      titre: "RÉCOLTE",
      statut: "done",
      date: "18-19/06/2025",
      details: [
        "4 opérateurs | 8 420 kg cabosses | Fèves fraîches : 2 640 kg",
        "Taux d'extraction : 31,4% | Contrôle initial : 0 moisissure",
      ],
    },
    {
      num: "③",
      titre: "FERMENTATION",
      statut: "done",
      date: "18-24/06/2025",
      details: [
        "Durée : 6 jours | Bacs A1 (1 500 kg) + A3 (1 140 kg)",
        "T°J3 : 52°C ✅ | T°J5 : 48°C ✅",
        "Cut test : 94% brunes ✅ | Retournements : J2, J4 ✅",
      ],
    },
    {
      num: "④",
      titre: "SÉCHAGE",
      statut: "done",
      date: "24-30/06/2025",
      details: [
        "6 jours : 3j solaire + 3j artificiel (45°C max)",
        "Humidité : 58% → 7,4% ✅",
      ],
    },
    {
      num: "⑤",
      titre: "CLASSEMENT QUALITÉ",
      statut: "done",
      date: "30/06/2025",
      details: [
        "Contrôleur : Adjoua Messou",
        "Cut test : 96/100 brunes → Grade AA ✅",
        "Résidus chimiques : 0 détecté ✅",
        "Certificat : CQ-LOT-2025-045.pdf",
      ],
    },
    {
      num: "⑥",
      titre: "CONDITIONNEMENT",
      statut: "done",
      date: "01/07/2025",
      details: [
        "41 sacs jute 60 kg | Palettes : 2",
        "Entrepôt A — Zone 1 | Stockage 1 semaine",
      ],
    },
    {
      num: "⑦",
      titre: "EXPORT",
      statut: "transit",
      date: "10/07/2025",
      details: [
        "Client : Cargill International SA Rotterdam",
        "Container : CAIU 842156-4 | Navire : MSC Allegria",
        "Départ San-Pédro : 10/07 | ETA Rotterdam : 05/08/2025",
        "FOB San-Pédro | Prix : 1 100 XOF/kg = 27 390 000 XOF",
      ],
    },
  ];

  // QR Code simulé en SVG
  const qrPixels: [number, number][] = [
    [0,0],[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],
    [0,1],[6,1],
    [0,2],[2,2],[3,2],[4,2],[6,2],
    [0,3],[2,3],[3,3],[4,3],[6,3],
    [0,4],[2,4],[3,4],[4,4],[6,4],
    [0,5],[6,5],
    [0,6],[1,6],[2,6],[3,6],[4,6],[5,6],[6,6],
    [2,8],[4,8],[6,8],
    [1,9],[3,9],[5,9],[6,9],
    [0,10],[2,10],[4,10],
    [1,11],[2,11],[4,11],[5,11],[6,11],
    [0,12],[3,12],[5,12],
    [0,13],[2,13],[4,13],[6,13],
    [0,14],[1,14],[2,14],[3,14],[4,14],[5,14],[6,14],
    [8,0],[9,0],[10,0],[11,0],[12,0],[13,0],[14,0],
    [8,1],[14,1],
    [8,2],[10,2],[11,2],[12,2],[14,2],
    [8,3],[10,3],[11,3],[12,3],[14,3],
    [8,4],[10,4],[11,4],[12,4],[14,4],
    [8,5],[14,5],
    [8,6],[9,6],[10,6],[11,6],[12,6],[13,6],[14,6],
    [8,8],[10,8],[12,8],
    [9,9],[11,9],[13,9],
    [8,10],[12,10],[14,10],
    [9,11],[11,11],[13,11],[14,11],
    [8,12],[10,12],[12,12],
    [8,13],[10,13],[12,13],
    [8,14],[9,14],[10,14],[11,14],[12,14],[13,14],[14,14],
  ];

  return (
    <div className="flex-1 bg-[#F8FBF8] min-h-screen">
      <Topbar breadcrumb={breadcrumb} />

      <div className="p-6 space-y-6">
        {/* En-tête */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-1 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl font-bold text-gray-800">LOT-2025-045</h1>
                <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 border border-blue-200 px-3 py-1 text-xs font-medium text-blue-700">
                  🔵 En transit — MSC Allegria → Rotterdam
                </span>
              </div>
              <p className="text-sm text-gray-500">Cacao Grade AA | San-Pédro, Côte d'Ivoire</p>
              <div className="flex flex-wrap gap-2 mt-3">
                <button className="bg-white border border-gray-200 rounded-xl text-xs font-medium px-4 py-2 text-gray-600 hover:bg-gray-50 transition-colors flex items-center gap-1.5">
                  🖨 Imprimer traçabilité
                </button>
                <button className="bg-[#2E7D32] text-white rounded-xl text-xs font-medium px-4 py-2 hover:bg-[#1B5E20] transition-colors flex items-center gap-1.5">
                  📄 Exporter PDF
                </button>
                <button className="border border-[#2E7D32] text-[#2E7D32] rounded-xl text-xs font-medium px-4 py-2 hover:bg-green-50 transition-colors flex items-center gap-1.5">
                  🔗 Partager lien client Cargill
                </button>
              </div>
            </div>
            {/* QR Code SVG simulé */}
            <div className="shrink-0 flex flex-col items-center gap-1">
              <svg width={80} height={80} viewBox="0 0 15 15" className="border border-gray-200 rounded p-0.5 bg-white">
                {qrPixels.map(([x, y]) => (
                  <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill="#111827" />
                ))}
              </svg>
              <span className="text-[10px] text-gray-400">QR traçabilité</span>
            </div>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
          {[
            { label: "Poids net", val: "24 900 kg", color: "text-gray-800" },
            { label: "Grade", val: "AA", color: "text-[#2E7D32]" },
            { label: "Score qualité", val: "96 / 100", color: "text-blue-700" },
            { label: "Origine", val: "PAR-A1 (6,2 ha)", color: "text-amber-700" },
            { label: "Destination", val: "Cargill Rotterdam", color: "text-gray-800" },
          ].map((k) => (
            <div
              key={k.label}
              className="rounded-2xl border border-gray-100 bg-white p-5 flex flex-col gap-1"
            >
              <p className="text-xs text-gray-400">{k.label}</p>
              <p className={`text-base font-bold ${k.color} leading-tight`}>{k.val}</p>
            </div>
          ))}
        </div>

        {/* Timeline traçabilité */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-semibold text-gray-700 mb-6">
            Timeline traçabilité complète
          </h2>
          <div className="relative">
            {/* Ligne verticale */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-100" />

            <div className="space-y-6">
              {steps.map((s, i) => (
                <div key={i} className="flex gap-4 relative">
                  {/* Icône étape */}
                  <div
                    className={`relative z-10 shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold shadow-sm border-2 ${
                      s.statut === "done"
                        ? "bg-[#2E7D32] border-[#2E7D32] text-white"
                        : "bg-blue-500 border-blue-500 text-white"
                    }`}
                  >
                    {s.num}
                  </div>
                  {/* Contenu */}
                  <div
                    className={`flex-1 rounded-xl border p-4 ${
                      s.statut === "transit"
                        ? "border-blue-200 bg-blue-50"
                        : "border-gray-100 bg-[#F8FBF8]"
                    }`}
                  >
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="text-sm font-semibold text-gray-800">{s.titre}</span>
                      <span
                        className={`text-xs font-medium rounded-full px-2 py-0.5 ${
                          s.statut === "done"
                            ? "bg-green-100 text-green-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {s.statut === "done" ? "✅ Complété" : "🔵 En transit"}
                      </span>
                      <span className="text-xs text-gray-400 ml-auto">{s.date}</span>
                    </div>
                    <ul className="space-y-1">
                      {s.details.map((d, j) => (
                        <li key={j} className="text-xs text-gray-600 leading-relaxed">
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Documents du lot */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">
            Documents du lot
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-[#F8FBF8]">
                  {["Document", "Type", "Date", "Émetteur", "Validité", "Statut"].map((h) => (
                    <th
                      key={h}
                      className="px-3 py-2 text-left text-gray-500 font-medium whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {documents.map((d, i) => (
                  <tr key={i} className="border-t border-gray-50 hover:bg-gray-50">
                    <td className="px-3 py-2.5 font-medium text-gray-800 whitespace-nowrap">
                      {d.nom}
                    </td>
                    <td className="px-3 py-2.5 text-gray-500 whitespace-nowrap">{d.type}</td>
                    <td className="px-3 py-2.5 text-gray-500 whitespace-nowrap">{d.date}</td>
                    <td className="px-3 py-2.5 text-gray-700 whitespace-nowrap">{d.emetteur}</td>
                    <td className="px-3 py-2.5 text-gray-500 whitespace-nowrap">{d.validite}</td>
                    <td className="px-3 py-2.5 whitespace-nowrap">
                      <span className="text-green-600 font-medium">{d.statut}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Blockchain hash */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-gray-700">Ancrage blockchain</span>
              <span className="rounded-full bg-green-50 border border-green-200 px-2 py-0.5 text-xs font-medium text-green-700">
                ✅ Immuable
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-400">Hyperledger Fabric — Bloc #84521</p>
              <p className="text-xs font-mono text-gray-600 truncate mt-0.5">
                0x4f2a8c7d9e1b3f6a2c5d8e0b4f7a1c3e6d9b2f5a8c1e4d7b0a3f6c9e2b5d8a1
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
