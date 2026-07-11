"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface ModalDepenseStockProps {
  isOpen: boolean;
  onClose: () => void;
}

type TypeMouvement = "Entrée" | "Sortie" | "Transfert";

const PRODUITS = [
  { label: "Cacao grade A", unite: "kg" },
  { label: "Cacao grade B", unite: "kg" },
  { label: "Anacarde", unite: "kg" },
  { label: "Maïs", unite: "kg" },
  { label: "Riz", unite: "kg" },
  { label: "Engrais NPK", unite: "kg" },
  { label: "Pesticide", unite: "L" },
  { label: "Sacs d'emballage", unite: "unités" },
  { label: "Carburant", unite: "L" },
];

const ENTREPOTS = [
  "Entrepôt Soubré",
  "Entrepôt Korhogo",
  "Entrepôt Bouaké",
  "Entrepôt Abidjan",
];

const today = new Date().toISOString().split("T")[0];

export default function ModalDepenseStock({
  isOpen,
  onClose,
}: ModalDepenseStockProps) {
  const [typeMouvement, setTypeMouvement] = useState<TypeMouvement>("Entrée");
  const [produit, setProduit] = useState("");
  const [quantite, setQuantite] = useState("");
  const [entrepotSource, setEntrepotSource] = useState("");
  const [entrepotDest, setEntrepotDest] = useState("");
  const [referenceBL, setReferenceBL] = useState("");
  const [date, setDate] = useState(today);

  const unite =
    PRODUITS.find((p) => p.label === produit)?.unite ?? "kg";

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onClose();
  }

  if (!isOpen) return null;

  const TYPES: TypeMouvement[] = ["Entrée", "Sortie", "Transfert"];

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
            Mouvement de stock
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Type mouvement — radio pills */}
          <div>
            <label className="text-xs font-medium text-gray-600 mb-2 block">
              Type de mouvement <span className="text-red-400">*</span>
            </label>
            <div className="flex gap-2">
              {TYPES.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTypeMouvement(t)}
                  className={`flex-1 py-2 rounded-xl text-sm font-medium border transition-colors ${
                    typeMouvement === t
                      ? t === "Entrée"
                        ? "bg-[#2E7D32] text-white border-[#2E7D32]"
                        : t === "Sortie"
                        ? "bg-red-600 text-white border-red-600"
                        : "bg-blue-600 text-white border-blue-600"
                      : "border-gray-200 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Produit */}
          <div>
            <label className="text-xs font-medium text-gray-600 mb-1 block">
              Produit <span className="text-red-400">*</span>
            </label>
            <select
              required
              value={produit}
              onChange={(e) => setProduit(e.target.value)}
              className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm w-full bg-white focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-100"
            >
              <option value="">Sélectionner un produit</option>
              {PRODUITS.map((p) => (
                <option key={p.label} value={p.label}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>

          {/* Quantité */}
          <div>
            <label className="text-xs font-medium text-gray-600 mb-1 block">
              Quantité <span className="text-red-400">*</span>
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
                className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm w-full pr-16 focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-100"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                {unite}
              </span>
            </div>
          </div>

          {/* Entrepôt source */}
          <div>
            <label className="text-xs font-medium text-gray-600 mb-1 block">
              {typeMouvement === "Entrée"
                ? "Entrepôt de destination"
                : "Entrepôt source"}{" "}
              <span className="text-red-400">*</span>
            </label>
            <select
              required
              value={entrepotSource}
              onChange={(e) => setEntrepotSource(e.target.value)}
              className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm w-full bg-white focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-100"
            >
              <option value="">Sélectionner un entrepôt</option>
              {ENTREPOTS.map((e) => (
                <option key={e} value={e}>
                  {e}
                </option>
              ))}
            </select>
          </div>

          {/* Entrepôt destination — uniquement si Transfert */}
          {typeMouvement === "Transfert" && (
            <div>
              <label className="text-xs font-medium text-gray-600 mb-1 block">
                Entrepôt de destination <span className="text-red-400">*</span>
              </label>
              <select
                required
                value={entrepotDest}
                onChange={(e) => setEntrepotDest(e.target.value)}
                className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm w-full bg-white focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-100"
              >
                <option value="">Sélectionner un entrepôt</option>
                {ENTREPOTS.filter((e) => e !== entrepotSource).map((e) => (
                  <option key={e} value={e}>
                    {e}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Référence BL + Date */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-gray-600 mb-1 block">
                Référence BL/Bon
              </label>
              <input
                type="text"
                value={referenceBL}
                onChange={(e) => setReferenceBL(e.target.value)}
                placeholder="BL-2025-001"
                className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm w-full focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-100"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600 mb-1 block">
                Date <span className="text-red-400">*</span>
              </label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm w-full focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-100"
              />
            </div>
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
              Valider le mouvement
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
