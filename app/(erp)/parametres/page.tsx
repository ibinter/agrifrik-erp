"use client";

import { useState } from "react";
import Topbar from "../../components/Topbar";
import {
  Settings,
  Building2,
  User,
  Bell,
  Plug,
  CreditCard,
  Edit3,
  Save,
  X,
  CheckCircle2,
  Plus,
  Eye,
  Wifi,
  WifiOff,
  Circle,
  Shield,
  Download,
  ExternalLink,
} from "lucide-react";

const TABS = [
  { id: "exploitation", label: "Exploitation", icon: Building2 },
  { id: "compte", label: "Compte", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "integrations", label: "Intégrations", icon: Plug },
  { id: "abonnement", label: "Abonnement", icon: CreditCard },
];

function SectionTitle({ title }: { title: string }) {
  return (
    <h3 className="text-xs font-semibold text-[#1B5E20] uppercase tracking-wider mb-3 mt-6 first:mt-0 border-b border-gray-100 pb-2">
      {title}
    </h3>
  );
}

function FieldRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start py-2.5 border-b border-gray-50 last:border-0">
      <span className="w-48 shrink-0 text-xs text-gray-500">{label}</span>
      <span className="text-xs font-medium text-gray-800">{value}</span>
    </div>
  );
}

function Toggle({
  checked,
  disabled,
  onChange,
}: {
  checked: boolean;
  disabled?: boolean;
  onChange?: (v: boolean) => void;
}) {
  return (
    <button
      onClick={() => !disabled && onChange?.(!checked)}
      disabled={disabled}
      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
        checked ? "bg-[#2E7D32]" : "bg-gray-200"
      } ${disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
    >
      <span
        className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform ${
          checked ? "translate-x-4.5" : "translate-x-0.5"
        }`}
      />
    </button>
  );
}

// ─── TAB: EXPLOITATION ────────────────────────────────────────────────────────
function TabExploitation() {
  const [editing, setEditing] = useState(false);
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs text-gray-500">
          Informations légales et techniques de votre exploitation AGRIFRIK.
        </p>
        {!editing ? (
          <button
            onClick={() => setEditing(true)}
            className="flex items-center gap-1.5 bg-[#2E7D32] text-white rounded-xl text-xs font-medium px-3 py-1.5"
          >
            <Edit3 size={13} /> Modifier
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={() => setEditing(false)}
              className="flex items-center gap-1.5 bg-gray-100 text-gray-700 rounded-xl text-xs font-medium px-3 py-1.5"
            >
              <X size={13} /> Annuler
            </button>
            <button
              onClick={() => setEditing(false)}
              className="flex items-center gap-1.5 bg-[#2E7D32] text-white rounded-xl text-xs font-medium px-3 py-1.5"
            >
              <Save size={13} /> Enregistrer
            </button>
          </div>
        )}
      </div>

      {/* Informations entreprise */}
      <div className="rounded-2xl border border-gray-100 bg-white p-5">
        <SectionTitle title="Informations entreprise" />
        <FieldRow label="Raison sociale" value="AGRIFRIK SAS" />
        <FieldRow label="RCCM" value="CI-SOB-2008-B-1142" />
        <FieldRow label="NIF" value="CI-2008-4721-B" />
        <FieldRow label="Siège social" value="Soubré, Région Nawa, Côte d'Ivoire" />
        <FieldRow label="Directeur général" value="Koffi Amani" />
        <FieldRow label="Email DG" value="koffi.amani@agrifrik.com" />
        <FieldRow label="Téléphone" value="+225 07 09 04 20 01" />
        <FieldRow label="Site web" value="www.agrifrik.com" />
      </div>

      {/* Informations exploitation principale */}
      <div className="rounded-2xl border border-gray-100 bg-white p-5 mt-4">
        <SectionTitle title="Informations exploitation principale" />
        <FieldRow label="Code exploitation" value="EXP-001" />
        <FieldRow label="Titre foncier" value="TF-SOUBRÉ-0042-2019" />
        <FieldRow label="Superficie" value="18,3 ha" />
        <FieldRow label="Zone géographique" value="Soubré, Région Nawa, CI" />
        <FieldRow label="Coordonnées GPS" value={"5°24‘18″N  6°59‘02″W"} />
        <FieldRow
          label="Cultures principales"
          value="Cacao PH16, Anacarde W240, Tilapia, Volailles"
        />
        <FieldRow
          label="Certification"
          value="Rainforest Alliance 2020 — N° RA-CI-2025-EFA001"
        />
      </div>

      {/* Paramètres régionaux */}
      <div className="rounded-2xl border border-gray-100 bg-white p-5 mt-4">
        <SectionTitle title="Paramètres régionaux" />
        <FieldRow label="Devise" value="XOF — Franc CFA UEMOA" />
        <FieldRow label="Langue interface" value="Français" />
        <FieldRow label="Référentiel comptable" value="SYSCOHADA révisé 2017" />
        <FieldRow label="Fuseau horaire" value="GMT (UTC+0) — Côte d'Ivoire" />
        <FieldRow label="Format date" value="DD/MM/YYYY" />
      </div>
    </div>
  );
}

// ─── TAB: COMPTE ──────────────────────────────────────────────────────────────
const USERS = [
  {
    nom: "Koffi Amani",
    role: "Directeur général",
    email: "koffi.amani@agrifrik.com",
    login: "Auj. 08h12",
  },
  {
    nom: "Adjoua Messou",
    role: "Responsable admin & finance",
    email: "adjoua.messou@agrifrik.com",
    login: "Auj. 07h55",
  },
  {
    nom: "Ibrahim Sawadogo",
    role: "Technicien terrain",
    email: "ibrahim.sawadogo@agrifrik.com",
    login: "Hier 17h30",
  },
  {
    nom: "Akissi Kouamé",
    role: "Saisonnière (accès limité)",
    email: "—",
    login: "05/07/2025",
  },
];

const PERMS = [
  { module: "Dashboard", dir: true, fin: true, tech: "view", portail: false },
  { module: "Finance / Comptabilité", dir: true, fin: true, tech: false, portail: false },
  { module: "Production / Élevage", dir: true, fin: "view", tech: true, portail: "view" },
  { module: "Commerce / Ventes", dir: true, fin: true, tech: "view", portail: false },
  { module: "RH / Paie", dir: true, fin: true, tech: "view", portail: false },
  { module: "Paramètres", dir: true, fin: "view", tech: false, portail: false },
];

function PermCell({ v }: { v: boolean | string }) {
  if (v === true) return <span className="text-[#2E7D32] text-sm">✅</span>;
  if (v === "view") return <span className="text-gray-400 text-sm">👁️</span>;
  return <span className="text-gray-300 text-sm">❌</span>;
}

function TabCompte() {
  return (
    <div className="space-y-4">
      {/* Utilisateurs actifs */}
      <div className="rounded-2xl border border-gray-100 bg-white p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-gray-800">Utilisateurs actifs</h3>
          <button className="flex items-center gap-1.5 bg-[#2E7D32] text-white rounded-xl text-xs font-medium px-3 py-1.5">
            <Plus size={13} /> Inviter un utilisateur
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-[#F8FBF8]">
                <th className="text-left px-3 py-2 font-medium text-gray-600 rounded-l-lg">Nom</th>
                <th className="text-left px-3 py-2 font-medium text-gray-600">Rôle</th>
                <th className="text-left px-3 py-2 font-medium text-gray-600">Email</th>
                <th className="text-left px-3 py-2 font-medium text-gray-600">Dernier login</th>
                <th className="text-left px-3 py-2 font-medium text-gray-600 rounded-r-lg">Statut</th>
              </tr>
            </thead>
            <tbody>
              {USERS.map((u, i) => (
                <tr key={i} className="border-b border-gray-50 last:border-0">
                  <td className="px-3 py-2.5 font-medium text-gray-800">{u.nom}</td>
                  <td className="px-3 py-2.5 text-gray-600">{u.role}</td>
                  <td className="px-3 py-2.5 text-gray-500">{u.email}</td>
                  <td className="px-3 py-2.5 text-gray-500">{u.login}</td>
                  <td className="px-3 py-2.5">
                    <span className="inline-flex items-center gap-1 text-[#2E7D32] font-medium">
                      <CheckCircle2 size={12} /> Actif
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Matrice de permissions */}
      <div className="rounded-2xl border border-gray-100 bg-white p-5">
        <div className="flex items-center gap-2 mb-4">
          <Shield size={15} className="text-[#2E7D32]" />
          <h3 className="text-sm font-semibold text-gray-800">Matrice de permissions</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-[#F8FBF8]">
                <th className="text-left px-3 py-2 font-medium text-gray-600 rounded-l-lg">Module</th>
                <th className="text-center px-3 py-2 font-medium text-gray-600">Directeur</th>
                <th className="text-center px-3 py-2 font-medium text-gray-600">Admin-Finance</th>
                <th className="text-center px-3 py-2 font-medium text-gray-600">Technicien</th>
                <th className="text-center px-3 py-2 font-medium text-gray-600 rounded-r-lg">Portail</th>
              </tr>
            </thead>
            <tbody>
              {PERMS.map((p, i) => (
                <tr key={i} className="border-b border-gray-50 last:border-0">
                  <td className="px-3 py-2.5 font-medium text-gray-700">{p.module}</td>
                  <td className="px-3 py-2.5 text-center"><PermCell v={p.dir} /></td>
                  <td className="px-3 py-2.5 text-center"><PermCell v={p.fin} /></td>
                  <td className="px-3 py-2.5 text-center"><PermCell v={p.tech} /></td>
                  <td className="px-3 py-2.5 text-center"><PermCell v={p.portail} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-3">✅ Accès complet · 👁️ Lecture seule · ❌ Aucun accès</p>
      </div>
    </div>
  );
}

// ─── TAB: NOTIFICATIONS ───────────────────────────────────────────────────────
type NotifSetting = { icon: string; label: string; detail: string; on: boolean; disabled?: boolean };

const NOTIF_SECTIONS: { section: string; items: NotifSetting[] }[] = [
  {
    section: "Alertes critiques (toujours actives)",
    items: [
      { icon: "🔔", label: "Seuil stock critique (Super Cupravit, KCl)", detail: "Email + SMS", on: true, disabled: true },
      { icon: "🔔", label: "Échéance paiement fournisseur", detail: "Email", on: true, disabled: true },
    ],
  },
  {
    section: "Alertes commerce",
    items: [
      { icon: "📧", label: "Devis expirant dans 7 jours", detail: "Email", on: true },
      { icon: "📧", label: "Facture non réglée à J+5", detail: "Email", on: true },
      { icon: "📧", label: "Cours cacao variation >5%", detail: "Email + Dashboard", on: true },
    ],
  },
  {
    section: "Rapports automatiques",
    items: [
      { icon: "📊", label: "Rapport hebdomadaire terrain", detail: "Chaque lundi 7h", on: true },
      { icon: "📊", label: "Rapport mensuel de gestion", detail: "1er du mois, 8h", on: true },
      { icon: "📊", label: "Bulletin météo quotidien", detail: "7h30", on: true },
    ],
  },
  {
    section: "Alertes RH",
    items: [
      { icon: "🗓️", label: "Rappel bulletin de paie", detail: "25 du mois", on: true },
      { icon: "🗓️", label: "Expiration contrat saisonnier", detail: "J-15 avant expiration", on: false },
    ],
  },
];

function TabNotifications() {
  const [states, setStates] = useState<Record<string, boolean>>(() => {
    const m: Record<string, boolean> = {};
    NOTIF_SECTIONS.forEach((s) =>
      s.items.forEach((item) => { m[item.label] = item.on; })
    );
    return m;
  });

  return (
    <div className="space-y-4">
      {NOTIF_SECTIONS.map((s) => (
        <div key={s.section} className="rounded-2xl border border-gray-100 bg-white p-5">
          <h3 className="text-xs font-semibold text-[#1B5E20] uppercase tracking-wider mb-3 border-b border-gray-100 pb-2">
            {s.section}
          </h3>
          <div className="space-y-3">
            {s.items.map((item) => (
              <div key={item.label} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-base">{item.icon}</span>
                  <div>
                    <p className="text-xs font-medium text-gray-800">{item.label}</p>
                    <p className="text-[11px] text-gray-400">{item.detail}</p>
                  </div>
                </div>
                <Toggle
                  checked={states[item.label] ?? item.on}
                  disabled={item.disabled}
                  onChange={(v) => setStates((prev) => ({ ...prev, [item.label]: v }))}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── TAB: INTÉGRATIONS ────────────────────────────────────────────────────────
type Integration = {
  service: string;
  statut: "connected" | "available" | "manual";
  compte: string;
  action: string;
};

const INTEGRATIONS: Integration[] = [
  { service: "Supabase (base de données)", statut: "connected", compte: "agrifrik-prod.supabase.co", action: "Tester" },
  { service: "SODEXAM CI (météo)", statut: "connected", compte: "Station AWS Soubré", action: "Voir données" },
  { service: "BCC Abidjan (cours cacao)", statut: "connected", compte: "bcc.ci/api/cours", action: "Voir cours" },
  { service: "CNRA CI (protocoles)", statut: "manual", compte: "—", action: "Se connecter" },
  { service: "WhatsApp Business API", statut: "available", compte: "Non activé", action: "Activer" },
  { service: "Stripe / CinetPay", statut: "available", compte: "Non configuré", action: "Configurer" },
];

function StatutBadge({ statut }: { statut: Integration["statut"] }) {
  if (statut === "connected")
    return (
      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#2E7D32] bg-green-50 px-2 py-0.5 rounded-full">
        <Wifi size={10} /> Connecté
      </span>
    );
  if (statut === "manual")
    return (
      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
        📋 Manuel
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
      <Circle size={8} className="fill-blue-400" /> Disponible
    </span>
  );
}

function TabIntegrations() {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5">
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-[#F8FBF8]">
              <th className="text-left px-3 py-2 font-medium text-gray-600 rounded-l-lg">Service</th>
              <th className="text-left px-3 py-2 font-medium text-gray-600">Statut</th>
              <th className="text-left px-3 py-2 font-medium text-gray-600">Compte / Endpoint</th>
              <th className="text-left px-3 py-2 font-medium text-gray-600 rounded-r-lg">Action</th>
            </tr>
          </thead>
          <tbody>
            {INTEGRATIONS.map((row, i) => (
              <tr key={i} className="border-b border-gray-50 last:border-0">
                <td className="px-3 py-3 font-medium text-gray-800">{row.service}</td>
                <td className="px-3 py-3"><StatutBadge statut={row.statut} /></td>
                <td className="px-3 py-3 text-gray-500 font-mono text-[11px]">{row.compte}</td>
                <td className="px-3 py-3">
                  <button className="flex items-center gap-1 text-[#2E7D32] font-medium hover:underline">
                    <ExternalLink size={11} /> {row.action}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── TAB: ABONNEMENT ──────────────────────────────────────────────────────────
function TabAbonnement() {
  return (
    <div className="space-y-4">
      {/* Plan card */}
      <div className="rounded-2xl bg-[#1B5E20] text-white p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-xs font-medium text-green-300 uppercase tracking-wider">Plan actif</p>
            <h3 className="text-xl font-bold mt-1">AGRIFRIK PRO — Plan Entreprise</h3>
          </div>
          <span className="text-xs bg-white/20 text-white px-3 py-1 rounded-full font-medium">Actif</span>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-5">
          {[
            ["Exploitation", "1 exploitation unique"],
            ["Utilisateurs", "10 utilisateurs max"],
            ["Modules", "Tous les modules inclus"],
            ["Stockage", "50 GB total"],
          ].map(([k, v]) => (
            <div key={k} className="bg-white/10 rounded-xl p-3">
              <p className="text-[11px] text-green-300">{k}</p>
              <p className="text-xs font-semibold mt-0.5">{v}</p>
            </div>
          ))}
        </div>

        {/* Stockage bar */}
        <div className="mb-5">
          <div className="flex justify-between text-xs text-green-200 mb-1.5">
            <span>Stockage utilisé</span>
            <span>0,8 GB / 50 GB</span>
          </div>
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <div className="h-full bg-white rounded-full" style={{ width: "1.6%" }} />
          </div>
        </div>

        <div className="border-t border-white/20 pt-4 grid grid-cols-2 gap-4">
          <div>
            <p className="text-[11px] text-green-300">Facturation</p>
            <p className="text-xs font-semibold">Annuelle — 480 000 XOF/an</p>
            <p className="text-[11px] text-green-300 mt-0.5">(40 000 XOF/mois)</p>
          </div>
          <div>
            <p className="text-[11px] text-green-300">Prochain renouvellement</p>
            <p className="text-xs font-semibold">31/12/2025</p>
          </div>
          <div className="col-span-2">
            <p className="text-[11px] text-green-300">Paiement</p>
            <p className="text-xs font-semibold">Virement SGBCI — Prochaine facture : Décembre 2025</p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button className="flex items-center gap-2 bg-[#2E7D32] text-white rounded-xl text-xs font-medium px-4 py-2.5">
          <CreditCard size={13} /> Gérer l&apos;abonnement
        </button>
        <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 rounded-xl text-xs font-medium px-4 py-2.5">
          <Download size={13} /> Télécharger la facture
        </button>
      </div>
    </div>
  );
}

// ─── PAGE ROOT ────────────────────────────────────────────────────────────────
export default function ParametresPage() {
  const [activeTab, setActiveTab] = useState("exploitation");

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Topbar />
      <main className="flex-1 p-6 max-w-5xl mx-auto w-full">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Settings size={20} className="text-[#2E7D32]" />
              <h1 className="text-xl font-bold text-gray-900">Paramètres</h1>
            </div>
            <p className="text-sm text-gray-500">Configuration de votre exploitation AGRIFRIK</p>
          </div>
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#2E7D32] bg-green-50 border border-green-100 px-3 py-1.5 rounded-full">
            <CheckCircle2 size={13} /> Version : AGRIFRIK ERP v2.4.1 (Juin 2025)
          </span>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white border border-gray-100 rounded-2xl p-1 mb-6 overflow-x-auto">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                  active
                    ? "bg-[#2E7D32] text-white shadow-sm"
                    : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"
                }`}
              >
                <Icon size={13} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        {activeTab === "exploitation" && <TabExploitation />}
        {activeTab === "compte" && <TabCompte />}
        {activeTab === "notifications" && <TabNotifications />}
        {activeTab === "integrations" && <TabIntegrations />}
        {activeTab === "abonnement" && <TabAbonnement />}
      </main>
    </div>
  );
}
