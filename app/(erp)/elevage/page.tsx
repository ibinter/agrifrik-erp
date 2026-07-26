"use client";

import { useState, useEffect } from "react";
import Topbar from "../../components/Topbar";
import ExportButton from "../../components/ui/ExportButton";
import { dbGet, dbPost, DEMO_ORG_ID } from "@/lib/db";

type Statut = "Sain" | "Traitement" | "Quarantaine";

const STATUT_COLORS: Record<Statut, string> = {
  Sain: "bg-green-100 text-green-800",
  Traitement: "bg-orange-100 text-orange-700",
  Quarantaine: "bg-red-100 text-red-700",
};

const ESPECES = ["Bovin", "Ovin", "Caprin", "Porcin", "Volaille"];
const STATUTS: Statut[] = ["Sain", "Traitement", "Quarantaine"];

type FormData = {
  espece: string;
  effectif: string;
  poidsMoyen: string;
  dateEntree: string;
  zone: string;
  statut: Statut;
};

const FORM_INIT: FormData = {
  espece: "Bovin",
  effectif: "",
  poidsMoyen: "",
  dateEntree: "",
  zone: "",
  statut: "Sain",
};

export default function ElevagePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState<FormData>(FORM_INIT);
  const [rows, setRows] = useState<Record<string, unknown>[]>([]);
  const [toast, setToast] = useState(false);

  const load = () => {
    dbGet<Record<string, unknown>>("elevages").then(setRows);
  };

  useEffect(() => { load(); }, []);

  const effectifTotal = rows.reduce((s, a) => s + (Number(a.effectif) || 0), 0);
  const poidsTotal = rows.reduce((s, a) => s + (Number(a.effectif) || 0) * (Number(a.poids_moyen) || 0), 0);
  const lotsTraitement = rows.filter((a) => a.statut === "Traitement").length;

  function showToast() {
    setToast(true);
    setTimeout(() => setToast(false), 3000);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await dbPost("elevages", {
      nom: `${form.espece}-${Date.now()}`,
      type_animal: form.espece,
      race: form.espece,
      effectif: parseInt(form.effectif),
      poids_moyen: Number(form.poidsMoyen),
      statut: form.statut,
      zone: form.zone,
      date_entree: form.dateEntree,
      organisation_id: DEMO_ORG_ID,
    });
    setModalOpen(false);
    setForm(FORM_INIT);
    load();
    showToast();
  }

  const exportData = rows.map((a) => ({
    ID: String(a.id ?? ""),
    Espece: String(a.type_animal ?? a.espece ?? ""),
    Lot: String(a.nom ?? ""),
    Effectif: Number(a.effectif ?? 0),
    "Poids moyen (kg)": Number(a.poids_moyen ?? 0),
    Statut: String(a.statut ?? ""),
    Zone: String(a.zone ?? ""),
    "Date entree": String(a.date_entree ?? ""),
  }));

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-gray-50">
      <Topbar breadcrumb={["Production", "Élevage"]} />

      <div className="p-4 sm:p-6 space-y-6">

        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Élevage</h1>
            <p className="text-sm text-gray-500 mt-1">Gestion du cheptel et suivi sanitaire</p>
          </div>
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => setModalOpen(true)}
              className="bg-[#2E7D32] text-white rounded-xl text-xs font-medium px-4 py-2.5 hover:bg-[#1B5E20] transition-colors"
            >
              + Ajouter un animal / lot
            </button>
            <ExportButton data={exportData} filename="cheptel-elevage" label="Exporter" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-2xl border border-gray-100 bg-white p-5">
            <p className="text-xs text-gray-500 mb-1">Effectif total</p>
            <p className="text-2xl font-bold text-[#1B5E20]">{effectifTotal.toLocaleString()}</p>
            <p className="text-xs text-gray-400 mt-1">animaux en parc</p>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-white p-5">
            <p className="text-xs text-gray-500 mb-1">Poids total estimé</p>
            <p className="text-2xl font-bold text-[#2E7D32]">{Math.round(poidsTotal).toLocaleString()} kg</p>
            <p className="text-xs text-gray-400 mt-1">biomasse cheptel</p>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-white p-5">
            <p className="text-xs text-gray-500 mb-1">Lots en traitement</p>
            <p className="text-2xl font-bold text-[#E65100]">{lotsTraitement}</p>
            <p className="text-xs text-gray-400 mt-1">suivi vétérinaire actif</p>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[760px]">
              <thead>
                <tr className="bg-[#F8FBF8]">
                  {["Lot", "Espèce", "Effectif", "Poids moyen (kg)", "Zone / Enclos", "Date d'entrée", "Statut sanitaire"].map((h, i) => (
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
                {rows.map((a, idx) => {
                  const statut = String(a.statut ?? "Sain") as Statut;
                  const statutColor = STATUT_COLORS[statut] ?? "bg-gray-100 text-gray-700";
                  return (
                    <tr key={String(a.id ?? idx)} className="hover:bg-gray-50/60 transition-colors">
                      <td className="px-4 py-3 font-mono text-xs font-semibold text-gray-700">{String(a.nom ?? "")}</td>
                      <td className="px-4 py-3 font-medium text-gray-800">{String(a.type_animal ?? a.espece ?? "")}</td>
                      <td className="px-4 py-3 text-gray-700 font-semibold">{Number(a.effectif ?? 0).toLocaleString()}</td>
                      <td className="px-4 py-3 text-gray-700">{String(a.poids_moyen ?? "")}</td>
                      <td className="px-4 py-3 text-gray-600 text-xs">{String(a.zone ?? "")}</td>
                      <td className="px-4 py-3 text-gray-500 text-xs">{String(a.date_entree ?? "")}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${statutColor}`}>
                          {statut}
                        </span>
                      </td>
                    </tr>
                  );
                })}
                {rows.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-gray-400 text-sm">
                      Aucun animal enregistré
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4 shadow-xl">
            <h2 className="text-base font-semibold text-gray-900 mb-4">Ajouter un animal / lot</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Espèce</label>
                <select
                  value={form.espece}
                  onChange={(e) => setForm({ ...form, espece: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl text-sm px-3 py-2 outline-none focus:border-[#2E7D32]"
                >
                  {ESPECES.map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Effectif</label>
                <input
                  type="number"
                  required
                  min={1}
                  value={form.effectif}
                  onChange={(e) => setForm({ ...form, effectif: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl text-sm px-3 py-2 outline-none focus:border-[#2E7D32]"
                  placeholder="Nombre d'animaux"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Poids moyen (kg)</label>
                <input
                  type="number"
                  required
                  min={0}
                  step="0.1"
                  value={form.poidsMoyen}
                  onChange={(e) => setForm({ ...form, poidsMoyen: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl text-sm px-3 py-2 outline-none focus:border-[#2E7D32]"
                  placeholder="kg"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Date d'entrée</label>
                <input
                  type="date"
                  required
                  value={form.dateEntree}
                  onChange={(e) => setForm({ ...form, dateEntree: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl text-sm px-3 py-2 outline-none focus:border-[#2E7D32]"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Zone / Enclos</label>
                <input
                  type="text"
                  required
                  value={form.zone}
                  onChange={(e) => setForm({ ...form, zone: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl text-sm px-3 py-2 outline-none focus:border-[#2E7D32]"
                  placeholder="Ex: Enclos A"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Statut sanitaire</label>
                <select
                  value={form.statut}
                  onChange={(e) => setForm({ ...form, statut: e.target.value as Statut })}
                  className="w-full border border-gray-200 rounded-xl text-sm px-3 py-2 outline-none focus:border-[#2E7D32]"
                >
                  {STATUTS.map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => { setModalOpen(false); setForm(FORM_INIT); }}
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

      {toast && (
        <div className="fixed bottom-4 right-4 bg-green-600 text-white rounded-xl px-4 py-2 z-50 text-sm shadow-lg">
          Animal / lot ajouté avec succès
        </div>
      )}
    </div>
  );
}
