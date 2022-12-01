const mongoose = require("mongoose")

const cartSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Types.ObjectId
    },
    product_id: {
        type: mongoose.Types.ObjectId
    },
    quantity: {
        type: Number
    },
    total: {
        type: String
    },
    slug: {
        type: String
    },
    coupon: {
        taype: String
    }
}, {
    timeseries: true
})

module.exports = mongoose.model("cart", cartSchema)