const orders = require('../model/orders');
const cart = require('../Models/cart');


var x = new Date(new Date().setDate(new Date().getDate()))
var date = x.toISOString().slice(0, 10)
var changeDateFormatTo = date => {
    var [yy, mm, dd] = date.split(/-/g);
    return `${dd}-${mm}-${yy}`;
};
var formattedDate = changeDateFormatTo(date);
const order = async (req, res) => {
    try {
        let ids = req.cookies.node_session
        let carts = await cart.find({ user_id: ids });
        var total = 0
        carts.map((i) => {
            total = parseInt(i.total) + total
        })
        var a = parseInt(total) * parseInt(req.body.discount) / 100 - parseFloat(req.body.delivery_fee);
        const add = await orders.create({
            user_id: ids,
            products: carts,
            discount: req.body.discount,
            total_price: a,
            // SHIPPING_ADDRESS: req.body.SHIPPING_ADDRESS,
            // BILLING_ADDRESS: req.body.BILLING_ADDRESS,
            delivery_fee: req.body.delivery_fee,
            delivery_date: req.body.delivery_date,
            Date: formattedDate
        })
        return res.status(201).json({ status: true, result: add })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.messge })
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
module.exports = { order, total_sales }





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




