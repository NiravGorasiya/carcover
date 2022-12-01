const Product = require("../Models/Product")

const addProduct = async (req, res, next) => {
    try {
        const { title, attribute, catgory_id, description, regularprice, currentPrice, qty } = req.body
        const product = new Product({
            title,
            attribute,
            catgory_id,
            description,
            regularprice,
            currentPrice,
            qty
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

const getAll = (req, res, next) => {
    try {

    } catch (error) {

    }
}

module.exports = { addProduct, getallProduct, getAll }

