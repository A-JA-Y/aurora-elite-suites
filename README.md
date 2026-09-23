# Aurora Elite Suites

Marketing website for **Aurora Elite Suites**, two fully furnished two-bedroom serviced suites at Godrej Golf Links, Sector 27, Greater Noida.

Built with Next.js 16 (App Router), React 19, Tailwind CSS v4, GSAP (ScrollTrigger + SplitText), Framer Motion and Lenis smooth scrolling. The on-site assistant ("Aurora") answers only from the website's own content using a small BM25 retriever and Groq for generation.

## Pages

| Route | Content |
| --- | --- |
| `/` | Hero slideshow, trust strip, welcome, why-us, suites, pinned "view" gallery, amenities, who stays, location, reviews, gallery strip, FAQs, CTA |
| `/suites` | Both suites with a side-by-side comparison |
| `/suites/golf-view-suite` · `/suites/elegant-suite` | Hero photo grid, rating, room by room, sleeping, inclusions, sticky booking box |
| `/amenities` · `/gallery` · `/location` · `/reviews` · `/about` · `/faqs` · `/house-rules` · `/contact` | Content pages from the brief |
| `/privacy-policy` · `/terms` · `/image-credits` | Legal pages and Wikimedia attributions |
| `/api/chat` | Streaming assistant endpoint (Groq), with a retrieval-only fallback when no key is set |
| `/api/enquiry` | Contact form endpoint (optional email via Resend, otherwise WhatsApp hand-off) |

`sitemap.xml`, `robots.txt`, `manifest.webmanifest`, Open Graph tags and JSON-LD (LodgingBusiness, FAQPage, BreadcrumbList) are generated.

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

```bash
npm run lint      # eslint
npx tsc --noEmit  # typecheck
npm run build     # production build
```

## Environment variables

Copy `.env.example` to `.env.local` for local work, or add the variables in the Vercel project settings.

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | recommended | Canonical origin used for metadata and the sitemap (default `https://auroraelitesuits.com`) |
| `GROQ_API_KEY` | for the AI assistant | Groq API key. Without it the assistant still answers from the FAQ/site index, but without generation |
| `GROQ_MODEL` | optional | Defaults to `llama-3.3-70b-versatile` |
| `RESEND_API_KEY` | optional | If set, enquiry form submissions are emailed via Resend |
| `ENQUIRY_TO_EMAIL` | optional | Recipient for enquiries (default `bookings@auroraelitesuits.com`) |
| `ENQUIRY_FROM_EMAIL` | optional | Verified sender for Resend |

Without `RESEND_API_KEY`, a submitted enquiry is acknowledged and the guest is offered a pre-filled WhatsApp message so no enquiry is lost.

## Deploying to Vercel

1. Import the repository in Vercel (framework preset: Next.js, no special build settings).
2. Add `GROQ_API_KEY` (and any optional variables above) under **Settings → Environment Variables**.
3. Deploy. Images are served directly from the Airbnb and Wikimedia CDNs through a custom `next/image` loader, so Vercel image optimization is not used.

## How the assistant stays on-topic

- `src/lib/knowledge.ts` turns the same data files that render the pages into ~90 text chunks.
- `src/lib/retrieval.ts` ranks them with BM25 plus a synonym map (for example "wifi" → "Wi-Fi", "price" → "rate").
- `src/app/api/chat/route.ts` sends only the top chunks to Groq with a system prompt that forbids answering outside them, and streams the reply. Rates and availability are always redirected to WhatsApp.

## Content and images

All copy, image URLs, alt text and credits come from the client brief (`content.txt`). Photos with `GV-` and `ES-` IDs are © Aurora Elite Suites; `EXT-` photos are Wikimedia Commons and are credited on `/image-credits` and in captions.

> Before launch the brief recommends downloading the Airbnb-hosted photos and self-hosting them as WebP, since the current URLs depend on the listings staying live. The loader in `src/lib/image-loader.ts` is the single place to change when that happens.
