import Topbar from "../../../components/Topbar";

interface Props {
  params: Promise<{ id: string }>;
}

// ── Chart data ────────────────────────────────────────────────────────────────
const MONTHS = [
  { label: "Jul 24", value: 980 },
  { label: "Aoû 24", value: 1002 },
  { label: "Sep 24", value: 1018 },
  { label: "Oct 24", value: 1045 },
  { label: "Nov 24", value: 1052 },
  { label: "Déc 24", value: 1060 },
  { label: "Jan 25", value: 1045 },
  { label: "Fév 25", value: 1058 },
  { label: "Mar 25", value: 1072 },
  { label: "Avr 25", value: 1068 },
  { label: "Mai 25", value: 1075 },
  { label: "Jun 25", value: 1082 },
  { label: "Jul 25", value: 1087 },
];

// ── SVG Area chart ────────────────────────────────────────────────────────────
function CoursAreaChart() {
  const W = 640, H = 240;
  const PL = 56, PR = 20, PT = 20, PB = 40;
  const cW = W - PL - PR;
  const cH = H - PT - PB;
  const MIN = 820, MAX = 1120;
  const n = MONTHS.length;

  const xOf = (i: number) => PL + (i / (n - 1)) * cW;
  const yOf = (v: number) => PT + cH - ((v - MIN) / (MAX - MIN)) * cH;

  const dusY = yOf(850);
  const contractY = yOf(1087);

  // Area path
  const pts = MONTHS.map((m, i) => `${xOf(i).toFixed(1)},${yOf(m.value).toFixed(1)}`);
  const areaD =
    `M${pts[0]} ` +
    pts.slice(1).map((p) => `L${p}`).join(" ") +
    ` L${xOf(n - 1).toFixed(1)},${(PT + cH).toFixed(1)} L${xOf(0).toFixed(1)},${(PT + cH).toFixed(1)} Z`;
  const lineD = `M${pts[0]} ` + pts.slice(1).map((p) => `L${p}`).join(" ");

  const yGrids = [850, 900, 950, 1000, 1050, 1100];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} className="max-w-full">
      {/* Grid */}
      {yGrids.map((v) => (
        <g key={v}>
          <line
            x1={PL} y1={yOf(v)} x2={PL + cW} y2={yOf(v)}
            stroke="#E5E7EB" strokeWidth="1"
            strokeDasharray={v === 850 ? "0" : "4,3"}
          />
          <text x={PL - 6} y={yOf(v) + 4} textAnchor="end" fontSize="10" fill="#9CA3AF">{v}</text>
        </g>
      ))}

      {/* Area verte */}
      <path d={areaD} fill="#4CAF50" fillOpacity="0.13" />

      {/* Ligne prix plancher DUS orange pointillée */}
      <line
        x1={PL} y1={dusY} x2={PL + cW} y2={dusY}
        stroke="#E65100" strokeWidth="1.5" strokeDasharray="6,4"
      />
      <text x={PL + 6} y={dusY - 5} fontSize="10" fill="#E65100">
        Prix plancher DUS 850 XOF
      </text>

      {/* Ligne contrat Barry Callebaut bleue */}
      <line
        x1={PL} y1={contractY} x2={PL + cW} y2={contractY}
        stroke="#1D4ED8" strokeWidth="1.5"
      />
      <text x={PL + cW - 4} y={contractY - 5} textAnchor="end" fontSize="10" fill="#1D4ED8">
        Prix contractuel Barry Callebaut : 1 087 XOF/kg
      </text>

      {/* Courbe verte */}
      <path d={lineD} fill="none" stroke="#2E7D32" strokeWidth="2" strokeLinejoin="round" />

      {/* Points */}
      {MONTHS.map((m, i) => (
        <circle key={i} cx={xOf(i)} cy={yOf(m.value)} r="3" fill="#2E7D32" />
      ))}

      {/* Labels X */}
      {MONTHS.map((m, i) => (
        <text key={i} x={xOf(i)} y={H - 8} textAnchor="middle" fontSize="9" fill="#9CA3AF">
          {m.label}
        </text>
      ))}
    </svg>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default async function PrixMarcheDetailPage({ params }: Props) {
  const { id } = await params;

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FBF8]">
      <Topbar breadcrumb={["Commerce", "Prix Marchés", `Cours ${id}`]} />

      <main className="flex-1 p-6 space-y-6 max-w-7xl mx-auto w-full">

        {/* ── En-tête bandeau vert ──────────────────────────────────────── */}
        <div className="rounded-2xl bg-[#1B5E20] text-white p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-green-300 text-xs font-medium uppercase tracking-wider mb-1">
                Bourse du Café et du Cacao d&apos;Abidjan (BCC)
              </p>
              <h1 className="text-2xl font-bold leading-tight">Cacao sec Grade AA</h1>
              <p className="text-green-200 text-sm mt-0.5">Filière Côte d&apos;Ivoire</p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <span className="inline-flex items-center gap-1.5 bg-green-500/25 border border-green-400/40 rounded-full px-3 py-1 text-xs font-semibold text-green-100">
                <span className="w-2 h-2 rounded-full bg-green-400 inline-block" />
                Marché ouvert
              </span>
              <span className="inline-flex items-center gap-1 bg-white/10 rounded-full px-3 py-1 text-xs font-medium text-green-100">
                ↗ Tendance Haussière (+0,7% sur 30j)
              </span>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 text-xs text-green-300 border-t border-green-700/60 pt-3 mt-4">
            <span>Code : <span className="text-white font-semibold">BCC-CAC-AA</span></span>
            <span className="text-green-600">|</span>
            <span>Mise à jour : <span className="text-white font-semibold">11/07/2025 à 08h30</span></span>
          </div>
        </div>

        {/* ── 5 KPI ─────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {[
            {
              label: "Cours actuel",
              value: "1 087",
              unit: "XOF/kg",
              sub: null,
              valueColor: "text-[#1B5E20]",
            },
            {
              label: "Variation J-1",
              value: "+12 XOF",
              unit: null,
              sub: "↑ +1,1%",
              valueColor: "text-green-600",
              subColor: "text-green-500",
            },
            {
              label: "ICE Londres (équiv.)",
              value: "1 112",
              unit: "XOF/kg (+2,3%)",
              sub: null,
              valueColor: "text-gray-800",
            },
            {
              label: "Prix plancher DUS CI 2025",
              value: "850",
              unit: "XOF/kg",
              sub: "Gouvernement",
              valueColor: "text-[#E65100]",
              subColor: "text-gray-400",
            },
            {
              label: "Premium Grade AA vs A",
              value: "+34 XOF",
              unit: null,
              sub: "+3,2%",
              valueColor: "text-blue-700",
              subColor: "text-blue-500",
            },
          ].map((k, i) => (
            <div key={i} className="rounded-2xl border border-gray-100 bg-white p-5">
              <p className="text-xs text-gray-500 mb-1">{k.label}</p>
              <p className={`text-2xl font-bold ${k.valueColor}`}>{k.value}</p>
              {k.unit && <p className="text-xs text-gray-400 mt-0.5">{k.unit}</p>}
              {k.sub && (
                <p className={`text-xs mt-0.5 ${k.subColor ?? "text-gray-400"}`}>{k.sub}</p>
              )}
            </div>
          ))}
        </div>

        {/* ── Évolution des cours ───────────────────────────────────────── */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-semibold text-gray-800 mb-1">Évolution des cours</h2>
          <p className="text-xs text-gray-400 mb-4">Cours cacao BCC — 12 derniers mois (XOF/kg)</p>
          <div className="overflow-x-auto">
            <CoursAreaChart />
          </div>
          {/* Légende */}
          <div className="flex flex-wrap gap-5 mt-3 text-xs text-gray-500">
            <span className="flex items-center gap-1.5">
              <span className="w-6 h-0.5 bg-[#2E7D32] inline-block rounded-full" />
              Cours BCC
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-6 h-0 border-t-2 border-dashed border-[#E65100] inline-block" />
              Prix plancher DUS 850 XOF
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-6 h-0.5 bg-blue-700 inline-block rounded-full" />
              Contrat Barry Callebaut 1 087 XOF/kg
            </span>
          </div>
        </div>

        {/* ── Comparatif bourses mondiales ─────────────────────────────── */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-semibold text-gray-800 mb-4">Comparatif bourses mondiales</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#F8FBF8]">
                  {["Bourse", "Symbole", "Prix actuel", "Équiv. XOF", "Écart vs BCC"].map((h, i) => (
                    <th
                      key={h}
                      className={`px-4 py-2.5 text-xs font-semibold text-gray-500 ${i === 0 ? "text-left rounded-tl-xl" : i === 4 ? "text-right rounded-tr-xl" : i <= 1 ? "text-left" : "text-right"}`}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                <tr className="bg-green-50">
                  <td className="px-4 py-3 text-xs font-semibold text-[#1B5E20]">BCC Abidjan</td>
                  <td className="px-4 py-3 text-xs text-gray-600">BCC-CAC-AA</td>
                  <td className="px-4 py-3 text-right text-xs font-semibold text-gray-800">1 087 XOF/kg</td>
                  <td className="px-4 py-3 text-right text-xs font-semibold text-[#1B5E20]">1 087 XOF</td>
                  <td className="px-4 py-3 text-right text-xs text-gray-500">Référence CI</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-xs text-gray-700">ICE Futures Europe (Londres)</td>
                  <td className="px-4 py-3 text-xs text-gray-500">LIFFE CAC</td>
                  <td className="px-4 py-3 text-right text-xs text-gray-700">8 412 GBP/t</td>
                  <td className="px-4 py-3 text-right text-xs font-semibold text-gray-800">1 112 XOF/kg</td>
                  <td className="px-4 py-3 text-right text-xs text-green-600">+25 XOF (+2,3%)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-xs text-gray-700">ICE Futures US (New York)</td>
                  <td className="px-4 py-3 text-xs text-gray-500">ICE CAC</td>
                  <td className="px-4 py-3 text-right text-xs text-gray-700">9 645 USD/t</td>
                  <td className="px-4 py-3 text-right text-xs font-semibold text-gray-800">1 135 XOF/kg</td>
                  <td className="px-4 py-3 text-right text-xs text-green-600">+48 XOF (+4,4%)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-xs text-gray-700">Euronext Paris</td>
                  <td className="px-4 py-3 text-xs text-gray-500">—</td>
                  <td className="px-4 py-3 text-right text-xs text-gray-700">8 204 EUR/t</td>
                  <td className="px-4 py-3 text-right text-xs font-semibold text-gray-800">1 096 XOF/kg</td>
                  <td className="px-4 py-3 text-right text-xs text-green-600">+9 XOF (+0,8%)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-gray-600 bg-blue-50 border border-blue-100 rounded-xl px-4 py-2.5">
            Le BCC Abidjan est la référence légale pour toutes les transactions de cacao en CI (Loi n° 2012-537). Nos contrats Barry Callebaut sont indexés sur le BCC.
          </p>
        </div>

        {/* ── Analyse des facteurs de prix ─────────────────────────────── */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-semibold text-gray-800 mb-1">Analyse des facteurs de prix</h2>
          <p className="text-xs text-gray-400 mb-4">Facteurs influençant le cours actuel</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#F8FBF8]">
                  <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-500 rounded-tl-xl">Facteur</th>
                  <th className="text-center px-4 py-2.5 text-xs font-semibold text-gray-500">Impact</th>
                  <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-500 rounded-tr-xl">Détail</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  { facteur: "Production CI 2024-25", impact: "🔴 Baissier", detail: "Saison intermédiaire faible (-8% vs N-1)", color: "text-red-600" },
                  { facteur: "Demande Europe & Amérique", impact: "🟢 Haussier", detail: "Demande chocolat premium en hausse +4%", color: "text-green-600" },
                  { facteur: "Stocks mondiaux ICCO", impact: "🔴 Baissier", detail: "Ratio stock/usage à 35% (bas historique)", color: "text-red-600" },
                  { facteur: "Taux de change EUR/XOF", impact: "🟡 Neutre", detail: "Zone franc UEMOA — parité fixe", color: "text-yellow-600" },
                  { facteur: "Récolte Ghana (2ème producteur)", impact: "🟡 Mixte", detail: "Estimation bonne récolte oct 2025", color: "text-yellow-600" },
                  { facteur: "Politique DUS (prix plancher CI)", impact: "🟢 Haussier", detail: "DUS 850 XOF — soutien prix CI", color: "text-green-600" },
                ].map((row, i) => (
                  <tr key={i}>
                    <td className="px-4 py-3 text-xs font-medium text-gray-800">{row.facteur}</td>
                    <td className={`px-4 py-3 text-center text-xs font-semibold ${row.color}`}>{row.impact}</td>
                    <td className="px-4 py-3 text-xs text-gray-600">{row.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Simulation de prix ────────────────────────────────────────── */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-semibold text-gray-800 mb-1">Simulation de prix pour votre exploitation</h2>
          <p className="text-xs text-gray-400 mb-4">Impact cours sur CA EXP-001</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#F8FBF8]">
                  {["Scénario", "Cours BCC", "Production H2 (8,2t)", "CA estimé H2", "Total 2025"].map((h, i) => (
                    <th
                      key={h}
                      className={`px-4 py-2.5 text-xs font-semibold text-gray-500 ${i === 0 ? "text-left rounded-tl-xl" : "text-right"} ${i === 4 ? "rounded-tr-xl" : ""}`}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                <tr className="bg-red-50">
                  <td className="px-4 py-3 text-xs font-semibold text-red-700">Pessimiste (-15%)</td>
                  <td className="px-4 py-3 text-right text-xs text-gray-700">924 XOF/kg</td>
                  <td className="px-4 py-3 text-right text-xs text-gray-700">8 200 kg</td>
                  <td className="px-4 py-3 text-right text-xs font-semibold text-gray-800">7 577 000 XOF</td>
                  <td className="px-4 py-3 text-right text-xs font-bold text-red-700">34,3M XOF</td>
                </tr>
                <tr className="bg-green-50">
                  <td className="px-4 py-3 text-xs font-semibold text-green-700">Neutre (actuel)</td>
                  <td className="px-4 py-3 text-right text-xs text-gray-700">1 087 XOF/kg</td>
                  <td className="px-4 py-3 text-right text-xs text-gray-700">8 200 kg</td>
                  <td className="px-4 py-3 text-right text-xs font-semibold text-gray-800">8 913 400 XOF</td>
                  <td className="px-4 py-3 text-right text-xs font-bold text-green-700">39,6M XOF</td>
                </tr>
                <tr className="bg-blue-50">
                  <td className="px-4 py-3 text-xs font-semibold text-blue-700">Optimiste (+10%)</td>
                  <td className="px-4 py-3 text-right text-xs text-gray-700">1 196 XOF/kg</td>
                  <td className="px-4 py-3 text-right text-xs text-gray-700">8 200 kg</td>
                  <td className="px-4 py-3 text-right text-xs font-semibold text-gray-800">9 807 200 XOF</td>
                  <td className="px-4 py-3 text-right text-xs font-bold text-blue-700">43,5M XOF</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-3 bg-green-50 border border-green-200 rounded-xl px-4 py-2.5 text-xs text-green-800">
            Votre contrat CTR-2025-001 (Barry Callebaut) fixe le prix à 1 087 XOF/kg jusqu&apos;au 31/12/2025, vous protégeant des fluctuations baissières.
          </div>
        </div>

        {/* ── Alertes de prix configurées ───────────────────────────────── */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-semibold text-gray-800 mb-4">Alertes de prix configurées</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#F8FBF8]">
                  <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-500 rounded-tl-xl">Alerte</th>
                  <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-500">Seuil</th>
                  <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-500 rounded-tr-xl">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                <tr>
                  <td className="px-4 py-3 text-xs font-medium text-gray-800">Alerte baisse critique</td>
                  <td className="px-4 py-3 text-xs text-gray-600">Cours &lt; 950 XOF/kg</td>
                  <td className="px-4 py-3 text-xs font-medium text-green-600">🟢 Non déclenchée</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-xs font-medium text-gray-800">Alerte hausse opportunité</td>
                  <td className="px-4 py-3 text-xs text-gray-600">Cours &gt; 1 150 XOF/kg</td>
                  <td className="px-4 py-3 text-xs font-medium text-green-600">🟢 Non déclenchée</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-xs font-medium text-gray-800">Notification quotidienne cours</td>
                  <td className="px-4 py-3 text-xs text-gray-600">Chaque jour à 08h30</td>
                  <td className="px-4 py-3 text-xs font-medium text-blue-600">✅ Active (email)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Actions ───────────────────────────────────────────────────── */}
        <div className="flex flex-wrap gap-3 pb-2">
          <a
            href="/prix-marche"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 bg-white text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            ← Retour aux prix marchés
          </a>
          <button className="px-4 py-2 rounded-xl bg-[#2E7D32] text-white text-xs font-medium hover:bg-[#1B5E20] transition-colors">
            Configurer alertes
          </button>
          <button className="px-4 py-2 rounded-xl border border-gray-200 bg-white text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            Historique complet
          </button>
        </div>

      </main>
    </div>
  );
}
