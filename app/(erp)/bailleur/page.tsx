"use client";

import { useState } from "react";
import Topbar from "../../components/Topbar";
import {
  Download,
  Mail,
  TrendingUp,
  FileText,
  Star,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type TabId = "projets" | "odd" | "rapports" | "conformite";

interface LigneBudget {
  ligne: string;
  budget: string;
  depense: string;
  pct: number;
}

interface Projet {
  id: string;
  titre: string;
  bailleur: string;
  montantTotal: string;
  recu: string;
  pctRecu: number;
  restant: string;
  restantLabel: string;
  periode: string;
  gestionnaire: string;
  objectifs: string[];
  avancement: number;
  lignes: LigneBudget[];
}

interface OddRow {
  num: number;
  titre: string;
  indicateur: string;
  valeur: string;
  cible: string;
  score: number;
}

interface RapportBailleur {
  num: string;
  rapport: string;
  projet: string;
  periode: string;
  limite: string;
  soumis: string;
  statut: "accepte" | "en-cours" | "a-preparer";
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const KPI = [
  { label: "Projets en cours", value: "3", icon: TrendingUp, color: "text-green-700", bg: "bg-green-50" },
  { label: "Financement reçu", value: "84,2 M XOF", icon: Download, color: "text-blue-700", bg: "bg-blue-50" },
  { label: "Financement attendu", value: "28,4 M XOF", icon: Clock, color: "text-orange-700", bg: "bg-orange-50" },
  { label: "Rapports remis", value: "6 / 8", icon: FileText, color: "text-purple-700", bg: "bg-purple-50" },
  { label: "Score performance", value: "91 / 100", icon: Star, color: "text-amber-700", bg: "bg-amber-50" },
];

const PROJETS: Projet[] = [
  {
    id: "FAO-AGRIFRIK-2023",
    titre: "Renforcement filière cacao durable",
    bailleur: "Organisation des Nations Unies pour l'Alimentation (FAO)",
    montantTotal: "48,0 M XOF",
    recu: "36,0 M XOF",
    pctRecu: 75,
    restant: "12,0 M XOF",
    restantLabel: "T4 2025",
    periode: "Jan 2023 — Déc 2025",
    gestionnaire: "Jean-Baptiste Kouassi",
    objectifs: [
      "100% parcelles certifiées Rainforest Alliance",
      "Formation de 30+ agents",
      "Rendement +15%",
    ],
    avancement: 78,
    lignes: [
      { ligne: "Formations & renforcement capacités", budget: "12,0 M", depense: "9,8 M", pct: 82 },
      { ligne: "Équipements (drone, séchoirs)", budget: "18,0 M", depense: "16,2 M", pct: 90 },
      { ligne: "Certification RA", budget: "4,0 M", depense: "3,6 M", pct: 90 },
      { ligne: "Études & rapports", budget: "6,0 M", depense: "4,8 M", pct: 80 },
      { ligne: "Frais de gestion (7%)", budget: "8,0 M", depense: "5,8 M", pct: 73 },
    ],
  },
  {
    id: "ANADER-COOP-2024",
    titre: "Développement coopérative agricole",
    bailleur: "ANADER CI + FIRCA",
    montantTotal: "24,0 M XOF",
    recu: "18,0 M XOF",
    pctRecu: 75,
    restant: "6,0 M XOF",
    restantLabel: "2026",
    periode: "Mar 2024 — Fév 2026",
    gestionnaire: "Mariam Kouyaté",
    objectifs: [
      "Coopérative 150 membres",
      "Micro-crédit 100 bénéficiaires",
      "Prix payé aux producteurs +10%",
    ],
    avancement: 64,
    lignes: [
      { ligne: "Fonds micro-crédit", budget: "15,0 M", depense: "11,2 M", pct: 75 },
      { ligne: "Formation gestion coopérative", budget: "4,0 M", depense: "2,8 M", pct: 70 },
      { ligne: "Infrastructure (bureau coopérative)", budget: "5,0 M", depense: "2,6 M", pct: 52 },
    ],
  },
  {
    id: "WB-AGRI-2025",
    titre: "Agriculture intelligente face au climat",
    bailleur: "Banque Mondiale (IDA)",
    montantTotal: "36,0 M XOF",
    recu: "30,2 M XOF",
    pctRecu: 84,
    restant: "5,8 M XOF",
    restantLabel: "2026",
    periode: "Jan 2025 — Déc 2026",
    gestionnaire: "Jean-Baptiste Kouassi",
    objectifs: [
      "Irrigation optimisée",
      "Météo en temps réel",
      "IA agronomique déployée",
    ],
    avancement: 88,
    lignes: [
      { ligne: "Systèmes d'irrigation intelligente", budget: "16,0 M", depense: "14,8 M", pct: 93 },
      { ligne: "Stations météo & capteurs IoT", budget: "10,0 M", depense: "9,2 M", pct: 92 },
      { ligne: "Plateforme IA agronomique", budget: "8,0 M", depense: "5,6 M", pct: 70 },
      { ligne: "Formation & déploiement", budget: "2,0 M", depense: "0,6 M", pct: 30 },
    ],
  },
];

const ODD_ROWS: OddRow[] = [
  { num: 1, titre: "Pas de pauvreté", indicateur: "Revenus producteurs coopérative", valeur: "+12% vs marché", cible: "+10%", score: 120 },
  { num: 2, titre: "Faim zéro", indicateur: "Production alimentaire (maïs/riz)", valeur: "6,9 t", cible: "6,0 t", score: 115 },
  { num: 3, titre: "Bonne santé", indicateur: "Accidents travail graves", valeur: "0 en 2025", cible: "0", score: 100 },
  { num: 4, titre: "Éducation de qualité", indicateur: "Heures formation employés", valeur: "860 h/an", cible: "500 h", score: 172 },
  { num: 5, titre: "Égalité Hommes/Femmes", indicateur: "% femmes dans l'effectif", valeur: "38%", cible: "35%", score: 109 },
  { num: 8, titre: "Travail décent", indicateur: "Emplois créés", valeur: "287 directs, 120 indirects", cible: "250", score: 115 },
  { num: 10, titre: "Inégalités réduites", indicateur: "Prime qualité coopérative", valeur: "+12% vs marché", cible: "+8%", score: 150 },
  { num: 12, titre: "Production responsable", indicateur: "% zéro plastique", valeur: "100% (depuis 2024)", cible: "80%", score: 125 },
  { num: 13, titre: "Lutte contre le climat", indicateur: "Bilan CO2", valeur: "-18,4 t CO2eq/an", cible: "Négatif", score: 100 },
  { num: 15, titre: "Vie terrestre", indicateur: "Biodiversité (espèces oiseaux)", valeur: "34 espèces", cible: "25", score: 136 },
  { num: 17, titre: "Partenariats mondiaux", indicateur: "Projets bailleurs actifs", valeur: "3", cible: "2", score: 150 },
];

const RAPPORTS: RapportBailleur[] = [
  { num: "R1", rapport: "Rapport d'avancement S1 2023", projet: "FAO", periode: "Jan–Jun 2023", limite: "31/07/2023", soumis: "28/07/2023", statut: "accepte" },
  { num: "R2", rapport: "Rapport d'avancement S2 2023", projet: "FAO", periode: "Jul–Déc 2023", limite: "31/01/2024", soumis: "30/01/2024", statut: "accepte" },
  { num: "R3", rapport: "Rapport annuel 2023 (consolidé)", projet: "FAO", periode: "Jan–Déc 2023", limite: "28/02/2024", soumis: "25/02/2024", statut: "accepte" },
  { num: "R4", rapport: "Rapport ANADER T1 2024", projet: "ANADER", periode: "Mar–Mai 2024", limite: "15/06/2024", soumis: "12/06/2024", statut: "accepte" },
  { num: "R5", rapport: "Rapport FAO avancement 2024", projet: "FAO", periode: "Jan–Déc 2024", limite: "31/01/2025", soumis: "30/01/2025", statut: "accepte" },
  { num: "R6", rapport: "Rapport WB trimestriel Q1", projet: "WB", periode: "Jan–Mar 2025", limite: "30/04/2025", soumis: "28/04/2025", statut: "accepte" },
  { num: "R7", rapport: "Rapport WB trimestriel Q2", projet: "WB", periode: "Avr–Jun 2025", limite: "31/07/2025", soumis: "En cours", statut: "en-cours" },
  { num: "R8", rapport: "Rapport FAO S1 2025", projet: "FAO", periode: "Jan–Jun 2025", limite: "31/08/2025", soumis: "—", statut: "a-preparer" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function ProgressBar({ pct, color = "bg-green-500" }: { pct: number; color?: string }) {
  return (
    <div className="w-full bg-gray-100 rounded-full h-1.5">
      <div
        className={`${color} h-1.5 rounded-full transition-all`}
        style={{ width: `${Math.min(pct, 100)}%` }}
      />
    </div>
  );
}

function StatutRapport({ statut }: { statut: RapportBailleur["statut"] }) {
  if (statut === "accepte")
    return (
      <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full bg-green-100 text-green-700">
        <CheckCircle size={11} /> Accepté
      </span>
    );
  if (statut === "en-cours")
    return (
      <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
        <Clock size={11} /> À soumettre 31/07
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">
      <AlertCircle size={11} /> À préparer
    </span>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function BailleurPage() {
  const [tab, setTab] = useState<TabId>("projets");

  const TABS: { id: TabId; label: string }[] = [
    { id: "projets", label: "Projets & Financements" },
    { id: "odd", label: "Indicateurs ODD" },
    { id: "rapports", label: "Rapports" },
    { id: "conformite", label: "Conformité" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Topbar
        title="Espace Bailleur & Partenaires"
        breadcrumb={["Rapports & BI", "Espace Bailleur"]}
      />

      <main className="p-6 max-w-7xl mx-auto space-y-6">

        {/* ── KPI Row ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {KPI.map((k) => (
            <div key={k.label} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${k.bg} ${k.color}`}>
                <k.icon size={18} />
              </div>
              <div>
                <p className="text-lg font-bold text-gray-900 leading-tight">{k.value}</p>
                <p className="text-xs text-gray-500 mt-0.5">{k.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Tabs ── */}
        <div className="flex gap-1 bg-white rounded-xl border border-gray-100 p-1 shadow-sm w-fit">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                tab === t.id
                  ? "bg-[#2E7D32] text-white"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* ── Onglet Projets & Financements ── */}
        {tab === "projets" && (
          <div className="space-y-6">
            {PROJETS.map((p) => (
              <div key={p.id} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                {/* Header projet */}
                <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{p.id}</span>
                      {p.avancement >= 80 && (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                          ✅ En bonne voie
                        </span>
                      )}
                    </div>
                    <h3 className="text-base font-bold text-gray-900">{p.titre}</h3>
                    <p className="text-sm text-gray-500 mt-0.5">{p.bailleur}</p>
                  </div>
                  <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#2E7D32] text-white text-xs font-medium hover:bg-[#1B5E20] transition-colors">
                    <Download size={13} /> Rapport PDF
                  </button>
                </div>

                {/* Grille infos + avancement */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
                  <div className="rounded-xl bg-gray-50 p-3">
                    <p className="text-xs text-gray-400 mb-1">Montant total</p>
                    <p className="text-sm font-bold text-gray-900">{p.montantTotal}</p>
                  </div>
                  <div className="rounded-xl bg-green-50 p-3">
                    <p className="text-xs text-gray-400 mb-1">Reçu ({p.pctRecu}%)</p>
                    <p className="text-sm font-bold text-green-700">{p.recu}</p>
                  </div>
                  <div className="rounded-xl bg-orange-50 p-3">
                    <p className="text-xs text-gray-400 mb-1">Restant ({p.restantLabel})</p>
                    <p className="text-sm font-bold text-orange-700">{p.restant}</p>
                  </div>
                  <div className="rounded-xl bg-gray-50 p-3">
                    <p className="text-xs text-gray-400 mb-1">Gestionnaire</p>
                    <p className="text-sm font-semibold text-gray-800">{p.gestionnaire}</p>
                    <p className="text-xs text-gray-400">{p.periode}</p>
                  </div>
                </div>

                {/* Avancement global */}
                <div className="mb-5">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-xs font-medium text-gray-600">Avancement global</span>
                    <span className="text-xs font-bold text-gray-900">{p.avancement}%</span>
                  </div>
                  <ProgressBar pct={p.avancement} color="bg-[#4CAF50]" />
                </div>

                {/* Objectifs */}
                <div className="mb-5">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Objectifs</p>
                  <ul className="space-y-1">
                    {p.objectifs.map((o, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                        <CheckCircle size={13} className="text-green-500 flex-shrink-0" />
                        {o}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tableau dépenses */}
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-[#F8FBF8] border-b border-gray-100">
                        {["Ligne budgétaire", "Budget", "Dépensé", "%", "Progression"].map((h) => (
                          <th key={h} className="text-left px-4 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {p.lignes.map((l, i) => (
                        <tr key={i} className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-3 text-gray-800">{l.ligne}</td>
                          <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{l.budget} XOF</td>
                          <td className="px-4 py-3 font-semibold text-gray-900 whitespace-nowrap">{l.depense} XOF</td>
                          <td className="px-4 py-3">
                            <span className={`text-xs font-bold ${l.pct >= 80 ? "text-green-700" : "text-amber-700"}`}>
                              {l.pct}%
                            </span>
                          </td>
                          <td className="px-4 py-3 min-w-[120px]">
                            <ProgressBar pct={l.pct} color={l.pct >= 80 ? "bg-green-500" : "bg-amber-400"} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Onglet Indicateurs ODD ── */}
        {tab === "odd" && (
          <div className="space-y-6">
            {/* Tableau ODD */}
            <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <h3 className="text-base font-bold text-gray-800">Contribution aux Objectifs de Développement Durable 2030</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#F8FBF8] border-b border-gray-100">
                      {["ODD", "Intitulé", "Indicateur AGRIFRIK", "Valeur réalisée", "Cible 2025", "Score"].map((h) => (
                        <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {ODD_ROWS.map((row) => (
                      <tr key={row.num} className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                        <td className="px-5 py-3.5">
                          <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-[#2E7D32] text-white text-xs font-bold">
                            {row.num}
                          </span>
                        </td>
                        <td className="px-5 py-3.5 font-medium text-gray-800 whitespace-nowrap">{row.titre}</td>
                        <td className="px-5 py-3.5 text-gray-600">{row.indicateur}</td>
                        <td className="px-5 py-3.5 font-semibold text-green-700">{row.valeur}</td>
                        <td className="px-5 py-3.5 text-gray-500">{row.cible}</td>
                        <td className="px-5 py-3.5">
                          <span className="inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                            <CheckCircle size={11} />
                            {row.score}/100
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Contribution financière */}
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <h3 className="text-base font-bold text-gray-800 mb-4">Contribution financière au développement local</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: "Taxes payées CI", value: "22,4 M XOF", color: "bg-blue-50 text-blue-700" },
                  { label: "Investissement communautaire", value: "2,8 M XOF", color: "bg-purple-50 text-purple-700", sub: "forages, écoles, santé" },
                  { label: "Achats fournisseurs locaux CI", value: "68%", color: "bg-green-50 text-green-700", sub: "46,5 M XOF" },
                  { label: "Prime qualité producteurs", value: "4,2 M XOF", color: "bg-amber-50 text-amber-700", sub: "supplémentaires vs marché" },
                ].map((c) => (
                  <div key={c.label} className={`rounded-xl p-4 ${c.color.split(" ")[0]}`}>
                    <p className={`text-xl font-bold ${c.color.split(" ")[1]}`}>{c.value}</p>
                    <p className="text-xs font-medium text-gray-700 mt-1">{c.label}</p>
                    {c.sub && <p className="text-xs text-gray-400 mt-0.5">{c.sub}</p>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Onglet Rapports ── */}
        {tab === "rapports" && (
          <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-gray-800">Rapports bailleurs</h3>
                <p className="text-xs text-gray-400 mt-0.5">6 soumis · 1 en cours · 1 à préparer</p>
              </div>
              <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#2E7D32] text-white text-xs font-medium hover:bg-[#1B5E20] transition-colors">
                <Mail size={13} /> Envoyer rapport
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#F8FBF8] border-b border-gray-100">
                    {["N°", "Rapport", "Projet", "Période", "Date limite", "Soumis le", "Statut"].map((h) => (
                      <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {RAPPORTS.map((r) => (
                    <tr key={r.num} className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-3.5">
                        <span className="text-xs font-bold text-gray-400">{r.num}</span>
                      </td>
                      <td className="px-5 py-3.5 font-medium text-gray-800">{r.rapport}</td>
                      <td className="px-5 py-3.5">
                        <span className="inline-flex text-xs font-semibold px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                          {r.projet}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-gray-500 text-xs whitespace-nowrap">{r.periode}</td>
                      <td className="px-5 py-3.5 text-gray-500 text-xs whitespace-nowrap">{r.limite}</td>
                      <td className="px-5 py-3.5 text-gray-700 text-xs font-medium whitespace-nowrap">{r.soumis}</td>
                      <td className="px-5 py-3.5">
                        <StatutRapport statut={r.statut} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── Onglet Conformité ── */}
        {tab === "conformite" && (
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h3 className="text-base font-bold text-gray-800 mb-4">Conformité & Gouvernance</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "Audit financier externe", valeur: "Réalisé — Mars 2025", ok: true, detail: "Cabinet Deloitte CI" },
                { label: "Rapports soumis dans les délais", valeur: "6/6 soumis à temps", ok: true, detail: "100% de conformité" },
                { label: "Certification Rainforest Alliance", valeur: "89 ha certifiés", ok: true, detail: "62% de la production" },
                { label: "Plan de passation des marchés", valeur: "Approuvé FAO", ok: true, detail: "PPM 2025 validé en Jan 2025" },
                { label: "Rapport d'audit WB Q2", valeur: "À soumettre 31/07/2025", ok: false, detail: "En préparation — WB-AGRI-2025" },
                { label: "Renouvellement ISO 22000", valeur: "Planifié Déc 2025", ok: true, detail: "Audit interne Oct 2025" },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-3 p-4 rounded-xl border border-gray-100 bg-gray-50">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${item.ok ? "bg-green-100" : "bg-amber-100"}`}>
                    {item.ok
                      ? <CheckCircle size={16} className="text-green-600" />
                      : <Clock size={16} className="text-amber-600" />
                    }
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{item.label}</p>
                    <p className="text-sm text-gray-700 mt-0.5">{item.valeur}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
