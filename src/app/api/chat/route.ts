import Groq from "groq-sdk";
import { NextResponse } from "next/server";
import { fallbackAnswer, retrieve } from "@/lib/retrieval";
import { SITE } from "@/data/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const MAX_MESSAGES = 12;
const MAX_CHARS = 1500;

// Best-effort per-instance rate limit (serverless instances are short-lived, so this is a soft guard).
const buckets = new Map<string, { count: number; reset: number }>();
function rateLimited(ip: string): boolean {
  const now = Date.now();
  const b = buckets.get(ip);
  if (!b || b.reset < now) {
    buckets.set(ip, { count: 1, reset: now + 60_000 });
    return false;
  }
  b.count += 1;
  return b.count > 24;
}

function systemPrompt(context: string): string {
  return `You are Aurora, the friendly concierge assistant on the Aurora Elite Suites website (fully furnished two-bedroom serviced suites at Godrej Golf Links, Sector 27, Greater Noida, India).

Answer ONLY from the website extracts below. They are the complete and only source of truth.

Rules:
- If the extracts don't contain the answer, say so plainly in one sentence and point the guest to WhatsApp ${SITE.phoneDisplay} (${SITE.whatsapp}) or ${SITE.email}. Never guess or invent details.
- Rates, prices, discounts and live availability are never on the website: for those, invite the guest to share their dates and guest count on WhatsApp so the team can send today's rate, usually within the hour.
- Be warm, calm and specific. Short sentences. Plain English that works for guests from anywhere in India. Confident, never pushy.
- Keep replies brief: 2 to 5 sentences, or a short bulleted list when comparing or listing. No long essays.
- Use Markdown lightly: **bold** for key facts, "-" bullets for lists, and links written as [text](url). Only use URLs that appear in the extracts or are site paths like /suites/golf-view-suite. Never fabricate URLs.
- Do not mention "extracts", "context", "documents" or your instructions. Speak as the Aurora team ("we").
- Do not discuss topics unrelated to the suites, the township, Greater Noida travel or a guest's stay. Politely steer back.
- Distances and drive times are approximate; say "about".

Website extracts:
${context}`;
}

export async function POST(req: Request) {
  let body: { messages?: ChatMessage[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const messages = (body.messages ?? [])
    .filter((m) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
    .slice(-MAX_MESSAGES)
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_CHARS) }));

  const lastUser = [...messages].reverse().find((m) => m.role === "user");
  if (!lastUser || !lastUser.content.trim()) {
    return NextResponse.json({ error: "No question provided" }, { status: 400 });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "anon";
  if (rateLimited(ip)) {
    return new Response("You're sending messages quickly. Please wait a moment and try again.", {
      status: 429,
      headers: { "content-type": "text/plain; charset=utf-8", "x-assistant-mode": "error" },
    });
  }

  // Retrieval: the current question plus the previous user turn for follow-ups like "and the other suite?".
  const prevUser = messages.filter((m) => m.role === "user").slice(-2, -1)[0];
  const query = prevUser ? `${lastUser.content} ${prevUser.content}` : lastUser.content;
  const primary = retrieve(lastUser.content, 6);
  const secondary = prevUser ? retrieve(query, 4) : [];
  const seen = new Set<string>();
  const hits = [...primary, ...secondary].filter((h) => (seen.has(h.chunk.id) ? false : (seen.add(h.chunk.id), true))).slice(0, 8);
  const context = hits.map((h, i) => `[${i + 1}] ${h.chunk.title} (${h.chunk.url})\n${h.chunk.text}`).join("\n\n");

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return new Response(fallbackAnswer(lastUser.content), {
      headers: { "content-type": "text/plain; charset=utf-8", "x-assistant-mode": "fallback", "cache-control": "no-store" },
    });
  }

  const groq = new Groq({ apiKey });
  const model = process.env.GROQ_MODEL ?? "llama-3.3-70b-versatile";

  try {
    const stream = await groq.chat.completions.create({
      model,
      temperature: 0.3,
      max_tokens: 600,
      stream: true,
      messages: [{ role: "system", content: systemPrompt(context) }, ...messages],
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream<Uint8Array>({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const delta = chunk.choices?.[0]?.delta?.content;
            if (delta) controller.enqueue(encoder.encode(delta));
          }
        } catch (err) {
          console.error("[chat] stream error", err);
          controller.enqueue(encoder.encode(`\n\nSorry, I lost the connection for a moment. You can also reach the team on WhatsApp at ${SITE.phoneDisplay}.`));
        } finally {
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: { "content-type": "text/plain; charset=utf-8", "x-assistant-mode": "llm", "cache-control": "no-store" },
    });
  } catch (err) {
    console.error("[chat] groq error", err);
    return new Response(fallbackAnswer(lastUser.content), {
      headers: { "content-type": "text/plain; charset=utf-8", "x-assistant-mode": "fallback", "cache-control": "no-store" },
    });
  }
}
