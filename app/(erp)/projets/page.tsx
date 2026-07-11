"use client";

import { useState } from "react";
import Topbar from "../../components/Topbar";
import {
  FolderOpen,
  Wallet,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Circle,
  Clock,
  AlertCircle,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type EtapeStatut = "done" | "active" | "todo";

interface Etape {
  label: string;
  statut: EtapeStatut;
}

interface Projet {
  id: string;
  titre: string;
  emoji: string;
  ref: string;
  budget: number;
  depense: number;
  chef: string;
  debut: string;
  fin: string;
  avancement: number;
  statut: "actif" | "planifie" | "termine";
  etapes: Etape[];
  note?: string;
  alerte?: string;
  succes?: string;
  badge?: string;
  color: string;
  ganttStart: number; // mois 1-12
  ganttEnd: number;
}

// ─── Données ──────────────────────────────────────────────────────────────────

const projets: Projet[] = [
  {
    id: "PRJ-2025-001",
    titre: "Extension surface cacao",
    emoji: "🌿",
    ref: "PRJ-2025-001",
    budget: 28400000,
    depense: 14200000,
    chef: "Ibrahim Sawadogo",
    debut: "Jan 2025",
    fin: "Déc 2025",
    avancement: 52,
    statut: "actif",
    etapes: [
      { label: "Acquisition terres", statut: "done" },
      { label: "Défrichage", statut: "done" },
      { label: "Plantation", statut: "active" },
      { label: "Taille formation", statut: "todo" },
      { label: "1ère récolte", statut: "todo" },
    ],
    note: "Ibrahim S. : Plantation PAR-F3 terminée (3,8 ha sur 8,5 ha)",
    color: "#2E7D32",
    ganttStart: 1,
    ganttEnd: 12,
  },
  {
    id: "PRJ-2025-002",
    titre: "Système d'irrigation goutte-à-goutte",
    emoji: "💧",
    ref: "PRJ-2025-002",
    budget: 18000000,
    depense: 4200000,
    chef: "Bamba Oumar",
    debut: "Mar 2025",
    fin: "Sep 2025",
    avancement: 35,
    statut: "actif",
    etapes: [
      { label: "Étude faisabilité", statut: "done" },
      { label: "Commande matériels", statut: "done" },
      { label: "Installation zone A", statut: "active" },
      { label: "Zone B", statut: "todo" },
      { label: "Tests", statut: "todo" },
      { label: "Formation", statut: "todo" },
    ],
    alerte: "Livraison matériels retardée (fournisseur DHL — 15 jours de retard)",
    color: "#1565C0",
    ganttStart: 3,
    ganttEnd: 9,
  },
  {
    id: "PRJ-2025-003",
    titre: "Construction entrepôt B",
    emoji: "🏗️",
    ref: "PRJ-2025-003",
    budget: 12000000,
    depense: 8400000,
    chef: "Jean-Baptiste Koffi",
    debut: "Fév 2025",
    fin: "Aoû 2025",
    avancement: 78,
    statut: "actif",
    etapes: [
      { label: "Plans & permis", statut: "done" },
      { label: "Fondations", statut: "done" },
      { label: "Gros œuvre", statut: "done" },
      { label: "Toiture", statut: "active" },
      { label: "Finitions", statut: "todo" },
      { label: "Réception", statut: "todo" },
    ],
    succes: "En avance de 2 semaines sur le planning",
    color: "#E65100",
    ganttStart: 2,
    ganttEnd: 8,
  },
  {
    id: "PRJ-2025-004",
    titre: "Certification GlobalG.A.P.",
    emoji: "📜",
    ref: "PRJ-2025-004",
    budget: 2400000,
    depense: 2400000,
    chef: "Jean-Baptiste Koffi",
    debut: "Jan 2025",
    fin: "Juin 2025",
    avancement: 100,
    statut: "termine",
    etapes: [],
    badge: "Certificat obtenu le 15/06/2025",
    color: "#6A1B9A",
    ganttStart: 1,
    ganttEnd: 6,
  },
  {
    id: "PRJ-2025-005",
    titre: "Formation RH & Compétences",
    emoji: "👥",
    ref: "PRJ-2025-005",
    budget: 1200000,
    depense: 1200000,
    chef: "Adjoa Koffi",
    debut: "Jan 2025",
    fin: "Mar 2025",
    avancement: 100,
    statut: "termine",
    etapes: [],
    badge: "145 personnes formées",
    color: "#00695C",
    ganttStart: 1,
    ganttEnd: 3,
  },
  {
    id: "PRJ-2025-006",
    titre: "Drone surveillance parcellaire",
    emoji: "🚁",
    ref: "PRJ-2025-006",
    budget: 6400000,
    depense: 1800000,
    chef: "Ibrahim Sawadogo",
    debut: "Mai 2025",
    fin: "Déc 2025",
    avancement: 30,
    statut: "actif",
    etapes: [
      { label: "Achat drone DJI T40", statut: "done" },
      { label: "Formation pilote", statut: "done" },
      { label: "Cartographie initiale", statut: "active" },
      { label: "Protocole suivi", statut: "todo" },
      { label: "Intégration IA", statut: "todo" },
    ],
    color: "#4527A0",
    ganttStart: 5,
    ganttEnd: 12,
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmt(n: number) {
  if (n >= 1_000_000) return (n / 1_000_000).toLocaleString("fr-FR", { maximumFractionDigits: 1 }) + " M XOF";
  return n.toLocaleString("fr-FR") + " XOF";
}

function pct(a: number, b: number) {
  return Math.round((a / b) * 100);
}

// ─── Sous-composants ──────────────────────────────────────────────────────────

function EtapeIcon({ statut }: { statut: EtapeStatut }) {
  if (statut === "done") return <CheckCircle size={14} className="text-green-600 shrink-0" />;
  if (statut === "active") return <Clock size={14} className="text-blue-500 shrink-0" />;
  return <Circle size={14} className="text-gray-300 shrink-0" />;
}

function ProjetCard({ p }: { p: Projet }) {
  const budgetPct = pct(p.depense, p.budget);
  const isTermine = p.avancement === 100;

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm flex flex-col gap-4">
      {/* En-tête */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-xl shrink-0">{p.emoji}</span>
          <div className="min-w-0">
            <p className="text-[10px] font-mono text-gray-400">{p.ref}</p>
            <h3 className="text-sm font-bold text-gray-900 leading-tight">{p.titre}</h3>
          </div>
        </div>
        {isTermine ? (
          <span className="shrink-0 inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-green-100 text-green-800">
            <CheckCircle size={11} /> Terminé
          </span>
        ) : (
          <span className="shrink-0 inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
            <Clock size={11} /> En cours
          </span>
        )}
      </div>

      {/* Infos chiffrées */}
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wide">Budget</p>
          <p className="font-bold text-gray-900">{fmt(p.budget)}</p>
        </div>
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wide">Dépensé</p>
          <p className="font-semibold" style={{ color: p.color }}>
            {fmt(p.depense)}{" "}
            <span className="text-xs font-normal text-gray-500">({budgetPct}%)</span>
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wide">Chef de projet</p>
          <p className="font-medium text-gray-800">{p.chef}</p>
        </div>
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wide">Période</p>
          <p className="font-medium text-gray-800">
            {p.debut} → {p.fin}
          </p>
        </div>
      </div>

      {/* Avancement */}
      {!isTermine && (
        <div>
          <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
            <span>Avancement global</span>
            <span className="font-bold" style={{ color: p.color }}>
              {p.avancement}%
            </span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2.5">
            <div
              className="h-2.5 rounded-full transition-all"
              style={{ width: `${p.avancement}%`, background: p.color }}
            />
          </div>
        </div>
      )}

      {/* Badge terminé */}
      {p.badge && (
        <div className="flex items-center gap-2 text-sm font-semibold" style={{ color: p.color }}>
          <CheckCircle size={16} />
          {p.badge}
        </div>
      )}

      {/* Étapes */}
      {p.etapes.length > 0 && (
        <div className="space-y-1.5">
          <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold">Étapes</p>
          {p.etapes.map((e) => (
            <div key={e.label} className="flex items-center gap-2 text-xs">
              <EtapeIcon statut={e.statut} />
              <span
                className={
                  e.statut === "done"
                    ? "text-gray-500 line-through"
                    : e.statut === "active"
                    ? "font-semibold text-blue-700"
                    : "text-gray-400"
                }
              >
                {e.label}
                {e.statut === "active" && (
                  <span className="ml-1 text-[10px] px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-700 font-medium no-underline">
                    en cours
                  </span>
                )}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Alertes / succès / note */}
      {p.alerte && (
        <div className="flex items-start gap-2 text-xs p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800">
          <AlertTriangle size={13} className="shrink-0 mt-0.5" />
          {p.alerte}
        </div>
      )}
      {p.succes && (
        <div className="flex items-start gap-2 text-xs p-3 rounded-xl bg-green-50 border border-green-200 text-green-800">
          <CheckCircle size={13} className="shrink-0 mt-0.5" />
          {p.succes}
        </div>
      )}
      {p.note && (
        <div className="text-xs p-3 rounded-xl bg-gray-50 border border-gray-100 text-gray-600">
          <span className="font-semibold">Dernière MàJ — </span>
          {p.note}
        </div>
      )}
    </div>
  );
}

// ─── Gantt simplifié ──────────────────────────────────────────────────────────

const MOIS = ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Aoû", "Sep", "Oct", "Nov", "Déc"];

function GanttChart() {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm overflow-x-auto">
      <h3 className="text-base font-semibold text-gray-900 mb-4">Timeline des projets 2025</h3>
      <div className="min-w-[640px]">
        {/* En-tête mois */}
        <div className="flex mb-2" style={{ paddingLeft: 176 }}>
          {MOIS.map((m) => (
            <div key={m} className="flex-1 text-center text-[10px] text-gray-400 font-semibold uppercase">
              {m}
            </div>
          ))}
        </div>
        {/* Lignes */}
        <div className="space-y-2">
          {projets.map((p) => {
            const left = ((p.ganttStart - 1) / 12) * 100;
            const width = ((p.ganttEnd - p.ganttStart + 1) / 12) * 100;
            return (
              <div key={p.id} className="flex items-center gap-2">
                <div className="w-44 shrink-0 text-xs font-medium text-gray-700 truncate flex items-center gap-1">
                  <span>{p.emoji}</span>
                  <span className="truncate">{p.titre}</span>
                </div>
                <div className="relative flex-1 h-6 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="absolute top-0 h-full rounded-full flex items-center justify-end pr-2"
                    style={{ left: `${left}%`, width: `${width}%`, background: p.color }}
                  >
                    <span className="text-[10px] text-white font-bold">{p.avancement}%</span>
                  </div>
                  {/* Progress overlay */}
                  <div
                    className="absolute top-0 h-full rounded-full opacity-30"
                    style={{
                      left: `${left}%`,
                      width: `${(width * p.avancement) / 100}%`,
                      background: "#fff",
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── KPI ──────────────────────────────────────────────────────────────────────

const kpis = [
  {
    label: "Projets actifs",
    value: "5",
    sub: "en cours",
    color: "#2E7D32",
    icon: <FolderOpen size={20} />,
  },
  {
    label: "Budget total projets",
    value: "68,4 M XOF",
    sub: "tous projets confondus",
    color: "#1565C0",
    icon: <Wallet size={20} />,
  },
  {
    label: "Avancement moyen",
    value: "58%",
    sub: "projets actifs",
    color: "#E65100",
    icon: <TrendingUp size={20} />,
  },
  {
    label: "Projets en retard",
    value: "1",
    sub: "irrigation — +15 jours",
    color: "#C62828",
    icon: <AlertCircle size={20} />,
  },
];

type Onglet = "actifs" | "planifies" | "termines" | "tous";

// ─── Page principale ──────────────────────────────────────────────────────────

export default function ProjetsPage() {
  const [onglet, setOnglet] = useState<Onglet>("actifs");

  const filtres: Record<Onglet, Projet[]> = {
    actifs: projets.filter((p) => p.statut === "actif"),
    planifies: projets.filter((p) => p.statut === "planifie"),
    termines: projets.filter((p) => p.statut === "termine"),
    tous: projets,
  };

  const displayed = filtres[onglet];

  const tabs: { key: Onglet; label: string; count: number }[] = [
    { key: "actifs", label: "Actifs", count: filtres.actifs.length },
    { key: "planifies", label: "Planifiés", count: filtres.planifies.length },
    { key: "termines", label: "Terminés", count: filtres.termines.length },
    { key: "tous", label: "Tous", count: filtres.tous.length },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Topbar title="Projets" breadcrumb={["Administration", "Projets"]} />

      <div className="p-6 space-y-6">
        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {kpis.map((k) => (
            <div key={k.label} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-500">{k.label}</p>
                <span style={{ color: k.color }}>{k.icon}</span>
              </div>
              <p className="text-2xl font-bold" style={{ color: k.color }}>
                {k.value}
              </p>
              <p className="text-xs text-gray-400 mt-1">{k.sub}</p>
            </div>
          ))}
        </div>

        {/* Onglets */}
        <div className="flex items-center gap-2 border-b border-gray-200">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setOnglet(t.key)}
              className={`px-4 py-2.5 text-sm font-semibold border-b-2 transition-colors flex items-center gap-1.5 ${
                onglet === t.key
                  ? "border-green-700 text-green-700"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {t.label}
              <span
                className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${
                  onglet === t.key ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-500"
                }`}
              >
                {t.count}
              </span>
            </button>
          ))}
        </div>

        {/* Grille projets */}
        {displayed.length > 0 ? (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
            {displayed.map((p) => (
              <ProjetCard key={p.id} p={p} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-gray-100 bg-white p-12 text-center text-gray-400">
            Aucun projet dans cette catégorie.
          </div>
        )}

        {/* Gantt */}
        <GanttChart />
      </div>
    </div>
  );
}
