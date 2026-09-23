import type { Metadata } from "next";
import { Check } from "lucide-react";
import { AMENITIES_PAGE, AMENITY_SECTIONS } from "@/data/amenities";
import { img, imgs } from "@/data/images";
import { absoluteUrl } from "@/data/site";
import { breadcrumbSchema } from "@/lib/schema";
import { cn, pad2 } from "@/lib/utils";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHero } from "@/components/layout/PageHero";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { SectionNav } from "@/components/ui/SectionNav";
import { FinalCta } from "@/components/home/FinalCta";

export const metadata: Metadata = {
  title: { absolute: AMENITIES_PAGE.seo.title },
  description: AMENITIES_PAGE.seo.description,
  alternates: { canonical: absoluteUrl("/amenities") },
};

export default function AmenitiesPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Amenities", path: "/amenities" }])} />
      <PageHero image={img(AMENITIES_PAGE.bannerImageId)} eyebrow="Everything's already here" title={AMENITIES_PAGE.h1} subtitle={AMENITIES_PAGE.intro} />

      <section className="container-x py-20 sm:py-28">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="hidden lg:col-span-3 lg:block">
            <SectionNav items={AMENITY_SECTIONS.map((s) => ({ id: s.id, label: s.title }))} />
          </div>
          <div className="flex flex-col gap-20 sm:gap-28 lg:col-span-9">
            {AMENITY_SECTIONS.map((sec, i) => {
              const images = imgs(...sec.imageIds);
              const [lead, ...rest] = images;
              return (
                <article key={sec.id} id={sec.id} className="scroll-mt-32">
                  <div className="grid gap-10 md:grid-cols-12 md:gap-12">
                    <div className={cn(images.length ? "md:col-span-6" : "md:col-span-12")}>
                      <p className="eyebrow">{pad2(i + 1)}</p>
                      <SplitHeading as="h2" className="display-md mt-3 text-charcoal">
                        {sec.title}
                      </SplitHeading>
                      {sec.note && (
                        <Reveal>
                          <p className="mt-2 font-display text-[1.1rem] italic text-oak">{sec.note}</p>
                        </Reveal>
                      )}
                      <Stagger as="ul" className={cn("mt-8 grid gap-3", !images.length && "sm:grid-cols-2")} stagger={0.05}>
                        {sec.items.map((item) => (
                          <StaggerItem key={item} as="li" className="flex items-start gap-3 border-b hairline pb-3">
                            <Check className="mt-1.5 h-4 w-4 shrink-0 text-fairway" strokeWidth={2} />
                            <span className="text-[1rem] leading-relaxed text-charcoal">{item}</span>
                          </StaggerItem>
                        ))}
                      </Stagger>
                    </div>
                    {lead && (
                      <div className="md:col-span-6">
                        <ParallaxImage image={lead} className={cn("rounded-[6px]", lead.orientation === "P" ? "aspect-[3/4]" : "aspect-[4/3]")} speed={0.1} sizes="(max-width: 768px) 100vw, 45vw" />
                        {rest.length > 0 && (
                          <div className={cn("mt-4 grid gap-4", rest.length >= 3 ? "grid-cols-3" : rest.length === 2 ? "grid-cols-2" : "grid-cols-1")}>
                            {rest.map((im, ri) => (
                              <Reveal key={im.id} variant="clip" delay={ri * 0.08}>
                                <div className={cn("relative overflow-hidden rounded-[6px]", rest.length >= 3 ? "aspect-[3/4]" : im.orientation === "P" ? "aspect-[3/4]" : "aspect-[4/3]")}>
                                  <SmartImage image={im} sizes="(max-width: 768px) 50vw, 20vw" className="absolute inset-0" />
                                </div>
                              </Reveal>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
