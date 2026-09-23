"use client";

import Image from "next/image";
import { useState } from "react";
import type { SiteImage } from "@/data/images";
import { cn } from "@/lib/utils";

interface SmartImageProps {
  image: SiteImage;
  sizes?: string;
  priority?: boolean;
  /** Container classes (position relative + size). */
  className?: string;
  /** Classes on the <img> itself. */
  imgClassName?: string;
  /** Zoom slowly on hover of the nearest `group`. */
  hoverZoom?: boolean;
  fill?: boolean;
  width?: number;
  height?: number;
  quality?: number;
  onLoad?: () => void;
  draggable?: boolean;
}

/**
 * next/image with a warm shimmer placeholder and a gentle fade-in once loaded.
 * Uses the custom CDN loader from next.config (Airbnb / Wikimedia native resizing).
 */
export function SmartImage({
  image,
  sizes = "100vw",
  priority = false,
  className,
  imgClassName,
  hoverZoom = false,
  fill = true,
  width,
  height,
  onLoad,
  draggable = false,
}: SmartImageProps) {
  const [loaded, setLoaded] = useState(false);
  const ratio = image.orientation === "P" ? 3 / 4 : 4 / 3;
  const w = width ?? (fill ? undefined : 1200);
  const h = height ?? (fill ? undefined : Math.round(1200 / ratio));

  return (
    <div className={cn("relative overflow-hidden bg-sand", !loaded && "img-shimmer", className)}>
      <Image
        src={image.src}
        alt={image.alt}
        fill={fill}
        width={fill ? undefined : w}
        height={fill ? undefined : h}
        sizes={sizes}
        priority={priority}
        loading={priority ? undefined : "lazy"}
        draggable={draggable}
        onLoad={() => {
          setLoaded(true);
          onLoad?.();
        }}
        className={cn(
          "object-cover transition-[opacity,transform] duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
          loaded ? "opacity-100" : "opacity-0",
          hoverZoom && "will-change-transform group-hover:scale-[1.06]",
          imgClassName,
        )}
      />
    </div>
  );
}
