"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "../../lib/supabase/client";
import type { User as SupabaseUser } from "@supabase/supabase-js";

interface Profil {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  role: string;
  avatar_url: string | null;
  organisation_id: string;
}

interface AuthContextType {
  user: Profil | null;
  supabaseUser: SupabaseUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Profil | null>(null);
  const [supabaseUser, setSupabaseUser] = useState<SupabaseUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Charger le profil depuis Supabase
  async function loadProfil(supaUser: SupabaseUser): Promise<Profil | null> {
    const { data, error } = await supabase
      .from("profils")
      .select("id, nom, prenom, email, role, avatar_url, organisation_id")
      .eq("id", supaUser.id)
      .single();

    if (error || !data) return null;
    return data as Profil;
  }

  useEffect(() => {
    // Session initiale
    supabase.auth.getSession().then(async ({ data: { session: s } }) => {
      if (s?.user) {
        setSupabaseUser(s.user);
        const profil = await loadProfil(s.user);
        setUser(profil);
      }
      setIsLoading(false);
    });

    // Écoute les changements d'auth
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event: string, session: import("@supabase/supabase-js").Session | null) => {
      if (session?.user) {
        setSupabaseUser(session.user);
        const profil = await loadProfil(session.user);
        setUser(profil);
      } else {
        setSupabaseUser(null);
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        // Fallback démo pour le développement
        if (
          email === process.env.NEXT_PUBLIC_DEMO_EMAIL &&
          password === process.env.NEXT_PUBLIC_DEMO_PASSWORD
        ) {
          const demoUser: Profil = {
            id: "demo-user-001",
            nom: "Koffi",
            prenom: "Jean-Baptiste",
            email: "admin@agrifrik.com",
            role: "admin",
            avatar_url: null,
            organisation_id: "demo-org-001",
          };
          setUser(demoUser);
          return { success: true };
        }
        return { success: false, message: "Email ou mot de passe incorrect" };
      }

      if (data.user) {
        setSupabaseUser(data.user);
        const profil = await loadProfil(data.user);
        setUser(profil);
        return { success: true };
      }

      return { success: false, message: "Connexion impossible" };
    } catch {
      return { success: false, message: "Erreur de connexion au serveur" };
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSupabaseUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, supabaseUser, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
