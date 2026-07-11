"use client";

export default function AchatActions() {
  return (
    <div className="flex flex-wrap gap-3 print:hidden">
      <button
        onClick={() => window.print()}
        className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
      >
        Imprimer
      </button>
      <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
        Télécharger PDF
      </button>
      <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#2E7D32] text-sm font-medium text-white hover:bg-[#256427] transition-colors">
        Approuver
      </button>
      <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-red-200 bg-white text-sm font-medium text-red-600 hover:bg-red-50 transition-colors">
        Annuler BC
      </button>
    </div>
  );
}
