# MindGuard AI – Digital Addiction & Wellness Tracker

A complete full-stack web application designed to track user screen/app usage behavior, analyze addiction patterns, and actively focus on digital wellness using AI logic.

## Built With
- **Frontend**: React.js, Tailwind CSS, Chart.js, React Router, Vite
- **Backend**: Node.js, Express, MongoDB
- **Security**: JWT Authentication, bcryptjs

## Features Included
1. **Smart Screen Time Tracking**: Dashboard displays total screen time limits and tracking.
2. **Focus Mode (App Blocking System)**: Manually block apps that are distracting to maintain concentration.
3. **AI Addiction Pattern Detection**: Simple rule-based analytical system assessing risk levels (Low/Medium/High).
4. **Mood & Emotion Tracker**: Daily journal to log your emotional state and generate a wellness score.
5. **Weekly Analytics Dashboard**: Trend visualization through interactive Chart.js graphs.
6. **Smart Notifications & Recommendations**: Provides continuous contextual feedback and insights (e.g. sleep improvements, break reminders).

## Instructions to Run Locally

### Prerequisites
- Node.js (v16+ recommended)
- MongoDB running locally on `localhost:27017`

### 1. Start the Backend
Open a terminal and run the following commands:
```bash
cd MindGuardAI/backend
npm install
node seed.js    # This populates the MongoDB with dummy test data
node server.js  # Starts the API server on port 5000
```

### 2. Start the Frontend
Open a separate terminal and run:
```bash
cd MindGuardAI/frontend
npm install
npm run dev     # Starts the React development server
```

Navigate to `http://localhost:5173/` in your browser. 
Login with the seeded demo credentials: `Username: demo_user`, `Password: password123`.

Enjoy tracking your digital wellness!
