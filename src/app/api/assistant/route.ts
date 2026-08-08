import { NextResponse } from "next/server";

function createReply(question: string) {
  const normalized = question.trim().toLowerCase();

  if (/pain|flare|crisis|episode/.test(normalized)) {
    return "I hear you — start with gentle hydration, rest, and a trusted pain management routine. I can also point you to recent SCD care guides, research summaries, or community coping stories if you want.";
  }

  if (/research|study|trial|therapy|treatment/.test(normalized)) {
    return "Here is a quick summary: recent sickle cell research focuses on gene therapies, improved pain protocols, and access to specialist care. I can take you to the latest research page or suggest trusted educational resources.";
  }

  if (/community|connect|mentor|support/.test(normalized)) {
    return "You can connect with mentors, professionals, and peers here. If you want, I can open the community feed or help you find someone who has experience with the exact challenge you described.";
  }

  if (/profile|messages|chat|conversation/.test(normalized)) {
    return "I can help you manage your conversations and follow the right community members. Use the Messages page to continue the chat and I can keep you organized.";
  }

  if (/store|product|tool|resource/.test(normalized)) {
    return "I can recommend Thrive tools and wellness resources based on your needs. Ask me for adaptive products, care gear, or support plans.";
  }

  return "I’m ThriveAI, your in-app assistant for SCD support. Ask me about symptoms, community connections, research, or how to use ThriveWithSCD. I can also open the right page for you.";
}

function inferActions(question: string) {
  const normalized = question.trim().toLowerCase();
  const actions: Array<{ label: string; href: string }> = [];

  if (/community|connect|mentor|support/.test(normalized)) {
    actions.push({ label: "Open community feed", href: "/community" });
  }

  if (/research|study|trial|therapy/.test(normalized)) {
    actions.push({ label: "View research page", href: "/research" });
  }

  if (/profile|account|me/.test(normalized)) {
    actions.push({ label: "Open your profile", href: "/users/me" });
  }

  if (/message|chat|conversation/.test(normalized)) {
    actions.push({ label: "Open Messages", href: "/messages" });
  }

  if (/store|product|shop/.test(normalized)) {
    actions.push({ label: "Browse the Thrive Store", href: "/store" });
  }

  if (actions.length === 0) {
    actions.push({ label: "Explore AI assistant", href: "/assistant" });
    actions.push({ label: "Browse community feed", href: "/community" });
  }

  return actions;
}

export async function POST(request: Request) {
  const body = await request.json();
  const question = String(body?.question ?? "").trim();

  if (!question) {
    return NextResponse.json(
      { reply: "Please tell ThriveAI what you'd like help with.", actions: [{ label: "Ask ThriveAI", href: "/assistant" }] },
      { status: 400 },
    );
  }

  const reply = createReply(question);
  const actions = inferActions(question);

  return NextResponse.json({ reply, actions });
}
