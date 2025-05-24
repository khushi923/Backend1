const express = require('express');
const router = express.Router();
const { generateBillReceipt, updateShippingAddress } = require('../controllers/billingController');

// Generate bill receipt for an order
router.get('/receipt/:orderId', generateBillReceipt);

// Update shipping address
router.put('/address/:orderId', updateShippingAddress);

module.exports = router; 