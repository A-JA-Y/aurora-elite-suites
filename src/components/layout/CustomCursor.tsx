"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useFinePointer } from "@/hooks/useMediaQuery";

/** Small dot + trailing ring. Grows with a label over images/links (desktop only). */
export function CustomCursor() {
  const fine = useFinePointer();
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const [mode, setMode] = useState<"default" | "link" | "view" | "drag" | "hidden">("default");

  useEffect(() => {
    if (!fine) return;
    document.documentElement.dataset.cursor = "custom";
    const d = dot.current!;
    const r = ring.current!;
    const dx = gsap.quickTo(d, "x", { duration: 0.12, ease: "power3.out" });
    const dy = gsap.quickTo(d, "y", { duration: 0.12, ease: "power3.out" });
    const rx = gsap.quickTo(r, "x", { duration: 0.42, ease: "power3.out" });
    const ry = gsap.quickTo(r, "y", { duration: 0.42, ease: "power3.out" });

    const onMove = (e: PointerEvent) => {
      dx(e.clientX);
      dy(e.clientY);
      rx(e.clientX);
      ry(e.clientY);
      const target = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-cursor], a, button, input, textarea, select, iframe");
      if (!target) {
        setMode("default");
        setLabel("");
        return;
      }
      if (target.matches("input, textarea, select, iframe")) {
        setMode("hidden");
        return;
      }
      const kind = target.dataset.cursor ?? "link";
      if (kind === "view" || kind === "drag") {
        setMode(kind);
        setLabel(target.dataset.cursorLabel ?? (kind === "view" ? "View" : "Drag"));
      } else {
        setMode("link");
        setLabel("");
      }
    };
    const onLeave = () => setMode("hidden");
    const onEnter = () => setMode("default");
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
      delete document.documentElement.dataset.cursor;
    };
  }, [fine]);

  if (!fine) return null;

  const size = mode === "view" || mode === "drag" ? 88 : mode === "link" ? 44 : 32;
  const hidden = mode === "hidden";

  return (
    <>
      <div
        ref={dot}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[200] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-riso-rust mix-blend-multiply transition-opacity duration-300"
        style={{ opacity: hidden || mode === "view" || mode === "drag" ? 0 : 1 }}
      />
      <div
        ref={ring}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[200] grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full transition-[width,height,background-color,border-color,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          width: size,
          height: size,
          opacity: hidden ? 0 : 1,
          backgroundColor: mode === "view" || mode === "drag" ? "rgba(246,234,225,0.95)" : "transparent",
          border: mode === "view" || mode === "drag" ? "none" : "1.5px solid rgba(224,133,115,0.95)",
          boxShadow: mode === "view" || mode === "drag" ? "5px 5px 0 0 rgba(140,67,24,0.9)" : "none",
        }}
      >
        <span
          className="font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-riso-rust transition-opacity duration-300"
          style={{ opacity: label ? 1 : 0 }}
        >
          {label}
        </span>
      </div>
    </>
  );
}
