"use client";

import { motion } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import { DISTANCES, type Distance } from "@/data/location";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn, EASE_EXPO } from "@/lib/utils";

const FILTERS: { key: "all" | Distance["category"]; label: string }[] = [
  { key: "all", label: "All" },
  { key: "transit", label: "Metro" },
  { key: "business", label: "Business" },
  { key: "shopping", label: "Shopping" },
  { key: "health", label: "Hospitals" },
  { key: "education", label: "Universities" },
  { key: "leisure", label: "Leisure" },
  { key: "airport", label: "Airports" },
  { key: "daytrip", label: "Day trips" },
];

const MAX_LOG = Math.log10(180);

export function DistanceList() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["key"]>("all");
  const root = useRef<HTMLDivElement>(null);
  const items = useMemo(() => (filter === "all" ? DISTANCES : DISTANCES.filter((d) => d.category === filter)), [filter]);

  useGSAP(
    () => {
      const bars = gsap.utils.toArray<HTMLElement>("[data-dist-bar]");
      gsap.fromTo(bars, { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: "expo.out", stagger: 0.04, scrollTrigger: { trigger: root.current, start: "top 85%", once: true } });
    },
    { scope: root, dependencies: [filter] },
  );

  return (
    <div ref={root}>
      <div className="flex flex-wrap gap-1.5">
        {FILTERS.map((f) => {
          const active = f.key === filter;
          return (
            <button
              key={f.key}
              type="button"
              onClick={() => setFilter(f.key)}
              className={cn("relative rounded-full px-3.5 py-1.5 font-sans text-[0.8125rem] font-medium transition-colors", active ? "text-ivory" : "text-charcoal/70 hover:text-charcoal")}
              data-cursor="link"
            >
              {active && <motion.span layoutId="dist-filter" className="absolute inset-0 rounded-full bg-fairway" transition={{ duration: 0.45, ease: EASE_EXPO }} />}
              <span className="relative">{f.label}</span>
            </button>
          );
        })}
      </div>
      <ul className="mt-8 divide-y divide-charcoal/10">
        {items.map((d, i) => {
          const pct = Math.max(4, Math.min(100, (Math.log10(d.km + 1) / MAX_LOG) * 100));
          return (
            <motion.li key={d.name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: Math.min(i, 10) * 0.03, ease: EASE_EXPO }} className="grid items-center gap-x-6 gap-y-2 py-4 sm:grid-cols-[minmax(0,1.6fr)_minmax(0,2fr)_auto]">
              <span className="font-sans text-[0.95rem] text-charcoal">{d.name}</span>
              <span className="hidden h-px w-full overflow-hidden bg-charcoal/10 sm:block">
                <span data-dist-bar className="block h-full origin-left bg-brass" style={{ width: `${pct}%` }} />
              </span>
              <span className="flex items-baseline gap-3 font-sans sm:justify-end">
                <span className="font-display text-[1.5rem] leading-none text-fairway">{d.kmLabel}</span>
                <span className="text-[0.8125rem] text-stone">{d.time}</span>
              </span>
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}
