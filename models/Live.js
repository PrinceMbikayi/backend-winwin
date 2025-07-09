const mongoose = require('mongoose');

const liveSchema = new mongoose.Schema({
  title: { type: String, required: true },
  streamer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  thumbnailUrl: { type: String },
  viewerCount: { type: Number, default: 0 },
  isLive: { type: Boolean, default: false },
  category: { type: String },
  scheduledTime: { type: Date },
  duration: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Live', liveSchema);