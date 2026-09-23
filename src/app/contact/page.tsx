import type { Metadata } from "next";
import { Suspense } from "react";
import { ArrowUpRight, Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { CONTACT_PAGE } from "@/data/legal";
import { img } from "@/data/images";
import { SITE, absoluteUrl } from "@/data/site";
import { breadcrumbSchema } from "@/lib/schema";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/SectionHeader";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { EnquiryForm } from "@/components/contact/EnquiryForm";
import { MapEmbed } from "@/components/location/MapEmbed";

export const metadata: Metadata = {
  title: { absolute: CONTACT_PAGE.seo.title },
  description: CONTACT_PAGE.seo.description,
  alternates: { canonical: absoluteUrl("/contact") },
};

const cards = [
  { icon: MessageCircle, label: "WhatsApp", value: SITE.phoneDisplay, hint: "Fastest way to reach us", href: SITE.whatsappPrefilled },
  { icon: Phone, label: "Call", value: SITE.phoneDisplay, hint: "Tap to call", href: SITE.phoneTel },
  { icon: Mail, label: "Email", value: SITE.email, hint: "For longer questions", href: SITE.emailLink },
  { icon: MapPin, label: "Address", value: "Suites Tower 1, Godrej Golf Links", hint: "Sector 27, Greater Noida, UP 201515", href: SITE.maps.search },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Contact & Booking", path: "/contact" }])} />
      <PageHero image={img(CONTACT_PAGE.bannerImageId)} eyebrow="Usually replies within the hour" title={CONTACT_PAGE.h1} subtitle={CONTACT_PAGE.intro} />

      <section className="container-x py-20 sm:py-28">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Eyebrow>Talk to us</Eyebrow>
              <SplitHeading as="h2" className="display-md mt-4 max-w-[14ch] text-charcoal">
                Send your dates, we&apos;ll send today&apos;s rate
              </SplitHeading>
              <Stagger as="ul" className="mt-10 flex flex-col divide-y divide-charcoal/10" stagger={0.08}>
                {cards.map((c) => {
                  const Icon = c.icon;
                  return (
                    <StaggerItem key={c.label} as="li">
                      <a href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="group flex items-center gap-5 py-5" data-cursor="link">
                        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-sand text-fairway transition-colors group-hover:bg-fairway group-hover:text-ivory">
                          <Icon className="h-5 w-5" strokeWidth={1.5} />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block font-sans text-[0.7rem] uppercase tracking-[0.18em] text-oak">{c.label}</span>
                          <span className="mt-0.5 block truncate font-display text-[1.3rem] leading-tight text-charcoal">{c.value}</span>
                          <span className="block font-sans text-[0.8125rem] text-stone">{c.hint}</span>
                        </span>
                        <ArrowUpRight className="h-4 w-4 shrink-0 text-stone transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.5} />
                      </a>
                    </StaggerItem>
                  );
                })}
              </Stagger>
              <Reveal className="mt-8 flex items-start gap-3 rounded-[6px] bg-cream p-5 ring-1 ring-charcoal/8">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-oak" strokeWidth={1.6} />
                <p className="font-sans text-[0.875rem] leading-relaxed text-charcoal/80">
                  <span className="font-semibold text-charcoal">Prefer Airbnb?</span> Book the{" "}
                  <a href={SITE.airbnb.golfView} target="_blank" rel="noopener noreferrer" className="text-fairway underline-offset-2 hover:underline">
                    Golf View Suite
                  </a>{" "}
                  or the{" "}
                  <a href={SITE.airbnb.elegant} target="_blank" rel="noopener noreferrer" className="text-fairway underline-offset-2 hover:underline">
                    Elegant Suite
                  </a>{" "}
                  there instead.
                </p>
              </Reveal>
            </div>
          </div>
          <div className="lg:col-span-7">
            <Reveal delay={0.1}>
              <Suspense fallback={<div className="h-[640px] rounded-[6px] bg-cream" />}>
                <EnquiryForm />
              </Suspense>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-cream py-20 sm:py-28">
        <div className="container-x">
          <Eyebrow>Find us</Eyebrow>
          <p className="mt-3 max-w-[60ch] font-display text-[1.6rem] leading-tight text-charcoal">{SITE.address.oneLine}</p>
          <Reveal className="mt-8">
            <MapEmbed />
          </Reveal>
        </div>
      </section>
    </>
  );
}
