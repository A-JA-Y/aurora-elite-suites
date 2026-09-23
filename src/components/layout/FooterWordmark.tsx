"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/** Giant outlined wordmark that rises as the footer scrolls in. */
export function FooterWordmark() {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      gsap.fromTo(
        el,
        { yPercent: 40 },
        { yPercent: 0, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom bottom", scrub: true } },
      );
    },
    { scope: ref },
  );
  return (
    <div ref={ref} aria-hidden className="pointer-events-none relative z-0 -mb-[2vw] mt-6 select-none overflow-hidden px-[2vw] pb-[max(1rem,env(safe-area-inset-bottom))] md:pb-0">
      <p className="whitespace-nowrap text-center font-display text-[17.4vw] font-semibold leading-[0.8] tracking-[0.06em] text-transparent [-webkit-text-stroke:1px_rgba(194,163,107,0.35)]">
        AURORA
      </p>
    </div>
  );
}
