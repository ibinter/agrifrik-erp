"use client";

import { useState } from "react";
import Topbar from "../../../components/Topbar";
import {
  Lock,
  Eye,
  EyeOff,
  Shield,
  Smartphone,
  Monitor,
  LogOut,
  CheckCircle,
  XCircle,
  Mail,
  KeyRound,
  Download,
  Trash2,
} from "lucide-react";

function getPasswordStrength(pwd: string): {
  label: string;
  color: string;
  width: string;
  level: number;
} {
  let score = 0;
  if (pwd.length >= 8) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;

  if (pwd.length === 0) return { label: "", color: "#E5E7EB", width: "0%", level: 0 };
  if (score === 1) return { label: "Faible", color: "#EF4444", width: "25%", level: 1 };
  if (score === 2) return { label: "Moyen", color: "#F59E0B", width: "50%", level: 2 };
  if (score === 3) return { label: "Fort", color: "#16A34A", width: "75%", level: 3 };
  return { label: "Très fort", color: "#15803D", width: "100%", level: 4 };
}

const sessions = [
  {
    id: 1,
    device: "💻 Cet appareil",
    browser: "Chrome 125",
    location: "Abidjan, CI",
    lastSeen: "Maintenant",
    current: true,
  },
  {
    id: 2,
    device: "📱 iPhone 15",
    browser: "Safari 17",
    location: "Soubré, CI",
    lastSeen: "Il y a 2h",
    current: false,
  },
  {
    id: 3,
    device: "💻 MacBook Pro",
    browser: "Firefox 126",
    location: "Abidjan, CI",
    lastSeen: "Hier 18:30",
    current: false,
  },
];

const loginHistory = [
  { date: "09/07/2025", time: "08:45", device: "Chrome / Windows", ip: "41.82.XX.XX", success: true },
  { date: "08/07/2025", time: "19:12", device: "Safari / iPhone", ip: "41.82.XX.XX", success: true },
  { date: "08/07/2025", time: "14:30", device: "Firefox / Mac", ip: "41.82.XX.XX", success: true },
  { date: "07/07/2025", time: "09:00", device: "Chrome / Windows", ip: "41.82.XX.XX", success: true },
  { date: "06/07/2025", time: "22:15", device: "Unknown", ip: "196.28.XX.XX", success: false },
  { date: "06/07/2025", time: "08:30", device: "Chrome / Windows", ip: "41.82.XX.XX", success: true },
];

export default function SecuritePage() {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [currentPwd, setCurrentPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [twoFAEnabled, setTwoFAEnabled] = useState(false);
  const [activeSessions, setActiveSessions] = useState(sessions);

  const strength = getPasswordStrength(newPwd);

  const rules = [
    { label: "Au moins 8 caractères", ok: newPwd.length >= 8 },
    { label: "Au moins 1 majuscule", ok: /[A-Z]/.test(newPwd) },
    { label: "Au moins 1 chiffre", ok: /[0-9]/.test(newPwd) },
    { label: "Au moins 1 caractère spécial", ok: /[^A-Za-z0-9]/.test(newPwd) },
  ];

  function revokeSession(id: number) {
    setActiveSessions((prev) => prev.filter((s) => s.id !== id));
  }

  function revokeAllOthers() {
    setActiveSessions((prev) => prev.filter((s) => s.current));
  }

  return (
    <div>
      <Topbar title="Sécurité" breadcrumb={["Paramètres", "Sécurité"]} />

      <div className="p-6 space-y-6 max-w-3xl">
        {/* Changer le mot de passe */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center gap-2 mb-5">
            <Lock size={16} className="text-gray-500" />
            <h2 className="font-semibold text-gray-900">Changer le mot de passe</h2>
          </div>

          <div className="space-y-4">
            {/* Mot de passe actuel */}
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">
                Mot de passe actuel
              </label>
              <div className="relative">
                <input
                  type={showCurrent ? "text" : "password"}
                  value={currentPwd}
                  onChange={(e) => setCurrentPwd(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3 py-2 pr-10 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrent((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showCurrent ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Nouveau mot de passe */}
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">
                Nouveau mot de passe
              </label>
              <div className="relative">
                <input
                  type={showNew ? "text" : "password"}
                  value={newPwd}
                  onChange={(e) => setNewPwd(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3 py-2 pr-10 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowNew((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showNew ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>

              {/* Barre de force */}
              {newPwd.length > 0 && (
                <div className="mt-2">
                  <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-300"
                      style={{ width: strength.width, backgroundColor: strength.color }}
                    />
                  </div>
                  <p className="text-xs mt-1 font-medium" style={{ color: strength.color }}>
                    {strength.label}
                  </p>
                </div>
              )}

              {/* Règles */}
              {newPwd.length > 0 && (
                <ul className="mt-3 space-y-1.5">
                  {rules.map((r) => (
                    <li key={r.label} className="flex items-center gap-2 text-xs">
                      {r.ok ? (
                        <CheckCircle size={13} className="text-green-600 flex-shrink-0" />
                      ) : (
                        <XCircle size={13} className="text-red-400 flex-shrink-0" />
                      )}
                      <span className={r.ok ? "text-green-700" : "text-gray-500"}>{r.label}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Confirmer */}
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">
                Confirmer le nouveau mot de passe
              </label>
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  value={confirmPwd}
                  onChange={(e) => setConfirmPwd(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3 py-2 pr-10 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {confirmPwd.length > 0 && newPwd !== confirmPwd && (
                <p className="text-xs mt-1 text-red-500">Les mots de passe ne correspondent pas.</p>
              )}
              {confirmPwd.length > 0 && newPwd === confirmPwd && (
                <p className="text-xs mt-1 text-green-600 flex items-center gap-1">
                  <CheckCircle size={12} /> Les mots de passe correspondent.
                </p>
              )}
            </div>
          </div>

          <div className="mt-5 flex justify-end">
            <button
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#2E7D32" }}
            >
              Mettre à jour le mot de passe
            </button>
          </div>
        </div>

        {/* Double authentification */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-blue-50 flex-shrink-0">
                <Shield size={18} color="#1565C0" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <h2 className="font-semibold text-gray-900 text-sm">
                    Double authentification (2FA)
                  </h2>
                  <span
                    className="text-xs font-medium px-2 py-0.5 rounded-full"
                    style={{
                      backgroundColor: twoFAEnabled ? "#DCFCE7" : "#FEF3C7",
                      color: twoFAEnabled ? "#15803D" : "#92400E",
                    }}
                  >
                    {twoFAEnabled ? "Activé" : "Désactivé"}
                  </span>
                </div>
                <p className="text-xs text-gray-500">
                  Protégez votre compte avec un code envoyé par SMS ou email à chaque connexion
                </p>
              </div>
            </div>
            <button
              onClick={() => setTwoFAEnabled((v) => !v)}
              className="relative w-11 h-6 rounded-full transition-colors flex-shrink-0 ml-4"
              style={{ backgroundColor: twoFAEnabled ? "#2E7D32" : "#D1D5DB" }}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${
                  twoFAEnabled ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          {twoFAEnabled && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-xs font-medium text-gray-600 mb-3">Méthodes disponibles</p>
              <div className="space-y-2">
                {[
                  { icon: <Smartphone size={15} />, label: "SMS", detail: "+225 07 45 12 89", selected: true },
                  { icon: <Mail size={15} />, label: "Email", detail: "jean@agrotek.ci", selected: false },
                  { icon: <KeyRound size={15} />, label: "Application d'authentification", detail: "Google Authenticator, Authy…", selected: false },
                ].map((m) => (
                  <label
                    key={m.label}
                    className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
                      m.selected ? "border-green-200 bg-green-50" : "border-gray-100 hover:bg-gray-50"
                    }`}
                  >
                    <span className={m.selected ? "text-green-700" : "text-gray-400"}>{m.icon}</span>
                    <div className="flex-1">
                      <p className="text-xs font-medium text-gray-800">{m.label}</p>
                      <p className="text-xs text-gray-400">{m.detail}</p>
                    </div>
                    <input
                      type="radio"
                      name="2fa-method"
                      defaultChecked={m.selected}
                      className="accent-green-700"
                    />
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sessions actives */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Monitor size={16} className="text-gray-500" />
            <h2 className="font-semibold text-gray-900">Sessions actives</h2>
          </div>

          <div className="space-y-2">
            {activeSessions.map((session) => (
              <div
                key={session.id}
                className={`flex items-center justify-between p-3.5 rounded-xl border ${
                  session.current ? "border-green-100 bg-green-50" : "border-gray-100"
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center text-base flex-shrink-0 ${
                      session.current ? "bg-white border border-green-100" : "bg-gray-50 border border-gray-100"
                    }`}
                  >
                    {session.device.startsWith("📱") ? "📱" : "💻"}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-medium text-gray-800 truncate">
                        {session.device.replace(/^[^\s]+\s/, "")}
                      </span>
                      <span className="text-xs text-gray-400">{session.browser}</span>
                      {session.current && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-medium">
                          Session actuelle
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {session.location} · {session.lastSeen}
                    </p>
                  </div>
                </div>
                {!session.current && (
                  <button
                    onClick={() => revokeSession(session.id)}
                    className="flex items-center gap-1.5 text-xs font-medium text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors flex-shrink-0 ml-2"
                  >
                    <LogOut size={13} />
                    Révoquer
                  </button>
                )}
              </div>
            ))}
          </div>

          {activeSessions.length > 1 && (
            <div className="mt-4 flex justify-end">
              <button
                onClick={revokeAllOthers}
                className="text-xs font-semibold px-4 py-2 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 transition-colors"
              >
                Révoquer toutes les autres sessions
              </button>
            </div>
          )}
        </div>

        {/* Historique de connexion */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Historique de connexion</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-gray-100">
                  {["Date", "Heure", "Appareil", "IP", "Statut"].map((h) => (
                    <th key={h} className="text-left text-gray-400 font-medium pb-2.5 pr-4 last:pr-0">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loginHistory.map((entry, i) => (
                  <tr key={i} className="border-b border-gray-50 last:border-0">
                    <td className="py-2.5 pr-4 text-gray-600 whitespace-nowrap">{entry.date}</td>
                    <td className="py-2.5 pr-4 text-gray-600">{entry.time}</td>
                    <td className="py-2.5 pr-4 text-gray-600 whitespace-nowrap">{entry.device}</td>
                    <td className="py-2.5 pr-4 text-gray-400 font-mono">{entry.ip}</td>
                    <td className="py-2.5">
                      {entry.success ? (
                        <span className="flex items-center gap-1 text-green-700">
                          <CheckCircle size={12} /> Succès
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-red-600">
                          <XCircle size={12} /> Échoué
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Données & Confidentialité */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Données &amp; Confidentialité</h2>
          <div className="flex flex-wrap gap-3">
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              <Download size={14} />
              Télécharger mes données
            </button>
            <div className="flex flex-col gap-1">
              <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-red-200 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors">
                <Trash2 size={14} />
                Supprimer mon compte
              </button>
              <p className="text-xs text-red-400 pl-1">Action irréversible</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
