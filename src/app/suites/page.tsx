import type { Metadata } from "next";
import { Check } from "lucide-react";
import { img } from "@/data/images";
import { absoluteUrl } from "@/data/site";
import { SUITES_PAGE } from "@/data/suites";
import { breadcrumbSchema } from "@/lib/schema";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHero } from "@/components/layout/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SuiteCards } from "@/components/suites/SuiteCards";
import { ComparisonTable } from "@/components/suites/ComparisonTable";
import { FinalCta } from "@/components/home/FinalCta";

export const metadata: Metadata = {
  title: { absolute: SUITES_PAGE.seo.title },
  description: SUITES_PAGE.seo.description,
  alternates: { canonical: absoluteUrl("/suites") },
};

export default function SuitesPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Our Suites", path: "/suites" }])} />
      <PageHero image={img(SUITES_PAGE.bannerImageId)} eyebrow="Two complete two-bedroom homes" title={SUITES_PAGE.h1} subtitle={SUITES_PAGE.intro} />

      <section className="container-x py-20 sm:py-28">
        <SuiteCards />
      </section>

      <section className="bg-cream py-24 sm:py-32">
        <div className="container-x">
          <SectionHeader eyebrow="Compare" title="Which suite suits you?" lede="Same township, same team, same warm interiors. The differences are in the beds, the balcony and the laundry." />
          <div className="mt-14">
            <ComparisonTable />
          </div>
        </div>
      </section>

      <section className="container-x py-24 sm:py-32">
        <SectionHeader eyebrow="Included in both suites" title="What you get either way" size="md" />
        <Stagger as="ul" className="mt-12 grid gap-px overflow-hidden rounded-[6px] bg-charcoal/10 sm:grid-cols-2 lg:grid-cols-3" stagger={0.05}>
          {SUITES_PAGE.includedInBoth.map((item) => (
            <StaggerItem key={item} as="li" className="flex items-start gap-3 bg-ivory px-5 py-5">
              <Check className="mt-1 h-4 w-4 shrink-0 text-fairway" strokeWidth={2} />
              <span className="text-[0.9375rem] leading-relaxed text-charcoal">{item}</span>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <FinalCta />
    </>
  );
}
