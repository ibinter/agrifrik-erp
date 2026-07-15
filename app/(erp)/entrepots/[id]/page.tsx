import Topbar from "../../../components/Topbar";
import { CheckCircle, ArrowLeft, Package, Thermometer, Droplets, BarChart2 } from "lucide-react";

function ClimatChart() {
  const W = 640;
  const H = 200;
  const padL = 38;
  const padR = 42;
  const padT = 16;
  const padB = 32;
  const chartW = W - padL - padR;
  const chartH = H - padT - padB;

  const temp = [
    27.1,28.0,28.4,27.8,28.2,29.0,29.3,28.7,28.5,27.9,
    27.4,27.8,28.3,28.9,29.1,28.6,28.0,27.5,27.2,27.8,
    28.4,29.0,29.4,29.8,28.9,28.3,27.7,27.4,28.0,28.2,
  ];
  const hum = [
    67,66,65,68,70,72,71,69,68,67,
    65,66,69,71,74,70,68,67,65,66,
    68,70,71,69,67,66,68,70,68,68,
  ];

  const n = temp.length;
  const tempMin = 20; const tempMax = 32;
  const humMin = 58; const humMax = 80;

  function tx(i: number) { return padL + (i / (n - 1)) * chartW; }
  function tyT(v: number) { return padT + chartH - ((v - tempMin) / (tempMax - tempMin)) * chartH; }
  function tyH(v: number) { return padT + chartH - ((v - humMin) / (humMax - humMin)) * chartH; }

  function polyline(vals: number[], ty: (v: number) => number) {
    return vals.map((v, i) => `${tx(i).toFixed(1)},${ty(v).toFixed(1)}`).join(" ");
  }

  const yH70 = tyH(70);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ fontFamily: "inherit" }}>
      <rect x={padL} y={tyT(30)} width={chartW} height={tyT(20) - tyT(30)} fill="#E8F5E9" opacity={0.6} />
      {[27, 28, 29, 30].map((v) => (
        <line key={`tg-${v}`} x1={padL} x2={padL + chartW} y1={tyT(v)} y2={tyT(v)} stroke="#E5E7EB" strokeWidth={0.5} />
      ))}
      <line x1={padL} x2={padL + chartW} y1={yH70} y2={yH70} stroke="#E65100" strokeWidth={0.8} strokeDasharray="4,3" opacity={0.5} />
      <text x={padL + chartW + 3} y={yH70 + 3} fontSize={8} fill="#E65100" opacity={0.8}>70%</text>
      <polyline points={polyline(hum, tyH)} fill="none" stroke="#1565C0" strokeWidth={1.5} strokeLinejoin="round" opacity={0.75} />
      {hum.map((v, i) => v >= 74 ? (
        <circle key={i} cx={tx(i)} cy={tyH(v)} r={4} fill="#E65100" opacity={0.9} />
      ) : null)}
      <polyline points={polyline(temp, tyT)} fill="none" stroke="#2E7D32" strokeWidth={1.8} strokeLinejoin="round" />
      <line x1={padL} x2={padL} y1={padT} y2={padT + chartH} stroke="#D1D5DB" strokeWidth={0.8} />
      <line x1={padL} x2={padL + chartW} y1={padT + chartH} y2={padT + chartH} stroke="#D1D5DB" strokeWidth={0.8} />
      {[26, 28, 30].map((v) => (
        <text key={`tl-${v}`} x={padL - 5} y={tyT(v) + 3} textAnchor="end" fontSize={8} fill="#2E7D32">{v}deg</text>
      ))}
      <text x={10} y={padT + chartH / 2} textAnchor="middle" fontSize={8} fill="#2E7D32" transform={`rotate(-90,10,${padT + chartH / 2})`}>T deg C</text>
      {[62, 68, 74].map((v) => (
        <text key={`hl-${v}`} x={padL + chartW + 4} y={tyH(v) + 3} fontSize={8} fill="#1565C0">{v}%</text>
      ))}
      <text x={W - 8} y={padT + chartH / 2} textAnchor="middle" fontSize={8} fill="#1565C0" transform={`rotate(90,${W - 8},${padT + chartH / 2})`}>HR%</text>
      {[1, 5, 10, 15, 20, 25, 30].map((d) => (
        <text key={d} x={tx(d - 1)} y={padT + chartH + 12} textAnchor="middle" fontSize={8} fill="#9CA3AF">J{d}</text>
      ))}
      <circle cx={padL + 10} cy={padT - 4} r={3} fill="#2E7D32" />
      <text x={padL + 16} y={padT - 1} fontSize={9} fill="#2E7D32">Temperature (deg C)</text>
      <circle cx={padL + 140} cy={padT - 4} r={3} fill="#1565C0" opacity={0.75} />
      <text x={padL + 146} y={padT - 1} fontSize={9} fill="#1565C0">Humidite relative (%)</text>
      <circle cx={padL + 270} cy={padT - 4} r={3} fill="#E65100" />
      <text x={padL + 276} y={padT - 1} fontSize={9} fill="#E65100">Alerte HR &gt; 70%</text>
    </svg>
  );
}

function PlanEntrepot() {
  const W = 700;
  const H = 380;
  const mL = 50; const mT = 40; const mR = 30; const mB = 50;
  const bW = W - mL - mR;
  const bH = H - mT - mB;
  const alleeY = mT + bH * 0.45;
  const alleeH = bH * 0.12;

  type Zone = {
    x: number; y: number; w: number; h: number;
    label: string; sub: string; surface: string; stock: string;
    fill: string; fillOp: number; textC: string; hatch?: boolean;
  };

  const zones: Zone[] = [
    { x: mL, y: mT, w: bW * 0.40, h: alleeY - mT, label: "Zone A", sub: "Cacao Grade AA", surface: "192 m2", stock: "23 634 kg", fill: "#1B5E20", fillOp: 0.85, textC: "#fff" },
    { x: mL + bW * 0.40, y: mT, w: bW * 0.15, h: alleeY - mT, label: "Zone B", sub: "Anacarde WW240", surface: "72 m2", stock: "842 kg", fill: "#4CAF50", fillOp: 0.6, textC: "#1B5E20" },
    { x: mL + bW * 0.55, y: mT, w: bW * 0.20, h: alleeY - mT, label: "Zone C", sub: "Intrants phyto", surface: "48 m2", stock: "Etageres", fill: "#E65100", fillOp: 0.35, textC: "#7C2D12" },
    { x: mL + bW * 0.75, y: mT, w: bW * 0.25, h: alleeY - mT, label: "Zone D", sub: "Engrais", surface: "48 m2", stock: "KCl, Uree", fill: "#1565C0", fillOp: 0.3, textC: "#1e3a5f" },
    { x: mL, y: alleeY + alleeH, w: bW * 0.35, h: mT + bH - (alleeY + alleeH), label: "Zone E", sub: "Consommables", surface: "48 m2", stock: "Sacs, materiels", fill: "#6B7280", fillOp: 0.2, textC: "#374151" },
    { x: mL + bW * 0.35, y: alleeY + alleeH, w: bW * 0.65, h: mT + bH - (alleeY + alleeH), label: "Zone F", sub: "Libre (disponible)", surface: "72 m2", stock: "", fill: "#F3F4F6", fillOp: 1, textC: "#9CA3AF", hatch: true },
  ];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ fontFamily: "inherit" }}>
      <defs>
        <pattern id="hatch" patternUnits="userSpaceOnUse" width="8" height="8" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="8" stroke="#D1D5DB" strokeWidth="1.5" />
        </pattern>
      </defs>
      <text x={mL} y={20} fontSize={11} fontWeight="600" fill="#374151">Plan ENT-001 — Amenagement interieur (24m x 20m)</text>
      <rect x={mL} y={mT} width={bW} height={bH} fill="#F9FAFB" stroke="#374151" strokeWidth={2} rx={2} />
      {zones.map((z) => (
        <g key={z.label}>
          <rect x={z.x + 1} y={z.y + 1} width={z.w - 2} height={z.h - 2} fill={z.hatch ? "url(#hatch)" : z.fill} opacity={z.hatch ? 1 : z.fillOp} rx={2} />
          {!z.hatch && <rect x={z.x + 1} y={z.y + 1} width={z.w - 2} height={z.h - 2} fill="transparent" stroke={z.fill} strokeWidth={1} opacity={0.4} rx={2} />}
          <text x={z.x + z.w / 2} y={z.y + z.h / 2 - 12} textAnchor="middle" fontSize={10} fontWeight="700" fill={z.hatch ? "#9CA3AF" : z.textC}>{z.label}</text>
          <text x={z.x + z.w / 2} y={z.y + z.h / 2 + 2} textAnchor="middle" fontSize={8.5} fill={z.hatch ? "#9CA3AF" : z.textC}>{z.sub}</text>
          <text x={z.x + z.w / 2} y={z.y + z.h / 2 + 14} textAnchor="middle" fontSize={8} fill={z.hatch ? "#9CA3AF" : z.textC} opacity={0.8}>{z.surface}</text>
          {z.stock && <text x={z.x + z.w / 2} y={z.y + z.h / 2 + 25} textAnchor="middle" fontSize={7.5} fill={z.hatch ? "#9CA3AF" : z.textC} opacity={0.75}>{z.stock}</text>}
        </g>
      ))}
      <rect x={mL} y={alleeY} width={bW} height={alleeH} fill="#FEF9C3" stroke="#CA8A04" strokeWidth={0.6} strokeDasharray="4,3" />
      <text x={mL + bW / 2} y={alleeY + alleeH / 2 + 4} textAnchor="middle" fontSize={9} fill="#92400E" fontStyle="italic">Allee centrale — 3 m</text>
      <rect x={mL + bW / 2 - 18} y={mT + bH - 4} width={36} height={8} fill="#F59E0B" rx={2} />
      <text x={mL + bW / 2} y={mT + bH + 16} textAnchor="middle" fontSize={8} fill="#92400E">Porte principale (Sud)</text>
      <rect x={mL + bW / 2 - 12} y={mT - 4} width={24} height={8} fill="#FCD34D" rx={2} />
      <text x={mL + bW / 2} y={mT - 10} textAnchor="middle" fontSize={8} fill="#92400E">Porte secondaire (N)</text>
      <polygon points={`${mL + bW - 20},${mT + 18} ${mL + bW - 12},${mT + 30} ${mL + bW - 28},${mT + 30}`} fill="#EF4444" />
      <text x={mL + bW - 20} y={mT + 42} textAnchor="middle" fontSize={7.5} fill="#991B1B">EN-TEMP-001</text>
      {[mL + 24, mL + bW * 0.52].map((cx, i) => (
        <g key={i}>
          <circle cx={cx} cy={mT + bH - 18} r={6} fill="#FBBF24" stroke="#D97706" strokeWidth={1} />
          <text x={cx} y={mT + bH - 15} textAnchor="middle" fontSize={7} fill="#7C3AED" fontWeight="700">CO2</text>
        </g>
      ))}
      {[
        { fill: "#1B5E20", label: "Zone A — Cacao AA" },
        { fill: "#4CAF50", label: "Zone B — Anacarde" },
        { fill: "#E65100", label: "Zone C — Intrants" },
        { fill: "#1565C0", label: "Zone D — Engrais" },
        { fill: "#6B7280", label: "Zone E — Consommables" },
      ].map((l, i) => (
        <g key={i}>
          <rect x={mL + i * 118} y={H - 16} width={10} height={10} fill={l.fill} opacity={0.75} rx={2} />
          <text x={mL + i * 118 + 14} y={H - 7} fontSize={8} fill="#6B7280">{l.label}</text>
        </g>
      ))}
    </svg>
  );
}

export default async function EntrepotDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const mouvements = [
    { date: "11/07", type: "Mise en sechage", produit: "LOT-047 (ferm. terminee)", qte: "+964 kg", ref: "LOT-2025-047", operateur: "Ibrahim S.", positif: true },
    { date: "08/07", type: "Sortie export", produit: "Cacao AA (BL-008)", qte: "-3 400 kg", ref: "VNT-2025-009", operateur: "Ibrahim S.", positif: false },
    { date: "01/07", type: "Sortie export", produit: "Cacao AA (BL-007)", qte: "-4 000 kg", ref: "VNT-2025-007", operateur: "Ibrahim S.", positif: false },
    { date: "28/06", type: "Entree", produit: "KCl 60% (6 sacs)", qte: "+300 kg", ref: "ACH-2025-020", operateur: "Ibrahim S.", positif: true },
  ];

  const stockageParams = [
    { param: "Temperature", optimal: "20-30 deg C", actuel: "28,2 deg C" },
    { param: "Humidite relative", optimal: "< 70%", actuel: "68%" },
    { param: "Humidite feves", optimal: "< 8%", actuel: "7,4% (lot en cours)" },
    { param: "Duree stockage max", optimal: "< 6 mois", actuel: "3,2 mois (LOT-041)" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Topbar title={`Entrepot ${id}`} breadcrumb={["Logistique", "Entrepots", `Entrepot ${id}`]} />
      <div className="flex-1 p-6 space-y-5 max-w-screen-xl mx-auto w-full">

        {/* Bandeau en-tete */}
        <div className="rounded-2xl overflow-hidden" style={{ background: "#1B5E20" }}>
          <div className="p-4 sm:p-6">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-white/70 text-xs font-mono">ENT-001</span>
                  <span className="bg-green-400/20 text-green-200 text-[10px] font-medium rounded-full px-2 py-0.5 flex items-center gap-1">
                    <CheckCircle size={10} /> Operationnel
                  </span>
                </div>
                <h1 className="text-xl font-bold text-white">Entrepot de stockage principal</h1>
                <p className="text-green-200 text-sm mt-1">EXP-001 Zone logistique, Lot C — Soubre sous-prefecture</p>
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { label: "Superficie", value: "480 m2" },
                    { label: "Dimensions", value: "24m x 20m x 5,5m" },
                    { label: "Capacite nominale", value: "60 t (palettes 65 kg)" },
                    { label: "Construction", value: "2021 — Beton + zinc" },
                  ].map((item) => (
                    <div key={item.label}>
                      <p className="text-green-300 text-[10px]">{item.label}</p>
                      <p className="text-white font-semibold text-xs mt-0.5">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white/10 rounded-xl p-4 text-right min-w-[200px]">
                <p className="text-green-200 text-[10px]">Taux d occupation</p>
                <p className="text-white text-3xl font-bold mt-1">39,4%</p>
                <p className="text-green-300 text-xs mt-1">23,6t / 60t</p>
                <div className="mt-2 bg-white/20 rounded-full h-2 w-full">
                  <div className="bg-green-300 h-2 rounded-full" style={{ width: "39.4%" }} />
                </div>
                <p className="text-green-200 text-[10px] mt-1.5">36,4t disponibles (60,7%)</p>
              </div>
            </div>
          </div>
        </div>

        {/* KPI */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { Icon: Package, label: "Stock actuel", value: "23,6t", sub: "cacao + anacarde + intrants", color: "#2E7D32" },
            { Icon: BarChart2, label: "Capacite libre", value: "36,4t", sub: "60,7% disponible", color: "#1565C0" },
            { Icon: Thermometer, label: "Temperature interieure", value: "28,2 deg C", sub: "Sonde EN-TEMP-001", color: "#E65100" },
            { Icon: Droplets, label: "Humidite relative", value: "68%", sub: "Optimal < 70% pour cacao", color: "#1565C0" },
          ].map((k) => (
            <div key={k.label} className="rounded-2xl border border-gray-100 bg-white p-5">
              <div className="flex items-center gap-2 mb-2">
                <k.Icon size={14} style={{ color: k.color }} />
                <p className="text-[11px] text-gray-500 leading-tight">{k.label}</p>
              </div>
              <p className="text-xl font-bold" style={{ color: k.color }}>{k.value}</p>
              <p className="text-[10px] text-gray-400 mt-0.5">{k.sub}</p>
            </div>
          ))}
        </div>

        {/* Plan entrepot */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-semibold text-gray-800 mb-4">Plan de l entrepot</h2>
          <div className="overflow-x-auto">
            <PlanEntrepot />
          </div>
        </div>

        {/* Conditions de stockage */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-800">Conditions de stockage — 30 derniers jours</h2>
            <span className="text-[10px] text-gray-400">Source : EN-TEMP-001</span>
          </div>
          <div className="overflow-x-auto mb-4">
            <ClimatChart />
          </div>
          <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-2.5 flex items-start gap-2 mb-4">
            <span className="text-amber-600 text-xs mt-0.5">Warning</span>
            <p className="text-xs text-amber-800">
              <span className="font-semibold">J15 — HR 74% (pic de pluie)</span> — Action corrective : aeration forcee 4h, retour a 68%.
            </p>
          </div>
          <div className="rounded-xl border border-gray-100 overflow-hidden">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-[#F8FBF8] border-b border-gray-100">
                  {["Parametre", "Optimal (CNRA)", "Actuel", "Statut"].map((h) => (
                    <th key={h} className="text-left text-[10px] font-semibold text-gray-500 uppercase tracking-wide px-3 py-2.5 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {stockageParams.map((r, i) => (
                  <tr key={i} className={`border-b border-gray-50 ${i % 2 !== 0 ? "bg-gray-50/30" : ""}`}>
                    <td className="px-3 py-2.5 font-medium text-gray-800 whitespace-nowrap">{r.param}</td>
                    <td className="px-3 py-2.5 text-gray-600 whitespace-nowrap">{r.optimal}</td>
                    <td className="px-3 py-2.5 font-semibold text-gray-800 whitespace-nowrap">{r.actuel}</td>
                    <td className="px-3 py-2.5 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 text-[10px] font-medium text-green-700 bg-green-50 rounded-full px-2 py-0.5">
                        <CheckCircle size={9} /> Bon
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Historique mouvements */}
        <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-800">Historique des entrees / sorties</h2>
            <span className="text-xs text-gray-400">30 derniers jours</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-[#F8FBF8] border-b border-gray-100">
                  {["Date", "Type", "Produit", "Qte", "Reference", "Operateur"].map((h) => (
                    <th key={h} className="text-left text-[10px] font-semibold text-gray-500 uppercase tracking-wide px-3 py-2.5 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {mouvements.map((m, i) => (
                  <tr key={i} className={`border-b border-gray-50 hover:bg-gray-50 transition-colors ${i % 2 !== 0 ? "bg-gray-50/30" : ""}`}>
                    <td className="px-3 py-2.5 font-mono text-[11px] text-gray-600 whitespace-nowrap">{m.date}</td>
                    <td className="px-3 py-2.5 whitespace-nowrap">
                      <span className={`inline-block text-[10px] font-medium rounded-full px-2 py-0.5 ${m.positif ? "bg-green-50 text-green-700" : "bg-orange-50 text-orange-700"}`}>
                        {m.type}
                      </span>
                    </td>
                    <td className="px-3 py-2.5 font-medium text-gray-800 whitespace-nowrap">{m.produit}</td>
                    <td className={`px-3 py-2.5 font-bold whitespace-nowrap ${m.positif ? "text-green-700" : "text-orange-700"}`}>{m.qte}</td>
                    <td className="px-3 py-2.5 font-mono text-[11px] text-gray-500 whitespace-nowrap">{m.ref}</td>
                    <td className="px-3 py-2.5 text-gray-700 whitespace-nowrap">{m.operateur}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3">
          <a href="/entrepots" className="inline-flex items-center gap-2 text-xs font-medium text-gray-600 border border-gray-200 rounded-xl px-4 py-2.5 bg-white hover:bg-gray-50 transition-colors">
            <ArrowLeft size={13} />
            Retour aux entrepots
          </a>
          <button className="inline-flex items-center gap-2 bg-[#2E7D32] text-white rounded-xl text-xs font-medium px-4 py-2.5 hover:bg-[#1B5E20] transition-colors">
            Enregistrer un mouvement
          </button>
          <button className="inline-flex items-center gap-2 border border-[#2E7D32] text-[#2E7D32] rounded-xl text-xs font-medium px-4 py-2.5 hover:bg-green-50 transition-colors">
            Voir le stock
          </button>
        </div>

      </div>
    </div>
  );
}