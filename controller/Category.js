const Category = require("../Models/Category")

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

module.exports = { addCategory, getAllCatgory }