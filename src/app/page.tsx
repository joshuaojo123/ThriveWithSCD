"use client";

import Link from "next/link";
import { useMemo } from "react";
import { SiteShell } from "@/components/site-shell";
import { useAuth } from "@/context/auth-context";
import { useCommunity } from "@/context/community-context";

export default function Home() {
  const { user } = useAuth();
  const { posts, profiles } = useCommunity();

  const recentPosts = useMemo(() => posts.slice(0, 4), [posts]);
  const recommended = useMemo(() => profiles.slice(0, 5), [profiles]);

  return (
    <SiteShell title="Home" description="Your personalized ThriveWithSCD feed for healthcare stories, training, community moments, and innovation.">
      <div className="space-y-6">
        <div className="rounded-[2.5rem] border border-white/80 bg-gradient-to-br from-violet-50 via-white to-emerald-50 p-8 shadow-[0_32px_90px_rgba(15,23,42,0.08)]">
          <div className="grid gap-6 lg:grid-cols-[1.5fr_0.9fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-violet-700">ThriveWithSCD feed</p>
              <h1 className="mt-4 text-4xl font-semibold text-slate-950">A modern social network for warriors, care partners, and health experts.</h1>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">
                Dive into community stories, discover educational posts, and connect with trusted professionals—designed to feel premium and purposeful.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Link href="/community" className="rounded-full bg-violet-700 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-200/50 transition hover:bg-violet-800">
                Explore the feed
              </Link>
              <Link href="/profiles" className="rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100">
                Discover people
              </Link>
            </div>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.7fr_0.9fr]">
          <section className="space-y-6">
            {recentPosts.map((post) => (
              <article key={post.id} className="rounded-[2rem] border border-white/80 bg-white/95 p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-slate-950">{profiles.find((profile) => profile.id === post.authorId)?.name || "Community member"}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.24em] text-slate-400">{new Date(post.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="rounded-full bg-slate-100 px-3 py-2 text-xs uppercase tracking-[0.24em] text-slate-500">
                    {post.postType}
                  </div>
                </div>
                <p className="mt-5 text-sm leading-7 text-slate-700">{post.content}</p>
                {post.media?.length ? (
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {post.media.map((item) => (
                      <div key={item.src} className="overflow-hidden rounded-[1.75rem] bg-slate-100">
                        {item.type === "image" ? (
                          <img src={item.src} alt={item.alt} className="h-52 w-full object-cover" />
                        ) : (
                          <video controls src={item.src} className="h-52 w-full object-cover" />
                        )}
                      </div>
                    ))}
                  </div>
                ) : null}
                <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-slate-600">
                  <span>❤ {post.likes.length}</span>
                  <span>💬 {post.comments.length}</span>
                  <span>🔁 {post.shareCount}</span>
                </div>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Link href="/community" className="rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100">
                    View discussion
                  </Link>
                  <Link href={`/users/${post.authorId}`} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
                    View profile
                  </Link>
                </div>
              </article>
            ))}
          </section>

          <aside className="space-y-6">
            <div className="rounded-[2rem] border border-white/80 bg-white/95 p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-violet-700">Community highlights</p>
              <div className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
                <div className="rounded-[1.5rem] bg-violet-50 p-4">Wellness posts, mentorship invitations, and research updates in one connected experience.</div>
                <div className="rounded-[1.5rem] bg-emerald-50 p-4">Find profiles that match your journey, from warriors to healthcare professionals.</div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/80 bg-white/95 p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-700">Recommended people</p>
                <Link href="/profiles" className="text-sm font-semibold text-violet-700">See all</Link>
              </div>
              <div className="mt-4 space-y-3">
                {recommended.map((profile) => (
                  <Link
                    key={profile.id}
                    href={`/users/${profile.id}`}
                    className="flex items-center gap-3 rounded-[1.75rem] border border-slate-200 bg-slate-50 p-4 transition hover:bg-violet-50"
                  >
                    <img src={profile.avatar} alt={profile.name} className="h-12 w-12 rounded-[1.5rem] object-cover" />
                    <div>
                      <p className="text-sm font-semibold text-slate-950">{profile.name}</p>
                      <p className="text-sm text-slate-600">@{profile.username}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/80 bg-white/95 p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-violet-700">Quick actions</p>
              <div className="mt-4 grid gap-3">
                <Link href="/community" className="rounded-full bg-violet-700 px-4 py-3 text-sm font-semibold text-white text-center transition hover:bg-violet-800">
                  Join the conversation
                </Link>
                <Link href="/messages" className="rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 text-center transition hover:bg-slate-100">
                  Open messages
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </SiteShell>
  );
}

