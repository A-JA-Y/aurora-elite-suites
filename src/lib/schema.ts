import { SITE, absoluteUrl } from "@/data/site";
import { img } from "@/data/images";
import type { Faq } from "@/data/faqs";

export function lodgingBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    "@id": `${absoluteUrl("/")}#lodging`,
    name: SITE.name,
    description:
      "Fully furnished two-bedroom serviced suites at Godrej Golf Links, Sector 27, Greater Noida, with a full kitchen, high-speed Wi-Fi, a dedicated workspace and access to the township pool and gardens.",
    url: absoluteUrl("/"),
    telephone: "+91-99997-00602",
    email: SITE.email,
    image: ["GV-VIEW-01", "GV-LIV-02", "GV-BR1-01", "GV-POOL-01", "GV-KIT-01"].map((id) => img(id).src),
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.locality,
      addressRegion: SITE.address.region,
      postalCode: SITE.address.postalCode,
      addressCountry: SITE.address.country,
    },
    geo: { "@type": "GeoCoordinates", latitude: SITE.geo.lat, longitude: SITE.geo.lng },
    hasMap: SITE.maps.search,
    checkinTime: "12:00",
    checkoutTime: "10:00",
    numberOfRooms: 2,
    petsAllowed: true,
    amenityFeature: [
      "Free Wi-Fi",
      "Dedicated workspace",
      "Air conditioning",
      "Fully equipped kitchen",
      "Smart TV",
      "Free parking",
      "Swimming pool",
      "Clubhouse access",
      "Private balcony",
      "Hot water",
      "24-hour building staff",
      "Self check-in",
      "Pets allowed with prior approval",
    ].map((name) => ({ "@type": "LocationFeatureSpecification", name, value: true })),
    containsPlace: [
      {
        "@type": "Suite",
        name: "The Golf View Suite",
        url: absoluteUrl("/suites/golf-view-suite"),
        numberOfBedrooms: 2,
        numberOfBathroomsTotal: 2,
        occupancy: { "@type": "QuantitativeValue", maxValue: 4 },
        bed: [
          { "@type": "BedDetails", typeOfBed: "King bed", numberOfBeds: 1 },
          { "@type": "BedDetails", typeOfBed: "Single bed", numberOfBeds: 1 },
        ],
        petsAllowed: true,
        smokingAllowed: false,
        image: img("GV-BR1-01").src,
      },
      {
        "@type": "Suite",
        name: "The Elegant Suite",
        url: absoluteUrl("/suites/elegant-suite"),
        numberOfBedrooms: 2,
        numberOfBathroomsTotal: 2,
        occupancy: { "@type": "QuantitativeValue", maxValue: 4 },
        bed: [{ "@type": "BedDetails", typeOfBed: "Single bed", numberOfBeds: 3 }],
        petsAllowed: true,
        smokingAllowed: false,
        image: img("ES-01").src,
      },
    ],
    sameAs: [SITE.airbnb.golfView, SITE.airbnb.elegant],
  };
}

export function faqSchema(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
