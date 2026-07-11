"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Leaf,
  CheckCircle,
  ChevronRight,
  ChevronLeft,
  Plus,
  X,
  Upload,
  Play,
  SkipForward,
  Users,
} from "lucide-react";

// ─── Données statiques ──────────────────────────────────────────────────────

const STEPS = [
  { num: 1, label: "Entreprise" },
  { num: 2, label: "Cultures" },
  { num: 3, label: "Équipe" },
  { num: 4, label: "Finalisation" },
];

const CULTURES = [
  { id: "cacao", emoji: "🍫", label: "Cacao" },
  { id: "anacarde", emoji: "🥜", label: "Anacarde" },
  { id: "mais", emoji: "🌽", label: "Maïs" },
  { id: "riz", emoji: "🍚", label: "Riz" },
  { id: "cafe", emoji: "☕", label: "Café" },
  { id: "hevea", emoji: "🌿", label: "Hévéa" },
  { id: "palmier", emoji: "🌴", label: "Palmier à huile" },
  { id: "bananier", emoji: "🍌", label: "Bananier" },
  { id: "elevage", emoji: "🐄", label: "Élevage" },
  { id: "pisciculture", emoji: "🐟", label: "Pisciculture" },
  { id: "karite", emoji: "🌰", label: "Karité" },
  { id: "autre", emoji: "🌱", label: "Autre" },
];

const TYPES_EXPLOITATION = [
  "Plantation individuelle",
  "Coopérative",
  "Entreprise agro-industrielle",
  "Groupement",
];

const PAYS = [
  "Côte d'Ivoire",
  "Sénégal",
  "Mali",
  "Burkina Faso",
  "Ghana",
  "Cameroun",
  "Autre",
];

const DEVISES = [
  { value: "XOF", label: "XOF (FCFA)" },
  { value: "EUR", label: "EUR (€)" },
  { value: "USD", label: "USD ($)" },
  { value: "GHS", label: "GHS (₵)" },
  { value: "XAF", label: "XAF (FCFA)" },
];

const FORMATS_DATE = [
  { value: "DD/MM/YYYY", label: "JJ/MM/AAAA" },
  { value: "MM/DD/YYYY", label: "MM/DD/YYYY" },
];

// ─── Confettis ───────────────────────────────────────────────────────────────

const CONFETTI_COLORS = [
  "#2E7D32", "#F59E0B", "#3B82F6", "#EF4444",
  "#8B5CF6", "#10B981", "#F97316", "#EC4899",
];

function Confetti({ active }: { active: boolean }) {
  if (!active) return null;
  const pieces = Array.from({ length: 32 }, (_, i) => i);
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-50">
      {pieces.map((i) => {
        const color = CONFETTI_COLORS[i % CONFETTI_COLORS.length];
        const left = `${(i * 317) % 100}%`;
        const delay = `${(i * 0.12).toFixed(2)}s`;
        const size = 8 + (i % 5) * 3;
        const duration = `${1.2 + (i % 6) * 0.25}s`;
        const rotate = `${(i * 47) % 360}deg`;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left,
              top: "-20px",
              width: size,
              height: size,
              backgroundColor: color,
              borderRadius: i % 3 === 0 ? "50%" : "2px",
              transform: `rotate(${rotate})`,
              animation: `confettiFall ${duration} ${delay} ease-in forwards`,
            }}
          />
        );
      })}
      <style>{`
        @keyframes confettiFall {
          0%   { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

// ─── Composant principal ─────────────────────────────────────────────────────

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [confetti, setConfetti] = useState(false);

  // Étape 1
  const [nomEntreprise, setNomEntreprise] = useState("");
  const [typeExploitation, setTypeExploitation] = useState("Plantation individuelle");
  const [pays, setPays] = useState("Côte d'Ivoire");
  const [region, setRegion] = useState("");
  const [superficie, setSuperficie] = useState("");

  // Étape 2
  const [selectedCultures, setSelectedCultures] = useState<string[]>([]);

  // Étape 3
  const [nbEmployes, setNbEmployes] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [emails, setEmails] = useState<string[]>([]);
  const [devise, setDevise] = useState("XOF");
  const [formatDate, setFormatDate] = useState("DD/MM/YYYY");

  // Déclenche confettis à l'étape 4
  useEffect(() => {
    if (step === 4) {
      setConfetti(true);
      const t = setTimeout(() => setConfetti(false), 3500);
      return () => clearTimeout(t);
    }
  }, [step]);

  function toggleCulture(id: string) {
    setSelectedCultures((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  }

  function addEmail() {
    const e = emailInput.trim();
    if (e && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e) && !emails.includes(e)) {
      setEmails((prev) => [...prev, e]);
      setEmailInput("");
    }
  }

  function removeEmail(e: string) {
    setEmails((prev) => prev.filter((x) => x !== e));
  }

  function next() {
    if (step < 4) setStep((s) => s + 1);
  }
  function prev() {
    if (step > 1) setStep((s) => s - 1);
  }

  const culturesChoisies = selectedCultures
    .map((id) => CULTURES.find((c) => c.id === id))
    .filter(Boolean) as (typeof CULTURES)[number][];

  const progressPct = ((step - 1) / (STEPS.length - 1)) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E8F5E9] via-white to-[#F1F8E9] flex flex-col items-center justify-center px-4 py-10">
      <Confetti active={confetti} />

      {/* Logo */}
      <div className="flex items-center gap-2.5 mb-8">
        <div className="bg-[#2E7D32] rounded-xl p-2 shadow-md">
          <Leaf className="w-6 h-6 text-white" />
        </div>
        <span className="text-xl font-extrabold text-[#1B5E20] tracking-tight">AGRIFRIK</span>
      </div>

      {/* Card */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 w-full max-w-xl overflow-hidden">

        {/* Progress header */}
        <div className="px-6 pt-6 pb-5 border-b border-gray-100">
          {/* Étiquettes */}
          <div className="flex justify-between mb-3">
            {STEPS.map(({ num, label }) => {
              const done = num < step;
              const active = num === step;
              return (
                <div key={num} className="flex flex-col items-center gap-1.5 flex-1">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shadow-sm transition-all ${
                      done
                        ? "bg-[#2E7D32] text-white"
                        : active
                        ? "bg-[#2E7D32] text-white ring-4 ring-[#2E7D32]/20"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {done ? <CheckCircle size={17} /> : num}
                  </div>
                  <span
                    className={`text-[10px] font-semibold ${
                      active
                        ? "text-[#2E7D32]"
                        : done
                        ? "text-gray-500"
                        : "text-gray-300"
                    }`}
                  >
                    {label}
                  </span>
                </div>
              );
            })}
          </div>
          {/* Barre de progression */}
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#2E7D32] rounded-full transition-all duration-500"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <p className="text-xs text-gray-400 mt-1.5 text-right">
            Étape {step} sur {STEPS.length}
          </p>
        </div>

        {/* Contenu des étapes */}
        <div className="px-6 pb-6 pt-5">

          {/* ── Étape 1 : Bienvenue & Informations entreprise ── */}
          {step === 1 && (
            <div className="space-y-5">
              <div className="text-center mb-2">
                <div className="text-4xl mb-3">🌾</div>
                <h2 className="text-2xl font-extrabold text-gray-900">
                  Bienvenue dans AGRIFRIK 🌾
                </h2>
                <p className="text-gray-500 text-sm mt-1">
                  Configurons votre exploitation en 4 étapes simples
                </p>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700">
                  Nom de l&apos;entreprise / exploitation <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={nomEntreprise}
                  onChange={(e) => setNomEntreprise(e.target.value)}
                  placeholder="ex. AGROTEK CI, Coopérative San Pedro…"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2E7D32] placeholder:text-gray-300"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700">Type d&apos;exploitation</label>
                <div className="grid grid-cols-2 gap-2">
                  {TYPES_EXPLOITATION.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setTypeExploitation(type)}
                      className={`px-3 py-2 rounded-xl text-xs font-medium border-2 transition-all text-left ${
                        typeExploitation === type
                          ? "bg-[#E8F5E9] text-[#2E7D32] border-[#2E7D32]"
                          : "bg-white text-gray-600 border-gray-200 hover:border-[#2E7D32]/50"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-gray-700">Pays</label>
                  <select
                    value={pays}
                    onChange={(e) => setPays(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2E7D32] bg-white"
                  >
                    {PAYS.map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-gray-700">Région / Zone</label>
                  <input
                    type="text"
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    placeholder="ex. Soubré"
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2E7D32] placeholder:text-gray-300"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700">Superficie totale</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={superficie}
                    onChange={(e) => setSuperficie(e.target.value)}
                    placeholder="0"
                    min={0}
                    className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2E7D32] placeholder:text-gray-300"
                  />
                  <span className="text-sm text-gray-500 font-semibold">ha</span>
                </div>
              </div>

              <button
                onClick={next}
                disabled={!nomEntreprise.trim()}
                className="w-full flex items-center justify-center gap-2 bg-[#2E7D32] hover:bg-[#1B5E20] disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold py-3 px-8 rounded-xl transition-colors mt-2"
              >
                Suivant <ChevronRight size={16} />
              </button>
            </div>
          )}

          {/* ── Étape 2 : Cultures ── */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-extrabold text-gray-900">
                  Quelles cultures cultivez-vous ?
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Sélectionnez vos productions principales (plusieurs choix possibles)
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                {CULTURES.map((culture) => {
                  const isSelected = selectedCultures.includes(culture.id);
                  return (
                    <button
                      key={culture.id}
                      type="button"
                      onClick={() => toggleCulture(culture.id)}
                      className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all text-center relative ${
                        isSelected
                          ? "border-[#2E7D32] bg-[#E8F5E9] shadow-sm"
                          : "border-gray-100 bg-gray-50 hover:border-gray-300"
                      }`}
                    >
                      {isSelected && (
                        <div className="absolute top-1 right-1 w-4 h-4 bg-[#2E7D32] rounded-full flex items-center justify-center">
                          <CheckCircle size={10} className="text-white" />
                        </div>
                      )}
                      <span className="text-2xl">{culture.emoji}</span>
                      <span
                        className={`text-[10px] font-semibold leading-tight ${
                          isSelected ? "text-[#2E7D32]" : "text-gray-600"
                        }`}
                      >
                        {culture.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              {selectedCultures.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {culturesChoisies.map((c) => (
                    <span
                      key={c.id}
                      className="bg-[#E8F5E9] text-[#2E7D32] text-xs font-medium px-2.5 py-1 rounded-full border border-[#2E7D32]/20"
                    >
                      {c.emoji} {c.label}
                    </span>
                  ))}
                </div>
              )}

              {selectedCultures.length === 0 && (
                <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                  Sélectionnez au moins une culture pour continuer.
                </p>
              )}

              <div className="flex justify-between pt-2 border-t border-gray-100">
                <button
                  onClick={prev}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  <ChevronLeft size={16} /> Précédent
                </button>
                <button
                  onClick={next}
                  disabled={selectedCultures.length === 0}
                  className="flex items-center gap-1.5 bg-[#2E7D32] hover:bg-[#1B5E20] disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold py-2 px-5 rounded-xl transition-colors text-sm"
                >
                  Suivant <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* ── Étape 3 : Équipe & Configuration ── */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-extrabold text-gray-900">Configurez votre équipe</h2>
                <p className="text-sm text-gray-500 mt-1">
                  Ces paramètres pourront être modifiés plus tard dans les réglages.
                </p>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-1.5">
                  <Users size={14} /> Nombre d&apos;employés
                </label>
                <input
                  type="number"
                  value={nbEmployes}
                  onChange={(e) => setNbEmployes(e.target.value)}
                  placeholder="ex. 12"
                  min={0}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2E7D32] placeholder:text-gray-300"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700">Inviter des collaborateurs</label>
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addEmail()}
                    placeholder="email@exemple.com"
                    className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2E7D32] placeholder:text-gray-300"
                  />
                  <button
                    type="button"
                    onClick={addEmail}
                    className="bg-[#2E7D32] hover:bg-[#1B5E20] text-white px-3 py-2 rounded-xl transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                {emails.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {emails.map((e) => (
                      <span
                        key={e}
                        className="flex items-center gap-1.5 bg-blue-50 text-blue-700 text-xs font-medium px-2.5 py-1.5 rounded-full border border-blue-200"
                      >
                        {e}
                        <button
                          type="button"
                          onClick={() => removeEmail(e)}
                          className="hover:text-red-600 transition-colors"
                        >
                          <X size={11} />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-gray-700">Devise</label>
                  <select
                    value={devise}
                    onChange={(e) => setDevise(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2E7D32] bg-white"
                  >
                    {DEVISES.map((d) => (
                      <option key={d.value} value={d.value}>{d.label}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-gray-700">Format de date</label>
                  <select
                    value={formatDate}
                    onChange={(e) => setFormatDate(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2E7D32] bg-white"
                  >
                    {FORMATS_DATE.map((f) => (
                      <option key={f.value} value={f.value}>{f.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-between pt-2 border-t border-gray-100">
                <button
                  onClick={prev}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  <ChevronLeft size={16} /> Précédent
                </button>
                <button
                  onClick={next}
                  className="flex items-center gap-1.5 bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-semibold py-2 px-5 rounded-xl transition-colors text-sm"
                >
                  Suivant <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* ── Étape 4 : Finalisation ── */}
          {step === 4 && (
            <div className="space-y-5">
              <div className="text-center">
                <div className="text-5xl mb-2 animate-bounce inline-block">🎉</div>
                <h2 className="text-2xl font-extrabold text-gray-900">
                  Votre AGRIFRIK est prêt !
                </h2>
                <p className="text-gray-500 text-sm mt-1">
                  Voici le récapitulatif de votre configuration
                </p>
              </div>

              {/* Récap */}
              <div className="bg-gradient-to-br from-[#E8F5E9] to-[#F1F8E9] rounded-2xl p-4 space-y-3 border border-[#2E7D32]/10">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Entreprise</span>
                  <span className="text-sm font-bold text-gray-900 text-right">{nomEntreprise || "—"}</span>
                </div>
                <div className="flex items-start justify-between gap-2">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Type</span>
                  <span className="text-sm text-gray-800 text-right">{typeExploitation}</span>
                </div>
                <div className="flex items-start justify-between gap-2">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Pays</span>
                  <span className="text-sm text-gray-800">{pays}{region ? ` · ${region}` : ""}</span>
                </div>
                {superficie && (
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Superficie</span>
                    <span className="text-sm text-gray-800">{superficie} ha</span>
                  </div>
                )}
                {nbEmployes && (
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Employés</span>
                    <span className="text-sm text-gray-800">{nbEmployes} personnes</span>
                  </div>
                )}
                {culturesChoisies.length > 0 && (
                  <div className="pt-2 border-t border-[#2E7D32]/15">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Cultures</p>
                    <div className="flex flex-wrap gap-1.5">
                      {culturesChoisies.map((c) => (
                        <span
                          key={c.id}
                          className="bg-white text-[#2E7D32] text-xs font-semibold px-2.5 py-1 rounded-full border border-[#2E7D32]/30 shadow-sm"
                        >
                          {c.emoji} {c.label}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Options de démarrage */}
              <div className="space-y-2">
                <button
                  type="button"
                  className="w-full flex items-center gap-3 p-4 rounded-xl border-2 border-gray-200 hover:border-gray-300 bg-white transition-all text-left group"
                >
                  <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
                    <Upload size={18} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">Importer des données existantes</p>
                    <p className="text-xs text-gray-500">Excel, CSV — importez vos fichiers actuels</p>
                  </div>
                </button>

                <button
                  type="button"
                  className="w-full flex items-center gap-3 p-4 rounded-xl border-2 border-[#2E7D32] bg-[#E8F5E9] hover:bg-[#D7EED8] transition-all text-left group relative"
                >
                  <div className="w-9 h-9 rounded-lg bg-[#2E7D32] flex items-center justify-center shrink-0">
                    <Play size={18} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-[#1B5E20]">Commencer avec les données de démonstration</p>
                    <p className="text-xs text-[#2E7D32]/70">Explorez toutes les fonctionnalités avec des données réelles</p>
                  </div>
                  <span className="absolute top-2 right-2 text-[9px] font-bold bg-[#2E7D32] text-white px-1.5 py-0.5 rounded-full uppercase tracking-wide">
                    Recommandé
                  </span>
                </button>

                <button
                  type="button"
                  className="w-full flex items-center gap-3 p-4 rounded-xl border-2 border-gray-200 hover:border-gray-300 bg-white transition-all text-left group"
                >
                  <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                    <SkipForward size={18} className="text-gray-500" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-700">Partir de zéro</p>
                    <p className="text-xs text-gray-500">Commencez avec un espace vide</p>
                  </div>
                </button>
              </div>

              <button
                onClick={() => router.push("/dashboard")}
                className="w-full flex items-center justify-center gap-2 bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-bold py-3.5 px-8 rounded-xl transition-colors text-base shadow-md"
              >
                Accéder à mon tableau de bord <ChevronRight size={18} />
              </button>

              <button
                onClick={prev}
                className="w-full text-center text-sm text-gray-400 hover:text-gray-600 transition-colors"
              >
                ← Modifier mes informations
              </button>
            </div>
          )}
        </div>
      </div>

      <p className="mt-8 text-center text-xs text-gray-400">© 2025 AGRIFRIK by IBIG SOFT</p>
    </div>
  );
}
