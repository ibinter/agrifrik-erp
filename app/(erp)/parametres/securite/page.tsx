"use client";

import { useState } from "react";
import Link from "next/link";
import Topbar from "../../../components/Topbar";
import {
  Lock,
  Eye,
  EyeOff,
  Shield,
  Smartphone,
  Monitor,
  Laptop,
  User,
  Palette,
  Link2,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";

// ── Sidebar nav ───────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { label: "Mon profil",   href: "/parametres/profil",       icon: User,    active: false },
  { label: "Sécurité",     href: "/parametres/securite",     icon: Lock,    active: true  },
  { label: "Préférences",  href: "/parametres/preferences",  icon: Palette, active: false },
  { label: "Intégrations", href: "/parametres/integrations", icon: Link2,   active: false },
];

// ── Password strength ─────────────────────────────────────────────────────────

function getStrength(pwd: string): { label: string; color: string; width: string } {
  if (!pwd) return { label: "", color: "#E5E7EB", width: "0%" };
  let score = 0;
  if (pwd.length >= 8) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;
  if (score <= 1) return { label: "Faible", color: "#EF4444", width: "25%" };
  if (score === 2) return { label: "Moyen", color: "#F59E0B", width: "50%" };
  if (score === 3) return { label: "Fort", color: "#16A34A", width: "75%" };
  return { label: "Très fort", color: "#15803D", width: "100%" };
}

// ── Data ──────────────────────────────────────────────────────────────────────

const TRUSTED_DEVICES = [
  { name: "MacBook Pro 16\"", type: "Ordinateur", icon: Laptop,     lastUsed: "Il y a 2 min",  location: "Soubré, CI",  current: true  },
  { name: "iPhone 14 Pro",   type: "Mobile",      icon: Smartphone, lastUsed: "Il y a 3h",     location: "Soubré, CI",  current: false },
  { name: "iPad Air",        type: "Tablette",    icon: Monitor,    lastUsed: "08/07/2025",     location: "Abidjan, CI", current: false },
];

const SECURITY_HISTORY = [
  { date: "11/07/2025 09:45", event: "Connexion réussie", ip: "192.168.1.12", type: "success" },
  { date: "10/07/2025 08:00", event: "Changement de mot de passe", ip: "192.168.1.12", type: "warning" },
  { date: "09/07/2025 16:05", event: "Connexion réussie", ip: "192.168.1.12", type: "success" },
  { date: "08/07/2025 09:00", event: "Connexion depuis nouvel appareil (iPad Air)", ip: "192.168.1.35", type: "info" },
  { date: "07/07/2025 07:22", event: "Tentative de connexion échouée", ip: "41.203.14.88", type: "danger" },
];

export default function SecuritePage() {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew,     setShowNew]     = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [currentPwd,  setCurrentPwd]  = useState("");
  const [newPwd,      setNewPwd]      = useState("");
  const [confirmPwd,  setConfirmPwd]  = useState("");
  const [twoFA,       setTwoFA]       = useState(false);
  const [devices,     setDevices]     = useState(TRUSTED_DEVICES);

  const strength = getStrength(newPwd);

  const passwordRules = [
    { label: "Au moins 8 caractères",       ok: newPwd.length >= 8 },
    { label: "Au moins 1 majuscule",         ok: /[A-Z]/.test(newPwd) },
    { label: "Au moins 1 chiffre",           ok: /[0-9]/.test(newPwd) },
    { label: "Au moins 1 caractère spécial", ok: /[^A-Za-z0-9]/.test(newPwd) },
  ];

  function revokeDevice(name: string) {
    setDevices((prev) => prev.filter((d) => d.name !== name));
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Topbar title="Sécurité" breadcrumb={["Paramètres", "Sécurité"]} />

      <main className="flex-1 p-6">
        <div className="flex gap-6 items-start">

          {/* ── Left column ─────────────────────────────────────── */}
          <div className="w-72 shrink-0 space-y-4">
            {/* Profile card */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5 flex flex-col items-center gap-3 text-center">
              <div className="w-20 h-20 rounded-full bg-[#2E7D32] flex items-center justify-center text-white text-2xl font-bold select-none">
                AA
              </div>
              <div>
                <p className="font-bold text-gray-800">Admin AGRIFRIK</p>
                <p className="text-xs text-gray-500">admin@agrifrik.com</p>
                <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-xs bg-emerald-50 text-emerald-700 border border-emerald-100 font-medium">
                  Super Administrateur
                </span>
              </div>
              <div className="border-t border-gray-100 w-full pt-3 flex justify-between text-xs">
                <span className="text-gray-500">Statut</span>
                <span className="flex items-center gap-1.5 text-emerald-600 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                  En ligne
                </span>
              </div>
            </div>

            {/* Nav */}
            <div className="rounded-2xl border border-gray-100 bg-white p-2">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      item.active
                        ? "bg-[#2E7D32] text-white"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
                    }`}
                  >
                    <Icon size={15} />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* ── Right column ────────────────────────────────────── */}
          <div className="flex-1 space-y-4 min-w-0">

            {/* Password change */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5">
              <h2 className="text-sm font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
                <Lock size={15} className="text-gray-400" />
                Modifier le mot de passe
              </h2>

              <div className="space-y-4 max-w-sm">
                {/* Current password */}
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">Mot de passe actuel</label>
                  <div className="relative">
                    <input
                      type={showCurrent ? "text" : "password"}
                      value={currentPwd}
                      onChange={(e) => setCurrentPwd(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-3 py-2 pr-10 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
                    />
                    <button type="button" onClick={() => setShowCurrent((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                      {showCurrent ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>

                {/* New password */}
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">Nouveau mot de passe</label>
                  <div className="relative">
                    <input
                      type={showNew ? "text" : "password"}
                      value={newPwd}
                      onChange={(e) => setNewPwd(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-3 py-2 pr-10 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
                    />
                    <button type="button" onClick={() => setShowNew((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                      {showNew ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                  {newPwd.length > 0 && (
                    <>
                      <div className="mt-2 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full rounded-full transition-all duration-300" style={{ width: strength.width, backgroundColor: strength.color }} />
                      </div>
                      <p className="text-xs mt-1 font-semibold" style={{ color: strength.color }}>{strength.label}</p>
                      <ul className="mt-2 space-y-1">
                        {passwordRules.map((r) => (
                          <li key={r.label} className="flex items-center gap-1.5 text-xs">
                            {r.ok ? <CheckCircle size={12} className="text-emerald-600 shrink-0" /> : <XCircle size={12} className="text-gray-300 shrink-0" />}
                            <span className={r.ok ? "text-emerald-700" : "text-gray-500"}>{r.label}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>

                {/* Confirm */}
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">Confirmation</label>
                  <div className="relative">
                    <input
                      type={showConfirm ? "text" : "password"}
                      value={confirmPwd}
                      onChange={(e) => setConfirmPwd(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-3 py-2 pr-10 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
                    />
                    <button type="button" onClick={() => setShowConfirm((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                      {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                  {confirmPwd.length > 0 && (
                    newPwd === confirmPwd
                      ? <p className="text-xs mt-1 text-emerald-600 flex items-center gap-1"><CheckCircle size={12} /> Les mots de passe correspondent.</p>
                      : <p className="text-xs mt-1 text-red-500">Les mots de passe ne correspondent pas.</p>
                  )}
                </div>

                <button className="bg-[#2E7D32] hover:bg-[#1B5E20] text-white text-xs font-medium px-4 py-2 rounded-xl transition-colors">
                  Mettre à jour le mot de passe
                </button>
              </div>
            </div>

            {/* 2FA */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                    <Shield size={18} className="text-blue-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-sm font-semibold text-gray-800">Authentification à deux facteurs (2FA)</h2>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${twoFA ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-600"}`}>
                        {twoFA ? "Activé" : "Désactivé"}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Protégez votre compte avec une application d&apos;authentification (Google Authenticator, Authy)
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setTwoFA((v) => !v)}
                  className={`flex items-center gap-2 text-xs font-medium px-3 py-2 rounded-xl transition-colors shrink-0 ml-4 ${
                    twoFA
                      ? "border border-gray-200 text-gray-600 hover:bg-gray-50"
                      : "bg-[#2E7D32] text-white hover:bg-[#1B5E20]"
                  }`}
                >
                  {twoFA ? "Désactiver le 2FA" : "Activer le 2FA"}
                </button>
              </div>
            </div>

            {/* Trusted devices */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5">
              <h2 className="text-sm font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100">
                Appareils de confiance
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#F8FBF8] text-gray-500 text-left">
                      <th className="px-4 py-2.5 font-medium text-xs rounded-tl-xl">Appareil</th>
                      <th className="px-4 py-2.5 font-medium text-xs">Type</th>
                      <th className="px-4 py-2.5 font-medium text-xs">Dernière utilisation</th>
                      <th className="px-4 py-2.5 font-medium text-xs">Localisation</th>
                      <th className="px-4 py-2.5 font-medium text-xs rounded-tr-xl">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {devices.map((d) => {
                      const Icon = d.icon;
                      return (
                        <tr key={d.name} className="hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <Icon size={15} className="text-gray-400 shrink-0" />
                              <span className="font-medium text-gray-800">{d.name}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-gray-500 text-xs">{d.type}</td>
                          <td className="px-4 py-3 text-gray-500 text-xs">{d.lastUsed}</td>
                          <td className="px-4 py-3 text-gray-500 text-xs">{d.location}</td>
                          <td className="px-4 py-3">
                            {d.current ? (
                              <span className="text-xs text-emerald-600 font-medium">Actuel</span>
                            ) : (
                              <button
                                onClick={() => revokeDevice(d.name)}
                                className="text-xs text-red-500 hover:text-red-700 font-medium"
                              >
                                Révoquer
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

            {/* Security history */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5">
              <h2 className="text-sm font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100">
                Historique de sécurité
              </h2>
              <div className="space-y-3">
                {SECURITY_HISTORY.map((ev, i) => {
                  const icon =
                    ev.type === "success" ? <CheckCircle size={15} className="text-emerald-500 shrink-0 mt-0.5" /> :
                    ev.type === "danger"  ? <XCircle     size={15} className="text-red-500 shrink-0 mt-0.5" />     :
                    ev.type === "warning" ? <AlertCircle size={15} className="text-amber-500 shrink-0 mt-0.5" />   :
                                            <AlertCircle size={15} className="text-blue-400 shrink-0 mt-0.5" />;
                  return (
                    <div key={i} className="flex items-start gap-3">
                      {icon}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-700">{ev.event}</p>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {ev.date} — IP : <span className="font-mono">{ev.ip}</span>
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
