"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";
import {
  LayoutDashboard, Building2, CreditCard, Key, Ticket,
  Package, LogOut, Settings, Activity, Mail, Shield,
} from "lucide-react";

const NAV = [
  { label: "Dashboard",      href: "/superadmin",                icon: LayoutDashboard },
  { label: "Organisations",  href: "/superadmin/organisations",  icon: Building2 },
  { label: "Licences",       href: "/superadmin/licences",       icon: Key },
  { label: "Paiements",      href: "/superadmin/paiements",      icon: CreditCard },
  { label: "Vouchers",       href: "/superadmin/vouchers",       icon: Ticket },
  { label: "Plans",          href: "/superadmin/plans",          icon: Package },
  { label: "Emails",         href: "/superadmin/emails",         icon: Mail },
  { label: "Activité",       href: "/superadmin/activite",       icon: Activity },
  { label: "Paramètres",     href: "/superadmin/parametres",     icon: Settings },
];

export default function SuperadminLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (user && user.role !== "superadmin") {
      router.replace("/dashboard");
    }
  }, [user, router]);

  if (!user || user.role !== "superadmin") return null;

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: "#0A0F0A" }}>
      {/* Sidebar superadmin — thème sombre distinct */}
      <aside className="w-56 flex-shrink-0 flex flex-col" style={{ backgroundColor: "#0D1A0D", borderRight: "1px solid #1a2f1a" }}>
        {/* Logo */}
        <div className="px-5 py-5 border-b" style={{ borderColor: "#1a2f1a" }}>
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-lg font-black" style={{ color: "#4CAF50" }}>IBIG</span>
            <span className="text-xs font-bold px-1.5 py-0.5 rounded" style={{ backgroundColor: "#E65100", color: "white" }}>SUPER</span>
          </div>
          <p className="text-[10px]" style={{ color: "#4a6a4a" }}>Console Superadmin</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 px-2 space-y-0.5">
          {NAV.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href || (item.href !== "/superadmin" && pathname.startsWith(item.href));
            return (
              <Link key={item.href} href={item.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all"
                style={{
                  backgroundColor: active ? "rgba(76,175,80,0.15)" : "transparent",
                  color: active ? "#4CAF50" : "#6a8a6a",
                  fontWeight: active ? 600 : 400,
                }}>
                <Icon size={15} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* User + logout */}
        <div className="p-4 border-t" style={{ borderColor: "#1a2f1a" }}>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold" style={{ backgroundColor: "#E65100", color: "white" }}>
              <Shield size={12} />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold truncate" style={{ color: "#c8e6c9" }}>{user.prenom} {user.nom}</p>
              <p className="text-[10px]" style={{ color: "#4a6a4a" }}>Superadmin</p>
            </div>
          </div>
          <button onClick={() => { logout(); router.push("/login"); }}
            className="flex items-center gap-2 text-xs w-full px-2 py-1.5 rounded-lg transition-colors"
            style={{ color: "#6a8a6a" }}>
            <LogOut size={12} /> Déconnexion
          </button>
        </div>
      </aside>

      {/* Contenu */}
      <main className="flex-1 overflow-auto" style={{ backgroundColor: "#0F1A0F" }}>
        {children}
      </main>
    </div>
  );
}
