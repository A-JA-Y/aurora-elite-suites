import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { SITE, absoluteUrl } from "@/data/site";
import { HOME } from "@/data/home";
import { img } from "@/data/images";
import { lodgingBusinessSchema } from "@/lib/schema";
import { JsonLd } from "@/components/ui/JsonLd";
import { Providers } from "@/components/layout/Providers";
import { Preloader } from "@/components/layout/Preloader";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { Header } from "@/components/layout/Header";
import { MenuOverlay } from "@/components/layout/MenuOverlay";
import { Footer } from "@/components/layout/Footer";
import { MobileDock } from "@/components/layout/MobileDock";
import { Assistant } from "@/components/assistant/Assistant";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: HOME.seo.title,
    template: "%s | Aurora Elite Suites",
  },
  description: HOME.seo.description,
  applicationName: SITE.name,
  keywords: [
    "serviced apartments in Greater Noida",
    "luxury stay in Greater Noida",
    "stay near India Expo Mart",
    "service apartment near Pari Chowk",
    "Godrej Golf Links stay",
    "2BHK apartment on rent per day Greater Noida",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: SITE.name,
    title: HOME.seo.ogTitle,
    description: HOME.seo.ogDescription,
    url: absoluteUrl("/"),
    images: [{ url: img(HOME.seo.ogImageId).src, width: 1200, height: 900, alt: img(HOME.seo.ogImageId).alt }],
  },
  twitter: {
    card: "summary_large_image",
    title: HOME.seo.ogTitle,
    description: HOME.seo.ogDescription,
    images: [img(HOME.seo.ogImageId).src],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: absoluteUrl("/") },
  formatDetection: { telephone: true, email: true, address: true },
};

export const viewport: Viewport = {
  themeColor: "#faf7f2",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const preloadScript = `try{if(sessionStorage.getItem('aes-preloaded')==='1'||matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('no-preload')}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${cormorant.variable} ${manrope.variable} h-full antialiased`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: preloadScript }} />
        <style>{`html.no-preload #preloader{display:none}`}</style>
        <JsonLd data={lodgingBusinessSchema()} />
      </head>
      <body className="flex min-h-full flex-col">
        <Providers>
          <Preloader />
          <CustomCursor />
          <Header />
          <MenuOverlay />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
          <MobileDock />
          <Assistant />
        </Providers>
      </body>
    </html>
  );
}
