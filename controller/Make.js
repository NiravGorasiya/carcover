const Make = require("../Models/Make")

const makeAdd = async (req, res, next) => {
    try {
        const make = new Make({
            name: req.body.name,
            slug: req.body.slug
        })
        const result = await make.save();
        return res.status(201).json(result)
    } catch (error) {
        return res.status(500).json(error)
    }
}

const getAllMake = async (req, res, next) => {
    try {
        const make = await Make.find();
        return res.status(200).json(make)
    } catch (error) {
        return res.status(500).json(error)
    }
}

module.exports = { makeAdd, getAllMake }