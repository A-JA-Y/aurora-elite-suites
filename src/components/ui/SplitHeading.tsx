"use client";

import { useRef, type ElementType } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

interface SplitHeadingProps {
  children: string;
  as?: ElementType;
  className?: string;
  /** scroll = animate when scrolled into view; mount = on mount; manual = when `active` flips true */
  trigger?: "scroll" | "mount" | "manual";
  active?: boolean;
  type?: "lines" | "words";
  start?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  id?: string;
}

/**
 * Masked line-by-line (or word) reveal using GSAP SplitText.
 * Waits for web fonts so line breaks are measured correctly.
 */
export function SplitHeading({
  children,
  as: Tag = "h2",
  className,
  trigger = "scroll",
  active = false,
  type = "lines",
  start = "top 88%",
  delay = 0,
  stagger,
  duration = 1.2,
  id,
}: SplitHeadingProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (trigger === "manual" && !active) return;

      let split: SplitText | undefined;
      let cancelled = false;

      const run = () => {
        if (cancelled || !ref.current) return;
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduce) {
          el.classList.add("is-ready");
          return;
        }
        split = SplitText.create(el, {
          type: type === "lines" ? "lines" : "lines,words",
          mask: type === "lines" ? "lines" : "words",
          linesClass: "split-line",
          wordsClass: "split-word",
          autoSplit: true,
          onSplit: (self) => {
            const targets = type === "lines" ? self.lines : self.words;
            el.classList.add("is-ready");
            return gsap.from(targets, {
              yPercent: 110,
              rotate: type === "lines" ? 0.001 : 0,
              duration,
              ease: "expo.out",
              stagger: stagger ?? (type === "lines" ? 0.09 : 0.03),
              delay,
              scrollTrigger:
                trigger === "scroll"
                  ? { trigger: el, start, once: true }
                  : undefined,
            });
          },
        });
      };

      if (document.fonts?.status === "loaded") run();
      else document.fonts.ready.then(run);

      return () => {
        cancelled = true;
        split?.revert();
      };
    },
    { dependencies: [active, trigger, children], scope: ref },
  );

  return (
    <Tag ref={ref} id={id} data-reveal className={cn(className)}>
      {children}
    </Tag>
  );
}
