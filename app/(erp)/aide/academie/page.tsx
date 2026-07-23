"use client";

import { useState } from "react";
import Topbar from "../../../components/Topbar";
import Link from "next/link";
import {
  GraduationCap, Play, Clock, Star, ChevronRight, BookOpen,
  Leaf, CreditCard, Users, Zap, BarChart2, Award, Lock,
} from "lucide-react";

const PARCOURS = [
  {
    id: "debutant",
    titre: "Démarrage rapide",
    description: "Configurez votre espace AGRIFRIK et créez votre première exploitation en moins d'une heure.",
    duree: "45 min",
    niveau: "Débutant",
    couleur: "#4CAF50",
    modules: 5,
    icon: BookOpen,
    gratuit: true,
  },
  {
    id: "cultures",
    titre: "Maîtrise des cultures",
    description: "Gérez vos parcelles, planifiez vos campagnes et optimisez vos rendements avec les outils AGRIFRIK.",
    duree: "2h 30",
    niveau: "Intermédiaire",
    couleur: "#2E7D32",
    modules: 8,
    icon: Leaf,
    gratuit: true,
  },
  {
    id: "finance",
    titre: "Finance agricole",
    description: "Maîtrisez la comptabilité, la trésorerie et le budget prévisionnel de votre exploitation.",
    duree: "3h 00",
    niveau: "Avancé",
    couleur: "#6A1B9A",
    modules: 10,
    icon: CreditCard,
    gratuit: false,
  },
  {
    id: "cooperative",
    titre: "Gérer une coopérative",
    description: "Administrez les membres, les cotisations et les projets collectifs de votre coopérative.",
    duree: "2h 00",
    niveau: "Intermédiaire",
    couleur: "#E65100",
    modules: 7,
    icon: Users,
    gratuit: false,
  },
  {
    id: "ia",
    titre: "SARA — L'IA agricole",
    description: "Tirez le maximum de l'assistant SARA : conseils, prévisions, alertes et recommandations.",
    duree: "1h 15",
    niveau: "Tous niveaux",
    couleur: "#0288D1",
    modules: 4,
    icon: Zap,
    gratuit: true,
  },
  {
    id: "export",
    titre: "Commerce et exportation",
    description: "Gérez vos commandes clients, dossiers export, certifications et prix du marché international.",
    duree: "2h 45",
    niveau: "Avancé",
    couleur: "#1565C0",
    modules: 9,
    icon: BarChart2,
    gratuit: false,
  },
];

const VIDEOS = [
  { id: 1, titre: "Présentation générale d'AGRIFRIK", duree: "8:24", vues: "1.2k", categorie: "Démarrage", thumb: "🌱" },
  { id: 2, titre: "Créer et gérer vos parcelles", duree: "12:05", vues: "847", categorie: "Cultures", thumb: "🗺️" },
  { id: 3, titre: "Enregistrer une récolte et calculer le rendement", duree: "9:33", vues: "632", categorie: "Cultures", thumb: "🌾" },
  { id: 4, titre: "Gérer ses stocks d'intrants", duree: "7:18", vues: "521", categorie: "Logistique", thumb: "📦" },
  { id: 5, titre: "Créer une facture de vente", duree: "6:45", vues: "498", categorie: "Commerce", thumb: "🧾" },
  { id: 6, titre: "Configurer les alertes et notifications", duree: "5:12", vues: "412", categorie: "Paramètres", thumb: "🔔" },
  { id: 7, titre: "Utiliser SARA pour les conseils agronomiques", duree: "11:40", vues: "387", categorie: "IA", thumb: "🤖" },
  { id: 8, titre: "Suivi du bétail et santé animale", duree: "14:22", vues: "305", categorie: "Élevage", thumb: "🐄" },
  { id: 9, titre: "Export de données et rapports PDF", duree: "8:55", vues: "289", categorie: "Rapports", thumb: "📊" },
  { id: 10, titre: "Gestion des employés et de la paie", duree: "10:17", vues: "241", categorie: "RH", thumb: "👥" },
  { id: 11, titre: "Suivi de la trésorerie au quotidien", duree: "9:48", vues: "198", categorie: "Finance", thumb: "💰" },
  { id: 12, titre: "Cartographie et SIG agricole", duree: "13:04", vues: "176", categorie: "Cartographie", thumb: "📍" },
];

const ARTICLES = [
  { titre: "5 bonnes pratiques pour gérer votre trésorerie agricole", cat: "Finance", temps: "6 min" },
  { titre: "Comment améliorer vos rendements grâce à la rotation des cultures", cat: "Agronomie", temps: "8 min" },
  { titre: "Guide complet de l'exportation de cacao depuis la Côte d'Ivoire", cat: "Commerce", temps: "12 min" },
  { titre: "Mettre en place un système de traçabilité efficace", cat: "Qualité", temps: "7 min" },
  { titre: "SARA : comment interpréter les recommandations de l'IA", cat: "IA", temps: "5 min" },
  { titre: "Gestion des coopératives agricoles sur AGRIFRIK", cat: "Coopérative", temps: "10 min" },
  { titre: "Préparer votre dossier pour un financement FIDA/BAD", cat: "Financement", temps: "15 min" },
  { titre: "Sécuriser vos données et gérer les accès utilisateurs", cat: "Sécurité", temps: "6 min" },
];

export default function AcademiePage() {
  const [tab, setTab] = useState<"parcours" | "videos" | "articles">("parcours");
  const [catFilter, setCatFilter] = useState("Tous");

  const cats = ["Tous", ...Array.from(new Set(VIDEOS.map(v => v.categorie)))];
  const filteredVideos = catFilter === "Tous" ? VIDEOS : VIDEOS.filter(v => v.categorie === catFilter);

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FBF8]">
      <Topbar />
      <div className="flex-1 p-5 max-w-7xl mx-auto w-full space-y-6">

        {/* Hero */}
        <div className="rounded-2xl p-7 text-white relative overflow-hidden" style={{ background: "linear-gradient(135deg, #1565C0 0%, #1976D2 60%, #42A5F5 100%)" }}>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-1">
              <GraduationCap size={24} />
              <h1 className="text-xl font-bold">Académie AGRIFRIK</h1>
            </div>
            <p className="text-sm opacity-80 max-w-lg">
              Formez-vous à votre rythme avec nos parcours structurés, vidéos tutorielles et articles d'experts agricoles africains.
            </p>
            <div className="flex gap-5 mt-4 text-xs">
              {[["6", "Parcours"], ["12+", "Vidéos"], ["8", "Articles"], ["Gratuit", "Accès de base"]].map(([v, l]) => (
                <div key={l}><p className="text-lg font-black">{v}</p><p className="opacity-60">{l}</p></div>
              ))}
            </div>
          </div>
          <div className="absolute right-6 top-4 opacity-10 text-9xl select-none">🎓</div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2">
          {(["parcours", "videos", "articles"] as const).map(t => (
            <button key={t} onClick={() => setTab(t)}
              className="px-4 py-2 rounded-xl text-xs font-semibold capitalize transition-all"
              style={{
                backgroundColor: tab === t ? "#2E7D32" : "white",
                color: tab === t ? "white" : "#6B7280",
                border: "1px solid",
                borderColor: tab === t ? "#2E7D32" : "#E5E7EB",
              }}>
              {t === "parcours" ? "Parcours de formation" : t === "videos" ? "Vidéos tutorielles" : "Articles & Guides"}
            </button>
          ))}
        </div>

        {/* Parcours */}
        {tab === "parcours" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {PARCOURS.map(p => {
              const Icon = p.icon;
              return (
                <div key={p.id} className="rounded-2xl border border-gray-100 bg-white p-5 flex flex-col">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ backgroundColor: `${p.couleur}15` }}>
                      <Icon size={18} style={{ color: p.couleur }} />
                    </div>
                    {!p.gratuit && (
                      <span className="flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: "#FFF3E0", color: "#E65100" }}>
                        <Lock size={9} /> Pro
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-sm text-gray-800 mb-1">{p.titre}</h3>
                  <p className="text-xs text-gray-500 flex-1 leading-relaxed mb-3">{p.description}</p>
                  <div className="flex items-center justify-between text-[11px] text-gray-400 mb-3">
                    <span className="flex items-center gap-1"><Clock size={11} /> {p.duree}</span>
                    <span>{p.modules} modules</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px]" style={{ backgroundColor: `${p.couleur}12`, color: p.couleur }}>{p.niveau}</span>
                  </div>
                  <button className="w-full py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all"
                    style={{ backgroundColor: p.gratuit ? p.couleur : "#F3F4F6", color: p.gratuit ? "white" : "#9CA3AF" }}>
                    {p.gratuit ? <><Play size={11} /> Commencer</>  : <><Lock size={11} /> Accès Pro requis</>}
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* Vidéos */}
        {tab === "videos" && (
          <div>
            <div id="videos" className="flex gap-2 flex-wrap mb-4">
              {cats.map(c => (
                <button key={c} onClick={() => setCatFilter(c)}
                  className="px-3 py-1.5 rounded-lg text-xs transition-all"
                  style={{
                    backgroundColor: catFilter === c ? "#2E7D32" : "white",
                    color: catFilter === c ? "white" : "#6B7280",
                    border: "1px solid",
                    borderColor: catFilter === c ? "#2E7D32" : "#E5E7EB",
                  }}>
                  {c}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredVideos.map(v => (
                <div key={v.id} className="rounded-2xl border border-gray-100 bg-white overflow-hidden group cursor-pointer hover:shadow-sm transition-shadow">
                  <div className="h-32 flex items-center justify-center text-5xl relative" style={{ backgroundColor: "#F0F7F0" }}>
                    {v.thumb}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" style={{ backgroundColor: "rgba(27,94,32,0.7)" }}>
                      <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                        <Play size={18} className="text-[#2E7D32] ml-0.5" />
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-xs font-semibold text-gray-800 mb-1 leading-snug">{v.titre}</p>
                    <div className="flex items-center justify-between text-[10px] text-gray-400">
                      <span className="flex items-center gap-1"><Clock size={10} /> {v.duree}</span>
                      <span>{v.vues} vues</span>
                      <span className="px-1.5 py-0.5 rounded text-[10px]" style={{ backgroundColor: "#F0F7F0", color: "#2E7D32" }}>{v.categorie}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Articles */}
        {tab === "articles" && (
          <div className="space-y-3">
            {ARTICLES.map((a, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-2xl border border-gray-100 bg-white hover:shadow-sm transition-shadow cursor-pointer">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#F0F7F0" }}>
                  <BookOpen size={16} className="text-[#2E7D32]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800 truncate">{a.titre}</p>
                  <div className="flex items-center gap-3 mt-0.5">
                    <span className="text-[11px] px-1.5 py-0.5 rounded" style={{ backgroundColor: "#F0F7F0", color: "#2E7D32" }}>{a.cat}</span>
                    <span className="text-[11px] text-gray-400 flex items-center gap-1"><Clock size={9} /> {a.temps} de lecture</span>
                  </div>
                </div>
                <ChevronRight size={15} className="text-gray-300 flex-shrink-0" />
              </div>
            ))}
          </div>
        )}

        {/* Certification */}
        <div className="rounded-2xl border-2 p-6 flex items-center gap-5" style={{ borderColor: "#FFD700", backgroundColor: "#FFFDE7" }}>
          <Award size={36} style={{ color: "#FFD700", flexShrink: 0 }} />
          <div>
            <h3 className="font-bold text-gray-800">Certification AGRIFRIK</h3>
            <p className="text-xs text-gray-600 mt-0.5">Complétez l'ensemble des parcours pour obtenir votre certificat officiel de maîtrise de l'ERP AGRIFRIK, reconnu par nos partenaires institutionnels (FIDA, BAD, MINAGRI).</p>
          </div>
          <Link href="/aide/academie" className="ml-auto flex-shrink-0 px-4 py-2 rounded-xl text-xs font-bold"
            style={{ backgroundColor: "#FFD700", color: "#4E3E00" }}>
            En savoir plus
          </Link>
        </div>

      </div>
    </div>
  );
}
