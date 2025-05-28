const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./Config/db');

const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');

// Load environment variables
dotenv.config();

// Initialize Firebase Admin SDK
const admin = require('firebase-admin');
const serviceAccount = require('./config/firebase-service-account.json'); // Update the path as needed

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Make Firebase admin available globally (optional)
global.admin = admin;

const app = express();

app.use(cors());
app.use(express.json());

// Add COOP and COEP headers middleware here
app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
  next();
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

// Connect to MongoDB
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
