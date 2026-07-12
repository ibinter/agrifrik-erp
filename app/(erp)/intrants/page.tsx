"use client";

import { useState } from "react";
import { CheckCircle, AlertTriangle, Plus, Search, Filter } from "lucide-react";
import Topbar from "../../components/Topbar";

/* ─── Types ──────────────────────────────────────────────── */
type Categorie = "tous" | "fongicides" | "insecticides" | "herbicides" | "engrais";

/* ─── Data ───────────────────────────────────────────────── */
const produits = [
  {
    id: 1,
    nom: "Super Cupravit OB 50 WP",
    categorie: "fongicides",
    matiereActive: "Cuivre (hydroxyde) 50%",
    homologation: "MINAGRI-PHY-0184",
    ra: true,
    dar: "14j",
    stock: "5,0 kg",
    stockEpuise: false,
    fournisseur: "SCPA Afrique",
  },
  {
    id: 2,
    nom: "Ridomil Gold 48 WP",
    categorie: "fongicides",
    matiereActive: "Métalaxyl-M 3,75% + Mancozèbe 44,25%",
    homologation: "MINAGRI-PHY-0318",
    ra: true,
    dar: "14j",
    stock: "0,8 kg",
    stockEpuise: false,
    fournisseur: "SCPA Afrique",
  },
  {
    id: 3,
    nom: "Confidor 350 SC",
    categorie: "insecticides",
    matiereActive: "Imidaclopride 350 g/L",
    homologation: "MINAGRI-PHY-0291",
    ra: true,
    dar: "21j",
    stock: "2,8 L",
    stockEpuise: false,
    fournisseur: "SCPA Afrique",
  },
  {
    id: 4,
    nom: "Cypercal 50 EC",
    categorie: "insecticides",
    matiereActive: "Cyperméthrine 50 g/L",
    homologation: "MINAGRI-PHY-0156",
    ra: true,
    dar: "7j",
    stock: "1,2 L",
    stockEpuise: false,
    fournisseur: "Agri-Input CI",
  },
  {
    id: 5,
    nom: "Actellic 50 EC",
    categorie: "insecticides",
    matiereActive: "Pirimiphos-méthyl 50%",
    homologation: "MINAGRI-PHY-0089",
    ra: true,
    dar: "21j (stockage)",
    stock: "0,6 L",
    stockEpuise: false,
    fournisseur: "Agri-Input CI",
  },
  {
    id: 6,
    nom: "KCl 60%",
    categorie: "engrais",
    matiereActive: "Chlorure de potassium 60%",
    homologation: "MINAGRI-ENG-0052",
    ra: true,
    dar: "—",
    stock: "2 sacs",
    stockEpuise: false,
    fournisseur: "SCPA Afrique",
  },
  {
    id: 7,
    nom: "Urée 46%",
    categorie: "engrais",
    matiereActive: "Urée (N 46%)",
    homologation: "MINAGRI-ENG-0018",
    ra: true,
    dar: "—",
    stock: "0 (épuisé)",
    stockEpuise: true,
    fournisseur: "KCl Distribution",
  },
  {
    id: 8,
    nom: "Gliricidia (biomasse)",
    categorie: "engrais",
    matiereActive: "Biomasse feuilles fraîches",
    homologation: "Naturel",
    ra: true,
    dar: "—",
    stock: "Disponible",
    stockEpuise: false,
    fournisseur: "EXP-001 propre",
  },
];

const registreApplications = [
  { date: "15/06/2025", produit: "Cypercal 50 EC", parcelle: "PAR-A1", dose: "1,5L/ha × 3,8ha = 5,7L", surface: "3,8 ha", operateur: "Ibrahim S.", darLeve: "22/06/2025" },
  { date: "25/05/2025", produit: "Super Cupravit", parcelle: "PAR-A2", dose: "0,5kg/ha × 4,2ha = 2,1kg", surface: "4,2 ha", operateur: "Ibrahim S.", darLeve: "08/06/2025" },
  { date: "10/05/2025", produit: "Ridomil Gold", parcelle: "PAR-B1", dose: "0,4kg/ha × 4,5ha = 1,8kg", surface: "4,5 ha", operateur: "Ibrahim S.", darLeve: "24/05/2025" },
  { date: "28/04/2025", produit: "Confidor 350 SC", parcelle: "PAR-A1", dose: "0,3L/ha × 3,8ha = 1,14L", surface: "3,8 ha", operateur: "Ibrahim S.", darLeve: "19/05/2025" },
];

/* ─── Page ───────────────────────────────────────────────── */
export default function IntrantsPage() {
  const [categorie, setCategorie] = useState<Categorie>("tous");
  const [search, setSearch] = useState("");

  const filtres: { id: Categorie; label: string }[] = [
    { id: "tous", label: "Tous" },
    { id: "fongicides", label: "Fongicides" },
    { id: "insecticides", label: "Insecticides" },
    { id: "herbicides", label: "Herbicides" },
    { id: "engrais", label: "Engrais" },
  ];

  const produitsFiltres = produits.filter((p) => {
    const matchCat = categorie === "tous" || p.categorie === categorie;
    const matchSearch =
      search === "" ||
      p.nom.toLowerCase().includes(search.toLowerCase()) ||
      p.matiereActive.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Topbar title="Intrants" breadcrumb={["Logistique", "Intrants"]} />

      <div className="flex-1 p-6 space-y-5 max-w-screen-xl mx-auto w-full">

        {/* ── En-tête ── */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Intrants</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              Registre des produits homologués — Conformité Rainforest Alliance 2020
            </p>
          </div>
          <button className="inline-flex items-center gap-2 bg-[#2E7D32] text-white rounded-xl text-xs font-medium px-4 py-2.5 hover:bg-[#1B5E20] transition-colors shrink-0">
            <Plus size={13} />
            Ajouter un produit
          </button>
        </div>

        {/* ── KPI ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Produits enregistrés", value: "8", sub: "dans le registre", color: "#2E7D32" },
            { label: "Conformes RA", value: "8 / 8", sub: "100 % conformes", color: "#2E7D32", icon: "✅" },
            { label: "Alertes DAR", value: "2", sub: "à surveiller", color: "#E65100" },
            { label: "Dernier achat", value: "09/07/2025", sub: "KCl 60% — SCPA Afrique", color: "#1565C0" },
          ].map((k) => (
            <div key={k.label} className="rounded-2xl border border-gray-100 bg-white p-5">
              <p className="text-[11px] text-gray-500 mb-1 leading-tight">{k.label}</p>
              <p className="text-xl font-bold" style={{ color: k.color }}>
                {k.icon && <span className="mr-1">{k.icon}</span>}
                {k.value}
              </p>
              <p className="text-[10px] text-gray-400 mt-0.5">{k.sub}</p>
            </div>
          ))}
        </div>

        {/* ── Badge conformité ── */}
        <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 flex items-center gap-3">
          <CheckCircle size={16} className="text-green-700 shrink-0" />
          <p className="text-xs font-medium text-green-800">
            Registre conforme RA 2020 — Critères 4.1.2 &amp; 4.1.3 — Vérifié le 18/02/2025 (Bureau Veritas)
          </p>
        </div>

        {/* ── Filtres + recherche ── */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="flex items-center gap-1 flex-wrap">
            <Filter size={13} className="text-gray-400 mr-1" />
            {filtres.map((f) => (
              <button
                key={f.id}
                onClick={() => setCategorie(f.id)}
                className={`text-xs font-medium px-3 py-1.5 rounded-lg border transition-colors ${
                  categorie === f.id
                    ? "bg-[#2E7D32] text-white border-[#2E7D32]"
                    : "bg-white text-gray-600 border-gray-200 hover:border-green-300 hover:text-green-700"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
          <div className="relative">
            <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher un produit…"
              className="pl-8 pr-3 py-1.5 text-xs border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-green-400 w-52"
            />
          </div>
        </div>

        {/* ── Tableau produits ── */}
        <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-800">Produits enregistrés</h2>
            <span className="text-xs text-gray-400">{produitsFiltres.length} produit{produitsFiltres.length > 1 ? "s" : ""}</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-[#F8FBF8] border-b border-gray-100">
                  {["Produit", "Catégorie", "Matière active", "Homologation CI", "RA", "DAR", "Stock", "Fournisseur"].map((h) => (
                    <th key={h} className="text-left text-[10px] font-semibold text-gray-500 uppercase tracking-wide px-3 py-2.5 whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {produitsFiltres.map((p, i) => (
                  <tr
                    key={p.id}
                    className={`border-b border-gray-50 hover:bg-gray-50 transition-colors ${i % 2 !== 0 ? "bg-gray-50/30" : ""} ${p.stockEpuise ? "bg-red-50/20" : ""}`}
                  >
                    <td className="px-3 py-2.5 font-medium text-gray-900 whitespace-nowrap">{p.nom}</td>
                    <td className="px-3 py-2.5 whitespace-nowrap">
                      <CatBadge cat={p.categorie} />
                    </td>
                    <td className="px-3 py-2.5 text-gray-600">{p.matiereActive}</td>
                    <td className="px-3 py-2.5 font-mono text-[11px] text-gray-500 whitespace-nowrap">{p.homologation}</td>
                    <td className="px-3 py-2.5 whitespace-nowrap">
                      {p.ra ? (
                        <span className="inline-flex items-center gap-0.5 text-[10px] font-medium text-green-700 bg-green-50 rounded-full px-1.5 py-0.5">
                          <CheckCircle size={9} /> ✅
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-0.5 text-[10px] font-medium text-red-700 bg-red-50 rounded-full px-1.5 py-0.5">
                          ✗
                        </span>
                      )}
                    </td>
                    <td className="px-3 py-2.5 font-mono text-[11px] text-gray-700 whitespace-nowrap">{p.dar}</td>
                    <td className={`px-3 py-2.5 font-medium whitespace-nowrap ${p.stockEpuise ? "text-red-600" : "text-gray-800"}`}>{p.stock}</td>
                    <td className="px-3 py-2.5 text-gray-600 whitespace-nowrap">{p.fournisseur}</td>
                  </tr>
                ))}
                {produitsFiltres.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-4 py-8 text-center text-xs text-gray-400">
                      Aucun produit correspondant
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Alertes DAR ── */}
        <div>
          <h2 className="text-sm font-semibold text-gray-800 mb-3">Alertes DAR (Délai Avant Récolte)</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {/* Alerte 1 — levée */}
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 flex items-start gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-amber-400 mt-1 shrink-0" />
              <div>
                <p className="text-xs font-semibold text-amber-800">Confidor 350 SC — DAR 21j</p>
                <p className="text-[11px] text-amber-700 mt-0.5">Dernier traitement : 15/06/2025</p>
                <p className="text-[11px] text-amber-700">DAR levé le 06/07/2025</p>
                <span className="inline-block mt-1.5 text-[10px] font-medium text-green-700 bg-green-100 rounded-full px-2 py-0.5">
                  ✅ Dépassé — aucun risque
                </span>
              </div>
            </div>

            {/* Alerte 2 — traitement prévu */}
            <div className="rounded-xl border border-red-200 bg-red-50 p-4 flex items-start gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500 mt-1 shrink-0" />
              <div>
                <p className="text-xs font-semibold text-red-800">Cypercal 50 EC — DAR 7j</p>
                <p className="text-[11px] text-red-700 mt-0.5">Prochain traitement prévu : 15/07/2025</p>
                <p className="text-[11px] text-red-700">Récolte PAR-A1 éloignée (oct)</p>
                <span className="inline-block mt-1.5 text-[10px] font-medium text-green-700 bg-green-100 rounded-full px-2 py-0.5">
                  ✅ Pas de risque actuel
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Registre d'application ── */}
        <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-800">Registre d&apos;application 2025</h2>
            <span className="text-xs text-gray-400">10 dernières opérations</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-[#F8FBF8] border-b border-gray-100">
                  {["Date", "Produit", "Parcelle", "Dose appliquée", "Surface", "Opérateur", "DAR levé"].map((h) => (
                    <th key={h} className="text-left text-[10px] font-semibold text-gray-500 uppercase tracking-wide px-3 py-2.5 whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {registreApplications.map((r, i) => (
                  <tr key={i} className={`border-b border-gray-50 hover:bg-gray-50 transition-colors ${i % 2 !== 0 ? "bg-gray-50/30" : ""}`}>
                    <td className="px-3 py-2.5 font-mono text-[11px] text-gray-600 whitespace-nowrap">{r.date}</td>
                    <td className="px-3 py-2.5 font-medium text-gray-800 whitespace-nowrap">{r.produit}</td>
                    <td className="px-3 py-2.5 text-gray-600 whitespace-nowrap">{r.parcelle}</td>
                    <td className="px-3 py-2.5 text-gray-600">{r.dose}</td>
                    <td className="px-3 py-2.5 text-gray-600 whitespace-nowrap">{r.surface}</td>
                    <td className="px-3 py-2.5 text-gray-700 whitespace-nowrap">{r.operateur}</td>
                    <td className="px-3 py-2.5 whitespace-nowrap">
                      <span className="inline-flex items-center gap-0.5 text-[10px] font-medium text-green-700">
                        <CheckCircle size={10} /> {r.darLeve} ✅
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-5 py-2.5 border-t border-gray-50 bg-gray-50/50">
            <button className="text-xs text-[#2E7D32] font-medium hover:underline">+ 6 autres enregistrements</button>
          </div>
        </div>

        {/* ── Conformité RA ── */}
        <div className="rounded-2xl border border-green-200 bg-green-50 p-5">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle size={16} className="text-green-700" />
            <h2 className="text-sm font-semibold text-green-800">Conformité Rainforest Alliance — Critères 4.1.x</h2>
          </div>
          <div className="space-y-2">
            {[
              {
                critere: "Critère 4.1.1",
                label: "Interdiction des produits de la liste rouge OMS",
                detail: "Aucun produit liste rouge utilisé sur EXP-001.",
              },
              {
                critere: "Critère 4.1.2",
                label: "Registre phytosanitaire complet et à jour",
                detail: "Registre numérique AGRIFRIK ERP + fiches papier au bureau.",
              },
              {
                critere: "Critère 4.1.3",
                label: "Formation applicateur",
                detail: "Ibrahim Sawadogo — Attestation BPA ANADER 2025 (ANADER-2025-0142).",
              },
              {
                critere: "Critère 4.1.4",
                label: "EPI disponibles",
                detail: "Masque FFP2, combinaison, gants nitrile, lunettes — inventaire ENT-001.",
              },
              {
                critere: "Critère 4.1.5",
                label: "Emballages vides triple-rincés et retournés SCPA",
                detail: "Certificat SCPA-RETOUR-2025-047.",
              },
            ].map((item) => (
              <div key={item.critere} className="flex items-start gap-2.5">
                <CheckCircle size={13} className="text-green-600 mt-0.5 shrink-0" />
                <div>
                  <span className="text-xs font-semibold text-green-800">{item.critere} — {item.label} : </span>
                  <span className="text-xs text-green-700">{item.detail}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

/* ─── CatBadge ───────────────────────────────────────────── */
function CatBadge({ cat }: { cat: string }) {
  const map: Record<string, { label: string; color: string; bg: string }> = {
    fongicides: { label: "Fongicide", color: "#1565C0", bg: "#EFF6FF" },
    insecticides: { label: "Insecticide", color: "#7B3F00", bg: "#FFF7ED" },
    herbicides: { label: "Herbicide", color: "#854D0E", bg: "#FEFCE8" },
    engrais: { label: "Engrais", color: "#166534", bg: "#F0FDF4" },
  };
  const m = map[cat] ?? { label: cat, color: "#555", bg: "#F5F5F5" };
  return (
    <span
      className="inline-block text-[10px] font-medium rounded-full px-2 py-0.5 whitespace-nowrap"
      style={{ color: m.color, backgroundColor: m.bg }}
    >
      {m.label}
    </span>
  );
}
