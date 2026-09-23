"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, CalendarCheck, Mail, MessageCircle, Phone } from "lucide-react";
import { SITE } from "@/data/site";
import { EASE_EXPO } from "@/lib/utils";
import { useUI } from "./Providers";

const options = [
  { label: "WhatsApp us", hint: "Fastest. Usually replies within the hour.", href: SITE.whatsappPrefilled, icon: MessageCircle, external: true, accent: true },
  { label: "Call +91 99997 00602", hint: "Tap to call the team", href: SITE.phoneTel, icon: Phone, external: true },
  { label: "Send an enquiry", hint: "Dates, guests and suite. We reply with today's rate.", href: "/contact", icon: CalendarCheck, external: false },
  { label: "Email bookings@auroraelitesuits.com", hint: "For longer stays and questions", href: SITE.emailLink, icon: Mail, external: true },
];

/** Bottom sheet opened from the dock's Book button. */
export function BookSheet() {
  const { bookOpen, closeBook } = useUI();
  return (
    <AnimatePresence>
      {bookOpen && (
        <>
          <motion.button
            key="backdrop"
            type="button"
            aria-label="Close"
            onClick={closeBook}
            className="fixed inset-0 z-[80] bg-ink/55 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          />
          <motion.div
            key="sheet"
            role="dialog"
            aria-modal="true"
            aria-label="Book your stay"
            className="fixed inset-x-0 bottom-0 z-[85] rounded-t-[1.75rem] bg-ivory text-charcoal shadow-soft"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.6, ease: EASE_EXPO }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.6 }}
            onDragEnd={(_, info) => {
              if (info.offset.y > 90 || info.velocity.y > 600) closeBook();
            }}
          >
            <div className="mx-auto mt-3 h-1 w-10 rounded-full bg-charcoal/15" />
            <div className="px-6 pt-5 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
              <p className="eyebrow">Book your stay</p>
              <h2 className="mt-2 font-display text-[1.9rem] leading-tight">Tell us your dates</h2>
              <p className="mt-1.5 text-[0.9375rem] text-stone">Send your dates and number of guests. We&apos;ll confirm availability and today&apos;s rate.</p>

              <ul className="mt-6 flex flex-col gap-2.5">
                {options.map((o) => {
                  const Icon = o.icon;
                  const inner = (
                    <>
                      <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-full ${o.accent ? "bg-fairway text-ivory" : "bg-sand text-fairway"}`}>
                        <Icon className="h-5 w-5" strokeWidth={1.6} />
                      </span>
                      <span className="flex min-w-0 flex-1 flex-col">
                        <span className="truncate font-sans text-[0.95rem] font-semibold">{o.label}</span>
                        <span className="text-[0.8rem] text-stone">{o.hint}</span>
                      </span>
                      <ArrowUpRight className="h-4 w-4 shrink-0 text-stone" strokeWidth={1.5} />
                    </>
                  );
                  const cls = "flex items-center gap-4 rounded-2xl bg-white/70 px-3.5 py-3 ring-1 ring-charcoal/8 active:scale-[0.99] transition";
                  return (
                    <li key={o.label}>
                      {o.external ? (
                        <a href={o.href} onClick={closeBook} target={o.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className={cls}>
                          {inner}
                        </a>
                      ) : (
                        <Link href={o.href} onClick={closeBook} className={cls}>
                          {inner}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>

              <div className="mt-6 border-t hairline pt-4">
                <p className="mb-2.5 text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-stone">Or book on Airbnb</p>
                <div className="grid grid-cols-2 gap-2.5">
                  <a href={SITE.airbnb.golfView} target="_blank" rel="noopener noreferrer" onClick={closeBook} className="rounded-xl bg-sand px-3.5 py-3 text-center text-[0.85rem] font-semibold text-charcoal active:scale-[0.98]">
                    Golf View Suite
                  </a>
                  <a href={SITE.airbnb.elegant} target="_blank" rel="noopener noreferrer" onClick={closeBook} className="rounded-xl bg-sand px-3.5 py-3 text-center text-[0.85rem] font-semibold text-charcoal active:scale-[0.98]">
                    Elegant Suite
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
