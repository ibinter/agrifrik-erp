import Topbar from "../../../components/Topbar";

export default async function PrevisionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const hypotheses = [
    {
      hypothese: "Prix cacao H2 (BCC Abidjan)",
      valeur: "1 087 XOF/kg (stable)",
      source: "Cours actuel BCC",
      probabilite: "65%",
    },
    {
      hypothese: "Production PAR-A1+A2 (grande récolte)",
      valeur: "4,9t (oct-nov)",
      source: "Floraison mesurée PAR-A2 +23%",
      probabilite: "78%",
    },
    {
      hypothese: "Cours anacarde PAR-C1",
      valeur: "1 525 XOF/kg",
      source: "Cargill CTR-2025-002",
      probabilite: "100% (contractuel)",
    },
    {
      hypothese: "Inflation intrants (phyto, engrais)",
      valeur: "+5%",
      source: "CNRA CI / tendance marché",
      probabilite: "70%",
    },
    {
      hypothese: "Cours gasoil",
      valeur: "735 XOF/L",
      source: "Tendance CI (stable)",
      probabilite: "60%",
    },
    {
      hypothese: "Pluies oct-nov (grande récolte)",
      valeur: "Normales (≥90mm/mois)",
      source: "Météo SODEXAM",
      probabilite: "72%",
    },
  ];

  const risques = [
    {
      risque: "Chute cours cacao >-15%",
      probabilite: "10%",
      impact: "-3,8M XOF sur CA",
      mitigation: "Contrat BC à prix fixe 1 087 XOF jusqu'au 31/12",
    },
    {
      risque: "Sécheresse octobre",
      probabilite: "8%",
      impact: "-30% production grande récolte",
      mitigation: "Irrigation PAR-C1 (installation prévue juil)",
    },
    {
      risque: "Pic mirides grande récolte",
      probabilite: "25%",
      impact: "-5-10% perte production",
      mitigation: "Traitements préventifs planifiés (cycle 21j)",
    },
    {
      risque: "Hausse carburant",
      probabilite: "20%",
      impact: "+180 000 XOF charges",
      mitigation: "Impact limité — TCO tracteur budgété",
    },
  ];

  // Production data
  const mois = ["Août", "Sept", "Oct", "Nov", "Déc"];
  const production = [1.4, 1.8, 2.8, 2.4, 1.1];
  const objectif = [1.6, 2.0, 2.6, 2.6, 1.4];

  // Area chart dimensions
  const W = 640;
  const H = 220;
  const pad = { top: 30, right: 20, bottom: 40, left: 50 };
  const chartW = W - pad.left - pad.right;
  const chartH = H - pad.top - pad.bottom;
  const maxProd = 3.2;

  const xStep = chartW / (mois.length - 1);
  const yScale = (v: number) => chartH - (v / maxProd) * chartH;

  const prodPoints = production.map((v, i) => ({
    x: pad.left + i * xStep,
    y: pad.top + yScale(v),
  }));
  const objPoints = objectif.map((v, i) => ({
    x: pad.left + i * xStep,
    y: pad.top + yScale(v),
  }));

  const areaPath =
    `M ${prodPoints[0].x} ${prodPoints[0].y}` +
    prodPoints
      .slice(1)
      .map((p) => ` L ${p.x} ${p.y}`)
      .join("") +
    ` L ${prodPoints[prodPoints.length - 1].x} ${pad.top + chartH}` +
    ` L ${prodPoints[0].x} ${pad.top + chartH} Z`;

  const linePath =
    `M ${prodPoints[0].x} ${prodPoints[0].y}` +
    prodPoints
      .slice(1)
      .map((p) => ` L ${p.x} ${p.y}`)
      .join("");

  const objPathD =
    `M ${objPoints[0].x} ${objPoints[0].y}` +
    objPoints
      .slice(1)
      .map((p) => ` L ${p.x} ${p.y}`)
      .join("");

  const yGridLines = [0, 1, 2, 3];

  // Trésorerie chart
  const TW = 640;
  const TH = 200;
  const tPad = { top: 30, right: 20, bottom: 40, left: 60 };
  const tChartW = TW - tPad.left - tPad.right;
  const tChartH = TH - tPad.top - tPad.bottom;

  const tresoMois = ["Déb. H2", "Août", "Sept", "Oct", "Nov", "Déc"];
  const tresoVal = [43.3, 44.8, 46.2, 49.8, 51.2, 52.3];
  const tMax = 58;
  const tMin = 38;
  const tRange = tMax - tMin;
  const seuilSecurite = 15;

  const tXStep = tChartW / (tresoMois.length - 1);
  const tYScale = (v: number) => tChartH - ((v - tMin) / tRange) * tChartH;

  const tresoPoints = tresoVal.map((v, i) => ({
    x: tPad.left + i * tXStep,
    y: tPad.top + tYScale(v),
  }));

  const tresoLine =
    `M ${tresoPoints[0].x} ${tresoPoints[0].y}` +
    tresoPoints
      .slice(1)
      .map((p) => ` L ${p.x} ${p.y}`)
      .join("");

  const tresoArea =
    tresoLine +
    ` L ${tresoPoints[tresoPoints.length - 1].x} ${tPad.top + tChartH}` +
    ` L ${tresoPoints[0].x} ${tPad.top + tChartH} Z`;

  // Seuil sécurité Y (15M est hors de la plage min=38, donc on le montre symboliquement en bas)
  const seuilY = tPad.top + tChartH; // symbolique car 15M < tMin

  const tGridLines = [40, 45, 50, 55];

  // P&L table data
  const plData = [
    {
      poste: "CA cacao",
      aout: "1,52M",
      sept: "1,96M",
      oct: "3,04M",
      nov: "2,61M",
      dec: "1,20M",
      total: "10,33M",
      isTotal: false,
      isNeg: false,
    },
    {
      poste: "CA anacarde",
      aout: "—",
      sept: "—",
      oct: "1,22M",
      nov: "—",
      dec: "—",
      total: "1,22M",
      isTotal: false,
      isNeg: false,
    },
    {
      poste: "CA poisson",
      aout: "0,17M",
      sept: "0,17M",
      oct: "0,17M",
      nov: "0,17M",
      dec: "0,17M",
      total: "0,87M",
      isTotal: false,
      isNeg: false,
    },
    {
      poste: "CA Total",
      aout: "1,69M",
      sept: "2,13M",
      oct: "4,43M",
      nov: "2,78M",
      dec: "1,37M",
      total: "12,42M",
      isTotal: true,
      isNeg: false,
    },
    {
      poste: "Intrants",
      aout: "-0,42M",
      sept: "-0,38M",
      oct: "-0,48M",
      nov: "-0,42M",
      dec: "-0,28M",
      total: "-1,98M",
      isTotal: false,
      isNeg: true,
    },
    {
      poste: "Main d'œuvre",
      aout: "-0,80M",
      sept: "-0,80M",
      oct: "-1,20M",
      nov: "-1,20M",
      dec: "-0,80M",
      total: "-4,80M",
      isTotal: false,
      isNeg: true,
    },
    {
      poste: "Charges fixes",
      aout: "-0,30M",
      sept: "-0,30M",
      oct: "-0,30M",
      nov: "-0,30M",
      dec: "-0,30M",
      total: "-1,50M",
      isTotal: false,
      isNeg: true,
    },
    {
      poste: "Résultat net",
      aout: "0,17M",
      sept: "0,65M",
      oct: "2,45M",
      nov: "0,86M",
      dec: "-0,01M",
      total: "4,14M",
      isTotal: true,
      isNeg: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Topbar
        breadcrumb={["Finance", "Prévisions", `Scénario ${id}`]}
      />

      <div className="max-w-6xl mx-auto px-6 py-6 space-y-6">
        {/* En-tête bandeau */}
        <div className="rounded-2xl overflow-hidden" style={{ background: "#1B5E20" }}>
          <div className="p-4 sm:p-6">
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div>
                <p className="text-green-200 text-xs font-medium uppercase tracking-wider mb-1">
                  Prévision financière
                </p>
                <h1 className="text-white text-2xl font-bold">
                  PREV-2025-H2 — Prévisions financières H2 2025
                </h1>
                <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-sm text-green-100">
                  <span>Période : 01/08/2025 – 31/12/2025</span>
                  <span>Créée par : ARIA (IA AGRIFRIK) | Validée par : Koffi Amani</span>
                  <span>Mis à jour : 11/07/2025</span>
                  <span>Indice de confiance : 87%</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500 text-white">
                  🔵 En cours
                </span>
                <span className="text-green-200 text-xs">Actualisation mensuelle automatique</span>
              </div>
            </div>
          </div>
        </div>

        {/* 5 KPI cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { label: "CA prévisionnel H2", value: "25,3M XOF", icon: "📈" },
            { label: "Production cacao prévue", value: "8,2t", icon: "🌱" },
            { label: "Résultat net H2 estimé", value: "17,0M XOF", icon: "💰" },
            { label: "Trésorerie fin 2025", value: "52,3M XOF", icon: "🏦" },
            { label: "Indice confiance ARIA", value: "87% ✅", icon: "🤖" },
          ].map((kpi) => (
            <div
              key={kpi.label}
              className="rounded-2xl border border-gray-100 bg-white p-5 flex flex-col gap-1"
            >
              <span className="text-2xl">{kpi.icon}</span>
              <p className="text-xs text-gray-500 mt-1">{kpi.label}</p>
              <p className="text-lg font-bold text-gray-800">{kpi.value}</p>
            </div>
          ))}
        </div>

        {/* Hypothèses */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-semibold text-gray-800 mb-4">Hypothèses de prévision</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-[#F8FBF8]">
                  <th className="text-left py-2 px-3 font-semibold text-gray-600">Hypothèse</th>
                  <th className="text-left py-2 px-3 font-semibold text-gray-600">Valeur retenue</th>
                  <th className="text-left py-2 px-3 font-semibold text-gray-600">Source</th>
                  <th className="text-right py-2 px-3 font-semibold text-gray-600">Probabilité</th>
                </tr>
              </thead>
              <tbody>
                {hypotheses.map((h, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="py-2 px-3 text-gray-700 font-medium">{h.hypothese}</td>
                    <td className="py-2 px-3 text-gray-700">{h.valeur}</td>
                    <td className="py-2 px-3 text-gray-500">{h.source}</td>
                    <td className="py-2 px-3 text-right">
                      <span className="font-semibold text-[#2E7D32]">{h.probabilite}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Production chart */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-semibold text-gray-800 mb-4">
            Production mensuelle prévisionnelle H2 2025
          </h2>
          <div className="overflow-x-auto">
            <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} className="block">
              {/* Grid lines */}
              {yGridLines.map((v) => {
                const y = pad.top + yScale(v);
                return (
                  <g key={v}>
                    <line
                      x1={pad.left}
                      y1={y}
                      x2={pad.left + chartW}
                      y2={y}
                      stroke="#E5E7EB"
                      strokeWidth="1"
                    />
                    <text
                      x={pad.left - 8}
                      y={y + 4}
                      fontSize="10"
                      fill="#9CA3AF"
                      textAnchor="end"
                    >
                      {v}t
                    </text>
                  </g>
                );
              })}

              {/* Area fill */}
              <path d={areaPath} fill="#4CAF50" fillOpacity="0.15" />

              {/* Objectif dashed line */}
              <path
                d={objPathD}
                fill="none"
                stroke="#E65100"
                strokeWidth="1.5"
                strokeDasharray="5,4"
              />

              {/* Production line */}
              <path d={linePath} fill="none" stroke="#2E7D32" strokeWidth="2.5" />

              {/* Data points */}
              {prodPoints.map((p, i) => (
                <g key={i}>
                  <circle cx={p.x} cy={p.y} r="5" fill="#2E7D32" stroke="white" strokeWidth="2" />
                  <text
                    x={p.x}
                    y={p.y - 10}
                    fontSize="10"
                    fill="#1B5E20"
                    textAnchor="middle"
                    fontWeight="600"
                  >
                    {production[i]}t
                  </text>
                  <text
                    x={p.x}
                    y={pad.top + chartH + 18}
                    fontSize="11"
                    fill="#6B7280"
                    textAnchor="middle"
                  >
                    {mois[i]}
                  </text>
                </g>
              ))}

              {/* Legend */}
              <g transform={`translate(${pad.left}, ${H - 10})`}>
                <rect x={0} y={0} width={12} height={3} fill="#2E7D32" rx="1" />
                <text x={16} y={4} fontSize="10" fill="#6B7280">
                  Production prévisionnelle
                </text>
                <line
                  x1={160}
                  y1={2}
                  x2={172}
                  y2={2}
                  stroke="#E65100"
                  strokeWidth="1.5"
                  strokeDasharray="4,3"
                />
                <text x={176} y={4} fontSize="10" fill="#6B7280">
                  Objectif
                </text>
              </g>
            </svg>
          </div>
        </div>

        {/* Compte de résultat */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-semibold text-gray-800 mb-4">
            Compte de résultat prévisionnel H2
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-[#F8FBF8]">
                  <th className="text-left py-2 px-3 font-semibold text-gray-600">Poste</th>
                  <th className="text-right py-2 px-3 font-semibold text-gray-600">Août</th>
                  <th className="text-right py-2 px-3 font-semibold text-gray-600">Sept</th>
                  <th className="text-right py-2 px-3 font-semibold text-gray-600">Oct</th>
                  <th className="text-right py-2 px-3 font-semibold text-gray-600">Nov</th>
                  <th className="text-right py-2 px-3 font-semibold text-gray-600">Déc</th>
                  <th className="text-right py-2 px-3 font-semibold text-gray-600">TOTAL H2</th>
                </tr>
              </thead>
              <tbody>
                {plData.map((row, i) => (
                  <tr
                    key={i}
                    className={
                      row.isTotal
                        ? "bg-[#F0F7F0] font-bold"
                        : i % 2 === 0
                        ? "bg-white"
                        : "bg-gray-50"
                    }
                  >
                    <td
                      className={`py-2 px-3 ${
                        row.isTotal ? "text-[#1B5E20] font-bold" : "text-gray-700"
                      }`}
                    >
                      {row.poste}
                    </td>
                    {[row.aout, row.sept, row.oct, row.nov, row.dec, row.total].map((v, j) => (
                      <td
                        key={j}
                        className={`py-2 px-3 text-right ${
                          row.isTotal
                            ? "text-[#1B5E20] font-bold"
                            : row.isNeg
                            ? "text-red-600"
                            : v.startsWith("-")
                            ? "text-red-600"
                            : "text-gray-700"
                        }`}
                      >
                        {v}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-gray-400 italic">
            Note : Décembre légèrement déficitaire sur ce mois (pic dépenses récolte intermédiaire)
            mais positif sur l&apos;ensemble H2.
          </p>
        </div>

        {/* Trésorerie chart */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-semibold text-gray-800 mb-4">
            Trésorerie prévisionnelle (solde cumulé)
          </h2>
          <div className="overflow-x-auto">
            <svg width={TW} height={TH} viewBox={`0 0 ${TW} ${TH}`} className="block">
              {/* Grid */}
              {tGridLines.map((v) => {
                const y = tPad.top + tYScale(v);
                return (
                  <g key={v}>
                    <line
                      x1={tPad.left}
                      y1={y}
                      x2={tPad.left + tChartW}
                      y2={y}
                      stroke="#E5E7EB"
                      strokeWidth="1"
                    />
                    <text
                      x={tPad.left - 8}
                      y={y + 4}
                      fontSize="10"
                      fill="#9CA3AF"
                      textAnchor="end"
                    >
                      {v}M
                    </text>
                  </g>
                );
              })}

              {/* Seuil sécurité label (symbolique en bas de chart) */}
              <line
                x1={tPad.left}
                y1={tPad.top + tChartH}
                x2={tPad.left + tChartW}
                y2={tPad.top + tChartH}
                stroke="#EF4444"
                strokeWidth="1.5"
                strokeDasharray="6,4"
              />
              <text
                x={tPad.left + 4}
                y={tPad.top + tChartH - 4}
                fontSize="9"
                fill="#EF4444"
              >
                Seuil sécurité {seuilSecurite}M XOF
              </text>

              {/* Area fill */}
              <path d={tresoArea} fill="#4CAF50" fillOpacity="0.12" />

              {/* Line */}
              <path d={tresoLine} fill="none" stroke="#2E7D32" strokeWidth="2.5" />

              {/* Points */}
              {tresoPoints.map((p, i) => (
                <g key={i}>
                  <circle cx={p.x} cy={p.y} r="5" fill="#2E7D32" stroke="white" strokeWidth="2" />
                  <text
                    x={p.x}
                    y={p.y - 10}
                    fontSize="10"
                    fill="#1B5E20"
                    textAnchor="middle"
                    fontWeight="600"
                  >
                    {tresoVal[i]}M
                  </text>
                  <text
                    x={p.x}
                    y={tPad.top + tChartH + 16}
                    fontSize="10"
                    fill="#6B7280"
                    textAnchor="middle"
                  >
                    {tresoMois[i]}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </div>

        {/* Risques */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-semibold text-gray-800 mb-4">Risques identifiés</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-[#F8FBF8]">
                  <th className="text-left py-2 px-3 font-semibold text-gray-600">Risque</th>
                  <th className="text-right py-2 px-3 font-semibold text-gray-600">Probabilité</th>
                  <th className="text-right py-2 px-3 font-semibold text-gray-600">Impact</th>
                  <th className="text-left py-2 px-3 font-semibold text-gray-600">Mitigation</th>
                </tr>
              </thead>
              <tbody>
                {risques.map((r, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="py-2 px-3 text-gray-700 font-medium">{r.risque}</td>
                    <td className="py-2 px-3 text-right text-orange-600 font-semibold">
                      {r.probabilite}
                    </td>
                    <td className="py-2 px-3 text-right text-red-600">{r.impact}</td>
                    <td className="py-2 px-3 text-gray-500">{r.mitigation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3 pb-6">
          <a
            href="/previsions"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-gray-200 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            ← Retour aux prévisions
          </a>
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#2E7D32] text-white text-xs font-medium hover:bg-[#1B5E20] transition-colors">
            Actualiser avec cours actuel
          </button>
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-gray-200 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            Exporter Excel
          </button>
        </div>
      </div>
    </div>
  );
}
