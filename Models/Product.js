const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    title: {
        type: String
    },
    images: {
        type: Array
    },
    Category_id: {
        type: mongoose.Types.ObjectId,
        ref: 'Category'
    },
    model: {
        type: String
    },
    attribute: [{
        attribute_id: {
            type: mongoose.Types.ObjectId,
            ref: "attributes"
        },
        value: {
            type: mongoose.Types.ObjectId,
            ref: "attributes"
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
    timestamps: true,
    toObject: { getters: true, setters: true },
    id: false
})

module.exports = mongoose.model("Product", productSchema)