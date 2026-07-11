"use client";

import { useState } from "react";
import Topbar from "../../components/Topbar";
import {
  FolderOpen,
  Wallet,
  TrendingUp,
  AlertTriangle,
  Users,
  Calendar,
  ChevronRight,
  Filter,
} from "lucide-react";

const TABS = ["Projets", "Gantt", "Tâches", "Ressources"] as const;
type Tab = (typeof TABS)[number];

const kpis = [
  { label: "Projets actifs", value: "5", icon: FolderOpen, color: "text-green-700", bg: "bg-green-50" },
  { label: "Budget total", value: "108 M XOF", icon: Wallet, color: "text-blue-700", bg: "bg-blue-50" },
  { label: "Avancement moyen", value: "72%", icon: TrendingUp, color: "text-orange-700", bg: "bg-orange-50" },
  { label: "Tâches en retard", value: "3", icon: AlertTriangle, color: "text-red-700", bg: "bg-red-50" },
];

const projets = [
  {
    id: "P001",
    nom: "Certification RA Collective 2025",
    responsable: "Ibrahim Sawadogo",
    equipe: 6,
    budget: "4,0 M XOF",
    depense: 3.6,
    total: 4.0,
    avancement: 78,
    debut: "Jan 2025",
    fin: "Sept 2025",
    prochaine: "Audit externe RA — 15/09/2025",
    color: "border-green-300 bg-green-50/40",
    badge: "bg-green-100 text-green-800",
    bar: "bg-green-500",
  },
  {
    id: "P002",
    nom: "FAO-AGRIFRIK-2023",
    responsable: "Jean-Baptiste Kouassi",
    equipe: 8,
    budget: "48 M XOF",
    depense: 37.4,
    total: 48,
    avancement: 78,
    debut: "Jan 2023",
    fin: "Déc 2025",
    prochaine: "Rapport S1 2025 — 31/07/2025",
    color: "border-blue-300 bg-blue-50/40",
    badge: "bg-blue-100 text-blue-800",
    bar: "bg-blue-500",
  },
  {
    id: "P003",
    nom: "Nouvelle exploitation Gagnoa",
    responsable: "Admin",
    equipe: 4,
    budget: "12,4 M XOF",
    depense: 5.2,
    total: 12.4,
    avancement: 42,
    debut: "Sep 2023",
    fin: "Déc 2026",
    prochaine: "Titre foncier — délai incertain",
    color: "border-orange-300 bg-orange-50/40",
    badge: "bg-orange-100 text-orange-800",
    bar: "bg-orange-500",
  },
  {
    id: "P004",
    nom: "ANADER Coopérative",
    responsable: "Mariam Kouyaté",
    equipe: 5,
    budget: "24 M XOF",
    depense: 15.4,
    total: 24,
    avancement: 64,
    debut: "Mar 2024",
    fin: "Fév 2026",
    prochaine: "Bureau coopérative livraison — Oct 2025",
    color: "border-purple-300 bg-purple-50/40",
    badge: "bg-purple-100 text-purple-800",
    bar: "bg-purple-500",
  },
  {
    id: "P005",
    nom: "WB Agriculture Intelligente",
    responsable: "Jean-Baptiste K.",
    equipe: 6,
    budget: "36 M XOF",
    depense: 31.7,
    total: 36,
    avancement: 88,
    debut: "Jan 2025",
    fin: "Déc 2025",
    prochaine: "Rapport final — Nov 2025",
    color: "border-teal-300 bg-teal-50/40",
    badge: "bg-teal-100 text-teal-800",
    bar: "bg-teal-500",
  },
];

// Gantt: quarter columns from Q1'23 to Q4'25 = 12 quarters
// Each project: startQ index, endQ index (0-based)
const quarters = [
  "Q1'23","Q2'23","Q3'23","Q4'23",
  "Q1'24","Q2'24","Q3'24","Q4'24",
  "Q1'25","Q2'25","Q3'25","Q4'25",
];
const ganttProjects = [
  { id: "P001", label: "P001 — Certification RA", startQ: 8, endQ: 11, pct: 78, color: "#4CAF50", milestone: 10 },
  { id: "P002", label: "P002 — FAO-AGRIFRIK", startQ: 0, endQ: 11, pct: 78, color: "#2196F3", milestone: null },
  { id: "P003", label: "P003 — Exploit. Gagnoa", startQ: 2, endQ: 15, pct: 42, color: "#FF9800", milestone: null },
  { id: "P004", label: "P004 — ANADER Coop.", startQ: 5, endQ: 13, pct: 64, color: "#9C27B0", milestone: null },
  { id: "P005", label: "P005 — WB Agri. Int.", startQ: 8, endQ: 11, pct: 88, color: "#009688", milestone: null },
];
// today marker at Q10 (Q3'25 = index 10)
const todayQ = 10;

const taches = [
  { tache: "Panneau sécurité PAR-C1", projet: "P001", resp: "Ibrahim S.", prio: "Haute", due: "01/09", statut: "En cours" },
  { tache: "Analyse eau potable", projet: "P001", resp: "Ibrahim S.", prio: "Haute", due: "31/07", statut: "En retard" },
  { tache: "Registre riverains 2025", projet: "P001", resp: "Ibrahim S.", prio: "Moyen", due: "01/08", statut: "En cours" },
  { tache: "Rapport WB Q2", projet: "P002/P005", resp: "JB. Kouassi", prio: "Haute", due: "31/07", statut: "En cours" },
  { tache: "Livraison bureau COOP", projet: "P004", resp: "Mariam K.", prio: "Moyen", due: "Oct 2025", statut: "À venir" },
  { tache: "Évaluation mi-parcours FAO", projet: "P002", resp: "JB. Kouassi", prio: "Haute", due: "Aoû 2025", statut: "À venir" },
  { tache: "Cartographie parcelles", projet: "P003", resp: "Admin", prio: "Moyen", due: "Sep 2025", statut: "En cours" },
  { tache: "Formation agriculteurs IA", projet: "P005", resp: "JB. Kouassi", prio: "Moyen", due: "Oct 2025", statut: "À venir" },
  { tache: "Rapport final WB", projet: "P005", resp: "JB. Kouassi", prio: "Haute", due: "Nov 2025", statut: "À venir" },
  { tache: "Audit RA externe", projet: "P001", resp: "Ibrahim S.", prio: "Haute", due: "15/09", statut: "À venir" },
  { tache: "Titre foncier Gagnoa", projet: "P003", resp: "Admin", prio: "Haute", due: "Indéfini", statut: "En retard" },
  { tache: "Réunion CA COOP", projet: "P004", resp: "Mariam K.", prio: "Faible", due: "Aoû 2025", statut: "À venir" },
  { tache: "Rapport annuel coopérative", projet: "P004", resp: "Mariam K.", prio: "Moyen", due: "Fév 2026", statut: "À venir" },
  { tache: "Clôture administrative FAO", projet: "P002", resp: "JB. Kouassi", prio: "Haute", due: "Déc 2025", statut: "À venir" },
  { tache: "Démo drone agricole", projet: "P005", resp: "JB. Kouassi", prio: "Faible", due: "Sep 2025", statut: "En cours" },
];

const ressources = [
  { nom: "Ibrahim Sawadogo", p1: 12, p2: 4, p3: 2, p4: 0, p5: 2, charge: "Élevé" },
  { nom: "Jean-Baptiste K.", p1: 0, p2: 8, p3: 0, p4: 2, p5: 8, charge: "Élevé" },
  { nom: "Mariam Kouyaté", p1: 0, p2: 2, p3: 0, p4: 12, p5: 0, charge: "Normal" },
  { nom: "Admin", p1: 2, p2: 0, p3: 8, p4: 0, p5: 0, charge: "Normal" },
  { nom: "Konan Yao", p1: 6, p2: 0, p3: 0, p4: 2, p5: 0, charge: "Normal" },
];

const pctColor = (pct: number) => {
  if (pct >= 80) return "text-green-600";
  if (pct >= 50) return "text-blue-600";
  return "text-orange-600";
};

const statutStyle = (s: string) => {
  if (s === "En retard") return "bg-red-50 text-red-700";
  if (s === "En cours") return "bg-yellow-50 text-yellow-700";
  if (s === "À venir") return "bg-blue-50 text-blue-700";
  return "bg-gray-50 text-gray-700";
};

const prioStyle = (p: string) => {
  if (p === "Haute") return "text-red-600";
  if (p === "Moyen") return "text-yellow-600";
  return "text-gray-400";
};

export default function ProjetsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("Projets");

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-[#F8FBF8]">
      <Topbar title="Gestion de Projets" breadcrumb={["RH & Social", "Projets"]} />

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {kpis.map((k, i) => (
            <div key={i} className="rounded-2xl border border-gray-100 bg-white p-5">
              <div className={`w-9 h-9 rounded-xl ${k.bg} flex items-center justify-center mb-3`}>
                <k.icon className={`w-4 h-4 ${k.color}`} />
              </div>
              <p className="text-xs text-gray-500">{k.label}</p>
              <p className="text-lg font-bold text-gray-800 mt-0.5">{k.value}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white rounded-xl border border-gray-100 p-1 w-fit">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`px-4 py-2 rounded-lg text-xs font-medium transition-colors ${
                activeTab === t ? "bg-[#2E7D32] text-white" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* PROJETS */}
        {activeTab === "Projets" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {projets.map((p, i) => (
              <div key={i} className={`rounded-2xl border-2 bg-white p-5 ${p.color}`}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className={`inline-block px-2 py-0.5 text-xs font-bold rounded-lg mb-1 ${p.badge}`}>{p.id}</span>
                    <h3 className="text-sm font-bold text-gray-800">{p.nom}</h3>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0 mt-1" />
                </div>

                <div className="grid grid-cols-2 gap-2 mb-3 text-xs text-gray-600">
                  <div className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-gray-400" />
                    <span>{p.responsable}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-gray-400" />
                    <span>{p.equipe} personnes</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Wallet className="w-3.5 h-3.5 text-gray-400" />
                    <span>Budget : {p.budget}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-gray-400" />
                    <span>{p.debut} → {p.fin}</span>
                  </div>
                </div>

                {/* Progress */}
                <div className="mb-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-500">Avancement</span>
                    <span className={`font-bold ${pctColor(p.avancement)}`}>{p.avancement}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full">
                    <div className={`h-2 rounded-full ${p.bar}`} style={{ width: `${p.avancement}%` }} />
                  </div>
                </div>

                {/* Budget bar */}
                <div className="mb-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-500">Budget dépensé</span>
                    <span className="font-medium text-gray-700">{Math.round((p.depense / p.total) * 100)}%</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full">
                    <div className="h-1.5 bg-gray-400 rounded-full" style={{ width: `${Math.min(100, (p.depense / p.total) * 100)}%` }} />
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-gray-500 bg-gray-50 rounded-lg px-3 py-2">
                  <Calendar className="w-3 h-3 text-gray-400 flex-shrink-0" />
                  <span>Prochaine étape : <span className="font-medium text-gray-700">{p.prochaine}</span></span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* GANTT */}
        {activeTab === "Gantt" && (
          <div className="rounded-2xl border border-gray-100 bg-white p-5">
            <h2 className="text-sm font-semibold text-gray-800 mb-4">Diagramme Gantt — 2023 à 2025</h2>
            <div className="overflow-x-auto">
              <svg width={860} height={220} viewBox="0 0 860 220" className="min-w-[700px]">
                {/* Header */}
                {quarters.map((q, i) => (
                  <g key={i}>
                    <rect x={160 + i * 58} y={0} width={58} height={28} fill={i % 4 === 0 ? "#E8F5E9" : "#F8FBF8"} />
                    <text x={160 + i * 58 + 29} y={18} textAnchor="middle" fontSize={9} fill="#666" fontWeight={i % 4 === 0 ? "600" : "400"}>{q}</text>
                    <line x1={160 + i * 58} y1={0} x2={160 + i * 58} y2={220} stroke="#e5e7eb" strokeWidth={0.5} />
                  </g>
                ))}
                {/* Today marker */}
                <line x1={160 + todayQ * 58 + 29} y1={0} x2={160 + todayQ * 58 + 29} y2={220} stroke="#ef4444" strokeWidth={1.5} strokeDasharray="4,3" />
                <text x={160 + todayQ * 58 + 32} y={12} fontSize={8} fill="#ef4444" fontWeight="600">Auj.</text>

                {ganttProjects.map((gp, i) => {
                  const y = 40 + i * 34;
                  const startX = 160 + gp.startQ * 58;
                  const visibleEnd = Math.min(gp.endQ, 11);
                  const endX = 160 + (visibleEnd + 1) * 58;
                  const width = endX - startX;
                  const doneWidth = (gp.pct / 100) * width;
                  return (
                    <g key={i}>
                      {/* Project label */}
                      <text x={155} y={y + 13} textAnchor="end" fontSize={9} fill="#374151" fontWeight="500">{gp.label}</text>
                      {/* Background bar */}
                      <rect x={startX} y={y} width={width} height={22} rx={4} fill={gp.color} opacity={0.2} />
                      {/* Progress bar */}
                      <rect x={startX} y={y} width={doneWidth} height={22} rx={4} fill={gp.color} opacity={0.8} />
                      {/* % label */}
                      <text x={startX + doneWidth / 2} y={y + 14} textAnchor="middle" fontSize={9} fill="white" fontWeight="600">{gp.pct}%</text>
                      {/* Milestone diamond */}
                      {gp.milestone !== null && (
                        <g transform={`translate(${160 + gp.milestone * 58 + 29}, ${y + 11})`}>
                          <polygon points="0,-7 7,0 0,7 -7,0" fill="#1B5E20" />
                          <text x={0} y={18} textAnchor="middle" fontSize={7} fill="#1B5E20" fontWeight="600">AUDIT</text>
                        </g>
                      )}
                      {/* Overflow arrow if project extends beyond Q4'25 */}
                      {gp.endQ > 11 && (
                        <text x={160 + 12 * 58 + 4} y={y + 15} fontSize={10} fill={gp.color}>→</text>
                      )}
                    </g>
                  );
                })}
              </svg>
            </div>
            <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
              <div className="flex items-center gap-1.5"><span className="w-6 h-2 bg-green-400 rounded-full inline-block" /> Réalisé</div>
              <div className="flex items-center gap-1.5"><span className="w-6 h-2 bg-gray-200 rounded-full inline-block" /> Planifié</div>
              <div className="flex items-center gap-1.5"><span className="w-0.5 h-4 bg-red-500 inline-block" /> Aujourd'hui</div>
              <div className="flex items-center gap-1.5">
                <svg width={12} height={12}><polygon points="6,0 12,6 6,12 0,6" fill="#1B5E20" /></svg>
                Jalon
              </div>
            </div>
          </div>
        )}

        {/* TACHES */}
        {activeTab === "Tâches" && (
          <div className="rounded-2xl border border-gray-100 bg-white p-5 space-y-4">
            <div className="flex items-center gap-3 flex-wrap">
              {["Projet", "Responsable", "Statut", "Priorité"].map((f, i) => (
                <button key={i} className="flex items-center gap-1.5 px-3 py-2 text-xs border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50">
                  <Filter className="w-3.5 h-3.5" /> {f}
                </button>
              ))}
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-[#F8FBF8]">
                    {["Tâche", "Projet", "Responsable", "Priorité", "Échéance", "Statut"].map((h, i) => (
                      <th key={i} className="text-left px-3 py-2 font-semibold text-gray-600">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {taches.map((t, i) => (
                    <tr key={i} className="border-t border-gray-50 hover:bg-gray-50/50">
                      <td className="px-3 py-2.5 font-medium text-gray-800">{t.tache}</td>
                      <td className="px-3 py-2.5">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-lg text-xs font-medium bg-gray-100 text-gray-700">{t.projet}</span>
                      </td>
                      <td className="px-3 py-2.5 text-gray-600">{t.resp}</td>
                      <td className={`px-3 py-2.5 font-semibold ${prioStyle(t.prio)}`}>
                        {t.prio === "Haute" ? "🔴" : t.prio === "Moyen" ? "🟡" : "⚪"} {t.prio}
                      </td>
                      <td className="px-3 py-2.5 text-gray-500">{t.due}</td>
                      <td className="px-3 py-2.5">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${statutStyle(t.statut)}`}>
                          {t.statut === "En retard" ? "🔴" : t.statut === "En cours" ? "🟡" : "🔵"} {t.statut}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* RESSOURCES */}
        {activeTab === "Ressources" && (
          <div className="rounded-2xl border border-gray-100 bg-white p-5">
            <h2 className="text-sm font-semibold text-gray-800 mb-4">Matrice de charge — heures/semaine par projet</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-[#F8FBF8]">
                    <th className="text-left px-3 py-2 font-semibold text-gray-600 rounded-l-lg">Personne</th>
                    {["P001", "P002", "P003", "P004", "P005"].map((p) => (
                      <th key={p} className="text-center px-3 py-2 font-semibold text-gray-600">{p}</th>
                    ))}
                    <th className="text-center px-3 py-2 font-semibold text-gray-600">Total h/sem</th>
                    <th className="text-center px-3 py-2 font-semibold text-gray-600 rounded-r-lg">Charge</th>
                  </tr>
                </thead>
                <tbody>
                  {ressources.map((r, i) => {
                    const total = r.p1 + r.p2 + r.p3 + r.p4 + r.p5;
                    return (
                      <tr key={i} className="border-t border-gray-50 hover:bg-gray-50/50">
                        <td className="px-3 py-2.5 font-medium text-gray-800">{r.nom}</td>
                        {[r.p1, r.p2, r.p3, r.p4, r.p5].map((h, j) => (
                          <td key={j} className="px-3 py-2.5 text-center">
                            {h > 0 ? (
                              <span className="inline-block px-2 py-0.5 rounded-lg bg-green-50 text-green-700 font-medium">{h}h</span>
                            ) : (
                              <span className="text-gray-300">—</span>
                            )}
                          </td>
                        ))}
                        <td className="px-3 py-2.5 text-center font-bold text-gray-800">{total}h</td>
                        <td className="px-3 py-2.5 text-center">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${r.charge === "Élevé" ? "bg-yellow-50 text-yellow-700" : "bg-green-50 text-green-700"}`}>
                            {r.charge === "Élevé" ? "🟡" : "✅"} {r.charge}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Heatmap legend */}
            <div className="mt-4 p-3 bg-[#F8FBF8] rounded-xl">
              <p className="text-xs text-gray-500">Charge normale : &lt; 15h/sem · Élevé : 15-25h/sem · Critique : &gt; 25h/sem</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
