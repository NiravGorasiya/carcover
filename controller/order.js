const Orders = require('../Models/Orders');
const cart = require('../Models/cart');
const Coupon = require('../Models/Coupon');
const { changeDateFormatTo } = require('./helper');
var stripe = require("stripe")('sk_test_51IvdjGSBmFmiKlBdIxTbWlfs54H4HQ57fBiJaCInxepYHkmQqhM0AkEh5anFTLdxh8m0TbGmwy9hSmvcuPzl2p8Y00n3VsCoXx');
var formattedDate = changeDateFormatTo(new Date())
var jwt = require('jsonwebtoken');


const order = async (req, res) => {
    try {
        if (!req.body.payment_method) {
            return res.status(444).json({ messge: "payment method is required" })
        }
        if (!req.body.shipping_address || !req.body.billing_address) {
            return res.status(444).json({ messge: "shipping_address and billing_address is required" })
        }
        var total, delivery_fee, date, coupon_code, coupon_value
        var carts_total = req.carts_total
        carts_total.map(i => {
            i.shipping.map(i => {
                date = i.text
                delivery_fee = i.value
            })
            i.Total.map(i => { total = i.value })
            i.coupon.map(i => {
                coupon_code = i.text
                coupon_value = i.value
            })
        })
        console.log(date, "date");
        const dateStr = date.slice(2, 17)
        var delivery_date = changeDateFormatTo(new Date(new Date().setDate(new Date(dateStr).getDate())))
        let ids = req.cookies.node_session
        let carts = await cart.find({ user_id: ids });
        const orders = new Orders({
            products: carts,
            discount: req.body.discount,
            delivery_fee: delivery_fee,
            delivery_date: delivery_date,
            shipping_address: req.body.shipping_address,
            billing_address: req.body.billing_address,
            total_price: total,
            coupon: [{
                coupon_code: coupon_code,
                coupon_value: coupon_value
            }],
            Date: formattedDate,
        })
        if (req.body.payment_method) {
            const customer = await stripe.customers.create();
            console.log(customer.id);
            orders.payment_method = req.body.payment_method
            orders.customer_id = customer.id
            await stripe.paymentIntents.create({
                amount: orders.total_price * 100,
                customer: customer.id,
                currency: "USD",
                description: "Spatula company",
                shipping: req.body.shipping,
                payment_method_types: ['card'],
                payment_method: req.body.payment_method,
                confirm: true,
            }).then(async (result) => {

                orders.payment_status = "successful"
                await orders.save()
                if (req.cookies.coupon) {
                    var coupon = await jwt.verify(req.cookies.coupon, process.env.SECRETKEY)
                    await Coupon.findOneAndUpdate({ coupon_code: coupon.id }, { $inc: { coupon_use: 1 } }, { new: true })
                }
                res.clearCookie("node_session")
                res.clearCookie("coupon")
                res.clearCookie("token")
                console.log(result, "result");
                return res.status(201).json({
                    status: true, messge: "successfully order", result: {
                        orders: orders,
                        paymentIntent: result.client_secret,
                        customer: customer.id,
                    }
                })
            }).catch((err) => {
                return res.status(400).json(err)
            });
        }

    } catch (error) {
        console.log(error, "dadf");
        return res.status(500).json({ error: error.messge })
    }
}

const all_orders = async (req, res) => {
    try {
        const orders = await Orders.find()
        return res.status(200).json({ status: true, result: orders })

    } catch (error) {
        return res.status(500).json({ error: error.messge })

    }
}
const one_orders = async (req, res) => {
    try {
        const order = await Orders.findById(req.params.id)
        if (!order) {
            return res.status(404).json({ messge: "order not found" });
        }
        return res.status(200).json({ status: true, result: order })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.messge })

    }
}

const total_sales = async (req, res) => {
    try {
        const data = await Orders.aggregate([
            {
                $group: {
                    _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
                    totalSaleAmount: { $sum: "$total_price" },
                    count: { $sum: 1 }
                },
            },
            {
                $sort: { totalSaleAmount: -1 }
            }
        ])
        return res.status(200).json({ status: true, result: data })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.messge })
    }
}


module.exports = { total_sales, order, all_orders, one_orders }


























// date wise sales
// const total_sales = async (req, res) => {
//     try {
//         const data = await orders.aggregate([
//             {
//                 $group: {
//                     _id: "$Date",
//                     totalSaleAmount: { $sum: "$total_price" },
//                     count: { $sum: 1 }
//                 }
//             },
//             {
//                 $sort: { _id: -1 }
//             }
//         ])
//         return res.status(200).json({ status: true, result: data })
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({ error: error.messge })

//     }
// }