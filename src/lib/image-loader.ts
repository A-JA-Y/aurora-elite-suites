"use client";

import type { ImageLoaderProps } from "next/image";

// Airbnb's image CDN accepts an `im_w` width parameter.
const AIRBNB_WIDTHS = [320, 480, 720, 960, 1200, 1440, 1920, 2560];
// Wikimedia thumbnails are addressed by `/<width>px-<file>`.
const WIKI_WIDTHS = [640, 960, 1280];

function snap(width: number, steps: number[]): number {
  for (const step of steps) if (step >= width) return step;
  return steps[steps.length - 1];
}

export default function imageLoader({ src, width }: ImageLoaderProps): string {
  if (src.includes("a0.muscache.com")) {
    const w = snap(width, AIRBNB_WIDTHS);
    if (/[?&]im_w=\d+/.test(src)) return src.replace(/([?&])im_w=\d+/, `$1im_w=${w}`);
    return `${src}${src.includes("?") ? "&" : "?"}im_w=${w}`;
  }
  if (src.includes("upload.wikimedia.org") && src.includes("/thumb/")) {
    const match = src.match(/\/(\d+)px-/);
    if (match) {
      const original = Number.parseInt(match[1], 10);
      const w = Math.min(snap(width, WIKI_WIDTHS), original);
      return src.replace(/\/(\d+)px-/, `/${w}px-`);
    }
  }
  return src;
}
