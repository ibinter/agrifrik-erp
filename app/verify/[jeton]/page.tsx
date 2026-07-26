// app/verify/[jeton]/page.tsx — Server component (public, aucune auth requise)
import { notFound } from "next/navigation";

// Simule une base de documents vérifiables
// En production : chercher dans la table Supabase `document_tokens`
const DEMO_DOCS: Record<
  string,
  { type: string; ref: string; emetteur: string; date: string; statut: string }
> = {
  "demo-facture-001": {
    type: "Facture",
    ref: "FAC-2026-001",
    emetteur: "AGRIFRIK ERP — Exploitation Konan",
    date: "2026-01-15",
    statut: "Authentique",
  },
  "demo-facture-002": {
    type: "Facture",
    ref: "FAC-2026-002",
    emetteur: "AGRIFRIK ERP — Exploitation Diallo",
    date: "2026-02-03",
    statut: "Authentique",
  },
  "demo-bon-livraison-001": {
    type: "Bon de livraison",
    ref: "BL-2026-001",
    emetteur: "AGRIFRIK ERP — Logistique",
    date: "2026-01-20",
    statut: "Authentique",
  },
};

export default async function VerifyPage({
  params,
}: {
  params: Promise<{ jeton: string }>;
}) {
  const { jeton } = await params;
  const doc = DEMO_DOCS[jeton]; // En production: chercher dans Supabase

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F8FBF8",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "sans-serif",
        padding: "16px",
      }}
    >
      <div
        style={{
          maxWidth: 480,
          width: "100%",
          background: "white",
          borderRadius: 16,
          padding: 32,
          boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
        }}
      >
        {/* En-tête */}
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div style={{ fontSize: 32, fontWeight: 900, color: "#2E7D32" }}>
            AGRIFRIK
          </div>
          <div style={{ color: "#666", fontSize: 13 }}>
            Vérification de document
          </div>
        </div>

        {doc ? (
          <div>
            {/* Bandeau succès */}
            <div
              style={{
                background: "#F0FDF4",
                border: "2px solid #2E7D32",
                borderRadius: 12,
                padding: 16,
                marginBottom: 16,
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 32 }}>✅</div>
              <div
                style={{ color: "#2E7D32", fontWeight: 700, fontSize: 16 }}
              >
                Document authentique
              </div>
            </div>

            {/* Tableau de détails */}
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <tbody>
                {(
                  [
                    ["Type", doc.type],
                    ["Référence", doc.ref],
                    ["Émetteur", doc.emetteur],
                    ["Date", doc.date],
                    ["Statut", doc.statut],
                    ["Jeton", jeton],
                  ] as [string, string][]
                ).map(([label, value]) => (
                  <tr key={label}>
                    <td
                      style={{
                        padding: "8px 0",
                        color: "#666",
                        fontSize: 13,
                        borderBottom: "1px solid #E5E7EB",
                        paddingRight: 12,
                        width: "40%",
                      }}
                    >
                      {label}
                    </td>
                    <td
                      style={{
                        padding: "8px 0",
                        fontWeight: 600,
                        fontSize: 13,
                        borderBottom: "1px solid #E5E7EB",
                        wordBreak: "break-all",
                      }}
                    >
                      {value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div
              style={{
                marginTop: 16,
                fontSize: 11,
                color: "#999",
                textAlign: "center",
              }}
            >
              Ce document a été émis et certifié par AGRIFRIK ERP (IBIG SOFT).
            </div>
          </div>
        ) : (
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 48, marginBottom: 8 }}>❓</div>
            <div
              style={{
                color: "#B91C1C",
                fontWeight: 700,
                fontSize: 16,
                marginBottom: 8,
              }}
            >
              Document introuvable
            </div>
            <div style={{ color: "#666", fontSize: 13 }}>
              Ce jeton ne correspond à aucun document connu, ou le document a
              été révoqué.
            </div>
          </div>
        )}

        {/* Pied de page */}
        <div style={{ marginTop: 24, textAlign: "center" }}>
          <a
            href="https://agrifrik.ibigsoft.com"
            style={{ color: "#2E7D32", fontSize: 12 }}
          >
            agrifrik.ibigsoft.com
          </a>
        </div>
      </div>
    </div>
  );
}
