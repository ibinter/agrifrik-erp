"use client";

import { useState } from "react";
import Topbar from "../../components/Topbar";

const TABS = ["Alertes actives", "Règles", "Historique"] as const;
type Tab = typeof TABS[number];

// ─── SVG Alertes par mois (stacked bar) ─────────────────────────────────────
function AlertesHistoChart() {
  const months = ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun"];
  // [critiques, importantes, infos]
  const data = [
    [2, 3, 2],
    [1, 4, 3],
    [2, 5, 4],
    [1, 3, 2],
    [2, 4, 3],
    [3, 4, 2],
  ];
  const W = 400;
  const H = 180;
  const padL = 36;
  const padB = 30;
  const padT = 20;
  const maxVal = 12;
  const avail = H - padB - padT;
  const slotW = (W - padL - 8) / 6;
  const bw = slotW * 0.55;
  const fy = (v: number) => padT + avail * (1 - v / maxVal);
  const colors = ["#ef4444", "#f97316", "#22c55e"];

  return (
    <div className="overflow-x-auto">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-[400px]">
        {[0, 3, 6, 9, 12].map((v) => {
          const y = fy(v);
          return (
            <g key={v}>
              <line x1={padL} x2={W - 4} y1={y} y2={y} stroke="#e5e7eb" strokeWidth="0.5" />
              <text x={padL - 4} y={y + 4} textAnchor="end" fontSize="8" fill="#9ca3af">{v}</text>
            </g>
          );
        })}
        {data.map((seg, i) => {
          const cx = padL + i * slotW + slotW / 2;
          let cumul = 0;
          return (
            <g key={i}>
              {seg.map((v, j) => {
                const h = avail * (v / maxVal);
                const y = fy(cumul + v);
                cumul += v;
                return (
                  <rect key={j} x={cx - bw / 2} y={y} width={bw} height={h}
                    fill={colors[j]} rx={j === 0 ? 2 : 0}
                    style={{ borderRadius: j === 0 ? "2px 2px 0 0" : "0" }} />
                );
              })}
              <text x={cx} y={H - padB + 12} textAnchor="middle" fontSize="8" fill="#6b7280">{months[i]}</text>
            </g>
          );
        })}
        {/* Légende */}
        {[["Critiques", "#ef4444"], ["Importantes", "#f97316"], ["Infos", "#22c55e"]].map(([label, color], i) => (
          <g key={label}>
            <rect x={padL + 4 + i * 68} y={padT - 2} width={7} height={7} fill={color} rx="1" />
            <text x={padL + 13 + i * 68} y={padT + 5} fontSize="8" fill="#374151">{label}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}

// ─── Données alertes actives ──────────────────────────────────────────────────
const alertesActives = [
  {
    niveau: "CRITIQUE",
    color: "border-red-200 bg-red-50",
    labelColor: "bg-red-100 text-red-700",
    dot: "🔴",
    titre: "Stock KCl insuffisant pour campagne sep",
    module: "Stocks",
    date: "10/07",
    assignee: "Bamba O.",
    detail: "Stock actuel 240 kg, besoin campagne 1 440 kg, délai SCPA 21 jours. Commande limite le 15/07.",
    actions: [
      { label: "Commander maintenant", style: "bg-[#2E7D32] text-white" },
      { label: "Reporter", style: "border border-gray-200 text-gray-600 bg-white" },
    ],
  },
  {
    niveau: "CRITIQUE",
    color: "border-red-200 bg-red-50",
    labelColor: "bg-red-100 text-red-700",
    dot: "🔴",
    titre: "Certificat eau potable expiré",
    module: "Certifications",
    date: "08/07",
    assignee: "Adjoua M.",
    detail: "Analyse CIAPOL site Soubré expirée 30/06. Non-conformité NC-2025-003. Risque audit RA.",
    actions: [
      { label: "Planifier analyse", style: "bg-[#2E7D32] text-white" },
      { label: "Contacter CIAPOL", style: "border border-gray-200 text-gray-600 bg-white" },
    ],
  },
  {
    niveau: "IMPORTANTE",
    color: "border-amber-200 bg-amber-50",
    labelColor: "bg-amber-100 text-amber-700",
    dot: "🟡",
    titre: "Loyer PAR-B1+B2 dû dans 3 jours",
    module: "Foncier",
    date: "11/07",
    assignee: "Admin",
    detail: "1 980 000 XOF dû le 14/07. Trésorerie disponible 18,4 M XOF ✅.",
    actions: [
      { label: "Créer virement", style: "bg-[#2E7D32] text-white" },
      { label: "Voir contrat", style: "border border-gray-200 text-gray-600 bg-white" },
    ],
  },
  {
    niveau: "IMPORTANTE",
    color: "border-amber-200 bg-amber-50",
    labelColor: "bg-amber-100 text-amber-700",
    dot: "🟡",
    titre: "MAT-001 révision 3 500h à prévoir",
    module: "Matériels",
    date: "09/07",
    assignee: "Bamba O.",
    detail: "Tracteur MAT-001 en maintenance hydraulique. À la remise en service, révision 3 500h obligatoire avant prochaine campagne.",
    actions: [
      { label: "Planifier révision", style: "border border-gray-200 text-gray-600 bg-white" },
    ],
  },
  {
    niveau: "IMPORTANTE",
    color: "border-amber-200 bg-amber-50",
    labelColor: "bg-amber-100 text-amber-700",
    dot: "🟡",
    titre: "Quota OpenWeatherMap presque atteint",
    module: "Intégrations",
    date: "11/07",
    assignee: "—",
    detail: "958 / 1 000 requêtes utilisées ce mois. Reset au 01/08.",
    actions: [
      { label: "Voir usage", style: "border border-gray-200 text-gray-600 bg-white" },
      { label: "Augmenter quota", style: "bg-[#2E7D32] text-white" },
    ],
  },
  {
    niveau: "IMPORTANTE",
    color: "border-amber-200 bg-amber-50",
    labelColor: "bg-amber-100 text-amber-700",
    dot: "🟡",
    titre: "Contrat SCPA KCl en attente signature",
    module: "Achats",
    date: "07/07",
    assignee: "—",
    detail: "Contrat 7,2 M XOF non signé depuis 5 jours. SCPA relance en attente.",
    actions: [
      { label: "Voir contrat", style: "border border-gray-200 text-gray-600 bg-white" },
    ],
  },
  {
    niveau: "INFO",
    color: "border-green-200 bg-green-50",
    labelColor: "bg-green-100 text-green-700",
    dot: "🟢",
    titre: "Formation FORM-002 demain",
    module: "Formations",
    date: "10/07",
    assignee: "—",
    detail: "BPA RA — 12/07. 14/15 participants confirmés.",
    actions: [],
  },
  {
    niveau: "INFO",
    color: "border-green-200 bg-green-50",
    labelColor: "bg-green-100 text-green-700",
    dot: "🟢",
    titre: "MSC Allegria : Transit nominal",
    module: "Logistique",
    date: "10/07",
    assignee: "—",
    detail: "LOT-2025-045 — 24 900 kg. ETA Rotterdam 05/08 confirmé.",
    actions: [],
  },
];

// ─── Règles configurées ───────────────────────────────────────────────────────
const regles = [
  { nom: "Stock < seuil min",       module: "Stocks",        condition: "Stock < 80% du seuil",      assignee: "Bamba O.",  canaux: "App + SMS",   actif: true },
  { nom: "Certificat expiration",   module: "Certif.",       condition: "< 60 jours avant exp.",     assignee: "Adjoua M.", canaux: "App + Email", actif: true },
  { nom: "Loyer à payer",          module: "Foncier",       condition: "< 7 jours avant échéance",  assignee: "Admin",     canaux: "App + SMS",   actif: true },
  { nom: "Température entrepôt",   module: "IoT",           condition: "> 27°C ou < 15°C",          assignee: "Ibrahim S.", canaux: "App + SMS",  actif: true },
  { nom: "Humidité entrepôt",      module: "IoT",           condition: "> 75% ou < 55%",            assignee: "Ibrahim S.", canaux: "App + SMS",  actif: true },
  { nom: "Pluie post-traitement",  module: "Météo",         condition: "Pluie >15mm dans 24h",      assignee: "Ibrahim S.", canaux: "App",        actif: true },
  { nom: "Entretien matériel",     module: "Matériels",     condition: "< 200h avant révision",     assignee: "Bamba O.",  canaux: "App",        actif: true },
  { nom: "Facture impayée",        module: "Finance",       condition: "> 30j depuis émission",     assignee: "Comptable", canaux: "Email",      actif: true },
  { nom: "Trésorerie basse",       module: "Finance",       condition: "< 5 M XOF",                 assignee: "DG",        canaux: "App + SMS",  actif: true },
  { nom: "Audit RA approche",      module: "Certif.",       condition: "< 90j avant audit",         assignee: "Adjoua M.", canaux: "Email",      actif: true },
  { nom: "Nouvelle NC ouverte",    module: "Qualité",       condition: "Toute NC créée",            assignee: "Adjoua M.", canaux: "App + Email",actif: true },
  { nom: "Lot fermentation J6",    module: "Transformation",condition: "J6 fermentation atteint",   assignee: "Ibrahim S.", canaux: "App",       actif: true },
];

// ─── Historique des alertes résolues ─────────────────────────────────────────
const historiqueAlertes = [
  { date: "08/07", alerte: "Humidité entrepôt > 75%",           module: "IoT",       resoluLe: "08/07", par: "Ibrahim S.",  delai: "4h" },
  { date: "06/07", alerte: "Stock engrais NPK insuffisant",     module: "Stocks",    resoluLe: "07/07", par: "Bamba O.",    delai: "1 j" },
  { date: "05/07", alerte: "Facture FOU-2025-031 impayée",     module: "Finance",   resoluLe: "09/07", par: "Comptable",   delai: "4 j" },
  { date: "03/07", alerte: "Certificat phyto. expiré",         module: "Certif.",   resoluLe: "05/07", par: "Adjoua M.",   delai: "2 j" },
  { date: "02/07", alerte: "MAT-003 entretien 500h dépassé",   module: "Matériels", resoluLe: "04/07", par: "Bamba O.",    delai: "2 j" },
  { date: "30/06", alerte: "Pluie post-traitement PAR-C1",     module: "Météo",     resoluLe: "30/06", par: "Ibrahim S.",  delai: "2h" },
  { date: "28/06", alerte: "Stock herbicide bas",              module: "Stocks",    resoluLe: "01/07", par: "Bamba O.",    delai: "3 j" },
  { date: "26/06", alerte: "Loyer PAR-A3 dû dans 5 jours",   module: "Foncier",   resoluLe: "28/06", par: "Admin",       delai: "2 j" },
  { date: "24/06", alerte: "NC-2025-002 ouverte (emballage)",  module: "Qualité",   resoluLe: "02/07", par: "Adjoua M.",   delai: "8 j" },
  { date: "22/06", alerte: "Lot fermentation J6 LOT-043",     module: "Transform.",resoluLe: "22/06", par: "Ibrahim S.",  delai: "1h" },
  { date: "20/06", alerte: "Trésorerie < 5 M XOF",           module: "Finance",   resoluLe: "21/06", par: "DG",          delai: "1 j" },
  { date: "18/06", alerte: "Température entrepôt 28,2°C",     module: "IoT",       resoluLe: "18/06", par: "Ibrahim S.",  delai: "3h" },
  { date: "15/06", alerte: "Certificat eau potable -45j",     module: "Certif.",   resoluLe: "17/06", par: "Adjoua M.",   delai: "2 j" },
  { date: "12/06", alerte: "Stock semences maïs insuffisant", module: "Stocks",    resoluLe: "14/06", par: "Bamba O.",    delai: "2 j" },
  { date: "10/06", alerte: "Facture FOURx-2025-028 impayée",  module: "Finance",   resoluLe: "24/06", par: "Comptable",   delai: "14 j" },
  { date: "08/06", alerte: "Entretien MAT-002 dans 180h",     module: "Matériels", resoluLe: "10/06", par: "Bamba O.",    delai: "2 j" },
  { date: "05/06", alerte: "Pluie post-traitement PAR-B2",    module: "Météo",     resoluLe: "05/06", par: "Ibrahim S.",  delai: "1h" },
  { date: "02/06", alerte: "Lot fermentation J6 LOT-041",     module: "Transform.",resoluLe: "02/06", par: "Ibrahim S.",  delai: "2h" },
  { date: "30/05", alerte: "Quota API météo >80%",            module: "Intégrat.", resoluLe: "01/06", par: "Admin",       delai: "2 j" },
  { date: "28/05", alerte: "Loyer PAR-B1 dû dans 7 jours",   module: "Foncier",   resoluLe: "29/05", par: "Admin",       delai: "1 j" },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function AlertesPage() {
  const [activeTab, setActiveTab] = useState<Tab>("Alertes actives");

  const critiques = alertesActives.filter((a) => a.niveau === "CRITIQUE").length;
  const importantes = alertesActives.filter((a) => a.niveau === "IMPORTANTE").length;
  const infos = alertesActives.filter((a) => a.niveau === "INFO").length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Topbar breadcrumbs={["Admin", "Alertes & Surveillance"]} />

      <div className="p-6 max-w-6xl mx-auto space-y-5">
        {/* En-tête */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-gray-800">Centre d'alertes</h1>
            <p className="text-sm text-gray-500 mt-0.5">Surveillance temps réel — AGRIFRIK Soubré</p>
          </div>
          <div className="flex gap-3">
            <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-2 text-center">
              <p className="text-xl font-bold text-red-600">{critiques}</p>
              <p className="text-[10px] text-red-500 font-medium">Critiques</p>
            </div>
            <div className="rounded-xl border border-amber-100 bg-amber-50 px-4 py-2 text-center">
              <p className="text-xl font-bold text-amber-600">{importantes}</p>
              <p className="text-[10px] text-amber-500 font-medium">Importantes</p>
            </div>
            <div className="rounded-xl border border-green-100 bg-green-50 px-4 py-2 text-center">
              <p className="text-xl font-bold text-green-600">{infos}</p>
              <p className="text-[10px] text-green-500 font-medium">Informations</p>
            </div>
            <div className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-2 text-center">
              <p className="text-xl font-bold text-gray-700">{alertesActives.length}</p>
              <p className="text-[10px] text-gray-500 font-medium">Total</p>
            </div>
          </div>
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

        {/* ── Alertes actives ──────────────────────────────────────────────── */}
        {activeTab === "Alertes actives" && (
          <div className="space-y-3">
            {alertesActives.map((a, i) => (
              <div key={i} className={`rounded-2xl border p-5 ${a.color}`}>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <span className="text-lg mt-0.5 flex-shrink-0">{a.dot}</span>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${a.labelColor}`}>
                          {a.niveau}
                        </span>
                        <span className="text-[10px] text-gray-500">{a.module}</span>
                        <span className="text-[10px] text-gray-400">{a.date}</span>
                        {a.assignee !== "—" && (
                          <span className="text-[10px] text-gray-500">→ {a.assignee}</span>
                        )}
                      </div>
                      <p className="text-sm font-semibold text-gray-800">{a.titre}</p>
                      <p className="text-xs text-gray-600 mt-1 leading-relaxed">{a.detail}</p>
                    </div>
                  </div>
                  {a.actions.length > 0 && (
                    <div className="flex gap-2 flex-shrink-0">
                      {a.actions.map((action, j) => (
                        <button
                          key={j}
                          className={`text-[11px] font-medium px-3 py-1.5 rounded-xl transition-opacity hover:opacity-80 ${action.style}`}
                        >
                          {action.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Règles ───────────────────────────────────────────────────────── */}
        {activeTab === "Règles" && (
          <div className="rounded-2xl border border-gray-100 bg-white p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-gray-800">Règles configurées ({regles.length})</h2>
              <button className="bg-[#2E7D32] text-white rounded-xl text-xs font-medium px-4 py-2 hover:bg-[#1B5E20] transition-colors">
                + Créer une règle
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-[#F8FBF8]">
                    {["Règle", "Module", "Condition", "Assigné", "Canaux", "Actif"].map((h) => (
                      <th key={h} className="px-3 py-2 text-left text-[11px] font-semibold text-gray-600">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {regles.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                      <td className="px-3 py-2 font-medium text-gray-800">{row.nom}</td>
                      <td className="px-3 py-2">
                        <span className="bg-gray-100 text-gray-600 text-[10px] px-2 py-0.5 rounded-md font-medium">
                          {row.module}
                        </span>
                      </td>
                      <td className="px-3 py-2 text-gray-600">{row.condition}</td>
                      <td className="px-3 py-2 text-gray-600">{row.assignee}</td>
                      <td className="px-3 py-2 text-gray-500">{row.canaux}</td>
                      <td className="px-3 py-2">
                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-green-700 bg-green-50 px-2 py-0.5 rounded-md">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
                          Actif
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── Historique ───────────────────────────────────────────────────── */}
        {activeTab === "Historique" && (
          <div className="space-y-5">
            <div className="rounded-2xl border border-gray-100 bg-white p-5">
              <h2 className="text-sm font-semibold text-gray-800 mb-1">Alertes par mois 2025</h2>
              <p className="text-[11px] text-gray-400 mb-4">Rouge = critiques · Orange = importantes · Vert = informations</p>
              <AlertesHistoChart />
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-5">
              <h2 className="text-sm font-semibold text-gray-800 mb-4">20 dernières alertes résolues</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-[#F8FBF8]">
                      {["Date", "Alerte", "Module", "Résolu le", "Par", "Délai"].map((h) => (
                        <th key={h} className="px-3 py-2 text-left text-[11px] font-semibold text-gray-600">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {historiqueAlertes.map((row, i) => (
                      <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                        <td className="px-3 py-2 text-gray-500 whitespace-nowrap">{row.date}</td>
                        <td className="px-3 py-2 text-gray-800">{row.alerte}</td>
                        <td className="px-3 py-2">
                          <span className="bg-gray-100 text-gray-600 text-[10px] px-1.5 py-0.5 rounded font-medium">
                            {row.module}
                          </span>
                        </td>
                        <td className="px-3 py-2 text-gray-500 whitespace-nowrap">{row.resoluLe}</td>
                        <td className="px-3 py-2 text-gray-600">{row.par}</td>
                        <td className="px-3 py-2">
                          <span className="text-[10px] font-semibold text-green-700 bg-green-50 px-2 py-0.5 rounded-md">
                            ✅ {row.delai}
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
