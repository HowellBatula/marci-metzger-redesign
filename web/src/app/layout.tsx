import type { Metadata } from "next";
import { Instrument_Sans, Instrument_Serif } from "next/font/google";
import { LenisProvider } from "@/lib/lenis-provider";
import { PageCover } from "@/components/ui/PageCover";
import { SiteNav } from "@/components/nav/SiteNav";
import { CookieBanner } from "@/components/ui/CookieBanner";
import { OFFICE_HOURS } from "@/lib/office-hours";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
});

// Instrument Serif ships one weight (400) and an italic — that's the whole
// point of the pairing: same foundry, same proportions as Instrument Sans,
// so the two read as one considered family rather than a bolted-on display
// face. Carries every h1/h2/h3 (see globals.css); body/UI stays sans.
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: "400",
  subsets: ["latin"],
});

const SITE_URL = "https://marcimetzgerhomes.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Marci Metzger | Pahrump Realtor, The Ridge Realty Group",
  description:
    "Marci Metzger — Pahrump, NV. Over two decades in real estate, now serving Southern Nevada with The Ridge Realty Group.",
  openGraph: {
    title: "Marci Metzger | Pahrump Realtor, The Ridge Realty Group",
    description:
      "Marci Metzger — Pahrump, NV. Over two decades in real estate, now serving Southern Nevada with The Ridge Realty Group.",
    url: SITE_URL,
    siteName: "Marci Metzger Homes",
    images: ["/img/hero-mountain-falls-pond.jpg"],
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: "Marci Metzger — The Ridge Realty Group",
  telephone: "+1-206-919-6886",
  address: {
    "@type": "PostalAddress",
    streetAddress: "3190 HW-160, Suite F",
    addressLocality: "Pahrump",
    addressRegion: "NV",
    postalCode: "89048",
    addressCountry: "US",
  },
  url: SITE_URL,
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [...OFFICE_HOURS.days],
      opens: OFFICE_HOURS.opens,
      closes: OFFICE_HOURS.closes,
    },
  ],
  sameAs: [
    "https://www.facebook.com/MarciHomes/",
    "https://www.instagram.com/marcimetzger_theridge/",
    "https://www.linkedin.com/in/marci-metzger-30642496/",
    "https://www.yelp.com/biz/xr3yQN_m2SgO0R_7S6p62w",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${instrumentSans.variable} ${instrumentSerif.variable} h-full`}
    >
      <body className="flex min-h-full flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <PageCover />
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <LenisProvider>
          <SiteNav />
          <main id="main">{children}</main>
          <CookieBanner />
        </LenisProvider>
      </body>
    </html>
  );
}
