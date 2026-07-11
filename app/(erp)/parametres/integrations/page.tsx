"use client";

import { useState } from "react";
import {
  User, Shield, Sliders, Plug, RefreshCw, Settings, Plus,
  CheckCircle, Copy, ExternalLink, Webhook, Key,
} from "lucide-react";
import Topbar from "../../../components/Topbar";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/* Left menu                                                             */
/* ------------------------------------------------------------------ */

const LEFT_MENU = [
  { label: "Profil", icon: User, href: "/parametres/profil" },
  { label: "Sécurité", icon: Shield, href: "/parametres/securite" },
  { label: "Préférences", icon: Sliders, href: "/parametres/preferences" },
  { label: "Intégrations", icon: Plug, href: "/parametres/integrations" },
];

/* ------------------------------------------------------------------ */
/* Data                                                                   */
/* ------------------------------------------------------------------ */

const ACTIVE_INTEGRATIONS = [
  {
    emoji: "🗄️",
    name: "Supabase",
    sub: "Base de données",
    status: "Connecté",
    details: [
      { label: "URL", value: "https://xyzabcdef.supabase.co" },
      { label: "Projet", value: "agrifrik-prod" },
      { label: "Région", value: "EU West (Frankfurt)" },
      { label: "Dernière synchro", value: "il y a 2 min" },
      { label: "Tables synchronisées", value: "47" },
    ],
    actions: ["Tester la connexion", "Voir les logs"],
  },
  {
    emoji: "🌤️",
    name: "OpenWeatherMap",
    sub: "Météo",
    status: "Connecté",
    details: [
      { label: "API Key", value: "••••••••••••••8421" },
      { label: "Localisation", value: "Soubré, CI (5.7833°N, 6.6000°W)" },
      { label: "Appels restants", value: "842 / 1 000 (mois) ✅" },
      { label: "Dernière MàJ", value: "il y a 45 min" },
    ],
    actions: ["Tester", "Reconfigurer"],
  },
  {
    emoji: "📱",
    name: "Orange Money CI",
    sub: "Paiements terrain",
    status: "Connecté",
    details: [
      { label: "Numéro marchand", value: "+225 07 00 00 00" },
      { label: "Code marchand", value: "AGF-CI-2024-0142" },
      { label: "Transactions/mois", value: "8 | 1 848 000 XOF" },
    ],
    actions: ["Voir les transactions", "Paramètres"],
  },
  {
    emoji: "🏦",
    name: "BICICI",
    sub: "Banque — API Open Banking UEMOA",
    status: "Connecté",
    details: [
      { label: "Compte", value: "••••••••421-01" },
      { label: "Relevés", value: "Synchronisés quotid. à 07h00" },
      { label: "Dernière synchro", value: "11/07 07:00" },
    ],
    actions: ["Forcer synchro", "Paramètres"],
  },
  {
    emoji: "📧",
    name: "Mailgun",
    sub: "Envoi emails",
    status: "Connecté",
    details: [
      { label: "Domaine", value: "mail.agrifrik.com" },
      { label: "Emails ce mois", value: "284 / 5 000 (6%)" },
      { label: "Délivrabilité", value: "98,4%" },
    ],
    actions: ["Tester l'envoi", "Voir les logs"],
  },
  {
    emoji: "🔗",
    name: "Rainforest Alliance",
    sub: "Portail certification",
    status: "Connecté",
    details: [
      { label: "Identifiant", value: "C-CI-2025-1847" },
      { label: "Données partagées", value: "productions, audits, traçabilité" },
      { label: "Dernière synchro", value: "01/07/2025" },
    ],
    actions: ["Synchroniser maintenant", "Paramètres"],
  },
];

const AVAILABLE_INTEGRATIONS = [
  { emoji: "💳", name: "Wave CI", desc: "Paiements mobile", action: "Configurer" },
  { emoji: "📊", name: "Google Analytics", desc: "Analyse du trafic", action: "Configurer" },
  { emoji: "🤖", name: "Claude AI (Anthropic)", desc: "Module IA", action: null, note: "Déjà intégré (module IA)" },
  { emoji: "📦", name: "SAP ERP", desc: "Export données", action: "Configurer" },
  { emoji: "🌍", name: "GeoServer", desc: "SIG avancé", action: "Configurer" },
  { emoji: "📱", name: "WhatsApp Business API", desc: "Notifications SMS/WA", action: "Configurer" },
];

const WEBHOOKS = [
  { event: "nouveau_lot_créé", url: "https://barry-callebaut.com/webhook/agri", status: "Actif", lastCall: "il y a 2h" },
  { event: "lot_certifié_RA", url: "https://rainforest-alliance.org/api/ci/update", status: "Actif", lastCall: "01/07" },
  { event: "facture_payée", url: "https://bicici.ci/webhook/payment-confirm", status: "Actif", lastCall: "07/07" },
];

/* ------------------------------------------------------------------ */
/* Primitives                                                            */
/* ------------------------------------------------------------------ */

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(value).catch(() => {}); setCopied(true); setTimeout(() => setCopied(false), 1500); }}
      className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600"
      title="Copier"
    >
      {copied ? <CheckCircle size={14} className="text-green-600" /> : <Copy size={14} />}
    </button>
  );
}

function SectionCard({ title, icon, children }: { title: string; icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <div className="flex items-center gap-2.5 px-6 py-4 border-b border-gray-100">
        {icon && <span className="text-[#2E7D32]">{icon}</span>}
        <h2 className="text-sm font-semibold text-gray-900">{title}</h2>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                   */
/* ------------------------------------------------------------------ */

export default function IntegrationsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Topbar title="Intégrations" breadcrumb={["Paramètres", "Intégrations"]} />

      <main className="flex-1 p-6 max-w-6xl mx-auto w-full">
        <div className="flex gap-6 items-start">

          {/* ---- LEFT COLUMN ---- */}
          <aside className="w-70 shrink-0 space-y-4">
            <div className="bg-white rounded-2xl border border-gray-100 p-5 flex flex-col items-center gap-3">
              <div className="w-16 h-16 rounded-full bg-[#2E7D32] flex items-center justify-center text-white text-xl font-bold">AA</div>
              <div className="text-center">
                <p className="text-sm font-semibold text-gray-900">Admin AGRIFRIK</p>
                <p className="text-xs text-gray-400">admin@agrifrik.com</p>
              </div>
              <span className="text-xs px-2.5 py-1 bg-green-50 text-[#2E7D32] rounded-full font-medium">Administrateur</span>
            </div>
            <nav className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              {LEFT_MENU.map((item) => {
                const Icon = item.icon;
                const active = item.label === "Intégrations";
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`flex items-center gap-3 px-5 py-3.5 text-sm font-medium border-b border-gray-100 last:border-0 transition-colors ${active ? "bg-green-50 text-[#2E7D32]" : "text-gray-600 hover:bg-gray-50"}`}
                  >
                    <Icon size={16} />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </aside>

          {/* ---- RIGHT COLUMN ---- */}
          <div className="flex-1 space-y-6 min-w-0">

            {/* Intégrations actives */}
            <SectionCard title="Intégrations actives">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {ACTIVE_INTEGRATIONS.map((integ) => (
                  <div key={integ.name} className="border border-gray-100 rounded-2xl p-4 flex flex-col gap-3 hover:border-green-200 transition-colors">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-xl shrink-0">
                          {integ.emoji}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{integ.name}</p>
                          <p className="text-xs text-gray-400">{integ.sub}</p>
                        </div>
                      </div>
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-green-50 text-green-700 shrink-0">
                        ✅ {integ.status}
                      </span>
                    </div>

                    {/* Details */}
                    <div className="space-y-1.5 bg-gray-50 rounded-xl p-3">
                      {integ.details.map((d) => (
                        <div key={d.label} className="flex items-start justify-between gap-2">
                          <span className="text-xs text-gray-400 shrink-0">{d.label}</span>
                          <span className="text-xs text-gray-700 text-right font-medium">{d.value}</span>
                        </div>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 mt-auto">
                      {integ.actions.map((action, i) => (
                        <button
                          key={action}
                          className={`flex-1 py-2 rounded-xl text-xs font-medium border transition-colors ${i === 0 ? "border-[#2E7D32] text-[#2E7D32] hover:bg-green-50" : "border-gray-200 text-gray-600 hover:bg-gray-50"}`}
                        >
                          {action}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>

            {/* Intégrations disponibles */}
            <SectionCard title="Intégrations disponibles (non configurées)">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {AVAILABLE_INTEGRATIONS.map((integ) => (
                  <div key={integ.name} className="border border-gray-100 rounded-xl p-4 flex flex-col gap-3 bg-gray-50 hover:bg-white hover:border-gray-200 transition-all">
                    <div className="flex items-center gap-2.5">
                      <span className="text-2xl">{integ.emoji}</span>
                      <div>
                        <p className="text-sm font-semibold text-gray-800">{integ.name}</p>
                        <p className="text-xs text-gray-400">{integ.desc}</p>
                      </div>
                    </div>
                    {integ.action ? (
                      <button className="mt-auto flex items-center justify-center gap-1.5 w-full py-2 rounded-xl border border-gray-200 text-xs font-medium text-gray-600 hover:bg-white transition-colors bg-white">
                        <Plus size={12} />
                        {integ.action}
                      </button>
                    ) : (
                      <div className="mt-auto flex items-center justify-center gap-1.5 w-full py-2 rounded-xl border border-green-200 bg-green-50 text-xs font-medium text-green-700">
                        <CheckCircle size={12} />
                        {integ.note}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </SectionCard>

            {/* API AGRIFRIK */}
            <SectionCard title="API AGRIFRIK" icon={<Key size={16} />}>
              <div className="space-y-4">
                {/* API info */}
                <div className="bg-gray-50 rounded-xl p-4 space-y-2.5">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs text-gray-400 shrink-0">Endpoint base</span>
                    <div className="flex items-center gap-1">
                      <code className="text-xs font-mono text-gray-700">https://api.agrifrik.com/v1</code>
                      <CopyButton value="https://api.agrifrik.com/v1" />
                    </div>
                  </div>
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs text-gray-400 shrink-0">Clé API</span>
                    <div className="flex items-center gap-1">
                      <code className="text-xs font-mono text-gray-700">AGF-API-2024-••••••••••••••••••-PROD</code>
                      <CopyButton value="AGF-API-2024-PROD" />
                    </div>
                  </div>
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs text-gray-400 shrink-0">Rate limit</span>
                    <span className="text-xs text-gray-700 font-medium">1 000 req/heure | Utilisés : 284/1 000 ✅</span>
                  </div>
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs text-gray-400 shrink-0">Documentation</span>
                    <a href="#" className="text-xs text-[#2E7D32] font-medium flex items-center gap-1 hover:underline">
                      Voir la doc API <ExternalLink size={11} />
                    </a>
                  </div>
                </div>

                {/* Webhooks */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Webhook size={14} className="text-gray-400" />
                    <h3 className="text-sm font-semibold text-gray-900">Webhooks configurés</h3>
                  </div>
                  <div className="overflow-x-auto rounded-xl border border-gray-100">
                    <table className="w-full text-xs">
                      <thead className="bg-[#F8FBF8]">
                        <tr>
                          {["Événement", "URL destination", "Statut", "Dernier appel", ""].map((h, i) => (
                            <th key={i} className="text-left text-gray-500 font-medium px-4 py-2.5">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {WEBHOOKS.map((wh, i) => (
                          <tr key={i} className="border-t border-gray-100 hover:bg-gray-50">
                            <td className="px-4 py-3 font-mono text-gray-700">{wh.event}</td>
                            <td className="px-4 py-3 text-gray-500 truncate max-w-[180px]">
                              <span title={wh.url}>{wh.url.length > 40 ? wh.url.slice(0, 40) + "…" : wh.url}</span>
                            </td>
                            <td className="px-4 py-3">
                              <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700">✅ {wh.status}</span>
                            </td>
                            <td className="px-4 py-3 text-gray-500">{wh.lastCall}</td>
                            <td className="px-4 py-3">
                              <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
                                <Settings size={13} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-3">
                    <button className="flex items-center gap-2 text-sm font-medium px-4 py-2.5 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors">
                      <Plus size={14} />
                      Ajouter un webhook
                    </button>
                  </div>
                </div>

                {/* Regenerate key */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <p className="text-xs text-gray-400">Régénérer invalidera immédiatement l&apos;ancienne clé.</p>
                  <button className="flex items-center gap-2 text-xs font-medium text-gray-600 px-3 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                    <RefreshCw size={12} />
                    Régénérer la clé API
                  </button>
                </div>
              </div>
            </SectionCard>

          </div>
        </div>
      </main>
    </div>
  );
}
