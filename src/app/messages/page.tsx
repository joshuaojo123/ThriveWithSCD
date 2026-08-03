"use client";

import { useState } from "react";
import Link from "next/link";
import { SiteShell } from "@/components/site-shell";
import { useAuth } from "@/context/auth-context";
import { useCommunity } from "@/context/community-context";

export default function MessagesPage() {
  const { hydrated, user } = useAuth();
  const { profiles, messages, sendDirectMessage } = useCommunity();
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [messageDraft, setMessageDraft] = useState("");

  if (!hydrated) {
    return null;
  }

  if (!user) {
    return (
      <SiteShell title="Messages" description="Sign in to message mentors, professionals, and community peers.">
        <div className="rounded-[2rem] border border-white/70 bg-white/80 p-8 shadow-sm">
          <p className="text-lg text-slate-700">
            Please <Link href="/login" className="font-semibold text-violet-700">log in</Link> to open direct messages.
          </p>
        </div>
      </SiteShell>
    );
  }

  const contacts = profiles.filter((profile) => profile.id !== user.id);
  const selectedUser = contacts.find((profile) => profile.id === selectedUserId) || contacts[0] || null;

  const thread = selectedUser
    ? messages.filter(
        (message) =>
          (message.senderId === user.id && message.recipientId === selectedUser.id) ||
          (message.senderId === selectedUser.id && message.recipientId === user.id),
      )
    : [];

  const handleSendMessage = () => {
    if (!selectedUser || !messageDraft.trim()) return;
    sendDirectMessage(selectedUser.id, messageDraft.trim());
    setMessageDraft("");
  };

  return (
    <SiteShell title="Messages" description="Stay connected with conversations from your network, mentors, and community peers.">
      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <aside className="space-y-6 rounded-[2rem] border border-white/70 bg-white/95 p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-violet-700">Contacts</p>
          <div className="space-y-3">
            {contacts.map((contact) => (
              <button
                key={contact.id}
                type="button"
                onClick={() => setSelectedUserId(contact.id)}
                className={`w-full rounded-3xl px-4 py-3 text-left transition ${
                  selectedUserId === contact.id || (!selectedUserId && contacts[0]?.id === contact.id)
                    ? "bg-violet-600 text-white"
                    : "bg-slate-50 text-slate-700 hover:bg-violet-50"
                }`}
              >
                <p className="font-semibold">{contact.name}</p>
                <p className="mt-1 text-sm text-slate-500">{contact.headline}</p>
              </button>
            ))}
          </div>
        </aside>

        <section className="space-y-6 rounded-[2rem] border border-white/70 bg-white/95 p-6 shadow-sm">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-700">Conversation</p>
            <h1 className="mt-3 text-2xl font-semibold text-slate-950">
              {selectedUser ? `Chat with ${selectedUser.name}` : "Select a contact"}
            </h1>
          </div>

          <div className="space-y-4 border border-slate-200 bg-slate-50 p-4 rounded-[1.75rem] max-h-[520px] overflow-y-auto">
            {selectedUser ? (
              thread.length === 0 ? (
                <p className="text-sm text-slate-600">No messages yet. Send the first note to start the conversation.</p>
              ) : (
                thread
                  .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
                  .map((message) => {
                    const isSentByUser = message.senderId === user.id;
                    return (
                      <div
                        key={message.id}
                        className={`rounded-[1.5rem] px-4 py-3 ${
                          isSentByUser ? "ml-auto bg-violet-600 text-white" : "bg-white text-slate-700"
                        } max-w-[85%]`}
                      >
                        <p className="text-sm leading-6">{message.content}</p>
                        <p className="mt-2 text-xs text-slate-400">{new Date(message.createdAt).toLocaleString()}</p>
                      </div>
                    );
                  })
              )
            ) : (
              <p className="text-sm text-slate-600">Choose a contact from the left to open direct messages.</p>
            )}
          </div>

          {selectedUser ? (
            <div className="grid gap-4">
              <textarea
                value={messageDraft}
                onChange={(event) => setMessageDraft(event.target.value)}
                rows={4}
                placeholder="Write your message..."
                className="w-full rounded-[1.5rem] border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none"
              />
              <button
                type="button"
                onClick={handleSendMessage}
                disabled={!messageDraft.trim()}
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-emerald-500 px-5 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                Send message
              </button>
            </div>
          ) : null}
        </section>
      </div>
    </SiteShell>
  );
}
