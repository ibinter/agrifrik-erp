"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Users, Clock, UserCheck, Leaf, CheckCircle, AlertCircle, Calendar } from "lucide-react";
import Topbar from "../../components/Topbar";

// ─── Types ───────────────────────────────────────────────────────────────────

type ActivityKey = "terrain" | "bureau" | "formation" | "repos";

interface Slot {
  label: string;
  type: ActivityKey;
  hours: number;
}

interface Employee {
  name: string;
  role: string;
  schedule: [Slot | null, Slot | null, Slot | null, Slot | null, Slot | null, Slot | null, Slot | null];
}

// ─── Data ────────────────────────────────────────────────────────────────────

const DAYS = ["Lun 07", "Mar 08", "Mer 09", "Jeu 10", "Ven 11", "Sam 12", "Dim 13"];

const EMPLOYEES: Employee[] = [
  {
    name: "Koffi Amani",
    role: "DG",
    schedule: [
      { label: "Bureau + Compta", type: "bureau", hours: 8 },
      { label: "Réunion ANADER Soubré", type: "formation", hours: 8 },
      { label: "Bureau", type: "bureau", hours: 8 },
      { label: "Terrain EXP-001", type: "terrain", hours: 4 },
      { label: "Bureau", type: "bureau", hours: 8 },
      null,
      null,
    ],
  },
  {
    name: "Adjoua Messou",
    role: "Comptable",
    schedule: [
      { label: "Clôture juin SYSCOHADA", type: "bureau", hours: 8 },
      { label: "Bureau", type: "bureau", hours: 8 },
      { label: "Bureau", type: "bureau", hours: 8 },
      { label: "Bureau", type: "bureau", hours: 8 },
      { label: "Rapport BC", type: "bureau", hours: 6 },
      null,
      null,
    ],
  },
  {
    name: "Ibrahim Sawadogo",
    role: "Terrain",
    schedule: [
      { label: "Inspection PAR-A1/A2", type: "terrain", hours: 7 },
      { label: "Débroussaillage PAR-B1", type: "terrain", hours: 7 },
      { label: "Comptage cabosses PAR-A2", type: "terrain", hours: 7 },
      { label: "Rapport terrain RT-028", type: "bureau", hours: 4 },
      { label: "Suivi séchage LOT-047", type: "terrain", hours: 7 },
      { label: "Arrosage PAR-D1", type: "terrain", hours: 3 },
      null,
    ],
  },
  {
    name: "Akissi Yao",
    role: "Saisonnière",
    schedule: [
      { label: "Ramassage PAR-C1 anacarde", type: "terrain", hours: 8 },
      { label: "Ramassage PAR-C1", type: "terrain", hours: 8 },
      { label: "Tri anacarde", type: "terrain", hours: 8 },
      null,
      { label: "Aide séchage LOT-047", type: "terrain", hours: 6 },
      null,
      null,
    ],
  },
  {
    name: "Kofi Mensah",
    role: "Stagiaire",
    schedule: [
      { label: "Saisie données ERP", type: "bureau", hours: 8 },
      { label: "Formation ANADER avec Ibrahim", type: "formation", hours: 4 },
      { label: "Saisie données", type: "bureau", hours: 8 },
      { label: "Rapport de stage", type: "bureau", hours: 8 },
      { label: "Présentation mi-stage", type: "formation", hours: 3 },
      null,
      null,
    ],
  },
];

const SUMMARY = [
  { name: "Koffi Amani", statut: "CDI", planifie: 40, realise: 36, conges: "—", supp: "—" },
  { name: "Adjoua Messou", statut: "CDI", planifie: 40, realise: 38, conges: "—", supp: "—" },
  { name: "Ibrahim Sawadogo", statut: "CDI", planifie: 40, realise: 41, conges: "—", supp: "+1h (compensation S29)" },
  { name: "Akissi Yao", statut: "Saisonnière", planifie: 30, realise: 30, conges: "—", supp: "—" },
  { name: "Kofi Mensah", statut: "Stage", planifie: 32, realise: 31, conges: "—", supp: "—" },
];

const HOURS = [36, 38, 41, 30, 31];
const NAMES_SHORT = ["Koffi Amani", "Adjoua Messou", "Ibrahim Sawadogo", "Akissi Yao", "Kofi Mensah"];

const TASKS = [
  { task: "Rapport terrain hebdo RT-028", assign: "Ibrahim", date: "07/07", duree: "1h", statut: "done" as const },
  { task: "Réunion bilan mi-stage Kofi", assign: "Koffi + Ibrahim", date: "11/07", duree: "3h", statut: "progress" as const },
  { task: "Formation BPA saisonniers août (prép)", assign: "Ibrahim", date: "14/07", duree: "2h", statut: "planned" as const },
  { task: "Clôture paie juillet", assign: "Adjoua", date: "31/07", duree: "4h", statut: "upcoming" as const },
];

// ─── Style helpers ────────────────────────────────────────────────────────────

const SLOT_STYLES: Record<ActivityKey, string> = {
  terrain: "bg-[#1B5E20] text-white",
  bureau: "bg-[#E8F5E9] text-[#1B5E20]",
  formation: "bg-orange-100 text-orange-800",
  repos: "bg-gray-100 text-gray-400",
};

const STATUT_BADGE: Record<typeof TASKS[number]["statut"], { label: string; cls: string }> = {
  done: { label: "✅ Terminé", cls: "bg-green-100 text-green-700" },
  progress: { label: "🔵 En cours", cls: "bg-blue-100 text-blue-700" },
  planned: { label: "🟡 Planifié", cls: "bg-yellow-100 text-yellow-700" },
  upcoming: { label: "⏳ Prévu", cls: "bg-gray-100 text-gray-600" },
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function KpiCard({ icon: Icon, value, label, color = "text-[#2E7D32]" }: {
  icon: React.ElementType; value: string; label: string; color?: string;
}) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 flex items-start gap-4">
      <div className={`mt-0.5 ${color}`}><Icon size={22} /></div>
      <div>
        <p className="text-xl font-bold text-gray-800">{value}</p>
        <p className="text-xs text-gray-500 mt-0.5">{label}</p>
      </div>
    </div>
  );
}

function SlotCell({ slot }: { slot: Slot | null }) {
  if (!slot) {
    return (
      <td className="py-2 px-1">
        <span className="inline-flex items-center justify-center w-full">
          <span className="text-xs text-gray-300 font-medium">OFF</span>
        </span>
      </td>
    );
  }
  return (
    <td className="py-2 px-1">
      <div className={`rounded-lg px-1.5 py-1 text-center ${SLOT_STYLES[slot.type]}`}>
        <p className="text-[10px] font-medium leading-tight">{slot.label}</p>
        <p className="text-[9px] opacity-70 mt-0.5">{slot.hours}h</p>
      </div>
    </td>
  );
}

// ─── SVG Bar Chart ────────────────────────────────────────────────────────────

function HoursBarChart() {
  const W = 640, H = 220;
  const padL = 130, padR = 24, padT = 20, padB = 40;
  const maxH = Math.max(...HOURS);
  const chartW = W - padL - padR;
  const chartH = H - padT - padB;
  const barH = 22;
  const gap = (chartH - HOURS.length * barH) / (HOURS.length + 1);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" aria-label="Heures travaillées par employé — Semaine 28">
      {/* Grid lines */}
      {[0, 10, 20, 30, 40].map(v => {
        const x = padL + (v / maxH) * chartW;
        return (
          <g key={v}>
            <line x1={x} y1={padT} x2={x} y2={H - padB} stroke="#e5e7eb" strokeWidth={0.5} />
            <text x={x} y={H - padB + 14} textAnchor="middle" fontSize={9} fill="#9ca3af">{v}h</text>
          </g>
        );
      })}
      {/* Bars */}
      {HOURS.map((h, i) => {
        const y = padT + gap + i * (barH + gap);
        const bw = (h / maxH) * chartW;
        const color = i === 2 ? "#E65100" : "#2E7D32"; // Ibrahim en surcharge
        return (
          <g key={i}>
            <text x={padL - 8} y={y + barH / 2 + 4} textAnchor="end" fontSize={10} fill="#374151">{NAMES_SHORT[i]}</text>
            <rect x={padL} y={y} width={bw} height={barH} fill={color} rx={4} opacity={0.88} />
            <text x={padL + bw + 6} y={y + barH / 2 + 4} fontSize={10} fill={color} fontWeight="600">{h}h</text>
          </g>
        );
      })}
    </svg>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PlanningRHPage() {
  const [week] = useState("Sem. 28 — Jul 2025");

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-gray-50">
      <Topbar breadcrumb={["RH", "Planning RH"]} />

      <main className="flex-1 p-6 space-y-6">

        {/* ── Header ── */}
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Planning RH</h1>
            <p className="text-sm text-gray-500 mt-0.5">Planification des équipes — Semaine du 07 au 13 juillet 2025</p>
          </div>
          {/* Week navigation */}
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1 rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors">
              <ChevronLeft size={14} /> Sem. précédente
            </button>
            <span className="px-4 py-2 rounded-xl bg-[#2E7D32] text-white text-xs font-semibold">{week}</span>
            <button className="flex items-center gap-1 rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors">
              Sem. suivante <ChevronRight size={14} />
            </button>
          </div>
        </div>

        {/* ── KPIs ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <KpiCard icon={Users} value="5" label="Personnes planifiées" />
          <KpiCard icon={Clock} value="32 h/sem." label="Heures moy. / semaine" />
          <KpiCard icon={CheckCircle} value="0 absence" label="Aucune absence cette semaine" color="text-green-600" />
          <KpiCard icon={Leaf} value="2 saisonniers" label="Actifs cette semaine" color="text-orange-500" />
        </div>

        {/* ── Planning grid ── */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 overflow-x-auto">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-800">Planning de la semaine</h2>
            <div className="flex items-center gap-3 flex-wrap">
              <span className="flex items-center gap-1.5 text-xs text-gray-500">
                <span className="w-3 h-3 rounded-sm bg-[#1B5E20] inline-block" /> Terrain
              </span>
              <span className="flex items-center gap-1.5 text-xs text-gray-500">
                <span className="w-3 h-3 rounded-sm bg-[#E8F5E9] border border-[#1B5E20] inline-block" /> Bureau
              </span>
              <span className="flex items-center gap-1.5 text-xs text-gray-500">
                <span className="w-3 h-3 rounded-sm bg-orange-100 inline-block" /> Formation
              </span>
              <span className="flex items-center gap-1.5 text-xs text-gray-500">
                <span className="w-3 h-3 rounded-sm bg-gray-100 inline-block" /> Repos
              </span>
            </div>
          </div>

          <table className="w-full text-xs min-w-[900px]">
            <thead>
              <tr className="bg-[#F8FBF8]">
                <th className="text-left py-2 px-3 font-medium text-gray-600 rounded-l-lg w-40">Employé</th>
                {DAYS.map(d => (
                  <th key={d} className="text-center py-2 px-1 font-medium text-gray-600 w-[11%]">{d}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {EMPLOYEES.map((emp, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="py-2.5 px-3">
                    <p className="font-semibold text-gray-800">{emp.name}</p>
                    <p className="text-[10px] text-gray-400">{emp.role}</p>
                  </td>
                  {emp.schedule.map((slot, j) => (
                    <SlotCell key={j} slot={slot} />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ── Chart + Récapitulatif ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Bar chart */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5">
            <h2 className="font-semibold text-gray-800 mb-4">Heures travaillées — Semaine 28</h2>
            <HoursBarChart />
            <p className="text-[10px] text-gray-400 mt-2 text-center">
              Orange = heures supplémentaires (Ibrahim : 41h / 40h planifiées)
            </p>
          </div>

          {/* Summary table */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 overflow-x-auto">
            <h2 className="font-semibold text-gray-800 mb-4">Récapitulatif — Semaine 28</h2>
            <table className="w-full text-xs min-w-[420px]">
              <thead>
                <tr className="bg-[#F8FBF8]">
                  {["Employé", "Statut", "Planifié", "Réalisé", "Congés", "Heures supp."].map(h => (
                    <th key={h} className="text-left py-2 px-2 font-medium text-gray-600">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {SUMMARY.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="py-2.5 px-2 font-medium text-gray-800">{row.name}</td>
                    <td className="py-2.5 px-2">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                        row.statut === "CDI" ? "bg-green-100 text-green-700"
                          : row.statut === "Saisonnière" ? "bg-orange-100 text-orange-700"
                          : "bg-blue-100 text-blue-700"
                      }`}>{row.statut}</span>
                    </td>
                    <td className="py-2.5 px-2 text-gray-600">{row.planifie}h</td>
                    <td className={`py-2.5 px-2 font-semibold ${row.realise > row.planifie ? "text-orange-600" : "text-gray-800"}`}>
                      {row.realise}h
                    </td>
                    <td className="py-2.5 px-2 text-gray-400">{row.conges}</td>
                    <td className={`py-2.5 px-2 text-xs ${row.supp !== "—" ? "text-orange-600 font-medium" : "text-gray-400"}`}>
                      {row.supp}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Absences & congés ── */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 space-y-4">
          <h2 className="font-semibold text-gray-800">Absences et congés</h2>

          {/* No absence banner */}
          <div className="flex items-center gap-3 p-4 rounded-xl bg-green-50 border border-green-100">
            <CheckCircle size={18} className="text-green-600 shrink-0" />
            <p className="text-sm text-green-800 font-medium">Aucune absence cette semaine ✅</p>
          </div>

          {/* Planned leave */}
          <div className="space-y-2">
            <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Congés planifiés</p>
            <div className="flex items-start gap-3 p-4 rounded-xl bg-[#E8F5E9] border border-green-200">
              <Calendar size={16} className="text-[#2E7D32] mt-0.5 shrink-0" />
              <div className="space-y-1">
                <p className="text-sm text-gray-800">
                  <span className="font-semibold">Koffi Amani</span> — Congé annuel <span className="font-medium">28 jul – 08 aug 2025</span>
                  <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">Prévu — 12 jours</span>
                </p>
                <p className="text-sm text-gray-800">
                  <span className="font-semibold">Akissi Yao</span> — Fin contrat saisonnier <span className="font-medium">15 sept 2025</span>
                  <span className="ml-2 text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">En cours</span>
                </p>
              </div>
            </div>
          </div>

          {/* August outlook */}
          <div className="space-y-2">
            <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Prévisionnel août</p>
            <div className="overflow-x-auto">
              <table className="w-full text-xs min-w-[500px]">
                <thead>
                  <tr className="bg-[#F8FBF8]">
                    {["Période", "Situation", "Impact"].map(h => (
                      <th key={h} className="text-left py-2 px-3 font-medium text-gray-600">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  <tr className="hover:bg-gray-50">
                    <td className="py-2.5 px-3 font-medium text-gray-700">28/07 → 08/08</td>
                    <td className="py-2.5 px-3 text-gray-600">DG en congé</td>
                    <td className="py-2.5 px-3 text-green-700 font-medium">Ibrahim + Adjoua assurent — OK</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-2.5 px-3 font-medium text-gray-700">Grande récolte (oct)</td>
                    <td className="py-2.5 px-3 text-gray-600">Besoin 4 saisonniers supp.</td>
                    <td className="py-2.5 px-3 text-orange-600 font-medium">Recruter avant 15/09</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ── Tasks ── */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="font-semibold text-gray-800 mb-4">Tâches planifiées cette semaine</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs min-w-[560px]">
              <thead>
                <tr className="bg-[#F8FBF8]">
                  {["Tâche", "Assigné", "Date", "Durée", "Statut"].map(h => (
                    <th key={h} className="text-left py-2 px-3 font-medium text-gray-600">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {TASKS.map((t, i) => {
                  const badge = STATUT_BADGE[t.statut];
                  return (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="py-2.5 px-3 font-medium text-gray-800">{t.task}</td>
                      <td className="py-2.5 px-3 text-gray-600">{t.assign}</td>
                      <td className="py-2.5 px-3 text-gray-500">{t.date}</td>
                      <td className="py-2.5 px-3 text-gray-500">{t.duree}</td>
                      <td className="py-2.5 px-3">
                        <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-medium ${badge.cls}`}>
                          {badge.label}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

      </main>
    </div>
  );
}
