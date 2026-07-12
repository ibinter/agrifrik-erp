"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";
import { useLang } from "./LanguageProvider";
import { t } from "./translations";

const links = [
  { key: "fonctionnalites", href: "#fonctionnalites" },
  { key: "modules", href: "#modules" },
  { key: "tarifs", href: "#tarifs" },
  { key: "demo", href: "#demo" },
  { key: "aide", href: "#aide" },
] as const;

export default function Navbar() {
  const { lang } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header
      className="sticky top-0 z-40 transition-all duration-300"
      style={{
        backgroundColor: scrolled ? "rgba(27,94,32,0.97)" : "#1B5E20",
        backdropFilter: scrolled ? "blur(8px)" : "none",
        boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.25)" : "none",
        padding: scrolled ? "0" : "0",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <Image src="/logo.png" alt="AGRIFRIK" width={36} height={36} className="rounded-lg" />
          <div className="leading-none">
            <div className="text-white font-extrabold text-base tracking-widest">AGRIFRIK</div>
            <div className="text-xs font-bold tracking-[0.25em]" style={{ color: "#E65100" }}>ERP</div>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-7">
          {links.map(({ key, href }) => (
            <a key={key} href={href}
              className="text-sm font-medium text-green-100 hover:text-white transition-colors">
              {t.nav[key as keyof typeof t.nav][lang]}
            </a>
          ))}
        </nav>

        {/* CTAs */}
        <div className="hidden lg:flex items-center gap-3">
          <Link href="/login"
            className="px-4 py-2 rounded-xl text-sm font-semibold text-white border border-white/30 hover:bg-white/10 transition-colors">
            {t.nav.connexion[lang]}
          </Link>
          <Link href="/login"
            className="px-4 py-2 rounded-xl text-sm font-bold transition-all hover:scale-105 hover:shadow-lg"
            style={{ backgroundColor: "#E65100", color: "white" }}>
            {t.nav.essai[lang]}
          </Link>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="lg:hidden text-white p-1">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden border-t border-white/10" style={{ backgroundColor: "#1B5E20" }}>
          <div className="px-4 py-4 flex flex-col gap-3">
            {links.map(({ key, href }) => (
              <a key={key} href={href} onClick={() => setOpen(false)}
                className="text-sm font-medium text-green-100 hover:text-white py-1">
                {t.nav[key as keyof typeof t.nav][lang]}
              </a>
            ))}
            <div className="flex flex-col gap-2 pt-3 border-t border-white/10">
              <Link href="/login" onClick={() => setOpen(false)}
                className="text-center px-4 py-2.5 rounded-xl text-sm font-semibold text-white border border-white/30">
                {t.nav.connexion[lang]}
              </Link>
              <Link href="/login" onClick={() => setOpen(false)}
                className="text-center px-4 py-2.5 rounded-xl text-sm font-bold"
                style={{ backgroundColor: "#E65100", color: "white" }}>
                {t.nav.essai[lang]}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
