"use client";

import { useState } from "react";
import Topbar from "../../components/Topbar";
import {
  Shield,
  AlertTriangle,
  FileText,
  Calendar,
  TrendingUp,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type OngletId = "contrats" | "sinistres" | "calendrier" | "risques";

// ─── Données ──────────────────────────────────────────────────────────────────

const contrats = [
  {
    id: "ASS-001",
    titre: "Multirisque agricole récolte cacao",
    assureur: "NSIA Assurances CI",
    police: "NSIA-2025-AGRI-08421",
    valeur: "120 M XOF",
    valeurNote: "production cacao attendue",
    risques: ["Sécheresse", "Excès pluie", "Parasites", "Feu"],
    prime: "1 200 000 XOF",
    franchise: "10%",
    validite: "Jan → Déc 2025",
    beneficiaire: "AGRIFRIK SAS",
    statut: "actif",
    alerte: false,
  },
  {
    id: "ASS-002",
    titre: "Multirisque bâtiments & entrepôts",
    assureur: "SAHAM Assurances",
    police: "SAH-2025-IMMO-00124",
    valeur: "85 M XOF",
    valeurNote: "",
    risques: ["Incendie", "Vol", "Dégâts des eaux", "Effondrement"],
    prime: "680 000 XOF",
    franchise: "—",
    validite: "Jan → Déc 2025",
    beneficiaire: "AGRIFRIK SAS",
    statut: "actif",
    alerte: false,
  },
  {
    id: "ASS-003",
    titre: "Flotte véhicules (4 véhicules)",
    assureur: "AXA CI",
    police: "AXA-2025-AUTO-5521",
    valeur: "—",
    valeurNote: "Renault T460, Isuzu NQR, Toyota Hilux, Honda XR150",
    risques: ["RC + Tous risques (Renault T460)"],
    prime: "840 000 XOF",
    franchise: "25%",
    validite: "Mar 2025 → Mar 2026",
    beneficiaire: "AGRIFRIK SAS",
    statut: "actif",
    alerte: false,
  },
  {
    id: "ASS-004",
    titre: "Responsabilité civile professionnelle",
    assureur: "ALLIANZ CI",
    police: "ALL-2025-RC-PRO-1847",
    valeur: "50 M XOF",
    valeurNote: "",
    risques: ["RC exploitation agricole"],
    prime: "420 000 XOF",
    franchise: "—",
    validite: "Jan → Déc 2025",
    beneficiaire: "AGRIFRIK SAS",
    statut: "actif",
    alerte: false,
  },
  {
    id: "ASS-005",
    titre: "Assurance récolte anacarde",
    assureur: "NSIA CI",
    police: "—",
    valeur: "15 M XOF",
    valeurNote: "",
    risques: ["Sécheresse", "Parasites"],
    prime: "280 000 XOF",
    franchise: "—",
    validite: "Jan → Déc 2025",
    beneficiaire: "AGRIFRIK SAS",
    statut: "actif",
    alerte: false,
  },
  {
    id: "ASS-006",
    titre: "Drone DJI Agras T30",
    assureur: "AXA CI (flottante équip.)",
    police: "—",
    valeur: "12,4 M XOF",
    valeurNote: "",
    risques: ["Casse", "Vol", "Accident"],
    prime: "186 000 XOF",
    franchise: "—",
    validite: "Jan → Déc 2025",
    beneficiaire: "AGRIFRIK SAS",
    statut: "actif",
    alerte: false,
  },
  {
    id: "ASS-007",
    titre: "Tracteur John Deere 6120M",
    assureur: "SAHAM",
    police: "—",
    valeur: "28,4 M XOF",
    valeurNote: "⚠️ VNC actuelle : 19,2 M — sous-assurance possible",
    risques: ["Casse mécanique", "Incendie", "Vol"],
    prime: "420 000 XOF",
    franchise: "—",
    validite: "Jan → Déc 2025",
    beneficiaire: "AGRIFRIK SAS",
    statut: "alerte",
    alerte: true,
  },
  {
    id: "ASS-008",
    titre: "Prévoyance collective personnel",
    assureur: "SUNU Assurances Vie",
    police: "—",
    valeur: "—",
    valeurNote: "287 bénéficiaires",
    risques: ["Remboursement soins", "Décès"],
    prime: "174 000 XOF",
    franchise: "—",
    validite: "Jan → Déc 2025",
    beneficiaire: "Personnel AGRIFRIK",
    statut: "actif",
    alerte: false,
  },
];

const echeances = [
  { contrat: "ASS-001 Récolte cacao", assureur: "NSIA", expiration: "31/12/2025", jours: 173, prime: "Janv 2026", renouvellement: "Automatique", alerte: false },
  { contrat: "ASS-002 Bâtiments", assureur: "SAHAM", expiration: "31/12/2025", jours: 173, prime: "Janv 2026", renouvellement: "Automatique", alerte: false },
  { contrat: "ASS-003 Flotte", assureur: "AXA", expiration: "01/03/2026", jours: 233, prime: "Mar 2026", renouvellement: "Automatique", alerte: false },
  { contrat: "ASS-004 RC Pro", assureur: "ALLIANZ", expiration: "31/12/2025", jours: 173, prime: "Janv 2026", renouvellement: "Automatique", alerte: false },
  { contrat: "ASS-007 Tracteur JD", assureur: "SAHAM", expiration: "31/12/2025", jours: 173, prime: "⚠️ Réévaluer VNC", renouvellement: "Réviser montant", alerte: true },
];

// ─── Onglets ─────────────────────────────────────────────────────────────────

function OngletContrats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {contrats.map((c) => (
        <div
          key={c.id}
          className={`rounded-2xl bg-white dark:bg-gray-900 border p-5 ${
            c.alerte
              ? "border-orange-200 dark:border-orange-800 bg-orange-50/30 dark:bg-orange-900/10"
              : "border-gray-100 dark:border-gray-800"
          }`}
        >
          <div className="flex items-start justify-between gap-2 mb-3">
            <div>
              <span className="inline-block px-2 py-0.5 rounded-full text-xs font-mono font-semibold bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 mb-1">
                {c.id}
              </span>
              <h3 className="text-sm font-bold text-gray-800 dark:text-gray-100 leading-tight">{c.titre}</h3>
            </div>
            {c.statut === "actif" ? (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 whitespace-nowrap flex-shrink-0">
                <CheckCircle size={10} /> Actif
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 whitespace-nowrap flex-shrink-0">
                <AlertTriangle size={10} /> À réviser
              </span>
            )}
          </div>

          <div className="space-y-1.5 text-xs text-gray-600 dark:text-gray-400">
            <div className="flex gap-2">
              <span className="font-medium text-gray-500 dark:text-gray-500 w-24 flex-shrink-0">Assureur</span>
              <span className="text-gray-800 dark:text-gray-200">{c.assureur}</span>
            </div>
            {c.police !== "—" && (
              <div className="flex gap-2">
                <span className="font-medium text-gray-500 dark:text-gray-500 w-24 flex-shrink-0">Police</span>
                <span className="font-mono text-gray-700 dark:text-gray-300">{c.police}</span>
              </div>
            )}
            <div className="flex gap-2">
              <span className="font-medium text-gray-500 dark:text-gray-500 w-24 flex-shrink-0">Valeur assurée</span>
              <span className="font-semibold text-gray-800 dark:text-gray-200">{c.valeur}</span>
            </div>
            {c.valeurNote && (
              <p className={`text-xs pl-[6.5rem] ${c.alerte ? "text-orange-600 dark:text-orange-400" : "text-gray-400 dark:text-gray-500"}`}>
                {c.valeurNote}
              </p>
            )}
            <div className="flex gap-2">
              <span className="font-medium text-gray-500 dark:text-gray-500 w-24 flex-shrink-0">Risques couverts</span>
              <div className="flex flex-wrap gap-1">
                {c.risques.map((r) => (
                  <span key={r} className="px-1.5 py-0.5 rounded bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 text-xs">{r}</span>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <span className="font-medium text-gray-500 dark:text-gray-500 w-24 flex-shrink-0">Prime 2025</span>
              <span className="font-bold text-[#2E7D32]">{c.prime}</span>
              {c.franchise !== "—" && <span className="text-gray-400">• Franchise {c.franchise}</span>}
            </div>
            <div className="flex gap-2">
              <span className="font-medium text-gray-500 dark:text-gray-500 w-24 flex-shrink-0">Validité</span>
              <span>{c.validite}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function OngletSinistres() {
  return (
    <div className="space-y-5">
      {/* Sinistre 2025 */}
      <div className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-5">
        <div className="flex items-center gap-2 mb-4">
          <AlertCircle size={18} className="text-orange-500" />
          <span className="font-bold text-gray-800 dark:text-gray-100">Sinistres 2025 (1)</span>
        </div>
        <div className="border-t border-gray-100 dark:border-gray-800 mb-4" />
        <div className="rounded-xl border border-gray-100 dark:border-gray-800 p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-mono text-sm font-bold text-gray-800 dark:text-gray-100">SIN-2025-001</span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
              <CheckCircle size={10} /> Clôturé
            </span>
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 text-xs">
            <div><span className="text-gray-500 dark:text-gray-400">Date : </span><span className="text-gray-800 dark:text-gray-200 font-medium">28/04/2025</span></div>
            <div><span className="text-gray-500 dark:text-gray-400">Contrat : </span><span className="text-gray-800 dark:text-gray-200 font-medium">ASS-003 (flotte véhicules)</span></div>
            <div><span className="text-gray-500 dark:text-gray-400">Véhicule : </span><span className="text-gray-800 dark:text-gray-200 font-medium">Toyota Hilux (MAT-005)</span></div>
            <div><span className="text-gray-500 dark:text-gray-400">Franchise : </span><span className="text-gray-800 dark:text-gray-200 font-medium">280 000 XOF (25%)</span></div>
            <div className="col-span-2"><span className="text-gray-500 dark:text-gray-400">Événement : </span><span className="text-gray-700 dark:text-gray-300">Accrochage arrière parking Soubré — dommages arrière droite</span></div>
            <div><span className="text-gray-500 dark:text-gray-400">Montant dommages : </span><span className="text-gray-800 dark:text-gray-200 font-semibold">1 120 000 XOF</span></div>
            <div><span className="text-gray-500 dark:text-gray-400">Indemnisation : </span><span className="text-[#2E7D32] font-bold">840 000 XOF</span><span className="text-gray-500 dark:text-gray-400"> — Reçue le 15/06/2025 ✅</span></div>
          </div>
        </div>
      </div>

      {/* Historique */}
      <div className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-5">
        <div className="flex items-center gap-2 mb-4">
          <FileText size={18} className="text-gray-500" />
          <span className="font-bold text-gray-800 dark:text-gray-100">Historique sinistres 2023-2024</span>
        </div>
        <div className="border-t border-gray-100 dark:border-gray-800 mb-4" />
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-left text-gray-500 dark:text-gray-400 bg-[#F8FBF8] dark:bg-gray-800/50">
                {["Année", "N°", "Contrat", "Événement", "Montant", "Indemnisation", "Statut"].map((h) => (
                  <th key={h} className="px-3 py-2 font-medium whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-50 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/40">
                <td className="px-3 py-2.5 font-semibold text-gray-700 dark:text-gray-300">2024</td>
                <td className="px-3 py-2.5 font-mono text-gray-600 dark:text-gray-400">SIN-2024-001</td>
                <td className="px-3 py-2.5 text-gray-700 dark:text-gray-300 whitespace-nowrap">ASS-001 Récolte</td>
                <td className="px-3 py-2.5 text-gray-600 dark:text-gray-400 whitespace-nowrap">Excès pluie Soubré (Aoû 2024)</td>
                <td className="px-3 py-2.5 font-semibold text-gray-800 dark:text-gray-200 whitespace-nowrap">2,4 M XOF</td>
                <td className="px-3 py-2.5 font-semibold text-[#2E7D32] whitespace-nowrap">2,16 M XOF</td>
                <td className="px-3 py-2.5">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                    ✅ Clôturé
                  </span>
                </td>
              </tr>
              <tr className="border-b border-gray-50 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/40">
                <td className="px-3 py-2.5 font-semibold text-gray-700 dark:text-gray-300">2023</td>
                <td className="px-3 py-2.5 font-mono text-gray-600 dark:text-gray-400">SIN-2023-001</td>
                <td className="px-3 py-2.5 text-gray-700 dark:text-gray-300 whitespace-nowrap">ASS-002 Bâtiments</td>
                <td className="px-3 py-2.5 text-gray-600 dark:text-gray-400 whitespace-nowrap">Vol intrants nuit 15/11/2023</td>
                <td className="px-3 py-2.5 font-semibold text-gray-800 dark:text-gray-200 whitespace-nowrap">420 000 XOF</td>
                <td className="px-3 py-2.5 text-gray-500 dark:text-gray-500 whitespace-nowrap">0 (franchise)</td>
                <td className="px-3 py-2.5">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                    ✅ Clôturé
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function OngletCalendrier() {
  return (
    <div className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-5">
      <div className="flex items-center gap-2 mb-4">
        <Calendar size={18} className="text-[#2E7D32]" />
        <span className="font-bold text-gray-800 dark:text-gray-100">Calendrier des renouvellements et échéances 2025-2026</span>
      </div>
      <div className="border-t border-gray-100 dark:border-gray-800 mb-4" />
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 dark:text-gray-400 bg-[#F8FBF8] dark:bg-gray-800/50">
              {["Contrat", "Assureur", "Expiration", "Jours restants", "Prochaine prime", "Renouvellement"].map((h) => (
                <th key={h} className="px-3 py-2 text-xs font-medium whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {echeances.map((e, i) => (
              <tr
                key={i}
                className={`border-b border-gray-50 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors ${
                  e.alerte ? "bg-orange-50/60 dark:bg-orange-900/10" : ""
                }`}
              >
                <td className="px-3 py-3 text-xs font-semibold text-gray-800 dark:text-gray-200 whitespace-nowrap">{e.contrat}</td>
                <td className="px-3 py-3 text-xs text-gray-600 dark:text-gray-400 whitespace-nowrap">{e.assureur}</td>
                <td className="px-3 py-3 font-mono text-xs text-gray-700 dark:text-gray-300 whitespace-nowrap">{e.expiration}</td>
                <td className="px-3 py-3 text-xs">
                  <span className={`inline-block px-2 py-0.5 rounded-full font-semibold ${
                    e.jours < 200
                      ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                      : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                  }`}>
                    {e.jours} j
                  </span>
                </td>
                <td className={`px-3 py-3 text-xs font-medium whitespace-nowrap ${e.alerte ? "text-orange-600 dark:text-orange-400" : "text-gray-700 dark:text-gray-300"}`}>
                  {e.prime}
                </td>
                <td className="px-3 py-3 text-xs">
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-medium whitespace-nowrap ${
                    e.alerte
                      ? "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400"
                      : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                  }`}>
                    {e.alerte ? <AlertTriangle size={10} /> : "🔵"} {e.renouvellement}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function OngletRisques() {
  return (
    <div className="space-y-5">
      {/* Matrice */}
      <div className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-5">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp size={18} className="text-[#2E7D32]" />
          <span className="font-bold text-gray-800 dark:text-gray-100">Matrice des risques</span>
        </div>
        <div className="border-t border-gray-100 dark:border-gray-800 mb-4" />
        <div className="overflow-x-auto">
          <svg viewBox="0 0 520 340" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-xl" style={{ minWidth: 340 }}>
            {/* Axes */}
            <text x="260" y="18" fontSize="12" fontWeight="bold" fill="#374151" textAnchor="middle">IMPACT</text>
            <text x="12" y="185" fontSize="12" fontWeight="bold" fill="#374151" textAnchor="middle" transform="rotate(-90 12 185)">PROBABILITÉ</text>

            {/* Quadrants */}
            {/* Faible prob × Faible impact */}
            <rect x="60" y="200" width="200" height="110" fill="#DCF5DC" rx="4" />
            <text x="160" y="260" fontSize="10" fill="#2E7D32" textAnchor="middle" opacity="0.7">RISQUE FAIBLE</text>
            {/* Haute prob × Faible impact */}
            <rect x="60" y="30" width="200" height="165" fill="#FEF3C7" rx="4" />
            <text x="160" y="120" fontSize="10" fill="#D97706" textAnchor="middle" opacity="0.7">RISQUE MODÉRÉ</text>
            {/* Faible prob × Fort impact */}
            <rect x="265" y="200" width="240" height="110" fill="#FEE2E2" rx="4" />
            <text x="385" y="260" fontSize="10" fill="#DC2626" textAnchor="middle" opacity="0.7">RISQUE ÉLEVÉ</text>
            {/* Haute prob × Fort impact */}
            <rect x="265" y="30" width="240" height="165" fill="#FEE2E2" rx="4" />
            <text x="385" y="120" fontSize="10" fill="#DC2626" fontWeight="bold" textAnchor="middle" opacity="0.8">RISQUE TRÈS ÉLEVÉ</text>

            {/* Ligne médiane */}
            <line x1="60" y1="197" x2="505" y2="197" stroke="#9CA3AF" strokeWidth="1.5" strokeDasharray="4,3" />
            <line x1="262" y1="27" x2="262" y2="312" stroke="#9CA3AF" strokeWidth="1.5" strokeDasharray="4,3" />

            {/* Labels axes */}
            <text x="160" y="315" fontSize="9" fill="#6B7280" textAnchor="middle">Impact faible</text>
            <text x="385" y="315" fontSize="9" fill="#6B7280" textAnchor="middle">Impact fort</text>
            <text x="55" y="260" fontSize="9" fill="#6B7280" textAnchor="end">Prob. faible</text>
            <text x="55" y="120" fontSize="9" fill="#6B7280" textAnchor="end">Prob. haute</text>

            {/* Risque 1 — Sécheresse prolongée */}
            <circle cx="420" cy="70" r="22" fill="#EF4444" fillOpacity="0.85" />
            <text x="420" y="66" fontSize="9" fill="white" textAnchor="middle" fontWeight="bold">Séche-</text>
            <text x="420" y="77" fontSize="9" fill="white" textAnchor="middle" fontWeight="bold">resse</text>

            {/* Risque 2 — Vol équipements */}
            <circle cx="340" cy="240" r="18" fill="#F97316" fillOpacity="0.85" />
            <text x="340" y="236" fontSize="8" fill="white" textAnchor="middle" fontWeight="bold">Vol</text>
            <text x="340" y="246" fontSize="8" fill="white" textAnchor="middle" fontWeight="bold">équip.</text>

            {/* Risque 3 — Excès pluie */}
            <circle cx="370" cy="100" r="18" fill="#FBBF24" fillOpacity="0.9" />
            <text x="370" y="96" fontSize="8" fill="#78350F" textAnchor="middle" fontWeight="bold">Excès</text>
            <text x="370" y="106" fontSize="8" fill="#78350F" textAnchor="middle" fontWeight="bold">pluie</text>

            {/* Risque 4 — Accident véhicule */}
            <circle cx="160" cy="240" r="16" fill="#34D399" fillOpacity="0.85" />
            <text x="160" y="236" fontSize="8" fill="white" textAnchor="middle" fontWeight="bold">Acc.</text>
            <text x="160" y="246" fontSize="8" fill="white" textAnchor="middle" fontWeight="bold">véhic.</text>

            {/* Risque 5 — Maladie cacao */}
            <circle cx="300" cy="80" r="16" fill="#EF4444" fillOpacity="0.7" />
            <text x="300" y="76" fontSize="8" fill="white" textAnchor="middle" fontWeight="bold">Mal.</text>
            <text x="300" y="86" fontSize="8" fill="white" textAnchor="middle" fontWeight="bold">cacao</text>

            {/* Risque 6 — Incendie entrepôt */}
            <circle cx="430" cy="220" r="16" fill="#F97316" fillOpacity="0.7" />
            <text x="430" y="216" fontSize="8" fill="white" textAnchor="middle" fontWeight="bold">Incen.</text>
            <text x="430" y="226" fontSize="8" fill="white" textAnchor="middle" fontWeight="bold">entrepôt</text>
          </svg>
        </div>
      </div>

      {/* Recommandations */}
      <div className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-5">
        <div className="flex items-center gap-2 mb-4">
          <Shield size={18} className="text-[#2E7D32]" />
          <span className="font-bold text-gray-800 dark:text-gray-100">Recommandations assurances</span>
        </div>
        <div className="border-t border-gray-100 dark:border-gray-800 mb-4" />
        <div className="space-y-3">
          {[
            {
              num: "1",
              color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
              titre: "Augmenter franchise ASS-001 à 5% pour réduire prime",
              detail: "Économie potentielle estimée : -200 000 XOF/an sur la prime récolte cacao.",
            },
            {
              num: "2",
              color: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
              titre: "Réévaluer ASS-007 John Deere 6120M à VNC 19,2 M",
              detail: "Valeur assurée actuelle : 28,4 M XOF. VNC réelle : 19,2 M. Sur-assurance potentielle à corriger au renouvellement.",
            },
            {
              num: "3",
              color: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
              titre: "Ajouter garantie \"perte d'exploitation\"",
              detail: "Couverture recommandée en cas d'arrêt de production suite à sinistre (sécheresse, incendie). Devis à demander à NSIA.",
            },
          ].map((r) => (
            <div key={r.num} className="flex items-start gap-3 p-3 rounded-xl border border-gray-100 dark:border-gray-800">
              <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold flex-shrink-0 ${r.color}`}>
                {r.num}
              </span>
              <div>
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">{r.titre}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{r.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Page principale ──────────────────────────────────────────────────────────

export default function AssurancesPage() {
  const [onglet, setOnglet] = useState<OngletId>("contrats");

  const onglets: { id: OngletId; label: string; icon: React.ReactNode }[] = [
    { id: "contrats", label: "Contrats", icon: <Shield size={14} /> },
    { id: "sinistres", label: "Sinistres", icon: <AlertCircle size={14} /> },
    { id: "calendrier", label: "Calendrier", icon: <Calendar size={14} /> },
    { id: "risques", label: "Analyse risques", icon: <TrendingUp size={14} /> },
  ];

  const kpis = [
    { icon: <Shield size={20} className="text-[#2E7D32]" />, bg: "bg-green-100 dark:bg-green-900/30", label: "Contrats actifs", value: "8" },
    { icon: <FileText size={20} className="text-blue-600" />, bg: "bg-blue-100 dark:bg-blue-900/30", label: "Primes annuelles", value: "4,2 M XOF" },
    { icon: <TrendingUp size={20} className="text-purple-600" />, bg: "bg-purple-100 dark:bg-purple-900/30", label: "Valeur assurée", value: "285 M XOF" },
    { icon: <AlertTriangle size={20} className="text-orange-500" />, bg: "bg-orange-100 dark:bg-orange-900/30", label: "Sinistres 2025", value: "1" },
    { icon: <CheckCircle size={20} className="text-emerald-600" />, bg: "bg-emerald-100 dark:bg-emerald-900/30", label: "Indemnisation reçue", value: "840 000 XOF" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Topbar title="Assurances & Couvertures" breadcrumb={["Finance", "Assurances"]} />

      <div className="p-6 max-w-7xl mx-auto space-y-5">
        {/* KPI */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {kpis.map((k, i) => (
            <div key={i} className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-5 flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${k.bg}`}>
                {k.icon}
              </div>
              <div>
                <p className="text-lg font-bold text-gray-800 dark:text-gray-100 leading-tight">{k.value}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-tight mt-0.5">{k.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Onglets */}
        <div className="flex gap-1 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-1.5">
          {onglets.map((o) => (
            <button
              key={o.id}
              onClick={() => setOnglet(o.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium transition-colors flex-1 justify-center ${
                onglet === o.id
                  ? "bg-[#2E7D32] text-white"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              {o.icon}
              {o.label}
            </button>
          ))}
        </div>

        {/* Contenu onglet */}
        {onglet === "contrats" && <OngletContrats />}
        {onglet === "sinistres" && <OngletSinistres />}
        {onglet === "calendrier" && <OngletCalendrier />}
        {onglet === "risques" && <OngletRisques />}
      </div>
    </div>
  );
}
