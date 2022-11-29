const Category = require("../Models/Category")

const fs = require('fs')
const path = require('path')
const addCategory = async (req, res, next) => {
    try {
        const category = new Category({
            name: req.body.name,
            image: req.file.filename
        })
        const result = await category.save();
        return res.status(201).json(result)
    } catch (error) {
        console.log(error);
        return res.status(500).json(error)
    }
}


const getAllCatgory = async (req, res, next) => {
    try {
        const category = await Category.find();
        return res.status(200).json(category)
    } catch (error) {
        return res.status(500).json(error)
    }
}

const delet_category = async (req, res) => {
    try {
        const catgory = await Category.findById(req.params.id)
        if (!catgory) {
            return res.json("catgory not find");
        }
        const pathe = path.join(__dirname, '../public/uploads/' + catgory.image)
        console.log(pathe);
        fs.unlinkSync(pathe);
        catgory.delete()
        return res.status(200).json({ result: "category delete sucssfully" })
    } catch (error) {
        return res.status(500).json({ status: false, error: error.message })
    }
}

const update_category = async (req, res) => {
    try {
        const catgory = await Category.findById(req.params.id)
        var image
        if (req.file) {
            const pathe = path.join(__dirname, '../public/uploads/' + catgory.image)
            fs.unlinkSync(pathe);
            image = req.file.filename

        } else {
            image = catgory.image
        }
        const a = await Category.findByIdAndUpdate(catgory.id, {
            name: req.body.name,
            image: image
        }, { new: true })
        return res.status(200).json({ result: a })

    } catch (error) {
        return res.status(500).json({ status: false, error: error.message })
    }
}


module.exports = { addCategory, getAllCatgory, delet_category, update_category }