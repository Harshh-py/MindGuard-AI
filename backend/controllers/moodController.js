const Mood = require('../models/Mood');
const User = require('../models/User');

const moodScores = {
    'Happy': 100,
    'Neutral': 70,
    'Tired': 40,
    'Stressed': 20
};

exports.logMood = async (req, res) => {
    try {
        const { status } = req.body;
        if (!moodScores[status]) return res.status(400).json({ message: "Invalid mood status" });

        const score = moodScores[status];
        const mood = new Mood({
            userId: req.user.userId,
            status,
            score
        });
        await mood.save();

        const user = await User.findById(req.user.userId);
        user.wellnessScore = Math.round((user.wellnessScore + score) / 2); // Simple moving average
        await user.save();

        res.status(201).json({ message: "Mood logged", mood, newWellnessScore: user.wellnessScore });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

exports.getMoodHistory = async (req, res) => {
    try {
        const lastWeek = new Date();
        lastWeek.setDate(lastWeek.getDate() - 7);
        const moods = await Mood.find({
            userId: req.user.userId,
            date: { $gte: lastWeek }
        }).sort({ date: 1 });
        res.json(moods);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};
