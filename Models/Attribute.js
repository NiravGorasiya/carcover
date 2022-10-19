const mongoose = require("mongoose")

const arrtribureSchema = new mongoose.Schema({
    name: {
        type: String
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Attribute", arrtribureSchema)