const Model = require("../Models/Model")

const modelAdd = async (req, res, next) => {
    try {
        const model = new Model({
            name: req.body.name
        })
        const result = await model.save();
        return res.status(201).json(result)
    } catch (error) {
        return res.status(500).json(error)
    }
}

const getAllmodel = async (req, res, next) => {
    try {
        const model = await Model.find();
        return res.status(200).json(model)
    } catch (error) {
        return res.status(500).json(error)
    }
}

module.exports = { modelAdd, getAllmodel }