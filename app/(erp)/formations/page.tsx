"use client";

import { useState } from "react";
import Topbar from "../../components/Topbar";
import {
  BookOpen,
  Users,
  Clock,
  Wallet,
  Award,
  AlertCircle,
  CheckCircle,
  Calendar,
  ChevronRight,
} from "lucide-react";

/* ─── DATA ─────────────────────────────────────────────────── */

const formations = [
  { titre: "Bonnes pratiques Rainforest Alliance", type: "Terrain",     organisme: "ANADER CI",      dates: "10-14 Mar", duree: "5j / 40h", participants: "32 agents",   cout: "320 000 XOF",  statut: "Terminée",   eval: "4,2 / 5" },
  { titre: "Sécurité & EPI",                       type: "Sécurité",    organisme: "Interne",         dates: "08 Avr",    duree: "1j / 8h",  participants: "287 emp.",    cout: "45 000 XOF",   statut: "Terminée",   eval: "4,5 / 5" },
  { titre: "Gestion post-récolte cacao",           type: "Technique",   organisme: "CNRA",            dates: "22-23 Juil",duree: "2j / 16h", participants: "15 agents",   cout: "150 000 XOF",  statut: "Planifiée",  eval: "—" },
  { titre: "Conduite tracteur (permis)",           type: "Matériels",   organisme: "Auto-école Pro",  dates: "01-30 Juin",duree: "30j",       participants: "4 agents",    cout: "280 000 XOF",  statut: "Terminée",   eval: "Permis ✅" },
  { titre: "Comptabilité SYSCOHADA révisé",        type: "Finance",     organisme: "OHADA CI",        dates: "15-19 Avr", duree: "5j",        participants: "3 agents",    cout: "375 000 XOF",  statut: "Terminée",   eval: "4,0 / 5" },
  { titre: "Pilotage drone DJI Agras",             type: "Technique",   organisme: "DJI Africa",      dates: "02-04 Avr", duree: "3j",        participants: "2 pilotes",   cout: "180 000 XOF",  statut: "Terminée",   eval: "Brevet ✅" },
  { titre: "Leadership & Management",              type: "Management",  organisme: "HEC Abidjan",     dates: "01-05 Sep", duree: "5j",        participants: "5 managers",  cout: "750 000 XOF",  statut: "Planifiée",  eval: "—" },
  { titre: "Gestion financière PME",               type: "Finance",     organisme: "CGECI",           dates: "20-21 Sep", duree: "2j",        participants: "8 cadres",    cout: "320 000 XOF",  statut: "Planifiée",  eval: "—" },
  { titre: "Normes ISO 22000",                     type: "Qualité",     organisme: "Bureau Véritas",  dates: "10 Oct",    duree: "1j",        participants: "12 agents",   cout: "144 000 XOF",  statut: "Planifiée",  eval: "—" },
  { titre: "Premiers secours PSC1",                type: "Sécurité",    organisme: "CRI",             dates: "Nov TBD",   duree: "1j",        participants: "20 agents",   cout: "200 000 XOF",  statut: "À planifier",eval: "—" },
];

const typeColor: Record<string, string> = {
  Terrain:    "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  Sécurité:   "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  Technique:  "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  Matériels:  "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  Finance:    "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  Management: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400",
  Qualité:    "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400",
};

const statutBadge: Record<string, string> = {
  Terminée:    "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  Planifiée:   "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  "À planifier": "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
};

const statutIcon: Record<string, string> = {
  Terminée: "✅",
  Planifiée: "📅",
  "À planifier": "⏳",
};

/* ─── MATRICE COMPÉTENCES ───────────────────────────────────── */

const competences = ["Cacao", "Anacarde", "Matériels", "Qualité", "EPI", "Comptabilité", "Informatique", "Langues"];

type Niveau = 3 | 2 | 1 | 0;
interface Employe {
  nom: string;
  niveaux: Niveau[];
}

const employes: Employe[] = [
  { nom: "Jean-Baptiste K.",  niveaux: [3, 2, 2, 3, 2, 1, 2, 3] },
  { nom: "Konan Yao",         niveaux: [3, 3, 1, 3, 3, 1, 1, 1] },
  { nom: "Ibrahim Sawadogo",  niveaux: [3, 1, 3, 2, 3, 1, 2, 1] },
  { nom: "Adjoua Messou",     niveaux: [1, 1, 1, 2, 2, 3, 3, 2] },
  { nom: "Bamba Oumar",       niveaux: [2, 2, 3, 1, 3, 0, 1, 1] },
  { nom: "Mariam Kouyaté",    niveaux: [1, 0, 1, 2, 2, 2, 3, 3] },
  { nom: "Kouassi Diomandé",  niveaux: [3, 2, 2, 1, 2, 1, 0, 1] },
  { nom: "Ali Traoré",        niveaux: [1, 1, 2, 1, 3, 0, 1, 1] },
];

function NiveauCell({ n }: { n: Niveau }) {
  if (n === 0) return <span className="text-gray-300 dark:text-gray-600 text-xs">—</span>;
  const label = ["", "Débutant", "Confirmé", "Expert"][n];
  const colors = ["", "text-amber-400", "text-blue-500", "text-green-500"];
  return (
    <span title={label} className={`text-sm ${colors[n]}`}>
      {"⭐".repeat(n)}
    </span>
  );
}

// Identifie les gaps : niveau 0 sur compétences critiques
function isGap(n: Niveau, col: number): boolean {
  // Comptabilité (5), Informatique (6) requis pour cadres → gap si 0
  return n === 0;
}

/* ─── CERTIFICATIONS ────────────────────────────────────────── */

const certifications = [
  { employe: "Ibrahim Sawadogo", cert: "Permis phyto A",              organisme: "MINADER",    obtenu: "15/05/2025", validite: "14/05/2027", statut: "Valide" },
  { employe: "Bamba Oumar",      cert: "Permis conduire tracteur",    organisme: "ANTT",        obtenu: "30/06/2025", validite: "Permanent",  statut: "Valide" },
  { employe: "Ibrahim Sawadogo", cert: "Brevet pilote drone DJI",     organisme: "DJI Africa",  obtenu: "04/04/2025", validite: "03/04/2027", statut: "Valide" },
  { employe: "Adjoua Messou",    cert: "Certificat SYSCOHADA",        organisme: "OHADA CI",    obtenu: "19/04/2025", validite: "18/04/2028", statut: "Valide" },
  { employe: "Mariam Kouyaté",   cert: "Certification RH UEMOA",     organisme: "CGRHCI",      obtenu: "15/03/2024", validite: "14/03/2026", statut: "Valide" },
  { employe: "Konan Yao",        cert: "Certificat RA producteur",    organisme: "RA",          obtenu: "01/03/2025", validite: "28/02/2026", statut: "Valide" },
  { employe: "Jean-Baptiste K.", cert: "Leadership HEC",              organisme: "HEC Abidjan", obtenu: "—",          validite: "—",          statut: "En cours" },
  { employe: "Kouassi Diomandé", cert: "ISO 22000 auditeur interne", organisme: "Bureau Véritas", obtenu: "—",       validite: "—",          statut: "Planifiée" },
];

const certStatutBadge: Record<string, string> = {
  Valide:    "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  "En cours": "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  Planifiée: "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300",
};

const certStatutIcon: Record<string, string> = {
  Valide: "✅",
  "En cours": "🔵",
  Planifiée: "📅",
};

/* ─── COMPOSANT PRINCIPAL ───────────────────────────────────── */

type Tab = "formations" | "calendrier" | "competences" | "certifications";

export default function FormationsPage() {
  const [tab, setTab] = useState<Tab>("formations");

  const tabs: { key: Tab; label: string }[] = [
    { key: "formations",    label: "Formations" },
    { key: "calendrier",    label: "Calendrier" },
    { key: "competences",   label: "Compétences" },
    { key: "certifications",label: "Certifications" },
  ];

  return (
    <div>
      <Topbar title="Formations & Compétences" breadcrumb={["RH", "Formations"]} />

      <div className="p-6 space-y-6">

        {/* ── KPI ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {[
            { label: "Formations 2025",       val: "12",          icon: BookOpen, color: "#2E7D32", bg: "#E8F5E9" },
            { label: "Heures total",           val: "860 h",       icon: Clock,    color: "#1565C0", bg: "#E3F2FD" },
            { label: "Employés formés",        val: "145",         icon: Users,    color: "#E65100", bg: "#FFF3E0" },
            { label: "Budget consommé",        val: "1,2 / 1,5 M XOF", icon: Wallet, color: "#6A1B9A", bg: "#F3E5F5", progress: 80 },
            { label: "Certifications obtenues",val: "38",          icon: Award,    color: "#00695C", bg: "#E0F2F1" },
          ].map((k) => {
            const Icon = k.icon;
            return (
              <div key={k.label} className="rounded-xl p-4 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <div className="rounded-lg p-2 shrink-0" style={{ background: k.bg }}>
                    <Icon size={16} style={{ color: k.color }} />
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400 leading-tight">{k.label}</span>
                </div>
                <p className="text-lg font-bold text-gray-900 dark:text-white">{k.val}</p>
                {"progress" in k && (
                  <div className="mt-2">
                    <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-500 rounded-full" style={{ width: `${k.progress}%` }} />
                    </div>
                    <p className="text-xs text-gray-400 mt-1">{k.progress}% utilisé</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ── ONGLETS ── */}
        <div className="flex gap-1 border-b border-gray-200 dark:border-gray-700">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-4 py-2.5 text-sm font-medium rounded-t-lg transition-colors ${
                tab === t.key
                  ? "border-b-2 border-green-700 text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/20"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* ══════════════════════════════════════════════════════
            ONGLET : FORMATIONS
        ══════════════════════════════════════════════════════ */}
        {tab === "formations" && (
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between flex-wrap gap-2">
              <h2 className="font-semibold text-gray-900 dark:text-white text-base flex items-center gap-2">
                <BookOpen size={18} className="text-green-700" />
                Toutes les formations 2025
              </h2>
              <button className="inline-flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors">
                + Nouvelle formation
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[900px]">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wide">
                    {["Formation", "Type", "Organisme", "Dates", "Durée", "Participants", "Coût", "Statut", "Évaluation"].map((h) => (
                      <th key={h} className="px-4 py-3 text-left">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {formations.map((f, i) => (
                    <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                      <td className="px-4 py-3 font-medium text-gray-900 dark:text-white max-w-[220px]">{f.titre}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${typeColor[f.type] ?? "bg-gray-100 text-gray-600"}`}>
                          {f.type}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-300 whitespace-nowrap">{f.organisme}</td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-300 whitespace-nowrap">{f.dates}</td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-300 whitespace-nowrap">{f.duree}</td>
                      <td className="px-4 py-3 text-gray-700 dark:text-gray-200 whitespace-nowrap">{f.participants}</td>
                      <td className="px-4 py-3 text-gray-700 dark:text-gray-200 whitespace-nowrap">{f.cout}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statutBadge[f.statut] ?? "bg-gray-100 text-gray-600"}`}>
                          {statutIcon[f.statut]} {f.statut}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-700 dark:text-gray-200 whitespace-nowrap">{f.eval}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════
            ONGLET : CALENDRIER
        ══════════════════════════════════════════════════════ */}
        {tab === "calendrier" && (
          <div className="space-y-4">
            {["Janvier–Mars", "Avril–Juin", "Juillet–Septembre", "Octobre–Décembre"].map((trim, ti) => {
              const slice = formations.slice(ti * 2, ti * 2 + 3);
              return (
                <div key={trim} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
                  <div className="px-6 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
                    <h3 className="font-semibold text-gray-700 dark:text-gray-200 text-sm flex items-center gap-2">
                      <Calendar size={15} className="text-green-700" />
                      {trim} 2025
                    </h3>
                  </div>
                  <div className="divide-y divide-gray-100 dark:divide-gray-700">
                    {slice.map((f, i) => (
                      <div key={i} className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                        <div className="w-20 shrink-0 text-center">
                          <p className="text-xs font-bold text-green-700 dark:text-green-400">{f.dates}</p>
                          <p className="text-xs text-gray-400">{f.duree}</p>
                        </div>
                        <ChevronRight size={14} className="text-gray-300 shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 dark:text-white text-sm truncate">{f.titre}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{f.organisme} · {f.participants}</p>
                        </div>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${typeColor[f.type] ?? ""}`}>{f.type}</span>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${statutBadge[f.statut] ?? ""}`}>
                          {statutIcon[f.statut]} {f.statut}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ══════════════════════════════════════════════════════
            ONGLET : COMPÉTENCES
        ══════════════════════════════════════════════════════ */}
        {tab === "competences" && (
          <div className="space-y-4">
            {/* Légende */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 px-5 py-3">
              <span className="font-semibold text-gray-700 dark:text-gray-300">Niveaux :</span>
              <span className="text-green-500">⭐⭐⭐ Expert</span>
              <span className="text-blue-500">⭐⭐ Confirmé</span>
              <span className="text-amber-400">⭐ Débutant</span>
              <span className="text-gray-300 dark:text-gray-600">— Non évalué</span>
              <span className="ml-auto px-2 py-0.5 rounded bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 font-medium">
                Fond rouge = gap identifié
              </span>
            </div>

            {/* Matrice */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wide">
                      <th className="px-4 py-3 text-left sticky left-0 bg-gray-50 dark:bg-gray-700/50 z-10 min-w-[160px]">Employé</th>
                      {competences.map((c) => (
                        <th key={c} className="px-3 py-3 text-center whitespace-nowrap">{c}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                    {employes.map((e, i) => (
                      <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                        <td className="px-4 py-3 font-medium text-gray-900 dark:text-white sticky left-0 bg-white dark:bg-gray-800 z-10 whitespace-nowrap">{e.nom}</td>
                        {e.niveaux.map((n, ci) => (
                          <td
                            key={ci}
                            className={`px-3 py-3 text-center ${
                              isGap(n, ci)
                                ? "bg-red-50 dark:bg-red-900/20"
                                : ""
                            }`}
                          >
                            <NiveauCell n={n} />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Recommandations */}
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-xl px-5 py-4">
              <p className="flex items-center gap-2 text-sm font-semibold text-amber-800 dark:text-amber-300 mb-2">
                <AlertCircle size={16} /> Gaps prioritaires identifiés
              </p>
              <ul className="text-xs text-amber-700 dark:text-amber-400 space-y-1 list-disc list-inside">
                <li>Mariam Kouyaté — Anacarde non évaluée (gap)</li>
                <li>Bamba Oumar — Comptabilité non évaluée (gap)</li>
                <li>Kouassi Diomandé — Informatique non évalué (gap)</li>
                <li>Ali Traoré — Comptabilité non évaluée (gap)</li>
              </ul>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════
            ONGLET : CERTIFICATIONS
        ══════════════════════════════════════════════════════ */}
        {tab === "certifications" && (
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between flex-wrap gap-2">
              <h2 className="font-semibold text-gray-900 dark:text-white text-base flex items-center gap-2">
                <Award size={18} className="text-green-700" />
                Certifications individuelles
              </h2>
              <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-1"><CheckCircle size={13} className="text-green-600" /> {certifications.filter(c => c.statut === "Valide").length} valides</span>
                <span className="flex items-center gap-1"><span className="text-blue-500">🔵</span> {certifications.filter(c => c.statut === "En cours").length} en cours</span>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[800px]">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wide">
                    {["Employé", "Certification", "Organisme", "Obtenu le", "Valide jusqu'au", "Statut"].map((h) => (
                      <th key={h} className="px-4 py-3 text-left">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {certifications.map((c, i) => (
                    <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                      <td className="px-4 py-3 font-medium text-gray-900 dark:text-white whitespace-nowrap">{c.employe}</td>
                      <td className="px-4 py-3 text-gray-700 dark:text-gray-200">{c.cert}</td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-300 whitespace-nowrap">{c.organisme}</td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-300 whitespace-nowrap">{c.obtenu}</td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-300 whitespace-nowrap">{c.validite}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${certStatutBadge[c.statut] ?? ""}`}>
                          {certStatutIcon[c.statut]} {c.statut}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
