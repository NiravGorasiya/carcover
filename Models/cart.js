const mongoose = require("mongoose")

const cartSchema = new mongoose.Schema({
    user_id: {
        type: String
    },
    product_id: {
        type: mongoose.Types.ObjectId
    },
    model: {
        type: String
    },
    body: {
        type: String
    },
    make: {
        type: String
    },
    year: {
        type: String
    },
    quantity: {
        type: Number
    },
    total: {
        type: Number,

    },
    slug: {
        type: String
    },
    coupon: {
        taype: String
    }
}, {
    timeseries: true,
})



module.exports = mongoose.model("cart", cartSchema)