const mongoose = require("mongoose")

const modelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        index: true,
        unique: [true, "enter the unique name"],
    },
    slug: {
        type: String,
        required: false
    }
}, {
    timeseries: true
})

module.exports = mongoose.model("Model", modelSchema)