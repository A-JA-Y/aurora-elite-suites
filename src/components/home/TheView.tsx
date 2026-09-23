"use client";

import { useRef } from "react";
import { HOME } from "@/data/home";
import { imgs } from "@/data/images";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { SmartImage } from "@/components/ui/SmartImage";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/SectionHeader";

const images = imgs(...HOME.view.imageIds);

/** Dark, pinned section: the copy stays put while the balcony views glide sideways. */
export function TheView() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const s = section.current;
        const t = track.current;
        if (!s || !t) return;
        const distance = () => t.scrollWidth - window.innerWidth;
        gsap.to(t, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: s,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
        // Each frame drifts a little differently for depth.
        gsap.utils.toArray<HTMLElement>("[data-view-img]").forEach((el, i) => {
          gsap.fromTo(
            el,
            { yPercent: i % 2 === 0 ? 6 : -6 },
            { yPercent: i % 2 === 0 ? -6 : 6, ease: "none", scrollTrigger: { trigger: s, start: "top top", end: () => `+=${distance()}`, scrub: true } },
          );
        });
      });
      return () => mm.revert();
    },
    { scope: section },
  );

  return (
    <section ref={section} id="the-view" className="relative overflow-hidden bg-forest text-ivory grain">
      {/* Desktop: horizontal track */}
      <div ref={track} className="hidden h-[100svh] items-center gap-[4vw] pl-[max(3rem,calc((100vw-90rem)/2+4rem))] pr-[6vw] lg:flex" style={{ width: "max-content" }}>
        <div className="w-[34vw] shrink-0">
          <Eyebrow tone="dark">The view</Eyebrow>
          <SplitHeading as="h2" className="display-lg mt-5 text-ivory">
            {HOME.view.heading}
          </SplitHeading>
          <Reveal delay={0.15}>
            <p className="mt-7 max-w-[48ch] text-[1.0625rem] leading-relaxed text-ivory/70">{HOME.view.body}</p>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="mt-8 font-sans text-[0.7rem] uppercase tracking-[0.28em] text-brass">Scroll to look around →</p>
          </Reveal>
        </div>
        {images.map((im, i) => (
          <figure
            key={im.id}
            data-view-img
            className={cn(
              "relative shrink-0 overflow-hidden rounded-[6px]",
              im.orientation === "P" ? "h-[68svh] w-[calc(68svh*0.75)]" : "h-[54svh] w-[calc(54svh*1.333)]",
              i % 2 === 1 && "mt-[8svh]",
            )}
            data-cursor="view"
          >
            <SmartImage image={im} sizes="60vw" className="absolute inset-0" />
            <figcaption className="absolute inset-x-4 bottom-4 flex items-center justify-between font-sans text-[0.65rem] uppercase tracking-[0.2em] text-ivory/70">
              <span className="max-w-[70%] truncate">{im.alt}</span>
              <span className="text-brass">{String(i + 1).padStart(2, "0")}</span>
            </figcaption>
          </figure>
        ))}
        <div className="w-[26vw] shrink-0 pl-[2vw]">
          <p className="font-display text-[clamp(2rem,3.4vw,3.4rem)] italic leading-tight text-brass-2">“balcony view was perfect.”</p>
          <p className="mt-5 font-sans text-[0.75rem] tracking-[0.16em] text-ivory/60">Anuraga, Lucknow · September 2026</p>
        </div>
      </div>

      {/* Mobile / tablet: stacked */}
      <div className="container-x py-24 lg:hidden">
        <Eyebrow tone="dark">The view</Eyebrow>
        <SplitHeading as="h2" className="display-lg mt-5 text-ivory">
          {HOME.view.heading}
        </SplitHeading>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-[52ch] text-[1.0625rem] leading-relaxed text-ivory/70">{HOME.view.body}</p>
        </Reveal>
        <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4">
          {images.map((im, i) => (
            <Reveal key={im.id} delay={(i % 2) * 0.1} variant="clip" className={cn(i % 3 === 0 && "col-span-2")}>
              <div className={cn("relative overflow-hidden rounded-[4px]", i % 3 === 0 ? "aspect-[4/3]" : im.orientation === "P" ? "aspect-[3/4]" : "aspect-[4/3]")}>
                <SmartImage image={im} sizes="(max-width: 640px) 100vw, 50vw" className="absolute inset-0" />
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.1}>
          <p className="mt-12 font-display text-[1.9rem] italic leading-tight text-brass-2">“balcony view was perfect.”</p>
          <p className="mt-3 font-sans text-[0.72rem] tracking-[0.16em] text-ivory/60">Anuraga, Lucknow · September 2026</p>
        </Reveal>
      </div>
    </section>
  );
}
