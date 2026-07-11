"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, Leaf, CheckCircle, BarChart3, Brain } from "lucide-react";
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

  return (
    <div className="min-h-screen flex">
      {/* Panneau gauche */}
      <div
        className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 text-white"
        style={{ backgroundColor: "#1B5E20" }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="bg-white/20 rounded-xl p-2">
            <Leaf className="w-7 h-7 text-white" />
          </div>
          <span className="text-2xl font-bold tracking-tight">AGRIFRIK</span>
        </div>

        {/* Centre */}
        <div className="space-y-10">
          <div>
            <h1 className="text-4xl font-bold leading-tight mb-4">
              Gérez votre exploitation agricole avec intelligence
            </h1>
            <p className="text-white/70 text-lg">
              La plateforme ERP conçue pour les agriculteurs africains modernes.
            </p>
          </div>

          {/* Points forts */}
          <div className="space-y-5">
            <div className="flex items-start gap-4">
              <div className="bg-white/15 rounded-lg p-2 mt-0.5 shrink-0">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-semibold text-white">Suivi en temps réel</p>
                <p className="text-white/65 text-sm">
                  Tableaux de bord live, alertes et indicateurs clés de performance.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-white/15 rounded-lg p-2 mt-0.5 shrink-0">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-semibold text-white">IA intégrée</p>
                <p className="text-white/65 text-sm">
                  Recommandations intelligentes pour optimiser vos rendements.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-white/15 rounded-lg p-2 mt-0.5 shrink-0">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-semibold text-white">Conforme SYSCOHADA</p>
                <p className="text-white/65 text-sm">
                  Comptabilité et reporting aux normes OHADA, prêt pour l&apos;audit.
                </p>
              </div>
            </div>
          </div>

          {/* Citation client */}
          <div className="border border-white/25 rounded-2xl p-6 bg-white/10">
            <p className="text-white/90 italic text-base leading-relaxed">
              &quot;AGRIFRIK a transformé notre coopérative. +34% de rendement en 1 an.&quot;
            </p>
            <p className="text-white/60 text-sm mt-3 font-medium">— Konan Y., Soubré</p>
          </div>
        </div>

        {/* Footer gauche */}
        <p className="text-white/40 text-xs">© 2025 AGRIFRIK by IBIG SOFT</p>
      </div>

      {/* Panneau droit */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 py-12 bg-white">
        {/* Logo mobile */}
        <div className="lg:hidden flex items-center gap-2 mb-10">
          <Leaf className="w-6 h-6" style={{ color: "#2E7D32" }} />
          <span className="text-xl font-bold" style={{ color: "#1B5E20" }}>
            AGRIFRIK
          </span>
        </div>

        <div className="w-full max-w-md space-y-8">
          {/* En-tête formulaire */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Connexion à votre espace</h2>
            <p className="text-gray-500 text-sm mt-1">
              Entrez vos identifiants pour accéder à l&apos;ERP
            </p>
          </div>

          {/* Formulaire */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Email */}
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-gray-700" htmlFor="email">
                Adresse email
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                />
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="vous@exemple.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border border-gray-200 rounded-xl px-4 py-3 text-sm w-full pl-10 focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
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
                <Lock
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="border border-gray-200 rounded-xl px-4 py-3 text-sm w-full pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
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

            {/* Se souvenir de moi */}
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
              className="block bg-[#2E7D32] hover:bg-[#1B5E20] disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-xl w-full transition-colors text-center text-sm"
            >
              {isLoading ? "Connexion..." : "Se connecter"}
            </button>

            {/* Séparateur */}
            <div className="flex items-center gap-3">
              <div className="flex-1 border-t border-gray-200" />
              <span className="text-xs text-gray-400 font-medium">ou</span>
              <div className="flex-1 border-t border-gray-200" />
            </div>

            {/* SSO */}
            <button
              type="button"
              className="border border-gray-200 text-gray-700 font-medium py-3 px-6 rounded-xl w-full hover:bg-gray-50 transition-colors text-sm"
            >
              Accéder avec SSO
            </button>
          </form>

          {/* Compte démo */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-xs text-gray-500 text-center">
            Compte démo&nbsp;: <span className="font-medium text-gray-700">admin@agrifrik.com</span> / <span className="font-medium text-gray-700">agrifrik2025</span>
          </div>

          {/* Lien démo */}
          <p className="text-center text-sm text-gray-500">
            Pas encore de compte ?{" "}
            <a href="#" className="font-medium hover:underline" style={{ color: "#2E7D32" }}>
              Demander une démo
            </a>
          </p>
        </div>

        {/* Footer */}
        <p className="mt-12 text-center text-xs text-gray-400">
          © 2025 AGRIFRIK by IBIG SOFT · Support :{" "}
          <a href="mailto:support@agrifrik.com" className="hover:underline">
            support@agrifrik.com
          </a>
        </p>
      </div>
    </div>
  );
}
