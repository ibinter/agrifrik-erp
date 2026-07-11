"use client";

import { useState } from "react";
import Topbar from "../../components/Topbar";
import {
  Users,
  Wallet,
  TrendingUp,
  Award,
  CreditCard,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  FileText,
  CheckCircle,
  AlertTriangle,
  Info,
} from "lucide-react";

const TABS = ["Vue d'ensemble", "Membres", "Micro-crédit", "Assemblées", "Distributions"] as const;
type Tab = (typeof TABS)[number];

const kpis = [
  { label: "Membres actifs", value: "142", icon: Users, color: "text-green-700", bg: "bg-green-50" },
  { label: "Superficie totale gérée", value: "284 ha", icon: TrendingUp, color: "text-blue-700", bg: "bg-blue-50" },
  { label: "CA collecté 2025", value: "82,4 M XOF", icon: Wallet, color: "text-orange-700", bg: "bg-orange-50" },
  { label: "Prime qualité versée", value: "4,2 M XOF", icon: Award, color: "text-purple-700", bg: "bg-purple-50" },
  { label: "Taux remboursement micro-crédit", value: "94,8%", icon: CreditCard, color: "text-teal-700", bg: "bg-teal-50" },
];

const villages = [
  { name: "Soubré", count: 48 },
  { name: "Méagui", count: 32 },
  { name: "Buyo", count: 22 },
  { name: "San-Pédro", count: 18 },
  { name: "Gagnoa", count: 12 },
  { name: "Autres", count: 10 },
];

const donutData = [
  { label: "< 2 ha", members: 28, pct: 20, color: "#A5D6A7" },
  { label: "2-5 ha", members: 67, pct: 47, color: "#4CAF50" },
  { label: "5-10 ha", members: 38, pct: 27, color: "#2E7D32" },
  { label: "> 10 ha", members: 9, pct: 6, color: "#795548" },
];

const campagneResults = [
  { label: "Volume collecté cacao", objectif: "180 t", realise: "187,4 t", pct: "104%", ok: true },
  { label: "Prix moyen payé", objectif: "1 050 XOF/kg", realise: "1 087 XOF/kg", pct: "103,5%", ok: true },
  { label: "Prime qualité", objectif: "3,5 M XOF", realise: "4,2 M XOF", pct: "120%", ok: true },
  { label: "Membres certifiés RA", objectif: "120", realise: "131", pct: "109%", ok: true },
  { label: "Crédits remboursés", objectif: "95%", realise: "94,8%", pct: "99,8%", ok: false },
  { label: "Femmes dans CA", objectif: "30%", realise: "34%", pct: "113%", ok: true },
];

const membres = [
  { id: "COOP-0001", nom: "Konan Yao", village: "Soubré", surface: "4,2 ha", cert: "RA", prod: "5,2 t", credit: "Non", statut: "Actif" },
  { id: "COOP-0002", nom: "Diallo Fatoumata", village: "Méagui", surface: "2,8 ha", cert: "RA", prod: "3,4 t", credit: "150 000 XOF", statut: "Actif" },
  { id: "COOP-0003", nom: "Traoré Moussa", village: "Buyo", surface: "6,4 ha", cert: "RA", prod: "7,8 t", credit: "Non", statut: "Actif" },
  { id: "COOP-0042", nom: "Ibrahim Sawadogo", village: "Soubré", surface: "3,2 ha", cert: "RA", prod: "4,1 t", credit: "Non", statut: "Actif" },
  { id: "COOP-0087", nom: "Ouattara Aminata", village: "Gagnoa", surface: "1,6 ha", cert: "En cours", prod: "1,8 t", credit: "80 000 XOF", statut: "Actif" },
  { id: "COOP-0015", nom: "Bamba Seydou", village: "Soubré", surface: "3,8 ha", cert: "RA", prod: "4,6 t", credit: "Non", statut: "Actif" },
  { id: "COOP-0028", nom: "Coulibaly Mamadou", village: "Méagui", surface: "5,0 ha", cert: "RA", prod: "6,1 t", credit: "450 000 XOF", statut: "Actif" },
  { id: "COOP-0034", nom: "Koffi Yves", village: "Buyo", surface: "2,2 ha", cert: "RA", prod: "2,7 t", credit: "Non", statut: "Actif" },
  { id: "COOP-0056", nom: "Diabaté Rokia", village: "San-Pédro", surface: "1,8 ha", cert: "En cours", prod: "2,0 t", credit: "Non", statut: "Actif" },
  { id: "COOP-0067", nom: "Soro Lacina", village: "Gagnoa", surface: "4,5 ha", cert: "RA", prod: "5,5 t", credit: "Non", statut: "Actif" },
  { id: "COOP-0071", nom: "N'Guessan Paul", village: "San-Pédro", surface: "3,1 ha", cert: "RA", prod: "3,7 t", credit: "Non", statut: "Actif" },
  { id: "COOP-0082", nom: "Touré Hawa", village: "Méagui", surface: "2,4 ha", cert: "RA", prod: "2,9 t", credit: "Non", statut: "Actif" },
  { id: "COOP-0091", nom: "Kouyaté Mariam", village: "Soubré", surface: "6,0 ha", cert: "RA", prod: "7,2 t", credit: "Non", statut: "Actif" },
  { id: "COOP-0103", nom: "Fofana Adama", village: "Buyo", surface: "2,9 ha", cert: "En cours", prod: "3,2 t", credit: "100 000 XOF", statut: "Actif" },
  { id: "COOP-0118", nom: "Zouzoua Bertin", village: "Autres", surface: "3,6 ha", cert: "RA", prod: "4,3 t", credit: "Non", statut: "Actif" },
];

const credits = [
  { benef: "Diallo F.", type: "Intrants", montant: "150 000", date: "Mar 2025", echeance: "Nov 2025", rembourse: "0", restant: "150 000", statut: "En cours" },
  { benef: "Ouattara A.", type: "Intrants", montant: "80 000", date: "Avr 2025", echeance: "Nov 2025", rembourse: "0", restant: "80 000", statut: "En cours" },
  { benef: "Coulibaly M.", type: "Équipement", montant: "450 000", date: "Jan 2025", echeance: "Jan 2027", rembourse: "75 000", restant: "375 000", statut: "En cours" },
  { benef: "Bamba S.", type: "Urgence", montant: "100 000", date: "Fév 2025", echeance: "Aoû 2025", rembourse: "100 000", restant: "0", statut: "Soldé" },
  { benef: "Fofana A.", type: "Intrants", montant: "100 000", date: "Avr 2025", echeance: "Nov 2025", rembourse: "0", restant: "100 000", statut: "En cours" },
  { benef: "Koffi Y.", type: "Intrants", montant: "120 000", date: "Mar 2025", echeance: "Nov 2025", rembourse: "60 000", restant: "60 000", statut: "En cours" },
  { benef: "N'Guessan P.", type: "Équipement", montant: "320 000", date: "Fév 2025", echeance: "Fév 2027", rembourse: "40 000", restant: "280 000", statut: "En cours" },
  { benef: "Diabaté R.", type: "Urgence", montant: "80 000", date: "Mar 2025", echeance: "Sep 2025", rembourse: "80 000", restant: "0", statut: "Soldé" },
  { benef: "Touré H.", type: "Intrants", montant: "200 000", date: "Jan 2025", echeance: "Nov 2025", rembourse: "100 000", restant: "100 000", statut: "En cours" },
  { benef: "Zouzoua B.", type: "Intrants", montant: "180 000", date: "Fév 2025", echeance: "Nov 2025", rembourse: "90 000", restant: "90 000", statut: "En cours" },
];

const assemblees = [
  { date: "15/03/2025", type: "AGO", quorum: "83%", points: 6, pv: true },
  { date: "10/09/2024", type: "AGEX", quorum: "71%", points: 3, pv: true },
  { date: "16/03/2024", type: "AGO", quorum: "78%", points: 5, pv: true },
];

const agPoints = [
  { num: 1, statut: "ok", texte: "Approbation comptes 2024", resultat: "Adopté à 97,5%" },
  { num: 2, statut: "ok", texte: "Renouvellement CA (3 postes)", resultat: "Élection mme Kouyaté, M. Diabaté, M. Soro" },
  { num: 3, statut: "ok", texte: "Adhésion à l'ANOPACI", resultat: "Adopté à 94%" },
  { num: 4, statut: "ok", texte: "Budget 2025 : 48 M XOF", resultat: "Adopté à 100%" },
  { num: 5, statut: "ok", texte: "Augmentation fonds micro-crédit : +5 M XOF", resultat: "Adopté à 89%" },
  { num: 6, statut: "info", texte: "Renouvellement certification RA collective", resultat: "Information" },
];

const distributions = [
  { membre: "Traoré Moussa", village: "Buyo", volume: "7 800 kg", qualite: "AA", prime: "1 404 000 XOF" },
  { membre: "Konan Yao", village: "Soubré", volume: "5 200 kg", qualite: "AA", prime: "936 000 XOF" },
  { membre: "Ibrahim Sawadogo", village: "Soubré", volume: "4 100 kg", qualite: "A", prime: "492 000 XOF" },
  { membre: "Soro Lacina", village: "Gagnoa", volume: "5 500 kg", qualite: "AA", prime: "990 000 XOF" },
  { membre: "Kouyaté Mariam", village: "Soubré", volume: "7 200 kg", qualite: "A", prime: "864 000 XOF" },
  { membre: "Bamba Seydou", village: "Soubré", volume: "4 600 kg", qualite: "AA", prime: "828 000 XOF" },
  { membre: "N'Guessan Paul", village: "San-Pédro", volume: "3 700 kg", qualite: "A", prime: "444 000 XOF" },
  { membre: "Coulibaly Mamadou", village: "Méagui", volume: "6 100 kg", qualite: "AA", prime: "1 098 000 XOF" },
  { membre: "Koffi Yves", village: "Buyo", volume: "2 700 kg", qualite: "A", prime: "324 000 XOF" },
  { membre: "Touré Hawa", village: "Méagui", volume: "2 900 kg", qualite: "AA", prime: "522 000 XOF" },
];

function DonutChart() {
  const cx = 80, cy = 80, r = 60;
  let cumul = 0;
  const segments = donutData.map((d) => {
    const start = cumul;
    cumul += d.pct;
    const startAngle = (start / 100) * 2 * Math.PI - Math.PI / 2;
    const endAngle = ((start + d.pct) / 100) * 2 * Math.PI - Math.PI / 2;
    const x1 = cx + r * Math.cos(startAngle);
    const y1 = cy + r * Math.sin(startAngle);
    const x2 = cx + r * Math.cos(endAngle);
    const y2 = cy + r * Math.sin(endAngle);
    const large = d.pct > 50 ? 1 : 0;
    return { ...d, path: `M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${large} 1 ${x2},${y2} Z` };
  });

  return (
    <div className="flex items-center gap-6">
      <svg width={160} height={160} viewBox="0 0 160 160">
        {segments.map((s, i) => (
          <path key={i} d={s.path} fill={s.color} stroke="white" strokeWidth={2} />
        ))}
        <circle cx={cx} cy={cy} r={35} fill="white" />
        <text x={cx} y={cy - 4} textAnchor="middle" fontSize={11} fontWeight="600" fill="#1B5E20">142</text>
        <text x={cx} y={cy + 9} textAnchor="middle" fontSize={8} fill="#666">membres</text>
      </svg>
      <div className="space-y-2">
        {donutData.map((d, i) => (
          <div key={i} className="flex items-center gap-2 text-xs">
            <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: d.color }} />
            <span className="text-gray-600">{d.label}</span>
            <span className="font-medium text-gray-800">{d.members} ({d.pct}%)</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CooperativePage() {
  const [activeTab, setActiveTab] = useState<Tab>("Vue d'ensemble");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 8;

  const filteredMembres = membres.filter(
    (m) =>
      m.nom.toLowerCase().includes(search.toLowerCase()) ||
      m.village.toLowerCase().includes(search.toLowerCase()) ||
      m.id.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filteredMembres.length / perPage);
  const paginated = filteredMembres.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-[#F8FBF8]">
      <Topbar title="Coopérative Agricole" breadcrumb={["RH & Social", "Coopérative"]} />

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {kpis.map((k, i) => (
            <div key={i} className="rounded-2xl border border-gray-100 bg-white p-5">
              <div className={`w-9 h-9 rounded-xl ${k.bg} flex items-center justify-center mb-3`}>
                <k.icon className={`w-4 h-4 ${k.color}`} />
              </div>
              <p className="text-xs text-gray-500">{k.label}</p>
              <p className="text-lg font-bold text-gray-800 mt-0.5">{k.value}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white rounded-xl border border-gray-100 p-1 w-fit">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`px-4 py-2 rounded-lg text-xs font-medium transition-colors ${
                activeTab === t ? "bg-[#2E7D32] text-white" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* VUE D'ENSEMBLE */}
        {activeTab === "Vue d'ensemble" && (
          <div className="space-y-5">
            <div className="rounded-2xl border border-gray-100 bg-white p-5">
              <h2 className="text-sm font-semibold text-gray-800 mb-4">Tableau de bord coopérative</h2>
              <div className="grid grid-cols-3 gap-4 mb-6">
                {[
                  { label: "Hommes", value: "88", sub: "62%", color: "bg-blue-50 text-blue-700" },
                  { label: "Femmes", value: "54", sub: "38%", color: "bg-pink-50 text-pink-700" },
                  { label: "Jeunes -35 ans", value: "28", sub: "20%", color: "bg-yellow-50 text-yellow-700" },
                ].map((s, i) => (
                  <div key={i} className={`rounded-xl p-4 ${s.color}`}>
                    <p className="text-xs font-medium">{s.label}</p>
                    <p className="text-2xl font-bold mt-1">{s.value}</p>
                    <p className="text-xs mt-0.5">{s.sub}</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-6">
                {/* Villages */}
                <div>
                  <h3 className="text-xs font-semibold text-gray-600 mb-3">Villages représentés</h3>
                  <div className="space-y-2">
                    {villages.map((v, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="flex-1">
                          <div className="flex justify-between text-xs mb-0.5">
                            <span className="text-gray-700">{v.name}</span>
                            <span className="font-medium text-gray-800">{v.count} membres</span>
                          </div>
                          <div className="h-1.5 bg-gray-100 rounded-full">
                            <div
                              className="h-1.5 bg-[#4CAF50] rounded-full"
                              style={{ width: `${(v.count / 48) * 100}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Donut */}
                <div>
                  <h3 className="text-xs font-semibold text-gray-600 mb-3">Répartition par surface</h3>
                  <DonutChart />
                </div>
              </div>
            </div>

            {/* Résultats campagne */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5">
              <h2 className="text-sm font-semibold text-gray-800 mb-4">Résultats campagne 2024-2025</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-[#F8FBF8]">
                      <th className="text-left px-3 py-2 font-semibold text-gray-600 rounded-l-lg">Indicateur</th>
                      <th className="text-left px-3 py-2 font-semibold text-gray-600">Objectif</th>
                      <th className="text-left px-3 py-2 font-semibold text-gray-600">Réalisé</th>
                      <th className="text-left px-3 py-2 font-semibold text-gray-600 rounded-r-lg">%</th>
                    </tr>
                  </thead>
                  <tbody>
                    {campagneResults.map((r, i) => (
                      <tr key={i} className="border-t border-gray-50">
                        <td className="px-3 py-2.5 text-gray-700">{r.label}</td>
                        <td className="px-3 py-2.5 text-gray-600">{r.objectif}</td>
                        <td className="px-3 py-2.5 font-medium text-gray-800">{r.realise}</td>
                        <td className="px-3 py-2.5">
                          <span className={`font-semibold ${r.ok ? "text-green-600" : "text-yellow-600"}`}>
                            {r.ok ? "✅" : "⚠️"} {r.pct}
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

        {/* MEMBRES */}
        {activeTab === "Membres" && (
          <div className="rounded-2xl border border-gray-100 bg-white p-5 space-y-4">
            <div className="flex items-center gap-3 flex-wrap">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher un membre..."
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                  className="w-full pl-8 pr-3 py-2 text-xs border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2E7D32]/20"
                />
              </div>
              <button className="flex items-center gap-1.5 px-3 py-2 text-xs border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50">
                <Filter className="w-3.5 h-3.5" /> Village
              </button>
              <button className="flex items-center gap-1.5 px-3 py-2 text-xs border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50">
                <Filter className="w-3.5 h-3.5" /> Statut
              </button>
              <button className="flex items-center gap-1.5 px-3 py-2 text-xs border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50">
                <Filter className="w-3.5 h-3.5" /> Certification
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-[#F8FBF8]">
                    {["#", "Membre", "Village", "Surface", "Certification", "Production 2024", "Micro-crédit actif", "Statut"].map((h, i) => (
                      <th key={i} className={`text-left px-3 py-2 font-semibold text-gray-600 ${i === 0 ? "rounded-l-lg" : ""} ${i === 7 ? "rounded-r-lg" : ""}`}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {paginated.map((m, i) => (
                    <tr key={i} className="border-t border-gray-50 hover:bg-gray-50/50">
                      <td className="px-3 py-2.5 text-gray-400 font-mono">{m.id}</td>
                      <td className="px-3 py-2.5 font-medium text-gray-800">{m.nom}</td>
                      <td className="px-3 py-2.5 text-gray-600">{m.village}</td>
                      <td className="px-3 py-2.5 text-gray-600">{m.surface}</td>
                      <td className="px-3 py-2.5">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${m.cert === "RA" ? "bg-green-50 text-green-700" : "bg-yellow-50 text-yellow-700"}`}>
                          {m.cert === "RA" ? "RA ✅" : "En cours"}
                        </span>
                      </td>
                      <td className="px-3 py-2.5 text-gray-600">{m.prod}</td>
                      <td className="px-3 py-2.5 text-gray-600">{m.credit}</td>
                      <td className="px-3 py-2.5">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700">
                          ✅ Actif
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between pt-2">
              <p className="text-xs text-gray-500">{filteredMembres.length} membres</p>
              <div className="flex items-center gap-2">
                <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1} className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-200 disabled:opacity-40 hover:bg-gray-50">
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <span className="text-xs text-gray-600">Page {page}/{totalPages}</span>
                <button onClick={() => setPage(Math.min(totalPages, page + 1))} disabled={page === totalPages} className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-200 disabled:opacity-40 hover:bg-gray-50">
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MICRO-CREDIT */}
        {activeTab === "Micro-crédit" && (
          <div className="space-y-5">
            <div className="rounded-2xl border border-gray-100 bg-white p-5">
              <h2 className="text-sm font-semibold text-gray-800 mb-4">Fonds de micro-crédit</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {[
                  { label: "Dotation totale", value: "15 000 000 XOF", sub: "Projet ANADER", color: "bg-blue-50 text-blue-700" },
                  { label: "Encours actif", value: "8 240 000 XOF", sub: "55 bénéficiaires", color: "bg-orange-50 text-orange-700" },
                  { label: "Remboursements YTD", value: "6 120 000 XOF", sub: "Reçus", color: "bg-green-50 text-green-700" },
                  { label: "Disponible", value: "6 760 000 XOF", sub: "Nouveaux crédits", color: "bg-purple-50 text-purple-700" },
                ].map((s, i) => (
                  <div key={i} className={`rounded-xl p-4 ${s.color}`}>
                    <p className="text-xs font-medium">{s.label}</p>
                    <p className="text-sm font-bold mt-1">{s.value}</p>
                    <p className="text-xs mt-0.5 opacity-70">{s.sub}</p>
                  </div>
                ))}
              </div>

              <h3 className="text-xs font-semibold text-gray-600 mb-3">Types de crédit disponibles</h3>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { nom: "Crédit intrants", max: "200 000 XOF", taux: "0%", duree: "Remboursement récolte", benef: 38, color: "border-green-200 bg-green-50/30" },
                  { nom: "Crédit équipement", max: "500 000 XOF", taux: "4%", duree: "24 mois", benef: 12, color: "border-blue-200 bg-blue-50/30" },
                  { nom: "Crédit urgence", max: "100 000 XOF", taux: "0%", duree: "6 mois", benef: 5, color: "border-orange-200 bg-orange-50/30" },
                ].map((c, i) => (
                  <div key={i} className={`border rounded-xl p-4 ${c.color}`}>
                    <p className="text-xs font-semibold text-gray-800 mb-2">{c.nom}</p>
                    <p className="text-xs text-gray-600">Max : <span className="font-medium">{c.max}</span></p>
                    <p className="text-xs text-gray-600">Taux : <span className="font-medium">{c.taux}</span></p>
                    <p className="text-xs text-gray-600">Durée : <span className="font-medium">{c.duree}</span></p>
                    <p className="text-xs text-gray-500 mt-2">{c.benef} bénéficiaires actifs</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-5">
              <h2 className="text-sm font-semibold text-gray-800 mb-4">Crédits en cours</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-[#F8FBF8]">
                      {["Bénéficiaire", "Type", "Montant", "Date", "Échéance", "Remboursé", "Restant", "Statut"].map((h, i) => (
                        <th key={i} className="text-left px-3 py-2 font-semibold text-gray-600">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {credits.map((c, i) => (
                      <tr key={i} className="border-t border-gray-50 hover:bg-gray-50/50">
                        <td className="px-3 py-2.5 font-medium text-gray-800">{c.benef}</td>
                        <td className="px-3 py-2.5 text-gray-600">{c.type}</td>
                        <td className="px-3 py-2.5 text-gray-700">{c.montant}</td>
                        <td className="px-3 py-2.5 text-gray-500">{c.date}</td>
                        <td className="px-3 py-2.5 text-gray-500">{c.echeance}</td>
                        <td className="px-3 py-2.5 text-gray-600">{c.rembourse}</td>
                        <td className="px-3 py-2.5 font-medium text-gray-800">{c.restant}</td>
                        <td className="px-3 py-2.5">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${c.statut === "Soldé" ? "bg-green-50 text-green-700" : "bg-yellow-50 text-yellow-700"}`}>
                            {c.statut === "Soldé" ? "✅" : "🟡"} {c.statut}
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

        {/* ASSEMBLÉES */}
        {activeTab === "Assemblées" && (
          <div className="space-y-5">
            <div className="rounded-2xl border-2 border-[#2E7D32]/20 bg-white p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-base font-bold text-gray-800">AG 2025 — Assemblée Générale Ordinaire</h2>
                  <p className="text-xs text-gray-500 mt-0.5">15 Mars 2025 · Centre polyvalent de Soubré</p>
                </div>
                <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-50 text-green-700 text-xs font-semibold rounded-xl">
                  <CheckCircle className="w-3.5 h-3.5" /> Quorum atteint
                </span>
              </div>

              <div className="flex items-center gap-6 mb-5 p-3 bg-[#F8FBF8] rounded-xl">
                <div>
                  <p className="text-xs text-gray-500">Membres présents</p>
                  <p className="text-lg font-bold text-gray-800">118<span className="text-sm text-gray-400">/142</span></p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Taux de présence</p>
                  <p className="text-lg font-bold text-green-600">83,1%</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Points abordés</p>
                  <p className="text-lg font-bold text-gray-800">6</p>
                </div>
              </div>

              <h3 className="text-xs font-semibold text-gray-600 mb-3">Ordre du jour</h3>
              <div className="space-y-2">
                {agPoints.map((p, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-gray-50/80">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${p.statut === "ok" ? "bg-green-100" : "bg-blue-100"}`}>
                      {p.statut === "ok" ? (
                        <CheckCircle className="w-3 h-3 text-green-600" />
                      ) : (
                        <Info className="w-3 h-3 text-blue-600" />
                      )}
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-800">{p.num}. {p.texte}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{p.resultat}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-5">
              <h2 className="text-sm font-semibold text-gray-800 mb-4">Historique des assemblées</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-[#F8FBF8]">
                      {["Date", "Type", "Quorum", "Points abordés", "PV disponible"].map((h, i) => (
                        <th key={i} className="text-left px-3 py-2 font-semibold text-gray-600">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {assemblees.map((a, i) => (
                      <tr key={i} className="border-t border-gray-50 hover:bg-gray-50/50">
                        <td className="px-3 py-2.5 font-medium text-gray-800">{a.date}</td>
                        <td className="px-3 py-2.5">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">{a.type}</span>
                        </td>
                        <td className="px-3 py-2.5 text-gray-600">{a.quorum}</td>
                        <td className="px-3 py-2.5 text-gray-600">{a.points} points</td>
                        <td className="px-3 py-2.5">
                          {a.pv && (
                            <button className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium text-green-700 bg-green-50 rounded-lg hover:bg-green-100">
                              <FileText className="w-3 h-3" /> ✅ PDF
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* DISTRIBUTIONS */}
        {activeTab === "Distributions" && (
          <div className="space-y-5">
            <div className="rounded-2xl border border-gray-100 bg-white p-5">
              <h2 className="text-sm font-semibold text-gray-800 mb-4">Distribution prime qualité 2024 — 4 200 000 XOF</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                {[
                  { label: "Critère d'éligibilité", value: "RA certifié + Qualité AA/A", color: "bg-green-50 text-green-800" },
                  { label: "Membres éligibles", value: "89 / 142", color: "bg-blue-50 text-blue-800" },
                  { label: "Prime qualité AA", value: "+180 XOF/kg", color: "bg-yellow-50 text-yellow-800" },
                  { label: "Prime qualité A", value: "+120 XOF/kg", color: "bg-orange-50 text-orange-800" },
                ].map((s, i) => (
                  <div key={i} className={`rounded-xl p-4 ${s.color}`}>
                    <p className="text-xs font-medium opacity-70">{s.label}</p>
                    <p className="text-sm font-bold mt-1">{s.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-5">
              <h2 className="text-sm font-semibold text-gray-800 mb-4">Top 10 bénéficiaires — Primes 2024</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-[#F8FBF8]">
                      {["#", "Membre", "Village", "Volume livré", "Qualité", "Prime reçue"].map((h, i) => (
                        <th key={i} className="text-left px-3 py-2 font-semibold text-gray-600">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {distributions.map((d, i) => (
                      <tr key={i} className="border-t border-gray-50 hover:bg-gray-50/50">
                        <td className="px-3 py-2.5 text-gray-400 font-medium">#{i + 1}</td>
                        <td className="px-3 py-2.5 font-medium text-gray-800">{d.membre}</td>
                        <td className="px-3 py-2.5 text-gray-600">{d.village}</td>
                        <td className="px-3 py-2.5 text-gray-600">{d.volume}</td>
                        <td className="px-3 py-2.5">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${d.qualite === "AA" ? "bg-green-50 text-green-700" : "bg-blue-50 text-blue-700"}`}>
                            {d.qualite}
                          </span>
                        </td>
                        <td className="px-3 py-2.5 font-bold text-[#2E7D32]">{d.prime}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
