"use client";

import { useState } from "react";
import Topbar from "../../components/Topbar";
import {
  Brain, MessageSquare, BarChart2, History,
  Send, Bot, User, TrendingUp, TrendingDown,
  CheckCircle, AlertTriangle, Info, Leaf, ShoppingCart, Wrench, Eye,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────── */
/*  TYPES & DONNÉES                                            */
/* ─────────────────────────────────────────────────────────── */

interface Msg { role: "user" | "ai"; text: string }

const INITIAL_MSGS: Msg[] = [
  { role: "user", text: "Quand est-ce que je devrais récolter PAR-A1 ?" },
  {
    role: "ai",
    text: "D'après la phénologie de T-60/887 et les stades cabosses observés (70% stade vert mature au 10/07), la récolte principale de PAR-A1 serait optimale entre le 20 octobre et le 10 novembre 2025. À cette date, l'estimation de production est de 7,9-8,1 tonnes de cacao frais, soit environ 2,5-2,6 tonnes de fèves sèches. Voulez-vous que je planifie les ressources humaines nécessaires ?",
  },
  { role: "user", text: "Oui, planifie les ressources" },
  {
    role: "ai",
    text: "Pour une récolte de 8t sur 6,2 ha, vous aurez besoin de : 12 récolteurs × 15 jours (rémunération estimée : 900 000 XOF), 4 manutentionnaires fermentation (Ibrahim S. + 3 saisonniers), et 2 sessions de fermentation en séquence (LOT-OCT-A et LOT-OCT-B). Je peux créer automatiquement le planning RH et les commandes d'emballages. Confirmer ?",
  },
];

const SUGGESTIONS = [
  "Quel engrais pour le cacao en floraison ?",
  "Prévision rendement PAR-A1 saison 2025",
  "Traitement recommandé contre la capsule du cacao ?",
  "Optimiser calendrier récolte anacarde",
  "Analyse risque climatique S2 2025",
  "Comment améliorer la qualité du séchage ?",
  "Prévision prix cacao BCC octobre 2025",
];

const QUICK_CHIPS = ["Analyse météo 14 jours", "Optimiser récolte cacao", "Bilan phytosanitaire"];

/* ─── Scénarios de production ───────────────────────────── */
const SCENARIOS = [
  { label: "Optimiste", prob: "25%", prod: "26,4 t", grade: "Grade AA 70%", ca: "29,4M XOF", hypotheses: "Météo favorable, zéro malade", color: "#2E7D32", bg: "#E8F5E9" },
  { label: "Baseline", prob: "55%", prod: "22,8 t", grade: "Grade AA 64%", ca: "24,8M XOF", hypotheses: "Météo normale, traitement préventif OK", color: "#1565C0", bg: "#EFF6FF" },
  { label: "Pessimiste", prob: "20%", prod: "18,2 t", grade: "Grade AA 55%", ca: "18,9M XOF", hypotheses: "Épisode El Niño sévère Oct-Nov", color: "#B71C1C", bg: "#FFF5F5" },
];

/* ─── Historique recommandations ────────────────────────── */
const HISTORIQUE = [
  { date: "08/07", type: "Traitement", reco: "Appliquer Super Cupravit PAR-A1 avant pluies 10/07", statut: "suivi", impact: "Zéro Phytophthora détecté 10j après" },
  { date: "01/07", type: "Vente", reco: "Vendre 4t Grade AA à 1 082 XOF/kg avant mi-juillet", statut: "suivi", impact: "CA additionnel : 4 328 000 XOF" },
  { date: "25/06", type: "Planning", reco: "Démarrer LOT-047 fermentation le 28/06 (météo T° optimale)", statut: "suivi", impact: "T° fermentation 48°C → Grade AA 97% ✅" },
  { date: "15/06", type: "RH", reco: "Recruter 2 saisonniers supplémentaires avant la petite récolte", statut: "suivi", impact: "Récolte terminée 3j avant prévision" },
  { date: "10/06", type: "Phyto", reco: "Traitement curatif Phytophthora PAR-B1 urgent (observation 2 cabosses)", statut: "suivi", impact: "Éradication confirmée 15/06" },
  { date: "05/06", type: "Qualité", reco: "Arrêter séchage LOT-045 à J7 (humidité cible 7,2%)", statut: "suivi", impact: "Classement Grade AA — prime +8%" },
  { date: "28/05", type: "Vente", reco: "Contrat à terme 10t à 1 055 XOF/kg avec STC-CI", statut: "suivi", impact: "Couverture prix sécurisée — gain vs spot : +320 000 XOF" },
  { date: "20/05", type: "Agronomie", reco: "Épandage NPK 20-10-10 sur PAR-A2 avant floraison", statut: "non_suivi", impact: "Floraison PAR-A2 : -12% vs projection (retard épandage)" },
  { date: "15/05", type: "Phyto", reco: "Inspection préventive mirides PAR-B1 (période risque élevé)", statut: "suivi", impact: "0 adulte/100 cabosses — aucun traitement requis" },
  { date: "08/05", type: "Planification", reco: "Attente 8j supplémentaires pour récolte anacarde PAR-C1 (maturité)", statut: "suivi", impact: "Qualité WW240 vs WW180 — prime qualité +680 000 XOF" },
];

/* ─── SVG Area chart — Prévision production ─────────────── */
function ProdAreaChart() {
  const W = 640, H = 220;
  const padL = 44, padR = 20, padT = 28, padB = 36;
  const chartW = W - padL - padR;
  const chartH = H - padT - padB;

  // Historical Jul24→Jun25 (12 mois)
  const hist = [18,14,9,8,10,22,24,26,18,11,8,12];
  // Forecast Jul25→Jun26
  const fore = [11,8,8,10,22,24,26,18,11,8,9,13];
  const maxVal = 30;

  const toX = (i: number, total: number) => padL + (i / (total - 1)) * chartW;
  const toY = (v: number) => padT + chartH - (v / maxVal) * chartH;

  const histPts = hist.map((v, i) => ({ x: toX(i, 24), y: toY(v) }));
  const forePts = fore.map((v, i) => ({ x: toX(i + 12, 24), y: toY(v) }));

  const histPath = histPts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");
  const forePath = forePts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");

  // Upper/Lower bounds for uncertainty (+/-15%)
  const foreUpper = forePts.map((p, i) => ({ x: p.x, y: toY(fore[i] * 1.15) }));
  const foreLower = forePts.map((p, i) => ({ x: p.x, y: toY(fore[i] * 0.85) }));
  const bandPath = [
    ...foreUpper.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`),
    ...[...foreLower].reverse().map((p, i) => `L${p.x},${p.y}`),
    "Z",
  ].join(" ");

  const months = ["J","A","S","O","N","D","J","F","M","A","M","J","J","A","S","O","N","D","J","F","M","A","M","J"];
  const yTicks = [0, 10, 20, 30];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: H }}>
      <defs>
        <linearGradient id="histFill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#1565C0" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#1565C0" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Grid */}
      {yTicks.map((t) => {
        const y = toY(t);
        return (
          <g key={t}>
            <line x1={padL} x2={W - padR} y1={y} y2={y} stroke="#F3F4F6" strokeWidth={1} />
            <text x={padL - 6} y={y + 4} textAnchor="end" fontSize={9} fill="#9CA3AF">{t}t</text>
          </g>
        );
      })}
      {/* Month labels */}
      {months.map((m, i) => (
        <text key={i} x={toX(i, 24)} y={H - 8} textAnchor="middle" fontSize={8} fill="#9CA3AF">{m}</text>
      ))}
      {/* Transition line */}
      <line x1={toX(12, 24)} x2={toX(12, 24)} y1={padT} y2={H - padB} stroke="#E5E7EB" strokeWidth={1} strokeDasharray="4 3" />
      <text x={toX(12, 24) + 4} y={padT + 10} fontSize={8} fill="#9CA3AF">Prévisions →</text>
      {/* Historical area */}
      <path d={`${histPath} L${histPts[histPts.length-1].x},${toY(0)} L${histPts[0].x},${toY(0)} Z`} fill="url(#histFill)" />
      <path d={histPath} fill="none" stroke="#1565C0" strokeWidth={2} />
      {/* Uncertainty band */}
      <path d={bandPath} fill="#2E7D32" opacity={0.12} />
      {/* Forecast line */}
      <path d={forePath} fill="none" stroke="#2E7D32" strokeWidth={2} strokeDasharray="6 3" />
      {/* Annotation */}
      <rect x={toX(15, 24) - 4} y={padT + 4} width={160} height={18} rx={4} fill="#FEF3C7" />
      <text x={toX(15, 24) + 76} y={padT + 16} textAnchor="middle" fontSize={9} fill="#92400E" fontWeight="bold">
        Récolte principale Oct-Déc 2025 : 22-24t
      </text>
      {/* Legend */}
      <line x1={padL} x2={padL + 20} y1={8} y2={8} stroke="#1565C0" strokeWidth={2} />
      <text x={padL + 24} y={12} fontSize={9} fill="#6B7280">Réel 2024-25</text>
      <line x1={padL + 90} x2={padL + 110} y1={8} y2={8} stroke="#2E7D32" strokeWidth={2} strokeDasharray="6 3" />
      <text x={padL + 114} y={12} fontSize={9} fill="#6B7280">Prévision IA 2025-26</text>
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────── */
/*  COMPOSANT PRINCIPAL                                        */
/* ─────────────────────────────────────────────────────────── */

type TabKey = "assistant" | "predictions" | "anomalies" | "historique";

export default function IAPage() {
  const [tab, setTab] = useState<TabKey>("assistant");
  const [msgs, setMsgs] = useState<Msg[]>([...INITIAL_MSGS]);
  const [input, setInput] = useState("");

  const sendMsg = (text: string) => {
    if (!text.trim()) return;
    setMsgs((prev) => [
      ...prev,
      { role: "user", text },
      { role: "ai", text: "🤖 Analyse en cours... Je consulte les données de vos parcelles, l'historique de traitement et les conditions météo actuelles. Réponse disponible dans quelques instants." },
    ]);
    setInput("");
  };

  const TABS: { key: TabKey; label: string; icon: React.ReactNode }[] = [
    { key: "assistant",   label: "Assistant",            icon: <Brain size={14} /> },
    { key: "predictions", label: "Analyses prédictives", icon: <BarChart2 size={14} /> },
    { key: "anomalies",   label: "Détection anomalies",  icon: <AlertTriangle size={14} /> },
    { key: "historique",  label: "Historique",           icon: <History size={14} /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Topbar title="Assistant IA" breadcrumb={["IA & Données", "Assistant IA"]} />

      <div className="p-6 space-y-5">

        {/* ── Bandeau ── */}
        <div
          className="rounded-2xl px-6 py-5 text-white"
          style={{ background: "linear-gradient(135deg,#1B5E20 0%,#2E7D32 60%,#388E3C 100%)" }}
        >
          <div className="flex items-start gap-4 flex-wrap">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-1">
                <Brain size={22} className="text-green-200 shrink-0" />
                <h1 className="text-base font-bold">ARIA — Assistant de Recommandations Intelligentes pour l&apos;Agriculture</h1>
              </div>
              <p className="text-green-200 text-xs">
                Basé sur Claude AI + modèles agronomiques CNRA CI · Dernière màj : 11/07/2025 06:00
              </p>
            </div>
            <div className="flex flex-wrap gap-2 shrink-0">
              {["Précision 89%", "6 modèles ML", "38,4 ha analysés", "5 recos actives"].map((b) => (
                <span key={b} className="text-xs font-semibold px-3 py-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.15)" }}>
                  {b}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── Onglets ── */}
        <div className="flex flex-wrap gap-1 bg-white rounded-2xl border border-gray-100 p-1 shadow-sm w-fit">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all"
              style={tab === t.key ? { backgroundColor: "#2E7D32", color: "#fff" } : { color: "#6B7280" }}
            >
              {t.icon}
              {t.label}
            </button>
          ))}
        </div>

        {/* ══ ONGLET ASSISTANT ════════════════════════════════ */}
        {tab === "assistant" && (
          <div className="space-y-5">

            {/* Recommandations du jour */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5">
              <h2 className="font-semibold text-gray-900 text-sm mb-4 flex items-center gap-2">
                <Leaf size={15} color="#2E7D32" />
                Recommandations IA du jour
              </h2>
              <div className="space-y-3">
                {[
                  {
                    prio: "PRIORITÉ HAUTE", bg: "#FFF5F5", border: "#FCA5A5", badgeBg: "#FFEBEE", color: "#B71C1C",
                    icon: "🌱",
                    titre: "KCl critique (2 sacs) — Commander 6 sacs minimum dès aujourd'hui auprès de KCl Distribution (FRN-003). Livraison J+6. Window épandage optimal : 13-16 juillet.",
                    sources: "stocks.TS + meteo.TS + agronomic_model_cacao_v3",
                  },
                  {
                    prio: "OPPORTUNITÉ", bg: "#FFFBEB", border: "#FCD34D", badgeBg: "#FEF3C7", color: "#92400E",
                    icon: "💰",
                    titre: "Prix cacao BCC 1 087 XOF/kg (+45 vs il y a 30j). Marge brute actuelle : 10,9%. Recommandation : Vendre 5t de stock Grade AA cette semaine avant fluctuation baissière potentielle fin juillet (signal faible Euronext cocoa).",
                    sources: "prix-marche.TS + stocks.TS + market_signals",
                  },
                  {
                    prio: "PRÉVENTIF", bg: "#FFFBEB", border: "#FCD34D", badgeBg: "#FEF3C7", color: "#92400E",
                    icon: "🦟",
                    titre: "Risque mirides moyen-élevé détecté (modèle météo + historique). Inspection visuelle PAR-A2 et PAR-A3 recommandée avant 18 juillet. Traitement si >5 adultes/100 cabosses.",
                    sources: "meteo.TS + historique_traitements + pest_model_v2",
                  },
                  {
                    prio: "INFO", bg: "#EFF6FF", border: "#93C5FD", badgeBg: "#DBEAFE", color: "#1565C0",
                    icon: "🌡️",
                    titre: "Déficit hydrique estimé -14mm depuis 01/07 sur PAR-A1/A2. Stress léger — surveiller mais pas d'irrigation requise (prévisions pluies ce week-end : 40mm).",
                    sources: "meteo.TS + sol_analyse + evapotranspiration_model",
                  },
                  {
                    prio: "QUALITÉ", bg: "#F0FFF4", border: "#86EFAC", badgeBg: "#DCFCE7", color: "#166534",
                    icon: "📋",
                    titre: "Cut test LOT-048 demain (J6). Sur base de la courbe de température (T° J5 : 44°C), estimation 91-94% fèves brunes → Grade AA probable. Critère clé : température J6 à mesurer avant 07h00.",
                    sources: "transformation.TS + cut_test_model_cnra",
                  },
                ].map((r, i) => (
                  <div key={i} className="rounded-xl p-4" style={{ backgroundColor: r.bg, border: `1px solid ${r.border}` }}>
                    <div className="flex items-start gap-3">
                      <span className="text-lg flex-shrink-0">{r.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                          <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: r.badgeBg, color: r.color }}>
                            {r.prio}
                          </span>
                        </div>
                        <p className="text-xs text-gray-800 leading-relaxed">{r.titre}</p>
                        <p className="text-xs text-gray-400 mt-1.5">Sources : {r.sources}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Interface chat */}
            <div className="flex gap-4" style={{ alignItems: "stretch" }}>
              {/* Chat */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col" style={{ flex: "0 0 65%" }}>
                <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
                  <Bot size={16} color="#2E7D32" />
                  <span className="text-sm font-semibold text-gray-800">ARIA — Assistant AGRIFRIK</span>
                  <span className="ml-auto flex items-center gap-1 text-xs text-green-700 font-medium">
                    <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
                    En ligne
                  </span>
                </div>
                <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4" style={{ minHeight: 280, maxHeight: 400 }}>
                  {msgs.map((m, i) => (
                    <div key={i} className={`flex gap-2 ${m.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                        style={m.role === "user" ? { backgroundColor: "#2E7D32" } : { backgroundColor: "#F3F4F6" }}
                      >
                        {m.role === "user" ? <User size={13} color="#fff" /> : <Bot size={13} color="#374151" />}
                      </div>
                      <div
                        className="rounded-2xl px-4 py-3 text-xs leading-relaxed max-w-[80%]"
                        style={m.role === "user"
                          ? { backgroundColor: "#F0FFF4", color: "#1B5E20" }
                          : { backgroundColor: "#F9FAFB", color: "#374151" }}
                      >
                        {m.text}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-5 py-2 flex flex-wrap gap-2 border-t border-gray-50">
                  {QUICK_CHIPS.map((c) => (
                    <button key={c} onClick={() => sendMsg(c)}
                      className="text-xs px-3 py-1.5 rounded-full border font-medium hover:bg-green-50 transition-colors"
                      style={{ borderColor: "#2E7D32", color: "#2E7D32" }}>
                      {c}
                    </button>
                  ))}
                </div>
                <div className="px-5 py-4 border-t border-gray-100 flex gap-2">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMsg(input)}
                    placeholder="Posez votre question agronomique..."
                    className="flex-1 text-xs rounded-xl border border-gray-200 px-4 py-2.5 outline-none focus:border-green-400"
                  />
                  <button onClick={() => sendMsg(input)}
                    className="px-4 py-2 rounded-xl text-white text-xs font-semibold flex items-center gap-1.5 hover:opacity-80 transition-opacity"
                    style={{ backgroundColor: "#2E7D32" }}>
                    <Send size={13} /> Envoyer
                  </button>
                </div>
              </div>
              {/* Suggestions */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5" style={{ flex: "0 0 calc(35% - 16px)" }}>
                <h3 className="text-xs font-bold text-gray-700 mb-3 flex items-center gap-2">
                  <MessageSquare size={13} color="#2E7D32" />
                  Suggestions
                </h3>
                <div className="space-y-2">
                  {SUGGESTIONS.map((s) => (
                    <button key={s} onClick={() => setInput(s)}
                      className="w-full text-left text-xs px-3 py-2.5 rounded-xl border border-gray-100 text-gray-700 hover:border-green-300 hover:bg-green-50 transition-colors leading-snug">
                      {s}
                    </button>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
                  <p className="text-xs font-bold text-gray-600">Performance ARIA</p>
                  {[
                    { label: "Recommandations émises", val: "1 248", color: "#2E7D32" },
                    { label: "Précision moyenne", val: "89%", color: "#1565C0" },
                    { label: "Taux de suivi", val: "84%", color: "#92400E" },
                  ].map((s) => (
                    <div key={s.label} className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{s.label}</span>
                      <span className="text-xs font-bold" style={{ color: s.color }}>{s.val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ══ ONGLET ANALYSES PRÉDICTIVES ═════════════════════ */}
        {tab === "predictions" && (
          <div className="space-y-5">

            {/* Area chart */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5">
              <h2 className="font-semibold text-gray-900 text-sm mb-4 flex items-center gap-2">
                <TrendingUp size={15} color="#2E7D32" />
                Prévision de production cacao 2025-2026
              </h2>
              <ProdAreaChart />
              <p className="text-xs text-gray-400 mt-2">
                Zone ombrée = intervalle d&apos;incertitude ±15% · Courbe bleue = historique réel · Courbe verte pointillée = prévision IA
              </p>
            </div>

            {/* 3 scénarios */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5">
              <h2 className="font-semibold text-gray-900 text-sm mb-4 flex items-center gap-2">
                <BarChart2 size={15} color="#1565C0" />
                Scénarios de production 2025-2026
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr style={{ backgroundColor: "#F8FBF8" }}>
                      {["Scénario","Probabilité","Production","CA estimé","Hypothèses"].map((h) => (
                        <th key={h} className="text-left px-4 py-3 font-semibold text-gray-500 whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {SCENARIOS.map((s) => (
                      <tr key={s.label} className="hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <span className="font-bold text-xs px-2 py-1 rounded-full" style={{ backgroundColor: s.bg, color: s.color }}>{s.label}</span>
                        </td>
                        <td className="px-4 py-3 font-bold" style={{ color: s.color }}>{s.prob}</td>
                        <td className="px-4 py-3 font-semibold text-gray-800">{s.prod}<br/><span className="font-normal text-gray-500">{s.grade}</span></td>
                        <td className="px-4 py-3 font-bold text-gray-900">{s.ca}</td>
                        <td className="px-4 py-3 text-gray-600">{s.hypotheses}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Prévision prix */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5">
              <h2 className="font-semibold text-gray-900 text-sm mb-4 flex items-center gap-2">
                <TrendingUp size={15} color="#E65100" />
                Prévision prix cacao BCC (3 mois)
              </h2>
              <div className="grid grid-cols-4 gap-3">
                {[
                  { label: "Jul 25", val: "1 087 XOF/kg", change: "Actuel", color: "#374151", bg: "#F9FAFB" },
                  { label: "Aoû 25", val: "1 092 XOF/kg", change: "+0,5%", color: "#2E7D32", bg: "#E8F5E9" },
                  { label: "Sep 25", val: "1 098 XOF/kg", change: "+0,6%", color: "#2E7D32", bg: "#E8F5E9" },
                  { label: "Oct 25", val: "1 072 XOF/kg", change: "-2,4%", color: "#B71C1C", bg: "#FFF5F5" },
                ].map((p) => (
                  <div key={p.label} className="rounded-xl p-4 text-center" style={{ backgroundColor: p.bg }}>
                    <div className="text-xs font-semibold text-gray-500 mb-1">{p.label}</div>
                    <div className="text-sm font-bold text-gray-900">{p.val}</div>
                    <div className="text-xs font-semibold mt-1" style={{ color: p.color }}>{p.change}</div>
                  </div>
                ))}
              </div>
              <div className="mt-3 flex items-start gap-2 text-xs text-gray-500 p-3 bg-gray-50 rounded-xl">
                <Info size={12} className="flex-shrink-0 mt-0.5" />
                <span>Baisse attendue en octobre (début de la grande récolte mondiale — effet saisonnalité Euronext cocoa). Signal faible pour rebond décembre.</span>
              </div>
            </div>
          </div>
        )}

        {/* ══ ONGLET DÉTECTION ANOMALIES ══════════════════════ */}
        {tab === "anomalies" && (
          <div className="space-y-4">
            <h2 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <AlertTriangle size={15} color="#E65100" />
              3 anomalies détectées — triées par sévérité
            </h2>

            {/* Critique */}
            <div className="rounded-2xl p-5" style={{ backgroundColor: "#FFF5F5", border: "1px solid #FCA5A5" }}>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#FFEBEE" }}>
                  <AlertTriangle size={18} color="#B71C1C" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ backgroundColor: "#FFEBEE", color: "#B71C1C" }}>🔴 CRITIQUE</span>
                    <span className="text-sm font-bold text-gray-900">Stock KCl tombé sous le seuil critique</span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed mb-2">
                    2 sacs restants vs seuil 5 sacs. Risque de manquer la fenêtre d&apos;épandage optimale (13-16 juillet). Impact estimé : <strong>-8% rendement PAR-A1</strong> si épandage retardé &gt;30j.
                  </p>
                  <div className="flex gap-2 mt-3">
                    <button className="text-xs font-bold px-4 py-2 rounded-xl text-white flex items-center gap-1.5" style={{ backgroundColor: "#B71C1C" }}>
                      <ShoppingCart size={12} /> Commander FRN-003
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Attention */}
            <div className="rounded-2xl p-5" style={{ backgroundColor: "#FFFBEB", border: "1px solid #FCD34D" }}>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#FEF3C7" }}>
                  <Wrench size={18} color="#92400E" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ backgroundColor: "#FEF3C7", color: "#92400E" }}>🟡 ATTENTION</span>
                    <span className="text-sm font-bold text-gray-900">Consommation carburant tracteur DT55 anormale</span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed mb-2">
                    5,8L/h vs 5,2L/h en moyenne (+11%). Possible problème moteur ou filtre encrassé. Recommandé : vérification avant la saison des récoltes.
                  </p>
                  <div className="flex gap-2 mt-3">
                    <button className="text-xs font-bold px-4 py-2 rounded-xl text-white flex items-center gap-1.5" style={{ backgroundColor: "#92400E" }}>
                      <Wrench size={12} /> Créer ordre maintenance
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="rounded-2xl p-5" style={{ backgroundColor: "#F0FFF4", border: "1px solid #86EFAC" }}>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#DCFCE7" }}>
                  <Eye size={18} color="#166534" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ backgroundColor: "#DCFCE7", color: "#166534" }}>🟢 INFO</span>
                    <span className="text-sm font-bold text-gray-900">Score santé PAR-B2 en légère baisse</span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed mb-2">
                    Score de 85 → 78/100 en 2 mois. Corrélation avec déficit potassium détecté en mars 2025. L&apos;épandage KCl prévu le 15/07 devrait corriger la tendance.
                  </p>
                  <div className="flex gap-2 mt-3">
                    <button className="text-xs font-bold px-4 py-2 rounded-xl text-white flex items-center gap-1.5" style={{ backgroundColor: "#166534" }}>
                      <Eye size={12} /> Planifier inspection
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ══ ONGLET HISTORIQUE ═══════════════════════════════ */}
        {tab === "historique" && (
          <div className="rounded-2xl border border-gray-100 bg-white p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-gray-900 text-sm flex items-center gap-2">
                <History size={15} color="#2E7D32" />
                30 dernières recommandations IA
              </h2>
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <span className="flex items-center gap-1"><CheckCircle size={11} color="#2E7D32" /> Suivi</span>
                <span className="flex items-center gap-1"><AlertTriangle size={11} color="#E65100" /> Non suivi</span>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr style={{ backgroundColor: "#F8FBF8" }}>
                    {["Date","Type","Recommandation","Statut","Impact mesuré"].map((h) => (
                      <th key={h} className="text-left px-3 py-2.5 font-semibold text-gray-500 whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {HISTORIQUE.map((r, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="px-3 py-2.5 font-mono text-gray-500 whitespace-nowrap">{r.date}</td>
                      <td className="px-3 py-2.5">
                        <span className="px-2 py-0.5 rounded-full text-xs font-medium" style={{ backgroundColor: "#F3F4F6", color: "#374151" }}>
                          {r.type}
                        </span>
                      </td>
                      <td className="px-3 py-2.5 text-gray-700 max-w-xs">{r.reco}</td>
                      <td className="px-3 py-2.5">
                        {r.statut === "suivi" ? (
                          <span className="flex items-center gap-1 text-green-700 font-semibold">
                            <CheckCircle size={11} /> Suivi
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 font-semibold" style={{ color: "#E65100" }}>
                            <AlertTriangle size={11} /> Non suivi
                          </span>
                        )}
                      </td>
                      <td className="px-3 py-2.5 text-gray-600">{r.impact}</td>
                    </tr>
                  ))}
                  {/* Placeholder rows */}
                  {Array.from({ length: 20 }).map((_, i) => (
                    <tr key={`placeholder-${i}`} className="hover:bg-gray-50">
                      <td className="px-3 py-2.5 text-gray-300 font-mono">{`${String(Math.max(1, 10 - Math.floor(i / 3))).padStart(2, "0")}/${String(Math.max(1, 6 - Math.floor(i / 7))).padStart(2, "0")}`}</td>
                      <td className="px-3 py-2.5"><span className="px-2 py-0.5 rounded-full text-xs font-medium" style={{ backgroundColor: "#F3F4F6", color: "#9CA3AF" }}>—</span></td>
                      <td className="px-3 py-2.5 text-gray-300">...</td>
                      <td className="px-3 py-2.5"><span className="flex items-center gap-1 text-green-400 font-semibold"><CheckCircle size={11} /> Suivi</span></td>
                      <td className="px-3 py-2.5 text-gray-300">—</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Stats résumé */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
              {[
                { label: "Recommandations émises", val: "30", color: "#374151", bg: "#F9FAFB" },
                { label: "Suivies", val: "25", color: "#2E7D32", bg: "#E8F5E9" },
                { label: "Non suivies", val: "5", color: "#E65100", bg: "#FFF3E0" },
                { label: "Taux de suivi", val: "83%", color: "#1565C0", bg: "#EFF6FF" },
              ].map((s) => (
                <div key={s.label} className="rounded-xl p-3 text-center" style={{ backgroundColor: s.bg }}>
                  <div className="text-xl font-black mb-0.5" style={{ color: s.color }}>{s.val}</div>
                  <div className="text-xs text-gray-500">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Footer ── */}
        <div className="flex items-center gap-2 text-xs text-gray-400 pb-2">
          <Info size={13} />
          <span>Les recommandations ARIA sont indicatives et basées sur des modèles agronomiques. Consulter un agronome certifié pour les décisions critiques.</span>
        </div>

      </div>
    </div>
  );
}
