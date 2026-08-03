"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { SiteShell } from "@/components/site-shell";
import { useAuth } from "@/context/auth-context";
import { useCommunity } from "@/context/community-context";

export default function AdminPage() {
  const router = useRouter();
  const { hydrated, user } = useAuth();
  const { profiles, posts, notifications, broadcastNotification, verifyProfile, deletePost } = useCommunity();
  const [announcementTitle, setAnnouncementTitle] = useState("");
  const [announcementBody, setAnnouncementBody] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  if (!hydrated) {
    return null;
  }

  if (!user || user.role !== "admin") {
    return (
      <SiteShell title="Admin console" description="Admin access is required to manage the platform.">
        <div className="rounded-[2rem] border border-white/70 bg-white/80 p-8 shadow-sm">
          <p className="text-lg text-slate-700">You must be signed in as an admin to access this page.</p>
          <button
            type="button"
            onClick={() => router.push("/login")}
            className="mt-6 rounded-full bg-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-lg"
          >
            Sign in as admin
          </button>
        </div>
      </SiteShell>
    );
  }

  const userCount = profiles.length;
  const postCount = posts.length;
  const notificationCount = notifications.length;
  const unverifiedProfiles = profiles.filter((profile) => !profile.verified);

  const handleBroadcast = () => {
    if (!announcementTitle.trim() || !announcementBody.trim()) {
      setStatusMessage("Enter a title and message before sending.");
      return;
    }

    broadcastNotification(announcementTitle.trim(), announcementBody.trim());
    setAnnouncementTitle("");
    setAnnouncementBody("");
    setStatusMessage("Notification sent to all users.");
  };

  return (
    <SiteShell title="Admin console" description="Operations for verification, moderation, and platform management.">
      <div className="space-y-6">
        <section className="rounded-[2rem] border border-white/70 bg-white/95 p-8 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-violet-700">Admin command center</p>
          <h1 className="mt-3 text-4xl font-semibold text-slate-950">85% website control for the admin team</h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
            Monitor members, publish announcements, verify profiles, and remove inappropriate content from a single dashboard.
          </p>
        </section>

        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-[1.75rem] border border-white/70 bg-slate-50 p-6 shadow-sm">
                <p className="text-sm uppercase tracking-[0.24em] text-violet-700">Users</p>
                <p className="mt-4 text-4xl font-semibold text-slate-950">{userCount}</p>
              </div>
              <div className="rounded-[1.75rem] border border-white/70 bg-slate-50 p-6 shadow-sm">
                <p className="text-sm uppercase tracking-[0.24em] text-violet-700">Posts</p>
                <p className="mt-4 text-4xl font-semibold text-slate-950">{postCount}</p>
              </div>
              <div className="rounded-[1.75rem] border border-white/70 bg-slate-50 p-6 shadow-sm">
                <p className="text-sm uppercase tracking-[0.24em] text-violet-700">Notifications</p>
                <p className="mt-4 text-4xl font-semibold text-slate-950">{notificationCount}</p>
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-white/70 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-700">Broadcast notification</p>
              <div className="mt-4 space-y-4">
                <input
                  value={announcementTitle}
                  onChange={(event) => setAnnouncementTitle(event.target.value)}
                  placeholder="Announcement title"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none"
                />
                <textarea
                  value={announcementBody}
                  onChange={(event) => setAnnouncementBody(event.target.value)}
                  rows={4}
                  placeholder="Announcement message to every user"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none"
                />
                <button
                  type="button"
                  onClick={handleBroadcast}
                  className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-emerald-500 px-5 py-3 text-sm font-semibold text-white"
                >
                  Send announcement
                </button>
                {statusMessage ? <p className="text-sm text-emerald-700">{statusMessage}</p> : null}
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-[1.75rem] border border-white/70 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-violet-700">Unverified profiles</p>
              <div className="mt-4 space-y-3">
                {unverifiedProfiles.length === 0 ? (
                  <p className="text-sm text-slate-600">All profiles are verified.</p>
                ) : (
                  unverifiedProfiles.map((profile) => (
                    <div key={profile.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                      <p className="font-semibold text-slate-950">{profile.name}</p>
                      <p className="mt-1 text-sm text-slate-600">{profile.role}</p>
                      <button
                        type="button"
                        onClick={() => verifyProfile(profile.id, true)}
                        className="mt-3 inline-flex rounded-full bg-violet-600 px-4 py-2 text-sm font-semibold text-white"
                      >
                        Verify profile
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-white/70 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-700">Recent posts</p>
              <div className="mt-4 space-y-3">
                {posts.slice(0, 3).map((post) => (
                  <div key={post.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-sm font-semibold text-slate-950">{post.content.slice(0, 90)}...</p>
                    <div className="mt-3 flex items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={() => deletePost(post.id)}
                        className="rounded-full bg-red-50 px-3 py-2 text-sm font-semibold text-red-700"
                      >
                        Delete
                      </button>
                      <p className="text-xs text-slate-500">{new Date(post.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </SiteShell>
  );
}
