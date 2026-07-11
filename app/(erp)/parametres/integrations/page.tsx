"use client";

import { useState } from "react";
import Topbar from "../../../components/Topbar";
import {
  Settings,
  Plus,
  RefreshCw,
  Webhook,
  Key,
  Copy,
  CheckCircle,
  ExternalLink,
} from "lucide-react";

const connectedIntegrations = [
  {
    name: "Supabase",
    description: "Base de données cloud",
    status: "connected",
    statusLabel: "Connecté",
    details: [
      { label: "URL", value: "https://xxxx.supabase.co" },
      { label: "Dernière sync", value: "09/07/2025 08:45" },
      { label: "Statut", value: "✅ Actif — 127 tables synced" },
    ],
    color: "#3ECF8E",
    bg: "#F0FFF8",
    initial: "SB",
  },
  {
    name: "OpenWeather API",
    description: "Météo agricole en temps réel",
    status: "connected",
    statusLabel: "Connecté",
    details: [
      { label: "Clé API", value: "sk-ow-*****" },
      { label: "Dernière requête", value: "Il y a 15 min" },
    ],
    color: "#F97316",
    bg: "#FFF7ED",
    initial: "OW",
  },
  {
    name: "ANADER CI",
    description: "Données marchés & prix",
    status: "configured",
    statusLabel: "Configuré",
    details: [
      { label: "Source", value: "Flux RSS prix marchés" },
      { label: "Mis à jour", value: "Quotidiennement" },
    ],
    color: "#D97706",
    bg: "#FFFBEB",
    initial: "AN",
  },
];

const availableIntegrations = [
  {
    name: "Resend",
    description: "Emails transactionnels (rapports, alertes)",
    initial: "RS",
    color: "#6366F1",
    bg: "#EEF2FF",
  },
  {
    name: "Twilio",
    description: "SMS & WhatsApp notifications",
    initial: "TW",
    color: "#F43F5E",
    bg: "#FFF1F2",
  },
  {
    name: "Google Calendar",
    description: "Sync calendrier agricole",
    initial: "GC",
    color: "#0EA5E9",
    bg: "#F0F9FF",
  },
  {
    name: "QuickBooks",
    description: "Export données comptables",
    initial: "QB",
    color: "#2DD4BF",
    bg: "#F0FDFA",
  },
  {
    name: "DHL / BOLLORÉ",
    description: "Tracking expéditions export",
    initial: "DH",
    color: "#FBBF24",
    bg: "#FFFBEB",
  },
  {
    name: "FAO Data",
    description: "Indicateurs sectoriels automatiques",
    initial: "FA",
    color: "#10B981",
    bg: "#ECFDF5",
  },
];

const apiKeys = [
  { label: "Clé API production", key: "agfk_prod_*****", created: "01/01/2025" },
  { label: "Clé API sandbox", key: "agfk_test_*****", created: "15/06/2025" },
];

const webhooks = [
  {
    url: "https://app.make.com/...",
    events: "Nouvelle commande, Stock critique",
    status: "Actif",
    lastDelivery: "09/07 07:42",
    ok: true,
  },
  {
    url: "https://n8n.agrotek.ci/...",
    events: "Rapport généré",
    status: "Actif",
    lastDelivery: "09/07 06:00",
    ok: true,
  },
];

function StatusBadge({ status, label }: { status: string; label: string }) {
  const colors =
    status === "connected"
      ? { bg: "#DCFCE7", text: "#15803D" }
      : { bg: "#FEF3C7", text: "#92400E" };
  return (
    <span
      className="text-xs font-semibold px-2.5 py-0.5 rounded-full"
      style={{ backgroundColor: colors.bg, color: colors.text }}
    >
      {label}
    </span>
  );
}

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(value).catch(() => {});
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }}
      className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600"
      title="Copier"
    >
      {copied ? <CheckCircle size={14} className="text-green-600" /> : <Copy size={14} />}
    </button>
  );
}

export default function IntegrationsPage() {
  return (
    <div>
      <Topbar title="Intégrations" breadcrumb={["Paramètres", "Intégrations"]} />

      <div className="p-6 space-y-6 max-w-5xl">
        {/* Intégrations connectées */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Intégrations connectées</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {connectedIntegrations.map((integ) => (
              <div
                key={integ.name}
                className="border border-gray-100 rounded-2xl p-4 flex flex-col gap-3"
              >
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                      style={{ backgroundColor: integ.color }}
                    >
                      {integ.initial}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{integ.name}</p>
                      <p className="text-xs text-gray-400">{integ.description}</p>
                    </div>
                  </div>
                  <StatusBadge status={integ.status} label={integ.statusLabel} />
                </div>

                {/* Details */}
                <div className="space-y-1.5">
                  {integ.details.map((d) => (
                    <div key={d.label} className="flex items-start justify-between gap-2">
                      <span className="text-xs text-gray-400 flex-shrink-0">{d.label}</span>
                      <span className="text-xs text-gray-700 text-right truncate">{d.value}</span>
                    </div>
                  ))}
                </div>

                <button className="mt-auto flex items-center justify-center gap-1.5 w-full py-2 rounded-xl border border-gray-200 text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                  <Settings size={13} />
                  Configurer
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Intégrations disponibles */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Intégrations disponibles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableIntegrations.map((integ) => (
              <div
                key={integ.name}
                className="border border-gray-100 rounded-2xl p-4 flex flex-col gap-3 hover:border-gray-200 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                    style={{ backgroundColor: integ.color }}
                  >
                    {integ.initial}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{integ.name}</p>
                    <p className="text-xs text-gray-400">{integ.description}</p>
                  </div>
                </div>
                <button className="mt-auto flex items-center justify-center gap-1.5 w-full py-2 rounded-xl border border-gray-200 text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                  <Plus size={13} />
                  Connecter
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Clés API */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Key size={16} className="text-gray-500" />
            <h2 className="font-semibold text-gray-900">Clés API AGRIFRIK</h2>
          </div>
          <p className="text-xs text-gray-400 mb-4">
            Les clés API permettent d&apos;intégrer AGRIFRIK à vos outils externes
          </p>

          <div className="space-y-3">
            {apiKeys.map((k) => (
              <div
                key={k.label}
                className="flex items-center justify-between gap-4 p-3.5 rounded-xl border border-gray-100 bg-gray-50"
              >
                <div className="min-w-0">
                  <p className="text-xs font-medium text-gray-700">{k.label}</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <code className="text-xs font-mono text-gray-500">{k.key}</code>
                    <CopyButton value={k.key} />
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">Créée le {k.created}</p>
                </div>
                <button className="flex items-center gap-1.5 text-xs font-medium text-gray-600 px-3 py-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition-colors flex-shrink-0">
                  <RefreshCw size={12} />
                  Régénérer
                </button>
              </div>
            ))}
          </div>

          <div className="mt-4">
            <button
              className="flex items-center gap-2 text-sm font-semibold px-4 py-2.5 rounded-xl text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#2E7D32" }}
            >
              <Plus size={14} />
              Créer une nouvelle clé API
            </button>
          </div>
        </div>

        {/* Webhooks */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Webhook size={16} className="text-gray-500" />
            <h2 className="font-semibold text-gray-900">Webhooks</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-gray-100">
                  {["URL", "Événements", "Statut", "Dernière livraison", ""].map((h, i) => (
                    <th
                      key={i}
                      className="text-left text-gray-400 font-medium pb-2.5 pr-4 last:pr-0"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {webhooks.map((wh, i) => (
                  <tr key={i} className="border-b border-gray-50 last:border-0">
                    <td className="py-3 pr-4">
                      <span className="font-mono text-gray-700 truncate block max-w-[200px]">
                        {wh.url}
                      </span>
                    </td>
                    <td className="py-3 pr-4 text-gray-600">{wh.events}</td>
                    <td className="py-3 pr-4">
                      <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700">
                        {wh.status}
                      </span>
                    </td>
                    <td className="py-3 pr-4 text-gray-500">
                      {wh.lastDelivery}{" "}
                      {wh.ok ? (
                        <CheckCircle size={11} className="inline text-green-500 ml-1" />
                      ) : null}
                    </td>
                    <td className="py-3">
                      <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
                        <ExternalLink size={13} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4">
            <button className="flex items-center gap-2 text-sm font-medium px-4 py-2.5 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors">
              <Plus size={14} />
              Ajouter un webhook
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
