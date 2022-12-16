const mongoose = require("mongoose")

const makeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        index: true,
        unique: [true, "enter the unique name"],
    },
    slug: {
        type: String,
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Make", makeSchema)