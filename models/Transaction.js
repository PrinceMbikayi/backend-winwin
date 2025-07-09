const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  exchange: { type: mongoose.Schema.Types.ObjectId, ref: 'Exchange', required: true },
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  objectTitle: { type: String, required: true },
  objectImage: { type: String },
  otherUserName: { type: String, required: true },
  otherUserAvatar: { type: String },
  isExchangeValidated: { type: Boolean, default: false },
  lastMessage: { type: String },
  lastMessageTime: { type: Date },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Transaction', transactionSchema);