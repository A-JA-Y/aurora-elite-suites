"use client";

import Link from "next/link";
import { type ReactNode, type MouseEvent } from "react";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Magnetic } from "./Magnetic";

type Variant = "primary" | "secondary" | "ghost" | "brass" | "light" | "outline-light" | "dark";
type Size = "sm" | "md" | "lg";

export interface ButtonProps {
  href?: string;
  onClick?: (e: MouseEvent<HTMLElement>) => void;
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
  icon?: ReactNode | "arrow" | "external" | null;
  external?: boolean;
  magnetic?: boolean;
  type?: "button" | "submit";
  disabled?: boolean;
  ariaLabel?: string;
}

// Flat riso ink plus a hard offset plate that shifts under the cursor —
// no soft drop shadows, which a riso press cannot print.
const variants: Record<Variant, string> = {
  primary: "bg-riso-rust text-riso-cream hover:bg-oak-2 shadow-[4px_4px_0_0_var(--color-riso-dark)] hover:shadow-[7px_7px_0_0_var(--color-riso-salmon)] hover:-translate-x-0.5 hover:-translate-y-0.5",
  secondary: "bg-transparent text-riso-blue ring-[1.5px] ring-inset ring-riso-blue/35 hover:ring-riso-blue hover:bg-riso-salmon/15",
  ghost: "bg-transparent text-riso-blue hover:bg-riso-rust/8",
  brass: "bg-riso-salmon text-riso-blue hover:bg-brass-2 shadow-[4px_4px_0_0_var(--color-riso-blue)] hover:shadow-[7px_7px_0_0_var(--color-riso-rust)] hover:-translate-x-0.5 hover:-translate-y-0.5",
  light: "bg-riso-cream text-riso-rust hover:bg-white shadow-[4px_4px_0_0_var(--color-riso-rust)] hover:shadow-[7px_7px_0_0_var(--color-riso-salmon)] hover:-translate-x-0.5 hover:-translate-y-0.5",
  "outline-light": "bg-transparent text-ivory ring-[1.5px] ring-inset ring-ivory/45 hover:bg-ivory/12 hover:ring-ivory/80",
  dark: "bg-riso-blue text-riso-cream hover:bg-forest shadow-[4px_4px_0_0_var(--color-riso-salmon)] hover:shadow-[7px_7px_0_0_var(--color-riso-rust)] hover:-translate-x-0.5 hover:-translate-y-0.5",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-[0.8125rem] gap-2",
  md: "h-12 px-6 text-sm gap-2.5",
  lg: "h-14 px-8 text-[0.9375rem] gap-3",
};

export function Button({
  href,
  onClick,
  variant = "primary",
  size = "md",
  children,
  className,
  icon = "arrow",
  external,
  magnetic = true,
  type = "button",
  disabled,
  ariaLabel,
}: ButtonProps) {
  const isExternal = external ?? (href ? /^(https?:|mailto:|tel:)/.test(href) : false);
  const iconNode =
    icon === "arrow" ? (
      <ArrowRight className="h-4 w-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1" strokeWidth={1.75} />
    ) : icon === "external" ? (
      <ArrowUpRight className="h-4 w-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.75} />
    ) : (
      icon
    );

  const classes = cn(
    "group relative inline-flex select-none items-center justify-center overflow-hidden rounded-[2px] font-sans font-semibold tracking-[0.01em] transition-[background-color,box-shadow,color,transform,translate] duration-300 ease-expo active:translate-x-0.5 active:translate-y-0.5 active:shadow-none disabled:pointer-events-none disabled:opacity-60",
    variants[variant],
    sizes[size],
    className,
  );

  const label = (
    <span className="relative grid overflow-hidden">
      <span className="col-start-1 row-start-1 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-[120%]">
        {children}
      </span>
      <span
        aria-hidden
        className="col-start-1 row-start-1 translate-y-[120%] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0"
      >
        {children}
      </span>
    </span>
  );

  let node: ReactNode;
  if (href && !isExternal) {
    node = (
      <Link href={href} className={classes} onClick={onClick} aria-label={ariaLabel} data-cursor="link">
        {label}
        {iconNode}
      </Link>
    );
  } else if (href) {
    node = (
      <a
        href={href}
        className={classes}
        onClick={onClick}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        aria-label={ariaLabel}
        data-cursor="link"
      >
        {label}
        {iconNode}
      </a>
    );
  } else {
    node = (
      <button type={type} className={classes} onClick={onClick} disabled={disabled} aria-label={ariaLabel} data-cursor="link">
        {label}
        {iconNode}
      </button>
    );
  }

  return magnetic ? <Magnetic>{node}</Magnetic> : node;
}
