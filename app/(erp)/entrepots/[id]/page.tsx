import Topbar from "../../../components/Topbar";
import {
  Warehouse,
  CheckCircle,
  Thermometer,
  Droplets,
  AlertTriangle,
  ArrowLeft,
  TrendingUp,
  Package,
  ClipboardList,
  ArrowUpCircle,
  ArrowDownCircle,
} from "lucide-react";

export default async function EntrepotDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const breadcrumb = ["Logistique", "Entrepôts", `Entrepôt ${id}`];

  const iotData = [
    { date: "05/07", tMin: "19,2", tMax: "26,1", tMoy: "22,4", hrMin: "62", hrMax: "74", hrMoy: "68", alerte: "Aucune", warn: false },
    { date: "06/07", tMin: "18,8", tMax: "27,2", tMoy: "23,1", hrMin: "60", hrMax: "76", hrMoy: "68", alerte: "T° max légèrement haute (>26°C 2h)", warn: true },
    { date: "07/07", tMin: "19,4", tMax: "25,8", tMoy: "22,6", hrMin: "63", hrMax: "72", hrMoy: "67", alerte: "Aucune", warn: false },
    { date: "08/07", tMin: "20,1", tMax: "24,9", tMoy: "22,5", hrMin: "65", hrMax: "71", hrMoy: "68", alerte: "Aucune", warn: false },
    { date: "09/07", tMin: "19,6", tMax: "25,2", tMoy: "22,4", hrMin: "64", hrMax: "73", hrMoy: "68", alerte: "Aucune", warn: false },
    { date: "10/07", tMin: "18,9", tMax: "24,7", tMoy: "21,8", hrMin: "62", hrMax: "70", hrMoy: "66", alerte: "Aucune", warn: false },
    { date: "11/07", tMin: "19,8", tMax: "23,4", tMoy: "21,6", hrMin: "63", hrMax: "69", hrMoy: "66", alerte: "Aucune", warn: false },
  ];

  // Points pour le SVG dual-line chart (640×200, padded 40px sides, 20px top/bottom)
  // T° range 18–28°C → mapped to y 20–180 (160px range)
  // HR range 55–80% → mapped to y 20–180
  const chartW = 640;
  const chartH = 200;
  const padX = 40;
  const padY = 20;
  const innerW = chartW - 2 * padX;
  const innerH = chartH - 2 * padY;

  const tMax_vals = [26.1, 27.2, 25.8, 24.9, 25.2, 24.7, 23.4];
  const tMoy_vals = [22.4, 23.1, 22.6, 22.5, 22.4, 21.8, 21.6];
  const hr_vals = [68, 68, 67, 68, 68, 66, 66];

  const tMin_abs = 18, tMax_abs = 28;
  const hrMin_abs = 55, hrMax_abs = 80;

  const toTY = (t: number) =>
    padY + innerH - ((t - tMin_abs) / (tMax_abs - tMin_abs)) * innerH;
  const toHRY = (h: number) =>
    padY + innerH - ((h - hrMin_abs) / (hrMax_abs - hrMin_abs)) * innerH;
  const toX = (i: number) => padX + (i / (iotData.length - 1)) * innerW;

  const tMaxPath = tMax_vals.map((v, i) => `${i === 0 ? "M" : "L"}${toX(i)},${toTY(v)}`).join(" ");
  const tMoyPath = tMoy_vals.map((v, i) => `${i === 0 ? "M" : "L"}${toX(i)},${toTY(v)}`).join(" ");
  const hrPath = hr_vals.map((v, i) => `${i === 0 ? "M" : "L"}${toX(i)},${toHRY(v)}`).join(" ");

  // Seuil T° 26°C
  const seuil26Y = toTY(26);
  const seuil70Y = toHRY(70);

  const mouvements = [
    { date: "11/07", op: "Sortie chargement", produit: "Cacao AA", qty: "-3 400 kg", opérateur: "Ibrahim S.", ref: "BL-2025-008", type: "out" },
    { date: "08/07", op: "Entrée production", produit: "Cacao AA", qty: "+964 kg", opérateur: "Ibrahim S.", ref: "LOT-2025-046", type: "in" },
    { date: "07/07", op: "Inventaire", produit: "Tous", qty: "—", opérateur: "Adjoua M.", ref: "INV-2025-07 ✅", type: "inv" },
    { date: "05/07", op: "Entrée production", produit: "Cacao AA", qty: "+912 kg", opérateur: "Ibrahim S.", ref: "LOT-2025-045", type: "in" },
    { date: "01/07", op: "Sortie chargement", produit: "Cacao AA", qty: "-4 000 kg", opérateur: "Ibrahim S.", ref: "BL-2025-007", type: "out" },
  ];

  const equipements = [
    { nom: "Bascule CERTEC CI 5000kg", serie: "CERT-2021-0847", etat: "✅ Étalonnée", entretien: "15/01/2025", prochain: "15/01/2026" },
    { nom: "Capteur IoT T°/HR (Zone A)", serie: "DV-2022-1142", etat: "✅ Opérationnel", entretien: "01/03/2025", prochain: "01/03/2026" },
    { nom: "Capteur IoT T°/HR (Zone B)", serie: "DV-2022-1143", etat: "✅ Opérationnel", entretien: "01/03/2025", prochain: "01/03/2026" },
    { nom: "Chariot élévateur 1T", serie: "Toyota-2020", etat: "✅ OK (500h)", entretien: "28/06/2025 (vidange)", prochain: "28/12/2025" },
    { nom: "Extincteur CO₂ (×4)", serie: "—", etat: "✅ Valides", entretien: "01/01/2025", prochain: "01/01/2026" },
    { nom: "Alarme incendie", serie: "Securitas CI", etat: "✅ Testée", entretien: "15/06/2025", prochain: "15/12/2025" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Topbar breadcrumb={breadcrumb} />

      <div className="max-w-6xl mx-auto px-6 py-6 space-y-6">

        {/* En-tête bandeau vert */}
        <div className="rounded-2xl bg-[#1B5E20] text-white p-6">
          <div className="flex items-start gap-5">
            <div className="bg-white/10 rounded-xl p-4">
              <Warehouse size={40} className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-xl font-bold">Entrepôt Principal — Zone Soubré Nord</h1>
              <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-green-100">
                <span className="font-mono bg-white/10 px-2 py-0.5 rounded">ENT-001</span>
                <span>Surface : 480 m² (24m × 20m)</span>
              </div>
              <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-green-100">
                <span>Responsable : <strong className="text-white">Adjoua Messou</strong></span>
                <span>Gardien : <strong className="text-white">Sékou Doumbia</strong> (24h/24)</span>
              </div>
              <div className="flex flex-wrap items-center gap-2 mt-3">
                <span className="inline-flex items-center gap-1 bg-green-400/20 border border-green-300/30 text-green-100 text-xs font-medium px-3 py-1 rounded-full">
                  <CheckCircle size={12} /> Opérationnel
                </span>
                <span className="inline-flex items-center gap-1 bg-white/10 border border-white/20 text-white text-xs font-medium px-3 py-1 rounded-full">
                  <Thermometer size={12} /> Température : 22°C ✅
                </span>
                <span className="inline-flex items-center gap-1 bg-white/10 border border-white/20 text-white text-xs font-medium px-3 py-1 rounded-full">
                  <Droplets size={12} /> HR : 68% ✅
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 5 KPI */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { label: "Taux d'occupation", value: "74,2%", sub: "356 m² sur 480 m²" },
            { label: "Stock cacao (Grade AA)", value: "18 448 kg", sub: "Sacs jute 65 kg" },
            { label: "Valeur totale stockée", value: "22 387 276", sub: "XOF" },
            { label: "Température IoT", value: "22°C ✅", sub: "Seuil : <26°C" },
            { label: "Dernier inventaire", value: "07/07/2025", sub: "Validé ✅" },
          ].map((kpi) => (
            <div key={kpi.label} className="rounded-2xl border border-gray-100 bg-white p-4">
              <p className="text-xs text-gray-500">{kpi.label}</p>
              <p className="text-lg font-bold text-[#1B5E20] mt-1 leading-tight">{kpi.value}</p>
              <p className="text-xs text-gray-400 mt-0.5">{kpi.sub}</p>
            </div>
          ))}
        </div>

        {/* Plan SVG de l'entrepôt */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6">
          <h2 className="text-sm font-semibold text-gray-800 mb-4">Plan de l&apos;entrepôt</h2>
          <div className="overflow-x-auto">
            <svg viewBox="0 0 720 400" width="100%" style={{ minWidth: 500 }} xmlns="http://www.w3.org/2000/svg" className="font-sans">
              {/* Fond */}
              <rect x="20" y="20" width="680" height="360" rx="12" fill="#F9FBF9" stroke="#C8E6C9" strokeWidth="2" />

              {/* Zone A — Cacao Grade AA (fond vert clair) */}
              <rect x="40" y="40" width="300" height="180" rx="8" fill="#DCEDC8" stroke="#7CB342" strokeWidth="1.5" />
              <text x="190" y="65" textAnchor="middle" fill="#33691E" fontSize="11" fontWeight="700">Zone A — Cacao Grade AA</text>
              <text x="190" y="82" textAnchor="middle" fill="#558B2F" fontSize="9">180 m²</text>
              {/* Palettes Zone A */}
              {[0,1,2,3,4,5,6,7,8,9,10,11].map((i) => (
                <rect key={i} x={50 + (i % 6) * 46} y={95 + Math.floor(i / 6) * 30} width="38" height="22" rx="3"
                  fill={i < 12 ? "#AED581" : "#E8F5E9"} stroke="#7CB342" strokeWidth="0.8" />
              ))}
              <text x="50" y="165" fill="#33691E" fontSize="9" fontWeight="600">18 448 kg / 18 720 kg cap.</text>
              <text x="50" y="178" fill="#558B2F" fontSize="8.5">🌡 22°C | 💧 68% HR</text>
              <rect x="240" y="168" width="70" height="18" rx="9" fill="#2E7D32" />
              <text x="275" y="181" textAnchor="middle" fill="white" fontSize="9" fontWeight="700">74% plein</text>

              {/* Zone B — Cacao Grade A & B */}
              <rect x="40" y="235" width="300" height="120" rx="8" fill="#F1F8E9" stroke="#9CCC65" strokeWidth="1.5" />
              <text x="190" y="258" textAnchor="middle" fill="#33691E" fontSize="11" fontWeight="700">Zone B — Cacao Grade A &amp; B</text>
              <text x="190" y="272" textAnchor="middle" fill="#558B2F" fontSize="9">120 m²</text>
              {[0,1,2,3,4,5,6,7].map((i) => (
                <rect key={i} x={50 + (i % 4) * 68} y={280 + Math.floor(i / 4) * 30} width="56" height="22" rx="3"
                  fill={i < 4 ? "#CCFF90" : "#F1F8E9"} stroke="#9CCC65" strokeWidth="0.8" />
              ))}
              <text x="50" y="340" fill="#33691E" fontSize="9" fontWeight="600">5 186 kg / 12 480 kg cap.</text>
              <rect x="240" y="330" width="70" height="18" rx="9" fill="#558B2F" />
              <text x="275" y="343" textAnchor="middle" fill="white" fontSize="9" fontWeight="700">42% plein</text>

              {/* Zone C — Intrants (fond orange clair) */}
              <rect x="355" y="40" width="160" height="155" rx="8" fill="#FFF3E0" stroke="#FB8C00" strokeWidth="1.5" />
              <text x="435" y="63" textAnchor="middle" fill="#E65100" fontSize="10" fontWeight="700">Zone C — Intrants</text>
              <text x="435" y="77" textAnchor="middle" fill="#EF6C00" fontSize="8.5">Phytosanitaires | 80 m²</text>
              <rect x="363" y="84" width="144" height="18" rx="4" fill="#FFE0B2" stroke="#FB8C00" strokeWidth="0.8" />
              <text x="435" y="97" textAnchor="middle" fill="#E65100" fontSize="8">⚠️ Zone sécurisée — accès restreint</text>
              <text x="363" y="123" fill="#5D4037" fontSize="8.5">▪ Super Cupravit 12 kg</text>
              <text x="363" y="138" fill="#5D4037" fontSize="8.5">▪ Ridomil 8 kg</text>
              <text x="363" y="153" fill="#5D4037" fontSize="8.5">▪ KCl 2 sacs</text>
              <text x="363" y="168" fill="#5D4037" fontSize="8">Ventilé · Réglementaire RA</text>

              {/* Zone D — Matériels (fond gris clair) */}
              <rect x="530" y="40" width="168" height="155" rx="8" fill="#F5F5F5" stroke="#BDBDBD" strokeWidth="1.5" />
              <text x="614" y="63" textAnchor="middle" fill="#424242" fontSize="10" fontWeight="700">Zone D — Matériels</text>
              <text x="614" y="77" textAnchor="middle" fill="#757575" fontSize="8.5">Emballages | 100 m²</text>
              <text x="538" y="100" fill="#5D4037" fontSize="8.5">▪ Sacs jute 65 kg : 2 400 u.</text>
              <text x="538" y="115" fill="#5D4037" fontSize="8.5">▪ Sacs PP 70 kg : 800 u.</text>
              <text x="538" y="130" fill="#5D4037" fontSize="8.5">▪ Ficelle sisal : 12 bobines</text>
              <text x="538" y="145" fill="#5D4037" fontSize="8.5">▪ Claies séchage : 4 u.</text>

              {/* Couloir central */}
              <rect x="355" y="210" width="343" height="145" rx="8" fill="white" stroke="#E0E0E0" strokeWidth="1.5" />
              <text x="527" y="235" textAnchor="middle" fill="#757575" fontSize="10" fontWeight="600">Couloir central — Zone de pesée</text>
              {/* Chariots */}
              <rect x="370" y="248" width="55" height="38" rx="6" fill="#E3F2FD" stroke="#64B5F6" strokeWidth="1" />
              <text x="397" y="265" textAnchor="middle" fill="#1565C0" fontSize="7.5" fontWeight="600">Chariot</text>
              <text x="397" y="277" textAnchor="middle" fill="#1565C0" fontSize="7">élévateur 1</text>
              <rect x="440" y="248" width="55" height="38" rx="6" fill="#E3F2FD" stroke="#64B5F6" strokeWidth="1" />
              <text x="467" y="265" textAnchor="middle" fill="#1565C0" fontSize="7.5" fontWeight="600">Chariot</text>
              <text x="467" y="277" textAnchor="middle" fill="#1565C0" fontSize="7">élévateur 2</text>
              {/* Bascule */}
              <rect x="520" y="245" width="90" height="44" rx="6" fill="#E8F5E9" stroke="#4CAF50" strokeWidth="1.2" />
              <text x="565" y="264" textAnchor="middle" fill="#2E7D32" fontSize="8" fontWeight="700">BASCULE</text>
              <text x="565" y="277" textAnchor="middle" fill="#2E7D32" fontSize="7">CERTEC CI 5 000 kg</text>
              <text x="565" y="289" textAnchor="middle" fill="#4CAF50" fontSize="7">✅ Étalonnée</text>

              {/* Porte d'entrée */}
              <rect x="325" y="335" width="20" height="40" rx="2" fill="#FFF9C4" stroke="#F9A825" strokeWidth="1.5" />
              <text x="335" y="385" textAnchor="middle" fill="#F57F17" fontSize="8" fontWeight="600">ENTRÉE</text>

              {/* Label entrepôt global */}
              <text x="360" y="15" textAnchor="middle" fill="#1B5E20" fontSize="11" fontWeight="700">ENT-001 — Entrepôt Principal Soubré Nord (480 m²)</text>
            </svg>
          </div>
        </div>

        {/* Conditions de stockage IoT */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6">
          <h2 className="text-sm font-semibold text-gray-800 mb-1">Conditions de stockage</h2>
          <p className="text-xs text-gray-400 mb-4">Capteurs IoT Davis Instruments — mesures toutes les 15 min</p>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-[#F8FBF8]">
                  {["Date", "T° min", "T° max", "T° moy", "HR min", "HR max", "HR moy", "Alerte"].map((h) => (
                    <th key={h} className="text-left font-semibold text-gray-500 px-3 py-2 first:rounded-l-lg last:rounded-r-lg whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {iotData.map((row) => (
                  <tr key={row.date} className={`border-b border-gray-50 last:border-0 ${row.warn ? "bg-orange-50" : ""}`}>
                    <td className="px-3 py-2 font-medium text-gray-700">{row.date}</td>
                    <td className="px-3 py-2 text-blue-600">{row.tMin}°C</td>
                    <td className={`px-3 py-2 font-medium ${row.warn ? "text-orange-600" : "text-red-500"}`}>{row.tMax}°C {row.warn ? "⚠️" : ""}</td>
                    <td className="px-3 py-2 text-gray-700">{row.tMoy}°C</td>
                    <td className="px-3 py-2 text-teal-600">{row.hrMin}%</td>
                    <td className="px-3 py-2 text-teal-700">{row.hrMax}%</td>
                    <td className="px-3 py-2 text-gray-700">{row.hrMoy}%</td>
                    <td className={`px-3 py-2 ${row.warn ? "text-orange-600 font-medium" : "text-gray-400"}`}>{row.alerte}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-xs text-[#2E7D32] font-medium mb-3">
            Norme stockage cacao RA : T° 18–26°C ✅ | HR 60–70% ✅
          </p>

          {/* Dual line chart SVG */}
          <div className="overflow-x-auto">
            <svg viewBox={`0 0 ${chartW} ${chartH}`} width="100%" style={{ minWidth: 480 }} xmlns="http://www.w3.org/2000/svg">
              {/* Grille */}
              {[0, 1, 2, 3, 4].map((i) => (
                <line key={i} x1={padX} x2={chartW - padX}
                  y1={padY + (innerH / 4) * i} y2={padY + (innerH / 4) * i}
                  stroke="#E8F5E9" strokeWidth="1" strokeDasharray="4,3" />
              ))}

              {/* Seuil T° 26°C */}
              <line x1={padX} x2={chartW - padX} y1={seuil26Y} y2={seuil26Y}
                stroke="#EF9A9A" strokeWidth="1" strokeDasharray="6,4" />
              <text x={chartW - padX + 3} y={seuil26Y + 4} fill="#EF5350" fontSize="8">26°C</text>

              {/* Seuil HR 70% */}
              <line x1={padX} x2={chartW - padX} y1={seuil70Y} y2={seuil70Y}
                stroke="#80CBC4" strokeWidth="1" strokeDasharray="6,4" />
              <text x={chartW - padX + 3} y={seuil70Y + 4} fill="#26A69A" fontSize="8">70%</text>

              {/* Courbe T° max */}
              <path d={tMaxPath} fill="none" stroke="#EF5350" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
              {/* Courbe T° moy */}
              <path d={tMoyPath} fill="none" stroke="#FF8A65" strokeWidth="2" strokeDasharray="5,3" strokeLinejoin="round" strokeLinecap="round" />
              {/* Courbe HR */}
              <path d={hrPath} fill="none" stroke="#26A69A" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />

              {/* Points T° max */}
              {tMax_vals.map((v, i) => (
                <circle key={i} cx={toX(i)} cy={toTY(v)} r="3.5" fill={v > 26 ? "#EF5350" : "white"} stroke="#EF5350" strokeWidth="1.5" />
              ))}
              {/* Points HR */}
              {hr_vals.map((v, i) => (
                <circle key={i} cx={toX(i)} cy={toHRY(v)} r="3.5" fill="white" stroke="#26A69A" strokeWidth="1.5" />
              ))}

              {/* Labels axe X */}
              {iotData.map((row, i) => (
                <text key={i} x={toX(i)} y={chartH - 4} textAnchor="middle" fill="#9E9E9E" fontSize="9">{row.date}</text>
              ))}

              {/* Légende */}
              <circle cx={padX} cy={chartH - 15} r="4" fill="white" stroke="#EF5350" strokeWidth="1.5" />
              <text x={padX + 8} y={chartH - 11} fill="#757575" fontSize="9">T° max</text>
              <line x1={padX + 60} x2={padX + 75} y1={chartH - 15} y2={chartH - 15} stroke="#FF8A65" strokeWidth="2" strokeDasharray="4,2" />
              <text x={padX + 78} y={chartH - 11} fill="#757575" fontSize="9">T° moy</text>
              <circle cx={padX + 130} cy={chartH - 15} r="4" fill="white" stroke="#26A69A" strokeWidth="1.5" />
              <text x={padX + 138} y={chartH - 11} fill="#757575" fontSize="9">HR%</text>
            </svg>
          </div>
        </div>

        {/* Mouvements de stock récents */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6">
          <h2 className="text-sm font-semibold text-gray-800 mb-4">Mouvements de stock récents</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#F8FBF8]">
                  {["Date", "Opération", "Produit", "Quantité", "Opérateur", "Référence"].map((h) => (
                    <th key={h} className="text-left text-xs font-semibold text-gray-500 px-4 py-2 first:rounded-l-lg last:rounded-r-lg whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {mouvements.map((m, i) => (
                  <tr key={i} className="border-b border-gray-50 last:border-0">
                    <td className="px-4 py-2.5 text-gray-500 text-xs">{m.date}</td>
                    <td className="px-4 py-2.5 font-medium text-gray-800 flex items-center gap-2">
                      {m.type === "in" && <ArrowUpCircle size={14} className="text-green-500 shrink-0" />}
                      {m.type === "out" && <ArrowDownCircle size={14} className="text-orange-500 shrink-0" />}
                      {m.type === "inv" && <ClipboardList size={14} className="text-blue-500 shrink-0" />}
                      {m.op}
                    </td>
                    <td className="px-4 py-2.5 text-gray-600">{m.produit}</td>
                    <td className={`px-4 py-2.5 font-semibold ${m.qty.startsWith("+") ? "text-green-600" : m.qty === "—" ? "text-gray-400" : "text-orange-600"}`}>{m.qty}</td>
                    <td className="px-4 py-2.5 text-gray-500">{m.opérateur}</td>
                    <td className="px-4 py-2.5 font-mono text-xs text-gray-500">{m.ref}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Maintenance & Équipements */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6">
          <h2 className="text-sm font-semibold text-gray-800 mb-4">Maintenance &amp; Équipements</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#F8FBF8]">
                  {["Équipement", "N° série", "État", "Dernier entretien", "Prochain"].map((h) => (
                    <th key={h} className="text-left text-xs font-semibold text-gray-500 px-4 py-2 first:rounded-l-lg last:rounded-r-lg whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {equipements.map((eq) => (
                  <tr key={eq.nom} className="border-b border-gray-50 last:border-0">
                    <td className="px-4 py-2.5 font-medium text-gray-800">{eq.nom}</td>
                    <td className="px-4 py-2.5 font-mono text-xs text-gray-500">{eq.serie}</td>
                    <td className="px-4 py-2.5">
                      <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full font-medium">{eq.etat}</span>
                    </td>
                    <td className="px-4 py-2.5 text-gray-500 text-xs">{eq.entretien}</td>
                    <td className="px-4 py-2.5 text-gray-500 text-xs">{eq.prochain}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Actions bas de page */}
        <div className="flex flex-wrap gap-3 pb-6">
          <a href="/entrepots" className="inline-flex items-center gap-2 border border-gray-200 bg-white text-gray-700 rounded-xl text-xs font-medium px-4 py-2 hover:bg-gray-50">
            <ArrowLeft size={13} /> Retour aux entrepôts
          </a>
          <button className="inline-flex items-center gap-2 bg-[#2E7D32] text-white rounded-xl text-xs font-medium px-4 py-2">
            <Package size={13} /> Saisir un mouvement
          </button>
          <button className="inline-flex items-center gap-2 border border-gray-200 bg-white text-gray-700 rounded-xl text-xs font-medium px-4 py-2">
            <TrendingUp size={13} /> Rapport d&apos;inventaire
          </button>
        </div>

      </div>
    </div>
  );
}
