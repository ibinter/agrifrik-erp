import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "./lib/supabase/server";

// Routes publiques (pas besoin d'être connecté)
const PUBLIC_PATHS = [
  "/login",
  "/onboarding",
  "/api/auth/login",
  "/api/auth/register",
  "/api/auth/reset-password",
  "/api/webhooks",
  "/_next",
  "/favicon.ico",
  "/manifest.json",
  "/icons",
];

function isPublic(pathname: string): boolean {
  return PUBLIC_PATHS.some((p) => pathname.startsWith(p));
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Laisser passer les routes publiques
  if (isPublic(pathname)) {
    return NextResponse.next();
  }

  // Vérifier la session Supabase via le cookie sb-access-token
  const accessToken =
    request.cookies.get("sb-access-token")?.value ??
    request.cookies.get(`sb-${process.env.NEXT_PUBLIC_SUPABASE_URL?.split("//")[1]?.split(".")[0]}-auth-token`)?.value;

  if (!accessToken) {
    // Pas de token → vérifier via l'API Supabase (cookie session)
    try {
      const supabase = createServerClient();
      // Pour Next.js App Router, on passe le cookie brut
      const cookieHeader = request.headers.get("cookie") ?? "";
      // Extraire le JSON du cookie supabase-auth-token
      const match = cookieHeader.match(/sb-[^=]+-auth-token=([^;]+)/);
      if (!match) {
        return NextResponse.redirect(new URL("/login", request.url));
      }
      const tokenData = JSON.parse(decodeURIComponent(match[1]));
      const { data: { user } } = await supabase.auth.getUser(tokenData.access_token);
      if (!user) {
        return NextResponse.redirect(new URL("/login", request.url));
      }
    } catch {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export default proxy;

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
