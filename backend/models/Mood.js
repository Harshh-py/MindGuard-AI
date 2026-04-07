const mongoose = require('mongoose');

const MoodSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, default: Date.now },
    status: { type: String, enum: ['Happy', 'Neutral', 'Stressed', 'Tired'], required: true },
    score: { type: Number, required: true } // Numeric representation (e.g. Happy=10, Stressed=2)
}, { timestamps: true });

module.exports = mongoose.model('Mood', MoodSchema);
