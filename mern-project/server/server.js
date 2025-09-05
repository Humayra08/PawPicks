import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDb from './db/connect.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();  // Load environment variables from .env

const app = express();

// CORS Configuration
const corsOptions = {
  origin: 'http://localhost:3000',  // Allow requests from the frontend
  methods: ['GET', 'POST'],  // Allow specific HTTP methods (GET, POST)
  allowedHeaders: ['Content-Type', 'Authorization'],  // Allow headers for Content-Type and Authorization (for JWT)
  credentials: true,  // Allow credentials (cookies, etc.)
};

app.use(cors(corsOptions));  // Apply CORS configuration
app.use(express.json());  // Enable JSON parsing for incoming requests

// Connect to the database
connectDb();

// Routes
app.use('/api/users', userRoutes);  // User routes for login, registration, etc.

// Test route
app.get('/', (req, res) => {
  res.send('Welcome to the MERN backend!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
