"use client";
import Link from "next/link";
import Image from "next/image";
import { ExternalLink, Mail, Phone } from "lucide-react";
import { useLang } from "./LanguageProvider";
import { t } from "./translations";

export default function Footer() {
  const { lang } = useLang();
  const f = t.footer;

  const col = (title: string, links: { label: string; href: string; external?: boolean }[]) => (
    <div>
      <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">{title}</h4>
      <ul className="space-y-2.5">
        {links.map((l, i) => (
          <li key={i}>
            {l.external ? (
              <a href={l.href} target="_blank" rel="noopener noreferrer"
                className="text-sm text-gray-500 hover:text-white transition-colors flex items-center gap-1">
                {l.label}<ExternalLink size={10} className="opacity-50" />
              </a>
            ) : (
              <Link href={l.href} className="text-sm text-gray-500 hover:text-white transition-colors">{l.label}</Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <footer style={{ backgroundColor: "#0C1F0F", color: "white" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10 mb-12">
          {/* Identity */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Image src="/logo.png" alt="AGRIFRIK" width={40} height={40} className="rounded-xl" />
              <div>
                <div className="font-extrabold text-lg tracking-widest">AGRIFRIK</div>
                <div className="text-xs font-bold tracking-[0.25em]" style={{ color: "#E65100" }}>ERP</div>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-6 max-w-xs">{f.tagline[lang]}</p>
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
              <Phone size={12} /><a href="tel:+2252722276014" className="hover:text-white transition-colors">+225 27 22 27 60 14</a>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
              <Phone size={12} /><a href="tel:+2250555059901" className="hover:text-white transition-colors">+225 05 55 05 99 01</a>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Mail size={12} /><a href="mailto:agrifrik@ibigsoft.com" className="hover:text-white transition-colors">agrifrik@ibigsoft.com</a>
            </div>
          </div>

          {col(lang === "fr" ? "Navigation" : "Navigation", [
            { label: lang === "fr" ? "Accueil" : "Home", href: "/" },
            { label: lang === "fr" ? "Fonctionnalités" : "Features", href: "#fonctionnalites" },
            { label: "Modules", href: "#modules" },
            { label: lang === "fr" ? "Tarifs" : "Pricing", href: "#tarifs" },
            { label: lang === "fr" ? "Démonstration" : "Demo", href: "#demo" },
            { label: lang === "fr" ? "Connexion" : "Login", href: "/login" },
          ])}

          {col(lang === "fr" ? "Ressources" : "Resources", [
            { label: lang === "fr" ? "Centre d'aide" : "Help center", href: "#aide" },
            { label: "FAQ", href: "#aide" },
            { label: lang === "fr" ? "Tutoriels" : "Tutorials", href: "#" },
            { label: lang === "fr" ? "Documentation" : "Documentation", href: "#" },
            { label: lang === "fr" ? "Nouveautés" : "What's new", href: "#" },
            { label: "Blog", href: "#" },
          ])}

          {col("IBIG Soft", [
            { label: lang === "fr" ? "À propos d'IBIG Soft" : "About IBIG Soft", href: "https://ibigsoft.com", external: true },
            { label: lang === "fr" ? "Autres logiciels" : "Other software", href: "https://ibigsoft.com", external: true },
            { label: lang === "fr" ? "Devenir partenaire" : "Become a partner", href: "https://ibigpartners.com/", external: true },
            { label: "IBIG PARTNERS", href: "https://ibigpartners.com/", external: true },
            { label: "Support", href: "mailto:support@agrifrik.com" },
            { label: lang === "fr" ? "Contact" : "Contact", href: "mailto:agrifrik@ibigsoft.com" },
          ])}

          {col(lang === "fr" ? "Légal" : "Legal", [
            { label: lang === "fr" ? "Mentions légales" : "Legal notice", href: "/mentions-legales" },
            { label: lang === "fr" ? "CGU" : "Terms of use", href: "/cgu" },
            { label: lang === "fr" ? "Confidentialité" : "Privacy", href: "/politique-confidentialite" },
            { label: "Cookies", href: "/politique-cookies" },
            { label: lang === "fr" ? "Propriété intellectuelle" : "IP rights", href: "/mentions-legales" },
            { label: lang === "fr" ? "Résiliation" : "Cancellation", href: "#" },
          ])}
        </div>

        <div className="border-t pt-8 flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
          <div className="text-center md:text-left">
            <p className="text-xs text-gray-500 mb-1">{f.copyright[lang]}</p>
            <p className="text-xs text-gray-600">{f.credit[lang]}</p>
          </div>
          <a href="https://ibigsoft.com" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-colors"
            style={{ backgroundColor: "rgba(255,255,255,0.06)", color: "#9CA3AF" }}>
            Découvrir l'éditeur IBIG Soft
            <ExternalLink size={10} />
          </a>
        </div>
      </div>
    </footer>
  );
}
