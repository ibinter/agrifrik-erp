"use client";

import { useState } from "react";
import {
  Search,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  Mail,
  Phone,
  Ticket,
  Rocket,
  DollarSign,
  Leaf,
  BarChart2,
  Bot,
  Users,
  ArrowRight,
} from "lucide-react";
import Topbar from "../../components/Topbar";

const breadcrumb = ["Administration", "Aide"];

const THEMES = [
  { icon: Rocket, titre: "Démarrage rapide", articles: 5, color: "bg-green-50 text-green-700" },
  { icon: DollarSign, titre: "Finance & SYSCOHADA", articles: 8, color: "bg-yellow-50 text-yellow-700" },
  { icon: Leaf, titre: "Rainforest Alliance & Certifications", articles: 6, color: "bg-emerald-50 text-emerald-700" },
  { icon: BarChart2, titre: "Rapports & Analytics", articles: 7, color: "bg-blue-50 text-blue-700" },
  { icon: Bot, titre: "IA ARIA", articles: 4, color: "bg-purple-50 text-purple-700" },
  { icon: Users, titre: "Gestion RH & Paie", articles: 5, color: "bg-orange-50 text-orange-700" },
];

const FAQ = [
  {
    q: "Comment enregistrer une nouvelle récolte ?",
    r: "Aller dans Production > Cultures > [votre parcelle] > Bouton \"Nouvelle récolte\". Renseignez le poids des cabosses fraîches, la date, l'opérateur. Le système crée automatiquement un lot de transformation.",
  },
  {
    q: "Comment générer une facture export conforme SYSCOHADA ?",
    r: "Commerce > Factures > \"Nouvelle facture\". Renseignez le client, le lot, l'Incoterm. La facture est générée avec la mention d'exonération TVA (art. 344 CGI-CI) si export.",
  },
  {
    q: "Comment préparer un rapport pour la certification Rainforest Alliance ?",
    r: "Rapports > Rapport Builder > Sélectionner le template \"Rapport RA\". Il inclut automatiquement : traçabilité lots, registre phytosanitaires, indicateurs sociaux S4, bilan carbone.",
  },
  {
    q: "Qu'est-ce qu'ARIA et comment l'utiliser ?",
    r: "ARIA est l'assistant IA d'AGRIFRIK. Accédez via IA > ARIA. Posez des questions en français sur vos cultures, stocks, prix. ARIA analyse vos données pour faire des recommandations personnalisées.",
  },
  {
    q: "Comment configurer les alertes de stock ?",
    r: "Administration > Alertes (ou Alertes dans le menu). Configurez les seuils par produit. Vous recevrez des notifications email/SMS quand le stock descend sous le seuil.",
  },
  {
    q: "Comment exporter les données pour mon comptable ?",
    r: "Finance > Comptabilité > \"Exporter\". Formats disponibles : OFX (sage/ciel), CSV, Excel. Inclut le grand livre, le journal, la balance.",
  },
  {
    q: "Mes parcelles apparaissent-elles sur une carte GPS ?",
    r: "Oui ! Production > Cartographie. Vos parcelles sont affichées sur une carte schématique. Pour la géolocalisation précise, utilisez les rapports terrain avec photos GPS.",
  },
  {
    q: "Comment suivre la certification Rainforest Alliance ?",
    r: "Commerce > Certifications > [votre certification]. Vous verrez le score par chapitre, les non-conformités, les dates d'audit et le calendrier des actions correctives.",
  },
  {
    q: "Comment créer un compte pour un collaborateur ?",
    r: "Administration > Utilisateurs > \"Inviter un utilisateur\". Renseignez l'email et le rôle. Un email d'invitation est envoyé avec les identifiants temporaires.",
  },
  {
    q: "Comment fonctionne la synchronisation avec Supabase ?",
    r: "Toutes les données sont synchronisées en temps réel avec Supabase (PostgreSQL). La synchro est automatique — vous n'avez rien à faire. En cas de connexion instable, les données sont mises en cache localement.",
  },
];

export default function AidePage() {
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<number | null>(null);
  const [ticketOpened, setTicketOpened] = useState(false);

  const searchLower = search.toLowerCase();
  const filteredFaq = search
    ? FAQ.filter(
        (item) =>
          item.q.toLowerCase().includes(searchLower) ||
          item.r.toLowerCase().includes(searchLower)
      )
    : FAQ;

  const toggle = (i: number) => setExpanded(expanded === i ? null : i);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Topbar breadcrumb={breadcrumb} />

      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-8 space-y-10">

        {/* En-tête vert */}
        <section className="rounded-2xl p-8 text-center space-y-5" style={{ background: "linear-gradient(135deg,#2E7D32 0%,#1B5E20 100%)" }}>
          <h1 className="text-2xl font-bold text-white">Comment pouvons-nous vous aider ?</h1>

          {/* Barre de recherche */}
          <div className="relative max-w-lg mx-auto">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher dans l'aide..."
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-white text-sm text-gray-800 placeholder-gray-400 outline-none focus:ring-2 focus:ring-[#4CAF50]"
            />
          </div>

          {/* Stats */}
          <div className="flex items-center justify-center gap-8 pt-1">
            {[
              { value: "48", label: "articles" },
              { value: "12", label: "vidéos tutoriels" },
              { value: "24h/7j", label: "Support" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-xl font-bold text-white">{s.value}</p>
                <p className="text-[11px] text-green-200">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Thèmes populaires */}
        {!search && (
          <section>
            <h2 className="text-base font-semibold text-gray-800 mb-4">Thèmes populaires</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {THEMES.map((t) => {
                const Icon = t.icon;
                return (
                  <button
                    key={t.titre}
                    className="flex flex-col gap-3 bg-white rounded-2xl border border-gray-100 p-5 text-left hover:shadow-md hover:border-[#2E7D32]/30 transition-all group"
                  >
                    <span className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${t.color}`}>
                      <Icon size={20} />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-gray-800 group-hover:text-[#2E7D32] transition-colors leading-snug">
                        {t.titre}
                      </p>
                      <p className="text-[10px] text-gray-400 mt-0.5">{t.articles} articles</p>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-[#2E7D32] font-medium mt-auto">
                      Voir <ArrowRight size={11} />
                    </div>
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {/* FAQ */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-gray-800">FAQ — Questions fréquentes</h2>
            {search && (
              <button
                onClick={() => setSearch("")}
                className="text-xs text-gray-400 hover:text-gray-700 underline"
              >
                Effacer
              </button>
            )}
          </div>

          {filteredFaq.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center text-sm text-gray-500">
              Aucun résultat pour &ldquo;<strong>{search}</strong>&rdquo;. Essayez un autre terme ou contactez le support.
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm divide-y divide-gray-100">
              {filteredFaq.map((item, i) => (
                <div key={i}>
                  <button
                    onClick={() => toggle(i)}
                    className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-sm font-medium text-gray-800 pr-4">{item.q}</span>
                    {expanded === i ? (
                      <ChevronUp size={16} className="text-gray-400 flex-shrink-0" />
                    ) : (
                      <ChevronDown size={16} className="text-gray-400 flex-shrink-0" />
                    )}
                  </button>
                  {expanded === i && (
                    <div className="px-6 pb-5 text-sm text-gray-600 leading-relaxed bg-green-50/40">
                      {item.r}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Contacter le support */}
        <section>
          <h2 className="text-base font-semibold text-gray-800 mb-4">Contacter le support</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            {/* Chat en direct */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm flex flex-col gap-3">
              <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
                <MessageCircle size={20} className="text-[#2E7D32]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">Chat en direct</p>
                <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">
                  Ibrahim de l&apos;équipe support répond en général en moins de 5 min
                </p>
              </div>
              <span className="inline-flex items-center gap-1 text-[10px] text-green-600 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                En ligne maintenant
              </span>
            </div>

            {/* Email */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm flex flex-col gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                <Mail size={20} className="text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">Email support</p>
                <p className="text-[11px] text-[#2E7D32] font-medium mt-1">support@agrifrik.com</p>
                <p className="text-[10px] text-gray-400 mt-0.5">Réponse sous 4h ouvrées</p>
              </div>
            </div>

            {/* Téléphone */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm flex flex-col gap-3">
              <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
                <Phone size={20} className="text-gray-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">Téléphone</p>
                <p className="text-[11px] text-gray-700 font-medium mt-1">+225 07 XX XX XX</p>
                <p className="text-[10px] text-gray-400 mt-0.5">Lun–Sam 07h–19h</p>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => setTicketOpened(true)}
              className="flex items-center gap-2 bg-[#2E7D32] hover:bg-[#1B5E20] text-white text-sm font-medium py-2.5 px-5 rounded-xl transition-colors"
            >
              <Ticket size={16} />
              {ticketOpened ? "Ticket ouvert ✅" : "Ouvrir un ticket support"}
            </button>
          </div>
        </section>

      </main>
    </div>
  );
}
