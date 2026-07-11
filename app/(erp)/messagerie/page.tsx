"use client";

import { useState } from "react";
import Topbar from "../../components/Topbar";
import {
  Search,
  Paperclip,
  Smile,
  Send,
  Phone,
  MapPin,
  Clock,
  FileText,
  Image,
  UserCircle,
  Users,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Conversation {
  id: number;
  nom: string;
  initiales: string;
  extrait: string;
  heure: string;
  nonLus?: number;
  groupe?: boolean;
  enLigne?: boolean;
}

interface MessageFichier {
  nom: string;
  type: "pdf" | "image";
}

interface Message {
  id: number;
  auteur: "moi" | "autre";
  texte: string;
  heure: string;
  fichier?: MessageFichier;
}

// ─── Données ─────────────────────────────────────────────────────────────────

const CONVERSATIONS: Conversation[] = [
  {
    id: 1,
    nom: "Ibrahim Sawadogo",
    initiales: "IS",
    extrait: "Rapport PAR-A3 envoyé",
    heure: "09:45",
    nonLus: 2,
    enLigne: true,
  },
  {
    id: 2,
    nom: "Équipe Terrain",
    initiales: "ET",
    extrait: "Ibrahim: OK pour taille demain",
    heure: "09:32",
    nonLus: 5,
    groupe: true,
  },
  {
    id: 3,
    nom: "Mariam Kouyaté",
    initiales: "MK",
    extrait: "Les bulletins de juillet sont prêts",
    heure: "08:15",
    enLigne: true,
  },
  {
    id: 4,
    nom: "Jean-Baptiste K.",
    initiales: "JK",
    extrait: "Virement reçu — Barry Callebaut",
    heure: "Hier",
    nonLus: 1,
  },
  {
    id: 5,
    nom: "Adjoua Messou",
    initiales: "AM",
    extrait: "Facture FAC-2025-041 envoyée",
    heure: "10/07",
  },
  {
    id: 6,
    nom: "Direction",
    initiales: "DR",
    extrait: "Réunion direction lundi 14/07",
    heure: "09/07",
    groupe: true,
  },
];

const MESSAGES: Message[] = [
  {
    id: 1,
    auteur: "autre",
    texte:
      "Bonjour Admin. Je commence la taille d'entretien sur PAR-A1 ce matin. Le sol est bien humide après les pluies de la nuit.",
    heure: "08:32",
  },
  {
    id: 2,
    auteur: "moi",
    texte:
      "Bonjour Ibrahim ! Parfait. N'oublie pas le rapport terrain après l'intervention. Et surveille la zone nord où on avait vu des cabosses immatures la semaine dernière.",
    heure: "08:35",
  },
  {
    id: 3,
    auteur: "autre",
    texte:
      "Oui, je note. La zone nord s'améliore — les cabosses semblent bien reprendre. J'ai photographié 3 zones pour le rapport.",
    heure: "09:12",
    fichier: { nom: "photo_par_a1_zone_nord_1.jpg", type: "image" },
  },
  {
    id: 4,
    auteur: "autre",
    texte:
      "On a aussi remarqué un début de pourriture sur 2 cabosses en bordure est. Je les ai retirées et isolées. Risque limité pour l'instant.",
    heure: "09:15",
  },
  {
    id: 5,
    auteur: "moi",
    texte:
      "Bien géré ! Envoie le rapport détaillé quand tu as fini. Et pour demain (12/07), les pluies sont prévues — mets les bâches sur le séchoir B avant midi.",
    heure: "09:20",
  },
  {
    id: 6,
    auteur: "autre",
    texte:
      "Rapport PAR-A3 envoyé sur l'application. Toutes les photos jointes. Je passerai sur PAR-A3 cet après-midi pour le relevé sol.",
    heure: "09:45",
    fichier: { nom: "rapport_terrain_RT-2025-048.pdf", type: "pdf" },
  },
];

const FICHIERS_PARTAGES = [
  { nom: "rapport_terrain_RT-2025-048.pdf", date: "12/07", type: "pdf" as const },
  { nom: "photo_par_a1_zone_nord_1.jpg", date: "11/07", type: "image" as const },
  { nom: "rapport_terrain_RT-2025-047.pdf", date: "08/07", type: "pdf" as const },
];

// ─── Sous-composants ──────────────────────────────────────────────────────────

function Avatar({
  initiales,
  size = "md",
  enLigne,
}: {
  initiales: string;
  size?: "sm" | "md" | "lg";
  enLigne?: boolean;
}) {
  const s = { sm: "w-9 h-9 text-xs", md: "w-10 h-10 text-sm", lg: "w-14 h-14 text-lg" };
  return (
    <div className="relative shrink-0">
      <div
        className={`${s[size]} rounded-full bg-[#2E7D32] flex items-center justify-center text-white font-semibold`}
      >
        {initiales}
      </div>
      {enLigne && (
        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-400 border-2 border-white" />
      )}
    </div>
  );
}

function FichierBubble({ fichier }: { fichier: MessageFichier }) {
  const isPdf = fichier.type === "pdf";
  return (
    <div className="flex items-center gap-2 mt-2 bg-white/20 rounded-lg px-3 py-2">
      {isPdf ? <FileText size={14} /> : <Image size={14} />}
      <span className="text-xs font-medium truncate max-w-[180px]">{fichier.nom}</span>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function MessageriePage() {
  const [convActive, setConvActive] = useState(1);
  const [recherche, setRecherche] = useState("");
  const [saisie, setSaisie] = useState("");

  const convFiltrees = CONVERSATIONS.filter(
    (c) =>
      recherche === "" ||
      c.nom.toLowerCase().includes(recherche.toLowerCase()) ||
      c.extrait.toLowerCase().includes(recherche.toLowerCase())
  );

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">
      <Topbar title="Messagerie" breadcrumb={["Collaboration", "Messagerie"]} />

      <div className="flex flex-1 overflow-hidden">
        {/* ── Colonne gauche (240px) ── */}
        <aside className="w-60 shrink-0 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex flex-col">
          {/* Recherche */}
          <div className="p-3 border-b border-gray-200 dark:border-gray-700">
            <div className="relative">
              <Search size={13} className="absolute left-2.5 top-2.5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher..."
                value={recherche}
                onChange={(e) => setRecherche(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-gray-100 dark:bg-gray-700 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800 dark:text-gray-200 placeholder-gray-400"
              />
            </div>
          </div>

          {/* Liste */}
          <div className="flex-1 overflow-y-auto">
            {convFiltrees.map((conv) => {
              const actif = conv.id === convActive;
              return (
                <button
                  key={conv.id}
                  onClick={() => setConvActive(conv.id)}
                  className={`w-full flex items-start gap-2.5 px-3 py-3 border-b border-gray-100 dark:border-gray-700 text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${
                    actif ? "bg-green-50 dark:bg-green-900/20" : ""
                  }`}
                >
                  {conv.groupe ? (
                    <div className="w-9 h-9 rounded-full bg-amber-600 flex items-center justify-center shrink-0">
                      <Users size={15} className="text-white" />
                    </div>
                  ) : (
                    <Avatar initiales={conv.initiales} size="sm" enLigne={conv.enLigne} />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-0.5">
                      <span
                        className={`text-xs truncate ${
                          conv.nonLus
                            ? "font-semibold text-gray-900 dark:text-white"
                            : "text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        {conv.nom}
                      </span>
                      <span className="text-[10px] text-gray-400 shrink-0 ml-1">{conv.heure}</span>
                    </div>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400 truncate">
                      {conv.extrait}
                    </p>
                  </div>
                  {conv.nonLus && (
                    <span className="shrink-0 min-w-[18px] h-[18px] rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center px-1">
                      {conv.nonLus}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </aside>

        {/* ── Colonne centre ── */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* En-tête */}
          <div className="flex items-center gap-3 px-5 py-3 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <Avatar initiales="IS" size="sm" enLigne />
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-900 dark:text-white">Ibrahim Sawadogo</p>
              <p className="text-xs text-green-600 dark:text-green-400">En ligne</p>
            </div>
            <button className="p-2 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <Phone size={17} />
            </button>
          </div>

          {/* Fil */}
          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
            {/* Séparateur date */}
            <div className="flex items-center gap-3 my-2">
              <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
              <span className="text-[10px] text-gray-400 whitespace-nowrap">
                Aujourd&apos;hui 11 juillet 2025
              </span>
              <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
            </div>

            {MESSAGES.map((msg) => {
              const moi = msg.auteur === "moi";
              return (
                <div key={msg.id} className={`flex ${moi ? "justify-end" : "justify-start"}`}>
                  {!moi && <Avatar initiales="IS" size="sm" />}
                  <div
                    className={`max-w-[60%] ml-2 mr-2 flex flex-col ${moi ? "items-end" : "items-start"}`}
                  >
                    <div
                      className={`px-4 py-2.5 text-sm leading-relaxed rounded-2xl ${
                        moi
                          ? "bg-[#2E7D32] text-white rounded-br-sm"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-sm"
                      }`}
                    >
                      {msg.texte}
                      {msg.fichier && <FichierBubble fichier={msg.fichier} />}
                    </div>
                    <span className="text-[10px] text-gray-400 mt-1 px-1">{msg.heure}</span>
                  </div>
                  {moi && <Avatar initiales="AD" size="sm" />}
                </div>
              );
            })}

            <div className="flex justify-end pr-12">
              <span className="text-[10px] text-gray-400">Lu · 09:46</span>
            </div>
          </div>

          {/* Saisie */}
          <div className="px-5 py-3 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-end gap-2 bg-gray-100 dark:bg-gray-700 rounded-2xl px-4 py-2">
              <textarea
                rows={1}
                placeholder="Écrire un message..."
                value={saisie}
                onChange={(e) => setSaisie(e.target.value)}
                className="flex-1 resize-none bg-transparent text-sm text-gray-800 dark:text-gray-200 placeholder-gray-400 focus:outline-none"
                style={{ maxHeight: 100 }}
              />
              <div className="flex items-center gap-1 shrink-0 pb-0.5">
                <button
                  title="Pièce jointe"
                  className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                >
                  <Paperclip size={17} />
                </button>
                <button
                  title="Emoji"
                  className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                >
                  <Smile size={17} />
                </button>
                <button
                  title="Envoyer"
                  className="p-1.5 rounded-lg bg-[#2E7D32] text-white hover:bg-[#1B5E20] transition-colors"
                >
                  <Send size={15} />
                </button>
              </div>
            </div>
          </div>
        </main>

        {/* ── Colonne droite (280px) ── */}
        <aside className="w-[280px] shrink-0 border-l border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-y-auto flex flex-col">
          {/* Profil */}
          <div className="flex flex-col items-center pt-6 pb-5 px-4 border-b border-gray-200 dark:border-gray-700">
            <Avatar initiales="IS" size="lg" enLigne />
            <p className="mt-3 text-sm font-semibold text-gray-900 dark:text-white">
              Ibrahim Sawadogo
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Chef équipe cacao</p>

            <div className="w-full mt-4 space-y-2.5">
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                <MapPin size={13} className="text-gray-400 shrink-0" />
                <span>PAR-A1, PAR-A3</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                <Phone size={13} className="text-gray-400 shrink-0" />
                <span>+225 07 01 23 45</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                <Clock size={13} className="text-gray-400 shrink-0" />
                <span>Dernière activité : il y a 18 min</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="w-2 h-2 rounded-full bg-green-400 shrink-0" />
                <span className="text-green-600 dark:text-green-400 font-medium">En ligne</span>
              </div>
            </div>
          </div>

          {/* Fichiers partagés */}
          <div className="px-4 py-4 border-b border-gray-200 dark:border-gray-700">
            <p className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
              Fichiers partagés
            </p>
            <div className="space-y-2">
              {FICHIERS_PARTAGES.map((f) => (
                <div
                  key={f.nom}
                  className="flex items-center gap-2 p-2 rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                >
                  {f.type === "pdf" ? (
                    <FileText size={14} className="text-red-500 shrink-0" />
                  ) : (
                    <Image size={14} className="text-blue-500 shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-medium text-gray-700 dark:text-gray-300 truncate">
                      {f.nom}
                    </p>
                    <p className="text-[10px] text-gray-400">{f.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions rapides */}
          <div className="px-4 py-4">
            <p className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
              Actions rapides
            </p>
            <div className="flex flex-col gap-2">
              <button className="flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-lg bg-[#2E7D32] text-white hover:bg-[#1B5E20] transition-colors">
                <Clock size={13} />
                Créer tâche
              </button>
              <button className="flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-lg border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <UserCircle size={13} />
                Voir profil
              </button>
              <button className="flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-lg border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <Phone size={13} />
                Appeler
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
