"use client";

import { useState } from "react";
import Topbar from "../../components/Topbar";
import {
  ClipboardCheck,
  AlertTriangle,
  Calendar,
  CheckCircle2,
  TrendingUp,
  Download,
} from "lucide-react";

// ─── KPI ─────────────────────────────────────────────────────────────────────

const kpis = [
  { label: "Audits réalisés 2025", value: "6", icon: ClipboardCheck, color: "#2E7D32", bg: "#E8F5E9" },
  { label: "Non-conformités ouvertes", value: "4", icon: AlertTriangle, color: "#E65100", bg: "#FFF3E0" },
  { label: "Taux clôture NC", value: "87%", icon: TrendingUp, color: "#1565C0", bg: "#E3F2FD" },
  { label: "Score conformité global", value: "94,2%", icon: CheckCircle2, color: "#00695C", bg: "#E0F2F1" },
  { label: "Prochain audit", value: "15/09/2025", icon: Calendar, color: "#6A1B9A", bg: "#F3E5F5" },
];

// ─── Audits réalisés ──────────────────────────────────────────────────────────

const auditsRealises = [
  { ref: "AUD-2025-006", type: "Interne qualité", auditeur: "Adjoua Messou", perimetre: "Séchage + conditionnement", date: "30/06/2025", resultat: "✅ 97/100", ncCritiques: 0, ncMajeures: 0, ncMineures: 1 },
  { ref: "AUD-2025-005", type: "Terrain RA", auditeur: "Ibrahim S.", perimetre: "PAR-A1, A2, A3", date: "15/06/2025", resultat: "✅ 94/100", ncCritiques: 0, ncMajeures: 1, ncMineures: 2 },
  { ref: "AUD-2025-004", type: "Interne RH", auditeur: "Mariam Kouyaté", perimetre: "Salaires + contrats", date: "31/05/2025", resultat: "✅ 96/100", ncCritiques: 0, ncMajeures: 0, ncMineures: 2 },
  { ref: "AUD-2025-003", type: "Financier", auditeur: "Cabinet FIDUCI", perimetre: "Comptabilité S1", date: "30/04/2025", resultat: "✅ 98/100", ncCritiques: 0, ncMajeures: 0, ncMineures: 1 },
  { ref: "AUD-2025-002", type: "Terrain RA", auditeur: "Ibrahim S.", perimetre: "PAR-B1, B2, C1, C2", date: "10/04/2025", resultat: "✅ 91/100", ncCritiques: 0, ncMajeures: 2, ncMineures: 3 },
  { ref: "AUD-2025-001", type: "Sécurité alimentaire", auditeur: "Bureau Véritas", perimetre: "Fermentation + séchage", date: "15/02/2025", resultat: "⚠️ 87/100", ncCritiques: 0, ncMajeures: 3, ncMineures: 4 },
];

const auditsPlanifies = [
  { ref: "AUD-2025-007", type: "Interne pré-RA", auditeur: "Ibrahim S.", perimetre: "8 parcelles", date: "01/08/2025" },
  { ref: "AUD-2025-008", type: "Externe RA annuel", auditeur: "RA International", perimetre: "8 parcelles", date: "15/09/2025" },
  { ref: "AUD-2025-009", type: "GlobalG.A.P. surveillance", auditeur: "Bureau Véritas", perimetre: "4 parcelles", date: "15/10/2025" },
];

// ─── Non-conformités ──────────────────────────────────────────────────────────

const ncOuvertes = [
  { ref: "NC-2025-011", origine: "AUD-005 PAR-A1", description: "Panneau sécurité manquant PAR-C1, C2", gravite: "Majeure", responsable: "Ibrahim S.", delai: "01/09", avancement: 60, statut: "🟡 En cours" },
  { ref: "NC-2025-012", origine: "AUD-005 PAR-A1", description: "Analyse eau potable expirée", gravite: "Majeure", responsable: "Ibrahim S.", delai: "31/07", avancement: 30, statut: "🔴 Urgent" },
  { ref: "NC-2025-013", origine: "AUD-005", description: "Registre riverains 2025 incomplet", gravite: "Mineure", responsable: "Ibrahim S.", delai: "01/08", avancement: 50, statut: "🟡 En cours" },
  { ref: "NC-2025-014", origine: "AUD-006", description: "Étiquetage sacs jute manque N° lot visible", gravite: "Mineure", responsable: "Adjoua M.", delai: "15/07", avancement: 80, statut: "🟢 Presque clôturé" },
];

const ncCloturees = [
  { ref: "NC-2025-010", description: "Formation EPI non enregistrée", ouverture: "10/04/2025", cloture: "15/06/2025", action: "Formation organisée et documentée" },
  { ref: "NC-2025-009", description: "Délimitation zone tampon absente PAR-B2", ouverture: "10/04/2025", cloture: "01/06/2025", action: "Délimitation physique posée avec GPS" },
  { ref: "NC-2025-008", description: "Cartographie GPS manquante PAR-C2", ouverture: "10/04/2025", cloture: "30/05/2025", action: "Relevé GPS réalisé et enregistré" },
  { ref: "NC-2025-007", description: "Plan de gestion des déchets absent", ouverture: "15/02/2025", cloture: "30/04/2025", action: "Plan rédigé et validé par bureau" },
  { ref: "NC-2025-006", description: "DAS fermenteur non conforme", ouverture: "15/02/2025", cloture: "20/04/2025", action: "Calibrage et certification réalisés" },
  { ref: "NC-2025-005", description: "Fiche de sécurité Ridomil absente", ouverture: "15/02/2025", cloture: "10/04/2025", action: "FDS intégrée au registre intrants" },
  { ref: "NC-2025-004", description: "Registre accidents non tenu à jour", ouverture: "15/02/2025", cloture: "01/04/2025", action: "Mise à jour + formation responsable" },
  { ref: "NC-2025-003", description: "Compostage déchets végétaux absent", ouverture: "01/03/2025", cloture: "15/04/2025", action: "Compostière installée — PAR-B1" },
];

// ─── Plan d'action Kanban ─────────────────────────────────────────────────────

const kanbanColumns = [
  {
    id: "todo",
    title: "À faire",
    color: "#E65100",
    bg: "#FFF3E0",
    tasks: [
      { label: "Renouveler analyse eau potable (NC-012)", tag: "⚠️ URGENT 31/07", urgent: true },
      { label: "Cartographie biodiversité PAR-C1", tag: "15/08", urgent: false },
    ],
  },
  {
    id: "inprogress",
    title: "En cours",
    color: "#1565C0",
    bg: "#E3F2FD",
    tasks: [
      { label: "Installation panneaux sécurité PAR-C1, C2 (NC-011)", tag: "Ibrahim S. — 60%", urgent: false },
      { label: "Mise à jour registre riverains (NC-013)", tag: "Ibrahim S. — 50%", urgent: false },
      { label: "Étiquetage lots (NC-014)", tag: "Adjoua M. — 80%", urgent: false },
    ],
  },
  {
    id: "done",
    title: "Terminé",
    color: "#2E7D32",
    bg: "#E8F5E9",
    tasks: [
      { label: "Formation EPI 32 agents", tag: "✅ 15/06", urgent: false },
      { label: "Délimitation zones tampons", tag: "✅ 01/06", urgent: false },
      { label: "Cartographie GPS 8 parcelles", tag: "✅ 30/05", urgent: false },
    ],
  },
];

// ─── Rapport d'audit ──────────────────────────────────────────────────────────

function RapportAudit() {
  const sections = [
    {
      titre: "Résumé exécutif",
      score: 94,
      contenu: "L'audit externe Rainforest Alliance du 15/06/2025 confirme la conformité globale de l'exploitation AGRIFRIK aux exigences du référentiel RA 2020. Le score obtenu de 94/100 constitue une amélioration significative (+5 points) par rapport à l'audit précédent. Les axes majeurs d'amélioration portent sur la gestion des analyses eau et la signalétique de sécurité.",
    },
    {
      titre: "Points forts identifiés",
      score: null,
      items: [
        { label: "Traçabilité complète lot à lot", score: 98 },
        { label: "Bien-être et sécurité des travailleurs", score: 95 },
        { label: "Conservation des forêts et zones tampons", score: 96 },
        { label: "Gestion des intrants homologués", score: 97 },
        { label: "Qualité du cacao (Grade AA)", score: 93 },
      ],
    },
    {
      titre: "Non-conformités et actions correctives",
      score: null,
      nc: ncOuvertes,
    },
  ];

  return (
    <div className="space-y-5">
      {/* Header rapport */}
      <div className="rounded-2xl border border-gray-100 bg-white dark:bg-gray-900 dark:border-gray-800 p-5">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h2 className="font-bold text-gray-900 dark:text-white mb-1">Rapport d&apos;audit — AUD-2025-005</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">Audit Terrain RA · Ibrahim S. · PAR-A1, A2, A3 · 15/06/2025</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium text-white bg-[#2E7D32] hover:bg-[#1B5E20] transition-colors">
            <Download size={14} /> Télécharger PDF
          </button>
        </div>
      </div>

      {/* Résumé exécutif */}
      <div className="rounded-2xl border border-gray-100 bg-white dark:bg-gray-900 dark:border-gray-800 p-5">
        <h3 className="font-semibold text-sm text-gray-900 dark:text-white mb-3">Résumé exécutif</h3>
        <div className="flex items-start gap-4 flex-wrap">
          {/* Score donut */}
          <div className="relative w-20 h-20 flex-shrink-0">
            <svg width="80" height="80" viewBox="0 0 80 80">
              <circle cx="40" cy="40" r="30" fill="none" stroke="#e5e7eb" strokeWidth="7" />
              <circle cx="40" cy="40" r="30" fill="none" stroke="#2E7D32" strokeWidth="7"
                strokeDasharray={`${(94 / 100) * 2 * Math.PI * 30} ${2 * Math.PI * 30}`}
                strokeLinecap="round" transform="rotate(-90 40 40)" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-lg font-bold text-gray-800 dark:text-gray-100 leading-none">94</span>
              <span className="text-xs text-gray-400">/100</span>
            </div>
          </div>
          <p className="flex-1 text-sm text-gray-600 dark:text-gray-400 leading-relaxed min-w-48">{sections[0].contenu}</p>
        </div>
      </div>

      {/* Points forts */}
      <div className="rounded-2xl border border-gray-100 bg-white dark:bg-gray-900 dark:border-gray-800 p-5">
        <h3 className="font-semibold text-sm text-gray-900 dark:text-white mb-4">Points forts identifiés</h3>
        <div className="space-y-3">
          {sections[1].items!.map((item) => (
            <div key={item.label} className="flex items-center gap-3">
              <span className="text-xs text-gray-600 dark:text-gray-300 flex-1">{item.label}</span>
              <div className="w-40 h-2 rounded-full bg-gray-100 dark:bg-gray-800 flex-shrink-0">
                <div className="h-2 rounded-full bg-[#2E7D32]" style={{ width: `${item.score}%` }} />
              </div>
              <span className="text-xs font-semibold text-[#2E7D32] w-10 text-right">{item.score}/100</span>
            </div>
          ))}
        </div>
      </div>

      {/* NC dans le rapport */}
      <div className="rounded-2xl border border-gray-100 bg-white dark:bg-gray-900 dark:border-gray-800 p-5">
        <h3 className="font-semibold text-sm text-gray-900 dark:text-white mb-4">Non-conformités identifiées</h3>
        <div className="space-y-3">
          {ncOuvertes.map((nc) => (
            <div key={nc.ref} className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800">
              <span className={`mt-0.5 px-2 py-0.5 rounded-full text-xs font-semibold flex-shrink-0 ${nc.gravite === "Majeure" ? "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400" : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"}`}>
                {nc.gravite}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-gray-800 dark:text-gray-200">{nc.description}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Responsable : {nc.responsable} — Délai : {nc.delai}</p>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0">{nc.statut}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Page principale ──────────────────────────────────────────────────────────

export default function AuditPage() {
  const [onglet, setOnglet] = useState<"audits" | "nc" | "rapport" | "plan">("audits");

  const onglets = [
    { key: "audits" as const, label: "Audits" },
    { key: "nc" as const, label: "Non-conformités" },
    { key: "rapport" as const, label: "Rapport d'audit" },
    { key: "plan" as const, label: "Plan d'action" },
  ];

  return (
    <div>
      <Topbar title="Audit & Conformité" breadcrumb={["Commerce", "Audit"]} />

      <div className="p-6 space-y-6">
        {/* KPI */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {kpis.map((k) => {
            const Icon = k.icon;
            return (
              <div key={k.label} className="rounded-2xl border border-gray-100 bg-white p-5 dark:bg-gray-900 dark:border-gray-800 flex flex-col gap-1">
                <div className="w-8 h-8 rounded-full flex items-center justify-center mb-1" style={{ backgroundColor: k.bg }}>
                  <Icon size={16} style={{ color: k.color }} />
                </div>
                <p className="text-lg font-bold text-gray-900 dark:text-white leading-tight">{k.value}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{k.label}</p>
              </div>
            );
          })}
        </div>

        {/* Onglets */}
        <div className="flex gap-1 p-1 rounded-xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 overflow-x-auto">
          {onglets.map((o) => (
            <button
              key={o.key}
              onClick={() => setOnglet(o.key)}
              className={`whitespace-nowrap flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                onglet === o.key
                  ? "bg-[#2E7D32] text-white"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
              }`}
            >
              {o.label}
            </button>
          ))}
        </div>

        {/* ── Onglet Audits ── */}
        {onglet === "audits" && (
          <div className="space-y-5">
            {/* Réalisés */}
            <div className="rounded-2xl border border-gray-100 bg-white dark:bg-gray-900 dark:border-gray-800 overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-700">
                <h2 className="font-semibold text-sm text-gray-900 dark:text-white">Audits réalisés (6)</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#F8FBF8] dark:bg-gray-800 text-left text-xs text-gray-500 dark:text-gray-400">
                      {["Réf.", "Type", "Auditeur", "Périmètre", "Date", "Résultat", "NC critiques", "NC majeures", "NC mineures", "Rapport"].map((h) => (
                        <th key={h} className="px-4 py-3 font-medium whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {auditsRealises.map((a) => (
                      <tr key={a.ref} className="border-t border-gray-50 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                        <td className="px-4 py-3 font-mono text-xs font-bold text-[#2E7D32] whitespace-nowrap">{a.ref}</td>
                        <td className="px-4 py-3 text-xs text-gray-700 dark:text-gray-300 whitespace-nowrap">{a.type}</td>
                        <td className="px-4 py-3 text-xs text-gray-600 dark:text-gray-400 whitespace-nowrap">{a.auditeur}</td>
                        <td className="px-4 py-3 text-xs text-gray-600 dark:text-gray-400 whitespace-nowrap">{a.perimetre}</td>
                        <td className="px-4 py-3 font-mono text-xs text-gray-600 dark:text-gray-400 whitespace-nowrap">{a.date}</td>
                        <td className="px-4 py-3 text-xs font-semibold whitespace-nowrap">{a.resultat}</td>
                        <td className="px-4 py-3 text-center text-xs">
                          <span className={`px-2 py-0.5 rounded-full ${a.ncCritiques > 0 ? "bg-red-100 text-red-700" : "text-gray-400 dark:text-gray-600"}`}>{a.ncCritiques}</span>
                        </td>
                        <td className="px-4 py-3 text-center text-xs">
                          <span className={`px-2 py-0.5 rounded-full ${a.ncMajeures > 0 ? "bg-orange-100 text-orange-700" : "text-gray-400 dark:text-gray-600"}`}>{a.ncMajeures}</span>
                        </td>
                        <td className="px-4 py-3 text-center text-xs">
                          <span className={`px-2 py-0.5 rounded-full ${a.ncMineures > 0 ? "bg-yellow-100 text-yellow-700" : "text-gray-400 dark:text-gray-600"}`}>{a.ncMineures}</span>
                        </td>
                        <td className="px-4 py-3">
                          <button className="flex items-center gap-1 text-xs text-[#2E7D32] hover:underline">
                            <Download size={12} /> PDF
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Planifiés */}
            <div className="rounded-2xl border border-gray-100 bg-white dark:bg-gray-900 dark:border-gray-800 overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-700">
                <h2 className="font-semibold text-sm text-gray-900 dark:text-white">Audits planifiés (3)</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#F8FBF8] dark:bg-gray-800 text-left text-xs text-gray-500 dark:text-gray-400">
                      {["Réf.", "Type", "Auditeur", "Périmètre", "Date prévue", "Statut"].map((h) => (
                        <th key={h} className="px-4 py-3 font-medium whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {auditsPlanifies.map((a) => (
                      <tr key={a.ref} className="border-t border-gray-50 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                        <td className="px-4 py-3 font-mono text-xs font-bold text-[#1565C0] whitespace-nowrap">{a.ref}</td>
                        <td className="px-4 py-3 text-xs text-gray-700 dark:text-gray-300 whitespace-nowrap">{a.type}</td>
                        <td className="px-4 py-3 text-xs text-gray-600 dark:text-gray-400 whitespace-nowrap">{a.auditeur}</td>
                        <td className="px-4 py-3 text-xs text-gray-600 dark:text-gray-400 whitespace-nowrap">{a.perimetre}</td>
                        <td className="px-4 py-3 font-mono text-xs text-gray-600 dark:text-gray-400 whitespace-nowrap">{a.date}</td>
                        <td className="px-4 py-3">
                          <span className="text-xs font-medium text-blue-700 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 px-2 py-0.5 rounded-full">🔵 Planifié</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ── Onglet Non-conformités ── */}
        {onglet === "nc" && (
          <div className="space-y-5">
            {/* NC ouvertes */}
            <div className="rounded-2xl border border-gray-100 bg-white dark:bg-gray-900 dark:border-gray-800 overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-700 flex items-center gap-2">
                <AlertTriangle size={16} className="text-red-500" />
                <h2 className="font-semibold text-sm text-gray-900 dark:text-white">Non-conformités ouvertes</h2>
                <span className="ml-auto text-xs font-semibold text-red-700 bg-red-100 px-2 py-0.5 rounded-full">4 ouvertes</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#F8FBF8] dark:bg-gray-800 text-left text-xs text-gray-500 dark:text-gray-400">
                      {["Réf.", "Origine", "Description", "Gravité", "Responsable", "Délai", "Avancement", "Statut"].map((h) => (
                        <th key={h} className="px-4 py-3 font-medium whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {ncOuvertes.map((nc) => (
                      <tr key={nc.ref} className="border-t border-gray-50 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                        <td className="px-4 py-3 font-mono text-xs font-bold text-[#2E7D32] whitespace-nowrap">{nc.ref}</td>
                        <td className="px-4 py-3 text-xs text-gray-600 dark:text-gray-400 whitespace-nowrap">{nc.origine}</td>
                        <td className="px-4 py-3 text-xs text-gray-700 dark:text-gray-300 max-w-xs">{nc.description}</td>
                        <td className="px-4 py-3">
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full whitespace-nowrap ${nc.gravite === "Majeure" ? "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400" : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"}`}>
                            {nc.gravite}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-xs text-gray-600 dark:text-gray-400 whitespace-nowrap">{nc.responsable}</td>
                        <td className="px-4 py-3 font-mono text-xs text-gray-600 dark:text-gray-400 whitespace-nowrap">{nc.delai}</td>
                        <td className="px-4 py-3 min-w-28">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-2 rounded-full bg-gray-100 dark:bg-gray-800">
                              <div className="h-2 rounded-full bg-[#2E7D32]" style={{ width: `${nc.avancement}%` }} />
                            </div>
                            <span className="text-xs text-gray-500 w-8 text-right">{nc.avancement}%</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-xs whitespace-nowrap">{nc.statut}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* NC clôturées */}
            <div className="rounded-2xl border border-gray-100 bg-white dark:bg-gray-900 dark:border-gray-800 overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-700 flex items-center gap-2">
                <CheckCircle2 size={16} className="text-green-600" />
                <h2 className="font-semibold text-sm text-gray-900 dark:text-white">Non-conformités clôturées 2025</h2>
                <span className="ml-auto text-xs font-semibold text-green-700 bg-green-100 px-2 py-0.5 rounded-full">8 clôturées</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#F8FBF8] dark:bg-gray-800 text-left text-xs text-gray-500 dark:text-gray-400">
                      {["Réf.", "Description", "Date ouverture", "Date clôture", "Action corrective", "Statut"].map((h) => (
                        <th key={h} className="px-4 py-3 font-medium whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {ncCloturees.map((nc) => (
                      <tr key={nc.ref} className="border-t border-gray-50 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                        <td className="px-4 py-3 font-mono text-xs font-bold text-gray-500 dark:text-gray-400 whitespace-nowrap">{nc.ref}</td>
                        <td className="px-4 py-3 text-xs text-gray-700 dark:text-gray-300 max-w-xs">{nc.description}</td>
                        <td className="px-4 py-3 font-mono text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">{nc.ouverture}</td>
                        <td className="px-4 py-3 font-mono text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">{nc.cloture}</td>
                        <td className="px-4 py-3 text-xs text-gray-600 dark:text-gray-400 max-w-xs">{nc.action}</td>
                        <td className="px-4 py-3">
                          <span className="text-xs font-semibold text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-2 py-0.5 rounded-full whitespace-nowrap">✅ Clôturé</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ── Onglet Rapport d'audit ── */}
        {onglet === "rapport" && <RapportAudit />}

        {/* ── Onglet Plan d'action ── */}
        {onglet === "plan" && (
          <div className="space-y-4">
            <div className="rounded-2xl border border-blue-100 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800 px-5 py-3">
              <p className="text-sm font-semibold text-blue-800 dark:text-blue-300">Plan d&apos;action pré-audit RA — Audit 15/09/2025</p>
              <p className="text-xs text-blue-600 dark:text-blue-400 mt-0.5">Toutes les actions doivent être clôturées avant le 01/09/2025.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {kanbanColumns.map((col) => (
                <div key={col.id} className="rounded-2xl border border-gray-100 bg-white dark:bg-gray-900 dark:border-gray-800 overflow-hidden">
                  <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700 flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: col.color }} />
                    <h3 className="font-semibold text-sm text-gray-900 dark:text-white">{col.title}</h3>
                    <span className="ml-auto text-xs font-semibold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full">{col.tasks.length}</span>
                  </div>
                  <div className="p-3 space-y-2">
                    {col.tasks.map((task, idx) => (
                      <div
                        key={idx}
                        className={`p-3 rounded-xl border text-xs ${task.urgent ? "border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-800" : "border-gray-100 bg-gray-50 dark:bg-gray-800 dark:border-gray-700"}`}
                      >
                        <p className={`font-medium mb-1.5 ${task.urgent ? "text-red-700 dark:text-red-400" : "text-gray-800 dark:text-gray-200"}`}>
                          {task.label}
                        </p>
                        <span
                          className="inline-block px-2 py-0.5 rounded-full text-xs font-medium"
                          style={{ backgroundColor: col.bg, color: col.color }}
                        >
                          {task.tag}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
