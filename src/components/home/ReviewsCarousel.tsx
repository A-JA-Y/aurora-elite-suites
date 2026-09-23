import { Star } from "lucide-react";
import { HOME } from "@/data/home";
import { RATING, REVIEW_HIGHLIGHTS } from "@/data/reviews";
import { SITE } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { Marquee } from "@/components/ui/Marquee";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/SectionHeader";
import { SplitHeading } from "@/components/ui/SplitHeading";

export function ReviewsCarousel() {
  return (
    <section className="overflow-hidden bg-cream py-24 sm:py-32">
      <div className="container-x flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <Eyebrow>Reviews</Eyebrow>
          <SplitHeading as="h2" className="display-lg mt-5 max-w-[14ch] text-charcoal">
            {HOME.reviews.heading}
          </SplitHeading>
        </div>
        <Reveal className="flex items-end gap-6">
          <div>
            <p className="font-display text-[5rem] leading-none tracking-[-0.04em] text-fairway sm:text-[6.5rem]">{RATING.overall}</p>
          </div>
          <div className="pb-2">
            <div className="flex gap-0.5 text-brass">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" strokeWidth={1} />
              ))}
            </div>
            <p className="mt-2 font-sans text-[0.8125rem] text-stone">
              {RATING.count} Airbnb reviews · {RATING.fiveStarShare}% five-star
            </p>
            <p className="font-sans text-[0.8125rem] font-semibold text-oak">{RATING.badge}</p>
          </div>
        </Reveal>
      </div>

      <Reveal variant="fade" className="mt-16">
        <Marquee duration={70} gap="gap-5">
          {REVIEW_HIGHLIGHTS.map((r) => (
            <figure key={r.name + r.date} className="flex w-[min(84vw,26rem)] shrink-0 flex-col justify-between gap-6 rounded-[6px] bg-ivory p-7 ring-1 ring-charcoal/8">
              <blockquote className="font-display text-[1.35rem] leading-snug text-charcoal">“{r.text}”</blockquote>
              <figcaption className="flex items-center justify-between font-sans text-[0.75rem] tracking-[0.1em] text-stone">
                <span className="font-semibold text-charcoal">
                  {r.name}
                  {r.from ? `, ${r.from}` : ""}
                </span>
                <span>{r.date}</span>
              </figcaption>
            </figure>
          ))}
        </Marquee>
      </Reveal>

      <div className="container-x mt-10 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <p className="font-sans text-[0.8125rem] text-stone">{HOME.reviews.note}</p>
        <div className="flex flex-wrap gap-3">
          <Button href={HOME.reviews.link.href} variant="secondary">
            {HOME.reviews.link.label}
          </Button>
          <Button href={SITE.airbnb.golfView} variant="ghost" icon="external">
            See them on Airbnb
          </Button>
        </div>
      </div>
    </section>
  );
}
