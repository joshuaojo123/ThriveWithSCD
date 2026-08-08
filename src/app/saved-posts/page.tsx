"use client";

import { SiteShell } from "@/components/site-shell";

export default function SavedPostsPage() {
  return (
    <SiteShell title="Saved Posts" description="Keep track of the posts, resources, and stories you want to revisit later.">
      <div className="surface-card p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-violet-400">Saved items</p>
        <p className="mt-3 text-sm leading-7 text-slate-300">Saved posts will appear here once you mark them in the feed.</p>
      </div>
    </SiteShell>
  );
}
