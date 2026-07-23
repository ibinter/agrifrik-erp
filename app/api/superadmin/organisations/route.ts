import { NextRequest, NextResponse } from "next/server";
import { verifySession, COOKIE_NAME } from "../../../../lib/session";

const DEMO_ORGS = [
  { id: "1", nom: "COOPANACOT", pays: "Côte d'Ivoire", plan: "business", statut: "actif", users: 34, dateInscription: "2024-03-15", email: "admin@coopanacot.ci", dateFin: "2026-03-15", mrr: 39900 },
  { id: "2", nom: "CIAGRI Export", pays: "Côte d'Ivoire", plan: "enterprise", statut: "actif", users: 87, dateInscription: "2024-01-08", email: "admin@ciagri.ci", dateFin: "2026-01-08", mrr: 99900 },
  { id: "3", nom: "Ferme Boungou", pays: "Burkina Faso", plan: "pro", statut: "actif", users: 12, dateInscription: "2024-06-20", email: "contact@boungou.bf", dateFin: "2025-12-20", mrr: 24900 },
  { id: "4", nom: "AgriTech Mali", pays: "Mali", plan: "starter", statut: "essai", users: 3, dateInscription: "2025-07-01", email: "info@agritech.ml", dateFin: "2025-07-31", mrr: 0 },
  { id: "5", nom: "Coop Savane Nord", pays: "Sénégal", plan: "pro", statut: "grace", users: 18, dateInscription: "2024-09-10", email: "coop@savane.sn", dateFin: "2025-07-23", mrr: 24900 },
  { id: "6", nom: "Hacienda Verde", pays: "Cameroun", plan: "business", statut: "actif", users: 41, dateInscription: "2024-02-28", email: "admin@hacienda.cm", dateFin: "2026-02-28", mrr: 39900 },
  { id: "7", nom: "Demo IBIG", pays: "Côte d'Ivoire", plan: "pro", statut: "actif", users: 1, dateInscription: "2024-01-01", email: "admin@agrifrik.com", dateFin: "2099-12-31", mrr: 0 },
  { id: "8", nom: "Riziculture Togolaise", pays: "Togo", plan: "starter", statut: "expire", users: 5, dateInscription: "2024-04-05", email: "rizi@togo.tg", dateFin: "2025-04-05", mrr: 0 },
];

export async function GET(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  const session = token ? await verifySession(token) : null;
  if (!session || session.role !== "superadmin") return NextResponse.json({ error: "Accès refusé" }, { status: 403 });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (supabaseUrl && !supabaseUrl.includes("placeholder")) {
    try {
      const { createServerClient } = await import("../../../../lib/supabase/server");
      const sb = createServerClient() as any;
      const { data } = await sb.from("organisations").select("*, licences(*), users(count)").order("created_at", { ascending: false });
      return NextResponse.json({ organisations: data ?? [] });
    } catch {}
  }
  return NextResponse.json({ organisations: DEMO_ORGS });
}

export async function PATCH(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  const session = token ? await verifySession(token) : null;
  if (!session || session.role !== "superadmin") return NextResponse.json({ error: "Accès refusé" }, { status: 403 });

  const { orgId, action } = await req.json();
  // action: "suspendre" | "reactiver" | "supprimer"

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (supabaseUrl && !supabaseUrl.includes("placeholder")) {
    try {
      const { createServerClient } = await import("../../../../lib/supabase/server");
      const sb = createServerClient() as any;
      if (action === "suspendre") {
        await sb.from("licences").update({ statut: "suspendu" }).eq("organisation_id", orgId);
      } else if (action === "reactiver") {
        await sb.from("licences").update({ statut: "actif" }).eq("organisation_id", orgId);
      }
      return NextResponse.json({ success: true });
    } catch {}
  }
  return NextResponse.json({ success: true, demo: true });
}
