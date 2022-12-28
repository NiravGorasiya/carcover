const mongoose = require("mongoose")

const cartSchema = new mongoose.Schema({
    user_id: {
        type: String
    },
    model: {
        type: String
    },
    product_id: {
        type: mongoose.Types.ObjectId
    },
    image: {
        type: String
    },
    Produt: {
        type: Array
    },
    price: {
        type: Number
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
    timestamps: true,
})



module.exports = mongoose.model("cart", cartSchema)