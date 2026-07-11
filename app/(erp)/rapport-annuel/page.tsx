"use client";

import { useState } from "react";
import Topbar from "../../components/Topbar";

const TABS = ["Synthèse", "Production", "Finance", "Durabilité", "Export"] as const;
type Tab = typeof TABS[number];

// ─── SVG Charts ──────────────────────────────────────────────────────────────

function ProductionBarChart() {
  const data = [
    { year: "2020", val: 62 },
    { year: "2021", val: 68 },
    { year: "2022", val: 78 },
    { year: "2023", val: 86 },
    { year: "2024", val: 87.6 },
  ];
  const maxVal = 100;
  const W = 680, H = 260, padL = 48, padB = 36, padT = 24, padR = 24;
  const chartW = W - padL - padR;
  const chartH = H - padB - padT;
  const barW = 64;
  const gap = (chartW - data.length * barW) / (data.length + 1);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-2xl" aria-label="Production annuelle 5 ans">
      <line x1={padL} y1={padT} x2={padL} y2={padT + chartH} stroke="#e5e7eb" strokeWidth="1" />
      <line x1={padL} y1={padT + chartH} x2={padL + chartW} y2={padT + chartH} stroke="#e5e7eb" strokeWidth="1" />
      {[0, 25, 50, 75, 100].map((v) => {
        const y = padT + chartH - (v / maxVal) * chartH;
        return (
          <g key={v}>
            <line x1={padL} y1={y} x2={padL + chartW} y2={y} stroke="#f3f4f6" strokeWidth="1" strokeDasharray="4,3" />
            <text x={padL - 6} y={y + 4} textAnchor="end" fontSize="10" fill="#9ca3af">{v}</text>
          </g>
        );
      })}
      {data.map((d, i) => {
        const x = padL + gap + i * (barW + gap);
        const barH = (d.val / maxVal) * chartH;
        const y = padT + chartH - barH;
        const isLast = i === data.length - 1;
        return (
          <g key={d.year}>
            <rect x={x} y={y} width={barW} height={barH} rx="4"
              fill={isLast ? "#2E7D32" : "#A5D6A7"} />
            <text x={x + barW / 2} y={y - 6} textAnchor="middle" fontSize="11" fontWeight="600"
              fill={isLast ? "#1B5E20" : "#4CAF50"}>
              {d.val}t
            </text>
            <text x={x + barW / 2} y={padT + chartH + 16} textAnchor="middle" fontSize="11" fill="#6b7280">
              {d.year}
            </text>
          </g>
        );
      })}
      <text x={padL + chartW} y={padT + 16} textAnchor="end" fontSize="12" fontWeight="700" fill="#2E7D32">
        TCAM +9,1%/an
      </text>
      <text x={padL + 8} y={padT - 8} fontSize="11" fill="#6b7280">Production (tonnes)</text>
    </svg>
  );
}

function WaterfallChart() {
  const items = [
    { label: "CA", val: 95.8, type: "start" },
    { label: "Achats intrants", val: -22.4, type: "neg" },
    { label: "MO directe", val: -18.2, type: "neg" },
    { label: "Chg. indirectes", val: -12.4, type: "neg" },
    { label: "EBITDA", val: 42.8, type: "sub" },
    { label: "Amortissements", val: -6.2, type: "neg" },
    { label: "EBIT", val: 36.6, type: "sub" },
    { label: "Frais financiers", val: -4.8, type: "neg" },
    { label: "IS", val: -3.2, type: "neg" },
    { label: "Résultat net", val: 28.6, type: "end" },
  ];

  const W = 700, H = 300, padL = 48, padB = 56, padT = 24, padR = 16;
  const chartW = W - padL - padR;
  const chartH = H - padB - padT;
  const maxVal = 100;
  const barW = 52;
  const gap = (chartW - items.length * barW) / (items.length + 1);

  let running = 0;
  const bars: { x: number; y: number; h: number; color: string; label: string; val: number }[] = [];

  items.forEach((item, i) => {
    const x = padL + gap + i * (barW + gap);
    const color =
      item.type === "start" ? "#2E7D32"
      : item.type === "end" ? "#1B5E20"
      : item.type === "sub" ? "#4CAF50"
      : "#E53935";

    let base: number, top: number;
    if (item.type === "start" || item.type === "sub" || item.type === "end") {
      base = 0;
      top = item.val;
    } else {
      base = running + item.val;
      top = running;
    }
    const y = padT + chartH - (top / maxVal) * chartH;
    const h = Math.abs(item.val / maxVal) * chartH;

    bars.push({ x, y, h, color, label: item.label, val: item.val });

    if (item.type !== "sub" && item.type !== "end") {
      running += item.val;
    } else if (item.type === "sub") {
      running = item.val;
    }
  });

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-2xl" aria-label="Compte de résultat waterfall">
      <line x1={padL} y1={padT} x2={padL} y2={padT + chartH} stroke="#e5e7eb" />
      <line x1={padL} y1={padT + chartH} x2={padL + chartW} y2={padT + chartH} stroke="#e5e7eb" />
      {[0, 25, 50, 75, 100].map((v) => {
        const y = padT + chartH - (v / maxVal) * chartH;
        return (
          <g key={v}>
            <line x1={padL} y1={y} x2={padL + chartW} y2={y} stroke="#f3f4f6" strokeDasharray="4,3" />
            <text x={padL - 4} y={y + 4} textAnchor="end" fontSize="9" fill="#9ca3af">{v}M</text>
          </g>
        );
      })}
      {bars.map((b, i) => (
        <g key={i}>
          <rect x={b.x} y={b.y} width={barW} height={b.h} rx="3" fill={b.color} opacity="0.9" />
          <text x={b.x + barW / 2} y={b.y - 4} textAnchor="middle" fontSize="9" fontWeight="600"
            fill={b.color === "#E53935" ? "#E53935" : "#1B5E20"}>
            {b.val > 0 ? `+${b.val}` : b.val}M
          </text>
          <text x={b.x + barW / 2} y={padT + chartH + 14} textAnchor="middle" fontSize="8" fill="#6b7280"
            transform={`rotate(-35, ${b.x + barW / 2}, ${padT + chartH + 14})`}>
            {b.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

function RadarChart() {
  const points = [
    { label: "ODD 1\nPauvreté", score: 82, angle: -90 },
    { label: "ODD 2\nFaim", score: 88, angle: -30 },
    { label: "ODD 8\nTravail", score: 76, angle: 30 },
    { label: "ODD 13\nClimat", score: 72, angle: 90 },
    { label: "ODD 15\nTerre", score: 84, angle: 150 },
    { label: "ODD 17\nPartenariats", score: 78, angle: 210 },
  ];
  const cx = 160, cy = 160, R = 110;
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const getXY = (angle: number, r: number) => ({
    x: cx + r * Math.cos(toRad(angle)),
    y: cy + r * Math.sin(toRad(angle)),
  });

  const gridLevels = [25, 50, 75, 100];
  const dataPoints = points.map((p) => {
    const { x, y } = getXY(p.angle, (p.score / 100) * R);
    return `${x},${y}`;
  });

  return (
    <svg viewBox="0 0 320 320" className="w-full max-w-xs" aria-label="Scores ODD 2024">
      {gridLevels.map((lvl) => {
        const hexPts = points.map((p) => {
          const { x, y } = getXY(p.angle, (lvl / 100) * R);
          return `${x},${y}`;
        }).join(" ");
        return <polygon key={lvl} points={hexPts} fill="none" stroke="#e5e7eb" strokeWidth="1" />;
      })}
      {points.map((p) => {
        const outer = getXY(p.angle, R);
        return <line key={p.label} x1={cx} y1={cy} x2={outer.x} y2={outer.y} stroke="#e5e7eb" strokeWidth="1" />;
      })}
      <polygon points={dataPoints.join(" ")} fill="#2E7D32" fillOpacity="0.2" stroke="#2E7D32" strokeWidth="2" />
      {points.map((p, i) => {
        const { x, y } = getXY(p.angle, (p.score / 100) * R);
        const labelPos = getXY(p.angle, R + 22);
        const lines = p.label.split("\n");
        return (
          <g key={i}>
            <circle cx={x} cy={y} r="4" fill="#2E7D32" />
            {lines.map((line, j) => (
              <text key={j} x={labelPos.x} y={labelPos.y + j * 12 - (lines.length - 1) * 6}
                textAnchor="middle" fontSize="9" fill="#374151" fontWeight={j === 0 ? "700" : "400"}>
                {line}
              </text>
            ))}
            <text x={x} y={y - 8} textAnchor="middle" fontSize="10" fontWeight="700" fill="#1B5E20">
              {p.score}
            </text>
          </g>
        );
      })}
      {gridLevels.map((lvl) => (
        <text key={lvl} x={cx + 4} y={cy - (lvl / 100) * R + 4} fontSize="8" fill="#9ca3af">{lvl}</text>
      ))}
    </svg>
  );
}

// ─── Tab Content ──────────────────────────────────────────────────────────────

function SyntheseTab() {
  return (
    <div className="space-y-6">
      {/* Cover card premium */}
      <div className="rounded-2xl p-8 text-white" style={{ background: "linear-gradient(135deg, #1B5E20 0%, #2E7D32 60%, #388E3C 100%)" }}>
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <div className="text-xs font-medium text-green-300 uppercase tracking-widest mb-2">Rapport Annuel</div>
            <h1 className="text-3xl font-bold mb-1">AGRIFRIK SAS</h1>
            <p className="text-xl text-green-100 mb-4">Rapport Annuel 2024</p>
            <div className="space-y-1 text-sm text-green-200">
              <p>Exercice du <strong className="text-white">01/01/2024</strong> au <strong className="text-white">31/12/2024</strong></p>
              <p>Zone Soubré-Gagnoa, Région de la Nawa, Côte d&apos;Ivoire</p>
            </div>
          </div>
          <div className="text-right text-sm">
            <div className="inline-flex items-center gap-2 bg-white/10 rounded-xl px-4 py-2 border border-white/20">
              <svg viewBox="0 0 20 20" className="w-4 h-4" fill="#86efac"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
              <span className="text-green-100">Approuvé par le Conseil d&apos;Administration</span>
            </div>
            <p className="text-green-300 text-xs mt-2">28 février 2025</p>
          </div>
        </div>
        <div className="mt-6 pt-6 border-t border-white/20 grid grid-cols-2 sm:grid-cols-5 gap-4 text-center">
          {[
            { icon: "🌿", val: "87,6 t", label: "Cacao produit" },
            { icon: "💰", val: "95,8 M XOF", label: "Chiffre d'affaires" },
            { icon: "🌍", val: "5", label: "Certifications actives" },
            { icon: "👥", val: "142", label: "Coopérants soutenus" },
            { icon: "♻️", val: "0 ha", label: "Déforestation" },
          ].map((k) => (
            <div key={k.label}>
              <div className="text-2xl mb-1">{k.icon}</div>
              <div className="text-xl font-bold text-white">{k.val}</div>
              <div className="text-xs text-green-300">{k.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Message DG */}
      <div className="rounded-2xl border border-gray-100 bg-white p-6">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-full bg-[#1B5E20] flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
            DG
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Message du Directeur Général</h3>
            <blockquote className="text-gray-600 italic leading-relaxed text-sm border-l-4 border-[#2E7D32] pl-4 mb-3">
              &ldquo;L&apos;exercice 2024 a marqué un tournant pour AGRIFRIK. Malgré les aléas climatiques du 1er semestre,
              nos équipes ont su maintenir une qualité irréprochable — 96,2% de nos fèves classées Grade A ou AA.
              Nos relations avec Barry Callebaut, Cargill et Olam se consolident. La certification Rainforest Alliance
              couvre désormais 68% de nos surfaces. 2025 s&apos;annonce exceptionnelle.&rdquo;
            </blockquote>
            <p className="text-sm font-medium text-[#2E7D32]">— Koffi Amani, Directeur Général</p>
          </div>
        </div>
      </div>

      {/* 5 KPI cards grande typographie */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {[
          { emoji: "🌿", val: "87,6 t", label: "Cacao produit", sub: "+1,6 t vs 2023", color: "text-green-700" },
          { emoji: "💰", val: "95,8 M", label: "CA XOF", sub: "+11,4% YoY", color: "text-green-700" },
          { emoji: "🌍", val: "5", label: "Certifications actives", sub: "RA, UTZ, Bio, FLO, ISO", color: "text-blue-700" },
          { emoji: "👥", val: "142", label: "Coopérants soutenus", sub: "dont 48 femmes (33,8%)", color: "text-purple-700" },
          { emoji: "♻️", val: "0", label: "Déforestation", sub: "Engagement tenu ✅", color: "text-emerald-700" },
        ].map((k) => (
          <div key={k.label} className="rounded-2xl border border-gray-100 bg-white p-5 text-center">
            <div className="text-3xl mb-2">{k.emoji}</div>
            <div className={`text-2xl font-bold ${k.color}`}>{k.val}</div>
            <div className="text-xs font-medium text-gray-700 mt-1">{k.label}</div>
            <div className="text-xs text-gray-400 mt-1">{k.sub}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

const parcelles = [
  { id: "P-001", surface: "12,4 ha", culture: "Cacao", recolte: "9,8 t", rendement: "790 kg/ha", gradeAA: "65%", ra: "✅" },
  { id: "P-002", surface: "8,6 ha", culture: "Cacao", recolte: "6,9 t", rendement: "802 kg/ha", gradeAA: "68%", ra: "✅" },
  { id: "P-003", surface: "15,2 ha", culture: "Cacao", recolte: "11,2 t", rendement: "737 kg/ha", gradeAA: "58%", ra: "✅" },
  { id: "P-004", surface: "6,8 ha", culture: "Café Robusta", recolte: "4,1 t", rendement: "603 kg/ha", gradeAA: "71%", ra: "❌" },
  { id: "P-005", surface: "9,3 ha", culture: "Cacao", recolte: "7,6 t", rendement: "817 kg/ha", gradeAA: "63%", ra: "✅" },
  { id: "P-006", surface: "11,0 ha", culture: "Cacao", recolte: "8,4 t", rendement: "764 kg/ha", gradeAA: "60%", ra: "✅" },
  { id: "P-007", surface: "4,2 ha", culture: "Plantain", recolte: "18,6 t", rendement: "4 428 kg/ha", gradeAA: "—", ra: "❌" },
  { id: "P-008", surface: "7,5 ha", culture: "Cacao", recolte: "6,0 t", rendement: "800 kg/ha", gradeAA: "62%", ra: "✅" },
  { id: "P-009", surface: "13,8 ha", culture: "Cacao", recolte: "10,4 t", rendement: "754 kg/ha", gradeAA: "64%", ra: "✅" },
  { id: "P-010", surface: "5,6 ha", culture: "Café Arabica", recolte: "2,8 t", rendement: "500 kg/ha", gradeAA: "74%", ra: "✅" },
  { id: "P-011", surface: "10,2 ha", culture: "Cacao", recolte: "8,1 t", rendement: "794 kg/ha", gradeAA: "61%", ra: "✅" },
  { id: "P-012", surface: "8,0 ha", culture: "Cacao", recolte: "6,3 t", rendement: "788 kg/ha", gradeAA: "66%", ra: "❌" },
];

function ProductionTab() {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-gray-100 bg-white p-5">
        <h3 className="font-semibold text-gray-900 mb-4">Production annuelle 5 ans</h3>
        <ProductionBarChart />
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-5">
        <h3 className="font-semibold text-gray-900 mb-4">Production par parcelle 2024</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#F8FBF8]">
                {["Parcelle", "Surface", "Culture", "Récolte", "Rendement", "Grade AA%", "RA"].map((h) => (
                  <th key={h} className="text-left px-3 py-2 text-xs font-semibold text-gray-600">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {parcelles.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="px-3 py-2 font-medium text-[#2E7D32]">{p.id}</td>
                  <td className="px-3 py-2 text-gray-700">{p.surface}</td>
                  <td className="px-3 py-2 text-gray-700">{p.culture}</td>
                  <td className="px-3 py-2 font-medium">{p.recolte}</td>
                  <td className="px-3 py-2 text-gray-600">{p.rendement}</td>
                  <td className="px-3 py-2">
                    {p.gradeAA !== "—" ? (
                      <span className="inline-block bg-green-50 text-green-700 text-xs font-semibold px-2 py-0.5 rounded-full">{p.gradeAA}</span>
                    ) : <span className="text-gray-400">—</span>}
                  </td>
                  <td className="px-3 py-2 text-center">{p.ra}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-5">
        <h3 className="font-semibold text-gray-900 mb-4">Campagne cacao 2024</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Récolte principale", val: "Oct — Déc 2024", sub: "Grande campagne" },
            { label: "Petite campagne", val: "Mai — Juin 2024", sub: "Campagne intermédiaire" },
            { label: "Total fèves sèches", val: "87,6 t", sub: "Production totale certifiée" },
            { label: "Teneur humidité", val: "7,3%", sub: "Norme < 8%" },
          ].map((item) => (
            <div key={item.label} className="bg-[#F8FBF8] rounded-xl p-4">
              <div className="text-xs text-gray-500 mb-1">{item.label}</div>
              <div className="text-xl font-bold text-[#1B5E20]">{item.val}</div>
              <div className="text-xs text-gray-400 mt-1">{item.sub}</div>
            </div>
          ))}
        </div>
        <div className="mt-4 grid grid-cols-3 gap-3">
          {[
            { grade: "Grade AA", qty: "54,3 t", pct: "62%", color: "#2E7D32" },
            { grade: "Grade A", qty: "28,1 t", pct: "32%", color: "#4CAF50" },
            { grade: "Grade B", qty: "5,2 t", pct: "6%", color: "#A5D6A7" },
          ].map((g) => (
            <div key={g.grade} className="rounded-xl border-2 p-3 text-center" style={{ borderColor: g.color }}>
              <div className="text-xs font-semibold mb-1" style={{ color: g.color }}>{g.grade}</div>
              <div className="text-lg font-bold text-gray-900">{g.qty}</div>
              <div className="text-sm text-gray-500">{g.pct}</div>
            </div>
          ))}
        </div>
        <div className="mt-3 text-sm text-gray-600 bg-green-50 rounded-xl p-3">
          Indice de fève moyen : <strong>1,18 g/fève</strong> — Classement international : <strong className="text-[#2E7D32]">Qualité supérieure</strong>
        </div>
      </div>
    </div>
  );
}

function FinanceTab() {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-gray-100 bg-white p-5">
        <h3 className="font-semibold text-gray-900 mb-1">Compte de résultat 2024 (M XOF)</h3>
        <p className="text-xs text-gray-500 mb-4">Cascade du chiffre d&apos;affaires au résultat net</p>
        <WaterfallChart />
        <div className="flex gap-4 mt-2 flex-wrap">
          {[
            { color: "#2E7D32", label: "Revenus / départ" },
            { color: "#4CAF50", label: "Sous-totaux" },
            { color: "#E53935", label: "Charges" },
            { color: "#1B5E20", label: "Résultat net" },
          ].map((l) => (
            <div key={l.label} className="flex items-center gap-1.5 text-xs text-gray-600">
              <span className="w-3 h-3 rounded-sm flex-shrink-0" style={{ backgroundColor: l.color }} />
              {l.label}
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-5">
        <h3 className="font-semibold text-gray-900 mb-4">Bilan simplifié SYSCOHADA (M XOF)</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#F8FBF8]">
                <th className="text-left px-4 py-2 text-xs font-semibold text-gray-600">ACTIF</th>
                <th className="text-right px-4 py-2 text-xs font-semibold text-gray-600">Montant</th>
                <th className="text-left px-4 py-2 text-xs font-semibold text-gray-600 border-l border-gray-200">PASSIF</th>
                <th className="text-right px-4 py-2 text-xs font-semibold text-gray-600">Montant</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {[
                ["Actifs fixes (42 immos)", "71,4 M", "Capital social", "50,0 M"],
                ["Stocks (cacao + intrants)", "24,6 M", "Réserves", "18,4 M"],
                ["Créances clients", "12,8 M", "Résultat net", "28,6 M"],
                ["Trésorerie", "18,4 M", "Dettes financières", "24,2 M"],
                ["Autres actifs", "6,2 M", "Dettes fournisseurs", "12,2 M"],
              ].map((row, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-4 py-2 text-gray-700">{row[0]}</td>
                  <td className="px-4 py-2 text-right font-medium text-gray-900">{row[1]}</td>
                  <td className="px-4 py-2 text-gray-700 border-l border-gray-100">{row[2]}</td>
                  <td className="px-4 py-2 text-right font-medium text-gray-900">{row[3]}</td>
                </tr>
              ))}
              <tr className="bg-[#F8FBF8] font-bold">
                <td className="px-4 py-2 text-[#1B5E20]">TOTAL ACTIF</td>
                <td className="px-4 py-2 text-right text-[#1B5E20]">133,4 M</td>
                <td className="px-4 py-2 text-[#1B5E20] border-l border-gray-200">TOTAL PASSIF</td>
                <td className="px-4 py-2 text-right text-[#1B5E20]">133,4 M ✅</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Marge nette", val: "29,8%", sub: "Résultat / CA", trend: "▲ +2,1 pts" },
          { label: "ROE", val: "18,4%", sub: "Résultat / Capitaux propres", trend: "▲ +1,8 pts" },
          { label: "Gearing", val: "0,34", sub: "Dette nette / EBITDA", trend: "▼ -0,12" },
          { label: "Current ratio", val: "2,8", sub: "Actifs CT / Passifs CT", trend: "▲ +0,3" },
        ].map((r) => (
          <div key={r.label} className="rounded-2xl border border-gray-100 bg-white p-5">
            <div className="text-xs text-gray-500 mb-1">{r.label}</div>
            <div className="text-2xl font-bold text-[#1B5E20]">{r.val}</div>
            <div className="text-xs text-gray-400 mt-1">{r.sub}</div>
            <div className="text-xs font-semibold mt-2 text-green-600">{r.trend}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DurabiliteTab() {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-gray-100 bg-white p-5">
        <h3 className="font-semibold text-gray-900 mb-4">Scores Objectifs de Développement Durable 2024</h3>
        <div className="flex flex-wrap items-center gap-8">
          <RadarChart />
          <div className="space-y-3 flex-1 min-w-48">
            {[
              { odd: "ODD 1 — Pas de pauvreté", score: 82, color: "#E53935" },
              { odd: "ODD 2 — Faim zéro", score: 88, color: "#FF9800" },
              { odd: "ODD 8 — Travail décent", score: 76, color: "#9C27B0" },
              { odd: "ODD 13 — Action climatique", score: 72, color: "#607D8B" },
              { odd: "ODD 15 — Vie terrestre", score: 84, color: "#4CAF50" },
              { odd: "ODD 17 — Partenariats", score: 78, color: "#2196F3" },
            ].map((o) => (
              <div key={o.odd}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-700">{o.odd}</span>
                  <span className="font-bold" style={{ color: o.color }}>{o.score}/100</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className="h-2 rounded-full transition-all" style={{ width: `${o.score}%`, backgroundColor: o.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-5">
        <h3 className="font-semibold text-gray-900 mb-4">Bilan environnemental</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#F8FBF8]">
                {["Indicateur", "2023", "2024", "Évolution", "Objectif 2025"].map((h) => (
                  <th key={h} className="text-left px-3 py-2 text-xs font-semibold text-gray-600">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {[
                ["Déforestation nette", "0 ha", "0 ha", "=", "0 ha ✅"],
                ["Zones tampon préservées", "12", "14", "+2", "15"],
                ["Arbres d'ombrage", "4 240", "4 850", "+14,4%", "5 000"],
                ["Eau utilisée (m³/t cacao)", "182", "168", "-7,7% ✅", "150"],
                ["Déchets chimiques (kg)", "124", "98", "-21% ✅", "80"],
              ].map((row, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-3 py-2 text-gray-700 font-medium">{row[0]}</td>
                  <td className="px-3 py-2 text-gray-500">{row[1]}</td>
                  <td className="px-3 py-2 font-semibold text-[#1B5E20]">{row[2]}</td>
                  <td className="px-3 py-2">
                    <span className={`text-xs font-semibold ${row[3].startsWith("-") || row[3] === "=" ? "text-green-600" : "text-blue-600"}`}>{row[3]}</span>
                  </td>
                  <td className="px-3 py-2 text-gray-500">{row[4]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-5">
        <h3 className="font-semibold text-gray-900 mb-4">Impacts sociaux 2024</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { icon: "👥", val: "142", label: "Coopérants", sub: "dont 48 femmes (33,8%)" },
            { icon: "💳", val: "24,4 M XOF", label: "Micro-crédits", sub: "8 prêts accordés" },
            { icon: "📚", val: "62 h", label: "Formations dispensées", sub: "Agricoles + digitales" },
            { icon: "🏆", val: "2,84 M XOF", label: "Prime qualité RA", sub: "Distribuée aux coopérants" },
          ].map((s) => (
            <div key={s.label} className="rounded-xl bg-green-50 p-4 text-center">
              <div className="text-2xl mb-2">{s.icon}</div>
              <div className="text-lg font-bold text-[#1B5E20]">{s.val}</div>
              <div className="text-xs font-medium text-gray-700 mt-1">{s.label}</div>
              <div className="text-xs text-gray-400 mt-0.5">{s.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ExportTab() {
  const exportBtns = [
    { icon: "📄", label: "Télécharger PDF complet (24 pages)", sub: "Format A4, signé numériquement", colorClass: "border-red-200 bg-red-50 text-red-700 hover:bg-red-100" },
    { icon: "📊", label: "Export Excel données brutes", sub: "Toutes les séries de données 2024", colorClass: "border-green-200 bg-green-50 text-green-700 hover:bg-green-100" },
    { icon: "🌐", label: "Partager lien public", sub: "Lien sécurisé valide 90 jours", colorClass: "border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100" },
    { icon: "📨", label: "Envoyer aux bailleurs", sub: "FAO, BM, ANADER, partenaires", colorClass: "border-purple-200 bg-purple-50 text-purple-700 hover:bg-purple-100" },
  ];

  const sections = [
    { title: "Page de couverture", pages: "p. 1" },
    { title: "Message du Directeur Général", pages: "p. 2–3" },
    { title: "Synthèse exécutive et chiffres clés", pages: "p. 4–5" },
    { title: "Performance de production 2024", pages: "p. 6–9" },
    { title: "Résultats financiers et bilan SYSCOHADA", pages: "p. 10–14" },
    { title: "Durabilité environnementale et ODD", pages: "p. 15–18" },
    { title: "Impacts sociaux et gouvernance coopérative", pages: "p. 19–21" },
    { title: "Perspectives 2025 et annexes", pages: "p. 22–24" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {exportBtns.map((b) => (
          <button key={b.label}
            className={`flex items-center gap-4 rounded-2xl border-2 p-5 text-left transition-all hover:scale-[1.01] ${b.colorClass}`}
            onClick={() => alert("Fonctionnalité d'export à connecter au backend")}>
            <span className="text-3xl flex-shrink-0">{b.icon}</span>
            <div>
              <div className="font-semibold text-sm">{b.label}</div>
              <div className="text-xs opacity-70 mt-0.5">{b.sub}</div>
            </div>
          </button>
        ))}
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-5">
        <h3 className="font-semibold text-gray-900 mb-4">Aperçu — Structure du rapport PDF (24 pages)</h3>
        <div className="space-y-1">
          {sections.map((s, i) => (
            <div key={i} className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-[#2E7D32] text-white text-xs flex items-center justify-center font-bold flex-shrink-0">
                  {i + 1}
                </span>
                <span className="text-sm text-gray-700">{s.title}</span>
              </div>
              <span className="text-xs text-gray-400 font-mono whitespace-nowrap ml-4">{s.pages}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 bg-[#F8FBF8] rounded-xl p-4 text-xs text-gray-500">
          <strong className="text-gray-700">Format :</strong> A4 portrait · Police Helvetica Neue · Couleur principale #1B5E20
          <br />
          <em>Rapport confidentiel — ne pas diffuser sans autorisation de la Direction Générale.</em>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function RapportAnnuelPage() {
  const [activeTab, setActiveTab] = useState<Tab>("Synthèse");

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Topbar breadcrumb={["Rapports", "Rapport Annuel"]} />
      <div className="flex-1 p-6 max-w-6xl mx-auto w-full">
        {/* Tab bar */}
        <div className="flex gap-1 bg-white rounded-2xl border border-gray-100 p-1 mb-6 overflow-x-auto">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 min-w-max px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeTab === tab
                  ? "bg-[#2E7D32] text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "Synthèse" && <SyntheseTab />}
        {activeTab === "Production" && <ProductionTab />}
        {activeTab === "Finance" && <FinanceTab />}
        {activeTab === "Durabilité" && <DurabiliteTab />}
        {activeTab === "Export" && <ExportTab />}
      </div>
    </div>
  );
}
