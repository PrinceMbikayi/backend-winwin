const Exchange = require('../models/Exchange');

exports.createExchange = async (req, res) => {
  try {
    const { proposerProduct, receiverProduct, receiver } = req.body;
    const proposer = req.user.id;

    const exchange = new Exchange({
      proposer,
      receiver,
      proposerProduct,
      receiverProduct,
      status: 'pending'
    });

    await exchange.save();
    res.status(201).json(exchange);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getExchangesForUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const exchanges = await Exchange.find({
      $or: [{ proposer: userId }, { receiver: userId }]
    })
      .populate('proposer', 'name avatarUrl')
      .populate('receiver', 'name avatarUrl')
      .populate('proposerProduct')
      .populate('receiverProduct');

    res.json(exchanges);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateExchangeStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const exchange = await Exchange.findById(id);
    if (!exchange) {
      return res.status(404).json({ message: 'Exchange not found' });
    }

    if (!['pending', 'validated', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    exchange.status = status;
    exchange.updatedAt = Date.now();
    await exchange.save();

    res.json(exchange);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};