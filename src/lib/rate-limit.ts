// In-memory token bucket — demo-grade (per serverless instance), fine for a demo deployment.
const buckets = new Map<string, { tokens: number; last: number }>();

export function checkRateLimit(key: string, limit = 10, windowMs = 60_000): boolean {
  const now = Date.now();
  const b = buckets.get(key) ?? { tokens: limit, last: now };
  b.tokens = Math.min(limit, b.tokens + ((now - b.last) / windowMs) * limit);
  b.last = now;
  if (b.tokens < 1) {
    buckets.set(key, b);
    return false;
  }
  b.tokens -= 1;
  buckets.set(key, b);
  if (buckets.size > 5000) buckets.clear(); // crude memory cap
  return true;
}
