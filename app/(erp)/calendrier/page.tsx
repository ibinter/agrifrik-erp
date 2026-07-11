"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Topbar from "../../components/Topbar";

/* ─── Types ─────────────────────────────────────────────────────────────────── */

type ViewMode = "mois" | "semaine" | "liste";

type ChipColor = "green" | "blue" | "violet" | "orange" | "red" | "gray";

interface CalEvent {
  label: string;
  color: ChipColor;
  urgent?: boolean;
}

interface DayData {
  date: number;
  events: CalEvent[];
  isToday?: boolean;
  isEmpty?: boolean;
}

interface SidebarItem {
  time: string;
  label: string;
  urgent?: boolean;
}

interface SeasonRow {
  mois: string;
  cacao: string;
  anacarde: string;
  mais: string;
  pluie: string;
  activite: string;
  current?: boolean;
}

/* ─── Constantes ────────────────────────────────────────────────────────────── */

const WEEKDAYS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

const CHIP_STYLES: Record<ChipColor, string> = {
  green:  "bg-green-100 text-green-800",
  blue:   "bg-blue-100 text-blue-800",
  violet: "bg-violet-100 text-violet-800",
  orange: "bg-orange-100 text-orange-800",
  red:    "bg-red-100 text-red-800",
  gray:   "bg-gray-100 text-gray-600",
};

/* ─── Données juillet 2025 ───────────────────────────────────────────────────
   Juillet commence un mardi → 1 case vide (lundi absent)
   Grid: padding 0 = Lun 30 juin (grisée), Col 1 = Mar 01...
   En pratique : firstWeekday = 1 (mardi = index 1 si Lun=0)
   Donc 1 case de padding avant le 1er.
   Jours 1-6 : semaine 0 partielle
   Jours 7-13 : semaine 1
   ...
*/

const JULY_EVENTS: Record<number, CalEvent[]> = {
  7:  [
    { label: "Taille PAR-A1", color: "green" },
    { label: "Budget S1", color: "blue" },
  ],
  8:  [
    { label: "Taille PAR-A1 suite", color: "green" },
    { label: "Facture Barry Callebaut", color: "blue" },
  ],
  9:  [
    { label: "Rapport terrain PAR-A3", color: "green" },
    { label: "Paie juillet", color: "violet" },
  ],
  10: [
    { label: "Taille PAR-A1", color: "green" },
    { label: "Réunion direction", color: "orange" },
  ],
  11: [
    { label: "Traitement mildiou PAR-B1", color: "red", urgent: true },
    { label: "Taille PAR-A3", color: "green" },
  ],
  12: [
    { label: "⚠ Pluies 65mm", color: "gray" },
    { label: "Sécuriser séchoirs", color: "red", urgent: true },
  ],
  13: [
    { label: "⚠ Pluies 82mm", color: "gray" },
  ],
  14: [
    { label: "Sarclage PAR-D2", color: "green" },
    { label: "Planning semaine", color: "violet" },
  ],
  15: [
    { label: "Réunion coopérative", color: "violet" },
    { label: "Analyse eau potable", color: "blue" },
  ],
  16: [
    { label: "Contrôle bacs fermentation", color: "green" },
  ],
  17: [
    { label: "Livraison MSC Allegria → Barry", color: "blue" },
  ],
  18: [
    { label: "Contrôle qualité LOT-048", color: "green" },
    { label: "⚠ Pluies 40mm", color: "gray" },
  ],
  20: [
    { label: "Épandage K PAR-A3", color: "green", urgent: true },
  ],
  21: [
    { label: "Rapport IA hebdo", color: "violet" },
  ],
  22: [
    { label: "Inventaire entrepôts", color: "blue" },
    { label: "Taille PAR-C1", color: "green" },
  ],
  24: [
    { label: "Réunion BCEAO / crédit", color: "orange" },
  ],
  25: [
    { label: "Contrôle pépinière", color: "green" },
    { label: "Paiement fournisseur", color: "blue" },
  ],
  28: [
    { label: "Clôture comptable juillet", color: "violet" },
  ],
  29: [
    { label: "Rapport terrain", color: "green" },
    { label: "Réunion équipe", color: "orange" },
  ],
  31: [
    { label: "Fin séchage LOT-052", color: "green" },
    { label: "Clôture mois", color: "blue" },
  ],
};

/* Sidebar events pour le 11 juillet */
const SIDEBAR_EVENTS: SidebarItem[] = [
  { time: "06:00", label: "Rapport météo automatique" },
  { time: "08:00", label: "Début taille PAR-A3 — Ibrahim S." },
  { time: "08:30", label: "Traitement Ridomil Gold PAR-B1", urgent: true },
  { time: "12:00", label: "Contrôle fermentation bacs A1, A3" },
  { time: "14:00", label: "Réunion équipe terrain" },
  { time: "17:00", label: "Clôture saisie journalière" },
];

/* Tableau saisonnier */
const SEASON_ROWS: SeasonRow[] = [
  { mois: "Janvier",   cacao: "Taille",                anacarde: "Export",   mais: "—",            pluie: "40mm",  activite: "Entretien" },
  { mois: "Février",   cacao: "Floraison",             anacarde: "—",        mais: "—",            pluie: "60mm",  activite: "Traitement préventif" },
  { mois: "Mars",      cacao: "—",                     anacarde: "Récolte",  mais: "Semis",        pluie: "120mm", activite: "Récolte anacarde" },
  { mois: "Avril",     cacao: "Récolte intermédiaire", anacarde: "Export",   mais: "—",            pluie: "150mm", activite: "Récolte cacao intermédiaire" },
  { mois: "Mai",       cacao: "—",                     anacarde: "Export",   mais: "—",            pluie: "180mm", activite: "Fertilisation N" },
  { mois: "Juin",      cacao: "Surveillance",          anacarde: "—",        mais: "Récolte",      pluie: "256mm", activite: "Contrôles" },
  { mois: "Juillet",   cacao: "Entretien",             anacarde: "—",        mais: "Semis cycle 2",pluie: "280mm", activite: "Traitement, entretien", current: true },
  { mois: "Août",      cacao: "—",                     anacarde: "—",        mais: "—",            pluie: "240mm", activite: "Entretien, séchage" },
  { mois: "Septembre", cacao: "—",                     anacarde: "—",        mais: "Récolte",      pluie: "180mm", activite: "Préparer récolte principale" },
  { mois: "Octobre",   cacao: "Récolte principale",    anacarde: "—",        mais: "—",            pluie: "120mm", activite: "★ RÉCOLTE" },
  { mois: "Novembre",  cacao: "Récolte principale",    anacarde: "—",        mais: "—",            pluie: "80mm",  activite: "★ RÉCOLTE + Export" },
  { mois: "Décembre",  cacao: "Post-récolte",          anacarde: "—",        mais: "—",            pluie: "40mm",  activite: "Export, bilan annuel" },
];

/* ─── Helper ─────────────────────────────────────────────────────────────────── */

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstWeekday(year: number, month: number) {
  const jsDay = new Date(year, month, 1).getDay();
  return jsDay === 0 ? 6 : jsDay - 1;
}

/* ─── Composant principal ────────────────────────────────────────────────────── */

export default function CalendrierPage() {
  const TODAY = 11;
  const INIT_MONTH = 6; // juillet
  const INIT_YEAR  = 2025;

  const [year, setYear]     = useState(INIT_YEAR);
  const [month, setMonth]   = useState(INIT_MONTH);
  const [view, setView]     = useState<ViewMode>("mois");
  const [selectedDay, setSelectedDay] = useState<number>(TODAY);

  function prevMonth() {
    if (month === 0) { setMonth(11); setYear((y) => y - 1); }
    else setMonth((m) => m - 1);
  }
  function nextMonth() {
    if (month === 11) { setMonth(0); setYear((y) => y + 1); }
    else setMonth((m) => m + 1);
  }
  function goToday() { setYear(INIT_YEAR); setMonth(INIT_MONTH); setSelectedDay(TODAY); }

  const daysInMonth  = getDaysInMonth(year, month);
  const firstWeekday = getFirstWeekday(year, month);
  const daysInPrev   = getDaysInMonth(year, month === 0 ? 11 : month - 1);
  const totalCells   = Math.ceil((firstWeekday + daysInMonth) / 7) * 7;

  const cells: { day: number; current: boolean }[] = [];
  for (let i = 0; i < totalCells; i++) {
    if (i < firstWeekday) {
      cells.push({ day: daysInPrev - firstWeekday + i + 1, current: false });
    } else if (i < firstWeekday + daysInMonth) {
      cells.push({ day: i - firstWeekday + 1, current: true });
    } else {
      cells.push({ day: i - firstWeekday - daysInMonth + 1, current: false });
    }
  }

  const MONTH_NAMES = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"];

  const isCurrentMonth = month === INIT_MONTH && year === INIT_YEAR;

  function dayEvents(day: number): CalEvent[] {
    if (!isCurrentMonth) return [];
    return JULY_EVENTS[day] ?? [];
  }

  const sidebarTitle = `${String(selectedDay).padStart(2,"0")} ${MONTH_NAMES[month]} ${year}`;

  /* Liste view : tous les événements du mois */
  const allMonthEvents: { day: number; events: CalEvent[] }[] = isCurrentMonth
    ? Object.entries(JULY_EVENTS)
        .map(([d, evs]) => ({ day: Number(d), events: evs }))
        .sort((a, b) => a.day - b.day)
    : [];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Topbar title="Calendrier Agricole" breadcrumb={["IA & Données", "Calendrier"]} />

      <main className="flex-1 p-6 space-y-4">
        {/* ── Header navigation ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-wrap items-center justify-between gap-3">
          {/* Month nav */}
          <div className="flex items-center gap-2">
            <button
              onClick={prevMonth}
              className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <ChevronLeft size={16} />
            </button>
            <h2 className="text-base font-semibold text-gray-900 min-w-[160px] text-center">
              {MONTH_NAMES[month]} {year}
            </h2>
            <button
              onClick={nextMonth}
              className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <ChevronRight size={16} />
            </button>
            <button
              onClick={goToday}
              className="ml-2 px-3 py-1.5 text-xs font-medium rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Aujourd&apos;hui
            </button>
          </div>

          {/* Vue switcher */}
          <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1">
            {(["mois", "semaine", "liste"] as ViewMode[]).map((v) => (
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
        </div>

        {/* ── Main content ── */}
        <div className="flex gap-4 items-start">
          {/* Calendar grid + list */}
          <div className="flex-1 min-w-0 space-y-4">

            {/* ── Vue Mois ── */}
            {view === "mois" && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                {/* Weekday headers */}
                <div className="grid grid-cols-7 border-b border-gray-100">
                  {WEEKDAYS.map((d) => (
                    <div key={d} className="py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      {d}
                    </div>
                  ))}
                </div>
                {/* Day cells */}
                <div className="grid grid-cols-7">
                  {cells.map((cell, idx) => {
                    const evs    = cell.current ? dayEvents(cell.day) : [];
                    const isToday = cell.current && cell.day === TODAY && isCurrentMonth;
                    const isSel   = cell.current && cell.day === selectedDay;
                    return (
                      <div
                        key={idx}
                        onClick={() => { if (cell.current) setSelectedDay(cell.day); }}
                        className={`
                          border-b border-r border-gray-50 p-2 min-h-[96px] cursor-pointer transition-colors
                          ${cell.current ? "hover:bg-gray-50" : "bg-gray-50/50"}
                          ${isToday ? "bg-[#E8F5E9]" : ""}
                          ${isSel && !isToday ? "bg-green-50/60" : ""}
                        `}
                      >
                        <div className={`
                          text-sm font-semibold w-7 h-7 flex items-center justify-center rounded-full mb-1
                          ${isToday ? "bg-[#2E7D32] text-white" : ""}
                          ${!cell.current ? "text-gray-300" : !isToday ? "text-gray-800" : ""}
                        `}>
                          {cell.day}
                          {isToday && (
                            <span className="sr-only">Aujourd&apos;hui</span>
                          )}
                        </div>
                        <div className="space-y-0.5">
                          {evs.slice(0, 3).map((ev, ei) => (
                            <div
                              key={ei}
                              className={`text-[10px] font-medium px-1.5 py-0.5 rounded-md truncate ${CHIP_STYLES[ev.color]} ${ev.urgent ? "ring-1 ring-red-400" : ""}`}
                              title={ev.label}
                            >
                              {ev.label}
                            </div>
                          ))}
                          {evs.length > 3 && (
                            <div className="text-[10px] text-gray-400 pl-1">+{evs.length - 3} autres</div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ── Vue Semaine ── */}
            {view === "semaine" && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <p className="text-sm text-gray-500 mb-4">
                  Semaine du <strong>{selectedDay > 6 ? selectedDay - 6 : 1}/{month + 1}/{year}</strong>
                </p>
                <div className="grid grid-cols-7 gap-2">
                  {WEEKDAYS.map((wd, i) => {
                    const baseDay = selectedDay - ((selectedDay - 1) % 7);
                    const dayNum  = baseDay + i;
                    const evs     = isCurrentMonth && dayNum <= daysInMonth ? (JULY_EVENTS[dayNum] ?? []) : [];
                    const isT     = dayNum === TODAY && isCurrentMonth;
                    return (
                      <div key={wd} className="flex flex-col gap-1">
                        <div className={`text-xs font-semibold text-center py-1.5 border-b border-gray-100 ${isT ? "text-[#2E7D32]" : "text-gray-500"}`}>
                          {wd} <span className={`ml-0.5 ${isT ? "bg-[#2E7D32] text-white rounded-full px-1" : ""}`}>{dayNum <= daysInMonth ? dayNum : ""}</span>
                        </div>
                        <div className="space-y-1 min-h-[180px]">
                          {evs.map((ev, ei) => (
                            <div key={ei} className={`text-[10px] p-1.5 rounded-lg font-medium ${CHIP_STYLES[ev.color]}`}>
                              {ev.label}
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ── Vue Liste ── */}
            {view === "liste" && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-100">
                  <h3 className="font-semibold text-gray-800 text-sm">
                    Événements — {MONTH_NAMES[month]} {year}
                  </h3>
                </div>
                {allMonthEvents.length === 0 ? (
                  <p className="p-8 text-center text-gray-400 text-sm">Aucun événement ce mois-ci.</p>
                ) : (
                  <div className="divide-y divide-gray-50">
                    {allMonthEvents.map(({ day, events }) => (
                      <div key={day} className="flex items-start gap-4 px-5 py-3 hover:bg-gray-50 transition-colors">
                        <div className="w-14 shrink-0 text-sm font-bold text-gray-700">
                          {String(day).padStart(2, "0")}/{String(month + 1).padStart(2, "0")}
                        </div>
                        <div className="flex-1 flex flex-wrap gap-1.5">
                          {events.map((ev, ei) => (
                            <span key={ei} className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${CHIP_STYLES[ev.color]}`}>
                              {ev.label}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ── Tableau saisonnier ── */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100">
                <h3 className="font-semibold text-gray-800 text-sm">Calendrier agricole saisonnier 2025</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm min-w-[700px]">
                  <thead>
                    <tr className="bg-[#F8FBF8] text-xs font-semibold text-gray-600">
                      <th className="px-4 py-2.5 text-left">Mois</th>
                      <th className="px-4 py-2.5 text-left">Cacao</th>
                      <th className="px-4 py-2.5 text-left">Anacarde</th>
                      <th className="px-4 py-2.5 text-left">Maïs</th>
                      <th className="px-4 py-2.5 text-right">Pluie est.</th>
                      <th className="px-4 py-2.5 text-left">Activité principale</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {SEASON_ROWS.map((r) => (
                      <tr
                        key={r.mois}
                        className={`hover:bg-gray-50 transition-colors ${r.current ? "bg-[#E8F5E9] font-semibold" : ""}`}
                      >
                        <td className="px-4 py-2.5 font-medium text-gray-800">
                          {r.mois}
                          {r.current && (
                            <span className="ml-2 text-[10px] font-bold text-[#2E7D32] bg-[#C8E6C9] px-2 py-0.5 rounded-full">
                              ACTUEL
                            </span>
                          )}
                        </td>
                        <td className={`px-4 py-2.5 ${r.cacao.includes("principale") ? "text-[#2E7D32] font-semibold" : "text-gray-600"}`}>
                          {r.cacao}
                        </td>
                        <td className="px-4 py-2.5 text-gray-600">{r.anacarde}</td>
                        <td className="px-4 py-2.5 text-gray-600">{r.mais}</td>
                        <td className="px-4 py-2.5 text-right text-blue-600 font-medium">{r.pluie}</td>
                        <td className={`px-4 py-2.5 ${r.activite.startsWith("★") ? "text-[#2E7D32] font-bold" : "text-gray-600"}`}>
                          {r.activite}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* ── Panneau latéral ── */}
          <div className="w-72 shrink-0 space-y-3">
            {/* Détail jour */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100 bg-[#2E7D32]/5">
                <h3 className="text-sm font-semibold text-[#2E7D32]">
                  Événements du {sidebarTitle}
                </h3>
                {selectedDay === TODAY && isCurrentMonth && (
                  <span className="text-[10px] font-bold text-[#2E7D32] bg-[#C8E6C9] px-2 py-0.5 rounded-full mt-1 inline-block">
                    Aujourd&apos;hui
                  </span>
                )}
              </div>
              <div className="p-3 space-y-2">
                {(selectedDay === TODAY && isCurrentMonth ? SIDEBAR_EVENTS : []).length === 0 && selectedDay !== TODAY && (
                  <p className="text-center text-gray-400 text-xs py-6">
                    Cliquez sur un jour pour voir le détail.
                  </p>
                )}
                {selectedDay === TODAY && isCurrentMonth
                  ? SIDEBAR_EVENTS.map((item, i) => (
                      <div key={i} className={`flex items-start gap-3 p-2.5 rounded-xl ${item.urgent ? "bg-red-50 border border-red-100" : "bg-gray-50"}`}>
                        <span className={`text-xs font-bold mt-0.5 w-10 shrink-0 ${item.urgent ? "text-red-600" : "text-gray-500"}`}>
                          {item.time}
                        </span>
                        <span className={`text-xs font-medium leading-snug ${item.urgent ? "text-red-800" : "text-gray-700"}`}>
                          {item.urgent && <span className="mr-1 text-red-500 font-bold">URGENT</span>}
                          {item.label}
                        </span>
                      </div>
                    ))
                  : isCurrentMonth && (JULY_EVENTS[selectedDay] ?? []).map((ev, i) => (
                      <div key={i} className={`flex items-center gap-2 p-2 rounded-xl ${CHIP_STYLES[ev.color]}`}>
                        <span className="text-xs font-medium">{ev.label}</span>
                      </div>
                    ))
                }
              </div>
            </div>

            {/* Mini stats */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Ce mois</h4>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-green-50 rounded-xl p-3 text-center">
                  <div className="text-xl font-bold text-[#2E7D32]">
                    {Object.values(JULY_EVENTS).flat().length}
                  </div>
                  <div className="text-[10px] text-gray-500">Événements</div>
                </div>
                <div className="bg-red-50 rounded-xl p-3 text-center">
                  <div className="text-xl font-bold text-red-700">
                    {Object.values(JULY_EVENTS).flat().filter((e) => e.urgent).length}
                  </div>
                  <div className="text-[10px] text-gray-500">Urgents</div>
                </div>
                <div className="bg-blue-50 rounded-xl p-3 text-center">
                  <div className="text-xl font-bold text-blue-700">
                    {Object.values(JULY_EVENTS).flat().filter((e) => e.color === "blue").length}
                  </div>
                  <div className="text-[10px] text-gray-500">Livraisons</div>
                </div>
                <div className="bg-violet-50 rounded-xl p-3 text-center">
                  <div className="text-xl font-bold text-violet-700">
                    {Object.values(JULY_EVENTS).flat().filter((e) => e.color === "violet").length}
                  </div>
                  <div className="text-[10px] text-gray-500">Réunions</div>
                </div>
              </div>
            </div>

            {/* Légende */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Légende</h4>
              <div className="space-y-1.5">
                {([
                  ["green",  "Production / cultures"],
                  ["blue",   "Logistique / finance"],
                  ["violet", "RH / réunions"],
                  ["orange", "Direction"],
                  ["red",    "Urgent / alertes"],
                  ["gray",   "Météo"],
                ] as [ChipColor, string][]).map(([c, lbl]) => (
                  <div key={c} className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full shrink-0 ${CHIP_STYLES[c].split(" ")[0].replace("bg-", "bg-").replace("100","400")}`} />
                    <span className="text-xs text-gray-600">{lbl}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
