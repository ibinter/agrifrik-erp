"use client";

import { useState } from "react";
import Topbar from "../../components/Topbar";
import {
  Brain,
  TrendingUp,
  AlertTriangle,
  MessageSquare,
  BarChart2,
  Bell,
  Send,
  Bot,
  User,
  CheckCircle,
  XCircle,
  ShoppingCart,
  Calendar,
  Leaf,
  Info,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────────────────────── */
/*  DONNÉES                                                                    */
/* ─────────────────────────────────────────────────────────────────────────── */

type PrioKey = "urgent" | "important" | "optimisation" | "info";

const PRIO_CFG: Record<PrioKey, {
  emoji: string; label: string; color: string; bg: string; border: string; labelBg: string;
}> = {
  urgent:       { emoji: "🔴", label: "URGENT",       color: "#B71C1C", bg: "#FFF5F5", border: "#FCA5A5", labelBg: "#FFEBEE" },
  important:    { emoji: "🟡", label: "IMPORTANT",     color: "#92400E", bg: "#FFFBEB", border: "#FCD34D", labelBg: "#FEF3C7" },
  optimisation: { emoji: "🔵", label: "OPTIMISATION", color: "#1565C0", bg: "#EFF6FF", border: "#93C5FD", labelBg: "#DBEAFE" },
  info:         { emoji: "🔵", label: "INFO",          color: "#1565C0", bg: "#EFF6FF", border: "#93C5FD", labelBg: "#DBEAFE" },
};

interface Reco {
  prio: PrioKey;
  titre: string;
  confiance: number;
  type: string;
  parcelle: string;
  priorite: string;
  analyse: string;
  recommandation: string;
  gain?: string;
  actions: { label: string; primary?: boolean }[];
}

const RECOS: Reco[] = [
  {
    prio: "urgent",
    titre: "Séchage lot LOT-032",
    confiance: 98,
    type: "Qualité",
    parcelle: "N/A",
    priorite: "Critique",
    analyse:
      "Humidité mesurée à 12,4% > norme RA 10%. Si non traité dans 48h, risque développement aflatoxines (Aspergillus flavus). Pertes estimées : 3,2 t (100% du lot).",
    recommandation:
      "Déplacer immédiatement en séchoir solaire Zone C. Réétaler sur claies. Exposition 6-8h si ensoleillement > 5h. Revérifier humidité dans 24h.",
    gain: "Économie potentielle : 3,52 M XOF (valeur du lot sauvé)",
    actions: [
      { label: "Appliquer la recommandation", primary: true },
      { label: "Ignorer" },
    ],
  },
  {
    prio: "important",
    titre: "Fertilisation K sur PAR-A3",
    confiance: 91,
    type: "Agronomique",
    parcelle: "PAR-A3 — 4,8 ha",
    priorite: "Haute",
    analyse:
      "Analyse sol 2024 confirme déficience en potassium (K : 0,18 cmol/kg vs optimal 0,25). Stade floraison actuel — K critique pour formation des cabosses. Rendement estimé sans apport : 1,08 t/ha vs 1,26 t/ha avec apport K.",
    recommandation:
      "Épandre 22 kg/ha KCl (Muriate de Potasse 0-0-60) = 106 kg total sur 4,8 ha. Applique entre 06h-09h ou 16h-18h. Évite les pluies (prévues 12-13/07).",
    gain: "Gain de rendement estimé : +0,18 t/ha × 4,8 ha = +0,86 t = +946 000 XOF",
    actions: [
      { label: "Créer bon commande KCl", primary: true },
      { label: "Planifier l'intervention" },
    ],
  },
  {
    prio: "important",
    titre: "Traitement préventif mildiou PAR-B1",
    confiance: 87,
    type: "Phytosanitaire",
    parcelle: "PAR-B1 — 3,2 ha",
    priorite: "Haute",
    analyse:
      "Conditions météo (pluies 60-80mm prévues 12-13/07) + température 28-34°C = risque élevé Phytophthora megakarya (mildiou cacao). PAR-B1 historique : mildiou détecté août 2022. Risque de perte sans traitement : 15-25% rendement.",
    recommandation:
      "Appliquer Ridomil Gold (Métalaxyl + Mancozeb) 2,5 kg/ha AVANT les pluies (idéalement 10/07 matin). Coût : ~24 000 XOF. Éviter application < 6h avant pluie.",
    actions: [{ label: "Planifier le traitement", primary: true }],
  },
  {
    prio: "optimisation",
    titre: "Récolte optimale cacao PAR-A1",
    confiance: 84,
    type: "Planification",
    parcelle: "PAR-A1",
    priorite: "Normale",
    analyse:
      "Floraison enregistrée mi-avril. Maturation cacao : 5-6 mois. Fenêtre de récolte optimale : mi-octobre à fin novembre 2025. Prix cacao en hausse (+3,2% cette semaine). Si récolte à 100% maturité = Grade AA vs récolte prématurée = Grade A.",
    recommandation:
      "Planifier récolte 15/10 - 30/11. Préparer main d'œuvre (8-10 saisonniers). Réserver espace entrepôt Zone 2 (estimé 7,8 t = 78 sacs 100kg).",
    gain: "Gain qualité estimé : +15 XOF/kg × 7,8 t = +117 000 XOF (passage de A à AA)",
    actions: [{ label: "Planifier la récolte", primary: true }],
  },
  {
    prio: "optimisation",
    titre: "Rotation culturale PAR-D2",
    confiance: 76,
    type: "Agronomique",
    parcelle: "PAR-D2 — 2,4 ha",
    priorite: "Normale",
    analyse:
      "Parcelle anacarde post-campagne (récolte terminée). Sol pH 6,2 légèrement acide. Légumineuses recommandées pour fixation azote avant reprise anacarde.",
    recommandation:
      "Envisager culture intercalaire niébé ou mucuna (légumineuses) de juillet à octobre 2025. Coût semences : ~28 000 XOF. Bénéfice sol : +0,08% N (estimation).",
    actions: [{ label: "Voir le plan de rotation", primary: true }],
  },
];

/* ─── Chat ────────────────────────────────────────────────────────────────── */
interface Msg { role: "user" | "ai"; text: string }

const INITIAL_MSGS: Msg[] = [
  { role: "user", text: "Quel est le risque phytosanitaire pour mes parcelles cette semaine ?" },
  {
    role: "ai",
    text: "📍 Analyse des 3 prochains jours pour vos 8 parcelles actives : Risque ÉLEVÉ mildiou sur PAR-B1 (historique 2022 + pluies prévues). Risque MODÉRÉ anthracnose PAR-C2 (zone humide). Recommande traitement préventif Ridomil Gold sur PAR-B1 avant le 10/07. Budget traitement : ~77 000 XOF pour 3,2 ha.",
  },
  { role: "user", text: "Quel est le prix cacao prévu pour la récolte principale en octobre ?" },
  {
    role: "ai",
    text: "📊 Prévision cours cacao Oct-Nov 2025 : Tendance haussière confirmée (+8-15% vs 2024). Facteurs : demande chocolat UE +4%, production Ghana -12% (sécheresse). Fourchette estimée : 1 150-1 280 XOF/kg (vs 1 087 aujourd'hui). ✅ Recommande maintenir contrat Barry Callebaut à prix fixe comme couverture, et vendre 20-30% en marché spot si cours > 1 250.",
  },
];

const SUGGESTIONS = [
  "Quel engrais pour le cacao en floraison ?",
  "Prévision rendement PAR-A1 saison 2025",
  "Traitement recommandé contre la capsule du cacao ?",
  "Optimiser calendrier récolte anacarde",
  "Analyse risque climatique S2 2025",
  "Comment améliorer la qualité du séchage ?",
];

const QUICK_CHIPS = ["Analyse météo 14 jours", "Optimiser récolte cacao", "Bilan phytosanitaire"];

/* ─── Prédictions ──────────────────────────────────────────────────────────── */
const RENDEMENTS = [
  { parcelle: "PAR-A1", culture: "Cacao Grade AA", surface: "6,2 ha", prevu: "1,28 t/ha (7,94 t)", conf: 89, vs2024: "+14%", pos: true, valeur: "9,53 M XOF" },
  { parcelle: "PAR-A3", culture: "Cacao Grade A",  surface: "4,8 ha", prevu: "1,22 t/ha (5,86 t)", conf: 84, vs2024: "+8%",  pos: true, valeur: "6,35 M XOF" },
  { parcelle: "PAR-B1", culture: "Cacao Grade A",  surface: "3,2 ha", prevu: "1,15 t/ha (3,68 t)", conf: 78, vs2024: "+5%",  pos: true, valeur: "3,99 M XOF" },
  { parcelle: "PAR-D2", culture: "Anacarde",        surface: "2,4 ha", prevu: "0,82 t/ha (1,97 t)", conf: 81, vs2024: "+1%",  pos: true, valeur: "1,34 M XOF" },
];

const PRIX = [
  { produit: "Cacao Grade AA", actuel: "1 100 XOF", oct: "1 180 XOF", nov: "1 220 XOF", dec: "1 190 XOF", tendance: "↑ Haussière", pos: true },
  { produit: "Cacao Grade A",  actuel: "1 085 XOF", oct: "1 155 XOF", nov: "1 200 XOF", dec: "1 170 XOF", tendance: "↑ Haussière", pos: true },
  { produit: "Anacarde WW240", actuel: "680 XOF",   oct: "695 XOF",   nov: "680 XOF",   dec: "665 XOF",   tendance: "→ Stable",    pos: null },
];

/* ─── Alertes IA ────────────────────────────────────────────────────────────── */
const ALERTES_IA = [
  {
    niveau: "critique",
    titre: "Humidité lot LOT-032 critique",
    detail: "12,4% détectés (seuil max : 10%). Risque aflatoxines si non traité sous 48h.",
    heure: "Il y a 2h",
    icon: <AlertTriangle size={16} />,
  },
  {
    niveau: "avertissement",
    titre: "Risque mildiou élevé — PAR-B1",
    detail: "Probabilité 87% d'infection Phytophthora d'ici 72h. Pluies 60-80mm prévues.",
    heure: "Il y a 4h",
    icon: <Bell size={16} />,
  },
  {
    niveau: "avertissement",
    titre: "Déficience potassium confirmée — PAR-A3",
    detail: "K : 0,18 cmol/kg (optimal : 0,25). Action recommandée avant stade floraison avancé.",
    heure: "Il y a 6h",
    icon: <Leaf size={16} />,
  },
  {
    niveau: "info",
    titre: "Prix cacao en hausse +3,2%",
    detail: "1 087 XOF/kg (+3,2% semaine). Fenêtre favorable pour contrat à terme.",
    heure: "Il y a 8h",
    icon: <TrendingUp size={16} />,
  },
  {
    niveau: "info",
    titre: "Récolte optimale — PAR-A1 dans 97 jours",
    detail: "Fenêtre de récolte estimée : 15/10 - 30/11/2025. Planification main d'œuvre recommandée.",
    heure: "Il y a 12h",
    icon: <Calendar size={16} />,
  },
  {
    niveau: "succes",
    titre: "Traitement PAR-C2 efficace",
    detail: "Suivi post-traitement : 0 nouveau foyer anthracnose détecté depuis 7 jours. Traitement réussi.",
    heure: "Hier",
    icon: <CheckCircle size={16} />,
  },
  {
    niveau: "succes",
    titre: "Commande KCl en transit",
    detail: "150 kg KCl commandés fournisseur AGRO-CI. Livraison prévue 11/07. Stock suffisant pour PAR-A3.",
    heure: "Hier",
    icon: <ShoppingCart size={16} />,
  },
];

const ALERTE_CFG: Record<string, { bg: string; border: string; color: string; labelBg: string; label: string }> = {
  critique:     { bg: "#FFF5F5", border: "#FCA5A5", color: "#B71C1C", labelBg: "#FFEBEE", label: "Critique" },
  avertissement:{ bg: "#FFFBEB", border: "#FCD34D", color: "#92400E", labelBg: "#FEF3C7", label: "Avertissement" },
  info:         { bg: "#EFF6FF", border: "#93C5FD", color: "#1565C0", labelBg: "#DBEAFE", label: "Info" },
  succes:       { bg: "#F0FFF4", border: "#86EFAC", color: "#166534", labelBg: "#DCFCE7", label: "Succès" },
};

/* ─────────────────────────────────────────────────────────────────────────── */
/*  COMPOSANT PRINCIPAL                                                        */
/* ─────────────────────────────────────────────────────────────────────────── */

export default function IAPage() {
  const [tab, setTab] = useState<"recos" | "chat" | "predictions" | "alertes">("recos");
  const [msgs, setMsgs] = useState<Msg[]>(INITIAL_MSGS);
  const [input, setInput] = useState("");

  const sendMsg = (text: string) => {
    if (!text.trim()) return;
    setMsgs((prev) => [
      ...prev,
      { role: "user", text },
      { role: "ai", text: "🤖 Analyse en cours... Je consulte les données de vos parcelles et les conditions météo actuelles. Réponse disponible dans quelques instants." },
    ]);
    setInput("");
  };

  const TABS: { key: typeof tab; label: string; icon: React.ReactNode }[] = [
    { key: "recos",       label: "Recommandations", icon: <Leaf size={14} /> },
    { key: "chat",        label: "Chat IA",          icon: <MessageSquare size={14} /> },
    { key: "predictions", label: "Prédictions",      icon: <BarChart2 size={14} /> },
    { key: "alertes",     label: "Alertes IA",       icon: <Bell size={14} /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Topbar title="Assistant IA Agricole" breadcrumb={["IA & Données", "Assistant IA"]} />

      <div className="p-6 space-y-6">

        {/* ── Bandeau ── */}
        <section
          className="rounded-2xl px-8 py-7 text-white relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #1B5E20 0%, #2E7D32 60%, #388E3C 100%)" }}
        >
          <div className="flex items-start gap-4 flex-wrap">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-1">
                <Brain size={26} className="text-green-200 shrink-0" />
                <h1 className="text-lg font-bold tracking-tight">
                  AGRIFRIK IA — Powered by analyse agronomique &amp; données terrain
                </h1>
              </div>
              <p className="text-green-200 text-xs">
                Analyse en cours · 16,6 ha · 8 parcelles actives · Dernière màj : 10/07/2025 06:00
              </p>
            </div>
            <div className="flex flex-wrap gap-2 shrink-0">
              {["5 reco. actives", "Précision 89%", "6 modèles ML", "Alertes : 7"].map((b) => (
                <span
                  key={b}
                  className="text-xs font-semibold px-3 py-1.5 rounded-full"
                  style={{ background: "rgba(255,255,255,0.15)" }}
                >
                  {b}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── Onglets ── */}
        <div className="flex gap-1 bg-white rounded-2xl border border-gray-100 p-1 shadow-sm w-fit">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all"
              style={
                tab === t.key
                  ? { backgroundColor: "#2E7D32", color: "#fff" }
                  : { color: "#6B7280" }
              }
            >
              {t.icon}
              {t.label}
            </button>
          ))}
        </div>

        {/* ══════════════════════════════════════════════════════════════════ */}
        {/* ONGLET RECOMMANDATIONS                                            */}
        {/* ══════════════════════════════════════════════════════════════════ */}
        {tab === "recos" && (
          <section className="space-y-4">
            <h2 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <AlertTriangle size={15} color="#E65100" />
              5 recommandations prioritaires du jour
            </h2>
            {RECOS.map((rec, i) => {
              const cfg = PRIO_CFG[rec.prio];
              return (
                <div
                  key={i}
                  className="rounded-2xl p-5"
                  style={{ backgroundColor: cfg.bg, border: `1px solid ${cfg.border}` }}
                >
                  {/* En-tête */}
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span
                      className="text-xs font-bold px-2.5 py-1 rounded-full"
                      style={{ backgroundColor: cfg.labelBg, color: cfg.color }}
                    >
                      {cfg.emoji} {cfg.label}
                    </span>
                    <span className="font-bold text-sm text-gray-900">{rec.titre}</span>
                    <span
                      className="ml-auto text-xs font-semibold px-2.5 py-1 rounded-full"
                      style={{ backgroundColor: cfg.labelBg, color: cfg.color }}
                    >
                      Confiance : {rec.confiance}%
                    </span>
                  </div>

                  {/* Méta */}
                  <div className="flex flex-wrap gap-4 mb-3 text-xs text-gray-500">
                    <span><span className="font-semibold text-gray-700">Type :</span> {rec.type}</span>
                    <span><span className="font-semibold text-gray-700">Parcelle :</span> {rec.parcelle}</span>
                    <span><span className="font-semibold text-gray-700">Priorité :</span> {rec.priorite}</span>
                  </div>

                  {/* Analyse */}
                  <div className="mb-2">
                    <p className="text-xs font-semibold text-gray-600 mb-0.5">Analyse :</p>
                    <p className="text-xs text-gray-600 leading-relaxed">{rec.analyse}</p>
                  </div>

                  {/* Recommandation */}
                  <div className="mb-3">
                    <p className="text-xs font-semibold text-gray-600 mb-0.5">Recommandation :</p>
                    <p className="text-xs text-gray-700 leading-relaxed">{rec.recommandation}</p>
                  </div>

                  {/* Gain */}
                  {rec.gain && (
                    <p
                      className="text-xs font-bold mb-3 px-3 py-1.5 rounded-lg inline-block"
                      style={{ backgroundColor: cfg.labelBg, color: cfg.color }}
                    >
                      {rec.gain}
                    </p>
                  )}

                  {/* Actions */}
                  <div className="flex flex-wrap gap-2">
                    {rec.actions.map((a, j) => (
                      <button
                        key={j}
                        className="text-xs font-semibold px-4 py-2 rounded-xl transition-opacity hover:opacity-80"
                        style={
                          a.primary
                            ? { backgroundColor: cfg.color, color: "#fff" }
                            : { backgroundColor: cfg.labelBg, color: cfg.color }
                        }
                      >
                        {a.label}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </section>
        )}

        {/* ══════════════════════════════════════════════════════════════════ */}
        {/* ONGLET CHAT IA                                                    */}
        {/* ══════════════════════════════════════════════════════════════════ */}
        {tab === "chat" && (
          <section>
            <div className="flex gap-4" style={{ alignItems: "stretch" }}>

              {/* Colonne gauche — chat (65%) */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col" style={{ flex: "0 0 65%" }}>
                <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
                  <Bot size={16} color="#2E7D32" />
                  <span className="text-sm font-semibold text-gray-800">Assistant IA AGRIFRIK</span>
                  <span className="ml-auto flex items-center gap-1 text-xs text-green-700 font-medium">
                    <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
                    En ligne
                  </span>
                </div>

                {/* Historique */}
                <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4" style={{ minHeight: 320, maxHeight: 460 }}>
                  {msgs.map((m, i) => (
                    <div
                      key={i}
                      className={`flex gap-2 ${m.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                    >
                      {/* Avatar */}
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                        style={
                          m.role === "user"
                            ? { backgroundColor: "#2E7D32" }
                            : { backgroundColor: "#F3F4F6" }
                        }
                      >
                        {m.role === "user"
                          ? <User size={13} color="#fff" />
                          : <Bot size={13} color="#374151" />
                        }
                      </div>
                      {/* Bulle */}
                      <div
                        className="rounded-2xl px-4 py-3 text-xs leading-relaxed max-w-[80%]"
                        style={
                          m.role === "user"
                            ? { backgroundColor: "#F0FFF4", color: "#1B5E20" }
                            : { backgroundColor: "#F9FAFB", color: "#374151" }
                        }
                      >
                        {m.text}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Chips rapides */}
                <div className="px-5 py-2 flex flex-wrap gap-2 border-t border-gray-50">
                  {QUICK_CHIPS.map((c) => (
                    <button
                      key={c}
                      onClick={() => sendMsg(c)}
                      className="text-xs px-3 py-1.5 rounded-full border font-medium transition-colors hover:bg-green-50"
                      style={{ borderColor: "#2E7D32", color: "#2E7D32" }}
                    >
                      {c}
                    </button>
                  ))}
                </div>

                {/* Saisie */}
                <div className="px-5 py-4 border-t border-gray-100 flex gap-2">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMsg(input)}
                    placeholder="Posez votre question agronomique..."
                    className="flex-1 text-xs rounded-xl border border-gray-200 px-4 py-2.5 outline-none focus:border-green-400"
                  />
                  <button
                    onClick={() => sendMsg(input)}
                    className="px-4 py-2 rounded-xl text-white text-xs font-semibold flex items-center gap-1.5 transition-opacity hover:opacity-80"
                    style={{ backgroundColor: "#2E7D32" }}
                  >
                    <Send size={13} />
                    Envoyer
                  </button>
                </div>
              </div>

              {/* Colonne droite — suggestions (35%) */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5" style={{ flex: "0 0 calc(35% - 16px)" }}>
                <h3 className="text-xs font-bold text-gray-700 mb-3 flex items-center gap-2">
                  <MessageSquare size={13} color="#2E7D32" />
                  Suggestions de questions
                </h3>
                <div className="space-y-2">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => setInput(s)}
                      className="w-full text-left text-xs px-3 py-2.5 rounded-xl border border-gray-100 text-gray-700 hover:border-green-300 hover:bg-green-50 transition-colors leading-snug"
                    >
                      {s}
                    </button>
                  ))}
                </div>

                {/* Stats IA */}
                <div className="mt-5 pt-4 border-t border-gray-100 space-y-3">
                  <p className="text-xs font-bold text-gray-600">Performance IA</p>
                  {[
                    { label: "Questions répondues", val: "1 248", color: "#2E7D32" },
                    { label: "Précision moyenne",   val: "89%",   color: "#1565C0" },
                    { label: "Taux satisfaction",   val: "94%",   color: "#92400E" },
                  ].map((s) => (
                    <div key={s.label} className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{s.label}</span>
                      <span className="text-xs font-bold" style={{ color: s.color }}>{s.val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ══════════════════════════════════════════════════════════════════ */}
        {/* ONGLET PRÉDICTIONS                                                */}
        {/* ══════════════════════════════════════════════════════════════════ */}
        {tab === "predictions" && (
          <section className="space-y-6">

            {/* Prévisions rendement */}
            <div>
              <h2 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <TrendingUp size={15} color="#2E7D32" />
                Prévisions de rendement par parcelle
              </h2>
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ backgroundColor: "#F8FBF8" }}>
                      {["Parcelle", "Culture", "Surface", "Rendement prévu", "Confiance", "Vs 2024", "Valeur estimée"].map((h) => (
                        <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {RENDEMENTS.map((r, i) => (
                      <tr key={i} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 text-xs font-mono font-semibold text-gray-700">{r.parcelle}</td>
                        <td className="px-4 py-3 text-xs text-gray-700">{r.culture}</td>
                        <td className="px-4 py-3 text-xs text-gray-600">{r.surface}</td>
                        <td className="px-4 py-3 text-xs font-bold text-gray-900">{r.prevu}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-16 bg-gray-100 rounded-full h-1.5">
                              <div className="h-1.5 rounded-full" style={{ width: `${r.conf}%`, backgroundColor: "#2E7D32" }} />
                            </div>
                            <span className="text-xs font-semibold text-gray-700">{r.conf}%</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className="text-xs font-bold px-2 py-0.5 rounded-full"
                            style={r.pos ? { backgroundColor: "#E8F5E9", color: "#2E7D32" } : { backgroundColor: "#FFEBEE", color: "#B71C1C" }}
                          >
                            ↑ {r.vs2024}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-xs font-bold text-gray-900">{r.valeur}</td>
                      </tr>
                    ))}
                    {/* Total */}
                    <tr style={{ backgroundColor: "#F8FBF8" }}>
                      <td className="px-4 py-3 text-xs font-bold text-gray-900">Total général</td>
                      <td className="px-4 py-3 text-xs text-gray-500">—</td>
                      <td className="px-4 py-3 text-xs font-bold text-gray-900">16,6 ha</td>
                      <td className="px-4 py-3 text-xs font-bold text-gray-900">~1,18 t/ha (19,45 t)</td>
                      <td className="px-4 py-3 text-xs text-gray-500">—</td>
                      <td className="px-4 py-3">
                        <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: "#E8F5E9", color: "#2E7D32" }}>
                          ↑ +9%
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs font-bold" style={{ color: "#2E7D32" }}>21,21 M XOF</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Prévision prix S2 2025 */}
            <div>
              <h2 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <BarChart2 size={15} color="#1565C0" />
                Prévision prix S2 2025
              </h2>
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ backgroundColor: "#F8FBF8" }}>
                      {["Produit", "Prix actuel", "Prévision Oct", "Prévision Nov", "Prévision Déc", "Tendance"].map((h) => (
                        <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {PRIX.map((p, i) => (
                      <tr key={i} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 text-xs font-semibold text-gray-800">{p.produit}</td>
                        <td className="px-4 py-3 text-xs font-bold text-gray-900">{p.actuel}</td>
                        <td className="px-4 py-3 text-xs text-gray-700">{p.oct}</td>
                        <td className="px-4 py-3 text-xs text-gray-700">{p.nov}</td>
                        <td className="px-4 py-3 text-xs text-gray-700">{p.dec}</td>
                        <td className="px-4 py-3">
                          <span
                            className="text-xs font-bold px-2.5 py-1 rounded-full"
                            style={
                              p.pos === true
                                ? { backgroundColor: "#E8F5E9", color: "#2E7D32" }
                                : p.pos === false
                                ? { backgroundColor: "#FFEBEE", color: "#B71C1C" }
                                : { backgroundColor: "#F3F4F6", color: "#374151" }
                            }
                          >
                            {p.tendance}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <Info size={13} />
              <span>Prévisions basées sur données historiques, modèles ML et marché international. Indicatives uniquement.</span>
            </div>
          </section>
        )}

        {/* ══════════════════════════════════════════════════════════════════ */}
        {/* ONGLET ALERTES IA                                                 */}
        {/* ══════════════════════════════════════════════════════════════════ */}
        {tab === "alertes" && (
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Bell size={15} color="#E65100" />
                Alertes IA — 7 dernières (10/07/2025)
              </h2>
              <button
                className="text-xs font-semibold px-3 py-1.5 rounded-xl transition-opacity hover:opacity-80 text-white"
                style={{ backgroundColor: "#2E7D32" }}
              >
                Tout marquer lu
              </button>
            </div>

            <div className="space-y-3">
              {ALERTES_IA.map((a, i) => {
                const cfg = ALERTE_CFG[a.niveau];
                return (
                  <div
                    key={i}
                    className="rounded-2xl p-4 flex items-start gap-4"
                    style={{ backgroundColor: cfg.bg, border: `1px solid ${cfg.border}` }}
                  >
                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                      style={{ backgroundColor: cfg.labelBg, color: cfg.color }}
                    >
                      {a.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span
                          className="text-xs font-bold px-2 py-0.5 rounded-full"
                          style={{ backgroundColor: cfg.labelBg, color: cfg.color }}
                        >
                          {cfg.label}
                        </span>
                        <span className="text-xs font-semibold text-gray-800">{a.titre}</span>
                        <span className="ml-auto text-xs text-gray-400">{a.heure}</span>
                      </div>
                      <p className="text-xs text-gray-600 leading-relaxed">{a.detail}</p>
                    </div>
                    <button className="shrink-0 p-1 rounded-lg hover:bg-white transition-colors" style={{ color: cfg.color }}>
                      <XCircle size={14} />
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Stats alertes */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-2">
              {[
                { label: "Critiques", val: "1", color: "#B71C1C", bg: "#FFF5F5" },
                { label: "Avertissements", val: "2", color: "#92400E", bg: "#FFFBEB" },
                { label: "Informations", val: "2", color: "#1565C0", bg: "#EFF6FF" },
                { label: "Succès / Résolus", val: "2", color: "#166534", bg: "#F0FFF4" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border p-4 text-center"
                  style={{ backgroundColor: s.bg, borderColor: "transparent" }}
                >
                  <div className="text-2xl font-black mb-0.5" style={{ color: s.color }}>{s.val}</div>
                  <div className="text-xs font-medium text-gray-600">{s.label}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── Footer ── */}
        <div className="flex items-center gap-2 text-xs text-gray-400 pb-2">
          <Info size={13} />
          <span>Les recommandations IA sont indicatives. Consulter un agronome pour les décisions critiques.</span>
        </div>

      </div>
    </div>
  );
}
