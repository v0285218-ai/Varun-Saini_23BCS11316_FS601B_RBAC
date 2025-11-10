let hits = {};

export const rateLimit = (limit = 50, windowMs = 60_000) => {
  return (req, res, next) => {
    const ip = req.ip;
    const now = Date.now();

    if (!hits[ip]) hits[ip] = [];

    hits[ip] = hits[ip].filter(ts => now - ts < windowMs);

    if (hits[ip].length >= limit) {
      return res.status(429).json({ error: "Too many requests" });
    }

    hits[ip].push(now);
    next();
  };
};
