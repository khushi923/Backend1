const orderModel = require('../models/ordermodel');
const userModel = require('../models/usermodel');

// Generate bill receipt for an order
async function generateBillReceipt(req, res) {
    try {
        const { orderId } = req.params;
        
        const order = await orderModel.findById(orderId)
            .populate('userid')
            .populate('productids.productid');
            
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Calculate subtotal and taxes
        const subtotal = order.totalprice;
        const tax = subtotal * 0.18; // 18% tax
        const shippingCost = 50; // Fixed shipping cost
        const total = subtotal + tax + shippingCost;

        const billReceipt = {
            orderNumber: order._id,
            orderDate: order.orderdate,
            customerName: order.userid.name,
            customerEmail: order.userid.email,
            shippingAddress: order.shippingaddress,
            items: order.productids.map(item => ({
                name: item.productid.name,
                quantity: item.quantity,
                price: item.productid.price,
                subtotal: item.quantity * item.productid.price
            })),
            subtotal,
            tax,
            shippingCost,
            total,
            paymentMethod: order.paymentmethod,
            paymentStatus: order.paymentstatus,
            expectedDelivery: order.deliverydate
        };

        return res.status(200).json({ 
            message: 'Bill receipt generated successfully', 
            billReceipt 
        });
    } catch (error) {
        console.error('Error generating bill receipt:', error);
        return res.status(500).json({ message: 'Internal server error', error });
    }
}

// Update shipping address
async function updateShippingAddress(req, res) {
    try {
        const { orderId } = req.params;
        const { 
            streetAddress,
            city,
            state,
            postalCode,
            country,
            phone
        } = req.body;

        const formattedAddress = `${streetAddress}, ${city}, ${state} ${postalCode}, ${country}. Phone: ${phone}`;

        const order = await orderModel.findByIdAndUpdate(
            orderId,
            { shippingaddress: formattedAddress },
            { new: true }
        );

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        return res.status(200).json({
            message: 'Shipping address updated successfully',
            order
        });
    } catch (error) {
        console.error('Error updating shipping address:', error);
        return res.status(500).json({ message: 'Internal server error', error });
    }
}

module.exports = {
    generateBillReceipt,
    updateShippingAddress
}; 