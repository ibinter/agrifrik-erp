"use client";

import { useState } from "react";
import Topbar from "../../components/Topbar";
import {
  FileText,
  AlertTriangle,
  Clock,
  TrendingUp,
  RefreshCw,
  Eye,
  MessageSquare,
  CheckCircle,
  XCircle,
  ChevronRight,
} from "lucide-react";

const breadcrumb = ["Admin", "Contrats"];

type Tab = "actifs" | "renouveler" | "historique";

const contratsActifs = [
  { num: "CTR-2025-001", type: "Client",       partie: "Barry Callebaut SA",      objet: "Cacao Grade AA - 80t/an FOB",       valeur: 88000000, debut: "01/01/2025", fin: "31/12/2025", statut: "ok",      statutLabel: "Actif" },
  { num: "CTR-2025-002", type: "Client",       partie: "Cargill International",   objet: "Cacao AA/A - 50t/an FOB",           valeur: 55000000, debut: "01/01/2025", fin: "31/12/2025", statut: "ok",      statutLabel: "Actif" },
  { num: "CTR-2025-003", type: "Client",       partie: "Olam CI",                 objet: "Cacao A - 30t/an FOB",              valeur: 31200000, debut: "01/01/2025", fin: "31/12/2025", statut: "ok",      statutLabel: "Actif" },
  { num: "CTR-2025-004", type: "Client",       partie: "JDE Peet's",              objet: "Cacao AA - 20t/an FOB",             valeur: 22000000, debut: "01/01/2025", fin: "31/12/2025", statut: "ok",      statutLabel: "Actif" },
  { num: "CTR-2025-005", type: "Fournisseur",  partie: "SCPA CI",                 objet: "Intrants NPK/KCl/Uree",             valeur: 18400000, debut: "01/01/2025", fin: "31/12/2025", statut: "warn",    statutLabel: "KCl en attente signature" },
  { num: "CTR-2025-006", type: "Fournisseur",  partie: "Concess. JD Abidjan",     objet: "Maintenance JD 6120M",              valeur: 2400000,  debut: "01/01/2025", fin: "31/12/2025", statut: "ok",      statutLabel: "Actif" },
  { num: "CTR-2025-007", type: "Assurance",    partie: "SAHAM Assurances",        objet: "Multi-risques agricoles",           valeur: 4840000,  debut: "01/01/2025", fin: "31/12/2025", statut: "ok",      statutLabel: "Actif" },
  { num: "CTR-2025-008", type: "Assurance",    partie: "NSIA Assurances",         objet: "Responsabilite civile",             valeur: 1200000,  debut: "01/01/2025", fin: "31/12/2025", statut: "ok",      statutLabel: "Actif" },
  { num: "CTR-2025-009", type: "Foncier",      partie: "Proprietaire PAR-B1",     objet: "Fermage 3,2 ha - Soubre",           valeur: 2160000,  debut: "01/03/2022", fin: "28/02/2027", statut: "ok",      statutLabel: "Actif" },
  { num: "CTR-2025-010", type: "Foncier",      partie: "Proprietaire PAR-B2",     objet: "Fermage 3,4 ha - Soubre",           valeur: 1800000,  debut: "01/03/2022", fin: "28/02/2027", statut: "ok",      statutLabel: "Actif" },
  { num: "CTR-2025-011", type: "Foncier",      partie: "Proprietaire PAR-D1",     objet: "Fermage 5,6 ha - Gagnoa",           valeur: 2520000,  debut: "01/07/2023", fin: "30/06/2026", statut: "expiring", statutLabel: "Actif - Expire dans 11 mois" },
  { num: "CTR-2025-012", type: "Foncier",      partie: "Proprietaire PAR-D2",     objet: "Fermage 4,2 ha - Gagnoa",           valeur: 1890000,  debut: "01/07/2023", fin: "30/06/2026", statut: "expiring", statutLabel: "Actif - Expire dans 11 mois" },
  { num: "CTR-2025-013", type: "Fournisseur",  partie: "MSC Lines CI",            objet: "Transport maritime mensuel",         valeur: 3600000,  debut: "01/01/2025", fin: "31/12/2025", statut: "ok",      statutLabel: "Actif" },
  { num: "CTR-2025-014", type: "Fournisseur",  partie: "Rainforest Alliance",     objet: "Licence certification",             valeur: 2400000,  debut: "01/01/2025", fin: "31/03/2026", statut: "ok",      statutLabel: "Actif" },
  { num: "CTR-2025-015", type: "Emploi",       partie: "Ibrahim Sawadogo",        objet: "CDI - Resp. Terrain",               valeur: 3600000,  debut: "01/03/2019", fin: "-",           statut: "ok",      statutLabel: "CDI" },
  { num: "CTR-2025-016", type: "Emploi",       partie: "Adjoua Messou",           objet: "CDI - Controleur Qualite",          valeur: 2880000,  debut: "01/06/2021", fin: "-",           statut: "ok",      statutLabel: "CDI" },
  { num: "CTR-2025-017", type: "IT",           partie: "Supabase",                objet: "Hebergement donnees",               valeur: 600000,   debut: "01/01/2025", fin: "31/12/2025", statut: "ok",      statutLabel: "Actif" },
  { num: "CTR-2025-018", type: "IT",           partie: "OpenWeatherMap",          objet: "API meteo",                         valeur: 240000,   debut: "01/01/2025", fin: "31/12/2025", statut: "ok",      statutLabel: "Actif" },
];

const contratsRenouveler = [
  {
    num: "CTR-2025-005",
    partie: "SCPA CI",
    objet: "Intrants NPK/KCl/Uree",
    fin: "31/12/2025",
    niveau: "rouge",
    note: "Avenant KCl non signe (7,2 M XOF en jeu)",
  },
  {
    num: "CTR-2025-013",
    partie: "MSC Lines CI",
    objet: "Transport maritime mensuel",
    fin: "31/12/2025",
    niveau: "jaune",
    note: "Renouvellement habituel - proposer extension 2 ans (3 600 000 XOF/an)",
  },
  {
    num: "CTR-2025-017",
    partie: "Supabase",
    objet: "Hebergement IT",
    fin: "31/12/2025",
    niveau: "jaune",
    note: "Renouvellement annuel automatique",
  },
];

const contratsHistorique = [
  { num: "CTR-2019-001", type: "Foncier",     partie: "Proprietaire PAR-C1",    periode: "01/01/2019 - 31/12/2022", motif: "Non-renouvellement - terrain revendu" },
  { num: "CTR-2020-002", type: "Assurance",   partie: "AXA Assurances",         periode: "01/01/2020 - 31/12/2023", motif: "Changement d'assureur - tarif SAHAM plus avantageux" },
  { num: "CTR-2021-003", type: "Fournisseur", partie: "CIDT",                   periode: "01/03/2021 - 28/02/2023", motif: "Fin de contrat - passage en achat direct" },
  { num: "CTR-2021-004", type: "Client",      partie: "Touton SA",              periode: "01/01/2021 - 31/12/2022", motif: "Resiliation mutuelle - reorientation client" },
  { num: "CTR-2022-005", type: "Fournisseur", partie: "Societe Ivoirienne Sem", periode: "01/01/2022 - 31/12/2023", motif: "Fin contrat - fournisseur liquide" },
  { num: "CTR-2022-006", type: "IT",          partie: "AWS Lightsail",          periode: "01/06/2022 - 31/05/2023", motif: "Migration vers Supabase" },
  { num: "CTR-2023-007", type: "Emploi",      partie: "Kone Brahima",           periode: "01/04/2023 - 30/09/2023", motif: "CDD - fin de mission recolte" },
  { num: "CTR-2023-008", type: "Foncier",     partie: "Proprietaire PAR-A4",    periode: "01/01/2020 - 31/12/2023", motif: "Refus renouvellement - proprietaire" },
  { num: "CTR-2024-009", type: "Assurance",   partie: "Allianz CI",             periode: "01/01/2024 - 31/12/2024", motif: "Non-renouvellement - rationalisation polices" },
  { num: "CTR-2024-010", type: "Fournisseur", partie: "Agro Service CI",        periode: "01/01/2024 - 30/06/2024", motif: "Resiliation - rupture stock fournisseur" },
];

function formatXOF(n: number) {
  return n.toLocaleString("fr-FR") + " XOF";
}

function TypeBadge({ type }: { type: string }) {
  const colors: Record<string, string> = {
    Client: "bg-blue-50 text-blue-700",
    Fournisseur: "bg-orange-50 text-orange-700",
    Assurance: "bg-purple-50 text-purple-700",
    Foncier: "bg-yellow-50 text-yellow-700",
    Emploi: "bg-green-50 text-green-700",
    IT: "bg-gray-100 text-gray-600",
  };
  return (
    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${colors[type] ?? "bg-gray-100 text-gray-600"}`}>
      {type}
    </span>
  );
}

function StatutBadge({ statut, label }: { statut: string; label: string }) {
  if (statut === "ok") return <span className="flex items-center gap-1 text-[10px] text-green-700"><CheckCircle size={11} className="text-green-500" />{label}</span>;
  if (statut === "warn") return <span className="flex items-center gap-1 text-[10px] text-orange-600"><AlertTriangle size={11} />{label}</span>;
  if (statut === "expiring") return <span className="flex items-center gap-1 text-[10px] text-yellow-700"><Clock size={11} />{label}</span>;
  return <span className="text-[10px] text-gray-500">{label}</span>;
}

export default function ContratsPage() {
  const [tab, setTab] = useState<Tab>("actifs");

  const kpis = [
    { label: "Contrats actifs", value: "18", icon: FileText, color: "text-[#2E7D32]", bg: "bg-green-50" },
    { label: "Expiration < 3 mois", value: "3", icon: AlertTriangle, color: "text-orange-600", bg: "bg-orange-50" },
    { label: "Valeur engagements/an", value: "42,8 M XOF", icon: TrendingUp, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Contrats fournisseurs", value: "8", icon: RefreshCw, color: "text-purple-600", bg: "bg-purple-50" },
    { label: "Contrats clients", value: "4", icon: CheckCircle, color: "text-[#2E7D32]", bg: "bg-green-50" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Topbar breadcrumb={breadcrumb} />

      <div className="max-w-[1400px] mx-auto px-6 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Gestion des Contrats</h1>
            <p className="text-xs text-gray-500 mt-0.5">Suivi et renouvellement des engagements contractuels</p>
          </div>
          <button className="flex items-center gap-2 bg-[#2E7D32] text-white px-4 py-2 rounded-xl text-xs font-medium hover:bg-[#1B5E20] transition-colors">
            <FileText size={13} />
            Nouveau contrat
          </button>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-5 gap-4 mb-6">
          {kpis.map((k) => (
            <div key={k.label} className="rounded-2xl border border-gray-100 bg-white p-5">
              <div className={`w-9 h-9 rounded-xl ${k.bg} flex items-center justify-center mb-3`}>
                <k.icon size={16} className={k.color} />
              </div>
              <p className="text-xl font-bold text-gray-900">{k.value}</p>
              <p className="text-[11px] text-gray-500 mt-0.5">{k.label}</p>
            </div>
          ))}
        </div>

        {/* Onglets */}
        <div className="flex gap-1 mb-4">
          {(
            [
              { key: "actifs" as Tab, label: "Actifs", count: 18 },
              { key: "renouveler" as Tab, label: "A renouveler", count: 3 },
              { key: "historique" as Tab, label: "Historique", count: 10 },
            ]
          ).map(({ key, label, count }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-colors ${
                tab === key
                  ? "bg-[#2E7D32] text-white"
                  : "bg-white border border-gray-100 text-gray-600 hover:bg-gray-50"
              }`}
            >
              {label}
              <span
                className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                  tab === key ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"
                }`}
              >
                {count}
              </span>
            </button>
          ))}
        </div>

        {/* Tab: Actifs */}
        {tab === "actifs" && (
          <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden">
            <div className="px-5 py-3 border-b border-gray-50 bg-[#F8FBF8]">
              <p className="text-xs font-semibold text-gray-700">18 contrats actifs</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-[#F8FBF8] border-b border-gray-100">
                    <th className="text-left px-4 py-2.5 font-semibold text-gray-600 whitespace-nowrap">N°</th>
                    <th className="text-left px-4 py-2.5 font-semibold text-gray-600 whitespace-nowrap">Type</th>
                    <th className="text-left px-4 py-2.5 font-semibold text-gray-600 whitespace-nowrap">Contrepartie</th>
                    <th className="text-left px-4 py-2.5 font-semibold text-gray-600">Objet</th>
                    <th className="text-right px-4 py-2.5 font-semibold text-gray-600 whitespace-nowrap">Valeur/an (XOF)</th>
                    <th className="text-left px-4 py-2.5 font-semibold text-gray-600 whitespace-nowrap">Debut</th>
                    <th className="text-left px-4 py-2.5 font-semibold text-gray-600 whitespace-nowrap">Fin</th>
                    <th className="text-left px-4 py-2.5 font-semibold text-gray-600 whitespace-nowrap">Statut</th>
                    <th className="px-4 py-2.5"></th>
                  </tr>
                </thead>
                <tbody>
                  {contratsActifs.map((c, i) => (
                    <tr
                      key={c.num}
                      className={`border-b border-gray-50 hover:bg-gray-50 transition-colors ${
                        i % 2 === 0 ? "" : "bg-gray-50/30"
                      }`}
                    >
                      <td className="px-4 py-2.5 font-mono text-[11px] text-gray-700 whitespace-nowrap">{c.num}</td>
                      <td className="px-4 py-2.5 whitespace-nowrap"><TypeBadge type={c.type} /></td>
                      <td className="px-4 py-2.5 font-medium text-gray-800 whitespace-nowrap">{c.partie}</td>
                      <td className="px-4 py-2.5 text-gray-600 max-w-[200px] truncate">{c.objet}</td>
                      <td className="px-4 py-2.5 text-right font-semibold text-gray-800 whitespace-nowrap">
                        {c.valeur.toLocaleString("fr-FR")}
                      </td>
                      <td className="px-4 py-2.5 text-gray-500 whitespace-nowrap">{c.debut}</td>
                      <td className="px-4 py-2.5 text-gray-500 whitespace-nowrap">{c.fin}</td>
                      <td className="px-4 py-2.5 whitespace-nowrap">
                        <StatutBadge statut={c.statut} label={c.statutLabel} />
                      </td>
                      <td className="px-4 py-2.5">
                        <button className="p-1 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
                          <Eye size={13} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab: A renouveler */}
        {tab === "renouveler" && (
          <div className="space-y-4">
            {contratsRenouveler.map((c) => (
              <div
                key={c.num}
                className={`rounded-2xl border bg-white p-5 ${
                  c.niveau === "rouge"
                    ? "border-red-200 bg-red-50/30"
                    : "border-yellow-200 bg-yellow-50/20"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        c.niveau === "rouge" ? "bg-red-100" : "bg-yellow-100"
                      }`}
                    >
                      {c.niveau === "rouge" ? (
                        <XCircle size={18} className="text-red-500" />
                      ) : (
                        <Clock size={18} className="text-yellow-600" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-gray-800">{c.num}</span>
                        <span className="text-xs text-gray-600">—</span>
                        <span className="text-xs font-medium text-gray-700">{c.partie}</span>
                        <span className="text-xs text-gray-500">—</span>
                        <span className="text-xs text-gray-600">{c.objet}</span>
                      </div>
                      <p className="text-[11px] text-gray-500 mb-1">
                        Expire : <span className="font-semibold text-gray-700">{c.fin}</span>
                      </p>
                      <p
                        className={`text-[11px] font-medium ${
                          c.niveau === "rouge" ? "text-red-600" : "text-yellow-700"
                        }`}
                      >
                        {c.note}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {c.niveau === "rouge" && (
                      <button className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500 text-white rounded-lg text-[11px] font-medium hover:bg-red-600 transition-colors">
                        <MessageSquare size={11} />
                        Relancer {c.partie.split(" ")[0]}
                      </button>
                    )}
                    <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 text-gray-600 rounded-lg text-[11px] font-medium hover:bg-gray-50 transition-colors">
                      <Eye size={11} />
                      Voir contrat
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab: Historique */}
        {tab === "historique" && (
          <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden">
            <div className="px-5 py-3 border-b border-gray-50 bg-[#F8FBF8]">
              <p className="text-xs font-semibold text-gray-700">10 contrats termines ou resilies</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-[#F8FBF8] border-b border-gray-100">
                    <th className="text-left px-4 py-2.5 font-semibold text-gray-600 whitespace-nowrap">N°</th>
                    <th className="text-left px-4 py-2.5 font-semibold text-gray-600 whitespace-nowrap">Type</th>
                    <th className="text-left px-4 py-2.5 font-semibold text-gray-600 whitespace-nowrap">Contrepartie</th>
                    <th className="text-left px-4 py-2.5 font-semibold text-gray-600 whitespace-nowrap">Periode</th>
                    <th className="text-left px-4 py-2.5 font-semibold text-gray-600">Motif de cloture</th>
                    <th className="px-4 py-2.5"></th>
                  </tr>
                </thead>
                <tbody>
                  {contratsHistorique.map((c, i) => (
                    <tr
                      key={c.num}
                      className={`border-b border-gray-50 hover:bg-gray-50 transition-colors ${
                        i % 2 === 0 ? "" : "bg-gray-50/30"
                      }`}
                    >
                      <td className="px-4 py-2.5 font-mono text-[11px] text-gray-500 whitespace-nowrap">{c.num}</td>
                      <td className="px-4 py-2.5 whitespace-nowrap"><TypeBadge type={c.type} /></td>
                      <td className="px-4 py-2.5 font-medium text-gray-700 whitespace-nowrap">{c.partie}</td>
                      <td className="px-4 py-2.5 text-gray-500 whitespace-nowrap">{c.periode}</td>
                      <td className="px-4 py-2.5 text-gray-600 max-w-[280px]">{c.motif}</td>
                      <td className="px-4 py-2.5">
                        <button className="p-1 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
                          <ChevronRight size={13} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
