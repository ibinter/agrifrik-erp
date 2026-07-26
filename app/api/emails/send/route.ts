import { NextResponse } from "next/server";
import { emailTemplates } from "../../../../lib/emails/templates";

// Route interne pour envoyer des emails depuis d'autres routes API
// En production: utiliser Resend, SendGrid, ou nodemailer
// Pour l'instant: log en console + retour succès

export async function POST(req: Request) {
  const { type, to, data } = await req.json();

  if (!type || !to || !data) {
    return NextResponse.json({ error: "Paramètres manquants: type, to, data" }, { status: 400 });
  }

  const template = emailTemplates[type as keyof typeof emailTemplates];
  if (!template) {
    return NextResponse.json({ error: `Type d'email inconnu: ${type}` }, { status: 400 });
  }

  const email = (template as (d: typeof data) => { subject: string; html: string })(data);

  // TODO en production: envoyer via Resend/SendGrid/nodemailer
  // const transporter = nodemailer.createTransport({ ... })
  // await transporter.sendMail({ from: "noreply@agrifrik.com", to, ...email })

  console.log(`[EMAIL] Type: ${type} | To: ${to} | Subject: ${email.subject}`);

  return NextResponse.json({ success: true, subject: email.subject });
}
