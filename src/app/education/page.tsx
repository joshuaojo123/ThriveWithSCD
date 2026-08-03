import { SiteShell } from "@/components/site-shell";

const resources = [
  { title: "Understanding Sickle Cell", kind: "Article" },
  { title: "Care pathways and treatment basics", kind: "Guide" },
  { title: "The future of digital support", kind: "Video" },
];

export default function EducationPage() {
  return (
    <SiteShell title="Education Hub" description="An interactive learning experience with expert-led resources, videos, and actionable insights.">
      <section className="rounded-[2rem] border border-white/70 bg-white/80 p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-700">Knowledge first</p>
        <h2 className="mt-3 text-3xl font-semibold text-slate-950">High-quality learning that is searchable, bookmarkable, and built for real-world use.</h2>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
          The education hub will become a trusted place for articles, videos, FAQs, downloadable content,
          and progress tracking, all shaped to feel calm, clear, and supportive.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {resources.map((resource) => (
          <div key={resource.title} className="rounded-[1.5rem] border border-white/70 bg-white/80 p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-violet-700">{resource.kind}</p>
            <h3 className="mt-3 text-xl font-semibold text-slate-950">{resource.title}</h3>
          </div>
        ))}
      </section>
    </SiteShell>
  );
}
