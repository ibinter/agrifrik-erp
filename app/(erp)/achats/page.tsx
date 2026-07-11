"use client";

import { useState } from "react";
import Topbar from "../../components/Topbar";
import { Search } from "lucide-react";

/* ─── DATA ─────────────────────────────────────────────── */

const COMMANDES = [
  { num: "ACH-2025-022", fournisseur: "SCPA Afrique",        cat: "Phytosanitaires", montant: 284000,   statut: "Livré",                     dateCmd: "28/06", eta: "03/07", approbateur: "Adjoua M." },
  { num: "ACH-2025-021", fournisseur: "AgroChim CI",          cat: "Engrais",         montant: 192000,   statut: "Livré",                     dateCmd: "25/06", eta: "30/06", approbateur: "Adjoua M." },
  { num: "ACH-2025-020", fournisseur: "KCl Distribution",     cat: "Engrais",         montant: 480000,   statut: "Livré",                     dateCmd: "20/06", eta: "26/06", approbateur: "CF" },
  { num: "ACH-2025-019", fournisseur: "Socopak",              cat: "Emballages",      montant: 124000,   statut: "En transit (ETA 14/07)",    dateCmd: "09/07", eta: "14/07", approbateur: "Adjoua M." },
  { num: "ACH-2025-018", fournisseur: "Fuel Express",         cat: "Carburant",       montant: 380000,   statut: "Livraison J0 (auj.)",       dateCmd: "10/07", eta: "11/07", approbateur: "Adjoua M." },
  { num: "ACH-2025-017", fournisseur: "John Deere CI",        cat: "Matériels",       montant: 1840000,  statut: "Attente approbation DG",    dateCmd: "09/07", eta: "18/07", approbateur: "DG" },
  { num: "ACH-2025-016", fournisseur: "SCPA Afrique",         cat: "Phytosanitaires", montant: 420000,   statut: "Attente approbation CF",    dateCmd: "10/07", eta: "17/07", approbateur: "CF" },
  { num: "ACH-2025-015", fournisseur: "AgroChim CI",          cat: "Engrais",         montant: 228000,   statut: "Livré",                     dateCmd: "15/06", eta: "20/06", approbateur: "Adjoua M." },
  { num: "ACH-2025-014", fournisseur: "Semences CNRA",        cat: "Semences",        montant: 148500,   statut: "Livré",                     dateCmd: "25/03", eta: "28/03", approbateur: "Adjoua M." },
  { num: "ACH-2025-013", fournisseur: "Bioline AgriSciences", cat: "Biocontrôle",     montant: 340000,   statut: "Livré",                     dateCmd: "01/03", eta: "15/03", approbateur: "CF" },
  { num: "ACH-2025-012", fournisseur: "ITW Packaging",        cat: "Emballages",      montant: 295000,   statut: "Livré",                     dateCmd: "20/12", eta: "10/01", approbateur: "Adjoua M." },
  { num: "ACH-2025-011", fournisseur: "Fuel Express",         cat: "Carburant",       montant: 390000,   statut: "Livré",                     dateCmd: "01/12", eta: "02/12", approbateur: "Adjoua M." },
  { num: "ACH-2025-010", fournisseur: "Tractafric Moto",      cat: "Matériels",       montant: 680000,   statut: "Livré",                     dateCmd: "15/05", eta: "25/05", approbateur: "CF" },
  { num: "ACH-2025-009", fournisseur: "KCl Distribution",     cat: "Engrais",         montant: 480000,   statut: "Livré",                     dateCmd: "10/04", eta: "17/04", approbateur: "CF" },
  { num: "ACH-2025-008", fournisseur: "John Deere CI",        cat: "Matériels",       montant: 2360000,  statut: "Livré",                     dateCmd: "01/03", eta: "10/03", approbateur: "DG" },
];

const KANBAN = {
  brouillon: [
    { num: "ACH-2025-023", fournisseur: "Bioline AgriSciences", montant: 680000, desc: "Biocontrôle mirides", auteur: "Konan Yao", note: "En attente validation Resp. Achat" },
  ],
  revueAchat: [
    { num: "ACH-2025-016", fournisseur: "SCPA Afrique", montant: 420000, desc: "Super Cupravit 20L×6", auteur: "Adjoua M.", note: "→ CF requis (>300k XOF)" },
  ],
  revueCF: [
    { num: "ACH-2025-017", fournisseur: "John Deere CI", montant: 1840000, desc: "Service + pièces tracteur DT55", auteur: "CF approuvé ✅", note: "En attente signature DG (>1M XOF)" },
  ],
  approuve: [
    { num: "ACH-2025-015", fournisseur: "AgroChim CI", montant: 228000, desc: "NPK 20-10-10 (15 sacs 50kg)", auteur: "", note: "" },
    { num: "ACH-2025-020", fournisseur: "KCl Distribution", montant: 480000, desc: "KCl 60% (6 sacs 50kg)", auteur: "", note: "" },
  ],
};

const DELEGATION = [
  { seuil: "< 100 000 XOF",            approbateur: "Chef de service",                    delai: "24h" },
  { seuil: "100 000 – 300 000 XOF",    approbateur: "Responsable Achats (Adjoua M.)",     delai: "24h" },
  { seuil: "300 001 – 1 000 000 XOF",  approbateur: "Directeur Financier (CF)",           delai: "48h" },
  { seuil: "> 1 000 000 XOF",          approbateur: "Directeur Général (Koffi Amani)",    delai: "72h" },
  { seuil: "> 5 000 000 XOF",          approbateur: "Conseil d'Administration",           delai: "7 jours" },
];

const MOIS_BAR = [
  { mois: "Jan", val: 820 },
  { mois: "Fév", val: 640 },
  { mois: "Mar", val: 1240 },
  { mois: "Avr", val: 1820 },
  { mois: "Mai", val: 1680 },
  { mois: "Jun", val: 2140 },
  { mois: "Jul", val: 1480 },
];

const CATEGORIES_DONUT = [
  { label: "Matériels",   val: 4.2,  pct: 32.7, color: "#1565C0" },
  { label: "Phyto",       val: 3.1,  pct: 24.1, color: "#2E7D32" },
  { label: "Engrais",     val: 2.8,  pct: 21.8, color: "#4CAF50" },
  { label: "Emballages",  val: 1.2,  pct: 9.3,  color: "#F57F17" },
  { label: "Carburant",   val: 0.9,  pct: 7.0,  color: "#E65100" },
  { label: "Autres",      val: 0.65, pct: 5.1,  color: "#9E9E9E" },
];

const ECONOMIES = [
  { achat: "KCl 60% (6 sacs)",        devis: 520000,   prix: 480000,   econ: 40000,  pct: "-7,7%" },
  { achat: "NPK 20-10-10 (15 sacs)",  devis: 252000,   prix: 228000,   econ: 24000,  pct: "-9,5%" },
  { achat: "Socopak sacs 65kg",        devis: 136000,   prix: 124000,   econ: 12000,  pct: "-8,8%" },
  { achat: "John Deere service",       devis: 2000000,  prix: 1840000,  econ: 160000, pct: "-8,0%" },
];

const CATALOGUE = [
  { code: "ART-001", nom: "NPK 20-10-10 50kg",        fournisseur: "AgroChim CI",         prix: "15 200",  unite: "Sac 50kg",    delai: "5j" },
  { code: "ART-002", nom: "KCl 60% 50kg",              fournisseur: "KCl Distribution",    prix: "80 000",  unite: "Sac 50kg",    delai: "6j" },
  { code: "ART-003", nom: "Super Cupravit 1kg",         fournisseur: "SCPA Afrique",        prix: "8 400",   unite: "Kg",          delai: "4j" },
  { code: "ART-004", nom: "Ridomil Gold 100g",          fournisseur: "SCPA Afrique",        prix: "12 800",  unite: "Sachet",      delai: "4j" },
  { code: "ART-005", nom: "Gasoil (500L)",              fournisseur: "Fuel Express",        prix: "390 000", unite: "500L",        delai: "2j" },
  { code: "ART-006", nom: "Sac jute 65kg",              fournisseur: "ITW Packaging",       prix: "820",     unite: "Unité",       delai: "21j" },
  { code: "ART-007", nom: "Sac PP 70kg",                fournisseur: "Socopak",             prix: "680",     unite: "Unité",       delai: "7j" },
  { code: "ART-008", nom: "Ficelle sisal 500m",         fournisseur: "Socopak",             prix: "4 200",   unite: "Bobine",      delai: "7j" },
  { code: "ART-009", nom: "Cacao hybride T-60",         fournisseur: "Semences CNRA",       prix: "18 500",  unite: "Kg",          delai: "3j" },
  { code: "ART-010", nom: "Gliricidia cuttings",        fournisseur: "Semences CNRA",       prix: "4 500",   unite: "Paquet 100",  delai: "3j" },
  { code: "ART-011", nom: "Lubrifiant John Deere 5L",   fournisseur: "Tractafric Moto",     prix: "24 800",  unite: "Bidon",       delai: "10j" },
  { code: "ART-012", nom: "Batterie 12V 74Ah",          fournisseur: "Tractafric Moto",     prix: "68 500",  unite: "Unité",       delai: "10j" },
];

/* ─── HELPERS ───────────────────────────────────────────── */

function fmtXOF(v: number) {
  return v.toLocaleString("fr-FR") + " XOF";
}

function StatutBadge({ s }: { s: string }) {
  if (s === "Livré") return <span className="px-2 py-0.5 rounded-full text-xs bg-green-100 text-green-700 font-medium">✅ Livré</span>;
  if (s.startsWith("En transit")) return <span className="px-2 py-0.5 rounded-full text-xs bg-blue-100 text-blue-700 font-medium">🔵 {s}</span>;
  if (s.startsWith("Livraison J0")) return <span className="px-2 py-0.5 rounded-full text-xs bg-blue-100 text-blue-700 font-medium">🔵 {s}</span>;
  return <span className="px-2 py-0.5 rounded-full text-xs bg-amber-100 text-amber-700 font-medium">🟡 {s}</span>;
}

/* Donut dépenses */
function DonutDepenses() {
  const r = 80;
  const cx = 130;
  const cy = 130;
  const circ = 2 * Math.PI * r;
  let offset = 0;
  const slices = CATEGORIES_DONUT.map((c) => {
    const dash = (c.pct / 100) * circ;
    const o = offset;
    offset += dash;
    return { ...c, dash, offset: o };
  });
  return (
    <svg viewBox="0 0 260 260" width={260} height={260}>
      {slices.map((s) => (
        <circle key={s.label}
          cx={cx} cy={cy} r={r}
          fill="none" stroke={s.color} strokeWidth={32}
          strokeDasharray={`${s.dash} ${circ - s.dash}`}
          strokeDashoffset={-(s.offset) + circ * 0.25}
          style={{ transform: "rotate(-90deg)", transformOrigin: `${cx}px ${cy}px` }}
        />
      ))}
      <text x={cx} y={cy - 6} textAnchor="middle" fontSize="18" fontWeight="700" fill="#1B5E20">12,8 M</text>
      <text x={cx} y={cy + 12} textAnchor="middle" fontSize="10" fill="#6b7280">XOF YTD</text>
      {slices.map((s, i) => (
        <g key={s.label} transform={`translate(16, ${198 + i * 11})`}>
          <rect width={8} height={8} rx={2} fill={s.color} />
          <text x={12} y={8} fontSize="8" fill="#374151">{s.label} {s.pct}%</text>
        </g>
      ))}
    </svg>
  );
}

/* Bar chart mensuel */
function BarMensuel() {
  const maxVal = Math.max(...MOIS_BAR.map((m) => m.val));
  const W = 640;
  const H = 200;
  const padL = 40;
  const padR = 20;
  const padT = 16;
  const padB = 28;
  const barW = (W - padL - padR) / MOIS_BAR.length;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" aria-label="Dépenses mensuelles 2025">
      {/* Grid lines */}
      {[0, 500, 1000, 1500, 2000].map((v) => {
        const y = padT + (H - padT - padB) * (1 - v / maxVal);
        return (
          <g key={v}>
            <line x1={padL} x2={W - padR} y1={y} y2={y} stroke="#f0f0f0" strokeWidth={1} />
            <text x={padL - 4} y={y + 4} textAnchor="end" fontSize="9" fill="#9ca3af">{v}k</text>
          </g>
        );
      })}
      {MOIS_BAR.map((m, i) => {
        const bh = ((H - padT - padB) * m.val) / maxVal;
        const x = padL + i * barW + barW * 0.15;
        const w = barW * 0.7;
        const y = H - padB - bh;
        const isLast = i === MOIS_BAR.length - 1;
        return (
          <g key={m.mois}>
            <rect x={x} y={y} width={w} height={bh} rx={3}
              fill={isLast ? "#4CAF50" : "#2E7D32"} opacity={isLast ? 0.7 : 0.9} />
            <text x={x + w / 2} y={H - padB + 14} textAnchor="middle" fontSize="10" fill="#6b7280">{m.mois}</text>
            <text x={x + w / 2} y={y - 4} textAnchor="middle" fontSize="9" fill="#374151" fontWeight="600">{m.val}k</text>
          </g>
        );
      })}
    </svg>
  );
}

/* ─── PAGE ─────────────────────────────────────────────── */

export default function AchatsPage() {
  const [tab, setTab] = useState<"commandes" | "workflow" | "analyse" | "catalogue">("commandes");
  const [searchCat, setSearchCat] = useState("");

  const filteredCatalogue = CATALOGUE.filter((a) =>
    a.nom.toLowerCase().includes(searchCat.toLowerCase()) ||
    a.fournisseur.toLowerCase().includes(searchCat.toLowerCase()) ||
    a.code.toLowerCase().includes(searchCat.toLowerCase())
  );

  return (
    <div>
      <Topbar title="Achats" breadcrumb={["Logistique", "Achats"]} />

      <div className="p-6 space-y-6">

        {/* ── TABS ── */}
        <div className="flex gap-1 bg-gray-100 rounded-xl p-1 w-fit flex-wrap">
          {(["commandes", "workflow", "analyse", "catalogue"] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${tab === t ? "bg-white text-[#2E7D32] shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>
              {t === "commandes" ? "Commandes" : t === "workflow" ? "Workflow approbation" : t === "analyse" ? "Analyse dépenses" : "Catalogue"}
            </button>
          ))}
        </div>

        {/* ══════════════════ ONGLET COMMANDES ══════════════════ */}
        {tab === "commandes" && (
          <>
            {/* KPIs */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {[
                { label: "Commandes en cours",       val: "4",              color: "#2E7D32" },
                { label: "En attente d'approbation", val: "2",              color: "#E65100" },
                { label: "Dépenses YTD",             val: "12 847 000 XOF", color: "#1565C0" },
                { label: "Économies vs budget",      val: "843 000 XOF",    color: "#2E7D32" },
                { label: "Délai moyen traitement",   val: "3,4 jours",      color: "#6A1B9A" },
              ].map((k) => (
                <div key={k.label} className="rounded-2xl border border-gray-100 bg-white p-5">
                  <div className="text-xl font-bold" style={{ color: k.color }}>{k.val}</div>
                  <div className="text-xs text-gray-500 mt-1">{k.label}</div>
                </div>
              ))}
            </div>

            {/* Tableau commandes */}
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                <h2 className="font-semibold text-gray-900">Commandes 2025 — 15 dernières</h2>
                <button className="px-4 py-1.5 bg-[#2E7D32] text-white rounded-xl text-xs font-medium">
                  + Nouvelle commande
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#F8FBF8] text-xs text-gray-500 uppercase tracking-wide">
                      {["N°", "Fournisseur", "Catégorie", "Montant (XOF)", "Statut", "Date cmd", "Livraison ETA", "Approbateur", "Action"].map((h) => (
                        <th key={h} className="text-left px-4 py-3 font-medium whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {COMMANDES.map((c) => (
                      <tr key={c.num} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 font-mono text-xs text-gray-500">{c.num}</td>
                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">{c.fournisseur}</td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-0.5 rounded-full text-xs bg-gray-100 text-gray-600">{c.cat}</span>
                        </td>
                        <td className="px-4 py-3 font-semibold text-gray-800 whitespace-nowrap">{fmtXOF(c.montant)}</td>
                        <td className="px-4 py-3 whitespace-nowrap"><StatutBadge s={c.statut} /></td>
                        <td className="px-4 py-3 text-gray-500">{c.dateCmd}</td>
                        <td className="px-4 py-3 text-gray-500">{c.eta}</td>
                        <td className="px-4 py-3 text-gray-600 text-xs">{c.approbateur}</td>
                        <td className="px-4 py-3">
                          <button className="text-xs text-[#2E7D32] hover:underline font-medium">Voir →</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* ══════════════════ ONGLET WORKFLOW ══════════════════ */}
        {tab === "workflow" && (
          <>
            {/* Kanban */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Brouillon */}
              <div className="bg-gray-50 rounded-2xl p-4 space-y-3">
                <h3 className="font-semibold text-gray-700 text-sm flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-gray-400 inline-block" />
                  Brouillon
                  <span className="ml-auto text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">{KANBAN.brouillon.length}</span>
                </h3>
                {KANBAN.brouillon.map((k) => (
                  <div key={k.num} className="bg-white rounded-xl border border-gray-200 p-3 space-y-1.5">
                    <div className="font-mono text-xs text-gray-400">{k.num}</div>
                    <div className="font-medium text-gray-900 text-sm">{k.fournisseur}</div>
                    <div className="text-xs text-gray-500">{k.desc}</div>
                    <div className="font-bold text-[#2E7D32] text-sm">{fmtXOF(k.montant)}</div>
                    <div className="text-xs text-gray-400">Créé par {k.auteur}</div>
                    <div className="text-xs text-amber-600 bg-amber-50 rounded px-1.5 py-0.5">{k.note}</div>
                  </div>
                ))}
              </div>

              {/* En revue Resp. Achat */}
              <div className="bg-blue-50 rounded-2xl p-4 space-y-3">
                <h3 className="font-semibold text-blue-700 text-sm flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-400 inline-block" />
                  En revue Resp. Achat
                  <span className="ml-auto text-xs bg-blue-200 text-blue-700 px-2 py-0.5 rounded-full">{KANBAN.revueAchat.length}</span>
                </h3>
                {KANBAN.revueAchat.map((k) => (
                  <div key={k.num} className="bg-white rounded-xl border border-blue-100 p-3 space-y-1.5">
                    <div className="font-mono text-xs text-gray-400">{k.num}</div>
                    <div className="font-medium text-gray-900 text-sm">{k.fournisseur}</div>
                    <div className="text-xs text-gray-500">{k.desc}</div>
                    <div className="font-bold text-[#2E7D32] text-sm">{fmtXOF(k.montant)}</div>
                    <div className="text-xs text-gray-400">{k.auteur}</div>
                    <div className="text-xs text-blue-600 bg-blue-50 rounded px-1.5 py-0.5">{k.note}</div>
                  </div>
                ))}
              </div>

              {/* En revue CF/DG */}
              <div className="bg-orange-50 rounded-2xl p-4 space-y-3">
                <h3 className="font-semibold text-orange-700 text-sm flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-orange-400 inline-block" />
                  En revue CF/DG
                  <span className="ml-auto text-xs bg-orange-200 text-orange-700 px-2 py-0.5 rounded-full">{KANBAN.revueCF.length}</span>
                </h3>
                {KANBAN.revueCF.map((k) => (
                  <div key={k.num} className="bg-white rounded-xl border border-orange-100 p-3 space-y-1.5">
                    <div className="font-mono text-xs text-gray-400">{k.num}</div>
                    <div className="font-medium text-gray-900 text-sm">{k.fournisseur}</div>
                    <div className="text-xs text-gray-500">{k.desc}</div>
                    <div className="font-bold text-[#2E7D32] text-sm">{fmtXOF(k.montant)}</div>
                    <div className="text-xs text-green-600">{k.auteur}</div>
                    <div className="text-xs text-orange-600 bg-orange-50 rounded px-1.5 py-0.5">{k.note}</div>
                  </div>
                ))}
              </div>

              {/* Approuvé */}
              <div className="bg-green-50 rounded-2xl p-4 space-y-3">
                <h3 className="font-semibold text-green-700 text-sm flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
                  Approuvé
                  <span className="ml-auto text-xs bg-green-200 text-green-700 px-2 py-0.5 rounded-full">{KANBAN.approuve.length}</span>
                </h3>
                {KANBAN.approuve.map((k) => (
                  <div key={k.num} className="bg-white rounded-xl border border-green-100 p-3 space-y-1.5">
                    <div className="font-mono text-xs text-gray-400">{k.num}</div>
                    <div className="font-medium text-gray-900 text-sm">{k.fournisseur}</div>
                    <div className="text-xs text-gray-500">{k.desc}</div>
                    <div className="font-bold text-[#2E7D32] text-sm">{fmtXOF(k.montant)}</div>
                    <span className="text-xs text-green-600 font-medium">✅ Approuvé</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Matrice délégation */}
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100">
                <h2 className="font-semibold text-gray-900">Matrice de délégation financière</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#F8FBF8] text-xs text-gray-500 uppercase tracking-wide">
                      {["Seuil", "Approbateur", "Délai max"].map((h) => (
                        <th key={h} className="text-left px-5 py-3 font-medium">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {DELEGATION.map((d) => (
                      <tr key={d.seuil} className="hover:bg-gray-50 transition-colors">
                        <td className="px-5 py-3 font-mono text-xs text-gray-700 font-semibold">{d.seuil}</td>
                        <td className="px-5 py-3 text-gray-800">{d.approbateur}</td>
                        <td className="px-5 py-3">
                          <span className="px-2 py-0.5 rounded-full text-xs bg-blue-50 text-blue-700 font-medium">{d.delai}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* ══════════════════ ONGLET ANALYSE ══════════════════ */}
        {tab === "analyse" && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Donut */}
              <div className="bg-white rounded-2xl border border-gray-100 p-5 flex flex-col items-center">
                <h2 className="font-semibold text-gray-900 mb-1 self-start">Dépenses par catégorie 2025</h2>
                <p className="text-xs text-gray-400 mb-2 self-start">En millions XOF</p>
                <DonutDepenses />
              </div>

              {/* Bar mensuel */}
              <div className="bg-white rounded-2xl border border-gray-100 p-5">
                <h2 className="font-semibold text-gray-900 mb-1">Dépenses mensuelles 2025</h2>
                <p className="text-xs text-gray-400 mb-4">En milliers XOF — Juillet en cours</p>
                <BarMensuel />
              </div>
            </div>

            {/* Tableau économies */}
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100">
                <h2 className="font-semibold text-gray-900">Économies réalisées vs devis initiaux 2025</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#F8FBF8] text-xs text-gray-500 uppercase tracking-wide">
                      {["Achat", "Devis initial", "Prix négocié", "Économie", "%"].map((h) => (
                        <th key={h} className="text-left px-5 py-3 font-medium whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {ECONOMIES.map((e) => (
                      <tr key={e.achat} className="hover:bg-gray-50 transition-colors">
                        <td className="px-5 py-3 text-gray-800">{e.achat}</td>
                        <td className="px-5 py-3 text-gray-600">{fmtXOF(e.devis)}</td>
                        <td className="px-5 py-3 font-semibold text-gray-900">{fmtXOF(e.prix)}</td>
                        <td className="px-5 py-3 text-[#2E7D32] font-semibold">{fmtXOF(e.econ)}</td>
                        <td className="px-5 py-3">
                          <span className="px-2 py-0.5 rounded-full text-xs bg-green-100 text-green-700 font-bold">{e.pct}</span>
                        </td>
                      </tr>
                    ))}
                    {/* Total */}
                    <tr className="bg-[#F8FBF8] font-bold">
                      <td className="px-5 py-3 text-gray-900">Total 2025</td>
                      <td className="px-5 py-3 text-gray-700">13 690 000 XOF</td>
                      <td className="px-5 py-3 text-gray-900">12 847 000 XOF</td>
                      <td className="px-5 py-3 text-[#2E7D32]">843 000 XOF</td>
                      <td className="px-5 py-3">
                        <span className="px-2 py-0.5 rounded-full text-xs bg-green-100 text-green-700 font-bold">-6,2%</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* ══════════════════ ONGLET CATALOGUE ══════════════════ */}
        {tab === "catalogue" && (
          <>
            {/* Barre recherche + filtre */}
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-1.5 bg-white">
                <Search size={14} className="text-gray-400" />
                <input value={searchCat} onChange={(e) => setSearchCat(e.target.value)}
                  placeholder="Rechercher un article…"
                  className="bg-transparent outline-none text-sm text-gray-700 w-52" />
              </div>
              <select className="border border-gray-200 rounded-xl px-3 py-1.5 text-sm bg-white text-gray-700 outline-none">
                <option>Toutes catégories</option>
                <option>Engrais</option>
                <option>Phytosanitaires</option>
                <option>Carburant</option>
                <option>Emballages</option>
                <option>Semences</option>
                <option>Matériels</option>
              </select>
            </div>

            {/* Grille articles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCatalogue.map((a) => (
                <div key={a.code} className="rounded-2xl border border-gray-100 bg-white p-5 flex flex-col gap-3">
                  <div className="flex items-start justify-between">
                    <span className="font-mono text-xs text-gray-400">{a.code}</span>
                    <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{a.delai}</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{a.nom}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{a.fournisseur}</div>
                  </div>
                  <div className="flex items-end justify-between mt-auto">
                    <div>
                      <span className="text-lg font-bold text-[#2E7D32]">{a.prix} XOF</span>
                      <span className="text-xs text-gray-400 ml-1">/ {a.unite}</span>
                    </div>
                    <button className="px-3 py-1.5 bg-[#2E7D32] text-white rounded-xl text-xs font-medium hover:bg-[#1B5E20] transition-colors">
                      Commander
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

      </div>
    </div>
  );
}
