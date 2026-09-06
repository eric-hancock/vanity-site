import type { NextConfig } from "next";

const r2BaseUrl = process.env.R2_PUBLIC_BASE_URL;
type RemotePattern = {
  protocol?: "http" | "https";
  hostname: string;
  port?: string;
  pathname?: string;
  search?: string;
};

let remotePatterns: RemotePattern[] = [];

if (r2BaseUrl) {
  try {
    const parsed = new URL(r2BaseUrl);
    remotePatterns = [
      {
        protocol: parsed.protocol.replace(":", "") as "http" | "https",
        hostname: parsed.hostname,
        pathname: "/**",
      },
    ];
  } catch {
    // Ignore invalid URL values and continue with local-only image config.
  }
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns,
  },
};

export default nextConfig;
