"use client";

import { useRouter } from "next/navigation";
import { Leaf, ArrowLeft, Copy, Check, ChevronRight, ExternalLink } from "lucide-react";
import { useState } from "react";

// ─── Scénarios de démonstration ──────────────────────────────────────────────

const SCENARIOS = [
  {
    emoji: "🍫",
    titre: "Campagne cacao 2024-2025",
    desc: "Suivez le cycle complet d'une campagne cacao : parcelles, récoltes, pesées et ventes aux exportateurs.",
    href: "/dashboard",
    couleur: "from-amber-50 to-yellow-50",
    bordure: "border-amber-200 hover:border-amber-400",
    badge: "bg-amber-100 text-amber-700",
    badgeLabel: "Tableau de bord",
  },
  {
    emoji: "📦",
    titre: "Gérer mes stocks et entrepôts",
    desc: "Mouvements de stock, niveaux d'alerte, inventaire multi-entrepôts et traçabilité des lots.",
    href: "/stocks",
    couleur: "from-blue-50 to-sky-50",
    bordure: "border-blue-200 hover:border-blue-400",
    badge: "bg-blue-100 text-blue-700",
    badgeLabel: "Stocks",
  },
  {
    emoji: "💰",
    titre: "Générer la paie de juillet",
    desc: "Calcul automatique des salaires, primes de récolte et bulletins de paie conformes à la législation locale.",
    href: "/paie",
    couleur: "from-green-50 to-emerald-50",
    bordure: "border-green-200 hover:border-green-400",
    badge: "bg-green-100 text-green-700",
    badgeLabel: "Paie",
  },
  {
    emoji: "🚢",
    titre: "Exporter vers l'Europe",
    desc: "Gestion des certifications, documents douaniers, conteneurs et traçabilité EU Deforestation Regulation.",
    href: "/exportation",
    couleur: "from-indigo-50 to-violet-50",
    bordure: "border-indigo-200 hover:border-indigo-400",
    badge: "bg-indigo-100 text-indigo-700",
    badgeLabel: "Exportation",
  },
  {
    emoji: "📊",
    titre: "Rapport pour la FAO",
    desc: "Génération automatique de rapports normalisés pour les bailleurs de fonds et institutions internationales.",
    href: "/bailleur",
    couleur: "from-rose-50 to-pink-50",
    bordure: "border-rose-200 hover:border-rose-400",
    badge: "bg-rose-100 text-rose-700",
    badgeLabel: "Bailleur",
  },
  {
    emoji: "🗺️",
    titre: "Voir la cartographie",
    desc: "Carte interactive de vos parcelles, délimitation GPS, historique cultural et indices de végétation.",
    href: "/cartographie",
    couleur: "from-teal-50 to-cyan-50",
    bordure: "border-teal-200 hover:border-teal-400",
    badge: "bg-teal-100 text-teal-700",
    badgeLabel: "Cartographie",
  },
];

// ─── Illustration SVG ─────────────────────────────────────────────────────────

function PaysageAgricole() {
  return (
    <svg
      viewBox="0 0 320 320"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      {/* Cercle de fond */}
      <circle cx="160" cy="160" r="155" fill="#E8F5E9" />
      <circle cx="160" cy="160" r="155" fill="none" stroke="#A5D6A7" strokeWidth="2" />

      {/* Ciel */}
      <path d="M5 160 Q160 60 315 160" fill="#B3E5FC" opacity="0.5" />

      {/* Soleil */}
      <circle cx="240" cy="80" r="28" fill="#FDD835" opacity="0.85" />
      <circle cx="240" cy="80" r="20" fill="#FFEE58" />
      {[0,45,90,135,180,225,270,315].map((angle, i) => (
        <line
          key={i}
          x1={240 + 23 * Math.cos((angle * Math.PI) / 180)}
          y1={80 + 23 * Math.sin((angle * Math.PI) / 180)}
          x2={240 + 32 * Math.cos((angle * Math.PI) / 180)}
          y2={80 + 32 * Math.sin((angle * Math.PI) / 180)}
          stroke="#FDD835"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      ))}

      {/* Nuages */}
      <ellipse cx="90" cy="85" rx="30" ry="14" fill="white" opacity="0.8" />
      <ellipse cx="110" cy="78" rx="22" ry="13" fill="white" opacity="0.8" />
      <ellipse cx="70" cy="80" rx="18" ry="11" fill="white" opacity="0.8" />

      {/* Terrain */}
      <path d="M5 210 Q80 185 160 200 Q240 215 315 195 L315 315 L5 315 Z" fill="#4CAF50" />
      <path d="M5 230 Q80 210 160 220 Q240 230 315 215 L315 315 L5 315 Z" fill="#2E7D32" />

      {/* Rangées de cultures (cacao stylisé) */}
      {[0,1,2,3,4].map((row) => (
        <g key={row}>
          {[0,1,2,3,4,5].map((col) => {
            const x = 30 + col * 45 + row * 5;
            const y = 220 + row * 18;
            if (x > 300 || y > 290) return null;
            return (
              <g key={col}>
                <line x1={x} y1={y} x2={x} y2={y - 22} stroke="#1B5E20" strokeWidth="2" />
                <ellipse cx={x} cy={y - 25} rx="8" ry="12" fill="#388E3C" opacity="0.9" />
                <ellipse cx={x - 4} cy={y - 20} rx="6" ry="4" fill="#66BB6A" opacity="0.7" transform={`rotate(-30,${x - 4},${y - 20})`} />
              </g>
            );
          })}
        </g>
      ))}

      {/* Palmier à gauche */}
      <line x1="55" y1="210" x2="55" y2="155" stroke="#5D4037" strokeWidth="4" strokeLinecap="round" />
      <ellipse cx="55" cy="150" rx="25" ry="10" fill="#2E7D32" transform="rotate(-20,55,150)" />
      <ellipse cx="55" cy="150" rx="25" ry="10" fill="#388E3C" transform="rotate(20,55,150)" />
      <ellipse cx="55" cy="148" rx="20" ry="8" fill="#43A047" transform="rotate(-5,55,148)" />

      {/* Palmier à droite */}
      <line x1="270" y1="205" x2="265" y2="148" stroke="#5D4037" strokeWidth="4" strokeLinecap="round" />
      <ellipse cx="265" cy="143" rx="25" ry="10" fill="#2E7D32" transform="rotate(-15,265,143)" />
      <ellipse cx="265" cy="143" rx="25" ry="10" fill="#388E3C" transform="rotate(25,265,143)" />
      <ellipse cx="265" cy="141" rx="20" ry="8" fill="#43A047" />

      {/* Maison / ferme */}
      <rect x="140" y="178" width="42" height="30" fill="#FFCC80" rx="2" />
      <polygon points="140,178 161,158 182,178" fill="#E53935" />
      <rect x="153" y="190" width="14" height="18" fill="#795548" />
      <rect x="143" y="182" width="10" height="10" fill="#B3E5FC" rx="1" />

      {/* Chemin */}
      <path d="M161 208 Q160 240 158 315" stroke="#D7CCC8" strokeWidth="8" fill="none" opacity="0.6" />

      {/* Étiquette AGRIFRIK */}
      <text x="160" y="305" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1B5E20" opacity="0.8" fontFamily="sans-serif">
        Exploitation démo · Côte d&apos;Ivoire
      </text>
    </svg>
  );
}

// ─── Composant copier identifiants ───────────────────────────────────────────

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  function copy() {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  }
  return (
    <button
      onClick={copy}
      className="ml-1 text-gray-400 hover:text-[#2E7D32] transition-colors"
      title="Copier"
    >
      {copied ? <Check size={13} className="text-[#2E7D32]" /> : <Copy size={13} />}
    </button>
  );
}

// ─── Page principale ──────────────────────────────────────────────────────────

export default function DemoPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E8F5E9] via-white to-[#F1F8E9]">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-white/60 bg-white/70 backdrop-blur-sm sticky top-0 z-10">
        <a
          href="http://localhost:3000"
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#2E7D32] transition-colors font-medium"
        >
          <ArrowLeft size={15} />
          Retour au site
        </a>
        <div className="flex items-center gap-2">
          <div className="bg-[#2E7D32] rounded-lg p-1.5 shadow">
            <Leaf className="w-4 h-4 text-white" />
          </div>
          <span className="text-base font-extrabold text-[#1B5E20] tracking-tight">AGRIFRIK</span>
        </div>
        <button
          onClick={() => router.push("/onboarding")}
          className="text-sm font-semibold bg-[#2E7D32] text-white px-4 py-1.5 rounded-lg hover:bg-[#1B5E20] transition-colors"
        >
          Créer mon compte
        </button>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12 space-y-14">

        {/* Hero */}
        <section className="flex flex-col lg:flex-row items-center gap-10">
          {/* Illustration */}
          <div className="w-56 h-56 lg:w-72 lg:h-72 shrink-0">
            <PaysageAgricole />
          </div>

          {/* Texte */}
          <div className="text-center lg:text-left space-y-4">
            <div className="inline-flex items-center gap-2 bg-[#E8F5E9] text-[#2E7D32] text-xs font-bold px-3 py-1.5 rounded-full border border-[#2E7D32]/20 uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#2E7D32] animate-pulse" />
              Démonstration live
            </div>
            <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 leading-tight">
              Découvrez AGRIFRIK<br />
              <span className="text-[#2E7D32]">en action</span>
            </h1>
            <p className="text-gray-600 text-base leading-relaxed max-w-lg">
              Explorez toutes les fonctionnalités avec des données réelles d&apos;une exploitation ivoirienne de cacao — sans créer de compte.
            </p>

            {/* Compte démo */}
            <div className="inline-block bg-white border border-gray-200 rounded-2xl px-5 py-4 shadow-sm text-left">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
                Compte de démonstration
              </p>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-500 w-16 shrink-0">Email</span>
                  <code className="bg-gray-50 border border-gray-200 rounded px-2 py-0.5 text-gray-800 font-mono text-xs">
                    admin@agrifrik.com
                  </code>
                  <CopyButton text="admin@agrifrik.com" />
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-500 w-16 shrink-0">Mot de passe</span>
                  <code className="bg-gray-50 border border-gray-200 rounded px-2 py-0.5 text-gray-800 font-mono text-xs">
                    agrifrik2025
                  </code>
                  <CopyButton text="agrifrik2025" />
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <button
                onClick={() => router.push("/login")}
                className="flex items-center justify-center gap-2 bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-bold py-3 px-6 rounded-xl transition-colors shadow-md"
              >
                <ExternalLink size={16} />
                Se connecter avec le compte démo
              </button>
              <button
                onClick={() => router.push("/onboarding")}
                className="flex items-center justify-center gap-2 border-2 border-[#2E7D32] text-[#2E7D32] hover:bg-[#E8F5E9] font-bold py-3 px-6 rounded-xl transition-colors"
              >
                Créer mon compte <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </section>

        {/* Scénarios */}
        <section>
          <div className="text-center mb-8">
            <h2 className="text-2xl font-extrabold text-gray-900">
              6 scénarios à explorer
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Cliquez sur un scénario pour l&apos;explorer directement dans l&apos;application
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SCENARIOS.map((s) => (
              <button
                key={s.href}
                onClick={() => router.push(s.href)}
                className={`group flex flex-col gap-3 p-5 rounded-2xl border-2 bg-gradient-to-br text-left transition-all hover:shadow-md hover:-translate-y-0.5 ${s.couleur} ${s.bordure}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="text-3xl">{s.emoji}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide ${s.badge}`}>
                    {s.badgeLabel}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900 group-hover:text-[#1B5E20] transition-colors leading-snug">
                    {s.titre}
                  </p>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">{s.desc}</p>
                </div>
                <div className="flex items-center gap-1 text-xs font-semibold text-[#2E7D32] mt-auto">
                  Explorer <ChevronRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Stats rapides */}
        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-4 text-center">
            Dans la démonstration vous trouverez
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            {[
              { val: "247 ha", label: "Superficie gérée" },
              { val: "38", label: "Employés" },
              { val: "1 240 T", label: "Production cacao" },
              { val: "12", label: "Modules actifs" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-extrabold text-[#2E7D32]">{stat.val}</p>
                <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

      </main>

      <footer className="text-center py-8 text-xs text-gray-400">
        © 2025 AGRIFRIK by IBIG SOFT —{" "}
        <a href="http://localhost:3000" className="hover:text-[#2E7D32] underline transition-colors">
          Retour au site
        </a>
      </footer>
    </div>
  );
}
