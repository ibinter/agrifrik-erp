import { NextRequest, NextResponse } from "next/server";
import { verifySession, COOKIE_NAME } from "../../../../lib/session";
import { DEMO_LICENCE, computeLicenceStatut } from "../../../../lib/licence";
import { getPlanByCode } from "../../../../lib/plans";

export async function GET(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  const session = token ? await verifySession(token) : null;
  if (!session) return NextResponse.json({ error: "Non authentifié" }, { status: 401 });

  // --- Supabase en production ---
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (supabaseUrl && !supabaseUrl.includes("placeholder")) {
    try {
      const { createServerClient } = await import("../../../../lib/supabase/server");
      const sb = createServerClient() as any;
      const { data: lic } = await sb
        .from("licences")
        .select("*, plans(code, nom, prix, devise, max_utilisateurs, max_entites, stockage_mo, support)")
        .eq("organisation_id", session.orgId)
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      if (lic) {
        const computed = computeLicenceStatut(lic.date_fin, lic.statut);
        return NextResponse.json({ licence: { ...lic, ...computed }, plan: lic.plans });
      }
    } catch {/* fallback démo */}
  }

  // --- Mode démo ---
  const { statut, joursRestants, enGrace } = computeLicenceStatut(DEMO_LICENCE.dateFin, DEMO_LICENCE.statut);
  const plan = getPlanByCode(DEMO_LICENCE.planCode);
  return NextResponse.json({
    licence: { ...DEMO_LICENCE, statut, joursRestants, enGrace },
    plan,
    demo: true,
  });
}

