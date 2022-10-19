const Body = require("../Models/Body")

const bodyAdd = async (req, res, next) => {
    try {
        const body = new Body({
            name: req.body.name,
            slug: req.body.slug
        })
        const result = await body.save();
        return res.status(201).json(result)
    } catch (error) {
        return res.status(500).json(error)
    }
}

const getAllBody = async (req, res, next) => {
    try {
        const body = await Body.find();
        return res.status(200).json(body)
    } catch (error) {
        return res.status(500).json(error)
    }
}

module.exports = { bodyAdd, getAllBody }