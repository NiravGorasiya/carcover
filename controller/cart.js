const Cart = require("../Models/cart");
const Product = require("../Models/Product");
const { v4: uuidv4 } = require('uuid');
const Category = require("../Models/Category");
const Vehicle = require("../Models/Vehicle");


var sess;
const add_cart = async (req, res) => {
    try {
        const { Model, Body, Make, year, category } = req.params
        var c = await Category.findOne({ name: category })
        var a = await Vehicle.findOne({ $and: [{ year: parseInt(year) }, { category_id: c.id }] })
        if (!a || !c) {
            return res.status(404).json("year and category  not valit")
        }
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
            return res.status(404).json("product not found")
        }
        const cartdata = await Cart.findOne({ user_id: id, product_id: data._id })
        if (cartdata) {
            var quantity2 = parseInt(cartdata.quantity) + 1;
            var total = parseInt(quantity2) * parseInt(data.currentPrice)
            const cart = await Cart.findByIdAndUpdate(cartdata.id, {
                quantity: quantity2,
                total: total
            }, { new: true })
            return res.status(200).json({ result: cart })
        }
        let add = await Cart({
            user_id: id,
            product_id: data._id,
            product_name: data.title,
            model: Model,
            body: Body,
            make: Make,
            year: year,
            quantity: quantity,
            price: data.currentPrice,
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
        const { quantity, currentPrice } = req.body
        var total = parseInt(quantity) * parseInt(currentPrice)
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
                    pipeline: [{
                        $project: {
                            image: { $arrayElemAt: ["$images", 0] },
                            title: 1,
                            currentPrice: 1
                        }
                    }],
                    as: "product"
                }
            },
            {
                $lookup: {
                    from: "categories",
                    localField: "product.Category_id",
                    foreignField: "_id",
                    as: "categories"
                }
            },
            {
                $project: {

                    "image": { $first: "$product.image" },
                    "produt": {
                        "product_name": { $first: "$product.title" },
                        "Year": "$year",
                        "Make": "$make",
                        "Model": "$model",
                        "Body": "$body",
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

const Delivery_Date = async (req, res) => {
    try {

        let ids = req.cookies.node_session
        let carts = await Cart.find({ user_id: ids });
        let QUANTITY = []
        carts.map(i => {
            QUANTITY.push(i.quantity)
        })
        let sum = 0
        QUANTITY.map(i => {
            sum = sum + i
        })
        var m = 3
        var i = 1
        var data = []
        for (let index = 1; index <= m; index++) {

            let _weekdays = [1, 2, 3, 4, 5];
            //var currentDate = new Date(new Date().setDate(new Date().getDate() + index))
            const x = new Date(new Date().setDate(new Date().getDate() + index))
            const date = x.toISOString().slice(0, 10)
            const dat = new Date(x).getDate()
            let year = new Date().getFullYear(date)
            const getMonthName = (monthIndex) => {
                let monthsArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
                return monthsArray[monthIndex];
            }
            const monthName = getMonthName(new Date().getMonth(date));
            var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            var d = new Date(date);
            var dayName = days[d.getDay()]
            var a = 12.5 * sum + 37.49
            var b = 10 * sum + 29.99
            if (_weekdays.includes(x.getDay())) {
                if (i == 1) {
                    data.push({
                        day: dat,
                        monthName: monthName,
                        year: year,
                        dayName: dayName,
                        Delivery_fee: a
                    })
                }
                else if (i == 2) {
                    data.push({
                        day: dat,
                        monthName: monthName,
                        year: year,
                        dayName: dayName,
                        Delivery_fee: b
                    })
                }
                else {
                    data.push({
                        day: dat,
                        monthName: monthName,
                        year: year,
                        dayName: dayName,
                        Delivery_fee: "free"
                    })
                }

                i = i + 1
            }
            else {
                m = m + 1
            }
        }


        return res.status(201).json({ status: true, result: data })
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}


module.exports = { add_cart, update_cart, delet_cart, all_cart, Delivery_Date }


