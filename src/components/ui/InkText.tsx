"use client";

import type { ElementType } from "react";
import { cn } from "@/lib/utils";

interface InkTextProps {
  children: string;
  className?: string;
  as?: ElementType;
}

/**
 * Text that separates into salmon and steel-blue plates on hover, the way a
 * two-colour riso pass drifts out of registration.
 *
 * The `ink-shift` utility draws the ghost plates from `data-text`, so the
 * child must be a plain string — anything richer would not survive
 * `content: attr()`.
 */
export function InkText({ children, className, as: Tag = "span" }: InkTextProps) {
  return (
    <Tag className={cn("ink-shift", className)} data-text={children}>
      {children}
    </Tag>
  );
}
