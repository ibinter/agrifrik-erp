"use client";

import Link from "next/link";
import Topbar from "../../components/Topbar";
import {
  TrendingUp, TrendingDown, Leaf, DollarSign, Users,
  AlertTriangle, Package, CheckCircle, Clock, Calendar,
  CloudRain, Sun, Wind, Minus,
} from "lucide-react";

/* ─── KPI DATA ───────────────────────────────────────────── */
const kpis = [
  {
    label: "CA YTD",
    value: "145,2 M XOF",
    change: "+18,4%",
    up: true,
    icon: TrendingUp,
    iconColor: "#2E7D32",
    iconBg: "#E8F5E9",
    href: "/ventes",
    sub: "vs N-1",
  },
  {
    label: "Production S1",
    value: "87,4 t",
    change: "+12,1%",
    up: true,
    icon: Leaf,
    iconColor: "#1565C0",
    iconBg: "#E3F2FD",
    href: "/cultures",
    sub: "vs S1 2024",
  },
  {
    label: "Trésorerie",
    value: "34,2 M XOF",
    change: "✅ Solde sain",
    up: null,
    icon: DollarSign,
    iconColor: "#00695C",
    iconBg: "#E0F2F1",
    href: "/tresorerie",
    sub: "Disponible",
  },
  {
    label: "Employés",
    value: "287",
    change: "+12 ce mois",
    up: true,
    icon: Users,
    iconColor: "#6A1B9A",
    iconBg: "#F3E5F5",
    href: "/rh",
    sub: "Actifs",
  },
  {
    label: "Alertes actives",
    value: "11",
    change: "🔴 3 critiques",
    up: false,
    icon: AlertTriangle,
    iconColor: "#C62828",
    iconBg: "#FFEBEE",
    href: "/alertes",
    sub: "Non résolues",
  },
];

/* ─── ACTIVITY FEED ──────────────────────────────────────── */
const activities = [
  { icon: "✅", color: "#2E7D32", bg: "#E8F5E9", date: "09/07 09:47", text: "Ibrahim S. s'est connecté" },
  { icon: "📦", color: "#1565C0", bg: "#E3F2FD", date: "09/07 09:45", text: "Entrée stock : 240 kg Cacao Grade A (LOT-048)" },
  { icon: "📋", color: "#6A1B9A", bg: "#F3E5F5", date: "09/07 09:15", text: "Nouveau devis DEV-2025-089 (Barry Callebaut, 12,4 M XOF)" },
  { icon: "⚠️", color: "#E65100", bg: "#FFF3E0", date: "08/07 14:18", text: "Non-conformité LOT-032 Anacarde détectée (humidité 12,4%)" },
  { icon: "💰", color: "#1B5E20", bg: "#E8F5E9", date: "08/07 17:22", text: "Facture FAC-2025-041 éditée (12,44 M XOF)" },
  { icon: "👥", color: "#4527A0", bg: "#EDE7F6", date: "07/07 16:05", text: "287 bulletins de paie Juillet 2025 générés" },
  { icon: "📍", color: "#00695C", bg: "#E0F2F1", date: "07/07 14:30", text: "Rapport terrain RT-047 validé (PAR-A1)" },
  { icon: "🔴", color: "#C62828", bg: "#FFEBEE", date: "07/07 08:42", text: "Alerte : KCl engrais sous seuil critique (45 kg)" },
  { icon: "✅", color: "#2E7D32", bg: "#E8F5E9", date: "06/07 11:00", text: "Audit BPA réalisé — Score : 91/100" },
  { icon: "📊", color: "#1565C0", bg: "#E3F2FD", date: "05/07 16:30", text: "Rapport bailleur FAO S1 2025 généré" },
];

/* ─── BUDGET DATA ────────────────────────────────────────── */
const budgetItems = [
  { label: "CA", actual: 145.2, budget: 140, unit: "M XOF", pct: 103, ok: true },
  { label: "Charges", actual: 98.4, budget: 105, unit: "M XOF", pct: 93.7, ok: true },
  { label: "Résultat", actual: 22.8, budget: 18, unit: "M XOF", pct: 126.7, ok: true },
];

/* ─── STOCK CRITIQUE ─────────────────────────────────────── */
const stockCritique = [
  { name: "KCl engrais", qty: 45, max: 200, unit: "kg", level: "red" as const },
  { name: "Furadan 5G", qty: 0, max: 200, unit: "kg", level: "red" as const },
  { name: "Cypermethrine", qty: 18, max: 20, unit: "L", level: "yellow" as const },
];

/* ─── TOP CULTURES ───────────────────────────────────────── */
const topCultures = [
  { culture: "Cacao Grade A", volume: "52,4 t", ca: "57,6", marge: "42%" },
  { culture: "Anacarde WW240", volume: "18,6 t", ca: "31,6", marge: "38%" },
  { culture: "Cacao Grade B", volume: "12,8 t", ca: "12,2", marge: "28%" },
];

/* ─── AGENDA ─────────────────────────────────────────────── */
const agenda = [
  { date: "10/07", label: "Taille d'entretien PAR-A1", who: "Ibrahim S." },
  { date: "12/07", label: "Livraison 240 kg cacao → Soubré", who: "Logistique" },
  { date: "14/07", label: "Sarclage PAR-D2 (adventices)", who: "Équipe terrain" },
  { date: "15/07", label: "Réunion coopérative mensuelle", who: "Direction" },
  { date: "20/07", label: "Épandage K sur PAR-A3", who: "Équipe agro" },
];

/* ─── SVG GROUPED BAR CHART ──────────────────────────────── */
const months = ["Jan","Fév","Mar","Avr","Mai","Jun","Jul","Aoû","Sep","Oct","Nov","Déc"];
const data2025 = [8.2,9.4,12.1,14.8,16.2,14.5,12.4,8.2,10.1,18.4,22.1,19.8];
const data2024 = [6.8,7.2,10.4,11.2,13.8,12.6,11.2,7.4,9.8,16.2,19.4,17.8];
const isForecast = [false,false,false,false,false,false,true,true,true,true,true,true];

function GroupedBarChart() {
  const W = 900, H = 220;
  const padL = 36, padR = 16, padT = 24, padB = 36;
  const chartW = W - padL - padR;
  const chartH = H - padT - padB;
  const maxVal = 25;
  const groupW = chartW / 12;
  const bw = groupW * 0.34;
  const gap = groupW * 0.04;
  const yTicks = [0, 5, 10, 15, 20, 25];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: 220 }}>
      {/* Y grid */}
      {yTicks.map((t) => {
        const y = padT + chartH - (t / maxVal) * chartH;
        return (
          <g key={t}>
            <line x1={padL} x2={W - padR} y1={y} y2={y} stroke="#F3F4F6" strokeWidth={1} />
            <text x={padL - 4} y={y + 3.5} textAnchor="end" fontSize={8} fill="#9CA3AF">{t}</text>
          </g>
        );
      })}
      {/* Bars */}
      {months.map((m, i) => {
        const gx = padL + i * groupW;
        const v25 = data2025[i];
        const v24 = data2024[i];
        const h25 = (v25 / maxVal) * chartH;
        const h24 = (v24 / maxVal) * chartH;
        const x25 = gx + gap;
        const x24 = x25 + bw + gap * 0.5;
        const forecast = isForecast[i];
        return (
          <g key={m}>
            {/* 2025 bar */}
            <rect
              x={x25} y={padT + chartH - h25} width={bw} height={h25} rx={2}
              fill={forecast ? "none" : "#2E7D32"}
              stroke={forecast ? "#2E7D32" : "none"}
              strokeWidth={forecast ? 1.5 : 0}
              strokeDasharray={forecast ? "3 2" : "none"}
              opacity={0.85}
            />
            {/* 2024 bar */}
            <rect
              x={x24} y={padT + chartH - h24} width={bw} height={h24} rx={2}
              fill="#A5D6A7" opacity={0.9}
            />
            {/* Month label */}
            <text x={gx + groupW / 2} y={H - padB + 12} textAnchor="middle" fontSize={8} fill="#9CA3AF">{m}</text>
          </g>
        );
      })}
      {/* Legend */}
      <rect x={padL} y={4} width={10} height={8} rx={2} fill="#2E7D32" />
      <text x={padL + 13} y={11} fontSize={8} fill="#6B7280">2025</text>
      <rect x={padL + 50} y={4} width={10} height={8} rx={2} fill="#A5D6A7" />
      <text x={padL + 63} y={11} fontSize={8} fill="#6B7280">2024</text>
      <rect x={padL + 100} y={4} width={10} height={8} rx={2} fill="none" stroke="#2E7D32" strokeWidth={1.5} strokeDasharray="3 2" />
      <text x={padL + 113} y={11} fontSize={8} fill="#6B7280">Prévisions</text>
    </svg>
  );
}

/* ─── PROGRESS BAR ───────────────────────────────────────── */
function ProgressBar({ pct, color }: { pct: number; color: string }) {
  const w = Math.min(pct, 100);
  return (
    <div className="w-full bg-gray-100 rounded-full h-1.5 mt-1">
      <div className="h-1.5 rounded-full transition-all" style={{ width: `${w}%`, backgroundColor: color }} />
    </div>
  );
}

/* ─── PAGE ───────────────────────────────────────────────── */
export default function DashboardPage() {
  return (
    <div>
      <Topbar title="Tableau de Bord" />

      <div className="p-6 space-y-5">

        {/* ── 1. BANDEAU BIENVENUE ─────────────────────────── */}
        <div
          className="rounded-2xl p-5"
          style={{ background: "linear-gradient(135deg,#1B5E20 0%,#2E7D32 60%,#388E3C 100%)" }}
        >
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
            <div>
              <h1 className="text-white text-xl font-bold mb-1">
                Bonjour, Admin 👋
              </h1>
              <p className="text-green-200 text-sm mb-2">
                Vendredi 11 juillet 2025 &nbsp;|&nbsp; Campagne cacao 2024-2025 en cours
              </p>
              {/* Cours du marché */}
              <div className="flex flex-wrap gap-3 mb-3">
                <span className="inline-flex items-center gap-1.5 bg-white/15 text-white text-xs px-3 py-1.5 rounded-lg">
                  <TrendingUp size={12} className="text-green-300" />
                  Cacao BCC&nbsp;: <strong className="ml-0.5">1 087 XOF/kg</strong>
                  <span className="text-green-300 font-medium">↑ +3,2%</span>
                </span>
                <span className="inline-flex items-center gap-1.5 bg-white/15 text-white text-xs px-3 py-1.5 rounded-lg">
                  <Minus size={12} className="text-yellow-300" />
                  Anacarde&nbsp;: <strong className="ml-0.5">680 XOF/kg</strong>
                  <span className="text-yellow-300 font-medium">→ stable</span>
                </span>
              </div>
              {/* Alerte météo */}
              <div className="inline-flex items-center gap-2 bg-yellow-400/20 border border-yellow-300/30 text-yellow-100 text-xs px-3 py-1.5 rounded-lg">
                🟡 <strong>Alerte météo :</strong>&nbsp;Pluies modérées prévues 12-13/07 (60-80mm) — Sécuriser séchoirs
              </div>
            </div>
          </div>
        </div>

        {/* ── 2. KPI CARDS ─────────────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {kpis.map((k) => {
            const Icon = k.icon;
            return (
              <Link
                key={k.label}
                href={k.href}
                className="rounded-2xl border border-gray-100 bg-white p-5 hover:shadow-md hover:-translate-y-0.5 transition-all group cursor-pointer"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: k.iconBg }}>
                    <Icon size={17} color={k.iconColor} strokeWidth={1.8} />
                  </div>
                </div>
                <div className="text-lg font-bold text-gray-900 leading-tight">{k.value}</div>
                <div className="text-xs text-gray-400 mt-0.5">{k.sub}</div>
                <div className={`text-xs mt-1.5 font-medium flex items-center gap-1 ${k.up === true ? "text-green-600" : k.up === false ? "text-red-500" : "text-amber-600"}`}>
                  {k.up === true && <TrendingUp size={10} />}
                  {k.up === false && <TrendingDown size={10} />}
                  {k.change}
                </div>
                <div className="text-xs text-gray-500 mt-0.5 font-medium group-hover:text-green-700 transition-colors">{k.label} →</div>
              </Link>
            );
          })}
        </div>

        {/* ── 3. ACTIVITÉ + INDICATEURS CLÉS ──────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

          {/* Activité récente */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5">
            <h2 className="font-semibold text-gray-900 text-sm mb-4">Activité récente</h2>
            <div className="space-y-2.5">
              {activities.map((a, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-sm"
                    style={{ backgroundColor: a.bg }}
                  >
                    {a.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-800 leading-snug">{a.text}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{a.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Indicateurs clés */}
          <div className="flex flex-col gap-4">

            {/* Budget S1 2025 */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5">
              <h2 className="font-semibold text-gray-900 text-sm mb-4">Budget S1 2025</h2>
              <div className="space-y-3">
                {budgetItems.map((b) => (
                  <div key={b.label}>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-gray-600 font-medium">{b.label}</span>
                      <span className="text-gray-800 font-semibold">
                        {b.actual}/{b.budget} {b.unit}
                        &nbsp;<span className={`font-bold ${b.ok ? "text-green-600" : "text-red-500"}`}>
                          ({b.pct}% {b.ok ? "✅" : "⚠️"})
                        </span>
                      </span>
                    </div>
                    <ProgressBar pct={b.pct} color={b.ok ? "#2E7D32" : "#C62828"} />
                  </div>
                ))}
              </div>
            </div>

            {/* Stock critique */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-gray-900 text-sm">Stock critique</h2>
                <Link href="/alertes" className="text-xs text-red-600 font-medium hover:underline">Voir alertes →</Link>
              </div>
              <div className="space-y-2.5">
                {stockCritique.map((s) => {
                  const pct = s.max > 0 ? (s.qty / s.max) * 100 : 0;
                  const isRed = s.level === "red";
                  return (
                    <div key={s.name}>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-gray-700 font-medium">{s.name}</span>
                        <span className={`font-semibold ${isRed ? "text-red-600" : "text-yellow-600"}`}>
                          {s.qty}/{s.max} {s.unit} {isRed ? "🔴" : "🟡"}
                        </span>
                      </div>
                      <ProgressBar pct={pct} color={isRed ? "#C62828" : "#F59E0B"} />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Qualité */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5">
              <h2 className="font-semibold text-gray-900 text-sm mb-3">Qualité</h2>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="bg-green-50 rounded-xl p-3">
                  <div className="text-base font-bold text-green-700">96,8%</div>
                  <div className="text-xs text-gray-500 mt-0.5">Conformité ✅</div>
                </div>
                <div className="bg-blue-50 rounded-xl p-3">
                  <div className="text-base font-bold text-blue-700">12</div>
                  <div className="text-xs text-gray-500 mt-0.5">Lots contrôlés</div>
                </div>
                <div className="bg-red-50 rounded-xl p-3">
                  <div className="text-base font-bold text-red-700">3</div>
                  <div className="text-xs text-gray-500 mt-0.5">NC ouvertes</div>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2 bg-red-50 rounded-xl px-3 py-2">
                <span className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0" />
                <span className="text-xs text-red-700 font-medium">Lot bloqué : LOT-032 🔴</span>
              </div>
            </div>

          </div>
        </div>

        {/* ── 4. GRAPHIQUE CA MENSUEL ───────────────────────── */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900 text-sm">CA mensuel 2025 vs 2024</h2>
            <span className="text-xs text-gray-400">M XOF — * prévisions</span>
          </div>
          <GroupedBarChart />
        </div>

        {/* ── 5. TOP CULTURES + AGENDA + MÉTÉO ─────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

          {/* Top cultures S1 */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5">
            <h2 className="font-semibold text-gray-900 text-sm mb-4">Top cultures S1</h2>
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left text-gray-400 font-medium pb-2">Culture</th>
                  <th className="text-right text-gray-400 font-medium pb-2">Volume</th>
                  <th className="text-right text-gray-400 font-medium pb-2">CA</th>
                  <th className="text-right text-gray-400 font-medium pb-2">Marge</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {topCultures.map((c, i) => (
                  <tr key={i}>
                    <td className="py-2 font-medium text-gray-800">{c.culture}</td>
                    <td className="py-2 text-right text-gray-600">{c.volume}</td>
                    <td className="py-2 text-right text-gray-700 font-semibold">{c.ca} M XOF</td>
                    <td className="py-2 text-right">
                      <span className="font-bold text-green-700">{c.marge}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Link href="/cultures" className="block text-xs font-medium mt-3 text-green-700 hover:underline">
              Voir toutes les cultures →
            </Link>
          </div>

          {/* Agenda agricole 7 jours */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5">
            <div className="flex items-center gap-2 mb-4">
              <Calendar size={15} color="#2E7D32" />
              <h2 className="font-semibold text-gray-900 text-sm">Agenda agricole (7 jours)</h2>
            </div>
            <div className="space-y-2.5">
              {agenda.map((ev, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 text-center">
                    <span className="text-xs font-bold text-green-700 bg-green-50 rounded-lg px-1.5 py-0.5 block">{ev.date}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-800 font-medium leading-snug">{ev.label}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{ev.who}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/calendrier" className="block text-xs font-medium mt-3 text-green-700 hover:underline">
              Voir le calendrier complet →
            </Link>
          </div>

          {/* Météo agricole 3 jours */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5">
            <div className="flex items-center gap-2 mb-4">
              <Wind size={15} color="#1565C0" />
              <h2 className="font-semibold text-gray-900 text-sm">Météo agricole (3 jours)</h2>
            </div>
            <div className="space-y-3">
              {/* Aujourd'hui */}
              <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-xl">
                <Sun size={22} color="#F59E0B" />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold text-gray-800">Auj. 11/07</div>
                  <div className="text-xs text-gray-600 mt-0.5">34°C · Vent faible · Humidité 68%</div>
                </div>
                <CheckCircle size={14} color="#2E7D32" />
              </div>
              {/* Demain */}
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl">
                <CloudRain size={22} color="#1565C0" />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold text-gray-800">Dem. 12/07</div>
                  <div className="text-xs text-gray-600 mt-0.5">28°C · Pluies 60mm</div>
                </div>
                <AlertTriangle size={14} color="#F59E0B" />
              </div>
              {/* J+2 */}
              <div className="flex items-center gap-3 p-3 bg-red-50 rounded-xl">
                <CloudRain size={22} color="#C62828" />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold text-gray-800">13/07</div>
                  <div className="text-xs text-gray-600 mt-0.5">26°C · Pluies 80mm · Fort</div>
                </div>
                <AlertTriangle size={14} color="#C62828" />
              </div>
            </div>
            <Link href="/meteo" className="block text-xs font-medium mt-3 text-blue-700 hover:underline">
              Voir météo complète →
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}
