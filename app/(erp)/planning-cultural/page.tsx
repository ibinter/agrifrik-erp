"use client";

import { useState } from "react";
import Topbar from "../../components/Topbar";
import {
  Calendar,
  CheckCircle2,
  Circle,
  AlertTriangle,
  XCircle,
  Plus,
  Tractor,
  Clock,
} from "lucide-react";

const TABS = ["Gantt", "Calendrier", "Opérations", "Prévisions"] as const;
type Tab = (typeof TABS)[number];

const MONTHS = ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Aoû", "Sep", "Oct", "Nov", "Déc"];

// Today = 11/07/2025 ≈ 53% of year
const TODAY_PCT = 53;

// ─── Gantt data ───────────────────────────────────────────────────────────────

type BarStatus = "done" | "ongoing" | "planned" | "urgent" | "star";
interface GanttBar {
  start: number; // 0-based month
  end: number;
  label: string;
  status: BarStatus;
}
interface GanttRow {
  group?: string;
  culture: string;
  bars: GanttBar[];
}

const BAR_COLORS: Record<BarStatus, { bg: string; text: string }> = {
  done:    { bg: "#22c55e", text: "#fff" },
  ongoing: { bg: "#f97316", text: "#fff" },
  planned: { bg: "#3b82f6", text: "#fff" },
  urgent:  { bg: "#ef4444", text: "#fff" },
  star:    { bg: "#7c3aed", text: "#fff" },
};

const GANTT_ROWS: GanttRow[] = [
  // Cacao
  { group: "Cacao (toutes parcelles)", culture: "Taille d'entretien", bars: [
    { start: 0, end: 1, label: "Taille ✅", status: "done" },
    { start: 6, end: 6, label: "En cours", status: "ongoing" },
  ]},
  { culture: "Fertilisation N (NPK)", bars: [
    { start: 1, end: 1, label: "Épandage ✅", status: "done" },
    { start: 6, end: 6, label: "Planifié", status: "planned" },
  ]},
  { culture: "Fertilisation K (KCl)", bars: [
    { start: 2, end: 2, label: "✅", status: "done" },
    { start: 6, end: 6, label: "⏰ URGENT", status: "urgent" },
  ]},
  { culture: "Traitement mildiou", bars: [
    { start: 2, end: 2, label: "✅", status: "done" },
    { start: 6, end: 6, label: "⏰ URGENT", status: "urgent" },
    { start: 9, end: 9, label: "Planifié", status: "planned" },
    { start: 10, end: 10, label: "Planifié", status: "planned" },
  ]},
  { culture: "Traitement capsule", bars: [
    { start: 3, end: 3, label: "✅", status: "done" },
    { start: 8, end: 8, label: "Planifié", status: "planned" },
    { start: 9, end: 9, label: "Planifié", status: "planned" },
  ]},
  { culture: "Surveillance floraison", bars: [
    { start: 4, end: 5, label: "✅ Terminé", status: "done" },
  ]},
  { culture: "Récolte intermédiaire", bars: [
    { start: 3, end: 3, label: "✅", status: "done" },
  ]},
  { culture: "Récolte principale ★", bars: [
    { start: 9, end: 10, label: "Récolte ★", status: "star" },
  ]},
  // Anacarde
  { group: "Anacarde (PAR-C1, C2, E1)", culture: "Taille formation", bars: [
    { start: 0, end: 1, label: "✅", status: "done" },
  ]},
  { culture: "Récolte anacarde", bars: [
    { start: 2, end: 4, label: "✅ Terminé", status: "done" },
  ]},
  { culture: "Conditionnement", bars: [
    { start: 3, end: 4, label: "✅", status: "done" },
  ]},
  // Vivrières
  { group: "Vivrières (PAR-D1, E2)", culture: "Maïs C1 — Semis", bars: [
    { start: 2, end: 2, label: "✅", status: "done" },
  ]},
  { culture: "Maïs C1 — Récolte", bars: [
    { start: 6, end: 6, label: "Juil", status: "planned" },
  ]},
  { culture: "Maïs C2 — Semis", bars: [
    { start: 6, end: 6, label: "Juil", status: "planned" },
  ]},
  { culture: "Maïs C2 — Récolte", bars: [
    { start: 9, end: 9, label: "Oct", status: "planned" },
  ]},
  { culture: "Riz — Semis", bars: [
    { start: 3, end: 3, label: "Avr", status: "done" },
  ]},
  { culture: "Riz — Récolte", bars: [
    { start: 7, end: 7, label: "Aoû", status: "planned" },
  ]},
];

function GanttChart() {
  const monthW = 100 / 12;
  return (
    <div className="overflow-x-auto">
      <div className="min-w-[780px]">
        {/* Month header */}
        <div className="flex mb-2" style={{ marginLeft: 168 }}>
          {MONTHS.map((m, i) => (
            <div
              key={i}
              className="text-center text-[10px] font-semibold text-gray-400 border-l border-gray-100"
              style={{ width: `${monthW}%`, flexShrink: 0 }}
            >
              {m}
            </div>
          ))}
        </div>

        {/* Rows */}
        <div className="space-y-1">
          {GANTT_ROWS.map((row, ri) => (
            <div key={ri}>
              {row.group && (
                <div className="text-[10px] font-bold text-[#2E7D32] uppercase tracking-wide px-1 pt-2 pb-0.5"
                  style={{ marginLeft: 168 }}>
                  {row.group}
                </div>
              )}
              <div className="flex items-center">
                <div
                  className="text-[11px] text-gray-600 pr-2 text-right flex-shrink-0"
                  style={{ width: 168 }}
                >
                  {row.culture}
                </div>
                <div className="relative flex-1 h-7 rounded bg-gray-50 overflow-hidden">
                  {/* Grid lines */}
                  {MONTHS.map((_, i) => (
                    <div
                      key={i}
                      className="absolute top-0 bottom-0 border-l border-gray-100"
                      style={{ left: `${(i / 12) * 100}%` }}
                    />
                  ))}
                  {/* Today line */}
                  <div
                    className="absolute top-0 bottom-0 w-px bg-red-400 z-20"
                    style={{ left: `${TODAY_PCT}%` }}
                  >
                    <div className="absolute -top-0.5 -translate-x-1/2 w-2 h-2 bg-red-400 rounded-full" />
                  </div>
                  {/* Bars */}
                  {row.bars.map((bar, bi) => {
                    const left = (bar.start / 12) * 100;
                    const width = ((bar.end - bar.start + 1) / 12) * 100;
                    const col = BAR_COLORS[bar.status];
                    return (
                      <div
                        key={bi}
                        className="absolute top-1 bottom-1 rounded flex items-center px-1.5 overflow-hidden z-10"
                        style={{ left: `${left}%`, width: `${width}%`, backgroundColor: col.bg }}
                      >
                        <span className="text-[9px] font-medium truncate" style={{ color: col.text }}>
                          {bar.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-4 flex items-center gap-5 flex-wrap" style={{ marginLeft: 168 }}>
          {([
            { status: "done", label: "Terminé ✅" },
            { status: "ongoing", label: "En cours" },
            { status: "planned", label: "Planifié" },
            { status: "urgent", label: "Urgent ⏰" },
            { status: "star", label: "Récolte principale ★" },
          ] as { status: BarStatus; label: string }[]).map((l) => (
            <div key={l.status} className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded" style={{ backgroundColor: BAR_COLORS[l.status].bg }} />
              <span className="text-[10px] text-gray-500">{l.label}</span>
            </div>
          ))}
          <div className="flex items-center gap-1.5">
            <div className="w-px h-3 bg-red-400" />
            <span className="text-[10px] text-gray-500">Aujourd&apos;hui (11/07)</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Calendar data ─────────────────────────────────────────────────────────

interface CalEvent {
  day: number;
  label: string;
  color: string;
}

const CAL_EVENTS: CalEvent[] = [
  { day: 10, label: "Taille entretien PAR-A1", color: "bg-green-500" },
  { day: 12, label: "Livraison cacao Barry Callebaut", color: "bg-blue-500" },
  { day: 12, label: "⚠️ Pluies fortes (météo)", color: "bg-orange-400" },
  { day: 13, label: "⚠️ Pluies fortes (météo)", color: "bg-orange-400" },
  { day: 14, label: "Sarclage PAR-D2", color: "bg-green-500" },
  { day: 15, label: "Réunion coopérative", color: "bg-purple-500" },
  { day: 20, label: "Épandage K PAR-A3", color: "bg-green-500" },
  { day: 25, label: "Contrôle pépinière PEP-001", color: "bg-blue-500" },
  { day: 31, label: "Date limite négociation PAR-E3/E4", color: "bg-red-500" },
];

function CalendarView() {
  // July 2025: starts on Tuesday (index 1, Mon=0)
  const startOffset = 1;
  const daysInMonth = 31;
  const today = 11;

  const eventsByDay: Record<number, CalEvent[]> = {};
  for (const e of CAL_EVENTS) {
    if (!eventsByDay[e.day]) eventsByDay[e.day] = [];
    eventsByDay[e.day].push(e);
  }

  const cells: (number | null)[] = [
    ...Array(startOffset).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  // pad to full weeks
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <div>
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <h2 className="font-bold text-gray-800 flex items-center gap-2">
          <Calendar size={18} className="text-[#2E7D32]" />
          Juillet 2025
        </h2>
        <div className="flex items-center gap-3 flex-wrap">
          {[
            { color: "bg-green-500", label: "Opération terrain" },
            { color: "bg-blue-500", label: "Livraison / Contrôle" },
            { color: "bg-orange-400", label: "Météo" },
            { color: "bg-purple-500", label: "Réunion" },
            { color: "bg-red-500", label: "Échéance" },
          ].map((l) => (
            <div key={l.label} className="flex items-center gap-1.5 text-xs text-gray-500">
              <div className={`w-2.5 h-2.5 rounded-full ${l.color}`} />
              {l.label}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map((d) => (
          <div key={d} className="text-center text-[11px] font-semibold text-gray-400 py-2">
            {d}
          </div>
        ))}
        {cells.map((day, ci) => {
          if (!day) return <div key={`e-${ci}`} />;
          const events = eventsByDay[day] ?? [];
          const isToday = day === today;
          return (
            <div
              key={day}
              className={`rounded-xl border min-h-[64px] p-1.5 ${
                isToday
                  ? "border-[#2E7D32] bg-green-50"
                  : "border-gray-100 bg-white hover:bg-gray-50"
              }`}
            >
              <span className={`text-[12px] font-bold ${isToday ? "text-[#2E7D32]" : "text-gray-700"}`}>
                {day}
              </span>
              <div className="mt-1 space-y-0.5">
                {events.map((ev, ei) => (
                  <div
                    key={ei}
                    className={`w-full rounded px-1 py-0.5 text-[9px] text-white font-medium truncate ${ev.color}`}
                    title={ev.label}
                  >
                    {ev.label}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Operations data ───────────────────────────────────────────────────────

type OpStatus = "Réalisée" | "Planifiée" | "En retard";

interface Operation {
  operation: string;
  culture: string;
  parcelle: string;
  datePrevue: string;
  dateRealisee: string;
  operateur: string;
  intrants: string;
  cout: string;
  statut: OpStatus;
}

const OPERATIONS: Operation[] = [
  { operation: "Taille d'entretien", culture: "Cacao", parcelle: "PAR-A1", datePrevue: "05/01/2025", dateRealisee: "06/01/2025", operateur: "Ibrahim S.", intrants: "Sécateurs, tronçonneuse", cout: "45 000 XOF", statut: "Réalisée" },
  { operation: "Épandage NPK", culture: "Cacao", parcelle: "PAR-A1, A2", datePrevue: "10/02/2025", dateRealisee: "12/02/2025", operateur: "Konan Y.", intrants: "NPK 10-10-10 (280 kg)", cout: "196 000 XOF", statut: "Réalisée" },
  { operation: "Épandage KCl", culture: "Cacao", parcelle: "Toutes", datePrevue: "05/03/2025", dateRealisee: "07/03/2025", operateur: "Ibrahim S.", intrants: "KCl 60% (320 kg)", cout: "224 000 XOF", statut: "Réalisée" },
  { operation: "Traitement préventif mildiou", culture: "Cacao", parcelle: "PAR-A1, A2, A3", datePrevue: "20/03/2025", dateRealisee: "21/03/2025", operateur: "Bamba O.", intrants: "Mancozèbe 80% (84 kg)", cout: "63 000 XOF", statut: "Réalisée" },
  { operation: "Récolte intermédiaire", culture: "Cacao", parcelle: "PAR-A1, A2", datePrevue: "10/04/2025", dateRealisee: "10/04/2025", operateur: "Konan Y.", intrants: "Machettes, bacs", cout: "120 000 XOF", statut: "Réalisée" },
  { operation: "Surveillance floraison", culture: "Cacao", parcelle: "Toutes", datePrevue: "05/05/2025", dateRealisee: "06/05/2025", operateur: "Ibrahim S.", intrants: "Fiches terrain", cout: "25 000 XOF", statut: "Réalisée" },
  { operation: "Récolte anacarde", culture: "Anacarde", parcelle: "PAR-C1, C2, E1", datePrevue: "01/03/2025", dateRealisee: "28/04/2025", operateur: "Kouassi D.", intrants: "Filets, sacs 50 kg", cout: "380 000 XOF", statut: "Réalisée" },
  { operation: "Conditionnement anacarde", culture: "Anacarde", parcelle: "PAR-C1", datePrevue: "01/04/2025", dateRealisee: "15/05/2025", operateur: "Kouassi D.", intrants: "Sacs export 80 kg", cout: "120 000 XOF", statut: "Réalisée" },
  { operation: "Semis maïs C1", culture: "Maïs", parcelle: "PAR-D1", datePrevue: "01/03/2025", dateRealisee: "03/03/2025", operateur: "Bamba O.", intrants: "Semences maïs hybride (25 kg)", cout: "37 500 XOF", statut: "Réalisée" },
  { operation: "Semis riz", culture: "Riz", parcelle: "PAR-E2", datePrevue: "10/04/2025", dateRealisee: "12/04/2025", operateur: "Bamba O.", intrants: "Semences riz (40 kg)", cout: "40 000 XOF", statut: "Réalisée" },
  { operation: "Épandage urée maïs", culture: "Maïs", parcelle: "PAR-D1", datePrevue: "28/06/2025", dateRealisee: "28/06/2025", operateur: "Ibrahim S.", intrants: "Urée 46% (480 kg)", cout: "192 000 XOF", statut: "Réalisée" },
  { operation: "Taille d'entretien", culture: "Cacao", parcelle: "PAR-A1", datePrevue: "10/07/2025", dateRealisee: "—", operateur: "Ibrahim S.", intrants: "Sécateurs", cout: "30 000 XOF", statut: "Planifiée" },
  { operation: "Épandage K (2e passage)", culture: "Cacao", parcelle: "PAR-A3", datePrevue: "12/07/2025", dateRealisee: "—", operateur: "Konan Y.", intrants: "KCl 60% (171 kg)", cout: "119 700 XOF", statut: "En retard" },
  { operation: "Traitement mildiou (2e)", culture: "Cacao", parcelle: "PAR-A1, A2, A3", datePrevue: "15/07/2025", dateRealisee: "—", operateur: "Bamba O.", intrants: "Mancozèbe (84 kg)", cout: "63 000 XOF", statut: "Planifiée" },
  { operation: "Sarclage PAR-D2", culture: "Maïs", parcelle: "PAR-D2", datePrevue: "14/07/2025", dateRealisee: "—", operateur: "Bamba O.", intrants: "Tracteur JD", cout: "85 000 XOF", statut: "Planifiée" },
  { operation: "Contrôle pépinière", culture: "Cacao", parcelle: "PEP-001", datePrevue: "25/07/2025", dateRealisee: "—", operateur: "Ibrahim S.", intrants: "Fiches suivi", cout: "15 000 XOF", statut: "Planifiée" },
  { operation: "Récolte maïs C1", culture: "Maïs", parcelle: "PAR-D1", datePrevue: "30/07/2025", dateRealisee: "—", operateur: "Bamba O.", intrants: "Moissonneuse + sacs", cout: "150 000 XOF", statut: "Planifiée" },
  { operation: "Récolte riz", culture: "Riz", parcelle: "PAR-E2", datePrevue: "15/08/2025", dateRealisee: "—", operateur: "Bamba O.", intrants: "Moissonneuse", cout: "200 000 XOF", statut: "Planifiée" },
  { operation: "Traitement capsule (2e)", culture: "Cacao", parcelle: "Toutes", datePrevue: "15/09/2025", dateRealisee: "—", operateur: "Ibrahim S.", intrants: "Insecticide homologué (60 kg)", cout: "90 000 XOF", statut: "Planifiée" },
  { operation: "Récolte principale cacao ★", culture: "Cacao", parcelle: "Toutes (8 parcelles)", datePrevue: "01/10/2025", dateRealisee: "—", operateur: "Toute l'équipe", intrants: "Machettes, bacs, camion", cout: "850 000 XOF", statut: "Planifiée" },
];

function StatutBadge({ s }: { s: OpStatus }) {
  if (s === "Réalisée") return (
    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-green-700 bg-green-50 px-2.5 py-1 rounded-full">
      <CheckCircle2 size={11} /> Réalisée
    </span>
  );
  if (s === "En retard") return (
    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-red-600 bg-red-50 px-2.5 py-1 rounded-full">
      <XCircle size={11} /> En retard
    </span>
  );
  return (
    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
      <Circle size={9} fill="currentColor" /> Planifiée
    </span>
  );
}

// ─── Prévisions data ───────────────────────────────────────────────────────

const PREVISIONS = [
  { culture: "Cacao", parcelle: "PAR-A1, A2, A3, B1, B2", surface: "28,4 ha", prevision: "38 tonnes", realise: "12,4 t (avance)", ecart: "+5%", tendance: "up" },
  { culture: "Cacao", parcelle: "PAR-C1, C2, D2", surface: "8,0 ha", prevision: "9,6 tonnes", realise: "—", ecart: "—", tendance: "neutral" },
  { culture: "Anacarde", parcelle: "PAR-C1, C2, E1", surface: "15,8 ha", prevision: "28 tonnes", realise: "31,4 t ✅", ecart: "+12%", tendance: "up" },
  { culture: "Maïs C1", parcelle: "PAR-D1", surface: "4,2 ha", prevision: "12 tonnes", realise: "En cours", ecart: "—", tendance: "neutral" },
  { culture: "Maïs C2", parcelle: "PAR-D1, E2", surface: "5,6 ha", prevision: "16 tonnes", realise: "—", ecart: "—", tendance: "neutral" },
  { culture: "Riz", parcelle: "PAR-E2", surface: "3,0 ha", prevision: "7,5 tonnes", realise: "—", ecart: "—", tendance: "neutral" },
];

// ─── Page ──────────────────────────────────────────────────────────────────

export default function PlanningCulturalPage() {
  const [activeTab, setActiveTab] = useState<Tab>("Gantt");

  return (
    <div className="min-h-screen bg-gray-50">
      <Topbar title="Planning Cultural" breadcrumb={["Production", "Planning Cultural"]} />

      <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">

        {/* KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: <Calendar size={20} className="text-blue-600" />, bg: "bg-blue-50", label: "Opérations planifiées", value: "48" },
            { icon: <CheckCircle2 size={20} className="text-green-600" />, bg: "bg-green-50", label: "Réalisées", value: "34" },
            { icon: <AlertTriangle size={20} className="text-red-500" />, bg: "bg-red-50", label: "En retard", value: "2" },
            { icon: <Clock size={20} className="text-[#2E7D32]" />, bg: "bg-emerald-50", label: "Prochaine intervention", value: "10/07/2025" },
          ].map((k, i) => (
            <div key={i} className="rounded-2xl bg-white border border-gray-100 p-5 flex items-center gap-4">
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${k.bg}`}>
                {k.icon}
              </div>
              <div>
                <p className="text-xl font-bold text-gray-800">{k.value}</p>
                <p className="text-xs text-gray-500">{k.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 p-1 bg-white border border-gray-100 rounded-xl w-fit flex-wrap">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab
                  ? "bg-[#2E7D32] text-white shadow-sm"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ── Gantt ─────────────────────────────────────────────────────── */}
        {activeTab === "Gantt" && (
          <div className="rounded-2xl bg-white border border-gray-100 p-5">
            <div className="flex items-center justify-between mb-5 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <Calendar size={18} className="text-[#2E7D32]" />
                <h2 className="font-bold text-gray-800">Campagne 2024-2025 — Gantt annuel</h2>
              </div>
              <span className="text-xs text-gray-400 bg-gray-50 border border-gray-100 px-3 py-1 rounded-full">
                Période : Jan 2025 → Déc 2025
              </span>
            </div>
            <GanttChart />
          </div>
        )}

        {/* ── Calendrier ─────────────────────────────────────────────── */}
        {activeTab === "Calendrier" && (
          <div className="rounded-2xl bg-white border border-gray-100 p-5">
            <CalendarView />
          </div>
        )}

        {/* ── Opérations ─────────────────────────────────────────────── */}
        {activeTab === "Opérations" && (
          <div className="rounded-2xl bg-white border border-gray-100 overflow-hidden">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Tractor size={18} className="text-[#2E7D32]" />
                <h2 className="font-bold text-gray-800">Opérations — Campagne 2025</h2>
                <span className="text-xs text-gray-400 bg-gray-50 border border-gray-100 px-2 py-0.5 rounded-full">
                  {OPERATIONS.length} opérations
                </span>
              </div>
              <button className="flex items-center gap-2 bg-[#2E7D32] hover:bg-[#1B5E20] text-white text-xs font-medium px-4 py-2 rounded-xl transition-colors">
                <Plus size={14} />
                Planifier
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-[#F8FBF8] text-gray-500">
                    <th className="text-left px-4 py-3 font-medium">Opération</th>
                    <th className="text-left px-4 py-3 font-medium">Culture</th>
                    <th className="text-left px-4 py-3 font-medium">Parcelle</th>
                    <th className="text-left px-4 py-3 font-medium">Date prévue</th>
                    <th className="text-left px-4 py-3 font-medium">Date réalisée</th>
                    <th className="text-left px-4 py-3 font-medium">Opérateur</th>
                    <th className="text-left px-4 py-3 font-medium">Intrants utilisés</th>
                    <th className="text-left px-4 py-3 font-medium">Coût</th>
                    <th className="text-left px-4 py-3 font-medium">Statut</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {OPERATIONS.map((op, i) => (
                    <tr
                      key={i}
                      className={`hover:bg-gray-50 transition-colors ${op.statut === "En retard" ? "bg-red-50/40" : ""}`}
                    >
                      <td className="px-4 py-3 font-medium text-gray-800">{op.operation}</td>
                      <td className="px-4 py-3 text-gray-600">{op.culture}</td>
                      <td className="px-4 py-3 font-mono text-gray-600">{op.parcelle}</td>
                      <td className="px-4 py-3 font-mono text-gray-600">{op.datePrevue}</td>
                      <td className="px-4 py-3 font-mono text-gray-600">{op.dateRealisee}</td>
                      <td className="px-4 py-3 text-gray-600">{op.operateur}</td>
                      <td className="px-4 py-3 text-gray-500">{op.intrants}</td>
                      <td className="px-4 py-3 font-mono text-gray-700">{op.cout}</td>
                      <td className="px-4 py-3">
                        <StatutBadge s={op.statut} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── Prévisions ─────────────────────────────────────────────── */}
        {activeTab === "Prévisions" && (
          <div className="space-y-5">
            <div className="rounded-2xl bg-white border border-gray-100 overflow-hidden">
              <div className="flex items-center gap-2 p-5 border-b border-gray-100">
                <Calendar size={18} className="text-[#2E7D32]" />
                <h2 className="font-bold text-gray-800">Prévisions de récolte — Campagne 2025</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#F8FBF8] text-gray-500 text-xs">
                      <th className="text-left px-4 py-3 font-medium">Culture</th>
                      <th className="text-left px-4 py-3 font-medium">Parcelles</th>
                      <th className="text-left px-4 py-3 font-medium">Surface</th>
                      <th className="text-left px-4 py-3 font-medium">Prévision</th>
                      <th className="text-left px-4 py-3 font-medium">Réalisé à ce jour</th>
                      <th className="text-left px-4 py-3 font-medium">Écart</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {PREVISIONS.map((p, i) => (
                      <tr key={i} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 font-semibold text-gray-800 text-xs">{p.culture}</td>
                        <td className="px-4 py-3 text-xs font-mono text-gray-600">{p.parcelle}</td>
                        <td className="px-4 py-3 text-xs text-gray-600">{p.surface}</td>
                        <td className="px-4 py-3 text-xs font-semibold text-gray-800">{p.prevision}</td>
                        <td className="px-4 py-3 text-xs text-gray-600">{p.realise}</td>
                        <td className="px-4 py-3 text-xs">
                          {p.ecart === "—" ? (
                            <span className="text-gray-400">—</span>
                          ) : p.tendance === "up" ? (
                            <span className="font-bold text-green-600">{p.ecart}</span>
                          ) : (
                            <span className="text-orange-500">{p.ecart}</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Summary cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-2xl bg-white border border-gray-100 p-5">
                <p className="text-xs text-gray-500 mb-1">Cacao prévu (total)</p>
                <p className="text-2xl font-bold text-gray-800">47,6 tonnes</p>
                <p className="text-xs text-green-600 mt-1">+5% vs campagne précédente</p>
              </div>
              <div className="rounded-2xl bg-white border border-gray-100 p-5">
                <p className="text-xs text-gray-500 mb-1">Anacarde réalisé</p>
                <p className="text-2xl font-bold text-green-700">31,4 tonnes</p>
                <p className="text-xs text-green-600 mt-1">+12% vs prévision</p>
              </div>
              <div className="rounded-2xl bg-white border border-gray-100 p-5">
                <p className="text-xs text-gray-500 mb-1">CA prévisionnel campagne</p>
                <p className="text-2xl font-bold text-gray-800">128 M XOF</p>
                <p className="text-xs text-gray-400 mt-1">Dont primes RA : ~8 M XOF</p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
