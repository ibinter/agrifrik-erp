import { NextRequest, NextResponse } from "next/server";
import { verifySession, COOKIE_NAME } from "./lib/session";
import { canAccess } from "./lib/permissions";
import type { Role } from "./lib/permissions";

// Routes publiques qui ne nécessitent pas d'authentification
const PUBLIC_PATHS = [
  "/",
  "/login",
  "/onboarding",
  "/politique-confidentialite",
  "/politique-cookies",
  "/mentions-legales",
  "/cgu",
  "/verify",
];

const PUBLIC_PREFIXES = ["/api/auth/", "/api/sara", "/_next/", "/favicon", "/logo", "/icons", "/manifest"];

function isPublic(pathname: string): boolean {
  if (PUBLIC_PATHS.includes(pathname)) return true;
  return PUBLIC_PREFIXES.some((p) => pathname.startsWith(p));
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Laisser passer les ressources statiques et routes publiques
  if (isPublic(pathname)) return NextResponse.next();

  // Lire et vérifier le cookie de session
  const token = req.cookies.get(COOKIE_NAME)?.value;
  const session = token ? await verifySession(token) : null;

  // Non authentifié → redirection login
  if (!session) {
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = "/login";
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Vérifier les permissions d'accès au module
  const role = session.role as Role;
  if (!canAccess(role, pathname)) {
    // Accès refusé → redirection vers le dashboard avec message
    const dashUrl = req.nextUrl.clone();
    dashUrl.pathname = "/dashboard";
    dashUrl.searchParams.set("error", "acces_refuse");
    return NextResponse.redirect(dashUrl);
  }

  // Injecter les infos de session dans les headers (disponibles côté serveur)
  const response = NextResponse.next();
  response.headers.set("x-user-id", session.userId);
  response.headers.set("x-user-role", session.role);
  response.headers.set("x-user-org", session.orgId);
  return response;
}

export const config = {
  matcher: [
    // Protéger toutes les routes sauf fichiers statiques
    "/((?!_next/static|_next/image|favicon\\.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff2?|ttf|eot)).*)",
  ],
};
