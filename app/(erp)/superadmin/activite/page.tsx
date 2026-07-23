"use client";

import { Activity, LogIn, LogOut, CreditCard, Key, Ticket, Building2 } from "lucide-react";

const EVENTS = [
  { id: 1, type: "paiement", org: "COOPANACOT", detail: "Paiement Orange Money 39 900 XOF validé", date: "2025-07-20 14:32", icon: CreditCard, color: "#4CAF50" },
  { id: 2, type: "licence", org: "AgriTech Mali", detail: "Essai gratuit démarré (plan starter)", date: "2025-07-18 10:15", icon: Key, color: "#FF9800" },
  { id: 3, type: "inscription", org: "Riziculture Togolaise", detail: "Nouvelle organisation inscrite", date: "2025-04-05 08:00", icon: Building2, color: "#2196F3" },
  { id: 4, type: "voucher", org: "Coop Savane Nord", detail: "Voucher FIDA-GRANT-001 utilisé", date: "2025-04-10 11:30", icon: Ticket, color: "#9C27B0" },
  { id: 5, type: "connexion", org: "CIAGRI Export", detail: "87 connexions utilisateurs aujourd'hui", date: "2025-07-23 07:00", icon: LogIn, color: "#00BCD4" },
  { id: 6, type: "paiement", org: "Coop Savane Nord", detail: "Paiement MTN MoMo 24 900 XOF échoué", date: "2025-07-18 16:44", icon: CreditCard, color: "#F44336" },
  { id: 7, type: "impersonation", org: "Demo IBIG", detail: "Superadmin a impersoné admin@agrifrik.com", date: "2025-07-15 09:12", icon: LogIn, color: "#E65100" },
];

export default function ActivitePage() {
  return (
    <div className="p-6 space-y-5">
      <div>
        <h1 className="text-xl font-bold" style={{ color: "#c8e6c9" }}>Activité plateforme</h1>
        <p className="text-xs" style={{ color: "#4a6a4a" }}>Journal des événements globaux</p>
      </div>

      <div className="space-y-2">
        {EVENTS.map(ev => {
          const Icon = ev.icon;
          return (
            <div key={ev.id} className="flex items-start gap-3 px-4 py-3 rounded-xl" style={{ backgroundColor: "#0D1A0D", border: "1px solid #1a2f1a" }}>
              <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${ev.color}18` }}>
                <Icon size={13} style={{ color: ev.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-medium" style={{ color: "#c8e6c9" }}>{ev.org}</p>
                  <p className="text-[10px]" style={{ color: "#4a6a4a" }}>{ev.date}</p>
                </div>
                <p className="text-[11px] mt-0.5" style={{ color: "#6a8a6a" }}>{ev.detail}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
