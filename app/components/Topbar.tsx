"use client";

import { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import {
  AlertTriangle,
  Bell,
  Building2,
  CheckCircle,
  ChevronDown,
  Clock,
  Info,
  Key,
  LogOut,
  Search,
  Settings,
  User,
} from "lucide-react";
import GlobalSearch from "./GlobalSearch";
import ThemeToggle from "./ThemeToggle";

interface TopbarProps {
  title?: string;
  breadcrumb?: string[];
}

interface Notification {
  id: number;
  level: "urgent" | "warning" | "success" | "info";
  text: string;
  timestamp: string;
  read: boolean;
}

const INITIAL_NOTIFICATIONS: Notification[] = [
  { id: 1, level: "urgent", text: "Stock semences maïs critique (<5%)", timestamp: "il y a 2h", read: false },
  { id: 2, level: "warning", text: "Parcelle B12 — Humidité anormale capteur IoT", timestamp: "il y a 4h", read: false },
  { id: 3, level: "warning", text: "Tracteur JD — Maintenance dans 3 jours", timestamp: "Aujourd'hui", read: false },
  { id: 4, level: "success", text: "Récolte cacao A1-A8 terminée — 12,4t", timestamp: "Hier", read: false },
  { id: 5, level: "info", text: "Facture AGRIINTRANT en attente validation", timestamp: "il y a 2j", read: false },
];

const notifStyles = {
  urgent: {
    dot: "bg-red-500",
    icon: <AlertTriangle size={14} className="text-red-500" />,
    badge: "bg-red-100 text-red-700",
    label: "URGENT",
  },
  warning: {
    dot: "bg-yellow-500",
    icon: <Clock size={14} className="text-yellow-500" />,
    badge: "bg-yellow-100 text-yellow-700",
    label: "ATTENTION",
  },
  success: {
    dot: "bg-green-500",
    icon: <CheckCircle size={14} className="text-green-500" />,
    badge: null,
    label: null,
  },
  info: {
    dot: "bg-blue-500",
    icon: <Info size={14} className="text-blue-500" />,
    badge: null,
    label: null,
  },
};

export default function Topbar({ title, breadcrumb }: TopbarProps) {
  const [notifOpen, setNotifOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(INITIAL_NOTIFICATIONS);
  const [searchOpen, setSearchOpen] = useState(false);
  const { logout, user } = useAuth();
  const router = useRouter();

  const notifRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  // Global Ctrl+K shortcut to open search
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((v) => !v);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleMouseDown(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
      if (userRef.current && !userRef.current.contains(e.target as Node)) {
        setUserOpen(false);
      }
    }
    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, []);

  function toggleNotif() {
    setNotifOpen((v) => !v);
    setUserOpen(false);
  }

  function toggleUser() {
    setUserOpen((v) => !v);
    setNotifOpen(false);
  }

  function markRead(id: number) {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  }

  function markAllRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="h-14 sm:h-16 flex items-center justify-between pl-14 lg:pl-6 pr-4 sm:pr-6 bg-white border-b border-gray-100 sticky top-0 z-30">
      {/* Left: title + breadcrumb */}
      <div className="min-w-0 flex-1 mr-3">
        {breadcrumb && breadcrumb.length > 0 && (
          <p className="text-xs text-gray-400 mb-0.5 truncate">{breadcrumb.join(" › ")}</p>
        )}
        <h1 className="text-sm sm:text-base font-semibold text-gray-900 leading-none truncate">{title}</h1>
      </div>

      {/* Right: search + notif + user */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Search — icon on mobile, full bar on sm+ */}
        <button
          onClick={() => setSearchOpen(true)}
          className="sm:hidden w-8 h-8 rounded-xl flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-colors"
          aria-label="Rechercher"
        >
          <Search size={16} />
        </button>
        <button
          onClick={() => setSearchOpen(true)}
          className="hidden sm:flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-400 hover:bg-gray-50 w-48 lg:w-64 transition-colors"
        >
          <Search size={14} />
          <span className="hidden md:inline">Rechercher...</span>
          <span className="ml-auto text-xs bg-gray-100 px-1.5 py-0.5 rounded hidden lg:block">Ctrl+K</span>
        </button>
        <GlobalSearch isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

        {/* Theme toggle */}
        <ThemeToggle />

        {/* Notifications */}
        <div ref={notifRef} className="relative">
          <button
            onClick={toggleNotif}
            className="relative w-9 h-9 rounded-xl flex items-center justify-center hover:bg-gray-100 transition-colors"
            aria-label="Notifications"
          >
            <Bell size={18} className="text-gray-500" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#E65100]" />
            )}
          </button>

          {notifOpen && (
            <div className="absolute right-0 mt-2 w-80 max-w-[calc(100vw-2rem)] bg-white shadow-xl rounded-2xl z-50 border border-gray-100 overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-gray-900">Notifications</span>
                  {unreadCount > 0 && (
                    <span className="text-xs font-medium bg-[#2E7D32] text-white rounded-full px-2 py-0.5">
                      {unreadCount} nouvelles
                    </span>
                  )}
                </div>
                <button
                  onClick={markAllRead}
                  className="text-xs text-[#2E7D32] hover:underline font-medium"
                >
                  Tout marquer lu
                </button>
              </div>

              {/* List */}
              <ul className="divide-y divide-gray-50">
                {notifications.map((notif) => {
                  const style = notifStyles[notif.level];
                  return (
                    <li
                      key={notif.id}
                      onClick={() => markRead(notif.id)}
                      className={`flex items-start gap-3 px-4 py-3 cursor-pointer transition-colors ${
                        notif.read ? "bg-white" : "bg-green-50/40"
                      } hover:bg-gray-50`}
                    >
                      <div className="mt-0.5 shrink-0">{style.icon}</div>
                      <div className="flex-1 min-w-0">
                        {style.badge && style.label && (
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded mr-1 ${style.badge}`}>
                            {style.label}
                          </span>
                        )}
                        <span className="text-xs text-gray-700">{notif.text}</span>
                        <p className="text-[10px] text-gray-400 mt-0.5">{notif.timestamp}</p>
                      </div>
                      {!notif.read && (
                        <div className={`w-2 h-2 rounded-full mt-1 shrink-0 ${style.dot}`} />
                      )}
                    </li>
                  );
                })}
              </ul>

              {/* Footer */}
              <div className="px-4 py-2.5 border-t border-gray-100 text-center">
                <a
                  href="/notifications"
                  className="text-xs text-[#2E7D32] hover:underline font-medium"
                >
                  Voir toutes les notifications →
                </a>
              </div>
            </div>
          )}
        </div>

        {/* User menu */}
        <div ref={userRef} className="relative">
          <button
            onClick={toggleUser}
            className="flex items-center gap-2 px-2 py-1.5 rounded-xl hover:bg-gray-100 transition-colors"
            aria-label="Menu utilisateur"
          >
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
              style={{ backgroundColor: "#2E7D32" }}
            >
              {user ? `${user.prenom?.[0] ?? ""}${user.nom?.[0] ?? ""}`.toUpperCase() || "JK" : "JK"}
            </div>
            <ChevronDown
              size={14}
              className={`text-gray-400 transition-transform ${userOpen ? "rotate-180" : ""}`}
            />
          </button>

          {userOpen && (
            <div className="absolute right-0 mt-2 w-56 max-w-[calc(100vw-2rem)] bg-white shadow-xl rounded-2xl z-50 border border-gray-100 overflow-hidden">
              {/* User header */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
                  style={{ backgroundColor: "#2E7D32" }}
                >
                  {user ? `${user.prenom?.[0] ?? ""}${user.nom?.[0] ?? ""}`.toUpperCase() || "JK" : "JK"}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">{user?.nom ?? "Jean-Baptiste Koffi"}</p>
                  <p className="text-xs text-gray-400 truncate">{user?.role ?? "Administrateur"}</p>
                </div>
              </div>

              {/* Menu items */}
              <div className="py-1">
                <MenuItem href="/parametres/profil" icon={<User size={14} />} label="Mon profil" />
                <MenuItem href="/exploitations" icon={<Building2 size={14} />} label="Mon exploitation" />
                <MenuItem href="/parametres/preferences" icon={<Settings size={14} />} label="Préférences" />
                <MenuItem href="/parametres/securite" icon={<Key size={14} />} label="Sécurité" />
              </div>

              <div className="border-t border-gray-100 py-1">
                <button
                  onClick={() => { logout(); router.push("/login"); }}
                  className="flex items-center gap-3 px-4 py-2 text-sm transition-colors text-red-500 hover:bg-red-50 w-full text-left"
                >
                  <span className="shrink-0"><LogOut size={14} /></span>
                  Se déconnecter
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

function MenuItem({
  href,
  icon,
  label,
  danger,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  danger?: boolean;
}) {
  return (
    <a
      href={href}
      className={`flex items-center gap-3 px-4 py-2 text-sm transition-colors ${
        danger
          ? "text-red-500 hover:bg-red-50"
          : "text-gray-700 hover:bg-gray-50"
      }`}
    >
      <span className="shrink-0">{icon}</span>
      {label}
    </a>
  );
}
