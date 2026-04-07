const mongoose = require('mongoose');

const UsageSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    appName: { type: String, required: true },
    category: { type: String, default: 'General' },
    date: { type: Date, default: Date.now },
    durationMinutes: { type: Number, required: true },
    isNightTime: { type: Boolean, default: false } // E.g., past 11 PM
}, { timestamps: true });

module.exports = mongoose.model('Usage', UsageSchema);
