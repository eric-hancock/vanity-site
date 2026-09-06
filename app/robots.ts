import type { MetadataRoute } from "next";
import { getSiteOrigin } from "@/lib/site-url";

const siteOrigin = getSiteOrigin();

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: `${siteOrigin}/sitemap.xml`,
  };
}
