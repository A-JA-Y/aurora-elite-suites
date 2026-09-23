import type { Metadata } from "next";
import { ABOUT_PAGE } from "@/data/legal";
import { img, imgs } from "@/data/images";
import { absoluteUrl } from "@/data/site";
import { breadcrumbSchema } from "@/lib/schema";
import { cn, pad2 } from "@/lib/utils";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";
import { Counter } from "@/components/ui/Counter";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Eyebrow, SectionHeader } from "@/components/ui/SectionHeader";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { FinalCta } from "@/components/home/FinalCta";

export const metadata: Metadata = {
  title: { absolute: ABOUT_PAGE.seo.title },
  description: ABOUT_PAGE.seo.description,
  alternates: { canonical: absoluteUrl("/about") },
};

export default function AboutPage() {
  const [a, b, c, d] = imgs(...ABOUT_PAGE.imageIds);
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "About Us", path: "/about" }])} />
      <PageHero image={img(ABOUT_PAGE.bannerImageId)} eyebrow="Since 2026 · Godrej Golf Links" title={ABOUT_PAGE.h1} size="lg" />

      <section className="container-x py-24 sm:py-32">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <Eyebrow>Our story</Eyebrow>
              <SplitHeading as="h2" className="display-lg mt-5 max-w-[12ch] text-charcoal">
                More than a hotel room
              </SplitHeading>
            </div>
          </div>
          <div className="lg:col-span-8">
            <div className="flex flex-col gap-7">
              {ABOUT_PAGE.story.map((p, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <p className={cn("max-w-[64ch] leading-relaxed text-charcoal/85", i === 0 ? "font-display text-[1.6rem] sm:text-[1.85rem]" : "lede")}>{p}</p>
                </Reveal>
              ))}
            </div>
            <div className="mt-14 grid grid-cols-12 gap-4">
              <ParallaxImage image={a} className="col-span-7 aspect-[3/4] rounded-[6px]" sizes="(max-width: 1024px) 60vw, 40vw" speed={0.12} />
              <ParallaxImage image={c} className="col-span-5 mt-20 aspect-[4/3] rounded-[6px]" sizes="(max-width: 1024px) 40vw, 25vw" speed={0.18} />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-forest py-24 text-ivory grain sm:py-32">
        <div className="container-x">
          <SectionHeader eyebrow="What we care about" title="Four things we don't compromise on" tone="dark" />
          <Stagger className="mt-14 grid gap-px overflow-hidden rounded-[6px] bg-ivory/10 md:grid-cols-2" stagger={0.1}>
            {ABOUT_PAGE.values.map((v, i) => (
              <StaggerItem key={v.title} className="bg-forest p-8 sm:p-10">
                <p className="font-sans text-[0.7rem] tracking-[0.24em] text-brass">{pad2(i + 1)}</p>
                <h3 className="mt-5 font-display text-[1.9rem] leading-tight">{v.title}</h3>
                <p className="mt-3 max-w-[44ch] text-[0.9375rem] leading-relaxed text-ivory/70">{v.text}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="container-x py-24 sm:py-32">
        <SectionHeader eyebrow="By the numbers" title="Small, and proud of it" size="md" />
        <Stagger className="mt-14 grid grid-cols-2 gap-10 md:grid-cols-4" stagger={0.1}>
          {ABOUT_PAGE.numbers.map((n) => (
            <StaggerItem key={n.label} className="border-t hairline pt-6">
              <p className="font-display text-[3.5rem] leading-none tracking-[-0.03em] text-fairway sm:text-[4.5rem]">
                {n.display.endsWith("%") ? <Counter value={n.value} suffix="%" /> : n.display.includes(".") ? <Counter value={n.value} decimals={1} /> : <Counter value={n.value} />}
              </p>
              <p className="mt-3 font-sans text-[0.875rem] text-stone">{n.label}</p>
            </StaggerItem>
          ))}
        </Stagger>
        <div className="mt-20 grid grid-cols-12 gap-4">
          <ParallaxImage image={b} className="col-span-5 aspect-[3/4] rounded-[6px]" sizes="40vw" speed={0.12} />
          <ParallaxImage image={d} className="col-span-7 mt-12 aspect-[4/3] rounded-[6px]" sizes="60vw" speed={0.16} />
        </div>
      </section>

      <section className="bg-cream py-20 sm:py-24">
        <div className="container-x flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <p className="max-w-[28ch] font-display text-[2rem] leading-tight text-charcoal sm:text-[2.6rem]">{ABOUT_PAGE.closing}</p>
          </Reveal>
          <Button href="/contact" size="lg">
            Check Availability
          </Button>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
