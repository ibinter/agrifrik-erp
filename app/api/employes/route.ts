import { NextResponse } from "next/server";
import { employes } from "@/lib/data";
import type { Employe } from "@/lib/types";

export async function GET(request: Request): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search")?.toLowerCase() ?? "";
    const actif = searchParams.get("actif");
    const typeContrat = searchParams.get("typeContrat");

    let result: Employe[] = [...employes];

    if (search) {
      result = result.filter(
        (e) =>
          e.nom.toLowerCase().includes(search) ||
          e.prenom.toLowerCase().includes(search) ||
          e.poste.toLowerCase().includes(search)
      );
    }

    if (actif !== null) {
      result = result.filter((e) => e.actif === (actif === "true"));
    }

    if (typeContrat) {
      result = result.filter((e) => e.typeContrat === typeContrat);
    }

    return NextResponse.json({
      success: true,
      data: result,
      total: result.length,
    });
  } catch (error) {
    console.error("[GET /api/employes]", error);
    return NextResponse.json(
      { success: false, error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const body: unknown = await request.json();

    if (
      typeof body !== "object" ||
      body === null
    ) {
      return NextResponse.json(
        { success: false, error: "Corps de requête invalide" },
        { status: 400 }
      );
    }

    const {
      nom,
      prenom,
      poste,
      typeContrat,
      salaireBase,
      dateEmbauche,
    } = body as Record<string, unknown>;

    if (!nom || !prenom || !poste || !typeContrat || !salaireBase || !dateEmbauche) {
      return NextResponse.json(
        { success: false, error: "Champs requis manquants : nom, prenom, poste, typeContrat, salaireBase, dateEmbauche" },
        { status: 400 }
      );
    }

    const newEmploye: Employe = {
      id: `EMP-${Date.now()}`,
      nom: String(nom),
      prenom: String(prenom),
      poste: String(poste),
      typeContrat: typeContrat as Employe["typeContrat"],
      salaireBase: Number(salaireBase),
      dateEmbauche: String(dateEmbauche),
      actif: true,
      ...(body as Partial<Employe>),
    };

    return NextResponse.json(
      { success: true, data: newEmploye, message: "Employé créé avec succès" },
      { status: 201 }
    );
  } catch (error) {
    console.error("[POST /api/employes]", error);
    return NextResponse.json(
      { success: false, error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
