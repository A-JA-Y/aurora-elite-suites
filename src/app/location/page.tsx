import type { Metadata } from "next";
import { Navigation } from "lucide-react";
import { img, imgs } from "@/data/images";
import { GETTING_HERE, LOCATION_PAGE, NEARBY } from "@/data/location";
import { SITE, absoluteUrl } from "@/data/site";
import { breadcrumbSchema } from "@/lib/schema";
import { cn, pad2 } from "@/lib/utils";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Eyebrow, SectionHeader } from "@/components/ui/SectionHeader";
import { SmartImage } from "@/components/ui/SmartImage";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { DistanceList } from "@/components/location/DistanceList";
import { MapEmbed } from "@/components/location/MapEmbed";
import { FinalCta } from "@/components/home/FinalCta";

export const metadata: Metadata = {
  title: { absolute: LOCATION_PAGE.seo.title },
  description: LOCATION_PAGE.seo.description,
  alternates: { canonical: absoluteUrl("/location") },
};

export default function LocationPage() {
  const around = NEARBY.filter((n) => !n.dayTrip);
  const trips = NEARBY.filter((n) => n.dayTrip);
  const [introA, introB] = imgs(...LOCATION_PAGE.introImageIds);

  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Location", path: "/location" }])} />
      <PageHero image={img(LOCATION_PAGE.bannerImageId)} eyebrow={LOCATION_PAGE.subheading} title={LOCATION_PAGE.h1} size="lg">
        <Button href={SITE.maps.directions} variant="light" icon={<Navigation className="h-4 w-4" strokeWidth={1.75} />}>
          Get directions
        </Button>
      </PageHero>

      {/* Intro */}
      <section className="container-x py-24 sm:py-32">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <Eyebrow>Godrej Golf Links</Eyebrow>
            <SplitHeading as="h2" className="display-lg mt-5 max-w-[14ch] text-charcoal">
              Green in almost every direction
            </SplitHeading>
            <Reveal delay={0.15}>
              <p className="lede mt-7 max-w-[58ch]">{LOCATION_PAGE.intro}</p>
            </Reveal>
          </div>
          <div className="grid grid-cols-12 gap-4 lg:col-span-6">
            <ParallaxImage image={introA} className="col-span-7 aspect-[3/4] rounded-[6px]" sizes="(max-width: 1024px) 60vw, 30vw" speed={0.12} />
            <ParallaxImage image={introB} className="col-span-5 mt-16 aspect-[3/4] rounded-[6px]" sizes="(max-width: 1024px) 40vw, 20vw" speed={0.18} />
          </div>
        </div>
      </section>

      {/* Distances */}
      <section className="bg-cream py-24 sm:py-32">
        <div className="container-x">
          <SectionHeader eyebrow="How far is everything?" title="Minutes, not hours" lede="Approximate road distances from the suites and the usual drive time in normal traffic." />
          <div className="mt-12">
            <DistanceList />
          </div>
        </div>
      </section>

      {/* Getting here */}
      <section className="container-x py-24 sm:py-32">
        <SectionHeader eyebrow="Getting here and around" title="Metro, expressway, or straight from the airport" size="md" />
        <Stagger className="mt-14 grid gap-8 md:grid-cols-3" stagger={0.1}>
          {GETTING_HERE.map((g) => {
            const image = img(g.imageId);
            return (
              <StaggerItem key={g.mode} as="article" className="group flex flex-col">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[6px]">
                  <SmartImage image={image} sizes="(max-width: 768px) 100vw, 33vw" className="absolute inset-0" hoverZoom />
                  {image.credit && <span className="absolute bottom-2 right-2 max-w-[90%] truncate rounded-full bg-ink/50 px-2 py-0.5 font-sans text-[0.55rem] text-ivory/80 backdrop-blur">{image.credit}</span>}
                </div>
                <h3 className="mt-6 font-display text-[1.75rem] text-charcoal">{g.mode}</h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-stone">{g.text}</p>
              </StaggerItem>
            );
          })}
        </Stagger>
      </section>

      {/* Around Greater Noida */}
      <section className="bg-sand py-24 sm:py-32">
        <div className="container-x">
          <SectionHeader eyebrow="Around Greater Noida" title="Worth stepping out for" />
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {around.map((n, i) => <PlaceCard key={n.id} place={n} index={i} wide={i === 0} />)}
          </div>
        </div>
      </section>

      {/* Day trips */}
      <section className="container-x py-24 sm:py-32">
        <SectionHeader eyebrow="Day trips" title="Down the Yamuna Expressway" lede="Leave after breakfast, be back for dinner." />
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {trips.map((n, i) => <PlaceCard key={n.id} place={n} index={i} tall />)}
        </div>
      </section>

      {/* Map */}
      <section className="bg-cream py-24 sm:py-32">
        <div className="container-x">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeader eyebrow="Find us" title="Godrej Golf Links, Sector 27" size="md" lede={LOCATION_PAGE.mapNote} />
            <Button href={SITE.maps.directions} icon={<Navigation className="h-4 w-4" strokeWidth={1.75} />}>
              Get directions
            </Button>
          </div>
          <Reveal className="mt-12">
            <MapEmbed />
          </Reveal>
        </div>
      </section>

      <FinalCta />
    </>
  );
}

function PlaceCard({ place, index, wide = false, tall = false }: { place: (typeof NEARBY)[number]; index: number; wide?: boolean; tall?: boolean }) {
  const images = imgs(...place.imageIds);
  const [lead, ...rest] = images;
  return (
    <Reveal delay={(index % 2) * 0.08} as="article" className={cn("group flex flex-col overflow-hidden rounded-[6px] bg-ivory ring-1 ring-charcoal/8", wide && "md:col-span-2")}>
      <div className={cn("grid gap-1", rest.length > 0 && !tall ? "grid-cols-3" : "grid-cols-1")}>
        <div className={cn("relative overflow-hidden", rest.length > 0 && !tall ? "col-span-2 aspect-[4/3] sm:aspect-[16/9]" : tall ? "aspect-[4/5] sm:aspect-[4/4.4]" : wide ? "aspect-[16/9] md:aspect-[21/9]" : "aspect-[4/3]")}>
          <SmartImage image={lead} sizes={wide ? "100vw" : "(max-width: 768px) 100vw, 50vw"} className="absolute inset-0" hoverZoom />
        </div>
        {rest.length > 0 && !tall && (
          <div className="grid grid-rows-2 gap-1">
            {rest.slice(0, 2).map((im) => (
              <div key={im.id} className="relative overflow-hidden">
                <SmartImage image={im} sizes="20vw" className="absolute inset-0" />
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="flex items-baseline justify-between gap-4">
          <p className="eyebrow">{pad2(index + 1)}</p>
          <p className="font-sans text-[0.75rem] font-semibold tracking-[0.06em] text-fairway">{place.distance}</p>
        </div>
        <h3 className="mt-3 font-display text-[1.75rem] leading-tight text-charcoal">{place.title}</h3>
        <p className="mt-3 max-w-[56ch] text-[0.9375rem] leading-relaxed text-stone">{place.text}</p>
        {images.some((i) => i.credit) && (
          <p className="mt-4 font-sans text-[0.62rem] leading-relaxed text-stone/70">
            {images.filter((i) => i.credit).map((i) => i.credit).join(" · ")}
          </p>
        )}
      </div>
    </Reveal>
  );
}
