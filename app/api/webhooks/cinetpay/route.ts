// Webhook CinetPay — validation automatique des paiements électroniques
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "../../../../lib/email";

const CINETPAY_SECRET = process.env.CINETPAY_SECRET ?? "";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const payload = JSON.parse(body);

  // Vérification de signature HMAC (idempotence + sécurité)
  const receivedSig = req.headers.get("x-cinetpay-signature") ?? "";
  if (CINETPAY_SECRET && receivedSig) {
    const { createHmac } = await import("crypto");
    const expectedSig = createHmac("sha256", CINETPAY_SECRET).update(body).digest("hex");
    if (expectedSig !== receivedSig) {
      return NextResponse.json({ error: "Signature invalide" }, { status: 401 });
    }
  }

  const { transaction_id, status, amount, customer_email, customer_name, metadata } = payload;

  if (status !== "ACCEPTED") {
    return NextResponse.json({ received: true });
  }

  // Activer la licence (Supabase)
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (supabaseUrl && !supabaseUrl.includes("placeholder")) {
    try {
      const { createServerClient } = await import("../../../../lib/supabase/server");
      const sb = createServerClient() as any;

      // Idempotence : ne traiter qu'une fois par transaction_id
      const { data: existing } = await sb
        .from("paiements")
        .select("id, statut")
        .eq("reference", transaction_id)
        .single();

      if (existing?.statut === "valide") {
        return NextResponse.json({ received: true, skipped: true });
      }

      // Mettre à jour le paiement
      await sb.from("paiements").upsert({
        reference: transaction_id,
        montant: amount,
        devise: "XOF",
        methode: "CinetPay",
        statut: "valide",
        fournisseur: "CinetPay",
        payload_webhook: payload,
        organisation_id: metadata?.orgId,
      }, { onConflict: "reference" });

      // Activer la licence
      if (metadata?.orgId && metadata?.planCode) {
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

      // Email de reçu
      if (customer_email) {
        sendEmail({
          to: customer_email,
          template: "recu_paiement",
          data: {
            prenom: customer_name ?? customer_email,
            montant: String(amount),
            devise: "XOF",
            plan: metadata?.planCode ?? "Pro",
            dateDebut: new Date().toLocaleDateString("fr-FR"),
            dateFin: new Date(Date.now() + 30 * 86400000).toLocaleDateString("fr-FR"),
            reference: transaction_id,
          },
          idempotencyKey: `cinetpay:${transaction_id}`,
        }).catch(() => {});
      }
    } catch (e) {
      console.error("CinetPay webhook error:", e);
      return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}

