import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { plan, periode, methode, reference } = body as {
      plan?: string;
      periode?: string;
      methode?: string;
      reference?: string;
    };

    if (!plan || !methode || !reference) {
      return NextResponse.json(
        { success: false, error: "Champs manquants : plan, methode et reference sont requis." },
        { status: 400 }
      );
    }

    // En production : enregistrement en base + notification équipe
    // Ici : réponse mock de validation en attente
    return NextResponse.json(
      {
        success: true,
        message: "Paiement enregistré, en attente de validation",
        data: { plan, periode, methode, reference },
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { success: false, error: "Erreur interne du serveur." },
      { status: 500 }
    );
  }
}
