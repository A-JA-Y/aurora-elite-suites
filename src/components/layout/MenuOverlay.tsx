"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { ArrowUpRight, Mail, MessageCircle, Phone } from "lucide-react";
import { NAV, SITE } from "@/data/site";
import { img } from "@/data/images";
import { cn, EASE_EXPO, EASE_IN_OUT, pad2 } from "@/lib/utils";
import { SmartImage } from "@/components/ui/SmartImage";
import { Wordmark } from "./Wordmark";
import { useUI } from "./Providers";

const EXTRA = [
  { label: "About Us", href: "/about" },
  { label: "House Rules", href: "/house-rules" },
];

export function MenuOverlay() {
  const { menuOpen, closeMenu } = useUI();
  const pathname = usePathname();
  const [hover, setHover] = useState<number>(0);
  const preview = NAV[hover] ?? NAV[0];

  return (
    <AnimatePresence>
      {menuOpen && (
        <motion.div
          key="menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-0 z-[70] flex flex-col bg-forest text-ivory grain"
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(100% 0 0 0)" }}
          transition={{ duration: 0.85, ease: EASE_IN_OUT }}
        >
          <div className="container-x flex h-[var(--header-h)] shrink-0 items-center justify-between">
            <Wordmark tone="light" onClick={closeMenu} />
            <button
              type="button"
              onClick={closeMenu}
              className="group grid h-11 w-11 place-items-center rounded-full ring-1 ring-ivory/30 transition hover:ring-ivory"
              aria-label="Close menu"
              data-cursor="link"
            >
              <span className="relative block h-4 w-4">
                <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 rotate-45 bg-current transition-transform duration-500 group-hover:rotate-[135deg]" />
                <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 -rotate-45 bg-current transition-transform duration-500 group-hover:rotate-[45deg]" />
              </span>
            </button>
          </div>

          <div className="container-x flex min-h-0 flex-1 flex-col overflow-y-auto no-scrollbar" data-lenis-prevent>
            <div className="grid flex-1 items-center gap-10 py-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
              <nav aria-label="Menu">
                <ul className="flex flex-col">
                  {NAV.map((item, i) => {
                    const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                    return (
                      <motion.li
                        key={item.href}
                        initial={{ y: 40, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 20, opacity: 0, transition: { duration: 0.3 } }}
                        transition={{ duration: 0.9, delay: 0.25 + i * 0.05, ease: EASE_EXPO }}
                        onMouseEnter={() => setHover(i)}
                        onFocus={() => setHover(i)}
                        className="border-b hairline-light"
                      >
                        <Link
                          href={item.href}
                          onClick={closeMenu}
                          className="group flex items-baseline gap-4 py-3 sm:py-3.5 lg:py-4"
                          data-cursor="link"
                        >
                          <span className="w-7 shrink-0 font-sans text-[0.7rem] tracking-[0.2em] text-brass/80">{pad2(i + 1)}</span>
                          <span
                            className={cn(
                              "font-display text-[2rem] leading-none tracking-[-0.02em] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:text-[2.6rem] lg:text-[clamp(2.6rem,4.6vw,4.2rem)] group-hover:translate-x-3 group-hover:text-brass-2",
                              active ? "text-brass-2 italic" : "text-ivory",
                            )}
                          >
                            {item.label}
                          </span>
                          <ArrowUpRight className="ml-auto h-5 w-5 -translate-x-2 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100" strokeWidth={1.5} />
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.75, duration: 0.8 }}
                  className="mt-5 flex flex-wrap gap-x-6 gap-y-2 font-sans text-[0.8125rem] text-ivory/60"
                >
                  {EXTRA.map((e) => (
                    <Link key={e.href} href={e.href} onClick={closeMenu} className="link-underline hover:text-ivory" data-cursor="link">
                      {e.label}
                    </Link>
                  ))}
                </motion.div>
              </nav>

              <motion.div
                className="relative hidden lg:block"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.45, duration: 1, ease: EASE_EXPO }}
              >
                <div className="relative ml-auto aspect-[4/5] w-[min(32vw,440px)] overflow-hidden rounded-[6px]">
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.div
                      key={preview.href}
                      className="absolute inset-0"
                      initial={{ opacity: 0, scale: 1.06 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.7, ease: EASE_EXPO }}
                    >
                      <SmartImage image={img(preview.imageId ?? "GV-VIEW-01")} sizes="32vw" className="absolute inset-0" />
                    </motion.div>
                  </AnimatePresence>
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-forest/70 via-transparent to-transparent" />
                  <div className="absolute inset-x-6 bottom-6">
                    <p className="eyebrow text-brass">{preview.label}</p>
                    <p className="mt-2 font-display text-2xl text-ivory">{preview.description}</p>
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8, ease: EASE_EXPO }}
              className="grid shrink-0 gap-6 border-t hairline-light py-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] font-sans text-[0.875rem] sm:grid-cols-3"
            >
              <div className="flex flex-col gap-2">
                <p className="eyebrow text-brass">Talk to us</p>
                <a href={SITE.phoneTel} className="inline-flex items-center gap-2 text-ivory/85 hover:text-ivory" data-cursor="link">
                  <Phone className="h-4 w-4" strokeWidth={1.5} /> {SITE.phoneDisplay}
                </a>
                <a href={SITE.whatsappPrefilled} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-ivory/85 hover:text-ivory" data-cursor="link">
                  <MessageCircle className="h-4 w-4" strokeWidth={1.5} /> WhatsApp us
                </a>
                <a href={SITE.emailLink} className="inline-flex items-center gap-2 text-ivory/85 hover:text-ivory" data-cursor="link">
                  <Mail className="h-4 w-4" strokeWidth={1.5} /> {SITE.email}
                </a>
              </div>
              <div className="flex flex-col gap-2">
                <p className="eyebrow text-brass">Find us</p>
                <address className="not-italic leading-relaxed text-ivory/75">
                  Suites Tower 1, Godrej Golf Links
                  <br />
                  Sector 27, Greater Noida
                  <br />
                  Uttar Pradesh 201515
                </address>
              </div>
              <div className="flex flex-col gap-2">
                <p className="eyebrow text-brass">Book on Airbnb</p>
                <a href={SITE.airbnb.golfView} target="_blank" rel="noopener noreferrer" className="link-underline w-fit text-ivory/85 hover:text-ivory" data-cursor="link">
                  Golf View Suite
                </a>
                <a href={SITE.airbnb.elegant} target="_blank" rel="noopener noreferrer" className="link-underline w-fit text-ivory/85 hover:text-ivory" data-cursor="link">
                  Elegant Suite
                </a>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
