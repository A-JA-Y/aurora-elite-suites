"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { BedDouble, CalendarDays, Home, Menu, Sparkles } from "lucide-react";
import { cn, EASE_EXPO } from "@/lib/utils";
import { useUI } from "./Providers";
import { BookSheet } from "./BookSheet";

const items = [
  { key: "home", label: "Home", href: "/", icon: Home },
  { key: "suites", label: "Suites", href: "/suites", icon: BedDouble },
  { key: "book", label: "Book", icon: CalendarDays },
  { key: "ask", label: "Ask", icon: Sparkles },
  { key: "menu", label: "Menu", icon: Menu },
] as const;

/** Floating glass dock for phones: Home · Suites · Book · Ask · Menu. */
export function MobileDock() {
  const pathname = usePathname();
  const { menuOpen, assistantOpen, bookOpen, openBook, openAssistant, openMenu, preloaderDone } = useUI();
  const hidden = menuOpen || assistantOpen;

  return (
    <>
      <AnimatePresence>
        {preloaderDone && !hidden && (
          <motion.nav
            key="dock"
            aria-label="Quick actions"
            className="fixed inset-x-4 z-[55] md:hidden"
            style={{ bottom: "max(0.875rem, env(safe-area-inset-bottom))" }}
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.6, ease: EASE_EXPO }}
          >
            <div className="glass-dark relative mx-auto flex h-[4.25rem] max-w-[26rem] items-end justify-between rounded-[2rem] px-2 pb-2 text-ivory shadow-dock ring-1 ring-white/10">
              {items.map((item) => {
                const Icon = item.icon;
                if (item.key === "book") {
                  return (
                    <button
                      key={item.key}
                      type="button"
                      onClick={openBook}
                      aria-label="Book your stay"
                      aria-expanded={bookOpen}
                      className="relative -mt-7 flex flex-1 flex-col items-center"
                    >
                      <motion.span
                        whileTap={{ scale: 0.92 }}
                        className="grid h-[3.75rem] w-[3.75rem] place-items-center rounded-full bg-fairway text-ivory shadow-[0_14px_30px_-8px_rgba(47,91,64,0.9)] ring-[3px] ring-forest"
                      >
                        <span className="absolute inset-0 rounded-full ring-1 ring-brass/60" />
                        <Icon className="h-6 w-6" strokeWidth={1.6} />
                      </motion.span>
                      <span className="mt-1.5 font-sans text-[0.625rem] font-semibold tracking-[0.12em] uppercase text-brass">Book</span>
                    </button>
                  );
                }

                const isLink = "href" in item;
                const active = isLink && (item.href === "/" ? pathname === "/" : pathname.startsWith(item.href));
                const content = (
                  <>
                    <span className="relative grid h-9 w-11 place-items-center">
                      {active && (
                        <motion.span
                          layoutId="dock-active"
                          className="absolute inset-0 rounded-full bg-ivory/12"
                          transition={{ duration: 0.5, ease: EASE_EXPO }}
                        />
                      )}
                      <Icon className={cn("relative h-[1.35rem] w-[1.35rem]", active ? "text-brass-2" : "text-ivory/85")} strokeWidth={1.6} />
                    </span>
                    <span className={cn("font-sans text-[0.625rem] font-medium tracking-[0.06em]", active ? "text-brass-2" : "text-ivory/70")}>{item.label}</span>
                  </>
                );

                const cls = "flex flex-1 flex-col items-center gap-0.5 py-1 active:scale-95 transition-transform";
                if (isLink) {
                  return (
                    <Link key={item.key} href={item.href} className={cls} aria-current={active ? "page" : undefined}>
                      {content}
                    </Link>
                  );
                }
                return (
                  <button
                    key={item.key}
                    type="button"
                    className={cls}
                    onClick={item.key === "ask" ? () => openAssistant() : openMenu}
                    aria-label={item.key === "ask" ? "Ask the Aurora assistant" : "Open menu"}
                  >
                    {content}
                  </button>
                );
              })}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
      <BookSheet />
    </>
  );
}
