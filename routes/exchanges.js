const express = require('express');
const router = express.Router();
const exchangeController = require('../controllers/exchangeController');
const authMiddleware = require('../middleware/authMiddleware');

// Create exchange proposal
router.post('/', authMiddleware, exchangeController.createExchange);

// Get exchanges for logged-in user
router.get('/', authMiddleware, exchangeController.getExchangesForUser);

// Update exchange status
router.put('/:id', authMiddleware, exchangeController.updateExchangeStatus);

module.exports = router;