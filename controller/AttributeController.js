const Attribute = require("../Models/Attribute")

const addAttribute = async (req, res, next) => {
    try {
        const attribute = new Attribute({
            name: req.body.name
        })
        const result = await attribute.save();
        return res.status(201).json(result)
    } catch (error) {
        return res.status(500).json(error)
    }
}

const getAllAttribute = async (req, res, next) => {
    try {
        const attribute = await Attribute.find();
        return res.status(200).json(attribute)
    } catch (error) {
        return res.status(500).json(error)
    }
}

const deleteAttribute = async (req, res, next) => {
    try {
        const attribute = await Attribute.findById(req.params.id)
        attribute.delete();
        return res.status(200).json("successfull delete")
    } catch (error) {
        return res.status(500).json(error)
    }
}

module.exports = { addAttribute, getAllAttribute, deleteAttribute }
