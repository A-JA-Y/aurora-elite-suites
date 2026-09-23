import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { FOOTER_EXPLORE, FOOTER_LEGAL, SITE } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { FooterWordmark } from "./FooterWordmark";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-forest text-ivory grain">
      <div className="container-x relative z-10 pt-20 pb-10 sm:pt-24">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr] lg:gap-10">
          <Reveal>
            <div className="flex flex-col gap-6">
              <div>
                <p className="font-display text-[1.6rem] font-semibold tracking-[0.2em]">AURORA</p>
                <p className="mt-1 font-sans text-[0.6rem] font-semibold uppercase tracking-[0.4em] text-brass">Elite Suites</p>
              </div>
              <p className="max-w-[36ch] text-[0.9375rem] leading-relaxed text-ivory/70">{SITE.footerBlurb}</p>
              <div className="flex items-center gap-2 text-[0.8125rem] text-ivory/60">
                <span className="text-brass">★ 5.0</span>
                <span>on Airbnb · Guest Favourite</span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="eyebrow mb-5 text-brass">Explore</p>
            <ul className="flex flex-col gap-2.5 text-[0.9375rem]">
              {FOOTER_EXPLORE.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="link-underline text-ivory/80 hover:text-ivory" data-cursor="link">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="eyebrow mb-5 text-brass">Contact</p>
            <ul className="flex flex-col gap-3 text-[0.9375rem]">
              <li>
                <a href={SITE.phoneTel} className="inline-flex items-center gap-2.5 text-ivory/80 hover:text-ivory" data-cursor="link">
                  <Phone className="h-4 w-4 text-brass" strokeWidth={1.5} /> {SITE.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={SITE.whatsappPrefilled} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 text-ivory/80 hover:text-ivory" data-cursor="link">
                  <MessageCircle className="h-4 w-4 text-brass" strokeWidth={1.5} /> WhatsApp
                </a>
              </li>
              <li>
                <a href={SITE.emailLink} className="inline-flex items-center gap-2.5 break-all text-ivory/80 hover:text-ivory" data-cursor="link">
                  <Mail className="h-4 w-4 shrink-0 text-brass" strokeWidth={1.5} /> {SITE.email}
                </a>
              </li>
              <li>
                <a href={SITE.maps.search} target="_blank" rel="noopener noreferrer" className="inline-flex items-start gap-2.5 text-ivory/80 hover:text-ivory" data-cursor="link">
                  <MapPin className="mt-1 h-4 w-4 shrink-0 text-brass" strokeWidth={1.5} />
                  <span className="leading-relaxed">{SITE.address.oneLine}</span>
                </a>
              </li>
            </ul>
          </Reveal>

          <Reveal delay={0.24}>
            <p className="eyebrow mb-5 text-brass">Book your stay</p>
            <div className="flex flex-col items-start gap-4">
              <Button href="/contact" variant="brass" size="md">
                Check Availability
              </Button>
              <p className="text-[0.8125rem] text-ivory/55">Book on Airbnb</p>
              <div className="flex flex-col gap-2 text-[0.9375rem]">
                <a href={SITE.airbnb.golfView} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-1.5 text-ivory/80 hover:text-ivory" data-cursor="link">
                  Golf View Suite <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.5} />
                </a>
                <a href={SITE.airbnb.elegant} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-1.5 text-ivory/80 hover:text-ivory" data-cursor="link">
                  Elegant Suite <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.5} />
                </a>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t hairline-light pt-6 text-[0.8125rem] text-ivory/55 sm:mt-20 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Aurora Elite Suites. All rights reserved.</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {FOOTER_LEGAL.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="link-underline hover:text-ivory" data-cursor="link">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-4 max-w-[90ch] text-[0.75rem] leading-relaxed text-ivory/40">{SITE.disclaimer}</p>
      </div>

      <FooterWordmark />
    </footer>
  );
}
