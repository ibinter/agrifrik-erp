"use client";

import { useState } from "react";
import { PLANS, Plan } from "../../../../lib/plans";
import { Check, Edit2, Save, X } from "lucide-react";

export default function PlansPage() {
  const [editId, setEditId] = useState<string | null>(null);
  const [draft, setDraft] = useState<Partial<Plan>>({});
  const [saved, setSaved] = useState<string | null>(null);

  function startEdit(p: Plan) {
    setEditId(p.code);
    setDraft({ ...p });
  }

  function save() {
    setSaved(editId);
    setEditId(null);
    setTimeout(() => setSaved(null), 2000);
    // En production : POST /api/superadmin/plans avec draft
  }

  return (
    <div className="p-6 space-y-5">
      <div>
        <h1 className="text-xl font-bold" style={{ color: "#c8e6c9" }}>Plans tarifaires</h1>
        <p className="text-xs" style={{ color: "#4a6a4a" }}>
          Configurer les plans et tarifs (modifications reflétées en prod après déploiement)
        </p>
      </div>

      {saved && (
        <div className="rounded-xl px-4 py-2.5 text-xs font-medium" style={{ backgroundColor: "rgba(76,175,80,0.15)", color: "#4CAF50", border: "1px solid rgba(76,175,80,0.3)" }}>
          Plan «{saved}» mis à jour (mode démo — modifiez lib/plans.ts pour persister)
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {PLANS.map((plan) => {
          const isEditing = editId === plan.code;
          const p = isEditing ? { ...plan, ...draft } : plan;

          return (
            <div key={plan.code} className="rounded-xl p-5 space-y-4" style={{ backgroundColor: "#0D1A0D", border: "1px solid #1a2f1a" }}>
              <div className="flex items-center justify-between">
                <div>
                  {isEditing ? (
                    <input value={draft.nom ?? plan.nom} onChange={e => setDraft(d => ({ ...d, nom: e.target.value }))}
                      className="rounded-lg px-2 py-1 text-sm font-bold outline-none"
                      style={{ backgroundColor: "#111f11", border: "1px solid #1a2f1a", color: "#c8e6c9" }} />
                  ) : (
                    <h3 className="font-bold text-sm" style={{ color: "#c8e6c9" }}>{plan.nom}</h3>
                  )}
                  <p className="text-[10px] mt-0.5 capitalize" style={{ color: "#4a6a4a" }}>Code : {plan.code}</p>
                </div>
                <div className="flex gap-1">
                  {isEditing ? (
                    <>
                      <button onClick={save} className="p-1.5 rounded-lg" style={{ backgroundColor: "rgba(76,175,80,0.1)", color: "#4CAF50" }}><Save size={12} /></button>
                      <button onClick={() => setEditId(null)} className="p-1.5 rounded-lg" style={{ backgroundColor: "rgba(244,67,54,0.1)", color: "#F44336" }}><X size={12} /></button>
                    </>
                  ) : (
                    <button onClick={() => startEdit(plan)} className="p-1.5 rounded-lg" style={{ backgroundColor: "rgba(33,150,243,0.1)", color: "#2196F3" }}><Edit2 size={12} /></button>
                  )}
                </div>
              </div>

              {/* Tarifs */}
              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-lg p-2" style={{ backgroundColor: "#111f11" }}>
                  <p className="text-[10px] mb-1" style={{ color: "#4a6a4a" }}>Mensuel (XOF)</p>
                  {isEditing ? (
                    <input type="number" value={draft.prixMensuel ?? plan.prixMensuel}
                      onChange={e => setDraft(d => ({ ...d, prixMensuel: parseInt(e.target.value) }))}
                      className="w-full text-sm font-bold outline-none bg-transparent"
                      style={{ color: "#4CAF50" }} />
                  ) : (
                    <p className="text-sm font-bold" style={{ color: "#4CAF50" }}>
                      {plan.prixMensuel === 0 ? "Gratuit" : new Intl.NumberFormat("fr-FR").format(plan.prixMensuel)}
                    </p>
                  )}
                </div>
                <div className="rounded-lg p-2" style={{ backgroundColor: "#111f11" }}>
                  <p className="text-[10px] mb-1" style={{ color: "#4a6a4a" }}>Annuel (XOF)</p>
                  {isEditing ? (
                    <input type="number" value={draft.prixAnnuel ?? plan.prixAnnuel}
                      onChange={e => setDraft(d => ({ ...d, prixAnnuel: parseInt(e.target.value) }))}
                      className="w-full text-sm font-bold outline-none bg-transparent"
                      style={{ color: "#FF9800" }} />
                  ) : (
                    <p className="text-sm font-bold" style={{ color: "#FF9800" }}>
                      {plan.prixAnnuel === 0 ? "Gratuit" : new Intl.NumberFormat("fr-FR").format(plan.prixAnnuel)}
                    </p>
                  )}
                </div>
              </div>

              {/* Limites */}
              <div className="space-y-1.5">
                {[{ label: "Max utilisateurs", key: "maxUtilisateurs" as keyof Plan }].map(({ label, key }) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="text-[11px]" style={{ color: "#6a8a6a" }}>{label}</span>
                    {isEditing ? (
                      <input type="number" value={(draft[key] as number | undefined) ?? (plan[key] as number)}
                        onChange={e => setDraft(d => ({ ...d, [key]: parseInt(e.target.value) }))}
                        className="w-16 text-right text-[11px] rounded px-1 outline-none"
                        style={{ backgroundColor: "#111f11", border: "1px solid #1a2f1a", color: "#c8e6c9" }} />
                    ) : (
                      <span className="text-[11px] font-semibold" style={{ color: "#c8e6c9" }}>
                        {(plan[key] as number) === 999 ? "Illimité" : String(plan[key])}
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {/* Modules inclus */}
              <div>
                <p className="text-[10px] mb-1.5" style={{ color: "#4a6a4a" }}>
                  Modules inclus ({plan.modulesInclus.length})
                </p>
                <div className="flex flex-wrap gap-1">
                  {plan.modulesInclus.slice(0, 6).map(m => (
                    <span key={m} className="px-1.5 py-0.5 rounded text-[10px]" style={{ backgroundColor: "rgba(76,175,80,0.1)", color: "#4CAF50" }}>
                      {m}
                    </span>
                  ))}
                  {plan.modulesInclus.length > 6 && (
                    <span className="text-[10px]" style={{ color: "#4a6a4a" }}>+{plan.modulesInclus.length - 6}</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
