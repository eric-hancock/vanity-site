import type { Metadata } from "next";
import { Sora, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { getSiteUrl } from "@/lib/site-url";

const siteUrl = getSiteUrl();

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
    default: "Eric Hancock",
    template: "%s | Eric Hancock",
  },
  description:
    "Building and leading reliable financial systems with distributed teams.",
  applicationName: "Eric Hancock",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: "Eric Hancock",
    title: "Eric Hancock",
    description:
      "Building and leading reliable financial systems with distributed teams.",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Eric Hancock",
    description:
      "Building and leading reliable financial systems with distributed teams.",
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
        <div className="site-shell">
          <a href="#main-content" className="skip-link">
            Skip to content
          </a>
          <SiteHeader />
          <main id="main-content" className="site-main" tabIndex={-1}>
            {children}
          </main>
          <footer className="site-footer">
            <p>New York, NY</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
