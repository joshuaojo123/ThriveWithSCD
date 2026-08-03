"use client";

import { SiteShell } from "@/components/site-shell";

export default function MyStoriesPage() {
  return (
    <SiteShell title="My Stories" description="Showcase your experiences, insights, and achievements with the Thrive community.">
      <div className="rounded-[2rem] border border-white/70 bg-white/95 p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-violet-700">Your story library</p>
        <p className="mt-3 text-sm leading-7 text-slate-600">Publish your journey, manage drafts, and share wellness milestones with your network.</p>
      </div>
    </SiteShell>
  );
}
