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
        <div className="surface-card p-8">
          <p className="text-lg text-slate-100">Please <Link href="/login" className="font-semibold text-violet-400">log in</Link> to view your notifications.</p>
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
            <div className="surface-card p-8">
              <p className="text-lg text-slate-300">You have no notifications yet. Engage with the community to receive updates.</p>
            </div>
          ) : (
            userNotifications.map((notification) => (
              <div key={notification.id} className="surface-card p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.28em] text-violet-400">{notification.title}</p>
                    <p className="mt-2 text-sm text-slate-300">{notification.body}</p>
                  </div>
                  <button
                    onClick={() => markNotificationRead(notification.id)}
                    className="btn-muted"
                  >
                    {notification.read ? "Read" : "Mark read"}
                  </button>
                </div>
                <p className="mt-3 text-xs uppercase tracking-[0.2em] text-slate-500">{new Date(notification.createdAt).toLocaleString()}</p>
              </div>
            ))
          )}
        </div>

        <div className="space-y-4">
          <div className="surface-card p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-400">Keep connected</p>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              Notifications keep you informed about post interactions, mentorship activity, and platform updates.
            </p>
          </div>
          <div className="surface-card p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-violet-400">Next step</p>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              Visit <Link href="/community" className="font-semibold text-violet-300">Community</Link> or <Link href="/profiles" className="font-semibold text-violet-300">Profiles</Link> to engage and create activity.
            </p>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
