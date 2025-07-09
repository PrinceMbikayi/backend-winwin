const express = require('express');
const router = express.Router();
const liveController = require('../controllers/liveController');
const authMiddleware = require('../middleware/authMiddleware');

// Create live stream
router.post('/', authMiddleware, liveController.createLive);

// Get all live streams
router.get('/', liveController.getLives);

// Update live stream status
router.put('/:id', authMiddleware, liveController.updateLiveStatus);

module.exports = router;