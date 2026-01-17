const express = require('express');
const config = require('./src/config');
const logger = require('./src/utils/logger');
const mongooseLoader = require('./src/loaders/mongoose');
const expressLoader = require('./src/loaders/express');

async function startServer() {
  const app = express();

  await mongooseLoader();
  logger.info('MongoDB Loaded and Connected!');

  expressLoader({ app });
  logger.info('Express Loaded!');

  const server = app.listen(config.port, () => {
    logger.info(`Server listening on port: ${config.port}`);
  });
  const gracefulShutdown = (signal) => {
    logger.info(`${signal} signal received: closing HTTP server`);

    server.close(async () => {
      logger.info('HTTP server closed');

      const mongoose = require('mongoose');
      try {
        await mongoose.connection.close(false);
        logger.info('MongoDB connection closed');
        process.exit(0);
      } catch (err) {
        logger.error('Error during shutdown', err);
        process.exit(1);
      }
    });
  };
  process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
  process.on('SIGINT', () => gracefulShutdown('SIGINT'));
}

startServer();
