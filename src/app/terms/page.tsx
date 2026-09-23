import type { Metadata } from "next";
import { TERMS } from "@/data/legal";
import { absoluteUrl } from "@/data/site";
import { PageIntro } from "@/components/layout/PageHero";
import { ProseSections } from "@/components/ui/Prose";

export const metadata: Metadata = {
  title: { absolute: TERMS.seo.title },
  description: TERMS.seo.description,
  alternates: { canonical: absoluteUrl("/terms") },
};

export default function TermsPage() {
  return (
    <>
      <PageIntro eyebrow={`Last updated ${TERMS.updated}`} title={TERMS.h1} lede="The short version: book in writing, bring ID, treat the suite like a home, and follow the township's rules." />
      <section className="container-x pb-24 sm:pb-32">
        <div className="max-w-3xl">
          <ProseSections sections={TERMS.items} numbered />
        </div>
      </section>
    </>
  );
}
