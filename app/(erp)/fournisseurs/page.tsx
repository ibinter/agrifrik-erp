"use client";

import { useState } from "react";
import Topbar from "../../components/Topbar";
import { Search, Plus, CheckCircle, AlertCircle } from "lucide-react";

/* ─── DONNÉES ──────────────────────────────────────────────── */

const FOURNISSEURS = [
  {
    code: "FOUR-001",
    nom: "KCl Distribution CI",
    categorie: "Engrais",
    ville: "Abidjan",
    contact: "koffi.dist@kcl-ci.com",
    achats2025: 1488000,
    delai: "3,0j",
    score: 96,
    ra: true,
    raNote: "confirmed",
  },
  {
    code: "FOUR-002",
    nom: "SCPA Afrique CI",
    categorie: "Intrants phyto",
    ville: "Abidjan (Yopougon)",
    contact: "aboubakar.kone@scpa-afrique.com",
    achats2025: 349752,
    delai: "4,3j",
    score: 94,
    ra: true,
    raNote: "confirmed",
  },
  {
    code: "FOUR-003",
    nom: "Petro Ivoire CI",
    categorie: "Carburant",
    ville: "Soubré",
    contact: "—",
    achats2025: 294000,
    delai: "1,0j",
    score: 98,
    ra: true,
    raNote: "non_soumis",
  },
  {
    code: "FOUR-004",
    nom: "Tractafric Equipment",
    categorie: "Matériels",
    ville: "Abidjan",
    contact: "—",
    achats2025: 129000,
    delai: "2,0j",
    score: 92,
    ra: true,
    raNote: "non_soumis",
  },
  {
    code: "FOUR-005",
    nom: "Netafim CI",
    categorie: "Irrigation",
    ville: "Abidjan",
    contact: "—",
    achats2025: 0,
    achatNote: "PROJ-2025-001 en cours",
    delai: "5j est.",
    score: 90,
    ra: true,
    raNote: "confirmed",
  },
  {
    code: "FOUR-006",
    nom: "Agri-Input CI",
    categorie: "Insecticides",
    ville: "Soubré",
    contact: "—",
    achats2025: 0,
    achatNote: "1ère cmd à venir",
    delai: "—",
    score: null,
    ra: true,
    raNote: "pending",
  },
];

const CATEGORIES = ["Tous", "Intrants", "Équipements", "Carburant", "Services"];

const DONUT_SLICES = [
  { label: "KCl Distribution CI",  valeur: 1488000, pct: 51.5, color: "#1B5E20" },
  { label: "SCPA Afrique CI",       valeur: 349752,  pct: 29.5, color: "#2E7D32" },
  { label: "Petro Ivoire CI",       valeur: 294000,  pct: 12.4, color: "#E65100" },
  { label: "Tractafric Equipment",  valeur: 129000,  pct: 6.6,  color: "#9E9E9E" },
];

const SCORE_BARS = [
  { label: "Petro Ivoire CI",      score: 98 },
  { label: "KCl Distribution CI",  score: 96 },
  { label: "SCPA Afrique CI",      score: 94 },
  { label: "Tractafric Equipment", score: 92 },
  { label: "Netafim CI",           score: 90 },
];

const CONFORMITE_RA = [
  {
    fournisseur: "SCPA Afrique CI",
    produits: "4 produits homologués RA",
    audit: "Fév 2025 (Bureau Veritas)",
    prochaine: "Fév 2026",
  },
  {
    fournisseur: "KCl Distribution CI",
    produits: "Engrais homologués RA",
    audit: "Fév 2025",
    prochaine: "Fév 2026",
  },
  {
    fournisseur: "Petro Ivoire CI",
    produits: "Carburant (non soumis RA)",
    audit: "—",
    prochaine: "—",
  },
  {
    fournisseur: "Tractafric Equipment",
    produits: "Équipements (non soumis RA)",
    audit: "—",
    prochaine: "—",
  },
];

/* ─── HELPERS ──────────────────────────────────────────────── */

function formatXOF(n: number) {
  return n.toLocaleString("fr-FR") + " XOF";
}

/* Donut SVG — répartition achats */
function DonutAchats() {
  const cx = 140;
  const cy = 140;
  const r = 100;
  const circ = 2 * Math.PI * r;
  const total = DONUT_SLICES.reduce((s, d) => s + d.pct, 0);
  let offset = 0;

  const rendered = DONUT_SLICES.map((d) => {
    const dash = (d.pct / 100) * circ;
    const startAngle = (offset / 100) * 360 - 90;
    const midAngle = startAngle + (d.pct / 100) * 180;
    const midRad = (midAngle * Math.PI) / 180;
    const lx = cx + (r + 24) * Math.cos(midRad);
    const ly = cy + (r + 24) * Math.sin(midRad);
    const slice = { ...d, dash, startOffset: (offset / 100) * circ, lx, ly };
    offset += d.pct;
    return slice;
  });

  void total;

  return (
    <svg viewBox="0 0 280 280" width={280} height={280} aria-label="Répartition des achats par fournisseur">
      {/* Fond cercle */}
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#F3F4F6" strokeWidth={36} />

      {rendered.map((s) => (
        <circle
          key={s.label}
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke={s.color}
          strokeWidth={36}
          strokeDasharray={`${s.dash} ${circ - s.dash}`}
          strokeDashoffset={circ * 0.25 - s.startOffset}
        />
      ))}

      {/* Centre */}
      <text x={cx} y={cy - 8} textAnchor="middle" fontSize="13" fontWeight="700" fill="#1B5E20">
        2 260 752
      </text>
      <text x={cx} y={cy + 8} textAnchor="middle" fontSize="10" fill="#6B7280">
        XOF achats
      </text>
      <text x={cx} y={cy + 22} textAnchor="middle" fontSize="9" fill="#6B7280">
        2025 YTD
      </text>

      {/* Légende */}
      {rendered.map((s, i) => (
        <g key={s.label} transform={`translate(12, ${200 + i * 18})`}>
          <rect width={10} height={10} rx={2} fill={s.color} />
          <text x={15} y={9} fontSize="9" fill="#374151">
            {s.label} — {s.pct}%
          </text>
        </g>
      ))}
    </svg>
  );
}

/* Horizontal bar chart — score fournisseurs */
function ScoreBars() {
  const BAR_MAX = 640;
  const BAR_AREA = 320;
  const ROW_H = 34;
  const LABEL_W = 160;
  const HEIGHT = SCORE_BARS.length * ROW_H + 40;

  return (
    <svg
      viewBox={`0 0 ${BAR_MAX} ${HEIGHT}`}
      className="w-full"
      aria-label="Score fournisseurs"
    >
      {/* Ligne seuil 80 */}
      {(() => {
        const x = LABEL_W + (80 / 100) * BAR_AREA;
        return (
          <>
            <line x1={x} y1={0} x2={x} y2={HEIGHT - 30} stroke="#EF4444" strokeWidth={1.5} strokeDasharray="4 3" />
            <text x={x + 4} y={HEIGHT - 18} fontSize="9" fill="#EF4444" fontWeight="600">
              Seuil min. 80/100
            </text>
          </>
        );
      })()}

      {SCORE_BARS.map((b, i) => {
        const y = 10 + i * ROW_H;
        const barW = (b.score / 100) * BAR_AREA;
        const color = b.score >= 90 ? "#2E7D32" : b.score >= 80 ? "#E65100" : "#EF4444";
        return (
          <g key={b.label}>
            <text x={LABEL_W - 6} y={y + 14} textAnchor="end" fontSize="11" fill="#374151">
              {b.label}
            </text>
            <rect x={LABEL_W} y={y} width={barW} height={22} rx={4} fill={color} opacity="0.88" />
            <text x={LABEL_W + barW + 6} y={y + 14} fontSize="11" fill={color} fontWeight="700">
              {b.score}/100
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/* ─── PAGE ─────────────────────────────────────────────────── */

export default function FournisseursPage() {
  const [filterCat, setFilterCat] = useState("Tous");
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);

  const filtered = FOURNISSEURS.filter((f) => {
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      f.nom.toLowerCase().includes(q) ||
      f.code.toLowerCase().includes(q) ||
      f.ville.toLowerCase().includes(q);

    const matchCat =
      filterCat === "Tous" ||
      (filterCat === "Intrants" &&
        ["Engrais", "Intrants phyto", "Insecticides"].includes(f.categorie)) ||
      (filterCat === "Équipements" &&
        ["Matériels", "Irrigation"].includes(f.categorie)) ||
      (filterCat === "Carburant" && f.categorie === "Carburant") ||
      (filterCat === "Services" && f.categorie === "Services");

    return matchSearch && matchCat;
  });

  return (
    <div>
      <Topbar title="Fournisseurs" breadcrumb={["Logistique", "Fournisseurs"]} />

      <div className="p-6 space-y-6">

        {/* ── EN-TÊTE ── */}
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Fournisseurs</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              Fournisseurs homologués — Intrants, équipements, services — EXP-001
            </p>
          </div>
          <button
            onClick={() => setShowForm((v) => !v)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#2E7D32] text-white rounded-xl text-xs font-medium hover:bg-[#1B5E20] transition-colors"
          >
            <Plus size={14} />
            Nouveau fournisseur
          </button>
        </div>

        {/* ── KPI ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Fournisseurs homologués", val: "6", color: "#2E7D32" },
            { label: "Conformité RA", val: "100%", color: "#1B5E20" },
            { label: "Achats 2025 YTD", val: "1 182 000 XOF", color: "#E65100" },
            { label: "Délai moyen livraison", val: "4,2 jours", color: "#2E7D32" },
          ].map((k) => (
            <div key={k.label} className="rounded-2xl border border-gray-100 bg-white p-5">
              <div className="text-xl font-bold" style={{ color: k.color }}>
                {k.val}
              </div>
              <div className="text-xs text-gray-500 mt-1">{k.label}</div>
            </div>
          ))}
        </div>

        {/* ── FILTRES ── */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4 flex flex-wrap gap-3 items-center">
          <div className="flex gap-1">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setFilterCat(c)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  filterCat === c
                    ? "bg-[#2E7D32] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="ml-auto flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-1.5 bg-gray-50">
            <Search size={13} className="text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher…"
              className="bg-transparent outline-none text-sm text-gray-700 w-40"
            />
          </div>
        </div>

        {/* ── TABLEAU FOURNISSEURS ── */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
            <span className="font-semibold text-gray-900 text-sm">
              Liste des fournisseurs EXP-001
            </span>
            <span className="text-xs text-gray-400">{filtered.length} fournisseur(s)</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#F8FBF8] text-xs text-gray-500 uppercase tracking-wide">
                  {[
                    "Code",
                    "Raison sociale",
                    "Catégorie",
                    "Ville",
                    "Contact",
                    "Achats 2025",
                    "Délai moy.",
                    "Score",
                    "Conformité RA",
                  ].map((h) => (
                    <th key={h} className="text-left px-4 py-3 font-medium whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((f) => (
                  <tr key={f.code} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-mono text-xs text-gray-500 whitespace-nowrap">
                      {f.code}
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">
                      {f.nom}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded-full text-xs bg-green-50 text-green-700">
                        {f.categorie}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{f.ville}</td>
                    <td className="px-4 py-3 text-gray-500 text-xs max-w-[180px] truncate">
                      {f.contact}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {f.achats2025 > 0 ? (
                        <span className="font-semibold text-[#2E7D32]">
                          {formatXOF(f.achats2025)}
                        </span>
                      ) : (
                        <span className="text-xs text-gray-400 italic">
                          {(f as { achatNote?: string }).achatNote ?? "—"}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{f.delai}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {f.score !== null ? (
                        <span
                          className={`inline-block px-2 py-0.5 rounded-full text-xs font-bold ${
                            f.score >= 90
                              ? "bg-green-100 text-green-700"
                              : f.score >= 80
                              ? "bg-orange-100 text-orange-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {f.score}/100
                        </span>
                      ) : (
                        <span className="text-xs text-gray-400">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {f.raNote === "confirmed" ? (
                        <span className="inline-flex items-center gap-1 text-xs text-green-700 font-medium">
                          <CheckCircle size={12} />
                          Conforme RA
                        </span>
                      ) : f.raNote === "non_soumis" ? (
                        <span className="text-xs text-gray-400">Non soumis RA</span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs text-amber-600 font-medium">
                          <AlertCircle size={12} />
                          A confirmer
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── GRAPHIQUES ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Donut */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5 flex flex-col items-center">
            <h2 className="font-semibold text-gray-900 text-sm self-start mb-1">
              Répartition des achats par fournisseur 2025
            </h2>
            <p className="text-xs text-gray-400 self-start mb-4">En XOF — YTD</p>
            <DonutAchats />
          </div>

          {/* Horizontal bars */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <h2 className="font-semibold text-gray-900 text-sm mb-1">
              Score fournisseurs
            </h2>
            <p className="text-xs text-gray-400 mb-4">
              Notation sur 100 — seuil minimum 80/100
            </p>
            <ScoreBars />
          </div>
        </div>

        {/* ── ÉVALUATIONS & CONFORMITÉ RA ── */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900 text-sm">
              Évaluations &amp; conformité RA
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#F8FBF8] text-xs text-gray-500 uppercase tracking-wide">
                  {["Fournisseur", "Produits RA", "Dernier audit", "Prochaine éval."].map((h) => (
                    <th key={h} className="text-left px-5 py-3 font-medium whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {CONFORMITE_RA.map((r) => (
                  <tr key={r.fournisseur} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3 font-medium text-gray-900 whitespace-nowrap">
                      {r.fournisseur}
                    </td>
                    <td className="px-5 py-3 text-gray-600">{r.produits}</td>
                    <td className="px-5 py-3 text-gray-500">{r.audit}</td>
                    <td className="px-5 py-3 text-gray-500">{r.prochaine}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Note conformité */}
          <div className="px-5 py-4 bg-green-50 border-t border-green-100">
            <div className="flex items-start gap-2">
              <CheckCircle size={14} className="text-green-600 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-green-800 leading-relaxed">
                Tous les fournisseurs de produits phytosanitaires et engrais utilisés sur EXP-001
                sont homologués RA 2020 (critère 4.1.3 — liste positive MINAGRI CI). Registre tenu
                à jour dans le module Intrants.
              </p>
            </div>
          </div>
        </div>

        {/* ── FORMULAIRE AJOUT ── */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <button
            onClick={() => setShowForm((v) => !v)}
            className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Plus size={16} className="text-[#2E7D32]" />
              <span className="font-semibold text-gray-900 text-sm">Ajouter un fournisseur</span>
            </div>
            <span className="text-xs text-gray-400">{showForm ? "Réduire" : "Développer"}</span>
          </button>

          {showForm && (
            <div className="px-5 pb-5 border-t border-gray-100">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {[
                  { label: "Raison sociale", placeholder: "Ex. : KCl Distribution CI", type: "text" },
                  { label: "Catégorie", placeholder: "Engrais, Intrants, Matériels…", type: "text" },
                  { label: "Ville", placeholder: "Ex. : Abidjan", type: "text" },
                  { label: "Contact (email)", placeholder: "contact@fournisseur.com", type: "email" },
                  { label: "RCCM", placeholder: "CI-ABJ-2020-B-12345", type: "text" },
                  { label: "NIF", placeholder: "000 000 00 A", type: "text" },
                ].map((field) => (
                  <div key={field.label}>
                    <label className="text-xs text-gray-500 font-medium mb-1 block">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-700 bg-gray-50 outline-none focus:border-[#2E7D32] transition-colors"
                    />
                  </div>
                ))}
                {/* Conformité RA */}
                <div>
                  <label className="text-xs text-gray-500 font-medium mb-1 block">
                    Conformité RA
                  </label>
                  <select className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-700 bg-gray-50 outline-none focus:border-[#2E7D32] transition-colors">
                    <option value="">Sélectionner…</option>
                    <option value="confirmed">Homologué RA — confirmé</option>
                    <option value="non_soumis">Non soumis RA</option>
                    <option value="pending">En cours de vérification</option>
                  </select>
                </div>
              </div>
              <div className="mt-5 flex gap-3">
                <button className="px-5 py-2 bg-[#2E7D32] text-white rounded-xl text-sm font-medium hover:bg-[#1B5E20] transition-colors">
                  Enregistrer le fournisseur
                </button>
                <button
                  onClick={() => setShowForm(false)}
                  className="px-5 py-2 bg-gray-100 text-gray-600 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors"
                >
                  Annuler
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
