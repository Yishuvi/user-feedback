import express from 'express';
import dotenv from 'dotenv';
import connectMongoDB from './config/connectMongoDB.js';
import userRoutes from './routes/userRoutes.js';
import feedbackRoutes from './routes/feedbackRoutes.js';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors());

app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use('/api/users', userRoutes);
app.use('/api/feedback', feedbackRoutes);

app.get('/', (req, res) => {
    res.send('User Feedback System API is running.');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectMongoDB();
});