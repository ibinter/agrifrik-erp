"use client";

import { useState } from "react";
import { Monitor, Globe, Layout, LayoutDashboard, Bell, Save } from "lucide-react";
import Topbar from "../../../components/Topbar";
import { useTheme } from "../../../context/ThemeContext";

/* ------------------------------------------------------------------ */
/* Shared UI primitives                                                  */
/* ------------------------------------------------------------------ */

function SectionCard({
  children,
  title,
  icon,
}: {
  children: React.ReactNode;
  title: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <div className="flex items-center gap-2.5 px-6 py-4 border-b border-gray-100">
        <span className="text-[#2E7D32]">{icon}</span>
        <h2 className="text-sm font-semibold text-gray-900">{title}</h2>
      </div>
      <div className="p-6 space-y-5">{children}</div>
    </div>
  );
}

function FieldRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6">
      <label className="text-sm text-gray-600 font-medium sm:w-52 shrink-0 pt-0.5">{label}</label>
      <div className="flex-1">{children}</div>
    </div>
  );
}

function Toggle({
  checked,
  onChange,
  disabled,
}: {
  checked: boolean;
  onChange?: (v: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange?.(!checked)}
      className={`relative inline-flex w-10 h-6 rounded-full transition-colors shrink-0 ${
        checked ? "bg-[#2E7D32]" : "bg-gray-200"
      } ${disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
    >
      <span
        className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${
          checked ? "translate-x-4" : "translate-x-0"
        }`}
      />
    </button>
  );
}

function ChipGroup({
  options,
  value,
  onChange,
}: {
  options: { label: string; emoji?: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const active = value === opt.label;
        return (
          <button
            key={opt.label}
            type="button"
            onClick={() => onChange(opt.label)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
              active
                ? "bg-[#2E7D32] text-white border-[#2E7D32] shadow-sm"
                : "bg-white text-gray-700 border-gray-200 hover:border-[#2E7D32]/40"
            }`}
          >
            {opt.emoji && <span>{opt.emoji}</span>}
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

function SelectField({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border border-gray-200 rounded-xl px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#2E7D32] w-full max-w-xs"
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
}

function CheckItem({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-center gap-3 cursor-pointer group">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="accent-[#2E7D32] w-4 h-4 rounded"
      />
      <span className="text-sm text-gray-700 group-hover:text-gray-900">{label}</span>
    </label>
  );
}

/* ------------------------------------------------------------------ */
/* Theme mapping                                                          */
/* ------------------------------------------------------------------ */

const THEME_LABEL_TO_VALUE = {
  "☀️ Clair": "light",
  "🌙 Sombre": "dark",
  "💻 Système": "system",
} as const;

const THEME_VALUE_TO_LABEL: Record<string, string> = {
  light: "☀️ Clair",
  dark: "🌙 Sombre",
  system: "💻 Système",
};

/* ------------------------------------------------------------------ */
/* Page                                                                   */
/* ------------------------------------------------------------------ */

const PAGE_OPTIONS = [
  "Dashboard",
  "Cultures",
  "Stocks",
  "Ventes",
  "Comptabilité",
  "Achats",
  "RH",
  "Paie",
  "Rapports",
  "Calendrier",
  "Logistique",
  "Facturation",
];

export default function PreferencesPage() {
  /* Apparence */
  const { theme: themeValue, setTheme: setThemeValue } = useTheme();
  const [densite, setDensite] = useState("Normal");
  const [police, setPolice] = useState("Système");

  /* Langue & région */
  const [langue, setLangue] = useState("Français (FR)");
  const [devise, setDevise] = useState("XOF (FCFA)");
  const [formatDate, setFormatDate] = useState("JJ/MM/AAAA");
  const [formatNombre, setFormatNombre] = useState("1 234 567,89 (espace + virgule, FCFA)");

  /* Page d'accueil */
  const [pageAccueil, setPageAccueil] = useState("Dashboard");

  /* Widgets */
  const [widgets, setWidgets] = useState({
    kpiProduction: true,
    alertesCritiques: true,
    meteo: true,
    tachesJour: true,
    evolutionCA: true,
    calendrierAgricole: false,
    coursMatPrem: false,
  });

  /* Notifications push */
  const [notifs, setNotifs] = useState({
    alertesStock: true,
    nouvellesCommandes: true,
    rapportsGeneres: false,
    recoIA: true,
    rappelsCalendrier: true,
    messagerie: true,
  });

  const themeLabel = THEME_VALUE_TO_LABEL[themeValue] ?? "💻 Système";

  function handleThemeChange(label: string) {
    const value = THEME_LABEL_TO_VALUE[label as keyof typeof THEME_LABEL_TO_VALUE];
    if (value) setThemeValue(value);
  }

  function setWidget(key: keyof typeof widgets, v: boolean) {
    setWidgets((prev) => ({ ...prev, [key]: v }));
  }

  function setNotif(key: keyof typeof notifs, v: boolean) {
    setNotifs((prev) => ({ ...prev, [key]: v }));
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Topbar title="Préférences" breadcrumb={["Paramètres", "Préférences"]} />

      <main className="flex-1 p-6 max-w-3xl mx-auto w-full space-y-6">

        {/* Apparence */}
        <SectionCard title="Apparence" icon={<Monitor size={18} />}>
          <FieldRow label="Thème">
            <ChipGroup
              options={[
                { label: "☀️ Clair" },
                { label: "🌙 Sombre" },
                { label: "💻 Système" },
              ]}
              value={themeLabel}
              onChange={handleThemeChange}
            />
          </FieldRow>
          <FieldRow label="Densité d'affichage">
            <ChipGroup
              options={[{ label: "Compact" }, { label: "Normal" }, { label: "Confortable" }]}
              value={densite}
              onChange={setDensite}
            />
          </FieldRow>
          <FieldRow label="Police d'interface">
            <ChipGroup
              options={[{ label: "Système" }, { label: "Roboto" }, { label: "Inter" }]}
              value={police}
              onChange={setPolice}
            />
          </FieldRow>
        </SectionCard>

        {/* Langue & région */}
        <SectionCard title="Langue & Région" icon={<Globe size={18} />}>
          <FieldRow label="Langue interface">
            <SelectField
              value={langue}
              onChange={setLangue}
              options={["Français (FR)", "English"]}
            />
          </FieldRow>
          <FieldRow label="Devise d'affichage">
            <SelectField
              value={devise}
              onChange={setDevise}
              options={["XOF (FCFA)", "EUR", "USD"]}
            />
          </FieldRow>
          <FieldRow label="Format de date">
            <ChipGroup
              options={[
                { label: "JJ/MM/AAAA" },
                { label: "MM/DD/YYYY" },
                { label: "AAAA-MM-JJ" },
              ]}
              value={formatDate}
              onChange={setFormatDate}
            />
          </FieldRow>
          <FieldRow label="Format nombre">
            <SelectField
              value={formatNombre}
              onChange={setFormatNombre}
              options={[
                "1 234 567,89 (espace + virgule, FCFA)",
                "1,234,567.89",
              ]}
            />
          </FieldRow>
        </SectionCard>

        {/* Page d'accueil */}
        <SectionCard title="Page d'accueil" icon={<Layout size={18} />}>
          <FieldRow label="Page de démarrage">
            <SelectField
              value={pageAccueil}
              onChange={setPageAccueil}
              options={PAGE_OPTIONS}
            />
          </FieldRow>
          <p className="text-xs text-gray-400">
            Cette page s&apos;affiche automatiquement après votre connexion.
          </p>
        </SectionCard>

        {/* Tableau de bord — widgets */}
        <SectionCard title="Tableau de bord" icon={<LayoutDashboard size={18} />}>
          <p className="text-xs text-gray-500 -mt-2">Choisissez les widgets visibles sur votre dashboard.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <CheckItem label="KPI production" checked={widgets.kpiProduction} onChange={(v) => setWidget("kpiProduction", v)} />
            <CheckItem label="Alertes critiques" checked={widgets.alertesCritiques} onChange={(v) => setWidget("alertesCritiques", v)} />
            <CheckItem label="Météo" checked={widgets.meteo} onChange={(v) => setWidget("meteo", v)} />
            <CheckItem label="Tâches du jour" checked={widgets.tachesJour} onChange={(v) => setWidget("tachesJour", v)} />
            <CheckItem label="Évolution CA" checked={widgets.evolutionCA} onChange={(v) => setWidget("evolutionCA", v)} />
            <CheckItem label="Calendrier agricole" checked={widgets.calendrierAgricole} onChange={(v) => setWidget("calendrierAgricole", v)} />
            <CheckItem label="Cours des matières premières" checked={widgets.coursMatPrem} onChange={(v) => setWidget("coursMatPrem", v)} />
          </div>
        </SectionCard>

        {/* Notifications push */}
        <SectionCard title="Notifications push" icon={<Bell size={18} />}>
          {[
            { key: "alertesStock" as const, label: "Alertes stock critique", desc: "Notification quand un stock passe sous le seuil critique" },
            { key: "nouvellesCommandes" as const, label: "Nouvelles commandes", desc: "Réception d'une commande client ou fournisseur" },
            { key: "rapportsGeneres" as const, label: "Rapports générés", desc: "Quand un rapport automatique est prêt" },
            { key: "recoIA" as const, label: "Recommandations IA", desc: "Suggestions hebdomadaires du module IA agricole" },
            { key: "rappelsCalendrier" as const, label: "Rappels calendrier", desc: "Rappels d'événements agricoles et tâches planifiées" },
            { key: "messagerie" as const, label: "Messages (messagerie interne)", desc: "Nouveaux messages reçus dans la messagerie AGRIFRIK" },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-gray-800">{item.label}</p>
                <p className="text-xs text-gray-400">{item.desc}</p>
              </div>
              <Toggle
                checked={notifs[item.key]}
                onChange={(v) => setNotif(item.key, v)}
              />
            </div>
          ))}
        </SectionCard>

        {/* Sauvegarder */}
        <button className="w-full flex items-center justify-center gap-2 bg-[#2E7D32] hover:bg-[#1B5E20] text-white text-sm font-semibold py-3.5 rounded-xl transition-colors shadow-sm">
          <Save size={16} />
          Sauvegarder les préférences
        </button>

      </main>
    </div>
  );
}
