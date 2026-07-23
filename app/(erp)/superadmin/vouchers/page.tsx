"use client";

import { useEffect, useState } from "react";
import { Ticket, Plus, Copy, Trash2, X, Check } from "lucide-react";

interface Voucher {
  id: string;
  code: string;
  plan: string;
  periodicite: string;
  valeur: number;
  statut: string;
  utilise_par: string | null;
  creeLe: string;
  utiliseLe: string | null;
}

export default function VouchersPage() {
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ planCode: "pro", periodicite: "mensuel", prefix: "AGRIFRIK", quantite: "1" });
  const [saving, setSaving] = useState(false);
  const [newCodes, setNewCodes] = useState<string[]>([]);
  const [copied, setCopied] = useState("");

  useEffect(() => {
    fetch("/api/superadmin/vouchers").then(r => r.json()).then(d => {
      setVouchers(d.vouchers ?? []);
      setLoading(false);
    });
  }, []);

  async function createVouchers() {
    setSaving(true);
    const r = await fetch("/api/superadmin/vouchers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, quantite: parseInt(form.quantite) }),
    });
    const d = await r.json();
    setNewCodes(d.codes ?? []);
    setSaving(false);
    if (d.success) {
      setVouchers(prev => [
        ...((d.codes ?? []) as string[]).map((c: string, i: number) => ({
          id: `new-${i}`, code: c, plan: form.planCode, periodicite: form.periodicite, valeur: 0,
          statut: "disponible", utilise_par: null, creeLe: new Date().toISOString().slice(0, 10), utiliseLe: null,
        })),
        ...prev,
      ]);
    }
  }

  function copyCode(code: string) {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(code);
      setTimeout(() => setCopied(""), 2000);
    });
  }

  async function deleteVoucher(id: string) {
    await fetch("/api/superadmin/vouchers", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ voucherId: id }),
    });
    setVouchers(prev => prev.filter(v => v.id !== id));
  }

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold" style={{ color: "#c8e6c9" }}>Vouchers</h1>
          <p className="text-xs" style={{ color: "#4a6a4a" }}>Créer et gérer les codes d'activation</p>
        </div>
        <button onClick={() => { setShowForm(true); setNewCodes([]); }}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold"
          style={{ backgroundColor: "#2E7D32", color: "white" }}>
          <Plus size={13} /> Créer des vouchers
        </button>
      </div>

      {/* Formulaire création */}
      {showForm && (
        <div className="rounded-xl p-5 space-y-4" style={{ backgroundColor: "#0D1A0D", border: "1px solid #1a2f1a" }}>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold" style={{ color: "#c8e6c9" }}>Nouveau(x) voucher(s)</h3>
            <button onClick={() => setShowForm(false)}><X size={14} style={{ color: "#4a6a4a" }} /></button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div>
              <label className="text-xs block mb-1" style={{ color: "#4a6a4a" }}>Plan</label>
              <select value={form.planCode} onChange={e => setForm(p => ({ ...p, planCode: e.target.value }))}
                className="w-full rounded-xl px-3 py-2 text-xs outline-none"
                style={{ backgroundColor: "#111f11", border: "1px solid #1a2f1a", color: "#c8e6c9" }}>
                {["gratuit", "starter", "pro", "business", "enterprise"].map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs block mb-1" style={{ color: "#4a6a4a" }}>Périodicité</label>
              <select value={form.periodicite} onChange={e => setForm(p => ({ ...p, periodicite: e.target.value }))}
                className="w-full rounded-xl px-3 py-2 text-xs outline-none"
                style={{ backgroundColor: "#111f11", border: "1px solid #1a2f1a", color: "#c8e6c9" }}>
                <option value="mensuel">Mensuel</option>
                <option value="annuel">Annuel</option>
              </select>
            </div>
            <div>
              <label className="text-xs block mb-1" style={{ color: "#4a6a4a" }}>Préfixe du code</label>
              <input value={form.prefix} onChange={e => setForm(p => ({ ...p, prefix: e.target.value.toUpperCase() }))}
                className="w-full rounded-xl px-3 py-2 text-xs outline-none"
                style={{ backgroundColor: "#111f11", border: "1px solid #1a2f1a", color: "#c8e6c9" }} />
            </div>
            <div>
              <label className="text-xs block mb-1" style={{ color: "#4a6a4a" }}>Quantité (max 50)</label>
              <input type="number" min="1" max="50" value={form.quantite} onChange={e => setForm(p => ({ ...p, quantite: e.target.value }))}
                className="w-full rounded-xl px-3 py-2 text-xs outline-none"
                style={{ backgroundColor: "#111f11", border: "1px solid #1a2f1a", color: "#c8e6c9" }} />
            </div>
          </div>
          <button onClick={createVouchers} disabled={saving}
            className="px-5 py-2 rounded-xl text-xs font-semibold"
            style={{ backgroundColor: "#2E7D32", color: "white" }}>
            {saving ? "Génération…" : "Générer"}
          </button>

          {newCodes.length > 0 && (
            <div className="space-y-1.5 pt-2">
              <p className="text-xs font-semibold" style={{ color: "#4CAF50" }}>{newCodes.length} code(s) générés :</p>
              {newCodes.map(code => (
                <div key={code} className="flex items-center justify-between px-3 py-2 rounded-lg" style={{ backgroundColor: "#111f11" }}>
                  <span className="font-mono text-xs" style={{ color: "#c8e6c9" }}>{code}</span>
                  <button onClick={() => copyCode(code)} className="ml-2" style={{ color: copied === code ? "#4CAF50" : "#4a6a4a" }}>
                    {copied === code ? <Check size={12} /> : <Copy size={12} />}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tableau */}
      <div className="rounded-xl overflow-hidden" style={{ border: "1px solid #1a2f1a" }}>
        <table className="w-full text-xs">
          <thead>
            <tr style={{ backgroundColor: "#0D1A0D", borderBottom: "1px solid #1a2f1a" }}>
              {["Code", "Plan", "Périodicité", "Statut", "Utilisé par", "Créé le", ""].map(h => (
                <th key={h} className="px-4 py-3 text-left font-medium" style={{ color: "#4a6a4a" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? Array.from({ length: 4 }).map((_, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #0f1f0f" }}>
                {Array.from({ length: 7 }).map((_, j) => (
                  <td key={j} className="px-4 py-3"><div className="h-3 rounded animate-pulse" style={{ backgroundColor: "#1a2f1a", width: "80%" }} /></td>
                ))}
              </tr>
            )) : vouchers.map(v => (
              <tr key={v.id} style={{ borderBottom: "1px solid #0f1f0f" }}>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono" style={{ color: "#c8e6c9" }}>{v.code}</span>
                    <button onClick={() => copyCode(v.code)} style={{ color: copied === v.code ? "#4CAF50" : "#4a6a4a" }}>
                      {copied === v.code ? <Check size={11} /> : <Copy size={11} />}
                    </button>
                  </div>
                </td>
                <td className="px-4 py-3 capitalize" style={{ color: "#6a8a6a" }}>{v.plan}</td>
                <td className="px-4 py-3 capitalize" style={{ color: "#6a8a6a" }}>{v.periodicite}</td>
                <td className="px-4 py-3">
                  <span className="px-2 py-0.5 rounded-full text-xs" style={{
                    backgroundColor: v.statut === "disponible" ? "rgba(76,175,80,0.12)" : "rgba(158,158,158,0.12)",
                    color: v.statut === "disponible" ? "#4CAF50" : "#9E9E9E",
                  }}>
                    {v.statut === "disponible" ? "Disponible" : "Utilisé"}
                  </span>
                </td>
                <td className="px-4 py-3" style={{ color: "#6a8a6a" }}>{v.utilise_par ?? "—"}</td>
                <td className="px-4 py-3" style={{ color: "#6a8a6a" }}>{v.creeLe}</td>
                <td className="px-4 py-3">
                  {v.statut === "disponible" && (
                    <button onClick={() => deleteVoucher(v.id)}
                      className="p-1.5 rounded-lg" style={{ backgroundColor: "rgba(244,67,54,0.1)", color: "#F44336" }}>
                      <Trash2 size={12} />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
