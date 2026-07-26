"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import type { DocumentDefinition } from "@/lib/pdf/types";

interface FacturePdfButtonProps {
  factureId: string;
}

const FACTURE_ROWS: Record<string, unknown>[] = [
  {
    designation: "Cacao sec fermenté séché Grade AA",
    lot: "LOT-2025-041/043/044/046",
    qte: "3 400 kg",
    pu: "1 087 XOF",
    montant: "3 695 800 XOF",
  },
  {
    designation: "Prime qualité Rainforest Alliance (incluse dans PU)",
    lot: "—",
    qte: "—",
    pu: "Incluse",
    montant: "—",
  },
  {
    designation: "Transport DAP San-Pédro",
    lot: "—",
    qte: "Forfait",
    pu: "—",
    montant: "Inclus",
  },
  {
    designation: "TOTAL TTC",
    lot: "",
    qte: "",
    pu: "",
    montant: "3 695 800 XOF",
  },
];

const DEFINITION: DocumentDefinition = {
  title: "FACTURE N° FAC-2025-008",
  subtitle: "Barry Callebaut Manufacturing CI SAS — Réglée le 08/07/2025",
  documentType: "invoice",
  preferredFormat: "A4",
  preferredOrientation: "portrait",
  language: "fr",
  reference: "FAC-2025-008",
  period: "Émission : 22/06/2025 — Échéance : 07/07/2025",
  company: {
    name: "AGRIFRIK SAS",
    address: "Soubré, Côte d'Ivoire",
    phone: "+225 27 22 27 60 14",
    email: "contact@agrifrik.com",
  },
  columns: [
    { key: "designation", label: "Désignation", type: "name", priority: "essential", flexWeight: 3 },
    { key: "lot", label: "Lot", type: "reference", priority: "secondary" },
    { key: "qte", label: "Quantité", type: "short-text", priority: "important", align: "right" },
    { key: "pu", label: "PU (XOF)", type: "amount", priority: "important", align: "right" },
    { key: "montant", label: "Montant (XOF)", type: "amount", priority: "essential", align: "right" },
  ],
};

export default function FacturePdfButton({ factureId }: FacturePdfButtonProps) {
  const [loading, setLoading] = useState(false);

  async function handleDownload() {
    setLoading(true);
    try {
      const definition: DocumentDefinition = {
        ...DEFINITION,
        title: `FACTURE N° ${factureId.toUpperCase()}`,
        reference: factureId.toUpperCase(),
      };

      const res = await fetch("/api/export/pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ definition, rows: FACTURE_ROWS }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: "Erreur inconnue" }));
        alert(`Erreur PDF : ${err.error ?? res.statusText}`);
        return;
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${factureId.toUpperCase()}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      alert(`Erreur lors de la génération PDF : ${String(err)}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleDownload}
      disabled={loading}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium text-white transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      style={{ background: "#2E7D32" }}
    >
      <Download size={14} />
      {loading ? "Génération…" : "Télécharger PDF"}
    </button>
  );
}
