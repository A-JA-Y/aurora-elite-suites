import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: ReactNode;
  className?: string;
  /** seconds for one full loop */
  duration?: number;
  reverse?: boolean;
  pauseOnHover?: boolean;
  gap?: string;
}

/** Infinite horizontal scroller. Children are duplicated to loop seamlessly. */
export function Marquee({ children, className, duration = 48, reverse = false, pauseOnHover = true, gap = "gap-6" }: MarqueeProps) {
  return (
    <div className={cn("group/marquee relative flex overflow-hidden", className)}>
      <div
        className={cn(
          "flex w-max shrink-0 items-center animate-marquee will-change-transform",
          gap,
          reverse && "[animation-direction:reverse]",
          pauseOnHover && "group-hover/marquee:[animation-play-state:paused]",
        )}
        style={{ animationDuration: `${duration}s` }}
      >
        <div className={cn("flex shrink-0 items-center", gap)}>{children}</div>
        <div className={cn("flex shrink-0 items-center", gap)} aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
