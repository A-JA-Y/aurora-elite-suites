/**
 * Knowledge base for the on-site assistant.
 * Every chunk is derived from the same data files that render the pages,
 * so the assistant can only ever talk about what the website says.
 */
import { SITE } from "@/data/site";
import { SUITES, SUITES_PAGE } from "@/data/suites";
import { AMENITY_SECTIONS } from "@/data/amenities";
import { DISTANCES, GETTING_HERE, LOCATION_PAGE, NEARBY } from "@/data/location";
import { RATING, REVIEWS } from "@/data/reviews";
import { FAQ_GROUPS } from "@/data/faqs";
import { ABOUT_PAGE, HOUSE_RULES, PRIVACY, TERMS } from "@/data/legal";
import { HOME } from "@/data/home";

export interface Chunk {
  id: string;
  title: string;
  text: string;
  url: string;
  /** Extra search terms that should match this chunk. */
  tags?: string;
  /** Multiplier applied to the BM25 score. FAQs are authoritative answers. */
  boost?: number;
}

function build(): Chunk[] {
  const chunks: Chunk[] = [];
  const add = (c: Chunk) => chunks.push(c);

  add({
    id: "basics",
    title: "Aurora Elite Suites: key facts",
    url: "/",
    boost: 1.1,
    tags: "contact details phone number whatsapp email address where located how to reach hours timing",
    text: `Aurora Elite Suites offers fully furnished two-bedroom serviced apartments at ${SITE.address.oneLine}, India. Phone and WhatsApp: ${SITE.phoneDisplay} (${SITE.whatsapp}). Email: ${SITE.email}. Check-in: Golf View Suite from ${SITE.checkIn.golfView}, Elegant Suite from ${SITE.checkIn.elegant}. Check-out by ${SITE.checkOut} for both suites. Up to ${SITE.maxGuests} guests per suite. ${SITE.checkInMethod}. Rated ${SITE.rating.value} out of 5 on Airbnb from ${SITE.rating.count} reviews; the Golf View Suite is an Airbnb Guest Favourite. ${SITE.responseLine}. Google Maps: ${SITE.maps.search}.`,
  });

  add({
    id: "brand",
    title: "About the suites",
    url: "/about",
    tags: "what is aurora elite suites overview description who are you",
    text: `${SITE.longDescription} Tagline: ${SITE.tagline}.`,
  });

  add({
    id: "booking-methods",
    title: "How to book",
    url: "/contact",
    boost: 1.1,
    tags: "book booking reserve reservation direct airbnb price rate rates tariff cost how much per night availability available dates discount",
    text: `To book, call or WhatsApp ${SITE.phoneDisplay} (${SITE.whatsappPrefilled}), email ${SITE.emailLink.replace(/\?.*$/, "").replace("mailto:", "")} or use the enquiry form on the contact page (/contact). Send your dates, the number of guests and the suite you'd like, and the team replies with availability and today's rate, usually within the hour. Rates are not published on the website: they are shared on request for your dates. You can also book on Airbnb: Golf View Suite ${SITE.airbnb.golfView}, Elegant Suite ${SITE.airbnb.elegant}. Weekly and monthly rates are available for long stays on request.`,
  });

  for (const s of SUITES) {
    const base = `/suites/${s.slug}`;
    add({
      id: `${s.slug}-overview`,
      title: s.name,
      url: base,
      boost: 1.05,
      tags: `${s.shortName} ${s.slug.replace(/-/g, " ")} suite apartment flat overview about`,
      text: `${s.name}: ${s.subheading}. ${s.factBar.join(", ")}. ${s.about.join(" ")} Book on Airbnb: ${s.airbnb}. Check-in ${s.checkIn}, check-out ${s.checkOut}.${s.rating ? ` Rating ${s.rating.value} from ${s.rating.count} reviews, ${s.rating.badge}.` : " New listing without reviews of its own yet."}`,
    });
    add({
      id: `${s.slug}-beds`,
      title: `${s.name}: where you'll sleep`,
      url: base,
      tags: `${s.shortName} beds bed bedroom king single mattress sofa sleeping arrangement sleep how many`,
      text: `${s.name} sleeping arrangement: ${s.sleeping.map((x) => `${x.room}: ${x.beds}`).join("; ")}. Up to 4 guests.${s.views ? ` Views from the suite: ${s.views.join(", ")}.` : ""}`,
    });
    add({
      id: `${s.slug}-included`,
      title: `${s.name}: what's included`,
      url: base,
      tags: `${s.shortName} amenities included facilities features has have washing machine dryer heating ac tv kitchen balcony parking safety`,
      text: `${s.name} includes: ${s.included.map((g) => `${g.label}: ${g.text}`).join(". ")}.${s.notAvailable ? ` Not available: ${s.notAvailable}.` : ""}`,
    });
    add({
      id: `${s.slug}-rules`,
      title: `${s.name}: good to know`,
      url: base,
      tags: `${s.shortName} rules quiet hours smoking parties pets check-in check-out`,
      text: `${s.name} good to know: ${s.goodToKnow.join("; ")}. Full rules at /house-rules.`,
    });
    if (s.rooms) {
      for (const r of s.rooms) {
        add({
          id: `${s.slug}-room-${r.title.toLowerCase().replace(/\s+/g, "-")}`,
          title: `${s.name}: ${r.title}`,
          url: base,
          tags: `${s.shortName} ${r.title} room`,
          text: `${s.name}, ${r.title}: ${r.text}`,
        });
      }
    }
  }

  add({
    id: "suites-compare",
    title: "Comparing the two suites",
    url: "/suites",
    boost: 1.1,
    tags: "difference between suites compare comparison which suite choose better both two suites elegant golf view",
    text: `${SUITES_PAGE.intro} Comparison: ${SUITES_PAGE.comparison.map((r) => `${r.label}: Golf View Suite ${r.golfView}; Elegant Suite ${r.elegant}`).join(". ")}. Included in both suites: ${SUITES_PAGE.includedInBoth.join(", ")}.`,
  });

  for (const sec of AMENITY_SECTIONS) {
    add({
      id: `amenity-${sec.id}`,
      title: `Amenities: ${sec.title}`,
      url: "/amenities",
      tags: `amenities facilities ${sec.title}`,
      text: `${sec.title}${sec.note ? ` (${sec.note})` : ""}: ${sec.items.join("; ")}.`,
    });
  }

  add({
    id: "location-intro",
    title: "Location",
    url: "/location",
    tags: "location where area neighbourhood township godrej golf links jaypee greens pari chowk sector 27",
    text: `${LOCATION_PAGE.subheading}. ${LOCATION_PAGE.intro} ${LOCATION_PAGE.mapNote}`,
  });
  add({
    id: "distances",
    title: "Distances and drive times",
    url: "/location",
    boost: 1.15,
    tags: "how far distance km kilometres minutes drive time near nearby close metro airport mall hospital university expo circuit taj agra delhi",
    text: `Approximate road distances and usual drive times from Aurora Elite Suites: ${DISTANCES.map((d) => `${d.name} ${d.kmLabel}, ${d.time}`).join("; ")}.`,
  });
  for (const g of GETTING_HERE) {
    add({
      id: `getting-${g.mode.replace(/\s+/g, "-").toLowerCase()}`,
      title: `Getting here ${g.mode.toLowerCase()}`,
      url: "/location",
      tags: `getting here travel reach ${g.mode} directions route transport cab taxi`,
      text: `${g.mode}: ${g.text}`,
    });
  }
  for (const n of NEARBY) {
    add({
      id: `nearby-${n.id}`,
      title: n.title,
      url: "/location",
      tags: `nearby things to do visit see attractions ${n.dayTrip ? "day trip excursion" : "around greater noida"}`,
      text: `${n.title}: ${n.text} ${n.distance}.`,
    });
  }

  add({
    id: "rating",
    title: "Guest rating summary",
    url: "/reviews",
    boost: 1.05,
    tags: "reviews rating stars score guests say feedback cleanliness accuracy communication value guest favourite",
    text: `Overall rating ${RATING.overall} out of 5 from ${RATING.count} verified Airbnb reviews of the Golf View Suite (${RATING.fiveStarShare}% five-star), ${RATING.badge}. Category ratings: ${RATING.categories.map((c) => `${c.label} ${c.value.toFixed(1)}`).join(", ")}. What guests mention most: ${RATING.mentions.map((m) => `${m.label} (${m.count})`).join(", ")}. Read them on Airbnb: ${SITE.airbnb.golfView}.`,
  });
  for (const r of REVIEWS) {
    add({
      id: `review-${r.id}`,
      title: `Review by ${r.name}${r.from ? `, ${r.from}` : ""} (${r.date})`,
      url: "/reviews",
      tags: "review guest said experience stay",
      text: `${r.name}${r.from ? ` from ${r.from}` : ""} wrote in ${r.date}: "${r.text.replace(/\n/g, " ")}"`,
    });
  }

  for (const g of FAQ_GROUPS) {
    for (const f of g.items) {
      add({
        id: `faq-${f.id}`,
        title: f.q,
        url: `/faqs#${f.id}`,
        boost: 1.35,
        tags: `faq question ${g.title}`,
        text: `Q: ${f.q} A: ${f.a}`,
      });
    }
  }

  for (const sec of HOUSE_RULES.sections) {
    add({
      id: `rules-${sec.title.toLowerCase().replace(/\s+/g, "-")}`,
      title: `House rules: ${sec.title}`,
      url: "/house-rules",
      tags: "house rules policy policies allowed not allowed",
      text: `${sec.title}: ${sec.items.join(" ")}`,
    });
  }

  add({
    id: "privacy",
    title: "Privacy policy summary",
    url: "/privacy-policy",
    tags: "privacy data personal information cookies id documents",
    text: `${PRIVACY.intro} ${PRIVACY.sections.map((s) => `${s.title}: ${"items" in s && s.items ? s.items.join(" ") : s.text}`).join(" ")}`,
  });
  add({
    id: "terms",
    title: "Terms of stay",
    url: "/terms",
    tags: "terms conditions payment tariff confirmation occupancy",
    text: TERMS.items.map((t) => `${t.title}: ${t.text}`).join(" "),
  });

  add({
    id: "about-story",
    title: "Our story and values",
    url: "/about",
    tags: "about story team values who runs host owner started",
    text: `${ABOUT_PAGE.story.join(" ")} What we care about: ${ABOUT_PAGE.values.map((v) => `${v.title} ${v.text}`).join(" ")} By the numbers: ${ABOUT_PAGE.numbers.map((n) => `${n.display} ${n.label}`).join(", ")}.`,
  });

  add({
    id: "who-stays",
    title: "Who stays with us",
    url: "/",
    tags: "suitable for business exhibitors families wedding medical students parents long stay relocation project team weekly monthly",
    text: HOME.who.tiles.map((t) => `${t.title}: ${t.text}`).join(" "),
  });
  add({
    id: "why-us",
    title: "Why guests choose us",
    url: "/",
    tags: "why choose highlights features view kitchen work pool gated",
    text: HOME.why.cards.map((c) => `${c.title}: ${c.text}`).join(" "),
  });
  add({
    id: "gallery",
    title: "Photo gallery",
    url: "/gallery",
    tags: "photos pictures images gallery see look inside",
    text: "The gallery page (/gallery) has 167 real photos of the suites and Godrej Golf Links: living rooms, kitchens, bedrooms, bathrooms, balcony views, the pool and township, the Elegant Suite, and landmarks around Greater Noida. What you see is what you get.",
  });

  return chunks;
}

export const KNOWLEDGE: Chunk[] = build();
