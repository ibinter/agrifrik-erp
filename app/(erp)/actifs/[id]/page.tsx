import Topbar from "../../../components/Topbar";

export default async function ActifDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const amortissementData = [
    { exercice: "2021 (9 mois)", vncDebut: 14800000, dotation: 1110000, vncFin: 13690000, amortCumul: 1110000, current: false },
    { exercice: "2022", vncDebut: 13690000, dotation: 1480000, vncFin: 12210000, amortCumul: 2590000, current: false },
    { exercice: "2023", vncDebut: 12210000, dotation: 1480000, vncFin: 10730000, amortCumul: 4070000, current: false },
    { exercice: "2024", vncDebut: 10730000, dotation: 1480000, vncFin: 9250000, amortCumul: 5550000, current: false },
    { exercice: "2025", vncDebut: 9250000, dotation: 1480000, vncFin: 7770000, amortCumul: 7030000, current: true },
    { exercice: "2026", vncDebut: 7770000, dotation: 1480000, vncFin: 6290000, amortCumul: 8510000, current: false },
    { exercice: "2027", vncDebut: 6290000, dotation: 1480000, vncFin: 4810000, amortCumul: 9990000, current: false },
    { exercice: "2028", vncDebut: 4810000, dotation: 1480000, vncFin: 3330000, amortCumul: 11470000, current: false },
    { exercice: "2029", vncDebut: 3330000, dotation: 1480000, vncFin: 1850000, amortCumul: 12950000, current: false },
    { exercice: "2030", vncDebut: 1850000, dotation: 1480000, vncFin: 370000, amortCumul: 14430000, current: false },
    { exercice: "2031 (3 mois)", vncDebut: 370000, dotation: 370000, vncFin: 0, amortCumul: 14800000, current: false },
  ];

  const maintenanceData = [
    { date: "01/2025", type: "Entretien 400h", nature: "Vidange 10L + filtre air + filtre gasoil + courroie", prestataire: "John Deere CI", cout: 68000, heures: "400h", statut: "ok" },
    { date: "07/2024", type: "Révision majeure 300h", nature: "Réglage soupapes + filtre à huile + durites", prestataire: "Tractafric", cout: 124000, heures: "300h", statut: "ok" },
    { date: "03/2024", type: "Panne", nature: "Remplacement alternateur défaillant", prestataire: "Tractafric", cout: 89000, heures: "272h", statut: "warn" },
    { date: "01/2024", type: "Entretien 200h", nature: "Vidange + filtres + graissage", prestataire: "John Deere CI", cout: 52000, heures: "200h", statut: "ok" },
    { date: "09/2023", type: "Entretien 100h", nature: "Vidange + filtre gasoil", prestataire: "John Deere CI", cout: 34000, heures: "100h", statut: "ok" },
    { date: "07/2022", type: "Panne", nature: "Pneu avant gauche éclaté (terrain pierreux)", prestataire: "Pneu Service Soubré", cout: 48000, heures: "62h", statut: "warn" },
  ];

  const documents = [
    { nom: "Facture John Deere CI", date: "15/03/2021", statut: "Archivée", ok: true },
    { nom: "Carte grise CI-1247-BW", date: "10/04/2021", statut: "Valide", ok: true },
    { nom: "Assurance responsabilité (police Axa CI)", date: "01/01/2025", statut: "Valide jusqu'au 31/12/2025", ok: true },
    { nom: "Visite technique", date: "28/02/2025", statut: "Valide jusqu'au 28/02/2026", ok: true },
    { nom: "Manuel d'entretien John Deere 5055E", date: "—", statut: "Disponible en salle archives", ok: null },
  ];

  const fmt = (n: number) => n.toLocaleString("fr-FR") + " XOF";

  // SVG area chart data
  const years = [2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031];
  const vncs = [14800000, 13690000, 12210000, 10730000, 9250000, 7770000, 6290000, 4810000, 3330000, 1850000, 0];
  const svgW = 640;
  const svgH = 220;
  const padL = 80;
  const padR = 20;
  const padT = 20;
  const padB = 40;
  const chartW = svgW - padL - padR;
  const chartH = svgH - padT - padB;
  const maxVal = 14800000;
  const xStep = chartW / (years.length - 1);
  const points = vncs.map((v, i) => ({
    x: padL + i * xStep,
    y: padT + chartH - (v / maxVal) * chartH,
  }));
  const polyline = points.map((p) => `${p.x},${p.y}`).join(" ");
  const areaPath = `M${points[0].x},${points[0].y} ` +
    points.slice(1).map((p) => `L${p.x},${p.y}`).join(" ") +
    ` L${points[points.length - 1].x},${padT + chartH} L${points[0].x},${padT + chartH} Z`;

  // current point (2025 = index 4)
  const currentPt = points[4];

  return (
    <div className="min-h-screen bg-gray-50">
      <Topbar />

      {/* Breadcrumb */}
      <div className="px-6 pt-4 pb-2">
        <nav className="text-xs text-gray-500 flex items-center gap-1">
          <span>Finance</span>
          <span>/</span>
          <span>Actifs immobilisés</span>
          <span>/</span>
          <span className="text-[#2E7D32] font-medium">Actif {id}</span>
        </nav>
      </div>

      {/* Header */}
      <div className="mx-6 mt-2 rounded-2xl overflow-hidden">
        <div className="bg-[#1B5E20] text-white px-6 py-5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-xl font-bold">Tracteur agricole John Deere DT55 (55 CV)</h1>
              <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-green-200">
                <span>Code actif : <strong className="text-white">ACT-2021-004</strong></span>
                <span>|</span>
                <span>N° série : <strong className="text-white">JD55-CI-2021-08847</strong></span>
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-green-200">
                <span>Catégorie SYSCOHADA : <strong className="text-white">Matériels et outillages (Compte 245)</strong></span>
              </div>
              <div className="mt-1 text-sm text-green-200">
                Service utilisateur : <strong className="text-white">Production & Terrain</strong>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <span className="inline-flex items-center gap-1 bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                ✅ En service
              </span>
              <span className="text-sm text-green-200">
                📍 Soubré Nord — Zone stockage
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* KPIs */}
      <div className="mx-6 mt-4 grid grid-cols-2 md:grid-cols-5 gap-3">
        {[
          { label: "Valeur brute", value: "14 800 000 XOF", sub: "Coût d'entrée SYSCOHADA" },
          { label: "Valeur nette comptable", value: "9 104 000 XOF", sub: "Janvier 2025" },
          { label: "Dotation annuelle", value: "1 480 000 XOF", sub: "10% linéaire" },
          { label: "Heures machines 2025", value: "487h", sub: "Objectif annuel : 900h" },
          { label: "Prochain entretien", value: "15/08/2025", sub: "À 500h" },
        ].map((kpi) => (
          <div key={kpi.label} className="rounded-2xl border border-gray-100 bg-white p-5">
            <p className="text-xs text-gray-500">{kpi.label}</p>
            <p className="mt-1 text-base font-bold text-[#1B5E20]">{kpi.value}</p>
            <p className="text-xs text-gray-400 mt-0.5">{kpi.sub}</p>
          </div>
        ))}
      </div>

      {/* Informations générales */}
      <div className="mx-6 mt-6 rounded-2xl border border-gray-100 bg-white p-5">
        <h2 className="text-sm font-semibold text-gray-800 mb-4">Informations générales</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Col 1 */}
          <div>
            <h3 className="text-xs font-semibold text-[#2E7D32] uppercase tracking-wide mb-3">Identification</h3>
            <table className="w-full text-xs">
              <tbody className="divide-y divide-gray-50">
                {[
                  ["Fournisseur", "John Deere Côte d'Ivoire (Tractafric)"],
                  ["Date d'acquisition", "15/03/2021"],
                  ["Bon de commande", "ACH-2021-012"],
                  ["Facture", "JD-CI-2021-03-448 (15/03/2021)"],
                  ["Montage/installation", "0 XOF (livré prêt à l'emploi)"],
                  ["Mise en service", "22/03/2021"],
                  ["Puissance", "55 CV / 40,4 kW"],
                  ["Carburant", "Diesel (consommation moy. 5,2 L/h)"],
                  ["Transmission", "Synchro 12 avant / 4 arrière"],
                  ["Immatriculation", "CI-1247-BW (carte grise au nom AGRIFRIK SAS)"],
                ].map(([k, v]) => (
                  <tr key={k}>
                    <td className="py-1.5 text-gray-500 pr-3 whitespace-nowrap">{k}</td>
                    <td className="py-1.5 text-gray-800 font-medium">{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Col 2 */}
          <div>
            <h3 className="text-xs font-semibold text-[#2E7D32] uppercase tracking-wide mb-3">Valeurs comptables</h3>
            <table className="w-full text-xs">
              <tbody className="divide-y divide-gray-50">
                {[
                  ["Valeur d'achat HT", "12 500 000 XOF"],
                  ["Frais accessoires", "2 300 000 XOF (transport + assurance CI)"],
                  ["Coût d'entrée SYSCOHADA", "14 800 000 XOF (C/245)"],
                  ["Mode d'amortissement", "Linéaire (constant)"],
                  ["Taux", "10%/an (durée d'utilité 10 ans)"],
                  ["Début amortissement", "01/04/2021 (1er mois complet après mise en service)"],
                ].map(([k, v]) => (
                  <tr key={k}>
                    <td className="py-1.5 text-gray-500 pr-3 whitespace-nowrap">{k}</td>
                    <td className={`py-1.5 font-medium ${k === "Coût d'entrée SYSCOHADA" ? "text-[#1B5E20] font-bold" : "text-gray-800"}`}>{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Plan d'amortissement */}
      <div className="mx-6 mt-6 rounded-2xl border border-gray-100 bg-white p-5">
        <h2 className="text-sm font-semibold text-gray-800 mb-4">Plan d'amortissement</h2>

        {/* SVG Chart */}
        <div className="overflow-x-auto mb-6">
          <svg width={svgW} height={svgH} viewBox={`0 0 ${svgW} ${svgH}`} className="max-w-full">
            {/* Area */}
            <path d={areaPath} fill="#E8F5E9" />
            {/* Grid lines */}
            {[0, 0.25, 0.5, 0.75, 1].map((t) => {
              const y = padT + chartH * t;
              const val = Math.round(maxVal * (1 - t));
              return (
                <g key={t}>
                  <line x1={padL} y1={y} x2={svgW - padR} y2={y} stroke="#e5e7eb" strokeWidth={1} strokeDasharray="4 2" />
                  <text x={padL - 6} y={y + 4} textAnchor="end" fontSize={9} fill="#9ca3af">
                    {(val / 1000000).toFixed(1)}M
                  </text>
                </g>
              );
            })}
            {/* Axes */}
            <line x1={padL} y1={padT} x2={padL} y2={padT + chartH} stroke="#d1d5db" strokeWidth={1} />
            <line x1={padL} y1={padT + chartH} x2={svgW - padR} y2={padT + chartH} stroke="#d1d5db" strokeWidth={1} />
            {/* X labels */}
            {years.map((yr, i) => (
              <text key={yr} x={padL + i * xStep} y={svgH - 4} textAnchor="middle" fontSize={9} fill="#9ca3af">
                {yr}
              </text>
            ))}
            {/* Polyline */}
            <polyline points={polyline} fill="none" stroke="#2E7D32" strokeWidth={2.5} strokeLinejoin="round" />
            {/* Current point annotation */}
            <circle cx={currentPt.x} cy={currentPt.y} r={5} fill="#2E7D32" />
            <rect x={currentPt.x - 80} y={currentPt.y - 32} width={160} height={24} rx={4} fill="#1B5E20" />
            <text x={currentPt.x} y={currentPt.y - 16} textAnchor="middle" fontSize={9} fill="white" fontWeight="bold">
              Valeur actuelle 9 104 000 XOF (Jan 2025)
            </text>
            {/* Y axis label */}
            <text x={12} y={padT + chartH / 2} transform={`rotate(-90, 12, ${padT + chartH / 2})`} textAnchor="middle" fontSize={9} fill="#6b7280">
              Valeur nette comptable (XOF)
            </text>
          </svg>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-[#F8FBF8]">
                <th className="text-left px-3 py-2 text-gray-600 font-semibold">Exercice</th>
                <th className="text-right px-3 py-2 text-gray-600 font-semibold">VNC début</th>
                <th className="text-right px-3 py-2 text-gray-600 font-semibold">Dotation</th>
                <th className="text-right px-3 py-2 text-gray-600 font-semibold">VNC fin</th>
                <th className="text-right px-3 py-2 text-gray-600 font-semibold">Amort. cumulé</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {amortissementData.map((row) => (
                <tr key={row.exercice} className={row.current ? "bg-green-50 font-bold" : "hover:bg-gray-50"}>
                  <td className="px-3 py-2 text-gray-800">
                    {row.exercice}
                    {row.current && <span className="ml-2 text-[#2E7D32] text-xs">← exercice en cours</span>}
                    {row.vncFin === 0 && <span className="ml-2">✅</span>}
                  </td>
                  <td className="px-3 py-2 text-right text-gray-700">{fmt(row.vncDebut)}</td>
                  <td className="px-3 py-2 text-right text-gray-700">{fmt(row.dotation)}</td>
                  <td className="px-3 py-2 text-right text-gray-700">{fmt(row.vncFin)}</td>
                  <td className="px-3 py-2 text-right text-gray-700">{fmt(row.amortCumul)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Maintenance */}
      <div className="mx-6 mt-6 rounded-2xl border border-gray-100 bg-white p-5">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <h2 className="text-sm font-semibold text-gray-800">Maintenance et pannes</h2>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span>Coût total 2021-2025 : <strong className="text-[#1B5E20]">415 000 XOF</strong> (2,8% val. achat — excellent ✅)</span>
            <span>Budget 2025 : <strong className="text-[#2E7D32]">150 000 XOF</strong></span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-[#F8FBF8]">
                <th className="text-left px-3 py-2 text-gray-600 font-semibold">Date</th>
                <th className="text-left px-3 py-2 text-gray-600 font-semibold">Type</th>
                <th className="text-left px-3 py-2 text-gray-600 font-semibold">Nature</th>
                <th className="text-left px-3 py-2 text-gray-600 font-semibold">Prestataire</th>
                <th className="text-right px-3 py-2 text-gray-600 font-semibold">Coût (XOF)</th>
                <th className="text-center px-3 py-2 text-gray-600 font-semibold">Heures</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {maintenanceData.map((row, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-3 py-2 text-gray-700 whitespace-nowrap">{row.date}</td>
                  <td className="px-3 py-2 text-gray-800 font-medium whitespace-nowrap">{row.type}</td>
                  <td className="px-3 py-2 text-gray-600">{row.nature}</td>
                  <td className="px-3 py-2 text-gray-700 whitespace-nowrap">{row.prestataire}</td>
                  <td className="px-3 py-2 text-right text-gray-800 font-medium">{row.cout.toLocaleString("fr-FR")}</td>
                  <td className="px-3 py-2 text-center">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                      row.statut === "ok" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
                    }`}>
                      {row.statut === "ok" ? "✅" : "⚠️"} {row.heures}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Documents */}
      <div className="mx-6 mt-6 rounded-2xl border border-gray-100 bg-white p-5">
        <h2 className="text-sm font-semibold text-gray-800 mb-4">Documents</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-[#F8FBF8]">
                <th className="text-left px-3 py-2 text-gray-600 font-semibold">Document</th>
                <th className="text-left px-3 py-2 text-gray-600 font-semibold">Date</th>
                <th className="text-left px-3 py-2 text-gray-600 font-semibold">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {documents.map((doc, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-3 py-2 text-gray-800 font-medium">{doc.nom}</td>
                  <td className="px-3 py-2 text-gray-600">{doc.date}</td>
                  <td className="px-3 py-2">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                      doc.ok === true ? "bg-green-100 text-green-700" :
                      doc.ok === null ? "bg-blue-50 text-blue-700" : "bg-red-100 text-red-700"
                    }`}>
                      {doc.ok === true ? "✅" : "📋"} {doc.statut}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Actions */}
      <div className="mx-6 mt-6 mb-8 flex flex-wrap gap-3">
        <a
          href="/actifs"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 bg-white text-xs font-medium text-gray-700 hover:bg-gray-50"
        >
          ← Retour aux actifs
        </a>
        <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#2E7D32] text-white text-xs font-medium hover:bg-[#1B5E20]">
          Créer un ordre de maintenance
        </button>
        <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 bg-white text-xs font-medium text-gray-700 hover:bg-gray-50">
          Imprimer fiche actif
        </button>
      </div>
    </div>
  );
}
