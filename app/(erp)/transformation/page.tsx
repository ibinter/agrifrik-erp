"use client";

import { useState } from "react";
import Topbar from "../../components/Topbar";

const LOTS = [
  { id: "LOT-2025-041", parcelles: "PAR-A1/A2", entree: 2980, sortie: 1018, rendement: 34.2, gradeAA: 92, duree: "14j", statut: "Vendu BC" },
  { id: "LOT-2025-042", parcelles: "PAR-A1/B1", entree: 2840, sortie: 971,  rendement: 34.2, gradeAA: 89, duree: "13j", statut: "Vendu BC" },
  { id: "LOT-2025-043", parcelles: "PAR-A2/B1", entree: 3120, sortie: 1067, rendement: 34.2, gradeAA: 90, duree: "14j", statut: "Vendu BC" },
  { id: "LOT-2025-044", parcelles: "PAR-A1",    entree: 2620, sortie: 896,  rendement: 34.2, gradeAA: 91, duree: "13j", statut: "Vendu BC" },
  { id: "LOT-2025-045", parcelles: "PAR-A2",    entree: 2410, sortie: 824,  rendement: 34.1, gradeAA: 92, duree: "14j", statut: "Vendu BC" },
  { id: "LOT-2025-046", parcelles: "PAR-B1/C1", entree: 2820, sortie: 964,  rendement: 34.2, gradeAA: 94, duree: "14j", statut: "En stock" },
  { id: "LOT-2025-047", parcelles: "PAR-A1",    entree: 2830, sortie: null, rendement: null,  gradeAA: null, duree: "J4/14", statut: "En cours" },
];

const ETAPES = [
  { label: "Récolte\ncabosses", duree: "J0" },
  { label: "Écabossage\n& dépulpage", duree: "J1" },
  { label: "Fermentation\n5-7j (caisses)", duree: "5-7j" },
  { label: "Ressuyage\n24h", duree: "24h" },
  { label: "Séchage solaire\n7-10j (claies)", duree: "7-10j" },
  { label: "Tri &\ncalibrage", duree: "0.5j" },
  { label: "Ensachage\n(sacs jute 65kg)", duree: "0.5j" },
];

// Rendements lots 041-046
const REND_DATA = [34.2, 34.2, 34.2, 34.2, 34.1, 34.2];
const REND_LABELS = ["041", "042", "043", "044", "045", "046"];

// Températures LOT-047 (J1-J7, J5-J7 = projections)
const TEMP_REAL = [38, 43, 47, 47.8];
const TEMP_PROJ = [null, null, null, null, 49, 46, 42];
const TEMP_DAYS = ["J1", "J2", "J3", "J4", "J5", "J6", "J7"];

function PipelineSVG() {
  const W = 700, H = 160;
  const n = ETAPES.length;
  const cx = (i: number) => 50 + i * ((W - 100) / (n - 1));
  const cy = H / 2;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ maxWidth: W }}>
      {/* Connecting lines */}
      {ETAPES.slice(0, -1).map((_, i) => (
        <line key={i} x1={cx(i)} y1={cy} x2={cx(i + 1)} y2={cy} stroke="#4CAF50" strokeWidth={2} />
      ))}
      {/* Arrowheads */}
      {ETAPES.slice(0, -1).map((_, i) => {
        const mx = (cx(i) + cx(i + 1)) / 2;
        return (
          <polygon
            key={i}
            points={`${mx},${cy - 5} ${mx + 8},${cy} ${mx},${cy + 5}`}
            fill="#4CAF50"
          />
        );
      })}
      {/* Circles + labels */}
      {ETAPES.map((e, i) => {
        const lines = e.label.split("\n");
        return (
          <g key={i}>
            <circle cx={cx(i)} cy={cy} r={18} fill="#2E7D32" />
            <text x={cx(i)} y={cy + 5} textAnchor="middle" fill="white" fontSize={11} fontWeight="bold">
              {i + 1}
            </text>
            {lines.map((l, li) => (
              <text key={li} x={cx(i)} y={cy + 30 + li * 13} textAnchor="middle" fill="#1B5E20" fontSize={9}>
                {l}
              </text>
            ))}
            <text x={cx(i)} y={cy - 27} textAnchor="middle" fill="#4CAF50" fontSize={9} fontWeight="bold">
              {e.duree}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function RendementSVG() {
  const W = 640, H = 180;
  const padL = 48, padR = 20, padT = 20, padB = 40;
  const gW = W - padL - padR;
  const gH = H - padT - padB;
  const minY = 33, maxY = 35;
  const scaleY = (v: number) => padT + gH - ((v - minY) / (maxY - minY)) * gH;
  const scaleX = (i: number) => padL + (i / (REND_DATA.length - 1)) * gW;

  const pts = REND_DATA.map((v, i) => `${scaleX(i)},${scaleY(v)}`).join(" ");

  const yTicks = [33, 33.5, 34, 34.5, 35];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ maxWidth: W }}>
      {/* Grid */}
      {yTicks.map((t) => (
        <line key={t} x1={padL} y1={scaleY(t)} x2={W - padR} y2={scaleY(t)} stroke="#e5e7eb" strokeWidth={1} />
      ))}
      {/* Seuil minimum 33% rouge */}
      <line x1={padL} y1={scaleY(33)} x2={W - padR} y2={scaleY(33)} stroke="#ef4444" strokeWidth={1.5} />
      <text x={W - padR + 2} y={scaleY(33) + 4} fill="#ef4444" fontSize={9}>33%</text>
      {/* Cible 34% pointillé */}
      <line x1={padL} y1={scaleY(34)} x2={W - padR} y2={scaleY(34)} stroke="#2E7D32" strokeWidth={1.5} strokeDasharray="5,4" />
      <text x={W - padR + 2} y={scaleY(34) + 4} fill="#2E7D32" fontSize={9}>34%</text>
      {/* Line */}
      <polyline points={pts} fill="none" stroke="#1B5E20" strokeWidth={2} />
      {/* Points */}
      {REND_DATA.map((v, i) => (
        <g key={i}>
          <circle cx={scaleX(i)} cy={scaleY(v)} r={4} fill="#2E7D32" />
          <text x={scaleX(i)} y={scaleY(v) - 8} textAnchor="middle" fill="#1B5E20" fontSize={9}>{v}%</text>
        </g>
      ))}
      {/* X labels */}
      {REND_LABELS.map((l, i) => (
        <text key={i} x={scaleX(i)} y={H - padB + 14} textAnchor="middle" fill="#6b7280" fontSize={10}>
          {l}
        </text>
      ))}
      {/* Y labels */}
      {yTicks.map((t) => (
        <text key={t} x={padL - 4} y={scaleY(t) + 4} textAnchor="end" fill="#6b7280" fontSize={9}>{t}</text>
      ))}
      {/* Axis */}
      <line x1={padL} y1={padT} x2={padL} y2={H - padB} stroke="#d1d5db" strokeWidth={1} />
      <line x1={padL} y1={H - padB} x2={W - padR} y2={H - padB} stroke="#d1d5db" strokeWidth={1} />
    </svg>
  );
}

function TempSVG047() {
  const W = 640, H = 160;
  const padL = 48, padR = 20, padT = 20, padB = 36;
  const gW = W - padL - padR;
  const gH = H - padT - padB;
  const minY = 30, maxY = 56;
  const scaleY = (v: number) => padT + gH - ((v - minY) / (maxY - minY)) * gH;
  const scaleX = (i: number) => padL + (i / (TEMP_DAYS.length - 1)) * gW;

  // Zone optimale 45-52
  const zoneTop = scaleY(52);
  const zoneBot = scaleY(45);

  const realPts = TEMP_REAL.map((v, i) => `${scaleX(i)},${scaleY(v)}`).join(" ");
  // Projection from J4 (i=3) to J7 (i=6)
  const projVals = [47.8, 49, 46, 42];
  const projPts = projVals.map((v, i) => `${scaleX(i + 3)},${scaleY(v)}`).join(" ");

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ maxWidth: W }}>
      {/* Zone optimale */}
      <rect x={padL} y={zoneTop} width={gW} height={zoneBot - zoneTop} fill="#4CAF50" fillOpacity={0.12} />
      <text x={padL + 4} y={zoneTop - 3} fill="#2E7D32" fontSize={9}>Optimal 45-52°C</text>
      {/* Grid lines */}
      {[35, 40, 45, 50, 55].map((t) => (
        <line key={t} x1={padL} y1={scaleY(t)} x2={W - padR} y2={scaleY(t)} stroke="#e5e7eb" strokeWidth={1} />
      ))}
      {/* Courbe réelle */}
      <polyline points={realPts} fill="none" stroke="#ef4444" strokeWidth={2} />
      {/* Courbe projection */}
      <polyline points={projPts} fill="none" stroke="#ef4444" strokeWidth={2} strokeDasharray="5,4" />
      {/* Points réels */}
      {TEMP_REAL.map((v, i) => (
        <g key={i}>
          <circle cx={scaleX(i)} cy={scaleY(v)} r={4} fill="#ef4444" />
          <text x={scaleX(i)} y={scaleY(v) - 7} textAnchor="middle" fill="#ef4444" fontSize={9}>{v}°C</text>
        </g>
      ))}
      {/* Points projection */}
      {[49, 46, 42].map((v, i) => (
        <g key={i}>
          <circle cx={scaleX(i + 4)} cy={scaleY(v)} r={4} fill="none" stroke="#ef4444" strokeWidth={1.5} />
          <text x={scaleX(i + 4)} y={scaleY(v) - 7} textAnchor="middle" fill="#9ca3af" fontSize={9}>{v}°C</text>
        </g>
      ))}
      {/* X labels */}
      {TEMP_DAYS.map((d, i) => (
        <text key={i} x={scaleX(i)} y={H - padB + 14} textAnchor="middle" fill={i < 4 ? "#374151" : "#9ca3af"} fontSize={10}>{d}</text>
      ))}
      {/* Y labels */}
      {[35, 40, 45, 50, 55].map((t) => (
        <text key={t} x={padL - 4} y={scaleY(t) + 4} textAnchor="end" fill="#6b7280" fontSize={9}>{t}°</text>
      ))}
      {/* Axis */}
      <line x1={padL} y1={padT} x2={padL} y2={H - padB} stroke="#d1d5db" strokeWidth={1} />
      <line x1={padL} y1={H - padB} x2={W - padR} y2={H - padB} stroke="#d1d5db" strokeWidth={1} />
      {/* Aujourd'hui marker */}
      <line x1={scaleX(3)} y1={padT} x2={scaleX(3)} y2={H - padB} stroke="#3b82f6" strokeWidth={1} strokeDasharray="3,3" />
      <text x={scaleX(3)} y={padT - 4} textAnchor="middle" fill="#3b82f6" fontSize={8}>Aujourd'hui</text>
    </svg>
  );
}

export default function TransformationPage() {
  const [filtre, setFiltre] = useState<"tous" | "en-cours" | "termines">("tous");
  const [recherche, setRecherche] = useState("");

  const lotsFiltrés = LOTS.filter((l) => {
    const matchFiltre =
      filtre === "tous" ||
      (filtre === "en-cours" && l.statut === "En cours") ||
      (filtre === "termines" && l.statut !== "En cours");
    const matchRecherche = l.id.toLowerCase().includes(recherche.toLowerCase());
    return matchFiltre && matchRecherche;
  });

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-[#F8FBF8]">
      <Topbar />
      <main className="flex-1 p-6 space-y-6">
        {/* En-tête */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#1B5E20]">Transformation</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              Post-récolte &amp; valorisation — Fermentation, séchage, broyage — EXP-001
            </p>
          </div>
          <button className="bg-[#2E7D32] text-white rounded-xl text-xs font-medium px-4 py-2 hover:bg-[#1B5E20] transition-colors">
            + Nouveau lot transformation
          </button>
        </div>

        {/* KPI */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Lots 2025", value: "7 lots" },
            { label: "Transformés", value: "6 847 kg" },
            { label: "Grade AA", value: "91%" },
            { label: "Rendement séchage", value: "34,2%" },
          ].map((k) => (
            <div key={k.label} className="rounded-2xl border border-gray-100 bg-white p-5">
              <p className="text-xs text-gray-500">{k.label}</p>
              <p className="text-xl font-bold text-[#1B5E20] mt-1">{k.value}</p>
            </div>
          ))}
        </div>

        {/* Filtres */}
        <div className="flex items-center gap-3 flex-wrap">
          {(["tous", "en-cours", "termines"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFiltre(f)}
              className={`rounded-xl px-4 py-1.5 text-xs font-medium border transition-colors ${
                filtre === f
                  ? "bg-[#2E7D32] text-white border-[#2E7D32]"
                  : "bg-white text-gray-600 border-gray-200 hover:border-[#2E7D32]"
              }`}
            >
              {f === "tous" ? "Tous" : f === "en-cours" ? "En cours" : "Terminés"}
            </button>
          ))}
          <input
            type="text"
            placeholder="Recherche lot…"
            value={recherche}
            onChange={(e) => setRecherche(e.target.value)}
            className="ml-auto border border-gray-200 rounded-xl px-3 py-1.5 text-xs outline-none focus:border-[#2E7D32] bg-white"
          />
        </div>

        {/* Tableau */}
        <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden">
          <div className="px-5 py-3 bg-[#F8FBF8] border-b border-gray-100">
            <h2 className="text-sm font-semibold text-[#1B5E20]">Lots de transformation 2025</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-[#F8FBF8] text-gray-500">
                  {["N° Lot", "Récolte", "Entrée brute", "Sortie sèche", "Rendement", "Grade AA", "Durée", "Statut"].map((h) => (
                    <th key={h} className="px-4 py-2.5 text-left font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {lotsFiltrés.map((l) => {
                  const enCours = l.statut === "En cours";
                  return (
                    <tr
                      key={l.id}
                      className={`border-t border-gray-50 hover:bg-gray-50 transition-colors ${enCours ? "bg-blue-50" : ""}`}
                    >
                      <td className="px-4 py-2.5">
                        <a href={`/transformation/${l.id}`} className="font-semibold text-[#2E7D32] hover:underline">
                          {l.id}
                        </a>
                      </td>
                      <td className="px-4 py-2.5 text-gray-600">{l.parcelles}</td>
                      <td className="px-4 py-2.5 font-medium">{l.entree.toLocaleString("fr-FR")} kg</td>
                      <td className="px-4 py-2.5">{l.sortie ? `${l.sortie.toLocaleString("fr-FR")} kg` : <span className="text-gray-400">—</span>}</td>
                      <td className="px-4 py-2.5">{l.rendement ? `${l.rendement}%` : <span className="text-gray-400">—</span>}</td>
                      <td className="px-4 py-2.5">{l.gradeAA ? `${l.gradeAA}%` : <span className="text-gray-400">—</span>}</td>
                      <td className="px-4 py-2.5 text-gray-600">{l.duree}</td>
                      <td className="px-4 py-2.5">
                        {enCours ? (
                          <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 rounded-full px-2.5 py-0.5 font-medium">
                            🔵 En cours (fermentation)
                          </span>
                        ) : l.statut === "En stock" ? (
                          <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 rounded-full px-2.5 py-0.5 font-medium">
                            ✅ En stock
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-600 rounded-full px-2.5 py-0.5 font-medium">
                            ✅ Vendu BC
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pipeline SVG */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-semibold text-[#1B5E20] mb-4">Processus de transformation cacao EXP-001</h2>
          <PipelineSVG />
        </div>

        {/* Rendement chart */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-semibold text-[#1B5E20] mb-1">Rendement de séchage par lot 2025</h2>
          <p className="text-xs text-gray-500 mb-4">LOT-041 à LOT-046</p>
          <RendementSVG />
          <p className="text-xs text-[#2E7D32] mt-3 font-medium">
            Rendement stable à 34,2% — Supérieur à la référence CNRA CI (33,5%)
          </p>
        </div>

        {/* LOT-047 suivi temps réel */}
        <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-blue-800">LOT-2025-047 en cours — Suivi temps réel</h2>
            <span className="bg-blue-100 text-blue-700 text-xs font-medium px-3 py-1 rounded-full">🔵 Fermentation J4/7</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="space-y-2">
              <p><span className="text-gray-500">Entrée cacao brut :</span> <span className="font-semibold">2 830 kg</span> — cabosses fraîches PAR-A1 — récolte 07/07/2025</p>
              <p>
                <span className="text-gray-500">Étape actuelle :</span>{" "}
                <span className="font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-lg">Fermentation J4/7</span>
              </p>
              <p><span className="text-gray-500">Température J4 (relevé 11/07 07h00) :</span> <span className="font-semibold text-green-700">47,8°C ✅</span> <span className="text-gray-400">(optimal 45-52°C)</span></p>
            </div>
            <div className="space-y-2">
              <p><span className="text-gray-500">Prochaine action :</span> <span className="font-medium">Retournement caisses J4 (aujourd&apos;hui 14h00) — Ibrahim Sawadogo</span></p>
              <p><span className="text-gray-500">Fin fermentation prévue :</span> <span className="font-medium">14/07/2025</span></p>
              <p><span className="text-gray-500">Début séchage :</span> <span className="font-medium">15/07/2025</span> · <span className="text-gray-500">Fin séchage :</span> <span className="font-medium">25/07/2025</span></p>
            </div>
          </div>
          <div>
            <p className="text-xs font-medium text-blue-800 mb-3">Évolution T° fermentation LOT-047</p>
            <TempSVG047 />
          </div>
        </div>
      </main>
    </div>
  );
}
