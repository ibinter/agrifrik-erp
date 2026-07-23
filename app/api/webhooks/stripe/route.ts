// Webhook Stripe — validation automatique
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "../../../../lib/email";

const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET ?? "";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature") ?? "";

  // Vérification de signature Stripe (HMAC-SHA256 via timing-safe compare)
  if (STRIPE_WEBHOOK_SECRET && sig) {
    try {
      const parts = sig.split(",").reduce((acc: Record<string, string>, p) => {
        const [k, v] = p.split("=");
        acc[k] = v;
        return acc;
      }, {});
      const ts = parts["t"];
      const v1 = parts["v1"];
      const { createHmac, timingSafeEqual } = await import("crypto");
      const expected = createHmac("sha256", STRIPE_WEBHOOK_SECRET).update(`${ts}.${body}`).digest("hex");
      if (!timingSafeEqual(Buffer.from(expected), Buffer.from(v1 ?? ""))) {
        return NextResponse.json({ error: "Signature invalide" }, { status: 401 });
      }
    } catch {
      return NextResponse.json({ error: "Signature invalide" }, { status: 401 });
    }
  }

  const event = JSON.parse(body);

  if (event.type !== "checkout.session.completed" && event.type !== "payment_intent.succeeded") {
    return NextResponse.json({ received: true });
  }

  const session = event.data?.object;
  const metadata = session?.metadata ?? {};
  const amount = Math.round((session?.amount_total ?? 0) / 100); // centimes → unités
  const email = session?.customer_details?.email ?? session?.receipt_email;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (supabaseUrl && !supabaseUrl.includes("placeholder")) {
    try {
      const { createServerClient } = await import("../../../../lib/supabase/server");
      const sb = createServerClient() as any;

      // Idempotence via event.id
      const { data: existing } = await sb.from("paiements").select("id, statut").eq("reference", event.id).single();
      if (existing?.statut === "valide") return NextResponse.json({ received: true, skipped: true });

      await sb.from("paiements").upsert({
        reference: event.id,
        montant: amount,
        devise: session?.currency?.toUpperCase() ?? "EUR",
        methode: "Stripe",
        statut: "valide",
        fournisseur: "Stripe",
        payload_webhook: event,
        organisation_id: metadata.orgId,
      }, { onConflict: "reference" });

      if (metadata.orgId && metadata.planCode) {
        const { data: plan } = await sb.from("plans").select("id, duree_jours").eq("code", metadata.planCode).single();
        if (plan) {
          const dateFin = new Date(Date.now() + plan.duree_jours * 86400000).toISOString();
          const { data: lic } = await sb.from("licences").select("id").eq("organisation_id", metadata.orgId).single();
          if (lic) {
            await sb.from("licences").update({ plan_id: plan.id, statut: "actif", date_fin: dateFin }).eq("id", lic.id);
          } else {
            await sb.from("licences").insert({ organisation_id: metadata.orgId, plan_id: plan.id, statut: "actif", date_fin: dateFin });
          }
        }
      }

      if (email) {
        sendEmail({
          to: email,
          template: "recu_paiement",
          data: {
            prenom: metadata.prenom ?? email,
            montant: String(amount),
            devise: session?.currency?.toUpperCase() ?? "EUR",
            plan: metadata.planCode ?? "",
            dateDebut: new Date().toLocaleDateString("fr-FR"),
            dateFin: new Date(Date.now() + 30 * 86400000).toLocaleDateString("fr-FR"),
            reference: event.id,
          },
          idempotencyKey: `stripe:${event.id}`,
        }).catch(() => {});
      }
    } catch (e) {
      console.error("Stripe webhook error:", e);
      return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}

