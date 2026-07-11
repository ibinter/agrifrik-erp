import Topbar from "../../../components/Topbar";

export default async function ProjetDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Gantt config — 18 months Jan 2025 → Jun 2026
  const totalMonths = 18; // Jan 2025 = 0 … Jun 2026 = 17
  const todayMonth = 6; // July 2025 = index 6

  const jalons = [
    { num: 1, label: "Diagnostic initial & gap analysis RA", start: 0, dur: 2, statut: "done" },
    { num: 2, label: "Formation équipe BPA anacarde", start: 2, dur: 1, statut: "done" },
    { num: 3, label: "Mise en conformité pratiques culturales", start: 3, dur: 3, statut: "done" },
    { num: 4, label: "Documentation SGA", start: 4, dur: 3, statut: "inprogress" },
    { num: 5, label: "Audit interne pré-certification", start: 7, dur: 1, statut: "planned" },
    { num: 6, label: "Dépôt dossier Rainforest Alliance", start: 8, dur: 1, statut: "planned" },
    { num: 7, label: "Audit externe RA", start: 10, dur: 2, statut: "planned" },
    { num: 8, label: "Obtention certificat + prime", start: 12, dur: 6, statut: "planned" },
  ];

  const monthLabels = [
    "Jan 25", "Fév 25", "Mar 25", "Avr 25", "Mai 25", "Jun 25",
    "Jul 25", "Aoû 25", "Sep 25", "Oct 25", "Nov 25", "Déc 25",
    "Jan 26", "Fév 26", "Mar 26", "Avr 26", "Mai 26", "Jun 26",
  ];

  // SVG dimensions
  const svgW = 700;
  const svgH = 320;
  const labelW = 200;
  const chartW = svgW - labelW - 10;
  const rowH = 28;
  const headerH = 30;
  const colW = chartW / totalMonths;

  const barColor = (s: string) =>
    s === "done" ? "#2E7D32" : s === "inprogress" ? "#1565C0" : "#9ca3af";

  const todayX = labelW + todayMonth * colW + colW / 2;

  return (
    <div className="min-h-screen bg-gray-50">
      <Topbar breadcrumb={["RH", "Projets", `Projet ${id}`]} />

      <div className="p-6 max-w-6xl mx-auto space-y-6">
        {/* En-tête */}
        <div className="rounded-2xl bg-[#1B5E20] text-white p-6">
          <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-1">
                <h1 className="text-xl font-bold leading-tight">
                  Extension Certification Rainforest Alliance — Filière Anacarde
                </h1>
                <span className="text-xs bg-blue-400/30 border border-blue-300/50 rounded-full px-3 py-0.5 font-medium">
                  🔵 En cours
                </span>
              </div>
              <p className="text-green-200 text-sm">N° PRJ-2025-001</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm text-green-100 mb-5">
            <div><span className="text-green-400 text-xs block">Chef de projet</span>Adjoua Messou</div>
            <div><span className="text-green-400 text-xs block">Sponsor</span>Koffi Amani (DG)</div>
            <div><span className="text-green-400 text-xs block">Durée</span>18 mois (Jan 2025 → Jun 2026)</div>
            <div><span className="text-green-400 text-xs block">Budget</span>12 400 000 XOF</div>
          </div>

          {/* 5 KPI */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 pt-5 border-t border-white/20">
            {[
              { label: "Avancement global", value: "34%", sub: "" },
              { label: "Budget consommé", value: "30,8%", sub: "3 820 000 / 12 400 000" },
              { label: "Jalons atteints", value: "3/8", sub: "" },
              { label: "Risques ouverts", value: "2", sub: "" },
              { label: "Prochaine étape", value: "Audit pré-cert.", sub: "15/08/2025" },
            ].map((kpi) => (
              <div key={kpi.label} className="text-center">
                <p className="text-xl font-bold">{kpi.value}</p>
                {kpi.sub && <p className="text-xs text-green-300 mt-0.5">{kpi.sub}</p>}
                <p className="text-xs text-green-200 mt-0.5">{kpi.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-semibold text-gray-700 mb-3">Description du projet</h2>
          <p className="text-sm text-gray-600 leading-relaxed mb-4">
            Objectif : Obtenir la certification Rainforest Alliance pour les parcelles PAR-C1 et PAR-C2
            (10,4 ha anacarde), actuellement non certifiées. La certification permettra une prime de +15%
            sur le prix de vente anacarde (estimation : +1,8 M XOF/an de CA supplémentaire).
          </p>
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Bénéfices attendus</h3>
          <ul className="space-y-1.5 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-green-600 mt-0.5">•</span>
              <span>Prix anacarde : +120 XOF/kg (WW240 certifié RA : 1 070 vs 950 XOF/kg)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 mt-0.5">•</span>
              <span>Accès marché premium : Mars Wrigley, Ferrero (acheteurs exigeant certif. RA anacarde)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 mt-0.5">•</span>
              <span>Cohérence portfolio : 100% surfaces certifiées RA d'ici Jun 2026</span>
            </li>
          </ul>
        </div>

        {/* Gantt */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">Plan de projet — Gantt</h2>
          <div className="overflow-x-auto">
            <svg
              viewBox={`0 0 ${svgW} ${svgH}`}
              xmlns="http://www.w3.org/2000/svg"
              className="w-full"
              style={{ minWidth: "600px" }}
            >
              {/* Month header labels */}
              {monthLabels.map((m, i) => (
                <text
                  key={m}
                  x={labelW + i * colW + colW / 2}
                  y={16}
                  textAnchor="middle"
                  fontSize="7"
                  fill="#9ca3af"
                >
                  {i % 2 === 0 ? m : ""}
                </text>
              ))}

              {/* Column grid */}
              {Array.from({ length: totalMonths + 1 }).map((_, i) => (
                <line
                  key={i}
                  x1={labelW + i * colW}
                  y1={headerH}
                  x2={labelW + i * colW}
                  y2={svgH - 10}
                  stroke="#f3f4f6"
                  strokeWidth="1"
                />
              ))}

              {/* Rows */}
              {jalons.map((j, ri) => {
                const y = headerH + ri * rowH;
                const barX = labelW + j.start * colW + 2;
                const barW = j.dur * colW - 4;
                const cy = y + rowH / 2;
                return (
                  <g key={j.num}>
                    {/* Row bg */}
                    <rect x={0} y={y} width={svgW} height={rowH} fill={ri % 2 === 0 ? "#fafafa" : "white"} />
                    {/* Label */}
                    <text x={4} y={cy + 4} fontSize="9" fill="#374151" fontWeight={j.statut === "inprogress" ? "600" : "400"}>
                      {j.num}. {j.label.length > 28 ? j.label.slice(0, 28) + "…" : j.label}
                    </text>
                    {/* Bar */}
                    <rect x={barX} y={y + 6} width={barW} height={rowH - 12} rx="3" fill={barColor(j.statut)} opacity={j.statut === "planned" ? 0.45 : 1} />
                    {/* Status icon */}
                    <text x={barX + barW / 2} y={cy + 4} textAnchor="middle" fontSize="8" fill="white" fontWeight="600">
                      {j.statut === "done" ? "✓" : j.statut === "inprogress" ? "60%" : ""}
                    </text>
                  </g>
                );
              })}

              {/* Today line */}
              <line x1={todayX} y1={headerH} x2={todayX} y2={svgH - 10} stroke="#E65100" strokeWidth="1.5" strokeDasharray="4 2" />
              <text x={todayX + 3} y={headerH + 10} fontSize="8" fill="#E65100" fontWeight="600">Aujourd'hui</text>

              {/* Legend */}
              {[
                { color: "#2E7D32", label: "Terminé" },
                { color: "#1565C0", label: "En cours" },
                { color: "#9ca3af", label: "Planifié" },
              ].map((l, i) => (
                <g key={l.label} transform={`translate(${labelW + 10 + i * 90}, ${svgH - 8})`}>
                  <rect x={0} y={-8} width={12} height={8} rx="2" fill={l.color} opacity={l.label === "Planifié" ? 0.45 : 1} />
                  <text x={16} y={-1} fontSize="8" fill="#6b7280">{l.label}</text>
                </g>
              ))}
            </svg>
          </div>

          {/* Jalons table */}
          <div className="overflow-x-auto mt-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#F8FBF8]">
                  {["#", "Jalon", "Début", "Fin", "Durée", "Statut"].map((h) => (
                    <th key={h} className="text-left text-xs font-medium text-gray-500 px-3 py-2 first:rounded-l-lg last:rounded-r-lg">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  { n: 1, label: "Diagnostic initial & gap analysis RA", debut: "Jan 25", fin: "Fév 25", dur: "2 mois", statut: "✅ Terminé" },
                  { n: 2, label: "Formation équipe BPA anacarde", debut: "Mar 25", fin: "Mar 25", dur: "1 mois", statut: "✅ Terminé" },
                  { n: 3, label: "Mise en conformité pratiques culturales", debut: "Avr 25", fin: "Jun 25", dur: "3 mois", statut: "✅ Terminé" },
                  { n: 4, label: "Documentation SGA (Système de gestion)", debut: "Mai 25", fin: "Jul 25", dur: "3 mois", statut: "🔵 En cours (60%)" },
                  { n: 5, label: "Audit interne pré-certification", debut: "Août 25", fin: "Août 25", dur: "1 mois", statut: "📅 Planifié" },
                  { n: 6, label: "Dépôt dossier Rainforest Alliance", debut: "Sep 25", fin: "Sep 25", dur: "1 mois", statut: "📅 Planifié" },
                  { n: 7, label: "Audit externe RA", debut: "Nov 25", fin: "Déc 25", dur: "2 mois", statut: "📅 Planifié" },
                  { n: 8, label: "Obtention certificat + prime", debut: "Jan 26", fin: "Jun 26", dur: "6 mois", statut: "📅 Planifié" },
                ].map((j) => (
                  <tr key={j.n}>
                    <td className="px-3 py-2.5 text-gray-400 font-mono text-xs">{j.n}</td>
                    <td className="px-3 py-2.5 text-gray-800">{j.label}</td>
                    <td className="px-3 py-2.5 text-gray-500 text-xs">{j.debut}</td>
                    <td className="px-3 py-2.5 text-gray-500 text-xs">{j.fin}</td>
                    <td className="px-3 py-2.5 text-gray-500 text-xs">{j.dur}</td>
                    <td className="px-3 py-2.5 text-xs font-medium text-gray-700">{j.statut}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Budget */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">Budget détaillé</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#F8FBF8]">
                  {["Poste", "Budget (XOF)", "Consommé", "Reste", "Statut"].map((h) => (
                    <th key={h} className="text-left text-xs font-medium text-gray-500 px-3 py-2 first:rounded-l-lg last:rounded-r-lg">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  { poste: "Consultant RA (gap analysis)", budget: "2 400 000", conso: "2 400 000", reste: "0", statut: "✅ Soldé", bold: false },
                  { poste: "Formation BPA anacarde (ANADER)", budget: "480 000", conso: "480 000", reste: "0", statut: "✅ Soldé", bold: false },
                  { poste: "Matériaux mise en conformité", budget: "3 200 000", conso: "840 000", reste: "2 360 000", statut: "🔵 En cours", bold: false },
                  { poste: "Rédaction SGA (temps interne Adjoua M.)", budget: "1 200 000", conso: "300 000", reste: "900 000", statut: "🔵 En cours", bold: false },
                  { poste: "Frais audit externe RA", budget: "2 800 000", conso: "0", reste: "2 800 000", statut: "⏳ Futur", bold: false },
                  { poste: "Frais certification & licence", budget: "1 800 000", conso: "0", reste: "1 800 000", statut: "⏳ Futur", bold: false },
                  { poste: "Réserve imprévus (4%)", budget: "520 000", conso: "0", reste: "520 000", statut: "⏳", bold: false },
                  { poste: "TOTAL", budget: "12 400 000", conso: "4 020 000", reste: "8 380 000", statut: "30,8%", bold: true },
                ].map((row) => (
                  <tr key={row.poste} className={row.bold ? "bg-gray-50 font-semibold" : ""}>
                    <td className="px-3 py-2.5 text-gray-800">{row.poste}</td>
                    <td className="px-3 py-2.5 text-right tabular-nums">{row.budget}</td>
                    <td className="px-3 py-2.5 text-right tabular-nums text-orange-700">{row.conso}</td>
                    <td className="px-3 py-2.5 text-right tabular-nums text-green-700">{row.reste}</td>
                    <td className="px-3 py-2.5 text-xs font-medium text-gray-600">{row.statut}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Équipe */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">Équipe projet</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#F8FBF8]">
                  {["Rôle", "Nom", "Responsabilité", "Charge (%)"].map((h) => (
                    <th key={h} className="text-left text-xs font-medium text-gray-500 px-3 py-2 first:rounded-l-lg last:rounded-r-lg">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  { role: "Chef de projet", nom: "Adjoua Messou", resp: "Pilotage global, SGA, audits", charge: "40%" },
                  { role: "Resp. terrain", nom: "Ibrahim Sawadogo", resp: "Mise en conformité pratiques PAR-C1/C2", charge: "25%" },
                  { role: "Technicien", nom: "Konan Yao", resp: "Suivi cultural, fiches de traçabilité", charge: "20%" },
                  { role: "Consultant externe", nom: "Cabinet CERTIFI-CI", resp: "Audit interne pré-certif.", charge: "Prestataire" },
                  { role: "Sponsor", nom: "Koffi Amani (DG)", resp: "Validation budgétaire", charge: "5%" },
                ].map((m) => (
                  <tr key={m.nom}>
                    <td className="px-3 py-2.5 text-xs text-gray-500 font-medium">{m.role}</td>
                    <td className="px-3 py-2.5 text-gray-800 font-medium">{m.nom}</td>
                    <td className="px-3 py-2.5 text-gray-600 text-xs">{m.resp}</td>
                    <td className="px-3 py-2.5">
                      <span className="inline-block bg-green-50 text-green-700 text-xs rounded-full px-2 py-0.5 font-medium">
                        {m.charge}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Risques */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">Risques</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#F8FBF8]">
                  {["Risque", "Probabilité", "Impact", "Mitigation", "Statut"].map((h) => (
                    <th key={h} className="text-left text-xs font-medium text-gray-500 px-3 py-2 first:rounded-l-lg last:rounded-r-lg">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                <tr>
                  <td className="px-3 py-3 text-gray-800">Refus audit RA (écarts SGA)</td>
                  <td className="px-3 py-3">
                    <span className="inline-block bg-yellow-50 text-yellow-700 text-xs rounded-full px-2 py-0.5 font-medium">Moyen (35%)</span>
                  </td>
                  <td className="px-3 py-3">
                    <span className="inline-block bg-red-50 text-red-700 text-xs rounded-full px-2 py-0.5 font-medium">Élevé</span>
                  </td>
                  <td className="px-3 py-3 text-xs text-gray-600">Audit interne préalable + consultant</td>
                  <td className="px-3 py-3 text-xs font-medium text-yellow-700">🟡 Surveillé</td>
                </tr>
                <tr>
                  <td className="px-3 py-3 text-gray-800">Dépassement budget</td>
                  <td className="px-3 py-3">
                    <span className="inline-block bg-green-50 text-green-700 text-xs rounded-full px-2 py-0.5 font-medium">Faible (20%)</span>
                  </td>
                  <td className="px-3 py-3">
                    <span className="inline-block bg-yellow-50 text-yellow-700 text-xs rounded-full px-2 py-0.5 font-medium">Moyen</span>
                  </td>
                  <td className="px-3 py-3 text-xs text-gray-600">Réserve 4% + revue mensuelle</td>
                  <td className="px-3 py-3 text-xs font-medium text-green-700">🟢 Contrôlé</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3">
          <a
            href="/projets"
            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            ← Retour aux projets
          </a>
          <button className="inline-flex items-center gap-2 rounded-xl bg-[#2E7D32] text-white px-4 py-2.5 text-xs font-medium hover:bg-[#1B5E20] transition-colors">
            Télécharger le plan de projet (PDF)
          </button>
        </div>
      </div>
    </div>
  );
}
