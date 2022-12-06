const { add_cart, delet_cart, update_cart, all_cart, Delivery_Date } = require('../controller/cart');
// const { auth } = require('../middleware/auth');
const router = require('express').Router();


router.post("/add/:id/:category/:year/:Make/:Model/:Body", add_cart);
router.delete("/delete/:id", delet_cart);
router.put('/update/:id', update_cart);
router.get('/all', all_cart);
router.get('/Delivery_Date', Delivery_Date)

module.exports = router
