"use client";

import { SiteShell } from "@/components/site-shell";

export default function PrivacyPage() {
  return (
    <SiteShell title="Privacy" description="Manage your privacy settings and control how your information is shared.">
      <div className="surface-card p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-violet-400">Privacy controls</p>
        <p className="mt-3 text-sm leading-7 text-slate-300">Adjust your data sharing preferences and connection visibility across ThriveWithSCD.</p>
      </div>
    </SiteShell>
  );
}
