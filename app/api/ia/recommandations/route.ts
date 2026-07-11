import { NextResponse } from "next/server";

type TypeRecommandation = "urgent" | "attention" | "optimisation" | "info";

interface Recommandation {
  id: string;
  type: TypeRecommandation;
  titre: string;
  description: string;
  actionRecommandee: string;
  confiance: number;
  module: string;
  impact: "Élevé" | "Moyen" | "Faible";
  dateAnalyse: string;
}

const mockRecommandations: Recommandation[] = [
  {
    id: "reco-001",
    type: "urgent",
    titre: "Risque de perte de récolte — Parcelle P-C2",
    description:
      "Les données de terrain et météo indiquent un risque élevé de sur-maturation du Manioc TME 419 sur la parcelle P-C2 (progress : 90%). La récolte doit être planifiée dans les 5 prochains jours pour éviter des pertes.",
    actionRecommandee:
      "Planifier la récolte immédiate sur P-C2 et mobiliser l'équipe de Bouaké. Contacter Dembélé Ladji.",
    confiance: 91,
    module: "production",
    impact: "Élevé",
    dateAnalyse: new Date().toISOString(),
  },
  {
    id: "reco-002",
    type: "attention",
    titre: "Approvisionnement insecticide à prévoir",
    description:
      "Le stock d'Insecticide Pyréthrine (42 L) approche du seuil critique (30 L). Avec le pic saisonnier de pression parasitaire prévu en août, un délai d'approvisionnement de 2 semaines est à anticiper.",
    actionRecommandee:
      "Passer une commande de 150 L auprès de AGRO-CHIMIE CI avant le 20/07/2025. Budget estimé : 1 200 000 XOF.",
    confiance: 87,
    module: "stocks",
    impact: "Moyen",
    dateAnalyse: new Date().toISOString(),
  },
  {
    id: "reco-003",
    type: "optimisation",
    titre: "Optimisation de la tarification cacao export",
    description:
      "L'analyse des cours LME et des ventes récentes montre que le prix unitaire actuel de 4 200 XOF/kg (NESTLE) est inférieur de 3,5% au prix de marché. Une renégociation est possible lors du prochain contrat.",
    actionRecommandee:
      "Renégocier le contrat NESTLE à 4 350 XOF/kg lors du renouvellement de juillet. Contacter Aké Marie-Claire (Commercial Export).",
    confiance: 79,
    module: "commerce",
    impact: "Élevé",
    dateAnalyse: new Date().toISOString(),
  },
  {
    id: "reco-004",
    type: "optimisation",
    titre: "Augmenter la fréquence d'irrigation — P-D1",
    description:
      "Les relevés de température (31°C moy.) et d'humidité des sols sur la parcelle P-D1 (Riz Nérica 4) indiquent un déficit hydrique croissant. Une irrigation supplémentaire d'environ 25 mm/semaine est recommandée.",
    actionRecommandee:
      "Passer le cycle d'irrigation de P-D1 de 2 à 3 fois par semaine jusqu'à la fin juillet. Vérifier le pompage.",
    confiance: 83,
    module: "production",
    impact: "Moyen",
    dateAnalyse: new Date().toISOString(),
  },
  {
    id: "reco-005",
    type: "info",
    titre: "Opportunité de certification — Parcelle P-A1",
    description:
      "La parcelle P-A1 (Maïs Hybride DK8031, 45 ha) remplit les critères agronomiques pour obtenir la certification GlobalG.A.P. Une certification augmenterait le prix de vente potentiel de 8 à 12%.",
    actionRecommandee:
      "Engager le processus de certification GlobalG.A.P. pour P-A1. Contacter Traoré Aminata pour planifier l'audit.",
    confiance: 72,
    module: "qualite",
    impact: "Moyen",
    dateAnalyse: new Date().toISOString(),
  },
];

export async function GET(request: Request): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type") as TypeRecommandation | null;
    const module_ = searchParams.get("module");
    const confianceMin = Number(searchParams.get("confianceMin") ?? 0);

    let result = [...mockRecommandations];

    if (type) {
      result = result.filter((r) => r.type === type);
    }

    if (module_) {
      result = result.filter((r) => r.module === module_);
    }

    if (confianceMin > 0) {
      result = result.filter((r) => r.confiance >= confianceMin);
    }

    result.sort((a, b) => {
      const ordre: Record<TypeRecommandation, number> = {
        urgent: 0,
        attention: 1,
        optimisation: 2,
        info: 3,
      };
      return ordre[a.type] - ordre[b.type];
    });

    const scoreGlobal = Math.round(
      result.reduce((sum, r) => sum + r.confiance, 0) / (result.length || 1)
    );

    return NextResponse.json({
      success: true,
      data: result,
      total: result.length,
      scoreGlobal,
      derniereAnalyse: new Date().toISOString(),
    });
  } catch (error) {
    console.error("[GET /api/ia/recommandations]", error);
    return NextResponse.json(
      { success: false, error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
