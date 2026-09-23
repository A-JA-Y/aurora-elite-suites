"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { HOME } from "@/data/home";
import { imgs } from "@/data/images";
import { gsap, useGSAP } from "@/lib/gsap";
import imageLoader from "@/lib/image-loader";
import { pad2 } from "@/lib/utils";
import { useUI } from "./Providers";

const STORAGE_KEY = "aes-preloaded";
const slides = imgs(...HOME.hero.slideshowIds).map((s) => ({ ...s, url: imageLoader({ src: s.src, width: 1200 }) }));
const WORDS = ["Godrej Golf Links", "Sector 27, Greater Noida", "Wake up above the greens."];

const subscribeNoop = () => () => {};
function shouldSkip(): boolean {
  try {
    if (sessionStorage.getItem(STORAGE_KEY) === "1") return true;
  } catch {
    /* private mode */
  }
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function preload(url: string, timeout = 1500): Promise<void> {
  return new Promise((resolve) => {
    const im = new window.Image();
    const done = () => resolve();
    const t = window.setTimeout(done, timeout);
    im.onload = im.onerror = () => {
      window.clearTimeout(t);
      done();
    };
    im.src = url;
  });
}

/**
 * First-visit preloader: a framed image presentation with a counter,
 * then the frame swells to fill the screen and the curtain lifts.
 * Returning visitors in the same session skip it (see the inline script in layout).
 */
export function Preloader() {
  const { finishPreloader } = useUI();
  const root = useRef<HTMLDivElement>(null);
  // null during SSR/hydration, then true (skip) or false (play) on the client.
  const skip = useSyncExternalStore<boolean | null>(subscribeNoop, shouldSkip, () => null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (skip === true) finishPreloader();
    else if (skip === false) document.body.dataset.lock = "true";
  }, [skip, finishPreloader]);

  useGSAP(
    () => {
      if (skip !== false || !root.current) return;
      const q = gsap.utils.selector(root);
      const frames = q<HTMLElement>("[data-slide]");
      const counter = q<HTMLElement>("[data-counter]")[0];
      const percent = q<HTMLElement>("[data-percent]")[0];
      const bar = q<HTMLElement>("[data-bar]")[0];
      const words = q<HTMLElement>("[data-word]");
      const frame = q<HTMLElement>("[data-frame]")[0];
      const chrome = q<HTMLElement>("[data-chrome]");
      const state = { p: 0 };
      const paint = () => {
        if (percent) percent.textContent = String(Math.round(state.p));
        if (bar) bar.style.transform = `scaleX(${state.p / 100})`;
      };

      // Intro plays immediately while the photos are fetched.
      gsap.set(root.current, { autoAlpha: 1 });
      gsap.from(chrome, { y: 12, autoAlpha: 0, duration: 0.8, stagger: 0.06, ease: "expo.out" });
      gsap.fromTo(frame, { clipPath: "inset(50% 50% 50% 50% round 4px)" }, { clipPath: "inset(0% 0% 0% 0% round 4px)", duration: 1, ease: "expo.out" });
      const creep = gsap.to(state, { p: 14, duration: 1.5, ease: "power1.out", onUpdate: paint });

      let cancelled = false;
      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: "expo.out" },
        onComplete: () => {
          try {
            sessionStorage.setItem(STORAGE_KEY, "1");
          } catch {
            /* ignore */
          }
          // React removes the node once `done` flips; never touch the DOM directly.
          setDone(true);
        },
      });

      const per = 0.5;
      frames.forEach((f, i) => {
        const at = i * per;
        tl.fromTo(f, { clipPath: "inset(100% 0 0 0)", scale: 1.16 }, { clipPath: "inset(0% 0 0 0)", scale: 1.04, duration: 1, ease: "expo.inOut" }, at);
        tl.call(
          () => {
            if (counter) counter.textContent = pad2(i + 1);
          },
          undefined,
          at + 0.2,
        );
        if (i > 0) tl.to(frames[i - 1], { scale: 1.12, duration: 1, ease: "expo.inOut" }, at);
      });

      words.forEach((w, i) => {
        const at = i * per * 1.8;
        tl.fromTo(w, { yPercent: 110 }, { yPercent: 0, duration: 0.7 }, at);
        if (i < words.length - 1) tl.to(w, { yPercent: -110, duration: 0.6, ease: "expo.in" }, at + per * 1.8 - 0.45);
      });

      const total = frames.length * per + 0.4;
      tl.to(state, { p: 100, duration: total, ease: "power1.inOut", onUpdate: paint }, 0);

      // Exit: frame swells to fill the viewport, chrome fades, curtain lifts.
      tl.to(chrome, { autoAlpha: 0, y: -10, duration: 0.4 }, total - 0.2)
        .to(frame, { width: "100vw", height: "100vh", borderRadius: 0, duration: 0.9, ease: "expo.inOut" }, total - 0.15)
        .to(frames[frames.length - 1], { scale: 1, duration: 0.9, ease: "expo.inOut" }, "<")
        // Unlock the page and start the hero reveal as the curtain begins to lift.
        .call(
          () => {
            document.body.dataset.lock = "false";
            finishPreloader();
          },
          undefined,
          "-=0.25",
        )
        .to(root.current, { yPercent: -100, duration: 0.9, ease: "expo.inOut" }, "<");

      Promise.all(slides.map((s) => preload(s.url))).then(() => {
        if (cancelled) return;
        creep.kill();
        tl.play();
      });

      return () => {
        cancelled = true;
        creep.kill();
        tl.kill();
      };
    },
    { dependencies: [skip], scope: root },
  );

  if (skip !== false || done) return null;

  return (
    <div ref={root} id="preloader" aria-hidden className="fixed inset-0 z-[100] flex items-center justify-center bg-ivory text-charcoal opacity-0 grain">
      {/* Chrome */}
      <div data-chrome className="absolute left-6 top-6 sm:left-10 sm:top-8">
        <p className="font-display text-[1.05rem] font-semibold tracking-[0.24em]">AURORA</p>
        <p className="mt-1 font-sans text-[0.55rem] font-semibold uppercase tracking-[0.36em] text-oak">Elite Suites</p>
      </div>
      <div data-chrome className="absolute right-6 top-6 flex items-baseline gap-1 font-sans text-[0.75rem] tracking-[0.2em] text-stone sm:right-10 sm:top-8">
        <span data-counter className="text-charcoal">
          01
        </span>
        <span>/</span>
        <span>{pad2(slides.length)}</span>
      </div>
      <div data-chrome className="absolute bottom-6 left-6 flex items-end gap-1 sm:bottom-8 sm:left-10">
        <span data-percent className="font-display text-[3.5rem] leading-none tracking-[-0.03em] sm:text-[4.5rem]">
          0
        </span>
        <span className="mb-2 font-sans text-[0.7rem] tracking-[0.2em] text-stone">%</span>
      </div>
      <div data-chrome className="absolute bottom-8 right-6 hidden text-right font-sans text-[0.7rem] uppercase tracking-[0.22em] text-stone sm:right-10 sm:block">
        Greater Noida
        <br />
        <span className="text-oak">28.47° N, 77.53° E</span>
      </div>
      <div data-chrome className="absolute inset-x-0 bottom-0 h-px bg-charcoal/10">
        <div data-bar className="h-full w-full origin-left scale-x-0 bg-fairway" />
      </div>

      {/* Frame */}
      <div className="relative flex flex-col items-center">
        <div data-frame className="relative h-[min(58vh,520px)] w-[min(78vw,400px)] overflow-hidden rounded-[4px] bg-sand" style={{ clipPath: "inset(50% 50% 50% 50% round 4px)" }}>
          {slides.map((s, i) => (
            <div key={s.id} data-slide className="absolute inset-0 will-change-transform" style={{ clipPath: "inset(100% 0 0 0)", zIndex: i }}>
              {/* eslint-disable-next-line @next/next/no-img-element -- fixed-size presentation image, preloaded by URL */}
              <img src={s.url} alt="" className="absolute inset-0 h-full w-full object-cover" decoding="async" />
            </div>
          ))}
        </div>
        <div data-chrome className="relative mt-6 h-[1.6em] w-[min(78vw,400px)] overflow-hidden text-center font-display text-[1.35rem] italic text-charcoal/80 sm:text-[1.6rem]">
          {WORDS.map((w) => (
            <span key={w} data-word className="absolute inset-x-0 top-0 block" style={{ transform: "translateY(110%)" }}>
              {w}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
