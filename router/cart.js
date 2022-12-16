const { add_cart, delet_cart, update_cart, all_cart, Delivery_Date, carts_total, delivery_data, cart_checkout } = require('../controller/cart');
// const { auth } = require('../middleware/auth');
const router = require('express').Router();


router.post("/add/:category/:year/:Make/:Model/:Body", add_cart);
router.delete("/delete/:id", delet_cart);
router.put('/update/:id', update_cart);
router.get('/all', all_cart);
router.post('/Delivery_Date', Delivery_Date)

router.get('/delivery_data', delivery_data, (req, res) => {
    try {
        const Delivery_data = req.Delivery_data
        return res.status(200).json({ status: true, result: Delivery_data })
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
})

router.get('/carts_total', delivery_data, carts_total, (req, res) => {
    try {
        const carts_total = req.carts_total
        return res.status(200).json({ status: true, result: { carts_total } })
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
})

router.get("/checkout", delivery_data, carts_total, cart_checkout)
module.exports = router
