import Topbar from "../../../components/Topbar";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ContratDetailPage({ params }: Props) {
  const { id } = await params;

  // Données cumulées livraisons 2025
  const objCumul = [4, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 48];
  const realCumul = [4, 8, 12, 16, 20, 24, 28, 31.4, null, null, null, null];

  const chartW = 640;
  const chartH = 200;
  const padL = 40;
  const padR = 20;
  const padT = 16;
  const padB = 36;
  const innerW = chartW - padL - padR;
  const innerH = chartH - padT - padB;
  const maxVal = 52;
  const months = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];

  const xOf = (i: number) => padL + (i / 11) * innerW;
  const yOf = (v: number) => padT + innerH - (v / maxVal) * innerH;

  // Polyline objectif
  const objPoints = objCumul.map((v, i) => `${xOf(i)},${yOf(v)}`).join(" ");

  // Area réel
  const realPoints = realCumul
    .map((v, i) => (v !== null ? `${xOf(i)},${yOf(v)}` : null))
    .filter(Boolean) as string[];
  const lastRealIdx = realCumul.lastIndexOf(31.4);
  const areaPath =
    `M ${xOf(0)},${yOf(padT + innerH)} ` +
    realPoints.map((p) => `L ${p}`).join(" ") +
    ` L ${xOf(lastRealIdx)},${yOf(padT + innerH)} Z`;
  const linePath = `M ${realPoints.join(" L ")}`;

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FBF8]">
      <Topbar breadcrumb={["Commerce", "Contrats", `Contrat ${id}`]} />

      <main className="flex-1 p-6 space-y-6 max-w-7xl mx-auto w-full">

        {/* En-tête bandeau vert */}
        <div className="rounded-2xl bg-[#1B5E20] text-white p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-2xl font-bold">CTR-2025-001</span>
                <span className="text-[#A5D6A7] text-sm font-medium">Contrat Client</span>
                <span className="inline-flex items-center gap-1.5 bg-[#4CAF50] text-white text-xs font-semibold px-3 py-1 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-white inline-block" />
                  ✅ Actif
                </span>
              </div>
              <p className="text-white font-semibold text-lg">Contrat de vente pluriannuel cacao</p>
              <p className="text-[#A5D6A7] text-sm">
                Partie contractante :{" "}
                <span className="text-white font-medium">Barry Callebaut Manufacturing CI SAS</span>
              </p>
              <p className="text-[#A5D6A7] text-sm">
                Représentant BC :{" "}
                <span className="text-white font-medium">Michael Kamara, Acheteur senior</span>
              </p>
            </div>
            <div className="text-sm text-[#C8E6C9] space-y-1 text-right">
              <p>
                <span className="text-[#A5D6A7]">Signé le :</span> 15/01/2025
              </p>
              <p>
                <span className="text-[#A5D6A7]">Durée :</span> 3 ans
              </p>
              <p className="text-white font-medium">Jan 2025 → Déc 2027</p>
            </div>
          </div>
        </div>

        {/* 5 KPI */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {[
            { label: "Volume contractualisé 2025", value: "48 t cacao sec", sub: "Grade AA" },
            { label: "Livré YTD", value: "31,4 t (65,4%)", sub: "sur 48 t" },
            { label: "CA réalisé YTD 2025", value: "34 132 000 XOF", sub: "≈ 52 036 EUR" },
            { label: "Prix contractuel fixe", value: "1 115 XOF/kg", sub: "prime +28 XOF vs BCC" },
            { label: "Prochain chargement", value: "25/07/2025", sub: "12 t — Cont. BARU-2025-004" },
          ].map((kpi) => (
            <div key={kpi.label} className="rounded-2xl border border-gray-100 bg-white p-5">
              <p className="text-xs text-gray-500 mb-1">{kpi.label}</p>
              <p className="text-sm font-bold text-[#1B5E20] leading-tight">{kpi.value}</p>
              <p className="text-xs text-gray-400 mt-0.5">{kpi.sub}</p>
            </div>
          ))}
        </div>

        {/* Conditions contractuelles */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-semibold text-[#1B5E20] mb-4">Conditions contractuelles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Col 1 : Volume & prix */}
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Volume &amp; Prix</p>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <tbody>
                    {[
                      ["Volume annuel", "48 t cacao sec Grade AA (±10% tolérance)"],
                      ["Volume 2026", "52 t (révision jan 2026 + 5%)"],
                      ["Volume 2027", "56 t (révision jan 2027 + 7,7%)"],
                      ["Prix 2025", "1 115 XOF/kg fixe (indépendant du BCC Abidjan)"],
                      ["Prix 2026-2027", "Indexé BCC + prime 28 XOF/kg"],
                      ["Devise", "XOF (Franc CFA) / Paiement EUR possible sur accord"],
                      ["Incoterm", "DAP San-Pédro (livraison destination incluse)"],
                    ].map(([k, v]) => (
                      <tr key={k} className="border-t border-gray-50">
                        <td className="py-2.5 pr-4 font-semibold text-gray-600 whitespace-nowrap w-36">{k}</td>
                        <td className="py-2.5 text-gray-700">{v}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            {/* Col 2 : Qualité & paiement */}
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Qualité &amp; Paiement</p>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <tbody>
                    {[
                      ["Grade min. requis", "AA (cut test ≥95% fèves brunes)"],
                      ["Humidité max.", "7,5%"],
                      ["Corps étrangers", "0%"],
                      ["Moisissures tolérées", "0%"],
                      ["Certification requise", "Rainforest Alliance 2020 + traçabilité lot"],
                      ["Paiement", "30% à la commande + 70% à la livraison BL"],
                      ["Délai paiement", "J+15 BL (lettre de crédit SGBCI)"],
                      ["Pénalité retard", "0,5% par semaine de retard"],
                    ].map(([k, v]) => (
                      <tr key={k} className="border-t border-gray-50">
                        <td className="py-2.5 pr-4 font-semibold text-gray-600 whitespace-nowrap w-40">{k}</td>
                        <td className="py-2.5 text-gray-700">{v}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Calendrier de livraisons 2025 */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-semibold text-[#1B5E20] mb-4">
            Calendrier de livraisons 2025
          </h2>

          {/* SVG Area chart */}
          <div className="overflow-x-auto mb-6">
            <svg
              viewBox={`0 0 ${chartW} ${chartH}`}
              width={chartW}
              height={chartH}
              className="block max-w-full"
              aria-label="Exécution contrat 2025 — Livraisons cumulées"
            >
              {/* Grille horizontale */}
              {[0, 12, 24, 36, 48].map((v) => (
                <g key={v}>
                  <line
                    x1={padL}
                    y1={yOf(v)}
                    x2={chartW - padR}
                    y2={yOf(v)}
                    stroke="#E5E7EB"
                    strokeWidth="0.8"
                  />
                  <text
                    x={padL - 6}
                    y={yOf(v) + 4}
                    textAnchor="end"
                    fontSize="9"
                    fill="#9CA3AF"
                  >
                    {v}t
                  </text>
                </g>
              ))}

              {/* Labels mois */}
              {months.map((m, i) => (
                <text
                  key={i}
                  x={xOf(i)}
                  y={chartH - padB + 14}
                  textAnchor="middle"
                  fontSize="9"
                  fill="#9CA3AF"
                >
                  {m}
                </text>
              ))}

              {/* Area réel (bleu) */}
              <path d={areaPath} fill="#DBEAFE" fillOpacity="0.6" />
              <path
                d={linePath}
                fill="none"
                stroke="#1D4ED8"
                strokeWidth="2"
                strokeLinejoin="round"
              />

              {/* Ligne objectif (verte) */}
              <polyline
                points={objPoints}
                fill="none"
                stroke="#4CAF50"
                strokeWidth="2"
                strokeDasharray="5 3"
                strokeLinejoin="round"
              />

              {/* Annotation retard */}
              <text x={xOf(7) + 6} y={yOf(31.4) - 8} fontSize="9" fill="#DC2626" fontWeight="600">
                Retard 1,6 t à rattraper
              </text>
              <circle cx={xOf(7)} cy={yOf(31.4)} r="4" fill="#1D4ED8" />

              {/* Légende */}
              <g transform={`translate(${padL + 8}, ${padT + 4})`}>
                <line x1="0" y1="6" x2="18" y2="6" stroke="#4CAF50" strokeWidth="2" strokeDasharray="5 3" />
                <text x="22" y="10" fontSize="9" fill="#6B7280">Objectif cumulé</text>
                <rect x="80" y="2" width="16" height="8" fill="#DBEAFE" fillOpacity="0.8" stroke="#1D4ED8" strokeWidth="1.5" />
                <text x="100" y="10" fontSize="9" fill="#6B7280">Réel livré</text>
              </g>
            </svg>
          </div>

          {/* Tableau des livraisons */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-[#F8FBF8]">
                  {["N° BL", "Date", "Volume", "Qualité", "Montant (XOF)", "Paiement"].map((h) => (
                    <th key={h} className="text-left px-3 py-2 font-semibold text-gray-600">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ["BL-2025-001", "15/01", "4,0 t", "AA 97%", "4 460 000", "✅ Payé J+12"],
                  ["BL-2025-002", "10/02", "4,0 t", "AA 96%", "4 460 000", "✅ Payé J+14"],
                  ["BL-2025-003", "05/03", "4,0 t", "AA 95%", "4 460 000", "✅ Payé J+15"],
                  ["BL-2025-004", "02/04", "4,0 t", "AA 97%", "4 460 000", "✅ Payé J+13"],
                  ["BL-2025-005", "28/04", "4,0 t", "AA 96%", "4 460 000", "✅ Payé J+14"],
                  ["BL-2025-006", "26/05", "4,0 t", "AA 98%", "4 460 000", "✅ Payé J+11"],
                  ["BL-2025-007", "23/06", "4,0 t", "AA 97%", "4 460 000", "✅ Payé J+15"],
                  ["BL-2025-008", "11/07", "3,4 t", "AA 96%", "3 791 000 (partiel)", "🔵 En attente (BL émis)"],
                ].map(([bl, date, vol, qual, mnt, pay]) => (
                  <tr key={bl} className="border-t border-gray-50 hover:bg-[#F8FBF8] transition-colors">
                    <td className="px-3 py-2.5 text-gray-700 font-medium">{bl}</td>
                    <td className="px-3 py-2.5 text-gray-500">{date}</td>
                    <td className="px-3 py-2.5 text-gray-700">{vol}</td>
                    <td className="px-3 py-2.5">
                      <span className="bg-[#E8F5E9] text-[#2E7D32] text-xs font-semibold px-2 py-0.5 rounded-full">
                        {qual}
                      </span>
                    </td>
                    <td className="px-3 py-2.5 text-gray-700">{mnt}</td>
                    <td className="px-3 py-2.5 text-gray-600">{pay}</td>
                  </tr>
                ))}
                <tr className="border-t-2 border-gray-200 bg-[#F8FBF8] font-bold">
                  <td className="px-3 py-2.5 text-gray-700">TOTAL YTD</td>
                  <td className="px-3 py-2.5 text-gray-400">—</td>
                  <td className="px-3 py-2.5 text-[#1B5E20]">31,4 t</td>
                  <td className="px-3 py-2.5 text-gray-600">AA moy. 96,5%</td>
                  <td className="px-3 py-2.5 text-[#1B5E20]">34 991 000</td>
                  <td className="px-3 py-2.5 text-gray-600">31,2M payés</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Avenants et négociations */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-semibold text-[#1B5E20] mb-4">Avenants et négociations</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-[#F8FBF8]">
                  {["Avenant", "Date", "Objet", "Résultat"].map((h) => (
                    <th key={h} className="text-left px-3 py-2 font-semibold text-gray-600">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    avt: "AVN-001/2025",
                    date: "20/03/2025",
                    objet:
                      "Tolérance humidité 7,5% → 8,0% (demande BC pour lots transition saison sèche)",
                    result: "✅ Accepté jusqu'au 30/04/2025",
                  },
                  {
                    avt: "AVN-002/2025",
                    date: "15/05/2025",
                    objet:
                      "Report livraison BL-008 (mai → juillet) en raison de récolte intermédiaire réduite",
                    result: "✅ Accepté (pénalité suspendue)",
                  },
                  {
                    avt: "Négociation 2026",
                    date: "Prévue oct. 2025",
                    objet: "Volume +5%, prix indexé BCC+28",
                    result: "📅 À initier",
                  },
                ].map((row) => (
                  <tr
                    key={row.avt}
                    className="border-t border-gray-50 hover:bg-[#F8FBF8] transition-colors"
                  >
                    <td className="px-3 py-2.5 text-gray-700 font-medium whitespace-nowrap">
                      {row.avt}
                    </td>
                    <td className="px-3 py-2.5 text-gray-500 whitespace-nowrap">{row.date}</td>
                    <td className="px-3 py-2.5 text-gray-600">{row.objet}</td>
                    <td className="px-3 py-2.5 text-gray-700">{row.result}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Documents contractuels */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-semibold text-[#1B5E20] mb-4">Documents contractuels</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-[#F8FBF8]">
                  {["Document", "Date", "Statut"].map((h) => (
                    <th key={h} className="text-left px-3 py-2 font-semibold text-gray-600">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ["Contrat signé (PDF)", "15/01/2025", "✅ Archivé"],
                  ["Annexe A — Spécifications qualité", "15/01/2025", "✅ Archivé"],
                  ["Annexe B — Plan de livraison 2025", "15/01/2025", "✅ Archivé"],
                  ["Certificat RA 2025 (joint)", "28/02/2025", "✅ Valide jusqu'au 28/02/2026"],
                  ["AVN-001/2025 signé", "20/03/2025", "✅ Archivé"],
                  ["AVN-002/2025 signé", "15/05/2025", "✅ Archivé"],
                ].map(([doc, date, statut]) => (
                  <tr
                    key={doc}
                    className="border-t border-gray-50 hover:bg-[#F8FBF8] transition-colors"
                  >
                    <td className="px-3 py-2.5 text-gray-700 font-medium">{doc}</td>
                    <td className="px-3 py-2.5 text-gray-500 whitespace-nowrap">{date}</td>
                    <td className="px-3 py-2.5">
                      <span className="inline-flex items-center gap-1 bg-[#E8F5E9] text-[#2E7D32] text-xs font-medium px-2 py-0.5 rounded-full">
                        {statut}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Boutons d'action */}
        <div className="flex flex-wrap gap-3 pb-6">
          <a
            href="/contrats"
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
            Retour aux contrats
          </a>
          <button className="inline-flex items-center gap-2 bg-[#2E7D32] text-white rounded-xl text-xs font-medium px-4 py-2.5 hover:bg-[#1B5E20] transition-colors">
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
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Générer BL
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
            Initier avenant
          </button>
        </div>

      </main>
    </div>
  );
}
