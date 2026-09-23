import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/data/site";

const routes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/suites", priority: 0.9, changeFrequency: "monthly" },
  { path: "/suites/golf-view-suite", priority: 0.9, changeFrequency: "monthly" },
  { path: "/suites/elegant-suite", priority: 0.9, changeFrequency: "monthly" },
  { path: "/amenities", priority: 0.7, changeFrequency: "monthly" },
  { path: "/gallery", priority: 0.7, changeFrequency: "monthly" },
  { path: "/location", priority: 0.8, changeFrequency: "monthly" },
  { path: "/reviews", priority: 0.7, changeFrequency: "weekly" },
  { path: "/about", priority: 0.5, changeFrequency: "yearly" },
  { path: "/faqs", priority: 0.7, changeFrequency: "monthly" },
  { path: "/house-rules", priority: 0.4, changeFrequency: "yearly" },
  { path: "/contact", priority: 0.9, changeFrequency: "yearly" },
  { path: "/privacy-policy", priority: 0.2, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.2, changeFrequency: "yearly" },
  { path: "/image-credits", priority: 0.1, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-09-23");
  return routes.map((r) => ({ url: absoluteUrl(r.path), lastModified, changeFrequency: r.changeFrequency, priority: r.priority }));
}
