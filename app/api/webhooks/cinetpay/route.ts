// Webhook CinetPay — validation automatique des paiements électroniques
import { NextRequest, NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "crypto";
import { sendEmail } from "../../../../lib/email";

const CINETPAY_SECRET = process.env.CINETPAY_SECRET ?? "";

export async function POST(req: NextRequest) {
  const rawBody = await req.text();

  // Vérification HMAC-SHA256 obligatoire si le secret est configuré.
  // On rejette explicitement si la signature est absente ou incorrecte :
  // ne pas valider uniquement quand receivedSig est vide permettrait
  // à un attaquant d'omettre l'en-tête pour bypasser la vérification.
  if (CINETPAY_SECRET) {
    const receivedSig = req.headers.get("x-cinetpay-signature") ?? "";
    const expectedSig = createHmac("sha256", CINETPAY_SECRET).update(rawBody).digest("hex");
    const expectedBuf = Buffer.from(expectedSig, "hex");
    const receivedBuf = Buffer.from(receivedSig.length === expectedSig.length ? receivedSig : "", "hex");
    // timingSafeEqual exige des buffers de même longueur — on force la longueur
    // correcte avant la comparaison pour éviter une exception qui court-circuiterait
    // la vérification.
    const safe =
      receivedBuf.length === expectedBuf.length &&
      timingSafeEqual(expectedBuf, receivedBuf);
    if (!safe) {
      return NextResponse.json({ error: "Signature invalide" }, { status: 401 });
    }
  }

  // Champs officiels de l'API CinetPay notification
  const payload = JSON.parse(rawBody) as Record<string, unknown>;
  const cpm_trans_id = payload["cpm_trans_id"] as string | undefined;
  const cpm_result = payload["cpm_result"] as string | undefined;   // "00" = succès
  const cpm_custom = payload["cpm_custom"] as string | undefined;   // JSON sérialisé
  // Champs complémentaires présents dans certaines versions de l'API
  const amount = payload["cpm_amount"] as number | undefined;
  const customer_email = payload["customer_email"] as string | undefined;
  const customer_name = payload["customer_name"] as string | undefined;

  let metadata: { orgId?: string; planCode?: string } = {};
  try {
    if (cpm_custom) metadata = JSON.parse(cpm_custom);
  } catch {
    // cpm_custom non JSON — on continue sans métadonnées
  }

  if (cpm_result !== "00") {
    console.log(`[CinetPay] Paiement non accepté — transaction ${cpm_trans_id}, résultat ${cpm_result}`);
    return NextResponse.json({ received: true });
  }

  console.log(`[CinetPay] Paiement OK — transaction ${cpm_trans_id}, custom: ${cpm_custom}`);

  // Activer la licence (Supabase)
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (supabaseUrl && !supabaseUrl.includes("placeholder")) {
    try {
      const { createServerClient } = await import("../../../../lib/supabase/server");
      const sb = createServerClient() as any;

      // Idempotence : ne traiter qu'une fois par cpm_trans_id
      const { data: existing } = await sb
        .from("paiements")
        .select("id, statut")
        .eq("reference", cpm_trans_id)
        .single();

      if (existing?.statut === "valide") {
        return NextResponse.json({ received: true, skipped: true });
      }

      // Mettre à jour le paiement — source "webhook" permet de distinguer
      // les paiements confirmés par le serveur de ceux saisis manuellement.
      await sb.from("paiements").upsert({
        reference: cpm_trans_id,
        montant: amount,
        devise: "XOF",
        methode: "CinetPay",
        statut: "valide",
        fournisseur: "CinetPay",
        source: "webhook",
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
            reference: cpm_trans_id ?? "",
          },
          idempotencyKey: `cinetpay:${cpm_trans_id}`,
        }).catch(() => {});
      }
    } catch (e) {
      console.error("CinetPay webhook error:", e);
      return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}

