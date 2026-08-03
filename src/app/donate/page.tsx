import { SiteShell } from "@/components/site-shell";
import Link from "next/link";

export default function DonatePage() {
  return (
    <SiteShell title="Donate" description="Support ThriveWithSCD and help expand care, research, and community resources.">
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <section className="space-y-6 rounded-[2rem] border border-white/70 bg-white/80 p-8 shadow-sm">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-700">Give back</p>
            <h1 className="mt-3 text-4xl font-semibold text-slate-950">Grow support for patients, families, and care teams.</h1>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Donations help fuel research, community programs, mentorship, and healthcare access across the global SCD ecosystem.
            </p>
          </div>

          <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Support options</p>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li>Monthly community sponsorship</li>
              <li>One-time research funding gift</li>
              <li>Program support for mentorship and education</li>
            </ul>
            <button className="mt-5 rounded-full bg-gradient-to-r from-violet-600 to-emerald-500 px-5 py-3 text-sm font-semibold text-white shadow-lg">
              Donate now
            </button>
          </div>
        </section>

        <aside className="space-y-6">
          <div className="rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-violet-700">Impact</p>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              Your support helps create more live events, research analysis, educational content, and direct member assistance.
            </p>
          </div>
          <div className="rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-700">Stay connected</p>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              After donating, visit <Link href="/notifications" className="font-semibold text-violet-700">Notifications</Link> to see updates on platform growth and community impact.</p>
          </div>
        </aside>
      </div>
    </SiteShell>
  );
}
