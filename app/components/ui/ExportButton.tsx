"use client";

import { Download } from "lucide-react";

interface ExportButtonProps {
  data: Record<string, unknown>[];
  filename: string;
  label?: string;
}

export default function ExportButton({ data, filename, label = "Exporter CSV" }: ExportButtonProps) {
  function handleExport() {
    if (!data || data.length === 0) return;

    const headers = Object.keys(data[0]);
    const rows = data.map((row) =>
      headers.map((h) => {
        const val = row[h];
        const str = val === null || val === undefined ? "" : String(val);
        // Escape semicolons and quotes
        return str.includes(";") || str.includes('"') || str.includes("\n")
          ? `"${str.replace(/"/g, '""')}"`
          : str;
      }).join(";")
    );

    const csv = [headers.join(";"), ...rows].join("\n");
    const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename.endsWith(".csv") ? filename : `${filename}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <button
      onClick={handleExport}
      className="border border-gray-200 text-gray-600 rounded-xl px-3 py-2 text-xs flex items-center gap-1.5 hover:bg-gray-50 transition-colors"
    >
      <Download size={13} />
      {label}
    </button>
  );
}
