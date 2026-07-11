"use client";

import { useState } from "react";
import Link from "next/link";
import Topbar from "../../components/Topbar";
import {
  Plus,
  Pencil,
  Pause,
  Play,
  CheckCircle,
  Clock,
  CalendarDays,
  Mail,
  FileText,
  BarChart2,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface RapportPlanifie {
  id: number;
  nom: string;
  frequence: string;
  destinataires: string;
  dernierEnvoi: string;
  prochainEnvoi: string;
  actif: boolean;
}

interface HistoriqueEnvoi {
  id: number;
  rapport: string;
  dateEnvoi: string;
  destinataires: string;
  format: string;
  statut: "envoyé" | "erreur" | "en attente";
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const INITIAL_RAPPORTS: RapportPlanifie[] = [
  { id: 1, nom: "Dashboard direction", frequence: "Hebdomadaire (lundi)", destinataires: "direction@agrotek.ci", dernierEnvoi: "07/07/2025", prochainEnvoi: "14/07/2025", actif: true },
  { id: 2, nom: "Rapport FAO mensuel", frequence: "Mensuel (1er)", destinataires: "fao@ci.fao.org", dernierEnvoi: "01/07/2025", prochainEnvoi: "01/08/2025", actif: true },
  { id: 3, nom: "Rapport IA agricole", frequence: "Hebdomadaire (lundi)", destinataires: "ia@agrotek.ci", dernierEnvoi: "07/07/2025", prochainEnvoi: "14/07/2025", actif: true },
  { id: 4, nom: "Bilan financier trim.", frequence: "Trimestriel", destinataires: "direction + comptable", dernierEnvoi: "01/07/2025", prochainEnvoi: "01/10/2025", actif: true },
  { id: 5, nom: "Rapport coopérative", frequence: "Mensuel (1er)", destinataires: "coopagri@soubre.ci", dernierEnvoi: "01/07/2025", prochainEnvoi: "01/08/2025", actif: true },
  { id: 6, nom: "Rapport export douane", frequence: "Mensuel (5)", destinataires: "douane@agrotek.ci", dernierEnvoi: "05/07/2025", prochainEnvoi: "05/08/2025", actif: true },
];

const HISTORIQUE: HistoriqueEnvoi[] = [
  { id: 1, rapport: "Dashboard direction", dateEnvoi: "07/07 06:00", destinataires: "1 destinataire", format: "PDF", statut: "envoyé" },
  { id: 2, rapport: "Rapport IA agricole", dateEnvoi: "07/07 06:00", destinataires: "1 destinataire", format: "PDF", statut: "envoyé" },
  { id: 3, rapport: "Rapport FAO mensuel", dateEnvoi: "01/07 08:00", destinataires: "2 destinataires", format: "PDF+Excel", statut: "envoyé" },
  { id: 4, rapport: "Bilan financier trim.", dateEnvoi: "01/07 07:00", destinataires: "2 destinataires", format: "PDF", statut: "envoyé" },
  { id: 5, rapport: "Rapport coopérative", dateEnvoi: "01/07 08:00", destinataires: "1 destinataire", format: "PDF", statut: "envoyé" },
  { id: 6, rapport: "Rapport export douane", dateEnvoi: "05/07 09:00", destinataires: "1 destinataire", format: "PDF", statut: "envoyé" },
  { id: 7, rapport: "Dashboard direction", dateEnvoi: "30/06 06:00", destinataires: "1 destinataire", format: "PDF", statut: "envoyé" },
  { id: 8, rapport: "Rapport IA agricole", dateEnvoi: "30/06 06:00", destinataires: "1 destinataire", format: "PDF", statut: "envoyé" },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function RapportsPlanifiesPage() {
  const [rapports, setRapports] = useState<RapportPlanifie[]>(INITIAL_RAPPORTS);

  const toggleActif = (id: number) => {
    setRapports((prev) =>
      prev.map((r) => (r.id === id ? { ...r, actif: !r.actif } : r))
    );
  };

  const actifs = rapports.filter((r) => r.actif).length;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950">
      <Topbar title="Rapports planifiés" breadcrumb={["Rapports & BI", "Rapports planifiés"]} />

      <div className="flex-1 p-6 space-y-6 max-w-7xl mx-auto w-full">

        {/* ── KPI row ───────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Rapports actifs", value: actifs.toString(), icon: BarChart2, color: "bg-green-50 dark:bg-green-900/20 text-green-600 border-green-200 dark:border-green-800" },
            { label: "Envoyés ce mois", value: "12", icon: Mail, color: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 border-blue-200 dark:border-blue-800" },
            { label: "Prochain envoi", value: "dans 3 jours", icon: Clock, color: "bg-orange-50 dark:bg-orange-900/20 text-orange-600 border-orange-200 dark:border-orange-800" },
          ].map((kpi) => (
            <div key={kpi.label} className={`rounded-xl border p-4 flex items-center gap-4 bg-white dark:bg-gray-900 shadow-sm`}>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${kpi.color} border`}>
                <kpi.icon size={22} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{kpi.value}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{kpi.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Header row + CTA ──────────────────────────────────────────────── */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Rapports planifiés</h2>
          <Link
            href="/rapport-builder"
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-semibold hover:bg-green-700 transition-colors shadow-md"
          >
            <Plus size={16} />
            Créer un rapport planifié
          </Link>
        </div>

        {/* ── Table rapports planifiés ──────────────────────────────────────── */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
                  <th className="text-left px-5 py-3.5 font-semibold text-gray-600 dark:text-gray-300">Nom du rapport</th>
                  <th className="text-left px-4 py-3.5 font-semibold text-gray-600 dark:text-gray-300">Fréquence</th>
                  <th className="text-left px-4 py-3.5 font-semibold text-gray-600 dark:text-gray-300">Destinataires</th>
                  <th className="text-left px-4 py-3.5 font-semibold text-gray-600 dark:text-gray-300">Dernier envoi</th>
                  <th className="text-left px-4 py-3.5 font-semibold text-gray-600 dark:text-gray-300">Prochain envoi</th>
                  <th className="text-left px-4 py-3.5 font-semibold text-gray-600 dark:text-gray-300">Statut</th>
                  <th className="text-left px-4 py-3.5 font-semibold text-gray-600 dark:text-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                {rapports.map((r) => (
                  <tr key={r.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                          <FileText size={13} className="text-green-600 dark:text-green-400" />
                        </div>
                        <span className="font-medium text-gray-800 dark:text-gray-100">{r.nom}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="inline-flex items-center gap-1 text-xs bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-full px-2.5 py-1 border border-blue-100 dark:border-blue-800">
                        <CalendarDays size={11} />
                        {r.frequence}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-gray-600 dark:text-gray-300 text-xs">{r.destinataires}</td>
                    <td className="px-4 py-3.5 text-gray-500 dark:text-gray-400 text-xs">{r.dernierEnvoi}</td>
                    <td className="px-4 py-3.5 text-gray-500 dark:text-gray-400 text-xs font-medium">{r.prochainEnvoi}</td>
                    <td className="px-4 py-3.5">
                      <span className={`inline-flex items-center gap-1 text-xs rounded-full px-2.5 py-1 font-medium ${
                        r.actif
                          ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800"
                          : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700"
                      }`}>
                        <CheckCircle size={11} />
                        {r.actif ? "Actif" : "En pause"}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2">
                        <button className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 hover:underline">
                          <Pencil size={12} />
                          Modifier
                        </button>
                        <span className="text-gray-300 dark:text-gray-600">/</span>
                        <button
                          onClick={() => toggleActif(r.id)}
                          className={`flex items-center gap-1 text-xs hover:underline ${
                            r.actif
                              ? "text-orange-500 dark:text-orange-400"
                              : "text-green-600 dark:text-green-400"
                          }`}
                        >
                          {r.actif ? <><Pause size={12} /> Pause</> : <><Play size={12} /> Activer</>}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Historique des envois ─────────────────────────────────────────── */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Historique des envois</h2>
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
                    <th className="text-left px-5 py-3.5 font-semibold text-gray-600 dark:text-gray-300">Rapport</th>
                    <th className="text-left px-4 py-3.5 font-semibold text-gray-600 dark:text-gray-300">Date envoi</th>
                    <th className="text-left px-4 py-3.5 font-semibold text-gray-600 dark:text-gray-300">Destinataires</th>
                    <th className="text-left px-4 py-3.5 font-semibold text-gray-600 dark:text-gray-300">Format</th>
                    <th className="text-left px-4 py-3.5 font-semibold text-gray-600 dark:text-gray-300">Statut</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                  {HISTORIQUE.map((h) => (
                    <tr key={h.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors">
                      <td className="px-5 py-3 font-medium text-gray-800 dark:text-gray-100">{h.rapport}</td>
                      <td className="px-4 py-3 text-gray-500 dark:text-gray-400 text-xs">{h.dateEnvoi}</td>
                      <td className="px-4 py-3 text-gray-500 dark:text-gray-400 text-xs">{h.destinataires}</td>
                      <td className="px-4 py-3">
                        <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded px-2 py-0.5 font-mono">
                          {h.format}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {h.statut === "envoyé" && (
                          <span className="inline-flex items-center gap-1 text-xs text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/20 rounded-full px-2.5 py-1 border border-green-200 dark:border-green-800">
                            <CheckCircle size={11} />
                            Envoyé ✅
                          </span>
                        )}
                        {h.statut === "erreur" && (
                          <span className="inline-flex items-center gap-1 text-xs text-red-600 bg-red-50 rounded-full px-2.5 py-1">
                            Erreur ❌
                          </span>
                        )}
                        {h.statut === "en attente" && (
                          <span className="inline-flex items-center gap-1 text-xs text-orange-600 bg-orange-50 rounded-full px-2.5 py-1">
                            <Clock size={11} /> En attente
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

      </div>
    </div>
  );
}
