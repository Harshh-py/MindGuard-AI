const express = require('express');
const router = express.Router();
const usageController = require('../controllers/usageController');
const auth = require('../middleware/auth');

router.post('/log', auth, usageController.logUsage);
router.get('/daily', auth, usageController.getDailyStats);
router.get('/weekly', auth, usageController.getWeeklyStats);
router.post('/settings', auth, usageController.updateSettings);

module.exports = router;
