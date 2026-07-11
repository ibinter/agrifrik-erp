"use client";

import { useState } from "react";
import Topbar from "../../components/Topbar";
import { ChevronRight, AlertTriangle, CheckCircle, Clock, Thermometer, Droplets, Award } from "lucide-react";

const TABS = ["Vue d'ensemble", "Fermentation", "Séchage", "Qualité finale"] as const;
type Tab = typeof TABS[number];

// ── SVG Pipeline ──────────────────────────────────────────────────────────────
function PipelineSVG() {
  const steps = [
    { label: "Récolte", x: 60 },
    { label: "Fermentation", x: 180 },
    { label: "Séchage", x: 300 },
    { label: "Classement", x: 420 },
    { label: "Conditionnement", x: 540 },
    { label: "Export", x: 660 },
  ];
  const progress = [100, 83, 90, 100, 100, 0];
  const colors = ["#4CAF50", "#2E7D32", "#F59E0B", "#4CAF50", "#4CAF50", "#E5E7EB"];

  return (
    <svg viewBox="0 0 760 160" xmlns="http://www.w3.org/2000/svg" className="w-full">
      {/* connector line */}
      <line x1="60" y1="52" x2="700" y2="52" stroke="#D1D5DB" strokeWidth="2" strokeDasharray="6 3" />
      {steps.map((s, i) => (
        <g key={s.label}>
          {/* circle */}
          <circle cx={s.x} cy={52} r={22} fill={colors[i]} opacity={i === 5 ? 0.25 : 1} />
          <text x={s.x} y={57} textAnchor="middle" fill="white" fontSize="11" fontWeight="700">
            {i + 1}
          </text>
          {/* label */}
          <text x={s.x} y={88} textAnchor="middle" fill="#374151" fontSize="9" fontWeight="600">
            {s.label.split(" ").map((w, wi) => (
              <tspan key={wi} x={s.x} dy={wi === 0 ? 0 : 12}>{w}</tspan>
            ))}
          </text>
          {/* progress bar */}
          <rect x={s.x - 22} y={118} width={44} height={6} rx={3} fill="#E5E7EB" />
          <rect x={s.x - 22} y={118} width={Math.round(44 * progress[i] / 100)} height={6} rx={3} fill={colors[i]} opacity={i === 5 ? 0.3 : 1} />
          <text x={s.x} y={140} textAnchor="middle" fill="#6B7280" fontSize="8">{progress[i]}%</text>
        </g>
      ))}
      {/* lot indicators */}
      <circle cx={180} cy={22} r={7} fill="#3B82F6" />
      <text x={197} y={26} fill="#3B82F6" fontSize="9" fontWeight="600">LOT-048 J5</text>
      <circle cx={300} cy={22} r={7} fill="#F59E0B" />
      <text x={317} y={26} fill="#F59E0B" fontSize="9" fontWeight="600">LOT-047 J8</text>
    </svg>
  );
}

// ── SVG Température fermentation ──────────────────────────────────────────────
function FermentationTempSVG() {
  const data = [28, 34, 46, 52, 48, 44];
  const W = 420, H = 200, PL = 45, PR = 20, PT = 20, PB = 35;
  const iW = W - PL - PR, iH = H - PT - PB;
  const minT = 20, maxT = 60;
  const toX = (i: number) => PL + (i / (data.length - 1)) * iW;
  const toY = (v: number) => PT + iH - ((v - minT) / (maxT - minT)) * iH;
  const path = data.map((v, i) => `${i === 0 ? "M" : "L"}${toX(i)},${toY(v)}`).join(" ");
  const optY1 = toY(52), optY2 = toY(44);
  const danY = toY(38);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} xmlns="http://www.w3.org/2000/svg" className="w-full max-w-lg">
      {/* zones */}
      <rect x={PL} y={optY1} width={iW} height={optY2 - optY1} fill="#D1FAE5" opacity="0.6" />
      <rect x={PL} y={danY} width={iW} height={iH - (danY - PT)} fill="#FEE2E2" opacity="0.4" />
      {/* axes */}
      <line x1={PL} y1={PT} x2={PL} y2={PT + iH} stroke="#9CA3AF" strokeWidth="1" />
      <line x1={PL} y1={PT + iH} x2={PL + iW} y2={PT + iH} stroke="#9CA3AF" strokeWidth="1" />
      {/* y labels */}
      {[20, 30, 40, 50, 60].map(v => (
        <g key={v}>
          <text x={PL - 5} y={toY(v) + 4} textAnchor="end" fontSize="9" fill="#6B7280">{v}°</text>
          <line x1={PL} y1={toY(v)} x2={PL + iW} y2={toY(v)} stroke="#F3F4F6" strokeWidth="1" />
        </g>
      ))}
      {/* x labels */}
      {data.map((_, i) => (
        <text key={i} x={toX(i)} y={H - 8} textAnchor="middle" fontSize="9" fill="#6B7280">J{i}</text>
      ))}
      {/* zone labels */}
      <text x={PL + iW - 5} y={optY1 + 12} textAnchor="end" fontSize="8" fill="#059669">Zone optimale 44-52°C</text>
      <text x={PL + iW - 5} y={danY - 4} textAnchor="end" fontSize="8" fill="#EF4444">Insuffisant &lt;38°C</text>
      {/* curve */}
      <path d={path} fill="none" stroke="#2E7D32" strokeWidth="2.5" strokeLinejoin="round" />
      {data.map((v, i) => (
        <g key={i}>
          <circle cx={toX(i)} cy={toY(v)} r={4} fill="#2E7D32" />
          <text x={toX(i)} y={toY(v) - 8} textAnchor="middle" fontSize="9" fill="#1B5E20" fontWeight="600">{v}°</text>
        </g>
      ))}
    </svg>
  );
}

// ── SVG Courbe séchage ────────────────────────────────────────────────────────
function SechageSVG() {
  const data = [58, 48, 38, 29, 22, 16, 12, 9.4, 7.8];
  const W = 420, H = 200, PL = 45, PR = 20, PT = 20, PB = 35;
  const iW = W - PL - PR, iH = H - PT - PB;
  const minV = 0, maxV = 65;
  const toX = (i: number) => PL + (i / (data.length - 1)) * iW;
  const toY = (v: number) => PT + iH - ((v - minV) / (maxV - minV)) * iH;
  const path = data.map((v, i) => `${i === 0 ? "M" : "L"}${toX(i)},${toY(v)}`).join(" ");
  const area = `${path} L${toX(data.length - 1)},${toY(0)} L${toX(0)},${toY(0)} Z`;
  const objY = toY(7.5);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} xmlns="http://www.w3.org/2000/svg" className="w-full max-w-lg">
      <defs>
        <linearGradient id="sgGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2E7D32" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#2E7D32" stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <line x1={PL} y1={PT} x2={PL} y2={PT + iH} stroke="#9CA3AF" strokeWidth="1" />
      <line x1={PL} y1={PT + iH} x2={PL + iW} y2={PT + iH} stroke="#9CA3AF" strokeWidth="1" />
      {[0, 20, 40, 60].map(v => (
        <g key={v}>
          <text x={PL - 5} y={toY(v) + 4} textAnchor="end" fontSize="9" fill="#6B7280">{v}%</text>
          <line x1={PL} y1={toY(v)} x2={PL + iW} y2={toY(v)} stroke="#F3F4F6" strokeWidth="1" />
        </g>
      ))}
      {data.map((_, i) => (
        <text key={i} x={toX(i)} y={H - 8} textAnchor="middle" fontSize="9" fill="#6B7280">J{i}</text>
      ))}
      {/* objectif line */}
      <line x1={PL} y1={objY} x2={PL + iW} y2={objY} stroke="#EF4444" strokeWidth="1.5" strokeDasharray="5 3" />
      <text x={PL + iW - 5} y={objY - 4} textAnchor="end" fontSize="8" fill="#EF4444">Objectif 7,5%</text>
      <path d={area} fill="url(#sgGrad)" />
      <path d={path} fill="none" stroke="#2E7D32" strokeWidth="2.5" strokeLinejoin="round" />
      {data.map((v, i) => (
        <g key={i}>
          <circle cx={toX(i)} cy={toY(v)} r={3.5} fill="#2E7D32" />
          <text x={toX(i)} y={toY(v) - 7} textAnchor="middle" fontSize="8" fill="#1B5E20">{v}%</text>
        </g>
      ))}
    </svg>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function TransformationPage() {
  const [tab, setTab] = useState<Tab>("Vue d'ensemble");

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-[#F8FBF8]">
      <Topbar />
      <div className="p-6 flex-1">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
          <span>Commerce</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-[#2E7D32] font-medium">Transformation & Post-récolte</span>
        </div>
        <h1 className="text-xl font-bold text-gray-800 mb-5">Transformation & Post-récolte Cacao</h1>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 border-b border-gray-200">
          {TABS.map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                tab === t
                  ? "border-b-2 border-[#2E7D32] text-[#2E7D32]"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* ── Vue d'ensemble ── */}
        {tab === "Vue d'ensemble" && (
          <div className="space-y-6">
            {/* KPIs */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { label: "Lots en cours", value: "2", sub: "LOT-048 ferm. J5 · LOT-047 séch. J8", icon: <Clock className="w-5 h-5 text-blue-500" /> },
                { label: "Lots traités YTD", value: "47", sub: "depuis le 01/01/2025", icon: <CheckCircle className="w-5 h-5 text-green-600" /> },
                { label: "Volume transformé YTD", value: "86,2 t", sub: "cacao sec", icon: <Thermometer className="w-5 h-5 text-[#2E7D32]" /> },
                { label: "Score qualité moyen", value: "96,2/100", sub: "évaluation cut test", icon: <Award className="w-5 h-5 text-amber-500" /> },
                { label: "Taux Grade AA", value: "62%", sub: "des lots classifiés", icon: <Award className="w-5 h-5 text-[#2E7D32]" /> },
              ].map(k => (
                <div key={k.label} className="rounded-2xl border border-gray-100 bg-white p-5">
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-xs text-gray-500">{k.label}</span>
                    {k.icon}
                  </div>
                  <div className="text-2xl font-bold text-gray-800">{k.value}</div>
                  <div className="text-xs text-gray-400 mt-1">{k.sub}</div>
                </div>
              ))}
            </div>

            {/* Pipeline SVG */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5">
              <h2 className="text-sm font-semibold text-gray-700 mb-3">Pipeline de transformation actuel</h2>
              <PipelineSVG />
            </div>

            {/* Lots actifs */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5">
              <h2 className="text-sm font-semibold text-gray-700 mb-3">Lots actifs</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-[#F8FBF8]">
                      {["Lot", "Étape", "Avancement", "Début", "ETA sortie", "Responsable", "Score actuel", "Alerte"].map(h => (
                        <th key={h} className="text-left px-3 py-2 font-medium text-gray-600">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-gray-50">
                      <td className="px-3 py-2 font-medium text-[#2E7D32]">LOT-2025-048</td>
                      <td className="px-3 py-2">Fermentation J5/6</td>
                      <td className="px-3 py-2">
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-gray-200 rounded-full h-1.5">
                            <div className="bg-[#2E7D32] h-1.5 rounded-full" style={{ width: "83%" }} />
                          </div>
                          <span>83%</span>
                        </div>
                      </td>
                      <td className="px-3 py-2">06/07</td>
                      <td className="px-3 py-2">13/07 <span className="text-gray-400">(demain)</span></td>
                      <td className="px-3 py-2">Ibrahim S.</td>
                      <td className="px-3 py-2">89% brunes</td>
                      <td className="px-3 py-2"><span className="text-amber-500 flex items-center gap-1"><AlertTriangle className="w-3 h-3" />J6 demain</span></td>
                    </tr>
                    <tr className="border-t border-gray-50">
                      <td className="px-3 py-2 font-medium text-[#2E7D32]">LOT-2025-047</td>
                      <td className="px-3 py-2">Séchage J8/9</td>
                      <td className="px-3 py-2">
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-gray-200 rounded-full h-1.5">
                            <div className="bg-amber-400 h-1.5 rounded-full" style={{ width: "90%" }} />
                          </div>
                          <span>90%</span>
                        </div>
                      </td>
                      <td className="px-3 py-2">02/07</td>
                      <td className="px-3 py-2">12/07 <span className="text-green-600">(aujourd'hui)</span></td>
                      <td className="px-3 py-2">Ibrahim S.</td>
                      <td className="px-3 py-2">7,8% humidité</td>
                      <td className="px-3 py-2"><span className="text-green-600 flex items-center gap-1"><CheckCircle className="w-3 h-3" />OK</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* 10 derniers lots */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5">
              <h2 className="text-sm font-semibold text-gray-700 mb-3">10 derniers lots traités</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-[#F8FBF8]">
                      {["Lot", "Volume entrée", "Volume sortie", "Rendement", "Grade", "Score", "Date sortie"].map(h => (
                        <th key={h} className="text-left px-3 py-2 font-medium text-gray-600">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { lot: "LOT-2025-046", ve: "3 020 kg", vs: "964 kg", r: "31,9%", g: "AA", s: "97/100", d: "01/07" },
                      { lot: "LOT-2025-045", ve: "2 850 kg", vs: "912 kg", r: "32,0%", g: "AA", s: "96/100", d: "30/06", note: "exporté" },
                      { lot: "LOT-2025-044", ve: "2 640 kg", vs: "845 kg", r: "32,0%", g: "AA", s: "95/100", d: "22/06" },
                      { lot: "LOT-2025-043", ve: "2 980 kg", vs: "952 kg", r: "31,9%", g: "A", s: "93/100", d: "15/06" },
                      { lot: "LOT-2025-042", ve: "2 720 kg", vs: "870 kg", r: "32,0%", g: "A", s: "89/100", d: "08/06" },
                      { lot: "LOT-2025-041", ve: "3 100 kg", vs: "990 kg", r: "31,9%", g: "AA", s: "96/100", d: "01/06" },
                      { lot: "LOT-2025-040", ve: "2 900 kg", vs: "928 kg", r: "32,0%", g: "AA", s: "97/100", d: "24/05" },
                      { lot: "LOT-2025-039", ve: "2 600 kg", vs: "832 kg", r: "32,0%", g: "AA", s: "95/100", d: "17/05" },
                      { lot: "LOT-2025-038", ve: "3 050 kg", vs: "976 kg", r: "32,0%", g: "AA", s: "98/100", d: "10/05" },
                      { lot: "LOT-2025-037", ve: "2 800 kg", vs: "896 kg", r: "32,0%", g: "A", s: "92/100", d: "03/05" },
                    ].map((row) => (
                      <tr key={row.lot} className="border-t border-gray-50 hover:bg-gray-50">
                        <td className="px-3 py-2 font-medium text-[#2E7D32]">{row.lot}</td>
                        <td className="px-3 py-2 text-gray-500">{row.ve}</td>
                        <td className="px-3 py-2">{row.vs}</td>
                        <td className="px-3 py-2">{row.r}</td>
                        <td className="px-3 py-2">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${row.g === "AA" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}`}>{row.g}</span>
                        </td>
                        <td className="px-3 py-2 font-medium">{row.s}</td>
                        <td className="px-3 py-2 text-gray-500">{row.d}{row.note && <span className="ml-1 text-xs text-gray-400">({row.note})</span>}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ── Fermentation ── */}
        {tab === "Fermentation" && (
          <div className="space-y-6">
            {/* Procédure */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5">
              <h2 className="text-sm font-semibold text-gray-700 mb-4">Procédure fermentation AGRIFRIK <span className="text-xs text-gray-400 font-normal ml-1">(standard RA + CNRA CI)</span></h2>
              <div className="flex items-start gap-0 overflow-x-auto pb-2">
                {[
                  { day: "J0", label: "Mise en bacs", color: "#2E7D32" },
                  { day: "J2", label: "Retournement", color: "#388E3C" },
                  { day: "J4", label: "Retournement", color: "#43A047" },
                  { day: "J5", label: "Cut test intermédiaire", color: "#F59E0B" },
                  { day: "J6", label: "Cut test final", color: "#EF4444" },
                  { day: "J6+", label: "Transfert séchage", color: "#6B7280" },
                ].map((s, i, arr) => (
                  <div key={s.day} className="flex items-center">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: s.color }}>{s.day}</div>
                      <div className="text-xs text-gray-600 mt-1 text-center max-w-16 leading-tight">{s.label}</div>
                    </div>
                    {i < arr.length - 1 && <div className="w-8 h-0.5 bg-gray-300 mx-1 mt-[-16px]" />}
                  </div>
                ))}
              </div>
            </div>

            {/* Suivi lot actif */}
            <div className="rounded-2xl border border-green-100 bg-green-50 p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-[#1B5E20]">Suivi en temps réel — LOT-2025-048</h2>
                <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">En cours · J5</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs mb-5">
                <div><span className="text-gray-500">Démarré :</span> <span className="font-medium">06/07/2025 à 08h00</span></div>
                <div><span className="text-gray-500">Bac A1 :</span> <span className="font-medium">1 500 kg</span></div>
                <div><span className="text-gray-500">Bac A3 :</span> <span className="font-medium">1 140 kg</span></div>
                <div><span className="text-gray-500">Total :</span> <span className="font-medium">2 640 kg</span></div>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-2 text-xs text-amber-700 flex items-center gap-2 mb-4">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>Aujourd'hui J5 (11/07) — <strong>Demain J6 (12/07) → Cut test final prévu à 07h00</strong></span>
              </div>

              {/* Tableau suivi J0→J5 */}
              <div className="overflow-x-auto">
                <table className="w-full text-xs bg-white rounded-xl overflow-hidden">
                  <thead>
                    <tr className="bg-[#F8FBF8]">
                      {["Jour", "Date", "T° mesurée", "Retournement", "pH (estimé)", "Observation"].map(h => (
                        <th key={h} className="text-left px-3 py-2 font-medium text-gray-600">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { j: "J0", d: "06/07", t: "28°C", r: "Mise en bacs 08h00", ph: "5,2", obs: "Fèves fraîches bien égouttées" },
                      { j: "J1", d: "07/07", t: "34°C", r: "—", ph: "4,8", obs: "Montée température correcte" },
                      { j: "J2", d: "08/07", t: "46°C", r: "✅ 06h30", ph: "4,4", obs: "Retournement + répartition uniforme" },
                      { j: "J3", d: "09/07", t: "52°C ✅", r: "—", ph: "4,1", obs: "Température optimale atteinte" },
                      { j: "J4", d: "10/07", t: "48°C", r: "✅ 06h15", ph: "4,0", obs: "Légère baisse normale J4" },
                      { j: "J5", d: "11/07", t: "44°C", r: "—", ph: "3,9", obs: "Cut test J5 : 89% brunes — dans normes", highlight: true },
                    ].map(row => (
                      <tr key={row.j} className={`border-t border-gray-50 ${row.highlight ? "bg-green-50" : ""}`}>
                        <td className="px-3 py-2 font-bold text-[#2E7D32]">{row.j}</td>
                        <td className="px-3 py-2 text-gray-500">{row.d}</td>
                        <td className="px-3 py-2 font-medium">{row.t}</td>
                        <td className="px-3 py-2">{row.r}</td>
                        <td className="px-3 py-2">{row.ph}</td>
                        <td className="px-3 py-2 text-gray-600">{row.obs}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Courbe température */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5">
              <h2 className="text-sm font-semibold text-gray-700 mb-3">Courbe de température fermentation — LOT-2025-048</h2>
              <FermentationTempSVG />
            </div>
          </div>
        )}

        {/* ── Séchage ── */}
        {tab === "Séchage" && (
          <div className="space-y-6">
            {/* Procédure */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5">
              <h2 className="text-sm font-semibold text-gray-700 mb-2">Procédure séchage</h2>
              <p className="text-xs text-gray-600">
                <strong>Objectif :</strong> 7,0–7,5% humidité finale. Séchage solaire 3–4 jours + séchage artificiel si nécessaire (température max 45°C).
              </p>
            </div>

            {/* Suivi LOT-047 */}
            <div className="rounded-2xl border border-amber-100 bg-amber-50 p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-amber-900">Suivi LOT-2025-047 — Séchage J8</h2>
                <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full font-medium flex items-center gap-1"><CheckCircle className="w-3 h-3" />Objectif atteint</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs mb-4">
                <div><span className="text-gray-500">Volume entrant :</span><br /><span className="font-bold text-gray-800">3 020 kg</span><br /><span className="text-gray-400">fèves fermentées</span></div>
                <div><span className="text-gray-500">Humidité initiale (J0) :</span><br /><span className="font-bold text-gray-800">58%</span></div>
                <div><span className="text-gray-500">Humidité J8 (08h00) :</span><br /><span className="font-bold text-green-700 text-base">7,8% ✅</span></div>
                <div><span className="text-gray-500">Décision :</span><br /><span className="font-bold text-gray-800">Arrêt séchage ce matin</span><br /><span className="text-gray-400">Classement cet après-midi</span></div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-xs mb-4">
                <div><span className="text-gray-500">Méthode :</span><br /><span className="font-medium">5j solaire (24-28/06) + 3j artificiel 42°C (29/06–01/07)</span></div>
                <div><span className="text-gray-500">Surface claies :</span><br /><span className="font-medium">8 claies × 3 m² = 24 m²</span></div>
                <div><span className="text-gray-500">Épaisseur couche :</span><br /><span className="font-medium">4 cm</span></div>
              </div>

              {/* Tableau humidité */}
              <div className="overflow-x-auto">
                <table className="w-full text-xs bg-white rounded-xl overflow-hidden">
                  <thead>
                    <tr className="bg-[#F8FBF8]">
                      {["J0", "J1", "J2", "J3", "J4", "J5", "J6", "J7", "J8 ✅"].map(h => (
                        <th key={h} className="text-center px-3 py-2 font-medium text-gray-600">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      {["58%", "48%", "38%", "29%", "22%", "16%", "12%", "9,4%", "7,8%"].map((v, i) => (
                        <td key={i} className={`text-center px-3 py-2 font-medium ${i === 8 ? "text-green-700 font-bold" : "text-gray-700"}`}>{v}</td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Courbe séchage */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5">
              <h2 className="text-sm font-semibold text-gray-700 mb-3">Courbe de séchage — LOT-2025-047</h2>
              <SechageSVG />
            </div>
          </div>
        )}

        {/* ── Qualité finale ── */}
        {tab === "Qualité finale" && (
          <div className="space-y-6">
            {/* Guide Cut Test */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5">
              <h2 className="text-sm font-semibold text-gray-700 mb-3">Guide Cut Test <span className="text-xs text-gray-400 font-normal">(référentiel ICCO / RA)</span></h2>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-[#F8FBF8]">
                      {["Catégorie fève", "Description visuelle", "Objectif Grade AA", "Objectif Grade A"].map(h => (
                        <th key={h} className="text-left px-3 py-2 font-medium text-gray-600">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { cat: "Fèves brunes", desc: "Section brune / violet clair — bonne fermentation", aa: "≥ 95%", a: "≥ 90%", ok: true },
                      { cat: "Fèves violettes", desc: "Section violette — fermentation incomplète", aa: "≤ 4%", a: "≤ 8%", ok: false },
                      { cat: "Fèves ardoisées", desc: "Section gris ardoise — sous-fermentées", aa: "≤ 1%", a: "≤ 2%", ok: false },
                      { cat: "Fèves moisies", desc: "Présence de moisissure", aa: "0%", a: "0%", ok: false },
                    ].map(row => (
                      <tr key={row.cat} className="border-t border-gray-50">
                        <td className="px-3 py-2 font-medium text-gray-800">{row.cat}</td>
                        <td className="px-3 py-2 text-gray-600">{row.desc}</td>
                        <td className={`px-3 py-2 font-medium ${row.ok ? "text-green-700" : "text-red-600"}`}>{row.aa}</td>
                        <td className={`px-3 py-2 font-medium ${row.ok ? "text-green-700" : "text-orange-600"}`}>{row.a}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Résultats cut test */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5">
              <h2 className="text-sm font-semibold text-gray-700 mb-3">Résultats cut test — 5 derniers lots classés</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-[#F8FBF8]">
                      {["Lot", "Brunes", "Violettes", "Ardoisées", "Moisies", "Score", "Grade", "Décision"].map(h => (
                        <th key={h} className="text-left px-3 py-2 font-medium text-gray-600">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { lot: "LOT-2025-046", b: "97%", v: "2%", a: "1%", m: "0%", s: 97, g: "AA", d: "Conditionné 01/07", ok: true },
                      { lot: "LOT-2025-045", b: "96%", v: "3%", a: "1%", m: "0%", s: 96, g: "AA", d: "Exporté 10/07", ok: true },
                      { lot: "LOT-2025-044", b: "95%", v: "4%", a: "1%", m: "0%", s: 95, g: "AA", d: "Conditionné 22/06", ok: true },
                      { lot: "LOT-2025-043", b: "93%", v: "5%", a: "2%", m: "0%", s: 93, g: "A", d: "Conditionné 15/06", ok: true },
                      { lot: "LOT-2025-042", b: "89%", v: "8%", a: "3%", m: "0%", s: 89, g: "A (limite)", d: "Séchage prolongé +2j", ok: false },
                    ].map(row => (
                      <tr key={row.lot} className="border-t border-gray-50 hover:bg-gray-50">
                        <td className="px-3 py-2 font-medium text-[#2E7D32]">{row.lot}</td>
                        <td className="px-3 py-2 font-medium text-green-700">{row.b}</td>
                        <td className="px-3 py-2 text-orange-600">{row.v}</td>
                        <td className="px-3 py-2 text-red-600">{row.a}</td>
                        <td className="px-3 py-2 text-gray-400">{row.m}</td>
                        <td className="px-3 py-2">
                          <span className={`font-bold ${row.s >= 95 ? "text-green-700" : row.s >= 90 ? "text-blue-600" : "text-amber-600"}`}>{row.s}/100</span>
                        </td>
                        <td className="px-3 py-2">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${row.g === "AA" ? "bg-green-100 text-green-700" : row.ok ? "bg-blue-100 text-blue-700" : "bg-amber-100 text-amber-700"}`}>{row.g}</span>
                        </td>
                        <td className="px-3 py-2 text-gray-600">{row.d}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
