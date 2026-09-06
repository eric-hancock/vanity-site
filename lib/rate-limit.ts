type Entry = {
  count: number;
  resetAt: number;
};

type RateLimitResult = {
  allowed: boolean;
  retryAfterSeconds: number;
};

const buckets = new Map<string, Entry>();

function getLimitPerHour(): number {
  const value = Number(process.env.CONTACT_RATE_LIMIT_PER_HOUR ?? "10");
  if (Number.isNaN(value) || value < 1) {
    return 10;
  }
  return value;
}

function compact(now: number) {
  for (const [key, entry] of buckets.entries()) {
    if (entry.resetAt <= now) {
      buckets.delete(key);
    }
  }
}

export function checkContactRateLimit(key: string): RateLimitResult {
  const now = Date.now();
  compact(now);

  const limit = getLimitPerHour();
  const windowMs = 60 * 60 * 1000;
  const existing = buckets.get(key);

  if (!existing || existing.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  if (existing.count >= limit) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
    };
  }

  existing.count += 1;
  buckets.set(key, existing);

  return { allowed: true, retryAfterSeconds: 0 };
}
