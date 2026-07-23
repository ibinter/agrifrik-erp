import { NextRequest, NextResponse } from "next/server";
import { verifySession, COOKIE_NAME } from "../../../../lib/session";
import { randomBytes } from "crypto";

const DEMO_VOUCHERS = [
  { id: "1", code: "AGRIFRIK-DEMO-2025", plan: "pro", periodicite: "mensuel", valeur: 24900, statut: "utilise", utilise_par: "admin@agrifrik.com", creeLe: "2025-01-01", utiliseLe: "2025-07-15" },
  { id: "2", code: "AGRIFRIK-STARTER-3M", plan: "starter", periodicite: "mensuel", valeur: 35700, statut: "disponible", utilise_par: null, creeLe: "2025-03-01", utiliseLe: null },
  { id: "3", code: "PROMO-BCC-2025", plan: "pro", periodicite: "annuel", valeur: 251880, statut: "disponible", utilise_par: null, creeLe: "2025-06-01", utiliseLe: null },
  { id: "4", code: "FIDA-GRANT-001", plan: "business", periodicite: "annuel", valeur: 402480, statut: "utilise", utilise_par: "coop@savane.sn", creeLe: "2025-02-15", utiliseLe: "2025-04-10" },
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
      const { data } = await sb.from("vouchers").select("*").order("created_at", { ascending: false });
      return NextResponse.json({ vouchers: data ?? [] });
    } catch {}
  }
  return NextResponse.json({ vouchers: DEMO_VOUCHERS });
}

export async function POST(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  const session = token ? await verifySession(token) : null;
  if (!session || session.role !== "superadmin") return NextResponse.json({ error: "Accès refusé" }, { status: 403 });

  const { planCode, periodicite, prefix, quantite = 1 } = await req.json();
  if (!planCode || !periodicite) return NextResponse.json({ error: "planCode et periodicite requis" }, { status: 400 });

  const codes = Array.from({ length: Math.min(quantite, 50) }, () => {
    const rand = randomBytes(4).toString("hex").toUpperCase();
    return `${prefix ?? "AGRIFRIK"}-${rand}`;
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (supabaseUrl && !supabaseUrl.includes("placeholder")) {
    try {
      const { createServerClient } = await import("../../../../lib/supabase/server");
      const sb = createServerClient() as any;
      const rows = codes.map((c) => ({ code: c, plan_code: planCode, periodicite, statut: "disponible", cree_par: session.userId }));
      await sb.from("vouchers").insert(rows);
      return NextResponse.json({ success: true, codes });
    } catch {}
  }
  return NextResponse.json({ success: true, demo: true, codes });
}

export async function DELETE(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  const session = token ? await verifySession(token) : null;
  if (!session || session.role !== "superadmin") return NextResponse.json({ error: "Accès refusé" }, { status: 403 });

  const { voucherId } = await req.json();
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (supabaseUrl && !supabaseUrl.includes("placeholder")) {
    try {
      const { createServerClient } = await import("../../../../lib/supabase/server");
      const sb = createServerClient() as any;
      await sb.from("vouchers").delete().eq("id", voucherId).eq("statut", "disponible");
      return NextResponse.json({ success: true });
    } catch {}
  }
  return NextResponse.json({ success: true, demo: true });
}
