"use client";

import { useState } from "react";
import Topbar from "../../components/Topbar";

// ─── Types ────────────────────────────────────────────────────────────────────

type Tab = "environnement" | "social" | "economie" | "reporting";

// ─── Score global & piliers ───────────────────────────────────────────────────

const piliers = [
  { label: "Environnement", score: 78, color: "#2E7D32", bg: "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300" },
  { label: "Social", score: 88, color: "#1565C0", bg: "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300" },
  { label: "Économie locale", score: 85, color: "#E65100", bg: "bg-orange-50 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300" },
  { label: "Gouvernance", score: 79, color: "#6A1B9A", bg: "bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300" },
];

// ─── SVG circle score ─────────────────────────────────────────────────────────

function CircleScore({ score, color, label }: { score: number; color: string; label: string }) {
  const r = 32;
  const circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;
  return (
    <div className="flex flex-col items-center gap-1.5">
      <svg width="84" height="84" viewBox="0 0 84 84">
        <circle cx="42" cy="42" r={r} fill="none" stroke="#e5e7eb" strokeWidth="7" />
        <circle
          cx="42"
          cy="42"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="7"
          strokeDasharray={`${dash} ${circ - dash}`}
          strokeDashoffset={circ / 4}
          strokeLinecap="round"
        />
        <text x="42" y="45" textAnchor="middle" fontSize="16" fontWeight="800" fill={color}>
          {score}
        </text>
        <text x="42" y="57" textAnchor="middle" fontSize="8" fill="#9ca3af">/100</text>
      </svg>
      <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 text-center">{label}</span>
    </div>
  );
}

// ─── Indicateur ligne ─────────────────────────────────────────────────────────

function IndicLine({
  label,
  value,
  sub,
  ok,
}: {
  label: string;
  value: string;
  sub?: string;
  ok?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-4 py-3 border-b border-gray-100 dark:border-gray-800 last:border-0">
      <div className="flex-1">
        <p className="text-sm text-gray-700 dark:text-gray-300">{label}</p>
        {sub && <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{sub}</p>}
      </div>
      <div className="flex items-center gap-1.5 shrink-0">
        <span className="text-sm font-bold text-gray-900 dark:text-white">{value}</span>
        {ok !== undefined && (
          <span className={ok ? "text-emerald-500" : "text-amber-500"} title={ok ? "Objectif atteint" : "En cours"}>
            {ok ? "✅" : "🟡"}
          </span>
        )}
      </div>
    </div>
  );
}

// ─── ODD Tableau ─────────────────────────────────────────────────────────────

const odds = [
  { num: "ODD 1", titre: "Pas de pauvreté", score: 85, statut: "Bon" },
  { num: "ODD 2", titre: "Faim zéro", score: 90, statut: "Excellent" },
  { num: "ODD 3", titre: "Bonne santé", score: 88, statut: "Bon" },
  { num: "ODD 5", titre: "Égalité des sexes", score: 62, statut: "En cours" },
  { num: "ODD 8", titre: "Travail décent", score: 84, statut: "Bon" },
  { num: "ODD 12", titre: "Consommation responsable", score: 78, statut: "Bon" },
  { num: "ODD 13", titre: "Action pour le climat", score: 72, statut: "En cours" },
  { num: "ODD 15", titre: "Vie terrestre", score: 80, statut: "Bon" },
];

const engagements = [
  { annee: "2025", action: "Atteindre 100% lots exportés certifiés RA" },
  { annee: "2025", action: "Obtenir label AB sur 2 parcelles pilotes" },
  { annee: "2026", action: "Porter parité femmes à 45% de l'effectif" },
  { annee: "2026", action: "Réduire consommation eau de 30% vs 2023" },
  { annee: "2027", action: "Bilan carbone négatif sur l'ensemble des exploitations" },
  { annee: "2027", action: "100% emballages biodégradables pour l'export" },
];

// ─── Page principale ─────────────────────────────────────────────────────────

export default function RSEPage() {
  const [tab, setTab] = useState<Tab>("environnement");
  const scoreGlobal = 82;

  const tabs: { key: Tab; label: string }[] = [
    { key: "environnement", label: "Environnement" },
    { key: "social", label: "Social" },
    { key: "economie", label: "Économie locale" },
    { key: "reporting", label: "Reporting" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950">
      <Topbar title="Responsabilité Sociétale" breadcrumb={["Administration", "RSE"]} />

      <main className="flex-1 p-6 space-y-6 max-w-screen-xl mx-auto w-full">

        {/* ── Score RSE global ── */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:bg-gray-900 dark:border-gray-800">
          <div className="flex flex-col lg:flex-row lg:items-center gap-6">

            {/* Score principal */}
            <div className="flex-1">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-1">
                Score RSE global — AGRIFRIK 2025
              </p>
              <div className="flex items-end gap-3 mb-3">
                <span className="text-5xl font-extrabold text-[#2E7D32] dark:text-emerald-400">
                  {scoreGlobal}
                </span>
                <span className="text-2xl font-bold text-gray-300 dark:text-gray-600 mb-1">/100</span>
                <span className="text-sm font-semibold px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 mb-1">
                  +4 pts vs 2024
                </span>
              </div>
              <div className="w-full h-3 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden mb-1">
                <div
                  className="h-full rounded-full bg-[#2E7D32] transition-all"
                  style={{ width: `${scoreGlobal}%` }}
                />
              </div>
              <p className="text-xs text-gray-400 dark:text-gray-500">
                Évaluation interne — Référentiel GRI / ISO 26000 · Audité annuellement
              </p>
            </div>

            {/* 4 piliers en cercles */}
            <div className="flex flex-wrap gap-6 justify-center lg:justify-end">
              {piliers.map((p) => (
                <CircleScore key={p.label} score={p.score} color={p.color} label={p.label} />
              ))}
            </div>
          </div>
        </div>

        {/* ── Onglets ── */}
        <div className="rounded-2xl border border-gray-100 bg-white shadow-sm dark:bg-gray-900 dark:border-gray-800 overflow-hidden">

          {/* Tab bar */}
          <div className="flex border-b border-gray-100 dark:border-gray-800 overflow-x-auto">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`shrink-0 px-5 py-3.5 text-sm font-semibold transition-colors border-b-2 ${
                  tab === t.key
                    ? "border-[#2E7D32] text-[#2E7D32] dark:text-emerald-400"
                    : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Contenu onglet */}
          <div className="p-5">

            {/* ── Environnement ── */}
            {tab === "environnement" && (
              <div className="space-y-1">
                <IndicLine
                  label="Surface sous certification Rainforest Alliance"
                  value="62 ha"
                  sub="100% des parcelles actives certifiées"
                  ok={true}
                />
                <IndicLine
                  label="Bilan carbone estimé"
                  value="-18,4 t CO2eq"
                  sub="Séquestration forêt cacaoyère — Score positif"
                  ok={true}
                />
                <IndicLine
                  label="Irrigation goutte-à-goutte"
                  value="100%"
                  sub="Consommation : 145 000 m³/an · -22% vs 2023"
                  ok={true}
                />
                <IndicLine
                  label="Zéro plastique usage unique"
                  value="Depuis 2024"
                  sub="Compostage 100% déchets végétaux"
                  ok={true}
                />
                <IndicLine
                  label="Biodiversité — espèces d'oiseaux recensées"
                  value="34 espèces"
                  sub="8 arbres d'ombrage par hectare"
                  ok={true}
                />
                <IndicLine
                  label="Label Agriculture Biologique (parcelles pilotes)"
                  value="En cours"
                  sub="Certification prévue Q4 2025"
                  ok={false}
                />
              </div>
            )}

            {/* ── Social ── */}
            {tab === "social" && (
              <div className="space-y-1">
                <IndicLine
                  label="Emplois directs créés"
                  value="287 emplois"
                  sub="+ 120 emplois indirects (transport, prestataires)"
                  ok={true}
                />
                <IndicLine
                  label="Parité femmes"
                  value="38%"
                  sub="Objectif 50% d'ici 2027"
                  ok={false}
                />
                <IndicLine
                  label="Formations dispensées"
                  value="12 / an"
                  sub="100% techniciens certifiés Rainforest Alliance"
                  ok={true}
                />
                <IndicLine
                  label="Sécurité — Accidents graves 2025"
                  value="0 accident"
                  sub="Taux de fréquence : 2,1 — Objectif < 3 ✅"
                  ok={true}
                />
                <IndicLine
                  label="Coopérative agricole"
                  value="142 membres"
                  sub="Micro-crédit : 84 bénéficiaires · Taux remboursement : 97%"
                  ok={true}
                />
                <IndicLine
                  label="Couverture santé"
                  value="100% CDI/CDD"
                  sub="Mutuelle santé · 1 infirmier sur site"
                  ok={true}
                />
              </div>
            )}

            {/* ── Économie locale ── */}
            {tab === "economie" && (
              <div className="space-y-1">
                <IndicLine
                  label="Achats locaux — fournisseurs ivoiriens"
                  value="68%"
                  sub="Part des intrants achetés en Côte d'Ivoire"
                  ok={true}
                />
                <IndicLine
                  label="Taxes payées en Côte d'Ivoire (2024)"
                  value="22,4 M XOF"
                  sub="Contribuable modèle — BCC Abidjan"
                  ok={true}
                />
                <IndicLine
                  label="Investissement communautaire"
                  value="2,8 M XOF"
                  sub="Forages d'eau, réhabilitation école, dispensaire village"
                  ok={true}
                />
                <IndicLine
                  label="Prime qualité payée aux producteurs coopérative"
                  value="+12% vs marché"
                  sub="Prix plancher garanti même en cas de chute des cours"
                  ok={true}
                />
                <IndicLine
                  label="Fournisseurs locaux référencés"
                  value="34 fournisseurs"
                  sub="dont 18 PME ivoiriennes certifiées"
                  ok={true}
                />
                <IndicLine
                  label="Part CA réinvestie localement"
                  value="61%"
                  sub="Salaires, achats, taxes et investissements CI"
                  ok={true}
                />
              </div>
            )}

            {/* ── Reporting ── */}
            {tab === "reporting" && (
              <div className="space-y-6">

                {/* ODD */}
                <div>
                  <h3 className="text-sm font-bold text-gray-800 dark:text-white mb-3">
                    Contribution aux ODD (Objectifs de Développement Durable)
                  </h3>
                  <div className="overflow-x-auto rounded-xl border border-gray-100 dark:border-gray-800">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-[#F8FBF8] dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
                          {["ODD", "Domaine", "Score", "Statut"].map((h) => (
                            <th
                              key={h}
                              className="text-left px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                            >
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {odds.map((o, i) => (
                          <tr
                            key={i}
                            className="border-b border-gray-50 dark:border-gray-800 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800/30"
                          >
                            <td className="px-4 py-3">
                              <span className="text-xs font-bold text-[#2E7D32] dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-0.5 rounded">
                                {o.num}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{o.titre}</td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <div className="w-20 h-2 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
                                  <div
                                    className={`h-full rounded-full ${
                                      o.score >= 80 ? "bg-emerald-500" : "bg-amber-400"
                                    }`}
                                    style={{ width: `${o.score}%` }}
                                  />
                                </div>
                                <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
                                  {o.score}/100
                                </span>
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <span
                                className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                                  o.statut === "Excellent"
                                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                                    : o.statut === "Bon"
                                    ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                                    : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                                }`}
                              >
                                {o.statut}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Rapport RSE 2024 */}
                <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-[#F8FBF8] dark:bg-gray-800 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">Rapport RSE 2024</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      Rapport annuel complet — GRI Standards · 48 pages · PDF
                    </p>
                  </div>
                  <button className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-[#2E7D32] text-white text-xs font-medium px-4 py-2 hover:bg-[#1B5E20] transition-colors">
                    Télécharger PDF
                  </button>
                </div>

                {/* Engagements 2025-2027 */}
                <div>
                  <h3 className="text-sm font-bold text-gray-800 dark:text-white mb-3">
                    Prochains engagements 2025–2027
                  </h3>
                  <div className="space-y-2">
                    {engagements.map((e, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 rounded-lg border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 py-3"
                      >
                        <span className="shrink-0 text-xs font-bold text-[#E65100] bg-orange-50 dark:bg-orange-900/20 px-2 py-0.5 rounded">
                          {e.annee}
                        </span>
                        <p className="text-sm text-gray-700 dark:text-gray-300">{e.action}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
