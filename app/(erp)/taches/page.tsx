"use client";

import { useState } from "react";
import Topbar from "../../components/Topbar";
import {
  CheckCircle2,
  Circle,
  Clock,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Filter,
  Plus,
  ArrowUpDown,
  User,
  Calendar,
  Link2,
  MoreHorizontal,
} from "lucide-react";

type Priority = "urgent" | "high" | "normal" | "low";
type Status = "todo" | "inprogress" | "review" | "done";

interface Task {
  id: number;
  title: string;
  assignee: string;
  priority: Priority;
  status: Status;
  category: string;
  due: string;
  linkedRef?: string;
  warning?: string;
  note?: string;
  completedDate?: string;
}

const TASKS: Task[] = [
  { id: 1, title: "Traitement Ridomil PAR-B1 (mildiou)", assignee: "Ibrahim S.", priority: "urgent", status: "todo", category: "Agriculture", due: "12/07" },
  { id: 2, title: "Commander KCl 720 kg SCPA", assignee: "Bamba O.", priority: "high", status: "todo", category: "Achats", due: "15/07", linkedRef: "ACH-2025-092" },
  { id: 3, title: "Renouvellement fermage PAR-B1+B2", assignee: "Dir. Admin", priority: "high", status: "todo", category: "Foncier", due: "14/07", warning: "Echeance critique" },
  { id: 4, title: "Mise a jour registre phytosanitaire", assignee: "Konan Y.", priority: "normal", status: "todo", category: "Conformite", due: "20/07" },
  { id: 5, title: "Entretien groupe electrogene GE-01", assignee: "Bamba O.", priority: "normal", status: "todo", category: "Maintenance", due: "25/07" },
  { id: 6, title: "Fermentation LOT-2025-048 - suivi J5/6", assignee: "Ibrahim S.", priority: "urgent", status: "inprogress", category: "Production", due: "12/07" },
  { id: 7, title: "Revision circuit hydraulique MAT-001 (pieces commandees)", assignee: "Bamba O.", priority: "high", status: "inprogress", category: "Maintenance", due: "15/07" },
  { id: 8, title: "Recrutement Responsable Export", assignee: "RH", priority: "high", status: "inprogress", category: "RH", due: "18/07" },
  { id: 9, title: "Mise a jour cartographie SIG parcelles", assignee: "Konan Y.", priority: "normal", status: "inprogress", category: "Cartographie", due: "31/07" },
  { id: 10, title: "Rapport qualite LOT-2025-047", assignee: "Adjoua M.", priority: "high", status: "review", category: "Qualite", due: "13/07" },
  { id: 11, title: "Budget H2 2025", assignee: "Dir. Financier", priority: "normal", status: "review", category: "Finance", due: "15/07" },
  { id: 12, title: "Taille entretien PAR-A1+A2", assignee: "Ibrahim S.", priority: "normal", status: "done", category: "Agriculture", due: "11/07", completedDate: "11/07" },
  { id: 13, title: "Controle humidite LOT-2025-045", assignee: "Ibrahim S.", priority: "normal", status: "done", category: "Production", due: "10/07", completedDate: "10/07" },
  { id: 14, title: "Paiement fournisseur NSIA assurance", assignee: "Dir. Financier", priority: "normal", status: "done", category: "Finance", due: "08/07", completedDate: "08/07" },
  { id: 15, title: "Formation securite chimique", assignee: "Konan Y.", priority: "normal", status: "done", category: "Formation", due: "05/07", completedDate: "05/07", note: "12 participants" },
  { id: 16, title: "Inventaire entrepot A", assignee: "Bamba O.", priority: "normal", status: "done", category: "Logistique", due: "01/07", completedDate: "01/07" },
];

const PRIORITY_CONFIG: Record<Priority, { label: string; color: string; dot: string }> = {
  urgent: { label: "URGENT", color: "bg-red-100 text-red-700", dot: "bg-red-500" },
  high: { label: "Haute", color: "bg-orange-100 text-orange-700", dot: "bg-orange-400" },
  normal: { label: "Normale", color: "bg-gray-100 text-gray-600", dot: "bg-gray-400" },
  low: { label: "Basse", color: "bg-blue-100 text-blue-600", dot: "bg-blue-400" },
};

const STATUS_CONFIG: Record<Status, { label: string; color: string }> = {
  todo: { label: "A faire", color: "bg-gray-100 text-gray-600" },
  inprogress: { label: "En cours", color: "bg-blue-100 text-blue-700" },
  review: { label: "En revision", color: "bg-purple-100 text-purple-700" },
  done: { label: "Termine", color: "bg-green-100 text-green-700" },
};

const JULY_2025: (number | null)[][] = [
  [null, null, 1, 2, 3, 4, 5],
  [6, 7, 8, 9, 10, 11, 12],
  [13, 14, 15, 16, 17, 18, 19],
  [20, 21, 22, 23, 24, 25, 26],
  [27, 28, 29, 30, 31, null, null],
];

function parseDay(due: string): number | null {
  const parts = due.split("/");
  if (parts[1] === "07") return parseInt(parts[0]);
  return null;
}

function PriorityBadge({ priority }: { priority: Priority }) {
  const cfg = PRIORITY_CONFIG[priority];
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${cfg.color}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
}

function StatusBadge({ status }: { status: Status }) {
  const cfg = STATUS_CONFIG[status];
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${cfg.color}`}>
      {cfg.label}
    </span>
  );
}

function TaskCard({ task }: { task: Task }) {
  return (
    <div className={`bg-white rounded-xl border p-3 shadow-sm hover:shadow-md transition-shadow ${task.priority === "urgent" ? "border-l-4 border-l-red-500 border-gray-100" : "border-gray-100"}`}>
      <div className="flex items-start justify-between gap-2 mb-2">
        <p className="text-xs font-medium text-gray-800 leading-snug flex-1">{task.title}</p>
        <button className="text-gray-400 hover:text-gray-600 flex-shrink-0"><MoreHorizontal size={14} /></button>
      </div>
      <div className="flex flex-wrap gap-1 mb-2">
        <PriorityBadge priority={task.priority} />
        <span className="px-2 py-0.5 rounded-full text-xs bg-[#E8F5E9] text-[#2E7D32] font-medium">{task.category}</span>
      </div>
      {task.warning && (
        <div className="flex items-center gap-1 mb-2">
          <AlertTriangle size={11} className="text-orange-500" />
          <span className="text-xs text-orange-600">{task.warning}</span>
        </div>
      )}
      {task.linkedRef && (
        <div className="flex items-center gap-1 mb-2">
          <Link2 size={11} className="text-blue-400" />
          <span className="text-xs text-blue-600">{task.linkedRef}</span>
        </div>
      )}
      {task.note && <p className="text-xs text-gray-500 mb-2 italic">{task.note}</p>}
      <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-50">
        <div className="flex items-center gap-1 text-gray-500">
          <User size={11} /><span className="text-xs">{task.assignee}</span>
        </div>
        <div className="flex items-center gap-1 text-gray-500">
          <Calendar size={11} /><span className="text-xs">{task.completedDate || task.due}</span>
        </div>
      </div>
    </div>
  );
}

function KanbanView() {
  const columns: { key: Status; title: string; bg: string; header: string }[] = [
    { key: "todo", title: "A faire", bg: "bg-gray-50", header: "bg-gray-200 text-gray-700" },
    { key: "inprogress", title: "En cours", bg: "bg-blue-50", header: "bg-blue-200 text-blue-700" },
    { key: "review", title: "En revision", bg: "bg-purple-50", header: "bg-purple-200 text-purple-700" },
    { key: "done", title: "Termine", bg: "bg-green-50", header: "bg-green-200 text-green-700" },
  ];
  return (
    <div className="overflow-x-auto pb-4">
      <div className="flex gap-4 min-w-[900px]">
        {columns.map((col) => {
          const tasks = TASKS.filter((t) => t.status === col.key);
          return (
            <div key={col.key} className={`flex-1 min-w-[220px] rounded-2xl ${col.bg} p-3`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${col.header}`}>{col.title}</span>
                  <span className="w-5 h-5 rounded-full bg-white text-xs font-bold text-gray-600 flex items-center justify-center shadow-sm">{tasks.length}</span>
                </div>
                <button className="text-gray-400 hover:text-[#2E7D32]"><Plus size={15} /></button>
              </div>
              <div className="flex flex-col gap-2">
                {tasks.map((task) => <TaskCard key={task.id} task={task} />)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ListView() {
  const [filter, setFilter] = useState("all");
  const [assigneeFilter, setAssigneeFilter] = useState("all");
  const [sort, setSort] = useState("due");
  const assignees = Array.from(new Set(TASKS.map((t) => t.assignee)));

  const filtered = TASKS.filter((t) => {
    if (filter === "mine") return t.assignee === "Ibrahim S.";
    if (filter === "urgent") return t.priority === "urgent";
    if (filter === "week") return ["12/07", "13/07", "14/07", "15/07"].includes(t.due);
    if (assigneeFilter !== "all") return t.assignee === assigneeFilter;
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sort === "priority") {
      const order: Priority[] = ["urgent", "high", "normal", "low"];
      return order.indexOf(a.priority) - order.indexOf(b.priority);
    }
    if (sort === "assignee") return a.assignee.localeCompare(b.assignee);
    return a.due.localeCompare(b.due);
  });

  const FILTER_TABS = [
    { k: "all", l: "Toutes" },
    { k: "mine", l: "Mes taches" },
    { k: "urgent", l: "Urgentes" },
    { k: "week", l: "Cette semaine" },
  ];
  const SORT_TABS = [
    { k: "due", l: "Date" },
    { k: "priority", l: "Priorite" },
    { k: "assignee", l: "Assigne" },
  ];

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <div className="flex rounded-xl border border-gray-200 overflow-hidden text-xs">
          {FILTER_TABS.map((f) => (
            <button key={f.k} onClick={() => setFilter(f.k)}
              className={`px-3 py-1.5 font-medium transition-colors ${filter === f.k ? "bg-[#2E7D32] text-white" : "bg-white text-gray-600 hover:bg-gray-50"}`}>
              {f.l}
            </button>
          ))}
        </div>
        <select value={assigneeFilter} onChange={(e) => setAssigneeFilter(e.target.value)}
          className="text-xs border border-gray-200 rounded-lg px-3 py-1.5 bg-white text-gray-700 focus:outline-none">
          <option value="all">Tous les assignes</option>
          {assignees.map((a) => <option key={a} value={a}>{a}</option>)}
        </select>
        <div className="ml-auto flex items-center gap-2 text-xs text-gray-500">
          <ArrowUpDown size={13} /><span>Trier par :</span>
          {SORT_TABS.map((s) => (
            <button key={s.k} onClick={() => setSort(s.k)}
              className={`px-2 py-1 rounded-lg transition-colors ${sort === s.k ? "bg-[#2E7D32] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
              {s.l}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-[#F8FBF8] border-b border-gray-100">
                {["#", "Tache", "Assigne", "Priorite", "Statut", "Categorie", "Echeance", "Actions"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left font-semibold text-gray-500">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sorted.map((task, i) => (
                <tr key={task.id} className={`border-b border-gray-50 hover:bg-gray-50 transition-colors ${task.status === "done" ? "opacity-60" : ""}`}>
                  <td className="px-4 py-2.5 text-gray-400">{i + 1}</td>
                  <td className="px-4 py-2.5">
                    <div className="flex items-center gap-2">
                      {task.status === "done" ? <CheckCircle2 size={13} className="text-green-500 flex-shrink-0" /> : <Circle size={13} className="text-gray-300 flex-shrink-0" />}
                      <span className={`font-medium text-gray-800 ${task.status === "done" ? "line-through text-gray-400" : ""}`}>{task.title}</span>
                      {task.warning && <AlertTriangle size={12} className="text-orange-500" />}
                      {task.linkedRef && <span className="px-1.5 py-0.5 bg-blue-50 text-blue-600 rounded text-[10px]">{task.linkedRef}</span>}
                    </div>
                  </td>
                  <td className="px-4 py-2.5 text-gray-600">{task.assignee}</td>
                  <td className="px-4 py-2.5"><PriorityBadge priority={task.priority} /></td>
                  <td className="px-4 py-2.5"><StatusBadge status={task.status} /></td>
                  <td className="px-4 py-2.5"><span className="px-2 py-0.5 rounded-full bg-[#E8F5E9] text-[#2E7D32] text-[10px] font-medium">{task.category}</span></td>
                  <td className="px-4 py-2.5"><div className="flex items-center gap-1 text-gray-600"><Calendar size={11} /><span>{task.completedDate || task.due}</span></div></td>
                  <td className="px-4 py-2.5">
                    <div className="flex items-center gap-1">
                      <button className="px-2 py-1 text-[10px] bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">Voir</button>
                      <button className="px-2 py-1 text-[10px] bg-[#E8F5E9] text-[#2E7D32] rounded-lg hover:bg-[#C8E6C9] transition-colors">Editer</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-3 text-xs">
        <div className="flex items-center gap-1.5 bg-white rounded-xl border border-gray-100 px-3 py-2">
          <span className="font-semibold text-gray-700">16</span><span className="text-gray-500">taches</span>
        </div>
        <div className="flex items-center gap-1.5 bg-white rounded-xl border border-gray-100 px-3 py-2">
          <span className="w-2 h-2 rounded-full bg-red-500" /><span className="font-semibold text-red-600">5</span><span className="text-gray-500">en retard</span>
        </div>
        <div className="flex items-center gap-1.5 bg-white rounded-xl border border-gray-100 px-3 py-2">
          <Clock size={13} className="text-blue-500" /><span className="font-semibold text-blue-600">8</span><span className="text-gray-500">cette semaine</span>
        </div>
        <div className="flex items-center gap-1.5 bg-white rounded-xl border border-gray-100 px-3 py-2">
          <AlertTriangle size={13} className="text-orange-500" /><span className="font-semibold text-orange-600">3</span><span className="text-gray-500">urgentes</span>
        </div>
      </div>
    </div>
  );
}

function CalendarView() {
  const [selectedDay, setSelectedDay] = useState(11);
  const tasksByDay: Record<number, Task[]> = {};
  TASKS.forEach((t) => {
    const d = parseDay(t.due);
    if (d) {
      if (!tasksByDay[d]) tasksByDay[d] = [];
      tasksByDay[d].push(t);
    }
  });
  const selectedTasks = tasksByDay[selectedDay] || [];
  const DAYS_HEADER = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
  const STATS = [
    { l: "Total", v: "16", c: "text-gray-700" },
    { l: "Terminees", v: "5", c: "text-green-600" },
    { l: "En cours", v: "4", c: "text-blue-600" },
    { l: "Urgentes", v: "3", c: "text-red-600" },
  ];
  return (
    <div className="flex gap-4">
      <div className="flex-1">
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <div className="flex items-center justify-between mb-4">
            <button className="p-1.5 hover:bg-gray-100 rounded-lg"><ChevronLeft size={16} /></button>
            <h3 className="text-sm font-semibold text-gray-800">Juillet 2025</h3>
            <button className="p-1.5 hover:bg-gray-100 rounded-lg"><ChevronRight size={16} /></button>
          </div>
          <div className="grid grid-cols-7 mb-2">
            {DAYS_HEADER.map((d) => <div key={d} className="text-center text-xs font-semibold text-gray-500 py-1">{d}</div>)}
          </div>
          {JULY_2025.map((week, wi) => (
            <div key={wi} className="grid grid-cols-7 gap-1 mb-1">
              {week.map((day, di) => {
                const tasks = day ? tasksByDay[day] || [] : [];
                const hasUrgent = tasks.some((t) => t.priority === "urgent");
                const isSelected = day === selectedDay;
                const isToday = day === 11;
                const cls = [
                  "relative rounded-xl p-1.5 min-h-[52px] transition-all",
                  day === null ? "invisible" : "cursor-pointer",
                  hasUrgent && !isSelected ? "bg-orange-50 border border-orange-200" : "",
                  isSelected ? "bg-[#2E7D32] text-white shadow-md" : "hover:bg-gray-50 border border-transparent hover:border-gray-200",
                ].join(" ");
                return (
                  <div key={di} onClick={() => day !== null && setSelectedDay(day)} className={cls}>
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-xs font-semibold ${isSelected ? "text-white" : isToday ? "text-[#2E7D32]" : "text-gray-700"}`}>{day}</span>
                      {isToday && !isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#2E7D32]" />}
                    </div>
                    {tasks.length > 0 && (
                      <div className="flex flex-wrap gap-0.5">
                        {tasks.slice(0, 3).map((t) => (
                          <span key={t.id} className={`w-2 h-2 rounded-full ${isSelected ? "bg-white opacity-80" : PRIORITY_CONFIG[t.priority].dot}`} />
                        ))}
                        {tasks.length > 3 && <span className={`text-[9px] font-bold ${isSelected ? "text-white" : "text-gray-500"}`}>+{tasks.length - 3}</span>}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
          <div className="flex items-center gap-4 mt-4 pt-3 border-t border-gray-100 text-xs text-gray-500">
            {[{ c: "bg-red-500", l: "Urgent" }, { c: "bg-orange-400", l: "Haute" }, { c: "bg-gray-400", l: "Normale" }].map((item) => (
              <div key={item.l} className="flex items-center gap-1.5"><span className={`w-2.5 h-2.5 rounded-full ${item.c}`} />{item.l}</div>
            ))}
            <div className="flex items-center gap-1.5 ml-auto"><span className="w-2.5 h-2.5 rounded-full bg-orange-100 border border-orange-300" />Urgent ce jour</div>
          </div>
        </div>
      </div>
      <div className="w-72 flex-shrink-0">
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h4 className="text-sm font-semibold text-gray-800 mb-1">{selectedDay} juillet 2025</h4>
          <p className="text-xs text-gray-500 mb-4">{selectedTasks.length} tache{selectedTasks.length !== 1 ? "s" : ""}</p>
          {selectedTasks.length === 0 ? (
            <div className="text-center py-8">
              <CheckCircle2 size={32} className="text-gray-200 mx-auto mb-2" />
              <p className="text-xs text-gray-400">Aucune tache ce jour</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {selectedTasks.map((task) => (
                <div key={task.id} className={`rounded-xl border p-3 ${task.priority === "urgent" ? "border-l-4 border-l-red-500 border-gray-100" : "border-gray-100"}`}>
                  <div className="flex items-start gap-2 mb-2">
                    <div className={`w-2 h-2 rounded-full mt-0.5 flex-shrink-0 ${PRIORITY_CONFIG[task.priority].dot}`} />
                    <p className="text-xs font-medium text-gray-800 leading-snug">{task.title}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <PriorityBadge priority={task.priority} />
                    <StatusBadge status={task.status} />
                  </div>
                  <div className="flex items-center gap-1 mt-2 text-gray-500">
                    <User size={10} /><span className="text-xs">{task.assignee}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="rounded-2xl border border-gray-100 bg-white p-4 mt-4">
          <h4 className="text-xs font-semibold text-gray-600 mb-3">Ce mois</h4>
          <div className="grid grid-cols-2 gap-2">
            {STATS.map((s) => (
              <div key={s.l} className="bg-gray-50 rounded-xl p-2.5 text-center">
                <div className={`text-lg font-bold ${s.c}`}>{s.v}</div>
                <div className="text-[10px] text-gray-500">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TachesPage() {
  const [tab, setTab] = useState<"kanban" | "liste" | "calendrier">("kanban");
  return (
    <div className="flex flex-col h-full">
      <Topbar breadcrumb={["Collaboration", "Taches"]} />
      <div className="flex-1 overflow-auto p-6 bg-[#F4F6F4]">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Gestionnaire de taches</h1>
            <p className="text-sm text-gray-500 mt-0.5">Suivi operationnel agricole - Juillet 2025</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-2 text-xs bg-white border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition-colors">
              <Filter size={13} />Filtres
            </button>
            <button className="flex items-center gap-2 px-3 py-2 text-xs bg-[#2E7D32] text-white rounded-xl hover:bg-[#1B5E20] transition-colors font-medium">
              <Plus size={13} />Nouvelle tache
            </button>
          </div>
        </div>
        <div className="flex gap-1 bg-white border border-gray-100 rounded-2xl p-1 mb-6 w-fit">
          {([{ k: "kanban" as const, l: "Kanban" }, { k: "liste" as const, l: "Liste" }, { k: "calendrier" as const, l: "Calendrier" }]).map((t) => (
            <button key={t.k} onClick={() => setTab(t.k)}
              className={`px-5 py-2 rounded-xl text-sm font-medium transition-all ${tab === t.k ? "bg-[#2E7D32] text-white shadow-sm" : "text-gray-600 hover:bg-gray-50"}`}>
              {t.l}
            </button>
          ))}
        </div>
        {tab === "kanban" && <KanbanView />}
        {tab === "liste" && <ListView />}
        {tab === "calendrier" && <CalendarView />}
      </div>
    </div>
  );
}
