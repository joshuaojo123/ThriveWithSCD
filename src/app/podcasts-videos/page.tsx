"use client";

import { SiteShell } from "@/components/site-shell";

export default function PodcastsVideosPage() {
  return (
    <SiteShell title="Podcasts & Videos" description="Discover audio and video content for education, symptom support, and community stories.">
      <div className="space-y-6">
        <div className="rounded-[2rem] border border-white/70 bg-white/95 p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-violet-700">Featured media</p>
          <h1 className="mt-4 text-2xl font-semibold text-slate-950">Play the latest ThriveWithSCD conversations.</h1>
          <p className="mt-3 text-sm leading-7 text-slate-600">Browse curated episodes, expert interviews, and community stories designed to inform and inspire.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6">
            <p className="text-sm font-semibold text-slate-900">Live episode: Care strategies</p>
            <p className="mt-3 text-sm text-slate-600">A conversation with clinicians and community leaders about day-to-day support.</p>
          </div>
          <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6">
            <p className="text-sm font-semibold text-slate-900">Video: Community spotlight</p>
            <p className="mt-3 text-sm text-slate-600">Hear from SCD champions and caregivers who are building resilient care systems.</p>
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
