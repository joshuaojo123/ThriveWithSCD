"use client";

import Link from "next/link";
import { SiteShell } from "@/components/site-shell";
import { useAuth } from "@/context/auth-context";
import { useCommunity } from "@/context/community-context";

export default function NotificationsPage() {
  const { user, hydrated } = useAuth();
  const { notifications, markNotificationRead } = useCommunity();

  if (!hydrated) {
    return null;
  }

  if (!user) {
    return (
      <SiteShell title="Notifications" description="Sign in to see your activity alerts and updates.">
        <div className="rounded-[2rem] border border-white/70 bg-white/80 p-8 shadow-sm">
          <p className="text-lg text-slate-700">Please <Link href="/login" className="font-semibold text-violet-700">log in</Link> to view your notifications.</p>
        </div>
      </SiteShell>
    );
  }

  const userNotifications = notifications.filter((notification) => notification.userId === user.id);

  return (
    <SiteShell title="Notifications" description="Relevant updates for your ThriveWithSCD activity.">
      <section className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {userNotifications.length === 0 ? (
            <div className="rounded-[2rem] border border-white/70 bg-white/80 p-8 shadow-sm">
              <p className="text-lg text-slate-700">You have no notifications yet. Engage with the community to receive updates.</p>
            </div>
          ) : (
            userNotifications.map((notification) => (
              <div key={notification.id} className="rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.28em] text-violet-700">{notification.title}</p>
                    <p className="mt-2 text-sm text-slate-600">{notification.body}</p>
                  </div>
                  <button
                    onClick={() => markNotificationRead(notification.id)}
                    className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-200"
                  >
                    {notification.read ? "Read" : "Mark read"}
                  </button>
                </div>
                <p className="mt-3 text-xs uppercase tracking-[0.2em] text-slate-400">{new Date(notification.createdAt).toLocaleString()}</p>
              </div>
            ))
          )}
        </div>

        <div className="space-y-4">
          <div className="rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-700">Keep connected</p>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Notifications keep you informed about post interactions, mentorship activity, and platform updates.
            </p>
          </div>
          <div className="rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-violet-700">Next step</p>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Visit <Link href="/community" className="font-semibold text-violet-700">Community</Link> or <Link href="/profiles" className="font-semibold text-violet-700">Profiles</Link> to engage and create activity.
            </p>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
