// Moteur de licences AGRIFRIK ERP
import type { PlanCode } from "./plans";

export type LicenceStatut = "essai" | "actif" | "grace" | "expire" | "suspendu" | "annule";

export interface Licence {
  id: string;
  orgId: string;
  planCode: PlanCode;
  statut: LicenceStatut;
  dateDebut: string;   // ISO
  dateFin: string;     // ISO
  essai: boolean;
  modeLectureSeule: boolean;
  joursRestants: number;
  enGrace: boolean;
}

const DUREE_GRACE_JOURS = 7;

// Licence démo (utilisée quand Supabase n'est pas configuré)
export const DEMO_LICENCE: Licence = {
  id: "demo-licence-001",
  orgId: "demo-org-001",
  planCode: "pro",
  statut: "actif",
  dateDebut: new Date(Date.now() - 30 * 86400000).toISOString(),
  dateFin: new Date(Date.now() + 335 * 86400000).toISOString(),
  essai: false,
  modeLectureSeule: false,
  joursRestants: 335,
  enGrace: false,
};

export function computeLicenceStatut(dateFin: string, statutBase: LicenceStatut): {
  statut: LicenceStatut;
  joursRestants: number;
  enGrace: boolean;
} {
  const now = Date.now();
  const fin = new Date(dateFin).getTime();
  const joursRestants = Math.ceil((fin - now) / 86400000);

  if (statutBase === "suspendu" || statutBase === "annule") {
    return { statut: statutBase, joursRestants: 0, enGrace: false };
  }

  if (joursRestants > 0) {
    return { statut: statutBase === "essai" ? "essai" : "actif", joursRestants, enGrace: false };
  }

  const joursDepuisExpiration = Math.abs(joursRestants);
  if (joursDepuisExpiration <= DUREE_GRACE_JOURS) {
    return { statut: "grace", joursRestants: 0, enGrace: true };
  }

  return { statut: "expire", joursRestants: 0, enGrace: false };
}

export function licenceEstActive(licence: Licence): boolean {
  return ["actif", "essai", "grace"].includes(licence.statut);
}

export function licenceMessage(licence: Licence, lang: "fr" | "en" = "fr"): string | null {
  if (licence.statut === "expire") {
    return lang === "fr"
      ? "Votre licence a expiré. Renouvelez pour continuer."
      : "Your license has expired. Please renew to continue.";
  }
  if (licence.statut === "grace") {
    return lang === "fr"
      ? `Votre licence a expiré. Vous bénéficiez d'une période de grâce de ${DUREE_GRACE_JOURS} jours.`
      : `Your license has expired. You have a ${DUREE_GRACE_JOURS}-day grace period.`;
  }
  if (licence.statut === "essai" && licence.joursRestants <= 7) {
    return lang === "fr"
      ? `Votre essai se termine dans ${licence.joursRestants} jour(s).`
      : `Your trial ends in ${licence.joursRestants} day(s).`;
  }
  if (licence.statut === "actif" && licence.joursRestants <= 7) {
    return lang === "fr"
      ? `Votre licence expire dans ${licence.joursRestants} jour(s). Renouvelez dès maintenant.`
      : `Your license expires in ${licence.joursRestants} day(s). Renew now.`;
  }
  return null;
}
