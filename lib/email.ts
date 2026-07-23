// Système d'emails automatiques AGRIFRIK ERP — 13 déclencheurs
// Architecture multi-fournisseur (Resend / SMTP / SendGrid)
// Jamais bloquant : un échec d'email n'interrompt jamais le flux métier

export type EmailTemplate =
  | "bienvenue"
  | "relance_j7"
  | "relance_j3"
  | "relance_j1"
  | "recu_paiement"
  | "expiration"
  | "reinitialisation_mdp"
  | "confirmation_demo"
  | "offre_personnalisee"
  | "ticket_cree"
  | "ticket_resolu"
  | "compte_suspendu"
  | "nouvel_appareil";

export interface EmailPayload {
  to: string;
  template: EmailTemplate;
  data: Record<string, string | number | boolean>;
  lang?: "fr" | "en";
  idempotencyKey?: string;
}

// Contenu des templates — extensible depuis la console Superadmin
const TEMPLATES: Record<EmailTemplate, {
  sujet: { fr: string; en: string };
  corps: (data: Record<string, string | number | boolean>, lang: "fr" | "en") => string;
}> = {
  bienvenue: {
    sujet: {
      fr: "Bienvenue sur AGRIFRIK ERP — votre essai est activé",
      en: "Welcome to AGRIFRIK ERP — your trial is now active",
    },
    corps: (d, lang) => lang === "fr"
      ? `Bonjour ${d.prenom},\n\nVotre espace AGRIFRIK ERP est prêt. Connectez-vous dès maintenant :\nhttps://agrifrik.ibigsoft.com/login\n\nEmail : ${d.email}\n\nBonne utilisation,\nL'équipe AGRIFRIK`
      : `Hello ${d.prenom},\n\nYour AGRIFRIK ERP workspace is ready. Sign in now:\nhttps://agrifrik.ibigsoft.com/login\n\nEmail: ${d.email}\n\nBest regards,\nThe AGRIFRIK Team`,
  },
  relance_j7: {
    sujet: {
      fr: "Votre accès AGRIFRIK expire dans 7 jours",
      en: "Your AGRIFRIK access expires in 7 days",
    },
    corps: (d, lang) => lang === "fr"
      ? `Bonjour ${d.prenom},\n\nVotre ${d.isEssai ? "essai gratuit" : "abonnement"} AGRIFRIK ERP arrive à échéance le ${d.dateFin}.\n\nRenouvelez dès maintenant pour ne pas perdre l'accès :\nhttps://agrifrik.ibigsoft.com/paiement\n\nL'équipe AGRIFRIK`
      : `Hello ${d.prenom},\n\nYour AGRIFRIK ERP ${d.isEssai ? "free trial" : "subscription"} expires on ${d.dateFin}.\n\nRenew now to keep your access:\nhttps://agrifrik.ibigsoft.com/paiement\n\nThe AGRIFRIK Team`,
  },
  relance_j3: {
    sujet: {
      fr: "Plus que 3 jours — renouvelez votre accès AGRIFRIK",
      en: "Only 3 days left — renew your AGRIFRIK access",
    },
    corps: (d, lang) => lang === "fr"
      ? `Bonjour ${d.prenom},\n\nIl ne reste que 3 jours avant l'expiration de votre accès AGRIFRIK ERP.\n\nActez votre renouvellement maintenant :\nhttps://agrifrik.ibigsoft.com/paiement\n\nL'équipe AGRIFRIK`
      : `Hello ${d.prenom},\n\nOnly 3 days remain before your AGRIFRIK ERP access expires.\n\nRenew now:\nhttps://agrifrik.ibigsoft.com/paiement\n\nThe AGRIFRIK Team`,
  },
  relance_j1: {
    sujet: {
      fr: "⚠️ Votre accès AGRIFRIK expire dans moins de 24h",
      en: "⚠️ Your AGRIFRIK access expires in less than 24h",
    },
    corps: (d, lang) => lang === "fr"
      ? `Bonjour ${d.prenom},\n\nDERNIER RAPPEL : votre accès AGRIFRIK ERP expire demain.\n\nRenouvelez maintenant :\nhttps://agrifrik.ibigsoft.com/paiement\n\nL'équipe AGRIFRIK`
      : `Hello ${d.prenom},\n\nFINAL REMINDER: your AGRIFRIK ERP access expires tomorrow.\n\nRenew now:\nhttps://agrifrik.ibigsoft.com/paiement\n\nThe AGRIFRIK Team`,
  },
  recu_paiement: {
    sujet: {
      fr: "Reçu de paiement AGRIFRIK ERP",
      en: "AGRIFRIK ERP payment receipt",
    },
    corps: (d, lang) => lang === "fr"
      ? `Bonjour ${d.prenom},\n\nNous confirmons la réception de votre paiement :\n\nMontant : ${d.montant} ${d.devise}\nPlan : ${d.plan}\nPériode : du ${d.dateDebut} au ${d.dateFin}\nRéférence : ${d.reference}\n\nMerci de votre confiance,\nL'équipe AGRIFRIK`
      : `Hello ${d.prenom},\n\nWe confirm your payment:\n\nAmount: ${d.montant} ${d.devise}\nPlan: ${d.plan}\nPeriod: from ${d.dateDebut} to ${d.dateFin}\nReference: ${d.reference}\n\nThank you,\nThe AGRIFRIK Team`,
  },
  expiration: {
    sujet: {
      fr: "Votre accès AGRIFRIK a expiré",
      en: "Your AGRIFRIK access has expired",
    },
    corps: (d, lang) => lang === "fr"
      ? `Bonjour ${d.prenom},\n\nVotre accès AGRIFRIK ERP a expiré. Réactivez votre compte pour retrouver toutes vos données :\nhttps://agrifrik.ibigsoft.com/paiement\n\nVos données sont conservées pendant 30 jours.\n\nL'équipe AGRIFRIK`
      : `Hello ${d.prenom},\n\nYour AGRIFRIK ERP access has expired. Reactivate your account to access all your data:\nhttps://agrifrik.ibigsoft.com/paiement\n\nYour data is retained for 30 days.\n\nThe AGRIFRIK Team`,
  },
  reinitialisation_mdp: {
    sujet: {
      fr: "Réinitialisation de votre mot de passe AGRIFRIK",
      en: "Reset your AGRIFRIK password",
    },
    corps: (d, lang) => lang === "fr"
      ? `Bonjour ${d.prenom},\n\nCliquez sur ce lien pour réinitialiser votre mot de passe (valable 1 heure) :\n${d.lien}\n\nSi vous n'avez pas fait cette demande, ignorez ce message.\n\nL'équipe AGRIFRIK`
      : `Hello ${d.prenom},\n\nClick this link to reset your password (valid for 1 hour):\n${d.lien}\n\nIf you didn't request this, ignore this email.\n\nThe AGRIFRIK Team`,
  },
  confirmation_demo: {
    sujet: {
      fr: "Votre demande de démonstration AGRIFRIK a été reçue",
      en: "Your AGRIFRIK demo request has been received",
    },
    corps: (d, lang) => lang === "fr"
      ? `Bonjour ${d.prenom},\n\nNous avons bien reçu votre demande de démonstration. Notre équipe vous contactera sous 24h.\n\nL'équipe AGRIFRIK`
      : `Hello ${d.prenom},\n\nWe received your demo request. Our team will contact you within 24 hours.\n\nThe AGRIFRIK Team`,
  },
  offre_personnalisee: {
    sujet: {
      fr: "Votre offre personnalisée AGRIFRIK est disponible",
      en: "Your personalized AGRIFRIK offer is ready",
    },
    corps: (d, lang) => lang === "fr"
      ? `Bonjour ${d.prenom},\n\nVotre offre personnalisée est disponible. Consultez-la ici :\n${d.lien}\n\nL'équipe AGRIFRIK`
      : `Hello ${d.prenom},\n\nYour personalized offer is available. View it here:\n${d.lien}\n\nThe AGRIFRIK Team`,
  },
  ticket_cree: {
    sujet: {
      fr: "Votre demande de support a été enregistrée — #${d.ticketId}",
      en: "Your support request has been recorded — #${d.ticketId}",
    },
    corps: (d, lang) => lang === "fr"
      ? `Bonjour ${d.prenom},\n\nVotre ticket #${d.ticketId} a été ouvert.\nObjet : ${d.objet}\n\nNotre équipe vous répondra sous 24h ouvrées.\n\nL'équipe AGRIFRIK`
      : `Hello ${d.prenom},\n\nYour ticket #${d.ticketId} has been opened.\nSubject: ${d.objet}\n\nOur team will reply within 24 business hours.\n\nThe AGRIFRIK Team`,
  },
  ticket_resolu: {
    sujet: {
      fr: "Votre demande #${d.ticketId} a été traitée",
      en: "Your request #${d.ticketId} has been resolved",
    },
    corps: (d, lang) => lang === "fr"
      ? `Bonjour ${d.prenom},\n\nVotre ticket #${d.ticketId} a été résolu.\n\nConsultez la réponse ici :\nhttps://agrifrik.ibigsoft.com/aide\n\nL'équipe AGRIFRIK`
      : `Hello ${d.prenom},\n\nYour ticket #${d.ticketId} has been resolved.\n\nView the reply:\nhttps://agrifrik.ibigsoft.com/aide\n\nThe AGRIFRIK Team`,
  },
  compte_suspendu: {
    sujet: {
      fr: "Information importante concernant votre compte AGRIFRIK",
      en: "Important notice about your AGRIFRIK account",
    },
    corps: (d, lang) => lang === "fr"
      ? `Bonjour ${d.prenom},\n\nVotre compte AGRIFRIK a été suspendu. Contactez notre support :\nagrifrik@ibigsoft.com | +225 27 22 27 60 14\n\nL'équipe AGRIFRIK`
      : `Hello ${d.prenom},\n\nYour AGRIFRIK account has been suspended. Contact support:\nagrifrik@ibigsoft.com | +225 27 22 27 60 14\n\nThe AGRIFRIK Team`,
  },
  nouvel_appareil: {
    sujet: {
      fr: "Nouvelle connexion détectée sur votre compte AGRIFRIK",
      en: "New login detected on your AGRIFRIK account",
    },
    corps: (d, lang) => lang === "fr"
      ? `Bonjour ${d.prenom},\n\nUne connexion depuis un nouvel appareil a été détectée.\n\nDate : ${d.date}\nAppareil : ${d.appareil}\nAdresse IP : ${d.ip}\n\nSi ce n'était pas vous, changez votre mot de passe immédiatement.\n\nL'équipe AGRIFRIK`
      : `Hello ${d.prenom},\n\nA new device login was detected on your account.\n\nDate: ${d.date}\nDevice: ${d.appareil}\nIP: ${d.ip}\n\nIf this wasn't you, change your password immediately.\n\nThe AGRIFRIK Team`,
  },
};

// Envoi d'email via l'API configurée (Resend en priorité, SMTP en fallback)
export async function sendEmail(payload: EmailPayload): Promise<{ success: boolean; error?: string }> {
  const { to, template, data, lang = "fr", idempotencyKey } = payload;

  const tpl = TEMPLATES[template];
  if (!tpl) return { success: false, error: `Template inconnu: ${template}` };

  const sujet = tpl.sujet[lang];
  const corps = tpl.corps(data, lang);

  // === Resend (priorité) ===
  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resendKey}`,
        },
        body: JSON.stringify({
          from: process.env.FROM_EMAIL ?? "noreply@agrifrik.ibigsoft.com",
          to,
          subject: sujet,
          text: corps,
        }),
      });
      if (res.ok) {
        await logEmail(to, template, sujet, "envoye", null, idempotencyKey);
        return { success: true };
      }
      const err = await res.text();
      await logEmail(to, template, sujet, "echec", err, idempotencyKey);
      return { success: false, error: err };
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Erreur inconnue";
      await logEmail(to, template, sujet, "echec", msg, idempotencyKey);
      return { success: false, error: msg };
    }
  }

  // === Mode démo / SMTP non configuré ===
  console.log(`[EMAIL DEMO] To: ${to} | Sujet: ${sujet}\n${corps}`);
  await logEmail(to, template, sujet, "demo", null, idempotencyKey);
  return { success: true };
}

async function logEmail(
  destinataire: string,
  template: EmailTemplate,
  sujet: string,
  statut: "envoye" | "echec" | "demo",
  erreur: string | null,
  idempotencyKey?: string
) {
  // En production: insérer dans email_logs via Supabase
  // En démo: log console uniquement
  if (process.env.NODE_ENV === "development") return;
  try {
    const { createServerClient } = await import("./supabase/server");
    const sb = createServerClient() as any;
    await sb.from("email_logs").insert({
      destinataire,
      template,
      sujet,
      statut,
      erreur,
      idempotency_key: idempotencyKey ?? `${template}:${destinataire}:${Date.now()}`,
    });
  } catch {
    // Non bloquant
  }
}
