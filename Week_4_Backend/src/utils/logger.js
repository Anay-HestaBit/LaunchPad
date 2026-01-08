import pino from 'pino';
import path from 'path';
import fs from 'fs';

const logDir = path.join(process.cwd(), 'logs');

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

const streams = [
  {
    level: 'info',
    stream: fs.createWriteStream(path.join(logDir, 'app.log'), { flags: 'a' }),
  },
  {
    level: 'error',
    stream: fs.createWriteStream(path.join(logDir, 'error.log'), {
      flags: 'a',
    }),
  },
];

const logger = pino(
  {
    level: process.env.LOG_LEVEL || 'info',
    timestamp: pino.stdTimeFunctions.isoTime,
  },
  pino.multistream(streams)
);

export default logger;
