export interface AmenitySection {
  id: string;
  title: string;
  items: string[];
  imageIds: string[];
  note?: string;
}

export const AMENITIES_PAGE = {
  seo: {
    title: "Amenities | Aurora Elite Suites, Greater Noida",
    description:
      "Wi-Fi, workspace, full kitchen, AC, Smart TV, rain showers, free parking, pool and clubhouse access. See everything included at Aurora Elite Suites.",
  },
  h1: "Amenities",
  intro:
    "Everything you'd expect from a good hotel, plus what a hotel can't give you: a full kitchen, a second bedroom and a balcony over the greens.",
  bannerImageId: "GV-POOL-01",
};

export const AMENITY_SECTIONS: AmenitySection[] = [
  {
    id: "suite",
    title: "In the suite",
    items: [
      "Two bedrooms and two bathrooms",
      "Plush bedding with extra pillows and blankets",
      "Wardrobes, clothes storage and hangers",
      "Air conditioning (heating in the Golf View Suite)",
      "Smart TV",
      "Full-length curtains",
      "Private balcony with golf-course views (Golf View Suite)",
    ],
    imageIds: ["GV-LIV-01"],
  },
  {
    id: "kitchen",
    title: "Kitchen and dining",
    items: [
      "L-shaped modular kitchen with granite counters",
      "Three-burner glass-top gas hob and induction cooktop",
      "Chimney, microwave and refrigerator",
      "Non-stick cookware, crockery and cutlery",
      "Cooking basics: oil, salt and pepper",
      "Dining table and breakfast bar",
    ],
    imageIds: ["GV-KIT-04", "GV-KIT-16"],
  },
  {
    id: "bathrooms",
    title: "Bathrooms",
    items: [
      "Rain shower with hot and cold water",
      "Geyser in each bathroom",
      "Health faucet",
      "Fresh towels, shower gel and toiletries",
      "Cleaning products",
    ],
    imageIds: ["GV-BTH-01"],
  },
  {
    id: "work",
    title: "Work and connectivity",
    items: ["High-speed Wi-Fi", "Dedicated desk with an ergonomic mesh chair"],
    imageIds: ["GV-WRK-01"],
  },
  {
    id: "laundry",
    title: "Laundry",
    items: ["Washing machine (Elegant Suite)"],
    imageIds: [],
  },
  {
    id: "township",
    title: "Around the township",
    note: "As per society rules and timings",
    items: [
      "Swimming pool",
      "Clubhouse",
      "Landscaped gardens and walking tracks",
      "Children's play area",
      "Open-air gym",
      "Lobby and lifts",
      "Free on-site parking",
    ],
    imageIds: ["GV-POOL-02", "GV-SOC-01", "GV-SOC-14", "GV-SOC-13"],
  },
  {
    id: "safety",
    title: "Safety and security",
    items: [
      "Gated township with building staff on duty 24 hours",
      "CCTV at the main gate, building entrance, parking, lift lobby and common corridors. There are no cameras inside the suites.",
      "Smoke alarm and carbon monoxide alarm",
      "Fire extinguisher and first aid kit",
    ],
    imageIds: [],
  },
  {
    id: "services",
    title: "Services",
    items: [
      "Self check-in with the building staff",
      "Professional cleaning before every check-in",
      "Quick replies on call and WhatsApp (usually within an hour)",
      "Weekly and monthly stays on request",
      "Pets welcome with prior approval; assistance animals always allowed",
    ],
    imageIds: [],
  },
];

/** The 12-icon snapshot on the home page. Icon keys map to lucide icons. */
export const AMENITY_SNAPSHOT: { label: string; icon: string }[] = [
  { label: "High-speed Wi-Fi", icon: "wifi" },
  { label: "Dedicated workspace", icon: "laptop" },
  { label: "Air conditioning", icon: "snowflake" },
  { label: "Smart TV", icon: "tv" },
  { label: "Full kitchen", icon: "chef-hat" },
  { label: "Fridge and microwave", icon: "refrigerator" },
  { label: "Hot water and rain shower", icon: "shower-head" },
  { label: "Fresh towels and toiletries", icon: "sparkles" },
  { label: "Free parking", icon: "car" },
  { label: "Swimming pool", icon: "waves" },
  { label: "Clubhouse and gardens", icon: "trees" },
  { label: "24-hour building staff", icon: "shield-check" },
];
