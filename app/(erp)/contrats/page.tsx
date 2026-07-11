"use client";

import { useState } from "react";
import Topbar from "../../components/Topbar";
import {
  FileText,
  AlertTriangle,
  Eye,
  Clock,
  Users,
  Building2,
  Handshake,
  Search,
  Plus,
  MoreHorizontal,
  ChevronDown,
  CheckCircle2,
  CalendarClock,
  RefreshCw,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────── TYPES */
type Tab = "emploi" | "fournisseurs" | "clients" | "partenariats";

/* ─────────────────────────────────────────────────────────── DATA */
const emploiData = [
  { employe: "Ibrahim Sawadogo", poste: "Chef équipe cacao", type: "CDI", debut: "01/03/2019", fin: "—", duree: "Indéterminé", salaire: "285 000 XOF", statut: "Actif" },
  { employe: "Mariam Kouyaté", poste: "DRH", type: "CDI", debut: "15/06/2018", fin: "—", duree: "Indéterminé", salaire: "620 000 XOF", statut: "Actif" },
  { employe: "Bamba Oumar", poste: "Mécanicien", type: "CDI", debut: "01/09/2020", fin: "—", duree: "Indéterminé", salaire: "195 000 XOF", statut: "Actif" },
  { employe: "Adjoua Messou", poste: "Comptable", type: "CDI", debut: "01/04/2021", fin: "—", duree: "Indéterminé", salaire: "380 000 XOF", statut: "Actif" },
  { employe: "Jean-Baptiste K.", poste: "DAF", type: "CDI", debut: "01/01/2020", fin: "—", duree: "Indéterminé", salaire: "780 000 XOF", statut: "Actif" },
  { employe: "Konan Yao", poste: "Technicien cacao", type: "CDD", debut: "01/01/2025", fin: "31/12/2025", duree: "12 mois", salaire: "185 000 XOF", statut: "Actif" },
  { employe: "Soro Fatoumata", poste: "Secrétaire", type: "CDD", debut: "01/04/2025", fin: "31/03/2026", duree: "12 mois", salaire: "145 000 XOF", statut: "Actif" },
  { employe: "Coulibaly Daouda", poste: "Chauffeur saisonnier", type: "Saisonnier", debut: "01/10/2025", fin: "31/01/2026", duree: "4 mois", salaire: "95 000 XOF", statut: "Planifié" },
  { employe: "Diallo Aminata", poste: "Stagiaire Marketing", type: "Stage", debut: "01/06/2025", fin: "31/08/2025", duree: "3 mois", salaire: "60 000 XOF", statut: "Actif" },
  { employe: "Ouattara Seydou", poste: "Ouvrier polyvalent", type: "CDD", debut: "01/03/2025", fin: "28/02/2026", duree: "12 mois", salaire: "110 000 XOF", statut: "Actif" },
];

const fournisseursData = [
  { fournisseur: "YARA Nederland", objet: "Fourniture engrais", type: "Annuel", montant: "18,2 M XOF", debut: "01/01/2025", fin: "31/12/2025", reconduction: "Auto", statut: "Actif" },
  { fournisseur: "SYNGENTA Basel", objet: "Produits phyto", type: "Annuel", montant: "8,8 M XOF", debut: "01/03/2025", fin: "28/02/2026", reconduction: "Manuel", statut: "Actif" },
  { fournisseur: "AGRIINTRANT CI", objet: "Intrants divers", type: "Cadre 3 ans", montant: "12,4 M XOF", debut: "01/07/2023", fin: "30/06/2026", reconduction: "Manuel", statut: "Actif" },
  { fournisseur: "TOTAL Énergie CI", objet: "Carburant", type: "Cadre 2 ans", montant: "6,2 M XOF", debut: "01/01/2024", fin: "31/12/2025", reconduction: "Manuel", statut: "Expiration Dec" },
  { fournisseur: "Équipements Agri SA", objet: "Location tracteur", type: "Location", montant: "3,6 M XOF", debut: "01/06/2025", fin: "31/05/2026", reconduction: "Auto", statut: "Actif" },
  { fournisseur: "CI Emballages SARL", objet: "Sacs jute & PP", type: "Annuel", montant: "2,8 M XOF", debut: "01/01/2025", fin: "31/12/2025", reconduction: "Auto", statut: "Actif" },
  { fournisseur: "Laboratoire AgroCI", objet: "Analyses sol/produit", type: "Service", montant: "1,4 M XOF", debut: "01/03/2025", fin: "28/02/2026", reconduction: "Manuel", statut: "Actif" },
  { fournisseur: "Transport Rapide CI", objet: "Logistique camions", type: "Cadre", montant: "4,8 M XOF", debut: "01/01/2025", fin: "31/12/2025", reconduction: "Manuel", statut: "Expiration Dec" },
];

const clientsData = [
  { client: "Barry Callebaut France", objet: "Cacao Grade A certifié RA", volume: "40-50 t", prix: "1 100 XOF/kg", periode: "Juil 2025–Juin 2026", penalites: "Oui", statut: "Signé" },
  { client: "Olam International", objet: "Cacao Grade A/B", volume: "12-18 t", prix: "1 050 XOF/kg", periode: "Jan–Déc 2025", penalites: "Oui", statut: "Signé" },
  { client: "Cemoi Chocolatier", objet: "Cacao Grade A bio", volume: "8-10 t", prix: "1 180 XOF/kg", periode: "Sep 2025–Août 2026", penalites: "Oui", statut: "Négociation" },
  { client: "Ritter Sport", objet: "Cacao origin traceable", volume: "8-12 t", prix: "1 150 XOF/kg", periode: "Oct 2025–Sep 2026", penalites: "Oui", statut: "Signé" },
  { client: "Grossistes CI (3)", objet: "Anacarde WW240", volume: "20-25 t", prix: "680 XOF/kg", periode: "Jan–Déc 2025", penalites: "Non", statut: "Signé" },
  { client: "Importateur Sénégal", objet: "Maïs & Riz", volume: "80-120 t", prix: "220 XOF/kg", periode: "Juil–Nov 2025", penalites: "Non", statut: "Signé" },
];

const partenariatsData = [
  { partenaire: "ANADER CI", type: "Convention d'appui technique", objet: "Formation & conseil agronomique", periode: "2023–2026", conditions: "Gratuit" },
  { partenaire: "CNRA", type: "Protocole R&D", objet: "Variétés améliorées cacao", periode: "2024–2027", conditions: "Partage données" },
  { partenaire: "Rainforest Alliance", type: "Accord certification", objet: "Accès marché premium", periode: "2023–2026", conditions: "3,2 M XOF/an" },
  { partenaire: "BCC (Bourse du Café-Cacao)", type: "Convention", objet: "Accès prix officiels & statistiques", periode: "Continu", conditions: "Institutionnel" },
];

/* ─────────────────────────────────────────────────────────── HELPERS */
function TypeBadge({ type }: { type: string }) {
  const map: Record<string, string> = {
    CDI: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    CDD: "bg-blue-50 text-blue-700 border border-blue-200",
    Saisonnier: "bg-amber-50 text-amber-700 border border-amber-200",
    Stage: "bg-purple-50 text-purple-700 border border-purple-200",
    Annuel: "bg-blue-50 text-blue-700 border border-blue-200",
    "Cadre 3 ans": "bg-indigo-50 text-indigo-700 border border-indigo-200",
    "Cadre 2 ans": "bg-indigo-50 text-indigo-700 border border-indigo-200",
    Location: "bg-cyan-50 text-cyan-700 border border-cyan-200",
    Service: "bg-teal-50 text-teal-700 border border-teal-200",
    Cadre: "bg-indigo-50 text-indigo-700 border border-indigo-200",
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${map[type] ?? "bg-gray-100 text-gray-600"}`}>
      {type}
    </span>
  );
}

function StatutBadge({ statut }: { statut: string }) {
  if (statut === "Actif" || statut === "Signé")
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200">
        <CheckCircle2 size={11} />{statut}
      </span>
    );
  if (statut === "Planifié")
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
        <CalendarClock size={11} />Planifié
      </span>
    );
  if (statut === "Expiration Dec")
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-orange-50 text-orange-700 border border-orange-200">
        <AlertTriangle size={11} />Expiration Dec
      </span>
    );
  if (statut === "Négociation")
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
        <RefreshCw size={11} />Négociation
      </span>
    );
  return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">{statut}</span>;
}

/* ─────────────────────────────────────────────────────────── SMALL UI */
function Th({ children }: { children: React.ReactNode }) {
  return <th className="px-4 py-2.5 text-left text-xs font-medium text-gray-500 whitespace-nowrap">{children}</th>;
}

function SelectFilter({ value, onChange, options, placeholder }: { value: string; onChange: (v: string) => void; options: string[]; placeholder: string }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-3 pr-7 py-2 text-xs border border-gray-200 rounded-xl focus:outline-none focus:border-[#2E7D32] bg-[#F8FBF8] appearance-none text-gray-600"
      >
        <option value="">{placeholder}</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
      <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
    </div>
  );
}

function KpiCard({ icon, bg, label, value, accent = "text-gray-800" }: { icon: React.ReactNode; bg: string; label: string; value: string; accent?: string }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 flex items-center gap-4">
      <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center shrink-0`}>{icon}</div>
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className={`text-2xl font-bold mt-0.5 ${accent}`}>{value}</p>
      </div>
    </div>
  );
}

function AlertRow({ level, text }: { level: "red" | "yellow"; text: string }) {
  const colors = level === "red" ? "bg-red-50 border-red-200 text-red-700" : "bg-amber-50 border-amber-200 text-amber-700";
  const dot = level === "red" ? "bg-red-500" : "bg-amber-400";
  return (
    <div className={`flex items-start gap-2.5 rounded-xl border px-3.5 py-2.5 text-xs ${colors}`}>
      <span className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${dot}`} />
      {text}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────── PAGE */
const tabs: { key: Tab; label: string; count: number; icon: React.ReactNode }[] = [
  { key: "emploi", label: "Emploi", count: 187, icon: <Users size={14} /> },
  { key: "fournisseurs", label: "Fournisseurs", count: 24, icon: <Building2 size={14} /> },
  { key: "clients", label: "Clients", count: 6, icon: <FileText size={14} /> },
  { key: "partenariats", label: "Partenariats", count: 4, icon: <Handshake size={14} /> },
];

export default function ContratsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("emploi");
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [statutFilter, setStatutFilter] = useState("");

  const filteredEmploi = emploiData.filter((r) => {
    const q = search.toLowerCase();
    return (
      (!q || r.employe.toLowerCase().includes(q) || r.poste.toLowerCase().includes(q)) &&
      (!typeFilter || r.type === typeFilter) &&
      (!statutFilter || r.statut === statutFilter)
    );
  });

  return (
    <div className="flex flex-col min-h-screen bg-[#F7FAF7]">
      <Topbar title="Gestion des Contrats" breadcrumb={["RH", "Contrats"]} />

      <main className="flex-1 px-6 py-6 space-y-6">

        {/* KPI */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard icon={<FileText size={20} className="text-[#2E7D32]" />} bg="bg-green-50" label="Contrats actifs" value="187" />
          <KpiCard icon={<Clock size={20} className="text-orange-600" />} bg="bg-orange-50" label="Expirant dans 30j" value="8" accent="text-orange-600" />
          <KpiCard icon={<Building2 size={20} className="text-blue-600" />} bg="bg-blue-50" label="Contrats fournisseurs" value="24" accent="text-blue-600" />
          <KpiCard icon={<Users size={20} className="text-purple-600" />} bg="bg-purple-50" label="Contrats clients" value="6" accent="text-purple-600" />
        </div>

        {/* CARD PRINCIPALE */}
        <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden">

          {/* header */}
          <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-gray-100">
            <h2 className="text-sm font-semibold text-gray-800">Contrats</h2>
            <button className="flex items-center gap-1.5 bg-[#2E7D32] text-white rounded-xl text-xs font-medium px-3 py-2 hover:bg-[#1B5E20] transition-colors">
              <Plus size={13} />Nouveau contrat
            </button>
          </div>

          {/* tabs */}
          <div className="flex gap-0 border-b border-gray-100 px-5">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setActiveTab(t.key)}
                className={`flex items-center gap-1.5 py-3 px-4 text-xs font-medium border-b-2 transition-colors ${activeTab === t.key ? "border-[#2E7D32] text-[#2E7D32]" : "border-transparent text-gray-500 hover:text-gray-700"}`}
              >
                {t.icon}{t.label}
                <span className={`ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-semibold ${activeTab === t.key ? "bg-green-100 text-[#2E7D32]" : "bg-gray-100 text-gray-500"}`}>
                  {t.count}
                </span>
              </button>
            ))}
          </div>

          {/* ── EMPLOI ── */}
          {activeTab === "emploi" && (
            <div className="p-5 space-y-4">
              <div className="flex flex-wrap gap-2">
                <div className="relative flex-1 min-w-[180px]">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Rechercher un employé, poste..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 text-xs border border-gray-200 rounded-xl focus:outline-none focus:border-[#2E7D32] bg-[#F8FBF8]"
                  />
                </div>
                <SelectFilter value={typeFilter} onChange={setTypeFilter} options={["CDI", "CDD", "Saisonnier", "Stage"]} placeholder="Type" />
                <SelectFilter value={statutFilter} onChange={setStatutFilter} options={["Actif", "Planifié", "Expiré"]} placeholder="Statut" />
              </div>

              <div className="overflow-x-auto rounded-xl border border-gray-100">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-[#F8FBF8]">
                      <Th>Employé</Th><Th>Poste</Th><Th>Type</Th><Th>Date début</Th>
                      <Th>Date fin</Th><Th>Durée</Th><Th>Salaire base</Th><Th>Statut</Th><Th>Actions</Th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEmploi.map((r, i) => (
                      <tr key={i} className="border-t border-gray-50 hover:bg-green-50/30 transition-colors">
                        <td className="px-4 py-2.5 font-medium text-gray-800 whitespace-nowrap">{r.employe}</td>
                        <td className="px-4 py-2.5 text-gray-600">{r.poste}</td>
                        <td className="px-4 py-2.5"><TypeBadge type={r.type} /></td>
                        <td className="px-4 py-2.5 text-gray-600 whitespace-nowrap">{r.debut}</td>
                        <td className="px-4 py-2.5 text-gray-600 whitespace-nowrap">{r.fin}</td>
                        <td className="px-4 py-2.5 text-gray-600">{r.duree}</td>
                        <td className="px-4 py-2.5 font-medium text-gray-700 whitespace-nowrap">{r.salaire}</td>
                        <td className="px-4 py-2.5"><StatutBadge statut={r.statut} /></td>
                        <td className="px-4 py-2.5">
                          <div className="flex items-center gap-1">
                            <button className="flex items-center gap-1 text-[#2E7D32] hover:underline text-xs font-medium">
                              <Eye size={12} />Voir
                            </button>
                            <button className="p-1 text-gray-400 hover:text-gray-600 rounded"><MoreHorizontal size={14} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="space-y-2 pt-1">
                <h3 className="text-xs font-semibold text-gray-700 mb-2">Alertes contrats</h3>
                <AlertRow level="red" text="3 CDD expirant en octobre 2025 — Décision renouvellement requise avant le 15/09" />
                <AlertRow level="yellow" text="5 contrats saisonniers à préparer pour campagne Oct 2025 — Modèles prêts" />
              </div>
            </div>
          )}

          {/* ── FOURNISSEURS ── */}
          {activeTab === "fournisseurs" && (
            <div className="p-5">
              <div className="overflow-x-auto rounded-xl border border-gray-100">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-[#F8FBF8]">
                      <Th>Fournisseur</Th><Th>Objet</Th><Th>Type contrat</Th>
                      <Th>Montant annuel</Th><Th>Début</Th><Th>Fin</Th><Th>Reconduction</Th><Th>Statut</Th>
                    </tr>
                  </thead>
                  <tbody>
                    {fournisseursData.map((r, i) => (
                      <tr key={i} className="border-t border-gray-50 hover:bg-green-50/30 transition-colors">
                        <td className="px-4 py-2.5 font-medium text-gray-800 whitespace-nowrap">{r.fournisseur}</td>
                        <td className="px-4 py-2.5 text-gray-600">{r.objet}</td>
                        <td className="px-4 py-2.5"><TypeBadge type={r.type} /></td>
                        <td className="px-4 py-2.5 font-semibold text-gray-700 whitespace-nowrap">{r.montant}</td>
                        <td className="px-4 py-2.5 text-gray-600 whitespace-nowrap">{r.debut}</td>
                        <td className="px-4 py-2.5 text-gray-600 whitespace-nowrap">{r.fin}</td>
                        <td className="px-4 py-2.5">
                          {r.reconduction === "Auto"
                            ? <span className="inline-flex items-center gap-1 text-green-700 text-xs"><CheckCircle2 size={11} />Auto</span>
                            : <span className="text-gray-500">{r.reconduction}</span>}
                        </td>
                        <td className="px-4 py-2.5"><StatutBadge statut={r.statut} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── CLIENTS ── */}
          {activeTab === "clients" && (
            <div className="p-5">
              <div className="overflow-x-auto rounded-xl border border-gray-100">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-[#F8FBF8]">
                      <Th>Client</Th><Th>Objet</Th><Th>Volume annuel</Th>
                      <Th>Prix garanti</Th><Th>Période</Th><Th>Pénalités</Th><Th>Statut</Th>
                    </tr>
                  </thead>
                  <tbody>
                    {clientsData.map((r, i) => (
                      <tr key={i} className="border-t border-gray-50 hover:bg-green-50/30 transition-colors">
                        <td className="px-4 py-2.5 font-medium text-gray-800 whitespace-nowrap">{r.client}</td>
                        <td className="px-4 py-2.5 text-gray-600">{r.objet}</td>
                        <td className="px-4 py-2.5 font-semibold text-gray-700">{r.volume}</td>
                        <td className="px-4 py-2.5 font-semibold text-[#2E7D32]">{r.prix}</td>
                        <td className="px-4 py-2.5 text-gray-600 whitespace-nowrap">{r.periode}</td>
                        <td className="px-4 py-2.5">
                          {r.penalites === "Oui"
                            ? <span className="text-red-600 font-medium">Oui</span>
                            : <span className="text-gray-400">Non</span>}
                        </td>
                        <td className="px-4 py-2.5"><StatutBadge statut={r.statut} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── PARTENARIATS ── */}
          {activeTab === "partenariats" && (
            <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {partenariatsData.map((p, i) => (
                <div key={i} className="rounded-xl border border-gray-100 p-4 bg-[#F8FBF8] hover:border-green-200 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-green-100 flex items-center justify-center shrink-0">
                      <Handshake size={16} className="text-[#2E7D32]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-gray-800 truncate">{p.partenaire}</h3>
                      <p className="text-xs text-[#2E7D32] font-medium mt-0.5">{p.type}</p>
                      <p className="text-xs text-gray-600 mt-1">{p.objet}</p>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Clock size={11} />{p.periode}
                        </span>
                        <span className="text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-lg px-2 py-0.5">
                          {p.conditions}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
