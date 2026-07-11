"use client";

import { useState } from "react";
import Topbar from "../../components/Topbar";
import { Wrench, AlertTriangle, CheckCircle, Plus, Fuel, DollarSign, Settings } from "lucide-react";

const kpis = [
  { label: "Équipements", value: "28", sub: "parc total", color: "#2E7D32" },
  { label: "En maintenance", value: "2", sub: "actuellement", color: "#E65100" },
  { label: "Valeur nette", value: "48,4 M XOF", sub: "VNC total", color: "#1B5E20" },
  { label: "Coût maintenance YTD", value: "3,2 M XOF", sub: "janvier–juillet 2025", color: "#E65100" },
  { label: "Disponibilité", value: "92,8%", sub: "parc global", color: "#2E7D32" },
];

const tabs = ["Parc matériels", "Maintenance", "Carburant", "Coûts"];

type Categorie = "Tous" | "Tracteurs" | "Véhicules" | "Irrigation" | "Traitement" | "Séchage" | "Informatique";
const categories: Categorie[] = ["Tous", "Tracteurs", "Véhicules", "Irrigation", "Traitement", "Séchage", "Informatique"];

type Materiel = {
  code: string;
  designation: string;
  categorie: Categorie;
  marque: string;
  serie: string;
  achat: string;
  valeurAchat: string;
  vnc: string;
  etat: "ok" | "maintenance";
  responsable: string;
};

const materiels: Materiel[] = [
  // Tracteurs
  { code: "MAT-001", designation: "Tracteur agricole", categorie: "Tracteurs", marque: "John Deere 6120M", serie: "JD6120-2021-CI", achat: "Jan 2021", valeurAchat: "28,4 M", vnc: "19,2 M", etat: "maintenance", responsable: "Bamba O." },
  { code: "MAT-002", designation: "Remorque benne 5t", categorie: "Tracteurs", marque: "Krone", serie: "KR5T-2021", achat: "Jan 2021", valeurAchat: "2,8 M", vnc: "1,9 M", etat: "ok", responsable: "Bamba O." },
  // Véhicules
  { code: "MAT-003", designation: "Camion 10t Renault T460", categorie: "Véhicules", marque: "Renault T460", serie: "RT460-2022-AB1234", achat: "Mar 2022", valeurAchat: "42,0 M", vnc: "30,2 M", etat: "ok", responsable: "Bamba O." },
  { code: "MAT-004", designation: "Camion 3,5t Isuzu NQR", categorie: "Véhicules", marque: "Isuzu NQR", serie: "INQR-2020-AB5678", achat: "Jun 2020", valeurAchat: "18,5 M", vnc: "9,8 M", etat: "ok", responsable: "Traoré M." },
  { code: "MAT-005", designation: "Pick-up Toyota Hilux", categorie: "Véhicules", marque: "Toyota Hilux D4D", serie: "TH-2021-AB9012", achat: "Sep 2021", valeurAchat: "14,2 M", vnc: "9,8 M", etat: "ok", responsable: "Koné E." },
  { code: "MAT-006", designation: "Moto Honda XR150", categorie: "Véhicules", marque: "Honda XR150", serie: "HXRL-2022", achat: "Apr 2022", valeurAchat: "0,85 M", vnc: "0,55 M", etat: "ok", responsable: "Coulibaly R." },
  // Irrigation
  { code: "MAT-007", designation: "Pompe immergée 5,5kW", categorie: "Irrigation", marque: "Grundfos SP5A-18", serie: "GF-2020-001", achat: "Jan 2020", valeurAchat: "1,85 M", vnc: "1,1 M", etat: "ok", responsable: "Ibrahim S." },
  { code: "MAT-008", designation: "Réseau goutte-à-goutte", categorie: "Irrigation", marque: "Netafim", serie: "NTF-2020-A", achat: "Jan 2020", valeurAchat: "4,2 M", vnc: "2,5 M", etat: "ok", responsable: "Ibrahim S." },
  { code: "MAT-009", designation: "Pompe solaire 2kW", categorie: "Irrigation", marque: "Lorentz PS2-300", serie: "LZ-2022-001", achat: "Mar 2022", valeurAchat: "2,4 M", vnc: "1,8 M", etat: "ok", responsable: "Ibrahim S." },
  // Traitement
  { code: "MAT-010", designation: "Pulvérisateur à dos 16L", categorie: "Traitement", marque: "Stihl SR450", serie: "SR450-2023-01", achat: "Feb 2023", valeurAchat: "0,28 M", vnc: "0,22 M", etat: "maintenance", responsable: "Ibrahim S." },
  { code: "MAT-011", designation: "Pulvérisateur à dos 16L", categorie: "Traitement", marque: "Stihl SR450", serie: "SR450-2023-02", achat: "Feb 2023", valeurAchat: "0,28 M", vnc: "0,22 M", etat: "ok", responsable: "Konan Y." },
  { code: "MAT-012", designation: "Drone DJI Agras T30", categorie: "Traitement", marque: "DJI Agras T30", serie: "DJI-T30-2024-CI", achat: "Jan 2024", valeurAchat: "12,4 M", vnc: "10,3 M", etat: "ok", responsable: "Ibrahim S." },
  // Séchage
  { code: "MAT-013", designation: "Claies séchage solaire A", categorie: "Séchage", marque: "Fabrication locale", serie: "—", achat: "Jan 2020", valeurAchat: "0,42 M", vnc: "0,15 M", etat: "ok", responsable: "—" },
  { code: "MAT-014", designation: "Claies séchage solaire B", categorie: "Séchage", marque: "Fabrication locale", serie: "—", achat: "Jan 2020", valeurAchat: "0,42 M", vnc: "0,15 M", etat: "ok", responsable: "—" },
  { code: "MAT-015", designation: "Séchoir artificiel A", categorie: "Séchage", marque: "BioEnergy CI", serie: "BA-2022-001", achat: "Jun 2022", valeurAchat: "3,8 M", vnc: "2,9 M", etat: "ok", responsable: "Bamba O." },
  { code: "MAT-016", designation: "Séchoir artificiel B", categorie: "Séchage", marque: "BioEnergy CI", serie: "BA-2022-002", achat: "Jun 2022", valeurAchat: "3,8 M", vnc: "2,9 M", etat: "ok", responsable: "Bamba O." },
];

const maintenanceActuelle = [
  {
    code: "MAT-001",
    nom: "JD 6120M",
    probleme: "Fuite circuit hydraulique",
    piece: "DHL-JD-20785",
    eta: "ETA 15/07/2025",
  },
  {
    code: "MAT-010",
    nom: "Pulvérisateur SR450-01",
    probleme: "Révision annuelle",
    piece: "—",
    eta: "Prévue 14/07 — 1 jour",
  },
];

const historiqueMainenance = [
  { date: "30/06", materiel: "MAT-003 Camion Renault", type: "Révision 180 000km", intervenant: "Renault CI", pieces: "Filtres+huile", coutPieces: "85 000", mo: "45 000", total: "130 000", statut: "Terminé" },
  { date: "15/06", materiel: "MAT-001 JD 6120M", type: "Révision 2 800h", intervenant: "Concess. JD", pieces: "Filtres+courroies", coutPieces: "124 000", mo: "65 000", total: "189 000", statut: "Terminé" },
  { date: "01/06", materiel: "MAT-009 Pompe solaire", type: "Nettoyage panneaux", intervenant: "Interne", pieces: "—", coutPieces: "0", mo: "8 500", total: "8 500", statut: "Terminé" },
  { date: "20/05", materiel: "MAT-005 Pick-up Hilux", type: "Vidange + filtres", intervenant: "Garage Soubré", pieces: "Huile+filtres", coutPieces: "42 000", mo: "25 000", total: "67 000", statut: "Terminé" },
  { date: "10/05", materiel: "MAT-004 Isuzu NQR", type: "Révision 100 000km", intervenant: "Garage Abidjan", pieces: "Filtres+plaquettes", coutPieces: "78 000", mo: "55 000", total: "133 000", statut: "Terminé" },
  { date: "28/04", materiel: "MAT-007 Pompe Grundfos", type: "Remplacement joint", intervenant: "Interne", pieces: "Joint torique", coutPieces: "12 000", mo: "15 000", total: "27 000", statut: "Terminé" },
  { date: "15/04", materiel: "MAT-012 Drone DJI T30", type: "Mise à jour firmware", intervenant: "Technicien DJI", pieces: "—", coutPieces: "0", mo: "45 000", total: "45 000", statut: "Terminé" },
  { date: "02/04", materiel: "MAT-015 Séchoir A", type: "Révision brûleur", intervenant: "BioEnergy CI", pieces: "Gicleur", coutPieces: "18 000", mo: "30 000", total: "48 000", statut: "Terminé" },
  { date: "20/03", materiel: "MAT-003 Camion Renault", type: "Changement pneus AV", intervenant: "Michelin CI", pieces: "2× pneus", coutPieces: "185 000", mo: "20 000", total: "205 000", statut: "Terminé" },
  { date: "05/03", materiel: "MAT-001 JD 6120M", type: "Graissage général", intervenant: "Interne", pieces: "Graisse", coutPieces: "8 000", mo: "12 000", total: "20 000", statut: "Terminé" },
];

const carburantMensuel = [
  { mois: "Juin 2025", tracteur: 240, camion: 420, pickup: 80, moto: 12, total: 752, cout: "752 000" },
  { mois: "Mai 2025", tracteur: 285, camion: 484, pickup: 92, moto: 14, total: 875, cout: "875 000" },
  { mois: "Avr 2025", tracteur: 260, camion: 390, pickup: 75, moto: 11, total: 736, cout: "736 000" },
  { mois: "Mar 2025", tracteur: 310, camion: 450, pickup: 88, moto: 13, total: 861, cout: "861 000" },
  { mois: "Fév 2025", tracteur: 195, camion: 320, pickup: 62, moto: 10, total: 587, cout: "587 000" },
  { mois: "Jan 2025", tracteur: 220, camion: 395, pickup: 70, moto: 141, total: 826, cout: "826 000" },
];

export default function MaterielsPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [filtreCategorie, setFiltreCategorie] = useState<Categorie>("Tous");

  const materielsFiltres = filtreCategorie === "Tous"
    ? materiels
    : materiels.filter((m) => m.categorie === filtreCategorie);

  return (
    <div className="min-h-screen bg-gray-50">
      <Topbar title="Matériels & Équipements" breadcrumb={["Logistique", "Matériels"]} />

      <div className="p-6 space-y-6">
        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {kpis.map((k) => (
            <div key={k.label} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <p className="text-xs text-gray-500 mb-1">{k.label}</p>
              <p className="text-2xl font-bold" style={{ color: k.color }}>{k.value}</p>
              <p className="text-xs text-gray-400 mt-1">{k.sub}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white border border-gray-100 rounded-2xl p-1 shadow-sm w-fit">
          {tabs.map((t, i) => (
            <button
              key={t}
              onClick={() => setActiveTab(i)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === i ? "text-white shadow-sm" : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
              }`}
              style={activeTab === i ? { background: "#2E7D32" } : {}}
            >
              {t}
            </button>
          ))}
        </div>

        {/* ── Parc matériels ── */}
        {activeTab === 0 && (
          <div className="space-y-4">
            {/* Filtre chips */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFiltreCategorie(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                    filtreCategorie === cat
                      ? "text-white border-transparent"
                      : "border-gray-200 text-gray-600 bg-white hover:bg-gray-50"
                  }`}
                  style={filtreCategorie === cat ? { background: "#2E7D32", borderColor: "#2E7D32" } : {}}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Settings size={18} style={{ color: "#2E7D32" }} />
                  <h3 className="text-base font-semibold text-gray-900">
                    {materielsFiltres.length} équipement{materielsFiltres.length > 1 ? "s" : ""}
                  </h3>
                </div>
                <button
                  className="flex items-center gap-2 text-xs text-white px-4 py-2 rounded-xl font-medium"
                  style={{ background: "#2E7D32" }}
                >
                  <Plus size={13} /> Ajouter matériel
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm min-w-[950px]">
                  <thead>
                    <tr className="bg-[#F8FBF8] border-b border-gray-100">
                      {["Code", "Équipement", "Catégorie", "Marque / Modèle", "N° Série", "Achat", "Valeur achat", "VNC", "État", "Responsable"].map((h) => (
                        <th key={h} className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide py-2.5 px-3 whitespace-nowrap">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {materielsFiltres.map((m, i) => (
                      <tr key={m.code} className={`border-b border-gray-50 hover:bg-gray-50/60 transition-colors ${i % 2 !== 0 ? "bg-gray-50/30" : ""}`}>
                        <td className="py-2.5 px-3 font-mono text-xs font-semibold text-gray-700">{m.code}</td>
                        <td className="py-2.5 px-3 font-medium text-gray-800 whitespace-nowrap">{m.designation}</td>
                        <td className="py-2.5 px-3">
                          <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 font-medium">{m.categorie}</span>
                        </td>
                        <td className="py-2.5 px-3 text-gray-700 whitespace-nowrap">{m.marque}</td>
                        <td className="py-2.5 px-3 font-mono text-xs text-gray-500 whitespace-nowrap">{m.serie}</td>
                        <td className="py-2.5 px-3 text-gray-600 whitespace-nowrap text-xs">{m.achat}</td>
                        <td className="py-2.5 px-3 text-gray-700 whitespace-nowrap font-medium">{m.valeurAchat} XOF</td>
                        <td className="py-2.5 px-3 font-medium whitespace-nowrap" style={{ color: "#2E7D32" }}>{m.vnc} XOF</td>
                        <td className="py-2.5 px-3 whitespace-nowrap">
                          {m.etat === "ok" ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              <CheckCircle size={11} /> Bon
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-700">
                              <Wrench size={11} /> Maintenance
                            </span>
                          )}
                        </td>
                        <td className="py-2.5 px-3 text-gray-600 whitespace-nowrap text-xs">{m.responsable}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ── Maintenance ── */}
        {activeTab === 1 && (
          <div className="space-y-4">
            {/* En cours */}
            <div className="rounded-2xl border border-orange-200 bg-orange-50 p-5">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle size={16} className="text-orange-600" />
                <h3 className="text-sm font-semibold text-orange-900">Équipements en maintenance ({maintenanceActuelle.length})</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {maintenanceActuelle.map((m) => (
                  <div key={m.code} className="rounded-xl bg-white border border-orange-100 p-4 flex gap-3">
                    <div className="w-9 h-9 rounded-xl bg-orange-100 flex items-center justify-center flex-shrink-0">
                      <Wrench size={16} className="text-orange-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{m.code} — {m.nom}</p>
                      <p className="text-xs text-gray-600 mt-0.5">{m.probleme}</p>
                      {m.piece !== "—" && (
                        <p className="text-xs text-orange-700 mt-1 font-mono">Pièce commandée : {m.piece}</p>
                      )}
                      <p className="text-xs text-gray-500 mt-1">{m.eta}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Historique */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-gray-900">Historique maintenance 2025</h3>
                <button
                  className="flex items-center gap-2 text-xs text-white px-4 py-2 rounded-xl font-medium"
                  style={{ background: "#2E7D32" }}
                >
                  <Plus size={13} /> Nouvel OT
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm min-w-[900px]">
                  <thead>
                    <tr className="bg-[#F8FBF8] border-b border-gray-100">
                      {["Date", "Équipement", "Type", "Intervenant", "Pièces", "Coût pièces", "Main d'œuvre", "Total", "Statut"].map((h) => (
                        <th key={h} className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide py-2.5 px-3 whitespace-nowrap">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {historiqueMainenance.map((h, i) => (
                      <tr key={i} className={`border-b border-gray-50 hover:bg-gray-50/60 transition-colors ${i % 2 !== 0 ? "bg-gray-50/30" : ""}`}>
                        <td className="py-2.5 px-3 text-xs text-gray-500 whitespace-nowrap">{h.date}</td>
                        <td className="py-2.5 px-3 text-gray-800 font-medium whitespace-nowrap text-xs">{h.materiel}</td>
                        <td className="py-2.5 px-3 text-gray-700 whitespace-nowrap text-xs">{h.type}</td>
                        <td className="py-2.5 px-3 text-gray-600 whitespace-nowrap text-xs">{h.intervenant}</td>
                        <td className="py-2.5 px-3 text-gray-600 whitespace-nowrap text-xs">{h.pieces}</td>
                        <td className="py-2.5 px-3 text-gray-700 whitespace-nowrap text-xs text-right">{h.coutPieces} XOF</td>
                        <td className="py-2.5 px-3 text-gray-700 whitespace-nowrap text-xs text-right">{h.mo} XOF</td>
                        <td className="py-2.5 px-3 font-semibold text-gray-800 whitespace-nowrap text-xs text-right">{h.total} XOF</td>
                        <td className="py-2.5 px-3">
                          <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-800 font-medium">
                            <CheckCircle size={10} /> {h.statut}
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

        {/* ── Carburant ── */}
        {activeTab === 2 && (
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-5">
              <Fuel size={18} style={{ color: "#E65100" }} />
              <h3 className="text-base font-semibold text-gray-900">Consommation carburant — 6 derniers mois</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[700px]">
                <thead>
                  <tr className="bg-[#F8FBF8] border-b border-gray-100">
                    {["Mois", "Tracteur (L)", "Camions (L)", "Pick-up (L)", "Moto (L)", "Total litres", "Coût total (XOF)"].map((h) => (
                      <th key={h} className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide py-2.5 px-4 whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {carburantMensuel.map((r, i) => (
                    <tr key={r.mois} className={`border-b border-gray-50 hover:bg-gray-50/60 transition-colors ${i % 2 !== 0 ? "bg-gray-50/30" : ""}`}>
                      <td className="py-3 px-4 font-medium text-gray-800">{r.mois}</td>
                      <td className="py-3 px-4 text-gray-700">{r.tracteur}</td>
                      <td className="py-3 px-4 text-gray-700">{r.camion}</td>
                      <td className="py-3 px-4 text-gray-700">{r.pickup}</td>
                      <td className="py-3 px-4 text-gray-700">{r.moto}</td>
                      <td className="py-3 px-4 font-semibold text-gray-800">{r.total} L</td>
                      <td className="py-3 px-4 font-semibold" style={{ color: "#E65100" }}>{r.cout} XOF</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t-2 border-gray-200 bg-gray-50">
                    <td className="py-3 px-4 font-bold text-gray-800">Total YTD</td>
                    <td className="py-3 px-4 font-bold text-gray-800">1 510</td>
                    <td className="py-3 px-4 font-bold text-gray-800">2 459</td>
                    <td className="py-3 px-4 font-bold text-gray-800">467</td>
                    <td className="py-3 px-4 font-bold text-gray-800">201</td>
                    <td className="py-3 px-4 font-bold text-gray-800">4 637 L</td>
                    <td className="py-3 px-4 font-bold" style={{ color: "#E65100" }}>4 637 000 XOF</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        )}

        {/* ── Coûts ── */}
        {activeTab === 3 && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { label: "Maintenance YTD", value: "3 200 000 XOF", sub: "Jan–Juil 2025", icon: Wrench, color: "#E65100" },
                { label: "Carburant YTD", value: "4 637 000 XOF", sub: "6 véhicules / équip.", icon: Fuel, color: "#E65100" },
                { label: "Total coûts opérationnels", value: "7 837 000 XOF", sub: "Jan–Juil 2025", icon: DollarSign, color: "#1B5E20" },
              ].map((c) => {
                const Icon = c.icon;
                return (
                  <div key={c.label} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon size={16} style={{ color: c.color }} />
                      <p className="text-sm text-gray-500">{c.label}</p>
                    </div>
                    <p className="text-2xl font-bold text-gray-800">{c.value}</p>
                    <p className="text-xs text-gray-400 mt-1">{c.sub}</p>
                  </div>
                );
              })}
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <h3 className="text-base font-semibold text-gray-900 mb-4">Répartition des coûts par catégorie</h3>
              <div className="space-y-3">
                {[
                  { label: "Véhicules (camions, pick-up)", maint: "535 000", carbu: "2 526 000", total: "3 061 000", pct: 39 },
                  { label: "Tracteur JD 6120M", maint: "1 214 000", carbu: "1 510 000", total: "2 724 000", pct: 35 },
                  { label: "Séchoirs & Claies", maint: "68 000", carbu: "0", total: "68 000", pct: 1 },
                  { label: "Irrigation & Pompes", maint: "27 000", carbu: "0", total: "27 000", pct: 0 },
                  { label: "Traitement & Drone", maint: "45 000", carbu: "0", total: "45 000", pct: 1 },
                  { label: "Carburant moto", maint: "0", carbu: "201 000", total: "201 000", pct: 3 },
                ].map((r) => (
                  <div key={r.label}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-700">{r.label}</span>
                      <span className="text-xs font-semibold text-gray-800">{r.total} XOF</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div
                        className="h-2 rounded-full"
                        style={{ width: `${Math.max(r.pct, 1)}%`, background: "#2E7D32" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
