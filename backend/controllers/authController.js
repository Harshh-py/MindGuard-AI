const User = require('../models/User');
const OTP = require('../models/OTP');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

exports.sendOtp = async (req, res) => {
    try {
        const { email, username } = req.body;
        if (!email || !username) return res.status(400).json({ message: "Email and username required" });

        // Check if user already exists
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) return res.status(400).json({ message: "User with this email or username already exists!" });

        // Generate 6-digit OTP
        const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

        // Save to DB
        await OTP.findOneAndUpdate(
            { email }, 
            { otp: otpCode, createdAt: Date.now() }, 
            { upsert: true, new: true }
        );

        // Send Real Email via Gmail
        const mailOptions = {
            from: `"MindGuard AI" <${process.env.SMTP_USER}>`,
            to: email,
            subject: 'MindGuard AI - Your Verification Code',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">
                    <h2 style="color: #8b5cf6; text-align: center;">MindGuard AI</h2>
                    <p style="color: #334155; font-size: 16px;">Hello ${username},</p>
                    <p style="color: #334155; font-size: 16px;">To verify your email address, please use the following One-Time Password (OTP):</p>
                    <div style="background-color: #f1f5f9; padding: 15px; border-radius: 8px; text-align: center; margin: 20px 0;">
                        <h1 style="margin: 0; color: #0f172a; letter-spacing: 5px;">${otpCode}</h1>
                    </div>
                    <p style="color: #64748b; font-size: 14px; text-align: center;">This code will expire securely in 10 minutes.</p>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);
        
        console.log("\n---- REAL OTP EMAIL SENT ----");
        console.log("Successfully blasted to:", email);
        console.log("-----------------------------\n");

        res.json({ message: "OTP sent successfully to your inbox!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to send OTP email" });
    }
};

exports.verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const otpRecord = await OTP.findOne({ email, otp });
        
        if (!otpRecord) return res.status(400).json({ message: "Invalid or expired OTP code." });

        res.json({ message: "OTP Verified successfully." });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

exports.register = async (req, res) => {
    try {
        const { username, email, password, otp } = req.body;
        
        // Final Double Check on OTP
        const otpRecord = await OTP.findOne({ email, otp });
        if (!otpRecord) return res.status(400).json({ message: "OTP Validation failed. Did it expire?" });

        let user = await User.findOne({ $or: [{ username }, { email }] });
        if (user) return res.status(400).json({ message: "User with this username or email already exists" });

        user = new User({ username, email, password });
        await user.save();
        
        // Remove OTP record since successfully utilized
        await OTP.findOneAndDelete({ email });

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
        res.status(201).json({ token, user: { username: user.username, email: user.email, riskLevel: user.riskLevel } });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

exports.login = async (req, res) => {
    try {
        const { identifier, password } = req.body;
        const user = await User.findOne({ $or: [{ username: identifier }, { email: identifier }] });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
        res.json({ token, user: { username: user.username, riskLevel: user.riskLevel, focusMode: user.focusMode, dailyLimit: user.dailyGlobalLimit } });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select("-password");
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};
