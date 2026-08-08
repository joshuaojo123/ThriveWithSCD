import { SiteShell } from "@/components/site-shell";

const programs = [
  { title: "Workshops", description: "Live and on-demand learning sessions for members and caregivers." },
  { title: "Volunteer opportunities", description: "Ways to contribute through events, mentorship, and outreach." },
  { title: "Campaigns", description: "Focused programs for education, screening, and advocacy." },
];

export default function ProgramsPage() {
  return (
    <SiteShell title="Programs & Initiatives" description="A growing suite of campaigns, events, and outreach opportunities.">
      <section className="grid gap-6 lg:grid-cols-3">
        {programs.map((program) => (
          <div key={program.title} className="surface-card p-6">
            <h3 className="text-xl font-semibold text-white">{program.title}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-300">{program.description}</p>
          </div>
        ))}
      </section>
    </SiteShell>
  );
}
