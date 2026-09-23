"use client";

import { useRef } from "react";
import type { SiteImage } from "@/data/images";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { SmartImage } from "./SmartImage";

interface ParallaxImageProps {
  image: SiteImage;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  priority?: boolean;
  /** 0 = static, 0.2 = strong. Fraction of container height the image drifts. */
  speed?: number;
  /** Extra scale applied so the drift never exposes edges. */
  scale?: number;
  /** Clip-reveal the frame when it scrolls into view. */
  reveal?: boolean;
  children?: React.ReactNode;
}

/** Image that drifts on scroll (GSAP ScrollTrigger scrub) and reveals with a clip mask. */
export function ParallaxImage({
  image,
  className,
  imgClassName,
  sizes = "100vw",
  priority,
  speed = 0.14,
  scale = 1.18,
  reveal = true,
  children,
}: ParallaxImageProps) {
  const frame = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const f = frame.current;
      const i = inner.current;
      if (!f || !i) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reveal && !reduce) {
        gsap.fromTo(
          f,
          { clipPath: "inset(12% 6% 12% 6% round 2px)", opacity: 0.6 },
          {
            clipPath: "inset(0% 0% 0% 0% round 0px)",
            opacity: 1,
            duration: 1.4,
            ease: "expo.out",
            scrollTrigger: { trigger: f, start: "top 88%", once: true },
          },
        );
      }
      if (speed > 0 && !reduce) {
        gsap.fromTo(
          i,
          { yPercent: -speed * 50 },
          {
            yPercent: speed * 50,
            ease: "none",
            scrollTrigger: { trigger: f, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      }
    },
    { scope: frame },
  );

  return (
    <div ref={frame} className={cn("relative overflow-hidden", className)}>
      <div ref={inner} className="absolute inset-0 will-change-transform" style={{ transform: `scale(${scale})` }}>
        <SmartImage image={image} sizes={sizes} priority={priority} className="absolute inset-0" imgClassName={imgClassName} />
      </div>
      {children}
    </div>
  );
}
