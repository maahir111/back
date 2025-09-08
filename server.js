import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import testimonialRoutes from './routes/testimonialRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import authRoutes from './routes/authRoutes.js';
// import uploadRoutes from "./routes/uploadRoutes.js";
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;
const MONGO_URI = process.env.MONGO_URI;

// Resolve __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve static files from uploads folder
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB connection with better error handling
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected successfully!'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// MongoDB connection events
mongoose.connection.on('error', err => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

// Routes
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/auth', authRoutes);
// app.use("/api/upload", uploadRoutes);

// Basic route
app.get('/', (req, res) => {
  res.json({ 
    message: 'API is running...',
    version: '1.0.0',
    endpoints: {
      testimonials: '/api/testimonials',
      projects: '/api/projects',
      auth: '/api/auth'
    }
  });
});

// 404 handler for undefined routes
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  
  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(e => e.message);
    return res.status(400).json({ 
      message: 'Validation Error', 
      errors 
    });
  }
  
  // Mongoose duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(400).json({ 
      message: `${field} already exists` 
    });
  }
  
  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ message: 'Invalid token' });
  }
  
  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({ message: 'Token expired' });
  }
  
  // Default error
  res.status(err.status || 500).json({ 
    message: err.message || 'Internal server error' 
  });
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  // Close server & exit process
  server.close(() => {
    process.exit(1);
  });
});

// Start the server
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    mongoose.connection.close();
    console.log('Process terminated');
  });
});








// import express from 'express';
// import mongoose from 'mongoose';
// import cors from 'cors';
// import path from 'path';
// import testimonialRoutes from './routes/testimonialRoutes.js';
// import projectRoutes from './routes/projectRoutes.js';
// import authRoutes from './routes/authRoutes.js';
// // import uploadRoutes from "./routes/uploadRoutes.js";
// import dotenv from 'dotenv';

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 8080;
// const MONGO_URI = process.env.MONGO_URI;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Serve static files from uploads folder
// // app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// // Connect to MongoDB
// mongoose.connect(MONGO_URI)
//   .then(() => console.log('MongoDB connected successfully!'))
//   .catch(err => {
//     console.error('MongoDB connection error:', err);
//     process.exit(1);
//   });

// // Routes
// app.use('/api/testimonials', testimonialRoutes);
// app.use('/api/projects', projectRoutes);
// app.use('/api/auth', authRoutes);
// // app.use("/api/upload", uploadRoutes);

// // Basic route
// app.get('/', (req, res) => {
//   res.send('API is running...');
// });

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ message: 'Something went wrong!' });
// });

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
