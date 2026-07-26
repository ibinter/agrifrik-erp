import { NextResponse } from "next/server";

// Table de tokens de démonstration (miroir de app/verify/[jeton]/page.tsx)
// En production : interroger la table Supabase `document_tokens`
const DEMO_TOKENS: Record<
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

/**
 * GET /api/documents/verify?jeton=<jeton>
 *
 * Vérifie l'authenticité d'un document à partir de son jeton QR.
 * Réponse publique — aucune auth requise.
 */
export async function GET(req: Request): Promise<NextResponse> {
  const { searchParams } = new URL(req.url);
  const jeton = searchParams.get("jeton");

  if (!jeton) {
    return NextResponse.json(
      { error: "Paramètre 'jeton' manquant" },
      { status: 400 }
    );
  }

  const doc = DEMO_TOKENS[jeton];

  if (!doc) {
    return NextResponse.json(
      {
        statut: "introuvable",
        jeton,
        message:
          "Ce jeton ne correspond à aucun document connu ou le document a été révoqué.",
      },
      { status: 404 }
    );
  }

  return NextResponse.json(
    {
      statut: "authentique",
      jeton,
      document: doc,
    },
    { status: 200 }
  );
}
