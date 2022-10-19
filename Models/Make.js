const mongoose = require("mongoose")

const makeSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, "make name is required"]
    }
}, {
    timeseries: true
})

module.exports = mongoose.model("Make", makeSchema)