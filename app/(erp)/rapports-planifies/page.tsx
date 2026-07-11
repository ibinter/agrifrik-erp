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
  Users,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type TabId = "planification" | "modeles" | "historique" | "abonnes";

interface RapportPlanifie {
  id: number;
  nom: string;
  frequence: string;
  heure: string;
  destinataires: string;
  format: string;
  prochainEnvoi: string;
  actif: boolean;
}

interface HistoriqueEnvoi {
  id: number;
  rapport: string;
  dateEnvoi: string;
  destinataires: string;
  format: string;
  statut: "envoye" | "erreur" | "en-attente";
}

interface Abonne {
  id: number;
  nom: string;
  email: string;
  rapports: number;
  frequence: string;
  actif: boolean;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const KPI = [
  { label: "Rapports actifs", value: "18", icon: BarChart2, color: "text-green-700", bg: "bg-green-50" },
  { label: "Envoyés ce mois", value: "12", icon: Mail, color: "text-blue-700", bg: "bg-blue-50" },
  { label: "Abonnés", value: "8", icon: Users, color: "text-purple-700", bg: "bg-purple-50" },
  { label: "Prochain envoi", value: "Lun 14/07 06:00", icon: Clock, color: "text-orange-700", bg: "bg-orange-50" },
];

const INITIAL_RAPPORTS: RapportPlanifie[] = [
  { id: 1, nom: "Récap. production quotidien", frequence: "Quotidien", heure: "06:00", destinataires: "Ibrahim S., Konan Y.", format: "Email+PDF", prochainEnvoi: "11/07 06:00", actif: true },
  { id: 2, nom: "Cours cacao matinal", frequence: "Quotidien", heure: "07:00", destinataires: "Direction (5)", format: "Email", prochainEnvoi: "11/07 07:00", actif: true },
  { id: 3, nom: "Mouvements de stock", frequence: "Quotidien", heure: "18:00", destinataires: "Adj. Messou, Jean-Bap. K.", format: "Email+CSV", prochainEnvoi: "11/07 18:00", actif: true },
  { id: 4, nom: "Météo agricole 7j", frequence: "Hebdo (Lun)", heure: "06:00", destinataires: "Tous les techniciens", format: "Email+PDF", prochainEnvoi: "14/07", actif: true },
  { id: 5, nom: "Récap. ventes hebdo", frequence: "Hebdo (Lun)", heure: "08:00", destinataires: "Direction", format: "Email+PDF", prochainEnvoi: "14/07", actif: true },
  { id: 6, nom: "Planning semaine", frequence: "Hebdo (Dim 17h)", heure: "17:00", destinataires: "Tous employés cadres", format: "Email", prochainEnvoi: "13/07", actif: true },
  { id: 7, nom: "Bilan trésorerie", frequence: "Mensuel (1er)", heure: "08:00", destinataires: "Jean-Baptiste K., Admin", format: "PDF", prochainEnvoi: "01/08", actif: true },
  { id: 8, nom: "Rapport RH mensuel", frequence: "Mensuel (1er)", heure: "09:00", destinataires: "Mariam K., Admin", format: "PDF", prochainEnvoi: "01/08", actif: true },
  { id: 9, nom: "Bilan qualité mensuel", frequence: "Mensuel (5)", heure: "08:00", destinataires: "Direction qualité", format: "PDF", prochainEnvoi: "05/08", actif: true },
  { id: 10, nom: "Rapport bailleur FAO", frequence: "Sur demande", heure: "—", destinataires: "Jean-Baptiste K.", format: "Word+PDF", prochainEnvoi: "—", actif: true },
  { id: 11, nom: "Rapport ODD trimestriel", frequence: "Trim. (1er/trim.)", heure: "08:00", destinataires: "Admin, DAF", format: "PDF", prochainEnvoi: "01/10", actif: true },
  { id: 12, nom: "Inventaire valorisé", frequence: "Mensuel (1er)", heure: "07:00", destinataires: "Jean-Baptiste K.", format: "Excel", prochainEnvoi: "01/08", actif: true },
];

const HISTORIQUE: HistoriqueEnvoi[] = [
  { id: 1, rapport: "Récap. production quotidien", dateEnvoi: "10/07 06:00", destinataires: "2 destinataires", format: "Email+PDF", statut: "envoye" },
  { id: 2, rapport: "Cours cacao matinal", dateEnvoi: "10/07 07:00", destinataires: "5 destinataires", format: "Email", statut: "envoye" },
  { id: 3, rapport: "Mouvements de stock", dateEnvoi: "09/07 18:00", destinataires: "2 destinataires", format: "Email+CSV", statut: "envoye" },
  { id: 4, rapport: "Récap. production quotidien", dateEnvoi: "09/07 06:00", destinataires: "2 destinataires", format: "Email+PDF", statut: "envoye" },
  { id: 5, rapport: "Météo agricole 7j", dateEnvoi: "07/07 06:00", destinataires: "8 destinataires", format: "Email+PDF", statut: "envoye" },
  { id: 6, rapport: "Récap. ventes hebdo", dateEnvoi: "07/07 08:00", destinataires: "3 destinataires", format: "Email+PDF", statut: "envoye" },
  { id: 7, rapport: "Planning semaine", dateEnvoi: "06/07 17:00", destinataires: "12 destinataires", format: "Email", statut: "envoye" },
  { id: 8, rapport: "Bilan trésorerie", dateEnvoi: "01/07 08:00", destinataires: "2 destinataires", format: "PDF", statut: "envoye" },
  { id: 9, rapport: "Rapport RH mensuel", dateEnvoi: "01/07 09:00", destinataires: "2 destinataires", format: "PDF", statut: "envoye" },
  { id: 10, rapport: "Inventaire valorisé", dateEnvoi: "01/07 07:00", destinataires: "1 destinataire", format: "Excel", statut: "envoye" },
  { id: 11, rapport: "Bilan qualité mensuel", dateEnvoi: "05/07 08:00", destinataires: "2 destinataires", format: "PDF", statut: "envoye" },
  { id: 12, rapport: "Rapport ODD trimestriel", dateEnvoi: "01/07 08:00", destinataires: "2 destinataires", format: "PDF", statut: "envoye" },
];

const ABONNES: Abonne[] = [
  { id: 1, nom: "Admin", email: "admin@agrifrik.com", rapports: 18, frequence: "Quotidien", actif: true },
  { id: 2, nom: "Jean-Baptiste Kouassi", email: "jb.kouassi@agrifrik.com", rapports: 8, frequence: "Quotidien", actif: true },
  { id: 3, nom: "Mariam Kouyaté", email: "m.kouyate@agrifrik.com", rapports: 5, frequence: "Hebdo", actif: true },
  { id: 4, nom: "Ibrahim Sawadogo", email: "i.sawadogo@agrifrik.com", rapports: 3, frequence: "Hebdo", actif: true },
  { id: 5, nom: "Adjoua Messou", email: "a.messou@agrifrik.com", rapports: 4, frequence: "Quotidien", actif: true },
  { id: 6, nom: "Konan Yao", email: "k.yao@agrifrik.com", rapports: 2, frequence: "Hebdo", actif: true },
  { id: 7, nom: "Kouyaté Jean (externe)", email: "jkouyate@barry-callebaut.com", rapports: 1, frequence: "Mensuel", actif: true },
  { id: 8, nom: "ANADER Soubré", email: "soubre@anader.ci", rapports: 1, frequence: "Mensuel", actif: true },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function RapportsPlanifiesPage() {
  const [tab, setTab] = useState<TabId>("planification");
  const [rapports, setRapports] = useState<RapportPlanifie[]>(INITIAL_RAPPORTS);

  const toggleActif = (id: number) => {
    setRapports((prev) =>
      prev.map((r) => (r.id === id ? { ...r, actif: !r.actif } : r))
    );
  };

  const TABS: { id: TabId; label: string }[] = [
    { id: "planification", label: "Planification" },
    { id: "modeles", label: "Modèles" },
    { id: "historique", label: "Historique d'envoi" },
    { id: "abonnes", label: "Abonnés" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Topbar
        title="Rapports Planifiés"
        breadcrumb={["Rapports & BI", "Rapports Planifiés"]}
      />

      <div className="p-6 space-y-6 max-w-7xl mx-auto w-full">

        {/* ── KPI Row ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
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

        {/* ── Tabs + CTA ── */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex gap-1 bg-white rounded-xl border border-gray-100 p-1 shadow-sm">
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
          <Link
            href="/rapport-builder"
            className="flex items-center gap-2 px-4 py-2 bg-[#2E7D32] text-white rounded-xl text-xs font-medium hover:bg-[#1B5E20] transition-colors shadow-sm"
          >
            <Plus size={14} />
            Créer un rapport planifié
          </Link>
        </div>

        {/* ── Onglet Planification ── */}
        {tab === "planification" && (
          <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#F8FBF8] border-b border-gray-100">
                    {["Rapport", "Fréquence", "Heure", "Destinataires", "Format", "Prochain envoi", "Statut", "Actions"].map((h) => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {rapports.map((r) => (
                    <tr key={r.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                            <FileText size={13} className="text-green-600" />
                          </div>
                          <span className="font-medium text-gray-800 whitespace-nowrap">{r.nom}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className="inline-flex items-center gap-1 text-xs bg-blue-50 text-blue-700 rounded-full px-2.5 py-1 whitespace-nowrap">
                          <CalendarDays size={11} />
                          {r.frequence}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-gray-600 text-xs font-mono whitespace-nowrap">{r.heure}</td>
                      <td className="px-4 py-3.5 text-gray-600 text-xs whitespace-nowrap">{r.destinataires}</td>
                      <td className="px-4 py-3.5">
                        <span className="text-xs bg-gray-100 text-gray-600 rounded px-2 py-0.5 font-mono whitespace-nowrap">
                          {r.format}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-xs font-medium text-gray-700 whitespace-nowrap">{r.prochainEnvoi}</td>
                      <td className="px-4 py-3.5">
                        <span className={`inline-flex items-center gap-1 text-xs rounded-full px-2.5 py-1 font-medium whitespace-nowrap ${
                          r.actif
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-500"
                        }`}>
                          <CheckCircle size={11} />
                          {r.actif ? "Actif" : "En pause"}
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-2 whitespace-nowrap">
                          <button className="flex items-center gap-1 text-xs text-blue-600 hover:underline">
                            <Pencil size={12} /> Modifier
                          </button>
                          <span className="text-gray-300">/</span>
                          <button
                            onClick={() => toggleActif(r.id)}
                            className={`flex items-center gap-1 text-xs hover:underline ${
                              r.actif ? "text-orange-500" : "text-green-600"
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
        )}

        {/* ── Onglet Modèles ── */}
        {tab === "modeles" && (
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h3 className="text-base font-bold text-gray-800 mb-4">Modèles de rapports disponibles</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { nom: "Récapitulatif production", categorie: "Production", format: "PDF", description: "Synthèse quotidienne des volumes récoltés par culture et parcelle" },
                { nom: "Cours des marchés", categorie: "Commerce", format: "Email", description: "Prix cacao, café, hévéa en temps réel — sources BCRG & ANADER" },
                { nom: "Bilan financier", categorie: "Finance", format: "PDF+Excel", description: "Trésorerie, budget, écarts prévisionnels — consolidé mensuel" },
                { nom: "Rapport bailleur FAO", categorie: "Bailleurs", format: "Word+PDF", description: "Template officiel FAO — indicateurs ODD, dépenses, avancement" },
                { nom: "Rapport RH & paie", categorie: "RH", format: "PDF", description: "Effectifs, absences, heures supplémentaires, masse salariale" },
                { nom: "Bilan qualité", categorie: "Qualité", format: "PDF", description: "Non-conformités, résultats laboratoire, taux de conformité" },
              ].map((m) => (
                <div key={m.nom} className="rounded-xl border border-gray-100 p-4 bg-gray-50 hover:bg-white hover:shadow-sm transition-all cursor-pointer">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{m.nom}</p>
                      <span className="inline-block text-xs bg-[#2E7D32]/10 text-[#2E7D32] rounded px-1.5 py-0.5 mt-1 font-medium">{m.categorie}</span>
                    </div>
                    <span className="text-xs bg-gray-200 text-gray-600 rounded px-2 py-0.5 font-mono">{m.format}</span>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">{m.description}</p>
                  <button className="mt-3 text-xs text-[#2E7D32] font-medium hover:underline">Utiliser ce modèle →</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Onglet Historique ── */}
        {tab === "historique" && (
          <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h3 className="text-base font-bold text-gray-800">Historique d'envoi</h3>
              <p className="text-xs text-gray-400 mt-0.5">12 rapports envoyés ce mois · 0 erreur</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#F8FBF8] border-b border-gray-100">
                    {["Rapport", "Date & heure", "Destinataires", "Format", "Statut"].map((h) => (
                      <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {HISTORIQUE.map((h) => (
                    <tr key={h.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-5 py-3 font-medium text-gray-800">{h.rapport}</td>
                      <td className="px-5 py-3 text-gray-500 text-xs font-mono whitespace-nowrap">{h.dateEnvoi}</td>
                      <td className="px-5 py-3 text-gray-500 text-xs">{h.destinataires}</td>
                      <td className="px-5 py-3">
                        <span className="text-xs bg-gray-100 text-gray-600 rounded px-2 py-0.5 font-mono">
                          {h.format}
                        </span>
                      </td>
                      <td className="px-5 py-3">
                        {h.statut === "envoye" && (
                          <span className="inline-flex items-center gap-1 text-xs text-green-700 bg-green-50 rounded-full px-2.5 py-1">
                            <CheckCircle size={11} /> Envoyé
                          </span>
                        )}
                        {h.statut === "erreur" && (
                          <span className="inline-flex items-center gap-1 text-xs text-red-600 bg-red-50 rounded-full px-2.5 py-1">
                            Erreur
                          </span>
                        )}
                        {h.statut === "en-attente" && (
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
        )}

        {/* ── Onglet Abonnés ── */}
        {tab === "abonnes" && (
          <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-gray-800">Abonnés aux rapports</h3>
                <p className="text-xs text-gray-400 mt-0.5">8 abonnés actifs · 6 internes, 2 externes</p>
              </div>
              <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#2E7D32] text-white text-xs font-medium hover:bg-[#1B5E20] transition-colors">
                <Plus size={13} /> Ajouter un abonné
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#F8FBF8] border-b border-gray-100">
                    {["Abonné", "Email", "Rapports", "Fréquence max", "Statut"].map((h) => (
                      <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {ABONNES.map((a) => (
                    <tr key={a.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-[#2E7D32]/10 flex items-center justify-center flex-shrink-0">
                            <span className="text-xs font-bold text-[#2E7D32]">
                              {a.nom.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                            </span>
                          </div>
                          <span className="font-medium text-gray-800 whitespace-nowrap">{a.nom}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-gray-500 text-xs">{a.email}</td>
                      <td className="px-5 py-3.5">
                        <span className="inline-flex items-center gap-1 text-xs bg-blue-50 text-blue-700 rounded-full px-2.5 py-1 font-medium">
                          <FileText size={11} />
                          {a.rapports} rapport{a.rapports > 1 ? "s" : ""}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                          a.frequence === "Quotidien"
                            ? "bg-orange-100 text-orange-700"
                            : a.frequence === "Hebdo"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-gray-100 text-gray-600"
                        }`}>
                          {a.frequence}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="inline-flex items-center gap-1 text-xs rounded-full px-2.5 py-1 font-medium bg-green-100 text-green-700">
                          <CheckCircle size={11} /> Actif
                        </span>
                      </td>
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
