"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Server, Cpu, HardDrive, Wifi, AlertTriangle, CheckCircle,
  RefreshCw, Clock, Activity, Database, Globe, Zap,
  TrendingUp, TrendingDown, MemoryStick, Shield, ArrowUpRight,
} from "lucide-react";

// ── Types ────────────────────────────────────────────────────────────
interface ServiceStatus {
  name: string;
  status: "up" | "down" | "degraded";
  latency: number;
  uptime: number;
  lastCheck: string;
}

interface MetricPoint { t: number; v: number }

// ── Mock data generators ──────────────────────────────────────────────
function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateHistory(base: number, variance: number, n = 30): MetricPoint[] {
  return Array.from({ length: n }, (_, i) => ({
    t: i,
    v: Math.max(0, Math.min(100, base + (Math.random() - 0.5) * variance * 2)),
  }));
}

const INITIAL_SERVICES: ServiceStatus[] = [
  { name: "API Next.js",        status: "up",       latency: 42,  uptime: 99.97, lastCheck: "il y a 10s" },
  { name: "Supabase DB",        status: "up",       latency: 18,  uptime: 99.99, lastCheck: "il y a 10s" },
  { name: "Auth Service",       status: "up",       latency: 23,  uptime: 99.95, lastCheck: "il y a 10s" },
  { name: "Storage (S3)",       status: "up",       latency: 87,  uptime: 99.90, lastCheck: "il y a 10s" },
  { name: "Groq AI",            status: "up",       latency: 310, uptime: 99.80, lastCheck: "il y a 10s" },
  { name: "Email (SMTP)",       status: "degraded", latency: 820, uptime: 98.50, lastCheck: "il y a 10s" },
  { name: "CDN / Assets",       status: "up",       latency: 12,  uptime: 99.99, lastCheck: "il y a 10s" },
  { name: "Webhook Listener",   status: "up",       latency: 55,  uptime: 99.92, lastCheck: "il y a 10s" },
];

const RECENT_ALERTS = [
  { id: 1, level: "warning",  ts: "14:23", msg: "SMTP latence élevée (820ms > seuil 500ms)" },
  { id: 2, level: "info",     ts: "13:51", msg: "Deploy réussi — commit 2976241 — PM2 restart OK" },
  { id: 3, level: "warning",  ts: "11:42", msg: "CPU pic à 87% pendant 2 min (worker batch)" },
  { id: 4, level: "success",  ts: "09:15", msg: "Certificat SSL renouvelé automatiquement" },
  { id: 5, level: "error",    ts: "Hier 22:08", msg: "Connexion Supabase timeout × 3 (résolu 22:11)" },
  { id: 6, level: "info",     ts: "Hier 18:00", msg: "Backup quotidien terminé — 2,4 GB archivé" },
];

// ── Sparkline SVG ─────────────────────────────────────────────────────
function Sparkline({ data, color, height = 40 }: { data: MetricPoint[]; color: string; height?: number }) {
  if (!data.length) return null;
  const w = 120;
  const h = height;
  const max = Math.max(...data.map((d) => d.v), 1);
  const pts = data.map((d, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - (d.v / max) * h;
    return `${x},${y}`;
  });
  const linePath = `M ${pts.join(" L ")}`;
  const areaPath = `M 0,${h} L ${pts.join(" L ")} L ${w},${h} Z`;
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="overflow-visible">
      <defs>
        <linearGradient id={`grad-${color.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill={`url(#grad-${color.replace("#", "")})`} />
      <path d={linePath} fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
      {/* Last point dot */}
      {pts.length > 0 && (() => {
        const last = data[data.length - 1];
        const x = w;
        const y = h - (last.v / max) * h;
        return <circle cx={x} cy={y} r="3" fill={color} />;
      })()}
    </svg>
  );
}

// ── Gauge arc SVG ────────────────────────────────────────────────────
function GaugeArc({ value, color, label }: { value: number; color: string; label: string }) {
  const r = 36;
  const cx = 50;
  const cy = 50;
  const circumference = Math.PI * r; // half circle
  const arc = (value / 100) * circumference;
  const bgStroke = "#1a2f1a";

  return (
    <div className="flex flex-col items-center gap-1">
      <svg width="100" height="58" viewBox="0 0 100 58">
        {/* Background arc */}
        <path
          d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
          fill="none" stroke={bgStroke} strokeWidth="8" strokeLinecap="round"
        />
        {/* Value arc */}
        <path
          d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
          fill="none" stroke={color} strokeWidth="8" strokeLinecap="round"
          strokeDasharray={`${arc} ${circumference}`}
        />
        <text x={cx} y={cy - 4} textAnchor="middle" fontSize="14" fontWeight="700" fill={color}>
          {value}%
        </text>
      </svg>
      <span className="text-[10px]" style={{ color: "#6a8a6a" }}>{label}</span>
    </div>
  );
}

// ── Status badge ─────────────────────────────────────────────────────
function StatusDot({ status }: { status: ServiceStatus["status"] }) {
  const cfg = {
    up:       { color: "#4CAF50", label: "Opérationnel" },
    down:     { color: "#f44336", label: "Hors ligne" },
    degraded: { color: "#FF9800", label: "Dégradé" },
  }[status];
  return (
    <span className="flex items-center gap-1.5">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: cfg.color }} />
        <span className="relative inline-flex h-2 w-2 rounded-full" style={{ backgroundColor: cfg.color }} />
      </span>
      <span className="text-xs" style={{ color: cfg.color }}>{cfg.label}</span>
    </span>
  );
}

// ── Alert row ────────────────────────────────────────────────────────
function AlertRow({ alert }: { alert: typeof RECENT_ALERTS[0] }) {
  const cfg = {
    error:   { color: "#f44336", bg: "rgba(244,67,54,0.1)",  icon: <AlertTriangle size={12} /> },
    warning: { color: "#FF9800", bg: "rgba(255,152,0,0.1)",  icon: <AlertTriangle size={12} /> },
    success: { color: "#4CAF50", bg: "rgba(76,175,80,0.1)",  icon: <CheckCircle size={12} /> },
    info:    { color: "#2196F3", bg: "rgba(33,150,243,0.1)", icon: <Activity size={12} /> },
  }[alert.level] ?? { color: "#6a8a6a", bg: "transparent", icon: null };

  return (
    <div className="flex items-start gap-3 py-2.5 border-b" style={{ borderColor: "#1a2f1a" }}>
      <span className="mt-0.5 flex items-center justify-center w-5 h-5 rounded-full flex-shrink-0" style={{ backgroundColor: cfg.bg, color: cfg.color }}>
        {cfg.icon}
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-xs" style={{ color: "#c8e6c9" }}>{alert.msg}</p>
        <p className="text-[10px] mt-0.5" style={{ color: "#4a6a4a" }}>{alert.ts}</p>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────
export default function MonitoringPage() {
  const [services, setServices]     = useState<ServiceStatus[]>(INITIAL_SERVICES);
  const [cpu,  setCpu]              = useState(rand(28, 52));
  const [ram,  setRam]              = useState(rand(55, 72));
  const [disk, setDisk]             = useState(68);
  const [rps,  setRps]              = useState(rand(40, 80));
  const [cpuH, setCpuH]             = useState<MetricPoint[]>(() => generateHistory(40, 20));
  const [ramH, setRamH]             = useState<MetricPoint[]>(() => generateHistory(65, 10));
  const [rpsH, setRpsH]             = useState<MetricPoint[]>(() => generateHistory(60, 30));
  const [lastRefresh, setLastRefresh] = useState<string>("à l'instant");
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [tab, setTab]               = useState<"services" | "alertes" | "infra">("services");

  const refresh = useCallback(() => {
    setCpu(rand(28, 75));
    setRam(rand(55, 78));
    setRps(rand(30, 120));
    setCpuH((h) => [...h.slice(1), { t: h.length, v: rand(28, 75) }]);
    setRamH((h) => [...h.slice(1), { t: h.length, v: rand(55, 78) }]);
    setRpsH((h) => [...h.slice(1), { t: h.length, v: rand(30, 120) }]);
    setLastRefresh("à l'instant");
  }, []);

  useEffect(() => {
    if (!autoRefresh) return;
    const id = setInterval(refresh, 10000);
    return () => clearInterval(id);
  }, [autoRefresh, refresh]);

  const allUp = services.every((s) => s.status === "up");
  const downCount = services.filter((s) => s.status === "down").length;
  const degradedCount = services.filter((s) => s.status === "degraded").length;

  // Global status banner
  const globalStatus = downCount > 0 ? "incident" : degradedCount > 0 ? "degraded" : "operational";
  const globalCfg = {
    operational: { color: "#4CAF50", bg: "rgba(76,175,80,0.12)", text: "Tous les systèmes opérationnels", icon: <CheckCircle size={16} /> },
    degraded:    { color: "#FF9800", bg: "rgba(255,152,0,0.12)",  text: `${degradedCount} service(s) dégradé(s)`, icon: <AlertTriangle size={16} /> },
    incident:    { color: "#f44336", bg: "rgba(244,67,54,0.12)",  text: `INCIDENT — ${downCount} service(s) hors ligne`, icon: <AlertTriangle size={16} /> },
  }[globalStatus];

  return (
    <div className="p-6 min-h-full" style={{ backgroundColor: "#0F1A0F" }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-black" style={{ color: "#c8e6c9" }}>Monitoring Serveur</h1>
          <p className="text-xs mt-0.5" style={{ color: "#4a6a4a" }}>
            Infrastructure AGRIFRIK — VPS 185.98.139.38 — Dernière mise à jour : {lastRefresh}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-xs cursor-pointer" style={{ color: "#6a8a6a" }}>
            <input
              type="checkbox"
              checked={autoRefresh}
              onChange={(e) => setAutoRefresh(e.target.checked)}
              className="accent-green-600"
            />
            Auto (10s)
          </label>
          <button
            onClick={refresh}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all"
            style={{ backgroundColor: "rgba(76,175,80,0.15)", color: "#4CAF50", border: "1px solid rgba(76,175,80,0.3)" }}
          >
            <RefreshCw size={13} /> Rafraîchir
          </button>
        </div>
      </div>

      {/* Global status banner */}
      <div className="flex items-center gap-3 px-4 py-3 rounded-2xl mb-6" style={{ backgroundColor: globalCfg.bg, border: `1px solid ${globalCfg.color}30` }}>
        <span style={{ color: globalCfg.color }}>{globalCfg.icon}</span>
        <span className="text-sm font-semibold" style={{ color: globalCfg.color }}>{globalCfg.text}</span>
        <span className="ml-auto text-xs" style={{ color: "#4a6a4a" }}>
          {services.filter((s) => s.status === "up").length}/{services.length} services en ligne
        </span>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Requêtes/s",   value: `${rps}`,    unit: "req/s", icon: <Zap size={16} />,      color: "#4CAF50", trend: rps > 60 ? "up" : "down", history: rpsH },
          { label: "CPU",          value: `${cpu}`,    unit: "%",     icon: <Cpu size={16} />,       color: cpu > 70 ? "#f44336" : "#4CAF50", trend: "neutral", history: cpuH },
          { label: "RAM utilisée", value: `${ram}`,    unit: "%",     icon: <MemoryStick size={16} />,color: ram > 80 ? "#FF9800" : "#4CAF50", trend: "neutral", history: ramH },
          { label: "Disque",       value: `${disk}`,   unit: "%",     icon: <HardDrive size={16} />, color: "#2196F3", trend: "neutral", history: [] },
        ].map((m) => (
          <div key={m.label} className="rounded-2xl p-4" style={{ backgroundColor: "#0D1A0D", border: "1px solid #1a2f1a" }}>
            <div className="flex items-center justify-between mb-2">
              <span style={{ color: m.color }}>{m.icon}</span>
              {m.history.length > 0 && <Sparkline data={m.history} color={m.color} height={28} />}
            </div>
            <p className="text-2xl font-black" style={{ color: "#c8e6c9" }}>
              {m.value}<span className="text-sm font-medium ml-1" style={{ color: "#6a8a6a" }}>{m.unit}</span>
            </p>
            <p className="text-xs mt-0.5" style={{ color: "#4a6a4a" }}>{m.label}</p>
          </div>
        ))}
      </div>

      {/* Gauge row */}
      <div className="rounded-2xl p-5 mb-6" style={{ backgroundColor: "#0D1A0D", border: "1px solid #1a2f1a" }}>
        <h2 className="text-sm font-semibold mb-4" style={{ color: "#c8e6c9" }}>Ressources système</h2>
        <div className="flex items-center justify-around">
          <GaugeArc value={cpu}  color={cpu > 70 ? "#f44336" : "#4CAF50"} label="CPU" />
          <GaugeArc value={ram}  color={ram > 80 ? "#FF9800" : "#4CAF50"} label="RAM" />
          <GaugeArc value={disk} color="#2196F3" label="Disque" />
          <div className="text-center">
            <p className="text-2xl font-black" style={{ color: "#4CAF50" }}>99.96%</p>
            <p className="text-[10px] mt-1" style={{ color: "#6a8a6a" }}>Uptime 30j</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-black" style={{ color: "#c8e6c9" }}>42ms</p>
            <p className="text-[10px] mt-1" style={{ color: "#6a8a6a" }}>Latence API</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-black" style={{ color: "#c8e6c9" }}>2</p>
            <p className="text-[10px] mt-1" style={{ color: "#6a8a6a" }}>Workers PM2</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-4">
        {(["services", "alertes", "infra"] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className="px-4 py-2 rounded-xl text-xs font-semibold transition-all capitalize"
            style={{
              backgroundColor: tab === t ? "rgba(76,175,80,0.15)" : "transparent",
              color: tab === t ? "#4CAF50" : "#6a8a6a",
              border: tab === t ? "1px solid rgba(76,175,80,0.3)" : "1px solid transparent",
            }}>
            {t === "services" ? "Services" : t === "alertes" ? "Alertes récentes" : "Infrastructure"}
          </button>
        ))}
      </div>

      {/* Tab: Services */}
      {tab === "services" && (
        <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: "#0D1A0D", border: "1px solid #1a2f1a" }}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ backgroundColor: "#0A1A0A" }}>
                  {["Service", "Statut", "Latence", "Uptime 30j", "Dernière vérif."].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-[10px] font-semibold uppercase tracking-wider" style={{ color: "#4a6a4a" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {services.map((s) => (
                  <tr key={s.name} className="border-t" style={{ borderColor: "#1a2f1a" }}>
                    <td className="px-4 py-3">
                      <span className="text-sm font-medium" style={{ color: "#c8e6c9" }}>{s.name}</span>
                    </td>
                    <td className="px-4 py-3"><StatusDot status={s.status} /></td>
                    <td className="px-4 py-3">
                      <span className="text-sm" style={{ color: s.latency > 500 ? "#FF9800" : "#6a8a6a" }}>
                        {s.latency} ms
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: "#1a2f1a" }}>
                          <div className="h-full rounded-full" style={{ width: `${s.uptime}%`, backgroundColor: s.uptime > 99 ? "#4CAF50" : "#FF9800" }} />
                        </div>
                        <span className="text-xs font-mono" style={{ color: "#6a8a6a" }}>{s.uptime}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs" style={{ color: "#4a6a4a" }}>{s.lastCheck}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab: Alertes */}
      {tab === "alertes" && (
        <div className="rounded-2xl p-5" style={{ backgroundColor: "#0D1A0D", border: "1px solid #1a2f1a" }}>
          <div className="divide-y" style={{ borderColor: "#1a2f1a" }}>
            {RECENT_ALERTS.map((a) => <AlertRow key={a.id} alert={a} />)}
          </div>
        </div>
      )}

      {/* Tab: Infra */}
      {tab === "infra" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              title: "Serveur VPS",
              icon: <Server size={16} />,
              rows: [
                ["IP",           "185.98.139.38"],
                ["OS",           "Ubuntu 22.04 LTS"],
                ["CPU",          "4 vCPU (AMD EPYC)"],
                ["RAM",          "8 Go DDR4"],
                ["Disque",       "160 Go NVMe SSD"],
                ["Localisation", "Frankfurt, DE"],
                ["Provider",     "Hetzner Cloud"],
              ],
            },
            {
              title: "Process Manager (PM2)",
              icon: <Activity size={16} />,
              rows: [
                ["ERP (ID:2)",        "Online — 99.97% uptime"],
                ["Landing (ID:6)",    "Online — 99.95% uptime"],
                ["Node version",      "v20.x LTS"],
                ["Dernier restart",   "il y a 3j 14h"],
                ["Mémoire ERP",       `${rand(180, 260)} MB`],
                ["Mémoire Landing",   `${rand(80, 120)} MB`],
              ],
            },
            {
              title: "Base de données",
              icon: <Database size={16} />,
              rows: [
                ["Provider",          "Supabase (PostgreSQL 15)"],
                ["Connexions actives", `${rand(8, 24)}/100`],
                ["Taille DB",         "1.4 GB"],
                ["Backups",           "Quotidiens (J+7)"],
                ["Latence moy.",      "18 ms"],
                ["Région",            "eu-west-1"],
              ],
            },
            {
              title: "Réseau & Sécurité",
              icon: <Shield size={16} />,
              rows: [
                ["SSL/TLS",           "Valide — Let's Encrypt"],
                ["Expire le",         "2025-09-15"],
                ["Firewall",          "UFW actif"],
                ["Fail2ban",          "Actif — 3 IPs bannies"],
                ["Bande passante",    `${rand(80, 200)} MB/j`],
                ["DDoS protection",   "Hetzner Cloud Shield"],
              ],
            },
          ].map((card) => (
            <div key={card.title} className="rounded-2xl p-5" style={{ backgroundColor: "#0D1A0D", border: "1px solid #1a2f1a" }}>
              <div className="flex items-center gap-2 mb-4">
                <span style={{ color: "#4CAF50" }}>{card.icon}</span>
                <h3 className="text-sm font-semibold" style={{ color: "#c8e6c9" }}>{card.title}</h3>
              </div>
              <table className="w-full">
                <tbody>
                  {card.rows.map(([k, v]) => (
                    <tr key={k} className="border-t" style={{ borderColor: "#1a2f1a" }}>
                      <td className="py-2 pr-4 text-xs" style={{ color: "#4a6a4a" }}>{k}</td>
                      <td className="py-2 text-xs font-medium" style={{ color: "#c8e6c9" }}>{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
