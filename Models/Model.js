const mongoose = require("mongoose")

const modelSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, "model name is required"]
    },
    url: {
        type: String,
        required: false
    }
}, {
    timeseries: true
})

module.exports = mongoose.model("Model", modelSchema)