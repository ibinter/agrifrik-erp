"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Sprout, DollarSign, Bell, User } from "lucide-react";

const tabs = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Production", href: "/cultures", icon: Sprout },
  { label: "Finance", href: "/comptabilite", icon: DollarSign },
  { label: "Alertes", href: "/notifications", icon: Bell },
  { label: "Profil", href: "/parametres/profil", icon: User },
];

// Simulated unread notifications count — replace with real data source
const unreadCount = 2;

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="flex sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-lg">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive =
          pathname === tab.href || pathname.startsWith(tab.href + "/");
        const activeColor = "#2E7D32";

        return (
          <Link
            key={tab.href}
            href={tab.href}
            className="flex-1 flex flex-col items-center justify-center gap-0.5 py-2 relative"
          >
            <div className="relative">
              <Icon
                size={22}
                color={isActive ? activeColor : "#9CA3AF"}
                strokeWidth={isActive ? 2.5 : 1.8}
              />
              {tab.href === "/notifications" && unreadCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center leading-none">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </div>
            <span
              className="text-[10px] font-medium"
              style={{ color: isActive ? activeColor : "#9CA3AF" }}
            >
              {tab.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
