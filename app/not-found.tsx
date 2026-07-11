"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        {/* Icône SVG plante brisée */}
        <div className="flex justify-center mb-8">
          <svg
            width="120"
            height="120"
            viewBox="0 0 120 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Tige principale */}
            <path
              d="M60 100 L60 55"
              stroke="#4CAF50"
              strokeWidth="4"
              strokeLinecap="round"
            />
            {/* Tige brisée (décalée) */}
            <path
              d="M60 55 L56 38"
              stroke="#81C784"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="4 2"
            />
            {/* Feuille gauche */}
            <path
              d="M60 75 Q40 65 38 48 Q50 55 60 70"
              fill="#66BB6A"
              opacity="0.85"
            />
            {/* Feuille droite */}
            <path
              d="M60 68 Q80 58 82 41 Q70 48 60 63"
              fill="#4CAF50"
              opacity="0.85"
            />
            {/* Petite feuille haute gauche */}
            <path
              d="M56 38 Q40 28 42 14 Q52 24 56 36"
              fill="#A5D6A7"
              opacity="0.7"
            />
            {/* Sol / Racines */}
            <ellipse cx="60" cy="104" rx="22" ry="6" fill="#A5D6A7" opacity="0.4" />
            <path
              d="M52 100 Q46 108 40 106"
              stroke="#66BB6A"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M60 102 Q60 110 55 114"
              stroke="#66BB6A"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M68 100 Q74 108 80 106"
              stroke="#66BB6A"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
            {/* Point de cassure */}
            <circle cx="57" cy="46" r="4" fill="#FFA726" opacity="0.9" />
          </svg>
        </div>

        {/* Code 404 */}
        <div className="text-8xl font-bold text-green-800 dark:text-green-400 leading-none mb-4">
          404
        </div>

        {/* Titre */}
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
          Page introuvable
        </h1>

        {/* Description */}
        <p className="text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
          La page que vous recherchez n&apos;existe pas ou a été déplacée.
          Retournez au tableau de bord.
        </p>

        {/* Boutons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-xl text-sm font-semibold text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            ← Retour
          </button>
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#2E7D32" }}
          >
            🏠 Dashboard
          </Link>
        </div>

        {/* Lien aide */}
        <p className="mt-8 text-sm text-gray-400 dark:text-gray-500">
          Besoin d&apos;aide ?{" "}
          <Link
            href="/aide"
            className="text-green-700 dark:text-green-400 hover:underline font-medium"
          >
            Contactez le support
          </Link>
        </p>
      </div>
    </div>
  );
}
