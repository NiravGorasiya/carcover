'use strict'
const Orders = require('../Models/Orders');
const cart = require('../Models/cart');
const Coupon = require('../Models/Coupon');
const { changeDateFormatTo } = require('./helper');
var stripe = require("stripe")(process.env.STRIPE_SECRET);
var formattedDate = changeDateFormatTo(new Date());
var jwt = require('jsonwebtoken');
const paypal = require("paypal-rest-sdk")
paypal.configure({
    'mode': 'sandbox',
    'client_id': process.env.CLIENT_ID,
    'client_secret': process.env.CLIENT_SECRET
});

const order = async (req, res) => {
    try {
        if (!req.body.payment_method) {
            return res.status(444).json({ messge: "payment method is required" })
        }
        if (!req.body.shipping_address || !req.body.billing_address) {
            return res.status(444).json({ messge: "shipping_address and billing_address is required" })
        }
        var carts_total = req.carts_total
        var date = carts_total[0].shipping.text
        var total = carts_total[0].Total.value
        if (!date) {
            return res.sendFile(__dirname + "/index.html")
        }
        const dateStr = date.slice(2, 16)
        var delivery_date = changeDateFormatTo(new Date(new Date().setDate(new Date(dateStr).getDate())))
        let ids = req.cookies.node_session
        let carts = await cart.find({ user_id: ids });
        const orders = await Orders.create({
            products: carts,
            total: carts_total,
            delivery_date: delivery_date,
            shipping_address: req.body.shipping_address,
            billing_address: req.body.billing_address,
            total_price: total,
            Date: formattedDate,
        })
        var idx = orders.id
        res.cookie('order_id', idx)
        //paypal
        if (req.body.payment_method === "paypal") {
            const create_payment_json = {
                "intent": "sale",
                "payer": {
                    "payment_method": "paypal"
                },
                "redirect_urls": {
                    "return_url": "http://localhost:3000/success",
                    "cancel_url": "http://localhost:3000/cancel "
                },
                "transactions": [{
                    "item_list": {
                        "items": [{
                            "name": "car cover",
                            "sku": "001",
                            "price": total,
                            "currency": "USD",
                            "quantity": 1
                        }]
                    },
                    "amount": {
                        "currency": "USD",
                        "total": total
                    },
                    "description": "Hat for the best team ever"
                }]
            };
            paypal.payment.create(create_payment_json, function (error, payment) {
                if (error) {
                    throw error;
                } else {
                    for (let i = 0; i < payment.links.length; i++) {
                        if (payment.links[i].rel === 'approval_url') {
                            return res.redirect(payment.links[i].href);
                        }
                    }
                }
            });
        }
        // stripe
        if (req.body.payment_method === "card") {
            const customer = await stripe.customers.create();
            await stripe.paymentIntents.create({
                amount: orders.total_price * 100,
                customer: customer.id,
                currency: "USD",
                description: "car cover",
                shipping: req.body.shipping,
                payment_method_types: ['card'],
                payment_method: req.body.payment_method,
                confirm: true,
            }).then(async (result) => {
                if (req.cookies.coupon) {
                    var coupon = await jwt.verify(req.cookies.coupon, process.env.SECRETKEY)
                    await Coupon.findOneAndUpdate({ coupon_code: coupon.id }, { $inc: { coupon_use: 1 } }, { new: true })
                }
                await Orders.findByIdAndUpdate(req.cookies.order_id, {
                    payment_method: req.body.payment_method,
                    payment_status: "successful",
                    customer_id: customer.id,
                    shipping: req.body.shipping,
                    status: "pending"
                })
                res.clearCookie("node_session")
                res.clearCookie("coupon")
                res.clearCookie("token")
                res.clearCookie("order_id")
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
        (error);
        return res.status(500).json({ error: error.messge })
    }
}


const success = async (req, res) => {
    try {
        var carts_total = req.carts_total
        var total = carts_total[0].Total[0].value
        if (!req.cookies.order_id) {
            return res.redirect("http://localhost:3000/cancel");
        }
        var order = await Orders.findById(req.cookies.order_id);
        if (order.total_price != total) {
            await Orders.findByIdAndDelete(order.id)
            return res.redirect("http://localhost:3000/cancel");
        }
        const payerId = req.query.PayerID;
        const paymentId = req.query.paymentId;
        const execute_payment_json = {
            "payer_id": payerId,
            "transactions": [{
                "amount": {
                    "currency": "USD",
                    "total": total
                }
            }]
        };
        let a
        paypal.payment.execute(paymentId, execute_payment_json, async (error, payment) => {
            if (error) {
                throw error;
            }
            else {
                await payment.transactions.map(i => {
                    i.related_resources.map(i => {
                        a = i.sale.id;
                    })
                });
                const data = await Orders.findByIdAndUpdate(req.cookies.order_id, {
                    payment_method: "paypal",
                    payment_status: "successful",
                    customer_id: a,
                    shipping: payment.payer.payer_info.shipping_address,
                    status: "pending"
                }, { new: true })
                if (req.cookies.coupon) {
                    var coupon = await jwt.verify(req.cookies.coupon, process.env.SECRETKEY)
                    await Coupon.findOneAndUpdate({ coupon_code: coupon.id }, { $inc: { coupon_use: 1 } }, { new: true })
                }
                res.clearCookie("node_session")
                res.clearCookie("coupon")
                res.clearCookie("token")
                res.clearCookie("order_id")
                return res.status(200).send({ messge: 'Success', result: { data } });
            }
        });

    } catch (error) {
        return res.status(500).json({ error: error.messge })

    }
}

const cancel = async (req, res) => {
    try {
        return res.status(400).json("cancel");
    } catch (error) {
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
        return res.status(500).json({ error: error.messge })
    }
}

module.exports = { total_sales, order, all_orders, one_orders, success, cancel }
























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
//         (error);
//         return res.status(500).json({ error: error.messge })

//     }
// }