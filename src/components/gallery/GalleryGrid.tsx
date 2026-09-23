"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { GALLERY_TABS, IMAGES, aspectOf, type ImageTab, type SiteImage } from "@/data/images";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn, EASE_EXPO } from "@/lib/utils";
import { Lightbox, useLightbox } from "@/components/ui/Lightbox";
import { SmartImage } from "@/components/ui/SmartImage";

type TabKey = ImageTab | "all";

/** Distribute images into columns, always filling the shortest column (aspect ratios are known). */
function useMasonry(items: SiteImage[], columns: number) {
  return useMemo(() => {
    const cols: { items: SiteImage[]; height: number }[] = Array.from({ length: columns }, () => ({ items: [], height: 0 }));
    for (const im of items) {
      const target = cols.reduce((a, b) => (b.height < a.height ? b : a));
      target.items.push(im);
      target.height += 1 / aspectOf(im);
    }
    return cols.map((c) => c.items);
  }, [items, columns]);
}

export function GalleryGrid() {
  const [tab, setTab] = useState<TabKey>("all");
  const lb = useLightbox();
  const lg = useMediaQuery("(min-width: 1024px)");
  const md = useMediaQuery("(min-width: 640px)");
  const columns = lg ? 4 : md ? 3 : 2;

  const filtered = useMemo(() => (tab === "all" ? IMAGES : IMAGES.filter((i) => i.tab === tab)), [tab]);
  const cols = useMasonry(filtered, columns);
  const counts = useMemo(() => {
    const c: Record<string, number> = { all: IMAGES.length };
    for (const i of IMAGES) c[i.tab] = (c[i.tab] ?? 0) + 1;
    return c;
  }, []);

  return (
    <div>
      {/* Filter bar */}
      <div className="sticky z-30 -mx-5 border-y hairline glass px-5 transition-[top] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12 xl:-mx-16 xl:px-16" style={{ top: "calc(var(--header-offset, var(--header-h)) - 1px)" }}>
        <div className="flex gap-1 overflow-x-auto py-3 no-scrollbar" role="tablist" aria-label="Filter photos">
          {GALLERY_TABS.map((t) => {
            const active = t.key === tab;
            return (
              <button
                key={t.key}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setTab(t.key)}
                className={cn(
                  "relative shrink-0 rounded-full px-4 py-2 font-sans text-[0.8125rem] font-medium transition-colors duration-300",
                  active ? "text-ivory" : "text-charcoal/70 hover:text-charcoal",
                )}
                data-cursor="link"
              >
                {active && <motion.span layoutId="gallery-tab" className="absolute inset-0 rounded-full bg-fairway" transition={{ duration: 0.5, ease: EASE_EXPO }} />}
                <span className="relative">
                  {t.label} <span className={cn("ml-1 text-[0.7rem]", active ? "text-ivory/70" : "text-stone")}>{counts[t.key] ?? 0}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Masonry */}
      <div className="mt-10 grid gap-3 sm:gap-4" style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
        {cols.map((col, ci) => (
          <div key={ci} className="flex flex-col gap-3 sm:gap-4">
            <AnimatePresence mode="popLayout" initial={false}>
              {col.map((im, i) => (
                <motion.button
                  key={im.id}
                  type="button"
                  layout="position"
                  initial={{ opacity: 0, y: 24, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.7, delay: Math.min(i, 8) * 0.04, ease: EASE_EXPO }}
                  onClick={() => lb.open(filtered.indexOf(im))}
                  aria-label={`Open photo: ${im.alt}`}
                  className="group relative block w-full overflow-hidden rounded-[6px] bg-sand text-left"
                  data-cursor="view"
                >
                  <div className="relative w-full" style={{ aspectRatio: aspectOf(im) }}>
                    <SmartImage image={im} sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" className="absolute inset-0" hoverZoom />
                  </div>
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-ink/70 to-transparent p-3 pt-10 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <p className="line-clamp-2 font-sans text-[0.7rem] leading-snug text-ivory">{im.alt}</p>
                    {im.credit && <p className="mt-1 truncate font-sans text-[0.6rem] text-ivory/60">{im.credit}</p>}
                  </div>
                </motion.button>
              ))}
            </AnimatePresence>
          </div>
        ))}
      </div>

      <Lightbox images={filtered} index={lb.index} onClose={lb.close} onChange={lb.setIndex} />
    </div>
  );
}
