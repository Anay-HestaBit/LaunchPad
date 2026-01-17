const winston = require('winston');
const config = require('../config/index.js');

const transports = [];

transports.push(
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.timestamp(),
      config.logs.level === 'debug'
        ? winston.format.colorize()
        : winston.format.json()
    ),
  })
);

const logger = winston.createLogger({
  level: config.logs.level,
  levels: winston.config.npm.levels,
  transports,
});

module.exports = logger;
