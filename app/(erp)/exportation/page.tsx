"use client";

import { useState } from "react";
import Topbar from "../../components/Topbar";
import {
  CheckCircle,
  Clock,
  Package,
  Ship,
  FileText,
  Phone,
  Info,
} from "lucide-react";

type Tab = "encours" | "historique" | "documents";

const HISTORIQUE = [
  { num: "EXP-2025-001", date: "10/01", client: "Olam CI", produit: "Cacao Grade A", qte: "18 000 kg", ca: "18 720 000", incoterm: "FOB", statut: "Livré", paiement: "Payé" },
  { num: "EXP-2025-002", date: "05/02", client: "Barry Callebaut", produit: "Cacao Grade AA", qte: "24 000 kg", ca: "26 400 000", incoterm: "FOB", statut: "Livré", paiement: "Payé" },
  { num: "EXP-2025-003", date: "28/02", client: "Cargill", produit: "Cacao Grade AA", qte: "12 000 kg", ca: "13 200 000", incoterm: "FOB", statut: "Livré", paiement: "Payé" },
  { num: "EXP-2025-004", date: "20/03", client: "Barry Callebaut", produit: "Anacarde WW240", qte: "6 000 kg", ca: "5 700 000", incoterm: "FOB", statut: "Livré", paiement: "Payé" },
  { num: "EXP-2025-005", date: "15/04", client: "JDE Peet's", produit: "Cacao Grade AA", qte: "18 000 kg", ca: "19 800 000", incoterm: "FOB", statut: "Livré", paiement: "Payé" },
  { num: "EXP-2025-006", date: "10/05", client: "Olam", produit: "Cacao Grade A", qte: "6 000 kg", ca: "6 240 000", incoterm: "FOB", statut: "Livré", paiement: "Payé" },
  { num: "EXP-2025-007", date: "02/06", client: "Barry Callebaut", produit: "Cacao Grade AA", qte: "10 000 kg", ca: "11 000 000", incoterm: "FOB", statut: "Livré", paiement: "Payé" },
  { num: "EXP-2025-008", date: "12/06", client: "Cargill", produit: "Cacao Grade A", qte: "8 000 kg", ca: "8 320 000", incoterm: "FOB", statut: "Livré", paiement: "Payé" },
  { num: "EXP-2025-009", date: "18/06", client: "JDE Peet's", produit: "Cacao Grade AA", qte: "14 000 kg", ca: "15 400 000", incoterm: "FOB", statut: "Livré", paiement: "Payé" },
  { num: "EXP-2025-010", date: "25/06", client: "Olam CI", produit: "Anacarde WW240", qte: "5 000 kg", ca: "4 750 000", incoterm: "FOB", statut: "Livré", paiement: "Payé" },
  { num: "EXP-2025-011", date: "02/07", client: "Barry Callebaut", produit: "Cacao Grade AA", qte: "16 200 kg", ca: "17 820 000", incoterm: "FOB", statut: "Livré", paiement: "Payé" },
  { num: "EXP-2025-012", date: "10/07", client: "Cargill", produit: "Cacao Grade AA", qte: "24 900 kg", ca: "27 390 000", incoterm: "FOB", statut: "En transit", paiement: "LC" },
];

const MONTHLY_DATA = [
  { mois: "Jan", val: 18.7 },
  { mois: "Fév", val: 39.6 },
  { mois: "Mar", val: 13.2 },
  { mois: "Avr", val: 5.7 },
  { mois: "Mai", val: 19.8 },
  { mois: "Jun", val: 6.2 },
  { mois: "Jul", val: 27.4 },
  { mois: "Aoû", val: 0 },
  { mois: "Sep", val: 0 },
  { mois: "Oct", val: 0 },
  { mois: "Nov", val: 0 },
  { mois: "Déc", val: 0 },
];

const MAX_VAL = 45;

export default function ExportationPage() {
  const [tab, setTab] = useState<Tab>("encours");

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FBF8]">
      <Topbar breadcrumb={["Commerce", "Exportations"]} />

      <main className="flex-1 p-6 space-y-6">
        {/* Onglets */}
        <div className="flex gap-1 bg-white rounded-xl border border-gray-100 p-1 w-fit">
          {(["encours", "historique", "documents"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-1.5 rounded-lg text-xs font-medium transition ${
                tab === t
                  ? "bg-[#2E7D32] text-white"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {t === "encours" ? "En cours" : t === "historique" ? "Historique" : "Documents"}
            </button>
          ))}
        </div>

        {/* ===== ONGLET EN COURS ===== */}
        {tab === "encours" && (
          <div className="space-y-6">
            {/* KPIs */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { label: "Exportations actives", value: "1" },
                { label: "Volume YTD", value: "103,1 t" },
                { label: "CA export YTD", value: "113,4 M XOF" },
                { label: "Clients actifs", value: "5" },
                { label: "Taux conformité douane", value: "100%" },
              ].map((k) => (
                <div key={k.label} className="rounded-2xl border border-gray-100 bg-white p-5">
                  <p className="text-xs text-gray-500 mb-1">{k.label}</p>
                  <p className="text-lg font-bold text-gray-900">{k.value}</p>
                </div>
              ))}
            </div>

            {/* Export actif */}
            <div className="rounded-2xl border border-blue-200 bg-blue-50 p-6 space-y-5">
              <div className="flex flex-wrap gap-4 items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-blue-800 bg-blue-100 px-2 py-0.5 rounded-full">
                      EXP-2025-012
                    </span>
                    <span className="text-xs text-blue-600 font-medium">LOT-2025-045</span>
                  </div>
                  <p className="text-base font-bold text-blue-900">Cargill International SA</p>
                </div>
                <span className="flex items-center gap-1 bg-blue-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                  <Ship size={12} /> En transit
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1.5">
                  <div className="flex gap-2">
                    <Package size={13} className="text-blue-500 shrink-0 mt-0.5" />
                    <span className="text-blue-800">
                      <span className="font-semibold">Produit :</span> Cacao Grade AA | 24 900 kg | 415 sacs jute
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Ship size={13} className="text-blue-500 shrink-0 mt-0.5" />
                    <span className="text-blue-800">
                      <span className="font-semibold">Container :</span> CAIU 842156-4 | MSC Allegria — Voyage CI2025-48W
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Clock size={13} className="text-blue-500 shrink-0 mt-0.5" />
                    <span className="text-blue-800">
                      <span className="font-semibold">Départ :</span> San-Pédro CI 10/07/2025 |{" "}
                      <span className="font-semibold">ETA Rotterdam :</span> 05/08/2025{" "}
                      <span className="text-blue-500">(25 jours restants)</span>
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Info size={13} className="text-blue-500 shrink-0 mt-0.5" />
                    <span className="text-blue-800">
                      <span className="font-semibold">Incoterm :</span> FOB San-Pédro | 1 100 XOF/kg = 27 390 000 XOF
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <CheckCircle size={13} className="text-green-600 shrink-0 mt-0.5" />
                    <span className="text-blue-800">
                      <span className="font-semibold">LC :</span> BNP-2025-1847 ✅ Confirmée
                    </span>
                  </div>
                </div>

                {/* Checklist documents */}
                <div className="bg-white/60 rounded-xl p-4 space-y-1.5">
                  <p className="font-semibold text-blue-900 mb-2">Documents export</p>
                  {[
                    "Facture commerciale FAC-2025-048",
                    "Packing list",
                    "Bill of Lading (BL) MSC",
                    "DAE (Déclaration Aval Export) DGD",
                    "Certificat phytosanitaire MINADER",
                    "Certificat Rainforest Alliance LOT-045",
                    "Certificat d'origine CI (BCC Abidjan)",
                    "Rapport qualité CQ-LOT-045",
                  ].map((doc) => (
                    <div key={doc} className="flex items-center gap-2 text-blue-800">
                      <CheckCircle size={12} className="text-green-500 shrink-0" />
                      <span>{doc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* SVG suivi navire */}
              <div className="bg-white rounded-xl p-4">
                <p className="text-xs font-semibold text-gray-700 mb-3">Suivi du navire — MSC Allegria</p>
                <svg viewBox="0 0 600 80" className="w-full" aria-label="Suivi navire">
                  {/* Ligne de trajet */}
                  <line x1="40" y1="40" x2="560" y2="40" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="4 3" />
                  {/* Segment parcouru */}
                  <line x1="40" y1="40" x2="220" y2="40" stroke="#2E7D32" strokeWidth="3" />

                  {/* Points */}
                  {/* San-Pédro - done */}
                  <circle cx="40" cy="40" r="8" fill="#2E7D32" />
                  <text x="40" y="65" textAnchor="middle" fontSize="9" fill="#374151" fontFamily="sans-serif">San-Pédro</text>
                  <text x="40" y="75" textAnchor="middle" fontSize="8" fill="#6B7280" fontFamily="sans-serif">✅ 10/07</text>

                  {/* Golfe de Guinée - current */}
                  <circle cx="220" cy="40" r="9" fill="#1D4ED8" />
                  <circle cx="220" cy="40" r="5" fill="white" />
                  <text x="220" y="65" textAnchor="middle" fontSize="9" fill="#374151" fontFamily="sans-serif">Golfe de Guinée</text>
                  <text x="220" y="75" textAnchor="middle" fontSize="8" fill="#1D4ED8" fontFamily="sans-serif">🔵 Position actuelle</text>

                  {/* Cap Vert - pending */}
                  <circle cx="390" cy="40" r="7" fill="#E5E7EB" stroke="#9CA3AF" strokeWidth="1.5" />
                  <text x="390" y="65" textAnchor="middle" fontSize="9" fill="#6B7280" fontFamily="sans-serif">Cap Vert</text>

                  {/* Rotterdam - pending */}
                  <circle cx="560" cy="40" r="8" fill="#E5E7EB" stroke="#9CA3AF" strokeWidth="1.5" />
                  <text x="560" y="65" textAnchor="middle" fontSize="9" fill="#374151" fontFamily="sans-serif">Rotterdam</text>
                  <text x="560" y="75" textAnchor="middle" fontSize="8" fill="#6B7280" fontFamily="sans-serif">ETA 05/08</text>

                  {/* Ship icon */}
                  <text x="206" y="27" fontSize="14" fontFamily="sans-serif">🚢</text>
                </svg>
                <p className="text-xs text-gray-500 mt-2">Vitesse estimée : 18 nœuds | Position : Golfe de Guinée (estimée)</p>
              </div>
            </div>
          </div>
        )}

        {/* ===== ONGLET HISTORIQUE ===== */}
        {tab === "historique" && (
          <div className="space-y-6">
            <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                <h2 className="text-sm font-bold text-gray-900">Exportations 2025 — 12 opérations</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-[#F8FBF8]">
                      {["N°", "Date", "Client", "Produit", "Qté", "CA (XOF)", "Incoterm", "Statut", "Paiement"].map((h) => (
                        <th key={h} className="text-left px-4 py-2.5 font-semibold text-gray-600 whitespace-nowrap">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {HISTORIQUE.map((row, i) => (
                      <tr key={row.num} className={`border-t border-gray-50 ${i % 2 === 0 ? "" : "bg-gray-50/40"}`}>
                        <td className="px-4 py-2.5 font-medium text-[#2E7D32]">{row.num}</td>
                        <td className="px-4 py-2.5 text-gray-600">{row.date}</td>
                        <td className="px-4 py-2.5 text-gray-800 font-medium">{row.client}</td>
                        <td className="px-4 py-2.5 text-gray-700">{row.produit}</td>
                        <td className="px-4 py-2.5 text-gray-700 font-mono">{row.qte}</td>
                        <td className="px-4 py-2.5 text-gray-800 font-mono font-semibold">{row.ca}</td>
                        <td className="px-4 py-2.5 text-gray-600">{row.incoterm}</td>
                        <td className="px-4 py-2.5">
                          <span
                            className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${
                              row.statut === "Livré"
                                ? "bg-green-50 text-green-700"
                                : "bg-blue-50 text-blue-700"
                            }`}
                          >
                            {row.statut === "Livré" ? "✅" : "🔵"} {row.statut}
                          </span>
                        </td>
                        <td className="px-4 py-2.5">
                          <span
                            className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${
                              row.paiement === "Payé"
                                ? "bg-green-50 text-green-700"
                                : "bg-orange-50 text-orange-700"
                            }`}
                          >
                            {row.paiement === "Payé" ? "✅" : "⏳"} {row.paiement}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* SVG Bar chart CA mensuel */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5">
              <h2 className="text-sm font-bold text-gray-900 mb-4">CA export mensuel 2025 (M XOF)</h2>
              <svg viewBox="0 0 660 200" className="w-full" aria-label="CA export mensuel 2025">
                {/* Grille horizontale */}
                {[0, 15, 30, 45].map((v) => {
                  const y = 170 - (v / MAX_VAL) * 140;
                  return (
                    <g key={v}>
                      <line x1="40" y1={y} x2="640" y2={y} stroke="#F3F4F6" strokeWidth="1" />
                      <text x="35" y={y + 4} textAnchor="end" fontSize="9" fill="#9CA3AF" fontFamily="sans-serif">
                        {v}M
                      </text>
                    </g>
                  );
                })}

                {MONTHLY_DATA.map((d, i) => {
                  const barW = 38;
                  const gap = 15;
                  const x = 50 + i * (barW + gap);
                  const barH = (d.val / MAX_VAL) * 140;
                  const y = 170 - barH;
                  const isYTD = d.val > 0;

                  return (
                    <g key={d.mois}>
                      {isYTD && (
                        <>
                          <rect x={x} y={y} width={barW} height={barH} rx="4" fill="#2E7D32" />
                          {d.val >= 5 && (
                            <text
                              x={x + barW / 2}
                              y={y - 3}
                              textAnchor="middle"
                              fontSize="8"
                              fill="#1B5E20"
                              fontFamily="sans-serif"
                              fontWeight="600"
                            >
                              {d.val}
                            </text>
                          )}
                        </>
                      )}
                      {!isYTD && (
                        <rect x={x} y={155} width={barW} height={15} rx="4" fill="#F3F4F6" />
                      )}
                      <text
                        x={x + barW / 2}
                        y="188"
                        textAnchor="middle"
                        fontSize="9"
                        fill="#6B7280"
                        fontFamily="sans-serif"
                      >
                        {d.mois}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>
        )}

        {/* ===== ONGLET DOCUMENTS ===== */}
        {tab === "documents" && (
          <div className="space-y-6">
            {/* Guides réglementaires */}
            <div>
              <h2 className="text-sm font-bold text-gray-900 mb-3">Guides réglementaires</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  {
                    icon: "📋",
                    titre: "Procédure DAE (Déclaration Aval Export)",
                    org: "DGD Abidjan",
                    detail: "Guide 12 étapes",
                  },
                  {
                    icon: "📋",
                    titre: "Certificat phytosanitaire MINADER",
                    org: "DPV Abidjan",
                    detail: "Délai : 48h",
                  },
                  {
                    icon: "📋",
                    titre: "Certificat d'origine BCC",
                    org: "Bureau de Conformité Café-Cacao",
                    detail: "Délai : 24h",
                  },
                  {
                    icon: "📋",
                    titre: "Lettre de crédit SWIFT",
                    org: "BICICI Trade Finance",
                    detail: "Documents requis",
                  },
                ].map((g) => (
                  <div
                    key={g.titre}
                    className="rounded-2xl border border-gray-100 bg-white p-5 flex gap-3 hover:border-green-200 hover:bg-green-50/30 cursor-pointer transition"
                  >
                    <span className="text-2xl">{g.icon}</span>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{g.titre}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{g.org}</p>
                      <span className="mt-1 inline-block text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                        {g.detail}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contacts utiles */}
            <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100">
                <h2 className="text-sm font-bold text-gray-900">Contacts utiles</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-[#F8FBF8]">
                      <th className="text-left px-4 py-2.5 font-semibold text-gray-600">Institution</th>
                      <th className="text-left px-4 py-2.5 font-semibold text-gray-600">Contact</th>
                      <th className="text-left px-4 py-2.5 font-semibold text-gray-600">Téléphone</th>
                      <th className="text-left px-4 py-2.5 font-semibold text-gray-600">Délai</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { inst: "DGD Abidjan (Douanes)", contact: "Service CEPICI", tel: "+225 27 20 25 40 00", delai: "24h DAE" },
                      { inst: "DPV Abidjan (Phyto)", contact: "Bureau certificats", tel: "+225 27 20 21 18 00", delai: "48h" },
                      { inst: "BCC Abidjan", contact: "Guichet conformité", tel: "+225 27 20 21 29 00", delai: "24h" },
                      { inst: "BICICI Trade Finance", contact: "M. Koné", tel: "+225 27 20 20 16 00", delai: "Sur RDV" },
                      { inst: "MSC Lines CI", contact: "Agent maritime", tel: "+225 27 20 21 20 00", delai: "Sur RDV" },
                    ].map((c, i) => (
                      <tr key={c.inst} className={`border-t border-gray-50 ${i % 2 === 0 ? "" : "bg-gray-50/40"}`}>
                        <td className="px-4 py-2.5 font-medium text-gray-800">{c.inst}</td>
                        <td className="px-4 py-2.5 text-gray-700">{c.contact}</td>
                        <td className="px-4 py-2.5">
                          <a
                            href={`tel:${c.tel.replace(/\s/g, "")}`}
                            className="flex items-center gap-1 text-[#2E7D32] hover:underline font-mono"
                          >
                            <Phone size={11} /> {c.tel}
                          </a>
                        </td>
                        <td className="px-4 py-2.5">
                          <span className="bg-blue-50 text-blue-700 text-xs px-2 py-0.5 rounded-full">{c.delai}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Délais douaniers */}
            <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
                <FileText size={14} className="text-[#2E7D32]" />
                <h2 className="text-sm font-bold text-gray-900">Délais douaniers moyens 2025</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-[#F8FBF8]">
                      {["Étape", "Délai moyen", "Meilleur", "Pire"].map((h) => (
                        <th key={h} className="text-left px-4 py-2.5 font-semibold text-gray-600">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { etape: "DAE DGD", moy: "18h", best: "6h", worst: "36h" },
                      { etape: "Certificat phyto", moy: "32h", best: "24h", worst: "48h" },
                      { etape: "Certificat BCC", moy: "20h", best: "12h", worst: "48h" },
                      { etape: "Prise en charge conteneur", moy: "6h", best: "3h", worst: "12h" },
                      { etape: "Total procédure export", moy: "4,2j", best: "2j", worst: "7j" },
                    ].map((r, i) => (
                      <tr
                        key={r.etape}
                        className={`border-t border-gray-50 ${
                          r.etape.startsWith("Total") ? "bg-green-50/40 font-semibold" : i % 2 === 0 ? "" : "bg-gray-50/40"
                        }`}
                      >
                        <td className="px-4 py-2.5 text-gray-800">{r.etape}</td>
                        <td className="px-4 py-2.5 font-mono text-gray-900 font-semibold">{r.moy}</td>
                        <td className="px-4 py-2.5 font-mono text-green-700">{r.best}</td>
                        <td className="px-4 py-2.5 font-mono text-orange-600">{r.worst}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
