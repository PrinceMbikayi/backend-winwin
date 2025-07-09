const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/subscriptionController');
const authMiddleware = require('../middleware/authMiddleware');
const checkActiveSubscription = require('../middleware/subscriptionMiddleware');

// Get current subscription
router.get('/', authMiddleware, subscriptionController.getSubscription);

// Upgrade subscription plan (create Stripe session)
router.post('/upgrade', authMiddleware, checkActiveSubscription, subscriptionController.upgradePlan);

// Stripe webhook endpoint
router.post('/webhook', express.raw({type: 'application/json'}), subscriptionController.handleWebhook);

module.exports = router;