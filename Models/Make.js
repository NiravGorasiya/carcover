const mongoose = require("mongoose")

const makeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "make name is required"]
    },
    slug: {
        type: String,
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Make", makeSchema)