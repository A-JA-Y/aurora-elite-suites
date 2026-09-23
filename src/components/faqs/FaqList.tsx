"use client";

import { MessageCircle, Sparkles } from "lucide-react";
import { FAQ_GROUPS } from "@/data/faqs";
import { SITE } from "@/data/site";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionNav } from "@/components/ui/SectionNav";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { useUI } from "@/components/layout/Providers";

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");

export function FaqList() {
  const { openAssistant } = useUI();
  return (
    <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
      <div className="hidden lg:col-span-3 lg:block">
        <SectionNav items={FAQ_GROUPS.map((g) => ({ id: slug(g.title), label: g.title }))} />
        <div className="sticky top-[22rem] mt-12 rounded-[6px] bg-forest p-6 text-ivory grain">
          <p className="eyebrow text-brass">Still stuck?</p>
          <p className="mt-3 font-display text-[1.4rem] leading-tight">Ask Aurora, or message the team.</p>
          <div className="mt-5 flex flex-col gap-2.5">
            <Button variant="brass" size="sm" onClick={() => openAssistant()} icon={<Sparkles className="h-4 w-4" strokeWidth={1.75} />}>
              Ask Aurora
            </Button>
            <Button href={SITE.whatsappPrefilled} variant="outline-light" size="sm" icon={<MessageCircle className="h-4 w-4" strokeWidth={1.75} />}>
              WhatsApp us
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-16 lg:col-span-9">
        {FAQ_GROUPS.map((g) => (
          <section key={g.title} id={slug(g.title)} className="scroll-mt-32">
            <SplitHeading as="h2" className="display-sm text-oak">
              {g.title}
            </SplitHeading>
            <Reveal className="mt-4">
              <Accordion items={g.items.map((f) => ({ id: f.id, title: f.q, content: f.a }))} />
            </Reveal>
          </section>
        ))}
        <Reveal className="rounded-[6px] bg-cream p-7 ring-1 ring-charcoal/8 lg:hidden">
          <p className="eyebrow">Still stuck?</p>
          <p className="mt-3 font-display text-[1.5rem] leading-tight text-charcoal">Ask Aurora, or message the team.</p>
          <div className="mt-5 flex flex-wrap gap-2.5">
            <Button size="sm" onClick={() => openAssistant()} icon={<Sparkles className="h-4 w-4" strokeWidth={1.75} />}>
              Ask Aurora
            </Button>
            <Button href={SITE.whatsappPrefilled} variant="secondary" size="sm" icon={<MessageCircle className="h-4 w-4" strokeWidth={1.75} />}>
              WhatsApp us
            </Button>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
