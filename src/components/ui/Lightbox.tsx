"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import type { SiteImage } from "@/data/images";
import { cn, EASE_EXPO, pad2 } from "@/lib/utils";
import { useUI } from "@/components/layout/Providers";

export function useLightbox() {
  const [index, setIndex] = useState<number | null>(null);
  return {
    index,
    open: (i: number) => setIndex(i),
    close: () => setIndex(null),
    setIndex,
  };
}

interface LightboxProps {
  images: SiteImage[];
  index: number | null;
  onClose: () => void;
  onChange: (i: number) => void;
}

const variants = {
  enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0, scale: 0.98 }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0, scale: 0.98 }),
};

export function Lightbox({ images, index, onClose, onChange }: LightboxProps) {
  const { lockScroll } = useUI();
  const open = index !== null && images.length > 0;
  const [dir, setDir] = useState(1);

  const go = useCallback(
    (delta: number) => {
      if (index === null) return;
      setDir(delta);
      onChange((index + delta + images.length) % images.length);
    },
    [index, images.length, onChange],
  );

  useEffect(() => {
    if (!open) return;
    lockScroll(true);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      lockScroll(false);
    };
  }, [open, go, onClose, lockScroll]);

  const current = open ? images[index] : null;
  const windowStart = index === null ? 0 : Math.max(0, Math.min(index - 6, images.length - 13));
  const thumbs = images.slice(windowStart, windowStart + 13);

  return (
    <AnimatePresence>
      {open && current && (
        <motion.div
          key="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          className="fixed inset-0 z-[95] flex flex-col bg-ink/[0.97] text-ivory"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-center justify-between px-5 pt-[max(1rem,env(safe-area-inset-top))] pb-3 sm:px-8">
            <span className="font-sans text-[0.75rem] tracking-[0.22em] text-ivory/70">
              <span className="text-ivory">{pad2(index + 1)}</span> / {pad2(images.length)}
            </span>
            <button type="button" onClick={onClose} aria-label="Close" className="grid h-11 w-11 place-items-center rounded-full ring-1 ring-ivory/25 transition hover:bg-ivory/10" data-cursor="link">
              <X className="h-5 w-5" strokeWidth={1.5} />
            </button>
          </div>

          <div className="relative min-h-0 flex-1">
            <AnimatePresence custom={dir} mode="popLayout" initial={false}>
              <motion.div
                key={current.id}
                custom={dir}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: EASE_EXPO }}
                className="absolute inset-0 px-3 sm:px-24"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.25}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -70 || info.velocity.x < -500) go(1);
                  else if (info.offset.x > 70 || info.velocity.x > 500) go(-1);
                }}
                data-cursor="drag"
                data-cursor-label="Swipe"
              >
                <div className="relative h-full w-full">
                  <Image src={current.src} alt={current.alt} fill sizes="100vw" priority className="pointer-events-none select-none object-contain" draggable={false} />
                </div>
              </motion.div>
            </AnimatePresence>

            {images.length > 1 && (
              <>
                <button type="button" onClick={() => go(-1)} aria-label="Previous photo" className="absolute left-4 top-1/2 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-ivory/5 ring-1 ring-ivory/20 transition hover:bg-ivory/15 sm:grid" data-cursor="link">
                  <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
                </button>
                <button type="button" onClick={() => go(1)} aria-label="Next photo" className="absolute right-4 top-1/2 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-ivory/5 ring-1 ring-ivory/20 transition hover:bg-ivory/15 sm:grid" data-cursor="link">
                  <ChevronRight className="h-5 w-5" strokeWidth={1.5} />
                </button>
              </>
            )}
          </div>

          <div className="px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-4 sm:px-8">
            <motion.div key={`cap-${current.id}`} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mx-auto max-w-3xl text-center">
              <p className="font-display text-[1.1rem] leading-snug text-ivory/90 sm:text-[1.25rem]">{current.alt}</p>
              <p className="mt-1 font-sans text-[0.7rem] tracking-[0.12em] text-ivory/45">
                {current.credit ?? "© Aurora Elite Suites"} · {current.id}
              </p>
            </motion.div>

            {images.length > 1 && (
              <div className="mt-4 hidden justify-center gap-2 md:flex">
                {thumbs.map((t) => {
                  const i = images.indexOf(t);
                  const active = i === index;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => {
                        setDir(i > index ? 1 : -1);
                        onChange(i);
                      }}
                      aria-label={`Photo ${i + 1}`}
                      className={cn("relative h-12 w-16 shrink-0 overflow-hidden rounded-[3px] transition-all duration-300", active ? "ring-2 ring-brass opacity-100" : "opacity-50 hover:opacity-90")}
                      data-cursor="link"
                    >
                      <Image src={t.src} alt="" fill sizes="96px" className="object-cover" />
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
