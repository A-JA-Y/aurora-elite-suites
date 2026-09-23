"use client";

import { HOME } from "@/data/home";
import { imgs } from "@/data/images";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Lightbox, useLightbox } from "@/components/ui/Lightbox";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/SectionHeader";
import { SmartImage } from "@/components/ui/SmartImage";
import { SplitHeading } from "@/components/ui/SplitHeading";

const images = imgs(...HOME.gallery.imageIds);

export function GalleryStrip() {
  const lb = useLightbox();
  return (
    <section className="overflow-hidden py-24 sm:py-32">
      <div className="container-x flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Eyebrow>Gallery</Eyebrow>
          <SplitHeading as="h2" className="display-lg mt-5 text-charcoal">
            {HOME.gallery.heading}
          </SplitHeading>
        </div>
        <Reveal>
          <Button href={HOME.gallery.button.href} variant="secondary">
            {HOME.gallery.button.label}
          </Button>
        </Reveal>
      </div>

      <Reveal variant="fade" className="mt-14">
        <div
          className="flex snap-x snap-mandatory items-end gap-4 overflow-x-auto px-5 pb-4 no-scrollbar sm:gap-6 sm:px-8 lg:px-[max(3rem,calc((100vw-90rem)/2+4rem))]"
          data-cursor="drag"
          data-cursor-label="Scroll"
        >
          {images.map((im, i) => (
            <button
              key={im.id}
              type="button"
              onClick={() => lb.open(i)}
              aria-label={`Open photo: ${im.alt}`}
              className={cn(
                "group relative shrink-0 snap-start overflow-hidden rounded-[6px]",
                im.orientation === "P" ? "h-[60vw] w-[45vw] sm:h-[420px] sm:w-[315px]" : "h-[48vw] w-[64vw] sm:h-[330px] sm:w-[440px]",
              )}
              data-cursor="view"
            >
              <SmartImage image={im} sizes="(max-width: 640px) 70vw, 440px" className="absolute inset-0" hoverZoom />
              <span className="absolute inset-x-3 bottom-3 translate-y-2 font-sans text-[0.65rem] uppercase tracking-[0.18em] text-ivory opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                {im.group}
              </span>
            </button>
          ))}
          <div className="w-2 shrink-0" />
        </div>
      </Reveal>
      <Lightbox images={images} index={lb.index} onClose={lb.close} onChange={lb.setIndex} />
    </section>
  );
}
