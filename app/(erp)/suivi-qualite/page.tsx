"use client";

import { useState } from "react";
import Topbar from "../../components/Topbar";

const TABS = ["Tableau de bord", "Contrôles", "Non-conformités", "Indicateurs"] as const;
type Tab = (typeof TABS)[number];

// ── SVG: Line chart évolution score qualité 12 mois ──────────────────────────
const scores = [
  { m: "Jul 24", v: 94.2 },
  { m: "Aoû", v: 93.8 },
  { m: "Sep", v: 95.1 },
  { m: "Oct", v: 96.4 },
  { m: "Nov", v: 97.2 },
  { m: "Déc", v: 96.8 },
  { m: "Jan 25", v: 95.4 },
  { m: "Fév", v: 96.1 },
  { m: "Mar", v: 96.8 },
  { m: "Avr", v: 97.0 },
  { m: "Mai", v: 96.4 },
  { m: "Jun", v: 96.2 },
];

function ScoreLineChart() {
  const W = 700, H = 220, PL = 48, PR = 20, PT = 16, PB = 36;
  const cW = W - PL - PR, cH = H - PT - PB;
  const minV = 92, maxV = 98;
  const xOf = (i: number) => PL + (i / (scores.length - 1)) * cW;
  const yOf = (v: number) => PT + ((maxV - v) / (maxV - minV)) * cH;

  const area =
    "M" + xOf(0) + "," + yOf(scores[0].v) + " " +
    scores.map((s, i) => "L" + xOf(i) + "," + yOf(s.v)).join(" ") +
    " L" + xOf(scores.length - 1) + "," + (PT + cH) +
    " L" + xOf(0) + "," + (PT + cH) + " Z";

  const pts = scores.map((s, i) => xOf(i) + "," + yOf(s.v)).join(" ");
  const thY = yOf(95);

  return (
    <svg viewBox={"0 0 " + W + " " + H} className="w-full" style={{ maxWidth: W }}>
      <path d={area} fill="#dcfce7" opacity="0.6" />
      {[92, 94, 95, 96, 97, 98].map((v) => (
        <g key={v}>
          <line x1={PL} y1={yOf(v)} x2={PL + cW} y2={yOf(v)} stroke="#e5e7eb" strokeWidth="1" />
          <text x={PL - 6} y={yOf(v) + 4} fontSize="10" fill="#9ca3af" textAnchor="end">{v}</text>
        </g>
      ))}
      <line x1={PL} y1={thY} x2={PL + cW} y2={thY} stroke="#ef4444" strokeWidth="1.2" strokeDasharray="5 4" />
      <text x={PL + cW - 2} y={thY - 4} fontSize="10" fill="#ef4444" textAnchor="end">Seuil Grade A min (95)</text>
      <polyline points={pts} fill="none" stroke="#2E7D32" strokeWidth="2.5" strokeLinejoin="round" />
      {scores.map((s, i) => (
        <circle key={i} cx={xOf(i)} cy={yOf(s.v)} r="3.5" fill="#2E7D32" />
      ))}
      {scores.map((s, i) => (
        <text key={i} x={xOf(i)} y={H - 4} fontSize="9" fill="#6b7280" textAnchor="middle">{s.m}</text>
      ))}
      <text x={xOf(11)} y={yOf(96.2) - 12} fontSize="11" fill="#166534" fontWeight="600">+2,0 pts vs Jul 2024</text>
    </svg>
  );
}

// ── SVG: Donut répartition grades ─────────────────────────────────────────────
function GradeDonut() {
  const cx = 140, cy = 140, R = 100, r = 60;
  const grades = [
    { label: "Grade AA", pct: 62, color: "#1B5E20" },
    { label: "Grade A", pct: 34, color: "#4CAF50" },
    { label: "Grade B", pct: 4, color: "#f59e0b" },
    { label: "Rejet", pct: 0, color: "#ef4444" },
  ];
  let cum = 0;
  const slices = grades.map((g) => {
    const start = cum;
    cum += g.pct;
    return { ...g, start, end: cum };
  });
  function arc(start: number, end: number) {
    if (end - start === 0) return "";
    const s = (start / 100) * 2 * Math.PI - Math.PI / 2;
    const e = (end / 100) * 2 * Math.PI - Math.PI / 2;
    const x1 = cx + R * Math.cos(s), y1 = cy + R * Math.sin(s);
    const x2 = cx + R * Math.cos(e), y2 = cy + R * Math.sin(e);
    const ix1 = cx + r * Math.cos(s), iy1 = cy + r * Math.sin(s);
    const ix2 = cx + r * Math.cos(e), iy2 = cy + r * Math.sin(e);
    const lg = end - start > 50 ? 1 : 0;
    return `M${x1},${y1} A${R},${R} 0 ${lg} 1 ${x2},${y2} L${ix2},${iy2} A${r},${r} 0 ${lg} 0 ${ix1},${iy1} Z`;
  }
  return (
    <div className="flex items-center gap-8">
      <svg viewBox="0 0 280 280" style={{ width: 180 }}>
        {slices.map((s) => s.pct > 0 && (
          <path key={s.label} d={arc(s.start, s.end)} fill={s.color} />
        ))}
        <circle cx={cx} cy={cy} r={r - 2} fill="white" />
        <text x={cx} y={cy - 6} textAnchor="middle" fontSize="22" fontWeight="700" fill="#1B5E20">96,2</text>
        <text x={cx} y={cy + 14} textAnchor="middle" fontSize="11" fill="#6b7280">Score moyen</text>
      </svg>
      <div className="space-y-3">
        {grades.map((g) => (
          <div key={g.label} className="flex items-center gap-2 text-sm">
            <span className="w-3 h-3 rounded-full inline-block" style={{ background: g.color }} />
            <span className="text-gray-700 w-20">{g.label}</span>
            <span className="font-semibold text-gray-900">{g.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── SVG: Pareto NC ────────────────────────────────────────────────────────────
const paretoData = [
  { label: "Certif./doc", count: 8, pct: 42 },
  { label: "Fermentation", count: 5, pct: 26 },
  { label: "Maintenance", count: 3, pct: 16 },
  { label: "Qualité eau", count: 2, pct: 11 },
  { label: "Autres", count: 1, pct: 5 },
];

function ParetoChart() {
  const W = 560, H = 220, PL = 44, PR = 50, PT = 16, PB = 40;
  const cW = W - PL - PR, cH = H - PT - PB;
  const maxCount = 8;
  const bW = cW / paretoData.length;
  let cum = 0;
  const cumPcts = paretoData.map((d) => { cum += d.pct; return cum; });
  const xOf = (i: number) => PL + i * bW + bW / 2;
  const yCountOf = (c: number) => PT + ((maxCount - c) / maxCount) * cH;
  const yCumOf = (p: number) => PT + ((100 - p) / 100) * cH;
  const linePts = paretoData.map((_, i) => xOf(i) + "," + yCumOf(cumPcts[i])).join(" ");
  return (
    <svg viewBox={"0 0 " + W + " " + H} className="w-full" style={{ maxWidth: W }}>
      {[0, 2, 4, 6, 8].map((v) => (
        <g key={v}>
          <line x1={PL} y1={yCountOf(v)} x2={PL + cW} y2={yCountOf(v)} stroke="#e5e7eb" strokeWidth="1" />
          <text x={PL - 4} y={yCountOf(v) + 4} fontSize="10" fill="#9ca3af" textAnchor="end">{v}</text>
        </g>
      ))}
      {[0, 25, 50, 75, 100].map((p) => (
        <text key={p} x={PL + cW + PR - 2} y={yCumOf(p) + 4} fontSize="10" fill="#6b7280" textAnchor="end">{p}%</text>
      ))}
      {paretoData.map((d, i) => (
        <rect key={i} x={PL + i * bW + 4} y={yCountOf(d.count)} width={bW - 8}
          height={yCountOf(0) - yCountOf(d.count)} fill="#4CAF50" rx="3" />
      ))}
      {paretoData.map((d, i) => (
        <text key={i} x={xOf(i)} y={H - 6} fontSize="9" fill="#6b7280" textAnchor="middle">{d.label}</text>
      ))}
      <polyline points={linePts} fill="none" stroke="#E65100" strokeWidth="2" />
      {paretoData.map((_, i) => (
        <circle key={i} cx={xOf(i)} cy={yCumOf(cumPcts[i])} r="3.5" fill="#E65100" />
      ))}
    </svg>
  );
}

// ── Static data ───────────────────────────────────────────────────────────────
const cutTests = [
  { lot: "LOT-2025-048", date: "11/07 J5", feveTotal: 85, brunes: "89%", violettes: "8%", ardoisees: "3%", moisies: "0%", score: "89/100", grade: "En cours", ok: false },
  { lot: "LOT-2025-047", date: "02/07", feveTotal: 100, brunes: "94%", violettes: "4%", ardoisees: "2%", moisies: "0%", score: "94/100", grade: "A", ok: true },
  { lot: "LOT-2025-046", date: "01/07", feveTotal: 100, brunes: "97%", violettes: "2%", ardoisees: "1%", moisies: "0%", score: "97/100", grade: "AA", ok: true },
  { lot: "LOT-2025-045", date: "30/06", feveTotal: 100, brunes: "96%", violettes: "3%", ardoisees: "1%", moisies: "0%", score: "96/100", grade: "AA", ok: true },
  { lot: "LOT-2025-044", date: "22/06", feveTotal: 100, brunes: "95%", violettes: "4%", ardoisees: "1%", moisies: "0%", score: "95/100", grade: "AA", ok: true },
  { lot: "LOT-2025-043", date: "15/06", feveTotal: 100, brunes: "93%", violettes: "5%", ardoisees: "2%", moisies: "0%", score: "93/100", grade: "A", ok: true },
];

const controlesPlanifies = [
  { lot: "LOT-2025-048", stade: "J6 final", date: "12/07", controleur: "Adjoua M.", statut: "⏳ Demain" },
  { lot: "LOT-2025-047", stade: "Avant expédition", date: "14/07", controleur: "Adjoua M.", statut: "📅 Planifié" },
];

const nonConformites = [
  { id: "NC-2025-003", date: "08/07", type: "Certificat eau", desc: "Analyse CIAPOL expirée", crit: "Critique", critColor: "#ef4444", assigne: "Adjoua M.", deadline: "18/07", statut: "En cours" },
  { id: "NC-2025-004", date: "09/07", type: "Maintenance", desc: "MAT-001 non disponible", crit: "Important", critColor: "#f59e0b", assigne: "Bamba O.", deadline: "15/07", statut: "Pièces commandées" },
  { id: "NC-2025-005", date: "02/07", type: "Fermentation", desc: "LOT-047 score J6=89% (seuil 90%) → Grade A", crit: "Info", critColor: "#22c55e", assigne: "Ibrahim S.", deadline: "—", statut: "Classée" },
  { id: "NC-2025-006", date: "01/07", type: "Documentation", desc: "Registre épandage non à jour — 3 interventions mai", crit: "Important", critColor: "#f59e0b", assigne: "Konan Y.", deadline: "15/07", statut: "En cours" },
];

const indicateurs = [
  { ind: "Score qualité moyen", y2023: "93,8", y2024: "95,4", cible2025: "≥96", ytd2025: "96,2", trend: "✅ Atteint" },
  { ind: "% Grade AA", y2023: "48%", y2024: "58%", cible2025: "≥60%", ytd2025: "62%", trend: "✅ Atteint" },
  { ind: "Taux rejet", y2023: "0,8%", y2024: "0,2%", cible2025: "0%", ytd2025: "0%", trend: "✅" },
  { ind: "NC pour 100 lots", y2023: "4,2", y2024: "3,1", cible2025: "≤3", ytd2025: "2,4", trend: "✅ En bonne voie" },
  { ind: "Délai résolution NC", y2023: "18j", y2024: "12j", cible2025: "≤10j", ytd2025: "9,4j", trend: "✅" },
  { ind: "Taux first-pass quality", y2023: "82%", y2024: "89%", cible2025: "≥90%", ytd2025: "91%", trend: "✅" },
];

const processSteps = [
  { n: 1, label: "Récolte" },
  { n: 2, label: "Pré-fermentation" },
  { n: 3, label: "Suivi J2/J4/J6" },
  { n: 4, label: "Cut test fermentation" },
  { n: 5, label: "Contrôle séchage" },
  { n: 6, label: "Cut test final" },
  { n: 7, label: "Conditionnement" },
  { n: 8, label: "Certification" },
];

// ── Main component ────────────────────────────────────────────────────────────
export default function SuiviQualitePage() {
  const [activeTab, setActiveTab] = useState<Tab>("Tableau de bord");
  const [form, setForm] = useState({
    lot: "", stade: "", controleur: "", dateHeure: "", brunes: "", violettes: "",
    ardoisees: "", moisies: "", humidite: "", temperature: "", observations: "", conformite: "conforme",
  });

  const kpis = [
    { label: "Score qualité moyen", value: "96,2/100", badge: "✅" },
    { label: "Lots contrôlés YTD", value: "48", sub: "95,8% Grade AA/A" },
    { label: "Taux rejet", value: "0%", badge: "✅" },
    { label: "NC ouvertes", value: "4", sub: "dont 1 critique" },
    { label: "Prochaine dégustation", value: "22/07", sub: "Barry Callebaut" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Topbar breadcrumb={["Commerce", "Suivi Qualité"]} />

      <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Suivi Qualité</h1>
          <p className="text-sm text-gray-500 mt-1">Système de gestion de la qualité cacao</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-white rounded-xl border border-gray-100 p-1 w-fit">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === t ? "bg-[#2E7D32] text-white" : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* ── Tableau de bord ───────────────────────────────────────────── */}
        {activeTab === "Tableau de bord" && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {kpis.map((k) => (
                <div key={k.label} className="rounded-2xl border border-gray-100 bg-white p-5">
                  <p className="text-xs text-gray-500 mb-1">{k.label}</p>
                  <p className="text-xl font-bold text-gray-900">
                    {k.value} {k.badge && <span className="text-base">{k.badge}</span>}
                  </p>
                  {k.sub && <p className="text-xs text-gray-400 mt-0.5">{k.sub}</p>}
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-5">
              <h2 className="text-sm font-semibold text-gray-700 mb-4">Évolution score qualité — 12 mois</h2>
              <ScoreLineChart />
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-5">
              <h2 className="text-sm font-semibold text-gray-700 mb-4">Répartition grades YTD 2025</h2>
              <GradeDonut />
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-5">
              <h2 className="text-sm font-semibold text-gray-700 mb-4">Cut test — 6 derniers lots</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#F8FBF8]">
                      {["Lot", "Date", "Fèves", "Brunes", "Violettes", "Ardoisées", "Moisies", "Score", "Grade"].map((h) => (
                        <th key={h} className="px-3 py-2 text-left text-xs font-medium text-gray-500">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {cutTests.map((r) => (
                      <tr key={r.lot} className="border-t border-gray-50 hover:bg-gray-50">
                        <td className="px-3 py-2 font-medium text-gray-900">{r.lot}</td>
                        <td className="px-3 py-2 text-gray-600">{r.date}</td>
                        <td className="px-3 py-2 text-gray-600">{r.feveTotal}</td>
                        <td className="px-3 py-2 text-gray-600">{r.brunes}</td>
                        <td className="px-3 py-2 text-gray-600">{r.violettes}</td>
                        <td className="px-3 py-2 text-gray-600">{r.ardoisees}</td>
                        <td className="px-3 py-2 text-gray-600">{r.moisies}</td>
                        <td className="px-3 py-2 font-semibold text-gray-800">{r.score}</td>
                        <td className="px-3 py-2">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                            r.ok ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"
                          }`}>
                            {r.grade} {r.ok ? "✅" : "⚠️"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ── Contrôles ─────────────────────────────────────────────────── */}
        {activeTab === "Contrôles" && (
          <div className="space-y-6">
            <div className="rounded-2xl border border-gray-100 bg-white p-5">
              <h2 className="text-sm font-semibold text-gray-700 mb-5">Process qualité cacao — 8 étapes</h2>
              <div className="flex items-center overflow-x-auto pb-2">
                {processSteps.map((s, i) => (
                  <div key={s.n} className="flex items-center">
                    <div className="flex flex-col items-center min-w-[90px]">
                      <div className="w-9 h-9 rounded-full bg-[#2E7D32] text-white flex items-center justify-center text-sm font-bold shadow">
                        {s.n}
                      </div>
                      <p className="text-xs text-center text-gray-600 mt-1.5 leading-tight">{s.label}</p>
                    </div>
                    {i < processSteps.length - 1 && (
                      <div className="w-8 h-0.5 bg-[#4CAF50] flex-shrink-0 -mt-4" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-5">
              <h2 className="text-sm font-semibold text-gray-700 mb-4">Saisie d&apos;un contrôle</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { label: "N° lot", key: "lot", placeholder: "LOT-2025-049" },
                  { label: "Stade", key: "stade", placeholder: "J2 / J4 / J6 / Final" },
                  { label: "Contrôleur", key: "controleur", placeholder: "Nom du contrôleur" },
                  { label: "Date / heure", key: "dateHeure", placeholder: "", type: "datetime-local" },
                  { label: "% Brunes", key: "brunes", placeholder: "ex: 94" },
                  { label: "% Violettes", key: "violettes", placeholder: "ex: 4" },
                  { label: "% Ardoisées", key: "ardoisees", placeholder: "ex: 2" },
                  { label: "% Moisies", key: "moisies", placeholder: "ex: 0" },
                  { label: "Humidité %", key: "humidite", placeholder: "ex: 7.5" },
                  { label: "Température bac °C", key: "temperature", placeholder: "ex: 45" },
                ].map((f) => (
                  <div key={f.key}>
                    <label className="block text-xs font-medium text-gray-600 mb-1">{f.label}</label>
                    <input
                      type={f.type ?? "text"}
                      placeholder={f.placeholder}
                      value={(form as Record<string, string>)[f.key]}
                      onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#2E7D32]"
                    />
                  </div>
                ))}
                <div className="md:col-span-3">
                  <label className="block text-xs font-medium text-gray-600 mb-1">Observations</label>
                  <textarea
                    rows={2}
                    placeholder="Observations particulières..."
                    value={form.observations}
                    onChange={(e) => setForm({ ...form, observations: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#2E7D32]"
                  />
                </div>
                <div className="md:col-span-3">
                  <label className="block text-xs font-medium text-gray-600 mb-2">Conformité</label>
                  <div className="flex gap-6">
                    {["conforme", "non-conforme"].map((v) => (
                      <label key={v} className="flex items-center gap-2 text-sm cursor-pointer">
                        <input
                          type="radio"
                          name="conformite"
                          value={v}
                          checked={form.conformite === v}
                          onChange={() => setForm({ ...form, conformite: v })}
                          className="accent-[#2E7D32]"
                        />
                        <span className="capitalize">{v}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-5">
                <button className="bg-[#2E7D32] text-white rounded-xl text-xs font-medium px-5 py-2.5 hover:bg-[#1B5E20] transition-colors">
                  Enregistrer le contrôle
                </button>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-5">
              <h2 className="text-sm font-semibold text-gray-700 mb-4">Contrôles planifiés cette semaine</h2>
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#F8FBF8]">
                    {["Lot", "Stade", "Date", "Contrôleur", "Statut"].map((h) => (
                      <th key={h} className="px-3 py-2 text-left text-xs font-medium text-gray-500">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {controlesPlanifies.map((c) => (
                    <tr key={c.lot + c.stade} className="border-t border-gray-50">
                      <td className="px-3 py-2 font-medium text-gray-900">{c.lot}</td>
                      <td className="px-3 py-2 text-gray-600">{c.stade}</td>
                      <td className="px-3 py-2 text-gray-600">{c.date}</td>
                      <td className="px-3 py-2 text-gray-600">{c.controleur}</td>
                      <td className="px-3 py-2 text-gray-600">{c.statut}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── Non-conformités ───────────────────────────────────────────── */}
        {activeTab === "Non-conformités" && (
          <div className="space-y-6">
            <div className="rounded-2xl border border-gray-100 bg-white p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-gray-700">Non-conformités — 4 ouvertes</h2>
                <button className="bg-[#2E7D32] text-white rounded-xl text-xs font-medium px-4 py-2">
                  + Nouvelle NC
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#F8FBF8]">
                      {["N°", "Date", "Type", "Description", "Criticité", "Assigné", "Deadline", "Statut"].map((h) => (
                        <th key={h} className="px-3 py-2 text-left text-xs font-medium text-gray-500">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {nonConformites.map((nc) => (
                      <tr key={nc.id} className="border-t border-gray-50 hover:bg-gray-50">
                        <td className="px-3 py-2 font-medium text-gray-900 whitespace-nowrap">{nc.id}</td>
                        <td className="px-3 py-2 text-gray-600 whitespace-nowrap">{nc.date}</td>
                        <td className="px-3 py-2 text-gray-600 whitespace-nowrap">{nc.type}</td>
                        <td className="px-3 py-2 text-gray-600 max-w-xs">{nc.desc}</td>
                        <td className="px-3 py-2 whitespace-nowrap">
                          <span
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium"
                            style={{ background: nc.critColor + "22", color: nc.critColor }}
                          >
                            {nc.crit}
                          </span>
                        </td>
                        <td className="px-3 py-2 text-gray-600 whitespace-nowrap">{nc.assigne}</td>
                        <td className="px-3 py-2 text-gray-600 whitespace-nowrap">{nc.deadline}</td>
                        <td className="px-3 py-2 text-gray-600 whitespace-nowrap">{nc.statut}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-5">
              <h2 className="text-sm font-semibold text-gray-700 mb-4">Pareto — Types de NC 2024-2025</h2>
              <ParetoChart />
              <p className="text-xs text-gray-400 mt-2">Barres vertes = nombre de NC | Courbe orange = % cumulé</p>
            </div>
          </div>
        )}

        {/* ── Indicateurs ───────────────────────────────────────────────── */}
        {activeTab === "Indicateurs" && (
          <div className="space-y-6">
            <div className="rounded-2xl border border-gray-100 bg-white p-5">
              <h2 className="text-sm font-semibold text-gray-700 mb-4">KPIs qualité — vue pluriannuelle</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#F8FBF8]">
                      {["Indicateur", "2023", "2024", "Cible 2025", "YTD 2025", "Tendance"].map((h) => (
                        <th key={h} className="px-3 py-2 text-left text-xs font-medium text-gray-500">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {indicateurs.map((row) => (
                      <tr key={row.ind} className="border-t border-gray-50 hover:bg-gray-50">
                        <td className="px-3 py-2 font-medium text-gray-900">{row.ind}</td>
                        <td className="px-3 py-2 text-gray-500">{row.y2023}</td>
                        <td className="px-3 py-2 text-gray-600">{row.y2024}</td>
                        <td className="px-3 py-2 text-gray-500 font-medium">{row.cible2025}</td>
                        <td className="px-3 py-2 font-bold text-[#2E7D32]">{row.ytd2025}</td>
                        <td className="px-3 py-2 text-sm">{row.trend}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { title: "Qualité produit", value: "6/6", sub: "Tous indicateurs atteints", color: "text-green-700", bg: "bg-green-50 border-green-100" },
                { title: "Performance NC", value: "2,4 / 100 lots", sub: "Cible ≤3 atteinte", color: "text-green-700", bg: "bg-green-50 border-green-100" },
                { title: "Délai résolution", value: "9,4 jours", sub: "Cible ≤10j atteinte", color: "text-green-700", bg: "bg-green-50 border-green-100" },
              ].map((c) => (
                <div key={c.title} className={"rounded-2xl border p-5 " + c.bg}>
                  <p className="text-xs text-gray-500 mb-1">{c.title}</p>
                  <p className={"text-2xl font-bold " + c.color}>{c.value}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{c.sub}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
