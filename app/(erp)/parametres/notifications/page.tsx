"use client";

import { useState } from "react";
import Link from "next/link";
import Topbar from "../../../components/Topbar";
import { User, Lock, Palette, Link2, Bell } from "lucide-react";

// ── Navigation latérale ─────────────────────────────────────────────────────

const NAV_ITEMS = [
  { label: "Mon profil",    href: "/parametres/profil",        icon: User,    active: false },
  { label: "Sécurité",      href: "/parametres/securite",      icon: Lock,    active: false },
  { label: "Préférences",   href: "/parametres/preferences",   icon: Palette, active: false },
  { label: "Intégrations",  href: "/parametres/integrations",  icon: Link2,   active: false },
  { label: "Notifications", href: "/parametres/notifications", icon: Bell,    active: true  },
];

// ── Données initiales ────────────────────────────────────────────────────────

type Channel = { id: string; emoji: string; label: string; detail: string; enabled: boolean };

const INITIAL_CHANNELS: Channel[] = [
  { id: "app",     emoji: "📱", label: "Notifications in-app", detail: "Badge + son",                enabled: true  },
  { id: "email",   emoji: "📧", label: "Email",                detail: "Résumé quotidien à 08h00",   enabled: true  },
  { id: "sms",     emoji: "📨", label: "SMS",                  detail: "Alertes critiques uniquement — +225 07 XX XX XX", enabled: true  },
  { id: "desktop", emoji: "🖥️", label: "Bureau (navigateur)",  detail: "Notifications push du navigateur", enabled: false },
];

type NotifType = {
  emoji: string;
  label: string;
  email: boolean;
  app: boolean;
  sms: boolean;
};

const INITIAL_TYPES: NotifType[] = [
  { emoji: "⭐", label: "Alertes critiques (stock, certificat)",   email: true,  app: true,  sms: true  },
  { emoji: "🌡️", label: "Alertes IoT (température entrepôt)",      email: true,  app: true,  sms: true  },
  { emoji: "📦", label: "Mouvement de stocks",                     email: false, app: true,  sms: false },
  { emoji: "💰", label: "Paiements reçus",                         email: true,  app: true,  sms: true  },
  { emoji: "📋", label: "Tâches assignées",                        email: false, app: true,  sms: false },
  { emoji: "🌤️", label: "Alertes météo agronomiques",              email: true,  app: true,  sms: true  },
  { emoji: "🤖", label: "Recommandations IA",                      email: false, app: true,  sms: false },
  { emoji: "📊", label: "Rapport quotidien",                       email: true,  app: false, sms: false },
  { emoji: "🚢", label: "Mise à jour export/logistique",           email: true,  app: true,  sms: false },
  { emoji: "📅", label: "Rappels d'échéances",                     email: true,  app: true,  sms: true  },
  { emoji: "👥", label: "Messages internes",                       email: false, app: true,  sms: false },
  { emoji: "📜", label: "Certifications (audit, expiration)",      email: true,  app: true,  sms: true  },
];

// ── Composant Toggle ─────────────────────────────────────────────────────────

function Toggle({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!on)}
      className="relative inline-flex h-5 w-9 shrink-0 rounded-full border-2 border-transparent transition-colors focus:outline-none"
      style={{ backgroundColor: on ? "#2E7D32" : "#D1D5DB" }}
    >
      <span
        className="pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow transform transition-transform"
        style={{ transform: on ? "translateX(16px)" : "translateX(0)" }}
      />
    </button>
  );
}

// ── Page principale ──────────────────────────────────────────────────────────

export default function NotificationsPage() {
  const [channels, setChannels] = useState<Channel[]>(INITIAL_CHANNELS);
  const [types, setTypes] = useState<NotifType[]>(INITIAL_TYPES);
  const [frequency, setFrequency] = useState<"immediat" | "quotidien" | "hebdomadaire" | "jamais">("quotidien");
  const [silenceNight, setSilenceNight] = useState(true);
  const [silenceWeekend, setSilenceWeekend] = useState(false);

  function toggleChannel(id: string) {
    setChannels((prev) => prev.map((c) => c.id === id ? { ...c, enabled: !c.enabled } : c));
  }

  function toggleType(index: number, field: "email" | "app" | "sms") {
    setTypes((prev) => prev.map((t, i) => i === index ? { ...t, [field]: !t[field] } : t));
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Topbar title="Notifications" breadcrumb={["Paramètres", "Notifications"]} />

      <main className="flex-1 p-6">
        <div className="flex gap-6 items-start">

          {/* ── Sidebar gauche ──────────────────────────────────── */}
          <div className="w-56 shrink-0">
            <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors border-b border-gray-50 last:border-0 ${
                      item.active
                        ? "bg-[#E8F5E9] text-[#1B5E20] border-l-4 border-l-[#2E7D32]"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <Icon size={15} />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* ── Contenu principal ───────────────────────────────── */}
          <div className="flex-1 space-y-6">

            {/* Section : Canaux de notification */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5">
              <h2 className="text-base font-bold text-gray-800 mb-4">Canaux de notification</h2>
              <div className="space-y-3">
                {channels.map((ch) => (
                  <div key={ch.id} className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{ch.emoji}</span>
                      <div>
                        <p className="text-sm font-medium text-gray-800">{ch.label}</p>
                        <p className="text-xs text-gray-400">{ch.detail}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {ch.id === "desktop" && !ch.enabled && (
                        <button
                          className="text-xs font-medium px-3 py-1 rounded-lg border transition-colors"
                          style={{ color: "#2E7D32", borderColor: "#2E7D32" }}
                          onClick={() => toggleChannel(ch.id)}
                        >
                          Activer
                        </button>
                      )}
                      <Toggle on={ch.enabled} onChange={() => toggleChannel(ch.id)} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section : Types de notifications */}
            <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100">
                <h2 className="text-base font-bold text-gray-800">Types de notifications</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-xs font-semibold text-gray-500 uppercase tracking-wide" style={{ background: "#F8FBF8" }}>
                      <th className="px-5 py-3 text-left">Type</th>
                      <th className="px-4 py-3 text-center">Email</th>
                      <th className="px-4 py-3 text-center">App</th>
                      <th className="px-4 py-3 text-center">SMS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {types.map((t, i) => (
                      <tr
                        key={i}
                        className={`border-t border-gray-50 ${i % 2 === 0 ? "bg-white" : "bg-gray-50/40"}`}
                      >
                        <td className="px-5 py-3">
                          <span className="mr-2">{t.emoji}</span>
                          <span className="text-gray-700 font-medium">{t.label}</span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <div className="flex justify-center">
                            <Toggle on={t.email} onChange={() => toggleType(i, "email")} />
                          </div>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <div className="flex justify-center">
                            <Toggle on={t.app} onChange={() => toggleType(i, "app")} />
                          </div>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <div className="flex justify-center">
                            <Toggle on={t.sms} onChange={() => toggleType(i, "sms")} />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Section : Fréquence résumé email */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5">
              <h2 className="text-base font-bold text-gray-800 mb-4">Fréquence résumé email</h2>
              <div className="flex flex-wrap gap-3">
                {(["immediat", "quotidien", "hebdomadaire", "jamais"] as const).map((freq) => {
                  const labels: Record<string, string> = {
                    immediat: "Immédiat",
                    quotidien: "Quotidien (08h00)",
                    hebdomadaire: "Hebdomadaire",
                    jamais: "Jamais",
                  };
                  const active = frequency === freq;
                  return (
                    <button
                      key={freq}
                      onClick={() => setFrequency(freq)}
                      className="px-4 py-2 rounded-xl text-sm font-medium border-2 transition-colors"
                      style={{
                        backgroundColor: active ? "#E8F5E9" : "white",
                        borderColor: active ? "#2E7D32" : "#E5E7EB",
                        color: active ? "#1B5E20" : "#6B7280",
                      }}
                    >
                      {labels[freq]}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Section : Silences programmés */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5">
              <h2 className="text-base font-bold text-gray-800 mb-4">Silences programmés</h2>
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-800">Nuits (22h – 06h)</p>
                    <p className="text-xs text-gray-400 mt-0.5">Aucune notification non-critique pendant la nuit</p>
                  </div>
                  <Toggle on={silenceNight} onChange={setSilenceNight} />
                </div>
                <div className="border-t border-gray-50" />
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-800">Week-ends</p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Désactivé — les alertes critiques restent actives 24/7
                    </p>
                  </div>
                  <Toggle on={silenceWeekend} onChange={setSilenceWeekend} />
                </div>
              </div>
            </div>

            {/* Boutons */}
            <div className="flex items-center gap-3 pb-4">
              <button
                className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: "#2E7D32" }}
              >
                Enregistrer
              </button>
              <button
                className="px-6 py-2.5 rounded-xl text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
                onClick={() => {
                  setChannels(INITIAL_CHANNELS);
                  setTypes(INITIAL_TYPES);
                  setFrequency("quotidien");
                  setSilenceNight(true);
                  setSilenceWeekend(false);
                }}
              >
                Réinitialiser
              </button>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
