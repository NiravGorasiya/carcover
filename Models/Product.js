const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        get: gettotal,

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
    timestamps: true,
    toObject: { getters: true, setters: true },
    id: false
})

function gettotal(title) {
    return title + "$"
}
module.exports = mongoose.model("Product", productSchema)