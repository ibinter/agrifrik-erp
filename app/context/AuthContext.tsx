"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import type { Role } from "../../lib/permissions";

export interface Profil {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  role: Role;
  avatarUrl: string | null;
  orgId: string;
}

interface AuthContextType {
  user: Profil | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Profil | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Vérifier la session au chargement via le cookie HTTP-only
  useEffect(() => {
    fetch("/api/auth/me", { credentials: "include" })
      .then((r) => r.json())
      .then(({ user: u }) => {
        if (u) {
          setUser({
            id: u.id,
            email: u.email,
            role: u.role as Role,
            orgId: u.orgId,
            nom: u.nom ?? "",
            prenom: u.prenom ?? "",
            avatarUrl: u.avatarUrl ?? null,
          });
        }
      })
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        return { success: false, message: data.message ?? "Email ou mot de passe incorrect" };
      }

      const u = data.user;
      setUser({
        id: u.id,
        email: u.email ?? email,
        role: (u.role as Role) ?? "operateur",
        orgId: u.organisation_id ?? u.orgId ?? "default",
        nom: u.nom ?? "",
        prenom: u.prenom ?? "",
        avatarUrl: u.avatar_url ?? u.avatarUrl ?? null,
      });

      return { success: true };
    } catch {
      return { success: false, message: "Erreur de connexion au serveur" };
    }
  };

  const logout = async () => {
    setUser(null); // Vider l'état immédiatement pour une UX fluide
    fetch("/api/auth/logout", { method: "POST", credentials: "include" }).catch(() => {});
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
