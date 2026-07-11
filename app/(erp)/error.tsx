"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4"
      style={{ background: "#F8FBF8" }}
    >
      {/* Illustration SVG plante avec feuille tombante */}
      <div className="mb-8">
        <svg
          width="300"
          height="200"
          viewBox="0 0 300 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Fond */}
          <rect width="300" height="200" fill="#FFF3E0" rx="16" />

          {/* Sol */}
          <rect x="0" y="160" width="300" height="40" fill="#FFCC80" rx="0" />
          <rect x="0" y="155" width="300" height="10" fill="#FFB74D" />

          {/* Tige principale */}
          <rect x="147" y="80" width="6" height="78" fill="#795548" rx="3" />

          {/* Feuille saine gauche */}
          <path
            d="M150 110 Q115 95 112 72 Q132 80 150 105"
            fill="#4CAF50"
            opacity="0.85"
          />
          {/* Feuille saine droite */}
          <path
            d="M150 120 Q185 105 188 82 Q168 90 150 115"
            fill="#66BB6A"
            opacity="0.85"
          />

          {/* Feuille tombante (orange/brisée) */}
          <path
            d="M150 95 Q175 78 180 58 Q160 68 148 90"
            fill="#E65100"
            opacity="0.75"
            transform="rotate(25, 160, 90) translate(20, 15)"
          />
          {/* Ligne de chute feuille */}
          <path
            d="M185 95 Q195 115 188 138"
            stroke="#E65100"
            strokeWidth="1.5"
            fill="none"
            strokeDasharray="4 3"
            opacity="0.5"
          />
          {/* Feuille tombée au sol */}
          <ellipse cx="190" cy="153" rx="14" ry="6" fill="#E65100" opacity="0.55" transform="rotate(-15, 190, 153)" />

          {/* Fruits cacao (2 normaux, 1 orange/abimé) */}
          <ellipse cx="128" cy="122" rx="9" ry="6" fill="#BF360C" opacity="0.8" transform="rotate(-20, 128, 122)" />
          <ellipse cx="172" cy="128" rx="8" ry="5.5" fill="#BF360C" opacity="0.8" transform="rotate(15, 172, 128)" />
          <ellipse cx="155" cy="135" rx="8" ry="5" fill="#E65100" opacity="0.65" transform="rotate(-5, 155, 135)" />

          {/* Exclamation */}
          <circle cx="150" cy="50" r="22" fill="white" stroke="#E65100" strokeWidth="3" opacity="0.95" />
          <rect x="147" y="38" width="6" height="14" rx="3" fill="#E65100" />
          <circle cx="150" cy="58" r="3.5" fill="#E65100" />
        </svg>
      </div>

      {/* Titre */}
      <h1 className="text-3xl font-bold mb-3 text-center" style={{ color: "#E65100" }}>
        Une erreur s&apos;est produite
      </h1>

      {/* Sous-titre */}
      <p className="text-gray-500 text-center max-w-md mb-6 leading-relaxed">
        Le module AGRIFRIK a rencontré un problème inattendu. Nos équipes ont été
        notifiées automatiquement.
      </p>

      {/* Code d'erreur */}
      {error.digest && (
        <div className="bg-orange-50 border border-orange-200 rounded-xl px-4 py-3 mb-6 text-left max-w-sm w-full">
          <p className="text-xs text-orange-400 mb-1 uppercase tracking-wide font-medium">
            Code d&apos;erreur
          </p>
          <p className="font-mono text-sm text-orange-700 break-all">{error.digest}</p>
        </div>
      )}

      {/* Boutons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={reset}
          className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: "#2E7D32" }}
        >
          🔄 Réessayer
        </button>
        <button
          onClick={() => { window.location.href = "/dashboard"; }}
          className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold border-2 transition-colors hover:bg-green-50"
          style={{ color: "#2E7D32", borderColor: "#2E7D32" }}
        >
          🏠 Retour au tableau de bord
        </button>
      </div>
    </div>
  );
}
