import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import buddyRoutes from './routes/buddyRoutes.js'

dotenv.config();

const app = express();
//middleware

app.use(cors());
app.use(express.json());
//databse
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/buddy', buddyRoutes);
//database


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
