const mongoose = require("mongoose")

const bodySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        index: true,
        unique: [true, "enter the unique name"],
    },
    slug: {
        type: String
    }
}, {
    timeseries: true
})

module.exports = mongoose.model("Body", bodySchema)