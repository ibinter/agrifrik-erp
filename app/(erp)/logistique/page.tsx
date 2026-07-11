"use client";

import { useState } from "react";
import Topbar from "../../components/Topbar";
import {
  Truck,
  DollarSign,
  Clock,
  Leaf,
  CheckCircle,
  AlertCircle,
  Calendar,
} from "lucide-react";

const TABS = ["Opérations", "Flotte", "Planning"] as const;
type Tab = (typeof TABS)[number];

/* ─── KPI CARD ─── */
function KpiCard({
  label,
  value,
  sub,
  icon: Icon,
  color = "#2E7D32",
}: {
  label: string;
  value: string;
  sub?: string;
  icon: React.ElementType;
  color?: string;
}) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-gray-500 font-medium">{label}</p>
          <p className="mt-1 text-2xl font-bold text-gray-800">{value}</p>
          {sub && <p className="mt-1 text-xs text-gray-400">{sub}</p>}
        </div>
        <div
          className="flex h-10 w-10 items-center justify-center rounded-xl"
          style={{ background: color + "18" }}
        >
          <Icon size={20} style={{ color }} />
        </div>
      </div>
    </div>
  );
}

/* ─── SVG CARTE FLUX LOGISTIQUES ─── */
function SvgCarteFlux() {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5">
      <h3 className="mb-4 text-sm font-semibold text-gray-700">Flux logistiques actifs</h3>
      <div className="overflow-x-auto">
        <svg viewBox="0 0 700 380" width="700" height="380" xmlns="http://www.w3.org/2000/svg">
          <rect width="700" height="380" fill="#F8FBF8" rx="12" />

          {/* Silhouette CI simplifiée */}
          <path
            d="M110,75 L185,55 L265,65 L315,85 L345,125 L335,180 L315,235 L280,265 L248,282 L205,290 L165,272 L138,242 L115,200 L100,158 L105,115 Z"
            fill="#E8F5E9"
            stroke="#A5D6A7"
            strokeWidth="1.5"
          />
          <text x="220" y="170" fontSize="11" fill="#388E3C" fontWeight="bold" textAnchor="middle">
            Côte d&apos;Ivoire
          </text>

          {/* Mer */}
          <rect x="300" y="55" width="370" height="250" rx="8" fill="#E3F2FD" opacity="0.55" />
          <text x="485" y="95" fontSize="10" fill="#90CAF9" textAnchor="middle">Atlantique / Méditerranée</text>

          {/* Points géographiques */}
          {/* Soubré */}
          <circle cx="192" cy="215" r="7" fill="#2E7D32" />
          <text x="192" y="234" fontSize="11" fill="#1B5E20" fontWeight="bold" textAnchor="middle">Soubré</text>

          {/* San-Pédro */}
          <circle cx="222" cy="272" r="7" fill="#2E7D32" />
          <text x="222" y="291" fontSize="11" fill="#1B5E20" fontWeight="bold" textAnchor="middle">San-Pédro</text>

          {/* Abidjan */}
          <circle cx="314" cy="232" r="7" fill="#2E7D32" />
          <text x="340" y="236" fontSize="11" fill="#1B5E20" fontWeight="bold">Abidjan</text>

          {/* Rotterdam */}
          <circle cx="562" cy="88" r="7" fill="#1565C0" />
          <text x="578" y="92" fontSize="11" fill="#1565C0" fontWeight="bold">Rotterdam</text>

          {/* LIGNE 1 : Soubré → San-Pédro — verte solide */}
          <line x1="192" y1="213" x2="220" y2="266" stroke="#2E7D32" strokeWidth="2.5" />
          <polygon points="220,267 214,257 226,256" fill="#2E7D32" />
          <rect x="70" y="242" width="108" height="18" rx="4" fill="white" stroke="#2E7D32" strokeWidth="1" />
          <text x="124" y="254" fontSize="8.5" fill="#2E7D32" textAnchor="middle">LOT-045 — livré ✓</text>

          {/* LIGNE 2 : San-Pédro → Rotterdam — bleue pointillée */}
          <line x1="222" y1="268" x2="558" y2="92" stroke="#1565C0" strokeWidth="2" strokeDasharray="8,5" />
          <polygon points="558,92 550,100 560,104" fill="#1565C0" />
          <rect x="335" y="148" width="162" height="28" rx="4" fill="white" stroke="#1565C0" strokeWidth="1" />
          <text x="416" y="160" fontSize="8.5" fill="#1565C0" textAnchor="middle">MSC Allegria — LOT-045</text>
          <text x="416" y="170" fontSize="8.5" fill="#1565C0" textAnchor="middle">24 900 kg — ETA 05/08</text>

          {/* LIGNE 3 : Abidjan → Soubré — orange */}
          <line x1="310" y1="230" x2="200" y2="216" stroke="#E65100" strokeWidth="2" />
          <polygon points="200,216 210,210 210,222" fill="#E65100" />
          <rect x="214" y="197" width="138" height="18" rx="4" fill="white" stroke="#E65100" strokeWidth="1" />
          <text x="283" y="209" fontSize="8.5" fill="#E65100" textAnchor="middle">DHL — Pièces JD ETA 15/07</text>

          {/* Légende */}
          <rect x="20" y="312" width="650" height="55" rx="8" fill="white" stroke="#E0E0E0" strokeWidth="1" />
          <line x1="40" y1="332" x2="80" y2="332" stroke="#2E7D32" strokeWidth="2.5" />
          <text x="90" y="336" fontSize="10" fill="#444">Transport routier (livré)</text>
          <line x1="225" y1="332" x2="265" y2="332" stroke="#1565C0" strokeWidth="2" strokeDasharray="6,4" />
          <text x="275" y="336" fontSize="10" fill="#444">Transport maritime (en cours)</text>
          <line x1="448" y1="332" x2="488" y2="332" stroke="#E65100" strokeWidth="2" />
          <text x="498" y="336" fontSize="10" fill="#444">Appro. (transit)</text>
          <text x="350" y="354" fontSize="9" fill="#999" textAnchor="middle">Carte schématique — non à l&apos;échelle</text>
        </svg>
      </div>
    </div>
  );
}

/* ─── OPÉRATIONS EN COURS ─── */
const opsCourantes = [
  { ref: "LOG-2025-048", type: "Export", marchandise: "Cacao 24 900 kg LOT-045", origine: "San-Pédro", destination: "Rotterdam", transport: "MSC Allegria", eta: "05/08", statut: "En mer", sc: "#1565C0", cout: "1 620 000" },
  { ref: "LOG-2025-049", type: "Appro.", marchandise: "Pièces JD (ACH-091)", origine: "Abidjan", destination: "Soubré", transport: "DHL + Pick-up", eta: "15/07", statut: "En transit", sc: "#F59E0B", cout: "48 000" },
  { ref: "LOG-2025-050", type: "Interne", marchandise: "Semences clones (20 kg)", origine: "CNRA Abidjan", destination: "Soubré", transport: "Toyota HiLux", eta: "20/07", statut: "Planifié", sc: "#6366F1", cout: "18 000" },
];

const dernieresLivraisons = [
  { ref: "LOG-2025-047", date: "28/06", type: "Export", marchandise: "Anacarde WW240 2,4 t", transport: "Renault T460", cout: "420 000" },
  { ref: "LOG-2025-046", date: "20/06", type: "Appro.", marchandise: "NPK 500 kg (SCPA)", transport: "Renault T460", cout: "62 000" },
  { ref: "LOG-2025-045", date: "15/06", type: "Interne", marchandise: "Récolte cacao 1 200 kg", transport: "Remorque benne", cout: "12 000" },
  { ref: "LOG-2025-044", date: "10/06", type: "Appro.", marchandise: "Pièces pompe irrigation", transport: "Toyota HiLux", cout: "24 000" },
  { ref: "LOG-2025-043", date: "05/06", type: "Export", marchandise: "Cacao Grade A 3 100 kg", transport: "Renault T460", cout: "280 000" },
  { ref: "LOG-2025-042", date: "28/05", type: "Appro.", marchandise: "Sacs jute 500 unités", transport: "Toyota HiLux", cout: "18 000" },
  { ref: "LOG-2025-041", date: "20/05", type: "Appro.", marchandise: "Gasoil 400 L", transport: "Renault T460", cout: "310 000" },
  { ref: "LOG-2025-040", date: "15/05", type: "Export", marchandise: "Anacarde SW340 8 kg", transport: "DHL Express", cout: "45 000" },
];

function OngletOperations() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        <KpiCard label="Livraisons ce mois" value="14" icon={CheckCircle} />
        <KpiCard label="En transit" value="3" sub="LOT-045 · ACH-091 · SEM-026" icon={Truck} color="#F59E0B" />
        <KpiCard label="Coût transport YTD" value="8,4 M XOF" icon={DollarSign} />
        <KpiCard label="Taux livraison à temps" value="92,8 %" icon={Clock} color="#1565C0" />
        <KpiCard label="CO₂ transport YTD" value="18,4 tCO₂e" icon={Leaf} color="#4CAF50" />
      </div>

      <SvgCarteFlux />

      {/* Tableau opérations en cours */}
      <div className="rounded-2xl border border-gray-100 bg-white p-5">
        <h3 className="mb-4 text-sm font-semibold text-gray-700">Opérations en cours</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="bg-[#F8FBF8]">
                {["Réf.", "Type", "Marchandise", "Origine", "Destination", "Transport", "ETA", "Statut", "Coût (XOF)"].map((h) => (
                  <th key={h} className="px-3 py-2 text-left font-semibold text-gray-600 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {opsCourantes.map((op) => (
                <tr key={op.ref} className="border-t border-gray-50 hover:bg-gray-50">
                  <td className="px-3 py-2 font-mono font-medium text-gray-800 whitespace-nowrap">{op.ref}</td>
                  <td className="px-3 py-2 whitespace-nowrap">{op.type}</td>
                  <td className="px-3 py-2 whitespace-nowrap">{op.marchandise}</td>
                  <td className="px-3 py-2 whitespace-nowrap">{op.origine}</td>
                  <td className="px-3 py-2 whitespace-nowrap">{op.destination}</td>
                  <td className="px-3 py-2 whitespace-nowrap">{op.transport}</td>
                  <td className="px-3 py-2 font-medium whitespace-nowrap">{op.eta}</td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    <span className="rounded-full px-2 py-0.5 text-xs font-medium" style={{ background: op.sc + "18", color: op.sc }}>{op.statut}</span>
                  </td>
                  <td className="px-3 py-2 text-right font-medium whitespace-nowrap">{op.cout}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tableau dernières livraisons */}
      <div className="rounded-2xl border border-gray-100 bg-white p-5">
        <h3 className="mb-4 text-sm font-semibold text-gray-700">Dernières livraisons</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="bg-[#F8FBF8]">
                {["Réf.", "Date", "Type", "Marchandise", "Transport", "Coût (XOF)", "Statut"].map((h) => (
                  <th key={h} className="px-3 py-2 text-left font-semibold text-gray-600 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dernieresLivraisons.map((l) => (
                <tr key={l.ref} className="border-t border-gray-50 hover:bg-gray-50">
                  <td className="px-3 py-2 font-mono font-medium text-gray-800 whitespace-nowrap">{l.ref}</td>
                  <td className="px-3 py-2 whitespace-nowrap">{l.date}</td>
                  <td className="px-3 py-2 whitespace-nowrap">{l.type}</td>
                  <td className="px-3 py-2 whitespace-nowrap">{l.marchandise}</td>
                  <td className="px-3 py-2 whitespace-nowrap">{l.transport}</td>
                  <td className="px-3 py-2 text-right font-medium whitespace-nowrap">{l.cout}</td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    <span className="rounded-full px-2 py-0.5 text-xs font-medium bg-green-50 text-green-700">Livré</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ─── FLOTTE ─── */
const flotte = [
  { code: "VEH-001", vehicule: "Renault T460 26t", immat: "AB 124 CI", usage: "Transport long-courrier", chauffeur: "Moussa Traoré", km: "148 240", entretien: "15/05/2025", vidange: "160 000 km", ok: true },
  { code: "VEH-002", vehicule: "Toyota HiLux pick-up", immat: "AB 892 CI", usage: "Déplacements terrain", chauffeur: "Ibrahim Sawadogo", km: "64 820", entretien: "01/04/2025", vidange: "70 000 km", ok: true },
  { code: "VEH-003", vehicule: "Toyota HiLux pick-up", immat: "AB 893 CI", usage: "Déplacements DG", chauffeur: "Chauffeur DG", km: "48 210", entretien: "15/03/2025", vidange: "55 000 km", ok: true },
  { code: "VEH-004", vehicule: "Moto Honda XR 150", immat: "—", usage: "Liaisons terrain", chauffeur: "Konan Yao", km: "12 840", entretien: "01/06/2025", vidange: "15 000 km", ok: true },
  { code: "VEH-005", vehicule: "Moto Honda XR 150", immat: "—", usage: "Liaisons terrain", chauffeur: "Sékou Bamba", km: "9 620", entretien: "01/06/2025", vidange: "12 000 km", ok: true },
  { code: "VEH-006", vehicule: "Remorque benne 8t", immat: "AB 445 CI", usage: "Transport récoltes", chauffeur: "(attelée JD MAT-001)", km: "—", entretien: "Jan 2025", vidange: "—", ok: false, statut: "MAT-001 en maint." },
];

const coutsMois = [
  { mois: "Jan", val: 0.9 },
  { mois: "Fév", val: 0.8 },
  { mois: "Mar", val: 1.2 },
  { mois: "Avr", val: 1.4 },
  { mois: "Mai", val: 2.1 },
  { mois: "Jun", val: 2.0 },
];

const carburant = [
  { code: "VEH-001", km: "42 800", litres: "6 420 L gasoil", cCarb: "5 778 000", cEntr: "820 000", total: "6 598 000" },
  { code: "VEH-002", km: "18 400", litres: "2 116 L gasoil", cCarb: "1 904 000", cEntr: "245 000", total: "2 149 000" },
  { code: "VEH-003", km: "12 100", litres: "1 392 L gasoil", cCarb: "1 253 000", cEntr: "180 000", total: "1 433 000" },
  { code: "VEH-004", km: "4 200", litres: "210 L essence", cCarb: "168 000", cEntr: "35 000", total: "203 000" },
  { code: "VEH-005", km: "3 100", litres: "155 L essence", cCarb: "124 000", cEntr: "32 000", total: "156 000" },
];

function SvgBarCouts() {
  const maxVal = 2.1;
  const chartH = 160;
  const barW = 58;
  const gap = 30;
  const startX = 48;
  const topPad = 20;

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5">
      <h3 className="mb-4 text-sm font-semibold text-gray-700">Coûts transport par mois 2025 (M XOF)</h3>
      <svg viewBox={`0 0 ${startX + coutsMois.length * (barW + gap) + 10} ${chartH + 60}`} width="100%" xmlns="http://www.w3.org/2000/svg">
        {[0, 0.5, 1.0, 1.5, 2.0].map((v) => {
          const y = chartH - (v / maxVal) * chartH + topPad;
          return (
            <g key={v}>
              <line x1={startX} y1={y} x2={startX + coutsMois.length * (barW + gap) - gap} y2={y} stroke="#E0E0E0" strokeWidth="1" />
              <text x={startX - 6} y={y + 4} fontSize="9" fill="#888" textAnchor="end">{v.toFixed(1)}</text>
            </g>
          );
        })}
        {coutsMois.map((d, i) => {
          const x = startX + i * (barW + gap);
          const bh = (d.val / maxVal) * chartH;
          const y = chartH - bh + topPad;
          return (
            <g key={d.mois}>
              <rect x={x} y={y} width={barW} height={bh} fill="#2E7D32" rx="4" opacity="0.85" />
              <text x={x + barW / 2} y={y - 5} fontSize="9" fill="#2E7D32" textAnchor="middle" fontWeight="bold">{d.val}M</text>
              <text x={x + barW / 2} y={chartH + topPad + 18} fontSize="10" fill="#555" textAnchor="middle">{d.mois}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function OngletFlotte() {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-gray-100 bg-white p-5">
        <h3 className="mb-4 text-sm font-semibold text-gray-700">Flotte de transport AGRIFRIK</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="bg-[#F8FBF8]">
                {["Code", "Véhicule", "Immat.", "Usage", "Chauffeur assigné", "Km", "Dernier entretien", "Proch. vidange", "Statut"].map((h) => (
                  <th key={h} className="px-3 py-2 text-left font-semibold text-gray-600 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {flotte.map((v) => (
                <tr key={v.code} className="border-t border-gray-50 hover:bg-gray-50">
                  <td className="px-3 py-2 font-mono font-medium text-gray-700 whitespace-nowrap">{v.code}</td>
                  <td className="px-3 py-2 font-medium whitespace-nowrap">{v.vehicule}</td>
                  <td className="px-3 py-2 whitespace-nowrap">{v.immat}</td>
                  <td className="px-3 py-2 whitespace-nowrap">{v.usage}</td>
                  <td className="px-3 py-2 whitespace-nowrap">{v.chauffeur}</td>
                  <td className="px-3 py-2 text-right whitespace-nowrap">{v.km}</td>
                  <td className="px-3 py-2 whitespace-nowrap">{v.entretien}</td>
                  <td className="px-3 py-2 whitespace-nowrap">{v.vidange}</td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${v.ok ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700"}`}>
                      {v.ok ? "✅ Disponible" : `⚠️ ${v.statut}`}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <SvgBarCouts />

      <div className="rounded-2xl border border-gray-100 bg-white p-5">
        <h3 className="mb-4 text-sm font-semibold text-gray-700">Carburant & Coûts véhicules YTD (XOF)</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="bg-[#F8FBF8]">
                {["Véhicule", "Km parcourus", "Carburant (volume)", "Coût carburant", "Coût entretien", "Coût total"].map((h) => (
                  <th key={h} className="px-3 py-2 text-left font-semibold text-gray-600 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {carburant.map((d) => (
                <tr key={d.code} className="border-t border-gray-50 hover:bg-gray-50">
                  <td className="px-3 py-2 font-mono font-medium text-gray-700 whitespace-nowrap">{d.code}</td>
                  <td className="px-3 py-2 text-right whitespace-nowrap">{d.km} km</td>
                  <td className="px-3 py-2 whitespace-nowrap">{d.litres}</td>
                  <td className="px-3 py-2 text-right whitespace-nowrap">{d.cCarb}</td>
                  <td className="px-3 py-2 text-right whitespace-nowrap">{d.cEntr}</td>
                  <td className="px-3 py-2 text-right font-semibold text-gray-800 whitespace-nowrap">{d.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ─── PLANNING ─── */
const planning = [
  { date: "15/07", ref: "LOG-049", marchandise: "Pièces JD + Semences", vehicule: "Toyota HiLux", trajet: "Abidjan → Soubré", resp: "Ibrahim S." },
  { date: "20/07", ref: "LOG-050", marchandise: "Semences clones CNRA (20 kg)", vehicule: "Toyota HiLux", trajet: "Abidjan → Soubré", resp: "Konan Y." },
  { date: "25/07", ref: "LOG-051", marchandise: "KCl 720 kg (en cours commande)", vehicule: "Renault T460", trajet: "SCPA Abidjan → Soubré", resp: "Moussa T." },
  { date: "01/08", ref: "LOG-052", marchandise: "Anacarde WW240 (2,4 t)", vehicule: "Renault T460", trajet: "Soubré → San-Pédro", resp: "Moussa T." },
  { date: "05/08", ref: "—", marchandise: "LOT-045 ETA Rotterdam", vehicule: "MSC Allegria", trajet: "San-Pédro → Rotterdam", resp: "— (maritime)" },
  { date: "10/08", ref: "LOG-053", marchandise: "NPK 10t pour campagne sep.", vehicule: "Renault T460", trajet: "Abidjan → Soubré", resp: "Moussa T." },
];

function OngletPlanning() {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-gray-100 bg-white p-5">
        <div className="mb-4 flex items-center gap-2">
          <Calendar size={16} className="text-green-700" />
          <h3 className="text-sm font-semibold text-gray-700">Calendrier livraisons prévues — Juillet & Août 2025</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="bg-[#F8FBF8]">
                {["Date", "Réf.", "Marchandise", "Véhicule / Transporteur", "Trajet", "Responsable"].map((h) => (
                  <th key={h} className="px-3 py-2 text-left font-semibold text-gray-600 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {planning.map((p, i) => (
                <tr key={i} className="border-t border-gray-50 hover:bg-gray-50">
                  <td className="px-3 py-2 font-semibold text-gray-800 whitespace-nowrap">{p.date}</td>
                  <td className="px-3 py-2 font-mono whitespace-nowrap">{p.ref}</td>
                  <td className="px-3 py-2 whitespace-nowrap">{p.marchandise}</td>
                  <td className="px-3 py-2 whitespace-nowrap">{p.vehicule}</td>
                  <td className="px-3 py-2 text-gray-600 whitespace-nowrap">{p.trajet}</td>
                  <td className="px-3 py-2 whitespace-nowrap">{p.resp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
        <div className="flex items-start gap-3">
          <AlertCircle size={16} className="mt-0.5 text-blue-600 shrink-0" />
          <div className="text-xs text-blue-700">
            <p className="font-semibold mb-1">Notes de planning</p>
            <ul className="space-y-1 list-disc ml-4">
              <li>LOG-051 (KCl) conditionné à la validation de commande ACH — en attente fournisseur SCPA</li>
              <li>Transport maritime LOT-045 : suivi en temps réel via portail MSC MyBox</li>
              <li>Vérifier disponibilité VEH-001 (Renault T460) avant confirmation LOG-052 et LOG-053</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── PAGE ─── */
export default function LogistiquePage() {
  const [activeTab, setActiveTab] = useState<Tab>("Opérations");

  return (
    <div className="min-h-screen bg-gray-50">
      <Topbar
        breadcrumb={["Logistique", "Transport & Logistique"]}
        title="Transport & Logistique"
      />
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Gestion du transport et de la chaîne logistique</h1>
          <p className="mt-1 text-sm text-gray-500">Suivi des opérations, flotte de véhicules et planning de livraisons</p>
        </div>

        {/* Onglets */}
        <div className="flex gap-1 rounded-xl bg-white border border-gray-100 p-1 w-fit">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-lg px-4 py-2 text-xs font-medium transition-colors ${
                activeTab === tab ? "bg-[#2E7D32] text-white shadow-sm" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "Opérations" && <OngletOperations />}
        {activeTab === "Flotte" && <OngletFlotte />}
        {activeTab === "Planning" && <OngletPlanning />}
      </div>
    </div>
  );
}
