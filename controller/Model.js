const Model = require("../Models/Model")

const modelAdd = async (req, res, next) => {
    try {
        const model = new Model({
            name: req.body.name,
            slug: req.body.slug
        })
        const result = await model.save();
        return res.status(201).json(result)
    } catch (error) {
        return res.status(500).json(error)
    }
}

const Model_delete = async (req, res) => {
    try {
        await Model.findByIdAndDelete(req.params.id);
        return res.status(200).json({ result: "Model dlete successfully" })
    } catch (error) {
        return res.status(500).json(error)

    }
}

const Model_update = async (req, res) => {
    try {
        const data = await Model.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            slug: req.body.slug
        }, { new: true }
        );
        return res.status(200).json({ message: "Model update successfully", result: data })
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

module.exports = { modelAdd, getAllmodel,Model_delete ,Model_update}