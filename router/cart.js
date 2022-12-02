const { add_cart, delet_cart, update_cart, all_cart } = require('../controller/cart');
const { auth } = require('../middleware/auth');
const router = require('express').Router();


router.post("/add/:id", add_cart);
router.delete("/delete/:id", delet_cart);
router.put('/update/:id', update_cart);
router.get('/all', all_cart);


module.exports = router