const Product = require("../Models/Product")

const addProduct = async (req, res, next) => {
    try {
        const { title, attribute, catgory_id } = req.body
        const product = new Product({
            title,
            attribute,
            catgory_id
        })
        const result = await product.save();
        return res.status(201).json(result)
    } catch (error) {
        return res.status(500).json(error)
    }
}

const getallProduct = async (req, res, next) => {
    try {
        const result = await Product.find();
        return res.status(200).json(result)
    } catch (error) {
        return res.status(500).json(error)
    }
}

module.exports = { addProduct, getallProduct }

