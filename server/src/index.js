import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import passport from 'passport';
import connectDB from './config/db.js';

// Load Env
dotenv.config();

// Initialize Passport Strategies
import './config/passport.js';

// Route Imports
import authRoutes from './routes/auth.js';
import componentRoutes from './routes/components.js';
import categoryRoutes from './routes/categories.js';
import paymentRoutes from './routes/payments.js';
import adminRoutes from './routes/admin.js';

// Connect DB
connectDB();

const app = express();

// CORS Settings for Monorepo Ports
const allowedOrigins = [
  process.env.CLIENT_URL || 'http://localhost:5173',
  process.env.ADMIN_URL || 'http://localhost:5174',
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, or postman)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());

// Mounted REST API Routers
app.use('/api/auth', authRoutes);
app.use('/api/components', componentRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/admin', adminRoutes);

// Base Status Endpoint
app.get('/', (req, res) => {
  res.json({
    name: 'PrathamUI REST API',
    status: 'online',
    systemTime: new Date(),
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error stack:', err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
});

// Launch server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`PrathamUI Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
