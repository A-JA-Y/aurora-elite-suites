import type { Metadata } from "next";
import { HOME } from "@/data/home";
import { absoluteUrl } from "@/data/site";
import { Hero } from "@/components/home/Hero";
import { TrustStrip } from "@/components/home/TrustStrip";
import { Welcome } from "@/components/home/Welcome";
import { WhyUs } from "@/components/home/WhyUs";
import { SuitesShowcase } from "@/components/home/SuitesShowcase";
import { TheView } from "@/components/home/TheView";
import { AmenitiesSnapshot } from "@/components/home/AmenitiesSnapshot";
import { WhoStays } from "@/components/home/WhoStays";
import { LocationTeaser } from "@/components/home/LocationTeaser";
import { ReviewsCarousel } from "@/components/home/ReviewsCarousel";
import { GalleryStrip } from "@/components/home/GalleryStrip";
import { FaqTeaser } from "@/components/home/FaqTeaser";
import { FinalCta } from "@/components/home/FinalCta";

export const metadata: Metadata = {
  title: { absolute: HOME.seo.title },
  description: HOME.seo.description,
  alternates: { canonical: absoluteUrl("/") },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <Welcome />
      <WhyUs />
      <SuitesShowcase />
      <TheView />
      <AmenitiesSnapshot />
      <WhoStays />
      <LocationTeaser />
      <ReviewsCarousel />
      <GalleryStrip />
      <FaqTeaser />
      <FinalCta />
    </>
  );
}
