"use client";

import Link from "next/link";
import { useMemo } from "react";
import { SiteShell } from "@/components/site-shell";
import { useAuth } from "@/context/auth-context";
import { useCommunity } from "@/context/community-context";

export default function Home() {
  const { user } = useAuth();
  const { posts, profiles, followUser, unfollowUser } = useCommunity();

  const recentPosts = useMemo(() => posts.slice(0, 4), [posts]);
  const recommended = useMemo(() => profiles.slice(0, 5), [profiles]);

  return (
    <SiteShell title="Home" description="Your personalized ThriveWithSCD feed for healthcare stories, training, community moments, and innovation.">
      <div className="space-y-6">
        <div className="surface-card p-8">
          <div className="grid gap-6 lg:grid-cols-[1.5fr_0.9fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-violet-400">ThriveWithSCD feed</p>
              <h1 className="mt-4 text-4xl font-semibold text-white">A modern social network for warriors, care partners, and health experts.</h1>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300">
                Dive into community stories, discover educational posts, and connect with trusted professionals—designed to feel premium and purposeful.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Link href="/community" className="btn-primary px-6 py-3">
                Explore the feed
              </Link>
              <Link href="/profiles" className="btn-secondary px-6 py-3">
                Discover people
              </Link>
            </div>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.7fr_0.9fr]">
          <section className="space-y-6">
            {recentPosts.map((post) => {
              const author = profiles.find((profile) => profile.id === post.authorId);
              const authorId = author?.id;
              const isFollowing = user && author ? author.followers?.includes(user.id) ?? false : false;

              return (
                <article key={post.id} className="surface-card p-6 transition hover:border-slate-700 hover:-translate-y-0.5">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                              <p className="text-sm font-semibold text-white">{author?.name || "Community member"}</p>
                      <p className="mt-1 text-xs uppercase tracking-[0.24em] text-slate-400">{new Date(post.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="pill-chip">{post.postType}</div>
                      {user && author && user.id !== post.authorId ? (
                        isFollowing ? (
                          <button onClick={() => authorId && unfollowUser(authorId)} className="btn-muted px-3 py-1 text-xs">
                            Following
                          </button>
                        ) : (
                          <button onClick={() => authorId && followUser(authorId)} className="btn-primary px-3 py-1 text-xs">
                            Follow
                          </button>
                        )
                      ) : null}
                    </div>
                  </div>
                  <p className="mt-5 text-sm leading-7 text-slate-300">{post.content}</p>
                  {post.media?.length ? (
                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                      {post.media.map((item) => (
                        <div key={item.src} className="overflow-hidden rounded-[1.75rem] bg-slate-900">
                          {item.type === "image" ? (
                            <img src={item.src} alt={item.alt} className="h-52 w-full object-cover" />
                          ) : (
                            <video controls src={item.src} className="h-52 w-full object-cover" />
                          )}
                        </div>
                      ))}
                    </div>
                  ) : null}
                  <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-slate-400">
                    <span>❤ {post.likes.length}</span>
                    <span>💬 {post.comments.length}</span>
                    <span>🔁 {post.shareCount}</span>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <Link href="/community" className="btn-secondary px-4 py-2 text-sm font-semibold">View discussion</Link>
                    <Link href={`/users/${post.authorId}`} className="btn-muted px-4 py-2 text-sm font-semibold">View profile</Link>
                  </div>
                </article>
              );
            })}
          </section>

          <aside className="space-y-6">
            <div className="surface-card p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-violet-400">Community highlights</p>
              <div className="mt-4 space-y-3 text-sm leading-7 text-slate-400">
                <div className="rounded-[1.5rem] bg-[#11131d] p-4 text-slate-300">Wellness posts, mentorship invitations, and research updates in one connected experience.</div>
                <div className="rounded-[1.5rem] bg-[#11131d] p-4 text-slate-300">Find profiles that match your journey, from warriors to healthcare professionals.</div>
              </div>
            </div>

            <div className="surface-card p-6">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-400">Recommended people</p>
                <Link href="/profiles" className="text-sm font-semibold text-violet-300">See all</Link>
              </div>
              <div className="mt-4 space-y-3">
                {recommended.map((profile) => (
                  <Link key={profile.id} href={`/users/${profile.id}`} className="flex items-center gap-3 rounded-[1.75rem] border border-slate-800 bg-[#0b111b] p-4 transition hover:bg-slate-900">
                    <img src={profile.avatar} alt={profile.name} className="h-12 w-12 rounded-[1.5rem] object-cover" />
                    <div>
                      <p className="text-sm font-semibold text-white">{profile.name}</p>
                      <p className="text-sm text-slate-400">@{profile.username}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="surface-card p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-violet-400">Quick actions</p>
              <div className="mt-4 grid gap-3">
                <Link href="/community" className="btn-primary px-4 py-3 text-sm font-semibold">Join the conversation</Link>
                <Link href="/messages" className="btn-secondary px-4 py-3 text-sm font-semibold">Open messages</Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </SiteShell>
  );
}

