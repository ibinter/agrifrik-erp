import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);

  if (!body) {
    return NextResponse.json({ error: "Corps de requête invalide" }, { status: 400 });
  }

  const { email, password, nom, prenom, societe, filiere, surface, pays, ville, telephone } = body as {
    email?: string;
    password?: string;
    nom?: string;
    prenom?: string;
    societe?: string;
    filiere?: string;
    surface?: string;
    pays?: string;
    ville?: string;
    telephone?: string;
  };

  // Validation
  if (!email || !password || !nom || !societe) {
    return NextResponse.json({ error: "Champs obligatoires manquants" }, { status: 400 });
  }
  if (password.length < 8) {
    return NextResponse.json(
      { error: "Le mot de passe doit faire au moins 8 caractères" },
      { status: 400 }
    );
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: "Adresse email invalide" }, { status: 400 });
  }

  // TODO Supabase (production) :
  // 1. const { data: authData, error: authError } = await supabase.auth.signUp({ email, password })
  // 2. Créer l'organisation dans la table `organisations` :
  //    await supabase.from("organisations").insert({ nom: societe, filiere, surface, pays, ville, telephone, owner_id: authData.user.id })
  // 3. Créer la licence d'essai 14 jours via la fonction SQL :
  //    await supabase.rpc("create_trial_licence", { p_organisation_id: orgId })
  // 4. Créer le profil utilisateur dans `profiles` :
  //    await supabase.from("profiles").insert({ id: authData.user.id, prenom, nom, email, role: "admin" })
  // 5. Envoyer email de bienvenue (via /api/emails/send si disponible)

  // Mode dev — retour succès sans Supabase
  const trialEnd = new Date();
  trialEnd.setDate(trialEnd.getDate() + 14);

  return NextResponse.json({
    success: true,
    message: "Compte créé avec succès ! Votre essai gratuit de 14 jours est activé.",
    redirect: "/onboarding",
    trial: {
      plan: "starter",
      statut: "essai",
      date_fin: trialEnd.toISOString(),
      jours_restants: 14,
    },
    user: {
      email,
      prenom: prenom ?? "",
      nom,
      societe,
      filiere: filiere ?? "",
      surface: surface ?? "",
      pays: pays ?? "Côte d'Ivoire",
      ville: ville ?? "",
      telephone: telephone ?? "",
    },
  });
}
