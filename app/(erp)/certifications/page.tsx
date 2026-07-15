"use client";

import { useState } from "react";
import Topbar from "../../components/Topbar";
import {
  Award,
  CheckCircle,
  Clock,
  AlertTriangle,
  Calendar,
  FileText,
  ClipboardList,
  ChevronRight,
  Leaf,
  Globe,
  Shield,
  Package,
} from "lucide-react";

const TABS = ["Certifications actives", "Audits", "Exigences", "Historique"] as const;
type Tab = (typeof TABS)[number];

function KpiCard({
  icon,
  label,
  value,
  sub,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub?: string;
  accent?: string;
}) {
  return (
    <div className="rounded-2xl bg-white border border-gray-100 p-5 flex items-center gap-4">
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${accent ?? "bg-green-50"}`}>
        {icon}
      </div>
      <div>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
        <p className="text-xs font-medium text-gray-500">{label}</p>
        {sub && <p className="text-[11px] text-gray-400 mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}

function Badge({
  children,
  color,
}: {
  children: React.ReactNode;
  color: "green" | "blue" | "yellow" | "gray" | "red";
}) {
  const styles: Record<string, string> = {
    green: "bg-green-100 text-green-700",
    blue: "bg-blue-100 text-blue-700",
    yellow: "bg-yellow-100 text-yellow-700",
    gray: "bg-gray-100 text-gray-500",
    red: "bg-red-100 text-red-600",
  };
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${styles[color]}`}>
      {children}
    </span>
  );
}

// ─── Certification cards data ───────────────────────────────────────────────

const CERTS = [
  {
    icon: <Leaf size={18} className="text-green-700" />,
    bg: "bg-green-50",
    title: "Rainforest Alliance (RA)",
    tag: "Principale",
    tagColor: "green" as const,
    numero: "C-CI-2025-1847",
    emetteur: "Rainforest Alliance (NYC)",
    perimetre: "8 parcelles (PAR-A1, A2, A3, B1, B2, C1, C2, D2) — 36,4 ha",
    dates: [
      { label: "Émis le", val: "01/03/2025" },
      { label: "Valide jusqu'au", val: "28/02/2026", ok: true },
    ],
    produits: "Cacao Grade AA, Cacao Grade A, Anacarde WW240",
    inspection: "15/09/2025",
    info: "+120-180 XOF/kg sur marché premium",
    statut: "Actif",
  },
  {
    icon: <Globe size={18} className="text-blue-700" />,
    bg: "bg-blue-50",
    title: "GlobalG.A.P.",
    tag: "Bonnes pratiques agricoles",
    tagColor: "blue" as const,
    numero: "GGN 4049928123456",
    emetteur: "Bureau Véritas CI",
    perimetre: "4 parcelles (PAR-A1, A2, A3, B1) — 20,2 ha",
    dates: [
      { label: "Valide jusqu'au", val: "31/05/2026", ok: true },
    ],
    produits: "CPCC (Cacao)",
    inspection: "15/10/2025",
    info: null,
    statut: "Actif",
  },
  {
    icon: <Shield size={18} className="text-purple-700" />,
    bg: "bg-purple-50",
    title: "ISO 9001:2015",
    tag: "Management qualité",
    tagColor: "gray" as const,
    numero: null,
    emetteur: "ABS Quality Evaluations CI",
    perimetre: "Siège + terrain",
    dates: [
      { label: "Audit certification", val: "Jan 2026", ok: false },
    ],
    produits: null,
    inspection: "Jan 2026",
    info: "Progression : 68% des exigences satisfaites",
    statut: "En cours",
    progress: 68,
  },
  {
    icon: <Leaf size={18} className="text-emerald-600" />,
    bg: "bg-emerald-50",
    title: "Agriculture Biologique (AB)",
    tag: "En conversion",
    tagColor: "yellow" as const,
    numero: null,
    emetteur: "Ecocert Afrique",
    perimetre: "PAR-A1, PAR-A3 (10,0 ha)",
    dates: [
      { label: "Dossier soumis", val: "Jan 2025" },
      { label: "Certification prévue", val: "Janv 2026" },
    ],
    produits: null,
    inspection: null,
    info: "Conversion 3 ans (2022-2025)",
    statut: "En cours",
  },
  {
    icon: <ClipboardList size={18} className="text-gray-600" />,
    bg: "bg-gray-50",
    title: "SYSCOHADA Révisé",
    tag: "Comptabilité",
    tagColor: "green" as const,
    numero: null,
    emetteur: "Cabinet FIDUCI CI",
    perimetre: "Siège social",
    dates: [
      { label: "Dernier audit", val: "Avr 2025" },
      { label: "Prochain audit", val: "Avr 2026", ok: true },
    ],
    produits: null,
    inspection: "Avr 2026",
    info: "Conformité déclarée",
    statut: "Actif",
  },
  {
    icon: <Package size={18} className="text-orange-600" />,
    bg: "bg-orange-50",
    title: "FSSC 22000",
    tag: "Sécurité alimentaire",
    tagColor: "gray" as const,
    numero: null,
    emetteur: "—",
    perimetre: "Unité de transformation",
    dates: [
      { label: "Formation équipe", val: "Oct 2025" },
    ],
    produits: null,
    inspection: null,
    info: "Préparation initiale",
    statut: "Préparation",
  },
  {
    icon: <Leaf size={18} className="text-green-400" />,
    bg: "bg-gray-50",
    title: "RSPO (Huile de Palme)",
    tag: "Non applicable",
    tagColor: "gray" as const,
    numero: null,
    emetteur: "—",
    perimetre: "—",
    dates: [],
    produits: null,
    inspection: null,
    info: "N/A — Pas de production d'huile de palme",
    statut: "N/A",
  },
  {
    icon: <Award size={18} className="text-pink-600" />,
    bg: "bg-pink-50",
    title: "Fairtrade / Max Havelaar",
    tag: "En étude",
    tagColor: "yellow" as const,
    numero: null,
    emetteur: "Fairtrade Africa",
    perimetre: "—",
    dates: [],
    produits: null,
    inspection: null,
    info: "En étude pour 2026 — Contacté Fairtrade Africa",
    statut: "Étude",
  },
];

// ─── Audit data ──────────────────────────────────────────────────────────────

const AUDITS_PLANIFIES = [
  { date: "01/08/2025", cert: "Rainforest Alliance", type: "Audit interne préparatoire", auditeur: "Ibrahim S. (formé)", perimetre: "8 parcelles", statut: "Planifié" },
  { date: "15/09/2025", cert: "Rainforest Alliance", type: "Audit externe annuel", auditeur: "Rainforest Alliance (auditeur TBD)", perimetre: "8 parcelles", statut: "Planifié" },
  { date: "15/10/2025", cert: "GlobalG.A.P.", type: "Surveillance annuelle", auditeur: "Bureau Véritas CI", perimetre: "4 parcelles", statut: "Planifié" },
  { date: "15/01/2026", cert: "ISO 9001", type: "Audit de certification", auditeur: "ABS Quality Evaluations", perimetre: "Siège + terrain", statut: "Planifié" },
];

const CHECKLIST_OK = [
  "Registre phytosanitaire à jour",
  "EPI disponibles et utilisés (photos terrain OK)",
  "Zones tampons délimitées (GPS + piquets)",
  "Pas d'usage de produits chimiques interdits RA (liste validée)",
  "Cartographie parcelles GPS (100% des 8 parcelles)",
  "Formation travailleurs (32 personnes — attestations disponibles)",
  "Salaires minimaux respectés (fiche paie disponible)",
  "Protection riverains (rivière Davo — zone tampon 10m)",
  "Toilettes / eau potable sur site ×3",
  "Gestion déchets (plan disponible)",
  "Pas d'enfants de moins de 15 ans sur site",
  "Registre accidents / incidents",
  "Plan de gestion agrochimiques",
  "Traçabilité lots (système AGRIFRIK)",
];

const CHECKLIST_WARN = [
  "Panneau d'affichage sécurité parcelles — à installer avant 01/09",
  "Registre riverains mis à jour (manque 2025)",
  "Analyse eau potable (date de validité dépassée — renouveler juil 2025)",
  "PAR-C1, PAR-C2 : cartographie biodiversité à compléter",
];

// ─── Exigences data ──────────────────────────────────────────────────────────

const EXIGENCES = [
  { chap: "1", titre: "Système de gestion", desc: "Planification, documentation", total: 18, ok: 17, pct: 94 },
  { chap: "2", titre: "Activités agricoles", desc: "Pratiques, sols, eau", total: 24, ok: 22, pct: 92 },
  { chap: "3", titre: "Social", desc: "Travail, conditions, équité", total: 20, ok: 19, pct: 95 },
  { chap: "4", titre: "Environnement", desc: "Biodiversité, déchets", total: 15, ok: 14, pct: 93 },
  { chap: "5", titre: "Chaîne de contrôle", desc: "Traçabilité, ségrégation", total: 8, ok: 8, pct: 100 },
];

// ─── Page ────────────────────────────────────────────────────────────────────

export default function CertificationsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("Certifications actives");

  return (
    <div className="min-h-screen bg-gray-50">
      <Topbar title="Certifications & Conformité" breadcrumb={["Commerce", "Certifications"]} />

      <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">

        {/* KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
          <KpiCard
            icon={<CheckCircle size={20} className="text-green-700" />}
            label="Certifications actives"
            value="8"
            accent="bg-green-50"
          />
          <KpiCard
            icon={<AlertTriangle size={20} className="text-orange-500" />}
            label="Expirant < 90 j"
            value="2"
            accent="bg-orange-50"
          />
          <KpiCard
            icon={<Calendar size={20} className="text-blue-600" />}
            label="Audits planifiés"
            value="3"
            accent="bg-blue-50"
          />
          <KpiCard
            icon={<Leaf size={20} className="text-emerald-600" />}
            label="Surfaces certifiées"
            value="62 ha"
            accent="bg-emerald-50"
          />
          <KpiCard
            icon={<Award size={20} className="text-[#2E7D32]" />}
            label="Score conformité"
            value="94,2%"
            sub="Rainforest Alliance — seuil 90%"
            accent="bg-green-50"
          />
        </div>

        {/* Tabs */}
        <div className="flex gap-1 p-1 bg-white border border-gray-100 rounded-xl w-fit flex-wrap">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab
                  ? "bg-[#2E7D32] text-white shadow-sm"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ── Tab: Certifications actives ──────────────────────────────── */}
        {activeTab === "Certifications actives" && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {CERTS.map((cert, i) => (
              <div key={i} className="rounded-2xl bg-white border border-gray-100 p-5 flex flex-col gap-3">
                {/* Header */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${cert.bg}`}>
                      {cert.icon}
                    </div>
                    <div>
                      <p className="font-bold text-gray-800 text-sm leading-tight">{cert.title}</p>
                      <Badge color={cert.tagColor}>{cert.tag}</Badge>
                    </div>
                  </div>
                  {cert.statut === "Actif" && (
                    <span className="flex-shrink-0 w-2.5 h-2.5 rounded-full bg-green-500 mt-1" title="Actif" />
                  )}
                  {cert.statut === "En cours" && (
                    <span className="flex-shrink-0 w-2.5 h-2.5 rounded-full bg-blue-400 mt-1" title="En cours" />
                  )}
                  {(cert.statut === "N/A" || cert.statut === "Étude" || cert.statut === "Préparation") && (
                    <span className="flex-shrink-0 w-2.5 h-2.5 rounded-full bg-gray-300 mt-1" />
                  )}
                </div>

                {/* Progress bar for in-progress certs */}
                {"progress" in cert && cert.progress != null && (
                  <div>
                    <div className="flex justify-between text-[11px] text-gray-500 mb-1">
                      <span>Progression</span>
                      <span className="font-semibold text-blue-600">{cert.progress}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-100 rounded-full">
                      <div
                        className="h-1.5 rounded-full bg-blue-500 transition-all"
                        style={{ width: `${cert.progress}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Details */}
                <div className="space-y-1.5 text-xs text-gray-600">
                  {cert.numero && (
                    <div className="flex gap-2">
                      <span className="text-gray-400 w-16 flex-shrink-0">N°</span>
                      <span className="font-mono text-gray-700 truncate">{cert.numero}</span>
                    </div>
                  )}
                  <div className="flex gap-2">
                    <span className="text-gray-400 w-16 flex-shrink-0">Organisme</span>
                    <span>{cert.emetteur}</span>
                  </div>
                  {cert.perimetre && cert.perimetre !== "—" && (
                    <div className="flex gap-2">
                      <span className="text-gray-400 w-16 flex-shrink-0">Périmètre</span>
                      <span>{cert.perimetre}</span>
                    </div>
                  )}
                  {cert.produits && (
                    <div className="flex gap-2">
                      <span className="text-gray-400 w-16 flex-shrink-0">Produits</span>
                      <span>{cert.produits}</span>
                    </div>
                  )}
                  {cert.dates.map((d, di) => (
                    <div key={di} className="flex gap-2">
                      <span className="text-gray-400 w-16 flex-shrink-0">{d.label}</span>
                      <span className={"ok" in d && d.ok ? "text-green-700 font-medium" : ""}>{d.val}</span>
                    </div>
                  ))}
                  {cert.inspection && (
                    <div className="flex gap-2">
                      <span className="text-gray-400 w-16 flex-shrink-0">Inspection</span>
                      <span>{cert.inspection}</span>
                    </div>
                  )}
                  {cert.info && (
                    <div className="mt-1 text-[11px] rounded-lg bg-green-50 border border-green-100 px-2.5 py-1.5 text-green-700 font-medium">
                      {cert.info}
                    </div>
                  )}
                </div>

                <button className="mt-auto self-start flex items-center gap-1 text-xs text-[#2E7D32] font-medium hover:underline">
                  Voir le dossier <ChevronRight size={12} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* ── Tab: Audits ──────────────────────────────────────────────── */}
        {activeTab === "Audits" && (
          <div className="space-y-6">
            {/* Table audits planifiés */}
            <div className="rounded-2xl bg-white border border-gray-100 p-5">
              <div className="flex items-center gap-2 mb-4">
                <Calendar size={18} className="text-[#2E7D32]" />
                <h2 className="font-bold text-gray-800">Audits planifiés 2025</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#F8FBF8] text-gray-500 text-xs">
                      <th className="text-left px-4 py-3 font-medium rounded-tl-xl">Date</th>
                      <th className="text-left px-4 py-3 font-medium">Certification</th>
                      <th className="text-left px-4 py-3 font-medium">Type</th>
                      <th className="text-left px-4 py-3 font-medium">Auditeur</th>
                      <th className="text-left px-4 py-3 font-medium">Périmètre</th>
                      <th className="text-left px-4 py-3 font-medium rounded-tr-xl">Statut</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {AUDITS_PLANIFIES.map((a, i) => (
                      <tr key={i} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 font-mono text-xs text-gray-700">{a.date}</td>
                        <td className="px-4 py-3 font-medium text-gray-800 text-xs">{a.cert}</td>
                        <td className="px-4 py-3 text-xs text-gray-600">{a.type}</td>
                        <td className="px-4 py-3 text-xs text-gray-600">{a.auditeur}</td>
                        <td className="px-4 py-3 text-xs text-gray-600">{a.perimetre}</td>
                        <td className="px-4 py-3">
                          <Badge color="blue">Planifié</Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Checklist pré-audit RA */}
            <div className="rounded-2xl bg-white border border-gray-100 p-5">
              <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <ClipboardList size={18} className="text-[#2E7D32]" />
                  <h2 className="font-bold text-gray-800">Checklist pré-audit Rainforest Alliance — 15/09/2025</h2>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-green-700 bg-green-50 px-3 py-1 rounded-full">
                    14 / 18 critères satisfaits
                  </span>
                  <span className="text-xs font-semibold text-orange-600 bg-orange-50 px-3 py-1 rounded-full">
                    4 en cours
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mb-5">
                <div className="w-full h-2 bg-gray-100 rounded-full">
                  <div className="h-2 rounded-full bg-green-500" style={{ width: `${(14 / 18) * 100}%` }} />
                </div>
                <p className="text-[11px] text-gray-400 mt-1">{Math.round((14 / 18) * 100)}% — Seuil requis : 90%</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Satisfaits */}
                <div>
                  <p className="text-xs font-semibold text-green-700 mb-2 flex items-center gap-1.5">
                    <CheckCircle size={13} />
                    Critères satisfaits ({CHECKLIST_OK.length})
                  </p>
                  <div className="space-y-1.5">
                    {CHECKLIST_OK.map((item, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-gray-700">
                        <CheckCircle size={13} className="text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* En cours */}
                <div>
                  <p className="text-xs font-semibold text-orange-600 mb-2 flex items-center gap-1.5">
                    <AlertTriangle size={13} />
                    Critères en cours ({CHECKLIST_WARN.length})
                  </p>
                  <div className="space-y-2">
                    {CHECKLIST_WARN.map((item, i) => (
                      <div key={i} className="flex items-start gap-2 rounded-lg bg-orange-50 border border-orange-100 px-3 py-2 text-xs text-orange-700">
                        <AlertTriangle size={13} className="text-orange-500 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Tab: Exigences ───────────────────────────────────────────── */}
        {activeTab === "Exigences" && (
          <div className="rounded-2xl bg-white border border-gray-100 p-5">
            <div className="flex items-center gap-2 mb-5">
              <FileText size={18} className="text-[#2E7D32]" />
              <h2 className="font-bold text-gray-800">Exigences Rainforest Alliance — Campagne 2025</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#F8FBF8] text-gray-500 text-xs">
                    <th className="text-left px-4 py-3 font-medium rounded-tl-xl">Chapitre</th>
                    <th className="text-left px-4 py-3 font-medium">Intitulé</th>
                    <th className="text-left px-4 py-3 font-medium">Description</th>
                    <th className="text-center px-4 py-3 font-medium">Nb critères</th>
                    <th className="text-center px-4 py-3 font-medium">Satisfaits</th>
                    <th className="text-left px-4 py-3 font-medium">Progression</th>
                    <th className="text-center px-4 py-3 font-medium rounded-tr-xl">Critique</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {EXIGENCES.map((e, i) => (
                    <tr key={i} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-xs font-mono font-bold text-gray-700">{e.chap}</td>
                      <td className="px-4 py-3 text-xs font-semibold text-gray-800">{e.titre}</td>
                      <td className="px-4 py-3 text-xs text-gray-500">{e.desc}</td>
                      <td className="px-4 py-3 text-xs text-center text-gray-700">{e.total}</td>
                      <td className="px-4 py-3 text-xs text-center font-semibold text-green-700">{e.ok}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2 min-w-[120px]">
                          <div className="flex-1 h-1.5 bg-gray-100 rounded-full">
                            <div
                              className={`h-1.5 rounded-full ${e.pct === 100 ? "bg-green-500" : e.pct >= 90 ? "bg-green-400" : "bg-orange-400"}`}
                              style={{ width: `${e.pct}%` }}
                            />
                          </div>
                          <span className="text-[11px] font-bold text-gray-600">{e.pct}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <CheckCircle size={14} className="text-green-500 inline-block" />
                      </td>
                    </tr>
                  ))}
                  {/* Total row */}
                  <tr className="bg-green-50 border-t-2 border-green-200">
                    <td colSpan={3} className="px-4 py-3 text-xs font-bold text-gray-800">Total</td>
                    <td className="px-4 py-3 text-xs font-bold text-center text-gray-800">85</td>
                    <td className="px-4 py-3 text-xs font-bold text-center text-green-700">80</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2 min-w-[120px]">
                        <div className="flex-1 h-2 bg-green-100 rounded-full">
                          <div className="h-2 rounded-full bg-green-600" style={{ width: "94.1%" }} />
                        </div>
                        <span className="text-xs font-bold text-green-700">94,1%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="text-xs font-semibold text-green-700">✅ Seuil : 90%</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-5 rounded-xl bg-green-50 border border-green-100 p-4 flex items-center gap-3">
              <CheckCircle size={18} className="text-green-600 flex-shrink-0" />
              <div>
                <p className="text-sm font-bold text-green-800">Score global : 94,1% — Au-dessus du seuil minimum (90%)</p>
                <p className="text-xs text-green-600 mt-0.5">Résultat attendu : renouvellement accordé sous réserve de correction des 4 critères en cours avant l'audit du 15/09/2025.</p>
              </div>
            </div>
          </div>
        )}

        {/* ── Tab: Historique ──────────────────────────────────────────── */}
        {activeTab === "Historique" && (
          <div className="rounded-2xl bg-white border border-gray-100 p-5">
            <div className="flex items-center gap-2 mb-5">
              <Clock size={18} className="text-[#2E7D32]" />
              <h2 className="font-bold text-gray-800">Historique des certifications</h2>
            </div>
            <div className="space-y-4">
              {[
                { date: "01/03/2025", label: "Rainforest Alliance — Renouvellement accordé (C-CI-2025-1847)", type: "success" },
                { date: "15/01/2025", label: "Dossier Agriculture Biologique soumis à Ecocert Afrique", type: "info" },
                { date: "15/10/2024", label: "GlobalG.A.P. — Audit de surveillance passé avec succès (0 NC majeure)", type: "success" },
                { date: "04/04/2024", label: "SYSCOHADA — Audit annuel Cabinet FIDUCI CI — Conformité confirmée", type: "success" },
                { date: "01/03/2024", label: "Rainforest Alliance — Audit annuel (note : 91/100 — 5 NC mineures corrigées)", type: "success" },
                { date: "20/01/2024", label: "ISO 9001:2015 — Démarrage consultation ABS Quality Evaluations CI", type: "info" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className={`w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0 ${item.type === "success" ? "bg-green-500" : "bg-blue-400"}`} />
                  <div>
                    <p className="text-xs font-mono text-gray-400">{item.date}</p>
                    <p className="text-sm text-gray-700">{item.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
