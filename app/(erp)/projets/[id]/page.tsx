import Topbar from "../../../components/Topbar";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ProjetDetailPage({ params }: Props) {
  const { id } = await params;

  // Gantt — période 01/07 → 31/08/2025
  // SVG 700×280, 61 jours, labelW=160, chartW=540
  const svgW = 700;
  const svgH = 280;
  const labelW = 160;
  const chartW = svgW - labelW - 10;
  const rowH = 30;
  const headerH = 28;

  const startDay = new Date("2025-07-01").getTime();
  const endDay = new Date("2025-08-31").getTime();
  const totalDays = (endDay - startDay) / 86400000 + 1; // 62 days
  const pxPerDay = chartW / totalDays;

  const todayDay = new Date("2025-07-12").getTime();
  const todayX = labelW + ((todayDay - startDay) / 86400000) * pxPerDay;

  const phases = [
    { label: "Phase 0 — Étude & devis", start: "2025-07-01", end: "2025-07-10", statut: "done" },
    { label: "Phase 1 — Appro. matériels", start: "2025-07-11", end: "2025-07-20", statut: "inprogress" },
    { label: "Phase 2 — Terrassement", start: "2025-07-22", end: "2025-07-24", statut: "planned" },
    { label: "Phase 3 — Pose réseau principal", start: "2025-07-25", end: "2025-07-28", statut: "planned" },
    { label: "Phase 4 — Pose rampes goutte-à-goutte", start: "2025-07-29", end: "2025-08-02", statut: "planned" },
    { label: "Phase 5 — Pompe solaire + raccord.", start: "2025-08-03", end: "2025-08-04", statut: "planned" },
    { label: "Phase 6 — Tests & mise en service", start: "2025-08-05", end: "2025-08-05", statut: "planned" },
  ];

  const barColor = (s: string) =>
    s === "done" ? "#2E7D32" : s === "inprogress" ? "#1565C0" : "#9ca3af";

  const dayOffset = (d: string) =>
    (new Date(d).getTime() - startDay) / 86400000;

  // Month tick marks
  const monthTicks = [
    { label: "Juillet 2025", day: 0 },
    { label: "Août 2025", day: 31 },
  ];

  // CA anacarde bars — grouped bar SVG 600×200
  const barSvgW = 600;
  const barSvgH = 200;
  const groups = [
    { year: "2025", sans: 1800000, avec: 2300000 },
    { year: "2026", sans: 1800000, avec: 2800000 },
    { year: "2027", sans: 1800000, avec: 2950000 },
    { year: "2028", sans: 1800000, avec: 3100000 },
  ];
  const maxVal = 3200000;
  const chartAreaH = 140;
  const chartAreaTop = 20;
  const chartAreaBottom = chartAreaTop + chartAreaH;
  const groupW = (barSvgW - 60) / groups.length;
  const barW2 = groupW * 0.3;
  const gap = groupW * 0.05;

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-[#F8FBF8]">
      <Topbar breadcrumb={["RH", "Projets", `Projet ${id}`]} />

      <main className="flex-1 p-6 space-y-6 max-w-7xl mx-auto w-full">

        {/* En-tête bandeau vert */}
        <div className="rounded-2xl bg-[#1B5E20] text-white p-6">
          <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <span className="text-xs font-mono bg-white/20 px-3 py-1 rounded-full">PROJ-2025-001</span>
                <span className="text-xs bg-blue-400/30 border border-blue-300/40 font-semibold px-3 py-1 rounded-full">
                  🔵 En cours (25% avancé)
                </span>
              </div>
              <h1 className="text-xl font-bold leading-snug">
                Installation système d&apos;irrigation goutte-à-goutte PAR-C1
              </h1>
              <p className="text-green-200 text-sm mt-1">Démarrage : 22/07/2025</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-green-100 pt-4 border-t border-white/20">
            <div>
              <span className="text-green-400 text-xs block">Chef de projet</span>
              Koffi Amani (DG AGRIFRIK)
            </div>
            <div>
              <span className="text-green-400 text-xs block">Fournisseur technique</span>
              Netafim CI (partenaire agrée)
            </div>
            <div>
              <span className="text-green-400 text-xs block">Budget approuvé</span>
              4 250 000 XOF
            </div>
            <div>
              <span className="text-green-400 text-xs block">Durée</span>
              15 jours (22/07 – 05/08/2025)
            </div>
          </div>
        </div>

        {/* 4 KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Budget total", value: "4 250 000 XOF", sub: "Approuvé DG" },
            { label: "Consommé à ce jour", value: "850 000 XOF", sub: "Acompte Netafim 20%" },
            { label: "Délai restant", value: "24 jours", sub: "Fin prévue 05/08/2025" },
            { label: "ROI estimé", value: "+28% rendement", sub: "1 400 → 1 800 kg/ha anacarde", green: true },
          ].map((kpi) => (
            <div key={kpi.label} className="rounded-2xl border border-gray-100 bg-white p-5">
              <p className="text-xs text-gray-500 mb-1">{kpi.label}</p>
              <p className={`text-xl font-bold ${kpi.green ? "text-[#2E7D32]" : "text-gray-900"}`}>
                {kpi.value}
              </p>
              <p className="text-xs text-gray-400 mt-1">{kpi.sub}</p>
            </div>
          ))}
        </div>

        {/* Description et objectifs */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-semibold text-[#1B5E20] mb-3">Description et objectifs</h2>
          <p className="text-sm text-gray-600 leading-relaxed mb-4">
            Installer un réseau d&apos;irrigation goutte-à-goutte sur PAR-C1 (1,8 ha anacarde Variété W240)
            pour pallier le déficit pluviométrique de juillet-août en zone Nawa (pluviométrie P &lt; 60 mm/mois
            en saison sèche).
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-[#F8FBF8]">
                  {["Objectif", "Indicateur", "Cible"].map((h) => (
                    <th key={h} className="text-left px-3 py-2 font-semibold text-gray-600 first:rounded-l-lg last:rounded-r-lg">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ["Augmenter rendement anacarde", "kg/ha", "1 400 → 1 800 kg/ha (+28%)"],
                  ["Réduire stress hydrique", "Jours déficit hydrique", "<5 jours/mois en saison sèche"],
                  ["Améliorer qualité (WW240)", "% WW240 sur récolte", "75% → 85%"],
                  ["ROI projet", "Années récupération investissement", "2,4 ans"],
                ].map(([obj, ind, cible]) => (
                  <tr key={obj} className="border-t border-gray-50 hover:bg-[#F8FBF8] transition-colors">
                    <td className="px-3 py-2.5 text-gray-800 font-medium">{obj}</td>
                    <td className="px-3 py-2.5 text-gray-600">{ind}</td>
                    <td className="px-3 py-2.5 text-[#2E7D32] font-semibold">{cible}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Gantt */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-semibold text-[#1B5E20] mb-4">
            Planification des travaux — Gantt PROJ-2025-001
          </h2>
          <div className="overflow-x-auto">
            <svg
              viewBox={`0 0 ${svgW} ${svgH}`}
              xmlns="http://www.w3.org/2000/svg"
              className="w-full"
              style={{ minWidth: "560px" }}
            >
              {/* Month labels */}
              {monthTicks.map((m) => (
                <text
                  key={m.label}
                  x={labelW + m.day * pxPerDay + 4}
                  y={16}
                  fontSize="9"
                  fontWeight="600"
                  fill="#374151"
                >
                  {m.label}
                </text>
              ))}

              {/* Column grid — every 7 days */}
              {Array.from({ length: Math.ceil(totalDays / 7) + 1 }).map((_, i) => (
                <line
                  key={i}
                  x1={labelW + i * 7 * pxPerDay}
                  y1={headerH}
                  x2={labelW + i * 7 * pxPerDay}
                  y2={svgH - 20}
                  stroke="#f3f4f6"
                  strokeWidth="1"
                />
              ))}

              {/* Month separator */}
              <line
                x1={labelW + 31 * pxPerDay}
                y1={headerH}
                x2={labelW + 31 * pxPerDay}
                y2={svgH - 20}
                stroke="#d1d5db"
                strokeWidth="1"
              />

              {/* Phases */}
              {phases.map((ph, ri) => {
                const y = headerH + ri * rowH;
                const x0 = labelW + dayOffset(ph.start) * pxPerDay + 2;
                const x1 = labelW + (dayOffset(ph.end) + 1) * pxPerDay - 2;
                const bw = x1 - x0;
                const cy = y + rowH / 2;
                return (
                  <g key={ph.label}>
                    <rect x={0} y={y} width={svgW} height={rowH} fill={ri % 2 === 0 ? "#fafafa" : "white"} />
                    <text x={4} y={cy + 4} fontSize="8.5" fill="#374151" fontWeight={ph.statut === "inprogress" ? "600" : "400"}>
                      {ph.label.length > 30 ? ph.label.slice(0, 30) + "…" : ph.label}
                    </text>
                    <rect
                      x={x0}
                      y={y + 7}
                      width={Math.max(bw, 4)}
                      height={rowH - 14}
                      rx="3"
                      fill={barColor(ph.statut)}
                      opacity={ph.statut === "planned" ? 0.4 : 1}
                    />
                    {ph.statut === "done" && (
                      <text x={x0 + bw / 2} y={cy + 4} textAnchor="middle" fontSize="8" fill="white" fontWeight="700">✓</text>
                    )}
                    {ph.statut === "inprogress" && (
                      <text x={x0 + bw / 2} y={cy + 4} textAnchor="middle" fontSize="7.5" fill="white" fontWeight="700">En cours</text>
                    )}
                  </g>
                );
              })}

              {/* Today marker */}
              <line x1={todayX} y1={headerH} x2={todayX} y2={svgH - 20} stroke="#E65100" strokeWidth="2" strokeDasharray="4 3" />
              <text x={todayX + 3} y={headerH + 10} fontSize="8" fill="#E65100" fontWeight="700">Aujourd&apos;hui 11/07</text>

              {/* Legend */}
              {[
                { color: "#2E7D32", label: "Terminé", opacity: 1 },
                { color: "#1565C0", label: "En cours", opacity: 1 },
                { color: "#9ca3af", label: "Planifié", opacity: 0.4 },
              ].map((l, i) => (
                <g key={l.label} transform={`translate(${labelW + 10 + i * 90}, ${svgH - 10})`}>
                  <rect x={0} y={-8} width={12} height={8} rx="2" fill={l.color} opacity={l.opacity} />
                  <text x={16} y={-1} fontSize="8" fill="#6b7280">{l.label}</text>
                </g>
              ))}
            </svg>
          </div>
        </div>

        {/* Budget détaillé */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-semibold text-[#1B5E20] mb-4">Budget détaillé</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-[#F8FBF8]">
                  {["Poste", "Fournisseur", "Montant HT", "TVA 18%", "Total TTC"].map((h) => (
                    <th key={h} className="text-left px-3 py-2 font-semibold text-gray-600 first:rounded-l-lg last:rounded-r-lg">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ["Tuyaux LDPE ø16mm (3 600 ml)", "Netafim CI", "720 000", "129 600", "849 600"],
                  ["Goutteurs intégrés autocompensants (2 160 u.)", "Netafim CI", "432 000", "77 760", "509 760"],
                  ["Tube PE ø32mm réseau principal (180 ml)", "Netafim CI", "144 000", "25 920", "169 920"],
                  ["Pompe solaire 1,5 kW + panneau 250W", "SolarTech CI", "890 000", "160 200", "1 050 200"],
                  ["Tête de réseau (filtre + fertilisant)", "Netafim CI", "380 000", "68 400", "448 400"],
                  ["Main d'œuvre pose (Netafim CI)", "Netafim CI", "950 000", "171 000", "1 121 000"],
                  ["Terrassement (sous-traitant local)", "Ent. Coulibaly", "87 000", "15 660", "102 660"],
                ].map(([poste, fournisseur, ht, tva, ttc]) => (
                  <tr key={poste} className="border-t border-gray-50 hover:bg-[#F8FBF8] transition-colors">
                    <td className="px-3 py-2.5 text-gray-800">{poste}</td>
                    <td className="px-3 py-2.5 text-gray-600">{fournisseur}</td>
                    <td className="px-3 py-2.5 text-gray-700 font-mono text-right">{ht}</td>
                    <td className="px-3 py-2.5 text-gray-500 font-mono text-right">{tva}</td>
                    <td className="px-3 py-2.5 text-gray-800 font-semibold font-mono text-right">{ttc}</td>
                  </tr>
                ))}
                <tr className="border-t-2 border-gray-200 bg-[#F8FBF8] font-bold text-xs">
                  <td className="px-3 py-2.5 text-gray-800 rounded-l-lg" colSpan={2}>TOTAL</td>
                  <td className="px-3 py-2.5 text-[#1B5E20] font-mono text-right">3 603 000</td>
                  <td className="px-3 py-2.5 text-gray-600 font-mono text-right">648 540</td>
                  <td className="px-3 py-2.5 text-[#1B5E20] font-mono text-right rounded-r-lg">4 251 540 ≈ 4 250 000 XOF</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            <div className="rounded-xl bg-green-50 border border-green-200 px-4 py-3 text-xs text-green-800">
              <span className="font-semibold">Acompte Netafim :</span> 850 000 XOF (20%) ✅ Payé
            </div>
            <div className="rounded-xl bg-gray-50 border border-gray-200 px-4 py-3 text-xs text-gray-600">
              Solde Netafim + SolarTech CI à payer à réception des travaux
            </div>
          </div>
        </div>

        {/* Bénéfices attendus — SVG grouped bar */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-semibold text-[#1B5E20] mb-4">
            Bénéfices attendus — CA anacarde avant/après irrigation 2025-2028
          </h2>
          <div className="overflow-x-auto">
            <svg
              viewBox={`0 0 ${barSvgW} ${barSvgH}`}
              xmlns="http://www.w3.org/2000/svg"
              className="w-full"
              style={{ minWidth: "400px" }}
            >
              {/* Y-axis lines */}
              {[0, 1000000, 2000000, 3000000].map((v) => {
                const y = chartAreaBottom - (v / maxVal) * chartAreaH;
                return (
                  <g key={v}>
                    <line x1={50} y1={y} x2={barSvgW - 10} y2={y} stroke="#f3f4f6" strokeWidth="1" />
                    <text x={48} y={y + 3} textAnchor="end" fontSize="8" fill="#9ca3af">
                      {v === 0 ? "0" : v === 1000000 ? "1M" : v === 2000000 ? "2M" : "3M"}
                    </text>
                  </g>
                );
              })}

              {/* Grouped bars */}
              {groups.map((g, gi) => {
                const groupX = 55 + gi * groupW;
                const sansH = (g.sans / maxVal) * chartAreaH;
                const avecH = (g.avec / maxVal) * chartAreaH;
                const sansX = groupX + gap;
                const avecX = sansX + barW2 + gap;
                return (
                  <g key={g.year}>
                    {/* Sans irrigation */}
                    <rect
                      x={sansX}
                      y={chartAreaBottom - sansH}
                      width={barW2}
                      height={sansH}
                      rx="2"
                      fill="#93c5fd"
                    />
                    {/* Avec irrigation */}
                    <rect
                      x={avecX}
                      y={chartAreaBottom - avecH}
                      width={barW2}
                      height={avecH}
                      rx="2"
                      fill="#2E7D32"
                    />
                    {/* Labels */}
                    <text x={sansX + barW2 / 2} y={chartAreaBottom - sansH - 3} textAnchor="middle" fontSize="7" fill="#374151">
                      {(g.sans / 1000000).toFixed(1)}M
                    </text>
                    <text x={avecX + barW2 / 2} y={chartAreaBottom - avecH - 3} textAnchor="middle" fontSize="7" fill="#1B5E20" fontWeight="600">
                      {(g.avec / 1000000).toFixed(1)}M
                    </text>
                    {/* Year */}
                    <text x={groupX + groupW / 2} y={chartAreaBottom + 14} textAnchor="middle" fontSize="9" fill="#374151" fontWeight="600">
                      {g.year}
                    </text>
                  </g>
                );
              })}

              {/* Axes */}
              <line x1={50} y1={chartAreaTop} x2={50} y2={chartAreaBottom} stroke="#d1d5db" strokeWidth="1" />
              <line x1={50} y1={chartAreaBottom} x2={barSvgW - 10} y2={chartAreaBottom} stroke="#d1d5db" strokeWidth="1" />

              {/* Legend */}
              <rect x={60} y={barSvgH - 18} width={10} height={8} rx="2" fill="#93c5fd" />
              <text x={75} y={barSvgH - 11} fontSize="8" fill="#6b7280">Sans irrigation</text>
              <rect x={160} y={barSvgH - 18} width={10} height={8} rx="2" fill="#2E7D32" />
              <text x={175} y={barSvgH - 11} fontSize="8" fill="#6b7280">Avec irrigation</text>
              <text x={barSvgW - 10} y={barSvgH - 11} textAnchor="end" fontSize="8" fill="#9ca3af">XOF</text>
            </svg>
          </div>
          <div className="mt-4 rounded-xl bg-green-50 border border-green-200 p-4 text-sm text-green-800">
            Le projet sera rentabilisé en <span className="font-semibold">2,4 années</span>. Sur 10 ans, le gain net attendu est de{" "}
            <span className="font-semibold">+18,5M XOF</span> par rapport à la situation sans irrigation.
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3 pb-6">
          <a
            href="/projets"
            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Retour aux projets
          </a>
          <button className="inline-flex items-center gap-2 rounded-xl bg-[#2E7D32] text-white px-4 py-2.5 text-xs font-medium hover:bg-[#1B5E20] transition-colors">
            Mettre à jour l&apos;avancement
          </button>
          <button className="inline-flex items-center gap-2 rounded-xl border border-[#2E7D32] text-[#2E7D32] px-4 py-2.5 text-xs font-medium hover:bg-green-50 transition-colors">
            Contacter Netafim
          </button>
        </div>

      </main>
    </div>
  );
}
