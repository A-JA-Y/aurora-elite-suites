"use client";

import { motion } from "framer-motion";
import { Images } from "lucide-react";
import type { SiteImage } from "@/data/images";
import { cn, EASE_EXPO } from "@/lib/utils";
import { Lightbox, useLightbox } from "@/components/ui/Lightbox";
import { SmartImage } from "@/components/ui/SmartImage";
import { useUI } from "@/components/layout/Providers";

interface SuiteGalleryProps {
  hero: SiteImage[];
  all: SiteImage[];
}

/** Airbnb-style hero grid (1 large + 4 small) that opens the full set in the lightbox. */
export function SuiteGallery({ hero, all }: SuiteGalleryProps) {
  const lb = useLightbox();
  const { preloaderDone } = useUI();
  const indexOf = (im: SiteImage) => Math.max(0, all.findIndex((a) => a.id === im.id));

  return (
    <div className="relative">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:grid-rows-2 sm:gap-3 lg:h-[62vh] lg:min-h-[420px]">
        {hero.slice(0, 5).map((im, i) => (
          <motion.button
            key={im.id}
            type="button"
            onClick={() => lb.open(indexOf(im))}
            aria-label={`Open photo: ${im.alt}`}
            initial={{ opacity: 0, clipPath: "inset(6% 6% 6% 6% round 6px)" }}
            animate={preloaderDone ? { opacity: 1, clipPath: "inset(0% 0% 0% 0% round 6px)" } : {}}
            transition={{ duration: 1.1, delay: 0.3 + i * 0.08, ease: EASE_EXPO }}
            className={cn(
              "group relative overflow-hidden rounded-[6px] bg-sand",
              i === 0 ? "col-span-2 row-span-2 aspect-[4/3] sm:aspect-auto" : "aspect-[4/3] sm:aspect-auto",
            )}
            data-cursor="view"
          >
            <SmartImage image={im} sizes={i === 0 ? "(max-width: 640px) 100vw, 50vw" : "(max-width: 640px) 50vw, 25vw"} priority={i < 2} className="absolute inset-0" hoverZoom />
          </motion.button>
        ))}
      </div>
      <motion.button
        type="button"
        onClick={() => lb.open(0)}
        initial={{ opacity: 0, y: 8 }}
        animate={preloaderDone ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.9, ease: EASE_EXPO }}
        className="absolute bottom-3 right-3 inline-flex items-center gap-2 rounded-full bg-ivory/90 px-4 py-2.5 font-sans text-[0.8125rem] font-semibold text-charcoal shadow-card backdrop-blur transition hover:bg-white sm:bottom-5 sm:right-5"
        data-cursor="link"
      >
        <Images className="h-4 w-4" strokeWidth={1.75} /> Show all {all.length} photos
      </motion.button>
      <Lightbox images={all} index={lb.index} onClose={lb.close} onChange={lb.setIndex} />
    </div>
  );
}
