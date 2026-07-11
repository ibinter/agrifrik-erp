"use client";

import { useState } from "react";
import Topbar from "../../components/Topbar";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Section {
  id: string;
  label: string;
  categorie: string;
  checked: boolean;
}

const SECTIONS_INIT: Section[] = [
  // Production
  { id: "cultures", label: "Cultures", categorie: "Production", checked: true },
  { id: "elevage", label: "Élevage", categorie: "Production", checked: true },
  { id: "pisciculture", label: "Pisciculture", categorie: "Production", checked: false },
  // Finance
  { id: "ca", label: "CA & Revenus", categorie: "Finance", checked: true },
  { id: "charges", label: "Charges", categorie: "Finance", checked: true },
  { id: "resultat", label: "Résultat net", categorie: "Finance", checked: true },
  { id: "tresorerie", label: "Trésorerie", categorie: "Finance", checked: true },
  // Commerce
  { id: "ventes", label: "Ventes", categorie: "Commerce", checked: true },
  { id: "qualite", label: "Qualité", categorie: "Commerce", checked: true },
  { id: "tracabilite", label: "Traçabilité", categorie: "Commerce", checked: false },
  // RH
  { id: "effectifs", label: "Effectifs", categorie: "RH", checked: false },
  { id: "masse", label: "Masse salariale", categorie: "RH", checked: false },
  // RSE
  { id: "odd", label: "ODD", categorie: "RSE", checked: true },
  { id: "carbone", label: "Empreinte carbone", categorie: "RSE", checked: true },
  { id: "certifications", label: "Certifications", categorie: "RSE", checked: false },
  // Logistique
  { id: "stocks", label: "Stocks", categorie: "Logistique", checked: false },
  { id: "achats", label: "Achats", categorie: "Logistique", checked: false },
];

const TEMPLATES = [
  { name: "Rapport mensuel standard", sections: 12, format: "PDF", freq: "Auto-généré" },
  { name: "Rapport bailleur FAO", sections: 8, format: "PDF", freq: "Mensuel" },
  { name: "Rapport qualité export", sections: 5, format: "Excel", freq: "Par lot" },
  { name: "Rapport RSE annuel", sections: 6, format: "PDF", freq: "Annuel" },
];

const PERIODES = ["Cette semaine", "Ce mois", "Ce trimestre", "2025", "2024", "Personnalisé"];
const FORMATS = ["PDF", "Excel", "CSV"] as const;
type FormatType = typeof FORMATS[number];

// ─── Checkbox ─────────────────────────────────────────────────────────────────

function Checkbox({ checked, onChange, label }: { checked: boolean; onChange: () => void; label: string }) {
  return (
    <label className="flex items-center gap-2 cursor-pointer group">
      <span
        onClick={onChange}
        className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 transition-colors ${
          checked ? "bg-[#2E7D32] border-[#2E7D32]" : "border-gray-300 group-hover:border-[#4CAF50]"
        }`}
      >
        {checked && (
          <svg viewBox="0 0 12 12" className="w-3 h-3">
            <polyline points="2,6 5,9 10,3" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          </svg>
        )}
      </span>
      <span className="text-xs text-gray-700 group-hover:text-gray-900">{label}</span>
    </label>
  );
}

// ─── Aperçu A4 ────────────────────────────────────────────────────────────────

function ApercuA4({
  nom,
  periode,
  format,
  sections,
}: {
  nom: string;
  periode: string;
  format: FormatType;
  sections: Section[];
}) {
  const selected = sections.filter((s) => s.checked);
  const estimPages = Math.max(2, Math.ceil(selected.length * 0.8) + 1);

  // Group selected by category
  const cats = Array.from(new Set(selected.map((s) => s.categorie)));

  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200" style={{ minHeight: "420px" }}>
      {/* Header A4 */}
      <div className="bg-[#1B5E20] px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
            <span className="text-[#1B5E20] text-xs font-bold">A</span>
          </div>
          <span className="text-white text-xs font-bold">AGRIFRIK</span>
        </div>
        <span className="text-green-200 text-xs">{format}</span>
      </div>

      {/* Body */}
      <div className="p-5 space-y-4">
        <div className="border-b border-gray-100 pb-3">
          <h4 className="text-sm font-bold text-gray-900 truncate">{nom || "Rapport sans titre"}</h4>
          <p className="text-xs text-gray-400 mt-0.5">Période : {periode}</p>
        </div>

        {/* Sommaire */}
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Sommaire généré</p>
          {cats.length === 0 ? (
            <p className="text-xs text-gray-400 italic">Aucune section sélectionnée</p>
          ) : (
            <ol className="space-y-1">
              {cats.map((cat, i) => {
                const catSections = selected.filter((s) => s.categorie === cat);
                return (
                  <li key={cat} className="text-xs text-gray-600">
                    <span className="font-semibold text-gray-800">{i + 1}. {cat}</span>
                    <span className="text-gray-400 ml-1">— {catSections.map((s) => s.label).join(", ")}</span>
                  </li>
                );
              })}
            </ol>
          )}
        </div>

        {/* Estimation */}
        <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between">
          <span className="text-xs text-gray-500">
            <strong className="text-[#2E7D32]">{selected.length}</strong> sections sélectionnées
          </span>
          <span className="text-xs text-gray-400">~{estimPages} pages estimées</span>
        </div>
      </div>

      {/* Footer A4 */}
      <div className="px-5 py-2 bg-gray-50 border-t border-gray-100">
        <p className="text-xs text-gray-400 text-center">AGRIFRIK — Rapport confidentiel</p>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function RapportBuilderPage() {
  const [nom, setNom] = useState("Rapport personnalisé 2024");
  const [periode, setPeriode] = useState("2024");
  const [format, setFormat] = useState<FormatType>("PDF");
  const [sections, setSections] = useState<Section[]>(SECTIONS_INIT);
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [showSaved, setShowSaved] = useState(false);

  const toggleSection = (id: string) => {
    setSections((prev) => prev.map((s) => s.id === id ? { ...s, checked: !s.checked } : s));
  };

  const handleGenerate = () => {
    setGenerating(true);
    setGenerated(false);
    setTimeout(() => {
      setGenerating(false);
      setGenerated(true);
    }, 2000);
  };

  const handleTemplate = (t: typeof TEMPLATES[0]) => {
    setNom(t.name);
    setFormat(t.format as FormatType);
  };

  // Group sections by category
  const categories = Array.from(new Set(sections.map((s) => s.categorie)));

  const selectedCount = sections.filter((s) => s.checked).length;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Topbar breadcrumb={["Rapports", "Rapport Builder"]} />

      <div className="flex-1 p-6 max-w-7xl mx-auto w-full">
        {/* En-tête */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Rapport Builder</h1>
            <p className="text-sm text-gray-500">Créez des rapports personnalisés en quelques clics</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowSaved(!showSaved)}
              className="flex items-center gap-1.5 border border-gray-200 bg-white hover:bg-gray-50 rounded-xl px-4 py-2 text-xs font-medium text-gray-700 transition-all"
            >
              📋 Mes rapports sauvegardés
            </button>
            <button
              onClick={() => { setNom("Nouveau rapport"); setSections(SECTIONS_INIT.map((s) => ({ ...s, checked: false }))); }}
              className="flex items-center gap-1.5 bg-[#2E7D32] hover:bg-[#1B5E20] text-white rounded-xl px-4 py-2 text-xs font-medium transition-all"
            >
              ➕ Nouveau rapport
            </button>
          </div>
        </div>

        {/* Zone 3 colonnes */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">

          {/* Zone 1 — Paramètres */}
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 space-y-4">
            <h2 className="text-sm font-bold text-gray-900">Paramètres</h2>

            <div>
              <label className="text-xs text-gray-600 block mb-1 font-medium">Nom du rapport</label>
              <input
                type="text"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#2E7D32] bg-white"
                placeholder="Ex: Rapport mensuel Janvier 2024"
              />
            </div>

            <div>
              <label className="text-xs text-gray-600 block mb-1 font-medium">Période</label>
              <select
                value={periode}
                onChange={(e) => setPeriode(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#2E7D32] bg-white"
              >
                {PERIODES.map((p) => <option key={p}>{p}</option>)}
              </select>
            </div>

            <div>
              <label className="text-xs text-gray-600 block mb-2 font-medium">Format de sortie</label>
              <div className="flex gap-2">
                {FORMATS.map((f) => (
                  <button
                    key={f}
                    onClick={() => setFormat(f)}
                    className={`flex-1 py-2 rounded-xl text-xs font-semibold border-2 transition-all ${
                      format === f
                        ? "border-[#2E7D32] bg-[#2E7D32] text-white"
                        : "border-gray-200 bg-white text-gray-600 hover:border-[#4CAF50]"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-gray-200">
              <div className="text-xs text-gray-500">
                <span className="font-semibold text-[#2E7D32]">{selectedCount}</span> section{selectedCount > 1 ? "s" : ""} sélectionnée{selectedCount > 1 ? "s" : ""}
              </div>
            </div>
          </div>

          {/* Zone 2 — Sélection modules */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5">
            <h2 className="text-sm font-bold text-gray-900 mb-4">Sélectionnez les sections à inclure</h2>
            <div className="space-y-4">
              {categories.map((cat) => (
                <div key={cat}>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">{cat}</p>
                  <div className="space-y-2 pl-1">
                    {sections.filter((s) => s.categorie === cat).map((s) => (
                      <Checkbox
                        key={s.id}
                        checked={s.checked}
                        onChange={() => toggleSection(s.id)}
                        label={s.label}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Zone 3 — Prévisualisation */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5 flex flex-col gap-4">
            <h2 className="text-sm font-bold text-gray-900">Aperçu du rapport</h2>

            <ApercuA4 nom={nom} periode={periode} format={format} sections={sections} />

            {/* Generate button */}
            <div className="mt-auto">
              {generating && (
                <div className="mb-3">
                  <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                    <div className="h-2 bg-[#2E7D32] rounded-full animate-pulse" style={{ width: "70%" }} />
                  </div>
                  <p className="text-xs text-gray-500 text-center mt-1">Génération en cours…</p>
                </div>
              )}
              {generated && (
                <div className="mb-3 bg-green-50 border border-green-200 rounded-xl px-4 py-2 text-center text-xs text-green-700 font-semibold">
                  ✅ Rapport généré ! Téléchargement en cours…
                </div>
              )}
              <button
                onClick={handleGenerate}
                disabled={generating || selectedCount === 0}
                className="w-full py-3 rounded-xl text-white text-sm font-semibold bg-[#2E7D32] hover:bg-[#1B5E20] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {generating ? "Génération…" : "🚀 Générer le rapport"}
              </button>
            </div>
          </div>
        </div>

        {/* Section rapports sauvegardés */}
        <div className={`transition-all ${showSaved ? "block" : "block"}`}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-gray-900">Rapports sauvegardés</h2>
            <span className="text-xs text-gray-400">{TEMPLATES.length} templates disponibles</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {TEMPLATES.map((t) => (
              <div key={t.name} className="bg-white border border-gray-100 rounded-2xl p-5 hover:border-[#4CAF50] transition-all group">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-9 h-9 rounded-xl bg-green-50 flex items-center justify-center text-lg flex-shrink-0">
                    {t.format === "PDF" ? "📄" : t.format === "Excel" ? "📊" : "📋"}
                  </div>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                    t.format === "PDF" ? "bg-red-50 text-red-600" : t.format === "Excel" ? "bg-green-50 text-green-700" : "bg-blue-50 text-blue-600"
                  }`}>
                    {t.format}
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-gray-900 leading-tight mb-1">{t.name}</h3>
                <p className="text-xs text-gray-400 mb-3">{t.sections} sections · {t.freq}</p>
                <button
                  onClick={() => handleTemplate(t)}
                  className="w-full py-1.5 rounded-xl border border-[#2E7D32] text-[#2E7D32] text-xs font-semibold hover:bg-[#2E7D32] hover:text-white transition-all"
                >
                  Utiliser ce template
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
