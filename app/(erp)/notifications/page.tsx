"use client";

import { useState } from "react";
import Topbar from "../../components/Topbar";
import {
  Bell,
  AlertTriangle,
  CheckCircle,
  Info,
  Clock,
  Search,
  ChevronDown,
  Eye,
  FileText,
  Package,
  Navigation,
  Calendar,
  Truck,
  Users,
  BookOpen,
  BarChart3,
  Shield,
  Droplets,
  Settings,
  X,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Tab = "toutes" | "critiques" | "taches" | "preferences";

interface Notif {
  id: number;
  color: "red" | "yellow" | "blue" | "green";
  tag: string;
  time: string;
  message: string;
  action?: string;
  unread?: boolean;
}

interface Rappel {
  date: string;
  label: string;
  module: string;
  prio: "high" | "medium" | "info";
}

interface PrefRow {
  label: string;
  app: boolean;
  email: boolean;
  sms: boolean;
}

// ─── KPIs ─────────────────────────────────────────────────────────────────────

const KPIS = [
  { label: "Non lues", value: "8", icon: <Bell size={18} className="text-[#2E7D32]" /> },
  { label: "Aujourd'hui", value: "12", icon: <Clock size={18} className="text-blue-600" /> },
  { label: "Cette semaine", value: "47", icon: <Calendar size={18} className="text-orange-500" /> },
  { label: "Alertes critiques", value: "2", icon: <AlertTriangle size={18} className="text-red-600" /> },
];

// ─── Notifications ────────────────────────────────────────────────────────────

const ALL_NOTIFS: Notif[] = [
  { id: 1, color: "red", tag: "CRITIQUE", time: "Il y a 15 min", message: "Stock KCl : rupture imminente (2 kg restants, seuil alerte 50 kg)", action: "Voir stock", unread: true },
  { id: 2, color: "red", tag: "CRITIQUE", time: "Il y a 1h", message: "Analyse eau potable expirée (NC-012 RA) — Renouveler avant 31/07", action: "Voir NC", unread: true },
  { id: 3, color: "yellow", tag: "QUALITÉ", time: "Il y a 2h", message: "LOT-2025-048 : humidité fermentation J5 à 7,2% — Dans les normes ✅", action: "Voir lot", unread: true },
  { id: 4, color: "yellow", tag: "FINANCE", time: "Il y a 3h", message: "Facture FAC-2025-045 (Touton SA 15,6 M) — Échéance dans 4 jours", action: "Voir facture", unread: true },
  { id: 5, color: "blue", tag: "LOGISTIQUE", time: "Il y a 4h", message: "MSC Allegria départ San-Pédro confirmé — LOT-045 en route vers Rotterdam", action: "Suivi" },
  { id: 6, color: "green", tag: "PRODUCTION", time: "Il y a 5h", message: "Taille PAR-A3 terminée — 6,2 ha traités — Ibrahim S.", action: "Planning" },
  { id: 7, color: "yellow", tag: "RH", time: "Hier 17h", message: "Congés Mariam K. du 01/08 — Rappel : prévoir relais DRH", action: "RH", unread: true },
  { id: 8, color: "blue", tag: "BAILLEURS", time: "Hier 16h", message: "Rapport WB Q2 — Date limite 31/07 — 20 jours restants", action: "Rapport" },
  { id: 9, color: "yellow", tag: "MÉTÉO", time: "Hier 14h", message: "Prévision pluies 65mm samedi 12/07 — Sécuriser séchoirs avant vendredi", action: "Météo" },
  { id: 10, color: "green", tag: "FINANCE", time: "Hier 12h", message: "Encaissement reçu : Nestlé FAC-040 — 5 440 000 XOF — BICICI", action: "Trésorerie" },
  { id: 11, color: "green", tag: "COOPÉRATIVE", time: "Hier 10h", message: "Nouveau membre inscrit : Traoré Adjou (COOP-0143) — Soubré", action: "Coopérative" },
  { id: 12, color: "green", tag: "QUALITÉ", time: "Hier 09h", message: "Certification RA C-CI-2025-1847 — Valide. Prochaine inspection 15/09", action: "Certif." },
  { id: 13, color: "blue", tag: "STOCK", time: "09/07 16h", message: "Commande NPK reçue — 20t arrivée entrepôt B", action: "Stocks" },
  { id: 14, color: "yellow", tag: "MAINTENANCE", time: "09/07 14h", message: "JD 6120M : pièce hydraulique commandée ETA 15/07", action: "Matériels" },
  { id: 15, color: "blue", tag: "FORMATION", time: "09/07 11h", message: "Formation drone DJI 30/07 — Inscription confirmée : Ibrahim S., Konan Y.", action: "Formations" },
  { id: 16, color: "green", tag: "FINANCE", time: "08/07 17h", message: "Rapport comptable Juin 2025 — Balance vérifiée", action: "Comptabilité" },
  { id: 17, color: "yellow", tag: "FONCIER", time: "08/07 14h", message: "Bail PAR-D2 expire Déc 2025 — Contacter M. Séka avant Oct", action: "Terres" },
  { id: 18, color: "green", tag: "PRODUCTION", time: "07/07 11h", message: "LOT-2025-047 séchage terminé — Humidité finale 8,1% — Grade A confirmé", action: "Lots" },
  { id: 19, color: "green", tag: "EXPORT", time: "07/07 10h", message: "DAE douanière LOT-045 validée par DGD — Chargement container autorisé", action: "Export" },
  { id: 20, color: "blue", tag: "SYSTÈME", time: "07/07 09h", message: "Sauvegarde automatique Supabase réussie — 1 247 enregistrements", action: "Admin" },
];

const RAPPELS: Rappel[] = [
  { date: "14/07/2025", label: "Loyer PAR-B1+B2 — Famille Konan Joseph — 1 980 000 XOF", module: "Trésorerie", prio: "high" },
  { date: "14/07/2025", label: "Loyer PAR-E1+E2 — Héritiers Traoré — 2 510 000 XOF", module: "Trésorerie", prio: "high" },
  { date: "15/07/2025", label: "Pièces JD 6120M ETA (DHL-JD-20785)", module: "Matériels", prio: "medium" },
  { date: "15/07/2025", label: "Relance FAC-2025-045 Touton SA (15,6 M)", module: "Factures", prio: "high" },
  { date: "17/07/2025", label: "MSC Allegria → arrivée Rotterdam (LOT-045) ETA", module: "Export", prio: "info" },
  { date: "18/07/2025", label: "Entretien final candidat Responsable export", module: "RH", prio: "medium" },
  { date: "20/07/2025", label: "Épandage KCl PAR-A3 (si livraison reçue)", module: "Planning", prio: "medium" },
];

const PREFS: PrefRow[] = [
  { label: "Alertes critiques (stock, conformité)", app: true, email: true, sms: true },
  { label: "Alertes qualité (lots, fermentation)", app: true, email: true, sms: false },
  { label: "Finance (factures, encaissements)", app: true, email: true, sms: false },
  { label: "Météo", app: true, email: false, sms: false },
  { label: "RH (congés, formations)", app: true, email: true, sms: false },
  { label: "Système (sauvegardes, sessions)", app: true, email: false, sms: false },
  { label: "Rapports automatiques", app: true, email: true, sms: false },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const COLOR_MAP = {
  red:    { dot: "bg-red-500",    badge: "bg-red-100 text-red-700",    border: "border-l-red-400",    row: "bg-red-50/30" },
  yellow: { dot: "bg-yellow-400", badge: "bg-yellow-100 text-yellow-700", border: "border-l-yellow-400", row: "bg-yellow-50/20" },
  blue:   { dot: "bg-blue-500",   badge: "bg-blue-100 text-blue-700",  border: "border-l-blue-400",   row: "" },
  green:  { dot: "bg-green-500",  badge: "bg-green-100 text-green-700", border: "border-l-green-400", row: "" },
};

const PRIO_MAP = {
  high:   { label: "Haute",  cls: "text-red-600 bg-red-50",    dot: "bg-red-500" },
  medium: { label: "Moyen",  cls: "text-yellow-700 bg-yellow-50", dot: "bg-yellow-400" },
  info:   { label: "Info",   cls: "text-blue-600 bg-blue-50",   dot: "bg-blue-400" },
};

function Toggle({ on }: { on: boolean }) {
  return (
    <span className={`inline-flex w-9 h-5 rounded-full transition-colors ${on ? "bg-[#2E7D32]" : "bg-gray-200"}`}>
      <span className={`block w-4 h-4 mt-0.5 rounded-full bg-white shadow transition-transform ${on ? "translate-x-4" : "translate-x-0.5"}`} />
    </span>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function NotificationsPage() {
  const [tab, setTab] = useState<Tab>("toutes");
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("Toutes catégories");
  const [notifs, setNotifs] = useState<Notif[]>(ALL_NOTIFS);

  const unreadCount = notifs.filter((n) => n.unread).length;

  function markAllRead() {
    setNotifs((prev) => prev.map((n) => ({ ...n, unread: false })));
  }

  const TABS: { key: Tab; label: string }[] = [
    { key: "toutes", label: "Toutes" },
    { key: "critiques", label: "Alertes critiques" },
    { key: "taches", label: "Tâches & Rappels" },
    { key: "preferences", label: "Préférences" },
  ];

  const filteredNotifs = notifs.filter((n) => {
    const matchSearch = search === "" || n.message.toLowerCase().includes(search.toLowerCase()) || n.tag.toLowerCase().includes(search.toLowerCase());
    const matchCat = catFilter === "Toutes catégories" || n.tag === catFilter;
    return matchSearch && matchCat;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Topbar title="Centre de Notifications" breadcrumb={["Administration", "Notifications"]} />

      <main className="p-4 sm:p-6 max-w-5xl mx-auto space-y-5 pb-14">

        {/* KPIs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {KPIS.map((k) => (
            <div key={k.label} className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">{k.label}</span>
                {k.icon}
              </div>
              <span className="text-2xl font-bold text-gray-900">{k.value}</span>
            </div>
          ))}
        </div>

        {/* Onglets */}
        <div className="flex gap-1 bg-white border border-gray-100 rounded-2xl p-1 shadow-sm">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex-1 text-xs font-semibold py-2 px-2 rounded-xl transition-colors ${
                tab === t.key ? "bg-[#2E7D32] text-white" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* ── Onglet : Toutes ── */}
        {tab === "toutes" && (
          <div className="space-y-3">
            {/* Barre d'actions */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={markAllRead}
                className="text-xs font-semibold text-[#2E7D32] border border-[#2E7D32]/30 bg-green-50 hover:bg-green-100 px-3 py-1.5 rounded-xl transition-colors"
              >
                Tout marquer comme lu
                {unreadCount > 0 && (
                  <span className="ml-1.5 bg-[#2E7D32] text-white text-[10px] font-bold rounded-full px-1.5 py-0.5">{unreadCount}</span>
                )}
              </button>

              <div className="flex items-center gap-1 border border-gray-200 bg-white rounded-xl px-3 py-1.5">
                <span className="text-xs text-gray-500">{catFilter}</span>
                <ChevronDown size={12} className="text-gray-400" />
              </div>

              <div className="flex items-center gap-2 border border-gray-200 bg-white rounded-xl px-3 py-1.5 flex-1 min-w-40">
                <Search size={13} className="text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="text-xs bg-transparent outline-none flex-1 placeholder-gray-400"
                />
                {search && (
                  <button onClick={() => setSearch("")}>
                    <X size={12} className="text-gray-400" />
                  </button>
                )}
              </div>
            </div>

            {/* Liste */}
            <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden divide-y divide-gray-50">
              {filteredNotifs.map((n) => {
                const s = COLOR_MAP[n.color];
                return (
                  <div
                    key={n.id}
                    className={`flex items-start gap-3 px-4 py-3.5 border-l-4 ${s.border} ${n.unread ? s.row : ""} transition-colors`}
                  >
                    {/* Dot */}
                    <div className="mt-1 shrink-0">
                      {n.unread ? (
                        <div className={`w-2 h-2 rounded-full ${s.dot}`} />
                      ) : (
                        <div className="w-2 h-2 rounded-full bg-gray-200" />
                      )}
                    </div>

                    {/* Corps */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-0.5">
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${s.badge}`}>{n.tag}</span>
                        <span className="text-[11px] text-gray-400">{n.time}</span>
                      </div>
                      <p className={`text-sm leading-snug ${n.unread ? "font-semibold text-gray-900" : "text-gray-600"}`}>
                        {n.message}
                      </p>
                    </div>

                    {/* Action */}
                    {n.action && (
                      <button className="shrink-0 text-[11px] font-semibold text-[#2E7D32] border border-[#2E7D32]/25 bg-green-50 hover:bg-green-100 px-2.5 py-1 rounded-lg whitespace-nowrap transition-colors">
                        {n.action}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── Onglet : Alertes critiques ── */}
        {tab === "critiques" && (
          <div className="space-y-4">
            <p className="text-sm font-bold text-gray-700">Alertes actives (2)</p>

            {/* Alerte 1 */}
            <div className="rounded-2xl border-2 border-red-300 bg-red-50 p-5 space-y-3 shadow-sm">
              <div className="flex items-start gap-2">
                <AlertTriangle size={20} className="text-red-600 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-bold text-red-800">ALERTE STOCK — KCl (Chlorure de Potassium)</p>
                  <p className="text-xs text-red-500 mt-0.5">Déclenchée : 11/07/2025 08:42</p>
                </div>
              </div>

              <div className="text-sm text-red-900 bg-white/60 rounded-xl p-3 space-y-1">
                <p>Stock KCl = <strong>2 kg restants</strong>. Seuil d&apos;alerte = 50 kg.</p>
                <p>Besoin immédiat estimé : 4 000 kg pour fertilisation PAR-A3 prévue le 20/07.</p>
              </div>

              <div className="text-sm text-red-800 bg-red-100/60 rounded-xl p-3">
                <p className="font-semibold mb-1">Impact si non résolu :</p>
                <p>Retard fertilisation potassique → Baisse rendement estimée <strong>-8%</strong> campagne 2025</p>
              </div>

              <div className="space-y-1.5">
                <p className="text-xs font-bold text-red-700 uppercase tracking-wide">Actions recommandées</p>
                <div className="flex items-start gap-2 text-sm text-red-800">
                  <CheckCircle size={14} className="text-green-600 mt-0.5 shrink-0" />
                  <span>Commander chez SCPA Afrique (fournisseur habituel) — délai 7-10 jours</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-red-800">
                  <CheckCircle size={14} className="text-green-600 mt-0.5 shrink-0" />
                  <span>Contacter AGRO-CI Soubré (dépôt local) — délai 1-2 jours prix +15%</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs text-red-700 border-t border-red-200 pt-3">
                <span><strong>Responsable :</strong> Ibrahim Sawadogo</span>
                <span><strong>Assigné à :</strong> Jean-Baptiste Kouassi (achat)</span>
              </div>

              <button className="bg-[#2E7D32] text-white text-xs font-semibold px-4 py-2 rounded-xl hover:bg-[#1B5E20] transition-colors">
                Créer bon de commande
              </button>
            </div>

            {/* Alerte 2 */}
            <div className="rounded-2xl border-2 border-red-300 bg-red-50 p-5 space-y-3 shadow-sm">
              <div className="flex items-start gap-2">
                <Shield size={20} className="text-red-600 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-bold text-red-800">ALERTE CONFORMITÉ RA — Analyse eau potable</p>
                  <p className="text-xs text-red-500 mt-0.5">Déclenchée : 10/07/2025 14:18</p>
                </div>
              </div>

              <div className="text-sm text-red-900 bg-white/60 rounded-xl p-3 space-y-1">
                <p>Exigence RA §2.4.7 : Analyse eau potable valide &lt; 6 mois.</p>
                <p>Dernière analyse : <strong>Jan 2025</strong> (6 mois révolus)</p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs text-red-800">
                <div className="bg-white/60 rounded-xl p-2.5">
                  <p className="font-semibold mb-0.5">Date limite</p>
                  <p className="font-bold text-red-600">31/07/2025</p>
                  <p className="text-red-500">avant audit interne 01/08</p>
                </div>
                <div className="bg-white/60 rounded-xl p-2.5">
                  <p className="font-semibold mb-0.5">Laboratoire</p>
                  <p>LBTP Soubré</p>
                  <p>Délai : 5-7 jours • ~45 000 XOF</p>
                </div>
              </div>

              <div className="text-xs text-red-700 flex items-center gap-2 border-t border-red-200 pt-3">
                <span><strong>Responsable :</strong> Ibrahim Sawadogo</span>
              </div>

              <button className="bg-[#2E7D32] text-white text-xs font-semibold px-4 py-2 rounded-xl hover:bg-[#1B5E20] transition-colors">
                Planifier prélèvement
              </button>
            </div>
          </div>
        )}

        {/* ── Onglet : Tâches & Rappels ── */}
        {tab === "taches" && (
          <div className="space-y-5">
            {/* Rappels à venir */}
            <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
              <div className="px-5 py-3 border-b border-gray-50 bg-[#F8FBF8]">
                <p className="text-sm font-bold text-gray-700">Rappels à venir (7 jours)</p>
              </div>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Date</th>
                    <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Rappel</th>
                    <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden sm:table-cell">Module</th>
                    <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Priorité</th>
                  </tr>
                </thead>
                <tbody>
                  {RAPPELS.map((r, i) => {
                    const p = PRIO_MAP[r.prio];
                    return (
                      <tr key={i} className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 text-xs font-mono text-gray-500 whitespace-nowrap">{r.date}</td>
                        <td className="px-4 py-3 text-sm text-gray-800">{r.label}</td>
                        <td className="px-4 py-3 hidden sm:table-cell">
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">{r.module}</span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${p.cls}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${p.dot}`} />
                            {p.label}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* En retard */}
            <div className="rounded-2xl border border-red-200 bg-white shadow-sm overflow-hidden">
              <div className="px-5 py-3 border-b border-red-100 bg-red-50">
                <p className="text-sm font-bold text-red-700">Récapitulatif actions en retard</p>
              </div>
              <div className="divide-y divide-gray-50">
                {[
                  { label: "Analyse eau potable", tag: "En retard (NC-012)", who: "Ibrahim S.", deadline: "31/07" },
                  { label: "Cartographie biodiversité PAR-C1, C2", tag: "Non démarré", who: "Non assigné", deadline: "01/08" },
                ].map((item, i) => (
                  <div key={i} className="flex flex-wrap items-center gap-3 px-5 py-3.5">
                    <AlertTriangle size={14} className="text-red-500 shrink-0" />
                    <span className="text-sm font-semibold text-gray-800">{item.label}</span>
                    <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded">{item.tag}</span>
                    <span className="text-xs text-gray-500 ml-auto">Assigné à {item.who} — Délai {item.deadline}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Onglet : Préférences ── */}
        {tab === "preferences" && (
          <div className="space-y-5">
            {/* Tableau préférences */}
            <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
              <div className="px-5 py-3 border-b border-gray-50 bg-[#F8FBF8]">
                <p className="text-sm font-bold text-gray-700">Mes préférences de notifications</p>
              </div>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Catégorie</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Dans l&apos;app</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Email</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">SMS</th>
                  </tr>
                </thead>
                <tbody>
                  {PREFS.map((row, i) => (
                    <tr key={i} className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-3.5 text-sm text-gray-700">{row.label}</td>
                      <td className="px-4 py-3.5 text-center"><Toggle on={row.app} /></td>
                      <td className="px-4 py-3.5 text-center"><Toggle on={row.email} /></td>
                      <td className="px-4 py-3.5 text-center"><Toggle on={row.sms} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Canaux configurés */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm space-y-3">
              <p className="text-sm font-bold text-gray-700">Canaux configurés</p>
              {[
                { icon: <FileText size={15} className="text-blue-600" />, label: "Email", value: "admin@agrifrik.com", ok: true },
                { icon: <Info size={15} className="text-orange-500" />, label: "SMS", value: "+225 07 00 00 00 (Orange CI)", ok: true },
                { icon: <Bell size={15} className="text-[#2E7D32]" />, label: "Application mobile", value: "2 appareils enregistrés", ok: true },
              ].map((c, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center shrink-0">{c.icon}</div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-gray-500">{c.label}</p>
                    <p className="text-sm text-gray-800">{c.value}</p>
                  </div>
                  {c.ok && (
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-green-700 bg-green-50 px-2 py-0.5 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                      Actif
                    </span>
                  )}
                </div>
              ))}
            </div>

            <button className="bg-[#2E7D32] text-white text-xs font-semibold px-5 py-2.5 rounded-xl hover:bg-[#1B5E20] transition-colors">
              Enregistrer les préférences
            </button>
          </div>
        )}

      </main>
    </div>
  );
}
