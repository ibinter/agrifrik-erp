"use client";

import { useState } from "react";
import Link from "next/link";
import Topbar from "../../../components/Topbar";
import {
  Camera,
  Save,
  X,
  User,
  Lock,
  Palette,
  Link2,
  Clock,
  ChevronDown,
} from "lucide-react";

// ── Sidebar nav ───────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { label: "Mon profil",   href: "/parametres/profil",       icon: User,    active: true  },
  { label: "Sécurité",     href: "/parametres/securite",     icon: Lock,    active: false },
  { label: "Préférences",  href: "/parametres/preferences",  icon: Palette, active: false },
  { label: "Intégrations", href: "/parametres/integrations", icon: Link2,   active: false },
];

const RECENT_ACTIVITY = [
  { date: "11/07/2025 09:45", action: "Connexion" },
  { date: "10/07/2025 17:22", action: "Modification facture FAC-2025-041" },
  { date: "09/07/2025 16:05", action: "Export rapport S1 2025" },
  { date: "08/07/2025 09:00", action: "Paramétrage alerte stock KCl" },
];

function SelectField({ options, defaultValue }: { options: string[]; defaultValue?: string }) {
  return (
    <div className="relative">
      <select
        defaultValue={defaultValue}
        className="w-full appearance-none px-3 py-2 text-sm border border-gray-200 rounded-xl bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#2E7D32] cursor-pointer pr-8"
      >
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
      <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
    </div>
  );
}

export default function ProfilPage() {
  const [firstName, setFirstName] = useState("Admin");
  const [lastName,  setLastName]  = useState("AGRIFRIK");
  const [email,     setEmail]     = useState("admin@agrifrik.com");
  const [phone,     setPhone]     = useState("+225 07 00 00 00");

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Topbar title="Mon Profil" breadcrumb={["Paramètres", "Profil"]} />

      <main className="flex-1 p-6">
        <div className="flex gap-6 items-start">

          {/* ── Left column ─────────────────────────────────────── */}
          <div className="w-72 shrink-0 space-y-4">

            {/* Profile card */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5 flex flex-col items-center gap-3 text-center">
              {/* Avatar */}
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-[#2E7D32] flex items-center justify-center text-white text-2xl font-bold select-none">
                  AA
                </div>
                <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-white border border-gray-200 shadow flex items-center justify-center hover:bg-gray-50 transition-colors">
                  <Camera size={13} className="text-gray-500" />
                </button>
              </div>
              <button className="text-xs text-[#2E7D32] hover:underline font-medium">
                Changer la photo
              </button>

              <div className="border-t border-gray-100 w-full pt-3 space-y-1">
                <p className="font-bold text-gray-800">Admin AGRIFRIK</p>
                <p className="text-xs text-gray-500">admin@agrifrik.com</p>
                <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-xs bg-emerald-50 text-emerald-700 border border-emerald-100 font-medium">
                  Super Administrateur
                </span>
              </div>

              <div className="border-t border-gray-100 w-full pt-3 space-y-1.5 text-left">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">Membre depuis</span>
                  <span className="text-gray-700 font-medium">Mars 2023</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">Statut</span>
                  <span className="flex items-center gap-1.5 text-emerald-600 font-medium">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                    En ligne
                  </span>
                </div>
              </div>
            </div>

            {/* Nav menu */}
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

            {/* Profile form */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5">
              <h2 className="text-sm font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100">
                Informations personnelles
              </h2>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1.5 font-medium">Prénom</label>
                  <input
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1.5 font-medium">Nom</label>
                  <input
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1.5 font-medium">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1.5 font-medium">Téléphone</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1.5 font-medium">Poste</label>
                  <SelectField
                    options={["Super Administrateur","DAF","DRH","Chef terrain","Comptable","Technicien","Mécanicien","Stagiaire"]}
                    defaultValue="Super Administrateur"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1.5 font-medium">Langue</label>
                  <SelectField
                    options={["Français (CI)","Français (FR)","English","Português"]}
                    defaultValue="Français (CI)"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1.5 font-medium">Fuseau horaire</label>
                  <SelectField
                    options={["Africa/Abidjan UTC+0","Africa/Lagos UTC+1","Europe/Paris UTC+2"]}
                    defaultValue="Africa/Abidjan UTC+0"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1.5 font-medium">Devise</label>
                  <SelectField
                    options={["XOF (Franc CFA UEMOA)","EUR (Euro)","USD (Dollar américain)"]}
                    defaultValue="XOF (Franc CFA UEMOA)"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 mt-5 pt-4 border-t border-gray-100">
                <button className="flex items-center gap-2 bg-[#2E7D32] hover:bg-[#1B5E20] text-white text-xs font-medium px-4 py-2 rounded-xl transition-colors">
                  <Save size={14} /> Enregistrer les modifications
                </button>
                <button className="flex items-center gap-2 border border-gray-200 text-gray-600 hover:bg-gray-50 text-xs font-medium px-4 py-2 rounded-xl transition-colors">
                  <X size={14} /> Annuler
                </button>
              </div>
            </div>

            {/* Recent activity */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5">
              <h2 className="text-sm font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
                <Clock size={15} className="text-gray-400" />
                Activité récente
              </h2>
              <div className="space-y-3">
                {RECENT_ACTIVITY.map((ev, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#4CAF50] mt-1.5 shrink-0" />
                    <div>
                      <p className="text-sm text-gray-700">{ev.action}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{ev.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
