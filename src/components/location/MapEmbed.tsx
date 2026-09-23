"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";
import { SITE } from "@/data/site";
import { img } from "@/data/images";
import { SmartImage } from "@/components/ui/SmartImage";

/** Google Map that loads only when asked, so the page stays light. */
export function MapEmbed() {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[6px] bg-sand sm:aspect-[21/9]">
      {loaded ? (
        <iframe
          title="Map of Godrej Golf Links, Sector 27, Greater Noida"
          src={SITE.maps.embed}
          className="absolute inset-0 h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      ) : (
        <button type="button" onClick={() => setLoaded(true)} className="group absolute inset-0 block w-full text-left" aria-label="Load the interactive map" data-cursor="link">
          <SmartImage image={img("GV-SOC-08")} sizes="100vw" className="absolute inset-0" imgClassName="transition-transform duration-[1400ms] group-hover:scale-105" />
          <div className="absolute inset-0 bg-forest/55 transition-colors group-hover:bg-forest/45" />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-ivory">
            <span className="grid h-16 w-16 place-items-center rounded-full bg-ivory text-fairway shadow-soft">
              <MapPin className="h-6 w-6" strokeWidth={1.6} />
            </span>
            <span className="font-display text-[1.6rem]">Load the map</span>
            <span className="font-sans text-[0.75rem] tracking-[0.16em] text-ivory/70">Godrej Golf Links · Sector 27 · Greater Noida</span>
          </div>
        </button>
      )}
    </div>
  );
}
