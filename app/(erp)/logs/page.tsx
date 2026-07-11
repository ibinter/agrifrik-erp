"use client";

import { useState } from "react";
import Topbar from "../../components/Topbar";
import {
  Download,
  ChevronLeft,
  ChevronRight,
  Activity,
  AlertTriangle,
  Info,
  ShieldAlert,
  Wifi,
} from "lucide-react";

interface LogEntry {
  id: number;
  datetime: string;
  level: "INFO" | "WARNING" | "ERROR" | "CRITICAL";
  module: string;
  user: string;
  action: string;
  ip: string;
  details: string;
}

const LOG_DATA: LogEntry[] = [
  { id: 1,  datetime: "11/07/2025 09:47:22", level: "INFO",     module: "Auth",     user: "admin@agrifrik.com", action: "Connexion réussie",   ip: "192.168.1.12", details: "Navigateur Chrome 125" },
  { id: 2,  datetime: "11/07/2025 09:45:18", level: "INFO",     module: "Stocks",   user: "ibrahim.s",          action: "Mouvement stock",     ip: "192.168.1.15", details: "Entrée 240kg Cacao Grade A — Entrepôt A Zone 2" },
  { id: 3,  datetime: "11/07/2025 09:30:05", level: "WARNING",  module: "API",      user: "Système",            action: "Latence élevée",      ip: "—",            details: "Endpoint /api/meteo — 2 340ms (seuil : 1 000ms)" },
  { id: 4,  datetime: "11/07/2025 09:15:42", level: "INFO",     module: "Ventes",   user: "adjoua.m",           action: "Nouveau devis",       ip: "192.168.1.18", details: "DEV-2025-089 — Barry Callebaut — 12,4 M XOF" },
  { id: 5,  datetime: "11/07/2025 08:42:11", level: "CRITICAL", module: "Stocks",   user: "Système",            action: "Alerte déclenchée",   ip: "—",            details: "KCl engrais sous seuil critique (45kg < 50kg)" },
  { id: 6,  datetime: "11/07/2025 08:30:00", level: "INFO",     module: "Système",  user: "Cron",               action: "Backup automatique",  ip: "—",            details: "Backup DB réussi — 142 MB — Durée 1m 22s" },
  { id: 7,  datetime: "10/07/2025 18:45:33", level: "ERROR",    module: "Auth",     user: "unknown",            action: "Échec connexion ×3",  ip: "41.203.14.88", details: "Compte bloqué temporairement 15 min" },
  { id: 8,  datetime: "10/07/2025 17:22:08", level: "INFO",     module: "Factures", user: "jean-baptiste.k",    action: "Facture éditée",      ip: "192.168.1.20", details: "FAC-2025-041 — Barry Callebaut — 12,44 M XOF" },
  { id: 9,  datetime: "10/07/2025 16:05:11", level: "INFO",     module: "RH",       user: "mariam.k",           action: "Bulletin généré",     ip: "192.168.1.19", details: "287 bulletins paie Juillet 2025" },
  { id: 10, datetime: "10/07/2025 14:18:55", level: "WARNING",  module: "Qualité",  user: "Système",            action: "Non-conformité",      ip: "—",            details: "LOT-032 Anacarde — humidité 12.4% > 10% norme" },
  { id: 11, datetime: "10/07/2025 12:30:00", level: "INFO",     module: "Achats",   user: "koffi.a",            action: "Bon de commande",     ip: "192.168.1.30", details: "BC-2025-044 — YARA Nederland — NPK 500kg" },
  { id: 12, datetime: "10/07/2025 11:10:45", level: "INFO",     module: "Ventes",   user: "adjoua.m",           action: "Contrat signé",       ip: "192.168.1.18", details: "CTR-2025-018 — Cemoi Chocolatier — 18 tonnes" },
  { id: 13, datetime: "10/07/2025 09:55:12", level: "WARNING",  module: "Finance",  user: "Système",            action: "Budget dépassé",      ip: "—",            details: "Poste R&D dépassé de 8% — 118 000 XOF" },
  { id: 14, datetime: "09/07/2025 17:40:28", level: "INFO",     module: "Stocks",   user: "fatou.b",            action: "Inventaire",          ip: "192.168.1.14", details: "Inventaire mensuel Entrepôt B — 47 références" },
  { id: 15, datetime: "09/07/2025 15:22:09", level: "ERROR",    module: "Ventes",   user: "Système",            action: "Échec export PDF",    ip: "—",            details: "FAC-2025-039 — Timeout génération — Résolu après retry" },
  { id: 16, datetime: "09/07/2025 14:05:33", level: "INFO",     module: "RH",       user: "mariam.k",           action: "Congé approuvé",      ip: "192.168.1.19", details: "Ibrahim S. — Congé annuel 14/07-25/07/2025" },
  { id: 17, datetime: "09/07/2025 12:48:17", level: "INFO",     module: "Qualité",  user: "ibrahim.s",          action: "Contrôle lot",        ip: "192.168.1.15", details: "LOT-031 Cacao — Conforme — Grade A — Humidité 9,1%" },
  { id: 18, datetime: "09/07/2025 10:15:44", level: "WARNING",  module: "Système",  user: "Système",            action: "Disque >80%",         ip: "—",            details: "Serveur principal — 82% capacité — Action recommandée" },
  { id: 19, datetime: "08/07/2025 16:30:58", level: "INFO",     module: "Auth",     user: "kouassi.d",          action: "Connexion réussie",   ip: "192.168.1.22", details: "Application mobile v2.3.1" },
  { id: 20, datetime: "08/07/2025 09:00:00", level: "CRITICAL", module: "Finance",  user: "Système",            action: "Alerte contrats",     ip: "—",            details: "2 contrats fournisseurs expirent le 31/12/2025 — Renouvellement non initié" },
];

const LEVEL_CONFIG: Record<string, { badge: string; dot: string; icon: React.ReactNode }> = {
  INFO:     { badge: "bg-blue-100 text-blue-700",   dot: "bg-blue-500",   icon: <Info size={12} className="text-blue-500" /> },
  WARNING:  { badge: "bg-yellow-100 text-yellow-700", dot: "bg-yellow-500", icon: <AlertTriangle size={12} className="text-yellow-500" /> },
  ERROR:    { badge: "bg-red-100 text-red-700",     dot: "bg-red-500",    icon: <AlertTriangle size={12} className="text-red-600" /> },
  CRITICAL: { badge: "bg-red-200 text-red-800",    dot: "bg-red-700",    icon: <ShieldAlert size={12} className="text-red-700" /> },
};

const MODULE_STATS = [
  { module: "Dashboard",  req: 342, errors: 0,               avg: "145ms",   warn: false },
  { module: "Stocks",     req: 184, errors: 0,               avg: "98ms",    warn: false },
  { module: "Ventes",     req: 127, errors: "1 (résolu)",    avg: "112ms",   warn: false },
  { module: "Auth",       req: 89,  errors: 3,               avg: "67ms",    warn: false },
  { module: "API Météo",  req: 48,  errors: 0,               avg: "2 340ms", warn: true },
];

const LEVELS = ["Tous", "INFO", "WARNING", "ERROR", "CRITICAL"];
const MODULES = ["Tous", ...Array.from(new Set(LOG_DATA.map((l) => l.module)))];
const USERS = ["Tous", ...Array.from(new Set(LOG_DATA.map((l) => l.user)))];

const TOTAL_PAGES = 62;

export default function LogsPage() {
  const [levelFilter, setLevelFilter] = useState("Tous");
  const [moduleFilter, setModuleFilter] = useState("Tous");
  const [userFilter, setUserFilter] = useState("Tous");
  const [period, setPeriod] = useState("7j");
  const [page, setPage] = useState(1);

  const filtered = LOG_DATA.filter((l) => {
    if (levelFilter !== "Tous" && l.level !== levelFilter) return false;
    if (moduleFilter !== "Tous" && l.module !== moduleFilter) return false;
    if (userFilter !== "Tous" && l.user !== userFilter) return false;
    return true;
  });

  const kpis = [
    { label: "Événements aujourd'hui", value: "1 247", color: "text-gray-800",   bg: "bg-gray-100",   icon: <Activity size={18} className="text-gray-600" /> },
    { label: "Erreurs",                value: "3",     color: "text-red-700",    bg: "bg-red-100",    icon: <AlertTriangle size={18} className="text-red-600" /> },
    { label: "Avertissements",         value: "18",    color: "text-yellow-700", bg: "bg-yellow-100", icon: <AlertTriangle size={18} className="text-yellow-600" /> },
    { label: "Connexions",             value: "42",    color: "text-green-700",  bg: "bg-green-100",  icon: <Wifi size={18} className="text-green-600" /> },
  ];

  const visiblePages = [1, 2, 3, 4, 5];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Topbar title="Journaux Système" breadcrumb={["Administration", "Logs"]} />

      <main className="flex-1 p-6 space-y-5 max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-gray-500">Journal d&apos;audit complet — actions utilisateurs et événements système.</p>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#2E7D32] text-white text-sm font-medium hover:bg-[#256027] transition-colors">
            <Download size={15} />
            Exporter les logs
          </button>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {kpis.map((k) => (
            <div key={k.label} className="bg-white rounded-2xl border border-gray-100 p-4 flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full ${k.bg} flex items-center justify-center flex-shrink-0`}>
                {k.icon}
              </div>
              <div>
                <p className={`text-2xl font-bold ${k.color}`}>{k.value}</p>
                <p className="text-xs text-gray-500 font-medium leading-tight">{k.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4 flex flex-wrap gap-3 items-end">
          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-500 font-medium">Niveau</label>
            <select
              value={levelFilter}
              onChange={(e) => { setLevelFilter(e.target.value); setPage(1); }}
              className="text-sm border border-gray-200 rounded-xl px-3 py-2 bg-white text-gray-700 outline-none focus:ring-2 focus:ring-[#2E7D32]"
            >
              {LEVELS.map((l) => <option key={l}>{l}</option>)}
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-500 font-medium">Module</label>
            <select
              value={moduleFilter}
              onChange={(e) => { setModuleFilter(e.target.value); setPage(1); }}
              className="text-sm border border-gray-200 rounded-xl px-3 py-2 bg-white text-gray-700 outline-none focus:ring-2 focus:ring-[#2E7D32]"
            >
              {MODULES.map((m) => <option key={m}>{m}</option>)}
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-500 font-medium">Utilisateur</label>
            <select
              value={userFilter}
              onChange={(e) => { setUserFilter(e.target.value); setPage(1); }}
              className="text-sm border border-gray-200 rounded-xl px-3 py-2 bg-white text-gray-700 outline-none focus:ring-2 focus:ring-[#2E7D32]"
            >
              {USERS.map((u) => <option key={u}>{u}</option>)}
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-500 font-medium">Période</label>
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="text-sm border border-gray-200 rounded-xl px-3 py-2 bg-white text-gray-700 outline-none focus:ring-2 focus:ring-[#2E7D32]"
            >
              <option value="1j">Aujourd&apos;hui</option>
              <option value="7j">7 derniers jours</option>
              <option value="30j">30 derniers jours</option>
              <option value="all">Toute la période</option>
            </select>
          </div>
        </div>

        {/* Logs table */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#F8FBF8] border-b border-gray-100">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 whitespace-nowrap">Horodatage</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 whitespace-nowrap">Niveau</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 whitespace-nowrap">Module</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 whitespace-nowrap">Utilisateur</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 whitespace-nowrap">Action</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 whitespace-nowrap">IP</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Détails</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((log) => {
                  const cfg = LEVEL_CONFIG[log.level];
                  return (
                    <tr
                      key={log.id}
                      className={`hover:bg-gray-50 transition-colors ${log.level === "CRITICAL" ? "bg-red-50/40" : ""}`}
                    >
                      <td className="px-4 py-3 text-xs font-mono text-gray-500 whitespace-nowrap">{log.datetime}</td>
                      <td className="px-4 py-3">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap flex items-center gap-1 w-fit ${cfg.badge}`}>
                          {cfg.icon}
                          {log.level}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full whitespace-nowrap">
                          {log.module}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs font-medium text-gray-800 whitespace-nowrap">{log.user}</td>
                      <td className="px-4 py-3 text-xs text-gray-700 whitespace-nowrap">{log.action}</td>
                      <td className="px-4 py-3 text-[10px] font-mono text-gray-400 whitespace-nowrap">{log.ip}</td>
                      <td className="px-4 py-3 text-xs text-gray-500 max-w-xs truncate">{log.details}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
            <p className="text-xs text-gray-400">
              Affichage 1-{filtered.length} sur 1 247 entrées — Page {page} sur {TOTAL_PAGES}
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50"
              >
                <ChevronLeft size={14} />
              </button>
              {visiblePages.map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-7 h-7 rounded-lg text-xs font-medium transition-colors ${
                    page === p
                      ? "bg-[#2E7D32] text-white"
                      : "border border-gray-200 text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  {p}
                </button>
              ))}
              <span className="text-xs text-gray-400 px-1">...</span>
              <button
                onClick={() => setPage(TOTAL_PAGES)}
                className={`w-7 h-7 rounded-lg text-xs font-medium border border-gray-200 text-gray-500 hover:bg-gray-50 ${page === TOTAL_PAGES ? "bg-[#2E7D32] text-white border-[#2E7D32]" : ""}`}
              >
                {TOTAL_PAGES}
              </button>
              <button
                onClick={() => setPage((p) => Math.min(TOTAL_PAGES, p + 1))}
                className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Module stats */}
        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-gray-800">Statistiques par module</h2>
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#F8FBF8] border-b border-gray-100">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Module</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 whitespace-nowrap">Requêtes/j</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Erreurs</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 whitespace-nowrap">Temps moyen</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {MODULE_STATS.map((s) => (
                    <tr key={s.module} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-xs font-semibold text-gray-800">{s.module}</td>
                      <td className="px-4 py-3 text-xs text-gray-600">{s.req} req/j</td>
                      <td className="px-4 py-3 text-xs">
                        <span className={`px-2 py-0.5 rounded-full font-medium ${s.errors === 0 ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
                          {s.errors === 0 ? "0" : s.errors}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-600 font-mono">
                        {s.avg}
                        {s.warn && <span className="ml-1 text-yellow-600">⚠️</span>}
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
