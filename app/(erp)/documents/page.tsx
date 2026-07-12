"use client";

import { useState } from "react";
import Topbar from "../../components/Topbar";
import {
  Upload,
  Search,
  FileText,
  AlertTriangle,
  Clock,
  CheckCircle2,
  Eye,
  Download,
  PenLine,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type DocStatus = "archived" | "pending_payment" | "active" | "valid" | "definitive";
type SignStatus = "validated" | "signed" | "parties" | "bureau_veritas" | "cnra" | "mclu" | "anader" | "bv";

interface RecentDoc {
  id: number;
  name: string;
  category: string;
  size: string;
  updated: string;
  signedBy: string;
  signedOk: boolean;
  status: DocStatus;
  statusLabel: string;
  statusColor: string;
}

interface ExpiryCard {
  id: number;
  title: string;
  expires: string;
  daysLeft: number;
  action: string;
  level: "red" | "yellow";
}

interface DonutSlice {
  label: string;
  count: number;
  pct: number;
  color: string;
}

interface PendingSignature {
  id: number;
  document: string;
  requestedBy: string;
  signatory: string;
  since: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const FILTER_TABS = ["Tous", "Certifications", "Contrats", "Financiers", "Techniques", "RH", "Légaux"];

const RECENT_DOCS: RecentDoc[] = [
  {
    id: 1,
    name: "BUL-2025-07-002_Ibrahim_Sawadogo.pdf",
    category: "RH — Paie",
    size: "124 KB",
    updated: "11/07/2025",
    signedBy: "Validé CF + DG",
    signedOk: true,
    status: "archived",
    statusLabel: "Archivé",
    statusColor: "bg-green-100 text-green-700",
  },
  {
    id: 2,
    name: "FAC-2025-009_BarryCallebaut.pdf",
    category: "Finance",
    size: "86 KB",
    updated: "11/07/2025",
    signedBy: "Signé",
    signedOk: true,
    status: "pending_payment",
    statusLabel: "En attente règlement",
    statusColor: "bg-blue-100 text-blue-700",
  },
  {
    id: 3,
    name: "CTR-2025-001_BarryCal_contrat_cadre.pdf",
    category: "Contrats",
    size: "248 KB",
    updated: "08/01/2025",
    signedBy: "Parties",
    signedOk: true,
    status: "active",
    statusLabel: "Actif",
    statusColor: "bg-[#E8F5E9] text-[#2E7D32]",
  },
  {
    id: 4,
    name: "RA-CI-2025-EFA001_certificat.pdf",
    category: "Certifications",
    size: "534 KB",
    updated: "01/03/2025",
    signedBy: "Bureau Veritas",
    signedOk: true,
    status: "valid",
    statusLabel: "Valide",
    statusColor: "bg-[#E8F5E9] text-[#2E7D32]",
  },
  {
    id: 5,
    name: "CNRA-NW-2025-0042_tracabilite.pdf",
    category: "Certifications",
    size: "312 KB",
    updated: "15/01/2025",
    signedBy: "CNRA",
    signedOk: true,
    status: "valid",
    statusLabel: "Valide",
    statusColor: "bg-[#E8F5E9] text-[#2E7D32]",
  },
  {
    id: 6,
    name: "TF-SOUBRÉ-0042-2019.pdf",
    category: "Légaux — Foncier",
    size: "1,2 MB",
    updated: "22/08/2019",
    signedBy: "MCLU CI",
    signedOk: true,
    status: "definitive",
    statusLabel: "Définitif",
    statusColor: "bg-gray-100 text-gray-600",
  },
  {
    id: 7,
    name: "FORM-2025-003_attestations.zip",
    category: "RH — Formations",
    size: "2,1 MB",
    updated: "10/01/2025",
    signedBy: "ANADER",
    signedOk: true,
    status: "archived",
    statusLabel: "Archivé",
    statusColor: "bg-green-100 text-green-700",
  },
  {
    id: 8,
    name: "AUD-2025-001_rapport_RA_BV.pdf",
    category: "Certifications",
    size: "1,8 MB",
    updated: "25/02/2025",
    signedBy: "BV CI",
    signedOk: true,
    status: "archived",
    statusLabel: "Archivé",
    statusColor: "bg-green-100 text-green-700",
  },
];

const EXPIRY_CARDS: ExpiryCard[] = [
  {
    id: 1,
    title: "Assurance NSIA-MPR-CI-2025",
    expires: "31/12/2025",
    daysLeft: 173,
    action: "Renouveler avant décembre",
    level: "red",
  },
  {
    id: 2,
    title: "CTR-2025-001 (Barry Callebaut)",
    expires: "31/12/2025",
    daysLeft: 173,
    action: "Négocier renouvellement",
    level: "yellow",
  },
  {
    id: 3,
    title: "Agrément phyto SCPA Afrique",
    expires: "31/12/2026",
    daysLeft: 537,
    action: "À surveiller",
    level: "yellow",
  },
];

const DONUT_SLICES: DonutSlice[] = [
  { label: "Certifications", count: 12, pct: 25.5, color: "#1B5E20" },
  { label: "Finance & Comptabilité", count: 11, pct: 23.4, color: "#2E7D32" },
  { label: "Contrats", count: 8, pct: 17.0, color: "#E65100" },
  { label: "RH & Paie", count: 7, pct: 14.9, color: "#00897B" },
  { label: "Légaux & Foncier", count: 5, pct: 10.6, color: "#78909C" },
  { label: "Techniques", count: 4, pct: 8.5, color: "#9CCC65" },
];

const PENDING_SIGNATURES: PendingSignature[] = [
  { id: 1, document: "Avenant CTR-2025-001 — clauses EUDR", requestedBy: "Koffi Amani (DG)", signatory: "Barry Callebaut CI", since: "08/07/2025" },
  { id: 2, document: "DEV-2025-003 — devis OLAM signé", requestedBy: "Adjoua Messou", signatory: "OLAM Cocoa CI", since: "10/07/2025" },
  { id: 3, document: "BUL-2025-06 ×2 — bulletins juin", requestedBy: "Adjoua Messou", signatory: "Salariés (2)", since: "30/06/2025" },
  { id: 4, document: "PV-AG-2025-001 — PV assemblée générale", requestedBy: "Koffi Amani (DG)", signatory: "Associés (3)", since: "05/07/2025" },
  { id: 5, document: "CTR-FACONNAGE-2025-PAR-B1", requestedBy: "Ibrahim Sawadogo", signatory: "Prestataire façonnage", since: "09/07/2025" },
  { id: 6, document: "AUT-PHYTO-2025-003 — autorisation traitement", requestedBy: "Konan Yves", signatory: "MINADER CI", since: "07/07/2025" },
  { id: 7, document: "BL-LOT-047-EXPORT — bon de livraison", requestedBy: "Adjoua Messou", signatory: "Barry Callebaut CI", since: "11/07/2025" },
  { id: 8, document: "FORM-2025-Q3-ANADER — plan formation", requestedBy: "RH AGRIFRIK", signatory: "ANADER Soubré", since: "04/07/2025" },
];

// ─── SVG Donut ────────────────────────────────────────────────────────────────

function DonutChart() {
  const size = 260;
  const cx = size / 2;
  const cy = size / 2;
  const r = 90;
  const strokeW = 36;
  const circumference = 2 * Math.PI * r;
  const total = DONUT_SLICES.reduce((s, d) => s + d.pct, 0);

  let cumulativePct = 0;

  const slices = DONUT_SLICES.map((slice) => {
    const dashArray = (slice.pct / total) * circumference;
    const dashOffset = circumference - (cumulativePct / total) * circumference;
    cumulativePct += slice.pct;
    return { ...slice, dashArray, dashOffset };
  });

  return (
    <div className="flex items-center gap-6">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="flex-shrink-0">
        {/* Track */}
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#F3F4F6" strokeWidth={strokeW} />
        {/* Slices */}
        {slices.map((s, i) => (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke={s.color}
            strokeWidth={strokeW}
            strokeDasharray={`${s.dashArray} ${circumference - s.dashArray}`}
            strokeDashoffset={s.dashOffset}
            strokeLinecap="butt"
            transform={`rotate(-90 ${cx} ${cy})`}
          />
        ))}
        {/* Centre label */}
        <text x={cx} y={cy - 8} textAnchor="middle" className="text-lg font-bold" fill="#1F2937" fontSize="22" fontWeight="700">47</text>
        <text x={cx} y={cy + 12} textAnchor="middle" fill="#6B7280" fontSize="10">documents</text>
      </svg>

      {/* Legend */}
      <div className="flex flex-col gap-2">
        {DONUT_SLICES.map((s) => (
          <div key={s.label} className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-sm flex-shrink-0" style={{ backgroundColor: s.color }} />
            <span className="text-xs text-gray-700">{s.label}</span>
            <span className="ml-auto text-xs font-semibold text-gray-600 pl-4">{s.count}</span>
            <span className="text-[10px] text-gray-400 w-10 text-right">{s.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── KPI card ─────────────────────────────────────────────────────────────────

function KpiCard({ value, label, sub, color }: { value: string | number; label: string; sub: string; color: string }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-4">
      <div className={`text-2xl font-bold ${color}`}>{value}</div>
      <div className="text-xs font-semibold text-gray-700 mt-0.5">{label}</div>
      <div className="text-[10px] text-gray-400 mt-0.5">{sub}</div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DocumentsPage() {
  const [activeFilter, setActiveFilter] = useState("Tous");
  const [search, setSearch] = useState("");

  const filteredDocs = RECENT_DOCS.filter((d) => {
    const matchSearch = search === "" || d.name.toLowerCase().includes(search.toLowerCase());
    const matchFilter =
      activeFilter === "Tous" ||
      (activeFilter === "Certifications" && d.category.includes("Certif")) ||
      (activeFilter === "Contrats" && d.category.includes("Contrat")) ||
      (activeFilter === "Financiers" && d.category.includes("Finance")) ||
      (activeFilter === "RH" && d.category.includes("RH")) ||
      (activeFilter === "Légaux" && d.category.includes("Légaux"));
    return matchSearch && matchFilter;
  });

  return (
    <div className="flex flex-col h-full">
      <Topbar breadcrumb={["Collaboration", "Documents"]} />
      <div className="flex-1 overflow-auto p-6 bg-[#F4F6F4]">

        {/* Header */}
        <div className="flex items-start justify-between mb-6 gap-4">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Documents</h1>
            <p className="text-sm text-gray-500 mt-0.5">Gestion électronique des documents — EXP-001</p>
          </div>
          <button className="flex items-center gap-2 px-3 py-2 text-xs bg-[#2E7D32] text-white rounded-xl hover:bg-[#1B5E20] transition-colors font-medium flex-shrink-0">
            <Upload size={13} />Déposer un document
          </button>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <KpiCard value={47} label="Documents" sub="Base documentaire totale" color="text-gray-900" />
          <KpiCard value={6} label="Catégories" sub="Classement actif" color="text-[#2E7D32]" />
          <KpiCard value={8} label="En attente de signature" sub="Flux de validation" color="text-amber-600" />
          <KpiCard value={3} label="Expirent dans 30j" sub="À renouveler" color="text-red-600" />
        </div>

        {/* Search + filters */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-2 w-64">
            <Search size={13} className="text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher un document..."
              className="text-xs flex-1 outline-none bg-transparent text-gray-700"
            />
          </div>
          <div className="flex gap-1 bg-white border border-gray-100 rounded-2xl p-1">
            {FILTER_TABS.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  activeFilter === f ? "bg-[#2E7D32] text-white" : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Recent docs table */}
        <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden mb-6">
          <div className="px-5 py-3 border-b border-gray-100 bg-[#F8FBF8]">
            <h2 className="text-sm font-semibold text-gray-800">Documents récents</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-gray-100">
                  {["Nom du document", "Catégorie", "Taille", "Mis à jour", "Signature / Visa", "Statut", "Actions"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left font-semibold text-gray-500">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredDocs.map((doc) => (
                  <tr key={doc.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-red-50 flex items-center justify-center flex-shrink-0">
                          <FileText size={14} className="text-red-400" />
                        </div>
                        <span className="font-medium text-gray-800 max-w-[220px] truncate">{doc.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#E8F5E9] text-[#2E7D32]">{doc.category}</span>
                    </td>
                    <td className="px-4 py-3 text-gray-500">{doc.size}</td>
                    <td className="px-4 py-3 text-gray-500">{doc.updated}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <CheckCircle2 size={11} className="text-green-500 flex-shrink-0" />
                        <span className="text-gray-600">{doc.signedBy}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${doc.statusColor}`}>{doc.statusLabel}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button className="p-1.5 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors" title="Voir">
                          <Eye size={11} />
                        </button>
                        <button className="p-1.5 rounded-lg bg-[#E8F5E9] text-[#2E7D32] hover:bg-[#C8E6C9] transition-colors" title="Télécharger">
                          <Download size={11} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Expiry alerts */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-gray-800 mb-3">Documents expirant bientôt</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {EXPIRY_CARDS.map((card) => (
              <div
                key={card.id}
                className={`rounded-2xl border p-4 ${
                  card.level === "red"
                    ? "bg-red-50 border-red-200"
                    : "bg-amber-50 border-amber-200"
                }`}
              >
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle
                    size={14}
                    className={`flex-shrink-0 mt-0.5 ${card.level === "red" ? "text-red-500" : "text-amber-500"}`}
                  />
                  <p className={`text-xs font-semibold ${card.level === "red" ? "text-red-800" : "text-amber-800"}`}>
                    {card.title}
                  </p>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <Clock size={11} className="text-gray-400" />
                  <span className="text-[10px] text-gray-600">Expire le {card.expires}</span>
                  <span className={`ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                    card.level === "red" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"
                  }`}>
                    J-{card.daysLeft}
                  </span>
                </div>
                <p className={`text-[10px] ${card.level === "red" ? "text-red-600" : "text-amber-600"}`}>
                  → {card.action}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom 2-col: donut + signature flow */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Donut chart */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5">
            <h2 className="text-sm font-semibold text-gray-800 mb-4">Répartition des documents par catégorie</h2>
            <DonutChart />
          </div>

          {/* Signature flow */}
          <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden">
            <div className="px-5 py-3 border-b border-gray-100 bg-[#F8FBF8] flex items-center justify-between">
              <h2 className="text-sm font-semibold text-gray-800">Flux de signature</h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-700">
                {PENDING_SIGNATURES.length} en attente
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-gray-100">
                    {["Document", "Demandé par", "Signataire", "Depuis"].map((h) => (
                      <th key={h} className="px-4 py-2.5 text-left font-semibold text-gray-500">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {PENDING_SIGNATURES.map((ps) => (
                    <tr key={ps.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-2.5">
                        <div className="flex items-center gap-1.5">
                          <PenLine size={11} className="text-amber-500 flex-shrink-0" />
                          <span className="font-medium text-gray-800 max-w-[180px] truncate">{ps.document}</span>
                        </div>
                      </td>
                      <td className="px-4 py-2.5 text-gray-600">{ps.requestedBy}</td>
                      <td className="px-4 py-2.5">
                        <span className="px-1.5 py-0.5 rounded text-[10px] bg-blue-50 text-blue-600 font-medium">{ps.signatory}</span>
                      </td>
                      <td className="px-4 py-2.5 text-gray-500">{ps.since}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
