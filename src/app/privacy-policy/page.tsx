import type { Metadata } from "next";
import { PRIVACY } from "@/data/legal";
import { absoluteUrl } from "@/data/site";
import { PageIntro } from "@/components/layout/PageHero";
import { ProseSections } from "@/components/ui/Prose";

export const metadata: Metadata = {
  title: { absolute: PRIVACY.seo.title },
  description: PRIVACY.seo.description,
  alternates: { canonical: absoluteUrl("/privacy-policy") },
};

export default function PrivacyPage() {
  return (
    <>
      <PageIntro eyebrow={`Last updated ${PRIVACY.updated}`} title={PRIVACY.h1} lede={PRIVACY.intro} />
      <section className="container-x pb-24 sm:pb-32">
        <div className="max-w-3xl">
          <ProseSections sections={PRIVACY.sections} />
        </div>
      </section>
    </>
  );
}
