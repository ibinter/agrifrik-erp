import { NextResponse } from "next/server";

type NotificationType = "alerte" | "info" | "succes" | "avertissement";

interface Notification {
  id: string;
  type: NotificationType;
  titre: string;
  message: string;
  lu: boolean;
  date: string;
  module?: string;
}

const mockNotifications: Notification[] = [
  {
    id: "notif-001",
    type: "alerte",
    titre: "Stock critique : Insecticide Pyréthrine",
    message: "Le stock d'Insecticide Pyréthrine est en dessous du seuil critique (42 L restants, seuil : 30 L).",
    lu: false,
    date: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    module: "stocks",
  },
  {
    id: "notif-002",
    type: "avertissement",
    titre: "Orages prévus 12-13 juillet",
    message: "Des orages sont prévus sur la zone de Soubré. Prenez les mesures nécessaires pour protéger les récoltes.",
    lu: false,
    date: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    module: "meteo",
  },
  {
    id: "notif-003",
    type: "alerte",
    titre: "Non-conformité critique — Lot LOT-2025-CAC-002",
    message: "Présence de corps étrangers détectée dans 3 sacs du lot LOT-2025-CAC-002. Action requise.",
    lu: false,
    date: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    module: "qualite",
  },
  {
    id: "notif-004",
    type: "info",
    titre: "Facture FAC-2025-0043 en retard",
    message: "La facture FAC-2025-0043 (SOCOLAIT Abidjan, 2 600 000 XOF) est en retard de paiement depuis le 27/06/2025.",
    lu: false,
    date: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    module: "finance",
  },
  {
    id: "notif-005",
    type: "succes",
    titre: "Commande livrée — SIPRA Industries",
    message: "La commande CMD-004 (10 000 kg de Maïs séché) a été livrée avec succès à SIPRA Industries.",
    lu: true,
    date: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    module: "commerce",
  },
  {
    id: "notif-006",
    type: "info",
    titre: "Nouveau lot créé — LOT-2025-CAC-003",
    message: "Un nouveau lot de Cacao fèves (1 800 kg, parcelle P-B3) est en cours de fermentation.",
    lu: true,
    date: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(),
    module: "qualite",
  },
  {
    id: "notif-007",
    type: "avertissement",
    titre: "Contrat CDD expirant bientôt",
    message: "Le contrat CDD de Dembélé Ladji expire dans moins de 30 jours. Pensez à le renouveler ou à le clôturer.",
    lu: false,
    date: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    module: "rh",
  },
  {
    id: "notif-008",
    type: "succes",
    titre: "Paiement reçu — NESTLE Côte d'Ivoire",
    message: "Le paiement de 12 600 000 XOF pour la facture FAC-2025-0042 a été reçu le 20/06/2025.",
    lu: true,
    date: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
    module: "finance",
  },
  {
    id: "notif-009",
    type: "info",
    titre: "Recommandation IA — Optimisation irrigation",
    message: "L'IA recommande d'augmenter la fréquence d'irrigation sur la parcelle P-D1 (Riz Nérica 4) compte tenu des températures élevées.",
    lu: true,
    date: new Date(Date.now() - 1000 * 60 * 60 * 96).toISOString(),
    module: "ia",
  },
  {
    id: "notif-010",
    type: "alerte",
    titre: "Trésorerie en baisse",
    message: "La trésorerie a diminué de 12,3% ce mois-ci. Consultez le tableau de bord financier pour plus de détails.",
    lu: false,
    date: new Date(Date.now() - 1000 * 60 * 60 * 120).toISOString(),
    module: "finance",
  },
];

export async function GET(request: Request): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const nonLues = searchParams.get("nonLues");
    const module_ = searchParams.get("module");

    let result = [...mockNotifications];

    if (nonLues === "true") {
      result = result.filter((n) => !n.lu);
    }

    if (module_) {
      result = result.filter((n) => n.module === module_);
    }

    return NextResponse.json({
      success: true,
      data: result,
      total: result.length,
      nonLues: result.filter((n) => !n.lu).length,
    });
  } catch (error) {
    console.error("[GET /api/notifications]", error);
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

    const { ids, toutMarquer } = body as { ids?: string[]; toutMarquer?: boolean };

    if (toutMarquer) {
      const count = mockNotifications.filter((n) => !n.lu).length;
      return NextResponse.json({
        success: true,
        message: `${count} notification(s) marquée(s) comme lue(s)`,
        count,
      });
    }

    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        { success: false, error: "Fournissez un tableau 'ids' ou 'toutMarquer: true'" },
        { status: 400 }
      );
    }

    const valides = ids.filter((id) => mockNotifications.some((n) => n.id === id));

    return NextResponse.json({
      success: true,
      message: `${valides.length} notification(s) marquée(s) comme lue(s)`,
      count: valides.length,
    });
  } catch (error) {
    console.error("[POST /api/notifications]", error);
    return NextResponse.json(
      { success: false, error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
