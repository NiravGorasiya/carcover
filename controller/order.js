const orders = require('../model/orders');
const cart = require('../Models/cart');
const Coupon = require('../Models/Coupon');
const { changeDateFormatTo } = require('./helper');



var formattedDate = changeDateFormatTo(new Date())
console.log(formattedDate);


const CHECK_PO = async (req, res) => {
    try {
        try {
            let ids = req.cookies.node_session
            let carts = await cart.find({ user_id: ids });
            const add = await orders.create({
                user_id: ids,
                products: carts,
                discount: req.body.discount,
                total_price: req.body.total_price,
                SHIPPING_ADDRESS: req.body.SHIPPING_ADDRESS,
                BILLING_ADDRESS: req.body.BILLING_ADDRESS,
                delivery_fee: req.body.delivery_fee,
                delivery_date: req.body.delivery_date,
                Payment_Method: req.body.payment_method_id,
                Date: formattedDate,
            })
            if (req.cookies.coupon) {
                Coupon.findByIdAndUpdate(req.cookies.coupon, {
                    $inc: {
                        coupon_use: 1
                    }
                })
            }
            res.clearCookie("node_session")
            res.clearCookie("coupon")
            return res.status(201).json({ status: true, result: add })

        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.messge })
        }

    } catch (error) {

    }
}


//month wise sales 
const total_sales = async (req, res) => {
    try {
        const data = await orders.aggregate([
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
module.exports = { total_sales, CHECK_PO }





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




