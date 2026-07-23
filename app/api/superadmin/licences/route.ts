import { NextRequest, NextResponse } from "next/server";
import { verifySession, COOKIE_NAME } from "../../../../lib/session";

export async function GET(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  const session = token ? await verifySession(token) : null;
  if (!session || session.role !== "superadmin") return NextResponse.json({ error: "Accès refusé" }, { status: 403 });

  const DEMO = [
    { id: "1", org: "COOPANACOT", plan: "business", statut: "actif", dateFin: "2026-03-15", joursRestants: 235, mrr: 39900, periodicite: "annuel" },
    { id: "2", org: "CIAGRI Export", plan: "enterprise", statut: "actif", dateFin: "2026-01-08", joursRestants: 169, mrr: 99900, periodicite: "annuel" },
    { id: "3", org: "Ferme Boungou", plan: "pro", statut: "actif", dateFin: "2025-12-20", joursRestants: 150, mrr: 24900, periodicite: "mensuel" },
    { id: "4", org: "AgriTech Mali", plan: "starter", statut: "essai", dateFin: "2025-07-31", joursRestants: 8, mrr: 0, periodicite: null },
    { id: "5", org: "Coop Savane Nord", plan: "pro", statut: "grace", dateFin: "2025-07-23", joursRestants: 0, mrr: 24900, periodicite: "mensuel" },
    { id: "6", org: "Hacienda Verde", plan: "business", statut: "actif", dateFin: "2026-02-28", joursRestants: 220, mrr: 39900, periodicite: "mensuel" },
    { id: "7", org: "Riziculture Togolaise", plan: "starter", statut: "expire", dateFin: "2025-04-05", joursRestants: -109, mrr: 0, periodicite: null },
  ];
  return NextResponse.json({ licences: DEMO });
}

export async function POST(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  const session = token ? await verifySession(token) : null;
  if (!session || session.role !== "superadmin") return NextResponse.json({ error: "Accès refusé" }, { status: 403 });

  const { orgId, action, planCode, dureeJours } = await req.json();
  // action: "activer" | "suspendre" | "prolonger" | "changer_plan"

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (supabaseUrl && !supabaseUrl.includes("placeholder")) {
    try {
      const { createServerClient } = await import("../../../../lib/supabase/server");
      const sb = createServerClient() as any;
      if (action === "activer") {
        const dateFin = new Date(Date.now() + (dureeJours ?? 30) * 86400000).toISOString();
        await sb.from("licences").upsert({ organisation_id: orgId, statut: "actif", date_fin: dateFin }, { onConflict: "organisation_id" });
      } else if (action === "suspendre") {
        await sb.from("licences").update({ statut: "suspendu" }).eq("organisation_id", orgId);
      } else if (action === "prolonger" && dureeJours) {
        const { data: lic } = await sb.from("licences").select("date_fin").eq("organisation_id", orgId).single();
        const base = lic?.date_fin ? new Date(lic.date_fin) : new Date();
        const dateFin = new Date(base.getTime() + dureeJours * 86400000).toISOString();
        await sb.from("licences").update({ statut: "actif", date_fin: dateFin }).eq("organisation_id", orgId);
      }
      return NextResponse.json({ success: true });
    } catch {}
  }
  return NextResponse.json({ success: true, demo: true });
}
