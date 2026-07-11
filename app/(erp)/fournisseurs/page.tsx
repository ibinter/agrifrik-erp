"use client";

import { useState } from "react";
import Topbar from "../../components/Topbar";
import { Search, ChevronRight } from "lucide-react";

/* ─── TYPES & DATA ─────────────────────────────────────── */

const FOURNISSEURS = [
  { code: "FRN-001", nom: "SCPA Afrique",          categorie: "Phytosanitaires",  pays: "CI",    contact: "Yao Kouamé",   note: 4.8, delai: "4j",  dernierAchat: "05/07", statut: "Actif" },
  { code: "FRN-002", nom: "AgroChim CI",            categorie: "Engrais/NPK",      pays: "CI",    contact: "N. Diabaté",   note: 4.3, delai: "5j",  dernierAchat: "02/07", statut: "Actif" },
  { code: "FRN-003", nom: "KCl Distribution",       categorie: "Engrais/K",        pays: "CI",    contact: "M. Kané",      note: 4.1, delai: "6j",  dernierAchat: "28/06", statut: "Actif" },
  { code: "FRN-004", nom: "John Deere CI",           categorie: "Matériels",        pays: "CI/FR", contact: "L. Martin",    note: 4.7, delai: "8j",  dernierAchat: "15/06", statut: "Actif" },
  { code: "FRN-005", nom: "Tractafric Moto",         categorie: "Matériels/Pièces", pays: "CI",    contact: "S. Dembélé",   note: 4.0, delai: "10j", dernierAchat: "10/06", statut: "Actif" },
  { code: "FRN-006", nom: "Socopak",                 categorie: "Emballages",       pays: "CI",    contact: "A. Traoré",    note: 3.8, delai: "7j",  dernierAchat: "22/06", statut: "Actif" },
  { code: "FRN-007", nom: "Semences CNRA",           categorie: "Semences",         pays: "CI",    contact: "Dr. Kouassi",  note: 4.9, delai: "3j",  dernierAchat: "01/04", statut: "Actif" },
  { code: "FRN-008", nom: "Bioline AgriSciences",    categorie: "Biocontrôle",      pays: "FR",    contact: "P. Dubois",    note: 4.5, delai: "14j", dernierAchat: "15/03", statut: "Actif" },
  { code: "FRN-009", nom: "ITW Packaging",           categorie: "Sacs jute/PP",     pays: "MA",    contact: "H. Benali",    note: 3.6, delai: "21j", dernierAchat: "10/01", statut: "Surveillance" },
  { code: "FRN-010", nom: "Orange CI (M-Money)",     categorie: "Télécom/Mobile",   pays: "CI",    contact: "—",            note: 4.2, delai: "—",   dernierAchat: "01/07", statut: "Actif" },
  { code: "FRN-011", nom: "Axa Assurances CI",       categorie: "Assurances",       pays: "CI",    contact: "F. Konan",     note: 4.4, delai: "—",   dernierAchat: "01/01", statut: "Actif" },
  { code: "FRN-012", nom: "CNRA CI",                 categorie: "R&D/Conseil",      pays: "CI",    contact: "Dr. N'Goran",  note: 5.0, delai: "2j",  dernierAchat: "15/06", statut: "Actif" },
  { code: "FRN-013", nom: "Fuel Express",            categorie: "Carburant",        pays: "CI",    contact: "B. Coulibaly", note: 3.9, delai: "2j",  dernierAchat: "08/07", statut: "Actif" },
  { code: "FRN-014", nom: "Sodexam",                 categorie: "Météo (API)",       pays: "CI",    contact: "—",            note: 4.1, delai: "—",   dernierAchat: "01/01", statut: "Actif" },
];

const CATEGORIES = ["Tous", "Phytosanitaires", "Engrais/NPK", "Engrais/K", "Matériels", "Matériels/Pièces", "Emballages", "Semences", "Biocontrôle", "Sacs jute/PP", "Télécom/Mobile", "Assurances", "R&D/Conseil", "Carburant", "Météo (API)"];
const PAYS_OPTS = ["Tous", "CI", "CI/FR", "MA", "FR"];
const NOTE_OPTS = ["Tous", "5 étoiles", "≥ 4 étoiles", "< 4 étoiles"];
const STATUT_OPTS = ["Tous", "Actif", "Surveillance"];

const PERF_BARS = [
  { label: "Semences",         jours: 3  },
  { label: "R&D/Conseil",      jours: 2  },
  { label: "Phytosanitaires",  jours: 4  },
  { label: "Engrais",          jours: 5  },
  { label: "Emballages",       jours: 7  },
  { label: "Matériels",        jours: 9  },
  { label: "Import",           jours: 21 },
];

const TOP5 = [
  { nom: "John Deere CI",    volume: "4 200 000", cmds: 3, delai: "8j",  note: "4,7/5" },
  { nom: "SCPA Afrique",     volume: "2 840 000", cmds: 8, delai: "4j",  note: "4,8/5" },
  { nom: "AgroChim CI",      volume: "1 920 000", cmds: 12, delai: "5j", note: "4,3/5" },
  { nom: "KCl Distribution", volume: "1 480 000", cmds: 6, delai: "6j",  note: "4,1/5" },
  { nom: "Socopak",          volume: "820 000",   cmds: 4, delai: "7j",  note: "3,8/5" },
];

const EVALS = [
  { fournisseur: "SCPA Afrique",  date: "06/07", delai: 5, qualite: 5, prix: 4, service: 5, moy: "4,8", eval: "Ibrahim S." },
  { fournisseur: "John Deere CI", date: "16/06", delai: 4, qualite: 5, prix: 3, service: 5, moy: "4,3", eval: "Adjoua M." },
  { fournisseur: "AgroChim CI",   date: "03/07", delai: 4, qualite: 4, prix: 4, service: 4, moy: "4,0", eval: "Konan Y." },
  { fournisseur: "ITW Packaging", date: "12/01", delai: 3, qualite: 4, prix: 3, service: 3, moy: "3,3", eval: "Adjoua M." },
  { fournisseur: "Socopak",       date: "23/06", delai: 4, qualite: 3, prix: 4, service: 3, moy: "3,5", eval: "Ibrahim S." },
];

const CRITERES = ["Délai", "Qualité", "Prix", "Service", "Documentation"];

/* ─── HELPERS ───────────────────────────────────────────── */

function Stars({ n, size = "sm" }: { n: number; size?: "sm" | "xs" }) {
  const sz = size === "xs" ? "text-xs" : "text-sm";
  return (
    <span className="inline-flex items-center gap-px">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={`${sz} ${i < Math.floor(n) ? "text-amber-400" : i < n ? "text-amber-300" : "text-gray-200"}`}>★</span>
      ))}
      <span className="text-xs text-gray-500 ml-1">{n.toFixed(1)}</span>
    </span>
  );
}

function StarPicker({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <span className="inline-flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <button key={i} type="button" onClick={() => onChange(i + 1)}
          className={`text-lg leading-none ${i < value ? "text-amber-400" : "text-gray-200 hover:text-amber-300"}`}>★</button>
      ))}
    </span>
  );
}

/* Donut SVG for conformity */
function DonutConformite() {
  const r = 80;
  const cx = 130;
  const cy = 130;
  const circ = 2 * Math.PI * r;
  const slices = [
    { pct: 94.7, color: "#2E7D32", label: "Conforme" },
    { pct: 3.8,  color: "#E65100", label: "Retard ≤48h" },
    { pct: 1.5,  color: "#c62828", label: "Retard >48h" },
  ];
  let offset = 0;
  const rendered = slices.map((s) => {
    const dash = (s.pct / 100) * circ;
    const o = offset;
    offset += dash;
    return { ...s, dash, offset: o };
  });
  return (
    <svg viewBox="0 0 260 260" width={260} height={260}>
      {rendered.map((s) => (
        <circle key={s.label}
          cx={cx} cy={cy} r={r}
          fill="none" stroke={s.color} strokeWidth={32}
          strokeDasharray={`${s.dash} ${circ - s.dash}`}
          strokeDashoffset={-(s.offset) + circ * 0.25}
          style={{ transform: "rotate(-90deg)", transformOrigin: `${cx}px ${cy}px` }}
        />
      ))}
      <text x={cx} y={cy - 6} textAnchor="middle" fontSize="22" fontWeight="700" fill="#1B5E20">94,7%</text>
      <text x={cx} y={cy + 14} textAnchor="middle" fontSize="10" fill="#6b7280">Conforme</text>
      {/* Legend */}
      {rendered.map((s, i) => (
        <g key={s.label} transform={`translate(16, ${210 + i * 16})`}>
          <rect width={10} height={10} rx={2} fill={s.color} />
          <text x={15} y={9} fontSize="9" fill="#374151">{s.label} — {s.pct}%</text>
        </g>
      ))}
    </svg>
  );
}

/* ─── PAGE ─────────────────────────────────────────────── */

export default function FournisseursPage() {
  const [tab, setTab] = useState<"annuaire" | "performance" | "evaluations">("annuaire");
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("Tous");
  const [filterPays, setFilterPays] = useState("Tous");
  const [filterNote, setFilterNote] = useState("Tous");
  const [filterStatut, setFilterStatut] = useState("Tous");
  const [evalFrn, setEvalFrn] = useState("");
  const [evalScores, setEvalScores] = useState<number[]>([0, 0, 0, 0, 0]);

  const filtered = FOURNISSEURS.filter((f) => {
    if (search && !f.nom.toLowerCase().includes(search.toLowerCase()) && !f.code.toLowerCase().includes(search.toLowerCase())) return false;
    if (filterCat !== "Tous" && f.categorie !== filterCat) return false;
    if (filterPays !== "Tous" && f.pays !== filterPays) return false;
    if (filterNote === "5 étoiles" && f.note < 5) return false;
    if (filterNote === "≥ 4 étoiles" && f.note < 4) return false;
    if (filterNote === "< 4 étoiles" && f.note >= 4) return false;
    if (filterStatut !== "Tous" && f.statut !== filterStatut) return false;
    return true;
  });

  const maxJours = Math.max(...PERF_BARS.map((b) => b.jours));

  return (
    <div>
      <Topbar title="Fournisseurs" breadcrumb={["Logistique", "Fournisseurs"]} />

      <div className="p-6 space-y-6">

        {/* ── TABS ── */}
        <div className="flex gap-1 bg-gray-100 rounded-xl p-1 w-fit">
          {(["annuaire", "performance", "evaluations"] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${tab === t ? "bg-white text-[#2E7D32] shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>
              {t === "annuaire" ? "Tous les fournisseurs" : t === "performance" ? "Performance" : "Évaluations"}
            </button>
          ))}
        </div>

        {/* ══════════════════ ONGLET ANNUAIRE ══════════════════ */}
        {tab === "annuaire" && (
          <>
            {/* KPIs */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {[
                { label: "Fournisseurs actifs",    val: "18",      color: "#2E7D32" },
                { label: "Certifiés ISO",           val: "5",       color: "#1565C0" },
                { label: "Délai moyen livraison",   val: "6,2 j",   color: "#E65100" },
                { label: "Taux de conformité",      val: "94,7%",   color: "#2E7D32" },
                { label: "Litiges ouverts",         val: "1 ⚠ faible risque", color: "#F57F17" },
              ].map((k) => (
                <div key={k.label} className="rounded-2xl border border-gray-100 bg-white p-5">
                  <div className="text-2xl font-bold" style={{ color: k.color }}>{k.val}</div>
                  <div className="text-xs text-gray-500 mt-1">{k.label}</div>
                </div>
              ))}
            </div>

            {/* Filtres */}
            <div className="bg-white rounded-2xl border border-gray-100 p-4 flex flex-wrap gap-3 items-center">
              <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-1.5 bg-gray-50">
                <Search size={14} className="text-gray-400" />
                <input value={search} onChange={(e) => setSearch(e.target.value)}
                  placeholder="Rechercher fournisseur…"
                  className="bg-transparent outline-none text-sm text-gray-700 w-44" />
              </div>
              <select value={filterCat} onChange={(e) => setFilterCat(e.target.value)}
                className="border border-gray-200 rounded-xl px-3 py-1.5 text-sm bg-gray-50 text-gray-700 outline-none">
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
              <select value={filterPays} onChange={(e) => setFilterPays(e.target.value)}
                className="border border-gray-200 rounded-xl px-3 py-1.5 text-sm bg-gray-50 text-gray-700 outline-none">
                {PAYS_OPTS.map((p) => <option key={p}>{p}</option>)}
              </select>
              <select value={filterNote} onChange={(e) => setFilterNote(e.target.value)}
                className="border border-gray-200 rounded-xl px-3 py-1.5 text-sm bg-gray-50 text-gray-700 outline-none">
                {NOTE_OPTS.map((n) => <option key={n}>{n}</option>)}
              </select>
              <select value={filterStatut} onChange={(e) => setFilterStatut(e.target.value)}
                className="border border-gray-200 rounded-xl px-3 py-1.5 text-sm bg-gray-50 text-gray-700 outline-none">
                {STATUT_OPTS.map((s) => <option key={s}>{s}</option>)}
              </select>
              <button className="ml-auto px-4 py-1.5 bg-[#2E7D32] text-white rounded-xl text-xs font-medium">
                + Référencer
              </button>
            </div>

            {/* Tableau */}
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
                <span className="font-semibold text-gray-900">Annuaire des fournisseurs</span>
                <span className="text-xs text-gray-400">{filtered.length} résultat(s)</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#F8FBF8] text-xs text-gray-500 uppercase tracking-wide">
                      {["Code", "Nom", "Catégorie", "Pays", "Contact", "Note /5", "Délai moy.", "Dernier achat", "Statut", ""].map((h) => (
                        <th key={h} className="text-left px-4 py-3 font-medium whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {filtered.map((f) => (
                      <tr key={f.code} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 font-mono text-xs text-gray-500">{f.code}</td>
                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">{f.nom}</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className="px-2 py-0.5 rounded-full text-xs bg-green-50 text-green-700">{f.categorie}</span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-xs font-mono bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">{f.pays}</span>
                        </td>
                        <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{f.contact}</td>
                        <td className="px-4 py-3 whitespace-nowrap"><Stars n={f.note} size="xs" /></td>
                        <td className="px-4 py-3 text-gray-600">{f.delai}</td>
                        <td className="px-4 py-3 text-gray-600">{f.dernierAchat}</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          {f.statut === "Actif"
                            ? <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-green-100 text-green-700">✅ Actif</span>
                            : <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-amber-100 text-amber-700">🟡 Surveillance</span>
                          }
                        </td>
                        <td className="px-4 py-3">
                          <button className="inline-flex items-center gap-1 text-xs text-[#2E7D32] hover:underline font-medium">
                            Voir <ChevronRight size={12} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* ══════════════════ ONGLET PERFORMANCE ══════════════════ */}
        {tab === "performance" && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Bar chart délais */}
              <div className="bg-white rounded-2xl border border-gray-100 p-5">
                <h2 className="font-semibold text-gray-900 mb-1">Délai de livraison moyen par catégorie</h2>
                <p className="text-xs text-gray-400 mb-4">En jours ouvrés</p>
                <svg viewBox="0 0 600 260" className="w-full" aria-label="Délai livraison par catégorie">
                  {PERF_BARS.map((b, i) => {
                    const barW = Math.round((b.jours / maxJours) * 360);
                    const y = 20 + i * 33;
                    return (
                      <g key={b.label}>
                        <text x={145} y={y + 13} textAnchor="end" fontSize="11" fill="#374151">{b.label}</text>
                        <rect x={150} y={y} width={barW} height={22} rx={4} fill="#2E7D32" opacity="0.85" />
                        <text x={155 + barW} y={y + 14} fontSize="11" fill="#374151" fontWeight="600">{b.jours}j</text>
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* Donut conformité */}
              <div className="bg-white rounded-2xl border border-gray-100 p-5 flex flex-col items-center">
                <h2 className="font-semibold text-gray-900 mb-1 self-start">Taux de conformité livraisons 2025</h2>
                <p className="text-xs text-gray-400 mb-4 self-start">Par catégorie de retard</p>
                <DonutConformite />
              </div>
            </div>

            {/* Top 5 volumes */}
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100">
                <h2 className="font-semibold text-gray-900">Top 5 fournisseurs par volume d'achats 2025</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#F8FBF8] text-xs text-gray-500 uppercase tracking-wide">
                      {["Fournisseur", "Volume (XOF)", "Nb commandes", "Délai moyen", "Note"].map((h) => (
                        <th key={h} className="text-left px-5 py-3 font-medium whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {TOP5.map((t, i) => (
                      <tr key={t.nom} className="hover:bg-gray-50 transition-colors">
                        <td className="px-5 py-3 font-medium text-gray-900">
                          <span className="text-gray-400 mr-2">#{i + 1}</span>{t.nom}
                        </td>
                        <td className="px-5 py-3 font-semibold text-[#2E7D32]">{t.volume} XOF</td>
                        <td className="px-5 py-3 text-gray-600 text-center">{t.cmds}</td>
                        <td className="px-5 py-3 text-gray-600">{t.delai}</td>
                        <td className="px-5 py-3">
                          <span className="px-2 py-0.5 rounded-full text-xs bg-amber-50 text-amber-700 font-semibold">{t.note}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* ══════════════════ ONGLET ÉVALUATIONS ══════════════════ */}
        {tab === "evaluations" && (
          <>
            {/* Formulaire */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <h2 className="font-semibold text-gray-900 mb-4">Évaluation rapide fournisseur</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-xs text-gray-500 font-medium mb-1 block">Fournisseur</label>
                  <select value={evalFrn} onChange={(e) => setEvalFrn(e.target.value)}
                    className="border border-gray-200 rounded-xl px-3 py-2 text-sm bg-gray-50 text-gray-700 outline-none w-72">
                    <option value="">Sélectionner un fournisseur…</option>
                    {FOURNISSEURS.map((f) => <option key={f.code} value={f.code}>{f.nom}</option>)}
                  </select>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                  {CRITERES.map((c, i) => (
                    <div key={c}>
                      <label className="text-xs text-gray-500 font-medium mb-1 block">{c}</label>
                      <StarPicker value={evalScores[i]} onChange={(v) => {
                        const next = [...evalScores];
                        next[i] = v;
                        setEvalScores(next);
                      }} />
                    </div>
                  ))}
                </div>
                <button className="px-5 py-2 bg-[#2E7D32] text-white rounded-xl text-sm font-medium hover:bg-[#1B5E20] transition-colors">
                  Enregistrer l'évaluation
                </button>
              </div>
            </div>

            {/* Tableau évaluations */}
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100">
                <h2 className="font-semibold text-gray-900">5 dernières évaluations saisies</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#F8FBF8] text-xs text-gray-500 uppercase tracking-wide">
                      {["Fournisseur", "Date", "Délai", "Qualité", "Prix", "Service", "Moy.", "Évaluateur"].map((h) => (
                        <th key={h} className="text-left px-4 py-3 font-medium whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {EVALS.map((e) => (
                      <tr key={e.fournisseur + e.date} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">{e.fournisseur}</td>
                        <td className="px-4 py-3 text-gray-500">{e.date}</td>
                        <td className="px-4 py-3"><Stars n={e.delai} size="xs" /></td>
                        <td className="px-4 py-3"><Stars n={e.qualite} size="xs" /></td>
                        <td className="px-4 py-3"><Stars n={e.prix} size="xs" /></td>
                        <td className="px-4 py-3"><Stars n={e.service} size="xs" /></td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-0.5 rounded-full text-xs bg-green-50 text-green-700 font-bold">{e.moy}</span>
                        </td>
                        <td className="px-4 py-3 text-gray-600">{e.eval}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

      </div>
    </div>
  );
}
