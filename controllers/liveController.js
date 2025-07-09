const Live = require('../models/Live');

exports.createLive = async (req, res) => {
  try {
    const { title, category, scheduledTime } = req.body;
    const streamer = req.user.id;

    const live = new Live({
      title,
      category,
      scheduledTime,
      streamer,
      isLive: false,
      viewerCount: 0
    });

    await live.save();
    res.status(201).json(live);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getLives = async (req, res) => {
  try {
    const lives = await Live.find().populate('streamer', 'name avatarUrl');
    res.json(lives);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateLiveStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { isLive, viewerCount } = req.body;

    const live = await Live.findById(id);
    if (!live) {
      return res.status(404).json({ message: 'Live stream not found' });
    }

    live.isLive = isLive !== undefined ? isLive : live.isLive;
    live.viewerCount = viewerCount !== undefined ? viewerCount : live.viewerCount;

    await live.save();
    res.json(live);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};