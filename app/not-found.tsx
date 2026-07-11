"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4"
      style={{ background: "#F8FBF8" }}
    >
      {/* Illustration SVG agricole */}
      <div className="mb-8">
        <svg
          width="400"
          height="300"
          viewBox="0 0 400 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Ciel */}
          <rect width="400" height="300" fill="#E8F5E9" rx="16" />

          {/* Nuages */}
          <ellipse cx="80" cy="55" rx="30" ry="16" fill="white" opacity="0.9" />
          <ellipse cx="100" cy="48" rx="22" ry="14" fill="white" opacity="0.9" />
          <ellipse cx="60" cy="50" rx="18" ry="12" fill="white" opacity="0.9" />

          <ellipse cx="310" cy="40" rx="28" ry="15" fill="white" opacity="0.9" />
          <ellipse cx="330" cy="33" rx="20" ry="13" fill="white" opacity="0.9" />
          <ellipse cx="290" cy="36" rx="16" ry="11" fill="white" opacity="0.9" />

          {/* Oiseaux (3 courbes simples) */}
          <path d="M150 70 Q155 64 160 70" stroke="#4CAF50" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M168 62 Q173 56 178 62" stroke="#4CAF50" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M185 72 Q190 66 195 72" stroke="#4CAF50" strokeWidth="2" fill="none" strokeLinecap="round" />

          {/* Sol / champ */}
          <rect x="0" y="200" width="400" height="100" fill="#388E3C" rx="0" />
          <rect x="0" y="195" width="400" height="12" fill="#2E7D32" />

          {/* Rangées de plants de cacao */}
          {[40, 80, 120, 160, 230, 280, 330, 370].map((x, i) => (
            <g key={i}>
              {/* Tige */}
              <rect x={x - 2} y={145} width={4} height={52} fill="#1B5E20" rx="2" />
              {/* Feuilles */}
              <ellipse cx={x - 10} cy={168} rx={12} ry={7} fill="#4CAF50" opacity="0.85" transform={`rotate(-20, ${x - 10}, 168)`} />
              <ellipse cx={x + 10} cy={162} rx={12} ry={7} fill="#66BB6A" opacity="0.85" transform={`rotate(20, ${x + 10}, 162)`} />
              <ellipse cx={x} cy={148} rx={9} ry={5} fill="#81C784" opacity="0.8" />
              {/* Cacao (petits cercles orange) */}
              <circle cx={x - 6} cy={178} r={4} fill="#E65100" opacity="0.8" />
              <circle cx={x + 6} cy={182} r={3.5} fill="#BF360C" opacity="0.7" />
            </g>
          ))}

          {/* Tracteur stylisé (arrière-plan gauche) */}
          <g opacity="0.6">
            {/* Cabine */}
            <rect x="30" y="155" width="45" height="30" fill="#1B5E20" rx="4" />
            <rect x="38" y="148" width="32" height="20" fill="#2E7D32" rx="3" />
            {/* Vitres */}
            <rect x="42" y="151" width="22" height="13" fill="#B2DFDB" rx="2" />
            {/* Carrosserie */}
            <rect x="22" y="170" width="65" height="18" fill="#388E3C" rx="4" />
            {/* Grandes roues */}
            <circle cx="40" cy="192" r="14" fill="#1A2E1A" />
            <circle cx="40" cy="192" r="9" fill="#37474F" />
            <circle cx="40" cy="192" r="4" fill="#78909C" />
            {/* Petites roues */}
            <circle cx="76" cy="192" r="9" fill="#1A2E1A" />
            <circle cx="76" cy="192" r="6" fill="#37474F" />
            <circle cx="76" cy="192" r="2.5" fill="#78909C" />
            {/* Fumée */}
            <circle cx="66" cy="143" r="5" fill="#B0BEC5" opacity="0.5" />
            <circle cx="70" cy="135" r="4" fill="#B0BEC5" opacity="0.4" />
            <circle cx="67" cy="127" r="3" fill="#B0BEC5" opacity="0.3" />
          </g>

          {/* Panneau 404 */}
          <g>
            {/* Poteau */}
            <rect x="196" y="110" width="8" height="92" fill="#795548" rx="2" />
            {/* Panneau fond blanc */}
            <rect x="152" y="80" width="96" height="60" fill="white" rx="6" stroke="#E65100" strokeWidth="3" />
            {/* Texte 404 */}
            <text
              x="200"
              y="122"
              textAnchor="middle"
              fontFamily="system-ui, sans-serif"
              fontWeight="bold"
              fontSize="30"
              fill="#E65100"
            >
              404
            </text>
            {/* Sous-texte */}
            <text
              x="200"
              y="136"
              textAnchor="middle"
              fontFamily="system-ui, sans-serif"
              fontSize="9"
              fill="#795548"
            >
              PARCELLE INTROUVABLE
            </text>
          </g>
        </svg>
      </div>

      {/* Titre */}
      <h1
        className="text-4xl font-bold mb-4 text-center"
        style={{ color: "#1B5E20" }}
      >
        Parcelle introuvable...
      </h1>

      {/* Sous-titre */}
      <p className="text-gray-500 text-center max-w-md mb-8 leading-relaxed">
        Il semblerait que la page que vous cherchez ne soit pas dans notre exploitation.
        Elle a peut-être été déplacée, récoltée ou n&apos;a jamais existé.
      </p>

      {/* 3 boutons d'action */}
      <div className="flex flex-col sm:flex-row gap-3 mb-10">
        <Link
          href="/dashboard"
          className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: "#2E7D32" }}
        >
          🏠 Retour au tableau de bord
        </Link>
        <Link
          href="/dashboard"
          className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold border-2 transition-colors hover:bg-green-50"
          style={{ color: "#2E7D32", borderColor: "#2E7D32" }}
        >
          🔍 Rechercher un module
        </Link>
        <Link
          href="/aide"
          className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
        >
          💬 Signaler un problème
        </Link>
      </div>

      {/* Barre de navigation rapide */}
      <div className="text-sm text-gray-500 flex flex-wrap items-center justify-center gap-2 mb-8">
        <span className="font-medium">Accès rapide :</span>
        {[
          { label: "Cultures", href: "/cultures" },
          { label: "Stocks", href: "/stocks" },
          { label: "Ventes", href: "/ventes" },
          { label: "Finance", href: "/comptabilite" },
          { label: "RH", href: "/rh" },
          { label: "IA", href: "/ia" },
        ].map((item, i, arr) => (
          <span key={item.href} className="flex items-center gap-2">
            <Link
              href={item.href}
              className="font-medium hover:underline transition-colors"
              style={{ color: "#2E7D32" }}
            >
              {item.label}
            </Link>
            {i < arr.length - 1 && <span className="text-gray-300">|</span>}
          </span>
        ))}
      </div>

      {/* Footer */}
      <p className="text-xs text-gray-400">
        AGRIFRIK ERP v2.0 — © 2025
      </p>
    </div>
  );
}
