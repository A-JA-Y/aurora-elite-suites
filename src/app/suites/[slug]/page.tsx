import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, BedDouble, Check, Eye, Info } from "lucide-react";
import { ELEGANT_IMAGES, GOLF_VIEW_IMAGES, img, imgs } from "@/data/images";
import { absoluteUrl } from "@/data/site";
import { SUITES, suiteBySlug } from "@/data/suites";
import { breadcrumbSchema } from "@/lib/schema";
import { JsonLd } from "@/components/ui/JsonLd";
import { Button } from "@/components/ui/Button";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Eyebrow, SectionHeader } from "@/components/ui/SectionHeader";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { FinalCta } from "@/components/home/FinalCta";
import { SuiteGallery } from "@/components/suites/SuiteGallery";
import { RatingBox } from "@/components/suites/RatingBox";
import { BookingBox } from "@/components/suites/BookingBox";
import { RoomByRoom } from "@/components/suites/RoomByRoom";
import { PhotoMosaic } from "@/components/suites/PhotoMosaic";
import { SuiteCards } from "@/components/suites/SuiteCards";
import { SuiteIntro } from "@/components/suites/SuiteIntro";

export const dynamicParams = false;

export function generateStaticParams() {
  return SUITES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const suite = suiteBySlug(slug);
  if (!suite) return {};
  const hero = img(suite.heroImageIds[0]);
  return {
    title: { absolute: suite.seo.title },
    description: suite.seo.description,
    alternates: { canonical: absoluteUrl(`/suites/${suite.slug}`) },
    openGraph: { title: suite.seo.title, description: suite.seo.description, images: [{ url: hero.src, alt: hero.alt }] },
  };
}

export default async function SuitePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const suite = suiteBySlug(slug);
  if (!suite) notFound();

  const all = suite.key === "golfView" ? GOLF_VIEW_IMAGES : ELEGANT_IMAGES;
  const hero = imgs(...suite.heroImageIds);
  const other = SUITES.find((s) => s.slug !== suite.slug)!;

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Our Suites", path: "/suites" },
          { name: suite.name, path: `/suites/${suite.slug}` },
        ])}
      />

      <SuiteIntro suite={suite} />

      <section className="container-x">
        <SuiteGallery hero={hero} all={all} />
      </section>

      <section className="container-x py-20 sm:py-28">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7 xl:col-span-8">
            <Eyebrow>About this suite</Eyebrow>
            <SplitHeading as="h2" className="display-md mt-4 max-w-[20ch] text-charcoal">
              {suite.subheading}
            </SplitHeading>
            <div className="mt-8 flex flex-col gap-6">
              {suite.about.map((p, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <p className="lede max-w-[66ch] text-charcoal/85">{p}</p>
                </Reveal>
              ))}
            </div>

            {suite.rating && (
              <Reveal className="mt-12">
                <RatingBox />
              </Reveal>
            )}

            {/* Sleeping */}
            <div className="mt-16">
              <Eyebrow>Where you&apos;ll sleep</Eyebrow>
              <Stagger className={`mt-6 grid gap-4 ${suite.sleeping.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"}`} stagger={0.08}>
                {suite.sleeping.map((s) => (
                  <StaggerItem key={s.room} className="rounded-[6px] bg-cream p-6 ring-1 ring-charcoal/8">
                    <BedDouble className="h-6 w-6 text-fairway" strokeWidth={1.4} />
                    <p className="mt-5 font-display text-[1.4rem] text-charcoal">{s.room}</p>
                    <p className="mt-1 font-sans text-[0.875rem] text-stone">{s.beds}</p>
                  </StaggerItem>
                ))}
              </Stagger>
              {suite.views && (
                <Reveal className="mt-6 flex flex-wrap items-center gap-2">
                  <span className="mr-2 inline-flex items-center gap-1.5 font-sans text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-oak">
                    <Eye className="h-4 w-4" strokeWidth={1.6} /> Views
                  </span>
                  {suite.views.map((v) => (
                    <span key={v} className="rounded-full bg-sand px-3 py-1.5 font-sans text-[0.8125rem] text-charcoal">
                      {v}
                    </span>
                  ))}
                </Reveal>
              )}
            </div>
          </div>

          <div className="lg:col-span-5 xl:col-span-4">
            <div className="lg:sticky lg:top-28">
              <Reveal delay={0.1}>
                <BookingBox suite={suite} />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {suite.rooms ? (
        <section className="bg-cream py-24 sm:py-32">
          <div className="container-x">
            <RoomByRoom rooms={suite.rooms} />
          </div>
        </section>
      ) : (
        <section className="bg-cream py-24 sm:py-32">
          <div className="container-x">
            <SectionHeader eyebrow="Photos" title="Inside the Elegant Suite" lede="Eleven photos of the living room, kitchen, both bedrooms and bathrooms." />
            <div className="mt-14">
              <PhotoMosaic images={imgs(...suite.photoIds)} />
            </div>
          </div>
        </section>
      )}

      {/* Included */}
      <section className="container-x py-24 sm:py-32">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <SectionHeader eyebrow="What's included" title="Everything, already here" size="md" />
              {suite.notAvailable && (
                <Reveal className="mt-8 flex items-start gap-3 rounded-[6px] bg-sand p-4 font-sans text-[0.875rem] text-stone">
                  <Info className="mt-0.5 h-4 w-4 shrink-0 text-oak" strokeWidth={1.6} />
                  <span>
                    <span className="font-semibold text-charcoal">Not available: </span>
                    {suite.notAvailable}
                  </span>
                </Reveal>
              )}
            </div>
          </div>
          <div className="lg:col-span-8">
            <Stagger as="ul" className="divide-y divide-charcoal/10" stagger={0.05}>
              {suite.included.map((g) => (
                <StaggerItem key={g.label} as="li" className="grid gap-2 py-5 sm:grid-cols-[10rem_1fr] sm:gap-8">
                  <span className="font-sans text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-oak sm:pt-1">{g.label}</span>
                  <span className="text-[1rem] leading-relaxed text-charcoal">{g.text}</span>
                </StaggerItem>
              ))}
            </Stagger>

            <div className="mt-14">
              <Eyebrow>Good to know</Eyebrow>
              <Stagger as="ul" className="mt-5 flex flex-wrap gap-2.5" stagger={0.04}>
                {suite.goodToKnow.map((g) => (
                  <StaggerItem key={g} as="li" variant="scale" className="inline-flex items-center gap-2 rounded-full bg-cream px-3.5 py-2 font-sans text-[0.8125rem] text-charcoal ring-1 ring-charcoal/8">
                    <Check className="h-3.5 w-3.5 text-fairway" strokeWidth={2} /> {g}
                  </StaggerItem>
                ))}
              </Stagger>
              <Reveal className="mt-6">
                <Link href="/house-rules" className="group inline-flex items-center gap-1.5 font-sans text-[0.875rem] font-medium text-fairway" data-cursor="link">
                  <span className="link-underline">Full house rules and policies</span>
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.5} />
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Other suite */}
      <section className="bg-sand py-24 sm:py-28">
        <div className="container-x">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeader eyebrow="Also at Godrej Golf Links" title={`Or stay in ${other.name}`} size="md" />
            <Button href="/suites" variant="secondary">
              Compare both suites
            </Button>
          </div>
          <div className="mt-12 lg:max-w-4xl">
            <SuiteCards exclude={suite.slug} />
          </div>
        </div>
      </section>

      <FinalCta heading={suite.booking.heading} body={suite.booking.body} imageId={suite.key === "golfView" ? "GV-VIEW-09" : "ES-10"} eyebrow={suite.name} />
    </>
  );
}
