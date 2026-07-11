"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Leaf, CheckCircle, BarChart3, Brain, ArrowLeft } from "lucide-react";

export default function MotDePasseOubliePage() {
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState("");

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

          <div className="border border-white/25 rounded-2xl p-6 bg-white/10">
            <p className="text-white/90 italic text-base leading-relaxed">
              &quot;AGRIFRIK a transformé notre coopérative. +34% de rendement en 1 an.&quot;
            </p>
            <p className="text-white/60 text-sm mt-3 font-medium">— Konan Y., Soubré</p>
          </div>
        </div>

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
          {/* Retour */}
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour à la connexion
          </Link>

          {/* En-tête */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Mot de passe oublié ?</h2>
            <p className="text-gray-500 text-sm mt-1">
              Renseignez votre email et nous vous enverrons un lien de réinitialisation.
            </p>
          </div>

          {/* Bandeau succès */}
          {sent && (
            <div
              className="flex items-start gap-3 rounded-xl px-4 py-3 text-sm font-medium"
              style={{ backgroundColor: "#E8F5E9", color: "#1B5E20" }}
            >
              <CheckCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <span>Un email a été envoyé à votre adresse. Vérifiez votre boîte de réception.</span>
            </div>
          )}

          {/* Formulaire */}
          <form
            className="space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-gray-700" htmlFor="email">
                Adresse email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  placeholder="vous@exemple.com"
                  className="border border-gray-200 rounded-xl px-4 py-3 text-sm w-full pl-10 focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-medium py-3 px-6 rounded-xl w-full transition-colors text-sm"
            >
              Envoyer le lien de réinitialisation
            </button>
          </form>
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
