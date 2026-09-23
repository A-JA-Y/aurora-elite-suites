import { HOME } from "@/data/home";
import { img } from "@/data/images";
import { pad2 } from "@/lib/utils";
import { SmartImage } from "@/components/ui/SmartImage";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";

export function WhyUs() {
  return (
    <section className="bg-cream py-24 sm:py-32">
      <div className="container-x">
        <SectionHeader eyebrow="Why guests choose us" title="Set up the way we'd want a place to be" lede="Real things, not big adjectives: the balcony, the king bed, the chimney in the kitchen." />
        <Stagger className="mt-16 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3" stagger={0.1}>
          {HOME.why.cards.map((c, i) => {
            const image = img(c.imageId);
            return (
              <StaggerItem key={c.title} as="article" className="group flex flex-col">
                <div className={`relative overflow-hidden rounded-[6px] ${image.orientation === "P" ? "aspect-[4/5]" : "aspect-[4/3]"} ${i % 3 === 1 ? "lg:mt-10" : ""}`} data-cursor="view">
                  <SmartImage image={image} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="absolute inset-0" hoverZoom />
                  <span className="absolute left-4 top-4 rounded-full bg-ivory/85 px-2.5 py-1 font-sans text-[0.65rem] font-semibold tracking-[0.2em] text-charcoal backdrop-blur">
                    {pad2(i + 1)}
                  </span>
                </div>
                <h3 className="mt-6 font-display text-[1.75rem] leading-tight text-charcoal">{c.title}</h3>
                <p className="mt-3 max-w-[40ch] text-[0.9375rem] leading-relaxed text-stone">{c.text}</p>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
