"use client";

import { useState, useEffect } from "react";
import Topbar from "../../components/Topbar";
import { dbGet, dbPost, DEMO_ORG_ID } from "@/lib/db";
import ModalEmploye from "../../components/modals/ModalEmploye";
import ExportButton from "../../components/ui/ExportButton";
import {
  Users,
  UserCheck,
  Briefcase,
  DollarSign,
  Leaf,
  Pencil,
  FileText,
} from "lucide-react";

const kpis = [
  { label: "Effectif total", value: "287", accent: "#2E7D32", bg: "#E8F5E9", icon: Users },
  { label: "CDI", value: "42", accent: "#1565C0", bg: "#E3F2FD", icon: Briefcase },
  { label: "CDD", value: "18", accent: "#6A1B9A", bg: "#F3E5F5", icon: UserCheck },
  { label: "Saisonniers actifs", value: "227", accent: "#E65100", bg: "#FFF3E0", icon: Leaf },
  { label: "Masse salariale/mois", value: "3 840 000 XOF", accent: "#2E7D32", bg: "#E8F5E9", icon: DollarSign },
];

const employes = [
  { id: "EMP-001", nom: "Admin AGRIFRIK", poste: "Directeur Général", type: "CDI cadre", entree: "01/03/2023", salaire: "580 000", dept: "Direction", statut: "Actif" },
  { id: "EMP-002", nom: "Jean-Baptiste Kouassi", poste: "DAF", type: "CDI cadre", entree: "01/03/2023", salaire: "420 000", dept: "Finance", statut: "Actif" },
  { id: "EMP-003", nom: "Mariam Kouyaté", poste: "DRH", type: "CDI cadre", entree: "15/04/2023", salaire: "380 000", dept: "RH", statut: "Actif" },
  { id: "EMP-004", nom: "Adjoua Messou", poste: "Responsable qualité", type: "CDI", entree: "01/06/2023", salaire: "280 000", dept: "Commerce", statut: "Actif" },
  { id: "EMP-005", nom: "Ibrahim Sawadogo", poste: "Chef d'équipe terrain", type: "CDI", entree: "01/03/2023", salaire: "260 000", dept: "Production", statut: "Actif" },
  { id: "EMP-006", nom: "Konan Yao", poste: "Technicien agricole", type: "CDI", entree: "01/06/2023", salaire: "210 000", dept: "Production", statut: "Actif" },
  { id: "EMP-007", nom: "Bamba Oumar", poste: "Chef mécanicien", type: "CDI", entree: "01/08/2023", salaire: "200 000", dept: "Logistique", statut: "Actif" },
  { id: "EMP-008", nom: "Traoré Moussa", poste: "Chauffeur camion", type: "CDI", entree: "01/09/2023", salaire: "180 000", dept: "Logistique", statut: "Actif" },
  { id: "EMP-009", nom: "Coulibaly Rasmané", poste: "Chauffeur pick-up", type: "CDI", entree: "01/09/2023", salaire: "165 000", dept: "Logistique", statut: "Actif" },
  { id: "EMP-010", nom: "Diallo Fatoumata", poste: "Secrétaire comptable", type: "CDI", entree: "01/10/2023", salaire: "185 000", dept: "Finance", statut: "Actif" },
  { id: "EMP-011", nom: "Soro Ladji", poste: "Magasinier", type: "CDI", entree: "15/11/2023", salaire: "160 000", dept: "Logistique", statut: "Actif" },
  { id: "EMP-012", nom: "Ouédraogo Aïssata", poste: "Technicienne terrain", type: "CDD 2 ans", entree: "01/01/2024", salaire: "180 000", dept: "Production", statut: "Actif" },
  { id: "EMP-013", nom: "Kouyaté Laurent", poste: "Comptable junior", type: "CDD 1 an", entree: "01/03/2025", salaire: "165 000", dept: "Finance", statut: "Actif" },
  { id: "EMP-014", nom: "Bi Irié", poste: "Agent logistique", type: "CDD 6 mois", entree: "01/04/2025", salaire: "150 000", dept: "Logistique", statut: "Actif" },
  { id: "EMP-015", nom: "Dembélé Mariam", poste: "Assistante RH", type: "CDD 6 mois", entree: "01/05/2025", salaire: "145 000", dept: "RH", statut: "Actif" },
];

// exportRows is computed dynamically inside the component using activeRows

function initials(nom: string) {
  return nom.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
}

function ContratBadge({ type }: { type: string }) {
  const isCDI = type.startsWith("CDI");
  const isCDD = type.startsWith("CDD");
  return (
    <span
      className="text-xs px-2 py-0.5 rounded-full font-medium"
      style={isCDI ? { backgroundColor: "#E8F5E9", color: "#2E7D32" } : isCDD ? { backgroundColor: "#E3F2FD", color: "#1565C0" } : { backgroundColor: "#F3F4F6", color: "#374151" }}
    >
      {type}
    </span>
  );
}

function OrgChart() {
  const boxW = 140, boxH = 52, rx = 8;
  const gV = "#E8F5E9", gB = "#2E7D32";
  const dkV = "#1A2E1A", dkB = "#fff";

  type Box = { x: number; y: number; name: string; role: string; dark?: boolean };

  const boxes: Box[] = [
    { x: 330, y: 20, name: "Admin AGRIFRIK", role: "Directeur Général", dark: true },
    { x: 40,  y: 120, name: "Jean-Baptiste K.", role: "DAF" },
    { x: 200, y: 120, name: "Mariam Kouyaté", role: "DRH" },
    { x: 360, y: 120, name: "Ibrahim Sawadogo", role: "Dir. Production" },
    { x: 520, y: 120, name: "Adjoua Messou", role: "Dir. Commerce" },
    { x: 0,   y: 230, name: "Kouyaté Laurent", role: "Comptable junior" },
    { x: 80,  y: 230, name: "Diallo Fatoumata", role: "Secrét. comptable" },
    { x: 200, y: 230, name: "Dembélé Mariam", role: "Assistante RH" },
    { x: 320, y: 230, name: "Konan Yao", role: "Tech. agricole" },
    { x: 430, y: 230, name: "Ouédraogo Aïssata", role: "Tech. terrain" },
    { x: 540, y: 230, name: "Bi Irié", role: "Agent logistique" },
    { x: 660, y: 120, name: "Bamba Oumar", role: "Chef mécanicien" },
    { x: 660, y: 200, name: "Traoré Moussa", role: "Chauffeur camion" },
    { x: 660, y: 280, name: "Coulibaly Rasmané", role: "Chauffeur pick-up" },
    { x: 660, y: 355, name: "Soro Ladji", role: "Magasinier" },
  ];

  const edges: [number, number][] = [
    [0, 1], [0, 2], [0, 3], [0, 4],
    [1, 5], [1, 6],
    [2, 7],
    [3, 8], [3, 9],
    [4, 10],
    [0, 11], [11, 12], [11, 13], [11, 14],
  ];

  const cx = (b: Box) => b.x + boxW / 2;
  const cy = (b: Box) => b.y + boxH / 2;
  const bx = (b: Box) => b.x + boxW / 2;
  const by = (b: Box) => b.y + boxH;

  return (
    <svg viewBox="0 0 820 430" className="w-full" aria-label="Organigramme AGRIFRIK">
      <text x={730} y={108} fontSize="9" fill="#9CA3AF" fontStyle="italic">Logistique &amp; Maintenance</text>
      <line x1={660} y1={112} x2={800} y2={112} stroke="#D1D5DB" strokeWidth="1" strokeDasharray="4 3" />

      {edges.map(([pi, ci], i) => {
        const p = boxes[pi], c = boxes[ci];
        const x1 = bx(p), y1 = by(p);
        const x2 = cx(c), y2 = c.y;
        const midY = (y1 + y2) / 2;
        return (
          <path key={i} d={`M${x1},${y1} L${x1},${midY} L${x2},${midY} L${x2},${y2}`}
            fill="none" stroke="#D1D5DB" strokeWidth="1.5" />
        );
      })}

      {boxes.map((b, i) => {
        const bg = b.dark ? dkV : gV;
        const textColor = b.dark ? dkB : "#1A2E1A";
        const border = b.dark ? dkV : gB;
        return (
          <g key={i}>
            <rect x={b.x} y={b.y} width={boxW} height={boxH} rx={rx} fill={bg} stroke={border} strokeWidth="1.5" />
            <text x={cx(b)} y={b.y + 18} textAnchor="middle" fontSize="9" fontWeight="700" fill={textColor}>{b.name}</text>
            <text x={cx(b)} y={b.y + 32} textAnchor="middle" fontSize="8" fill={b.dark ? "#A5D6A7" : "#388E3C"}>{b.role}</text>
          </g>
        );
      })}

      <text x={bx(boxes[11]) + 5} y={cy(boxes[11])} fontSize="8" fill="#9CA3AF" dominantBaseline="middle">Service transversal</text>
    </svg>
  );
}

const recrutements = [
  {
    poste: "Responsable exportation",
    dept: "Commerce",
    type: "CDI cadre",
    salaire: "320 000 - 380 000 XOF",
    ouvert: "01/06/2025",
    statut: "Entretiens en cours",
    statutColor: "#F59E0B",
    statutBg: "#FFFBEB",
    candidats: 12,
    shortlist: 3,
    entretienFinal: "18/07/2025",
    recruteur: "Mariam Kouyaté",
  },
  {
    poste: "Technicien pisciculture",
    dept: "Production",
    type: "CDD 1 an",
    salaire: "180 000 XOF",
    ouvert: "20/06/2025",
    statut: "Réception candidatures",
    statutColor: "#1565C0",
    statutBg: "#E3F2FD",
    candidats: 4,
    shortlist: null,
    entretienFinal: null,
    recruteur: "Ibrahim Sawadogo",
  },
];

const evals = [
  { nom: "Ibrahim Sawadogo", note: 96, points: "Leadership terrain, qualité cacao", obj: "Formation audit RA avancé" },
  { nom: "Adjoua Messou", note: 94, points: "Rigueur qualité, initiative NC", obj: "Responsable certif. ISO" },
  { nom: "Jean-Baptiste Kouassi", note: 92, points: "Gestion financière, bailleurs", obj: "Formation SYSCOHADA avancé" },
  { nom: "Bamba Oumar", note: 88, points: "Maintenance pro, zéro panne", obj: "Certification mécanique JD" },
  { nom: "Konan Yao", note: 86, points: "Technique agronomique", obj: "Formation drone DJI" },
];

function ScoreBar({ note }: { note: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${note}%`, backgroundColor: note >= 90 ? "#2E7D32" : note >= 80 ? "#4CAF50" : "#8BC34A" }} />
      </div>
      <span className="text-sm font-bold text-gray-900 w-12 text-right">{note}/100</span>
    </div>
  );
}

const conges = [
  { nom: "Ibrahim Sawadogo", acquis: 30, pris: 8, solde: 22, prochain: "Pas de congé planifié (récolte oct)", alert: false },
  { nom: "Mariam Kouyaté", acquis: 30, pris: 12, solde: 18, prochain: "Congé annuel 1'15 Aoû 2025", alert: false },
  { nom: "Adjoua Messou", acquis: 30, pris: 0, solde: 30, prochain: "Ã€ planifier avant déc 2025", alert: true },
  { nom: "Jean-Baptiste Kouassi", acquis: 30, pris: 5, solde: 25, prochain: "Non planifié", alert: false },
  { nom: "Konan Yao", acquis: 30, pris: 10, solde: 20, prochain: "Sep 2025 (en discussion)", alert: false },
  { nom: "Bamba Oumar", acquis: 30, pris: 6, solde: 24, prochain: "Non planifié", alert: false },
  { nom: "Traoré Moussa", acquis: 26, pris: 4, solde: 22, prochain: "Aoû S2 2025", alert: false },
  { nom: "Coulibaly Rasmané", acquis: 26, pris: 8, solde: 18, prochain: "Non planifié", alert: false },
  { nom: "Diallo Fatoumata", acquis: 26, pris: 0, solde: 26, prochain: "Ã€ planifier", alert: true },
  { nom: "Soro Ladji", acquis: 22, pris: 4, solde: 18, prochain: "Non planifié", alert: false },
  { nom: "Ouédraogo Aïssata", acquis: 18, pris: 0, solde: 18, prochain: "Non planifié", alert: false },
  { nom: "Kouyaté Laurent", acquis: 10, pris: 0, solde: 10, prochain: "Non planifié", alert: false },
  { nom: "Bi Irié", acquis: 8, pris: 0, solde: 8, prochain: "Non planifié", alert: false },
  { nom: "Dembélé Mariam", acquis: 6, pris: 0, solde: 6, prochain: "Non planifié", alert: false },
  { nom: "Admin AGRIFRIK", acquis: 30, pris: 15, solde: 15, prochain: "Non planifié", alert: false },
];

const planningPersonnes = [
  { nom: "Mariam Kouyaté", conge: [2, 3], formation: [] },
  { nom: "Traoré Moussa", conge: [5, 6], formation: [] },
  { nom: "Ibrahim Sawadogo", conge: [], formation: [1] },
  { nom: "Adjoua Messou", conge: [], formation: [3, 4] },
  { nom: "Konan Yao", conge: [7], formation: [] },
  { nom: "Bamba Oumar", conge: [], formation: [5] },
  { nom: "Jean-Baptiste K.", conge: [], formation: [6] },
  { nom: "Diallo Fatoumata", conge: [], formation: [] },
];

const semaines = ["S28\n7/7", "S29\n14/7", "S30\n21/7", "S31\n28/7", "S32\n4/8", "S33\n11/8", "S34\n18/8", "S35\n25/8"];

function PlanningChart() {
  const rowH = 36, colW = 68, labelW = 120, padT = 40, padL = 8;
  const W = labelW + colW * 8 + padL * 2;
  const H = padT + rowH * planningPersonnes.length + 10;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" aria-label="Planning absences Juil-Aoû 2025">
      {semaines.map((s, i) => (
        <text key={i} x={labelW + padL + i * colW + colW / 2} y={padT - 8} textAnchor="middle" fontSize="9" fill="#9CA3AF">
          {s.split("\n")[0]}
        </text>
      ))}
      {semaines.map((s, i) => (
        <text key={`d${i}`} x={labelW + padL + i * colW + colW / 2} y={padT - 18} textAnchor="middle" fontSize="8" fill="#D1D5DB">
          {s.split("\n")[1]}
        </text>
      ))}

      {planningPersonnes.map((p, ri) => {
        const y = padT + ri * rowH;
        return (
          <g key={ri}>
            <rect x={0} y={y} width={W} height={rowH} fill={ri % 2 === 0 ? "#F9FAFB" : "#fff"} />
            <text x={padL + 4} y={y + rowH / 2 + 4} fontSize="10" fill="#374151">{p.nom}</text>
            {p.conge.map((col) => (
              <rect key={col} x={labelW + padL + (col - 1) * colW + 2} y={y + 6} width={colW - 4} height={rowH - 12} rx="4"
                fill="#FED7AA" stroke="#F97316" strokeWidth="1" />
            ))}
            {p.formation.map((col) => (
              <rect key={col} x={labelW + padL + (col - 1) * colW + 2} y={y + 6} width={colW - 4} height={rowH - 12} rx="4"
                fill="#BFDBFE" stroke="#3B82F6" strokeWidth="1" />
            ))}
            {semaines.map((_, i) => (
              <line key={i} x1={labelW + padL + i * colW} y1={y} x2={labelW + padL + i * colW} y2={y + rowH}
                stroke="#E5E7EB" strokeWidth="0.5" />
            ))}
          </g>
        );
      })}
      <line x1={0} y1={H - 10} x2={W} y2={H - 10} stroke="#E5E7EB" strokeWidth="1" />
      <rect x={padL} y={H - 8} width={12} height={8} rx="2" fill="#FED7AA" stroke="#F97316" strokeWidth="1" />
      <text x={padL + 16} y={H - 1} fontSize="9" fill="#9CA3AF">Congés</text>
      <rect x={padL + 70} y={H - 8} width={12} height={8} rx="2" fill="#BFDBFE" stroke="#3B82F6" strokeWidth="1" />
      <text x={padL + 86} y={H - 1} fontSize="9" fill="#9CA3AF">Formation</text>
    </svg>
  );
}

const filtresEff = ["Tous", "Permanent", "CDD", "Saisonniers", "Cadres"];

const TABS = ["Effectifs", "Organigramme", "Recrutements", "Ã‰valuations", "Congés"];

export default function RHPage() {
  const [tab, setTab] = useState(0);
  const [filtreEff, setFiltreEff] = useState("Tous");
  const [modalEmployeOpen, setModalEmployeOpen] = useState(false);
  const [voirEmploye, setVoirEmploye] = useState<Record<string, unknown> | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [rows, setRows] = useState<Record<string, unknown>[]>([]);

  const load = () => { dbGet<Record<string, unknown>>("employes").then(setRows); };
  useEffect(() => { load(); }, []);

  const activeRows: Record<string, unknown>[] = rows.length > 0 ? rows : employes.map((e) => ({
    id: e.id,
    nom: e.nom.split(" ").slice(1).join(" ") || e.nom,
    prenom: e.nom.split(" ")[0],
    poste: e.poste,
    type_contrat: e.type,
    salaire_base: parseFloat(e.salaire.replace(/\s/g, "")) || 0,
    date_embauche: e.entree,
    departement: e.dept,
    actif: e.statut === "Actif",
  }));

  const exportRows = activeRows.map((e) => ({
    nom: String(e.nom ?? ""),
    prenom: String(e.prenom ?? ""),
    poste: String(e.poste ?? ""),
    typeContrat: String(e.type_contrat ?? ""),
    salaireBase: String(e.salaire_base ?? "") + " XOF",
    dateEmbauche: String(e.date_embauche ?? ""),
    zone: String(e.departement ?? ""),
  }));

  const empFiltres = activeRows.filter((e) => {
    const typeContrat = String(e.type_contrat ?? "");
    if (filtreEff === "Tous") return true;
    if (filtreEff === "Permanent") return typeContrat === "CDI";
    if (filtreEff === "CDD") return typeContrat.startsWith("CDD");
    if (filtreEff === "Cadres") return typeContrat.includes("cadre");
    return true;
  });

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Topbar title="Ressources Humaines" breadcrumb={["RH & Social", "RH"]} />

      {toast && (
        <div className="fixed bottom-4 right-4 bg-green-600 text-white rounded-xl px-4 py-2 z-50 shadow-lg text-sm font-medium">
          {toast}
        </div>
      )}

      <ModalEmploye
        isOpen={modalEmployeOpen}
        onClose={() => setModalEmployeOpen(false)}
        onSubmit={async ({ nomComplet, poste, typeContrat, dateEmbauche, salaire, telephone, zone }) => {
          await dbPost("employes", {
            nom: nomComplet.split(" ").slice(1).join(" ") || nomComplet,
            prenom: nomComplet.split(" ")[0],
            poste,
            type_contrat: typeContrat,
            salaire_base: parseFloat(salaire) || 0,
            date_embauche: dateEmbauche,
            telephone,
            departement: zone,
            actif: true,
            organisation_id: DEMO_ORG_ID,
          });
          setModalEmployeOpen(false);
          showToast("Employé ajouté avec succès");
          load();
        }}
      />

      {/* Modal fiche employé */}
      {voirEmploye && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="bg-white rounded-2xl max-h-[90vh] overflow-hidden flex flex-col w-full max-w-lg shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0" style={{ backgroundColor: "#2E7D32" }}>
                  {initials(`${String(voirEmploye.prenom ?? "")} ${String(voirEmploye.nom ?? "")}`)}
                </div>
                <div>
                  <h2 className="text-base font-bold text-gray-900">{String(voirEmploye.prenom ?? "")} {String(voirEmploye.nom ?? "")}</h2>
                  <p className="text-xs text-gray-500">{String(voirEmploye.id ?? "")}</p>
                </div>
              </div>
              <button onClick={() => setVoirEmploye(null)} className="text-gray-400 hover:text-gray-600 transition text-xl leading-none">&times;</button>
            </div>
            <div className="overflow-y-auto p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Nom complet", value: `${String(voirEmploye.prenom ?? "")} ${String(voirEmploye.nom ?? "")}`.trim() },
                  { label: "Poste", value: String(voirEmploye.poste ?? "—") },
                  { label: "Département", value: String(voirEmploye.departement ?? "—") },
                  { label: "Type de contrat", value: String(voirEmploye.type_contrat ?? "—") },
                  { label: "Salaire brut", value: voirEmploye.salaire_base != null ? `${String(voirEmploye.salaire_base)} XOF` : "—" },
                  { label: "Date d'embauche", value: String(voirEmploye.date_embauche ?? "—") },
                  { label: "Statut", value: voirEmploye.actif !== false ? "Actif" : "Inactif" },
                  { label: "Contact", value: String(voirEmploye.telephone ?? "Non renseigné") },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-gray-50 rounded-xl p-3">
                    <p className="text-xs text-gray-400 mb-0.5">{label}</p>
                    <p className="text-sm font-semibold text-gray-800 break-words">{value}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3 px-6 py-4 border-t border-gray-100">
              <button
                onClick={() => setVoirEmploye(null)}
                className="flex-1 px-4 py-2 rounded-xl text-sm font-medium border border-gray-200 text-gray-600 hover:bg-gray-50 transition"
              >
                Fermer
              </button>
              <button
                onClick={() => window.print()}
                className="flex-1 px-4 py-2 rounded-xl text-sm font-medium bg-[#2E7D32] text-white hover:bg-[#1B5E20] transition flex items-center justify-center gap-2"
              >
                <FileText size={14} />
                Générer fiche PDF
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 space-y-6">

        {/* KPI */}
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-4">
          {kpis.map((k) => {
            const Icon = k.icon;
            return (
              <div key={k.label} className="rounded-2xl border border-gray-100 bg-white p-5 flex flex-col gap-2 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-500">{k.label}</span>
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ backgroundColor: k.bg }}>
                    <Icon size={16} style={{ color: k.accent }} />
                  </div>
                </div>
                <p className="text-xl font-bold text-gray-900">{k.value}</p>
              </div>
            );
          })}
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-1 bg-white border border-gray-100 rounded-2xl p-1 shadow-sm w-fit">
          {TABS.map((t, i) => (
            <button
              key={t}
              onClick={() => setTab(i)}
              className="px-4 py-2 rounded-xl text-sm font-medium transition"
              style={tab === i ? { backgroundColor: "#2E7D32", color: "#fff" } : { color: "#6B7280" }}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Effectifs */}
        {tab === 0 && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-2">
                {filtresEff.map((f) => (
                  <button
                    key={f}
                    onClick={() => setFiltreEff(f)}
                    className="px-3 py-1.5 rounded-full text-xs font-medium transition border"
                    style={filtreEff === f
                      ? { backgroundColor: "#2E7D32", color: "#fff", borderColor: "#2E7D32" }
                      : { backgroundColor: "#fff", color: "#6B7280", borderColor: "#E5E7EB" }}
                  >
                    {f}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <ExportButton data={exportRows} filename="employes-agrifrik" label="Exporter" />
                <button
                  onClick={() => setModalEmployeOpen(true)}
                  className="bg-[#2E7D32] text-white rounded-xl text-xs font-medium px-3 py-1.5 hover:bg-[#1B5E20] transition"
                >
                  + Ajouter un employé
                </button>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ backgroundColor: "#F8FBF8" }}>
                      {["NÂ°", "Employé", "Poste", "Type contrat", "Date entrée", "Salaire brut", "Département", "Statut", "Actions"].map((h) => (
                        <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {empFiltres.map((e, idx) => {
                      const rowId = String(e.id ?? `row-${idx}`);
                      const fullName = e.prenom ? `${String(e.prenom)} ${String(e.nom ?? "")}`.trim() : String(e.nom ?? "");
                      const poste = String(e.poste ?? "");
                      const typeContrat = String(e.type_contrat ?? "");
                      const dateEmbauche = String(e.date_embauche ?? "");
                      const salaire = e.salaire_base != null ? String(e.salaire_base) : "";
                      const dept = String(e.departement ?? "");
                      const actif = e.actif !== false;
                      return (
                      <tr key={rowId} className="hover:bg-gray-50 transition">
                        <td className="px-4 py-3 text-xs font-mono text-gray-400">{rowId}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                              style={{ backgroundColor: "#2E7D32" }}>
                              {initials(fullName)}
                            </div>
                            <span className="font-medium text-gray-900 whitespace-nowrap">{fullName}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-xs text-gray-600 whitespace-nowrap">{poste}</td>
                        <td className="px-4 py-3"><ContratBadge type={typeContrat} /></td>
                        <td className="px-4 py-3 text-xs text-gray-500 whitespace-nowrap">{dateEmbauche}</td>
                        <td className="px-4 py-3 text-xs font-semibold text-gray-900 whitespace-nowrap">{salaire} XOF</td>
                        <td className="px-4 py-3 text-xs text-gray-500">{dept}</td>
                        <td className="px-4 py-3">
                          <span className="text-xs px-2 py-0.5 rounded-full bg-green-50 text-green-700 font-medium">✅ {actif ? "Actif" : "Inactif"}</span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => setModalEmployeOpen(true)}
                              className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium text-gray-600 hover:bg-gray-100 transition border border-gray-200"
                            >
                              <Pencil size={12} />
                              Éditer
                            </button>
                            <button
                              onClick={() => setVoirEmploye(e)}
                              className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium text-gray-600 hover:bg-gray-100 transition border border-gray-200"
                            >
                              <FileText size={12} />
                              Voir fiche
                            </button>
                          </div>
                        </td>
                      </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Organigramme */}
        {tab === 1 && (
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="text-base font-semibold text-gray-800 mb-4">Organigramme AGRIFRIK</h2>
            <div className="overflow-x-auto">
              <div style={{ minWidth: 820 }}>
                <OrgChart />
              </div>
            </div>
            <div className="flex items-center gap-6 mt-4 text-xs text-gray-500">
              <span className="flex items-center gap-2">
                <span className="inline-block w-4 h-4 rounded" style={{ backgroundColor: "#1A2E1A" }} />
                Direction générale
              </span>
              <span className="flex items-center gap-2">
                <span className="inline-block w-4 h-4 rounded border border-[#2E7D32]" style={{ backgroundColor: "#E8F5E9" }} />
                Encadrement & équipes
              </span>
            </div>
          </div>
        )}

        {/* Recrutements */}
        {tab === 2 && (
          <div className="space-y-4">
            <h2 className="text-base font-semibold text-gray-800">Recrutements en cours ({recrutements.length})</h2>
            {recrutements.map((r) => (
              <div key={r.poste} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-base font-bold text-gray-900">{r.poste}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">{r.dept} Â· {r.type} Â· {r.salaire}</p>
                  </div>
                  <span className="text-xs font-semibold px-3 py-1.5 rounded-full shrink-0"
                    style={{ backgroundColor: r.statutBg, color: r.statutColor }}>
                    {r.statut}
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                  <div className="bg-gray-50 rounded-xl p-3">
                    <p className="text-gray-400">Ouvert le</p>
                    <p className="font-semibold text-gray-800 mt-0.5">{r.ouvert}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3">
                    <p className="text-gray-400">Candidats reçus</p>
                    <p className="font-semibold text-gray-800 mt-0.5">{r.candidats}</p>
                  </div>
                  {r.shortlist != null && (
                    <div className="bg-gray-50 rounded-xl p-3">
                      <p className="text-gray-400">Shortlist</p>
                      <p className="font-semibold text-gray-800 mt-0.5">{r.shortlist} candidats</p>
                    </div>
                  )}
                  {r.entretienFinal && (
                    <div className="bg-gray-50 rounded-xl p-3">
                      <p className="text-gray-400">Entretien final</p>
                      <p className="font-semibold text-gray-800 mt-0.5">{r.entretienFinal}</p>
                    </div>
                  )}
                  <div className="bg-gray-50 rounded-xl p-3">
                    <p className="text-gray-400">Recruteur</p>
                    <p className="font-semibold text-gray-800 mt-0.5">{r.recruteur}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Evaluations */}
        {tab === 3 && (
          <div className="space-y-6">
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-semibold text-gray-800">Campagne évaluation annuelle 2025</h2>
                <span className="text-xs text-gray-500">Avr -" Mai 2025 Â· 42/60 complètes (70%)</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full mb-6 overflow-hidden">
                <div className="h-full rounded-full bg-[#2E7D32]" style={{ width: "70%" }} />
              </div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Top 5 -" Meilleures évaluations</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ backgroundColor: "#F8FBF8" }}>
                      {["Employé", "Note", "Points forts", "Objectifs 2026"].map((h) => (
                        <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {evals.map((e) => (
                      <tr key={e.nom} className="hover:bg-gray-50 transition">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                              style={{ backgroundColor: "#2E7D32" }}>
                              {initials(e.nom)}
                            </div>
                            <span className="font-medium text-gray-900 whitespace-nowrap">{e.nom}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 min-w-[140px]"><ScoreBar note={e.note} /></td>
                        <td className="px-4 py-3 text-xs text-gray-600">{e.points}</td>
                        <td className="px-4 py-3 text-xs text-gray-600">{e.obj}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Conges */}
        {tab === 4 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-base font-semibold text-gray-800 mb-3">Soldes de congés (permanents)</h2>
              <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr style={{ backgroundColor: "#F8FBF8" }}>
                        {["Employé", "Droits acquis", "Jours pris", "Solde", "Prochain congé prévu"].map((h) => (
                          <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 whitespace-nowrap">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {conges.map((c) => (
                        <tr key={c.nom} className={`hover:bg-gray-50 transition ${c.alert ? "bg-amber-50" : ""}`}>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                                style={{ backgroundColor: "#2E7D32" }}>
                                {initials(c.nom)}
                              </div>
                              <span className="font-medium text-gray-900 whitespace-nowrap">{c.nom}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-gray-700">{c.acquis} j</td>
                          <td className="px-4 py-3 text-gray-700">{c.pris} j</td>
                          <td className="px-4 py-3 font-bold" style={{ color: c.solde >= 25 ? "#D97706" : "#2E7D32" }}>
                            {c.solde} j restants
                          </td>
                          <td className="px-4 py-3 text-xs text-gray-500">
                            {c.alert ? <span className="text-amber-600 font-medium">âš ï¸ {c.prochain}</span> : c.prochain}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <h2 className="text-base font-semibold text-gray-800 mb-4">Calendrier des absences -" Juillet-"Août 2025</h2>
              <div className="overflow-x-auto">
                <div style={{ minWidth: 680 }}>
                  <PlanningChart />
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
