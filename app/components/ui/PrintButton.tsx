"use client";

import { Printer } from "lucide-react";

interface PrintButtonProps {
  label?: string;
}

export default function PrintButton({ label = "Imprimer" }: PrintButtonProps) {
  return (
    <button
      onClick={() => window.print()}
      className="border border-gray-200 text-gray-600 rounded-xl px-3 py-2 text-xs flex items-center gap-1.5 hover:bg-gray-50 transition-colors"
    >
      <Printer size={13} />
      {label}
    </button>
  );
}
