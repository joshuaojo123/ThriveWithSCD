"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

type UserRole = "member" | "professional" | "admin";

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
};

type AuthContextValue = {
  user: User | null;
  hydrated: boolean;
  login: (email: string, password: string) => void;
  signup: (name: string, email: string, password: string) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem("thrive-auth-user");
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch {
      // ignore storage errors
    } finally {
      setHydrated(true);
    }
  }, []);

  const login = (email: string, password: string) => {
    if (!email || !password) {
      throw new Error("Please enter your email and password.");
    }

    const role: UserRole = email.includes("admin")
      ? "admin"
      : email.includes("doctor") || email.includes("care")
      ? "professional"
      : "member";
    const nextUser: User = {
      id: crypto.randomUUID(),
      name: email.split("@")[0].replace(/[._-]/g, " "),
      email,
      role,
    };

    setUser(nextUser);
    window.localStorage.setItem("thrive-auth-user", JSON.stringify(nextUser));
  };

  const signup = (name: string, email: string, password: string) => {
    if (!name || !email || !password) {
      throw new Error("Please complete all fields.");
    }

    const nextUser: User = {
      id: crypto.randomUUID(),
      name,
      email,
      role: "member",
    };

    setUser(nextUser);
    window.localStorage.setItem("thrive-auth-user", JSON.stringify(nextUser));
  };

  const logout = () => {
    setUser(null);
    window.localStorage.removeItem("thrive-auth-user");
  };

  const updateUser = (updates: Partial<User>) => {
    setUser((current) => {
      if (!current) return null;
      const next = { ...current, ...updates };
      window.localStorage.setItem("thrive-auth-user", JSON.stringify(next));
      return next;
    });
  };

  const value = useMemo(
    () => ({ user, hydrated, login, signup, logout, updateUser }),
    [user, hydrated],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
