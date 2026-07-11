"use client";

import { useState } from "react";
import Topbar from "../../components/Topbar";
import {
  Plus,
  CheckCircle,
  Clock,
  Send,
  Calendar,
  Info,
} from "lucide-react";

const rapportsActifs = [
  { nom: "Rapport mensuel production", freq: "Mensuel (dernier jour)", dest: "DG + CF + Terrain", prochain: "31/07/2025", format: "PDF", statut: "actif" },
  { nom: "Rapport hebdomadaire terrain", freq: "Hebdo (lundi 08h)", dest: "DG + Terrain", prochain: "14/07/2025", format: "PDF", statut: "actif" },
  { nom: "Rapport qualité par lot", freq: "À chaque lot finalisé", dest: "DG + Acheteurs", prochain: "Prochain lot", format: "PDF+Email", statut: "actif" },
  { nom: "Rapport bailleur FAO (trimestriel)", freq: "Trimestriel (15e du mois)", dest: "CF + FAO", prochain: "15/10/2025", format: "PDF", statut: "actif" },
  { nom: "Rapport CA hebdomadaire", freq: "Hebdo (vendredi 18h)", dest: "DG", prochain: "11/07/2025", format: "Email résumé", statut: "actif" },
  { nom: "Rapport stocks critique", freq: "Seuil (alerte temps réel)", dest: "DG + Logistique", prochain: "En continu", format: "Email", statut: "actif" },
  { nom: "Rapport RSE trimestriel", freq: "Trimestriel", dest: "DG + Bailleurs", prochain: "01/10/2025", format: "PDF", statut: "actif" },
  { nom: "Rapport annuel 2025", freq: "Annuel (15 jan 2026)", dest: "DG + Comptable + Banque", prochain: "15/01/2026", format: "PDF", statut: "preparation" },
];

const historique = [
  { date: "07/07", rapport: "Rapport terrain hebdo RT-2025-028", dest: 2, statut: "Livré (08h02)", duree: "3s" },
  { date: "04/07", rapport: "Rapport CA hebdo", dest: 1, statut: "Livré (18h01)", duree: "1s" },
  { date: "30/06", rapport: "Rapport mensuel juin", dest: 3, statut: "Livré (23h58)", duree: "12s" },
  { date: "27/06", rapport: "Rapport terrain hebdo RT-2025-027", dest: 2, statut: "Livré (08h01)", duree: "3s" },
  { date: "20/06", rapport: "Rapport terrain hebdo RT-2025-026", dest: 2, statut: "Livré (08h03)", duree: "3s" },
  { date: "13/06", rapport: "Rapport terrain hebdo RT-2025-025", dest: 2, statut: "Livré (08h00)", duree: "3s" },
  { date: "06/06", rapport: "Rapport terrain hebdo RT-2025-024", dest: 2, statut: "Livré (08h04)", duree: "3s" },
  { date: "06/06", rapport: "Rapport CA hebdo", dest: 1, statut: "Livré (18h00)", duree: "1s" },
  { date: "15/04", rapport: "Rapport bailleur FAO Q1 2025", dest: 2, statut: "Livré (09h15)", duree: "18s" },
  { date: "31/03", rapport: "Rapport mensuel mars", dest: 3, statut: "Livré (23h55)", duree: "11s" },
  { date: "20/03", rapport: "Alerte stocks critique — Cupravit", dest: 2, statut: "Livré (14h22)", duree: "0s" },
  { date: "28/02", rapport: "Rapport mensuel février", dest: 3, statut: "Livré (23h59)", duree: "10s" },
  { date: "15/01", rapport: "Rapport RSE T4 2024", dest: 3, statut: "Livré (10h00)", duree: "14s" },
  { date: "10/01", rapport: "Rapport annuel 2024 (partiel)", dest: 4, statut: "Livré (08h30)", duree: "45s" },
  { date: "01/01", rapport: "Rapport mensuel décembre 2024", dest: 3, statut: "Livré (00h02)", duree: "13s" },
];

export default function RapportsPlanifiesPage() {
  const [onglet, setOnglet] = useState<"actifs" | "historique">("actifs");

  return (
    <div className="min-h-screen bg-[#F8FBF8]">
      <Topbar
        title="Rapports Planifiés"
        breadcrumb={["Rapports", "Rapports Planifiés"]}
      />

      <div className="mx-auto max-w-6xl px-6 py-6 space-y-6">

        {/* En-tête */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Rapports Planifiés</h1>
            <p className="text-sm text-gray-500 mt-0.5">Automatisation et planification des rapports récurrents</p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-xl bg-[#2E7D32] px-4 py-2 text-xs font-medium text-white hover:bg-[#1B5E20] transition-colors self-start sm:self-auto">
            <Plus className="h-4 w-4" />
            Nouveau rapport planifié
          </button>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-2xl border border-gray-100 bg-white p-5 text-center">
            <p className="text-2xl font-bold text-[#2E7D32]">8</p>
            <p className="text-xs text-gray-500 mt-1">Rapports actifs</p>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-white p-5 text-center">
            <p className="text-2xl font-bold text-[#2E7D32]">3</p>
            <p className="text-xs text-gray-500 mt-1">Envoyés ce mois</p>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-white p-5 text-center">
            <p className="text-2xl font-bold text-[#2E7D32]">20j</p>
            <p className="text-xs text-gray-500 mt-1">Prochain envoi dans</p>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-white p-5 text-center">
            <p className="text-2xl font-bold text-[#2E7D32]">100%</p>
            <p className="text-xs text-gray-500 mt-1">Taux de livraison</p>
          </div>
        </div>

        {/* Onglets */}
        <div className="flex gap-1 border-b border-gray-200">
          {(["actifs", "historique"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setOnglet(tab)}
              className={`px-5 py-2.5 text-sm font-medium border-b-2 transition-colors ${
                onglet === tab
                  ? "border-[#2E7D32] text-[#2E7D32]"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab === "actifs" ? "Rapports actifs" : "Historique des envois"}
            </button>
          ))}
        </div>

        {/* Onglet Rapports actifs */}
        {onglet === "actifs" && (
          <div className="space-y-4">
            <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-[#F8FBF8]">
                      <th className="text-left px-4 py-3 text-gray-500 font-medium">Nom</th>
                      <th className="text-left px-4 py-3 text-gray-500 font-medium">Fréquence</th>
                      <th className="text-left px-4 py-3 text-gray-500 font-medium">Destinataires</th>
                      <th className="text-left px-4 py-3 text-gray-500 font-medium">Prochain envoi</th>
                      <th className="text-left px-4 py-3 text-gray-500 font-medium">Format</th>
                      <th className="text-left px-4 py-3 text-gray-500 font-medium">Statut</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rapportsActifs.map((r, i) => (
                      <tr key={i} className="border-t border-gray-50 hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 font-medium text-gray-800">{r.nom}</td>
                        <td className="px-4 py-3 text-gray-600">
                          <div className="flex items-center gap-1.5">
                            <Clock className="h-3 w-3 text-gray-400" />
                            {r.freq}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-gray-600">{r.dest}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="h-3 w-3 text-gray-400" />
                            <span className="font-medium text-gray-700">{r.prochain}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="inline-flex rounded-full bg-gray-100 px-2 py-0.5 text-gray-600 text-[10px] font-medium">
                            {r.format}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          {r.statut === "actif" ? (
                            <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 text-[10px] font-medium text-green-700">
                              <CheckCircle className="h-3 w-3" /> Actif
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-medium text-blue-700">
                              🔵 En préparation
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Card info verte */}
            <div className="rounded-xl bg-green-50 border border-green-100 p-4 flex items-start gap-3">
              <Info className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-green-800">
                Le prochain rapport automatique est{" "}
                <strong>&laquo; Rapport CA hebdomadaire &raquo;</strong> prévu pour le{" "}
                <strong>vendredi 11/07/2025 à 18h00</strong>.
              </p>
            </div>
          </div>
        )}

        {/* Onglet Historique */}
        {onglet === "historique" && (
          <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-[#F8FBF8]">
                    <th className="text-left px-4 py-3 text-gray-500 font-medium">Date</th>
                    <th className="text-left px-4 py-3 text-gray-500 font-medium">Rapport</th>
                    <th className="text-left px-4 py-3 text-gray-500 font-medium">Destinataires</th>
                    <th className="text-left px-4 py-3 text-gray-500 font-medium">Statut</th>
                    <th className="text-left px-4 py-3 text-gray-500 font-medium">Durée génération</th>
                  </tr>
                </thead>
                <tbody>
                  {historique.map((h, i) => (
                    <tr key={i} className="border-t border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 font-mono font-medium text-gray-600">{h.date}</td>
                      <td className="px-4 py-3 text-gray-700">{h.rapport}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1 text-gray-600">
                          <Send className="h-3 w-3 text-gray-400" />
                          {h.dest} destinataire{h.dest > 1 ? "s" : ""}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 text-[10px] font-medium text-green-700">
                          ✅ {h.statut}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-mono text-gray-500">{h.duree}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
