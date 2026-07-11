"use client";

import { useState } from "react";
import Topbar from "../../components/Topbar";
import {
  ClipboardCheck,
  TrendingUp,
  AlertTriangle,
  ShieldCheck,
  Star,
} from "lucide-react";

/* ─── DATA ─────────────────────────────────────────── */

const controles = [
  { lot: "LOT-048", produit: "Cacao Grade A",      date: "09/07/2025", controleur: "Ibrahim S.", humidite: "7,2% ✅",  impuretes: "0,8% ✅",  calibre: "AA ✅",    score: 98, conforme: true },
  { lot: "LOT-047", produit: "Anacarde WW240",      date: "08/07/2025", controleur: "Konan Y.",  humidite: "9,1% ✅",  impuretes: "1,2% ✅",  calibre: "WW240 ✅", score: 96, conforme: true },
  { lot: "LOT-046", produit: "Cacao Grade A",       date: "08/07/2025", controleur: "Ibrahim S.", humidite: "8,4% ✅",  impuretes: "1,8% ✅",  calibre: "A ✅",     score: 93, conforme: true },
  { lot: "LOT-045", produit: "Cacao Grade B",       date: "07/07/2025", controleur: "Ibrahim S.", humidite: "9,8% ✅",  impuretes: "2,1% ✅",  calibre: "B ✅",     score: 89, conforme: true },
  { lot: "LOT-044", produit: "Maïs blanc",          date: "06/07/2025", controleur: "Konan Y.",  humidite: "12,1% ✅", impuretes: "3,2% ✅",  calibre: "Standard", score: 91, conforme: true },
  { lot: "LOT-043", produit: "Bananiers plantain",  date: "05/07/2025", controleur: "Ibrahim S.", humidite: "—",        impuretes: "—",        calibre: "Calibre A",score: 88, conforme: true },
  { lot: "LOT-042", produit: "Cacao Grade A",       date: "04/07/2025", controleur: "Ibrahim S.", humidite: "7,8% ✅",  impuretes: "0,9% ✅",  calibre: "AA ✅",    score: 97, conforme: true },
  { lot: "LOT-041", produit: "Anacarde brut",       date: "03/07/2025", controleur: "Konan Y.",  humidite: "9,6% ✅",  impuretes: "2,4% ✅",  calibre: "—",        score: 87, conforme: true },
  { lot: "LOT-040", produit: "Cacao Grade A",       date: "02/07/2025", controleur: "Ibrahim S.", humidite: "8,2% ✅",  impuretes: "1,1% ✅",  calibre: "A ✅",     score: 94, conforme: true },
  { lot: "LOT-032", produit: "Anacarde WW240",      date: "07/07/2025", controleur: "Konan Y.",  humidite: "12,4% ❌", impuretes: "1,8% ✅",  calibre: "WW240",    score: 58, conforme: false },
];

const ncActives = [
  {
    num: "NC-2025-003", lot: "LOT-032", produit: "Anacarde WW240",
    parametre: "Humidité", valeur: "12,4%", norme: "< 10%",
    gravite: "Critique", graviteColor: "text-red-600",
    statutLabel: "Bloqué", statutColor: "bg-red-100 text-red-700",
    responsable: "Konan Y.", action: "Séchage d'urgence en cours",
  },
  {
    num: "NC-2025-002", lot: "LOT-038", produit: "Cacao Grade B",
    parametre: "Impuretés", valeur: "4,2%", norme: "< 3%",
    gravite: "Majeure", graviteColor: "text-orange-500",
    statutLabel: "En traitement", statutColor: "bg-orange-100 text-orange-700",
    responsable: "Ibrahim S.", action: "Triage manuel effectué 50%",
  },
  {
    num: "NC-2025-001", lot: "LOT-028", produit: "Maïs",
    parametre: "Aflatoxines", valeur: "8 ppb", norme: "< 5 ppb",
    gravite: "Critique", graviteColor: "text-red-600",
    statutLabel: "Résolu ✅", statutColor: "bg-green-100 text-green-700",
    responsable: "Lab AgroCI", action: "Lot détruit + compostage",
  },
];

const ncArchivees = [
  { num: "NC-2024-018", lot: "LOT-019", produit: "Cacao Grade B",    parametre: "Humidité",   valeur: "9,2%",  norme: "<8,5%", statut: "Archivé", date: "12/12/2024" },
  { num: "NC-2024-015", lot: "LOT-012", produit: "Maïs blanc",       parametre: "Aflatoxines",valeur: "4,8 ppb",norme:"<4 ppb", statut: "Archivé", date: "05/11/2024" },
  { num: "NC-2024-010", lot: "LOT-008", produit: "Anacarde brut",    parametre: "Humidité",   valeur: "10,8%", norme: "< 10%", statut: "Archivé", date: "18/09/2024" },
  { num: "NC-2024-006", lot: "LOT-004", produit: "Cacao Grade A",    parametre: "Moisissures",valeur: "2,4%",  norme: "< 2%",  statut: "Archivé", date: "03/07/2024" },
  { num: "NC-2024-002", lot: "LOT-001", produit: "Anacarde WW240",   parametre: "Calibre",    valeur: "W320",  norme: "WW240", statut: "Archivé", date: "14/04/2024" },
];

const parametres = [
  { produit: "Cacao Grade AA",  critere: "Humidité",   cible: "7,5%",  tolerance: "± 0,5%", methode: "Humidimètre KETT" },
  { produit: "Cacao Grade A",   critere: "Humidité",   cible: "< 8,5%",tolerance: "—",       methode: "Humidimètre KETT" },
  { produit: "Cacao",           critere: "Impuretés",  cible: "< 2%",  tolerance: "—",       methode: "Tamis + pesée" },
  { produit: "Anacarde WW240",  critere: "Humidité",   cible: "< 10%", tolerance: "—",       methode: "Humidimètre" },
  { produit: "Anacarde",        critere: "Outturn",    cible: "> 48 kg/bag", tolerance: "—", methode: "Test outturn" },
  { produit: "Maïs",            critere: "Humidité",   cible: "< 13%", tolerance: "—",       methode: "Humidimètre" },
];

const certifications = [
  { nom: "UTZ Certified", produit: "Cacao", expiration: "31/03/2026", statut: "Valide", couleur: "bg-green-100 text-green-700" },
  { nom: "Rainforest Alliance", produit: "Cacao", expiration: "15/09/2025", statut: "Renouvellement", couleur: "bg-orange-100 text-orange-700" },
  { nom: "GlobalG.A.P.", produit: "Tous produits", expiration: "30/06/2026", statut: "Valide", couleur: "bg-green-100 text-green-700" },
  { nom: "ISO 22000:2018", produit: "Transformation", expiration: "28/02/2026", statut: "Valide", couleur: "bg-green-100 text-green-700" },
  { nom: "Organic EU", produit: "Maïs / Soja", expiration: "31/12/2024", statut: "Expiré", couleur: "bg-red-100 text-red-700" },
];

const conformiteMois = [
  { mois: "Août", val: 92 }, { mois: "Sep", val: 94 }, { mois: "Oct", val: 96 },
  { mois: "Nov", val: 95 }, { mois: "Déc", val: 93 }, { mois: "Jan", val: 97 },
  { mois: "Fév", val: 98 }, { mois: "Mar", val: 96 }, { mois: "Avr", val: 95 },
  { mois: "Mai", val: 97 }, { mois: "Jun", val: 98 }, { mois: "Jul", val: 96.8 },
];

const TABS = ["Contrôles récents", "Non-conformités", "Paramètres qualité", "Certifications"] as const;

/* ─── COMPONENT ─────────────────────────────────────── */

export default function SuiviQualitePage() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Contrôles récents");

  const maxVal = Math.max(...conformiteMois.map((m) => m.val));

  return (
    <div>
      <Topbar title="Contrôle Qualité" breadcrumb={["Commerce", "Suivi Qualité"]} />

      <div className="p-6 space-y-6">

        {/* ── KPIs ── */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          {[
            { label: "Lots contrôlés",        val: "48",       icon: ClipboardCheck, color: "#2E7D32", bg: "#E8F5E9" },
            { label: "Taux conformité",        val: "96,8%",    icon: TrendingUp,     color: "#1565C0", bg: "#E3F2FD" },
            { label: "NC détectées",           val: "3",        icon: AlertTriangle,  color: "#E65100", bg: "#FFF3E0" },
            { label: "Lots bloqués",           val: "1",        icon: ShieldCheck,    color: "#D32F2F", bg: "#FFEBEE" },
            { label: "Score qualité moyen",    val: "94,2/100", icon: Star,           color: "#F57F17", bg: "#FFFDE7" },
          ].map((k) => {
            const Icon = k.icon;
            return (
              <div key={k.label} className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <div className="rounded-lg p-1.5" style={{ background: k.bg }}>
                    <Icon size={16} style={{ color: k.color }} />
                  </div>
                  <span className="text-xs text-gray-500">{k.label}</span>
                </div>
                <p className="text-xl font-bold text-gray-900">{k.val}</p>
              </div>
            );
          })}
        </div>

        {/* ── TABS ── */}
        <div className="flex gap-1 border-b border-gray-200">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
                tab === t
                  ? "bg-white border border-b-white border-gray-200 text-[#2E7D32] -mb-px"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* ── TAB: CONTRÔLES RÉCENTS ── */}
        {tab === "Contrôles récents" && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                <h2 className="font-semibold text-gray-900">Contrôles récents</h2>
                <button className="px-4 py-1.5 bg-[#2E7D32] text-white rounded-xl text-xs font-medium">
                  + Nouveau contrôle
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#F8FBF8] text-xs text-gray-500 uppercase tracking-wide">
                      {["Lot","Produit","Date contrôle","Contrôleur","Humidité","Impuretés","Calibre","Score","Résultat","Actions"].map((h) => (
                        <th key={h} className="text-left px-4 py-3 font-medium whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {controles.map((c) => (
                      <tr key={c.lot} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 font-mono text-xs font-semibold text-gray-700">{c.lot}</td>
                        <td className="px-4 py-3 text-gray-800 whitespace-nowrap">{c.produit}</td>
                        <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{c.date}</td>
                        <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{c.controleur}</td>
                        <td className="px-4 py-3 text-xs whitespace-nowrap">{c.humidite}</td>
                        <td className="px-4 py-3 text-xs whitespace-nowrap">{c.impuretes}</td>
                        <td className="px-4 py-3 text-xs whitespace-nowrap">{c.calibre}</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span
                            className={`font-bold text-sm ${
                              c.score >= 90 ? "text-green-600" : c.score >= 70 ? "text-orange-500" : "text-red-600"
                            }`}
                          >
                            {c.score}/100
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          {c.conforme ? (
                            <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">✅ Conforme</span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">❌ NC — Bloqué</span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <button className="text-xs text-[#2E7D32] hover:underline font-medium">Voir</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Bar chart SVG */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <h3 className="font-semibold text-gray-900 mb-4 text-sm">Évolution du taux de conformité (12 mois)</h3>
              <svg viewBox="0 0 680 160" className="w-full" aria-label="Taux de conformité">
                {/* grid lines */}
                {[80, 85, 90, 95, 100].map((v) => {
                  const y = 130 - ((v - 78) / (100 - 78)) * 120;
                  return (
                    <g key={v}>
                      <line x1="40" y1={y} x2="670" y2={y} stroke="#f0f0f0" strokeWidth="1" />
                      <text x="34" y={y + 4} textAnchor="end" fontSize="9" fill="#9ca3af">{v}%</text>
                    </g>
                  );
                })}
                {conformiteMois.map((m, i) => {
                  const x = 50 + i * 52;
                  const barH = ((m.val - 78) / (maxVal - 78)) * 110;
                  const y = 130 - barH;
                  return (
                    <g key={m.mois}>
                      <rect x={x} y={y} width="30" height={barH} rx="4"
                        fill={m.mois === "Jul" ? "#2E7D32" : "#4CAF50"} opacity="0.85" />
                      <text x={x + 15} y="148" textAnchor="middle" fontSize="9" fill="#6b7280">{m.mois}</text>
                      <text x={x + 15} y={y - 3} textAnchor="middle" fontSize="8" fill="#374151">{m.val}%</text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>
        )}

        {/* ── TAB: NON-CONFORMITÉS ── */}
        {tab === "Non-conformités" && (
          <div className="space-y-6">
            {/* NC actives */}
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100">
                <h2 className="font-semibold text-gray-900">NC actives <span className="ml-2 text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">{ncActives.length}</span></h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#F8FBF8] text-xs text-gray-500 uppercase tracking-wide">
                      {["NC","Lot","Produit","Paramètre","Valeur","Norme","Gravité","Statut","Responsable","Action corrective"].map((h) => (
                        <th key={h} className="text-left px-4 py-3 font-medium whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {ncActives.map((nc) => (
                      <tr key={nc.num} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 font-mono text-xs font-semibold text-gray-700">{nc.num}</td>
                        <td className="px-4 py-3 font-mono text-xs text-gray-600">{nc.lot}</td>
                        <td className="px-4 py-3 text-gray-800 whitespace-nowrap">{nc.produit}</td>
                        <td className="px-4 py-3 text-gray-600">{nc.parametre}</td>
                        <td className="px-4 py-3 font-semibold text-red-600">{nc.valeur}</td>
                        <td className="px-4 py-3 text-gray-500 text-xs">{nc.norme}</td>
                        <td className={`px-4 py-3 text-xs font-bold ${nc.graviteColor}`}>🔴 {nc.gravite}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${nc.statutColor}`}>{nc.statutLabel}</span>
                        </td>
                        <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{nc.responsable}</td>
                        <td className="px-4 py-3 text-gray-600 text-xs">{nc.action}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* NC archivées */}
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100">
                <h2 className="font-semibold text-gray-900 text-sm">NC archivées (5 dernières)</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#F8FBF8] text-xs text-gray-500 uppercase tracking-wide">
                      {["N° NC","Lot","Produit","Paramètre","Valeur","Norme","Statut","Date"].map((h) => (
                        <th key={h} className="text-left px-4 py-3 font-medium whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {ncArchivees.map((nc) => (
                      <tr key={nc.num} className="hover:bg-gray-50 text-gray-500 text-xs transition-colors">
                        <td className="px-4 py-3 font-mono">{nc.num}</td>
                        <td className="px-4 py-3 font-mono">{nc.lot}</td>
                        <td className="px-4 py-3 whitespace-nowrap">{nc.produit}</td>
                        <td className="px-4 py-3">{nc.parametre}</td>
                        <td className="px-4 py-3">{nc.valeur}</td>
                        <td className="px-4 py-3">{nc.norme}</td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full text-xs">{nc.statut}</span>
                        </td>
                        <td className="px-4 py-3">{nc.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ── TAB: PARAMÈTRES QUALITÉ ── */}
        {tab === "Paramètres qualité" && (
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-semibold text-gray-900">Critères qualité par produit</h2>
              <button className="px-4 py-1.5 bg-[#2E7D32] text-white rounded-xl text-xs font-medium">
                + Ajouter critère
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#F8FBF8] text-xs text-gray-500 uppercase tracking-wide">
                    {["Produit","Critère","Valeur cible","Tolérance","Méthode de contrôle"].map((h) => (
                      <th key={h} className="text-left px-4 py-3 font-medium whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {parametres.map((p, i) => (
                    <tr key={i} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 font-medium text-gray-900">{p.produit}</td>
                      <td className="px-4 py-3 text-gray-700">{p.critere}</td>
                      <td className="px-4 py-3 font-semibold text-[#2E7D32]">{p.cible}</td>
                      <td className="px-4 py-3 text-gray-500">{p.tolerance}</td>
                      <td className="px-4 py-3 text-gray-600">{p.methode}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── TAB: CERTIFICATIONS ── */}
        {tab === "Certifications" && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {certifications.map((c) => (
                <div key={c.nom} className="bg-white rounded-2xl border border-gray-100 p-5 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-semibold text-gray-900">{c.nom}</p>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${c.couleur}`}>{c.statut}</span>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p><span className="text-gray-400">Produit :</span> {c.produit}</p>
                    <p><span className="text-gray-400">Expiration :</span> {c.expiration}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
