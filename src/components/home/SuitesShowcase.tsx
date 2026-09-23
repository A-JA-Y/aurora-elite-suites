import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { HOME } from "@/data/home";
import { img } from "@/data/images";
import { SUITES } from "@/data/suites";
import { cn } from "@/lib/utils";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function SuitesShowcase() {
  return (
    <section className="container-x py-24 sm:py-32" id="suites">
      <SectionHeader eyebrow="Our suites" title={HOME.suites.heading} lede={HOME.suites.intro} />
      <div className="mt-16 grid gap-10 lg:grid-cols-2 lg:gap-12">
        {SUITES.map((s, i) => {
          const image = img(s.card.imageId);
          return (
            <Reveal key={s.slug} delay={i * 0.12} className={cn(i === 1 && "lg:mt-24")}>
              <Link href={`/suites/${s.slug}`} className="group block" data-cursor="view" data-cursor-label="View suite">
                <ParallaxImage
                  image={image}
                  className="riso-plate aspect-[4/5] rounded-[2px] ring-[1.5px] ring-riso-blue/25 transition-shadow duration-500 ease-expo group-hover:shadow-[10px_10px_0_0_var(--color-riso-salmon)] sm:aspect-[5/4]"
                  speed={0.1}
                  scale={1.15}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent opacity-80 transition-opacity duration-700 group-hover:opacity-95" />
                  <span
                    className={cn(
                      "absolute left-5 top-5 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-sans text-[0.65rem] font-semibold uppercase tracking-[0.2em] backdrop-blur",
                      s.badgeTone === "brass" ? "bg-brass text-ink" : "bg-ivory/90 text-fairway",
                    )}
                  >
                    {s.badgeTone === "brass" && <Star className="h-3 w-3 fill-ink" strokeWidth={1} />}
                    {s.badge}
                  </span>
                  <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4 text-ivory sm:inset-x-7 sm:bottom-7">
                    <div>
                      <p className="font-sans text-[0.7rem] tracking-[0.18em] text-ivory/70">{s.card.facts.split(" | ").slice(0, 3).join(" · ")}</p>
                      <h3 className="mt-2 font-display text-[2rem] leading-none sm:text-[2.6rem]">{s.name}</h3>
                    </div>
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-ivory text-charcoal transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-[-45deg]">
                      <ArrowRight className="h-5 w-5" strokeWidth={1.5} />
                    </span>
                  </div>
                </ParallaxImage>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <p className="max-w-[46ch] text-[0.9375rem] leading-relaxed text-stone">{s.card.line}</p>
                  <p className="shrink-0 font-sans text-[0.75rem] font-medium tracking-[0.12em] text-oak">{s.card.facts.split(" | ").slice(3).join(" · ")}</p>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
