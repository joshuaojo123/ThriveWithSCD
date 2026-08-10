"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type ThemeMode = "light" | "dark" | "system";

type ThemeContextValue = {
  theme: ThemeMode;
  resolvedTheme: "light" | "dark";
  setTheme: (theme: ThemeMode) => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);
const STORAGE_KEY = "thrive-theme-v1";

function resolveTheme(theme: ThemeMode, prefersDark: boolean) {
  if (theme === "system") {
    return prefersDark ? "dark" : "light";
  }
  return theme;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeMode>("system");
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY) as ThemeMode | null;
      if (stored === "light" || stored === "dark" || stored === "system") {
        setTheme(stored);
      }
    } catch {}
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const updateTheme = () => {
      const nextTheme = resolveTheme(theme, mediaQuery.matches);
      setResolvedTheme(nextTheme);
      document.documentElement.setAttribute("data-theme", nextTheme);
    };

    updateTheme();
    mediaQuery.addEventListener("change", updateTheme);

    return () => {
      mediaQuery.removeEventListener("change", updateTheme);
    };
  }, [theme]);

  const setThemeMode = (nextTheme: ThemeMode) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, nextTheme);
    } catch {}
    setTheme(nextTheme);
  };

  const value = useMemo(
    () => ({ theme, resolvedTheme, setTheme: setThemeMode }),
    [theme, resolvedTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}

export default ThemeProvider;
