import { SiteShell } from "@/components/site-shell";
import Link from "next/link";

const events = [
  { title: "Virtual Wellness Workshop", date: "Aug 15, 2026", location: "Online" },
  { title: "Research Roundtable", date: "Aug 22, 2026", location: "Hybrid" },
  { title: "Community Mentorship Meetup", date: "Sep 5, 2026", location: "New York" },
];

export default function EventsPage() {
  return (
    <SiteShell title="Events" description="Upcoming ThriveWithSCD gatherings, workshops, and live sessions.">
      <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
        <section className="space-y-6 rounded-[2rem] border border-white/70 bg-white/80 p-8 shadow-sm">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-violet-700">Events</p>
            <h1 className="mt-3 text-4xl font-semibold text-slate-950">Join live learning and connection experiences.</h1>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Attend workshops, mentorship sessions, and community gatherings created to support the SCD community worldwide.
            </p>
          </div>

          <div className="space-y-4">
            {events.map((event) => (
              <div key={event.title} className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400">{event.date}</p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-950">{event.title}</h2>
                <p className="mt-3 text-sm text-slate-600">Location: {event.location}</p>
                <button className="mt-4 inline-flex rounded-full bg-gradient-to-r from-violet-600 to-emerald-500 px-4 py-2 text-sm font-semibold text-white">
                  RSVP now
                </button>
              </div>
            ))}
          </div>
        </section>

        <aside className="space-y-6">
          <div className="rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-700">Why attend</p>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              Events are a chance to learn, connect, and find trusted resources while advancing research and care conversations.
            </p>
          </div>
          <div className="rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-violet-700">Next step</p>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Explore <Link href="/community" className="font-semibold text-violet-700">Community</Link> and <Link href="/profiles" className="font-semibold text-violet-700">Profiles</Link> to prepare for every event.</p>
          </div>
        </aside>
      </div>
    </SiteShell>
  );
}
