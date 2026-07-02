const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const cors = require('cors');
const compression = require('compression');
const morgan = require('morgan');

const config = require('./config/environment');
const { securityHeaders, apiLimiter, sanitizeData } = require('./middlewares/security');
const errorHandler = require('./middlewares/errorHandler');
const logger = require('./utils/logger');

// 1. Initialize Express App
const app = express();
const server = http.createServer(app);

// 2. Setup Real-time Infrastructure (Preserving current implementation capabilities)
const io = socketio(server, {
  cors: {
    origin: config.cors.origin,
    methods: ['GET', 'POST']
  }
});

// 3. Attach Global Security & Performance Middlewares
app.use(securityHeaders);
app.use(cors({ origin: config.cors.origin, credentials: true }));
app.use(compression()); // Gzip payload compression
app.use(express.json({ limit: '10kb' })); // Guard against oversized payload attacks
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(sanitizeData); // Prevents MongoDB Operator Injection

if (config.env === 'development') {
  app.use(morgan('dev'));
}

// 4. API Throttling Wrapper
app.use('/api/', apiLimiter);

// --- PLACE YOUR EXISTING ROUTES HERE ---
// e.g., app.use('/api/auth', authRoutes);
// ---------------------------------------

// 5. Fallback Catch-all Handler (404)
app.use((req, res, next) => {
  res.status(404).json({ success: false, message: `Cannot find ${req.originalUrl} on this server` });
});

// 6. Global Error Interceptor Pipeline
app.use(errorHandler);

// 7. Database Initialization & Bootstrap Execution
const mongoose = require('mongoose');
mongoose.connect(config.mongoose.url, config.mongoose.options)
  .then(() => {
    logger.info('Successfully established secure connection to MongoDB clusters.');
    server.listen(config.port, () => {
      logger.info(`Production-ready server deploying smoothly on port: ${config.port} inside [${config.env}] environment.`);
    });
  })
  .catch((err) => {
    logger.error('Database connection critical drop initialization error:', err);
    process.exit(1);
  });

module.exports = { app, server, io };