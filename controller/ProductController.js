const Product = require("../Models/Product")

const addProduct = async (req, res, next) => {
    try {
        const { title, attribute, vehicle_id, description, regularprice, currentPrice, qty } = req.body
        const product = new Product({
            title,
            attribute,
            vehicle_id,
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

const delete_product = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        return res.status(200).json({ result: " paroduct delete sucssfully" })
    } catch (error) {
        return res.status(500).json(error)
    }
}

const update_product = async (req, res) => {
    try {
        const { title, attribute, vehicle_id, description, regularprice, currentPrice, qty } = req.body

        var data = await Product.findByIdAndUpdate(req.params.id, {
            title,
            attribute,
            vehicle_id,
            description,
            regularprice,
            currentPrice,
            qty
        }, { new: true });
        return res.status(201).json({ result: data })

    } catch (error) {
        return res.status(500).json(error);
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

module.exports = { addProduct, getallProduct, delete_product, update_product }

