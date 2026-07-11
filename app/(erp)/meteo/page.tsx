"use client";

import { useState } from "react";
import Topbar from "../../components/Topbar";

// ─── SVG Précipitations 30 derniers jours ────────────────────────────────────
function Rain30DaysChart() {
  // Jun 11 → Jul 11 : 31 valeurs journalières en mm
  const data = [
    6, 0, 14, 22, 8, 0, 0, 5, 18, 12, 0, 0, 3, 28, 38, 16, 0, 0, 8, 24, 12,
    0, 5, 0, 18, 6, 0, 0, 10, 4, 8,
  ];
  const W = 640;
  const H = 180;
  const padL = 44;
  const padB = 36;
  const padT = 16;
  const maxV = 40;
  const avail = H - padB - padT;
  const barW = (W - padL - 8) / data.length;

  const labels = [
    { i: 0, label: "11 Juin" },
    { i: 10, label: "21 Juin" },
    { i: 20, label: "1 Juil" },
    { i: 30, label: "11 Juil" },
  ];

  return (
    <div className="overflow-x-auto">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-[640px]" aria-label="Précipitations 30 derniers jours">
        {[0, 10, 20, 30, 40].map((v) => {
          const y = padT + avail * (1 - v / maxV);
          return (
            <g key={v}>
              <line x1={padL} x2={W - 4} y1={y} y2={y} stroke="#e5e7eb" strokeWidth="0.5" />
              <text x={padL - 4} y={y + 4} textAnchor="end" fontSize="9" fill="#9ca3af">{v}</text>
            </g>
          );
        })}
        {data.map((v, i) => {
          const x = padL + i * barW + 1;
          const bh = avail * (v / maxV);
          const y = padT + avail - bh;
          const color = v >= 20 ? "#1d4ed8" : v >= 10 ? "#3b82f6" : "#93c5fd";
          return (
            <rect key={i} x={x} y={y} width={barW - 2} height={bh}
              fill={color} rx="1" opacity="0.88" />
          );
        })}
        {labels.map(({ i, label }) => (
          <text key={label} x={padL + i * barW} y={H - padB + 14}
            textAnchor="middle" fontSize="9" fill="#6b7280">{label}</text>
        ))}
        <text x={padL - 4} y={padT - 4} fontSize="9" fill="#6b7280">mm</text>
        <text x={W - 4} y={padT + 8} textAnchor="end" fontSize="9" fill="#2563eb" fontWeight="600">Total : 124 mm</text>
        <text x={W - 4} y={padT + 20} textAnchor="end" fontSize="8" fill="#6b7280">Normale : 118 mm (+5%)</text>
      </svg>
    </div>
  );
}

// ─── SVG Températures & Humidité 7 jours ────────────────────────────────────
function TempHumidityChart() {
  const days = ["5 Jul", "6 Jul", "7 Jul", "8 Jul", "9 Jul", "10 Jul", "11 Jul"];
  const tMax = [29, 30, 28, 27, 29, 30, 27];
  const tMin = [22, 23, 21, 21, 22, 23, 22];
  const hum  = [78, 76, 83, 85, 80, 78, 82];

  const W = 640;
  const H = 220;
  const padL = 44;
  const padR = 44;
  const padB = 36;
  const padT = 24;
  const n = days.length;
  const availW = W - padL - padR;
  const availH = H - padB - padT;
  const minT = 18; const maxT = 36;
  const minH = 60; const maxH = 100;

  const fy = (v: number, lo: number, hi: number) =>
    padT + availH * (1 - (v - lo) / (hi - lo));
  const fx = (i: number) => padL + i * (availW / (n - 1));

  const ptMax = tMax.map((v, i) => `${fx(i)},${fy(v, minT, maxT)}`).join(" ");
  const ptMin = tMin.map((v, i) => `${fx(i)},${fy(v, minT, maxT)}`).join(" ");
  const ptHum = hum.map((v, i) => `${fx(i)},${fy(v, minH, maxH)}`).join(" ");

  // zone optimale cacao 25-30°C
  const y25 = fy(25, minT, maxT);
  const y30 = fy(30, minT, maxT);

  return (
    <div className="overflow-x-auto">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-[640px]">
        {/* grille */}
        {[18, 22, 26, 30, 34].map((v) => {
          const y = fy(v, minT, maxT);
          return (
            <g key={v}>
              <line x1={padL} x2={W - padR} y1={y} y2={y} stroke="#e5e7eb" strokeWidth="0.5" />
              <text x={padL - 4} y={y + 4} textAnchor="end" fontSize="9" fill="#9ca3af">{v}°</text>
            </g>
          );
        })}
        {/* zone optimale cacao */}
        <rect x={padL} y={y30} width={W - padL - padR} height={y25 - y30}
          fill="#bbf7d0" opacity="0.35" />
        <text x={padL + 4} y={y30 - 3} fontSize="8" fill="#166534" opacity="0.7">Zone optimale cacao 25-30°C</text>
        {/* humidité axe droit */}
        {[60, 70, 80, 90, 100].map((v) => {
          const y = fy(v, minH, maxH);
          return (
            <text key={v} x={W - padR + 4} y={y + 4} fontSize="9" fill="#22c55e">{v}%</text>
          );
        })}
        {/* courbe humidité */}
        <polyline points={ptHum} fill="none" stroke="#22c55e" strokeWidth="1.5"
          strokeDasharray="5 3" strokeLinejoin="round" />
        {/* courbes T° */}
        <polyline points={ptMax} fill="none" stroke="#dc2626" strokeWidth="2" strokeLinejoin="round" />
        <polyline points={ptMin} fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinejoin="round" />
        {/* points */}
        {tMax.map((v, i) => (
          <circle key={i} cx={fx(i)} cy={fy(v, minT, maxT)} r="3" fill="#dc2626" />
        ))}
        {tMin.map((v, i) => (
          <circle key={i} cx={fx(i)} cy={fy(v, minT, maxT)} r="3" fill="#3b82f6" />
        ))}
        {/* labels jours */}
        {days.map((d, i) => (
          <text key={d} x={fx(i)} y={H - padB + 14} textAnchor="middle" fontSize="9" fill="#6b7280">{d}</text>
        ))}
        {/* légende */}
        <line x1={padL} x2={padL + 14} y1={padT - 8} y2={padT - 8} stroke="#dc2626" strokeWidth="2" />
        <text x={padL + 16} y={padT - 4} fontSize="9" fill="#374151">T° max</text>
        <line x1={padL + 58} x2={padL + 72} y1={padT - 8} y2={padT - 8} stroke="#3b82f6" strokeWidth="2" />
        <text x={padL + 74} y={padT - 4} fontSize="9" fill="#374151">T° min</text>
        <line x1={padL + 116} x2={padL + 130} y1={padT - 8} y2={padT - 8} stroke="#22c55e" strokeWidth="1.5" strokeDasharray="5 3" />
        <text x={padL + 132} y={padT - 4} fontSize="9" fill="#374151">Humidité (axe →)</text>
      </svg>
    </div>
  );
}

// ─── SVG Risque Phytophthora 30 jours ───────────────────────────────────────
function PhytophthoraChart() {
  const data = [
    2, 1, 4, 7, 5, 2, 1, 3, 6, 8, 5, 2, 1, 2, 9, 7, 3, 1, 2, 6, 5,
    2, 3, 1, 5, 3, 2, 1, 3, 2, 5,
  ];
  const W = 640;
  const H = 160;
  const padL = 36;
  const padB = 28;
  const padT = 16;
  const maxV = 10;
  const n = data.length;
  const availW = W - padL - 8;
  const availH = H - padB - padT;
  const fy = (v: number) => padT + availH * (1 - v / maxV);
  const fx = (i: number) => padL + i * (availW / (n - 1));

  const pts = data.map((v, i) => `${fx(i)},${fy(v)}`).join(" ");
  const fillPts = `${fx(0)},${fy(0)} ${pts} ${fx(n - 1)},${fy(0)}`;

  // zones colorées
  const yGreenEnd = fy(3);
  const yOrangeEnd = fy(6);

  return (
    <div className="overflow-x-auto">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-[640px]">
        {/* zones */}
        <rect x={padL} y={fy(10)} width={availW} height={fy(7) - fy(10)} fill="#fee2e2" opacity="0.6" />
        <rect x={padL} y={fy(7)} width={availW} height={fy(4) - fy(7)} fill="#fef3c7" opacity="0.7" />
        <rect x={padL} y={fy(4)} width={availW} height={fy(0) - fy(4)} fill="#dcfce7" opacity="0.7" />
        {/* labels zones */}
        <text x={W - 12} y={fy(8.5)} textAnchor="end" fontSize="8" fill="#dc2626">Élevé</text>
        <text x={W - 12} y={fy(5.5)} textAnchor="end" fontSize="8" fill="#d97706">Moyen</text>
        <text x={W - 12} y={fy(2)} textAnchor="end" fontSize="8" fill="#16a34a">Faible</text>
        {/* grille */}
        {[0, 3, 6, 10].map((v) => {
          const y = fy(v);
          return (
            <g key={v}>
              <line x1={padL} x2={W - 8} y1={y} y2={y} stroke="#e5e7eb" strokeWidth="0.5" />
              <text x={padL - 4} y={y + 4} textAnchor="end" fontSize="8" fill="#9ca3af">{v}</text>
            </g>
          );
        })}
        {/* aire + courbe */}
        <polygon points={fillPts} fill="#f97316" opacity="0.15" />
        <polyline points={pts} fill="none" stroke="#f97316" strokeWidth="2" strokeLinejoin="round" />
        {/* point actuel (dernier) */}
        <circle cx={fx(n - 1)} cy={fy(data[n - 1])} r="4" fill="#f97316" />
        <text x={fx(n - 1) + 6} y={fy(data[n - 1]) - 4} fontSize="8" fill="#ea580c" fontWeight="600">
          Auj. : {data[n - 1]} (Moyen)
        </text>
        {/* labels dates */}
        {[0, 10, 20, 30].map((i) => {
          const labels = ["11 Jun", "21 Jun", "1 Jul", "11 Jul"];
          return (
            <text key={i} x={fx(Math.min(i, n - 1))} y={H - padB + 14}
              textAnchor="middle" fontSize="9" fill="#6b7280">{labels[i === 0 ? 0 : i === 10 ? 1 : i === 20 ? 2 : 3]}</text>
          );
        })}
      </svg>
    </div>
  );
}

// ─── Données ──────────────────────────────────────────────────────────────────
const forecast7 = [
  { day: "Ven 11", icon: "⛅", max: 28, min: 22, rain: 8,  hum: 82, note: "" },
  { day: "Sam 12", icon: "⛅", max: 29, min: 22, rain: 5,  hum: 80, note: "" },
  { day: "Dim 13", icon: "☀️", max: 31, min: 23, rain: 0,  hum: 74, note: "" },
  { day: "Lun 14", icon: "☀️", max: 32, min: 23, rain: 0,  hum: 72, note: "" },
  { day: "Mar 15", icon: "🌤️", max: 30, min: 22, rain: 2,  hum: 77, note: "Traitement PAR-A1 prévu — vérifier" },
  { day: "Mer 16", icon: "🌧️", max: 26, min: 21, rain: 18, hum: 90, note: "⚠️ Pas de traitement" },
  { day: "Jeu 17", icon: "🌧️", max: 24, min: 20, rain: 22, hum: 92, note: "⚠️ Pas de traitement" },
];

const stationHistory = [
  { date: "28/06", tMin: "21°C", tMax: "30°C", pluie: "0 mm",  hr: "73%", vent: "E 8 km/h",  etp: "4,6 mm" },
  { date: "29/06", tMin: "22°C", tMax: "29°C", pluie: "4 mm",  hr: "78%", vent: "SO 10 km/h", etp: "4,1 mm" },
  { date: "30/06", tMin: "21°C", tMax: "31°C", pluie: "0 mm",  hr: "74%", vent: "S 7 km/h",  etp: "4,8 mm" },
  { date: "01/07", tMin: "22°C", tMax: "29°C", pluie: "10 mm", hr: "82%", vent: "SO 14 km/h", etp: "3,8 mm" },
  { date: "02/07", tMin: "20°C", tMax: "28°C", pluie: "4 mm",  hr: "85%", vent: "O 12 km/h", etp: "3,5 mm" },
  { date: "03/07", tMin: "21°C", tMax: "30°C", pluie: "0 mm",  hr: "76%", vent: "S 9 km/h",  etp: "4,4 mm" },
  { date: "04/07", tMin: "22°C", tMax: "31°C", pluie: "0 mm",  hr: "74%", vent: "SE 8 km/h", etp: "4,7 mm" },
  { date: "05/07", tMin: "22°C", tMax: "32°C", pluie: "0 mm",  hr: "71%", vent: "E 6 km/h",  etp: "5,0 mm" },
  { date: "06/07", tMin: "23°C", tMax: "30°C", pluie: "2 mm",  hr: "79%", vent: "SO 11 km/h", etp: "4,2 mm" },
  { date: "07/07", tMin: "22°C", tMax: "29°C", pluie: "18 mm", hr: "88%", vent: "O 16 km/h", etp: "3,2 mm" },
  { date: "08/07", tMin: "21°C", tMax: "27°C", pluie: "12 mm", hr: "86%", vent: "SO 13 km/h", etp: "3,0 mm" },
  { date: "09/07", tMin: "22°C", tMax: "29°C", pluie: "0 mm",  hr: "80%", vent: "S 10 km/h", etp: "4,0 mm" },
  { date: "10/07", tMin: "23°C", tMax: "30°C", pluie: "0 mm",  hr: "78%", vent: "SO 9 km/h", etp: "4,3 mm" },
  { date: "11/07", tMin: "22°C", tMax: "27°C", pluie: "8 mm",  hr: "82%", vent: "SO 12 km/h", etp: "4,2 mm" },
];

const monthlyData = [
  { mois: "Jan 2025", pluie: "18 mm",  tMoy: "26,8°C", normale: "22 mm",  ecart: "-18%" },
  { mois: "Fév 2025", pluie: "24 mm",  tMoy: "27,2°C", normale: "28 mm",  ecart: "-14%" },
  { mois: "Mar 2025", pluie: "86 mm",  tMoy: "27,8°C", normale: "82 mm",  ecart: "+5%" },
  { mois: "Avr 2025", pluie: "142 mm", tMoy: "26,4°C", normale: "138 mm", ecart: "+3%" },
  { mois: "Mai 2025", pluie: "184 mm", tMoy: "25,8°C", normale: "178 mm", ecart: "+3%" },
  { mois: "Jun 2025", pluie: "204 mm", tMoy: "24,6°C", normale: "214 mm", ecart: "-5%" },
  { mois: "Jul 2025", pluie: "124 mm*",tMoy: "26,2°C*",normale: "188 mm", ecart: "en cours" },
];

const interventions = [
  { date: "12 Jul", tache: "Relevé parcelles PAR-C1", meteo: "⛅ Nuageux", faisab: "✅ OK", fc: "text-green-700 bg-green-50" },
  { date: "14 Jul", tache: "Comptage cabosses PAR-A2", meteo: "☀️ Soleil", faisab: "✅ OK", fc: "text-green-700 bg-green-50" },
  { date: "15 Jul", tache: "Traitement phyto PAR-A1 (PCT-034)", meteo: "🌤️ Partiellement nuageux — 2mm", faisab: "✅ OK (délai 4h assuré)", fc: "text-green-700 bg-green-50" },
  { date: "16 Jul", tache: "Traitement PAR-A2 (PCT-035)", meteo: "🌧️ 18mm", faisab: "❌ Reporter au 18/07", fc: "text-red-700 bg-red-50" },
  { date: "18 Jul", tache: "Fertilisation KCl PAR-B1", meteo: "☀️ (estimé)", faisab: "✅ Prévu OK", fc: "text-green-700 bg-green-50" },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
const TABS = ["Aujourd'hui & 7 jours", "Données station", "Impact cultures"] as const;
type Tab = typeof TABS[number];

export default function MeteoPage() {
  const [activeTab, setActiveTab] = useState<Tab>("Aujourd'hui & 7 jours");

  return (
    <div className="min-h-screen bg-gray-50">
      <Topbar breadcrumbs={["IA", "Météo Agricole"]} />

      <div className="p-6 max-w-6xl mx-auto space-y-5">

        {/* ── En-tête ──────────────────────────────────────────────────── */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h1 className="text-xl font-bold text-gray-800">Météo Agricole — Soubré, Région de la Nawa</h1>
              <p className="text-sm text-gray-500 mt-0.5">
                Données temps réel + prévisions 14 jours — Impact sur les cultures
              </p>
            </div>
            <span className="text-xs text-gray-400 bg-gray-50 border border-gray-100 rounded-lg px-3 py-1.5 whitespace-nowrap">
              MàJ : 11/07/2025 à 08h47
            </span>
          </div>
          <div className="flex flex-wrap gap-4 mt-3 text-xs text-gray-500">
            <span>📍 5.7811°N, 6.5923°W</span>
            <span>Station : AWS-EXP001 (CIMEL)</span>
          </div>
        </div>

        {/* ── Bandeau météo actuel ─────────────────────────────────────── */}
        <div className="rounded-2xl p-5 bg-gradient-to-r from-[#1B5E20] to-[#2E7D32] text-white">
          <div className="flex flex-wrap items-center gap-5">
            <div className="flex items-center gap-3">
              <span className="text-4xl">☁️</span>
              <div>
                <p className="text-3xl font-bold">27°C</p>
                <p className="text-sm opacity-75">Ressenti 31°C (humidex)</p>
              </div>
            </div>
            <div className="h-10 w-px bg-white opacity-20 hidden sm:block" />
            <div className="flex flex-wrap gap-5 text-sm">
              {[
                { label: "Humidité", value: "82%" },
                { label: "Vent", value: "SO 12 km/h" },
                { label: "Pression", value: "1 012 hPa" },
                { label: "Pluie 24h", value: "8,2 mm" },
              ].map((item) => (
                <div key={item.label}>
                  <p className="opacity-60 text-xs">{item.label}</p>
                  <p className="font-semibold">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── 5 KPI agricoles ─────────────────────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {[
            { label: "ETP",                   value: "4,2 mm/j",   sub: "Évapotranspiration",         dot: "bg-blue-400" },
            { label: "Stress hydrique",        value: "Faible ✅",  sub: "82% HR",                     dot: "bg-green-500" },
            { label: "Risque Phytophthora",    value: "🟡 Moyen",   sub: "T°27°C + HR>80%",            dot: "bg-amber-400" },
            { label: "Risque mirides",         value: "🟡 Moyen",   sub: "Saison pluies — pic juillet", dot: "bg-amber-400" },
            { label: "Séchage naturel",        value: "🔴 Défavorable", sub: "Pluie prévue J+3",       dot: "bg-red-400" },
          ].map((kpi) => (
            <div key={kpi.label} className="rounded-2xl border border-gray-100 bg-white p-4">
              <div className="flex items-center gap-1.5 mb-1">
                <span className={`w-2 h-2 rounded-full ${kpi.dot}`} />
                <p className="text-[10px] text-gray-500 uppercase tracking-wide font-medium">{kpi.label}</p>
              </div>
              <p className="text-sm font-bold text-gray-800">{kpi.value}</p>
              <p className="text-[10px] text-gray-400 mt-0.5">{kpi.sub}</p>
            </div>
          ))}
        </div>

        {/* ── Onglets ──────────────────────────────────────────────────── */}
        <div className="flex gap-1 bg-white border border-gray-100 rounded-2xl p-1 w-fit flex-wrap">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                activeTab === tab
                  ? "bg-[#2E7D32] text-white shadow"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ══ Onglet 1 ═══════════════════════════════════════════════════ */}
        {activeTab === "Aujourd'hui & 7 jours" && (
          <div className="space-y-5">
            {/* Prévisions 7 jours */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5">
              <h2 className="text-sm font-semibold text-gray-800 mb-4">Prévisions 7 jours</h2>
              <div className="flex gap-2 overflow-x-auto pb-1">
                {forecast7.map((d) => (
                  <div key={d.day}
                    className="min-w-[108px] flex-shrink-0 rounded-xl border border-gray-100 bg-gray-50 p-3 flex flex-col items-center gap-1 text-center">
                    <p className="text-[10px] font-semibold text-gray-700">{d.day}</p>
                    <span className="text-2xl leading-none">{d.icon}</span>
                    <div className="flex gap-1 items-baseline mt-0.5">
                      <span className="text-xs font-bold text-gray-800">{d.max}°</span>
                      <span className="text-[10px] text-gray-400">{d.min}°</span>
                    </div>
                    <p className="text-[10px] text-blue-600 font-medium">{d.rain} mm</p>
                    <p className="text-[10px] text-gray-500">{d.hum}%</p>
                    {d.note && (
                      <p className={`text-[9px] font-medium leading-tight mt-0.5 ${
                        d.note.startsWith("⚠️") ? "text-red-600" : "text-amber-600"
                      }`}>{d.note}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* SVG pluie 30 jours */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5">
              <h2 className="text-sm font-semibold text-gray-800 mb-1">
                Précipitations — 30 derniers jours
              </h2>
              <p className="text-[11px] text-gray-400 mb-4">
                Du 11 juin au 11 juillet 2025 · Station AWS-EXP001
              </p>
              <Rain30DaysChart />
            </div>
          </div>
        )}

        {/* ══ Onglet 2 ═══════════════════════════════════════════════════ */}
        {activeTab === "Données station" && (
          <div className="space-y-5">
            {/* SVG T° & Humidité */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5">
              <h2 className="text-sm font-semibold text-gray-800 mb-1">
                Températures & Humidité — 7 derniers jours
              </h2>
              <p className="text-[11px] text-gray-400 mb-4">
                Rouge = T° max · Bleu = T° min · Vert tirets = Humidité (axe droit) · Zone verte = fenêtre optimale cacao
              </p>
              <TempHumidityChart />
            </div>

            {/* Tableau historique 14 jours */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5">
              <h2 className="text-sm font-semibold text-gray-800 mb-4">
                Historique station — 14 derniers jours
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-[#F8FBF8]">
                      {["Date", "T° min", "T° max", "Pluie", "HR moy", "Vent", "ETP"].map((h) => (
                        <th key={h} className="px-3 py-2 text-left text-[11px] font-semibold text-gray-600 whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {stationHistory.map((row, i) => (
                      <tr key={row.date} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                        <td className="px-3 py-2 font-medium text-gray-800 whitespace-nowrap">{row.date}</td>
                        <td className="px-3 py-2 text-blue-600">{row.tMin}</td>
                        <td className="px-3 py-2 text-red-600">{row.tMax}</td>
                        <td className="px-3 py-2 text-blue-700 font-medium">{row.pluie}</td>
                        <td className="px-3 py-2 text-gray-600">{row.hr}</td>
                        <td className="px-3 py-2 text-gray-500 whitespace-nowrap">{row.vent}</td>
                        <td className="px-3 py-2 text-[#2E7D32] font-medium">{row.etp}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Récapitulatif mensuel */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5">
              <h2 className="text-sm font-semibold text-gray-800 mb-4">Récapitulatif mensuel 2025</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-[#F8FBF8]">
                      {["Mois", "Pluie totale", "T° moy", "Normale", "Écart"].map((h) => (
                        <th key={h} className="px-3 py-2 text-left text-[11px] font-semibold text-gray-600">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {monthlyData.map((row, i) => (
                      <tr key={row.mois} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                        <td className="px-3 py-2 font-medium text-gray-800">{row.mois}</td>
                        <td className="px-3 py-2 text-blue-700 font-medium">{row.pluie}</td>
                        <td className="px-3 py-2 text-gray-600">{row.tMoy}</td>
                        <td className="px-3 py-2 text-gray-500">{row.normale}</td>
                        <td className={`px-3 py-2 font-semibold ${
                          row.ecart.startsWith("+") ? "text-green-700" :
                          row.ecart.startsWith("-") ? "text-red-600" : "text-gray-500"
                        }`}>{row.ecart}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="text-[10px] text-gray-400 mt-2">* Données partielles au 11/07/2025</p>
              </div>
            </div>
          </div>
        )}

        {/* ══ Onglet 3 ═══════════════════════════════════════════════════ */}
        {activeTab === "Impact cultures" && (
          <div className="space-y-5">
            {/* Alertes agronomiques */}
            <div className="space-y-3">
              <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 flex gap-3">
                <span className="text-xl mt-0.5 flex-shrink-0">⚠️</span>
                <div>
                  <p className="text-sm font-bold text-amber-800">Risque Phytophthora élevé prévu 16-17 juillet</p>
                  <p className="text-xs text-amber-700 mt-1 leading-relaxed">
                    Pluie &gt;18mm + T°&lt;27°C prévues. Traitement cuivrique PAR-A1 du 15/07 critique —
                    ne pas reporter après le 16.
                  </p>
                </div>
              </div>
              <div className="rounded-2xl border border-green-200 bg-green-50 p-5 flex gap-3">
                <span className="text-xl mt-0.5 flex-shrink-0">✅</span>
                <div>
                  <p className="text-sm font-bold text-green-800">Floraison PAR-A2 favorisée</p>
                  <p className="text-xs text-green-700 mt-1 leading-relaxed">
                    L'alternance pluie/soleil actuelle est idéale pour la floraison de PAR-A2 —
                    bonnes perspectives pour la grande récolte.
                  </p>
                </div>
              </div>
              <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5 flex gap-3">
                <span className="text-xl mt-0.5 flex-shrink-0">ℹ️</span>
                <div>
                  <p className="text-sm font-bold text-blue-800">Séchage LOT-2025-047 en cours</p>
                  <p className="text-xs text-blue-700 mt-1 leading-relaxed">
                    Rentrer les claies les 16 et 17 juillet — pluie 18-22mm prévue. Séchage artificiel
                    si stock non terminé d'ici le 15/07.
                  </p>
                </div>
              </div>
            </div>

            {/* Calendrier interventions vs météo */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5">
              <h2 className="text-sm font-semibold text-gray-800 mb-4">
                Calendrier des interventions vs météo
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-[#F8FBF8]">
                      {["Date", "Tâche prévue", "Météo", "Faisabilité"].map((h) => (
                        <th key={h} className="px-3 py-2 text-left text-[11px] font-semibold text-gray-600">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {interventions.map((row, i) => (
                      <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                        <td className="px-3 py-2 font-medium text-gray-800 whitespace-nowrap">{row.date}</td>
                        <td className="px-3 py-2 text-gray-700">{row.tache}</td>
                        <td className="px-3 py-2 text-gray-500 whitespace-nowrap">{row.meteo}</td>
                        <td className="px-3 py-2">
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-lg ${row.fc}`}>
                            {row.faisab}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* SVG Risque Phytophthora */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5">
              <h2 className="text-sm font-semibold text-gray-800 mb-1">
                Indice de Risque Phytophthora — 30 jours
              </h2>
              <p className="text-[11px] text-gray-400 mb-4">
                Calculé sur T° + HR + pluviométrie quotidienne · Échelle 0-10
              </p>
              <PhytophthoraChart />
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
