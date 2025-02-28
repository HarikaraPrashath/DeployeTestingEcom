const Payment = require('../models/orderPlacementModel.js');

// Add new payment order
const makePaymentOrder = async (req, res) => {
    try {
        console.log('Request body:', req.body); // Debug log to inspect incoming data
        const { cardNumber, yearMonth, cnn, price, visaMasterCard ,productName, productImage,productPrice} = req.body;

        // Validate required fields
        if (!cardNumber || !yearMonth || !cnn || !price || !visaMasterCard ||!productName ||!productImage ||!productPrice) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // // Additional validations
        // if (!/^\d{16}$/.test(cardNumber)) {
        //     return res.status(400).json({ error: 'Invalid card number format' });
        // }
        
        // if (!/^\d{2}\/\d{2}$/.test(yearMonth)) {
        //     return res.status(400).json({ error: 'Invalid year/month format, expected MM/YY' });
        // }

        // if (!/^\d{3}$/.test(cnn)) {
        //     return res.status(400).json({ error: 'Invalid CNN, expected 3 digits' });
        // }

        // if (isNaN(price) || price <= 0) {
        //     return res.status(400).json({ error: 'Invalid price, must be a positive number' });
        // }

        const user_id = req.user._id; // Assuming middleware sets req.user

        if (!user_id) {
            return res.status(400).json({ error: 'User ID not found in request' });
        }

        const payment = new Payment({ cardNumber, yearMonth, cnn, price, productImage, visaMasterCard,productName,productPrice, user_id });
        await payment.save();

        res.status(201).json({ success: true, payment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error occurred while creating payment order' });
    }
};

// Delete payment order
const deleteOrderWithPayment = async (req, res) => {
    try {
        const { id } = req.params;
        const paymentOrder = await Payment.findByIdAndDelete(id);

        if (!paymentOrder) {
            return res.status(404).json({
                success: false,
                message: 'Payment order not found',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Order and Payment deleted successfully',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server error occurred while deleting payment order',
        });
    }
};

// Get all payment orders for a user
const getAllPaymentAndOrder = async (req, res) => {
    try {
        const user_id = req.user._id; // Assuming middleware sets req.user
        const payments = await Payment.find({ user_id }).sort({ createdAt: -1 });
        res.status(200).json(payments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error occurred while fetching payments' });
    }
};

module.exports = { makePaymentOrder, deleteOrderWithPayment, getAllPaymentAndOrder };
