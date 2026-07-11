"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="fr">
      <body
        style={{
          margin: 0,
          padding: 0,
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          backgroundColor: "#ffffff",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ textAlign: "center", maxWidth: 480, padding: "0 24px" }}>
          {/* Icône SVG alerte critique */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 32 }}>
            <svg
              width="120"
              height="120"
              viewBox="0 0 120 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="60" cy="60" r="50" fill="#FFF3E0" />
              <circle cx="60" cy="60" r="50" stroke="#FB8C00" strokeWidth="4" />
              <rect x="56" y="34" width="8" height="32" rx="4" fill="#FB8C00" />
              <circle cx="60" cy="80" r="5" fill="#FB8C00" />
            </svg>
          </div>

          {/* Titre erreur critique */}
          <div
            style={{
              fontSize: 56,
              fontWeight: 800,
              color: "#E65100",
              lineHeight: 1,
              marginBottom: 16,
            }}
          >
            Erreur critique
          </div>

          <h1
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: "#111827",
              marginBottom: 12,
            }}
          >
            L&apos;application a rencontré un problème
          </h1>

          <p
            style={{
              color: "#6B7280",
              marginBottom: 24,
              lineHeight: 1.6,
            }}
          >
            Une erreur critique s&apos;est produite. Notre équipe a été notifiée.
            Veuillez réessayer ou actualiser la page.
          </p>

          {/* Message technique */}
          {error.message && (
            <div
              style={{
                backgroundColor: "#F3F4F6",
                borderRadius: 12,
                padding: "12px 16px",
                marginBottom: 24,
                textAlign: "left",
              }}
            >
              <p
                style={{
                  fontFamily: "monospace",
                  fontSize: 13,
                  color: "#374151",
                  wordBreak: "break-all",
                  margin: 0,
                }}
              >
                {error.message}
              </p>
              {error.digest && (
                <p
                  style={{
                    fontFamily: "monospace",
                    fontSize: 11,
                    color: "#9CA3AF",
                    marginTop: 4,
                    marginBottom: 0,
                  }}
                >
                  ref: {error.digest}
                </p>
              )}
            </div>
          )}

          {/* Bouton reset */}
          <button
            onClick={reset}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 24px",
              borderRadius: 12,
              border: "none",
              backgroundColor: "#2E7D32",
              color: "#ffffff",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            🔄 Réessayer
          </button>
        </div>
      </body>
    </html>
  );
}
