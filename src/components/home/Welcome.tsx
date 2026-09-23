import { HOME } from "@/data/home";
import { img } from "@/data/images";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/SectionHeader";
import { SplitHeading } from "@/components/ui/SplitHeading";

export function Welcome() {
  return (
    <section className="container-x py-24 sm:py-32">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <Reveal variant="fade">
              <Eyebrow>Welcome</Eyebrow>
            </Reveal>
            <SplitHeading as="h2" className="display-lg mt-5 max-w-[14ch] text-charcoal">
              {HOME.welcome.heading}
            </SplitHeading>
            <Reveal delay={0.2}>
              <p className="mt-8 font-display text-[1.35rem] italic text-oak">— {HOME.welcome.signoff}</p>
            </Reveal>
          </div>
        </div>
        <div className="lg:col-span-7">
          <div className="flex flex-col gap-7">
            {HOME.welcome.body.map((p, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <p className="lede max-w-[62ch] text-charcoal/80">{p}</p>
              </Reveal>
            ))}
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-12">
            <ParallaxImage image={img(HOME.welcome.imageId)} className="aspect-[4/3] rounded-[6px] sm:col-span-9" sizes="(max-width: 1024px) 100vw, 55vw" />
            <div className="hidden sm:col-span-3 sm:flex sm:flex-col sm:justify-end">
              <Reveal delay={0.2}>
                <p className="font-sans text-[0.75rem] leading-relaxed tracking-[0.06em] text-stone">
                  {img(HOME.welcome.imageId).alt}
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
