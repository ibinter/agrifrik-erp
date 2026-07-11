"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight, ChevronLeft, Check, Upload, CalendarDays, LayoutDashboard } from "lucide-react";

/* ─── Types ─── */
type Culture = {
  id: string;
  label: string;
  emoji: string;
  superficie: string;
};

type InviteRow = { email: string; role: string };

type FormData = {
  // Étape 1
  nomEntreprise: string;
  formeJuridique: string;
  pays: string;
  region: string;
  rccm: string;
  telephone: string;
  devise: string;
  // Étape 2
  nomExploitation: string;
  superficie: string;
  nbParcelles: string;
  typeSol: string;
  eau: string;
  certifications: string[];
  // Étape 3 — cultures
  cultures: Culture[];
  // Étape 4
  employesPermanents: string;
  saisonniers: string;
  roles: string[];
  invitations: InviteRow[];
};

const CULTURES_DISPO = [
  { id: "cacao", label: "Cacao", emoji: "🍫" },
  { id: "anacarde", label: "Anacarde", emoji: "🥜" },
  { id: "palmier", label: "Palmier à huile", emoji: "🌴" },
  { id: "cafe", label: "Café", emoji: "☕" },
  { id: "coton", label: "Coton", emoji: "🌿" },
  { id: "mais", label: "Maïs", emoji: "🌽" },
  { id: "riz", label: "Riz", emoji: "🍚" },
  { id: "banane", label: "Banane", emoji: "🍌" },
  { id: "mangue", label: "Mangue", emoji: "🥭" },
  { id: "legumes", label: "Légumes", emoji: "🌱" },
  { id: "elevage", label: "Élevage", emoji: "🐄" },
  { id: "pisciculture", label: "Pisciculture", emoji: "🐟" },
];

const ROLES_DISPO = [
  "Directeur financier",
  "Responsable terrain",
  "Technicien agricole",
  "Comptable",
  "Responsable qualité",
  "Chauffeur/Logistique",
];

const CERTIFICATIONS_DISPO = [
  "Rainforest Alliance",
  "GlobalG.A.P.",
  "Agriculture Bio",
  "Fairtrade",
  "RSPO",
  "Aucune",
];

const STEP_LABELS = [
  "Votre entreprise",
  "Votre exploitation",
  "Vos cultures",
  "Vos équipes",
  "Terminé",
];

const INITIAL_FORM: FormData = {
  nomEntreprise: "",
  formeJuridique: "",
  pays: "",
  region: "",
  rccm: "",
  telephone: "",
  devise: "",
  nomExploitation: "",
  superficie: "",
  nbParcelles: "",
  typeSol: "",
  eau: "",
  certifications: [],
  cultures: [],
  employesPermanents: "",
  saisonniers: "",
  roles: [],
  invitations: [
    { email: "", role: "" },
    { email: "", role: "" },
    { email: "", role: "" },
  ],
};

/* ─── Helpers ─── */
function Label({ children }: { children: React.ReactNode }) {
  return <p className="text-sm font-medium text-gray-700 mb-1.5">{children}</p>;
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`border border-gray-200 rounded-xl px-4 py-3 text-sm w-full focus:outline-none focus:ring-2 focus:ring-[#2E7D32] transition ${props.className ?? ""}`}
    />
  );
}

function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={`border border-gray-200 rounded-xl px-4 py-3 text-sm w-full focus:outline-none focus:ring-2 focus:ring-[#2E7D32] bg-white transition ${props.className ?? ""}`}
    />
  );
}

/* ─── Composant principal ─── */
export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<string>("");
  const router = useRouter();

  /* helpers set */
  const set = (field: keyof FormData, value: unknown) =>
    setForm((f) => ({ ...f, [field]: value }));

  const toggleCheck = (field: "certifications" | "roles", val: string) => {
    setForm((f) => {
      const arr = f[field] as string[];
      return {
        ...f,
        [field]: arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val],
      };
    });
  };

  const toggleCulture = (id: string) => {
    setForm((f) => {
      const exists = f.cultures.find((c) => c.id === id);
      if (exists) return { ...f, cultures: f.cultures.filter((c) => c.id !== id) };
      const meta = CULTURES_DISPO.find((c) => c.id === id)!;
      return { ...f, cultures: [...f.cultures, { ...meta, superficie: "" }] };
    });
  };

  const setCultureSup = (id: string, superficie: string) => {
    setForm((f) => ({
      ...f,
      cultures: f.cultures.map((c) => (c.id === id ? { ...c, superficie } : c)),
    }));
  };

  const setInvite = (idx: number, field: keyof InviteRow, val: string) => {
    setForm((f) => {
      const invitations = [...f.invitations];
      invitations[idx] = { ...invitations[idx], [field]: val };
      return { ...f, invitations };
    });
  };

  /* validation basique */
  const validate = (): boolean => {
    if (step === 1) {
      if (!form.nomEntreprise.trim()) { setErrors("Le nom de l'entreprise est requis."); return false; }
      if (!form.pays) { setErrors("Le pays est requis."); return false; }
    }
    if (step === 2) {
      if (!form.nomExploitation.trim()) { setErrors("Le nom de l'exploitation est requis."); return false; }
    }
    if (step === 3) {
      if (form.cultures.length === 0) { setErrors("Sélectionnez au moins une culture."); return false; }
    }
    setErrors("");
    return true;
  };

  const next = () => { if (validate()) setStep((s) => Math.min(s + 1, 5)); };
  const prev = () => { setErrors(""); setStep((s) => Math.max(s - 1, 1)); };

  const nbInvitesEnvoyees = form.invitations.filter((i) => i.email.trim()).length;

  return (
    <div className="min-h-screen flex">
      {/* ── Bande gauche ── */}
      <div
        className="hidden lg:flex lg:w-64 xl:w-72 flex-col justify-between p-10"
        style={{ background: "linear-gradient(160deg, #1A3B1A 0%, #2E7D32 100%)" }}
      >
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-lg"
            style={{ background: "rgba(76,175,80,0.25)", color: "#A5D6A7" }}
          >
            A
          </div>
          <span className="text-white text-lg font-extrabold tracking-widest">AGRIFRIK</span>
        </div>

        {/* Étapes latérales */}
        <div className="space-y-6">
          {STEP_LABELS.map((label, i) => {
            const n = i + 1;
            const done = step > n;
            const active = step === n;
            return (
              <div key={n} className="flex items-center gap-3">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                  style={{
                    background: done ? "#4CAF50" : active ? "white" : "rgba(255,255,255,0.15)",
                    color: done ? "white" : active ? "#1B5E20" : "rgba(255,255,255,0.5)",
                  }}
                >
                  {done ? <Check className="w-3.5 h-3.5" /> : n}
                </div>
                <span
                  className="text-sm font-medium"
                  style={{
                    color: active ? "white" : done ? "#A5D6A7" : "rgba(255,255,255,0.45)",
                  }}
                >
                  {label}
                </span>
              </div>
            );
          })}
        </div>

        <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
          © 2025 AGRIFRIK SAS
        </p>
      </div>

      {/* ── Zone principale ── */}
      <div className="flex-1 bg-gray-50 flex flex-col">
        {/* Barre de progression mobile + top */}
        <div className="bg-white border-b border-gray-100 px-8 py-4">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center gap-3">
              {STEP_LABELS.map((label, i) => {
                const n = i + 1;
                const done = step > n;
                const active = step === n;
                return (
                  <div key={n} className="flex items-center gap-2 flex-1 min-w-0">
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                      style={{
                        background: done ? "#2E7D32" : active ? "#E8F5E9" : "#F3F4F6",
                        color: done ? "white" : active ? "#2E7D32" : "#9CA3AF",
                        border: active ? "2px solid #2E7D32" : "none",
                      }}
                    >
                      {done ? <Check className="w-3 h-3" /> : n}
                    </div>
                    <span
                      className="text-xs font-medium hidden sm:block truncate"
                      style={{ color: active ? "#2E7D32" : done ? "#4CAF50" : "#9CA3AF" }}
                    >
                      {label}
                    </span>
                    {i < STEP_LABELS.length - 1 && (
                      <div
                        className="flex-1 h-0.5 ml-1"
                        style={{ background: done ? "#4CAF50" : "#E5E7EB" }}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Contenu de l'étape */}
        <div className="flex-1 overflow-y-auto px-6 py-10">
          <div className="max-w-2xl mx-auto">
            {/* ─── Étape 1 ─── */}
            {step === 1 && (
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-1">Votre entreprise</h1>
                <p className="text-gray-500 text-sm mb-8">Informations générales sur votre structure</p>

                <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
                  <div>
                    <Label>Nom de l&apos;entreprise *</Label>
                    <Input
                      placeholder="AGRIFRIK SAS"
                      value={form.nomEntreprise}
                      onChange={(e) => set("nomEntreprise", e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Forme juridique</Label>
                      <Select value={form.formeJuridique} onChange={(e) => set("formeJuridique", e.target.value)}>
                        <option value="">Sélectionner…</option>
                        {["SAS", "SARL", "SA", "Coopérative", "Association", "Individuel"].map((v) => (
                          <option key={v}>{v}</option>
                        ))}
                      </Select>
                    </div>
                    <div>
                      <Label>Devise principale</Label>
                      <Select value={form.devise} onChange={(e) => set("devise", e.target.value)}>
                        <option value="">Sélectionner…</option>
                        {["XOF", "GHS", "KES", "XAF", "NGN"].map((v) => (
                          <option key={v}>{v}</option>
                        ))}
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label>Pays *</Label>
                    <Select value={form.pays} onChange={(e) => set("pays", e.target.value)}>
                      <option value="">Sélectionner…</option>
                      {[
                        "Côte d'Ivoire",
                        "Sénégal",
                        "Burkina Faso",
                        "Mali",
                        "Ghana",
                        "Cameroun",
                        "Kenya",
                        "Autres",
                      ].map((v) => (
                        <option key={v}>{v}</option>
                      ))}
                    </Select>
                  </div>

                  <div>
                    <Label>Région / Ville</Label>
                    <Input
                      placeholder="Soubré, Nawa"
                      value={form.region}
                      onChange={(e) => set("region", e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>RCCM (optionnel)</Label>
                      <Input
                        placeholder="CI-ABJ-2024-…"
                        value={form.rccm}
                        onChange={(e) => set("rccm", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Téléphone principal</Label>
                      <Input
                        placeholder="+225 07 00 00 00 00"
                        value={form.telephone}
                        onChange={(e) => set("telephone", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ─── Étape 2 ─── */}
            {step === 2 && (
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-1">Votre exploitation</h1>
                <p className="text-gray-500 text-sm mb-8">Caractéristiques de votre exploitation principale</p>

                <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
                  <div>
                    <Label>Nom de l&apos;exploitation *</Label>
                    <Input
                      placeholder="Plantation principale"
                      value={form.nomExploitation}
                      onChange={(e) => set("nomExploitation", e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Superficie totale</Label>
                      <div className="relative">
                        <Input
                          placeholder="0"
                          value={form.superficie}
                          onChange={(e) => set("superficie", e.target.value)}
                          className="pr-10"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 font-medium">
                          ha
                        </span>
                      </div>
                    </div>
                    <div>
                      <Label>Nombre de parcelles</Label>
                      <Input
                        type="number"
                        placeholder="0"
                        value={form.nbParcelles}
                        onChange={(e) => set("nbParcelles", e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Type de sol principal</Label>
                    <Select value={form.typeSol} onChange={(e) => set("typeSol", e.target.value)}>
                      <option value="">Sélectionner…</option>
                      {["Limon argileux", "Argilo-sableux", "Sableux", "Argileux", "Latérite"].map((v) => (
                        <option key={v}>{v}</option>
                      ))}
                    </Select>
                  </div>

                  <div>
                    <Label>Disponibilité en eau</Label>
                    <div className="grid grid-cols-2 gap-3 mt-1">
                      {[
                        "Pluies uniquement",
                        "Rivière/Marigot",
                        "Puits/Forage",
                        "Irrigation",
                      ].map((opt) => (
                        <label
                          key={opt}
                          className="flex items-center gap-2 cursor-pointer border rounded-xl px-4 py-3 transition hover:bg-gray-50"
                          style={{
                            borderColor: form.eau === opt ? "#2E7D32" : "#E5E7EB",
                            background: form.eau === opt ? "#F1F8E9" : "white",
                          }}
                        >
                          <input
                            type="radio"
                            name="eau"
                            value={opt}
                            checked={form.eau === opt}
                            onChange={() => set("eau", opt)}
                            className="accent-[#2E7D32]"
                          />
                          <span className="text-sm text-gray-700">{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label>Certifications existantes</Label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {CERTIFICATIONS_DISPO.map((cert) => {
                        const checked = form.certifications.includes(cert);
                        return (
                          <button
                            key={cert}
                            type="button"
                            onClick={() => toggleCheck("certifications", cert)}
                            className="text-xs px-3 py-1.5 rounded-full border font-medium transition"
                            style={{
                              borderColor: checked ? "#2E7D32" : "#E5E7EB",
                              background: checked ? "#2E7D32" : "white",
                              color: checked ? "white" : "#6B7280",
                            }}
                          >
                            {cert}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ─── Étape 3 ─── */}
            {step === 3 && (
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-1">Vos cultures</h1>
                <p className="text-gray-500 text-sm mb-8">Quelles cultures pratiquez-vous ?</p>

                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-6">
                  {CULTURES_DISPO.map(({ id, label, emoji }) => {
                    const selected = form.cultures.some((c) => c.id === id);
                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => toggleCulture(id)}
                        className="flex flex-col items-center gap-2 p-4 rounded-2xl border text-center transition"
                        style={{
                          borderColor: selected ? "#2E7D32" : "#E5E7EB",
                          background: selected ? "#F1F8E9" : "white",
                          boxShadow: selected ? "0 0 0 2px #2E7D32" : "none",
                        }}
                      >
                        <span className="text-2xl">{emoji}</span>
                        <span
                          className="text-xs font-medium leading-tight"
                          style={{ color: selected ? "#1B5E20" : "#374151" }}
                        >
                          {label}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {form.cultures.length > 0 && (
                  <div className="bg-white rounded-2xl border border-gray-100 p-5">
                    <p className="text-sm font-semibold text-gray-700 mb-4">
                      Superficie par culture
                    </p>
                    <div className="space-y-3">
                      {form.cultures.map((c) => (
                        <div key={c.id} className="flex items-center gap-3">
                          <span className="text-lg">{c.emoji}</span>
                          <span className="text-sm text-gray-700 flex-1">{c.label}</span>
                          <div className="relative w-32">
                            <input
                              type="number"
                              placeholder="0"
                              value={c.superficie}
                              onChange={(e) => setCultureSup(c.id, e.target.value)}
                              className="border border-gray-200 rounded-xl px-3 py-2 text-sm w-full pr-9 focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                              ha
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ─── Étape 4 ─── */}
            {step === 4 && (
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-1">Votre équipe</h1>
                <p className="text-gray-500 text-sm mb-8">Configuration des membres et invitations</p>

                <div className="space-y-5">
                  <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Employés permanents</Label>
                        <Input
                          type="number"
                          placeholder="0"
                          value={form.employesPermanents}
                          onChange={(e) => set("employesPermanents", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>Saisonniers (estimé)</Label>
                        <Input
                          type="number"
                          placeholder="0"
                          value={form.saisonniers}
                          onChange={(e) => set("saisonniers", e.target.value)}
                        />
                      </div>
                    </div>

                    <div>
                      <Label>Rôles à créer maintenant</Label>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {ROLES_DISPO.map((role) => {
                          const checked = form.roles.includes(role);
                          return (
                            <button
                              key={role}
                              type="button"
                              onClick={() => toggleCheck("roles", role)}
                              className="text-xs px-3 py-1.5 rounded-full border font-medium transition"
                              style={{
                                borderColor: checked ? "#2E7D32" : "#E5E7EB",
                                background: checked ? "#2E7D32" : "white",
                                color: checked ? "white" : "#6B7280",
                              }}
                            >
                              {role}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl border border-gray-100 p-6">
                    <p className="text-sm font-semibold text-gray-700 mb-1">
                      Invitations par email
                    </p>
                    <p className="text-xs text-gray-400 mb-4">
                      Jusqu&apos;à 3 collaborateurs — ils recevront un lien d&apos;activation
                    </p>
                    <div className="space-y-3">
                      {form.invitations.map((inv, idx) => (
                        <div key={idx} className="flex gap-3">
                          <input
                            type="email"
                            placeholder={`collaborateur${idx + 1}@exemple.com`}
                            value={inv.email}
                            onChange={(e) => setInvite(idx, "email", e.target.value)}
                            className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm flex-1 focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
                          />
                          <select
                            value={inv.role}
                            onChange={(e) => setInvite(idx, "role", e.target.value)}
                            className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm w-44 focus:outline-none focus:ring-2 focus:ring-[#2E7D32] bg-white"
                          >
                            <option value="">Rôle…</option>
                            {ROLES_DISPO.map((r) => (
                              <option key={r}>{r}</option>
                            ))}
                          </select>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ─── Étape 5 ─── */}
            {step === 5 && (
              <div className="text-center py-8">
                {/* Animation SVG */}
                <div className="flex justify-center mb-8">
                  <div className="relative">
                    <svg width="120" height="120" viewBox="0 0 120 120">
                      <circle
                        cx="60"
                        cy="60"
                        r="55"
                        fill="none"
                        stroke="#E8F5E9"
                        strokeWidth="8"
                      />
                      <circle
                        cx="60"
                        cy="60"
                        r="42"
                        fill="none"
                        stroke="#C8E6C9"
                        strokeWidth="4"
                      />
                      <circle cx="60" cy="60" r="48" fill="#2E7D32" opacity="0.12" />
                      <circle cx="60" cy="60" r="36" fill="#2E7D32" />
                      <text
                        x="60"
                        y="68"
                        textAnchor="middle"
                        fontSize="28"
                        fontWeight="900"
                        fill="white"
                        fontFamily="sans-serif"
                      >
                        A
                      </text>
                    </svg>
                  </div>
                </div>

                <h1 className="text-3xl font-black text-gray-900 mb-2">
                  Votre espace AGRIFRIK est prêt !
                </h1>
                <p className="text-gray-500 text-base mb-10">
                  Votre configuration a été enregistrée avec succès.
                </p>

                {/* Résumé */}
                <div className="bg-white rounded-2xl border border-gray-100 p-6 text-left max-w-md mx-auto mb-10 space-y-3">
                  {[
                    { label: "Entreprise créée", value: form.nomEntreprise || "—" },
                    { label: "Exploitation configurée", value: form.nomExploitation || "—" },
                    {
                      label: "Cultures enregistrées",
                      value: `${form.cultures.length} culture${form.cultures.length > 1 ? "s" : ""}`,
                    },
                    {
                      label: "Invitations envoyées",
                      value: `${nbInvitesEnvoyees} invitation${nbInvitesEnvoyees > 1 ? "s" : ""}`,
                    },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-5 h-5 rounded-full flex items-center justify-center"
                          style={{ background: "#E8F5E9" }}
                        >
                          <Check className="w-3 h-3" style={{ color: "#2E7D32" }} />
                        </div>
                        <span className="text-sm text-gray-600">{label}</span>
                      </div>
                      <span className="text-sm font-semibold text-gray-900">{value}</span>
                    </div>
                  ))}
                </div>

                {/* Boutons */}
                <div className="flex flex-col gap-3 max-w-sm mx-auto">
                  <button
                    onClick={() => router.push("/dashboard")}
                    className="w-full py-3.5 rounded-xl text-white font-semibold text-sm transition"
                    style={{ background: "#2E7D32" }}
                  >
                    <LayoutDashboard className="inline w-4 h-4 mr-2" />
                    Accéder au tableau de bord
                  </button>
                  <button
                    className="w-full py-3 rounded-xl text-sm font-semibold border-2 transition hover:bg-[#F1F8E9]"
                    style={{ borderColor: "#2E7D32", color: "#2E7D32" }}
                  >
                    <Upload className="inline w-4 h-4 mr-2" />
                    Importer mes données (Excel/CSV)
                  </button>
                  <button
                    className="w-full py-3 rounded-xl text-sm font-medium border border-gray-200 text-gray-600 hover:bg-gray-50 transition"
                  >
                    <CalendarDays className="inline w-4 h-4 mr-2" />
                    Planifier une démo avec un expert
                  </button>
                </div>
              </div>
            )}

            {/* ─── Erreur ─── */}
            {errors && (
              <div className="mt-4 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
                {errors}
              </div>
            )}

            {/* ─── Navigation ─── */}
            {step < 5 && (
              <div className="flex items-center justify-between mt-8">
                <button
                  type="button"
                  onClick={prev}
                  disabled={step === 1}
                  className="flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Précédent
                </button>

                <button
                  type="button"
                  onClick={next}
                  className="flex items-center gap-1.5 text-sm font-semibold text-white px-6 py-3 rounded-xl transition"
                  style={{ background: "#2E7D32" }}
                >
                  {step === 4 ? "Terminer" : "Suivant"}
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
