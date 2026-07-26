import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const sb = createServerClient() as any;
    const { error } = await sb.from("organisations").upsert({
      id: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
      nom: "AGRIFRIK Demo",
      slug: "agrifrik-demo",
      secteur: "Agriculture",
      pays: "Cote d Ivoire",
      devise: "XOF",
      langue: "fr",
      email: "admin@agrifrik.com",
      plan: "pro",
      licence_statut: "actif",
    }, { onConflict: "id" });
    if (error) throw error;
    return NextResponse.json({ organisation_id: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa" });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
