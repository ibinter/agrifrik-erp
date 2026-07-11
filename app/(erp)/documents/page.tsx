"use client";

import { useState } from "react";
import Topbar from "../../components/Topbar";
import {
  Search,
  FolderOpen,
  Folder,
  FileText,
  FileSpreadsheet,
  Image,
  Award,
  Star,
  Lock,
  AlertTriangle,
  Upload,
  FolderPlus,
  Grid,
  List,
  ChevronRight,
  Eye,
  Download,
  MoreHorizontal,
} from "lucide-react";

interface Doc {
  id: number;
  name: string;
  type: "pdf" | "xlsx" | "docx" | "png" | "cert";
  size: string;
  author: string;
  date: string;
  category: string;
  folder: string;
  isFavorite?: boolean;
  isConfidential?: boolean;
  warning?: string;
  lastAccess?: string;
}

const DOCS: Doc[] = [
  { id: 1, name: "Certificat RA 2024-2026.pdf", type: "pdf", size: "2,4 MB", author: "Rainforest Alliance", date: "15/03/2025", category: "Certification", folder: "Rainforest Alliance", isFavorite: true, lastAccess: "11/07/2025" },
  { id: 2, name: "Rapport audit interne RA Jul 2025.pdf", type: "pdf", size: "1,8 MB", author: "Adjoua M.", date: "05/07/2025", category: "Certification", folder: "Rainforest Alliance", lastAccess: "10/07/2025" },
  { id: 3, name: "TF-23847 Titre foncier PAR-A1.pdf", type: "pdf", size: "0,6 MB", author: "DGFiP CI", date: "2008", category: "Juridique", folder: "Titres fonciers", isConfidential: true, lastAccess: "08/07/2025" },
  { id: 4, name: "Contrat fermage PAR-B1-2022.pdf", type: "pdf", size: "0,4 MB", author: "Dir. Admin", date: "2022", category: "Juridique", folder: "Fermages", warning: "Expire 2027", lastAccess: "07/07/2025" },
  { id: 5, name: "GlobalGAP_Certificate_2025.pdf", type: "pdf", size: "1,2 MB", author: "Bureau Veritas", date: "01/05/2025", category: "Certification", folder: "GlobalG.A.P.", lastAccess: "06/07/2025" },
  { id: 6, name: "Analyse sol PAR-A1-MAR2025.pdf", type: "pdf", size: "0,8 MB", author: "CNRA CI", date: "15/03/2025", category: "Agronomie", folder: "Analyses de sol", lastAccess: "05/07/2025" },
  { id: 7, name: "Facture JD 6120M 2021.pdf", type: "pdf", size: "0,4 MB", author: "Concess. JD", date: "Jan 2021", category: "Finance", folder: "Comptabilite 2021", lastAccess: "04/07/2025" },
  { id: 8, name: "Plan traitement phytosanitaire 2025.xlsx", type: "xlsx", size: "0,3 MB", author: "Konan Y.", date: "01/01/2025", category: "Agronomie", folder: "Plans de traitement", lastAccess: "03/07/2025" },
  { id: 9, name: "Contrat Barry Callebaut 2025.pdf", type: "pdf", size: "1,1 MB", author: "Dir. Comm.", date: "12/01/2025", category: "Finance", folder: "Contrats assurances", isConfidential: true, lastAccess: "02/07/2025" },
  { id: 10, name: "Bill of Lading MSC LOT-045.pdf", type: "pdf", size: "0,2 MB", author: "MSC Lines", date: "10/07/2025", category: "Export", folder: "Documents douaniers", lastAccess: "11/07/2025" },
  { id: 11, name: "DAE Export LOT-045.pdf", type: "pdf", size: "0,3 MB", author: "DGD Abidjan", date: "08/07/2025", category: "Export", folder: "Documents douaniers", lastAccess: "09/07/2025" },
  { id: 12, name: "Certificat phytosanitaire LOT-045.pdf", type: "pdf", size: "0,2 MB", author: "MINADER", date: "07/07/2025", category: "Export", folder: "Certificats phytosanitaires", lastAccess: "08/07/2025" },
  { id: 13, name: "Budget 2025 v3.xlsx", type: "xlsx", size: "1,4 MB", author: "Dir. Fin.", date: "15/01/2025", category: "Finance", folder: "Comptabilite 2025", isFavorite: true, lastAccess: "11/07/2025" },
  { id: 14, name: "Rapport annuel 2024.pdf", type: "pdf", size: "8,2 MB", author: "AGRIFRIK", date: "28/02/2025", category: "Finance", folder: "Comptabilite 2024", isFavorite: true, lastAccess: "10/07/2025" },
  { id: 15, name: "Manuel SGA Rainforest Alliance.pdf", type: "pdf", size: "4,6 MB", author: "RA", date: "2024", category: "Certification", folder: "Rainforest Alliance", lastAccess: "01/07/2025" },
  { id: 16, name: "Statuts AGRIFRIK SAS.pdf", type: "pdf", size: "0,8 MB", author: "Notaire", date: "2008", category: "Juridique", folder: "Statuts societe", isConfidential: true, lastAccess: "25/06/2025" },
  { id: 17, name: "Carte parcelles SIG Jul 2025.png", type: "png", size: "3,2 MB", author: "Konan Y.", date: "01/07/2025", category: "Agronomie", folder: "Cartes SIG", lastAccess: "11/07/2025" },
  { id: 18, name: "Formation phyto Jun 2025 - CR.docx", type: "docx", size: "0,2 MB", author: "Konan Y.", date: "28/06/2025", category: "RH", folder: "Formations", lastAccess: "30/06/2025" },
];

const TREE = [
  {
    name: "AGRIFRIK SAS", children: [
      { name: "Certifications", children: [{ name: "Rainforest Alliance" }, { name: "GlobalG.A.P." }, { name: "ISO 9001" }] },
      { name: "Finance", children: [{ name: "Comptabilite 2024" }, { name: "Comptabilite 2025" }, { name: "Contrats assurances" }] },
      { name: "Agronomie", children: [{ name: "Analyses de sol" }, { name: "Plans de traitement" }, { name: "Cartes SIG" }] },
      { name: "RH", children: [{ name: "Contrats de travail" }, { name: "Formations" }] },
      { name: "Juridique", children: [{ name: "Titres fonciers" }, { name: "Fermages" }, { name: "Statuts societe" }] },
      { name: "Export", children: [{ name: "Documents douaniers" }, { name: "Certificats phytosanitaires" }, { name: "Lettres de credit" }] },
    ],
  },
];

const TYPE_ICON: Record<string, React.ReactNode> = {
  pdf: <FileText size={28} className="text-red-400" />,
  xlsx: <FileSpreadsheet size={28} className="text-green-500" />,
  docx: <FileText size={28} className="text-blue-400" />,
  png: <Image size={28} className="text-purple-400" />,
  cert: <Award size={28} className="text-yellow-500" />,
};

const TYPE_BADGE: Record<string, string> = {
  pdf: "bg-red-100 text-red-600",
  xlsx: "bg-green-100 text-green-700",
  docx: "bg-blue-100 text-blue-700",
  png: "bg-purple-100 text-purple-600",
  cert: "bg-yellow-100 text-yellow-700",
};

function DocCard({ doc }: { doc: Doc }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-4 hover:shadow-md transition-shadow group">
      <div className="flex items-start justify-between mb-3">
        <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center flex-shrink-0">
          {TYPE_ICON[doc.type] || <FileText size={28} className="text-gray-400" />}
        </div>
        <div className="flex items-center gap-1">
          {doc.isFavorite && <Star size={13} className="text-yellow-400 fill-yellow-400" />}
          {doc.isConfidential && <Lock size={13} className="text-red-400" />}
          <button className="text-gray-300 hover:text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
            <MoreHorizontal size={15} />
          </button>
        </div>
      </div>
      <p className="text-xs font-semibold text-gray-800 mb-1 leading-snug line-clamp-2">{doc.name}</p>
      <p className="text-[10px] text-gray-400 mb-2">{doc.size} · {doc.author}</p>
      {doc.warning && (
        <div className="flex items-center gap-1 mb-2">
          <AlertTriangle size={10} className="text-orange-500" />
          <span className="text-[10px] text-orange-600">{doc.warning}</span>
        </div>
      )}
      <div className="flex items-center justify-between">
        <div className="flex gap-1 flex-wrap">
          <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${TYPE_BADGE[doc.type]}`}>
            {doc.type.toUpperCase()}
          </span>
          <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-[#E8F5E9] text-[#2E7D32]">{doc.category}</span>
        </div>
        <span className="text-[10px] text-gray-400">{doc.date}</span>
      </div>
      <div className="flex gap-1 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <button className="flex-1 py-1 text-[10px] bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 flex items-center justify-center gap-1">
          <Eye size={10} />Voir
        </button>
        <button className="flex-1 py-1 text-[10px] bg-[#E8F5E9] text-[#2E7D32] rounded-lg hover:bg-[#C8E6C9] flex items-center justify-center gap-1">
          <Download size={10} />
        </button>
      </div>
    </div>
  );
}

interface TreeNode { name: string; children?: TreeNode[] }

function TreeItem({ node, depth = 0 }: { node: TreeNode; depth?: number }) {
  const [open, setOpen] = useState(depth === 0);
  const hasChildren = node.children && node.children.length > 0;
  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center gap-1.5 py-1 px-2 rounded-lg hover:bg-gray-100 text-left transition-colors text-xs ${depth === 0 ? "font-semibold text-gray-800" : "text-gray-600"}`}
        style={{ paddingLeft: `${8 + depth * 12}px` }}
      >
        {hasChildren ? (
          open ? <FolderOpen size={13} className="text-[#2E7D32] flex-shrink-0" /> : <Folder size={13} className="text-[#2E7D32] flex-shrink-0" />
        ) : (
          <Folder size={13} className="text-gray-400 flex-shrink-0" />
        )}
        <span className="truncate">{node.name}</span>
        {hasChildren && <ChevronRight size={11} className={`ml-auto flex-shrink-0 text-gray-400 transition-transform ${open ? "rotate-90" : ""}`} />}
      </button>
      {open && node.children && (
        <div>{node.children.map((c) => <TreeItem key={c.name} node={c} depth={depth + 1} />)}</div>
      )}
    </div>
  );
}

function AllDocsTab() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [catFilter, setCatFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filtered = DOCS.filter((d) => {
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase()) || d.author.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === "all" || d.type === typeFilter;
    const matchCat = catFilter === "all" || d.category === catFilter;
    return matchSearch && matchType && matchCat;
  });

  const categories = Array.from(new Set(DOCS.map((d) => d.category)));

  return (
    <div className="flex gap-4">
      <div className="w-52 flex-shrink-0">
        <div className="rounded-2xl border border-gray-100 bg-white p-3">
          <p className="text-xs font-semibold text-gray-500 mb-2 px-2">Arborescence</p>
          {TREE.map((node) => <TreeItem key={node.name} node={node} depth={0} />)}
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-2 flex-1 min-w-[180px]">
            <Search size={13} className="text-gray-400" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Rechercher..." className="text-xs flex-1 outline-none bg-transparent text-gray-700" />
          </div>
          <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}
            className="text-xs border border-gray-200 rounded-xl px-3 py-2 bg-white text-gray-700 focus:outline-none">
            <option value="all">Tous les types</option>
            {["pdf", "xlsx", "docx", "png", "cert"].map((t) => <option key={t} value={t}>{t.toUpperCase()}</option>)}
          </select>
          <select value={catFilter} onChange={(e) => setCatFilter(e.target.value)}
            className="text-xs border border-gray-200 rounded-xl px-3 py-2 bg-white text-gray-700 focus:outline-none">
            <option value="all">Toutes categories</option>
            {categories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <button className="flex items-center gap-1.5 px-3 py-2 text-xs bg-white border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50">
            <FolderPlus size={13} />Nouveau dossier
          </button>
          <button className="flex items-center gap-1.5 px-3 py-2 text-xs bg-[#2E7D32] text-white rounded-xl hover:bg-[#1B5E20]">
            <Upload size={13} />Importer
          </button>
          <div className="flex bg-white border border-gray-200 rounded-xl overflow-hidden">
            <button onClick={() => setViewMode("grid")} className={`p-2 transition-colors ${viewMode === "grid" ? "bg-[#2E7D32] text-white" : "text-gray-500 hover:bg-gray-50"}`}><Grid size={13} /></button>
            <button onClick={() => setViewMode("list")} className={`p-2 transition-colors ${viewMode === "list" ? "bg-[#2E7D32] text-white" : "text-gray-500 hover:bg-gray-50"}`}><List size={13} /></button>
          </div>
        </div>

        {viewMode === "grid" ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {filtered.map((doc) => <DocCard key={doc.id} doc={doc} />)}
          </div>
        ) : (
          <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-[#F8FBF8] border-b border-gray-100">
                  {["Nom", "Type", "Taille", "Auteur", "Date", "Categorie", "Actions"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left font-semibold text-gray-500">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((doc) => (
                  <tr key={doc.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-2.5">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 flex items-center justify-center">{TYPE_ICON[doc.type]}</div>
                        <span className="font-medium text-gray-800 truncate max-w-[200px]">{doc.name}</span>
                        {doc.isFavorite && <Star size={11} className="text-yellow-400 fill-yellow-400 flex-shrink-0" />}
                        {doc.isConfidential && <Lock size={11} className="text-red-400 flex-shrink-0" />}
                      </div>
                    </td>
                    <td className="px-4 py-2.5"><span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${TYPE_BADGE[doc.type]}`}>{doc.type.toUpperCase()}</span></td>
                    <td className="px-4 py-2.5 text-gray-500">{doc.size}</td>
                    <td className="px-4 py-2.5 text-gray-500">{doc.author}</td>
                    <td className="px-4 py-2.5 text-gray-500">{doc.date}</td>
                    <td className="px-4 py-2.5"><span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-[#E8F5E9] text-[#2E7D32]">{doc.category}</span></td>
                    <td className="px-4 py-2.5">
                      <div className="flex items-center gap-1">
                        <button className="px-2 py-1 text-[10px] bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200">Voir</button>
                        <button className="px-2 py-1 text-[10px] bg-[#E8F5E9] text-[#2E7D32] rounded-lg hover:bg-[#C8E6C9]">DL</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-4 flex flex-wrap gap-3 text-xs">
          {[
            { v: "18", l: "documents", c: "text-gray-700" },
            { v: "28,6 MB", l: "total", c: "text-gray-700" },
            { v: "3", l: "favoris", c: "text-yellow-600", icon: <Star size={12} className="text-yellow-400 fill-yellow-400" /> },
            { v: "4", l: "confidentiels", c: "text-red-600", icon: <Lock size={12} className="text-red-400" /> },
          ].map((s) => (
            <div key={s.l} className="flex items-center gap-1.5 bg-white rounded-xl border border-gray-100 px-3 py-2">
              {s.icon}<span className={`font-semibold ${s.c}`}>{s.v}</span><span className="text-gray-500">{s.l}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FavorisTab() {
  const favorites = DOCS.filter((d) => d.isFavorite);
  return (
    <div>
      <p className="text-sm text-gray-500 mb-4">{favorites.length} documents favoris</p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {favorites.map((doc) => <DocCard key={doc.id} doc={doc} />)}
      </div>
    </div>
  );
}

function RecentsTab() {
  const recents = [...DOCS]
    .filter((d) => d.lastAccess)
    .sort((a, b) => (b.lastAccess || "").localeCompare(a.lastAccess || ""))
    .slice(0, 8);
  return (
    <div>
      <p className="text-sm text-gray-500 mb-4">{recents.length} documents recemment consultes</p>
      <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-[#F8FBF8] border-b border-gray-100">
              {["Nom", "Type", "Taille", "Auteur", "Categorie", "Derniere ouverture", "Actions"].map((h) => (
                <th key={h} className="px-4 py-3 text-left font-semibold text-gray-500">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {recents.map((doc) => (
              <tr key={doc.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                <td className="px-4 py-2.5">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 flex items-center justify-center">{TYPE_ICON[doc.type]}</div>
                    <span className="font-medium text-gray-800 truncate max-w-[200px]">{doc.name}</span>
                    {doc.isFavorite && <Star size={11} className="text-yellow-400 fill-yellow-400 flex-shrink-0" />}
                    {doc.isConfidential && <Lock size={11} className="text-red-400 flex-shrink-0" />}
                  </div>
                </td>
                <td className="px-4 py-2.5"><span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${TYPE_BADGE[doc.type]}`}>{doc.type.toUpperCase()}</span></td>
                <td className="px-4 py-2.5 text-gray-500">{doc.size}</td>
                <td className="px-4 py-2.5 text-gray-500">{doc.author}</td>
                <td className="px-4 py-2.5"><span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-[#E8F5E9] text-[#2E7D32]">{doc.category}</span></td>
                <td className="px-4 py-2.5 font-medium text-[#2E7D32]">{doc.lastAccess}</td>
                <td className="px-4 py-2.5">
                  <div className="flex items-center gap-1">
                    <button className="px-2 py-1 text-[10px] bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200">Voir</button>
                    <button className="px-2 py-1 text-[10px] bg-[#E8F5E9] text-[#2E7D32] rounded-lg hover:bg-[#C8E6C9]">DL</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function DocumentsPage() {
  const [tab, setTab] = useState<"tous" | "favoris" | "recents">("tous");
  return (
    <div className="flex flex-col h-full">
      <Topbar breadcrumb={["Collaboration", "Documents"]} />
      <div className="flex-1 overflow-auto p-6 bg-[#F4F6F4]">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Gestion Electronique de Documents</h1>
            <p className="text-sm text-gray-500 mt-0.5">Base documentaire AGRIFRIK SAS</p>
          </div>
        </div>
        <div className="flex gap-1 bg-white border border-gray-100 rounded-2xl p-1 mb-6 w-fit">
          {([{ k: "tous" as const, l: "Tous" }, { k: "favoris" as const, l: "Favoris" }, { k: "recents" as const, l: "Recents" }]).map((t) => (
            <button key={t.k} onClick={() => setTab(t.k)}
              className={`px-5 py-2 rounded-xl text-sm font-medium transition-all ${tab === t.k ? "bg-[#2E7D32] text-white shadow-sm" : "text-gray-600 hover:bg-gray-50"}`}>
              {t.l}
            </button>
          ))}
        </div>
        {tab === "tous" && <AllDocsTab />}
        {tab === "favoris" && <FavorisTab />}
        {tab === "recents" && <RecentsTab />}
      </div>
    </div>
  );
}
