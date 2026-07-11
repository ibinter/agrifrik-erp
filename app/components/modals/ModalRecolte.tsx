"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface ModalRecolteProps {
  isOpen: boolean;
  onClose: () => void;
}

const PARCELLES = [
  { id: "PAR-A1", label: "PAR-A1 Soubré", culture: "Cacao" },
  { id: "PAR-A2", label: "PAR-A2 Soubré", culture: "Cacao" },
  { id: "PAR-A3", label: "PAR-A3 Soubré", culture: "Café" },
  { id: "PAR-C1", label: "PAR-C1 Korhogo", culture: "Anacarde" },
  { id: "PAR-C2", label: "PAR-C2 Korhogo", culture: "Maïs" },
  { id: "PAR-D1", label: "PAR-D1 Bouaké", culture: "Riz" },
];

const today = new Date().toISOString().split("T")[0];

export default function ModalRecolte({ isOpen, onClose }: ModalRecolteProps) {
  const [parcelle, setParcelle] = useState("");
  const [dateRecolte, setDateRecolte] = useState(today);
  const [quantite, setQuantite] = useState("");
  const [qualite, setQualite] = useState("Grade A");
  const [operateur, setOperateur] = useState("");
  const [notes, setNotes] = useState("");

  const cultureDeduire =
    PARCELLES.find((p) => p.id === parcelle)?.culture ?? "—";

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: envoyer les données
    onClose();
  }

  if (!isOpen) return null;

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
            Enregistrer une récolte
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Parcelle */}
          <div>
            <label className="text-xs font-medium text-gray-600 mb-1 block">
              Parcelle <span className="text-red-400">*</span>
            </label>
            <select
              required
              value={parcelle}
              onChange={(e) => setParcelle(e.target.value)}
              className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm w-full bg-white focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-100"
            >
              <option value="">Sélectionner une parcelle</option>
              {PARCELLES.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>

          {/* Date + Culture */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-gray-600 mb-1 block">
                Date de récolte <span className="text-red-400">*</span>
              </label>
              <input
                type="date"
                required
                value={dateRecolte}
                onChange={(e) => setDateRecolte(e.target.value)}
                className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm w-full focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-100"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600 mb-1 block">
                Culture
              </label>
              <input
                type="text"
                readOnly
                value={cultureDeduire}
                className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm w-full bg-gray-50 text-gray-500 cursor-not-allowed"
              />
            </div>
          </div>

          {/* Quantité + Qualité */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-gray-600 mb-1 block">
                Quantité récoltée <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  required
                  min="0"
                  step="0.1"
                  value={quantite}
                  onChange={(e) => setQuantite(e.target.value)}
                  placeholder="0"
                  className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm w-full pr-10 focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-100"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                  kg
                </span>
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600 mb-1 block">
                Qualité
              </label>
              <select
                value={qualite}
                onChange={(e) => setQualite(e.target.value)}
                className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm w-full bg-white focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-100"
              >
                <option>Grade A</option>
                <option>Grade B</option>
                <option>Standard</option>
              </select>
            </div>
          </div>

          {/* Opérateur */}
          <div>
            <label className="text-xs font-medium text-gray-600 mb-1 block">
              Opérateur
            </label>
            <input
              type="text"
              value={operateur}
              onChange={(e) => setOperateur(e.target.value)}
              placeholder="Nom de l'opérateur"
              className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm w-full focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-100"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="text-xs font-medium text-gray-600 mb-1 block">
              Notes <span className="text-gray-400">(optionnel)</span>
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Remarques sur la récolte..."
              className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm w-full resize-none focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-100"
            />
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
              Enregistrer
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
