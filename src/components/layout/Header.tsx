"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Phone } from "lucide-react";
import { NAV, SITE } from "@/data/site";
import { useScrollState } from "@/hooks/useScrollState";
import { cn, EASE_EXPO } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Wordmark } from "./Wordmark";
import { useUI } from "./Providers";

export function Header() {
  const { scrolled, direction, y } = useScrollState(32);
  const { menuOpen, toggleMenu, preloaderDone } = useUI();
  const pathname = usePathname();
  const [overDark, setOverDark] = useState(false);

  // Is a dark hero currently sitting under the header strip?
  useEffect(() => {
    const heroes = Array.from(document.querySelectorAll<HTMLElement>("[data-hero-dark]"));
    if (heroes.length === 0) {
      const id = requestAnimationFrame(() => setOverDark(false));
      return () => cancelAnimationFrame(id);
    }
    const headerH = 84;
    const io = new IntersectionObserver(
      (entries) => setOverDark(entries.some((e) => e.isIntersecting)),
      { rootMargin: `0px 0px -${Math.max(0, window.innerHeight - headerH)}px 0px`, threshold: 0 },
    );
    heroes.forEach((h) => io.observe(h));
    return () => io.disconnect();
  }, [pathname]);

  const hidden = direction === "down" && y > 420 && !menuOpen;

  // Sticky in-page bars (gallery filters) sit directly under the header only while it is visible.
  useEffect(() => {
    document.documentElement.style.setProperty("--header-offset", hidden ? "0px" : "var(--header-h)");
  }, [hidden]);
  const light = overDark && !scrolled;
  const solid = scrolled;

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: hidden ? -110 : 0, opacity: preloaderDone ? 1 : 0 }}
      transition={{ duration: 0.7, ease: EASE_EXPO }}
    >
      <div
        className={cn(
          "transition-[background-color,box-shadow,backdrop-filter] duration-700",
          solid ? "glass shadow-[0_1px_0_rgba(42,42,40,0.08)]" : "bg-transparent",
          light ? "text-ivory" : "text-charcoal",
        )}
      >
        <div className="container-x flex h-[var(--header-h)] items-center justify-between gap-6">
          <Wordmark compact={false} />

          <nav aria-label="Primary" className="hidden items-center gap-1 xl:flex">
            {NAV.map((item) => {
              const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative rounded-full px-3.5 py-2 font-sans text-[0.8125rem] font-medium tracking-[0.02em] transition-colors duration-300",
                    active ? "opacity-100" : "opacity-70 hover:opacity-100",
                  )}
                  data-cursor="link"
                >
                  {item.label}
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className={cn("absolute inset-x-3.5 -bottom-0.5 h-px", light ? "bg-brass" : "bg-fairway")}
                      transition={{ duration: 0.5, ease: EASE_EXPO }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={SITE.phoneTel}
              className="hidden items-center gap-2 rounded-full px-3 py-2 font-sans text-[0.8125rem] font-medium tracking-[0.02em] opacity-80 transition-opacity hover:opacity-100 lg:inline-flex"
              data-cursor="link"
            >
              <Phone className="h-3.5 w-3.5" strokeWidth={1.75} />
              {SITE.phoneDisplay}
            </a>
            <div className="hidden sm:block">
              <Button href="/contact" size="sm" variant={light ? "light" : "primary"} icon={null} magnetic={false}>
                Check Availability
              </Button>
            </div>
            <button
              type="button"
              onClick={toggleMenu}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              className="group relative grid h-11 w-11 place-items-center rounded-full ring-1 ring-current/25 transition-colors hover:ring-current/60"
              data-cursor="link"
            >
              <span className="sr-only">Menu</span>
              <span className="relative block h-3 w-[18px]">
                <span
                  className={cn(
                    "absolute left-0 top-0 h-px w-full bg-current transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                    menuOpen ? "translate-y-[5.5px] rotate-45" : "group-hover:-translate-y-[1px]",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 bottom-0 h-px w-full bg-current transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                    menuOpen ? "-translate-y-[5.5px] -rotate-45" : "group-hover:translate-y-[1px]",
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
