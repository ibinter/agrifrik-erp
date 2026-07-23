import { NextRequest, NextResponse } from "next/server";
import { verifySession, COOKIE_NAME } from "../../../../lib/session";

// Codes voucher de démo (en prod: vérifier dans la table vouchers)
const DEMO_VOUCHERS: Record<string, { valeur: number; planCode: string; periodicite: string }> = {
  "AGRIFRIK-DEMO-2025": { valeur: 24900, planCode: "pro", periodicite: "mensuel" },
  "AGRIFRIK-STARTER-3M": { valeur: 35700, planCode: "starter", periodicite: "mensuel" },
};

export async function POST(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  const session = token ? await verifySession(token) : null;
  if (!session) return NextResponse.json({ error: "Non authentifié" }, { status: 401 });

  const { code } = await req.json();
  if (!code?.trim()) return NextResponse.json({ error: "Code requis" }, { status: 400 });

  const codeNorm = code.trim().toUpperCase();

  // Vérifier en Supabase (production)
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (supabaseUrl && !supabaseUrl.includes("placeholder")) {
    try {
      const { createServerClient } = await import("../../../../lib/supabase/server");
      const sb = createServerClient() as any;
      const { data: voucher } = await sb
        .from("vouchers")
        .select("*")
        .eq("code", codeNorm)
        .eq("statut", "disponible")
        .single();

      if (!voucher) return NextResponse.json({ error: "Code invalide ou déjà utilisé" }, { status: 400 });

      // Marquer comme utilisé
      await sb.from("vouchers").update({ statut: "utilise", utilise_par: session.userId, utilise_le: new Date().toISOString() }).eq("id", voucher.id);

      // Activer la licence (idempotent)
      await activateLicence(session.orgId, voucher.plan_code, voucher.valeur, sb);

      return NextResponse.json({ success: true, plan: voucher.plan_code, message: "Voucher activé avec succès !" });
    } catch {/* fallback démo */}
  }

  // Mode démo
  const demoVoucher = DEMO_VOUCHERS[codeNorm];
  if (!demoVoucher) return NextResponse.json({ error: "Code invalide ou déjà utilisé" }, { status: 400 });

  return NextResponse.json({
    success: true,
    plan: demoVoucher.planCode,
    message: `Voucher activé ! Plan ${demoVoucher.planCode} activé pour 30 jours.`,
    demo: true,
  });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function activateLicence(orgId: string, planCode: string, montant: number, sb: any) {
  const { data: plan } = await sb.from("plans").select("id, duree_jours").eq("code", planCode).single();
  if (!plan) return;

  const dateDebut = new Date().toISOString();
  const dateFin = new Date(Date.now() + plan.duree_jours * 86400000).toISOString();

  const { data: existing } = await sb.from("licences").select("id").eq("organisation_id", orgId).single();
  if (existing) {
    await sb.from("licences").update({ plan_id: plan.id, statut: "actif", date_debut: dateDebut, date_fin: dateFin, mode_lecture_seule: false }).eq("id", existing.id);
  } else {
    await sb.from("licences").insert({ organisation_id: orgId, plan_id: plan.id, statut: "actif", date_debut: dateDebut, date_fin: dateFin });
  }
}

