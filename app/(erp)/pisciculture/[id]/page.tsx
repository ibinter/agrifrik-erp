import Topbar from "../../../components/Topbar";
import { ArrowLeft, Fish, Droplets, TrendingUp, Calendar, CheckCircle } from "lucide-react";
import Link from "next/link";

export default async function PiscicultureDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-[#F8FBF8]">
      <Topbar breadcrumb={["Production", "Pisciculture", `Bassin ${id}`]} />

      <main className="flex-1 p-6 space-y-6 max-w-7xl mx-auto w-full">

        {/* En-tête bandeau vert */}
        <div className="rounded-2xl overflow-hidden" style={{ background: "#1B5E20" }}>
          <div className="p-6 text-white">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <Fish className="w-6 h-6 text-green-300" />
                  <h1 className="text-xl font-bold">PSC-001 — Bassin piscicole principal EXP-001</h1>
                </div>
                <p className="text-sm text-green-100 mt-2">
                  <span className="font-medium text-white">Espèces :</span> Oreochromis niloticus (Tilapia) + Clarias gariepinus (Silure)
                </p>
                <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-green-100 mt-1">
                  <span><span className="font-medium text-white">Superficie :</span> 800 m² (40m × 20m × 2m prof.)</span>
                  <span><span className="font-medium text-white">Volume :</span> 1 200 m³</span>
                </div>
                <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-green-100 mt-1">
                  <span><span className="font-medium text-white">Mise en eau :</span> 15/09/2022</span>
                  <span><span className="font-medium text-white">Alimentation :</span> Pompe solaire Sassandra secondaire</span>
                </div>
              </div>
              <div className="flex flex-col gap-2 shrink-0">
                <span className="inline-flex items-center gap-1.5 bg-green-700 text-green-100 text-xs font-medium px-3 py-1.5 rounded-full">
                  <CheckCircle className="w-3.5 h-3.5 text-green-300" />
                  Actif
                </span>
                <span className="inline-flex items-center gap-1.5 bg-green-700 text-green-100 text-xs font-medium px-3 py-1.5 rounded-full">
                  <Calendar className="w-3.5 h-3.5 text-green-300" />
                  Cycle en cours : Lot 7 (15/03/2025)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 5 KPI */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { label: "Effectif actuel", value: "4 200 tilapias + 180 silures", sub: "Lot 7 en cours" },
            { label: "Biomasse estimée (11/07)", value: "1 240 kg", sub: "Estimation lot 7" },
            { label: "FCR actuel", value: "1,72", sub: "Objectif <1,80 ✅" },
            { label: "CA pisciculture H1 2025", value: "868 000 XOF", sub: "Chiffre d'affaires" },
            { label: "Récolte prévue", value: "Octobre 2025", sub: "~1 800 kg estimés" },
          ].map((kpi) => (
            <div key={kpi.label} className="rounded-2xl border border-gray-100 bg-white p-5">
              <p className="text-xs text-gray-500 mb-1">{kpi.label}</p>
              <p className="text-base font-bold text-[#2E7D32]">{kpi.value}</p>
              <p className="text-xs text-gray-400 mt-0.5">{kpi.sub}</p>
            </div>
          ))}
        </div>

        {/* Qualité eau SVG */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-semibold text-gray-800 mb-1 flex items-center gap-2">
            <Droplets className="w-4 h-4 text-[#2E7D32]" />
            Évolution qualité eau PSC-001 — 30 derniers jours
          </h2>
          <p className="text-xs text-gray-500 mb-4">T° (°C), O2 dissous (mg/L), pH</p>

          <div className="overflow-x-auto">
            <svg viewBox="0 0 700 240" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-3xl">
              {/* Background zones optimal */}
              <rect x="60" y="40" width="620" height="160" fill="#f0fdf4" rx="4" opacity="0.5" />
              {/* Grid */}
              {[0, 1, 2, 3, 4].map((i) => {
                const y = 40 + i * 40;
                return <line key={i} x1="60" y1={y} x2="680" y2={y} stroke="#e5e7eb" strokeWidth="1" />;
              })}
              <line x1="60" y1="200" x2="680" y2="200" stroke="#d1d5db" strokeWidth="1.5" />
              <line x1="60" y1="40" x2="60" y2="200" stroke="#d1d5db" strokeWidth="1.5" />

              {/* Day labels (30 points, show every 5) */}
              {[1, 5, 10, 15, 20, 25, 30].map((d) => {
                const x = 60 + ((d - 1) / 29) * 620;
                return <text key={d} x={x} y="216" textAnchor="middle" fontSize="9" fill="#9ca3af">J{d}</text>;
              })}

              {/* Temperature line (red) — 26-29°C range, normalize 24-32 -> y */}
              {(() => {
                const temps = [26.5,27.0,27.2,27.8,28.0,28.3,28.1,27.9,28.5,28.8,29.0,28.7,28.4,28.0,27.8,28.2,28.5,28.9,29.1,28.6,28.3,27.9,27.6,28.0,28.3,28.7,29.0,28.4,27.8,27.5];
                const toY = (v: number) => 200 - ((v - 24) / 8) * 160;
                const pts = temps.map((v, i) => `${60 + (i / 29) * 620},${toY(v)}`).join(" ");
                return <polyline points={pts} fill="none" stroke="#ef4444" strokeWidth="2" strokeLinejoin="round" />;
              })()}

              {/* O2 line (blue) — 5.5-6.8, normalize 4-9 */}
              {(() => {
                const o2 = [6.2,6.4,6.5,6.3,6.1,5.8,5.9,6.2,6.4,6.5,6.3,6.0,5.7,5.5,5.6,5.8,6.0,6.2,6.3,6.1,5.9,6.0,6.2,6.3,6.5,6.6,6.8,6.5,6.3,6.4];
                const toY = (v: number) => 200 - ((v - 4) / 5) * 160;
                const pts = o2.map((v, i) => `${60 + (i / 29) * 620},${toY(v)}`).join(" ");
                return <polyline points={pts} fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinejoin="round" />;
              })()}

              {/* pH line (green) — 7.1-7.6, normalize 6-9 */}
              {(() => {
                const ph = [7.3,7.2,7.3,7.4,7.3,7.4,7.5,7.4,7.3,7.2,7.3,7.4,7.5,7.6,7.5,7.4,7.3,7.2,7.3,7.4,7.5,7.4,7.3,7.2,7.3,7.2,7.3,7.4,7.3,7.2];
                const toY = (v: number) => 200 - ((v - 6) / 3) * 160;
                const pts = ph.map((v, i) => `${60 + (i / 29) * 620},${toY(v)}`).join(" ");
                return <polyline points={pts} fill="none" stroke="#22c55e" strokeWidth="2" strokeLinejoin="round" />;
              })()}

              {/* Legend */}
              <line x1="80" y1="15" x2="100" y2="15" stroke="#ef4444" strokeWidth="2" />
              <text x="105" y="19" fontSize="10" fill="#374151">T° (°C)</text>
              <line x1="180" y1="15" x2="200" y2="15" stroke="#3b82f6" strokeWidth="2" />
              <text x="205" y="19" fontSize="10" fill="#374151">O2 (mg/L)</text>
              <line x1="295" y1="15" x2="315" y2="15" stroke="#22c55e" strokeWidth="2" />
              <text x="320" y="19" fontSize="10" fill="#374151">pH</text>
              <rect x="420" y="8" width="60" height="14" fill="#f0fdf4" stroke="#86efac" strokeWidth="1" rx="2" />
              <text x="450" y="18" textAnchor="middle" fontSize="9" fill="#15803d">Zone optimale</text>
            </svg>
          </div>

          {/* Tableau mesures hebdomadaires */}
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#F8FBF8]">
                  {["Semaine", "Temp. (°C)", "O2 (mg/L)", "pH", "Turbidité", "Alerte"].map((h) => (
                    <th key={h} className="text-left px-4 py-2.5 font-medium text-gray-600">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  { sem: "S1 Jun", temp: "27,4", o2: "6,2", ph: "7,3", turb: "Faible", alerte: "✅ Bon", warn: false },
                  { sem: "S2 Jun", temp: "28,1", o2: "5,8", ph: "7,4", turb: "Faible", alerte: "✅ Bon", warn: false },
                  { sem: "S3 Jun", temp: "29,2", o2: "5,4", ph: "7,5", turb: "Modérée", alerte: "🟡 O2 limite", warn: true },
                  { sem: "S4 Jun", temp: "27,8", o2: "6,1", ph: "7,3", turb: "Faible", alerte: "✅ Bon", warn: false },
                  { sem: "S1 Jul", temp: "28,0", o2: "6,3", ph: "7,2", turb: "Faible", alerte: "✅ Bon", warn: false },
                ].map((row) => (
                  <tr key={row.sem} className={`hover:bg-gray-50 ${row.warn ? "bg-amber-50" : ""}`}>
                    <td className="px-4 py-2.5 font-medium text-gray-700">{row.sem}</td>
                    <td className="px-4 py-2.5 text-gray-600">{row.temp}</td>
                    <td className={`px-4 py-2.5 ${row.warn ? "text-amber-600 font-medium" : "text-gray-600"}`}>{row.o2}</td>
                    <td className="px-4 py-2.5 text-gray-600">{row.ph}</td>
                    <td className="px-4 py-2.5 text-gray-600">{row.turb}</td>
                    <td className="px-4 py-2.5">{row.alerte}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Suivi croissance Lot 7 SVG */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-semibold text-gray-800 mb-1 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[#2E7D32]" />
            Suivi de croissance Lot 7 — Mise en charge 15/03/2025 à aujourd&apos;hui
          </h2>
          <p className="text-xs text-gray-500 mb-4">Poids moyen tilapia (g)</p>

          <div className="overflow-x-auto">
            <svg viewBox="0 0 640 200" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-2xl">
              {/* Grid */}
              {[0, 100, 200, 300, 400].map((v) => {
                const y = 160 - (v / 500) * 140;
                return (
                  <g key={v}>
                    <line x1="60" y1={y} x2="600" y2={y} stroke="#e5e7eb" strokeWidth="1" />
                    <text x="52" y={y + 4} textAnchor="end" fontSize="9" fill="#9ca3af">{v}</text>
                  </g>
                );
              })}
              <line x1="60" y1="160" x2="600" y2="160" stroke="#d1d5db" strokeWidth="1.5" />
              <line x1="60" y1="20" x2="60" y2="160" stroke="#d1d5db" strokeWidth="1.5" />

              {/* Objectif ligne pointillée orange 420g */}
              {(() => {
                const y = 160 - (420 / 500) * 140;
                return (
                  <>
                    <line x1="60" y1={y} x2="600" y2={y} stroke="#E65100" strokeWidth="1.5" strokeDasharray="6,4" />
                    <text x="605" y={y + 4} fontSize="9" fill="#E65100">420g</text>
                  </>
                );
              })()}

              {/* Croissance line */}
              {(() => {
                const data: [string, number, number][] = [
                  ["15/03", 25, 0],
                  ["12/04", 82, 1],
                  ["10/05", 176, 2],
                  ["07/06", 265, 3],
                  ["05/07", 295, 4],
                  ["15/10", 435, 7],
                ];
                const maxWeek = 7;
                const pts = data.map(([, v, w]) => `${60 + (w / maxWeek) * 540},${160 - (v / 500) * 140}`);
                return (
                  <>
                    <polyline points={pts.join(" ")} fill="none" stroke="#2E7D32" strokeWidth="2.5" strokeLinejoin="round" />
                    {/* Projection pointillée pour dernier segment */}
                    {data.slice(-2).map(([, v, w], i) => {
                      if (i === 0) return null;
                      const prevData = data[data.length - 2];
                      const x1 = 60 + (prevData[2] / maxWeek) * 540;
                      const y1 = 160 - (prevData[1] / 500) * 140;
                      const x2 = 60 + (w / maxWeek) * 540;
                      const y2 = 160 - (v / 500) * 140;
                      return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#2E7D32" strokeWidth="2" strokeDasharray="5,4" />;
                    })}
                    {data.map(([label, v, w], i) => {
                      const x = 60 + (w / maxWeek) * 540;
                      const y = 160 - (v / 500) * 140;
                      const isProj = i === data.length - 1;
                      return (
                        <g key={label}>
                          <circle cx={x} cy={y} r="4" fill={isProj ? "#E65100" : "#2E7D32"} />
                          <text x={x} y={y - 8} textAnchor="middle" fontSize="9" fill={isProj ? "#E65100" : "#2E7D32"}>{v}g</text>
                        </g>
                      );
                    })}
                    {/* X labels */}
                    {data.map(([label, , w]) => (
                      <text key={label} x={60 + (w / maxWeek) * 540} y="175" textAnchor="middle" fontSize="8" fill="#9ca3af">{label}</text>
                    ))}
                  </>
                );
              })()}

              {/* Legend */}
              <line x1="70" y1="12" x2="90" y2="12" stroke="#2E7D32" strokeWidth="2.5" />
              <circle cx="80" cy="12" r="3" fill="#2E7D32" />
              <text x="95" y="16" fontSize="10" fill="#374151">Poids réel (g)</text>
              <line x1="200" y1="12" x2="220" y2="12" stroke="#E65100" strokeWidth="1.5" strokeDasharray="5,3" />
              <text x="225" y="16" fontSize="10" fill="#374151">Objectif récolte 420g</text>
              <circle cx="370" cy="12" r="4" fill="#E65100" />
              <text x="378" y="16" fontSize="10" fill="#374151">Projection Oct 2025</text>
            </svg>
          </div>

          <div className="mt-3 p-3 bg-green-50 rounded-xl border border-green-100">
            <p className="text-xs text-green-800">
              <span className="font-semibold">Note :</span> Croissance conforme. À la récolte (16 semaines), poids commercial estimé 420-450 g.
            </p>
          </div>
        </div>

        {/* Alimentation et FCR */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-semibold text-gray-800 mb-1 flex items-center gap-2">
            <Fish className="w-4 h-4 text-[#2E7D32]" />
            Alimentation et FCR — Lot 7
          </h2>
          <p className="text-xs text-gray-500 mb-4">
            Tilapia Starter 2mm (0-45j) puis Tilapia Grower 3mm (&gt;45j) — PROVIMI Abidjan — Ration : 3% biomasse/jour en 2 prises (6h + 17h)
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#F8FBF8]">
                  {["Mois", "Aliment distribué", "Biomasse début", "Biomasse fin", "FCR mensuel"].map((h) => (
                    <th key={h} className="text-left px-4 py-2.5 font-medium text-gray-600">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  ["Mars 2025 (15j)", "32 kg", "105 kg", "180 kg", "0,43"],
                  ["Avril 2025", "198 kg", "180 kg", "345 kg", "1,20"],
                  ["Mai 2025", "324 kg", "345 kg", "602 kg", "1,55"],
                  ["Juin 2025", "412 kg", "602 kg", "862 kg", "1,58"],
                  ["Juil 2025 (YTD)", "155 kg", "862 kg", "1 240 kg", "0,41 (semaines)"],
                ].map((row) => (
                  <tr key={row[0]} className="hover:bg-gray-50">
                    {row.map((cell, i) => (
                      <td key={i} className={`px-4 py-2.5 ${i === 0 ? "font-medium text-gray-700" : "text-gray-600"}`}>{cell}</td>
                    ))}
                  </tr>
                ))}
                <tr className="bg-green-50 font-semibold">
                  <td className="px-4 py-2.5 text-gray-800">FCR cumulé Lot 7</td>
                  <td className="px-4 py-2.5"></td>
                  <td className="px-4 py-2.5"></td>
                  <td className="px-4 py-2.5"></td>
                  <td className="px-4 py-2.5 text-[#2E7D32] font-bold">1,72 ✅</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Productions et revenus Lot 1→7 */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[#2E7D32]" />
            Productions et revenus — Lot 1 → Lot 7
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#F8FBF8]">
                  {["Lot", "Mise en charge", "Récolte", "Biomasse récoltée", "CA"].map((h) => (
                    <th key={h} className="text-left px-4 py-2.5 font-medium text-gray-600">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  { lot: "Lot 1", mise: "Sep 2022", recolte: "Mar 2023", bio: "840 kg", ca: "420 000 XOF", current: false },
                  { lot: "Lot 2", mise: "Avr 2023", recolte: "Oct 2023", bio: "1 020 kg", ca: "510 000 XOF", current: false },
                  { lot: "Lot 3", mise: "Nov 2023", recolte: "Mai 2024", bio: "1 180 kg", ca: "590 000 XOF", current: false },
                  { lot: "Lot 4", mise: "Jun 2024", recolte: "Oct 2024", bio: "1 420 kg", ca: "710 000 XOF", current: false },
                  { lot: "Lot 5", mise: "Nov 2024", recolte: "Avr 2025", bio: "1 640 kg", ca: "820 000 XOF", current: false },
                  { lot: "Lot 6", mise: "Mai 2025", recolte: "—", bio: "En cours", ca: "—", current: false },
                  { lot: "Lot 7 (actuel)", mise: "Mar 2025", recolte: "Oct 2025 (prévu)", bio: "~1 800 kg", ca: "~900 000 XOF", current: true },
                ].map((row) => (
                  <tr key={row.lot} className={`hover:bg-gray-50 ${row.current ? "bg-green-50 font-semibold" : ""}`}>
                    <td className={`px-4 py-2.5 font-medium ${row.current ? "text-[#2E7D32]" : "text-gray-700"}`}>{row.lot}</td>
                    <td className="px-4 py-2.5 text-gray-600">{row.mise}</td>
                    <td className="px-4 py-2.5 text-gray-600">{row.recolte}</td>
                    <td className="px-4 py-2.5 text-gray-600">{row.bio}</td>
                    <td className={`px-4 py-2.5 ${row.current ? "text-[#2E7D32] font-bold" : "text-gray-600"}`}>{row.ca}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3 pb-4">
          <Link
            href="/pisciculture"
            className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 rounded-xl text-xs font-medium px-4 py-2.5 hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Retour à la pisciculture
          </Link>
          <button className="inline-flex items-center gap-2 bg-[#2E7D32] text-white rounded-xl text-xs font-medium px-4 py-2.5 hover:bg-[#1B5E20] transition-colors">
            <Droplets className="w-3.5 h-3.5" />
            Enregistrer un paramètre
          </button>
          <button className="inline-flex items-center gap-2 border border-[#2E7D32] text-[#2E7D32] rounded-xl text-xs font-medium px-4 py-2.5 hover:bg-green-50 transition-colors">
            <Calendar className="w-3.5 h-3.5" />
            Planifier la récolte
          </button>
        </div>

      </main>
    </div>
  );
}
