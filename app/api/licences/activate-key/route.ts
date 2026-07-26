import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { key } = await req.json();
  if (!key || typeof key !== "string" || key.trim().length < 8) {
    return NextResponse.json({ error: "Clé invalide." }, { status: 400 });
  }
  // In production: validate key against DB, check expiry, check usage, activate licence
  // For now: return a placeholder response
  return NextResponse.json({ error: "Clé non reconnue ou déjà utilisée." }, { status: 400 });
}
