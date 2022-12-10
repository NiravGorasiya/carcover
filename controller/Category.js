const Category = require("../Models/Category")

const fs = require('fs')
const path = require('path')
const addCategory = async (req, res, next) => {
    try {
        let bannerimage;
        req.files.banner.map((item) => {
            bannerimage = item.filename
        })
        let categoryimage;
        req.files.image.map((item) => {
            categoryimage = item.filename
        })
        let imageCover
        req.files.cover_image.map((item) => {
            imageCover = item.filename
        })
        const category = new Category({
            name: req.body.name,
            image: categoryimage,
            banner: bannerimage,
            cover_image: imageCover
        })
        const result = await category.save();
        return res.status(201).json(result)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.messge })
    }
}


const getAllCatgory = async (req, res, next) => {
    try {
        const category = await Category.find();
        return res.status(200).json(category)
    } catch (error) {
        return res.status(500).json({ error: error.messge })
    }
}

const delet_category = async (req, res) => {
    try {
        const catgory = await Category.findById(req.params.id)
        if (!catgory) {
            return res.json("catgory not find");
        }
        const image = path.join(__dirname, '../public/uploads/' + catgory.image)
        const banner = path.join(__dirname, '../public/uploads/' + catgory.banner)
        fs.unlinkSync(image, banner);
        catgory.delete()
        return res.status(200).json({ result: "category delete sucssfully" })
    } catch (error) {
        return res.status(500).json({ status: false, error: error.message })
    }
}

const update_category = async (req, res) => {
    try {
        const catgory = await Category.findById(req.params.id)
        let bannerimage;
        let categoryimage;
        if (req.files) {
            req.files.banner.map((item) => {
                bannerimage = item.filename
            })
            req.files.image.map((item) => {
                categoryimage = item.filename
            })
            const image = path.join(__dirname, '../public/uploads/' + catgory.image)
            const banner = path.join(__dirname, '../public/uploads/' + catgory.banner)
            fs.unlinkSync(image);
            fs.unlinkSync(banner)
        } else {
            bannerimage = catgory.banner
            categoryimage = catgory.image
        }
        const a = await Category.findByIdAndUpdate(catgory.id, {
            name: req.body.name,
            image: categoryimage,
            banner: bannerimage
        }, { new: true })
        return res.status(200).json({ result: a })

    } catch (error) {
        return res.status(500).json({ status: false, error: error.message })
    }
}


module.exports = { addCategory, getAllCatgory, delet_category, update_category }