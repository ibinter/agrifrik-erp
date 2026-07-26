import { NextRequest, NextResponse } from "next/server";
import { verifySession, COOKIE_NAME } from "../../../../lib/session";

// Format de clé accepté : 4 groupes de 4 caractères alphanumériques séparés par des tirets
// Exemple : AGFR-X4T2-9KWQ-B17Z  ou  TEST-TEST-TEST-TEST (mode démo)
const KEY_REGEX = /^[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/i;

// Durée en jours selon la périodicité stockée dans la table activation_keys
const DEFAULT_DUREE_JOURS = 30;

export async function POST(req: NextRequest) {
  // --- Auth ---
  const token = req.cookies.get(COOKIE_NAME)?.value;
  const session = token ? await verifySession(token) : null;
  if (!session) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const rawKey: string = typeof body.key === "string" ? body.key.trim().toUpperCase() : "";

  // --- Validation de format ---
  if (!rawKey || !KEY_REGEX.test(rawKey)) {
    return NextResponse.json(
      { error: "Format de clé invalide. Format attendu : XXXX-XXXX-XXXX-XXXX (lettres et chiffres)" },
      { status: 400 }
    );
  }

  // --- Clé de démonstration (mode dev / Supabase non configuré) ---
  if (rawKey === "TEST-TEST-TEST-TEST") {
    const dateFin = new Date(Date.now() + DEFAULT_DUREE_JOURS * 24 * 60 * 60 * 1000).toISOString();
    return NextResponse.json({
      success: true,
      plan: "pro",
      dateFin,
      message: "Clé de démonstration activée ! Formule Pro active pour 30 jours.",
      demo: true,
    });
  }

  // --- Logique Supabase ---
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!supabaseUrl || supabaseUrl.includes("placeholder")) {
    // Supabase non configuré et clé non reconnue en mode démo
    return NextResponse.json(
      { error: "Clé non reconnue. En mode démo, utilisez TEST-TEST-TEST-TEST." },
      { status: 400 }
    );
  }

  try {
    const { createServerClient } = await import("../../../../lib/supabase/server");
    const sb = createServerClient() as any;

    // 1. Récupérer la clé
    const { data: keyData, error: fetchError } = await sb
      .from("activation_keys")
      .select("*")
      .eq("key", rawKey)
      .single();

    if (fetchError || !keyData) {
      return NextResponse.json({ error: "Clé non reconnue." }, { status: 400 });
    }

    // 2. Vérifier le statut
    if (keyData.statut === "utilisee") {
      return NextResponse.json({ error: "Cette clé a déjà été utilisée." }, { status: 400 });
    }
    if (keyData.statut === "revoquee") {
      return NextResponse.json({ error: "Cette clé a été révoquée." }, { status: 400 });
    }

    // 3. Vérifier l'expiration
    if (keyData.date_expiration && new Date(keyData.date_expiration) < new Date()) {
      return NextResponse.json({ error: "Cette clé a expiré." }, { status: 400 });
    }

    const dureeJours: number = keyData.duree_jours ?? DEFAULT_DUREE_JOURS;
    const dateFin = new Date(Date.now() + dureeJours * 24 * 60 * 60 * 1000).toISOString();
    const now = new Date().toISOString();

    // 4. Marquer la clé comme utilisée (idempotent via update conditionnel)
    const { error: updateError } = await sb
      .from("activation_keys")
      .update({
        statut: "utilisee",
        date_activation: now,
        societe_id: session.orgId,
      })
      .eq("key", rawKey)
      .eq("statut", "disponible"); // évite la double activation en cas de race condition

    if (updateError) {
      return NextResponse.json({ error: "Erreur lors de l'activation. Réessayez." }, { status: 500 });
    }

    // 5. Mettre à jour (ou créer) la licence de l'organisation
    const { data: existingLic } = await sb
      .from("licences")
      .select("id")
      .eq("organisation_id", session.orgId)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (existingLic?.id) {
      await sb
        .from("licences")
        .update({
          plan_code: keyData.plan_code,
          statut: "actif",
          date_debut: now,
          date_fin: dateFin,
          updated_at: now,
        })
        .eq("id", existingLic.id);
    } else {
      await sb.from("licences").insert({
        organisation_id: session.orgId,
        plan_code: keyData.plan_code,
        statut: "actif",
        date_debut: now,
        date_fin: dateFin,
        created_at: now,
        updated_at: now,
      });
    }

    return NextResponse.json({
      success: true,
      plan: keyData.plan_code,
      dateFin,
      message: "Clé activée avec succès !",
    });
  } catch {
    return NextResponse.json(
      { error: "Erreur serveur lors de la validation. Réessayez." },
      { status: 500 }
    );
  }
}
