const FALLBACK_SITE_ORIGIN = "https://example.com";

function tryParseUrl(value: string): URL | null {
  try {
    return new URL(value);
  } catch {
    return null;
  }
}

export function getSiteUrl(): URL {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (!raw) {
    return new URL(FALLBACK_SITE_ORIGIN);
  }

  const direct = tryParseUrl(raw);
  if (direct) {
    return direct;
  }

  const withHttps = tryParseUrl(`https://${raw}`);
  if (withHttps) {
    return withHttps;
  }

  return new URL(FALLBACK_SITE_ORIGIN);
}

export function getSiteOrigin(): string {
  return getSiteUrl().origin;
}
