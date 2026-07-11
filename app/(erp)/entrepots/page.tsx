"use client";

import {
  AlertTriangle,
  Package,
  Thermometer,
  TrendingUp,
  Warehouse,
} from "lucide-react";
import { useState } from "react";
import Topbar from "../../components/Topbar";

// ─── Types ───────────────────────────────────────────────────────────────────

type Onglet = "overview" | "entrepot-a" | "entrepot-b" | "entrepot-frais";

interface Lot {
  ref: string;
  produit: string;
  emplacement: string;
  qte: string;
  entree: string;
  sortie: string;
  humidite: string;
  statut: string;
  statutColor: string;
}

// ─── Lots Entrepôt A ─────────────────────────────────────────────────────────

const lotsA: Lot[] = [
  { ref: "LOT-043", produit: "Cacao Grade AA", emplacement: "Zone 1-A1", qte: "5 200 kg", entree: "05/07", sortie: "22/07 (export)", humidite: "7,2%", statut: "Prêt export", statutColor: "#2E7D32" },
  { ref: "LOT-042", produit: "Cacao Grade AA", emplacement: "Zone 1-A2", qte: "4 680 kg", entree: "03/07", sortie: "22/07 (export)", humidite: "7,6%", statut: "Prêt export", statutColor: "#2E7D32" },
  { ref: "LOT-041", produit: "Cacao Grade A", emplacement: "Zone 3-B1", qte: "2 570 kg", entree: "01/07", sortie: "Stock", humidite: "7,8%", statut: "Stockage", statutColor: "#1565C0" },
  { ref: "LOT-038", produit: "Anacarde WW240", emplacement: "Zone 2-C1", qte: "4 200 kg", entree: "25/06", sortie: "05/08 (export)", humidite: "9,2%", statut: "En attente export", statutColor: "#E65100" },
  { ref: "LOT-036", produit: "Anacarde WW240", emplacement: "Zone 2-C2", qte: "4 220 kg", entree: "20/06", sortie: "05/08 (export)", humidite: "9,6%", statut: "En attente export", statutColor: "#E65100" },
  { ref: "LOT-035", produit: "Cacao Grade B", emplacement: "Zone 3-B2", qte: "1 710 kg", entree: "18/06", sortie: "Marché local", humidite: "8,1%", statut: "Disponible vente", statutColor: "#00695C" },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function EntrepotsPage() {
  const [onglet, setOnglet] = useState<Onglet>("overview");

  const onglets: { id: Onglet; label: string }[] = [
    { id: "overview", label: "Vue d'ensemble" },
    { id: "entrepot-a", label: "Entrepôt A" },
    { id: "entrepot-b", label: "Entrepôt B" },
    { id: "entrepot-frais", label: "Entrepôt Frais" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Topbar title="Entrepôts & Stockage" breadcrumb={["Logistique", "Entrepôts"]} />

      <main className="flex-1 p-6 space-y-5">

        {/* ── KPI ─────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
          {[
            { label: "Entrepôts actifs", value: "3", sub: "Opérationnels", icon: <Warehouse size={18} />, iconBg: "#E8F5E9", iconColor: "#2E7D32" },
            { label: "Taux remplissage moyen", value: "68%", sub: "Sur 3 entrepôts", icon: <TrendingUp size={18} />, iconBg: "#E3F2FD", iconColor: "#1565C0" },
            { label: "Volume stocké", value: "24,2 t", sub: "Total entreposé", icon: <Package size={18} />, iconBg: "#FFF3E0", iconColor: "#E65100" },
            { label: "Valeur du stock", value: "22,7 M XOF", sub: "Estimation marché", icon: <TrendingUp size={18} />, iconBg: "#F3E5F5", iconColor: "#6A1B9A" },
          ].map((k) => (
            <div key={k.label} className="rounded-2xl border border-gray-100 bg-white px-5 py-4 flex items-center gap-4">
              <span className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: k.iconBg, color: k.iconColor }}>
                {k.icon}
              </span>
              <div>
                <p className="text-xl font-bold text-gray-900 leading-none">{k.value}</p>
                <p className="text-xs font-semibold text-gray-700 mt-0.5">{k.label}</p>
                <p className="text-[11px] text-gray-400">{k.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Onglets ──────────────────────────────────────────────────────── */}
        <div className="flex gap-1 bg-white rounded-xl p-1 border border-gray-100 w-fit">
          {onglets.map((o) => (
            <button
              key={o.id}
              onClick={() => setOnglet(o.id)}
              className="px-4 py-2 rounded-lg text-xs font-medium transition-colors"
              style={onglet === o.id ? { background: "#2E7D32", color: "#fff" } : { color: "#616161" }}
            >
              {o.label}
            </button>
          ))}
        </div>

        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* VUE D'ENSEMBLE                                                      */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        {onglet === "overview" && (
          <div className="space-y-4">

            {/* Entrepôt A */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-gray-900">Entrepôt A — Cacao & Anacarde Premium</h3>
                  <p className="text-xs text-gray-500 mt-0.5">Surface : 800 m² · Capacité : 40 t</p>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-green-100 text-green-700">Actif</span>
              </div>

              {/* Barre */}
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-gray-500">Stock actuel : <strong className="text-gray-800">28,4 t</strong></span>
                  <span className="font-bold" style={{ color: "#2E7D32" }}>71%</span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: "71%", background: "#4CAF50" }} />
                </div>
              </div>

              {/* Conditions */}
              <div className="flex gap-4 text-xs text-gray-600">
                <div className="flex items-center gap-1"><Thermometer size={13} style={{ color: "#E65100" }} /> T° 24-26°C</div>
                <div>Humidité 55-65%</div>
                <div>Aération naturelle + ventilateurs</div>
              </div>

              {/* Zones */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { zone: "Zone 1", label: "Cacao Grade AA", kg: "12 450 kg", color: "#1B5E20", bg: "#E8F5E9" },
                  { zone: "Zone 2", label: "Anacarde WW240", kg: "8 420 kg", color: "#1565C0", bg: "#E3F2FD" },
                  { zone: "Zone 3", label: "Cacao Grade A/B", kg: "4 280 kg", color: "#4CAF50", bg: "#F1F8E9" },
                  { zone: "Zone 4", label: "Disponible", kg: "3 250 kg libres", color: "#9E9E9E", bg: "#F5F5F5" },
                ].map((z) => (
                  <div key={z.zone} className="rounded-xl p-3 text-center" style={{ background: z.bg }}>
                    <p className="text-[10px] font-bold" style={{ color: z.color }}>{z.zone}</p>
                    <p className="text-xs text-gray-700 mt-1">{z.label}</p>
                    <p className="text-xs font-semibold mt-1" style={{ color: z.color }}>{z.kg}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Entrepôt B */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-gray-900">Entrepôt B — Céréales & Produits divers</h3>
                  <p className="text-xs text-gray-500 mt-0.5">Surface : 400 m² · Capacité : 20 t</p>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-green-100 text-green-700">Actif</span>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-gray-500">Stock actuel : <strong className="text-gray-800">6 200 kg</strong></span>
                  <span className="font-bold text-amber-600">31%</span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: "31%", background: "#F59E0B" }} />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Riz blanchi", kg: "1 458 kg", bg: "#FFF8E1", color: "#F9A825" },
                  { label: "Maïs", kg: "2 840 kg", bg: "#FFF3E0", color: "#E65100" },
                  { label: "Emballages & intrants", kg: "1 902 kg", bg: "#F5F5F5", color: "#757575" },
                ].map((z) => (
                  <div key={z.label} className="rounded-xl p-3 text-center" style={{ background: z.bg }}>
                    <p className="text-xs text-gray-700">{z.label}</p>
                    <p className="text-xs font-bold mt-1" style={{ color: z.color }}>{z.kg}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Entrepôt Frais */}
            <div className="rounded-2xl border border-orange-200 bg-white p-5 space-y-4" style={{ borderColor: "#FFCCBC" }}>
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-gray-900">Entrepôt Frais — Produits périssables</h3>
                    <AlertTriangle size={16} style={{ color: "#E65100" }} />
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">Surface : 100 m² (chambre froide 60 m² + sas 40 m²) · Capacité : 5 t</p>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-orange-100 text-orange-700">⚠️ Presque plein</span>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-gray-500">Stock actuel : <strong className="text-gray-800">4 520 kg</strong></span>
                  <span className="font-bold text-orange-600">90%</span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: "90%", background: "#E65100" }} />
                </div>
              </div>

              <div className="flex gap-4 text-xs text-gray-600">
                <div className="flex items-center gap-1"><Thermometer size={13} style={{ color: "#1565C0" }} /> T° 8-12°C</div>
                <div>Humidité 85-90%</div>
              </div>

              <div className="rounded-xl p-4 text-center" style={{ background: "#FFF3E0" }}>
                <p className="text-xs text-gray-700 font-medium">Bananiers plantain</p>
                <p className="text-sm font-bold mt-1" style={{ color: "#E65100" }}>4 520 kg</p>
                <p className="text-[11px] text-orange-500 mt-1">⚠️ Priorité évacuation — Presque plein</p>
              </div>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* ENTREPÔT A                                                          */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        {onglet === "entrepot-a" && (
          <div className="space-y-5">

            {/* Plan SVG */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5">
              <h2 className="font-bold text-gray-900 mb-4">Plan schématique — Entrepôt A (800 m²)</h2>

              <div className="overflow-x-auto">
                <svg viewBox="0 0 720 320" className="w-full max-w-2xl" style={{ minWidth: 480 }}>
                  {/* Contour global */}
                  <rect x="20" y="20" width="680" height="280" rx="8" fill="none" stroke="#D1D5DB" strokeWidth="2" />

                  {/* Porte */}
                  <rect x="335" y="285" width="50" height="15" rx="3" fill="#9E9E9E" />
                  <text x="360" y="295" textAnchor="middle" fontSize="9" fill="#fff" fontWeight="bold">ENTRÉE</text>

                  {/* Allée centrale */}
                  <rect x="330" y="20" width="60" height="265" fill="#F9FAFB" stroke="#E5E7EB" strokeWidth="1" strokeDasharray="5,3" />
                  <text x="360" y="165" textAnchor="middle" fontSize="9" fill="#9CA3AF" transform="rotate(-90, 360, 165)">ALLÉE CENTRALE</text>

                  {/* Zone 1 — Cacao AA (vert foncé) */}
                  <rect x="30" y="30" width="290" height="130" rx="6" fill="#C8E6C9" stroke="#2E7D32" strokeWidth="1.5" />
                  <text x="175" y="80" textAnchor="middle" fontSize="11" fill="#1B5E20" fontWeight="bold">Zone 1</text>
                  <text x="175" y="96" textAnchor="middle" fontSize="10" fill="#2E7D32">Cacao Grade AA</text>
                  <text x="175" y="112" textAnchor="middle" fontSize="11" fill="#1B5E20" fontWeight="bold">12 450 kg</text>

                  {/* Zone 2 — Anacarde (bleu) */}
                  <rect x="400" y="30" width="290" height="130" rx="6" fill="#BBDEFB" stroke="#1565C0" strokeWidth="1.5" />
                  <text x="545" y="80" textAnchor="middle" fontSize="11" fill="#0D47A1" fontWeight="bold">Zone 2</text>
                  <text x="545" y="96" textAnchor="middle" fontSize="10" fill="#1565C0">Anacarde WW240</text>
                  <text x="545" y="112" textAnchor="middle" fontSize="11" fill="#0D47A1" fontWeight="bold">8 420 kg</text>

                  {/* Zone 3 — Cacao A/B (vert clair) */}
                  <rect x="30" y="170" width="290" height="115" rx="6" fill="#DCEDC8" stroke="#558B2F" strokeWidth="1.5" />
                  <text x="175" y="220" textAnchor="middle" fontSize="11" fill="#33691E" fontWeight="bold">Zone 3</text>
                  <text x="175" y="236" textAnchor="middle" fontSize="10" fill="#558B2F">Cacao Grade A/B</text>
                  <text x="175" y="252" textAnchor="middle" fontSize="11" fill="#33691E" fontWeight="bold">4 280 kg</text>

                  {/* Zone 4 — Disponible (gris pointillé) */}
                  <rect x="400" y="170" width="290" height="115" rx="6" fill="#F9FAFB" stroke="#9CA3AF" strokeWidth="1.5" strokeDasharray="6,3" />
                  <text x="545" y="220" textAnchor="middle" fontSize="11" fill="#6B7280" fontWeight="bold">Zone 4</text>
                  <text x="545" y="236" textAnchor="middle" fontSize="10" fill="#9CA3AF">Disponible</text>
                  <text x="545" y="252" textAnchor="middle" fontSize="11" fill="#6B7280" fontWeight="bold">3 250 kg libres</text>
                </svg>
              </div>

              {/* Légende */}
              <div className="flex flex-wrap gap-4 mt-4 text-xs">
                {[
                  { color: "#C8E6C9", border: "#2E7D32", label: "Zone 1 — Cacao Grade AA" },
                  { color: "#BBDEFB", border: "#1565C0", label: "Zone 2 — Anacarde WW240" },
                  { color: "#DCEDC8", border: "#558B2F", label: "Zone 3 — Cacao A/B" },
                  { color: "#F9FAFB", border: "#9CA3AF", label: "Zone 4 — Disponible", dash: true },
                ].map((l) => (
                  <div key={l.label} className="flex items-center gap-2">
                    <span
                      className="w-5 h-5 rounded shrink-0"
                      style={{ background: l.color, border: `2px ${l.dash ? "dashed" : "solid"} ${l.border}` }}
                    />
                    <span className="text-gray-600">{l.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tableau des lots */}
            <div className="rounded-2xl border border-gray-100 bg-white">
              <div className="px-5 py-4 border-b border-gray-100">
                <h2 className="font-bold text-gray-900">Lots stockés — Entrepôt A</h2>
                <p className="text-xs text-gray-400 mt-0.5">{lotsA.length} lots en cours de stockage</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr style={{ background: "#F8FBF8" }}>
                      {["Lot", "Produit", "Emplacement", "Quantité", "Date entrée", "Sortie prévue", "Humidité", "Statut"].map((h) => (
                        <th key={h} className="text-left text-gray-500 font-semibold px-4 py-3 whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {lotsA.map((lot) => (
                      <tr key={lot.ref} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 font-mono font-semibold text-gray-700 whitespace-nowrap">{lot.ref}</td>
                        <td className="px-4 py-3 text-gray-800 whitespace-nowrap">{lot.produit}</td>
                        <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{lot.emplacement}</td>
                        <td className="px-4 py-3 font-semibold text-gray-800 whitespace-nowrap tabular-nums">{lot.qte}</td>
                        <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{lot.entree}</td>
                        <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{lot.sortie}</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className="flex items-center gap-1 text-green-600 font-medium">
                            {lot.humidite} <span className="text-green-500">✓</span>
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span
                            className="text-[10px] font-semibold px-2 py-0.5 rounded-full text-white"
                            style={{ background: lot.statutColor }}
                          >
                            {lot.statut}
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

        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* ENTREPÔT B                                                          */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        {onglet === "entrepot-b" && (
          <div className="rounded-2xl border border-gray-100 bg-white p-5 space-y-5">
            <div>
              <h2 className="font-bold text-gray-900">Entrepôt B — Céréales & Produits divers</h2>
              <p className="text-xs text-gray-500 mt-0.5">Surface : 400 m² · Capacité : 20 t · Taux de remplissage : 31%</p>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-2">
                <span className="text-gray-500">Stock actuel : <strong>6 200 kg</strong></span>
                <span className="font-bold text-amber-600">31% · Capacité disponible : 13 800 kg</span>
              </div>
              <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{ width: "31%", background: "#F59E0B" }} />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: "Riz blanchi", kg: "1 458 kg", pct: "7%", color: "#F9A825", bg: "#FFF8E1" },
                { label: "Maïs", kg: "2 840 kg", pct: "14%", color: "#E65100", bg: "#FFF3E0" },
                { label: "Emballages & intrants", kg: "1 902 kg", pct: "10%", color: "#757575", bg: "#F5F5F5" },
              ].map((z) => (
                <div key={z.label} className="rounded-xl p-4" style={{ background: z.bg }}>
                  <p className="text-xs font-semibold text-gray-700">{z.label}</p>
                  <p className="text-lg font-bold mt-1" style={{ color: z.color }}>{z.kg}</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">{z.pct} de la capacité totale</p>
                </div>
              ))}
            </div>

            <div className="rounded-xl p-4 bg-blue-50 border border-blue-100 text-xs text-blue-700">
              <strong>Capacité disponible :</strong> 13 800 kg — Entrepôt sous-utilisé. Possibilité de transfert depuis l&apos;Entrepôt Frais (⚠️ saturé).
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* ENTREPÔT FRAIS                                                      */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        {onglet === "entrepot-frais" && (
          <div className="rounded-2xl border border-gray-100 bg-white p-5 space-y-5">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-bold text-gray-900">Entrepôt Frais — Produits périssables</h2>
                  <AlertTriangle size={16} style={{ color: "#E65100" }} />
                </div>
                <p className="text-xs text-gray-500 mt-0.5">Chambre froide 60 m² + sas 40 m² · Capacité : 5 t</p>
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-orange-100 text-orange-700">⚠️ 90% — Priorité évacuation</span>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-2">
                <span className="text-gray-500">Stock : <strong>4 520 kg / 5 000 kg</strong></span>
                <span className="font-bold text-orange-600">90%</span>
              </div>
              <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{ width: "90%", background: "#E65100" }} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl p-4 bg-blue-50 border border-blue-100">
                <div className="flex items-center gap-2 mb-1">
                  <Thermometer size={15} style={{ color: "#1565C0" }} />
                  <span className="text-xs font-semibold text-blue-700">Température</span>
                </div>
                <p className="text-lg font-bold text-blue-900">8 – 12 °C</p>
                <p className="text-[11px] text-blue-600 mt-1">Conforme</p>
              </div>
              <div className="rounded-xl p-4 bg-cyan-50 border border-cyan-100">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-semibold text-cyan-700">Humidité</span>
                </div>
                <p className="text-lg font-bold text-cyan-900">85 – 90 %</p>
                <p className="text-[11px] text-cyan-600 mt-1">Conforme</p>
              </div>
            </div>

            <div className="rounded-xl p-4" style={{ background: "#FFF3E0" }}>
              <p className="text-xs font-bold text-orange-800 mb-1">Contenu actuel</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-800">Bananiers plantain</p>
                  <p className="text-xs text-gray-500 mt-0.5">Lot unique — en attente d&apos;expédition</p>
                </div>
                <p className="text-xl font-bold" style={{ color: "#E65100" }}>4 520 kg</p>
              </div>
            </div>

            <div className="rounded-xl p-4 border border-orange-200 bg-orange-50 text-xs text-orange-800">
              <strong>Action requise :</strong> L&apos;entrepôt frais est à 90% de capacité. Planifier une évacuation urgente ou un transfert des bananiers avant toute nouvelle entrée de produits périssables. Capacité résiduelle : <strong>480 kg</strong>.
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
