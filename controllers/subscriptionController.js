const Subscription = require('../models/Subscription');
const stripe = require('stripe')(process.env.STRIPE_Secret_key);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET; // Add this to your .env file


exports.getSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findOne({ user: req.user.id });
    if (!subscription) {
      return res.status(404).json({ message: 'Subscription not found' });
    }
    res.json(subscription);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.upgradePlan = async (req, res) => {
  try {
    const { plan } = req.body;
    // Create Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [{
        price: plan, // plan should be the Stripe price ID
        quantity: 1
      }],
      success_url: `${process.env.FRONTEND_URL}/subscription-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/subscription-cancelled`,
      customer_email: req.user.email
    });
    res.json({ sessionId: session.id });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Webhook handler
exports.handleWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;
  try {
    event = stripe.webhooks.constructEvent(req.rawBody, sig, endpointSecret);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    // Update subscription in DB
    const userEmail = session.customer_email;
    const subscriptionId = session.subscription;

    // Find user subscription and update
    const subscription = await Subscription.findOne({ 'user.email': userEmail });
    if (subscription) {
      subscription.plan = session.display_items ? session.display_items[0].plan.id : '';
      subscription.startDate = new Date();
      subscription.active = true;
      await subscription.save();
    }
  }

  res.json({ received: true });
};