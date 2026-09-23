"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

interface CounterProps {
  value: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  duration?: number;
}

/** Counts up from 0 when scrolled into view. */
export function Counter({ value, decimals = 0, suffix = "", prefix = "", className, duration = 1.8 }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const obj = { v: 0 };
      const fmt = (n: number) => `${prefix}${n.toFixed(decimals)}${suffix}`;
      el.textContent = fmt(0);
      gsap.to(obj, {
        v: value,
        duration,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
        onUpdate: () => {
          el.textContent = fmt(obj.v);
        },
      });
    },
    { scope: ref, dependencies: [value] },
  );

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value.toFixed(decimals)}
      {suffix}
    </span>
  );
}
