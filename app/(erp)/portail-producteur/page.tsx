"use client";

import { useState } from "react";
import Topbar from "../../components/Topbar";
import {
  TrendingUp,
  Wallet,
  Truck,
  FileText,
  CheckCircle2,
  Calendar,
  AlertTriangle,
  Users,
  Package,
  MapPin,
  Download,
  Leaf,
  MessageSquare,
  Send,
} from "lucide-react";

// ─── données ────────────────────────────────────────────────────────────────

const kpis = [
  {
    label: "Ma production 2024-2025",
    value: "7,81 t",
    sub: "Cacao + Anacarde",
    icon: Leaf,
    color: "#2E7D32",
    bg: "#E8F5E9",
  },
  {
    label: "Mon CA campagne",
    value: "8,59 M XOF",
    sub: "Toutes livraisons",
    icon: TrendingUp,
    color: "#E65100",
    bg: "#FFF3E0",
  },
  {
    label: "Prime qualité",
    value: "+780 000 XOF",
    sub: "Grade AA obtenu",
    icon: Wallet,
    color: "#1565C0",
    bg: "#E3F2FD",
  },
  {
    label: "Prêt coopérative",
    value: "0 XOF",
    sub: "Soldé ✅",
    icon: CheckCircle2,
    color: "#2E7D32",
    bg: "#E8F5E9",
  },
];

const activites = [
  { date: "10/07/2025", label: "Taille d'entretien parcelle PAR-A1", type: "planifié", color: "#1565C0", bg: "#E3F2FD" },
  { date: "12/07/2025", label: "Livraison 240 kg cacao Grade A — Point de collecte Soubré", type: "livraison", color: "#2E7D32", bg: "#E8F5E9" },
  { date: "15/07/2025", label: "Réunion coopérative mensuelle — Salle Soubré", type: "réunion", color: "#6A1B9A", bg: "#F3E5F5" },
  { date: "20/07/2025", label: "Épandage K (recommandé IA — parcelle PAR-A3)", type: "IA", color: "#E65100", bg: "#FFF3E0" },
  { date: "01/08/2025", label: "Contrôle qualité lot LOT-052 (planifié)", type: "qualité", color: "#F57F17", bg: "#FFF8E1" },
];

const parcelles = [
  { id: "PAR-A1", surface: "6,2 ha", culture: "Cacao Grade A", stade: "Croissance cabosses", rendement: "1,28 t/ha", action: "Taille d'entretien 10/07" },
  { id: "PAR-A3", surface: "4,8 ha", culture: "Cacao Grade A", stade: "Stade floraison", rendement: "1,22 t/ha", action: "Épandage K 20/07" },
  { id: "PAR-D2", surface: "2,4 ha", culture: "Anacarde", stade: "Postcampagne", rendement: "—", action: "Sarclage 14/07" },
];

const livraisons = [
  { date: "08/07/2025", lot: "LOT-048", produit: "Cacao A", qte: "240 kg", qualite: "Grade AA", prix: "1 100", montant: "264 000 XOF", statut: "Payé" },
  { date: "01/07/2025", lot: "LOT-044", produit: "Cacao A", qte: "420 kg", qualite: "Grade A", prix: "1 085", montant: "455 700 XOF", statut: "Payé" },
  { date: "22/06/2025", lot: "LOT-040", produit: "Cacao A", qte: "380 kg", qualite: "Grade A", prix: "1 080", montant: "410 400 XOF", statut: "Payé" },
  { date: "15/06/2025", lot: "LOT-036", produit: "Cacao A", qte: "500 kg", qualite: "Grade A", prix: "1 075", montant: "537 500 XOF", statut: "Payé" },
  { date: "05/06/2025", lot: "LOT-033", produit: "Cacao A", qte: "460 kg", qualite: "Grade AA", prix: "1 100", montant: "506 000 XOF", statut: "Payé" },
  { date: "25/05/2025", lot: "LOT-029", produit: "Cacao A", qte: "620 kg", qualite: "Grade A", prix: "1 070", montant: "663 400 XOF", statut: "Payé" },
  { date: "12/05/2025", lot: "LOT-025", produit: "Cacao A", qte: "580 kg", qualite: "Grade A", prix: "1 065", montant: "617 700 XOF", statut: "Payé" },
  { date: "28/04/2025", lot: "LOT-021", produit: "Cacao A", qte: "700 kg", qualite: "Grade AA", prix: "1 100", montant: "770 000 XOF", statut: "Payé" },
  { date: "14/04/2025", lot: "LOT-017", produit: "Cacao A", qte: "810 kg", qualite: "Grade A", prix: "1 060", montant: "858 600 XOF", statut: "Payé" },
  { date: "01/04/2025", lot: "LOT-012", produit: "Cacao A", qte: "1 100 kg", qualite: "Grade A", prix: "1 055", montant: "1 160 500 XOF", statut: "Payé" },
];

const prets = [
  { label: "Prêt équipement pompe", montant: "180 000 XOF", date: "Jan 2024", taux: "8%", statut: "Soldé (Nov 2024)" },
  { label: "Prêt intrants campagne", montant: "95 000 XOF", date: "Oct 2023", taux: "8%", statut: "Soldé (Mar 2024)" },
];

const documents = [
  { label: "Bulletin de livraison LOT-048", date: "08/07/2025" },
  { label: "Attestation qualité Grade AA", date: "07/07/2025" },
  { label: "Certificat Rainforest Alliance (valide jusqu'au 28/02/2026)", date: "01/03/2025" },
  { label: "Relevé de compte campagne 2024-2025", date: "30/06/2025" },
  { label: "Attestation membre coopérative COOP-0042", date: "15/01/2025" },
  { label: "Contrat de culture saison 2025 (signé)", date: "10/10/2024" },
];

// ─── Prix payés 12 mois ─────────────────────────────────────────────────────────
const prixMois = [
  { mois: "Aoû", prix: 1045 },
  { mois: "Sep", prix: 1050 },
  { mois: "Oct", prix: 1055 },
  { mois: "Nov", prix: 1060 },
  { mois: "Déc", prix: 1062 },
  { mois: "Jan", prix: 1065 },
  { mois: "Fév", prix: 1070 },
  { mois: "Mar", prix: 1075 },
  { mois: "Avr", prix: 1080 },
  { mois: "Mai", prix: 1090 },
  { mois: "Jun", prix: 1095 },
  { mois: "Jul", prix: 1100 },
];

// ─── Messagerie ─────────────────────────────────────────────────────────────────
const conversations = [
  { id: 1, nom: "Coopérative AGRIFRIK", role: "Gestionnaire", emoji: "🏢", dernier: "Résultats AG 2025 disponibles", age: "2j", actif: true },
  { id: 2, nom: "Mariam Kouyaté", role: "DRH", emoji: "👤", dernier: "Demande attestation travail", age: "5j", actif: false },
  { id: 3, nom: "ANADER Soubré", role: "Partenaire technique", emoji: "📋", dernier: "Campagne traitement parasites", age: "1 sem", actif: false },
];

const messagesInitiaux = [
  { from: "coop", auteur: "Coopérative", heure: "11/07 09:00", texte: "Bonjour Ibrahim, vos résultats AG 2025 sont disponibles. Prime qualité 2024 : 492 000 XOF. Versement prévu le 20/07." },
  { from: "ibrahim", auteur: "Ibrahim", heure: "11/07 09:15", texte: "Merci. Est-ce que le versement sera sur Orange Money ou en espèces ?" },
  { from: "coop", auteur: "Coopérative", heure: "11/07 09:30", texte: "Virement Orange Money comme l'année passée : +225 07 XX XX XX." },
  { from: "ibrahim", auteur: "Ibrahim", heure: "11/07 09:45", texte: "Parfait, merci beaucoup !" },
];

const TABS = ["Mon tableau de bord", "Mes parcelles", "Mes livraisons", "Ma coopérative", "Mes documents", "Messagerie Directe"] as const;
type Tab = typeof TABS[number];

// ─── composant ──────────────────────────────────────────────────────────────

const prixMin = Math.min(...prixMois.map((p) => p.prix));
const prixMax = Math.max(...prixMois.map((p) => p.prix));

export default function PortailProducteurPage() {
  const [tab, setTab] = useState<Tab>("Mon tableau de bord");
  const [activeConv, setActiveConv] = useState(1);
  const [messages, setMessages] = useState(messagesInitiaux);
  const [newMsg, setNewMsg] = useState("");

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Topbar title="Portail Producteur" breadcrumb={["Administration", "Portail Producteur"]} />

      <main className="flex-1 p-4 md:p-6 space-y-6 max-w-6xl mx-auto w-full">

        {/* ── Profil producteur ── */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm flex flex-col sm:flex-row sm:items-center gap-5">
          <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center text-2xl font-bold text-green-700 shrink-0">
            IS
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-lg font-bold text-gray-900">Ibrahim Sawadogo</p>
            <p className="text-sm text-gray-500">Membre coopérative depuis 2018 · N° membre : <span className="font-semibold text-gray-700">COOP-0042</span></p>
            <p className="text-xs text-gray-400 mt-0.5">Tél. : +225 07 01 23 45 · 6,2 ha sous gestion AGRIFRIK</p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <MapPin size={14} className="text-green-600" />
            <span className="text-sm font-medium text-green-700">Soubré — Zone A</span>
          </div>
        </div>

        {/* ── KPIs ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpis.map((kpi) => {
            const Icon = kpi.icon;
            return (
              <div key={kpi.label} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: kpi.bg }}>
                  <Icon size={20} style={{ color: kpi.color }} />
                </div>
                <p className="text-xs text-gray-500 mb-1">{kpi.label}</p>
                <p className="text-xl font-bold text-gray-900">{kpi.value}</p>
                <p className="text-xs text-gray-400 mt-0.5">{kpi.sub}</p>
              </div>
            );
          })}
        </div>

        {/* ── Onglets ── */}
        <div className="border-b border-gray-200 overflow-x-auto">
          <nav className="flex gap-0 whitespace-nowrap">
            {TABS.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                  tab === t
                    ? "border-[#2E7D32] text-[#2E7D32]"
                    : "border-transparent text-gray-500 hover:text-gray-800"
                }`}
              >
                {t}
              </button>
            ))}
          </nav>
        </div>

        {/* ── Contenu onglets ── */}

        {/* Mon tableau de bord */}
        {tab === "Mon tableau de bord" && (
          <div className="space-y-5">
            {/* Alerte météo */}
            <div className="rounded-2xl border border-yellow-200 bg-yellow-50 p-4 flex items-start gap-3">
              <AlertTriangle size={18} className="text-yellow-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-yellow-800">Alerte météo — Zone Soubré</p>
                <p className="text-xs text-yellow-700 mt-0.5">Risque de fortes pluies 12-13 juillet (60-80 mm) — Sécuriser les bâches de séchage</p>
              </div>
            </div>

            {/* Prochaines activités */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Calendar size={16} className="text-gray-400" />
                <h2 className="text-sm font-semibold text-gray-700">Prochaines activités — 15 jours</h2>
              </div>
              <ol className="relative border-l-2 border-gray-100 space-y-4 pl-6">
                {activites.map((a, i) => (
                  <li key={i} className="relative">
                    <span
                      className="absolute -left-[1.65rem] top-1 w-3 h-3 rounded-full border-2 border-white"
                      style={{ backgroundColor: a.color }}
                    />
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                      <span className="text-xs font-semibold text-gray-400 shrink-0">{a.date}</span>
                      <span className="text-sm text-gray-700">{a.label}</span>
                      <span
                        className="text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 self-start sm:self-auto"
                        style={{ backgroundColor: a.bg, color: a.color }}
                      >
                        {a.type}
                      </span>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* Évolution prix payés 12 mois */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-gray-700">Évolution des prix payés — 12 mois</h2>
                <span className="text-xs text-gray-400">XOF / kg · Cacao Grade A/AA</span>
              </div>
              <svg viewBox="0 0 420 110" className="w-full" aria-label="Prix payés 12 mois">
                {/* grille horizontale */}
                {[1040, 1060, 1080, 1100].map((v) => {
                  const y = 90 - ((v - 1030) / 80) * 80;
                  return (
                    <g key={v}>
                      <line x1={32} y1={y} x2={415} y2={y} stroke="#F0F0F0" strokeWidth={1} />
                      <text x={28} y={y + 3} textAnchor="end" fontSize={8} fill="#BDBDBD">{v}</text>
                    </g>
                  );
                })}
                {/* courbe polyline */}
                <polyline
                  points={prixMois.map((p, i) => {
                    const x = 34 + i * 34;
                    const y = 90 - ((p.prix - 1030) / 80) * 80;
                    return `${x},${y}`;
                  }).join(" ")}
                  fill="none"
                  stroke="#2E7D32"
                  strokeWidth={2}
                  strokeLinejoin="round"
                />
                {/* aire sous la courbe */}
                <polygon
                  points={[
                    ...prixMois.map((p, i) => `${34 + i * 34},${90 - ((p.prix - 1030) / 80) * 80}`),
                    `${34 + 11 * 34},90`,
                    `34,90`,
                  ].join(" ")}
                  fill="#2E7D32"
                  fillOpacity={0.08}
                />
                {/* points + étiquettes */}
                {prixMois.map((p, i) => {
                  const x = 34 + i * 34;
                  const y = 90 - ((p.prix - 1030) / 80) * 80;
                  const isLast = i === prixMois.length - 1;
                  return (
                    <g key={p.mois}>
                      <circle cx={x} cy={y} r={isLast ? 4 : 2.5} fill={isLast ? "#2E7D32" : "#A5D6A7"} stroke="white" strokeWidth={1} />
                      {isLast && (
                        <text x={x} y={y - 7} textAnchor="middle" fontSize={8} fill="#2E7D32" fontWeight="700">{p.prix}</text>
                      )}
                      <text x={x} y={103} textAnchor="middle" fontSize={7.5} fill="#9E9E9E">{p.mois}</text>
                    </g>
                  );
                })}
              </svg>
              <div className="flex gap-6 mt-2 text-xs text-gray-500">
                <span>Août 2024 : <strong className="text-gray-800">1 045 XOF/kg</strong></span>
                <span>Juillet 2025 : <strong className="text-[#2E7D32]">1 100 XOF/kg</strong></span>
                <span className="text-green-600 font-semibold">↑ +5,3% sur 12 mois</span>
              </div>
            </div>

            {/* Mes indicateurs */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <h2 className="text-sm font-semibold text-gray-700 mb-4">Mes indicateurs de performance</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="rounded-xl bg-green-50 border border-green-100 p-4">
                  <p className="text-xs text-green-600 font-medium mb-1">Rendement moyen</p>
                  <p className="text-xl font-bold text-green-800">1,26 t/ha</p>
                  <p className="text-xs text-green-600 mt-1">Moy. nationale : 0,62 t/ha</p>
                  <p className="text-xs font-bold text-green-700 mt-0.5">↑ +103% vs. moy. nationale</p>
                </div>
                <div className="rounded-xl bg-blue-50 border border-blue-100 p-4">
                  <p className="text-xs text-blue-600 font-medium mb-1">Qualité moyenne</p>
                  <p className="text-xl font-bold text-blue-800">94,2 / 100</p>
                  <p className="text-xs text-blue-600 mt-1">Score global campagne</p>
                </div>
                <div className="rounded-xl bg-emerald-50 border border-emerald-100 p-4">
                  <p className="text-xs text-emerald-600 font-medium mb-1">Taux certification</p>
                  <p className="text-xl font-bold text-emerald-800">100% RA</p>
                  <p className="text-xs text-emerald-600 mt-1">Rainforest Alliance ✅</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mes parcelles */}
        {tab === "Mes parcelles" && (
          <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#F8FBF8] border-b border-gray-100">
                    {["Parcelle", "Surface", "Culture", "Stade", "Rendement prév.", "Prochaine action"].map((h) => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {parcelles.map((p) => (
                    <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 font-semibold text-gray-900">{p.id}</td>
                      <td className="px-4 py-3 text-gray-600">{p.surface}</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                          <Leaf size={10} />
                          {p.culture}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{p.stade}</td>
                      <td className="px-4 py-3 font-semibold text-gray-800 whitespace-nowrap">{p.rendement}</td>
                      <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{p.action}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Mes livraisons */}
        {tab === "Mes livraisons" && (
          <div className="space-y-4">
            <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#F8FBF8] border-b border-gray-100">
                      {["Date", "Lot", "Produit", "Quantité", "Qualité", "Prix/kg", "Montant", "Paiement"].map((h) => (
                        <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {livraisons.map((l, i) => (
                      <tr key={i} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{l.date}</td>
                        <td className="px-4 py-3 font-medium text-gray-700 whitespace-nowrap">{l.lot}</td>
                        <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{l.produit}</td>
                        <td className="px-4 py-3 font-semibold text-gray-900 whitespace-nowrap">{l.qte}</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${l.qualite === "Grade AA" ? "bg-purple-100 text-purple-700" : "bg-green-100 text-green-700"}`}>
                            {l.qualite}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{l.prix} XOF</td>
                        <td className="px-4 py-3 font-bold text-[#2E7D32] whitespace-nowrap">{l.montant}</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                            <CheckCircle2 size={10} />
                            {l.statut}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            {/* Totaux */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-2xl border border-gray-100 bg-white p-4 text-center shadow-sm">
                <p className="text-xs text-gray-500 mb-1">Total livraisons</p>
                <p className="text-xl font-bold text-gray-900">7,81 t</p>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-white p-4 text-center shadow-sm">
                <p className="text-xs text-gray-500 mb-1">CA total</p>
                <p className="text-xl font-bold text-[#2E7D32]">8,59 M XOF</p>
              </div>
              <div className="rounded-2xl border border-green-100 bg-green-50 p-4 text-center shadow-sm">
                <p className="text-xs text-green-600 mb-1">Paiements reçus</p>
                <p className="text-xl font-bold text-green-700">8,59 M XOF ✅</p>
              </div>
            </div>
          </div>
        )}

        {/* Ma coopérative */}
        {tab === "Ma coopérative" && (
          <div className="space-y-5">
            {/* Statut membre */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Users size={16} className="text-gray-400" />
                <h2 className="text-sm font-semibold text-gray-700">Statut de membre</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
                <div className="rounded-xl bg-green-50 p-4">
                  <p className="text-xs text-green-600 mb-1">Statut</p>
                  <p className="text-sm font-bold text-green-700">Actif ✅</p>
                </div>
                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-xs text-gray-500 mb-1">Quote-part</p>
                  <p className="text-sm font-bold text-gray-800">50 000 XOF</p>
                </div>
                <div className="rounded-xl bg-blue-50 p-4">
                  <p className="text-xs text-blue-600 mb-1">Assemblée générale</p>
                  <p className="text-sm font-bold text-blue-700">15/09/2025</p>
                </div>
              </div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Services disponibles</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {["Stockage mutualisé", "Micro-crédit", "Formation", "Intrants groupés", "Assurance récolte"].map((s) => (
                  <div key={s} className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle2 size={14} className="text-green-600 shrink-0" />
                    {s}
                  </div>
                ))}
              </div>
            </div>

            {/* Historique prêts */}
            <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100">
                <h2 className="text-sm font-semibold text-gray-700">Historique des prêts</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#F8FBF8] border-b border-gray-100">
                      {["Prêt", "Montant", "Date", "Taux", "Statut"].map((h) => (
                        <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {prets.map((p, i) => (
                      <tr key={i} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 font-medium text-gray-800">{p.label}</td>
                        <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{p.montant}</td>
                        <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{p.date}</td>
                        <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{p.taux}</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                            <CheckCircle2 size={10} />
                            {p.statut}
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

        {/* Mes documents */}
        {tab === "Mes documents" && (
          <div className="rounded-2xl border border-gray-100 bg-white shadow-sm divide-y divide-gray-100">
            {documents.map((d, i) => (
              <div key={i} className="flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                    <FileText size={16} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">{d.label}</p>
                    <p className="text-xs text-gray-400">{d.date}</p>
                  </div>
                </div>
                <button className="flex items-center gap-1.5 text-xs font-medium text-[#2E7D32] hover:text-[#1B5E20] shrink-0 ml-4">
                  <Download size={14} />
                  Télécharger
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Messagerie Directe */}
        {tab === "Messagerie Directe" && (
          <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <MessageSquare size={16} className="text-[#2E7D32]" />
                <h2 className="text-sm font-semibold text-gray-800">Messagerie — Coopérative Agrifrik</h2>
              </div>
            </div>
            <div className="flex flex-col md:flex-row h-[480px]">
              {/* Liste des conversations */}
              <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-gray-100 overflow-y-auto shrink-0">
                {conversations.map((conv) => (
                  <button
                    key={conv.id}
                    onClick={() => setActiveConv(conv.id)}
                    className={`w-full text-left px-4 py-3.5 border-b border-gray-50 hover:bg-gray-50 transition-colors flex items-start gap-3 ${activeConv === conv.id ? "bg-green-50" : ""}`}
                  >
                    <span className="text-xl shrink-0 mt-0.5">{conv.emoji}</span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <p className="text-xs font-semibold text-gray-900 truncate">{conv.nom}</p>
                        <span className="text-[10px] text-gray-400 shrink-0">{conv.age}</span>
                      </div>
                      <p className="text-[10px] text-gray-400 truncate">{conv.role}</p>
                      <p className="text-xs text-gray-500 truncate mt-0.5">{conv.dernier}</p>
                    </div>
                  </button>
                ))}
              </div>

              {/* Fil de messages */}
              <div className="flex-1 flex flex-col min-h-0">
                {/* En-tête conversation active */}
                {(() => {
                  const conv = conversations.find((c) => c.id === activeConv);
                  return conv ? (
                    <div className="px-5 py-3 border-b border-gray-100 flex items-center gap-3 shrink-0">
                      <span className="text-xl">{conv.emoji}</span>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{conv.nom}</p>
                        <p className="text-xs text-gray-400">{conv.role}</p>
                      </div>
                    </div>
                  ) : null;
                })()}

                {/* Messages */}
                <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
                  {activeConv === 1 ? (
                    messages.map((msg, i) => {
                      const isMoi = msg.from === "ibrahim";
                      return (
                        <div key={i} className={`flex ${isMoi ? "justify-end" : "justify-start"}`}>
                          <div className={`max-w-[75%] rounded-2xl px-4 py-2.5 ${isMoi ? "bg-[#2E7D32] text-white rounded-br-sm" : "bg-gray-100 text-gray-800 rounded-bl-sm"}`}>
                            <p className="text-xs leading-relaxed">{msg.texte}</p>
                            <p className={`text-[10px] mt-1 ${isMoi ? "text-green-200" : "text-gray-400"}`}>{msg.heure}</p>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-2">
                      <MessageSquare size={32} />
                      <p className="text-sm">Sélectionnez une conversation pour l&apos;afficher</p>
                    </div>
                  )}
                </div>

                {/* Input réponse */}
                {activeConv === 1 && (
                  <div className="px-4 py-3 border-t border-gray-100 shrink-0">
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={newMsg}
                        onChange={(e) => setNewMsg(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && newMsg.trim()) {
                            const now = new Date();
                            const heure = `11/07 ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
                            setMessages((prev) => [...prev, { from: "ibrahim", auteur: "Ibrahim", heure, texte: newMsg.trim() }]);
                            setNewMsg("");
                          }
                        }}
                        placeholder="Écrire un message..."
                        className="flex-1 text-sm bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 outline-none focus:border-[#2E7D32] placeholder-gray-400"
                      />
                      <button
                        onClick={() => {
                          if (!newMsg.trim()) return;
                          const now = new Date();
                          const heure = `11/07 ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
                          setMessages((prev) => [...prev, { from: "ibrahim", auteur: "Ibrahim", heure, texte: newMsg.trim() }]);
                          setNewMsg("");
                        }}
                        className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors"
                        style={{ background: "#2E7D32" }}
                      >
                        <Send size={15} color="white" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
