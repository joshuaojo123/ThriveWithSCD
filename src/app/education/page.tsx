import { SiteShell } from "@/components/site-shell";

const resources = [
  { title: "Understanding Sickle Cell", kind: "Article" },
  { title: "Care pathways and treatment basics", kind: "Guide" },
  { title: "The future of digital support", kind: "Video" },
];

export default function EducationPage() {
  return (
    <SiteShell title="Education Hub" description="An interactive learning experience with expert-led resources, videos, and actionable insights.">
      <section className="surface-card p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-400">Knowledge first</p>
        <h2 className="mt-3 text-3xl font-semibold text-white">High-quality learning that is searchable, bookmarkable, and built for real-world use.</h2>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">
          The education hub will become a trusted place for articles, videos, FAQs, downloadable content,
          and progress tracking, all shaped to feel calm, clear, and supportive.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {resources.map((resource) => (
          <div key={resource.title} className="surface-panel p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-violet-400">{resource.kind}</p>
            <h3 className="mt-3 text-xl font-semibold text-white">{resource.title}</h3>
          </div>
        ))}
      </section>
    </SiteShell>
  );
}
