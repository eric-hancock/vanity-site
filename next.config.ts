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

function tryParseUrl(value: string): URL | null {
  try {
    return new URL(value);
  } catch {
    return null;
  }
}

if (r2BaseUrl) {
  const parsed = tryParseUrl(r2BaseUrl) ?? tryParseUrl(`https://${r2BaseUrl}`);

  if (parsed) {
    remotePatterns = [
      {
        protocol: parsed.protocol.replace(":", "") as "http" | "https",
        hostname: parsed.hostname,
        pathname: "/**",
      },
    ];
  }
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns,
  },
};

export default nextConfig;
