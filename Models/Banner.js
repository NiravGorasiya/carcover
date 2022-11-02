const mongoose = require("mongoose")

const bannerSchema = mongoose.Schema({
    category_id: {
        type: mongoose.Types.ObjectId,
        ref: "Category"
    },
    image: {
        type: String
    }
}, {
    timestamp: true
})

module.exports = mongoose.model("banner", bannerSchema)