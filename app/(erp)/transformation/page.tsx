"use client";

import { useState } from "react";
import Topbar from "../../components/Topbar";
import {
  Package,
  Scale,
  TrendingDown,
  Sun,
  Award,
  Thermometer,
  Droplets,
  Clock,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  RotateCcw,
  Wind,
  FlaskConical,
} from "lucide-react";

// ─── KPIs ────────────────────────────────────────────────────────────────────
const kpis = [
  {
    label: "Lots en cours",
    value: "8",
    unit: "",
    sub: "fermentation + séchage",
    iconColor: "#2E7D32",
    iconBg: "#E8F5E9",
    icon: Package,
  },
  {
    label: "Volume en transformation",
    value: "3 840",
    unit: "kg",
    sub: "masse cumulée active",
    iconColor: "#1565C0",
    iconBg: "#E3F2FD",
    icon: Scale,
  },
  {
    label: "Taux de perte",
    value: "22,4",
    unit: "%",
    sub: "normal : 20–25 %",
    iconColor: "#E65100",
    iconBg: "#FFF3E0",
    icon: TrendingDown,
  },
  {
    label: "Rendement séchage",
    value: "77,6",
    unit: "%",
    sub: "humidité finale < 8 %",
    iconColor: "#F9A825",
    iconBg: "#FFFDE7",
    icon: Sun,
  },
  {
    label: "Lots certifiés Grade A/AA",
    value: "94",
    unit: "%",
    sub: "sur lots terminés",
    iconColor: "#6A1B9A",
    iconBg: "#F3E5F5",
    icon: Award,
  },
];

// ─── FERMENTATION DATA ───────────────────────────────────────────────────────
const bacs = [
  {
    id: "A1",
    lot: "LOT-052",
    variete: "Amelonado T800",
    origine: "PAR-A1",
    masseInitiale: 680,
    debut: "08/07/2025 06:00",
    jour: 3,
    total: 6,
    temp: 48,
    tempOk: true,
    ph: 4.2,
    phOk: true,
    dernierRetournement: "09/07 06:00",
    prochainRetournement: "11/07 06:00",
    aspect: "Bonne coloration brune, odeur fermentée normale",
    finPrevue: "14/07",
    done: false,
  },
  {
    id: "A2",
    lot: "LOT-053",
    variete: "Hybride Mercedes",
    origine: "PAR-A3",
    masseInitiale: 520,
    debut: "09/07/2025",
    jour: 2,
    total: 6,
    temp: 42,
    tempOk: false,
    ph: 3.8,
    phOk: true,
    dernierRetournement: "09/07 08:00",
    prochainRetournement: "11/07 08:00",
    aspect: "Légèrement froid — ajouter couvercle",
    finPrevue: "15/07",
    done: false,
  },
  {
    id: "A3",
    lot: "LOT-050",
    variete: "Amelonado",
    origine: "PAR-B2",
    masseInitiale: 620,
    debut: "05/07/2025",
    jour: 5,
    total: 6,
    temp: 50,
    tempOk: true,
    ph: 4.8,
    phOk: true,
    dernierRetournement: "09/07 07:00",
    prochainRetournement: "11/07 07:00",
    aspect: "Couleur brun foncé, très bonne évolution",
    finPrevue: "12/07",
    done: false,
  },
  {
    id: "B1",
    lot: "LOT-048",
    variete: "Amelonado T800",
    origine: "PAR-C1",
    masseInitiale: 480,
    debut: "04/07/2025",
    jour: 6,
    total: 6,
    temp: null,
    tempOk: true,
    ph: null,
    phOk: true,
    dernierRetournement: "09/07 06:00",
    prochainRetournement: "—",
    aspect: "Excellente. Indice de fermentation : 94%",
    finPrevue: "10/07",
    done: true,
  },
  {
    id: "B2",
    lot: "LOT-049",
    variete: "Hybride Mercedes",
    origine: "PAR-A2",
    masseInitiale: 720,
    debut: "06/07/2025",
    jour: 4,
    total: 6,
    temp: 47,
    tempOk: true,
    ph: 4.5,
    phOk: true,
    dernierRetournement: "09/07 07:00",
    prochainRetournement: "11/07 07:00",
    aspect: "Odeur excellente, progression normale",
    finPrevue: "13/07",
    done: false,
  },
  {
    id: "C1",
    lot: "LOT-051",
    variete: "Amelonado",
    origine: "PAR-D1",
    masseInitiale: 820,
    debut: "09/07/2025",
    jour: 1,
    total: 7,
    temp: 38,
    tempOk: true,
    ph: 3.5,
    phOk: true,
    dernierRetournement: "—",
    prochainRetournement: "11/07 06:00",
    aspect: "Début normal, température en montée",
    finPrevue: "17/07",
    done: false,
  },
];

const journalRetournements = [
  { bac: "A1", lot: "LOT-052", dateHeure: "09/07 06:00", operateur: "Ibrahim S.", tempAvant: "46°C", tempApres: "48°C", obs: "Normal" },
  { bac: "A2", lot: "LOT-053", dateHeure: "09/07 08:00", operateur: "Konan Y.", tempAvant: "40°C", tempApres: "42°C", obs: "Légèrement froid — ajouter couvercle" },
  { bac: "B2", lot: "LOT-049", dateHeure: "09/07 07:00", operateur: "Ibrahim S.", tempAvant: "48°C", tempApres: "47°C", obs: "Odeur excellente" },
  { bac: "A3", lot: "LOT-050", dateHeure: "07/07 07:00", operateur: "Konan Y.", tempAvant: "44°C", tempApres: "50°C", obs: "Montée rapide normale" },
  { bac: "B1", lot: "LOT-048", dateHeure: "08/07 06:00", operateur: "Ibrahim S.", tempAvant: "49°C", tempApres: "48°C", obs: "Dernière phase — fin imminente" },
  { bac: "C1", lot: "LOT-051", dateHeure: "09/07 06:00", operateur: "Diallo M.", tempAvant: "28°C", tempApres: "38°C", obs: "Démarrage correct" },
  { bac: "A1", lot: "LOT-052", dateHeure: "07/07 06:00", operateur: "Ibrahim S.", tempAvant: "42°C", tempApres: "46°C", obs: "Bonne montée" },
  { bac: "B2", lot: "LOT-049", dateHeure: "07/07 07:00", operateur: "Diallo M.", tempAvant: "45°C", tempApres: "48°C", obs: "Normal" },
];

// ─── SECHAGE DATA ─────────────────────────────────────────────────────────────
const sechoirs = [
  {
    id: "Séchoir Solaire A",
    lot: "LOT-048",
    type: "solaire",
    masseAvant: 416,
    humiditéInitiale: 42,
    humiditéActuelle: 38,
    humiditéCible: 8,
    jour: 1,
    dureeEstimee: "10–12 jours",
    statut: "en_cours",
    alerte: null,
    meteo: "☀️ 34°C prévu 11/07",
  },
  {
    id: "Séchoir Solaire B",
    lot: "LOT-045",
    type: "solaire",
    masseAvant: 580,
    masseActuelle: 482,
    humiditéInitiale: 42,
    humiditéActuelle: 12.4,
    humiditéCible: 8,
    jour: 6,
    dureeEstimee: "10–12 jours",
    statut: "alerte",
    alerte: "⚠️ Pluies prévues 12–13/07 — rentrer à l'abri !",
    meteo: "⛅ Nuageux 11/07",
  },
  {
    id: "Séchoir Artificiel A",
    lot: "LOT-046",
    type: "artificiel",
    masseAvant: 390,
    humiditéInitiale: 35,
    humiditéActuelle: 7.2,
    humiditéCible: 8,
    jour: 3,
    total: 3,
    dureeEstimee: "48–72h",
    statut: "presque_sec",
    alerte: null,
    tempSechoir: "55°C",
  },
  {
    id: "Séchoir Artificiel B",
    lot: "LOT-047",
    type: "artificiel",
    masseAvant: 320,
    humiditéInitiale: 35,
    humiditéActuelle: 9.8,
    humiditéCible: 8,
    jour: 2,
    total: 3,
    dureeEstimee: "48–72h",
    statut: "en_cours",
    alerte: null,
    tempSechoir: "55°C",
  },
];

// Courbe d'humidité LOT-045
const courbeHumidite = [
  { j: "J0", v: 42 },
  { j: "J1", v: 36 },
  { j: "J2", v: 28 },
  { j: "J3", v: 21 },
  { j: "J4", v: 16 },
  { j: "J5", v: 14 },
  { j: "J6", v: 12.4 },
];

// ─── CONDITIONNEMENT DATA ────────────────────────────────────────────────────
const lotsCondPrets = [
  {
    lot: "LOT-046",
    grade: "Grade A",
    masseSechee: 368,
    emballage: "Sacs jute 65 kg",
    nbSacs: 6,
    etiquettes: true,
    statut: "En attente pesée finale",
  },
];

const condTermines = [
  { lot: "LOT-043", masseSechee: 384, grade: "Grade AA", nbSacs: "6 sacs (64 kg)", destination: "EXP-2025-041 Barry Callebaut", date: "05/07" },
  { lot: "LOT-042", masseSechee: 312, grade: "Grade A", nbSacs: "5 sacs", destination: "EXP-2025-039 Olam", date: "03/07" },
  { lot: "LOT-041", masseSechee: 428, grade: "Grade A", nbSacs: "7 sacs", destination: "Stock Entrepôt A", date: "01/07" },
  { lot: "LOT-040", masseSechee: 496, grade: "Grade AA", nbSacs: "8 sacs", destination: "EXP-2025-039", date: "29/06" },
  { lot: "LOT-039", masseSechee: 362, grade: "Grade B", nbSacs: "6 sacs", destination: "Marché local", date: "27/06" },
];

// ─── QUALITE DATA ────────────────────────────────────────────────────────────
const analyseQualite = [
  { lot: "LOT-043", tauxFerment: "94%", humiditeFin: "7,2%", impuretes: "0,8%", calibre: "AA", grade: "Grade AA", score: 98, ok: true },
  { lot: "LOT-042", tauxFerment: "91%", humiditeFin: "7,8%", impuretes: "1,2%", calibre: "A", grade: "Grade A", score: 93, ok: true },
  { lot: "LOT-040", tauxFerment: "96%", humiditeFin: "6,9%", impuretes: "0,7%", calibre: "AA", grade: "Grade AA", score: 99, ok: true },
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function GradeBadge({ grade }: { grade: string }) {
  const isAA = grade.includes("AA");
  const isB = grade.includes("Grade B");
  const bg = isAA ? "bg-purple-100 text-purple-700" : isB ? "bg-amber-100 text-amber-700" : "bg-green-100 text-green-700";
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${bg}`}>
      {grade}
    </span>
  );
}

function TempBadge({ temp, ok }: { temp: number; ok: boolean }) {
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-medium ${ok ? "text-green-700" : "text-amber-600"}`}>
      <Thermometer size={12} />
      {temp}°C {ok ? "✅" : "🟡"}
    </span>
  );
}

function HumidBadge({ h, cible }: { h: number; cible: number }) {
  const ok = h <= cible;
  const warn = h <= cible + 5;
  const color = ok ? "text-green-700" : warn ? "text-amber-600" : "text-red-600";
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-medium ${color}`}>
      <Droplets size={12} />
      {h}% {ok ? "✅" : "🟡"}
    </span>
  );
}

// SVG courbe humidité
function CourbeHumidite() {
  const W = 400, H = 120, padX = 36, padY = 12;
  const innerW = W - padX * 2;
  const innerH = H - padY * 2;
  const maxV = 50;
  const pts = courbeHumidite.map((d, i) => {
    const x = padX + (i / (courbeHumidite.length - 1)) * innerW;
    const y = padY + innerH - (d.v / maxV) * innerH;
    return { x, y, ...d };
  });
  const pathD = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ");
  const areaD = `${pathD} L ${pts[pts.length - 1].x} ${padY + innerH} L ${pts[0].x} ${padY + innerH} Z`;
  // Ligne cible 8% → y
  const targetY = padY + innerH - (8 / maxV) * innerH;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ maxWidth: 420 }}>
      {/* Grille */}
      {[0, 10, 20, 30, 40, 50].map((v) => {
        const y = padY + innerH - (v / maxV) * innerH;
        return (
          <g key={v}>
            <line x1={padX} y1={y} x2={W - padX} y2={y} stroke="#E5E7EB" strokeWidth={0.5} />
            <text x={padX - 4} y={y + 4} textAnchor="end" fontSize={8} fill="#9CA3AF">{v}%</text>
          </g>
        );
      })}
      {/* Labels X */}
      {pts.map((p) => (
        <text key={p.j} x={p.x} y={H - 2} textAnchor="middle" fontSize={8} fill="#9CA3AF">{p.j}</text>
      ))}
      {/* Aire */}
      <path d={areaD} fill="#2E7D32" opacity={0.08} />
      {/* Courbe */}
      <path d={pathD} fill="none" stroke="#2E7D32" strokeWidth={2} strokeLinejoin="round" />
      {/* Points */}
      {pts.map((p) => (
        <circle key={p.j} cx={p.x} cy={p.y} r={3} fill="#2E7D32" />
      ))}
      {/* Ligne cible rouge pointillée */}
      <line x1={padX} y1={targetY} x2={W - padX} y2={targetY} stroke="#EF4444" strokeWidth={1.5} strokeDasharray="4 3" />
      <text x={W - padX + 2} y={targetY + 4} fontSize={8} fill="#EF4444">8%</text>
      {/* Valeur dernière */}
      {pts.map((p) => (
        <text key={`v-${p.j}`} x={p.x} y={p.y - 5} textAnchor="middle" fontSize={7.5} fill="#2E7D32" fontWeight="600">
          {p.v}%
        </text>
      ))}
    </svg>
  );
}

// ─── COMPONENT ───────────────────────────────────────────────────────────────
export default function TransformationPage() {
  const [tab, setTab] = useState<"fermentation" | "sechage" | "conditionnement" | "qualite">(
    "fermentation"
  );

  const tabs = [
    { key: "fermentation", label: "Fermentation" },
    { key: "sechage", label: "Séchage" },
    { key: "conditionnement", label: "Conditionnement" },
    { key: "qualite", label: "Qualité & Traçabilité" },
  ] as const;

  return (
    <div>
      <Topbar
        title="Transformation & Post-Récolte"
        breadcrumb={["Commerce", "Transformation"]}
      />

      <div className="p-6 space-y-6">
        {/* ── KPIs ── */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {kpis.map((kpi) => {
            const Icon = kpi.icon;
            return (
              <div
                key={kpi.label}
                className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700 shadow-sm"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-500 dark:text-gray-400 font-medium leading-tight">
                    {kpi.label}
                  </span>
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{ backgroundColor: kpi.iconBg }}
                  >
                    <Icon size={16} style={{ color: kpi.iconColor }} />
                  </div>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">{kpi.value}</span>
                  {kpi.unit && (
                    <span className="text-sm text-gray-500 dark:text-gray-400">{kpi.unit}</span>
                  )}
                </div>
                <p className="text-[11px] text-gray-400 mt-1">{kpi.sub}</p>
              </div>
            );
          })}
        </div>

        {/* ── Onglets ── */}
        <div className="border-b border-gray-200 dark:border-gray-700">
          <div className="flex gap-1">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`px-4 py-2.5 text-sm font-medium rounded-t-lg transition-colors ${
                  tab === t.key
                    ? "bg-white dark:bg-gray-800 border border-b-white dark:border-gray-700 dark:border-b-gray-800 text-[#2E7D32] border-gray-200"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* ═══════════════════════════════════════════
            ONGLET FERMENTATION
        ═══════════════════════════════════════════ */}
        {tab === "fermentation" && (
          <div className="space-y-6">
            {/* Explication */}
            <div className="flex items-start gap-3 bg-[#E8F5E9] dark:bg-green-900/20 rounded-xl p-4 border border-green-200 dark:border-green-800">
              <FlaskConical size={18} className="text-[#2E7D32] mt-0.5 shrink-0" />
              <p className="text-sm text-[#1B5E20] dark:text-green-300">
                Le cacao subit <strong>5–7 jours</strong> de fermentation anaérobie puis aérobie dans des bacs en bois.
                Température idéale : <strong>45–50°C</strong>. Retournement toutes les <strong>48h</strong>.
              </p>
            </div>

            {/* Grille bacs */}
            <div>
              <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                Bacs de fermentation actifs
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {bacs.map((bac) => {
                  const pct = Math.round((bac.jour / bac.total) * 100);
                  return (
                    <div
                      key={bac.id}
                      className={`bg-white dark:bg-gray-800 rounded-2xl border p-5 shadow-sm space-y-3 ${
                        bac.done
                          ? "border-green-300 dark:border-green-700"
                          : !bac.tempOk
                          ? "border-amber-300 dark:border-amber-700"
                          : "border-gray-100 dark:border-gray-700"
                      }`}
                    >
                      {/* En-tête */}
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-bold text-gray-900 dark:text-white text-sm">
                            Bac {bac.id}
                          </p>
                          <p className="text-xs font-mono text-[#2E7D32] mt-0.5">{bac.lot}</p>
                        </div>
                        {bac.done ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                            <CheckCircle size={11} /> Terminé ✅
                          </span>
                        ) : !bac.tempOk ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
                            <AlertTriangle size={11} /> Surveiller
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                            <Clock size={11} /> J{bac.jour}/{bac.total}
                          </span>
                        )}
                      </div>

                      {/* Infos */}
                      <div className="space-y-1 text-xs">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Variété</span>
                          <span className="font-medium text-gray-800 dark:text-gray-200">{bac.variete}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Origine</span>
                          <span className="font-medium text-gray-800 dark:text-gray-200">{bac.origine}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Masse initiale</span>
                          <span className="font-medium text-gray-800 dark:text-gray-200">{bac.masseInitiale} kg</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Début</span>
                          <span className="font-medium text-gray-800 dark:text-gray-200">{bac.debut}</span>
                        </div>
                        {!bac.done && bac.temp !== null && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-500">Température</span>
                            <TempBadge temp={bac.temp!} ok={bac.tempOk} />
                          </div>
                        )}
                        {!bac.done && bac.ph !== null && (
                          <div className="flex justify-between">
                            <span className="text-gray-500">pH</span>
                            <span className={`font-medium ${bac.phOk ? "text-green-700" : "text-amber-600"}`}>
                              {bac.ph} {bac.phOk ? "✅" : "🟡"}
                            </span>
                          </div>
                        )}
                        {!bac.done && (
                          <>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Dernier retournement</span>
                              <span className="font-medium text-gray-800 dark:text-gray-200">{bac.dernierRetournement}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Prochain ⏰</span>
                              <span className="font-medium text-amber-700 dark:text-amber-400">{bac.prochainRetournement}</span>
                            </div>
                          </>
                        )}
                      </div>

                      {/* Aspect visuel */}
                      <p className="text-[11px] text-gray-500 italic border-t border-gray-100 dark:border-gray-700 pt-2">
                        {bac.aspect}
                      </p>

                      {/* Barre progression */}
                      {!bac.done ? (
                        <div className="space-y-1">
                          <div className="flex justify-between text-[11px] text-gray-500">
                            <span>Progression</span>
                            <span className="font-medium text-gray-700 dark:text-gray-300">
                              {pct}% — Fin prévue {bac.finPrevue}
                            </span>
                          </div>
                          <div className="h-2 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all"
                              style={{
                                width: `${pct}%`,
                                backgroundColor: pct >= 80 ? "#4CAF50" : pct >= 50 ? "#2E7D32" : "#81C784",
                              }}
                            />
                          </div>
                        </div>
                      ) : (
                        <button className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-medium bg-[#2E7D32] text-white hover:bg-[#1B5E20] transition-colors">
                          <ArrowRight size={13} /> Transférer au séchage
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Journal retournements */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-700 flex items-center gap-2">
                <RotateCcw size={15} style={{ color: "#2E7D32" }} />
                <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
                  Journal des retournements
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-[#F8FBF8] dark:bg-gray-700/50 border-b border-gray-100 dark:border-gray-700">
                      {["Bac", "Lot", "Date/heure", "Opérateur", "Temp avant", "Temp après", "Observation"].map((h) => (
                        <th key={h} className="px-4 py-2.5 text-left text-xs font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
                    {journalRetournements.map((r, i) => (
                      <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                        <td className="px-4 py-2 font-bold text-gray-900 dark:text-white">{r.bac}</td>
                        <td className="px-4 py-2 font-mono text-[#2E7D32]">{r.lot}</td>
                        <td className="px-4 py-2 text-gray-600 dark:text-gray-400 whitespace-nowrap">{r.dateHeure}</td>
                        <td className="px-4 py-2 text-gray-700 dark:text-gray-300">{r.operateur}</td>
                        <td className="px-4 py-2 text-gray-600 dark:text-gray-400">{r.tempAvant}</td>
                        <td className="px-4 py-2 font-medium text-gray-800 dark:text-gray-200">{r.tempApres}</td>
                        <td className="px-4 py-2 text-gray-500 dark:text-gray-400">{r.obs}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════
            ONGLET SECHAGE
        ═══════════════════════════════════════════ */}
        {tab === "sechage" && (
          <div className="space-y-6">
            {/* Explication */}
            <div className="flex items-start gap-3 bg-amber-50 dark:bg-amber-900/20 rounded-xl p-4 border border-amber-200 dark:border-amber-800">
              <Sun size={18} className="text-amber-600 mt-0.5 shrink-0" />
              <p className="text-sm text-amber-900 dark:text-amber-300">
                Après fermentation, le cacao est séché à <strong>7–8% d'humidité</strong> (objectif &lt; 8%).
                Séchage solaire <strong>8–12 jours</strong> ou séchoir artificiel <strong>48–72h</strong>.
              </p>
            </div>

            {/* Cards séchoirs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sechoirs.map((s) => {
                const isSolaire = s.type === "solaire";
                const isAlerte = s.statut === "alerte";
                const isDone = s.humiditéActuelle <= s.humiditéCible;
                return (
                  <div
                    key={s.id}
                    className={`bg-white dark:bg-gray-800 rounded-2xl border p-5 shadow-sm space-y-3 ${
                      isAlerte
                        ? "border-red-300 dark:border-red-700"
                        : isDone
                        ? "border-green-300 dark:border-green-700"
                        : "border-gray-100 dark:border-gray-700"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          {isSolaire ? (
                            <Sun size={16} className="text-amber-500" />
                          ) : (
                            <Wind size={16} className="text-blue-500" />
                          )}
                          <p className="font-bold text-gray-900 dark:text-white text-sm">{s.id}</p>
                        </div>
                        <p className="text-xs font-mono text-[#2E7D32] mt-0.5">{s.lot}</p>
                      </div>
                      {isDone ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                          <CheckCircle size={11} /> Sec ✅
                        </span>
                      ) : isAlerte ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">
                          <AlertTriangle size={11} /> Alerte
                        </span>
                      ) : s.statut === "presque_sec" ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
                          <Clock size={11} /> Presque sec
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                          <Clock size={11} /> Jour {s.jour}
                        </span>
                      )}
                    </div>

                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Masse avant séchage</span>
                        <span className="font-medium text-gray-800 dark:text-gray-200">{s.masseAvant} kg</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Humidité initiale</span>
                        <span className="font-medium text-gray-800 dark:text-gray-200">{s.humiditéInitiale}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500">Humidité mesurée</span>
                        <HumidBadge h={s.humiditéActuelle} cible={s.humiditéCible} />
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Objectif</span>
                        <span className="font-medium text-red-600">&lt; {s.humiditéCible}%</span>
                      </div>
                      {s.tempSechoir && (
                        <div className="flex justify-between">
                          <span className="text-gray-500">Temp. séchoir</span>
                          <span className="font-medium text-gray-800 dark:text-gray-200">{s.tempSechoir}</span>
                        </div>
                      )}
                      {s.meteo && (
                        <div className="flex justify-between">
                          <span className="text-gray-500">Météo</span>
                          <span className="font-medium text-gray-800 dark:text-gray-200">{s.meteo}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-gray-500">Durée estimée</span>
                        <span className="font-medium text-gray-800 dark:text-gray-200">{s.dureeEstimee}</span>
                      </div>
                    </div>

                    {/* Barre progression humidité */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] text-gray-500">
                        <span>Progression séchage</span>
                        <span className="font-medium">{s.humiditéInitiale}% → {s.humiditéActuelle}% (cible {s.humiditéCible}%)</span>
                      </div>
                      <div className="h-2 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${Math.min(100, ((s.humiditéInitiale - s.humiditéActuelle) / (s.humiditéInitiale - s.humiditéCible)) * 100)}%`,
                            backgroundColor: isDone ? "#4CAF50" : isAlerte ? "#EF4444" : "#F59E0B",
                          }}
                        />
                      </div>
                    </div>

                    {/* Alerte */}
                    {s.alerte && (
                      <div className="flex items-start gap-2 bg-red-50 dark:bg-red-900/20 rounded-lg p-3 text-xs text-red-700 dark:text-red-400">
                        <AlertTriangle size={13} className="shrink-0 mt-0.5" />
                        {s.alerte}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Courbe humidité LOT-045 */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-5">
              <div className="flex items-center gap-2 mb-4">
                <Droplets size={15} style={{ color: "#2E7D32" }} />
                <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
                  Courbe de descente d'humidité — LOT-045 (Séchoir Solaire B)
                </h2>
              </div>
              <CourbeHumidite />
              <p className="text-[11px] text-gray-400 mt-2">
                La ligne rouge pointillée représente l'objectif &lt; 8% d'humidité.
                LOT-045 est à <strong>12,4%</strong> au J6 — encore 2–3 jours nécessaires.
              </p>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════
            ONGLET CONDITIONNEMENT
        ═══════════════════════════════════════════ */}
        {tab === "conditionnement" && (
          <div className="space-y-6">
            {/* Lots prêts */}
            <div>
              <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                Lots prêts pour conditionnement (humidité &lt; 8%)
              </h2>
              {lotsCondPrets.map((lot) => (
                <div
                  key={lot.lot}
                  className="bg-amber-50 dark:bg-amber-900/20 rounded-2xl border border-amber-200 dark:border-amber-700 p-5"
                >
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-900 dark:text-white text-sm font-mono">{lot.lot}</span>
                        <GradeBadge grade={lot.grade} />
                      </div>
                      <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                        <div>
                          <p className="text-gray-500">Masse séchée</p>
                          <p className="font-semibold text-gray-800 dark:text-gray-200 mt-0.5">{lot.masseSechee} kg</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Emballage</p>
                          <p className="font-semibold text-gray-800 dark:text-gray-200 mt-0.5">{lot.emballage}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Nombre de sacs</p>
                          <p className="font-semibold text-gray-800 dark:text-gray-200 mt-0.5">{lot.nbSacs} sacs</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Étiquettes</p>
                          <p className="font-semibold text-green-700 mt-0.5">
                            {lot.etiquettes ? "✅ Imprimées" : "⚠️ En attente"}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium bg-amber-100 text-amber-700 border border-amber-300">
                        <AlertTriangle size={12} /> {lot.statut}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Tableau conditionnement terminé */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-700">
                <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
                  Lots conditionnés récemment
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-[#F8FBF8] dark:bg-gray-700/50 border-b border-gray-100 dark:border-gray-700">
                      {["Lot", "Masse séchée", "Grade attribué", "Nb sacs", "Destination", "Date"].map((h) => (
                        <th key={h} className="px-4 py-2.5 text-left text-xs font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
                    {condTermines.map((lot) => (
                      <tr key={lot.lot} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                        <td className="px-4 py-2.5 font-mono font-medium text-gray-900 dark:text-white whitespace-nowrap">
                          {lot.lot}
                        </td>
                        <td className="px-4 py-2.5 text-gray-700 dark:text-gray-300">{lot.masseSechee} kg</td>
                        <td className="px-4 py-2.5 whitespace-nowrap">
                          <GradeBadge grade={lot.grade} />
                        </td>
                        <td className="px-4 py-2.5 text-gray-700 dark:text-gray-300 whitespace-nowrap">{lot.nbSacs}</td>
                        <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400 whitespace-nowrap">{lot.destination}</td>
                        <td className="px-4 py-2.5 text-gray-500 dark:text-gray-400 whitespace-nowrap">{lot.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════
            ONGLET QUALITE & TRACABILITE
        ═══════════════════════════════════════════ */}
        {tab === "qualite" && (
          <div className="space-y-6">
            {/* Tableau analyse qualité */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-700 flex items-center gap-2">
                <Award size={15} style={{ color: "#2E7D32" }} />
                <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
                  Résultats analyse qualité — lots terminés
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-[#F8FBF8] dark:bg-gray-700/50 border-b border-gray-100 dark:border-gray-700">
                      {["Lot", "Taux ferment.", "Humidité finale", "Impuretés", "Calibre", "Grade", "Score"].map((h) => (
                        <th key={h} className="px-4 py-2.5 text-left text-xs font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
                    {analyseQualite.map((lot) => (
                      <tr key={lot.lot} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                        <td className="px-4 py-3 font-mono font-medium text-gray-900 dark:text-white whitespace-nowrap">
                          {lot.lot}
                        </td>
                        <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{lot.tauxFerment}</td>
                        <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{lot.humiditeFin}</td>
                        <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{lot.impuretes}</td>
                        <td className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">{lot.calibre}</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <GradeBadge grade={lot.grade} />
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className={`inline-flex items-center gap-1 font-bold text-sm ${lot.ok ? "text-green-700" : "text-amber-600"}`}>
                            {lot.score}/100 {lot.ok ? "✅" : ""}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Test de coupe */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-5">
              <div className="flex items-center gap-2 mb-4">
                <FlaskConical size={15} style={{ color: "#2E7D32" }} />
                <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
                  Test de coupe (Cut Test)
                </h2>
              </div>

              <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-700 p-4 space-y-3">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      LOT-052 — Bac A1 (Fermentation J3)
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">20 fèves analysées</p>
                  </div>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
                    🟡 Fermentation en cours
                  </span>
                </div>

                {/* Résultats visuels */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Bien fermentées", count: 16, pct: 80, color: "#2E7D32", bg: "#E8F5E9" },
                    { label: "Partiellement fermentées", count: 3, pct: 15, color: "#F59E0B", bg: "#FFFDE7" },
                    { label: "Ardoisées", count: 1, pct: 5, color: "#EF4444", bg: "#FEF2F2" },
                  ].map((r) => (
                    <div key={r.label} className="rounded-lg p-3 text-center" style={{ backgroundColor: r.bg }}>
                      <p className="text-2xl font-bold" style={{ color: r.color }}>{r.count}</p>
                      <p className="text-[11px] text-gray-600 mt-1">{r.label}</p>
                      <p className="text-xs font-semibold mt-1" style={{ color: r.color }}>{r.pct}%</p>
                    </div>
                  ))}
                </div>

                {/* Barre résultat */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Taux de fermentation actuel</span>
                    <span className="font-semibold text-amber-700">80% — viser 85%+ à J5</span>
                  </div>
                  <div className="h-3 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden flex">
                    <div className="h-full" style={{ width: "80%", backgroundColor: "#2E7D32" }} />
                    <div className="h-full" style={{ width: "15%", backgroundColor: "#F59E0B" }} />
                    <div className="h-full" style={{ width: "5%", backgroundColor: "#EF4444" }} />
                  </div>
                </div>

                <p className="text-[11px] text-amber-700 dark:text-amber-400 flex items-center gap-1">
                  <AlertTriangle size={12} />
                  Résultat attendu à J5 : 85%+ bien fermentées pour validation Grade A
                </p>
              </div>
            </div>

            {/* Traçabilité rapide */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-5">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle size={15} style={{ color: "#2E7D32" }} />
                <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
                  Traçabilité — Chaîne de custody
                </h2>
              </div>
              <div className="space-y-2">
                {[
                  { etape: "Récolte", lot: "LOT-043", detail: "Exploitation PAR-A1 — 05/07/2025", ok: true },
                  { etape: "Fermentation", lot: "LOT-043", detail: "Bac A1 — 6 jours — Indice 94%", ok: true },
                  { etape: "Séchage", lot: "LOT-043", detail: "Séchoir Artificiel A — 3 jours — 7,2%", ok: true },
                  { etape: "Conditionnement", lot: "LOT-043", detail: "6 sacs jute 64 kg — Grade AA certifié", ok: true },
                  { etape: "Export", lot: "LOT-043", detail: "EXP-2025-041 Barry Callebaut — 05/07", ok: true },
                ].map((step, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="flex flex-col items-center">
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold"
                        style={{ backgroundColor: step.ok ? "#2E7D32" : "#9CA3AF" }}
                      >
                        {i + 1}
                      </div>
                      {i < 4 && <div className="w-0.5 h-4 bg-gray-200 dark:bg-gray-700" />}
                    </div>
                    <div className="flex-1 py-1">
                      <p className="text-xs font-semibold text-gray-900 dark:text-white">{step.etape}</p>
                      <p className="text-[11px] text-gray-500">{step.detail}</p>
                    </div>
                    {step.ok && <CheckCircle size={14} className="text-green-600 shrink-0" />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
