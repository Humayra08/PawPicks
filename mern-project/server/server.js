import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import connectDb from './db/connect.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express();

// ----- CORS (allow React dev server) -----
app.use(cors({
  origin: ['http://localhost:3000'],
  credentials: true,
}));

// Body parser
app.use(express.json());

// DB
connectDb();

// Static files (serve uploaded avatars)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/users', userRoutes);

app.get('/', (req, res) => res.send('MERN backend is live'));

// Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
