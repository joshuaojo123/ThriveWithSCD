"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { SiteShell } from "@/components/site-shell";
import { useAuth } from "@/context/auth-context";

const cards = [
  { title: "Education", text: "Continue learning and save progress.", href: "/education" },
  { title: "Community", text: "Join conversations and events.", href: "/community" },
  { title: "Care network", text: "Explore verified professionals and clinics.", href: "/healthcare-network" },
];

export default function DashboardPage() {
  const { user, hydrated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (hydrated && !user) {
      router.replace("/login");
    }
  }, [hydrated, user, router]);

  if (!hydrated || !user) {
    return null;
  }

  return (
    <SiteShell title="Dashboard" description="A personal hub for your ThriveWithSCD activity, stories, and connections.">
      <div className="grid gap-6">
        <section className="surface-card p-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-violet-400">Welcome back</p>
              <h1 className="mt-3 text-4xl font-semibold text-white">{user.name}</h1>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
                Your dashboard keeps your favorite posts, conversations, and healthcare updates within reach.
              </p>
            </div>
            <Link href="/community" className="btn-primary">
              Continue the feed
            </Link>
          </div>
        </section>

        <div className="grid gap-4 md:grid-cols-3">
          {cards.map((card) => (
            <Link key={card.title} href={card.href} className="surface-card p-6 transition hover:-translate-y-1">
              <h3 className="text-xl font-semibold text-white">{card.title}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-300">{card.text}</p>
            </Link>
          ))}
        </div>
      </div>
    </SiteShell>
  );
}
