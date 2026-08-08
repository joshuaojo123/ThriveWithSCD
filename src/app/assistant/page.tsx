"use client";

import { useState } from "react";
import { SiteShell } from "@/components/site-shell";
import { Sparkles, ShieldCheck, BookOpen, MessageCircle, Search } from "lucide-react";

const suggestions = [
  "How can I manage SCD pain naturally?",
  "What should I know before visiting a hematologist?",
  "Share the latest research on Sickle Cell Disease.",
  "How do I prepare for a hospital stay?",
  "Where can I find trusted caregiver support?",
];

export default function AssistantPage() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState<string | null>(null);
  const [actions, setActions] = useState<Array<{ label: string; href: string }>>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleAsk = async () => {
    if (!question.trim()) return;
    setIsLoading(true);
    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      const data = await response.json();

      setAnswer(data.reply || "ThriveAI could not answer that right now.");
      setActions(data.actions || []);
    } catch (error) {
      setAnswer("ThriveAI is offline right now. Please try again in a moment.");
      setActions([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SiteShell title="AI Assistant" description="Get smart guidance, summaries, and research insights across the ThriveWithSCD platform.">
      <div className="space-y-8">
        <section className="rounded-[2rem] border border-slate-800 bg-[#0d1018] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-400">Native AI guidance</p>
              <h1 className="mt-3 max-w-3xl text-4xl font-semibold text-white">Ask ThriveAI anything related to Sickle Cell health, research, or community support.</h1>
            </div>
            <div className="rounded-[2rem] border border-slate-800 bg-[#11131d] px-6 py-5 text-sm text-slate-300">
              <p className="font-semibold text-slate-100">Medical disclaimer</p>
              <p className="mt-2 leading-7 text-slate-400">
                ThriveAI is a supportive research and education assistant. It is not a substitute for professional medical advice.
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-[1.5fr_0.9fr]">
            <div className="space-y-4">
              <div className="rounded-[1.75rem] border border-slate-800 bg-[#11131d] p-5">
                <div className="flex items-center gap-3 text-slate-300">
                  <Search className="h-5 w-5 text-violet-400" />
                  <p className="text-sm font-semibold text-white">Ask a question</p>
                </div>
                <textarea
                  value={question}
                  onChange={(event) => setQuestion(event.target.value)}
                  placeholder="Ask about symptom management, community resources, research summaries, or Thrive products..."
                  rows={4}
                  className="mt-4 w-full rounded-[1.5rem] border border-slate-700 bg-[#0b111b] px-4 py-4 text-sm text-white outline-none placeholder:text-slate-500"
                />
                <button
                  type="button"
                  onClick={handleAsk}
                  disabled={!question.trim() || isLoading}
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-sky-500 px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Sparkles className="h-4 w-4" />
                  {isLoading ? "Thinking..." : "Ask ThriveAI"}
                </button>
              </div>

              <div className="rounded-[1.75rem] border border-slate-800 bg-[#11131d] p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-400">Suggestions</p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {suggestions.map((item) => (
                    <button
                      type="button"
                      key={item}
                      onClick={() => setQuestion(item)}
                      className="rounded-3xl border border-slate-700 bg-[#0b111b] px-4 py-3 text-left text-sm text-slate-200 transition hover:border-violet-400 hover:bg-slate-900"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-slate-800 bg-[#11131d] p-6 text-slate-300 shadow-inner shadow-black/20">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-400">What ThriveAI can do</p>
              <ul className="mt-5 space-y-4 text-sm leading-7">
                <li>• Summarize articles, research, and educational content.</li>
                <li>• Answer FAQs about SCD symptoms, treatments, and support.</li>
                <li>• Help you discover relevant Thrive products and resources.</li>
                <li>• Provide personalized community recommendations.</li>
                <li>• Guide you to trusted care pathways and learning materials.</li>
              </ul>
              <div className="mt-6 rounded-[1.5rem] border border-slate-800 bg-[#0b111b] p-5">
                <p className="text-sm font-semibold text-white">How it works</p>
                <p className="mt-3 text-sm text-slate-400">Type a question, then review the suggested answer. Use the result as a starting point and consult health professionals for clinical decisions.</p>
              </div>
            </div>
          </div>

          {answer ? (
            <div className="mt-8 rounded-[1.75rem] border border-slate-800 bg-[#0b111b] p-6 text-slate-100 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-400">ThriveAI response</p>
              <p className="mt-4 text-sm leading-7 text-slate-200">{answer}</p>
            </div>
          ) : null}
        </section>

        <section className="grid gap-4 lg:grid-cols-3">
          <div className="rounded-[2rem] border border-slate-800 bg-[#0d1018] p-6 text-slate-300 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-violet-400">Discover curated resources</p>
            <p className="mt-4 text-sm leading-7 text-slate-300">Browse summaries, events, care plans, and supportive tools designed for the SCD community.</p>
          </div>
          <div className="rounded-[2rem] border border-slate-800 bg-[#0d1018] p-6 text-slate-300 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-400">Personalized wellness</p>
            <p className="mt-4 text-sm leading-7 text-slate-300">Future ThriveAI features will include symptom tracking, medication reminders, and tailored health education.</p>
          </div>
          <div className="rounded-[2rem] border border-slate-800 bg-[#0d1018] p-6 text-slate-300 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-400">Community support</p>
            <p className="mt-4 text-sm leading-7 text-slate-300">Stay connected with mentors, experts, and care partners through the Thrive network.</p>
          </div>
        </section>
      </div>
    </SiteShell>
  );
}
