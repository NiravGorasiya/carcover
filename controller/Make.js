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
        return res.status(500).json({ error: error.messge })
    }
}

const make_delete = async (req, res) => {
    try {
        await Make.findByIdAndDelete(req.params.id);
        return res.status(200).json({ result: "make dlete successfully" })
    } catch (error) {
        return res.status(500).json({ error: error.messge })
    }
}

const make_update = async (req, res) => {
    try {
        const data = await Make.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            slug: req.body.slug
        }, { new: true }
        );
        return res.status(200).json({ message: "make update successfully", result: data })
    } catch (error) {
        return res.status(500).json({ error: error.messge })
    }
}

const getAllMake = async (req, res, next) => {
    try {
        const make = await Make.find();
        return res.status(200).json(make)
    } catch (error) {
        return res.status(500).json({ error: error.messge })

    }
}

module.exports = { makeAdd, getAllMake, make_delete, make_update }