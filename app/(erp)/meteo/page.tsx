"use client";

import { useState } from "react";
import Topbar from "../../components/Topbar";

const TABS = ["Prévisions", "Historique", "Alertes agricoles"] as const;
type Tab = typeof TABS[number];

// ─── SVG Pluviométrie 4 semaines ────────────────────────────────────────────
function RainForecastChart() {
  // 28 jours : Sem26 total 48mm, Sem27 62mm, Sem28 38mm, Sem29 12mm (en cours)
  const rawData = [
    4, 8, 10, 12, 6, 4, 4,   // Sem 26
    10, 12, 14, 8, 6, 6, 6,  // Sem 27
    6, 8, 6, 4, 6, 4, 4,     // Sem 28
    4, 4, 4, 0, 0, 0, 0,     // Sem 29
  ];
  const maxVal = 16;
  const W = 560;
  const H = 180;
  const padL = 40;
  const padB = 36;
  const padT = 20;
  const barW = (W - padL - 8) / 28;
  const etp = 4.2;
  const avail = H - padB - padT;
  const etpY = padT + avail * (1 - etp / maxVal);
  const weekColors = ["#3b82f6", "#2563eb", "#60a5fa", "#93c5fd"];
  const weekTotals = [48, 62, 38, 12];

  return (
    <div className="overflow-x-auto">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-[560px]" aria-label="Pluviométrie 4 semaines">
        {[0, 4, 8, 12, 16].map((v) => {
          const y = padT + avail * (1 - v / maxVal);
          return (
            <g key={v}>
              <line x1={padL} x2={W - 4} y1={y} y2={y} stroke="#e5e7eb" strokeWidth="0.5" />
              <text x={padL - 4} y={y + 4} textAnchor="end" fontSize="8" fill="#9ca3af">{v}</text>
            </g>
          );
        })}
        {rawData.map((v, i) => {
          const x = padL + i * barW + 1;
          const bh = avail * (v / maxVal);
          const y = padT + avail - bh;
          return (
            <rect key={i} x={x} y={y} width={barW - 2} height={bh}
              fill={weekColors[Math.floor(i / 7)]} rx="1" opacity="0.85" />
          );
        })}
        <line x1={padL} x2={W - 4} y1={etpY} y2={etpY}
          stroke="#f97316" strokeWidth="1.5" strokeDasharray="4 3" />
        <text x={W - 6} y={etpY - 3} textAnchor="end" fontSize="8" fill="#f97316">ETP 4,2mm</text>
        {["Sem 26", "Sem 27", "Sem 28", "Sem 29"].map((label, i) => {
          const x = padL + i * 7 * barW + 3.5 * barW;
          return (
            <g key={label}>
              <text x={x} y={H - padB + 14} textAnchor="middle" fontSize="8" fill="#6b7280">{label}</text>
              <text x={x} y={H - padB + 25} textAnchor="middle" fontSize="7" fill="#3b82f6">{weekTotals[i]}mm</text>
            </g>
          );
        })}
        <text x={padL - 4} y={padT - 6} fontSize="8" fill="#6b7280">mm</text>
      </svg>
    </div>
  );
}

// ─── SVG Pluviométrie mensuelle grouped bar ──────────────────────────────────
function MonthlyRainChart() {
  const months = ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun", "Jul", "Aoû", "Sep", "Oct", "Nov", "Déc"];
  const actual = [18, 24, 86, 142, 184, 204, 0, 0, 0, 0, 0, 0];
  const normal = [22, 28, 82, 138, 178, 214, 188, 168, 142, 88, 48, 26];
  const maxVal = 230;
  const W = 560;
  const H = 200;
  const padL = 44;
  const padB = 36;
  const padT = 20;
  const slotW = (W - padL - 4) / 12;
  const bw = slotW * 0.35;
  const avail = H - padB - padT;
  const fy = (v: number) => padT + avail * (1 - v / maxVal);

  return (
    <div className="overflow-x-auto">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-[560px]">
        {[0, 50, 100, 150, 200].map((v) => {
          const y = fy(v);
          return (
            <g key={v}>
              <line x1={padL} x2={W - 4} y1={y} y2={y} stroke="#e5e7eb" strokeWidth="0.5" />
              <text x={padL - 4} y={y + 4} textAnchor="end" fontSize="8" fill="#9ca3af">{v}</text>
            </g>
          );
        })}
        {months.map((m, i) => {
          const cx = padL + i * slotW + slotW / 2;
          const hA = avail * (actual[i] / maxVal);
          const hN = avail * (normal[i] / maxVal);
          return (
            <g key={m}>
              {actual[i] > 0 && (
                <rect x={cx - bw - 1} y={fy(actual[i])} width={bw} height={hA}
                  fill="#3b82f6" rx="1" opacity="0.85" />
              )}
              <rect x={cx + 1} y={fy(normal[i])} width={bw} height={hN}
                fill="#d1fae5" stroke="#10b981" strokeWidth="0.5" rx="1" />
              <text x={cx} y={H - padB + 12} textAnchor="middle" fontSize="8" fill="#6b7280">{m}</text>
            </g>
          );
        })}
        <rect x={padL + 4} y={padT} width={8} height={6} fill="#3b82f6" rx="1" />
        <text x={padL + 14} y={padT + 6} fontSize="8" fill="#374151">Réel 2025</text>
        <rect x={padL + 68} y={padT} width={8} height={6} fill="#d1fae5" stroke="#10b981" strokeWidth="0.5" rx="1" />
        <text x={padL + 78} y={padT + 6} fontSize="8" fill="#374151">Normale 30 ans</text>
      </svg>
    </div>
  );
}

// ─── SVG Températures Min/Max ────────────────────────────────────────────────
function TempChart() {
  const months = ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun"];
  const maxT = [31.4, 32.1, 32.8, 31.2, 29.8, 28.4];
  const minT = [22.2, 22.8, 23.4, 21.8, 20.6, 19.8];
  const W = 400;
  const H = 160;
  const padL = 36;
  const padB = 30;
  const padT = 20;
  const n = months.length;
  const minV = 18;
  const maxV = 36;
  const avail = H - padB - padT;
  const availW = W - padL - 8;

  const fy = (v: number) => padT + avail * (1 - (v - minV) / (maxV - minV));
  const fx = (i: number) => padL + i * availW / (n - 1);

  const maxPts = maxT.map((v, i) => `${fx(i)},${fy(v)}`).join(" ");
  const minPts = minT.map((v, i) => `${fx(i)},${fy(v)}`).join(" ");
  const areaPts = [
    ...maxT.map((v, i) => `${fx(i)},${fy(v)}`),
    ...minT.map((v, i) => `${fx(i)},${fy(v)}`).reverse(),
  ].join(" ");

  return (
    <div className="overflow-x-auto">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-[400px]">
        {[18, 22, 26, 30, 34].map((v) => {
          const y = fy(v);
          return (
            <g key={v}>
              <line x1={padL} x2={W - 4} y1={y} y2={y} stroke="#e5e7eb" strokeWidth="0.5" />
              <text x={padL - 4} y={y + 4} textAnchor="end" fontSize="8" fill="#9ca3af">{v}°</text>
            </g>
          );
        })}
        <polygon points={areaPts} fill="#bbf7d0" opacity="0.5" />
        <polyline points={maxPts} fill="none" stroke="#1B5E20" strokeWidth="2" strokeLinejoin="round" />
        <polyline points={minPts} fill="none" stroke="#4CAF50" strokeWidth="2" strokeLinejoin="round" />
        {months.map((m, i) => (
          <text key={m} x={fx(i)} y={H - padB + 12} textAnchor="middle" fontSize="8" fill="#6b7280">{m}</text>
        ))}
        <line x1={padL + 4} x2={padL + 16} y1={padT} y2={padT} stroke="#1B5E20" strokeWidth="2" />
        <text x={padL + 18} y={padT + 4} fontSize="8" fill="#374151">T° max</text>
        <line x1={padL + 60} x2={padL + 72} y1={padT} y2={padT} stroke="#4CAF50" strokeWidth="2" />
        <text x={padL + 74} y={padT + 4} fontSize="8" fill="#374151">T° min</text>
      </svg>
    </div>
  );
}

// ─── Données ─────────────────────────────────────────────────────────────────
const forecast7 = [
  { day: "Sam 12/07", min: 23, max: 31, precip: 12, icon: "🌧️", alert: "⚠️ Reporter traitements", alertColor: "text-amber-600" },
  { day: "Dim 13/07", min: 24, max: 30, precip: 24, icon: "🌧️", alert: "⚠️ Séchage artificiel", alertColor: "text-amber-600" },
  { day: "Lun 14/07", min: 24, max: 32, precip: 6,  icon: "⛅", alert: "—", alertColor: "text-gray-400" },
  { day: "Mar 15/07", min: 23, max: 33, precip: 0,  icon: "☀️", alert: "✅ Idéal séchage", alertColor: "text-green-600" },
  { day: "Mer 16/07", min: 22, max: 33, precip: 0,  icon: "☀️", alert: "✅ Idéal séchage", alertColor: "text-green-600" },
  { day: "Jeu 17/07", min: 22, max: 34, precip: 0,  icon: "☀️", alert: "✅ Optimal", alertColor: "text-green-600" },
  { day: "Ven 18/07", min: 23, max: 32, precip: 4,  icon: "⛅", alert: "—", alertColor: "text-gray-400" },
];

const historique = [
  { mois: "Janvier", temp: "26,8°C", pluie: "18 mm", jp: "4 j", etp: "128 mm", bilan: "-110 mm", bc: "text-red-600", badge: "⚠️" },
  { mois: "Février", temp: "27,2°C", pluie: "24 mm", jp: "5 j", etp: "118 mm", bilan: "-94 mm",  bc: "text-red-600", badge: "⚠️" },
  { mois: "Mars",    temp: "27,8°C", pluie: "86 mm", jp: "11 j", etp: "132 mm", bilan: "-46 mm",  bc: "text-amber-600", badge: "🟡" },
  { mois: "Avril",   temp: "26,4°C", pluie: "142 mm",jp: "16 j", etp: "122 mm", bilan: "+20 mm",  bc: "text-green-700", badge: "✅" },
  { mois: "Mai",     temp: "25,8°C", pluie: "184 mm",jp: "18 j", etp: "118 mm", bilan: "+66 mm",  bc: "text-green-700", badge: "✅" },
  { mois: "Juin",    temp: "24,6°C", pluie: "204 mm",jp: "21 j", etp: "108 mm", bilan: "+96 mm",  bc: "text-green-700", badge: "✅" },
];

const agendaIA = [
  { op: "Traitement mildiou PAR-B1", fenetre: "11/07 avant pluies", meteo: "Ensoleillé <10 km/h", statut: "✅ Effectué", sc: "text-green-700 bg-green-50" },
  { op: "Épandage KCl PAR-A3",       fenetre: "15-20/07",           meteo: "Sans pluie 48h",       statut: "📅 Planifié",  sc: "text-blue-700 bg-blue-50" },
  { op: "Séchage solaire LOT-048",   fenetre: "15-17/07",           meteo: "≥6h ensoleillement",   statut: "✅ Météo favorable", sc: "text-green-700 bg-green-50" },
  { op: "Sarclage PAR-D2",           fenetre: "14/07",              meteo: "Après pluies (sol humide)", statut: "📅 Optimal lundi", sc: "text-blue-700 bg-blue-50" },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function MeteoPage() {
  const [activeTab, setActiveTab] = useState<Tab>("Prévisions");

  return (
    <div className="min-h-screen bg-gray-50">
      <Topbar breadcrumbs={["IA", "Météo Agricole"]} />

      <div className="p-6 max-w-6xl mx-auto space-y-5">
        {/* En-tête station */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold text-gray-800">Station Météo Agronomique</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              Soubré, Région de la Nawa, CI — 5°47'N 6°36'W — Station Davis VP2 (MAT-007)
            </p>
          </div>
          <span className="text-xs text-gray-400 bg-gray-50 border border-gray-100 rounded-lg px-3 py-1.5">
            Dernière MàJ : 11/07/2025 à 09h42
          </span>
        </div>

        {/* Onglets */}
        <div className="flex gap-1 bg-white border border-gray-100 rounded-2xl p-1 w-fit">
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

        {/* ── Prévisions ───────────────────────────────────────────────────── */}
        {activeTab === "Prévisions" && (
          <div className="space-y-5">
            {/* Conditions actuelles */}
            <div className="rounded-2xl border border-green-100 bg-[#F0FAF0] p-5">
              <h2 className="text-sm font-semibold text-[#1B5E20] mb-4">Conditions actuelles</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {[
                  { label: "Température", value: "28,4°C", sub: "Ressenti 31°C" },
                  { label: "Humidité",    value: "82%",    sub: "Atmosphère" },
                  { label: "Vent",        value: "8 km/h", sub: "N-NE" },
                  { label: "Pression",    value: "1 012 hPa", sub: "Stable" },
                  { label: "Pluie auj.", value: "0 mm",   sub: "Cumulé jour" },
                  { label: "ETP",         value: "4,2 mm/j", sub: "Évapotranspiration" },
                ].map((item) => (
                  <div key={item.label} className="bg-white rounded-xl p-3 border border-green-100">
                    <p className="text-[10px] text-gray-500 uppercase tracking-wide">{item.label}</p>
                    <p className="text-lg font-bold text-[#1B5E20] mt-0.5">{item.value}</p>
                    <p className="text-[10px] text-gray-400">{item.sub}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 7 jours */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5">
              <h2 className="text-sm font-semibold text-gray-800 mb-4">Prévisions 7 jours</h2>
              <div className="flex gap-2 overflow-x-auto pb-1">
                {forecast7.map((d) => (
                  <div key={d.day}
                    className="min-w-[110px] flex-shrink-0 rounded-xl border border-gray-100 bg-gray-50 p-3 flex flex-col items-center gap-1 text-center">
                    <p className="text-[10px] font-semibold text-gray-700">{d.day}</p>
                    <span className="text-2xl leading-none">{d.icon}</span>
                    <div className="flex gap-1 items-baseline">
                      <span className="text-xs font-bold text-gray-800">{d.max}°</span>
                      <span className="text-[10px] text-gray-400">{d.min}°</span>
                    </div>
                    <p className="text-[10px] text-blue-600 font-medium">{d.precip} mm</p>
                    <p className={`text-[9px] font-medium leading-tight ${d.alertColor}`}>{d.alert}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Chart pluie */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5">
              <h2 className="text-sm font-semibold text-gray-800 mb-1">Pluviométrie — 4 dernières semaines</h2>
              <p className="text-[11px] text-gray-400 mb-4">Barres bleues par semaine · Ligne orange pointillée = ETP quotidienne 4,2 mm</p>
              <RainForecastChart />
            </div>
          </div>
        )}

        {/* ── Historique ───────────────────────────────────────────────────── */}
        {activeTab === "Historique" && (
          <div className="space-y-5">
            <div className="rounded-2xl border border-gray-100 bg-white p-5">
              <h2 className="text-sm font-semibold text-gray-800 mb-4">Données climatiques 2025</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-[#F8FBF8]">
                      {["Mois", "T° moy", "Pluie totale", "Jours pluie", "ETP", "Bilan hydrique"].map((h) => (
                        <th key={h} className="px-3 py-2 text-left text-[11px] font-semibold text-gray-600">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {historique.map((row, i) => (
                      <tr key={row.mois} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                        <td className="px-3 py-2 font-medium text-gray-800">{row.mois}</td>
                        <td className="px-3 py-2 text-gray-600">{row.temp}</td>
                        <td className="px-3 py-2 text-blue-700 font-medium">{row.pluie}</td>
                        <td className="px-3 py-2 text-gray-600">{row.jp}</td>
                        <td className="px-3 py-2 text-gray-600">{row.etp}</td>
                        <td className={`px-3 py-2 font-semibold ${row.bc}`}>{row.badge} {row.bilan}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-5">
              <h2 className="text-sm font-semibold text-gray-800 mb-1">Pluviométrie mensuelle 2025 vs Normale 30 ans</h2>
              <p className="text-[11px] text-gray-400 mb-4">Bleu plein = réel 2025 · Vert contouré = normale historique</p>
              <MonthlyRainChart />
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-5">
              <h2 className="text-sm font-semibold text-gray-800 mb-1">Températures 2025 — Min / Max mensuelles</h2>
              <p className="text-[11px] text-gray-400 mb-4">Vert foncé = T° max · Vert clair = T° min · Zone = amplitude thermique</p>
              <TempChart />
            </div>

            <div className="rounded-2xl border border-amber-100 bg-amber-50 p-4 flex gap-3">
              <span className="text-amber-500 text-lg mt-0.5">📊</span>
              <p className="text-xs text-amber-800 leading-relaxed">
                <strong>Corrélation pluie-rendement R²=0,78.</strong> La sécheresse Jan–Mar 2025 a causé un stress
                hydrique PAR-A3. Irrigation d'appoint recommandée pour la parcelle PAR-A3 en l'absence de
                précipitations suffisantes.
              </p>
            </div>
          </div>
        )}

        {/* ── Alertes agricoles ────────────────────────────────────────────── */}
        {activeTab === "Alertes agricoles" && (
          <div className="space-y-5">
            <div className="space-y-3">
              <div className="rounded-2xl border border-red-100 bg-red-50 p-5">
                <div className="flex items-start gap-3">
                  <span className="text-xl mt-0.5">🔴</span>
                  <div>
                    <p className="text-sm font-bold text-red-800">Pluies 12-13/07 : 36 mm prévus</p>
                    <p className="text-xs text-red-700 mt-1 leading-relaxed">
                      <strong>Risque :</strong> Reporter traitements (DRE Ridomil 14j). Traitement PAR-B1 effectué à 08h30 ce matin ✅.<br />
                      <strong>Impact fermentation LOT-048 :</strong> Surveiller hygrométrie entrepôt.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-amber-100 bg-amber-50 p-5">
                <div className="flex items-start gap-3">
                  <span className="text-xl mt-0.5">🟡</span>
                  <div>
                    <p className="text-sm font-bold text-amber-800">Déficit hydrique Jan–Mar 2025</p>
                    <p className="text-xs text-amber-700 mt-1 leading-relaxed">
                      <strong>Bilan :</strong> -250 mm (norme max -170 mm). Impact PAR-A3 confirmé NDVI.<br />
                      <strong>Action :</strong> KCl urgent + mulching PAR-A3.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-green-100 bg-green-50 p-5">
                <div className="flex items-start gap-3">
                  <span className="text-xl mt-0.5">🟢</span>
                  <div>
                    <p className="text-sm font-bold text-green-800">Saison des pluies 2025 conforme</p>
                    <p className="text-xs text-green-700 mt-1">
                      Cumul Mai–Jun 388 mm (normale 392 mm, 98%). Prévision Juillet : 180–200 mm (normale 188 mm).
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Calendrier agronomique IA */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[#2E7D32]">🤖</span>
                <h2 className="text-sm font-semibold text-gray-800">Calendrier agronomique IA</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-[#F8FBF8]">
                      {["Opération", "Fenêtre optimale", "Météo requise", "Statut"].map((h) => (
                        <th key={h} className="px-3 py-2 text-left text-[11px] font-semibold text-gray-600">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {agendaIA.map((row, i) => (
                      <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                        <td className="px-3 py-2 font-medium text-gray-800">{row.op}</td>
                        <td className="px-3 py-2 text-gray-600">{row.fenetre}</td>
                        <td className="px-3 py-2 text-gray-500">{row.meteo}</td>
                        <td className="px-3 py-2">
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-lg ${row.sc}`}>
                            {row.statut}
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
      </div>
    </div>
  );
}
