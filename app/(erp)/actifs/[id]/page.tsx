import Topbar from "../../../components/Topbar";

export default async function ActifDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Données plan d'amortissement
  const amortData = [
    { exercice: "2021 (10 mois)", dotation: "622 222 XOF", cumul: "622 222 XOF", vnc: "21 777 778 XOF", current: false },
    { exercice: "2022", dotation: "746 667 XOF", cumul: "1 368 889 XOF", vnc: "21 031 111 XOF", current: false },
    { exercice: "2023", dotation: "746 667 XOF", cumul: "2 115 556 XOF", vnc: "20 284 444 XOF", current: false },
    { exercice: "2024", dotation: "746 667 XOF", cumul: "2 862 223 XOF", vnc: "19 537 777 XOF", current: false },
    { exercice: "2025", dotation: "746 667 XOF", cumul: "3 608 890 XOF", vnc: "18 791 110 XOF", current: true },
    { exercice: "2030 (projection)", dotation: "746 667 XOF", cumul: "7 466 667 XOF", vnc: "14 933 333 XOF", current: false },
    { exercice: "2051 (fin)", dotation: "—", cumul: "22 400 000 XOF", vnc: "0 XOF", current: false },
  ];

  // SVG line chart VNC décroissant 2021→2051
  // Points clés : 2021=22400000, 2025=18791110, 2030=14933333, 2051=0
  const svgW = 640;
  const svgH = 200;
  const padL = 75;
  const padR = 30;
  const padT = 24;
  const padB = 36;
  const chartW = svgW - padL - padR;
  const chartH = svgH - padT - padB;
  const maxVal = 22400000;

  // Années de 2021 à 2051 (31 points)
  const totalYears = 30; // 2021 à 2051
  const keyPoints: { year: number; vnc: number }[] = [];
  for (let y = 0; y <= totalYears; y++) {
    const yr = 2021 + y;
    // Amortissement linéaire : 22400000 / 30 = 746 667 par an, sauf 2021 = 10 mois
    let vnc: number;
    if (y === 0) vnc = 22400000;
    else if (y === 1) vnc = 22400000 - 622222; // 10 mois en 2021
    else vnc = Math.max(0, 22400000 - 622222 - (y - 1) * 746667);
    keyPoints.push({ year: yr, vnc });
  }

  const toX = (year: number) => padL + ((year - 2021) / totalYears) * chartW;
  const toY = (vnc: number) => padT + chartH - (vnc / maxVal) * chartH;

  const polylinePoints = keyPoints.map((p) => `${toX(p.year)},${toY(p.vnc)}`).join(" ");
  const areaPath = `M${toX(2021)},${toY(22400000)} ` +
    keyPoints.slice(1).map((p) => `L${toX(p.year)},${toY(p.vnc)}`).join(" ") +
    ` L${toX(2051)},${padT + chartH} L${toX(2021)},${padT + chartH} Z`;

  // Marqueur "Aujourd'hui" 2025
  const nowX = toX(2025);
  const nowY = toY(18791110);
  // Marqueur "Fin de vie" 2051
  const endX = toX(2051);
  const endY = toY(0);

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-gray-50">
      <Topbar breadcrumb={["Finance", "Actifs", `Immobilisation ${id}`]} />

      <div className="p-6 space-y-6">

        {/* En-tête bandeau vert */}
        <div className="rounded-2xl bg-[#1B5E20] text-white p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-1">
              <h1 className="text-xl font-bold">Fiche Immobilisation — IMM-2021-012</h1>
              <p className="text-sm text-white/80">Entrepôt de stockage ENT-001</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-1 text-sm text-white/90 mt-3">
                <div><span className="text-white/60">Immobilisation :</span> IMM-2021-012 — Entrepôt de stockage cacao</div>
                <div><span className="text-white/60">Désignation :</span> ENT-001 — 480 m² béton armé + toiture zinc</div>
                <div><span className="text-white/60">Localisation :</span> EXP-001, Zone logistique (Lot C)</div>
                <div><span className="text-white/60">Date mise en service :</span> 01/02/2021 | Durée de vie : 30 ans</div>
                <div><span className="text-white/60">Fournisseur :</span> Construction Nawa SARL</div>
                <div><span className="text-white/60">Coût d'acquisition :</span> 22 400 000 XOF</div>
                <div><span className="text-white/60">Amortissement :</span> Linéaire — Compte SYSCOHADA 2313</div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <span className="inline-flex items-center gap-1 bg-green-500/30 border border-green-400/40 text-white text-xs font-medium rounded-full px-3 py-1">
                ✅ En service
              </span>
            </div>
          </div>
        </div>

        {/* 4 KPI */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Valeur brute", value: "22 400 000 XOF", sub: "Coût d'entrée SYSCOHADA 2313" },
            { label: "Amortissements cumulés (4 ans)", value: "2 986 667 XOF", sub: "2021–2024" },
            { label: "Valeur nette comptable", value: "19 413 333 XOF", sub: "Au 31/12/2024" },
            { label: "Valeur vénale estimée 2025", value: "~24 000 000 XOF", sub: "+7% terrain/construction" },
          ].map((kpi) => (
            <div key={kpi.label} className="rounded-2xl border border-gray-100 bg-white p-5">
              <p className="text-xs text-gray-500 mb-1">{kpi.label}</p>
              <p className="text-base font-bold text-[#1B5E20]">{kpi.value}</p>
              {kpi.sub && <p className="text-xs text-gray-400 mt-1">{kpi.sub}</p>}
            </div>
          ))}
        </div>

        {/* Plan d'amortissement */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6">
          <h2 className="text-base font-semibold text-gray-800 mb-1">Plan d'amortissement SYSCOHADA</h2>
          <div className="flex flex-wrap gap-4 text-xs text-gray-500 mb-5">
            <span>Compte SYSCOHADA : <strong className="text-gray-700">2313 — Construction sur sol d'autrui</strong></span>
            <span>Taux linéaire : <strong className="text-gray-700">100%/30 ans = 3,333%/an</strong></span>
            <span>Dotation annuelle : <strong className="text-gray-700">746 667 XOF/an</strong></span>
          </div>

          {/* SVG Line Chart */}
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
                    <text x={padL - 5} y={y + 4} textAnchor="end" fontSize={9} fill="#9ca3af">
                      {(val / 1000000).toFixed(0)}M
                    </text>
                  </g>
                );
              })}
              {/* Axes */}
              <line x1={padL} y1={padT} x2={padL} y2={padT + chartH} stroke="#d1d5db" strokeWidth={1} />
              <line x1={padL} y1={padT + chartH} x2={svgW - padR} y2={padT + chartH} stroke="#d1d5db" strokeWidth={1} />
              {/* X labels */}
              {[2021, 2025, 2030, 2035, 2040, 2045, 2051].map((yr) => (
                <text key={yr} x={toX(yr)} y={svgH - 4} textAnchor="middle" fontSize={9} fill="#9ca3af">
                  {yr}
                </text>
              ))}
              {/* Polyline */}
              <polyline points={polylinePoints} fill="none" stroke="#2E7D32" strokeWidth={2.5} strokeLinejoin="round" />
              {/* Marqueur Aujourd'hui */}
              <circle cx={nowX} cy={nowY} r={5} fill="#2E7D32" />
              <line x1={nowX} y1={nowY} x2={nowX} y2={padT + chartH} stroke="#2E7D32" strokeWidth={1} strokeDasharray="3 2" />
              <rect x={nowX - 72} y={nowY - 34} width={144} height={26} rx={4} fill="#1B5E20" />
              <text x={nowX} y={nowY - 24} textAnchor="middle" fontSize={9} fill="white" fontWeight="bold">
                Aujourd'hui — VNC 18 791 110 XOF
              </text>
              <text x={nowX} y={nowY - 13} textAnchor="middle" fontSize={8} fill="#A5D6A7">
                2025
              </text>
              {/* Marqueur Fin de vie */}
              <circle cx={endX} cy={endY} r={4} fill="#E65100" />
              <rect x={endX - 44} y={endY - 28} width={88} height={22} rx={4} fill="#E65100" />
              <text x={endX} y={endY - 14} textAnchor="middle" fontSize={9} fill="white" fontWeight="bold">
                Fin de vie 2051
              </text>
            </svg>
          </div>

          {/* Tableau */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#F8FBF8]">
                  <th className="text-left px-4 py-3 text-gray-600 font-medium rounded-tl-xl">Exercice</th>
                  <th className="text-right px-4 py-3 text-gray-600 font-medium">Dotation (D)</th>
                  <th className="text-right px-4 py-3 text-gray-600 font-medium">Amort. cumulés</th>
                  <th className="text-right px-4 py-3 text-gray-600 font-medium rounded-tr-xl">VNC fin d'exercice</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {amortData.map((row) => (
                  <tr key={row.exercice} className={row.current ? "bg-green-50 font-semibold" : "hover:bg-gray-50/60"}>
                    <td className="px-4 py-3 text-gray-800">
                      {row.exercice}
                      {row.current && <span className="ml-2 text-[#2E7D32] text-xs font-normal">← exercice en cours</span>}
                    </td>
                    <td className="px-4 py-3 text-right text-gray-700">{row.dotation}</td>
                    <td className="px-4 py-3 text-right text-gray-700">{row.cumul}</td>
                    <td className={`px-4 py-3 text-right font-medium ${row.vnc === "0 XOF" ? "text-orange-600" : "text-gray-800"}`}>
                      {row.vnc}
                      {row.vnc === "0 XOF" && " ✅"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* État et maintenance */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6">
          <h2 className="text-base font-semibold text-gray-800 mb-4">État et maintenance</h2>
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#F8FBF8]">
                  <th className="text-left px-4 py-3 text-gray-600 font-medium rounded-tl-xl">Inspection</th>
                  <th className="text-left px-4 py-3 text-gray-600 font-medium">Date</th>
                  <th className="text-left px-4 py-3 text-gray-600 font-medium">Résultat</th>
                  <th className="text-left px-4 py-3 text-gray-600 font-medium rounded-tr-xl">Intervenant</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  ["Inspection annuelle structure", "15/01/2025", "✅ Bon état — pas de fissure", "Construction Nawa SARL"],
                  ["Vérification toiture zinc", "15/01/2025", "✅ Étanche — 1 tôle remplacée", "Maçon local (42 000 XOF)"],
                  ["Contrôle installation électrique", "20/03/2025", "✅ Conforme CI (ANASUR)", "Électricien agréé SOPIE"],
                ].map((row) => (
                  <tr key={row[0]} className="hover:bg-gray-50/60">
                    {row.map((cell, i) => (
                      <td key={i} className="px-4 py-3 text-gray-700">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-wrap gap-4 text-xs text-gray-600">
            <span>Charges de maintenance 2025 YTD : <strong className="text-gray-800">42 000 XOF</strong> (tôle) + <strong className="text-gray-800">18 000 XOF</strong> (divers) = <strong className="text-[#1B5E20]">60 000 XOF</strong></span>
            <span>Budget maintenance annuel : <strong className="text-gray-800">200 000 XOF</strong> (0,89% valeur brute — conforme norme ✅)</span>
          </div>
        </div>

        {/* Assurance */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6">
          <h2 className="text-base font-semibold text-gray-800 mb-4">Assurance</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#F8FBF8]">
                  <th className="text-left px-4 py-3 text-gray-600 font-medium rounded-tl-xl">Aspect</th>
                  <th className="text-left px-4 py-3 text-gray-600 font-medium rounded-tr-xl">Détail</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  ["Assureur", "NSIA Assurances CI — Police multirisque professionnelle"],
                  ["N° police", "NSIA-MPR-CI-2025-EXP001"],
                  ["Valeur assurée", "24 000 000 XOF (valeur de reconstruction 2025)"],
                  ["Prime annuelle", "96 000 XOF/an (0,40% valeur assurée)"],
                  ["Validité", "01/01/2025 – 31/12/2025 ✅"],
                ].map((row) => (
                  <tr key={row[0]} className="hover:bg-gray-50/60">
                    <td className="px-4 py-3 text-gray-500 font-medium w-48">{row[0]}</td>
                    <td className="px-4 py-3 text-gray-800">{row[1]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3 pb-4">
          <a
            href="/actifs"
            className="bg-gray-100 text-gray-700 rounded-xl text-xs font-medium px-4 py-2.5 hover:bg-gray-200 transition-colors"
          >
            ← Retour aux actifs
          </a>
          <button className="bg-[#2E7D32] text-white rounded-xl text-xs font-medium px-4 py-2.5 hover:bg-[#1B5E20] transition-colors">
            Modifier
          </button>
          <button className="border border-[#2E7D32] text-[#2E7D32] rounded-xl text-xs font-medium px-4 py-2.5 hover:bg-[#F8FBF8] transition-colors">
            Voir l'assurance
          </button>
        </div>

      </div>
    </div>
  );
}
