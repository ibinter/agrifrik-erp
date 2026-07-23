"use client";

import { Mail, Send, CheckCircle, XCircle, Clock } from "lucide-react";

const DEMO_EMAILS = [
  { id: "1", destinataire: "admin@coopanacot.ci", sujet: "Confirmation de paiement AGRIFRIK", statut: "envoye", date: "2025-07-20 14:32", template: "paiement_confirme" },
  { id: "2", destinataire: "contact@boungou.bf", sujet: "Rappel : votre licence expire dans 14 jours", statut: "envoye", date: "2025-07-19 09:00", template: "expiration_proche" },
  { id: "3", destinataire: "info@agritech.ml", sujet: "Bienvenue sur AGRIFRIK !", statut: "envoye", date: "2025-07-01 10:00", template: "bienvenue" },
  { id: "4", destinataire: "rizi@togo.tg", sujet: "Votre licence AGRIFRIK a expiré", statut: "echoue", date: "2025-04-06 08:00", template: "licence_expiree" },
  { id: "5", destinataire: "coop@savane.sn", sujet: "Relance paiement — votre service est suspendu", statut: "en_attente", date: "2025-07-23 06:00", template: "relance_paiement" },
];

const TEMPLATES = [
  { code: "bienvenue", label: "Bienvenue" },
  { code: "paiement_confirme", label: "Paiement confirmé" },
  { code: "paiement_echoue", label: "Paiement échoué" },
  { code: "licence_activee", label: "Licence activée" },
  { code: "expiration_proche", label: "Expiration proche" },
  { code: "licence_expiree", label: "Licence expirée" },
  { code: "relance_paiement", label: "Relance paiement" },
  { code: "voucher_cree", label: "Voucher créé" },
  { code: "reinitialisation_mdp", label: "Réinit. mot de passe" },
  { code: "invitation_utilisateur", label: "Invitation utilisateur" },
  { code: "rapport_mensuel", label: "Rapport mensuel" },
  { code: "alerte_quota", label: "Alerte quota" },
  { code: "suspension_compte", label: "Suspension compte" },
];

export default function EmailsPage() {
  return (
    <div className="p-6 space-y-5">
      <div>
        <h1 className="text-xl font-bold" style={{ color: "#c8e6c9" }}>Emails transactionnels</h1>
        <p className="text-xs" style={{ color: "#4a6a4a" }}>13 templates · Resend → SMTP → console fallback</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Templates */}
        <div className="rounded-xl p-4" style={{ backgroundColor: "#0D1A0D", border: "1px solid #1a2f1a" }}>
          <p className="text-xs font-semibold mb-3" style={{ color: "#c8e6c9" }}>Templates configurés ({TEMPLATES.length})</p>
          <div className="space-y-1.5">
            {TEMPLATES.map(t => (
              <div key={t.code} className="flex items-center justify-between px-3 py-2 rounded-lg" style={{ backgroundColor: "#111f11" }}>
                <div className="flex items-center gap-2">
                  <Mail size={11} style={{ color: "#4CAF50" }} />
                  <span className="text-xs" style={{ color: "#c8e6c9" }}>{t.label}</span>
                </div>
                <span className="font-mono text-[10px]" style={{ color: "#4a6a4a" }}>{t.code}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Journal récent */}
        <div className="rounded-xl p-4" style={{ backgroundColor: "#0D1A0D", border: "1px solid #1a2f1a" }}>
          <p className="text-xs font-semibold mb-3" style={{ color: "#c8e6c9" }}>Journal récent</p>
          <div className="space-y-2">
            {DEMO_EMAILS.map(e => {
              const Icon = e.statut === "envoye" ? CheckCircle : e.statut === "echoue" ? XCircle : Clock;
              const color = e.statut === "envoye" ? "#4CAF50" : e.statut === "echoue" ? "#F44336" : "#FF9800";
              return (
                <div key={e.id} className="flex items-start gap-2 px-3 py-2 rounded-lg" style={{ backgroundColor: "#111f11" }}>
                  <Icon size={12} style={{ color, marginTop: 2, flexShrink: 0 }} />
                  <div className="min-w-0">
                    <p className="text-xs truncate" style={{ color: "#c8e6c9" }}>{e.destinataire}</p>
                    <p className="text-[10px] truncate" style={{ color: "#4a6a4a" }}>{e.sujet}</p>
                    <p className="text-[10px]" style={{ color: "#4a6a4a" }}>{e.date}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="rounded-xl p-4" style={{ backgroundColor: "#0D1A0D", border: "1px solid #1a2f1a" }}>
        <p className="text-xs font-semibold mb-2" style={{ color: "#c8e6c9" }}>Configuration</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          {[
            { label: "Provider actif", val: process.env.NEXT_PUBLIC_RESEND_FROM ? "Resend" : "SMTP/Console" },
            { label: "From address", val: "noreply@agrifrik.com" },
            { label: "Fallback", val: "Console log" },
            { label: "Mode", val: "Non-bloquant" },
          ].map(item => (
            <div key={item.label} className="p-2 rounded-lg" style={{ backgroundColor: "#111f11" }}>
              <p style={{ color: "#4a6a4a" }}>{item.label}</p>
              <p className="font-medium mt-0.5" style={{ color: "#4CAF50" }}>{item.val}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
