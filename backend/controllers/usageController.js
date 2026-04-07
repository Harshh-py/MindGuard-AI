const Usage = require('../models/Usage');
const User = require('../models/User');

function evaluateRisk(totalMinutes, nightUsageMinutes) {
    if (totalMinutes > 300 || nightUsageMinutes > 60) return "High";
    if (totalMinutes > 180 || nightUsageMinutes > 30) return "Medium";
    return "Low";
}

exports.logUsage = async (req, res) => {
    try {
        const { appName, category, durationMinutes, isNightTime } = req.body;
        const usage = new Usage({
            userId: req.user.userId,
            appName, category, durationMinutes, isNightTime
        });
        await usage.save();

        // Recalculate daily total for risk evaluation
        const today = new Date();
        today.setHours(0,0,0,0);
        const dailyUsages = await Usage.find({
            userId: req.user.userId,
            date: { $gte: today }
        });

        const totalMinutes = dailyUsages.reduce((acc, curr) => acc + curr.durationMinutes, 0);
        const nightMinutes = dailyUsages.filter(u => u.isNightTime).reduce((acc, curr) => acc + curr.durationMinutes, 0);

        const newRisk = evaluateRisk(totalMinutes, nightMinutes);

        // Update user risk if changed
        const user = await User.findById(req.user.userId);
        if (user.riskLevel !== newRisk) {
            user.riskLevel = newRisk;
            await user.save();
        }

        // Check if exceeded Daily Limit
        let blocked = false;
        if (totalMinutes > user.dailyGlobalLimit) {
            blocked = true;
        }

        res.status(201).json({ message: "Usage logged", usage, currentRisk: newRisk, blocked });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

exports.getDailyStats = async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0,0,0,0);
        const usages = await Usage.find({
            userId: req.user.userId,
            date: { $gte: today }
        });

        const totalMinutes = usages.reduce((acc, curr) => acc + curr.durationMinutes, 0);
        res.json({ totalMinutes, usages });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

exports.getWeeklyStats = async (req, res) => {
    try {
        const lastWeek = new Date();
        lastWeek.setDate(lastWeek.getDate() - 7);
        const usages = await Usage.find({
            userId: req.user.userId,
            date: { $gte: lastWeek }
        }).sort({ date: 1 });
        res.json(usages);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

exports.updateSettings = async (req, res) => {
    try {
        const { focusMode, dailyGlobalLimit } = req.body;
        const user = await User.findByIdAndUpdate(req.user.userId, { focusMode, dailyGlobalLimit }, { new: true });
        res.json({ focusMode: user.focusMode, dailyGlobalLimit: user.dailyGlobalLimit });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};
