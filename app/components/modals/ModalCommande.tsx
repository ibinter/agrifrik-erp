"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface ModalCommandeProps {
  isOpen: boolean;
  onClose: () => void;
}

const PRODUITS = [
  "Cacao grade A",
  "Cacao grade B",
  "Anacarde",
  "Maïs",
  "Riz",
  "Autre",
];

const INCOTERMS = ["FOB", "CIF", "EXW", "DAP"];

export default function ModalCommande({ isOpen, onClose }: ModalCommandeProps) {
  const [client, setClient] = useState("");
  const [produit, setProduit] = useState("");
  const [quantite, setQuantite] = useState("");
  const [prixUnitaire, setPrixUnitaire] = useState("");
  const [dateLivraison, setDateLivraison] = useState("");
  const [incoterm, setIncoterm] = useState("FOB");
  const [notes, setNotes] = useState("");

  const total =
    quantite && prixUnitaire
      ? (parseFloat(quantite) * parseFloat(prixUnitaire)).toLocaleString(
          "fr-FR"
        )
      : "—";

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
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
            Nouvelle commande client
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Client */}
          <div>
            <label className="text-xs font-medium text-gray-600 mb-1 block">
              Client <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              required
              value={client}
              onChange={(e) => setClient(e.target.value)}
              placeholder="Nom du client ou entreprise"
              className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm w-full focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-100"
            />
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
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          {/* Quantité + Prix unitaire */}
          <div className="grid grid-cols-2 gap-3">
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
                  className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm w-full pr-9 focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-100"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                  kg
                </span>
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600 mb-1 block">
                Prix unitaire <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  required
                  min="0"
                  step="1"
                  value={prixUnitaire}
                  onChange={(e) => setPrixUnitaire(e.target.value)}
                  placeholder="0"
                  className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm w-full pr-16 focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-100"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 whitespace-nowrap">
                  XOF/kg
                </span>
              </div>
            </div>
          </div>

          {/* Total calculé */}
          <div className="bg-green-50 border border-green-100 rounded-xl px-4 py-3 flex items-center justify-between">
            <span className="text-xs font-medium text-gray-600">
              Total estimé
            </span>
            <span className="text-sm font-semibold text-[#2E7D32]">
              {total !== "—" ? `${total} XOF` : "—"}
            </span>
          </div>

          {/* Date livraison + Incoterm */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-gray-600 mb-1 block">
                Date de livraison souhaitée
              </label>
              <input
                type="date"
                value={dateLivraison}
                onChange={(e) => setDateLivraison(e.target.value)}
                className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm w-full focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-100"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600 mb-1 block">
                Incoterm
              </label>
              <select
                value={incoterm}
                onChange={(e) => setIncoterm(e.target.value)}
                className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm w-full bg-white focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-100"
              >
                {INCOTERMS.map((i) => (
                  <option key={i} value={i}>
                    {i}
                  </option>
                ))}
              </select>
            </div>
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
              placeholder="Conditions particulières, remarques..."
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
              Créer la commande
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
