"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Plus, Edit2, Trash2 } from "lucide-react";
import Topbar from "../../components/Topbar";

// ─── Types ───────────────────────────────────────────────────────────────────

type EventCategory = "production" | "logistique" | "maintenance" | "finance" | "reunion" | "ia" | "aqua";

interface AgriEvent {
  id: number;
  day: number;
  month: number; // 0-based
  year: number;
  emoji: string;
  title: string;
  description?: string;
  category: EventCategory;
  time?: string;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const CATEGORY_COLORS: Record<EventCategory, { bg: string; text: string; dot: string }> = {
  production:  { bg: "bg-green-100",  text: "text-green-800",  dot: "bg-green-500"  },
  logistique:  { bg: "bg-blue-100",   text: "text-blue-800",   dot: "bg-blue-500"   },
  maintenance: { bg: "bg-orange-100", text: "text-orange-800", dot: "bg-orange-500" },
  finance:     { bg: "bg-red-100",    text: "text-red-800",    dot: "bg-red-500"    },
  reunion:     { bg: "bg-red-100",    text: "text-red-800",    dot: "bg-red-500"    },
  ia:          { bg: "bg-purple-100", text: "text-purple-800", dot: "bg-purple-500" },
  aqua:        { bg: "bg-cyan-100",   text: "text-cyan-800",   dot: "bg-cyan-500"   },
};

const CATEGORY_LABELS: Record<EventCategory, string> = {
  production:  "🌾 Production",
  logistique:  "📦 Logistique",
  maintenance: "🔧 Maintenance",
  finance:     "💰 Finance",
  reunion:     "📋 Réunions",
  ia:          "🤖 IA",
  aqua:        "🐟 Aquaculture",
};

const WEEKDAYS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

const MONTH_NAMES = [
  "Janvier","Février","Mars","Avril","Mai","Juin",
  "Juillet","Août","Septembre","Octobre","Novembre","Décembre",
];

const INITIAL_EVENTS: AgriEvent[] = [
  { id: 1,  day: 1,  month: 6, year: 2025, emoji: "🌾", title: "Début fermentation LOT-2025-018",       description: "Début du processus de fermentation du lot cacao 2025-018.",       category: "production",  time: "08:00" },
  { id: 2,  day: 3,  month: 6, year: 2025, emoji: "📦", title: "Réception commande AGRIINTRANT",         description: "Arrivée des intrants agricoles commandés chez AGRIINTRANT.",     category: "logistique",  time: "10:00" },
  { id: 3,  day: 5,  month: 6, year: 2025, emoji: "🐄", title: "Pesée bovin mensuelle",                  description: "Pesée et suivi sanitaire mensuel du troupeau bovin.",           category: "maintenance", time: "07:00" },
  { id: 4,  day: 7,  month: 6, year: 2025, emoji: "🤖", title: "Rapport IA hebdomadaire auto",            description: "Génération automatique du rapport IA hebdomadaire.",            category: "ia",          time: "06:00" },
  { id: 5,  day: 8,  month: 6, year: 2025, emoji: "✅", title: "Récolte cacao A1-A8 terminée",           description: "Clôture de la récolte de cacao sur les parcelles A1 à A8.",    category: "production",  time: "17:00" },
  { id: 6,  day: 9,  month: 6, year: 2025, emoji: "📋", title: "Réunion direction mensuelle",            description: "Réunion mensuelle de la direction générale — salle de conf.", category: "reunion",     time: "09:00" },
  { id: 7,  day: 10, month: 6, year: 2025, emoji: "📋", title: "Réunion direction mensuelle",            description: "Suite de la réunion mensuelle de direction (jour 2).",          category: "reunion",     time: "09:00" },
  { id: 8,  day: 12, month: 6, year: 2025, emoji: "🔧", title: "Maintenance tracteur JD 5075",           description: "Révision périodique et vidange du tracteur John Deere 5075.",   category: "maintenance", time: "08:00" },
  { id: 9,  day: 14, month: 6, year: 2025, emoji: "📦", title: "Livraison BC-2025-042 AGRIINTRANT",      description: "Livraison du bon de commande BC-2025-042 par AGRIINTRANT.",      category: "logistique",  time: "14:00" },
  { id: 10, day: 15, month: 6, year: 2025, emoji: "✅", title: "Fin fermentation LOT-2025-018",          description: "Fin du processus de fermentation — mise en séchage.",           category: "production",  time: "08:00" },
  { id: 11, day: 20, month: 6, year: 2025, emoji: "🌾", title: "Début campagne maïs D2-D6 semis",        description: "Lancement du semis de maïs sur les parcelles D2 à D6.",         category: "production",  time: "06:30" },
  { id: 12, day: 21, month: 6, year: 2025, emoji: "🤖", title: "Rapport IA hebdomadaire auto",            description: "Génération automatique du rapport IA hebdomadaire.",            category: "ia",          time: "06:00" },
  { id: 13, day: 25, month: 6, year: 2025, emoji: "💰", title: "Paiement salaires juillet",              description: "Virement des salaires du mois de juillet à tous les employés.", category: "finance",     time: "09:00" },
  { id: 14, day: 28, month: 6, year: 2025, emoji: "🐟", title: "Récolte bassin B1 silure",               description: "Récolte et pesée des silures du bassin B1.",                   category: "aqua",        time: "06:00" },
  { id: 15, day: 31, month: 6, year: 2025, emoji: "📊", title: "Clôture comptable mensuelle",            description: "Arrêté des comptes de juillet et envoi au DAF.",                category: "ia",          time: "17:00" },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

/** Returns 0=Mon … 6=Sun for the first day of given month */
function getFirstWeekday(year: number, month: number) {
  const jsDay = new Date(year, month, 1).getDay(); // 0=Sun
  return jsDay === 0 ? 6 : jsDay - 1;
}

// ─── Component ───────────────────────────────────────────────────────────────

type ViewMode = "mois" | "semaine" | "liste";

export default function CalendrierPage() {
  const today = new Date(2025, 6, 9); // 09/07/2025 — fix "today" for demo

  const [year, setYear]   = useState(2025);
  const [month, setMonth] = useState(6); // July (0-based)
  const [view, setView]   = useState<ViewMode>("mois");
  const [selectedDay, setSelectedDay] = useState<number>(9);
  const [events, setEvents] = useState<AgriEvent[]>(INITIAL_EVENTS);

  // Navigation
  function prevMonth() {
    if (month === 0) { setMonth(11); setYear(y => y - 1); }
    else setMonth(m => m - 1);
  }
  function nextMonth() {
    if (month === 11) { setMonth(0); setYear(y => y + 1); }
    else setMonth(m => m + 1);
  }

  // Build grid cells
  const daysInMonth   = getDaysInMonth(year, month);
  const firstWeekday  = getFirstWeekday(year, month);
  const daysInPrev    = getDaysInMonth(year, month === 0 ? 11 : month - 1);
  const totalCells    = Math.ceil((firstWeekday + daysInMonth) / 7) * 7;

  const cells: { day: number; currentMonth: boolean }[] = [];
  for (let i = 0; i < totalCells; i++) {
    if (i < firstWeekday) {
      cells.push({ day: daysInPrev - firstWeekday + i + 1, currentMonth: false });
    } else if (i < firstWeekday + daysInMonth) {
      cells.push({ day: i - firstWeekday + 1, currentMonth: true });
    } else {
      cells.push({ day: i - firstWeekday - daysInMonth + 1, currentMonth: false });
    }
  }

  function eventsForDay(day: number, curMonth: boolean) {
    if (!curMonth) return [];
    return events.filter(e => e.day === day && e.month === month && e.year === year);
  }

  const selectedEvents = events.filter(
    e => e.day === selectedDay && e.month === month && e.year === year
  );

  function deleteEvent(id: number) {
    setEvents(prev => prev.filter(e => e.id !== id));
  }

  const isToday = (day: number, curMonth: boolean) =>
    curMonth &&
    day === today.getDate() &&
    month === today.getMonth() &&
    year === today.getFullYear();

  // ── Liste view ──────────────────────────────────────────────────────────────
  const monthEvents = events
    .filter(e => e.month === month && e.year === year)
    .sort((a, b) => a.day - b.day);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Topbar title="Calendrier Agricole" breadcrumb={["Calendrier Agricole"]} />

      <div className="flex flex-1 gap-4 p-6 overflow-hidden">
        {/* ── Main calendar area ─────────────────────────────────────────── */}
        <div className="flex-1 flex flex-col gap-4 min-w-0">

          {/* Calendar header */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex items-center justify-between gap-3 flex-wrap">
            {/* Month navigation */}
            <div className="flex items-center gap-3">
              <button
                onClick={prevMonth}
                className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                <ChevronLeft size={16} />
              </button>
              <h2 className="text-lg font-semibold text-gray-900 min-w-[160px] text-center">
                {MONTH_NAMES[month]} {year}
              </h2>
              <button
                onClick={nextMonth}
                className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                <ChevronRight size={16} />
              </button>
            </div>

            {/* View switcher */}
            <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1">
              {(["mois", "semaine", "liste"] as ViewMode[]).map(v => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  className={`px-4 py-1.5 rounded-lg text-sm font-medium capitalize transition-colors ${
                    view === v
                      ? "bg-[#2E7D32] text-white shadow-sm"
                      : "text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {v.charAt(0).toUpperCase() + v.slice(1)}
                </button>
              ))}
            </div>

            {/* Add event */}
            <button className="flex items-center gap-2 px-4 py-2 bg-[#2E7D32] text-white rounded-xl text-sm font-medium hover:bg-[#256427] transition-colors shadow-sm">
              <Plus size={16} />
              Ajouter un événement
            </button>
          </div>

          {/* ── Month view ───────────────────────────────────────────────── */}
          {view === "mois" && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex-1">
              {/* Weekday headers */}
              <div className="grid grid-cols-7 border-b border-gray-100">
                {WEEKDAYS.map(d => (
                  <div key={d} className="py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    {d}
                  </div>
                ))}
              </div>

              {/* Day cells */}
              <div className="grid grid-cols-7 auto-rows-fr">
                {cells.map((cell, idx) => {
                  const dayEvents = eventsForDay(cell.day, cell.currentMonth);
                  const today_ = isToday(cell.day, cell.currentMonth);
                  const isSelected = cell.currentMonth && cell.day === selectedDay && month === month;

                  return (
                    <div
                      key={idx}
                      onClick={() => { if (cell.currentMonth) setSelectedDay(cell.day); }}
                      className={`
                        border-b border-r border-gray-50 p-2 min-h-[100px] cursor-pointer transition-colors
                        ${cell.currentMonth ? "hover:bg-gray-50" : ""}
                        ${today_ ? "bg-[#E8F5E9]" : ""}
                        ${isSelected && !today_ ? "bg-green-50" : ""}
                      `}
                    >
                      {/* Day number */}
                      <div className={`
                        text-sm font-semibold w-7 h-7 flex items-center justify-center rounded-full mb-1
                        ${today_ ? "bg-[#2E7D32] text-white" : ""}
                        ${!cell.currentMonth ? "text-gray-300" : !today_ ? "text-gray-800" : ""}
                      `}>
                        {cell.day}
                      </div>

                      {/* Events */}
                      <div className="space-y-0.5">
                        {dayEvents.slice(0, 3).map(ev => {
                          const c = CATEGORY_COLORS[ev.category];
                          return (
                            <div
                              key={ev.id}
                              className={`text-[10px] font-medium px-1.5 py-0.5 rounded-md truncate ${c.bg} ${c.text}`}
                              title={ev.title}
                            >
                              {ev.emoji} {ev.title}
                            </div>
                          );
                        })}
                        {dayEvents.length > 3 && (
                          <div className="text-[10px] text-gray-500 pl-1">
                            +{dayEvents.length - 3} autres
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── Week view ────────────────────────────────────────────────── */}
          {view === "semaine" && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex-1">
              <p className="text-sm text-gray-500 mb-4">
                Semaine du <strong>{selectedDay > 6 ? selectedDay - 6 : 1}/{month + 1}/{year}</strong>
              </p>
              <div className="grid grid-cols-7 gap-2">
                {WEEKDAYS.map((wd, i) => {
                  const dayNum = Math.max(1, selectedDay - (selectedDay % 7 === 0 ? 6 : (selectedDay % 7) - 1)) + i;
                  const dayEvs = events.filter(e => e.day === dayNum && e.month === month && e.year === year);
                  return (
                    <div key={wd} className="flex flex-col gap-1">
                      <div className="text-xs font-semibold text-gray-500 text-center py-1 border-b border-gray-100">
                        {wd} {dayNum <= daysInMonth ? dayNum : ""}
                      </div>
                      <div className="space-y-1 min-h-[200px]">
                        {dayEvs.map(ev => {
                          const c = CATEGORY_COLORS[ev.category];
                          return (
                            <div key={ev.id} className={`text-[10px] p-1.5 rounded-lg ${c.bg} ${c.text} font-medium`}>
                              {ev.time && <div className="text-[9px] opacity-70">{ev.time}</div>}
                              {ev.emoji} {ev.title}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── List view ────────────────────────────────────────────────── */}
          {view === "liste" && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex-1 overflow-hidden">
              <div className="p-4 border-b border-gray-100">
                <h3 className="font-semibold text-gray-800">Événements — {MONTH_NAMES[month]} {year}</h3>
              </div>
              {monthEvents.length === 0 ? (
                <div className="p-8 text-center text-gray-400">Aucun événement ce mois-ci.</div>
              ) : (
                <div className="divide-y divide-gray-50">
                  {monthEvents.map(ev => {
                    const c = CATEGORY_COLORS[ev.category];
                    return (
                      <div key={ev.id} className="flex items-start gap-4 px-5 py-4 hover:bg-gray-50 transition-colors">
                        <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${c.dot}`} />
                        <div className="w-16 shrink-0 text-sm font-semibold text-gray-700">
                          {String(ev.day).padStart(2, "0")}/{String(ev.month + 1).padStart(2, "0")}
                        </div>
                        {ev.time && <div className="w-12 shrink-0 text-xs text-gray-400 mt-0.5">{ev.time}</div>}
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-gray-800">{ev.emoji} {ev.title}</div>
                          {ev.description && <div className="text-xs text-gray-400 mt-0.5">{ev.description}</div>}
                        </div>
                        <span className={`text-[10px] font-semibold px-2 py-1 rounded-full shrink-0 ${c.bg} ${c.text}`}>
                          {CATEGORY_LABELS[ev.category]}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Legend */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
            <div className="flex flex-wrap gap-3 items-center">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide mr-1">Légende :</span>
              {(Object.entries(CATEGORY_LABELS) as [EventCategory, string][])
                .filter(([k]) => k !== "aqua")
                .map(([key, label]) => {
                  const c = CATEGORY_COLORS[key];
                  return (
                    <span key={key} className={`text-xs font-medium px-3 py-1 rounded-full ${c.bg} ${c.text}`}>
                      {label}
                    </span>
                  );
              })}
            </div>
          </div>
        </div>

        {/* ── Side panel ───────────────────────────────────────────────────── */}
        <div className="w-80 shrink-0 flex flex-col gap-3">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex-1 flex flex-col overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 bg-[#2E7D32]/5">
              <h3 className="font-semibold text-[#2E7D32] text-sm">
                Événements du {String(selectedDay).padStart(2, "0")}/{String(month + 1).padStart(2, "0")}/{year}
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">
                {selectedEvents.length} événement{selectedEvents.length !== 1 ? "s" : ""}
              </p>
            </div>

            <div className="flex-1 overflow-y-auto p-3 space-y-3">
              {selectedEvents.length === 0 ? (
                <div className="text-center py-10 text-gray-400">
                  <div className="text-3xl mb-2">📅</div>
                  <p className="text-sm">Aucun événement ce jour.</p>
                </div>
              ) : (
                selectedEvents.map(ev => {
                  const c = CATEGORY_COLORS[ev.category];
                  return (
                    <div key={ev.id} className={`rounded-xl p-3 ${c.bg} border border-white`}>
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          {ev.time && (
                            <div className={`text-[10px] font-semibold mb-1 ${c.text}`}>{ev.time}</div>
                          )}
                          <div className={`text-sm font-semibold ${c.text} leading-tight`}>
                            {ev.emoji} {ev.title}
                          </div>
                          {ev.description && (
                            <p className="text-xs text-gray-500 mt-1 leading-relaxed">{ev.description}</p>
                          )}
                          <span className={`inline-block mt-2 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/60 ${c.text}`}>
                            {CATEGORY_LABELS[ev.category]}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <button className="flex items-center gap-1 text-[11px] font-medium text-gray-600 hover:text-gray-900 bg-white rounded-lg px-2.5 py-1 shadow-sm border border-gray-100 transition-colors">
                          <Edit2 size={11} /> Modifier
                        </button>
                        <button
                          onClick={() => deleteEvent(ev.id)}
                          className="flex items-center gap-1 text-[11px] font-medium text-red-500 hover:text-red-700 bg-white rounded-lg px-2.5 py-1 shadow-sm border border-red-100 transition-colors"
                        >
                          <Trash2 size={11} /> Supprimer
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Mini stats */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Ce mois</h4>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-green-50 rounded-xl p-3 text-center">
                <div className="text-xl font-bold text-[#2E7D32]">{monthEvents.length}</div>
                <div className="text-[10px] text-gray-500">Événements</div>
              </div>
              <div className="bg-orange-50 rounded-xl p-3 text-center">
                <div className="text-xl font-bold text-orange-700">
                  {monthEvents.filter(e => e.category === "maintenance").length}
                </div>
                <div className="text-[10px] text-gray-500">Maintenances</div>
              </div>
              <div className="bg-blue-50 rounded-xl p-3 text-center">
                <div className="text-xl font-bold text-blue-700">
                  {monthEvents.filter(e => e.category === "logistique").length}
                </div>
                <div className="text-[10px] text-gray-500">Livraisons</div>
              </div>
              <div className="bg-red-50 rounded-xl p-3 text-center">
                <div className="text-xl font-bold text-red-700">
                  {monthEvents.filter(e => e.category === "finance").length}
                </div>
                <div className="text-[10px] text-gray-500">Finance</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
