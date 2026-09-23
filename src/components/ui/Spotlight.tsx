"use client";

import { useRef, type ElementType, type PointerEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useFinePointer } from "@/hooks/useMediaQuery";

interface SpotlightProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}

/**
 * Publishes the pointer's position within this element as --mx / --my, which
 * the `spotlight` utility reads for its radial wash. Writing the custom
 * properties straight onto the node keeps this off React's render path, so a
 * moving cursor never re-renders the subtree.
 *
 * On coarse pointers there is nothing to follow, so the listener is skipped
 * and the :root defaults leave the glow centred.
 */
export function Spotlight({ children, className, as: Tag = "div" }: SpotlightProps) {
  const ref = useRef<HTMLElement>(null);
  const fine = useFinePointer();

  const onMove = (e: PointerEvent<HTMLElement>) => {
    const el = ref.current;
    if (!fine || !el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <Tag ref={ref} className={cn("spotlight", className)} onPointerMove={fine ? onMove : undefined}>
      {children}
    </Tag>
  );
}
