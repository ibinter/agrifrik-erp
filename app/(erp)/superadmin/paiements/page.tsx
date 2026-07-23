"use client";

import { useEffect, useState } from "react";
import { CreditCard, Check, X } from "lucide-react";

interface Paiement {
  id: string;
  org: string;
  email: string;
  montant: number;
  methode: string;
  statut: string;
  date: string;
  reference: string;
  plan: string;
}

const DEMO_PAY: Paiement[] = [
  { id: "1", org: "COOPANACOT", email: "admin@coopanacot.ci", montant: 39900, methode: "Orange Money", statut: "valide", date: "2025-07-20", reference: "OM-20250720-001", plan: "business" },
  { id: "2", org: "Ferme Boungou", email: "contact@boungou.bf", montant: 24900, methode: "Wave", statut: "en_attente", date: "2025-07-22", reference: "WAVE-20250722-042", plan: "pro" },
  { id: "3", org: "AgriTech Mali", email: "info@agritech.ml", montant: 9900, methode: "Virement", statut: "en_attente", date: "2025-07-21", reference: "VIR-20250721-007", plan: "starter" },
  { id: "4", org: "Coop Savane Nord", email: "coop@savane.sn", montant: 24900, methode: "MTN MoMo", statut: "echoue", date: "2025-07-18", reference: "MTN-20250718-033", plan: "pro" },
  { id: "5", org: "CIAGRI Export", email: "admin@ciagri.ci", montant: 99900, methode: "Stripe", statut: "valide", date: "2025-07-01", reference: "STR-20250701-PI-001", plan: "enterprise" },
  { id: "6", org: "Hacienda Verde", email: "admin@hacienda.cm", montant: 39900, methode: "CinetPay", statut: "valide", date: "2025-06-28", reference: "CP-20250628-8821", plan: "business" },
];

const STATUT: Record<string, { label: string; color: string; bg: string }> = {
  valide:      { label: "Validé",      color: "#4CAF50", bg: "rgba(76,175,80,0.12)" },
  en_attente:  { label: "En attente",  color: "#FF9800", bg: "rgba(255,152,0,0.12)" },
  echoue:      { label: "Échoué",      color: "#F44336", bg: "rgba(244,67,54,0.12)" },
  rembourse:   { label: "Remboursé",   color: "#9E9E9E", bg: "rgba(158,158,158,0.12)" },
};

export default function PaiementsPage() {
  const [paiements, setPaiements] = useState<Paiement[]>(DEMO_PAY);
  const [filter, setFilter] = useState("tous");
  const [toast, setToast] = useState("");

  const filtered = filter === "tous" ? paiements : paiements.filter(p => p.statut === filter);

  async function valider(id: string) {
    const r = await fetch("/api/paiements/valider", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paiementId: id }),
    });
    if (r.ok) {
      setPaiements(prev => prev.map(p => p.id === id ? { ...p, statut: "valide" } : p));
      setToast("Paiement validé avec succès");
      setTimeout(() => setToast(""), 3000);
    }
  }

  const totalMRR = paiements.filter(p => p.statut === "valide").reduce((s, p) => s + p.montant, 0);
  const enAttente = paiements.filter(p => p.statut === "en_attente").length;

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold" style={{ color: "#c8e6c9" }}>Paiements globaux</h1>
          <p className="text-xs" style={{ color: "#4a6a4a" }}>
            {new Intl.NumberFormat("fr-FR").format(totalMRR)} XOF collectés · {enAttente} en attente de validation
          </p>
        </div>
        <div className="flex gap-2">
          {["tous", "valide", "en_attente", "echoue"].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className="px-3 py-1.5 rounded-lg text-xs capitalize"
              style={{
                backgroundColor: filter === f ? "rgba(76,175,80,0.15)" : "#0D1A0D",
                color: filter === f ? "#4CAF50" : "#4a6a4a",
                border: `1px solid ${filter === f ? "rgba(76,175,80,0.3)" : "#1a2f1a"}`,
              }}>
              {f === "tous" ? "Tous" : STATUT[f]?.label ?? f}
            </button>
          ))}
        </div>
      </div>

      {toast && (
        <div className="rounded-xl px-4 py-2.5 text-xs font-medium" style={{ backgroundColor: "rgba(76,175,80,0.15)", color: "#4CAF50", border: "1px solid rgba(76,175,80,0.3)" }}>
          {toast}
        </div>
      )}

      <div className="rounded-xl overflow-hidden" style={{ border: "1px solid #1a2f1a" }}>
        <table className="w-full text-xs">
          <thead>
            <tr style={{ backgroundColor: "#0D1A0D", borderBottom: "1px solid #1a2f1a" }}>
              {["Organisation", "Plan", "Montant", "Méthode", "Référence", "Date", "Statut", "Actions"].map(h => (
                <th key={h} className="px-4 py-3 text-left font-medium" style={{ color: "#4a6a4a" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => {
              const s = STATUT[p.statut] ?? STATUT.en_attente;
              return (
                <tr key={p.id} style={{ borderBottom: "1px solid #0f1f0f" }}>
                  <td className="px-4 py-3">
                    <p className="font-medium" style={{ color: "#c8e6c9" }}>{p.org}</p>
                    <p style={{ color: "#4a6a4a" }}>{p.email}</p>
                  </td>
                  <td className="px-4 py-3 capitalize" style={{ color: "#6a8a6a" }}>{p.plan}</td>
                  <td className="px-4 py-3 font-semibold" style={{ color: "#4CAF50", fontVariantNumeric: "tabular-nums" }}>
                    {new Intl.NumberFormat("fr-FR").format(p.montant)} XOF
                  </td>
                  <td className="px-4 py-3" style={{ color: "#6a8a6a" }}>{p.methode}</td>
                  <td className="px-4 py-3 font-mono text-[11px]" style={{ color: "#4a6a4a" }}>{p.reference}</td>
                  <td className="px-4 py-3" style={{ color: "#6a8a6a" }}>{p.date}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 rounded-full" style={{ color: s.color, backgroundColor: s.bg }}>{s.label}</span>
                  </td>
                  <td className="px-4 py-3">
                    {p.statut === "en_attente" && (
                      <button onClick={() => valider(p.id)}
                        className="flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-medium"
                        style={{ backgroundColor: "rgba(76,175,80,0.1)", color: "#4CAF50", border: "1px solid rgba(76,175,80,0.2)" }}>
                        <Check size={11} /> Valider
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
