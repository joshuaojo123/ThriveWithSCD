import { SiteShell } from "@/components/site-shell";

const pillars = [
  { title: "Hope", text: "Every experience is designed to feel affirming and future-facing." },
  { title: "Innovation", text: "We pair science, stories, and technology with compassionate care." },
  { title: "Community", text: "People with SCD, families, clinicians, and advocates belong in one ecosystem." },
];

export default function AboutPage() {
  return (
    <SiteShell title="About ThriveWithSCD" description="A global platform built to elevate knowledge, care, and belonging for the Sickle Cell community.">
      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[2rem] border border-white/70 bg-white/80 p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-700">Our story</p>
          <h2 className="mt-3 text-3xl font-semibold text-slate-950">Purpose-built for dignity, discovery, and lasting impact.</h2>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
            ThriveWithSCD exists to transform the Sickle Cell experience through education, innovation,
            advocacy, and community. We bring together lived experience, science, and opportunity in a
            premium digital environment that feels human and elevating.
          </p>
        </div>
        <div className="rounded-[2rem] border border-violet-100 bg-gradient-to-br from-violet-600 to-emerald-500 p-8 text-white shadow-lg">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-violet-100">Vision</p>
          <h3 className="mt-3 text-2xl font-semibold">A future where every person impacted by SCD can access knowledge, support, and life-changing solutions.</h3>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {pillars.map((pillar) => (
          <div key={pillar.title} className="rounded-[1.5rem] border border-white/70 bg-white/80 p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-950">{pillar.title}</h3>
            <p className="mt-2 text-sm leading-7 text-slate-600">{pillar.text}</p>
          </div>
        ))}
      </section>
    </SiteShell>
  );
}
