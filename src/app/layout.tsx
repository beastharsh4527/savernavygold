import type { Metadata } from "next";
import type { ReactNode } from "react";
import { fraunces, mono, outfit } from "./fonts";
import "./globals.css";
import { site } from "@/content/site";
import { offices } from "@/content/contact";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/experience/ScrollProgress";
import { isDemo } from "@/lib/utils";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s — ${site.name}` },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: site.title,
    description: site.description,
    url: site.url,
    images: [{ url: `${site.url}/og-image.png` }],
  },
  twitter: { card: "summary_large_image", site: site.twitter, title: site.title, description: site.description },
  // Demo deployments must not be indexed (would compete with the live client site).
  robots: isDemo ? { index: false, follow: false } : { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  logo: site.logo,
  email: site.email,
  contactPoint: [{ "@type": "ContactPoint", telephone: site.phoneUk, contactType: "customer service", email: site.email }],
  subOrganization: offices.map((o) => ({
    "@type": "LocalBusiness",
    name: `${site.name} — ${o.city}`,
    address: { "@type": "PostalAddress", streetAddress: o.address[0], addressLocality: o.city },
    telephone: o.lines[0].value,
  })),
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${outfit.variable} ${mono.variable}`}>
      <body>
        <a href="#main" className="sr-only z-[110] rounded-full bg-mint px-5 py-3 font-medium text-ink focus:not-sr-only focus:fixed focus:top-4 focus:left-4">
          Skip to content
        </a>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <SmoothScroll>
          <ScrollProgress />
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
