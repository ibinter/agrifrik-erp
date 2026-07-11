"use client";

import { useState } from "react";
import Topbar from "../../components/Topbar";
import {
  Users,
  Shield,
  Monitor,
  Plug,
  Search,
  Plus,
  Edit2,
  MoreHorizontal,
  X,
  AlertTriangle,
} from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────────

type Tab = "utilisateurs" | "roles" | "sessions" | "integrations";

// ── KPI Data ───────────────────────────────────────────────────────────────────

const KPIS = [
  { label: "Utilisateurs actifs", value: "18", icon: <Users size={20} className="text-emerald-600" />, bg: "bg-emerald-50" },
  { label: "Rôles définis", value: "6", icon: <Shield size={20} className="text-blue-600" />, bg: "bg-blue-50" },
  { label: "Sessions actives", value: "4", icon: <Monitor size={20} className="text-purple-600" />, bg: "bg-purple-50" },
  { label: "Dernière connexion", value: "Il y a 2 min", icon: <Users size={20} className="text-amber-600" />, bg: "bg-amber-50" },
];

// ── Users Data ─────────────────────────────────────────────────────────────────

const USERS = [
  { id: 1, name: "Admin AGRIFRIK", email: "admin@agrifrik.com", role: "Super Admin", lastLogin: "Il y a 2 min", status: "online" },
  { id: 2, name: "Jean-Baptiste Kouassi", email: "jb.kouassi@agrifrik.com", role: "DAF", lastLogin: "Il y a 35 min", status: "online" },
  { id: 3, name: "Mariam Kouyaté", email: "m.kouyate@agrifrik.com", role: "DRH", lastLogin: "Il y a 1h", status: "online" },
  { id: 4, name: "Adjoua Messou", email: "a.messou@agrifrik.com", role: "Comptable", lastLogin: "Il y a 3h", status: "away" },
  { id: 5, name: "Ibrahim Sawadogo", email: "i.sawadogo@agrifrik.com", role: "Chef terrain", lastLogin: "Hier 18h", status: "offline" },
  { id: 6, name: "Konan Yao", email: "k.yao@agrifrik.com", role: "Technicien", lastLogin: "Hier 17h", status: "offline" },
  { id: 7, name: "Bamba Oumar", email: "b.oumar@agrifrik.com", role: "Mécanicien", lastLogin: "Hier 16h", status: "offline" },
  { id: 8, name: "Soro Fatoumata", email: "s.fatoumata@agrifrik.com", role: "Secrétaire", lastLogin: "10/07", status: "offline" },
  { id: 9, name: "Diallo Aminata", email: "d.aminata@agrifrik.com", role: "Stagiaire", lastLogin: "09/07", status: "offline" },
  { id: 10, name: "Laurent Bi", email: "l.bi@agrifrik.com", role: "Gestionnaire", lastLogin: "09/07", status: "offline" },
  { id: 11, name: "Ouédraogo Aïssata", email: "o.aissata@agrifrik.com", role: "Comptable junior", lastLogin: "08/07", status: "offline" },
  { id: 12, name: "Coulibaly Daouda", email: "c.daouda@agrifrik.com", role: "Chauffeur", lastLogin: "07/07", status: "offline" },
];

// ── Roles / Permissions Matrix ────────────────────────────────────────────────

const MODULES = ["Production", "Logistique", "Commerce", "Finance", "RH", "Rapports", "IA", "Admin"];

type PermLevel = "rw" | "ro" | "lim" | "none";

const ROLES_MATRIX: { role: string; perms: PermLevel[] }[] = [
  { role: "Super Admin",  perms: ["rw","rw","rw","rw","rw","rw","rw","rw"] },
  { role: "DAF",          perms: ["lim","lim","rw","rw","lim","rw","ro","none"] },
  { role: "DRH",          perms: ["lim","lim","lim","lim","rw","ro","lim","none"] },
  { role: "Chef terrain", perms: ["rw","ro","lim","none","lim","lim","ro","none"] },
  { role: "Comptable",    perms: ["none","lim","ro","rw","none","ro","none","none"] },
  { role: "Technicien",   perms: ["ro","ro","none","none","none","lim","ro","none"] },
];

function PermBadge({ level }: { level: PermLevel }) {
  if (level === "rw")   return <span className="text-sm" title="Lecture + Écriture">✅✏️</span>;
  if (level === "ro")   return <span className="text-sm" title="Lecture seule">✅</span>;
  if (level === "lim")  return <span className="text-sm" title="Vue limitée">👁</span>;
  return <span className="text-sm" title="Accès refusé">❌</span>;
}

// ── Sessions Data ─────────────────────────────────────────────────────────────

const SESSIONS_ACTIVE = [
  { user: "Admin AGRIFRIK", ip: "192.168.1.12", browser: "Chrome 125", os: "Windows 11", connectedAt: "09:45", duration: "1h02" },
  { user: "Jean-Baptiste K.", ip: "192.168.1.20", browser: "Firefox 127", os: "Windows 10", connectedAt: "08:30", duration: "2h17" },
  { user: "Mariam K.", ip: "192.168.1.19", browser: "Chrome 125", os: "macOS", connectedAt: "09:12", duration: "35 min" },
  { user: "Mobile App", ip: "41.203.14.88", browser: "App AGRIFRIK", os: "Android 14", connectedAt: "10:42", duration: "5 min" },
];

const SESSIONS_HISTORY = [
  { user: "Admin AGRIFRIK", ip: "192.168.1.12", date: "11/07 09:45", action: "Connexion réussie", status: "success" },
  { user: "Jean-Baptiste K.", ip: "192.168.1.20", date: "11/07 08:30", action: "Connexion réussie", status: "success" },
  { user: "Mariam K.", ip: "192.168.1.19", date: "11/07 09:12", action: "Connexion réussie", status: "success" },
  { user: "Adjoua M.", ip: "192.168.1.22", date: "10/07 17:05", action: "Connexion réussie", status: "success" },
  { user: "Ibrahim S.", ip: "192.168.1.25", date: "10/07 14:30", action: "Connexion réussie", status: "success" },
  { user: "Admin AGRIFRIK", ip: "192.168.1.12", date: "10/07 08:15", action: "Connexion réussie", status: "success" },
  { user: "Inconnu", ip: "41.203.14.88", date: "10/07 07:22", action: "Tentative échouée", status: "fail" },
  { user: "Inconnu", ip: "41.203.14.88", date: "10/07 07:21", action: "Tentative échouée", status: "fail" },
  { user: "Inconnu", ip: "41.203.14.88", date: "10/07 07:20", action: "Tentative échouée — Compte bloqué 15 min", status: "fail" },
  { user: "Jean-Baptiste K.", ip: "192.168.1.20", date: "09/07 16:40", action: "Connexion réussie", status: "success" },
];

// ── Integrations Data ─────────────────────────────────────────────────────────

const INTEGRATIONS = [
  { name: "Supabase", category: "Base de données", desc: "Base de données PostgreSQL temps réel", status: true, icon: "🗄️" },
  { name: "Météo API", category: "Données agricoles", desc: "Données météo pour 15 jours (OpenWeather)", status: true, icon: "🌤️" },
  { name: "Orange Money API", category: "Paiements", desc: "Paiements mobiles et transferts fournisseurs", status: false, icon: "💳" },
  { name: "DGI CI (eFiscalité)", category: "Fiscal", desc: "Soumission déclarations fiscales automatique", status: false, icon: "🏛️" },
  { name: "Certificateur Bio", category: "Qualité", desc: "Synchronisation certificats biologiques", status: true, icon: "🌿" },
  { name: "Portail Producteur", category: "B2B", desc: "API partenaires et producteurs externes", status: true, icon: "🤝" },
];

// ── Status badge ──────────────────────────────────────────────────────────────

function StatusDot({ status }: { status: string }) {
  if (status === "online") return <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-600"><span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />En ligne</span>;
  if (status === "away")   return <span className="flex items-center gap-1.5 text-xs font-medium text-amber-500"><span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />Absent</span>;
  return <span className="flex items-center gap-1.5 text-xs font-medium text-gray-400"><span className="w-2 h-2 rounded-full bg-gray-300 inline-block" />Hors ligne</span>;
}

function initials(name: string) {
  return name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
}

const AVATAR_COLORS = [
  "bg-emerald-500","bg-blue-500","bg-purple-500","bg-amber-500",
  "bg-rose-500","bg-teal-500","bg-indigo-500","bg-orange-500",
  "bg-cyan-500","bg-pink-500","bg-lime-600","bg-sky-500",
];

// ── Tab Components ────────────────────────────────────────────────────────────

function TabUtilisateurs() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const PAGE_SIZE = 12;

  const filtered = USERS.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.role.toLowerCase().includes(search.toLowerCase())
  );
  const pageCount = Math.ceil(filtered.length / PAGE_SIZE);
  const visible = filtered.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher un utilisateur…"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(0); }}
            className="pl-9 pr-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2E7D32] w-64"
          />
        </div>
        <button className="flex items-center gap-2 bg-[#2E7D32] hover:bg-[#1B5E20] text-white text-xs font-medium px-4 py-2 rounded-xl transition-colors">
          <Plus size={15} /> Nouvel utilisateur
        </button>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-gray-100">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#F8FBF8] text-gray-500 text-left">
              <th className="px-4 py-3 font-medium">#</th>
              <th className="px-4 py-3 font-medium">Utilisateur</th>
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">Rôle</th>
              <th className="px-4 py-3 font-medium">Dernière connexion</th>
              <th className="px-4 py-3 font-medium">Statut</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {visible.map((u, i) => {
              const globalIndex = page * PAGE_SIZE + i;
              return (
                <tr key={u.id} className="bg-white hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-gray-400 text-xs">{u.id}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <span className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${AVATAR_COLORS[globalIndex % AVATAR_COLORS.length]}`}>
                        {initials(u.name)}
                      </span>
                      <span className="font-medium text-gray-800">{u.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-xs">{u.email}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100">
                      {u.role}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-xs">{u.lastLogin}</td>
                  <td className="px-4 py-3"><StatusDot status={u.status} /></td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button className="flex items-center gap-1 text-xs text-blue-600 hover:underline">
                        <Edit2 size={12} /> Modifier
                      </button>
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreHorizontal size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {pageCount > 1 && (
        <div className="flex items-center gap-2 justify-end">
          {Array.from({ length: pageCount }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              className={`w-7 h-7 rounded-lg text-xs font-medium transition-colors ${
                i === page ? "bg-[#2E7D32] text-white" : "bg-white border border-gray-200 text-gray-500 hover:border-[#2E7D32]"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
      <p className="text-xs text-gray-400">{filtered.length} utilisateur{filtered.length > 1 ? "s" : ""} — Page {page + 1}/{Math.max(1, pageCount)}</p>
    </div>
  );
}

function TabRoles() {
  return (
    <div className="space-y-6">
      <div className="overflow-x-auto rounded-2xl border border-gray-100">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#F8FBF8] text-gray-500 text-left">
              <th className="px-4 py-3 font-medium">Rôle</th>
              {MODULES.map((m) => (
                <th key={m} className="px-3 py-3 font-medium text-center text-xs">{m}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {ROLES_MATRIX.map((r) => (
              <tr key={r.role} className="bg-white hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 font-medium text-gray-800 whitespace-nowrap">{r.role}</td>
                {r.perms.map((p, ci) => (
                  <td key={ci} className="px-3 py-3 text-center">
                    <PermBadge level={p} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 text-xs text-gray-500 bg-[#F8FBF8] rounded-xl px-4 py-3">
        <span className="font-medium text-gray-700 mr-2">Légende :</span>
        <span>✅✏️ Lecture + Écriture</span>
        <span>✅ Lecture seule</span>
        <span>👁 Vue limitée</span>
        <span>❌ Accès refusé</span>
      </div>

      <div className="flex justify-end">
        <button className="flex items-center gap-2 bg-[#2E7D32] hover:bg-[#1B5E20] text-white text-xs font-medium px-4 py-2 rounded-xl transition-colors">
          <Plus size={14} /> Créer un rôle
        </button>
      </div>
    </div>
  );
}

function TabSessions() {
  return (
    <div className="space-y-6">
      {/* Active sessions */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
          Sessions actives (4)
        </h3>
        <div className="overflow-x-auto rounded-2xl border border-gray-100">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#F8FBF8] text-gray-500 text-left">
                <th className="px-4 py-3 font-medium">Utilisateur</th>
                <th className="px-4 py-3 font-medium">IP</th>
                <th className="px-4 py-3 font-medium">Navigateur</th>
                <th className="px-4 py-3 font-medium">OS</th>
                <th className="px-4 py-3 font-medium">Connexion</th>
                <th className="px-4 py-3 font-medium">Durée</th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {SESSIONS_ACTIVE.map((s, i) => (
                <tr key={i} className="bg-white hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-gray-800">{s.user}</td>
                  <td className="px-4 py-3 font-mono text-xs text-gray-500">{s.ip}</td>
                  <td className="px-4 py-3 text-gray-500 text-xs">{s.browser}</td>
                  <td className="px-4 py-3 text-gray-500 text-xs">{s.os}</td>
                  <td className="px-4 py-3 text-gray-500 text-xs">{s.connectedAt}</td>
                  <td className="px-4 py-3 text-gray-600 text-xs">{s.duration}</td>
                  <td className="px-4 py-3">
                    <button className="flex items-center gap-1 text-xs text-red-500 hover:text-red-700 font-medium">
                      <X size={12} /> Terminer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* History */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Historique connexions (7 jours)</h3>
        <div className="overflow-x-auto rounded-2xl border border-gray-100">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#F8FBF8] text-gray-500 text-left">
                <th className="px-4 py-3 font-medium">Utilisateur</th>
                <th className="px-4 py-3 font-medium">IP</th>
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">Action</th>
                <th className="px-4 py-3 font-medium">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {SESSIONS_HISTORY.map((s, i) => (
                <tr key={i} className="bg-white hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-gray-800">{s.user}</td>
                  <td className="px-4 py-3 font-mono text-xs text-gray-500">{s.ip}</td>
                  <td className="px-4 py-3 text-gray-500 text-xs">{s.date}</td>
                  <td className="px-4 py-3 text-gray-600 text-xs">{s.action}</td>
                  <td className="px-4 py-3">
                    {s.status === "success" ? (
                      <span className="px-2 py-0.5 rounded-full text-xs bg-emerald-50 text-emerald-700">Réussi</span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full text-xs bg-red-50 text-red-600">Échoué</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Failed attempts alert */}
      <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
        <AlertTriangle size={18} className="text-amber-500 shrink-0 mt-0.5" />
        <div className="text-sm">
          <p className="font-semibold text-amber-800">Tentatives échouées détectées</p>
          <p className="text-amber-700 text-xs mt-0.5">
            3 tentatives de connexion échouées depuis l&apos;IP <span className="font-mono font-semibold">41.203.14.88</span> le 10/07 — compte bloqué automatiquement pendant 15 minutes.
          </p>
        </div>
      </div>
    </div>
  );
}

function TabIntegrations() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {INTEGRATIONS.map((intg) => (
        <div key={intg.name} className="rounded-2xl border border-gray-100 bg-white p-5 flex flex-col gap-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{intg.icon}</span>
              <div>
                <p className="font-semibold text-gray-800 text-sm">{intg.name}</p>
                <p className="text-xs text-gray-400">{intg.category}</p>
              </div>
            </div>
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${intg.status ? "bg-emerald-50 text-emerald-700" : "bg-gray-100 text-gray-500"}`}>
              {intg.status ? "Connecté" : "Inactif"}
            </span>
          </div>
          <p className="text-xs text-gray-500">{intg.desc}</p>
          <button className={`text-xs font-medium px-3 py-1.5 rounded-xl transition-colors ${intg.status ? "border border-gray-200 text-gray-600 hover:border-red-300 hover:text-red-600" : "bg-[#2E7D32] text-white hover:bg-[#1B5E20]"}`}>
            {intg.status ? "Déconnecter" : "Connecter"}
          </button>
        </div>
      ))}
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────

const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: "utilisateurs", label: "Utilisateurs", icon: <Users size={15} /> },
  { id: "roles", label: "Rôles & Permissions", icon: <Shield size={15} /> },
  { id: "sessions", label: "Sessions", icon: <Monitor size={15} /> },
  { id: "integrations", label: "Intégrations", icon: <Plug size={15} /> },
];

export default function AdministrationPage() {
  const [activeTab, setActiveTab] = useState<Tab>("utilisateurs");

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Topbar title="Administration Système" breadcrumb={["Administration", "Administration"]} />

      <main className="flex-1 p-6 space-y-6">
        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {KPIS.map((kpi) => (
            <div key={kpi.label} className="rounded-2xl border border-gray-100 bg-white p-5 flex items-center gap-4">
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${kpi.bg}`}>
                {kpi.icon}
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">{kpi.value}</p>
                <p className="text-xs text-gray-500 mt-0.5">{kpi.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Tab bar */}
        <div className="flex gap-1 bg-white border border-gray-100 rounded-2xl p-1.5 w-fit shadow-sm">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-150 ${
                activeTab === tab.id
                  ? "bg-[#2E7D32] text-white shadow-sm"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div>
          {activeTab === "utilisateurs"  && <TabUtilisateurs />}
          {activeTab === "roles"         && <TabRoles />}
          {activeTab === "sessions"      && <TabSessions />}
          {activeTab === "integrations"  && <TabIntegrations />}
        </div>
      </main>
    </div>
  );
}
