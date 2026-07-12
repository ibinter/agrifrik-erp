import { NextResponse } from "next/server";
import { commandes } from "@/lib/data";
import type { Commande } from "@/lib/types";

export async function GET(): Promise<NextResponse<Commande[]>> {
  const sorted = [...commandes].sort(
    (a, b) => new Date(b.dateCommande).getTime() - new Date(a.dateCommande).getTime()
  );
  return NextResponse.json(sorted);
}

export async function POST(
  request: Request
): Promise<NextResponse<{ success: boolean; id: string; total: number } | { success: boolean; message: string }>> {
  const body: Omit<Commande, "id" | "total"> = await request.json();

  if (!body.partenaire || !body.produit || !body.quantite || !body.prixUnitaire) {
    return NextResponse.json(
      { success: false, message: "Champs obligatoires manquants : partenaire, produit, quantite, prixUnitaire" },
      { status: 400 }
    );
  }

  if (body.quantite <= 0 || body.prixUnitaire <= 0) {
    return NextResponse.json(
      { success: false, message: "La quantité et le prix unitaire doivent être positifs" },
      { status: 400 }
    );
  }

  const total = body.quantite * body.prixUnitaire;
  const newId = `cmd-${String(commandes.length + 1).padStart(3, "0")}`;

  // En production, persister en base de données
  return NextResponse.json({ success: true, id: newId, total }, { status: 201 });
}
