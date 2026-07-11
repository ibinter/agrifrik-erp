"use client";

import { useState } from "react";
import Topbar from "../../components/Topbar";
import {
  ClipboardCheck,
  Star,
  AlertTriangle,
  Calendar,
  CheckCircle2,
  Clock,
  Circle,
  ChevronRight,
} from "lucide-react";

// ─── Données ────────────────────────────────────────────────────────────────

const audits = [
  {
    date: "01/03/2026",
    type: "Renouvellement Rainforest Alliance",
    scope: "Toute exploitation",
    auditeur: "Bureau Véritas",
    referentiel: "RA 2020",
    statut: "Planifié",
    score: null,
  },
  {
    date: "15/09/2025",
    type: "Audit interne préparatoire",
    scope: "Toute exploitation",
    auditeur: "Équipe interne",
    referentiel: "RA 2020",
    statut: "Planifié",
    score: null,
  },
  {
    date: "20/08/2025",
    type: "Audit ISO 22000 suivi",
    scope: "Transformation",
    auditeur: "SGS CI",
    referentiel: "ISO 22000",
    statut: "Planifié",
    score: null,
  },
  {
    date: "10/07/2025",
    type: "Audit BPA parcelles",
    scope: "PAR-A1 à A8",
    auditeur: "Ibrahim S.",
    referentiel: "GlobalG.A.P.",
    statut: "En cours",
    score: null,
  },
  {
    date: "15/06/2025",
    type: "Contrôle qualité export",
    scope: "Cacao Grade A",
    auditeur: "CNRA",
    referentiel: "Norme export",
    statut: "Terminé",
    score: 94,
  },
  {
    date: "01/03/2025",
    type: "Renouvellement Rainforest Alliance",
    scope: "Toute exploitation",
    auditeur: "Bureau Véritas",
    referentiel: "RA 2020",
    statut: "Terminé",
    score: 89,
  },
];

const nonConformites = [
  {
    num: "NC-2025-04",
    date: "09/07",
    description: "Produit non homologué INT-012 en stock",
    criticite: "Critique",
    responsable: "Ibrahim S.",
    echeance: "15/07",
    statut: "Ouverte",
  },
  {
    num: "NC-2025-03",
    date: "05/07",
    description: "2 employés sans EPI lors épandage fongicide",
    criticite: "Majeure",
    responsable: "Mariam K.",
    echeance: "20/07",
    statut: "En traitement",
  },
  {
    num: "NC-2025-02",
    date: "28/06",
    description: "Enregistrement épandage non complété (PAR-A3)",
    criticite: "Mineure",
    responsable: "Ibrahim S.",
    echeance: "31/07",
    statut: "En traitement",
  },
  {
    num: "NC-2025-01",
    date: "15/06",
    description: "Déchet emballages intrants non éliminés conforme",
    criticite: "Majeure",
    responsable: "Ibrahim S.",
    echeance: "30/07",
    statut: "En traitement",
  },
];

// ─── Checklist BPA ───────────────────────────────────────────────────────────

const checklistSections = [
  {
    titre: "Sécurité des travailleurs",
    items: [
      "EPI disponibles et en bon état pour tous les employés",
      "Formation sécurité réalisée (enregistrée)",
      "Trousse de premiers secours accessible sur site",
      "Signalétique de sécurité affichée aux zones de stockage",
      "Registre des accidents / incidents tenu à jour",
      "Équipements électriques vérifiés et conformes",
      "Zones de repos disponibles et hygiéniques",
      "Contrats de travail signés pour tous les employés",
    ],
  },
  {
    titre: "Gestion des intrants",
    items: [
      "Tous les pesticides utilisés sont homologués",
      "Registre des applications d'intrants complet et à jour",
      "Délais avant récolte respectés (DAR)",
      "Stockage intrants sécurisé et étiqueté",
      "Fiches de données de sécurité disponibles",
      "Doses d'application conformes aux recommandations",
    ],
  },
  {
    titre: "Traçabilité & Enregistrements",
    items: [
      "Cahier de parcelle renseigné pour chaque intervention",
      "Traçabilité lot de récolte assurée",
      "Rendements enregistrés par parcelle et par campagne",
      "Registre de ventes et achats tenu à jour",
      "Plan de gestion de l'exploitation disponible",
    ],
  },
  {
    titre: "Environnement",
    items: [
      "Zone tampon forêt / cours d'eau respectée",
      "Plan de gestion des déchets en place",
      "Brûlage de résidus agricoles évité",
      "Compostage ou valorisation des sous-produits",
      "Aucune expansion agricole en zone forestière",
      "Plan d'action biodiversité documenté",
    ],
  },
  {
    titre: "Qualité du produit",
    items: [
      "Matériel de récolte propre et désinfecté",
      "Conditions de séchage conformes (humidité cible)",
      "Stockage post-récolte séparé des intrants",
      "Taux de déchets / impuretés contrôlés et enregistrés",
    ],
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function statutAuditBadge(statut: string) {
  if (statut === "Terminé")
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
        <CheckCircle2 size={11} /> Terminé ✅
      </span>
    );
  if (statut === "En cours")
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
        <Circle size={11} /> En cours 🔵
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300">
      <Calendar size={11} /> Planifié 📅
    </span>
  );
}

function criticiteStyle(c: string) {
  if (c === "Critique") return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
  if (c === "Majeure") return "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400";
  return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
}

function criticiteIcon(c: string) {
  if (c === "Critique") return "🔴";
  if (c === "Majeure") return "🟡";
  return "🟡";
}

function statutNCStyle(s: string) {
  if (s === "Ouverte") return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
  return "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400";
}

// Jauge circulaire SVG
function ScoreGauge({ score }: { score: number }) {
  const r = 36;
  const circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;
  const color = score >= 85 ? "#16a34a" : score >= 70 ? "#f59e0b" : "#ef4444";
  return (
    <div className="relative w-24 h-24 flex-shrink-0">
      <svg width="96" height="96" viewBox="0 0 96 96">
        <circle cx="48" cy="48" r={r} fill="none" stroke="#e5e7eb" strokeWidth="8" />
        <circle
          cx="48"
          cy="48"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeDasharray={`${dash} ${circ}`}
          strokeLinecap="round"
          transform="rotate(-90 48 48)"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-xl font-bold text-gray-800 dark:text-gray-100 leading-none">{score}</span>
        <span className="text-xs text-gray-400">/100</span>
      </div>
    </div>
  );
}

// ─── Page principale ──────────────────────────────────────────────────────────

export default function AuditPage() {
  const [onglet, setOnglet] = useState<"planifies" | "resultats" | "nc" | "checklist">("planifies");

  // checklist state: flat array of booleans
  const totalItems = checklistSections.reduce((acc, s) => acc + s.items.length, 0);
  const [checked, setChecked] = useState<boolean[]>(Array(totalItems).fill(false));

  const toggle = (idx: number) =>
    setChecked((prev) => prev.map((v, i) => (i === idx ? !v : v)));

  const score = checked.filter(Boolean).length;

  const onglets = [
    { key: "planifies", label: "Audits planifiés" },
    { key: "resultats", label: "Résultats" },
    { key: "nc", label: "Non-conformités" },
    { key: "checklist", label: "Checklist BPA" },
  ] as const;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Topbar title="Audit Qualité" breadcrumb={["Suivi Qualité", "Audit"]} />

      <div className="p-6 max-w-7xl mx-auto">

        {/* KPI */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            { icon: <ClipboardCheck size={20} className="text-[#2E7D32]" />, bg: "bg-green-100 dark:bg-green-900/30", label: "Audits 2025", value: "8" },
            { icon: <Star size={20} className="text-yellow-600" />, bg: "bg-yellow-100 dark:bg-yellow-900/30", label: "Score moyen", value: "87/100" },
            { icon: <AlertTriangle size={20} className="text-red-500" />, bg: "bg-red-100 dark:bg-red-900/30", label: "NC ouvertes", value: "4" },
            { icon: <Calendar size={20} className="text-blue-600" />, bg: "bg-blue-100 dark:bg-blue-900/30", label: "Prochaine certification", value: "01/03/2026" },
          ].map((k, i) => (
            <div key={i} className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-5 flex items-center gap-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${k.bg}`}>
                {k.icon}
              </div>
              <div>
                <p className="text-xl font-bold text-gray-800 dark:text-gray-100">{k.value}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{k.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Onglets */}
        <div className="flex gap-1 p-1 rounded-xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 mb-6 overflow-x-auto">
          {onglets.map((o) => (
            <button
              key={o.key}
              onClick={() => setOnglet(o.key)}
              className={`whitespace-nowrap flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                onglet === o.key
                  ? "bg-[#2E7D32] text-white"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
              }`}
            >
              {o.label}
            </button>
          ))}
        </div>

        {/* ── Onglet : Audits planifiés ── */}
        {onglet === "planifies" && (
          <div className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-5">
            <h2 className="font-bold text-gray-800 dark:text-gray-100 mb-4">Audits planifiés</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-gray-800">
                    {["Date", "Type", "Scope", "Auditeur", "Référentiel", "Statut"].map((h) => (
                      <th key={h} className="pb-3 pr-4 font-medium">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {audits.map((a, i) => (
                    <tr key={i} className="border-b border-gray-50 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                      <td className="py-3 pr-4 font-mono text-gray-700 dark:text-gray-300 text-xs">{a.date}</td>
                      <td className="py-3 pr-4 text-gray-800 dark:text-gray-200 font-medium max-w-xs">{a.type}</td>
                      <td className="py-3 pr-4 text-gray-600 dark:text-gray-400 text-xs">{a.scope}</td>
                      <td className="py-3 pr-4 text-gray-600 dark:text-gray-400 text-xs">{a.auditeur}</td>
                      <td className="py-3 pr-4 text-gray-600 dark:text-gray-400 text-xs">{a.referentiel}</td>
                      <td className="py-3">
                        <div className="flex items-center gap-2 flex-wrap">
                          {statutAuditBadge(a.statut)}
                          {a.score !== null && (
                            <span className="text-xs font-semibold text-green-700 dark:text-green-400">
                              Score : {a.score}/100
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── Onglet : Résultats ── */}
        {onglet === "resultats" && (
          <div className="space-y-5">

            {/* Audit RA 01/03/2025 */}
            <div className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-5">
              <div className="flex items-start gap-4 mb-4">
                <ScoreGauge score={89} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h3 className="font-bold text-gray-800 dark:text-gray-100">Audit RA — 01/03/2025</h3>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                      <CheckCircle2 size={11} /> Certifié ✅
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Bureau Véritas · Référentiel RA 2020 · Toute exploitation</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">Points forts</p>
                  <div className="space-y-2">
                    {[
                      { label: "Traçabilité", score: 95 },
                      { label: "Bien-être travailleurs", score: 92 },
                      { label: "Conservation forêts", score: 88 },
                    ].map((p) => (
                      <div key={p.label} className="flex items-center gap-3">
                        <span className="text-xs text-gray-600 dark:text-gray-300 w-44">{p.label}</span>
                        <div className="flex-1 h-2 rounded-full bg-gray-100 dark:bg-gray-800">
                          <div className="h-2 rounded-full bg-green-500" style={{ width: `${p.score}%` }} />
                        </div>
                        <span className="text-xs font-semibold text-green-700 dark:text-green-400 w-12 text-right">{p.score}/100</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">Axes d&apos;amélioration</p>
                  <div className="space-y-2">
                    {[
                      { label: "Gestion déchets", score: 72 },
                      { label: "Plan climat", score: 75 },
                    ].map((p) => (
                      <div key={p.label} className="flex items-center gap-3">
                        <span className="text-xs text-gray-600 dark:text-gray-300 w-44">{p.label}</span>
                        <div className="flex-1 h-2 rounded-full bg-gray-100 dark:bg-gray-800">
                          <div className="h-2 rounded-full bg-orange-400" style={{ width: `${p.score}%` }} />
                        </div>
                        <span className="text-xs font-semibold text-orange-600 w-12 text-right">{p.score}/100</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-start gap-2 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 px-4 py-3">
                <ChevronRight size={15} className="text-blue-500 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-blue-700 dark:text-blue-300">
                  <span className="font-semibold">Prochaine action :</span> Plan d&apos;action gestion déchets à soumettre avant le 01/09/2025
                </p>
              </div>
            </div>

            {/* Contrôle qualité export */}
            <div className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-5">
              <div className="flex items-start gap-4 mb-4">
                <ScoreGauge score={94} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h3 className="font-bold text-gray-800 dark:text-gray-100">Contrôle qualité export — 15/06/2025</h3>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                      <CheckCircle2 size={11} /> Conforme ✅
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">CNRA · Norme export · Cacao Grade A</p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: "Humidité", value: "7,5%", ok: true },
                  { label: "Grade A", value: "Confirmé", ok: true },
                  { label: "Fèves plates", value: "< 5%", ok: true },
                  { label: "Pesticides", value: "Absence", ok: true },
                ].map((item) => (
                  <div key={item.label} className="rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 p-3 text-center">
                    <p className="text-sm font-bold text-green-700 dark:text-green-400">{item.value} ✅</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Audit BPA en cours */}
            <div className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-5">
              <div className="flex items-center gap-3 mb-2">
                <Clock size={20} className="text-blue-500" />
                <h3 className="font-bold text-gray-800 dark:text-gray-100">Audit BPA parcelles — 10/07/2025</h3>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                  🔵 En cours
                </span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Ibrahim S. · GlobalG.A.P. · PAR-A1 à A8</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-3">Audit en cours — résultats disponibles après clôture.</p>
            </div>
          </div>
        )}

        {/* ── Onglet : Non-conformités ── */}
        {onglet === "nc" && (
          <div className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-5">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle size={18} className="text-red-500" />
              <h2 className="font-bold text-gray-800 dark:text-gray-100">Non-conformités ouvertes</h2>
              <span className="ml-auto px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-700">
                {nonConformites.length} ouvertes
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-gray-800">
                    {["N° NC", "Date", "Description", "Criticité", "Responsable", "Échéance", "Statut"].map((h) => (
                      <th key={h} className="pb-3 pr-4 font-medium">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {nonConformites.map((nc, i) => (
                    <tr key={i} className="border-b border-gray-50 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                      <td className="py-3 pr-4 font-mono text-xs text-gray-700 dark:text-gray-300 font-semibold">{nc.num}</td>
                      <td className="py-3 pr-4 text-xs text-gray-500 dark:text-gray-400">{nc.date}</td>
                      <td className="py-3 pr-4 text-xs text-gray-700 dark:text-gray-300 max-w-xs">{nc.description}</td>
                      <td className="py-3 pr-4">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${criticiteStyle(nc.criticite)}`}>
                          {criticiteIcon(nc.criticite)} {nc.criticite}
                        </span>
                      </td>
                      <td className="py-3 pr-4 text-xs text-gray-600 dark:text-gray-400">{nc.responsable}</td>
                      <td className="py-3 pr-4 text-xs font-mono text-gray-600 dark:text-gray-400">{nc.echeance}</td>
                      <td className="py-3">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${statutNCStyle(nc.statut)}`}>
                          {nc.statut}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── Onglet : Checklist BPA ── */}
        {onglet === "checklist" && (
          <div className="space-y-5">
            {(() => {
              let offset = 0;
              return checklistSections.map((section) => {
                const sectionOffset = offset;
                offset += section.items.length;
                const sectionScore = section.items.filter((_, j) => checked[sectionOffset + j]).length;
                return (
                  <div key={section.titre} className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-5">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-gray-800 dark:text-gray-100">{section.titre}</h3>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${sectionScore === section.items.length ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300"}`}>
                        {sectionScore}/{section.items.length}
                      </span>
                    </div>
                    <div className="space-y-2">
                      {section.items.map((item, j) => {
                        const idx = sectionOffset + j;
                        return (
                          <label key={j} className="flex items-start gap-3 cursor-pointer group">
                            <input
                              type="checkbox"
                              checked={checked[idx]}
                              onChange={() => toggle(idx)}
                              className="mt-0.5 w-4 h-4 accent-[#2E7D32] flex-shrink-0 cursor-pointer"
                            />
                            <span className={`text-sm transition-colors ${checked[idx] ? "line-through text-gray-400 dark:text-gray-600" : "text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100"}`}>
                              {item}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                );
              });
            })()}

            {/* Score global */}
            <div className={`rounded-2xl border p-5 flex items-center gap-4 ${score === totalItems ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800" : "bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800"}`}>
              <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${score === totalItems ? "bg-green-100 dark:bg-green-900/40" : "bg-gray-100 dark:bg-gray-800"}`}>
                <ClipboardCheck size={24} className={score === totalItems ? "text-green-600" : "text-gray-400"} />
              </div>
              <div className="flex-1">
                <p className={`text-lg font-bold ${score === totalItems ? "text-green-700 dark:text-green-400" : "text-gray-800 dark:text-gray-100"}`}>
                  {score}/{totalItems} items conformes ({Math.round((score / totalItems) * 100)}%)
                </p>
                <div className="mt-2 h-2 rounded-full bg-gray-100 dark:bg-gray-800">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${score === totalItems ? "bg-green-500" : "bg-[#2E7D32]"}`}
                    style={{ width: `${(score / totalItems) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
