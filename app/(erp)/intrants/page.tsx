"use client";

import { useState } from "react";
import Topbar from "../../components/Topbar";
import {
  Package,
  TrendingDown,
  AlertTriangle,
  ShoppingCart,
  PiggyBank,
  Plus,
  Download,
} from "lucide-react";

/* ─── KPIs ─────────────────────────────────────────────────────────────── */
const kpis = [
  { label: "Références en stock", value: "24", sub: "intrants actifs", icon: Package, color: "#2E7D32", bg: "#E8F5E9" },
  { label: "Valeur totale", value: "8,4 M XOF", sub: "valorisation CMUP", icon: ShoppingCart, color: "#1565C0", bg: "#E3F2FD" },
  { label: "Articles critiques", value: "2", sub: "action requise", icon: AlertTriangle, color: "#B71C1C", bg: "#FFEBEE" },
  { label: "Consommation YTD", value: "18,4 M XOF", sub: "depuis janv. 2025", icon: TrendingDown, color: "#E65100", bg: "#FFF3E0" },
  { label: "Économies achats groupés", value: "2,1 M XOF", sub: "vs achats individuels", icon: PiggyBank, color: "#6A1B9A", bg: "#F3E5F5" },
];

/* ─── Données stock ──────────────────────────────────────────────────────── */
type Statut = "normal" | "critique" | "faible" | "rupture";

interface Intrant {
  ref: string;
  produit: string;
  categorie: string;
  fournisseur: string;
  stock: number | string;
  unite: string;
  valeur: string;
  seuilMin: number | string;
  seuilCommande: number | string;
  statut: Statut;
}

const intrants: Intrant[] = [
  // Engrais
  { ref: "INT-001", produit: "NPK 20-10-10", categorie: "Engrais", fournisseur: "YARA", stock: 380, unite: "kg", valeur: "228 000", seuilMin: 100, seuilCommande: 500, statut: "normal" },
  { ref: "INT-002", produit: "KCl 0-0-60", categorie: "Engrais", fournisseur: "YARA", stock: 45, unite: "kg", valeur: "36 000", seuilMin: 50, seuilCommande: 200, statut: "critique" },
  { ref: "INT-003", produit: "Urée 46% N", categorie: "Engrais", fournisseur: "YARA", stock: 124, unite: "kg", valeur: "74 400", seuilMin: 50, seuilCommande: 300, statut: "normal" },
  { ref: "INT-004", produit: "Sulfate Magnésie", categorie: "Engrais", fournisseur: "AGRIINTRANT", stock: 82, unite: "kg", valeur: "41 000", seuilMin: 20, seuilCommande: 100, statut: "normal" },
  { ref: "INT-005", produit: "Chaux agricole", categorie: "Engrais", fournisseur: "Local", stock: 240, unite: "kg", valeur: "24 000", seuilMin: 100, seuilCommande: 500, statut: "normal" },
  // Phytosanitaires
  { ref: "INT-006", produit: "Ridomil Gold (Métalaxyl)", categorie: "Phytosanitaire", fournisseur: "SYNGENTA", stock: 4.2, unite: "kg", valeur: "63 000", seuilMin: 2, seuilCommande: 10, statut: "normal" },
  { ref: "INT-007", produit: "Mancozèbe 80%", categorie: "Phytosanitaire", fournisseur: "SYNGENTA", stock: 8.4, unite: "kg", valeur: "42 000", seuilMin: 3, seuilCommande: 15, statut: "normal" },
  { ref: "INT-008", produit: "Cypermethrine 10%", categorie: "Phytosanitaire", fournisseur: "AGRIINTRANT", stock: 18, unite: "L", valeur: "36 000", seuilMin: 20, seuilCommande: 50, statut: "faible" },
  { ref: "INT-009", produit: "Furadan 5G", categorie: "Phytosanitaire", fournisseur: "FMC CI", stock: 0, unite: "kg", valeur: "0", seuilMin: 50, seuilCommande: 200, statut: "rupture" },
  { ref: "INT-010", produit: "Glyphosate 41%", categorie: "Phytosanitaire", fournisseur: "AGRIINTRANT", stock: 12, unite: "L", valeur: "18 000", seuilMin: 5, seuilCommande: 30, statut: "normal" },
  { ref: "INT-011", produit: "Soufre mouillable", categorie: "Phytosanitaire", fournisseur: "SYNGENTA", stock: 6.8, unite: "kg", valeur: "13 600", seuilMin: 2, seuilCommande: 10, statut: "normal" },
  // Emballages
  { ref: "INT-012", produit: "Sacs jute 65 kg", categorie: "Emballages", fournisseur: "CI Emballages", stock: 124, unite: "pièce", valeur: "620 000", seuilMin: 50, seuilCommande: 200, statut: "normal" },
  { ref: "INT-013", produit: "Sacs PP tissé blanc", categorie: "Emballages", fournisseur: "CI Emballages", stock: 84, unite: "pièce", valeur: "252 000", seuilMin: 30, seuilCommande: 150, statut: "normal" },
  { ref: "INT-014", produit: "Rubans PP d'emballage", categorie: "Emballages", fournisseur: "CI Emballages", stock: 8, unite: "rouleau", valeur: "24 000", seuilMin: 3, seuilCommande: 15, statut: "normal" },
  // Carburant
  { ref: "INT-015", produit: "Gasoil (cuve fermée)", categorie: "Carburant", fournisseur: "TOTAL Énergie", stock: 840, unite: "L", valeur: "840 000", seuilMin: 200, seuilCommande: 1000, statut: "normal" },
  { ref: "INT-016", produit: "Huile moteur 15W40", categorie: "Lubrifiants", fournisseur: "TOTAL", stock: 28, unite: "L", valeur: "56 000", seuilMin: 10, seuilCommande: 50, statut: "normal" },
];

const statutConfig: Record<Statut, { label: string; color: string; bg: string }> = {
  normal:   { label: "✅ Normal",   color: "#2E7D32", bg: "#E8F5E9" },
  critique: { label: "🔴 CRITIQUE", color: "#B71C1C", bg: "#FFEBEE" },
  faible:   { label: "🟡 Faible",   color: "#92400E", bg: "#FEF3C7" },
  rupture:  { label: "🔴 RUPTURE",  color: "#B71C1C", bg: "#FFEBEE" },
};

const catColors: Record<string, string> = {
  "Engrais":          "#E8F5E9",
  "Phytosanitaire":   "#FFF3E0",
  "Emballages":       "#E3F2FD",
  "Carburant":        "#FFF8E1",
  "Lubrifiants":      "#F3E5F5",
};

/* ─── Consommations ─────────────────────────────────────────────────────── */
const consoCultures = [
  { culture: "Cacao (toutes parcelles)", surface: "24,4 ha", npk: "1 684 kg", kcl: "284 kg", uree: "480 kg", phyto: "12,4 kg", eau: "145 000 m³", cout: "48 200 XOF/ha" },
  { culture: "Anacarde", surface: "14,8 ha", npk: "622 kg", kcl: "82 kg", uree: "142 kg", phyto: "4,2 kg", eau: "24 000 m³", cout: "28 400 XOF/ha" },
  { culture: "Cultures vivrières", surface: "12,2 ha", npk: "244 kg", kcl: "—", uree: "122 kg", phyto: "2,1 kg", eau: "12 000 m³", cout: "12 800 XOF/ha" },
];

const consoMensuelle = [
  { mois: "Jan", npk: 120, phyto: 8 },
  { mois: "Fév", npk: 95, phyto: 12 },
  { mois: "Mar", npk: 210, phyto: 18 },
  { mois: "Avr", npk: 340, phyto: 22 },
  { mois: "Mai", npk: 280, phyto: 15 },
  { mois: "Jun", npk: 190, phyto: 10 },
  { mois: "Jul", npk: 85, phyto: 8 },
  { mois: "Aoû", npk: 60, phyto: 5 },
  { mois: "Sep", npk: 140, phyto: 9 },
  { mois: "Oct", npk: 220, phyto: 14 },
  { mois: "Nov", npk: 180, phyto: 11 },
  { mois: "Déc", npk: 76, phyto: 6 },
];

/* ─── Commandes ──────────────────────────────────────────────────────────── */
const commandes = [
  { ref: "CMD-2025-041", date: "08/07/2025", produit: "Furadan 5G", fournisseur: "FMC CI", qte: "200 kg", montant: "320 000 XOF", delai: "7 j", statut: "Urgent" },
  { ref: "CMD-2025-040", date: "07/07/2025", produit: "KCl 0-0-60", fournisseur: "YARA Nederland", qte: "200 kg", montant: "160 000 XOF", delai: "18 j", statut: "En cours" },
  { ref: "CMD-2025-039", date: "05/07/2025", produit: "Cypermethrine 10%", fournisseur: "AGRIINTRANT", qte: "50 L", montant: "100 000 XOF", delai: "5 j", statut: "Planifié" },
  { ref: "CMD-2025-035", date: "28/06/2025", produit: "Sacs jute 65 kg", fournisseur: "CI Emballages", qte: "200 pcs", montant: "1 000 000 XOF", delai: "10 j", statut: "Livré" },
  { ref: "CMD-2025-030", date: "15/06/2025", produit: "NPK 20-10-10", fournisseur: "YARA", qte: "500 kg", montant: "300 000 XOF", delai: "—", statut: "Livré" },
];

/* ─── Homologations ──────────────────────────────────────────────────────── */
const homologations = [
  { ref: "INT-006", produit: "Ridomil Gold (Métalaxyl)", numHomol: "H-CI-2021-1842", validite: "31/12/2026", categorie: "Fongicide", classe: "II", epi: "Combinaison, gants, masque P2", delaiReentree: "48 h", delaiRecolte: "14 j" },
  { ref: "INT-007", produit: "Mancozèbe 80%", numHomol: "H-CI-2019-1104", validite: "31/12/2024", categorie: "Fongicide", classe: "III", epi: "Gants, masque, lunettes", delaiReentree: "24 h", delaiRecolte: "7 j" },
  { ref: "INT-008", produit: "Cypermethrine 10%", numHomol: "H-CI-2020-1553", validite: "30/06/2025", categorie: "Insecticide", classe: "II", epi: "Combinaison intégrale, masque filtrant", delaiReentree: "48 h", delaiRecolte: "21 j" },
  { ref: "INT-009", produit: "Furadan 5G", numHomol: "H-CI-2018-0892", validite: "31/12/2025", categorie: "Nématicide", classe: "Ib", epi: "Combinaison étanche, masque P3, gants nitrile", delaiReentree: "72 h", delaiRecolte: "30 j" },
  { ref: "INT-010", produit: "Glyphosate 41%", numHomol: "H-CI-2022-2014", validite: "31/12/2027", categorie: "Herbicide", classe: "III", epi: "Gants imperméables, masque, lunettes", delaiReentree: "6 h", delaiRecolte: "14 j" },
  { ref: "INT-011", produit: "Soufre mouillable", numHomol: "H-CI-2023-2201", validite: "31/12/2028", categorie: "Fongicide", classe: "U", epi: "Gants, lunettes", delaiReentree: "4 h", delaiRecolte: "3 j" },
];

/* ─── Chart SVG ──────────────────────────────────────────────────────────── */
function BarChartConso() {
  const maxNPK = Math.max(...consoMensuelle.map((d) => d.npk));
  const W = 700, H = 180, padL = 36, padB = 28, padT = 12, padR = 12;
  const innerW = W - padL - padR;
  const innerH = H - padB - padT;
  const barW = (innerW / consoMensuelle.length) * 0.4;
  const gap = innerW / consoMensuelle.length;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ maxHeight: 200 }}>
      {/* axes */}
      <line x1={padL} y1={padT} x2={padL} y2={H - padB} stroke="#E5E7EB" strokeWidth={1} />
      <line x1={padL} y1={H - padB} x2={W - padR} y2={H - padB} stroke="#E5E7EB" strokeWidth={1} />
      {/* gridlines */}
      {[0.25, 0.5, 0.75, 1].map((t) => {
        const y = padT + innerH * (1 - t);
        return (
          <g key={t}>
            <line x1={padL} y1={y} x2={W - padR} y2={y} stroke="#F3F4F6" strokeWidth={1} />
            <text x={padL - 4} y={y + 4} textAnchor="end" fontSize={9} fill="#9CA3AF">
              {Math.round(maxNPK * t)}
            </text>
          </g>
        );
      })}
      {consoMensuelle.map((d, i) => {
        const x = padL + i * gap + gap / 2;
        const hNpk = (d.npk / maxNPK) * innerH;
        const hPhyto = (d.phyto / maxNPK) * innerH;
        return (
          <g key={d.mois}>
            {/* NPK bar */}
            <rect
              x={x - barW - 1}
              y={H - padB - hNpk}
              width={barW}
              height={hNpk}
              rx={2}
              fill="#2E7D32"
              opacity={0.85}
            />
            {/* Phyto bar */}
            <rect
              x={x + 1}
              y={H - padB - hPhyto}
              width={barW}
              height={hPhyto}
              rx={2}
              fill="#E65100"
              opacity={0.75}
            />
            <text x={x} y={H - padB + 10} textAnchor="middle" fontSize={8.5} fill="#6B7280">
              {d.mois}
            </text>
          </g>
        );
      })}
      {/* legend */}
      <rect x={padL + 4} y={padT + 2} width={8} height={8} rx={2} fill="#2E7D32" />
      <text x={padL + 16} y={padT + 10} fontSize={9} fill="#374151">Engrais (kg)</text>
      <rect x={padL + 80} y={padT + 2} width={8} height={8} rx={2} fill="#E65100" />
      <text x={padL + 92} y={padT + 10} fontSize={9} fill="#374151">Phyto (kg)</text>
    </svg>
  );
}

/* ─── Composant Alertes ──────────────────────────────────────────────────── */
function AlertesApprovisionnement() {
  return (
    <div className="mt-6 space-y-3">
      <h3 className="font-semibold text-sm text-gray-900">Alertes approvisionnement</h3>
      <div className="rounded-xl p-4 flex items-start gap-3" style={{ backgroundColor: "#FFEBEE", border: "1px solid #EF9A9A" }}>
        <AlertTriangle size={16} color="#B71C1C" className="mt-0.5 shrink-0" />
        <div className="flex-1">
          <p className="text-xs font-bold" style={{ color: "#B71C1C" }}>🔴 KCl 0-0-60 (INT-002) — SOUS SEUIL CRITIQUE</p>
          <p className="text-xs text-red-800 mt-0.5">Stock : <strong>45 kg</strong> / Seuil : 50 kg — Commander <strong>200 kg</strong> auprès de YARA Nederland — Délai livraison estimé : <strong>18 jours</strong></p>
        </div>
        <button className="text-xs font-medium px-3 py-1 rounded-lg text-white whitespace-nowrap" style={{ backgroundColor: "#B71C1C" }}>
          Commander
        </button>
      </div>
      <div className="rounded-xl p-4 flex items-start gap-3" style={{ backgroundColor: "#FFEBEE", border: "1px solid #EF9A9A" }}>
        <AlertTriangle size={16} color="#B71C1C" className="mt-0.5 shrink-0" />
        <div className="flex-1">
          <p className="text-xs font-bold" style={{ color: "#B71C1C" }}>🔴 Furadan 5G (INT-009) — RUPTURE DE STOCK</p>
          <p className="text-xs text-red-800 mt-0.5">Stock : <strong>0 kg</strong> — Commander <strong>200 kg</strong> auprès de FMC CI — Délai livraison estimé : <strong>7 jours</strong></p>
        </div>
        <button className="text-xs font-medium px-3 py-1 rounded-lg text-white whitespace-nowrap" style={{ backgroundColor: "#B71C1C" }}>
          Commander
        </button>
      </div>
      <div className="rounded-xl p-4 flex items-start gap-3" style={{ backgroundColor: "#FEF3C7", border: "1px solid #FCD34D" }}>
        <AlertTriangle size={16} color="#92400E" className="mt-0.5 shrink-0" />
        <div className="flex-1">
          <p className="text-xs font-bold" style={{ color: "#92400E" }}>🟡 Cypermethrine 10% (INT-008) — Stock faible</p>
          <p className="text-xs text-amber-800 mt-0.5">Stock : <strong>18 L</strong> / Seuil : 20 L — Précommander <strong>50 L</strong> auprès AGRIINTRANT</p>
        </div>
        <button className="text-xs font-medium px-3 py-1 rounded-lg text-white whitespace-nowrap" style={{ backgroundColor: "#92400E" }}>
          Précommander
        </button>
      </div>
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────────── */
const TABS = ["Stock actuel", "Consommations", "Commandes", "Homologations"] as const;
type Tab = typeof TABS[number];

export default function IntrantsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("Stock actuel");
  const [filterCat, setFilterCat] = useState("Tous");

  const categories = ["Tous", ...Array.from(new Set(intrants.map((i) => i.categorie)))];
  const filtered = filterCat === "Tous" ? intrants : intrants.filter((i) => i.categorie === filterCat);

  return (
    <div>
      <Topbar title="Intrants Agricoles" breadcrumb={["Logistique", "Intrants"]} />

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

        {/* Tabs container */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex border-b border-gray-100 overflow-x-auto">
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
                {tab === "Commandes" && (
                  <span className="ml-1.5 px-1.5 py-0.5 rounded-full text-xs" style={{ backgroundColor: "#FFEBEE", color: "#B71C1C" }}>1 urgent</span>
                )}
              </button>
            ))}
          </div>

          {/* ── Stock actuel ── */}
          {activeTab === "Stock actuel" && (
            <div>
              <div className="flex items-center justify-between p-5 border-b border-gray-50 flex-wrap gap-3">
                <div className="flex items-center gap-3 flex-wrap">
                  <h2 className="font-semibold text-gray-900">Stock des intrants (16 références)</h2>
                  <div className="flex gap-1.5 flex-wrap">
                    {categories.map((c) => (
                      <button
                        key={c}
                        onClick={() => setFilterCat(c)}
                        className="px-2.5 py-1 rounded-lg text-xs font-medium transition-colors"
                        style={filterCat === c
                          ? { backgroundColor: "#2E7D32", color: "#fff" }
                          : { backgroundColor: "#F3F4F6", color: "#6B7280" }}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-200 text-xs text-gray-600 hover:bg-gray-50">
                    <Download size={13} /> Export
                  </button>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-white" style={{ backgroundColor: "#2E7D32" }}>
                    <Plus size={13} /> Nouvelle entrée
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ backgroundColor: "#F8FBF8" }}>
                      {["Réf", "Produit", "Catégorie", "Fournisseur", "Stock", "Unité", "Valeur (XOF)", "Seuil min", "Seuil commande", "Statut"].map((h) => (
                        <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {filtered.map((row) => {
                      const s = statutConfig[row.statut];
                      const isAlert = row.statut === "critique" || row.statut === "rupture";
                      return (
                        <tr key={row.ref} className={`hover:bg-gray-50 transition-colors ${isAlert ? "bg-red-50/30" : ""}`}>
                          <td className="px-4 py-3 text-xs font-mono text-gray-400">{row.ref}</td>
                          <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">{row.produit}</td>
                          <td className="px-4 py-3">
                            <span className="px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap"
                              style={{ backgroundColor: catColors[row.categorie] ?? "#F3F4F6", color: "#374151" }}>
                              {row.categorie}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-xs text-gray-500 whitespace-nowrap">{row.fournisseur}</td>
                          <td className="px-4 py-3 text-sm font-bold whitespace-nowrap" style={{ color: isAlert ? "#B71C1C" : "#111827" }}>
                            {row.stock}
                          </td>
                          <td className="px-4 py-3 text-xs text-gray-400">{row.unite}</td>
                          <td className="px-4 py-3 text-xs text-gray-600 whitespace-nowrap">{row.valeur}</td>
                          <td className="px-4 py-3 text-xs text-gray-500">{String(row.seuilMin)} {row.unite}</td>
                          <td className="px-4 py-3 text-xs text-gray-500">{String(row.seuilCommande)} {row.unite}</td>
                          <td className="px-4 py-3">
                            <span className="px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap"
                              style={{ backgroundColor: s.bg, color: s.color }}>
                              {s.label}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="px-5 pb-5">
                <AlertesApprovisionnement />
              </div>
            </div>
          )}

          {/* ── Consommations ── */}
          {activeTab === "Consommations" && (
            <div className="p-5 space-y-6">
              <h3 className="font-semibold text-gray-900">Consommations par culture — Campagne en cours</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ backgroundColor: "#F8FBF8" }}>
                      {["Culture", "Surface", "NPK", "KCl", "Urée", "Phyto total", "Eau irrigation", "Coût intrants/ha"].map((h) => (
                        <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {consoCultures.map((row) => (
                      <tr key={row.culture} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">{row.culture}</td>
                        <td className="px-4 py-3 text-xs font-bold text-gray-700">{row.surface}</td>
                        <td className="px-4 py-3 text-xs text-gray-600">{row.npk}</td>
                        <td className="px-4 py-3 text-xs text-gray-600">{row.kcl}</td>
                        <td className="px-4 py-3 text-xs text-gray-600">{row.uree}</td>
                        <td className="px-4 py-3 text-xs text-gray-600">{row.phyto}</td>
                        <td className="px-4 py-3 text-xs text-gray-600">{row.eau}</td>
                        <td className="px-4 py-3 text-xs font-bold" style={{ color: "#2E7D32" }}>{row.cout}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="rounded-xl border border-gray-100 p-4">
                <h4 className="text-sm font-semibold text-gray-900 mb-4">Consommation mensuelle engrais — 2025</h4>
                <BarChartConso />
              </div>

              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: "Total engrais consommés", value: "2 550 kg", sub: "NPK + KCl + Urée + Soufre" },
                  { label: "Total phyto appliqué", value: "18,7 kg/L", sub: "toutes matières actives" },
                  { label: "Eau irrigation totale", value: "181 000 m³", sub: "depuis jan. 2025" },
                ].map((s) => (
                  <div key={s.label} className="rounded-xl border border-gray-100 p-4 text-center">
                    <div className="text-xl font-bold text-gray-900">{s.value}</div>
                    <div className="text-xs font-medium text-gray-700 mt-0.5">{s.label}</div>
                    <div className="text-xs text-gray-400">{s.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Commandes ── */}
          {activeTab === "Commandes" && (
            <div className="p-5 space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <h3 className="font-semibold text-gray-900">Commandes en cours et historique</h3>
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-white" style={{ backgroundColor: "#2E7D32" }}>
                  <Plus size={13} /> Nouvelle commande
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ backgroundColor: "#F8FBF8" }}>
                      {["Réf commande", "Date", "Produit", "Fournisseur", "Quantité", "Montant", "Délai livraison", "Statut"].map((h) => (
                        <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {commandes.map((row) => {
                      const sColor =
                        row.statut === "Urgent"   ? { bg: "#FFEBEE", color: "#B71C1C" } :
                        row.statut === "En cours" ? { bg: "#E3F2FD", color: "#1565C0" } :
                        row.statut === "Planifié" ? { bg: "#FFF3E0", color: "#E65100" } :
                                                    { bg: "#E8F5E9", color: "#2E7D32" };
                      return (
                        <tr key={row.ref} className="hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-3 text-xs font-mono text-gray-400">{row.ref}</td>
                          <td className="px-4 py-3 text-xs text-gray-500 whitespace-nowrap">{row.date}</td>
                          <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">{row.produit}</td>
                          <td className="px-4 py-3 text-xs text-gray-500 whitespace-nowrap">{row.fournisseur}</td>
                          <td className="px-4 py-3 text-xs font-bold text-gray-900">{row.qte}</td>
                          <td className="px-4 py-3 text-xs text-gray-600 whitespace-nowrap">{row.montant}</td>
                          <td className="px-4 py-3 text-xs text-gray-600">{row.delai}</td>
                          <td className="px-4 py-3">
                            <span className="px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap"
                              style={{ backgroundColor: sColor.bg, color: sColor.color }}>
                              {row.statut}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── Homologations ── */}
          {activeTab === "Homologations" && (
            <div className="p-5 space-y-4">
              <h3 className="font-semibold text-gray-900">Registre des homologations phytosanitaires CI</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ backgroundColor: "#F8FBF8" }}>
                      {["Réf", "Produit", "N° homologation", "Validité", "Catégorie", "Classe OMS", "EPI requis", "Réentrée", "Récolte"].map((h) => (
                        <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {homologations.map((row) => {
                      const expired = row.validite < "01/07/2025";
                      return (
                        <tr key={row.ref} className={`hover:bg-gray-50 transition-colors ${expired ? "bg-amber-50/40" : ""}`}>
                          <td className="px-4 py-3 text-xs font-mono text-gray-400">{row.ref}</td>
                          <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">{row.produit}</td>
                          <td className="px-4 py-3 text-xs font-mono text-gray-600">{row.numHomol}</td>
                          <td className="px-4 py-3 text-xs font-medium whitespace-nowrap" style={{ color: expired ? "#B71C1C" : "#2E7D32" }}>
                            {expired ? "⚠️ " : "✅ "}{row.validite}
                          </td>
                          <td className="px-4 py-3 text-xs text-gray-600">{row.categorie}</td>
                          <td className="px-4 py-3">
                            <span className="px-2 py-0.5 rounded-full text-xs font-medium"
                              style={{
                                backgroundColor: row.classe === "Ib" ? "#FFEBEE" : row.classe === "II" ? "#FFF3E0" : "#E8F5E9",
                                color: row.classe === "Ib" ? "#B71C1C" : row.classe === "II" ? "#E65100" : "#2E7D32",
                              }}>
                              Classe {row.classe}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-xs text-gray-600 max-w-[180px]">{row.epi}</td>
                          <td className="px-4 py-3 text-xs font-medium text-center text-gray-700">{row.delaiReentree}</td>
                          <td className="px-4 py-3 text-xs font-medium text-center text-gray-700">{row.delaiRecolte}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
