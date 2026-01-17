const dotenv = require('dotenv');

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

module.exports = {
  port: process.env.PORT || 5000,
  databaseURL: process.env.MONGO_URI || 'mongodb://localhost:27017/taskflow',
  logs: {
    level: process.env.LOG_LEVEL || 'info',
  },
};
