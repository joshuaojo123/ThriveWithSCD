"use client";

import { SiteShell } from "@/components/site-shell";

export default function MyProductsPage() {
  return (
    <SiteShell title="My Products" description="Manage your product listings, service offerings, and care resources in one place.">
      <div className="surface-card p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-violet-400">Product catalog</p>
        <p className="mt-3 text-sm leading-7 text-slate-300">This space is reserved for your shop items, care kits, and provider service listings.</p>
      </div>
    </SiteShell>
  );
}

