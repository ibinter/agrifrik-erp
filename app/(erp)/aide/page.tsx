"use client";

import { useState } from "react";
import Topbar from "../../components/Topbar";
import Link from "next/link";
import {
  BookOpen, Search, ChevronRight, ChevronDown, Play,
  LayoutDashboard, Leaf, Beef, Fish, Map, BarChart2,
  ShoppingCart, Warehouse, Truck, Users, CreditCard,
  FileText, Bell, Settings, Zap, MessageSquare, Calendar,
  HelpCircle, GraduationCap, ArrowRight,
} from "lucide-react";

const MODULES = [
  {
    cat: "Production",
    color: "#2E7D32",
    items: [
      { id: "dashboard", label: "Tableau de bord", icon: LayoutDashboard, href: "/dashboard", desc: "Vue d'ensemble de votre exploitation" },
      { id: "cultures", label: "Cultures", icon: Leaf, href: "/cultures", desc: "Gestion des parcelles, semis, récoltes" },
      { id: "elevage", label: "Élevage", icon: Beef, href: "/elevage", desc: "Suivi du bétail, alimentation, vétérinaire" },
      { id: "pisciculture", label: "Pisciculture", icon: Fish, href: "/pisciculture", desc: "Gestion des bassins et cycles aquacoles" },
      { id: "cartographie", label: "Cartographie", icon: Map, href: "/cartographie", desc: "Carte interactive des parcelles" },
    ],
  },
  {
    cat: "Logistique",
    color: "#E65100",
    items: [
      { id: "stocks", label: "Stocks", icon: Warehouse, href: "/stocks", desc: "Inventaire intrants et produits finis" },
      { id: "achats", label: "Achats", icon: ShoppingCart, href: "/achats", desc: "Commandes fournisseurs et réceptions" },
      { id: "materiels", label: "Matériels", icon: Truck, href: "/materiels", desc: "Parc matériel, entretien, utilisation" },
      { id: "logistique", label: "Transport", icon: Truck, href: "/logistique", desc: "Planification transport et livraisons" },
    ],
  },
  {
    cat: "Commerce",
    color: "#1565C0",
    items: [
      { id: "ventes", label: "Ventes", icon: BarChart2, href: "/ventes", desc: "Commandes clients, factures, livraisons" },
      { id: "exportation", label: "Exportation", icon: ArrowRight, href: "/exportation", desc: "Dossiers export, certifications" },
      { id: "prix-marche", label: "Prix du marché", icon: BarChart2, href: "/prix-marche", desc: "Cours des denrées en temps réel" },
      { id: "devis", label: "Devis", icon: FileText, href: "/devis", desc: "Créer et envoyer des devis clients" },
    ],
  },
  {
    cat: "Finance",
    color: "#6A1B9A",
    items: [
      { id: "comptabilite", label: "Comptabilité", icon: CreditCard, href: "/comptabilite", desc: "Journal, grand livre, balance" },
      { id: "tresorerie", label: "Trésorerie", icon: CreditCard, href: "/tresorerie", desc: "Cash flow, recettes, dépenses" },
      { id: "budget", label: "Budget", icon: BarChart2, href: "/budget", desc: "Budget prévisionnel par campagne" },
    ],
  },
  {
    cat: "RH",
    color: "#00695C",
    items: [
      { id: "rh", label: "Ressources humaines", icon: Users, href: "/rh", desc: "Employés, contrats, congés" },
      { id: "paie", label: "Paie", icon: CreditCard, href: "/paie", desc: "Calcul des salaires et bulletins" },
      { id: "formations", label: "Formations", icon: GraduationCap, href: "/formations", desc: "Plan de formation du personnel" },
    ],
  },
  {
    cat: "Outils",
    color: "#37474F",
    items: [
      { id: "ia", label: "Assistant IA (SARA)", icon: Zap, href: "/ia", desc: "Conseils agronomiques et analyses" },
      { id: "meteo", label: "Météo", icon: Calendar, href: "/meteo", desc: "Prévisions météo et alertes" },
      { id: "messagerie", label: "Messagerie", icon: MessageSquare, href: "/messagerie", desc: "Communication interne équipe" },
      { id: "alertes", label: "Alertes", icon: Bell, href: "/alertes", desc: "Notifications et rappels" },
      { id: "parametres", label: "Paramètres", icon: Settings, href: "/parametres", desc: "Configuration de votre espace" },
    ],
  },
];

const GUIDES: Record<string, { title: string; steps: string[] }[]> = {
  dashboard: [
    { title: "Comprendre les KPIs", steps: ["Le tableau de bord affiche vos indicateurs clés en temps réel.", "Les cartes colorées résument la production, les finances et les stocks.", "Cliquez sur une carte pour accéder au module détaillé.", "Utilisez les filtres en haut pour changer la période d'analyse."] },
    { title: "Personnaliser la vue", steps: ["Cliquez sur l'icône ⚙ en haut à droite du tableau de bord.", "Sélectionnez les widgets à afficher ou masquer.", "Glissez-déposez les cartes pour réorganiser.", "Vos préférences sont sauvegardées automatiquement."] },
  ],
  cultures: [
    { title: "Créer une parcelle", steps: ["Accédez à Cultures > Parcelles.", "Cliquez sur '+ Nouvelle parcelle'.", "Saisissez le nom, la superficie (en hectares) et la localisation.", "Dessinez la parcelle sur la carte ou importez un fichier KML.", "Enregistrez — la parcelle apparaît dans la cartographie."] },
    { title: "Planifier un semis", steps: ["Dans la fiche parcelle, cliquez sur 'Planifier un semis'.", "Choisissez la culture et la variété dans la liste.", "Saisissez la date prévue et la quantité de semences.", "SARA suggère automatiquement la densité optimale.", "Validez pour créer la tâche dans le planning cultural."] },
  ],
  stocks: [
    { title: "Enregistrer une entrée de stock", steps: ["Accédez à Stocks > Mouvements.", "Cliquez '+ Entrée'.", "Sélectionnez le produit ou créez-en un nouveau.", "Renseignez la quantité, le prix unitaire et le fournisseur.", "Ajoutez le numéro de lot pour la traçabilité.", "Validez — le stock est mis à jour instantanément."] },
    { title: "Déclencher une alerte de stock bas", steps: ["Dans la fiche produit, cliquez sur 'Seuil d'alerte'.", "Définissez la quantité minimale souhaitée.", "Choisissez les destinataires de l'alerte email/SMS.", "Une alerte rouge apparaîtra dès que ce seuil est atteint."] },
  ],
  ventes: [
    { title: "Créer une commande client", steps: ["Accédez à Ventes > Commandes.", "Cliquez sur '+ Nouvelle commande'.", "Sélectionnez ou créez le client.", "Ajoutez les produits avec quantités et prix.", "Choisissez les conditions de paiement.", "Générez la facture PDF en un clic."] },
  ],
  rh: [
    { title: "Ajouter un employé", steps: ["Accédez à RH > Employés.", "Cliquez '+ Nouvel employé'.", "Renseignez identité, poste, date d'entrée et salaire.", "Uploadez les documents (contrat, CNI, diplômes).", "L'employé reçoit une invitation email pour créer son compte."] },
  ],
};

export default function AidePage() {
  const [search, setSearch] = useState("");
  const [activeModule, setActiveModule] = useState<string | null>(null);
  const [openGuide, setOpenGuide] = useState<number | null>(null);

  const allItems = MODULES.flatMap(m => m.items);
  const filtered = search.trim()
    ? allItems.filter(i => i.label.toLowerCase().includes(search.toLowerCase()) || i.desc.toLowerCase().includes(search.toLowerCase()))
    : [];

  const activeGuides = activeModule ? (GUIDES[activeModule] ?? []) : [];
  const activeMeta = allItems.find(i => i.id === activeModule);

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FBF8]">
      <Topbar />
      <div className="flex-1 p-5 max-w-7xl mx-auto w-full space-y-6">

        {/* Hero */}
        <div className="rounded-2xl p-6 text-white" style={{ background: "linear-gradient(135deg, #1B5E20 0%, #2E7D32 60%, #388E3C 100%)" }}>
          <div className="flex items-center gap-3 mb-2">
            <BookOpen size={22} />
            <h1 className="text-xl font-bold">Centre d&apos;aide AGRIFRIK</h1>
          </div>
          <p className="text-sm opacity-80 mb-4">Trouvez rapidement comment utiliser chaque module de votre ERP agricole.</p>
          <div className="relative max-w-lg">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white opacity-60" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Cherchez une fonctionnalité…"
              className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm outline-none"
              style={{ backgroundColor: "rgba(255,255,255,0.15)", color: "white", border: "1px solid rgba(255,255,255,0.2)" }} />
          </div>
          {filtered.length > 0 && (
            <div className="mt-2 rounded-xl overflow-hidden" style={{ backgroundColor: "rgba(0,0,0,0.3)" }}>
              {filtered.map(item => {
                const Icon = item.icon;
                return (
                  <button key={item.id} onClick={() => { setActiveModule(item.id); setSearch(""); setOpenGuide(null); }}
                    className="flex items-center gap-3 w-full px-4 py-2.5 hover:bg-white/10 transition-colors text-left">
                    <Icon size={14} className="opacity-70" />
                    <span className="text-sm">{item.label}</span>
                    <span className="text-xs opacity-50 ml-auto">{item.desc}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Liens rapides */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "100 FAQ", href: "/aide/faq", icon: HelpCircle, color: "#E65100" },
            { label: "Académie AGRIFRIK", href: "/aide/academie", icon: GraduationCap, color: "#1565C0" },
            { label: "Contacter le support", href: "/messagerie", icon: MessageSquare, color: "#2E7D32" },
            { label: "Vidéos de démonstration", href: "/aide/academie#videos", icon: Play, color: "#6A1B9A" },
          ].map(item => {
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href}
                className="flex items-center gap-3 px-4 py-3 rounded-2xl border border-gray-100 bg-white hover:shadow-sm transition-shadow">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${item.color}15` }}>
                  <Icon size={15} style={{ color: item.color }} />
                </div>
                <span className="text-xs font-medium text-gray-700">{item.label}</span>
                <ChevronRight size={13} className="ml-auto text-gray-300" />
              </Link>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Liste modules */}
          <div className="space-y-3">
            {MODULES.map(cat => (
              <div key={cat.cat} className="rounded-2xl border border-gray-100 bg-white overflow-hidden">
                <div className="px-4 py-2.5 border-b border-gray-50">
                  <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: cat.color }}>{cat.cat}</span>
                </div>
                {cat.items.map(item => {
                  const Icon = item.icon;
                  const active = activeModule === item.id;
                  return (
                    <button key={item.id} onClick={() => { setActiveModule(item.id); setOpenGuide(null); }}
                      className="flex items-center gap-3 w-full px-4 py-2.5 text-left transition-colors hover:bg-gray-50"
                      style={{ backgroundColor: active ? `${cat.color}08` : undefined }}>
                      <Icon size={14} style={{ color: active ? cat.color : "#9CA3AF" }} />
                      <div className="min-w-0">
                        <p className="text-xs font-medium text-gray-800 truncate">{item.label}</p>
                        <p className="text-[10px] text-gray-400 truncate">{item.desc}</p>
                      </div>
                      {active && <ChevronRight size={12} className="ml-auto flex-shrink-0" style={{ color: cat.color }} />}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Guide détaillé */}
          <div className="lg:col-span-2">
            {!activeModule ? (
              <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center h-full flex flex-col items-center justify-center">
                <BookOpen size={36} className="text-gray-200 mb-3" />
                <p className="text-sm font-medium text-gray-400">Sélectionnez un module</p>
                <p className="text-xs text-gray-300 mt-1">Le guide pas-à-pas s&apos;affichera ici</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="rounded-2xl border border-gray-100 bg-white p-5">
                  <div className="flex items-center gap-3 mb-1">
                    {activeMeta && <activeMeta.icon size={18} className="text-[#2E7D32]" />}
                    <h2 className="font-bold text-gray-800">{activeMeta?.label}</h2>
                  </div>
                  <p className="text-xs text-gray-500 mb-4">{activeMeta?.desc}</p>
                  <Link href={activeMeta?.href ?? "#"}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white"
                    style={{ backgroundColor: "#2E7D32" }}>
                    Ouvrir le module <ArrowRight size={12} />
                  </Link>
                </div>

                {activeGuides.length === 0 ? (
                  <div className="rounded-2xl border border-gray-100 bg-white p-6 text-center">
                    <p className="text-xs text-gray-400">Guide en cours de rédaction — consultez la <Link href="/aide/faq" className="text-[#2E7D32] underline">FAQ</Link> en attendant.</p>
                  </div>
                ) : activeGuides.map((guide, gi) => (
                  <div key={gi} className="rounded-2xl border border-gray-100 bg-white overflow-hidden">
                    <button onClick={() => setOpenGuide(openGuide === gi ? null : gi)}
                      className="flex items-center justify-between w-full px-5 py-4 text-left hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ backgroundColor: "#2E7D32" }}>{gi + 1}</div>
                        <span className="text-sm font-semibold text-gray-800">{guide.title}</span>
                      </div>
                      <ChevronDown size={15} className={`text-gray-400 transition-transform ${openGuide === gi ? "rotate-180" : ""}`} />
                    </button>
                    {openGuide === gi && (
                      <div className="px-5 pb-5">
                        <ol className="space-y-2.5">
                          {guide.steps.map((step, si) => (
                            <li key={si} className="flex gap-3">
                              <span className="w-5 h-5 rounded-full border-2 flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5" style={{ borderColor: "#4CAF50", color: "#4CAF50" }}>{si + 1}</span>
                              <p className="text-xs text-gray-600 leading-relaxed">{step}</p>
                            </li>
                          ))}
                        </ol>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
