const mongoose = require("mongoose")

const arrtribureSchema = new mongoose.Schema({
    Name: {
        type: String
    },
    Slug: String,
    value: [
        {
            name: String
        }
    ]
}, {
    timestamps: true
})

module.exports = mongoose.model("Attribute", arrtribureSchema)  