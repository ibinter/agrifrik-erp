"use client";

import { useState } from "react";
import Topbar from "../../components/Topbar";
import {
  MapPin,
  Home,
  FileText,
  AlertTriangle,
  Map,
  Download,
  Eye,
  TrendingUp,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type OngletId = "parcelles" | "fermages" | "cartographie" | "documents";

// ─── Données ──────────────────────────────────────────────────────────────────

const parcelles = [
  { id: "PAR-A1", surface: "6,2 ha", exploitation: "Exploit. A", statut: "titre", statutLabel: "✅ Titre foncier", numTitre: "TF-23847-CI", emetteur: "DGSF Soubré", date: "15/03/2010", valeur: "18,6 M XOF" },
  { id: "PAR-A2", surface: "5,8 ha", exploitation: "Exploit. A", statut: "titre", statutLabel: "✅ Titre foncier", numTitre: "TF-23848-CI", emetteur: "DGSF Soubré", date: "15/03/2010", valeur: "17,4 M XOF" },
  { id: "PAR-A3", surface: "4,8 ha", exploitation: "Exploit. A", statut: "titre", statutLabel: "✅ Titre foncier", numTitre: "TF-28912-CI", emetteur: "DGSF Soubré", date: "10/07/2015", valeur: "14,4 M XOF" },
  { id: "PAR-C1", surface: "5,6 ha", exploitation: "Exploit. A", statut: "titre", statutLabel: "✅ Titre foncier", numTitre: "TF-31204-CI", emetteur: "DGSF Soubré", date: "20/11/2018", valeur: "16,8 M XOF" },
  { id: "PAR-C2", surface: "4,8 ha", exploitation: "Exploit. A", statut: "titre", statutLabel: "✅ Titre foncier", numTitre: "TF-31205-CI", emetteur: "DGSF Soubré", date: "20/11/2018", valeur: "14,4 M XOF" },
  { id: "PAR-F1", surface: "6,0 ha", exploitation: "Exploit. C", statut: "encours", statutLabel: "⏳ En cours", numTitre: "Dossier TF-GANG-2024-08", emetteur: "DGSF Gagnoa", date: "Soumis Jan 2025", valeur: "12,0 M XOF (estimé)" },
  { id: "PAR-B1", surface: "3,2 ha", exploitation: "Exploit. A", statut: "fermage", statutLabel: "📋 Fermage", numTitre: "CT-FARM-2018-014", emetteur: "—", date: "Expire 12/2027", valeur: "960 000 XOF/an" },
  { id: "PAR-B2", surface: "3,4 ha", exploitation: "Exploit. A", statut: "fermage", statutLabel: "📋 Fermage", numTitre: "CT-FARM-2018-015", emetteur: "—", date: "Expire 12/2027", valeur: "1 020 000 XOF/an" },
  { id: "PAR-D1", surface: "5,6 ha", exploitation: "Exploit. A", statut: "fermage", statutLabel: "📋 Fermage", numTitre: "CT-FARM-2020-022", emetteur: "—", date: "Expire 06/2026", valeur: "840 000 XOF/an" },
  { id: "PAR-D2", surface: "2,4 ha", exploitation: "Exploit. A", statut: "alerte", statutLabel: "⚠️ Fermage", numTitre: "CT-FARM-2020-023", emetteur: "—", date: "Expire 12/2025", valeur: "480 000 XOF/an ⚠️" },
  { id: "PAR-E1", surface: "8,2 ha", exploitation: "Exploit. B", statut: "fermage", statutLabel: "📋 Fermage long", numTitre: "CT-FARM-2007-006", emetteur: "—", date: "Expire 2025+18ans", valeur: "1 640 000 XOF/an" },
  { id: "PAR-E2", surface: "5,8 ha", exploitation: "Exploit. B", statut: "fermage", statutLabel: "📋 Fermage long", numTitre: "CT-FARM-2007-007", emetteur: "—", date: "Expire 2025+18ans", valeur: "870 000 XOF/an" },
];

const loyers = [
  { parcelles: "PAR-B1 + B2", proprietaire: "Fam. Konan Joseph", loyer: "1 980 000 XOF", paiement: "Semestriel", prochain: "01/07/2025", statut: "due" },
  { parcelles: "PAR-D1", proprietaire: "M. Coulibaly Lacina", loyer: "840 000 XOF", paiement: "Annuel (Jan)", prochain: "01/01/2026", statut: "ok" },
  { parcelles: "PAR-D2", proprietaire: "M. Séka Parfait", loyer: "480 000 XOF", paiement: "Annuel (Jan)", prochain: "01/01/2026", statut: "renouveler" },
  { parcelles: "PAR-E1 + E2", proprietaire: "Héritiers Traoré", loyer: "2 510 000 XOF", paiement: "Semestriel", prochain: "01/07/2025", statut: "due" },
];

const documents = [
  { nom: "Titre foncier PAR-A1", parcelle: "PAR-A1", type: "Titre foncier", numero: "TF-23847", date: "2010", format: "PDF 2,4 MB", alerte: false },
  { nom: "Titre foncier PAR-A2", parcelle: "PAR-A2", type: "Titre foncier", numero: "TF-23848", date: "2010", format: "PDF 2,3 MB", alerte: false },
  { nom: "Titre foncier PAR-A3", parcelle: "PAR-A3", type: "Titre foncier", numero: "TF-28912", date: "2015", format: "PDF 2,1 MB", alerte: false },
  { nom: "Contrat fermage PAR-B1/B2", parcelle: "PAR-B1, B2", type: "Bail agricole", numero: "CT-2018-014/015", date: "2018", format: "PDF 1,8 MB", alerte: false },
  { nom: "Contrat fermage PAR-D1", parcelle: "PAR-D1", type: "Bail agricole", numero: "CT-2020-022", date: "2020", format: "PDF 1,6 MB", alerte: false },
  { nom: "Contrat fermage PAR-D2", parcelle: "PAR-D2", type: "Bail agricole", numero: "CT-2020-023", date: "2020", format: "PDF 1,5 MB", alerte: true },
  { nom: "Bail emphytéotique Exploit. B", parcelle: "PAR-E1, E2", type: "Bail 25 ans", numero: "CT-2007-006/007", date: "2007", format: "PDF 3,2 MB", alerte: false },
  { nom: "Dossier TF Gagnoa", parcelle: "PAR-F1", type: "Demande TF", numero: "TF-GANG-2024-08", date: "2025", format: "PDF 4,1 MB", alerte: false },
  { nom: "Plan topographique PAR-A", parcelle: "PAR-A1 à D2", type: "Plan", numero: "—", date: "2019", format: "PDF 8,4 MB", alerte: false },
  { nom: "Certificat bornage", parcelle: "PAR-F1", type: "Bornage", numero: "—", date: "Jan 2025", format: "PDF 1,2 MB", alerte: false },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function StatutBadge({ statut, label }: { statut: string; label: string }) {
  const cls =
    statut === "titre"
      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
      : statut === "encours"
      ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
      : statut === "alerte"
      ? "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400"
      : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300";
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${cls}`}>
      {label}
    </span>
  );
}

// ─── Onglets ─────────────────────────────────────────────────────────────────

function OngletParcelles() {
  return (
    <div className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-5">
      <div className="flex items-center gap-2 mb-4">
        <Home size={18} className="text-[#2E7D32]" />
        <span className="font-bold text-gray-800 dark:text-gray-100">Parcelles &amp; Titres fonciers</span>
        <span className="ml-auto text-xs text-gray-400">12 parcelles — 62 ha total</span>
      </div>
      <div className="border-t border-gray-100 dark:border-gray-800 mb-4" />
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="text-left text-gray-500 dark:text-gray-400 bg-[#F8FBF8] dark:bg-gray-800/50">
              {["Parcelle", "Superficie", "Exploitation", "Statut", "N° Titre / Contrat", "Émis par", "Date / Expiration", "Valeur estimée", "Actions"].map((h) => (
                <th key={h} className="px-3 py-2 font-medium whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {parcelles.map((p, i) => (
              <tr
                key={p.id}
                className={`border-b dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors ${
                  i % 2 === 0 ? "" : "bg-gray-50/40 dark:bg-gray-800/20"
                } ${p.statut === "alerte" ? "bg-orange-50/60 dark:bg-orange-900/10" : ""}`}
              >
                <td className="px-3 py-2.5 font-mono font-semibold text-gray-800 dark:text-gray-200">{p.id}</td>
                <td className="px-3 py-2.5 text-gray-700 dark:text-gray-300">{p.surface}</td>
                <td className="px-3 py-2.5 text-gray-600 dark:text-gray-400 whitespace-nowrap">{p.exploitation}</td>
                <td className="px-3 py-2.5"><StatutBadge statut={p.statut} label={p.statutLabel} /></td>
                <td className="px-3 py-2.5 font-mono text-gray-600 dark:text-gray-400 whitespace-nowrap">{p.numTitre}</td>
                <td className="px-3 py-2.5 text-gray-500 dark:text-gray-500 whitespace-nowrap">{p.emetteur}</td>
                <td className="px-3 py-2.5 text-gray-500 dark:text-gray-500 whitespace-nowrap">{p.date}</td>
                <td className="px-3 py-2.5 font-semibold text-gray-800 dark:text-gray-200 whitespace-nowrap">{p.valeur}</td>
                <td className="px-3 py-2.5">
                  <div className="flex items-center gap-1">
                    <button className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs bg-[#2E7D32] text-white hover:bg-[#1B5E20] transition-colors">
                      <Eye size={10} /> Voir
                    </button>
                    <button className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                      <FileText size={10} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function OngletFermages() {
  return (
    <div className="space-y-5">
      {/* Alerte */}
      <div className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-5">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle size={18} className="text-red-500" />
          <span className="font-bold text-gray-800 dark:text-gray-100">Alertes fermages</span>
        </div>
        <div className="border-t border-gray-100 dark:border-gray-800 mb-4" />
        <div className="rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 px-4 py-3 flex items-start gap-3">
          <span className="text-base mt-0.5">🔴</span>
          <div>
            <p className="text-sm font-semibold text-red-800 dark:text-red-300">
              PAR-D2 (2,4 ha) — Contrat expire Déc 2025 — RENOUVELER AVANT OCT 2025
            </p>
            <p className="text-xs text-red-600 dark:text-red-400 mt-1">
              Propriétaire : M. Séka Parfait, Soubré — Contact : +225 07 XX XX XX
            </p>
          </div>
        </div>
      </div>

      {/* Calendrier des loyers */}
      <div className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-5">
        <div className="flex items-center gap-2 mb-4">
          <FileText size={18} className="text-[#2E7D32]" />
          <span className="font-bold text-gray-800 dark:text-gray-100">Calendrier des loyers 2025</span>
        </div>
        <div className="border-t border-gray-100 dark:border-gray-800 mb-4" />
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 dark:text-gray-400 bg-[#F8FBF8] dark:bg-gray-800/50">
                {["Parcelle", "Propriétaire", "Loyer annuel", "Paiement", "Prochain versement", "Statut"].map((h) => (
                  <th key={h} className="px-3 py-2 text-xs font-medium whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loyers.map((l, i) => (
                <tr key={i} className="border-b border-gray-50 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors">
                  <td className="px-3 py-3 font-mono text-xs font-semibold text-gray-800 dark:text-gray-200">{l.parcelles}</td>
                  <td className="px-3 py-3 text-xs text-gray-700 dark:text-gray-300 whitespace-nowrap">{l.proprietaire}</td>
                  <td className="px-3 py-3 text-xs font-semibold text-gray-800 dark:text-gray-200 whitespace-nowrap">{l.loyer}</td>
                  <td className="px-3 py-3 text-xs text-gray-500 dark:text-gray-400">{l.paiement}</td>
                  <td className="px-3 py-3 font-mono text-xs text-gray-600 dark:text-gray-400">{l.prochain}</td>
                  <td className="px-3 py-3">
                    {l.statut === "due" && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
                        🔴 DÛ
                      </span>
                    )}
                    {l.statut === "ok" && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                        ✅ Payé
                      </span>
                    )}
                    {l.statut === "renouveler" && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400">
                        ✅ Payé ⚠️ À renouveler
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-gray-200 dark:border-gray-700">
                <td colSpan={2} className="px-3 pt-3 text-sm font-semibold text-gray-700 dark:text-gray-300">Total loyers annuels</td>
                <td className="px-3 pt-3 text-sm font-bold text-[#2E7D32]">5 810 000 XOF</td>
                <td colSpan={3} />
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}

function OngletCartographie() {
  return (
    <div className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-5">
      <div className="flex items-center gap-2 mb-4">
        <Map size={18} className="text-[#2E7D32]" />
        <span className="font-bold text-gray-800 dark:text-gray-100">Cartographie foncière — Région de Soubré</span>
      </div>
      <div className="border-t border-gray-100 dark:border-gray-800 mb-4" />
      <div className="overflow-x-auto">
        <svg viewBox="0 0 700 450" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-3xl mx-auto" style={{ minWidth: 480 }}>
          {/* Fond terrain */}
          <rect width="700" height="450" fill="#F5F0E0" rx="12" />
          {/* Grille légère */}
          {[100, 200, 300, 400, 500, 600].map(x => (
            <line key={x} x1={x} y1="0" x2={x} y2="450" stroke="#E0D8C0" strokeWidth="0.5" />
          ))}
          {[90, 180, 270, 360].map(y => (
            <line key={y} x1="0" y1={y} x2="700" y2={y} stroke="#E0D8C0" strokeWidth="0.5" />
          ))}

          {/* Route nationale N1 */}
          <path d="M 0 260 Q 200 250 400 255 Q 550 260 700 245" stroke="#8B6914" strokeWidth="5" fill="none" strokeDasharray="12,4" />
          <text x="580" y="240" fontSize="10" fill="#8B6914" fontWeight="bold">Route N1</text>

          {/* Rivière Davo */}
          <path d="M 50 80 Q 130 130 180 200 Q 220 260 260 300 Q 300 340 380 380 Q 430 410 500 430" stroke="#4FC3F7" strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M 55 85 Q 135 135 185 205 Q 225 265 265 305 Q 305 345 385 385" stroke="#81D4FA" strokeWidth="2" fill="none" strokeLinecap="round" />
          <text x="60" y="175" fontSize="10" fill="#0277BD" fontWeight="bold" transform="rotate(-55 60 175)">Rivière Davo</text>

          {/* ZONE A — Soubré Nord */}
          <rect x="290" y="30" width="200" height="150" fill="#1B5E20" fillOpacity="0.25" stroke="#1B5E20" strokeWidth="2" rx="4" />
          {/* Parcelles Zone A — grille 4×2 */}
          {[0,1,2,3].map(col => [0,1].map(row => (
            <rect key={`a${col}${row}`} x={292 + col * 50} y={32 + row * 72} width="48" height="70" fill="#2E7D32" fillOpacity="0.35" stroke="#2E7D32" strokeWidth="1" />
          )))}
          {/* Labels sous-parcelles Zone A */}
          {["A1","A2","A3","C1","C2","D1","D2","B1"].map((label, i) => {
            const col = i % 4;
            const row = Math.floor(i / 4);
            return (
              <text key={label} x={316 + col * 50} y={70 + row * 72} fontSize="9" fill="#fff" fontWeight="bold" textAnchor="middle">{label}</text>
            );
          })}
          <text x="390" y="20" fontSize="11" fill="#1B5E20" fontWeight="bold" textAnchor="middle">Zone A — Soubré Nord</text>
          <text x="390" y="195" fontSize="9" fill="#1B5E20" textAnchor="middle">Exploit. A (29,2 ha propriété + fermage)</text>

          {/* ZONE B — Soubré Sud */}
          <rect x="430" y="290" width="160" height="100" fill="#388E3C" fillOpacity="0.22" stroke="#388E3C" strokeWidth="2" rx="4" strokeDasharray="6,3" />
          <rect x="432" y="292" width="75" height="96" fill="#388E3C" fillOpacity="0.3" stroke="#388E3C" strokeWidth="1" />
          <text x="469" y="344" fontSize="9" fill="#fff" fontWeight="bold" textAnchor="middle">E1</text>
          <rect x="513" y="292" width="75" height="96" fill="#388E3C" fillOpacity="0.3" stroke="#388E3C" strokeWidth="1" />
          <text x="550" y="344" fontSize="9" fill="#fff" fontWeight="bold" textAnchor="middle">E2</text>
          <text x="510" y="285" fontSize="11" fill="#388E3C" fontWeight="bold" textAnchor="middle">Zone B — Soubré Sud</text>
          <text x="510" y="405" fontSize="9" fill="#388E3C" textAnchor="middle">Exploit. B (14 ha — bail long)</text>

          {/* ZONE C — Gagnoa */}
          <rect x="30" y="295" width="100" height="80" fill="#66BB6A" fillOpacity="0.2" stroke="#4CAF50" strokeWidth="2" rx="4" strokeDasharray="4,4" />
          <text x="80" y="288" fontSize="11" fill="#4CAF50" fontWeight="bold" textAnchor="middle">Zone C — Gagnoa</text>
          <text x="80" y="340" fontSize="9" fill="#2E7D32" textAnchor="middle">Exploit. C</text>
          <text x="80" y="353" fontSize="9" fill="#2E7D32" textAnchor="middle">F1 (6 ha)</text>
          <text x="80" y="366" fontSize="8" fill="#E65100" textAnchor="middle">⏳ TF en cours</text>

          {/* Ville de Soubré */}
          <circle cx="340" cy="270" r="7" fill="#E65100" />
          <text x="355" y="274" fontSize="11" fill="#E65100" fontWeight="bold">Soubré</text>

          {/* Siège AGRIFRIK */}
          <text x="340" y="220" fontSize="16" textAnchor="middle">🏠</text>
          <text x="340" y="234" fontSize="8" fill="#1B5E20" textAnchor="middle" fontWeight="bold">Siège</text>

          {/* Entrepôt */}
          <text x="480" y="238" fontSize="14" textAnchor="middle">🏭</text>
          <text x="480" y="250" fontSize="8" fill="#555" textAnchor="middle">Entrepôt</text>

          {/* Point eau */}
          <text x="200" y="255" fontSize="14" textAnchor="middle">💧</text>

          {/* Points cardinaux */}
          <text x="672" y="25" fontSize="16" fill="#333" fontWeight="bold" textAnchor="middle">N</text>
          <line x1="672" y1="28" x2="672" y2="48" stroke="#333" strokeWidth="2" markerEnd="url(#arrow)" />
          <defs>
            <marker id="arrow" markerWidth="6" markerHeight="6" refX="3" refY="6" orient="auto">
              <path d="M0,0 L6,0 L3,6 Z" fill="#333" />
            </marker>
          </defs>
          <text x="672" y="55" fontSize="10" fill="#333" textAnchor="middle">↓ S</text>

          {/* Échelle */}
          <line x1="30" y1="432" x2="130" y2="432" stroke="#555" strokeWidth="2" />
          <line x1="30" y1="427" x2="30" y2="437" stroke="#555" strokeWidth="2" />
          <line x1="130" y1="427" x2="130" y2="437" stroke="#555" strokeWidth="2" />
          <text x="80" y="445" fontSize="9" fill="#555" textAnchor="middle">≈ 5 km</text>

          {/* Légende */}
          <rect x="495" y="30" width="195" height="115" fill="white" fillOpacity="0.9" rx="6" stroke="#ddd" strokeWidth="1" />
          <text x="592" y="46" fontSize="10" fontWeight="bold" fill="#333" textAnchor="middle">Légende</text>
          <rect x="505" y="52" width="16" height="12" fill="#2E7D32" fillOpacity="0.6" />
          <text x="527" y="62" fontSize="9" fill="#333">Propriété (Titre foncier)</text>
          <rect x="505" y="70" width="16" height="12" fill="#388E3C" fillOpacity="0.3" stroke="#388E3C" strokeWidth="1" />
          <line x1="505" y1="76" x2="521" y2="76" stroke="#388E3C" strokeWidth="1" strokeDasharray="3,2" />
          <text x="527" y="80" fontSize="9" fill="#333">Fermage (location)</text>
          <rect x="505" y="88" width="16" height="12" fill="#66BB6A" fillOpacity="0.2" stroke="#4CAF50" strokeDasharray="3,3" strokeWidth="1" />
          <text x="527" y="98" fontSize="9" fill="#333">Titre en cours</text>
          <line x1="505" y1="108" x2="521" y2="108" stroke="#8B6914" strokeWidth="3" strokeDasharray="6,2" />
          <text x="527" y="112" fontSize="9" fill="#333">Route nationale N1</text>
          <line x1="505" y1="122" x2="521" y2="122" stroke="#4FC3F7" strokeWidth="3" />
          <text x="527" y="126" fontSize="9" fill="#333">Rivière Davo</text>
        </svg>
      </div>
    </div>
  );
}

function OngletDocuments() {
  return (
    <div className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-5">
      <div className="flex items-center gap-2 mb-4">
        <FileText size={18} className="text-[#2E7D32]" />
        <span className="font-bold text-gray-800 dark:text-gray-100">Documents fonciers</span>
        <span className="ml-auto text-xs text-gray-400">10 documents</span>
      </div>
      <div className="border-t border-gray-100 dark:border-gray-800 mb-4" />
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="text-left text-gray-500 dark:text-gray-400 bg-[#F8FBF8] dark:bg-gray-800/50">
              {["Document", "Parcelle(s)", "Type", "N°", "Date", "Format", "Actions"].map((h) => (
                <th key={h} className="px-3 py-2 font-medium whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {documents.map((d, i) => (
              <tr
                key={i}
                className={`border-b border-gray-50 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors ${
                  d.alerte ? "bg-orange-50/60 dark:bg-orange-900/10" : ""
                }`}
              >
                <td className="px-3 py-2.5 font-medium text-gray-800 dark:text-gray-200 whitespace-nowrap">
                  {d.alerte && <span className="mr-1">⚠️</span>}{d.nom}
                </td>
                <td className="px-3 py-2.5 font-mono text-gray-600 dark:text-gray-400 whitespace-nowrap">{d.parcelle}</td>
                <td className="px-3 py-2.5 text-gray-600 dark:text-gray-400 whitespace-nowrap">{d.type}</td>
                <td className="px-3 py-2.5 font-mono text-gray-500 dark:text-gray-500 whitespace-nowrap">{d.numero}</td>
                <td className="px-3 py-2.5 text-gray-500 dark:text-gray-500">{d.date}</td>
                <td className="px-3 py-2.5 text-gray-500 dark:text-gray-500 whitespace-nowrap">{d.format}</td>
                <td className="px-3 py-2.5">
                  <div className="flex items-center gap-1">
                    <button className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs bg-[#2E7D32] text-white hover:bg-[#1B5E20] transition-colors whitespace-nowrap">
                      <Eye size={10} /> Voir
                    </button>
                    <button className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors whitespace-nowrap">
                      <Download size={10} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Page principale ──────────────────────────────────────────────────────────

export default function GestionTerresPage() {
  const [onglet, setOnglet] = useState<OngletId>("parcelles");

  const onglets: { id: OngletId; label: string; icon: React.ReactNode }[] = [
    { id: "parcelles", label: "Parcelles & Titres", icon: <Home size={14} /> },
    { id: "fermages", label: "Fermages", icon: <FileText size={14} /> },
    { id: "cartographie", label: "Cartographie", icon: <Map size={14} /> },
    { id: "documents", label: "Documents", icon: <Download size={14} /> },
  ];

  const kpis = [
    { icon: <MapPin size={20} className="text-[#2E7D32]" />, bg: "bg-green-100 dark:bg-green-900/30", label: "Superficie totale", value: "62 ha" },
    { icon: <Home size={20} className="text-blue-600" />, bg: "bg-blue-100 dark:bg-blue-900/30", label: "En propriété", value: "42 ha" },
    { icon: <FileText size={20} className="text-purple-600" />, bg: "bg-purple-100 dark:bg-purple-900/30", label: "En fermage", value: "20 ha" },
    { icon: <AlertTriangle size={20} className="text-orange-500" />, bg: "bg-orange-100 dark:bg-orange-900/30", label: "Titres fonciers", value: "3 / 4" },
    { icon: <TrendingUp size={20} className="text-emerald-600" />, bg: "bg-emerald-100 dark:bg-emerald-900/30", label: "Valeur foncière estimée", value: "186 M XOF" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Topbar title="Gestion des Terres & Foncier" breadcrumb={["RH & Social", "Gestion des Terres"]} />

      <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-5">
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
        {onglet === "parcelles" && <OngletParcelles />}
        {onglet === "fermages" && <OngletFermages />}
        {onglet === "cartographie" && <OngletCartographie />}
        {onglet === "documents" && <OngletDocuments />}
      </div>
    </div>
  );
}
