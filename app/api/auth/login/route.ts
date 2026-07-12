import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "../../../../lib/supabase/server";

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json(
      { success: false, message: "Email et mot de passe requis" },
      { status: 400 }
    );
  }

  const supabase = createServerClient();

  // Authentification via Supabase Auth
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error || !data.user) {
    return NextResponse.json(
      { success: false, message: "Email ou mot de passe incorrect" },
      { status: 401 }
    );
  }

  // Récupérer le profil
  const { data: profil } = await supabase
    .from("profils")
    .select("id, nom, prenom, email, role, avatar_url, organisation_id")
    .eq("id", data.user.id)
    .single();

  return NextResponse.json({
    success: true,
    user: profil ?? {
      id: data.user.id,
      email: data.user.email,
      nom: "",
      prenom: "",
      role: "operateur",
      avatar_url: null,
      organisation_id: null,
    },
    access_token: data.session?.access_token,
    refresh_token: data.session?.refresh_token,
  });
}
