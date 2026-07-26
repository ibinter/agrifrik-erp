"use client";

import { useState } from "react";

type ModalFactureProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: { client: string; montantHT: number; tva: number; dateEcheance: string }) => void;
};

export default function ModalFacture({ open, onClose, onSubmit }: ModalFactureProps) {
  const [client, setClient] = useState("");
  const [montantHT, setMontantHT] = useState("");
  const [tva, setTva] = useState(18);
  const [dateEcheance, setDateEcheance] = useState("");

  if (!open) return null;

  const ht = parseFloat(montantHT) || 0;
  const ttc = ht * (1 + tva / 100);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit({ client, montantHT: ht, tva, dateEcheance });
    setClient("");
    setMontantHT("");
    setTva(18);
    setDateEcheance("");
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4 shadow-xl">
        <h2 className="text-base font-semibold text-gray-900 mb-4">Créer une facture</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Client</label>
            <input
              type="text"
              required
              value={client}
              onChange={(e) => setClient(e.target.value)}
              className="w-full border border-gray-200 rounded-xl text-sm px-3 py-2 outline-none focus:border-[#2E7D32]"
              placeholder="Nom du client"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Montant HT (XOF)</label>
            <input
              type="number"
              required
              min={0}
              step="0.01"
              value={montantHT}
              onChange={(e) => setMontantHT(e.target.value)}
              className="w-full border border-gray-200 rounded-xl text-sm px-3 py-2 outline-none focus:border-[#2E7D32]"
              placeholder="Montant hors taxes"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">TVA %</label>
            <select
              value={tva}
              onChange={(e) => setTva(Number(e.target.value))}
              className="w-full border border-gray-200 rounded-xl text-sm px-3 py-2 outline-none focus:border-[#2E7D32]"
            >
              <option value={0}>0%</option>
              <option value={10}>10%</option>
              <option value={18}>18%</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Date d'échéance</label>
            <input
              type="date"
              required
              value={dateEcheance}
              onChange={(e) => setDateEcheance(e.target.value)}
              className="w-full border border-gray-200 rounded-xl text-sm px-3 py-2 outline-none focus:border-[#2E7D32]"
            />
          </div>
          {ht > 0 && (
            <div className="rounded-xl bg-[#F8FBF8] border border-gray-100 px-4 py-3 flex items-center justify-between">
              <span className="text-xs text-gray-500">Montant TTC</span>
              <span className="text-sm font-bold text-[#1B5E20]">
                {ttc.toLocaleString("fr-FR", { minimumFractionDigits: 0, maximumFractionDigits: 0 })} XOF
              </span>
            </div>
          )}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-gray-200 text-gray-700 rounded-xl text-xs font-medium px-3 py-2 hover:bg-gray-50 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="flex-1 bg-[#2E7D32] text-white rounded-xl text-xs font-medium px-3 py-2 hover:bg-[#1B5E20] transition-colors"
            >
              Créer la facture
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
