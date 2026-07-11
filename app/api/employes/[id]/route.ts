import { NextResponse } from "next/server";
import { employes } from "@/lib/data";
import type { Employe } from "@/lib/types";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(
  _request: Request,
  context: RouteContext
): Promise<NextResponse> {
  try {
    const { id } = await context.params;
    const employe = employes.find((e) => e.id === id);

    if (!employe) {
      return NextResponse.json(
        { success: false, error: `Employé introuvable : ${id}` },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: employe });
  } catch (error) {
    console.error("[GET /api/employes/[id]]", error);
    return NextResponse.json(
      { success: false, error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  context: RouteContext
): Promise<NextResponse> {
  try {
    const { id } = await context.params;
    const existing = employes.find((e) => e.id === id);

    if (!existing) {
      return NextResponse.json(
        { success: false, error: `Employé introuvable : ${id}` },
        { status: 404 }
      );
    }

    const body: unknown = await request.json();

    if (typeof body !== "object" || body === null) {
      return NextResponse.json(
        { success: false, error: "Corps de requête invalide" },
        { status: 400 }
      );
    }

    const updated: Employe = {
      ...existing,
      ...(body as Partial<Employe>),
      id,
    };

    return NextResponse.json({
      success: true,
      data: updated,
      message: "Employé mis à jour avec succès",
    });
  } catch (error) {
    console.error("[PUT /api/employes/[id]]", error);
    return NextResponse.json(
      { success: false, error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  context: RouteContext
): Promise<NextResponse> {
  try {
    const { id } = await context.params;
    const existing = employes.find((e) => e.id === id);

    if (!existing) {
      return NextResponse.json(
        { success: false, error: `Employé introuvable : ${id}` },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Employé ${id} supprimé avec succès`,
    });
  } catch (error) {
    console.error("[DELETE /api/employes/[id]]", error);
    return NextResponse.json(
      { success: false, error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
