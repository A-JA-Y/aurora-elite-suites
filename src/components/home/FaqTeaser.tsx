"use client";

import { FAQ_TEASER_IDS, faq } from "@/data/faqs";
import { HOME } from "@/data/home";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/SectionHeader";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { useUI } from "@/components/layout/Providers";

export function FaqTeaser() {
  const { openAssistant } = useUI();
  const items = FAQ_TEASER_IDS.map((id) => {
    const f = faq(id);
    return { id: f.id, title: f.q, content: f.a };
  });
  return (
    <section className="container-x py-24 sm:py-32">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Eyebrow>Good to know</Eyebrow>
          <SplitHeading as="h2" className="display-lg mt-5 max-w-[12ch] text-charcoal">
            Questions, answered
          </SplitHeading>
          <Reveal delay={0.15}>
            <p className="lede mt-6 max-w-[40ch]">Check-in, the pool, pets, distances. If it&apos;s not here, ask Aurora or message the team.</p>
          </Reveal>
          <Reveal delay={0.2} className="mt-8 flex flex-wrap gap-3">
            <Button href={HOME.faq.link.href} variant="secondary">
              {HOME.faq.link.label}
            </Button>
            <Button variant="ghost" onClick={() => openAssistant()} icon={null}>
              Ask Aurora ✦
            </Button>
          </Reveal>
        </div>
        <div className="lg:col-span-7">
          <Reveal>
            <Accordion items={items} defaultOpen={items[0].id} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
