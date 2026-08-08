"use client";

import Link from "next/link";
import { SiteShell } from "@/components/site-shell";
import { useCommunity } from "@/context/community-context";
import { useAuth } from "@/context/auth-context";

export default function ProfilesPage() {
  const { profiles, followUser, unfollowUser } = useCommunity();
  const { hydrated, user } = useAuth();

  if (!hydrated) {
    return null;
  }

  return (
    <SiteShell title="Profiles" description="Explore verified community members, mentors, and professionals.">
      <div className="space-y-6">
        <section className="grid gap-6 xl:grid-cols-3">
          {profiles.map((profile) => {
            const isSelf = user?.id === profile.id;
            const isFollowing = user ? profile.followers?.includes(user.id) ?? false : false;
            return (
              <Link
                key={profile.id}
                href={`/users/${profile.id}`}
                className="group overflow-hidden surface-card transition hover:-translate-y-1"
              >
                <div className="relative h-40 bg-slate-900">
                  <img src={profile.banner} alt={`${profile.name} banner`} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent" />
                </div>
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <img src={profile.avatar} alt={profile.name} className="h-16 w-16 rounded-[1.5rem] border-4 border-white object-cover" />
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-400">{profile.role}</p>
                      <h3 className="mt-2 text-2xl font-semibold text-white">{profile.name}</h3>
                      <p className="text-sm text-slate-400">@{profile.username}</p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-slate-300">{profile.headline}</p>
                  <div className="mt-4 flex flex-wrap gap-2 text-sm text-slate-300">
                    <span className="pill-chip bg-slate-950 text-slate-300">{profile.followers.length} followers</span>
                    <span className="pill-chip bg-slate-950 text-slate-300">{profile.following.length} following</span>
                  </div>
                  <p className="mt-4 text-sm text-slate-400">{profile.location}</p>

                  <div className="mt-4">
                    {isSelf ? (
                      <span className="text-xs font-semibold text-violet-400">Your profile</span>
                    ) : user ? (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          isFollowing ? unfollowUser(profile.id) : followUser(profile.id);
                        }}
                        className={`rounded-full px-3 py-2 text-sm font-semibold ${isFollowing ? "btn-muted" : "btn-primary"}`}
                      >
                        {isFollowing ? "Following" : "Follow"}
                      </button>
                    ) : null}
                  </div>
                </div>
              </Link>
            );
          })}
        </section>
      </div>
    </SiteShell>
  );
}
