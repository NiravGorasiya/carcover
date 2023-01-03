'use strict'
const attribute = require('../Models/Attribute');

const attribute_add = async (req, res) => {
    try {
        const { Name, value } = req.body
        const add = await attribute.create({
            Name,
            value
        })
        return res.status(201).json({ status: true, result: add })
    } catch (error) {
        return res.status(500).json({ status: false, error: error.message })
    }
}

const attribute_all = async (req, res) => {
    try {
        const all = await attribute.find();
        return res.status(201).json({ status: true, result: all })
    } catch (error) {
        return res.status(500).json({ status: false, error: error.message })
    }
}

const attribute_delete = async (req, res) => {
    try {
        var a = await attribute.findByIdAndDelete({ id: req.params.id });
        if (!a) {
            return res.status(200).json({ status: true, message: "attribut not exist" })
        }
        return res.status(200).json({ status: true, message: "attribut delet success full" });
    } catch (error) {
        return res.status(500).json({ status: false, error: error.message })
    }
}

const attribut_one = async (req, res) => {
    try {
        var a = await attribute.findById({ id: req.params.id })
        if (!a) {
            return res.status(200).json({ status: true, message: "attribut not exist" })
        }
        return res.status(200).json({ status: true, result: a });
    } catch (error) {
        return res.status(500).json({ status: false, error: error.message })
    }
}

const attribut_update = async (req, res) => {
    const result = await attribute.findByIdAndUpdate(req.params.id, {
        Name: req.body.Name,
        value: req.body.value
    }, { new: true })
    if (!result) {
        return res.status(200).json({ status: true, message: "attribut not exist" })
    }
    return res.status(200).json({ status: true, result: result })
}

const attribut_addonevalue = async (req, res) => {
    const result = await attribute.findByIdAndUpdate(req.params.id, {
        Name: req.body.Name,
        value: req.body.value
    }, { new: true })
    if (!result) {
        return res.status(200).json({ status: true, message: "attribut not exist" })
    }
    return res.status(200).json({ status: true, result: result })
}

module.exports = { attribute_add, attribute_all, attribute_delete, attribut_one, attribut_update }


