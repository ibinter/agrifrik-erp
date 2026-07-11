"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface ModalEmployeProps {
  isOpen: boolean;
  onClose: () => void;
}

const POSTES = [
  "Technicien agricole",
  "Chef de parcelle",
  "Ouvrier saisonnier",
  "Comptable",
  "Chauffeur",
  "Autre",
];

const ZONES = [
  "Soubré-Zone A",
  "Korhogo-Zone C",
  "Bouaké-Zone D",
  "Aboisso-Zone E",
  "Siège",
];

type TypeContrat = "CDI" | "CDD" | "Saisonnier";

export default function ModalEmploye({ isOpen, onClose }: ModalEmployeProps) {
  const [nomComplet, setNomComplet] = useState("");
  const [poste, setPoste] = useState("");
  const [typeContrat, setTypeContrat] = useState<TypeContrat>("CDI");
  const [dateEmbauche, setDateEmbauche] = useState("");
  const [salaire, setSalaire] = useState("");
  const [telephone, setTelephone] = useState("");
  const [zone, setZone] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: envoyer les données
    onClose();
  }

  if (!isOpen) return null;

  const CONTRATS: TypeContrat[] = ["CDI", "CDD", "Saisonnier"];

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center"
      style={{ background: "rgba(0,0,0,0.5)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-lg mx-4 mt-20 p-6"
        style={{ animation: "modalIn 0.18s ease" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-semibold text-gray-800">
            Ajouter un employé
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nom complet */}
          <div>
            <label className="text-xs font-medium text-gray-600 mb-1 block">
              Nom complet <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              required
              value={nomComplet}
              onChange={(e) => setNomComplet(e.target.value)}
              placeholder="Prénom et nom"
              className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm w-full focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-100"
            />
          </div>

          {/* Poste */}
          <div>
            <label className="text-xs font-medium text-gray-600 mb-1 block">
              Poste <span className="text-red-400">*</span>
            </label>
            <select
              required
              value={poste}
              onChange={(e) => setPoste(e.target.value)}
              className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm w-full bg-white focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-100"
            >
              <option value="">Sélectionner un poste</option>
              {POSTES.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          {/* Type de contrat — radio pills */}
          <div>
            <label className="text-xs font-medium text-gray-600 mb-2 block">
              Type de contrat <span className="text-red-400">*</span>
            </label>
            <div className="flex gap-2">
              {CONTRATS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setTypeContrat(c)}
                  className={`flex-1 py-2 rounded-xl text-sm font-medium border transition-colors ${
                    typeContrat === c
                      ? "bg-[#2E7D32] text-white border-[#2E7D32]"
                      : "border-gray-200 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Date d'embauche + Salaire */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-gray-600 mb-1 block">
                Date d&apos;embauche <span className="text-red-400">*</span>
              </label>
              <input
                type="date"
                required
                value={dateEmbauche}
                onChange={(e) => setDateEmbauche(e.target.value)}
                className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm w-full focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-100"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600 mb-1 block">
                Salaire mensuel <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  required
                  min="0"
                  step="1000"
                  value={salaire}
                  onChange={(e) => setSalaire(e.target.value)}
                  placeholder="0"
                  className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm w-full pr-12 focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-100"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                  XOF
                </span>
              </div>
            </div>
          </div>

          {/* Téléphone */}
          <div>
            <label className="text-xs font-medium text-gray-600 mb-1 block">
              Téléphone
            </label>
            <input
              type="tel"
              value={telephone}
              onChange={(e) => setTelephone(e.target.value)}
              placeholder="+225 00 00 00 00 00"
              className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm w-full focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-100"
            />
          </div>

          {/* Zone d'affectation */}
          <div>
            <label className="text-xs font-medium text-gray-600 mb-1 block">
              Zone d&apos;affectation <span className="text-red-400">*</span>
            </label>
            <select
              required
              value={zone}
              onChange={(e) => setZone(e.target.value)}
              className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm w-full bg-white focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-100"
            >
              <option value="">Sélectionner une zone</option>
              {ZONES.map((z) => (
                <option key={z} value={z}>
                  {z}
                </option>
              ))}
            </select>
          </div>

          {/* Boutons */}
          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="border border-gray-200 text-gray-600 px-4 py-2 rounded-xl text-sm hover:bg-gray-50 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="bg-[#2E7D32] text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-[#256427] transition-colors"
            >
              Ajouter l&apos;employé
            </button>
          </div>
        </form>
      </div>

      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: translateY(-12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
