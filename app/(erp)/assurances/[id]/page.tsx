import Topbar from "../../../components/Topbar";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function AssuranceDetailPage({ params }: Props) {
  const { id } = await params;

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FBF8]">
      <Topbar breadcrumb={["Finance", "Assurances", `Police ${id}`]} />

      <main className="flex-1 p-6 space-y-6 max-w-7xl mx-auto w-full">

        {/* En-tête bandeau vert */}
        <div className="rounded-2xl bg-[#1B5E20] text-white p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-2xl font-bold">ASS-2025-001</span>
                <span className="inline-flex items-center gap-1.5 bg-[#4CAF50] text-white text-xs font-semibold px-3 py-1 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-white inline-block" />
                  ✅ En vigueur
                </span>
                <span className="inline-flex items-center gap-1.5 bg-[#E65100] text-white text-xs font-semibold px-3 py-1 rounded-full">
                  📅 Renouvellement dans 173 jours
                </span>
              </div>
              <p className="text-white font-semibold text-lg">
                Multirisque Agricole — Plantations cacao &amp; anacarde
              </p>
              <p className="text-[#A5D6A7] text-sm">
                Assureur :{" "}
                <span className="text-white font-medium">Axa Assurances Côte d&apos;Ivoire</span>
              </p>
              <p className="text-[#A5D6A7] text-sm">
                Agent :{" "}
                <span className="text-white font-medium">
                  Fernand Konan (+225 22 XX XX XX)
                </span>
              </p>
            </div>
            <div className="text-sm text-[#C8E6C9] space-y-1 text-right">
              <p>
                <span className="text-[#A5D6A7]">Souscrite le :</span> 01/01/2025
              </p>
              <p>
                <span className="text-[#A5D6A7]">Échéance :</span> 31/12/2025
              </p>
            </div>
          </div>
        </div>

        {/* 5 KPI */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {[
            { label: "Prime annuelle", value: "2 240 000 XOF", sub: "toutes garanties" },
            { label: "Valeur assurée totale", value: "285 000 000 XOF", sub: "≈ 434 500 EUR" },
            { label: "Sinistres déclarés 2025", value: "0 ✅", sub: "aucun sinistre" },
            { label: "Franchise", value: "5% de la perte", sub: "min. 250 000 XOF" },
            { label: "Taux de prime", value: "0,786%", sub: "sur valeur assurée" },
          ].map((kpi) => (
            <div key={kpi.label} className="rounded-2xl border border-gray-100 bg-white p-5">
              <p className="text-xs text-gray-500 mb-1">{kpi.label}</p>
              <p className="text-sm font-bold text-[#1B5E20] leading-tight">{kpi.value}</p>
              <p className="text-xs text-gray-400 mt-0.5">{kpi.sub}</p>
            </div>
          ))}
        </div>

        {/* Garanties souscrites */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-semibold text-[#1B5E20] mb-4">Garanties souscrites</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-[#F8FBF8]">
                  {["Garantie", "Description", "Capital assuré", "Franchise", "Prime (XOF)"].map(
                    (h) => (
                      <th key={h} className="text-left px-3 py-2 font-semibold text-gray-600">
                        {h}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {[
                  [
                    "Incendie & foudre",
                    "Plantations, bâtiments, stocks",
                    "120 000 000 XOF",
                    "5% min 250k",
                    "580 000",
                  ],
                  [
                    "Tempête, cyclone, grêle",
                    "Dommages cultures suite événement météo",
                    "85 000 000 XOF",
                    "10%",
                    "640 000",
                  ],
                  [
                    "Sécheresse agricole",
                    "Perte de récolte si pluviométrie <60% de la normale",
                    "40 000 000 XOF",
                    "20% (indice)",
                    "480 000",
                  ],
                  [
                    "Responsabilité civile exploitation",
                    "Dommages tiers (voisins, travailleurs)",
                    "30 000 000 XOF",
                    "Néant",
                    "280 000",
                  ],
                  [
                    "Bris de machine",
                    "Matériel agricole (tracteur, pulvérisateurs)",
                    "10 000 000 XOF",
                    "500 000 XOF",
                    "260 000",
                  ],
                ].map(([gar, desc, cap, franc, prime]) => (
                  <tr
                    key={gar}
                    className="border-t border-gray-50 hover:bg-[#F8FBF8] transition-colors"
                  >
                    <td className="px-3 py-2.5 text-gray-700 font-medium whitespace-nowrap">
                      {gar}
                    </td>
                    <td className="px-3 py-2.5 text-gray-600">{desc}</td>
                    <td className="px-3 py-2.5 text-gray-700 whitespace-nowrap">{cap}</td>
                    <td className="px-3 py-2.5 text-gray-500">{franc}</td>
                    <td className="px-3 py-2.5 text-gray-700">{prime}</td>
                  </tr>
                ))}
                <tr className="border-t-2 border-gray-200 bg-[#F8FBF8] font-bold">
                  <td className="px-3 py-2.5 text-gray-700">TOTAL</td>
                  <td className="px-3 py-2.5 text-gray-400">—</td>
                  <td className="px-3 py-2.5 text-[#1B5E20]">285 000 000 XOF</td>
                  <td className="px-3 py-2.5 text-gray-400">—</td>
                  <td className="px-3 py-2.5 text-[#1B5E20]">2 240 000 XOF</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Biens assurés */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-semibold text-[#1B5E20] mb-4">Biens assurés</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-[#F8FBF8]">
                  {["Bien", "Description", "Valeur déclarée", "Couverture"].map((h) => (
                    <th key={h} className="text-left px-3 py-2 font-semibold text-gray-600">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  [
                    "Plantation PAR-A1 (6,2 ha cacao)",
                    "1 050 plants cacao T-60, 17 ans, certif. RA",
                    "62 000 000 XOF",
                    "Incendie + Tempête",
                  ],
                  [
                    "Plantation PAR-A2 (4,8 ha cacao)",
                    "1 600 plants, 15 ans, certif. RA",
                    "48 000 000 XOF",
                    "Incendie + Tempête",
                  ],
                  [
                    "Plantation PAR-B2 (3,3 ha cacao)",
                    "1 110 plants, 6 ans",
                    "16 500 000 XOF",
                    "Incendie + Tempête",
                  ],
                  [
                    "Plantation PAR-C1+C2 (10,4 ha anacarde)",
                    "Anacarde WW240, 5 ans, non certifié RA",
                    "41 600 000 XOF",
                    "Incendie + Sécheresse",
                  ],
                  [
                    "Entrepôt + équipements Soubré Nord",
                    "Bâtiment 800 m², claies séchage, bacs ferment.",
                    "38 000 000 XOF",
                    "Incendie + Bris machine",
                  ],
                  [
                    "Stock cacao (max 25 t)",
                    "Fèves sèches Grade AA — valeur max août-déc",
                    "28 900 000 XOF",
                    "Incendie",
                  ],
                  [
                    "Tracteur John Deere DT55 + remorque",
                    "4 ans, bon état, révision 01/2025",
                    "12 000 000 XOF",
                    "Bris machine + RC",
                  ],
                  [
                    "Pulvérisateurs (3×)",
                    "2 × 400 L + 1 × 800 L",
                    "3 200 000 XOF",
                    "Bris machine",
                  ],
                ].map(([bien, desc, val, couv]) => (
                  <tr
                    key={bien}
                    className="border-t border-gray-50 hover:bg-[#F8FBF8] transition-colors"
                  >
                    <td className="px-3 py-2.5 text-gray-700 font-medium">{bien}</td>
                    <td className="px-3 py-2.5 text-gray-600">{desc}</td>
                    <td className="px-3 py-2.5 text-gray-700 whitespace-nowrap">{val}</td>
                    <td className="px-3 py-2.5">
                      <span className="bg-[#E8F5E9] text-[#2E7D32] text-xs font-medium px-2 py-0.5 rounded-full">
                        {couv}
                      </span>
                    </td>
                  </tr>
                ))}
                <tr className="border-t-2 border-gray-200 bg-[#F8FBF8] font-bold">
                  <td className="px-3 py-2.5 text-gray-700">TOTAL</td>
                  <td className="px-3 py-2.5 text-gray-400">—</td>
                  <td className="px-3 py-2.5 text-[#1B5E20]">250 200 000 XOF</td>
                  <td className="px-3 py-2.5 text-gray-500">≈ 285 M couverts</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Obligations déclaratives */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-semibold text-[#1B5E20] mb-4">Obligations déclaratives</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-[#F8FBF8]">
                  {["Obligation", "Fréquence", "Prochaine date", "Statut"].map((h) => (
                    <th key={h} className="text-left px-3 py-2 font-semibold text-gray-600">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  [
                    "Déclaration de récolte prévisionnelle",
                    "Annuelle avant saison",
                    "15/09/2025",
                    "⏳ À faire",
                    "warn",
                  ],
                  [
                    "Inventaire biens mobiliers",
                    "Annuelle",
                    "15/11/2025",
                    "⏳ À faire",
                    "warn",
                  ],
                  [
                    "Déclaration mise à jour effectif saisonnier",
                    "Avant recrutement",
                    "01/09/2025",
                    "⏳ À planifier",
                    "warn",
                  ],
                  [
                    "Déclaration achat nouveau matériel",
                    "Dans les 30 j de l'achat",
                    "—",
                    "✅ À jour",
                    "ok",
                  ],
                  [
                    "Rapport état parcelles (si sinistre)",
                    "Dans les 48 h du sinistre",
                    "—",
                    "N/A (pas de sinistre)",
                    "na",
                  ],
                ].map(([obl, freq, date, statut, type]) => (
                  <tr
                    key={obl}
                    className="border-t border-gray-50 hover:bg-[#F8FBF8] transition-colors"
                  >
                    <td className="px-3 py-2.5 text-gray-700 font-medium">{obl}</td>
                    <td className="px-3 py-2.5 text-gray-500">{freq}</td>
                    <td className="px-3 py-2.5 text-gray-600 whitespace-nowrap">{date}</td>
                    <td className="px-3 py-2.5">
                      <span
                        className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${
                          type === "ok"
                            ? "bg-[#E8F5E9] text-[#2E7D32]"
                            : type === "warn"
                            ? "bg-[#FFF3E0] text-[#E65100]"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {statut}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Historique sinistres */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-semibold text-[#1B5E20] mb-4">Historique sinistres</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-[#F8FBF8]">
                  {["Année", "N° sinistre", "Nature", "Déclaré", "Indemnité", "Clôture"].map(
                    (h) => (
                      <th key={h} className="text-left px-3 py-2 font-semibold text-gray-600">
                        {h}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {[
                  ["2024", "—", "Aucun sinistre", "—", "—", "— ✅"],
                  [
                    "2023",
                    "SIN-2023-01",
                    "Tempête (PAR-B3, 1,8 ha cacao) — vent > 90 km/h",
                    "28/09/2023",
                    "2 840 000 XOF",
                    "15/11/2023 (42 j) ✅",
                  ],
                  ["2022", "—", "Aucun sinistre", "—", "—", "— ✅"],
                  [
                    "2021",
                    "SIN-2021-02",
                    "Incendie piste (début d'incendie, dégâts PAR-A2 bordure)",
                    "15/03/2021",
                    "980 000 XOF",
                    "30/04/2021 (45 j) ✅",
                  ],
                ].map(([annee, num, nature, decl, indem, clo]) => (
                  <tr
                    key={`${annee}-${num}`}
                    className="border-t border-gray-50 hover:bg-[#F8FBF8] transition-colors"
                  >
                    <td className="px-3 py-2.5 font-semibold text-gray-700">{annee}</td>
                    <td className="px-3 py-2.5 text-gray-600">{num}</td>
                    <td className="px-3 py-2.5 text-gray-600">{nature}</td>
                    <td className="px-3 py-2.5 text-gray-500 whitespace-nowrap">{decl}</td>
                    <td className="px-3 py-2.5 text-gray-700">{indem}</td>
                    <td className="px-3 py-2.5 text-gray-600">{clo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 p-3 rounded-xl bg-[#E8F5E9] border border-[#A5D6A7]">
            <p className="text-xs text-[#2E7D32] font-semibold">
              Taux de sinistralité AGRIFRIK (5 ans) : 1,24% — Inférieur à la moyenne secteur (2,8%) ✅
            </p>
          </div>
        </div>

        {/* Boutons d'action */}
        <div className="flex flex-wrap gap-3 pb-6">
          <a
            href="/assurances"
            className="inline-flex items-center gap-2 bg-white border border-gray-200 text-gray-700 rounded-xl text-xs font-medium px-4 py-2.5 hover:bg-gray-50 transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Retour aux assurances
          </a>
          <button className="inline-flex items-center gap-2 bg-[#C62828] text-white rounded-xl text-xs font-medium px-4 py-2.5 hover:bg-[#B71C1C] transition-colors">
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            Déclarer un sinistre
          </button>
          <button className="inline-flex items-center gap-2 bg-[#E65100] text-white rounded-xl text-xs font-medium px-4 py-2.5 hover:bg-[#BF360C] transition-colors">
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
            Demander avenant
          </button>
        </div>

      </main>
    </div>
  );
}
