import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDb from './db/connect.js';
import userRoutes from './routes/userRoutes.js'; 

dotenv.config();  

const app = express();

app.use(cors());
app.use(express.json());  
app.use((req,res,next) => { console.log(req.method, req.path); next(); });


connectDb();


app.use('/api/users', userRoutes);


app.get('/', (req, res) => {
  res.send('Welcome to the MERN backend!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
