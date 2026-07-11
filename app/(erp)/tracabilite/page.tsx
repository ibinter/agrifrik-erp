"use client";

import { useState } from "react";
import Topbar from "../../components/Topbar";
import {
  Search,
  Leaf,
  Scissors,
  FlaskConical,
  Sun,
  ClipboardCheck,
  Warehouse,
  Ship,
  ChevronDown,
  ChevronUp,
  Link,
  Filter,
} from "lucide-react";

// ─── KPI ─────────────────────────────────────────────────────────────────────

const kpis = [
  { label: "Lots tracés 2025", value: "48", color: "#2E7D32", bg: "#E8F5E9" },
  { label: "Volume tracé", value: "94,2 t", color: "#1565C0", bg: "#E3F2FD" },
  { label: "Taux de traçabilité", value: "100%", color: "#00695C", bg: "#E0F2F1" },
  { label: "Certifications couvertes", value: "RA + GlobalG.A.P.", color: "#6A1B9A", bg: "#F3E5F5" },
  { label: "Lots exportés", value: "32", color: "#E65100", bg: "#FFF3E0" },
];

// ─── Lots actifs ──────────────────────────────────────────────────────────────

const lotsActifs = [
  {
    lot: "LOT-2025-048",
    parcelles: "PAR-A1, PAR-A2",
    dateRecolte: "28/06/2025",
    poidsBrut: "2 840 kg",
    poidsNet: "2 680 kg",
    humidite: "7,2%",
    grade: "AA",
    statut: "🟡 Fermentation J5",
    destination: "Barry Callebaut",
  },
  {
    lot: "LOT-2025-047",
    parcelles: "PAR-A3",
    dateRecolte: "25/06/2025",
    poidsBrut: "1 920 kg",
    poidsNet: "1 810 kg",
    humidite: "8,1%",
    grade: "A",
    statut: "🟡 Séchage J8",
    destination: "Barry Callebaut",
  },
  {
    lot: "LOT-2025-046",
    parcelles: "PAR-B1, PAR-B2",
    dateRecolte: "22/06/2025",
    poidsBrut: "3 180 kg",
    poidsNet: "3 020 kg",
    humidite: "7,8%",
    grade: "AA",
    statut: "✅ Conditionné",
    destination: "Nestlé/Abidjan",
  },
  {
    lot: "LOT-2025-045",
    parcelles: "PAR-A1",
    dateRecolte: "18/06/2025",
    poidsBrut: "2 640 kg",
    poidsNet: "2 490 kg",
    humidite: "7,4%",
    grade: "AA",
    statut: "🔵 En transit",
    destination: "Cargill Rotterdam",
  },
  {
    lot: "LOT-2025-044",
    parcelles: "PAR-C1, PAR-C2",
    dateRecolte: "14/06/2025",
    poidsBrut: "1 840 kg",
    poidsNet: "1 720 kg",
    humidite: "8,4%",
    grade: "A",
    statut: "✅ Livré",
    destination: "Olam CI",
  },
  {
    lot: "LOT-2025-043",
    parcelles: "PAR-B2",
    dateRecolte: "10/06/2025",
    poidsBrut: "2 100 kg",
    poidsNet: "1 980 kg",
    humidite: "7,6%",
    grade: "AA",
    statut: "✅ Livré",
    destination: "Barry Callebaut",
  },
  {
    lot: "LOT-2025-042",
    parcelles: "PAR-A2, PAR-A3",
    dateRecolte: "06/06/2025",
    poidsBrut: "3 400 kg",
    poidsNet: "3 210 kg",
    humidite: "7,5%",
    grade: "AA",
    statut: "✅ Livré",
    destination: "Cargill Rotterdam",
  },
  {
    lot: "LOT-2025-041",
    parcelles: "PAR-C1",
    dateRecolte: "02/06/2025",
    poidsBrut: "1 560 kg",
    poidsNet: "1 470 kg",
    humidite: "8,0%",
    grade: "A",
    statut: "✅ Livré",
    destination: "Nestlé/Abidjan",
  },
  {
    lot: "LOT-2025-040",
    parcelles: "PAR-B1",
    dateRecolte: "28/05/2025",
    poidsBrut: "2 280 kg",
    poidsNet: "2 150 kg",
    humidite: "7,3%",
    grade: "AA",
    statut: "✅ Livré",
    destination: "Olam CI",
  },
  {
    lot: "LOT-2025-039",
    parcelles: "PAR-A1, PAR-A2",
    dateRecolte: "24/05/2025",
    poidsBrut: "3 060 kg",
    poidsNet: "2 890 kg",
    humidite: "7,8%",
    grade: "AA",
    statut: "✅ Livré",
    destination: "Barry Callebaut",
  },
  {
    lot: "LOT-2025-038",
    parcelles: "PAR-C2",
    dateRecolte: "20/05/2025",
    poidsBrut: "1 700 kg",
    poidsNet: "1 600 kg",
    humidite: "8,2%",
    grade: "A",
    statut: "✅ Livré",
    destination: "Cargill Rotterdam",
  },
  {
    lot: "LOT-2025-037",
    parcelles: "PAR-A3, PAR-B1",
    dateRecolte: "16/05/2025",
    poidsBrut: "2 920 kg",
    poidsNet: "2 760 kg",
    humidite: "7,6%",
    grade: "AA",
    statut: "✅ Livré",
    destination: "Nestlé/Abidjan",
  },
];

// ─── Timeline LOT-2025-045 ────────────────────────────────────────────────────

type Etape = {
  num: number;
  label: string;
  icon: React.ElementType;
  iconColor: string;
  iconBg: string;
  statut: "done" | "transit";
  details: { key: string; value: string }[];
};

const etapesLot045: Etape[] = [
  {
    num: 1,
    label: "Parcelle d'origine",
    icon: Leaf,
    iconColor: "#2E7D32",
    iconBg: "#E8F5E9",
    statut: "done",
    details: [
      { key: "Parcelle", value: "PAR-A1 (6,2 ha) — Zone Soubré Nord" },
      { key: "Producteur", value: "Ibrahim Sawadogo (COOP-0042)" },
      { key: "Certification parcelle", value: "Rainforest Alliance ✅ (C-CI-2025-1847)" },
      { key: "Coordonnées GPS", value: "5°47'12\"N 6°36'24\"W" },
      { key: "Variété", value: "Forastero hybride — Plantation 2008" },
      { key: "Données sol", value: "pH 6,2 | MO 3,8% | Limon argileux" },
      { key: "Dernier traitement", value: "Ridomil Gold 24/06/2025 (DRE 14j — OK)" },
    ],
  },
  {
    num: 2,
    label: "Récolte",
    icon: Scissors,
    iconColor: "#6A1B9A",
    iconBg: "#F3E5F5",
    statut: "done",
    details: [
      { key: "Date", value: "18/06/2025 | Opérateur : Ibrahim Sawadogo + 3 saisonniers" },
      { key: "Méthode", value: "Récolte manuelle (cabosses matures orangées/jaunes)" },
      { key: "Quantité cabosse", value: "8 420 kg (rendement extraction 31,4%)" },
      { key: "Écabossage", value: "19/06/2025 | Fèves fraîches : 2 640 kg" },
      { key: "Contrôle qualité initial", value: "0 fève moisie | 0 insecte | pH 3,4" },
    ],
  },
  {
    num: 3,
    label: "Fermentation",
    icon: FlaskConical,
    iconColor: "#E65100",
    iconBg: "#FFF3E0",
    statut: "done",
    details: [
      { key: "Lieu", value: "Site de fermentation Soubré Nord (capacité 6 bacs 500 kg)" },
      { key: "Bacs utilisés", value: "BAC-A1 (1 500 kg) + BAC-A3 (1 140 kg)" },
      { key: "Durée", value: "6 jours (18→24 juin 2025)" },
      { key: "Température J3", value: "52°C ✅ | J5 : 48°C ✅" },
      { key: "Retournements", value: "J2 (20/06), J4 (22/06) — enregistrés avec horodatage" },
      { key: "Cut test fin fermentation", value: "94% brunes ✅ | 4% violettes | 2% ardoisées" },
    ],
  },
  {
    num: 4,
    label: "Séchage",
    icon: Sun,
    iconColor: "#F59E0B",
    iconBg: "#FFFBEB",
    statut: "done",
    details: [
      { key: "Type", value: "Claies solaires (3 jours) + Séchoir artificiel BioEnergy (3 jours)" },
      { key: "Durée totale", value: "6 jours (24→30 juin 2025)" },
      { key: "Humidité", value: "Initiale 58% → finale 7,4% ✅ (objectif <8%)" },
      { key: "Température séchoir", value: "45°C (maxi 55°C)" },
      { key: "Brassages quotidiens", value: "6 (matin + soir × 3 jours)" },
    ],
  },
  {
    num: 5,
    label: "Contrôle qualité & Classement",
    icon: ClipboardCheck,
    iconColor: "#00695C",
    iconBg: "#E0F2F1",
    statut: "done",
    details: [
      { key: "Date", value: "30/06/2025 | Contrôleur : Adjoua Messou" },
      { key: "Poids après séchage", value: "2 490 kg (pertes séchage : 5,7%)" },
      { key: "Cut test 100 fèves", value: "Brunes bien fermentées : 96 ✅ | Violettes : 2 ⚠️ | Ardoisées : 1 ⚠️ | Moisies : 1 ⚠️" },
      { key: "Score", value: "96/100 → Grade AA (≥95)" },
      { key: "Granulométrie", value: "100 fèves = 98g (densité correcte)" },
      { key: "Humidité", value: "7,4% (norme ≤8%)" },
      { key: "Résidus chimiques", value: "0 détecté (test rapide immunochromatographie)" },
      { key: "Rapport", value: "CQ-LOT-2025-045.pdf ✅" },
    ],
  },
  {
    num: 6,
    label: "Conditionnement & Stockage",
    icon: Warehouse,
    iconColor: "#37474F",
    iconBg: "#ECEFF1",
    statut: "done",
    details: [
      { key: "Date", value: "01/07/2025 | Lieu : Entrepôt A — Zone 1" },
      { key: "Sacs jute 60 kg", value: "41 sacs + 30 kg (41,5 sacs équivalent)" },
      { key: "Marque", value: "AGRIFRIK CACAO AA — CI 2025 — LOT-045" },
      { key: "Palettes", value: "2 (21 sacs + 20 sacs)" },
      { key: "Température stockage", value: "24°C | Humidité : 65%" },
    ],
  },
  {
    num: 7,
    label: "Export",
    icon: Ship,
    iconColor: "#1565C0",
    iconBg: "#E3F2FD",
    statut: "transit",
    details: [
      { key: "Client", value: "Cargill International SA (Rotterdam)" },
      { key: "Contrat", value: "CTR-2025-018 | Incoterm : FOB San-Pédro" },
      { key: "Container", value: "CAIU 842156-4 (20 pieds — capacité 20 t)" },
      { key: "Chargement", value: "08/07/2025 — Port de San-Pédro" },
      { key: "Navire", value: "MSC Allegria | Départ : 10/07/2025" },
      { key: "ETA Rotterdam", value: "05/08/2025" },
      { key: "Documents", value: "Phytosanitaire MINADER ✅ | Certificat RA ✅ | Packing list ✅ | BL ✅" },
    ],
  },
];

// ─── Blockchain records ───────────────────────────────────────────────────────

const blockchainRecords = [
  { lot: "LOT-045", hash: "0x4f2a8c...", bloc: "#84521", datetime: "01/07 14:32", reseau: "HLF Agri-CI", verification: "✅ Valide" },
  { lot: "LOT-046", hash: "0x7e1b9d...", bloc: "#84498", datetime: "29/06 09:17", reseau: "HLF Agri-CI", verification: "✅ Valide" },
  { lot: "LOT-044", hash: "0x2c6f4a...", bloc: "#84412", datetime: "22/06 11:45", reseau: "HLF Agri-CI", verification: "✅ Valide" },
  { lot: "LOT-043", hash: "0x9a3e7b...", bloc: "#84380", datetime: "18/06 16:20", reseau: "HLF Agri-CI", verification: "✅ Valide" },
  { lot: "LOT-042", hash: "0x1d8f2c...", bloc: "#84291", datetime: "14/06 08:55", reseau: "HLF Agri-CI", verification: "✅ Valide" },
];

// ─── Stats SVG ────────────────────────────────────────────────────────────────

function BarChart({ data }: { data: { label: string; value: number; color: string }[] }) {
  const max = Math.max(...data.map((d) => d.value));
  const h = 120;
  const barW = 36;
  const gap = 16;
  const total = data.length * (barW + gap) - gap;
  return (
    <svg viewBox={`0 0 ${total + 20} ${h + 32}`} className="w-full" style={{ maxHeight: 160 }}>
      {data.map((d, i) => {
        const x = 10 + i * (barW + gap);
        const barH = Math.round((d.value / max) * h);
        const y = h - barH;
        return (
          <g key={d.label}>
            <rect x={x} y={y} width={barW} height={barH} rx={4} fill={d.color} opacity={0.85} />
            <text x={x + barW / 2} y={y - 4} textAnchor="middle" fontSize={10} fill={d.color} fontWeight="700">{d.value}</text>
            <text x={x + barW / 2} y={h + 14} textAnchor="middle" fontSize={9} fill="#6B7280">{d.label}</text>
          </g>
        );
      })}
    </svg>
  );
}

function DonutChart({ segments }: { segments: { label: string; value: number; color: string }[] }) {
  const total = segments.reduce((s, d) => s + d.value, 0);
  const r = 52;
  const cx = 70;
  const cy = 70;
  let startAngle = -Math.PI / 2;
  const paths: { d: string; color: string }[] = [];
  for (const seg of segments) {
    const angle = (seg.value / total) * 2 * Math.PI;
    const x1 = cx + r * Math.cos(startAngle);
    const y1 = cy + r * Math.sin(startAngle);
    const x2 = cx + r * Math.cos(startAngle + angle);
    const y2 = cy + r * Math.sin(startAngle + angle);
    const large = angle > Math.PI ? 1 : 0;
    paths.push({ d: `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} Z`, color: seg.color });
    startAngle += angle;
  }
  return (
    <div className="flex items-center gap-4">
      <svg width="140" height="140" viewBox="0 0 140 140">
        {paths.map((p, i) => <path key={i} d={p.d} fill={p.color} />)}
        <circle cx={cx} cy={cy} r={30} fill="white" />
        <text x={cx} y={cy + 4} textAnchor="middle" fontSize={11} fontWeight="700" fill="#374151">{total}</text>
        <text x={cx} y={cy + 14} textAnchor="middle" fontSize={8} fill="#9CA3AF">lots</text>
      </svg>
      <div className="space-y-1.5">
        {segments.map((s) => (
          <div key={s.label} className="flex items-center gap-2 text-xs">
            <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: s.color }} />
            <span className="text-gray-600 dark:text-gray-400">{s.label}</span>
            <span className="font-semibold text-gray-800 dark:text-gray-200 ml-auto">{s.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Expandable Timeline Step ─────────────────────────────────────────────────

function TimelineStep({ etape, isLast }: { etape: Etape; isLast: boolean }) {
  const [open, setOpen] = useState(etape.num === 7);
  const Icon = etape.icon;
  return (
    <div className={`relative flex gap-4 ${isLast ? "" : "pb-5"}`}>
      {/* vertical line */}
      {!isLast && (
        <div className="absolute left-5 top-10 bottom-0 w-px bg-gray-200 dark:bg-gray-700" />
      )}
      {/* icon */}
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 z-10 border-2 border-white dark:border-gray-900"
        style={{ backgroundColor: etape.iconBg }}
      >
        <Icon size={18} style={{ color: etape.iconColor }} />
      </div>
      {/* card */}
      <div className="flex-1 rounded-xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 overflow-hidden">
        <button
          className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-700/40 transition-colors"
          onClick={() => setOpen((v) => !v)}
        >
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Étape {etape.num}</span>
            <span className="font-semibold text-sm text-gray-900 dark:text-white">{etape.label}</span>
            {etape.statut === "done" ? (
              <span className="text-xs font-medium text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-2 py-0.5 rounded-full">✅ Terminé</span>
            ) : (
              <span className="text-xs font-medium text-blue-700 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 px-2 py-0.5 rounded-full">🔵 En transit</span>
            )}
          </div>
          {open ? <ChevronUp size={15} className="text-gray-400 flex-shrink-0" /> : <ChevronDown size={15} className="text-gray-400 flex-shrink-0" />}
        </button>
        {open && (
          <div className="px-4 pb-4 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 border-t border-gray-100 dark:border-gray-700 pt-3">
            {etape.details.map((d) => (
              <div key={d.key} className="flex gap-1.5 text-xs">
                <span className="text-gray-500 dark:text-gray-400 shrink-0 min-w-28">{d.key} :</span>
                <span className="text-gray-800 dark:text-gray-200 font-medium">{d.value}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TracabilitePage() {
  const [onglet, setOnglet] = useState<"lots" | "timeline" | "blockchain" | "stats">("lots");
  const [search, setSearch] = useState("");

  const onglets = [
    { key: "lots" as const, label: "Lots actifs" },
    { key: "timeline" as const, label: "Traçabilité complète" },
    { key: "blockchain" as const, label: "Blockchain" },
    { key: "stats" as const, label: "Statistiques" },
  ];

  const lotsFiltres = lotsActifs.filter(
    (l) =>
      l.lot.toLowerCase().includes(search.toLowerCase()) ||
      l.parcelles.toLowerCase().includes(search.toLowerCase()) ||
      l.destination.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <Topbar title="Traçabilité & Chaîne de Valeur" breadcrumb={["Commerce", "Traçabilité"]} />

      <div className="p-6 space-y-6">
        {/* KPI */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {kpis.map((k) => (
            <div key={k.label} className="rounded-2xl border border-gray-100 bg-white p-5 dark:bg-gray-900 dark:border-gray-800 flex flex-col gap-1">
              <div className="w-8 h-8 rounded-full flex items-center justify-center mb-1" style={{ backgroundColor: k.bg }}>
                <span style={{ color: k.color, fontSize: 14 }}>●</span>
              </div>
              <p className="text-lg font-bold text-gray-900 dark:text-white leading-tight">{k.value}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{k.label}</p>
            </div>
          ))}
        </div>

        {/* Onglets */}
        <div className="flex gap-1 p-1 rounded-xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 overflow-x-auto">
          {onglets.map((o) => (
            <button
              key={o.key}
              onClick={() => setOnglet(o.key)}
              className={`whitespace-nowrap flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                onglet === o.key
                  ? "bg-[#2E7D32] text-white"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
              }`}
            >
              {o.label}
            </button>
          ))}
        </div>

        {/* ── Lots actifs ── */}
        {onglet === "lots" && (
          <div className="rounded-2xl border border-gray-100 bg-white dark:bg-gray-900 dark:border-gray-800 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-700 flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-2 flex-1 min-w-52 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 bg-gray-50 dark:bg-gray-800">
                <Search size={15} className="text-gray-400 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Chercher par numéro lot, parcelle, client..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="flex-1 text-sm bg-transparent outline-none text-gray-700 dark:text-gray-300 placeholder-gray-400"
                />
              </div>
              <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <Filter size={14} /> Filtrer
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#F8FBF8] dark:bg-gray-800 text-left text-xs text-gray-500 dark:text-gray-400">
                    {["Lot", "Parcelles source", "Date récolte", "Poids brut", "Poids net", "Humidité", "Grade", "Statut", "Destination"].map((h) => (
                      <th key={h} className="px-4 py-3 font-medium whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {lotsFiltres.map((l) => (
                    <tr key={l.lot} className="border-t border-gray-50 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                      <td className="px-4 py-3 font-mono text-xs font-bold text-[#2E7D32] whitespace-nowrap">{l.lot}</td>
                      <td className="px-4 py-3 text-xs text-gray-600 dark:text-gray-400 whitespace-nowrap">{l.parcelles}</td>
                      <td className="px-4 py-3 text-xs text-gray-600 dark:text-gray-400 whitespace-nowrap">{l.dateRecolte}</td>
                      <td className="px-4 py-3 text-xs text-gray-700 dark:text-gray-300">{l.poidsBrut}</td>
                      <td className="px-4 py-3 text-xs text-gray-700 dark:text-gray-300">{l.poidsNet}</td>
                      <td className="px-4 py-3 text-xs text-gray-700 dark:text-gray-300">{l.humidite}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${l.grade === "AA" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"}`}>
                          {l.grade}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-700 dark:text-gray-300 whitespace-nowrap">{l.statut}</td>
                      <td className="px-4 py-3 text-xs text-gray-600 dark:text-gray-400 whitespace-nowrap">{l.destination}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── Traçabilité complète ── */}
        {onglet === "timeline" && (
          <div className="space-y-4">
            {/* Sélecteur de lot */}
            <div className="rounded-2xl border border-gray-100 bg-white dark:bg-gray-900 dark:border-gray-800 p-5">
              <div className="flex items-center gap-3 flex-wrap">
                <h2 className="font-bold text-gray-900 dark:text-white text-sm">Traçabilité lot</h2>
                <span className="font-mono text-sm font-bold text-white bg-[#2E7D32] px-3 py-1 rounded-lg">LOT-2025-045</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">Cacao fermenté séché Grade AA — Cargill Rotterdam</span>
              </div>
            </div>
            {/* Timeline */}
            <div className="rounded-2xl border border-gray-100 bg-white dark:bg-gray-900 dark:border-gray-800 p-5">
              <div className="space-y-0">
                {etapesLot045.map((etape, idx) => (
                  <TimelineStep key={etape.num} etape={etape} isLast={idx === etapesLot045.length - 1} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Blockchain ── */}
        {onglet === "blockchain" && (
          <div className="space-y-4">
            {/* Status */}
            <div className="rounded-2xl border border-gray-100 bg-white dark:bg-gray-900 dark:border-gray-800 p-5">
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <Link size={16} className="text-green-700 dark:text-green-400" />
                </div>
                <h2 className="font-bold text-gray-900 dark:text-white text-sm">Enregistrement immuable — Hyperledger Fabric</h2>
                <span className="ml-auto text-xs font-medium text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-3 py-1 rounded-full">✅ Intégration active</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="rounded-xl bg-gray-50 dark:bg-gray-800 p-4">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Nœud</p>
                  <p className="font-mono text-xs font-semibold text-gray-800 dark:text-gray-200">agrifrik.node.ci.hlf</p>
                </div>
                <div className="rounded-xl bg-gray-50 dark:bg-gray-800 p-4">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Lots enregistrés</p>
                  <p className="text-lg font-bold text-[#2E7D32]">32 / 48</p>
                </div>
                <div className="rounded-xl bg-gray-50 dark:bg-gray-800 p-4">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">En cours d&apos;enregistrement</p>
                  <p className="text-lg font-bold text-yellow-600">16</p>
                </div>
              </div>
            </div>
            {/* Table blockchain */}
            <div className="rounded-2xl border border-gray-100 bg-white dark:bg-gray-900 dark:border-gray-800 overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-700">
                <h3 className="font-semibold text-sm text-gray-900 dark:text-white">Derniers enregistrements blockchain</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#F8FBF8] dark:bg-gray-800 text-left text-xs text-gray-500 dark:text-gray-400">
                      {["Lot", "Hash TX", "Bloc", "Date/Heure", "Réseau", "Vérification"].map((h) => (
                        <th key={h} className="px-4 py-3 font-medium whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {blockchainRecords.map((r) => (
                      <tr key={r.lot} className="border-t border-gray-50 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                        <td className="px-4 py-3 font-mono text-xs font-bold text-[#2E7D32]">{r.lot}</td>
                        <td className="px-4 py-3 font-mono text-xs text-gray-600 dark:text-gray-400">{r.hash}</td>
                        <td className="px-4 py-3 font-mono text-xs text-gray-700 dark:text-gray-300">{r.bloc}</td>
                        <td className="px-4 py-3 text-xs text-gray-600 dark:text-gray-400">{r.datetime}</td>
                        <td className="px-4 py-3 text-xs text-gray-600 dark:text-gray-400">{r.reseau}</td>
                        <td className="px-4 py-3 text-xs font-medium text-green-700 dark:text-green-400">{r.verification}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            {/* Info bandeau */}
            <div className="rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 px-5 py-4 text-sm text-blue-700 dark:text-blue-300">
              <strong>Information :</strong> La blockchain garantit l&apos;immuabilité de chaque étape de la chaîne de valeur. Chaque enregistrement est signé cryptographiquement et horodaté.
            </div>
          </div>
        )}

        {/* ── Statistiques ── */}
        {onglet === "stats" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Lots par grade */}
            <div className="rounded-2xl border border-gray-100 bg-white dark:bg-gray-900 dark:border-gray-800 p-5">
              <h3 className="font-semibold text-sm text-gray-900 dark:text-white mb-4">Répartition par grade</h3>
              <DonutChart
                segments={[
                  { label: "Grade AA", value: 29, color: "#2E7D32" },
                  { label: "Grade A", value: 14, color: "#4CAF50" },
                  { label: "Grade B", value: 5, color: "#A5D6A7" },
                ]}
              />
            </div>
            {/* Volume par mois */}
            <div className="rounded-2xl border border-gray-100 bg-white dark:bg-gray-900 dark:border-gray-800 p-5">
              <h3 className="font-semibold text-sm text-gray-900 dark:text-white mb-4">Volume tracé par mois (tonnes)</h3>
              <BarChart
                data={[
                  { label: "Jan", value: 6, color: "#4CAF50" },
                  { label: "Fév", value: 9, color: "#4CAF50" },
                  { label: "Mar", value: 14, color: "#4CAF50" },
                  { label: "Avr", value: 18, color: "#4CAF50" },
                  { label: "Mai", value: 22, color: "#4CAF50" },
                  { label: "Juin", value: 25, color: "#2E7D32" },
                ]}
              />
            </div>
            {/* Destination export */}
            <div className="rounded-2xl border border-gray-100 bg-white dark:bg-gray-900 dark:border-gray-800 p-5">
              <h3 className="font-semibold text-sm text-gray-900 dark:text-white mb-4">Destinations export</h3>
              <DonutChart
                segments={[
                  { label: "Barry Callebaut", value: 14, color: "#1565C0" },
                  { label: "Cargill", value: 10, color: "#E65100" },
                  { label: "Nestlé", value: 5, color: "#6A1B9A" },
                  { label: "Olam CI", value: 3, color: "#00695C" },
                ]}
              />
            </div>
            {/* Taux qualité */}
            <div className="rounded-2xl border border-gray-100 bg-white dark:bg-gray-900 dark:border-gray-800 p-5">
              <h3 className="font-semibold text-sm text-gray-900 dark:text-white mb-4">Conformité qualité</h3>
              <div className="space-y-4">
                {[
                  { label: "Taux de traçabilité", value: 100, color: "#2E7D32" },
                  { label: "Grade AA ou A", value: 90, color: "#4CAF50" },
                  { label: "Humidité conforme (≤8%)", value: 96, color: "#1565C0" },
                  { label: "Lots blockchain enregistrés", value: 67, color: "#6A1B9A" },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-600 dark:text-gray-400">{item.label}</span>
                      <span className="font-semibold text-gray-800 dark:text-gray-200">{item.value}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-gray-100 dark:bg-gray-800">
                      <div className="h-2 rounded-full transition-all" style={{ width: `${item.value}%`, backgroundColor: item.color }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
