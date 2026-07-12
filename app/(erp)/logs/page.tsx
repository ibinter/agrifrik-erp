"use client";

import { useState } from "react";
import Topbar from "../../components/Topbar";

// â”€â”€â”€ Types â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
type ActionType = "MESSAGE_SENT" | "DATA_REFRESH" | "LOGIN" | "LOGIN_FAILED" | "ALERT_TRIGGERED" | "RECORD_CREATED" | "ORDER_CREATED" | "TASK_UPDATED" | "RECORD_UPDATED" | "AUTO_RECONCILED" | "ALERT_RESOLVED" | "ALERT_REFRESHED" | "REPORT_SUBMITTED" | "PHOTO_UPLOADED" | "REPORT_SENT" | "EXPORT_DONE" | "STOCK_MOVEMENT" | "CQ_VALIDATED";

interface LogEntry {
  date: string;
  user: string;
  module: string;
  action: ActionType;
  objet: string;
  ip: string;
  flagged?: boolean;
}

// â”€â”€â”€ DonnÃ©es logs â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const LOGS: LogEntry[] = [
  { date: "11/07 09h14", user: "Ibrahim S.", module: "Messagerie", action: "MESSAGE_SENT", objet: "Ã‰quipe EXP-001", ip: "154.0.x.x" },
  { date: "11/07 08h47", user: "SystÃ¨me", module: "MÃ©tÃ©o", action: "DATA_REFRESH", objet: "AWS-EXP001 (auto)", ip: "Serveur" },
  { date: "11/07 08h32", user: "Koffi Amani", module: "Auth", action: "LOGIN", objet: "admin@agrifrik.com", ip: "102.176.x.x" },
  { date: "11/07 08h15", user: "Koffi Amani", module: "Messagerie", action: "MESSAGE_SENT", objet: "Ã‰quipe EXP-001", ip: "102.176.x.x" },
  { date: "11/07 07h00", user: "Ibrahim S.", module: "Auth", action: "LOGIN", objet: "ibrahim.s@agrifrik.com", ip: "154.0.x.x" },
  { date: "11/07 06h00", user: "SystÃ¨me", module: "Alertes", action: "ALERT_TRIGGERED", objet: "Cut test LOT-047", ip: "Serveur" },
  { date: "11/07 06h00", user: "SystÃ¨me", module: "Alertes", action: "ALERT_TRIGGERED", objet: "Stock KCl critique", ip: "Serveur" },
  { date: "10/07 21h47", user: "Inconnu", module: "Auth", action: "LOGIN_FAILED", objet: "â€”", ip: "45.32.x.x", flagged: true },
  { date: "10/07 16h48", user: "Adjoua M.", module: "Auth", action: "LOGIN", objet: "adjoua.m@agrifrik.com", ip: "102.176.x.x" },
  { date: "10/07 16h22", user: "Adjoua M.", module: "TrÃ©sorerie", action: "RECORD_CREATED", objet: "MVT-2025-0921", ip: "102.176.x.x" },
  { date: "10/07 16h18", user: "Adjoua M.", module: "ComptabilitÃ©", action: "RECORD_CREATED", objet: "JNL-2025-0921", ip: "102.176.x.x" },
  { date: "10/07 14h30", user: "Koffi Amani", module: "Achats", action: "ORDER_CREATED", objet: "ACH-2025-024 KCl", ip: "102.176.x.x" },
  { date: "10/07 11h22", user: "Ibrahim S.", module: "Planning", action: "TASK_UPDATED", objet: "PCT-2025-034 â†’ PlanifiÃ©", ip: "154.0.x.x" },
  { date: "09/07 15h14", user: "Koffi Amani", module: "Devis", action: "RECORD_CREATED", objet: "DEV-2025-003 OLAM", ip: "102.176.x.x" },
  { date: "08/07 14h23", user: "SystÃ¨me", module: "TrÃ©sorerie", action: "AUTO_RECONCILED", objet: "MVT-2025-0921", ip: "Serveur" },
  { date: "08/07 08h00", user: "Koffi Amani", module: "Stocks", action: "ALERT_RESOLVED", objet: "Super Cupravit livrÃ©", ip: "102.176.x.x" },
  { date: "08/07 08h00", user: "SystÃ¨me", module: "Alertes", action: "ALERT_REFRESHED", objet: "7 alertes vÃ©rifiÃ©es", ip: "Serveur" },
  { date: "07/07 10h30", user: "Ibrahim S.", module: "Rapports", action: "REPORT_SUBMITTED", objet: "RT-2025-028", ip: "154.0.x.x" },
  { date: "07/07 07h00", user: "Ibrahim S.", module: "Auth", action: "LOGIN", objet: "ibrahim.s@agrifrik.com", ip: "154.0.x.x" },
  { date: "07/07 06h58", user: "Ibrahim S.", module: "Terrain", action: "PHOTO_UPLOADED", objet: "14 photos PAR-A1/A2/B1", ip: "154.0.x.x" },
  { date: "05/07 18h01", user: "SystÃ¨me", module: "Rapports", action: "REPORT_SENT", objet: "Rapport CA hebdo", ip: "Serveur" },
  { date: "04/07 09h22", user: "Koffi Amani", module: "Ventes", action: "RECORD_UPDATED", objet: "VNT-2025-008 â†’ RÃ©glÃ©e", ip: "102.176.x.x" },
  { date: "03/07 15h44", user: "Adjoua M.", module: "Finance", action: "EXPORT_DONE", objet: "Grand livre BC Q2 2025", ip: "102.176.x.x" },
  { date: "02/07 08h12", user: "Ibrahim S.", module: "Stocks", action: "STOCK_MOVEMENT", objet: "Super Cupravit -1,8 kg", ip: "154.0.x.x" },
  { date: "01/07 14h18", user: "Ibrahim S.", module: "QualitÃ©", action: "CQ_VALIDATED", objet: "CQ-2025-046 Grade AA âœ…", ip: "154.0.x.x" },
];

// â”€â”€â”€ SVG Bar chart horizontal â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function BarChartModules() {
  const data = [
    { module: "Finance", value: 428 },
    { module: "Logistique", value: 312 },
    { module: "Production", value: 287 },
    { module: "Commerce", value: 214 },
    { module: "Rapports", value: 198 },
    { module: "QualitÃ©", value: 176 },
    { module: "RH", value: 142 },
    { module: "Auth", value: 98 },
    { module: "Admin", value: 64 },
    { module: "IA", value: 48 },
  ];
  const W = 640, H = 260;
  const padL = 90, padR = 60, padT = 20, padB = 20;
  const rowH = (H - padT - padB) / data.length;
  const barH = rowH * 0.55;
  const maxVal = 450;
  const availW = W - padL - padR;

  return (
    <div className="overflow-x-auto">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-[640px]">
        {/* Grid lignes */}
        {[0, 100, 200, 300, 400].map((v) => {
          const x = padL + (v / maxVal) * availW;
          return (
            <g key={v}>
              <line x1={x} x2={x} y1={padT} y2={H - padB} stroke="#e5e7eb" strokeWidth="0.5" />
              <text x={x} y={H - padB + 12} textAnchor="middle" fontSize="9" fill="#9ca3af">{v}</text>
            </g>
          );
        })}
        {data.map((d, i) => {
          const y = padT + i * rowH + (rowH - barH) / 2;
          const bw = (d.value / maxVal) * availW;
          return (
            <g key={d.module}>
              <text x={padL - 6} y={y + barH / 2 + 4} textAnchor="end" fontSize="10" fill="#374151">{d.module}</text>
              <rect x={padL} y={y} width={bw} height={barH} fill="#2E7D32" rx="3" opacity="0.85" />
              <text x={padL + bw + 5} y={y + barH / 2 + 4} fontSize="10" fill="#374151" fontWeight="600">{d.value}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// â”€â”€â”€ SVG Donut utilisateurs â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function DonutUsers() {
  const W = 260, H = 260;
  const cx = 130, cy = 120, r = 90, strokeW = 36;

  const data = [
    { label: "Koffi Amani", pct: 42, color: "#2E7D32" },
    { label: "Adjoua Messou", pct: 28, color: "#4CAF50" },
    { label: "Ibrahim Sawadogo", pct: 24, color: "#E65100" },
    { label: "SystÃ¨me (auto)", pct: 4, color: "#9ca3af" },
    { label: "Autres", pct: 2, color: "#d1d5db" },
  ];

  const circumference = 2 * Math.PI * r;
  let cumul = 0;

  return (
    <div className="overflow-x-auto flex flex-col items-center">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-[260px] h-[260px]">
        {data.map((d, i) => {
          const offset = circumference * (1 - cumul / 100);
          const dash = circumference * (d.pct / 100);
          cumul += d.pct;
          return (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              stroke={d.color}
              strokeWidth={strokeW}
              strokeDasharray={`${dash} ${circumference - dash}`}
              strokeDashoffset={offset}
              transform={`rotate(-90 ${cx} ${cy})`}
            />
          );
        })}
        <text x={cx} y={cy - 6} textAnchor="middle" fontSize="22" fontWeight="700" fill="#1f2937">2 847</text>
        <text x={cx} y={cy + 12} textAnchor="middle" fontSize="10" fill="#6b7280">actions / mois</text>
      </svg>
      {/* LÃ©gende */}
      <div className="flex flex-col gap-1 w-full px-4">
        {data.map((d) => (
          <div key={d.label} className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: d.color }} />
              <span className="text-gray-700">{d.label}</span>
            </div>
            <span className="font-semibold text-gray-800">{d.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// â”€â”€â”€ Badge action â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function ActionBadge({ action, flagged }: { action: ActionType; flagged?: boolean }) {
  if (flagged || action === "LOGIN_FAILED") {
    return <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-red-100 text-red-700">ðŸ”´ {action}</span>;
  }
  if (action.includes("CREATED") || action.includes("SUBMITTED") || action.includes("UPLOADED") || action === "CQ_VALIDATED") {
    return <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-green-100 text-green-700">{action}</span>;
  }
  if (action.includes("UPDATED") || action.includes("RESOLVED") || action.includes("RECONCILED") || action === "TASK_UPDATED") {
    return <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-blue-100 text-blue-700">{action}</span>;
  }
  if (action === "LOGIN") {
    return <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-purple-100 text-purple-700">{action}</span>;
  }
  return <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-gray-100 text-gray-600">{action}</span>;
}

// â”€â”€â”€ Filtres actifs â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
type FilterType = "Tous" | "CrÃ©ations" | "Modifications" | "Suppressions" | "Connexions";
const FILTERS: FilterType[] = ["Tous", "CrÃ©ations", "Modifications", "Suppressions", "Connexions"];

function matchFilter(log: LogEntry, filter: FilterType): boolean {
  if (filter === "Tous") return true;
  if (filter === "CrÃ©ations") return log.action.includes("CREATED") || log.action.includes("SUBMITTED") || log.action.includes("UPLOADED") || log.action === "ORDER_CREATED";
  if (filter === "Modifications") return log.action.includes("UPDATED") || log.action.includes("RESOLVED") || log.action.includes("RECONCILED") || log.action === "TASK_UPDATED" || log.action === "STOCK_MOVEMENT";
  if (filter === "Suppressions") return false;
  if (filter === "Connexions") return log.action === "LOGIN" || log.action === "LOGIN_FAILED";
  return true;
}

// â”€â”€â”€ Page â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export default function LogsPage() {
  const [filter, setFilter] = useState<FilterType>("Tous");
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(25);

  const filtered = LOGS.filter((l) => {
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      l.user.toLowerCase().includes(q) ||
      l.module.toLowerCase().includes(q) ||
      l.action.toLowerCase().includes(q) ||
      l.objet.toLowerCase().includes(q);
    return matchSearch && matchFilter(l, filter);
  });

  const visible = filtered.slice(0, visibleCount);

  return (
    <div className="min-h-screen bg-gray-50">
      <Topbar breadcrumb={["Admin", "Journal des Actions"]} />

      <div className="p-6 max-w-7xl mx-auto space-y-5">
        {/* En-tÃªte */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-xl font-bold text-gray-800">Journal des Actions</h1>
              <p className="text-sm text-gray-500 mt-0.5">Audit trail complet â€” TraÃ§abilitÃ© de toutes les opÃ©rations AGRIFRIK</p>
            </div>
            <button className="bg-[#2E7D32] text-white rounded-xl text-xs font-medium px-4 py-2 hover:bg-[#1B5E20] transition-colors">
              TÃ©lÃ©charger CSV
            </button>
          </div>

          {/* KPI */}
          <div className="grid grid-cols-4 gap-3 mt-4">
            {[
              { label: "Actions ce mois", value: "2 847", color: "text-[#2E7D32]" },
              { label: "Utilisateurs actifs", value: "5", color: "text-blue-700" },
              { label: "Erreurs", value: "0", color: "text-green-600" },
              { label: "Uptime", value: "99,97%", color: "text-purple-700" },
            ].map((kpi) => (
              <div key={kpi.label} className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 text-center">
                <p className={`text-2xl font-bold ${kpi.color}`}>{kpi.value}</p>
                <p className="text-[11px] text-gray-500 font-medium mt-0.5">{kpi.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Filtres */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex gap-1 bg-white border border-gray-100 rounded-2xl p-1">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                  filter === f
                    ? "bg-[#2E7D32] text-white shadow"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <input
            type="text"
            placeholder="Filtrer par utilisateur, module ou action..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#2E7D32] w-72 bg-white"
          />
          <span className="text-xs text-gray-500">{filtered.length} entrÃ©e{filtered.length > 1 ? "s" : ""}</span>
        </div>

        {/* Tableau des logs */}
        <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-[#F8FBF8]">
                  {["Heure", "Utilisateur", "Module", "Action", "Objet", "IP"].map((h) => (
                    <th key={h} className="px-3 py-2.5 text-left text-[11px] font-semibold text-gray-600 whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {visible.map((log, i) => (
                  <tr
                    key={i}
                    className={`border-t border-gray-50 hover:bg-gray-50/80 transition-colors ${
                      log.flagged ? "bg-red-50/50" : i % 2 === 0 ? "bg-white" : "bg-gray-50/30"
                    }`}
                  >
                    <td className="px-3 py-2.5 text-gray-500 whitespace-nowrap font-mono text-[11px]">{log.date}</td>
                    <td className="px-3 py-2.5 font-semibold text-gray-800 whitespace-nowrap">{log.user}</td>
                    <td className="px-3 py-2.5">
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-gray-100 text-gray-600 whitespace-nowrap">
                        {log.module}
                      </span>
                    </td>
                    <td className="px-3 py-2.5 whitespace-nowrap">
                      <ActionBadge action={log.action} flagged={log.flagged} />
                    </td>
                    <td className="px-3 py-2.5 text-gray-700 max-w-[200px] truncate">{log.objet}</td>
                    <td className="px-3 py-2.5 text-gray-500 font-mono text-[11px] whitespace-nowrap">
                      {log.flagged ? (
                        <span className="text-red-600 font-semibold">{log.ip} ðŸ”´</span>
                      ) : (
                        log.ip
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Charger plus */}
          {visibleCount < filtered.length && (
            <div className="p-4 border-t border-gray-100 text-center">
              <button
                onClick={() => setVisibleCount((c) => c + 25)}
                className="border border-gray-200 text-gray-600 rounded-xl text-xs font-medium px-6 py-2 hover:bg-gray-50 transition-colors"
              >
                Charger 25 suivantes ({filtered.length - visibleCount} restantes)
              </button>
            </div>
          )}
        </div>

        {/* Statistiques d'usage */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Bar chart modules */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5">
            <h2 className="text-sm font-semibold text-gray-800 mb-1">Actions par module</h2>
            <p className="text-[11px] text-gray-400 mb-4">30 derniers jours</p>
            <BarChartModules />
          </div>

          {/* Donut utilisateurs */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5">
            <h2 className="text-sm font-semibold text-gray-800 mb-1">ActivitÃ© par utilisateur</h2>
            <p className="text-[11px] text-gray-400 mb-4">30 derniers jours</p>
            <DonutUsers />
          </div>
        </div>
      </div>
    </div>
  );
}

