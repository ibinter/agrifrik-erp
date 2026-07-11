import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse> {
  try {
    const stats = {
      production: {
        caYTD: 145200000,
        caVariation: 18.4,
        tonnageTotal: 87.4,
        tonnageVariation: 12.1,
        surfaceTotale: 143,
        surfaceCertifiee: 89,
        tauxCertification: 62,
      },
      stocks: {
        valeurTotale: 52340000,
        articlesEnRupture: 3,
        articlesCritiques: 5,
        entrepots: 3,
      },
      finance: {
        tresorerie: 34200000,
        tresorerieVariation: -12.3,
        facturesEnAttente: 8,
        montantFacturesEnAttente: 28500000,
        chargesS1: 126600000,
        margeBrute: 42.8,
      },
      rh: {
        effectifTotal: 287,
        effectifCDI: 145,
        effectifCDD: 82,
        effectifSaisonniers: 60,
        masseSalariale: 42350000,
        absencesJour: 3,
      },
      alertes: {
        total: 8,
        critiques: 2,
        majeures: 3,
        informations: 3,
      },
      ia: {
        score: 84,
        recommandations: 5,
        derniereAnalyse: new Date().toISOString(),
      },
      meteo: {
        localisation: "Soubré, Côte d'Ivoire",
        temperature: 31,
        humidite: 78,
        conditions: "Partiellement nuageux",
        alerteActive: true,
        alerteMessage: "Orages prévus 12-13/07",
      },
    };

    return NextResponse.json({
      success: true,
      data: stats,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("[GET /api/stats/dashboard]", error);
    return NextResponse.json(
      { success: false, error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
