"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Users, Clock, AlertTriangle, TrendingUp } from "lucide-react";
import Topbar from "../../components/Topbar";

// ─── Types ────────────────────────────────────────────────────────────────────

type ActivityType = "terrain" | "bureau" | "maintenance" | "formation" | "absent" | "hs" | "repos";

interface Cell {
  label: string;
  type: ActivityType;
}

interface EmployeRow {
  nom: string;
  poste: string;
  semaine: (Cell | null)[];
}

interface EquipeGroup {
  nom: string;
  employes: EmployeRow[];
}

// ─── Config couleurs ──────────────────────────────────────────────────────────

const ACTIVITY_STYLES: Record<ActivityType, string> = {
  terrain:     "bg-green-100 text-green-800",
  bureau:      "bg-blue-100 text-blue-800",
  maintenance: "bg-amber-100 text-amber-800",
  formation:   "bg-purple-100 text-purple-800",
  absent:      "bg-red-100 text-red-800",
  hs:          "bg-orange-100 text-orange-800",
  repos:       "bg-gray-100 text-gray-500",
};

// ─── Données ──────────────────────────────────────────────────────────────────

const JOURS = ["Lun 07", "Mar 08", "Mer 09", "Jeu 10", "Ven 11", "Sam 12", "Dim 13"];

const EQUIPES: EquipeGroup[] = [
  {
    nom: "Équipe Direction",
    employes: [
      {
        nom: "Jean-Baptiste K.", poste: "DAF",
        semaine: [
          { label: "Bureau", type: "bureau" },
          { label: "Bureau", type: "bureau" },
          { label: "Bureau", type: "bureau" },
          { label: "Bureau", type: "bureau" },
          { label: "Bureau", type: "bureau" },
          null,
          null,
        ],
      },
      {
        nom: "Mariam Kouyaté", poste: "DRH",
        semaine: [
          { label: "Bureau", type: "bureau" },
          { label: "Bureau", type: "bureau" },
          { label: "Bureau", type: "bureau" },
          { label: "Bureau", type: "bureau" },
          { label: "Bureau", type: "bureau" },
          null,
          null,
        ],
      },
      {
        nom: "Kouassi Diomandé", poste: "Administration",
        semaine: [
          { label: "Bureau", type: "bureau" },
          { label: "Bureau", type: "bureau" },
          { label: "Bureau", type: "bureau" },
          { label: "Bureau", type: "bureau" },
          { label: "Bureau", type: "bureau" },
          null,
          null,
        ],
      },
    ],
  },
  {
    nom: "Équipe Terrain Cacao",
    employes: [
      {
        nom: "Ibrahim Sawadogo", poste: "Technicien",
        semaine: [
          { label: "PAR-A1 Taille", type: "terrain" },
          { label: "PAR-A1 Taille", type: "terrain" },
          { label: "PAR-A3", type: "terrain" },
          { label: "PAR-A3", type: "terrain" },
          { label: "PAR-A1", type: "terrain" },
          { label: "HS Récolte", type: "hs" },
          null,
        ],
      },
      {
        nom: "Konan Yao", poste: "Chef parcelle",
        semaine: [
          { label: "PAR-B1", type: "terrain" },
          { label: "PAR-B1", type: "terrain" },
          { label: "PAR-B2", type: "terrain" },
          { label: "PAR-D1", type: "terrain" },
          { label: "PAR-D2", type: "terrain" },
          null,
          null,
        ],
      },
      {
        nom: "Soro Fatoumata", poste: "Contrôle qualité",
        semaine: [
          { label: "Bureau", type: "bureau" },
          { label: "Contrôle stock", type: "maintenance" },
          { label: "Contrôle stock", type: "maintenance" },
          { label: "Bureau", type: "bureau" },
          { label: "Bureau", type: "bureau" },
          null,
          null,
        ],
      },
      {
        nom: "Diallo Aminata", poste: "Technicienne",
        semaine: [
          { label: "PAR-A3", type: "terrain" },
          { label: "PAR-A3", type: "terrain" },
          { label: "Bureau", type: "bureau" },
          { label: "Bureau", type: "bureau" },
          { label: "PAR-D2", type: "terrain" },
          null,
          null,
        ],
      },
      {
        nom: "Ouattara Seydou", poste: "Opérateur séchoir",
        semaine: [
          { label: "Séchoir A", type: "maintenance" },
          { label: "Séchoir A", type: "maintenance" },
          { label: "Séchoir B", type: "maintenance" },
          { label: "Séchoir B", type: "maintenance" },
          { label: "Séchoir A", type: "maintenance" },
          null,
          null,
        ],
      },
      {
        nom: "Coulibaly Roger", poste: "Magasinier",
        semaine: [
          { label: "Entrepôt", type: "bureau" },
          { label: "Entrepôt", type: "bureau" },
          { label: "Entrepôt", type: "bureau" },
          { label: "Entrepôt", type: "bureau" },
          { label: "Entrepôt", type: "bureau" },
          null,
          null,
        ],
      },
    ],
  },
  {
    nom: "Équipe Matériels",
    employes: [
      {
        nom: "Bamba Oumar", poste: "Mécanicien chef",
        semaine: [
          { label: "Maintenance", type: "maintenance" },
          { label: "Transport", type: "terrain" },
          { label: "Transport", type: "terrain" },
          { label: "Tracteur PAR-D", type: "maintenance" },
          { label: "Transport", type: "terrain" },
          null,
          null,
        ],
      },
      {
        nom: "Traoré Mamadou", poste: "Mécanicien",
        semaine: [
          { label: "Révision JD", type: "maintenance" },
          { label: "Révision JD", type: "maintenance" },
          { label: "Irrigation", type: "terrain" },
          { label: "Irrigation", type: "terrain" },
          { label: "Irrigation", type: "terrain" },
          null,
          null,
        ],
      },
      {
        nom: "Koné Eric", poste: "Mécanicien",
        semaine: [
          { label: "Entretien", type: "maintenance" },
          { label: "Entretien", type: "maintenance" },
          { label: "Transport", type: "terrain" },
          { label: "Transport", type: "terrain" },
          { label: "Transport", type: "terrain" },
          null,
          null,
        ],
      },
    ],
  },
  {
    nom: "Équipe Comptabilité / Finance",
    employes: [
      {
        nom: "Adjoua Messou", poste: "Comptable",
        semaine: [
          { label: "Saisie", type: "bureau" },
          { label: "Saisie", type: "bureau" },
          { label: "Clôture", type: "bureau" },
          { label: "Clôture", type: "bureau" },
          { label: "Rapport", type: "bureau" },
          null,
          null,
        ],
      },
      {
        nom: "Laurent Bi", poste: "Facturation",
        semaine: [
          { label: "Facturation", type: "bureau" },
          { label: "Facturation", type: "bureau" },
          { label: "Facturation", type: "bureau" },
          { label: "Recouvrement", type: "bureau" },
          { label: "Recouvrement", type: "bureau" },
          null,
          null,
        ],
      },
      {
        nom: "Ouédraogo A.", poste: "Paie",
        semaine: [
          { label: "Paie", type: "bureau" },
          { label: "Paie", type: "bureau" },
          { label: "Paie", type: "bureau" },
          { label: "Contrôle", type: "bureau" },
          { label: "Bureau", type: "bureau" },
          null,
          null,
        ],
      },
    ],
  },
];

// ─── KPI Card ─────────────────────────────────────────────────────────────────

function KpiCard({
  icon,
  label,
  value,
  sub,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub?: string;
  color: string;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 flex items-start gap-4 shadow-sm">
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
        {icon}
      </div>
      <div>
        <div className="text-2xl font-bold text-gray-900 leading-tight">{value}</div>
        <div className="text-sm text-gray-500 mt-0.5">{label}</div>
        {sub && <div className="text-xs text-gray-400 mt-0.5">{sub}</div>}
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function PlanningRHPage() {
  const [vue, setVue] = useState<"semaine" | "mois" | "liste">("semaine");

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Topbar title="Planning du Personnel" breadcrumb={["RH", "Planning RH"]} />

      <div className="flex-1 p-6 space-y-6">

        {/* ── Navigation semaine ─────────────────────────────────────────── */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition-colors">
              <ChevronLeft size={16} className="text-gray-600" />
            </button>
            <span className="text-sm font-semibold text-gray-800 px-3 py-1.5 bg-white border border-gray-200 rounded-lg">
              Semaine du 7 au 13 juillet 2025
            </span>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition-colors">
              <ChevronRight size={16} className="text-gray-600" />
            </button>
          </div>
          <div className="flex gap-1.5">
            {(["semaine", "mois", "liste"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setVue(v)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors capitalize ${
                  vue === v
                    ? "bg-[#2E7D32] text-white"
                    : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                {v === "semaine" ? "Cette semaine" : v === "mois" ? "Mois" : "Vue liste"}
              </button>
            ))}
          </div>
        </div>

        {/* ── KPIs ───────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard
            icon={<Users size={20} className="text-green-700" />}
            label="Employés planifiés"
            value="28/287"
            sub="cadres / techniciens"
            color="bg-green-100"
          />
          <KpiCard
            icon={<Clock size={20} className="text-blue-700" />}
            label="Heures prévues"
            value="224h"
            sub="cette semaine"
            color="bg-blue-100"
          />
          <KpiCard
            icon={<AlertTriangle size={20} className="text-red-700" />}
            label="Absences"
            value="2"
            sub="dont 1 maladie"
            color="bg-red-100"
          />
          <KpiCard
            icon={<TrendingUp size={20} className="text-orange-700" />}
            label="Heures supplémentaires"
            value="18h"
            sub="semaine en cours"
            color="bg-orange-100"
          />
        </div>

        {/* ── Légende ────────────────────────────────────────────────────── */}
        <div className="flex flex-wrap gap-2">
          {(
            [
              ["bg-green-100 text-green-800", "Terrain / Parcelle"],
              ["bg-blue-100 text-blue-800", "Bureau / Admin"],
              ["bg-amber-100 text-amber-800", "Maintenance / Technique"],
              ["bg-purple-100 text-purple-800", "Formation"],
              ["bg-red-100 text-red-800", "Absent / Congé"],
              ["bg-orange-100 text-orange-800", "HS (Heures supp.)"],
              ["bg-gray-100 text-gray-500", "Repos"],
            ] as [string, string][]
          ).map(([cls, label]) => (
            <span key={label} className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${cls}`}>
              {label}
            </span>
          ))}
        </div>

        {/* ── Grille de planning ─────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">Grille de planning hebdomadaire</h2>
            <p className="text-xs text-gray-400 mt-0.5">07 – 13 juillet 2025</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[900px]">
              <thead>
                <tr className="bg-[#F8FBF8] border-b border-gray-100">
                  <th className="text-left px-5 py-3 font-semibold text-gray-600 w-52">Équipe / Employé</th>
                  {JOURS.map((j) => (
                    <th key={j} className="px-3 py-3 text-center text-xs font-semibold text-gray-500 min-w-[110px]">
                      {j}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {EQUIPES.map((equipe) => (
                  <>
                    <tr key={equipe.nom} className="bg-gray-50">
                      <td
                        colSpan={8}
                        className="px-5 py-2 text-xs font-bold text-[#2E7D32] uppercase tracking-wide border-t border-gray-200"
                      >
                        {equipe.nom}
                      </td>
                    </tr>
                    {equipe.employes.map((emp) => (
                      <tr key={emp.nom} className="border-t border-gray-50 hover:bg-gray-50/50 transition-colors">
                        <td className="px-5 py-3">
                          <div className="font-medium text-gray-800 text-sm">{emp.nom}</div>
                          <div className="text-xs text-gray-400">{emp.poste}</div>
                        </td>
                        {emp.semaine.map((cell, i) => (
                          <td key={i} className="px-2 py-3 text-center">
                            {cell ? (
                              <span
                                className={`inline-block text-[10px] font-semibold px-2 py-1 rounded-lg leading-tight ${ACTIVITY_STYLES[cell.type]}`}
                              >
                                {cell.label}
                              </span>
                            ) : (
                              <span className="inline-block text-[10px] font-semibold px-2 py-1 rounded-lg bg-gray-100 text-gray-400">
                                —
                              </span>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Congés & Absences ──────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h2 className="font-semibold text-gray-900 mb-4">Congés & Absences — semaine du 7/07</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-4 p-3 rounded-xl bg-green-50 border border-green-100">
              <span className="text-base">✅</span>
              <div>
                <div className="text-sm font-semibold text-gray-800">Traoré Ibrahima</div>
                <div className="text-xs text-gray-500">Congé annuel · 07-14/07 · <span className="text-green-700 font-medium">Validé</span></div>
              </div>
            </div>
            <div className="flex items-center gap-4 p-3 rounded-xl bg-amber-50 border border-amber-100">
              <span className="text-base">⚠️</span>
              <div>
                <div className="text-sm font-semibold text-gray-800">Kouyaté Ali</div>
                <div className="text-xs text-gray-500">Maladie · 08/07 · <span className="text-amber-700 font-medium">Certificat reçu</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Alertes planning ───────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h2 className="font-semibold text-gray-900 mb-4">Alertes planning</h2>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 rounded-xl bg-yellow-50 border border-yellow-200">
              <span className="text-base mt-0.5">🟡</span>
              <div className="text-sm text-gray-700">
                <span className="font-semibold">3 employés sans planning défini</span> pour la semaine prochaine (14-20/07) — Saisir avant le 12/07.
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-xl bg-blue-50 border border-blue-200">
              <span className="text-base mt-0.5">🔵</span>
              <div className="text-sm text-gray-700">
                <span className="font-semibold">Récolte principale Oct 2025 :</span> planifier recrutement 8-10 saisonniers avant le 15/09.
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
