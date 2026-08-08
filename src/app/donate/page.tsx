import { SiteShell } from "@/components/site-shell";
import Link from "next/link";

export default function DonatePage() {
  return (
    <SiteShell title="Donate" description="Support ThriveWithSCD and help expand care, research, and community resources.">
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <section className="surface-card space-y-6 p-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-400">Give back</p>
            <h1 className="mt-3 text-4xl font-semibold text-white">Grow support for patients, families, and care teams.</h1>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              Donations help fuel research, community programs, mentorship, and healthcare access across the global SCD ecosystem.
            </p>
          </div>

          <div className="surface-panel p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">Support options</p>
            <ul className="mt-4 space-y-3 text-sm text-slate-300">
              <li>Monthly community sponsorship</li>
              <li>One-time research funding gift</li>
              <li>Program support for mentorship and education</li>
            </ul>
            <button className="btn-primary mt-5">
              Donate now
            </button>
          </div>
        </section>

        <aside className="space-y-6">
          <div className="surface-card p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-violet-400">Impact</p>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              Your support helps create more live events, research analysis, educational content, and direct member assistance.
            </p>
          </div>
          <div className="surface-card p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-400">Stay connected</p>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              After donating, visit <Link href="/notifications" className="font-semibold text-violet-300">Notifications</Link> to see updates on platform growth and community impact.</p>
          </div>
        </aside>
      </div>
    </SiteShell>
  );
}
