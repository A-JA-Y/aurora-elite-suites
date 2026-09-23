import { HOME } from "@/data/home";
import { img } from "@/data/images";
import { cn } from "@/lib/utils";
import { SmartImage } from "@/components/ui/SmartImage";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";

export function WhoStays() {
  return (
    <section className="bg-sand py-24 sm:py-32">
      <div className="container-x">
        <SectionHeader eyebrow="Who stays with us" title={HOME.who.heading} align="center" />
        <Stagger className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
          {HOME.who.tiles.map((t, i) => {
            const image = img(t.imageId);
            return (
              <StaggerItem key={t.title} as="article" className={cn("group relative overflow-hidden rounded-[6px] bg-forest text-ivory", i === 0 || i === 5 ? "lg:col-span-2 aspect-[16/10] sm:aspect-[2/1]" : "aspect-[4/5] sm:aspect-[4/4.2]")}>
                <SmartImage image={image} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw" className="absolute inset-0" imgClassName="transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-transparent transition-opacity duration-700 group-hover:opacity-95" />
                <div className="absolute inset-x-6 bottom-6 sm:inset-x-7 sm:bottom-7">
                  <h3 className="font-display text-[1.75rem] leading-tight sm:text-[2rem]">{t.title}</h3>
                  <p className="mt-2 max-w-[44ch] text-[0.9rem] leading-relaxed text-ivory/80 sm:max-h-0 sm:overflow-hidden sm:opacity-0 sm:transition-all sm:duration-700 sm:ease-[cubic-bezier(0.16,1,0.3,1)] sm:group-hover:max-h-40 sm:group-hover:opacity-100">
                    {t.text}
                  </p>
                </div>
                {image.credit && <span className="absolute right-3 top-3 max-w-[70%] truncate rounded-full bg-ink/40 px-2 py-0.5 font-sans text-[0.55rem] text-ivory/70 backdrop-blur">{image.credit}</span>}
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
