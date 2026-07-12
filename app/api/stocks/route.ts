import { NextResponse } from "next/server";
import { stocks } from "@/lib/data";
import type { StockItem, MouvementStock } from "@/lib/types";

export async function GET(): Promise<NextResponse<StockItem[]>> {
  return NextResponse.json(stocks);
}

export async function POST(
  request: Request
): Promise<NextResponse<{ success: boolean; mouvement: MouvementStock } | { success: boolean; message: string }>> {
  const body: Omit<MouvementStock, "id"> = await request.json();

  if (!body.stockId || !body.type || !body.quantite || body.quantite <= 0) {
    return NextResponse.json(
      { success: false, message: "Champs obligatoires manquants ou invalides : stockId, type, quantite" },
      { status: 400 }
    );
  }

  const typesValides: MouvementStock["type"][] = ["Entrée", "Sortie", "Transfert"];
  if (!typesValides.includes(body.type)) {
    return NextResponse.json(
      { success: false, message: `Type de mouvement invalide. Valeurs acceptées : ${typesValides.join(", ")}` },
      { status: 400 }
    );
  }

  const mouvement: MouvementStock = {
    id: `mvt-${Date.now()}`,
    stockId: body.stockId,
    type: body.type,
    quantite: body.quantite,
    entrepotSource: body.entrepotSource,
    entrepotDestination: body.entrepotDestination,
    dateMouvement: body.dateMouvement ?? new Date().toISOString().split("T")[0],
    operateur: body.operateur ?? "Système",
    motif: body.motif,
  };

  // En production, persister en base de données et mettre à jour le stock
  return NextResponse.json({ success: true, mouvement }, { status: 201 });
}
