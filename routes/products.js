const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// Get all products
router.get('/', productController.getProducts);

// Get product by ID
router.get('/:id', productController.getProductById);

// Create product
router.post('/', authMiddleware, upload.array('images', 5), productController.createProduct);

// Update product
router.put('/:id', authMiddleware, upload.array('images', 5), productController.updateProduct);

// Delete product
router.delete('/:id', authMiddleware, productController.deleteProduct);

module.exports = router;