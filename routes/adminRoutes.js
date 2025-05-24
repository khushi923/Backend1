const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const adminAuth = require('../middleware/adminAuth');

// Admin Authentication
router.post('/login', adminController.login);

// Protected Routes (require admin authentication)
router.use(adminAuth);

// Product Management
router.post('/products', adminController.addProduct);
router.put('/products/:id', adminController.updateProduct);
router.delete('/products/:id', adminController.deleteProduct);

// Dashboard
router.get('/dashboard/stats', adminController.getDashboardStats);

// Inventory Management
router.put('/inventory/update', adminController.updateInventory);
router.get('/inventory/low-stock', adminController.getLowStockProducts);

module.exports = router; 