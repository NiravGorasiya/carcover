const mongoose = require('mongoose');

const Coupon = new mongoose.Schema({
    coupon_code: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ["p", "f"]
    },
    discount: {
        type: Number
    },
    max_price: {
        type: Number
    },
    max_use: {
        type: Number
    },
    coupon_use: {
        type: Number,
        default: 0
    },
    start_date: {
        type: String
    },
    end_date: {
        type: String
    },
    status: {
        type: Boolean,
        default: false
    }
}, {
    timeseries: true
})

module.exports = mongoose.model("Coupon", Coupon)