const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load env vars
dotenv.config();

const app = express();

// Body parser
app.use(express.json());

// Enable CORS
app.use(cors());

// Route files
const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const taskRoutes = require('./routes/taskRoutes');

// Mount routers
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);

// Simple route for testing
app.get('/', (req, res) => {
  res.send('Team Task Manager API is running');
});

const PORT = process.env.PORT || 5000;

// Connect to database and start server
const startServer = async () => {
  try {
    if (!process.env.MONGO_URI) {
      console.warn('WARNING: MONGO_URI is not defined. Server will start but DB operations will fail.');
    } else {
      await mongoose.connect(process.env.MONGO_URI);
      console.log('MongoDB Connected');
    }
    
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

startServer();

