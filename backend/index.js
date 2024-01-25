import express from 'express';
import 'dotenv/config.js';
import cookieParser from 'cookie-parser';

import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import postRoutes from './routes/postRoutes.js';

import connectDB from './config/database.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';

const port = process.env.PORT || 5000;
const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);

app.use(errorHandler);
app.use(notFound);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
