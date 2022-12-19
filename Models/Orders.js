const { default: mongoose, models } = require("mongoose");

const Orders = mongoose.Schema({
    customer_id: {
        type: String
    },
    products: {
        type: Array
    },
    coupon: [
        {
            coupon_code: String,
            coupon_value: Number,
            _id: false
        }
    ],
    payment_method: {
        type: String,
        enum: ['card']
    },
    payment_status: {
        type: String,
        enum: ['pending', 'review', 'failed', 'cancelled', 'successful'],
        default: 'pending'
    },
    shipping_address: [
        {
            company_name: {
                type: String
            },
            first_name: {
                type: String,
                required: true
            },
            last_name: {
                type: String,
                required: true
            },
            address: [{
                address1: {
                    type: String
                },
                address2: {
                    type: String
                },
                _id: false
            }],
            city: {
                type: String,
                required: true
            },
            state: {
                type: String,
                required: true
            },
            country: {
                type: String,
                required: true
            },
            postal_code: {
                type: String,
                required: true
            },
            phone: {
                type: Number,
                required: true
            },
            e_mail: {
                type: String,
                required: true
            },
            _id: false
        }
    ],
    billing_address: [
        {
            company_name: {
                type: String,
                required: true
            },
            first_name: {
                type: String,
                required: true
            },
            last_name: {
                type: String,
                required: true
            },
            address: [{
                address1: {
                    type: String
                },
                address2: {
                    type: String
                },
                _id: false
            }],
            city: {
                type: String,
                required: true
            },
            state: {
                type: String,
                required: true
            },
            country: {
                type: String,
                required: true
            },
            postal_code: {
                type: String,
                required: true
            },
            phone: {
                type: Number,
                required: true
            },
            e_mail: {
                type: String,
                required: true
            },
            _id: false
        }
    ],
    delivery_fee: {
        type: Number
    },
    delivery_date: {
        type: String
    },
    total_price:
    {
        type: Number
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

module.exports = mongoose.model("Orders", Orders);