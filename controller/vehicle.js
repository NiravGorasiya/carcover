const Vehicle = require("../Models/Vehicle")
const Category = require("../Models/Category")
const Model = require("../Models/Model")
const Make = require("../Models/Make")



const vehicleAdd = async (req, res) => {
    try {
        const { model_id, body_id, make_id, category_id, year } = req.body
        const d = new Date();
        if (!(d.getFullYear() >= year)) {
            return res.status(500).json({ status: false, message: "valid year enter" });
        }
        const datas = await Vehicle.findOne({ model_id: model_id, body_id: body_id, make_id: make_id, category_id: category_id })
        if (datas) {
            const update_data = await Vehicle.findByIdAndUpdate(datas.id, { $addToSet: { year: year } }, { new: true })
            return res.status(200).json({ status: true, result: update_data })
        }
        const data = new Vehicle({ model_id, body_id, make_id, category_id, year })
        const result = await data.save();
        return res.status(201).json({ status: true, result: result })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, error: error.message })
    }
}

const getAllvehicle = async (req, res, next) => {
    try {
        if (req.params.category) {
            let years = []
            let category = await Category.findOne({ name: req.params.category })
            let vehicle = await Vehicle.find({ category_id: category._id }, { year: 1, _id: 0 })
            await vehicle.map(item => { item.year.map(a => { years.push({ year: a }) }) })
            var dataArr = years.map(item => { return [item.year, item] });
            var maparr = new Map(dataArr);
            var result = [...maparr.values()].sort((a, b) => { return b.year - a.year })
            return res.status(200).json(result)
        }
    } catch (error) {
        console.log(error, "d");
        return res.status(500).json(error)
    }
}

const getAllMake = async (req, res, next) => {
    try {
        let category = await Category.findOne({ name: req.body.name });
        let vehicle = await Vehicle.find({ year: req.body.year, category_id: category._id }).populate("make_id", "name")
        const result = [];
        const unique = vehicle.filter(element => {
            const isDuplicate = result.includes(element.make_id.name)
            if (!isDuplicate) {
                result.push(element.make_id.name)
                return true;
            }
            return false;
        });
        return res.status(200).json(unique)
    } catch (error) {
        return res.status(500).json(error)
    }
}

const getAllModel = async (req, res, next) => {
    try {
        let make = await Make.findOne({ name: req.body.name })
        const vehicle = await Vehicle.find({ make_id: make._id }).populate("model_id", "name")
        let result = [];
        const unique = vehicle.filter(element => {
            const isDuplicate = result.includes(element.model_id.name);
            if (!isDuplicate) {
                result.push(element.model_id.name);
                return true;
            }
            return false;
        });
        return res.status(200).json(unique)
    } catch (error) {
        console.log(error, "error");
        return res.status(500).json(error)
    }
}

const getAllBody = async (req, res, next) => {
    try {
        const model = await Model.findOne({ name: req.body.name })
        const vehicle = await Vehicle.find({ model_id: model._id }).populate("body_id", "name")
        return res.status(200).json(vehicle)
    } catch (error) {
        return res.status(500).json(error)
    }
}


const vehicleUpdate = async (req, res, next) => {
    try {
        const { model_id, body_id, make_id, category_id, year } = req.body
        const vehicle = await Vehicle.findByIdAndUpdate({ _id: req.params.id },
            {
                $set: {
                    model_id,
                    body_id,
                    make_id,
                    category_id,
                    year
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

// const products = async (req, res) => {
//     try {
//         const { model, body, make, year, category } = req.params
//         var c = await Category.findOne({ name: category })
//         var mo = await Model.findOne({ name: model })
//         var m = await Make.findOne({ name: make })
//         var b = await Body.findOne({ name: body })
//         var a = await Vehicle.find(
//             { year: parseInt(year) }
//         );
//         console.log(a);
//         var data = await Product.find({ vehicle_id: a.id })
//         return res.status(200).json({ result: data })
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({ status: false, error: error.message })
//     }
// }

// const products = async (req, res) => {
//     try {
//         const { model, body, make, year, category } = req.params


//         const data = await Product.aggregate([
//             {
//                 $lookup: {
//                     from: "bodies",
//                     pipeline: [
//                         { $match: { "name": body } }
//                     ],
//                     as: "bodies"
//                 },
//                 $project: [
//                     {
//                         "boday": {}
//                     }
//                 ]
//             },
//             {
//                 $lookup: {
//                     from: "models",
//                     pipeline: [
//                         { $match: { "name": model } }
//                     ],
//                     as: "models"
//                 }
//             },
//             {
//                 $lookup: {
//                     from: "makes",
//                     pipeline: [
//                         { $match: { "name": make } }
//                     ],
//                     as: "makes"
//                 }
//             },
//             {
//                 $lookup: {
//                     from: "categories",
//                     pipeline: [
//                         { $match: { "name": category } }
//                     ],
//                     as: "categories"
//                 }
//             },
//             // {
//             //     pipeline: {

//             //     }
//             // },
//             {
//                 $lookup: {
//                     from: "vehicles",
//                     pipeline: [
//                         {
//                             $match:
//                             {
//                                 // $and: [{
//                                 //     $eq: ["$body_id", "$$body"],
//                                 // },
//                                 //     // {
//                                 //     //     $eq: ["year", parseInt(year)]
//                                 //     // },
//                                 // ]
//                                 $and: [
//                                     { "year": parseInt(year) },
//                                     // { tags: { $in: [ "home", "school" ] } }
//                                     //{ "body_id": mongoose.Types.ObjectId("$bodies.id") },
//                                 ]
//                             }
//                         },
//                     ],
//                     as: "vehicles",
//                 }
//             },
//         ])
//         return res.status(200).json(data)
//     } catch (error) {
//         return res.status(500).json({ status: false, error: error.message })
//     }
// }

module.exports = { vehicleAdd, getAllvehicle, getAllMake, getAllModel, getAllBody, vehicleUpdate, vehicleDelete, }
