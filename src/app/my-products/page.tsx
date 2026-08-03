"use client";

import { SiteShell } from "@/components/site-shell";

export default function MyProductsPage() {
  return (
    <SiteShell title="My Products" description="Manage your product listings, service offerings, and care resources in one place.">
      <div className="rounded-[2rem] border border-white/70 bg-white/95 p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-violet-700">Product catalog</p>
        <p className="mt-3 text-sm leading-7 text-slate-600">This space is reserved for your shop items, care kits, and provider service listings.</p>
      </div>
    </SiteShell>
  );
}

