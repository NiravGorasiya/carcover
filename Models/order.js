const { default: mongoose, models } = require("mongoose");

const orders = mongoose.Schema({
    user_id: {
        type: mongoose.Types.ObjectId
    },
    products: {
        type: Array
    },
    total_price:
    {
        type: Number
    },
    discount: {
        type: Number
    },
    delivery_fee: {
        type: Number
    },
    payment_method_id: {
        type: mongoose.Types.ObjectId
    },
    payment_status: {
        type: String,
        enum: ['pending', 'review', 'failed', 'cancelled', 'successful'],
        default: 'pending'
    },
    SHIPPING_ADDRESS: {
        type: Array
    },
    BILLING_ADDRESS: {
        type: Array
    },
    delivery_date: {
        type: Date
    },
    Date: {
        type: String
    },
    status: {
        type: String,
        enum: ['pending', 'ready', 'failed', 'cancelled', 'delivered'],
        default: 'pending'
    },
}, {
    timestamps: true
});

module.exports = mongoose.model("orders", orders);