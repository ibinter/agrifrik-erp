"use client";

import { useState } from "react";
import Topbar from "../../components/Topbar";

// ─── Mini SVG preview ─────────────────────────────────────────────────────────

function MiniPreviewChart() {
  const data = [42, 68, 55, 80, 72, 90, 65];
  const W = 160, H = 60, maxV = 100;
  const barW = 16, gap = 6;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      {data.map((v, i) => {
        const x = 8 + i * (barW + gap);
        const h = (v / maxV) * (H - 8);
        return <rect key={i} x={x} y={H - h} width={barW} height={h} rx="2" fill={i === data.length - 1 ? "#2E7D32" : "#A5D6A7"} />;
      })}
    </svg>
  );
}

// ─── Color Picker Simulé ──────────────────────────────────────────────────────

function ColorPicker({ value, onChange }: { value: string; onChange: (c: string) => void }) {
  const options = ["#2E7D32", "#1565C0", "#212121"];
  return (
    <div className="flex gap-2">
      {options.map((c) => (
        <button
          key={c}
          onClick={() => onChange(c)}
          className="w-8 h-8 rounded-full border-2 transition-all"
          style={{ backgroundColor: c, borderColor: value === c ? "#fff" : "transparent", boxShadow: value === c ? `0 0 0 2px ${c}` : "none" }}
          title={c}
        />
      ))}
    </div>
  );
}

// ─── Toggle ───────────────────────────────────────────────────────────────────

function Toggle({ checked, onChange, label }: { checked: boolean; onChange: () => void; label: string }) {
  return (
    <label className="flex items-center justify-between cursor-pointer">
      <span className="text-xs text-gray-700">{label}</span>
      <button
        onClick={onChange}
        className={`relative w-9 h-5 rounded-full transition-colors ${checked ? "bg-[#2E7D32]" : "bg-gray-200"}`}
      >
        <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${checked ? "translate-x-4" : "translate-x-0.5"}`} />
      </button>
    </label>
  );
}

// ─── Checkbox ─────────────────────────────────────────────────────────────────

function Checkbox({ checked, onChange, label }: { checked: boolean; onChange: () => void; label: string }) {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <span
        onClick={onChange}
        className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${checked ? "bg-[#2E7D32] border-[#2E7D32]" : "border-gray-300"}`}
      >
        {checked && <svg viewBox="0 0 12 12" className="w-3 h-3"><polyline points="2,6 5,9 10,3" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" /></svg>}
      </span>
      <span className="text-xs text-gray-700">{label}</span>
    </label>
  );
}

// ─── Config State ─────────────────────────────────────────────────────────────

interface Config {
  titre: string;
  type: string;
  dateFrom: string;
  dateTo: string;
  destinataire: string;
  langue: string;
  dataKPI: boolean;
  dataCours: boolean;
  dataCert: boolean;
  dataFinance: boolean;
  dataRH: boolean;
  dataRisques: boolean;
  dataPrevisions: boolean;
  dataESG: boolean;
  logo: boolean;
  tdm: boolean;
  pagination: boolean;
  couleur: string;
}

const defaultConfig: Config = {
  titre: "Rapport de performance — S1 2025",
  type: "Production",
  dateFrom: "2025-01-01",
  dateTo: "2025-06-30",
  destinataire: "Usage interne",
  langue: "Français",
  dataKPI: true,
  dataCours: true,
  dataCert: true,
  dataFinance: true,
  dataRH: false,
  dataRisques: false,
  dataPrevisions: false,
  dataESG: false,
  logo: true,
  tdm: true,
  pagination: true,
  couleur: "#2E7D32",
};

// ─── Preview Panel ────────────────────────────────────────────────────────────

function PreviewPanel({ config, page }: { config: Config; page: number }) {
  return (
    <div className="bg-white shadow-xl rounded-lg overflow-hidden" style={{ aspectRatio: "210/297", maxHeight: "600px" }}>
      {/* Page header */}
      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        {config.logo && (
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: config.couleur }}>
              <span className="text-white text-xs font-bold">A</span>
            </div>
            <span className="text-xs font-bold" style={{ color: config.couleur }}>AGRIFRIK</span>
          </div>
        )}
        <div className="text-center flex-1">
          <p className="text-xs font-semibold text-gray-800 truncate">{config.titre || "Rapport sans titre"}</p>
          <p className="text-xs text-gray-400">{config.dateFrom} → {config.dateTo}</p>
        </div>
        <div className="text-xs text-gray-400">{page}/8</div>
      </div>

      {/* Page body */}
      <div className="px-6 py-4 flex-1 overflow-hidden">
        {page === 1 && (
          <div className="space-y-3">
            <div className="rounded-lg p-3 text-white text-center" style={{ backgroundColor: config.couleur }}>
              <p className="text-xs font-bold">{config.titre}</p>
              <p className="text-xs opacity-80 mt-0.5">{config.dateFrom} — {config.dateTo}</p>
              <p className="text-xs opacity-70 mt-0.5">Destinataire : {config.destinataire}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-700 mb-2">1. Synthèse exécutive</p>
              <p className="text-xs text-gray-500 leading-relaxed">
                Ce rapport présente les performances d&apos;AGRIFRIK SAS pour la période
                du {config.dateFrom} au {config.dateTo}.
                Les données couvrent {[config.dataKPI && "KPI production", config.dataCours && "cours marché",
                  config.dataCert && "certifications", config.dataFinance && "finance"].filter(Boolean).join(", ")}.
              </p>
            </div>
            {config.dataKPI && (
              <div>
                <p className="text-xs font-semibold text-gray-700 mb-1">2. KPI Production</p>
                <table className="w-full text-xs border-collapse">
                  <thead><tr className="bg-gray-50">
                    <th className="text-left px-2 py-1 text-gray-600">Indicateur</th>
                    <th className="text-right px-2 py-1 text-gray-600">Valeur</th>
                  </tr></thead>
                  <tbody className="divide-y divide-gray-50">
                    {[["Production totale", "87,6 t"], ["Rendement moyen", "784 kg/ha"], ["Grade AA", "62%"]].map(([k, v]) => (
                      <tr key={k}><td className="px-2 py-1 text-gray-600">{k}</td><td className="px-2 py-1 text-right font-medium">{v}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {config.dataFinance && (
              <div>
                <p className="text-xs font-semibold text-gray-700 mb-1">3. Performance financière</p>
                <MiniPreviewChart />
                <p className="text-xs text-gray-400 text-center">CA mensuel (M XOF) — données fictives</p>
              </div>
            )}
          </div>
        )}
        {page !== 1 && (
          <div className="flex flex-col items-center justify-center h-40 text-gray-300">
            <svg viewBox="0 0 48 48" className="w-10 h-10 mb-2"><rect x="8" y="4" width="32" height="40" rx="3" fill="none" stroke="currentColor" strokeWidth="2" /><line x1="14" y1="14" x2="34" y2="14" stroke="currentColor" strokeWidth="1.5" /><line x1="14" y1="20" x2="34" y2="20" stroke="currentColor" strokeWidth="1.5" /><line x1="14" y1="26" x2="26" y2="26" stroke="currentColor" strokeWidth="1.5" /></svg>
            <p className="text-xs">Page {page} — contenu généré</p>
          </div>
        )}
      </div>

      {/* Page footer */}
      <div className="px-6 py-2 border-t border-gray-100 flex items-center justify-between">
        <p className="text-xs text-gray-400">AGRIFRIK — Confidentiel</p>
        {config.pagination && <p className="text-xs text-gray-400">Page {page}/8</p>}
      </div>
    </div>
  );
}

// ─── Library Blocks ───────────────────────────────────────────────────────────

const BLOCKS = [
  { icon: "📊", label: "Graphique bar" },
  { icon: "📈", label: "Courbe temporelle" },
  { icon: "🍩", label: "Donut camembert" },
  { icon: "📋", label: "Tableau de données" },
  { icon: "📝", label: "Zone de texte" },
  { icon: "🗺️", label: "Carte parcelles" },
  { icon: "🏆", label: "KPI cards" },
  { icon: "📎", label: "Page de couverture" },
];

const TEMPLATES = [
  { name: "Rapport mensuel FAO", sections: 3, used: 8 },
  { name: "Rapport qualité Barry Callebaut", sections: 5, used: 12 },
  { name: "Rapport bailleur Banque Mondiale", sections: 7, used: 4 },
];

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function RapportBuilderPage() {
  const [config, setConfig] = useState<Config>(defaultConfig);
  const [page, setPage] = useState(1);
  const [generated, setGenerated] = useState(false);
  const [dragging, setDragging] = useState<string | null>(null);

  const set = <K extends keyof Config>(key: K, val: Config[K]) =>
    setConfig((prev) => ({ ...prev, [key]: val }));

  const toggleData = (key: keyof Config) =>
    setConfig((prev) => ({ ...prev, [key]: !prev[key] }));

  const handleGenerate = () => {
    setGenerated(true);
    setTimeout(() => setGenerated(false), 2000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Topbar breadcrumb={["Rapports", "Générateur de Rapports"]} />

      <div className="flex-1 flex overflow-hidden" style={{ height: "calc(100vh - 64px)" }}>

        {/* ── Panneau gauche : Configuration ── */}
        <aside className="w-72 flex-shrink-0 bg-white border-r border-gray-100 overflow-y-auto p-4 space-y-5">
          <h2 className="text-sm font-bold text-gray-900">Configuration</h2>

          {/* Paramètres de base */}
          <section>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Paramètres de base</p>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-gray-600 block mb-1">Titre du rapport</label>
                <input
                  type="text"
                  value={config.titre}
                  onChange={(e) => set("titre", e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:border-[#2E7D32]"
                />
              </div>
              <div>
                <label className="text-xs text-gray-600 block mb-1">Type de rapport</label>
                <select
                  value={config.type}
                  onChange={(e) => set("type", e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:border-[#2E7D32]"
                >
                  {["Production", "Finance", "Durabilité", "Bailleur", "Personnalisé"].map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs text-gray-600 block mb-1">Du</label>
                  <input type="date" value={config.dateFrom} onChange={(e) => set("dateFrom", e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:border-[#2E7D32]" />
                </div>
                <div>
                  <label className="text-xs text-gray-600 block mb-1">Au</label>
                  <input type="date" value={config.dateTo} onChange={(e) => set("dateTo", e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:border-[#2E7D32]" />
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-600 block mb-1">Destinataire</label>
                <select
                  value={config.destinataire}
                  onChange={(e) => set("destinataire", e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:border-[#2E7D32]"
                >
                  {["Usage interne", "FAO", "Banque Mondiale", "ANADER", "Barry Callebaut", "Client personnalisé"].map((d) => (
                    <option key={d}>{d}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-600 block mb-1">Langue</label>
                <select
                  value={config.langue}
                  onChange={(e) => set("langue", e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:border-[#2E7D32]"
                >
                  {["Français", "Anglais", "Les deux"].map((l) => (
                    <option key={l}>{l}</option>
                  ))}
                </select>
              </div>
            </div>
          </section>

          {/* Données incluses */}
          <section>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Données incluses</p>
            <div className="space-y-2">
              <Checkbox checked={config.dataKPI} onChange={() => toggleData("dataKPI")} label="KPI Production" />
              <Checkbox checked={config.dataCours} onChange={() => toggleData("dataCours")} label="Cours marché" />
              <Checkbox checked={config.dataCert} onChange={() => toggleData("dataCert")} label="Certifications" />
              <Checkbox checked={config.dataFinance} onChange={() => toggleData("dataFinance")} label="Finance" />
              <Checkbox checked={config.dataRH} onChange={() => toggleData("dataRH")} label="RH" />
              <Checkbox checked={config.dataRisques} onChange={() => toggleData("dataRisques")} label="Risques" />
              <Checkbox checked={config.dataPrevisions} onChange={() => toggleData("dataPrevisions")} label="Prévisions" />
              <Checkbox checked={config.dataESG} onChange={() => toggleData("dataESG")} label="ESG" />
            </div>
          </section>

          {/* Mise en forme */}
          <section>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Mise en forme</p>
            <div className="space-y-3">
              <Toggle checked={config.logo} onChange={() => toggleData("logo")} label="Inclure logo AGRIFRIK" />
              <Toggle checked={config.tdm} onChange={() => toggleData("tdm")} label="Table des matières" />
              <Toggle checked={config.pagination} onChange={() => toggleData("pagination")} label="Numérotation des pages" />
              <div>
                <p className="text-xs text-gray-600 mb-2">Couleur principale</p>
                <ColorPicker value={config.couleur} onChange={(c) => set("couleur", c)} />
              </div>
            </div>
          </section>

          {/* Actions */}
          <div className="space-y-2 pt-2">
            <button
              onClick={handleGenerate}
              className="w-full py-2.5 rounded-xl text-white text-xs font-semibold transition-all hover:opacity-90 active:scale-95"
              style={{ backgroundColor: config.couleur }}
            >
              {generated ? "✅ Rapport généré !" : "Générer le rapport"}
            </button>
            <button
              className="w-full py-2 rounded-xl border border-gray-200 text-gray-600 text-xs font-medium hover:bg-gray-50"
              onClick={() => alert("Modèle enregistré (simulation)")}>
              Enregistrer comme modèle
            </button>
          </div>
        </aside>

        {/* ── Panneau centre : Prévisualisation ── */}
        <main className="flex-1 flex flex-col overflow-hidden bg-gray-100">
          {/* Toolbar */}
          <div className="bg-white border-b border-gray-100 px-4 py-2 flex items-center gap-3 text-xs text-gray-600">
            <span className="font-medium">Zoom 100%</span>
            <span className="text-gray-300">|</span>
            <span>Page {page} / 8</span>
            <span className="text-gray-300">|</span>
            <button onClick={() => setPage(Math.max(1, page - 1))} className="hover:text-gray-900 font-bold">◀</button>
            <button onClick={() => setPage(Math.min(8, page + 1))} className="hover:text-gray-900 font-bold">▶</button>
            <span className="text-gray-300">|</span>
            <button className="hover:text-gray-900">⛶ Plein écran</button>
            <div className="ml-auto text-gray-400 italic">{config.titre}</div>
          </div>

          {/* A4 preview */}
          <div className="flex-1 overflow-auto p-6 flex justify-center">
            <div className="w-full max-w-md">
              <PreviewPanel config={config} page={page} />
              {/* Page nav dots */}
              <div className="flex justify-center gap-1.5 mt-3">
                {Array.from({ length: 8 }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i + 1)}
                    className={`w-2 h-2 rounded-full transition-all ${page === i + 1 ? "scale-125" : "opacity-40"}`}
                    style={{ backgroundColor: page === i + 1 ? config.couleur : "#9ca3af" }}
                  />
                ))}
              </div>
            </div>
          </div>
        </main>

        {/* ── Panneau droit : Bibliothèque ── */}
        <aside className="w-60 flex-shrink-0 bg-white border-l border-gray-100 overflow-y-auto p-4">
          <h2 className="text-sm font-bold text-gray-900 mb-1">Bibliothèque de blocs</h2>
          <p className="text-xs text-gray-400 mb-3">Glisser-déposer dans le rapport</p>

          <div className="grid grid-cols-2 gap-2 mb-6">
            {BLOCKS.map((b) => (
              <div
                key={b.label}
                draggable
                onDragStart={() => setDragging(b.label)}
                onDragEnd={() => setDragging(null)}
                className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border cursor-grab active:cursor-grabbing transition-all select-none ${
                  dragging === b.label
                    ? "border-[#2E7D32] bg-green-50 scale-95"
                    : "border-gray-200 bg-gray-50 hover:border-[#2E7D32] hover:bg-green-50"
                }`}
              >
                <span className="text-xl">{b.icon}</span>
                <span className="text-xs text-gray-600 text-center leading-tight">{b.label}</span>
              </div>
            ))}
          </div>

          {/* Drop zone simulée */}
          <div
            className="rounded-xl border-2 border-dashed border-gray-200 p-3 text-center mb-6 transition-all"
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => {
              if (dragging) alert(`Bloc "${dragging}" ajouté au rapport (simulation)`);
              setDragging(null);
            }}
          >
            <p className="text-xs text-gray-400">Déposer ici</p>
            <svg viewBox="0 0 24 24" className="w-6 h-6 mx-auto mt-1 text-gray-300"><path fill="currentColor" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
          </div>

          {/* Modèles */}
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Modèles enregistrés</p>
            <div className="space-y-2">
              {TEMPLATES.map((t) => (
                <button
                  key={t.name}
                  className="w-full text-left rounded-xl border border-gray-100 bg-gray-50 p-3 hover:border-[#2E7D32] hover:bg-green-50 transition-all"
                  onClick={() => set("titre", t.name)}
                >
                  <p className="text-xs font-medium text-gray-800 leading-tight">{t.name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{t.sections} sections · Utilisé {t.used}×</p>
                </button>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
