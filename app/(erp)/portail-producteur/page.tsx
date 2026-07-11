"use client";

import { useState } from "react";
import Topbar from "../../components/Topbar";
import {
  BarChart2,
  MessageSquare,
  AlertTriangle,
  FileText,
  Send,
  Leaf,
  TrendingUp,
  CreditCard,
  Calendar,
  CheckCircle2,
} from "lucide-react";

// ─── types ───────────────────────────────────────────────────────────────────
type Tab = "Tableau de bord" | "Mes parcelles" | "Prix & Marché" | "Messagerie";
const TABS: Tab[] = ["Tableau de bord", "Mes parcelles", "Prix & Marché", "Messagerie"];

// ─── données prix cacao ──────────────────────────────────────────────────────
const prixCacao = [
  { mois: "Jan", prix: 1058 },
  { mois: "Fév", prix: 1064 },
  { mois: "Mar", prix: 1072 },
  { mois: "Avr", prix: 1078 },
  { mois: "Mai", prix: 1082 },
  { mois: "Jun", prix: 1085 },
  { mois: "Jul", prix: 1087 },
];

// ─── messagerie ──────────────────────────────────────────────────────────────
const messagesInit = [
  { from: "coop", heure: "09/07", texte: "Bonjour Bamba. Le technicien Konan Yao passera chez vous le 15/07 pour superviser l'épandage de KCl. Êtes-vous disponible ?" },
  { from: "bamba", heure: "09/07", texte: "Oui, je suis disponible le matin. Merci.", lu: true },
  { from: "coop", heure: "10/07", texte: "Parfait ! Il sera là à 08h00. Préparez vos équipements de protection (gants + masque). Le KCl sera livré la veille." },
  { from: "bamba", heure: "10/07", texte: "D'accord. Est-ce que je dois acheter le KCl moi-même ou vous l'apportez ?", lu: true },
  { from: "coop", heure: "11/07", texte: "Le KCl est sur votre micro-crédit, nous livrons directement. Aucun paiement immédiat.", nonlu: true },
];

// ─── composant ───────────────────────────────────────────────────────────────
export default function PortailProducteurPage() {
  const [tab, setTab] = useState<Tab>("Tableau de bord");
  const [messages, setMessages] = useState(messagesInit);
  const [newMsg, setNewMsg] = useState("");

  // calculs SVG prix
  const prixMin = 1050;
  const prixMax = 1095;
  const svgW = 620;
  const svgH = 200;
  const padL = 44;
  const padR = 20;
  const padT = 24;
  const padB = 32;
  const chartW = svgW - padL - padR;
  const chartH = svgH - padT - padB;
  const pts = prixCacao.map((p, i) => {
    const x = padL + (i / (prixCacao.length - 1)) * chartW;
    const y = padT + (1 - (p.prix - prixMin) / (prixMax - prixMin)) * chartH;
    return { x, y, ...p };
  });
  const polyline = pts.map((p) => `${p.x},${p.y}`).join(" ");
  const area = [
    ...pts.map((p) => `${p.x},${p.y}`),
    `${pts[pts.length - 1].x},${padT + chartH}`,
    `${pts[0].x},${padT + chartH}`,
  ].join(" ");

  const sendMsg = () => {
    if (!newMsg.trim()) return;
    setMessages((prev) => [...prev, { from: "bamba", heure: "11/07", texte: newMsg.trim(), lu: true }]);
    setNewMsg("");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Topbar title="Portail Producteur" breadcrumb={["Admin", "Portail Producteur"]} />

      <main className="flex-1 p-4 md:p-6 space-y-6 max-w-5xl mx-auto w-full">

        {/* ── Header personnalisé ─────────────────────────────────────── */}
        <div className="rounded-2xl p-5 text-white" style={{ background: "linear-gradient(135deg,#1B5E20,#2E7D32)" }}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <p className="text-xl font-bold">Bonjour, Ibrahim Koné 👋</p>
              <p className="text-sm text-green-200 mt-0.5">N° producteur : <span className="font-semibold text-white">COOP-0042</span></p>
              <p className="text-xs text-green-300 mt-0.5">Dernière connexion : 11/07/2025</p>
            </div>
            <div className="flex items-center gap-2 bg-white/10 rounded-xl px-4 py-2 self-start sm:self-auto">
              <Leaf size={16} className="text-green-200" />
              <span className="text-sm font-medium">Cacao certifié RA</span>
            </div>
          </div>
        </div>

        {/* ── KPIs producteur ─────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {[
            { icon: Leaf, label: "Ma production cette campagne", value: "5,48 t", sub: "de cacao", color: "#2E7D32", bg: "#E8F5E9" },
            { icon: TrendingUp, label: "Mon revenu brut", value: "5 627 000", sub: "XOF", color: "#E65100", bg: "#FFF3E0" },
            { icon: CheckCircle2, label: "Prime qualité RA reçue", value: "284 000", sub: "XOF ✅", color: "#1565C0", bg: "#E3F2FD" },
            { icon: CreditCard, label: "Mon micro-crédit restant", value: "800 000", sub: "XOF · 5/12 mensualités", color: "#6A1B9A", bg: "#F3E5F5" },
            { icon: Calendar, label: "Prochaine pesée", value: "15/08/2025", sub: "Estimation récolte août", color: "#F57F17", bg: "#FFF8E1" },
          ].map(({ icon: Icon, label, value, sub, color, bg }) => (
            <div key={label} className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-2" style={{ backgroundColor: bg }}>
                <Icon size={18} style={{ color }} />
              </div>
              <p className="text-[11px] text-gray-500 leading-tight mb-1">{label}</p>
              <p className="text-base font-bold text-gray-900">{value}</p>
              <p className="text-[11px] text-gray-400">{sub}</p>
            </div>
          ))}
        </div>

        {/* ── Onglets ─────────────────────────────────────────────────── */}
        <div className="border-b border-gray-200 overflow-x-auto">
          <nav className="flex gap-0 whitespace-nowrap">
            {TABS.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                  tab === t ? "border-[#2E7D32] text-[#2E7D32]" : "border-transparent text-gray-500 hover:text-gray-800"
                }`}
              >
                {t}
              </button>
            ))}
          </nav>
        </div>

        {/* ── Tableau de bord ─────────────────────────────────────────── */}
        {tab === "Tableau de bord" && (
          <div className="space-y-5">

            {/* Bandeau prix du jour */}
            <div className="rounded-2xl p-4 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3" style={{ background: "#2E7D32" }}>
              <div>
                <p className="text-sm font-semibold">Prix BCC cacao du jour</p>
                <p className="text-2xl font-bold mt-0.5">1 087 XOF/kg <span className="text-green-200 text-base">↑</span></p>
              </div>
              <p className="text-sm text-green-100 max-w-xs">
                💡 Conseil : bon moment pour négocier — cours au plus haut depuis 3 mois
              </p>
            </div>

            {/* 4 actions rapides */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { icon: BarChart2, label: "Voir mes relevés de production", color: "#1565C0", bg: "#E3F2FD" },
                { icon: MessageSquare, label: "Contacter la coopérative", color: "#2E7D32", bg: "#E8F5E9" },
                { icon: AlertTriangle, label: "Signaler un problème terrain", color: "#E65100", bg: "#FFF3E0" },
                { icon: FileText, label: "Télécharger mon attestation RA", color: "#6A1B9A", bg: "#F3E5F5" },
              ].map(({ icon: Icon, label, color, bg }) => (
                <button
                  key={label}
                  className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm flex flex-col items-center gap-2 hover:shadow-md transition-shadow text-center"
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: bg }}>
                    <Icon size={20} style={{ color }} />
                  </div>
                  <p className="text-xs text-gray-700 font-medium leading-tight">{label}</p>
                </button>
              ))}
            </div>

            {/* Calendrier agricole */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Calendar size={15} className="text-gray-400" />
                <h2 className="text-sm font-semibold text-gray-700">Calendrier agricole de la semaine — Juillet 2025</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#F8FBF8] border-b border-gray-100">
                      {["Jour", "Activité recommandée", "Météo"].map((h) => (
                        <th key={h} className="px-3 py-2 text-left text-xs font-semibold text-gray-500 whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {[
                      { jour: "Lun 14/07", activite: "Sarclage PAR-K1 (après pluies)", meteo: "⛅ 32°C" },
                      { jour: "Mar 15/07", activite: "Épandage KCl PAR-K1 (optimal)", meteo: "☀️ 33°C" },
                      { jour: "Mer-Ven", activite: "Observation cabosses + comptage", meteo: "☀️ 33-34°C" },
                      { jour: "Sam 19/07", activite: "Inspection phyto (retour technicien)", meteo: "⛅ 31°C" },
                    ].map((r) => (
                      <tr key={r.jour} className="hover:bg-gray-50">
                        <td className="px-3 py-2.5 font-semibold text-gray-800 whitespace-nowrap">{r.jour}</td>
                        <td className="px-3 py-2.5 text-gray-700">{r.activite}</td>
                        <td className="px-3 py-2.5 text-gray-600 whitespace-nowrap">{r.meteo}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ── Mes parcelles ───────────────────────────────────────────── */}
        {tab === "Mes parcelles" && (
          <div className="space-y-5">

            {/* PAR-K1 */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div>
                  <h2 className="text-base font-bold text-gray-900">PAR-K1 — 3,2 ha</h2>
                  <p className="text-sm text-gray-500">Cacao certifié Rainforest Alliance</p>
                </div>
                <div className="flex gap-2">
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-green-100 text-green-700">✅ Certifiée RA</span>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-yellow-100 text-yellow-700">🟡 Santé 82/100</span>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <p><span className="text-gray-400 w-44 inline-block">Localisation</span><span className="font-medium text-gray-800">Secteur 4, Soubré Nord</span></p>
                  <p><span className="text-gray-400 w-44 inline-block">Âge des plants</span><span className="font-medium text-gray-800">14 ans (plantation 2011)</span></p>
                  <p><span className="text-gray-400 w-44 inline-block">Stade actuel</span><span className="font-medium text-gray-800">Fructification — 70% cabosses stade vert mature</span></p>
                  <p><span className="text-gray-400 w-44 inline-block">Estimation récolte</span><span className="font-medium text-gray-800">3,6-3,8 t cacao sec (oct-déc 2025)</span></p>
                </div>
                <div className="space-y-2">
                  <p><span className="text-gray-400 w-44 inline-block">Dernier traitement</span><span className="font-medium text-gray-800">Ridomil Gold 24/06/2025 — DRE : Ok (J+17)</span></p>
                  <p><span className="text-gray-400 w-44 inline-block">Prochaine intervention</span><span className="font-medium text-[#2E7D32]">Épandage KCl 15/07 (recommandé technicien)</span></p>
                  <p><span className="text-gray-400 w-44 inline-block">Score santé</span><span className="font-medium text-yellow-700">82/100 — Correct (amélioration possible)</span></p>
                </div>
              </div>
            </div>

            {/* PAR-K2 */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div>
                  <h2 className="text-base font-bold text-gray-900">PAR-K2 — 1,6 ha</h2>
                  <p className="text-sm text-gray-500">Anacarde (non certifiée RA)</p>
                </div>
                <div className="flex gap-2">
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-100 text-blue-700">En cours de certification</span>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <p><span className="text-gray-400 w-44 inline-block">Localisation</span><span className="font-medium text-gray-800">Secteur 4, Soubré Nord</span></p>
                  <p><span className="text-gray-400 w-44 inline-block">Stade</span><span className="font-medium text-gray-800">Post-récolte (récolte terminée mai 2025)</span></p>
                  <p><span className="text-gray-400 w-44 inline-block">Production 2025</span><span className="font-medium text-gray-800">2,12 t WW240 — vendu à San-Pédro</span></p>
                </div>
                <div className="space-y-2">
                  <p><span className="text-gray-400 w-44 inline-block">Certification RA</span><span className="font-medium text-blue-700">Projet PRJ-2025-001 — ETA : Jan 2026</span></p>
                </div>
              </div>
            </div>

            {/* Conseil technicien */}
            <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5">
              <p className="text-sm font-semibold text-blue-800 mb-1">📋 Recommandation technicien</p>
              <p className="text-sm text-blue-700">
                <span className="font-semibold">Konan Yao (Technicien AGRIFRIK)</span> — 09/07/2025 : L&apos;analyse sol de mars montre un déficit en potassium sur PAR-K1. Épandage de 80 kg KCl/ha prévu la semaine prochaine. Le technicien passera pour superviser l&apos;application le 15/07.
              </p>
            </div>
          </div>
        )}

        {/* ── Prix & Marché ───────────────────────────────────────────── */}
        {tab === "Prix & Marché" && (
          <div className="space-y-5">

            {/* Graphique */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-gray-700">Cours cacao BCC — 6 mois</h2>
                <span className="text-xs text-gray-400">XOF / kg</span>
              </div>
              <div className="overflow-x-auto">
                <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full min-w-[320px]" aria-label="Cours cacao 6 mois">
                  {/* grilles */}
                  {[1055, 1065, 1075, 1085].map((v) => {
                    const y = padT + (1 - (v - prixMin) / (prixMax - prixMin)) * chartH;
                    return (
                      <g key={v}>
                        <line x1={padL} y1={y} x2={svgW - padR} y2={y} stroke="#F0F0F0" strokeWidth={1} />
                        <text x={padL - 4} y={y + 3} textAnchor="end" fontSize={9} fill="#BDBDBD">{v}</text>
                      </g>
                    );
                  })}
                  {/* zone remplie */}
                  <polygon points={area} fill="#4CAF50" fillOpacity={0.1} />
                  {/* ligne */}
                  <polyline points={polyline} fill="none" stroke="#2E7D32" strokeWidth={2.5} strokeLinejoin="round" />
                  {/* points + labels */}
                  {pts.map((p, i) => {
                    const isLast = i === pts.length - 1;
                    return (
                      <g key={p.mois}>
                        <circle cx={p.x} cy={p.y} r={isLast ? 5 : 3} fill={isLast ? "#2E7D32" : "#A5D6A7"} stroke="white" strokeWidth={1.5} />
                        {isLast && (
                          <>
                            <text x={p.x} y={p.y - 9} textAnchor="middle" fontSize={9} fill="#2E7D32" fontWeight="700">{p.prix}</text>
                            <text x={p.x} y={p.y - 19} textAnchor="middle" fontSize={7.5} fill="#2E7D32">Votre prix estimé</text>
                          </>
                        )}
                        <text x={p.x} y={padT + chartH + 14} textAnchor="middle" fontSize={9} fill="#9E9E9E">{p.mois}</text>
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>

            {/* Simulation */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <h2 className="text-sm font-semibold text-gray-700 mb-4">Simulation de revenus — Récolte octobre 2025 (3,7 t prévue)</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#F8FBF8] border-b border-gray-100">
                      {["Grade", "Quantité", "Prix/kg", "Montant"].map((h) => (
                        <th key={h} className="px-4 py-2 text-left text-xs font-semibold text-gray-500">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    <tr>
                      <td className="px-4 py-2.5"><span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-purple-100 text-purple-700">Grade AA (60%)</span></td>
                      <td className="px-4 py-2.5 text-gray-700">2,22 t</td>
                      <td className="px-4 py-2.5 text-gray-700">1 087 XOF</td>
                      <td className="px-4 py-2.5 font-semibold text-gray-900">2 413 140 XOF</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2.5"><span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-green-100 text-green-700">Grade A (35%)</span></td>
                      <td className="px-4 py-2.5 text-gray-700">1,30 t</td>
                      <td className="px-4 py-2.5 text-gray-700">967 XOF</td>
                      <td className="px-4 py-2.5 font-semibold text-gray-900">1 257 100 XOF</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2.5"><span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">Grade B (5%)</span></td>
                      <td className="px-4 py-2.5 text-gray-700">0,18 t</td>
                      <td className="px-4 py-2.5 text-gray-700">820 XOF</td>
                      <td className="px-4 py-2.5 font-semibold text-gray-900">147 600 XOF</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100 space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Total brut estimé</span>
                  <span className="font-bold text-gray-900">3 817 840 XOF</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Prime qualité RA estimée (si ≥95% Grade AA)</span>
                  <span className="font-semibold text-[#2E7D32]">+ 284 000 XOF</span>
                </div>
                <div className="flex justify-between text-base font-bold pt-2 border-t border-gray-100">
                  <span className="text-gray-800">Total avec prime 🎉</span>
                  <span className="text-[#2E7D32]">4 101 840 XOF</span>
                </div>
              </div>
            </div>

            {/* Comparaison */}
            <div className="rounded-2xl border border-green-100 bg-green-50 p-5">
              <h2 className="text-sm font-semibold text-green-800 mb-3">Comparaison avec l&apos;année dernière</h2>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 rounded-xl bg-white/70 p-3 text-center">
                  <p className="text-xs text-gray-500 mb-1">Même période an dernier</p>
                  <p className="text-xl font-bold text-gray-800">1 042 XOF/kg</p>
                </div>
                <div className="flex-1 rounded-xl bg-white/70 p-3 text-center">
                  <p className="text-xs text-gray-500 mb-1">Aujourd&apos;hui</p>
                  <p className="text-xl font-bold text-[#2E7D32]">1 087 XOF/kg</p>
                </div>
                <div className="flex-1 rounded-xl bg-green-200/40 p-3 text-center">
                  <p className="text-xs text-green-600 mb-1">Gain pour vous</p>
                  <p className="text-xl font-bold text-green-700">+4,3% ✅</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Messagerie ──────────────────────────────────────────────── */}
        {tab === "Messagerie" && (
          <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden flex flex-col" style={{ minHeight: 480 }}>
            <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center">
                <span className="text-sm font-bold text-green-700">CA</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">Coopérative AGRIFRIK</p>
                <p className="text-xs text-gray-400">Gestionnaire · En ligne</p>
              </div>
            </div>

            {/* fil messages */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4" style={{ maxHeight: 380 }}>
              {messages.map((msg, i) => {
                const isBamba = msg.from === "bamba";
                return (
                  <div key={i} className={`flex ${isBamba ? "justify-end" : "justify-start"}`}>
                    {!isBamba && (
                      <div className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center text-xs font-bold text-green-700 shrink-0 mr-2 mt-1">CA</div>
                    )}
                    <div className={`max-w-[75%] rounded-2xl px-4 py-2.5 ${isBamba ? "bg-[#2E7D32] text-white rounded-br-sm" : "bg-gray-100 text-gray-800 rounded-bl-sm"}`}>
                      {!isBamba && <p className="text-[10px] font-semibold text-green-700 mb-1">AGRIFRIK</p>}
                      <p className="text-sm leading-relaxed">{msg.texte}</p>
                      <p className={`text-[10px] mt-1 flex items-center gap-1 ${isBamba ? "text-green-200 justify-end" : "text-gray-400"}`}>
                        {msg.heure}
                        {isBamba && msg.lu && <span>✅ Lu</span>}
                        {!isBamba && (msg as { nonlu?: boolean }).nonlu && <span className="ml-1 text-[9px] px-1.5 py-0.5 rounded-full bg-blue-500 text-white font-bold">Non lu</span>}
                      </p>
                    </div>
                    {isBamba && (
                      <div className="w-7 h-7 rounded-full bg-[#2E7D32] flex items-center justify-center text-xs font-bold text-white shrink-0 ml-2 mt-1">BK</div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* saisie */}
            <div className="px-4 py-3 border-t border-gray-100 shrink-0">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={newMsg}
                  onChange={(e) => setNewMsg(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") sendMsg(); }}
                  placeholder="Votre message..."
                  className="flex-1 text-sm bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:border-[#2E7D32] placeholder-gray-400"
                />
                <button
                  onClick={sendMsg}
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors hover:opacity-90"
                  style={{ background: "#2E7D32" }}
                >
                  <Send size={16} color="white" />
                </button>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
