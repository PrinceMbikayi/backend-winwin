const Message = require('../models/Message');

exports.sendMessage = async (req, res) => {
  try {
    const { exchangeId, text } = req.body;
    const sender = req.user.id;

    const message = new Message({
      exchange: exchangeId,
      sender,
      text
    });

    await message.save();
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getMessagesForExchange = async (req, res) => {
  try {
    const { exchangeId } = req.params;
    const messages = await Message.find({ exchange: exchangeId }).populate('sender', 'name avatarUrl').sort('createdAt');
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};