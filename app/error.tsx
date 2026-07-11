"use client";

import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        {/* Icône SVG triangle alerte orange */}
        <div className="flex justify-center mb-8">
          <svg
            width="120"
            height="120"
            viewBox="0 0 120 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Triangle principal */}
            <path
              d="M60 15 L108 95 L12 95 Z"
              fill="#FFF3E0"
              stroke="#FB8C00"
              strokeWidth="4"
              strokeLinejoin="round"
            />
            {/* Ligne exclamation */}
            <rect x="56" y="42" width="8" height="28" rx="4" fill="#FB8C00" />
            {/* Point exclamation */}
            <circle cx="60" cy="82" r="5" fill="#FB8C00" />
          </svg>
        </div>

        {/* Code erreur */}
        <div className="text-8xl font-bold text-orange-500 leading-none mb-4">
          Erreur
        </div>

        {/* Titre */}
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
          Une erreur est survenue
        </h1>

        {/* Description */}
        <p className="text-gray-500 dark:text-gray-400 mb-6 leading-relaxed">
          Une erreur inattendue s&apos;est produite. Notre équipe technique a été
          notifiée. Vous pouvez réessayer ou retourner au tableau de bord.
        </p>

        {/* Message d'erreur technique */}
        {error.message && (
          <div className="bg-gray-100 dark:bg-gray-800 rounded-xl px-4 py-3 mb-6 text-left">
            <p className="text-xs text-gray-400 dark:text-gray-500 mb-1 uppercase tracking-wide font-medium">
              Détail technique
            </p>
            <p className="font-mono text-sm text-gray-700 dark:text-gray-300 break-all">
              {error.message}
            </p>
            {error.digest && (
              <p className="font-mono text-xs text-gray-400 mt-1">
                ref: {error.digest}
              </p>
            )}
          </div>
        )}

        {/* Boutons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#2E7D32" }}
          >
            🔄 Réessayer
          </button>
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            🏠 Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
