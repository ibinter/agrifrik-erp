import Topbar from "../../../components/Topbar";

export default async function ElevageDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="min-h-screen bg-[#F8FBF8]">
      <Topbar breadcrumb={["Production", "Élevage", `Troupeau ${id}`]} />

      <div className="p-6 max-w-6xl mx-auto space-y-6">

        {/* ── En-tête ── */}
        <div className="rounded-2xl bg-[#1B5E20] text-white p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-1">
              <p className="text-green-300 text-xs font-medium uppercase tracking-wider">Fiche Élevage</p>
              <h1 className="text-2xl font-bold">ELV-001 — Volailles pondeuses + chair</h1>
              <p className="text-green-100 mt-2 text-sm">
                <span className="font-semibold">Espèce :</span> Gallus gallus domesticus — Race Cobb 500 (chair) + Lohmann Brown (ponte)
              </p>
              <div className="flex flex-wrap gap-4 mt-2 text-sm text-green-100">
                <span><span className="font-semibold">Effectif :</span> 180 sujets totaux</span>
                <span><span className="font-semibold">Mise en place :</span> Lot mars 2025</span>
              </div>
            </div>
            <div className="flex flex-col gap-2 items-end">
              <span className="inline-flex items-center gap-1.5 bg-green-700 border border-green-500 text-green-100 text-xs font-medium px-3 py-1.5 rounded-xl">
                ✅ Zootechnie RA
              </span>
              <span className="text-green-300 text-xs">Pharmacovigilance : à jour 2025</span>
            </div>
          </div>
        </div>

        {/* ── 4 KPI ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Effectif actuel", value: "178 sujets", sub: "2 mortalités — Taux survie 98,9%", icon: "✅", color: "text-green-700" },
            { label: "Production œufs J-7", value: "714 œufs", sub: "Taux de ponte 85% des 120 pondeuses", icon: "✅", color: "text-green-700" },
            { label: "CA volailles H1 2025", value: "312 000 XOF", sub: "Cumul semestre 1", icon: "", color: "text-blue-700" },
            { label: "Prochain acte vétérinaire", value: "20/07/2025", sub: "Rappel Newcastle", icon: "", color: "text-orange-600" },
          ].map((kpi) => (
            <div key={kpi.label} className="rounded-2xl border border-gray-100 bg-white p-5 flex flex-col gap-1">
              <p className="text-xs text-gray-500">{kpi.label}</p>
              <p className={`text-lg font-bold ${kpi.color}`}>
                {kpi.icon && <span className="mr-1">{kpi.icon}</span>}{kpi.value}
              </p>
              <p className="text-xs text-gray-400">{kpi.sub}</p>
            </div>
          ))}
        </div>

        {/* ── Composition du troupeau ── */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">Composition ELV-001</h2>
          <div className="flex flex-wrap gap-8 items-center">
            {/* Donut SVG */}
            <svg viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg" className="w-48 h-48 shrink-0">
              {/* Cobb 500 : 60/180 = 33,7% → angle 121° */}
              {/* Lohmann : 120/180 = 66,7% → angle 240° */}
              {(() => {
                const cx = 120, cy = 120, r = 90, inner = 54;
                // Cobb 500 — 33.7% starting at -90°
                const cobb = (60 / 180) * 2 * Math.PI;
                const lohm = (120 / 180) * 2 * Math.PI;
                const startAngle = -Math.PI / 2;

                const arc = (sa: number, ea: number, ro: number, ri: number) => {
                  const x1 = cx + ro * Math.cos(sa), y1 = cy + ro * Math.sin(sa);
                  const x2 = cx + ro * Math.cos(ea), y2 = cy + ro * Math.sin(ea);
                  const x3 = cx + ri * Math.cos(ea), y3 = cy + ri * Math.sin(ea);
                  const x4 = cx + ri * Math.cos(sa), y4 = cy + ri * Math.sin(sa);
                  const large = ea - sa > Math.PI ? 1 : 0;
                  return `M ${x1} ${y1} A ${ro} ${ro} 0 ${large} 1 ${x2} ${y2} L ${x3} ${y3} A ${ri} ${ri} 0 ${large} 0 ${x4} ${y4} Z`;
                };

                const a0 = startAngle;
                const a1 = startAngle + cobb;
                const a2 = startAngle + cobb + lohm;

                return (
                  <>
                    <path d={arc(a0, a1, r, inner)} fill="#1B5E20" />
                    <path d={arc(a1, a2, r, inner)} fill="#4CAF50" />
                    <text x={cx} y={cy - 6} textAnchor="middle" fontSize="22" fontWeight="700" fill="#1B5E20">180</text>
                    <text x={cx} y={cy + 12} textAnchor="middle" fontSize="10" fill="#555">sujets</text>
                    {/* Labels */}
                    <text x={cx - 10} y={cy - 68} textAnchor="middle" fontSize="9" fill="#1B5E20" fontWeight="600">33,7%</text>
                    <text x={cx + 74} y={cy + 40} textAnchor="middle" fontSize="9" fill="#388E3C" fontWeight="600">66,4%</text>
                  </>
                );
              })()}
              {/* Légende donut */}
              <rect x="20" y="210" width="12" height="12" rx="2" fill="#1B5E20" />
              <text x="36" y="220" fontSize="9" fill="#555">Cobb 500</text>
              <rect x="110" y="210" width="12" height="12" rx="2" fill="#4CAF50" />
              <text x="126" y="220" fontSize="9" fill="#555">Lohmann Brown</text>
            </svg>

            {/* Tableau composition */}
            <div className="flex-1 min-w-0">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-[#F8FBF8]">
                    {["Catégorie", "Nb", "Âge", "Objectif"].map((h) => (
                      <th key={h} className="text-left px-3 py-2.5 text-gray-500 font-medium">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {[
                    { cat: "Poulets chair Cobb 500", nb: "60", age: "18 sem. (prêt abattage août)", obj: "2,2 kg vif/sujet" },
                    { cat: "Poules pondeuses Lohmann Brown", nb: "120", age: "28 sem. (pleine ponte)", obj: "85% taux ponte" },
                    { cat: "Total", nb: "180", age: "—", obj: "—" },
                  ].map((r) => (
                    <tr key={r.cat} className={`hover:bg-gray-50 ${r.cat === "Total" ? "font-semibold bg-green-50" : ""}`}>
                      <td className="px-3 py-2.5 text-gray-700">{r.cat}</td>
                      <td className="px-3 py-2.5 text-gray-600">{r.nb}</td>
                      <td className="px-3 py-2.5 text-gray-500">{r.age}</td>
                      <td className="px-3 py-2.5 text-gray-500">{r.obj}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ── Suivi de croissance Cobb 500 ── */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-semibold text-gray-700">Poids moyen poulets chair — Sem 1 à 18</h2>
            <span className="text-xs text-green-700 font-medium bg-green-50 border border-green-100 px-3 py-1 rounded-xl">
              ICM : 1,68 — Standard Cobb &lt;1,80 ✅
            </span>
          </div>
          <svg viewBox="0 0 640 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            {(() => {
              // Réalisé
              const realise = [
                { s: 1, v: 0.2 }, { s: 4, v: 0.9 }, { s: 8, v: 1.8 },
                { s: 12, v: 2.4 }, { s: 16, v: 3.1 }, { s: 18, v: 3.4 },
              ];
              // Standard Cobb 500 (approximation linéaire)
              const standard = [
                { s: 1, v: 0.18 }, { s: 4, v: 0.85 }, { s: 8, v: 1.7 },
                { s: 12, v: 2.3 }, { s: 16, v: 3.0 }, { s: 18, v: 3.2 },
              ];

              const startX = 50, startY = 10, chartH = 160, chartW = 570;
              const maxS = 18, maxV = 4;

              const toX = (s: number) => startX + (s / maxS) * chartW;
              const toY = (v: number) => startY + chartH - (v / maxV) * chartH;

              const pathD = (pts: {s:number,v:number}[]) =>
                pts.map((p, i) => `${i === 0 ? "M" : "L"} ${toX(p.s)} ${toY(p.v)}`).join(" ");

              return (
                <g>
                  {/* Grid */}
                  {[0, 1, 2, 3, 4].map((v) => {
                    const y = toY(v);
                    return (
                      <g key={v}>
                        <line x1={startX} y1={y} x2={startX + chartW} y2={y} stroke="#f0f0f0" strokeWidth="1" />
                        <text x={startX - 6} y={y + 4} textAnchor="end" fontSize="9" fill="#bbb">{v}kg</text>
                      </g>
                    );
                  })}

                  {/* X axis labels */}
                  {[1, 4, 8, 12, 16, 18].map((s) => (
                    <text key={s} x={toX(s)} y={startY + chartH + 14} textAnchor="middle" fontSize="9" fill="#888">S{s}</text>
                  ))}

                  {/* Standard Cobb — pointillé */}
                  <path d={pathD(standard)} fill="none" stroke="#e53935" strokeWidth="1.5" strokeDasharray="5,3" />

                  {/* Réalisé */}
                  <path d={pathD(realise)} fill="none" stroke="#2E7D32" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  {realise.map((p) => (
                    <circle key={p.s} cx={toX(p.s)} cy={toY(p.v)} r="4" fill="#2E7D32" stroke="white" strokeWidth="1.5" />
                  ))}

                  {/* Légende */}
                  <line x1={startX} y1={startY + chartH + 30} x2={startX + 20} y2={startY + chartH + 30} stroke="#2E7D32" strokeWidth="2" />
                  <text x={startX + 26} y={startY + chartH + 34} fontSize="9" fill="#555">Réalisé</text>
                  <line x1={startX + 110} y1={startY + chartH + 30} x2={startX + 130} y2={startY + chartH + 30} stroke="#e53935" strokeWidth="1.5" strokeDasharray="4,2" />
                  <text x={startX + 136} y={startY + chartH + 34} fontSize="9" fill="#555">Standard Cobb 500</text>
                </g>
              );
            })()}
          </svg>
        </div>

        {/* ── Production œufs 30 jours ── */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">Taux de ponte journalier — Juin-Jul 2025</h2>
          <svg viewBox="0 0 700 180" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            {(() => {
              // 30 valeurs autour de 82-87%
              const raw = [
                85,84,85,86,87,85,84,83,85,86,87,85,86,84,82,83,85,86,85,84,
                87,86,85,84,83,85,86,85,84,85,
              ];
              const startX = 50, startY = 10, chartH = 130, chartW = 620;
              const n = raw.length;
              const minV = 78, maxV = 90;

              const toX = (i: number) => startX + (i / (n - 1)) * chartW;
              const toY = (v: number) => startY + chartH - ((v - minV) / (maxV - minV)) * chartH;

              const pathD = raw.map((v, i) => `${i === 0 ? "M" : "L"} ${toX(i)} ${toY(v)}`).join(" ");
              // Fill
              const fillD = pathD + ` L ${toX(n-1)} ${startY + chartH} L ${toX(0)} ${startY + chartH} Z`;

              return (
                <g>
                  {/* Grid */}
                  {[80, 82, 84, 86, 88].map((v) => {
                    const y = toY(v);
                    return (
                      <g key={v}>
                        <line x1={startX} y1={y} x2={startX + chartW} y2={y} stroke="#f5f5f5" strokeWidth="1" />
                        <text x={startX - 6} y={y + 4} textAnchor="end" fontSize="9" fill="#bbb">{v}%</text>
                      </g>
                    );
                  })}

                  {/* X axis */}
                  {[0, 9, 19, 29].map((i) => {
                    const labels = ["01/06", "10/06", "20/06", "01/07"];
                    return (
                      <text key={i} x={toX(i)} y={startY + chartH + 14} textAnchor="middle" fontSize="9" fill="#aaa">{labels[[0,9,19,29].indexOf(i)]}</text>
                    );
                  })}

                  {/* Objectif 85% */}
                  <line x1={startX} y1={toY(85)} x2={startX + chartW} y2={toY(85)}
                    stroke="#2E7D32" strokeWidth="1.5" strokeDasharray="5,3" opacity="0.5" />
                  <text x={startX + chartW + 4} y={toY(85) + 4} fontSize="9" fill="#2E7D32">Obj 85%</text>

                  {/* Area */}
                  <path d={fillD} fill="#4CAF50" opacity="0.12" />
                  {/* Line */}
                  <path d={pathD} fill="none" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

                  {/* Stats */}
                  <text x={startX} y={startY + chartH + 30} fontSize="9" fill="#555">
                    Moyenne : 85,0% | Objectif : 85% ✅
                  </text>
                </g>
              );
            })()}
          </svg>

          {/* Tableau bilan juin */}
          <div className="overflow-x-auto mt-4">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-[#F8FBF8]">
                  {["Semaine", "Jours", "Œufs produits", "Taux ponte", "Œufs vendus", "Revenu"].map((h) => (
                    <th key={h} className="text-left px-3 py-2.5 text-gray-500 font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  { s: "S1 Jun", j: "7j", prod: "714", taux: "85%", vendu: "700", rev: "35 000 XOF" },
                  { s: "S2 Jun", j: "7j", prod: "718", taux: "85,5%", vendu: "718", rev: "35 900 XOF" },
                  { s: "S3 Jun", j: "7j", prod: "706", taux: "84%", vendu: "706", rev: "35 300 XOF" },
                  { s: "S4 Jun", j: "7j", prod: "721", taux: "85,8%", vendu: "714", rev: "35 700 XOF" },
                ].map((r) => (
                  <tr key={r.s} className="hover:bg-gray-50">
                    <td className="px-3 py-2.5 font-medium text-gray-700">{r.s}</td>
                    <td className="px-3 py-2.5 text-gray-500">{r.j}</td>
                    <td className="px-3 py-2.5 text-gray-600">{r.prod}</td>
                    <td className="px-3 py-2.5 text-gray-600">{r.taux}</td>
                    <td className="px-3 py-2.5 text-gray-600">{r.vendu}</td>
                    <td className="px-3 py-2.5 font-medium text-green-700">{r.rev}</td>
                  </tr>
                ))}
                <tr className="bg-green-50 font-semibold">
                  <td className="px-3 py-2.5 text-gray-700">JUIN</td>
                  <td className="px-3 py-2.5 text-gray-500">28j</td>
                  <td className="px-3 py-2.5 text-gray-700">2 859</td>
                  <td className="px-3 py-2.5 text-gray-700">85,1%</td>
                  <td className="px-3 py-2.5 text-gray-700">2 838</td>
                  <td className="px-3 py-2.5 text-green-700">141 900 XOF</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Prophylaxie vétérinaire ── */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">Protocole sanitaire 2025</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-[#F8FBF8]">
                  {["Date", "Acte", "Vaccin / Médicament", "Vétérinaire", "Statut"].map((h) => (
                    <th key={h} className="text-left px-3 py-2.5 text-gray-500 font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  { date: "15/03/2025", acte: "Mise en place — bilan entrée", med: "Marquage + pesée", vet: "Dr. Coulibaly", statut: "✅ Fait", c: "text-green-700", planned: false },
                  { date: "22/03/2025", acte: "Primo-vaccination Newcastle", med: "Hitchner B1 — oculaire", vet: "Dr. Coulibaly", statut: "✅ Fait", c: "text-green-700", planned: false },
                  { date: "05/04/2025", acte: "Vaccination Gumboro", med: "Nobilis Gumboro D78", vet: "Dr. Coulibaly", statut: "✅ Fait", c: "text-green-700", planned: false },
                  { date: "19/04/2025", acte: "Rappel Newcastle", med: "Clone 30 eau de boisson", vet: "Dr. Coulibaly", statut: "✅ Fait", c: "text-green-700", planned: false },
                  { date: "20/07/2025", acte: "Rappel Newcastle", med: "Clone 30", vet: "Dr. Coulibaly", statut: "🔵 Planifié (J+9)", c: "text-blue-600", planned: true },
                  { date: "20/08/2025", acte: "Abattage lot Cobb 500 (60 sujets)", med: "—", vet: "—", statut: "🔵 Planifié", c: "text-blue-600", planned: true },
                ].map((r) => (
                  <tr key={r.date + r.acte} className={`hover:bg-gray-50 ${r.planned ? "bg-blue-50/30" : ""}`}>
                    <td className="px-3 py-2.5 text-gray-500 whitespace-nowrap">{r.date}</td>
                    <td className={`px-3 py-2.5 ${r.planned ? "font-semibold text-gray-800" : "text-gray-700"}`}>{r.acte}</td>
                    <td className="px-3 py-2.5 text-gray-600">{r.med}</td>
                    <td className="px-3 py-2.5 text-gray-500">{r.vet}</td>
                    <td className={`px-3 py-2.5 font-medium ${r.c}`}>{r.statut}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Actions ── */}
        <div className="flex flex-wrap gap-3 pb-2">
          <a href="/elevage"
            className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 rounded-xl text-xs font-medium px-4 py-2.5 hover:bg-gray-200 transition-colors">
            ← Retour à l&#39;élevage
          </a>
          <button className="inline-flex items-center gap-2 bg-[#2E7D32] text-white rounded-xl text-xs font-medium px-4 py-2.5 hover:bg-[#1B5E20] transition-colors">
            Enregistrer un acte vétérinaire
          </button>
          <button className="inline-flex items-center gap-2 bg-orange-600 text-white rounded-xl text-xs font-medium px-4 py-2.5 hover:bg-orange-700 transition-colors">
            Planifier abattage
          </button>
        </div>
      </div>
    </div>
  );
}
