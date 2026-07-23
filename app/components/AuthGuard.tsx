"use client";
import { useAuth } from "../context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { canAccess } from "../../lib/permissions";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isLoading) return;

    // Non connecté → login
    if (!user) {
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
      return;
    }

    // Connecté mais accès refusé → dashboard
    if (!canAccess(user.role, pathname)) {
      router.push("/dashboard?error=acces_refuse");
    }
  }, [user, isLoading, pathname, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-gray-200 border-t-[#2E7D32] rounded-full animate-spin" />
      </div>
    );
  }

  // Non connecté ou accès refusé : ne rien afficher pendant la redirection
  if (!user || !canAccess(user.role, pathname)) return null;

  return <>{children}</>;
}
