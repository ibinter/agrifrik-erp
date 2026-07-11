"use client";

import { useState } from "react";
import Topbar from "../../components/Topbar";
import {
  CheckCircle,
  Clock,
  FileText,
  Download,
  Send,
  Users,
  DollarSign,
  Shield,
  Eye,
  Search,
  TrendingUp,
  Zap,
  BarChart2,
} from "lucide-react";

/* ─── DATA ─────────────────────────────────────────────────── */

const bulletins = [
  { id: "EMP-001", nom: "Jean-Baptiste Koffi",  poste: "Directeur Général",    contrat: "CDI",        base: 1_800_000, primes: 300_000, hs: 0,       cotisations: 315_000,  net: 1_785_000, statut: "Validé" },
  { id: "EMP-002", nom: "Konan Adjoua",          poste: "Comptable Senior",      contrat: "CDI",        base: 650_000,  primes: 50_000,  hs: 0,       cotisations: 105_000,  net: 595_000,   statut: "Validé" },
  { id: "EMP-023", nom: "Ibrahim Sawadogo",      poste: "Technicien terrain",    contrat: "CDI",        base: 420_000,  primes: 30_000,  hs: 96_000,  cotisations: 81_900,   net: 464_100,   statut: "En attente" },
  { id: "EMP-004", nom: "Adjoua Messou",         poste: "RH / Admin.",           contrat: "CDI",        base: 580_000,  primes: 50_000,  hs: 0,       cotisations: 94_500,   net: 535_500,   statut: "Validé" },
  { id: "EMP-005", nom: "Bamba Oumar",           poste: "Technicien maintenance",contrat: "CDI",        base: 450_000,  primes: 30_000,  hs: 108_000, cotisations: 87_600,   net: 500_400,   statut: "En attente" },
  { id: "EMP-006", nom: "Kouassi Derrick",       poste: "Technicien",            contrat: "CDD",        base: 420_000,  primes: 30_000,  hs: 0,       cotisations: 67_500,   net: 382_500,   statut: "Validé" },
  { id: "EMP-007", nom: "Mariam Koné",           poste: "Secrétaire",            contrat: "CDD",        base: 380_000,  primes: 20_000,  hs: 0,       cotisations: 60_000,   net: 340_000,   statut: "Validé" },
  { id: "EMP-008", nom: "Ali Traoré",            poste: "Chauffeur",             contrat: "CDD",        base: 320_000,  primes: 20_000,  hs: 54_000,  cotisations: 57_100,   net: 336_900,   statut: "En attente" },
  { id: "EMP-009", nom: "Sékou Diallo",          poste: "Ouvrier agricole",      contrat: "Saisonnier", base: 180_000,  primes: 0,       hs: 0,       cotisations: 27_000,   net: 153_000,   statut: "Validé" },
  { id: "EMP-010", nom: "Fatou Bah",             poste: "Ouvrière agricole",     contrat: "Saisonnier", base: 180_000,  primes: 0,       hs: 0,       cotisations: 27_000,   net: 153_000,   statut: "Validé" },
];

const syntheseContrats = [
  { type: "CDI",         nb: 145, salaireMoyen: "185 000 XOF", masse: "26,83 M XOF", pct: 63 },
  { type: "CDD",         nb: 82,  salaireMoyen: "120 000 XOF", masse: "9,84 M XOF",  pct: 23 },
  { type: "Saisonniers", nb: 60,  salaireMoyen: "88 000 XOF",  masse: "5,28 M XOF",  pct: 12 },
  { type: "Stagiaires",  nb: null, salaireMoyen: "— (indemnités)", masse: "0,40 M XOF", pct: 2 },
];

const evolutionData = [
  { mois: "Fév",   val: 39.2 },
  { mois: "Mar",   val: 40.1 },
  { mois: "Avr",   val: 40.8 },
  { mois: "Mai",   val: 41.3 },
  { mois: "Jun",   val: 41.9 },
  { mois: "Juil",  val: 42.35 },
];

function fmt(n: number) {
  return n.toLocaleString("fr-FR") + " XOF";
}

const contratColor: Record<string, string> = {
  CDI:        "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  CDD:        "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  Saisonnier: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
};

/* ─── BAR CHART SVG ─────────────────────────────────────────── */

function MasseSalarialeChart() {
  const max = Math.max(...evolutionData.map((d) => d.val));
  const w = 480;
  const h = 140;
  const pad = { top: 16, right: 16, bottom: 32, left: 40 };
  const chartW = w - pad.left - pad.right;
  const chartH = h - pad.top - pad.bottom;
  const barW = chartW / evolutionData.length - 8;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" aria-label="Évolution masse salariale">
      {/* Y gridlines */}
      {[0, 0.25, 0.5, 0.75, 1].map((t) => {
        const y = pad.top + chartH * (1 - t);
        const label = (max * t).toFixed(1);
        return (
          <g key={t}>
            <line x1={pad.left} y1={y} x2={w - pad.right} y2={y} stroke="currentColor" strokeOpacity="0.08" strokeWidth="1" />
            <text x={pad.left - 4} y={y + 4} textAnchor="end" fontSize="9" fill="currentColor" fillOpacity="0.5">{label}M</text>
          </g>
        );
      })}

      {/* Bars */}
      {evolutionData.map((d, i) => {
        const barH = (d.val / max) * chartH;
        const x = pad.left + i * (chartW / evolutionData.length) + 4;
        const y = pad.top + chartH - barH;
        const isLast = i === evolutionData.length - 1;
        return (
          <g key={d.mois}>
            <rect
              x={x}
              y={y}
              width={barW}
              height={barH}
              rx="4"
              fill={isLast ? "#2E7D32" : "#A5D6A7"}
            />
            {isLast && (
              <text x={x + barW / 2} y={y - 4} textAnchor="middle" fontSize="9" fill="#2E7D32" fontWeight="600">
                {d.val}M
              </text>
            )}
            <text x={x + barW / 2} y={h - 8} textAnchor="middle" fontSize="9" fill="currentColor" fillOpacity="0.6">
              {d.mois}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/* ─── LINE CHART MASSE SALARIALE 2025 ──────────────────────────────────── */

const masseMensuelle = [
  { mois: "Jan", val: 3.42 },
  { mois: "Fév", val: 3.42 },
  { mois: "Mar", val: 3.42 },
  { mois: "Avr", val: 3.61 },
  { mois: "Mai", val: 3.82 },
  { mois: "Jun", val: 4.14 },
  { mois: "Jul", val: 4.14 },
];

function MasseLineChart() {
  const W = 640, H = 220;
  const pad = { top: 30, right: 24, bottom: 36, left: 52 };
  const cW = W - pad.left - pad.right;
  const cH = H - pad.top - pad.bottom;
  const minV = 3.0;
  const maxV = 4.5;
  const range = maxV - minV;
  const n = masseMensuelle.length;

  function px(i: number) { return pad.left + (i / (n - 1)) * cW; }
  function py(v: number) { return pad.top + cH - ((v - minV) / range) * cH; }

  const polyline = masseMensuelle.map((d, i) => `${px(i)},${py(d.val)}`).join(" ");
  const area = `M${px(0)},${py(masseMensuelle[0].val)} ` +
    masseMensuelle.map((d, i) => `L${px(i)},${py(d.val)}`).join(" ") +
    ` L${px(n - 1)},${pad.top + cH} L${px(0)},${pad.top + cH} Z`;

  const gridVals = [3.0, 3.5, 4.0, 4.5];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" aria-label="Évolution masse salariale 2025">
      {/* Grid */}
      {gridVals.map((v) => {
        const y = py(v);
        return (
          <g key={v}>
            <line x1={pad.left} y1={y} x2={W - pad.right} y2={y} stroke="#E5E7EB" strokeWidth="1" strokeDasharray="4 3" />
            <text x={pad.left - 6} y={y + 4} textAnchor="end" fontSize="9" fill="#9CA3AF">{v.toFixed(1)}M</text>
          </g>
        );
      })}

      {/* Area fill */}
      <path d={area} fill="#2E7D32" fillOpacity="0.08" />

      {/* Line */}
      <polyline points={polyline} fill="none" stroke="#2E7D32" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />

      {/* Points + labels */}
      {masseMensuelle.map((d, i) => {
        const x = px(i), y = py(d.val);
        const isHigh = d.val >= 4.0;
        return (
          <g key={d.mois}>
            <circle cx={x} cy={y} r="4" fill="#fff" stroke="#2E7D32" strokeWidth="2" />
            {isHigh && (
              <text x={x} y={y - 10} textAnchor="middle" fontSize="9" fill="#2E7D32" fontWeight="700">
                {d.val.toFixed(2)}M
              </text>
            )}
            <text x={x} y={H - 8} textAnchor="middle" fontSize="10" fill="#6B7280">{d.mois}</text>
          </g>
        );
      })}

      {/* Saison annotation */}
      <rect x={px(3) - 2} y={pad.top} width={px(6) - px(3) + 4} height={cH} fill="#E65100" fillOpacity="0.04" rx="4" />
      <text x={(px(3) + px(6)) / 2} y={pad.top - 6} textAnchor="middle" fontSize="8" fill="#E65100" fontWeight="600">
        Pic saison + saisonniers
      </text>
    </svg>
  );
}

/* ─── DATA MASSE SALARIALE ──────────────────────────────────────────────── */

const repartitionDepts = [
  { dept: "Production & Terrain", effectif: 8, salaireMoyen: 284_000, totalBrut: 2_272_000, pct: 54.9 },
  { dept: "Qualité & Export", effectif: 3, salaireMoyen: 290_000, totalBrut: 870_000, pct: 21.0 },
  { dept: "Administration", effectif: 2, salaireMoyen: 268_000, totalBrut: 536_000, pct: 12.9 },
  { dept: "Maintenance & Logistique", effectif: 2, salaireMoyen: 272_000, totalBrut: 544_000, pct: 13.1 },
];

/* ─── COMPOSANT PRINCIPAL ───────────────────────────────────── */

const TABS_PAIE = ["Bulletins", "Masse salariale"];

export default function PaiePage() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState(0);

  const filtered = bulletins.filter(
    (b) =>
      b.nom.toLowerCase().includes(search.toLowerCase()) ||
      b.poste.toLowerCase().includes(search.toLowerCase()) ||
      b.contrat.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <Topbar title="Paie & Rémunérations" breadcrumb={["RH", "Paie"]} />

      <div className="p-6 space-y-6">

        {/* ── KPI ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Bulletins juillet",        val: "287",              icon: FileText,   color: "#1565C0", bg: "#E3F2FD" },
            { label: "Masse salariale brute",     val: "5 222 000 XOF",   icon: DollarSign, color: "#2E7D32", bg: "#E8F5E9" },
            { label: "Charges patronales CNPS",   val: "1 122 730 XOF",   icon: Shield,     color: "#E65100", bg: "#FFF3E0" },
            { label: "Coût total employeur",      val: "6 344 730 XOF",   icon: TrendingUp, color: "#6A1B9A", bg: "#F3E5F5" },
          ].map((k) => {
            const Icon = k.icon;
            return (
              <div key={k.label} className="rounded-2xl p-4 border border-gray-100 dark:border-white/10 bg-white dark:bg-white/5 shadow-sm">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: k.bg }}>
                  <Icon className="w-5 h-5" style={{ color: k.color }} />
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">{k.label}</p>
                <p className="text-sm font-bold text-gray-800 dark:text-white mt-0.5">{k.val}</p>
              </div>
            );
          })}
        </div>

        {/* ── KPI supplémentaires masse salariale ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Masse salariale permanents", val: "4 222 000 XOF/mois", sub: "15 permanents", color: "#2E7D32", bg: "#E8F5E9" },
            { label: "Saisonniers H1", val: "1 000 000 XOF/mois", sub: "8 saisonniers (avr–sep)", color: "#E65100", bg: "#FFF3E0" },
            { label: "Charges patronales (21,5%)", val: "1 122 730 XOF", sub: "CNPS employeur", color: "#1565C0", bg: "#E3F2FD" },
            { label: "Ratio masse sal. / CA", val: "7,9% ✅", sub: "Norme secteur : <12%", color: "#00695C", bg: "#E0F2F1" },
          ].map((k) => (
            <div key={k.label} className="rounded-2xl p-4 border border-gray-100 bg-white shadow-sm flex flex-col gap-1">
              <p className="text-xs text-gray-500">{k.label}</p>
              <p className="text-sm font-bold mt-0.5" style={{ color: k.color }}>{k.val}</p>
              <p className="text-xs text-gray-400">{k.sub}</p>
            </div>
          ))}
        </div>

        {/* ── TABS ── */}
        <div className="flex flex-wrap gap-1 bg-white border border-gray-100 rounded-2xl p-1 shadow-sm w-fit">
          {TABS_PAIE.map((t, i) => (
            <button
              key={t}
              onClick={() => setActiveTab(i)}
              className="px-4 py-2 rounded-xl text-sm font-medium transition flex items-center gap-2"
              style={activeTab === i ? { backgroundColor: "#2E7D32", color: "#fff" } : { color: "#6B7280" }}
            >
              {i === 1 && <BarChart2 size={14} />}
              {t}
            </button>
          ))}
        </div>

        {activeTab === 0 && (<>

        {/* ── BANDEAU MOIS ── */}
        <div className="rounded-2xl p-5 text-white" style={{ background: "linear-gradient(135deg, #1B5E20 0%, #2E7D32 100%)" }}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
            <div>
              <h2 className="text-xl font-bold">Paie de Juillet 2025</h2>
              <div className="flex items-center gap-2 mt-1">
                <Clock className="w-4 h-4 opacity-80" />
                <span className="text-sm opacity-90">En préparation</span>
                <span className="text-sm opacity-60 ml-2">· Virement prévu : 25/07/2025</span>
              </div>
            </div>
            <button className="inline-flex items-center gap-2 bg-white text-green-800 font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-green-50 transition-colors self-start sm:self-auto shadow">
              <Zap className="w-4 h-4" />
              Générer tous les bulletins
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white/10 rounded-xl p-3">
              <p className="text-xs opacity-70 mb-1">Masse salariale brute</p>
              <p className="text-lg font-bold">42 350 000 XOF</p>
            </div>
            <div className="bg-white/10 rounded-xl p-3">
              <p className="text-xs opacity-70 mb-1">Charges patronales</p>
              <p className="text-lg font-bold">8 470 000 XOF</p>
            </div>
            <div className="bg-white/10 rounded-xl p-3">
              <p className="text-xs opacity-70 mb-1">Coût total employeur</p>
              <p className="text-lg font-bold">50 820 000 XOF</p>
            </div>
          </div>
        </div>

        {/* ── SYNTHÈSE PAR CONTRAT ── */}
        <div className="bg-white dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm overflow-hidden">
          <div className="flex items-center gap-2 p-5 border-b border-gray-100 dark:border-white/10">
            <Users className="w-5 h-5 text-green-700" />
            <h3 className="font-semibold text-gray-800 dark:text-white">Synthèse par type de contrat</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-white/10">
                  {["Type", "Nb employés", "Salaire moyen", "Masse salariale", "% masse"].map((h) => (
                    <th key={h} className="px-5 py-3 font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {syntheseContrats.map((s, i) => (
                  <tr key={i} className="border-b border-gray-50 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                    <td className="px-5 py-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${contratColor[s.type] ?? "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300"}`}>
                        {s.type}
                      </span>
                    </td>
                    <td className="px-5 py-3 font-medium text-gray-800 dark:text-white">{s.nb ?? "—"}</td>
                    <td className="px-5 py-3 text-gray-600 dark:text-gray-300">{s.salaireMoyen}</td>
                    <td className="px-5 py-3 font-semibold text-gray-800 dark:text-white">{s.masse}</td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden max-w-[80px]">
                          <div
                            className="h-full rounded-full bg-green-600"
                            style={{ width: `${s.pct}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400">{s.pct}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── TABLEAU BULLETINS ── */}
        <div className="bg-white dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-5 border-b border-gray-100 dark:border-white/10">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-green-700" />
              <h3 className="font-semibold text-gray-800 dark:text-white">Bulletins de salaire</h3>
              <span className="text-xs text-gray-400 ml-1">({filtered.length} résultats)</span>
            </div>
            <div className="flex flex-wrap gap-2 items-center">
              {/* Recherche */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-8 pr-3 py-1.5 text-xs rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-1 focus:ring-green-600 w-40"
                />
              </div>
              <button className="inline-flex items-center gap-1.5 bg-green-700 hover:bg-green-800 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors">
                <CheckCircle className="w-3.5 h-3.5" /> Valider tous
              </button>
              <button className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors">
                <Send className="w-3.5 h-3.5" /> Générer virements
              </button>
              <button className="inline-flex items-center gap-1.5 bg-gray-600 hover:bg-gray-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors">
                <Download className="w-3.5 h-3.5" /> Exporter CNPS
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[950px]">
              <thead>
                <tr className="text-left text-xs text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-white/10">
                  {["Employé", "Poste", "Type contrat", "Salaire base", "Primes", "HS", "Cotisations emp.", "Net à payer", "Statut", "Actions"].map((h) => (
                    <th key={h} className="px-4 py-3 font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((b) => (
                  <tr key={b.id} className="border-b border-gray-50 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                    <td className="px-4 py-3 font-medium text-gray-800 dark:text-white">{b.nom}</td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{b.poste}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${contratColor[b.contrat] ?? "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300"}`}>
                        {b.contrat}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-700 dark:text-gray-200">{b.base.toLocaleString("fr-FR")}</td>
                    <td className="px-4 py-3 text-gray-700 dark:text-gray-200">{b.primes > 0 ? b.primes.toLocaleString("fr-FR") : "—"}</td>
                    <td className="px-4 py-3 text-gray-700 dark:text-gray-200">{b.hs > 0 ? b.hs.toLocaleString("fr-FR") : "—"}</td>
                    <td className="px-4 py-3 text-red-600 dark:text-red-400">{b.cotisations.toLocaleString("fr-FR")}</td>
                    <td className="px-4 py-3 font-semibold text-gray-800 dark:text-white">{fmt(b.net)}</td>
                    <td className="px-4 py-3">
                      {b.statut === "Validé" ? (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-2.5 py-1 rounded-full">
                          <CheckCircle className="w-3 h-3" /> Validé
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 px-2.5 py-1 rounded-full">
                          <Clock className="w-3 h-3" /> En attente
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 whitespace-nowrap">
                          <Eye className="w-3.5 h-3.5" /> Voir
                        </button>
                        <button className="inline-flex items-center gap-1 text-xs font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 whitespace-nowrap">
                          <Download className="w-3.5 h-3.5" /> PDF
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── ÉVOLUTION MASSE SALARIALE ── */}
        <div className="bg-white dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm p-5">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-green-700" />
            <h3 className="font-semibold text-gray-800 dark:text-white">Évolution masse salariale — 6 derniers mois (M XOF)</h3>
          </div>
          <MasseSalarialeChart />
        </div>

        </>)}

        {/* ── ONGLET MASSE SALARIALE ── */}
        {activeTab === 1 && (
          <div className="space-y-6">

            {/* Line chart */}
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <BarChart2 className="w-5 h-5 text-green-700" />
                <h3 className="font-semibold text-gray-800">Évolution masse salariale 2025 (M XOF)</h3>
              </div>
              <div className="overflow-x-auto">
                <div style={{ minWidth: 500 }}>
                  <MasseLineChart />
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-2">
                Pic saison juin–juillet : intégration des saisonniers (8 × 125 000 = +1 000 000 XOF/mois)
              </p>
            </div>

            {/* Répartition par département */}
            <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
              <div className="flex items-center gap-2 p-5 border-b border-gray-100">
                <Users className="w-5 h-5 text-green-700" />
                <h3 className="font-semibold text-gray-800">Répartition masse salariale par département</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ backgroundColor: "#F8FBF8" }}>
                      {["Département", "Effectif", "Salaire brut moyen", "Total brut (XOF)", "% Masse"].map((h) => (
                        <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-gray-500 whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {repartitionDepts.map((r) => (
                      <tr key={r.dept} className="hover:bg-gray-50 transition">
                        <td className="px-5 py-3 font-medium text-gray-800">{r.dept}</td>
                        <td className="px-5 py-3 text-gray-700">{r.effectif}</td>
                        <td className="px-5 py-3 text-gray-700">{r.salaireMoyen.toLocaleString("fr-FR")} XOF</td>
                        <td className="px-5 py-3 font-semibold text-gray-800">{r.totalBrut.toLocaleString("fr-FR")} XOF</td>
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden max-w-[80px]">
                              <div className="h-full rounded-full" style={{ width: `${r.pct}%`, backgroundColor: "#2E7D32" }} />
                            </div>
                            <span className="text-xs text-gray-500 w-10">{r.pct}%</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {/* Total */}
                    <tr style={{ backgroundColor: "#F8FBF8" }}>
                      <td className="px-5 py-3 font-bold text-gray-900">TOTAL permanent</td>
                      <td className="px-5 py-3 font-bold text-gray-900">15</td>
                      <td className="px-5 py-3 font-bold text-gray-900">281 467 XOF</td>
                      <td className="px-5 py-3 font-bold text-gray-900">4 222 000 XOF</td>
                      <td className="px-5 py-3 font-bold text-gray-900">100%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="px-5 py-3 border-t border-gray-100 bg-amber-50">
                <p className="text-xs text-amber-700 font-medium">
                  + Saisonniers H1 (avr–sep) : 8 × 125 000 = <strong>1 000 000 XOF/mois</strong>
                </p>
              </div>
            </div>

            {/* Récapitulatif coût total */}
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100">
                💼 Récapitulatif coût employeur mensuel (juillet 2025)
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ backgroundColor: "#F8FBF8" }}>
                      {["Poste", "Montant (XOF)"].map((h) => (
                        <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-gray-500">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {[
                      { label: "Masse salariale brute permanents", val: "4 222 000" },
                      { label: "Masse salariale brute saisonniers (8 pers.)", val: "1 000 000" },
                    ].map((r) => (
                      <tr key={r.label} className="hover:bg-gray-50">
                        <td className="px-5 py-3 text-gray-700">{r.label}</td>
                        <td className="px-5 py-3 text-gray-800 font-medium">{r.val}</td>
                      </tr>
                    ))}
                    <tr className="bg-green-50">
                      <td className="px-5 py-3 font-bold text-green-800">Masse salariale brute totale</td>
                      <td className="px-5 py-3 font-bold text-green-800">5 222 000</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-5 py-3 text-red-600">Charges patronales CNPS (21,5%)</td>
                      <td className="px-5 py-3 text-red-600 font-medium">1 122 730</td>
                    </tr>
                    <tr style={{ backgroundColor: "#1B5E20" }}>
                      <td className="px-5 py-3 font-bold text-white">Coût total employeur</td>
                      <td className="px-5 py-3 font-bold text-white text-base">6 344 730</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-4 flex items-center gap-2 p-3 rounded-xl bg-green-50 border border-green-100">
                <span className="text-green-700 text-sm font-semibold">✅ Ratio masse salariale / CA : 7,9%</span>
                <span className="text-xs text-green-600">(Norme secteur agriculture : &lt;12% — performance saine)</span>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
