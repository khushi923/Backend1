const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { createproduct, getallproducts } = require('../controllers/productscontroller');

// Get all products
router.get('/products', getallproducts);

// Search products
router.get('/products/search', productController.searchProducts);

// Get products by category
router.get('/products/category/:category', productController.getProductsByCategory);

// Add a new product
router.post('/products', productController.addProduct);

// Update a product
router.put('/products/:id', productController.updateProduct);

// Delete a product
router.delete('/products/:id', productController.deleteProduct);

module.exports = router; 