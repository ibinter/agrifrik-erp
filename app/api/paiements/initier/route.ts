import { NextRequest, NextResponse } from "next/server";
import { verifySession, COOKIE_NAME } from "../../../../lib/session";
import { sendEmail } from "../../../../lib/email";

export async function POST(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  const session = token ? await verifySession(token) : null;
  if (!session) return NextResponse.json({ error: "Non authentifié" }, { status: 401 });

  const body = await req.json();
  const { planCode, periodicite, methodCode } = body;

  if (!planCode || !periodicite || !methodCode) {
    return NextResponse.json({ error: "Paramètres manquants" }, { status: 400 });
  }

  const reference = `AGF-${Date.now()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;

  // Calculer le montant
  const { getPlanByCode, prixPour } = await import("../../../../lib/plans");
  const plan = getPlanByCode(planCode);
  if (!plan) return NextResponse.json({ error: "Plan inconnu" }, { status: 400 });
  const montant = prixPour(plan, periodicite);

  // Créer le paiement (Supabase ou mock)
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  let paiementId = `demo-pmt-${Date.now()}`;

  if (supabaseUrl && !supabaseUrl.includes("placeholder")) {
    try {
      const { createServerClient } = await import("../../../../lib/supabase/server");
      const sb = createServerClient() as any;
      const { data: pmt } = await sb.from("paiements").insert({
        organisation_id: session.orgId,
        montant,
        devise: "XOF",
        methode: methodCode,
        statut: "en_attente",
        reference,
        fournisseur: methodCode === "electronic" ? "CinetPay" : "Manuel",
        metadata: { planCode, periodicite },
      }).select("id").single();
      if (pmt) paiementId = pmt.id;
    } catch {/* demo */}
  }

  // Pour les paiements automatiques (démo) → simuler la confirmation
  if (methodCode === "voucher") {
    return NextResponse.json({ paiementId, reference, statut: "requiert_voucher", montant, plan });
  }

  // Paiements manuels → en attente de preuve
  const responseData = { paiementId, reference, statut: "en_attente", montant, plan, methodCode };

  // Email de confirmation de demande
  try {
    await sendEmail({
      to: session.email,
      template: "bienvenue",
      data: { prenom: session.prenom || session.email, email: session.email },
      idempotencyKey: `initier:${reference}`,
    });
  } catch {/* non bloquant */}

  return NextResponse.json(responseData);
}

