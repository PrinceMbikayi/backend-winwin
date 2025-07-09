const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const authMiddleware = require('../middleware/authMiddleware');

// Send a message
router.post('/', authMiddleware, messageController.sendMessage);

// Get messages for an exchange
router.get('/:exchangeId', authMiddleware, messageController.getMessagesForExchange);

module.exports = router;