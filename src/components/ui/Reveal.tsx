"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { EASE_EXPO } from "@/lib/utils";

type RevealVariant = "up" | "fade" | "scale" | "clip" | "left" | "right";

interface RevealProps {
  children: ReactNode;
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
  y?: number;
  once?: boolean;
  amount?: number;
  className?: string;
  as?: "div" | "section" | "span" | "li" | "p" | "figure" | "article" | "header";
}

function makeVariants(variant: RevealVariant, y: number): Variants {
  switch (variant) {
    case "fade":
      return { hidden: { opacity: 0 }, visible: { opacity: 1 } };
    case "scale":
      return { hidden: { opacity: 0, scale: 0.94 }, visible: { opacity: 1, scale: 1 } };
    case "clip":
      return {
        hidden: { clipPath: "inset(0 0 100% 0)", y: 24 },
        visible: { clipPath: "inset(0 0 0% 0)", y: 0 },
      };
    case "left":
      return { hidden: { opacity: 0, x: -32 }, visible: { opacity: 1, x: 0 } };
    case "right":
      return { hidden: { opacity: 0, x: 32 }, visible: { opacity: 1, x: 0 } };
    default:
      return { hidden: { opacity: 0, y }, visible: { opacity: 1, y: 0 } };
  }
}

/** Scroll-triggered entrance (Framer Motion, whileInView). */
export function Reveal({
  children,
  variant = "up",
  delay = 0,
  duration = 0.9,
  y = 28,
  once = true,
  amount = 0.2,
  className,
  as = "div",
}: RevealProps) {
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      variants={makeVariants(variant, y)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount, margin: "0px 0px -8% 0px" }}
      transition={{ duration, delay, ease: EASE_EXPO }}
    >
      {children}
    </Comp>
  );
}

interface StaggerProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  amount?: number;
  once?: boolean;
  as?: "div" | "ul" | "ol" | "section";
}

/** Parent that staggers its <StaggerItem> children. */
export function Stagger({ children, className, stagger = 0.08, delay = 0, amount = 0.15, once = true, as = "div" }: StaggerProps) {
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount, margin: "0px 0px -8% 0px" }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {children}
    </Comp>
  );
}

export function StaggerItem({
  children,
  className,
  variant = "up",
  y = 28,
  duration = 0.9,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  variant?: RevealVariant;
  y?: number;
  duration?: number;
  as?: "div" | "li" | "article" | "figure";
}) {
  const Comp = motion[as];
  return (
    <Comp className={className} variants={makeVariants(variant, y)} transition={{ duration, ease: EASE_EXPO }}>
      {children}
    </Comp>
  );
}
