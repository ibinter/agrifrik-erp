"use client";

import { useState } from "react";
import Topbar from "../../components/Topbar";
import { ChevronRight, TrendingUp, TrendingDown, Minus, Bell, AlertTriangle, CheckCircle, Plus } from "lucide-react";

const TABS = ["Cours actuels", "Historique", "Alertes prix"] as const;
type Tab = typeof TABS[number];

// ── SVG Area chart — cours BCC 30 jours ──────────────────────────────────────
function BCC30DaysSVG() {
  // ~30 points, trend from ~1 060 to 1 087
  const raw = [1062,1058,1055,1060,1063,1061,1068,1070,1065,1068,1072,1075,1071,1073,1076,1075,1078,1079,1076,1080,1082,1081,1083,1082,1084,1085,1083,1086,1087,1087];
  const W = 700, H = 200, PL = 55, PR = 20, PT = 20, PB = 30;
  const iW = W - PL - PR, iH = H - PT - PB;
  const minV = 1040, maxV = 1100;
  const toX = (i: number) => PL + (i / (raw.length - 1)) * iW;
  const toY = (v: number) => PT + iH - ((v - minV) / (maxV - minV)) * iH;
  const path = raw.map((v, i) => `${i === 0 ? "M" : "L"}${toX(i).toFixed(1)},${toY(v).toFixed(1)}`).join(" ");
  const area = `${path} L${toX(raw.length - 1).toFixed(1)},${(PT + iH).toFixed(1)} L${toX(0).toFixed(1)},${(PT + iH).toFixed(1)} Z`;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} xmlns="http://www.w3.org/2000/svg" className="w-full">
      <defs>
        <linearGradient id="bccGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2E7D32" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#2E7D32" stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <line x1={PL} y1={PT} x2={PL} y2={PT + iH} stroke="#E5E7EB" strokeWidth="1" />
      <line x1={PL} y1={PT + iH} x2={PL + iW} y2={PT + iH} stroke="#E5E7EB" strokeWidth="1" />
      {[1040, 1060, 1080, 1100].map(v => (
        <g key={v}>
          <text x={PL - 6} y={toY(v) + 4} textAnchor="end" fontSize="9" fill="#9CA3AF">{v}</text>
          <line x1={PL} y1={toY(v)} x2={PL + iW} y2={toY(v)} stroke="#F3F4F6" strokeWidth="1" />
        </g>
      ))}
      {[0, 7, 14, 21, 28].map(i => (
        <text key={i} x={toX(i)} y={H - 5} textAnchor="middle" fontSize="8" fill="#9CA3AF">J-{29 - i}</text>
      ))}
      <text x={toX(29)} y={H - 5} textAnchor="middle" fontSize="8" fill="#9CA3AF">Auj.</text>
      <path d={area} fill="url(#bccGrad)" />
      <path d={path} fill="none" stroke="#2E7D32" strokeWidth="2" />
      {/* annotation */}
      <circle cx={toX(29)} cy={toY(1087)} r={5} fill="#2E7D32" />
      <text x={toX(29) - 8} y={toY(1087) - 10} textAnchor="end" fontSize="9" fill="#1B5E20" fontWeight="700">Prix actuel : 1 087 XOF/kg</text>
    </svg>
  );
}

// ── SVG Line chart — 12 mois ──────────────────────────────────────────────────
function Hist12MonthsSVG() {
  const months = ["Jul 24", "Aoû", "Sep", "Oct", "Nov", "Déc", "Jan 25", "Fév", "Mar", "Avr", "Mai", "Jun", "Jul"];
  const data   = [980, 1002, 1018, 1072, 1098, 1086, 1058, 1064, 1072, 1078, 1082, 1085, 1087];
  const W = 700, H = 260, PL = 55, PR = 30, PT = 30, PB = 35;
  const iW = W - PL - PR, iH = H - PT - PB;
  const minV = 960, maxV = 1140;
  const toX = (i: number) => PL + (i / (data.length - 1)) * iW;
  const toY = (v: number) => PT + iH - ((v - minV) / (maxV - minV)) * iH;
  const path = data.map((v, i) => `${i === 0 ? "M" : "L"}${toX(i).toFixed(1)},${toY(v).toFixed(1)}`).join(" ");
  const area = `${path} L${toX(data.length - 1).toFixed(1)},${(PT + iH).toFixed(1)} L${toX(0).toFixed(1)},${(PT + iH).toFixed(1)} Z`;

  // annotations
  const peakI = 4, troughI = 0;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} xmlns="http://www.w3.org/2000/svg" className="w-full">
      <defs>
        <linearGradient id="hist12Grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2E7D32" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#2E7D32" stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <line x1={PL} y1={PT} x2={PL} y2={PT + iH} stroke="#E5E7EB" strokeWidth="1" />
      <line x1={PL} y1={PT + iH} x2={PL + iW} y2={PT + iH} stroke="#E5E7EB" strokeWidth="1" />
      {[960, 1000, 1040, 1080, 1120].map(v => (
        <g key={v}>
          <text x={PL - 6} y={toY(v) + 4} textAnchor="end" fontSize="9" fill="#9CA3AF">{v}</text>
          <line x1={PL} y1={toY(v)} x2={PL + iW} y2={toY(v)} stroke="#F3F4F6" strokeWidth="1" />
        </g>
      ))}
      {months.map((m, i) => (
        <text key={m} x={toX(i)} y={H - 8} textAnchor="middle" fontSize="8" fill="#6B7280">{m}</text>
      ))}
      <path d={area} fill="url(#hist12Grad)" />
      <path d={path} fill="none" stroke="#2E7D32" strokeWidth="2.5" strokeLinejoin="round" />
      {data.map((v, i) => (
        <circle key={i} cx={toX(i)} cy={toY(v)} r={3} fill="#2E7D32" />
      ))}
      {/* Annotations */}
      <circle cx={toX(peakI)} cy={toY(data[peakI])} r={5} fill="#EF4444" />
      <text x={toX(peakI)} y={toY(data[peakI]) - 12} textAnchor="middle" fontSize="8" fill="#EF4444" fontWeight="700">Pic Oct (El Niño)</text>
      <circle cx={toX(troughI)} cy={toY(data[troughI])} r={5} fill="#6B7280" />
      <text x={toX(troughI) + 38} y={toY(data[troughI]) + 14} textAnchor="middle" fontSize="8" fill="#6B7280" fontWeight="700">Creux Jan (déstockage)</text>
    </svg>
  );
}

// ── Produit card ──────────────────────────────────────────────────────────────
function ProduitCard({ emoji, name, price, change, stars, sentiment }: {
  emoji: string; name: string; price: string; change: string; stars: number; sentiment: string;
}) {
  const up = change.startsWith("+");
  const flat = change === "0%";
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <span className="text-2xl">{emoji}</span>
        <span className="text-sm font-semibold text-gray-800">{name}</span>
      </div>
      <div className="text-2xl font-bold text-gray-900">{price}</div>
      <div className={`flex items-center gap-1 text-xs font-medium ${up ? "text-green-600" : flat ? "text-gray-500" : "text-red-500"}`}>
        {up ? <TrendingUp className="w-3 h-3" /> : flat ? <Minus className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
        {change}
      </div>
      <div className="flex gap-0.5">
        {Array.from({ length: 4 }, (_, i) => (
          <span key={i} className={`text-base ${i < stars ? "text-amber-400" : "text-gray-200"}`}>★</span>
        ))}
      </div>
      <div className="text-xs text-gray-500">{sentiment}</div>
      <button className="mt-1 text-xs text-[#2E7D32] font-medium hover:underline text-left">Voir détail →</button>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function PrixMarchePage() {
  const [tab, setTab] = useState<Tab>("Cours actuels");
  const [histPeriod, setHistPeriod] = useState("1 an");

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-[#F8FBF8]">
      <Topbar />
      <div className="p-6 flex-1">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
          <span>Commerce</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-[#2E7D32] font-medium">Prix Marchés</span>
        </div>
        <h1 className="text-xl font-bold text-gray-800 mb-5">Tableau de bord des prix de marché</h1>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 border-b border-gray-200">
          {TABS.map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                tab === t ? "border-b-2 border-[#2E7D32] text-[#2E7D32]" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* ── Cours actuels ── */}
        {tab === "Cours actuels" && (
          <div className="space-y-6">
            {/* Bandeau cours en direct */}
            <div className="rounded-2xl bg-[#1B5E20] text-white p-4 flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="font-semibold text-xs">Cours en direct — 11/07/2025 à 11h42</span>
              </div>
              <div className="flex flex-wrap gap-5 text-xs">
                <span><span className="text-gray-300">BCC Abidjan :</span> <strong>1 087 XOF/kg</strong> <span className="text-green-400">▲ +12 (+1,1%)</span></span>
                <span><span className="text-gray-300">London ICE :</span> <strong>£2 842/t</strong> <span className="text-green-400">▲ +48</span></span>
                <span><span className="text-gray-300">NYMEX :</span> <strong>$3 241/t</strong> <span className="text-green-400">▲ +62</span></span>
                <span><span className="text-gray-300">EUR/XOF :</span> <strong>655,96</strong></span>
              </div>
            </div>

            {/* Cartes produits */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <ProduitCard emoji="🍫" name="Cacao Grade AA" price="1 087 XOF/kg" change="+1,1%" stars={4} sentiment="Acheter / Vendre" />
              <ProduitCard emoji="🍫" name="Cacao Grade A" price="967 XOF/kg" change="+1,0%" stars={3} sentiment="Neutre" />
              <ProduitCard emoji="🥜" name="Anacarde WW240" price="950 XOF/kg" change="-0,5%" stars={3} sentiment="Neutre" />
              <ProduitCard emoji="🌴" name="Huile de palme brute" price="680 XOF/L" change="+0,3%" stars={2} sentiment="Attendre" />
              <ProduitCard emoji="🌽" name="Maïs (marché local)" price="185 XOF/kg" change="-1,2%" stars={1} sentiment="Pas urgent" />
              <ProduitCard emoji="🍚" name="Riz paddy" price="220 XOF/kg" change="0%" stars={2} sentiment="Neutre" />
            </div>

            {/* Area chart BCC 30j */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5">
              <h2 className="text-sm font-semibold text-gray-700 mb-3">Cours cacao BCC — 30 derniers jours</h2>
              <BCC30DaysSVG />
            </div>

            {/* Impact portefeuille */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5">
              <h2 className="text-sm font-semibold text-gray-700 mb-3">Impact sur portefeuille AGRIFRIK</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-[#F8FBF8]">
                      {["Produit", "Stock actuel", "Valeur au cours actuel", "Variation vs hier", "Variation vs M-30j"].map(h => (
                        <th key={h} className="text-left px-3 py-2 font-medium text-gray-600">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { p: "Cacao Grade AA", s: "18 448 kg", v: "20 053 076 XOF", vh: "+221 376 XOF ↑", vm: "+918 000 XOF ↑", up: true },
                      { p: "Cacao Grade A", s: "5 186 kg", v: "5 014 862 XOF", vh: "+51 860 XOF ↑", vm: "+258 700 XOF ↑", up: true },
                      { p: "Anacarde WW240", s: "2 390 kg", v: "2 270 500 XOF", vh: "-11 950 XOF ↓", vm: "stable", up: false },
                    ].map(row => (
                      <tr key={row.p} className="border-t border-gray-50 hover:bg-gray-50">
                        <td className="px-3 py-2 font-medium text-gray-800">{row.p}</td>
                        <td className="px-3 py-2 text-gray-500">{row.s}</td>
                        <td className="px-3 py-2 font-bold text-gray-900">{row.v}</td>
                        <td className={`px-3 py-2 font-medium ${row.up ? "text-green-600" : "text-red-500"}`}>{row.vh}</td>
                        <td className={`px-3 py-2 font-medium ${row.up ? "text-green-600" : "text-gray-400"}`}>{row.vm}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ── Historique ── */}
        {tab === "Historique" && (
          <div className="space-y-6">
            {/* Sélecteur période */}
            <div className="flex gap-2">
              {["1 semaine", "1 mois", "3 mois", "1 an", "Personnalisé"].map(p => (
                <button
                  key={p}
                  onClick={() => setHistPeriod(p)}
                  className={`px-3 py-1.5 text-xs rounded-xl font-medium transition-colors ${
                    histPeriod === p
                      ? "bg-[#2E7D32] text-white"
                      : "bg-white border border-gray-200 text-gray-600 hover:border-[#2E7D32] hover:text-[#2E7D32]"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>

            {/* Graphique 12 mois */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5">
              <h2 className="text-sm font-semibold text-gray-700 mb-3">Cours cacao BCC — 12 mois</h2>
              <Hist12MonthsSVG />
            </div>

            {/* Statistiques */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { label: "Plus haut", value: "1 124 XOF/kg", sub: "15/10/2024", color: "text-red-600" },
                { label: "Plus bas", value: "980 XOF/kg", sub: "01/07/2024", color: "text-blue-600" },
                { label: "Moyenne 12 mois", value: "1 058 XOF/kg", sub: "prix moyen", color: "text-gray-700" },
                { label: "Volatilité", value: "34 XOF/kg", sub: "écart-type", color: "text-amber-600" },
                { label: "Tendance", value: "+10,9%", sub: "sur 12 mois ⬆️", color: "text-green-600" },
              ].map(s => (
                <div key={s.label} className="rounded-2xl border border-gray-100 bg-white p-5">
                  <div className="text-xs text-gray-500 mb-1">{s.label}</div>
                  <div className={`text-lg font-bold ${s.color}`}>{s.value}</div>
                  <div className="text-xs text-gray-400">{s.sub}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Alertes prix ── */}
        {tab === "Alertes prix" && (
          <div className="space-y-6">
            {/* Alertes configurées */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold text-gray-700">Alertes configurées</h2>
                <button className="flex items-center gap-1 bg-[#2E7D32] text-white rounded-xl text-xs font-medium px-3 py-1.5">
                  <Plus className="w-3 h-3" />
                  Créer une alerte prix
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-[#F8FBF8]">
                      {["Produit", "Type", "Seuil", "Cours actuel", "Statut", "Action"].map(h => (
                        <th key={h} className="text-left px-3 py-2 font-medium text-gray-600">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { p: "Cacao AA", t: "Alerte vente", s: "> 1 100 XOF/kg", c: "1 087 XOF/kg", st: "⏳ En attente", diff: "-13 XOF" },
                      { p: "Cacao Grade A", t: "Alerte achat", s: "< 950 XOF/kg", c: "967 XOF/kg", st: "⏳ En attente", diff: "+17 XOF" },
                      { p: "Anacarde WW240", t: "Alerte vente", s: "> 980 XOF/kg", c: "950 XOF/kg", st: "⏳ En attente", diff: "-30 XOF" },
                    ].map(row => (
                      <tr key={row.p} className="border-t border-gray-50 hover:bg-gray-50">
                        <td className="px-3 py-2 font-medium text-gray-800">{row.p}</td>
                        <td className="px-3 py-2">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${row.t.includes("vente") ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}`}>{row.t}</span>
                        </td>
                        <td className="px-3 py-2 font-medium text-gray-700">{row.s}</td>
                        <td className="px-3 py-2">{row.c}</td>
                        <td className="px-3 py-2">
                          <span className="text-amber-600 flex items-center gap-1"><Clock className="w-3 h-3" />{row.st} <span className="text-gray-400">({row.diff})</span></span>
                        </td>
                        <td className="px-3 py-2">
                          <button className="text-[#2E7D32] text-xs font-medium hover:underline">Modifier</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Historique alertes déclenchées */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5">
              <h2 className="text-sm font-semibold text-gray-700 mb-3">Historique des alertes déclenchées</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-[#F8FBF8]">
                      {["Date", "Produit", "Alerte", "Cours déclenché", "Action prise"].map(h => (
                        <th key={h} className="text-left px-3 py-2 font-medium text-gray-600">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { d: "15/10/2024", p: "Cacao AA", a: "> 1 100 XOF/kg", c: "1 124 XOF/kg", act: "Vente contrat Barry Callebaut 24 t" },
                      { d: "28/05/2025", p: "Anacarde WW240", a: "> 980 XOF/kg", c: "995 XOF/kg", act: "Vente 2,4 t WW240 à San-Pédro" },
                    ].map(row => (
                      <tr key={row.d + row.p} className="border-t border-gray-50 hover:bg-gray-50">
                        <td className="px-3 py-2 text-gray-500">{row.d}</td>
                        <td className="px-3 py-2 font-medium text-gray-800">{row.p}</td>
                        <td className="px-3 py-2 text-amber-700">{row.a}</td>
                        <td className="px-3 py-2 font-medium text-red-600">{row.c}</td>
                        <td className="px-3 py-2 text-gray-600">{row.act}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Clock({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
