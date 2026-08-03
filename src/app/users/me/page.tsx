"use client";

import { SiteShell } from "@/components/site-shell";

export default function MyProfilePage() {
  return (
    <SiteShell title="My Profile" description="Manage your personal ThriveWithSCD presence, connections, and story highlights.">
      <div className="rounded-[2rem] border border-white/70 bg-white/95 p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-violet-700">Your profile</p>
        <p className="mt-3 text-sm leading-7 text-slate-600">This page will be your personal profile center once you’re signed in.</p>
      </div>
    </SiteShell>
  );
}
