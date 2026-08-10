"use client";

import { useMemo } from "react";
import { SiteShell } from "@/components/site-shell";
import { useTheme } from "@/context/theme-context";

const settingsSections = [
  { id: "account", title: "Account", description: "Personal details, profile settings, and security options." },
  { id: "appearance", title: "Appearance", description: "Control themes, colors, and platform display preferences." },
  { id: "privacy", title: "Privacy", description: "Manage your data visibility, connection preferences, and profile settings." },
  { id: "notifications", title: "Notifications", description: "Tune what updates and alerts you receive from ThriveWithSCD." },
  { id: "security", title: "Security", description: "Protect your account with authentication and session settings." },
  { id: "messages", title: "Messages", description: "Manage your chat experience and message preferences." },
  { id: "ai", title: "AI Preferences", description: "Configure how ThriveAI helps you across the platform." },
];

export default function SettingsPage() {
  const { theme, setTheme, resolvedTheme } = useTheme();

  const currentSection = useMemo(() => settingsSections[1], []);

  return (
    <SiteShell title="Settings" description="Update your platform preferences, notification settings, and privacy controls.">
      <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <aside className="surface-card p-6 ring-1 ring-violet-500/10 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-violet-400">Settings categories</p>
          <div className="mt-6 space-y-3">
            {settingsSections.map((section) => (
              <button
                key={section.id}
                type="button"
                className={`w-full rounded-[1.5rem] border px-4 py-4 text-left transition ${
                  section.id === currentSection.id
                    ? "border-violet-500 bg-[#111827] text-white shadow-[0_16px_40px_-20px_rgba(124,58,237,0.55)]"
                    : "border-slate-800 bg-[#0d1018] text-slate-200 hover:border-violet-500 hover:bg-[#111827]"
                }`}
              >
                <p className="font-semibold">{section.title}</p>
                <p className="mt-1 text-sm text-slate-400">{section.description}</p>
              </button>
            ))}
          </div>
        </aside>

        <section className="surface-card p-6">
          <div className="rounded-[1.75rem] border border-slate-800 bg-[#111827] p-6 shadow-sm">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-violet-400">Appearance</p>
              <h2 className="mt-3 text-2xl font-semibold text-white">Theme settings</h2>
              <p className="mt-3 text-sm leading-7 text-slate-300">Choose a light, dark, or system theme. Your selection is saved for your next visit.</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {(["light", "dark", "system"] as const).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setTheme(mode)}
                  className={`rounded-[1.5rem] border p-5 text-left transition duration-200 ${
                    theme === mode
                      ? "border-violet-400 bg-[#0f172a] text-white shadow-[0_16px_40px_-20px_rgba(124,58,237,0.55)]"
                      : "border-slate-800 bg-[#111827] text-slate-200 hover:border-violet-400 hover:bg-[#161f33]"
                  }`}
                >
                  <p className="text-sm font-semibold capitalize">{mode}</p>
                  <p className="mt-2 text-sm text-slate-400">{mode === "system" ? "Use device theme." : mode === "dark" ? "Deep, premium dark mode." : "Bright, clean light mode."}</p>
                </button>
              ))}
            </div>

            <div className="mt-6 surface-panel border border-slate-800 p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-400">Current theme</p>
              <p className="mt-3 text-sm text-slate-300">Theme mode: <span className="font-semibold text-white">{theme}</span></p>
              <p className="mt-2 text-sm text-slate-400">Resolved theme: <span className="font-semibold text-white">{resolvedTheme}</span></p>
            </div>
          </div>
        </section>
      </div>
    </SiteShell>
  );
}
