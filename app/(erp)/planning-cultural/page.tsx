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
  Leaf,
  Droplets,
  FlaskConical,
} from "lucide-react";

const TABS = [
  "Vue Annuelle",
  "Vue Mensuelle",
  "Opérations",
  "Intrants Planifiés",
] as const;
type Tab = (typeof TABS)[number];

const MONTHS = [
  "Jan","Fév","Mar","Avr","Mai","Juin",
  "Juil","Aoû","Sep","Oct","Nov","Déc",
];

// Today marker: 09/07 ≈ 53% of the year
const TODAY_PCT = 53;

interface GanttBar {
  label: string;
  start: number; // 0-based month index
  end: number;   // inclusive
  color: string;
  text: string;
}

interface GanttRow {
  culture: string;
  color: string;
  bars: GanttBar[];
}

const GANTT_ROWS: GanttRow[] = [
  {
    culture: "Cacao PAR-A1 & A2",
    color: "bg-green-800",
    bars: [
      { label: "", start: 0, end: 1, color: "#166534", text: "Taille & entretien" },
      { label: "", start: 2, end: 3, color: "#15803d", text: "Floraison" },
      { label: "", start: 4, end: 8, color: "#16a34a", text: "Développement fruits" },
      { label: "", start: 9, end: 11, color: "#4d7c0f", text: "Récolte principale" },
    ],
  },
  {
    culture: "Cacao PAR-A3",
    color: "bg-green-600",
    bars: [
      { label: "", start: 2, end: 3, color: "#166534", text: "Taille & entretien" },
      { label: "", start: 4, end: 5, color: "#15803d", text: "Floraison" },
      { label: "", start: 6, end: 10, color: "#16a34a", text: "Développement fruits" },
      { label: "", start: 11, end: 11, color: "#4d7c0f", text: "Récolte" },
    ],
  },
  {
    culture: "Anacarde PAR-C1",
    color: "bg-amber-600",
    bars: [
      { label: "", start: 0, end: 1, color: "#92400e", text: "Repos végétatif" },
      { label: "", start: 2, end: 3, color: "#d97706", text: "Floraison" },
      { label: "", start: 4, end: 5, color: "#f59e0b", text: "Récolte" },
      { label: "", start: 6, end: 7, color: "#b45309", text: "Post-récolte" },
    ],
  },
  {
    culture: "Maïs PAR-D1",
    color: "bg-blue-600",
    bars: [
      { label: "", start: 2, end: 2, color: "#1d4ed8", text: "Semis C1" },
      { label: "", start: 3, end: 4, color: "#2563eb", text: "Croissance" },
      { label: "", start: 5, end: 5, color: "#1e40af", text: "Récolte C1" },
      { label: "", start: 7, end: 7, color: "#1d4ed8", text: "Semis C2" },
      { label: "", start: 8, end: 9, color: "#2563eb", text: "Croissance" },
      { label: "", start: 10, end: 10, color: "#1e40af", text: "Récolte C2" },
    ],
  },
  {
    culture: "Riz PAR-D2",
    color: "bg-amber-800",
    bars: [
      { label: "", start: 5, end: 5, color: "#92400e", text: "Repiquage" },
      { label: "", start: 6, end: 8, color: "#a16207", text: "Croissance" },
      { label: "", start: 9, end: 9, color: "#78350f", text: "Récolte" },
    ],
  },
  {
    culture: "Bananiers",
    color: "bg-purple-400",
    bars: [
      { label: "", start: 0, end: 11, color: "#7c3aed", text: "Production continue" },
    ],
  },
];

function GanttChart() {
  const totalMonths = 12;
  const monthWidth = 100 / totalMonths;

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[700px]">
        {/* Header months */}
        <div className="flex mb-2 ml-[180px]">
          {MONTHS.map((m, i) => (
            <div
              key={i}
              className="text-center text-[11px] font-medium text-[var(--color-text-secondary)] border-l border-[var(--color-border)]"
              style={{ width: `${monthWidth}%`, flexShrink: 0 }}
            >
              {m}
            </div>
          ))}
        </div>

        {/* Rows */}
        <div className="space-y-2">
          {GANTT_ROWS.map((row, ri) => (
            <div key={ri} className="flex items-center gap-0">
              {/* Culture label */}
              <div
                className="text-[12px] font-medium text-[var(--color-text)] shrink-0 pr-3 text-right"
                style={{ width: 180 }}
              >
                {row.culture}
              </div>

              {/* Track */}
              <div
                className="relative flex-1 h-8 rounded bg-[var(--color-bg-secondary)]"
                style={{ position: "relative" }}
              >
                {/* Month grid lines */}
                {MONTHS.map((_, i) => (
                  <div
                    key={i}
                    className="absolute top-0 bottom-0 border-l border-[var(--color-border)]"
                    style={{ left: `${(i / 12) * 100}%` }}
                  />
                ))}

                {/* Today marker */}
                <div
                  className="absolute top-0 bottom-0 w-0.5 bg-red-500 z-20"
                  style={{ left: `${TODAY_PCT}%` }}
                >
                  <div className="absolute -top-1 -translate-x-1/2 w-2 h-2 bg-red-500 rounded-full" />
                </div>

                {/* Bars */}
                {row.bars.map((bar, bi) => {
                  const left = (bar.start / 12) * 100;
                  const width = ((bar.end - bar.start + 1) / 12) * 100;
                  return (
                    <div
                      key={bi}
                      className="absolute top-1 bottom-1 rounded flex items-center px-1.5 overflow-hidden z-10"
                      style={{
                        left: `${left}%`,
                        width: `${width}%`,
                        backgroundColor: bar.color,
                        opacity: 0.85,
                      }}
                    >
                      <span className="text-white text-[10px] font-medium truncate whitespace-nowrap">
                        {bar.text}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-4 flex items-center gap-4 ml-[180px]">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 bg-red-500 rounded-full" />
            <span className="text-[11px] text-[var(--color-text-secondary)]">Aujourd&apos;hui (09/07)</span>
          </div>
        </div>
      </div>
    </div>
  );
}

interface Operation {
  date: string;
  culture: string;
  type: string;
  produit: string;
  dose: string;
  operateur: string;
  statut: "Planifiée" | "Réalisée";
}

const OPERATIONS: Operation[] = [
  { date: "10/07/2025", culture: "Cacao PAR-A1", type: "Taille d'entretien", produit: "—", dose: "—", operateur: "Ibrahim S.", statut: "Planifiée" },
  { date: "12/07/2025", culture: "Anacarde PAR-C1", type: "Fertilisation potassique", produit: "KCl 60%", dose: "45 kg/ha = 171 kg", operateur: "Konan Y.", statut: "Planifiée" },
  { date: "14/07/2025", culture: "Maïs PAR-D1", type: "Sarclage mécanique", produit: "Tracteur JD", dose: "—", operateur: "Bamba O.", statut: "Planifiée" },
  { date: "15/07/2025", culture: "Cacao PAR-A3", type: "Traitement fongique", produit: "Mancozèbe 80%", dose: "4 kg/ha", operateur: "Ibrahim S.", statut: "Planifiée" },
  { date: "20/07/2025", culture: "Tous cacao", type: "Suivi parcellaire drone", produit: "DJI Agras T40", dose: "—", operateur: "Ibrahim S.", statut: "Planifiée" },
  { date: "08/07/2025", culture: "Bananiers", type: "Irrigation goutte-à-goutte", produit: "Système A", dose: "15 000 L", operateur: "—", statut: "Réalisée" },
  { date: "07/07/2025", culture: "Cacao PAR-A1", type: "Récolte cabosses", produit: "—", dose: "2 400 kg", operateur: "Konan Y.", statut: "Réalisée" },
  { date: "05/07/2025", culture: "Anacarde PAR-C1", type: "Pesée + contrôle qualité", produit: "Balance 5t", dose: "680 kg", operateur: "Kouassi D.", statut: "Réalisée" },
  { date: "01/07/2025", culture: "Cacao PAR-A2", type: "Déparasitage sol", produit: "Furadan", dose: "3 kg/ha", operateur: "Ibrahim S.", statut: "Réalisée" },
  { date: "28/06/2025", culture: "Maïs PAR-D1", type: "Épandage urée", produit: "Urée 46%", dose: "100 kg/ha", operateur: "Ibrahim S.", statut: "Réalisée" },
];

interface Intrant {
  produit: string;
  type: string;
  culture: string;
  parcelle: string;
  quantite: string;
  dateBesoin: string;
  stock: string;
  statut: "ok" | "warn" | "danger";
  statutLabel: string;
}

const INTRANTS: Intrant[] = [
  {
    produit: "Mancozèbe 80% WP",
    type: "Fongicide",
    culture: "Cacao",
    parcelle: "PAR-A3",
    quantite: "56 kg",
    dateBesoin: "15/07",
    stock: "80 kg en stock",
    statut: "ok",
    statutLabel: "✅ Disponible",
  },
  {
    produit: "KCl 60%",
    type: "Engrais K",
    culture: "Anacarde",
    parcelle: "PAR-C1",
    quantite: "171 kg",
    dateBesoin: "12/07",
    stock: "45 kg en stock",
    statut: "warn",
    statutLabel: "⚠️ Commander (manque 126 kg)",
  },
  {
    produit: "Furadan 5G",
    type: "Nématicide",
    culture: "Cacao général",
    parcelle: "—",
    quantite: "200 kg",
    dateBesoin: "25/07",
    stock: "0 kg",
    statut: "danger",
    statutLabel: "🔴 Rupture — Commander urgent",
  },
  {
    produit: "Urée 46%",
    type: "Engrais N",
    culture: "Maïs",
    parcelle: "PAR-D1",
    quantite: "480 kg",
    dateBesoin: "28/07",
    stock: "380 kg",
    statut: "warn",
    statutLabel: "⚠️ Stock faible",
  },
];

export default function PlanningCulturalPage() {
  const [activeTab, setActiveTab] = useState<Tab>("Vue Annuelle");

  return (
    <div className="flex flex-col h-full">
      <Topbar title="Planning Cultural" breadcrumb={["Production", "Planning Cultural"]} />

      <div className="flex-1 overflow-auto p-4 md:p-6 space-y-6">
        {/* Tabs */}
        <div className="flex gap-1 p-1 bg-[var(--color-bg-secondary)] rounded-lg w-fit flex-wrap">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab
                  ? "bg-[var(--color-bg)] text-[var(--color-text)] shadow-sm"
                  : "text-[var(--color-text-secondary)] hover:text-[var(--color-text)]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Vue Annuelle */}
        {activeTab === "Vue Annuelle" && (
          <div className="bg-[var(--color-bg)] border border-[var(--color-border)] rounded-xl p-5">
            <div className="flex items-center gap-2 mb-5">
              <Calendar size={18} className="text-green-600" />
              <h2 className="font-semibold text-[var(--color-text)]">
                Calendrier cultural 2025 — Diagramme de Gantt
              </h2>
            </div>
            <GanttChart />
          </div>
        )}

        {/* Vue Mensuelle */}
        {activeTab === "Vue Mensuelle" && (
          <div className="bg-[var(--color-bg)] border border-[var(--color-border)] rounded-xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <Calendar size={18} className="text-blue-600" />
              <h2 className="font-semibold text-[var(--color-text)]">Vue Mensuelle — Juillet 2025</h2>
            </div>
            {/* 7-column calendar grid */}
            <div className="grid grid-cols-7 gap-1">
              {["Lun","Mar","Mer","Jeu","Ven","Sam","Dim"].map((d) => (
                <div key={d} className="text-center text-[11px] font-semibold text-[var(--color-text-secondary)] py-1">
                  {d}
                </div>
              ))}
              {/* padding for July 2025 starting on Tuesday */}
              <div />
              {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
                const hasOp = [7, 8, 10, 12, 14, 15, 20].includes(day);
                const isPast = day <= 9;
                const isToday = day === 9;
                return (
                  <div
                    key={day}
                    className={`rounded-lg p-1.5 min-h-[52px] border text-[12px] font-medium
                      ${isToday ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" : "border-[var(--color-border)]"}
                      ${isPast && !isToday ? "opacity-60" : ""}
                    `}
                  >
                    <span className={isToday ? "text-blue-600 font-bold" : "text-[var(--color-text)]"}>{day}</span>
                    {hasOp && (
                      <div className="mt-1">
                        <div className="w-full h-1.5 rounded bg-green-500 opacity-80" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Opérations */}
        {activeTab === "Opérations" && (
          <div className="bg-[var(--color-bg)] border border-[var(--color-border)] rounded-xl overflow-hidden">
            <div className="flex items-center justify-between p-5 border-b border-[var(--color-border)]">
              <div className="flex items-center gap-2">
                <Tractor size={18} className="text-green-600" />
                <h2 className="font-semibold text-[var(--color-text)]">Opérations planifiées</h2>
              </div>
              <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
                <Plus size={15} />
                Planifier une opération
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] text-[12px] uppercase tracking-wide">
                    <th className="text-left px-4 py-3 font-semibold">Date</th>
                    <th className="text-left px-4 py-3 font-semibold">Culture / Parcelle</th>
                    <th className="text-left px-4 py-3 font-semibold">Type d&apos;opération</th>
                    <th className="text-left px-4 py-3 font-semibold">Produit / Matériel</th>
                    <th className="text-left px-4 py-3 font-semibold">Dose / Quantité</th>
                    <th className="text-left px-4 py-3 font-semibold">Opérateur</th>
                    <th className="text-left px-4 py-3 font-semibold">Statut</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--color-border)]">
                  {OPERATIONS.map((op, i) => (
                    <tr key={i} className="hover:bg-[var(--color-bg-secondary)] transition-colors">
                      <td className="px-4 py-3 font-mono text-[13px] text-[var(--color-text)]">{op.date}</td>
                      <td className="px-4 py-3 font-medium text-[var(--color-text)]">{op.culture}</td>
                      <td className="px-4 py-3 text-[var(--color-text)]">{op.type}</td>
                      <td className="px-4 py-3 text-[var(--color-text-secondary)]">{op.produit}</td>
                      <td className="px-4 py-3 text-[var(--color-text-secondary)]">{op.dose}</td>
                      <td className="px-4 py-3 text-[var(--color-text)]">{op.operateur || <span className="text-[var(--color-text-secondary)]">—</span>}</td>
                      <td className="px-4 py-3">
                        {op.statut === "Planifiée" ? (
                          <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-blue-600 bg-blue-50 dark:bg-blue-900/20 px-2.5 py-1 rounded-full">
                            <Circle size={10} fill="currentColor" />
                            Planifiée
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-green-600 bg-green-50 dark:bg-green-900/20 px-2.5 py-1 rounded-full">
                            <CheckCircle2 size={12} />
                            Réalisée
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Intrants Planifiés */}
        {activeTab === "Intrants Planifiés" && (
          <div className="space-y-5">
            {/* Summary cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[var(--color-bg)] border border-[var(--color-border)] rounded-xl p-4">
                <div className="text-[12px] text-[var(--color-text-secondary)] mb-1">Budget intrants planifiés (30j)</div>
                <div className="text-2xl font-bold text-[var(--color-text)]">2 840 000 XOF</div>
              </div>
              <div className="bg-[var(--color-bg)] border border-red-200 dark:border-red-800 rounded-xl p-4">
                <div className="text-[12px] text-red-600 mb-1">Dont commandes urgentes</div>
                <div className="text-2xl font-bold text-red-600">1 250 000 XOF</div>
              </div>
            </div>

            <div className="bg-[var(--color-bg)] border border-[var(--color-border)] rounded-xl overflow-hidden">
              <div className="flex items-center gap-2 p-5 border-b border-[var(--color-border)]">
                <FlaskConical size={18} className="text-amber-600" />
                <h2 className="font-semibold text-[var(--color-text)]">
                  Besoins en intrants — 30 prochains jours
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] text-[12px] uppercase tracking-wide">
                      <th className="text-left px-4 py-3 font-semibold">Produit</th>
                      <th className="text-left px-4 py-3 font-semibold">Type</th>
                      <th className="text-left px-4 py-3 font-semibold">Culture</th>
                      <th className="text-left px-4 py-3 font-semibold">Parcelle</th>
                      <th className="text-left px-4 py-3 font-semibold">Quantité</th>
                      <th className="text-left px-4 py-3 font-semibold">Date besoin</th>
                      <th className="text-left px-4 py-3 font-semibold">Stock actuel</th>
                      <th className="text-left px-4 py-3 font-semibold">Statut</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--color-border)]">
                    {INTRANTS.map((item, i) => (
                      <tr key={i} className="hover:bg-[var(--color-bg-secondary)] transition-colors">
                        <td className="px-4 py-3 font-medium text-[var(--color-text)]">{item.produit}</td>
                        <td className="px-4 py-3 text-[var(--color-text-secondary)]">{item.type}</td>
                        <td className="px-4 py-3 text-[var(--color-text)]">{item.culture}</td>
                        <td className="px-4 py-3 text-[var(--color-text-secondary)]">{item.parcelle}</td>
                        <td className="px-4 py-3 font-mono text-[13px] text-[var(--color-text)]">{item.quantite}</td>
                        <td className="px-4 py-3 font-mono text-[13px] text-[var(--color-text)]">{item.dateBesoin}</td>
                        <td className="px-4 py-3 text-[var(--color-text-secondary)]">{item.stock}</td>
                        <td className="px-4 py-3">
                          {item.statut === "ok" && (
                            <span className="inline-flex items-center gap-1 text-[12px] font-medium text-green-600 bg-green-50 dark:bg-green-900/20 px-2.5 py-1 rounded-full">
                              <CheckCircle2 size={12} />
                              Disponible
                            </span>
                          )}
                          {item.statut === "warn" && (
                            <span className="inline-flex items-center gap-1 text-[12px] font-medium text-amber-600 bg-amber-50 dark:bg-amber-900/20 px-2.5 py-1 rounded-full">
                              <AlertTriangle size={12} />
                              Commander
                            </span>
                          )}
                          {item.statut === "danger" && (
                            <span className="inline-flex items-center gap-1 text-[12px] font-medium text-red-600 bg-red-50 dark:bg-red-900/20 px-2.5 py-1 rounded-full">
                              <XCircle size={12} />
                              Rupture — Urgent
                            </span>
                          )}
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
