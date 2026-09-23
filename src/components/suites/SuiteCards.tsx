import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { img } from "@/data/images";
import { SUITES } from "@/data/suites";
import { cn } from "@/lib/utils";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { Reveal } from "@/components/ui/Reveal";

export function SuiteCards({ exclude }: { exclude?: string }) {
  const list = SUITES.filter((s) => s.slug !== exclude);
  return (
    <div className={cn("grid gap-8", list.length > 1 && "lg:grid-cols-2")}>
      {list.map((s, i) => {
        const image = img(s.heroImageIds[0]);
        return (
          <Reveal key={s.slug} delay={i * 0.1}>
            <Link href={`/suites/${s.slug}`} className="group block" data-cursor="view" data-cursor-label="View suite">
              <ParallaxImage image={image} className={cn("rounded-[6px]", list.length > 1 ? "aspect-[4/3]" : "aspect-[16/9]")} speed={0.08} scale={1.12} sizes="(max-width: 1024px) 100vw, 50vw">
                <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
                <span className={cn("absolute left-5 top-5 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-sans text-[0.65rem] font-semibold uppercase tracking-[0.2em] backdrop-blur", s.badgeTone === "brass" ? "bg-brass text-ink" : "bg-ivory/90 text-fairway")}>
                  {s.badgeTone === "brass" && <Star className="h-3 w-3 fill-ink" strokeWidth={1} />}
                  {s.badge}
                </span>
                <div className="absolute inset-x-6 bottom-6 flex items-end justify-between gap-4 text-ivory">
                  <div>
                    <p className="font-sans text-[0.7rem] tracking-[0.18em] text-ivory/70">{s.card.facts.split(" | ").join(" · ")}</p>
                    <h3 className="mt-2 font-display text-[2rem] leading-none sm:text-[2.4rem]">{s.name}</h3>
                  </div>
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-ivory text-charcoal transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-[-45deg]">
                    <ArrowRight className="h-5 w-5" strokeWidth={1.5} />
                  </span>
                </div>
              </ParallaxImage>
              <p className="mt-5 max-w-[56ch] text-[0.9375rem] leading-relaxed text-stone">{s.card.line}</p>
            </Link>
          </Reveal>
        );
      })}
    </div>
  );
}
