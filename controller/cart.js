const Cart = require("../Models/cart");
const Product = require("../Models/Product");
const { default: mongoose } = require("mongoose");
const bcrypt = require("bcrypt")
const { v4: uuidv4 } = require('uuid');


var sess;
const add_cart = async (req, res) => {
    try {
        let id
        const quantity = 1
        sess = req.session;
        sess.sessionId = uuidv4();
        if (req.cookies.node_session) {
            id = req.cookies.node_session
        } else {
            id = sess.sessionId
            res.cookie('node_session', id)
        }
        const data = await Product.findById(req.params.id)
        if (!data) {
            return res.status(422).json("product not found")
        }
        let add = await Cart({
            user_id: id,
            product_id: data._id,
            quantity: quantity,
            total: data.currentPrice
        });
        await add.save();
        return res.status(201).json({ status: true, result: add })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message })
    }
}

const update_cart = async (req, res) => {
    try {

        const { quantity, unit_price } = req.body
        var total = parseInt(quantity) * parseInt(unit_price)
        let update = await Cart.findByIdAndUpdate(req.params.id, {
            quantity,
            total
        }, { new: true });
        return res.status(201).json({ status: true, result: update })

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const delet_cart = async (req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id);
        return res.status(200).json({ message: "cart delete successfully" })
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}



const all_cart = async (req, res) => {
    try {
        var id = req.cookies.node_session
        const data = await Cart.aggregate([
            {
                $match: {
                    user_id: id
                }
            },
            {
                $lookup: {
                    from: "products",
                    localField: "product_id",
                    foreignField: "_id",
                    as: "product"
                }
            },
            {
                $lookup: {
                    from: "vehicles",
                    localField: "product.vehicle_id",
                    foreignField: "_id",
                    as: "vehicles"
                }
            },
            {
                $lookup: {
                    from: "bodies",
                    localField: "vehicles.body_id",
                    foreignField: "_id",
                    as: "bodies"
                }
            },
            {
                $lookup: {
                    from: "models",
                    localField: "vehicles.model_id",
                    foreignField: "_id",
                    as: "models"
                }
            },
            {
                $lookup: {
                    from: "makes",
                    localField: "vehicles.make_id",
                    foreignField: "_id",
                    as: "makes"
                }
            },
            {
                $lookup: {
                    from: "categories",
                    localField: "vehicles.category_id",
                    foreignField: "_id",
                    as: "categories"
                }
            },
            {
                $project: {

                    "image": { $first: "$categories.image" },
                    "produt": {
                        "product_name": { $first: "$product.title" },
                        "Year": { $first: "$vehicles.year" },
                        "Make": { $first: "$makes.name" },
                        "Model": { $first: "$models.name" },
                        "Body": { $first: "$bodies.name" },
                    },
                    "QUANTITY": "$quantity",
                    "UNIT_PRICE": { $first: "$product.currentPrice" },
                    "TOTAL": "$total"
                }
            },

        ])
        return res.status(201).json({ status: true, result: data })

    } catch (error) {
        return res.status(500).json({ error: error.message });

    }
}

module.exports = { add_cart, update_cart, delet_cart, all_cart }