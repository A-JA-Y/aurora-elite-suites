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

const variants: Record<Variant, string> = {
  primary: "bg-fairway text-ivory hover:bg-fairway-2 shadow-[0_10px_30px_-12px_rgba(47,91,64,0.6)]",
  secondary: "bg-transparent text-charcoal ring-1 ring-inset ring-charcoal/20 hover:ring-charcoal/60",
  ghost: "bg-transparent text-charcoal hover:bg-charcoal/5",
  brass: "bg-brass text-ink hover:bg-brass-2",
  light: "bg-ivory text-charcoal hover:bg-white",
  "outline-light": "bg-transparent text-ivory ring-1 ring-inset ring-ivory/40 hover:bg-ivory/10 hover:ring-ivory/70",
  dark: "bg-ink text-ivory hover:bg-charcoal",
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
    "group relative inline-flex select-none items-center justify-center overflow-hidden rounded-full font-sans font-semibold tracking-[0.01em] transition-[background-color,box-shadow,color,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60",
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
