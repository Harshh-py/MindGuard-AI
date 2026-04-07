const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mindguard')
.then(() => {
    console.log("Connected to MongoDB");
}).catch(err => {
    console.error("MongoDB connection error:", err);
});

const authRoutes = require('./routes/authRoutes');
const usageRoutes = require('./routes/usageRoutes');
const moodRoutes = require('./routes/moodRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/usage', usageRoutes);
app.use('/api/mood', moodRoutes);

app.get('/', (req, res) => {
    res.send('MindGuard AI API is running');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
