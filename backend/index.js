import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();

mongoose
  .connect(process.env.MONGO)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.log(error));

app.use(express.json());
app.use(cookieParser());

app.use("/backend/user", userRoutes);
app.use("/backend/auth", authRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});

export default app; // Export the app
