"use client";

import { useState } from "react";
import Topbar from "../../components/Topbar";
import { Bot, User, Send, CheckCircle, Clock, TrendingUp } from "lucide-react";

/* ─────────────────────────────────────────────────────────── */
/*  TYPES                                                       */
/* ─────────────────────────────────────────────────────────── */
type Tab = "chat" | "recommandations" | "analyses";
interface Msg { role: "user" | "ai"; author: string; time: string; text: string | React.ReactNode }

/* ─────────────────────────────────────────────────────────── */
/*  DONNÉES CHAT                                               */
/* ─────────────────────────────────────────────────────────── */
const INIT_MSGS: Msg[] = [
  {
    role: "user", author: "Koffi Amani", time: "08h15",
    text: "ARIA, le comptage de mirides sur PAR-A1 donne 3,2 capsides/100 cabosses hier. Doit-on traiter maintenant ?",
  },
  {
    role: "ai", author: "ARIA", time: "08h16",
    text: (
      <span>
        Bonjour Koffi. Analyse en cours...<br /><br />
        Seuil d&apos;intervention économique (SIE) Rainforest Alliance : 5 capsides/100 cabosses.
        Résultat actuel : 3,2 — vous êtes à <strong>64% du SIE</strong>.<br /><br />
        <strong>Ma recommandation :</strong> Traitement préventif justifié maintenant car :<br />
        1. Tendance haussière (+0,8 capside en 2 semaines)<br />
        2. Entrée en grande récolte dans 84 jours (15/10)<br />
        3. Météo favorable aux mirides prévue 13-20/07 (T°&gt;30°C, HR&lt;65%)<br /><br />
        <strong>Produit recommandé :</strong> Cypercal 50 EC — 1,5L/ha × 3,8ha = 5,7L — Conformité RA ✅ — DAR 7j.<br />
        <strong>Fenêtre idéale :</strong> 15/07 entre 6h et 9h (fraîcheur, pas de vent).<br /><br />
        Dois-je créer la tâche et le bon de commande Cypercal si stock insuffisant ?
      </span>
    ),
  },
  {
    role: "user", author: "Koffi Amani", time: "08h22",
    text: "Oui, crée la tâche et vérifie le stock.",
  },
  {
    role: "ai", author: "ARIA", time: "08h22",
    text: (
      <span>
        ✅ Tâche créée : &apos;Traitement mirides PAR-A1&apos; assignée à Ibrahim Sawadogo — Échéance 15/07/2025.<br /><br />
        Stock Cypercal : 1,2L disponible (ENT-001 Zone C). Besoin : 5,7L → Déficit 4,5L.<br />
        ✅ Bon de commande créé : ACH-2025-024 — Agri-Input CI — Cypercal 50 EC 5L — Livraison demain.
      </span>
    ),
  },
];

const CONVERSATIONS = [
  { id: 1, title: "Traitement mirides 11/07", active: true },
  { id: 2, title: "Fermentation LOT-047 10/07", active: false },
  { id: 3, title: "Prévision récolte 08/07", active: false },
  { id: 4, title: "Qualité eau PSC-001 05/07", active: false },
  { id: 5, title: "Cours cacao 03/07", active: false },
];

/* ─────────────────────────────────────────────────────────── */
/*  SVG LINE CHART — Précision prédictions ARIA               */
/* ─────────────────────────────────────────────────────────── */
function PrecisionChart() {
  const W = 640, H = 200;
  const padL = 44, padR = 20, padT = 28, padB = 36;
  const cW = W - padL - padR;
  const cH = H - padT - padB;
  const data = [88, 90, 92, 91, 94, 95, 94];
  const months = ["Jan", "Fév", "Mar", "Avr", "Mai", "Jui", "Jul"];
  const minV = 80, maxV = 100;
  const toX = (i: number) => padL + (i / (data.length - 1)) * cW;
  const toY = (v: number) => padT + cH - ((v - minV) / (maxV - minV)) * cH;
  const linePath = data.map((v, i) => `${i === 0 ? "M" : "L"}${toX(i)},${toY(v)}`).join(" ");
  const areaPath = `${linePath} L${toX(data.length - 1)},${toY(minV)} L${toX(0)},${toY(minV)} Z`;
  const objY = toY(90);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: H }}>
      <defs>
        <linearGradient id="precFill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#2E7D32" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#2E7D32" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[80, 85, 90, 95, 100].map((t) => {
        const y = toY(t);
        return (
          <g key={t}>
            <line x1={padL} x2={W - padR} y1={y} y2={y} stroke="#F3F4F6" strokeWidth={1} />
            <text x={padL - 6} y={y + 4} textAnchor="end" fontSize={9} fill="#9CA3AF">{t}%</text>
          </g>
        );
      })}
      {months.map((m, i) => (
        <text key={i} x={toX(i)} y={H - 8} textAnchor="middle" fontSize={9} fill="#9CA3AF">{m}</text>
      ))}
      <line x1={padL} x2={W - padR} y1={objY} y2={objY} stroke="#E65100" strokeWidth={1.5} strokeDasharray="6 3" />
      <text x={W - padR - 2} y={objY - 4} textAnchor="end" fontSize={8} fill="#E65100">Objectif 90%</text>
      <path d={areaPath} fill="url(#precFill)" />
      <path d={linePath} fill="none" stroke="#2E7D32" strokeWidth={2.5} />
      {data.map((v, i) => (
        <circle key={i} cx={toX(i)} cy={toY(v)} r={4} fill="#2E7D32" stroke="white" strokeWidth={1.5} />
      ))}
      {data.map((v, i) => (
        <text key={i} x={toX(i)} y={toY(v) - 8} textAnchor="middle" fontSize={8} fill="#1B5E20" fontWeight="700">{v}%</text>
      ))}
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────── */
/*  PAGE PRINCIPALE                                            */
/* ─────────────────────────────────────────────────────────── */
export default function IAPage() {
  const [tab, setTab] = useState<Tab>("chat");
  const [msgs, setMsgs] = useState<Msg[]>([...INIT_MSGS]);
  const [input, setInput] = useState("");
  const [activeConv, setActiveConv] = useState(1);

  function sendMsg() {
    if (!input.trim()) return;
    setMsgs((prev) => [
      ...prev,
      { role: "user", author: "Koffi Amani", time: "maintenant", text: input },
      {
        role: "ai", author: "ARIA", time: "maintenant",
        text: "Analyse en cours... Je consulte les données de vos parcelles, l'historique de traitement et les conditions météo actuelles. Réponse disponible dans quelques instants.",
      },
    ]);
    setInput("");
  }

  const TABS: { key: Tab; label: string }[] = [
    { key: "chat", label: "Chat ARIA" },
    { key: "recommandations", label: "Recommandations" },
    { key: "analyses", label: "Analyses" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Topbar title="IA — ARIA" breadcrumb={["IA & Données", "Assistant IA"]} />

      <div className="p-6 space-y-5">

        {/* ── En-tête ── */}
        <div className="rounded-2xl px-6 py-5 text-white" style={{ background: "linear-gradient(135deg,#1B5E20 0%,#2E7D32 60%,#388E3C 100%)" }}>
          <div className="flex flex-wrap gap-4 items-start">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <Bot size={20} className="text-green-200 shrink-0" />
                <h1 className="text-base font-bold">ARIA — Intelligence Artificielle</h1>
              </div>
              <p className="text-green-200 text-xs">Votre assistant agronomique intelligent — Analyse, prédiction, recommandations</p>
              <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold" style={{ background: "rgba(255,255,255,0.15)" }}>
                🤖 ARIA v2.1 | Modèle : Agricultural AI (Powered by Claude)
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 shrink-0">
              {[
                { val: "47", label: "analyses réalisées" },
                { val: "94%", label: "précision prédictions" },
                { val: "3", label: "alertes actives" },
                { val: "11/07 08:30", label: "dernière mise à jour" },
              ].map((k) => (
                <div key={k.label} className="rounded-xl px-3 py-2 text-center" style={{ background: "rgba(255,255,255,0.12)" }}>
                  <div className="text-sm font-black">{k.val}</div>
                  <div className="text-green-200 text-xs leading-tight">{k.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Onglets ── */}
        <div className="flex gap-1 bg-white rounded-2xl border border-gray-100 p-1 shadow-sm w-fit">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className="px-4 py-2 rounded-xl text-xs font-semibold transition-all"
              style={tab === t.key ? { backgroundColor: "#2E7D32", color: "#fff" } : { color: "#6B7280" }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* ══ ONGLET CHAT ════════════════════════════════════════ */}
        {tab === "chat" && (
          <div className="flex gap-4" style={{ height: 560 }}>

            {/* Colonne gauche — historique */}
            <div className="rounded-2xl border border-gray-100 bg-white flex flex-col shrink-0" style={{ width: 240 }}>
              <div className="px-4 py-3 border-b border-gray-100 text-xs font-bold text-gray-700">Historique conversations</div>
              <div className="flex-1 overflow-y-auto py-2">
                {CONVERSATIONS.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setActiveConv(c.id)}
                    className="w-full text-left px-4 py-2.5 text-xs transition-colors"
                    style={activeConv === c.id
                      ? { backgroundColor: "#E8F5E9", color: "#1B5E20", fontWeight: 600 }
                      : { color: "#6B7280" }}
                  >
                    {c.title}
                  </button>
                ))}
              </div>
              <div className="p-3 border-t border-gray-100">
                <button
                  className="w-full text-xs py-2 rounded-xl font-semibold text-white"
                  style={{ backgroundColor: "#2E7D32" }}
                >
                  + Nouvelle conversation
                </button>
              </div>
            </div>

            {/* Zone centrale — chat */}
            <div className="flex-1 rounded-2xl border border-gray-100 bg-white flex flex-col min-w-0">
              <div className="px-5 py-3 border-b border-gray-100 flex items-center gap-2">
                <Bot size={15} color="#2E7D32" />
                <span className="text-sm font-bold text-gray-800">ARIA — Assistant AGRIFRIK</span>
                <span className="ml-auto flex items-center gap-1 text-xs text-green-700 font-medium">
                  <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
                  En ligne
                </span>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
                {msgs.map((m, i) => (
                  <div key={i} className={`flex gap-2 ${m.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold"
                      style={m.role === "user" ? { backgroundColor: "#2E7D32", color: "#fff" } : { backgroundColor: "#F3F4F6", color: "#374151" }}
                    >
                      {m.role === "user" ? <User size={13} color="#fff" /> : <Bot size={13} color="#374151" />}
                    </div>
                    <div className="max-w-[80%]">
                      <div className="text-xs text-gray-400 mb-1" style={m.role === "user" ? { textAlign: "right" } : {}}>
                        {m.author} · {m.time}
                      </div>
                      <div
                        className="rounded-2xl px-4 py-3 text-xs leading-relaxed"
                        style={m.role === "user"
                          ? { backgroundColor: "#F0FFF4", color: "#1B5E20" }
                          : { backgroundColor: "#F9FAFB", color: "#374151" }}
                      >
                        {m.text}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Saisie */}
              <div className="px-5 py-4 border-t border-gray-100 flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMsg()}
                  placeholder="Posez votre question à ARIA..."
                  className="flex-1 text-xs rounded-xl border border-gray-200 px-4 py-2.5 outline-none focus:border-green-400"
                />
                <button
                  onClick={sendMsg}
                  className="px-4 py-2 rounded-xl text-white text-xs font-semibold flex items-center gap-1.5"
                  style={{ backgroundColor: "#2E7D32" }}
                >
                  <Send size={12} /> Envoyer
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ══ ONGLET RECOMMANDATIONS ══════════════════════════════ */}
        {tab === "recommandations" && (
          <div className="space-y-4">

            <h2 className="text-sm font-bold text-gray-800">3 recommandations actives</h2>

            {/* Card 1 — Urgent */}
            <div className="rounded-2xl p-5 border" style={{ backgroundColor: "#FFF5F5", borderColor: "#FCA5A5" }}>
              <div className="flex items-start gap-3">
                <span className="text-xs font-bold px-2.5 py-1 rounded-full shrink-0" style={{ backgroundColor: "#FFEBEE", color: "#B71C1C" }}>
                  🔴 URGENT
                </span>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold text-gray-900 mb-2">Traitement mirides PAR-A1</div>
                  <div className="space-y-1 text-xs text-gray-700">
                    <p><strong>Analyse :</strong> Comptage 3,2 capsides/100 → tendance haussière — SIE à 64%</p>
                    <p><strong>Action recommandée :</strong> Cypercal 50 EC 15/07 entre 6h et 9h</p>
                    <p style={{ color: "#B71C1C" }}><strong>Impact si ignoré :</strong> Risque atteindre SIE avant 25/07 → traitement d&apos;urgence + perte potentielle 8-12% récolte</p>
                  </div>
                  <button className="mt-3 text-xs px-4 py-2 rounded-xl text-white font-semibold" style={{ backgroundColor: "#B71C1C" }}>
                    Appliquer la recommandation
                  </button>
                </div>
              </div>
            </div>

            {/* Card 2 — 7 jours */}
            <div className="rounded-2xl p-5 border" style={{ backgroundColor: "#FFFBEB", borderColor: "#FCD34D" }}>
              <div className="flex items-start gap-3">
                <span className="text-xs font-bold px-2.5 py-1 rounded-full shrink-0" style={{ backgroundColor: "#FEF3C7", color: "#92400E" }}>
                  🟡 7 JOURS
                </span>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold text-gray-900 mb-2">Fertilisation potassique PAR-B1</div>
                  <div className="space-y-1 text-xs text-gray-700">
                    <p><strong>Analyse :</strong> Déficit K détecté (0,18 meq/100g vs optimal 0,20). Grande récolte Oct → opportunité avant fermeture canopée</p>
                    <p><strong>Action recommandée :</strong> 2 sacs KCl/ha × 4,5ha = 9 sacs — enfouissement superficiel 10 cm</p>
                  </div>
                  <button className="mt-3 text-xs px-4 py-2 rounded-xl text-white font-semibold" style={{ backgroundColor: "#92400E" }}>
                    Planifier
                  </button>
                </div>
              </div>
            </div>

            {/* Card 3 — Suggestion */}
            <div className="rounded-2xl p-5 border" style={{ backgroundColor: "#F0FFF4", borderColor: "#86EFAC" }}>
              <div className="flex items-start gap-3">
                <span className="text-xs font-bold px-2.5 py-1 rounded-full shrink-0" style={{ backgroundColor: "#DCFCE7", color: "#166534" }}>
                  🟢 SUGGESTION
                </span>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold text-gray-900 mb-2">Optimisation alimentation tilapia PSC-001</div>
                  <div className="space-y-1 text-xs text-gray-700">
                    <p><strong>Analyse :</strong> FCR actuel 1,72. Passage Grower 4mm recommandé à partir de Lot poids &gt;300g (atteint le 12/07)</p>
                    <p><strong>Action :</strong> Changer aliment Tilapia Grower 3mm → 4mm dès le 12/07. Gain estimé FCR : 1,72 → 1,65</p>
                  </div>
                  <button className="mt-3 text-xs px-4 py-2 rounded-xl text-white font-semibold" style={{ backgroundColor: "#166534" }}>
                    Confirmer le changement
                  </button>
                </div>
              </div>
            </div>

            <h2 className="text-sm font-bold text-gray-800 pt-2">Recommandations passées (appliquées)</h2>
            <div className="rounded-2xl border border-gray-100 bg-white divide-y divide-gray-50">
              {[
                "Réduction fréquence traitement Phytophthora PAR-A2 (ARIA avait prédit faible risque) — Résultat : 0 infection LOT-046 ✅",
                "Vente cacao LOT-045 au cours 1 082 XOF — ARIA avait prédit légère baisse — Réalisé : cours a baissé à 1 075 XOF le lendemain ✅",
                "Alerte fermentation LOT-046 J3 (T°>52°C) — Ibrahim a retourné manuellement — Résultat grade AA 94% ✅",
              ].map((item, i) => (
                <div key={i} className="px-5 py-3 flex items-start gap-2">
                  <CheckCircle size={14} color="#2E7D32" className="mt-0.5 shrink-0" />
                  <span className="text-xs text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══ ONGLET ANALYSES ════════════════════════════════════ */}
        {tab === "analyses" && (
          <div className="space-y-5">

            {/* Line chart */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp size={15} color="#2E7D32" />
                <h2 className="text-sm font-bold text-gray-900">Précision prédictions ARIA — Jan-Jul 2025</h2>
              </div>
              <PrecisionChart />
              <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                <span className="flex items-center gap-1">
                  <span className="inline-block w-5 h-0.5 bg-green-700" />
                  Précision mensuelle
                </span>
                <span className="flex items-center gap-1">
                  <span className="inline-block w-5 h-0.5" style={{ background: "#E65100", borderTop: "1px dashed #E65100" }} />
                  Objectif 90%
                </span>
              </div>
            </div>

            {/* Tableau analyses */}
            <div className="rounded-2xl border border-gray-100 bg-white">
              <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
                <Clock size={14} color="#2E7D32" />
                <h2 className="text-sm font-bold text-gray-900">Analyses réalisées 2025</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr style={{ backgroundColor: "#F8FBF8" }}>
                      {["Type d'analyse", "Nb", "Précision", "Domaine"].map((h) => (
                        <th key={h} className="text-left px-4 py-3 font-semibold text-gray-500 whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {[
                      { type: "Prédictions météo agronomique", nb: 124, prec: "87%", domaine: "Météo × phytosanitaire" },
                      { type: "Recommandations traitements", nb: 38, prec: "96%", domaine: "Phytosanitaire" },
                      { type: "Prévisions de prix", nb: 18, prec: "91%", domaine: "Commerce" },
                      { type: "Qualité eau pisciculture", nb: 22, prec: "98%", domaine: "Pisciculture" },
                      { type: "Prédictions de récolte", nb: 12, prec: "89%", domaine: "Production" },
                    ].map((r) => (
                      <tr key={r.type} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-gray-800 font-medium">{r.type}</td>
                        <td className="px-4 py-3 text-gray-700 font-bold">{r.nb}</td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-0.5 rounded-full font-bold text-white text-xs" style={{ backgroundColor: "#2E7D32" }}>{r.prec}</span>
                        </td>
                        <td className="px-4 py-3 text-gray-500">{r.domaine}</td>
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
