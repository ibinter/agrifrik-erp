"use client";

import { useState } from "react";
import Topbar from "../../components/Topbar";
import { Users, Settings, Database, Shield, Plus, Edit2, RefreshCw, Download, Upload, HardDrive } from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────────
type Tab = "utilisateurs" | "systeme" | "donnees" | "securite";

// ── DATA ───────────────────────────────────────────────────────────────────────

const USERS = [
  { nom: "Koffi Amani", email: "admin@agrifrik.com", role: "Directeur Général (Admin)", lastLogin: "11/07/2025 08h32", statut: "actif" },
  { nom: "Adjoua Messou", email: "adjoua.m@agrifrik.com", role: "Comptable / Finance", lastLogin: "10/07/2025 16h48", statut: "actif" },
  { nom: "Ibrahim Sawadogo", email: "ibrahim.s@agrifrik.com", role: "Technicien terrain", lastLogin: "11/07/2025 07h00", statut: "actif" },
  { nom: "Kofi Mensah (Stagiaire)", email: "kofi.m@agrifrik.com", role: "Lecture seule", lastLogin: "08/07/2025", statut: "actif" },
  { nom: "[Compte désactivé]", email: "ancien@agrifrik.com", role: "—", lastLogin: "Jamais", statut: "desactive" },
];

const ROLES = [
  { role: "Admin", modules: "Tous (48 modules)", droits: "Lecture + Écriture + Suppression", nb: 1 },
  { role: "Finance", modules: "Finance + Rapports", droits: "Lecture + Écriture", nb: 1 },
  { role: "Terrain", modules: "Production + Logistique + Planning", droits: "Lecture + Écriture", nb: 1 },
  { role: "Lecture seule", modules: "Dashboard + Rapports", droits: "Lecture uniquement", nb: 1 },
];

const SYSTEM_INFO = [
  { param: "Version AGRIFRIK ERP", valeur: "2.8.4 (build 20250711)", detail: "Serveur CI-AGRI-PROD-01", statut: "ok", label: "À jour" },
  { param: "Environnement", valeur: "Production", detail: "Serveur CI-AGRI-PROD-01", statut: "ok", label: "Production" },
  { param: "Base de données", valeur: "Supabase (PostgreSQL 15)", detail: "", statut: "ok", label: "Connectée" },
  { param: "Stockage utilisé", valeur: "2,4 GB / 10 GB (24%)", detail: "", statut: "ok", label: "OK" },
  { param: "CDN", valeur: "Vercel Edge Network", detail: "", statut: "ok", label: "Actif" },
  { param: "Uptime", valeur: "99,97% (30 derniers jours)", detail: "", statut: "ok", label: "Excellent" },
  { param: "Dernière sauvegarde", valeur: "11/07/2025 03h00", detail: "", statut: "ok", label: "Auto (quotidien)" },
];

const UPDATES = [
  { composant: "ERP Core", current: "2.8.4", available: "2.8.5", changes: "Correctif : rapport annuel export PDF" },
  { composant: "Module IA/ARIA", current: "1.4.2", available: "1.4.3", changes: "Amélioration modèle prédictif mirides" },
];

const DATA_TABLES = [
  { table: "Cultures / Lots", records: "186", taille: "8,2 MB", maj: "11/07/2025" },
  { table: "Transactions financières", records: "2 847", taille: "24,1 MB", maj: "11/07/2025" },
  { table: "Rapport terrain", records: "28", taille: "142 MB (photos)", maj: "07/07/2025" },
  { table: "Inventaire stock", records: "94", taille: "1,2 MB", maj: "11/07/2025" },
];

const SECURITY_LOGS = [
  { date: "11/07 08h32", event: "Connexion", user: "admin@agrifrik.com", ip: "102.176.x.x", result: "ok" },
  { date: "11/07 07h00", event: "Connexion", user: "ibrahim.s@agrifrik.com", ip: "154.0.x.x", result: "ok" },
  { date: "10/07 21h47", event: "Tentative connexion", user: "inconnu", ip: "45.32.x.x", result: "fail" },
  { date: "10/07 16h48", event: "Connexion", user: "adjoua.m@agrifrik.com", ip: "102.176.x.x", result: "ok" },
];

const SECURITY_PARAMS = [
  { param: "Authentification 2FA", valeur: "Désactivée", action: "Activer", danger: true },
  { param: "Durée session", valeur: "8 heures", action: "Modifier", danger: false },
  { param: "Nombre de tentatives max", valeur: "5 avant blocage", action: "Modifier", danger: false },
  { param: "Chiffrement données", valeur: "AES-256 ✅", action: null, danger: false },
  { param: "HTTPS forcé", valeur: "✅", action: null, danger: false },
];

// ── SVG Système — Line chart utilisation 30 jours ──────────────────────────────

function ChartSystemUsage() {
  // Lundi–Vendredi élevés, weekends creux, pic le 11/07 (début de semaine)
  const days = ["L","M","M","J","V","S","D","L","M","M","J","V","S","D","L","M","M","J","V","S","D","L","M","M","J","V","S","D","L","V"];
  const values = [72,68,74,71,76,28,18,80,75,77,73,79,25,15,78,74,76,72,80,22,12,82,78,80,75,83,20,14,85,60];
  const W = 640, H = 160, PL = 36, PR = 12, PT = 16, PB = 28;
  const w = W - PL - PR;
  const h = H - PT - PB;
  const max = 100;
  const pts = values.map((v, i) => {
    const x = PL + (i / (values.length - 1)) * w;
    const y = PT + h - (v / max) * h;
    return `${x},${y}`;
  });
  const poly = pts.join(" ");
  const area = `${PL},${PT + h} ${poly} ${PL + w},${PT + h}`;

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5">
      <h3 className="text-sm font-semibold text-gray-800 mb-1">Utilisation système — 30 derniers jours</h3>
      <p className="text-xs text-gray-400 mb-3">Connexions + actions par jour (index normalisé)</p>
      <div className="overflow-x-auto">
        <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} className="max-w-full">
          {[0, 25, 50, 75, 100].map((v) => {
            const y = PT + h - (v / max) * h;
            return (
              <g key={v}>
                <line x1={PL} y1={y} x2={PL + w} y2={y} stroke="#f3f4f6" strokeWidth={1} />
                <text x={PL - 4} y={y + 3} textAnchor="end" fontSize={8} fill="#9ca3af">{v}</text>
              </g>
            );
          })}
          <polygon points={area} fill="#2E7D32" fillOpacity={0.08} />
          <polyline points={poly} fill="none" stroke="#2E7D32" strokeWidth={2} strokeLinejoin="round" />
          {/* Pic 11/07 = dernier lundi (index 28) */}
          <circle cx={PL + (28 / (values.length - 1)) * w} cy={PT + h - (85 / max) * h} r={4} fill="#2E7D32" />
          <text x={PL + (28 / (values.length - 1)) * w} y={PT + h - (85 / max) * h - 7} textAnchor="middle" fontSize={8} fill="#2E7D32" fontWeight="600">85 — 11/07</text>
          {/* Axe X : quelques labels */}
          {[0, 7, 14, 21, 28].map((i) => (
            <text key={i} x={PL + (i / (values.length - 1)) * w} y={H - 6} textAnchor="middle" fontSize={8} fill="#9ca3af">{days[i]}</text>
          ))}
        </svg>
      </div>
    </div>
  );
}

// ── Tabs ───────────────────────────────────────────────────────────────────────

function TabUtilisateurs() {
  return (
    <div className="space-y-6">
      {/* Tableau utilisateurs */}
      <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-800">Utilisateurs ({USERS.length})</h3>
          <button className="flex items-center gap-1.5 bg-[#2E7D32] text-white text-xs font-medium px-3 py-2 rounded-xl hover:bg-[#1B5E20] transition-colors">
            <Plus size={13} /> Inviter un utilisateur
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#F8FBF8] text-gray-500 text-left">
                <th className="px-4 py-3 font-medium text-xs">Nom</th>
                <th className="px-4 py-3 font-medium text-xs">Email</th>
                <th className="px-4 py-3 font-medium text-xs">Rôle</th>
                <th className="px-4 py-3 font-medium text-xs">Dernier login</th>
                <th className="px-4 py-3 font-medium text-xs">Statut</th>
                <th className="px-4 py-3 font-medium text-xs">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {USERS.map((u, i) => (
                <tr key={i} className="bg-white hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-gray-800 text-sm">{u.nom}</td>
                  <td className="px-4 py-3 text-gray-500 text-xs font-mono">{u.email}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100">
                      {u.role}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-xs">{u.lastLogin}</td>
                  <td className="px-4 py-3">
                    {u.statut === "actif" ? (
                      <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-600">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" /> Actif
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 text-xs font-medium text-red-500">
                        <span className="w-2 h-2 rounded-full bg-red-400 inline-block" /> Désactivé
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {u.statut === "actif" ? (
                      <button className="flex items-center gap-1 text-xs text-blue-600 hover:underline font-medium">
                        <Edit2 size={11} /> Modifier
                      </button>
                    ) : (
                      <button className="text-xs text-emerald-600 hover:underline font-medium">Réactiver</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tableau rôles */}
      <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-800">Rôles et permissions</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#F8FBF8] text-gray-500 text-left">
                <th className="px-4 py-3 font-medium text-xs">Rôle</th>
                <th className="px-4 py-3 font-medium text-xs">Modules accessibles</th>
                <th className="px-4 py-3 font-medium text-xs">Droits</th>
                <th className="px-4 py-3 font-medium text-xs text-center">Nb utilisateurs</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {ROLES.map((r, i) => (
                <tr key={i} className="bg-white hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-semibold text-gray-800 text-sm">{r.role}</td>
                  <td className="px-4 py-3 text-gray-600 text-xs">{r.modules}</td>
                  <td className="px-4 py-3 text-gray-600 text-xs">{r.droits}</td>
                  <td className="px-4 py-3 text-center">
                    <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">{r.nb}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function TabSysteme() {
  return (
    <div className="space-y-6">
      {/* Infos système */}
      <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-800">Informations système</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#F8FBF8] text-gray-500 text-left">
                <th className="px-4 py-3 font-medium text-xs">Paramètre</th>
                <th className="px-4 py-3 font-medium text-xs">Valeur</th>
                <th className="px-4 py-3 font-medium text-xs">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {SYSTEM_INFO.map((s, i) => (
                <tr key={i} className="bg-white hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-gray-700 text-sm">{s.param}</td>
                  <td className="px-4 py-3 text-gray-600 text-xs font-mono">{s.valeur}</td>
                  <td className="px-4 py-3">
                    <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-600">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" /> {s.label}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SVG chart */}
      <ChartSystemUsage />

      {/* Mises à jour */}
      <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-800">Mises à jour disponibles</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#F8FBF8] text-gray-500 text-left">
                <th className="px-4 py-3 font-medium text-xs">Composant</th>
                <th className="px-4 py-3 font-medium text-xs">Version actuelle</th>
                <th className="px-4 py-3 font-medium text-xs">Disponible</th>
                <th className="px-4 py-3 font-medium text-xs">Changements</th>
                <th className="px-4 py-3 font-medium text-xs">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {UPDATES.map((u, i) => (
                <tr key={i} className="bg-white hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-gray-800 text-sm">{u.composant}</td>
                  <td className="px-4 py-3 text-gray-500 text-xs font-mono">{u.current}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">{u.available}</span>
                  </td>
                  <td className="px-4 py-3 text-gray-600 text-xs">{u.changes}</td>
                  <td className="px-4 py-3">
                    <button className="text-xs bg-[#2E7D32] text-white px-3 py-1 rounded-lg hover:bg-[#1B5E20] transition-colors font-medium">
                      Mettre à jour
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function TabDonnees() {
  return (
    <div className="space-y-6">
      {/* Cards actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: <Upload size={20} className="text-blue-600" />, bg: "bg-blue-50", title: "Importer données Excel", desc: "Fichiers .xlsx / .csv", label: "Importer", color: "bg-blue-600" },
          { icon: <Download size={20} className="text-emerald-600" />, bg: "bg-emerald-50", title: "Exporter toutes les données", desc: "Archive ZIP (CSV)", label: "Exporter ZIP", color: "bg-[#2E7D32]" },
          { icon: <RefreshCw size={20} className="text-purple-600" />, bg: "bg-purple-50", title: "Synchroniser Supabase", desc: "Sync temps réel", label: "Synchroniser", color: "bg-purple-600" },
          { icon: <HardDrive size={20} className="text-amber-600" />, bg: "bg-amber-50", title: "Voir les sauvegardes", desc: "7 dernières sauvegardes", label: "Voir", color: "bg-amber-600" },
        ].map((c, i) => (
          <div key={i} className="rounded-2xl border border-gray-100 bg-white p-5 flex flex-col gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${c.bg}`}>
              {c.icon}
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800">{c.title}</p>
              <p className="text-xs text-gray-400 mt-0.5">{c.desc}</p>
            </div>
            <button className={`mt-auto text-xs text-white font-medium px-3 py-2 rounded-xl ${c.color} hover:opacity-90 transition-opacity`}>
              {c.label}
            </button>
          </div>
        ))}
      </div>

      {/* Statistiques données */}
      <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-800">Statistiques des données</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#F8FBF8] text-gray-500 text-left">
                <th className="px-4 py-3 font-medium text-xs">Table</th>
                <th className="px-4 py-3 font-medium text-xs text-right">Enregistrements</th>
                <th className="px-4 py-3 font-medium text-xs text-right">Taille</th>
                <th className="px-4 py-3 font-medium text-xs">Dernière màj</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {DATA_TABLES.map((d, i) => (
                <tr key={i} className="bg-white hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-gray-800 text-sm">{d.table}</td>
                  <td className="px-4 py-3 text-right">
                    <span className="text-xs font-semibold text-gray-700">{d.records}</span>
                  </td>
                  <td className="px-4 py-3 text-right text-xs text-gray-500 font-mono">{d.taille}</td>
                  <td className="px-4 py-3 text-xs text-gray-500">{d.maj}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function TabSecurite() {
  return (
    <div className="space-y-6">
      {/* Logs */}
      <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-800">Logs de sécurité récents</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#F8FBF8] text-gray-500 text-left">
                <th className="px-4 py-3 font-medium text-xs">Date</th>
                <th className="px-4 py-3 font-medium text-xs">Événement</th>
                <th className="px-4 py-3 font-medium text-xs">Utilisateur</th>
                <th className="px-4 py-3 font-medium text-xs">IP</th>
                <th className="px-4 py-3 font-medium text-xs">Résultat</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {SECURITY_LOGS.map((l, i) => (
                <tr key={i} className="bg-white hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-xs text-gray-500 font-mono whitespace-nowrap">{l.date}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{l.event}</td>
                  <td className="px-4 py-3 text-xs text-gray-600 font-mono">{l.user}</td>
                  <td className="px-4 py-3 text-xs text-gray-500 font-mono">{l.ip}</td>
                  <td className="px-4 py-3">
                    {l.result === "ok" ? (
                      <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-600">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" /> Succès
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 text-xs font-medium text-red-500">
                        <span className="w-2 h-2 rounded-full bg-red-400 inline-block" /> Échec (IP bloquée)
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Paramètres sécurité */}
      <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-800">Paramètres de sécurité</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#F8FBF8] text-gray-500 text-left">
                <th className="px-4 py-3 font-medium text-xs">Paramètre</th>
                <th className="px-4 py-3 font-medium text-xs">Valeur</th>
                <th className="px-4 py-3 font-medium text-xs">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {SECURITY_PARAMS.map((p, i) => (
                <tr key={i} className="bg-white hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-gray-700 text-sm">{p.param}</td>
                  <td className="px-4 py-3 text-gray-600 text-xs">{p.valeur}</td>
                  <td className="px-4 py-3">
                    {p.action ? (
                      <button className={`text-xs font-medium px-3 py-1 rounded-lg transition-colors ${
                        p.danger
                          ? "bg-emerald-600 text-white hover:bg-[#1B5E20]"
                          : "border border-gray-200 text-gray-600 hover:border-[#2E7D32] hover:text-[#2E7D32]"
                      }`}>
                        {p.action}
                      </button>
                    ) : (
                      <span className="text-xs text-gray-400">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────

const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: "utilisateurs", label: "Utilisateurs", icon: <Users size={14} /> },
  { id: "systeme", label: "Système", icon: <Settings size={14} /> },
  { id: "donnees", label: "Données", icon: <Database size={14} /> },
  { id: "securite", label: "Sécurité", icon: <Shield size={14} /> },
];

export default function AdministrationPage() {
  const [activeTab, setActiveTab] = useState<Tab>("utilisateurs");

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Topbar title="Administration Système" breadcrumb={["Admin", "Administration"]} />

      <main className="flex-1 p-6 space-y-6">
        {/* En-tête */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Administration Système</h1>
            <p className="text-sm text-gray-500 mt-0.5">Configuration, utilisateurs, sécurité et données</p>
          </div>
          <span className="inline-flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-xs font-semibold px-3 py-1.5 rounded-full self-start">
            🔒 Accès administrateur uniquement
          </span>
        </div>

        {/* Onglets */}
        <div className="flex gap-1 bg-white border border-gray-100 rounded-2xl p-1.5 w-fit shadow-sm flex-wrap">
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

        {/* Contenu */}
        {activeTab === "utilisateurs" && <TabUtilisateurs />}
        {activeTab === "systeme"      && <TabSysteme />}
        {activeTab === "donnees"      && <TabDonnees />}
        {activeTab === "securite"     && <TabSecurite />}
      </main>
    </div>
  );
}
