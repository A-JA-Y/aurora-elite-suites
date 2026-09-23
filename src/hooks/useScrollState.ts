"use client";

import { useEffect, useRef, useState } from "react";

interface ScrollState {
  y: number;
  direction: "up" | "down";
  scrolled: boolean;
}

/** rAF-throttled window scroll state. Works with Lenis because Lenis scrolls the window. */
export function useScrollState(threshold = 24): ScrollState {
  const [state, setState] = useState<ScrollState>({ y: 0, direction: "up", scrolled: false });
  const last = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const delta = y - last.current;
        setState((prev) => {
          const direction = Math.abs(delta) < 2 ? prev.direction : delta > 0 ? "down" : "up";
          const scrolled = y > threshold;
          if (prev.direction === direction && prev.scrolled === scrolled && Math.abs(prev.y - y) < 1) return prev;
          return { y, direction, scrolled };
        });
        last.current = y;
        ticking.current = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return state;
}
