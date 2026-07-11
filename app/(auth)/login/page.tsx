"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Sprout,
  BarChart3,
  Brain,
  Globe,
  ShieldCheck,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    const result = await login(email, password);
    if (result.success) {
      router.push("/dashboard");
    } else {
      setError(result.message || "Identifiants incorrects");
      setIsLoading(false);
    }
  };

  const fillDemo = () => {
    setEmail("admin@agrifrik.com");
    setPassword("agrifrik2025");
  };

  return (
    <div className="min-h-screen flex">
      {/* ── Colonne gauche – Branding ── */}
      <div
        className="hidden lg:flex lg:flex-1 flex-col justify-between relative overflow-hidden"
        style={{
          background: "linear-gradient(160deg, #0D2B0D 0%, #1B5E20 100%)",
        }}
      >
        {/* Cercles déco */}
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

          {/* Citation principale */}
          <div className="mt-16 mb-auto">
            <p className="text-white text-3xl font-bold leading-snug max-w-lg">
              De la parcelle à l&apos;export, gérez toute votre filière agricole depuis une seule
              plateforme.
            </p>
          </div>

          {/* 4 points forts */}
          <div className="space-y-5 mb-10">
            {[
              {
                Icon: Sprout,
                title: "Traçabilité cacao 100%",
                sub: "De la plantation au container",
              },
              {
                Icon: ShieldCheck,
                title: "Certifications RA & GlobalG.A.P.",
                sub: "Gestion documentaire complète",
              },
              {
                Icon: Brain,
                title: "IA agronomique",
                sub: "Recommandations en temps réel",
              },
              {
                Icon: Globe,
                title: "Export simplifié",
                sub: "Documents douaniers automatiques",
              },
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
                  <p className="text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>
                    {sub}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="flex gap-6 mb-8">
            {[
              { val: "50+", label: "modules" },
              { val: "287", label: "employés" },
              { val: "94%", label: "conformité RA" },
            ].map(({ val, label }) => (
              <div key={label} className="text-center">
                <p className="text-white text-2xl font-black">{val}</p>
                <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
                  {label}
                </p>
              </div>
            ))}
          </div>

          {/* Band partenaires */}
          <div
            className="rounded-2xl px-5 py-4"
            style={{ background: "rgba(0,0,0,0.35)" }}
          >
            <p className="text-xs font-semibold mb-1" style={{ color: "rgba(255,255,255,0.45)" }}>
              Utilisé par
            </p>
            <p className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.75)" }}>
              FAO · ANADER · Barry Callebaut · Cargill · Olam
            </p>
          </div>
        </div>
      </div>

      {/* ── Colonne droite – Formulaire ── */}
      <div
        className="flex flex-col justify-between bg-white"
        style={{ width: "100%", maxWidth: "420px" }}
      >
        <div className="flex-1 flex flex-col justify-center px-10 py-12">
          {/* Logo petit */}
          <div className="flex items-center gap-2 mb-10">
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

          <h2 className="text-2xl font-bold text-gray-900 mb-1">Connexion à votre espace</h2>
          <p className="text-sm text-gray-500 mb-8">Plateforme ERP Agricole pour l&apos;Afrique</p>

          {/* Formulaire */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Email */}
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-gray-700" htmlFor="email">
                Adresse email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="admin@agrifrik.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border border-gray-200 rounded-xl px-4 py-3 text-sm w-full pl-10 focus:outline-none focus:ring-2 focus:ring-[#2E7D32] transition"
                />
              </div>
            </div>

            {/* Mot de passe */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-700" htmlFor="password">
                  Mot de passe
                </label>
                <Link
                  href="/mot-de-passe-oublie"
                  className="text-xs font-medium hover:underline"
                  style={{ color: "#2E7D32" }}
                >
                  Mot de passe oublié ?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="border border-gray-200 rounded-xl px-4 py-3 text-sm w-full pl-10 pr-11 focus:outline-none focus:ring-2 focus:ring-[#2E7D32] transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Se souvenir */}
            <div className="flex items-center gap-2">
              <input
                id="remember"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 accent-[#2E7D32] cursor-pointer"
              />
              <label htmlFor="remember" className="text-sm text-gray-600 cursor-pointer">
                Se souvenir de moi
              </label>
            </div>

            {/* Erreur */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
                {error}
              </div>
            )}

            {/* Bouton connexion */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl text-white font-semibold text-sm transition disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ background: isLoading ? "#4CAF50" : "#2E7D32" }}
            >
              {isLoading ? "Connexion en cours…" : "Se connecter"}
            </button>

            {/* Séparateur */}
            <div className="flex items-center gap-3">
              <div className="flex-1 border-t border-gray-200" />
              <span className="text-xs text-gray-400 font-medium">ou</span>
              <div className="flex-1 border-t border-gray-200" />
            </div>

            {/* Bouton démo */}
            <button
              type="button"
              onClick={fillDemo}
              className="w-full py-3 rounded-xl text-sm font-semibold border-2 transition hover:bg-[#F1F8E9]"
              style={{ borderColor: "#2E7D32", color: "#2E7D32" }}
            >
              Accès démo — Credentials pré-remplis
            </button>
          </form>

          {/* Info sécurité */}
          <div
            className="mt-6 rounded-xl px-4 py-3 text-xs text-gray-600 leading-relaxed"
            style={{ background: "#F1F8E9", border: "1px solid #C8E6C9" }}
          >
            <span className="font-semibold text-gray-700">🔐 Vos données sont hébergées en Afrique</span>{" "}
            (Supabase EU Frankfurt). Connexion SSL/TLS 256-bit.
          </div>
        </div>

        {/* Footer */}
        <div className="px-10 pb-6 text-center text-xs text-gray-400">
          © 2025 AGRIFRIK SAS ·{" "}
          <a href="#" className="hover:underline">
            Mentions légales
          </a>{" "}
          ·{" "}
          <a href="mailto:support@agrifrik.com" className="hover:underline">
            Contact
          </a>
        </div>
      </div>
    </div>
  );
}
