import { NextRequest, NextResponse } from "next/server";

const DEMO_USERS = [
  {
    id: "1",
    email: "admin@agrifrik.com",
    password: "agrifrik2025",
    nom: "Jean-Baptiste Koffi",
    role: "Administrateur",
    exploitation: "Exploitation KOFFI & Fils",
    avatar: "JK",
  },
];

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  const match = DEMO_USERS.find(
    (u) => u.email === email && u.password === password
  );

  if (!match) {
    return NextResponse.json(
      { success: false, message: "Email ou mot de passe incorrect" },
      { status: 401 }
    );
  }

  const { password: _pw, ...user } = match;

  return NextResponse.json({
    success: true,
    user,
    token: `demo-token-${user.id}-${Date.now()}`,
  });
}
