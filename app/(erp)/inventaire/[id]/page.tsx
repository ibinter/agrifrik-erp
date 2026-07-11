import Topbar from "../../../components/Topbar";

export default async function InventaireArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // ── Données article INV-2025-CAC-AA ─────────────────────────────────────────
  const article = {
    code: "INV-2025-CAC-AA",
    intitule: "Cacao sec Grade AA — Fèves fermentées/séchées",
    categorie: "Produits agricoles — Stock négoce",
    compteSyscohada: "3111 — Marchandises en stocks",
    localisation: "ENT-001 Zone A + ENT-002 Zone A",
    statut: "Stock normal",
    qteTotale: 23_634,
    valeurCours: 25_677_258,
    coursDuJour: 1_087,
    valeurFifo: 24_487_000,
    coutMoyen: 902,
    plusValue: 1_190_258,
    rotation: 4.2,
  };

  const lots = [
    { lot: "LOT-2025-044", dateEntree: "22/06/2025", qty: 845, cout: 892, valeur: 753_540, gradeAA: "95%", statut: "" },
    { lot: "LOT-2025-045", dateEntree: "30/06/2025", qty: 912, cout: 908, valeur: 828_096, gradeAA: "96%", statut: "" },
    { lot: "LOT-2025-046", dateEntree: "01/07/2025", qty: 964, cout: 918, valeur: 884_952, gradeAA: "97%", statut: "" },
    { lot: "LOT-2025-047", dateEntree: "12/07/2025 (est.)", qty: 3_020, cout: 924, valeur: 2_790_480, gradeAA: "90%", statut: "Séchage en cours" },
    { lot: "LOT-2025-048", dateEntree: "13/07/2025 (est.)", qty: 2_640, cout: 926, valeur: 2_444_640, gradeAA: "À déterminer", statut: "" },
    { lot: "Stock résiduel lots ant.", dateEntree: "Divers (jan–mai)", qty: 15_253, cout: 898, valeur: 13_697_194, gradeAA: "63% moy.", statut: "" },
  ];

  const mouvements = [
    { date: "11/07", type: "Sortie", ref: "BL-2025-008", qty: -3_400, motif: "Chargement BC (partiel)" },
    { date: "08/07", type: "Entrée", ref: "LOT-2025-046 finalisé", qty: +964, motif: "Transformation terminée" },
    { date: "01/07", type: "Sortie", ref: "BL-2025-007", qty: -4_000, motif: "Chargement BC" },
    { date: "28/06", type: "Entrée", ref: "LOT-2025-045", qty: +912, motif: "Transformation" },
    { date: "22/06", type: "Entrée", ref: "LOT-2025-044", qty: +845, motif: "Transformation" },
    { date: "15/06", type: "Sortie", ref: "BL-2025-006", qty: -4_000, motif: "Chargement exportation" },
    { date: "10/06", type: "Entrée", ref: "LOT-2025-043", qty: +1_184, motif: "Transformation" },
    { date: "05/06", type: "Entrée", ref: "LOT-2025-042", qty: +2_000, motif: "Transformation" },
    { date: "28/05", type: "Sortie", ref: "BL-2025-005", qty: -3_400, motif: "Chargement BC" },
    { date: "20/05", type: "Entrée", ref: "LOT-2025-041", qty: +1_840, motif: "Transformation" },
  ];

  // ── SVG grouped bar chart mouvements hebdomadaires ───────────────────────────
  const semaines = ["S1 Juin", "S2 Juin", "S3 Juin", "S4 Juin", "S1 Jul"];
  const entrees = [2_854, 1_756, 3_184, 1_840, 3_984];
  const sorties = [4_000, 0, 4_000, 0, 3_400];
  const gbW = 640;
  const gbH = 220;
  const gbPad = { t: 20, r: 20, b: 40, l: 70 };
  const gbInnerW = gbW - gbPad.l - gbPad.r;
  const gbInnerH = gbH - gbPad.t - gbPad.b;
  const maxBar = Math.max(...entrees, ...sorties);
  const groupW = gbInnerW / semaines.length;
  const barW = groupW * 0.35;

  // ── SVG Donut grade ─────────────────────────────────────────────────────────
  const grades = [
    { label: "Grade AA (≥95%)", pct: 65, color: "#1B5E20" },
    { label: "Grade A (90–95%)", pct: 22, color: "#4CAF50" },
    { label: "Grade B (<90%)", pct: 8, color: "#FBC02D" },
    { label: "En classement", pct: 5, color: "#9CA3AF" },
  ];
  const cx = 130; const cy = 130; const R = 90; const r = 52;
  let angle = -Math.PI / 2;
  const donutSlices = grades.map((g) => {
    const sweep = (g.pct / 100) * 2 * Math.PI;
    const x1 = cx + R * Math.cos(angle);
    const y1 = cy + R * Math.sin(angle);
    const x2 = cx + R * Math.cos(angle + sweep);
    const y2 = cy + R * Math.sin(angle + sweep);
    const xi1 = cx + r * Math.cos(angle);
    const yi1 = cy + r * Math.sin(angle);
    const xi2 = cx + r * Math.cos(angle + sweep);
    const yi2 = cy + r * Math.sin(angle + sweep);
    const large = sweep > Math.PI ? 1 : 0;
    const d = `M ${x1} ${y1} A ${R} ${R} 0 ${large} 1 ${x2} ${y2} L ${xi2} ${yi2} A ${r} ${r} 0 ${large} 0 ${xi1} ${yi1} Z`;
    angle += sweep;
    return { ...g, d };
  });

  const fmt = (n: number) => n.toLocaleString("fr-FR") + " XOF";

  return (
    <div className="min-h-screen bg-[#F4F6F4]">
      <Topbar
        title={`Article ${id}`}
        breadcrumb={["Finance", "Inventaire", `Article ${id}`]}
      />

      <div className="p-6 space-y-6 max-w-5xl mx-auto">

        {/* ── En-tête bandeau vert ─────────────────────────────────────────── */}
        <div className="rounded-2xl bg-[#1B5E20] text-white p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-green-300 text-xs font-medium uppercase tracking-wider mb-1">Fiche inventaire</p>
              <h1 className="text-2xl font-bold">{article.intitule}</h1>
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1 text-sm text-green-200">
                <span>Code : <span className="text-white font-mono font-medium">{article.code}</span></span>
                <span>Catégorie : <span className="text-white font-medium">{article.categorie}</span></span>
                <span>Compte SYSCOHADA : <span className="text-white font-medium">{article.compteSyscohada}</span></span>
                <span>Localisation : <span className="text-white font-medium">{article.localisation}</span></span>
              </div>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-green-600 border border-green-400 px-3 py-1 text-xs font-semibold self-start">
              ✅ {article.statut}
            </span>
          </div>
        </div>

        {/* ── KPI ─────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { label: "Quantité en stock", value: `${article.qteTotale.toLocaleString("fr-FR")} kg`, sub: "18 448 + 5 186 kg Grade A", color: "text-gray-900" },
            { label: "Valeur au cours actuel", value: fmt(article.valeurCours), sub: `${article.coursDuJour} XOF/kg`, color: "text-[#1B5E20]" },
            { label: "Valeur comptable FIFO", value: fmt(article.valeurFifo), sub: "Coût de revient moyen", color: "text-blue-700" },
            { label: "Plus-value latente", value: `+${fmt(article.plusValue)}`, sub: "Cours > coût revient", color: "text-[#2E7D32]" },
            { label: "Rotation des stocks", value: `${article.rotation} rot./trim.`, sub: "Derniers 90j ✅", color: "text-[#2E7D32]" },
          ].map((k) => (
            <div key={k.label} className="rounded-2xl border border-gray-100 bg-white p-5">
              <p className="text-xs text-gray-500 mb-1">{k.label}</p>
              <p className={`text-base font-bold ${k.color}`}>{k.value}</p>
              {k.sub && <p className="text-xs text-gray-400 mt-1">{k.sub}</p>}
            </div>
          ))}
        </div>

        {/* ── Valorisation FIFO ────────────────────────────────────────────── */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <div className="flex items-start justify-between mb-1">
            <h2 className="text-sm font-semibold text-gray-800">Valorisation de l'inventaire — Méthode FIFO</h2>
            <span className="text-xs text-gray-400">SYSCOHADA art. 42</span>
          </div>
          <p className="text-xs text-gray-500 mb-4">Premier entré, Premier sorti</p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-[#F8FBF8] text-gray-600 text-left">
                  <th className="px-3 py-2 font-medium">Lot</th>
                  <th className="px-3 py-2 font-medium">Date entrée</th>
                  <th className="px-3 py-2 font-medium text-right">Quantité</th>
                  <th className="px-3 py-2 font-medium text-right">Coût/kg</th>
                  <th className="px-3 py-2 font-medium text-right">Valeur comptable</th>
                  <th className="px-3 py-2 font-medium text-right">% Grade AA</th>
                </tr>
              </thead>
              <tbody>
                {lots.map((l, i) => (
                  <tr key={i} className="border-t border-gray-50 hover:bg-gray-50">
                    <td className="px-3 py-2 font-mono text-[#2E7D32] text-xs">{l.lot}</td>
                    <td className="px-3 py-2 text-gray-500">{l.dateEntree}</td>
                    <td className="px-3 py-2 text-right text-gray-900">{l.qty.toLocaleString("fr-FR")} kg</td>
                    <td className="px-3 py-2 text-right text-gray-700">{l.cout} XOF</td>
                    <td className="px-3 py-2 text-right font-medium text-gray-900">{l.valeur.toLocaleString("fr-FR")} XOF</td>
                    <td className="px-3 py-2 text-right">
                      {l.statut ? (
                        <span className="text-orange-500">{l.statut}</span>
                      ) : (
                        <span className="font-medium text-[#2E7D32]">{l.gradeAA}</span>
                      )}
                    </td>
                  </tr>
                ))}
                <tr className="border-t-2 border-gray-200 bg-[#F8FBF8] font-semibold">
                  <td className="px-3 py-2 text-gray-900">TOTAL</td>
                  <td className="px-3 py-2 text-gray-500"></td>
                  <td className="px-3 py-2 text-right text-gray-900">23 634 kg</td>
                  <td className="px-3 py-2 text-right text-gray-700">moy. 902 XOF/kg</td>
                  <td className="px-3 py-2 text-right text-[#2E7D32]">21 398 902 XOF</td>
                  <td className="px-3 py-2 text-right text-gray-700">65% AA</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-4 rounded-xl bg-blue-50 border border-blue-100 p-3 text-xs text-blue-700">
            Différence cours/FIFO : <strong>+1 190 258 XOF</strong> — Plus-value latente non comptabilisée (prudence SYSCOHADA)
          </div>
        </div>

        {/* ── Grouped bar chart mouvements ─────────────────────────────────── */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-semibold text-gray-800 mb-4">Stocks entrants vs sortants — Juin–Juillet 2025</h2>
          <div className="overflow-x-auto">
            <svg width={gbW} height={gbH} viewBox={`0 0 ${gbW} ${gbH}`} className="max-w-full">
              {/* Grille */}
              {[0, 0.25, 0.5, 0.75, 1].map((f) => {
                const y = gbPad.t + gbInnerH * (1 - f);
                const val = Math.round(maxBar * f / 1000);
                return (
                  <g key={f}>
                    <line x1={gbPad.l} y1={y} x2={gbW - gbPad.r} y2={y} stroke="#E5E7EB" strokeWidth={1} />
                    <text x={gbPad.l - 6} y={y + 4} textAnchor="end" fill="#9CA3AF" fontSize={10}>{val}k</text>
                  </g>
                );
              })}
              {/* Barres */}
              {semaines.map((s, i) => {
                const gx = gbPad.l + i * groupW;
                const hE = (entrees[i] / maxBar) * gbInnerH;
                const hS = (sorties[i] / maxBar) * gbInnerH;
                return (
                  <g key={s}>
                    {/* Entrées (vert) */}
                    <rect
                      x={gx + groupW * 0.1}
                      y={gbPad.t + gbInnerH - hE}
                      width={barW}
                      height={hE}
                      fill="#2E7D32"
                      rx={2}
                    />
                    {/* Sorties (orange) */}
                    <rect
                      x={gx + groupW * 0.1 + barW + 4}
                      y={gbPad.t + gbInnerH - hS}
                      width={barW}
                      height={hS}
                      fill="#E65100"
                      rx={2}
                    />
                    {/* Label axe X */}
                    <text x={gx + groupW / 2} y={gbH - 8} textAnchor="middle" fill="#6B7280" fontSize={10}>{s}</text>
                  </g>
                );
              })}
            </svg>
          </div>
          <div className="flex gap-6 mt-2 text-xs text-gray-600">
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm inline-block bg-[#2E7D32]" /> Entrées (kg)</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm inline-block bg-[#E65100]" /> Sorties (kg)</span>
          </div>

          {/* Tableau mouvements */}
          <h3 className="text-xs font-semibold text-gray-700 mt-5 mb-3">20 derniers mouvements</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-[#F8FBF8] text-gray-600 text-left">
                  <th className="px-3 py-2 font-medium">Date</th>
                  <th className="px-3 py-2 font-medium">Type</th>
                  <th className="px-3 py-2 font-medium">Lot / BL</th>
                  <th className="px-3 py-2 font-medium text-right">Qté (kg)</th>
                  <th className="px-3 py-2 font-medium">Motif</th>
                </tr>
              </thead>
              <tbody>
                {mouvements.map((m, i) => (
                  <tr key={i} className="border-t border-gray-50 hover:bg-gray-50">
                    <td className="px-3 py-2 text-gray-500">{m.date}</td>
                    <td className="px-3 py-2">
                      <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                        m.type === "Entrée"
                          ? "bg-green-50 text-[#2E7D32]"
                          : "bg-orange-50 text-orange-700"
                      }`}>{m.type}</span>
                    </td>
                    <td className="px-3 py-2 font-mono text-gray-700">{m.ref}</td>
                    <td className={`px-3 py-2 text-right font-semibold ${m.qty > 0 ? "text-[#2E7D32]" : "text-orange-600"}`}>
                      {m.qty > 0 ? "+" : ""}{m.qty.toLocaleString("fr-FR")}
                    </td>
                    <td className="px-3 py-2 text-gray-600">{m.motif}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Donut grade qualité ──────────────────────────────────────────── */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-semibold text-gray-800 mb-4">Analyse qualité du stock — Répartition par grade</h2>
          <div className="flex flex-wrap gap-8 items-center">
            <svg width={260} height={260} viewBox="0 0 260 260">
              {donutSlices.map((s, i) => (
                <path key={i} d={s.d} fill={s.color} />
              ))}
              {/* Centre */}
              <text x={cx} y={cy - 6} textAnchor="middle" fill="#1B5E20" fontSize={22} fontWeight="700">65%</text>
              <text x={cx} y={cy + 14} textAnchor="middle" fill="#6B7280" fontSize={10}>Grade AA</text>
            </svg>
            <div className="space-y-3">
              {grades.map((g) => (
                <div key={g.label} className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: g.color }} />
                  <span className="text-sm text-gray-700">{g.label}</span>
                  <span className="ml-auto font-bold text-gray-900">{g.pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Provisions pour dépréciation ─────────────────────────────────── */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-semibold text-gray-800 mb-1">Provisions pour dépréciation</h2>
          <p className="text-xs text-gray-500 mb-4">Règle SYSCOHADA : Test de dépréciation si valeur nette réalisable &lt; valeur comptable</p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs mb-4">
              <thead>
                <tr className="bg-[#F8FBF8] text-gray-600 text-left">
                  <th className="px-3 py-2 font-medium">Lot</th>
                  <th className="px-3 py-2 font-medium">Âge</th>
                  <th className="px-3 py-2 font-medium text-right">Coût revient</th>
                  <th className="px-3 py-2 font-medium text-right">Cours actuel</th>
                  <th className="px-3 py-2 font-medium text-right">Dépréciation à passer</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-gray-50">
                  <td className="px-3 py-2 text-gray-700">Tous lots</td>
                  <td className="px-3 py-2 text-gray-500">&lt;6 mois</td>
                  <td className="px-3 py-2 text-right text-gray-900">902 XOF/kg</td>
                  <td className="px-3 py-2 text-right text-[#2E7D32] font-semibold">1 087 XOF/kg</td>
                  <td className="px-3 py-2 text-right text-[#2E7D32] font-semibold">Aucune ✅ (cours &gt; coût)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="rounded-xl bg-green-50 border border-green-200 p-4 text-sm text-green-800">
            <p className="font-semibold mb-1">✅ Aucune provision pour dépréciation requise au 11/07/2025</p>
            <p>Valeur nette réalisable (<strong>1 087 XOF/kg</strong>) &gt; coût de revient moyen (<strong>902 XOF/kg</strong>).
              Prochain test : <strong>31/12/2025</strong>.</p>
          </div>
        </div>

        {/* ── Actions ─────────────────────────────────────────────────────── */}
        <div className="flex flex-wrap gap-3 pb-6">
          <a
            href="/inventaire"
            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50"
          >
            ← Retour à l'inventaire
          </a>
          <button className="inline-flex items-center gap-2 rounded-xl bg-orange-50 border border-orange-200 px-4 py-2 text-xs font-medium text-orange-700 hover:bg-orange-100">
            Ajuster le stock
          </button>
          <button className="inline-flex items-center gap-2 rounded-xl bg-[#2E7D32] text-white px-4 py-2 text-xs font-medium hover:bg-[#1B5E20]">
            Exporter état inventaire
          </button>
        </div>

      </div>
    </div>
  );
}
