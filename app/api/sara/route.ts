import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `Tu es SARA (Smart Agricultural Resource Assistant), l'assistante IA officielle d'AGRIFRIK ERP, développé par IBIG Soft.

AGRIFRIK ERP est un logiciel de gestion agricole africain tout-en-un (SaaS) destiné aux exploitations agricoles, coopératives, PME agroalimentaires et agro-industriels en Afrique francophone et anglophone.

MODULES DISPONIBLES: Dashboard analytique, Gestion des cultures, Élevage, Pisciculture, Gestion des stocks & intrants, Achats & fournisseurs, Ventes & facturation, Exportation & traçabilité, Comptabilité & trésorerie, Budget & prévisions, RH & paie, Planning culturel, Cartographie des parcelles, Météo & IA agricole, Rapports & analytics, Administration.

TARIFS (XOF/mois HT):
- Starter: 11 900 XOF/mois (annuel: 9 900 XOF/mois) — 1 exploitation, 3 utilisateurs
- Pro: 24 900 XOF/mois (annuel: 20 900 XOF/mois) — 3 exploitations, 10 utilisateurs
- Business: 39 900 XOF/mois (annuel: 33 200 XOF/mois) — 10 exploitations, utilisateurs illimités
- Entreprise: 99 900 XOF/mois (annuel: 83 200 XOF/mois) — exploitations illimitées, fonctionnalités sur mesure

CONTACT: agrifrik@ibigsoft.com | +225 27 22 27 60 14 | ibigsoft.com

RÈGLES STRICTES:
- Ne jamais inventer des fonctionnalités, certifications, clients, partenaires ou chiffres
- Ne jamais donner de conseils financiers ou d'investissement
- Pour les questions techniques avancées, rediriger vers le support: support@agrifrik.com
- Rester professionnel, concis et utile
- Répondre dans la même langue que l'utilisateur (français ou anglais)`;

export async function POST(req: NextRequest) {
  try {
    const { messages, lang } = await req.json();
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ message: lang === "fr"
        ? "Le service IA n'est pas encore configuré. Contactez-nous à agrifrik@ibigsoft.com"
        : "AI service not configured yet. Contact us at agrifrik@ibigsoft.com"
      });
    }

    const chatMessages = messages.map((m: { role: string; content: string }) => ({
      role: m.role,
      content: m.content,
    }));

    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama3-8b-8192",
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...chatMessages],
        max_tokens: 512,
        temperature: 0.7,
      }),
    });

    if (!res.ok) {
      throw new Error(`Groq API error: ${res.status}`);
    }

    const data = await res.json();
    const message = data.choices?.[0]?.message?.content || "";
    return NextResponse.json({ message });
  } catch (err) {
    console.error("SARA API error:", err);
    return NextResponse.json({ message: "Une erreur est survenue. Veuillez réessayer." }, { status: 500 });
  }
}
