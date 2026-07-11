"use client";

import { useState } from "react";
import Topbar from "../../components/Topbar";
import {
  AlertTriangle,
  Bell,
  CheckCircle,
  Info,
  Clock,
  Settings,
  ShoppingCart,
  Eye,
  FileText,
  Package,
  CloudRain,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

type NotifLevel = "alerte" | "succes" | "info" | "rappel";
type NotifCategorie = "stock" | "production" | "rh" | "finance" | "systeme" | "assurance" | "commerce" | "meteo";
type FilterKey = "toutes" | "non-lues" | "alertes" | "systeme" | "rh" | "finance" | "production";

interface NotifAction {
  label: string;
  href: string;
}

interface Notification {
  id: number;
  level: NotifLevel;
  categorie: NotifCategorie;
  categorieLabel: string;
  time: string;
  date: string;
  title: string;
  description: string;
  read: boolean;
  actions?: NotifAction[];
}

// ─── Données ─────────────────────────────────────────────────────────────────

const INITIAL_NOTIFICATIONS: Notification[] = [
  // ── Aujourd'hui — 09/07/2025 ──
  {
    id: 1,
    level: "alerte",
    categorie: "stock",
    categorieLabel: "Stock",
    time: "09:30",
    date: "Aujourd'hui — 09/07/2025",
    title: "Stock critique — KCl engrais potassique",
    description:
      "Stock KCl engrais potassique : 45 kg restants (seuil critique : 50 kg). Commande recommandée : 200 kg. Fournisseur : YARA Nederland.",
    read: false,
    actions: [
      { label: "Voir le stock", href: "/stocks" },
      { label: "Créer une commande", href: "/achats" },
    ],
  },
  {
    id: 2,
    level: "succes",
    categorie: "production",
    categorieLabel: "Production",
    time: "09:15",
    date: "Aujourd'hui — 09/07/2025",
    title: "Rapport parcelle A3 soumis",
    description:
      "Ibrahim Sawadogo a soumis le rapport parcelle A3. Humidité sol 34%, irrigation planifiée pour demain 06h00.",
    read: false,
    actions: [{ label: "Voir le rapport", href: "/cultures" }],
  },
  {
    id: 3,
    level: "info",
    categorie: "rh",
    categorieLabel: "RH",
    time: "09:00",
    date: "Aujourd'hui — 09/07/2025",
    title: "287 bulletins de paie juillet 2025 générés",
    description:
      "287 bulletins de paie juillet 2025 générés et disponibles. Masse salariale totale : 42 350 000 XOF.",
    read: false,
    actions: [{ label: "Voir les bulletins", href: "/paie" }],
  },
  {
    id: 4,
    level: "rappel",
    categorie: "finance",
    categorieLabel: "Finance",
    time: "08:45",
    date: "Aujourd'hui — 09/07/2025",
    title: "Facture FAC-2025-0338 en retard",
    description:
      "Facture FAC-2025-0338 en attente de paiement depuis 15 jours (échéance dépassée). Client : NSIA CI. Montant : 3 200 000 XOF.",
    read: false,
    actions: [{ label: "Voir la facture", href: "/factures" }],
  },
  {
    id: 5,
    level: "info",
    categorie: "systeme",
    categorieLabel: "Système",
    time: "08:00",
    date: "Aujourd'hui — 09/07/2025",
    title: "Rapport IA hebdomadaire envoyé",
    description:
      "Rapport IA agricole hebdomadaire généré et envoyé à 3 destinataires. 5 recommandations cette semaine.",
    read: false,
    actions: [{ label: "Voir le rapport", href: "/ia" }],
  },
  {
    id: 6,
    level: "info",
    categorie: "systeme",
    categorieLabel: "Système",
    time: "08:00",
    date: "Aujourd'hui — 09/07/2025",
    title: "Sauvegarde automatique réussie",
    description:
      "Sauvegarde automatique effectuée avec succès. 2,4 GB sauvegardés sur Supabase Storage.",
    read: false,
  },
  {
    id: 7,
    level: "rappel",
    categorie: "assurance",
    categorieLabel: "Assurances",
    time: "07:30",
    date: "Aujourd'hui — 09/07/2025",
    title: "Police ASS-2025-004 expirée",
    description:
      "Police ASS-2025-004 (Matériels agricoles) expire le 30/06/2025. Renouvellement en retard. Contacter SUNU.",
    read: false,
    actions: [{ label: "Voir l'assurance", href: "/assurances" }],
  },
  {
    id: 8,
    level: "succes",
    categorie: "commerce",
    categorieLabel: "Commerce",
    time: "07:00",
    date: "Aujourd'hui — 09/07/2025",
    title: "Commande CMD-2025-042 confirmée",
    description:
      "Commande CMD-2025-042 confirmée par Barry Callebaut France. 2 400 kg cacao Grade A. Livraison : 20/07.",
    read: false,
    actions: [{ label: "Voir la commande", href: "/ventes" }],
  },

  // ── Hier — 08/07/2025 ──
  {
    id: 9,
    level: "succes",
    categorie: "production",
    categorieLabel: "Production",
    time: "16:30",
    date: "Hier — 08/07/2025",
    title: "LOT-2025-017 Cacao — Qualité Grade A validée",
    description:
      "LOT-2025-017 Cacao fermenté séché — Contrôle qualité Grade A validé par CNRA. Prêt pour export.",
    read: true,
  },
  {
    id: 10,
    level: "info",
    categorie: "rh",
    categorieLabel: "RH",
    time: "14:00",
    date: "Hier — 08/07/2025",
    title: "Congé approuvé — Konan Adjoua",
    description:
      "Konan Adjoua — Demande de congé du 14 au 18/07/2025 approuvée.",
    read: true,
  },
  {
    id: 11,
    level: "alerte",
    categorie: "meteo",
    categorieLabel: "Météo",
    time: "13:00",
    date: "Hier — 08/07/2025",
    title: "Alerte météo — Pluies zone Soubré",
    description:
      "Pluies abondantes prévues 12-13/07 sur zone Soubré (25-30mm). Impact possible sur séchoir solaire A. Prévoir couverture.",
    read: true,
    actions: [{ label: "Voir la météo", href: "/meteo" }],
  },
  {
    id: 12,
    level: "succes",
    categorie: "finance",
    categorieLabel: "Finance",
    time: "11:45",
    date: "Hier — 08/07/2025",
    title: "Virement AGRIINTRANT reçu",
    description:
      "Virement AGRIINTRANT reçu : 4 850 000 XOF crédité sur compte professionnel.",
    read: true,
  },
];

const OLD_COUNT = 3; // résumé pour 07/07/2025

// ─── Style par niveau ────────────────────────────────────────────────────────

const LEVEL_CONFIG: Record<
  NotifLevel,
  {
    dot: string;
    icon: React.ReactNode;
    badgeClass: string;
    badgeLabel: string;
    borderClass: string;
    bgUnread: string;
  }
> = {
  alerte: {
    dot: "bg-red-500",
    icon: <AlertTriangle size={15} className="text-red-500" />,
    badgeClass: "bg-red-100 text-red-700",
    badgeLabel: "ALERTE",
    borderClass: "border-l-red-400",
    bgUnread: "bg-red-50/40",
  },
  rappel: {
    dot: "bg-yellow-400",
    icon: <Clock size={15} className="text-yellow-500" />,
    badgeClass: "bg-yellow-100 text-yellow-700",
    badgeLabel: "RAPPEL",
    borderClass: "border-l-yellow-400",
    bgUnread: "bg-yellow-50/40",
  },
  succes: {
    dot: "bg-green-500",
    icon: <CheckCircle size={15} className="text-green-500" />,
    badgeClass: "bg-green-100 text-green-700",
    badgeLabel: "SUCCÈS",
    borderClass: "border-l-green-400",
    bgUnread: "bg-green-50/30",
  },
  info: {
    dot: "bg-blue-500",
    icon: <Info size={15} className="text-blue-500" />,
    badgeClass: "bg-blue-100 text-blue-700",
    badgeLabel: "INFO",
    borderClass: "border-l-blue-400",
    bgUnread: "bg-blue-50/30",
  },
};

const ACTION_ICON: Record<string, React.ReactNode> = {
  "Voir le stock": <Package size={11} />,
  "Créer une commande": <ShoppingCart size={11} />,
  "Voir le rapport": <FileText size={11} />,
  "Voir les bulletins": <Eye size={11} />,
  "Voir la facture": <FileText size={11} />,
  "Voir la commande": <Eye size={11} />,
  "Voir l'assurance": <FileText size={11} />,
  "Voir la météo": <CloudRain size={11} />,
};

// ─── Filtres ──────────────────────────────────────────────────────────────────

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "toutes", label: "Toutes" },
  { key: "non-lues", label: "Non lues" },
  { key: "alertes", label: "Alertes" },
  { key: "systeme", label: "Système" },
  { key: "rh", label: "RH" },
  { key: "finance", label: "Finance" },
  { key: "production", label: "Production" },
];

const DATE_ORDER = [
  "Aujourd'hui — 09/07/2025",
  "Hier — 08/07/2025",
];

// ─── Page ────────────────────────────────────────────────────────────────────

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(INITIAL_NOTIFICATIONS);
  const [filter, setFilter] = useState<FilterKey>("toutes");
  const [showOld, setShowOld] = useState(false);
  const [showMore, setShowMore] = useState(false);

  function markRead(id: number) {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  }

  function markAllRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Filter counts
  const countByFilter = (k: FilterKey) => {
    if (k === "toutes") return notifications.length;
    if (k === "non-lues") return notifications.filter((n) => !n.read).length;
    if (k === "alertes") return notifications.filter((n) => n.level === "alerte" || n.level === "rappel").length;
    if (k === "systeme") return notifications.filter((n) => n.categorie === "systeme").length;
    if (k === "rh") return notifications.filter((n) => n.categorie === "rh").length;
    if (k === "finance") return notifications.filter((n) => n.categorie === "finance").length;
    if (k === "production") return notifications.filter((n) => n.categorie === "production").length;
    return 0;
  };

  // Apply filter
  const filtered = notifications.filter((n) => {
    if (filter === "toutes") return true;
    if (filter === "non-lues") return !n.read;
    if (filter === "alertes") return n.level === "alerte" || n.level === "rappel";
    if (filter === "systeme") return n.categorie === "systeme";
    if (filter === "rh") return n.categorie === "rh";
    if (filter === "finance") return n.categorie === "finance";
    if (filter === "production") return n.categorie === "production";
    return true;
  });

  // Group by date
  const groups: Record<string, Notification[]> = {};
  for (const n of filtered) {
    if (!groups[n.date]) groups[n.date] = [];
    groups[n.date].push(n);
  }

  const visibleDates = showMore
    ? [...DATE_ORDER, "07/07/2025"]
    : DATE_ORDER;

  return (
    <div className="min-h-screen bg-gray-50">
      <Topbar title="Notifications" breadcrumb={["Notifications"]} />

      <main className="p-4 sm:p-6 max-w-3xl mx-auto space-y-5 pb-12">

        {/* ── En-tête ── */}
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Centre de notifications</h2>
            <div className="flex items-center gap-2 mt-1">
              {unreadCount > 0 && (
                <span className="inline-flex items-center gap-1 bg-red-100 text-red-700 text-xs font-bold px-2.5 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block" />
                  {unreadCount} non lues
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            {unreadCount > 0 && (
              <button
                onClick={markAllRead}
                className="text-xs text-[#2E7D32] font-semibold hover:underline"
              >
                Tout marquer comme lu
              </button>
            )}
            <a
              href="/parametres/preferences"
              className="flex items-center gap-1.5 text-xs text-gray-500 border border-gray-200 rounded-xl px-3 py-1.5 hover:bg-gray-100 transition-colors"
            >
              <Settings size={13} />
              Paramètres notifications
            </a>
          </div>
        </div>

        {/* ── Filtres chips ── */}
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => {
            const active = filter === f.key;
            const count = countByFilter(f.key);
            return (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                  active
                    ? "bg-[#2E7D32] text-white border-[#2E7D32]"
                    : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                }`}
              >
                {f.label}
                {count > 0 && (
                  <span
                    className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                      active ? "bg-white/25 text-white" : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* ── Groupes par date ── */}
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center">
            <Bell size={28} className="mx-auto mb-3 text-gray-300" />
            <p className="text-sm text-gray-400">Aucune notification dans cette catégorie.</p>
          </div>
        ) : (
          <>
            {visibleDates.map((date) => {
              const items = groups[date];
              if (!items || items.length === 0) return null;
              return (
                <section key={date}>
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2 px-1">
                    {date}
                  </p>
                  <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden divide-y divide-gray-50">
                    {items.map((n) => {
                      const s = LEVEL_CONFIG[n.level];
                      return (
                        <div
                          key={n.id}
                          className={`flex items-start gap-3 px-4 py-4 border-l-4 ${s.borderClass} ${
                            n.read ? "bg-white" : s.bgUnread
                          } transition-colors`}
                        >
                          {/* Icon niveau */}
                          <div className="mt-0.5 shrink-0">{s.icon}</div>

                          {/* Corps */}
                          <div className="flex-1 min-w-0">
                            {/* Méta */}
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                              <span className="font-mono text-[10px] text-gray-400">{n.time}</span>
                              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${s.badgeClass}`}>
                                {s.badgeLabel}
                              </span>
                              <span className="text-[10px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">
                                {n.categorieLabel}
                              </span>
                            </div>

                            {/* Titre */}
                            <p className={`text-sm leading-snug ${n.read ? "font-medium text-gray-700" : "font-bold text-gray-900"}`}>
                              {n.title}
                            </p>

                            {/* Description */}
                            <p className={`text-xs mt-0.5 leading-relaxed ${n.read ? "text-gray-400" : "text-gray-600"}`}>
                              {n.description}
                            </p>

                            {/* Boutons d'action */}
                            {n.actions && n.actions.length > 0 && (
                              <div className="flex flex-wrap gap-2 mt-2">
                                {n.actions.map((a) => (
                                  <a
                                    key={a.label}
                                    href={a.href}
                                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#2E7D32] border border-[#2E7D32]/30 bg-green-50 hover:bg-green-100 px-2.5 py-1 rounded-lg transition-colors"
                                  >
                                    {ACTION_ICON[a.label] ?? null}
                                    {a.label}
                                  </a>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* Indicateur lu/non lu */}
                          <div className="flex flex-col items-end gap-1.5 shrink-0">
                            {!n.read ? (
                              <>
                                <div className={`w-2.5 h-2.5 rounded-full ${s.dot}`} />
                                <button
                                  onClick={() => markRead(n.id)}
                                  className="text-[10px] text-gray-400 hover:text-[#2E7D32] hover:underline whitespace-nowrap"
                                >
                                  Marquer lu
                                </button>
                              </>
                            ) : (
                              <span className="text-[10px] text-gray-300 italic">Lu</span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>
              );
            })}

            {/* ── Résumé 07/07/2025 (collapsible) ── */}
            {!showMore && filter === "toutes" && (
              <section>
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2 px-1">
                  07/07/2025
                </p>
                <button
                  onClick={() => setShowMore(true)}
                  className="w-full bg-white border border-gray-100 rounded-2xl px-4 py-3.5 text-sm text-gray-500 hover:bg-gray-50 flex items-center justify-between shadow-sm transition-colors"
                >
                  <span>
                    <span className="font-semibold text-gray-700">{OLD_COUNT} notifications lues</span>
                    {" "}— Afficher
                  </span>
                  <span className="text-[#2E7D32] font-semibold text-xs">Voir tout →</span>
                </button>
              </section>
            )}

            {/* ── Charger plus ── */}
            <div className="text-center pt-2">
              <button
                onClick={() => setShowOld((v) => !v)}
                className="text-sm text-[#2E7D32] font-semibold border border-[#2E7D32]/30 px-5 py-2 rounded-xl hover:bg-green-50 transition-colors"
              >
                {showOld ? "Afficher moins" : "Charger plus"}
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
