const Banner = require("../Models/Banner");
const Category = require("../Models/Category");

const addBanner = async (req, res, next) => {
    try {
        const banner = new Banner({ category_id: req.body.category_id, image: req.file.filename })
        const result = await banner.save();
        return res.status(201).json(result)
    } catch (error) {
        return res.status(500).json(error)
    }
}

const getSingleBanner = async (req, res, next) => {
    try {
        let category = await Category.findOne({ name: req.params.category })
        let banner = await Banner.find({ category_id: category._id })
        return res.status(200).json(banner)
    } catch (error) {
        return res.status(500).json(error)
    }
}

module.exports = { addBanner, getSingleBanner }