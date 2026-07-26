export const DEMO_ORG_ID = "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa";

export async function dbGet<T>(path: string): Promise<T[]> {
  try {
    const res = await fetch(`/api/${path}?org=${DEMO_ORG_ID}`);
    if (!res.ok) return [];
    const json = await res.json();
    return json.data ?? [];
  } catch { return []; }
}

export async function dbPost<T>(path: string, body: object): Promise<T | null> {
  try {
    const res = await fetch(`/api/${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...body, organisation_id: DEMO_ORG_ID }),
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data ?? null;
  } catch { return null; }
}
