const dotenv = require('dotenv');
dotenv.config(); // Load environment variables first

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const studentRoutes = require('./routes/student');

const User = require('./models/User');

const app = express();
app.use(cors({
  origin: "http://localhost:5173", // React frontend dev URL
  credentials: true
}));
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/admin', adminRoutes);

app.use('/student', studentRoutes);


// Connect to MongoDB and then create admin
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to MongoDB');

    // ✅ Call after DB connection
    // createInitialAdmin();

    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch(err => {
    console.log('Failed to connect to MongoDB:', err);
  });
