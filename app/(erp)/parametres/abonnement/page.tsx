"use client";

import Link from "next/link";
import Topbar from "../../../components/Topbar";
import {
  User,
  Lock,
  Palette,
  Link2,
  Bell,
  CreditCard,
  FileText,
  CheckCircle,
  ArrowUpCircle,
  Download,
  Phone,
} from "lucide-react";

// ── Sidebar nav ───────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { label: "Mon profil",    href: "/parametres/profil",        icon: User,       active: false },
  { label: "Sécurité",      href: "/parametres/securite",      icon: Lock,       active: false },
  { label: "Préférences",   href: "/parametres/preferences",   icon: Palette,    active: false },
  { label: "Intégrations",  href: "/parametres/integrations",  icon: Link2,      active: false },
  { label: "Notifications", href: "/parametres/notifications", icon: Bell,       active: false },
  { label: "Abonnement",    href: "/parametres/abonnement",    icon: CreditCard, active: true  },
  { label: "Facturation",   href: "/parametres/facturation",   icon: FileText,   active: false },
];

// ── Module list ───────────────────────────────────────────────────────────────

const MODULE_GROUPS = [
  {
    label: "Production",
    modules: ["Dashboard", "Cultures", "Élevage", "Pisciculture", "Exploitations", "Cartographie", "Planning cultural", "Semences"],
  },
  {
    label: "Logistique",
    modules: ["Stocks", "Achats", "Matériels", "Intrants", "Logistique", "Entrepôts", "Fournisseurs"],
  },
  {
    label: "Commerce",
    modules: ["Ventes", "Exportation", "Transformation", "Importation", "Prix marché", "Devis", "Factures", "Suivi qualité", "Traçabilité", "Audit"],
  },
  {
    label: "Finance",
    modules: ["Comptabilité", "Trésorerie", "Budget", "Prévisions", "Inventaire", "Assurances", "Actifs", "Rapports fin."],
  },
  {
    label: "RH",
    modules: ["RH", "Paie", "Planning RH", "Formations", "Coopérative", "Projets", "Gestion terres"],
  },
  {
    label: "Rapports",
    modules: ["Rapports", "Analytics", "Direction", "Rapport annuel", "Rapport builder", "Rapports planifiés", "Rapports terrain", "Bailleur"],
  },
  {
    label: "IA",
    modules: ["IA ARIA", "Météo", "Calendrier"],
  },
  {
    label: "Collaboration",
    modules: ["Messagerie", "Tâches", "Documents"],
  },
  {
    label: "Admin",
    modules: ["Administration", "Alertes", "Logs", "Notifications", "Aide", "Paramètres", "Portail producteur", "RSE", "Utilisateurs"],
  },
];

// ── Renewal history ───────────────────────────────────────────────────────────

const HISTORY = [
  { year: "2023", plan: "Starter",         amount: "600 000 XOF",   date: "05/01/2023" },
  { year: "2024", plan: "PRO (upgrade)",   amount: "2 400 000 XOF", date: "02/01/2024" },
  { year: "2025", plan: "PRO (actuel)",    amount: "2 400 000 XOF", date: "03/01/2025" },
];

// ── Progress bar ──────────────────────────────────────────────────────────────

function ProgressBar({ pct, color = "#2E7D32" }: { pct: number; color?: string }) {
  return (
    <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
      <div
        className="h-full rounded-full transition-all"
        style={{ width: `${pct}%`, backgroundColor: color }}
      />
    </div>
  );
}

// ── Comparatif checkmark ──────────────────────────────────────────────────────

function Check({ ok, text }: { ok: boolean; text?: string }) {
  if (text) return <span className="text-xs text-gray-700">{text}</span>;
  return ok
    ? <span className="text-emerald-600 text-sm font-bold">✅</span>
    : <span className="text-red-400 text-sm">❌</span>;
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function AbonnementPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Topbar title="Abonnement" breadcrumb={["Paramètres", "Abonnement"]} />

      <main className="flex-1 p-6">
        <div className="flex gap-6 items-start">

          {/* ── Left sidebar ──────────────────────────────────── */}
          <div className="w-72 shrink-0">
            <div className="rounded-2xl border border-gray-100 bg-white p-2">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      item.active
                        ? "bg-[#2E7D32] text-white"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
                    }`}
                  >
                    <Icon size={15} />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* ── Right content ─────────────────────────────────── */}
          <div className="flex-1 space-y-5 min-w-0">

            {/* Plan actuel */}
            <div className="rounded-2xl bg-[#1B5E20] text-white p-6">
              <div className="flex items-start justify-between flex-wrap gap-4">
                <div className="space-y-3">
                  <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-white text-sm font-bold tracking-wide">
                    Plan PRO Annuel
                  </span>
                  <div>
                    <p className="text-3xl font-bold">2 400 000 <span className="text-lg font-semibold opacity-80">XOF / an</span></p>
                    <p className="text-sm opacity-70 mt-0.5">soit 200 000 XOF / mois</p>
                  </div>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-1.5 text-sm mt-2">
                    <div>
                      <span className="opacity-60 text-xs">Période</span>
                      <p className="font-medium">01/01/2025 → 31/12/2025</p>
                    </div>
                    <div>
                      <span className="opacity-60 text-xs">Prochaine facturation</span>
                      <p className="font-medium">01/01/2026</p>
                    </div>
                    <div>
                      <span className="opacity-60 text-xs">Jours restants</span>
                      <p className="font-medium">173 jours</p>
                    </div>
                    <div>
                      <span className="opacity-60 text-xs">Mode de paiement</span>
                      <p className="font-medium">Virement bancaire SGBCI</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-white/10 rounded-xl px-4 py-3">
                  <CheckCircle size={20} className="text-emerald-300" />
                  <span className="text-sm font-semibold">Abonnement actif</span>
                </div>
              </div>
            </div>

            {/* Utilisation actuelle */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5">
              <h2 className="text-sm font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100">
                Utilisation actuelle
              </h2>
              <div className="space-y-4">
                {/* Utilisateurs */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-medium text-gray-700">Utilisateurs</span>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-gray-500">3 / 5 (60%)</span>
                      <Link href="/administration" className="text-xs text-[#2E7D32] hover:underline font-medium">
                        Voir les utilisateurs
                      </Link>
                    </div>
                  </div>
                  <ProgressBar pct={60} />
                </div>
                {/* Exploitations */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-medium text-gray-700">Exploitations</span>
                    <span className="text-xs text-gray-500">1 / 3 (33%)</span>
                  </div>
                  <ProgressBar pct={33} />
                </div>
                {/* Stockage */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-medium text-gray-700">Stockage GED</span>
                    <span className="text-xs text-gray-500">4,2 GB / 10 GB (42%)</span>
                  </div>
                  <ProgressBar pct={42} color="#4CAF50" />
                </div>
                {/* API */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-medium text-gray-700">Appels API (ce mois)</span>
                    <span className="text-xs text-gray-500">8 420 / 50 000 (16,8%)</span>
                  </div>
                  <ProgressBar pct={16.8} color="#4CAF50" />
                </div>
                {/* Modules */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-medium text-gray-700">Modules actifs</span>
                    <span className="text-xs text-emerald-600 font-semibold">48 / 48 (100% — Plan PRO complet)</span>
                  </div>
                  <ProgressBar pct={100} color="#2E7D32" />
                </div>
              </div>
            </div>

            {/* Comparatif des plans */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5">
              <h2 className="text-sm font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100">
                Comparatif des plans
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-[#F8FBF8]">
                      <th className="text-left px-4 py-3 font-semibold text-gray-600 rounded-tl-xl">Fonctionnalité</th>
                      <th className="px-4 py-3 font-semibold text-gray-600">Starter</th>
                      <th className="px-4 py-3 font-semibold text-white bg-[#2E7D32]">PRO ✓ Actuel</th>
                      <th className="px-4 py-3 font-semibold text-gray-600 rounded-tr-xl">Enterprise</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {[
                      ["Prix",             "600 000 XOF/an",    "2 400 000 XOF/an",         "Sur devis"],
                      ["Utilisateurs",     "2",                 "5",                         "Illimité"],
                      ["Exploitations",    "1",                 "3",                         "Illimité"],
                      ["Modules ERP",      "20 modules",        "48 modules (tous)",         "Tous + Custom"],
                      ["Stockage GED",     "2 GB",              "10 GB",                     "100 GB"],
                      ["Assistant IA",     null,                "✅ ARIA standard",           "✅ ARIA avancée"],
                      ["Exports",          "PDF seul",          "PDF + Excel + API",         "Tout + EDI"],
                      ["Support",          "Email (72h)",       "Email + Tél (24h)",         "Dédié (2h SLA)"],
                      ["Formation",        "1 webinaire",       "3 sessions ANADER",         "Sur site"],
                      ["Certif. RA",       null,                "✅",                         "✅ + audit"],
                    ].map(([feat, starter, pro, ent], i) => (
                      <tr key={i} className="hover:bg-gray-50/50">
                        <td className="px-4 py-3 font-medium text-gray-700">{feat}</td>
                        <td className="px-4 py-3 text-center text-gray-500">
                          {starter === null ? <Check ok={false} /> : <Check ok text={starter as string} />}
                        </td>
                        <td className="px-4 py-3 text-center bg-emerald-50 font-semibold text-emerald-800">
                          {pro === null ? <Check ok={false} /> : <span>{pro}</span>}
                        </td>
                        <td className="px-4 py-3 text-center text-gray-500">
                          {ent === null ? <Check ok={false} /> : <Check ok text={ent as string} />}
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td className="px-4 py-3" />
                      <td className="px-4 py-4 text-center">
                        <button className="px-3 py-1.5 text-xs border border-gray-300 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors">
                          Choisir
                        </button>
                      </td>
                      <td className="px-4 py-4 text-center bg-emerald-50">
                        <button className="px-3 py-1.5 text-xs bg-[#2E7D32] text-white rounded-xl font-semibold cursor-default">
                          Plan actuel ✅
                        </button>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <button className="px-3 py-1.5 text-xs border border-[#2E7D32] text-[#2E7D32] rounded-xl hover:bg-emerald-50 transition-colors font-medium">
                          Contacter commercial
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Modules inclus */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5">
              <h2 className="text-sm font-semibold text-gray-800 mb-1 pb-2 border-b border-gray-100 flex items-center justify-between">
                <span>Modules inclus dans votre plan</span>
                <span className="text-xs text-emerald-600 font-semibold">48 modules ✅</span>
              </h2>
              <div className="mt-4 space-y-4">
                {MODULE_GROUPS.map((g) => (
                  <div key={g.label}>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                      {g.label} <span className="font-normal normal-case text-gray-400">({g.modules.length})</span>
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {g.modules.map((m) => (
                        <span
                          key={m}
                          className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-100 text-xs font-medium"
                        >
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Historique renouvellements */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5">
              <h2 className="text-sm font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100">
                Historique des renouvellements
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-[#F8FBF8]">
                      {["Période", "Plan", "Montant", "Date paiement", "Statut"].map((h) => (
                        <th key={h} className="text-left px-4 py-2.5 font-semibold text-gray-600">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {HISTORY.map((row, i) => (
                      <tr key={i} className="hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium text-gray-700">{row.year}</td>
                        <td className="px-4 py-3 text-gray-600">{row.plan}</td>
                        <td className="px-4 py-3 font-semibold text-gray-800">{row.amount}</td>
                        <td className="px-4 py-3 text-gray-600">{row.date}</td>
                        <td className="px-4 py-3">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium border border-emerald-100">
                            ✅ Payé
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap gap-3 mt-5 pt-4 border-t border-gray-100">
                <button className="flex items-center gap-2 bg-[#2E7D32] hover:bg-[#1B5E20] text-white text-xs font-medium px-4 py-2.5 rounded-xl transition-colors">
                  <ArrowUpCircle size={14} />
                  Mettre à niveau vers Enterprise
                </button>
                <button className="flex items-center gap-2 border border-gray-300 text-gray-700 hover:bg-gray-50 text-xs font-medium px-4 py-2.5 rounded-xl transition-colors">
                  <Download size={14} />
                  Télécharger le contrat d&apos;abonnement
                </button>
                <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium px-4 py-2.5 rounded-xl transition-colors">
                  <Phone size={14} />
                  Contacter le support AGRIFRIK
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
