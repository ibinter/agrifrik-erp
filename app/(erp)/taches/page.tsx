"use client";

import { useState } from "react";
import Topbar from "../../components/Topbar";
import {
  Plus,
  Columns,
  User,
  Calendar,
  Link2,
  AlertTriangle,
  CheckSquare,
  Square,
  CheckCircle2,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Priority = "critique" | "importante" | "normale";

interface SubTask {
  label: string;
  done: boolean;
}

interface Task {
  id: number;
  title: string;
  assignee: string;
  due: string;
  progress: number;
  description: string;
  priority: Priority;
  linkedRefs?: string[];
  blockedBy?: string;
  subtasks?: SubTask[];
  note?: string;
}

interface TodoTask {
  id: number;
  title: string;
  assignee: string;
  due: string;
  description: string;
  priority: Priority;
}

interface DoneTask {
  id: number;
  title: string;
  assignee: string;
  completedDate: string;
  category: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const EN_COURS_CRITIQUE: Task[] = [
  {
    id: 1,
    title: "Traitement mirides PAR-A1",
    assignee: "Ibrahim Sawadogo",
    due: "15/07/2025",
    progress: 0,
    description:
      "Application Cypercal 50 EC 6L/ha sur 3,8 ha PAR-A1. Seuil mirides 6% > seuil alerte 5%. Masque + combinaison obligatoires.",
    priority: "critique",
    linkedRefs: ["PCT-2025-034", "STK-INT-001"],
    note: "Vérifier stock Cupravit avant intervention",
  },
  {
    id: 2,
    title: "Réception livraison KCl PAR-B1",
    assignee: "Ibrahim Sawadogo",
    due: "18/07/2025",
    progress: 0,
    description:
      "Réceptionner 10 sacs KCl 60% (ACH-2025-023 en cours chez KCl Distribution). Stockage ENT-001 Zone D.",
    priority: "critique",
    linkedRefs: ["ACH-2025-023"],
  },
];

const EN_COURS_IMPORTANTE: Task[] = [
  {
    id: 3,
    title: "Rapport terrain hebdomadaire RT-029",
    assignee: "Ibrahim Sawadogo",
    due: "13/07/2025",
    progress: 40,
    description:
      "Observations PAR-A1/A2/B1 semaine S2, photos mirides, mesures brix cabosses.",
    priority: "importante",
    subtasks: [
      { label: "Observations PAR-A1", done: true },
      { label: "Photos", done: true },
      { label: "Observations PAR-A2", done: false },
      { label: "Rapport final", done: false },
    ],
  },
  {
    id: 4,
    title: "Suivi fermentation LOT-047",
    assignee: "Ibrahim Sawadogo",
    due: "13/07/2025",
    progress: 60,
    description:
      "Jour 4 sur 6 de fermentation. Mesure T° et retournement caisses (2ème retournement).",
    priority: "importante",
    subtasks: [
      { label: "J1 mise en caisse", done: true },
      { label: "J2 T°41°C", done: true },
      { label: "J3 retournement + T°47°C", done: true },
      { label: "J4 retournement", done: false },
      { label: "J5", done: false },
      { label: "J6 fin", done: false },
    ],
  },
  {
    id: 5,
    title: "Séchage LOT-047 sur claies",
    assignee: "Ibrahim Sawadogo",
    due: "20/07/2025",
    progress: 0,
    description:
      "Séchage solaire 7-10 jours sur claies surélevées. Objectif humidité <8%. Démarre le 14/07 après fermentation.",
    priority: "importante",
    note: "Démarre le 14/07 après fin de fermentation",
  },
];

const EN_COURS_NORMALE: Task[] = [
  {
    id: 6,
    title: "Installation irrigation Netafim PAR-C1",
    assignee: "Ibrahim + technicien Netafim",
    due: "25/07/2025",
    progress: 25,
    description:
      "Pose réseau goutte-à-goutte sur 1,8 ha PAR-C1 (anacarde). Technicien Netafim prévu 23/07.",
    priority: "normale",
  },
  {
    id: 7,
    title: "Fertilisation PAR-B1 (KCl 60%)",
    assignee: "Ibrahim Sawadogo",
    due: "18/07/2025",
    progress: 0,
    description:
      "Application 2 sacs KCl/ha × 4,5 ha = 9 sacs. Enfouissement superficiel 10 cm.",
    priority: "normale",
    blockedBy: "Réception livraison KCl PAR-B1",
  },
];

const A_FAIRE: TodoTask[] = [
  {
    id: 10,
    title: "Cut test LOT-047",
    assignee: "Ibrahim Sawadogo",
    due: "21/07/2025",
    description:
      "Coupe transversale 100 fèves pour évaluation couleur et fermentation. Score cible ≥75% bien fermentées.",
    priority: "importante",
  },
  {
    id: 11,
    title: "Récolte anacarde PAR-C1",
    assignee: "Ibrahim Sawadogo",
    due: "28/07/2025",
    description:
      "Récolte manuelle noix anacarde matures sur 1,8 ha. Estimation 900 kg. Conditionnement sacs jute.",
    priority: "importante",
  },
  {
    id: 12,
    title: "Rapport mensuel juillet — terrain",
    assignee: "Ibrahim Sawadogo",
    due: "31/07/2025",
    description:
      "Synthèse mensuelle toutes parcelles : cultures, traitements, récoltes, incidents. Envoi DG avant le 31.",
    priority: "normale",
  },
  {
    id: 13,
    title: "Renouvellement contrat façonnage PAR-B1",
    assignee: "Adjoua Messou",
    due: "25/07/2025",
    description:
      "Renouvellement annuel contrat main-d'œuvre façonnage cacao PAR-B1. Négociation tarifs S2 2025.",
    priority: "normale",
  },
  {
    id: 14,
    title: "Inventaire matières fertilisantes ENT-001",
    assignee: "Ibrahim Sawadogo",
    due: "30/07/2025",
    description:
      "Comptage stocks intrants fertilisants Zone A et D. Mise à jour STK-INT-002 et alerte seuils mini.",
    priority: "normale",
  },
];

const TERMINEES: DoneTask[] = [
  { id: 20, title: "Observations PAR-A1 S1 juillet", assignee: "Ibrahim Sawadogo", completedDate: "07/07/2025", category: "Terrain" },
  { id: 21, title: "Rapport terrain RT-028", assignee: "Ibrahim Sawadogo", completedDate: "06/07/2025", category: "Rapport" },
  { id: 22, title: "Mise en caisse LOT-047 — J1", assignee: "Ibrahim Sawadogo", completedDate: "09/07/2025", category: "Production" },
  { id: 23, title: "Paiement fournisseur NSIA assurance", assignee: "Adjoua Messou", completedDate: "08/07/2025", category: "Finance" },
  { id: 24, title: "Contrôle T° fermentation LOT-047 J2", assignee: "Ibrahim Sawadogo", completedDate: "10/07/2025", category: "Production" },
  { id: 25, title: "Photos mirides PAR-A1 — rapport", assignee: "Ibrahim Sawadogo", completedDate: "07/07/2025", category: "Terrain" },
  { id: 26, title: "Retournement caisses LOT-047 J3", assignee: "Ibrahim Sawadogo", completedDate: "11/07/2025", category: "Production" },
  { id: 27, title: "Vérification stock Cypercal ENT-001", assignee: "Ibrahim Sawadogo", completedDate: "11/07/2025", category: "Stock" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const PRIORITY_STYLE: Record<Priority, { dot: string; badge: string; label: string }> = {
  critique: { dot: "bg-red-500", badge: "bg-red-100 text-red-700", label: "CRITIQUE" },
  importante: { dot: "bg-yellow-400", badge: "bg-yellow-100 text-yellow-700", label: "IMPORTANTE" },
  normale: { dot: "bg-green-500", badge: "bg-green-100 text-green-700", label: "NORMALE" },
};

const CAT_COLORS: Record<string, string> = {
  Terrain: "bg-green-100 text-green-700",
  Rapport: "bg-blue-100 text-blue-700",
  Production: "bg-amber-100 text-amber-700",
  Finance: "bg-purple-100 text-purple-700",
  Stock: "bg-gray-100 text-gray-600",
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function ProgressBar({ value }: { value: number }) {
  const barColor = value === 0 ? "bg-gray-200" : value < 50 ? "bg-amber-400" : "bg-[#2E7D32]";
  return (
    <div className="mt-3">
      <div className="flex items-center justify-between mb-1">
        <span className="text-[10px] text-gray-400">Progression</span>
        <span className="text-[10px] font-semibold text-gray-600">{value}%</span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-1.5">
        <div className={`h-1.5 rounded-full transition-all ${barColor}`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function TaskCard({ task, actionLabel }: { task: Task; actionLabel: string }) {
  const ps = PRIORITY_STYLE[task.priority];
  return (
    <div className={`bg-white rounded-2xl border p-4 shadow-sm hover:shadow-md transition-shadow ${task.priority === "critique" ? "border-l-4 border-l-red-500 border-gray-100" : "border-gray-100"}`}>
      <div className="flex items-start justify-between gap-2 mb-2">
        <p className="text-sm font-semibold text-gray-800 leading-snug flex-1">{task.title}</p>
        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold flex-shrink-0 ${ps.badge}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${ps.dot}`} />
          {ps.label}
        </span>
      </div>
      <p className="text-xs text-gray-500 leading-relaxed mb-3">{task.description}</p>

      {task.note && (
        <div className="flex items-start gap-1.5 mb-3 bg-amber-50 rounded-xl px-3 py-2">
          <AlertTriangle size={12} className="text-amber-500 flex-shrink-0 mt-0.5" />
          <span className="text-xs text-amber-700">{task.note}</span>
        </div>
      )}

      {task.blockedBy && (
        <div className="flex items-center gap-1.5 mb-3 bg-red-50 rounded-xl px-3 py-2">
          <AlertTriangle size={12} className="text-red-500 flex-shrink-0" />
          <span className="text-xs text-red-700">Bloquée par : <span className="font-medium">{task.blockedBy}</span></span>
        </div>
      )}

      {task.subtasks && (
        <div className="mb-3 flex flex-wrap gap-1.5">
          {task.subtasks.map((st, i) => (
            <span key={i} className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-medium ${st.done ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"}`}>
              {st.done ? <CheckSquare size={10} className="text-green-500" /> : <Square size={10} className="text-gray-400" />}
              {st.label}
            </span>
          ))}
        </div>
      )}

      {task.linkedRefs && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {task.linkedRefs.map((ref) => (
            <span key={ref} className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-blue-600 rounded-lg text-[10px] font-medium">
              <Link2 size={9} />{ref}
            </span>
          ))}
        </div>
      )}

      <ProgressBar value={task.progress} />

      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50">
        <div className="flex items-center gap-3 text-gray-500">
          <span className="flex items-center gap-1 text-xs"><User size={11} />{task.assignee}</span>
          <span className="flex items-center gap-1 text-xs"><Calendar size={11} />{task.due}</span>
        </div>
        <button className="px-3 py-1 text-xs bg-[#2E7D32] text-white rounded-xl font-medium hover:bg-[#1B5E20] transition-colors">
          {actionLabel}
        </button>
      </div>
    </div>
  );
}

function PrioritySection({ label, dotColor, count, children }: { label: string; dotColor: string; count: number; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-3 px-1">
        <span className={`w-2.5 h-2.5 rounded-full ${dotColor}`} />
        <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider">{label}</h3>
        <span className="w-5 h-5 rounded-full bg-white border border-gray-200 text-[10px] font-bold text-gray-600 flex items-center justify-center">{count}</span>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">{children}</div>
    </div>
  );
}

function TodoCard({ task }: { task: TodoTask }) {
  const ps = PRIORITY_STYLE[task.priority];
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-2 mb-2">
        <p className="text-sm font-semibold text-gray-800 leading-snug flex-1">{task.title}</p>
        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold flex-shrink-0 ${ps.badge}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${ps.dot}`} />
          {ps.label}
        </span>
      </div>
      <p className="text-xs text-gray-500 leading-relaxed mb-4">{task.description}</p>
      <div className="flex items-center justify-between pt-3 border-t border-gray-50">
        <div className="flex items-center gap-3 text-gray-500">
          <span className="flex items-center gap-1 text-xs"><User size={11} />{task.assignee}</span>
          <span className="flex items-center gap-1 text-xs"><Calendar size={11} />{task.due}</span>
        </div>
        <button className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors">
          Prendre en charge
        </button>
      </div>
    </div>
  );
}

// ─── Tab views ────────────────────────────────────────────────────────────────

function EnCoursTab() {
  return (
    <div>
      <PrioritySection label="Critiques" dotColor="bg-red-500" count={EN_COURS_CRITIQUE.length}>
        {EN_COURS_CRITIQUE.map((t) => <TaskCard key={t.id} task={t} actionLabel="Démarrer" />)}
      </PrioritySection>
      <PrioritySection label="Importantes" dotColor="bg-yellow-400" count={EN_COURS_IMPORTANTE.length}>
        {EN_COURS_IMPORTANTE.map((t) => <TaskCard key={t.id} task={t} actionLabel="Mettre à jour" />)}
      </PrioritySection>
      <PrioritySection label="Normales" dotColor="bg-green-500" count={EN_COURS_NORMALE.length}>
        {EN_COURS_NORMALE.map((t) => <TaskCard key={t.id} task={t} actionLabel="Mettre à jour" />)}
      </PrioritySection>
    </div>
  );
}

function AFaireTab() {
  return (
    <div>
      <p className="text-sm text-gray-500 mb-5">{A_FAIRE.length} tâches programmées — Semaine S3 juillet 2025</p>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {A_FAIRE.map((t) => <TodoCard key={t.id} task={t} />)}
      </div>
    </div>
  );
}

function TermineesTab() {
  return (
    <div>
      <p className="text-sm text-gray-500 mb-5">{TERMINEES.length} tâches terminées — Semaine S1 juillet 2025</p>
      <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-[#F8FBF8] border-b border-gray-100">
              {["#", "Tâche", "Assignée à", "Catégorie", "Complétée le"].map((h) => (
                <th key={h} className="px-4 py-3 text-left font-semibold text-gray-500">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TERMINEES.map((t, i) => (
              <tr key={t.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                <td className="px-4 py-2.5 text-gray-400">{i + 1}</td>
                <td className="px-4 py-2.5">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-green-500 flex-shrink-0" />
                    <span className="font-medium text-gray-400 line-through">{t.title}</span>
                  </div>
                </td>
                <td className="px-4 py-2.5 text-gray-600">{t.assignee}</td>
                <td className="px-4 py-2.5">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${CAT_COLORS[t.category] ?? "bg-gray-100 text-gray-600"}`}>
                    {t.category}
                  </span>
                </td>
                <td className="px-4 py-2.5">
                  <span className="flex items-center gap-1 text-green-600 font-medium">
                    <CheckCircle2 size={11} />{t.completedDate}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── KPI card ─────────────────────────────────────────────────────────────────

function KpiCard({ value, label, sub, color }: { value: string | number; label: string; sub: string; color: string }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-4">
      <div className={`text-2xl font-bold ${color}`}>{value}</div>
      <div className="text-xs font-semibold text-gray-700 mt-0.5">{label}</div>
      <div className="text-[10px] text-gray-400 mt-0.5">{sub}</div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

type TabKey = "encours" | "afaire" | "terminees";

export default function TachesPage() {
  const [tab, setTab] = useState<TabKey>("encours");

  const totalEnCours = EN_COURS_CRITIQUE.length + EN_COURS_IMPORTANTE.length + EN_COURS_NORMALE.length;

  const TABS: { k: TabKey; l: string; count: number }[] = [
    { k: "encours", l: "En cours", count: totalEnCours },
    { k: "afaire", l: "À faire", count: A_FAIRE.length },
    { k: "terminees", l: "Terminées", count: TERMINEES.length },
  ];

  return (
    <div className="flex flex-col h-full">
      <Topbar breadcrumb={["Collaboration", "Tâches"]} />
      <div className="flex-1 overflow-auto p-6 bg-[#F4F6F4]">

        {/* Header */}
        <div className="flex items-start justify-between mb-6 gap-4">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Tâches</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              Tâches opérationnelles — EXP-001 — Semaine du 07 au 13 juillet 2025
            </p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button className="flex items-center gap-2 px-3 py-2 text-xs bg-white border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition-colors">
              <Columns size={13} />Vue Kanban
            </button>
            <button className="flex items-center gap-2 px-3 py-2 text-xs bg-[#2E7D32] text-white rounded-xl hover:bg-[#1B5E20] transition-colors font-medium">
              <Plus size={13} />Nouvelle tâche
            </button>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <KpiCard value={12} label="Tâches actives" sub="Semaine en cours" color="text-gray-900" />
          <KpiCard value={3} label="Critiques" sub="Action immédiate" color="text-red-600" />
          <KpiCard value="68%" label="Progression semaine" sub="S2 juillet 2025" color="text-[#2E7D32]" />
          <KpiCard value={2} label="En retard" sub="Dépassement échéance" color="text-orange-600" />
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white border border-gray-100 rounded-2xl p-1 mb-6 w-fit">
          {TABS.map((t) => (
            <button
              key={t.k}
              onClick={() => setTab(t.k)}
              className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-medium transition-all ${
                tab === t.k ? "bg-[#2E7D32] text-white shadow-sm" : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {t.l}
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                tab === t.k ? "bg-white/20 text-white" : "bg-gray-100 text-gray-600"
              }`}>
                {t.count}
              </span>
            </button>
          ))}
        </div>

        {/* Content */}
        {tab === "encours" && <EnCoursTab />}
        {tab === "afaire" && <AFaireTab />}
        {tab === "terminees" && <TermineesTab />}
      </div>
    </div>
  );
}
