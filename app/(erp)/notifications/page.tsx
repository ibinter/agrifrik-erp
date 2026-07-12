"use client";

import { useState } from "react";
import Topbar from "../../components/Topbar";
import {
  Bell,
  BellOff,
  Settings,
  AlertTriangle,
  Info,
  CheckCircle2,
  ArrowRight,
  Package,
  FileText,
  DollarSign,
  Cloud,
  Truck,
  Users,
} from "lucide-react";

type Filter = "all" | "unread" | "critical" | "stock" | "commerce" | "finance" | "rh";

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "Toutes" },
  { id: "unread", label: "Non lues" },
  { id: "critical", label: "Critiques" },
  { id: "stock", label: "Stock" },
  { id: "commerce", label: "Commerce" },
  { id: "finance", label: "Finance" },
  { id: "rh", label: "RH" },
];

type NotifType = "critical" | "warning" | "info" | "success";
type NotifModule =
  | "Stocks"
  | "Commerce"
  | "Finance"
  | "Assurances"
  | "Ventes"
  | "Fermentation"
  | "Météo"
  | "Logistique"
  | "RH"
  | "Planning"
  | "Devis"
  | "Cultures"
  | "Paie";

interface Notification {
  id: string;
  date: string;
  type: NotifType;
  module: NotifModule;
  titre: string;
  resume: string;
  lu: boolean;
  actions?: { label: string; href: string }[];
}

const ALL_NOTIFS: Notification[] = [
  {
    id: "n1",
    date: "11/07 09h14",
    type: "critical",
    module: "Stocks",
    titre: "ALERTE STOCK — KCl 60% — 2 sacs (seuil 5 sacs)",
    resume:
      "Le stock KCl 60% (ENT-001 Zone D) est descendu sous le seuil d'alerte (5 sacs). Fertilisation PAR-B1 prévue le 18/07 nécessite 9 sacs. Commander immédiatement (KCl Distribution).",
    lu: false,
    actions: [
      { label: "Commander", href: "/achats" },
      { label: "Voir le stock", href: "/stocks" },
    ],
  },
  {
    id: "n2",
    date: "11/07 08h30",
    type: "warning",
    module: "Devis",
    titre: "DEVIS EXPIRANT — DEV-2025-004 SIFCA (J-16)",
    resume:
      "Le devis DEV-2025-004 (SIFCA — Anacarde WW320 3t — 4 620 000 XOF) expire le 27/07/2025. Relance recommandée.",
    lu: false,
    actions: [{ label: "Voir le devis", href: "/devis" }],
  },
  {
    id: "n3",
    date: "11/07 08h00",
    type: "warning",
    module: "Finance",
    titre: "PAIEMENT PRIME NSIA — 273 000 XOF — Échéance 15/07",
    resume:
      "Le solde de prime d'assurance NSIA-MPR-CI-2025 est dû le 15/07/2025. Montant : 273 000 XOF.",
    lu: false,
    actions: [{ label: "Voir la police", href: "/assurances" }],
  },
  {
    id: "n4",
    date: "10/07 18h45",
    type: "success",
    module: "Ventes",
    titre: "FAC-2025-009 remise en banque",
    resume:
      "Le règlement de la facture FAC-2025-009 (Cameroonian Choco — 1 200 000 XOF) a été confirmé et remis en banque.",
    lu: true,
  },
  {
    id: "n5",
    date: "10/07 14h22",
    type: "info",
    module: "Fermentation",
    titre: "LOT-047 J3 retournement confirmé",
    resume:
      "Le retournement J3 du lot de fermentation LOT-047 (Cacao PH16, parcelle P03) a été enregistré par Ibrahim Sawadogo.",
    lu: true,
  },
  {
    id: "n6",
    date: "09/07 08h30",
    type: "info",
    module: "Météo",
    titre: "Prévision 14j : pluies 13-15/07",
    resume:
      "SODEXAM prévoit des précipitations modérées (25–40 mm) sur la région Nawa du 13 au 15/07. Prévoir adaptation des opérations terrain.",
    lu: true,
  },
  {
    id: "n7",
    date: "08/07 17h00",
    type: "success",
    module: "Logistique",
    titre: "LOG-2025-007 livraison BC confirmée",
    resume:
      "La livraison LOG-2025-007 (Super Cupravit 50g × 40 sacs + Semences cacao PH16 × 200) par BC Distribution a été réceptionnée sans réserve.",
    lu: true,
  },
  {
    id: "n8",
    date: "07/07 09h15",
    type: "warning",
    module: "Stocks",
    titre: "Super Cupravit sous seuil — résolu",
    resume:
      "Le stock Super Cupravit était passé sous le seuil (3 sacs). Commande urgente exécutée. Stock reconstitué à 43 sacs après livraison LOG-2025-007.",
    lu: true,
  },
  {
    id: "n9",
    date: "06/07 12h00",
    type: "info",
    module: "Planning",
    titre: "Tâche planifiée : traitement phytosanitaire P01 → P06",
    resume:
      "Rappel : traitement phytosanitaire Anti-Capsides (Parcelles P01 à P06) planifié le 12/07/2025. Responsable : Ibrahim Sawadogo.",
    lu: true,
  },
  {
    id: "n10",
    date: "05/07 10h30",
    type: "success",
    module: "Commerce",
    titre: "Contrat exportation CEMOI signé",
    resume:
      "Le contrat d'exportation EXP-2025-003 (CEMOI France — Cacao fermenté 2t — 4 800 000 XOF) a été signé et archivé.",
    lu: true,
  },
  {
    id: "n11",
    date: "04/07 08h00",
    type: "info",
    module: "Cultures",
    titre: "Rapport terrain hebdomadaire — Semaine 27",
    resume:
      "Ibrahim Sawadogo a soumis le rapport hebdomadaire S27. Taux de couverture traitement : 94%. Aucune anomalie phytosanitaire majeure détectée.",
    lu: true,
  },
  {
    id: "n12",
    date: "03/07 16h20",
    type: "info",
    module: "RH",
    titre: "Renouvellement contrat — Akissi Kouamé",
    resume:
      "Le contrat saisonnier d'Akissi Kouamé expire le 31/08/2025. Décision de renouvellement à prendre avant le 20/07/2025.",
    lu: true,
  },
  {
    id: "n13",
    date: "02/07 09h00",
    type: "success",
    module: "Paie",
    titre: "Bulletins de paie juin 2025 générés",
    resume:
      "3 bulletins de paie (Koffi Amani, Adjoua Messou, Ibrahim Sawadogo) ont été générés pour juin 2025. Total : 875 000 XOF.",
    lu: true,
  },
  {
    id: "n14",
    date: "01/07 07h30",
    type: "info",
    module: "Météo",
    titre: "Bulletin météo — 1er juillet 2025",
    resume:
      "Températures : 24–31°C. Humidité : 78%. Ensoleillement correct. Pas de précipitations significatives prévues. Conditions favorables aux traitements.",
    lu: true,
  },
  {
    id: "n15",
    date: "30/06 11h15",
    type: "success",
    module: "Finance",
    titre: "Clôture comptable juin 2025 validée",
    resume:
      "La clôture mensuelle de juin 2025 a été validée par Adjoua Messou. Résultat mensuel net : +1 240 000 XOF. Trésorerie disponible : 6 714 000 XOF.",
    lu: true,
  },
];

const MODULE_FILTER_MAP: Record<Filter, string[] | null> = {
  all: null,
  unread: null,
  critical: null,
  stock: ["Stocks"],
  commerce: ["Commerce", "Ventes", "Devis"],
  finance: ["Finance", "Assurances", "Paie"],
  rh: ["RH"],
};

function typeIconBubble(type: NotifType) {
  if (type === "critical")
    return (
      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-red-100 shrink-0">
        <AlertTriangle size={15} className="text-red-600" />
      </span>
    );
  if (type === "warning")
    return (
      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-100 shrink-0">
        <AlertTriangle size={15} className="text-amber-600" />
      </span>
    );
  if (type === "success")
    return (
      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 shrink-0">
        <CheckCircle2 size={15} className="text-[#2E7D32]" />
      </span>
    );
  return (
    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 shrink-0">
      <Info size={15} className="text-blue-600" />
    </span>
  );
}

function typeBadge(type: NotifType) {
  const base = "text-[10px] font-semibold px-2 py-0.5 rounded-full";
  if (type === "critical") return <span className={`${base} bg-red-100 text-red-700`}>🔴 Critique</span>;
  if (type === "warning") return <span className={`${base} bg-amber-100 text-amber-700`}>🟡 Alerte</span>;
  if (type === "success") return <span className={`${base} bg-green-100 text-[#2E7D32]`}>✅ Info</span>;
  return <span className={`${base} bg-blue-100 text-blue-700`}>🔵 Info</span>;
}

function moduleIcon(mod: NotifModule) {
  const cls = "text-gray-400";
  const s = 11;
  switch (mod) {
    case "Stocks": return <Package size={s} className={cls} />;
    case "Commerce":
    case "Ventes":
    case "Devis": return <FileText size={s} className={cls} />;
    case "Finance":
    case "Assurances":
    case "Paie": return <DollarSign size={s} className={cls} />;
    case "Météo": return <Cloud size={s} className={cls} />;
    case "Logistique": return <Truck size={s} className={cls} />;
    case "RH": return <Users size={s} className={cls} />;
    default: return <Info size={s} className={cls} />;
  }
}

export default function NotificationsPage() {
  const [filter, setFilter] = useState<Filter>("all");
  const [notifications, setNotifications] = useState<Notification[]>(ALL_NOTIFS);

  const markAllRead = () =>
    setNotifications((prev) => prev.map((n) => ({ ...n, lu: true })));

  const markRead = (id: string) =>
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, lu: true } : n))
    );

  const filtered = notifications.filter((n) => {
    if (filter === "unread") return !n.lu;
    if (filter === "critical") return n.type === "critical";
    const mods = MODULE_FILTER_MAP[filter];
    if (mods) return mods.includes(n.module);
    return true;
  });

  const unread = notifications.filter((n) => !n.lu);
  const critical = notifications.filter((n) => n.type === "critical");

  const kpis = [
    { label: "Notifications", value: notifications.length, color: "text-gray-800" },
    { label: "Non lues", value: unread.length, color: "text-blue-600" },
    { label: "Critiques", value: critical.length, color: "text-red-600" },
    { label: "Action urgente manquée", value: 0, color: "text-[#2E7D32]" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Topbar />
      <main className="flex-1 p-6 max-w-5xl mx-auto w-full">
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-3 mb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Bell size={20} className="text-[#2E7D32]" />
              <h1 className="text-xl font-bold text-gray-900">Notifications</h1>
            </div>
            <p className="text-sm text-gray-500">
              Alertes et informations en temps réel — 11/07/2025
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={markAllRead}
              className="flex items-center gap-1.5 bg-white border border-gray-200 text-gray-700 rounded-xl text-xs font-medium px-3 py-2"
            >
              <CheckCircle2 size={13} /> Tout marquer comme lu
            </button>
            <button className="flex items-center gap-1.5 bg-[#2E7D32] text-white rounded-xl text-xs font-medium px-3 py-2">
              <Settings size={13} /> Paramètres notifications
            </button>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
          {kpis.map((k) => (
            <div key={k.label} className="rounded-2xl border border-gray-100 bg-white p-4">
              <p className={`text-2xl font-bold ${k.color}`}>{k.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{k.label}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex gap-1 bg-white border border-gray-100 rounded-2xl p-1 mb-5 overflow-x-auto">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                filter === f.id
                  ? "bg-[#2E7D32] text-white"
                  : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"
              }`}
            >
              {f.label}
              {f.id === "unread" && unread.length > 0 && (
                <span className="ml-1.5 bg-blue-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                  {unread.length}
                </span>
              )}
              {f.id === "critical" && critical.length > 0 && (
                <span className="ml-1.5 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                  {critical.length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Non lues — cards */}
        {(filter === "all" || filter === "unread") && unread.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Notifications non lues ({unread.length})
            </h2>
            <div className="space-y-3">
              {unread.map((n) => (
                <div
                  key={n.id}
                  className="rounded-2xl border border-amber-100 bg-amber-50/60 p-4"
                >
                  <div className="flex items-start gap-3">
                    {typeIconBubble(n.type)}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-gray-900">{n.titre}</span>
                        <span className="text-[11px] text-gray-400">{n.date}</span>
                      </div>
                      <div className="flex items-center gap-1.5 mb-2">
                        {moduleIcon(n.module)}
                        <span className="text-[11px] text-gray-500">{n.module}</span>
                      </div>
                      <p className="text-xs text-gray-700 leading-relaxed">{n.resume}</p>
                      {n.actions && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {n.actions.map((a) => (
                            <a
                              key={a.label}
                              href={a.href}
                              className="inline-flex items-center gap-1 text-xs font-medium text-[#2E7D32] bg-white border border-green-200 rounded-lg px-3 py-1.5 hover:bg-green-50 transition-colors"
                            >
                              {a.label} <ArrowRight size={11} />
                            </a>
                          ))}
                          <button
                            onClick={() => markRead(n.id)}
                            className="text-xs text-gray-400 hover:text-gray-600 px-2"
                          >
                            Marquer lu
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Toutes les notifications — table */}
        <div>
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            {filter === "all"
              ? "Toutes les notifications (30 derniers jours)"
              : `Résultats filtrés (${filtered.length})`}
          </h2>

          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center">
              <BellOff size={32} className="text-gray-200 mx-auto mb-3" />
              <p className="text-sm text-gray-400">Aucune notification dans cette catégorie.</p>
            </div>
          ) : (
            <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-[#F8FBF8]">
                      <th className="text-left px-4 py-3 font-medium text-gray-600">Date / Heure</th>
                      <th className="text-left px-4 py-3 font-medium text-gray-600">Type</th>
                      <th className="text-left px-4 py-3 font-medium text-gray-600">Module</th>
                      <th className="text-left px-4 py-3 font-medium text-gray-600">Message</th>
                      <th className="text-left px-4 py-3 font-medium text-gray-600">Statut</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((n) => (
                      <tr
                        key={n.id}
                        className={`border-b border-gray-50 last:border-0 ${!n.lu ? "bg-blue-50/30" : ""}`}
                      >
                        <td className="px-4 py-3 text-gray-500 whitespace-nowrap font-mono text-[11px]">
                          {n.date}
                        </td>
                        <td className="px-4 py-3">{typeBadge(n.type)}</td>
                        <td className="px-4 py-3">
                          <span className="inline-flex items-center gap-1 text-gray-600">
                            {moduleIcon(n.module)} {n.module}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-700 max-w-xs">
                          <p className="font-medium truncate">{n.titre}</p>
                        </td>
                        <td className="px-4 py-3">
                          {n.lu ? (
                            <span className="text-[11px] text-gray-400">Lu</span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-blue-600">
                              🔵 Non lu
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
        </div>
      </main>
    </div>
  );
}
