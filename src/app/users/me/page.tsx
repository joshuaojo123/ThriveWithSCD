"use client";

import { SiteShell } from "@/components/site-shell";

export default function MyProfilePage() {
  return (
    <SiteShell title="My Profile" description="Manage your personal ThriveWithSCD presence, connections, and story highlights.">
      <div className="surface-card p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-violet-400">Your profile</p>
        <p className="mt-3 text-sm leading-7 text-slate-300">This page will be your personal profile center once you’re signed in.</p>
      </div>
    </SiteShell>
  );
}
