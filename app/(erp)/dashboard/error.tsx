"use client";

import Link from "next/link";
import { RefreshCw, LayoutDashboard, AlertTriangle } from "lucide-react";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{ backgroundColor: "#F8FBF8" }}
    >
      <div className="rounded-2xl border border-gray-100 bg-white p-10 max-w-lg w-full text-center shadow-sm">
        <div className="flex justify-center mb-6">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center"
            style={{ backgroundColor: "#FFF3E0" }}
          >
            <AlertTriangle className="w-8 h-8" style={{ color: "#E65100" }} />
          </div>
        </div>

        <h1 className="text-xl font-bold text-gray-800 mb-2">
          Erreur du tableau de bord
        </h1>
        <p className="text-gray-500 text-sm mb-6 leading-relaxed">
          Une erreur inattendue s&apos;est produite lors du chargement du tableau de bord.
          Réessayez ou contactez le support si le problème persiste.
        </p>

        {error.message && (
          <div className="rounded-xl bg-gray-50 border border-gray-100 px-4 py-3 mb-6 text-left">
            <p className="text-xs text-gray-400 uppercase tracking-wide font-medium mb-1">
              Détail
            </p>
            <p className="font-mono text-sm text-gray-600 break-all">{error.message}</p>
            {error.digest && (
              <p className="font-mono text-xs text-gray-400 mt-1">ref: {error.digest}</p>
            )}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#2E7D32" }}
          >
            <RefreshCw className="w-4 h-4" />
            Réessayer
          </button>
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            <LayoutDashboard className="w-4 h-4" />
            Tableau de bord
          </Link>
        </div>
      </div>
    </div>
  );
}
