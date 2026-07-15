"use client";

import { useState } from "react";
import { User, Shield, Sliders, Plug, Monitor, Globe, LayoutDashboard, Bell, Save, RotateCcw } from "lucide-react";
import Topbar from "../../../components/Topbar";
import { useTheme } from "../../../context/ThemeContext";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/* Primitives                                                            */
/* ------------------------------------------------------------------ */

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex w-10 h-6 rounded-full transition-colors shrink-0 cursor-pointer ${checked ? "bg-[#2E7D32]" : "bg-gray-200"}`}
    >
      <span className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${checked ? "translate-x-4" : "translate-x-0"}`} />
    </button>
  );
}

function SectionCard({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <div className="flex items-center gap-2.5 px-6 py-4 border-b border-gray-100">
        <span className="text-[#2E7D32]">{icon}</span>
        <h2 className="text-sm font-semibold text-gray-900">{title}</h2>
      </div>
      <div className="p-4 sm:p-6 space-y-6">{children}</div>
    </div>
  );
}

function FieldRow({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6">
      <div className="sm:w-52 shrink-0">
        <p className="text-sm text-gray-700 font-medium">{label}</p>
        {hint && <p className="text-xs text-gray-400 mt-0.5">{hint}</p>}
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}

function RadioCards({ options, value, onChange }: { options: { label: string; sub?: string; preview?: React.ReactNode }[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-wrap gap-3">
      {options.map((opt) => {
        const active = value === opt.label;
        return (
          <button
            key={opt.label}
            type="button"
            onClick={() => onChange(opt.label)}
            className={`flex flex-col gap-2 px-4 py-3 rounded-xl border-2 text-left transition-all min-w-[110px] ${active ? "border-[#2E7D32] bg-green-50" : "border-gray-200 bg-white hover:border-gray-300"}`}
          >
            {opt.preview && <div className="w-full">{opt.preview}</div>}
            <span className={`text-sm font-medium ${active ? "text-[#2E7D32]" : "text-gray-700"}`}>{opt.label}</span>
            {opt.sub && <span className="text-xs text-gray-400">{opt.sub}</span>}
          </button>
        );
      })}
    </div>
  );
}

function ChipGroup({ options, value, onChange }: { options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const active = value === opt;
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${active ? "bg-[#2E7D32] text-white border-[#2E7D32] shadow-sm" : "bg-white text-gray-700 border-gray-200 hover:border-[#2E7D32]/40"}`}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}

function SelectField({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border border-gray-200 rounded-xl px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#2E7D32] w-full max-w-xs"
    >
      {options.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
    </select>
  );
}

function CheckItem({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
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

/* Theme preview mini-mockups */
function PreviewLight() {
  return (
    <div className="w-full h-12 rounded-lg overflow-hidden flex border border-gray-200">
      <div className="w-8 bg-[#1A2E1A]" />
      <div className="flex-1 bg-white flex flex-col justify-center px-1.5 gap-0.5">
        <div className="h-1.5 bg-gray-200 rounded w-3/4" />
        <div className="h-1 bg-gray-100 rounded w-1/2" />
      </div>
    </div>
  );
}

function PreviewDark() {
  return (
    <div className="w-full h-12 rounded-lg overflow-hidden flex border border-gray-700">
      <div className="w-8 bg-black" />
      <div className="flex-1 bg-gray-800 flex flex-col justify-center px-1.5 gap-0.5">
        <div className="h-1.5 bg-gray-600 rounded w-3/4" />
        <div className="h-1 bg-gray-700 rounded w-1/2" />
      </div>
    </div>
  );
}

function PreviewSystem() {
  return (
    <div className="w-full h-12 rounded-lg overflow-hidden flex border border-gray-200">
      <div className="w-8" style={{ background: "linear-gradient(to bottom, #1A2E1A 50%, black 50%)" }} />
      <div className="flex-1" style={{ background: "linear-gradient(to bottom, white 50%, #1e1e1e 50%)" }} />
    </div>
  );
}

/* Accent colors */
const ACCENT_COLORS = [
  { label: "Vert AGRIFRIK", hex: "#2E7D32" },
  { label: "Bleu", hex: "#1565C0" },
  { label: "Violet", hex: "#6A1B9A" },
  { label: "Orange", hex: "#E65100" },
  { label: "Gris", hex: "#37474F" },
  { label: "Marron", hex: "#4E342E" },
];

/* ------------------------------------------------------------------ */
/* Page                                                                   */
/* ------------------------------------------------------------------ */

const THEME_LABEL_TO_VALUE = { "Clair": "light", "Sombre": "dark", "Système": "system" } as const;
const THEME_VALUE_TO_LABEL: Record<string, string> = { light: "Clair", dark: "Sombre", system: "Système" };

const LEFT_MENU = [
  { label: "Profil", icon: User, href: "/parametres/profil" },
  { label: "Sécurité", icon: Shield, href: "/parametres/securite" },
  { label: "Préférences", icon: Sliders, href: "/parametres/preferences" },
  { label: "Intégrations", icon: Plug, href: "/parametres/integrations" },
];

export default function PreferencesPage() {
  const { theme: themeValue, setTheme: setThemeValue } = useTheme();
  const themeLabel = THEME_VALUE_TO_LABEL[themeValue] ?? "Système";

  const [accent, setAccent] = useState("#2E7D32");
  const [densite, setDensite] = useState("Normal");

  const [langue, setLangue] = useState("Français (CI)");
  const [devise, setDevise] = useState("XOF — Franc CFA UEMOA");
  const [formatDate, setFormatDate] = useState("JJ/MM/AAAA");
  const [formatNombre, setFormatNombre] = useState("1 234 567 (espace)");
  const [fuseau, setFuseau] = useState("Africa/Abidjan (UTC+0)");
  const [semaine, setSemaine] = useState("Lundi");

  const [pageAccueil, setPageAccueil] = useState("Tableau de bord");
  const [widgets, setWidgets] = useState({
    kpiProduction: true,
    coursCacao: true,
    alertes: true,
    meteo: true,
    planning: true,
    topCultures: true,
    messagerie: false,
    agenda: false,
  });
  const [graphiques, setGraphiques] = useState("SVG natif");

  const [sons, setSons] = useState(false);
  const [badges, setBadges] = useState(true);
  const [notifBureau, setNotifBureau] = useState(false);
  const [resumeHeure, setResumeHeure] = useState("08h00");

  function setWidget(k: keyof typeof widgets, v: boolean) {
    setWidgets((p) => ({ ...p, [k]: v }));
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Topbar title="Préférences" breadcrumb={["Paramètres", "Préférences"]} />

      <main className="flex-1 p-6 max-w-6xl mx-auto w-full">
        <div className="flex gap-6 items-start">

          {/* ---- LEFT COLUMN ---- */}
          <aside className="w-70 shrink-0 space-y-4">
            {/* Avatar card */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 flex flex-col items-center gap-3">
              <div className="w-16 h-16 rounded-full bg-[#2E7D32] flex items-center justify-center text-white text-xl font-bold">
                AA
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold text-gray-900">Admin AGRIFRIK</p>
                <p className="text-xs text-gray-400">admin@agrifrik.com</p>
              </div>
              <span className="text-xs px-2.5 py-1 bg-green-50 text-[#2E7D32] rounded-full font-medium">Administrateur</span>
            </div>

            {/* Nav menu */}
            <nav className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              {LEFT_MENU.map((item) => {
                const Icon = item.icon;
                const active = item.label === "Préférences";
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

            {/* Apparence */}
            <SectionCard title="Apparence" icon={<Monitor size={18} />}>
              <FieldRow label="Thème" hint="Choisissez l'apparence visuelle">
                <div className="flex gap-4 flex-wrap">
                  {[
                    { label: "Clair", sub: "Fond blanc, sidebar verte", preview: <PreviewLight /> },
                    { label: "Sombre", sub: "Fond gris foncé, sidebar noire", preview: <PreviewDark /> },
                    { label: "Système", sub: "Suit les préférences OS", preview: <PreviewSystem /> },
                  ].map((opt) => {
                    const active = themeLabel === opt.label;
                    return (
                      <button
                        key={opt.label}
                        type="button"
                        onClick={() => setThemeValue(THEME_LABEL_TO_VALUE[opt.label as keyof typeof THEME_LABEL_TO_VALUE])}
                        className={`flex flex-col gap-2 p-3 rounded-xl border-2 text-left transition-all w-36 ${active ? "border-[#2E7D32] bg-green-50" : "border-gray-200 bg-white hover:border-gray-300"}`}
                      >
                        {opt.preview}
                        <span className={`text-sm font-medium ${active ? "text-[#2E7D32]" : "text-gray-700"}`}>{opt.label}</span>
                        <span className="text-xs text-gray-400 leading-tight">{opt.sub}</span>
                      </button>
                    );
                  })}
                </div>
              </FieldRow>

              <FieldRow label="Couleur d'accentuation">
                <div className="flex gap-3 flex-wrap">
                  {ACCENT_COLORS.map((c) => (
                    <button
                      key={c.hex}
                      type="button"
                      title={c.label}
                      onClick={() => setAccent(c.hex)}
                      className={`w-8 h-8 rounded-full border-2 transition-all ${accent === c.hex ? "border-gray-900 scale-110 shadow-md" : "border-transparent hover:scale-105"}`}
                      style={{ backgroundColor: c.hex }}
                    />
                  ))}
                </div>
                <p className="text-xs text-gray-400 mt-2">Sélectionné : {ACCENT_COLORS.find((c) => c.hex === accent)?.label}</p>
              </FieldRow>

              <FieldRow label="Densité d'affichage">
                <div className="space-y-2">
                  {[
                    { label: "Compact", desc: "Tableaux plus denses, moins d'espacement" },
                    { label: "Normal", desc: "Équilibre espace/contenu" },
                    { label: "Confortable", desc: "Plus d'espacement, lecture facilitée" },
                  ].map((opt) => (
                    <label key={opt.label} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="densite"
                        value={opt.label}
                        checked={densite === opt.label}
                        onChange={() => setDensite(opt.label)}
                        className="accent-[#2E7D32]"
                      />
                      <div>
                        <span className="text-sm font-medium text-gray-700">{opt.label}</span>
                        <span className="text-xs text-gray-400 ml-2">— {opt.desc}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </FieldRow>
            </SectionCard>

            {/* Langue & Région */}
            <SectionCard title="Langue & Région" icon={<Globe size={18} />}>
              <FieldRow label="Langue de l'interface">
                <SelectField value={langue} onChange={setLangue} options={["Français (CI)", "Anglais", "Dioula", "Moore"]} />
              </FieldRow>
              <FieldRow label="Devise principale">
                <SelectField value={devise} onChange={setDevise} options={["XOF — Franc CFA UEMOA", "EUR", "USD"]} />
              </FieldRow>
              <FieldRow label="Format date">
                <ChipGroup options={["JJ/MM/AAAA", "MM/JJ/AAAA", "AAAA-MM-JJ"]} value={formatDate} onChange={setFormatDate} />
              </FieldRow>
              <FieldRow label="Format nombres">
                <div className="space-y-2">
                  {[
                    { label: "1 234 567 (espace)", desc: "Séparateur espace — standard CI/UEMOA" },
                    { label: "1,234,567 (virgule)", desc: "Séparateur virgule — format anglais" },
                  ].map((opt) => (
                    <label key={opt.label} className="flex items-center gap-3 cursor-pointer">
                      <input type="radio" name="formatNombre" value={opt.label} checked={formatNombre === opt.label} onChange={() => setFormatNombre(opt.label)} className="accent-[#2E7D32]" />
                      <div>
                        <span className="text-sm font-medium text-gray-700">{opt.label}</span>
                        <span className="text-xs text-gray-400 ml-2">— {opt.desc}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </FieldRow>
              <FieldRow label="Fuseau horaire">
                <SelectField value={fuseau} onChange={setFuseau} options={["Africa/Abidjan (UTC+0)", "Africa/Lagos (UTC+1)", "Europe/Paris (UTC+1/+2)", "UTC"]} />
              </FieldRow>
              <FieldRow label="Semaine commence le">
                <ChipGroup options={["Lundi", "Dimanche"]} value={semaine} onChange={setSemaine} />
              </FieldRow>
            </SectionCard>

            {/* Dashboard & Affichage */}
            <SectionCard title="Dashboard & Affichage" icon={<LayoutDashboard size={18} />}>
              <FieldRow label="Page d'accueil par défaut">
                <SelectField
                  value={pageAccueil}
                  onChange={setPageAccueil}
                  options={["Tableau de bord", "Prix marchés", "Alertes", "Cartographie"]}
                />
              </FieldRow>

              <FieldRow label="Widgets dashboard" hint="Affichés par défaut sur votre tableau de bord">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <CheckItem label="KPI Production" checked={widgets.kpiProduction} onChange={(v) => setWidget("kpiProduction", v)} />
                  <CheckItem label="Cours cacao BCC" checked={widgets.coursCacao} onChange={(v) => setWidget("coursCacao", v)} />
                  <CheckItem label="Alertes et notifications" checked={widgets.alertes} onChange={(v) => setWidget("alertes", v)} />
                  <CheckItem label="Météo 3 jours" checked={widgets.meteo} onChange={(v) => setWidget("meteo", v)} />
                  <CheckItem label="Planning semaine" checked={widgets.planning} onChange={(v) => setWidget("planning", v)} />
                  <CheckItem label="Top cultures" checked={widgets.topCultures} onChange={(v) => setWidget("topCultures", v)} />
                  <CheckItem label="Flux messagerie" checked={widgets.messagerie} onChange={(v) => setWidget("messagerie", v)} />
                  <CheckItem label="Agenda détaillé" checked={widgets.agenda} onChange={(v) => setWidget("agenda", v)} />
                </div>
              </FieldRow>

              <FieldRow label="Graphiques">
                <div className="space-y-2">
                  {[
                    { label: "SVG natif", desc: "Graphiques vectoriels intégrés (recommandé)" },
                    { label: "Mode minimaliste", desc: "Tableaux uniquement, sans graphiques" },
                  ].map((opt) => (
                    <label key={opt.label} className="flex items-center gap-3 cursor-pointer">
                      <input type="radio" name="graphiques" value={opt.label} checked={graphiques === opt.label} onChange={() => setGraphiques(opt.label)} className="accent-[#2E7D32]" />
                      <div>
                        <span className="text-sm font-medium text-gray-700">{opt.label}</span>
                        <span className="text-xs text-gray-400 ml-2">— {opt.desc}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </FieldRow>
            </SectionCard>

            {/* Notifications visuelles */}
            <SectionCard title="Notifications visuelles" icon={<Bell size={18} />}>
              <FieldRow label="Sons de notification">
                <Toggle checked={sons} onChange={setSons} />
              </FieldRow>
              <FieldRow label="Badges de compteur" hint="Compteurs sur les icônes du menu">
                <Toggle checked={badges} onChange={setBadges} />
              </FieldRow>
              <FieldRow label="Notifications bureau">
                <div className="flex items-center gap-4">
                  <Toggle checked={notifBureau} onChange={setNotifBureau} />
                  {!notifBureau && (
                    <button
                      type="button"
                      className="text-xs text-[#2E7D32] font-medium underline underline-offset-2"
                      onClick={() => {
                        Notification.requestPermission().then((p) => { if (p === "granted") setNotifBureau(true); });
                      }}
                    >
                      Activer les notifications navigateur
                    </button>
                  )}
                </div>
              </FieldRow>
              <FieldRow label="Résumé quotidien" hint="Heure de réception du résumé par email">
                <SelectField value={resumeHeure} onChange={setResumeHeure} options={["06h00", "07h00", "08h00", "09h00", "12h00", "17h00", "Désactivé"]} />
              </FieldRow>
            </SectionCard>

            {/* Actions */}
            <div className="flex gap-3">
              <button className="flex-1 flex items-center justify-center gap-2 bg-[#2E7D32] hover:bg-[#1B5E20] text-white text-sm font-semibold py-3.5 rounded-xl transition-colors shadow-sm">
                <Save size={16} />
                Enregistrer les préférences
              </button>
              <button className="flex items-center gap-2 px-5 py-3.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                <RotateCcw size={14} />
                Réinitialiser aux valeurs par défaut
              </button>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
