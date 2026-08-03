import { SiteShell } from "@/components/site-shell";

export default function HomeAliasPage() {
  return (
    <SiteShell title="Home" description="Your gateway to ThriveWithSCD's full platform experience.">
      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[2rem] border border-white/70 bg-white/80 p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-violet-700">Platform home</p>
          <h2 className="mt-4 text-3xl font-semibold text-slate-950">Everything you need for education, community, and care.</h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            The home route brings together the latest learning resources, featured community stories,
            and pathways for support so members can quickly find what matters most.
          </p>
        </div>
        <div className="rounded-[2rem] border border-emerald-100 bg-emerald-50/80 p-8">
          <h3 className="text-xl font-semibold text-slate-950">Quick access</h3>
          <p className="mt-3 text-sm leading-7 text-slate-700">
            Use the navigation to explore products, wellness programs, healthcare connections, research,
            and community initiatives.
          </p>
        </div>
      </section>
    </SiteShell>
  );
}
