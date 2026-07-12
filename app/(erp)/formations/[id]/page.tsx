import Topbar from "../../../components/Topbar";

export default async function FormationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-[#F8FBF8]">
      <Topbar breadcrumb={["RH", "Formations", `Formation ${id}`]} />

      <div className="flex-1 overflow-y-auto p-6 space-y-6">

        {/* En-tête bandeau vert */}
        <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: "#1B5E20" }}>
          <div className="p-6 flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="font-mono text-xs bg-white/20 text-white px-2 py-0.5 rounded">
                  FORM-2025-003
                </span>
                <span className="bg-green-400/30 text-green-100 text-xs font-medium px-3 py-0.5 rounded-full border border-green-300/40">
                  ✅ Terminée
                </span>
              </div>
              <h1 className="text-xl font-bold text-white">
                Bonnes Pratiques Agricoles (BPA) Cacao
              </h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1 text-sm text-green-200">
                <div>
                  <span className="text-white font-semibold">Organisme :</span>{" "}
                  ANADER CI (Agence Nationale d&apos;Appui au Développement Rural)
                </div>
                <div>
                  <span className="text-white font-semibold">Formateur :</span>{" "}
                  M. Dognon Sylvain — Technicien ANADER Région Nawa
                </div>
                <div>
                  <span className="text-white font-semibold">Date :</span>{" "}
                  08–10/01/2025 (3 jours)
                </div>
                <div>
                  <span className="text-white font-semibold">Lieu :</span>{" "}
                  Soubré, Centre ANADER
                </div>
              </div>
            </div>
            <div className="flex-shrink-0 bg-green-900/50 rounded-xl px-5 py-4 text-center">
              <div className="text-2xl font-bold text-white">2/2</div>
              <div className="text-xs text-green-200 mt-1">Participants ✅</div>
            </div>
          </div>
        </div>

        {/* 4 KPI */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Durée", value: "3 jours", sub: "21 heures" },
            { label: "Participants EXP-001", value: "2", sub: "Ibrahim Sawadogo + Akissi Kouamé" },
            { label: "Score moyen QCM", value: "87%", sub: "✅ Objectif atteint", green: true },
            { label: "Coût total", value: "120 000 XOF", sub: "Pris en charge FDFP CI" },
          ].map((kpi) => (
            <div key={kpi.label} className="rounded-2xl border border-gray-100 bg-white p-5">
              <div className="text-xs text-gray-500 mb-1">{kpi.label}</div>
              <div className={`text-xl font-bold ${kpi.green ? "text-[#2E7D32]" : "text-gray-800"}`}>
                {kpi.value}
              </div>
              <div className="text-xs text-gray-400 mt-1">{kpi.sub}</div>
            </div>
          ))}
        </div>

        {/* Programme de formation */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-semibold text-gray-800 mb-4">Programme de formation</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#F8FBF8]">
                  {["Jour", "Thèmes abordés", "Durée", "Supports"].map((h) => (
                    <th
                      key={h}
                      className="text-left px-3 py-2 text-xs font-medium text-gray-500 first:rounded-l-lg last:rounded-r-lg"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  {
                    jour: "Jour 1 — 08/01",
                    themes:
                      "Introduction BPA cacao, profil agroécologique CI, diagnostic parcellaire, itinéraire technique optimal",
                    duree: "7h",
                    supports: "Supports ANADER + CNRA CI",
                  },
                  {
                    jour: "Jour 2 — 09/01",
                    themes:
                      "Gestion des bioagresseurs (mirides, Phytophthora), liste produits homologués CI, application Cypercal/Cupravit, DAR",
                    duree: "7h",
                    supports: "Fiches MINAGRI, démonstration terrain parcelle école",
                  },
                  {
                    jour: "Jour 3 — 10/01",
                    themes:
                      "Post-récolte cacao : fermentation 5–7j, séchage (humidité <8%), tri grades AA/A/B, registres CNRA, certification RA",
                    duree: "7h",
                    supports: "CNRA CI protocoles + exigences RA Critères 2020",
                  },
                ].map((row) => (
                  <tr key={row.jour} className="hover:bg-gray-50/50">
                    <td className="px-3 py-3 font-medium text-[#2E7D32] whitespace-nowrap">{row.jour}</td>
                    <td className="px-3 py-3 text-gray-700">{row.themes}</td>
                    <td className="px-3 py-3 text-gray-600 whitespace-nowrap">{row.duree}</td>
                    <td className="px-3 py-3 text-xs text-gray-500">{row.supports}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Résultats des participants */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-semibold text-gray-800 mb-4">Résultats des participants</h2>

          {/* Tableau */}
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#F8FBF8]">
                  {["Participant", "Poste", "Présence", "QCM Score", "Attestation"].map((h) => (
                    <th
                      key={h}
                      className="text-left px-3 py-2 text-xs font-medium text-gray-500 first:rounded-l-lg last:rounded-r-lg"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  {
                    nom: "Ibrahim Sawadogo",
                    poste: "Technicien terrain",
                    presence: "3/3j (21h) ✅",
                    score: "91%",
                    attestation: "✅ Attestation ANADER n°2025-0142",
                  },
                  {
                    nom: "Akissi Kouamé",
                    poste: "Saisonnière",
                    presence: "3/3j (21h) ✅",
                    score: "82%",
                    attestation: "✅ Attestation ANADER n°2025-0143",
                  },
                ].map((p) => (
                  <tr key={p.nom} className="hover:bg-gray-50/50">
                    <td className="px-3 py-3 font-medium text-gray-800">{p.nom}</td>
                    <td className="px-3 py-3 text-gray-600">{p.poste}</td>
                    <td className="px-3 py-3 text-gray-700">{p.presence}</td>
                    <td className="px-3 py-3 font-bold text-[#2E7D32]">{p.score}</td>
                    <td className="px-3 py-3 text-xs text-gray-600">{p.attestation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* SVG Bar chart horizontal — Scores QCM par module */}
          <h3 className="text-xs font-semibold text-gray-600 mb-3">Scores QCM par module</h3>
          <svg
            viewBox="0 0 580 200"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full max-w-[580px]"
          >
            {/* Légende */}
            <rect x="10" y="6" width="10" height="10" rx="2" fill="#2E7D32" />
            <text x="24" y="16" fontSize="10" fill="#555">Ibrahim Sawadogo</text>
            <rect x="170" y="6" width="10" height="10" rx="2" fill="#4CAF50" />
            <text x="184" y="16" fontSize="10" fill="#555">Akissi Kouamé</text>

            {[
              { label: "Profil agroécol.", ibra: 95, akissi: 88, y: 30 },
              { label: "Bioagresseurs", ibra: 90, akissi: 80, y: 65 },
              { label: "Produits phyto", ibra: 92, akissi: 84, y: 100 },
              { label: "Post-récolte", ibra: 88, akissi: 78, y: 135 },
              { label: "Réglementation RA", ibra: 90, akissi: 82, y: 170 },
            ].map((m) => {
              const maxW = 310;
              const wI = (m.ibra / 100) * maxW;
              const wA = (m.akissi / 100) * maxW;
              return (
                <g key={m.label}>
                  <text x="128" y={m.y + 11} fontSize="10" fill="#555" textAnchor="end">
                    {m.label}
                  </text>
                  {/* Ibrahim */}
                  <rect x="136" y={m.y} width={wI} height="12" rx="3" fill="#2E7D32" />
                  <text x={136 + wI + 4} y={m.y + 10} fontSize="10" fill="#2E7D32" fontWeight="600">
                    {m.ibra}%
                  </text>
                  {/* Akissi */}
                  <rect x="136" y={m.y + 14} width={wA} height="12" rx="3" fill="#4CAF50" />
                  <text x={136 + wA + 4} y={m.y + 24} fontSize="10" fill="#4CAF50">
                    {m.akissi}%
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Impact sur EXP-001 */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-semibold text-gray-800 mb-4">Impact sur EXP-001</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#F8FBF8]">
                  {["Compétence acquise", "Impact attendu", "Indicateur"].map((h) => (
                    <th
                      key={h}
                      className="text-left px-3 py-2 text-xs font-medium text-gray-500 first:rounded-l-lg last:rounded-r-lg"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  {
                    competence: "Gestion optimisée bioagresseurs",
                    impact: "-15% utilisation intrants phyto",
                    indicateur: "Coût phyto 2025 vs 2024",
                  },
                  {
                    competence: "Application correcte Cupravit",
                    impact: "0 cabosse noire Phytophthora",
                    indicateur: "Résultat LOT-046 : 0% infection ✅",
                  },
                  {
                    competence: "Tri grades amélioré",
                    impact: "+5% Grade AA sur lots suivants",
                    indicateur: "Grade AA H1 2025 : 87% ✅",
                  },
                  {
                    competence: "Registres conformes CNRA",
                    impact: "Score traçabilité 98/100 CNRA",
                    indicateur: "CNRA-NW-2025-0042 ✅",
                  },
                ].map((row) => (
                  <tr key={row.competence} className="hover:bg-gray-50/50">
                    <td className="px-3 py-3 font-medium text-gray-800">{row.competence}</td>
                    <td className="px-3 py-3 text-gray-700">{row.impact}</td>
                    <td className="px-3 py-3 text-xs text-gray-500">{row.indicateur}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Financement et documents */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-semibold text-gray-800 mb-1">Financement et documents</h2>
          <p className="text-xs text-gray-500 mb-4">
            Prise en charge FDFP :{" "}
            <span className="font-semibold text-[#2E7D32]">120 000 XOF</span> remboursés le{" "}
            <span className="font-medium text-gray-700">28/02/2025</span>{" "}
            <span className="font-mono text-gray-400">(FDFP-CI-REMB-2025-089)</span>
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#F8FBF8]">
                  {["Document", "Référence", "Date", "Action"].map((h) => (
                    <th
                      key={h}
                      className="text-left px-3 py-2 text-xs font-medium text-gray-500 first:rounded-l-lg last:rounded-r-lg"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  {
                    doc: "Convention FDFP (prise en charge)",
                    ref: "FDFP-CI-ANADER-2025-0047",
                    date: "15/12/2024",
                    action: "Voir",
                  },
                  {
                    doc: "Facture ANADER",
                    ref: "ANADER-FAC-2025-0089",
                    date: "10/01/2025",
                    action: "Voir (120 000 XOF)",
                  },
                  {
                    doc: "Attestation Ibrahim Sawadogo",
                    ref: "ANADER-2025-0142",
                    date: "10/01/2025",
                    action: "Télécharger",
                  },
                  {
                    doc: "Attestation Akissi Kouamé",
                    ref: "ANADER-2025-0143",
                    date: "10/01/2025",
                    action: "Télécharger",
                  },
                  {
                    doc: "Rapport évaluation formateur",
                    ref: "FORM-EVAL-2025-003",
                    date: "12/01/2025",
                    action: "Voir",
                  },
                ].map((row) => (
                  <tr key={row.ref} className="hover:bg-gray-50/50">
                    <td className="px-3 py-3 text-gray-800">{row.doc}</td>
                    <td className="px-3 py-3 font-mono text-xs text-gray-500">{row.ref}</td>
                    <td className="px-3 py-3 text-gray-600 whitespace-nowrap">{row.date}</td>
                    <td className="px-3 py-3">
                      <button className="text-xs text-[#2E7D32] hover:underline font-medium">
                        📄 {row.action}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3 pb-2">
          <a
            href="/formations"
            className="bg-white border border-gray-200 text-gray-700 rounded-xl text-xs font-medium px-4 py-2 hover:bg-gray-50 transition-colors"
          >
            ← Retour aux formations
          </a>
          <button className="bg-[#2E7D32] text-white rounded-xl text-xs font-medium px-4 py-2 hover:bg-[#1B5E20] transition-colors">
            Télécharger les attestations
          </button>
          <button className="bg-[#E65100] text-white rounded-xl text-xs font-medium px-4 py-2 hover:bg-orange-800 transition-colors">
            Planifier prochaine formation
          </button>
        </div>

      </div>
    </div>
  );
}
