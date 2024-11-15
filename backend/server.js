const express = require('express');
const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');

dotenv.config();

const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('combined'));  // Logging HTTP requests

// MongoDB Connection
const connectDB = async () => {
  try {
    console.log('Attempting to connect to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

connectDB(); // Invoke the function to connect to MongoDB

// Routes
app.use('/api', authRoutes);
app.use('/api', productRoutes);

// File Upload Configuration
const upload = multer({ dest: 'uploads/' });

app.post('/api/upload', upload.single('photo'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  res.send({ filePath: path.join(__dirname, 'uploads', req.file.filename) });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err);
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
