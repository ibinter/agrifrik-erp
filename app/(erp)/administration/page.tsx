"use client";

import { useState } from "react";
import Topbar from "../../components/Topbar";
import {
  Users,
  Shield,
  FileText,
  Settings,
  Search,
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  PauseCircle,
  ChevronDown,
  Upload,
  Database,
  RefreshCw,
  Eye,
  Check,
  X,
} from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────────

type Tab = "utilisateurs" | "roles" | "journaux" | "parametres";

const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: "utilisateurs", label: "Utilisateurs", icon: <Users size={16} /> },
  { id: "roles", label: "Rôles & Permissions", icon: <Shield size={16} /> },
  { id: "journaux", label: "Journaux", icon: <FileText size={16} /> },
  { id: "parametres", label: "Paramètres Système", icon: <Settings size={16} /> },
];

// ── Data ───────────────────────────────────────────────────────────────────────

const USERS = [
  { initials: "JK", name: "Jean-Baptiste Koffi", email: "jean@agrotek.ci", role: "Directeur Général", lastAccess: "Aujourd'hui 08:45", active: true },
  { initials: "AM", name: "Adjoua Messou", email: "adjoua@agrotek.ci", role: "Comptable", lastAccess: "Hier 18:22", active: true },
  { initials: "IS", name: "Ibrahim Sawadogo", email: "ibrahim@agrotek.ci", role: "Technicien Agricole", lastAccess: "Aujourd'hui 07:30", active: true },
  { initials: "KY", name: "Konan Yao", email: "konan@agrotek.ci", role: "Producteur Partenaire", lastAccess: "07/07/2025", active: true },
  { initials: "MK", name: "Mariam Kouyaté", email: "mariam@agrotek.ci", role: "Responsable RH", lastAccess: "Aujourd'hui 09:00", active: true },
  { initials: "BO", name: "Bamba Oumar", email: "bamba@agrotek.ci", role: "Technicien Matériels", lastAccess: "08/07/2025", active: true },
  { initials: "DK", name: "Kouassi Diomandé", email: "kouassi@agrotek.ci", role: "Agent Qualité", lastAccess: "06/07/2025", active: true },
  { initials: "SA", name: "Soro Adama", email: "soro@agrotek.ci", role: "Stagiaire", lastAccess: "01/07/2025", active: false },
];

const ROLES = [
  { role: "Directeur Général", count: 1, modules: "Tous les modules" },
  { role: "Comptable", count: 2, modules: "Finance, RH, Rapports" },
  { role: "Technicien Agricole", count: 8, modules: "Production, Stocks, Calendrier" },
  { role: "Responsable RH", count: 1, modules: "RH, Paie, Planning, Formation" },
  { role: "Agent Qualité", count: 2, modules: "Qualité, Traçabilité, Certifications" },
  { role: "Producteur Partenaire", count: 18, modules: "Portail Producteur uniquement" },
  { role: "Stagiaire", count: 3, modules: "Lecture seule — Dashboard, Cultures" },
];

// Roles × Modules matrix  (true = full, "read" = lecture seule, false = aucun)
const MATRIX_MODULES = ["Finance", "RH", "Production", "Stocks", "Qualité", "Rapports", "Paie", "Portail"];
const MATRIX_ROLES = ["Dir. Général", "Comptable", "Tech. Agricole", "Resp. RH", "Agent Qualité", "Prod. Partenaire", "Stagiaire"];
const MATRIX: (boolean | "read")[][] = [
  [true,  true,  true,   true,  true,  true,  true,  true ],
  [true,  true,  false,  false, false, true,  true,  false],
  [false, false, true,   true,  false, false, false, false],
  [false, true,  false,  false, false, false, true,  false],
  [false, false, false,  false, true,  false, false, false],
  [false, false, false,  false, false, false, false, true ],
  ["read","read","read", false, false, "read",false, false],
];

const LOGS = [
  { ts: "09/07 09:12", user: "Jean-Baptiste K.", action: "Connexion",   detail: "Login réussi",                                          ip: "41.82.XX",  type: "info" },
  { ts: "09/07 09:05", user: "Adjoua M.",        action: "Export",      detail: "Export comptabilité Q2 2025 (PDF)",                     ip: "41.82.XX",  type: "info" },
  { ts: "09/07 08:50", user: "Mariam K.",        action: "Création",    detail: "Nouveau bulletin paie — Juillet 2025 (287 bulletins)",  ip: "41.82.XX",  type: "success" },
  { ts: "09/07 08:42", user: "Ibrahim S.",       action: "Mise à jour", detail: "Stock cacao +2400 kg LOT-2025-021",                    ip: "41.82.XX",  type: "success" },
  { ts: "09/07 08:30", user: "Système",          action: "Rapport",     detail: "Rapport IA hebdomadaire envoyé (3 destinataires)",      ip: "Système",   type: "info" },
  { ts: "09/07 08:00", user: "Système",          action: "Backup",      detail: "Sauvegarde automatique effectuée (2,4 GB)",             ip: "Système",   type: "success" },
  { ts: "08/07 19:12", user: "Jean-Baptiste K.", action: "Connexion",   detail: "Login réussi (mobile)",                                ip: "41.82.XX",  type: "info" },
  { ts: "08/07 15:00", user: "Adjoua M.",        action: "Paiement",    detail: "Virement fournisseur AGRIINTRANT 4 850 000 XOF",       ip: "41.82.XX",  type: "warning" },
  { ts: "06/07 22:15", user: "Inconnu",          action: "Connexion",   detail: "Tentative échouée",                                    ip: "196.28.XX", type: "danger" },
  { ts: "06/07 08:30", user: "Jean-Baptiste K.", action: "Connexion",   detail: "Login réussi",                                          ip: "41.82.XX",  type: "info" },
];

// ── Avatar colors ──────────────────────────────────────────────────────────────

const AVATAR_COLORS = [
  "bg-emerald-500", "bg-blue-500", "bg-amber-500", "bg-purple-500",
  "bg-rose-500", "bg-teal-500", "bg-indigo-500", "bg-orange-500",
];

// ── Sub-components ─────────────────────────────────────────────────────────────

function MatrixCell({ value }: { value: boolean | "read" }) {
  if (value === true)   return <Check size={14} className="text-emerald-500 mx-auto" />;
  if (value === "read") return <Eye   size={14} className="text-amber-500  mx-auto" />;
  return <X size={14} className="text-gray-300 dark:text-gray-600 mx-auto" />;
}

function ActionBadge({ action, type }: { action: string; type: string }) {
  const colors: Record<string, string> = {
    info:    "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
    success: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
    warning: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
    danger:  "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${colors[type] ?? colors.info}`}>
      {action}
    </span>
  );
}

// ── Tabs content ───────────────────────────────────────────────────────────────

function TabUtilisateurs() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("Tous");

  const roles = ["Tous", ...Array.from(new Set(USERS.map((u) => u.role)))];
  const filtered = USERS.filter((u) => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) ||
                        u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole   = roleFilter === "Tous" || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-3 items-center justify-between">
        <button className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
          <Plus size={16} /> Ajouter un utilisateur
        </button>
        <div className="flex flex-wrap gap-2">
          {/* Search */}
          <div className="relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 w-52"
            />
          </div>
          {/* Role filter */}
          <div className="relative">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="appearance-none pl-3 pr-8 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
            >
              {roles.map((r) => <option key={r}>{r}</option>)}
            </select>
            <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-left">
              <th className="px-4 py-3 font-medium">Utilisateur</th>
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">Rôle</th>
              <th className="px-4 py-3 font-medium">Dernier accès</th>
              <th className="px-4 py-3 font-medium">Statut</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700/60">
            {filtered.map((u, i) => (
              <tr key={u.email} className="bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <span className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold ${AVATAR_COLORS[i % AVATAR_COLORS.length]}`}>
                      {u.initials}
                    </span>
                    <span className="font-medium text-gray-800 dark:text-gray-100">{u.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{u.email}</td>
                <td className="px-4 py-3">
                  <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 border border-emerald-100 dark:border-emerald-800">
                    {u.role}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{u.lastAccess}</td>
                <td className="px-4 py-3">
                  {u.active ? (
                    <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 text-xs font-medium">
                      <CheckCircle size={14} /> Actif
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 text-amber-500 text-xs font-medium">
                      <PauseCircle size={14} /> Inactif
                    </span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
                      <Edit2 size={12} /> Modifier
                    </button>
                    {u.active ? (
                      <button className="text-xs text-amber-500 hover:underline flex items-center gap-1">
                        <PauseCircle size={12} /> Désactiver
                      </button>
                    ) : (
                      <>
                        <button className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1">
                          <CheckCircle size={12} /> Activer
                        </button>
                        <button className="text-xs text-red-500 hover:underline flex items-center gap-1">
                          <Trash2 size={12} /> Supprimer
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-gray-400">{filtered.length} utilisateur{filtered.length > 1 ? "s" : ""} affiché{filtered.length > 1 ? "s" : ""}</p>
    </div>
  );
}

function TabRoles() {
  return (
    <div className="space-y-8">
      {/* Roles table */}
      <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-left">
              <th className="px-4 py-3 font-medium">Rôle</th>
              <th className="px-4 py-3 font-medium">Nb utilisateurs</th>
              <th className="px-4 py-3 font-medium">Modules accessibles</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700/60">
            {ROLES.map((r) => (
              <tr key={r.role} className="bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors">
                <td className="px-4 py-3 font-medium text-gray-800 dark:text-gray-100">{r.role}</td>
                <td className="px-4 py-3">
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                    {r.count}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{r.modules}</td>
                <td className="px-4 py-3">
                  <button className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
                    <Edit2 size={12} /> Modifier
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Matrix */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3 flex items-center gap-2">
          <Shield size={15} className="text-emerald-500" />
          Matrice Rôles × Modules
          <span className="ml-2 flex items-center gap-3 text-xs font-normal text-gray-400">
            <span className="flex items-center gap-1"><Check size={12} className="text-emerald-500" /> Accès complet</span>
            <span className="flex items-center gap-1"><Eye size={12} className="text-amber-500" /> Lecture seule</span>
            <span className="flex items-center gap-1"><X size={12} className="text-gray-400" /> Aucun accès</span>
          </span>
        </h3>
        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
          <table className="text-xs w-full">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800">
                <th className="px-4 py-2.5 text-left font-medium text-gray-500 dark:text-gray-400 min-w-[130px]">Rôle / Module</th>
                {MATRIX_MODULES.map((m) => (
                  <th key={m} className="px-3 py-2.5 font-medium text-gray-500 dark:text-gray-400 text-center">{m}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700/60">
              {MATRIX_ROLES.map((role, ri) => (
                <tr key={role} className="bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <td className="px-4 py-2.5 font-medium text-gray-700 dark:text-gray-200">{role}</td>
                  {MATRIX[ri].map((val, ci) => (
                    <td key={ci} className="px-3 py-2.5 text-center">
                      <MatrixCell value={val} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function TabJournaux() {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-left">
            <th className="px-4 py-3 font-medium">Horodatage</th>
            <th className="px-4 py-3 font-medium">Utilisateur</th>
            <th className="px-4 py-3 font-medium">Action</th>
            <th className="px-4 py-3 font-medium">Détail</th>
            <th className="px-4 py-3 font-medium">IP</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-gray-700/60">
          {LOGS.map((l, i) => (
            <tr key={i} className="bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors">
              <td className="px-4 py-3 font-mono text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">{l.ts}</td>
              <td className="px-4 py-3 font-medium text-gray-800 dark:text-gray-100 whitespace-nowrap">{l.user}</td>
              <td className="px-4 py-3 whitespace-nowrap"><ActionBadge action={l.action} type={l.type} /></td>
              <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{l.detail}</td>
              <td className="px-4 py-3 font-mono text-xs text-gray-400 whitespace-nowrap">{l.ip}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200 border-b border-gray-100 dark:border-gray-700 pb-2 mb-4">
      {children}
    </h3>
  );
}

function FieldRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
      <label className="text-sm text-gray-500 dark:text-gray-400 sm:w-48 shrink-0">{label}</label>
      <div className="flex-1">{children}</div>
    </div>
  );
}

function InputField({ defaultValue, placeholder }: { defaultValue?: string; placeholder?: string }) {
  return (
    <input
      type="text"
      defaultValue={defaultValue}
      placeholder={placeholder}
      className="w-full max-w-sm px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
    />
  );
}

function SelectField({ options, defaultValue }: { options: string[]; defaultValue?: string }) {
  return (
    <div className="relative inline-block max-w-sm w-full">
      <select
        defaultValue={defaultValue}
        className="w-full appearance-none pl-3 pr-8 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
      >
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
      <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
    </div>
  );
}

function Toggle({ defaultChecked }: { defaultChecked?: boolean }) {
  const [on, setOn] = useState(defaultChecked ?? false);
  return (
    <button
      onClick={() => setOn(!on)}
      className={`relative inline-flex h-6 w-11 rounded-full transition-colors duration-200 focus:outline-none ${on ? "bg-emerald-500" : "bg-gray-300 dark:bg-gray-600"}`}
    >
      <span className={`inline-block w-4 h-4 rounded-full bg-white shadow-sm transform transition-transform duration-200 mt-1 ${on ? "translate-x-6" : "translate-x-1"}`} />
    </button>
  );
}

function TabParametres() {
  return (
    <div className="space-y-8 max-w-2xl">
      {/* Entreprise */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-5 space-y-4">
        <SectionTitle>Entreprise</SectionTitle>
        <FieldRow label="Nom de l'entreprise"><InputField defaultValue="AGROTEK CI" /></FieldRow>
        <FieldRow label="Logo">
          <button className="flex items-center gap-2 px-3 py-2 text-sm border border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-500 hover:border-emerald-400 hover:text-emerald-600 transition-colors">
            <Upload size={14} /> Téléverser un logo
          </button>
        </FieldRow>
        <FieldRow label="Devise"><SelectField options={["XOF — Franc CFA", "EUR — Euro", "USD — Dollar"]} defaultValue="XOF — Franc CFA" /></FieldRow>
        <FieldRow label="Langue"><SelectField options={["Français", "English", "Português"]} defaultValue="Français" /></FieldRow>
        <FieldRow label="Fuseau horaire"><SelectField options={["Africa/Abidjan (UTC+0)", "Africa/Lagos (UTC+1)", "Europe/Paris (UTC+2)"]} defaultValue="Africa/Abidjan (UTC+0)" /></FieldRow>
      </div>

      {/* Sécurité */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-5 space-y-4">
        <SectionTitle>Sécurité</SectionTitle>
        <FieldRow label="Politique mot de passe">
          <SelectField options={["Fort (min 10 car., majuscule, chiffre, symbole)", "Moyen (min 8 car., chiffre)", "Basique (min 6 car.)"]} defaultValue="Fort (min 10 car., majuscule, chiffre, symbole)" />
        </FieldRow>
        <FieldRow label="Durée de session">
          <SelectField options={["30 minutes", "1 heure", "4 heures", "8 heures", "24 heures"]} defaultValue="4 heures" />
        </FieldRow>
        <FieldRow label="2FA obligatoire">
          <div className="flex items-center gap-3">
            <Toggle defaultChecked={true} />
            <span className="text-sm text-gray-500 dark:text-gray-400">Activé pour tous les rôles</span>
          </div>
        </FieldRow>
      </div>

      {/* Sauvegarde */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-5 space-y-4">
        <SectionTitle>Sauvegarde</SectionTitle>
        <FieldRow label="Fréquence">
          <SelectField options={["Quotidienne", "Hebdomadaire", "Mensuelle"]} defaultValue="Quotidienne" />
        </FieldRow>
        <FieldRow label="Dernière sauvegarde">
          <span className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
            <CheckCircle size={14} className="text-emerald-500" />
            09/07/2025 à 08:00 — <span className="text-gray-400">2,4 GB</span>
          </span>
        </FieldRow>
        <FieldRow label="">
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
            <Database size={14} /> Sauvegarder maintenant
          </button>
        </FieldRow>
      </div>

      {/* Maintenance */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-5 space-y-4">
        <SectionTitle>Maintenance</SectionTitle>
        <FieldRow label="Version installée">
          <span className="text-sm font-mono font-semibold text-gray-700 dark:text-gray-200">AGRIFRIK ERP v2.5.0</span>
        </FieldRow>
        <FieldRow label="Mise à jour disponible">
          <span className="flex items-center gap-2 text-sm text-amber-600 dark:text-amber-400">
            <RefreshCw size={14} />
            v2.5.1 disponible
          </span>
        </FieldRow>
        <FieldRow label="">
          <button className="flex items-center gap-2 border border-gray-200 dark:border-gray-700 hover:border-emerald-400 text-gray-700 dark:text-gray-200 hover:text-emerald-600 text-sm font-medium px-4 py-2 rounded-lg transition-colors">
            <FileText size={14} /> Voir les notes de version
          </button>
        </FieldRow>
      </div>
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default function AdministrationPage() {
  const [activeTab, setActiveTab] = useState<Tab>("utilisateurs");

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950">
      <Topbar title="Administration" breadcrumb={["Administration"]} />

      <main className="flex-1 p-6 space-y-6">
        {/* Tab bar */}
        <div className="flex gap-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-1.5 w-fit shadow-sm">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                activeTab === tab.id
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div>
          {activeTab === "utilisateurs" && <TabUtilisateurs />}
          {activeTab === "roles"        && <TabRoles />}
          {activeTab === "journaux"     && <TabJournaux />}
          {activeTab === "parametres"   && <TabParametres />}
        </div>
      </main>
    </div>
  );
}
