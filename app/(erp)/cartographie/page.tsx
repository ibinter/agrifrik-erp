"use client";

import { useState } from "react";
import Topbar from "../../components/Topbar";
import { CheckCircle } from "lucide-react";

/* ─────────────────────────────────────────────────────────── */
/*  TYPES                                                       */
/* ─────────────────────────────────────────────────────────── */
type Tab = "carte" | "parcelles" | "zones-ra";

/* ─────────────────────────────────────────────────────────── */
/*  SVG CARTE GLOBALE — Plan de masse EXP-001                  */
/* ─────────────────────────────────────────────────────────── */
function CarteGlobale() {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5">
      <h2 className="text-sm font-bold text-gray-900 mb-4">Plan de masse EXP-001 — Vue satellite schématique</h2>
      <svg viewBox="0 0 700 500" className="w-full border border-gray-100 rounded-xl" style={{ maxHeight: 500 }}>
        <defs>
          <pattern id="terrain" patternUnits="userSpaceOnUse" width="16" height="16">
            <rect width="16" height="16" fill="#EEF4EC" />
            <path d="M0 16 L16 0" stroke="#D9EDD5" strokeWidth="0.4" />
          </pattern>
          <pattern id="hachA" patternUnits="userSpaceOnUse" width="8" height="8" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="8" stroke="#1B5E20" strokeWidth="1.5" strokeOpacity="0.35" />
          </pattern>
          <pattern id="hachB" patternUnits="userSpaceOnUse" width="8" height="8" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="8" stroke="#2E7D32" strokeWidth="1.5" strokeOpacity="0.3" />
          </pattern>
          <pattern id="hachC" patternUnits="userSpaceOnUse" width="8" height="8" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="8" stroke="#4CAF50" strokeWidth="1.2" strokeOpacity="0.3" />
          </pattern>
        </defs>

        {/* Fond */}
        <rect width="700" height="500" fill="url(#terrain)" />

        {/* Rivière Sassandra (EST) */}
        <path d="M 630,0 C 640,60 625,120 638,180 C 650,240 635,300 642,360 C 648,420 638,470 645,500" fill="none" stroke="#64B5F6" strokeWidth="14" strokeLinecap="round" opacity="0.65" />
        <path d="M 630,0 C 640,60 625,120 638,180 C 650,240 635,300 642,360 C 648,420 638,470 645,500" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeDasharray="10 8" opacity="0.5" />
        <text x="662" y="250" fontSize="9" fill="#1565C0" fontWeight="700" transform="rotate(85,662,250)" style={{ userSelect: "none" }}>Rivière Sassandra</text>

        {/* Buffer zone Sassandra 10m */}
        <path d="M 613,0 C 623,60 608,120 621,180 C 633,240 618,300 625,360 C 631,420 621,470 628,500" fill="none" stroke="#E65100" strokeWidth="2.5" strokeDasharray="8 4" opacity="0.7" />

        {/* Route de Soubré (SUD) */}
        <path d="M 0,450 Q 250,443 500,450 Q 560,453 700,448" fill="none" stroke="#9E9E9E" strokeWidth="6" strokeLinecap="round" />
        <path d="M 0,450 Q 250,443 500,450 Q 560,453 700,448" fill="none" stroke="white" strokeWidth="2" strokeDasharray="12 8" opacity="0.7" />
        <text x="80" y="444" fontSize="9" fill="#616161" fontWeight="600" style={{ userSelect: "none" }}>Route de Soubré</text>

        {/* Zone Nord-Ouest — PAR-A1 */}
        <g>
          <rect x="60" y="40" width="150" height="130" rx="6" fill="#1B5E20" opacity="0.75" />
          <rect x="60" y="40" width="150" height="130" rx="6" fill="url(#hachA)" />
          <text x="135" y="95" textAnchor="middle" fontSize="11" fontWeight="700" fill="white" style={{ userSelect: "none" }}>PAR-A1</text>
          <text x="135" y="110" textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.9)" style={{ userSelect: "none" }}>Cacao PH16</text>
          <text x="135" y="124" textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.85)" style={{ userSelect: "none" }}>3,8 ha</text>
          {/* Points GPS coins */}
          {[[60,40],[210,40],[60,170],[210,170]].map(([x,y],i) => (
            <circle key={i} cx={x} cy={y} r="4" fill="#EF5350" stroke="white" strokeWidth="1.5" />
          ))}
        </g>

        {/* PAR-A2 */}
        <g>
          <rect x="230" y="40" width="165" height="130" rx="6" fill="#2E7D32" opacity="0.75" />
          <rect x="230" y="40" width="165" height="130" rx="6" fill="url(#hachA)" />
          <text x="312" y="95" textAnchor="middle" fontSize="11" fontWeight="700" fill="white" style={{ userSelect: "none" }}>PAR-A2</text>
          <text x="312" y="110" textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.9)" style={{ userSelect: "none" }}>Cacao PH16</text>
          <text x="312" y="124" textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.85)" style={{ userSelect: "none" }}>4,2 ha</text>
          {[[230,40],[395,40],[230,170],[395,170]].map(([x,y],i) => (
            <circle key={i} cx={x} cy={y} r="4" fill="#EF5350" stroke="white" strokeWidth="1.5" />
          ))}
        </g>

        {/* Zone Centre — PAR-B1 Cacao + Mercedes */}
        <g>
          <rect x="60" y="195" width="175" height="150" rx="6" fill="#388E3C" opacity="0.78" />
          <rect x="60" y="195" width="175" height="150" rx="6" fill="url(#hachB)" />
          <text x="147" y="257" textAnchor="middle" fontSize="11" fontWeight="700" fill="white" style={{ userSelect: "none" }}>PAR-B1</text>
          <text x="147" y="272" textAnchor="middle" fontSize="8.5" fill="rgba(255,255,255,0.9)" style={{ userSelect: "none" }}>Cacao PH16 + Mercedes</text>
          <text x="147" y="286" textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.85)" style={{ userSelect: "none" }}>4,5 ha</text>
          {[[60,195],[235,195],[60,345],[235,345]].map(([x,y],i) => (
            <circle key={i} cx={x} cy={y} r="4" fill="#EF5350" stroke="white" strokeWidth="1.5" />
          ))}
        </g>

        {/* PAR-B2 Anacarde */}
        <g>
          <rect x="252" y="195" width="130" height="145" rx="6" fill="#558B2F" opacity="0.8" />
          <rect x="252" y="195" width="130" height="145" rx="6" fill="url(#hachC)" />
          <text x="317" y="257" textAnchor="middle" fontSize="11" fontWeight="700" fill="white" style={{ userSelect: "none" }}>PAR-B2</text>
          <text x="317" y="272" textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.9)" style={{ userSelect: "none" }}>Anacarde W240</text>
          <text x="317" y="286" textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.85)" style={{ userSelect: "none" }}>2,0 ha</text>
          {[[252,195],[382,195],[252,340],[382,340]].map(([x,y],i) => (
            <circle key={i} cx={x} cy={y} r="4" fill="#EF5350" stroke="white" strokeWidth="1.5" />
          ))}
        </g>

        {/* Zone Sud — PAR-C1 Anacarde */}
        <g>
          <rect x="60" y="370" width="160" height="60" rx="6" fill="#689F38" opacity="0.78" />
          <text x="140" y="396" textAnchor="middle" fontSize="11" fontWeight="700" fill="white" style={{ userSelect: "none" }}>PAR-C1</text>
          <text x="140" y="410" textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.9)" style={{ userSelect: "none" }}>Anacarde W240 · 1,8 ha</text>
          {[[60,370],[220,370],[60,430],[220,430]].map(([x,y],i) => (
            <circle key={i} cx={x} cy={y} r="4" fill="#EF5350" stroke="white" strokeWidth="1.5" />
          ))}
        </g>

        {/* PSC-001 Bassin piscicole */}
        <g>
          <rect x="260" y="370" width="100" height="58" rx="5" fill="#1565C0" opacity="0.75" />
          <text x="310" y="394" textAnchor="middle" fontSize="10" fontWeight="700" fill="white" style={{ userSelect: "none" }}>PSC-001</text>
          <text x="310" y="408" textAnchor="middle" fontSize="8" fill="rgba(255,255,255,0.9)" style={{ userSelect: "none" }}>Pisciculture · 800m²</text>
        </g>

        {/* Bâtiments */}
        <g>
          <rect x="420" y="380" width="32" height="24" rx="2" fill="#5D4037" opacity="0.9" />
          <polygon points="436,368 452,380 420,380" fill="#4E342E" />
          <text x="436" y="418" textAnchor="middle" fontSize="8" fill="#5D4037" fontWeight="600" style={{ userSelect: "none" }}>Bâtiments</text>
        </g>

        {/* Pistes agricoles */}
        <line x1="60" y1="195" x2="60" y2="370" stroke="#D2B48C" strokeWidth="1.5" strokeDasharray="5 4" opacity="0.6" />
        <line x1="60" y1="195" x2="382" y2="195" stroke="#D2B48C" strokeWidth="1.5" strokeDasharray="5 4" opacity="0.6" />

        {/* Flèche Nord */}
        <g transform="translate(665, 60)">
          <circle cx="0" cy="0" r="18" fill="white" stroke="#D1D5DB" strokeWidth="1.2" opacity="0.92" />
          <text x="0" y="-4" textAnchor="middle" fontSize="9" fontWeight="700" fill="#1F2937" style={{ userSelect: "none" }}>N</text>
          <polygon points="0,-13 3,-4 0,-2 -3,-4" fill="#EF4444" />
          <polygon points="0,13 3,4 0,2 -3,4" fill="#9CA3AF" />
        </g>

        {/* Légende */}
        <rect x="10" y="354" width="160" height="90" rx="6" fill="white" opacity="0.9" stroke="#E5E7EB" strokeWidth="1" />
        <text x="18" y="370" fontSize="8.5" fill="#374151" fontWeight="700" style={{ userSelect: "none" }}>Légende</text>
        {[
          { c: "#1B5E20", label: "Cacao PH16 (Nord)" },
          { c: "#558B2F", label: "Anacarde W240" },
          { c: "#1565C0", label: "Bassin piscicole" },
          { c: "#5D4037", label: "Bâtiments" },
        ].map((item, i) => (
          <g key={item.label} transform={`translate(18, ${382 + i * 14})`}>
            <rect width="12" height="9" rx="2" fill={item.c} />
            <text x="16" y="8" fontSize="7.5" fill="#4B5563" style={{ userSelect: "none" }}>{item.label}</text>
          </g>
        ))}

        {/* Buffer légende */}
        <g transform="translate(18,438)">
          <line x1="0" y1="4" x2="12" y2="4" stroke="#E65100" strokeWidth="2" strokeDasharray="4 2" />
          <text x="16" y="8" fontSize="7.5" fill="#4B5563" style={{ userSelect: "none" }}>Buffer Sassandra 10m</text>
        </g>

        {/* Titre */}
        <text x="350" y="22" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#1B5E20" style={{ userSelect: "none" }}>EXP-001 — Soubré, Région Nawa, Côte d&apos;Ivoire</text>
      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────── */
/*  ONGLET PARCELLES                                           */
/* ─────────────────────────────────────────────────────────── */
function OngletParcelles() {
  const data = [
    { id: "PAR-A1", culture: "Cacao PH16", sup: "3,8 ha", gps: "5°24'58\"N 6°58'52\"W", alt: "142m", sol: "Ferrallitique", ra: "✅ RA certifié" },
    { id: "PAR-A2", culture: "Cacao PH16", sup: "4,2 ha", gps: "5°25'12\"N 6°59'08\"W", alt: "138m", sol: "Ferrallitique", ra: "✅ RA certifié" },
    { id: "PAR-B1", culture: "Cacao PH16 + Mercedes", sup: "4,5 ha", gps: "5°24'42\"N 6°59'24\"W", alt: "145m", sol: "Ferrallitique + coluvion", ra: "✅ RA certifié" },
    { id: "PAR-B2", culture: "Anacarde W240", sup: "2,0 ha", gps: "5°24'30\"N 6°59'18\"W", alt: "141m", sol: "Ferrallitique", ra: "✅ RA certifié" },
    { id: "PAR-C1", culture: "Anacarde W240", sup: "1,8 ha", gps: "5°24'18\"N 6°59'02\"W", alt: "136m", sol: "Ferrallitique alluvial", ra: "✅ RA certifié" },
    { id: "PSC-001", culture: "Pisciculture tilapia", sup: "0,06 ha (800m²)", gps: "5°24'14\"N 6°58'58\"W", alt: "132m", sol: "Zone humide", ra: "✅ RA certifié" },
  ];

  return (
    <div className="rounded-2xl border border-gray-100 bg-white">
      <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
        <h2 className="text-sm font-bold text-gray-900">Récapitulatif parcelles GPS — EXP-001</h2>
        <span className="text-xs text-gray-500">Total : 18,3 ha + PSC-001</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr style={{ backgroundColor: "#F8FBF8" }}>
              {["Parcelle", "Culture", "Superficie", "GPS Centre", "Altitude", "Type de sol", "Statut RA"].map((h) => (
                <th key={h} className="text-left px-4 py-3 font-semibold text-gray-500 whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {data.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-mono font-bold text-gray-900">{p.id}</td>
                <td className="px-4 py-3 text-gray-700">{p.culture}</td>
                <td className="px-4 py-3 text-gray-700 font-medium">{p.sup}</td>
                <td className="px-4 py-3 font-mono text-gray-500 whitespace-nowrap text-[11px]">{p.gps}</td>
                <td className="px-4 py-3 text-gray-600">{p.alt}</td>
                <td className="px-4 py-3 text-gray-600">{p.sol}</td>
                <td className="px-4 py-3 text-green-700 font-semibold">{p.ra}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────── */
/*  ONGLET ZONES RA                                            */
/* ─────────────────────────────────────────────────────────── */
function OngletZonesRA() {
  const checklist = [
    { critere: "Buffer rivière 10m respecté", statut: "✅ Vérifié GPS — 0 application dans la zone" },
    { critere: "Arbres d'ombre >28% de la canopée", statut: "✅ 31% (Gliricidia + caféiers résiduels)" },
    { critere: "Haies brise-vent limites nord", statut: "✅ Gliricidia sepium en bordure PAR-A1/A2" },
    { critere: "Zones humides non drainées", statut: "✅ PSC-001 = valorisation zone humide" },
    { critere: "Aucune déforestation depuis 2008", statut: "✅ EUDR conforme (géolocalisation historique)" },
  ];

  return (
    <div className="space-y-5">

      {/* SVG Conformité RA */}
      <div className="rounded-2xl border border-gray-100 bg-white p-5">
        <h2 className="text-sm font-bold text-gray-900 mb-4">Zones de conformité RA — EXP-001</h2>
        <svg viewBox="0 0 700 400" className="w-full border border-gray-100 rounded-xl" style={{ maxHeight: 400 }}>
          <defs>
            <pattern id="raGround" patternUnits="userSpaceOnUse" width="16" height="16">
              <rect width="16" height="16" fill="#EEF4EC" />
            </pattern>
          </defs>

          {/* Fond */}
          <rect width="700" height="400" fill="url(#raGround)" />

          {/* Rivière */}
          <path d="M 630,0 C 640,60 625,120 638,180 C 650,240 635,300 642,360 C 648,390 638,400 645,400" fill="none" stroke="#64B5F6" strokeWidth="14" strokeLinecap="round" opacity="0.65" />

          {/* Buffer Sassandra 10m */}
          <path d="M 612,0 C 622,60 607,120 620,180 C 632,240 617,300 624,360 C 630,390 620,400 627,400" fill="none" stroke="#E65100" strokeWidth="3" strokeDasharray="8 4" opacity="0.8" />
          <rect x="600" y="60" width="80" height="14" rx="3" fill="#FFF3E0" opacity="0.9" />
          <text x="640" y="71" textAnchor="middle" fontSize="7" fill="#E65100" fontWeight="700" style={{ userSelect: "none" }}>AUCUNE APPLICATION PHYTO</text>

          {/* PAR-A1 */}
          <rect x="60" y="40" width="150" height="130" rx="6" fill="#1B5E20" opacity="0.6" />
          <text x="135" y="97" textAnchor="middle" fontSize="10" fontWeight="700" fill="white" style={{ userSelect: "none" }}>PAR-A1</text>
          <text x="135" y="111" textAnchor="middle" fontSize="8" fill="rgba(255,255,255,0.85)" style={{ userSelect: "none" }}>3,8 ha</text>

          {/* PAR-A2 */}
          <rect x="230" y="40" width="165" height="130" rx="6" fill="#2E7D32" opacity="0.6" />
          <text x="312" y="97" textAnchor="middle" fontSize="10" fontWeight="700" fill="white" style={{ userSelect: "none" }}>PAR-A2</text>
          <text x="312" y="111" textAnchor="middle" fontSize="8" fill="rgba(255,255,255,0.85)" style={{ userSelect: "none" }}>4,2 ha</text>

          {/* PAR-B1 */}
          <rect x="60" y="195" width="175" height="130" rx="6" fill="#388E3C" opacity="0.6" />
          <text x="147" y="257" textAnchor="middle" fontSize="10" fontWeight="700" fill="white" style={{ userSelect: "none" }}>PAR-B1</text>
          <text x="147" y="271" textAnchor="middle" fontSize="8" fill="rgba(255,255,255,0.85)" style={{ userSelect: "none" }}>4,5 ha</text>

          {/* PAR-B2 */}
          <rect x="252" y="195" width="130" height="120" rx="6" fill="#558B2F" opacity="0.6" />
          <text x="317" y="252" textAnchor="middle" fontSize="10" fontWeight="700" fill="white" style={{ userSelect: "none" }}>PAR-B2</text>
          <text x="317" y="266" textAnchor="middle" fontSize="8" fill="rgba(255,255,255,0.85)" style={{ userSelect: "none" }}>2,0 ha</text>

          {/* PAR-C1 */}
          <rect x="60" y="350" width="120" height="38" rx="5" fill="#689F38" opacity="0.65" />
          <text x="120" y="368" textAnchor="middle" fontSize="9" fontWeight="700" fill="white" style={{ userSelect: "none" }}>PAR-C1 · 1,8 ha</text>

          {/* PSC-001 */}
          <rect x="200" y="350" width="90" height="38" rx="5" fill="#1565C0" opacity="0.7" />
          <text x="245" y="373" textAnchor="middle" fontSize="9" fontWeight="700" fill="white" style={{ userSelect: "none" }}>PSC-001</text>

          {/* Arbres d'ombre Gliricidia (points verts) */}
          {[
            [90,65],[115,65],[140,65],[165,65],[185,65],
            [90,90],[115,90],[140,90],[165,90],[185,90],
            [90,120],[115,120],[140,120],[165,120],
            [255,65],[280,65],[305,65],[330,65],[360,65],[385,65],
            [255,90],[280,90],[305,90],[330,90],[360,90],
            [255,120],[280,120],[305,120],[330,120],
            [85,215],[110,215],[135,215],[160,215],[210,215],
            [85,240],[110,240],[135,240],[160,240],[210,240],
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="5" fill="#4CAF50" opacity="0.7" stroke="#1B5E20" strokeWidth="0.8" />
          ))}

          {/* Pièges phéromones — PAR-A1 (3) */}
          {[[100,155],[145,155],[195,155]].map(([x,y],i) => (
            <g key={`ph-a1-${i}`}>
              <circle cx={x} cy={y} r="5" fill="#EF5350" stroke="white" strokeWidth="1.2" />
              <text x={x} y={y+4} textAnchor="middle" fontSize="7" fill="white" fontWeight="700" style={{ userSelect: "none" }}>P</text>
            </g>
          ))}
          {/* Pièges PAR-A2 (3) */}
          {[[260,155],[315,155],[380,155]].map(([x,y],i) => (
            <g key={`ph-a2-${i}`}>
              <circle cx={x} cy={y} r="5" fill="#EF5350" stroke="white" strokeWidth="1.2" />
              <text x={x} y={y+4} textAnchor="middle" fontSize="7" fill="white" fontWeight="700" style={{ userSelect: "none" }}>P</text>
            </g>
          ))}
          {/* Pièges PAR-B1 (4) */}
          {[[80,318],[120,318],[160,318],[220,318]].map(([x,y],i) => (
            <g key={`ph-b1-${i}`}>
              <circle cx={x} cy={y} r="5" fill="#EF5350" stroke="white" strokeWidth="1.2" />
              <text x={x} y={y+4} textAnchor="middle" fontSize="7" fill="white" fontWeight="700" style={{ userSelect: "none" }}>P</text>
            </g>
          ))}

          {/* Haies brise-vent Nord */}
          <line x1="60" y1="40" x2="395" y2="40" stroke="#1B5E20" strokeWidth="4" strokeLinecap="round" />
          <text x="220" y="32" textAnchor="middle" fontSize="7.5" fill="#1B5E20" fontWeight="600" style={{ userSelect: "none" }}>Haies Gliricidia brise-vent</text>

          {/* Flèche Nord */}
          <g transform="translate(665, 50)">
            <circle cx="0" cy="0" r="16" fill="white" stroke="#D1D5DB" strokeWidth="1" opacity="0.92" />
            <text x="0" y="-4" textAnchor="middle" fontSize="8" fontWeight="700" fill="#1F2937" style={{ userSelect: "none" }}>N</text>
            <polygon points="0,-11 2.5,-2 0,0 -2.5,-2" fill="#EF4444" />
            <polygon points="0,11 2.5,2 0,0 -2.5,2" fill="#9CA3AF" />
          </g>

          {/* Légende */}
          <rect x="420" y="140" width="200" height="130" rx="6" fill="white" opacity="0.93" stroke="#E5E7EB" strokeWidth="1" />
          <text x="430" y="157" fontSize="8.5" fill="#374151" fontWeight="700" style={{ userSelect: "none" }}>Légende RA</text>
          {[
            { c: "#4CAF50", label: "Arbres d'ombre Gliricidia" },
            { c: "#EF5350", label: "Pièges phéromones (P)" },
            { c: "#1B5E20", label: "Haies brise-vent" },
          ].map((item, i) => (
            <g key={item.label} transform={`translate(430, ${170 + i * 15})`}>
              <circle cx="5" cy="5" r="5" fill={item.c} />
              <text x="14" y="9" fontSize="7.5" fill="#4B5563" style={{ userSelect: "none" }}>{item.label}</text>
            </g>
          ))}
          <g transform="translate(430, 223)">
            <line x1="0" y1="5" x2="10" y2="5" stroke="#E65100" strokeWidth="2" strokeDasharray="4 2" />
            <text x="14" y="9" fontSize="7.5" fill="#4B5563" style={{ userSelect: "none" }}>Buffer Sassandra 10m</text>
          </g>
          <g transform="translate(430, 238)">
            <rect width="10" height="8" rx="2" fill="#1565C0" opacity="0.7" />
            <text x="14" y="7" fontSize="7.5" fill="#4B5563" style={{ userSelect: "none" }}>Zone humide (PSC-001)</text>
          </g>
        </svg>
      </div>

      {/* Checklist conformité spatiale RA */}
      <div className="rounded-2xl border border-gray-100 bg-white">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="text-sm font-bold text-gray-900">Checklist conformité spatiale RA</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr style={{ backgroundColor: "#F8FBF8" }}>
                <th className="text-left px-4 py-3 font-semibold text-gray-500">Critère spatial</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-500">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {checklist.map((c, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-800 font-medium">{c.critere}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5 text-green-700 font-semibold">
                      <CheckCircle size={13} />
                      <span>{c.statut}</span>
                    </div>
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

/* ─────────────────────────────────────────────────────────── */
/*  PAGE PRINCIPALE                                            */
/* ─────────────────────────────────────────────────────────── */
export default function CartographiePage() {
  const [tab, setTab] = useState<Tab>("carte");

  const TABS: { key: Tab; label: string }[] = [
    { key: "carte", label: "Carte globale" },
    { key: "parcelles", label: "Parcelles" },
    { key: "zones-ra", label: "Zones RA" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Topbar title="Cartographie" breadcrumb={["Production", "Cartographie"]} />

      <div className="p-6 space-y-5">

        {/* ── En-tête ── */}
        <div className="rounded-2xl px-6 py-5 text-white" style={{ background: "linear-gradient(135deg,#1B5E20 0%,#2E7D32 60%,#388E3C 100%)" }}>
          <h1 className="text-base font-bold mb-0.5">Cartographie</h1>
          <p className="text-green-200 text-xs">Plans parcellaires GPS — EXP-001 — Soubré, Région Nawa, CI</p>
        </div>

        {/* ── KPI ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { val: "6 parcelles + 1 bassin", label: "entités cartographiées" },
            { val: "18,3 ha total", label: "superficie totale" },
            { val: "15,2 ha", label: "en production" },
            { val: "Certifiées RA GPS ✅", label: "toutes les parcelles" },
          ].map((k) => (
            <div key={k.label} className="bg-white rounded-2xl border border-gray-100 p-4">
              <div className="text-base font-black text-gray-900">{k.val}</div>
              <div className="text-xs text-gray-500 mt-0.5">{k.label}</div>
            </div>
          ))}
        </div>

        {/* ── Onglets ── */}
        <div className="flex gap-1 bg-white rounded-2xl border border-gray-100 p-1 shadow-sm w-fit">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className="px-4 py-2 rounded-xl text-xs font-semibold transition-all"
              style={tab === t.key ? { backgroundColor: "#2E7D32", color: "#fff" } : { color: "#6B7280" }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* ── Contenu ── */}
        {tab === "carte"     && <CarteGlobale />}
        {tab === "parcelles" && <OngletParcelles />}
        {tab === "zones-ra"  && <OngletZonesRA />}

      </div>
    </div>
  );
}
