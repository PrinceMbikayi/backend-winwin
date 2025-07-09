const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  plan: { type: String, enum: ['free', 'standard', 'premium', 'business'], default: 'free' },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date },
  active: { type: Boolean, default: true },
  paymentMethod: { type: String },
  paymentDetails: { type: Object },
});

module.exports = mongoose.model('Subscription', subscriptionSchema);