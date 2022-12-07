const mongoose = require("mongoose")

const vehicleSchema = new mongoose.Schema({
    body_id: {
        type: mongoose.Types.ObjectId,
        ref: "Body"
    },
    model_id: {
        type: mongoose.Types.ObjectId,
        ref: "Model"
    },
    make_id: {
        type: mongoose.Types.ObjectId,
        ref: "Make"
    },
    category_id: {
        type: mongoose.Types.ObjectId,
        ref: "Category"
    },

    year: {
        type: Array
    }
}, {
    timeseries: true
})

// vehicleSchema.methods.toJSON = function () {
//     const branch = this;
//     const branchObj = branch.toObject();
//     delete branchObj.__v;
//     delete branchObj.make_id._id;
//     return branchObj;
// };

module.exports = mongoose.model("vehicle", vehicleSchema)