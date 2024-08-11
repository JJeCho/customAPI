let requests = {};
const throttle = (req, res, next) => {
  const now = Date.now();
  const resetTime = 60000; // 1 minute
  const maxRequests = 60; // 60 requests per minute

  if (!requests[req.ip]) {
    requests[req.ip] = { count: 1, startTime: now };
  } else {
    requests[req.ip].count++;
  }

  if (now - requests[req.ip].startTime > resetTime) {
    requests[req.ip].count = 1;
    requests[req.ip].startTime = now;
  }

  if (requests[req.ip].count > maxRequests) {
    return res.status(429).send('Too many requests - please try again later.');
  }

  next();
};
