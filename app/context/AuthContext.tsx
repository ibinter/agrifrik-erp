"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  id: string;
  nom: string;
  email: string;
  role: string;
  exploitation: string;
  avatar: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("agrifrik_user");
    if (stored) setUser(JSON.parse(stored));
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.success) {
        setUser(data.user);
        localStorage.setItem("agrifrik_user", JSON.stringify(data.user));
        localStorage.setItem("agrifrik_token", data.token);
        return { success: true };
      }
      return { success: false, message: data.message };
    } catch {
      return { success: false, message: "Erreur de connexion au serveur" };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("agrifrik_user");
    localStorage.removeItem("agrifrik_token");
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
