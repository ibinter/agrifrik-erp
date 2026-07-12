import Link from "next/link";
import Image from "next/image";

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#F9FAFB" }}>
      <header style={{ backgroundColor: "#1B5E20" }} className="py-4 px-6">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.png" alt="AGRIFRIK" width={36} height={36} className="rounded-lg" />
            <span className="font-extrabold text-white text-lg tracking-widest">AGRIFRIK</span>
            <span className="text-xs font-bold tracking-[0.2em]" style={{ color: "#E65100" }}>ERP</span>
          </Link>
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        {children}
      </main>
      <footer className="text-center py-8 text-sm text-gray-400">
        © 2026 AGRIFRIK ERP — <a href="https://ibigsoft.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-600">IBIG Soft SARL</a>
        {" · "}
        <Link href="/mentions-legales" className="hover:text-gray-600">Mentions légales</Link>
        {" · "}
        <Link href="/politique-confidentialite" className="hover:text-gray-600">Confidentialité</Link>
        {" · "}
        <Link href="/politique-cookies" className="hover:text-gray-600">Cookies</Link>
      </footer>
    </div>
  );
}
