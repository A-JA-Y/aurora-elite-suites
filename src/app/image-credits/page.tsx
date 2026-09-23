import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { IMAGE_CREDITS_PAGE } from "@/data/legal";
import { LANDMARK_IMAGES } from "@/data/images";
import { absoluteUrl } from "@/data/site";
import { PageIntro } from "@/components/layout/PageHero";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";

export const metadata: Metadata = {
  title: { absolute: IMAGE_CREDITS_PAGE.seo.title },
  description: IMAGE_CREDITS_PAGE.seo.description,
  alternates: { canonical: absoluteUrl("/image-credits") },
};

export default function ImageCreditsPage() {
  return (
    <>
      <PageIntro eyebrow="Licences and attribution" title={IMAGE_CREDITS_PAGE.h1} lede={IMAGE_CREDITS_PAGE.intro} />
      <section className="container-x pb-24 sm:pb-32">
        <Reveal>
          <h2 className="font-display text-[1.6rem] text-charcoal">Our photos</h2>
          <p className="mt-2 max-w-[70ch] text-[1rem] leading-relaxed text-charcoal/80">{IMAGE_CREDITS_PAGE.ownPhotos}</p>
        </Reveal>
        <Reveal className="mt-14">
          <h2 className="font-display text-[1.6rem] text-charcoal">Landmark photos</h2>
          <p className="mt-2 max-w-[70ch] text-[1rem] leading-relaxed text-charcoal/80">Used under Creative Commons licences from Wikimedia Commons. Edited versions carry the same licence.</p>
        </Reveal>
        <Stagger as="ul" className="mt-8 divide-y divide-charcoal/10" stagger={0.03}>
          {LANDMARK_IMAGES.map((im) => (
            <StaggerItem key={im.id} as="li" className="grid gap-4 py-5 sm:grid-cols-[6rem_1fr] sm:gap-6">
              <div className="relative aspect-[4/3] w-24 overflow-hidden rounded-[4px]">
                <SmartImage image={im} sizes="96px" className="absolute inset-0" />
              </div>
              <div className="min-w-0">
                <p className="font-sans text-[0.7rem] tracking-[0.18em] text-oak">{im.id}</p>
                <p className="mt-1 font-display text-[1.2rem] leading-snug text-charcoal">{im.alt}</p>
                <p className="mt-1.5 font-sans text-[0.875rem] text-stone">{im.credit}</p>
                <div className="mt-2 flex flex-wrap gap-4 font-sans text-[0.8125rem]">
                  {im.licence && (
                    <a href={im.licence} target="_blank" rel="noopener noreferrer license" className="inline-flex items-center gap-1 text-fairway underline-offset-2 hover:underline" data-cursor="link">
                      Licence <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                    </a>
                  )}
                  {im.source && (
                    <a href={im.source} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-fairway underline-offset-2 hover:underline" data-cursor="link">
                      Source <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                    </a>
                  )}
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>
    </>
  );
}
