"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Star } from "lucide-react";
import type { Suite } from "@/data/suites";
import { cn, EASE_EXPO } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { useUI } from "@/components/layout/Providers";

export function SuiteIntro({ suite }: { suite: Suite }) {
  const { preloaderDone } = useUI();
  return (
    <section className="container-x pt-[calc(var(--header-h)+3rem)] pb-10 sm:pt-[calc(var(--header-h)+4.5rem)] sm:pb-14">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={preloaderDone ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.15, ease: EASE_EXPO }} className="flex flex-wrap items-center gap-3">
            <p className="eyebrow">Godrej Golf Links · Greater Noida</p>
            <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-sans text-[0.62rem] font-semibold uppercase tracking-[0.2em]", suite.badgeTone === "brass" ? "bg-brass text-ink" : "bg-fairway text-ivory")}>
              {suite.badgeTone === "brass" && <Star className="h-3 w-3 fill-ink" strokeWidth={1} />}
              {suite.badge}
            </span>
          </motion.div>
          <SplitHeading as="h1" trigger="manual" active={preloaderDone} delay={0.25} className="display-xl mt-5 text-charcoal">
            {suite.name}
          </SplitHeading>
          <motion.p initial={{ opacity: 0, y: 14 }} animate={preloaderDone ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9, delay: 0.6, ease: EASE_EXPO }} className="mt-5 font-display text-[1.5rem] italic text-oak sm:text-[1.75rem]">
            {suite.subheading}
          </motion.p>
          <motion.ul initial={{ opacity: 0 }} animate={preloaderDone ? { opacity: 1 } : {}} transition={{ duration: 0.9, delay: 0.8 }} className="mt-6 flex flex-wrap gap-x-5 gap-y-2 font-sans text-[0.8125rem] text-stone">
            {suite.factBar.map((f) => (
              <li key={f} className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-brass" /> {f}
              </li>
            ))}
          </motion.ul>
        </div>
        <motion.div initial={{ opacity: 0, y: 14 }} animate={preloaderDone ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9, delay: 0.9, ease: EASE_EXPO }} className="flex flex-wrap gap-3">
          <Button href={`/contact?suite=${encodeURIComponent(suite.shortName)}`} size="lg">
            Check Availability
          </Button>
          <Button href={suite.airbnb} variant="secondary" size="lg" icon={<ArrowUpRight className="h-4 w-4" strokeWidth={1.75} />}>
            Book on Airbnb
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
