"use client";

import Link from "next/link";
import { SiteShell } from "@/components/site-shell";
import { useCommunity } from "@/context/community-context";

export default function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const query = searchParams.q?.trim().toLowerCase() || "";
  const { profiles, posts } = useCommunity();

  const users = profiles.filter(
    (profile) =>
      profile.name.toLowerCase().includes(query) || profile.headline.toLowerCase().includes(query),
  );

  const matchingPosts = posts.filter(
    (post) => post.content.toLowerCase().includes(query) || post.tags.some((tag) => tag.includes(query)),
  );

  return (
    <SiteShell title="Search results" description={`Results for “${query}”`}>
      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <section className="space-y-6">
          <div className="rounded-[2rem] border border-white/70 bg-white/95 p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-violet-700">Search query</p>
            <p className="mt-3 text-sm text-slate-600">Showing results for “{query}”.</p>
          </div>

          <div className="space-y-4">
            <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-700">People</p>
              <div className="mt-4 space-y-3">
                {users.length === 0 ? (
                  <p className="text-sm text-slate-600">No profiles matched your search.</p>
                ) : (
                  users.map((profile) => (
                    <Link
                      key={profile.id}
                      href={`/users/${profile.id}`}
                      className="block rounded-3xl bg-white p-4 transition hover:bg-violet-50"
                    >
                      <p className="font-semibold text-slate-950">{profile.name}</p>
                      <p className="mt-1 text-sm text-slate-600">{profile.headline}</p>
                    </Link>
                  ))
                )}
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-violet-700">Posts</p>
              <div className="mt-4 space-y-3">
                {matchingPosts.length === 0 ? (
                  <p className="text-sm text-slate-600">No posts matched your search.</p>
                ) : (
                  matchingPosts.map((post) => (
                    <div key={post.id} className="rounded-3xl bg-white p-4 shadow-sm">
                      <p className="font-semibold text-slate-950">{post.content.slice(0, 100)}...</p>
                      <p className="mt-2 text-xs uppercase tracking-[0.2em] text-slate-400">{new Date(post.createdAt).toLocaleDateString()}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </section>

        <aside className="space-y-6">
          <div className="rounded-[2rem] border border-white/70 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-violet-700">Search tips</p>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              <li>Try names, roles, or keywords like "mentor" and "self-care".</li>
              <li>Search tags like "health" or "education" to find relevant posts.</li>
              <li>Use short phrases for broader results.</li>
            </ul>
          </div>
        </aside>
      </div>
    </SiteShell>
  );
}
