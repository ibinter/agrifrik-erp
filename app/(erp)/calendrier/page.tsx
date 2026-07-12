"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Calendar, AlertTriangle, ClipboardList, Leaf } from "lucide-react";
import Topbar from "../../components/Topbar";

/* ─── Types ─────────────────────────────────────────────────────────────────── */
type ViewMode = "mois" | "semaine" | "agenda";
type ChipColor = "green" | "blue" | "violet" | "orange" | "red" | "gray";

interface CalEvent {
  label: string;
  color: ChipColor;
  urgent?: boolean;
}

interface AgendaItem {
  date: string;
  heure: string;
  label: string;
  priorite: "rouge" | "orange" | "vert" | "bleu" | "gris";
  responsable: string;
}

interface UpcomingEvent {
  date: string;
  label: string;
  type: string;
  statut: string;
  statutColor: string;
  statutBg: string;
}

/* ─── Constantes ─────────────────────────────────────────────────────────────── */
const WEEKDAYS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
const MONTH_NAMES = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"];

const CHIP_STYLES: Record<ChipColor, string> = {
  green:  "bg-green-100 text-green-800",
  blue:   "bg-blue-100 text-blue-800",
  violet: "bg-violet-100 text-violet-800",
  orange: "bg-orange-100 text-orange-800",
  red:    "bg-red-100 text-red-800",
  gray:   "bg-gray-100 text-gray-600",
};

/* ─── Données juillet 2025 ─────────────────────────────────────────────────── */
const JULY_EVENTS: Record<number, CalEvent[]> = {
  1:  [{ label: "LOT-046 finalisé", color: "green" }],
  2:  [{ label: "Traitement PAR-A1 (Cupravit + Confidor)", color: "orange" }],
  5:  [{ label: "Rapport terrain RT-027", color: "blue" }],
  7:  [{ label: "Rapport terrain RT-028", color: "blue" }],
  8:  [{ label: "Règlement BC MVT-0921", color: "blue" }],
  10: [{ label: "DEV-2025-003 envoyé OLAM", color: "violet" }],
  11: [
    { label: "Cut test LOT-047 DÛ", color: "red", urgent: true },
    { label: "Stock KCl critique", color: "red", urgent: true },
  ],
  14: [{ label: "Rapport terrain RT-029", color: "blue" }],
  15: [
    { label: "Traitement PAR-A1 PCT-034", color: "orange" },
    { label: "Réunion mi-stage Kofi", color: "violet" },
  ],
  16: [{ label: "Pluie prévue — pas traitement PAR-A2", color: "gray" }],
  18: [{ label: "Fertilisation KCl PAR-B1 PCT-036", color: "orange" }],
  21: [{ label: "Rapport terrain RT-030", color: "blue" }],
  22: [{ label: "Devis DEV-003 — relance OLAM", color: "violet" }],
  25: [{ label: "Livraison IMP-2025-003 (Netafim)", color: "blue" }],
  28: [{ label: "Congé Koffi Amani (départ)", color: "gray" }],
  31: [{ label: "Rapport mensuel auto (envoi 06h)", color: "blue" }],
};

/* ─── Agenda de la semaine (11-17 juillet) ─────────────────────────────────── */
const AGENDA_SEMAINE: AgendaItem[] = [
  { date: "Ven 11", heure: "Toute la journée", label: "Cut test LOT-2025-047 (URGENT)", priorite: "rouge", responsable: "Ibrahim S." },
  { date: "Ven 11", heure: "09h00", label: "Commander Super KCl (manque stock)", priorite: "rouge", responsable: "Koffi A." },
  { date: "Ven 11", heure: "14h00", label: "Réunion mi-stage Kofi Mensah", priorite: "orange", responsable: "Koffi A. + Ibrahim" },
  { date: "Sam 12", heure: "08h00", label: "Livraison Super Cupravit — SCPA Afrique", priorite: "vert", responsable: "Ibrahim S." },
  { date: "Dim 13", heure: "—", label: "Repos", priorite: "gris", responsable: "Toute l'équipe" },
  { date: "Lun 14", heure: "07h00", label: "Comptage cabosses PAR-A2 (rapport floraison)", priorite: "vert", responsable: "Ibrahim S." },
  { date: "Lun 14", heure: "08h00", label: "Rapport terrain RT-029", priorite: "bleu", responsable: "Ibrahim S." },
  { date: "Mar 15", heure: "07h00", label: "Traitement phyto PAR-A1 (PCT-2025-034)", priorite: "orange", responsable: "Ibrahim S." },
  { date: "Mer 16", heure: "—", label: "Pluie 18mm — Pas de traitement extérieur", priorite: "rouge", responsable: "Météo auto" },
  { date: "Mer 16", heure: "—", label: "Rentrer claies séchage (si LOT-048 en cours)", priorite: "orange", responsable: "Ibrahim S." },
  { date: "Jeu 17", heure: "—", label: "Pluie 22mm — Pas de traitement extérieur", priorite: "rouge", responsable: "Météo auto" },
];

/* ─── Événements à venir ───────────────────────────────────────────────────── */
const UPCOMING_EVENTS: UpcomingEvent[] = [
  { date: "15/07", label: "Traitement PAR-A1 (PCT-034)", type: "Culturel", statut: "Planifié", statutColor: "#E65100", statutBg: "#FFF3E0" },
  { date: "18/07", label: "Fertilisation KCl PAR-B1", type: "Culturel", statut: "Planifié", statutColor: "#E65100", statutBg: "#FFF3E0" },
  { date: "20/07", label: "Enlèvement import Netafim au port", type: "Logistique", statut: "À confirmer", statutColor: "#757575", statutBg: "#F5F5F5" },
  { date: "25/07", label: "Livraison irrigation Netafim EXP-001", type: "Logistique", statut: "Prévu", statutColor: "#757575", statutBg: "#F5F5F5" },
  { date: "28/07", label: "Congé DG (28/07 → 08/08)", type: "RH", statut: "Planifié", statutColor: "#2E7D32", statutBg: "#E8F5E9" },
  { date: "30/07", label: "Révision tracteur JD5055E (3000h)", type: "Matériels", statut: "À programmer", statutColor: "#E65100", statutBg: "#FFF3E0" },
  { date: "31/07", label: "Rapport mensuel automatique (juillet)", type: "Rapports", statut: "Auto", statutColor: "#2E7D32", statutBg: "#E8F5E9" },
  { date: "05/08", label: "Traitement préventif PAR-A1 (21j cycle)", type: "Culturel", statut: "Prévu", statutColor: "#757575", statutBg: "#F5F5F5" },
  { date: "09/08", label: "Expiration devis DEV-2025-003 (OLAM)", type: "Commerce", statut: "Deadline", statutColor: "#C62828", statutBg: "#FFEBEE" },
  { date: "Août", label: "Audit RA pré-renouvellement (à programmer)", type: "Certifications", statut: "À confirmer", statutColor: "#757575", statutBg: "#F5F5F5" },
];

/* ─── Tableau saisonnier ───────────────────────────────────────────────────── */
const SEASON_ROWS = [
  { mois: "Janvier",   cacao: "Taille",                  anacarde: "Export",   mais: "—",             pluie: "40mm",  activite: "Entretien", current: false },
  { mois: "Février",   cacao: "Floraison",               anacarde: "—",        mais: "—",             pluie: "60mm",  activite: "Traitement préventif", current: false },
  { mois: "Mars",      cacao: "—",                       anacarde: "Récolte",  mais: "Semis",         pluie: "120mm", activite: "Récolte anacarde", current: false },
  { mois: "Avril",     cacao: "Récolte intermédiaire",   anacarde: "Export",   mais: "—",             pluie: "150mm", activite: "Récolte cacao intermédiaire", current: false },
  { mois: "Mai",       cacao: "—",                       anacarde: "Export",   mais: "—",             pluie: "180mm", activite: "Fertilisation N", current: false },
  { mois: "Juin",      cacao: "Surveillance",            anacarde: "—",        mais: "Récolte",       pluie: "256mm", activite: "Contrôles", current: false },
  { mois: "Juillet",   cacao: "Entretien",               anacarde: "—",        mais: "Semis cycle 2", pluie: "280mm", activite: "Traitement, entretien", current: true },
  { mois: "Août",      cacao: "—",                       anacarde: "—",        mais: "—",             pluie: "240mm", activite: "Entretien, séchage", current: false },
  { mois: "Septembre", cacao: "—",                       anacarde: "—",        mais: "Récolte",       pluie: "180mm", activite: "Préparer récolte principale", current: false },
  { mois: "Octobre",   cacao: "Récolte principale",      anacarde: "—",        mais: "—",             pluie: "120mm", activite: "★ RÉCOLTE", current: false },
  { mois: "Novembre",  cacao: "Récolte principale",      anacarde: "—",        mais: "—",             pluie: "80mm",  activite: "★ RÉCOLTE + Export", current: false },
  { mois: "Décembre",  cacao: "Post-récolte",            anacarde: "—",        mais: "—",             pluie: "40mm",  activite: "Export, bilan annuel", current: false },
];

/* ─── Helpers ─────────────────────────────────────────────────────────────── */
function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstWeekday(year: number, month: number) {
  const jsDay = new Date(year, month, 1).getDay();
  return jsDay === 0 ? 6 : jsDay - 1;
}

const PRIORITE_STYLE: Record<AgendaItem["priorite"], { dot: string; bg: string; text: string }> = {
  rouge:  { dot: "bg-red-500",    bg: "bg-red-50 border-red-100",    text: "text-red-800" },
  orange: { dot: "bg-orange-400", bg: "bg-orange-50 border-orange-100", text: "text-orange-800" },
  vert:   { dot: "bg-green-500",  bg: "bg-green-50 border-green-100", text: "text-green-800" },
  bleu:   { dot: "bg-blue-500",   bg: "bg-blue-50 border-blue-100",  text: "text-blue-800" },
  gris:   { dot: "bg-gray-400",   bg: "bg-gray-50 border-gray-100",  text: "text-gray-600" },
};

/* ─── Composant principal ─────────────────────────────────────────────────── */
export default function CalendrierPage() {
  const TODAY = 11;
  const INIT_MONTH = 6; // juillet
  const INIT_YEAR = 2025;

  const [year, setYear]   = useState(INIT_YEAR);
  const [month, setMonth] = useState(INIT_MONTH);
  const [view, setView]   = useState<ViewMode>("mois");
  const [selectedDay, setSelectedDay] = useState<number>(TODAY);

  function prevMonth() {
    if (month === 0) { setMonth(11); setYear((y) => y - 1); }
    else setMonth((m) => m - 1);
  }
  function nextMonth() {
    if (month === 11) { setMonth(0); setYear((y) => y + 1); }
    else setMonth((m) => m + 1);
  }

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

  const isCurrentMonth = month === INIT_MONTH && year === INIT_YEAR;

  function dayEvents(day: number): CalEvent[] {
    if (!isCurrentMonth) return [];
    return JULY_EVENTS[day] ?? [];
  }

  const totalEvents = Object.values(JULY_EVENTS).flat().length;
  const urgentCount = Object.values(JULY_EVENTS).flat().filter((e) => e.urgent).length;

  /* Vue agenda : tous les events du mois triés */
  const allMonthEvents = isCurrentMonth
    ? Object.entries(JULY_EVENTS)
        .map(([d, evs]) => ({ day: Number(d), events: evs }))
        .sort((a, b) => a.day - b.day)
    : [];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Topbar title="Calendrier Agricole" breadcrumb={["IA & Données", "Calendrier"]} />

      <main className="flex-1 p-6 space-y-5">

        {/* ── En-tête titre + sous-titre ── */}
        <div>
          <h1 className="text-xl font-bold text-gray-900">Calendrier Agricole</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Planning intégré — Tâches culturales, récoltes, audits et événements
          </p>
        </div>

        {/* ── KPI row ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { icon: Calendar,       label: "Événements ce mois", value: totalEvents, color: "#2E7D32", bg: "#E8F5E9" },
            { icon: AlertTriangle,  label: "Tâches urgentes",    value: 3,           color: "#C62828", bg: "#FFEBEE" },
            { icon: ClipboardList,  label: "Audits planifiés",   value: 2,           color: "#1565C0", bg: "#E3F2FD" },
            { icon: Leaf,           label: "Récolte en cours",   value: 1,           color: "#E65100", bg: "#FFF3E0" },
          ].map(({ icon: Icon, label, value, color, bg }) => (
            <div key={label} className="rounded-2xl border border-gray-100 bg-white p-4 flex items-center gap-3">
              <div className="rounded-xl p-2.5 shrink-0" style={{ background: bg }}>
                <Icon size={18} style={{ color }} />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{value}</div>
                <div className="text-xs text-gray-500">{label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Navigation + vues ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-wrap items-center justify-between gap-3">
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
          </div>
          <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1">
            {(["mois", "semaine", "agenda"] as ViewMode[]).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium capitalize transition-colors ${
                  view === v ? "bg-[#2E7D32] text-white shadow-sm" : "text-gray-600 hover:bg-gray-200"
                }`}
              >
                {v.charAt(0).toUpperCase() + v.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* ══════════ VUE MOIS ══════════ */}
        {view === "mois" && (
          <div className="space-y-5">

            {/* Grille calendrier */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              {/* En-têtes colonnes */}
              <div className="grid grid-cols-7 border-b border-gray-100">
                {WEEKDAYS.map((d) => (
                  <div key={d} className="py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    {d}
                  </div>
                ))}
              </div>
              {/* Cases jours */}
              <div className="grid grid-cols-7">
                {cells.map((cell, idx) => {
                  const evs    = cell.current ? dayEvents(cell.day) : [];
                  const isToday = cell.current && cell.day === TODAY && isCurrentMonth;
                  const isSel   = cell.current && cell.day === selectedDay;
                  return (
                    <div
                      key={idx}
                      onClick={() => { if (cell.current) setSelectedDay(cell.day); }}
                      className={[
                        "border-b border-r border-gray-50 p-2 min-h-[100px] cursor-pointer transition-colors",
                        cell.current ? "hover:bg-gray-50" : "bg-gray-50/50",
                        isToday ? "bg-[#E8F5E9] ring-2 ring-inset ring-[#2E7D32]" : "",
                        isSel && !isToday ? "bg-green-50/60" : "",
                      ].join(" ")}
                    >
                      <div className={[
                        "text-sm font-semibold w-7 h-7 flex items-center justify-center rounded-full mb-1",
                        isToday ? "bg-[#2E7D32] text-white" : "",
                        !cell.current ? "text-gray-300" : !isToday ? "text-gray-800" : "",
                      ].join(" ")}>
                        {cell.day}
                      </div>
                      <div className="space-y-0.5">
                        {evs.slice(0, 2).map((ev, ei) => (
                          <div
                            key={ei}
                            className={`text-[10px] font-medium px-1.5 py-0.5 rounded-md truncate ${CHIP_STYLES[ev.color]} ${ev.urgent ? "ring-1 ring-red-400" : ""}`}
                            title={ev.label}
                          >
                            {ev.label}
                          </div>
                        ))}
                        {evs.length > 2 && (
                          <div className="text-[10px] text-gray-400 pl-1">+{evs.length - 2}</div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Légende */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
              <div className="flex flex-wrap gap-4 text-xs">
                {([
                  ["green",  "Production / cultures"],
                  ["blue",   "Logistique / rapports / finance"],
                  ["violet", "Commerce / réunions"],
                  ["orange", "Traitements phyto"],
                  ["red",    "Urgent / alertes"],
                  ["gray",   "Météo / RH"],
                ] as [ChipColor, string][]).map(([c, lbl]) => (
                  <div key={c} className="flex items-center gap-1.5">
                    <span className={`w-3 h-3 rounded-full shrink-0 ${CHIP_STYLES[c].split(" ")[0]}`} />
                    <span className="text-gray-600">{lbl}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ══════════ VUE SEMAINE ══════════ */}
        {view === "semaine" && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <p className="text-sm text-gray-500 mb-4">
              Semaine du <strong>07 au 13 Juillet 2025</strong>
            </p>
            <div className="grid grid-cols-7 gap-2">
              {[
                { wd: "Lun", day: 7 },
                { wd: "Mar", day: 8 },
                { wd: "Mer", day: 9 },
                { wd: "Jeu", day: 10 },
                { wd: "Ven", day: 11 },
                { wd: "Sam", day: 12 },
                { wd: "Dim", day: 13 },
              ].map(({ wd, day }) => {
                const evs  = isCurrentMonth ? (JULY_EVENTS[day] ?? []) : [];
                const isT  = day === TODAY && isCurrentMonth;
                return (
                  <div key={wd} className="flex flex-col gap-1">
                    <div className={`text-xs font-semibold text-center py-1.5 border-b border-gray-100 ${isT ? "text-[#2E7D32]" : "text-gray-500"}`}>
                      {wd} <span className={isT ? "bg-[#2E7D32] text-white rounded-full px-1 ml-0.5" : ""}>{day}</span>
                    </div>
                    <div className="space-y-1 min-h-[140px] pt-1">
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

        {/* ══════════ VUE AGENDA ══════════ */}
        {view === "agenda" && (
          <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100">
              <h3 className="font-semibold text-gray-800 text-sm">Agenda — {MONTH_NAMES[month]} {year}</h3>
            </div>
            {allMonthEvents.length === 0 ? (
              <p className="p-8 text-center text-gray-400 text-sm">Aucun événement ce mois-ci.</p>
            ) : (
              <div className="divide-y divide-gray-50">
                {allMonthEvents.map(({ day, events }) => {
                  const isT = day === TODAY && isCurrentMonth;
                  return (
                    <div key={day} className={`flex items-start gap-4 px-5 py-3 ${isT ? "bg-[#E8F5E9]" : "hover:bg-gray-50"} transition-colors`}>
                      <div className={`w-16 shrink-0 text-sm font-bold ${isT ? "text-[#2E7D32]" : "text-gray-700"}`}>
                        {String(day).padStart(2, "0")}/{String(month + 1).padStart(2, "0")}
                        {isT && <span className="block text-[10px] font-bold text-[#2E7D32]">Aujourd&apos;hui</span>}
                      </div>
                      <div className="flex-1 flex flex-wrap gap-1.5">
                        {events.map((ev, ei) => (
                          <span key={ei} className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${CHIP_STYLES[ev.color]} ${ev.urgent ? "ring-1 ring-red-400" : ""}`}>
                            {ev.label}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ══════════ AGENDA DE LA SEMAINE (11-17 juillet) ══════════ */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-semibold text-gray-800 text-sm">Agenda de la semaine (11–17 juillet)</h3>
            <span className="text-xs px-2.5 py-1 rounded-full bg-[#E8F5E9] text-[#2E7D32] font-medium">Semaine en cours</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs min-w-[640px]">
              <thead>
                <tr className="bg-[#F8FBF8]">
                  <th className="px-4 py-2.5 text-left font-semibold text-gray-500">Date</th>
                  <th className="px-4 py-2.5 text-left font-semibold text-gray-500">Heure</th>
                  <th className="px-4 py-2.5 text-left font-semibold text-gray-500">Événement</th>
                  <th className="px-4 py-2.5 text-left font-semibold text-gray-500">Priorité</th>
                  <th className="px-4 py-2.5 text-left font-semibold text-gray-500">Responsable</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {AGENDA_SEMAINE.map((item, i) => {
                  const s = PRIORITE_STYLE[item.priorite];
                  return (
                    <tr key={i} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-2.5 font-semibold text-gray-800 whitespace-nowrap">{item.date}</td>
                      <td className="px-4 py-2.5 text-gray-500 whitespace-nowrap">{item.heure}</td>
                      <td className="px-4 py-2.5 text-gray-700">{item.label}</td>
                      <td className="px-4 py-2.5 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border font-medium ${s.bg} ${s.text}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                          {item.priorite.charAt(0).toUpperCase() + item.priorite.slice(1)}
                        </span>
                      </td>
                      <td className="px-4 py-2.5 text-gray-600 whitespace-nowrap">{item.responsable}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* ══════════ ÉVÉNEMENTS À VENIR (30 jours) ══════════ */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100">
            <h3 className="font-semibold text-gray-800 text-sm">Événements à venir — 30 prochains jours</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs min-w-[600px]">
              <thead>
                <tr className="bg-[#F8FBF8]">
                  <th className="px-4 py-2.5 text-left font-semibold text-gray-500">Date</th>
                  <th className="px-4 py-2.5 text-left font-semibold text-gray-500">Événement</th>
                  <th className="px-4 py-2.5 text-left font-semibold text-gray-500">Type</th>
                  <th className="px-4 py-2.5 text-left font-semibold text-gray-500">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {UPCOMING_EVENTS.map((ev, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-2.5 font-semibold text-gray-800 whitespace-nowrap">{ev.date}</td>
                    <td className="px-4 py-2.5 text-gray-700">{ev.label}</td>
                    <td className="px-4 py-2.5 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 font-medium">{ev.type}</span>
                    </td>
                    <td className="px-4 py-2.5 whitespace-nowrap">
                      <span
                        className="px-2.5 py-0.5 rounded-full text-xs font-semibold"
                        style={{ background: ev.statutBg, color: ev.statutColor }}
                      >
                        {ev.statut}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ══════════ CALENDRIER SAISONNIER ══════════ */}
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
                    <td className={`px-4 py-2.5 ${r.cacao.includes("principale") ? "text-[#2E7D32] font-semibold" : "text-gray-600"}`}>{r.cacao}</td>
                    <td className="px-4 py-2.5 text-gray-600">{r.anacarde}</td>
                    <td className="px-4 py-2.5 text-gray-600">{r.mais}</td>
                    <td className="px-4 py-2.5 text-right text-blue-600 font-medium">{r.pluie}</td>
                    <td className={`px-4 py-2.5 ${r.activite.startsWith("★") ? "text-[#2E7D32] font-bold" : "text-gray-600"}`}>{r.activite}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </main>
    </div>
  );
}
