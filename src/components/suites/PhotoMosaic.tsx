"use client";

import type { SiteImage } from "@/data/images";
import { cn } from "@/lib/utils";
import { Lightbox, useLightbox } from "@/components/ui/Lightbox";
import { SmartImage } from "@/components/ui/SmartImage";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";

/** Simple three-column mosaic (used for suites without room-by-room copy). */
export function PhotoMosaic({ images, columns = 3 }: { images: SiteImage[]; columns?: 2 | 3 | 4 }) {
  const lb = useLightbox();
  const cols: SiteImage[][] = Array.from({ length: columns }, () => []);
  images.forEach((im, i) => cols[i % columns].push(im));
  return (
    <>
      <Stagger className={cn("grid gap-4", columns === 2 && "grid-cols-2", columns === 3 && "grid-cols-2 md:grid-cols-3", columns === 4 && "grid-cols-2 md:grid-cols-4")} stagger={0.06}>
        {cols.map((col, ci) => (
          <div key={ci} className={cn("flex flex-col gap-4", ci === 1 && "md:mt-12")}>
            {col.map((im) => (
              <StaggerItem key={im.id} variant="clip">
                <button type="button" onClick={() => lb.open(images.indexOf(im))} className="group relative block w-full overflow-hidden rounded-[6px]" aria-label={`Open photo: ${im.alt}`} data-cursor="view">
                  <div className={cn("relative", im.orientation === "P" ? "aspect-[3/4]" : "aspect-[4/3]")}>
                    <SmartImage image={im} sizes="(max-width: 768px) 50vw, 33vw" className="absolute inset-0" hoverZoom />
                  </div>
                </button>
              </StaggerItem>
            ))}
          </div>
        ))}
      </Stagger>
      <Lightbox images={images} index={lb.index} onClose={lb.close} onChange={lb.setIndex} />
    </>
  );
}
