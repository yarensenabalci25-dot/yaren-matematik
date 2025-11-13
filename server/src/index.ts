import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/yaren-matematik';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Yaren Matematik API' });
});

// Import routes (will be added)
// app.use('/api/auth', authRoutes);
// app.use('/api/questions', questionRoutes);
// app.use('/api/tests', testRoutes);
// app.use('/api/progress', progressRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
