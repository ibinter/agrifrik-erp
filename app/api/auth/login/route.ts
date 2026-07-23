import { NextRequest, NextResponse } from "next/server";
import { signSession, COOKIE_NAME, SESSION_DURATION_MS } from "../../../../lib/session";
import type { Role } from "../../../../lib/permissions";

const DEMO_EMAIL = process.env.NEXT_PUBLIC_DEMO_EMAIL ?? "admin@agrifrik.com";
const DEMO_PASSWORD = process.env.NEXT_PUBLIC_DEMO_PASSWORD ?? "agrifrik2025";

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json({ success: false, message: "Email et mot de passe requis" }, { status: 400 });
  }

  let userProfile = null;

  // --- Tentative Supabase (si configuré) ---
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (supabaseUrl && serviceKey && !supabaseUrl.includes("placeholder")) {
    try {
      const { createServerClient } = await import("../../../../lib/supabase/server");
      const supabase = createServerClient();
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });

      if (!error && data.user) {
        const { data: profil } = await supabase
          .from("profils")
          .select("id, nom, prenom, email, role, avatar_url, organisation_id")
          .eq("id", data.user.id)
          .single();

        userProfile = profil ?? {
          id: data.user.id,
          email: data.user.email ?? email,
          nom: "",
          prenom: "",
          role: "operateur" as Role,
          avatar_url: null,
          organisation_id: "default",
        };
      }
    } catch {
      // Supabase indisponible — continuer vers le fallback démo
    }
  }

  // --- Fallback démo ---
  if (!userProfile) {
    if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
      userProfile = {
        id: "demo-user-001",
        email: DEMO_EMAIL,
        nom: "Koffi",
        prenom: "Jean-Baptiste",
        role: "admin" as Role,
        avatar_url: null,
        organisation_id: "demo-org-001",
      };
    } else {
      return NextResponse.json({ success: false, message: "Email ou mot de passe incorrect" }, { status: 401 });
    }
  }

  // --- Créer et poser le cookie de session signé ---
  const token = await signSession({
    userId: userProfile.id,
    email: userProfile.email ?? email,
    role: (userProfile.role as Role) ?? "operateur",
    orgId: userProfile.organisation_id ?? "default",
    nom: userProfile.nom ?? "",
    prenom: userProfile.prenom ?? "",
    avatarUrl: userProfile.avatar_url ?? null,
  });

  const response = NextResponse.json({ success: true, user: userProfile });

  response.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_DURATION_MS / 1000,
    path: "/",
  });

  return response;
}
