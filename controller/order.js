'use strict'
const Orders = require('../Models/Orders');
const cart = require('../Models/cart');
const Coupon = require('../Models/Coupon');
const { changeDateFormatTo, email_send } = require('./helper');
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
        if (!req.body.payment_method_type) {
            return res.status(444).json({ messge: "payment method is required" })
        }
        if (!req.body.shipping_address || !req.body.billing_address) {
            return res.status(444).json({ messge: "shipping_address and billing_address is required" })
        }
        var carts_total = req.carts_total
        var date = carts_total.shipping.text
        var total = carts_total.Total.value
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
        var paypal_id = orders.id
        res.cookie('order_id', paypal_id)
        //paypal
        if (req.body.payment_method_type === "paypal") {
            console.log("yes");
            const create_payment_json = {
                "intent": "sale",
                "payer": {
                    "payment_method": "paypal"
                },
                "redirect_urls": {
                    "return_url": "http://192.168.1.5:3000/success",
                    "cancel_url": "http://192.168.1.5:3000/cancel"
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
                    console.log(error.response.details);
                    return res.status(400).json(error);
                } else {
                    for (let i = 0; i < payment.links.length; i++) {
                        if (payment.links[i].rel === 'approval_url') {
                            return res.json(payment.links[i].href);
                        }
                    }
                }
            });
        }
        //check
        if (req.body.payment_method_types === "check") {
            const data = await Orders.findByIdAndUpdate(req.cookies.order_id, {
                payment_method: "check",
                customer_id: req.cookies.order_id,
            }, { new: true })
            if (req.cookies.coupon) {
                var coupon = await jwt.verify(req.cookies.coupon, process.env.SECRETKEY)
                await Coupon.findOneAndUpdate({ coupon_code: coupon.id }, { $inc: { coupon_use: 1 } }, { new: true })
            }
            res.clearCookie("node_session")
            res.clearCookie("coupon")
            res.clearCookie("token")
            return res.redirect("http://192.168.1.5:3000/success");
        }
        // stripe
        if (req.body.payment_method_type == "card") {
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
                const data = await Orders.findByIdAndUpdate(req.cookies.order_id, {
                    payment_method: req.body.payment_method_type,
                    payment_status: "successful",
                    customer_id: customer.id,
                    shipping: req.body.shipping,
                    status: "pending"
                }, { new: true })
                res.clearCookie("node_session")
                res.clearCookie("coupon")
                res.clearCookie("token")
                return res.redirect("http://192.168.1.5:3000/success");
            }).catch((err) => {
                return res.status(400).json(err)
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.messge })
    }
}

const success = async (req, res) => {
    try {
        var dataOrder = await Orders.findById(req.cookies.order_id);
        const emaildata = ` <html>
                <head>
                </head>
                <body>
                    <section class="page-content single-wrapper">
                        <div class="container">
                            <div class="inner-wrap">
                                <div id="content"><h1 style="text-align: center;">your oder plce to two day cash on delivery thank you</h1>
                                    <div class="holder">
                                        <div style="font-family: Arial, Helvetica, sans-serif; font-size: 12px; color: #000000;">
                                            <div style="width: 680px; margin:0 auto;" class="receipt-table">
                                                <p style="margin-top: 0px; margin-bottom: 20px; font-weight: bold; font-size: 14px;">Thank you for your interest in CarCoversFactory.com products. A tracking number will be emailed to you once it has been generated.</p>
                                                <table style="border-collapse: collapse; width: 100%; border-top: 1px solid #DDDDDD; border-left: 1px solid #DDDDDD; margin-bottom: 20px;">
                                                    <thead>
                                                        <tr>
                                                            <td style="font-size: 12px; border-right: 1px solid #DDDDDD; border-bottom: 1px solid #DDDDDD; background-color: #EFEFEF; font-weight: bold; text-align: left; padding: 7px; color: #222222;" colspan="2">Order Details</td>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td style="font-size: 12px;	border-right: 1px solid #DDDDDD; border-bottom: 1px solid #DDDDDD; text-align: left; padding: 7px;">
                                                                <b>Order ID:</b> ${dataOrder._id}<br />
                                                                <b>Date Added:</b> ${dataOrder.Date}<br />
                                                                <b>Payment Method: </b>${dataOrder.payment_method}/PO<br />
                                                                <b>Delivery Date: </b>${dataOrder.delivery_date}<br />
                                                            </td>
                                                           `+ dataOrder.billing_address.map((item) => (
                                                            `<td style="font-size: 12px;	border-right: 1px solid #DDDDDD; border-bottom: 1px solid #DDDDDD; text-align: left; padding: 7px;">
                                                                <b>Email:</b>${item.e_mail}<br />
                                                                <b>Telephone:</b>${item.phone}<br />
                                                            </td>`
                                                             )) + `  
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <table style="border-collapse: collapse; width: 100%; border-top: 1px solid #DDDDDD; border-left: 1px solid #DDDDDD; margin-bottom: 20px;">
                                                    <thead>
                                                        <tr>
                                                            <td style="font-size: 12px; border-right: 1px solid #DDDDDD; border-bottom: 1px solid #DDDDDD; background-color: #EFEFEF; font-weight: bold; text-align: left; padding: 7px; color: #222222;">Instructions</td>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td style="font-size: 12px;	border-right: 1px solid #DDDDDD; border-bottom: 1px solid #DDDDDD; text-align: left; padding: 7px;">
                                                            <b>Make Payable To: </b><br />ASA Brands Inc<br /><br /><b>Send To: </b><br />4000 Greenbriar Dr<br />Ste 200<br />Stafford, TX 77477<br /><br />Your order will not ship until we receive payment.<br /></td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <table style="border-collapse: collapse; width: 100%; border-top: 1px solid #DDDDDD; border-left: 1px solid #DDDDDD; margin-bottom: 20px;">
                                                    <thead>
                                                        <tr>
                                                            <td style="font-size: 12px; border-right: 1px solid #DDDDDD; border-bottom: 1px solid #DDDDDD; background-color: #EFEFEF; font-weight: bold; text-align: left; padding: 7px; color: #222222;">Billing Address</td>
                                                            <td style="font-size: 12px; border-right: 1px solid #DDDDDD; border-bottom: 1px solid #DDDDDD; background-color: #EFEFEF; font-weight: bold; text-align: left; padding: 7px; color: #222222;">Shipping Address</td>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td style="font-size: 12px;	border-right: 1px solid #DDDDDD; border-bottom: 1px solid #DDDDDD; text-align: left; padding: 7px;">
                                                             
                                                            `+ dataOrder?.shipping_address?.map((item) => (
                                                                  `${item.first_name} ${item.last_name}<br /> ${item.company_name}<br /> Address1 address2<br /> ${item?.city}<br />${item?.postal_code}<br />${item?.state}<br />${item?.country}
                                                            `)) + `
                                                        
                                                            </td>
                                                            <td style="font-size: 12px;	border-right: 1px solid #DDDDDD; border-bottom: 1px solid #DDDDDD; text-align: left; padding: 7px;">
                                                            `+ dataOrder?.billing_address?.map((item) => (
                                                                    `${item.first_name} ${item.last_name}<br /> ${item.company_name}<br /> Address1 address2<br /> ${item?.city}<br />${item?.postal_code}<br />${item?.state}<br />${item?.country}
                                                            `)) + `
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <table style="border-collapse: collapse; width: 100%; border-top: 1px solid #DDDDDD; border-left: 1px solid #DDDDDD; margin-bottom: 20px;">
                                                    <thead>
                                                        <tr>
                                                            <td style="font-size: 12px; border-right: 1px solid #DDDDDD; border-bottom: 1px solid #DDDDDD; background-color: #EFEFEF; font-weight: bold; text-align: left; padding: 7px; color: #222222;">Product</td>
                                                            <td style="font-size: 12px; border-right: 1px solid #DDDDDD; border-bottom: 1px solid #DDDDDD; background-color: #EFEFEF; font-weight: bold; text-align: left; padding: 7px; color: #222222;">Model</td>
                                                            <td style="font-size: 12px; border-right: 1px solid #DDDDDD; border-bottom: 1px solid #DDDDDD; background-color: #EFEFEF; font-weight: bold; text-align: right; padding: 7px; color: #222222;">Quantity</td>
                                                            <td style="font-size: 12px; border-right: 1px solid #DDDDDD; border-bottom: 1px solid #DDDDDD; background-color: #EFEFEF; font-weight: bold; text-align: right; padding: 7px; color: #222222;">Price</td>
                                                            <td style="font-size: 12px; border-right: 1px solid #DDDDDD; border-bottom: 1px solid #DDDDDD; background-color: #EFEFEF; font-weight: bold; text-align: right; padding: 7px; color: #222222;">Total</td>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                    `+ dataOrder?.products?.map((item) => (`
                                                        <tr>
                                                        `+ item?.Produt?.map((item1) => (
                                                            `<td style="font-size: 12px;	border-right: 1px solid #DDDDDD; border-bottom: 1px solid #DDDDDD; text-align: left; padding: 7px;">Premium Edition Van Cover                    <br />
                                                                &nbsp;<small> - Year: ${item1?.year} </small>
                                                                <br />
                                                                 &nbsp;<small> - Make: ${item1?.make}</small>
                                                                        <br />
                                                                        &nbsp;<small> - Model: ${item1?.model}</small>
                                                                        <br />
                                                                        &nbsp;<small> - Body: ${item1?.body}</small>
                                                            </td>
                                                        `)) + `
                                                            <td style="font-size: 12px;	border-right: 1px solid #DDDDDD; border-bottom: 1px solid #DDDDDD; text-align: left; padding: 7px;">${item?.model}</td>
                                                            <td style="font-size: 12px;	border-right: 1px solid #DDDDDD; border-bottom: 1px solid #DDDDDD; text-align: right; padding: 7px;">${item?.quantity}</td>
                                                            <td style="font-size: 12px;	border-right: 1px solid #DDDDDD; border-bottom: 1px solid #DDDDDD; text-align: right; padding: 7px;">$${item?.price}</td>
                                                            <td style="font-size: 12px;	border-right: 1px solid #DDDDDD; border-bottom: 1px solid #DDDDDD; text-align: right; padding: 7px;">$${item?.total}</td>
                                                        </tr>
                                                       `)) + `  
                                                    </tbody>
                                                    <tfoot>
                                                    `+ dataOrder.total.map((item) => (
                                                            `<tr>
                                                                <td style="font-size: 12px;	border-right: 1px solid #DDDDDD; border-bottom: 1px solid #DDDDDD; text-align: right; padding: 7px;" colspan="4"><b>Sub-Total:</b></td>
                                                                <td style="font-size: 12px;	border-right: 1px solid #DDDDDD; border-bottom: 1px solid #DDDDDD; text-align: right; padding: 7px;">$${item?.sub_total?.value}</td>
                                                            </tr>
                                                            `+ ((item.coupon) ?
                                                            `<tr>
                                                                <td style="font-size: 12px;	border-right: 1px solid #DDDDDD; border-bottom: 1px solid #DDDDDD; text-align: right; padding: 7px;" colspan="4"><b>coupon(${item?.coupon?.text})</b></td>
                                                                <td style="font-size: 12px;	border-right: 1px solid #DDDDDD; border-bottom: 1px solid #DDDDDD; text-align: right; padding: 7px;">-$${item?.coupon?.value}</td>
                                                            </tr>`: ``) + `
                                                            <tr>
                                                                <td style="font-size: 12px;	border-right: 1px solid #DDDDDD; border-bottom: 1px solid #DDDDDD; text-align: right; padding: 7px;" colspan="4"><b>Delivery date<br />${item?.shipping?.text}</b></td>
                                                                <td style="font-size: 12px;	border-right: 1px solid #DDDDDD; border-bottom: 1px solid #DDDDDD; text-align: right; padding: 7px;">+ $${item?.shipping?.value}</td>
                                                            </tr>
                                                    `)) + `
                                                        <tr>
                                                            <td style="font-size: 12px;	border-right: 1px solid #DDDDDD; border-bottom: 1px solid #DDDDDD; text-align: right; padding: 7px;" colspan="4"><b>Total:</b></td>
                                                            <td style="font-size: 12px;	border-right: 1px solid #DDDDDD; border-bottom: 1px solid #DDDDDD; text-align: right; padding: 7px;">$${dataOrder?.total_price}</td>
                                                        </tr>
                                                    
                                                    </tfoot>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </body>
                            </html>`
        var email = dataOrder.billing_address[0].e_mail
        console.log(email);
        const payerId = req.query.PayerID;
        const paymentId = req.query.paymentId;
        if (payerId && paymentId) {
            console.log(payerId, paymentId);
            if (!payerId && !paymentId) {
                return res.send("paynentid and payerid is requir")
            }
            var carts_total = req.carts_total
            var total = carts_total.Total.value
            if (!req.cookies.order_id) {
                return res.redirect("http://192.168.1.5:3000/cancel");
            }
            var order = await Orders.findById(req.cookies.order_id);
            if (order.total_price != total) {
                await Orders.findByIdAndDelete(order.id)
                return res.redirect("http://192.168.1.5:3000/cancel");
            }
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
                    await email_send(email,emaildata)
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
                    console.log(JSON.stringify(data))
                    return res.status(200).send({  messge: 'Success', result: { data } });
                }
            });
        } else {
            if (dataOrder) {
               await email_send(email, emaildata)
               await res.clearCookie("order_id")
               return res.status(200).send({ messge: 'Success', result: { data: dataOrder } });
            }
        }
    } catch (error) {
        console.log(error, "error");
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





module.exports = { total_sales, order, all_orders, one_orders, success, cancel}
























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