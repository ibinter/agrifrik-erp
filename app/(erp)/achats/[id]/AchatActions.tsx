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
      <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#E65100] text-xs font-medium text-white hover:bg-[#BF360C] transition-colors">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
        Réceptionner les articles
      </button>
    </div>
  );
}
