import Link from "next/link";
import { Check, Minus } from "lucide-react";
import { SUITES, SUITES_PAGE } from "@/data/suites";
import { cn } from "@/lib/utils";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";

function Cell({ value }: { value: string }) {
  if (value === "-") return <Minus className="h-4 w-4 text-mist" strokeWidth={1.5} aria-label="Not available" />;
  if (value === "Yes") return <Check className="h-4 w-4 text-fairway" strokeWidth={2} aria-label="Yes" />;
  return <span>{value}</span>;
}

export function ComparisonTable() {
  return (
    <div>
      <Reveal>
        <div className="hidden grid-cols-[1fr_1.3fr_1.3fr] items-end gap-6 border-b hairline pb-5 md:grid">
          <span className="eyebrow">Side by side</span>
          {SUITES.map((s) => (
            <Link key={s.slug} href={`/suites/${s.slug}`} className="group flex items-baseline gap-2" data-cursor="link">
              <span className="font-display text-[1.75rem] leading-none text-charcoal transition-colors group-hover:text-fairway">{s.name}</span>
            </Link>
          ))}
        </div>
      </Reveal>
      <Stagger as="ul" className="divide-y divide-charcoal/10" stagger={0.05}>
        {SUITES_PAGE.comparison.map((row) => (
          <StaggerItem key={row.label} as="li" className="grid gap-2 py-4 md:grid-cols-[1fr_1.3fr_1.3fr] md:gap-6 md:py-5">
            <span className="font-sans text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-oak md:pt-1">{row.label}</span>
            <div className="grid grid-cols-2 gap-4 md:contents">
              {[row.golfView, row.elegant].map((v, i) => (
                <div key={i} className={cn("font-sans text-[0.9375rem] leading-relaxed text-charcoal")}>
                  <span className="mb-1 block font-display text-[0.95rem] italic text-stone md:hidden">{SUITES[i].shortName}</span>
                  <Cell value={v} />
                </div>
              ))}
            </div>
          </StaggerItem>
        ))}
        <StaggerItem as="li" className="grid gap-2 py-5 md:grid-cols-[1fr_1.3fr_1.3fr] md:gap-6">
          <span className="font-sans text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-oak md:pt-2">Book</span>
          <div className="grid grid-cols-2 gap-4 md:contents">
            {SUITES.map((s) => (
              <Link key={s.slug} href={`/suites/${s.slug}`} className="inline-flex h-11 items-center justify-center rounded-full bg-fairway px-5 font-sans text-[0.8125rem] font-semibold text-ivory transition hover:bg-fairway-2" data-cursor="link">
                View {s.shortName}
              </Link>
            ))}
          </div>
        </StaggerItem>
      </Stagger>
    </div>
  );
}
