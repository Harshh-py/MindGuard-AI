const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: false, unique: true, sparse: true },
    password: { type: String, required: true },
    focusMode: { type: Boolean, default: false },
    dailyGlobalLimit: { type: Number, default: 120 }, // Limit in minutes
    riskLevel: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Low' },
    wellnessScore: { type: Number, default: 100 }
}, { timestamps: true });

UserSchema.pre('save', async function() {
    if (!this.isModified('password')) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model('User', UserSchema);
