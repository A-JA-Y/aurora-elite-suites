import { ArrowUpRight, Clock, MessageCircle, Star, Users } from "lucide-react";
import { SITE } from "@/data/site";
import type { Suite } from "@/data/suites";
import { cn, whatsappLink } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

export function BookingBox({ suite, className }: { suite: Suite; className?: string }) {
  const wa = whatsappLink(`Hi, I'd like to check availability for the ${suite.shortName} at Aurora Elite Suites.`);
  return (
    <aside className={cn("rounded-[6px] bg-forest p-6 text-ivory shadow-soft ring-1 ring-brass/20 grain sm:p-7", className)}>
      <p className="eyebrow text-brass">{suite.booking.heading}</p>
      <p className="mt-3 font-display text-[1.6rem] leading-tight">{suite.booking.body}</p>
      <ul className="mt-6 grid grid-cols-2 gap-3 font-sans text-[0.8125rem] text-ivory/80">
        <li className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-brass" strokeWidth={1.5} /> In {suite.checkIn}
        </li>
        <li className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-brass" strokeWidth={1.5} /> Out {suite.checkOut}
        </li>
        <li className="flex items-center gap-2">
          <Users className="h-4 w-4 text-brass" strokeWidth={1.5} /> Up to 4 guests
        </li>
        <li className="flex items-center gap-2">
          <Star className="h-4 w-4 fill-brass text-brass" strokeWidth={1} /> {suite.rating ? `${suite.rating.value} · ${suite.rating.count} reviews` : "New listing"}
        </li>
      </ul>
      <div className="mt-7 flex flex-col gap-3">
        <Button href={wa} variant="brass" size="lg" icon={<MessageCircle className="h-4 w-4" strokeWidth={1.75} />} className="w-full">
          WhatsApp Us
        </Button>
        <Button href={suite.airbnb} variant="outline-light" size="lg" icon={<ArrowUpRight className="h-4 w-4" strokeWidth={1.75} />} className="w-full">
          Book on Airbnb
        </Button>
        <Button href={`/contact?suite=${encodeURIComponent(suite.shortName)}`} variant="ghost" size="md" className="w-full text-ivory hover:bg-ivory/10">
          Send an enquiry
        </Button>
      </div>
      <p className="mt-5 text-center font-sans text-[0.72rem] text-ivory/50">
        {SITE.phoneDisplay} · usually replies within the hour
      </p>
    </aside>
  );
}
