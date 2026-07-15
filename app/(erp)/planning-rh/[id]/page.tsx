import Topbar from "../../../components/Topbar";

export default async function PlanningRhDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const competences = [
    {
      competence: "Phytosanitaire (BPA)",
      niveau: "Expert",
      formation: "Certifié ANADER",
      date: "Jan 2025",
    },
    {
      competence: "Fermentation cacao CNRA",
      niveau: "Expert",
      formation: "Formation CNRA Soubré",
      date: "Mar 2023",
    },
    {
      competence: "Rapports terrain numérique",
      niveau: "Avancé",
      formation: "Autoformation AGRIFRIK ERP",
      date: "2024",
    },
    {
      competence: "Irrigation goutte-à-goutte",
      niveau: "Débutant",
      formation: "Formation Netafim prévue",
      date: "Juil 2025",
    },
  ];

  const objectifs = [
    {
      objectif: "Zéro lot rejeté pour qualité",
      cible: "0 lot refusé",
      realise: "0 lot refusé ✅",
      statut: "✅ Atteint",
      color: "text-green-600",
    },
    {
      objectif: "Taux mirides < 5%",
      cible: "<5% tous lots",
      realise: "6% (PAR-A1 jul)",
      statut: "🟡 En cours (traitement planifié)",
      color: "text-yellow-600",
    },
    {
      objectif: "Formation 2 saisonniers BPA",
      cible: "2 saisonniers",
      realise: "1 formé (Akissi)",
      statut: "🔵 En cours",
      color: "text-blue-600",
    },
    {
      objectif: "Installation irrigation PAR-C1",
      cible: "Avant août",
      realise: "Prévue 25/07",
      statut: "✅ En bonne voie",
      color: "text-green-600",
    },
  ];

  // Calendar grid: 5 weeks × 7 days for July 2025
  // July 2025: starts Tuesday (index 1), 31 days
  // We show weeks starting Monday
  // Week offsets: S1=07-13, S2=14-20, S3=21-27, S4=28-31
  type DayCell = {
    date: number | null;
    label: string;
    type: "terrain" | "bureau" | "formation" | "weekend" | "off" | "empty";
  };

  const weeks: DayCell[][] = [
    // S1: 07-13
    [
      { date: 7, label: "Inspection PAR-A1", type: "terrain" },
      { date: 8, label: "Débroussaillage PAR-B1", type: "terrain" },
      { date: 9, label: "Comptage PAR-A2", type: "terrain" },
      { date: 10, label: "Rapport RT-028", type: "bureau" },
      { date: 11, label: "Séchage LOT-047", type: "terrain" },
      { date: 12, label: "Arrosage PSC", type: "terrain" },
      { date: 13, label: "OFF", type: "weekend" },
    ],
    // S2: 14-20
    [
      { date: 14, label: "GPS PAR-C1", type: "terrain" },
      { date: 15, label: "Traitement PAR-A1 PCT-034", type: "terrain" },
      { date: 16, label: "Séchage LOT-048", type: "terrain" },
      { date: 17, label: "Fermentation LOT-047", type: "terrain" },
      { date: 18, label: "Traitement PAR-A2 PCT-035", type: "terrain" },
      { date: 19, label: "OFF", type: "weekend" },
      { date: 20, label: "OFF", type: "weekend" },
    ],
    // S3: 21-27
    [
      { date: 21, label: "Cut test LOT-047", type: "terrain" },
      { date: 22, label: "Fertilisation PAR-B1", type: "terrain" },
      { date: 23, label: "Installation Netafim J1", type: "formation" },
      { date: 24, label: "Netafim J2", type: "formation" },
      { date: 25, label: "Rapport RT-030", type: "bureau" },
      { date: 26, label: "OFF", type: "weekend" },
      { date: 27, label: "OFF", type: "weekend" },
    ],
    // S4: 28-31 (only 4 days)
    [
      { date: 28, label: "OFF (congé DG)", type: "off" },
      { date: 29, label: "Suivi Netafim", type: "terrain" },
      { date: 30, label: "Récolte PAR-C1 ana.", type: "terrain" },
      { date: 31, label: "Rapport mensuel terrain", type: "bureau" },
      { date: null, label: "", type: "empty" },
      { date: null, label: "", type: "empty" },
      { date: null, label: "", type: "empty" },
    ],
  ];

  const dayLabels = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

  const cellColor = (type: DayCell["type"]) => {
    switch (type) {
      case "terrain":
        return { bg: "#1B5E20", text: "white" };
      case "bureau":
        return { bg: "#4CAF50", text: "white" };
      case "formation":
        return { bg: "#E65100", text: "white" };
      case "weekend":
        return { bg: "#E5E7EB", text: "#9CA3AF" };
      case "off":
        return { bg: "#FEF3C7", text: "#92400E" };
      default:
        return { bg: "transparent", text: "transparent" };
    }
  };

  // SVG calendar dimensions
  const SVG_W = 700;
  const SVG_H = 380;
  const headerH = 36;
  const leftPad = 8;
  const topPad = 10;
  const colW = (SVG_W - leftPad * 2) / 7;
  const rowH = (SVG_H - topPad - headerH) / 4;

  return (
    <div className="min-h-screen bg-gray-50">
      <Topbar
        breadcrumb={["RH", "Planning RH", `Employé ${id}`]}
      />

      <div className="max-w-5xl mx-auto px-6 py-6 space-y-6">
        {/* En-tête bandeau */}
        <div className="rounded-2xl overflow-hidden" style={{ background: "#1B5E20" }}>
          <div className="p-4 sm:p-6">
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div>
                <p className="text-green-200 text-xs font-medium uppercase tracking-wider mb-1">
                  Planning employé
                </p>
                <h1 className="text-white text-2xl font-bold">
                  Ibrahim Sawadogo — Technicien terrain EXP-001
                </h1>
                <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-sm text-green-100">
                  <span>Matricule : EMP-002</span>
                  <span>Mois : Juillet 2025</span>
                  <span>CDI depuis 15/03/2015 — Convention coll. Agriculture CI Cat. C2</span>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-green-500 text-white">
                ✅ Planifié
              </span>
            </div>
          </div>
        </div>

        {/* 4 KPI cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              label: "Jours travaillés",
              value: "23/23",
              sub: "31j dont 4 WE + 0 JF = 23j ouvrés",
            },
            {
              label: "Heures planifiées",
              value: "176h",
              sub: "23j × ~7,65h",
            },
            {
              label: "Heures réalisées (YTD)",
              value: "168h",
              sub: "au 11/07 — en cours",
            },
            {
              label: "Congés restants",
              value: "14,58 jours",
              sub: "",
            },
          ].map((kpi) => (
            <div
              key={kpi.label}
              className="rounded-2xl border border-gray-100 bg-white p-5 flex flex-col gap-1"
            >
              <p className="text-xs text-gray-500">{kpi.label}</p>
              <p className="text-xl font-bold text-gray-800">{kpi.value}</p>
              {kpi.sub && <p className="text-xs text-gray-400">{kpi.sub}</p>}
            </div>
          ))}
        </div>

        {/* Planning calendrier SVG */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-semibold text-gray-800 mb-4">
            Planning Ibrahim Sawadogo — Juillet 2025
          </h2>
          <div className="overflow-x-auto">
            <svg
              width={SVG_W}
              height={SVG_H}
              viewBox={`0 0 ${SVG_W} ${SVG_H}`}
              className="block"
            >
              {/* Day header row */}
              {dayLabels.map((d, i) => (
                <rect
                  key={d}
                  x={leftPad + i * colW}
                  y={topPad}
                  width={colW - 2}
                  height={headerH - 4}
                  rx="4"
                  fill="#F8FBF8"
                />
              ))}
              {dayLabels.map((d, i) => (
                <text
                  key={d}
                  x={leftPad + i * colW + (colW - 2) / 2}
                  y={topPad + (headerH - 4) / 2 + 4}
                  fontSize="11"
                  fontWeight="600"
                  fill={i >= 5 ? "#9CA3AF" : "#374151"}
                  textAnchor="middle"
                >
                  {d}
                </text>
              ))}

              {/* Week rows */}
              {weeks.map((week, wi) =>
                week.map((cell, di) => {
                  if (cell.type === "empty") return null;
                  const x = leftPad + di * colW;
                  const y = topPad + headerH + wi * rowH;
                  const { bg, text } = cellColor(cell.type);
                  const cellH = rowH - 3;
                  const cellWi = colW - 2;

                  return (
                    <g key={`${wi}-${di}`}>
                      <rect
                        x={x}
                        y={y}
                        width={cellWi}
                        height={cellH}
                        rx="5"
                        fill={bg}
                      />
                      {cell.date !== null && (
                        <text
                          x={x + 6}
                          y={y + 14}
                          fontSize="10"
                          fontWeight="700"
                          fill={text}
                          opacity="0.7"
                        >
                          {cell.date}
                        </text>
                      )}
                      {cell.label && (
                        <text
                          x={x + cellWi / 2}
                          y={y + cellH / 2 + 4}
                          fontSize="8.5"
                          fill={text}
                          textAnchor="middle"
                        >
                          {cell.label.length > 14
                            ? cell.label.substring(0, 13) + "…"
                            : cell.label}
                        </text>
                      )}
                    </g>
                  );
                })
              )}
            </svg>
          </div>

          {/* Légende */}
          <div className="flex flex-wrap gap-4 mt-3">
            {[
              { color: "#1B5E20", label: "Terrain" },
              { color: "#4CAF50", label: "Bureau / Admin" },
              { color: "#E65100", label: "Formation" },
              { color: "#E5E7EB", label: "Week-end", textColor: "#6B7280" },
              { color: "#FEF3C7", label: "Congé / OFF", textColor: "#92400E" },
            ].map((l) => (
              <div key={l.label} className="flex items-center gap-1.5">
                <span
                  className="inline-block w-3 h-3 rounded"
                  style={{ background: l.color }}
                />
                <span className="text-xs text-gray-500">{l.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Compétences */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-semibold text-gray-800 mb-4">
            Compétences et formations 2025
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-[#F8FBF8]">
                  <th className="text-left py-2 px-3 font-semibold text-gray-600">Compétence</th>
                  <th className="text-left py-2 px-3 font-semibold text-gray-600">Niveau</th>
                  <th className="text-left py-2 px-3 font-semibold text-gray-600">Formation</th>
                  <th className="text-right py-2 px-3 font-semibold text-gray-600">Date</th>
                </tr>
              </thead>
              <tbody>
                {competences.map((c, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="py-2 px-3 text-gray-700 font-medium">{c.competence}</td>
                    <td className="py-2 px-3">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${
                          c.niveau === "Expert"
                            ? "bg-green-100 text-green-700"
                            : c.niveau === "Avancé"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-orange-100 text-orange-700"
                        }`}
                      >
                        {c.niveau}
                      </span>
                    </td>
                    <td className="py-2 px-3 text-gray-500">{c.formation}</td>
                    <td className="py-2 px-3 text-right text-gray-500">{c.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Objectifs */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-semibold text-gray-800 mb-4">Objectifs 2025</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-[#F8FBF8]">
                  <th className="text-left py-2 px-3 font-semibold text-gray-600">Objectif</th>
                  <th className="text-right py-2 px-3 font-semibold text-gray-600">Cible</th>
                  <th className="text-right py-2 px-3 font-semibold text-gray-600">
                    Réalisé (YTD)
                  </th>
                  <th className="text-left py-2 px-3 font-semibold text-gray-600">Statut</th>
                </tr>
              </thead>
              <tbody>
                {objectifs.map((o, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="py-2 px-3 text-gray-700 font-medium">{o.objectif}</td>
                    <td className="py-2 px-3 text-right text-gray-500">{o.cible}</td>
                    <td className="py-2 px-3 text-right text-gray-700">{o.realise}</td>
                    <td className={`py-2 px-3 font-medium ${o.color}`}>{o.statut}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3 pb-6">
          <a
            href="/planning-rh"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-gray-200 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            ← Retour au planning RH
          </a>
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#2E7D32] text-white text-xs font-medium hover:bg-[#1B5E20] transition-colors">
            Télécharger le planning PDF
          </button>
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-gray-200 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            Voir le bulletin de paie
          </button>
        </div>
      </div>
    </div>
  );
}
