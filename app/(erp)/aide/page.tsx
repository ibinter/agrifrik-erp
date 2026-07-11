"use client";

import { useState } from "react";
import {
  Search,
  Wheat,
  Package,
  DollarSign,
  Users,
  BarChart2,
  Settings,
  ChevronDown,
  ChevronUp,
  Play,
  Mail,
  MessageCircle,
  Phone,
  ShieldCheck,
  BookOpen,
  Ticket,
} from "lucide-react";
import Topbar from "../../components/Topbar";

const CATEGORIES = [
  { icon: Wheat, titre: "Production & Cultures", articles: 18, color: "bg-green-50 text-green-700" },
  { icon: Package, titre: "Stocks & Logistique", articles: 12, color: "bg-blue-50 text-blue-700" },
  { icon: DollarSign, titre: "Finance & Comptabilité", articles: 15, color: "bg-yellow-50 text-yellow-700" },
  { icon: Users, titre: "RH & Paie", articles: 10, color: "bg-purple-50 text-purple-700" },
  { icon: BarChart2, titre: "Rapports & Analytics", articles: 8, color: "bg-orange-50 text-orange-700" },
  { icon: Settings, titre: "Administration & Paramètres", articles: 14, color: "bg-gray-100 text-gray-700" },
];

type FaqSection = {
  titre: string;
  icon: typeof Wheat;
  color: string;
  items: { q: string; r: string }[];
};

const FAQ_SECTIONS: FaqSection[] = [
  {
    titre: "Prise en main",
    icon: BookOpen,
    color: "text-green-600",
    items: [
      {
        q: "Comment créer mon premier lot de production ?",
        r: "Rendez-vous dans Production > Cultures, puis cliquez sur \"+ Nouveau lot\". Sélectionnez la culture, la parcelle et la période de récolte. Renseignez la quantité estimée, le stade de croissance et validez. Le lot apparaît dans votre tableau de bord avec un suivi en temps réel.",
      },
      {
        q: "Comment enregistrer une récolte dans le système ?",
        r: "Dans Production > Cultures, ouvrez la fiche de la culture concernée. Cliquez sur \"Enregistrer une récolte\", saisissez la date, la quantité récoltée en kg, la qualité estimée et l'emplacement de stockage. Le système met à jour automatiquement vos stocks et indicateurs de rendement.",
      },
      {
        q: "Comment générer un bulletin de paie ?",
        r: "Accédez à RH > Paie, sélectionnez le mois concerné, puis cliquez sur \"Générer les bulletins\". Vous pouvez générer tous les bulletins en masse ou individuellement. Chaque bulletin est téléchargeable en PDF.",
      },
      {
        q: "Comment ajouter une nouvelle culture ?",
        r: "Allez dans Production > Cultures, cliquez sur \"+ Nouvelle culture\". Renseignez le nom de la culture, la parcelle associée, la surface en hectares, la date de semis/plantation et le rendement prévu. Cliquez \"Enregistrer\". La culture apparaît immédiatement dans votre tableau de bord.",
      },
    ],
  },
  {
    titre: "Qualité & Certifications",
    icon: ShieldCheck,
    color: "text-blue-600",
    items: [
      {
        q: "Comment enregistrer un contrôle qualité ?",
        r: "Dans Commerce > Suivi Qualité, cliquez \"+ Nouveau contrôle\". Sélectionnez le lot concerné, saisissez les paramètres mesurés (humidité, grade, défauts, etc.) et le résultat global. Un statut Conforme / Non conforme est attribué automatiquement selon vos seuils configurés.",
      },
      {
        q: "Que faire si un lot est déclaré non-conforme ?",
        r: "Un lot non-conforme est automatiquement mis en quarantaine dans le système. Vous recevez une alerte et devez ouvrir une action corrective dans le module Traçabilité > Non-conformités. Le lot ne peut pas être livré tant que l'action corrective n'est pas clôturée ou que le lot n'est pas reclassé.",
      },
      {
        q: "Comment préparer un dossier d'audit Rainforest Alliance ?",
        r: "Utilisez Commerce > Audit pour générer le dossier pré-audit. Le système compile automatiquement vos données de traçabilité, contrôles qualité, formations employés et intrants utilisés. Cliquez \"Générer le rapport d'audit\" pour obtenir un PDF conforme aux exigences RA.",
      },
    ],
  },
  {
    titre: "Finance",
    icon: DollarSign,
    color: "text-yellow-600",
    items: [
      {
        q: "Comment créer une écriture comptable SYSCOHADA ?",
        r: "Dans Finance > Comptabilité, cliquez \"+ Nouvelle écriture\". Sélectionnez le journal (Achats, Ventes, OD, etc.), entrez la date et le libellé. Ajoutez les lignes débit/crédit en utilisant les comptes du Plan OHADA révisé intégré. Le système vérifie l'équilibre avant validation.",
      },
      {
        q: "Comment générer un état de trésorerie mensuel ?",
        r: "Allez dans Finance > Trésorerie, sélectionnez le mois et cliquez \"Générer l'état\". Le tableau de flux de trésorerie est produit selon le modèle SYSCOHADA avec les catégories activités d'exploitation, investissement et financement. Exportable en PDF ou Excel.",
      },
      {
        q: "Comment suivre les impayés clients ?",
        r: "Dans Finance > Comptabilité ou Commerce > Factures, activez le filtre \"Impayés\". Vous visualisez toutes les factures échues avec leur ancienneté (30j, 60j, 90j+). Vous pouvez envoyer un rappel par email directement depuis la fiche facture et planifier des relances automatiques.",
      },
      {
        q: "Comment exporter mes données comptables ?",
        r: "Dans Finance > Comptabilité, utilisez le bouton \"Exporter\" en haut à droite. Vous pouvez exporter en format Excel (SYSCOHADA), CSV, ou PDF. Les exports respectent le Plan Comptable OHADA révisé.",
      },
    ],
  },
  {
    titre: "Administration",
    icon: Settings,
    color: "text-gray-600",
    items: [
      {
        q: "Comment ajouter un nouvel utilisateur ?",
        r: "Administration > Utilisateurs > \"+ Ajouter un utilisateur\". Renseignez nom, email et sélectionnez le rôle (Administrateur, Gestionnaire, Comptable, Producteur partenaire, etc.). L'utilisateur reçoit ses identifiants par email avec un lien de définition de mot de passe sécurisé.",
      },
      {
        q: "Comment configurer des alertes automatiques ?",
        r: "Dans Administration > Alertes, cliquez \"+ Nouvelle alerte\". Choisissez le déclencheur (seuil de stock, date d'échéance, valeur KPI, alerte météo, etc.), les destinataires et le canal de notification (email, WhatsApp, in-app). Les alertes s'activent dès la validation.",
      },
      {
        q: "Comment exporter des données en CSV ?",
        r: "Chaque tableau de données dans AGRIFRIK dispose d'un bouton \"Exporter\" en haut à droite. Cliquez dessus et sélectionnez le format CSV. Vous pouvez filtrer les colonnes à inclure et définir la plage de dates avant l'export.",
      },
      {
        q: "Comment accorder l'accès à un producteur partenaire ?",
        r: "Administration > Utilisateurs > \"+ Ajouter un utilisateur\". Sélectionnez le rôle \"Producteur partenaire\". Le producteur recevra ses identifiants par email et aura accès uniquement au Portail Producteur.",
      },
      {
        q: "L'IA agricole — comment ça fonctionne ?",
        r: "Le module IA analyse vos données de cultures, météo, historiques de rendements et conditions du sol pour générer des recommandations personnalisées. Les suggestions IA sont consultables dans Production > IA Agricole et sont envoyées chaque lundi dans votre rapport hebdomadaire.",
      },
    ],
  },
];

const GUIDES = [
  { titre: "Prise en main AGRIFRIK", duree: "12 min" },
  { titre: "Gestion des cultures et parcelles", duree: "18 min" },
  { titre: "Module comptabilité SYSCOHADA", duree: "24 min" },
  { titre: "Exports et rapports", duree: "15 min" },
  { titre: "Administration et utilisateurs", duree: "10 min" },
  { titre: "Portail producteur pour coopérants", duree: "8 min" },
];

export default function AidePage() {
  const [search, setSearch] = useState("");
  const [openKey, setOpenKey] = useState<string | null>(null);

  const toggleFaq = (key: string) => setOpenKey(openKey === key ? null : key);

  const searchLower = search.toLowerCase();
  const filteredSections = FAQ_SECTIONS.map((section) => ({
    ...section,
    items: section.items.filter(
      (item) =>
        !search ||
        item.q.toLowerCase().includes(searchLower) ||
        item.r.toLowerCase().includes(searchLower)
    ),
  })).filter((section) => !search || section.items.length > 0);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Topbar title="Centre d'Aide" breadcrumb={["Administration", "Aide"]} />

      <main className="flex-1 p-6 space-y-10 max-w-5xl mx-auto w-full">

        {/* Hero recherche */}
        <section className="bg-green-50 border border-green-100 rounded-2xl p-8 text-center space-y-4">
          <h1 className="text-2xl font-bold text-gray-900">Comment pouvons-nous vous aider ?</h1>
          <div className="relative max-w-xl mx-auto">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher dans l'aide… (ex. bulletin de paie, export CSV, audit…)"
              className="w-full pl-12 pr-5 py-3.5 rounded-xl border border-green-200 bg-white shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent"
            />
          </div>
          <p className="text-xs text-gray-500">
            Sujets populaires :{" "}
            {["Cultures", "Stocks", "Facturation", "Export CSV", "Paie", "Audit RA"].map((t, i, arr) => (
              <span key={t}>
                <button
                  className="text-[#2E7D32] font-medium hover:underline"
                  onClick={() => setSearch(t)}
                >
                  {t}
                </button>
                {i < arr.length - 1 && <span className="mx-1 text-gray-300">·</span>}
              </span>
            ))}
          </p>
        </section>

        {/* 6 catégories */}
        {!search && (
          <section>
            <h2 className="text-base font-semibold text-gray-800 mb-4">Parcourir par catégorie</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.titre}
                    className="flex items-center gap-4 bg-white rounded-2xl border border-gray-100 p-5 text-left hover:shadow-md hover:border-[#2E7D32]/30 transition-all group"
                  >
                    <span className={`p-2.5 rounded-xl ${cat.color} shrink-0`}>
                      <Icon size={20} />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 group-hover:text-[#2E7D32] transition-colors">
                        {cat.titre}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">{cat.articles} articles</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {/* FAQ accordéon par sections */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-gray-800">Questions fréquentes</h2>
            {search && (
              <button
                onClick={() => setSearch("")}
                className="text-xs text-gray-400 hover:text-gray-700 underline"
              >
                Effacer la recherche
              </button>
            )}
          </div>

          {filteredSections.length === 0 && (
            <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center text-sm text-gray-500">
              Aucun résultat pour "<strong>{search}</strong>". Essayez un autre terme ou contactez le support.
            </div>
          )}

          <div className="space-y-4">
            {filteredSections.map((section) => {
              const Icon = section.icon;
              return (
                <div key={section.titre} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                  <div className={`flex items-center gap-2 px-6 py-3 border-b border-gray-100 bg-gray-50`}>
                    <Icon size={15} className={section.color} />
                    <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      {section.titre}
                    </span>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {section.items.map((item, i) => {
                      const key = `${section.titre}-${i}`;
                      return (
                        <div key={key}>
                          <button
                            onClick={() => toggleFaq(key)}
                            className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition-colors"
                          >
                            <span className="text-sm font-medium text-gray-800 pr-4">{item.q}</span>
                            {openKey === key ? (
                              <ChevronUp size={16} className="text-gray-400 shrink-0" />
                            ) : (
                              <ChevronDown size={16} className="text-gray-400 shrink-0" />
                            )}
                          </button>
                          {openKey === key && (
                            <div className="px-6 pb-5 text-sm text-gray-600 leading-relaxed bg-gray-50">
                              {item.r}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Guides vidéo */}
        {!search && (
          <section>
            <h2 className="text-base font-semibold text-gray-800 mb-4">Guides vidéo</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {GUIDES.map((g) => (
                <button
                  key={g.titre}
                  className="bg-white rounded-2xl border border-gray-100 p-5 text-left hover:shadow-md hover:border-[#2E7D32]/30 transition-all group flex flex-col gap-3"
                >
                  <span className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                    <Play size={16} className="text-[#2E7D32] ml-0.5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 group-hover:text-[#2E7D32] transition-colors">
                      {g.titre}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">{g.duree} de vidéo</p>
                  </div>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Contacter le support */}
        <section>
          <h2 className="text-base font-semibold text-gray-800 mb-4">Contacter le support</h2>
          <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5 shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-3">
                <span className="p-2.5 bg-blue-50 rounded-xl text-blue-600 shrink-0">
                  <Mail size={18} />
                </span>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Email</p>
                  <p className="text-xs text-gray-500">support@agrifrik.com</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="p-2.5 bg-green-50 rounded-xl text-green-600 shrink-0">
                  <MessageCircle size={18} />
                </span>
                <div>
                  <p className="text-sm font-semibold text-gray-900">WhatsApp</p>
                  <p className="text-xs text-gray-500">+225 07 00 00 00</p>
                  <p className="text-xs text-gray-400">Lun-Ven 8h-18h</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="p-2.5 bg-gray-100 rounded-xl text-gray-600 shrink-0">
                  <Phone size={18} />
                </span>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Téléphone</p>
                  <p className="text-xs text-gray-500">+225 27 22 00 00 00</p>
                  <p className="text-xs text-gray-400">Lun-Ven 8h-18h</p>
                </div>
              </div>
            </div>
            <div className="pt-3 border-t border-gray-100 flex justify-end">
              <button className="flex items-center gap-2 bg-[#2E7D32] hover:bg-[#1B5E20] text-white text-sm font-medium py-2.5 px-5 rounded-xl transition-colors">
                <Ticket size={16} />
                Créer un ticket de support
              </button>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
