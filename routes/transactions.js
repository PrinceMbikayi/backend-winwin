const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const authMiddleware = require('../middleware/authMiddleware');

// Get transactions for logged-in user
router.get('/', authMiddleware, transactionController.getTransactionsForUser);

// Get transaction details by ID
router.get('/:id', authMiddleware, transactionController.getTransactionById);

module.exports = router;