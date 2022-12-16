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
    payment_method_id: {
        type: mongoose.Types.ObjectId
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
            address: {
                type: Array,
                required: true
            },
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
            }
        }
    ],
    billing_address: [
        {
            compny_name: {
                type: String,
                required: true
            },
            firs_name: {
                type: String,
                required: true
            },
            last_name: {
                type: String,
                required: true
            },
            address: {
                type: Array,
                required: true
            },
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
            }
        }
    ],
    delivery_fee: {
        type: Number
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