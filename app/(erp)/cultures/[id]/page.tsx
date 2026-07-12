import Topbar from "../../../components/Topbar";

export default async function CultureDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="min-h-screen bg-[#F8FBF8]">
      <Topbar breadcrumb={["Production", "Cultures", `Parcelle ${id}`]} />

      <div className="p-6 max-w-6xl mx-auto space-y-6">

        {/* ── En-tête ── */}
        <div className="rounded-2xl bg-[#1B5E20] text-white p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-1">
              <p className="text-green-300 text-xs font-medium uppercase tracking-wider">Fiche Parcelle</p>
              <h1 className="text-2xl font-bold">PAR-A1 — Bloc A1</h1>
              <p className="text-green-200 text-sm">Zone Nord-Ouest EXP-001</p>
              <p className="text-green-100 mt-2 text-sm">
                <span className="font-semibold">Culture :</span> Theobroma cacao — Variété Hybride F1 PH16 résistante Phytophthora
              </p>
              <div className="flex flex-wrap gap-4 mt-2 text-sm text-green-100">
                <span><span className="font-semibold">Superficie :</span> 3,8 ha</span>
                <span><span className="font-semibold">Densité :</span> 1 050 pieds/ha ≈ 3 990 pieds totaux</span>
                <span><span className="font-semibold">Plantation :</span> 2014 (11 ans — pleine production)</span>
              </div>
            </div>
            <div className="flex flex-col gap-2 items-end">
              <span className="inline-flex items-center gap-1.5 bg-green-700 border border-green-500 text-green-100 text-xs font-medium px-3 py-1.5 rounded-xl">
                ✅ Certifiée RA 2020
              </span>
              <span className="text-green-300 text-xs">Prochaine inspection : Août 2025</span>
            </div>
          </div>
        </div>

        {/* ── 5 KPI ── */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { label: "Production 2024", value: "5,2 t", sub: "1 368 kg/ha — excellence RA", icon: "✅", color: "text-green-700" },
            { label: "Production H1 2025", value: "2,1 t", sub: "Récolte intermédiaire", icon: "", color: "text-blue-700" },
            { label: "Grade AA obtenu", value: "87%", sub: "des fèves", icon: "✅", color: "text-green-700" },
            { label: "Taux mirides actuel", value: "6%", sub: "Seuil alerte 5%", icon: "🟡", color: "text-yellow-600" },
            { label: "Prochaine intervention", value: "15/07/2025", sub: "Traitement mirides", icon: "", color: "text-orange-600" },
          ].map((kpi) => (
            <div key={kpi.label} className="rounded-2xl border border-gray-100 bg-white p-5 flex flex-col gap-1">
              <p className="text-xs text-gray-500">{kpi.label}</p>
              <p className={`text-xl font-bold ${kpi.color}`}>
                {kpi.icon && <span className="mr-1">{kpi.icon}</span>}{kpi.value}
              </p>
              <p className="text-xs text-gray-400">{kpi.sub}</p>
            </div>
          ))}
        </div>

        {/* ── Plan de la parcelle ── */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">Plan PAR-A1 — Vue aérienne schématique</h2>
          <svg viewBox="0 0 700 310" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <defs>
              <pattern id="hatchLight" patternUnits="userSpaceOnUse" width="8" height="8" patternTransform="rotate(45)">
                <line x1="0" y1="0" x2="0" y2="8" stroke="#a5d6a7" strokeWidth="2" />
              </pattern>
              <pattern id="hatchMed" patternUnits="userSpaceOnUse" width="8" height="8" patternTransform="rotate(45)">
                <line x1="0" y1="0" x2="0" y2="8" stroke="#4CAF50" strokeWidth="2.5" />
              </pattern>
            </defs>

            {/* Contour parcelle */}
            <rect x="30" y="15" width="640" height="240" rx="6" fill="#e8f5e9" stroke="#2E7D32" strokeWidth="2" />

            {/* Zone 1 — 65% */}
            <rect x="34" y="19" width="414" height="232" rx="4" fill="url(#hatchLight)" opacity="0.8" />
            <text x="241" y="130" textAnchor="middle" fontSize="12" fill="#2E7D32" fontWeight="700">Zone 1 — PH16 2014</text>
            <text x="241" y="147" textAnchor="middle" fontSize="10" fill="#388E3C">65% de la surface</text>

            {/* Zone 2 — 20% */}
            <rect x="452" y="19" width="128" height="232" rx="4" fill="url(#hatchMed)" opacity="0.8" />
            <text x="516" y="130" textAnchor="middle" fontSize="10" fill="#1B5E20" fontWeight="700">Zone 2</text>
            <text x="516" y="145" textAnchor="middle" fontSize="9" fill="#2E7D32">PH16 2018</text>
            <text x="516" y="159" textAnchor="middle" fontSize="9" fill="#2E7D32">20%</text>

            {/* Zone 3 — 15% */}
            <rect x="584" y="19" width="82" height="232" rx="4" fill="#1B5E20" opacity="0.82" />
            <text x="625" y="130" textAnchor="middle" fontSize="10" fill="#c8e6c9" fontWeight="700">Zone 3</text>
            <text x="625" y="145" textAnchor="middle" fontSize="9" fill="#a5d6a7">Gliricidia</text>
            <text x="625" y="159" textAnchor="middle" fontSize="9" fill="#a5d6a7">15%</text>

            {/* Pièges phéromones */}
            <circle cx="70" cy="50" r="8" fill="#e53935" stroke="white" strokeWidth="2" />
            <circle cx="241" cy="135" r="8" fill="#e53935" stroke="white" strokeWidth="2" />
            <circle cx="400" cy="230" r="8" fill="#e53935" stroke="white" strokeWidth="2" />

            {/* Sondes humidité */}
            <circle cx="150" cy="200" r="7" fill="#1565c0" stroke="white" strokeWidth="2" />
            <circle cx="320" cy="70" r="7" fill="#1565c0" stroke="white" strokeWidth="2" />

            {/* Légende */}
            <rect x="30" y="268" width="14" height="14" rx="2" fill="url(#hatchLight)" stroke="#a5d6a7" strokeWidth="1" />
            <text x="50" y="279" fontSize="10" fill="#555">Zone 1 PH16 2014 (65%)</text>
            <rect x="210" y="268" width="14" height="14" rx="2" fill="url(#hatchMed)" stroke="#4CAF50" strokeWidth="1" />
            <text x="230" y="279" fontSize="10" fill="#555">Zone 2 PH16 2018 (20%)</text>
            <rect x="390" y="268" width="14" height="14" rx="2" fill="#1B5E20" />
            <text x="410" y="279" fontSize="10" fill="#555">Zone 3 Ombre (15%)</text>
            <circle cx="518" cy="275" r="6" fill="#e53935" />
            <text x="528" y="279" fontSize="10" fill="#555">Piège phéromones</text>
            <circle cx="622" cy="275" r="5" fill="#1565c0" />
            <text x="632" y="279" fontSize="10" fill="#555">Sonde humidité</text>
          </svg>
        </div>

        {/* ── Calendrier cultural 2025 ── */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">Interventions PAR-A1 — Planification 2025</h2>
          <svg viewBox="0 0 700 280" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            {(() => {
              const months = ["J","F","M","A","M","J","J","A","S","O","N","D"];
              const startX = 110;
              const endX = 690;
              const totalW = endX - startX;
              const colW = totalW / 12;

              const xOf = (mo: number, day = 0) => startX + mo * colW + (day / 30) * colW;

              // Rows Y positions
              const rows = [
                { label: "Mirides", y: 30, color: "#e53935", dash: true },
                { label: "Phytopht.", y: 65, color: "#ff6f00", dash: false },
                { label: "KCl", y: 100, color: "#1565c0", dash: false },
                { label: "Récolte inter.", y: 135, color: "#81c784", dash: false },
                { label: "Grande récolte", y: 170, color: "#2E7D32", dash: false },
              ];

              const mirideMo = [0, 2, 4, 6, 8, 10];
              const phytoMo = [1, 3, 5, 7, 9, 11];

              return (
                <g>
                  {/* Mois header */}
                  {months.map((m, i) => (
                    <text key={i} x={xOf(i) + colW / 2} y="16" textAnchor="middle" fontSize="10" fill="#888">{m}</text>
                  ))}
                  <line x1={startX} y1="20" x2={endX} y2="20" stroke="#e0e0e0" strokeWidth="1" />

                  {/* Labels */}
                  {rows.map((r) => (
                    <text key={r.label} x={startX - 6} y={r.y + 14} textAnchor="end" fontSize="9" fill={r.color} fontWeight="600">{r.label}</text>
                  ))}

                  {/* Mirides */}
                  {mirideMo.map((mo) => (
                    <rect key={`mir${mo}`} x={xOf(mo) + 2} y={rows[0].y} width={colW - 4} height="20" rx="4"
                      fill="none" stroke="#e53935" strokeWidth="2" strokeDasharray="5,3" />
                  ))}

                  {/* Phytophthora */}
                  {phytoMo.map((mo) => (
                    <rect key={`phy${mo}`} x={xOf(mo) + 2} y={rows[1].y} width={colW - 4} height="20" rx="4"
                      fill="#ff6f00" opacity="0.8" />
                  ))}

                  {/* KCl mois 5 (Jun) et 7 (Aout) */}
                  {[5, 7].map((mo) => (
                    <rect key={`kcl${mo}`} x={xOf(mo) + 2} y={rows[2].y} width={colW - 4} height="20" rx="4"
                      fill="#1565c0" opacity="0.8" />
                  ))}

                  {/* Récolte intermédiaire : Fév-Mar (mo 1 à 2) */}
                  <rect x={xOf(1) + 2} y={rows[3].y} width={2 * colW - 4} height="20" rx="4" fill="#81c784" opacity="0.9" />
                  <text x={xOf(1) + colW} y={rows[3].y + 14} textAnchor="middle" fontSize="8" fill="white" fontWeight="600">Intermédiaire</text>

                  {/* Grande récolte : Oct-Nov (mo 9 à 10) */}
                  <rect x={xOf(9) + 2} y={rows[4].y} width={2 * colW - 4} height="20" rx="4" fill="#2E7D32" opacity="0.9" />
                  <text x={xOf(9) + colW} y={rows[4].y + 14} textAnchor="middle" fontSize="8" fill="white" fontWeight="600">Grande récolte</text>

                  {/* Marqueur aujourd'hui 11/07 */}
                  {(() => {
                    const x = xOf(6, 11);
                    return (
                      <g>
                        <line x1={x} y1="20" x2={x} y2="200" stroke="#e53935" strokeWidth="1.5" strokeDasharray="4,3" />
                        <text x={x} y="15" textAnchor="middle" fontSize="8" fill="#e53935" fontWeight="700">Auj.</text>
                      </g>
                    );
                  })()}

                  {/* 15/07 prochain traitement */}
                  {(() => {
                    const x = xOf(6, 15);
                    return (
                      <rect x={x - 1} y={rows[0].y} width={10} height="20" rx="3" fill="#e53935" opacity="0.9" />
                    );
                  })()}

                  {/* Légende bas */}
                  <rect x={startX} y="215" width="14" height="10" rx="2" fill="none" stroke="#e53935" strokeWidth="1.5" strokeDasharray="4,2" />
                  <text x={startX + 18} y="224" fontSize="9" fill="#555">Mirides</text>
                  <rect x={startX + 100} y="215" width="14" height="10" rx="2" fill="#ff6f00" opacity="0.8" />
                  <text x={startX + 118} y="224" fontSize="9" fill="#555">Phytophthora</text>
                  <rect x={startX + 230} y="215" width="14" height="10" rx="2" fill="#1565c0" opacity="0.8" />
                  <text x={startX + 248} y="224" fontSize="9" fill="#555">KCl</text>
                  <rect x={startX + 310} y="215" width="14" height="10" rx="2" fill="#81c784" />
                  <text x={startX + 328} y="224" fontSize="9" fill="#555">Récolte inter.</text>
                  <rect x={startX + 430} y="215" width="14" height="10" rx="2" fill="#2E7D32" />
                  <text x={startX + 448} y="224" fontSize="9" fill="#555">Grande récolte</text>
                </g>
              );
            })()}
          </svg>
        </div>

        {/* ── Historique de production ── */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-semibold text-gray-700">Production PAR-A1 — 2018-2025</h2>
            <span className="text-xs text-green-700 font-medium bg-green-50 border border-green-100 px-3 py-1 rounded-xl">
              +8,3% moyenne annuelle depuis 2019
            </span>
          </div>
          <svg viewBox="0 0 700 220" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            {(() => {
              const data = [
                { year: "2018", val: 0.8 },
                { year: "2019", val: 1.6 },
                { year: "2020", val: 2.8 },
                { year: "2021", val: 3.9 },
                { year: "2022", val: 4.2 },
                { year: "2023", val: 4.8 },
                { year: "2024", val: 5.2 },
                { year: "2025", val: 3.7 },
              ];
              const maxVal = 6.5;
              const chartH = 155;
              const startX = 50;
              const totalW = 630;
              const barSlot = totalW / data.length;
              const barW = barSlot - 14;
              const startY = 15;

              return (
                <g>
                  {/* Grid */}
                  {[0, 1, 2, 3, 4, 5, 6].map((v) => {
                    const y = startY + chartH - (v / maxVal) * chartH;
                    return (
                      <g key={v}>
                        <line x1={startX} y1={y} x2={startX + totalW} y2={y} stroke="#f0f0f0" strokeWidth="1" />
                        <text x={startX - 6} y={y + 4} textAnchor="end" fontSize="9" fill="#bbb">{v}t</text>
                      </g>
                    );
                  })}

                  {/* Barres */}
                  {data.map((d, i) => {
                    const x = startX + i * barSlot + 7;
                    const barH = (d.val / maxVal) * chartH;
                    const y = startY + chartH - barH;
                    const isProj = d.year === "2025";
                    return (
                      <g key={d.year}>
                        <rect x={x} y={y} width={barW} height={barH} rx="5"
                          fill={isProj ? "#81c784" : "#2E7D32"} opacity={isProj ? 0.65 : 0.9} />
                        <text x={x + barW / 2} y={y - 4} textAnchor="middle" fontSize="9" fill="#555" fontWeight="600">
                          {d.val}t
                        </text>
                        <text x={x + barW / 2} y={startY + chartH + 14} textAnchor="middle" fontSize="9" fill="#888">
                          {d.year}
                        </text>
                        {isProj && (
                          <text x={x + barW / 2} y={startY + chartH + 26} textAnchor="middle" fontSize="8" fill="#aaa">
                            (proj.)
                          </text>
                        )}
                      </g>
                    );
                  })}

                  {/* Ligne objectif */}
                  {(() => {
                    const y = startY + chartH - (5.5 / maxVal) * chartH;
                    return (
                      <g>
                        <line x1={startX} y1={y} x2={startX + totalW} y2={y}
                          stroke="#e53935" strokeWidth="1.5" strokeDasharray="6,3" />
                        <text x={startX + totalW + 4} y={y + 4} fontSize="9" fill="#e53935" fontWeight="600">Obj. 5,5t</text>
                      </g>
                    );
                  })()}
                </g>
              );
            })()}
          </svg>
        </div>

        {/* ── Suivi phytosanitaire ── */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">Dernières observations (3 mois)</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-[#F8FBF8]">
                  {["Date", "Type", "Détail", "Seuil", "Statut"].map((h) => (
                    <th key={h} className="text-left px-3 py-2.5 text-gray-500 font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  { date: "08/07/2025", type: "Comptage mirides", detail: "3,2 capsides/100 cabosses PAR-A1", seuil: "<5%", statut: "🟡 Proche seuil", c: "text-yellow-600" },
                  { date: "24/06/2025", type: "Observation Phytophthora", detail: "0 cabosse infectée", seuil: "<2%", statut: "✅ Bon", c: "text-green-700" },
                  { date: "15/06/2025", type: "Traitement mirides", detail: "Cypercal 50 EC 6L/ha — 22,8L total", seuil: "—", statut: "✅ Effectué", c: "text-green-700" },
                  { date: "25/05/2025", type: "Traitement Phytophthora", detail: "Super Cupravit 0,5kg/ha dilué", seuil: "—", statut: "✅ Effectué", c: "text-green-700" },
                ].map((r) => (
                  <tr key={r.date} className="hover:bg-gray-50">
                    <td className="px-3 py-2.5 text-gray-500 whitespace-nowrap">{r.date}</td>
                    <td className="px-3 py-2.5 font-medium text-gray-700">{r.type}</td>
                    <td className="px-3 py-2.5 text-gray-600">{r.detail}</td>
                    <td className="px-3 py-2.5 text-gray-400">{r.seuil}</td>
                    <td className={`px-3 py-2.5 font-medium ${r.c}`}>{r.statut}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Analyse sol ── */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">Analyse sol &amp; nutrition</h2>
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-[#F8FBF8]">
                  {["Paramètre", "Résultat 2024", "Optimal", "Statut"].map((h) => (
                    <th key={h} className="text-left px-3 py-2.5 text-gray-500 font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  { p: "pH sol", r: "6,1", o: "6,0-6,5", s: "✅ Bon", c: "text-green-700" },
                  { p: "Teneur K (potassium)", r: "0,18 meq/100g", o: ">0,20", s: "🟡 Faible → KCl 60% planifié", c: "text-yellow-600" },
                  { p: "Teneur N (azote)", r: "2,4%", o: ">2,0%", s: "✅ Bon", c: "text-green-700" },
                  { p: "Teneur P (phosphore)", r: "28 ppm", o: ">25 ppm", s: "✅ Bon", c: "text-green-700" },
                  { p: "Matière organique", r: "3,8%", o: ">3,5%", s: "✅ Bon (Gliricidia)", c: "text-green-700" },
                ].map((r) => (
                  <tr key={r.p} className="hover:bg-gray-50">
                    <td className="px-3 py-2.5 font-medium text-gray-700">{r.p}</td>
                    <td className="px-3 py-2.5 text-gray-600">{r.r}</td>
                    <td className="px-3 py-2.5 text-gray-400">{r.o}</td>
                    <td className={`px-3 py-2.5 font-medium ${r.c}`}>{r.s}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-orange-50 border border-orange-200 rounded-xl px-4 py-3 text-xs text-orange-700">
            <span className="font-semibold">Déficit potassium détecté</span> → Fertilisation KCl 60% planifiée août 2025 (2 sacs/ha × 3,8 ha = 7,6 sacs)
          </div>
        </div>

        {/* ── Actions ── */}
        <div className="flex flex-wrap gap-3 pb-2">
          <a href="/cultures"
            className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 rounded-xl text-xs font-medium px-4 py-2.5 hover:bg-gray-200 transition-colors">
            ← Retour aux cultures
          </a>
          <button className="inline-flex items-center gap-2 bg-[#2E7D32] text-white rounded-xl text-xs font-medium px-4 py-2.5 hover:bg-[#1B5E20] transition-colors">
            Planifier une intervention
          </button>
          <a href="/rapports-terrain"
            className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 rounded-xl text-xs font-medium px-4 py-2.5 hover:bg-gray-200 transition-colors">
            Rapport terrain →
          </a>
        </div>
      </div>
    </div>
  );
}
