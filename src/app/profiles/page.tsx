"use client";

import Link from "next/link";
import { SiteShell } from "@/components/site-shell";
import { useCommunity } from "@/context/community-context";
import { useAuth } from "@/context/auth-context";

export default function ProfilesPage() {
  const { profiles } = useCommunity();
  const { hydrated, user } = useAuth();

  if (!hydrated) {
    return null;
  }

  return (
    <SiteShell title="Profiles" description="Explore verified community members, mentors, and professionals.">
      <div className="space-y-6">
        <section className="grid gap-6 xl:grid-cols-3">
          {profiles.map((profile) => (
            <Link
              key={profile.id}
              href={`/users/${profile.id}`}
              className="group overflow-hidden rounded-[2rem] border border-white/80 bg-slate-50 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative h-40 bg-slate-200">
                <img src={profile.banner} alt={`${profile.name} banner`} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent" />
              </div>
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <img src={profile.avatar} alt={profile.name} className="h-16 w-16 rounded-[1.5rem] border-4 border-white object-cover shadow-sm" />
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-700">{profile.role}</p>
                    <h3 className="mt-2 text-2xl font-semibold text-slate-950">{profile.name}</h3>
                    <p className="text-sm text-slate-500">@{profile.username}</p>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-7 text-slate-600">{profile.headline}</p>
                <div className="mt-4 flex flex-wrap gap-2 text-sm text-slate-600">
                  <span className="rounded-full bg-white px-3 py-2">{profile.followers.length} followers</span>
                  <span className="rounded-full bg-white px-3 py-2">{profile.following.length} following</span>
                </div>
                <p className="mt-4 text-sm text-slate-500">{profile.location}</p>
              </div>
            </Link>
          ))}
        </section>
      </div>
    </SiteShell>
  );
}
