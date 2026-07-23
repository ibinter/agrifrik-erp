"use client";

import { useEffect, useState } from "react";
import { Key, Plus, CalendarPlus, Pause, Play, X } from "lucide-react";

interface Licence {
  id: string;
  org: string;
  plan: string;
  statut: string;
  dateFin: string;
  joursRestants: number;
  mrr: number;
  periodicite: string | null;
}

const STATUT_STYLE: Record<string, { label: string; color: string }> = {
  actif:    { label: "Actif",    color: "#4CAF50" },
  essai:    { label: "Essai",    color: "#FF9800" },
  grace:    { label: "Grâce",    color: "#FF5722" },
  expire:   { label: "Expiré",   color: "#F44336" },
  suspendu: { label: "Suspendu", color: "#9E9E9E" },
};

type ModalAction = { type: "activer" | "prolonger" | "suspendre"; orgId: string; orgNom: string } | null;

export default function LicencesPage() {
  const [licences, setLicences] = useState<Licence[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<ModalAction>(null);
  const [duree, setDuree] = useState("30");
  const [plan, setPlan] = useState("pro");
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => {
    fetch("/api/superadmin/licences").then(r => r.json()).then(d => {
      setLicences(d.licences ?? []);
      setLoading(false);
    });
  }, []);

  async function applyAction() {
    if (!modal) return;
    setSaving(true);
    await fetch("/api/superadmin/licences", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orgId: modal.orgId, action: modal.type, planCode: plan, dureeJours: parseInt(duree) }),
    });
    setSaving(false);
    setModal(null);
    setToast(`Action "${modal.type}" appliquée avec succès (démo)`);
    setTimeout(() => setToast(""), 3000);
  }

  return (
    <div className="p-6 space-y-5">
      <div>
        <h1 className="text-xl font-bold" style={{ color: "#c8e6c9" }}>Gestion des licences</h1>
        <p className="text-xs" style={{ color: "#4a6a4a" }}>Activer, prolonger, suspendre les licences client</p>
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
              {["Organisation", "Plan", "Statut", "Fin", "Jours restants", "MRR", "Périodicité", "Actions"].map(h => (
                <th key={h} className="px-4 py-3 text-left font-medium" style={{ color: "#4a6a4a" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? Array.from({ length: 5 }).map((_, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #0f1f0f" }}>
                {Array.from({ length: 8 }).map((_, j) => (
                  <td key={j} className="px-4 py-3"><div className="h-3 rounded animate-pulse" style={{ backgroundColor: "#1a2f1a", width: "70%" }} /></td>
                ))}
              </tr>
            )) : licences.map(l => {
              const s = STATUT_STYLE[l.statut] ?? STATUT_STYLE.expire;
              const urgence = l.joursRestants >= 0 && l.joursRestants <= 14;
              return (
                <tr key={l.id} style={{ borderBottom: "1px solid #0f1f0f" }}>
                  <td className="px-4 py-3 font-medium" style={{ color: "#c8e6c9" }}>{l.org}</td>
                  <td className="px-4 py-3 capitalize" style={{ color: "#6a8a6a" }}>{l.plan}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 rounded-full" style={{ color: s.color, backgroundColor: `${s.color}18` }}>{s.label}</span>
                  </td>
                  <td className="px-4 py-3" style={{ color: "#6a8a6a" }}>{l.dateFin}</td>
                  <td className="px-4 py-3" style={{ color: urgente(l.joursRestants) }}>
                    {l.joursRestants >= 0 ? `${l.joursRestants} j` : `Expiré il y a ${Math.abs(l.joursRestants)} j`}
                  </td>
                  <td className="px-4 py-3" style={{ color: "#4CAF50" }}>
                    {l.mrr > 0 ? new Intl.NumberFormat("fr-FR").format(l.mrr) + " XOF" : "—"}
                  </td>
                  <td className="px-4 py-3 capitalize" style={{ color: "#6a8a6a" }}>{l.periodicite ?? "—"}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <button onClick={() => { setModal({ type: "prolonger", orgId: l.id, orgNom: l.org }); setDuree("30"); }}
                        className="p-1.5 rounded-lg" style={{ backgroundColor: "rgba(33,150,243,0.1)", color: "#2196F3" }} title="Prolonger">
                        <CalendarPlus size={12} />
                      </button>
                      {l.statut !== "suspendu" && l.statut !== "expire" ? (
                        <button onClick={() => setModal({ type: "suspendre", orgId: l.id, orgNom: l.org })}
                          className="p-1.5 rounded-lg" style={{ backgroundColor: "rgba(244,67,54,0.1)", color: "#F44336" }} title="Suspendre">
                          <Pause size={12} />
                        </button>
                      ) : (
                        <button onClick={() => { setModal({ type: "activer", orgId: l.id, orgNom: l.org }); setDuree("30"); setPlan(l.plan); }}
                          className="p-1.5 rounded-lg" style={{ backgroundColor: "rgba(76,175,80,0.1)", color: "#4CAF50" }} title="Activer">
                          <Play size={12} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 flex items-center justify-center z-50" style={{ backgroundColor: "rgba(0,0,0,0.7)" }}>
          <div className="rounded-2xl p-6 w-80 space-y-4" style={{ backgroundColor: "#0D1A0D", border: "1px solid #1a2f1a" }}>
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm" style={{ color: "#c8e6c9" }}>
                {modal.type === "activer" ? "Activer" : modal.type === "prolonger" ? "Prolonger" : "Suspendre"} — {modal.orgNom}
              </h3>
              <button onClick={() => setModal(null)}><X size={14} style={{ color: "#4a6a4a" }} /></button>
            </div>

            {(modal.type === "activer" || modal.type === "prolonger") && (
              <>
                <div>
                  <label className="text-xs block mb-1" style={{ color: "#4a6a4a" }}>Durée (jours)</label>
                  <input type="number" value={duree} onChange={e => setDuree(e.target.value)} min="1"
                    className="w-full rounded-xl px-3 py-2 text-xs outline-none"
                    style={{ backgroundColor: "#111f11", border: "1px solid #1a2f1a", color: "#c8e6c9" }} />
                </div>
                {modal.type === "activer" && (
                  <div>
                    <label className="text-xs block mb-1" style={{ color: "#4a6a4a" }}>Plan</label>
                    <select value={plan} onChange={e => setPlan(e.target.value)}
                      className="w-full rounded-xl px-3 py-2 text-xs outline-none"
                      style={{ backgroundColor: "#111f11", border: "1px solid #1a2f1a", color: "#c8e6c9" }}>
                      {["gratuit", "starter", "pro", "business", "enterprise"].map(p => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                  </div>
                )}
              </>
            )}

            {modal.type === "suspendre" && (
              <p className="text-xs" style={{ color: "#FF5722" }}>Cette organisation sera suspendue immédiatement. Ses utilisateurs ne pourront plus se connecter.</p>
            )}

            <div className="flex gap-2 pt-1">
              <button onClick={() => setModal(null)} className="flex-1 py-2 rounded-xl text-xs" style={{ backgroundColor: "#111f11", color: "#6a8a6a", border: "1px solid #1a2f1a" }}>
                Annuler
              </button>
              <button onClick={applyAction} disabled={saving} className="flex-1 py-2 rounded-xl text-xs font-semibold" style={{ backgroundColor: modal.type === "suspendre" ? "#F44336" : "#2E7D32", color: "white" }}>
                {saving ? "…" : "Confirmer"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function urgente(jours: number): string {
  if (jours < 0) return "#F44336";
  if (jours <= 7) return "#FF5722";
  if (jours <= 14) return "#FF9800";
  return "#6a8a6a";
}
