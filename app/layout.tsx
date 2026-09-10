import type { Metadata } from "next";
import { Sora, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { getSiteUrl } from "@/lib/site-url";

const siteUrl = getSiteUrl();
const siteOrigin = siteUrl.origin;

const siteDescription =
  "Personal site for Eric Hancock in Brooklyn, NY, with software work, photography, and contact information.";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Eric Hancock",
  url: siteOrigin,
  description: siteDescription,
  jobTitle: "Software engineering leader",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Brooklyn",
    addressRegion: "NY",
    addressCountry: "US",
  },
  knowsAbout: [
    "Financial systems",
    "Payment systems",
    "Distributed systems",
    "Software engineering leadership",
    "Photography",
    "AWS",
    "Java",
    "Python",
    "C#",
  ],
};

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: "Eric Hancock | Brooklyn, NY Software Engineer",
    template: "%s | Eric Hancock",
  },
  description: siteDescription,
  applicationName: "Eric Hancock",
  authors: [{ name: "Eric Hancock", url: siteOrigin }],
  creator: "Eric Hancock",
  publisher: "Eric Hancock",
  keywords: [
    "Eric Hancock",
    "Eric Hancock Brooklyn",
    "Eric Hancock Brooklyn NY",
    "Brooklyn NY software engineer",
    "New York software engineering leader",
    "financial systems engineer",
    "payments engineering",
    "distributed systems leadership",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: "Eric Hancock",
    title: "Eric Hancock | Brooklyn, NY Software Engineer",
    description: siteDescription,
    url: "/",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Eric Hancock | Brooklyn, NY Software Engineer",
    description: siteDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${sora.variable} ${sourceSerif.variable}`}>
      <body className="site-body">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <div className="site-shell">
          <a href="#main-content" className="skip-link">
            Skip to content
          </a>
          <SiteHeader />
          <main id="main-content" className="site-main" tabIndex={-1}>
            {children}
          </main>
          <footer className="site-footer">
            <p>Eric Hancock - Brooklyn, NY</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
