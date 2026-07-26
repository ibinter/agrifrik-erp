"use client";

import { useState } from "react";
import { Download, FileSpreadsheet, FileText, ChevronDown } from "lucide-react";
import * as XLSX from "xlsx";

interface ExportButtonProps {
  data: Record<string, unknown>[];
  filename: string;
  label?: string;
  title?: string;
}

export default function ExportButton({
  data,
  filename,
  label = "Exporter",
  title,
}: ExportButtonProps) {
  const [open, setOpen] = useState(false);

  const base = filename.replace(/\.(csv|xlsx|pdf)$/, "");

  function exportExcel() {
    if (!data || data.length === 0) return;
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Données");
    XLSX.writeFile(wb, `${base}.xlsx`);
    setOpen(false);
  }

  function exportCSV() {
    if (!data || data.length === 0) return;
    const headers = Object.keys(data[0]);
    const rows = data.map((row) =>
      headers
        .map((h) => {
          const val = row[h];
          const str = val === null || val === undefined ? "" : String(val);
          return str.includes(";") || str.includes('"') || str.includes("\n")
            ? `"${str.replace(/"/g, '""')}"`
            : str;
        })
        .join(";")
    );
    const csv = [headers.join(";"), ...rows].join("\n");
    const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${base}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    setOpen(false);
  }

  function exportPDF() {
    if (!data || data.length === 0) return;
    const headers = Object.keys(data[0]);
    const rows = data.map((row) =>
      headers.map((h) => {
        const val = row[h];
        return val === null || val === undefined ? "" : String(val);
      })
    );

    const pageTitle = title || base.replace(/-/g, " ").toUpperCase();
    const html = `<!DOCTYPE html><html><head><meta charset="utf-8">
<title>${pageTitle}</title>
<style>
  body { font-family: Arial, sans-serif; font-size: 11px; margin: 20px; color: #111; }
  h1 { font-size: 16px; color: #1B5E20; margin-bottom: 4px; }
  .meta { color: #666; font-size: 10px; margin-bottom: 16px; }
  table { width: 100%; border-collapse: collapse; }
  th { background: #1B5E20; color: white; padding: 7px 10px; text-align: left; font-size: 10px; }
  td { padding: 6px 10px; border-bottom: 1px solid #E5E7EB; font-size: 10px; }
  tr:nth-child(even) td { background: #F8FBF8; }
  @media print { body { margin: 0; } }
</style></head><body>
<h1>${pageTitle}</h1>
<div class="meta">AGRIFRIK ERP &mdash; Export du ${new Date().toLocaleDateString("fr-FR")} &mdash; ${data.length} enregistrement(s)</div>
<table>
<thead><tr>${headers.map((h) => `<th>${h}</th>`).join("")}</tr></thead>
<tbody>${rows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join("")}</tr>`).join("")}</tbody>
</table></body></html>`;

    const win = window.open("", "_blank");
    if (!win) return;
    win.document.write(html);
    win.document.close();
    win.focus();
    setTimeout(() => { win.print(); }, 400);
    setOpen(false);
  }

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setOpen((v) => !v)}
        className="border border-gray-200 text-gray-600 rounded-xl px-3 py-2 text-xs flex items-center gap-1.5 hover:bg-gray-50 transition-colors"
      >
        <Download size={13} />
        {label}
        <ChevronDown size={11} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 mt-1 z-50 bg-white border border-gray-200 rounded-xl shadow-lg py-1 min-w-[140px]">
            <button
              onClick={exportExcel}
              className="w-full flex items-center gap-2 px-3 py-2 text-xs text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <FileSpreadsheet size={13} className="text-green-600" />
              Excel (.xlsx)
            </button>
            <button
              onClick={exportCSV}
              className="w-full flex items-center gap-2 px-3 py-2 text-xs text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <FileText size={13} className="text-blue-500" />
              CSV (.csv)
            </button>
            <button
              onClick={exportPDF}
              className="w-full flex items-center gap-2 px-3 py-2 text-xs text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <FileText size={13} className="text-red-500" />
              PDF (impression)
            </button>
          </div>
        </>
      )}
    </div>
  );
}
