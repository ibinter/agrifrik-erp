"use client";

import Topbar from "../../components/Topbar";
import { Droplets, Wind, Eye, Gauge, Thermometer, Sun, AlertTriangle } from "lucide-react";

// ─── Données ─────────────────────────────────────────────────────────────────

type JourPrevision = {
  date: string;
  jour: string;
  icon: string;
  tmax: number;
  tmin: number;
  pluie: number;
  vent: number;
  alerte: "ok" | "warn" | "danger";
  note?: string;
};

const previsions15: JourPrevision[] = [
  { date: "11/07", jour: "Ven", icon: "☀️",  tmax: 34, tmin: 22, pluie:  0, vent:  8, alerte: "ok" },
  { date: "12/07", jour: "Sam", icon: "🌧️",  tmax: 28, tmin: 20, pluie: 65, vent: 18, alerte: "danger", note: "⚠️ Fort" },
  { date: "13/07", jour: "Dim", icon: "🌧️",  tmax: 26, tmin: 19, pluie: 82, vent: 22, alerte: "danger", note: "⚠️ Très fort" },
  { date: "14/07", jour: "Lun", icon: "⛅",   tmax: 30, tmin: 21, pluie: 15, vent: 12, alerte: "warn" },
  { date: "15/07", jour: "Mar", icon: "☀️",  tmax: 33, tmin: 22, pluie:  0, vent: 10, alerte: "ok" },
  { date: "16/07", jour: "Mer", icon: "☀️",  tmax: 35, tmin: 23, pluie:  0, vent:  9, alerte: "ok" },
  { date: "17/07", jour: "Jeu", icon: "⛅",   tmax: 32, tmin: 21, pluie:  8, vent: 11, alerte: "warn" },
  { date: "18/07", jour: "Ven", icon: "🌧️",  tmax: 29, tmin: 20, pluie: 40, vent: 16, alerte: "danger", note: "⚠️" },
  { date: "19/07", jour: "Sam", icon: "⛅",   tmax: 31, tmin: 21, pluie: 12, vent: 13, alerte: "warn" },
  { date: "20/07", jour: "Dim", icon: "☀️",  tmax: 34, tmin: 22, pluie:  0, vent:  8, alerte: "ok", note: "Jour idéal épandage K" },
  { date: "21/07", jour: "Lun", icon: "☀️",  tmax: 35, tmin: 23, pluie:  0, vent:  9, alerte: "ok" },
  { date: "22/07", jour: "Mar", icon: "⛅",   tmax: 33, tmin: 22, pluie:  5, vent: 10, alerte: "warn" },
  { date: "23/07", jour: "Mer", icon: "🌧️",  tmax: 27, tmin: 19, pluie: 55, vent: 20, alerte: "danger", note: "⚠️" },
  { date: "24/07", jour: "Jeu", icon: "⛅",   tmax: 30, tmin: 21, pluie: 18, vent: 14, alerte: "warn" },
  { date: "25/07", jour: "Ven", icon: "☀️",  tmax: 34, tmin: 22, pluie:  0, vent:  8, alerte: "ok" },
];

// 30 jours de pluie (mm) — index 0 = 11/06, pic les j32-j33 = 12-13/07
const pluies30: number[] = [
  12, 0, 0, 8, 35, 0, 3, 0, 0, 18,
   0, 5, 0, 0, 22, 0, 0, 0, 9,  0,
   0, 0, 0, 4, 0,  0, 0, 0, 0,  7,
];
// Indices correspondant aux pics 12-13 juillet (indices 28-29 dans le tableau 30j à compter du 12 juin)
const picIndices = new Set([28, 29]);

const alertes = [
  {
    level: "danger",
    emoji: "🔴",
    titre: "12-13/07 : Pluies intenses 65-82 mm",
    items: [
      "Interdiction traitements phytosanitaires",
      "Sécuriser bâches séchoir solaire",
      "Risque mildiou en forte hausse ↑",
    ],
  },
  {
    level: "warning",
    emoji: "🟡",
    titre: "UV 8-9 du 15 au 22/07 — Fenêtre séchage optimale",
    items: [
      "Profiter pour séchage solaire LOT-032",
    ],
  },
  {
    level: "warning",
    emoji: "🟡",
    titre: "Sec prévu le 20/07 — Fenêtre idéale épandage K",
    items: [
      "Appliquer engrais K sur PAR-A3",
    ],
  },
  {
    level: "info",
    emoji: "🔵",
    titre: "Précipitations cumulées juillet (estimation) : 280 mm",
    items: [
      "Normale saisonnière : 250 mm — Légèrement excédentaire",
    ],
  },
];

const cumulMensuel = [
  { mois: "Mai 2025",         obs: 182, normale: 165, ecart: "+10,3%", jours: 14 },
  { mois: "Juin 2025",        obs: 256, normale: 248, ecart: "+3,2%",  jours: 18 },
  { mois: "Juil 2025 (en cours)", obs: 147, normale: 250, ecart: "Normal (280 prévu)", jours: 8 },
];

const recommandations = [
  {
    urgence: "danger",
    emoji: "🌿",
    titre: "Traitement mildiou AVANT le 11/07 au soir",
    detail: "Fenêtre d'intervention ≤ 24h avant les pluies intenses",
  },
  {
    urgence: "info",
    emoji: "🌾",
    titre: "Reporter épandage engrais K au 20/07",
    detail: "Journée sèche confirmée, conditions optimales sur PAR-A3",
  },
  {
    urgence: "warning",
    emoji: "☀️",
    titre: "Séchage solaire LOT-032 : 15–19 juillet",
    detail: "5 jours d'ensoleillement continu prévus — fenêtre idéale",
  },
];

// ─── Composants ──────────────────────────────────────────────────────────────

function AlerteBadge({ alerte }: { alerte: JourPrevision["alerte"] }) {
  if (alerte === "ok")     return <span className="text-base">✅</span>;
  if (alerte === "danger") return <span className="text-base">🚨</span>;
  return <span className="text-base">⚠️</span>;
}

function RainfallBarChart() {
  const W = 700; const H = 180;
  const padL = 40; const padR = 12; const padT = 16; const padB = 28;
  const chartW = W - padL - padR;
  const chartH = H - padT - padB;
  const maxMm = 90; // axe fixe à 90mm
  const alertSeuil = 80; // ligne rouge
  const yAlert = padT + chartH - (alertSeuil / maxMm) * chartH;

  const barW = chartW / pluies30.length;

  return (
    <div className="overflow-x-auto">
      <svg viewBox={`0 0 ${W} ${H}`} style={{ minWidth: 500, width: "100%" }}>
        {/* grille */}
        {[20, 40, 60, 80].map((v) => {
          const y = padT + chartH - (v / maxMm) * chartH;
          return (
            <g key={v}>
              <line x1={padL} y1={y} x2={W - padR} y2={y} stroke="#F0F0F0" strokeWidth={1} />
              <text x={padL - 6} y={y + 4} fontSize={9} textAnchor="end" fill="#9E9E9E">{v}</text>
            </g>
          );
        })}
        {/* ligne alerte */}
        <line x1={padL} y1={yAlert} x2={W - padR} y2={yAlert} stroke="#EF4444" strokeWidth={1.5} strokeDasharray="6,3" />
        <text x={W - padR - 2} y={yAlert - 4} fontSize={9} textAnchor="end" fill="#EF4444" fontWeight="600">
          Seuil alerte 80 mm/j
        </text>
        {/* barres */}
        {pluies30.map((mm, i) => {
          const barH = (mm / maxMm) * chartH;
          const x = padL + i * barW + barW * 0.15;
          const bw = barW * 0.7;
          const y = padT + chartH - barH;
          const isPic = picIndices.has(i);
          const fill = isPic ? "#EF4444" : mm === 0 ? "#DBEAFE" : "#3B82F6";
          return (
            <rect key={i} x={x} y={y} width={bw} height={Math.max(barH, 1)} rx={2} fill={fill} fillOpacity={mm === 0 ? 0.4 : 1} />
          );
        })}
        {/* baseline */}
        <line x1={padL} y1={padT + chartH} x2={W - padR} y2={padT + chartH} stroke="#E5E7EB" strokeWidth={1} />
        {/* labels axe X (tous les 5 jours) */}
        {pluies30.map((_, i) => {
          if (i % 5 !== 0) return null;
          const x = padL + i * barW + barW / 2;
          return (
            <text key={i} x={x} y={H - 6} fontSize={9} textAnchor="middle" fill="#9E9E9E">J{i + 1}</text>
          );
        })}
      </svg>
      <div className="flex flex-wrap gap-4 mt-2 text-xs text-gray-500">
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm inline-block bg-blue-500" />Pluie (mm)</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm inline-block bg-red-400" />Pic (12-13/07)</span>
        <span className="flex items-center gap-1.5"><span className="w-8 border-t-2 border-dashed border-red-400 inline-block" />Seuil 80 mm/j</span>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function MeteoPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Topbar title="Météo Agricole" breadcrumb={["IA & Données", "Météo"]} />

      <div className="p-6 space-y-6">

        {/* ── En-tête localisation ── */}
        <div className="flex flex-wrap items-center gap-3 px-1">
          <span className="text-2xl">📍</span>
          <div>
            <p className="font-semibold text-gray-900">Soubré, Côte d&apos;Ivoire — Zone cacaoyère Sud-Ouest</p>
            <p className="text-xs text-gray-500">Lat 5°47&apos;N · Long 6°36&apos;W · Alt 142 m</p>
          </div>
        </div>

        {/* ── Aujourd'hui ── */}
        <div
          className="rounded-2xl p-6 text-white"
          style={{ background: "linear-gradient(135deg, #1B5E20 0%, #2E7D32 60%, #388E3C 100%)" }}
        >
          <p className="text-green-300 text-xs mb-4 font-medium">Vendredi 11/07/2025</p>
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            {/* Gauche */}
            <div>
              <div className="flex items-center gap-4">
                <span className="text-5xl">☀️</span>
                <div>
                  <p className="text-green-200 text-sm">Ensoleillé</p>
                  <div className="flex items-end gap-2">
                    <span className="text-5xl font-bold">34°C</span>
                    <span className="text-green-300 text-lg mb-1">max</span>
                  </div>
                  <p className="text-green-300 text-sm">22°C min</p>
                </div>
              </div>
              <div className="mt-4 space-y-1 text-sm text-green-200">
                <p>EvapoTranspiration : <strong className="text-white">4,8 mm/j</strong></p>
                <p>Besoin irrigation : <strong className="text-white">2,4 mm/j</strong> (si pas de pluie)</p>
              </div>
            </div>
            {/* Droite */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: <Droplets size={15} />,   label: "Humidité",    value: "68%" },
                { icon: <Wind size={15} />,        label: "Vent",        value: "8 km/h NE" },
                { icon: <Gauge size={15} />,       label: "Pression",    value: "1 013 hPa" },
                { icon: <Sun size={15} />,         label: "Indice UV",   value: "8 — Élevé" },
                { icon: <Eye size={15} />,         label: "Visibilité",  value: "15 km" },
                { icon: <Thermometer size={15} />, label: "Ressenti",    value: "37°C" },
              ].map((m, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center justify-center px-3 py-3 rounded-xl gap-1"
                  style={{ backgroundColor: "rgba(255,255,255,0.13)" }}
                >
                  <span className="text-green-200">{m.icon}</span>
                  <span className="text-[9px] text-green-300 uppercase tracking-wide text-center">{m.label}</span>
                  <span className="text-xs font-semibold text-white text-center leading-tight">{m.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Prévisions 15 jours ── */}
        <div className="rounded-2xl border border-gray-100 bg-white">
          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">Prévisions 15 jours</h2>
          </div>
          <div className="overflow-x-auto px-2 py-4">
            <div className="flex gap-2" style={{ minWidth: "max-content" }}>
              {previsions15.map((j, i) => {
                const bgCard =
                  j.alerte === "danger" ? "#FFF1F2" :
                  j.alerte === "warn"   ? "#FFFBEB" :
                                          "#F0FDF4";
                const borderCard =
                  j.alerte === "danger" ? "#FECDD3" :
                  j.alerte === "warn"   ? "#FCD34D" :
                                          "#BBF7D0";
                return (
                  <div
                    key={i}
                    className="flex flex-col items-center gap-1.5 px-3 py-3 rounded-2xl border text-center w-20 shrink-0"
                    style={{ backgroundColor: bgCard, borderColor: borderCard }}
                  >
                    <p className="text-[10px] text-gray-500 font-medium">{j.jour}</p>
                    <p className="text-[10px] text-gray-400">{j.date}</p>
                    <span className="text-2xl my-0.5">{j.icon}</span>
                    <p className="text-xs font-bold text-orange-600">{j.tmax}°</p>
                    <p className="text-xs text-blue-600">{j.tmin}°</p>
                    {j.pluie > 0
                      ? <p className="text-[10px] text-blue-700 font-medium">{j.pluie}mm</p>
                      : <p className="text-[10px] text-gray-300">0mm</p>
                    }
                    <p className="text-[10px] text-gray-400">{j.vent}km/h</p>
                    <AlerteBadge alerte={j.alerte} />
                    {j.note && (
                      <p className="text-[9px] leading-tight text-center font-medium mt-0.5"
                        style={{ color: j.alerte === "ok" ? "#2E7D32" : "#B45309" }}>
                        {j.note}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Cumul pluies 30 jours ── */}
        <div className="rounded-2xl border border-gray-100 bg-white">
          <div className="px-5 py-4 border-b border-gray-100 flex flex-wrap items-center justify-between gap-2">
            <h2 className="font-semibold text-gray-900">Cumul des pluies — 30 jours</h2>
            <div className="flex gap-4 text-xs">
              <span>Total 30j : <strong className="text-blue-700">282 mm</strong></span>
              <span>Pics 12-13/07 : <strong className="text-red-600">65–82 mm</strong></span>
            </div>
          </div>
          <div className="px-5 py-4">
            <RainfallBarChart />
          </div>
        </div>

        {/* ── Alertes agro-météo ── */}
        <div className="space-y-3">
          <h2 className="font-semibold text-gray-900 flex items-center gap-2">
            <AlertTriangle size={16} style={{ color: "#E65100" }} />
            Alertes agro-météo
          </h2>
          {alertes.map((a, i) => {
            const s = {
              danger:  { bg: "#FFF1F2", border: "#FECDD3", color: "#991B1B" },
              warning: { bg: "#FFFBEB", border: "#FCD34D", color: "#92400E" },
              info:    { bg: "#EFF6FF", border: "#BFDBFE", color: "#1D4ED8" },
            }[a.level] ?? { bg: "#F5F5F5", border: "#E0E0E0", color: "#616161" };
            return (
              <div key={i} className="rounded-2xl border p-4 flex gap-3" style={{ background: s.bg, borderColor: s.border }}>
                <span className="text-xl shrink-0">{a.emoji}</span>
                <div>
                  <p className="text-sm font-semibold mb-1" style={{ color: s.color }}>{a.titre}</p>
                  <ul className="space-y-0.5">
                    {a.items.map((it, j) => (
                      <li key={j} className="text-xs text-gray-700 flex items-start gap-1.5">
                        <span className="mt-1 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: s.color }} />
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Cumul saisonnier ── */}
        <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">Cumul saisonnier — 3 derniers mois</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ backgroundColor: "#F8FBF8" }}>
                  {["Mois", "Pluie observée", "Normale 30 ans", "Écart", "Jours de pluie"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {cumulMensuel.map((row, i) => {
                  const ecartPos = row.ecart.startsWith("+");
                  return (
                    <tr key={i} className={`border-t border-gray-50 hover:bg-gray-50 ${i % 2 === 0 ? "" : "bg-gray-50/40"}`}>
                      <td className="px-4 py-3 font-medium text-gray-800 whitespace-nowrap">{row.mois}</td>
                      <td className="px-4 py-3 text-blue-700 font-semibold">{row.obs} mm</td>
                      <td className="px-4 py-3 text-gray-600">{row.normale} mm</td>
                      <td className="px-4 py-3">
                        <span
                          className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold"
                          style={ecartPos
                            ? { background: "#E8F5E9", color: "#1B5E20" }
                            : { background: "#F5F5F5", color: "#616161" }}
                        >
                          {row.ecart}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-700">{row.jours}j</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Recommandations agro ── */}
        <div>
          <h2 className="font-semibold text-gray-900 mb-3">Recommandations agro basées sur météo</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {recommandations.map((r, i) => {
              const s = {
                danger:  { bg: "#FFF1F2", border: "#FECDD3", color: "#991B1B", iconBg: "#FEE2E2" },
                info:    { bg: "#EFF6FF", border: "#BFDBFE", color: "#1D4ED8", iconBg: "#DBEAFE" },
                warning: { bg: "#FFFBEB", border: "#FCD34D", color: "#92400E", iconBg: "#FEF3C7" },
              }[r.urgence] ?? { bg: "#F9F9F9", border: "#E0E0E0", color: "#555", iconBg: "#F0F0F0" };
              return (
                <div key={i} className="rounded-2xl border p-5 flex flex-col gap-3" style={{ background: s.bg, borderColor: s.border }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ backgroundColor: s.iconBg }}>
                    {r.emoji}
                  </div>
                  <div>
                    <p className="text-sm font-semibold mb-1" style={{ color: s.color }}>{r.titre}</p>
                    <p className="text-xs text-gray-600 leading-relaxed">{r.detail}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Indicateurs agro-météo ── */}
        <div>
          <h2 className="font-semibold text-gray-900 mb-3">Indicateurs agrométéorologiques</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {[
              { icon: "💧", label: "ETP (Évapotranspiration pot.)", value: "4,8 mm/j", sub: "Besoin hydrique moyen", bg: "#EFF6FF", color: "#1D4ED8" },
              { icon: "🌱", label: "Bilan hydrique sol",            value: "+12 mm",   sub: "Sol bien alimenté — excédentaire", bg: "#F0FDF4", color: "#15803D" },
              { icon: "🌡️", label: "GDD — Growing Degree Days",     value: "1 842 °C.j", sub: "Croissance optimale cacao", bg: "#FFF7ED", color: "#C2410C" },
              { icon: "🍄", label: "Risque pathogène",               value: "5,8 / 10", sub: "Élevé — Surveiller mildiou", bg: "#FEF3C7", color: "#B45309" },
            ].map((ind, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 flex flex-col gap-3 hover:shadow-sm transition-shadow">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0" style={{ backgroundColor: ind.bg }}>
                  {ind.icon}
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1 leading-snug">{ind.label}</p>
                  <p className="text-xl font-bold" style={{ color: ind.color }}>{ind.value}</p>
                  <p className="text-xs text-gray-500 mt-1">{ind.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
