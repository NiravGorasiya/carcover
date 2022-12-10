const Cart = require("../Models/cart");
const Product = require("../Models/Product");
const { v4: uuidv4 } = require('uuid');
const Category = require("../Models/Category");
const Vehicle = require("../Models/Vehicle");
const Coupon = require("../Models/Coupon");
const { getMonthName, days } = require("./helper");

var sess;
const add_cart = async (req, res) => {
    try {
        const { Model, Body, Make, year, category } = req.params
        var c = await Category.findOne({ name: category })
        var a = await Vehicle.findOne({ $and: [{ year: parseInt(year) }, { category_id: c.id }] })
        if (!a || !c) {
            return res.status(404).json("year and category  not valit")
        }
        const data = await Product.findById(req.params.id)
        const categ = await Category.findById(data.Category_id)
        if (!data) {
            return res.status(404).json("product not found")
        }
        let id
        sess = req.session;
        sess.sessionId = uuidv4();
        if (req.cookies.node_session) {
            id = req.cookies.node_session
        } else {
            id = sess.sessionId
            res.cookie('node_session', id)
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
        const quantity = 1
        let add = await Cart({
            user_id: id,
            image: categ.image,
            product_id: data._id,
            Produt: [
                {
                    product_name: data.title,
                    model: Model,
                    body: Body,
                    make: Make,
                    year: year,
                }
            ],
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
        var id = req.cookies.node_session
        const cart = await Cart.findById(req.params.id)
        if (!cart) {
            return res.status(404).json({ status: false, message: "cart not  find" });
        }

        const { quantity } = req.body
        if (!quantity || quantity === 0) {
            return res.status(404).json({ status: false, message: "enter the  quantity 0 <" });
        }
        var total = parseInt(quantity) * parseInt(cart.price)
        let update = await Cart.findByIdAndUpdate(cart.id, {
            quantity,
            total
        }, { new: true });
        if (!update) {
            return res.status(400).json({ status: false, message: "cart not upate" })
        }
        const data = await Cart.find({ user_id: id })
        return res.status(200).json({ status: true, result: { data } })
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
        const data = await Cart.find({ user_id: id })
        return res.status(200).json({ status: true, result: { data } })

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

// const total_dis = async (req, res) => {
//     try {
//         const coupon = await Coupon.findById({ id: req.cookie.coupon })
//         return res.status(200).json({ status: true, result: data })
//     } catch (error) {
//         return res.status(500).json({ status: false, error: error.message })
//     }
// }

const carts_total = async (req, res) => {
    try {
        var CART_TOTALS = []
        let ids = req.cookies.node_session
        let carts = await Cart.find({ user_id: ids });
        var total = 0
        await carts.map((i) => {
            total = parseInt(i.total) + total
        })
        var dis
        if (req.cookies.coupon) {
            var coupon = await Coupon.findOne({ _id: req.cookies.coupon })
            console.log(coupon);
            var bbbb = coupon.coupon_code
            if (!coupon) {
                var c = 0
            } else {
                c = coupon.discount
            }
            if (coupon.type === "p") {
                var a = parseInt(total) * parseInt(c) / 100
                if (coupon.max_price <= a) {
                    dis = coupon.max_price
                }
                else {
                    dis = a
                }
            } else {
                dis = parseInt(c)
            }
        }
        if (!dis) {
            var dd = 0
        } else {
            dd = dis
        }
        var delivery_fee
        if (!req.body.delivery_fee) {
            delivery_fee = 0
        } else {
            delivery_fee = req.body.delivery_fee
        }
        var a = parseInt(total) + parseFloat(delivery_fee) - parseFloat(dd);
        console.log(a);
        await CART_TOTALS.push({
            sub_total: [{ "text": "Sub_Total:", "value": total }],
            shipping: [{ "text": req.body.Delivery_date, "value": req.body.delivery_fee }],
            coupon: [{ "text": bbbb, "value": dis }],
            Total: [{ "text": "Total:", "value": a }]
        })
        return res.status(200).json({ status: true, result: { CART_TOTALS } })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, error: error.message })
    }
}


const Delivery_Date = async (req, res) => {
    try {
        let ids = req.cookies.node_session
        let carts = await Cart.find({ user_id: ids });
        if (carts.length <= 0) {
            return res.status(404).json({ status: false, message: "carts product not foud" })
        }
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
            const x = new Date(new Date().setDate(new Date().getDate() + index))
            const date = x.toISOString().slice(0, 10)
            const dat = new Date(x).getDate()
            let year = new Date().getFullYear(date)
            const monthName = getMonthName(new Date().getMonth(date));
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
        return res.status(200).json({ status: true, result: data })
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}


module.exports = { add_cart, update_cart, delet_cart, all_cart, Delivery_Date, carts_total }

