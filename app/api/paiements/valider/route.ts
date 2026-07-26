// Validation manuelle d'un paiement — réservée aux admins.
//
// IMPORTANT : cette route ne doit être appelée que pour valider un paiement
// reçu hors-ligne (virement, chèque…) par un administrateur.
// Les paiements électroniques (CinetPay, Stripe) sont confirmés automatiquement
// par leurs webhooks respectifs (/api/webhooks/cinetpay, /api/webhooks/stripe)
// et ne doivent PAS passer par cette route.
import { NextRequest, NextResponse } from "next/server";
import { verifySession, COOKIE_NAME } from "../../../../lib/session";
import { sendEmail } from "../../../../lib/email";

export async function POST(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  const session = token ? await verifySession(token) : null;
  if (!session) return NextResponse.json({ error: "Non authentifié" }, { status: 401 });

  // Seuls les admins et superadmins peuvent valider
  if (!["superadmin", "admin"].includes(session.role)) {
    return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
  }

  const { paiementId, planCode, periodicite, orgId, clientEmail, clientPrenom } = await req.json();
  if (!paiementId || !planCode || !orgId) {
    return NextResponse.json({ error: "Paramètres manquants" }, { status: 400 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (supabaseUrl && !supabaseUrl.includes("placeholder")) {
    try {
      const { createServerClient } = await import("../../../../lib/supabase/server");
      const sb = createServerClient() as any;

      // Vérifier que le paiement n'a pas déjà été confirmé automatiquement
      // par un webhook (source = "webhook"). Un paiement électronique ne doit
      // pas être re-validé manuellement, car la licence aurait déjà été activée.
      const { data: existing } = await sb
        .from("paiements")
        .select("id, statut, source")
        .eq("id", paiementId)
        .single();

      if (!existing) {
        return NextResponse.json({ error: "Paiement introuvable" }, { status: 404 });
      }
      if (existing.source === "webhook") {
        return NextResponse.json({
          error: "Ce paiement a été confirmé automatiquement par le prestataire de paiement. La validation manuelle n'est pas autorisée.",
        }, { status: 409 });
      }

      // Mettre à jour le paiement (idempotent via statut)
      const { data: pmt } = await sb
        .from("paiements")
        .update({ statut: "valide", valide_par: session.userId, valide_le: new Date().toISOString() })
        .eq("id", paiementId)
        .eq("statut", "en_attente") // Idempotence
        .select()
        .single();

      if (!pmt) return NextResponse.json({ error: "Paiement introuvable ou déjà traité" }, { status: 400 });

      // Activer la licence
      const { data: plan } = await sb.from("plans").select("id, duree_jours").eq("code", planCode).single();
      if (plan) {
        const durée = periodicite === "annuel" ? plan.duree_jours * 12 : plan.duree_jours;
        const dateFin = new Date(Date.now() + durée * 86400000).toISOString();
        const { data: existing } = await sb.from("licences").select("id").eq("organisation_id", orgId).single();
        if (existing) {
          await sb.from("licences").update({ plan_id: plan.id, statut: "actif", date_fin: dateFin, mode_lecture_seule: false }).eq("id", existing.id);
        } else {
          await sb.from("licences").insert({ organisation_id: orgId, plan_id: plan.id, statut: "actif", date_fin: dateFin });
        }
      }

      // Email de reçu (non bloquant)
      if (clientEmail) {
        sendEmail({
          to: clientEmail,
          template: "recu_paiement",
          data: {
            prenom: clientPrenom ?? "Client",
            montant: String(pmt.montant),
            devise: pmt.devise ?? "XOF",
            plan: planCode,
            dateDebut: new Date().toLocaleDateString("fr-FR"),
            dateFin: new Date(Date.now() + 30 * 86400000).toLocaleDateString("fr-FR"),
            reference: pmt.reference ?? paiementId,
          },
          idempotencyKey: `valider:${paiementId}`,
        }).catch(() => {});
      }

      return NextResponse.json({ success: true });
    } catch (e) {
      return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
    }
  }

  // Mode démo
  return NextResponse.json({ success: true, demo: true, message: "Paiement validé (mode démo)" });
}

