const BRAND = {
  logo: "AGRIFRIK",
  color: "#2E7D32",
  orange: "#E65100",
  support: "support@agrifrik.com",
  site: "https://agrifrik.ibigsoft.com",
};

type EmailData = {
  prenomNom: string;
  societe: string;
  planNom?: string;
  montant?: string;
  dateFin?: string;
  joursRestants?: number;
  isTrial?: boolean;
  ctaUrl?: string;
  referenceErreur?: string;
};

function baseLayout(title: string, body: string, cta: { label: string; url: string }) {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><title>${title}</title></head>
  <body style="font-family:sans-serif;background:#f5f5f5;padding:20px;">
  <div style="max-width:600px;margin:0 auto;background:white;border-radius:12px;overflow:hidden;">
    <div style="background:${BRAND.color};padding:24px;text-align:center;">
      <h1 style="color:white;margin:0;font-size:24px;">${BRAND.logo}</h1>
    </div>
    <div style="padding:32px;">
      ${body}
      <div style="text-align:center;margin-top:32px;">
        <a href="${cta.url}" style="background:${BRAND.color};color:white;padding:14px 28px;border-radius:8px;text-decoration:none;font-weight:bold;">${cta.label}</a>
      </div>
    </div>
    <div style="background:#f5f5f5;padding:16px;text-align:center;font-size:12px;color:#666;">
      <p>AGRIFRIK — ERP Agricole Africain | <a href="${BRAND.site}">${BRAND.site}</a></p>
      <p>Support: <a href="mailto:${BRAND.support}">${BRAND.support}</a></p>
    </div>
  </div></body></html>`;
}

export const emailTemplates = {
  bienvenue: (d: EmailData) => ({
    subject: "Bienvenue — votre essai gratuit AGRIFRIK est activé",
    html: baseLayout("Bienvenue sur AGRIFRIK", `
      <h2>Bonjour ${d.prenomNom},</h2>
      <p>Bienvenue sur <strong>AGRIFRIK</strong> ! Votre essai gratuit de 14 jours pour <strong>${d.societe}</strong> est maintenant activé.</p>
      <p>Vous avez accès à tous les modules : cultures, élevage, stocks, comptabilité, RH, et bien plus.</p>
      <p><strong>Votre essai expire le : ${d.dateFin}</strong></p>
    `, { label: "Ouvrir mon espace", url: d.ctaUrl ?? BRAND.site }),
  }),

  relanceJ7: (d: EmailData) => ({
    subject: `Votre ${d.isTrial ? "essai" : "abonnement"} AGRIFRIK arrive à échéance dans 7 jours`,
    html: baseLayout("7 jours restants", `
      <h2>Bonjour ${d.prenomNom},</h2>
      <p>Votre ${d.isTrial ? "essai gratuit" : "abonnement"} <strong>${d.planNom}</strong> pour <strong>${d.societe}</strong> expire dans <strong>7 jours</strong> (${d.dateFin}).</p>
      <p>Renouvelez maintenant pour continuer à gérer votre exploitation sans interruption.</p>
    `, { label: d.isTrial ? "Activer mon abonnement" : "Renouveler", url: d.ctaUrl ?? `${BRAND.site}/parametres/abonnement` }),
  }),

  relanceJ3: (d: EmailData) => ({
    subject: `Plus que 3 jours — renouvelez votre accès AGRIFRIK`,
    html: baseLayout("3 jours restants", `
      <h2>Bonjour ${d.prenomNom},</h2>
      <p>Il ne reste plus que <strong>3 jours</strong> avant l'expiration de votre accès AGRIFRIK pour <strong>${d.societe}</strong>.</p>
      <p>Ne perdez pas l'accès à vos données agricoles. Renouvelez maintenant.</p>
    `, { label: "Renouveler maintenant", url: d.ctaUrl ?? `${BRAND.site}/parametres/abonnement` }),
  }),

  relanceJ1: (d: EmailData) => ({
    subject: "⚠️ Votre accès AGRIFRIK expire dans moins de 24 heures",
    html: baseLayout("Moins de 24h restantes", `
      <h2>Bonjour ${d.prenomNom},</h2>
      <p><strong>Attention</strong> — votre accès à AGRIFRIK pour <strong>${d.societe}</strong> expire dans moins de 24 heures.</p>
      <p>Agissez maintenant pour éviter toute interruption de service.</p>
    `, { label: "Renouveler immédiatement", url: d.ctaUrl ?? `${BRAND.site}/paiement` }),
  }),

  paiementReussi: (d: EmailData) => ({
    subject: `Reçu de paiement — abonnement ${d.planNom} AGRIFRIK`,
    html: baseLayout("Reçu de paiement", `
      <h2>Bonjour ${d.prenomNom},</h2>
      <p>Votre paiement a bien été reçu. Merci !</p>
      <table style="width:100%;border-collapse:collapse;margin:16px 0;">
        <tr><td style="padding:8px;border-bottom:1px solid #eee;color:#666;">Société</td><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">${d.societe}</td></tr>
        <tr><td style="padding:8px;border-bottom:1px solid #eee;color:#666;">Formule</td><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">${d.planNom}</td></tr>
        <tr><td style="padding:8px;border-bottom:1px solid #eee;color:#666;">Montant</td><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">${d.montant}</td></tr>
        <tr><td style="padding:8px;color:#666;">Accès jusqu'au</td><td style="padding:8px;font-weight:bold;">${d.dateFin}</td></tr>
      </table>
    `, { label: "Accéder à mon espace", url: d.ctaUrl ?? BRAND.site }),
  }),

  expiration: (d: EmailData) => ({
    subject: `Votre ${d.isTrial ? "essai" : "abonnement"} AGRIFRIK a expiré`,
    html: baseLayout("Accès expiré", `
      <h2>Bonjour ${d.prenomNom},</h2>
      <p>Votre ${d.isTrial ? "essai gratuit" : "abonnement"} pour <strong>${d.societe}</strong> a expiré le ${d.dateFin}.</p>
      <p>Réactivez votre compte pour reprendre l'accès à toutes vos données.</p>
    `, { label: "Réactiver mon accès", url: d.ctaUrl ?? `${BRAND.site}/paiement` }),
  }),

  motDePasseOublie: (d: EmailData & { resetUrl: string }) => ({
    subject: "Réinitialisation de votre mot de passe AGRIFRIK",
    html: baseLayout("Réinitialisation", `
      <h2>Bonjour ${d.prenomNom},</h2>
      <p>Vous avez demandé la réinitialisation de votre mot de passe. Cliquez sur le bouton ci-dessous (lien valable 1 heure) :</p>
    `, { label: "Réinitialiser mon mot de passe", url: d.resetUrl }),
  }),

  demandeDemo: (d: EmailData) => ({
    subject: "Votre demande de démonstration AGRIFRIK a été reçue",
    html: baseLayout("Demande de démo reçue", `
      <h2>Bonjour ${d.prenomNom},</h2>
      <p>Nous avons bien reçu votre demande de démonstration pour <strong>${d.societe}</strong>.</p>
      <p>Notre équipe vous contactera dans les <strong>24 à 48 heures</strong> pour planifier votre session.</p>
    `, { label: "En attendant, explorez AGRIFRIK", url: BRAND.site }),
  }),

  offrePersonnalisee: (d: EmailData) => ({
    subject: "Votre offre personnalisée AGRIFRIK est disponible",
    html: baseLayout("Offre personnalisée", `
      <h2>Bonjour ${d.prenomNom},</h2>
      <p>Votre offre personnalisée pour <strong>${d.societe}</strong> est prête. Consultez-la dès maintenant.</p>
    `, { label: "Voir mon offre", url: d.ctaUrl ?? BRAND.site }),
  }),

  ticketCree: (d: EmailData & { ticketRef: string }) => ({
    subject: `Votre demande de support AGRIFRIK a été enregistrée`,
    html: baseLayout("Demande enregistrée", `
      <h2>Bonjour ${d.prenomNom},</h2>
      <p>Votre demande de support a bien été enregistrée. Référence : <strong>${d.ticketRef}</strong></p>
      <p>Notre équipe vous répondra dans les meilleurs délais.</p>
    `, { label: "Suivre ma demande", url: d.ctaUrl ?? `${BRAND.site}/aide` }),
  }),

  ticketResolu: (d: EmailData & { ticketRef: string }) => ({
    subject: "Votre demande de support AGRIFRIK a été traitée",
    html: baseLayout("Demande traitée", `
      <h2>Bonjour ${d.prenomNom},</h2>
      <p>Bonne nouvelle ! Votre demande de support (<strong>${d.ticketRef}</strong>) a été traitée.</p>
    `, { label: "Consulter la réponse", url: d.ctaUrl ?? `${BRAND.site}/aide` }),
  }),

  compteSuspendu: (d: EmailData) => ({
    subject: "Information importante concernant votre compte AGRIFRIK",
    html: baseLayout("Compte suspendu", `
      <h2>Bonjour ${d.prenomNom},</h2>
      <p>Votre compte AGRIFRIK pour <strong>${d.societe}</strong> a été temporairement suspendu.</p>
      <p>Contactez notre support pour plus d'informations.</p>
    `, { label: "Contacter le support", url: `mailto:${BRAND.support}` }),
  }),

  connexionSuspecte: (d: EmailData & { ip: string; appareil: string; date: string }) => ({
    subject: "Nouvelle connexion détectée sur votre compte AGRIFRIK",
    html: baseLayout("Connexion détectée", `
      <h2>Bonjour ${d.prenomNom},</h2>
      <p>Une nouvelle connexion a été détectée sur votre compte AGRIFRIK.</p>
      <table style="width:100%;border-collapse:collapse;margin:16px 0;">
        <tr><td style="padding:8px;color:#666;">Date</td><td style="padding:8px;">${d.date}</td></tr>
        <tr><td style="padding:8px;color:#666;">Adresse IP</td><td style="padding:8px;">${d.ip}</td></tr>
        <tr><td style="padding:8px;color:#666;">Appareil</td><td style="padding:8px;">${d.appareil}</td></tr>
      </table>
      <p>Si ce n'est pas vous, changez votre mot de passe immédiatement.</p>
    `, { label: "Sécuriser mon compte", url: `${BRAND.site}/parametres/securite` }),
  }),
};
