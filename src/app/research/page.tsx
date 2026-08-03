import { SiteShell } from "@/components/site-shell";

const researchHighlights = [
  { title: "Emerging therapies", detail: "Tracking breakthroughs in pain management and genetic research." },
  { title: "Publications", detail: "Curated reports and peer-reviewed insights for the community." },
  { title: "Innovation roadmap", detail: "Roadmaps for future tools, AI, and wearable support systems." },
];

export default function ResearchPage() {
  return (
    <SiteShell title="Research & Innovation" description="Insight, projects, and technology shaping the future of Sickle Cell care.">
      <section className="grid gap-6 md:grid-cols-3">
        {researchHighlights.map((highlight) => (
          <div key={highlight.title} className="rounded-[1.5rem] border border-white/70 bg-white/80 p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-950">{highlight.title}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">{highlight.detail}</p>
          </div>
        ))}
      </section>
    </SiteShell>
  );
}
