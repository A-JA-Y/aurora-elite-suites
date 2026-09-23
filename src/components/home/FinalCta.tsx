import { Mail, MessageCircle } from "lucide-react";
import { HOME } from "@/data/home";
import { img } from "@/data/images";
import { SITE } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/SectionHeader";
import { SplitHeading } from "@/components/ui/SplitHeading";

interface FinalCtaProps {
  heading?: string;
  body?: string;
  imageId?: string;
  eyebrow?: string;
}

export function FinalCta({ heading = HOME.cta.heading, body = HOME.cta.body, imageId = HOME.cta.imageId, eyebrow = "Book your stay" }: FinalCtaProps) {
  return (
    <section className="relative overflow-hidden bg-forest text-ivory">
      <ParallaxImage image={img(imageId)} className="absolute inset-0" speed={0.2} scale={1.22} reveal={false} sizes="100vw">
        <div className="absolute inset-0 bg-forest/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-forest via-transparent to-forest/40" />
      </ParallaxImage>
      <div className="container-x relative z-10 flex min-h-[80svh] flex-col items-center justify-center py-28 text-center">
        <Eyebrow tone="dark">{eyebrow}</Eyebrow>
        <SplitHeading as="h2" className="display-2xl mt-6 text-ivory">
          {heading}
        </SplitHeading>
        <Reveal delay={0.2}>
          <p className="mx-auto mt-8 max-w-[52ch] text-[1.0625rem] leading-relaxed text-ivory/80 sm:text-lg">{body}</p>
        </Reveal>
        <Reveal delay={0.3} className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Button href={SITE.whatsappPrefilled} variant="light" size="lg" icon={<MessageCircle className="h-4 w-4" strokeWidth={1.75} />}>
            WhatsApp {SITE.phoneDisplay}
          </Button>
          <Button href={SITE.emailLink} variant="outline-light" size="lg" icon={<Mail className="h-4 w-4" strokeWidth={1.75} />}>
            Email Us
          </Button>
        </Reveal>
        <Reveal delay={0.4} variant="fade">
          <p className="mt-8 font-sans text-[0.75rem] tracking-[0.12em] text-ivory/55">Usually replies within the hour · {SITE.email}</p>
        </Reveal>
      </div>
    </section>
  );
}
