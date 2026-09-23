import type { Metadata } from "next";
import { ArrowUpRight, Star } from "lucide-react";
import { img } from "@/data/images";
import { RATING, REVIEWS } from "@/data/reviews";
import { SITE, absoluteUrl } from "@/data/site";
import { breadcrumbSchema } from "@/lib/schema";
import { cn } from "@/lib/utils";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Eyebrow, SectionHeader } from "@/components/ui/SectionHeader";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { RatingBox } from "@/components/suites/RatingBox";
import { FinalCta } from "@/components/home/FinalCta";

export const metadata: Metadata = {
  title: { absolute: "Guest Reviews | Aurora Elite Suites, Greater Noida" },
  description: "Rated 5.0 by Airbnb guests. Read all 10 reviews of Aurora Elite Suites at Godrej Golf Links, Greater Noida: cleanliness, location, hospitality.",
  alternates: { canonical: absoluteUrl("/reviews") },
};

export default function ReviewsPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Guest Reviews", path: "/reviews" }])} />
      <PageHero image={img("GV-VIEW-09")} eyebrow="Verified Airbnb stays · quoted word for word" title="Guest Reviews" subtitle="Every review below is from a verified Airbnb stay at our Golf View Suite, shared exactly as the guest wrote it." />

      <section className="container-x py-20 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Eyebrow>Rating summary</Eyebrow>
              <SplitHeading as="h2" className="display-lg mt-5 max-w-[12ch] text-charcoal">
                Ten stays, ten five-stars
              </SplitHeading>
              <Reveal delay={0.1} className="mt-10">
                <RatingBox />
              </Reveal>
              <Reveal delay={0.15} className="mt-8">
                <p className="eyebrow">What guests mention most</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {RATING.mentions.map((m) => (
                    <li key={m.label} className="inline-flex items-center gap-2 rounded-full bg-cream px-3.5 py-2 font-sans text-[0.8125rem] text-charcoal ring-1 ring-charcoal/8">
                      {m.label} <span className="font-semibold text-fairway">{m.count}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal delay={0.2} className="mt-8">
                <Button href={SITE.airbnb.golfView} variant="secondary" icon={<ArrowUpRight className="h-4 w-4" strokeWidth={1.75} />}>
                  Read these reviews on Airbnb
                </Button>
              </Reveal>
            </div>
          </div>

          <div className="lg:col-span-7">
            <Stagger className="columns-1 gap-5 md:columns-2 [&>*]:mb-5 [&>*]:break-inside-avoid" stagger={0.07}>
              {REVIEWS.map((r, i) => (
                <StaggerItem key={r.id} as="article" className={cn("rounded-[6px] p-6 ring-1 sm:p-7", i % 4 === 0 ? "bg-forest text-ivory ring-ivory/10" : "bg-cream text-charcoal ring-charcoal/8")}>
                  <div className={cn("flex gap-0.5", i % 4 === 0 ? "text-brass-2" : "text-brass")}>
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} className="h-3.5 w-3.5 fill-current" strokeWidth={1} />
                    ))}
                  </div>
                  <blockquote className={cn("mt-5 whitespace-pre-line font-display leading-snug", r.text.length < 60 ? "text-[2rem]" : r.text.length < 200 ? "text-[1.45rem]" : "text-[1.15rem]")}>
                    “{r.text}”
                  </blockquote>
                  <footer className={cn("mt-6 flex items-center justify-between font-sans text-[0.75rem] tracking-[0.1em]", i % 4 === 0 ? "text-ivory/60" : "text-stone")}>
                    <span className={cn("font-semibold", i % 4 === 0 ? "text-ivory" : "text-charcoal")}>
                      {r.name}
                      {r.from ? `, ${r.from}` : ""}
                    </span>
                    <span>{r.date}</span>
                  </footer>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      <section className="bg-cream py-20 sm:py-24">
        <div className="container-x flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader eyebrow="Stayed with us?" title="We'd love to hear how it went." size="md" />
          <Button href={SITE.feedbackLink} variant="primary">
            Share your feedback
          </Button>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
