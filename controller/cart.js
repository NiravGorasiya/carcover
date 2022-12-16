const Cart = require("../Models/cart");
const Product = require("../Models/Product");
const { v4: uuidv4 } = require('uuid');
const Category = require("../Models/Category");
const Vehicle = require("../Models/Vehicle");
const Coupon = require("../Models/Coupon");
var jwt = require('jsonwebtoken');
const { getMonthName, days } = require("./helper");

//session variable
var sess

const add_cart = async (req, res) => {
    try {
        res.clearCookie("token")
        const { Model, Body, Make, year, category } = req.params
        console.log(category);
        var c = await Category.findOne({ name: category })
        var a = await Vehicle.findOne({ $and: [{ year: parseInt(year) }, { category_id: c._id }] })
        if (!a || !c) {
            return res.status(404).json("year and category  not valit")
        }
        const data = await Product.findById(req.body.product_id)
        if (!data) {
            return res.status.json("product not found")
        }
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
        res.clearCookie("token")
        var carts_total = req.carts_total
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
        let products = await Cart.find({ user_id: id })
        return res.status(200).json({ status: true, result: { products, carts_total } })
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
        var carts_total = req.carts_total
        var id = req.cookies.node_session
        let products = await Cart.find({ user_id: id })
        return res.status(200).json({ status: true, result: { products, carts_total } })

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

var carts_total = async (req, res, next) => {
    let data = req.Delivery_data
    var CART_TOTALS = []
    let ids = req.cookies.node_session
    let carts = await Cart.find({ user_id: ids });
    if (carts.length <= 0) {
        return res.status(404).json({ status: false, message: "carts product not foud" })
    }
    var total = 0
    await carts.map((i) => {
        total = parseInt(i.total) + total
    })
    var dis
    if (req.cookies.coupon) {
        var coupon
        await jwt.verify(req.cookies.coupon, process.env.SECRETKEY, async (err, verifytoken) => {
            if (err) {
                console.log("token is not verify");
            } else {
                coupon = verifytoken.id
            }
        })
        var coupon = await Coupon.findOne({ coupon_code: coupon })
        if (!coupon) {
            var c = 0
        } else {
            var bbbb = coupon.coupon_code
            c = coupon.discount
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
    }
    if (!dis) {
        var dd = 0
    } else {
        dd = dis
    }
    var delivery_fee
    var date
    var delivery_fees
    if (!req.cookies.token) {
        delivery_fee = 0
    } else {
        var date_data
        await jwt.verify(req.cookies.token, process.env.SECRETKEY, async (err, verifytoken) => {
            if (err) {
                console.log("token is not verify");
            } else {
                date_data = verifytoken.id
            }
        })
        data.map(i => {
            if (i.id == date_data) {
                date = `- ${i.dayName.substring(0, 3)} ${i.day} ${i.monthName.substring(0, 3)},${i.year}:`;
                i.Delivery_fee.map(i => {
                    delivery_fees = i.value
                    if (delivery_fees == "free") {
                        delivery_fee = 0
                    } else {
                        delivery_fee = delivery_fees
                    }
                })
            }
        }
        )
    }
    var a = parseInt(total) + parseFloat(delivery_fee) - parseFloat(dd);
    await CART_TOTALS.push({
        sub_total: [{ "text": "Sub_Total:", "value": total }],
        shipping: [{ "text": date, "value": delivery_fees }],
        coupon: [{ "text": bbbb, "value": dis }],
        Total: [{ "text": "Total:", "value": a }]
    })
    req.carts_total = CART_TOTALS
    next()
}

var delivery_data = async (req, res, next) => {
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
        var a = (12.5 * sum + 37.49).toFixed(2)
        var b = (10 * sum + 29.99).toFixed(2)
        if (_weekdays.includes(x.getDay())) {
            if (i == 1) {
                data.push({
                    id: 1,
                    day: dat,
                    monthName: monthName,
                    year: year,
                    dayName: dayName,
                    Delivery_fee: [{ text: `$${a}`, value: parseFloat(a) }]
                })
            }
            else if (i == 2) {
                data.push({
                    id: 2,
                    day: dat,
                    monthName: monthName,
                    year: year,
                    dayName: dayName,
                    Delivery_fee: [{ text: `$${b}`, value: parseFloat(b) }]
                })
            }
            else {
                data.push({
                    id: 3,
                    day: dat,
                    monthName: monthName,
                    year: year,
                    dayName: dayName,
                    Delivery_fee: [{ text: "free", value: "free" }]
                })
            }
            i = i + 1
        }
        else {
            m = m + 1
        }
    }
    req.Delivery_data = data
    next();
}
const Delivery_Date = async (req, res) => {
    try {
        if (req.body.id > 3 || req.body.id < 1) {
            return res.status(400).json("select the valit delivery date")
        }
        const token = await jwt.sign({ id: req.body.id }, process.env.SECRETKEY);
        res.cookie('token', token);
        return res.status(200).json({ message: "Delivery Date Is Select" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
}

const cart_checkout = async (req, res) => {
    try {
        if (!req.cookies.token) {
            return res.status(400).json("Please Select the Delivery Date.");
        }
        else {
            var data = []
            var a = await jwt.verify(req.cookies.token, process.env.SECRETKEY)
            var Delivery_data = req.Delivery_data
            Delivery_data.map(i => {
                if (i.id == a.id) {
                    data.push(i)
                }
            })
            if (data.length <= 0) {
                return res.status(400).json({ error: "Please Select the Delivery Date." })
            }
            var total
            var carts_total = req.carts_total
            carts_total.map(i => {
                i.Total.map(i => {
                    total = i.value
                })
            })
            return res.status(200).json({ status: true, result: { total } });
        }
    } catch (error) {
        if (error.message == "invalid signature") {
            return res.status(500).json({ error: "Please Select the Delivery Date." })
        }
        return res.status(500).json({ error: error.message })
    }
}



module.exports = { add_cart, update_cart, delet_cart, all_cart, delivery_data, carts_total, Delivery_Date, cart_checkout }
