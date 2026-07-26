"use client";

import { useState, useEffect } from "react";
import Topbar from "../../components/Topbar";
import ExportButton from "../../components/ui/ExportButton";
import { dbGet, dbPost, DEMO_ORG_ID } from "@/lib/db";

type Filtre = "Tous" | "Tracteurs" | "Véhicules" | "Équipements" | "Outils";
const FILTRES: Filtre[] = ["Tous", "Tracteurs", "Véhicules", "Équipements", "Outils"];

type Statut = "Opérationnel" | "En maintenance" | "Hors service";
type Categorie = "Tracteur" | "Pulvérisateur" | "Irrigation" | "Véhicule" | "Autre";

type Materiel = {
  code: string;
  designation: string;
  type: Filtre;
  marque: string;
  service: string;
  valeurNette: string;
  statut: "ok" | "maintenance";
  statutLabel: string;
};

type MaterielEtendu = {
  id: string;
  designation: string;
  categorie: Categorie;
  numero: string;
  dateAcquisition: string;
  valeur: number;
  statut: Statut;
};

const MATERIELS: Materiel[] = [
  { code: "MAT-2021-001", designation: "Toyota HiLux double cab", type: "Véhicules", marque: "Toyota HiLux 2021", service: "Jan 2021", valeurNette: "4 200 000 XOF", statut: "ok", statutLabel: "Opérationnel" },
  { code: "MAT-2021-004", designation: "Tracteur agricole", type: "Tracteurs", marque: "John Deere 5055E", service: "Mar 2021", valeurNette: "12 100 000 XOF", statut: "ok", statutLabel: "Opérationnel" },
  { code: "MAT-2022-002", designation: "Groupe électrogène", type: "Équipements", marque: "Honda 6,5 kVA", service: "Fév 2022", valeurNette: "420 000 XOF", statut: "ok", statutLabel: "Opérationnel" },
  { code: "MAT-2022-003", designation: "Pulvérisateur à dos", type: "Outils", marque: "Solo 425 16L", service: "Avr 2022", valeurNette: "45 000 XOF", statut: "ok", statutLabel: "Opérationnel" },
  { code: "MAT-2023-001", designation: "Pompe électrique PSC", type: "Équipements", marque: "Grundfos CM5-6", service: "Mar 2023", valeurNette: "285 000 XOF", statut: "ok", statutLabel: "Opérationnel" },
  { code: "MAT-2023-002", designation: "Remorque agricole", type: "Véhicules", marque: "Remorque 3t acier", service: "Jun 2023", valeurNette: "680 000 XOF", statut: "ok", statutLabel: "Opérationnel" },
  { code: "MAT-2024-001", designation: "Balance électronique", type: "Outils", marque: "Kern IFB 60K-3M", service: "Jan 2024", valeurNette: "185 000 XOF", statut: "ok", statutLabel: "Opérationnel" },
  { code: "MAT-2024-002", designation: "Séchoir solaire à claies", type: "Équipements", marque: "Claies 60m² CNRA", service: "Juin 2024", valeurNette: "650 000 XOF", statut: "maintenance", statutLabel: "Maintenance (toile à réparer)" },
];

const MOCK_ETENDUS: MaterielEtendu[] = [
  { id: "M1", designation: "Tracteur John Deere 5075E", categorie: "Tracteur", numero: "JD-5075-2024", dateAcquisition: "2024-03-01", valeur: 18500000, statut: "Opérationnel" },
  { id: "M2", designation: "Pulvérisateur à dos 16L", categorie: "Pulvérisateur", numero: "PULV-016", dateAcquisition: "2024-06-15", valeur: 45000, statut: "Opérationnel" },
  { id: "M3", designation: "Camion Iveco 35C15", categorie: "Véhicule", numero: "AB-1234-CI", dateAcquisition: "2023-08-10", valeur: 12000000, statut: "En maintenance" },
];

const MAINTENANCE = [
  { materiel: "JD5055E", type: "Vidange 250h + filtre", date: "15/04/2025", cout: "142 000 XOF", prochain: "Avr 2026 (250h)" },
  { materiel: "Toyota HiLux", type: "Vidange + 4 pneus", date: "20/02/2025", cout: "215 000 XOF", prochain: "Fév 2026" },
  { materiel: "Pompe PSC", type: "Remplacement joint", date: "10/05/2025", cout: "28 000 XOF", prochain: "Mai 2026" },
  { materiel: "Claies séchage", type: "Réparation toile (en cours)", date: "11/07/2025", cout: "~35 000 XOF", prochain: "-" },
];

const DONUT_DATA = [
  { label: "Tracteurs", valeur: "12,1M", pct: 65.0, color: "#1B5E20" },
  { label: "Véhicules", valeur: "4,88M", pct: 26.2, color: "#4CAF50" },
  { label: "Équipements", valeur: "1,36M", pct: 7.3, color: "#E65100" },
  { label: "Outils", valeur: "0,23M", pct: 1.5, color: "#9E9E9E" },
];

function DonutChart() {
  let cumul = 0;
  const cx = 140, cy = 140, R = 100, r = 60;
  return (
    <svg viewBox="0 0 280 280" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[280px] mx-auto">
      {DONUT_DATA.map((seg) => {
        const start = cumul * 3.6;
        const end = (cumul + seg.pct) * 3.6;
        cumul += seg.pct;
        const toRad = (deg: number) => (deg - 90) * (Math.PI / 180);
        const x1 = cx + R * Math.cos(toRad(start));
        const y1 = cy + R * Math.sin(toRad(start));
        const x2 = cx + R * Math.cos(toRad(end));
        const y2 = cy + R * Math.sin(toRad(end));
        const ix1 = cx + r * Math.cos(toRad(end));
        const iy1 = cy + r * Math.sin(toRad(end));
        const ix2 = cx + r * Math.cos(toRad(start));
        const iy2 = cy + r * Math.sin(toRad(start));
        const large = end - start > 180 ? 1 : 0;
        const d = `M ${x1} ${y1} A ${R} ${R} 0 ${large} 1 ${x2} ${y2} L ${ix1} ${iy1} A ${r} ${r} 0 ${large} 0 ${ix2} ${iy2} Z`;
        return <path key={seg.label} d={d} fill={seg.color} stroke="white" strokeWidth="2" />;
      })}
      <text x={cx} y={cy - 10} textAnchor="middle" fill="#1B5E20" fontSize="13" fontWeight="bold">18,6M</text>
      <text x={cx} y={cy + 8} textAnchor="middle" fill="#666" fontSize="9">XOF valeur nette</text>
    </svg>
  );
}

type FormAjout = {
  designation: string;
  categorie: Categorie;
  numero: string;
  dateAcquisition: string;
  valeur: string;
  statut: Statut;
};

type FormMaintenance = {
  materiel: string;
  datePrevue: string;
  type: "Préventif" | "Curatif";
  technicien: string;
};

const FORM_AJOUT_INIT: FormAjout = {
  designation: "",
  categorie: "Tracteur",
  numero: "",
  dateAcquisition: "",
  valeur: "",
  statut: "Opérationnel",
};

const FORM_MAINT_INIT: FormMaintenance = {
  materiel: "",
  datePrevue: "",
  type: "Préventif",
  technicien: "",
};

const CATEGORIES: Categorie[] = ["Tracteur", "Pulvérisateur", "Irrigation", "Véhicule", "Autre"];
const STATUTS: Statut[] = ["Opérationnel", "En maintenance", "Hors service"];

export default function MaterielsPage() {
  const [filtre, setFiltre] = useState<Filtre>("Tous");
  const [recherche, setRecherche] = useState("");
  const [modalAjout, setModalAjout] = useState(false);
  const [modalMaint, setModalMaint] = useState(false);
  const [formAjout, setFormAjout] = useState<FormAjout>(FORM_AJOUT_INIT);
  const [formMaint, setFormMaint] = useState<FormMaintenance>(FORM_MAINT_INIT);
  const [toast, setToast] = useState<string | null>(null);
  const [rows, setRows] = useState<Record<string, unknown>[]>([]);

  const load = () => { dbGet<Record<string, unknown>>("materiels").then(setRows); };
  useEffect(() => { load(); }, []);

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }

  const source = rows.length > 0
    ? rows.map((r) => ({
        code: String(r.nom ?? ""),
        designation: String(r.nom ?? ""),
        type: String(r.type ?? "") as Filtre,
        marque: String(r.marque ?? ""),
        service: String(r.date_acquisition ?? ""),
        valeurNette: r.valeur_acquisition ? `${Number(r.valeur_acquisition).toLocaleString("fr-FR")} XOF` : "",
        statut: (String(r.statut ?? "") === "Opérationnel" ? "ok" : "maintenance") as "ok" | "maintenance",
        statutLabel: String(r.statut ?? ""),
      }))
    : MATERIELS;

  const filtered = source.filter((m) => {
    const matchType = filtre === "Tous" || m.type === filtre;
    const q = recherche.toLowerCase();
    const matchQ = !q || m.code.toLowerCase().includes(q) || m.designation.toLowerCase().includes(q) || m.marque.toLowerCase().includes(q);
    return matchType && matchQ;
  });

  const exportData = source.map((m) => ({
    Code: m.code,
    Designation: m.designation,
    Type: m.type,
    Marque: m.marque,
    "Mise en service": m.service,
    "Valeur nette": m.valeurNette,
    Statut: m.statutLabel,
  }));

  async function handleAjout(e: React.FormEvent) {
    e.preventDefault();
    await dbPost("materiels", {
      nom: formAjout.designation,
      type: formAjout.categorie,
      marque: formAjout.numero,
      modele: formAjout.numero,
      date_acquisition: formAjout.dateAcquisition,
      valeur_acquisition: parseFloat(formAjout.valeur) || 0,
      statut: "Opérationnel",
      prochaine_maintenance: "",
      organisation_id: DEMO_ORG_ID,
    });
    setModalAjout(false);
    setFormAjout(FORM_AJOUT_INIT);
    showToast("Matériel enregistré avec succès");
    load();
  }

  function handleMaint(e: React.FormEvent) {
    e.preventDefault();
    setModalMaint(false);
    setFormMaint(FORM_MAINT_INIT);
    showToast("Maintenance planifiée avec succès");
  }

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-gray-50">
      <Topbar breadcrumb={["Logistique", "Matériels"]} />

      <div className="p-4 sm:p-6 space-y-6">

        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Matériels</h1>
            <p className="text-sm text-gray-500 mt-1">Parc machines, équipements et véhicules - EXP-001</p>
          </div>
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => setModalAjout(true)}
              className="bg-[#2E7D32] text-white rounded-xl text-xs font-medium px-4 py-2.5 hover:bg-[#1B5E20] transition-colors"
            >
              + Enregistrer un matériel
            </button>
            <button
              onClick={() => setModalMaint(true)}
              className="border border-gray-200 bg-white text-gray-700 rounded-xl text-xs font-medium px-4 py-2.5 hover:bg-gray-50 transition-colors"
            >
              Planifier maintenance
            </button>
            <ExportButton data={exportData} filename="inventaire-materiels" label="Export inventaire" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Matériels", value: "8", sub: "parc EXP-001", color: "#1B5E20" },
            { label: "Opérationnels", value: "7", sub: "en service actif", color: "#2E7D32" },
            { label: "En maintenance", value: "1", sub: "claies séchage", color: "#E65100" },
            { label: "Valeur nette", value: "18,6M XOF", sub: "comptable 2025", color: "#1B5E20" },
          ].map((kpi) => (
            <div key={kpi.label} className="rounded-2xl border border-gray-100 bg-white p-5">
              <p className="text-xs text-gray-500 mb-1">{kpi.label}</p>
              <p className="text-xl font-bold" style={{ color: kpi.color }}>{kpi.value}</p>
              <p className="text-xs text-gray-400 mt-1">{kpi.sub}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex gap-1 flex-wrap">
            {FILTRES.map((f) => (
              <button
                key={f}
                onClick={() => setFiltre(f)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                  filtre === f
                    ? "text-white border-transparent bg-[#2E7D32]"
                    : "border-gray-200 text-gray-600 bg-white hover:bg-gray-50"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <input
            type="text"
            placeholder="Rechercher…"
            value={recherche}
            onChange={(e) => setRecherche(e.target.value)}
            className="ml-auto border border-gray-200 rounded-xl text-xs px-3 py-2 bg-white outline-none focus:border-[#2E7D32] w-48"
          />
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[820px]">
              <thead>
                <tr className="bg-[#F8FBF8]">
                  {["Code", "Désignation", "Type", "Marque / Modèle", "Mise en service", "Valeur nette", "Statut"].map((h, i) => (
                    <th
                      key={h}
                      className={`text-left px-4 py-3 text-gray-600 font-medium text-xs uppercase tracking-wide ${i === 0 ? "rounded-tl-xl" : ""} ${i === 6 ? "rounded-tr-xl" : ""}`}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((m) => (
                  <tr key={m.code} className="hover:bg-gray-50/60 transition-colors">
                    <td className="px-4 py-3 font-mono text-xs font-semibold text-gray-700">{m.code}</td>
                    <td className="px-4 py-3 font-medium text-gray-800">{m.designation}</td>
                    <td className="px-4 py-3">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 font-medium">{m.type}</span>
                    </td>
                    <td className="px-4 py-3 text-gray-700 text-xs">{m.marque}</td>
                    <td className="px-4 py-3 text-gray-500 text-xs">{m.service}</td>
                    <td className="px-4 py-3 font-semibold text-[#1B5E20] text-sm">{m.valeurNette}</td>
                    <td className="px-4 py-3">
                      {m.statut === "ok" ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {m.statutLabel}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-700">
                          {m.statutLabel}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-gray-400 text-sm">
                      Aucun matériel trouvé
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          <div className="rounded-2xl border border-gray-100 bg-white p-6 flex flex-col">
            <h2 className="text-base font-semibold text-gray-800 mb-4">Valeur nette comptable par type</h2>
            <div className="flex-1 flex items-center justify-center">
              <DonutChart />
            </div>
            <div className="mt-4 space-y-2">
              {DONUT_DATA.map((seg) => (
                <div key={seg.label} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: seg.color }} />
                    <span className="text-gray-700">{seg.label}</span>
                  </div>
                  <span className="font-semibold text-gray-800">{seg.valeur} XOF ({seg.pct}%)</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-6 lg:col-span-2">
            <h2 className="text-base font-semibold text-gray-800 mb-4">Maintenance 2025 YTD</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[540px]">
                <thead>
                  <tr className="bg-[#F8FBF8]">
                    <th className="text-left px-4 py-3 text-gray-600 font-medium rounded-tl-xl">Matériel</th>
                    <th className="text-left px-4 py-3 text-gray-600 font-medium">Type maintenance</th>
                    <th className="text-left px-4 py-3 text-gray-600 font-medium">Date</th>
                    <th className="text-right px-4 py-3 text-gray-600 font-medium">Coût</th>
                    <th className="text-left px-4 py-3 text-gray-600 font-medium rounded-tr-xl">Prochain entretien</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {MAINTENANCE.map((m) => (
                    <tr key={m.materiel + m.date} className="hover:bg-gray-50/60">
                      <td className="px-4 py-3 font-medium text-gray-800">{m.materiel}</td>
                      <td className="px-4 py-3 text-gray-700 text-xs">{m.type}</td>
                      <td className="px-4 py-3 text-gray-500 text-xs">{m.date}</td>
                      <td className="px-4 py-3 text-gray-700 text-right font-medium">{m.cout}</td>
                      <td className="px-4 py-3 text-gray-500 text-xs">{m.prochain}</td>
                    </tr>
                  ))}
                  <tr className="bg-[#F8FBF8] font-bold">
                    <td className="px-4 py-3 text-gray-800 rounded-bl-xl" colSpan={3}>TOTAL 2025</td>
                    <td className="px-4 py-3 text-[#1B5E20] text-right">420 000 XOF</td>
                    <td className="px-4 py-3 text-gray-500 text-xs font-normal rounded-br-xl">Budget annuel : 600 000 XOF</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                <span>Budget consommé</span>
                <span className="font-semibold text-[#2E7D32]">420 000 / 600 000 XOF - 70%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div className="h-2 rounded-full bg-[#2E7D32]" style={{ width: "70%" }} />
              </div>
            </div>
          </div>

        </div>

      </div>

      {modalAjout && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4 shadow-xl">
            <h2 className="text-base font-semibold text-gray-900 mb-4">Ajouter un matériel</h2>
            <form onSubmit={handleAjout} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Désignation</label>
                <input
                  type="text"
                  required
                  value={formAjout.designation}
                  onChange={(e) => setFormAjout({ ...formAjout, designation: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl text-sm px-3 py-2 outline-none focus:border-[#2E7D32]"
                  placeholder="Nom du matériel"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Catégorie</label>
                <select
                  value={formAjout.categorie}
                  onChange={(e) => setFormAjout({ ...formAjout, categorie: e.target.value as Categorie })}
                  className="w-full border border-gray-200 rounded-xl text-sm px-3 py-2 outline-none focus:border-[#2E7D32]"
                >
                  {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">N° série</label>
                <input
                  type="text"
                  required
                  value={formAjout.numero}
                  onChange={(e) => setFormAjout({ ...formAjout, numero: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl text-sm px-3 py-2 outline-none focus:border-[#2E7D32]"
                  placeholder="Numéro de série"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Date d'acquisition</label>
                <input
                  type="date"
                  required
                  value={formAjout.dateAcquisition}
                  onChange={(e) => setFormAjout({ ...formAjout, dateAcquisition: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl text-sm px-3 py-2 outline-none focus:border-[#2E7D32]"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Valeur (XOF)</label>
                <input
                  type="number"
                  required
                  min={0}
                  value={formAjout.valeur}
                  onChange={(e) => setFormAjout({ ...formAjout, valeur: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl text-sm px-3 py-2 outline-none focus:border-[#2E7D32]"
                  placeholder="Valeur en XOF"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Statut</label>
                <select
                  value={formAjout.statut}
                  onChange={(e) => setFormAjout({ ...formAjout, statut: e.target.value as Statut })}
                  className="w-full border border-gray-200 rounded-xl text-sm px-3 py-2 outline-none focus:border-[#2E7D32]"
                >
                  {STATUTS.map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => { setModalAjout(false); setFormAjout(FORM_AJOUT_INIT); }}
                  className="flex-1 border border-gray-200 text-gray-700 rounded-xl text-xs font-medium px-3 py-2 hover:bg-gray-50 transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-[#2E7D32] text-white rounded-xl text-xs font-medium px-3 py-2 hover:bg-[#1B5E20] transition-colors"
                >
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {modalMaint && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4 shadow-xl">
            <h2 className="text-base font-semibold text-gray-900 mb-4">Planifier une maintenance</h2>
            <form onSubmit={handleMaint} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Matériel</label>
                <input
                  type="text"
                  required
                  value={formMaint.materiel}
                  onChange={(e) => setFormMaint({ ...formMaint, materiel: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl text-sm px-3 py-2 outline-none focus:border-[#2E7D32]"
                  placeholder="Nom ou code du matériel"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Date prévue</label>
                <input
                  type="date"
                  required
                  value={formMaint.datePrevue}
                  onChange={(e) => setFormMaint({ ...formMaint, datePrevue: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl text-sm px-3 py-2 outline-none focus:border-[#2E7D32]"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Type</label>
                <select
                  value={formMaint.type}
                  onChange={(e) => setFormMaint({ ...formMaint, type: e.target.value as "Préventif" | "Curatif" })}
                  className="w-full border border-gray-200 rounded-xl text-sm px-3 py-2 outline-none focus:border-[#2E7D32]"
                >
                  <option>Préventif</option>
                  <option>Curatif</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Technicien</label>
                <input
                  type="text"
                  required
                  value={formMaint.technicien}
                  onChange={(e) => setFormMaint({ ...formMaint, technicien: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl text-sm px-3 py-2 outline-none focus:border-[#2E7D32]"
                  placeholder="Nom du technicien"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => { setModalMaint(false); setFormMaint(FORM_MAINT_INIT); }}
                  className="flex-1 border border-gray-200 text-gray-700 rounded-xl text-xs font-medium px-3 py-2 hover:bg-gray-50 transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-[#2E7D32] text-white rounded-xl text-xs font-medium px-3 py-2 hover:bg-[#1B5E20] transition-colors"
                >
                  Planifier
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {toast && (
        <div className="fixed bottom-4 right-4 bg-green-600 text-white rounded-xl px-4 py-2 z-50 text-sm shadow-lg">
          {toast}
        </div>
      )}
    </div>
  );
}
