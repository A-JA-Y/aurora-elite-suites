import { HOME } from "@/data/home";
import { Marquee } from "@/components/ui/Marquee";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";

const TICKER = [
  "Godrej Golf Links",
  "Sector 27, Greater Noida",
  "5.0 on Airbnb",
  "Guest Favourite",
  "Two-bedroom suites",
  "Full kitchen",
  "Pool and clubhouse",
  "Free parking",
  "24-hour building staff",
  "10 min to Pari Chowk",
  "15 min to India Expo Mart",
];

export function TrustStrip() {
  return (
    <section className="relative bg-ivory">
      <div className="border-y hairline py-4">
        <Marquee duration={60} gap="gap-10">
          {TICKER.map((t) => (
            <span key={t} className="flex items-center gap-10 font-sans text-[0.75rem] font-medium uppercase tracking-[0.24em] text-stone">
              {t}
              <span className="h-1 w-1 rounded-full bg-brass" />
            </span>
          ))}
        </Marquee>
      </div>
      <div className="container-x">
        <Stagger className="grid grid-cols-2 divide-charcoal/10 lg:grid-cols-4 lg:divide-x" stagger={0.1}>
          {HOME.trust.map((t, i) => (
            <StaggerItem key={t.title} className={i % 2 === 1 ? "border-l hairline lg:border-l-0" : ""}>
              <div className="flex flex-col gap-2 px-5 py-8 sm:px-8 lg:py-12 first:pl-0">
                <p className="font-display text-[1.6rem] leading-tight text-charcoal sm:text-[1.9rem]">{t.title}</p>
                <p className="font-sans text-[0.875rem] text-stone">{t.text}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
