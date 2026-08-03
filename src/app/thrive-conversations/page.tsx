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
        <section className="space-y-6 rounded-[2rem] border border-white/70 bg-white/80 p-8 shadow-sm">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-violet-700">Conversations</p>
            <h1 className="mt-3 text-4xl font-semibold text-slate-950">Connect through topic-driven conversations.</h1>
            <p className="mt-3 text-sm leading-7 text-slate-600">
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
              <div key={topic.title} className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
                <h2 className="text-xl font-semibold text-slate-950">{topic.title}</h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">{topic.description}</p>
              </div>
            ))}
          </div>

          <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6">
            <h2 className="text-xl font-semibold text-slate-950">Get started</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              {user
                ? "Create your own conversation thread in Community and invite others to join."
                : "Sign in or create an account to join conversations and post your own reflections."}
            </p>
            {!user ? (
              <div className="mt-4 flex flex-wrap gap-3">
                <Link href="/login" className="rounded-full bg-gradient-to-r from-violet-600 to-emerald-500 px-5 py-3 text-sm font-semibold text-white shadow-lg">
                  Sign in
                </Link>
                <Link href="/signup" className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700">
                  Create account
                </Link>
              </div>
            ) : null}
          </div>
        </section>

        <aside className="space-y-6">
          <div className="rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-700">Featured discussion</p>
            <h2 className="mt-4 text-xl font-semibold text-slate-950">Living well with SCD</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Practical tips, community stories, and trusted guidance to support daily health and resilience.
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-violet-700">Need support?</p>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Browse the <Link href="/community" className="font-semibold text-violet-700">Community</Link> feed or request mentorship in your account.
            </p>
          </div>
        </aside>
      </div>
    </SiteShell>
  );
}
