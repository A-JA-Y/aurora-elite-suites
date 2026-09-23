import type { Metadata } from "next";
import { ALL_FAQS } from "@/data/faqs";
import { absoluteUrl } from "@/data/site";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageIntro } from "@/components/layout/PageHero";
import { FaqList } from "@/components/faqs/FaqList";
import { FinalCta } from "@/components/home/FinalCta";

export const metadata: Metadata = {
  title: { absolute: "FAQs | Aurora Elite Suites, Greater Noida" },
  description: "Check-in times, ID, parking, Wi-Fi, pool access, pets, airport distances and booking. Answers to common questions about Aurora Elite Suites.",
  alternates: { canonical: absoluteUrl("/faqs") },
};

export default function FaqsPage() {
  return (
    <>
      <JsonLd data={faqSchema(ALL_FAQS)} />
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "FAQs", path: "/faqs" }])} />
      <PageIntro eyebrow={`${ALL_FAQS.length} questions, answered`} title="Frequently Asked Questions" lede="Can't find what you're looking for? WhatsApp us on +91 99997 00602 and we'll answer within the hour." />
      <section className="container-x pb-24 sm:pb-32">
        <FaqList />
      </section>
      <FinalCta />
    </>
  );
}
