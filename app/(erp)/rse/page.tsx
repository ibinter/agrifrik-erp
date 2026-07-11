"use client";

import { useState } from "react";
import Topbar from "../../components/Topbar";

// ===================== DATA =====================

const engagements = [
  { icon: "🌱", titre: "Zéro déforestation", objectif: "0 ha déforesté depuis 2015", valeur: 100, statut: "Atteint", couleur: "green" },
  { icon: "💧", titre: "Réduction consommation eau -15%", objectif: "Actuel : -7,7%", valeur: 51, statut: "En cours", couleur: "blue" },
  { icon: "🌿", titre: "100% certifié RA d'ici 2026", objectif: "Actuel : 68%", valeur: 68, statut: "En cours", couleur: "green" },
  { icon: "👥", titre: "50% femmes dans la coopérative", objectif: "Actuel : 33,8% (48/142)", valeur: 68, statut: "En cours", couleur: "purple" },
  { icon: "🎓", titre: "100h de formation/an", objectif: "YTD : 62h", valeur: 62, statut: "En cours", couleur: "orange" },
  { icon: "♻️", titre: "Zéro brûlage déchets", objectif: "Atteint depuis Jan 2024", valeur: 100, statut: "Atteint", couleur: "green" },
];

const biodiversiteData = [
  { an: "2020", valeur: 3200, max: 5000 },
  { an: "2021", valeur: 3640, max: 5000 },
  { an: "2022", valeur: 4020, max: 5000 },
  { an: "2023", valeur: 4240, max: 5000 },
  { an: "2024", valeur: 4850, max: 5000 },
];

const phytosanitaires = [
  { produit: "Ridomil Gold 68 WG", matiere: "Métalaxyl + Mancozèbe", homologCI: true, raAuto: "oui", qte: "84 kg", evolution: "-12%" },
  { produit: "Confidor 200 SL", matiere: "Imidaclopride", homologCI: true, raAuto: "restreint", qte: "4,2 L", evolution: "-45%" },
  { produit: "Unden 50 EC", matiere: "Propoxur", homologCI: true, raAuto: "interdit", qte: "0 L", evolution: "-100% ✅" },
];

const primesRA = [
  { nom: "Konan Y.", montant: 380000 },
  { nom: "Ibrahim S.", montant: 350000 },
  { nom: "Adjoua M.", montant: 320000 },
  { nom: "Sékou B.", montant: 290000 },
  { nom: "Fanta K.", montant: 270000 },
  { nom: "Moussa T.", montant: 250000 },
  { nom: "Aïcha D.", montant: 230000 },
  { nom: "Bamba O.", montant: 210000 },
  { nom: "Diallo A.", montant: 200000 },
  { nom: "Awa S.", montant: 185000 },
  { nom: "Coulibaly R.", montant: 170000 },
  { nom: "Traoré N.", montant: 150000 },
];

const securiteData = [
  { indicateur: "Accidents du travail", v2023: 2, v2024: 0, objectif: "0 ✅" },
  { indicateur: "Incidents phytosanitaires", v2023: 1, v2024: 0, objectif: "0 ✅" },
  { indicateur: "Jours perdus accidents", v2023: 8, v2024: 0, objectif: "0 ✅" },
  { indicateur: "Habilitations EPI", v2023: "12/15", v2024: "15/15", objectif: "15/15 ✅" },
];

const certifications = [
  { ref: "Rainforest Alliance 2020", statut: "Certifié", audit: "Jun 2025", validite: "Mar 2026" },
  { ref: "GlobalG.A.P. v6", statut: "Certifié", audit: "Avr 2025", validite: "Avr 2026" },
  { ref: "ISO 9001:2015", statut: "Certifié", audit: "Mai 2025", validite: "Mai 2028" },
  { ref: "Loi Devoir de Vigilance (FR)", statut: "Conforme", audit: "—", validite: "—" },
  { ref: "FCPR (Fournisseur cacao responsable)", statut: "Enregistré", audit: "—", validite: "2026" },
];

// ===================== HELPERS =====================

function ScoreCircle({ score, label, color = "#2E7D32" }: { score: number; label: string; color?: string }) {
  const r = 54;
  const circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;
  return (
    <div className="flex flex-col items-center">
      <svg width="128" height="128" viewBox="0 0 128 128">
        <circle cx="64" cy="64" r={r} fill="none" stroke="#e5e7eb" strokeWidth="10" />
        <circle
          cx="64" cy="64" r={r} fill="none"
          stroke={color} strokeWidth="10"
          strokeDasharray={`${dash} ${circ - dash}`}
          strokeLinecap="round"
          transform="rotate(-90 64 64)"
        />
        <text x="64" y="60" textAnchor="middle" dominantBaseline="middle" fontSize="22" fontWeight="700" fill="#111827">
          {score}
        </text>
        <text x="64" y="78" textAnchor="middle" dominantBaseline="middle" fontSize="11" fill="#6b7280">
          /100
        </text>
      </svg>
      <span className="text-xs font-medium text-gray-500 mt-1">{label}</span>
    </div>
  );
}

const maxPrime = Math.max(...primesRA.map(p => p.montant));

export default function RSEPage() {
  const [tab, setTab] = useState<"overview" | "env" | "social" | "gouv">("overview");

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FBF8]">
      <Topbar />
      <div className="flex-1 p-6 space-y-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span>Admin</span>
          <span>/</span>
          <span className="text-[#2E7D32] font-medium">RSE & Durabilité</span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Rapport RSE</h1>
            <p className="text-sm text-gray-500 mt-0.5">Responsabilité Sociétale des Entreprises — Exercice 2025</p>
          </div>
          <button className="bg-[#2E7D32] text-white rounded-xl text-xs font-medium px-4 py-2">
            Exporter rapport PDF
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white rounded-xl p-1 border border-gray-100 w-fit flex-wrap">
          {([
            { key: "overview", label: "Vue d'ensemble" },
            { key: "env", label: "Environnement" },
            { key: "social", label: "Social" },
            { key: "gouv", label: "Gouvernance" },
          ] as const).map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                tab === t.key ? "bg-[#2E7D32] text-white" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* ======== ONGLET VUE D'ENSEMBLE ======== */}
        {tab === "overview" && (
          <div className="space-y-6">
            {/* Score ESG global */}
            <div className="rounded-2xl border border-gray-100 bg-white p-6">
              <h2 className="font-semibold text-gray-900 text-center mb-1">Score ESG Global</h2>
              <p className="text-xs text-gray-400 text-center mb-6">Excellent pour une PME agricole africaine</p>
              <div className="flex flex-wrap justify-center gap-10">
                <ScoreCircle score={78} label="Score Global" color="#2E7D32" />
                <ScoreCircle score={74} label="E — Environnement" color="#4CAF50" />
                <ScoreCircle score={82} label="S — Social" color="#1B5E20" />
                <ScoreCircle score={78} label="G — Gouvernance" color="#E65100" />
              </div>
              <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#4CAF50]" />
                  <span>E : 74/100</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#1B5E20]" />
                  <span>S : 82/100</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#E65100]" />
                  <span>G : 78/100</span>
                </div>
              </div>
            </div>

            {/* Engagements RSE */}
            <div>
              <h2 className="font-semibold text-gray-900 mb-3">6 Engagements RSE 2025</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {engagements.map((eng, i) => (
                  <div key={i} className="rounded-2xl border border-gray-100 bg-white p-5">
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-2xl">{eng.icon}</span>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        eng.statut === "Atteint"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}>
                        {eng.statut === "Atteint" ? "✅ Atteint" : "🟡 En cours"}
                      </span>
                    </div>
                    <h3 className="font-semibold text-gray-900 text-sm leading-snug">{eng.titre}</h3>
                    <p className="text-xs text-gray-500 mt-1">{eng.objectif}</p>
                    <div className="mt-3 h-1.5 bg-gray-100 rounded-full">
                      <div
                        className={`h-1.5 rounded-full ${eng.statut === "Atteint" ? "bg-[#4CAF50]" : "bg-[#E65100]"}`}
                        style={{ width: `${eng.valeur}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-400 mt-1 inline-block">{eng.valeur}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ======== ONGLET ENVIRONNEMENT ======== */}
        {tab === "env" && (
          <div className="space-y-6">
            {/* Métriques carbone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="rounded-2xl border border-gray-100 bg-white p-5">
                <p className="text-xs text-gray-500 font-medium">Émissions directes (Scope 1)</p>
                <p className="text-2xl font-bold text-orange-600 mt-2">184 tCO₂e</p>
                <p className="text-xs text-gray-400 mt-1">Transport + groupes électrogènes</p>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-white p-5">
                <p className="text-xs text-gray-500 font-medium">Émissions indirectes (Scope 2)</p>
                <p className="text-2xl font-bold text-yellow-600 mt-2">12 tCO₂e</p>
                <p className="text-xs text-gray-400 mt-1">Consommation électricité</p>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-white p-5">
                <p className="text-xs text-gray-500 font-medium">Séquestration forêts/ombrage</p>
                <p className="text-2xl font-bold text-[#2E7D32] mt-2">-842 tCO₂e</p>
                <p className="text-xs text-gray-400 mt-1">Arbres d'ombrage & forêt</p>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-white p-5 border-[#2E7D32]">
                <p className="text-xs text-gray-500 font-medium">Bilan net carbone</p>
                <p className="text-2xl font-bold text-[#2E7D32] mt-2">-646 tCO₂e</p>
                <p className="text-xs text-green-600 font-semibold mt-1">🌱 Puits carbone net</p>
              </div>
            </div>

            {/* Biodiversité bar chart SVG */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5">
              <h2 className="font-semibold text-gray-900 mb-1">Biodiversité — Arbres d'ombrage</h2>
              <p className="text-xs text-gray-400 mb-4">Évolution du parc d'arbres d'ombrage 2020–2024</p>
              <div className="overflow-x-auto">
                <svg width="500" height="180" viewBox="0 0 500 180">
                  {/* Grilles horizontales */}
                  {[0, 0.25, 0.5, 0.75, 1].map((t, i) => {
                    const y = 140 - t * 120;
                    return (
                      <g key={i}>
                        <line x1="40" y1={y} x2="490" y2={y} stroke="#f3f4f6" strokeWidth={1} />
                        <text x="35" y={y + 4} textAnchor="end" fontSize={9} fill="#9ca3af">
                          {Math.round(t * 5000).toLocaleString("fr-FR")}
                        </text>
                      </g>
                    );
                  })}
                  {/* Barres */}
                  {biodiversiteData.map((d, i) => {
                    const barW = 60;
                    const gap = 30;
                    const x = 60 + i * (barW + gap);
                    const h = (d.valeur / d.max) * 120;
                    const y = 140 - h;
                    return (
                      <g key={d.an}>
                        <rect x={x} y={y} width={barW} height={h} rx={6} fill="#2E7D32" fillOpacity={0.85} />
                        <text x={x + barW / 2} y={y - 6} textAnchor="middle" fontSize={9} fill="#2E7D32" fontWeight={600}>
                          {d.valeur.toLocaleString("fr-FR")}
                        </text>
                        <text x={x + barW / 2} y={155} textAnchor="middle" fontSize={10} fill="#6b7280">
                          {d.an}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-right mt-2">Nombre d'arbres d'ombrage plantés (cumulé)</p>
            </div>

            {/* Tableau phytosanitaires */}
            <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden">
              <div className="p-5 border-b border-gray-100">
                <h2 className="font-semibold text-gray-900">Utilisation des produits phytosanitaires 2024</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#F8FBF8] text-xs text-gray-500 uppercase tracking-wide">
                      <th className="text-left p-3 font-medium">Produit</th>
                      <th className="text-left p-3 font-medium">Matière active</th>
                      <th className="text-center p-3 font-medium">Homologué CI</th>
                      <th className="text-center p-3 font-medium">RA autorisé</th>
                      <th className="text-left p-3 font-medium">Qté utilisée</th>
                      <th className="text-left p-3 font-medium">Évolution</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {phytosanitaires.map(p => (
                      <tr key={p.produit} className="hover:bg-gray-50">
                        <td className="p-3 font-medium text-gray-900 text-sm">{p.produit}</td>
                        <td className="p-3 text-gray-600 text-xs">{p.matiere}</td>
                        <td className="p-3 text-center">
                          {p.homologCI ? <span className="text-green-600 font-semibold">✅</span> : <span className="text-red-500">❌</span>}
                        </td>
                        <td className="p-3 text-center">
                          {p.raAuto === "oui" && <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-medium">✅ Autorisé</span>}
                          {p.raAuto === "restreint" && <span className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full text-xs font-medium">⚠️ Restreint</span>}
                          {p.raAuto === "interdit" && <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded-full text-xs font-medium">❌ Interdit RA</span>}
                        </td>
                        <td className="p-3 text-gray-900 font-medium text-sm">{p.qte}</td>
                        <td className="p-3">
                          <span className={`text-xs font-semibold ${p.evolution.includes("-") ? "text-green-600" : "text-red-600"}`}>
                            {p.evolution}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ======== ONGLET SOCIAL ======== */}
        {tab === "social" && (
          <div className="space-y-6">
            {/* Impact coopérative */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-2xl border border-gray-100 bg-white p-5 text-center">
                <p className="text-3xl font-bold text-gray-900">142</p>
                <p className="text-xs text-gray-500 mt-1">Coopérants</p>
                <p className="text-xs text-[#2E7D32] font-medium mt-0.5">dont 48 femmes (33,8%)</p>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-white p-5 text-center">
                <p className="text-3xl font-bold text-gray-900">32</p>
                <p className="text-xs text-gray-500 mt-1">Villages dans la zone Nawa</p>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-white p-5 text-center">
                <p className="text-3xl font-bold text-[#2E7D32]">87</p>
                <p className="text-xs text-gray-500 mt-1">Enfants scolarisés</p>
                <p className="text-xs text-gray-400 mt-0.5">grâce aux primes RA</p>
              </div>
            </div>

            {/* Distribution primes — bar chart horizontal SVG */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5">
              <h2 className="font-semibold text-gray-900 mb-4">Distribution des primes qualité RA</h2>
              <div className="space-y-2">
                {primesRA.map(p => (
                  <div key={p.nom} className="flex items-center gap-3">
                    <span className="text-xs text-gray-600 w-24 shrink-0">{p.nom}</span>
                    <div className="flex-1 h-5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-5 bg-[#2E7D32] rounded-full flex items-center justify-end pr-2"
                        style={{ width: `${(p.montant / maxPrime) * 100}%` }}
                      >
                        <span className="text-[10px] text-white font-medium whitespace-nowrap">
                          {p.montant.toLocaleString("fr-FR")} XOF
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Programme bien-être */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5">
              <h2 className="font-semibold text-gray-900 mb-4">Programme bien-être employés</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-start gap-3 p-3 bg-green-50 rounded-xl">
                  <span className="text-green-600 font-bold text-lg mt-0.5">✅</span>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Assurance maladie</p>
                    <p className="text-xs text-gray-500">15/15 permanents couverts</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-xl">
                  <span className="text-blue-600 font-bold text-lg mt-0.5">💰</span>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Avances sur salaire sans intérêt</p>
                    <p className="text-xs text-gray-500">8 dossiers en cours</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-xl">
                  <span className="text-orange-600 font-bold text-lg mt-0.5">🏠</span>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Logement sur site</p>
                    <p className="text-xs text-gray-500">6 employés bénéficiaires</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-green-50 rounded-xl">
                  <span className="text-green-600 font-bold text-lg mt-0.5">✅</span>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Mutuelle CGRAE</p>
                    <p className="text-xs text-gray-500">Cotisations à jour</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Santé-sécurité */}
            <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden">
              <div className="p-5 border-b border-gray-100">
                <h2 className="font-semibold text-gray-900">Indicateurs santé-sécurité</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#F8FBF8] text-xs text-gray-500 uppercase tracking-wide">
                      <th className="text-left p-3 font-medium">Indicateur</th>
                      <th className="text-center p-3 font-medium">2023</th>
                      <th className="text-center p-3 font-medium">2024</th>
                      <th className="text-center p-3 font-medium">Objectif</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {securiteData.map(s => (
                      <tr key={s.indicateur} className="hover:bg-gray-50">
                        <td className="p-3 text-gray-900 font-medium">{s.indicateur}</td>
                        <td className="p-3 text-center text-gray-600">{s.v2023}</td>
                        <td className="p-3 text-center font-bold text-[#2E7D32]">{s.v2024}</td>
                        <td className="p-3 text-center text-green-600 font-semibold text-xs">{s.objectif}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ======== ONGLET GOUVERNANCE ======== */}
        {tab === "gouv" && (
          <div className="space-y-6">
            {/* Organes de gouvernance */}
            <div>
              <h2 className="font-semibold text-gray-900 mb-3">Organes de gouvernance</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { titre: "Conseil d'Administration", membres: "5 membres (2 indépendants)", reunions: "4 réunions/an" },
                  { titre: "Comité d'Audit", membres: "3 membres", reunions: "2 réunions/an" },
                  { titre: "Comité RSE", membres: "4 membres (dont 1 repr. coopérative)", reunions: "4 réunions/an" },
                ].map(org => (
                  <div key={org.titre} className="rounded-2xl border border-gray-100 bg-white p-5">
                    <div className="w-10 h-10 rounded-xl bg-[#F8FBF8] flex items-center justify-center mb-3 text-xl">
                      🏛
                    </div>
                    <h3 className="font-semibold text-gray-900 text-sm">{org.titre}</h3>
                    <p className="text-xs text-gray-500 mt-1">{org.membres}</p>
                    <p className="text-xs text-[#2E7D32] font-medium mt-1">{org.reunions}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden">
              <div className="p-5 border-b border-gray-100">
                <h2 className="font-semibold text-gray-900">Conformité & Certifications</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#F8FBF8] text-xs text-gray-500 uppercase tracking-wide">
                      <th className="text-left p-3 font-medium">Référentiel</th>
                      <th className="text-center p-3 font-medium">Statut</th>
                      <th className="text-center p-3 font-medium">Dernier audit</th>
                      <th className="text-center p-3 font-medium">Validité</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {certifications.map(c => (
                      <tr key={c.ref} className="hover:bg-gray-50">
                        <td className="p-3 font-medium text-gray-900">{c.ref}</td>
                        <td className="p-3 text-center">
                          <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-medium">
                            ✅ {c.statut}
                          </span>
                        </td>
                        <td className="p-3 text-center text-gray-600 text-xs">{c.audit}</td>
                        <td className="p-3 text-center text-gray-600 text-xs">{c.validite}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Anti-corruption */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5">
              <h2 className="font-semibold text-gray-900 mb-4">Politique anti-corruption</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-4 bg-green-50 rounded-xl border border-green-100">
                  <span className="text-2xl">✅</span>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Code de conduite</p>
                    <p className="text-xs text-gray-600 mt-0.5">Signé par 15/15 permanents</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-green-50 rounded-xl border border-green-100">
                  <span className="text-2xl">✅</span>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Incidents signalés en 2024</p>
                    <p className="text-xs text-gray-600 mt-0.5">Aucun incident — bilan net 0</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
