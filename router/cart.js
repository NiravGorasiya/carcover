const { add_cart, delet_cart, update_cart, all_cart, Delivery_Date, carts_total } = require('../controller/cart');
// const { auth } = require('../middleware/auth');
const router = require('express').Router();


router.post("/add/:id/:category/:year/:Make/:Model/:Body", add_cart);
router.delete("/delete/:id", delet_cart);
router.put('/update/:id', carts_total, update_cart);
router.get('/all', carts_total, all_cart);
router.get('/Delivery_Date', Delivery_Date)
router.post('/carts_total', carts_total, (req, res) => {
    try {
        const carts_total = req.carts_total
        return res.status(200).json({ status: true, result: { carts_total } })
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
})

module.exports = router
