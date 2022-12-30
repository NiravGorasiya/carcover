const router = require("express").Router()
const { order, total_sales, all_orders, one_orders, success, cancel } = require("../controller/order")
const { carts_total, delivery_data } = require("../controller/cart")


router.post("/order", delivery_data, carts_total, order);
router.get("/totalsales", total_sales);
router.get("/all", all_orders)
router.get("/one/:id", one_orders)
router.get("/success", delivery_data, carts_total, success)
router.get("/cancel", cancel)
module.exports = router