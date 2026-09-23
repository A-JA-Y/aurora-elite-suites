import { Car, ChefHat, Laptop, Refrigerator, ShieldCheck, ShowerHead, Snowflake, Sparkles, Trees, Tv, Waves, Wifi, type LucideIcon } from "lucide-react";
import { AMENITY_SNAPSHOT } from "@/data/amenities";
import { HOME } from "@/data/home";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";

const ICONS: Record<string, LucideIcon> = {
  wifi: Wifi,
  laptop: Laptop,
  snowflake: Snowflake,
  tv: Tv,
  "chef-hat": ChefHat,
  refrigerator: Refrigerator,
  "shower-head": ShowerHead,
  sparkles: Sparkles,
  car: Car,
  waves: Waves,
  trees: Trees,
  "shield-check": ShieldCheck,
};

export function AmenitiesSnapshot() {
  return (
    <section className="container-x py-24 sm:py-32">
      <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeader eyebrow="Amenities" title={HOME.amenities.heading} lede="Everything you'd expect from a good hotel, plus what a hotel can't give you." />
        <div className="shrink-0">
          <Button href={HOME.amenities.link.href} variant="secondary">
            {HOME.amenities.link.label}
          </Button>
        </div>
      </div>
      <Stagger className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-[6px] bg-charcoal/10 sm:grid-cols-3 lg:grid-cols-6" stagger={0.05}>
        {AMENITY_SNAPSHOT.map((a) => {
          const Icon = ICONS[a.icon] ?? Sparkles;
          return (
            <StaggerItem key={a.label} className="group flex flex-col gap-5 bg-ivory p-6 transition-colors duration-500 hover:bg-cream sm:p-7">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-sand text-fairway transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1 group-hover:bg-fairway group-hover:text-ivory">
                <Icon className="h-5 w-5" strokeWidth={1.5} />
              </span>
              <p className="font-sans text-[0.875rem] font-medium leading-snug text-charcoal">{a.label}</p>
            </StaggerItem>
          );
        })}
      </Stagger>
    </section>
  );
}
