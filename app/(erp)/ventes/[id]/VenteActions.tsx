"use client";

export default function VenteActions() {
  return (
    <div className="flex flex-wrap gap-3 print:hidden">
      <button
        onClick={() => window.print()}
        className="px-4 py-2 rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
      >
        Imprimer
      </button>
      <button className="px-4 py-2 rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
        Bon de livraison
      </button>
      <button className="px-4 py-2 rounded-xl bg-[#2E7D32] text-sm font-medium text-white hover:bg-[#256427] transition-colors">
        Facture
      </button>
    </div>
  );
}
