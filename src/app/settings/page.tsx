"use client";

import { SiteShell } from "@/components/site-shell";

export default function SettingsPage() {
  return (
    <SiteShell title="Settings" description="Update your platform preferences, notification settings, and privacy controls.">
      <div className="rounded-[2rem] border border-white/70 bg-white/95 p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-violet-700">Account settings</p>
        <p className="mt-3 text-sm leading-7 text-slate-600">Control your ThriveWithSCD experience from one centralized place.</p>
      </div>
    </SiteShell>
  );
}
