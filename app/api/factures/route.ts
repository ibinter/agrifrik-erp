import { NextResponse } from "next/server";
import type { Facture } from "@/lib/types";

const mockFactures: Facture[] = [
  {
    id: "fac-001",
    numero: "FAC-2025-0042",
    client: "NESTLE Côte d'Ivoire",
    montantHT: 10677966,
    tva: 18,
    montantTTC: 12600000,
    statut: "Payée",
    dateEmission: "2025-05-30",
    dateEcheance: "2025-06-29",
    datePaiement: "2025-06-20",
    commandeId: "cmd-002",
  },
  {
    id: "fac-002",
    numero: "FAC-2025-0043",
    client: "SOCOLAIT Abidjan",
    montantHT: 2203390,
    tva: 18,
    montantTTC: 2600000,
    statut: "En retard",
    dateEmission: "2025-05-28",
    dateEcheance: "2025-06-27",
    commandeId: "cmd-001",
  },
  {
    id: "fac-003",
    numero: "FAC-2025-0044",
    client: "Export Barry Callebaut",
    montantHT: 29491525,
    tva: 18,
    montantTTC: 34800000,
    statut: "Envoyée",
    dateEmission: "2025-06-01",
    dateEcheance: "2025-07-01",
    commandeId: "cmd-005",
  },
  {
    id: "fac-004",
    numero: "FAC-2025-0041",
    client: "SIPRA Industries",
    montantHT: 4322034,
    tva: 18,
    montantTTC: 5100000,
    statut: "Payée",
    dateEmission: "2025-05-10",
    dateEcheance: "2025-06-09",
    datePaiement: "2025-05-30",
    commandeId: "cmd-004",
  },
  {
    id: "fac-005",
    numero: "FAC-2025-0040",
    client: "Groupe CDCI",
    montantHT: 1016949,
    tva: 18,
    montantTTC: 1200000,
    statut: "Brouillon",
    dateEmission: "2025-06-02",
    dateEcheance: "2025-07-02",
    commandeId: "cmd-003",
  },
  {
    id: "fac-006",
    numero: "FAC-2025-0039",
    client: "SOCOLAIT Abidjan",
    montantHT: 847458,
    tva: 18,
    montantTTC: 1000000,
    statut: "Annulée",
    dateEmission: "2025-04-15",
    dateEcheance: "2025-05-15",
  },
];

export async function GET(request: Request): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const statut = searchParams.get("statut");
    const client = searchParams.get("client")?.toLowerCase() ?? "";
    const dateDebut = searchParams.get("dateDebut");
    const dateFin = searchParams.get("dateFin");

    let result: Facture[] = [...mockFactures];

    if (statut) {
      result = result.filter((f) => f.statut === statut);
    }

    if (client) {
      result = result.filter((f) =>
        f.client.toLowerCase().includes(client)
      );
    }

    if (dateDebut) {
      result = result.filter((f) => f.dateEmission >= dateDebut);
    }

    if (dateFin) {
      result = result.filter((f) => f.dateEmission <= dateFin);
    }

    const totalTTC = result.reduce((sum, f) => sum + f.montantTTC, 0);

    return NextResponse.json({
      success: true,
      data: result,
      total: result.length,
      totalTTC,
    });
  } catch (error) {
    console.error("[GET /api/factures]", error);
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

    const { client, montantHT, tva, dateEmission, dateEcheance } =
      body as Record<string, unknown>;

    if (!client || !montantHT || tva === undefined || !dateEmission || !dateEcheance) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Champs requis manquants : client, montantHT, tva, dateEmission, dateEcheance",
        },
        { status: 400 }
      );
    }

    const ht = Number(montantHT);
    const tauxTVA = Number(tva);
    const ttc = Math.round(ht * (1 + tauxTVA / 100));
    const num = `FAC-${new Date().getFullYear()}-${String(Date.now()).slice(-4)}`;

    const newFacture: Facture = {
      statut: "Brouillon",
      ...(body as Partial<Facture>),
      id: `fac-${Date.now()}`,
      numero: num,
      client: String(client),
      montantHT: ht,
      tva: tauxTVA,
      montantTTC: ttc,
      dateEmission: String(dateEmission),
      dateEcheance: String(dateEcheance),
    };

    return NextResponse.json(
      { success: true, data: newFacture, message: "Facture créée avec succès" },
      { status: 201 }
    );
  } catch (error) {
    console.error("[POST /api/factures]", error);
    return NextResponse.json(
      { success: false, error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
