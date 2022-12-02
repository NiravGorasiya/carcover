const mongoose = require("mongoose")
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, "category name is required"]
    },
    image: {
        type: String
    },
    banner: {
        type: String
    }
}, {
    timeseries: true
})
module.exports = mongoose.model("Category", categorySchema)