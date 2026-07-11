import Topbar from "../../../components/Topbar";
import Link from "next/link";

// ─── données ─────────────────────────────────────────────────────────────────
const historique = [
  { campagne: "2020-2021", recolte: "6,82 t", rendement: "1,10 t/ha", gradeAA: "52%", ca: "7 363 600" },
  { campagne: "2021-2022", recolte: "7,08 t", rendement: "1,14 t/ha", gradeAA: "55%", ca: "7 649 640" },
  { campagne: "2022-2023", recolte: "7,44 t", rendement: "1,20 t/ha", gradeAA: "58%", ca: "8 035 200" },
  { campagne: "2023-2024", recolte: "7,68 t", rendement: "1,24 t/ha", gradeAA: "61%", ca: "8 294 400" },
  { campagne: "2024-2025", recolte: "7,93 t (prév.)", rendement: "1,28 t/ha", gradeAA: "64% (proj.)", ca: "8 939 860" },
];

const rendements = [
  { campagne: "20-21", val: 1.10 },
  { campagne: "21-22", val: 1.14 },
  { campagne: "22-23", val: 1.20 },
  { campagne: "23-24", val: 1.24 },
  { campagne: "24-25", val: 1.28 },
];

const indicateurs = [
  { label: "Présence mirides", valeur: "0 adultes/100 cabosses", statut: "✅ Aucun" },
  { label: "Présence Phytophthora", valeur: "0 cabosse infectée", statut: "✅ Aucun" },
  { label: "Pourriture brune", valeur: "0%", statut: "✅" },
  { label: "NDVI (drone 09/07)", valeur: "0,74", statut: "✅ Bon couvert végétal" },
  { label: "Indice chlorophylle", valeur: "42,8 SPAD", statut: "✅ Nutrition azotée suffisante" },
];

const interventions = [
  { date: "11/07", op: "Taille entretien", produit: "—", dose: "—", cout: "120 000", operateur: "Ibrahim S." },
  { date: "05/07", op: "Traitement préventif", produit: "Super Cupravit", dose: "4 g/L", cout: "42 000", operateur: "Ibrahim S." },
  { date: "01/07", op: "Fertilisation K", produit: "KCl 60%", dose: "80 kg/ha", cout: "43 432", operateur: "Konan Y." },
  { date: "15/06", op: "Contrôle qualité sol", produit: "Analyse CNRA", dose: "—", cout: "28 000", operateur: "CNRA CI" },
  { date: "28/05", op: "Fertilisation NPK", produit: "NPK 20-10-10", dose: "150 kg/ha", cout: "129 600", operateur: "Konan Y." },
];

// ─── SVG bar chart helpers ────────────────────────────────────────────────────
const BAR_W = 52;
const BAR_GAP = 28;
const CHART_H = 140;
const PAD_L = 40;
const PAD_B = 30;
const PAD_T = 20;
const rMin = 1.0;
const rMax = 1.35;
const svgW = PAD_L + rendements.length * (BAR_W + BAR_GAP) + 20;
const svgH = CHART_H + PAD_B + PAD_T;

function barY(val: number) {
  return PAD_T + (1 - (val - rMin) / (rMax - rMin)) * CHART_H;
}

// ─── page ─────────────────────────────────────────────────────────────────────
export default async function CultureDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Topbar
        title={`Parcelle ${id}`}
        breadcrumb={["Production", "Cultures", `Parcelle ${id}`]}
      />

      <main className="flex-1 p-4 md:p-6 space-y-6 max-w-5xl mx-auto w-full">

        {/* ── En-tête parcelle ─────────────────────────────────────────── */}
        <div className="rounded-2xl p-5 text-white" style={{ background: "linear-gradient(135deg,#1B5E20,#2E7D32)" }}>
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div>
              <p className="text-xl font-bold">Parcelle PAR-A1 · Zone Soubré Nord</p>
              <p className="text-sm text-green-200 mt-0.5">Cacao Forastero hybride T-60/887 · 6,2 ha</p>
              <p className="text-sm text-green-200 mt-0.5">Responsable : Ibrahim Sawadogo</p>
            </div>
            <div className="flex flex-wrap gap-2 shrink-0">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/20 text-white">✅ Certifiée RA</span>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/20 text-white">✅ GlobalG.A.P.</span>
            </div>
          </div>
        </div>

        {/* ── 5 KPIs ───────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {[
            { label: "Rendement 2024", value: "1,28 t/ha", sub: "7,93 t total", color: "#2E7D32" },
            { label: "Score santé", value: "94/100", sub: "✅ Excellent", color: "#1565C0" },
            { label: "Âge moyen plants", value: "17 ans", sub: "Plantation 2008", color: "#F57F17" },
            { label: "Dernier traitement", value: "05/07/2025", sub: "Ridomil Gold", color: "#6A1B9A" },
            { label: "Prochaine intervention", value: "Sarclage", sub: "Semaine du 14/07", color: "#E65100" },
          ].map(({ label, value, sub, color }) => (
            <div key={label} className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
              <p className="text-[11px] text-gray-500 leading-tight mb-1">{label}</p>
              <p className="text-base font-bold" style={{ color }}>{value}</p>
              <p className="text-[11px] text-gray-400 mt-0.5">{sub}</p>
            </div>
          ))}
        </div>

        {/* ── Informations parcelle ─────────────────────────────────────── */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">Informations parcelle</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            {[
              ["Coordonnées GPS", "5°47′12″N 6°36′24″W"],
              ["Altitude", "184 m"],
              ["Statut foncier", "Titre Foncier TF-23847"],
              ["Type de sol", "Limon argileux · pH 6,2 — légèrement acide ✅ optimal cacao"],
              ["Pente", "3-5% (légère)"],
              ["Drainage", "Bon naturellement"],
              ["Source d'eau", "Pluviométrie (pas d'irrigation)"],
              ["Ombrage", "18 Gliricidia sepium + 12 Terminalia superba (maturité)"],
            ].map(([k, v]) => (
              <div key={k} className="flex gap-2">
                <span className="text-gray-400 min-w-[160px] shrink-0">{k}</span>
                <span className="font-medium text-gray-800">{v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Historique de production + SVG ─────────────────────────── */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm space-y-5">
          <h2 className="text-sm font-semibold text-gray-700">Historique de production</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#F8FBF8] border-b border-gray-100">
                  {["Campagne", "Récolte (t)", "Rendement", "Grade AA%", "CA (XOF)"].map((h) => (
                    <th key={h} className="px-4 py-2 text-left text-xs font-semibold text-gray-500 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {historique.map((r, i) => (
                  <tr key={i} className={`hover:bg-gray-50 ${i === historique.length - 1 ? "bg-green-50/50" : ""}`}>
                    <td className="px-4 py-2.5 font-semibold text-gray-800">{r.campagne}</td>
                    <td className="px-4 py-2.5 text-gray-700">{r.recolte}</td>
                    <td className="px-4 py-2.5 font-semibold text-[#2E7D32]">{r.rendement}</td>
                    <td className="px-4 py-2.5 text-gray-700">{r.gradeAA}</td>
                    <td className="px-4 py-2.5 font-semibold text-gray-900">{r.ca}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Bar chart SVG */}
          <div>
            <p className="text-xs text-gray-400 mb-2">Rendement PAR-A1 — 5 campagnes (t/ha)</p>
            <div className="overflow-x-auto">
              <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full min-w-[280px]" aria-label="Rendement 5 campagnes">
                {[1.0, 1.1, 1.2, 1.3].map((v) => {
                  const y = barY(v);
                  return (
                    <g key={v}>
                      <line x1={PAD_L} y1={y} x2={svgW - 10} y2={y} stroke="#F0F0F0" strokeWidth={1} />
                      <text x={PAD_L - 4} y={y + 3} textAnchor="end" fontSize={9} fill="#BDBDBD">{v.toFixed(1)}</text>
                    </g>
                  );
                })}
                {rendements.map((r, i) => {
                  const x = PAD_L + i * (BAR_W + BAR_GAP) + BAR_GAP / 2;
                  const top = barY(r.val);
                  const h = svgH - PAD_B - top;
                  const isLast = i === rendements.length - 1;
                  return (
                    <g key={r.campagne}>
                      <rect x={x} y={top} width={BAR_W} height={h} rx={6} fill={isLast ? "#2E7D32" : "#A5D6A7"} />
                      <text x={x + BAR_W / 2} y={top - 5} textAnchor="middle" fontSize={9} fill={isLast ? "#2E7D32" : "#4CAF50"} fontWeight={isLast ? "700" : "400"}>
                        {r.val.toFixed(2)}
                      </text>
                      <text x={x + BAR_W / 2} y={svgH - PAD_B + 14} textAnchor="middle" fontSize={8.5} fill="#9E9E9E">{r.campagne}</text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>
        </div>

        {/* ── État phytosanitaire ──────────────────────────────────────── */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-700">État phytosanitaire</h2>
            <span className="text-xs text-gray-400">Dernière inspection : 10/07/2025 (Konan Yao)</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#F8FBF8] border-b border-gray-100">
                  {["Indicateur", "Valeur", "Statut"].map((h) => (
                    <th key={h} className="px-4 py-2 text-left text-xs font-semibold text-gray-500">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {indicateurs.map((ind) => (
                  <tr key={ind.label} className="hover:bg-gray-50">
                    <td className="px-4 py-2.5 text-gray-700">{ind.label}</td>
                    <td className="px-4 py-2.5 font-semibold text-gray-900">{ind.valeur}</td>
                    <td className="px-4 py-2.5 text-green-700 font-medium">{ind.statut}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Interventions récentes ───────────────────────────────────── */}
        <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="text-sm font-semibold text-gray-700">Interventions récentes</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#F8FBF8] border-b border-gray-100">
                  {["Date", "Opération", "Produit / Matériel", "Dose", "Coût (XOF)", "Opérateur"].map((h) => (
                    <th key={h} className="px-4 py-2 text-left text-xs font-semibold text-gray-500 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {interventions.map((iv, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-4 py-2.5 text-gray-500 whitespace-nowrap">{iv.date}</td>
                    <td className="px-4 py-2.5 font-medium text-gray-800">{iv.op}</td>
                    <td className="px-4 py-2.5 text-gray-700">{iv.produit}</td>
                    <td className="px-4 py-2.5 text-gray-600">{iv.dose}</td>
                    <td className="px-4 py-2.5 font-semibold text-gray-900">{iv.cout}</td>
                    <td className="px-4 py-2.5 text-gray-600 whitespace-nowrap">{iv.operateur}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Actions ─────────────────────────────────────────────────── */}
        <div className="flex flex-wrap gap-3 pb-4">
          <Link
            href="/cultures"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            ← Retour aux cultures
          </Link>
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white transition-colors hover:opacity-90" style={{ background: "#2E7D32" }}>
            + Créer une intervention
          </button>
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            Exporter fiche parcelle
          </button>
        </div>

      </main>
    </div>
  );
}
