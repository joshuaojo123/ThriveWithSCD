"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Sparkles } from "lucide-react";
import { useAuth } from "@/context/auth-context";

const statistics = [
  { label: "Connected members", value: "12,000+" },
  { label: "Care partners", value: "1,500+" },
  { label: "Research partners", value: "85+" },
];

const values = [
  { title: "Belonging", description: "A safe place to share, learn, and grow together." },
  { title: "Innovation", description: "Technology and insights shaped around Sickle Cell needs." },
  { title: "Clarity", description: "Trusted education that makes complex care easier to understand." },
];

export default function PublicHomePage() {
  const { user, hydrated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (hydrated && user) {
      router.replace("/dashboard");
    }
  }, [hydrated, user, router]);

  return (
    <div className="bg-white text-slate-950">
      <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-5 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3 text-lg font-semibold text-violet-700">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-3xl bg-violet-600 text-white shadow-[0_20px_50px_-30px_rgba(124,58,237,0.8)]">TW</span>
            ThriveWithSCD
          </Link>
          <nav className="hidden items-center gap-8 text-sm text-slate-600 md:flex">
            <a href="#why" className="transition hover:text-violet-700">Why Thrive</a>
            <a href="#education" className="transition hover:text-violet-700">Education</a>
            <a href="#innovation" className="transition hover:text-violet-700">Innovation</a>
            <a href="#community" className="transition hover:text-violet-700">Community</a>
            <a href="#impact" className="transition hover:text-violet-700">Impact</a>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm font-semibold text-slate-700 transition hover:text-violet-700">
              Login
            </Link>
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 rounded-full bg-violet-700 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-200 transition hover:bg-violet-800"
            >
              Join ThriveWithSCD
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden bg-slate-950 text-white">
          <div className="hero-orb" />
          <div className="hero-orb hero-orb--green" />
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 rounded-full bg-violet-600/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-violet-200">
                  <Sparkles className="h-4 w-4 text-violet-200" />
                  A unified movement for Sickle Cell support
                </div>
                <div className="space-y-6">
                  <h1 className="text-5xl font-semibold tracking-tight text-white sm:text-6xl">
                    Transforming the Sickle Cell Experience.
                  </h1>
                  <p className="max-w-2xl text-lg leading-8 text-slate-300">
                    Through education, innovation, community, and support, we are building a future where Sickle Cell Disease does not limit possibilities.
                  </p>
                </div>
                <div className="flex flex-wrap gap-4">
                  <a href="#about" className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-violet-200 transition hover:bg-slate-100">
                    Explore ThriveWithSCD
                  </a>
                  <Link href="/signup" className="inline-flex items-center justify-center rounded-full border border-violet-500 bg-violet-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-violet-700">
                    Join the Community
                  </Link>
                </div>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="rounded-[2rem] border border-white/10 bg-white/5 p-5">
                    <p className="text-sm uppercase tracking-[0.28em] text-violet-300">Mission</p>
                    <p className="mt-3 text-sm text-slate-200">To make knowledge, care, and community accessible to every person touched by Sickle Cell.</p>
                  </div>
                  <div className="rounded-[2rem] border border-white/10 bg-white/5 p-5">
                    <p className="text-sm uppercase tracking-[0.28em] text-emerald-300">Vision</p>
                    <p className="mt-3 text-sm text-slate-200">A connected future where Sickle Cell does not limit possibility or purpose.</p>
                  </div>
                  <div className="rounded-[2rem] border border-white/10 bg-white/5 p-5">
                    <p className="text-sm uppercase tracking-[0.28em] text-sky-300">Impact</p>
                    <p className="mt-3 text-sm text-slate-200">Trusted voices, research, and tools that move the community forward together.</p>
                  </div>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-[3rem] border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(124,58,237,0.25),_transparent_35%)]" />
                <div className="relative space-y-6">
                  <div className="rounded-[2rem] bg-white/10 p-6">
                    <p className="text-sm uppercase tracking-[0.28em] text-violet-200">Connection</p>
                    <h2 className="mt-4 text-3xl font-semibold text-white">A living network of care, conversation, and innovation.</h2>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-[2rem] bg-slate-900/80 p-5">
                      <p className="text-sm uppercase tracking-[0.28em] text-emerald-300">Emotion</p>
                      <p className="mt-3 text-sm text-slate-200">Hope, belonging, and shared progress across every journey.</p>
                    </div>
                    <div className="rounded-[2rem] bg-slate-900/80 p-5">
                      <p className="text-sm uppercase tracking-[0.28em] text-sky-300">Momentum</p>
                      <p className="mt-3 text-sm text-slate-200">Information that moves with the body, the mind, and the community.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="why" className="border-b border-slate-200/80 py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-700">You Are Not Alone</p>
                <h2 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950">Why ThriveWithSCD exists.</h2>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                  We believe every person with Sickle Cell and every caregiver deserves trusted education, compassionate community, and tools that reduce isolation.
                </p>
              </div>
              <div className="grid gap-4">
                <div className="rounded-[2rem] border border-slate-200/70 bg-slate-50 p-8">
                  <p className="text-sm uppercase tracking-[0.28em] text-emerald-700">Human first</p>
                  <p className="mt-4 text-base leading-7 text-slate-700">Real voices, empathetic care, and lived experience at the center of every solution.</p>
                </div>
                <div className="rounded-[2rem] border border-slate-200/70 bg-slate-50 p-8">
                  <p className="text-sm uppercase tracking-[0.28em] text-violet-700">Built for purpose</p>
                  <p className="mt-4 text-base leading-7 text-slate-700">A platform designed to bridge gaps across education, health, research, and community support.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="bg-slate-50 py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-700">About ThriveWithSCD</p>
                <h2 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950">Creating clarity, care, and connection for the Sickle Cell community.</h2>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                  ThriveWithSCD is the home for education, research, community, and practical tools that help people live fuller lives with Sickle Cell Disease.
                </p>
                <div className="mt-10 grid gap-4 sm:grid-cols-3">
                  {values.map((value) => (
                    <div key={value.title} className="rounded-[2rem] bg-white p-6 shadow-sm">
                      <p className="text-sm uppercase tracking-[0.28em] text-violet-700">{value.title}</p>
                      <p className="mt-4 text-sm leading-7 text-slate-600">{value.description}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-[2.5rem] border border-slate-200/80 bg-white p-8 shadow-sm">
                <p className="text-sm uppercase tracking-[0.28em] text-violet-700">Core values</p>
                <ul className="mt-6 space-y-4 text-slate-700">
                  <li className="rounded-3xl border border-slate-200/70 bg-slate-50 p-5">
                    <strong className="block text-sm font-semibold text-violet-800">Belonging</strong>
                    <span className="text-sm text-slate-600">Every member is seen, supported, and included.</span>
                  </li>
                  <li className="rounded-3xl border border-slate-200/70 bg-slate-50 p-5">
                    <strong className="block text-sm font-semibold text-emerald-800">Transparency</strong>
                    <span className="text-sm text-slate-600">Clear, trustworthy information that helps people make informed choices.</span>
                  </li>
                  <li className="rounded-3xl border border-slate-200/70 bg-slate-50 p-5">
                    <strong className="block text-sm font-semibold text-sky-800">Innovation</strong>
                    <span className="text-sm text-slate-600">Technology and partnerships that move care forward.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="education" className="py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-700">Sickle Cell Education</p>
                <h2 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950">Understand SCD, symptoms, and support.</h2>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                  From symptom management to nutrition and caregiver support, ThriveWithSCD provides the education needed to navigate the complexities of daily life.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[2rem] border border-slate-200/70 bg-slate-50 p-6">
                  <p className="text-sm uppercase tracking-[0.28em] text-violet-700">Symptoms</p>
                  <p className="mt-3 text-sm leading-7 text-slate-600">Pain, fatigue, and crisis triggers explained with practical self-care guidance.</p>
                </div>
                <div className="rounded-[2rem] border border-slate-200/70 bg-slate-50 p-6">
                  <p className="text-sm uppercase tracking-[0.28em] text-emerald-700">Management</p>
                  <p className="mt-3 text-sm leading-7 text-slate-600">Actionable tips for daily care, medication planning, and support coordination.</p>
                </div>
                <div className="rounded-[2rem] border border-slate-200/70 bg-slate-50 p-6">
                  <p className="text-sm uppercase tracking-[0.28em] text-sky-700">Nutrition</p>
                  <p className="mt-3 text-sm leading-7 text-slate-600">Healthy habits for energy, hydration, and inflammatory balance.</p>
                </div>
                <div className="rounded-[2rem] border border-slate-200/70 bg-slate-50 p-6">
                  <p className="text-sm uppercase tracking-[0.28em] text-violet-700">Caregivers</p>
                  <p className="mt-3 text-sm leading-7 text-slate-600">Support strategies for family, friends, and care partners who are on this journey too.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="innovation" className="bg-slate-50 py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-700">Thrive Innovations</p>
                <h2 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950">Tools and products designed for daily care.</h2>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                  From wearable insights to hydration support, our solutions are built to help the community manage life with confidence.
                </p>
              </div>
              <div className="grid gap-4">
                <div className="rounded-[2rem] border border-slate-200/70 bg-white p-6 shadow-sm">
                  <p className="text-sm uppercase tracking-[0.28em] text-violet-700">ThriveHeat</p>
                  <p className="mt-3 text-sm leading-7 text-slate-600">Temperature and comfort systems tuned for daily wellness.</p>
                </div>
                <div className="rounded-[2rem] border border-slate-200/70 bg-white p-6 shadow-sm">
                  <p className="text-sm uppercase tracking-[0.28em] text-emerald-700">ThriveOxy</p>
                  <p className="mt-3 text-sm leading-7 text-slate-600">Oxygen support insights for better breathing and energy management.</p>
                </div>
                <div className="rounded-[2rem] border border-slate-200/70 bg-white p-6 shadow-sm">
                  <p className="text-sm uppercase tracking-[0.28em] text-sky-700">ThriveAI</p>
                  <p className="mt-3 text-sm leading-7 text-slate-600">A smart assistant to help you find answers, resources, and care pathways.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="community" className="py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-700">Community</p>
                <h2 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950">A platform for warriors, caregivers, and professionals to connect.</h2>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                  Real conversations, mentorship, and shared stories create a stronger, more informed community.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[2rem] border border-slate-200/70 bg-slate-50 p-6">
                  <p className="text-sm uppercase tracking-[0.28em] text-violet-700">Warrior stories</p>
                  <p className="mt-3 text-sm leading-7 text-slate-600">Personal journeys that inspire and connect.</p>
                </div>
                <div className="rounded-[2rem] border border-slate-200/70 bg-slate-50 p-6">
                  <p className="text-sm uppercase tracking-[0.28em] text-emerald-700">Mentorship</p>
                  <p className="mt-3 text-sm leading-7 text-slate-600">Support from people who understand the journey.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="conversations" className="bg-slate-50 py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-700">Thrive Conversations</p>
                <h2 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950">Podcasts, interviews, and healthcare discussions.</h2>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                  Engage with experts, hear from community leaders, and discover conversations that matter.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[2rem] border border-slate-200/70 bg-white p-6 shadow-sm">
                  <p className="text-sm uppercase tracking-[0.28em] text-violet-700">Podcasts</p>
                  <p className="mt-3 text-sm leading-7 text-slate-600">Audio stories from clinicians and community leaders.</p>
                </div>
                <div className="rounded-[2rem] border border-slate-200/70 bg-white p-6 shadow-sm">
                  <p className="text-sm uppercase tracking-[0.28em] text-emerald-700">Stories</p>
                  <p className="mt-3 text-sm leading-7 text-slate-600">Personal interviews that amplify lived experiences.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="research" className="py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-700">Research & Innovation</p>
                <h2 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950">Partnerships, science, and future breakthroughs.</h2>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                  ThriveWithSCD brings together research, technology partners, and community insight to accelerate better outcomes.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[2rem] border border-slate-200/70 bg-slate-50 p-6">
                  <p className="text-sm uppercase tracking-[0.28em] text-violet-700">Partnerships</p>
                  <p className="mt-3 text-sm leading-7 text-slate-600">Collaborations that broaden access to care and knowledge.</p>
                </div>
                <div className="rounded-[2rem] border border-slate-200/70 bg-slate-50 p-6">
                  <p className="text-sm uppercase tracking-[0.28em] text-emerald-700">Technology</p>
                  <p className="mt-3 text-sm leading-7 text-slate-600">Data, tools, and research visualization for smarter care.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="healthcare-network" className="bg-slate-50 py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-700">Healthcare Network</p>
                <h2 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950">Trusted professionals, specialists, and research partners.</h2>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                  A carefully built network of doctors, specialists, hospitals, and researchers dedicated to the Sickle Cell community.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[2rem] border border-slate-200/70 bg-white p-6 shadow-sm">
                  <p className="text-sm uppercase tracking-[0.28em] text-violet-700">Clinicians</p>
                  <p className="mt-3 text-sm leading-7 text-slate-600">Verified experts who understand specialized needs.</p>
                </div>
                <div className="rounded-[2rem] border border-slate-200/70 bg-white p-6 shadow-sm">
                  <p className="text-sm uppercase tracking-[0.28em] text-emerald-700">Researchers</p>
                  <p className="mt-3 text-sm leading-7 text-slate-600">Collaborating on better treatments and long-term care strategies.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="programs" className="py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-700">Thrive Programs</p>
                <h2 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950">Awareness, outreach, and empowerment initiatives.</h2>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                  Programs designed for schools, communities, events, and awareness campaigns that lift the Sickle Cell story.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[2rem] border border-slate-200/70 bg-slate-50 p-6">
                  <p className="text-sm uppercase tracking-[0.28em] text-violet-700">Awareness</p>
                  <p className="mt-3 text-sm leading-7 text-slate-600">Educational outreach that inspires action and understanding.</p>
                </div>
                <div className="rounded-[2rem] border border-slate-200/70 bg-slate-50 p-6">
                  <p className="text-sm uppercase tracking-[0.28em] text-emerald-700">Events</p>
                  <p className="mt-3 text-sm leading-7 text-slate-600">Community gatherings, workshops, and learning sessions.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="ai" className="bg-slate-50 py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-700">ThriveAI</p>
                <h2 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950">The future of intelligent support for the community.</h2>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                  ThriveAI helps you discover resources, answer questions, and explore care options with confidence.
                </p>
              </div>
              <div className="rounded-[2rem] border border-slate-200/70 bg-white p-8 shadow-sm">
                <p className="text-sm uppercase tracking-[0.28em] text-sky-700">Smart support</p>
                <p className="mt-4 text-sm leading-7 text-slate-600">Research summaries, health guidance, and community insight all in one intuitive experience.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="impact" className="py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-700">Impact</p>
                <h2 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950">Stories, statistics, and global reach.</h2>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                  ThriveWithSCD brings measurable progress to the community through research, partnerships, and shared stories.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {statistics.map((stat) => (
                  <div key={stat.label} className="rounded-[2rem] border border-slate-200/70 bg-slate-50 p-6">
                    <p className="text-4xl font-semibold text-violet-700">{stat.value}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="donate" className="bg-slate-50 py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-700">Donate & Partner</p>
                <h2 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950">Support the movement that is building a better future.</h2>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                  Your support helps expand education, care access, and community programs for people with Sickle Cell.
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <Link href="/donate" className="rounded-full bg-violet-700 px-6 py-4 text-center text-sm font-semibold text-white transition hover:bg-violet-800">
                  Donate now
                </Link>
                <Link href="/contact" className="rounded-full border border-violet-700 px-6 py-4 text-center text-sm font-semibold text-violet-700 transition hover:bg-violet-50">
                  Partner with us
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section id="join" className="py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-[3rem] border border-slate-200/80 bg-violet-950 px-10 py-16 text-white shadow-[0_40px_120px_-40px_rgba(124,58,237,0.5)]">
              <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-300">Together We Thrive</p>
                  <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white">Become part of the ThriveWithSCD community today.</h2>
                  <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                    Join a premium platform that blends education, community, research, and AI-powered support into one cohesive experience.
                  </p>
                </div>
                <div className="flex flex-wrap gap-4">
                  <Link href="/signup" className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400">
                    Join the community
                  </Link>
                  <Link href="/login" className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                    Login
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

