"use client";

import {
  ChevronRight,
  Clock,
  Download,
  Eye,
  File,
  FileSpreadsheet,
  FileText,
  Folder,
  FolderOpen,
  HardDrive,
  Image,
  MoreHorizontal,
  Plus,
  Search,
  Share2,
  Users,
} from "lucide-react";
import { useState } from "react";
import Topbar from "../../components/Topbar";

// ─── Types ───────────────────────────────────────────────────────────────────

type FileType = "pdf" | "excel" | "word" | "image";

interface DocFile {
  nom: string;
  type: FileType;
  taille: string;
  modifie: string;
  partage: boolean;
}

interface Dossier {
  nom: string;
  docs: number;
  children?: Dossier[];
}

// ─── Arborescence ────────────────────────────────────────────────────────────

const arborescence: Dossier[] = [
  {
    nom: "Production",
    docs: 188,
    children: [
      { nom: "Parcelles & Cartographie", docs: 42 },
      { nom: "Cultures 2024-2025", docs: 38 },
      { nom: "Rapports terrain", docs: 96 },
      { nom: "Certifications RA", docs: 12 },
    ],
  },
  {
    nom: "Finance",
    docs: 423,
    children: [
      { nom: "Comptabilité", docs: 124 },
      { nom: "Factures", docs: 184 },
      { nom: "Contrats", docs: 87 },
      { nom: "Budgets", docs: 28 },
    ],
  },
  {
    nom: "Commerce",
    docs: 124,
    children: [
      { nom: "Devis & Commandes", docs: 54 },
      { nom: "Export & Douanes", docs: 38 },
      { nom: "Qualité & Certificats", docs: 32 },
    ],
  },
  {
    nom: "RH",
    docs: 359,
    children: [
      { nom: "Contrats employés", docs: 48 },
      { nom: "Bulletins de paie", docs: 287 },
      { nom: "Formations", docs: 24 },
    ],
  },
  {
    nom: "Administration",
    docs: 32,
    children: [
      { nom: "Légal", docs: 18 },
      { nom: "Assurances", docs: 14 },
    ],
  },
];

// ─── Documents (dossier actif : Certifications RA) ────────────────────────────

const documents: DocFile[] = [
  { nom: "Certificat Rainforest Alliance 2025", type: "pdf", taille: "2,4 MB", modifie: "01/03/2025", partage: true },
  { nom: "Audit RA — Rapport complet 2025", type: "pdf", taille: "8,1 MB", modifie: "15/02/2025", partage: false },
  { nom: "Checklist BPA Rainforest Alliance", type: "excel", taille: "0,8 MB", modifie: "14/02/2025", partage: false },
  { nom: "Certificat RA parcelle PAR-A1", type: "pdf", taille: "1,2 MB", modifie: "28/02/2025", partage: false },
  { nom: "Certificat RA parcelle PAR-A3", type: "pdf", taille: "1,1 MB", modifie: "28/02/2025", partage: false },
  { nom: "Photos audit terrain PAR-A1", type: "image", taille: "4,8 MB", modifie: "14/02/2025", partage: false },
  { nom: "Photos audit terrain PAR-A3", type: "image", taille: "5,2 MB", modifie: "14/02/2025", partage: false },
  { nom: "Procédure gestion produits chimiques", type: "word", taille: "0,6 MB", modifie: "10/01/2025", partage: true },
  { nom: "Procédure protection riverains", type: "word", taille: "0,4 MB", modifie: "10/01/2025", partage: false },
  { nom: "Plan de gestion déchets", type: "word", taille: "0,5 MB", modifie: "08/01/2025", partage: false },
  { nom: "Titre foncier PAR-A1", type: "pdf", taille: "3,2 MB", modifie: "01/01/2024", partage: false },
  { nom: "Titre foncier PAR-A3", type: "pdf", taille: "2,8 MB", modifie: "01/01/2024", partage: false },
];

// ─── Activité récente ─────────────────────────────────────────────────────────

const activites = [
  { date: "09/07/2025 09:15", user: "IS", action: "Ibrahim S. a téléversé", doc: "rapport_terrain_RT-2025-048.pdf" },
  { date: "08/07/2025 17:22", user: "JK", action: "Jean-Baptiste K. a créé", doc: "FAC-2025-041_Barry_Callebaut.pdf" },
  { date: "07/07/2025 16:05", user: "MK", action: "Mariam K. a téléversé", doc: "bulletins_paie_juillet_2025.zip" },
  { date: "06/07/2025 11:00", user: "AM", action: "Adjoua M. a partagé", doc: "bilan_comptable_S1_2025.xlsx avec Direction" },
  { date: "05/07/2025 14:30", user: "AD", action: "Admin a déplacé 8 docs de "Audit 2025" vers", doc: "Certifications RA" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function FileIcon({ type }: { type: FileType }) {
  if (type === "pdf")
    return (
      <span className="flex items-center justify-center w-9 h-9 rounded-xl shrink-0" style={{ background: "#FFEBEE" }}>
        <FileText size={18} style={{ color: "#C62828" }} />
      </span>
    );
  if (type === "excel")
    return (
      <span className="flex items-center justify-center w-9 h-9 rounded-xl shrink-0" style={{ background: "#E8F5E9" }}>
        <FileSpreadsheet size={18} style={{ color: "#2E7D32" }} />
      </span>
    );
  if (type === "word")
    return (
      <span className="flex items-center justify-center w-9 h-9 rounded-xl shrink-0" style={{ background: "#E3F2FD" }}>
        <FileText size={18} style={{ color: "#1565C0" }} />
      </span>
    );
  return (
    <span className="flex items-center justify-center w-9 h-9 rounded-xl shrink-0" style={{ background: "#F5F5F5" }}>
      <Image size={18} style={{ color: "#757575" }} />
    </span>
  );
}

function TypeLabel({ type }: { type: FileType }) {
  const map: Record<FileType, { label: string; bg: string; color: string }> = {
    pdf: { label: "PDF", bg: "#FFEBEE", color: "#C62828" },
    excel: { label: "Excel", bg: "#E8F5E9", color: "#2E7D32" },
    word: { label: "Word", bg: "#E3F2FD", color: "#1565C0" },
    image: { label: "Image", bg: "#F5F5F5", color: "#757575" },
  };
  const { label, bg, color } = map[type];
  return (
    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: bg, color }}>
      {label}
    </span>
  );
}

function Avatar({ initials, color = "#2E7D32" }: { initials: string; color?: string }) {
  return (
    <span
      className="inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold text-white shrink-0"
      style={{ background: color }}
    >
      {initials}
    </span>
  );
}

const avatarColors: Record<string, string> = {
  IS: "#1565C0",
  JK: "#2E7D32",
  MK: "#6A1B9A",
  AM: "#E65100",
  AD: "#00695C",
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DocumentsPage() {
  const [dossierActif, setDossierActif] = useState("Certifications RA");
  const [parentOuvert, setParentOuvert] = useState<string | null>("Production");

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Topbar title="Documents & GED" breadcrumb={["Collaboration", "Documents"]} />

      <main className="flex-1 p-6 space-y-5">

        {/* ── KPI ─────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
          {[
            { label: "Documents total", value: "847", sub: "Ajoutés ce mois : 48", icon: <File size={18} />, iconBg: "#E8F5E9", iconColor: "#2E7D32" },
            { label: "Espace utilisé", value: "2,4 GB", sub: "sur 10 GB disponibles", icon: <HardDrive size={18} />, iconBg: "#E3F2FD", iconColor: "#1565C0" },
            { label: "Documents partagés", value: "124", sub: "Avec équipes & partenaires", icon: <Share2 size={18} />, iconBg: "#FFF3E0", iconColor: "#E65100" },
            { label: "Collaborateurs", value: "18", sub: "Ont accès à la GED", icon: <Users size={18} />, iconBg: "#F3E5F5", iconColor: "#6A1B9A" },
          ].map((k) => (
            <div key={k.label} className="rounded-2xl border border-gray-100 bg-white px-5 py-4 flex items-center gap-4">
              <span className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: k.iconBg, color: k.iconColor }}>
                {k.icon}
              </span>
              <div>
                <p className="text-xl font-bold text-gray-900 leading-none">{k.value}</p>
                <p className="text-xs font-semibold text-gray-700 mt-0.5">{k.label}</p>
                <p className="text-[11px] text-gray-400">{k.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Barre de recherche + bouton ──────────────────────────────────── */}
        <div className="flex gap-3 items-center">
          <div className="flex-1 flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-2.5 bg-white shadow-sm">
            <Search size={15} className="text-gray-400 shrink-0" />
            <input
              type="text"
              placeholder="Rechercher un document, un dossier, un auteur…"
              className="flex-1 text-sm bg-transparent outline-none text-gray-700 placeholder-gray-400"
            />
          </div>
          <button
            className="flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium text-white shrink-0"
            style={{ background: "#2E7D32" }}
          >
            <Plus size={15} />
            Nouveau document
          </button>
        </div>

        {/* ── Layout 2 colonnes ─────────────────────────────────────────────── */}
        <div className="flex gap-4 items-start">

          {/* Arborescence ─────────────────────────────────────────────────── */}
          <aside className="shrink-0 rounded-2xl border border-gray-100 bg-white p-4" style={{ width: 280 }}>
            <div className="flex items-center gap-2 mb-3 px-1">
              <FolderOpen size={15} style={{ color: "#2E7D32" }} />
              <span className="text-xs font-bold text-gray-700">AGRIFRIK</span>
            </div>

            <div className="space-y-0.5">
              {arborescence.map((parent) => (
                <div key={parent.nom}>
                  {/* Parent */}
                  <button
                    onClick={() => setParentOuvert(parentOuvert === parent.nom ? null : parent.nom)}
                    className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <ChevronRight
                      size={13}
                      className="shrink-0 transition-transform"
                      style={{ transform: parentOuvert === parent.nom ? "rotate(90deg)" : "rotate(0deg)", color: "#9E9E9E" }}
                    />
                    <Folder size={14} style={{ color: "#2E7D32" }} className="shrink-0" />
                    <span className="flex-1 text-left">{parent.nom}</span>
                    <span className="text-[10px] text-gray-400">{parent.docs}</span>
                  </button>

                  {/* Enfants */}
                  {parentOuvert === parent.nom && parent.children && (
                    <div className="ml-4 mt-0.5 space-y-0.5">
                      {parent.children.map((child) => {
                        const actif = dossierActif === child.nom;
                        return (
                          <button
                            key={child.nom}
                            onClick={() => setDossierActif(child.nom)}
                            className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs transition-colors"
                            style={actif ? { background: "#E8F5E9", color: "#1B5E20", fontWeight: 600 } : { color: "#616161" }}
                          >
                            <File size={13} className="shrink-0" style={{ color: actif ? "#2E7D32" : "#BDBDBD" }} />
                            <span className="flex-1 text-left">{child.nom}</span>
                            <span className="text-[10px]" style={{ color: actif ? "#2E7D32" : "#BDBDBD" }}>{child.docs}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </aside>

          {/* Liste documents ──────────────────────────────────────────────── */}
          <div className="flex-1 min-w-0 rounded-2xl border border-gray-100 bg-white">
            {/* En-tête */}
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-gray-900">{dossierActif}</h2>
                <p className="text-xs text-gray-400 mt-0.5">
                  {documents.length} documents
                </p>
              </div>
              {/* Tri */}
              <div className="flex items-center gap-1 text-xs text-gray-500">
                {["Nom ▲", "Date", "Taille", "Type"].map((t, i) => (
                  <button
                    key={t}
                    className="px-3 py-1 rounded-lg transition-colors"
                    style={i === 0 ? { background: "#E8F5E9", color: "#2E7D32", fontWeight: 600 } : { color: "#9E9E9E" }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr style={{ background: "#F8FBF8" }}>
                    {["Fichier", "Type", "Taille", "Modifié", "Partagé", "Actions"].map((col) => (
                      <th key={col} className="text-left text-gray-500 font-semibold px-4 py-3 whitespace-nowrap">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {documents.map((doc) => (
                    <tr key={doc.nom} className="hover:bg-gray-50 transition-colors group">
                      {/* Fichier */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <FileIcon type={doc.type} />
                          <span className="font-medium text-gray-800 max-w-[200px] truncate">{doc.nom}</span>
                        </div>
                      </td>
                      {/* Type */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        <TypeLabel type={doc.type} />
                      </td>
                      {/* Taille */}
                      <td className="px-4 py-3 text-gray-500 tabular-nums whitespace-nowrap">{doc.taille}</td>
                      {/* Modifié */}
                      <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{doc.modifie}</td>
                      {/* Partagé */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        {doc.partage ? (
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-600">Oui</span>
                        ) : (
                          <span className="text-[10px] text-gray-300">—</span>
                        )}
                      </td>
                      {/* Actions */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <button className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-100 transition-colors" title="Voir">
                            <Eye size={12} />
                          </button>
                          <button className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-100 transition-colors" title="Télécharger">
                            <Download size={12} />
                          </button>
                          <button className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-100 text-gray-400 hover:bg-gray-100 transition-colors" title="Plus">
                            <MoreHorizontal size={12} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ── Activité récente ──────────────────────────────────────────────── */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <div className="flex items-center gap-2 mb-4">
            <Clock size={16} style={{ color: "#2E7D32" }} />
            <h2 className="text-sm font-bold text-gray-900">Activité récente</h2>
          </div>
          <div className="space-y-3">
            {activites.map((a, i) => (
              <div key={i} className="flex items-start gap-3">
                <Avatar initials={a.user} color={avatarColors[a.user] ?? "#2E7D32"} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-700">
                    <span className="font-medium">{a.action}</span>{" "}
                    <span className="text-green-700 font-medium">{a.doc}</span>
                  </p>
                  <p className="text-[11px] text-gray-400 mt-0.5">{a.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}
