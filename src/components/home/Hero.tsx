"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, MessageCircle, Star } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { HOME } from "@/data/home";
import { SITE } from "@/data/site";
import { img, imgs } from "@/data/images";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn, EASE_EXPO, pad2 } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { SmartImage } from "@/components/ui/SmartImage";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { useUI } from "@/components/layout/Providers";

const SLIDE_SECONDS = 6.5;

export function Hero() {
  const { preloaderDone } = useUI();
  const isMobile = useIsMobile();
  const root = useRef<HTMLElement>(null);
  const media = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const slides = useMemo(
    () => (isMobile ? [img(HOME.hero.mobileId), ...imgs(...HOME.hero.slideshowIds.slice(1, 4))] : imgs(...HOME.hero.slideshowIds)),
    [isMobile],
  );

  useEffect(() => {
    if (!preloaderDone) return;
    const id = window.setInterval(() => setActive((a) => (a + 1) % slides.length), SLIDE_SECONDS * 1000);
    return () => window.clearInterval(id);
  }, [preloaderDone, slides.length]);

  useGSAP(
    () => {
      if (!root.current || !media.current || !content.current) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;
      gsap.to(media.current, {
        yPercent: 22,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(content.current, {
        y: -80,
        opacity: 0,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "70% top", scrub: true },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} data-hero-dark className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-forest text-ivory">
      {/* Slideshow */}
      <div ref={media} className="absolute inset-0 will-change-transform">
        {slides.map((s, i) => (
          <motion.div
            key={s.id}
            className="absolute inset-0"
            initial={false}
            animate={{ opacity: i === active ? 1 : 0, scale: i === active ? 1.1 : 1 }}
            transition={{
              opacity: { duration: 1.6, ease: EASE_EXPO },
              scale: { duration: i === active ? SLIDE_SECONDS + 2 : 0, ease: "linear" },
            }}
            style={{ zIndex: i === active ? 2 : 1 }}
            aria-hidden={i !== active}
          >
            <SmartImage image={s} priority={i === 0} sizes="100vw" className="absolute inset-0" />
          </motion.div>
        ))}
        <div className="absolute inset-0 z-[3] bg-gradient-to-t from-forest via-forest/25 to-ink/25" />
        <div className="absolute inset-0 z-[3] bg-gradient-to-r from-forest/55 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div ref={content} className="container-x relative z-10 flex flex-col gap-8 pb-[9rem] pt-[calc(var(--header-h)+3rem)] sm:gap-10 sm:pt-[calc(var(--header-h)+4rem)] md:pb-24 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <motion.p
            className="eyebrow text-brass-2"
            initial={{ opacity: 0, y: 12 }}
            animate={preloaderDone ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.3, ease: EASE_EXPO }}
          >
            {HOME.hero.eyebrow}
          </motion.p>
          <SplitHeading as="h1" trigger="manual" active={preloaderDone} delay={0.4} className="display-xl mt-5 max-w-[14ch] text-ivory">
            {HOME.hero.h1}
          </SplitHeading>
          <motion.p
            className="mt-7 max-w-[54ch] text-[1.0625rem] leading-relaxed text-ivory/80 sm:text-lg"
            initial={{ opacity: 0, y: 18 }}
            animate={preloaderDone ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 1.0, ease: EASE_EXPO }}
          >
            {HOME.hero.subheading}
          </motion.p>
          <motion.div
            className="mt-9 flex flex-wrap items-center gap-3"
            initial={{ opacity: 0, y: 18 }}
            animate={preloaderDone ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 1.2, ease: EASE_EXPO }}
          >
            <Button href={HOME.hero.primary.href} variant="light" size="lg">
              {HOME.hero.primary.label}
            </Button>
            <Button href={SITE.whatsappPrefilled} variant="outline-light" size="lg" icon={<MessageCircle className="h-4 w-4" strokeWidth={1.75} />}>
              {HOME.hero.secondary.label}
            </Button>
          </motion.div>
          <motion.a
            href={SITE.airbnb.golfView}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-6 inline-flex items-center gap-1.5 font-sans text-[0.8125rem] text-ivory/70 transition hover:text-ivory"
            initial={{ opacity: 0 }}
            animate={preloaderDone ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 1.5 }}
            data-cursor="link"
          >
            <span className="link-underline">{HOME.hero.textLink.label}</span>
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.5} />
          </motion.a>
        </div>

        <motion.div
          className="flex flex-col gap-5 lg:items-end"
          initial={{ opacity: 0, y: 18 }}
          animate={preloaderDone ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 1.4, ease: EASE_EXPO }}
        >
          <ul className="flex flex-wrap items-center gap-x-4 gap-y-2 font-sans text-[0.75rem] tracking-[0.08em] text-ivory/75">
            {HOME.hero.trustLine.map((t, i) => (
              <li key={t} className="flex items-center gap-2">
                {i === 0 && <Star className="h-3 w-3 fill-brass text-brass" strokeWidth={1} />}
                {t}
                {i < HOME.hero.trustLine.length - 1 && <span className="ml-2 hidden h-3 w-px bg-ivory/25 sm:block" />}
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-3">
            <span className="font-sans text-[0.7rem] tracking-[0.22em] text-ivory/60">{pad2(active + 1)}</span>
            <div className="flex items-center gap-1.5">
              {slides.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`Show photo ${i + 1}`}
                  className="relative h-6 w-10 overflow-hidden"
                  data-cursor="link"
                >
                  <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-ivory/30" />
                  <motion.span
                    key={`${active}-${i}`}
                    className="absolute inset-x-0 top-1/2 h-px origin-left -translate-y-1/2 bg-brass-2"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: i === active ? 1 : 0 }}
                    transition={{ duration: i === active ? SLIDE_SECONDS : 0.3, ease: "linear" }}
                  />
                </button>
              ))}
            </div>
            <span className="font-sans text-[0.7rem] tracking-[0.22em] text-ivory/60">{pad2(slides.length)}</span>
          </div>
          <AnimatePresence mode="wait">
            <motion.p
              key={slides[active].id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.5 }}
              className="hidden max-w-[40ch] font-display text-[1.05rem] italic text-ivory/70 sm:block lg:text-right"
            >
              {slides[active].alt}
            </motion.p>
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        className="pointer-events-none absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex"
        initial={{ opacity: 0 }}
        animate={preloaderDone ? { opacity: 1 } : {}}
        transition={{ delay: 2, duration: 1 }}
        aria-hidden
      >
        <span className="font-sans text-[0.6rem] uppercase tracking-[0.3em] text-ivory/50">Scroll</span>
        <span className="relative h-12 w-px overflow-hidden bg-ivory/20">
          <span className={cn("absolute inset-x-0 top-0 h-1/2 bg-brass-2", "animate-[scrollcue_2s_ease-in-out_infinite]")} />
        </span>
      </motion.div>
      <style>{`@keyframes scrollcue{0%{transform:translateY(-100%)}60%,100%{transform:translateY(220%)}}`}</style>
    </section>
  );
}
