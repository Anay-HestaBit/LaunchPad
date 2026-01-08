import { randomUUID } from 'crypto';

export const requestTracing = (req, res, next) => {
  const requestId = req.headers['x-request-id'] || randomUUID();

  req.requestId = requestId;

  res.setHeader('X-Request-ID', requestId);

  next();
};
