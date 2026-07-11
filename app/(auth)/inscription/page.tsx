"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Phone,
  User,
  Building2,
  MapPin,
  Sprout,
  Bot,
  GraduationCap,
} from "lucide-react";

type Step = 1 | 2 | "done";

const FILIERES = ["Cacao", "Anacarde", "Mixte", "Élevage", "Maraîchage", "Autre"];
const SURFACES = ["< 5 ha", "5-20 ha", "20-100 ha", "> 100 ha"];
const PAYS = ["Côte d'Ivoire", "Sénégal", "Burkina Faso", "Mali", "Ghana", "Autre"];

function PasswordStrength({ password }: { password: string }) {
  const score =
    (password.length >= 8 ? 1 : 0) +
    (/[A-Z]/.test(password) ? 1 : 0) +
    (/[0-9]/.test(password) ? 1 : 0) +
    (/[^A-Za-z0-9]/.test(password) ? 1 : 0);

  const colors = ["#EF5350", "#FF7043", "#FFA726", "#66BB6A"];
  const labels = ["Faible", "Moyen", "Bon", "Fort"];

  if (!password) return null;

  return (
    <div className="mt-2 space-y-1">
      <div className="flex gap-1">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-1.5 flex-1 rounded-full transition-all"
            style={{
              background: i < score ? colors[score - 1] : "#E5E7EB",
            }}
          />
        ))}
      </div>
      {score > 0 && (
        <p className="text-xs" style={{ color: colors[score - 1] }}>
          Mot de passe {labels[score - 1]}
        </p>
      )}
    </div>
  );
}

export default function InscriptionPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Étape 1
  const [exploitation, setExploitation] = useState("");
  const [filiere, setFiliere] = useState("");
  const [surface, setSurface] = useState("");
  const [pays, setPays] = useState("Côte d'Ivoire");
  const [ville, setVille] = useState("");

  // Étape 2
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [emailPro, setEmailPro] = useState("");
  const [telephone, setTelephone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!exploitation.trim()) errs.exploitation = "Ce champ est requis";
    if (!filiere) errs.filiere = "Sélectionnez une filière";
    if (!surface) errs.surface = "Sélectionnez une surface";
    if (!ville.trim()) errs.ville = "Ce champ est requis";
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setStep(2);
  };

  const handleStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!prenom.trim()) errs.prenom = "Requis";
    if (!nom.trim()) errs.nom = "Requis";
    if (!emailPro.trim()) errs.emailPro = "Requis";
    if (password.length < 8) errs.password = "Au moins 8 caractères";
    if (password !== confirmPassword) errs.confirmPassword = "Les mots de passe ne correspondent pas";
    if (!acceptTerms) errs.terms = "Vous devez accepter les conditions";
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep("done");
    }, 1200);
  };

  return (
    <div className="min-h-screen flex">
      {/* ── Colonne gauche ── */}
      <div
        className="hidden lg:flex lg:flex-1 flex-col justify-between relative overflow-hidden"
        style={{ background: "linear-gradient(160deg, #0D2B0D 0%, #2E7D32 100%)" }}
      >
        <div
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #4CAF50, transparent)" }}
        />
        <div
          className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #66BB6A, transparent)" }}
        />

        <div className="relative z-10 flex flex-col h-full p-12">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center font-black text-2xl"
              style={{ background: "rgba(76,175,80,0.25)", color: "#A5D6A7" }}
            >
              A
            </div>
            <span className="text-white text-2xl font-extrabold tracking-widest">AGRIFRIK</span>
          </div>

          <div className="mt-16 mb-auto">
            <p className="text-white text-3xl font-bold leading-snug max-w-lg">
              Créez votre compte
            </p>
            <p className="mt-4 text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
              Rejoignez les exploitations africaines qui modernisent leur gestion agricole
            </p>

            {/* Illustration SVG agricole */}
            <div className="mt-10 flex justify-center">
              <svg width="300" height="280" viewBox="0 0 300 280" xmlns="http://www.w3.org/2000/svg">
                {/* Sol */}
                <ellipse cx="150" cy="240" rx="120" ry="22" fill="rgba(76,175,80,0.18)" />

                {/* Champs arrière-plan */}
                <rect x="30" y="185" width="240" height="55" rx="8" fill="rgba(56,142,60,0.18)" />
                <line x1="30" y1="200" x2="270" y2="200" stroke="rgba(76,175,80,0.2)" strokeWidth="1" />
                <line x1="30" y1="215" x2="270" y2="215" stroke="rgba(76,175,80,0.2)" strokeWidth="1" />
                <line x1="30" y1="230" x2="270" y2="230" stroke="rgba(76,175,80,0.2)" strokeWidth="1" />
                {/* Rangées de plantes */}
                {[60, 90, 120, 150, 180, 210, 240].map((x) => (
                  <g key={x}>
                    <line x1={x} y1="195" x2={x} y2="240" stroke="rgba(76,175,80,0.3)" strokeWidth="1.5" />
                    <ellipse cx={x} cy="193" rx="7" ry="4" fill="rgba(76,175,80,0.4)" />
                  </g>
                ))}

                {/* Agriculteur silhouette */}
                {/* Corps */}
                <circle cx="150" cy="105" r="18" fill="rgba(255,255,255,0.18)" />
                {/* Tête */}
                <circle cx="150" cy="80" r="14" fill="rgba(255,255,255,0.2)" />
                {/* Chapeau */}
                <ellipse cx="150" cy="67" rx="18" ry="5" fill="rgba(165,214,167,0.5)" />
                <rect x="143" y="55" width="14" height="13" rx="2" fill="rgba(165,214,167,0.4)" />
                {/* Bras gauche tenant smartphone */}
                <line x1="132" y1="110" x2="112" y2="128" stroke="rgba(255,255,255,0.2)" strokeWidth="5" strokeLinecap="round" />
                {/* Smartphone */}
                <rect x="100" y="124" width="22" height="36" rx="4" fill="rgba(255,255,255,0.22)" stroke="rgba(165,214,167,0.5)" strokeWidth="1.5" />
                <rect x="104" y="128" width="14" height="22" rx="2" fill="rgba(76,175,80,0.3)" />
                <circle cx="111" cy="155" r="2.5" fill="rgba(165,214,167,0.5)" />
                {/* Bras droit tenant tablette */}
                <line x1="168" y1="110" x2="188" y2="125" stroke="rgba(255,255,255,0.2)" strokeWidth="5" strokeLinecap="round" />
                {/* Tablette */}
                <rect x="183" y="118" width="34" height="46" rx="5" fill="rgba(255,255,255,0.18)" stroke="rgba(165,214,167,0.5)" strokeWidth="1.5" />
                <rect x="186" y="122" width="28" height="34" rx="2" fill="rgba(46,125,50,0.3)" />
                {/* Écran tablette - graphique simplifié */}
                <polyline points="189,148 196,138 203,144 210,133 217,140" fill="none" stroke="rgba(165,214,167,0.7)" strokeWidth="1.5" strokeLinecap="round" />

                {/* Sparkles / étoiles */}
                {[
                  { x: 80, y: 85 },
                  { x: 228, y: 90 },
                  { x: 75, y: 155 },
                  { x: 235, y: 150 },
                  { x: 150, y: 48 },
                ].map(({ x, y }, i) => (
                  <g key={i}>
                    <line x1={x - 5} y1={y} x2={x + 5} y2={y} stroke="rgba(165,214,167,0.6)" strokeWidth="1.5" strokeLinecap="round" />
                    <line x1={x} y1={y - 5} x2={x} y2={y + 5} stroke="rgba(165,214,167,0.6)" strokeWidth="1.5" strokeLinecap="round" />
                    <line x1={x - 3} y1={y - 3} x2={x + 3} y2={y + 3} stroke="rgba(165,214,167,0.4)" strokeWidth="1" strokeLinecap="round" />
                    <line x1={x + 3} y1={y - 3} x2={x - 3} y2={y + 3} stroke="rgba(165,214,167,0.4)" strokeWidth="1" strokeLinecap="round" />
                  </g>
                ))}
              </svg>
            </div>
          </div>

          {/* Avantages */}
          <div className="space-y-5 mb-10">
            {[
              { Icon: Sprout, title: "Accès immédiat à 48 modules ERP", sub: "De la parcelle à l'export" },
              { Icon: Bot, title: "Assistant IA ARIA inclus", sub: "Recommandations en temps réel" },
              { Icon: GraduationCap, title: "Formation ANADER offerte (3 sessions)", sub: "Prise en main accompagnée" },
            ].map(({ Icon, title, sub }) => (
              <div key={title} className="flex items-center gap-4">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: "rgba(76,175,80,0.2)" }}
                >
                  <Icon className="w-4 h-4" style={{ color: "#81C784" }} />
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">{title}</p>
                  <p className="text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Colonne droite ── */}
      <div
        className="flex flex-col justify-between bg-white overflow-y-auto"
        style={{ width: "100%", maxWidth: "480px" }}
      >
        <div className="flex-1 flex flex-col justify-center px-10 py-12">
          {/* Logo petit */}
          <div className="flex items-center gap-2 mb-8">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center font-black text-base"
              style={{ background: "#E8F5E9", color: "#2E7D32" }}
            >
              A
            </div>
            <span className="font-extrabold tracking-widest text-sm" style={{ color: "#1B5E20" }}>
              AGRIFRIK
            </span>
          </div>

          {/* État : succès */}
          {step === "done" ? (
            <div className="text-center space-y-5">
              <div className="flex justify-center">
                <svg width="80" height="80" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="40" cy="40" r="38" fill="#E8F5E9" stroke="#4CAF50" strokeWidth="3" />
                  <path d="M22 40 L34 52 L58 28" stroke="#2E7D32" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Bienvenue sur AGRIFRIK !</h2>
              <p className="text-sm text-gray-500 leading-relaxed">
                Votre compte a été créé avec succès. Vérifiez votre email pour activer votre accès.
              </p>
              <button
                onClick={() => router.push("/dashboard")}
                className="w-full py-3 rounded-xl text-white font-semibold text-sm transition"
                style={{ background: "#2E7D32" }}
              >
                Aller au tableau de bord →
              </button>
            </div>
          ) : (
            <>
              {/* Stepper */}
              <div className="flex items-center gap-3 mb-8">
                {[
                  { n: 1, label: "Exploitation" },
                  { n: 2, label: "Compte" },
                ].map(({ n, label }, idx) => (
                  <div key={n} className="flex items-center gap-3">
                    {idx > 0 && (
                      <div
                        className="flex-1 h-px w-8"
                        style={{ background: step >= n ? "#2E7D32" : "#E5E7EB" }}
                      />
                    )}
                    <div className="flex items-center gap-2">
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                        style={
                          (step === 1 && n === 1) || (step === 2 && n === 2)
                            ? { background: "#2E7D32", color: "#fff" }
                            : step > n
                            ? { background: "#E8F5E9", color: "#2E7D32" }
                            : { background: "#F3F4F6", color: "#9CA3AF" }
                        }
                      >
                        {step > n ? "✓" : n}
                      </div>
                      <span
                        className="text-xs font-medium"
                        style={{ color: (step === 1 && n === 1) || (step === 2 && n === 2) ? "#1B5E20" : "#9CA3AF" }}
                      >
                        {label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Étape 1 */}
              {step === 1 && (
                <>
                  <h2 className="text-xl font-bold text-gray-900 mb-1">Votre exploitation</h2>
                  <p className="text-sm text-gray-500 mb-6">Parlez-nous de votre activité agricole</p>

                  <form className="space-y-4" onSubmit={handleStep1}>
                    {/* Nom exploitation */}
                    <div className="space-y-1.5">
                      <label className="block text-sm font-medium text-gray-700">
                        Nom de l&apos;exploitation / coopérative <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Ex : Coopérative EKISSI"
                          value={exploitation}
                          onChange={(e) => setExploitation(e.target.value)}
                          className="border border-gray-200 rounded-xl px-4 py-3 text-sm w-full pl-10 focus:outline-none focus:ring-2 focus:ring-[#2E7D32] transition"
                        />
                      </div>
                      {errors.exploitation && <p className="text-xs text-red-500">{errors.exploitation}</p>}
                    </div>

                    {/* Filière */}
                    <div className="space-y-1.5">
                      <label className="block text-sm font-medium text-gray-700">
                        Filière principale <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={filiere}
                        onChange={(e) => setFiliere(e.target.value)}
                        className="border border-gray-200 rounded-xl px-4 py-3 text-sm w-full focus:outline-none focus:ring-2 focus:ring-[#2E7D32] transition bg-white"
                      >
                        <option value="">Sélectionner…</option>
                        {FILIERES.map((f) => <option key={f} value={f}>{f}</option>)}
                      </select>
                      {errors.filiere && <p className="text-xs text-red-500">{errors.filiere}</p>}
                    </div>

                    {/* Surface */}
                    <div className="space-y-1.5">
                      <label className="block text-sm font-medium text-gray-700">
                        Surface gérée <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={surface}
                        onChange={(e) => setSurface(e.target.value)}
                        className="border border-gray-200 rounded-xl px-4 py-3 text-sm w-full focus:outline-none focus:ring-2 focus:ring-[#2E7D32] transition bg-white"
                      >
                        <option value="">Sélectionner…</option>
                        {SURFACES.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                      {errors.surface && <p className="text-xs text-red-500">{errors.surface}</p>}
                    </div>

                    {/* Pays */}
                    <div className="space-y-1.5">
                      <label className="block text-sm font-medium text-gray-700">Pays</label>
                      <select
                        value={pays}
                        onChange={(e) => setPays(e.target.value)}
                        className="border border-gray-200 rounded-xl px-4 py-3 text-sm w-full focus:outline-none focus:ring-2 focus:ring-[#2E7D32] transition bg-white"
                      >
                        {PAYS.map((p) => <option key={p} value={p}>{p}</option>)}
                      </select>
                    </div>

                    {/* Ville */}
                    <div className="space-y-1.5">
                      <label className="block text-sm font-medium text-gray-700">
                        Ville / Commune <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Ex : Soubré"
                          value={ville}
                          onChange={(e) => setVille(e.target.value)}
                          className="border border-gray-200 rounded-xl px-4 py-3 text-sm w-full pl-10 focus:outline-none focus:ring-2 focus:ring-[#2E7D32] transition"
                        />
                      </div>
                      {errors.ville && <p className="text-xs text-red-500">{errors.ville}</p>}
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl text-white font-semibold text-sm transition"
                      style={{ background: "#2E7D32" }}
                    >
                      Continuer →
                    </button>
                  </form>
                </>
              )}

              {/* Étape 2 */}
              {step === 2 && (
                <>
                  <h2 className="text-xl font-bold text-gray-900 mb-1">Votre compte</h2>
                  <p className="text-sm text-gray-500 mb-6">Créez vos identifiants de connexion</p>

                  <form className="space-y-4" onSubmit={handleStep2}>
                    {/* Prénom + Nom */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <label className="block text-sm font-medium text-gray-700">Prénom</label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type="text"
                            placeholder="Konan"
                            value={prenom}
                            onChange={(e) => setPrenom(e.target.value)}
                            className="border border-gray-200 rounded-xl px-4 py-3 text-sm w-full pl-10 focus:outline-none focus:ring-2 focus:ring-[#2E7D32] transition"
                          />
                        </div>
                        {errors.prenom && <p className="text-xs text-red-500">{errors.prenom}</p>}
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-sm font-medium text-gray-700">Nom</label>
                        <input
                          type="text"
                          placeholder="Yao"
                          value={nom}
                          onChange={(e) => setNom(e.target.value)}
                          className="border border-gray-200 rounded-xl px-4 py-3 text-sm w-full focus:outline-none focus:ring-2 focus:ring-[#2E7D32] transition"
                        />
                        {errors.nom && <p className="text-xs text-red-500">{errors.nom}</p>}
                      </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="block text-sm font-medium text-gray-700">Email professionnel</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="email"
                          placeholder="vous@exploitation.com"
                          value={emailPro}
                          onChange={(e) => setEmailPro(e.target.value)}
                          className="border border-gray-200 rounded-xl px-4 py-3 text-sm w-full pl-10 focus:outline-none focus:ring-2 focus:ring-[#2E7D32] transition"
                        />
                      </div>
                      {errors.emailPro && <p className="text-xs text-red-500">{errors.emailPro}</p>}
                    </div>

                    {/* Téléphone */}
                    <div className="space-y-1.5">
                      <label className="block text-sm font-medium text-gray-700">
                        Téléphone{" "}
                        <span className="text-xs text-gray-400 font-normal">(WhatsApp recommandé)</span>
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="tel"
                          placeholder="+225 07 00 00 00 00"
                          value={telephone}
                          onChange={(e) => setTelephone(e.target.value)}
                          className="border border-gray-200 rounded-xl px-4 py-3 text-sm w-full pl-10 focus:outline-none focus:ring-2 focus:ring-[#2E7D32] transition"
                        />
                      </div>
                    </div>

                    {/* Mot de passe */}
                    <div className="space-y-1.5">
                      <label className="block text-sm font-medium text-gray-700">Mot de passe</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="border border-gray-200 rounded-xl px-4 py-3 text-sm w-full pl-10 pr-11 focus:outline-none focus:ring-2 focus:ring-[#2E7D32] transition"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                      <PasswordStrength password={password} />
                      {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
                    </div>

                    {/* Confirmation */}
                    <div className="space-y-1.5">
                      <label className="block text-sm font-medium text-gray-700">Confirmation mot de passe</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type={showConfirm ? "text" : "password"}
                          placeholder="••••••••"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="border border-gray-200 rounded-xl px-4 py-3 text-sm w-full pl-10 pr-11 focus:outline-none focus:ring-2 focus:ring-[#2E7D32] transition"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirm(!showConfirm)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                      {errors.confirmPassword && (
                        <p className="text-xs text-red-500">{errors.confirmPassword}</p>
                      )}
                    </div>

                    {/* CGU */}
                    <div className="flex items-start gap-2">
                      <input
                        id="terms"
                        type="checkbox"
                        checked={acceptTerms}
                        onChange={(e) => setAcceptTerms(e.target.checked)}
                        className="w-4 h-4 mt-0.5 rounded border-gray-300 accent-[#2E7D32] cursor-pointer shrink-0"
                      />
                      <label htmlFor="terms" className="text-xs text-gray-600 cursor-pointer leading-relaxed">
                        J&apos;accepte les{" "}
                        <a href="#" className="font-medium hover:underline" style={{ color: "#2E7D32" }}>
                          conditions d&apos;utilisation
                        </a>{" "}
                        et la{" "}
                        <a href="#" className="font-medium hover:underline" style={{ color: "#2E7D32" }}>
                          politique de confidentialité
                        </a>
                      </label>
                    </div>
                    {errors.terms && <p className="text-xs text-red-500 -mt-2">{errors.terms}</p>}

                    <div className="flex gap-3 pt-1">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="py-3 px-5 rounded-xl text-sm font-semibold border border-gray-200 text-gray-600 hover:bg-gray-50 transition"
                      >
                        ← Retour
                      </button>
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="flex-1 py-3 rounded-xl text-white font-semibold text-sm transition disabled:opacity-60 disabled:cursor-not-allowed"
                        style={{ background: isLoading ? "#4CAF50" : "#2E7D32" }}
                      >
                        {isLoading ? "Création en cours…" : "Créer mon compte AGRIFRIK"}
                      </button>
                    </div>
                  </form>
                </>
              )}

              {/* Lien connexion */}
              <p className="mt-6 text-center text-sm text-gray-500">
                Déjà un compte ?{" "}
                <Link href="/login" className="font-medium hover:underline" style={{ color: "#2E7D32" }}>
                  Connectez-vous →
                </Link>
              </p>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="px-10 pb-6 text-center text-xs text-gray-400">
          © 2025 AGRIFRIK SAS ·{" "}
          <a href="#" className="hover:underline">Mentions légales</a>{" "}
          ·{" "}
          <a href="mailto:support@agrifrik.com" className="hover:underline">Contact</a>
        </div>
      </div>
    </div>
  );
}
