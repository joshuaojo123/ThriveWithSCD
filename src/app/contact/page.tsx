import { SiteShell } from "@/components/site-shell";

export default function ContactPage() {
  return (
    <SiteShell title="Contact" description="Partner, inquire, or connect with the ThriveWithSCD team.">
      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[2rem] border border-white/70 bg-white/80 p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-violet-700">Get in touch</p>
          <h2 className="mt-3 text-3xl font-semibold text-slate-950">We welcome partnership enquiries, healthcare collaborations, and community conversations.</h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            If you are a clinician, researcher, organization, or supporter, we would love to hear from you.
          </p>
        </div>
        <div className="rounded-[2rem] border border-emerald-100 bg-emerald-50/80 p-8">
          <h3 className="text-xl font-semibold text-slate-950">Contact options</h3>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-700">
            <li>General enquiries</li>
            <li>Partnerships</li>
            <li>Newsletter signup</li>
          </ul>
        </div>
      </section>
    </SiteShell>
  );
}
