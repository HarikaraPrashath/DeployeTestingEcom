const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderPlacementSchema = new Schema(
    {
        cardNumber: {
            type: String,
            required: true,
        },
        yearMonth: {
            type: String,
            required: true,
        },
        cnn: {
            type: String,
            required: true,
        },
        price: {
            type: String,
            required: true,
        },
        visaMasterCard: {
            type: String,
            required: true,
        },
        productName:{
            type: String,
            required: true,
        },
        productPrice:{
            type: String,
            required: true,
        },
        productImage:{
            type: String,
            required: false,
        },
        user_id: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Payment', orderPlacementSchema);
