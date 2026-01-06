import express from 'express';
import logger from '../utils/logger.js';
import { connectDB } from './db.js';
import mountRoutes from '../routes/index.js';
import errorMiddleware from '../middlewares/error.middleware.js';
import {
  apiRateLimiter,
  securityHeaders,
  corsPolicy,
} from '../middlewares/security.js';
import { xssSanitize } from '../middlewares/xss.js';

export default async function appLoader() {
  logger.info('Bootstrapping application');

  const app = express();
  `z`;
  app.use(express.json({ limit: '10kb' }));
  app.use(express.urlencoded({ extended: true }));
  app.use(securityHeaders);
  app.use(corsPolicy);
  app.use(apiRateLimiter);
  app.use(xssSanitize);
  logger.info('Middlewares loaded');
  await connectDB();

  const routeCount = mountRoutes(app);
  logger.info(`Routes mounted: ${routeCount} modules`);

  app.use(errorMiddleware);
  return app;
}
