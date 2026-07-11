import { NextResponse } from "next/server";
import { mockLots } from "@/lib/data";
import type { Lot } from "@/lib/types";

export async function GET(request: Request): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const statut = searchParams.get("statut");
    const produit = searchParams.get("produit")?.toLowerCase() ?? "";

    let result: Lot[] = [...mockLots];

    if (statut) {
      result = result.filter((l) => l.statut === statut);
    }

    if (produit) {
      result = result.filter((l) =>
        l.produit.toLowerCase().includes(produit)
      );
    }

    const quantiteTotale = result.reduce((sum, l) => sum + l.quantiteEntree, 0);

    return NextResponse.json({
      success: true,
      data: result,
      total: result.length,
      quantiteTotale,
    });
  } catch (error) {
    console.error("[GET /api/lots]", error);
    return NextResponse.json(
      { success: false, error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const body: unknown = await request.json();

    if (typeof body !== "object" || body === null) {
      return NextResponse.json(
        { success: false, error: "Corps de requête invalide" },
        { status: 400 }
      );
    }

    const { produit, quantiteEntree, parcelle, operateur, dateRecolte } =
      body as Record<string, unknown>;

    if (!produit || !quantiteEntree || !parcelle || !operateur || !dateRecolte) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Champs requis manquants : produit, quantiteEntree, parcelle, operateur, dateRecolte",
        },
        { status: 400 }
      );
    }

    const annee = new Date().getFullYear();
    const prefixeProduit = String(produit).substring(0, 3).toUpperCase();
    const sequence = String(Date.now()).slice(-3);
    const numero = `LOT-${annee}-${prefixeProduit}-${sequence}`;

    const newLot: Lot = {
      id: `lot-${Date.now()}`,
      numero,
      produit: String(produit),
      quantiteEntree: Number(quantiteEntree),
      parcelle: String(parcelle),
      operateur: String(operateur),
      dateRecolte: String(dateRecolte),
      statut: "Récolte",
      ...(body as Partial<Lot>),
    };

    return NextResponse.json(
      { success: true, data: newLot, message: "Lot créé avec succès" },
      { status: 201 }
    );
  } catch (error) {
    console.error("[POST /api/lots]", error);
    return NextResponse.json(
      { success: false, error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
