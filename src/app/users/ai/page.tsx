"use client";

import { useEffect, useMemo, useState } from "react";
import { SiteShell } from "@/components/site-shell";
import { useAuth } from "@/context/auth-context";
import { useCommunity } from "@/context/community-context";

export default function AIProfilePage() {
  const { hydrated, user } = useAuth();
  const { profiles, messages, sendDirectMessage } = useCommunity();
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (!hydrated) return;
    document.title = "ThriveAI — Chat";
  }, [hydrated]);

  if (!hydrated) return null;

  if (!user) {
    return (
      <SiteShell title="ThriveAI" description="Chat with ThriveAI.">
        <div className="surface-card p-6">
          <p className="text-lg text-slate-100">Please sign in to message ThriveAI.</p>
        </div>
      </SiteShell>
    );
  }

  const aiProfile = profiles.find((p) => p.id === "ai") || { name: "ThriveAI", avatar: "" };

  const thread = useMemo(() => {
    return messages
      .filter((m) => (m.senderId === "ai" && m.recipientId === user.id) || (m.senderId === user.id && m.recipientId === "ai"))
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  }, [messages, user]);

  const handleSend = async () => {
    if (!draft.trim()) return;
    setSending(true);
    try {
      await sendDirectMessage("ai", draft.trim());
      setDraft("");
    } finally {
      setSending(false);
    }
  };

  return (
    <SiteShell title={`ThriveAI`} description="Chat with ThriveAI for guidance and research summaries.">
      <div className="grid gap-6 lg:grid-cols-[0.9fr_0.5fr]">
        <section className="surface-card p-6 shadow-[0_24px_70px_-40px_rgba(56,189,248,0.18)]">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-2xl bg-linear-to-br from-violet-600 to-sky-400 flex items-center justify-center text-white font-semibold">AI</div>
            <div>
              <h1 className="text-2xl font-semibold text-white">{aiProfile.name}</h1>
              <p className="text-sm text-slate-400">Your in-app assistant for research, support, and navigation.</p>
            </div>
          </div>

          <div className="mt-6 surface-panel p-4 max-h-130 overflow-y-auto space-y-4">
            {thread.length === 0 ? (
              <p className="text-sm text-slate-400">No messages yet. Say hello to ThriveAI.</p>
            ) : (
              thread.map((m) => {
                const isAi = m.senderId === "ai";
                return (
                  <div key={m.id} className={`max-w-[80%] rounded-[1.25rem] px-4 py-3 ${isAi ? "bg-slate-900 text-slate-100" : "bg-linear-to-r from-violet-600 to-sky-500 text-white ml-auto shadow-lg shadow-violet-500/20"}`}>
                    <p className="text-sm leading-6">{m.content}</p>
                    <p className="mt-2 text-xs text-slate-400">{new Date(m.createdAt).toLocaleString()}</p>
                  </div>
                );
              })
            )}
          </div>

          <div className="mt-4 surface-panel p-4">
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              rows={3}
              className="input-field"
              placeholder="Ask ThriveAI a question or request a summary..."
            />
            <div className="mt-3 flex items-center justify-end gap-3">
              <button type="button" onClick={handleSend} disabled={sending || !draft.trim()} className="btn-primary">
                {sending ? "Sending…" : "Send to ThriveAI"}
              </button>
            </div>
          </div>
        </section>

        <aside className="space-y-6">
          <div className="surface-card p-6 ring-1 ring-sky-400/10 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-violet-400">AI Tips</p>
            <ul className="mt-4 space-y-3 text-sm text-slate-300">
              <li>• Tag @ThriveAI in public posts to get an assistant reply.</li>
              <li>• Ask for research summaries or suggested care links.</li>
              <li>• Use concise questions for faster replies.</li>
            </ul>
          </div>
        </aside>
      </div>
    </SiteShell>
  );
}
