const Vehicle = require("../Models/Vehicle")
const Category = require("../Models/Category")
const Model = require("../Models/Model")
const Body = require("../Models/Body")
const Make = require("../Models/Make")

const vehicleAdd = async (req, res, next) => {
    try {
        const { model_id, body_id, make_id, category_id, year, attribute } = req.body
        const model = new Vehicle({
            model_id,
            body_id,
            make_id,
            category_id,
            year,
            attribute
        })
        const result = await model.save();
        return res.status(201).json(result)
    } catch (error) {
        return res.status(500).json(error)
    }
}

const getAllvehicle = async (req, res, next) => {
    try {
        if (req.params.category) {
            let category = await Category.findOne({ name: req.params.category })
            let vehicle = await Vehicle.find({ category_id: category._id }, { year: 1, _id: 0 }).sort({ year: -1 })
            let key = "year"
            const arrayUniqueByKey = [...new Map(vehicle.map(item =>
                [item[key], item])).values()];
            return res.status(200).json(arrayUniqueByKey)
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json(error)
    }
}


const getAllMake = async (req, res, next) => {
    try {
        const vehicle = await Vehicle.find({ year: req.body.year }).populate("make_id", "name", { _id: 0 })
        return res.send(vehicle)
    } catch (error) {
        return res.status(500).json(error)
    }
}

const getAllModel = async (req, res, next) => {
    try {
        let make = await Make.findOne({ name: req.body.name })
        const vehicle = await Vehicle.find({ make_id: make._id }).populate("model_id", "name")
        let result = []
        vehicle.map(item => {
            if (!result[item]) {
                result.push({ name: item.model_id.name })
            }
        })
        return res.status(200).json(result)
    } catch (error) {
        return res.status(500).json(error)
    }
}

const getAllBody = async (req, res, next) => {
    try {
        const model = await Model.findOne({ name: req.body.name })
        const vehicle = await Vehicle.find({ model_id: model._id }).populate("body_id", "name")
        let result = []
        vehicle.map((item) => {
            result.push({ name: item.body_id.name })
        })

        return res.status(200).json(result)
    } catch (error) {
        return res.status(500).json(error)
    }
}

const vehicleUpdate = async (req, res, next) => {
    try {
        const { model_id, body_id, make_id, category_id, year, attribute } = req.body
        const vehicle = await Vehicle.findByIdAndUpdate({ _id: req.params.id },
            {
                $set: {
                    model_id,
                    body_id,
                    make_id,
                    category_id,
                    year,
                    attribute
                }
            },
            { new: true }
        )
        return res.status(200).json(vehicle)
    } catch (error) {
        return res.status(500).json(error)
    }
}

const vehicleDelete = async (req, res, next) => {
    try {
        const vehicle = await Vehicle.findById(req.params.id)
        if (!vehicle)
            return res.status(422).json({ error: "vehicle not found" })
        vehicle.delete();
        return res.status(200).json("successfull delete vehicle")
    } catch (error) {
        return res.status(500).json(error)
    }
}

module.exports = { vehicleAdd, getAllvehicle, getAllMake, getAllModel, getAllBody, vehicleUpdate, vehicleDelete }

