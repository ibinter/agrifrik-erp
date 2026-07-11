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
    titre: "URGENT : Traitement mildiou PAR-B1",
    confiance: 78,
    type: "Phytosanitaire",
    parcelle: "PAR-B1 — 3,2 ha",
    priorite: "Haute",
    analyse:
      "Analyse NDVI : taches blanches détectées sur 12% du feuillage PAR-B1 (analyse drone DJI 09/07). Pathogène probable : Phytophthora palmivora (mildiou des cabosses). Pluies 60-80mm prévues 12/07 — conditions idéales pour propagation rapide. Date : 11/07/2025.",
    recommandation:
      "Traitement Ridomil Gold 68 WG — 2,5 g/L — 1 application avant pluies du 12/07. Coût estimé : 48 000 XOF. Stock disponible : 82 kg Ridomil restant ✅. Impact si non traité : Perte estimée 15-25% de la récolte PAR-B1 (-1,4 t → -1 540 000 XOF).",
    gain: "🟡 En cours — Ibrahim S. a confirmé le traitement à 08h30 ce matin ✅",
    actions: [
      { label: "Voir rapport de traitement", primary: true },
      { label: "Planifier suivi J+7" },
    ],
  },
  {
    prio: "important",
    titre: "Fertilisation KCl PAR-A3",
    confiance: 91,
    type: "Agronomique",
    parcelle: "PAR-A3 — 4,8 ha",
    priorite: "Haute",
    analyse:
      "Source : Analyse sol Mar 2025 + Modèle prédictif rendement. Déficit en potassium confirmé (K : 0,18 cmol/kg vs optimal 0,25 cmol/kg). Analyse NDVI confirme stress hydro-minéral sur zone nord-est de la parcelle. Date : 10/07/2025.",
    recommandation:
      "Épandage 150 kg KCl/ha × 4,8 ha = 720 kg — Prévu 20/07 si livraison SCPA. Impact attendu : +0,08 t/ha rendement (+384 kg de cacao → +422 400 XOF).",
    gain: "Gain de rendement estimé : +384 kg cacao = +422 400 XOF",
    actions: [
      { label: "Créer bon commande KCl", primary: true },
      { label: "Planifier l'intervention" },
    ],
  },
  {
    prio: "info",
    titre: "Récolte anacarde PAR-C1 prématurée évitée",
    confiance: 94,
    type: "Planification",
    parcelle: "PAR-C1",
    priorite: "Appliquée ✅",
    analyse:
      "Recommandation appliquée le 08/05/2025. L'IA avait recommandé d'attendre 8 jours supplémentaires pour atteindre le stade de maturité optimal. La récolte anticipée aurait produit du grade WW180.",
    recommandation:
      "Attente respectée — récolte effectuée au stade optimal. Résultat : Qualité WW240 obtenue vs WW180 estimée → Prime qualité +15% = +680 000 XOF de CA supplémentaire.",
    gain: "✅ Résultat confirmé : +680 000 XOF CA supplémentaire (prime qualité WW240 vs WW180)",
    actions: [{ label: "Voir rapport campagne anacarde", primary: true }],
  },
  {
    prio: "optimisation",
    titre: "Ajustement ratio alimentation BAS-02 (pisciculture)",
    confiance: 87,
    type: "Pisciculture",
    parcelle: "Bassin BAS-02",
    priorite: "Normale",
    analyse:
      "FCR actuel : 1,9 (objectif : 1,8). Suivi biométrique semaine 28 : prise de poids conforme mais consommation alimentaire légèrement supérieure aux normes. Date : 09/07/2025.",
    recommandation:
      "Réduire ration journalière de 5% sur BAS-02. Réévaluer FCR après 7 jours. Impact attendu : Économie 18 kg aliment/semaine = 36 000 XOF/mois.",
    gain: "Économie estimée : 36 000 XOF/mois sur alimentation BAS-02",
    actions: [{ label: "Ajuster le plan d'alimentation", primary: true }],
  },
  {
    prio: "optimisation",
    titre: "Prévision récolte cacao Oct-Nov 2025",
    confiance: 82,
    type: "Prévision 90 jours",
    parcelle: "Toutes parcelles cacao",
    priorite: "Information",
    analyse:
      "Modèle : Données météo CHIRPS + historique parcelles + stade phénologique actuel. Facteurs positifs : Bonne pluviométrie S1 (+8% vs normale), traitement mildiou PAR-B1 appliqué. Facteurs risque : Prévision El Niño faible → légère sécheresse possible octobre.",
    recommandation:
      "Prévision centrale : 94 t de cacao (fourchette 91-97 t). Planifier main-d'œuvre saisonnière (12-15 personnes) dès mi-septembre. Réserver capacité séchoirs et entrepôts Zone 1+2.",
    gain: "Prévision CA récolte principale : 101-106 M XOF (prix actuel 1 087 XOF/kg)",
    actions: [
      { label: "Voir plan de récolte détaillé", primary: true },
      { label: "Planifier RH saisonniers" },
    ],
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

const EXTRA_MSGS: Msg[] = [
  { role: "user", text: "Quelle est la probabilité d'obtenir le grade AA pour le lot LOT-2025-048 ?" },
  {
    role: "ai",
    text: "Basé sur les données de fermentation (94% fèves brunes, T°J3 52°C ✅, J5 48°C ✅) et l'historique de PAR-A1 (8 campagnes), j'estime une probabilité de 89% d'obtenir le Grade AA. Le principal facteur de risque est la durée de séchage — assurez-vous d'atteindre une humidité finale ≤7,5% pour maximiser la qualité.",
  },
  { role: "user", text: "Faut-il commander plus d'engrais NPK maintenant ?" },
  {
    role: "ai",
    text: "Oui, je recommande de commander 10-12 t de NPK 20-10-10 pour la fertilisation azotée de septembre (pré-récolte). Prix actuel SCPA : 224 000 XOF/t. Délai livraison DDP : 14 jours. Commande avant le 15/08 pour livraison avant le 01/09 recommandée. Bon de commande pré-rempli disponible → [Créer le bon de commande]",
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
  const [msgs, setMsgs] = useState<Msg[]>([...INITIAL_MSGS, ...EXTRA_MSGS]);
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

            {/* Carte thermique rendements */}
            <div>
              <h2 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <Leaf size={15} color="#2E7D32" />
                Carte thermique des rendements prévus
              </h2>
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <svg viewBox="0 0 600 300" className="w-full" style={{ height: 300 }}>
                  {/* Parcelles — rectangles colorés par rendement */}
                  {/* PAR-A1 : 1,28 t/ha — vert très foncé */}
                  <rect x={30} y={20} width={160} height={110} rx={8} fill="#1B5E20" />
                  <text x={110} y={68} textAnchor="middle" fill="white" fontSize={13} fontWeight="bold">PAR-A1</text>
                  <text x={110} y={86} textAnchor="middle" fill="#A5D6A7" fontSize={11}>1,28 t/ha</text>
                  <text x={110} y={102} textAnchor="middle" fill="#C8E6C9" fontSize={10}>6,2 ha — Cacao AA</text>

                  {/* PAR-A2 : 1,24 t/ha — vert foncé */}
                  <rect x={210} y={20} width={150} height={110} rx={8} fill="#2E7D32" />
                  <text x={285} y={68} textAnchor="middle" fill="white" fontSize={13} fontWeight="bold">PAR-A2</text>
                  <text x={285} y={86} textAnchor="middle" fill="#A5D6A7" fontSize={11}>1,24 t/ha</text>
                  <text x={285} y={102} textAnchor="middle" fill="#C8E6C9" fontSize={10}>5,4 ha — Cacao A</text>

                  {/* PAR-A3 : 1,22 t/ha — vert moyen */}
                  <rect x={380} y={20} width={190} height={110} rx={8} fill="#388E3C" />
                  <text x={475} y={68} textAnchor="middle" fill="white" fontSize={13} fontWeight="bold">PAR-A3</text>
                  <text x={475} y={86} textAnchor="middle" fill="#C8E6C9" fontSize={11}>1,22 t/ha</text>
                  <text x={475} y={102} textAnchor="middle" fill="#C8E6C9" fontSize={10}>4,8 ha — KCl requis</text>

                  {/* PAR-B1 : 1,15 t/ha — vert clair (si traitement) */}
                  <rect x={30} y={150} width={200} height={120} rx={8} fill="#66BB6A" />
                  <text x={130} y={203} textAnchor="middle" fill="white" fontSize={13} fontWeight="bold">PAR-B1</text>
                  <text x={130} y={221} textAnchor="middle" fill="#E8F5E9" fontSize={11}>1,15 t/ha*</text>
                  <text x={130} y={237} textAnchor="middle" fill="#E8F5E9" fontSize={10}>3,2 ha — *si traitement</text>
                  <text x={130} y={253} textAnchor="middle" fill="#FFEB3B" fontSize={10}>⚠️ Mildiou surveillé</text>

                  {/* PAR-B2 : 1,18 t/ha — vert moyen */}
                  <rect x={250} y={150} width={320} height={120} rx={8} fill="#4CAF50" />
                  <text x={410} y={203} textAnchor="middle" fill="white" fontSize={13} fontWeight="bold">PAR-B2</text>
                  <text x={410} y={221} textAnchor="middle" fill="#E8F5E9" fontSize={11}>1,18 t/ha</text>
                  <text x={410} y={237} textAnchor="middle" fill="#E8F5E9" fontSize={10}>4,0 ha — Cacao A</text>

                  {/* Légende */}
                  <defs>
                    <linearGradient id="legendGrad" x1="0" x2="1" y1="0" y2="0">
                      <stop offset="0%" stopColor="#C8E6C9" />
                      <stop offset="100%" stopColor="#1B5E20" />
                    </linearGradient>
                  </defs>
                  <rect x={30} y={282} width={200} height={10} rx={4} fill="url(#legendGrad)" />
                  <text x={30} y={278} fontSize={9} fill="#9CA3AF">1,10 t/ha</text>
                  <text x={200} y={278} textAnchor="end" fontSize={9} fill="#9CA3AF">1,30 t/ha</text>
                  <text x={115} y={278} textAnchor="middle" fontSize={9} fill="#6B7280">Rendement prévu (t/ha)</text>
                </svg>
              </div>
            </div>

            {/* Scatter plot pluviométrie vs rendement */}
            <div>
              <h2 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <BarChart2 size={15} color="#1565C0" />
                Prédictions météo-corrélées — Pluviométrie vs Rendement
              </h2>
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <svg viewBox="0 0 600 280" className="w-full" style={{ height: 280 }}>
                  {/* Axes */}
                  <line x1={50} y1={20} x2={50} y2={230} stroke="#E5E7EB" strokeWidth={1.5} />
                  <line x1={50} y1={230} x2={580} y2={230} stroke="#E5E7EB" strokeWidth={1.5} />

                  {/* Y labels */}
                  {[0.8, 0.9, 1.0, 1.1, 1.2, 1.3].map((v, i) => {
                    const y = 230 - i * 42;
                    return (
                      <g key={v}>
                        <line x1={46} x2={580} y1={y} y2={y} stroke="#F3F4F6" strokeWidth={1} />
                        <text x={44} y={y + 4} textAnchor="end" fontSize={9} fill="#9CA3AF">{v.toFixed(1)}</text>
                      </g>
                    );
                  })}
                  {/* X labels */}
                  {[0, 200, 400, 600, 800, 1000].map((v, i) => {
                    const x = 50 + i * 106;
                    return (
                      <g key={v}>
                        <text x={x} y={244} textAnchor="middle" fontSize={9} fill="#9CA3AF">{v}</text>
                      </g>
                    );
                  })}

                  {/* Scatter points — simulated data */}
                  {[
                    [120,0.82],[140,0.85],[160,0.88],[180,0.90],[200,0.91],[220,0.93],
                    [240,0.95],[260,0.97],[280,0.99],[300,1.00],[320,1.02],[340,1.04],
                    [360,1.05],[380,1.07],[400,1.08],[420,1.10],[440,1.11],[460,1.13],
                    [480,1.14],[500,1.15],[520,1.16],[540,1.17],[560,1.18],[580,1.19],
                    [600,1.20],[620,1.21],[640,1.22],[660,1.22],[680,1.23],[700,1.24],
                    [150,0.84],[190,0.89],[230,0.94],[270,0.98],[310,1.01],[350,1.04],
                    [390,1.07],[430,1.10],[470,1.13],[510,1.15],[550,1.17],[590,1.19],
                    [630,1.21],[670,1.22],[710,1.24],[130,0.83],[170,0.87],[210,0.92],
                    [250,0.96],[290,1.00],[330,1.03],[370,1.06],[410,1.09],[450,1.12],
                    [490,1.14],[530,1.16],[570,1.18],[610,1.20],[650,1.22],[690,1.23],
                  ].map(([px, py], i) => {
                    const cx = 50 + (px / 1000) * 530;
                    const cy = 230 - ((py - 0.8) / 0.5) * 210;
                    return <circle key={i} cx={cx} cy={cy} r={3.5} fill="#2E7D32" opacity={0.55} />;
                  })}

                  {/* Regression line */}
                  <line
                    x1={50 + (100/1000)*530} y1={230 - ((0.82-0.8)/0.5)*210}
                    x2={50 + (750/1000)*530} y2={230 - ((1.25-0.8)/0.5)*210}
                    stroke="#C62828" strokeWidth={2} strokeDasharray="6 3"
                  />

                  {/* Axis titles */}
                  <text x={315} y={262} textAnchor="middle" fontSize={10} fill="#6B7280">Pluviométrie (mm)</text>
                  <text x={12} y={130} textAnchor="middle" fontSize={10} fill="#6B7280" transform="rotate(-90,12,130)">Rendement (t/ha)</text>

                  {/* R² label */}
                  <rect x={460} y={22} width={115} height={28} rx={6} fill="#FFF3E0" />
                  <text x={517} y={38} textAnchor="middle" fontSize={10} fill="#E65100" fontWeight="bold">R² = 0,78</text>
                  <text x={517} y={47} textAnchor="middle" fontSize={9} fill="#E65100">Corrélation forte</text>
                </svg>
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
