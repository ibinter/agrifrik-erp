import { NextRequest, NextResponse } from "next/server";
import { verifySession, signSession, COOKIE_NAME } from "../../../../lib/session";

export async function POST(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  const session = token ? await verifySession(token) : null;
  if (!session || session.role !== "superadmin") return NextResponse.json({ error: "Accès refusé" }, { status: 403 });

  const { targetEmail, targetOrgId } = await req.json();
  if (!targetEmail) return NextResponse.json({ error: "targetEmail requis" }, { status: 400 });

  const impersonatedPayload = {
    userId: `impersonate:${session.userId}`,
    email: targetEmail,
    role: "admin" as const,
    orgId: targetOrgId ?? "demo",
    nom: `[IBIG] ${session.nom}`,
    prenom: session.prenom,
    avatarUrl: session.avatarUrl,
  };

  const newToken = await signSession(impersonatedPayload);

  const res = NextResponse.json({
    success: true,
    message: `Vous êtes maintenant connecté en tant que ${targetEmail} (impersonation — 2h max)`,
    redirectTo: "/dashboard",
  });

  res.cookies.set(COOKIE_NAME, newToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 2 * 60 * 60,
    path: "/",
  });

  return res;
}
