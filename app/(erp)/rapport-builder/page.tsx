"use client";

import { useState } from "react";
import Topbar from "../../components/Topbar";
import {
  GripVertical,
  X,
  Plus,
  Eye,
  FileDown,
  CalendarClock,
  BarChart2,
  LineChart,
  PieChart,
  Table2,
  Type,
  Minus,
  FileText,
  Hash,
  LayoutDashboard,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";

/* ══════════════════════════════════════════════════════════
   TYPES
══════════════════════════════════════════════════════════ */

interface Block {
  id: string;
  type: string;
  label: string;
}

/* ══════════════════════════════════════════════════════════
   BIBLIOTHÈQUE DE BLOCS
══════════════════════════════════════════════════════════ */

const LIBRARY = [
  {
    category: "Données",
    icon: <Table2 size={14} className="text-purple-600" />,
    items: [
      { type: "tbl-prod", label: "Tableau production par culture" },
      { type: "tbl-ventes", label: "Tableau ventes par client" },
      { type: "tbl-fin", label: "Tableau financier résumé" },
      { type: "tbl-emplois", label: "Tableau emplois" },
    ],
  },
  {
    category: "Graphiques",
    icon: <BarChart2 size={14} className="text-blue-600" />,
    items: [
      { type: "chart-ca", label: "Graphique CA mensuel" },
      { type: "chart-prod", label: "Graphique production cultures" },
      { type: "chart-trezo", label: "Graphique trésorerie" },
      { type: "chart-donut", label: "Donut répartition CA" },
    ],
  },
  {
    category: "Texte & Structure",
    icon: <Type size={14} className="text-gray-600" />,
    items: [
      { type: "title", label: "Titre / Sous-titre" },
      { type: "text", label: "Texte libre" },
      { type: "sep", label: "Séparateur" },
      { type: "pagebreak", label: "Page suivante" },
    ],
  },
  {
    category: "Indicateurs",
    icon: <Hash size={14} className="text-green-600" />,
    items: [
      { type: "kpi1", label: "KPI unique" },
      { type: "kpi4", label: "Groupe de 4 KPIs" },
      { type: "dashboard", label: "Tableau de bord synthèse" },
    ],
  },
];

/* ══════════════════════════════════════════════════════════
   BLOCS PAR DÉFAUT (canvas initial)
══════════════════════════════════════════════════════════ */

const DEFAULT_BLOCKS: Block[] = [
  { id: "b1", type: "title", label: "Titre" },
  { id: "b2", type: "kpi4", label: "Groupe de 4 KPIs" },
  { id: "b3", type: "chart-ca", label: "Graphique CA mensuel" },
  { id: "b4", type: "tbl-ventes", label: "Tableau ventes par client" },
];

/* ══════════════════════════════════════════════════════════
   COMPOSANT PRINCIPAL
══════════════════════════════════════════════════════════ */

export default function RapportBuilderPage() {
  const [blocks, setBlocks] = useState<Block[]>(DEFAULT_BLOCKS);
  const [selectedId, setSelectedId] = useState<string>("b3");

  // Propriétés du panneau droit (simulées sur le bloc graphique)
  const [chartType, setChartType] = useState("barres");
  const [period, setPeriod] = useState("mois");
  const [dataSource, setDataSource] = useState("ca");
  const [chartTitle, setChartTitle] = useState("Évolution CA mensuel 2024");
  const [showLegend, setShowLegend] = useState(true);
  const [accentColor, setAccentColor] = useState("#2E7D32");

  const removeBlock = (id: string) => {
    setBlocks((prev) => prev.filter((b) => b.id !== id));
    if (selectedId === id) setSelectedId("");
  };

  const addBlockFromLib = (type: string, label: string) => {
    const newBlock: Block = { id: `b${Date.now()}`, type, label };
    setBlocks((prev) => [...prev, newBlock]);
    setSelectedId(newBlock.id);
  };

  const selectedBlock = blocks.find((b) => b.id === selectedId);

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Topbar
        title="Constructeur de Rapports"
        breadcrumb={["Rapports & BI", "Rapport Builder"]}
      />

      {/* ── 3 colonnes ─────────────────────────────────────────────────────── */}
      <div className="flex flex-1 overflow-hidden">

        {/* ══════════════════════════════════════════════════════
            GAUCHE — Bibliothèque de blocs (250px)
        ══════════════════════════════════════════════════════ */}
        <aside className="w-[250px] shrink-0 border-r border-gray-200 bg-white overflow-y-auto flex flex-col">
          <div className="px-4 py-3 border-b border-gray-100 bg-[#F8FBF8]">
            <p className="text-xs font-bold text-gray-600 uppercase tracking-widest">Bibliothèque</p>
          </div>
          <div className="px-3 py-3 space-y-4 flex-1">
            {LIBRARY.map((cat) => (
              <div key={cat.category}>
                <div className="flex items-center gap-1.5 mb-2">
                  {cat.icon}
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{cat.category}</p>
                </div>
                <div className="space-y-1">
                  {cat.items.map((item) => (
                    <button
                      key={item.type}
                      onClick={() => addBlockFromLib(item.type, item.label)}
                      className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg border border-gray-100 bg-[#F8FBF8] hover:border-[#2E7D32] hover:bg-green-50 transition-colors text-left group"
                    >
                      <Plus size={12} className="text-gray-400 group-hover:text-[#2E7D32] shrink-0" />
                      <span className="text-xs text-gray-700 group-hover:text-gray-900 leading-tight">{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* ══════════════════════════════════════════════════════
            CENTRE — Zone de construction (flex-1)
        ══════════════════════════════════════════════════════ */}
        <main className="flex-1 overflow-y-auto bg-gray-100 flex flex-col">
          {/* En-tête zone */}
          <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText size={16} className="text-[#2E7D32]" />
              <span className="text-sm font-semibold text-gray-800">Rapport Mensuel Juillet 2025 — AGRIFRIK</span>
              <span className="text-xs text-gray-400 ml-1">({blocks.length} blocs)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-lg">Aperçu en temps réel</span>
            </div>
          </div>

          {/* Canvas rapport */}
          <div className="flex-1 p-6">
            <div className="max-w-2xl mx-auto space-y-3">

              {blocks.length === 0 && (
                <div className="border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center">
                  <LayoutDashboard size={32} className="mx-auto text-gray-300 mb-2" />
                  <p className="text-sm text-gray-400">Ajoutez des blocs depuis la bibliothèque</p>
                </div>
              )}

              {blocks.map((block) => (
                <BlockCanvas
                  key={block.id}
                  block={block}
                  selected={block.id === selectedId}
                  onSelect={() => setSelectedId(block.id)}
                  onRemove={() => removeBlock(block.id)}
                />
              ))}
            </div>
          </div>

          {/* Boutons bas */}
          <div className="bg-white border-t border-gray-200 px-6 py-3 flex items-center gap-3">
            <button className="flex items-center gap-1.5 px-4 py-2 border border-gray-300 rounded-xl text-xs text-gray-700 hover:bg-gray-50 transition-colors">
              <Eye size={14} /> Aperçu du rapport
            </button>
            <button className="flex items-center gap-1.5 px-4 py-2 border border-gray-300 rounded-xl text-xs text-gray-700 hover:bg-gray-50 transition-colors">
              <FileDown size={14} /> Générer PDF
            </button>
            <button className="flex items-center gap-1.5 px-5 py-2 bg-[#2E7D32] text-white rounded-xl text-xs font-medium hover:bg-[#1B5E20] transition-colors shadow-sm">
              <CalendarClock size={14} /> Planifier envoi
            </button>
          </div>
        </main>

        {/* ══════════════════════════════════════════════════════
            DROITE — Propriétés du bloc (250px)
        ══════════════════════════════════════════════════════ */}
        <aside className="w-[250px] shrink-0 border-l border-gray-200 bg-white overflow-y-auto flex flex-col">
          <div className="px-4 py-3 border-b border-gray-100 bg-[#F8FBF8]">
            <p className="text-xs font-bold text-gray-600 uppercase tracking-widest">Propriétés</p>
          </div>

          {!selectedBlock ? (
            <div className="flex-1 flex items-center justify-center p-6 text-center">
              <div>
                <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center mx-auto mb-3">
                  <FileText size={18} className="text-gray-300" />
                </div>
                <p className="text-xs text-gray-400">Sélectionnez un bloc pour configurer ses propriétés</p>
              </div>
            </div>
          ) : (
            <div className="flex-1 px-4 py-4 space-y-5">

              {/* Nom du bloc */}
              <div>
                <div className="inline-flex items-center gap-1.5 bg-green-100 text-green-800 text-[10px] font-bold px-2 py-1 rounded-full mb-3">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                  {selectedBlock.label}
                </div>
              </div>

              {/* Type de graphique (visible si bloc graphique) */}
              {selectedBlock.type.startsWith("chart") && (
                <>
                  <PropGroup label="Type de graphique">
                    <div className="grid grid-cols-3 gap-1">
                      {[
                        { val: "barres", label: "Barres", icon: <BarChart2 size={12} /> },
                        { val: "lignes", label: "Lignes", icon: <LineChart size={12} /> },
                        { val: "donut", label: "Donut", icon: <PieChart size={12} /> },
                      ].map((opt) => (
                        <button
                          key={opt.val}
                          onClick={() => setChartType(opt.val)}
                          className={`flex flex-col items-center gap-0.5 py-2 rounded-lg border text-[10px] transition-colors ${
                            chartType === opt.val
                              ? "border-[#2E7D32] bg-green-50 text-[#2E7D32]"
                              : "border-gray-200 text-gray-500 hover:border-gray-300"
                          }`}
                        >
                          {opt.icon}
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </PropGroup>

                  <PropGroup label="Période">
                    <select
                      value={period}
                      onChange={(e) => setPeriod(e.target.value)}
                      className="w-full text-xs border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#2E7D32] bg-white text-gray-700"
                    >
                      <option value="mois">Ce mois</option>
                      <option value="trimestre">Trimestre</option>
                      <option value="annee">Année</option>
                    </select>
                  </PropGroup>

                  <PropGroup label="Données">
                    <select
                      value={dataSource}
                      onChange={(e) => setDataSource(e.target.value)}
                      className="w-full text-xs border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#2E7D32] bg-white text-gray-700"
                    >
                      <option value="ca">CA</option>
                      <option value="prod">Production</option>
                      <option value="charges">Charges</option>
                    </select>
                  </PropGroup>

                  <PropGroup label="Titre du graphique">
                    <input
                      type="text"
                      value={chartTitle}
                      onChange={(e) => setChartTitle(e.target.value)}
                      className="w-full text-xs border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#2E7D32] bg-white text-gray-700"
                    />
                  </PropGroup>

                  <PropGroup label="Afficher légende">
                    <button
                      onClick={() => setShowLegend(!showLegend)}
                      className="flex items-center gap-2 text-xs"
                    >
                      {showLegend
                        ? <ToggleRight size={22} className="text-[#2E7D32]" />
                        : <ToggleLeft size={22} className="text-gray-400" />}
                      <span className={showLegend ? "text-[#2E7D32] font-medium" : "text-gray-400"}>
                        {showLegend ? "Oui" : "Non"}
                      </span>
                    </button>
                  </PropGroup>

                  <PropGroup label="Couleur principale">
                    <div className="flex gap-2 flex-wrap">
                      {["#2E7D32", "#1565C0", "#E65100", "#6A1B9A", "#424242"].map((c) => (
                        <button
                          key={c}
                          onClick={() => setAccentColor(c)}
                          title={c}
                          className={`w-7 h-7 rounded-lg transition-all ${
                            accentColor === c ? "ring-2 ring-offset-1 ring-gray-500 scale-110" : "hover:scale-105"
                          }`}
                          style={{ backgroundColor: c }}
                        />
                      ))}
                    </div>
                  </PropGroup>
                </>
              )}

              {/* Propriétés tableau */}
              {selectedBlock.type.startsWith("tbl") && (
                <>
                  <PropGroup label="Colonnes affichées">
                    {["Culture", "Surface", "Production", "CA"].map((col) => (
                      <label key={col} className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer">
                        <input type="checkbox" defaultChecked className="accent-[#2E7D32]" />
                        {col}
                      </label>
                    ))}
                  </PropGroup>
                  <PropGroup label="Lignes max">
                    <input
                      type="number"
                      defaultValue={10}
                      min={1}
                      max={50}
                      className="w-full text-xs border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#2E7D32] bg-white text-gray-700"
                    />
                  </PropGroup>
                </>
              )}

              {/* Propriétés KPI */}
              {selectedBlock.type.startsWith("kpi") && (
                <>
                  <PropGroup label="Indicateurs">
                    {["CA", "Production", "Trésorerie", "Effectifs"].map((k) => (
                      <label key={k} className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer">
                        <input type="checkbox" defaultChecked className="accent-[#2E7D32]" />
                        {k}
                      </label>
                    ))}
                  </PropGroup>
                  <PropGroup label="Style">
                    <select className="w-full text-xs border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#2E7D32] bg-white text-gray-700">
                      <option>Cartes colorées</option>
                      <option>Minimaliste</option>
                      <option>Avec sparkline</option>
                    </select>
                  </PropGroup>
                </>
              )}

              {/* Propriétés texte/titre */}
              {(selectedBlock.type === "title" || selectedBlock.type === "text") && (
                <>
                  <PropGroup label="Contenu">
                    <textarea
                      rows={3}
                      defaultValue={selectedBlock.type === "title" ? "Rapport Mensuel Juillet 2025 — AGRIFRIK" : ""}
                      className="w-full text-xs border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#2E7D32] bg-white text-gray-700 resize-none"
                      placeholder="Votre texte..."
                    />
                  </PropGroup>
                  {selectedBlock.type === "title" && (
                    <PropGroup label="Taille">
                      <select className="w-full text-xs border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#2E7D32] bg-white text-gray-700">
                        <option>Grand titre (H1)</option>
                        <option>Titre section (H2)</option>
                        <option>Sous-titre (H3)</option>
                      </select>
                    </PropGroup>
                  )}
                </>
              )}

              {/* Bouton appliquer */}
              <button className="w-full py-2 bg-[#2E7D32] text-white text-xs font-medium rounded-xl hover:bg-[#1B5E20] transition-colors mt-2">
                Appliquer les modifications
              </button>
            </div>
          )}
        </aside>

      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   BLOC CANVAS
══════════════════════════════════════════════════════════ */

function BlockCanvas({
  block, selected, onSelect, onRemove,
}: {
  block: Block; selected: boolean; onSelect: () => void; onRemove: () => void;
}) {
  return (
    <div
      onClick={onSelect}
      className={`relative rounded-2xl border-2 transition-all cursor-pointer ${
        selected
          ? "border-[#2E7D32] shadow-md shadow-green-100"
          : "border-gray-200 bg-white hover:border-gray-300"
      }`}
    >
      {/* Barre de contrôle */}
      <div className={`flex items-center gap-2 px-3 py-2 rounded-t-xl border-b ${selected ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-100"}`}>
        <GripVertical size={14} className="text-gray-400 cursor-grab" />
        <span className="text-xs font-medium text-gray-600 flex-1">{block.label}</span>
        {!selected && (
          <span className="text-[10px] text-gray-400 italic">Cliquer pour configurer</span>
        )}
        {selected && (
          <span className="text-[10px] text-[#2E7D32] font-semibold">● Sélectionné</span>
        )}
        <button
          onClick={(e) => { e.stopPropagation(); onRemove(); }}
          className="w-5 h-5 flex items-center justify-center rounded-md hover:bg-red-100 text-gray-400 hover:text-red-500 transition-colors"
        >
          <X size={12} />
        </button>
      </div>

      {/* Contenu du bloc */}
      <div className="p-4 bg-white rounded-b-xl">
        <BlockPreview block={block} />
      </div>
    </div>
  );
}

function BlockPreview({ block }: { block: Block }) {
  /* Titre */
  if (block.type === "title") {
    return (
      <div>
        <h2 className="text-lg font-black text-gray-900 leading-tight">
          Rapport Mensuel Juillet 2025 — AGRIFRIK
        </h2>
        <p className="text-xs text-gray-400 mt-1">Période : 01/07/2025 – 31/07/2025</p>
      </div>
    );
  }

  /* Groupe KPIs */
  if (block.type === "kpi4") {
    return (
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "CA", value: "14,2 M", color: "bg-green-50 text-green-700" },
          { label: "Production", value: "8,4 t", color: "bg-blue-50 text-blue-700" },
          { label: "Trésorerie", value: "34,2 M", color: "bg-orange-50 text-orange-700" },
          { label: "Employés", value: "287", color: "bg-purple-50 text-purple-700" },
        ].map((kpi) => (
          <div key={kpi.label} className={`rounded-xl p-3 text-center ${kpi.color} border border-current border-opacity-20`}>
            <p className="text-lg font-black leading-none">{kpi.value}</p>
            <p className="text-[10px] font-medium mt-1 opacity-70">{kpi.label}</p>
          </div>
        ))}
      </div>
    );
  }

  /* Graphique CA */
  if (block.type === "chart-ca") {
    const bars = [62, 78, 55, 90, 104, 88, 112];
    const labels = ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun", "Jul"];
    const maxVal = Math.max(...bars);
    return (
      <div>
        <p className="text-xs font-semibold text-gray-600 mb-2">Évolution CA mensuel 2024 (M XOF)</p>
        <svg viewBox="0 0 400 100" xmlns="http://www.w3.org/2000/svg" className="w-full">
          {bars.map((v, i) => {
            const bh = (v / maxVal) * 72;
            const x = 10 + i * 55;
            return (
              <g key={i}>
                <rect x={x} y={80 - bh} width={38} height={bh} fill="#2E7D32" rx={3} fillOpacity={0.85} />
                <text x={x + 19} y={97} textAnchor="middle" fontSize={9} fill="#9ca3af">{labels[i]}</text>
                <text x={x + 19} y={80 - bh - 3} textAnchor="middle" fontSize={8} fill="#2E7D32" fontWeight="bold">{v}</text>
              </g>
            );
          })}
        </svg>
      </div>
    );
  }

  /* Tableau ventes */
  if (block.type === "tbl-ventes") {
    return (
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-[#F8FBF8] border-b border-gray-200">
              <th className="text-left px-2 py-1.5 font-semibold text-gray-600">Client</th>
              <th className="text-right px-2 py-1.5 font-semibold text-gray-600">Produit</th>
              <th className="text-right px-2 py-1.5 font-semibold text-gray-600">Qtité</th>
              <th className="text-right px-2 py-1.5 font-semibold text-gray-600">CA (M)</th>
            </tr>
          </thead>
          <tbody>
            {[
              { client: "CEMOI France", prod: "Cacao AA", qty: "18,4 t", ca: "18,0" },
              { client: "OLAM CI", prod: "Cacao A/B", qty: "24,2 t", ca: "22,7" },
              { client: "SIFCA Export", prod: "Anacarde", qty: "8,6 t", ca: "5,3" },
            ].map((r, i) => (
              <tr key={r.client} className={i % 2 === 0 ? "bg-white" : "bg-[#F8FBF8]"}>
                <td className="px-2 py-1.5 font-medium text-gray-800">{r.client}</td>
                <td className="px-2 py-1.5 text-right text-gray-600">{r.prod}</td>
                <td className="px-2 py-1.5 text-right text-gray-600">{r.qty}</td>
                <td className="px-2 py-1.5 text-right font-bold text-[#2E7D32]">{r.ca}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  /* Séparateur */
  if (block.type === "sep") {
    return <hr className="border-gray-200" />;
  }

  /* Page suivante */
  if (block.type === "pagebreak") {
    return (
      <div className="flex items-center gap-2 text-xs text-gray-400">
        <div className="flex-1 border-t border-dashed border-gray-300" />
        <span>— Saut de page —</span>
        <div className="flex-1 border-t border-dashed border-gray-300" />
      </div>
    );
  }

  /* KPI unique */
  if (block.type === "kpi1") {
    return (
      <div className="flex items-center gap-4 p-2">
        <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
          <Hash size={20} className="text-[#2E7D32]" />
        </div>
        <div>
          <p className="text-2xl font-black text-gray-900">14,2 M</p>
          <p className="text-xs text-gray-500">XOF — Chiffre d'affaires</p>
        </div>
        <div className="ml-auto text-right">
          <p className="text-xs font-bold text-green-600">▲ +12%</p>
          <p className="text-[10px] text-gray-400">vs mois précédent</p>
        </div>
      </div>
    );
  }

  /* Fallback générique */
  return (
    <div className="flex items-center justify-center h-16 text-xs text-gray-400 italic">
      Aperçu : {block.label}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   GROUPE DE PROPRIÉTÉ
══════════════════════════════════════════════════════════ */

function PropGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">{label}</p>
      <div className="space-y-1.5">{children}</div>
    </div>
  );
}
