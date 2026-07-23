// Session cookie — signé via HMAC-SHA256 (Web Crypto, compatible Edge + Node)
import type { Role } from "./permissions";

export interface SessionPayload {
  userId: string;
  email: string;
  role: Role;
  orgId: string;
  nom: string;
  prenom: string;
  avatarUrl: string | null;
  exp: number; // timestamp ms
}

const ALGO = { name: "HMAC", hash: "SHA-256" } as const;
const COOKIE_NAME = "agrifrik_session";
const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 jours

function getSecret(): string {
  return process.env.JWT_SECRET ?? "agrifrik-dev-secret-32-chars-min!!";
}

async function importKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    ALGO,
    false,
    ["sign", "verify"]
  );
}

export async function signSession(payload: Omit<SessionPayload, "exp">): Promise<string> {
  const full: SessionPayload = { ...payload, exp: Date.now() + SESSION_DURATION_MS };
  const data = JSON.stringify(full);
  const key = await importKey(getSecret());
  const sig = await crypto.subtle.sign(ALGO, key, new TextEncoder().encode(data));
  const dataB64 = btoa(unescape(encodeURIComponent(data)));
  const sigB64 = btoa(String.fromCharCode(...new Uint8Array(sig)));
  return `${dataB64}.${sigB64}`;
}

export async function verifySession(token: string): Promise<SessionPayload | null> {
  try {
    const dot = token.lastIndexOf(".");
    if (dot < 0) return null;
    const dataB64 = token.slice(0, dot);
    const sigB64 = token.slice(dot + 1);

    const data = decodeURIComponent(escape(atob(dataB64)));
    const sig = Uint8Array.from(atob(sigB64), (c) => c.charCodeAt(0));

    const key = await importKey(getSecret());
    const valid = await crypto.subtle.verify(ALGO, key, sig, new TextEncoder().encode(data));
    if (!valid) return null;

    const payload = JSON.parse(data) as SessionPayload;
    if (payload.exp < Date.now()) return null;

    return payload;
  } catch {
    return null;
  }
}

export { COOKIE_NAME, SESSION_DURATION_MS };
