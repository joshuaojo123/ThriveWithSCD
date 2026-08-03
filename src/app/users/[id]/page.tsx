"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { SiteShell } from "@/components/site-shell";
import { useAuth } from "@/context/auth-context";
import { useCommunity } from "@/context/community-context";

const tabs = ["Posts", "Replies", "Media", "Likes", "About"] as const;

type ProfileTab = (typeof tabs)[number];

export default function UserProfilePage() {
  const { id } = useParams();
  const { user, hydrated } = useAuth();
  const { profiles, posts, followUser, unfollowUser } = useCommunity();
  const [activeTab, setActiveTab] = useState<ProfileTab>("Posts");

  const profile = profiles.find((item) => item.id === id);

  if (!hydrated) {
    return null;
  }

  if (!profile) {
    notFound();
  }

  const isSelf = user?.id === profile.id;
  const isFollowing = user ? profile.followers.includes(user.id) : false;

  const userPosts = useMemo(() => posts.filter((post) => post.authorId === profile.id), [posts, profile.id]);
  const userReplies = useMemo(
    () =>
      posts
        .flatMap((post) =>
          post.comments
            .flatMap((comment) =>
              comment.replies.filter((reply) => reply.authorId === profile.id).map((reply) => ({
                ...reply,
                parentPost: post,
                comment,
              })),
            )
            .filter(Boolean),
        )
        .slice(0, 6),
    [posts, profile.id],
  );

  const mediaPosts = useMemo(
    () => userPosts.filter((post) => post.media && post.media.length > 0),
    [userPosts],
  );

  const likedPosts = useMemo(
    () => posts.filter((post) => post.likes.includes(profile.id)).slice(0, 6),
    [posts, profile.id],
  );

  const totalLikesReceived = useMemo(
    () => userPosts.reduce((sum, post) => sum + post.likes.length, 0),
    [userPosts],
  );

  const warriorBadge = profile.role.toLowerCase().includes("mentor") || profile.role.toLowerCase().includes("professional");

  const handleFollow = () => {
    if (!user) return;
    if (isFollowing) {
      unfollowUser(profile.id);
    } else {
      followUser(profile.id);
    }
  };

  return (
    <SiteShell title={profile.name} description={`Public profile for ${profile.name}.`}>
      <div className="space-y-6">
        <div className="overflow-hidden rounded-[2.25rem] border border-slate-200 bg-white shadow-sm">
          <div className="relative h-56 bg-slate-800">
            <img src={profile.banner} alt={`${profile.name} banner`} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent" />
          </div>
          <div className="relative -mt-16 px-6 pb-6">
            <div className="flex flex-col gap-4 rounded-[2rem] bg-white/95 px-6 py-6 shadow-xl shadow-slate-200/60 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-5">
                <img src={profile.avatar} alt={profile.name} className="h-28 w-28 rounded-[2rem] border-4 border-white object-cover shadow-sm" />
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="text-3xl font-semibold text-slate-950">{profile.name}</h1>
                    {profile.verified ? (
                      <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700">
                        Verified
                      </span>
                    ) : null}
                    {warriorBadge ? (
                      <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-violet-700">
                        Health leader
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-2 text-sm text-slate-600">@{profile.username}</p>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">{profile.headline}</p>
                </div>
              </div>
              <div className="flex flex-col gap-3 sm:items-end">
                <button
                  type="button"
                  onClick={handleFollow}
                  className={`rounded-full px-5 py-3 text-sm font-semibold transition ${isSelf ? "bg-slate-100 text-slate-700" : isFollowing ? "bg-white border border-slate-200 text-slate-900" : "bg-violet-600 text-white hover:bg-violet-700"}`}
                  disabled={isSelf}
                >
                  {isSelf ? "Your profile" : isFollowing ? "Following" : "Follow"}
                </button>
                <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-600">
                  <p>Joined {new Date(profile.joinedAt).toLocaleString("en-US", { month: "short", year: "numeric" })}</p>
                  {profile.website ? (
                    <a href={profile.website} target="_blank" rel="noreferrer" className="text-violet-700 hover:underline">
                      {profile.website}
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
          <div className="space-y-6 rounded-[2rem] border border-white/70 bg-white/95 p-6 shadow-sm">
            <div className="grid gap-4 sm:grid-cols-5">
              {[
                { label: "Followers", value: profile.followers.length },
                { label: "Following", value: profile.following.length },
                { label: "Posts", value: userPosts.length },
                { label: "Likes", value: totalLikesReceived },
                { label: "Media", value: mediaPosts.length },
              ].map((item) => (
                <div key={item.label} className="rounded-[1.5rem] bg-slate-50 p-4 text-center">
                  <p className="text-2xl font-semibold text-slate-950">{item.value}</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.24em] text-slate-500">{item.label}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 border-b border-slate-200 pb-4">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${activeTab === tab ? "bg-violet-600 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="space-y-4 pt-6">
              {activeTab === "Posts" ? (
                userPosts.length === 0 ? (
                  <p className="text-sm text-slate-600">No posts have been shared yet.</p>
                ) : (
                  userPosts.map((post) => (
                    <article key={post.id} className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-slate-950">{new Date(post.createdAt).toLocaleDateString()}</p>
                          <p className="mt-2 text-sm leading-7 text-slate-700">{post.content}</p>
                        </div>
                        <div className="text-right text-xs uppercase tracking-[0.24em] text-slate-500">{post.postType}</div>
                      </div>
                      {post.media?.length ? (
                        <div className="mt-4 grid gap-3 sm:grid-cols-2">
                          {post.media.map((item) => (
                            <div key={item.src} className="overflow-hidden rounded-[1.5rem] bg-white">
                              {item.type === "image" ? (
                                <img src={item.src} alt={item.alt} className="h-48 w-full object-cover" />
                              ) : (
                                <video controls src={item.src} className="h-48 w-full object-cover" />
                              )}
                            </div>
                          ))}
                        </div>
                      ) : null}
                      <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-600">
                        <span>❤ {post.likes.length}</span>
                        <span>💬 {post.comments.length}</span>
                        <span>🔁 {post.shareCount}</span>
                      </div>
                    </article>
                  ))
                )
              ) : activeTab === "Replies" ? (
                userReplies.length === 0 ? (
                  <p className="text-sm text-slate-600">No replies yet.</p>
                ) : (
                  userReplies.map((reply) => (
                    <div key={reply.id} className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5">
                      <p className="text-sm text-slate-500">Replied to a post by {profiles.find((item) => item.id === reply.parentPost.authorId)?.name}</p>
                      <p className="mt-2 text-sm leading-7 text-slate-700">{reply.content}</p>
                    </div>
                  ))
                )
              ) : activeTab === "Media" ? (
                mediaPosts.length === 0 ? (
                  <p className="text-sm text-slate-600">No media posts yet.</p>
                ) : (
                  <div className="grid gap-4 md:grid-cols-2">
                    {mediaPosts.map((post) => (
                      <div key={post.id} className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-4">
                        {post.media?.map((item) => (
                          <div key={item.src} className="overflow-hidden rounded-[1.5rem] bg-white">
                            {item.type === "image" ? (
                              <img src={item.src} alt={item.alt} className="h-48 w-full object-cover" />
                            ) : (
                              <video controls src={item.src} className="h-48 w-full object-cover" />
                            )}
                          </div>
                        ))}
                        <p className="mt-3 text-sm leading-7 text-slate-700">{post.content}</p>
                      </div>
                    ))}
                  </div>
                )
              ) : activeTab === "Likes" ? (
                likedPosts.length === 0 ? (
                  <p className="text-sm text-slate-600">No liked posts yet.</p>
                ) : (
                  likedPosts.map((post) => (
                    <article key={post.id} className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5">
                      <p className="text-sm text-slate-700">{post.content}</p>
                      <p className="mt-3 text-xs uppercase tracking-[0.24em] text-slate-500">Liked on {new Date(post.createdAt).toLocaleDateString()}</p>
                    </article>
                  ))
                )
              ) : (
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5">
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-700">About</p>
                    <p className="mt-4 text-sm leading-7 text-slate-600">{profile.bio}</p>
                    <div className="mt-4 space-y-2 text-sm text-slate-600">
                      <p><span className="font-semibold text-slate-900">Location:</span> {profile.location}</p>
                      <p><span className="font-semibold text-slate-900">Website:</span> {profile.website || "Not provided"}</p>
                      <p><span className="font-semibold text-slate-900">Role:</span> {profile.role}</p>
                    </div>
                  </div>
                  <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5">
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-violet-700">Community badges</p>
                    <div className="mt-4 space-y-3 text-sm text-slate-600">
                      <p>{profile.verified ? "Verified healthcare profile" : "Verification pending"}</p>
                      <p>{warriorBadge ? "Featured community leader" : "Active community member"}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-[2rem] border border-white/70 bg-white/95 p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-violet-700">Profile highlights</p>
              <div className="mt-5 space-y-3 text-sm leading-7 text-slate-600">
                <p>Verified by ThriveWithSCD admin.</p>
                <p>Trusted wellness voice for community members.</p>
                <p>Available for mentoring and support conversations.</p>
              </div>
            </div>
            <div className="rounded-[2rem] border border-white/70 bg-white/95 p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-700">Quick actions</p>
              <div className="mt-4 flex flex-col gap-3">
                <Link href="/messages" className="rounded-full bg-violet-600 px-4 py-3 text-sm font-semibold text-white text-center">
                  Send a message
                </Link>
                <Link href="/community" className="rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 text-center">
                  View community feed
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </SiteShell>
  );
}
