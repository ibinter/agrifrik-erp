"use client";

import { Settings, Save } from "lucide-react";
import { useState } from "react";

const SECTIONS = [
  {
    title: "Essai gratuit",
    fields: [
      { key: "essai_jours", label: "Durée de l'essai (jours)", type: "number", defaultVal: "14" },
      { key: "essai_plan", label: "Plan par défaut pour l'essai", type: "select", options: ["gratuit", "starter", "pro"], defaultVal: "starter" },
    ],
  },
  {
    title: "Période de grâce",
    fields: [
      { key: "grace_jours", label: "Durée de la grâce (jours)", type: "number", defaultVal: "7" },
    ],
  },
  {
    title: "Notifications email",
    fields: [
      { key: "rappel_14j", label: "Rappel expiration J-14", type: "toggle", defaultVal: "true" },
      { key: "rappel_7j", label: "Rappel expiration J-7", type: "toggle", defaultVal: "true" },
      { key: "rappel_1j", label: "Rappel expiration J-1", type: "toggle", defaultVal: "true" },
      { key: "rapport_hebdo", label: "Rapport hebdo superadmin", type: "toggle", defaultVal: "true" },
    ],
  },
  {
    title: "Sécurité",
    fields: [
      { key: "session_duree", label: "Durée session utilisateur (h)", type: "number", defaultVal: "24" },
      { key: "max_tentatives", label: "Max tentatives connexion", type: "number", defaultVal: "5" },
    ],
  },
];

export default function SuperadminParametresPage() {
  const [saved, setSaved] = useState(false);

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold" style={{ color: "#c8e6c9" }}>Paramètres superadmin</h1>
          <p className="text-xs" style={{ color: "#4a6a4a" }}>Configuration globale de la plateforme IBIG Soft</p>
        </div>
        <button onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2500); }}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold"
          style={{ backgroundColor: "#2E7D32", color: "white" }}>
          <Save size={13} /> {saved ? "Sauvegardé !" : "Sauvegarder"}
        </button>
      </div>

      {SECTIONS.map(sec => (
        <div key={sec.title} className="rounded-xl p-5 space-y-4" style={{ backgroundColor: "#0D1A0D", border: "1px solid #1a2f1a" }}>
          <h3 className="text-sm font-semibold" style={{ color: "#c8e6c9" }}>{sec.title}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sec.fields.map(f => (
              <div key={f.key}>
                <label className="text-xs block mb-1" style={{ color: "#4a6a4a" }}>{f.label}</label>
                {f.type === "toggle" ? (
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" defaultChecked={f.defaultVal === "true"} className="hidden" />
                    <div className="w-10 h-5 rounded-full relative" style={{ backgroundColor: f.defaultVal === "true" ? "#2E7D32" : "#1a2f1a" }}>
                      <div className="w-4 h-4 rounded-full absolute top-0.5 transition-all"
                        style={{ backgroundColor: "white", left: f.defaultVal === "true" ? "1.25rem" : "0.125rem" }} />
                    </div>
                    <span className="text-xs" style={{ color: "#6a8a6a" }}>{f.defaultVal === "true" ? "Activé" : "Désactivé"}</span>
                  </label>
                ) : f.type === "select" ? (
                  <select defaultValue={f.defaultVal}
                    className="w-full rounded-xl px-3 py-2 text-xs outline-none"
                    style={{ backgroundColor: "#111f11", border: "1px solid #1a2f1a", color: "#c8e6c9" }}>
                    {f.options?.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                ) : (
                  <input type={f.type} defaultValue={f.defaultVal}
                    className="w-full rounded-xl px-3 py-2 text-xs outline-none"
                    style={{ backgroundColor: "#111f11", border: "1px solid #1a2f1a", color: "#c8e6c9" }} />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
