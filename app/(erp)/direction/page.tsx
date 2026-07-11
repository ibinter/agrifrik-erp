"use client";

import { useState } from "react";
import Topbar from "../../components/Topbar";

// ─── KPI Card ────────────────────────────────────────────────────────────────
function KpiCard({
  label,
  value,
  sub,
  badge,
  badgeColor,
  progress,
}: {
  label: string;
  value: string;
  sub?: string;
  badge?: string;
  badgeColor?: string;
  progress?: number;
}) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 flex flex-col gap-2">
      <span className="text-xs text-gray-500 font-medium">{label}</span>
      <span className="text-xl font-bold text-gray-900 leading-tight">{value}</span>
      {sub && <span className="text-xs text-gray-500 leading-relaxed">{sub}</span>}
      {badge && (
        <span className={`self-start px-2 py-0.5 rounded-full text-xs font-semibold ${badgeColor ?? "bg-green-100 text-green-700"}`}>
          {badge}
        </span>
      )}
      {progress !== undefined && (
        <div className="mt-1">
          <div className="flex justify-between mb-0.5">
            <span className="text-xs text-gray-400">Objectif annuel</span>
            <span className="text-xs font-semibold text-[#2E7D32]">{progress}%</span>
          </div>
          <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
            <div className="h-full rounded-full bg-[#2E7D32]" style={{ width: `${Math.min(progress, 100)}%` }} />
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Bandeau alertes critiques ────────────────────────────────────────────────
function AlertesCritiques() {
  const alertes = [
    {
      level: "red",
      icon: "🔴",
      text: "Stock KCl critique : 2 sacs (seuil 5 sacs)",
      action: "Commande urgente requise",
    },
    {
      level: "yellow",
      icon: "🟡",
      text: "Révision tracteur JD5055E dans 19 jours",
      action: "Programmer maintenance",
    },
  ];

  return (
    <div className="rounded-2xl border border-red-200 bg-red-50 p-5">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-sm font-bold text-red-800">Alertes critiques Direction</span>
        <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-red-200 text-red-800">{alertes.length} actives</span>
      </div>
      <div className="space-y-2">
        {alertes.map((a, i) => (
          <div
            key={i}
            className={`flex items-start gap-3 rounded-xl px-4 py-3 border ${
              a.level === "red"
                ? "bg-red-100 border-red-300"
                : "bg-yellow-50 border-yellow-300"
            }`}
          >
            <span className="text-base mt-0.5">{a.icon}</span>
            <div className="flex-1">
              <p className={`text-sm font-semibold ${a.level === "red" ? "text-red-800" : "text-yellow-800"}`}>{a.text}</p>
              <p className={`text-xs mt-0.5 ${a.level === "red" ? "text-red-600" : "text-yellow-700"}`}>{a.action}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── SVG Waterfall P&L simplifié ─────────────────────────────────────────────
function WaterfallPL() {
  const items = [
    { label: "CA", val: 26.7, type: "pos" },
    { label: "−Intrants", val: 3.1, type: "neg" },
    { label: "−MO & Sal.", val: 4.2, type: "neg" },
    { label: "−Carburant", val: 1.2, type: "neg" },
    { label: "−Mainten.", val: 0.7, type: "neg" },
    { label: "−Assurances", val: 0.3, type: "neg" },
    { label: "−Fr. banc.", val: 0.1, type: "neg" },
    { label: "Résultat", val: 17.1, type: "total" },
  ];

  const W = 640, H = 220, PL = 45, PR = 20, PT = 24, PB = 46;
  const xW = W - PL - PR, yH = H - PT - PB;
  const maxV = 30;
  const bW = (xW / items.length) - 6;
  const toY = (v: number) => PT + yH - (v / maxV) * yH;
  const colors: Record<string, string> = { pos: "#4CAF50", neg: "#ef4444", total: "#1B5E20" };

  let running = 0;
  const bars = items.map((item) => {
    let base: number;
    if (item.type === "pos") { base = running; running += item.val; }
    else if (item.type === "neg") { base = running - item.val; running -= item.val; }
    else { base = 0; }
    return { ...item, base };
  });

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-700">P&L simplifié 2025 — Jan–Jul (M XOF)</h3>
        <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">Résultat net : 17,1M XOF (64,4%)</span>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ maxHeight: 220 }}>
        {[0, 5, 10, 15, 20, 25, 30].map((v) => {
          const y = toY(v);
          return (
            <g key={v}>
              <line x1={PL} y1={y} x2={W - PR} y2={y} stroke="#e5e7eb" strokeWidth={1} />
              <text x={PL - 4} y={y + 4} textAnchor="end" fontSize={9} fill="#9ca3af">{v}</text>
            </g>
          );
        })}
        {bars.map((b, i) => {
          const x = PL + i * (bW + 6);
          const barH = (b.val / maxV) * yH;
          const rectY = b.type === "neg"
            ? toY(b.base + b.val)
            : toY(b.base + b.val);
          return (
            <g key={b.label}>
              <rect
                x={x}
                y={b.type === "neg" ? toY(b.base + b.val) : toY(b.base + b.val)}
                width={bW}
                height={barH}
                rx={3}
                fill={colors[b.type]}
                opacity={b.type === "total" ? 1 : 0.85}
              />
              <text x={x + bW / 2} y={(b.type === "neg" ? toY(b.base + b.val) : toY(b.base + b.val)) - 4}
                textAnchor="middle" fontSize={8} fontWeight="600" fill="#374151">
                {b.type === "neg" ? `-${b.val}` : `+${b.val}`}
              </text>
              <text x={x + bW / 2} y={H - 8} textAnchor="middle" fontSize={7.5} fill="#6b7280">{b.label}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// ─── Table pipeline commercial ────────────────────────────────────────────────
function TablePipeline() {
  const rows = [
    {
      opp: "DEV-2025-003",
      client: "OLAM Cocoa CI",
      volume: "8t",
      valeur: "8,76M XOF",
      proba: "70%",
      statut: "🔵 En attente",
      badgeClass: "bg-blue-100 text-blue-700",
    },
    {
      opp: "Récolte oct-déc",
      client: "Barry Callebaut (CTR)",
      volume: "20t",
      valeur: "21,7M XOF",
      proba: "95%",
      statut: "✅ Contractuel",
      badgeClass: "bg-green-100 text-green-700",
    },
    {
      opp: "Vente anacarde PAR-C1",
      client: "Cargill CI",
      volume: "1,6t",
      valeur: "2,4M XOF",
      proba: "80%",
      statut: "🟡 Négociation",
      badgeClass: "bg-yellow-100 text-yellow-700",
    },
  ];
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">Pipeline commercial — Opportunités en cours</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-[#F8FBF8]">
              {["Opportunité", "Client", "Volume", "Valeur est.", "Proba", "Statut"].map((h) => (
                <th key={h} className="px-3 py-2 text-left font-semibold text-gray-600">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-t border-gray-50 hover:bg-gray-50">
                <td className="px-3 py-2 font-medium text-gray-800">{r.opp}</td>
                <td className="px-3 py-2 text-gray-700">{r.client}</td>
                <td className="px-3 py-2 text-gray-700">{r.volume}</td>
                <td className="px-3 py-2 font-semibold text-green-700">{r.valeur}</td>
                <td className="px-3 py-2 text-gray-700">{r.proba}</td>
                <td className="px-3 py-2">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${r.badgeClass}`}>{r.statut}</span>
                </td>
              </tr>
            ))}
            <tr className="border-t-2 border-gray-200 bg-gray-50">
              <td className="px-3 py-2 font-bold text-gray-800" colSpan={2}>Total pipeline</td>
              <td className="px-3 py-2 font-bold text-gray-800">29,6t</td>
              <td className="px-3 py-2 font-bold text-green-700">32,9M XOF</td>
              <td colSpan={2}></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Table décisions requises ─────────────────────────────────────────────────
function TableDecisions() {
  const rows = [
    {
      priorite: "🔴 URGENT",
      action: "Commander KCl (stock critique)",
      delai: "11/07",
      impact: "Risque traitement PAR-A1",
      lien: "Créer commande",
      pClass: "bg-red-100 text-red-700",
    },
    {
      priorite: "🟡 7 jours",
      action: "Valider devis DEV-2025-003 (OLAM)",
      delai: "17/07",
      impact: "+8,76M XOF CA potentiel",
      lien: "Voir devis",
      pClass: "bg-yellow-100 text-yellow-700",
    },
    {
      priorite: "🟡 15 jours",
      action: "Programmer révision tracteur JD5055E",
      delai: "25/07",
      impact: "Disponibilité récolte principale",
      lien: "Voir matériel",
      pClass: "bg-yellow-100 text-yellow-700",
    },
    {
      priorite: "🟢 30 jours",
      action: "Préparer rapport bailleur FAO Q3",
      delai: "15/10",
      impact: "Conformité projet BAI-2025-001",
      lien: "Préparer",
      pClass: "bg-green-100 text-green-700",
    },
  ];
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">Décisions requises — Actions Direction en attente</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-[#F8FBF8]">
              {["Priorité", "Action", "Délai", "Impact", "Lien"].map((h) => (
                <th key={h} className="px-3 py-2 text-left font-semibold text-gray-600">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-t border-gray-50 hover:bg-gray-50">
                <td className="px-3 py-2">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${r.pClass}`}>{r.priorite}</span>
                </td>
                <td className="px-3 py-2 font-medium text-gray-800">{r.action}</td>
                <td className="px-3 py-2 text-gray-600 font-mono">{r.delai}</td>
                <td className="px-3 py-2 text-gray-500">{r.impact}</td>
                <td className="px-3 py-2">
                  <button className="px-2 py-1 rounded-lg text-xs font-medium bg-[#2E7D32] text-white hover:bg-[#1B5E20] transition-colors">
                    {r.lien}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Card météo ───────────────────────────────────────────────────────────────
function CardMeteo() {
  const previsions = [
    { jour: "Lun 14", icon: "☁️", temp: "27°C" },
    { jour: "Mar 15", icon: "🌧️", temp: "25°C" },
    { jour: "Mer 16", icon: "🌧️", temp: "24°C" },
    { jour: "Jeu 17", icon: "🌧️", temp: "25°C" },
    { jour: "Ven 18", icon: "⛅", temp: "27°C" },
    { jour: "Sam 19", icon: "☀️", temp: "29°C" },
    { jour: "Dim 20", icon: "☀️", temp: "30°C" },
  ];

  return (
    <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-blue-900">Météo Soubré — Impact production</h3>
          <div className="flex items-center gap-3 mt-2">
            <span className="text-3xl">☁️</span>
            <div>
              <p className="text-2xl font-bold text-blue-900">28°C</p>
              <p className="text-xs text-blue-600">Nuageux — Humidité 82%</p>
            </div>
          </div>
        </div>
        <div className="text-right">
          <span className="px-2 py-1 rounded-lg text-xs font-semibold bg-blue-200 text-blue-800">Grande saison des pluies</span>
          <p className="text-xs text-blue-600 mt-1">Favorable à la floraison</p>
        </div>
      </div>

      {/* Prévision 7j */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
        {previsions.map((p) => (
          <div key={p.jour} className="flex flex-col items-center gap-1 min-w-[52px] bg-white rounded-xl p-2 border border-blue-100">
            <span className="text-xs text-gray-500">{p.jour}</span>
            <span className="text-lg">{p.icon}</span>
            <span className="text-xs font-semibold text-gray-700">{p.temp}</span>
          </div>
        ))}
      </div>

      {/* Alerte séchage */}
      <div className="rounded-xl bg-orange-50 border border-orange-200 px-4 py-3">
        <p className="text-xs font-semibold text-orange-800">Impact séchage</p>
        <p className="text-xs text-orange-700 mt-1">
          LOT-2025-047 en cours de séchage (J7) — Rentrer les claies les <strong>15-16 juil</strong> (pluie prévue)
        </p>
        <p className="text-xs text-green-700 mt-1">
          Saison favorable : floraison attendue — cabosses disponibles pour récolte <strong>oct–déc 2025</strong>
        </p>
      </div>

      {/* Boutons */}
      <div className="flex gap-2 mt-4 flex-wrap">
        <button className="px-3 py-2 rounded-xl text-xs font-medium bg-[#2E7D32] text-white hover:bg-[#1B5E20] transition-colors">
          Voir analytics complets
        </button>
        <button className="px-3 py-2 rounded-xl text-xs font-medium border border-[#2E7D32] text-[#2E7D32] hover:bg-green-50 transition-colors">
          Rapport mensuel
        </button>
        <button className="px-3 py-2 rounded-xl text-xs font-medium border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">
          Exporter tableau de bord
        </button>
      </div>
    </div>
  );
}

// ─── Page principale ──────────────────────────────────────────────────────────
export default function DirectionPage() {
  const [_tab, _setTab] = useState(0);

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-gray-50">
      <Topbar breadcrumb={["Rapports", "Direction"]} />

      <div className="flex-1 overflow-y-auto p-6 space-y-6">

        {/* En-tête */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Tableau de Bord Direction</h1>
            <p className="text-sm text-gray-500 mt-0.5">Vue synthétique — Exploitation EXP-001 — 11 juillet 2025</p>
          </div>
          <span className="self-start flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-gray-900 text-white">
            <span>🔒</span> Accès Direction Générale
          </span>
        </div>

        {/* Alertes */}
        <AlertesCritiques />

        {/* KPIs Clés Direction — 8 cards 2×4 */}
        <div>
          <h2 className="text-sm font-semibold text-gray-700 mb-3">KPIs Clés Direction</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <KpiCard
              label="CA 2025 YTD"
              value="26,7M XOF"
              sub="+8,2% vs N-1 — Objectif 48M"
              badge="55,6% ✅"
              progress={55.6}
            />
            <KpiCard
              label="Marge brute"
              value="34,2%"
              sub="Nette intrants/MO — Target 32%"
              badge="Target dépassé ✅"
            />
            <KpiCard
              label="Production cacao"
              value="11,2t YTD"
              sub="Objectif 2025 : 16t — Saison août-oct à venir"
              badge="70% ✅"
              progress={70}
            />
            <KpiCard
              label="Trésorerie disponible"
              value="43,3M XOF"
              sub="Ratio liquidité : 3,8x"
              badge="Solide ✅"
            />
            <KpiCard
              label="Carnet de commandes"
              value="2 BC en cours"
              sub="Pipeline : 12,5M XOF — Devis OLAM 8t"
              badge="Actif"
              badgeColor="bg-blue-100 text-blue-700"
            />
            <KpiCard
              label="Score certification RA"
              value="94/100"
              sub="Renouvellement en cours"
              badge="Maintenu ✅"
            />
            <KpiCard
              label="Budget phyto consommé"
              value="73,8%"
              sub="À 54% de l'année écoulée"
              badge="Sous contrôle ✅"
              progress={73.8}
            />
            <KpiCard
              label="Effectif"
              value="5 personnes"
              sub="2 CDI + 3 saisonniers — Masse salariale YTD : 4,2M XOF"
              badge="Stable"
              badgeColor="bg-gray-100 text-gray-600"
            />
          </div>
        </div>

        {/* P&L waterfall */}
        <WaterfallPL />

        {/* Pipeline commercial */}
        <TablePipeline />

        {/* Décisions requises */}
        <TableDecisions />

        {/* Météo */}
        <CardMeteo />

      </div>
    </div>
  );
}
