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
        var message = error.code === 11000 ? "enter the unique name" : error.message
        return res.status(500).json({ error: message })
    }
}

const Body_delete = async (req, res) => {
    try {
        await Body.findByIdAndDelete(req.params.id);
        return res.status(200).json({ result: "Body dlete successfully" })
    } catch (error) {
        return res.status(500).json({ error: error.messge })
    }
}

const Body_update = async (req, res) => {
    try {
        const data = await Body.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            slug: req.body.slug
        }, { new: true }
        );
        return res.status(200).json({ message: "Body update successfully", result: data })
    } catch (error) {
        var message = error.code === 11000 ? "enter the unique name" : error.message
        return res.status(500).json({ error: message })
    }
}

const getAllBody = async (req, res, next) => {
    try {
        const body = await Body.find();
        return res.status(200).json(body)
    } catch (error) {
        return res.status(500).json({ error: error.messge })
    }
}

module.exports = { bodyAdd, getAllBody, Body_delete, Body_update }