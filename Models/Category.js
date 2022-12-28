const mongoose = require("mongoose")
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        index: true,
        unique: [true, "enter the unique name"],
    },
    image: {
        type: String
    },
    banner: {
        type: String
    },
    cover_image: {
        type: String
    }
}, {
    timestamps: true
})
module.exports = mongoose.model("Category", categorySchema)