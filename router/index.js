const router = require("express").Router()


const catgory = require("./Category")
const make = require("./Make")
const body = require("./Body")
const model = require("./Model")
const vehicle = require("./Vehicle")
const Attribute = require("./Attribute")
const Banner = require("./Banner")
const User = require("./User")
const Product = require("./Product");
const { auth } = require("../middleware/auth")



router.use("/api/category", catgory)
router.use("/api/banner", Banner)
router.use("/api/make", make)
router.use("/api/body", body)
router.use("/api/model", model)
router.use("/api/vehicle", vehicle)
router.use("/api/attribute", Attribute)
router.use("/api/user", User)
router.use("/api/product", Product);

module.exports = router;
