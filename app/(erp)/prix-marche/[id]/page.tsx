import Link from "next/link";
import Topbar from "../../../components/Topbar";

// ── Types ─────────────────────────────────────────────────────────────────────
interface Props {
  params: Promise<{ id: string }>;
}

// ── SVG: Cours historique 24 mois ─────────────────────────────────────────────
// BCC Abidjan XOF/kg (left axis), London ICE et NYMEX USD/t (right axis)
// 24 months Jul 2023 → Jun 2025 + Jul 2025
const histData = [
  { m: "J23", bcc: 820, ice: 2310, nymex: 2290 },
  { m: "A", bcc: 835, ice: 2360, nymex: 2340 },
  { m: "S", bcc: 852, ice: 2420, nymex: 2405 },
  { m: "O", bcc: 870, ice: 2510, nymex: 2480 },
  { m: "N", bcc: 890, ice: 2580, nymex: 2560 },
  { m: "D", bcc: 910, ice: 2650, nymex: 2630 },
  { m: "J24", bcc: 940, ice: 2720, nymex: 2700 },
  { m: "F", bcc: 965, ice: 2790, nymex: 2770 },
  { m: "M", bcc: 998, ice: 2880, nymex: 2850 },
  { m: "A", bcc: 1020, ice: 2960, nymex: 2940 },
  { m: "M", bcc: 1055, ice: 3040, nymex: 3010 },
  { m: "J", bcc: 980, ice: 2880, nymex: 2860 },
  { m: "J", bcc: 980, ice: 2820, nymex: 2800 },
  { m: "A", bcc: 1010, ice: 2910, nymex: 2890 },
  { m: "S", bcc: 1038, ice: 2970, nymex: 2950 },
  { m: "O", bcc: 1124, ice: 3140, nymex: 3120 },
  { m: "N", bcc: 1098, ice: 3080, nymex: 3060 },
  { m: "D", bcc: 1075, ice: 3010, nymex: 2990 },
  { m: "J25", bcc: 1060, ice: 2960, nymex: 2940 },
  { m: "F", bcc: 1045, ice: 2900, nymex: 2880 },
  { m: "M", bcc: 1052, ice: 2930, nymex: 2910 },
  { m: "A", bcc: 1068, ice: 2980, nymex: 2960 },
  { m: "M", bcc: 1079, ice: 3050, nymex: 3030 },
  { m: "J", bcc: 1082, ice: 2980, nymex: 2960 },
  { m: "J", bcc: 1087, ice: 2842, nymex: 3241 },
];

function HistChart() {
  const W = 700, H = 280, PL = 52, PR = 52, PT = 20, PB = 40;
  const cW = W - PL - PR, cH = H - PT - PB;
  const n = histData.length;
  const xOf = (i: number) => PL + (i / (n - 1)) * cW;

  // BCC: 800–1150
  const bccMin = 800, bccMax = 1150;
  const yBcc = (v: number) => PT + ((bccMax - v) / (bccMax - bccMin)) * cH;

  // ICE/NYMEX: 2200–3300
  const rMin = 2200, rMax = 3300;
  const yR = (v: number) => PT + ((rMax - v) / (rMax - rMin)) * cH;

  const ptsBcc = histData.map((d, i) => xOf(i) + "," + yBcc(d.bcc)).join(" ");
  const ptsIce = histData.map((d, i) => xOf(i) + "," + yR(d.ice)).join(" ");
  const ptsNym = histData.map((d, i) => xOf(i) + "," + yR(d.nymex)).join(" ");

  // annotation: plus haut 1124 (Oct 2024 = index 15) et plus bas 980 (Jul-Aug 2024 = index 12-13)
  const hiX = xOf(15), hiY = yBcc(1124);
  const loX = xOf(12), loY = yBcc(980);

  return (
    <svg viewBox={"0 0 " + W + " " + H} className="w-full" style={{ maxWidth: W }}>
      {/* grid */}
      {[800, 850, 900, 950, 1000, 1050, 1100, 1150].map((v) => (
        <g key={v}>
          <line x1={PL} y1={yBcc(v)} x2={PL + cW} y2={yBcc(v)} stroke="#e5e7eb" strokeWidth="0.8" />
          <text x={PL - 4} y={yBcc(v) + 4} fontSize="9" fill="#9ca3af" textAnchor="end">{v}</text>
        </g>
      ))}
      {/* right axis labels */}
      {[2200, 2500, 2800, 3100].map((v) => (
        <text key={v} x={PL + cW + 4} y={yR(v) + 4} fontSize="9" fill="#9ca3af" textAnchor="start">{v}</text>
      ))}
      {/* lines */}
      <polyline points={ptsIce} fill="none" stroke="#3b82f6" strokeWidth="1.8" />
      <polyline points={ptsNym} fill="none" stroke="#E65100" strokeWidth="1.8" strokeDasharray="4 3" />
      <polyline points={ptsBcc} fill="none" stroke="#2E7D32" strokeWidth="2.5" />
      {/* annotations */}
      <circle cx={hiX} cy={hiY} r="4" fill="#2E7D32" />
      <text x={hiX + 5} y={hiY - 5} fontSize="9" fill="#1B5E20" fontWeight="600">Plus haut 1 124</text>
      <circle cx={loX} cy={loY} r="4" fill="#ef4444" />
      <text x={loX + 5} y={loY + 12} fontSize="9" fill="#ef4444" fontWeight="600">Plus bas 980</text>
      {/* x labels every 4 months */}
      {histData.map((d, i) => i % 4 === 0 && (
        <text key={i} x={xOf(i)} y={H - 6} fontSize="9" fill="#6b7280" textAnchor="middle">{d.m}</text>
      ))}
      {/* axis titles */}
      <text x={8} y={H / 2} fontSize="9" fill="#6b7280" textAnchor="middle"
        transform={"rotate(-90, 8, " + (H / 2) + ")"}>XOF/kg</text>
      <text x={W - 4} y={H / 2} fontSize="9" fill="#6b7280" textAnchor="middle"
        transform={"rotate(90, " + (W - 4) + ", " + (H / 2) + ")"}>USD/t</text>
    </svg>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default async function PrixMarcheFichePage({ params }: Props) {
  const { id } = await params;

  const technicalData = [
    { label: "Moyenne mobile 30j", value: "1 082 XOF/kg" },
    { label: "Moyenne mobile 90j", value: "1 058 XOF/kg" },
    { label: "Plus haut 52 semaines", value: "1 124 XOF/kg (Oct 2024)" },
    { label: "Plus bas 52 semaines", value: "980 XOF/kg (Jul 2024)" },
    { label: "RSI (14j)", value: "58 — neutre" },
    { label: "Signal", value: "⬆️ Tendance haussière — MACD positif" },
  ];

  const fundamentals = [
    { label: "Production mondiale", value: "4,92 Mt (ICCO 2024-2025 estimé)" },
    { label: "Consommation mondiale", value: "5,18 Mt" },
    { label: "Déficit global", value: "-260 000 t → bullish ⬆️" },
    { label: "Stock mondial / consommation", value: "28,4% — bas historique" },
    { label: "Part Côte d'Ivoire", value: "40,8% de la production mondiale" },
    { label: "Taxe BCC DKL", value: "22 XOF/kg" },
    { label: "Taxe FDPCC", value: "14 XOF/kg" },
  ];

  const simulations = [
    { qty: "24 900 kg", current: "27 087 300", m30: "26 940 180", m90: "26 343 420", delta: "+743 880 XOF" },
    { qty: "10 000 kg", current: "10 870 000", m30: "10 820 000", m90: "10 580 000", delta: "+290 000 XOF" },
    { qty: "1 000 kg", current: "1 087 000", m30: "1 082 000", m90: "1 058 000", delta: "+29 000 XOF" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Topbar breadcrumb={["Commerce", "Prix Marchés", `Fiche ${id}`]} />

      <main className="flex-1 p-6 max-w-7xl mx-auto w-full space-y-6">
        {/* Back */}
        <Link
          href="/prix-marche"
          className="inline-flex items-center gap-1.5 text-sm text-[#2E7D32] hover:underline"
        >
          ← Retour aux prix marchés
        </Link>

        {/* Header */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-xl font-bold text-gray-900">Cacao en fèves brut fermenté séché</h1>
              <p className="text-sm text-gray-500 mt-0.5">Code douanier : 1801.00.00</p>
            </div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-100 text-green-800 text-sm font-medium">
              🟢 Cours en hausse (+1,1% sur 7j)
            </span>
          </div>

          {/* 5 KPIs */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-5">
            {[
              { label: "BCC Abidjan", value: "1 087 XOF/kg", delta: "▲ +12", up: true },
              { label: "London ICE", value: "£2 842/t", delta: "", up: true },
              { label: "NYMEX", value: "$3 241/t", delta: "", up: true },
              { label: "EUR/XOF", value: "655,96", delta: "", up: null },
              { label: "Premium Grade AA", value: "+120 XOF/kg", delta: "", up: true },
            ].map((k) => (
              <div key={k.label} className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                <p className="text-xs text-gray-500 mb-1">{k.label}</p>
                <p className="text-lg font-bold text-gray-900">{k.value}</p>
                {k.delta && (
                  <p className="text-xs font-medium mt-0.5 text-green-700">{k.delta}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Line chart 24 months */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <h2 className="text-sm font-semibold text-gray-700">Cours historique — 24 mois</h2>
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <span className="flex items-center gap-1.5"><span className="w-4 h-0.5 bg-[#2E7D32] inline-block" /> BCC Abidjan (XOF/kg)</span>
              <span className="flex items-center gap-1.5"><span className="w-4 h-0.5 bg-blue-500 inline-block" /> London ICE (USD/t)</span>
              <span className="flex items-center gap-1.5"><span className="w-4 h-0.5 bg-[#E65100] inline-block border-dashed border-t" style={{ borderStyle: "dashed" }} /> NYMEX (USD/t)</span>
            </div>
          </div>
          <HistChart />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Analyse technique */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5">
            <h2 className="text-sm font-semibold text-gray-700 mb-4">Analyse technique</h2>
            <table className="w-full text-sm">
              <tbody>
                {technicalData.map((r) => (
                  <tr key={r.label} className="border-t border-gray-50">
                    <td className="py-2 pr-3 text-gray-500 text-xs">{r.label}</td>
                    <td className="py-2 font-medium text-gray-900 text-xs">{r.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Fondamentaux */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5">
            <h2 className="text-sm font-semibold text-gray-700 mb-4">Fondamentaux de marché</h2>
            <table className="w-full text-sm">
              <tbody>
                {fundamentals.map((r) => (
                  <tr key={r.label} className="border-t border-gray-50">
                    <td className="py-2 pr-3 text-gray-500 text-xs">{r.label}</td>
                    <td className="py-2 font-medium text-gray-900 text-xs">{r.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Simulation valorisation */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">Simulation de valorisation</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#F8FBF8]">
                  {["Quantité", "Prix actuel (XOF)", "Prix M-30j (XOF)", "Prix M-90j (XOF)", "Variation vs M-90j"].map((h) => (
                    <th key={h} className="px-3 py-2 text-left text-xs font-medium text-gray-500">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {simulations.map((r) => (
                  <tr key={r.qty} className="border-t border-gray-50 hover:bg-gray-50">
                    <td className="px-3 py-2 font-medium text-gray-900">{r.qty}</td>
                    <td className="px-3 py-2 text-gray-700">{r.current}</td>
                    <td className="px-3 py-2 text-gray-600">{r.m30}</td>
                    <td className="px-3 py-2 text-gray-600">{r.m90}</td>
                    <td className="px-3 py-2 font-semibold text-green-700">{r.delta} ✅</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Prévisions IA */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">Prévisions IA</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-xl bg-blue-50 border border-blue-100 p-4">
              <p className="text-xs font-semibold text-blue-700 mb-1">Horizon 30 jours</p>
              <p className="text-lg font-bold text-gray-900">1 095 – 1 115 XOF/kg</p>
              <p className="text-xs text-gray-600 mt-1">Probabilité hausse : <span className="font-semibold text-green-700">68%</span></p>
            </div>
            <div className="rounded-xl bg-purple-50 border border-purple-100 p-4">
              <p className="text-xs font-semibold text-purple-700 mb-1">Horizon 90 jours</p>
              <p className="text-lg font-bold text-gray-900">1 080 – 1 130 XOF/kg</p>
              <p className="text-xs text-gray-600 mt-1">Stocks ICCO bas, bonne récolte CI attendue</p>
            </div>
            <div className="rounded-xl bg-green-50 border border-green-100 p-4">
              <p className="text-xs font-semibold text-green-700 mb-2">Signal vente</p>
              <p className="text-2xl font-bold text-green-800">⭐⭐⭐⭐ <span className="text-base">4/5</span></p>
              <p className="text-xs text-gray-600 mt-1 font-medium">Favorable</p>
              <p className="text-xs text-gray-500 mt-0.5">&ldquo;Cours au-dessus MM90, déficit mondial confirmé.&rdquo;</p>
            </div>
          </div>
        </div>

        {/* Back button bottom */}
        <div>
          <Link
            href="/prix-marche"
            className="inline-flex items-center gap-1.5 bg-[#2E7D32] text-white rounded-xl text-xs font-medium px-5 py-2.5 hover:bg-[#1B5E20] transition-colors"
          >
            ← Retour aux prix marchés
          </Link>
        </div>
      </main>
    </div>
  );
}
