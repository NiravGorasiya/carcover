const router = require("express").Router();
const { addProduct, getallProduct } = require("../controller/ProductController")

router.post("/add", addProduct)
router.get("/all", getallProduct)

module.exports = router