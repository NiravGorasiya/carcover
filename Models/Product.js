const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    catgory_id: {
        type: mongoose.Types.ObjectId,
        ref:'Category'
    },
    attribute: [{
        attribute_id: {
            type: mongoose.Types.ObjectId
        },
        value: {
            type: String
        }
    }],
}, {
    timestamps: true
})

module.exports = mongoose.model("Product", productSchema)