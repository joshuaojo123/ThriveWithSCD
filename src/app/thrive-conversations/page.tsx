"use client";

import Link from "next/link";
import { SiteShell } from "@/components/site-shell";
import { useAuth } from "@/context/auth-context";

export default function ConversationsPage() {
  const { hydrated, user } = useAuth();

  if (!hydrated) {
    return null;
  }

  return (
    <SiteShell
      title="Thrive Conversations"
      description="A collaborative forum for peer support, lived experience, and expert-led dialogue."
    >
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <section className="surface-card space-y-6 p-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-violet-400">Conversations</p>
            <h1 className="mt-3 text-4xl font-semibold text-white">Connect through topic-driven conversations.</h1>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              Explore curated conversations for wellness, research, mentorship, and care strategies.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { title: "Self-care routines", description: "Share habits and tools that help you manage daily life." },
              { title: "Mentorship stories", description: "Learn from guides, peers, and professionals." },
              { title: "Research updates", description: "Discuss new studies, treatments, and resources." },
              { title: "Community events", description: "See the latest on webinars, workshops, and live sessions." },
            ].map((topic) => (
              <div key={topic.title} className="surface-panel p-5">
                <h2 className="text-xl font-semibold text-white">{topic.title}</h2>
                <p className="mt-3 text-sm leading-7 text-slate-300">{topic.description}</p>
              </div>
            ))}
          </div>

          <div className="surface-panel p-6">
            <h2 className="text-xl font-semibold text-white">Get started</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              {user
                ? "Create your own conversation thread in Community and invite others to join."
                : "Sign in or create an account to join conversations and post your own reflections."}
            </p>
            {!user ? (
              <div className="mt-4 flex flex-wrap gap-3">
                <Link href="/login" className="btn-primary">
                  Sign in
                </Link>
                <Link href="/signup" className="btn-secondary">
                  Create account
                </Link>
              </div>
            ) : null}
          </div>
        </section>

        <aside className="space-y-6">
          <div className="surface-card p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-400">Featured discussion</p>
            <h2 className="mt-4 text-xl font-semibold text-white">Living well with SCD</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              Practical tips, community stories, and trusted guidance to support daily health and resilience.
            </p>
          </div>

          <div className="surface-card p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-violet-400">Need support?</p>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              Browse the <Link href="/community" className="font-semibold text-violet-300">Community</Link> feed or request mentorship in your account.
            </p>
          </div>
        </aside>
      </div>
    </SiteShell>
  );
}
