import Topbar from "../../../components/Topbar";

export default async function StockDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const breadcrumb = ["Logistique", "Stocks", `Article ${id}`];

  const movements = [
    {
      date: "30/06",
      lot: "LOT-2025-046",
      type: "Entrée production",
      sign: "+",
      qty: "2 490",
      cmup: "1 100",
      value: "+2 739 000",
      contrepartie: "PAR-A1",
      ref: "—",
    },
    {
      date: "08/07",
      lot: "LOT-2025-045",
      type: "Sortie vente",
      sign: "-",
      qty: "24 900",
      cmup: "1 100",
      value: "-27 390 000",
      contrepartie: "Cargill Rotterdam",
      ref: "FAC-048",
    },
    {
      date: "25/06",
      lot: "LOT-2025-046",
      type: "Entrée production",
      sign: "+",
      qty: "3 020",
      cmup: "1 100",
      value: "+3 322 000",
      contrepartie: "PAR-A3/B1/B2",
      ref: "—",
    },
    {
      date: "22/06",
      lot: "LOT-2025-047",
      type: "Entrée production",
      sign: "+",
      qty: "1 810",
      cmup: "1 040",
      value: "+1 882 400",
      contrepartie: "PAR-A3 (grade A)",
      ref: "—",
    },
    {
      date: "15/06",
      lot: "—",
      type: "Sortie échantillons",
      sign: "-",
      qty: "12",
      cmup: "1 100",
      value: "-13 200",
      contrepartie: "Cargill (échantillons)",
      ref: "ECH-2025-018",
    },
    {
      date: "30/05",
      lot: "LOT-2025-043",
      type: "Sortie vente",
      sign: "-",
      qty: "18 000",
      cmup: "1 100",
      value: "-19 800 000",
      contrepartie: "Barry Callebaut",
      ref: "FAC-043",
    },
  ];

  const lots = [
    {
      num: "LOT-2025-048",
      recolte: "28/06/2025",
      poids: "2 680 kg",
      humidite: "7,2%",
      grade: "AA",
      lieu: "Entrepôt A — Zone 1 P1",
      certif: "RA",
      exp: "Jun 2026",
    },
    {
      num: "LOT-2025-047",
      recolte: "25/06/2025",
      poids: "1 810 kg",
      humidite: "8,1%",
      grade: "A",
      lieu: "Entrepôt A — Zone 2 P3",
      certif: "RA",
      exp: "Jun 2026",
    },
    {
      num: "LOT-2025-046",
      recolte: "22/06/2025",
      poids: "2 490 kg",
      humidite: "7,4%",
      grade: "AA",
      lieu: "Entrepôt A — Zone 1 P2",
      certif: "RA",
      exp: "Jun 2026",
    },
    {
      num: "LOT-2025-046 (partiel)",
      recolte: "22/06/2025",
      poids: "11 440 kg",
      humidite: "7,8%",
      grade: "AA",
      lieu: "Entrepôt A — Zone 1 P3",
      certif: "RA",
      exp: "Jun 2026",
    },
  ];

  const cmupData = [
    { mois: "Jan", val: 1082 },
    { mois: "Fév", val: 1090 },
    { mois: "Mar", val: 1095 },
    { mois: "Avr", val: 1098 },
    { mois: "Mai", val: 1100 },
    { mois: "Jun", val: 1100 },
  ];

  const cmupMin = 1070;
  const cmupMax = 1110;
  const cmupRange = cmupMax - cmupMin;
  const barMaxWidth = 280;

  return (
    <div className="flex-1 bg-[#F8FBF8] min-h-screen">
      <Topbar breadcrumb={breadcrumb} />

      <div className="p-6 space-y-6">
        {/* En-tête */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-1">
              <p className="text-xs text-gray-400 font-mono">STK-CAC-AA-001</p>
              <h1 className="text-xl font-bold text-gray-800">
                Cacao naturel fermenté séché Grade AA
              </h1>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-green-50 border border-green-200 px-3 py-1 text-xs font-medium text-green-700">
                  ✅ En stock
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 border border-amber-200 px-3 py-1 text-xs font-medium text-amber-700">
                  Production — Cacao
                </span>
              </div>
            </div>
            <div className="flex gap-2 shrink-0">
              <button className="bg-[#2E7D32] text-white rounded-xl text-xs font-medium px-4 py-2 hover:bg-[#1B5E20] transition-colors">
                Nouveau mouvement
              </button>
              <button className="border border-gray-200 rounded-xl text-xs font-medium px-4 py-2 text-gray-600 hover:bg-gray-50 transition-colors">
                Exporter
              </button>
            </div>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
          {[
            { label: "Stock actuel", val: "18 420 kg", color: "text-[#2E7D32]" },
            { label: "Valeur stock", val: "20 262 000 XOF", color: "text-blue-700" },
            { label: "CMUP", val: "1 100 XOF/kg", color: "text-gray-800" },
            { label: "Entrées YTD", val: "94 200 kg", color: "text-emerald-600" },
            { label: "Sorties YTD", val: "75 780 kg", color: "text-orange-600" },
          ].map((k) => (
            <div
              key={k.label}
              className="rounded-2xl border border-gray-100 bg-white p-5 flex flex-col gap-1"
            >
              <p className="text-xs text-gray-400">{k.label}</p>
              <p className={`text-base font-bold ${k.color} leading-tight`}>{k.val}</p>
            </div>
          ))}
        </div>

        {/* Informations produit */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">
            Informations produit
          </h2>
          <div className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { label: "Code douanier", val: "1801.00.00 — Cacao en fèves, brut" },
              { label: "Unité de mesure", val: "kg" },
              { label: "Conditionnement", val: "Sacs jute 60 kg" },
              { label: "Poids brut emballage", val: "0,8 kg/sac" },
              { label: "Localisation", val: "Entrepôt A — Zone 1" },
              { label: "Température", val: "18-24°C" },
              { label: "Humidité", val: "60-70%" },
              { label: "Stockage max", val: "12 mois (norme ICCO)" },
              { label: "CMUP actuel", val: "1 100 XOF/kg" },
              { label: "Valeur stock total", val: "20 262 000 XOF" },
            ].map((r) => (
              <div key={r.label} className="flex flex-col gap-0.5">
                <span className="text-xs text-gray-400">{r.label}</span>
                <span className="text-sm font-medium text-gray-800">{r.val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Mouvements de stock */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">
            Mouvements de stock — 10 dernières opérations
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-[#F8FBF8]">
                  {["Date", "N° Lot", "Type", "Qté (kg)", "CMUP", "Valeur (XOF)", "Contrepartie", "Réf. doc"].map(
                    (h) => (
                      <th
                        key={h}
                        className="px-3 py-2 text-left text-gray-500 font-medium whitespace-nowrap"
                      >
                        {h}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {movements.map((m, i) => (
                  <tr key={i} className="border-t border-gray-50 hover:bg-gray-50">
                    <td className="px-3 py-2.5 text-gray-500 whitespace-nowrap">{m.date}</td>
                    <td className="px-3 py-2.5 font-mono text-gray-700 whitespace-nowrap">{m.lot}</td>
                    <td className="px-3 py-2.5 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${
                          m.sign === "+"
                            ? "bg-green-50 text-green-700"
                            : "bg-red-50 text-red-700"
                        }`}
                      >
                        {m.sign === "+" ? "➕" : "➖"} {m.type}
                      </span>
                    </td>
                    <td
                      className={`px-3 py-2.5 font-semibold whitespace-nowrap ${
                        m.sign === "+" ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {m.sign === "+" ? "+" : "-"}
                      {m.qty}
                    </td>
                    <td className="px-3 py-2.5 text-gray-700 whitespace-nowrap">{m.cmup}</td>
                    <td
                      className={`px-3 py-2.5 font-medium whitespace-nowrap ${
                        m.sign === "+" ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {m.value}
                    </td>
                    <td className="px-3 py-2.5 text-gray-700 whitespace-nowrap">{m.contrepartie}</td>
                    <td className="px-3 py-2.5 font-mono text-gray-500 whitespace-nowrap">{m.ref}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Lots en stock */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">
            Lots en stock actuellement
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-[#F8FBF8]">
                  {["N° Lot", "Date récolte", "Poids", "Humidité", "Grade", "Localisation", "Certif.", "Expiration"].map(
                    (h) => (
                      <th
                        key={h}
                        className="px-3 py-2 text-left text-gray-500 font-medium whitespace-nowrap"
                      >
                        {h}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {lots.map((l, i) => (
                  <tr key={i} className="border-t border-gray-50 hover:bg-gray-50">
                    <td className="px-3 py-2.5 font-mono text-gray-700 whitespace-nowrap">{l.num}</td>
                    <td className="px-3 py-2.5 text-gray-500 whitespace-nowrap">{l.recolte}</td>
                    <td className="px-3 py-2.5 font-semibold text-gray-800 whitespace-nowrap">{l.poids}</td>
                    <td className="px-3 py-2.5 text-gray-700 whitespace-nowrap">{l.humidite}</td>
                    <td className="px-3 py-2.5 whitespace-nowrap">
                      <span
                        className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${
                          l.grade === "AA"
                            ? "bg-[#2E7D32]/10 text-[#2E7D32]"
                            : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        {l.grade}
                      </span>
                    </td>
                    <td className="px-3 py-2.5 text-gray-700 whitespace-nowrap">{l.lieu}</td>
                    <td className="px-3 py-2.5 whitespace-nowrap">
                      <span className="text-green-600 font-medium">{l.certif} ✅</span>
                    </td>
                    <td className="px-3 py-2.5 text-gray-500 whitespace-nowrap">{l.exp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Analyse CMUP */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-semibold text-gray-700 mb-1">
            Analyse CMUP — 6 derniers mois
          </h2>
          <p className="text-xs text-gray-400 mb-5">CMUP mensuel moyen (XOF/kg)</p>
          <div className="space-y-3">
            {cmupData.map((d) => {
              const w = Math.round(((d.val - cmupMin) / cmupRange) * barMaxWidth) + 40;
              return (
                <div key={d.mois} className="flex items-center gap-3">
                  <span className="w-8 text-xs text-gray-500 shrink-0">{d.mois}</span>
                  <svg width={barMaxWidth + 50} height={22} className="overflow-visible">
                    <rect
                      x={0}
                      y={3}
                      width={w}
                      height={16}
                      rx={4}
                      fill="#2E7D32"
                      opacity={0.85}
                    />
                    <text
                      x={w + 6}
                      y={15}
                      fontSize={11}
                      fill="#374151"
                      fontWeight="600"
                    >
                      {d.val.toLocaleString("fr-FR")}
                    </text>
                  </svg>
                </div>
              );
            })}
          </div>
          <p className="mt-4 text-xs text-gray-400">
            Tendance haussière stable — progression de +1,7% sur la période
          </p>
        </div>
      </div>
    </div>
  );
}
