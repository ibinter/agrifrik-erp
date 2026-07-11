"use client";

import { useState } from "react";
import Link from "next/link";
import Topbar from "../../components/Topbar";
import { MapPin, ChevronRight, TreePine, Droplets, Calendar, TrendingUp, AlertTriangle } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

type Culture = "Tous" | "Cacao" | "Anacarde" | "Maïs" | "Riz" | "Autre";
type Statut = "Tous" | "Active" | "En repos" | "En récolte";

interface Parcelle {
  id: string;
  culture: Culture | "Vide";
  surface: number; // ha
  statut: Statut | "En repos";
  rendement: string;
  prochaine: string;
  alerte?: boolean;
  // SVG rect props
  x: number;
  y: number;
  w: number;
  h: number;
  fillColor: string;
  fillOpacity?: number;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const PARCELLES: Parcelle[] = [
  {
    id: "PAR-A1", culture: "Cacao", surface: 6.2, statut: "Active",
    rendement: "1.8 t/ha (cycle 2024)", prochaine: "Taille — Août 2025",
    x: 150, y: 80, w: 160, h: 130, fillColor: "#2E7D32",
  },
  {
    id: "PAR-A2", culture: "Cacao", surface: 5.8, statut: "En récolte",
    rendement: "2.0 t/ha (cycle 2024)", prochaine: "Récolte en cours",
    alerte: true,
    x: 320, y: 80, w: 145, h: 125, fillColor: "#388E3C",
  },
  {
    id: "PAR-A3", culture: "Anacarde", surface: 4.5, statut: "Active",
    rendement: "0.9 t/ha (cycle 2024)", prochaine: "Traitement — Juil 2025",
    x: 150, y: 240, w: 130, h: 110, fillColor: "#F59E0B",
  },
  {
    id: "PAR-C1", culture: "Maïs", surface: 8.0, statut: "Active",
    rendement: "3.2 t/ha (cycle 2024)", prochaine: "Récolte — Sep 2025",
    x: 400, y: 250, w: 190, h: 140, fillColor: "#3B82F6",
  },
  {
    id: "PAR-D1", culture: "Riz", surface: 3.2, statut: "En repos",
    rendement: "2.5 t/ha (cycle 2024)", prochaine: "Préparation sol — Oct 2025",
    x: 150, y: 375, w: 110, h: 90, fillColor: "#92400E", fillOpacity: 0.6,
  },
  {
    id: "PAR-B2", culture: "Vide", surface: 2.1, statut: "En repos",
    rendement: "— (en jachère)", prochaine: "Bilan sol — Nov 2025",
    x: 290, y: 375, w: 100, h: 85, fillColor: "#9CA3AF",
  },
];

const CULTURE_COLORS: Record<string, string> = {
  Cacao: "#2E7D32",
  Anacarde: "#F59E0B",
  Maïs: "#3B82F6",
  Riz: "#92400E",
  Vide: "#9CA3AF",
  Autre: "#6B7280",
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function centreOf(p: Parcelle) {
  return { cx: p.x + p.w / 2, cy: p.y + p.h / 2 };
}

// ─── Mini-arbres SVG ─────────────────────────────────────────────────────────

function Tree({ x, y, size = 1 }: { x: number; y: number; size?: number }) {
  const s = size;
  return (
    <g>
      <rect x={x - 3 * s} y={y} width={6 * s} height={10 * s} fill="#7B5E3A" />
      <circle cx={x} cy={y - 2 * s} r={10 * s} fill="#1B5E20" opacity={0.85} />
      <circle cx={x - 5 * s} cy={y + 2 * s} r={7 * s} fill="#2E7D32" opacity={0.75} />
      <circle cx={x + 5 * s} cy={y + 2 * s} r={7 * s} fill="#2E7D32" opacity={0.75} />
    </g>
  );
}

// ─── Icône culture sur parcelle ───────────────────────────────────────────────

function CultureIcon({ culture, cx, cy }: { culture: string; cx: number; cy: number }) {
  const icons: Record<string, string> = {
    Cacao: "🌱", Anacarde: "🌿", Maïs: "🌽", Riz: "🌾", Vide: "○",
  };
  return (
    <text x={cx} y={cy - 10} textAnchor="middle" fontSize={14} style={{ userSelect: "none" }}>
      {icons[culture] ?? "🌱"}
    </text>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CartographiePage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filterCulture, setFilterCulture] = useState<Culture>("Tous");
  const [filterStatut, setFilterStatut] = useState<Statut>("Tous");

  const cultures: Culture[] = ["Tous", "Cacao", "Anacarde", "Maïs", "Riz", "Autre"];
  const statuts: Statut[] = ["Tous", "Active", "En repos", "En récolte"];

  const selected = PARCELLES.find((p) => p.id === selectedId) ?? null;

  function isVisible(p: Parcelle) {
    const cOk =
      filterCulture === "Tous" ||
      p.culture === filterCulture ||
      (filterCulture === "Autre" && !["Cacao", "Anacarde", "Maïs", "Riz", "Vide", "Tous"].includes(p.culture));
    const sOk = filterStatut === "Tous" || p.statut === filterStatut;
    return cOk && sOk;
  }

  // Hatch pattern id per culture
  const hatchId = (c: string) => `hatch-${c.toLowerCase()}`;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Topbar title="Cartographie" breadcrumb={["Cartographie"]} />

      <div className="flex flex-1 overflow-hidden">
        {/* ── Panneau gauche ── */}
        <aside className="w-80 shrink-0 border-r border-gray-100 bg-white flex flex-col overflow-y-auto">
          <div className="p-5 border-b border-gray-100">
            <p className="text-base font-semibold text-gray-900 mb-4">Mes exploitations</p>

            {/* Filtre culture */}
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Culture</p>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {cultures.map((c) => (
                <button
                  key={c}
                  onClick={() => setFilterCulture(c)}
                  className={`text-xs px-2.5 py-1 rounded-lg border transition-all ${
                    filterCulture === c
                      ? "border-transparent text-white"
                      : "border-gray-200 text-gray-600 bg-white hover:bg-gray-50"
                  }`}
                  style={filterCulture === c ? { background: CULTURE_COLORS[c] ?? "#2E7D32" } : {}}
                >
                  {c}
                </button>
              ))}
            </div>

            {/* Filtre statut */}
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Statut</p>
            <div className="flex flex-wrap gap-1.5">
              {statuts.map((s) => (
                <button
                  key={s}
                  onClick={() => setFilterStatut(s)}
                  className={`text-xs px-2.5 py-1 rounded-lg border transition-all ${
                    filterStatut === s
                      ? "bg-gray-800 text-white border-transparent"
                      : "border-gray-200 text-gray-600 bg-white hover:bg-gray-50"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Légende */}
          <div className="p-5 border-b border-gray-100">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Légende</p>
            <ul className="space-y-2">
              {[
                { label: "Cacao", color: "#2E7D32", dot: true },
                { label: "Anacarde", color: "#F59E0B", dot: true },
                { label: "Maïs", color: "#3B82F6", dot: true },
                { label: "Riz paddy", color: "#92400E", dot: true },
                { label: "Vide / En jachère", color: "#9CA3AF", dot: true },
              ].map((item) => (
                <li key={item.label} className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-sm shrink-0 inline-block"
                    style={{ background: item.color }}
                  />
                  <span className="text-xs text-gray-700">{item.label}</span>
                </li>
              ))}
              <li className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-sm shrink-0 inline-block bg-red-500 animate-pulse" />
                <span className="text-xs text-gray-700">Alerte active</span>
              </li>
            </ul>
          </div>

          {/* Liste parcelles */}
          <div className="p-5 flex-1">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Parcelles</p>
            <ul className="space-y-1.5">
              {PARCELLES.filter(isVisible).map((p) => (
                <li key={p.id}>
                  <button
                    onClick={() => setSelectedId(p.id === selectedId ? null : p.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all ${
                      selectedId === p.id
                        ? "bg-green-50 border border-green-200"
                        : "hover:bg-gray-50 border border-transparent"
                    }`}
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ background: CULTURE_COLORS[p.culture] ?? "#6B7280" }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-semibold text-gray-800">{p.id}</span>
                        {p.alerte && <AlertTriangle size={11} className="text-red-500 shrink-0" />}
                      </div>
                      <span className="text-xs text-gray-500">
                        {p.culture} · {p.surface} ha
                      </span>
                    </div>
                    <ChevronRight size={13} className="text-gray-300 shrink-0" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* ── Zone principale ── */}
        <main className="flex-1 flex flex-col overflow-hidden p-6 gap-4">
          {/* Carte SVG */}
          <div className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden relative">
            {/* Mini stats overlay */}
            <div className="absolute top-4 left-4 flex gap-2 z-10 flex-wrap">
              {[
                { v: "143 ha", l: "total" },
                { v: "6", l: "parcelles" },
                { v: "4", l: "cultures" },
                { v: "62%", l: "certifié" },
              ].map((s) => (
                <div
                  key={s.l}
                  className="bg-white/90 backdrop-blur-sm rounded-xl px-3 py-1.5 shadow-sm border border-gray-100"
                >
                  <span className="text-sm font-bold text-gray-900">{s.v}</span>
                  <span className="text-xs text-gray-500 ml-1">{s.l}</span>
                </div>
              ))}
            </div>

            <svg
              viewBox="0 0 700 500"
              className="w-full h-full"
              style={{ display: "block", minHeight: 340 }}
            >
              <defs>
                {/* Gradient fond */}
                <linearGradient id="bgGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#E8F5E9" />
                  <stop offset="100%" stopColor="#C8E6C9" />
                </linearGradient>

                {/* Hachures légères par culture */}
                <pattern id={hatchId("cacao")} patternUnits="userSpaceOnUse" width="8" height="8" patternTransform="rotate(45)">
                  <line x1="0" y1="0" x2="0" y2="8" stroke="#1B5E20" strokeWidth="1.5" strokeOpacity="0.2" />
                </pattern>
                <pattern id={hatchId("anacarde")} patternUnits="userSpaceOnUse" width="8" height="8" patternTransform="rotate(135)">
                  <line x1="0" y1="0" x2="0" y2="8" stroke="#92400E" strokeWidth="1.5" strokeOpacity="0.25" />
                </pattern>
                <pattern id={hatchId("maïs")} patternUnits="userSpaceOnUse" width="8" height="8">
                  <line x1="0" y1="0" x2="8" y2="0" stroke="#1D4ED8" strokeWidth="1" strokeOpacity="0.2" />
                  <line x1="0" y1="4" x2="8" y2="4" stroke="#1D4ED8" strokeWidth="1" strokeOpacity="0.2" />
                </pattern>
                <pattern id={hatchId("riz")} patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(90)">
                  <line x1="0" y1="0" x2="0" y2="6" stroke="#78350F" strokeWidth="1" strokeOpacity="0.3" />
                </pattern>

                {/* Gradient rivière */}
                <linearGradient id="riverGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#60A5FA" />
                  <stop offset="100%" stopColor="#3B82F6" />
                </linearGradient>

                {/* Alerte glow filter */}
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* ── Fond terrain ── */}
              <rect x="0" y="0" width="700" height="500" fill="url(#bgGrad)" />

              {/* Grille légère */}
              {Array.from({ length: 14 }).map((_, i) => (
                <line key={`vg${i}`} x1={i * 50} y1="0" x2={i * 50} y2="500" stroke="#A5D6A7" strokeWidth="0.5" opacity="0.4" />
              ))}
              {Array.from({ length: 10 }).map((_, i) => (
                <line key={`hg${i}`} x1="0" y1={i * 50} x2="700" y2={i * 50} stroke="#A5D6A7" strokeWidth="0.5" opacity="0.4" />
              ))}

              {/* ── Rivière sinueuse ── */}
              <path
                d="M 90,0 C 85,60 100,100 80,160 C 60,220 95,270 75,330 C 55,390 85,440 70,500"
                fill="none"
                stroke="url(#riverGrad)"
                strokeWidth="10"
                strokeLinecap="round"
                opacity="0.8"
              />
              {/* Reflet rivière */}
              <path
                d="M 93,0 C 88,60 103,100 83,160 C 63,220 98,270 78,330 C 58,390 88,440 73,500"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                opacity="0.5"
              />
              {/* Label rivière */}
              <text
                x="54" y="250"
                fill="#1D4ED8"
                fontSize="9"
                fontWeight="600"
                opacity="0.7"
                transform="rotate(-85, 54, 250)"
                style={{ userSelect: "none" }}
              >
                Rivière Bandama
              </text>

              {/* ── Route horizontale ── */}
              <path
                d="M 0,220 Q 200,210 400,222 Q 550,234 700,218"
                fill="none"
                stroke="#9CA3AF"
                strokeWidth="7"
                strokeLinecap="round"
              />
              {/* Marquage central route */}
              <path
                d="M 0,220 Q 200,210 400,222 Q 550,234 700,218"
                fill="none"
                stroke="#E5E7EB"
                strokeWidth="1.5"
                strokeDasharray="12,8"
                strokeLinecap="round"
              />
              <text x="340" y="214" fill="#6B7280" fontSize="8" fontWeight="500" style={{ userSelect: "none" }}>
                Route nationale RN6
              </text>

              {/* ── Arbres décoratifs ── */}
              <Tree x={112} y={440} size={1.1} />
              <Tree x={130} y={455} size={0.9} />
              <Tree x={96} y={452} size={0.85} />
              <Tree x={610} y={60} size={1.0} />
              <Tree x={628} y={75} size={0.9} />
              <Tree x={648} y={58} size={1.0} />
              <Tree x={660} y={78} size={0.85} />
              <Tree x={610} y={400} size={1.0} />
              <Tree x={635} y={415} size={0.9} />
              <Tree x={655} y={395} size={1.1} />

              {/* ── Parcelles ── */}
              {PARCELLES.map((p) => {
                const visible = isVisible(p);
                const isSelected = selectedId === p.id;
                const { cx, cy } = centreOf(p);
                const hId = hatchId(p.culture.toLowerCase());
                const opacity = visible ? 0.85 : 0.2;

                return (
                  <g
                    key={p.id}
                    style={{ cursor: visible ? "pointer" : "default" }}
                    onClick={() => visible && setSelectedId(p.id === selectedId ? null : p.id)}
                  >
                    {/* Ombre portée */}
                    <rect
                      x={p.x + 3}
                      y={p.y + 3}
                      width={p.w}
                      height={p.h}
                      rx="4"
                      fill="#00000020"
                    />
                    {/* Base color */}
                    <rect
                      x={p.x}
                      y={p.y}
                      width={p.w}
                      height={p.h}
                      rx="4"
                      fill={p.fillColor}
                      fillOpacity={(p.fillOpacity ?? 1) * opacity}
                      stroke={isSelected ? "#FBBF24" : "white"}
                      strokeWidth={isSelected ? 3 : 2}
                      filter={p.alerte ? "url(#glow)" : undefined}
                    />
                    {/* Hachures */}
                    {["Cacao", "Anacarde", "Maïs", "Riz"].includes(p.culture) && (
                      <rect
                        x={p.x}
                        y={p.y}
                        width={p.w}
                        height={p.h}
                        rx="4"
                        fill={`url(#${hId})`}
                        opacity={visible ? 1 : 0.2}
                      />
                    )}

                    {/* Icône culture */}
                    {visible && (
                      <CultureIcon culture={p.culture} cx={cx} cy={cy} />
                    )}

                    {/* Label code */}
                    {visible && (
                      <text
                        x={cx}
                        y={cy + 8}
                        textAnchor="middle"
                        fill="white"
                        fontSize="11"
                        fontWeight="700"
                        style={{ userSelect: "none", textShadow: "0 1px 2px rgba(0,0,0,0.5)" }}
                      >
                        {p.id}
                      </text>
                    )}

                    {/* Surface */}
                    {visible && (
                      <text
                        x={cx}
                        y={cy + 22}
                        textAnchor="middle"
                        fill="rgba(255,255,255,0.85)"
                        fontSize="9"
                        style={{ userSelect: "none" }}
                      >
                        {p.culture !== "Vide" ? p.surface + " ha" : "Jachère"}
                      </text>
                    )}

                    {/* Badge alerte */}
                    {p.alerte && visible && (
                      <g>
                        <circle cx={p.x + p.w - 8} cy={p.y + 8} r="7" fill="#EF4444" stroke="white" strokeWidth="1.5" />
                        <text x={p.x + p.w - 8} y={p.y + 12} textAnchor="middle" fill="white" fontSize="8" fontWeight="700" style={{ userSelect: "none" }}>!</text>
                      </g>
                    )}
                  </g>
                );
              })}

              {/* Boussole */}
              <g transform="translate(666, 470)">
                <circle cx="0" cy="0" r="16" fill="white" stroke="#D1D5DB" strokeWidth="1" opacity="0.9" />
                <text x="0" y="-6" textAnchor="middle" fontSize="8" fontWeight="700" fill="#1F2937" style={{ userSelect: "none" }}>N</text>
                <polygon points="0,-12 3,-2 0,0 -3,-2" fill="#EF4444" />
                <polygon points="0,12 3,2 0,0 -3,2" fill="#9CA3AF" />
              </g>

              {/* Échelle */}
              <g transform="translate(20, 480)">
                <rect x="0" y="0" width="60" height="4" fill="#374151" opacity="0.6" rx="1" />
                <rect x="30" y="0" width="30" height="4" fill="white" opacity="0.6" rx="1" />
                <text x="0" y="-3" fontSize="7" fill="#374151" opacity="0.8" style={{ userSelect: "none" }}>0</text>
                <text x="56" y="-3" fontSize="7" fill="#374151" opacity="0.8" style={{ userSelect: "none" }}>500m</text>
              </g>
            </svg>
          </div>

          {/* ── Panneau détail parcelle ── */}
          {selected ? (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm shrink-0"
                    style={{ background: CULTURE_COLORS[selected.culture] ?? "#6B7280" }}
                  >
                    {selected.id.slice(4)}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-gray-900">{selected.id}</h3>
                      {selected.alerte && (
                        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-red-100 text-red-700 flex items-center gap-1">
                          <AlertTriangle size={10} /> Alerte
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500">{selected.culture} · {selected.surface} ha</p>
                  </div>
                </div>
                <Link
                  href="/cultures"
                  className="text-xs font-medium px-3 py-1.5 rounded-lg text-white flex items-center gap-1"
                  style={{ background: "#2E7D32" }}
                >
                  Voir détails complets <ChevronRight size={12} />
                </Link>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="rounded-xl bg-gray-50 p-3">
                  <div className="flex items-center gap-1.5 mb-1">
                    <MapPin size={12} className="text-gray-400" />
                    <span className="text-xs text-gray-500 font-medium">Statut</span>
                  </div>
                  <p className="text-sm font-semibold text-gray-900">{selected.statut}</p>
                </div>
                <div className="rounded-xl bg-gray-50 p-3">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Droplets size={12} className="text-gray-400" />
                    <span className="text-xs text-gray-500 font-medium">Surface</span>
                  </div>
                  <p className="text-sm font-semibold text-gray-900">{selected.surface} ha</p>
                </div>
                <div className="rounded-xl bg-gray-50 p-3">
                  <div className="flex items-center gap-1.5 mb-1">
                    <TrendingUp size={12} className="text-gray-400" />
                    <span className="text-xs text-gray-500 font-medium">Rendement</span>
                  </div>
                  <p className="text-sm font-semibold text-gray-900">{selected.rendement}</p>
                </div>
                <div className="rounded-xl bg-gray-50 p-3">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Calendar size={12} className="text-gray-400" />
                    <span className="text-xs text-gray-500 font-medium">Prochaine intervention</span>
                  </div>
                  <p className="text-sm font-semibold text-gray-900">{selected.prochaine}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-4 flex items-center gap-3 text-gray-400">
              <TreePine size={16} />
              <p className="text-sm">Cliquez sur une parcelle pour afficher ses détails.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
