"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import type { SiteImage } from "@/data/images";
import { cn, EASE_EXPO } from "@/lib/utils";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { useUI } from "./Providers";

interface PageHeroProps {
  image: SiteImage;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
  size?: "md" | "lg";
  align?: "left" | "center";
  className?: string;
}

/** Dark, full-bleed hero for inner pages. Header turns light over it. */
export function PageHero({ image, eyebrow, title, subtitle, children, size = "md", align = "left", className }: PageHeroProps) {
  const { preloaderDone } = useUI();
  return (
    <section
      data-hero-dark
      className={cn("relative flex w-full flex-col justify-end overflow-hidden bg-forest text-ivory", size === "lg" ? "min-h-[86svh]" : "min-h-[62svh] sm:min-h-[68svh]", className)}
    >
      <ParallaxImage image={image} className="absolute inset-0" speed={0.18} scale={1.2} reveal={false} priority sizes="100vw">
        <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/35 to-forest/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-forest/50 via-transparent to-transparent" />
      </ParallaxImage>
      <div className={cn("container-x relative z-10 pb-12 pt-[calc(var(--header-h)+3rem)] sm:pb-16", align === "center" && "text-center")}>
        {eyebrow && (
          <motion.p
            className={cn("eyebrow text-brass", align === "center" && "mx-auto")}
            initial={{ opacity: 0, y: 10 }}
            animate={preloaderDone ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: EASE_EXPO }}
          >
            {eyebrow}
          </motion.p>
        )}
        <SplitHeading
          as="h1"
          trigger="manual"
          active={preloaderDone}
          delay={0.25}
          className={cn("mt-4 max-w-[16ch] text-ivory", size === "lg" ? "display-xl" : "display-lg", align === "center" && "mx-auto")}
        >
          {title}
        </SplitHeading>
        {subtitle && (
          <motion.p
            className={cn("mt-6 max-w-[56ch] text-[1.0625rem] leading-relaxed text-ivory/78 sm:text-lg", align === "center" && "mx-auto")}
            initial={{ opacity: 0, y: 16 }}
            animate={preloaderDone ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.7, ease: EASE_EXPO }}
          >
            {subtitle}
          </motion.p>
        )}
        {children && (
          <motion.div
            className={cn("mt-8", align === "center" && "flex justify-center")}
            initial={{ opacity: 0, y: 16 }}
            animate={preloaderDone ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.9, ease: EASE_EXPO }}
          >
            {children}
          </motion.div>
        )}
      </div>
    </section>
  );
}

/** Light, typographic intro for text-heavy pages (FAQs, legal). */
export function PageIntro({ eyebrow, title, lede, children, className }: { eyebrow?: string; title: string; lede?: string; children?: ReactNode; className?: string }) {
  const { preloaderDone } = useUI();
  return (
    <section className={cn("container-x pt-[calc(var(--header-h)+3.5rem)] pb-10 sm:pt-[calc(var(--header-h)+5rem)] sm:pb-14", className)}>
      {eyebrow && (
        <motion.p className="eyebrow" initial={{ opacity: 0 }} animate={preloaderDone ? { opacity: 1 } : {}} transition={{ duration: 0.8, delay: 0.1 }}>
          {eyebrow}
        </motion.p>
      )}
      <SplitHeading as="h1" trigger="manual" active={preloaderDone} delay={0.15} className="display-lg mt-4 max-w-[16ch] text-charcoal">
        {title}
      </SplitHeading>
      {lede && (
        <motion.p
          className="lede mt-6 max-w-[62ch]"
          initial={{ opacity: 0, y: 14 }}
          animate={preloaderDone ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.55, ease: EASE_EXPO }}
        >
          {lede}
        </motion.p>
      )}
      {children}
    </section>
  );
}
