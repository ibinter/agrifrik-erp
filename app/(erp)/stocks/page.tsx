"use client";

import { useState } from "react";
import Topbar from "../../components/Topbar";
import {
  Plus,
  Package,
  AlertTriangle,
  ArrowUpDown,
  TrendingUp,
  TrendingDown,
  RotateCcw,
  Download,
} from "lucide-react";
import ModalDepenseStock from "../../components/modals/ModalDepenseStock";

/* ─── KPIs ─────────────────────────────────────────────────────────────── */
const kpis = [
  { label: "Valeur totale stock", value: "22,7 M XOF", sub: "valorisation CMUP", icon: Package, color: "#2E7D32", bg: "#E8F5E9" },
  { label: "Lots en stock", value: "12", sub: "toutes catégories", icon: TrendingUp, color: "#1565C0", bg: "#E3F2FD" },
  { label: "Alerte stock critique", value: "2", sub: "action requise", icon: AlertTriangle, color: "#B71C1C", bg: "#FFEBEE" },
  { label: "Rotation stock", value: "4,2×/an", sub: "vs 3,8× l'an dernier", icon: RotateCcw, color: "#6A1B9A", bg: "#F3E5F5" },
  { label: "Perte & Casse", value: "0,8%", sub: "de la valeur totale", icon: TrendingDown, color: "#E65100", bg: "#FFF3E0" },
];

/* ─── Mouvements récents ─────────────────────────────────────────────────── */
type MvtType = "Entrée" | "Sortie" | "Ajust.";

interface Mouvement {
  date: string;
  type: MvtType;
  lot: string;
  produit: string;
  qte: string;
  entrepot: string;
  operateur: string;
  reference: string;
}

const mouvements: Mouvement[] = [
  { date: "09/07", type: "Entrée", lot: "LOT-052", produit: "Cacao (fermentation)", qte: "+680 kg", entrepot: "Bac A1", operateur: "Ibrahim S.", reference: "Reçu" },
  { date: "09/07", type: "Sortie", lot: "LOT-048", produit: "Cacao Grade A → Séchage", qte: "−480 kg", entrepot: "Séchoir A", operateur: "Ibrahim S.", reference: "Bon sortie" },
  { date: "08/07", type: "Entrée", lot: "LOT-051", produit: "Cacao récolte PAR-A3", qte: "+820 kg", entrepot: "Bac C1", operateur: "Ibrahim S.", reference: "Reçu" },
  { date: "07/07", type: "Sortie", lot: "LOT-043", produit: "Cacao AA → Export", qte: "−5 200 kg", entrepot: "Entrepôt A Z1", operateur: "Bamba O.", reference: "LIV-2025-148" },
  { date: "06/07", type: "Entrée", lot: "Emballages", produit: "Sacs jute 65 kg", qte: "+50 pcs", entrepot: "Entrepôt B", operateur: "Bamba O.", reference: "BC-2025-082" },
  { date: "05/07", type: "Sortie", lot: "NPK 20-10-10", produit: "Engrais PAR-A3", qte: "−85 kg", entrepot: "Magasin intrants", operateur: "Ibrahim S.", reference: "Bon int." },
  { date: "04/07", type: "Entrée", lot: "LOT-049", produit: "Cacao récolte", qte: "+720 kg", entrepot: "Bac B2", operateur: "Ibrahim S.", reference: "Reçu" },
  { date: "03/07", type: "Ajust.", lot: "LOT-032", produit: "Anacarde WW240 — NC humidité", qte: "−0 (bloqué)", entrepot: "Entrepôt A Z2", operateur: "Konan Y.", reference: "NC-2025-003" },
  { date: "02/07", type: "Sortie", lot: "Gasoil", produit: "Carburant tracteur", qte: "−60 L", entrepot: "Cuve", operateur: "Bamba O.", reference: "Bon carb." },
  { date: "01/07", type: "Entrée", lot: "LOT-048", produit: "Cacao récolte PAR-A1", qte: "+480 kg", entrepot: "Bac B1", operateur: "Ibrahim S.", reference: "Reçu" },
];

/* ─── Stock par produit ──────────────────────────────────────────────────── */
interface StockProduit {
  ref: string;
  produit: string;
  lot: string;
  entrepot: string;
  qte: number;
  unite: string;
  capacite: number;
  valeur: string;
  statut: "Normal" | "Critique" | "Bloqué";
}

const stocksProduits: StockProduit[] = [
  { ref: "PRD-001", produit: "Cacao Grade AA", lot: "LOT-043 à 052", entrepot: "Entrepôt A Z1", qte: 14200, unite: "kg", capacite: 20000, valeur: "15 052 000", statut: "Normal" },
  { ref: "PRD-002", produit: "Cacao Grade A", lot: "LOT-048, 051", entrepot: "Entrepôt A Z2", qte: 3840, unite: "kg", capacite: 10000, valeur: "3 916 800", statut: "Normal" },
  { ref: "PRD-003", produit: "Cacao en fermentation", lot: "LOT-052", entrepot: "Bac A1 / C1", qte: 1500, unite: "kg", capacite: 5000, valeur: "—", statut: "Normal" },
  { ref: "PRD-004", produit: "Anacarde WW240", lot: "LOT-032", entrepot: "Entrepôt A Z2", qte: 2100, unite: "kg", capacite: 5000, valeur: "1 344 000", statut: "Bloqué" },
  { ref: "PRD-005", produit: "Anacarde brut", lot: "LOT-029, 030", entrepot: "Entrepôt B Korhogo", qte: 4800, unite: "kg", capacite: 10000, valeur: "2 400 000", statut: "Normal" },
  { ref: "INT-001", produit: "Engrais NPK 20-10-10", lot: "—", entrepot: "Magasin intrants", qte: 380, unite: "kg", capacite: 1000, valeur: "228 000", statut: "Normal" },
  { ref: "INT-009", produit: "Furadan 5G", lot: "—", entrepot: "Magasin intrants", qte: 0, unite: "kg", capacite: 500, valeur: "0", statut: "Critique" },
  { ref: "MAT-001", produit: "Gasoil (cuve fermée)", lot: "—", entrepot: "Citerne principale", qte: 840, unite: "L", capacite: 2000, valeur: "840 000", statut: "Normal" },
];

/* ─── CMUP ───────────────────────────────────────────────────────────────── */
const cmup = [
  { produit: "Cacao Grade AA", cmup: "1 060 XOF/kg", stock: "14 200 kg", valeur: "15 052 000 XOF", evolution: "+2,3%" },
  { produit: "Cacao Grade A", cmup: "1 020 XOF/kg", stock: "3 840 kg", valeur: "3 916 800 XOF", evolution: "+1,8%" },
  { produit: "Anacarde WW240", cmup: "640 XOF/kg", stock: "2 100 kg", valeur: "1 344 000 XOF", evolution: "−0,5%" },
  { produit: "Anacarde brut", cmup: "500 XOF/kg", stock: "4 800 kg", valeur: "2 400 000 XOF", evolution: "+0,8%" },
];

/* ─── Barre de progression ───────────────────────────────────────────────── */
function ProgressBar({ pct, color }: { pct: number; color: string }) {
  return (
    <div className="h-1.5 rounded-full bg-gray-100 w-24 overflow-hidden">
      <div className="h-full rounded-full transition-all" style={{ width: `${Math.min(pct, 100)}%`, backgroundColor: color }} />
    </div>
  );
}

/* ─── Type badge ─────────────────────────────────────────────────────────── */
function MvtBadge({ type }: { type: MvtType }) {
  const cfg =
    type === "Entrée" ? { bg: "#E8F5E9", color: "#2E7D32", icon: "↑" } :
    type === "Sortie" ? { bg: "#FFEBEE", color: "#B71C1C", icon: "↓" } :
                        { bg: "#FFF3E0", color: "#E65100", icon: "⇄" };
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold whitespace-nowrap"
      style={{ backgroundColor: cfg.bg, color: cfg.color }}>
      {cfg.icon} {type}
    </span>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────────── */
const TABS = ["Stock par produit", "Mouvements récents", "Valorisation CMUP"] as const;
type Tab = typeof TABS[number];

export default function StocksPage() {
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("Stock par produit");

  return (
    <div>
      <Topbar title="Gestion des Stocks" breadcrumb={["Logistique", "Stocks"]} />

      <div className="p-6 space-y-6">
        {/* KPIs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {kpis.map((k) => {
            const Icon = k.icon;
            return (
              <div key={k.label} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: k.bg }}>
                  <Icon size={18} color={k.color} strokeWidth={1.8} />
                </div>
                <div className="text-xl font-bold text-gray-900 leading-tight">{k.value}</div>
                <div className="text-xs font-medium text-gray-700 mt-0.5">{k.label}</div>
                <div className="text-xs text-gray-400">{k.sub}</div>
              </div>
            );
          })}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
          {/* Tab bar + actions */}
          <div className="flex items-center justify-between border-b border-gray-100 pr-4 flex-wrap gap-2">
            <div className="flex overflow-x-auto">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="px-5 py-3.5 text-sm font-medium whitespace-nowrap transition-colors"
                  style={
                    activeTab === tab
                      ? { color: "#2E7D32", borderBottom: "2px solid #2E7D32" }
                      : { color: "#6B7280", borderBottom: "2px solid transparent" }
                  }
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 py-2">
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-200 text-xs text-gray-600 hover:bg-gray-50">
                <ArrowUpDown size={13} /> Filtrer
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-200 text-xs text-gray-600 hover:bg-gray-50">
                <Download size={13} /> Export
              </button>
              <button
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-white"
                style={{ backgroundColor: "#2E7D32" }}
              >
                <Plus size={13} /> Entrée stock
              </button>
              <button
                onClick={() => setShowModal(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-white"
                style={{ backgroundColor: "#1565C0" }}
              >
                <Plus size={13} /> Mouvement
              </button>
            </div>
          </div>

          {/* ── Stock par produit ── */}
          {activeTab === "Stock par produit" && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ backgroundColor: "#F8FBF8" }}>
                    {["Réf.", "Produit", "Lot(s)", "Entrepôt", "Quantité", "Capacité utilisée", "Valeur (XOF)", "Statut"].map((h) => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {stocksProduits.map((s) => {
                    const pct = Math.round((s.qte / s.capacite) * 100);
                    const barColor =
                      s.statut === "Critique" ? "#B71C1C" :
                      s.statut === "Bloqué"   ? "#E65100" :
                      pct > 80               ? "#1565C0" : "#2E7D32";
                    const badgeCfg =
                      s.statut === "Critique" ? { bg: "#FFEBEE", color: "#B71C1C" } :
                      s.statut === "Bloqué"   ? { bg: "#FFF3E0", color: "#E65100" } :
                                                { bg: "#E8F5E9", color: "#2E7D32" };
                    return (
                      <tr key={s.ref} className="hover:bg-gray-50 cursor-pointer transition-colors">
                        <td className="px-4 py-3 text-xs font-mono text-gray-500">{s.ref}</td>
                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap flex items-center gap-2">
                          <Package size={14} className="text-gray-400 shrink-0" />
                          {s.produit}
                        </td>
                        <td className="px-4 py-3 text-xs text-gray-500 font-mono whitespace-nowrap">{s.lot}</td>
                        <td className="px-4 py-3 text-xs text-gray-500 whitespace-nowrap">{s.entrepot}</td>
                        <td className="px-4 py-3 text-sm font-semibold text-gray-900 whitespace-nowrap">
                          {s.qte.toLocaleString()} {s.unite}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <ProgressBar pct={pct} color={barColor} />
                            <span className="text-xs text-gray-400 whitespace-nowrap">{pct}%</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-xs text-gray-700 whitespace-nowrap">{s.valeur}</td>
                        <td className="px-4 py-3">
                          <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium w-fit whitespace-nowrap"
                            style={{ backgroundColor: badgeCfg.bg, color: badgeCfg.color }}>
                            {s.statut === "Critique" && <AlertTriangle size={10} />}
                            {s.statut}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* ── Mouvements récents ── */}
          {activeTab === "Mouvements récents" && (
            <div>
              <div className="flex items-center justify-between p-5 border-b border-gray-50 flex-wrap gap-2">
                <h2 className="font-semibold text-gray-900 text-sm">Mouvements récents — Juillet 2025</h2>
                <div className="flex gap-3 text-xs text-gray-500">
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: "#2E7D32" }} /> Entrée</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: "#B71C1C" }} /> Sortie</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: "#E65100" }} /> Ajustement</span>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ backgroundColor: "#F8FBF8" }}>
                      {["Date", "Type", "Lot", "Produit", "Qté", "Entrepôt", "Opérateur", "Référence"].map((h) => (
                        <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {mouvements.map((m, i) => (
                      <tr key={i} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 text-xs font-mono text-gray-500 whitespace-nowrap">{m.date}</td>
                        <td className="px-4 py-3"><MvtBadge type={m.type} /></td>
                        <td className="px-4 py-3 text-xs font-mono text-gray-400 whitespace-nowrap">{m.lot}</td>
                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap text-xs">{m.produit}</td>
                        <td className="px-4 py-3 text-xs font-bold whitespace-nowrap"
                          style={{ color: m.type === "Entrée" ? "#2E7D32" : m.type === "Sortie" ? "#B71C1C" : "#E65100" }}>
                          {m.qte}
                        </td>
                        <td className="px-4 py-3 text-xs text-gray-500 whitespace-nowrap">{m.entrepot}</td>
                        <td className="px-4 py-3 text-xs text-gray-600 whitespace-nowrap">{m.operateur}</td>
                        <td className="px-4 py-3 text-xs font-mono text-gray-400 whitespace-nowrap">{m.reference}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── Valorisation CMUP ── */}
          {activeTab === "Valorisation CMUP" && (
            <div className="p-5 space-y-5">
              <div className="flex items-start justify-between flex-wrap gap-3">
                <div>
                  <h3 className="font-semibold text-gray-900">Valorisation CMUP — Coût Moyen Unitaire Pondéré</h3>
                  <p className="text-xs text-gray-500 mt-0.5">Mise à jour : 09/07/2025 — Campagne 2024/2025</p>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-200 text-xs text-gray-600 cursor-pointer hover:bg-gray-50">
                  <Download size={13} /> Télécharger rapport CMUP
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-2">
                {[
                  { label: "Cacao Grade AA", cmup: "1 060 XOF/kg", sub: "CMUP actuel" },
                  { label: "Cacao Grade A",  cmup: "1 020 XOF/kg", sub: "CMUP actuel" },
                  { label: "Anacarde WW240", cmup: "640 XOF/kg",   sub: "CMUP actuel" },
                ].map((c) => (
                  <div key={c.label} className="rounded-xl border border-gray-100 p-4 text-center">
                    <div className="text-xs text-gray-500 mb-1">{c.label}</div>
                    <div className="text-2xl font-bold" style={{ color: "#2E7D32" }}>{c.cmup}</div>
                    <div className="text-xs text-gray-400">{c.sub}</div>
                  </div>
                ))}
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ backgroundColor: "#F8FBF8" }}>
                      {["Produit", "CMUP", "Stock actuel", "Valeur totale", "Évolution vs mois préc."].map((h) => (
                        <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {cmup.map((row) => {
                      const isUp = row.evolution.startsWith("+");
                      return (
                        <tr key={row.produit} className="hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">{row.produit}</td>
                          <td className="px-4 py-3 text-sm font-bold whitespace-nowrap" style={{ color: "#2E7D32" }}>{row.cmup}</td>
                          <td className="px-4 py-3 text-xs text-gray-600 whitespace-nowrap">{row.stock}</td>
                          <td className="px-4 py-3 text-xs font-medium text-gray-800 whitespace-nowrap">{row.valeur}</td>
                          <td className="px-4 py-3">
                            <span className="flex items-center gap-1 text-xs font-medium"
                              style={{ color: isUp ? "#2E7D32" : "#B71C1C" }}>
                              {isUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                              {row.evolution}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                    {/* Total */}
                    <tr style={{ backgroundColor: "#F8FBF8" }}>
                      <td className="px-4 py-3 font-bold text-gray-900" colSpan={2}>TOTAL</td>
                      <td className="px-4 py-3 text-xs text-gray-600" />
                      <td className="px-4 py-3 text-sm font-bold" style={{ color: "#1B5E20" }}>22 712 800 XOF</td>
                      <td className="px-4 py-3" />
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="rounded-xl p-4" style={{ backgroundColor: "#F8FBF8", border: "1px solid #E5E7EB" }}>
                <p className="text-xs text-gray-500">
                  <strong className="text-gray-700">Méthode CMUP :</strong> Le coût moyen unitaire pondéré est recalculé à chaque entrée de stock.
                  La valorisation est utilisée pour les sorties de stock, les rapports financiers et le calcul des marges.
                  Tous les montants sont exprimés en XOF (Franc CFA BCEAO).
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <ModalDepenseStock isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}
