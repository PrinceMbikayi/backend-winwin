const Subscription = require('../models/Subscription');

const checkActiveSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.findOne({ user: req.user.id });
    if (!subscription || !subscription.active) {
      return res.status(403).json({ message: 'Subscription required to access this resource' });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = checkActiveSubscription;