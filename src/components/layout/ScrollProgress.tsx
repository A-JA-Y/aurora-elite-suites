"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useUI } from "./Providers";

/**
 * A strip of rust ink across the top of the page that fills as the document
 * scrolls. It reads the native scroll position, so it stays in step with
 * Lenis without subscribing to it.
 */
export function ScrollProgress() {
  const { preloaderDone } = useUI();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-riso-rust"
      style={{ scaleX, opacity: preloaderDone ? 1 : 0 }}
    >
      {/* Salmon plate, printed a hair off-register under the rust one. */}
      <span className="absolute inset-y-0 left-0 w-full translate-y-[2px] bg-riso-salmon/70 mix-blend-multiply" />
    </motion.div>
  );
}
