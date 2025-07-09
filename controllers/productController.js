const Product = require('../models/Product');
const cloudinary = require('cloudinary').v2;

exports.createProduct = async (req, res) => {
  try {
    const { title, description, category, condition, estimatedValue, location } = req.body;
    const images = [];

    if (req.files) {
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path);
        images.push(result.secure_url);
      }
    }

    const product = new Product({
      title,
      description,
      category,
      condition,
      estimatedValue,
      images,
      owner: req.user.id,
      location
    });

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('owner', 'name avatarUrl');
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('owner', 'name avatarUrl');
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    if (product.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const { title, description, category, condition, estimatedValue, location } = req.body;
    product.title = title || product.title;
    product.description = description || product.description;
    product.category = category || product.category;
    product.condition = condition || product.condition;
    product.estimatedValue = estimatedValue || product.estimatedValue;
    product.location = location || product.location;

    if (req.files && req.files.length > 0) {
      const images = [];
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path);
        images.push(result.secure_url);
      }
      product.images = images;
    }

    await product.save();
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    if (product.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    await product.remove();
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};