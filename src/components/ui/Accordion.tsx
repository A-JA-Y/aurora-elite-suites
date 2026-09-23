"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState, type ReactNode } from "react";
import { cn, EASE_EXPO } from "@/lib/utils";

export interface AccordionEntry {
  id: string;
  title: string;
  content: ReactNode;
}

interface AccordionProps {
  items: AccordionEntry[];
  className?: string;
  defaultOpen?: string | null;
  tone?: "light" | "dark";
}

export function Accordion({ items, className, defaultOpen = null, tone = "light" }: AccordionProps) {
  const [open, setOpen] = useState<string | null>(defaultOpen);
  const dark = tone === "dark";
  return (
    <div className={cn("divide-y", dark ? "divide-ivory/15" : "divide-charcoal/12", className)}>
      {items.map((item) => {
        const isOpen = open === item.id;
        return (
          <div key={item.id} className="group">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : item.id)}
              aria-expanded={isOpen}
              aria-controls={`acc-${item.id}`}
              className={cn(
                "flex w-full items-start justify-between gap-6 py-5 text-left transition-colors sm:py-6",
                dark ? "text-ivory hover:text-brass" : "text-charcoal hover:text-fairway",
              )}
              data-cursor="link"
            >
              <span className="font-display text-[1.35rem] leading-snug sm:text-[1.55rem]">{item.title}</span>
              <span
                className={cn(
                  "mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full ring-1 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                  dark ? "ring-ivory/25" : "ring-charcoal/15",
                  isOpen && (dark ? "bg-brass text-ink ring-brass" : "bg-fairway text-ivory ring-fairway"),
                )}
              >
                <Plus className={cn("h-4 w-4 transition-transform duration-500", isOpen && "rotate-45")} strokeWidth={1.75} />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`acc-${item.id}`}
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.6, ease: EASE_EXPO }}
                  className="overflow-hidden"
                >
                  <div className={cn("max-w-[64ch] pb-6 text-[1.0625rem] leading-relaxed sm:pb-8", dark ? "text-ivory/70" : "text-stone")}>
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
