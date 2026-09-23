"use client";

import { Star } from "lucide-react";
import { useRef } from "react";
import { RATING } from "@/data/reviews";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

export function RatingBox({ className, tone = "light" }: { className?: string; tone?: "light" | "dark" }) {
  const ref = useRef<HTMLDivElement>(null);
  const dark = tone === "dark";
  useGSAP(
    () => {
      const bars = gsap.utils.toArray<HTMLElement>("[data-bar]");
      gsap.fromTo(
        bars,
        { scaleX: 0 },
        { scaleX: (i, el) => Number((el as HTMLElement).dataset.value) / 5, duration: 1.4, ease: "expo.out", stagger: 0.08, scrollTrigger: { trigger: ref.current, start: "top 85%", once: true } },
      );
    },
    { scope: ref },
  );
  return (
    <div ref={ref} className={cn("rounded-[6px] p-6 ring-1 sm:p-7", dark ? "bg-forest text-ivory ring-ivory/10" : "bg-cream text-charcoal ring-charcoal/8", className)}>
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="font-display text-[4rem] leading-none tracking-[-0.04em] sm:text-[4.5rem]">{RATING.overall}</p>
          <div className={cn("mt-2 flex gap-0.5", dark ? "text-brass-2" : "text-brass")}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-3.5 w-3.5 fill-current" strokeWidth={1} />
            ))}
          </div>
        </div>
        <div className="text-right font-sans text-[0.8125rem]">
          <p className={cn("font-semibold", dark ? "text-brass-2" : "text-oak")}>{RATING.badge}</p>
          <p className={dark ? "text-ivory/60" : "text-stone"}>{RATING.count} Airbnb reviews</p>
          <p className={dark ? "text-ivory/60" : "text-stone"}>{RATING.fiveStarShare}% five-star</p>
        </div>
      </div>
      <ul className="mt-6 grid gap-3 sm:grid-cols-2 sm:gap-x-8">
        {RATING.categories.map((c) => (
          <li key={c.label} className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between font-sans text-[0.8125rem]">
              <span className={dark ? "text-ivory/80" : "text-charcoal"}>{c.label}</span>
              <span className={cn("font-semibold", dark ? "text-ivory" : "text-charcoal")}>{c.value.toFixed(1)}</span>
            </div>
            <div className={cn("h-px w-full overflow-hidden", dark ? "bg-ivory/15" : "bg-charcoal/12")}>
              <div data-bar data-value={c.value} className={cn("h-full w-full origin-left", dark ? "bg-brass" : "bg-fairway")} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
