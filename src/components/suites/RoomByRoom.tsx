"use client";

import type { RoomSection } from "@/data/suites";
import { imgs, type SiteImage } from "@/data/images";
import { cn, pad2 } from "@/lib/utils";
import { Lightbox, useLightbox } from "@/components/ui/Lightbox";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { Reveal } from "@/components/ui/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";
import { SplitHeading } from "@/components/ui/SplitHeading";

export function RoomByRoom({ rooms }: { rooms: RoomSection[] }) {
  const lb = useLightbox();
  const all: SiteImage[] = [];
  const offsets: number[] = [];
  for (const r of rooms) {
    offsets.push(all.length);
    all.push(...imgs(...r.imageIds));
  }

  return (
    <div className="flex flex-col gap-24 sm:gap-32">
      {rooms.map((room, ri) => {
        const images = imgs(...room.imageIds);
        const flip = ri % 2 === 1;
        const [lead, ...rest] = images;
        return (
          <article key={room.title} className={cn("grid items-start gap-10 lg:grid-cols-12 lg:gap-14")}>
            <div className={cn("lg:col-span-4", flip && "lg:order-2")}>
              <div className="lg:sticky lg:top-32">
                <p className="eyebrow">{pad2(ri + 1)} · Room by room</p>
                <SplitHeading as="h3" className="display-md mt-4 text-charcoal">
                  {room.title}
                </SplitHeading>
                <Reveal delay={0.1}>
                  <p className="mt-6 max-w-[44ch] text-[1.0625rem] leading-relaxed text-stone">{room.text}</p>
                </Reveal>
              </div>
            </div>
            <div className={cn("lg:col-span-8", flip && "lg:order-1")}>
              <button type="button" onClick={() => lb.open(offsets[ri])} className="group block w-full text-left" aria-label={`Open photo: ${lead.alt}`} data-cursor="view">
                <ParallaxImage image={lead} className={cn("rounded-[6px]", lead.orientation === "P" ? "aspect-[3/4] sm:aspect-[4/3]" : "aspect-[4/3]")} speed={0.1} sizes="(max-width: 1024px) 100vw, 60vw" />
              </button>
              {rest.length > 0 && (
                <div className={cn("mt-4 grid gap-4", rest.length === 1 ? "grid-cols-1" : "grid-cols-2")}>
                  {rest.map((im, i) => (
                    <Reveal key={im.id} delay={0.1 + i * 0.1} variant="clip">
                      <button type="button" onClick={() => lb.open(offsets[ri] + 1 + i)} className="group relative block w-full overflow-hidden rounded-[6px]" aria-label={`Open photo: ${im.alt}`} data-cursor="view">
                        <div className={cn("relative", im.orientation === "P" ? "aspect-[3/4]" : "aspect-[4/3]")}>
                          <SmartImage image={im} sizes="(max-width: 1024px) 50vw, 30vw" className="absolute inset-0" hoverZoom />
                        </div>
                      </button>
                    </Reveal>
                  ))}
                </div>
              )}
            </div>
          </article>
        );
      })}
      <Lightbox images={all} index={lb.index} onClose={lb.close} onChange={lb.setIndex} />
    </div>
  );
}
