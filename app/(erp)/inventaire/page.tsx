"use client";

import { useState } from "react";
import Topbar from "../../components/Topbar";

const CATEGORIES = [
  { label: "Stocks cacao (fèves)", articles: "4 lots", valeur: 20262000, pct: 14.5 },
  { label: "Stocks anacarde", articles: "2 lots", valeur: 2180000, pct: 1.6 },
  { label: "Intrants & consommables", articles: "47 références", valeur: 1840000, pct: 1.3 },
  { label: "Matériels & équipements", articles: "16", valeur: 17040000, pct: 12.2 },
  { label: "Véhicules", articles: "6", valeur: 8200000, pct: 5.9 },
  { label: "Infrastructure", articles: "8", valeur: 21600000, pct: 15.5 },
  { label: "Foncier (TF estimé)", articles: "8 parcelles TF", valeur: 28600000, pct: 20.5 },
  { label: "Actifs biologiques", articles: "12 parcelles", valeur: 42000000, pct: 30.0 },
  { label: "Mobilier & informatique", articles: "24", valeur: 2076000, pct: 1.5 },
];

const STOCKS = [
  { code: "STK-CAC-AA", designation: "Cacao Grade AA", unite: "kg", theorique: 18420, reel: 18448, ecart: "+28 kg", ecartOk: true, cmup: 1100, valeur: 20292800 },
  { code: "STK-CAC-A", designation: "Cacao Grade A", unite: "kg", theorique: 5200, reel: 5186, ecart: "-14 kg", ecartOk: true, cmup: 1040, valeur: 5393440 },
  { code: "STK-ANA-WW", designation: "Anacarde WW240", unite: "kg", theorique: 2400, reel: 2390, ecart: "-10 kg", ecartOk: true, cmup: 910, valeur: 2174900 },
  { code: "STK-ANA-SW", designation: "Anacarde SW340", unite: "kg", theorique: 8, reel: 8, ecart: "=", ecartOk: true, cmup: 820, valeur: 6560 },
  { code: "STK-RIZ", designation: "Riz paddy", unite: "kg", theorique: 1800, reel: 1800, ecart: "=", ecartOk: true, cmup: 180, valeur: 324000 },
  { code: "STK-MAI", designation: "Maïs grains", unite: "kg", theorique: 2400, reel: 2400, ecart: "=", ecartOk: true, cmup: 95, valeur: 228000 },
  { code: "INT-NPK", designation: "NPK 20-10-10", unite: "kg", theorique: 4800, reel: 4780, ecart: "-20 kg", ecartOk: true, cmup: 180, valeur: 860400 },
  { code: "INT-KCl", designation: "Chlorure de potassium", unite: "kg", theorique: 240, reel: 240, ecart: "=", ecartOk: true, cmup: 215, valeur: 51600 },
  { code: "INT-RID", designation: "Ridomil Gold 68 WG", unite: "kg", theorique: 82, reel: 84, ecart: "+2 kg", ecartOk: true, cmup: 18500, valeur: 1554000 },
  { code: "INT-GAZ", designation: "Gasoil (fût 200L)", unite: "L", theorique: 1240, reel: 1218, ecart: "-22 L", ecartOk: false, cmup: 780, valeur: 949640 },
  { code: "INT-SAC", designation: "Sacs jute 60 kg", unite: "pce", theorique: 842, reel: 842, ecart: "=", ecartOk: true, cmup: 1200, valeur: 1010400 },
  { code: "MAT-PAL", designation: "Palettes bois", unite: "pce", theorique: 48, reel: 48, ecart: "=", ecartOk: true, cmup: 8500, valeur: 408000 },
  { code: "OFC-PC", designation: "Ordinateurs portables", unite: "pce", theorique: 4, reel: 4, ecart: "=", ecartOk: true, cmup: 420000, valeur: 1680000 },
  { code: "OFC-TAB", designation: "Tablettes terrain", unite: "pce", theorique: 6, reel: 6, ecart: "=", ecartOk: true, cmup: 180000, valeur: 1080000 },
  { code: "OFC-BALS", designation: "Balances homologuées", unite: "pce", theorique: 8, reel: 8, ecart: "=", ecartOk: true, cmup: 95000, valeur: 760000 },
  { code: "MAT-GE", designation: "Groupes électrogènes", unite: "pce", theorique: 2, reel: 2, ecart: "=", ecartOk: true, cmup: 3200000, valeur: 6400000 },
  { code: "OFC-MOB", designation: "Mobilier bureau", unite: "forfait", theorique: null, reel: null, ecart: "=", ecartOk: true, cmup: null, valeur: 480000 },
  { code: "INT-AUT", designation: "Autres consommables", unite: "forfait", theorique: null, reel: null, ecart: "+124 000", ecartOk: false, cmup: null, valeur: 124000 },
];

const IMMOS = [
  { code: "MAT-001", designation: "JD 6120M", achat: "Jan 2021", vo: 28400000, amort: 11360000, vnc: 17040000, taux: "10% lin.", fin: "2031" },
  { code: "MAT-002", designation: "Remorque benne 8t", achat: "Fév 2021", vo: 4200000, amort: 2100000, vnc: 2100000, taux: "10% lin.", fin: "2031" },
  { code: "MAT-003", designation: "Pulvérisateur dorsal (lot 6)", achat: "Jan 2022", vo: 1800000, amort: 1080000, vnc: 720000, taux: "20% lin.", fin: "2027" },
  { code: "MAT-004", designation: "Balance pont 60t", achat: "Avr 2020", vo: 12400000, amort: 6200000, vnc: 6200000, taux: "10% lin.", fin: "2030" },
  { code: "MAT-005", designation: "Renault T460 (camion 26t)", achat: "Mar 2022", vo: 38600000, amort: 15440000, vnc: 23160000, taux: "10% lin.", fin: "2032" },
  { code: "MAT-006", designation: "Toyota HiLux (pick-up)", achat: "Jan 2023", vo: 14800000, amort: 4440000, vnc: 10360000, taux: "10% lin.", fin: "2033" },
  { code: "MAT-007", designation: "Station météo Davis VP2", achat: "Déc 2022", vo: 1240000, amort: 496000, vnc: 744000, taux: "20% lin.", fin: "2027" },
  { code: "MAT-008", designation: "Séchoir solaire 5t", achat: "Jan 2021", vo: 3200000, amort: 1920000, vnc: 1280000, taux: "20% lin.", fin: "2026" },
  { code: "MAT-009", designation: "Séchoir solaire 8t", achat: "Jan 2022", vo: 4800000, amort: 2400000, vnc: 2400000, taux: "20% lin.", fin: "2027" },
  { code: "MAT-010", designation: "Entrepôt A (600m²)", achat: "Jan 2015", vo: 28000000, amort: 16800000, vnc: 11200000, taux: "5% lin.", fin: "2035" },
  { code: "MAT-011", designation: "Entrepôt B (200m²)", achat: "Jan 2020", vo: 8400000, amort: 2520000, vnc: 5880000, taux: "5% lin.", fin: "2040" },
  { code: "MAT-012", designation: "DJI Agras T30", achat: "Mar 2024", vo: 9200000, amort: 1840000, vnc: 7360000, taux: "20% lin.", fin: "2029" },
  { code: "MAT-013", designation: "Générateur diesel 20kVA", achat: "Jan 2021", vo: 3800000, amort: 2280000, vnc: 1520000, taux: "20% lin.", fin: "2026" },
  { code: "MAT-014", designation: "Générateur diesel 15kVA", achat: "Jan 2023", vo: 2600000, amort: 780000, vnc: 1820000, taux: "20% lin.", fin: "2028" },
  { code: "MAT-015", designation: "Broyeur déchets organiques", achat: "Fév 2022", vo: 2100000, amort: 1050000, vnc: 1050000, taux: "20% lin.", fin: "2027" },
  { code: "MAT-016", designation: "Logiciel AGRIFRIK (licence 3a)", achat: "Jan 2024", vo: 1800000, amort: 600000, vnc: 1200000, taux: "33% lin.", fin: "2027" },
];

function fmt(n: number) {
  return n.toLocaleString("fr-FR");
}

function VncChart() {
  const bars = [
    { label: "Matériels", vnc: 17040000 + 720000 + 6200000 + 1280000 + 2400000 + 744000 + 1050000, color: "#2E7D32" },
    { label: "Véhicules", vnc: 23160000 + 10360000, color: "#4CAF50" },
    { label: "Infrastructure", vnc: 11200000 + 5880000, color: "#E65100" },
    { label: "Drone", vnc: 7360000, color: "#1565C0" },
    { label: "Logiciel", vnc: 1200000 + 1520000 + 1820000, color: "#6A1B9A" },
  ];
  const max = Math.max(...bars.map((b) => b.vnc));
  const W = 480, H = 220, PL = 60, PR = 20, PT = 20, PB = 50;
  const bW = 60;
  const gap = (W - PL - PR - bars.length * bW) / (bars.length - 1);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-lg">
      {bars.map((b, i) => {
        const bH = (b.vnc / max) * (H - PT - PB);
        const x = PL + i * (bW + gap);
        const y = PT + (H - PT - PB) - bH;
        return (
          <g key={b.label}>
            <rect x={x} y={y} width={bW} height={bH} rx={4} fill={b.color} />
            <text x={x + bW / 2} y={y - 5} textAnchor="middle" fontSize={10} fill="#374151">
              {Math.round(b.vnc / 1000000)}M
            </text>
            <text x={x + bW / 2} y={H - PB + 16} textAnchor="middle" fontSize={9} fill="#6B7280">
              {b.label}
            </text>
          </g>
        );
      })}
      <line x1={PL} y1={PT} x2={PL} y2={H - PB} stroke="#E5E7EB" strokeWidth={1} />
      <line x1={PL} y1={H - PB} x2={W - PR} y2={H - PB} stroke="#E5E7EB" strokeWidth={1} />
      <text x={PL - 4} y={PT + 4} textAnchor="end" fontSize={9} fill="#9CA3AF">
        {Math.round(max / 1000000)}M
      </text>
      <text x={PL - 4} y={H - PB} textAnchor="end" fontSize={9} fill="#9CA3AF">0</text>
    </svg>
  );
}

export default function InventairePage() {
  const [tab, setTab] = useState(0);
  const [search, setSearch] = useState("");

  const tabs = ["Vue d'ensemble", "Stocks physiques", "Immobilisations"];

  const filteredStocks = STOCKS.filter((s) => {
    const q = search.toLowerCase();
    return (
      s.code.toLowerCase().includes(q) ||
      s.designation.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-[#F8FBF8]">
      <Topbar breadcrumb={["Finance", "Inventaire"]} />

      <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Inventaire annuel & valorisation des actifs</h1>
            <p className="text-sm text-gray-500 mt-0.5">Date d&apos;inventaire : 30/06/2025 — Arrêté H1 2025</p>
          </div>
          <span className="inline-flex items-center gap-2 bg-green-50 border border-green-200 text-green-800 text-xs font-semibold px-3 py-1.5 rounded-full">
            <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
            Inventaire H1 2025 — CLÔTURÉ ✅
          </span>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white border border-gray-100 rounded-xl p-1 w-fit">
          {tabs.map((t, i) => (
            <button
              key={t}
              onClick={() => setTab(i)}
              className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                tab === i ? "bg-[#2E7D32] text-white" : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* TAB 0 — Vue d'ensemble */}
        {tab === 0 && (
          <div className="space-y-5">
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                { label: "Valeur stocks totale", value: "26,4 M XOF", sub: "Stocks physiques", color: "text-[#2E7D32]" },
                { label: "Immobilisations (VNC)", value: "71,4 M XOF", sub: "16 équipements", color: "text-blue-700" },
                { label: "Actifs biologiques", value: "42,0 M XOF", sub: "Vergers cacao 17 ans", color: "text-amber-700" },
                { label: "Total actifs inventoriés", value: "139,8 M XOF", sub: "Toutes catégories", color: "text-purple-700" },
                { label: "Écart vs comptabilité", value: "+124 000 XOF", sub: "0,09% — Dans seuil ✅", color: "text-green-600" },
              ].map((k) => (
                <div key={k.label} className="rounded-2xl border border-gray-100 bg-white p-5">
                  <p className="text-xs text-gray-500">{k.label}</p>
                  <p className={`text-base font-bold mt-1 ${k.color}`}>{k.value}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{k.sub}</p>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-5">
              <h2 className="text-sm font-semibold text-gray-800 mb-4">Récapitulatif par catégorie</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-[#F8FBF8]">
                      <th className="text-left py-2 px-3 text-gray-500 font-medium rounded-l-lg">Catégorie</th>
                      <th className="text-right py-2 px-3 text-gray-500 font-medium">Nbre articles</th>
                      <th className="text-right py-2 px-3 text-gray-500 font-medium">Valeur (XOF)</th>
                      <th className="text-right py-2 px-3 text-gray-500 font-medium rounded-r-lg">% Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {CATEGORIES.map((c, i) => (
                      <tr key={i} className="border-t border-gray-50 hover:bg-gray-50">
                        <td className="py-2.5 px-3 text-gray-800">{c.label}</td>
                        <td className="py-2.5 px-3 text-right text-gray-600">{c.articles}</td>
                        <td className="py-2.5 px-3 text-right font-medium text-gray-800">{fmt(c.valeur)}</td>
                        <td className="py-2.5 px-3 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <div className="w-16 bg-gray-100 rounded-full h-1.5">
                              <div
                                className="bg-[#2E7D32] h-1.5 rounded-full"
                                style={{ width: `${Math.min((c.pct / 30) * 100, 100)}%` }}
                              />
                            </div>
                            <span className="text-gray-600 w-10 text-right">{c.pct}%</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                    <tr className="border-t-2 border-gray-200 bg-[#F8FBF8] font-semibold">
                      <td className="py-2.5 px-3 text-gray-900">TOTAL</td>
                      <td className="py-2.5 px-3 text-right text-gray-600">—</td>
                      <td className="py-2.5 px-3 text-right text-[#2E7D32]">143 798 000</td>
                      <td className="py-2.5 px-3 text-right text-gray-900">100%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 1 — Stocks physiques */}
        {tab === 1 && (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-3 items-center">
              <input
                type="text"
                placeholder="Rechercher un article..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#2E7D32] w-56"
              />
              <span className="text-xs text-gray-500">{filteredStocks.length} références</span>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-[#F8FBF8]">
                      {["Code", "Désignation", "Unité", "Théorique", "Réel", "Écart", "CMUP", "Valeur (XOF)"].map((h) => (
                        <th key={h} className="py-3 px-3 text-left text-gray-500 font-medium whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStocks.map((s) => (
                      <tr key={s.code} className="border-t border-gray-50 hover:bg-gray-50">
                        <td className="py-2.5 px-3 font-mono text-gray-700">{s.code}</td>
                        <td className="py-2.5 px-3 text-gray-800">{s.designation}</td>
                        <td className="py-2.5 px-3 text-gray-500">{s.unite}</td>
                        <td className="py-2.5 px-3 text-right text-gray-600">{s.theorique != null ? fmt(s.theorique) : "—"}</td>
                        <td className="py-2.5 px-3 text-right text-gray-800 font-medium">{s.reel != null ? fmt(s.reel) : "—"}</td>
                        <td className="py-2.5 px-3 text-center">
                          <span className={`inline-flex items-center gap-1 font-medium ${s.ecartOk ? "text-green-600" : "text-amber-600"}`}>
                            {s.ecart} {s.ecartOk ? "✅" : "⚠️"}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-right text-gray-600">{s.cmup != null ? fmt(s.cmup) : "—"}</td>
                        <td className="py-2.5 px-3 text-right font-semibold text-gray-900">{fmt(s.valeur)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2 — Immobilisations */}
        {tab === 2 && (
          <div className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: "Total valeur d'origine", value: "164,1 M XOF", color: "text-gray-800" },
                { label: "Amortissements cumulés", value: "71,3 M XOF", color: "text-red-600" },
                { label: "VNC totale", value: "93,0 M XOF", color: "text-[#2E7D32]" },
              ].map((k) => (
                <div key={k.label} className="rounded-2xl border border-gray-100 bg-white p-5">
                  <p className="text-xs text-gray-500">{k.label}</p>
                  <p className={`text-lg font-bold mt-1 ${k.color}`}>{k.value}</p>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-[#F8FBF8]">
                      {["Code", "Désignation", "Achat", "VO (XOF)", "Amort. cumulée", "VNC", "Taux", "Fin amort."].map((h) => (
                        <th key={h} className="py-3 px-3 text-left text-gray-500 font-medium whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {IMMOS.map((m) => (
                      <tr key={m.code} className="border-t border-gray-50 hover:bg-gray-50">
                        <td className="py-2.5 px-3 font-mono text-gray-700">{m.code}</td>
                        <td className="py-2.5 px-3 text-gray-800">{m.designation}</td>
                        <td className="py-2.5 px-3 text-gray-500 whitespace-nowrap">{m.achat}</td>
                        <td className="py-2.5 px-3 text-right text-gray-700">{fmt(m.vo)}</td>
                        <td className="py-2.5 px-3 text-right text-red-600">{fmt(m.amort)}</td>
                        <td className="py-2.5 px-3 text-right font-semibold text-[#2E7D32]">{fmt(m.vnc)}</td>
                        <td className="py-2.5 px-3 text-gray-500 whitespace-nowrap">{m.taux}</td>
                        <td className="py-2.5 px-3 text-center">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            parseInt(m.fin) <= 2026
                              ? "bg-orange-100 text-orange-700"
                              : parseInt(m.fin) <= 2028
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-green-50 text-green-700"
                          }`}>
                            {m.fin}
                          </span>
                        </td>
                      </tr>
                    ))}
                    <tr className="border-t-2 border-gray-200 bg-[#F8FBF8] font-semibold">
                      <td colSpan={3} className="py-2.5 px-3 text-gray-900">TOTAL</td>
                      <td className="py-2.5 px-3 text-right text-gray-900">164 140 000</td>
                      <td className="py-2.5 px-3 text-right text-red-600">71 306 000</td>
                      <td className="py-2.5 px-3 text-right text-[#2E7D32]">92 834 000</td>
                      <td colSpan={2} />
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-5">
              <h2 className="text-sm font-semibold text-gray-800 mb-4">VNC par catégorie</h2>
              <VncChart />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
