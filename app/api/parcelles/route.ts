import { NextResponse } from "next/server";
import { mockParcelles } from "@/lib/data";
import type { Parcelle } from "@/lib/types";

export async function GET(request: Request): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const culture = searchParams.get("culture")?.toLowerCase() ?? "";
    const statut = searchParams.get("statut");
    const certifiee = searchParams.get("certifiee");

    let result: Parcelle[] = [...mockParcelles];

    if (culture) {
      result = result.filter((p) =>
        p.culture.toLowerCase().includes(culture)
      );
    }

    if (statut) {
      result = result.filter((p) => p.statut === statut);
    }

    if (certifiee !== null) {
      result = result.filter((p) => p.certifiee === (certifiee === "true"));
    }

    const surfaceTotale = result.reduce((sum, p) => sum + p.surface, 0);
    const surfaceCertifiee = result
      .filter((p) => p.certifiee)
      .reduce((sum, p) => sum + p.surface, 0);

    return NextResponse.json({
      success: true,
      data: result,
      total: result.length,
      surfaceTotale,
      surfaceCertifiee,
    });
  } catch (error) {
    console.error("[GET /api/parcelles]", error);
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

    const { code, localite, culture, surface, sol, propriete } =
      body as Record<string, unknown>;

    if (!code || !localite || !culture || !surface || !sol || !propriete) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Champs requis manquants : code, localite, culture, surface, sol, propriete",
        },
        { status: 400 }
      );
    }

    const newParcelle: Parcelle = {
      id: `par-${Date.now()}`,
      code: String(code),
      localite: String(localite),
      culture: String(culture),
      surface: Number(surface),
      sol: String(sol),
      propriete: propriete as Parcelle["propriete"],
      statut: "Vide",
      certifiee: false,
      ...(body as Partial<Parcelle>),
    };

    return NextResponse.json(
      { success: true, data: newParcelle, message: "Parcelle créée avec succès" },
      { status: 201 }
    );
  } catch (error) {
    console.error("[POST /api/parcelles]", error);
    return NextResponse.json(
      { success: false, error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
