"use client";

import { useEffect, useState } from "react";
import { WifiOff, RefreshCw, CheckCircle2, Clock, Database } from "lucide-react";

interface CachedPage {
  url: string;
  label: string;
}

const KNOWN_PAGES: CachedPage[] = [
  { url: "/dashboard", label: "Tableau de bord" },
  { url: "/cultures", label: "Cultures" },
  { url: "/stocks", label: "Stocks" },
  { url: "/elevage", label: "Élevage" },
  { url: "/planning-cultural", label: "Planning cultural" },
];

export default function OfflinePage() {
  const [isOnline, setIsOnline] = useState<boolean>(false);
  const [cachedPages, setCachedPages] = useState<CachedPage[]>([]);
  const [isRetrying, setIsRetrying] = useState(false);

  useEffect(() => {
    // État initial
    setIsOnline(navigator.onLine);

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Vérifier quelles pages connues sont dans le cache SW
    async function checkCachedPages() {
      if (!("caches" in window)) return;
      try {
        const cacheNames = await caches.keys();
        const staticCache = cacheNames.find((n) => n.includes("-static"));
        if (!staticCache) return;
        const cache = await caches.open(staticCache);
        const keys = await cache.keys();
        const cachedUrls = new Set(keys.map((req) => new URL(req.url).pathname));
        setCachedPages(KNOWN_PAGES.filter((p) => cachedUrls.has(p.url)));
      } catch {
        // Cache API non disponible ou erreur silencieuse
      }
    }

    checkCachedPages();

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Rediriger automatiquement si la connexion revient
  useEffect(() => {
    if (isOnline) {
      const timer = setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isOnline]);

  const handleRetry = () => {
    setIsRetrying(true);
    setTimeout(() => {
      window.location.reload();
    }, 300);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8FBF8] px-4">
      <div className="w-full max-w-md">
        {/* Icône et statut */}
        <div className="flex flex-col items-center text-center mb-8">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mb-5"
            style={{ backgroundColor: isOnline ? "#E8F5E9" : "#FFF3E0" }}
          >
            {isOnline ? (
              <CheckCircle2 size={40} color="#2E7D32" />
            ) : (
              <WifiOff size={40} color="#E65100" />
            )}
          </div>

          {isOnline ? (
            <>
              <h1 className="text-2xl font-black text-[#1B5E20] mb-2">
                Connexion rétablie !
              </h1>
              <p className="text-sm text-gray-500">
                Redirection vers le tableau de bord…
              </p>
            </>
          ) : (
            <>
              <h1 className="text-2xl font-black text-gray-800 mb-2">
                Vous êtes hors ligne
              </h1>
              <p className="text-sm text-gray-500 max-w-xs">
                Vérifiez votre connexion internet. Les données saisies seront
                synchronisées automatiquement dès le retour du réseau.
              </p>
            </>
          )}
        </div>

        {/* Pages disponibles en cache */}
        {!isOnline && (
          <div className="rounded-2xl border border-gray-100 bg-white p-5 mb-4">
            <div className="flex items-center gap-2 mb-3">
              <Database size={16} color="#2E7D32" />
              <span className="text-sm font-semibold text-gray-700">
                Pages disponibles hors ligne
              </span>
            </div>

            {cachedPages.length > 0 ? (
              <ul className="space-y-1">
                {cachedPages.map((page) => (
                  <li key={page.url}>
                    <a
                      href={page.url}
                      className="flex items-center gap-2 text-sm text-[#2E7D32] hover:underline py-1"
                    >
                      <CheckCircle2 size={13} />
                      {page.label}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-gray-400 italic">
                Aucune page mise en cache pour le moment. Visitez les pages
                principales lorsque vous êtes connecté pour les rendre
                disponibles hors ligne.
              </p>
            )}
          </div>
        )}

        {/* Synchronisation différée */}
        {!isOnline && (
          <div className="rounded-2xl border border-gray-100 bg-white p-5 mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Clock size={16} color="#E65100" />
              <span className="text-sm font-semibold text-gray-700">
                Formulaires en attente
              </span>
            </div>
            <p className="text-xs text-gray-500">
              Tout formulaire soumis hors ligne est conservé localement et sera
              envoyé automatiquement dès que la connexion sera rétablie via le
              Background Sync.
            </p>
          </div>
        )}

        {/* Bouton réessayer */}
        {!isOnline && (
          <button
            onClick={handleRetry}
            disabled={isRetrying}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white transition-opacity disabled:opacity-70"
            style={{ backgroundColor: "#2E7D32" }}
          >
            <RefreshCw
              size={16}
              className={isRetrying ? "animate-spin" : ""}
            />
            {isRetrying ? "Connexion en cours…" : "Réessayer la connexion"}
          </button>
        )}

        {/* Logo discret */}
        <p className="text-center text-xs text-gray-300 mt-8 font-semibold tracking-widest">
          AGRIFRIK ERP
        </p>
      </div>
    </div>
  );
}
