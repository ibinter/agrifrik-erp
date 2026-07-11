"use client";

import { useState } from "react";
import Topbar from "../../components/Topbar";
import { AlertTriangle, CheckCircle, Clock, Users, Calendar, TrendingUp, ChevronRight } from "lucide-react";

const TABS = ["Planning", "Congés & Absences", "Charge de travail"] as const;
type Tab = typeof TABS[number];

type ActivityType = "terrain" | "bureau" | "formation" | "maintenance" | "repos";

const ACTIVITY_LABELS: Record<ActivityType, string> = {
  terrain: "Terrain production",
  bureau: "Administration/Bureau",
  formation: "Formation",
  maintenance: "Maintenance/Logistique",
  repos: "Repos/Congé",
};

const ACTIVITY_COLORS: Record<ActivityType, string> = {
  terrain: "bg-green-100 text-green-800",
  bureau: "bg-blue-100 text-blue-800",
  formation: "bg-yellow-100 text-yellow-800",
  maintenance: "bg-orange-100 text-orange-800",
  repos: "bg-gray-100 text-gray-500",
};

const ACTIVITY_SHORT: Record<ActivityType, string> = {
  terrain: "T",
  bureau: "B",
  formation: "F",
  maintenance: "M",
  repos: "—",
};

type Day = "Lu" | "Ma" | "Me" | "Je" | "Ve" | "Sa" | "Di";
const DAYS: Day[] = ["Lu", "Ma", "Me", "Je", "Ve", "Sa", "Di"];

interface Employee {
  name: string;
  poste: string;
  schedule: Record<Day, ActivityType>;
  type: "permanent" | "saisonnier";
}

const EMPLOYEES: Employee[] = [
  {
    name: "Ibrahim Sawadogo", poste: "Resp. Terrain", type: "permanent",
    schedule: { Lu: "terrain", Ma: "terrain", Me: "terrain", Je: "terrain", Ve: "terrain", Sa: "terrain", Di: "repos" },
  },
  {
    name: "Konan Yao", poste: "Technicien Agro", type: "permanent",
    schedule: { Lu: "terrain", Ma: "terrain", Me: "terrain", Je: "terrain", Ve: "terrain", Sa: "repos", Di: "repos" },
  },
  {
    name: "Adjoua Messou", poste: "Contrôleur Qualité", type: "permanent",
    schedule: { Lu: "bureau", Ma: "bureau", Me: "bureau", Je: "bureau", Ve: "bureau", Sa: "repos", Di: "repos" },
  },
  {
    name: "Bamba Oumar", poste: "Mécanicien", type: "permanent",
    schedule: { Lu: "maintenance", Ma: "maintenance", Me: "maintenance", Je: "maintenance", Ve: "maintenance", Sa: "maintenance", Di: "repos" },
  },
  {
    name: "Fanta Koné", poste: "Assistante Admin", type: "permanent",
    schedule: { Lu: "formation", Ma: "formation", Me: "formation", Je: "formation", Ve: "repos", Sa: "repos", Di: "repos" },
  },
  {
    name: "Aïcha Diabaté", poste: "Ouvrière agri.", type: "permanent",
    schedule: { Lu: "terrain", Ma: "terrain", Me: "terrain", Je: "terrain", Ve: "terrain", Sa: "terrain", Di: "repos" },
  },
  {
    name: "Sékou Bamba", poste: "Ouvrier agri.", type: "permanent",
    schedule: { Lu: "terrain", Ma: "terrain", Me: "terrain", Je: "terrain", Ve: "terrain", Sa: "terrain", Di: "repos" },
  },
  {
    name: "Moussa Traoré", poste: "Chauffeur", type: "permanent",
    schedule: { Lu: "maintenance", Ma: "maintenance", Me: "maintenance", Je: "maintenance", Ve: "maintenance", Sa: "repos", Di: "repos" },
  },
  ...([1, 2, 3, 4, 5, 6, 7, 8] as const).map(n => ({
    name: `Saisonnier ${n}`,
    poste: "Ouvrier saisonnier",
    type: "saisonnier" as const,
    schedule: { Lu: "terrain", Ma: "terrain", Me: "terrain", Je: "terrain", Ve: "terrain", Sa: "terrain", Di: "repos" } as Record<Day, ActivityType>,
  })),
];

interface LeaveEmployee {
  name: string;
  poste: string;
  acquis: number;
  pris: number;
  prochains: string;
  enCours?: boolean;
}

const LEAVE_DATA: LeaveEmployee[] = [
  { name: "Ibrahim Sawadogo", poste: "Resp. Terrain", acquis: 26, pris: 5, prochains: "Oct 2025 (2 sem.)" },
  { name: "Konan Yao", poste: "Technicien Agro", acquis: 22, pris: 3, prochains: "—" },
  { name: "Adjoua Messou", poste: "Contrôleur Qualité", acquis: 22, pris: 8, prochains: "—" },
  { name: "Bamba Oumar", poste: "Mécanicien", acquis: 22, pris: 0, prochains: "Août 2025 (1 sem.)" },
  { name: "Fanta Koné", poste: "Assistante Admin", acquis: 22, pris: 10, prochains: "14-18/07", enCours: true },
  { name: "Aïcha Diabaté", poste: "Ouvrière agri.", acquis: 18, pris: 2, prochains: "—" },
  { name: "Sékou Bamba", poste: "Ouvrier agri.", acquis: 18, pris: 0, prochains: "—" },
  { name: "Moussa Traoré", poste: "Chauffeur", acquis: 22, pris: 6, prochains: "—" },
  { name: "Permanent 9", poste: "Ouvrier agri.", acquis: 18, pris: 4, prochains: "—" },
  { name: "Permanent 10", poste: "Technicien", acquis: 22, pris: 2, prochains: "Nov 2025" },
  { name: "Permanent 11", poste: "Comptable", acquis: 22, pris: 5, prochains: "—" },
  { name: "Permanent 12", poste: "Logisticien", acquis: 22, pris: 3, prochains: "Sep 2025" },
  { name: "Permanent 13", poste: "Ouvrier agri.", acquis: 18, pris: 0, prochains: "—" },
  { name: "Permanent 14", poste: "Superviseur", acquis: 26, pris: 7, prochains: "—" },
  { name: "Permanent 15", poste: "Secrétaire", acquis: 22, pris: 4, prochains: "Déc 2025" },
];

type WorkloadLevel = "surcharge" | "charge" | "normal" | "sous";

const HEATMAP_EMPLOYEES = [
  "Ibrahim S.", "Konan Y.", "Adjoua M.", "Bamba O.", "Fanta K.",
  "Aïcha D.", "Sékou B.", "Moussa T.", "Permanent 9", "Permanent 10",
  "Permanent 11", "Permanent 12", "Permanent 13", "Permanent 14", "Permanent 15",
];

const HEATMAP_DATA: WorkloadLevel[][] = [
  ["charge",    "normal",    "normal",    "normal",    "normal",    "normal",    "normal",    "normal",    "normal",    "normal",    "normal",    "normal"],
  ["normal",    "normal",    "normal",    "normal",    "normal",    "normal",    "sous",      "normal",    "normal",    "normal",    "normal",    "sous"],
  ["normal",    "normal",    "normal",    "normal",    "sous",      "sous",      "normal",    "normal",    "normal",    "sous",      "normal",    "normal"],
  ["surcharge", "surcharge", "surcharge", "charge",    "charge",    "normal",    "normal",    "normal",    "normal",    "normal",    "normal",    "normal"],
  ["sous",      "normal",    "normal",    "normal",    "normal",    "normal",    "normal",    "normal",    "sous",      "normal",    "normal",    "normal"],
  ["normal",    "normal",    "normal",    "normal",    "normal",    "charge",    "charge",    "normal",    "normal",    "normal",    "normal",    "normal"],
  ["normal",    "normal",    "normal",    "normal",    "normal",    "normal",    "normal",    "normal",    "normal",    "charge",    "normal",    "normal"],
  ["normal",    "normal",    "sous",      "normal",    "normal",    "normal",    "normal",    "sous",      "normal",    "normal",    "normal",    "normal"],
  ["normal",    "normal",    "normal",    "normal",    "normal",    "normal",    "sous",      "normal",    "normal",    "normal",    "normal",    "normal"],
  ["sous",      "sous",      "normal",    "normal",    "normal",    "normal",    "normal",    "normal",    "sous",      "normal",    "normal",    "sous"],
  ["normal",    "normal",    "normal",    "charge",    "normal",    "normal",    "normal",    "normal",    "normal",    "normal",    "charge",    "normal"],
  ["normal",    "normal",    "charge",    "charge",    "normal",    "normal",    "normal",    "normal",    "normal",    "normal",    "normal",    "normal"],
  ["normal",    "normal",    "normal",    "normal",    "normal",    "sous",      "normal",    "normal",    "normal",    "normal",    "normal",    "sous"],
  ["charge",    "normal",    "normal",    "normal",    "normal",    "normal",    "charge",    "normal",    "normal",    "normal",    "normal",    "normal"],
  ["normal",    "sous",      "normal",    "normal",    "normal",    "normal",    "normal",    "charge",    "normal",    "normal",    "normal",    "normal"],
];

const HEATMAP_COLORS: Record<WorkloadLevel, string> = {
  surcharge: "#ef4444",
  charge: "#f97316",
  normal: "#22c55e",
  sous: "#d1d5db",
};

const WEEKS = ["S29", "S30", "S31", "S32", "S33", "S34", "S35", "S36", "S37", "S38", "S39", "S40"];

function KpiCard({
  label, value, sub, icon: Icon, color = "text-[#2E7D32]",
}: {
  label: string; value: string; sub?: string; icon: React.ElementType; color?: string;
}) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 flex items-start gap-4">
      <div className={`mt-0.5 ${color}`}><Icon size={22} /></div>
      <div>
        <p className="text-xs text-gray-500 mb-0.5">{label}</p>
        <p className="text-xl font-bold text-gray-800">{value}</p>
        {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}

function PlanningTab() {
  const counts: Record<ActivityType, number> = { terrain: 0, bureau: 0, formation: 0, maintenance: 0, repos: 0 };
  EMPLOYEES.forEach(e => DAYS.forEach(d => { counts[e.schedule[d]]++; }));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <KpiCard label="Effectif total" value="23" sub="15 permanents + 8 saisonniers" icon={Users} />
        <KpiCard label="Homme-jours semaine" value="149" sub="Semaine 29 — Lun-Sam" icon={Calendar} />
        <KpiCard label="Taux présence" value="96,8%" sub="+1,2% vs semaine dernière" icon={TrendingUp} />
        <KpiCard label="Congés en cours" value="1" sub="Fanta Koné — 14-18/07" icon={Clock} color="text-orange-500" />
        <KpiCard label="Postes vacants" value="2" sub="Resp. Export + Ctrl. Qualité" icon={AlertTriangle} color="text-red-500" />
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-5 overflow-x-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-gray-800">Planning hebdomadaire — Semaine 29 (07-13 juillet 2025)</h2>
          <span className="text-xs bg-[#E8F5E9] text-[#2E7D32] px-2 py-1 rounded-lg font-medium">23 employés</span>
        </div>
        <table className="w-full text-xs min-w-[700px]">
          <thead>
            <tr className="bg-[#F8FBF8]">
              <th className="text-left py-2 px-3 font-medium text-gray-600 rounded-l-lg w-44">Employé</th>
              <th className="text-left py-2 px-2 font-medium text-gray-500 text-[10px] uppercase w-32">Poste</th>
              {DAYS.map(d => (
                <th key={d} className="text-center py-2 px-2 font-medium text-gray-600 w-12">{d}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {EMPLOYEES.map((emp, i) => (
              <tr key={i} className="hover:bg-gray-50 transition-colors">
                <td className="py-2 px-3">
                  <div className="font-medium text-gray-800 text-xs">{emp.name}</div>
                  {emp.type === "saisonnier" && (
                    <span className="text-[10px] text-orange-500">saisonnier</span>
                  )}
                </td>
                <td className="py-2 px-2 text-gray-500 text-[10px]">{emp.poste}</td>
                {DAYS.map(d => {
                  const act = emp.schedule[d];
                  return (
                    <td key={d} className="py-2 px-1 text-center">
                      <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-medium ${ACTIVITY_COLORS[act]}`}>
                        {ACTIVITY_SHORT[act]}
                      </span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-5 pt-4 border-t border-gray-100">
          <p className="text-xs font-medium text-gray-600 mb-3">Légende &amp; récapitulatif semaine</p>
          <div className="flex flex-wrap gap-4">
            {(Object.keys(ACTIVITY_LABELS) as ActivityType[]).map(act => (
              <div key={act} className="flex items-center gap-2">
                <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium ${ACTIVITY_COLORS[act]}`}>
                  {ACTIVITY_SHORT[act]}
                </span>
                <span className="text-xs text-gray-600">{ACTIVITY_LABELS[act]}</span>
                <span className="text-xs text-gray-400 font-semibold">({counts[act]})</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function CongesTab() {
  return (
    <div className="space-y-6">
      {/* Table solde congés */}
      <div className="rounded-2xl border border-gray-100 bg-white p-5 overflow-x-auto">
        <h2 className="font-semibold text-gray-800 mb-4">Solde congés par employé — 2025</h2>
        <table className="w-full text-xs min-w-[700px]">
          <thead>
            <tr className="bg-[#F8FBF8]">
              {["Employé", "Poste", "Jours acquis 2025", "Pris", "Solde", "Prochains congés"].map(h => (
                <th key={h} className="text-left py-2 px-3 font-medium text-gray-600">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {LEAVE_DATA.map((emp, i) => {
              const solde = emp.acquis - emp.pris;
              return (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="py-2.5 px-3 font-medium text-gray-800">{emp.name}</td>
                  <td className="py-2.5 px-3 text-gray-500">{emp.poste}</td>
                  <td className="py-2.5 px-3 text-gray-700">{emp.acquis} j</td>
                  <td className="py-2.5 px-3 text-gray-700">{emp.pris} j</td>
                  <td className="py-2.5 px-3">
                    <span className={`font-semibold ${solde <= 5 ? "text-orange-600" : "text-[#2E7D32]"}`}>
                      {solde} j
                    </span>
                  </td>
                  <td className="py-2.5 px-3">
                    {emp.enCours ? (
                      <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 px-2 py-0.5 rounded-full text-[10px] font-medium">
                        <CheckCircle size={10} /> {emp.prochains} — En cours
                      </span>
                    ) : (
                      <span className="text-gray-500">{emp.prochains}</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Demande en attente */}
      <div className="rounded-2xl border border-gray-100 bg-white p-5">
        <h2 className="font-semibold text-gray-800 mb-4">Demandes en cours de validation</h2>
        <div className="flex items-center gap-4 p-4 rounded-xl bg-orange-50 border border-orange-100">
          <Clock size={20} className="text-orange-500 shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-800">Bamba Oumar — 04-08 août 2025 (5 jours)</p>
            <p className="text-xs text-gray-500 mt-0.5">Mécanicien · Demande soumise le 08/07/2025</p>
          </div>
          <span className="text-xs bg-orange-100 text-orange-700 px-2.5 py-1 rounded-full font-medium whitespace-nowrap">En attente</span>
          <div className="flex gap-2 shrink-0">
            <button className="text-xs bg-[#2E7D32] text-white px-3 py-1.5 rounded-xl font-medium hover:bg-[#1B5E20] transition-colors">Approuver</button>
            <button className="text-xs bg-gray-100 text-gray-600 px-3 py-1.5 rounded-xl font-medium hover:bg-gray-200 transition-colors">Refuser</button>
          </div>
        </div>
      </div>

      {/* SVG Calendrier Gantt */}
      <div className="rounded-2xl border border-gray-100 bg-white p-5 overflow-x-auto">
        <h2 className="font-semibold text-gray-800 mb-4">Calendrier des absences — Juillet–Décembre 2025</h2>
        <svg viewBox="0 0 820 350" className="w-full min-w-[600px]" aria-label="Calendrier absences Gantt">
          {/* Months header */}
          {["Juillet", "Août", "Sep.", "Oct.", "Nov.", "Déc."].map((m, i) => (
            <g key={m}>
              <rect x={130 + i * 113} y={4} width={113} height={20} fill={i % 2 === 0 ? "#f9fafb" : "#f3f4f6"} />
              <text x={130 + i * 113 + 56} y={17} textAnchor="middle" fontSize={10} fill="#6b7280" fontWeight="600">{m}</text>
            </g>
          ))}
          {/* Grid + rows */}
          {LEAVE_DATA.slice(0, 12).map((emp, row) => {
            const y = 28 + row * 26;
            const bg = row % 2 === 0 ? "#fafafa" : "#ffffff";
            return (
              <g key={row}>
                <rect x={0} y={y} width={820} height={26} fill={bg} />
                <text x={125} y={y + 16} textAnchor="end" fontSize={9.5} fill="#374151">{emp.name}</text>
                {/* Month grid lines */}
                {[0, 1, 2, 3, 4, 5, 6].map(mi => (
                  <line key={mi} x1={130 + mi * 113} y1={y} x2={130 + mi * 113} y2={y + 26} stroke="#e5e7eb" strokeWidth={0.5} />
                ))}
                {/* Fanta Koné (row 4) — congé en cours 14-18 juillet */}
                {row === 4 && <rect x={132} y={y + 4} width={24} height={18} fill="#22c55e" rx={3} opacity={0.9} />}
                {/* Bamba Oumar (row 3) — août planifié */}
                {row === 3 && <rect x={247} y={y + 4} width={20} height={18} fill="#f97316" rx={3} opacity={0.8} />}
                {/* Ibrahim (row 0) — oct approuvé 2 semaines */}
                {row === 0 && <rect x={470} y={y + 4} width={38} height={18} fill="#3b82f6" rx={3} opacity={0.85} />}
                {/* Permanent 10 (row 9) — nov */}
                {row === 9 && <rect x={583} y={y + 4} width={20} height={18} fill="#8b5cf6" rx={3} opacity={0.8} />}
                {/* Permanent 12 (row 11) — sep */}
                {row === 11 && <rect x={358} y={y + 4} width={22} height={18} fill="#f97316" rx={3} opacity={0.8} />}
              </g>
            );
          })}
          {/* Legend */}
          <rect x={130} y={342} width={11} height={11} fill="#22c55e" rx={2} />
          <text x={144} y={352} fontSize={9} fill="#6b7280">En cours</text>
          <rect x={210} y={342} width={11} height={11} fill="#f97316" rx={2} />
          <text x={224} y={352} fontSize={9} fill="#6b7280">Planifié</text>
          <rect x={285} y={342} width={11} height={11} fill="#3b82f6" rx={2} />
          <text x={299} y={352} fontSize={9} fill="#6b7280">Approuvé</text>
          <rect x={370} y={342} width={11} height={11} fill="#8b5cf6" rx={2} />
          <text x={384} y={352} fontSize={9} fill="#6b7280">Planifié longue durée</text>
        </svg>
      </div>

      {/* Indicateurs RH */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Taux d'absentéisme H1", value: "2,1%", sub: "Seuil : 5%", ok: true },
          { label: "Absences maladie H1", value: "3 cas", sub: "Total 8 jours", ok: true },
          { label: "Accidents du travail", value: "0", sub: "YTD 2025", ok: true },
          { label: "Turnover 2024", value: "0%", sub: "Excellent", ok: true },
        ].map((ind, i) => (
          <div key={i} className="rounded-2xl border border-gray-100 bg-white p-5">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-gray-500">{ind.label}</span>
              <CheckCircle size={14} className="text-green-500" />
            </div>
            <p className="text-xl font-bold text-gray-800">{ind.value}</p>
            <p className="text-xs text-gray-400 mt-0.5">{ind.sub}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ChargeTab() {
  const cellW = 46;
  const cellH = 26;
  const labelW = 90;
  const svgW = labelW + WEEKS.length * cellW + 20;
  const svgH = 28 + HEATMAP_EMPLOYEES.length * cellH + 60;

  return (
    <div className="space-y-6">
      {/* Heatmap SVG */}
      <div className="rounded-2xl border border-gray-100 bg-white p-5 overflow-x-auto">
        <h2 className="font-semibold text-gray-800 mb-4">Heatmap charge de travail — Semaines 29-40 (Juillet–Octobre 2025)</h2>
        <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full min-w-[620px]" aria-label="Heatmap charge de travail">
          {/* Column headers */}
          {WEEKS.map((w, wi) => (
            <text key={w} x={labelW + wi * cellW + cellW / 2} y={16} textAnchor="middle" fontSize={9} fill="#6b7280" fontWeight="600">{w}</text>
          ))}
          {/* Rows */}
          {HEATMAP_EMPLOYEES.map((emp, row) => {
            const y = 22 + row * cellH;
            return (
              <g key={row}>
                <text x={labelW - 5} y={y + cellH / 2 + 4} textAnchor="end" fontSize={9} fill="#374151">{emp}</text>
                {HEATMAP_DATA[row].map((level, wi) => (
                  <rect
                    key={wi}
                    x={labelW + wi * cellW + 2}
                    y={y + 2}
                    width={cellW - 4}
                    height={cellH - 4}
                    fill={HEATMAP_COLORS[level]}
                    rx={3}
                    opacity={0.85}
                  />
                ))}
              </g>
            );
          })}
          {/* Legend */}
          {([
            ["#ef4444", "Surcharge >110%"],
            ["#f97316", "Chargé 90-110%"],
            ["#22c55e", "Normal 70-90%"],
            ["#d1d5db", "Sous-utilisé <70%"],
          ] as [string, string][]).map(([color, label], i) => (
            <g key={i}>
              <rect x={labelW + i * 148} y={svgH - 26} width={12} height={12} fill={color} rx={2} />
              <text x={labelW + i * 148 + 16} y={svgH - 16} fontSize={9} fill="#6b7280">{label}</text>
            </g>
          ))}
        </svg>
      </div>

      {/* Alertes */}
      <div className="rounded-2xl border border-gray-100 bg-white p-5">
        <h2 className="font-semibold text-gray-800 mb-4">Alertes de charge — Semaine 29</h2>
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-100 rounded-xl">
            <AlertTriangle size={16} className="text-red-500 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium text-gray-800">Bamba Oumar — 120% charge semaines 29-31</p>
              <p className="text-xs text-gray-500 mt-0.5">Cumul maintenance MAT-001 (flexible hydraulique) + missions terrain simultanées. Risque de retard sur livraison pièces.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-orange-50 border border-orange-100 rounded-xl">
            <AlertTriangle size={16} className="text-orange-500 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium text-gray-800">Ibrahim Sawadogo — 108% charge semaine 29</p>
              <p className="text-xs text-gray-500 mt-0.5">Supervision fermentation LOT-048 + traitement phytosanitaire PAR-B1 en parallèle le 11/07.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-100 rounded-xl">
            <CheckCircle size={16} className="text-green-500 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium text-gray-800">Moussa Traoré — Charge normale (70-85%)</p>
              <p className="text-xs text-gray-500 mt-0.5">Aucun dépassement prévu sur les 12 prochaines semaines. Disponible pour missions ponctuelles.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recommandations IA */}
      <div className="rounded-2xl border border-gray-100 bg-white p-5">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-6 h-6 rounded-full bg-[#2E7D32] flex items-center justify-center shrink-0">
            <TrendingUp size={13} className="text-white" />
          </div>
          <h2 className="font-semibold text-gray-800">Recommandations — Optimisation des ressources humaines</h2>
        </div>
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-4 bg-[#F8FBF8] rounded-xl border border-green-100">
            <ChevronRight size={15} className="text-[#2E7D32] mt-0.5 shrink-0" />
            <p className="text-sm text-gray-700">
              <span className="font-medium">Renfort saisonnier semaines 30-31 :</span> Embauche d'un ouvrier saisonnier supplémentaire pour alléger la charge de Bamba Oumar. Économie estimée : 3 jours de retard évités sur réparation MAT-001, soit ~450 000 XOF de perte d'exploitation évitée.
            </p>
          </div>
          <div className="flex items-start gap-3 p-4 bg-[#F8FBF8] rounded-xl border border-green-100">
            <ChevronRight size={15} className="text-[#2E7D32] mt-0.5 shrink-0" />
            <p className="text-sm text-gray-700">
              <span className="font-medium">Délégation contrôle fermentation — vendredi 11/07 :</span> Confier le retournement et contrôle de LOT-048 (14h00) à Konan Yao. Ibrahim Sawadogo est déjà mobilisé sur le traitement PAR-B1. Risque qualité nul si délégation effectuée avant 13h30.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PlanningRHPage() {
  const [tab, setTab] = useState<Tab>("Planning");

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-gray-50">
      <Topbar breadcrumb={["RH", "Planning RH"]} />
      <main className="flex-1 p-6 space-y-6">
        <div className="flex gap-1 bg-white border border-gray-100 rounded-2xl p-1.5 w-fit">
          {TABS.map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-colors ${
                tab === t
                  ? "bg-[#2E7D32] text-white shadow-sm"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {tab === "Planning" && <PlanningTab />}
        {tab === "Congés & Absences" && <CongesTab />}
        {tab === "Charge de travail" && <ChargeTab />}
      </main>
    </div>
  );
}
