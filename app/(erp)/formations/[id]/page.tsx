import Topbar from "../../../components/Topbar";

export default async function FormationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const breadcrumb = ["RH", "Formations", `Formation ${id}`];

  const participants = [
    { nom: "Ibrahim Sawadogo", fonction: "Resp. Terrain", presenceJ1: true, score: 38, total: 40, certif: true },
    { nom: "Konan Yao", fonction: "Technicien", presenceJ1: true, score: 37, total: 40, certif: true },
    { nom: "Yao Gnalé", fonction: "Technicien élevage", presenceJ1: true, score: 34, total: 40, certif: true },
    { nom: "Adjoua Messou", fonction: "Chef projet", presenceJ1: true, score: 40, total: 40, certif: true },
    { nom: "Fatou Diallo", fonction: "Saisonnière", presenceJ1: true, score: 29, total: 40, certif: true },
    { nom: "Moussa Coulibaly", fonction: "Saisonnier", presenceJ1: false, score: null, total: 40, certif: false },
    { nom: "Bamba Koné", fonction: "Producteur COOP", presenceJ1: true, score: 31, total: 40, certif: true },
    { nom: "Youssouf Bamba", fonction: "Producteur COOP", presenceJ1: true, score: 28, total: 40, certif: true },
    { nom: "Adama Traoré", fonction: "Producteur COOP", presenceJ1: true, score: 26, total: 40, certif: false },
    { nom: "Brahima Ouattara", fonction: "Permanent", presenceJ1: true, score: 33, total: 40, certif: true },
    { nom: "Koffi Amoussou", fonction: "Permanent", presenceJ1: true, score: 34, total: 40, certif: true },
    { nom: "Sékou Diomandé", fonction: "Permanent", presenceJ1: true, score: 32, total: 40, certif: true },
  ];

  // Pour le bar chart — uniquement les présents avec score
  const scoredParticipants = participants.filter((p) => p.score !== null) as typeof participants & { score: number }[];
  const maxBarWidth = 240;

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-[#F8FBF8]">
      <Topbar breadcrumb={breadcrumb} />

      <div className="flex-1 overflow-y-auto p-6 space-y-6">

        {/* En-tête bandeau vert */}
        <div className="rounded-2xl p-6" style={{ backgroundColor: "#1B5E20" }}>
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-xs font-semibold uppercase tracking-widest text-green-300">
                  RH — Formations
                </span>
                <span className="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  🔵 En cours
                </span>
                <span className="bg-green-800 text-green-200 text-xs px-2 py-1 rounded-full">
                  Formation obligatoire RA
                </span>
              </div>
              <h1 className="text-xl font-bold text-white leading-snug">
                Bonnes Pratiques Agricoles — Référentiel Rainforest Alliance 2020
              </h1>
              <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-green-200">
                <span>Code : <span className="text-white font-medium">FOR-2025-007</span></span>
                <span>Organisme : <span className="text-white font-medium">ANADER (Agence Nationale d'Appui au Développement Rural)</span></span>
              </div>
              <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-green-200">
                <span>Formateur : <span className="text-white font-medium">Konan Brice (Technicien ANADER, certifié RA)</span></span>
              </div>
            </div>
            <div className="bg-green-900/50 rounded-xl px-5 py-4 text-center min-w-[200px]">
              <div className="text-green-300 text-xs font-medium mb-1">Dates de formation</div>
              <div className="text-white font-bold text-sm">J1 : 12/07/2025</div>
              <div className="text-white font-bold text-sm">J2 : 19/07/2025</div>
              <div className="text-green-200 text-xs mt-1">16h totales</div>
            </div>
          </div>
        </div>

        {/* 4 KPI */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Participants inscrits", value: "12", sub: "8 permanents + 4 coopérative", color: "text-blue-700" },
            { label: "Présence J1", value: "11/12", sub: "91,7% de taux de présence", color: "text-green-700" },
            { label: "Coût total", value: "384 000 XOF", sub: "32 000 XOF/personne", color: "text-orange-600" },
            { label: "Certifications visées", value: "RA BPA 2025", sub: "Délivrée par ANADER/RA", color: "text-green-700" },
          ].map((kpi) => (
            <div key={kpi.label} className="rounded-2xl border border-gray-100 bg-white p-5">
              <div className="text-xs text-gray-500 mb-1">{kpi.label}</div>
              <div className={`text-xl font-bold ${kpi.color}`}>{kpi.value}</div>
              <div className="text-xs text-gray-400 mt-1">{kpi.sub}</div>
            </div>
          ))}
        </div>

        {/* Programme J1 */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-semibold text-gray-800 mb-1">Programme de la formation</h2>
          <p className="text-xs text-gray-500 mb-4">Deux journées de 8h chacune — théorie + pratique terrain</p>

          <div className="mb-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              <span className="text-xs font-semibold text-gray-700">Jour 1 — 12/07/2025 (08h00-17h00) — Partie théorique</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-[#F8FBF8]">
                    {["Horaire", "Module", "Contenu", "Durée"].map((h) => (
                      <th key={h} className="text-left px-4 py-2 text-gray-500 font-medium">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {[
                    { horaire: "08h00-09h00", module: "Accueil et introduction", contenu: "Enjeux RA 2020, certifications CI", duree: "1h", pause: false },
                    { horaire: "09h00-11h00", module: "S1 — Gestion exploitation", contenu: "SGA, registres, traçabilité", duree: "2h", pause: false },
                    { horaire: "11h00-11h15", module: "Pause", contenu: "—", duree: "15 min", pause: true },
                    { horaire: "11h15-13h00", module: "S2 — Pratiques culturales", contenu: "Taille, fertilisation, phénologie cacao", duree: "1h45", pause: false },
                    { horaire: "13h00-14h00", module: "Déjeuner", contenu: "—", duree: "1h", pause: true },
                    { horaire: "14h00-16h00", module: "S5 — Produits chimiques", contenu: "EPI, stockage, DRE/DAR, FDS", duree: "2h", pause: false },
                    { horaire: "16h00-17h00", module: "S3 — Conditions travail", contenu: "Droits, registres, salaires", duree: "1h", pause: false },
                  ].map((row) => (
                    <tr key={row.horaire} className={row.pause ? "bg-gray-50/40" : "hover:bg-gray-50/50"}>
                      <td className="px-4 py-2 font-mono text-gray-600">{row.horaire}</td>
                      <td className={`px-4 py-2 font-medium ${row.pause ? "text-gray-400 italic" : "text-gray-700"}`}>{row.module}</td>
                      <td className={`px-4 py-2 ${row.pause ? "text-gray-400" : "text-gray-600"}`}>{row.contenu}</td>
                      <td className="px-4 py-2 text-gray-500">{row.duree}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Programme J2 */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-xs font-semibold text-gray-700">Jour 2 — 19/07/2025 (08h00-17h00) — Pratique terrain</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-[#F8FBF8]">
                    {["Horaire", "Module", "Lieu / Contenu", "Durée"].map((h) => (
                      <th key={h} className="text-left px-4 py-2 text-gray-500 font-medium">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {[
                    { horaire: "08h00-10h00", module: "Visite PAR-A1", lieu: "Observation pratiques BPA terrain", duree: "2h", pause: false },
                    { horaire: "10h00-12h00", module: "Exercice traçabilité", lieu: "Remplissage registres in-situ", duree: "2h", pause: false },
                    { horaire: "12h00-13h00", module: "Déjeuner sur site", lieu: "—", duree: "1h", pause: true },
                    { horaire: "13h00-15h00", module: "Atelier cut test", lieu: "Test coupe fèves + classement qualité", duree: "2h", pause: false },
                    { horaire: "15h00-16h30", module: "QCM d'évaluation", lieu: "40 questions RA (seuil 70% = certifié)", duree: "1h30", pause: false },
                    { horaire: "16h30-17h00", module: "Remise attestations", lieu: "Cérémonie + photo de groupe", duree: "30min", pause: false },
                  ].map((row) => (
                    <tr key={row.horaire} className={row.pause ? "bg-gray-50/40" : "hover:bg-gray-50/50"}>
                      <td className="px-4 py-2 font-mono text-gray-600">{row.horaire}</td>
                      <td className={`px-4 py-2 font-medium ${row.pause ? "text-gray-400 italic" : "text-gray-700"}`}>{row.module}</td>
                      <td className={`px-4 py-2 ${row.pause ? "text-gray-400" : "text-gray-600"}`}>{row.lieu}</td>
                      <td className="px-4 py-2 text-gray-500">{row.duree}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Participants + Bar chart */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-semibold text-gray-800 mb-4">Liste des participants</h2>
          <div className="flex flex-col xl:flex-row gap-6">

            {/* Tableau participants */}
            <div className="flex-1 min-w-0 overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-[#F8FBF8]">
                    {["Nom", "Fonction", "Présence J1", "Score QCM", "Certif. RA"].map((h) => (
                      <th key={h} className="text-left px-3 py-2 text-gray-500 font-medium">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {participants.map((p) => {
                    const pct = p.score !== null ? Math.round((p.score / p.total) * 1000) / 10 : null;
                    const isAbsent = !p.presenceJ1;
                    const isEchec = p.presenceJ1 && p.score !== null && pct! < 70;
                    const isJuste = pct !== null && pct >= 70 && pct < 75;
                    return (
                      <tr key={p.nom} className={isAbsent ? "bg-red-50/40" : isEchec ? "bg-red-50/40" : "hover:bg-gray-50/50"}>
                        <td className="px-3 py-2 font-medium text-gray-700">{p.nom}</td>
                        <td className="px-3 py-2 text-gray-500">{p.fonction}</td>
                        <td className="px-3 py-2">
                          {p.presenceJ1
                            ? <span className="text-green-600">✅</span>
                            : <span className="text-red-500">❌ Absent</span>}
                        </td>
                        <td className="px-3 py-2">
                          {p.score !== null
                            ? <span className={pct! < 70 ? "text-red-600 font-medium" : "text-gray-700"}>
                                {p.score}/40 ({pct}%)
                              </span>
                            : <span className="text-gray-400">—</span>}
                        </td>
                        <td className="px-3 py-2">
                          {isAbsent
                            ? <span className="text-gray-400">❌ À reprogrammer</span>
                            : isEchec
                            ? <span className="text-red-600">❌ Échec — Rattrapage 09/08</span>
                            : <span className="text-green-700">✅ Obtenu{isJuste ? " (juste)" : ""}</span>}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* SVG Bar chart horizontal scores QCM */}
            <div className="flex-shrink-0">
              <div className="text-xs font-semibold text-gray-700 mb-3">Scores QCM participants</div>
              <svg
                viewBox={`0 0 320 ${scoredParticipants.length * 28 + 30}`}
                width="320"
                height={scoredParticipants.length * 28 + 30}
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Ligne seuil 70% */}
                {(() => {
                  const seuilX = 60 + (70 / 100) * maxBarWidth;
                  const chartH = scoredParticipants.length * 28 + 20;
                  return (
                    <>
                      <line
                        x1={seuilX} y1={0}
                        x2={seuilX} y2={chartH}
                        stroke="#EF4444"
                        strokeWidth="1.5"
                        strokeDasharray="4 3"
                      />
                      <text x={seuilX + 2} y={10} fontSize="8" fill="#EF4444">70%</text>
                    </>
                  );
                })()}

                {scoredParticipants.map((p, i) => {
                  const pct = p.score / p.total;
                  const barW = pct * maxBarWidth;
                  const y = i * 28 + 18;
                  const isOk = pct >= 0.7;
                  const firstName = p.nom.split(" ")[0];
                  return (
                    <g key={p.nom}>
                      <text x={0} y={y + 9} fontSize="9" fill="#6B7280" textAnchor="start">
                        {firstName}
                      </text>
                      <rect
                        x={60}
                        y={y}
                        width={barW}
                        height={16}
                        rx={4}
                        fill={isOk ? "#4CAF50" : "#EF4444"}
                        fillOpacity="0.85"
                      />
                      <text
                        x={60 + barW + 4}
                        y={y + 11}
                        fontSize="9"
                        fill={isOk ? "#2E7D32" : "#DC2626"}
                        fontWeight="bold"
                      >
                        {Math.round(pct * 1000) / 10}%
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

          </div>
        </div>

        {/* Budget */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-semibold text-gray-800 mb-4">Budget</h2>
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1 overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-[#F8FBF8]">
                    <th className="text-left px-4 py-2 text-gray-500 font-medium">Poste</th>
                    <th className="text-right px-4 py-2 text-gray-500 font-medium">Montant (XOF)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {[
                    { poste: "Honoraires formateur ANADER", montant: "240 000" },
                    { poste: "Supports pédagogiques (12 classeurs)", montant: "48 000" },
                    { poste: "Pauses-café + déjeuner J2", montant: "96 000" },
                  ].map((row) => (
                    <tr key={row.poste} className="hover:bg-gray-50/50">
                      <td className="px-4 py-3 text-gray-600">{row.poste}</td>
                      <td className="px-4 py-3 text-right text-gray-700">{row.montant}</td>
                    </tr>
                  ))}
                  <tr className="bg-green-50 font-bold">
                    <td className="px-4 py-3 text-gray-800">Total</td>
                    <td className="px-4 py-3 text-right text-green-700">384 000</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="flex-1 space-y-3">
              <div className="p-4 bg-green-50 border border-green-100 rounded-xl text-xs text-green-800">
                <div className="font-semibold mb-1">✅ Prise en charge</div>
                <div>Budget formations RH 2025 — Poste 641-FOR</div>
              </div>
              <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl text-xs text-blue-800">
                <div className="font-semibold mb-1">Imputable projet</div>
                <div>PRJ-2025-001 (RA anacarde) : 50% soit <span className="font-bold">192 000 XOF</span></div>
              </div>
            </div>
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
            Imprimer la liste d'émargement
          </button>
          <button className="bg-[#E65100] text-white rounded-xl text-xs font-medium px-4 py-2 hover:bg-orange-800 transition-colors">
            Générer les attestations
          </button>
        </div>

      </div>
    </div>
  );
}
