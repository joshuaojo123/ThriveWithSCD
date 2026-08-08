"use client";

import { SiteShell } from "@/components/site-shell";

export default function MyStoriesPage() {
  return (
    <SiteShell title="My Stories" description="Showcase your experiences, insights, and achievements with the Thrive community.">
      <div className="surface-card p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-violet-400">Your story library</p>
        <p className="mt-3 text-sm leading-7 text-slate-300">Publish your journey, manage drafts, and share wellness milestones with your network.</p>
      </div>
    </SiteShell>
  );
}
