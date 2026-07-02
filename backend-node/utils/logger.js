const { env } = require('../config/environment');

const logger = {
  info: (msg, meta = '') => {
    console.log(`[INFO] [${new Date().toISOString()}] ${msg}`, meta);
  },
  error: (msg, error = '') => {
    console.error(`[ERROR] [${new Date().toISOString()}] ${msg}`, error.stack || error);
  },
  warn: (msg, meta = '') => {
    console.warn(`[WARN] [${new Date().toISOString()}] ${msg}`, meta);
  },
  debug: (msg, meta = '') => {
    if (env === 'development') {
      console.log(`[DEBUG] [${new Date().toISOString()}] ${msg}`, meta);
    }
  }
};

module.exports = logger;