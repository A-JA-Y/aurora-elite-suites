"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, MessageCircle, Phone, Sparkles, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { SITE } from "@/data/site";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { cn, EASE_EXPO } from "@/lib/utils";
import { useUI } from "@/components/layout/Providers";
import { renderMarkdown } from "./markdown";

interface Msg {
  id: string;
  role: "user" | "assistant";
  content: string;
  pending?: boolean;
}

const SUGGESTIONS = [
  "What are the check-in and check-out times?",
  "How far is India Expo Mart?",
  "What's the difference between the two suites?",
  "Can I use the swimming pool?",
  "Are pets allowed?",
  "Is there a metro station nearby?",
];

const GREETING =
  "Hello, I'm Aurora, the assistant for Aurora Elite Suites. Ask me about the suites, amenities, check-in, the township or getting around Greater Noida. For availability and today's rate, I'll point you to the team on WhatsApp.";

let counter = 0;
const uid = () => `${Date.now().toString(36)}-${(counter++).toString(36)}`;

export function Assistant() {
  const { assistantOpen, openAssistant, closeAssistant, assistantPrompt, consumeAssistantPrompt, lockScroll, preloaderDone, menuOpen } = useUI();
  const isMobile = useIsMobile();
  const [messages, setMessages] = useState<Msg[]>([{ id: "hello", role: "assistant", content: GREETING }]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  // Lock the page behind the full-screen sheet on phones.
  useEffect(() => {
    if (!assistantOpen || !isMobile) return;
    lockScroll(true);
    return () => lockScroll(false);
  }, [assistantOpen, isMobile, lockScroll]);

  useEffect(() => {
    if (assistantOpen) setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 350);
  }, [assistantOpen]);

  const scrollToEnd = useCallback(() => {
    const el = listRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, []);

  useEffect(scrollToEnd, [messages, scrollToEnd]);

  const send = useCallback(
    async (text: string) => {
      const question = text.trim();
      if (!question || busy) return;
      setInput("");
      const userMsg: Msg = { id: uid(), role: "user", content: question };
      const pendingId = uid();
      const history = [...messages.filter((m) => m.id !== "hello"), userMsg];
      setMessages((prev) => [...prev, userMsg, { id: pendingId, role: "assistant", content: "", pending: true }]);
      setBusy(true);

      const controller = new AbortController();
      abortRef.current = controller;
      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ messages: history.map(({ role, content }) => ({ role, content })) }),
          signal: controller.signal,
        });
        if (!res.ok || !res.body) {
          const msg = res.status === 429 ? await res.text() : `Sorry, something went wrong. You can reach the team on WhatsApp at ${SITE.phoneDisplay}.`;
          setMessages((prev) => prev.map((m) => (m.id === pendingId ? { ...m, content: msg, pending: false } : m)));
          return;
        }
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let acc = "";
        for (;;) {
          const { value, done } = await reader.read();
          if (done) break;
          acc += decoder.decode(value, { stream: true });
          setMessages((prev) => prev.map((m) => (m.id === pendingId ? { ...m, content: acc, pending: false } : m)));
        }
        acc += decoder.decode();
        setMessages((prev) => prev.map((m) => (m.id === pendingId ? { ...m, content: acc.trim() || "Sorry, I couldn't find that. The team can help on WhatsApp.", pending: false } : m)));
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          setMessages((prev) =>
            prev.map((m) => (m.id === pendingId ? { ...m, content: `I couldn't connect just now. WhatsApp the team at ${SITE.phoneDisplay} and they'll help right away.`, pending: false } : m)),
          );
        }
      } finally {
        setBusy(false);
        abortRef.current = null;
      }
    },
    [busy, messages],
  );

  // A prompt handed in from elsewhere on the site (e.g. FAQ "Ask Aurora").
  useEffect(() => {
    if (!assistantOpen || !assistantPrompt) return;
    const prompt = assistantPrompt;
    const t = window.setTimeout(() => {
      consumeAssistantPrompt();
      void send(prompt);
    }, 0);
    return () => window.clearTimeout(t);
  }, [assistantOpen, assistantPrompt, consumeAssistantPrompt, send]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    void send(input);
  };
  const onKey = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void send(input);
    }
  };

  const showSuggestions = messages.length <= 1;

  return (
    <>
      {/* Launcher (desktop; phones use the dock's Ask button) */}
      <AnimatePresence>
        {preloaderDone && !assistantOpen && !menuOpen && (
          <motion.button
            key="launcher"
            type="button"
            onClick={() => openAssistant()}
            aria-label="Ask the Aurora assistant"
            className="group fixed bottom-6 right-6 z-[56] hidden items-center gap-3 rounded-full bg-forest pl-4 pr-1.5 py-1.5 text-ivory shadow-soft ring-1 ring-brass/30 md:flex"
            initial={{ opacity: 0, y: 24, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.9 }}
            transition={{ duration: 0.6, ease: EASE_EXPO }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            data-cursor="link"
          >
            <span className="font-sans text-[0.8125rem] font-semibold tracking-[0.02em]">Ask Aurora</span>
            <span className="relative grid h-11 w-11 place-items-center rounded-full bg-fairway">
              <span className="absolute inset-0 rounded-full bg-brass/40 animate-pulse-soft" />
              <Sparkles className="relative h-5 w-5 text-brass-2" strokeWidth={1.6} />
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {assistantOpen && (
          <>
            {isMobile && (
              <motion.button
                key="ai-backdrop"
                type="button"
                aria-label="Close assistant"
                onClick={closeAssistant}
                className="fixed inset-0 z-[86] bg-ink/50 backdrop-blur-[2px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            )}
            <motion.section
              key="panel"
              role="dialog"
              aria-modal={isMobile}
              aria-label="Aurora assistant"
              className={cn(
                "fixed z-[87] flex flex-col overflow-hidden bg-ivory text-charcoal shadow-soft ring-1 ring-charcoal/10",
                isMobile
                  ? "inset-x-0 bottom-0 h-[92svh] rounded-t-[1.75rem]"
                  : "bottom-6 right-6 h-[min(720px,calc(100svh-3rem))] w-[400px] rounded-[1.5rem]",
              )}
              initial={isMobile ? { y: "100%" } : { opacity: 0, y: 24, scale: 0.96 }}
              animate={isMobile ? { y: 0 } : { opacity: 1, y: 0, scale: 1 }}
              exit={isMobile ? { y: "100%" } : { opacity: 0, y: 24, scale: 0.96 }}
              transition={{ duration: 0.55, ease: EASE_EXPO }}
            >
              {/* Header */}
              <header className="relative flex items-center gap-3 border-b hairline bg-forest px-4 py-3.5 text-ivory grain">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-fairway ring-1 ring-brass/50">
                  <span className="font-display text-[0.8rem] font-semibold tracking-[0.08em]">AES</span>
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-display text-[1.15rem] leading-none">Aurora Assistant</p>
                  <p className="mt-1 flex items-center gap-1.5 font-sans text-[0.7rem] text-ivory/65">
                    <span className="h-1.5 w-1.5 rounded-full bg-brass-2 animate-pulse-soft" /> Answers from this website only
                  </p>
                </div>
                <button type="button" onClick={closeAssistant} aria-label="Close" className="grid h-9 w-9 place-items-center rounded-full ring-1 ring-ivory/25 transition hover:bg-ivory/10" data-cursor="link">
                  <X className="h-4 w-4" strokeWidth={1.75} />
                </button>
              </header>

              {/* Messages */}
              <div ref={listRef} data-lenis-prevent className="flex-1 space-y-4 overflow-y-auto px-4 py-5 no-scrollbar">
                {messages.map((m) => (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: EASE_EXPO }}
                    className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}
                  >
                    <div
                      className={cn(
                        "max-w-[86%] rounded-2xl px-4 py-3 text-[0.9375rem] leading-relaxed [&_ol]:my-1.5 [&_p+p]:mt-2 [&_ul]:my-1.5",
                        m.role === "user" ? "rounded-br-md bg-fairway text-ivory" : "rounded-bl-md bg-sand text-charcoal",
                      )}
                    >
                      {m.pending ? (
                        <span className="flex items-center gap-1 py-1" aria-label="Thinking">
                          {[0, 1, 2].map((i) => (
                            <motion.span
                              key={i}
                              className="h-1.5 w-1.5 rounded-full bg-oak"
                              animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                              transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.15 }}
                            />
                          ))}
                        </span>
                      ) : m.role === "assistant" ? (
                        renderMarkdown(m.content)
                      ) : (
                        m.content
                      )}
                    </div>
                  </motion.div>
                ))}

                {showSuggestions && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }} className="flex flex-wrap gap-2 pt-1">
                    {SUGGESTIONS.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => void send(s)}
                        className="rounded-full bg-white/70 px-3.5 py-2 text-left font-sans text-[0.8125rem] text-charcoal ring-1 ring-charcoal/10 transition hover:bg-white hover:ring-fairway/40"
                        data-cursor="link"
                      >
                        {s}
                      </button>
                    ))}
                  </motion.div>
                )}
              </div>

              {/* Composer */}
              <form onSubmit={onSubmit} className="border-t hairline bg-cream/70 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3">
                <div className="flex items-end gap-2 rounded-2xl bg-white px-3 py-2 ring-1 ring-charcoal/10 focus-within:ring-fairway/50">
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={onKey}
                    rows={1}
                    maxLength={1000}
                    placeholder="Ask about the suites, check-in, the area…"
                    aria-label="Your question"
                    className="max-h-32 min-h-[2.25rem] flex-1 resize-none bg-transparent py-1.5 font-sans text-[0.9375rem] text-charcoal placeholder:text-stone/70 focus:outline-none"
                    style={{ fieldSizing: "content" } as React.CSSProperties}
                  />
                  <button
                    type="submit"
                    disabled={busy || !input.trim()}
                    aria-label="Send"
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-fairway text-ivory transition disabled:opacity-40"
                    data-cursor="link"
                  >
                    <ArrowUp className="h-4 w-4" strokeWidth={2} />
                  </button>
                </div>
                <div className="mt-2.5 flex items-center justify-between gap-3 px-1 font-sans text-[0.7rem] text-stone">
                  <span>For rates and availability, message the team.</span>
                  <span className="flex items-center gap-2">
                    <a href={SITE.whatsappPrefilled} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-full bg-sand px-2.5 py-1 font-semibold text-fairway hover:bg-sand-2" data-cursor="link">
                      <MessageCircle className="h-3 w-3" strokeWidth={2} /> WhatsApp
                    </a>
                    <a href={SITE.phoneTel} className="inline-flex items-center gap-1 rounded-full bg-sand px-2.5 py-1 font-semibold text-fairway hover:bg-sand-2" data-cursor="link">
                      <Phone className="h-3 w-3" strokeWidth={2} /> Call
                    </a>
                  </span>
                </div>
              </form>
            </motion.section>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
