export const SITE = {
  name: "Aurora Elite Suites",
  monogram: "AES",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://auroraelitesuits.com",
  tagline: "Golf-view suites in Greater Noida",
  altLines: [
    "Wake up above the greens.",
    "Your home near Pari Chowk, with a view of the fairways.",
  ],
  oneLiner:
    "Fully furnished 2-bedroom suites at Godrej Golf Links, Greater Noida. Golf views, full kitchen, Wi-Fi, pool access. Near Pari Chowk and Expo Mart.",
  shortDescription:
    "Aurora Elite Suites are fully furnished two-bedroom apartments inside Godrej Golf Links, Greater Noida. Each suite sleeps four and comes with a full kitchen, high-speed Wi-Fi, a work desk and access to the township pool and gardens. Pari Chowk is 10 minutes away and India Expo Mart about 15.",
  longDescription:
    "Aurora Elite Suites is a small group of serviced two-bedroom apartments in Godrej Golf Links, the gated golf-course township in Sector 27, Greater Noida. We set them up for people who want the space of a home with the ease of a hotel: beds made with fresh linen, two bathrooms, a kitchen with everything in it, a desk you can work at all day, and a balcony that looks across the golf course and the green belt of Jaypee Greens. Guests use the township's swimming pool, clubhouse, gardens and walking tracks, and the building staff are on duty around the clock. Pari Chowk, India Expo Centre & Mart, Knowledge Park and the Noida Metro are all a short drive away.",
  phoneDisplay: "+91 99997 00602",
  phoneTel: "tel:+919999700602",
  whatsapp: "https://wa.me/919999700602",
  whatsappPrefilled:
    "https://wa.me/919999700602?text=Hi%2C%20I%27d%20like%20to%20check%20availability%20at%20Aurora%20Elite%20Suites.",
  email: "bookings@auroraelitesuits.com",
  emailLink:
    "mailto:bookings@auroraelitesuits.com?subject=Booking%20enquiry%20-%20Aurora%20Elite%20Suites",
  feedbackLink:
    "mailto:bookings@auroraelitesuits.com?subject=Feedback%20on%20my%20stay",
  address: {
    lines: [
      "Aurora Elite Suites",
      "Suites Tower 1, Godrej Golf Links",
      "Sector 27, Greater Noida",
      "Uttar Pradesh 201515, India",
    ],
    oneLine:
      "Suites Tower 1, Godrej Golf Links, Sector 27, Greater Noida, Uttar Pradesh 201515",
    street: "Suites Tower 1, Godrej Golf Links, Sector 27",
    locality: "Greater Noida",
    region: "Uttar Pradesh",
    postalCode: "201515",
    country: "IN",
  },
  maps: {
    search:
      "https://www.google.com/maps/search/?api=1&query=Godrej+Golf+Links+Sector+27+Greater+Noida",
    directions:
      "https://www.google.com/maps/dir/?api=1&destination=Godrej+Golf+Links+Sector+27+Greater+Noida",
    embed:
      "https://www.google.com/maps?q=Godrej+Golf+Links,+Sector+27,+Greater+Noida&output=embed",
  },
  airbnb: {
    golfView: "https://www.airbnb.co.in/rooms/1717913568700911850",
    elegant: "https://www.airbnb.co.in/rooms/1777398393615533202",
    reviews: "https://www.airbnb.co.in/users/show/1717897618793666665",
  },
  checkIn: { golfView: "12:00 noon", elegant: "2:00 PM" },
  checkOut: "10:00 AM",
  maxGuests: 4,
  checkInMethod: "Self check-in with the building staff (on duty 24 hours)",
  rating: { value: "5.0", count: 10, badge: "Airbnb Guest Favourite" },
  responseLine: "100% response rate, usually replies within an hour",
  geo: { lat: 28.4704, lng: 77.5307 },
  founded: 2026,
  disclaimer:
    "Aurora Elite Suites is an independent short-stay operator at Godrej Golf Links. We are not affiliated with or endorsed by Godrej Properties Ltd. or Airbnb. Distances and drive times are approximate.",
  footerBlurb:
    "Fully furnished two-bedroom suites at Godrej Golf Links, Greater Noida. Golf views, full kitchens and 24-hour building staff, minutes from Pari Chowk.",
} as const;

export interface NavItem {
  label: string;
  href: string;
  description?: string;
  imageId?: string;
}

export const NAV: NavItem[] = [
  { label: "Home", href: "/", description: "Golf-view suites in Greater Noida", imageId: "GV-VIEW-01" },
  { label: "Suites", href: "/suites", description: "Two complete two-bedroom homes", imageId: "GV-BR1-01" },
  { label: "Amenities", href: "/amenities", description: "Everything's already here", imageId: "GV-POOL-01" },
  { label: "Gallery", href: "/gallery", description: "167 real photos, no filters", imageId: "GV-LIV-02" },
  { label: "Location", href: "/location", description: "Minutes from Pari Chowk", imageId: "GV-SOC-03" },
  { label: "Reviews", href: "/reviews", description: "5.0 from ten Airbnb stays", imageId: "GV-VIEW-09" },
  { label: "FAQs", href: "/faqs", description: "Check-in, pets, parking, pool", imageId: "GV-KIT-01" },
  { label: "Contact", href: "/contact", description: "Tell us your dates", imageId: "GV-BAL-04" },
];

export const FOOTER_EXPLORE: NavItem[] = [
  { label: "Our Suites", href: "/suites" },
  { label: "Golf View Suite", href: "/suites/golf-view-suite" },
  { label: "Elegant Suite", href: "/suites/elegant-suite" },
  { label: "Amenities", href: "/amenities" },
  { label: "Gallery", href: "/gallery" },
  { label: "Location", href: "/location" },
  { label: "Reviews", href: "/reviews" },
  { label: "FAQs", href: "/faqs" },
  { label: "About Us", href: "/about" },
];

export const FOOTER_LEGAL: NavItem[] = [
  { label: "House Rules", href: "/house-rules" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Stay", href: "/terms" },
  { label: "Image Credits", href: "/image-credits" },
];

export function absoluteUrl(path: string): string {
  const base = SITE.url.replace(/\/$/, "");
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
