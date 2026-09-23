"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type MutableRefObject,
  type ReactNode,
} from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface UIState {
  menuOpen: boolean;
  openMenu: () => void;
  closeMenu: () => void;
  toggleMenu: () => void;
  assistantOpen: boolean;
  assistantPrompt: string | null;
  openAssistant: (prompt?: string) => void;
  closeAssistant: () => void;
  consumeAssistantPrompt: () => void;
  bookOpen: boolean;
  openBook: () => void;
  closeBook: () => void;
  preloaderDone: boolean;
  finishPreloader: () => void;
  lenis: MutableRefObject<Lenis | null>;
  scrollTo: (target: string | number | HTMLElement, offset?: number) => void;
  lockScroll: (locked: boolean) => void;
}

const UIContext = createContext<UIState | null>(null);

export function useUI(): UIState {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error("useUI must be used inside <Providers>");
  return ctx;
}

export function Providers({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  // Overlays remember the route they were opened on, so a navigation closes them
  // without needing an effect that sets state.
  const [menu, setMenu] = useState<{ open: boolean; path: string | null }>({ open: false, path: null });
  const [book, setBook] = useState<{ open: boolean; path: string | null }>({ open: false, path: null });
  const menuOpen = menu.open && menu.path === pathname;
  const bookOpen = book.open && book.path === pathname;
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [assistantPrompt, setAssistantPrompt] = useState<string | null>(null);
  const [preloaderDone, setPreloaderDone] = useState(false);
  const lenis = useRef<Lenis | null>(null);
  const locks = useRef(0);
  const finishPreloader = useCallback(() => setPreloaderDone(true), []);

  // Lenis smooth scroll wired to GSAP's ticker + ScrollTrigger.
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const instance = new Lenis({
      autoRaf: false,
      lerp: reduce ? 1 : 0.085,
      smoothWheel: !reduce,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.4,
      anchors: false,
    });
    lenis.current = instance;
    instance.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      instance.destroy();
      lenis.current = null;
    };
  }, []);

  // Route change: jump to top and refresh triggers once layout settles.
  useEffect(() => {
    lenis.current?.scrollTo(0, { immediate: true, force: true });
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 250);
    return () => window.clearTimeout(t);
  }, [pathname]);

  const lockScroll = useCallback((locked: boolean) => {
    locks.current = Math.max(0, locks.current + (locked ? 1 : -1));
    const isLocked = locks.current > 0;
    document.body.dataset.lock = isLocked ? "true" : "false";
    if (isLocked) lenis.current?.stop();
    else lenis.current?.start();
  }, []);

  // Menu and booking sheet lock the page behind them.
  useEffect(() => {
    if (!menuOpen) return;
    lockScroll(true);
    return () => lockScroll(false);
  }, [menuOpen, lockScroll]);

  useEffect(() => {
    if (!bookOpen) return;
    lockScroll(true);
    return () => lockScroll(false);
  }, [bookOpen, lockScroll]);

  // Escape closes whatever is on top.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (bookOpen) setBook({ open: false, path: null });
      else if (menuOpen) setMenu({ open: false, path: null });
      else if (assistantOpen) setAssistantOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [bookOpen, menuOpen, assistantOpen]);

  const scrollTo = useCallback((target: string | number | HTMLElement, offset = 0) => {
    if (lenis.current) lenis.current.scrollTo(target, { offset, duration: 1.4 });
    else if (typeof target === "number") window.scrollTo({ top: target, behavior: "smooth" });
    else {
      const el = typeof target === "string" ? document.querySelector<HTMLElement>(target) : target;
      el?.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const value = useMemo<UIState>(
    () => ({
      menuOpen,
      openMenu: () => setMenu({ open: true, path: pathname }),
      closeMenu: () => setMenu({ open: false, path: null }),
      toggleMenu: () => setMenu((m) => (m.open && m.path === pathname ? { open: false, path: null } : { open: true, path: pathname })),
      assistantOpen,
      assistantPrompt,
      openAssistant: (prompt?: string) => {
        setMenu({ open: false, path: null });
        setBook({ open: false, path: null });
        if (prompt) setAssistantPrompt(prompt);
        setAssistantOpen(true);
      },
      closeAssistant: () => setAssistantOpen(false),
      consumeAssistantPrompt: () => setAssistantPrompt(null),
      bookOpen,
      openBook: () => {
        setMenu({ open: false, path: null });
        setBook({ open: true, path: pathname });
      },
      closeBook: () => setBook({ open: false, path: null }),
      preloaderDone,
      finishPreloader,
      lenis,
      scrollTo,
      lockScroll,
    }),
    [menuOpen, assistantOpen, assistantPrompt, bookOpen, preloaderDone, pathname, finishPreloader, scrollTo, lockScroll],
  );

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}
