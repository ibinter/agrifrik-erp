import Topbar from "../../../components/Topbar";

export default async function CertificationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const breadcrumb = ["Production", "Certifications", `Certificat ${id}`];

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
                  Certification
                </span>
                <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  ✅ VALIDE
                </span>
              </div>
              <h1 className="text-xl font-bold text-white leading-snug">
                Rainforest Alliance Sustainable Agriculture Standard 2020
              </h1>
              <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-green-200">
                <span>N° certificat : <span className="text-white font-medium">RA-CI-2025-00847</span></span>
                <span>Organisme : <span className="text-white font-medium">Bureau Veritas Certification (accrédité ISEAL)</span></span>
              </div>
              <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-green-200">
                <span>Auditeur : <span className="text-white font-medium">Jean-Pierre Assoumou (Bureau Veritas CI)</span></span>
              </div>
            </div>
            <div className="bg-green-900/50 rounded-xl px-5 py-4 text-center min-w-[200px]">
              <div className="text-green-300 text-xs font-medium mb-1">Période de validité</div>
              <div className="text-white font-bold text-sm">01/03/2025 → 28/02/2026</div>
              <div className="text-green-200 text-xs mt-1">232 jours restants</div>
            </div>
          </div>
        </div>

        {/* 5 KPI */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            { label: "Surface certifiée", value: "24,8 ha", sub: "3 parcelles : PAR-A1, A2, A3", color: "text-green-700" },
            { label: "Prochaine surveillance", value: "15/09/2025", sub: "Audit annuel", color: "text-blue-700" },
            { label: "Jours avant expiration", value: "232 jours", sub: "28/02/2026", color: "text-orange-600" },
            { label: "Non-conformités ouvertes", value: "0 ✅", sub: "Toutes clôturées", color: "text-green-700" },
            { label: "Score global audit", value: "94,2/100", sub: "✅ Excellent", color: "text-green-700" },
          ].map((kpi) => (
            <div key={kpi.label} className="rounded-2xl border border-gray-100 bg-white p-5">
              <div className="text-xs text-gray-500 mb-1">{kpi.label}</div>
              <div className={`text-xl font-bold ${kpi.color}`}>{kpi.value}</div>
              <div className="text-xs text-gray-400 mt-1">{kpi.sub}</div>
            </div>
          ))}
        </div>

        {/* Scope de certification */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-semibold text-gray-800 mb-4">Scope de certification</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#F8FBF8]">
                  <th className="text-left px-4 py-2 text-xs text-gray-500 font-medium rounded-l-lg w-48">Élément</th>
                  <th className="text-left px-4 py-2 text-xs text-gray-500 font-medium rounded-r-lg">Détail</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  ["Entité certifiée", "AGRIFRIK SAS — Exploitation Soubré Nord"],
                  ["Activité certifiée", "Production cacao (Theobroma cacao L.) — Forastero T-60/887"],
                  ["Parcelles couvertes", "PAR-A1 (6,2 ha), PAR-A2 (4,8 ha), PAR-A3 (4,8 ha) — Total : 15,8 ha"],
                  ["Volume certifié 2024-2025", "21,4 t cacao sec Grade AA"],
                  ["Marchés autorisés", "Barry Callebaut CI, Cargill Côte d'Ivoire, SIFCA Export"],
                  ["Référentiel", "RA Sustainable Agriculture Standard 2020 (v2.0) + Chain of Custody"],
                ].map(([el, det]) => (
                  <tr key={el} className="hover:bg-gray-50/50">
                    <td className="px-4 py-3 text-gray-500 font-medium text-xs">{el}</td>
                    <td className="px-4 py-3 text-gray-800 text-xs">{det}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 p-3 bg-amber-50 border border-amber-100 rounded-xl text-xs text-amber-700">
            <span className="font-semibold">Exclusions :</span> PAR-B1, PAR-B2 (jeunes plantations), PAR-C1, PAR-C2 (anacarde — certification en cours via PRJ-2025-001)
          </div>
        </div>

        {/* Résultats audit */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-semibold text-gray-800 mb-4">Résultats audit de certification (Mars 2025)</h2>
          <div className="flex flex-col lg:flex-row gap-6 items-start">

            {/* SVG Radar Chart */}
            <div className="flex-shrink-0">
              <svg viewBox="0 0 300 300" width="300" height="300" xmlns="http://www.w3.org/2000/svg">
                {/* Grilles concentriques */}
                {[20, 40, 60, 80, 100].map((pct) => {
                  const r = (pct / 100) * 110;
                  const cx = 150, cy = 150;
                  const angles = [270, 342, 54, 126, 198];
                  const pts = angles
                    .map((a) => {
                      const rad = (a * Math.PI) / 180;
                      return `${cx + r * Math.cos(rad)},${cy + r * Math.sin(rad)}`;
                    })
                    .join(" ");
                  return (
                    <polygon
                      key={pct}
                      points={pts}
                      fill="none"
                      stroke="#E5E7EB"
                      strokeWidth="1"
                    />
                  );
                })}

                {/* Axes */}
                {[
                  { angle: 270, label: "S1 Gestion", score: 96 },
                  { angle: 342, label: "S2 Pratiques", score: 94 },
                  { angle: 54, label: "S3 Travail", score: 92 },
                  { angle: 126, label: "S4 Environ.", score: 97 },
                  { angle: 198, label: "S5 Chimiques", score: 91 },
                ].map(({ angle, label, score }) => {
                  const rad = (angle * Math.PI) / 180;
                  const cx = 150, cy = 150, maxR = 110;
                  const x2 = cx + maxR * Math.cos(rad);
                  const y2 = cy + maxR * Math.sin(rad);
                  const lx = cx + (maxR + 20) * Math.cos(rad);
                  const ly = cy + (maxR + 20) * Math.sin(rad);
                  const px = cx + (score / 100) * maxR * Math.cos(rad);
                  const py = cy + (score / 100) * maxR * Math.sin(rad);
                  return (
                    <g key={label}>
                      <line x1={cx} y1={cy} x2={x2} y2={y2} stroke="#D1D5DB" strokeWidth="1" />
                      <text
                        x={lx}
                        y={ly}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fontSize="9"
                        fill="#6B7280"
                      >
                        {label}
                      </text>
                      <text
                        x={lx}
                        y={ly + 11}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fontSize="9"
                        fontWeight="bold"
                        fill="#1B5E20"
                      >
                        {score}/100
                      </text>
                    </g>
                  );
                })}

                {/* Polygone données */}
                {(() => {
                  const data = [
                    { angle: 270, score: 96 },
                    { angle: 342, score: 94 },
                    { angle: 54, score: 92 },
                    { angle: 126, score: 97 },
                    { angle: 198, score: 91 },
                  ];
                  const cx = 150, cy = 150, maxR = 110;
                  const pts = data
                    .map(({ angle, score }) => {
                      const rad = (angle * Math.PI) / 180;
                      return `${cx + (score / 100) * maxR * Math.cos(rad)},${cy + (score / 100) * maxR * Math.sin(rad)}`;
                    })
                    .join(" ");
                  return (
                    <polygon
                      points={pts}
                      fill="#4CAF50"
                      fillOpacity="0.25"
                      stroke="#2E7D32"
                      strokeWidth="2"
                    />
                  );
                })()}

                {/* Points */}
                {[
                  { angle: 270, score: 96 },
                  { angle: 342, score: 94 },
                  { angle: 54, score: 92 },
                  { angle: 126, score: 97 },
                  { angle: 198, score: 91 },
                ].map(({ angle, score }) => {
                  const rad = (angle * Math.PI) / 180;
                  const cx = 150, cy = 150, maxR = 110;
                  return (
                    <circle
                      key={angle}
                      cx={cx + (score / 100) * maxR * Math.cos(rad)}
                      cy={cy + (score / 100) * maxR * Math.sin(rad)}
                      r="4"
                      fill="#2E7D32"
                    />
                  );
                })}

                {/* Score global centre */}
                <text x="150" y="147" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#1B5E20">94,2</text>
                <text x="150" y="160" textAnchor="middle" fontSize="9" fill="#6B7280">/100</text>
              </svg>
            </div>

            {/* Tableau NC */}
            <div className="flex-1 min-w-0">
              <div className="text-xs font-semibold text-gray-700 mb-2">Non-conformités détectées (toutes clôturées)</div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-[#F8FBF8]">
                      <th className="text-left px-2 py-2 text-gray-500 font-medium">N°</th>
                      <th className="text-left px-2 py-2 text-gray-500 font-medium">Section</th>
                      <th className="text-left px-2 py-2 text-gray-500 font-medium">Description</th>
                      <th className="text-left px-2 py-2 text-gray-500 font-medium">Niveau</th>
                      <th className="text-left px-2 py-2 text-gray-500 font-medium">Détection</th>
                      <th className="text-left px-2 py-2 text-gray-500 font-medium">Action corrective</th>
                      <th className="text-left px-2 py-2 text-gray-500 font-medium">Clôture</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {[
                      {
                        nc: "NC-01", section: "S5", desc: "Étiquetage incomplet sur 2 fûts Ridomil (lot périmé)",
                        niveau: "Mineur", detection: "10/02/2025", action: "Destruction lot + renouvellement stock", cloture: "15/02/2025",
                      },
                      {
                        nc: "NC-02", section: "S3", desc: "Registre heures supplémentaires non tenu pour 2 saisonniers (nov. 2024)",
                        niveau: "Mineur", detection: "10/02/2025", action: "Formation RH + nouveau registre", cloture: "01/03/2025",
                      },
                      {
                        nc: "NC-03", section: "S4", desc: "Zone tampon rivière Soubré non balisée (PAR-A2 côté est)",
                        niveau: "Mineur", detection: "11/02/2025", action: "Pose 12 piquets balisage + clôture légère", cloture: "20/02/2025",
                      },
                    ].map((row) => (
                      <tr key={row.nc} className="hover:bg-gray-50/50">
                        <td className="px-2 py-2 font-medium text-gray-700">{row.nc}</td>
                        <td className="px-2 py-2"><span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full text-xs">{row.section}</span></td>
                        <td className="px-2 py-2 text-gray-600 max-w-[160px]">{row.desc}</td>
                        <td className="px-2 py-2"><span className="bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full text-xs">{row.niveau}</span></td>
                        <td className="px-2 py-2 text-gray-500">{row.detection}</td>
                        <td className="px-2 py-2 text-gray-600 max-w-[140px]">{row.action}</td>
                        <td className="px-2 py-2 text-green-700 font-medium">{row.cloture} ✅</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Historique */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-semibold text-gray-800 mb-4">Historique des certifications RA</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-[#F8FBF8]">
                  {["Cycle", "N° certificat", "Période", "Score", "NC", "Auditeur", "Statut"].map((h) => (
                    <th key={h} className="text-left px-4 py-2 text-gray-500 font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  { cycle: "2022-2023", num: "RA-CI-2023-00612", periode: "01/03/2023 – 28/02/2024", score: "89,4/100", nc: "5 (toutes clôturées)", audit: "BV CI", statut: "✅ Expiré", current: false },
                  { cycle: "2023-2024", num: "RA-CI-2024-00718", periode: "01/03/2024 – 28/02/2025", score: "92,1/100", nc: "2 (toutes clôturées)", audit: "BV CI", statut: "✅ Expiré", current: false },
                  { cycle: "2024-2025", num: "RA-CI-2025-00847", periode: "01/03/2025 – 28/02/2026", score: "94,2/100", nc: "3 (toutes clôturées)", audit: "BV CI", statut: "✅ En cours", current: true },
                ].map((row) => (
                  <tr key={row.num} className={row.current ? "bg-green-50/50 hover:bg-green-50" : "hover:bg-gray-50/50"}>
                    <td className="px-4 py-3 font-medium text-gray-700">{row.cycle}</td>
                    <td className="px-4 py-3 text-blue-600 font-mono">{row.num}</td>
                    <td className="px-4 py-3 text-gray-600">{row.periode}</td>
                    <td className="px-4 py-3 font-bold text-green-700">{row.score}</td>
                    <td className="px-4 py-3 text-gray-600">{row.nc}</td>
                    <td className="px-4 py-3 text-gray-600">{row.audit}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${row.current ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                        {row.statut}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-3 p-3 bg-green-50 border border-green-100 rounded-xl text-xs text-green-700">
            <span className="font-semibold">Tendance score :</span> 89,4 → 92,1 → 94,2 <span className="font-bold">(+5,2 pts sur 3 ans)</span> ✅
          </div>
        </div>

        {/* Impact commercial */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-semibold text-gray-800 mb-4">Impact commercial</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-[#F8FBF8]">
                  <th className="text-left px-4 py-2 text-gray-500 font-medium">Indicateur</th>
                  <th className="text-left px-4 py-2 text-gray-500 font-medium">Sans certification</th>
                  <th className="text-left px-4 py-2 text-gray-500 font-medium">Avec certification RA</th>
                  <th className="text-left px-4 py-2 text-gray-500 font-medium">Delta</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  { ind: "Prix cacao Grade AA", sans: "1 059 XOF/kg (BCC)", avec: "1 087 XOF/kg (BCC + prime 28 XOF)", delta: "+2,6%", highlight: false },
                  { ind: "Accès marchés premium", sans: "Non", avec: "Oui (BC, Cargill, Ferrero)", delta: "—", highlight: false },
                  { ind: "Prime qualité reçue 2024-2025", sans: "0 XOF", avec: "284 000 XOF", delta: "+284 000 XOF", highlight: false },
                  { ind: "CA additionnel estimé", sans: "—", avec: "+598 400 XOF/an", delta: "—", highlight: false },
                  { ind: "Coût de la certification", sans: "—", avec: "480 000 XOF/an", delta: "—", highlight: false },
                  { ind: "ROI net certification", sans: "—", avec: "+118 400 XOF/an", delta: "✅ Rentable", highlight: true },
                ].map((row) => (
                  <tr key={row.ind} className={row.highlight ? "bg-green-50 font-semibold" : "hover:bg-gray-50/50"}>
                    <td className="px-4 py-3 text-gray-700">{row.ind}</td>
                    <td className="px-4 py-3 text-gray-500">{row.sans}</td>
                    <td className={`px-4 py-3 ${row.highlight ? "text-green-700" : "text-gray-700"}`}>{row.avec}</td>
                    <td className="px-4 py-3 text-green-700 font-medium">{row.delta}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Documents */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-semibold text-gray-800 mb-4">Documents</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-[#F8FBF8]">
                  <th className="text-left px-4 py-2 text-gray-500 font-medium">Document</th>
                  <th className="text-left px-4 py-2 text-gray-500 font-medium">Date</th>
                  <th className="text-left px-4 py-2 text-gray-500 font-medium">Statut</th>
                  <th className="text-left px-4 py-2 text-gray-500 font-medium">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  { doc: "Certificat RA-CI-2025-00847 (PDF officiel)", date: "01/03/2025", statut: "✅ Valide", statutClass: "bg-green-50 text-green-700" },
                  { doc: "Rapport d'audit Mars 2025", date: "15/03/2025", statut: "✅ Archivé", statutClass: "bg-green-50 text-green-700" },
                  { doc: "Plan d'action corrective PAC-2025", date: "01/03/2025", statut: "✅ Toutes NC clôturées", statutClass: "bg-green-50 text-green-700" },
                  { doc: "Référentiel RA 2020 v2.0 (FR)", date: "—", statut: "📋 Disponible", statutClass: "bg-blue-50 text-blue-700" },
                  { doc: "Attestation Chain of Custody", date: "01/03/2025", statut: "✅ Valide", statutClass: "bg-green-50 text-green-700" },
                ].map((row) => (
                  <tr key={row.doc} className="hover:bg-gray-50/50">
                    <td className="px-4 py-3 text-gray-700">{row.doc}</td>
                    <td className="px-4 py-3 text-gray-500">{row.date}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${row.statutClass}`}>{row.statut}</span>
                    </td>
                    <td className="px-4 py-3">
                      <button className="text-xs text-blue-600 hover:underline">Télécharger</button>
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
            href="/certifications"
            className="bg-white border border-gray-200 text-gray-700 rounded-xl text-xs font-medium px-4 py-2 hover:bg-gray-50 transition-colors"
          >
            ← Retour aux certifications
          </a>
          <button className="bg-[#2E7D32] text-white rounded-xl text-xs font-medium px-4 py-2 hover:bg-[#1B5E20] transition-colors">
            Télécharger le certificat
          </button>
          <button className="bg-[#E65100] text-white rounded-xl text-xs font-medium px-4 py-2 hover:bg-orange-800 transition-colors">
            Préparer l'audit 2026
          </button>
        </div>

      </div>
    </div>
  );
}
