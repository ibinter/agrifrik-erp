"use client";

import { useState } from "react";
import Topbar from "../../components/Topbar";
import { Search, Package, Truck, FlaskConical, Wrench, Tag, Building2 } from "lucide-react";

/* ─── DATA ─────────────────────────────────────────── */

type Categorie = "Intrants" | "Matériels" | "Services" | "Emballages" | "Transport" | "Labo";

const catColors: Record<Categorie, string> = {
  "Intrants":   "bg-green-100 text-green-700",
  "Matériels":  "bg-blue-100 text-blue-700",
  "Services":   "bg-purple-100 text-purple-700",
  "Emballages": "bg-amber-100 text-amber-700",
  "Transport":  "bg-cyan-100 text-cyan-700",
  "Labo":       "bg-rose-100 text-rose-700",
};

const catIcons: Record<Categorie, React.ElementType> = {
  "Intrants":   Package,
  "Matériels":  Wrench,
  "Services":   Building2,
  "Emballages": Tag,
  "Transport":  Truck,
  "Labo":       FlaskConical,
};

const fournisseurs: {
  nom: string; pays: string; categorie: Categorie; montantYTD: number; commandes: number;
  delaiMoyen: number | null; note: number; iso: boolean; statut: string;
}[] = [
  { nom: "AGRIINTRANT CI",     pays: "CI",      categorie: "Intrants",   montantYTD: 14200000, commandes: 8,  delaiMoyen: 3,  note: 4.8, iso: true,  statut: "Préféré" },
  { nom: "YARA Côte d'Ivoire", pays: "CI",      categorie: "Intrants",   montantYTD: 12800000, commandes: 6,  delaiMoyen: 5,  note: 4.7, iso: true,  statut: "Préféré" },
  { nom: "SYNGENTA Afrique",   pays: "CI",      categorie: "Intrants",   montantYTD: 9600000,  commandes: 5,  delaiMoyen: 14, note: 4.5, iso: true,  statut: "Approuvé" },
  { nom: "SATAKE CI",          pays: "CI / JP", categorie: "Matériels",  montantYTD: 11400000, commandes: 3,  delaiMoyen: 21, note: 4.9, iso: true,  statut: "Préféré" },
  { nom: "AGRO-ÉQUIP SARL",    pays: "CI",      categorie: "Matériels",  montantYTD: 7200000,  commandes: 4,  delaiMoyen: 12, note: 4.2, iso: false, statut: "Approuvé" },
  { nom: "BÜHLER AG",          pays: "CH",      categorie: "Matériels",  montantYTD: 4800000,  commandes: 1,  delaiMoyen: 45, note: 4.6, iso: true,  statut: "Approuvé" },
  { nom: "CMA CGM CI",         pays: "CI / FR", categorie: "Transport",  montantYTD: 5200000,  commandes: 9,  delaiMoyen: null, note: 4.3, iso: true,  statut: "Approuvé" },
  { nom: "SOTRA CARGO",        pays: "CI",      categorie: "Transport",  montantYTD: 2100000,  commandes: 12, delaiMoyen: null, note: 3.8, iso: false, statut: "Approuvé" },
  { nom: "PACKAFRIK",          pays: "CI",      categorie: "Emballages", montantYTD: 1800000,  commandes: 7,  delaiMoyen: 4,  note: 4.1, iso: false, statut: "Qualifié" },
  { nom: "SMURFIT KAPPA SN",   pays: "SN",      categorie: "Emballages", montantYTD: 1200000,  commandes: 3,  delaiMoyen: 8,  note: 4.0, iso: true,  statut: "Approuvé" },
  { nom: "LAB AGRO CI",        pays: "CI",      categorie: "Labo",       montantYTD: 980000,   commandes: 14, delaiMoyen: 2,  note: 4.6, iso: true,  statut: "Préféré" },
  { nom: "SGS CI",             pays: "CI / CH", categorie: "Labo",       montantYTD: 2100000,  commandes: 20, delaiMoyen: 1,  note: 4.9, iso: true,  statut: "Préféré" },
];

const statutBadge: Record<string, string> = {
  "Préféré":  "bg-green-100 text-green-700",
  "Approuvé": "bg-blue-100 text-blue-700",
  "Qualifié": "bg-gray-100 text-gray-600",
};

function Stars({ n }: { n: number }) {
  const full = Math.floor(n);
  const half = n % 1 >= 0.5;
  return (
    <span className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={`text-sm ${i < full ? "text-amber-400" : i === full && half ? "text-amber-300" : "text-gray-200"}`}>★</span>
      ))}
      <span className="text-xs text-gray-500 ml-1">{n}</span>
    </span>
  );
}

function fmtXOF(v: number) {
  if (v >= 1_000_000) return (v / 1_000_000).toFixed(1) + " M XOF";
  return (v / 1000).toFixed(0) + " k XOF";
}

/* Country SVG map simplified */
const paysCount = fournisseurs.reduce<Record<string, number>>((acc, f) => {
  const pays = f.pays.split("/")[0].trim();
  acc[pays] = (acc[pays] ?? 0) + 1;
  return acc;
}, {});

const PAYS_NODES: { code: string; label: string; x: number; y: number }[] = [
  { code: "CI",  label: "Côte d'Ivoire", x: 160, y: 200 },
  { code: "SN",  label: "Sénégal",       x: 100, y: 145 },
  { code: "FR",  label: "France",        x: 270, y: 85  },
  { code: "CH",  label: "Suisse",        x: 310, y: 78  },
  { code: "JP",  label: "Japon",         x: 520, y: 130 },
];

const topByCategorie = (cat: Categorie) =>
  fournisseurs
    .filter((f) => f.categorie === cat)
    .sort((a, b) => b.montantYTD - a.montantYTD)
    .slice(0, 3);

export default function FournisseursPage() {
  const [search, setSearch] = useState("");

  const filtered = fournisseurs.filter(
    (f) =>
      f.nom.toLowerCase().includes(search.toLowerCase()) ||
      f.categorie.toLowerCase().includes(search.toLowerCase()) ||
      f.pays.toLowerCase().includes(search.toLowerCase())
  );

  const totalYTD = fournisseurs.reduce((s, f) => s + f.montantYTD, 0);
  const avgNote = (fournisseurs.reduce((s, f) => s + f.note, 0) / fournisseurs.length).toFixed(1);
  const avgDelai = (
    fournisseurs.filter((f) => f.delaiMoyen !== null).reduce((s, f) => s + (f.delaiMoyen ?? 0), 0) /
    fournisseurs.filter((f) => f.delaiMoyen !== null).length
  ).toFixed(1);

  return (
    <div>
      <Topbar title="Fournisseurs & Partenaires" breadcrumb={["Logistique", "Fournisseurs"]} />

      <div className="p-6 space-y-6">

        {/* ── KPIs ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Fournisseurs actifs",       val: "12",               color: "#2E7D32" },
            { label: "Achats YTD",                val: fmtXOF(totalYTD),   color: "#1565C0" },
            { label: "Note moyenne",              val: `${avgNote}/5`,     color: "#F57F17" },
            { label: "Délai livraison moyen",     val: `${avgDelai} j`,    color: "#E65100" },
          ].map((k) => (
            <div key={k.label} className="rounded-2xl border border-gray-100 bg-white p-4">
              <div className="text-2xl font-bold" style={{ color: k.color }}>{k.val}</div>
              <div className="text-xs text-gray-500 mt-1">{k.label}</div>
            </div>
          ))}
        </div>

        {/* ── TABLEAU ── */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between gap-3 flex-wrap">
            <h2 className="font-semibold text-gray-900">Liste des fournisseurs</h2>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-1.5 text-sm bg-gray-50">
                <Search size={14} className="text-gray-400" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Rechercher…"
                  className="bg-transparent outline-none text-sm text-gray-700 w-40"
                />
              </div>
              <button className="px-4 py-1.5 bg-[#2E7D32] text-white rounded-xl text-xs font-medium">
                + Référencer
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#F8FBF8] text-xs text-gray-500 uppercase tracking-wide">
                  {["Nom","Pays","Catégorie","Montant YTD","Commandes","Délai moyen","Note","Certifié ISO","Statut","Actions"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 font-medium whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((f) => {
                  const CatIcon = catIcons[f.categorie];
                  return (
                    <tr key={f.nom} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">{f.nom}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="text-xs font-mono bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">{f.pays}</span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${catColors[f.categorie]}`}>
                          <CatIcon size={11} />
                          {f.categorie}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-semibold text-gray-800 whitespace-nowrap">{fmtXOF(f.montantYTD)}</td>
                      <td className="px-4 py-3 text-gray-600 text-center">{f.commandes}</td>
                      <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                        {f.delaiMoyen !== null ? `${f.delaiMoyen} j` : "—"}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap"><Stars n={f.note} /></td>
                      <td className="px-4 py-3 text-center">
                        {f.iso ? (
                          <span className="text-green-600 font-bold text-xs">✓ ISO</span>
                        ) : (
                          <span className="text-gray-400 text-xs">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statutBadge[f.statut] ?? ""}`}>{f.statut}</span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <button className="text-xs text-[#2E7D32] hover:underline font-medium">Voir</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── CARTOGRAPHIE ── */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <h2 className="font-semibold text-gray-900 mb-4">Cartographie fournisseurs</h2>
          <svg viewBox="0 0 640 280" className="w-full" aria-label="Cartographie fournisseurs">
            {/* Background world silhouette (simplified rectangle zones) */}
            <rect x="0" y="0" width="640" height="280" rx="12" fill="#F0F7F0" />
            {/* Africa blob */}
            <ellipse cx="200" cy="185" rx="95" ry="80" fill="#E8F5E9" stroke="#C8E6C9" strokeWidth="1.5" />
            {/* Europe blob */}
            <ellipse cx="295" cy="85" rx="65" ry="45" fill="#E3F2FD" stroke="#BBDEFB" strokeWidth="1.5" />
            {/* Asia blob */}
            <ellipse cx="490" cy="130" rx="120" ry="70" fill="#FFF8E1" stroke="#FFE082" strokeWidth="1.5" />

            {/* Labels */}
            <text x="200" y="243" textAnchor="middle" fontSize="10" fill="#6b7280" fontWeight="500">Afrique</text>
            <text x="295" y="56" textAnchor="middle" fontSize="10" fill="#6b7280" fontWeight="500">Europe</text>
            <text x="490" y="78" textAnchor="middle" fontSize="10" fill="#6b7280" fontWeight="500">Asie</text>

            {/* Country nodes */}
            {PAYS_NODES.map((p) => {
              const count = paysCount[p.code] ?? 0;
              const r = 14 + count * 4;
              return (
                <g key={p.code}>
                  <circle cx={p.x} cy={p.y} r={r} fill="#2E7D32" opacity="0.85" />
                  <text x={p.x} y={p.y + 4} textAnchor="middle" fontSize="11" fill="white" fontWeight="bold">{count}</text>
                  <text x={p.x} y={p.y + r + 12} textAnchor="middle" fontSize="9" fill="#374151">{p.label}</text>
                </g>
              );
            })}

            {/* Lines connecting to CI */}
            {PAYS_NODES.filter((p) => p.code !== "CI").map((p) => (
              <line
                key={`line-${p.code}`}
                x1={160} y1={200}
                x2={p.x} y2={p.y}
                stroke="#4CAF50" strokeWidth="1" strokeDasharray="4 3" opacity="0.5"
              />
            ))}

            {/* Legend */}
            <circle cx="32" cy="252" r="8" fill="#2E7D32" opacity="0.85" />
            <text x="46" y="256" fontSize="9" fill="#6b7280">Nb de fournisseurs par pays</text>
          </svg>
        </div>

        {/* ── TOP PAR CATÉGORIE ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {(["Intrants", "Matériels", "Labo"] as Categorie[]).map((cat) => {
            const CatIcon = catIcons[cat];
            const tops = topByCategorie(cat);
            return (
              <div key={cat} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <div className={`px-5 py-3 flex items-center gap-2 border-b border-gray-100`}>
                  <span className={`inline-flex p-1.5 rounded-lg ${catColors[cat]}`}>
                    <CatIcon size={13} />
                  </span>
                  <h3 className="font-semibold text-gray-900 text-sm">Top {cat}</h3>
                </div>
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-[#F8FBF8] text-gray-400 uppercase">
                      <th className="text-left px-4 py-2 font-medium">Fournisseur</th>
                      <th className="text-right px-4 py-2 font-medium">YTD</th>
                      <th className="text-center px-4 py-2 font-medium">Note</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {tops.map((f, i) => (
                      <tr key={f.nom} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-2.5 text-gray-800 font-medium">
                          <span className="text-gray-400 mr-1">{i + 1}.</span>{f.nom}
                        </td>
                        <td className="px-4 py-2.5 text-right text-[#2E7D32] font-semibold">{fmtXOF(f.montantYTD)}</td>
                        <td className="px-4 py-2.5 text-center text-amber-500 font-bold">{f.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
