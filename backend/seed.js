const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Usage = require('./models/Usage');
const Mood = require('./models/Mood');

dotenv.config();

const appNames = ["Instagram", "TikTok", "YouTube", "WhatsApp", "Chrome", "VSCode", "Spotify"];
const categories = ["Social", "Social", "Entertainment", "Communication", "Productivity", "Productivity", "Entertainment"];
const moods = ["Happy", "Neutral", "Tired", "Stressed"];
const moodScores = { "Happy": 100, "Neutral": 70, "Tired": 40, "Stressed": 20 };

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mindguard')
.then(async () => {
    console.log("Connected to DB, clearing old data...");
    await User.deleteMany();
    await Usage.deleteMany();
    await Mood.deleteMany();

    console.log("Creating dummy user...");
    const demoUser = new User({
        username: "demo_user",
        password: "password123", // Will be hashed by pre-save hook
        focusMode: false,
        dailyGlobalLimit: 120, // 2 hours
        riskLevel: "Medium",
        wellnessScore: 65
    });
    await demoUser.save();

    console.log("Creating dummy usage data for the past 7 days...");
    const usagesToInsert = [];
    const moodsToInsert = [];
    
    for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        date.setHours(12, 0, 0, 0);

        // Daily Mood
        const dailyMood = moods[Math.floor(Math.random() * moods.length)];
        moodsToInsert.push({
            userId: demoUser._id,
            date,
            status: dailyMood,
            score: moodScores[dailyMood]
        });

        // App usage
        for (let j = 0; j < 4; j++) {
            const index = Math.floor(Math.random() * appNames.length);
            const duration = Math.floor(Math.random() * 60) + 10; // 10 to 70 mins per app
            const isNight = Math.random() > 0.8;
            usagesToInsert.push({
                userId: demoUser._id,
                appName: appNames[index],
                category: categories[index],
                date,
                durationMinutes: duration,
                isNightTime: isNight
            });
        }
    }

    await Usage.insertMany(usagesToInsert);
    await Mood.insertMany(moodsToInsert);

    console.log("Seeding complete. Use credentials -> Username: demo_user, Password: password123");
    process.exit(0);
}).catch(err => {
    console.error("Failed to seed data:", err);
    process.exit(1);
});
