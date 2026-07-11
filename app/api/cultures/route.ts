import { NextResponse } from "next/server";
import { cultures } from "@/lib/data";
import type { Culture } from "@/lib/types";

export async function GET(): Promise<NextResponse<Culture[]>> {
  return NextResponse.json(cultures);
}

export async function POST(request: Request): Promise<NextResponse<{ success: boolean; id: string } | { success: boolean; message: string }>> {
  const body: Omit<Culture, "id"> = await request.json();

  if (!body.nom || !body.parcelle || !body.surface) {
    return NextResponse.json(
      { success: false, message: "Champs obligatoires manquants : nom, parcelle, surface" },
      { status: 400 }
    );
  }

  const newId = `cul-${String(cultures.length + 1).padStart(3, "0")}`;

  // En production, persister en base de données
  return NextResponse.json({ success: true, id: newId }, { status: 201 });
}
