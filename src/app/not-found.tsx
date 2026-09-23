import Link from "next/link";
import { img } from "@/data/images";
import { Button } from "@/components/ui/Button";
import { SmartImage } from "@/components/ui/SmartImage";

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[100svh] flex-col items-center justify-center py-32 text-center">
      <div className="relative mb-10 aspect-[4/3] w-full max-w-md overflow-hidden rounded-[6px]">
        <SmartImage image={img("GV-VIEW-06")} sizes="448px" className="absolute inset-0" />
      </div>
      <p className="eyebrow">404</p>
      <h1 className="display-lg mt-4 text-charcoal">This page wandered off the fairway.</h1>
      <p className="lede mt-5 max-w-[46ch]">The address may have changed. Head back home, or look at the suites.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button href="/">Back to home</Button>
        <Button href="/suites" variant="secondary">
          See the suites
        </Button>
      </div>
      <Link href="/contact" className="mt-8 font-sans text-[0.875rem] text-stone underline-offset-2 hover:underline">
        Or contact the team
      </Link>
    </section>
  );
}
