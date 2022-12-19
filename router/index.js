const router = require("express").Router()


const catgory = require("./Category")
const make = require("./Make")
const body = require("./Body")
const model = require("./Model")
const vehicle = require("./Vehicle")
const Attribute = require("./Attribute")
const User = require("./User")
const Product = require("./Product");
const cart = require('./cart')
const coupon = require('./coupon');
const helper = require('./helper')
const order = require('./order')

router.use("/api/coupon", coupon)
router.use("/api/category", catgory);
router.use("/api/make", make);
router.use("/api/body", body);
router.use("/api/model", model);
router.use("/api/vehicle", vehicle);
router.use("/api/attribute", Attribute);
router.use("/api/user", User);
router.use("/api/product", Product);
router.use("/api/cart", cart);
router.use("/api", helper)
router.use("/api", order)
module.exports = router;
