"use client";

import { useState } from "react";
import Topbar from "../../components/Topbar";
import { MapPin, Download, Layers, BarChart2, Satellite, Navigation } from "lucide-react";

/* ─── TYPES ─── */
type TabId = "carte" | "parcelles" | "analyse" | "gps";

/* ─── KPI ─── */
function Kpi({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="bg-white rounded-2xl p-4 border border-gray-100">
      <div className="text-2xl font-bold text-gray-900">{value}</div>
      <div className="text-xs text-gray-500 mt-0.5">{label}</div>
      {sub && <div className="text-xs mt-1 font-medium text-[#2E7D32]">{sub}</div>}
    </div>
  );
}

/* ─── DONNÉES PARCELLES ─── */
const PARCELLES_DATA = [
  { id: "PAR-A1", gps: "5°47'12\"N 6°36'24\"W", surfGPS: 6.18, surfAdmin: 6.20, ecart: -0.02, culture: "Cacao AA", certif: "RA ✅", maj: "10/07/2025", tf: "TF-23847-CI", rendPrev: "1,28 t/ha → 7,9 t", acte: "Traitement préventif 20/07", type: "cacao-prop" },
  { id: "PAR-A2", gps: "5°47'08\"N 6°36'18\"W", surfGPS: 5.82, surfAdmin: 5.80, ecart: +0.02, culture: "Cacao AA", certif: "RA ✅", maj: "10/07/2025", tf: "TF-23851-CI", rendPrev: "1,25 t/ha → 7,3 t", acte: "Récolte Oct-Nov", type: "cacao-prop" },
  { id: "PAR-A3", gps: "5°47'04\"N 6°36'30\"W", surfGPS: 4.80, surfAdmin: 4.80, ecart: 0.00, culture: "Cacao AA", certif: "RA ✅", maj: "10/07/2025", tf: "TF-23852-CI", rendPrev: "1,20 t/ha → 5,8 t", acte: "Taille Août", type: "cacao-prop" },
  { id: "PAR-B1", gps: "5°47'16\"N 6°36'10\"W", surfGPS: 3.21, surfAdmin: 3.20, ecart: +0.01, culture: "Cacao AA", certif: "RA ✅", maj: "10/07/2025", tf: "Fermage", rendPrev: "1,18 t/ha → 3,8 t", acte: "Entretien Août", type: "cacao-ferm" },
  { id: "PAR-B2", gps: "5°47'14\"N 6°36'06\"W", surfGPS: 3.42, surfAdmin: 3.40, ecart: +0.02, culture: "Cacao AA", certif: "RA ✅", maj: "10/07/2025", tf: "Fermage ⚠️ bail expire", rendPrev: "1,15 t/ha → 3,9 t", acte: "Renouveler bail", type: "cacao-ferm-alerte" },
  { id: "PAR-C1", gps: "5°46'58\"N 6°36'22\"W", surfGPS: 5.61, surfAdmin: 5.60, ecart: +0.01, culture: "Anacarde", certif: "GlobalG.A.P ✅", maj: "10/07/2025", tf: "TF-23860-CI", rendPrev: "0,95 t/ha → 5,3 t", acte: "Récolte Mars 2026", type: "anacarde" },
  { id: "PAR-C2", gps: "5°46'54\"N 6°36'18\"W", surfGPS: 4.79, surfAdmin: 4.80, ecart: -0.01, culture: "Anacarde", certif: "GlobalG.A.P ✅", maj: "10/07/2025", tf: "TF-23861-CI", rendPrev: "0,92 t/ha → 4,4 t", acte: "Traitement Août", type: "anacarde" },
  { id: "PAR-D1", gps: "5°47'02\"N 6°36'44\"W", surfGPS: 5.58, surfAdmin: 5.60, ecart: -0.02, culture: "Maïs + Igname", certif: "—", maj: "10/07/2025", tf: "TF-23865-CI", rendPrev: "3,2 t/ha maïs", acte: "Récolte Sep 2025", type: "vivrier" },
  { id: "PAR-D2", gps: "5°47'10\"N 6°36'50\"W", surfGPS: 2.38, surfAdmin: 2.40, ecart: -0.02, culture: "Jachère améliorée", certif: "—", maj: "10/07/2025", tf: "Fermage ⚠️", rendPrev: "—", acte: "Bilan sol Oct", type: "cacao-ferm-alerte" },
  { id: "PAR-E1", gps: "5°44'32\"N 6°34'18\"W", surfGPS: 8.18, surfAdmin: 8.20, ecart: -0.02, culture: "Anacarde", certif: "GlobalG.A.P ✅", maj: "10/07/2025", tf: "TF-28714-CI", rendPrev: "0,88 t/ha → 7,2 t", acte: "Récolte Mars 2026", type: "anacarde" },
  { id: "PAR-E2", gps: "5°44'28\"N 6°34'10\"W", surfGPS: 5.79, surfAdmin: 5.80, ecart: -0.01, culture: "Maïs", certif: "—", maj: "10/07/2025", tf: "TF-28715-CI", rendPrev: "3,0 t/ha → 17,4 t", acte: "Récolte Oct 2025", type: "vivrier" },
  { id: "PAR-F1", gps: "5°56'14\"N 5°58'42\"W", surfGPS: 5.98, surfAdmin: 6.00, ecart: -0.02, culture: "Cacao (2023)", certif: "En cours RA", maj: "10/07/2025", tf: "TF en cours 🔄", rendPrev: "1,10 t/ha → 6,6 t", acte: "Régularisation TF", type: "cacao-tf" },
];

/* ─── CARTE SVG ─── */
function CarteInteractive() {
  const [selected, setSelected] = useState<string>("PAR-A1");
  const sel = PARCELLES_DATA.find((p) => p.id === selected)!;

  return (
    <div className="flex gap-4 flex-col lg:flex-row">
      {/* SVG Map */}
      <div className="flex-1 bg-white rounded-2xl border border-gray-100 overflow-hidden" style={{ minHeight: 520 }}>
        <svg viewBox="0 0 800 520" className="w-full" style={{ display: "block" }}>
          <defs>
            {/* Fond beige */}
            <pattern id="bgTerrain" patternUnits="userSpaceOnUse" width="20" height="20">
              <rect width="20" height="20" fill="#FBF8F0" />
              <path d="M0 20 L20 0" stroke="#F0EAD6" strokeWidth="0.4" />
            </pattern>
            {/* Hachures fermage */}
            <pattern id="hatchFerm" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="6" stroke="#1B5E20" strokeWidth="1.5" strokeOpacity="0.4" />
            </pattern>
            {/* Hachures anacarde */}
            <pattern id="hatchAnacarde" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(135)">
              <line x1="0" y1="0" x2="0" y2="6" stroke="#558B2F" strokeWidth="1.2" strokeOpacity="0.35" />
            </pattern>
            {/* Pointillés TF en cours */}
            <pattern id="hatchTF" patternUnits="userSpaceOnUse" width="8" height="8">
              <circle cx="4" cy="4" r="1.2" fill="#795548" opacity="0.5" />
            </pattern>
            {/* Hachures alerte */}
            <pattern id="hatchAlerte" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="6" stroke="#E65100" strokeWidth="1.2" strokeOpacity="0.4" />
            </pattern>
            <filter id="selGlow">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* Fond */}
          <rect width="800" height="520" fill="url(#bgTerrain)" />

          {/* Zone Soubré Nord — étiquette */}
          <rect x="60" y="20" width="420" height="360" rx="12" fill="none" stroke="#A5D6A7" strokeWidth="1.5" strokeDasharray="6,4" />
          <text x="75" y="36" fontSize="9" fill="#388E3C" fontWeight="700" style={{ userSelect: "none" }}>ZONE SOUBRÉ NORD — Exploitation A</text>

          {/* Zone Soubré Sud — étiquette */}
          <rect x="490" y="200" width="260" height="200" rx="10" fill="none" stroke="#A5D6A7" strokeWidth="1.5" strokeDasharray="6,4" />
          <text x="502" y="216" fontSize="9" fill="#388E3C" fontWeight="700" style={{ userSelect: "none" }}>ZONE SOUBRÉ SUD — Exploitation B</text>

          {/* Zone Gagnoa */}
          <rect x="640" y="420" width="100" height="60" rx="8" fill="none" stroke="#BCAAA4" strokeWidth="1.2" strokeDasharray="4,3" />
          <text x="645" y="438" fontSize="8" fill="#795548" fontWeight="600" style={{ userSelect: "none" }}>Gagnoa C</text>
          <text x="645" y="472" fontSize="7" fill="#9E9E9E" style={{ userSelect: "none" }}>↗ 80 km</text>
          {/* Flèche vers Gagnoa */}
          <path d="M 620,450 Q 635,445 640,450" fill="none" stroke="#BCAAA4" strokeWidth="1" markerEnd="url(#arrowGray)" />

          {/* Rivière Davo */}
          <path d="M 40,0 C 50,40 35,80 55,120 C 75,160 45,200 60,240 C 75,280 50,310 65,350" fill="none" stroke="#64B5F6" strokeWidth="5" strokeLinecap="round" opacity="0.6" />
          <path d="M 43,0 C 53,40 38,80 58,120 C 78,160 48,200 63,240 C 78,280 53,310 68,350" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
          <text x="28" y="200" fontSize="8" fill="#1565C0" fontWeight="600" opacity="0.8" transform="rotate(-80,28,200)" style={{ userSelect: "none" }}>Rivière Davo</text>

          {/* Route nationale N1 */}
          <path d="M 0,400 Q 200,392 400,400 Q 550,407 800,398" fill="none" stroke="#8D6E63" strokeWidth="3" strokeLinecap="round" />
          <path d="M 0,400 Q 200,392 400,400 Q 550,407 800,398" fill="none" stroke="#D7CCC8" strokeWidth="1" strokeDasharray="10,7" />
          <text x="300" y="395" fontSize="8" fill="#6D4C41" fontWeight="500" style={{ userSelect: "none" }}>Route nationale N1</text>

          {/* Pistes agricoles */}
          <path d="M 200,80 L 200,390" fill="none" stroke="#D2B48C" strokeWidth="1.5" strokeDasharray="5,4" opacity="0.7" />
          <path d="M 95,240 L 490,240" fill="none" stroke="#D2B48C" strokeWidth="1.5" strokeDasharray="5,4" opacity="0.7" />

          {/* ── PARCELLES Zone A ── */}
          {/* PAR-A1 */}
          <g onClick={() => setSelected("PAR-A1")} style={{ cursor: "pointer" }}>
            <rect x="95" y="50" width="100" height="90" rx="5" fill="#2E7D32" opacity="0.82" stroke={selected === "PAR-A1" ? "#FBBF24" : "white"} strokeWidth={selected === "PAR-A1" ? 2.5 : 1.5} filter={selected === "PAR-A1" ? "url(#selGlow)" : undefined} />
            <text x="145" y="85" textAnchor="middle" fontSize="9" fontWeight="700" fill="white" style={{ userSelect: "none" }}>PAR-A1</text>
            <text x="145" y="97" textAnchor="middle" fontSize="8" fill="rgba(255,255,255,0.9)" style={{ userSelect: "none" }}>6,2 ha</text>
            <text x="145" y="109" textAnchor="middle" fontSize="7.5" fill="rgba(255,255,255,0.8)" style={{ userSelect: "none" }}>Cacao AA</text>
          </g>
          {/* PAR-A2 */}
          <g onClick={() => setSelected("PAR-A2")} style={{ cursor: "pointer" }}>
            <rect x="205" y="50" width="95" height="88" rx="5" fill="#388E3C" opacity="0.82" stroke={selected === "PAR-A2" ? "#FBBF24" : "white"} strokeWidth={selected === "PAR-A2" ? 2.5 : 1.5} />
            <text x="252" y="83" textAnchor="middle" fontSize="9" fontWeight="700" fill="white" style={{ userSelect: "none" }}>PAR-A2</text>
            <text x="252" y="95" textAnchor="middle" fontSize="8" fill="rgba(255,255,255,0.9)" style={{ userSelect: "none" }}>5,8 ha</text>
            <text x="252" y="107" textAnchor="middle" fontSize="7.5" fill="rgba(255,255,255,0.8)" style={{ userSelect: "none" }}>Cacao AA</text>
          </g>
          {/* PAR-A3 */}
          <g onClick={() => setSelected("PAR-A3")} style={{ cursor: "pointer" }}>
            <rect x="310" y="50" width="88" height="80" rx="5" fill="#43A047" opacity="0.82" stroke={selected === "PAR-A3" ? "#FBBF24" : "white"} strokeWidth={selected === "PAR-A3" ? 2.5 : 1.5} />
            <text x="354" y="82" textAnchor="middle" fontSize="9" fontWeight="700" fill="white" style={{ userSelect: "none" }}>PAR-A3</text>
            <text x="354" y="94" textAnchor="middle" fontSize="8" fill="rgba(255,255,255,0.9)" style={{ userSelect: "none" }}>4,8 ha</text>
            <text x="354" y="106" textAnchor="middle" fontSize="7.5" fill="rgba(255,255,255,0.8)" style={{ userSelect: "none" }}>Cacao AA</text>
          </g>
          {/* PAR-B1 — fermage hachures */}
          <g onClick={() => setSelected("PAR-B1")} style={{ cursor: "pointer" }}>
            <rect x="95" y="155" width="78" height="74" rx="5" fill="#2E7D32" opacity="0.65" stroke={selected === "PAR-B1" ? "#FBBF24" : "white"} strokeWidth={selected === "PAR-B1" ? 2.5 : 1.5} />
            <rect x="95" y="155" width="78" height="74" rx="5" fill="url(#hatchFerm)" />
            <text x="134" y="185" textAnchor="middle" fontSize="9" fontWeight="700" fill="white" style={{ userSelect: "none" }}>PAR-B1</text>
            <text x="134" y="197" textAnchor="middle" fontSize="8" fill="rgba(255,255,255,0.9)" style={{ userSelect: "none" }}>3,2 ha</text>
            <text x="134" y="209" textAnchor="middle" fontSize="7" fill="rgba(255,255,255,0.75)" style={{ userSelect: "none" }}>Fermage</text>
          </g>
          {/* PAR-B2 — fermage + alerte bail */}
          <g onClick={() => setSelected("PAR-B2")} style={{ cursor: "pointer" }}>
            <rect x="185" y="155" width="82" height="76" rx="5" fill="#388E3C" opacity="0.6" stroke={selected === "PAR-B2" ? "#FBBF24" : "#E65100"} strokeWidth={selected === "PAR-B2" ? 2.5 : 1.8} />
            <rect x="185" y="155" width="82" height="76" rx="5" fill="url(#hatchAlerte)" />
            <text x="226" y="185" textAnchor="middle" fontSize="9" fontWeight="700" fill="white" style={{ userSelect: "none" }}>PAR-B2</text>
            <text x="226" y="197" textAnchor="middle" fontSize="8" fill="rgba(255,255,255,0.9)" style={{ userSelect: "none" }}>3,4 ha</text>
            {/* Badge alerte */}
            <circle cx="261" cy="161" r="7" fill="#E65100" stroke="white" strokeWidth="1.5" />
            <text x="261" y="165" textAnchor="middle" fontSize="8" fontWeight="700" fill="white" style={{ userSelect: "none" }}>!</text>
          </g>
          {/* PAR-C1 — anacarde */}
          <g onClick={() => setSelected("PAR-C1")} style={{ cursor: "pointer" }}>
            <rect x="280" y="150" width="92" height="82" rx="5" fill="#558B2F" opacity="0.8" stroke={selected === "PAR-C1" ? "#FBBF24" : "white"} strokeWidth={selected === "PAR-C1" ? 2.5 : 1.5} />
            <rect x="280" y="150" width="92" height="82" rx="5" fill="url(#hatchAnacarde)" />
            <text x="326" y="182" textAnchor="middle" fontSize="9" fontWeight="700" fill="white" style={{ userSelect: "none" }}>PAR-C1</text>
            <text x="326" y="194" textAnchor="middle" fontSize="8" fill="rgba(255,255,255,0.9)" style={{ userSelect: "none" }}>5,6 ha</text>
            <text x="326" y="206" textAnchor="middle" fontSize="7.5" fill="rgba(255,255,255,0.8)" style={{ userSelect: "none" }}>Anacarde</text>
          </g>
          {/* PAR-C2 — anacarde */}
          <g onClick={() => setSelected("PAR-C2")} style={{ cursor: "pointer" }}>
            <rect x="382" y="148" width="84" height="78" rx="5" fill="#689F38" opacity="0.8" stroke={selected === "PAR-C2" ? "#FBBF24" : "white"} strokeWidth={selected === "PAR-C2" ? 2.5 : 1.5} />
            <rect x="382" y="148" width="84" height="78" rx="5" fill="url(#hatchAnacarde)" />
            <text x="424" y="180" textAnchor="middle" fontSize="9" fontWeight="700" fill="white" style={{ userSelect: "none" }}>PAR-C2</text>
            <text x="424" y="192" textAnchor="middle" fontSize="8" fill="rgba(255,255,255,0.9)" style={{ userSelect: "none" }}>4,8 ha</text>
          </g>
          {/* PAR-D1 — vivrier jaune */}
          <g onClick={() => setSelected("PAR-D1")} style={{ cursor: "pointer" }}>
            <rect x="95" y="250" width="100" height="90" rx="5" fill="#F9A825" opacity="0.82" stroke={selected === "PAR-D1" ? "#FBBF24" : "white"} strokeWidth={selected === "PAR-D1" ? 2.5 : 1.5} />
            <text x="145" y="285" textAnchor="middle" fontSize="9" fontWeight="700" fill="#5D4037" style={{ userSelect: "none" }}>PAR-D1</text>
            <text x="145" y="297" textAnchor="middle" fontSize="8" fill="#6D4C41" style={{ userSelect: "none" }}>5,6 ha</text>
            <text x="145" y="309" textAnchor="middle" fontSize="7.5" fill="#6D4C41" style={{ userSelect: "none" }}>Maïs/Igname</text>
          </g>
          {/* PAR-D2 — fermage alerte clair */}
          <g onClick={() => setSelected("PAR-D2")} style={{ cursor: "pointer" }}>
            <rect x="207" y="255" width="62" height="72" rx="5" fill="#A5D6A7" opacity="0.72" stroke={selected === "PAR-D2" ? "#FBBF24" : "#E65100"} strokeWidth={selected === "PAR-D2" ? 2.5 : 1.8} />
            <text x="238" y="284" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#2E7D32" style={{ userSelect: "none" }}>PAR-D2</text>
            <text x="238" y="296" textAnchor="middle" fontSize="7.5" fill="#388E3C" style={{ userSelect: "none" }}>2,4 ha</text>
            <circle cx="264" cy="261" r="6" fill="#E65100" stroke="white" strokeWidth="1.5" />
            <text x="264" y="265" textAnchor="middle" fontSize="8" fontWeight="700" fill="white" style={{ userSelect: "none" }}>!</text>
          </g>

          {/* ── ZONE SUD — PAR-E1, PAR-E2 ── */}
          <g onClick={() => setSelected("PAR-E1")} style={{ cursor: "pointer" }}>
            <rect x="500" y="230" width="110" height="85" rx="5" fill="#558B2F" opacity="0.78" stroke={selected === "PAR-E1" ? "#FBBF24" : "white"} strokeWidth={selected === "PAR-E1" ? 2.5 : 1.5} />
            <rect x="500" y="230" width="110" height="85" rx="5" fill="url(#hatchAnacarde)" />
            <text x="555" y="263" textAnchor="middle" fontSize="9" fontWeight="700" fill="white" style={{ userSelect: "none" }}>PAR-E1</text>
            <text x="555" y="275" textAnchor="middle" fontSize="8" fill="rgba(255,255,255,0.9)" style={{ userSelect: "none" }}>8,2 ha</text>
            <text x="555" y="287" textAnchor="middle" fontSize="7.5" fill="rgba(255,255,255,0.8)" style={{ userSelect: "none" }}>Anacarde</text>
          </g>
          <g onClick={() => setSelected("PAR-E2")} style={{ cursor: "pointer" }}>
            <rect x="625" y="230" width="95" height="82" rx="5" fill="#F9A825" opacity="0.82" stroke={selected === "PAR-E2" ? "#FBBF24" : "white"} strokeWidth={selected === "PAR-E2" ? 2.5 : 1.5} />
            <text x="672" y="262" textAnchor="middle" fontSize="9" fontWeight="700" fill="#5D4037" style={{ userSelect: "none" }}>PAR-E2</text>
            <text x="672" y="274" textAnchor="middle" fontSize="8" fill="#6D4C41" style={{ userSelect: "none" }}>5,8 ha</text>
            <text x="672" y="286" textAnchor="middle" fontSize="7.5" fill="#6D4C41" style={{ userSelect: "none" }}>Maïs</text>
          </g>

          {/* ── ZONE GAGNOA — PAR-F1 ── */}
          <g onClick={() => setSelected("PAR-F1")} style={{ cursor: "pointer" }}>
            <rect x="648" y="430" width="82" height="42" rx="5" fill="#795548" opacity="0.65" stroke={selected === "PAR-F1" ? "#FBBF24" : "#BCAAA4"} strokeWidth={selected === "PAR-F1" ? 2.5 : 1.2} />
            <rect x="648" y="430" width="82" height="42" rx="5" fill="url(#hatchTF)" />
            <text x="689" y="448" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="white" style={{ userSelect: "none" }}>PAR-F1</text>
            <text x="689" y="460" textAnchor="middle" fontSize="7.5" fill="rgba(255,255,255,0.85)" style={{ userSelect: "none" }}>6 ha · Cacao</text>
          </g>

          {/* ── Bâtiments ── */}
          {/* Siège social */}
          <g>
            <rect x="100" y="355" width="22" height="18" rx="2" fill="#5D4037" opacity="0.9" />
            <polygon points="111,345 122,355 100,355" fill="#4E342E" />
            <text x="111" y="385" textAnchor="middle" fontSize="7.5" fill="#5D4037" fontWeight="600" style={{ userSelect: "none" }}>Siège</text>
          </g>
          {/* Entrepôt */}
          <g>
            <rect x="415" y="350" width="28" height="20" rx="2" fill="#78909C" opacity="0.9" />
            <polygon points="429,340 443,350 415,350" fill="#607D8B" />
            <text x="429" y="382" textAnchor="middle" fontSize="7.5" fill="#607D8B" fontWeight="600" style={{ userSelect: "none" }}>Entrepôt</text>
          </g>
          {/* Points d'eau */}
          {[[165, 370], [310, 295], [450, 180]].map(([x, y], i) => (
            <g key={i}>
              <circle cx={x} cy={y} r="6" fill="#29B6F6" opacity="0.85" stroke="white" strokeWidth="1.2" />
              <text x={x} y={y + 1} textAnchor="middle" fontSize="7" fill="white" fontWeight="700" style={{ userSelect: "none" }}>💧</text>
            </g>
          ))}
          {/* Bassins piscicoles */}
          {[
            [488, 148, "BAS-01"], [488, 178, "BAS-02"],
            [488, 208, "BAS-03"], [488, 238, "BAS-04"],
          ].map(([x, y, label]) => (
            <g key={label as string}>
              <rect x={x as number} y={y as number} width="36" height="22" rx="3" fill="#1E88E5" opacity="0.7" stroke="#90CAF9" strokeWidth="1" />
              <text x={(x as number) + 18} y={(y as number) + 14} textAnchor="middle" fontSize="7" fill="white" fontWeight="600" style={{ userSelect: "none" }}>{label as string}</text>
            </g>
          ))}
          {/* Poulaillers */}
          <rect x="400" y="95" width="36" height="24" rx="3" fill="#E65100" opacity="0.75" stroke="#FFCC80" strokeWidth="1" />
          <text x="418" y="111" textAnchor="middle" fontSize="7" fill="white" fontWeight="600" style={{ userSelect: "none" }}>🐔 Élevage</text>

          {/* ── Boussole ── */}
          <g transform="translate(762, 480)">
            <circle cx="0" cy="0" r="16" fill="white" stroke="#D1D5DB" strokeWidth="1" opacity="0.92" />
            <text x="0" y="-5" textAnchor="middle" fontSize="8" fontWeight="700" fill="#1F2937" style={{ userSelect: "none" }}>N</text>
            <polygon points="0,-11 2.5,-2 0,0 -2.5,-2" fill="#EF4444" />
            <polygon points="0,11 2.5,2 0,0 -2.5,2" fill="#9CA3AF" />
          </g>

          {/* ── Échelle ── */}
          <g transform="translate(18, 500)">
            <rect x="0" y="0" width="70" height="5" fill="#374151" opacity="0.55" rx="1" />
            <rect x="35" y="0" width="35" height="5" fill="white" opacity="0.55" rx="1" />
            <text x="0" y="-3" fontSize="7.5" fill="#374151" opacity="0.8" style={{ userSelect: "none" }}>0</text>
            <text x="66" y="-3" fontSize="7.5" fill="#374151" opacity="0.8" style={{ userSelect: "none" }}>1 km</text>
          </g>
        </svg>
      </div>

      {/* Panneau latéral parcelle sélectionnée */}
      <div className="lg:w-72 shrink-0 space-y-3">
        {/* Légende */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Légende</div>
          <ul className="space-y-1.5">
            {[
              { c: "#2E7D32", label: "Cacao (propriété)", hatch: false },
              { c: "#2E7D32", label: "Cacao (fermage)", hatch: true },
              { c: "#558B2F", label: "Anacarde", hatch: false },
              { c: "#F9A825", label: "Vivrier (Maïs/Igname)", hatch: false },
              { c: "#795548", label: "En cours TF (pointillé)", hatch: false },
            ].map((item) => (
              <li key={item.label} className="flex items-center gap-2">
                <span className="w-4 h-3 rounded-sm shrink-0 inline-block border border-white" style={{ background: item.c, opacity: item.hatch ? 0.65 : 0.85 }} />
                <span className="text-xs text-gray-700">{item.label}</span>
              </li>
            ))}
            <li className="flex items-center gap-2 mt-1">
              <span className="text-sm">🏠</span>
              <span className="text-xs text-gray-700">Bâtiments</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-sm">💧</span>
              <span className="text-xs text-gray-700">Points d&apos;eau</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-sm">🐟</span>
              <span className="text-xs text-gray-700">Bassins piscicoles</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-sm">🐔</span>
              <span className="text-xs text-gray-700">Élevage / Poulaillers</span>
            </li>
          </ul>
        </div>

        {/* Fiche parcelle sélectionnée */}
        {sel && (
          <div className="bg-white rounded-2xl border border-[#2E7D32] p-4 space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-xs shrink-0" style={{ background: "#2E7D32" }}>
                {sel.id.slice(-2)}
              </span>
              <div>
                <div className="text-sm font-bold text-gray-900">{sel.id}</div>
                <div className="text-xs text-gray-500">{sel.culture} · {sel.surfAdmin} ha</div>
              </div>
            </div>
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-500">GPS centroïde</span>
                <span className="font-mono text-gray-700 text-right text-[10px]">{sel.gps}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Titre foncier</span>
                <span className="font-medium text-gray-800">{sel.tf}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Certification</span>
                <span className="font-medium text-gray-800">{sel.certif}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Rendement prévu</span>
                <span className="font-medium text-gray-800">{sel.rendPrev}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Prochain acte</span>
                <span className="font-medium text-[#E65100]">{sel.acte}</span>
              </div>
            </div>
            <div className="flex flex-col gap-1.5 pt-1">
              <button className="w-full text-xs px-3 py-1.5 rounded-lg text-white font-medium" style={{ background: "#2E7D32" }}>
                Voir fiche parcelle →
              </button>
              <button className="w-full text-xs px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 font-medium hover:bg-gray-50">
                Historique des opérations →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── ONGLET PARCELLES ─── */
function OngletParcelles() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100">
      <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
        <h3 className="font-semibold text-gray-900">Récapitulatif des 12 parcelles — données GPS</h3>
        <span className="text-xs text-gray-500">Superficie totale : 62 ha</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr style={{ backgroundColor: "#F8FBF8" }}>
              {["Parcelle", "Centroïde GPS", "Surface GPS", "Surface admin.", "Écart", "Culture", "Certif.", "Dernière MAJ"].map((h) => (
                <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {PARCELLES_DATA.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 text-xs font-mono font-semibold text-gray-800">{p.id}</td>
                <td className="px-4 py-3 text-xs font-mono text-gray-500 whitespace-nowrap">{p.gps}</td>
                <td className="px-4 py-3 text-xs text-gray-700 text-right">{p.surfGPS.toFixed(2)} ha</td>
                <td className="px-4 py-3 text-xs text-gray-700 text-right">{p.surfAdmin.toFixed(2)} ha</td>
                <td className={`px-4 py-3 text-xs font-medium text-right ${p.ecart > 0 ? "text-green-600" : p.ecart < 0 ? "text-orange-600" : "text-gray-400"}`}>
                  {p.ecart > 0 ? "+" : ""}{p.ecart.toFixed(2)} ha
                </td>
                <td className="px-4 py-3 text-xs text-gray-700 whitespace-nowrap">{p.culture}</td>
                <td className="px-4 py-3 text-xs text-gray-600 whitespace-nowrap">{p.certif}</td>
                <td className="px-4 py-3 text-xs text-gray-500 whitespace-nowrap">{p.maj}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ─── ONGLET ANALYSE SPATIALE ─── */
function OngletAnalyse() {
  const solData = [
    { id: "PAR-A1", pH: "6,0–6,4", color: "#4CAF50", statut: "Optimal cacao" },
    { id: "PAR-A2", pH: "6,0–6,4", color: "#4CAF50", statut: "Optimal cacao" },
    { id: "PAR-A3", pH: "6,0–6,4", color: "#4CAF50", statut: "Optimal cacao" },
    { id: "PAR-B1", pH: "5,8–6,0", color: "#EF9A9A", statut: "Attention acidité" },
    { id: "PAR-B2", pH: "5,8–6,0", color: "#EF9A9A", statut: "Attention acidité" },
    { id: "PAR-C1", pH: "6,4–6,8", color: "#2E7D32", statut: "Bon pour anacarde" },
    { id: "PAR-C2", pH: "6,4–6,8", color: "#2E7D32", statut: "Bon pour anacarde" },
    { id: "PAR-D1", pH: "6,2–6,5", color: "#66BB6A", statut: "Bon pour vivrier" },
    { id: "PAR-D2", pH: "5,9–6,2", color: "#FFCA28", statut: "Correct" },
    { id: "PAR-E1", pH: "6,3–6,7", color: "#2E7D32", statut: "Optimal anacarde" },
    { id: "PAR-E2", pH: "6,1–6,4", color: "#66BB6A", statut: "Bon pour maïs" },
    { id: "PAR-F1", pH: "6,0–6,3", color: "#4CAF50", statut: "Correct cacao" },
  ];

  return (
    <div className="space-y-6">
      {/* Carte pH sol */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <h3 className="font-semibold text-gray-900 mb-4">Analyse sol — pH par parcelle</h3>
        <div className="flex gap-6 flex-wrap">
          {/* Mini-carte pH */}
          <div className="flex-1" style={{ minWidth: 280 }}>
            <svg viewBox="0 0 320 240" className="w-full" style={{ maxHeight: 260 }}>
              <rect width="320" height="240" fill="#FBF8F0" />
              {/* Parcelles colorées par pH */}
              {[
                { x: 30, y: 20, w: 50, h: 45, id: "PAR-A1", pH: "#4CAF50" },
                { x: 88, y: 20, w: 48, h: 43, id: "PAR-A2", pH: "#4CAF50" },
                { x: 142, y: 20, w: 44, h: 40, id: "PAR-A3", pH: "#4CAF50" },
                { x: 30, y: 76, w: 40, h: 38, id: "PAR-B1", pH: "#EF9A9A" },
                { x: 78, y: 75, w: 42, h: 39, id: "PAR-B2", pH: "#EF9A9A" },
                { x: 128, y: 74, w: 46, h: 41, id: "PAR-C1", pH: "#2E7D32" },
                { x: 180, y: 73, w: 42, h: 39, id: "PAR-C2", pH: "#2E7D32" },
                { x: 30, y: 125, w: 50, h: 45, id: "PAR-D1", pH: "#66BB6A" },
                { x: 90, y: 126, w: 32, h: 37, id: "PAR-D2", pH: "#FFCA28" },
                { x: 200, y: 110, w: 55, h: 42, id: "PAR-E1", pH: "#2E7D32" },
                { x: 260, y: 110, w: 48, h: 41, id: "PAR-E2", pH: "#66BB6A" },
                { x: 260, y: 190, w: 42, h: 28, id: "PAR-F1", pH: "#4CAF50" },
              ].map((p) => (
                <g key={p.id}>
                  <rect x={p.x} y={p.y} width={p.w} height={p.h} rx="3" fill={p.pH} opacity="0.75" stroke="white" strokeWidth="1" />
                  <text x={p.x + p.w / 2} y={p.y + p.h / 2 + 4} textAnchor="middle" fontSize="7" fill="white" fontWeight="700" style={{ userSelect: "none" }}>{p.id}</text>
                </g>
              ))}
              {/* Légende pH */}
              <g transform="translate(8, 185)">
                <text fontSize="7.5" fill="#374151" fontWeight="600" style={{ userSelect: "none" }}>pH :</text>
                {[{ c: "#EF9A9A", l: "5,8-6,0" }, { c: "#4CAF50", l: "6,0-6,4" }, { c: "#2E7D32", l: "6,4-6,8" }].map((item, i) => (
                  <g key={item.l} transform={`translate(0, ${14 + i * 13})`}>
                    <rect width="10" height="8" rx="1" fill={item.c} />
                    <text x="13" y="7" fontSize="7" fill="#374151" style={{ userSelect: "none" }}>{item.l}</text>
                  </g>
                ))}
              </g>
            </svg>
          </div>
          {/* Tableau pH */}
          <div className="flex-1 overflow-x-auto" style={{ minWidth: 280 }}>
            <table className="w-full text-sm">
              <thead>
                <tr style={{ backgroundColor: "#F8FBF8" }}>
                  <th className="text-left px-3 py-2 text-xs font-semibold text-gray-500">Parcelle</th>
                  <th className="text-left px-3 py-2 text-xs font-semibold text-gray-500">pH sol</th>
                  <th className="text-left px-3 py-2 text-xs font-semibold text-gray-500">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {solData.map((s) => (
                  <tr key={s.id} className="hover:bg-gray-50">
                    <td className="px-3 py-2 text-xs font-mono font-semibold text-gray-800">{s.id}</td>
                    <td className="px-3 py-2 text-xs text-gray-700">
                      <span className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded-sm inline-block" style={{ background: s.color }} />
                        {s.pH}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-xs text-gray-600">{s.statut}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="mt-4 rounded-xl bg-orange-50 border border-orange-200 p-3">
          <p className="text-xs font-semibold text-orange-800">Recommandation : PAR-B1 / PAR-B2</p>
          <p className="text-xs text-orange-700 mt-0.5">Amendement calcaire recommandé : 500 kg/ha — pH trop acide pour cacao (optimum 6,0–6,5). Intervention conseillée avant la grande saison des pluies.</p>
        </div>
      </div>

      {/* Ombrage / exposition */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <h3 className="font-semibold text-gray-900 mb-4">Analyse ombrage & exposition solaire</h3>
        <div className="space-y-3">
          <div className="rounded-xl bg-green-50 border border-green-200 p-3">
            <p className="text-xs font-semibold text-green-800">PAR-A1, PAR-A2 — Ombrage intégré (arbres forestiers RA)</p>
            <p className="text-xs text-green-700 mt-0.5">Taux d&apos;ombrage 25–30% ✅ — conforme aux exigences Rainforest Alliance. Espèces : Terminalia, Ceiba, Milicia excelsa.</p>
          </div>
          <div className="rounded-xl bg-yellow-50 border border-yellow-200 p-3">
            <p className="text-xs font-semibold text-yellow-800">PAR-C1, PAR-C2 — Plein soleil</p>
            <p className="text-xs text-yellow-700 mt-0.5">Exposition maximale — adapté à l&apos;anacarde (héliophile). Aucune intervention nécessaire.</p>
          </div>
          <div className="rounded-xl bg-blue-50 border border-blue-200 p-3">
            <p className="text-xs font-semibold text-blue-800">PAR-D1 — Exposition mixte</p>
            <p className="text-xs text-blue-700 mt-0.5">Orientation nord-est, bonne luminosité pour maïs et cultures vivrières. Irrigation de complément recommandée en saison sèche.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── ONGLET DONNÉES GPS ─── */
function OngletGPS() {
  const fichiers = [
    { format: "KML (Google Earth)", fichier: "agrifrik-parcelles.kml", parcelles: 12, taille: "24 KB", date: "10/07/2025" },
    { format: "GeoJSON", fichier: "agrifrik-parcelles.geojson", parcelles: 12, taille: "18 KB", date: "10/07/2025" },
    { format: "Shapefile (.shp)", fichier: "agrifrik-parcelles.zip", parcelles: 12, taille: "48 KB", date: "10/07/2025" },
    { format: "CSV coordonnées", fichier: "agrifrik-gps.csv", parcelles: 12, taille: "4 KB", date: "10/07/2025" },
  ];

  const bornes = [
    { borne: "PAR-A1-B1", lat: "5.786524", lon: "-6.607124", alt: "184 m", prec: "±1,8 m", date: "10/07/2025" },
    { borne: "PAR-A1-B2", lat: "5.786842", lon: "-6.607412", alt: "186 m", prec: "±2,1 m", date: "10/07/2025" },
    { borne: "PAR-A1-B3", lat: "5.785921", lon: "-6.607814", alt: "183 m", prec: "±1,9 m", date: "10/07/2025" },
    { borne: "PAR-A1-B4", lat: "5.785614", lon: "-6.607208", alt: "185 m", prec: "±2,0 m", date: "10/07/2025" },
  ];

  return (
    <div className="space-y-6">
      {/* Fichiers exportables */}
      <div className="bg-white rounded-2xl border border-gray-100">
        <div className="px-5 py-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-900">Fichiers SIG exportables</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ backgroundColor: "#F8FBF8" }}>
                {["Format", "Fichier", "Parcelles", "Taille", "Généré le", "Télécharger"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {fichiers.map((f) => (
                <tr key={f.fichier} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-xs font-medium text-gray-900">{f.format}</td>
                  <td className="px-4 py-3 text-xs font-mono text-gray-600">{f.fichier}</td>
                  <td className="px-4 py-3 text-xs text-gray-600 text-center">{f.parcelles}</td>
                  <td className="px-4 py-3 text-xs text-gray-500">{f.taille}</td>
                  <td className="px-4 py-3 text-xs text-gray-500">{f.date}</td>
                  <td className="px-4 py-3">
                    <button className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg text-white font-medium" style={{ background: "#2E7D32" }}>
                      <Download size={11} /> Télécharger
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Points GPS bornage PAR-A1 */}
      <div className="bg-white rounded-2xl border border-gray-100">
        <div className="px-5 py-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-900">Points GPS — Bornage PAR-A1 (exemple 4 bornes)</h3>
          <p className="text-xs text-gray-500 mt-0.5">Relevés GNSS différentiel — Précision moyenne : ±1,95 m</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ backgroundColor: "#F8FBF8" }}>
                {["Borne", "Latitude", "Longitude", "Altitude", "Précision", "Relevé le"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {bornes.map((b) => (
                <tr key={b.borne} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-xs font-mono font-semibold text-gray-800">{b.borne}</td>
                  <td className="px-4 py-3 text-xs font-mono text-gray-600">{b.lat}</td>
                  <td className="px-4 py-3 text-xs font-mono text-gray-600">{b.lon}</td>
                  <td className="px-4 py-3 text-xs text-gray-600">{b.alt}</td>
                  <td className="px-4 py-3 text-xs font-medium" style={{ color: "#2E7D32" }}>{b.prec}</td>
                  <td className="px-4 py-3 text-xs text-gray-500">{b.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ─── TABS CONFIG ─── */
const tabs: { id: TabId; label: string; icon: React.ElementType }[] = [
  { id: "carte",     label: "Carte interactive",  icon: Satellite },
  { id: "parcelles", label: "Parcelles",           icon: Layers },
  { id: "analyse",   label: "Analyse spatiale",    icon: BarChart2 },
  { id: "gps",       label: "Données GPS",         icon: Navigation },
];

/* ─── PAGE ─── */
export default function CartographiePage() {
  const [activeTab, setActiveTab] = useState<TabId>("carte");

  return (
    <div>
      <Topbar title="Cartographie & SIG" breadcrumb={["Production", "Cartographie"]} />

      <div className="p-6 space-y-6">

        {/* KPI */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Kpi label="Parcelles cartographiées" value="12 / 12" sub="100% couverture GPS" />
          <Kpi label="Superficie totale" value="62 ha" sub="12 parcelles actives" />
          <Kpi label="Dernière MAJ GPS" value="10/07/2025" sub="Précision ±2 m" />
          <Kpi label="Certifiées / en cours" value="9 / 3" sub="RA · GlobalG.A.P · TF en cours" />
        </div>

        {/* Onglets */}
        <div className="flex gap-1 border-b border-gray-100 overflow-x-auto">
          {tabs.map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === t.id
                    ? "border-[#2E7D32] text-[#2E7D32]"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                <Icon size={14} />
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Contenu */}
        {activeTab === "carte"     && <CarteInteractive />}
        {activeTab === "parcelles" && <OngletParcelles />}
        {activeTab === "analyse"   && <OngletAnalyse />}
        {activeTab === "gps"       && <OngletGPS />}

      </div>
    </div>
  );
}
