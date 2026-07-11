"use client";

import { useState } from "react";
import Topbar from "../../components/Topbar";
import {
  Ship,
  Globe,
  FileText,
  TrendingUp,
  CheckCircle,
  Clock,
  AlertTriangle,
  Eye,
  Award,
  Package,
  BarChart2,
} from "lucide-react";

// ── KPIs ────────────────────────────────────────────────────────────────────
const kpis = [
  { label: "Volume exporté YTD", value: "68,4 t",      sub: "3 conteneurs actifs",    icon: Ship,       color: "#2E7D32", bg: "#E8F5E9" },
  { label: "CA Export YTD",      value: "94,8 M XOF",  sub: "+18% vs N-1",            icon: TrendingUp,  color: "#1B5E20", bg: "#E8F5E9" },
  { label: "Conteneurs actifs",  value: "3",            sub: "En transit",              icon: Package,     color: "#1565C0", bg: "#E3F2FD" },
  { label: "Marchés",            value: "8 pays",       sub: "Destination",             icon: Globe,       color: "#6A1B9A", bg: "#F3E5F5" },
  { label: "Certification export", value: "100%",       sub: "Rainforest Alliance",     icon: Award,       color: "#E65100", bg: "#FFF3E0" },
];

// ── Types ────────────────────────────────────────────────────────────────────
type EtapeStatut = "done" | "active" | "pending";

interface Etape {
  date: string;
  label: string;
  detail: string;
  statut: EtapeStatut;
}

interface Conteneur {
  id: string;
  acheteur: string;
  flag: string;
  produit: string;
  quantite: string;
  prixFOB: string;
  valeur: string;
  portDepart: string;
  portArrivee: string;
  navire: string;
  bl: string;
  incoterm: string;
  statutLabel: string;
  statutColor: string;
  statutBg: string;
  etapes: Etape[];
}

// ── Données conteneurs ────────────────────────────────────────────────────────
const conteneurs: Conteneur[] = [
  {
    id: "EXP-2025-041",
    acheteur: "Barry Callebaut France",
    flag: "🇫🇷",
    produit: "Cacao Grade AA certifié RA",
    quantite: "18 420 kg (18,42 t)",
    prixFOB: "1 120 XOF/kg",
    valeur: "20,63 M XOF",
    portDepart: "Abidjan (Terminal à Conteneurs)",
    portArrivee: "Le Havre",
    navire: "MSC Allegria",
    bl: "MSCABJ2025041",
    incoterm: "FOB Abidjan",
    statutLabel: "En transit",
    statutColor: "#1565C0",
    statutBg: "#E3F2FD",
    etapes: [
      { date: "01/07", label: "Contrôle qualité final", detail: "98/100 — Grade AA", statut: "done" },
      { date: "03/07", label: "Documents phytosanitaires", detail: "MINADER — obtenus", statut: "done" },
      { date: "05/07", label: "Déclaration douanière CI", detail: "DAE-2025-0847 validée", statut: "done" },
      { date: "07/07", label: "Chargement conteneur", detail: "ABIDJAN PORT — Quai 12", statut: "done" },
      { date: "08/07", label: "Départ navire MSC Allegria", detail: "Confirmé", statut: "done" },
      { date: "22/07", label: "Arrivée estimée Le Havre", detail: "ETA", statut: "active" },
      { date: "24/07", label: "Livraison entrepôt Barry Callebaut", detail: "Meudon", statut: "pending" },
    ],
  },
  {
    id: "EXP-2025-039",
    acheteur: "Olam International",
    flag: "🇸🇬",
    produit: "Cacao Grade A",
    quantite: "14 180 kg (14,18 t)",
    prixFOB: "1 085 XOF/kg",
    valeur: "15,38 M XOF",
    portDepart: "Abidjan",
    portArrivee: "Singapour",
    navire: "Maersk Evora",
    bl: "MAEBJ2025039",
    incoterm: "FOB Abidjan",
    statutLabel: "En mer",
    statutColor: "#E65100",
    statutBg: "#FFF3E0",
    etapes: [
      { date: "20/06", label: "Documents", detail: "Complets", statut: "done" },
      { date: "22/06", label: "Dédouanement CI", detail: "DAE-2025-0812 validée", statut: "done" },
      { date: "25/06", label: "Chargement", detail: "Abidjan PAA", statut: "done" },
      { date: "26/06", label: "Départ navire", detail: "Maersk Evora", statut: "done" },
      { date: "18/07", label: "Arrivée Singapour", detail: "En transit Océan Indien", statut: "active" },
    ],
  },
  {
    id: "EXP-2025-036",
    acheteur: "Ritter Sport",
    flag: "🇩🇪",
    produit: "Anacarde WW240 certifié",
    quantite: "8 820 kg (8,82 t)",
    prixFOB: "760 XOF/kg",
    valeur: "6,70 M XOF",
    portDepart: "Abidjan",
    portArrivee: "Hambourg",
    navire: "CMA CGM Marseille",
    bl: "CMABJ2025036",
    incoterm: "FOB Abidjan",
    statutLabel: "Dédouanement DE",
    statutColor: "#6A1B9A",
    statutBg: "#F3E5F5",
    etapes: [
      { date: "18/06", label: "Documents", detail: "Complets", statut: "done" },
      { date: "18/06", label: "Dédouanement CI", detail: "DAE-2025-0788 validée", statut: "done" },
      { date: "20/06", label: "Chargement", detail: "Abidjan PAA", statut: "done" },
      { date: "21/06", label: "Départ navire", detail: "CMA CGM Marseille", statut: "done" },
      { date: "10/07", label: "Arrivée Hambourg", detail: "Confirmée", statut: "done" },
      { date: "11/07", label: "Dédouanement allemand", detail: "En cours", statut: "active" },
    ],
  },
];

// ── Documents phytosanitaires ────────────────────────────────────────────────
const docsPhyto = [
  { num: "PHYTO-2025-0384", lot: "LOT-048", produit: "Cacao Grade AA", date: "03/07/2025", validite: "60 jours", organisme: "MINADER CI" },
  { num: "PHYTO-2025-0367", lot: "LOT-045", produit: "Anacarde WW240", date: "28/06/2025", validite: "60 jours", organisme: "MINADER CI" },
  { num: "PHYTO-2025-0341", lot: "LOT-040", produit: "Cacao Grade A",  date: "21/06/2025", validite: "60 jours", organisme: "MINADER CI" },
];

// ── Certificats qualité ──────────────────────────────────────────────────────
const certifs = [
  { doc: "Certificat RA Export C-2025-1847",            emetteur: "Rainforest Alliance", validite: "28/02/2026" },
  { doc: "Certificat phytosanitaire EU (Règl. 2019/2072)", emetteur: "MINADER",          validite: "Par lot" },
  { doc: "Certificat d'origine CEDEAO",                  emetteur: "Chambre de Commerce CI", validite: "Par expédition" },
];

// ── Déclarations en douane ───────────────────────────────────────────────────
const daes = [
  { num: "DAE-2025-0847", exp: "EXP-2025-041", regime: "1000 (Export définitif)", valeur: "20,63 M", date: "05/07/2025" },
  { num: "DAE-2025-0812", exp: "EXP-2025-039", regime: "1000 (Export définitif)", valeur: "15,38 M", date: "22/06/2025" },
  { num: "DAE-2025-0788", exp: "EXP-2025-036", regime: "1000 (Export définitif)", valeur: "6,70 M",  date: "18/06/2025" },
];

// ── Marchés ──────────────────────────────────────────────────────────────────
const marches = [
  { flag: "🇫🇷", pays: "France",       produit: "Cacao Grade AA",  volume: "28,4 t", ca: "31,8 M", part: 33.5, croissance: "+22%", trend: "up",  regle: "EU Reg. 2023/1115 (déforestation)" },
  { flag: "🇸🇬", pays: "Singapour",    produit: "Cacao Grade A",   volume: "14,2 t", ca: "15,4 M", part: 16.2, croissance: "+8%",  trend: "up",  regle: "SFA Import Permit" },
  { flag: "🇨🇮", pays: "Côte d'Ivoire (local)", produit: "Tous produits", volume: "8,4 t", ca: "9,2 M", part: 9.7, croissance: "+4%", trend: "up", regle: "Normes BCC" },
  { flag: "🇩🇪", pays: "Allemagne",    produit: "Anacarde WW240",  volume: "8,8 t",  ca: "6,7 M",  part: 7.1,  croissance: "+35%", trend: "up",  regle: "EU Food Law", nouveau: true },
  { flag: "🇸🇳", pays: "Sénégal",      produit: "Maïs, Riz",      volume: "4,8 t",  ca: "1,1 M",  part: 1.1,  croissance: "+15%", trend: "up",  regle: "Accord CEDEAO" },
  { flag: "🇳🇱", pays: "Pays-Bas",     produit: "Cacao Grade A",   volume: "2,4 t",  ca: "2,6 M",  part: 2.7,  croissance: "stable", trend: "flat", regle: "EU Reg. 2023/1115" },
  { flag: "🇬🇧", pays: "Royaume-Uni",  produit: "Anacarde WW240",  volume: "1,2 t",  ca: "0,9 M",  part: 0.9,  croissance: "+62%", trend: "up",  regle: "UK DETER Act", nouveau: true },
  { flag: "🇯🇵", pays: "Japon",        produit: "Cacao Grade AA bio", volume: "0,2 t", ca: "0,3 M", part: 0.3, croissance: "—",   trend: "new", regle: "JAS Organic", nouveau: true },
];

// ── Helpers ──────────────────────────────────────────────────────────────────
function EtapeIcon({ statut }: { statut: EtapeStatut }) {
  if (statut === "done")
    return (
      <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center" style={{ background: "#E8F5E9" }}>
        <CheckCircle size={12} style={{ color: "#2E7D32" }} />
      </span>
    );
  if (statut === "active")
    return (
      <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center" style={{ background: "#E3F2FD" }}>
        <Clock size={12} style={{ color: "#1565C0" }} />
      </span>
    );
  return (
    <span className="flex-shrink-0 w-5 h-5 rounded-full border-2 border-gray-200 bg-white" />
  );
}

function TrendBadge({ trend, val }: { trend: string; val: string }) {
  if (trend === "up")
    return <span className="text-xs font-semibold" style={{ color: "#2E7D32" }}>↑ {val}</span>;
  if (trend === "new")
    return <span className="text-xs font-semibold px-1.5 py-0.5 rounded-full" style={{ background: "#FFF3E0", color: "#E65100" }}>Nouveau</span>;
  return <span className="text-xs text-gray-400">→ stable</span>;
}

// ── Tabs ─────────────────────────────────────────────────────────────────────
const TABS = ["Expéditions en cours", "Historique", "Documents", "Marchés"] as const;
type Tab = (typeof TABS)[number];

export default function ExportationPage() {
  const [activeTab, setActiveTab] = useState<Tab>("Expéditions en cours");

  return (
    <div className="min-h-screen bg-gray-50">
      <Topbar title="Exportation" breadcrumb={["Commerce", "Exportation"]} />

      <div className="p-6 space-y-6">

        {/* ── KPIs ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-4">
          {kpis.map((kpi) => {
            const Icon = kpi.icon;
            return (
              <div key={kpi.label} className="rounded-2xl border border-gray-100 bg-white p-5 flex items-center gap-3 shadow-sm">
                <div className="rounded-xl p-2.5 flex-shrink-0" style={{ background: kpi.bg }}>
                  <Icon size={20} style={{ color: kpi.color }} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-gray-500 font-medium leading-tight truncate">{kpi.label}</p>
                  <p className="text-lg font-bold text-gray-800 mt-0.5 leading-tight">{kpi.value}</p>
                  <p className="text-xs text-gray-400 mt-0.5 leading-tight">{kpi.sub}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Onglets ── */}
        <div className="flex gap-1 border-b border-gray-200">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="px-4 py-2.5 text-sm font-medium transition-colors rounded-t-lg"
              style={
                activeTab === tab
                  ? { color: "#2E7D32", borderBottom: "2px solid #2E7D32", background: "white", marginBottom: "-1px" }
                  : { color: "#6B7280" }
              }
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ═══════════════════════════════════════════════════════════════════
            ONGLET : EXPÉDITIONS EN COURS
        ═══════════════════════════════════════════════════════════════════ */}
        {activeTab === "Expéditions en cours" && (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
            {conteneurs.map((c) => (
              <div key={c.id} className="rounded-2xl border border-gray-100 bg-white shadow-sm flex flex-col overflow-hidden">

                {/* En-tête */}
                <div className="px-5 py-4 border-b border-gray-50 flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm font-bold text-gray-800">{c.id}</span>
                      <span
                        className="text-xs font-semibold px-2 py-0.5 rounded-full"
                        style={{ background: c.statutBg, color: c.statutColor }}
                      >
                        {c.statutLabel}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">{c.flag} {c.acheteur}</p>
                  </div>
                  <span className="text-xs bg-gray-50 text-gray-600 px-2 py-1 rounded-lg font-medium whitespace-nowrap">{c.incoterm}</span>
                </div>

                {/* Infos produit */}
                <div className="px-5 py-3 bg-gray-50/60 grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs">
                  <div>
                    <span className="text-gray-400">Produit</span>
                    <p className="font-medium text-gray-700 mt-0.5">{c.produit}</p>
                  </div>
                  <div>
                    <span className="text-gray-400">Quantité</span>
                    <p className="font-medium text-gray-700 mt-0.5">{c.quantite}</p>
                  </div>
                  <div>
                    <span className="text-gray-400">Prix FOB</span>
                    <p className="font-medium text-gray-700 mt-0.5">{c.prixFOB}</p>
                  </div>
                  <div>
                    <span className="text-gray-400">Valeur totale</span>
                    <p className="font-bold mt-0.5" style={{ color: "#1B5E20" }}>{c.valeur}</p>
                  </div>
                </div>

                {/* Route */}
                <div className="px-5 py-3 flex items-center gap-2 text-xs border-b border-gray-50">
                  <div className="text-center">
                    <p className="font-semibold text-gray-700 leading-tight">{c.portDepart}</p>
                    <p className="text-gray-400 mt-0.5">Départ</p>
                  </div>
                  <div className="flex-1 flex items-center gap-1">
                    <div className="flex-1 border-t border-dashed border-gray-300" />
                    <Ship size={14} className="text-gray-400 flex-shrink-0" />
                    <div className="flex-1 border-t border-dashed border-gray-300" />
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-gray-700 leading-tight">{c.portArrivee}</p>
                    <p className="text-gray-400 mt-0.5">Arrivée</p>
                  </div>
                </div>

                {/* Détails navire */}
                <div className="px-5 py-2.5 flex items-center justify-between text-xs border-b border-gray-50">
                  <span className="text-gray-400">Navire : <span className="font-medium text-gray-600">{c.navire}</span></span>
                  <span className="text-gray-400">B/L : <span className="font-mono font-medium text-gray-600">{c.bl}</span></span>
                </div>

                {/* Timeline */}
                <div className="px-5 py-4 flex-1 space-y-2.5">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Progression</p>
                  {c.etapes.map((e, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <EtapeIcon statut={e.statut} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span
                            className="text-xs leading-tight"
                            style={{
                              color: e.statut === "done" ? "#374151" : e.statut === "active" ? "#1565C0" : "#9CA3AF",
                              fontWeight: e.statut === "active" ? 600 : 400,
                            }}
                          >
                            {e.label}
                          </span>
                          <span className="text-xs text-gray-400 whitespace-nowrap">{e.date}</span>
                        </div>
                        {e.detail && (
                          <p className="text-xs text-gray-400 mt-0.5 leading-tight">{e.detail}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════════
            ONGLET : HISTORIQUE
        ═══════════════════════════════════════════════════════════════════ */}
        {activeTab === "Historique" && (
          <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
              <BarChart2 size={16} className="text-gray-400" />
              <h2 className="text-base font-semibold text-gray-800">Historique des expéditions</h2>
            </div>
            <div className="p-8 text-center text-gray-400">
              <Ship size={40} className="mx-auto mb-3 opacity-30" />
              <p className="text-sm font-medium text-gray-500">Historique disponible prochainement</p>
              <p className="text-xs text-gray-400 mt-1">Les expéditions clôturées apparaîtront ici</p>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════════
            ONGLET : DOCUMENTS
        ═══════════════════════════════════════════════════════════════════ */}
        {activeTab === "Documents" && (
          <div className="space-y-5">

            {/* Documents phytosanitaires */}
            <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
                <FileText size={16} className="text-gray-400" />
                <h2 className="text-sm font-semibold text-gray-800">Documents phytosanitaires (MINADER)</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#F8FBF8]">
                      {["N° Document", "Lot", "Produit", "Date délivrance", "Validité", "Organisme", "Statut"].map((col) => (
                        <th key={col} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 whitespace-nowrap">{col}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {docsPhyto.map((d, i) => (
                      <tr key={i} className="border-t border-gray-50 hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 font-mono text-xs font-medium text-gray-700 whitespace-nowrap">{d.num}</td>
                        <td className="px-4 py-3 text-xs text-gray-600 whitespace-nowrap">{d.lot}</td>
                        <td className="px-4 py-3 text-xs text-gray-700 font-medium whitespace-nowrap">{d.produit}</td>
                        <td className="px-4 py-3 text-xs text-gray-600 whitespace-nowrap">{d.date}</td>
                        <td className="px-4 py-3 text-xs text-gray-600 whitespace-nowrap">{d.validite}</td>
                        <td className="px-4 py-3 text-xs text-gray-600 whitespace-nowrap">{d.organisme}</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium" style={{ background: "#E8F5E9", color: "#1B5E20" }}>
                            <CheckCircle size={11} /> Valide
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Certificats qualité */}
            <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
                <Award size={16} className="text-gray-400" />
                <h2 className="text-sm font-semibold text-gray-800">Certificats qualité</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#F8FBF8]">
                      {["Document", "Émetteur", "Validité", "Action"].map((col) => (
                        <th key={col} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 whitespace-nowrap">{col}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {certifs.map((c, i) => (
                      <tr key={i} className="border-t border-gray-50 hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 text-xs font-medium text-gray-800">{c.doc}</td>
                        <td className="px-4 py-3 text-xs text-gray-600 whitespace-nowrap">{c.emetteur}</td>
                        <td className="px-4 py-3 text-xs text-gray-600 whitespace-nowrap">{c.validite}</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <button className="flex items-center gap-1 text-xs border border-gray-200 text-gray-600 rounded-lg px-2.5 py-1 hover:bg-gray-50">
                            <Eye size={11} /> Voir
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Déclarations en douane */}
            <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
                <FileText size={16} className="text-gray-400" />
                <h2 className="text-sm font-semibold text-gray-800">Déclarations en douane</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#F8FBF8]">
                      {["N° DAE", "Expédition", "Régime douanier", "Valeur FOB", "Date", "Statut"].map((col) => (
                        <th key={col} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 whitespace-nowrap">{col}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {daes.map((d, i) => (
                      <tr key={i} className="border-t border-gray-50 hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 font-mono text-xs font-medium text-gray-700 whitespace-nowrap">{d.num}</td>
                        <td className="px-4 py-3 text-xs text-gray-600 whitespace-nowrap">{d.exp}</td>
                        <td className="px-4 py-3 text-xs text-gray-600 whitespace-nowrap">{d.regime}</td>
                        <td className="px-4 py-3 text-xs font-semibold text-gray-700 whitespace-nowrap">{d.valeur} XOF</td>
                        <td className="px-4 py-3 text-xs text-gray-600 whitespace-nowrap">{d.date}</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium" style={{ background: "#E8F5E9", color: "#1B5E20" }}>
                            <CheckCircle size={11} /> Validée
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════════
            ONGLET : MARCHÉS
        ═══════════════════════════════════════════════════════════════════ */}
        {activeTab === "Marchés" && (
          <div className="space-y-5">

            {/* Tableau marchés */}
            <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
                <Globe size={16} className="text-gray-400" />
                <h2 className="text-sm font-semibold text-gray-800">Marchés de destination — 8 pays</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#F8FBF8]">
                      {["Pays", "Produit principal", "Volume YTD", "CA YTD", "Part %", "Croissance", "Réglementations"].map((col) => (
                        <th key={col} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 whitespace-nowrap">{col}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {marches.map((m, i) => (
                      <tr key={i} className="border-t border-gray-50 hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <span className="text-base leading-none">{m.flag}</span>
                            <span className="font-medium text-gray-800 text-xs">{m.pays}</span>
                            {m.nouveau && (
                              <span className="text-xs px-1.5 py-0.5 rounded-full font-semibold" style={{ background: "#FFF3E0", color: "#E65100" }}>Nouveau</span>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-xs text-gray-600 whitespace-nowrap">{m.produit}</td>
                        <td className="px-4 py-3 text-xs font-semibold text-gray-700 whitespace-nowrap">{m.volume}</td>
                        <td className="px-4 py-3 text-xs font-semibold text-gray-700 whitespace-nowrap">{m.ca} XOF</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-1.5 rounded-full bg-gray-100 overflow-hidden">
                              <div className="h-1.5 rounded-full" style={{ width: `${Math.min(m.part * 2.5, 100)}%`, background: "#2E7D32" }} />
                            </div>
                            <span className="text-xs text-gray-500">{m.part}%</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <TrendBadge trend={m.trend} val={m.croissance} />
                        </td>
                        <td className="px-4 py-3 text-xs text-gray-500">{m.regle}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Alertes réglementaires */}
            <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
                <AlertTriangle size={16} className="text-gray-400" />
                <h2 className="text-sm font-semibold text-gray-800">Alertes réglementaires</h2>
              </div>
              <div className="p-5 space-y-3">

                <div className="flex items-start gap-3 rounded-xl p-4" style={{ background: "#E8F5E9", border: "1px solid #C8E6C9" }}>
                  <span className="text-base flex-shrink-0 mt-0.5">🔴</span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold" style={{ color: "#1B5E20" }}>
                      Règlement UE 2023/1115 (déforestation)
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: "#2E7D32" }}>
                      En vigueur depuis décembre 2024
                    </p>
                    <p className="text-xs text-gray-600 mt-1.5">
                      ✅ AGRIFRIK conforme — cartographie GPS de toutes les parcelles disponible.
                      Tracabilité complète garantie pour les marchés UE (France, Allemagne, Pays-Bas).
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-xl p-4" style={{ background: "#FFF8E1", border: "1px solid #FFE082" }}>
                  <span className="text-base flex-shrink-0 mt-0.5">🟡</span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold" style={{ color: "#E65100" }}>
                      UK DETER Act (due diligence forestière)
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: "#BF360C" }}>
                      En vigueur janvier 2026 — Délai : préparer avant octobre 2025
                    </p>
                    <p className="text-xs text-gray-600 mt-1.5">
                      ⚠️ Préparer le dossier de due diligence forestière pour le marché Royaume-Uni (Anacarde WW240 — +62% YTD).
                      Contacter la Chambre de Commerce pour les documents requis.
                    </p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
