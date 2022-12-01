const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    vehicle_id: {
        type: mongoose.Types.ObjectId,
        ref: 'vehicle'
    },
    attribute: [{
        attribute_id: {
            type: mongoose.Types.ObjectId
        },
        value: {
            type: String
        }
    }],
    description: {
        type: String,
        required: true
    },
    regularprice: {
        type: Number,
        required: true
    },
    currentPrice: {
        type: Number,
        required: true
    },
    qty: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Product", productSchema)