"use client";

import { useState } from "react";
import Topbar from "../../components/Topbar";

// ── Types & Data ───────────────────────────────────────────────────────────────

type Tab = "environnement" | "social" | "gouvernance";

const BIODIVERSITE = [
  { indicateur: "Arbres d'ombrage", valeur: "180 arbres (56 espèces)", objectif: "≥40 arbres/ha", ok: true },
  { indicateur: "Espèces endémiques recensées", valeur: "12 (oiseaux + mammifères)", objectif: "Monitoring annuel", ok: true },
  { indicateur: "Zone tampon rivière respectée", valeur: "50m intégral", objectif: "≥30m", ok: true },
  { indicateur: "Aucun défrichement depuis", valeur: "2008", objectif: "0 déforestation", ok: true },
  { indicateur: "Superficie forêt primaire adjacente", valeur: "2,1 ha", objectif: "Préservée", ok: true },
];

const EMPLOI = [
  { indicateur: "Effectif total", v2023: "4", v2024: "5", v2025: "5" },
  { indicateur: "Salaire médian (XOF/mois)", v2023: "118 000", v2024: "132 000", v2025: "142 000" },
  { indicateur: "% au-dessus SMAG CI (75 000 XOF)", v2023: "100%", v2024: "100%", v2025: "100%" },
  { indicateur: "Agents formés BPA", v2023: "3", v2024: "4", v2025: "5" },
  { indicateur: "% femmes dans l'équipe", v2023: "20%", v2024: "20%", v2025: "20%" },
  { indicateur: "Accidents du travail", v2023: "0", v2024: "0", v2025: "0" },
];

const ACTIONS_COMMUNAUTAIRES = [
  { action: "Formation BPA — 150 producteurs locaux (projet FAO)", benef: "150", cout: "(FAO)", statut: "encours", label: "En cours" },
  { action: "Micro-crédit intrants coopérative (0%)", benef: "142 membres", cout: "6M XOF fonds", statut: "actif", label: "Actif" },
  { action: "École primaire Soubré (matériel scolaire)", benef: "280 élèves", cout: "380 000 XOF", statut: "livre", label: "Livré jan 2025" },
  { action: "Puits eau potable village Gbéagui", benef: "420 habitants", cout: "2,4M XOF", statut: "cours", label: "En cours (60%)" },
];

const CERTIFICATIONS = [
  { label: "Rainforest Alliance 2020", organisme: "Bureau Veritas", validite: "Fév 2026", score: "94/100" },
  { label: "Traçabilité CNRA", organisme: "CNRA CI", validite: "Déc 2025", score: "Certifiée" },
  { label: "Conformité SYSCOHADA", organisme: "Expert-comptable agréé CI", validite: "Déc 2025", score: "Conforme" },
  { label: "Projet FAO BAI-2025-001", organisme: "FAO / ANADER", validite: "Déc 2026", score: "En cours" },
];

// ── SVG Charts ─────────────────────────────────────────────────────────────────

/** Waterfall horizontal — Bilan carbone */
function ChartBilanCarbone() {
  const W = 640, H = 220;
  const PL = 200, PR = 80, PT = 24, PB = 24;
  const w = W - PL - PR;
  const h = H - PT - PB;

  const emissions = [
    { label: "Carburant tracteur", val: 10.6, color: "#ef4444" },
    { label: "Phytosanitaires", val: 1.2, color: "#f87171" },
    { label: "Transport", val: 4.7, color: "#ef4444" },
    { label: "Divers", val: 0.8, color: "#fca5a5" },
  ];
  const absorptions = [
    { label: "Ombragiers 180 arbres", val: 68, color: "#16a34a" },
    { label: "Cacao plants 3ha", val: 189, color: "#15803d" },
    { label: "Sols organiques", val: 42, color: "#22c55e" },
  ];

  const allItems = [...emissions, ...absorptions];
  const maxVal = 189;
  const barH = 22;
  const gap = 8;
  const totalH = allItems.length * (barH + gap);
  const scale = (w * 0.55) / maxVal;

  let currentY = PT;

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5">
      <h3 className="text-sm font-semibold text-gray-800 mb-1">Bilan carbone EXP-001 — Jan-Jul 2025</h3>
      <p className="text-xs text-gray-400 mb-3">Waterfall : émissions (rouge) vs absorptions (vert) en tCO₂e</p>
      <div className="overflow-x-auto">
        <svg width={W} height={PT + totalH + PB + 24} viewBox={`0 0 ${W} ${PT + totalH + PB + 24}`} className="max-w-full">
          {/* Ligne zéro */}
          <line x1={PL} y1={PT} x2={PL} y2={PT + totalH} stroke="#e5e7eb" strokeWidth={1} />

          {allItems.map((item, i) => {
            const y = PT + i * (barH + gap);
            const isAbsorption = absorptions.includes(item as typeof absorptions[number]);
            const bw = item.val * scale;
            const barX = isAbsorption ? PL - bw : PL;
            const label = `${isAbsorption ? "-" : "+"}${item.val}t`;
            return (
              <g key={i}>
                <rect x={barX} y={y} width={bw} height={barH} rx={4} fill={item.color} fillOpacity={0.9} />
                <text x={PL - 8} y={y + barH / 2 + 4} textAnchor="end" fontSize={10} fill="#374151">
                  {item.label}
                </text>
                <text
                  x={isAbsorption ? barX - 4 : PL + bw + 4}
                  y={y + barH / 2 + 4}
                  textAnchor={isAbsorption ? "end" : "start"}
                  fontSize={9}
                  fill={item.color}
                  fontWeight="600"
                >
                  {label}
                </text>
              </g>
            );
          })}

          {/* Séparateur */}
          <line x1={PL - 180} y1={PT + emissions.length * (barH + gap) - 2} x2={W - PR} y2={PT + emissions.length * (barH + gap) - 2} stroke="#e5e7eb" strokeWidth={1} strokeDasharray="4 2" />

          {/* Bilan net */}
          <rect x={PL - (281.7 * scale)} y={PT + totalH + 8} width={281.7 * scale} height={barH} rx={4} fill="#15803d" />
          <text x={PL - 8} y={PT + totalH + 8 + barH / 2 + 4} textAnchor="end" fontSize={10} fontWeight="700" fill="#15803d">
            Bilan net
          </text>
          <text x={PL - 281.7 * scale - 4} y={PT + totalH + 8 + barH / 2 + 4} textAnchor="end" fontSize={10} fontWeight="700" fill="#15803d">
            -281,7 tCO₂e YTD ✅
          </text>
        </svg>
      </div>
      <div className="mt-2 flex flex-wrap gap-4 text-xs text-gray-500">
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-red-400 inline-block" /> Émissions : +17,3 tCO₂e</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-green-600 inline-block" /> Absorptions : -299 tCO₂e</span>
        <span className="flex items-center gap-1.5 font-semibold text-green-700"><span className="w-3 h-3 rounded bg-green-700 inline-block" /> Net : -281,7 tCO₂e | Projeté annuel : -566 tCO₂e</span>
      </div>
    </div>
  );
}

/** Line chart — Évolution phyto 2019-2025 */
function ChartPhyto() {
  const data = [
    { year: "2019", val: 4.2 },
    { year: "2020", val: 4.0 },
    { year: "2021", val: 3.6 },
    { year: "2022", val: 3.2 },
    { year: "2023", val: 2.8 },
    { year: "2024", val: 2.4 },
    { year: "2025e", val: 2.1 },
  ];
  const W = 640, H = 160, PL = 36, PR = 20, PT = 16, PB = 28;
  const w = W - PL - PR;
  const h = H - PT - PB;
  const maxV = 5;
  const pts = data.map((d, i) => {
    const x = PL + (i / (data.length - 1)) * w;
    const y = PT + h - (d.val / maxV) * h;
    return { x, y, ...d };
  });
  const poly = pts.map(p => `${p.x},${p.y}`).join(" ");
  const area = `${pts[0].x},${PT + h} ${poly} ${pts[pts.length - 1].x},${PT + h}`;
  // Ligne objectif RA = 2.5
  const objY = PT + h - (2.5 / maxV) * h;

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5">
      <h3 className="text-sm font-semibold text-gray-800 mb-1">Évolution consommation phytosanitaires (kg/ha) 2019–2025</h3>
      <p className="text-xs text-gray-400 mb-3">Tendance baissière — objectif Rainforest Alliance &lt;2,5 kg/ha franchi en 2023</p>
      <div className="overflow-x-auto">
        <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} className="max-w-full">
          {[0, 1, 2, 3, 4, 5].map((v) => {
            const y = PT + h - (v / maxV) * h;
            return (
              <g key={v}>
                <line x1={PL} y1={y} x2={PL + w} y2={y} stroke="#f3f4f6" strokeWidth={1} />
                <text x={PL - 4} y={y + 3} textAnchor="end" fontSize={8} fill="#9ca3af">{v}</text>
              </g>
            );
          })}
          {/* Ligne objectif RA */}
          <line x1={PL} y1={objY} x2={PL + w} y2={objY} stroke="#E65100" strokeWidth={1.5} strokeDasharray="5 3" />
          <text x={PL + w + 2} y={objY + 3} fontSize={8} fill="#E65100" fontWeight="600">RA &lt;2,5</text>
          {/* Aire */}
          <polygon points={area} fill="#2E7D32" fillOpacity={0.07} />
          <polyline points={poly} fill="none" stroke="#2E7D32" strokeWidth={2.5} strokeLinejoin="round" />
          {pts.map((p, i) => (
            <g key={i}>
              <circle cx={p.x} cy={p.y} r={4} fill="#2E7D32" />
              <text x={p.x} y={p.y - 7} textAnchor="middle" fontSize={9} fill="#2E7D32" fontWeight="600">{p.val}</text>
              <text x={p.x} y={H - 6} textAnchor="middle" fontSize={9} fill="#9ca3af">{p.year}</text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}

/** Line chart — Salaires vs SMAG CI */
function ChartSalaires() {
  const years = ["2019","2020","2021","2022","2023","2024","2025"];
  const salaires = [82000, 90000, 98000, 108000, 118000, 132000, 142000];
  const smag = [75000, 75000, 75000, 75000, 75000, 75000, 75000];
  const W = 640, H = 180, PL = 60, PR = 20, PT = 16, PB = 28;
  const w = W - PL - PR;
  const h = H - PT - PB;
  const maxV = 160000;

  const pts = (vals: number[]) => vals.map((v, i) => {
    const x = PL + (i / (vals.length - 1)) * w;
    const y = PT + h - (v / maxV) * h;
    return `${x},${y}`;
  }).join(" ");

  const area1 = `${PL},${PT + h} ${pts(salaires)} ${PL + w},${PT + h}`;

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5">
      <h3 className="text-sm font-semibold text-gray-800 mb-1">Évolution salaires vs SMAG CI (XOF/mois)</h3>
      <p className="text-xs text-gray-400 mb-3">Salaire médian AGRIFRIK toujours supérieur au SMAG — écart croissant</p>
      <div className="overflow-x-auto">
        <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} className="max-w-full">
          {[0, 40000, 80000, 120000, 160000].map((v) => {
            const y = PT + h - (v / maxV) * h;
            return (
              <g key={v}>
                <line x1={PL} y1={y} x2={PL + w} y2={y} stroke="#f3f4f6" strokeWidth={1} />
                <text x={PL - 4} y={y + 3} textAnchor="end" fontSize={8} fill="#9ca3af">
                  {v === 0 ? "0" : `${v / 1000}k`}
                </text>
              </g>
            );
          })}
          {/* Aire AGRIFRIK */}
          <polygon points={area1} fill="#2E7D32" fillOpacity={0.08} />
          {/* Courbe SMAG */}
          <polyline points={pts(smag)} fill="none" stroke="#9ca3af" strokeWidth={1.5} strokeDasharray="4 3" />
          {/* Courbe AGRIFRIK */}
          <polyline points={pts(salaires)} fill="none" stroke="#2E7D32" strokeWidth={2.5} strokeLinejoin="round" />
          {salaires.map((v, i) => {
            const x = PL + (i / (years.length - 1)) * w;
            const y = PT + h - (v / maxV) * h;
            return (
              <g key={i}>
                <circle cx={x} cy={y} r={4} fill="#2E7D32" />
                <text x={x} y={H - 6} textAnchor="middle" fontSize={9} fill="#9ca3af">{years[i]}</text>
              </g>
            );
          })}
          {/* Label SMAG */}
          <text x={PL + w + 2} y={PT + h - (75000 / maxV) * h + 3} fontSize={8} fill="#9ca3af">SMAG</text>
        </svg>
      </div>
      <div className="mt-2 flex flex-wrap gap-4 text-xs text-gray-500">
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-[#2E7D32] inline-block" /> Salaire médian AGRIFRIK</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-gray-300 inline-block" /> SMAG CI (75 000 XOF — constant)</span>
      </div>
    </div>
  );
}

// ── KPI Score gouvernance ──────────────────────────────────────────────────────

function KpiGouv({ label, value, unit }: { label: string; value: string; unit?: string }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 flex flex-col gap-2">
      <p className="text-xs text-gray-500 font-medium">{label}</p>
      <p className="text-2xl font-bold text-[#2E7D32]">{value}<span className="text-sm font-medium text-gray-500 ml-1">{unit}</span></p>
    </div>
  );
}

// ── Tabs ───────────────────────────────────────────────────────────────────────

function TabEnvironnement() {
  return (
    <div className="space-y-6">
      <ChartBilanCarbone />

      {/* Biodiversité */}
      <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-800">Biodiversité</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#F8FBF8] text-gray-500 text-left">
                <th className="px-4 py-3 font-medium text-xs">Indicateur</th>
                <th className="px-4 py-3 font-medium text-xs">Valeur</th>
                <th className="px-4 py-3 font-medium text-xs">Objectif RA</th>
                <th className="px-4 py-3 font-medium text-xs text-center">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {BIODIVERSITE.map((b, i) => (
                <tr key={i} className="bg-white hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-gray-700 text-sm">{b.indicateur}</td>
                  <td className="px-4 py-3 text-gray-600 text-xs">{b.valeur}</td>
                  <td className="px-4 py-3 text-gray-500 text-xs">{b.objectif}</td>
                  <td className="px-4 py-3 text-center">
                    <span className="text-xs font-semibold text-emerald-600">✅</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ChartPhyto />
    </div>
  );
}

function TabSocial() {
  return (
    <div className="space-y-6">
      {/* Tableau emploi */}
      <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-800">Indicateurs emploi</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#F8FBF8] text-gray-500 text-left">
                <th className="px-4 py-3 font-medium text-xs">Indicateur</th>
                <th className="px-4 py-3 font-medium text-xs text-center">2023</th>
                <th className="px-4 py-3 font-medium text-xs text-center">2024</th>
                <th className="px-4 py-3 font-medium text-xs text-center">2025 YTD</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {EMPLOI.map((e, i) => (
                <tr key={i} className="bg-white hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-gray-700 text-sm">{e.indicateur}</td>
                  <td className="px-4 py-3 text-gray-500 text-xs text-center">{e.v2023}</td>
                  <td className="px-4 py-3 text-gray-600 text-xs text-center">{e.v2024}</td>
                  <td className="px-4 py-3 text-center">
                    <span className="font-semibold text-[#2E7D32] text-sm">{e.v2025}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ChartSalaires />

      {/* Actions communautaires */}
      <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-800">Actions communautaires 2025</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#F8FBF8] text-gray-500 text-left">
                <th className="px-4 py-3 font-medium text-xs">Action</th>
                <th className="px-4 py-3 font-medium text-xs text-center">Bénéficiaires</th>
                <th className="px-4 py-3 font-medium text-xs text-right">Coût</th>
                <th className="px-4 py-3 font-medium text-xs">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {ACTIONS_COMMUNAUTAIRES.map((a, i) => (
                <tr key={i} className="bg-white hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-gray-700 text-sm">{a.action}</td>
                  <td className="px-4 py-3 text-gray-600 text-xs text-center">{a.benef}</td>
                  <td className="px-4 py-3 text-gray-600 text-xs text-right font-mono">{a.cout}</td>
                  <td className="px-4 py-3">
                    {a.statut === "cours" ? (
                      <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">🔵 {a.label}</span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700">✅ {a.label}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function TabGouvernance() {
  return (
    <div className="space-y-6">
      {/* KPIs gouvernance */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiGouv label="Transparence financière" value="94" unit="/100" />
        <KpiGouv label="Conformité SYSCOHADA" value="100%" />
        <KpiGouv label="Conformité fiscale CI" value="100%" />
        <KpiGouv label="Score anti-corruption" value="98" unit="/100" />
      </div>

      {/* Certifications */}
      <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-800">Certifications et labels actifs</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#F8FBF8] text-gray-500 text-left">
                <th className="px-4 py-3 font-medium text-xs">Label</th>
                <th className="px-4 py-3 font-medium text-xs">Organisme</th>
                <th className="px-4 py-3 font-medium text-xs text-center">Validité</th>
                <th className="px-4 py-3 font-medium text-xs text-center">Score / Niveau</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {CERTIFICATIONS.map((c, i) => (
                <tr key={i} className="bg-white hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-semibold text-gray-800 text-sm">{c.label}</td>
                  <td className="px-4 py-3 text-gray-600 text-xs">{c.organisme}</td>
                  <td className="px-4 py-3 text-xs text-gray-500 text-center">{c.validite}</td>
                  <td className="px-4 py-3 text-center">
                    <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700">{c.score} ✅</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Rapport */}
      <div className="rounded-2xl border border-gray-100 bg-white p-5">
        <h3 className="text-sm font-semibold text-gray-800 mb-2">Rapport de gouvernance</h3>
        <p className="text-xs text-gray-500 mb-4 leading-relaxed">
          AGRIFRIK maintient des standards élevés de gouvernance avec une transparence financière certifiée par un expert-comptable agréé CI, une conformité fiscale 100% et une politique anti-corruption active. Le score de gouvernance de 94/100 reflète l'engagement de l'organisation envers les meilleures pratiques de gestion.
        </p>
        <button className="flex items-center gap-2 bg-[#2E7D32] text-white text-xs font-medium px-4 py-2.5 rounded-xl hover:bg-[#1B5E20] transition-colors">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Télécharger le rapport RSE 2024 complet (PDF)
        </button>
      </div>
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────

const TABS: { id: Tab; label: string }[] = [
  { id: "environnement", label: "Environnement" },
  { id: "social", label: "Social" },
  { id: "gouvernance", label: "Gouvernance" },
];

export default function RSEPage() {
  const [activeTab, setActiveTab] = useState<Tab>("environnement");

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Topbar title="RSE" breadcrumb={["Admin", "RSE"]} />

      <main className="flex-1 p-6 space-y-6">
        {/* En-tête */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold text-gray-900">RSE — Responsabilité Sociétale et Environnementale</h1>
            <p className="text-sm text-gray-500 mt-0.5">Bilan d&apos;impact 2025 — ODD &amp; Rainforest Alliance — EXP-001</p>
          </div>
          <span className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold px-3 py-1.5 rounded-full self-start whitespace-nowrap">
            🌿 Exploitation carbone-négative ✅
          </span>
        </div>

        {/* Onglets */}
        <div className="flex gap-1 bg-white border border-gray-100 rounded-2xl p-1.5 w-fit shadow-sm">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-150 ${
                activeTab === tab.id
                  ? "bg-[#2E7D32] text-white shadow-sm"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Contenu */}
        {activeTab === "environnement" && <TabEnvironnement />}
        {activeTab === "social"        && <TabSocial />}
        {activeTab === "gouvernance"   && <TabGouvernance />}
      </main>
    </div>
  );
}
