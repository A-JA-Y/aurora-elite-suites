export interface Faq {
  id: string;
  q: string;
  a: string;
}

export interface FaqGroup {
  title: string;
  items: Faq[];
}

export const FAQ_GROUPS: FaqGroup[] = [
  {
    title: "Booking and check-in",
    items: [
      {
        id: "where",
        q: "Where exactly is Aurora Elite Suites?",
        a: "We're in Suites Tower 1, Godrej Golf Links, Sector 27, Greater Noida, near Pari Chowk and opposite Jaypee Greens. We share the exact flat details and check-in instructions once your booking is confirmed.",
      },
      {
        id: "times",
        q: "What are the check-in and check-out times?",
        a: "Check-in is from 12:00 noon at the Golf View Suite and from 2:00 PM at the Elegant Suite. Check-out is by 10:00 AM for both. If you need an early check-in or a late check-out, ask us in advance and we'll do our best, depending on the next booking.",
      },
      {
        id: "checkin-how",
        q: "How does check-in work?",
        a: "It's self check-in with the building staff, who are on duty 24 hours. We send you the steps before you arrive, and you can call or WhatsApp us at any point.",
      },
      {
        id: "id",
        q: "What ID do I need to check in?",
        a: "Every guest needs a valid government-issued photo ID. Indian guests can use an Aadhaar card, passport, driving licence or voter ID. International guests need their passport with a valid visa or OCI card.",
      },
      {
        id: "book",
        q: "How do I book? Can I book directly?",
        a: "Yes. Call or WhatsApp us on +91 99997 00602, email bookings@auroraelitesuits.com or use the form on our contact page. You can also book either suite on Airbnb.",
      },
      {
        id: "cancellation",
        q: "What is your cancellation policy?",
        a: "For Airbnb bookings, the cancellation policy shown on Airbnb for your dates applies. For direct bookings, we confirm the cancellation terms in writing along with your booking, before you pay anything.",
      },
      {
        id: "long-stays",
        q: "Do you offer long stays?",
        a: "Yes. The suites work well for stays of a week or more, with a full kitchen and a proper workspace. Message us your dates and we'll share weekly and monthly rates.",
      },
    ],
  },
  {
    title: "The suites",
    items: [
      {
        id: "guests",
        q: "How many guests can stay?",
        a: "Up to four guests per suite. Only registered guests can stay overnight.",
      },
      {
        id: "beds",
        q: "What are the beds like?",
        a: "The Golf View Suite has a king bed and a floor mattress in the main bedroom, a single bed in the second bedroom and a sofa in the living room. The Elegant Suite has two single beds in bedroom one and a single bed in bedroom two.",
      },
      {
        id: "wifi",
        q: "Is there Wi-Fi? Can I work from the suite?",
        a: "Yes. Both suites have high-speed Wi-Fi and a dedicated workspace, so you can take calls and work full days.",
      },
      {
        id: "cook",
        q: "Can I cook in the suite?",
        a: "Yes. Each suite has a fully equipped kitchen. The Golf View Suite has a three-burner gas hob, an induction cooktop, a chimney, microwave and refrigerator, along with cookware, crockery and cooking basics. The Elegant Suite has a full kitchen with an induction cooker.",
      },
      {
        id: "towels",
        q: "Are towels and toiletries provided?",
        a: "Yes. We lay out fresh towels, bed linen, shower gel and toiletries, and there are extra pillows and blankets.",
      },
      {
        id: "hot-water",
        q: "Is there hot water and air conditioning?",
        a: "Yes. The bathrooms have geysers for hot water, and the suites are air-conditioned.",
      },
      {
        id: "washing",
        q: "Is there a washing machine?",
        a: "The Elegant Suite has a washing machine. The Golf View Suite doesn't, so if laundry matters for your stay, choose the Elegant Suite.",
      },
    ],
  },
  {
    title: "Facilities and rules",
    items: [
      {
        id: "pool",
        q: "Can I use the swimming pool and clubhouse?",
        a: "Yes. Guests can use the township's swimming pool, clubhouse, landscaped gardens and walking tracks, subject to society rules, timings and availability.",
      },
      {
        id: "parking",
        q: "Is parking available?",
        a: "Yes. Free parking is available on the premises.",
      },
      {
        id: "pets",
        q: "Are pets allowed?",
        a: "Yes, with prior approval. Tell us about your pet when you book. Assistance animals are always welcome.",
      },
      {
        id: "smoke",
        q: "Can I smoke in the suite?",
        a: "No. Smoking, vaping and illegal substances are not allowed inside the suites.",
      },
      {
        id: "visitors",
        q: "Can I have visitors or a small party?",
        a: "Only registered guests can stay at the suite, and visitors need our approval in advance. Parties, events and loud music aren't allowed, out of respect for the neighbours.",
      },
      {
        id: "safety",
        q: "Is it safe for families and solo travellers?",
        a: "Yes. Godrej Golf Links is a gated township with building staff on duty 24 hours and CCTV at the main gate, building entrance, parking, lift lobby and corridors. There are no cameras inside the suites. Each suite has a smoke alarm, carbon monoxide alarm, fire extinguisher and first aid kit.",
      },
      {
        id: "photoshoot",
        q: "Can we do a photoshoot at the suite?",
        a: "Commercial photography is permitted at the Elegant Suite. Tell us about your shoot when you book.",
      },
    ],
  },
  {
    title: "Location and getting here",
    items: [
      {
        id: "expo",
        q: "How far is India Expo Centre & Mart?",
        a: "About 6 km, or 12 to 15 minutes by car. Knowledge Park II metro station, near the Expo Mart, is about 5.6 km from the suites.",
      },
      {
        id: "metro",
        q: "Is there a metro station nearby?",
        a: "Yes. Delta 1 station on the Noida Metro Aqua Line is about 2 km away, and Pari Chowk station is about 4 km. Change at Noida Sector 51 / Sector 52 for the Delhi Metro Blue Line.",
      },
      {
        id: "airport",
        q: "How do I get here from the airport?",
        a: "Noida International Airport (Jewar) is about 43 km away, roughly 45 to 50 minutes by the Yamuna Expressway. Delhi's IGI Airport is about 57 km away, 75 to 90 minutes depending on traffic. App cabs are the easiest way to reach us.",
      },
      {
        id: "nearby",
        q: "What's nearby?",
        a: "Pari Chowk and The Grand Venice Mall are 3 to 4 km away, Kailash Hospital about 4 km, Sharda University and Sharda Hospital about 8 km, Gautam Buddha University about 9 km and Buddh International Circuit about 20 km.",
      },
    ],
  },
];

export const ALL_FAQS: Faq[] = FAQ_GROUPS.flatMap((g) => g.items);

export const FAQ_TEASER_IDS = ["times", "expo", "pool", "pets"];

export function faq(id: string): Faq {
  const found = ALL_FAQS.find((f) => f.id === id);
  if (!found) throw new Error(`Unknown FAQ id: ${id}`);
  return found;
}
