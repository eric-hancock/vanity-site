import type { Metadata } from "next";
import { Sora, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Vanity Site",
    template: "%s | Vanity Site",
  },
  description: "Personal photography archive, notes, and contact.",
  applicationName: "Vanity Site",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: "Vanity Site",
    title: "Vanity Site",
    description: "Personal photography archive, notes, and contact.",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vanity Site",
    description: "Personal photography archive, notes, and contact.",
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
            <p>© {new Date().getFullYear()} Vanity Site</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
