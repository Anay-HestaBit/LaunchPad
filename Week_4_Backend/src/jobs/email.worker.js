import config from './config/index.js';
import logger from './utils/logger.js';
import appLoader from './loaders/app.js';
import { disconnectDB } from './loaders/db.js';

async function startServer() {
  const app = await appLoader();

  const server = app.listen(config.port, () => {
    logger.info(`Server started on Port ${config.port}`);
  });

  const shutDown = async (signal) => {
    logger.info({ signal }, 'Graceful ShutDown Started');

    try {
      await new Promise((resolve) => server.close(resolve));
      logger.info('HTTP server closed');

      await disconnectDB();
      logger.info('MongoDB disconnected');

      setTimeout(() => {
        logger.info('Process Exiting');
        process.exit(0);
      }, 200);
    } catch (err) {
      logger.error({ err }, 'Error during shutdown');
      process.exit(1);
    }
  };

  process.on('SIGINT', shutDown);
  process.on('SIGTERM', shutDown);
}

startServer();
