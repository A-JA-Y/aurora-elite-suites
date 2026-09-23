"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useUI } from "@/components/layout/Providers";

interface SectionNavProps {
  items: { id: string; label: string }[];
  className?: string;
}

/** Sticky in-page navigation that highlights the section in view. */
export function SectionNav({ items, className }: SectionNavProps) {
  const [active, setActive] = useState(items[0]?.id);
  const { scrollTo } = useUI();

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter((el): el is HTMLElement => Boolean(el));
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: 0 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items]);

  return (
    <nav aria-label="On this page" className={cn("sticky top-32", className)}>
      <p className="eyebrow mb-5">On this page</p>
      <ul className="flex flex-col gap-1 border-l hairline">
        {items.map((item) => {
          const isActive = active === item.id;
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => scrollTo(`#${item.id}`, -120)}
                className={cn(
                  "-ml-px block border-l py-1.5 pl-4 text-left font-sans text-[0.875rem] transition-all duration-300",
                  isActive ? "border-fairway text-charcoal" : "border-transparent text-stone hover:text-charcoal",
                )}
                data-cursor="link"
              >
                {item.label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
