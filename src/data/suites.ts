import { SITE } from "./site";

export interface RoomSection {
  title: string;
  text: string;
  imageIds: string[];
}

export interface IncludedGroup {
  label: string;
  text: string;
}

export interface Suite {
  slug: "golf-view-suite" | "elegant-suite";
  key: "golfView" | "elegant";
  name: string;
  shortName: string;
  subheading: string;
  seo: { title: string; description: string; keyword: string };
  factBar: string[];
  airbnb: string;
  badge: string;
  badgeTone: "brass" | "fairway";
  checkIn: string;
  checkOut: string;
  heroImageIds: string[];
  heroPortraitId: string;
  about: string[];
  rooms?: RoomSection[];
  photoIds: string[];
  sleeping: { room: string; beds: string }[];
  views?: string[];
  included: IncludedGroup[];
  notAvailable?: string;
  goodToKnow: string[];
  booking: { heading: string; body: string };
  card: { facts: string; line: string; imageId: string };
  rating?: {
    value: string;
    count: number;
    badge: string;
  };
}

export const GOLF_VIEW: Suite = {
  slug: "golf-view-suite",
  key: "golfView",
  name: "The Golf View Suite",
  shortName: "Golf View Suite",
  subheading: "Two bedrooms, two bathrooms and a balcony over the greens",
  seo: {
    title: "Golf View Suite at Godrej Golf Links | Aurora Elite Suites",
    description:
      "A 2-bedroom suite with a king bed, balcony over the golf course, full kitchen and Wi-Fi at Godrej Golf Links, Greater Noida. Rated 5.0 by guests.",
    keyword: "Godrej Golf Links apartment for stay",
  },
  factBar: [
    "Entire apartment",
    "2 bedrooms",
    "2 bathrooms",
    "Up to 4 guests",
    "Check-in 12 noon",
    "Check-out 10 AM",
  ],
  airbnb: SITE.airbnb.golfView,
  badge: "Airbnb Guest Favourite",
  badgeTone: "brass",
  checkIn: "12:00 noon",
  checkOut: "10:00 AM",
  heroImageIds: ["GV-BR1-01", "GV-LIV-01", "GV-KIT-01", "GV-VIEW-01", "GV-BTH-01"],
  heroPortraitId: "GV-LIV-01",
  about: [
    "This is our first suite, and the one with all the reviews: 5.0 stars from ten stays and an Airbnb Guest Favourite badge. It's a bright two-bedroom apartment in Godrej Golf Links with elegant interiors, plush bedding and a private balcony that looks over the golf course and the green belt of Jaypee Greens.",
    "It works well for a family of four, or for colleagues who want their own rooms and a shared kitchen. You check in with the building staff, and everything is ready when you walk in: the suite is professionally cleaned before every arrival and the beds are freshly made.",
  ],
  rooms: [
    {
      title: "Living and dining",
      text: "A deep L-shaped sofa, a round wooden coffee table and a floral rug set the tone, with full-length curtains and a crystal pendant light overhead. There's a breakfast bar with high stools by the kitchen and a dining table for proper sit-down meals.",
      imageIds: ["GV-LIV-02", "GV-LIV-06", "GV-LIV-07"],
    },
    {
      title: "Kitchen",
      text: "An L-shaped modular kitchen with white base units, oak-finish wall cabinets and granite counters. You'll find a three-burner glass-top gas hob, an induction cooktop, a chimney, microwave, refrigerator, non-stick pans, crockery, cutlery and cooking basics like oil, salt and pepper.",
      imageIds: ["GV-KIT-14", "GV-KIT-27", "GV-KIT-12"],
    },
    {
      title: "Main bedroom",
      text: "A king bed with an upholstered headboard, bedside lamps, framed art and a full-height wardrobe. There's a floor mattress too, if a fourth guest needs it.",
      imageIds: ["GV-BR1-01", "GV-BR1-05", "GV-BR1-04"],
    },
    {
      title: "Second bedroom",
      text: "A single bed by the window, soft daylight and its own storage. Good for a child, a parent or a colleague.",
      imageIds: ["GV-BR2-01", "GV-BR2-02", "GV-BR2-05"],
    },
    {
      title: "Bathrooms",
      text: "Two bathrooms with rain showers, geysers for hot water, wall-hung WCs with health faucets, and fresh towels, shower gel and toiletries laid out for you.",
      imageIds: ["GV-BTH-01", "GV-BTH-03", "GV-BTH-14"],
    },
    {
      title: "Balcony",
      text: "Step out for fresh air and a long view across the golf course, the township's landscaped grounds and Jaypee Greens. It's the best seat in the house at sunset.",
      imageIds: ["GV-BAL-01", "GV-VIEW-01", "GV-VIEW-09"],
    },
    {
      title: "Workspace",
      text: "A dedicated desk with an ergonomic mesh chair, a few steps from the kitchen, and high-speed Wi-Fi throughout.",
      imageIds: ["GV-WRK-01"],
    },
  ],
  photoIds: [],
  sleeping: [
    { room: "Bedroom 1", beds: "1 king bed, 1 floor mattress" },
    { room: "Bedroom 2", beds: "1 single bed" },
    { room: "Living room", beds: "1 sofa" },
  ],
  views: ["Golf course", "Park", "Garden", "Pool", "Courtyard", "City skyline"],
  included: [
    { label: "Comfort", text: "Air conditioning, heating, plush bedding, extra pillows and blankets, wardrobes, hangers" },
    { label: "Kitchen", text: "Gas hob, induction cooktop, chimney, microwave, refrigerator, cookware, crockery, cutlery, cooking basics" },
    { label: "Bath", text: "Two bathrooms, rain shower, hot water, health faucet, fresh towels, shower gel, toiletries, cleaning products" },
    { label: "Work and play", text: "High-speed Wi-Fi, dedicated workspace, Smart TV" },
    { label: "Outdoors", text: "Private balcony with golf-course views" },
    { label: "Township", text: "Swimming pool, clubhouse, landscaped gardens, walking tracks, children's play area, open-air gym (as per society rules)" },
    { label: "Parking", text: "Free parking on the premises" },
    { label: "Safety", text: "Smoke alarm, carbon monoxide alarm, fire extinguisher, first aid kit, CCTV in common areas only" },
    { label: "Service", text: "Self check-in with 24-hour building staff, professional cleaning before every check-in" },
  ],
  notAvailable: "Washing machine, tumble dryer",
  goodToKnow: [
    "Check-in after 12:00 noon",
    "Check-out before 10:00 AM",
    "Up to 4 guests",
    "Pets allowed with prior approval",
    "Quiet hours 10 PM to 7 AM",
    "No smoking, vaping or illegal substances",
    "No parties or events",
    "Registered guests only",
  ],
  booking: {
    heading: "Stay in the Golf View Suite",
    body: "Message us your dates for today's rate, or book on Airbnb.",
  },
  card: {
    facts: "2 bedrooms | 2 bathrooms | Up to 4 guests | King bed + single bed",
    line: "Our most-reviewed suite, rated 5.0 by guests, with a private balcony over the golf course and Jaypee Greens.",
    imageId: "GV-BR1-01",
  },
  rating: { value: "5.0", count: 10, badge: "Airbnb Guest Favourite" },
};

export const ELEGANT: Suite = {
  slug: "elegant-suite",
  key: "elegant",
  name: "The Elegant Suite",
  shortName: "Elegant Suite",
  subheading: "A twin-bed layout for friends and colleagues",
  seo: {
    title: "Elegant 2BHK Suite near Expo Mart | Aurora Elite Suites",
    description:
      "A 2-bedroom suite with three single beds, washing machine, full kitchen and Wi-Fi at Godrej Golf Links, Greater Noida. Near Pari Chowk and Expo Mart.",
    keyword: "apartment near India Expo Mart Greater Noida",
  },
  factBar: [
    "Entire apartment",
    "2 bedrooms",
    "3 single beds",
    "2 bathrooms",
    "Up to 4 guests",
    "Check-in 2 PM",
    "Check-out 10 AM",
  ],
  airbnb: SITE.airbnb.elegant,
  badge: "New",
  badgeTone: "fairway",
  checkIn: "2:00 PM",
  checkOut: "10:00 AM",
  heroImageIds: ["ES-01", "ES-02", "ES-04", "ES-09", "ES-10"],
  heroPortraitId: "ES-01",
  about: [
    "Our newest suite is a calm, thoughtfully designed apartment for families, couples, business travellers and anyone who wants more privacy than a hotel can give. It sits in Godrej Golf Links like our Golf View Suite, with the township pool, gardens and walking tracks a lift ride away.",
    "The living room has a comfortable sofa, a round coffee table and a TV, and the breakfast bar and dining table sit beside a fully equipped kitchen with an induction cooker. Bedroom one has two single beds and bedroom two has a third, which makes this the easy choice for colleagues or friends sharing a trip. There's a washing machine too, handy if you're staying for a week or more.",
    "The suite is new on Airbnb, so it doesn't have reviews of its own yet. It's run by the same team as the Golf View Suite, which guests have rated 5.0 across ten stays.",
  ],
  photoIds: ["ES-01", "ES-02", "ES-03", "ES-09", "ES-04", "ES-05", "ES-06", "ES-07", "ES-08", "ES-11", "ES-10"],
  sleeping: [
    { room: "Bedroom 1", beds: "2 single beds" },
    { room: "Bedroom 2", beds: "1 single bed" },
  ],
  included: [
    { label: "Comfort", text: "Air conditioning, TV" },
    { label: "Kitchen", text: "Fully equipped kitchen with induction cooker" },
    { label: "Laundry", text: "Washing machine" },
    { label: "Work", text: "High-speed Wi-Fi, dedicated workspace" },
    { label: "Township", text: "Swimming pool, exercise equipment, gardens (as per society rules)" },
    { label: "Parking", text: "Free parking on the premises (paid parking also available)" },
    { label: "Safety", text: "Smoke alarm, carbon monoxide alarm, fire extinguisher, first aid kit, exterior CCTV, noise decibel monitors on the property" },
    { label: "Service", text: "Pets allowed with prior approval, commercial photography permitted" },
  ],
  goodToKnow: [
    "Check-in after 2:00 PM",
    "Check-out before 10:00 AM",
    "Up to 4 guests",
    "Pets allowed with prior approval",
    "Quiet hours 11 PM to 7 AM",
    "No smoking inside the suite",
    "No parties or events without written approval",
    "Registered guests only",
  ],
  booking: {
    heading: "Stay in the Elegant Suite",
    body: "Tell us your dates and we'll confirm availability and today's rate.",
  },
  card: {
    facts: "2 bedrooms | 2 bathrooms | Up to 4 guests | 3 single beds",
    line: "A twin-bed layout that suits friends and colleagues travelling together, with a washing machine for longer stays.",
    imageId: "ES-01",
  },
};

export const SUITES: Suite[] = [GOLF_VIEW, ELEGANT];

export function suiteBySlug(slug: string): Suite | undefined {
  return SUITES.find((s) => s.slug === slug);
}

export const SUITES_PAGE = {
  seo: {
    title: "2BHK Serviced Suites in Greater Noida | Aurora Elite Suites",
    description:
      "Compare our two fully furnished 2-bedroom suites at Godrej Golf Links, Greater Noida. Sleep 4, two bathrooms, full kitchen, Wi-Fi and pool access.",
  },
  h1: "Our Suites",
  intro:
    "Both suites are complete two-bedroom apartments in Godrej Golf Links, furnished in the same warm mix of oak, cream and soft greens. Choose the Golf View Suite for the king bed and the balcony views, or the Elegant Suite for its twin-bed layout and washing machine.",
  bannerImageId: "GV-LIV-02",
  comparison: [
    { label: "Type", golfView: "Entire apartment", elegant: "Entire apartment" },
    { label: "Bedrooms", golfView: "2", elegant: "2" },
    { label: "Bathrooms", golfView: "2", elegant: "2" },
    { label: "Guests", golfView: "Up to 4", elegant: "Up to 4" },
    {
      label: "Beds",
      golfView: "King bed + floor mattress (bedroom 1), single bed (bedroom 2), sofa",
      elegant: "2 single beds (bedroom 1), single bed (bedroom 2)",
    },
    { label: "Balcony", golfView: "Private balcony, golf-course views", elegant: "-" },
    { label: "Washing machine", golfView: "-", elegant: "Yes" },
    { label: "Check-in", golfView: "From 12:00 noon", elegant: "From 2:00 PM" },
    { label: "Check-out", golfView: "By 10:00 AM", elegant: "By 10:00 AM" },
    { label: "Airbnb rating", golfView: "5.0 from 10 reviews, Guest Favourite", elegant: "New listing" },
  ],
  includedInBoth: [
    "High-speed Wi-Fi",
    "Dedicated workspace",
    "Air conditioning",
    "TV",
    "Fully equipped kitchen",
    "Free on-site parking",
    "Township swimming pool",
    "Pets welcome with prior approval",
    "Self check-in with building staff",
    "Smoke alarm, carbon monoxide alarm, fire extinguisher and first aid kit",
  ],
};
