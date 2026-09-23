import type { Metadata } from "next";
import { IMAGES } from "@/data/images";
import { absoluteUrl } from "@/data/site";
import { breadcrumbSchema } from "@/lib/schema";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageIntro } from "@/components/layout/PageHero";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { FinalCta } from "@/components/home/FinalCta";

export const metadata: Metadata = {
  title: { absolute: "Photo Gallery | Aurora Elite Suites, Greater Noida" },
  description:
    "See inside Aurora Elite Suites: living rooms, kitchens, bedrooms, bathrooms, balcony views over the golf course, and the pool at Godrej Golf Links.",
  alternates: { canonical: absoluteUrl("/gallery") },
};

export default function GalleryPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Gallery", path: "/gallery" }])} />
      <PageIntro eyebrow={`${IMAGES.length} photos · what you see is what you get`} title="Gallery" lede="Real photos of our suites and of Godrej Golf Links. What you see is what you get." />
      <section className="container-x pb-24 sm:pb-32">
        <GalleryGrid />
        <p className="mt-10 max-w-[80ch] font-sans text-[0.75rem] leading-relaxed text-stone">
          Photos of the suites and the township are © Aurora Elite Suites. Landmark photos are from Wikimedia Commons and carry their credit line; licences are listed on the{" "}
          <a href="/image-credits" className="underline underline-offset-2 hover:text-charcoal">
            image credits page
          </a>
          .
        </p>
      </section>
      <FinalCta />
    </>
  );
}
