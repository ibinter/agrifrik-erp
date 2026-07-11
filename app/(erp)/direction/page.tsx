"use client";

import { useState } from "react";
import Topbar from "../../components/Topbar";

// ─── KPI Ligne 1 ────────────────────────────────────────────────────────────

const kpis = [
  {
    label: "CA S1 2025",
    value: "145,2 M XOF",
    variation: "+18,4% vs S1 2024",
    dir: "up",
    detail: "S1 2024 : 122,6 M XOF",
  },
  {
    label: "EBITDA",
    value: "38,4 M XOF",
    variation: "+2,1 pts",
    dir: "up",
    detail: "Marge 26,4%",
  },
  {
    label: "Résultat net",
    value: "22,8 M XOF",
    variation: "+24,6%",
    dir: "up",
    detail: "18,3 M XOF en S1 2024",
  },
  {
    label: "Production S1",
    value: "87,4 t",
    variation: "+12,1%",
    dir: "up",
    detail: "vs 77,9 t en 2024",
  },
  {
    label: "Trésorerie nette",
    value: "34,2 M XOF",
    variation: "Positive",
    dir: "up",
    detail: "Solde au 11/07/2025",
  },
  {
    label: "Effectif total",
    value: "287",
    variation: "+12 vs 2024",
    dir: "up",
    detail: "275 en 2024",
  },
];

// ─── Scorecard ───────────────────────────────────────────────────────────────

const scorecard = [
  {
    titre: "Croissance CA",
    cible: "280 M XOF annuel",
    realise: "145,2 M (51,9%)",
    statut: "green",
    label: "En bonne voie",
    pct: 52,
  },
  {
    titre: "Diversification cultures",
    cible: "35% CA hors cacao",
    realise: "30% (anacarde + autres)",
    statut: "amber",
    label: "En cours — +5 pts S2",
    pct: 86,
  },
  {
    titre: "Certifications RA",
    cible: "100% lots exportés certifiés",
    realise: "94% lots certifiés",
    statut: "amber",
    label: "Presque atteint",
    pct: 94,
  },
  {
    titre: "Réduction coûts",
    cible: "-5% coûts de production/t",
    realise: "-3,8% (mécanisation)",
    statut: "amber",
    label: "En cours — amélioration S2",
    pct: 76,
  },
  {
    titre: "Expansion surfaces",
    cible: "+10 ha nouvelles parcelles",
    realise: "+6,4 ha (PAR-E1, PAR-E2)",
    statut: "amber",
    label: "En cours — 3,6 ha en négo",
    pct: 64,
  },
  {
    titre: "Formation & RH",
    cible: "100% techniciens formés RA",
    realise: "100% — 32 agents certifiés",
    statut: "green",
    label: "Objectif atteint",
    pct: 100,
  },
];

// ─── Données graphique mensuel N vs N-1 ─────────────────────────────────────

const moisData = [
  { m: "Jan", n: 8.2, n1: 6.8 },
  { m: "Fév", n: 9.4, n1: 7.2 },
  { m: "Mar", n: 12.1, n1: 10.4 },
  { m: "Avr", n: 14.8, n1: 11.2 },
  { m: "Mai", n: 16.2, n1: 13.8 },
  { m: "Jun", n: 14.5, n1: 12.6 },
  { m: "Jul", n: 16.8, n1: 13.9, prev: true },
  { m: "Aoû", n: 18.2, n1: 15.2, prev: true },
  { m: "Sep", n: 19.4, n1: 16.1, prev: true },
  { m: "Oct", n: 22.8, n1: 19.2, prev: true },
  { m: "Nov", n: 21.6, n1: 18.4, prev: true },
  { m: "Déc", n: 20.1, n1: 17.0, prev: true },
];

// ─── Risques & Opportunités ──────────────────────────────────────────────────

const risques = [
  {
    niveau: "red",
    titre: "Volatilité prix cacao (+/- 15%)",
    impact: "Impact CA : ±21 M XOF",
    mitigation: "Contrats à prix fixe",
  },
  {
    niveau: "amber",
    titre: "Retard audit RA 2 parcelles",
    impact: "6% lots en risque de déclassement",
    mitigation: "Audit d'urgence programmé 15/09",
  },
  {
    niveau: "amber",
    titre: "Dépendance Barry Callebaut (29% CA)",
    impact: "Risque de concentration client",
    mitigation: "Diversification Ritter Sport S2",
  },
];

const opportunites = [
  {
    niveau: "green",
    titre: "Cours cacao historiquement élevé",
    detail: "Potentiel +8–12 M XOF",
    action: "Maximiser production S2",
  },
  {
    niveau: "green",
    titre: "Label bio en cours (2 parcelles)",
    detail: "Accès marché premium +15-20% prix/kg",
    action: "Finaliser certification Q3 2025",
  },
  {
    niveau: "green",
    titre: "Contrat Ritter Sport signé",
    detail: "+12,8 M XOF annuel",
    action: "Livraison Oct 2025",
  },
];

// ─── Actions prioritaires CEO ────────────────────────────────────────────────

const actions = [
  {
    checked: false,
    titre: "Finaliser négociation 3,6 ha parcelles E3-E4",
    owner: "DGA",
    deadline: "31/07",
  },
  {
    checked: false,
    titre: "Valider budget investissement drone supplémentaire",
    owner: "DAF",
    deadline: "20/07",
  },
  {
    checked: false,
    titre: "Rencontre Barry Callebaut Paris — Renouvellement contrat 3 ans",
    owner: "PDG",
    deadline: "15/09",
  },
  {
    checked: false,
    titre: "Audit interne RA parcelles PAR-C2, PAR-D1",
    owner: "Resp. Qualité",
    deadline: "01/08",
  },
  {
    checked: false,
    titre: "Clôturer recrutement 2 techniciens cacao",
    owner: "DRH",
    deadline: "15/08",
  },
];

// ─── SVG Bar chart groupé (N vs N-1) ────────────────────────────────────────

function ChartNvsN1() {
  const W = 700;
  const H = 200;
  const PAD = { top: 20, right: 16, bottom: 36, left: 44 };
  const chartW = W - PAD.left - PAD.right;
  const chartH = H - PAD.top - PAD.bottom;
  const maxVal = 25;
  const groupW = chartW / moisData.length;
  const barW = Math.max(groupW / 3, 6);
  const yLabels = [0, 5, 10, 15, 20, 25];

  const toY = (v: number) => PAD.top + chartH - (v / maxVal) * chartH;
  const xN1 = (i: number) => PAD.left + i * groupW + groupW * 0.12;
  const xN = (i: number) => PAD.left + i * groupW + groupW * 0.12 + barW + 2;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" aria-label="CA mensuel 2025 vs 2024">
      {/* fond */}
      <rect x={PAD.left} y={PAD.top} width={chartW} height={chartH} rx="4" fill="#f9fafb" />

      {/* grille horizontale */}
      {yLabels.map((v) => {
        const y = toY(v);
        return (
          <g key={v}>
            <line x1={PAD.left} y1={y} x2={PAD.left + chartW} y2={y} stroke="#e5e7eb" strokeWidth="1" />
            <text x={PAD.left - 5} y={y + 4} textAnchor="end" fontSize="8" fill="#9ca3af">
              {v === 0 ? "" : `${v}M`}
            </text>
          </g>
        );
      })}

      {/* barres */}
      {moisData.map((d, i) => {
        const y1 = toY(d.n1);
        const h1 = toY(0) - y1;
        const y2 = toY(d.n);
        const h2 = toY(0) - y2;
        const xCenter = PAD.left + i * groupW + groupW / 2;
        return (
          <g key={d.m}>
            {/* N-1 */}
            {d.prev ? (
              <rect x={xN1(i)} y={y1} width={barW} height={h1} rx="2" fill="#a7d7a9" strokeDasharray="3 2" stroke="#4CAF50" strokeWidth="0.5" />
            ) : (
              <rect x={xN1(i)} y={y1} width={barW} height={h1} rx="2" fill="#a7d7a9" />
            )}
            {/* N */}
            {d.prev ? (
              <>
                <defs>
                  <pattern id={`hN${i}`} patternUnits="userSpaceOnUse" width="5" height="5" patternTransform="rotate(45)">
                    <line x1="0" y1="0" x2="0" y2="5" stroke="#1B5E20" strokeWidth="2.5" strokeOpacity="0.5" />
                  </pattern>
                </defs>
                <rect x={xN(i)} y={y2} width={barW} height={h2} rx="2" fill={`url(#hN${i})`} />
                <rect x={xN(i)} y={y2} width={barW} height={h2} rx="2" fill="none" stroke="#2E7D32" strokeWidth="1" strokeDasharray="3 2" />
              </>
            ) : (
              <rect x={xN(i)} y={y2} width={barW} height={h2} rx="2" fill="#2E7D32" />
            )}
            {/* label X */}
            <text x={xCenter} y={H - PAD.bottom + 14} textAnchor="middle" fontSize="8" fill="#6b7280">
              {d.m}
            </text>
          </g>
        );
      })}

      {/* légende */}
      <rect x={PAD.left} y={H - 6} width={10} height={7} rx="1" fill="#a7d7a9" />
      <text x={PAD.left + 13} y={H + 2} fontSize="8" fill="#6b7280">CA 2024 (N-1)</text>
      <rect x={PAD.left + 78} y={H - 6} width={10} height={7} rx="1" fill="#2E7D32" />
      <text x={PAD.left + 91} y={H + 2} fontSize="8" fill="#6b7280">CA 2025 (N)</text>
      <rect x={PAD.left + 160} y={H - 6} width={10} height={7} rx="1" fill="none" stroke="#2E7D32" strokeWidth="1" strokeDasharray="3 2" />
      <text x={PAD.left + 173} y={H + 2} fontSize="8" fill="#6b7280">Prévisions S2</text>
    </svg>
  );
}

// ─── Page principale ─────────────────────────────────────────────────────────

export default function DirectionPage() {
  const [checkedActions, setCheckedActions] = useState<boolean[]>(
    actions.map((a) => a.checked)
  );

  const toggle = (i: number) => {
    setCheckedActions((prev) => {
      const next = [...prev];
      next[i] = !next[i];
      return next;
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950">
      <Topbar title="Tableau de Bord Direction" breadcrumb={["Rapports & BI", "Direction"]} />

      <main className="flex-1 p-6 space-y-6 max-w-screen-xl mx-auto w-full">

        {/* ── Bandeau exécutif ── */}
        <div className="rounded-xl bg-[#1B5E20] text-white px-6 py-3 flex flex-wrap items-center gap-x-6 gap-y-1 text-sm font-medium">
          <span>Bilan au <strong>11 juillet 2025</strong> — Campagne 2024-2025</span>
          <span className="opacity-60">|</span>
          <span>Exercice en cours : <strong>S1 2025</strong></span>
          <span className="opacity-60">|</span>
          <span>
            Cours cacao : <strong>1 087 XOF/kg</strong>{" "}
            <span className="text-green-300 font-bold">↑ +3,2%</span>
          </span>
        </div>

        {/* ── 6 KPI ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {kpis.map((kpi) => (
            <div
              key={kpi.label}
              className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:bg-gray-900 dark:border-gray-800"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                {kpi.label}
              </p>
              <p className="mt-2 text-2xl font-black text-gray-900 dark:text-white">
                {kpi.value}
              </p>
              <div className="mt-3 flex items-center justify-between">
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                    kpi.dir === "up"
                      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                      : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                  }`}
                >
                  {kpi.dir === "up" ? "↑" : "↓"} {kpi.variation}
                </span>
                <span className="text-xs text-gray-400 dark:text-gray-500">{kpi.detail}</span>
              </div>
            </div>
          ))}
        </div>

        {/* ── Scorecard stratégique 2025 ── */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:bg-gray-900 dark:border-gray-800">
          <h2 className="text-sm font-bold text-gray-900 dark:text-white mb-4">
            Scorecard stratégique 2025
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {scorecard.map((obj) => (
              <div
                key={obj.titre}
                className="rounded-xl border border-gray-100 dark:border-gray-700 bg-[#F8FBF8] dark:bg-gray-800 p-4"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <p className="text-sm font-bold text-gray-800 dark:text-white leading-tight">{obj.titre}</p>
                  <span
                    className={`shrink-0 text-xs font-semibold px-2 py-0.5 rounded-full ${
                      obj.statut === "green"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {obj.statut === "green" ? "✅" : "🟡"} {obj.label}
                  </span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">
                  Cible : {obj.cible}
                </p>
                <p className="text-xs text-gray-700 dark:text-gray-300 mb-3">
                  Réalisé : <strong>{obj.realise}</strong>
                </p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        obj.statut === "green" ? "bg-emerald-500" : "bg-amber-400"
                      }`}
                      style={{ width: `${obj.pct}%` }}
                    />
                  </div>
                  <span
                    className={`text-xs font-bold tabular-nums ${
                      obj.statut === "green" ? "text-emerald-600" : "text-amber-600"
                    }`}
                  >
                    {obj.pct}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Évolution financière N vs N-1 ── */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:bg-gray-900 dark:border-gray-800">
          <div className="mb-4">
            <h2 className="text-sm font-bold text-gray-900 dark:text-white">
              Évolution financière — CA mensuel 2025 vs 2024
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              Millions XOF · Janvier–Juin réalisés · Juillet–Décembre prévisions
            </p>
          </div>
          <div className="overflow-x-auto">
            <ChartNvsN1 />
          </div>
        </div>

        {/* ── Risques & Opportunités ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Risques */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:bg-gray-900 dark:border-gray-800">
            <h2 className="text-sm font-bold text-gray-900 dark:text-white mb-4">
              Top Risques
            </h2>
            <div className="space-y-3">
              {risques.map((r, i) => (
                <div
                  key={i}
                  className={`rounded-xl p-3.5 border-l-4 ${
                    r.niveau === "red"
                      ? "border-red-500 bg-red-50 dark:bg-red-900/10"
                      : "border-amber-400 bg-amber-50 dark:bg-amber-900/10"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span>{r.niveau === "red" ? "🔴" : "🟡"}</span>
                    <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">{r.titre}</p>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 ml-6">
                    <strong>Impact :</strong> {r.impact}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 ml-6 mt-0.5">
                    <strong>Mitigation :</strong> {r.mitigation}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Opportunités */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:bg-gray-900 dark:border-gray-800">
            <h2 className="text-sm font-bold text-gray-900 dark:text-white mb-4">
              Top Opportunités
            </h2>
            <div className="space-y-3">
              {opportunites.map((o, i) => (
                <div
                  key={i}
                  className="rounded-xl p-3.5 border-l-4 border-emerald-500 bg-emerald-50 dark:bg-emerald-900/10"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span>🟢</span>
                    <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">{o.titre}</p>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 ml-6">
                    <strong>Potentiel :</strong> {o.detail}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 ml-6 mt-0.5">
                    <strong>Action :</strong> {o.action}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Actions prioritaires CEO ── */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:bg-gray-900 dark:border-gray-800">
          <h2 className="text-sm font-bold text-gray-900 dark:text-white mb-4">
            Actions prioritaires CEO
          </h2>
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {actions.map((a, i) => (
              <div
                key={i}
                className="flex items-center gap-3 py-3 hover:bg-gray-50 dark:hover:bg-gray-800/30 px-2 rounded-lg transition-colors"
              >
                <button
                  onClick={() => toggle(i)}
                  className={`shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                    checkedActions[i]
                      ? "bg-[#2E7D32] border-[#2E7D32]"
                      : "border-gray-300 dark:border-gray-600"
                  }`}
                  aria-label={checkedActions[i] ? "Marquer non fait" : "Marquer fait"}
                >
                  {checkedActions[i] && (
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>
                <p
                  className={`flex-1 text-sm ${
                    checkedActions[i]
                      ? "line-through text-gray-400 dark:text-gray-600"
                      : "text-gray-800 dark:text-gray-200"
                  }`}
                >
                  {a.titre}
                </p>
                <span className="shrink-0 text-xs font-semibold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">
                  {a.owner}
                </span>
                <span className="shrink-0 text-xs font-semibold text-[#E65100] bg-orange-50 dark:bg-orange-900/20 px-2 py-0.5 rounded">
                  {a.deadline}
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
