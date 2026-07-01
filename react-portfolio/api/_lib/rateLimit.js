const WINDOW_MS = 60 * 60 * 1000;
const MAX_REQUESTS = 15;
const requestLog = new Map();

function pruneOldRequests(timestamps, now) {
  return timestamps.filter((time) => now - time < WINDOW_MS);
}

export function checkRateLimit(clientId) {
  const normalized = clientId || 'unknown';
  if (
    normalized === '127.0.0.1' ||
    normalized === '::1' ||
    normalized === '::ffff:127.0.0.1'
  ) {
    return { allowed: true, remaining: MAX_REQUESTS, retryAfter: 0 };
  }

  const now = Date.now();
  const key = normalized;
  const existing = pruneOldRequests(requestLog.get(key) || [], now);

  if (existing.length >= MAX_REQUESTS) {
    const retryAfter = Math.ceil((existing[0] + WINDOW_MS - now) / 1000);
    return { allowed: false, retryAfter, remaining: 0 };
  }

  existing.push(now);
  requestLog.set(key, existing);

  return {
    allowed: true,
    remaining: MAX_REQUESTS - existing.length,
    retryAfter: 0,
  };
}

export function getClientIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.length > 0) {
    return forwarded.split(',')[0].trim();
  }
  return req.socket?.remoteAddress || 'unknown';
}
