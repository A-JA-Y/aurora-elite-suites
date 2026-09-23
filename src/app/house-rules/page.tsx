import type { Metadata } from "next";
import { Check } from "lucide-react";
import { HOUSE_RULES } from "@/data/legal";
import { absoluteUrl } from "@/data/site";
import { breadcrumbSchema } from "@/lib/schema";
import { pad2 } from "@/lib/utils";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageIntro } from "@/components/layout/PageHero";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { FinalCta } from "@/components/home/FinalCta";

export const metadata: Metadata = {
  title: { absolute: HOUSE_RULES.seo.title },
  description: HOUSE_RULES.seo.description,
  alternates: { canonical: absoluteUrl("/house-rules") },
};

export default function HouseRulesPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "House Rules & Policies", path: "/house-rules" }])} />
      <PageIntro eyebrow="A home in a residential community" title={HOUSE_RULES.h1} lede={HOUSE_RULES.intro} />
      <section className="container-x pb-24 sm:pb-32">
        <div className="flex flex-col divide-y divide-charcoal/10">
          {HOUSE_RULES.sections.map((sec, i) => (
            <article key={sec.title} className="grid gap-6 py-12 md:grid-cols-12 md:gap-12 first:pt-0">
              <div className="md:col-span-4">
                <p className="eyebrow">{pad2(i + 1)}</p>
                <SplitHeading as="h2" className="display-sm mt-3 text-charcoal">
                  {sec.title}
                </SplitHeading>
              </div>
              <Stagger as="ul" className="flex flex-col gap-3.5 md:col-span-8" stagger={0.05}>
                {sec.items.map((item) => (
                  <StaggerItem key={item} as="li" className="flex items-start gap-3">
                    <Check className="mt-1.5 h-4 w-4 shrink-0 text-fairway" strokeWidth={2} />
                    <span className="text-[1rem] leading-relaxed text-charcoal/85">{item}</span>
                  </StaggerItem>
                ))}
              </Stagger>
            </article>
          ))}
        </div>
      </section>
      <FinalCta />
    </>
  );
}
