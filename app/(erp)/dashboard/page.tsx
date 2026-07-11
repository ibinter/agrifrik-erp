"use client";

import Link from "next/link";
import Topbar from "../../components/Topbar";
import {
  TrendingUp, TrendingDown, Leaf, Package, Users,
  AlertTriangle, Brain, Ship, Calendar, Wind, CloudRain,
  Sun, Zap,
} from "lucide-react";

/* ─── KPI DATA ───────────────────────────────────────────── */
const kpis = [
  {
    label: "CA 2025",
    value: "65 847 000 XOF",
    change: "+12,4% vs N-1",
    up: true,
    icon: TrendingUp,
    iconColor: "#2E7D32",
    iconBg: "#E8F5E9",
    href: "/ventes",
    sub: "Chiffre d'affaires",
  },
  {
    label: "Cultures actives",
    value: "8 parcelles",
    change: "38,4 ha cultivés",
    up: null,
    icon: Leaf,
    iconColor: "#1565C0",
    iconBg: "#E3F2FD",
    href: "/cultures",
    sub: "En production",
  },
  {
    label: "Stock cacao",
    value: "23 634 kg",
    change: "25,7M XOF",
    up: null,
    icon: Package,
    iconColor: "#6A1B9A",
    iconBg: "#F3E5F5",
    href: "/stocks",
    sub: "Valorisation stock",
  },
  {
    label: "Exports en transit",
    value: "1 conteneur",
    change: "18t → Rotterdam",
    up: null,
    icon: Ship,
    iconColor: "#00695C",
    iconBg: "#E0F2F1",
    href: "/exportation",
    sub: "En cours",
  },
  {
    label: "Effectif",
    value: "23 personnes",
    change: "15 perm. + 8 sais.",
    up: null,
    icon: Users,
    iconColor: "#E65100",
    iconBg: "#FFF3E0",
    href: "/rh",
    sub: "Total actif",
  },
  {
    label: "Recommandations IA",
    value: "3 nouvelles",
    change: "Aujourd'hui",
    up: null,
    icon: Brain,
    iconColor: "#1B5E20",
    iconBg: "#E8F5E9",
    href: "/ia",
    sub: "Assistant ARIA",
  },
];

/* ─── SVG LINE CHART — Performance financière ────────────── */
const MONTHS = ["Jan","Fév","Mar","Avr","Mai","Jun","Jul"];
const DATA_2024 = [4.2, 3.8, 4.5, 5.2, 5.4, 5.8, null];
const DATA_2025 = [4.8, 4.2, 5.1, 5.9, 6.2, 6.8, 3.4];

function FinanceLineChart() {
  const W = 640, H = 200;
  const padL = 40, padR = 20, padT = 24, padB = 36;
  const chartW = W - padL - padR;
  const chartH = H - padT - padB;
  const maxVal = 8;
  const yTicks = [0, 2, 4, 6, 8];

  const toX = (i: number) => padL + (i / (MONTHS.length - 1)) * chartW;
  const toY = (v: number) => padT + chartH - (v / maxVal) * chartH;

  // Build path for 2025 (all points)
  const path2025 = DATA_2025.map((v, i) => `${i === 0 ? "M" : "L"}${toX(i)},${toY(v)}`).join(" ");

  // Build path for 2024 (only non-null)
  const pts2024 = DATA_2024.map((v, i) => (v !== null ? { x: toX(i), y: toY(v as number) } : null)).filter(Boolean) as { x: number; y: number }[];
  const path2024 = pts2024.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: H }}>
      {/* Y grid */}
      {yTicks.map((t) => {
        const y = toY(t);
        return (
          <g key={t}>
            <line x1={padL} x2={W - padR} y1={y} y2={y} stroke="#F3F4F6" strokeWidth={1} />
            <text x={padL - 6} y={y + 3.5} textAnchor="end" fontSize={9} fill="#9CA3AF">{t}M</text>
          </g>
        );
      })}
      {/* Month labels */}
      {MONTHS.map((m, i) => (
        <text key={m} x={toX(i)} y={H - 8} textAnchor="middle" fontSize={9} fill="#9CA3AF">{m}</text>
      ))}
      {/* Area fill 2025 */}
      <defs>
        <linearGradient id="fillGreen" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#2E7D32" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#2E7D32" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d={`${path2025} L${toX(DATA_2025.length - 1)},${toY(0)} L${toX(0)},${toY(0)} Z`}
        fill="url(#fillGreen)"
      />
      {/* 2024 dashed line */}
      <path d={path2024} fill="none" stroke="#9CA3AF" strokeWidth={1.5} strokeDasharray="5 3" />
      {/* 2025 solid line */}
      <path d={path2025} fill="none" stroke="#2E7D32" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
      {/* Data points 2025 */}
      {DATA_2025.map((v, i) => (
        <circle key={i} cx={toX(i)} cy={toY(v)} r={4} fill="#2E7D32" stroke="white" strokeWidth={1.5}
          opacity={i === DATA_2025.length - 1 ? 0.6 : 1}
        />
      ))}
      {/* Partial label */}
      <text x={toX(6) + 6} y={toY(3.4) - 4} fontSize={8} fill="#9CA3AF">(partiel)</text>
      {/* Legend */}
      <line x1={padL} x2={padL + 20} y1={8} y2={8} stroke="#2E7D32" strokeWidth={2.5} />
      <text x={padL + 24} y={12} fontSize={9} fill="#6B7280">2025</text>
      <line x1={padL + 60} x2={padL + 80} y1={8} y2={8} stroke="#9CA3AF" strokeWidth={1.5} strokeDasharray="5 3" />
      <text x={padL + 84} y={12} fontSize={9} fill="#6B7280">2024</text>
    </svg>
  );
}

/* ─── SVG BAR CHART HORIZONTAL — Productivité parcelles ─── */
const PARCELLES = [
  { name: "PAR-A1", val: 1.28, color: "#1B5E20", note: "cacao" },
  { name: "PAR-A2", val: 1.24, color: "#2E7D32", note: "cacao" },
  { name: "PAR-A3", val: 1.22, color: "#388E3C", note: "cacao" },
  { name: "PAR-B1", val: 1.18, color: "#4CAF50", note: "cacao" },
  { name: "PAR-B2", val: 0.82, color: "#E65100", note: "jeune" },
  { name: "PAR-B3", val: 0.94, color: "#F59E0B", note: "cacao" },
  { name: "PAR-C1", val: 1.22, color: "#1565C0", note: "anacarde" },
  { name: "PAR-C2", val: 1.22, color: "#1976D2", note: "anacarde" },
];
const OBJECTIF = 1.20;
const MAX_VAL = 1.40;

function ParcelleBarChart() {
  const W = 500, H = 280;
  const padL = 60, padR = 90, padT = 20, padB = 20;
  const chartW = W - padL - padR;
  const barH = (H - padT - padB) / PARCELLES.length - 4;
  const objX = padL + (OBJECTIF / MAX_VAL) * chartW;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: H }}>
      {/* Objectif line */}
      <line x1={objX} x2={objX} y1={padT - 8} y2={H - padB} stroke="#C62828" strokeWidth={1.5} strokeDasharray="4 3" />
      <text x={objX} y={padT - 10} textAnchor="middle" fontSize={8} fill="#C62828">Objectif 1,20</text>

      {PARCELLES.map((p, i) => {
        const y = padT + i * (barH + 4);
        const bw = (p.val / MAX_VAL) * chartW;
        return (
          <g key={p.name}>
            <text x={padL - 5} y={y + barH / 2 + 4} textAnchor="end" fontSize={10} fill="#374151" fontWeight="600">{p.name}</text>
            <rect x={padL} y={y} width={bw} height={barH} rx={3} fill={p.color} opacity={0.9} />
            <text x={padL + bw + 5} y={y + barH / 2 + 4} fontSize={10} fill={p.color} fontWeight="700">{p.val.toFixed(2)} t/ha</text>
            <text x={padL + bw + 5} y={y + barH / 2 + 14} fontSize={8} fill="#9CA3AF">{p.note}</text>
          </g>
        );
      })}
    </svg>
  );
}

/* ─── PAGE ───────────────────────────────────────────────── */
export default function DashboardPage() {
  return (
    <div>
      <Topbar title="Tableau de Bord" breadcrumb={["Dashboard"]} />

      <div className="p-6 space-y-5">

        {/* ── EN-TÊTE ────────────────────────────────────────── */}
        <div
          className="rounded-2xl p-5"
          style={{ background: "linear-gradient(135deg,#1B5E20 0%,#2E7D32 60%,#388E3C 100%)" }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h1 className="text-white text-xl font-bold mb-1">Bonjour Koffi 👋</h1>
              <p className="text-green-200 text-sm">Vendredi 11 juillet 2025</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 bg-white/15 text-white text-xs px-3 py-1.5 rounded-lg font-medium">
                🌿 Saison intermédiaire
              </span>
              <Link href="/alertes" className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg font-bold"
                style={{ backgroundColor: "#E65100", color: "#fff" }}>
                <AlertTriangle size={12} />
                42 alertes actives
              </Link>
            </div>
          </div>
        </div>

        {/* ── 6 KPIs ─────────────────────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {kpis.map((k) => {
            const Icon = k.icon;
            return (
              <Link
                key={k.label}
                href={k.href}
                className="rounded-2xl border border-gray-100 bg-white p-5 hover:shadow-md hover:-translate-y-0.5 transition-all group"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: k.iconBg }}>
                    <Icon size={17} color={k.iconColor} strokeWidth={1.8} />
                  </div>
                </div>
                <div className="text-base font-bold text-gray-900 leading-tight">{k.value}</div>
                <div className="text-xs text-gray-400 mt-0.5">{k.sub}</div>
                <div className={`text-xs mt-1.5 font-medium flex items-center gap-1 ${k.up === true ? "text-green-600" : k.up === false ? "text-red-500" : "text-gray-500"}`}>
                  {k.up === true && <TrendingUp size={10} />}
                  {k.up === false && <TrendingDown size={10} />}
                  {k.change}
                </div>
                <div className="text-xs text-gray-500 mt-0.5 font-medium group-hover:text-green-700 transition-colors">{k.label} →</div>
              </Link>
            );
          })}
        </div>

        {/* ── WIDGET 1 — Performance financière ──────────────── */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900 text-sm">Performance financière — CA mensuel 2025 vs 2024</h2>
            <span className="text-xs text-gray-400">M XOF</span>
          </div>
          <FinanceLineChart />
        </div>

        {/* ── WIDGET 2 — Alertes urgentes ────────────────────── */}
        <div className="rounded-2xl p-5" style={{ backgroundColor: "#FFF5F5", border: "1px solid #FCA5A5" }}>
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle size={16} color="#B71C1C" />
            <h2 className="font-semibold text-sm" style={{ color: "#B71C1C" }}>Alertes urgentes</h2>
          </div>
          <div className="space-y-2">
            {/* Critiques */}
            <div className="flex items-start gap-3 p-3 rounded-xl" style={{ backgroundColor: "#FFEBEE" }}>
              <span className="text-base flex-shrink-0">🔴</span>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-red-900">Stock KCl critique : 2 sacs restants (seuil : 5 sacs)</p>
                <p className="text-xs text-red-700 mt-0.5">Commander immédiatement auprès de KCl Distribution (FRN-003)</p>
              </div>
              <Link href="/achats" className="text-xs font-bold px-3 py-1.5 rounded-lg text-white flex-shrink-0" style={{ backgroundColor: "#B71C1C" }}>
                Commander
              </Link>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-xl" style={{ backgroundColor: "#FFEBEE" }}>
              <span className="text-base flex-shrink-0">🔴</span>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-red-900">Bilan hydrique : Déficit estimé à -18mm sur PAR-A1</p>
                <p className="text-xs text-red-700 mt-0.5">Surveiller — stress hydrique léger détecté</p>
              </div>
            </div>
            {/* Importante */}
            <div className="flex items-start gap-3 p-3 rounded-xl" style={{ backgroundColor: "#FEF3C7" }}>
              <span className="text-base flex-shrink-0">🟡</span>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold" style={{ color: "#92400E" }}>Fermentation LOT-048 : J6 demain à 07h00 — Cut test obligatoire</p>
                <p className="text-xs" style={{ color: "#78350F" }}>Contrôle qualité requis avant ouverture caisse</p>
              </div>
            </div>
            {/* Info */}
            <div className="flex items-start gap-3 p-3 rounded-xl" style={{ backgroundColor: "#F0FFF4" }}>
              <span className="text-base flex-shrink-0">🟢</span>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-green-900">Conteneur LOG-2025-018 : Golfe de Gascogne</p>
                <p className="text-xs text-green-700">ETA Rotterdam dans 13 jours — transit nominal</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── WIDGET 3 — Lots de transformation actifs ───────── */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900 text-sm">Lots de transformation actifs</h2>
            <Link href="/transformation" className="text-xs text-green-700 font-medium hover:underline">Voir tous →</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* LOT-048 */}
            <div className="rounded-xl p-4 border" style={{ backgroundColor: "#EFF6FF", borderColor: "#93C5FD" }}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold text-blue-900">LOT-2025-048</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: "#DBEAFE", color: "#1565C0" }}>🔵 Fermentation</span>
              </div>
              <div className="text-xs text-blue-800 mb-1">J5/6 • 2 640 kg</div>
              <div className="text-xs font-bold" style={{ color: "#E65100" }}>⚠️ Attention J6 demain — cut test obligatoire 07h00</div>
              <div className="mt-2 w-full bg-blue-100 rounded-full h-1.5">
                <div className="h-1.5 rounded-full" style={{ width: "83%", backgroundColor: "#1565C0" }} />
              </div>
              <div className="text-xs text-blue-600 mt-1">Progression J5/6 — 83%</div>
            </div>
            {/* LOT-047 */}
            <div className="rounded-xl p-4 border" style={{ backgroundColor: "#F0FFF4", borderColor: "#86EFAC" }}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold text-green-900">LOT-2025-047</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: "#DCFCE7", color: "#166534" }}>🟢 Séchage terminé</span>
              </div>
              <div className="text-xs text-green-800 mb-1">7,8% HR ✅ • 3 020 kg</div>
              <div className="text-xs font-bold text-green-700">Prêt pour classement et conditionnement</div>
              <div className="mt-2 w-full bg-green-100 rounded-full h-1.5">
                <div className="h-1.5 rounded-full" style={{ width: "100%", backgroundColor: "#2E7D32" }} />
              </div>
              <div className="text-xs text-green-600 mt-1">Séchage terminé — 100%</div>
            </div>
          </div>
        </div>

        {/* ── WIDGET 4 — Recommandations IA du jour ──────────── */}
        <div className="rounded-2xl p-5" style={{ backgroundColor: "#F0FFF4", border: "1px solid #86EFAC" }}>
          <div className="flex items-center gap-2 mb-4">
            <Brain size={16} color="#2E7D32" />
            <h2 className="font-semibold text-sm text-green-900">Recommandations IA du jour — ARIA</h2>
            <Link href="/ia" className="ml-auto text-xs text-green-700 font-medium hover:underline">Voir toutes →</Link>
          </div>
          <div className="space-y-3">
            {[
              {
                icon: "🌱",
                text: "Fenêtre optimale épandage KCl : 13-16 juillet (après prochaines pluies estimées 1-2mm). Dose recommandée : 80 kg/ha sur PAR-A1.",
              },
              {
                icon: "📊",
                text: "Prix cacao BCC à 1 087 XOF/kg — au-dessus de votre prix de revient (980 XOF/kg). Marge brute actuelle : 10,9%. Opportunité de vente au comptant.",
              },
              {
                icon: "🦟",
                text: "Risque mirides élevé en juillet (période humide). Inspection préventive PAR-A2 et PAR-A3 recommandée cette semaine.",
              },
            ].map((r, i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-white rounded-xl">
                <span className="text-base flex-shrink-0">{r.icon}</span>
                <p className="text-xs text-gray-700 leading-relaxed">{r.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── WIDGET 5 — Agenda semaine + Météo ──────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

          {/* Agenda de la semaine */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5">
            <div className="flex items-center gap-2 mb-4">
              <Calendar size={15} color="#2E7D32" />
              <h2 className="font-semibold text-gray-900 text-sm">Agenda de la semaine</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr>
                    {["Lun 14","Mar 15","Mer 16","Jeu 17","Ven 18"].map((d) => (
                      <th key={d} className="text-center font-bold text-gray-600 pb-2 px-1" style={{ fontSize: 10 }}>{d}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="align-top px-1 py-1">
                      <div className="rounded-lg p-1.5 text-xs" style={{ backgroundColor: "#FEF3C7", color: "#92400E" }}>
                        Cut test<br/>LOT-048<br/>07h00
                      </div>
                    </td>
                    <td className="align-top px-1 py-1">
                      <div className="rounded-lg p-1.5 text-xs" style={{ backgroundColor: "#E8F5E9", color: "#2E7D32" }}>
                        Épandage<br/>KCl PAR-A1
                      </div>
                    </td>
                    <td className="align-top px-1 py-1">
                      <div className="rounded-lg p-1.5 text-xs text-gray-400">—</div>
                    </td>
                    <td className="align-top px-1 py-1">
                      <div className="rounded-lg p-1.5 text-xs" style={{ backgroundColor: "#E3F2FD", color: "#1565C0" }}>
                        Inspection<br/>phyto<br/>PAR-A2
                      </div>
                    </td>
                    <td className="align-top px-1 py-1">
                      <div className="rounded-lg p-1.5 text-xs" style={{ backgroundColor: "#F3E5F5", color: "#6A1B9A" }}>
                        Réunion<br/>hebdo<br/>équipe
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="align-top px-1 py-1">
                      <div className="rounded-lg p-1.5 text-xs" style={{ backgroundColor: "#E8F5E9", color: "#2E7D32" }}>
                        Classement<br/>LOT-047
                      </div>
                    </td>
                    <td className="align-top px-1 py-1">
                      <div className="rounded-lg p-1.5 text-xs" style={{ backgroundColor: "#E0F2F1", color: "#00695C" }}>
                        Formation<br/>BPA J2<br/>(ANADER)
                      </div>
                    </td>
                    <td className="align-top px-1 py-1">
                      <div className="rounded-lg p-1.5 text-xs text-gray-400">—</div>
                    </td>
                    <td className="align-top px-1 py-1">
                      <div className="rounded-lg p-1.5 text-xs text-gray-400">—</div>
                    </td>
                    <td className="align-top px-1 py-1">
                      <div className="rounded-lg p-1.5 text-xs text-gray-400">—</div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <Link href="/calendrier" className="block text-xs font-medium mt-3 text-green-700 hover:underline">
              Voir le calendrier complet →
            </Link>
          </div>

          {/* Météo agronomique */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5">
            <div className="flex items-center gap-2 mb-1">
              <Wind size={15} color="#1565C0" />
              <h2 className="font-semibold text-gray-900 text-sm">Météo agronomique</h2>
              <span className="text-xs text-gray-400 ml-auto">Station Davis : Soubré Nord</span>
            </div>
            {/* Aujourd'hui */}
            <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-xl mt-3">
              <Sun size={22} color="#F59E0B" />
              <div className="flex-1">
                <div className="text-xs font-bold text-gray-800">Aujourd&apos;hui</div>
                <div className="text-xs text-gray-600">⛅ 32°C · HR 74% · Vent SE 8 km/h · Pluie 48h : 0 mm</div>
              </div>
            </div>
            {/* Prévisions 3j */}
            <div className="grid grid-cols-3 gap-2 mt-3">
              {[
                { day: "Sam", icon: "⛅", temp: "30°C", rain: "12mm", bg: "#F9FAFB" },
                { day: "Dim", icon: "🌧️", temp: "28°C", rain: "28mm", bg: "#EFF6FF" },
                { day: "Lun", icon: "⛅", temp: "31°C", rain: "6mm", bg: "#F9FAFB" },
              ].map((d) => (
                <div key={d.day} className="rounded-xl p-3 text-center" style={{ backgroundColor: d.bg }}>
                  <div className="text-xs font-semibold text-gray-600">{d.day}</div>
                  <div className="text-lg my-1">{d.icon}</div>
                  <div className="text-xs font-bold text-gray-800">{d.temp}</div>
                  <div className="text-xs text-blue-600">{d.rain}</div>
                </div>
              ))}
            </div>
            {/* ETP + Bilan */}
            <div className="mt-3 space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500">ETP journalière</span>
                <span className="font-semibold text-gray-700">4,8 mm</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500">Bilan hydrique depuis 01/07</span>
                <span className="font-semibold" style={{ color: "#E65100" }}>-14 mm ⚠️ stress hydrique léger</span>
              </div>
            </div>
            <Link href="/meteo" className="block text-xs font-medium mt-3 text-blue-700 hover:underline">
              Voir météo complète →
            </Link>
          </div>

        </div>

        {/* ── WIDGET 7 — Productivité par parcelle ───────────── */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900 text-sm">Productivité par parcelle</h2>
            <Link href="/cultures" className="text-xs text-green-700 font-medium hover:underline">Voir détail →</Link>
          </div>
          <ParcelleBarChart />
          <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm inline-block" style={{ backgroundColor: "#1B5E20" }} />Cacao (vert foncé = meilleur)</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm inline-block" style={{ backgroundColor: "#1565C0" }} />Anacarde</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm inline-block" style={{ backgroundColor: "#E65100" }} />Jeune plantation</span>
            <span className="flex items-center gap-1.5 text-red-600"><span>— —</span>Objectif 1,20 t/ha</span>
          </div>
        </div>

        {/* ── WIDGET 8 — Actions rapides ─────────────────────── */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <div className="flex items-center gap-2 mb-4">
            <Zap size={15} color="#E65100" />
            <h2 className="font-semibold text-gray-900 text-sm">Actions rapides</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Nouvelle vente", href: "/ventes", bg: "#E8F5E9", color: "#2E7D32", icon: "💰" },
              { label: "Nouveau stock", href: "/stocks", bg: "#E3F2FD", color: "#1565C0", icon: "📦" },
              { label: "Rapport météo", href: "/meteo", bg: "#FFF3E0", color: "#E65100", icon: "🌤️" },
              { label: "Saisir récolte", href: "/cultures", bg: "#F3E5F5", color: "#6A1B9A", icon: "🌱" },
              { label: "Créer tâche", href: "/taches", bg: "#E0F2F1", color: "#00695C", icon: "✅" },
              { label: "Contacter équipe", href: "/messagerie", bg: "#FFF3E0", color: "#E65100", icon: "💬" },
              { label: "Voir alertes", href: "/alertes", bg: "#FFEBEE", color: "#B71C1C", icon: "🔔" },
              { label: "Assistant IA", href: "/ia", bg: "#F0FFF4", color: "#1B5E20", icon: "🤖" },
            ].map((a) => (
              <Link
                key={a.label}
                href={a.href}
                className="flex items-center gap-2 p-3 rounded-xl text-xs font-semibold hover:opacity-80 transition-opacity"
                style={{ backgroundColor: a.bg, color: a.color }}
              >
                <span className="text-base">{a.icon}</span>
                {a.label}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
