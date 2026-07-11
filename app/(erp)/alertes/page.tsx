"use client";

import { useState } from "react";
import Topbar from "../../components/Topbar";
import {
  AlertTriangle,
  CheckCircle,
  Info,
  Bell,
  ShoppingCart,
  Eye,
  UserCheck,
  XCircle,
  FileText,
  Settings,
} from "lucide-react";

type CategoryFilter =
  | "Toutes"
  | "Stock"
  | "Finance"
  | "RH"
  | "Production"
  | "Qualité"
  | "Sécurité"
  | "Système";

const CATEGORY_FILTERS: CategoryFilter[] = [
  "Toutes",
  "Stock",
  "Finance",
  "RH",
  "Production",
  "Qualité",
  "Sécurité",
  "Système",
];

interface AlertRule {
  id: number;
  rule: string;
  condition: string;
  threshold: string;
  channel: string;
  recipient: string;
}

const ALERT_RULES: AlertRule[] = [
  { id: 1, rule: "Stock critique", condition: "Quantité < seuil", threshold: "Paramétrable", channel: "App + Email", recipient: "Responsable stock" },
  { id: 2, rule: "Dépassement budget", condition: "> 100% du budget", threshold: "Par poste", channel: "App + Email", recipient: "DAF" },
  { id: 3, rule: "Contrat expirant", condition: "< 90 jours", threshold: "—", channel: "App + Email", recipient: "DRH + DAF" },
  { id: 4, rule: "Qualité hors norme", condition: "Humidité > 10%", threshold: "Paramétrable", channel: "App + SMS", recipient: "Resp. qualité" },
  { id: 5, rule: "Retard paiement", condition: "> 30 jours", threshold: "—", channel: "App + Email", recipient: "DAF" },
  { id: 6, rule: "Maintenance préventive", condition: "> 90% compteur", threshold: "—", channel: "App", recipient: "Mécanicien" },
  { id: 7, rule: "Météo extrême", condition: "Alerte Météo API", threshold: "—", channel: "App + SMS", recipient: "Tous cadres" },
  { id: 8, rule: "Non-conformité", condition: "Toute NC P1/P2", threshold: "—", channel: "App + Email", recipient: "Dir. Qualité" },
];

export default function AlertesPage() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("Toutes");
  const [dismissedCritical, setDismissedCritical] = useState<Set<number>>(new Set());
  const [inProgressCritical, setInProgressCritical] = useState<Set<number>>(new Set());

  const kpis = [
    { label: "Alertes critiques", value: 3, color: "text-red-600", bg: "bg-red-50", border: "border-red-100", icon: <AlertTriangle size={18} className="text-red-600" /> },
    { label: "Avertissements", value: 8, color: "text-yellow-600", bg: "bg-yellow-50", border: "border-yellow-100", icon: <Bell size={18} className="text-yellow-600" /> },
    { label: "Informations", value: 14, color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-100", icon: <Info size={18} className="text-blue-600" /> },
    { label: "Résolues (7j)", value: 22, color: "text-green-600", bg: "bg-green-50", border: "border-green-100", icon: <CheckCircle size={18} className="text-green-600" /> },
  ];

  const criticalAlerts = [
    {
      id: 1,
      category: "Stock" as CategoryFilter,
      title: "STOCK CRITIQUE — KCl Engrais",
      created: "09/07/2025 à 08:42",
      details: [
        { label: "Stock actuel", value: "45 kg" },
        { label: "Seuil critique", value: "50 kg" },
        { label: "Stock recommandé", value: "200 kg" },
      ],
      action: "Commander immédiatement auprès de YARA Nederland",
      buttons: [
        { label: "Créer bon de commande", icon: <ShoppingCart size={12} />, primary: true },
        { label: "Marquer en cours", icon: <UserCheck size={12} />, primary: false },
        { label: "Ignorer", icon: <XCircle size={12} />, danger: true },
      ],
    },
    {
      id: 2,
      category: "Finance" as CategoryFilter,
      title: "CONTRATS EXPIRANT — TOTAL Énergie + Transport Rapide",
      created: "08/07/2025 à 09:00",
      details: [
        { label: "Contrats concernés", value: "2 fournisseurs" },
        { label: "Date d'expiration", value: "31/12/2025" },
        { label: "Renouvellement", value: "Non initié" },
      ],
      action: "Initier processus de renouvellement avant le 30/09/2025",
      buttons: [
        { label: "Voir contrats", icon: <Eye size={12} />, primary: true },
        { label: "Assigner à Jean-Baptiste K.", icon: <UserCheck size={12} />, primary: false },
        { label: "Ignorer", icon: <XCircle size={12} />, danger: true },
      ],
    },
    {
      id: 3,
      category: "Qualité" as CategoryFilter,
      title: "ANOMALIE QUALITÉ — Lot LOT-032 Anacarde",
      created: "07/07/2025 à 14:18",
      details: [
        { label: "Humidité mesurée", value: "12,4%" },
        { label: "Norme RA", value: "< 10%" },
        { label: "Risque", value: "Moisissures → perte lot" },
      ],
      action: "Séchage d'urgence. Ne pas expédier. Isoler en zone quarantaine B.",
      buttons: [
        { label: "Voir lot", icon: <Eye size={12} />, primary: true },
        { label: "Déclencher protocole", icon: <AlertTriangle size={12} />, primary: false },
        { label: "Assigner à Ibrahim S.", icon: <UserCheck size={12} />, primary: false },
        { label: "Ignorer", icon: <XCircle size={12} />, danger: true },
      ],
    },
  ];

  const warnings = [
    { id: 1, category: "Finance" as CategoryFilter, text: "Budget R&D dépassé de 8% — 118 000 XOF hors budget" },
    { id: 2, category: "RH" as CategoryFilter, text: "Contrats CDD × 3 expirant en Oct 2025 — Décision RH requise" },
    { id: 3, category: "Production" as CategoryFilter, text: "Tracteur JD 6120M : révision à 3 000h (actuellement 2 847h — prévoir dans ~30h de travail)" },
    { id: 4, category: "Finance" as CategoryFilter, text: "Retard paiement client Cemoi Chocolatier — Facture FAC-2025-028 — 18j de retard" },
    { id: 5, category: "Production" as CategoryFilter, text: "Tempête prévue le 13/07 — Protéger séchoirs et bâches parcelles D1, D2, D3" },
    { id: 6, category: "Qualité" as CategoryFilter, text: "Lot LOT-028 Cacao : date limite fermentation le 11/07 — Passer au séchage" },
    { id: 7, category: "Qualité" as CategoryFilter, text: "Renouvellement certification Rainforest Alliance : audit le 15/09 — Préparer dossier" },
    { id: 8, category: "Stock" as CategoryFilter, text: "Stock Cypermethrine : 18L vs seuil 20L — Commander avant la semaine prochaine" },
  ];

  const visibleCritical = criticalAlerts.filter(
    (a) => !dismissedCritical.has(a.id) && (activeCategory === "Toutes" || a.category === activeCategory)
  );
  const visibleWarnings = warnings.filter(
    (w) => activeCategory === "Toutes" || w.category === activeCategory
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Topbar title="Alertes & Surveillance" breadcrumb={["Administration", "Alertes"]} />

      <main className="flex-1 p-6 space-y-6 max-w-6xl mx-auto w-full">
        {/* KPIs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {kpis.map((kpi) => (
            <div
              key={kpi.label}
              className={`bg-white rounded-2xl border ${kpi.border} p-4 flex items-center gap-3`}
            >
              <div className={`w-10 h-10 rounded-full ${kpi.bg} flex items-center justify-center flex-shrink-0`}>
                {kpi.icon}
              </div>
              <div>
                <p className={`text-2xl font-bold ${kpi.color}`}>{kpi.value}</p>
                <p className="text-xs text-gray-500 font-medium leading-tight">{kpi.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2">
          {CATEGORY_FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveCategory(f)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                activeCategory === f
                  ? "bg-[#2E7D32] text-white border-[#2E7D32]"
                  : "bg-white text-gray-600 border-gray-200 hover:border-[#2E7D32] hover:text-[#2E7D32]"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Critical alerts */}
        {visibleCritical.length > 0 && (
          <section className="space-y-3">
            <h2 className="text-sm font-semibold text-red-700 flex items-center gap-2">
              <AlertTriangle size={15} />
              Alertes critiques ({visibleCritical.length})
            </h2>
            {visibleCritical.map((alert) => (
              <div
                key={alert.id}
                className="bg-white rounded-2xl border border-red-200 border-l-4 border-l-red-500 p-5 space-y-3"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold bg-red-100 text-red-700 px-2 py-0.5 rounded-full">CRITIQUE</span>
                    <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{alert.category}</span>
                  </div>
                  <span className="text-[10px] text-gray-400">Créée le {alert.created}</span>
                </div>

                <p className="text-sm font-bold text-red-800">{alert.title}</p>

                <div className="flex flex-wrap gap-4">
                  {alert.details.map((d) => (
                    <div key={d.label} className="text-xs">
                      <span className="text-gray-500">{d.label} : </span>
                      <span className="font-semibold text-gray-800">{d.value}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-red-50 rounded-xl px-4 py-2 text-xs text-red-700 font-medium flex items-start gap-1.5">
                  <span className="mt-0.5 flex-shrink-0">⚡</span>
                  <span>Action requise : {alert.action}</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {alert.buttons.map((btn) => (
                    <button
                      key={btn.label}
                      onClick={() => {
                        if (btn.danger) setDismissedCritical((s) => new Set([...s, alert.id]));
                        else if (btn.label.startsWith("Marquer")) setInProgressCritical((s) => new Set([...s, alert.id]));
                      }}
                      className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-xl font-medium transition-colors ${
                        btn.primary
                          ? "bg-[#2E7D32] text-white hover:bg-[#256027]"
                          : btn.danger
                          ? "border border-red-200 text-red-500 hover:bg-red-50"
                          : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {btn.icon}
                      {btn.label}
                    </button>
                  ))}
                  {inProgressCritical.has(alert.id) && (
                    <span className="text-xs text-yellow-600 font-medium px-2 py-1.5 bg-yellow-50 rounded-xl border border-yellow-200">
                      En cours de traitement
                    </span>
                  )}
                </div>
              </div>
            ))}
          </section>
        )}

        {/* Warnings */}
        {visibleWarnings.length > 0 && (
          <section className="space-y-3">
            <h2 className="text-sm font-semibold text-yellow-700 flex items-center gap-2">
              <Bell size={15} />
              Avertissements ({visibleWarnings.length})
            </h2>
            <div className="space-y-2">
              {visibleWarnings.map((w) => (
                <div
                  key={w.id}
                  className="bg-white rounded-2xl border border-yellow-100 border-l-4 border-l-yellow-400 px-5 py-3 flex items-start gap-3"
                >
                  <span className="text-yellow-500 mt-0.5 flex-shrink-0 text-sm">🟡</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-800">{w.text}</p>
                    <span className="text-[10px] bg-yellow-50 text-yellow-700 px-2 py-0.5 rounded-full mt-1 inline-block">
                      {w.category}
                    </span>
                  </div>
                  <button className="text-xs px-3 py-1.5 rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 whitespace-nowrap flex-shrink-0">
                    Traiter
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {visibleCritical.length === 0 && visibleWarnings.length === 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center text-gray-400 text-sm">
            Aucune alerte dans cette catégorie.
          </div>
        )}

        {/* Alert rules table */}
        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
            <Settings size={15} className="text-gray-400" />
            Règles d&apos;alertes actives (8)
          </h2>
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#F8FBF8] border-b border-gray-100">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 whitespace-nowrap">Règle</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 whitespace-nowrap">Condition</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 whitespace-nowrap">Seuil</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 whitespace-nowrap">Canal</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 whitespace-nowrap">Destinataire</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 whitespace-nowrap">Statut</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {ALERT_RULES.map((rule) => (
                    <tr key={rule.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-xs font-semibold text-gray-800 whitespace-nowrap">{rule.rule}</td>
                      <td className="px-4 py-3 text-xs text-gray-600">{rule.condition}</td>
                      <td className="px-4 py-3 text-xs text-gray-500">{rule.threshold}</td>
                      <td className="px-4 py-3">
                        <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full whitespace-nowrap">
                          {rule.channel}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-600 whitespace-nowrap">{rule.recipient}</td>
                      <td className="px-4 py-3">
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                          ✅ Active
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
