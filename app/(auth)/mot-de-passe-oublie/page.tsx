"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Mail, Lock, ShieldCheck } from "lucide-react";

export default function MotDePasseOubliePage() {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState<1 | 2>(1);
  const [isLoading, setIsLoading] = useState(false);
  const [canResend, setCanResend] = useState(false);
  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    if (step === 2) {
      setCanResend(false);
      setCountdown(60);
      const interval = setInterval(() => {
        setCountdown((c) => {
          if (c <= 1) {
            clearInterval(interval);
            setCanResend(true);
            return 0;
          }
          return c - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [step]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep(2);
    }, 1000);
  };

  const handleResend = () => {
    if (!canResend) return;
    setStep(1);
    setTimeout(() => setStep(2), 800);
  };

  return (
    <div className="min-h-screen flex">
      {/* ── Colonne gauche – Branding ── */}
      <div
        className="hidden lg:flex lg:flex-1 flex-col justify-between relative overflow-hidden"
        style={{ background: "linear-gradient(160deg, #0D2B0D 0%, #2E7D32 100%)" }}
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

          {/* Titre + illustration */}
          <div className="mt-16 mb-auto">
            <p className="text-white text-3xl font-bold leading-snug max-w-lg">
              Réinitialisez votre mot de passe
            </p>
            <p className="mt-4 text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
              Pas de panique ! Entrez votre email et nous vous enverrons un lien de réinitialisation.
            </p>

            {/* Illustration SVG */}
            <div className="mt-10 flex justify-center">
              <svg width="300" height="250" viewBox="0 0 300 250" xmlns="http://www.w3.org/2000/svg">
                {/* Cercle fond vert clair */}
                <circle cx="150" cy="125" r="108" fill="rgba(76,175,80,0.13)" />

                {/* Enveloppe corps */}
                <rect x="68" y="88" width="164" height="108" rx="10" fill="rgba(255,255,255,0.1)" stroke="rgba(165,214,167,0.55)" strokeWidth="2" />
                {/* Rabat ouvert */}
                <path d="M68 88 L150 140 L232 88" fill="none" stroke="rgba(165,214,167,0.55)" strokeWidth="2" />
                {/* Lignes de contenu */}
                <line x1="92" y1="158" x2="158" y2="158" stroke="rgba(165,214,167,0.28)" strokeWidth="2" strokeLinecap="round" />
                <line x1="92" y1="170" x2="138" y2="170" stroke="rgba(165,214,167,0.28)" strokeWidth="2" strokeLinecap="round" />

                {/* Clé */}
                <circle cx="164" cy="142" r="13" fill="none" stroke="#81C784" strokeWidth="2.5" />
                <line x1="172" y1="152" x2="188" y2="168" stroke="#81C784" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="183" y1="163" x2="190" y2="158" stroke="#81C784" strokeWidth="2" strokeLinecap="round" />
                <line x1="186" y1="167" x2="193" y2="162" stroke="#81C784" strokeWidth="2" strokeLinecap="round" />

                {/* Feuilles de cacao gauche */}
                <ellipse cx="60" cy="74" rx="18" ry="7" fill="rgba(76,175,80,0.5)" transform="rotate(-35 60 74)" />
                <ellipse cx="55" cy="79" rx="12" ry="5" fill="rgba(56,142,60,0.4)" transform="rotate(-50 55 79)" />

                {/* Feuilles de cacao droite */}
                <ellipse cx="240" cy="76" rx="18" ry="7" fill="rgba(76,175,80,0.5)" transform="rotate(35 240 76)" />
                <ellipse cx="245" cy="81" rx="12" ry="5" fill="rgba(56,142,60,0.4)" transform="rotate(50 245 81)" />

                {/* Feuilles bas */}
                <ellipse cx="76" cy="197" rx="14" ry="6" fill="rgba(76,175,80,0.38)" transform="rotate(-18 76 197)" />
                <ellipse cx="224" cy="197" rx="14" ry="6" fill="rgba(76,175,80,0.38)" transform="rotate(18 224 197)" />

                {/* Points déco */}
                <circle cx="100" cy="57" r="3" fill="rgba(165,214,167,0.5)" />
                <circle cx="200" cy="54" r="2.5" fill="rgba(165,214,167,0.4)" />
                <circle cx="250" cy="138" r="4" fill="rgba(165,214,167,0.3)" />
                <circle cx="50" cy="148" r="3" fill="rgba(165,214,167,0.4)" />
              </svg>
            </div>
          </div>

          {/* Points de confiance */}
          <div className="space-y-5 mb-10">
            {[
              { Icon: Lock, title: "Lien sécurisé valable 30 minutes", sub: "Votre sécurité est notre priorité" },
              { Icon: Mail, title: "Email de réinitialisation en 2 minutes", sub: "Vérifiez aussi vos spams" },
              { Icon: ShieldCheck, title: "Vos données restent protégées", sub: "Chiffrement SSL/TLS 256-bit" },
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

          {step === 1 ? (
            <>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">Mot de passe oublié</h2>
              <p className="text-sm text-gray-500 mb-8">
                Entrez l&apos;email associé à votre compte AGRIFRIK
              </p>

              <form className="space-y-5" onSubmit={handleSubmit}>
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

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 rounded-xl text-white font-semibold text-sm transition disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ background: isLoading ? "#4CAF50" : "#2E7D32" }}
                >
                  {isLoading ? "Envoi en cours…" : "Envoyer le lien de réinitialisation"}
                </button>
              </form>

              <div className="mt-6 text-center">
                <Link
                  href="/login"
                  className="text-sm font-medium hover:underline"
                  style={{ color: "#2E7D32" }}
                >
                  ← Retour à la connexion
                </Link>
              </div>
            </>
          ) : (
            <>
              {/* Check animé */}
              <div className="flex justify-center mb-6">
                <svg
                  width="80"
                  height="80"
                  viewBox="0 0 80 80"
                  xmlns="http://www.w3.org/2000/svg"
                  className="animate-pulse"
                >
                  <circle cx="40" cy="40" r="38" fill="#E8F5E9" stroke="#4CAF50" strokeWidth="3" />
                  <path
                    d="M22 40 L34 52 L58 28"
                    stroke="#2E7D32"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </svg>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-3 text-center">Email envoyé !</h2>
              <p className="text-sm text-gray-500 mb-4 text-center leading-relaxed">
                Si un compte existe avec l&apos;adresse{" "}
                <span className="font-semibold text-gray-700">
                  {email || "admin@agrifrik.com"}
                </span>
                , vous recevrez un email avec le lien de réinitialisation dans les prochaines
                minutes.
              </p>

              <div
                className="rounded-xl px-4 py-3 text-xs text-gray-600 text-center mb-6"
                style={{ background: "#FFF8E1", border: "1px solid #FFE082" }}
              >
                📬 Vérifiez aussi vos spams et courriers indésirables
              </div>

              <Link
                href="/login"
                className="w-full py-3 rounded-xl text-sm font-semibold border-2 transition hover:bg-[#F1F8E9] flex items-center justify-center"
                style={{ borderColor: "#2E7D32", color: "#2E7D32" }}
              >
                ← Retour à la connexion
              </Link>

              <div className="mt-4 text-center">
                {canResend ? (
                  <button
                    type="button"
                    onClick={handleResend}
                    className="text-sm text-gray-500 hover:text-gray-700 font-medium underline"
                  >
                    Renvoyer l&apos;email
                  </button>
                ) : (
                  <span className="text-xs text-gray-400">
                    Renvoyer disponible dans {countdown}s
                  </span>
                )}
              </div>
            </>
          )}
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
