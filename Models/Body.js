const mongoose = require("mongoose")

const bodySchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, "body name is required"]
    },
    slug: {
        type: String
    }
}, {
    timeseries: true
})

module.exports = mongoose.model("Body", bodySchema)