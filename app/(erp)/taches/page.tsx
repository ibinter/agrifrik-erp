"use client";

import { useState } from "react";
import Topbar from "../../components/Topbar";
import {
  Plus,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ClipboardList,
  User,
  Tag,
  History,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

type Priorite = "urgent" | "haute" | "normale";
type Colonne = "todo" | "encours" | "revision" | "termine";

interface Tache {
  id: number;
  titre: string;
  assigne: string;
  echeance: string;
  badge: string;
  priorite: Priorite;
  colonne: Colonne;
  progression?: number;
  soumisLe?: string;
}

// ─── Données ─────────────────────────────────────────────────────────────────

const TACHES: Tache[] = [
  // À faire
  {
    id: 1,
    titre: "Commander KCl engrais (200 kg) — YARA Nederland",
    assigne: "Jean-Baptiste K.",
    echeance: "Avant 12/07",
    badge: "Achats",
    priorite: "urgent",
    colonne: "todo",
  },
  {
    id: 2,
    titre: "Séchage d'urgence LOT-032 Anacarde (humidité 12,4%)",
    assigne: "Ibrahim Sawadogo",
    echeance: "Avant 11/07 18h",
    badge: "Qualité",
    priorite: "urgent",
    colonne: "todo",
  },
  {
    id: 3,
    titre: "Traitement préventif mildiou PAR-B1 (Ridomil Gold)",
    assigne: "Ibrahim Sawadogo",
    echeance: "11/07 matin",
    badge: "Production",
    priorite: "haute",
    colonne: "todo",
  },
  {
    id: 4,
    titre: "Sécuriser bâches séchoir B avant pluies 12/07",
    assigne: "Bamba Oumar",
    echeance: "11/07 midi",
    badge: "Logistique",
    priorite: "haute",
    colonne: "todo",
  },
  {
    id: 5,
    titre: "Préparer dossier renouvellement contrat TOTAL Énergie",
    assigne: "Jean-Baptiste K.",
    echeance: "30/09/2025",
    badge: "Finance",
    priorite: "normale",
    colonne: "todo",
  },
  {
    id: 6,
    titre: "Recruter 8 saisonniers pour récolte principale Oct 2025",
    assigne: "Mariam Kouyaté",
    echeance: "15/09/2025",
    badge: "RH",
    priorite: "normale",
    colonne: "todo",
  },
  // En cours
  {
    id: 7,
    titre: "Audit interne Rainforest Alliance — Préparer dossier",
    assigne: "Ibrahim Sawadogo",
    echeance: "15/09",
    badge: "Qualité",
    priorite: "haute",
    colonne: "encours",
    progression: 35,
  },
  {
    id: 8,
    titre: "Planning récolte cacao Oct-Nov 2025 (PAR-A1, A3, B1)",
    assigne: "Mariam Kouyaté",
    echeance: "31/08",
    badge: "Production",
    priorite: "normale",
    colonne: "encours",
    progression: 60,
  },
  {
    id: 9,
    titre: "Rapport bailleur FAO Q2 2025",
    assigne: "Adjoua Messou",
    echeance: "20/07",
    badge: "Rapports",
    priorite: "normale",
    colonne: "encours",
    progression: 80,
  },
  {
    id: 10,
    titre: "Négociation parcelles PAR-E3/E4 (3,6 ha)",
    assigne: "Admin",
    echeance: "31/07",
    badge: "Terres",
    priorite: "normale",
    colonne: "encours",
    progression: 45,
  },
  // En révision
  {
    id: 11,
    titre: "Rapport terrain RT-2025-048 — PAR-A3",
    assigne: "Ibrahim S.",
    echeance: "",
    badge: "Terrain",
    priorite: "normale",
    colonne: "revision",
    soumisLe: "09/07",
  },
  {
    id: 12,
    titre: "Budget investissement drone supplémentaire",
    assigne: "Jean-Baptiste K.",
    echeance: "",
    badge: "Finance",
    priorite: "normale",
    colonne: "revision",
    soumisLe: "08/07",
  },
  {
    id: 13,
    titre: "Contrat Ritter Sport — version finale",
    assigne: "Admin",
    echeance: "",
    badge: "Commerce",
    priorite: "normale",
    colonne: "revision",
    soumisLe: "07/07",
  },
  {
    id: 14,
    titre: "Plan formation sécurité Q3 2025",
    assigne: "Mariam K.",
    echeance: "",
    badge: "RH",
    priorite: "normale",
    colonne: "revision",
    soumisLe: "06/07",
  },
];

// ─── Config priorité ──────────────────────────────────────────────────────────

const PRIORITE: Record<Priorite, { label: string; dot: string; text: string; bg: string }> = {
  urgent: {
    label: "URGENT",
    dot: "bg-red-500",
    text: "text-red-700 dark:text-red-400",
    bg: "bg-red-50 dark:bg-red-900/20",
  },
  haute: {
    label: "HAUTE",
    dot: "bg-amber-500",
    text: "text-amber-700 dark:text-amber-400",
    bg: "bg-amber-50 dark:bg-amber-900/20",
  },
  normale: {
    label: "NORMALE",
    dot: "bg-blue-500",
    text: "text-blue-700 dark:text-blue-400",
    bg: "bg-blue-50 dark:bg-blue-900/20",
  },
};

// ─── Sous-composants ──────────────────────────────────────────────────────────

function BadgePriorite({ p }: { p: Priorite }) {
  const cfg = PRIORITE[p];
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${cfg.bg} ${cfg.text}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
}

function BadgeModule({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400">
      <Tag size={9} />
      {label}
    </span>
  );
}

function AvatarMini({ nom }: { nom: string }) {
  const initiales = nom
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <div className="w-5 h-5 rounded-full bg-[#2E7D32] flex items-center justify-center text-white text-[9px] font-bold shrink-0">
      {initiales}
    </div>
  );
}

function CarteTodo({ t }: { t: Tache }) {
  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between gap-2 mb-2">
        <BadgePriorite p={t.priorite} />
        <BadgeModule label={t.badge} />
      </div>
      <p className="text-sm font-medium text-gray-800 dark:text-gray-100 mb-3 leading-snug">
        {t.titre}
      </p>
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <AvatarMini nom={t.assigne} />
          <span className="text-[11px] text-gray-500 dark:text-gray-400 truncate max-w-[100px]">
            {t.assigne}
          </span>
        </div>
        {t.echeance && (
          <div className="flex items-center gap-1 text-[11px] text-gray-400">
            <Clock size={11} />
            {t.echeance}
          </div>
        )}
      </div>
    </div>
  );
}

function CarteEnCours({ t }: { t: Tache }) {
  const prog = t.progression ?? 0;
  const barColor =
    prog >= 70 ? "bg-green-500" : prog >= 40 ? "bg-amber-500" : "bg-blue-500";
  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between gap-2 mb-2">
        <BadgePriorite p={t.priorite} />
        <BadgeModule label={t.badge} />
      </div>
      <p className="text-sm font-medium text-gray-800 dark:text-gray-100 mb-3 leading-snug">
        {t.titre}
      </p>
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-1.5">
          <AvatarMini nom={t.assigne} />
          <span className="text-[11px] text-gray-500 dark:text-gray-400 truncate max-w-[100px]">
            {t.assigne}
          </span>
        </div>
        {t.echeance && (
          <div className="flex items-center gap-1 text-[11px] text-gray-400">
            <Clock size={11} />
            {t.echeance}
          </div>
        )}
      </div>
      <div>
        <div className="flex justify-between text-[10px] text-gray-400 mb-1">
          <span>Progression</span>
          <span className="font-medium">{prog}%</span>
        </div>
        <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all ${barColor}`}
            style={{ width: `${prog}%` }}
          />
        </div>
      </div>
    </div>
  );
}

function CarteRevision({ t }: { t: Tache }) {
  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-1.5 mb-2">
        <CheckCircle2 size={13} className="text-green-600 shrink-0" />
        <span className="text-[10px] font-semibold text-green-600 dark:text-green-400">
          Soumis le {t.soumisLe}
        </span>
      </div>
      <p className="text-sm font-medium text-gray-800 dark:text-gray-100 mb-3 leading-snug">
        {t.titre}
      </p>
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <AvatarMini nom={t.assigne} />
          <span className="text-[11px] text-gray-500 dark:text-gray-400">{t.assigne}</span>
        </div>
        <BadgeModule label={t.badge} />
      </div>
    </div>
  );
}

// ─── Colonne Kanban ───────────────────────────────────────────────────────────

function ColonneKanban({
  titre,
  count,
  headerColor,
  children,
}: {
  titre: string;
  count: number;
  headerColor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex-1 min-w-[240px] flex flex-col">
      <div
        className={`flex items-center justify-between px-4 py-3 rounded-t-xl ${headerColor}`}
      >
        <h3 className="text-sm font-semibold text-white">{titre}</h3>
        <span className="bg-white/25 text-white text-xs font-bold px-2 py-0.5 rounded-full">
          {count}
        </span>
      </div>
      <div className="flex-1 bg-gray-100/70 dark:bg-gray-900/40 rounded-b-xl p-3 flex flex-col gap-3 min-h-[300px] overflow-y-auto">
        {children}
      </div>
    </div>
  );
}

// ─── KPI ─────────────────────────────────────────────────────────────────────

function KpiCard({
  label,
  valeur,
  icon: Icon,
  couleur,
}: {
  label: string;
  valeur: number | string;
  icon: React.ElementType;
  couleur: string;
}) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white dark:bg-gray-800 dark:border-gray-700 p-5 flex items-center gap-4 shadow-sm">
      <div className={`w-11 h-11 rounded-xl ${couleur} flex items-center justify-center shrink-0`}>
        <Icon size={20} className="text-white" />
      </div>
      <div>
        <p className="text-2xl font-bold text-gray-900 dark:text-white">{valeur}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{label}</p>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

type FiltreChip = "toutes" | "mes" | "urgentes";

const ASSIGNES = ["Tous", "Ibrahim Sawadogo", "Mariam Kouyaté", "Jean-Baptiste K.", "Bamba Oumar", "Adjoua Messou", "Admin"];
const PROJETS = ["Tous les projets", "Cacao", "Anacarde", "RH", "Finance", "Logistique"];

export default function TachesPage() {
  const [chip, setChip] = useState<FiltreChip>("toutes");
  const [assigne, setAssigne] = useState("Tous");
  const [projet, setProjet] = useState("Tous les projets");

  const filtrer = (taches: Tache[]) =>
    taches.filter((t) => {
      if (chip === "urgentes" && t.priorite !== "urgent") return false;
      if (assigne !== "Tous" && !t.assigne.includes(assigne.split(" ")[0])) return false;
      return true;
    });

  const todo = filtrer(TACHES.filter((t) => t.colonne === "todo"));
  const encours = filtrer(TACHES.filter((t) => t.colonne === "encours"));
  const revision = filtrer(TACHES.filter((t) => t.colonne === "revision"));

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <Topbar title="Gestion des Tâches" breadcrumb={["Collaboration", "Tâches"]} />

      <div className="flex-1 p-6 space-y-6">
        {/* KPIs */}
        <div className="grid grid-cols-3 gap-4">
          <KpiCard label="Tâches totales" valeur={42} icon={ClipboardList} couleur="bg-[#2E7D32]" />
          <KpiCard label="En retard" valeur={3} icon={AlertTriangle} couleur="bg-red-500" />
          <KpiCard label="Terminées ce mois" valeur={28} icon={CheckCircle2} couleur="bg-blue-600" />
        </div>

        {/* Barre filtres + bouton */}
        <div className="flex items-center gap-3 flex-wrap">
          {/* Chips */}
          {(
            [
              { key: "toutes", label: "Toutes" },
              { key: "mes", label: "Mes tâches" },
              { key: "urgentes", label: "Urgentes" },
            ] as { key: FiltreChip; label: string }[]
          ).map((c) => (
            <button
              key={c.key}
              onClick={() => setChip(c.key)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${
                chip === c.key
                  ? "bg-[#2E7D32] text-white"
                  : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-green-500"
              }`}
            >
              {c.label}
            </button>
          ))}

          {/* Select assigné */}
          <div className="flex items-center gap-1.5">
            <User size={13} className="text-gray-400" />
            <select
              value={assigne}
              onChange={(e) => setAssigne(e.target.value)}
              className="text-xs border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {ASSIGNES.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
          </div>

          {/* Select projet */}
          <div className="flex items-center gap-1.5">
            <Tag size={13} className="text-gray-400" />
            <select
              value={projet}
              onChange={(e) => setProjet(e.target.value)}
              className="text-xs border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {PROJETS.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          {/* Bouton nouvelle tâche */}
          <div className="ml-auto">
            <button className="flex items-center gap-2 px-4 py-2 bg-[#2E7D32] hover:bg-[#1B5E20] text-white rounded-xl text-xs font-medium transition-colors shadow-sm">
              <Plus size={14} />
              Nouvelle tâche
            </button>
          </div>
        </div>

        {/* Kanban */}
        <div className="flex gap-4 items-start overflow-x-auto pb-4">
          {/* À faire */}
          <ColonneKanban titre="À faire" count={12} headerColor="bg-blue-600">
            {todo.map((t) => (
              <CarteTodo key={t.id} t={t} />
            ))}
          </ColonneKanban>

          {/* En cours */}
          <ColonneKanban titre="En cours" count={8} headerColor="bg-amber-500">
            {encours.map((t) => (
              <CarteEnCours key={t.id} t={t} />
            ))}
          </ColonneKanban>

          {/* En révision */}
          <ColonneKanban titre="En révision" count={4} headerColor="bg-purple-600">
            {revision.map((t) => (
              <CarteRevision key={t.id} t={t} />
            ))}
          </ColonneKanban>

          {/* Terminé */}
          <ColonneKanban titre="Terminé" count={28} headerColor="bg-[#2E7D32]">
            <div className="flex flex-col items-center justify-center flex-1 py-10 gap-4 text-center">
              <div className="w-14 h-14 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <CheckCircle2 size={28} className="text-[#2E7D32]" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">28</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  tâches terminées ce mois
                </p>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 text-xs font-medium border border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <History size={13} />
                Voir l&apos;historique
              </button>
            </div>
          </ColonneKanban>
        </div>
      </div>
    </div>
  );
}
