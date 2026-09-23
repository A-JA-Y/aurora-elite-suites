import { HOME } from "@/data/home";
import { img } from "@/data/images";
import { DISTANCE_CHIPS } from "@/data/location";
import { Button } from "@/components/ui/Button";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/SectionHeader";
import { SplitHeading } from "@/components/ui/SplitHeading";

export function LocationTeaser() {
  return (
    <section className="container-x py-24 sm:py-32">
      <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <ParallaxImage image={img(HOME.location.imageId)} className="aspect-[3/4] rounded-[6px]" sizes="(max-width: 1024px) 100vw, 40vw" speed={0.16} />
        </div>
        <div className="lg:col-span-7">
          <Eyebrow>Location</Eyebrow>
          <SplitHeading as="h2" className="display-lg mt-5 max-w-[14ch] text-charcoal">
            {HOME.location.heading}
          </SplitHeading>
          <Reveal delay={0.15}>
            <p className="lede mt-7 max-w-[58ch]">{HOME.location.body}</p>
          </Reveal>
          <Stagger as="ul" className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-[6px] bg-charcoal/10 sm:grid-cols-3" stagger={0.06}>
            {DISTANCE_CHIPS.map((c) => (
              <StaggerItem key={c.label} as="li" className="flex flex-col gap-1 bg-ivory px-5 py-5">
                <span className="font-display text-[1.9rem] leading-none text-fairway">{c.value}</span>
                <span className="font-sans text-[0.75rem] leading-snug text-stone">{c.label}</span>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal delay={0.2} className="mt-10">
            <Button href={HOME.location.button.href}>{HOME.location.button.label}</Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
